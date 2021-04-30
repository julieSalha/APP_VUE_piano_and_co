module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': 0,
    'no-spaced-func': 0,
    'space-in-brackets': 0,
    'no-trailing-spaces': 0,
    'comma-dangle': 0,
    'lines-between-class-members': 0,
    'no-multiple-empty-lines': 0,
    'camelcase': 0,
    'indent' : 0,
    'space-before-function-paren' : 0,
    'semi' : 0,
    'space-before-function-paren' : 0,
    'eol-last' : 0,
    'vue/no-unused-components' : 0,
    'no-unused-vars' : 0,
    'spaced-comment' : 0,
    'no-unused-expressions' : 0,
    'key-spacing' : 0,
    'space-in-parens' : 0,
    'no-labels' : 0,
    'vue/require-prop-type-constructor' : 0,
    'comma-spacing' : 0,
    'space-before-blocks' : 0,
    'padded-blocks' : 0,
    'no-tabs' : 0
  }
}
