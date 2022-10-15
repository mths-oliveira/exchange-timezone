import currenciesData from "../database/currencies.json"

export class CurrenciesDataRepository {
  private currencies = []
  constructor() {
    for (const code in currenciesData) {
      const currencyData = currenciesData[code]
      this.currencies.push({
        ...currencyData,
        code,
      })
    }
  }
  findAll() {
    return this.currencies
  }
}
