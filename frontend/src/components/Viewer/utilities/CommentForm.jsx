import React, { useState } from "react";

const CommentForm = ({ onSubmit, placeHolder }) => {
  const [input, setInput] = useState("");

  return (
    <form
      className="Tip__card"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(input);
      }}
    >
      <div>
        <textarea
          placeholder={placeHolder}
          autoFocus
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
      </div>
      <div>
        <input type="submit" value="Save" />
      </div>
    </form>
  );
};

export default CommentForm;
