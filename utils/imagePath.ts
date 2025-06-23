/**
 * Utility function to get the correct image path for both development and production
 * This handles the base path for GitHub Pages deployment
 */
export function getImagePath(path: string): string {
  // In production (GitHub Pages), we need to add the base path
  if (typeof window !== 'undefined' && window.location.hostname === 'dziugasmolis.github.io') {
    return `/house-shop${path}`
  }
  
  // For local development and other environments, use the path as is
  return path
}

/**
 * Alternative approach using environment detection
 * This works better for static export
 */
export function getStaticImagePath(path: string): string {
  // For static export, we need to handle the base path
  // This will be replaced at build time
  const basePath = process.env.NODE_ENV === 'production' ? '/house-shop' : ''
  return `${basePath}${path}`
} 