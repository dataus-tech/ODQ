module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    $: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import', 'eslint-plugin-jsdoc'],
  extends: ['plugin:prettier/recommended'],
  ignorePatterns: ['**/lib/**/*.js'],
  rules: {
    'prettier/prettier': 'error',
  },
};
