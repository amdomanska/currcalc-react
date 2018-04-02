module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'eslint:recommended',
    "standard",
    "standard-react"
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      classes: true
    },
    sourceType: 'module',
    "allowImportExportEverywhere": true
  },
  plugins: [
    'react',
    'jest'
  ],
  rules: {
    indent: [2, 2, { 'SwitchCase': 1 }],
    'no-console': 0,
    'react/jsx-uses-vars': 2,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }

};
