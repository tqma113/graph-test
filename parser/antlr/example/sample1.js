var parser = require('../index')

var input = fs.readFileSync(path.resolve(__dirname, '../../example/sample.graph'), 'utf-8')
var ast = parser(input)

console.log(ast)

setTimeout(() => {

}, 100000000)