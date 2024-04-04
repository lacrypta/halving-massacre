/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@lawallet/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  globals: {
    NodeJS: true,
  },
};
