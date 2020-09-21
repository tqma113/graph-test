import { parse, format, NodeKind } from '../src'

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
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(4)
        const programAfterFMT = format(program)
        expect(
          programAfterFMT.moduleStatemens[0].kind ===
            NodeKind.ImportStatement
        )
        expect(
          programAfterFMT.moduleStatemens[1].kind ===
            NodeKind.ExportStatement
        )
        expect(
          programAfterFMT.moduleStatemens[2].kind ===
            NodeKind.StartStatement
        )
        expect(
          programAfterFMT.moduleStatemens[3].kind ===
            NodeKind.InferenceDefinition
        )
      }
    })
  })
})
