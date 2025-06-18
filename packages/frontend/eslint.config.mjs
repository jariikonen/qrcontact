import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import testingLibrary from 'eslint-plugin-testing-library';

// https://typescript-eslint.io/packages/typescript-eslint/#config
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  eslintConfigPrettier,
  { ignores: ['eslint.config.mjs', 'dist'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      tseslint,
      react,
      reactHooks,
      reactRefresh,
      jsxA11y,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      'react/jsx-props-no-spreading': ['warn'],
      'react/jsx-no-useless-fragment': ['error'],
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': [
        'error',
        {
          functions: 'defaultArguments',
        },
      ],
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: { testingLibrary },
    rules: {
      ...testingLibrary.configs['flat/dom'].rules,
    },
  }
);
