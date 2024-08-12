import { Button, Container, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useHighlightContainerContext, usePdfHighlighterContext } from "react-pdf-highlighter-extended";
import { Bars } from 'react-loader-spinner'
import { useCreateAnnotationMutation, useCreateNoteMutation, useGetAllAnnotationsQuery, useGetOneDocQuery } from "../../../store/features/api";
import { useSelector } from "react-redux";
const CommentForm = ({ onSubmit, placeHolder, selectedContent, docId, docUrl }) => {
  const user = useSelector(state => state.session.user)
  const [comment, setComment] = useState("");
  const [isLoadingAIRes, setIsLoadingAIRes] = useState(false)
  const [createAnnotation] = useCreateAnnotationMutation()
  const [prompt,setPrompt] = useState("")
  const content = selectedContent.current
  const selectedText = selectedContent.current.content.text
  // fetching response from gemini
  const AIGenerate = async () => {
    setIsLoadingAIRes(true)
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': `${Cookies.get('XSRF-TOKEN')}`
      },
      body: JSON.stringify({"prompt": prompt,"selectedText":selectedText })


    })
    const data = await response.json()
    setIsLoadingAIRes(false)
    setComment(data.AIResponse)
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
          ...content
        }
        await createAnnotation({...queryObject})

      }}
    >
      <Container>
        <Textarea
          placeholder="What do you want to do with the passage?"
          onChange={(e)=>setPrompt(e.target.value)}
        >

        </Textarea>
      <Button
        onClick={AIGenerate}
        isDisabled = {!prompt}
        isLoading={isLoadingAIRes}
        colorScheme="blue"
      >
        Generate Note

      </Button>

      </Container>
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
      <div>
        <input type="submit" value="Save" />
      </div>
    </form>
  );
};

export default CommentForm;
