import * as React from 'react'
import { SearchParams } from 'ohmyfetch'
import { SWRConfiguration } from 'swr'
import { useHttpClient } from './use-http-client'

export function useSWRCustomConfig() {
  const httpClient = useHttpClient()

  return React.useMemo<SWRConfiguration>(() => {
    return {
      fetcher: resource => {
        const queryKey = Array.isArray(resource) ? resource : [resource]
        const [endpoint, params] = queryKey as [string, SearchParams]

        return httpClient.fetch(endpoint, { params })
      },
    }
  }, [httpClient])
}
