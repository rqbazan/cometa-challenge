import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { globalStyles } from '~/ui/components'
import { createEmotionCache } from '~/ui/helpers'
import { theme } from '~/ui/theme'

interface AppProviderProps {
  emotionCache?: EmotionCache
  children: React.ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// prettier-ignore
export function AppProvider({
  children,
  emotionCache = clientSideEmotionCache
}: AppProviderProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
