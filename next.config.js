/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    MONGO_URL:"mongodb://localhost:27017/"
  },
  // experimental: {
    // appDir: true,
  // },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://candyhub.varcel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig
