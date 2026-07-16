module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.base.json', './packages/*/tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'jsx-a11y',
  ],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:jsx-a11y/recommended', 'plugin:storybook/recommended'],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        project: ['packages/*/tsconfig.json'],
      },
    },
  },
  rules: {
    // ── Semantic standard ──────────────────────────────────────────
    // "explicit names, no pseudonyms, fully searchable"
    '@typescript-eslint/naming-convention': [
      'error',
      // Interfaces must be PascalCase, no I prefix
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: { regex: '^I[A-Z]', match: false },
      },
      // Type aliases PascalCase
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      // Enums PascalCase
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      // Enum members UPPER_CASE or PascalCase
      {
        selector: 'enumMember',
        format: ['UPPER_CASE', 'PascalCase'],
      },
      // Variables camelCase or UPPER_CASE constants or PascalCase components
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      // Functions camelCase or PascalCase (components)
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      // No single-letter names except in callbacks
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        filter: { regex: '^[a-z]$', match: true },
        custom: { regex: '^[a-z]$', match: false },
      },
    ],

    // No default exports except React components
    // (makes things fully searchable/renameable)
    'import/no-default-export': 'error',

    // No namespace imports — defeats tree-shaking and searchability
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ImportNamespaceSpecifier',
        message: 'Namespace imports (* as X) are not allowed. Import named exports instead.',
      },
    ],

    // ── Composable standard ────────────────────────────────────────
    // "single responsibility, expose state to consumers"

    // No circular dependencies between packages
    'import/no-cycle': ['error', { maxDepth: 2 }],

    // No reaching into package internals
    'import/no-internal-modules': [
      'error',
      {
        allow: [
          // Allow importing from @rbx/* subpaths we explicitly expose
          '@rbx/*/src/**',
          // Allow MUI subpath imports (for tree-shaking)
          '@mui/material/**',
          '@mui/icons-material/**',
          '@mui/system/**',
          // Allow emotion subpaths
          '@emotion/**',
        ],
      },
    ],

    // Enforce that @rbx packages only import from their own peerDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/jest.config.*',
          '**/rollup.config.*',
        ],
      },
    ],

    // ── Compatible standard ────────────────────────────────────────
    // "NextJS browserlists, CJS + ESM, tree-shaking"

    // No CommonJS require() in source files
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-var-requires': 'error',

    // Named exports only for tree-shaking
    // (overridden per-package for components which use default exports)
    'import/prefer-default-export': 'off',

    // No barrel files that import everything (defeats tree-shaking)
    // Enforced via import/no-cycle above

    // ── Consistent standard ────────────────────────────────────────

    // React
    'react/react-in-jsx-scope': 'off',        // not needed with new JSX transform
    'react/prop-types': 'off',                 // TypeScript handles this
    'react/display-name': 'error',             // components must have display names
    'react/jsx-no-useless-fragment': 'error',
    'react/self-closing-comp': 'error',

    // React hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
    '@typescript-eslint/consistent-type-exports': 'error',

    // Imports ordering
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@rbx/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@mui/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-duplicates': 'error',

    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
    eqeqeq: ['error', 'always'],
  },

  overrides: [
    // Test files
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      extends: ['plugin:jest/recommended'],
      plugins: ['jest'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    // Config files (rollup, jest etc.) can use require
    {
      files: ['*.config.js', '*.config.cjs', '*.config.ts'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        'import/no-default-export': 'off',
      },
    },
    // Generated files (openapi clients)
    {
      files: ['**/generated/**'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};