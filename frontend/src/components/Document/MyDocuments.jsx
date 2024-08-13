import NewDocModal from "../Modals/NewDocModal";
import { useGetOneFolderQuery } from "../../store/features/api";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import Document from "../DocumentIcon/DocumentIcon";
import NewDocButton from "./newDocumentBtn";
import ModalButton from "../Modals/ModalButton";
import DeleteDocModal from "../Modals/DeleteDocModal";

// Display all documents related to a specific folder
function MyDocuments() {
  const { folderId } = useParams();
  const { data: folder, isLoading, error } = useGetOneFolderQuery(folderId);
  // console.log("FOLDER", folder)

  if (isLoading) {
    return <div>Loading documents...</div>;
  }

  return (
    <Box>
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
        <BreadcrumbItem isCurrentPage={true} color={"blue.700"}>
          <BreadcrumbLink>{folder?.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Grid
        templateColumns="repeat(5, 1fr)"
        rowGap={20}
        p={20}
        alignItems="center"
      >
        <GridItem w="fit-content">
          <ModalButton
            buttonContent={<NewDocButton />}
            modalComponent={<NewDocModal folderId={folderId} />}
          />
        </GridItem>
        {folder.documents.length ? (
          folder.documents?.map((doc) => (
            <Container key={doc.id} title={doc.name}>
              <GridItem
                display="flex"
                w="fit-content"
                justifyContent="center"
                pt={0}
              >
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/folders/${folderId}/${doc.id}`}
                >
                  <Document document={doc} />
                </ChakraLink>
              </GridItem>
              <ModalButton
                buttonContent={
                  <>
                    <Button
                      w={210}
                      size="xs"
                      _hover={{
                        boxShadow: "0 0 10px var(--hover-blue)",
                      }}
                      backgroundColor="red"
                      color="white"
                    >
                      Delete
                    </Button>
                  </>
                }
                modalComponent={<DeleteDocModal doc={doc} />}
              />
            </Container>
          ))
        ) : (
          <>
            <h1>
              No documents have been uploaded. Click on the plus button to get
              started!
            </h1>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default MyDocuments;
