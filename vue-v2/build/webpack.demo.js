const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './examples/entry.js',
    output: {
        path: path.resolve(process.cwd(), './examples/element-ui/'),
        publicPath: '',
        filename: '[name].[hash:7].js',
        chunkFilename: '[name].js'
   },
   // 启动一个服务
   devServer: {
    host: 'localhost',
    port: 8082,
    publicPath: '/',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/demo.html', // 模板文件
      filename: './index.html', // 将生成的 HTML 写入到文件中, 默认写入在当前项目的 index.html 中。webpack-dev-server 启动一个服务, 默认会读取项目根目录下的 index.html, 所以 filename 最好是 index.html, 当然你要改也是可以的
    }),
  ]
}
