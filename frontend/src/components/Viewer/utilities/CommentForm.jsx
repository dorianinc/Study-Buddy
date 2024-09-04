import { Button, Container } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useHighlightContainerContext, usePdfHighlighterContext } from "react-pdf-highlighter-extended";
import { Bars } from 'react-loader-spinner'
import { useCreateAnnotationMutation, useCreateNoteMutation, useGetAllAnnotationsQuery, useGetOneDocQuery } from "../../../store/features/api";
import { useSelector } from "react-redux";
import { FcAssistant } from "react-icons/fc";
import {
  Stack,
  Input,
  ButtonGroup,
  Textarea
} from '@chakra-ui/react'
const CommentForm = ({ onSubmit, placeHolder, selectedContent, docId, docUrl }) => {
  const user = useSelector(state => state.session.user)
  const [userInput, setUserInput] = useState("")
  const [isLoadingAIRes, setIsLoadingAIRes] = useState(false)
  const [AIFormErr, setAIFormErr] = useState(false)
  const [errors, setErrors] = useState({})
  const [createAnnotation] = useCreateAnnotationMutation()
  const content = selectedContent.current
  const selectedText = selectedContent.current.content.text
  const position = selectedContent.current.position

  // fetching response from gemini
  const AIGenerate = async () => {
    if (!userInput) {
      setAIFormErr(true)
      setErrors({userInput: "Study Buddy needs more details."})
      return errors
    }
    setIsLoadingAIRes(true)
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': `${Cookies.get('XSRF-TOKEN')}`
      },
      body: JSON.stringify({ "prompt": userInput, "selectedText": selectedText })
    })
    const data = await response.json()

    setIsLoadingAIRes(false)
    setUserInput(data.AIResponse)
    setAIFormErr(false)
  }

  return (
    <form
      className="Tip__card"
      onSubmit={async (event) => {
        event.preventDefault();
        onSubmit(userInput);
        const queryObject = {
          user,
          docId: parseInt(docId),
          docUrl,
          comment: userInput,
          ...content,
          position
        }
        await createAnnotation({ ...queryObject })

      }}
    >
      <div>
        <Textarea
          placeholder='Add your note or ask Study Buddy for assistant!'
          autoFocus
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
          value={userInput}
        >
        </Textarea>
        <Container className='form-errors' mt={1}>
          {errors.userInput}
        </Container>
        <ButtonGroup size='sm' colorScheme='blue' margin='10px'>
          <Button
            isLoading={isLoadingAIRes}
            onClick={(e) => {
              e.preventDefault()
              AIGenerate()
            }}
          >Ask Study Buddy</Button>
          <Button isDisabled={isLoadingAIRes || !userInput} type='submit'>Save</Button>
        </ButtonGroup>
      </div>
    </form>
  );
};

export default CommentForm;
