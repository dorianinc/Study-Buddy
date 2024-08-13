import { Box, Text } from "@chakra-ui/react";

function Folder({ folder }) {
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
          bg: "var(--hover-gray)",
          boxShadow: "0 0 10px var(--hover-blue)"
        }}
      >
        <Text noOfLines={1}>{folder.name}</Text>
      </Box>
    </>
  );
}

export default Folder;
