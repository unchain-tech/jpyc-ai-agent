'use strict';

import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // NOTE: global ignores (https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores)
  {
    ignores: ['dist', 'artifacts', 'cache', '**/*.test.ts', '**/*.test.tsx', 'eslint.config.js'],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintConfigPrettier,
    ],
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        node: true,
      },
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'dot-notation': [
        2,
        {
          allowKeywords: true,
          allowPattern: '^[a-z]+(_[a-z]+)+$',
        },
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variableLike', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
        { selector: 'memberLike', format: ['strictCamelCase'] },
        { selector: 'enumMember', format: ['StrictPascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'typeParameter', format: ['strictCamelCase', 'UPPER_CASE'] },
        { selector: 'property', format: ['strictCamelCase', 'PascalCase'] },
        { selector: 'method', format: ['strictCamelCase'] },
        { selector: 'function', format: ['strictCamelCase', 'PascalCase'] },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/restrict-template-expressions': 'off',
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
    },
    settings: {
      react: { version: '18.3' },
    },
  },
);
