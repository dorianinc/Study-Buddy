import { useEffect, useRef } from "react";
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

// TODO: Make individual note components into Editables and reorderable

function MyNotes({annotations}) {
  const document = {
    name: "Math homework",
  };

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
          <DrawerHeader>{document.name} Notes</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <Editable defaultValue="">
            <EditablePreview />
            <EditableTextarea />
          </Editable>

          {annotations?
            annotations.map((annotation) => (
              <div key={annotation.id}>
                <div>{annotation.comment}</div>
                <hr />
                <br />
              </div>
            )) : null
            }

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
