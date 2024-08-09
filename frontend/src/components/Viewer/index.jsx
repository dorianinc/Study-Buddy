import React, { useState, useRef, useEffect } from "react";
import ExpandableTip from "./utilities/ExpandableTip";
import Sidebar from "./utilities/Sidebar";
import Toolbar from "./utilities/Toolbar";
import HighlightContainer from "./utilities/HighlightContainer";
import { PdfLoader, PdfHighlighter } from "react-pdf-highlighter-extended";
import { testHighlights as _testHighlights } from "./data/testHighlights";
import { useGetOneDocQuery } from "../../store/features/api";
import { useParams } from "react-router-dom";

const Viewer = () => {
  const { docId } = useParams();
  const { data: document, isLoading, error } = useGetOneDocQuery({ docId });
  console.log("this is document", document);

  const highlighterUtilsRef = useRef();
  const [url, setUrl] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [highlightPen, setHighlightPen] = useState(false);

  useEffect(() => {
    console.log("-------- IN USE EFFECT --------");
    if (document) {
      console.log("^^^^^^^ THERE IS A DOCUMENT ^^^^^^");

      console.log("🖥️  document: ", document);
      setUrl(document.fileUrl);
      setHighlights(document.annotations);
    }
  }, [document]);

  console.log("url ==>", url);
  console.log("highights ==>", highlights);

  const getNextId = () => String(Math.random()).slice(2);

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

  return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      <Sidebar highlights={highlights} resetHighlights={resetHighlights} />
      <div
        style={{
          height: "100vh",
          width: "75vw",
          overflow: "hidden",
          position: "relative",
          flexGrow: 1,
        }}
      >
        <Toolbar toggleHighlightPen={() => setHighlightPen(!highlightPen)} />
        <PdfLoader document={url}>
          {(pdfDocument) => (
            <PdfHighlighter
              enableAreaSelection={(event) => event.altKey}
              pdfDocument={pdfDocument}
              utilsRef={(_pdfHighlighterUtils) => {
                highlighterUtilsRef.current = _pdfHighlighterUtils;
              }}
              selectionTip={
                <ExpandableTip
                  addHighlight={addHighlight}
                  docId={document.id}
                />
              } // Component will render as a tip upon any selection
              highlights={highlights}
            >
              <HighlightContainer editHighlight={editHighlight} />
            </PdfHighlighter>
          )}
        </PdfLoader>
      </div>
    </div>
  );
};

export default Viewer;
