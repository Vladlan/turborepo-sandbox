/* eslint-env node */

module.exports = {
  root: true,
  env: { es2020: true, browser: true, node: true, "jest/globals": true },
  extends: ["custom", "eslint:recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['jest'],
  rules: {
    "@typescript-eslint/no-empty-function": "off",
  },
};
