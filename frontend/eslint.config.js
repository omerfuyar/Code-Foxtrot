import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default tseslint.config(
    {
        ignores: ['build/', 'node_modules/'],
    },
    eslint.configs.recommended,
    {
        files: ['src/**/*.ts'],
        extends: [...tseslint.configs.recommendedTypeChecked],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser, // <-- This is the key change
            },
        },
        rules: {
            'indent': ['error', 'tab'],
            'linebreak-style': ['error', 'unix'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
        },
    },
    {
        files: ['*.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    }
);