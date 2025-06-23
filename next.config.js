/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  // Enable static optimization where possible
  trailingSlash: false,
  // Optimize images
  images: {
    domains: [],
    unoptimized: false,
  },
  // Reduce client-side rendering warnings
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  basePath: process.env.NODE_ENV === 'production' ? '/house-shop' : '',
}

module.exports = nextConfig 