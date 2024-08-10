import { Button } from "@chakra-ui/react";
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
  const content = selectedContent.current
  const selectedText = selectedContent.current.content.text
  // fetching response from gemini
  const AIGenerate = async () => {
    setIsLoadingAIRes(true)
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'comment-Type': 'application/json',
        'XSRF-Token': `${Cookies.get('XSRF-TOKEN')}`
      },
      body: JSON.stringify({ 'prompt': selectedText })


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
        console.log('submitted')
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
      <Button
        onClick={AIGenerate}
      >
        {isLoadingAIRes ? <Bars
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /> : 'Generate Note'
        }

      </Button>
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
