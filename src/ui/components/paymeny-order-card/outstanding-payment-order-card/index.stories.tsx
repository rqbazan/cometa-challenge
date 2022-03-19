import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { PaymentOrder, PaymentOrderData } from '~/entities'
import { OutstandingPaymentOrderCard } from './index'

export default {
  title: 'components/PaymentOrderCard',
  component: OutstandingPaymentOrderCard,
} as ComponentMeta<typeof OutstandingPaymentOrderCard>

const data: PaymentOrderData = {
  id: 'c2866664-020a-4df3-a078-f08337c3cb3a',
  concept: 'MONTHLY',
  name: 'Colegiatura Marzo 22',
  price: '5000.00',
  price_currency: 'MXN',
  due: '2022-03-05',
  status: 'OUTSTANDING',
  interest: 'None',
  payin: null,
}

export const Outstanding: ComponentStory<typeof OutstandingPaymentOrderCard> = args => {
  return <OutstandingPaymentOrderCard {...args} />
}

Outstanding.args = {
  paymentOrder: new PaymentOrder(data),
}

export const OutstandingWithInterest: ComponentStory<typeof OutstandingPaymentOrderCard> = args => {
  return <OutstandingPaymentOrderCard {...args} />
}

OutstandingWithInterest.args = {
  paymentOrder: new PaymentOrder({
    ...data,
    interest: '200.00',
  }),
}
