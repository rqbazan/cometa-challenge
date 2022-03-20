import { UseFormReturn } from 'react-hook-form'
import { PaymentOrder } from '~/entities'
import { useScopedMoneyOps } from '~/hooks'
import { IndexedObj } from '~/utils'
import { FormValues } from '../types'

export function useCheckboxPropsGetter(form: UseFormReturn<FormValues>, indexedObj: IndexedObj) {
  const operations = useScopedMoneyOps()

  const orderIds = form.watch('orderIds')

  function getDisabled(order: PaymentOrder) {
    const { prevId, nextId } = indexedObj[order.id]

    const hasPrevUnselected = !!prevId && !orderIds[prevId].selected
    const hasNextSelected = !!nextId && !!orderIds[nextId].selected

    return hasPrevUnselected || hasNextSelected
  }

  return function getCheckboxProps(order: PaymentOrder) {
    return {
      disabled: getDisabled(order),
      ...form.register(`orderIds.${order.id}.selected`, {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.checked) {
            operations.add(order.price)
          } else {
            operations.substract(order.price)
          }
        },
      }),
    }
  }
}
