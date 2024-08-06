import { useState } from "react";
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
import { useCreateFolderMutation } from "../../store/features/api";

function NewFolderModal() {
  const [folderName, setFolderName] = useState("");
  const [category, setCategory] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [createFolder, { error, isError, isLoading }] =
    useCreateFolderMutation();

  function createNewFolder(e) {
    e.preventDefault();
    const errs = {};

    if (!folderName) errs.folderName = "Folder name is required.";

    if (folderName.length > 25)
      errs.folderName = "Folder name must be between 1 and 25 characters long.";

    if (!category) errs.category = "Category is required";

    if (Object.values(errs).length) {
      setFormErrors(errs);
      return formErrors;
    } else {
      createFolder({ name: folderName, category: category });
    }
  }

  if (isError) {
    console.log("ERROR", error);
  }

  return (
    <>
      <Box
        as="form"
        onSubmit={createNewFolder}
        method="post"
        display="flex"
        flexDirection="column"
        alignContent="center"
      >
        {/* <FormControl onSubmit={createNewFolder}> */}
          <FormLabel htmlFor="name">Folder name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            size="lg"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          {/* <FormHelperText>
            Enter the name you would like to give the folder
          </FormHelperText> */}
          <FormErrorMessage>
            {formErrors.folderName && formErrors.folderName}
          </FormErrorMessage>

          <FormLabel>Category</FormLabel>
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
          {/* <FormHelperText>Select a category for your folder</FormHelperText> */}
          {/* <FormLabel htmlFor="name">Category</FormLabel>
          <Input id="category" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)}/> */}
          <FormErrorMessage>
            {/* {errors.name && errors.name.message} */}
          </FormErrorMessage>
          <Button mt={4} colorScheme="teal" isLoading={isLoading} type="submit">
            Create Folder
          </Button>
        {/* </FormControl> */}
      </Box>
    </>
  );
}

export default NewFolderModal;
