// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json'
      }
    ]
  },
  testMatch: ['<rootDir>/tests/**/*.spec.ts', '<rootDir>/tests/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
};
