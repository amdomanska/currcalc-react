module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
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
 plugins: ["eslint-plugin-react"]
  rules: {
    indent: [2, 2, { 'SwitchCase': 1 }],
    no-console: 0,
    'react/jsx-uses-vars': 2,
    linebreak-style: [2, 'unix'],
    quotes: [2, 'single'],
    semi: [2, 'always']
  }

};
