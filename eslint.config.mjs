import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const sourceFiles = ["**/*.{js,jsx,ts,tsx}"];

export default defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: sourceFiles,
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
  },
  {
    files: sourceFiles,
    ...react.configs.flat.recommended,
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      "react/prop-types": "off",
    },
  },
  {
    files: sourceFiles,
    ...reactHooks.configs.flat.recommended,
  },
  {
    ...jsxA11y.configs.recommended,
    files: sourceFiles,
    plugins: { "jsx-a11y": jsxA11y },
  },
]);
