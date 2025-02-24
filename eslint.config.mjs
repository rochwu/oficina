import configPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import solid from 'eslint-plugin-solid/configs/typescript';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  tseslint.configs.base,
  {
    ignores: ['.yarn/*', 'dist'],
  },
  solid,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'unused-imports': unusedImports,
      import: importPlugin,
      ...solid.plugins,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
            caseInsensitive: true,
          },
          pathGroupsExcludedImportTypes: [],
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      ...solid.rules,
    },
  },
  configPrettier,
);
