module.exports = {
    "extends": "eslint-config-airbnb-es5",
    "plugins": [
        "jest"
    ],
    "env": {
        "jest/globals": true
    },
    "rules": {
        "indent": ["error", 2],
        "quotes": ["error", "single", { "avoidEscape": true }],
        "comma-dangle": ["error", "always-multiline"],
        "brace-style": ["error", "stroustrup"],
        "valid-jsdoc": 0,
    }
};
