import { MXN, PEN, USD } from '@dinero.js/currencies'
import { Currency, Dinero, dinero, toFormat, toSnapshot, Transformer } from 'dinero.js'
import { CurrencyCode, Money, TAmount } from '~/entities'

const currencies: Record<CurrencyCode, Currency<TAmount>> = {
  MXN,
  PEN,
  USD,
}

const symbols: Record<CurrencyCode, string> = {
  MXN: '$',
  PEN: 'S/',
  USD: '$',
}

const transformer: Transformer<TAmount> = ({ amount, currency }) => {
  const isZero = Number.isNaN(amount) || amount === 0
  const symbol = symbols[currency.code as CurrencyCode]

  return `${symbol} ${isZero ? '---' : amount.toFixed(2)}`
}

export class MoneyFormatter {
  static toString(money: Money) {
    const dInstance = MoneyFormatter.toDinero(money)

    return dInstance ? toFormat(dInstance, transformer) : ''
  }

  static toDinero(money: Money) {
    try {
      return dinero({
        currency: currencies[money.currencyCode],
        amount: money.amount,
        scale: 0,
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }

  static fromDinero(dInstance: Dinero<TAmount>) {
    const snapshot = toSnapshot(dInstance)
    const amount = snapshot.amount.toString()
    const currencyCode = snapshot.currency.code as CurrencyCode

    return new Money(amount, currencyCode)
  }
}
