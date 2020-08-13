const fs = require('fs')
const execa = require('execa')

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
  const targets = fs.readdirSync('packages').filter(f => {
    if (!fs.statSync(`packages/${f}`).isDirectory()) {
      return false
    }
    const pkg = require(`../packages/${f}/package.json`)
    if (pkg.private && !pkg.buildOptions) {
      return false
    }
    return true
  })
  for (const target of targets) {
    await build(target)
  }
}

run()