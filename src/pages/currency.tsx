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
import { CurrencyController } from "../backend/controllers/currencies"
import { GetServerSideProps } from "next"
import { ProductsController } from "../backend/controllers/products"
import { Currency } from "../backend/models/currency"
import { CurrencyModal } from "../views/currency-modal"
import { Profile } from "../components/profile"

const currencyController = new CurrencyController()
const productsController = new ProductsController()

export default function ({ initialCurrency }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currency, setCurrency] = useState<Currency>(initialCurrency)
  const currencyData = currencyController.findDataByCode(currency.code)
  const products = productsController.findAllByCurrencyQuote(currency.value)

  return (
    <>
      <CurrencyModal
        isOpen={isOpen}
        onClose={onClose}
        onSelect={async (currenciesData) => {
          const currency = await currencyController.findCurrencyByCode(
            currenciesData.code
          )
          setCurrency(currency)
        }}
      />
      <Flex justifyContent="space-between" alignItems="center" marginY="1.5rem">
        <Flex onClick={onOpen} alignItems="center" cursor="pointer">
          <Profile
            country={currencyData.country}
            title={currencyData.name}
            text={currencyData.code}
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
          Valores de cada produto em {currency.name}
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
