import { styled } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

interface MainLayoutProps {
  children: React.ReactNode
}

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Avatar sx={{ marginRight: 1 }}>B</Avatar>
          <Typography variant="h6">Colegio Brillamont</Typography>
        </Toolbar>
      </AppBar>
      <Offset />
      {children}
    </>
  )
}

export function getMainLayout(node: React.ReactNode) {
  return <MainLayout>{node}</MainLayout>
}
