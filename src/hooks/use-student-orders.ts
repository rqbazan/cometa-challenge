import * as React from 'react'
import groupBy from 'lodash.groupby'
import useSWR from 'swr'
import { PaymentOrderData } from '~/entities/payment-order'

function groupOrdersByStatus(orders?: PaymentOrderData[]) {
  const groups = orders ? groupBy(orders, order => order.status) : null

  return {
    paidOrders: groups?.PAID ?? [],
    dueOrders: groups?.DUE ?? [],
    outstandingOrder: groups?.OUTSTANDING ?? [],
  }
}

export function useStudentOrders(studentId: string) {
  const { data, error } = useSWR<PaymentOrderData[]>(`/students/${studentId}/orders`)

  const groupedOrders = React.useMemo(() => groupOrdersByStatus(data), [data])

  return {
    ...groupedOrders,
    orders: data,
    isLoading: !error && !data,
    isError: error,
  }
}
