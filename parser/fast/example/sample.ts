import fs from 'fs'
import path from 'path'
import { createParser } from '../parser'
import { check } from '../check'

const input = fs.readFileSync(path.resolve(__dirname, '../../example/sample.graph') ,'utf-8')
const parser = createParser(input)
parser.parse()
console.log(parser)
if (parser.program) {
  console.log(check(parser.program))
}

setTimeout(() => {

}, 100000000)