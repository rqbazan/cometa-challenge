import { UseFormReturn } from 'react-hook-form'
import { PaymentOrderData } from '~/entities'
import { IndexedObj } from '~/utils'

export interface FormValues {
  orderIds: {
    [id: string]: {
      selected: boolean
    }
  }
}

export interface CustomCollapsibleFeesProps {
  form: UseFormReturn<FormValues>
  dataSource: PaymentOrderData[]
  indexedObj: IndexedObj
}
