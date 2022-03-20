import { UseFormReturn } from 'react-hook-form'
import { PaymentOrderData } from '~/entities'

export interface FormValues {
  outstandingOrderIds: Array<string | null>
  dueOrderIds: Array<string | null>
}

export interface CustomCollapsibleFeesProps {
  form: UseFormReturn<FormValues>
  dataSource: PaymentOrderData[]
}
