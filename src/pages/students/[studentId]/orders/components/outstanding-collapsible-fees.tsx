import { PaymentOrder } from '~/entities'
import { CollapsibleFees, OutstandingPaymentOrderCard } from '~/ui/components'
import { useCheckboxPropsGetter } from '../hooks'
import { CustomCollapsibleFeesProps } from '../types'

export function OutstandingCollapsibleFees({
  dataSource,
  form,
  indexedObj,
}: CustomCollapsibleFeesProps) {
  const getCheckboxProps = useCheckboxPropsGetter(form, indexedObj)

  return (
    <CollapsibleFees title="Cuotas pendientes">
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
