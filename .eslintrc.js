module.exports = {
  plugins: ['prettier', 'react-hooks'],
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  globals: {
    // Set each global variable name equal to true to allow the variable
    // to be overwritten or false to disallow overwriting
    gtag: false,
    TNB: false,
    __TNB: true
  },
  env: {
    jest: true,
    browser: true,
    node: true
  },
  rules: {
    'import/no-cycle': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'error',
    'no-plusplus': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
    'react/no-did-update-set-state': 0,
    'react/jsx-max-props-per-line': [0, { maximum: 1, when: 'always' }],
    'react/jsx-no-target-blank': 0,
    'react/prefer-stateless-function': [
      2,
      {
        ignorePureComponents: true
      }
    ]
  }
};
