import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface StudentSummaryProps {
  firstName: string
  lastName: string
  cohort: string
}

export function StudentSummary({ firstName, lastName, cohort }: StudentSummaryProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="caption">
        {firstName} {lastName}
      </Typography>
      <Typography variant="caption">{cohort}</Typography>
    </Box>
  )
}
