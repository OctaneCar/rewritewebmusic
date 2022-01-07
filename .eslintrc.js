// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 13,
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        indent: ['error', 'tab'],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    }
};
