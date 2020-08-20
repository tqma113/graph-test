const execa = require('execa')

async function rollup(target) {
  await execa(
    'rollup', [
      '-c',
      '--environment', [
        `TARGET:${target}`
      ]
    ], { stdio: 'inherit' }
  )
}

module.exports = rollup