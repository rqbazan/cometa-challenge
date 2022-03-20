import * as React from 'react'
import groupBy from 'lodash.groupby'
import useSWR from 'swr'
import { PaymentOrderData } from '~/entities/payment-order'
import { KeysFormatter } from '~/formatters'

function groupOrdersByStatus(orders?: PaymentOrderData[]) {
  const groups = orders ? groupBy(orders, order => order.status) : null

  return {
    paidOrders: groups?.PAID ?? [],
    outstandingOrders: groups?.OUTSTANDING ?? [],
    dueOrders: groups?.DUE ?? [],
  }
}

export function useStudentOrders(studentId: string) {
  const { data: orders, error } = useSWR<PaymentOrderData[]>(
    KeysFormatter.getStudentOrders(studentId)
  )

  const memoizedOrders = React.useMemo(() => {
    const groupedOrders = groupOrdersByStatus(orders)

    return {
      ...groupedOrders,
      // prettier-ignore
      payableOrders: [
        ...groupedOrders.outstandingOrders,
        ...groupedOrders.dueOrders
      ],
    }
  }, [orders])

  return {
    ...memoizedOrders,
    orders: orders,
    isLoading: !error && !orders,
    isError: error,
  }
}
