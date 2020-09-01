const rollup = require('./lib/rollup')
const tsc = require('./lib/tsc')
const dts = require('./lib/dts')
const rm = require('./lib/rm')
const allTargets = require('./targets')

const argvs = process.argv.slice(2)
const draftTargets = allTargets.filter(
  target => argvs.includes(target)
)

let targets = []
if (draftTargets.length > 0) {
  targets = draftTargets
} else {
  targets = allTargets
}

async function run() {
  for (const target of targets) {
    await rollup(target)
    await tsc(target)
    dts(target)
    rm(target)
  }
}

run()