module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 1,
    'no-debugger': 1,
    'implicit-arrow-linebreak': 0,
    'import/prefer-default-export': 0,
    'import/named': 0, // https://github.com/benmosher/eslint-plugin-import/issues/1883
    'import/no-unresolved': [2, { 'ignore': ['csstype'] }]
  },
};
