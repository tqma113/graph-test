const path = require('path')
const execa = require('execa')

const rollupDir = path.resolve(__dirname, 'rollup')

async function build(config) {
  await execa(
    'rollup', [
      '-c',
      path.resolve(rollupDir, config)
    ], { stdio: 'inherit' }
  )
}

async function run() {
  const targets = [
    'language.config.js',
    // 'editor.config.js'
  ]
  for (const config of targets) {
    await build(config)
  }
}

run()