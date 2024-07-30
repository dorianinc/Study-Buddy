import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@chakra-ui/react";
import { useGetFoldersMutation, useGetOneFolderMutation } from "../../store/features/api";
import { NavLink } from "react-router-dom";

function Documents() {
  const [ getOneFolder ] = useGetOneFolderMutation();
  const folderIdTest = 1
  const folder = useSelector(state => state.folder[folderIdTest])
  console.log("🚀 ~ Documents ~ folder:", folder)
  const documents = folder?.documents
  console.log("folder docs: ", folder?.documents)
  // const documents = folder.documents;
  // console.log("🚀 ~ Documents ~ documents:", documents)
  // const documents = folder.documents;
  // console.log("🚀 ~ Documents ~ documents:", documents)
  useEffect(() => {
    getOneFolder(folderIdTest);
  }, [getOneFolder])


  if(!folder || !documents) return
  // console.log("🚀 ~ Documents ~ folder:", folder)

  // useEffect(() => {
  //   getFolders();
  // }, [folders])
  // console.log(folders)
  // const documents = useSelector((state) => state.documents)

  // console.log(documents)
  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={6}>
      {documents && (
        documents?.map(doc =>
          <NavLink to={`documents/${doc.id}`} key={doc.id}>

          <Container >
            {doc?.name}
          </Container>
          </NavLink>
        )
      )}
    </Grid>
  )
}

export default Documents;
