import { useSelector } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link as ChakraLink, Container, Box, Grid, GridItem, Image, Heading,
} from "@chakra-ui/react";
import Folder from "./Folder";
import NewFolderButton from "./NewFolderButton";
import ModalButton from "../Modals/ModalButton";
import NewFolderModal from "../Modals/NewFolderModal";
// import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useGetFoldersQuery } from "../../store/features/api";

function MyFolders() {
  const user = useSelector((state) => state.session.user);
  const { data: folders, isLoading, error } = useGetFoldersQuery({ user });

  if (isLoading) {
    return <div>Loading folders...</div>;
  }

  return (
    <>
      {user ?
        <Box>
          <Breadcrumb
          fontWeight={"bold"}
          fontSize={"xl"}
          mt={5}
          mb={5}
          ml={5}
          color={"blue.500"}
        >
          <BreadcrumbItem isCurrentPage={true}>
            <BreadcrumbLink>Folders</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
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
        :
        <>
          <Box w="100%" display='flex' flexDirection='column' alignItems='center' alignContent='space-between'>
            <Heading as='h1'>Log in or Sign up to get start with Study Buddy!</Heading>
            <Grid gridTemplateColumns='1fr 1fr 1fr'>

          <Container boxSize='sm' p={0}>
            <Image borderRadius='5px' boxSize='500px'  objectFit='contain' src="../../../public/images/logos/highlight-ss.png" alt="highlight example"/>
          </Container>

          <Container>
            Click here to log in or sign up
          </Container>
          <Container boxSize='lg'>
            <Image boxSize='500px'  objectFit='contain' src="../../../public/images/logos/highlight-ss-2.png" alt="highlight example"/>
          </Container>
            </Grid>
          </Box>
        </>
      }
    </>
  );
}

export default MyFolders;
