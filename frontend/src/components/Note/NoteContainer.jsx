
import {
    Editable,
    EditablePreview,
    EditableInput,
    useEditableControls,
    Flex,
    IconButton,
    ButtonGroup,
    EditableTextarea,
    Input,
    useControllableProp,
    Button,
    Container
} from "@chakra-ui/react";

import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

import { useState } from "react";
import { useDeleteAnnotationMutation, useUpdateAnnotationsMutation } from "../../store/features/api";
import { useSelector } from "react-redux";

const NoteContainer = ({ annotation }) => {
    const [commentText, setCommentText] = useState(annotation.comment)
    const [updateAnnotations] = useUpdateAnnotationsMutation();
    const [deleteAnnotation] = useDeleteAnnotationMutation();
    const user = useSelector(state => state.session.user);
    const annotationId = annotation.id

    async function updateComment() {
        await updateAnnotations({ user, annotationId, commentText })
    }

    async function deleteComment(){
        await deleteAnnotation({user,annotationId})
    }

    function updateHash(){

        window.location.hash = `highlight-${annotationId}`
    }
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
            handleSubmit,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup
                justifyContent='center'
                size ='l'
            >
                <IconButton icon={<CheckIcon boxSize={4} />} {...getSubmitButtonProps()} isDisabled={!commentText} />
                <IconButton icon={<CloseIcon boxSize={4} />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent='center'>
                <ButtonGroup
                    size='l'
                    bgColor='white'
                >
                    <IconButton gbColor='white' icon={<EditIcon boxSize={4} />} {...getEditButtonProps()} />
                    <IconButton icon={<DeleteIcon boxSize={4} />} onClick={deleteComment} />

                </ButtonGroup>
            </Flex>
        )
    }


    return (
        <Editable
            // textAlign='center'
            defaultValue={commentText}
            fontSize='xl'
            isPreviewFocusable={false}
            onSubmit={updateComment}
            display="flex"
            flexDirection='collumn'
            gap='5px'
            marginTop='10px'
            marginBottom="10px"
        >
            <Container
                maxHeight='200'
                overflowY="auto"
                onClick={updateHash}
                boxShadow='xs' p='6' rounded='md' bg='white'
                minHeight = '40px'
                >
            <EditablePreview
                _hover={{
                    background: "white",
                    color: "blue.500",
                    cursor:'pointer'
                  }}
                width='90%'
            />
            <Input
                as={EditableTextarea}
                onChange={(e) => setCommentText(e.target.value)}
                width='90%'
            />
            </Container>
            <EditableControls />

        </Editable>
    )
}

export default NoteContainer
