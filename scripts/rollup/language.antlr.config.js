const path = require('path')
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const dir = path.resolve(__dirname, '../../packages/language/antlr')
const input = path.resolve(dir, 'index.js')
const output = path.resolve(dir, 'dist/index.js')
const include = path.resolve(dir, '**/*.js')

export default {
  input,
  external: ['antlr4', 'antlr4/index', 'path'],
  plugins: [
    nodeResolve({
      mainFields: ['module'],
      preferBuiltins: true
    }),

    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include, // Default: undefined
      exclude: [/node_modules/],

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      extensions: ['.js', '.coffee'], // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false, // Default: true

      // sometimes you have to leave require statements
      // unconverted. Pass an array containing the IDs
      // or a `id => boolean` function. Only use this
      // option if you know what you're doing!
      ignore: ['conditional-runtime-dependency']
    })
  ],

  output: {
    file: output,
    format: 'cjs',
    name: 'parser',
    exports: 'default'
  }
}