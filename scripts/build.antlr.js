const path = require('path')
const execa = require('execa')

const rollupDir = path.resolve(__dirname, 'rollup')

async function run() {
  await execa(
    'rollup', [
      '-c',
      path.resolve(rollupDir, 'language.antlr.config.js')
    ], { stdio: 'inherit' }
  )
}

run()