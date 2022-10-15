import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Flex,
  UseDisclosureProps,
} from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { MdArrowBack } from "react-icons/md"
import { TimezoneController } from "../backend/controllers/timezone"
import { Timezone } from "../backend/models/timezone"
import { HiddenSmooth } from "../components/hidden-smooth"
import { IconButton } from "../components/icon-button"
import { Input } from "../components/input"
import { Profile } from "../components/profile"
import { debounce } from "../utils/debounce"
import { removeAccent } from "../utils/remove-accent"

const timezoneController = new TimezoneController()
const timezonesData = timezoneController.findAll()

interface Props extends UseDisclosureProps {
  onSelect: (timezone: Timezone) => void
}

export function TimezoneModal({ isOpen, onClose, onSelect }: Props) {
  const [query, setQuery] = useState("")
  const regExp = RegExp(removeAccent(query), "i")
  function filterTimezones(timezone: Timezone) {
    if (query.match(/[0-9\+:-]/) || query.match(/gmt?/i)) {
      return timezone.name.includes(query.toUpperCase())
    }
    return Boolean(
      regExp.exec(removeAccent(timezone.country)) ||
        regExp.exec(removeAccent(timezone.city))
    )
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      motionPreset="none"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg="primary">
        <ModalBody padding="0" position="relative">
          <Flex
            padding="1rem"
            position="sticky"
            top="0"
            bg="primary"
            zIndex="1"
          >
            <Input
              onChange={debounce((e) => {
                setQuery(e.target.value)
              })}
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

          <AnimatePresence initial={false}>
            {timezonesData.map((timezone) => {
              const isVisible = filterTimezones(timezone)
              return (
                isVisible && (
                  <HiddenSmooth key={timezone.id}>
                    <Flex
                      bg="primary"
                      cursor="pointer"
                      _hover={{
                        bg: "secondary",
                      }}
                      onClick={() => {
                        onSelect(timezone)
                        onClose()
                        setQuery("")
                      }}
                    >
                      <Profile
                        country={timezone.country}
                        title={timezone.city}
                        text={timezone.name}
                      />
                    </Flex>
                  </HiddenSmooth>
                )
              )
            })}
          </AnimatePresence>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
