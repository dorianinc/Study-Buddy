import { Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function NewFolderButton() {
  return (
    <>
      <Box
        as="button"
        boxShadow="lg"
        rounded="xl"
        bg="white"
        color="black"
        px={2}
        w={200}
        h={200}
        _hover={{
          bg: "lightgrey",
        }}
        // onClick={() => createNewFolder()}
        >
        <AddIcon boxSize={30} />
      </Box>
    </>
  );
}

export default NewFolderButton;
