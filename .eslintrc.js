module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'standard-with-typescript',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'multiline-comment-style': ['error', 'shared-block'],
        'spaced-comment': ['error', 'always'],
        semi: ['error', 'always'],
        'semi-spacing': 'error',
        'no-extra-semi': 'error',
        'no-unexpected-multiline': 'error',
        'max-len': ['error', { code: 80 }],
        'comma-style': ['error', 'last'],
        'comma-dangle': ['error', 'always-multiline'],
        indent: ['error', 4],
        'space-infix-ops': 'error',
        'brace-style': 'error',
        'space-before-blocks': 'error',
        'newline-per-chained-call': 'error',
        'space-in-parens': ['error', 'never'],
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'comma-spacing': ['error', { before: false, after: true }],
    },
};
