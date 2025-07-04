import React from "react"
import HighlightPopup from "./HighlightPopup"
import {
  AreaHighlight,
  MonitoredHighlightContainer,
  TextHighlight,
  useHighlightContainerContext,
  usePdfHighlighterContext
} from "react-pdf-highlighter-extended"

const HighlightContainer = ({ editHighlight, onContextMenu }) => {
  const {
    highlight,
    viewportToScaled,
    screenshot,
    isScrolledTo,
    highlightBindings
  } = useHighlightContainerContext()
  const { toggleEditInProgress } = usePdfHighlighterContext()
  const component =
    highlight.type === "text" ? (
      <TextHighlight
        isScrolledTo={isScrolledTo}
        highlight={highlight}
        onContextMenu={event =>
          onContextMenu && onContextMenu(event, highlight)
        }
      />
    ) : (
      <AreaHighlight
        isScrolledTo={isScrolledTo}
        highlight={highlight}
        onChange={boundingRect => {
          const edit = {
            position: {
              boundingRect: viewportToScaled(boundingRect),
              rects: []
            },
            content: {
              image: screenshot(boundingRect)
            }
          }

          editHighlight(highlight.id, edit)
          toggleEditInProgress(false)
        }}
        bounds={highlightBindings.textLayer}
        onContextMenu={event =>
          onContextMenu && onContextMenu(event, highlight)
        }
        onEditStart={() => toggleEditInProgress(true)}
      />
    )

  const highlightTip = {
    position: highlight.position,
    content: <HighlightPopup highlight={highlight} />
  }

  return (
    <MonitoredHighlightContainer
      highlightTip={highlightTip}
      key={highlight.id}
      children={component}
    />
  )
}

export default HighlightContainer
