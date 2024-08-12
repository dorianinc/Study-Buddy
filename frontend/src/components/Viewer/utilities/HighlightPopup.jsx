import React from "react"

import "../styles/HighlightPopup.css"

const HighlightPopup = ({ highlight }) => {
  return highlight.comment ? (
    <div className="Highlight__popup">{highlight.comment}</div>
  ) : (
    <div className="Highlight__popup">No comment available</div>
  )
}

export default HighlightPopup
