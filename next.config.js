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
  experimental: { esmExternals: true },
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'upload.wikimedia.org',
      'source.unsplash.com',
      'img-19.commentcamarche.net',
      'quaq-files.s3.sa-east-1.amazonaws.com'
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
