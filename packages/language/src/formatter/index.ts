import { FragmentKind } from '../parser/ast'
import type { Program } from '../parser/ast'

export const format = (ast: Program): Program => {
  const formatProgram = (program: Program): Program => {
    const kinds = [
      FragmentKind.ImportStatement,
      FragmentKind.ExportStatement,
      FragmentKind.StartStatement,
      FragmentKind.InferenceDefinition,
    ] as const
    program.moduleStatemens = program.moduleStatemens.sort((a, b) => {
      const index = kinds.indexOf(a.kind)
      const ks = kinds.slice(0, index + 1)
      const needToggle = ks.includes(b.kind)
      return needToggle ? 1 : -1
    })
    return program
  }

  return formatProgram(ast)
}
