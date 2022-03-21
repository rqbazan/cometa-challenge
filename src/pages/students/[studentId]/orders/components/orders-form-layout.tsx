import * as React from 'react'
import Fade from '@mui/material/Fade'
import { MoneyFormatter } from '~/formatters'
import { useScopedMoney } from '~/hooks'
import { FloatingButton } from '~/ui/components'
import { StyledForm } from './styled-form'

interface OrdersFormLayoutProps {
  children: React.ReactNode
  onSubmit: (e?: React.BaseSyntheticEvent) => void
}

export function OrdersFormLayout({ onSubmit, children }: OrdersFormLayoutProps) {
  const totalMoney = useScopedMoney()

  const totalIsNotZero = totalMoney.amount > 0

  return (
    <StyledForm onSubmit={onSubmit} extraPaddingBottom={totalIsNotZero}>
      {children}
      <Fade in={totalIsNotZero}>
        <FloatingButton type="submit">{`Ir a pagar ${MoneyFormatter.toString(
          totalMoney
        )}`}</FloatingButton>
      </Fade>
    </StyledForm>
  )
}
