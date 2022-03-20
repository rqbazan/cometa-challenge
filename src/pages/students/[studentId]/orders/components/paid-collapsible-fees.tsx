import { PaymentOrder, PaymentOrderData } from '~/entities'
import { CollapsibleFees, PaidPaymentOrderCard } from '~/ui/components'

interface PaidCollapsibleFeesProps {
  dataSource: PaymentOrderData[]
}

export function PaidCollapsibleFees({ dataSource }: PaidCollapsibleFeesProps) {
  return (
    <CollapsibleFees title="Cuotas pagadas">
      {dataSource.map(order => (
        <PaidPaymentOrderCard key={order.id} paymentOrder={new PaymentOrder(order)} />
      ))}
    </CollapsibleFees>
  )
}
