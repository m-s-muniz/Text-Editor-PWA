const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Added and configured workbox plugins for a service worker and manifest file.
// Added CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Webpack plugin that generates our html file and injects our generated JavaScript and CSS files into the HTML file
      // updating the script and link tags with the correct file names and paths.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
        favicon: './favicon.ico'
      }),
      // Service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // Creates a manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        name: 'Just Another Test Editor',
        short_name: 'JATE',
        description: 'Just Another Test Editor',
        background_color: "#3d75b8",
        theme_color: "#3d75b8",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ]

      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      //   {
      //     test: /.(png|svg|jpg|jpeg|gif)$/i,
      //     type: 'asset/resource',
      //     generator: {
      //         filename: 'assets/[hash][ext][query]'
      //     }
      // },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
         },
        },
       }, 
      ],
    },
  };
};
