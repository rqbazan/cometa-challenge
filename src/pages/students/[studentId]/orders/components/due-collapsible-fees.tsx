import { PaymentOrder } from '~/entities'
import { CollapsibleFees, DuePaymentOrderCard } from '~/ui/components'
import { SELECTION_COPY } from '../constants'
import { useCheckboxPropsGetter } from '../hooks'
import { CustomCollapsibleFeesProps } from '../types'

export function DueCollapsibleFees({ dataSource, form, indexedObj }: CustomCollapsibleFeesProps) {
  const getCheckboxProps = useCheckboxPropsGetter(form, indexedObj)

  return (
    <CollapsibleFees title="Cuotas futuras" subtitle={SELECTION_COPY}>
      {dataSource.map(order => {
        const paymentOrder = new PaymentOrder(order)

        return (
          <DuePaymentOrderCard
            key={order.id}
            paymentOrder={paymentOrder}
            checkboxProps={getCheckboxProps(paymentOrder)}
          />
        )
      })}
    </CollapsibleFees>
  )
}
