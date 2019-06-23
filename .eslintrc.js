const path = require('path');

module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
    "plugin:prettier/recommended"
  ],
  "env": {
    "browser": true,
    "jest": true
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-filename-extension": 0,
    "react/jsx-one-expression-per-line": 0,
    "no-debugger": 1,
    "linebreak-style": 0,
    "import/no-cycle": 0,
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "tabWidth": 2,
        "trailingComma": 'es5'
      }
    ],
    "jsx-a11y/interactive-supports-focus": 0,
    "jsx-a11y/click-events-have-key-events": 0
  }
}
