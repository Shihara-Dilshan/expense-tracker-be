// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: [
            'eslint.config.mjs',
            'dist',
            'src/modules/database/migrations/**/*.ts',
            'src/modules/merchant/sample/*',
            'src/knox-cart-entity-module/*',
            'jest.setup.ts',
            '**/*.spec.ts',
            '**/*.test.ts',
            'jest.config.js',
            'build/*',
            'dist/*',
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            ecmaVersion: 5,
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
            'prettier/prettier': [
                'error',
                { endOfLine: 'auto' },
                { usePrettierrc: true },
            ],
            indent: 'off',
            'linebreak-style': 0,
            semi: ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/prefer-function-type': 'error',
            'constructor-super': 'error',
            eqeqeq: ['error', 'smart'],
            'guard-for-in': 'error',
            'max-len': [
                'error',
                {
                    code: 150,
                },
            ],
            'no-bitwise': 'error',
            'no-caller': 'error',
            'spaced-comment': [
                'error',
                'always',
                {
                    markers: ['/'],
                },
            ],
            'use-isnan': 'error',
        },
    },
);
