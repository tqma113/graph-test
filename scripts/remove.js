const path = require('path')
const execa = require('execa')
const targets = require('./target')

async function rm(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const distDir = path.resolve(pkgDir, 'dist')
  await execa(
    'rm', [
      '-r', '-f', [
        distDir
      ]
    ], { stdio: 'inherit' }
  )
}

async function run() {
  for (const target of targets) {
    await rm(target)
  }
}

run()