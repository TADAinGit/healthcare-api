module.export = [
    {
        "rules": {
          "no-console": 0,
          "no-underscore-dangle": 0,
          "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
          "no-use-before-define": ["error", { "variables": false }],
          "no-multi-str": 0,
          "prettier/prettier": ["error"]
        },
        "env": {
          "node": true,
          "mocha": true
        },
        "parserOptions": {
          "ecmaVersion": 8
        },
        "extends": [
          "airbnb-base","prettier"
        ],
        "plugins": ["prettier"],
      }
];