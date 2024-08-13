import { useState } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Spinner,
  Box,
  Container
} from "@chakra-ui/react";
import { useModal } from "../../../context/ModalContext";
import { useCreateFolderMutation } from "../../../store/features/api";
import './NewFolderModal.css'

function NewFolderModal() {
  const [folderName, setFolderName] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [categoryInput, setCategoryInput] = useState(true)
  const [hidden, setHidden] = useState(true);
  const [createFolder, { error, isError, isLoading }] = useCreateFolderMutation();
  const { closeModal } = useModal();

  async function createNewFolder(e) {
    e.preventDefault();
    const errs = {};
    if (!folderName) errs.folderName = "Folder name is required.";

    if (folderName.length > 25)
      errs.folderName = "Name cannot exceed 25 characters";

    if (!category) errs.category = "Category is required";

    if (category === "Select an option") errs.category = "Please select an option";

    if (Object.values(errs).length) {
      setErrors(errs);
      return errors;
    } else {
      setErrors({})
      setHidden(!hidden)
      const newFolder = await createFolder({ name: folderName, category: category });
      if (newFolder.data.id) {
        closeModal();
      }
    }
  }

  const dropDownOptions = (e) => {
    setCategoryInput(true)
    const selected = e.target.value;
    console.log(selected)
    setCategory(selected);
    if (selected === "Other...") {
      setCategory("")
      setCategoryInput(false)
    }

  }

  if (isError) {
    console.log("ERROR", error);
  }
  return (
    <>
      <Box as="form" method="post" onSubmit={createNewFolder} width="220px" h={240} alignContent='center'>
        <FormControl display="flex" flexDirection="column">
          <FormLabel htmlFor="name" className="form-labels">
            Folder name
            <Input
              id="name"
              placeholder="name"
              size="lg"
              border="1px solid lightgray"
              borderRadius="5px"
              w="100%"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <Container className="form-errors">{errors.folderName}</Container>
          </FormLabel>
          <FormLabel mt={5} className="form-labels">Category</FormLabel>
          <select
            placeholder="Select an option"
            variant="outline"
            onChange={dropDownOptions}
          >
            <option selected={true}>Select an option</option>
            <option>General</option>
            <option>Math</option>
            <option>Science</option>
            <option>History</option>
            <option>Literature</option>
            <option>Other...</option>
          </select>
          <Container minH="25px"
            maxH="25px" >

            <Input
              value={category}
              type="text"
              placeholder="Enter Folder Category"
              size="lg"
              border="1px solid lightgray"
              borderRadius="5px"
              mt={5}
              hidden={categoryInput}
              onChange={(e) => setCategory(e.target.value)}
              w="100%"
            />
          </Container>
          <Container className="form-errors" mt={7}>{errors.category}</Container>
          <button type="submit" className="submitBtn">
            Create Folder
          </button>
          <Container mt={10} minH={25} maxH={25} display='flex' justifyContent='center'>
            <Spinner h={25} w={25} hidden={hidden} />
          </Container>
        </FormControl>
      </Box>
    </>
  );
}

export default NewFolderModal;
