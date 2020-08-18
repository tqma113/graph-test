import { createParser, analysis } from '../src'
import { sample } from './sample'

describe('graph', () => {
  it('work', () => {
    const input = sample
    const parser = createParser(input)
    parser.parse()
    if (parser.program) {
      const result = analysis(parser.program)
      
      expect(result.semanticErrors.length).toBe(0)
    }

    expect('test').not.toThrowError()
    expect(parser.lexcialErrors.length).toBe(0)
    expect(parser.syntaxErrors.length).toBe(0)
  })
})