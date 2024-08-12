import React, { useState } from "react";

import {
  Input,
  Stack,
  Container,
  FormLabel,
  Box,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { useDeleteDocMutation } from "../../store/features/api";
import { useModal } from "../../context/ModalContext";

function DeleteDocModal({ doc }) {
  const [ useDeleteDoc ] = useDeleteDocMutation();
  const { closeModal } = useModal();

  const deleteDoc = async (e) => {
    e.preventDefault();
    await useDeleteDoc({docId: doc.id})
    closeModal();
  }

  return (
    <>
      <h1>Are you sure you want to delete document: {doc.name}?</h1>
      <Box
      as="form"
      onSubmit={deleteDoc}
      display='flex'
      justifyContent='space-around'
      alignItems='center'
      mt={5}
      >
        <Button border="1px solid black" p="3px 5px 3px 5px" backgroundColor="var(--main-blue)" color='white' borderRadius='8px' onClick={(e) => closeModal()}>Cancel</Button>
        <Button type="submit" border="1px solid black" p="3px 5px 3px 5px" backgroundColor="red" color='white' borderRadius='8px'>Delete</Button>
      </Box>
    </>
  );
}

export default DeleteDocModal;
