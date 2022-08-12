/// <reference types="vitest" />

import { defineConfig, loadEnv, UserConfig } from 'vite'
import { InlineConfig as IVitestConfig } from 'vitest'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

function resolveSrc(_path: string) {
  return path.resolve(__dirname, _path)
}

interface UserConfigWithVitest extends UserConfig {
  test: IVitestConfig
}

export default defineConfig(({ mode }): UserConfigWithVitest => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  const isCI = env?.CIRCLECI

  const config: UserConfigWithVitest = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolveSrc('./src'),
        components: resolveSrc('./src/components'),
        views: resolveSrc('./src/views'),
        router: resolveSrc('./src/router'),
        assets: resolveSrc('./src/assets'),
        node_modules: resolveSrc('./node_modules'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.spec.ts'],
      exclude: ['node_modules', 'dist'],
      setupFiles: ['vitest-setup.ts'],
      coverage: {
        include: [
          'src/**/*.{js,vue,ts}',
          '!src/main.ts',
          '!src/constants.ts',
          '!src/types/**',
          '!src/**/*.{spec,mock}.{js,ts}',
          '!src/**/__mocks__/**',
          '!**/node_modules/**',
        ],
      },
    },
  }

  if (isCI) {
    config.test.maxThreads = 4
    config.test.minThreads = 1
  }

  return config
})
