import React, { useState, useRef, useEffect } from "react";
import CommentForm from "./utilities/CommentForm";
import ContextMenu from "./utilities/ContextMenu";
import ExpandableTip from "./utilities/ExpandableTip";
// import Sidebar from "./utilities/Sidebar";
import Toolbar from "./utilities/Toolbar";
import HighlightContainer from "./utilities/HighlightContainer";
import { PdfLoader, PdfHighlighter } from "react-pdf-highlighter-extended";
import { testHighlights as _testHighlights } from "./data/testHighlights";

const TEST_HIGHLIGHTS = _testHighlights;
const PRIMARY_PDF_URL = "https://tinyurl.com/ynnxvva9";
const SECONDARY_PDF_URL = "https://tinyurl.com/23pybv5e";

const Viewer = () => {
  const [url, setUrl] = useState(PRIMARY_PDF_URL);
  const [highlights, setHighlights] = useState(
    TEST_HIGHLIGHTS[PRIMARY_PDF_URL] ?? []
  );
  const currentPdfIndexRef = useRef(0);
  const [contextMenu, setContextMenu] = useState(null);
  const [pdfScaleValue, setPdfScaleValue] = useState(undefined);
  const [highlightPen, setHighlightPen] = useState(false);

  // Refs for PdfHighlighter utilities
  const highlighterUtilsRef = useRef();

  const toggleDocument = () => {
    const urls = [PRIMARY_PDF_URL, SECONDARY_PDF_URL];
    currentPdfIndexRef.current = (currentPdfIndexRef.current + 1) % urls.length;
    setUrl(urls[currentPdfIndexRef.current]);
    setHighlights(TEST_HIGHLIGHTS[urls[currentPdfIndexRef.current]] ?? []);
  };

  const getNextId = () => String(Math.random()).slice(2);

  const parseIdFromHash = () => {
    return document.location.hash.slice("#highlight-".length);
  };

  const handleContextMenu = (event, highlight) => {
    event.preventDefault();

    setContextMenu({
      xPos: event.clientX,
      yPos: event.clientY,
      deleteHighlight: () => deleteHighlight(highlight),
      editComment: () => editComment(highlight),
    });
  };

  const addHighlight = (highlight, comment) => {
    console.log("Saving highlight", highlight);
    setHighlights([{ ...highlight, comment, id: getNextId() }, ...highlights]);
  };

  const deleteHighlight = (highlight) => {
    console.log("Deleting highlight", highlight);
    setHighlights(highlights.filter((h) => h.id != highlight.id));
  };

  const editHighlight = (idToUpdate, edit) => {
    console.log(`Editing highlight ${idToUpdate} with `, edit);
    setHighlights(
      highlights.map((highlight) =>
        highlight.id === idToUpdate ? { ...highlight, ...edit } : highlight
      )
    );
  };

  const resetHighlights = () => {
    setHighlights([]);
  };

  const getHighlightById = (id) => {
    return highlights.find((highlight) => highlight.id === id);
  };

  return (
    <div className="App" 
    // style={{ display: "flex", height: "100vh" }}
    >
      {/* <Sidebar
        highlights={highlights}
        resetHighlights={resetHighlights}
        toggleDocument={toggleDocument}
      /> */}
      <div
        style={{
          height: "400px",
          minWidth: "50vw",
          // overflow: "hidden",
          position: "relative",
          borderRadius: "10px"
          // top: 100
          // flexGrow: 1,
        }}
      >
        <Toolbar
          setPdfScaleValue={(value) => setPdfScaleValue(value)}
          toggleHighlightPen={() => setHighlightPen(!highlightPen)}
        />
        <PdfLoader document={url}>
          {(pdfDocument) => (
            <PdfHighlighter
              enableAreaSelection={(event) => event.altKey}
              pdfDocument={pdfDocument}
              utilsRef={(_pdfHighlighterUtils) => {
                highlighterUtilsRef.current = _pdfHighlighterUtils;
              }}
              selectionTip={<ExpandableTip addHighlight={addHighlight} />} // Component will render as a tip upon any selection
              highlights={highlights}
            >
              {/* User-defined HighlightContainer component goes here */}
              <HighlightContainer
                editHighlight={editHighlight}
                onContextMenu={handleContextMenu}
              />
            </PdfHighlighter>
          )}
        </PdfLoader>
      </div>
    </div>
  );
};

export default Viewer;
