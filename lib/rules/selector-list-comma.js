"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const {
    getSelectorTokens,
    isSelectorToken,
    setSelector,
} = require("../utils/selector")
const { isLinebreak } = require("../utils/tokens")
const { inCssLiteral } = require("../utils/nodes")

const ruleName = "stylus/selector-list-comma"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "require or disallow selector list comma.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    rejected: "Unexpected comma",
    expected: "Expected comma",
})

function rule(expectation) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            return
        }

        const validOptions = validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["always", "never"],
        })

        if (!validOptions) {
            return
        }

        root.walkRules(verifyNode)
        function verifyNode(node) {
            if (inCssLiteral(node)) {
                return
            }

            const selector =
                (node.raws.selector &&
                    (node.raws.selector.stylus || node.raws.selector.raw)) ||
                node.selector

            if (expectation === "always") {
                verifyAlways(node, selector)
            } else {
                verifyNever(node, selector)
            }
        }
        function verifyAlways(node, selectorText) {
            const forbiddenLinebreaks = []
            const selectors = getSelectorTokens(selectorText)
            for (const { separator, selector } of selectors) {
                if (isLinebreak(separator)) {
                    forbiddenLinebreaks.push({
                        lastToken: selector[selector.length - 1],
                        separator,
                    })
                }
            }

            if (!forbiddenLinebreaks.length) {
                return
            }

            for (const { lastToken, separator } of forbiddenLinebreaks) {
                report({
                    message: messages.rejected,
                    node,
                    index: separator.range[0],
                    endIndex: separator.range[1],
                    result,
                    ruleName,
                    fix: () => {
                        const currentSelector =
                            (node.raws.selector &&
                                (node.raws.selector.stylus ||
                                    node.raws.selector.raw)) ||
                            node.selector
                        const index = lastToken.range[1]
                        const newStylusSelector =
                            currentSelector.slice(0, index) +
                            "," +
                            currentSelector.slice(index)
                        setSelector(node, newStylusSelector)
                    },
                })
            }
        }
        function verifyNever(node, selectorText) {
            const forbiddenCommas = []
            const selectors = getSelectorTokens(selectorText)
            for (
                let selectorIndex = 0;
                selectorIndex < selectors.length;
                selectorIndex++
            ) {
                const { separator } = selectors[selectorIndex]
                if (separator && separator.value === ",") {
                    forbiddenCommas.push({
                        selectorIndex,
                        separator,
                    })
                }
            }
            if (!forbiddenCommas.length) {
                return
            }

            for (const { selectorIndex, separator } of forbiddenCommas) {
                report({
                    message: messages.rejected,
                    node,
                    index: separator.range[0],
                    endIndex: separator.range[1],
                    result,
                    ruleName,
                    fix: () => {
                        const currentSelector =
                            (node.raws.selector &&
                                (node.raws.selector.stylus ||
                                    node.raws.selector.raw)) ||
                            node.selector
                        const currentSelectors =
                            getSelectorTokens(currentSelector)
                        const index = separator.range[0]
                        const before = currentSelector.slice(0, index)
                        let replacement = ""

                        const beforeToken = currentSelectors[
                            selectorIndex
                        ]?.selector
                            .filter(isSelectorToken)
                            .slice(-1)[0]
                        const afterToken = (
                            currentSelectors[selectorIndex + 1] || {
                                selector: [],
                            }
                        ).selector.filter(isSelectorToken)[0]
                        if (
                            !isLinebreak(beforeToken) &&
                            !isLinebreak(afterToken)
                        ) {
                            replacement = "\n"
                        }
                        const after = currentSelector.slice(index + 1)
                        setSelector(node, before + replacement + after)
                    },
                })
            }
        }
    }
}
