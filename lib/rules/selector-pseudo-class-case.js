"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const coreRule = require("../utils/stylelint-v15/rules/selector-pseudo-class-case")
const { transformResult } = require("../utils/proxy")
const { parseSelector } = require("../utils/selector")
const { levelOneAndTwoPseudoElements } = require("../utils/reference/selector")

const ruleName = "stylus/selector-pseudo-class-case"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "enforce lowercase or uppercase for pseudo-class selectors.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
})

function verifyCore(expectation, options, root, result) {
    const verify = coreRule(expectation, options, {
        fix: result.stylelint?.config?.fix,
        newline: "\n",
    })
    verify(
        root,
        transformResult(result, {
            originalRuleName: "selector-pseudo-class-case",
            ruleName,
        }),
    )
}

function rule(expectation, options) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            verifyCore(expectation, options, root, result)
            return
        }
        const validOptions = validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["lower", "upper"],
        })

        if (!validOptions) {
            return
        }

        root.walkRules(verifyNode)
        function verifyNode(ruleNode) {
            const selector = ruleNode.selector

            if (!selector.includes(":")) {
                return
            }

            const rawSelector =
                (ruleNode.raws.selector
                    ? ruleNode.raws.selector.stylus ||
                      ruleNode.raws.selector.raw
                    : ruleNode.selector) || ""

            const issues = []

            parseSelector(rawSelector, result, ruleNode, (selectorTree) => {
                selectorTree.walkPseudos((pseudoNode) => {
                    const pseudo = pseudoNode.value

                    if (
                        pseudo.includes("::") ||
                        levelOneAndTwoPseudoElements.has(
                            pseudo.toLowerCase().slice(1),
                        )
                    ) {
                        return
                    }

                    const expectedPseudo =
                        expectation === "lower"
                            ? pseudo.toLowerCase()
                            : pseudo.toUpperCase()

                    if (pseudo === expectedPseudo) {
                        return
                    }

                    issues.push({
                        pseudo,
                        expectedPseudo,
                        sourceIndex: pseudoNode.sourceIndex,
                    })
                })
            })

            if (!issues.length) {
                return
            }

            for (const { pseudo, expectedPseudo, sourceIndex } of issues) {
                report({
                    message: messages.expected(pseudo, expectedPseudo),
                    node: ruleNode,
                    index: sourceIndex,
                    endIndex: sourceIndex + pseudo.length,
                    ruleName,
                    result,
                    fix: () => fixPseudoCase(ruleNode),
                })
            }
        }
        function fixPseudoCase(ruleNode) {
            const rawSelector =
                (ruleNode.raws.selector
                    ? ruleNode.raws.selector.stylus ||
                      ruleNode.raws.selector.raw
                    : ruleNode.selector) || ""

            const fixedSelector = parseSelector(
                rawSelector,
                result,
                ruleNode,
                (selectorTree) => {
                    selectorTree.walkPseudos((pseudoNode) => {
                        const pseudo = pseudoNode.value

                        if (
                            pseudo.includes("::") ||
                            levelOneAndTwoPseudoElements.has(
                                pseudo.toLowerCase().slice(1),
                            )
                        ) {
                            return
                        }

                        const expectedPseudo =
                            expectation === "lower"
                                ? pseudo.toLowerCase()
                                : pseudo.toUpperCase()

                        if (pseudo !== expectedPseudo) {
                            pseudoNode.value = expectedPseudo
                        }
                    })
                },
            )

            if (ruleNode.raws.selector) {
                if (ruleNode.raws.selector.stylus) {
                    ruleNode.raws.selector.stylus = fixedSelector
                } else {
                    ruleNode.raws.selector.raw = fixedSelector
                }
            } else {
                ruleNode.selector = fixedSelector
            }
        }
    }
}
