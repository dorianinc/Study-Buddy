import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRef } from "react";
import Cookies from "js-cookie";
import { usePdfHighlighterContext } from "react-pdf-highlighter-extended";
import { Bars } from 'react-loader-spinner'
const CommentForm = ({ onSubmit, placeHolder, selectedContent }) => {
  const [input, setInput] = useState("");
  const [isLoadingAIRes, setIsLoadingAIRes] = useState(false)
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
      body: JSON.stringify({ 'prompt': selectedText })


    })
    const data = await response.json()
    setIsLoadingAIRes(false)
    setInput(data.AIResponse)
  }
  console.log(selectedText)

  return (
    <form
      className="Tip__card"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(input);

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
            setInput(event.target.value);
          }}
          value={input}
        />
      </div>
      <div>
        <input type="submit" value="Save" />
      </div>
    </form>
  );
};

export default CommentForm;
