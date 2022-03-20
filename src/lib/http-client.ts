import merge from 'lodash.merge'
import { $fetch, FetchOptions, FetchRequest } from 'ohmyfetch'

export enum CommonHeader {
  AUTHORIZATION = 'authorization',
}

export class OhMyHttpClient {
  private static instance: OhMyHttpClient

  constructor(private options: FetchOptions<'json'> = {}) {
    this.options = options
  }

  static getInstance() {
    if (OhMyHttpClient.instance) {
      return OhMyHttpClient.instance
    }

    OhMyHttpClient.instance = new OhMyHttpClient()

    return OhMyHttpClient.instance
  }

  init(options: FetchOptions<'json'> = {}) {
    this.options = options
  }

  setHeader(name: string, value: string) {
    const headers = new Headers(this.options.headers)

    headers.append(name, value)

    this.options.headers = headers
  }

  delHeader(name: string) {
    const headers = new Headers(this.options.headers)

    headers.delete(name)

    this.options.headers = headers
  }

  setAccessToken(accessToken: string) {
    this.setHeader(CommonHeader.AUTHORIZATION, `Bearer ${accessToken}`)
  }

  delAccessToken() {
    this.delHeader(CommonHeader.AUTHORIZATION)
  }

  async fetch<TData>(request: FetchRequest, options?: FetchOptions<'json'>) {
    const opts = merge({}, this.options, options)

    return await $fetch<TData>(request, opts)
  }
}

export const httpClient = OhMyHttpClient.getInstance()
