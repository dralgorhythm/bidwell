const js = require('@eslint/js')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}', '**/jest.setup.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',

        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        performance: 'readonly',
        URLSearchParams: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        Node: 'readonly',

        // React globals
        React: 'readonly',
        JSX: 'readonly',

        // Jest/Testing globals
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    rules: {
      // Core quality rules
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: 'error',

      // Relaxed rules for development
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-dupe-keys': 'error',
    },
  },
  // TypeScript configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
      globals: {
        // React globals
        React: 'readonly',
        JSX: 'readonly',

        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        performance: 'readonly',
        URLSearchParams: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',

        // Jest/Testing globals
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      
      // Core quality rules
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: 'error',
      'no-console': 'warn',
    },
  },
  {
    files: ['scripts/**/*.js', '*.config.js'],
    languageOptions: {
      sourceType: 'script', // CommonJS for config files
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // Allow console in scripts
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'coverage/**',
      'dist/**',
      'build/**',
      '.git/**',
    ],
  },
]
