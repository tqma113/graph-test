const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')
const allTargets = require('./targets')

const argvs = process.argv.slice(2)
const draftTargets = allTargets.filter(
  target => argvs.includes(target)
)

let targets = []
if (draftTargets.length > 0) {
  targets = draftTargets
} else {
  targets = allTargets
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

async function run() {
  for (const target of targets) {
    await tsc(target)
    dts(target)
  }
}

run()