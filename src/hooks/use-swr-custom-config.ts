import * as React from 'react'
import { SearchParams } from 'ohmyfetch'
import { SWRConfiguration } from 'swr'
import { httpClient } from '~/lib/http-client'

export function useSWRCustomConfig(fallback?: any) {
  return React.useMemo(() => {
    const config: SWRConfiguration = {
      fallback,
      fetcher: resource => {
        const queryKey = Array.isArray(resource) ? resource : [resource]
        const [endpoint, params] = queryKey as [string, SearchParams]

        return httpClient.fetch(endpoint, { params })
      },
    }

    if (!config.fallback) {
      delete config.fallback
    }

    return config
  }, [fallback])
}
