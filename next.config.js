/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  
  // Optimize images for static export
  images: {
    unoptimized: true,
    domains: [],
  },
  
  // Reduce client-side rendering warnings
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Base path for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/house-shop' : '',
  
  // Asset prefix for static assets
  assetPrefix: process.env.NODE_ENV === 'production' ? '/house-shop/' : '',
}

module.exports = nextConfig 