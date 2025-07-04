import React, { useState, useRef, useEffect } from "react";
import ExpandableTip from "./utilities/ExpandableTip";
// import Sidebar from "./utilities/Sidebar";
import Toolbar from "./utilities/Toolbar";
import HighlightContainer from "./utilities/HighlightContainer";
import { PdfLoader, PdfHighlighter } from "react-pdf-highlighter-extended";
import { testHighlights as _testHighlights } from "./data/testHighlights";
import { useGetAllAnnotationsQuery, useGetOneDocQuery } from "../../store/features/api";
import { useParams } from 'react-router-dom';
import {
  Flex,
  Box
} from "@chakra-ui/react";

const Viewer = () => {
  const { docId } = useParams()
  const {data:documents,isLoading,error} = useGetOneDocQuery(docId)
  // const {data:annotation} = useGetAllAnnotationsQuery({docId})
  const {data:annotations} = useGetAllAnnotationsQuery({docId})
  const [url, setUrl] = useState();

    const [highlights,setHighlights] = useState(annotations? annotations:[])
    const currentPdfIndexRef = useRef(0);
    const [contextMenu, setContextMenu] = useState(null);
    const [pdfScaleValue, setPdfScaleValue] = useState(undefined);
    const [highlightPen, setHighlightPen] = useState(false);
    // Refs for PdfHighlighter utilities
    const highlighterUtilsRef = useRef();
    useEffect(()=>{
      setHighlights(annotations)
    },[annotations])

    useEffect(()=>{
      setUrl(documents?.fileUrl)
    },[documents])


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
    setHighlights([{ ...highlight, comment, id: getNextId() }, ...highlights]);
  };

  const deleteHighlight = (highlight) => {
    setHighlights(highlights.filter((h) => h.id != highlight.id));
  };

  const editHighlight = (idToUpdate, edit) => {
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

  const resetHash = ()=>{
    window.location.hash=""
  }

  const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(parseIdFromHash());
    if (highlight && highlighterUtilsRef.current) {
      highlighterUtilsRef.current.scrollToHighlight(highlight);
    }
  };

  // Hash listeners for autoscrolling to highlights
  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHighlightFromHash);
    };
  }, [scrollToHighlightFromHash]);


  if(isLoading) {
    return <h1>Loading PDF</h1>
  }

  if(error) return error

  return (
    <Flex className="App" h={'100%'}>
      {/* <Sidebar
        highlights={highlights}
        resetHighlights={resetHighlights}
        toggleDocument={toggleDocument}
      /> */}
      <Box
          minWidth={"50vw"}
          overflow={"hidden"}
          position={"relative"}
          borderRadius={"10px"}
         border={'1px solid black'}
      >
        <Toolbar
          setPdfScaleValue={(value) => setPdfScaleValue(value)}
          toggleHighlightPen={() => setHighlightPen(!highlightPen)}
        />
        <PdfLoader document={documents.fileUrl}>
          {(pdfDocument) => (
            <PdfHighlighter
              enableAreaSelection={(event) => event.altKey}
              pdfDocument={pdfDocument}
              onScrollAway={resetHash}
              utilsRef={(_pdfHighlighterUtils) => {
                highlighterUtilsRef.current = _pdfHighlighterUtils;
              }}
              pdfScaleValue={pdfScaleValue} // zoom in/out 
              selectionTip={<ExpandableTip addHighlight={addHighlight} docId={docId} url={url}/>} // Component will render as a tip upon any selection
              highlights={highlights}
            >
              <HighlightContainer
                editHighlight={editHighlight}
                onContextMenu={handleContextMenu}
              />
            </PdfHighlighter>
          )}
        </PdfLoader>
      </Box>
    </Flex>
  );
};

export default Viewer;
