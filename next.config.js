const nextTranslate = require('next-translate');

module.exports = {
  reactStrictMode: true,
  ...nextTranslate(),
  images: {
    domains: [
      'upload-quaq.s3.sa-east-1.amazonaws.com',
      'upload-quaq.s3.amazonaws.com',
      'images.unsplash.com'
    ]
  },
  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
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
  }
};
