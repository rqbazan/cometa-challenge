import Button from '@mui/material/Button'
import { getMainLayout } from '~/ui/layout'

export default function HomePage() {
  return <Button variant="contained">Click me</Button>
}

HomePage.getLayout = getMainLayout
