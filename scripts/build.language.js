const rollup = require('./lib/rollup')
const tsc = require('./lib/tsc')
const dts = require('./lib/dts')
const rm = require('./lib/rm')

async function run() {
  const target = 'language'
  await rollup(target)
  await tsc(target)
  dts(target)
  rm(target)
}

run()