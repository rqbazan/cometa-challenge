import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SWRConfig } from 'swr'
import { useSWRCustomConfig } from '~/hooks'
import { globalStyles } from '~/ui/components'
import { createEmotionCache } from '~/ui/helpers'
import { theme } from '~/ui/theme'

interface AppProviderProps {
  emotionCache?: EmotionCache
  swrFallback?: any
  children: React.ReactNode
}

interface SWRProviderProps {
  children: React.ReactNode
  fallback?: any
}

const clientSideEmotionCache = createEmotionCache()

export function SWRProvider({ fallback, ...props }: SWRProviderProps) {
  return <SWRConfig {...props} value={useSWRCustomConfig(fallback)} />
}

export function AppProvider({
  children,
  swrFallback,
  emotionCache = clientSideEmotionCache,
}: AppProviderProps) {
  return (
    <SWRProvider fallback={swrFallback}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {globalStyles}
          {children}
        </ThemeProvider>
      </CacheProvider>
    </SWRProvider>
  )
}
