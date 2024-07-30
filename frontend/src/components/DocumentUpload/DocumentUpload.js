import { useState } from "react";
import "./DocumentUpload.css";
import { useDispatch } from "react-redux";
import { thunkUploadDocument } from "../../store/documents";
import { Button } from '@chakra-ui/react'
import { useCreateDocMutation } from "../../store/features/api";
import DisplayDoc from "../displayDoc";

function DocumentUpload() {
  // const dispatch = useDispatch();
  const [ createDoc ] = useCreateDocMutation();

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("theFile", file);
    formData.append("name", "HardCode test1")
    formData.append("fileType", "pdf")
    createDoc(formData)
    // dispatch(thunkUploadDocument(formData))
  };

  return (
    <div>
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
        <Button type="submit" colorScheme="blue" size='sm'>Submit</Button>
      {/* <input type="submit" /> */}
      </form>
      <DisplayDoc pdfUrl={file}/>

    </div>
  );
}

export default DocumentUpload;
