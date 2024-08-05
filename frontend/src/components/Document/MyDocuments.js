import { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import NewDocModal from "../Modals/NewDocModal";
import { useGetOneFolderQuery } from "../../store/features/api";
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Document from "../Documents";
import NewDocButton from "./newDocumentBtn";
import ModalButton from "../Modals/ModalButton";

// Display all documents related to a specific folder
function MyDocuments() {
  const { folderId } = useParams();
  const { data: folder, isLoading } = useGetOneFolderQuery(folderId);

  if (isLoading) return <div>"Loading Documents..."</div>;

  return (
    <Box>
      <h1>Documents Page</h1>
      <Grid templateColumns="repeat(5, 1fr)" rowGap={20} p={20}>
        <ModalButton
          buttonContent={<NewDocButton />}
          modalComponent={<NewDocModal folderId={folderId} />}
        />
        {folder.documents.map((doc) => (
          <ChakraLink
            as={ReactRouterLink}
            to={`/folders/${folderId}/${doc.id}`}
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
