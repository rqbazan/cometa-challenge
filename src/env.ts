import publicEnv from '@beam-australia/react-env'

const env = {
  REMOTE_API_BASE_URL: process.env.REMOTE_API_BASE_URL as string,
  REMOTE_API_HASH_HEADER: process.env.REMOTE_API_HASH_HEADER as string,
  API_BASE_URL: publicEnv('API_BASE_URL'),
}

export default env
