const path = require('path')
const chalk = require('chalk')
const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')

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

module.exports = dts