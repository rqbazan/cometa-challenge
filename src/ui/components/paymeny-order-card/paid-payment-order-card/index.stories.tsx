import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { PaymentOrder } from '~/entities'
import { PaidPaymentOrderCard } from './index'

export default {
  title: 'components/PaymentOrderCard',
  component: PaidPaymentOrderCard,
} as ComponentMeta<typeof PaidPaymentOrderCard>

export const Paid: ComponentStory<typeof PaidPaymentOrderCard> = args => {
  return <PaidPaymentOrderCard {...args} />
}

Paid.args = {
  paymentOrder: new PaymentOrder({
    id: 'dc438d87-18fc-4f65-8927-d860d1496795',
    concept: 'MONTHLY',
    name: 'Colegiatura Enero 22',
    price: '5000.00',
    price_currency: 'MXN',
    due: '2022-01-05',
    status: 'PAID',
    interest: '1000.00',
    payin: {
      id: '487244ce-9a64-4bf8-8feb-e9599f1a7ee3',
      created: '2022-02-09T19:21:57.752070Z',
    },
  }),
}
