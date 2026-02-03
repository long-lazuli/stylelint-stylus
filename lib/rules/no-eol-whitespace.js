"use strict"

const coreRule = require("../utils/stylelint-v15/rules/no-eol-whitespace")
const { transformResult } = require("../utils/proxy")
const ruleName = "stylus/no-eol-whitespace"
const originalRuleName = "no-eol-whitespace"

function rule(expectation, options) {
    return (root, result) => {
        const context = { fix: result.stylelint?.config?.fix, newline: "\n" }
        if (root.source.lang !== "stylus") {
            const verify = coreRule(expectation, options, context)
            verify(
                root,
                transformResult(result, {
                    originalRuleName,
                    ruleName,
                }),
            )
            return
        }
        if (context.fix) {
            fixForStylus(root)
        }
        const verify = coreRule(expectation, options, context)
        verify(
            root,
            transformResult(result, {
                originalRuleName,
                ruleName,
            }),
        )
    }
}

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "disallow end-of-line whitespace.",
            category: "standard",
        },
        fixable: true,
    },
}

function fixForStylus(root) {
    root.walkAtRules(fixForPythonic)
    root.walkRules(fixForPythonic)
    function fixForPythonic(node) {
        if (!node.pythonic) {
            return
        }

        if (node.raws.between) {
            node.raws.between = node.raws.between.replace(
                /(^|[\n\r])[^\S\n\r]+$/u,
                "",
            )
        }
    }
}
