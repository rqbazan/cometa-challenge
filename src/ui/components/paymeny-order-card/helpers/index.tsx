import Box from '@mui/material/Box'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardHeader, { cardHeaderClasses } from '@mui/material/CardHeader'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { subtract } from 'dinero.js'
import { PaymentOrder } from '~/entities'
import { Money } from '~/entities/money'
import { MoneyFormatter } from '~/formatters'

interface CardActionProps {
  paymentOrder: PaymentOrder
  checkboxProps: CheckboxProps
}

export const StyledCardHeader = styled(CardHeader)(props => ({
  [`&.${cardHeaderClasses.root}`]: {
    alignItems: 'flex-start',
  },
  [`& > .${cardHeaderClasses.action}`]: {
    flex: '1 1 auto',
    marginTop: 0,
  },
}))

const StyledCheckbox = styled(Checkbox)({
  alignSelf: 'flex-start',
  marginTop: -0.5,
})

export function Card(props: CardProps) {
  return <MuiCard elevation={0} {...props} />
}

export function OutstandingCardAction({ paymentOrder, checkboxProps }: CardActionProps) {
  return (
    <Box display="flex" justifyContent="flex-end">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="body2" noWrap gutterBottom={paymentOrder.hasInterest} align="right">
          {MoneyFormatter.toString(paymentOrder.price)}
        </Typography>
        {paymentOrder.hasInterest && (
          <Typography variant="caption" noWrap align="right">
            Interés: {MoneyFormatter.toString(paymentOrder.interest)}
          </Typography>
        )}
      </Box>
      <StyledCheckbox {...checkboxProps} />
    </Box>
  )
}

export function DueCardAction({ paymentOrder, checkboxProps }: CardActionProps) {
  let price: Money = paymentOrder.price

  if (paymentOrder.hasDiscount) {
    const dPrice = MoneyFormatter.toDinero(paymentOrder.price)
    const dDiscount = MoneyFormatter.toDinero(paymentOrder.discount)
    price = MoneyFormatter.fromDinero(subtract(dPrice, dDiscount))
  }

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="body2" noWrap gutterBottom={paymentOrder.hasDiscount} align="right">
          {paymentOrder.hasDiscount && (
            <Typography
              component="span"
              variant="inherit"
              sx={{ textDecoration: 'line-through', marginRight: 0.5 }}
            >
              {MoneyFormatter.toString(paymentOrder.price)}
            </Typography>
          )}
          {MoneyFormatter.toString(price)}
        </Typography>
        {paymentOrder.hasDiscount && (
          <Typography variant="caption" noWrap align="right">
            Ahorras: {MoneyFormatter.toString(paymentOrder.discount)}
          </Typography>
        )}
      </Box>
      <StyledCheckbox {...checkboxProps} />
    </Box>
  )
}
