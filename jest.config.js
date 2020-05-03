module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  coverageDirectory: './build/coverage',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary', 'clover', 'html'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './build/testreport',
        filename: 'index.html',
        expand: true,
      },
    ],
  ],
  testPathIgnorePatterns: ['__tests__/data'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
