import { Box, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useCreateDocMutation } from "../../store/features/api";
import { useState } from "react";

function NewDocButton() {
  const [ createDoc ] = useCreateDocMutation();
  const [ file, setFile ] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("theFile", file);
    formData.append("name", "HardCode test1")
    formData.append("fileType", "pdf")
    createDoc(formData)
  }
  return (
    <>
      <Box
        position="relative"
        mb="32px"
        as="button"
        boxShadow="lg"
        rounded="xl"
        bg="white"
        color="black"
        px={2}
        w={200}
        h={200}
        _hover={{
          bg: "lightgrey",
        }}
      >
        <AddIcon boxSize={30} />
        <label htmlFor="uploaded_file">
        <Input
        visibility="hidden"
        id="uploaded_file"
        name="uploaded_file"
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        />
        <Box>
          
        </Box>
        </label>
      </Box>
    </>
  );
}

export default NewDocButton;
