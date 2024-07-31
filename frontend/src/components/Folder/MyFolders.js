import { useSelector } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Folder from "./Folder";
import NewFolderButton from "./NewFolderButton";
import ModalButton from "../Modals/ModalButton";
import NewFolderModal from "../Modals/NewFolderModal";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useGetFoldersQuery } from "../../store/features/api";

function MyFolders() {
  const user = useSelector((state) => state.session.user);
  const { data: folders, isLoading, error } = useGetFoldersQuery({ user });

  if (isLoading) {
    return <div>Loading folders...</div>;
  }

  return (
    <>
      <Box>
        <Grid templateColumns="repeat(5,1fr)" rowGap={20} p={20}>
          {error ? (
            <>
              <div>Error fetching folders: {error.message}</div>
              <GridItem>
                <ModalButton
                  className="modal-button auth"
                  buttonContent={<NewFolderButton />}
                  modalComponent={<NewFolderModal />}
                />
              </GridItem>
            </>
          ) : (
            <>
              <GridItem>
                <ModalButton
                  className="modal-button auth"
                  buttonContent={<NewFolderButton />}
                  modalComponent={<NewFolderModal />}
                />
              </GridItem>
              {folders.map((folder) => (
                <ChakraLink
                  as={ReactRouterLink}
                  to={`folders/${folder.id}`}
                  key={folder.id}
                >
                  <GridItem>
                    <Folder folder={folder} />
                  </GridItem>
                </ChakraLink>
              ))}
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default MyFolders;
