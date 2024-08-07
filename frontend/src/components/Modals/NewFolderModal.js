import { useEffect, useState } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  FormHelperText,
  Box,
  Select,
} from "@chakra-ui/react";
import { useModal } from "../../context/ModalContext";
import { useCreateFolderMutation } from "../../store/features/api";

function NewFolderModal() {
  const [folderName, setFolderName] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [createFolder, { error, isError, isLoading }] = useCreateFolderMutation();
  const { closeModal } = useModal();
  function createNewFolder(e) {
    e.preventDefault();
    const errs = {};

    if (!folderName) errs.folderName = "Folder name is required.";

    if (folderName.length > 25)
      errs.folderName = "Folder name must be between 1 and 25 characters long.";

    if (!category) errs.category = "Category is required";

    if (Object.values(errs).length) {
      setErrors(errs);
      return errors;
    } else {
      createFolder({ name: folderName, category: category });
      closeModal()
    }
  }

  if (isError) {
    console.log("ERROR", error);
  }

  return (
    <>
      <Box
        as="form"
        method="post"
        onSubmit={createNewFolder}
      >
        <FormControl display='flex' flexDirection='column'>
          <FormLabel htmlFor="name" >Folder name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            size="lg"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <Box color='red' minH='12px' maxH='12px' fontSize='14px'>{errors.folderName}</Box>
          <FormLabel mt={5}>Category</FormLabel>
          <Select
            placeholder="Select an option"
            variant="outline"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>General</option>
            <option>Math</option>
            <option>Science</option>
            <option>History</option>
            <option>Literature</option>
          </Select>
          <Box color='red' minH='12px' maxH='12px' fontSize='14px'>{errors.category}</Box>
          <Button mt={5} colorScheme="teal" isLoading={isLoading} type="submit">
            Create Folder
          </Button>
        </FormControl>
      </Box>
    </>
  );
}

export default NewFolderModal;
