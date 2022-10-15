import {
  DrawerContent,
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerProps,
  DrawerBody,
  Flex,
} from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { MdArrowBack } from "react-icons/md"
import { IconButton } from "./icon-button"
import { Input } from "./input"

interface Props extends DrawerProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Drawer({ isOpen, onClose, children, onChange }: Props) {
  return (
    <ChakraDrawer
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      placement="left"
    >
      <DrawerOverlay />
      <DrawerContent bg="primary">
        <DrawerBody padding="0">
          <Flex
            padding="1rem"
            position="sticky"
            top="0"
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
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  )
}
