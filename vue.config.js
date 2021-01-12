const DEBUG_MODE = process.env.VUE_APP_DEBUG;

module.exports = {
  chainWebpack: (config) => {
    config.optimization.splitChunks(false);
  },
  configureWebpack: {
    devtool: DEBUG_MODE ? 'inline-source-map' : 'source-map',
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  filenameHashing: false,
  pages: {
    options: {
      entry: 'src/main',
      template: 'public/index.html',
      filename: 'options.html',
      title: '洄游：自定义配置',
      chunks: ['options'],
    },
    app: {
      entry: 'src/app/main',
      template: 'public/index.html',
      filename: 'app.html',
      title: '洄游：推送记录',
      chunks: ['app'],
    },
    popup: {
      entry: 'src/popup/main.ts',
      chunks: ['popup'],
    },
    background: {
      entry: 'src/background/main.ts',
      chunks: ['background'],
    },
  },
};
