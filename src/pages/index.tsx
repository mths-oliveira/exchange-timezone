import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"
import { FlagImage } from "../components/flag-image"
import { ToggleThemeButton } from "../components/toggle-theme-button"
import { ClassesController } from "../backend/controllers/classes"
import { TimezoneController } from "../backend/controllers/timezone"
import { TimezoneModal } from "../views/timezone-modal"
import { Profile } from "../components/profile"

const timezoneController = new TimezoneController()
const initialTimezone = timezoneController.findById("America/Sao_Paulo")
const classesController = new ClassesController()

export default function () {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [timezone, setTimezone] = useState(initialTimezone)
  const classes = classesController.findAllByTimezone(timezone.offset)

  return (
    <>
      <TimezoneModal isOpen={isOpen} onClose={onClose} onSelect={setTimezone} />
      <Flex justifyContent="space-between" alignItems="center" marginY="1.5rem">
        <Flex onClick={onOpen} alignItems="center" cursor="pointer">
          <Profile
            title={timezone.city}
            text={timezone.name}
            country={timezone.country}
          />
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
          de {timezone.city}, {timezone.country})
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
