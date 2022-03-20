import { CurrencyCode, Money } from './money'

export interface PaymentOrderData {
  id: string
  concept: string
  name: string
  price: string
  price_currency: CurrencyCode
  due: string
  status: 'PAID' | 'DUE' | 'OUTSTANDING'
  interest: string
  discount?: string
  payin: null | {
    id: string
    created: string
  }
}

export class PaymentOrder {
  constructor(private data: PaymentOrderData) {
    this.data = data
  }

  get id() {
    return this.data.id
  }

  get name() {
    return this.data.name
  }

  get hasInterest() {
    const value = Number(this.data.interest)

    return !Number.isNaN(value) && value > 0
  }

  get hasDiscount() {
    const value = Number(this.data.discount)

    return !Number.isNaN(value) && value > 0
  }

  get interest() {
    const amount = this.data.interest
    const currency = this.data.price_currency

    return new Money(amount, currency)
  }

  get discount() {
    const amount = this.data.discount ?? ''
    const currency = this.data.price_currency

    return new Money(amount, currency)
  }

  get price() {
    const amount = this.data.price
    const currency = this.data.price_currency

    return new Money(amount, currency)
  }

  get paidAt() {
    const { payin } = this.data

    return !payin ? null : new Date(payin.created)
  }

  get dueAt() {
    return new Date(this.data.due)
  }
}
