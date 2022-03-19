import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createEmotionCache } from '~/ui/helpers'
import { theme } from '~/ui/theme'

interface AppProviderProps {
  emotionCache?: EmotionCache
  children: React.ReactChild | React.ReactChild[]
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
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
