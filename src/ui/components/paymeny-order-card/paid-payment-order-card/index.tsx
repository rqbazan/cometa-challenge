import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { PaymentOrder } from '~/entities'
import { DateFormatter } from '~/formatters'
import { Card } from '../helpers'

interface PaidPaymentOrderCardProps {
  paymentOrder: PaymentOrder
}

export function PaidPaymentOrderCard({ paymentOrder }: PaidPaymentOrderCardProps) {
  return (
    <Card>
      <CardHeader
        disableTypography
        action={
          <IconButton aria-label="go to detail">
            <ArrowForwardIosIcon />
          </IconButton>
        }
        title={<Typography variant="body2">{paymentOrder.name}</Typography>}
        subheader={
          paymentOrder.paidAt && (
            <Typography variant="caption">
              Pagado el {DateFormatter.toShortString(paymentOrder.paidAt)}
            </Typography>
          )
        }
      />
    </Card>
  )
}
