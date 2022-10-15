import {
  Box,
  Collapse,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TimezoneController } from "../backend/controllers/timezone"
import { FlagImage } from "../components/flag-image"
import { removeAccent } from "../utils/remove-accent"
import { ToggleThemeButton } from "../components/toggle-theme-button"
import { Drawer } from "../components/drawer"
import { Timezone } from "../backend/models/timezone"
import { debounce } from "../utils/debounce"
import { ClassesController } from "../backend/controllers/classes"

const timezoneController = new TimezoneController()
const timezonesData = timezoneController.findAll()
const initialTimezone = timezoneController.findById("America/Sao_Paulo")

const classesController = new ClassesController()

export default function () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [timezone, setTimezone] = useState(initialTimezone)
  const classes = classesController.findAllByTimezone(timezone.offset)
  console.log(classes)
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
  useEffect(() => {
    if (!isOpen) setQuery("")
  }, [isOpen])
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      >
        {timezonesData.map((timezone) => (
          <Collapse
            in={filterTimezones(timezone)}
            key={timezone.id}
            animateOpacity
          >
            <Flex
              alignItems="center"
              cursor="pointer"
              _hover={{ bg: "secondary" }}
              onClick={() => {
                setTimezone(timezone)
                onClose()
              }}
            >
              <FlagImage country={timezone.country} />
              <Box fontWeight="600">
                <Text>{timezone.city}</Text>
                <Text fontSize="14px" color="altText">
                  {timezone.name}
                </Text>
              </Box>
            </Flex>
          </Collapse>
        ))}
      </Drawer>
      <Flex justifyContent="space-between" alignItems="center" marginY="1.5rem">
        <Flex onClick={onOpen} alignItems="center" cursor="pointer">
          <FlagImage country={timezone.country} />
          <Box fontWeight="600">
            <Text>{timezone.city}</Text>
            <Text fontSize="14px" color="altText">
              {timezone.name}
            </Text>
          </Box>
        </Flex>
        <ToggleThemeButton />
      </Flex>

      <Table
        variant="simple"
        sx={{
          "&>*>tr>*": {
            paddingX: "1rem",
            borderColor: "borderColor",
            whiteSpace: "nowrap",
            "&:first-child": {
              width: "100%",
            },
          },
          "&>*>tr>th": {
            color: "altText",
          },
        }}
      >
        <TableCaption padding="1rem" color="altText">
          Horários de início da primeira e da última aula de cada dia. (Horário
          de {timezone.city})
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Dias da semana</Th>
            <Th>De</Th>
            <Th>Às</Th>
          </Tr>
        </Thead>
        <Tbody>
          {classes.map(({ classes, weekdays }) => (
            <Tr key={weekdays}>
              <Td>{weekdays}</Td>
              {classes.map((hours) => (
                <Td key={hours + weekdays}>{hours}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Dias da semana</Th>
            <Th>De</Th>
            <Th>Às</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  )
}
