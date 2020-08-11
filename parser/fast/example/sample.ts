import fs from 'fs'
import path from 'path'
import { createParser } from '../parser'

const input = fs.readFileSync(path.resolve(__dirname, '../../sample.graph') ,'utf-8')
const parser = createParser(input)
parser.parse()
console.log(parser)

setTimeout(() => {

}, 100000000)