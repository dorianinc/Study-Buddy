import { Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function NewFolderButton() {
  return (
    <>
      <Box
        className="gridTile"

        as="button"
        boxShadow="lg"
        rounded="xl"
        bg="white"
        color="black"
        px={2}
        w={200}
        h={200}
        _hover={{
          bg: "var(--hover-gray)",
          boxShadow: "0 0 10px var(--hover-blue)",
        }}
      >
        <AddIcon boxSize={30} />
      </Box>
    </>
  );
}

export default NewFolderButton;
