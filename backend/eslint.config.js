import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        // Apply to all files
        ignores: ["build/", "node_modules/"],
    },
    // Base recommended rules
    "eslint:recommended",
    {
        // Apply only to TypeScript files
        files: ["src/**/*.ts"],
        extends: [...tseslint.configs.recommendedTypeChecked],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "indent": ["error", "tab"],
            "linebreak-style": ["error", "unix"],
            "quotes": ["error", "single"],
            "semi": ["error", "always"],
        },
    },
    {
        // Configuration for JS files, like this config file
        files: ["*.js"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    }
);