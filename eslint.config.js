const { FlatCompat } = require("@eslint/eslintrc");
const jestPlugin = require("eslint-plugin-jest");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    files: ["**/__tests__/**/*", "**/*.test.*", "**/__tests__/**/utils/**/*"],
    ...jestPlugin.configs['flat/recommended'],
  },
  {
    rules: {
      // Enforce consistent code style
      "prefer-const": "error",
      "no-var": "error",

      // React best practices
      "react/no-unescaped-entities": "error",
      "react/jsx-no-target-blank": "error",

      // Next.js specific
      "@next/next/no-img-element": "error",

      // TypeScript
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",

      // General code quality
      "no-console": "warn",
      "no-debugger": "error"
    }
  },
  {
    files: ["**/__tests__/**/*", "**/*.test.*", "**/__tests__/**/utils/**/*"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
    }
  },
  {
    files: ["*.config.js", "scripts/**/*.js", "jest.setup.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "off"
    }
  },
  {
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off"
    }
  },
  {
    ignores: [
      // Dependencies
      "node_modules/",
      
      // Production builds
      ".next/",
      "out/",
      "dist/",
      
      // Coverage reports
      "coverage/",
      
      // Environment files
      ".env*",
      
      // IDE files
      ".vscode/",
      ".idea/",
      
      // OS files
      ".DS_Store",
      "Thumbs.db",
      
      // Logs
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      
      // Runtime data
      "pids/",
      "*.pid",
      "*.seed",
      "*.pid.lock",
      
      // Coverage directory used by tools like istanbul
      ".nyc_output/",
      
      // TypeScript build info
      "*.tsbuildinfo"
    ]
  }
];