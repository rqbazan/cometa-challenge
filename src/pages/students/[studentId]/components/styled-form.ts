import { styled } from '@mui/material/styles'

export const StyledForm = styled('form')(props => ({
  padding: props.theme.spacing(2),
  '& > :not(:last-child)': {
    marginBottom: props.theme.spacing(2),
  },
}))
