import merge from 'lodash.merge'
import { $fetch, FetchOptions, FetchRequest } from 'ohmyfetch'

export enum CommonHeader {
  AUTHORIZATION = 'authorization',
}

export class OhMyHttpClient {
  private options: FetchOptions<'json'>

  private constructor(options: FetchOptions<'json'> = {}) {
    this.options = options
  }

  static create(options: FetchOptions<'json'>) {
    return new OhMyHttpClient(options)
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
