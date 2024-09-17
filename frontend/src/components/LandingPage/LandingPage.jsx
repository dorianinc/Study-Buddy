'use client'

import LoginFormModal from '../Modals/LoginFormModal/LoginForm'
import ModalButton from '../Modals/ModalButton'
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Container,
  Divider
} from '@chakra-ui/react'
import SignupFormModal from '../Modals/SignupFormModal/SignupForm'

export default function LandingPage() {
  return (
    <Stack minH={'90vh'} direction={{ base: 'column', md: 'row' }} pb={0}>
      <Flex p={8} flex={1} align={'center'} justify={'center'} pb={0}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Study
            </Text>
            {/* <br />{' '} */}
            <Text color={'blue.400'} as={'span'}>
              Buddy
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Upload PDF files, highlight passages, take notes, and get studying with your very own Study Buddy!
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <ModalButton
              buttonContent={<Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Log in
              </Button>}
              modalComponent={<LoginFormModal />}
            />
            <ModalButton
              buttonContent={
                <Button rounded={'full'}>Sign Up</Button>
              }
              modalComponent={<SignupFormModal />}
            />
          </Stack>
        </Stack>
      </Flex>

      <Flex minH={'70vh'} w='100%' flex={1} flexDirection='column' justifyContent='center' align='center' borderLeft='2px solid var(--main-blue)' mb={'1rem'}>

        <Container p={0} w='35rem' alignSelf='center'>
          <Image borderRadius='8px' boxSize='500px' h='380px' w='100%' objectFit='contain' src="/images/logos/highlight-ss.png" alt="highlight example" border='1px dashed var(--main-blue)' />
        </Container>

        <Divider mt={1} />
        <Text mt={1} mb={1} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>Highlight text you want to send to Study Buddy and receive feedback within seconds!</Text>
        <Divider mb={1} />

        <Container w='35rem' align='center'>
          <Image
            alt={'Login Image'}
            objectFit='contain'
            src="/images/logos/gemini-response.png"
            border='1px dashed var(--main-blue)'
            borderRadius='8px'
          />
        </Container>
      </Flex>
    </Stack>
  )
}
