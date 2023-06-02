const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.tsx",
        "./**/*.html"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        plugin(function({ addComponents, theme }) {
            addComponents({
                '.clear-mode': {
                    backgroundColor: theme('colors.white')
                },
                '.dark-mode': {
                    backgroundColor: theme('colors.neutral.800')
                },
                '.clear-mode-text': {
                    textColor: theme('colors.white')
                },
                '.dark-mode-text': {
                    textColor: theme('colors.neutral.800')
                },
                '.dark-mode-shadow': {
                    shadow: theme('shadow.neutral.700')
                }
            });
        })
    ],
    darkMode: 'class'
}