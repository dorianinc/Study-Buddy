// https://amplify-music.s3.us-west-2.amazonaws.com/self-service-course-4-project-kiva-robot-remote-control.pdf


// require('pdfjs-dist')
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    useDisclosure,
    Button,
    Icon,
    Textarea
} from '@chakra-ui/react'
import { MdSpeakerNotes } from "react-icons/md";
import Cookies from 'js-cookie';
import { Outline, pdfjs } from 'react-pdf';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Document, Page } from 'react-pdf';
import pdfUrl from './self-service-course-4-project-kiva-robot-remote-control.pdf'



import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


require('./pdfViewer.css')

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};
function PdfViewer() {
    // const { isOpen, onToggle, onClose } = useDisclosure()
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [noteBoxCoord, setNoteBoxCoord] = useState({ offsetX: null, offsetY: null })
    // const [doneLoading, setDoneLoading] = useState(false)
    // const [textContent,setTextcontent] = useState()
    const [selectedText, setSelectedText] = useState('')
    const [isHighlight, setIsHighLight] = useState(true)
    const divRef = useRef()
    // let startX = useRef()
    // let startY = useRef()
    // const [endX, setEndX] = useState()
    // const [endY, setEndY] = useState()
    const canvasRef = useRef()

    // const [AINote, setAINote] = useState('')
    const [note, setNote] = useState('')

    // useEffect(()=>{
    //     if(!doneLoading) setDoneLoading(true)

    // },[doneLoading,selectedText])
    // divRef.current?.addEventListener('mousedown', async (e) => {
    //     e.stopPropagation()
    //     startX.current = e.offsetX
    //     startY.current = e.offsetY

    // })

    // canvasRef.current?.addEventListener('mousedown',(e)=>{
    //     console.log('etnered')
    //     console.log(canvasRef.current,e)
    // })


    divRef.current?.addEventListener('mouseup', async (e) => {
        // console.log(e)
        console.log(e.target)
        console.log(e.currentTarget)
        e.stopPropagation()

        // const { left, top } = await e.target.style
        // console.log('this is left', left, top)
        // const leftoffSet = left ? (parseInt(left.slice(left.indexOf('*') + 1, left.length - 3)) + e.offsetX) + 'px' : ''
        // const topoffSet = top ? top.slice(top.indexOf('*') + 1, top.length - 3) + 'px' : ''
        // // setEndX(leftoffSet)
        // // setEndY(topoffSet)
        // // setIsHighLight(true)

        setNoteBoxCoord({ offsetX: e.pageX, offsetY: e.pageY })
        // highlighting(startX.current,startY.current,endX,endY)
        const text = window.getSelection().toString()
        setSelectedText(text)
    })


    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf._pdfInfo.numPages);
        // setDoneLoading(true);
    }


    // const pdftester = document.querySelector('.react-pdf__Document')

    async function highlighting(startX, startY, endX, endY) {
        // console.log(`startX:${startX}, startY:${startY}, endX:${endX}, endY:${endY}`)
        // console.log(canvasRef.current)
        // const context = canvasRef.current.getContext('2d')
        // const width = endX - startX
        // const height = endY - startY
        // context.fillRect(startX,startY,width,height)
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
    console.log('this is note', note)
    function prev() {
        if (pageNumber > 1) setPageNumber(prev => prev - 1)
    }

    function next() {
        if (pageNumber < numPages) setPageNumber(prev => prev + 1)
    }
    function onItemClick({ pageNumber: itemPageNumber }) {
        setPageNumber(itemPageNumber);
    }

    async function AIgenerate() {

        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'XSRF-Token': `${Cookies.get('XSRF-TOKEN')}`
            },
            body: JSON.stringify({ 'prompt': selectedText })

        })
        const { AIResponse } = await response.json()
        setNote(AIResponse)
    }
    return (
        <div>{pdfUrl &&
            <div className='doc-container'
            >
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}
                    inputRef={divRef}
                >
                    {/* <div className='content-table'>
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

                        </div> */}
                    <Page
                        pageNumber={pageNumber}
                        canvasRef={canvasRef}
                    >

                    </Page>
                </Document>

                {selectedText &&
                        <Popover
                        >
                            <PopoverTrigger>
                                <Button
                                    style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        left: noteBoxCoord.offsetX,
                                        top: noteBoxCoord.offsetY,
                                        pointerEvents: 'auto'
                                    }}
                                    size='sm'
                                    // onClick={onToggle}
                                >
                                    <Icon
                                        as={MdSpeakerNotes} />
                                </Button>

                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverHeader>Add Notes</PopoverHeader>
                                <Button
                                    onClick={AIgenerate}
                                >Create Note</Button>
                                <PopoverBody>
                                    <form>
                                        <Textarea
                                            placeholder='Add your notes or generate note from assistant'
                                            // value={AINote ? AINote : note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                        <Button type="submit" disabled={!note}>Save Note</Button>
                                    </form>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                }
            </div>
        }


            {/* <NotePopup/> */}
        </div>
    );
}
export default PdfViewer
