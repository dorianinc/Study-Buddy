import { useState } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  FormHelperText,
  Box,
  Container,
  Spinner
} from "@chakra-ui/react";
import { useCreateDocMutation } from "../../store/features/api";
import { useModal } from "../../context/ModalContext";

function NewDocModal({ folderId }) {
  const [docName, setDocName] = useState("");
  //currently setting file type to pdf, but leaving like this in case we want user to be able to upload diff type
  const [fileType, setFileType] = useState("pdf");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [hidden, setHidden] = useState(true);
  const { closeModal } = useModal();
  const [createDoc, { error, isError, isLoading, isFetching }] = useCreateDocMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = {};

    if (!docName) errs.docName = "Document name is required";
    if (docName.length > 25) errs.docName = "Name cannot exceed 25 characters";
    if (!file) errs.file = "Please upload a pdf file";
    if (Object.values(errs).length) {
      setErrors(errs);
      return errors;
    }

    setErrors({})
    setHidden(!hidden)
    const formData = new FormData();
    formData.append("theFile", file);
    formData.append("name", docName);
    formData.append("fileType", fileType);
    const newDoc = await createDoc({ formData, folderId });

    if (newDoc.data.id) {
      closeModal();
    };


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
        width="240px"
      >
        <FormControl display="flex" flexDirection="column">
          <FormLabel htmlFor="name" className="form-labels">Document name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            size="lg"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />
          <Container
            className="form-errors"
          >
            {errors.docName}
          </Container>
          <FormLabel mt={5} htmlFor="uploaded_file" className="form-labels">
            Upload a File
          </FormLabel>
          <Input
            margin={1}
            id="uploaded_file"
            name="uploaded_file"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <FormHelperText>Select a pdf file to upload</FormHelperText>
          <Container
            className="form-errors"
          >
            {errors.file}

          </Container>
          <Container minH={25} maxH={25} display='flex' justifyContent='center'>
            <Spinner h={25} w={25} hidden={hidden}/>
          </Container>
          <button type="submit" className="submitBtn">
            Upload Document
          </button>
        </FormControl>
      </Box>
    </>
  );
}

export default NewDocModal;
