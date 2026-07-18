/** @type {import('jest').Config} */
module.exports = {
  displayName: '@rbx/ui',
  preset: '../../jest.config.base.js',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@rbx/ui$': '<rootDir>/src/index.ts',
  },
};
