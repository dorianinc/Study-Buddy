import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useHighlightContainerContext, usePdfHighlighterContext } from "react-pdf-highlighter-extended";
import { Bars } from 'react-loader-spinner'
import { useCreateNoteMutation, useGetOneDocQuery } from "../../../store/features/api";
import { useSelector } from "react-redux";
const CommentForm = ({ onSubmit, placeHolder, selectedContent,docId}) => {
  const [content, setContent] = useState("");
  const user = useSelector(state=>state.session.user)
  const [isLoadingAIRes, setIsLoadingAIRes] = useState(false)
  const selectedText = selectedContent.current.content.text
  const [createNote] = useCreateNoteMutation()
  // fetching response from gemini
  const AIGenerate = async () => {
    setIsLoadingAIRes(true)
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': `${Cookies.get('XSRF-TOKEN')}`
      },
      body: JSON.stringify({ 'prompt': selectedText })


    })
    const data = await response.json()
    setIsLoadingAIRes(false)
    setContent(data.AIResponse)
  }


  return (
    <form
      className="Tip__card"
      onSubmit={async (event) => {
        event.preventDefault();
        onSubmit(content);
        await createNote({user,content,docId})

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
            setContent(event.target.value);
          }}
          value={content}
        />
      </div>
      <div>
        <input type="submit" value="Save" />
      </div>
    </form>
  );
};

export default CommentForm;
