import * as React from 'react'
import constate from 'constate'
import env from '~/env'
import { OhMyHttpClient } from '~/lib/http-client'

function useHttpClientContextValue() {
  return React.useMemo(() => {
    return OhMyHttpClient.create({
      baseURL: env.API_BASE_URL,
      headers: {
        hash: env.API_HASH_HEADER,
      },
    })
  }, [])
}

const [HttpClientProvider, useHttpClient] = constate(useHttpClientContextValue)

export { HttpClientProvider, useHttpClient }
