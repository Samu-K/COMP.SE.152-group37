export default {
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  collectCoverageFrom: ['src/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/.internal/'],
  coverageReporters: ['text', 'lcov'],
  reporters: ['default', 'jest-junit'],
  transform: {},
};
