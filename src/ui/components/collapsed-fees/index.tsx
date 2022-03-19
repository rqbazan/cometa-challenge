import * as React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import { ExpandMoreIconButton } from '../expand-more-icon-button'

interface CollapsedFeesProps {
  title: string
  initialIsExpanded: boolean
  subtitle?: string | null
  children: React.ReactNode
}

export function CollapsedFees({
  title,
  children,
  subtitle: injectedSubtitle = null,
  initialIsExpanded = false,
}: CollapsedFeesProps) {
  const [isExpanded, setIsExpanded] = React.useState(initialIsExpanded)

  function getSubtitle() {
    if (!isExpanded) {
      return 'Dale click para expandir'
    }

    return injectedSubtitle
  }

  const subtitle = getSubtitle()

  return (
    <Card>
      <CardHeader
        action={
          <ExpandMoreIconButton
            isExpanded={isExpanded}
            aria-label="show more"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(v => !v)}
          >
            <ExpandMoreIcon />
          </ExpandMoreIconButton>
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
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Card>
  )
}
