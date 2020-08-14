const fs = require('fs')
const path = require('path')
const ts = require('rollup-plugin-typescript2')

module.exports = createConfig()

function createConfig() {
  const packagesDir = path.resolve(__dirname, 'packages')
  const packageDir = path.resolve(packagesDir, process.env.TARGET)
  const input = getInput(path.resolve(packageDir, 'src/index'))
  const output = path.resolve(packageDir, 'dist/index.js')

  const tsPlugin = ts({
    check: process.env.NODE_ENV === 'production',
    tsconfig: path.resolve(packageDir, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, '../../node_modules/.rts2_cache'),

  })

  return {
    input,
    external: ['react', 'monaco-editor', 'monaco-editor/esm/vs/editor/editor.api'],
    plugins: [
      tsPlugin
    ],
    output: {
      format: 'es',
      file: output,
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    },
  }
}

function getInput(path) {
  const extensions = ['js', 'ts', 'jsx', 'tsx']
  for (const extension of extensions) {
    const totalPath = `${path}.${extension}`
    if (fs.existsSync(totalPath)) {
      return totalPath
    }
  }
}