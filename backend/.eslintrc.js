module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: { ecmaVersion: 12 },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'object-curly-newline': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
  },
};
