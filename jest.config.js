'use strict'

module.exports = {
  verbose: true,
  testEnvironment: 'node',
  // setupFiles: ['./__tests__/setup.ts'],
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: './out/coverage',
  collectCoverageFrom: ['./src/**/*.ts'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './out/',
      },
    ],
  ],
}
