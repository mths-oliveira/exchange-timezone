import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ModalProps,
} from "@chakra-ui/react"

interface ModalWraperProps extends ModalProps {}

export function Modal({ children, ...rest }: ModalProps) {
  return (
    <>
      <ChakraModal {...rest}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  )
}
