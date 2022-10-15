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
import {
  CurrencyController,
  CurrencyData,
} from "../backend/controllers/currencies"
import { HiddenSmooth } from "../components/hidden-smooth"
import { IconButton } from "../components/icon-button"
import { Input } from "../components/input"
import { Profile } from "../components/profile"
import { debounce } from "../utils/debounce"
import { removeAccent } from "../utils/remove-accent"

const currencyController = new CurrencyController()
const currencyData = currencyController.findAllData()

interface Props extends UseDisclosureProps {
  onSelect: (currency: CurrencyData) => void
}

export function CurrencyModal({ isOpen, onClose, onSelect }: Props) {
  const [query, setQuery] = useState("")
  const regExp = RegExp(removeAccent(query), "i")
  function filterCurrency(currency: CurrencyData) {
    return Boolean(
      regExp.exec(removeAccent(currency.name)) ||
        regExp.exec(removeAccent(currency.country)) ||
        regExp.exec(currency.code)
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
            {currencyData.map((currency) => {
              const isVisible = filterCurrency(currency)
              return (
                isVisible && (
                  <HiddenSmooth key={currency.code}>
                    <Flex
                      bg="primary"
                      cursor="pointer"
                      _hover={{
                        bg: "secondary",
                      }}
                      onClick={() => {
                        onSelect(currency)
                        onClose()
                        setQuery("")
                      }}
                    >
                      <Profile
                        country={currency.country}
                        title={currency.name}
                        text={currency.code}
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
