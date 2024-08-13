// import PdfViewer from "./pdfViewer"
import Viewer from "../Viewer/index";
import MyNotes from "../Note/MyNotes";
import { Container, Flex, Heading,Text } from "@chakra-ui/react";
import { useGetAllAnnotationsQuery, useGetOneDocQuery } from "../../store/features/api";
import { useParams } from "react-router-dom";


function DisplayDoc() {
  const {docId} = useParams()
  const {data:documents,isLoading,error} = useGetOneDocQuery(docId)
  if(error) return <h1>cant load document</h1>
  return (
    <>
      <MyNotes docId={docId}/>
      <div>Display Doc</div>
      <Flex
      marginTop='15px'
      w={"100vw"} h={"100vh"} bg={"gray.300"} px={150} gap={5} >
        <Container minW={"60vw"} h={"75%"} borderRadius={10} centerContent>
          <Viewer />
        </Container>

        <Container
            w={"50%"}
            h={"75%"}
            borderRadius={10}
            bg={"white"}
            border={'1px solid black'}
        >
          <Heading>Short Summary</Heading>
          {isLoading && <h3>loading document</h3>}
          <Text
            padding='10px'
            fontSize='l'>{documents?.summary}
          </Text>
        </Container>
      </Flex>
    </>
  );
}
export default DisplayDoc;
