import { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import NewDocModal from "../Modals/NewDocModal";
import { useGetOneFolderMutation } from "../../store/features/api";
import { useSelector } from "react-redux";
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Document from "../DocumentIcon/DocumentIcon";
import NewDocButton from "./newDocumentBtn";
import ModalButton from "../Modals/ModalButton";

// Display all documents related to a specific folder
function MyDocuments() {
  const [getOneFolder] = useGetOneFolderMutation();
  const { folderId } = useParams();
  const folder = useSelector((state) => state.folder[folderId]);
  const documents = folder?.documents;

  useEffect(() => {
    getOneFolder(folderId);
  }, [getOneFolder]);

  if (!folder || !documents) return;

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
        {documents.length ?
          (documents?.map((doc) => (
            <GridItem
              key={doc.id} display='flex' w='fit-content' justifyContent='center' pt={0}>
              <ChakraLink
                as={ReactRouterLink}
                to={`/folders/${folderId}/${doc.id}`}

              >
                <Document document={doc} />
              </ChakraLink>
            </GridItem>
          ))) :
          <>
            <h1>No documents have been uploaded. Click on the plus button to get started!</h1>
          </>}
      </Grid>
    </Box>
  );
}

export default MyDocuments;
