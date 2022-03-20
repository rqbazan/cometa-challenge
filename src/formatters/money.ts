import { MXN, PEN, USD } from '@dinero.js/currencies'
import { Currency, Dinero, dinero, toFormat, toSnapshot, Transformer } from 'dinero.js'
import { CurrencyCode, Money, TAmount } from '~/entities/money'

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

    return toFormat(dInstance, transformer)
  }

  static toDinero(money: Money) {
    const currency = currencies[money.currencyCode]

    return dinero({ currency, amount: money.amount, scale: 0 })
  }

  static fromDinero(dInstance: Dinero<TAmount>) {
    const snapshot = toSnapshot(dInstance)
    const amount = snapshot.amount.toString()
    const currencyCode = snapshot.currency.code as CurrencyCode

    return new Money(amount, currencyCode)
  }
}
