import eslintJs from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import eslintTs from 'typescript-eslint';

const tsFiles = ['{src,tests}/**/*.ts'];

const languageOptions = {
  globals: {
    ...globals.node,
    ...globals.jest,
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
};

const customTypescriptConfig = {
  files: tsFiles,
  plugins: {
    import: importPlugin,
    'import/parsers': tsParser,
  },
  languageOptions: {
    ...languageOptions,
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
  },
  rules: {
    eqeqeq: 'error',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
  },
};

const recommendedTypeScriptConfigs = [
  ...eslintTs.configs.recommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
  ...eslintTs.configs.stylistic.map((config) => ({
    ...config,
    files: tsFiles,
  })),
];

export default [
  { ignores: ['docs/*', 'build/*', 'lib/*', 'dist/*', 'node_modules/*'] },
  eslintJs.configs.recommended,
  ...recommendedTypeScriptConfigs,
  customTypescriptConfig,
];
