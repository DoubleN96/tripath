/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['tripath.colivingsoft.site'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 