import * as path from 'path'

function resolveSrc(_path: string) {
  return path.resolve(__dirname, _path)
}

const config = {
  preset: '@vue/cli-plugin-unit-jest',
  globals: { 'ts-jest': { babelConfig: true } },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|ttf|woff|woff2)$': require.resolve('jest-transform-stub'),
    '.+\\.(svg|png|jpg|jpeg|gif|webp)$': '<rootDir>/jest-transform-stub.js',
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  moduleNameMapper: {
    '@': resolveSrc('./src'),
    assets: resolveSrc('./src/assets'),
    components: resolveSrc('./src/components'),
    router: resolveSrc('./src/router'),
    types: resolveSrc('./src/types'),
    views: resolveSrc('./src/views'),
    node_modules: resolveSrc('./node_modules'),
  },
  snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/setup-test-environment.js'],
  testEnvironment: 'jest-environment-jsdom-fifteen',
  testEnvironmentOptions: { resources: 'usable' },
  testMatch: ['<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost:3000',
  reporters: ['default'],
  coverageReporters: ['lcov', 'text-summary', 'json'],
  coverageDirectory: '<rootDir>/test/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue,ts}',
    '!src/main.ts',
    '!src/constants.ts',
    '!src/types/**',
    '!src/**/*.{spec,mock}.{js,ts}',
    '!src/**/__mocks__/**',
    '!**/node_modules/**',
  ],
}

module.exports = config
