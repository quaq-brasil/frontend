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
      'quaq-image.s3.sa-east-1.amazonaws.com',
      'quaq-files.s3.sa-east-1.amazonaws.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config) => {
    config.module.rules.unshift({
      test: /pdf.worker.(min.)?js/,
      exclude: /node_modules/,
      use: [
        {
          loader: "file-loader",
          exclude: /node_modules/,
          options: {
            name: "[contenthash].[ext]",
            publicPath: "_next/static/worker",
            outputPath: "static/worker"
          }
        }
      ]
    });

    return config;
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
