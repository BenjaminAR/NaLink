import globals from "globals";

export default [{
    files: ["**/*.js"],
    languageOptions: {
        globals: {
            ...globals.commonjs,
            ...globals.node,
            ...globals.mocha,
        },

        ecmaVersion: 2022,
        sourceType: "module",
    },

    rules: {
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-undef": "off",
        "no-unreachable": "off",
        "no-unused-vars": "off",
        "constructor-super": "warn",
        "valid-typeof": "warn",
    },
}];