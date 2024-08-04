import { Box, Text } from "@chakra-ui/react";

function Document({ document }) {
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
      >
        <Text noOfLines={1}>{document.name}</Text>
      </Box>
    </>
  );
}

export default Document;
