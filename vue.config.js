module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      //配置后缀
      extensions: [],
      //配置路径别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
