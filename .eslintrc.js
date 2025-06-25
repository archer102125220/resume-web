// prettier-ignore
module.exports = {
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    babelOptions: {
      parserOpts: {
        plugins: [
          'jsx'
        ]
      }
    }
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'react', 'import', 'jsdoc'],
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'next/core-web-vitals',
    'prettier'
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  // overrides: [
  //   {
  //     files: ['*.js'],
  //     rules: {
  //       'react-hooks/exhaustive-deps': 'off',
  //       'react/prop-types': 'warn', // propTypes 即將被移除：https://github.com/woocommerce/woocommerce/issues/49534
  //       'import/no-anonymous-default-export': 'warn',
  //       'no-extra-semi': 'warn',
  //       'semi': [
  //         'warn',
  //         'always'
  //       ],
  //       'quotes': [
  //         'error',
  //         'single'
  //       ],
  //       'prefer-const': 'warn',
  //       'no-var': 'warn',
  //       'no-console': 'off',
  //       'no-const-assign': 'warn',
  //       'no-unused-vars': [
  //         'warn',
  //         {
  //           'vars': 'all',
  //           'args': 'after-used'
  //         }
  //       ],
  //       'no-irregular-whitespace': 'warn',
  //       'no-trailing-spaces': 'warn',
  //       'no-undef': 'warn'
  //     }
  //   }
  // ],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    // 'react/prop-types': 'warn', // propTypes 即將被移除：https://github.com/woocommerce/woocommerce/issues/49534
    'import/no-anonymous-default-export': 'warn',
    '@next/next/no-sync-scripts': 'warn',
    'no-extra-semi': 'warn',
    'semi': [
      'warn',
      'always'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'prefer-const': 'warn',
    'no-var': 'warn',
    'no-console': 'off',
    'no-const-assign': 'warn',
    'no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'args': 'after-used'
      }
    ],
    'no-irregular-whitespace': 'warn',
    'no-trailing-spaces': 'warn',
    'no-undef': 'warn'
  }
};
