module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/attribute-hyphenation': ['error', 'always'],
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
        'error',
        {
            ignoreRestSiblings: true,
            argsIgnorePattern: '^_',
        },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-console': [
        'error',
        {
            allow: ['warn', 'error'],
        },
        ],
        // 'no-debugger': import.meta.env.PROD ? 'warn' : 'off',
    },
    overrides: [
        {
        files: ['**/src/**/*.spec.{j,t}s?(x)'],
        env: {
            jest: true,
        },
        },
        {
        files: [
            'mock/**/*.js',
            'jest-transform-stub.js',
            '*.{config,mock}.js',
            '*.spec.ts',
            '*.api.*.ts',
            'src/**/*.{js,vue}',
            'packages/**/*.js',
        ],
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
        },
        },
        {
        files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
        env: {
            jest: true,
        },
        },
    ],
}
  