export type CurrencyCode = 'MXN' | 'USD' | 'PEN'

export type TAmount = number

export class Money {
  private _amount: TAmount
  private _currencyCode: CurrencyCode

  constructor(amount: string, currency: CurrencyCode) {
    this._amount = Number(amount)
    this._currencyCode = currency
  }

  get amount() {
    return this._amount
  }

  get currencyCode() {
    return this._currencyCode
  }
}
