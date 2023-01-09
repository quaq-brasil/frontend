const nextTranslate = require('next-translate');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...nextTranslate(),
  images: {
    domains: [
      'upload-quaq.s3.sa-east-1.amazonaws.com',
      'upload-quaq.s3.amazonaws.com',
      'images.unsplash.com'
    ]
  }
}

module.exports = nextConfig
