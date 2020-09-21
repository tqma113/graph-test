/**
 * Code formater
 *
 * Format AST(Abstruct Syntax Tree).
 */

import { NodeKind } from '../parser/ast'
import type { Program } from '../parser/ast'

export const format = (ast: Program): Program => {
  const formatProgram = (program: Program): Program => {
    const kinds = [
      NodeKind.ImportStatement,
      NodeKind.ExportStatement,
      NodeKind.StartStatement,
      NodeKind.InferenceDefinition,
    ] as const
    program.moduleStatemens = program.moduleStatemens.sort((a, b) => {
      const index = kinds.indexOf(a.kind)
      const ks = kinds.slice(0, index)
      const needExchange = ks.includes(b.kind)
      return needExchange ? 1 : -1
    })
    return program
  }

  return formatProgram(ast)
}
