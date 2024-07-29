import { useSelector } from "react-redux";
import Folder from "./Folder";
import NewFolderButton from "./NewFolderButton";
import { 
    Box, 
    Grid, 
    GridItem 
} from "@chakra-ui/react";
import { useGetFoldersQuery } from "../../store/features/api";

function MyFolders() {
  const user = useSelector(state => state.session.user);
  const { data: folders, isLoading, error } = useGetFoldersQuery({ user });

  if (isLoading) {
    return <div>Loading folders...</div>;
  }

  if (error) {
    return <div>Error fetching folders: {error.message}</div>;
  }

  // Data is available here
  console.log("FOLDERS", folders)

  return (
    <>
      <Box>
        <Grid templateColumns="repeat(5,1fr)" rowGap={20} p={20}>
            <GridItem>
                <NewFolderButton />
            </GridItem>
          {folders.map((folder) => (
            <GridItem key={folder.id}>
              <Folder folder={folder} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default MyFolders;
