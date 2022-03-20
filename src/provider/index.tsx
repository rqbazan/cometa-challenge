import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SWRConfig } from 'swr'
import { useSWRCustomConfig } from '~/hooks'
import { HttpClientProvider } from '~/hooks/use-http-client'
import { globalStyles } from '~/ui/components'
import { createEmotionCache } from '~/ui/helpers'
import { theme } from '~/ui/theme'

interface AppProviderProps {
  emotionCache?: EmotionCache
  children: React.ReactNode
}

interface SWRProviderProps {
  children: React.ReactNode
}

const clientSideEmotionCache = createEmotionCache()

export function SWRProvider(props: SWRProviderProps) {
  return <SWRConfig {...props} value={useSWRCustomConfig()} />
}

export function AppProvider(props: AppProviderProps) {
  const { children, emotionCache = clientSideEmotionCache } = props

  return (
    <HttpClientProvider>
      <SWRProvider>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {globalStyles}
            {children}
          </ThemeProvider>
        </CacheProvider>
      </SWRProvider>
    </HttpClientProvider>
  )
}
