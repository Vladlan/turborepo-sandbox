module.exports = {
  extends: [
    "turbo",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {},
  ignorePatterns: ["node_modules"],
};
