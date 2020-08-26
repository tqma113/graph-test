import { parse, analysis } from '../src'
import { sample } from './sample'

describe('graph', () => {
  it('work', () => {
    const input = sample
    const { program, lexcialErrors, syntaxErrors } = parse(input)
    if (program) {
      const result = analysis(program)

      expect(result.semanticErrors.length).toBe(0)
    }

    expect(lexcialErrors.length).toBe(0)
    expect(syntaxErrors.length).toBe(0)
  })
})
