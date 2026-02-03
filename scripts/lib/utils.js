"use strict"

const fs = require("fs")
const path = require("path")

module.exports = {
    formatAndSave,
}

async function formatAndSave(filename, text) {
    makeDirs(path.dirname(filename))
    fs.writeFileSync(filename, text)
    return text
}

/** Make dirs */
function makeDirs(dir) {
    if (fs.existsSync(dir)) {
        return
    }
    const parent = path.dirname(dir)
    makeDirs(parent)
    fs.mkdirSync(dir)
}
