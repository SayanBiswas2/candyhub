/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    MONGO_URL:"mongodb://localhost:27017/"
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
