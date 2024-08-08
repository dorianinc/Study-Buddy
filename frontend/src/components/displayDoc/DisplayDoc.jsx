// import PdfViewer from "./pdfViewer"
import Viewer from "../Viewer/index";
import MyNotes from "../Note/MyNotes";
import { Container, Flex, Heading } from "@chakra-ui/react";

function DisplayDoc() {
  return (
    <>
      <MyNotes />
      <div>Display Doc</div>
      <Flex w={"100vw"} h={"100vh"} bg={"gray.300"} px={150} gap={5} >
        <Container minW={"50vw"} h={"75%"} borderRadius={10} centerContent>
          <Viewer />
        </Container>

        <Container w={"75%"} h={"75%"} borderRadius={10} bg={"white"} border={'1px solid black'}>
          <Heading>Initial PDF Summary</Heading>
        </Container>
      </Flex>
    </>
  );
}
export default DisplayDoc;
