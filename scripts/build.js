const execa = require('execa')
const targets = require('./target')

async function build(target) {
  await execa(
    'rollup', [
      '-c',
      '--environment', [
        `TARGET:${target}`
      ]
    ], { stdio: 'inherit' }
  )
}

async function run() {
  for (const target of targets) {
    await build(target)
  }
}

run()