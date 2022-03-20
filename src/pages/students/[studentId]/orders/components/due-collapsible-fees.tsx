import { PaymentOrder } from '~/entities'
import { CollapsibleFees, DuePaymentOrderCard } from '~/ui/components'
import { useCheckboxOnChange } from '../hooks'
import { selectionDisclaimerText } from '../shared'
import { CustomCollapsibleFeesProps } from '../types'

export function DueCollapsibleFees({ dataSource, form }: CustomCollapsibleFeesProps) {
  const getOnChange = useCheckboxOnChange()

  const [dueOrderIds, outstandingOrderIds] = form.watch(['dueOrderIds', 'outstandingOrderIds'])

  const allOutstandingOrdersSelected = outstandingOrderIds.every(Boolean)

  function getSubtitle() {
    const someDueOrderIsSelected = dueOrderIds.some(Boolean)

    if (someDueOrderIsSelected || !allOutstandingOrdersSelected) {
      return null
    }

    return selectionDisclaimerText
  }

  return (
    <CollapsibleFees title="Cuotas futuras" subtitle={getSubtitle()}>
      {dataSource.map((order, index) => {
        const isDisabled = index === 0 ? !allOutstandingOrdersSelected : !dueOrderIds[index - 1]
        const paymentOrder = new PaymentOrder(order)

        return (
          <DuePaymentOrderCard
            key={order.id}
            paymentOrder={paymentOrder}
            checkboxProps={{
              ...form.register(`dueOrderIds.${index}`, {
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
