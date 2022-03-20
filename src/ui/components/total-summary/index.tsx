import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Money } from '~/entities'
import { MoneyFormatter } from '~/formatters'

interface TotalSummaryProps {
  value: Money
}

export function TotalSummary({ value }: TotalSummaryProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="subtitle1">Total a Pagar</Typography>
      <Typography variant="subtitle1">{MoneyFormatter.toString(value)}</Typography>
    </Box>
  )
}
