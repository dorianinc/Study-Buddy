import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    useDisclosure,
    Button
} from '@chakra-ui/react'

function NotePopup({ passage, onModal }) {
    const { isOpen, onToggle, onClose } = useDisclosure()
    return (
        <>
            <h1>teseting</h1>
            <Button onClick={onToggle}>
                trigger
            </Button>
            <Popover
                isOpen={isOpen}
                onClose={onClose}
            >
                <PopoverTrigger>
                    <Button colorScheme='pink'>Popover Target</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverHeader>testing</PopoverHeader>
                    <PopoverBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore.
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default NotePopup
