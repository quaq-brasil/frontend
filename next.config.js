const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...nextTranslate(),

  images: {
    domains: [
      'quaq-files.s3.sa-east-1.amazonaws.com',
      "images.unsplash.com"
    ]
  }
};

module.exports = nextConfig;