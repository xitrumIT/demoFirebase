module.exports = {
   env: {
      browser: true,
      es6: true,
      node: true,
      "react-native/react-native": true,
   },
   extends: ["eslint:recommended", "prettier"],
   globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
   },
   parser: "babel-eslint",
   parserOptions: {
      ecmaFeatures: {
         tsx: true,
         jsx: true,
         js: true,
      },
      ecmaVersion: 2018,
      sourceType: "module",
   },
   plugins: ["react", "react-native"],
   rules: {
      "react-native/no-unused-styles": 2,
      "react-native/split-platform-components": 2,
      "react-native/no-inline-styles": 2,
      // khai bao mau
      "react-native/no-color-literals": 2,
      "react-native/no-raw-text": 2,

      "react/no-children-prop": "error",
      "react/no-deprecated": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-typos": "error",
      "react/no-string-refs": "error",
      "react/no-this-in-sfc": "error",
      "react/no-unsafe": "error",
      "react/no-unused-state": "warn",
      // "react/prop-types": "none",
      "react/react-in-jsx-scope": "error",
      "prettier/prettier": [
         "error",
         {
            printWidth: 80,
            trailingComma: "es5",
            semi: false,
            jsxSingleQuote: true,
            singleQuote: true,
            useTabs: true,
         },
      ],
      "react-native/sort-styles": [
         "error",
         "asc",
         {
            ignoreClassNames: false,
            ignoreStyleProperties: false,
         },
      ],
      indent: ["error", 3],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
   },
};
