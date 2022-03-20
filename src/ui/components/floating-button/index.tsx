import MuiButton from '@mui/material/Button'
import { styled } from '@mui/material/styles'

export const FloatingButton = styled(MuiButton)(props => ({
  position: 'fixed',
  bottom: props.theme.spacing(2),
  right: '50%',
  transform: 'translateX(50%)',
  whiteSpace: 'nowrap',
}))
