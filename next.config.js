/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for mobile deployment
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for routing
  trailingSlash: true,
  // Disable static generation for dynamic routes
  staticPageGenerationTimeout: 1000,
}

module.exports = nextConfig
