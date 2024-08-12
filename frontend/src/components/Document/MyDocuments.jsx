import { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import NewDocModal from "../Modals/NewDocModal";
import { useGetOneFolderQuery } from "../../store/features/api";
import { useSelector } from "react-redux";
import { Box, Button, Container, Grid, GridItem } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Document from "../DocumentIcon/DocumentIcon";
import NewDocButton from "./newDocumentBtn";
import ModalButton from "../Modals/ModalButton";

// Display all documents related to a specific folder
function MyDocuments() {
  const { folderId } = useParams();
  const { data: folder, isLoading, error } = useGetOneFolderQuery(folderId);

  if (isLoading) {
    return <div>Loading documents...</div>;
  }

  return (
    <Box>
      <h1>Documents Page</h1>
      <Grid templateColumns="repeat(5, 1fr)" rowGap={20} p={20} border='1px solid green' alignItems='center'>
        <GridItem w='fit-content'>
          <ModalButton
            buttonContent={<NewDocButton />}
            modalComponent={<NewDocModal folderId={folderId} />}
          />
        </GridItem>
        {folder.documents.length ?
          (folder.documents?.map((doc) => (
            <Container>

            <GridItem
              key={doc.id} display='flex' w='fit-content' justifyContent='center' pt={0}>
              <ChakraLink
                as={ReactRouterLink}
                to={`/folders/${folderId}/${doc.id}`}

                >
                <Document document={doc} />
              </ChakraLink>
            </GridItem>
            <ModalButton
              buttonContent={<><Button size='xs'>Delete</Button></>}
            />
                </Container>
          ))) :
          <>
            <h1>No documents have been uploaded. Click on the plus button to get started!</h1>
          </>}
      </Grid>
    </Box>
  );
}

export default MyDocuments;
