const fs = require('fs-extra')
const execa = require('execa')
const path = require('path')
const chalk = require('chalk')
const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')
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

async function tsc(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const tsconfig = path.resolve(pkgDir, `tsconfig.json`)
  await execa(
    'tsc', [
      '-p', [tsconfig]
    ], { stdio: 'inherit' }
  )
}

function dts(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`)
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(
    extractorConfigPath
  )
  const extractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true
  })

  if (extractorResult.succeeded) {
    console.log(
      chalk.bold(chalk.green(`API Extractor completed successfully.`))
    )
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
      ` and ${extractorResult.warningCount} warnings`
    )
    process.exitCode = 1
  }

  fs.removeSync(path.resolve(pkgDir, 'dist/src'))
}

async function run() {
  for (const target of targets) {
    await build(target)
    await tsc(target)
    dts(target)
  }
}

run()