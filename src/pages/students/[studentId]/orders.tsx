import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Money } from '~/entities/money'
import { useStudentInfo } from '~/hooks'
import { CollapsibleFees, StudentSummary, TotalSummary } from '~/ui/components'
import { getMainLayout } from '~/ui/layout'

const StyledContainer = styled(Box)(props => ({
  padding: props.theme.spacing(2),
  '& > :not(:last-child)': {
    marginBottom: props.theme.spacing(2),
  },
}))

export default function StudentOrdersPage() {
  const { query } = useRouter()

  const studentQuery = useStudentInfo(query.studentId as string)

  if (studentQuery.isLoading) {
    return null
  }

  if (studentQuery.isError) {
    return null
  }

  return (
    <StyledContainer>
      <Card>
        <CardContent>
          <StudentSummary
            firstName={studentQuery.student!.first_name}
            lastName={studentQuery.student!.last_name}
            cohort={studentQuery.student!.cohort}
            gutterBottom
          />
          <TotalSummary value={new Money('100', 'MXN')} />
        </CardContent>
      </Card>
      {/* <CollapsibleFees title="Cuotas pagadas" />
      <CollapsibleFees title="Cuotas pendientes" />
      <CollapsibleFees title="Cuotas futuras" /> */}
    </StyledContainer>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}

StudentOrdersPage.getLayout = getMainLayout
