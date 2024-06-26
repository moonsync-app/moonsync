/** @type {import("eslint").Linter.Config} */
const config = {
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "root": true,
  "plugins": [
    "prettier",
    "unused-imports",
    "import",
    "@typescript-eslint",
    "drizzle"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",

    "prettier/prettier": "error",
    "unused-imports/no-unused-imports": "error",

    // https://github.com/EvgenyOrekhov/eslint-config-hardcore/blob/master/base.json
    "import/default": "error",
    "import/namespace": "error",
    "import/no-absolute-path": "error",
    "import/no-webpack-loader-syntax": "error",
    "import/no-self-import": "error",
    "import/export": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "import/no-deprecated": "error",
    "import/no-mutable-exports": "error",
    "import/unambiguous": "error",
    "import/no-amd": "error",
    "import/first": "error",
    // "import/exports-last": "error",
    // "import/no-namespace": "error",
    "import/max-dependencies": "error",
    "import/no-named-default": "error",
    "import/no-commonjs": "error",
    "import/no-relative-packages": "error",
    "import/no-import-module-exports": "error",
    "import/no-empty-named-blocks": "error",

    // drizzle rules
    "drizzle/enforce-delete-with-where": [
      "error",
      {
        "drizzleObjectName": [
          "db",
          "ctx.db"
        ]
      }
    ],
    "drizzle/enforce-update-with-where": [
      "error",
      {
        "drizzleObjectName": [
          "db",
          "ctx.db"
        ]
      }
    ],
  }
}

module.exports = config;
