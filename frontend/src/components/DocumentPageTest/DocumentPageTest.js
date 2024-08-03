import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useCreateDocMutation } from "../../store/features/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function DocumentPageTest() {
  const { documentId } = useParams();

  return (
    <>
      <h1>Display Document {documentId} PDF HERE</h1>
    </>
  );
}

export default DocumentPageTest;
