import * as React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

type ExpandMoreIconButtonProps = IconButtonProps & { isExpanded: boolean }

export const ExpandMoreIconButton = styled(
  ({ isExpanded, ...props }: ExpandMoreIconButtonProps) => <IconButton {...props} />
)(({ theme, isExpanded }) => ({
  transform: !isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))
