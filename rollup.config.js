const fs = require('fs')
const path = require('path')
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript')
const { terser } = require('rollup-plugin-terser')

module.exports = createConfig()

function createConfig() {
  const packagesDir = path.resolve(__dirname, 'packages')
  const packageDir = path.resolve(packagesDir, process.env.TARGET)
  const input = getInput(path.resolve(packageDir, 'src/index'))
  const output = path.resolve(packageDir, 'dist/index.js')

  return {
    input,
    external: ['react', 'monaco-editor', 'monaco-editor/esm/vs/editor/editor.api', 'gtl-language'],
    plugins: [
      babel({ babelHelpers: 'bundled', presets: ['@babel/preset-react'] }),
      typescript({ module: 'CommonJS' }),
      commonjs({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      terser({
        compress: {
          ecma: 2015,
          pure_getters: true
        }
      })
    ],
    output: {
      format: 'cjs',
      file: output,
      exports: 'auto'
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