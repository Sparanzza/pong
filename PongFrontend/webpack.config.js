const path = require('path');

module.exports = {
  mode: 'development', // Use 'production' for production environment
  entry: './src/index.ts', // path to your main TypeScript file
  devtool: 'inline-source-map', // option for better debugging
  module: {
    rules: [
      {
        test: /\.tsx?$/, // regex to select only TypeScript files
        use: 'ts-loader', // use ts-loader on these files
        exclude: /node_modules/, // don't transpile node_modules
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // resolve these extensions
  },
  output: {
    filename: 'bundle.js', // output bundle name
    path: path.resolve(__dirname, 'dist'), // output path
  },
};
