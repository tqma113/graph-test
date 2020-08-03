const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const inputOptions = {
  input: './parser/antlr/index.js',
  external: ['antlr4', 'antlr4/index'],
  plugins: [
    nodeResolve({
      mainFields: ['module']
    }),

    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: ['./parser/antlr/**/*.js'], // Default: undefined
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
  ]
}

const outputOptions = {
  file: './parser/antlr/dist/index.js',
  format: 'cjs',
  name: 'parser',
  exports: 'default'
}


async function build() {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

build()