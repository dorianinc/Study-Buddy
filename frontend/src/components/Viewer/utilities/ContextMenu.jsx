import React from "react"
import "../styles/ContextMenu.css"

const ContextMenu = ({ xPos, yPos, editComment, deleteHighlight }) => {
  return (
    <div className="context-menu" style={{ top: yPos + 2, left: xPos + 2 }}>
      <button onClick={editComment}>Edit Comment</button>
      <button onClick={deleteHighlight}>Delete</button>
    </div>
  )
}

export default ContextMenu
