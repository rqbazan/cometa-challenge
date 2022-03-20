import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { StudentData } from '~/entities/student'
import { useScopedMoney } from '~/hooks'
import { StudentSummary, TotalSummary } from '~/ui/components'

interface SummaryCardProps {
  student: StudentData
}

export function SummaryCard({ student }: SummaryCardProps) {
  const totalMoney = useScopedMoney()

  return (
    <Card>
      <CardContent>
        <StudentSummary
          firstName={student.first_name}
          lastName={student.last_name}
          cohort={student.cohort}
          gutterBottom
        />
        <TotalSummary value={totalMoney} />
      </CardContent>
    </Card>
  )
}
