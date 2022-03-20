import useSWR from 'swr'
import { PaymentOrderData } from '~/entities/payment-order'

export function useStudentInfo(studentId: string) {
  const { data, error } = useSWR<PaymentOrderData[]>(`/students/${studentId}/orders`)

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  }
}
