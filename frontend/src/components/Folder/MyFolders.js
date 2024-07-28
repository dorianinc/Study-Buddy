import Folder from "./Folder";
import { 
    Box,
    Grid,
    GridItem, 
} from "@chakra-ui/react";

function MyFolders() {
    return(
        <>
            <Box>
                <Grid 
                    templateColumns='repeat(5,1fr)'
                    rowGap={20}
                    p={20}
                >
                    <GridItem>
                        <Folder />
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}

export default MyFolders;