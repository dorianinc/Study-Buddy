import { useState } from "react";
import "./DocumentUpload.css";
import { Button } from "@chakra-ui/react";
import { useCreateDocMutation } from "../../store/features/api";

function DocumentUpload() {
  const [createDoc] = useCreateDocMutation();
  // call use whatever mutation to populate store with the curr user's folders
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("theFile", file);
    formData.append("name", "HardCode test1");
    formData.append("fileType", "pdf");
    createDoc(formData);
  };

  return (
    <>
      {/* // <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" action="/documents"> */}
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
      {/* <Button type="submit" colorScheme="blue" size='sm'>Submit</Button>
    </form> */}
    </>
  );
}

export default DocumentUpload;
