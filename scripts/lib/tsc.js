const execa = require('execa')
const path = require('path')

async function tsc(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const tsconfig = path.resolve(pkgDir, `tsconfig.json`)
  await execa(
    'tsc', [
      '-p', [tsconfig]
    ], { stdio: 'inherit' }
  )
}

module.exports = tsc