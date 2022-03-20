/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/orders',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
