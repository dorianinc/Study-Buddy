// https://amplify-music.s3.us-west-2.amazonaws.com/self-service-course-4-project-kiva-robot-remote-control.pdf


// require('pdfjs-dist')


import { Outline, pdfjs } from 'react-pdf';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Document, Page} from 'react-pdf';
// import { useResizeObserver } from 'wojtekmaj/react-hooks';
import pdfUrl from './self-service-course-4-project-kiva-robot-remote-control.pdf'



import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

require('./pdfViewer.css')

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};
function PdfViewer() {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [doneLoading, setDoneLoading] = useState(false)
    // const [textContent,setTextcontent] = useState()
    const [selectedText, setSelectedText] = useState('')
    const divRef = useRef()
    let startX = useRef()
    let startY = useRef()
    const canvasRef = useRef()
    // useEffect(()=>{
    //     if(!doneLoading) setDoneLoading(true)

    // },[doneLoading,selectedText])
    divRef.current?.addEventListener('mousedown',(e)=>{
        console.log(e)
        startX.current = e.pageX
        startY.current = e.pageY
    })

    divRef.current?.addEventListener('mouseup',(e)=>{
        const text = window.getSelection().toString()
        setSelectedText(text)
        const endX = e.pageX
        const endY = e.pageY
        highlighting(startX.current,startY.current,endX,endY)
    })
    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf._pdfInfo.numPages);
        setDoneLoading(true);
    }

    // const pdftester = document.querySelector('.react-pdf__Document')
    console.log(pdfUrl)

    async function highlighting(startX,startY,endX,endY){
        console.log(`startX:${startX}, startY:${startY}, endX:${endX}, endY:${endY}`)
        console.log(canvasRef.current)
        const context = canvasRef.current.getContext('2d')
        const width = endX - startX
        const height = endY - startY
        context.fillRect(startX,startY,width,height)
        // const pdfPage = await document.querySelector('.textLayer')
        // const content = await pdfPage?.children
        // const selectWidth = endX - startX
        // const selectHeight = endY - startY
        // if(content){
        //     Array.from(content).forEach(async child=>{
        //         // let relativePosLeft = child.style.left.slice(child.style.left.length-8,child.style.left.length-3)
        //         const topPx = await child.style.top
        //         let relativePosTop = topPx.slice(topPx.length-8,topPx.length-3) - 70.90
        //         // console.log(relativePosTop)
        //         if(selectHeight > 0 && relativePosTop > startY && relativePosTop< startY + selectHeight){
        //             console.log(child)
        //             child.style.background = 'red'
        //         }

        //         Array.from(child.children).forEach(async textChild=>{
        //             const topPx = await textChild.style.top
        //             let relativePosTop = topPx.slice(topPx.length-8,topPx.length-3) - 70.90
        //             if(selectHeight > 0 && relativePosTop> startY && relativePosTop < startY + selectHeight){
        //                 console.log(textChild.innerHTML,relativePosTop)
        //                 textChild.style.background = 'red'
        //             }
        //         })
        //     })
        // }
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

    return (
        <div>{pdfUrl &&
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}
                    inputRef={divRef}
            >
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
                    canvasRef={canvasRef}
                >

                </Page>
            </Document>
        }
        </div>
    );
}
export default PdfViewer
