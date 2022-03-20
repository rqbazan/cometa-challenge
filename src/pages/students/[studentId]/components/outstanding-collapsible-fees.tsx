import { PaymentOrder } from '~/entities'
import { CollapsibleFees, OutstandingPaymentOrderCard } from '~/ui/components'
import { useCheckboxOnChange } from '../hooks'
import { selectionDisclaimerText } from '../shared'
import { CustomCollapsibleFeesProps } from '../types'

export function OutstandingCollapsibleFees({ dataSource, form }: CustomCollapsibleFeesProps) {
  const getOnChange = useCheckboxOnChange()

  const outstandingOrderIds = form.watch('outstandingOrderIds')

  const someOutstandingOrderIsSelected = outstandingOrderIds.some(Boolean)

  return (
    <CollapsibleFees
      title="Cuotas pendientes"
      subtitle={someOutstandingOrderIsSelected ? null : selectionDisclaimerText}
    >
      {dataSource.map((order, index) => {
        const isDisabled = index === 0 ? false : !outstandingOrderIds[index - 1]
        const paymentOrder = new PaymentOrder(order)

        return (
          <OutstandingPaymentOrderCard
            key={order.id}
            paymentOrder={paymentOrder}
            checkboxProps={{
              ...form.register(`outstandingOrderIds.${index}`, {
                onChange: getOnChange(paymentOrder.price),
              }),
              disabled: isDisabled,
              value: order.id,
            }}
          />
        )
      })}
    </CollapsibleFees>
  )
}
