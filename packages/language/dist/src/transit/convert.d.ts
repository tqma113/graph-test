import type { Program } from '../parser/ast';
import type { Tree } from './ast';
declare const convert: (ast: Program) => Tree;
export default convert;
