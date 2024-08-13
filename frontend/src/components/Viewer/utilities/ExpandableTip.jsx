import React, { useLayoutEffect, useRef, useState } from "react";
import CommentForm from "./CommentForm";
import { usePdfHighlighterContext} from "react-pdf-highlighter-extended";
import "../styles/ExpandableTip.css";

const ExpandableTip = ({ addHighlight,docId,url }) => {
  const [compact, setCompact] = useState(true);
  const selectionRef = useRef(null);

  const {
    getCurrentSelection,
    removeGhostHighlight,
    setTip,
    updateTipPosition,
  } = usePdfHighlighterContext();

  const handleSubmit = (input) => {
    const current = selectionRef.current;

    const highlight = {
      content: current.content,
      position: current.position
    };

    addHighlight(highlight, input)
    removeGhostHighlight();
    setTip(null);

  };

  useLayoutEffect(() => {
    updateTipPosition();
  }, [compact]);



  return (
    <div className="Tip">
      {compact ? (
        <button
          className="Tip__compact"
          onClick={() => {
            setCompact(false);
            selectionRef.current = getCurrentSelection();
            selectionRef.current.makeGhostHighlight();
          }}
        >
          Add highlight
        </button>
      ) : (
        <CommentForm
          placeHolder="Your comment..."
          onSubmit={(input) => handleSubmit(input)}
          selectedContent={selectionRef}
          docId={docId}
          docUrl={url}
        />
      )}
    </div>
  );
};

export default ExpandableTip;
