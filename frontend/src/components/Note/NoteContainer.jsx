
import {Editable,
EditablePreview,
EditableInput,
useEditableControls,
Flex,
IconButton,
ButtonGroup,
Input
} from "@chakra-ui/react";

import{CheckIcon,CloseIcon,EditIcon}from '@chakra-ui/icons'

import { useState } from "react";

function updateComment(){

}
const NoteContainer = ({annotation})=>{
    const [commentText,setCommentText] = useState(annotation.comment)

    function EditableControls() {
        const {
          isEditing,
          getSubmitButtonProps,
          getCancelButtonProps,
          getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
          <ButtonGroup justifyContent='center' size='sm'>
            <IconButton icon={<CheckIcon boxSize={2}/>} {...getSubmitButtonProps()} isDisabled={!commentText} onClick={updateComment}/>
            <IconButton icon={<CloseIcon boxSize={2}/>} {...getCancelButtonProps()} />
          </ButtonGroup>
        ) : (
          <Flex justifyContent='center'>
            <IconButton size='sm' icon={<EditIcon boxSize={2}/>} {...getEditButtonProps()} />
          </Flex>
        )
      }

    return (
      <Editable
        textAlign='center'
        defaultValue={annotation.comment}
        fontSize='xl'
        isPreviewFocusable={false}
      >
        <EditablePreview />
        <Input as={EditableInput} onChange={(e)=>setCommentText(e.target.value)}/>
        <EditableControls />
      </Editable>
    )
}

export default NoteContainer
