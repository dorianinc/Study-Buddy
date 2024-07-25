import { useState } from "react";
import "./DocumentUpload.css";
import { useDispatch } from "react-redux";
import { thunkUploadDocument } from "../../store/documents";
import { Button, ButtonGroup } from '@chakra-ui/react'

function DocumentUpload() {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("theFile", file);
    formData.append("name", "HardCode")
    formData.append("fileType", "pdf")

    dispatch(thunkUploadDocument(formData))
  };

  return (

    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" action="/documents">
      <div>
        Upload File
        <label htmlFor="uploaded_file">Choose File to upload</label>
        <input
          id="uploaded_file"
          name="uploaded_file"
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <Button colorScheme="blue" size='sm'>Submit</Button>
      {/* <input type="submit" /> */}
    </form>
  );
}

export default DocumentUpload;
