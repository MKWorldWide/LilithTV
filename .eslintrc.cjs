module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.0',
    },
  },
  // Ignore build output and non-JS VRChat project files
  ignorePatterns: ['dist/', 'vrchat/'],
  rules: {},
};
