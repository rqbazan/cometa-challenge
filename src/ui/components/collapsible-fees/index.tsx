import * as React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import { ExpandMoreIconButton } from '../expand-more-icon-button'

interface CollapsibleFeesProps {
  title: string
  children: React.ReactNode
}

export function CollapsibleFees({ title, children }: CollapsibleFeesProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const isExpandable = React.Children.count(children) > 0

  function getSubtitle() {
    if (!isExpandable) {
      return 'No tienes información para mostrar'
    }

    if (!isExpanded) {
      return 'Dale click para expandir'
    }

    return 'Puedes seleccionar más de uno'
  }

  const subtitle = getSubtitle()

  return (
    <Card>
      <CardHeader
        disableTypography
        action={
          isExpandable && (
            <ExpandMoreIconButton
              isExpanded={isExpanded}
              aria-label="show more"
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded(v => !v)}
            >
              <ExpandMoreIcon />
            </ExpandMoreIconButton>
          )
        }
        title={<Typography variant="subtitle2">{title}</Typography>}
        subheader={
          subtitle && (
            <Typography variant="caption" color="gray">
              {subtitle}
            </Typography>
          )
        }
      />
      <Collapse in={isExpanded} timeout="auto">
        {children}
      </Collapse>
    </Card>
  )
}
