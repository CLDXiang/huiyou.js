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
  filenameHashing: false,
  pages: {
    app: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: '洄游',
      chunks: ['chunk-vendors', 'chunk-common', 'app'],
    },
    popup: 'src/popup/main.ts',
    background: 'src/background/main.ts',
  },
};
