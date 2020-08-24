import { createParser, format, FragmentKind } from '../src'

describe('formatter', () => {
  describe('Program', () => {
    it('statement order', () => {
      const input = `<从首页进入旅游频道> = {
        
      }
      start <从首页进入旅游频道> = {
        [打开携程首页]
      
        [点击旅游频道]
      }
      export <从首页进入旅游频道>
      import { <测试> } from "测试"`
      const parser = createParser(input)
      parser.parse()

      expect(parser.lexcialErrors.length).toBe(0)
      expect(parser.syntaxErrors.length).toBe(0)
      expect(parser.program).toBeDefined()
      if (parser.program) {
        expect(parser.program.moduleStatemens.length).toBe(4)
        const program = format(parser.program)
        expect(program.moduleStatemens[0].kind === FragmentKind.ImportStatement)
        expect(program.moduleStatemens[1].kind === FragmentKind.ExportStatement)
        expect(program.moduleStatemens[2].kind === FragmentKind.StartStatement)
        expect(program.moduleStatemens[3].kind === FragmentKind.InferenceDefinition)
      }
    })
  })
})
