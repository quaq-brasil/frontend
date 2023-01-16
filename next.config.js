const nextTranslate = require('next-translate');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // load worker files as a urls with file-loader
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
  ...nextTranslate()
}

module.exports = nextConfig