import * as React from 'react'
import type { EmotionCache } from '@emotion/react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import env from '~/env'
import { httpClient } from '~/lib/http-client'
import { AppProvider } from '~/provider'

interface CometaAppProps extends AppProps {
  emotionCache?: EmotionCache
  Component: NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
  }
}

httpClient.init({
  baseURL: env.API_BASE_URL,
})

function CometaApp({ Component, pageProps, emotionCache }: CometaAppProps) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <AppProvider emotionCache={emotionCache} swrFallback={pageProps?.swrFallback}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </AppProvider>
  )
}

export default CometaApp
