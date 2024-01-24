module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:@stylistic/disable-legacy',
  ],

  plugins: [
    '@stylistic',
  ],

  rules: {
    'vue/multi-word-component-names': 'off',

    'no-console': 'off',

    '@stylistic/indent': ['error', 2],
    '@stylistic/semi': 'error',
    '@stylistic/eol-last': 'error',
    '@stylistic/no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    '@stylistic/function-call-argument-newline': [
      'error',
      'consistent',
    ],
  },
};
