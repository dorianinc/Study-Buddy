import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@chakra-ui/react";
import { useGetFoldersMutation, useGetOneFolderMutation } from "../../store/features/api";

function Documents() {
  const [ getOneFolder ] = useGetOneFolderMutation();
  const folderIdTest = 1
  const folder = useSelector(state => state.folder[folderIdTest])
  console.log("🚀 ~ Documents ~ folder:", folder)
  console.log("folder docs: ", folder.documents)
  // const documents = folder.documents;
  // console.log("🚀 ~ Documents ~ documents:", documents)
  // const documents = folder.documents;
  // console.log("🚀 ~ Documents ~ documents:", documents)
  useEffect(() => {
    getOneFolder(folderIdTest);
  }, [getOneFolder, folder])

  // if(!folder || !documents) return
  // console.log("🚀 ~ Documents ~ folder:", folder)

  // useEffect(() => {
  //   getFolders();
  // }, [folders])
  // console.log(folders)
  // const documents = useSelector((state) => state.documents)

  // console.log(documents)
  return (
    <Grid>
      {/* {documents && (
        documents.map(doc =>
          <Container>
            {document.id}
          </Container>
        )
      )} */}
    </Grid>
  )
}

export default Documents;
