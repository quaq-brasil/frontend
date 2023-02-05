const nextTranslate = require('next-translate');
const removeImports = require("next-remove-imports")();

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'ALLOWALL'
  }
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: true },
  reactStrictMode: true,
  images: {
    domains: [
      'upload-quaq.s3.sa-east-1.amazonaws.com',
      'upload-quaq.s3.amazonaws.com',
      'images.unsplash.com',
      'upload.wikimedia.org',
      'source.unsplash.com',
      'img-19.commentcamarche.net'
    ]
  },
  webpack: (config) => {
    config.module.rules.unshift({
      test: /pdf.worker.(min.)?js/,
      use: [
        {
          loader: "file-loader",
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