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
  const { data, error } = useSWR<PaymentOrderData[]>(KeysFormatter.getStudentOrders(studentId))

  const groupedOrders = React.useMemo(() => groupOrdersByStatus(data), [data])

  return {
    ...groupedOrders,
    orders: data,
    isLoading: !error && !data,
    isError: error,
  }
}
