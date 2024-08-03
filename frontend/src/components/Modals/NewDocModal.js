import { useState } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import { useCreateDocMutation } from "../../store/features/api";

function NewDocModal({ folderId }) {
  const [docName, setDocName] = useState("");
  //currently setting file type to pdf, but leaving like this in case we want user to be able to upload diff type
  const [fileType, setFileType] = useState("pdf");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [createDoc, { error, isError, isLoading }] = useCreateDocMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = {};

    if (!docName) errs.docName = "Please include a name for the document"
    if (!file) errs.file = "Please upload a pdf file"
    if (Object.values(errs).length) {
      setErrors(errs);
      return errors;
    }

    const formData = new FormData();
    formData.append("theFile", file);
    formData.append("name", docName);
    formData.append("fileType", fileType);
    createDoc({formData, folderId});
  };

  if (isError) {
    console.log("ERROR", error);
  }
  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        action="/documents"
      >
        <FormControl>
          <FormLabel htmlFor="name">Document name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            size="lg"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />
          <FormLabel htmlFor="uploaded_file">Upload a File</FormLabel>
          <Box color='red' >
            {errors.docName }
          </Box>
          <Input
            id="uploaded_file"
            name="uploaded_file"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Box color='red'>
            {errors.file}
          </Box>
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isLoading} type="submit">
          Submit
        </Button>
      </Box>
    </>
  );
}

export default NewDocModal;
