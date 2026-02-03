"use strict"

const htmlTags = require("html-tags")

function uniteSets(...args) {
    const result = []
    for (const set of args) {
        for (const item of set) {
            result.push(item)
        }
    }
    return new Set(result)
}

const deprecatedHtmlTypeSelectors = new Set([
    "acronym",
    "applet",
    "basefont",
    "big",
    "blink",
    "center",
    "content",
    "dir",
    "font",
    "frame",
    "frameset",
    "hgroup",
    "isindex",
    "keygen",
    "listing",
    "marquee",
    "nobr",
    "noembed",
    "plaintext",
    "spacer",
    "strike",
    "tt",
    "xmp",
])

/** @type {Set<string>} */
const standardHtmlTypeSelectors = new Set(htmlTags)

const htmlTypeSelectors = uniteSets(
    deprecatedHtmlTypeSelectors,
    standardHtmlTypeSelectors,
)
// These are the ones that can have single-colon notation
const levelOneAndTwoPseudoElements = new Set([
    "before",
    "after",
    "first-line",
    "first-letter",
])
const shadowTreePseudoElements = new Set(["part"])
const aNPlusBNotationPseudoClasses = new Set([
    "nth-column",
    "nth-last-column",
    "nth-last-of-type",
    "nth-of-type",
])
const aNPlusBOfSNotationPseudoClasses = new Set(["nth-child", "nth-last-child"])
const linguisticPseudoClasses = new Set(["dir", "lang"])

module.exports = {
    htmlTypeSelectors,
    levelOneAndTwoPseudoElements,
    shadowTreePseudoElements,
    aNPlusBNotationPseudoClasses,
    aNPlusBOfSNotationPseudoClasses,
    linguisticPseudoClasses,
}
