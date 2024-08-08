import { Box, Container, Text, Grid } from "@chakra-ui/react";
import './DocumentIcon.css'
function Document({ document }) {
  return (
    <>
      <Box
        className="doc-icon-container"
        as="button"
        boxShadow="lg"
        rounded="xl"
        bg="white"
        color="black"
        px={2}
        w={210}
        h={200}
        display='flex'
        justifyContent='center'
        alignItems='center'
        _hover={{
          bg: "rgb(233, 233, 233)",
          boxShadow: "0 0 10px var(--main-blue)"
        }}
      >
        <Container w='190px' display='flex' flexDirection='column' alignItems='stretch'>
          <Grid gridTemplateColumns="5% 90% 5%" gap={3} height="1rem" mb={4} alignItems='center'>
            <Container pl={0}>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 512 512"><path fill="#74C0FC" d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" /></svg>
            </Container>
            <Text fontSize='16px' noOfLines={1} align="center" >{document.name}</Text>
            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="3.5" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
          </Grid>

          <Container justifyContent='center' display='flex'>
            <svg xmlns="http://www.w3.org/2000/svg" height="130" viewBox="0 0 384 512"><path className="document-icon" fill="#63B3ED" d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z" /></svg>
          </Container>

        </Container>
      </Box>
    </>
  );
}

export default Document;
