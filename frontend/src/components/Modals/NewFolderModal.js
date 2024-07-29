  import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    FormHelperText,
  } from '@chakra-ui/react'

  function NewFolderModal() {
    return(
        <>
        <form>
      <FormControl >
        <FormLabel htmlFor='name'>Folder name</FormLabel>
        <Input
          id='name'
          placeholder='name'
          size='lg'
        />
        <FormHelperText>Enter the name you would like to give the folder</FormHelperText>
        <FormErrorMessage>
          {/* {errors.name && errors.name.message} */}
        </FormErrorMessage>
        <FormLabel htmlFor='name'>Category</FormLabel>
        <Input
          id='category'
          placeholder='category'
        />
        <FormErrorMessage>
          {/* {errors.name && errors.name.message} */}
        </FormErrorMessage>
      </FormControl>
      <Button 
      mt={4} 
      colorScheme='teal' 
    //   isLoading={isSubmitting} 
      type='submit'>
        Submit
      </Button>
    </form>
        </>
    )
  }

  export default NewFolderModal;