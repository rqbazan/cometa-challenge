import type { EmotionCache } from '@emotion/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AppProvider } from '~/provider'

interface CometaAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function CometaApp({ Component, pageProps, emotionCache }: CometaAppProps) {
  return (
    <AppProvider emotionCache={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default CometaApp
