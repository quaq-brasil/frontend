const nextTranslate = require('next-translate-plugin');
const removeImports = require("next-remove-imports")();

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'ALLOWALL'
  }
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',  
      'quaq-files.s3.sa-east-1.amazonaws.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
 
  async headers() {
    return [
      {
        source: '/(.*)?',
        headers: securityHeaders,
      },
    ]
  },
  ...nextTranslate()
}

module.exports = removeImports(nextConfig)
