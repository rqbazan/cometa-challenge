import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface StudentSummaryProps {
  firstName: string
  lastName: string
  cohort: string
  gutterBottom?: boolean
}

export function StudentSummary({ firstName, lastName, cohort, gutterBottom }: StudentSummaryProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: gutterBottom ? 1 : 0,
      }}
    >
      <Typography variant="caption">
        {firstName} {lastName}
      </Typography>
      <Typography variant="caption">{cohort}</Typography>
    </Box>
  )
}
