// import PdfViewer from "./pdfViewer"
import Viewer from "../Viewer/index";
import MyNotes from "../Note/MyNotes";
import {
  Container,
  Flex,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useGetAllAnnotationsQuery } from "../../store/features/api";
// import { selectFolder } from "../../store/features/folderSlice";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

function DisplayDoc() {
  const { folderId, docId } = useParams();
  const document = useSelector((state) => state.document[docId])
  const folder = useSelector((state) => state.folder[folderId])
  console.log("DOCUMENT", document)
  console.log("FOLDER", folder)
  // const {data:annotation} = useGetAllAnnotationsQuery({docId})
  // console.log('display doc',annotation)
  return (
    <>
      <MyNotes docId={docId} />
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to={"/"}>
            Folders
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to={`/folders/${folderId}`}>
          This Folder: 
          {folder?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage={true}>
          <BreadcrumbLink>This Doc: {document?.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex w={"100vw"} h={"100vh"} bg={"gray.300"} px={150} gap={5}>
        <Container minW={"50vw"} h={"75%"} borderRadius={10} centerContent>
          <Viewer />
        </Container>

        <Container
          w={"75%"}
          h={"75%"}
          borderRadius={10}
          bg={"white"}
          border={"1px solid black"}
        >
          <Heading>Initial PDF Summary</Heading>
        </Container>
      </Flex>
    </>
  );
}
export default DisplayDoc;
