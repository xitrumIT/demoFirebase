module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: ['eslint:recommended', '@react-native-community'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      tsx: true,
      jsx: true,
      js: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    // Khong su dung style se bao do
    'react-native/no-unused-styles': 2,
    // Tu dong sap xep style
    'react-native/sort-styles': ['error', 'desc'],
    // Kiem tra code xem co style inline hay ko
    'react-native/no-inline-styles': 2,
    // // khai bao mau
    // "react-native/no-color-literals": 2,
    // Thut le
    indent: ['error', 2],

    // "prettier/prettier": [
    //    "error",
    //    {
    //       printWidth: 80,
    //       trailingComma: "es5",
    //       semi: false,
    //       jsxSingleQuote: true,
    //       singleQuote: true,
    //       useTabs: true,
    //    },
    // ],
    // "react-native/sort-styles": [
    //    "error",
    //    "asc",
    //    {
    //       ignoreClassNames: false,
    //       ignoreStyleProperties: false,
    //    },
    // ],

    //  "linebreak-style": ["error", "unix"],
    // quotes: ["error", "double"],
    // semi: ["error", "always"],
  },
};
