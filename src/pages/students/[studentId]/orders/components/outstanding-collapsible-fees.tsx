import { PaymentOrder } from '~/entities'
import { CollapsibleFees, OutstandingPaymentOrderCard } from '~/ui/components'
import { SELECTION_COPY } from '../constants'
import { useCheckboxPropsGetter } from '../hooks'
import { CustomCollapsibleFeesProps } from '../types'

export function OutstandingCollapsibleFees({
  dataSource,
  form,
  indexedObj,
}: CustomCollapsibleFeesProps) {
  const getCheckboxProps = useCheckboxPropsGetter(form, indexedObj)

  return (
    <CollapsibleFees title="Cuotas pendientes" subtitle={SELECTION_COPY}>
      {dataSource.map(order => {
        const paymentOrder = new PaymentOrder(order)

        return (
          <OutstandingPaymentOrderCard
            key={order.id}
            paymentOrder={paymentOrder}
            checkboxProps={getCheckboxProps(paymentOrder)}
          />
        )
      })}
    </CollapsibleFees>
  )
}
