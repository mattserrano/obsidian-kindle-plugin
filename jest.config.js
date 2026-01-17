module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          verbatimModuleSyntax: false,
        },
      },
    ],
    '^.+\\.njk?$': 'jest-text-transformer',
  },
  transformIgnorePatterns: ['node_modules/(?!(svelte)/)'],
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/(tests|src)/.*.(test|spec))\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.test.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
};
