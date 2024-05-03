import jsEslint from '@eslint/js';
import eslintPluginPlugin from 'eslint-plugin-eslint-plugin';
import * as importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  {
    plugins: {
      ['simple-import-sort']: simpleImportSortPlugin,
      ['@typescript-eslint']: tsEslint.plugin,
      ['import']: importPlugin,
      ['eslint-plugin']: eslintPluginPlugin,
    },
  },
  {
    ignores: ['**/node_modules/**', '**/dist/**'],
  },
  jsEslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^preact', '^@?\\w'],
            ['^(components|assets|pages|store)(/.*|$)'],
            ['^(@alt-trello)(/.*|$)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.js'],
    extends: [tsEslint.configs.disableTypeChecked],
  },
);
