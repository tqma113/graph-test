import fs from 'fs';
import path from 'path';
import { createParser } from '../parser';
import { checkSemantic } from '../semantic';
var input = fs.readFileSync(path.resolve(__dirname, '../../example/sample.graph'), 'utf-8');
var parser = createParser(input);
parser.parse();
console.log(parser);
if (parser.program) {
    console.log(checkSemantic(parser.program));
}
setTimeout(function () {
}, 100000000);
