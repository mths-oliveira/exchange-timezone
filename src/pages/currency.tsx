import {
  Box,
  Collapse,
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
import { removeAccent } from "../utils/remove-accent"
import { ToggleThemeButton } from "../components/toggle-theme-button"
import { Drawer } from "../components/drawer"

import { debounce } from "../utils/debounce"

import {
  CurrencyController,
  CurrencyData,
} from "../backend/controllers/currencies"
import { GetServerSideProps } from "next"
import { ProductsController } from "../backend/controllers/products"
import { Currency } from "../backend/models/currency"

const currencyController = new CurrencyController()

const currenciesData = currencyController.findAllData()
const productsController = new ProductsController()

export default function ({ initialCurrency }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currency, setCurrency] = useState<Currency>(initialCurrency)
  const currencyData = currencyController.findDataByCode(currency.code)
  const products = productsController.findAllByCurrencyQuote(currency.value)

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
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        onChange={debounce((e) => {
          setQuery(e.target.value)
        })}
      >
        {currenciesData.map((currency) => (
          <Collapse
            in={filterCurrency(currency)}
            key={currency.code}
            animateOpacity
          >
            <Flex
              alignItems="center"
              cursor="pointer"
              _hover={{ bg: "secondary" }}
              onClick={async () => {
                const data = await currencyController.findCurrencyByCode(
                  currency.code
                )
                setCurrency(data)
                onClose()
              }}
            >
              <FlagImage country={currency.country} />
              <Box fontWeight="600">
                <Text>{currency.name}</Text>
                <Text fontSize="14px" color="altText">
                  {currency.code}
                </Text>
              </Box>
            </Flex>
          </Collapse>
        ))}
      </Drawer>
      <Flex justifyContent="space-between" alignItems="center" marginY="1.5rem">
        <Flex onClick={onOpen} alignItems="center" cursor="pointer">
          <FlagImage country={currencyData.country} />
          <Box>
            <Text>{currency.name}</Text>
            <Text fontSize="14px" color="altText">
              {currency.code}
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
            "&:nth-child(2)": {
              width: "100%",
            },
            "&:last-child": {
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              "&>*:last-child": {
                marginLeft: "0.25rem",
              },
            },
          },
          "&>*>tr>th": {
            color: "altText",
          },
        }}
      >
        <TableCaption padding="1rem" color="altText">
          Horários de início da primeira e da última aula de cada dia. (Horário
          de
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Produto</Th>
            <Th>Pagamento</Th>
            <Th>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Wol</Td>
            <Td>Mensalidade</Td>
            <Td>
              <Text>{currency.symbol}</Text>
              <Text>{products.wol.monthlyPayment}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Mult Wol</Td>
            <Td>Mensalidade</Td>
            <Td>
              <Text>{currency.symbol}</Text>
              <Text>{products.multWol.monthlyPayment}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Live</Td>
            <Td>Matrícula</Td>
            <Td>
              <Text>{currency.symbol}</Text>
              <Text>{products.live.enrolmentFee}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Live</Td>
            <Td>Mensalidade</Td>
            <Td>
              <Text>{currency.symbol}</Text>
              <Text>{products.live.monthlyPayment}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Mult Live</Td>
            <Td>Matrícula</Td>
            <Td>
              <Text>{currency.symbol}</Text>
              <Text>{products.multLive.enrolmentFee}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Mult Live</Td>
            <Td>Mensalidade</Td>
            <Td>
              <Text>{currency.symbol}</Text>
              <Text>{products.multLive.monthlyPayment}</Text>
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Produto</Th>
            <Th>Pagamento</Th>
            <Th>Valor</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { code, name, symbol, value } =
    await currencyController.findCurrencyByCode("BRL")
  return {
    props: {
      initialCurrency: {
        code,
        name,
        symbol,
        value,
      },
    },
  }
}
