/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch : ['**/**/*.test.ts'],
  verbose: true, //report every test during the run even if ignored
  forceExit: true,
  clearMocks: true, //clears called mocks
  resetMocks: true, //we need to reset the mocks so we can reuse mocks between tests
  restoreMocks: true //restore modules to their original states between tests
};