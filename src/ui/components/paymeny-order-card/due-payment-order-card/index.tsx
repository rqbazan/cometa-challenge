import type { CheckboxProps } from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { PaymentOrder } from '~/entities'
import { DateFormatter } from '~/formatters'
import { Card, DueCardAction, StyledCardHeader } from '../helpers'

interface DuePaymentOrderCardProps {
  paymentOrder: PaymentOrder
  checkboxProps: CheckboxProps
}

export function DuePaymentOrderCard({ paymentOrder, checkboxProps }: DuePaymentOrderCardProps) {
  return (
    <Card>
      <StyledCardHeader
        disableTypography
        action={<DueCardAction paymentOrder={paymentOrder} checkboxProps={checkboxProps} />}
        title={<Typography variant="body2">{paymentOrder.name}</Typography>}
        subheader={
          <Typography variant="caption">
            {paymentOrder.hasDiscount ? 'Ahorra hasta' : 'Vence'} el{' '}
            {DateFormatter.toShortString(paymentOrder.dueAt)}
          </Typography>
        }
      />
    </Card>
  )
}
