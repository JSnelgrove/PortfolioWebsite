/* eslint-env node */
module.exports = {
    root: true,
    env: { browser: true, es2023: true },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react-refresh", "react-hooks"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    rules: {
      "react-refresh/only-export-components": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  };
  