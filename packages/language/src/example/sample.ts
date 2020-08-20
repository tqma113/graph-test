import fs from 'fs'
import path from 'path'
import { createParser } from '../parser'
import { analysis } from '../semantic'
import { convert } from '../transit'

const input = fs.readFileSync(
  path.resolve(__dirname, '../../example/sample.graph'),
  'utf-8'
)
const parser = createParser(input)
parser.parse()
console.log(parser)
console.log(JSON.stringify(parser.tokens))
if (parser.program) {
  console.log(analysis(parser.program))
  const tree = convert(parser.program)
  console.log({
    tree,
    str: JSON.stringify(tree),
  })
}

setTimeout(() => {}, 100000000)
