import { styled } from '@mui/material/styles'

interface StyledFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => void
  children: React.ReactNode
  extraPaddingBottom?: boolean
}

export const StyledForm = styled(({ extraPaddingBottom, ...props }: StyledFormProps) => (
  <form {...props} />
))(props => ({
  padding: props.theme.spacing(2, 2, props.extraPaddingBottom ? 7 : 2, 2),
  '& > :not(:last-child)': {
    marginBottom: props.theme.spacing(2),
  },
}))
