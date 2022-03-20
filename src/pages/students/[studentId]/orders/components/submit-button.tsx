import Fade from '@mui/material/Fade'
import { UseFormReturn } from 'react-hook-form'
import { FloatingButton } from '~/ui/components'
import { FormValues } from '../types'

interface SubmitButtonProps {
  form: UseFormReturn<FormValues>
}

export function SubmitButton({ form }: SubmitButtonProps) {
  const outstandingOrderIds = form.watch('outstandingOrderIds')
  const someOutstandingOrderIsSelected = outstandingOrderIds.some(Boolean)

  return (
    <Fade in={someOutstandingOrderIsSelected}>
      <FloatingButton type="submit">Ir a Pagar</FloatingButton>
    </Fade>
  )
}
