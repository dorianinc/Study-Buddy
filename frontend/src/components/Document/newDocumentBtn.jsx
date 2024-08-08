import { Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function NewDocButton() {
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
          bg: "rgb(233, 233, 233)",
          boxShadow: "0 0 10px var(--main-blue)"
        }}
        >
        <AddIcon boxSize={30} />
      </Box>
    </>
  );
}

export default NewDocButton;
