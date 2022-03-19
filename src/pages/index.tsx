import Typography from '@mui/material/Typography'
import { getMainLayout } from '~/ui/layout'

export default function HomePage() {
  return (
    <>
      {Array.from({ length: 100 }).map((_, index) => (
        <Typography key={index}>Number: {index + 1}</Typography>
      ))}
    </>
  )
}

HomePage.getLayout = getMainLayout
