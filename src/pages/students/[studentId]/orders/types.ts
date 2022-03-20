import { UseFormReturn } from 'react-hook-form'
import { PaymentOrderData } from '~/entities'

export interface FormValues {
  outstandingOrderIds: string[]
  dueOrderIds: string[]
}

export interface CustomCollapsibleFeesProps {
  form: UseFormReturn<FormValues>
  dataSource: PaymentOrderData[]
}
