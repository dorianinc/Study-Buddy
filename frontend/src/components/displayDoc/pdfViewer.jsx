// https://amplify-music.s3.us-west-2.amazonaws.com/self-service-course-4-project-kiva-robot-remote-control.pdf


// require('pdfjs-dist')


import { Outline, pdfjs } from 'react-pdf';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Document, Page } from 'react-pdf';
// import { useResizeObserver } from 'wojtekmaj/react-hooks';
// import pdfUrl from './self-service-course-4-project-kiva-robot-remote-control.pdf'



import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

require('./pdfViewer.css')

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};
function PdfViewer({pdfUrl}) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [doneLoading, setDoneLoading] = useState(false)
    // const [textContent,setTextcontent] = useState()
    const [selectedText, setSelectedText] = useState('')

    const cnvRef = useRef()

    console.log(cnvRef)
    let startX = useRef()
    let startY = useRef()

    // useEffect(()=>{
    //     if(!doneLoading) setDoneLoading(true)

    // },[doneLoading,selectedText])

    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf._pdfInfo.numPages);
        setDoneLoading(true);
    }
    function downClick(e) {
        startX.current = e.offsetX
        startY.current = e.offsetY
    }

    async function mouseUp() {
        const text = await window.getSelection().toString()
        setSelectedText(text)
        console.log(text)
    }
    function prev() {
        if (pageNumber > 1) setPageNumber(prev => prev - 1)
    }

    function next() {
        if (pageNumber < numPages) setPageNumber(prev => prev + 1)
    }
    function onItemClick({ pageNumber: itemPageNumber }) {
        setPageNumber(itemPageNumber);
    }
    // const highlightPattern = (text, pattern) => {
    //     console.log(text,',',pattern,text===pattern)
    //     console.log(text.match(pattern))
    //     return text.replace(pattern, (value) => `<div class='testing'>${value}</div>`);

    // }
    // const highlightPattern = (text, pattern) => {
    //     const splitText = text.split(pattern)

    //     if(splitText.length <= 1){
    //         return text
    //     }

    //     const matches = text.match(pattern)

    //     const result = splitText.reduce((arr,element,index)=>(matches[index] ? [
    //         ...arr,
    //         element,
    //         `<mark>
    //             ${matches[index]}
    //         </mark>`
    //     ]:[]))
    //     console.log(result)
    //     return result

    // }

    // const makeTextRenderer = useCallback(
    //     (highlightText) => textItem => highlightPattern(textItem.str, highlightText),
    //     [selectedText]
    // )


    return (
        <div>{pdfUrl &&
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                <div className='content-table'>
                    <h2>Table of Content</h2>
                    <button id='prev' onClick={prev}>
                        Previous Page
                    </button>
                    <button id='next' onClick={next}>
                        Next Page
                    </button>
                    <Outline
                        onItemClick={onItemClick}
                    />

                </div>
                <Page
                    pageNumber={pageNumber}
                    canvasRef={cnvRef}
                    onMouseUp={mouseUp}
                >

                </Page>
            </Document>
        }
        </div>
    );
}
export default PdfViewer
