import { useState } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { useCreateFolderMutation } from "../../store/features/api";

function NewFolderModal() {
  const [folderName, setFolderName] = useState('');
  const [category, setCategory] = useState('');
  const [createFolder, { isLoading }] = useCreateFolderMutation();

  function createNewFolder() {
      createFolder({ name: folderName, category: category });
  }
  return (
    <>
      <form onSubmit={createNewFolder}>
        <FormControl>
          <FormLabel htmlFor="name">Folder name</FormLabel>
          <Input id="name" placeholder="name" size="lg" value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
          <FormHelperText>
            Enter the name you would like to give the folder
          </FormHelperText>
          <FormErrorMessage>
            {/* {errors.name && errors.name.message} */}
          </FormErrorMessage>
          <FormLabel htmlFor="name">Category</FormLabel>
          <Input id="category" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)}/>
          <FormErrorMessage>
            {/* {errors.name && errors.name.message} */}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
            isLoading={isLoading}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default NewFolderModal;
