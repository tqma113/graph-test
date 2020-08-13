const path = require('path')
const ts = require('rollup-plugin-typescript2')

const dir = path.resolve(__dirname, '../../packages/language')
const input = path.resolve(dir, 'src/index.ts')
const output = path.resolve(dir, 'dist/index.js')

const tsPlugin = ts({
  check: process.env.NODE_ENV === 'production' && !hasTSChecked,
  tsconfig: path.resolve(dir, 'tsconfig.json'),
  cacheRoot: path.resolve(__dirname, '../../node_modules/.rts2_cache'),
})

export default {
  input,
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