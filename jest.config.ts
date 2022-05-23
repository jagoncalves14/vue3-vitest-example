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
    components: resolveSrc('./src/components'),
    views: resolveSrc('./src/views'),
    router: resolveSrc('./src/router'),
    assets: resolveSrc('./src/assets'),
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
    '!src/**/*.d.ts',
    '!src/**/*.{spec,mock}.{js,ts}',
    '!src/**/*.stories.{js,ts}',
    '!src/app.ts',
    '!src/register-service-worker.ts',
    '!src/service-worker.js',
    '!src/services/http.js',
    '!src/services/modernizr.js',
    '!src/services/constants/strings.js',
    '!src/components/el-notification/**/*.{js,vue}',
    '!src/components/el-message-box/**/*.{js,vue}',
    '!src/components/**/**/*stories.{js,ts}',
    '!**/node_modules/**',
  ],
}

module.exports = config
