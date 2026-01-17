module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'import',
    'unused-imports',
    'prettier',
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|~|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        'prettier/prettier': 'error',
      },
    },
  ],
};
