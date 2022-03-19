import type { CheckboxProps } from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { PaymentOrder } from '~/entities'
import { DateFormatter } from '~/formatters'
import { Card, OutstandingCardAction, StyledCardHeader } from '../helpers'

interface OutstandingPaymentOrderCardProps {
  paymentOrder: PaymentOrder
  checkboxProps: CheckboxProps
}

export function OutstandingPaymentOrderCard({
  paymentOrder,
  checkboxProps,
}: OutstandingPaymentOrderCardProps) {
  return (
    <Card>
      <StyledCardHeader
        disableTypography
        action={<OutstandingCardAction paymentOrder={paymentOrder} checkboxProps={checkboxProps} />}
        title={<Typography variant="body2">{paymentOrder.name}</Typography>}
        subheader={
          <Typography variant="caption">
            {paymentOrder.hasInterest ? 'Vencido' : 'Vence'} el{' '}
            {DateFormatter.toShortString(paymentOrder.dueAt)}
          </Typography>
        }
      />
    </Card>
  )
}
