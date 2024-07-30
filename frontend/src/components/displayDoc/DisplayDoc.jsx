import PdfViewer from "./pdfViewer"
function DisplayDoc({pdfUrl}) {
   return(
        <PdfViewer pdfUrl={pdfUrl}/>
   )
}
export default DisplayDoc
