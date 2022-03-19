import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { PaymentOrder, PaymentOrderData } from '~/entities'
import { DuePaymentOrderCard } from './index'

export default {
  title: 'components/PaymentOrderCard',
  component: DuePaymentOrderCard,
} as ComponentMeta<typeof DuePaymentOrderCard>

const data: PaymentOrderData = {
  id: 'ac1d2527-a0ec-4d98-a981-7c97c50580cf',
  concept: 'MONTHLY',
  name: 'Colegiatura Febrero 22',
  price: '5000.00',
  price_currency: 'MXN',
  due: '2022-02-05',
  status: 'DUE',
  interest: '500.00',
  payin: null,
}

export const Due: ComponentStory<typeof DuePaymentOrderCard> = args => {
  return <DuePaymentOrderCard {...args} />
}

Due.args = {
  paymentOrder: new PaymentOrder(data),
}

export const DueWithDiscount: ComponentStory<typeof DuePaymentOrderCard> = args => {
  return <DuePaymentOrderCard {...args} />
}

DueWithDiscount.args = {
  paymentOrder: new PaymentOrder({
    ...data,
    discount: '100.00',
  }),
}
