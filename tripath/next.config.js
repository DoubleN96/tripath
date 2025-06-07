/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['tripath.colivingsoft.site', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tripath.colivingsoft.site/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig 