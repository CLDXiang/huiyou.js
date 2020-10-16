module.exports = {
  // chainWebpack: (config) => { config.optimization.minimize(false); },
  filenameHashing: false,
  pages: {
    app: {
      entry: 'src/app/main.ts',
      template: 'public/app.html',
      filename: 'app/app.html',
      title: '洄游',
      chunks: ['chunk-vendors', 'chunk-common', 'app'],
    },
    popup: 'src/popup/main.ts',
    background: 'src/background/main.ts',
  },
};
