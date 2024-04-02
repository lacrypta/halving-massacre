/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@lawallet/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  globals: {
    NodeJS: true,
  },
};
