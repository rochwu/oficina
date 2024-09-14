import * as tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import'; // Import eslint-plugin-import
import prettierPlugin from 'eslint-plugin-prettier';
import solid from 'eslint-plugin-solid/configs/typescript.js';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import {plugin as tsplugin} from 'typescript-eslint';

export default [
  {
    ignores: ['.yarn/*'],
  },
  {
    files: ['**/*.{mjs,ts,tsx}'], // Apply to TypeScript files
    plugins: {
      'unused-imports': unusedImports,
      import: importPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      '@typescript-eslint': tsplugin,
      ...solid.plugins,
    },
    languageOptions: {
      globals: globals.browser,
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        project: 'tsconfig.json', // Specify the TypeScript config file
      },
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent'],
            ['sibling', 'index'],
          ],
          'newlines-between': 'always', // Enforce newlines between groups
          alphabetize: {
            order: 'asc', // Sort imports within groups alphabetically
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '@oficina/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: [],
        },
      ],
      'prettier/prettier': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {prefer: 'type-imports'},
      ],
      ...solid.rules,
    },
  },
  eslintConfigPrettier,
];
