import { Button, Container, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useHighlightContainerContext, usePdfHighlighterContext } from "react-pdf-highlighter-extended";
import { Bars } from 'react-loader-spinner'
import { useCreateAnnotationMutation, useCreateNoteMutation, useGetAllAnnotationsQuery, useGetOneDocQuery } from "../../../store/features/api";
import { useSelector } from "react-redux";
import { FcAssistant } from "react-icons/fc";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Stack,
  Input,
  FocusLock,
  useDisclosure,
  ButtonGroup,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
const CommentForm = ({ onSubmit, placeHolder, selectedContent, docId, docUrl }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const user = useSelector(state => state.session.user)
  const [comment, setComment] = useState("");
  const [isLoadingAIRes, setIsLoadingAIRes] = useState(false)
  const [AIFormErr, setAIFormErr] = useState(false)
  const [createAnnotation] = useCreateAnnotationMutation()
  // const [prompt, setPrompt] = useState("")
  const prompt = useRef()
  const content = selectedContent.current
  const selectedText = selectedContent.current.content.text
  const position = selectedContent.current.position
  console.log('selected content',position)
  // fetching response from gemini
  const AIGenerate = async () => {
    if (!prompt.current) {
      setAIFormErr(true)
      return
    }
    setIsLoadingAIRes(true)
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': `${Cookies.get('XSRF-TOKEN')}`
      },
      body: JSON.stringify({ "prompt": prompt.current, "selectedText": selectedText })
    })
    const data = await response.json()

    onClose()
    setIsLoadingAIRes(false)
    setComment(data.AIResponse)
    setAIFormErr(false)
    prompt.current = ''
  }

  const firstFieldRef = useRef(null)


  // 2. Create the form
  const Form = ({ firstFieldRef, onCancel, onSubmit }) => {
    return (
      <Stack spacing={4}>
        <Input ref={firstFieldRef} placeHolder='How can I help you?' onChange={(e) => prompt.current = e.target.value}></Input>
        {AIFormErr && <span style={{'color':'red'}}>Please provide more details</span>}
        <ButtonGroup display='flex' justifyContent='flex-end'>
          <Button
            colorScheme='teal'
            onClick={onSubmit}
            type='submit'
            isLoading={isLoadingAIRes}
          >
            Request
          </Button>
        </ButtonGroup>
      </Stack>
    )
  }
  return (
    <form
      className="Tip__card"
      onSubmit={async (event) => {
        event.preventDefault();
        onSubmit(comment);
        const queryObject = {
          user,
          docId: parseInt(docId),
          docUrl,
          comment,
          ...content,
          position
        }
        await createAnnotation({ ...queryObject })

      }}
    >
      <div>

        <textarea
          placeholder={placeHolder}
          autoFocus
          onChange={(event) => {
            setComment(event.target.value);
          }}
          value={comment}
        />
      </div>
      <Container
        display='flex'
        justifyContent='space-between'
      >
        <Popover
          isOpen={isOpen}
          initialFocusRef={firstFieldRef}
          onOpen={onOpen}
          onClose={onClose}
          placement='right'
          closeOnBlur={false}
        >
          <PopoverContent p={5}>
            <FocusLock returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverCloseButton />
              <Form
                onSubmit={AIGenerate}
                firstFieldRef={firstFieldRef}
                onCancel={onClose} />
            </FocusLock>
          </PopoverContent>
          <PopoverTrigger>
            <Button size='sm' colorScheme="blue" ><FcAssistant /></Button>
          </PopoverTrigger>
        </Popover>
        <Button size='sm' colorScheme = 'blue' type="submit">Save</Button>
      </Container>
    </form>
  );
};

export default CommentForm;
