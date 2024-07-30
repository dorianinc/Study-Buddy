// https://amplify-music.s3.us-west-2.amazonaws.com/self-service-course-4-project-kiva-robot-remote-control.pdf


// require('pdfjs-dist')


import { pdfjs } from 'react-pdf';
import { useRef, useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
// import { useResizeObserver } from 'wojtekmaj/react-hooks';
// import pdfUrl from './self-service-course-4-project-kiva-robot-remote-control.pdf'



import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

require('./displayDoc.css')

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();
const options = {
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
  };
function DisplayDoc({pdfUrl}) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [doneLoading,setDoneLoading] = useState(false)
    // const [textContent,setTextcontent] = useState()
    const [selectedText,setSelectedText] = useState('')

    const cnvRef = useRef()

    console.log(cnvRef)
    let startX = useRef()
    let startY = useRef()
    if(!pdfUrl) return
        // useEffect(()=>{
        //     if(!doneLoading) setDoneLoading(true)

        // },[doneLoading,selectedText])

    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf._pdfInfo.numPages);
        console.log('this is pdf',pdf)
        setDoneLoading(true);
    }
    function downClick(e){
        startX.current = e.offsetX
        startY.current = e.offsetY
    }

    async function mouseUp(){
        const text = await window.getSelection().toString()
        setSelectedText(text)
    }
    function prev(){
        if(pageNumber > 1) setPageNumber(prev=>prev - 1)
    }

    function next(){
        if(pageNumber < numPages) setPageNumber(prev => prev + 1)
    }
    const highlightPattern = async (text,pattern)=>{
        console.log(pattern)
        // const splitText = text.split(pattern)
        //     if(splitText.length <=1){
        //         return text
        //     }
        //     console.log(splitText)
        //     const matches = text.match(pattern)
        //     return splitText.reduce((arr,element,index)=> (matches[index]? [
        //         ...arr,
        //         `<mark>${matches[index]}</mark>`,
        //     ]:[...arr,element]),[])
        return text.replace(pattern, (value) => `<mark>${value}</mark>`);

    }

    const makeTextRenderer = highlightText => textItem => highlightPattern(textItem.str,highlightText)


    return (
        <div>
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                <button id='prev' onClick={prev}>
                    Previous Page
                </button>
                <button id='next' onClick={next}>
                    Next Page
                </button>
                <Page
                    pageNumber={pageNumber}
                    customTextRenderer={makeTextRenderer('Self')}
                    canvasRef={cnvRef}
                    onMouseUp={mouseUp}
                >

                </Page>
          </Document>
        </div>
    );
}
export default DisplayDoc
