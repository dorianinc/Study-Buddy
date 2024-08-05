import React, { useState } from 'react';
import { Document, Page,  pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useGetOneDocQuery } from '../../store/features/api';
import 'react-pdf/dist/Page/TextLayer.css';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


export default function PdfViewer() {
  const { documentId } = useParams();
  console.log("🖥️  documentId: ", documentId)
  const {data: document, isLoading} = useGetOneDocQuery(documentId)
  console.log("🖥️  document: ", document)
  

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  if(isLoading) return <div>...Loading Document</div>
  return (
    <>
      <Document
        file={document.fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}