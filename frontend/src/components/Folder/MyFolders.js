import Folder from "./Folder";
import { Box, Grid, GridItem } from "@chakra-ui/react";

function MyFolders() {
  const folders = [
    {name: "Math"},
    {name: "Science"},
    {name: "English"},
    {name: "History"},
    {name: "Shakespeare"},
    {name: "Javascript"},
    {name: "Python"},
    {name: "React"},
    {name: "CSS"},
    {name: "Ruby"},
    {name: "Really really long folder name"},
  ];
  return (
    <>
      <Box>
        <Grid templateColumns="repeat(5,1fr)" rowGap={20} p={20}>
          {folders.map((folder) => (
            <GridItem>
              <Folder folder={folder} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default MyFolders;
