const fs = require('fs-extra')
const path = require('path')

async function rm(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  fs.removeSync(path.resolve(pkgDir, 'dist/src'))
}

module.exports = rm