import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  Editable,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";


import NoteContainer from './NoteContainer.jsx'
import { useGetAllAnnotationsQuery } from "../../store/features/api.js";
// TODO: Make individual note components into Editables and reorderable

function MyNotes({docId}) {
  // const {data:annotation} = useGetAllAnnotationsQuery({docId})
  // const {data:annotations} = useGetAllAnnotationsQuery({docId})
  // // const annotation = useSelector(state=>state.annotation)
  // const {data} = useGetAllAnnotationsQuery({docId})
  const document = useSelector((state) => state.document[docId])
  const data = useSelector(state=>state.annotation.annotations)
  const annotations = Object.values(data).sort((a,b)=>Date.parse(b.createdAt) - Date.parse(a.createdAt))
  // console.log('entered MyNotes',testingdata)
  console.log('annotations',annotations)

  // console.log('this is annotations',annotations)

  // useEffect(()=>{
  //   useGetAllAnnotationsQuery({docId})
  // },[annotation])
  // TODO: pass in docId to this component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const navigationHeight = 50;
  let middleHeight = window.innerHeight / 2 - navigationHeight;
  useEffect(() => {
    const handleResize = () => {
      // height of Navigation component
      const middleHeight = window.innerHeight / 2 - navigationHeight;
      btnRef.current.style.bottom = `${middleHeight}px`;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log('mynote',document?.location)

  return (
    <>
      <Button
        ref={btnRef}
        leftIcon={<ArrowLeftIcon />}
        color="blue.300"
        iconSpacing={1}
        variant="outline"
        borderRadius={50}
        aria-label="Open Notes"
        fontSize="20px"
        position="fixed"
        right="50px"
        bottom={middleHeight}
        zIndex={2}
        onClick={onOpen}
      >
        Notes
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{document?.name} Notes</DrawerHeader>

          <DrawerBody>

          {annotations?.map(ele=>{
            if(ele.comment) return <NoteContainer key={ele.id} annotation={ele}/>
            })}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default MyNotes;
