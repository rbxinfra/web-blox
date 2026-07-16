/** @type {import('jest').Config} */
module.exports = {
  // Pass with no tests found instead of erroring out
  // https://jestjs.io/docs/configuration#passwithnotestsfound-boolean
  passWithNoTests: true,

  include: ['node_modules/@types'],

  // ── Transform ─────────────────────────────────────────────────────────────
  // SWC for fast TypeScript/JSX transforms — significantly faster than
  // babel-jest in monorepos with many packages.
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: false,
          },
          transform: {
            react: {
              // Matches tsconfig.base.json jsx: 'react-jsx'
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },

  // ── Module resolution ──────────────────────────────────────────────────────
  // Mirror tsconfig.base.json moduleResolution: 'bundler' as closely as
  // possible in Jest's CommonJS environment.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Map @rbx/* workspace packages to their source so tests always run
  // against source TypeScript rather than a stale dist/ build.
  // Individual packages extend this via their own jest.config.js.
  moduleNameMapper: {
    // Workspace packages
    '^@rbx/([^/]+)$': '<rootDir>/../../packages/$1/src/index.ts',
    '^@rbx/([^/]+)/(.*)$': '<rootDir>/../../packages/$1/src/$2',

    // Static assets — prevent parse errors in jest's CommonJS environment
    '\\.(css|less|scss|sass)$': '<rootDir>/../../scripts/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg|webp|ico)$': '<rootDir>/../../scripts/__mocks__/fileMock.js',
  },

  // ── Environment ────────────────────────────────────────────────────────────
  // jsdom by default. Packages that don't need a DOM (pure utilities,
  // API clients) should override to 'node' in their own jest.config.js
  // for a meaningful speed improvement.
  testEnvironment: 'jsdom',

  testEnvironmentOptions: {
    url: 'http://localhost',
  },

  // ── Setup ──────────────────────────────────────────────────────────────────
  setupFilesAfterEnv: [
    // Adds toBeInTheDocument(), toHaveClass() etc. globally
    '@testing-library/jest-dom',
  ],

  // ── Test matching ──────────────────────────────────────────────────────────
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}',
  ],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/generated/',
  ],

  // ── Coverage ───────────────────────────────────────────────────────────────
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    // Barrel files contain no testable logic
    '!src/index.ts',
    '!src/**/index.ts',
    // Generated API clients
    '!src/generated/**',
    // Type-only files
    '!src/**/*.d.ts',
    // Storybook stories
    '!src/**/*.stories.{ts,tsx}',
  ],

  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  coverageReporters: ['text', 'lcov', 'html'],

  coverageDirectory: '<rootDir>/coverage',

  // ── Performance ────────────────────────────────────────────────────────────
  cache: true,
  cacheDirectory: '<rootDir>/../../.jest-cache',

  // Reset state between tests without full mock teardown
  clearMocks: true,
  resetMocks: false,
  restoreMocks: true,

  // ── Globals ────────────────────────────────────────────────────────────────
  globals: {
    'process.env.NODE_ENV': 'test',
  },
};