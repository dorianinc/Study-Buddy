import { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import NewDocModal from "../Modals/NewDocModal";
import DocumentUpload from "../DocumentUpload/DocumentUpload";
import { useGetOneFolderMutation } from "../../store/features/api";
import { useSelector } from "react-redux";
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Document from "../Documents";
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
      <Grid templateColumns="repeat(5, 1fr)" rowGap={20} p={20}>
        <ModalButton
        buttonContent={<NewDocButton/>}
        modalComponent={<NewDocModal />}
        />
        {documents &&
          documents?.map((doc) => (
            <ChakraLink
              as={ReactRouterLink}
              exact
              to={`folders/${folderId}/documents/${doc.id}`}
              key={doc.id}
            >
              <GridItem>
                <Document document={doc} />
              </GridItem>
            </ChakraLink>
          ))}
      </Grid>
    </Box>
  );
}

export default MyDocuments;
