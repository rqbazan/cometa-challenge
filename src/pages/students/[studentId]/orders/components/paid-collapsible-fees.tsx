import { PaymentOrder } from '~/entities'
import { CollapsibleFees, PaidPaymentOrderCard } from '~/ui/components'
import { CustomCollapsibleFeesProps } from '../types'

export function PaidCollapsibleFees({ dataSource }: Omit<CustomCollapsibleFeesProps, 'form'>) {
  return (
    <CollapsibleFees title="Cuotas pagadas">
      {dataSource.map(order => (
        <PaidPaymentOrderCard key={order.id} paymentOrder={new PaymentOrder(order)} />
      ))}
    </CollapsibleFees>
  )
}
