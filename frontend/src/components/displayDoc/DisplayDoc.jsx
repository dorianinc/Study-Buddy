// import PdfViewer from "./pdfViewer"
import Viewer from '../Viewer/index';
import MyNotes from '../Note/MyNotes';
function DisplayDoc() {
   return(
      <>
         <MyNotes />
         <div>Display Doc</div>
         <Viewer />
      </>

   )
}
export default DisplayDoc
