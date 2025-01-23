import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extending Next.js and TypeScript rules
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended" // Add Prettier integration
  ),
  {
    // Adding Prettier and custom rules
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": ["error", { semi: true }], // Enforce semicolons
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];

export default eslintConfig;
