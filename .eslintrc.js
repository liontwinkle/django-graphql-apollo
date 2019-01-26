module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
  },
}
