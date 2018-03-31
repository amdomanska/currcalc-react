module.exports = {
  "extends": [
    "standard",
    "standard-react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "allowImportExportEverywhere": true
  },
  "plugins": [
    "jest"
  ],
  "env": {
    "jest/globals": true,
    "browser": true,
    "node": true
  },
  "rules": {
    "semi": [
      "error",
      "always"
    ]
  }
};
