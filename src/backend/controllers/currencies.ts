import currencies from "../database/currencies.json"
import { Currency } from "../models/currency"
import { getCurrencyQuoteByCode } from "../services/get-currency-quote"

export interface CurrencyData {
  code: string
  country: string
  name: string
}

export class CurrencyController {
  async findCurrencyByCode(code: string) {
    const { name, symbol } = currencies[code]
    let value = 1
    if (code !== "BRL") value = await getCurrencyQuoteByCode(code)
    const currency = new Currency(code, name, symbol, value)
    return currency
  }
  findAllData() {
    return Object.keys(currencies).map((code) => {
      return this.findDataByCode(code)
    })
  }
  findDataByCode(code: string): CurrencyData {
    const { name, countries } = currencies[code]
    return {
      code,
      country: countries[0],
      name,
    }
  }
}
