// import PdfViewer from "./pdfViewer"
import Viewer from "../Viewer/index";
import MyNotes from "../Note/MyNotes";
import { Container, Box } from "@chakra-ui/react";

function DisplayDoc() {
  return (
    <>
      <MyNotes />
      <div>Display Doc</div>
      <Box w={"100vw"} h={"100vh"} bg={"gray.300"}>
               <Container
                  w={"75%"}
                  h={"200px"}
                  border={'1px solid red'}
                  borderRadius={10}
                  // maxHeight={1}
                  centerContent
               >
                  <Viewer />
               </Container>
               
        <Container
          border={'1px solid green'}
         w={'75%'}
         h={"400px"}
         // position={'relative'}
        // maxW={'2xl'}
        // centerContent
        >
          <div>Hello I am a container</div>
        </Container>
      </Box>
    </>
  );
}
export default DisplayDoc;
