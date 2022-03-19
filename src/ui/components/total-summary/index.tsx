import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { formatPriceAmount } from '~/ui/helpers'

interface TotalSummaryProps {
  priceAmount: string
  priceCurrency: string
}

export function TotalSummary({ priceAmount, priceCurrency }: TotalSummaryProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="subtitle1">Total a Pagar</Typography>
      <Typography variant="subtitle1">
        {priceCurrency} {formatPriceAmount(priceAmount)}
      </Typography>
    </Box>
  )
}
