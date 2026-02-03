"use strict"

const syntax = require("postcss-syntax")

module.exports = syntax({
    stylus: require("postcss-styl"),
    jsx: loadJsxParser(),
    markdown: loadMarkdown(),
})

function loadJsxParser() {
    try {
        return require("@stylelint/postcss-css-in-js")
    } catch (_e) {
        // ignore
    }
    try {
        return require("postcss-css-in-js")
    } catch (_e) {
        // ignore
    }
    return null
}

function loadMarkdown() {
    try {
        return require("@stylelint/postcss-markdown")
    } catch (_e) {
        // ignore
    }
    try {
        return require("postcss-markdown")
    } catch (_e) {
        // ignore
    }
    return null
}
