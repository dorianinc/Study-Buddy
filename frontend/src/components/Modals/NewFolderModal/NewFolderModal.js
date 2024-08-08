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
  Container,
} from "@chakra-ui/react";
import { useModal } from "../../../context/ModalContext";
import { useCreateFolderMutation } from "../../../store/features/api";
import "./NewFolderModal.css";

function NewFolderModal() {
  const [folderName, setFolderName] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [createFolder, { error, isError, isLoading }] =
    useCreateFolderMutation();
  const { closeModal } = useModal();
  function createNewFolder(e) {
    e.preventDefault();
    const errs = {};

    if (!folderName) errs.folderName = "Folder name is required.";

    if (folderName.length > 25)
      errs.folderName = "Name cannot exceed 25 characters";

    if (!category) errs.category = "Category is required";

    if (category === "Select an option")
      errs.category = "Please select an option";

    if (Object.values(errs).length) {
      setErrors(errs);
      return errors;
    } else {
      createFolder({ name: folderName, category: category });
      closeModal();
    }
  }

  if (isError) {
    console.log("ERROR", error);
  }

  return (
    <>
      <Box as="form" method="post" onSubmit={createNewFolder} width="220px">
        <FormControl display="flex" flexDirection="column">
          <FormLabel htmlFor="name">
            Folder name
            <Input
              id="name"
              placeholder="name"
              size="lg"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <Container className="form-errors">{errors.folderName}</Container>
          </FormLabel>
          <FormLabel mt={5}>
            Category
            <select
              placeholder="Select an option"
              variant="outline"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select an option</option>
              <option>General</option>
              <option>Math</option>
              <option>Science</option>
              <option>History</option>
              <option>Literature</option>
            </select>
            <Container className="form-errors">{errors.category}</Container>
          </FormLabel>
          <button type="submit" className="submitBtn">
            Create Folder
          </button>
        </FormControl>
      </Box>
    </>
  );
}

export default NewFolderModal;
