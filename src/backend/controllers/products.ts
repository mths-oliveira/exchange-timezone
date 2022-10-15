import { currencyMask } from "../../utils/currency-mask"
import products from "../database/products.json"

interface Product {
  wol: {
    monthlyPayment: number
  }
  multWol: {
    monthlyPayment: number
  }
  live: {
    enrolmentFee: number
    monthlyPayment: number
  }
  multLive: {
    enrolmentFee: number
    monthlyPayment: number
  }
}

export class ProductsController {
  findAllByCurrencyQuote(currencyQuote: number = 1) {
    const data = {}
    for (const productName in products) {
      const product = products[productName]
      for (const payment in product) {
        data[productName] = {
          ...data[productName],
          [payment]: currencyMask(product[payment] / currencyQuote),
        }
      }
    }
    return data as Product
  }
}
