module.exports = {
  // chainWebpack: (config) => {
  // config.optimization.minimize(false);
  // config.entryPoints.delete('app');

  // config.entry('app')
  //   .add('./src/app/main.ts')
  //   .end();
  //   .entry('popup')
  //   .add('./src/popup/main.ts')
  //   .end()
  //   .entry('background')
  //   .add('./src/background/main.ts')
  //   .end();
  // },
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
    app: {
      entry: 'src/main',
      template: 'public/index.html',
      filename: 'index.html',
      title: '洄游',
      chunks: ['chunk-vendors', 'chunk-common', 'app'],
    },
    popup: 'src/popup/main.ts',
    background: 'src/background/main.ts',
  },
  // FIXME: 后端上跨域后删掉这个
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://106.54.69.78:8080/api', // API 服务器的地址
        target: 'https://huiyou.fun/api', // API 服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
