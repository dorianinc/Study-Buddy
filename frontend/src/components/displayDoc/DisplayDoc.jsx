// import PdfViewer from "./pdfViewer"
import Viewer from "../Viewer/index";
import MyNotes from "../Note/MyNotes";
import {
  Container,
  Flex,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import {
  useGetAllAnnotationsQuery,
  useGetOneDocQuery,
  useGetOneFolderQuery,
} from "../../store/features/api";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

function DisplayDoc() {
  const { folderId, docId } = useParams();
  const document = useSelector((state) => state.document.document[docId]);
  const { data: folder } = useGetOneFolderQuery(folderId);

  const { data: documents, isLoading, error } = useGetOneDocQuery(docId);
  if (error) return <h1>cant load document</h1>;
  return (
    <>
      <MyNotes docId={docId} />
      <Breadcrumb
        fontWeight={"bold"}
        fontSize={"xl"}
        mt={5}
        mb={5}
        ml={5}
        color={"blue.500"}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to={"/"}>
            Folders
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to={`/folders/${folderId}`}>
            {folder?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage={true} color={"blue.700"}>
          <BreadcrumbLink>{document?.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex pt={10} h={"100vh"} bg={"gray.300"} >
        <Container minW={"60vw"} h={"75%"} borderRadius={10} centerContent>
          <Viewer />
        </Container>

        <Container
          h={"75%"}
          borderRadius={10}
          bg={"white"}
          border={"1px solid #2c517f"}
          p={5}
          marginRight={"200px"}
          overflowY={"auto"}
          minW={"20%"}
        >
          <Heading fontWeight={600}>Document Summary</Heading>
          {isLoading && <h3>loading document</h3>}
          <Text mt={1} p={5} fontSize="lg" color={"gray.600"}>
            {documents?.summary}
          </Text>
        </Container>
      </Flex>
    </>
  );
}
export default DisplayDoc;
