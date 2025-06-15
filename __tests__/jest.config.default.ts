import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  verbose: true,
  moduleDirectories: ['node_modules', 'src', "__tests__", __dirname],
  moduleFileExtensions: ['js', 'ts', 'json'],
  testPathIgnorePatterns: ['build'],
  extensionsToTreatAsEsm: ['.ts'],
  rootDir: "../",
  preset: 'ts-jest/presets/default-esm',
  testMatch: ['**/*.test.ts'],
  testEnvironment: 'node',
  maxWorkers: 1,
  forceExit: false,
  clearMocks: true,
  testTimeout: 10000,
  passWithNoTests: true,
  moduleNameMapper: {
    '^simpl-loggar$': '<rootDir>/node_modules/simpl-loggar/lib/index.js',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  collectCoverage: true,
  coverageDirectory: './coverage/combined',
  coverageReporters: ['json', 'lcov', 'text'],
  coverageProvider: 'v8',
};

export default config;
