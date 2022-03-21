/**
 * TEMPORAL: proxy request handler to fix the mixed content error
 */
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { pathToRegexp } from 'path-to-regexp'
import env from '~/env'
import { KeysFormatter } from '~/formatters'
import { OhMyHttpClient } from '~/lib/http-client'

function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        return result instanceof Error ? reject(result) : resolve(result)
      })
    })
}

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'HEAD'],
  })
)

const httpClient = new OhMyHttpClient({
  baseURL: env.REMOTE_API_BASE_URL,
  headers: {
    hash: env.REMOTE_API_HASH_HEADER,
  },
})

const studentsRegex = pathToRegexp('/api/students/:id')

const ordersRegex = pathToRegexp('/api/students/:id/orders')

export default async function mainHandler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')

  if (!req.url) {
    return res.status(500).json({ error: 'something was wrong' })
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method not allowed' })
  }

  switch (true) {
    case studentsRegex.test(req.url): {
      // @ts-expect-error
      const [, studentId] = studentsRegex.exec(req.url)
      const endpoint = KeysFormatter.getStudentInfo(studentId)

      return res.json(await httpClient.fetch(endpoint))
    }
    case ordersRegex.test(req.url): {
      // @ts-expect-error
      const [, studentId] = ordersRegex.exec(req.url)
      const endpoint = KeysFormatter.getStudentOrders(studentId)

      return res.json(await httpClient.fetch(endpoint))
    }
    default: {
      res.status(404).json({ error: 'not found' })
    }
  }
}
