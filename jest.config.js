module.exports = {
  preset: 'ts-jest',
  rootDir: __dirname,
  globals: {
    '__DEV__': false
  },
  collectCoverageFrom: [
    '<rootDir>/packages/**/src/**/*.ts'
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
    'json'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  watchPathIgnorePatterns: [
    '/__test__/',
    '/dist/',
    '/.git/'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.(test|spec).(ts|tsx|js)']
}