import {
  ModalContent,
  Modal as ChakraModal,
  ModalOverlay,
  ModalProps,
  ModalBody,
  Flex,
} from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { MdArrowBack } from "react-icons/md"
import { IconButton } from "./icon-button"
import { Input } from "./input"

interface Props extends ModalProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Modal({ isOpen, onClose, children, onChange }: Props) {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      motionPreset="none"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg="primary" position="relative">
        <ModalBody padding="0">
          <Flex
            padding="1rem"
            position="sticky"
            bottom="0"
            bg="primary"
            zIndex="1"
          >
            <Input
              onChange={onChange}
              placeholder="Pesquise por País, Cidade ou Fuso horário"
            />
            <IconButton
              order={-1}
              fontSize="1.5rem"
              marginX="0.5rem"
              icon={MdArrowBack}
              onClick={onClose}
            />
          </Flex>
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
