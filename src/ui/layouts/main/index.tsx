import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

interface MainLayoutProps {
  title: string
  children: React.ReactNode
}

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Avatar sx={{ marginRight: 1 }}>{title[0]}</Avatar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Offset />
      {children}
    </>
  )
}
