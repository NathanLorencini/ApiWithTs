// /eslint.config.mts
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import jsonc from "eslint-plugin-jsonc";
import jsonParser from "jsonc-eslint-parser";
import markdown from "eslint-plugin-markdown";

export default tseslint.config(
  // Regras recomendadas para JS
  js.configs.recommended,

  // Regras recomendadas para TypeScript (array; precisa espalhar)
  ...tseslint.configs.recommended,

  // Ignorar saídas comuns
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/build/**"],
  },

  // Base para JS/TS
  {
    files: ["**/*.{js,cjs,mjs,ts,cts,mts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },

  // JSON e JSON5 com eslint-plugin-jsonc + jsonc-eslint-parser
  {
    files: ["**/*.json", "**/*.json5"],
    plugins: { jsonc },
    languageOptions: {
      parser: jsonParser, // parser correto para JSON/JSON5
    },
    rules: {
      "jsonc/array-bracket-spacing": ["error", "never"],
      "jsonc/object-curly-spacing": ["error", "always"],
      "jsonc/comma-dangle": ["error", "never"],
    },
  },

  // Markdown com eslint-plugin-markdown (linta blocos de código em .md)
  {
    files: ["**/*.md"],
    plugins: { markdown },
    processor: markdown.processors.markdown,
  }
);
