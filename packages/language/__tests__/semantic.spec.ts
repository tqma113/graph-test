import { createParser, analysis } from '../src'

describe('semantic', () => {
  describe('definition', () => {
    it('InferenceDefinition', () => {
      const input = `<从首页进入旅游频道> = {
        
      }`
      const parser = createParser(input)
      parser.parse()

      expect(parser.lexcialErrors.length).toBe(0)
      expect(parser.syntaxErrors.length).toBe(0)
      expect(parser.program).toBeDefined()
      if (parser.program) {
        expect(parser.program.moduleStatemens.length).toBe(1)

        const { table, semanticErrors } = analysis(parser.program)
        expect(table.size).toBe(1)
        expect(semanticErrors.length).toBe(0)
        expect(table.has('从首页进入旅游频道')).toBeTruthy()

        const definition = table.get('从首页进入旅游频道')
        if (definition) {
          expect(definition.identifier.word).toBe('<从首页进入旅游频道>')
        }
      }
    })

    it('StartStatement', () => {
      const input = `start <从首页进入旅游频道> = {
        
      }`
      const parser = createParser(input)
      parser.parse()

      expect(parser.lexcialErrors.length).toBe(0)
      expect(parser.syntaxErrors.length).toBe(0)
      expect(parser.program).toBeDefined()
      if (parser.program) {
        expect(parser.program.moduleStatemens.length).toBe(1)

        const { table, semanticErrors } = analysis(parser.program)
        expect(table.size).toBe(1)
        expect(semanticErrors.length).toBe(0)
        expect(table.has('从首页进入旅游频道')).toBeTruthy()

        const definition = table.get('从首页进入旅游频道')
        if (definition) {
          expect(definition.identifier.word).toBe('<从首页进入旅游频道>')
        }
      }
    })

    it('mutiple', () => {
      const input = `start <从首页进入旅游频道> = {
        
      }
      
      <创建出行人> = {
        [点击新增旅客按钮]
        [填写中文姓名]
        [填写手机号]
        [点击保存]
      }`
      const parser = createParser(input)
      parser.parse()

      expect(parser.lexcialErrors.length).toBe(0)
      expect(parser.syntaxErrors.length).toBe(0)
      expect(parser.program).toBeDefined()
      if (parser.program) {
        expect(parser.program.moduleStatemens.length).toBe(2)

        const { table, semanticErrors } = analysis(parser.program)
        expect(table.size).toBe(2)
        expect(semanticErrors.length).toBe(0)

        expect(table.has('从首页进入旅游频道')).toBeTruthy()
        const definition1 = table.get('从首页进入旅游频道')
        if (definition1) {
          expect(definition1.identifier.word).toBe('<从首页进入旅游频道>')
        }

        expect(table.has('创建出行人')).toBeTruthy()
        const definition2 = table.get('创建出行人')
        if (definition2) {
          expect(definition2.identifier.word).toBe('<创建出行人>')
        }
      }
    })
  })

  describe('SemanticError', () => {
    it('define twice', () => {
      const input = `start <从首页进入旅游频道> = {
        
      }
      
      <从首页进入旅游频道> = {
        [点击新增旅客按钮]
        [填写中文姓名]
        [填写手机号]
        [点击保存]
      }`
      const parser = createParser(input)
      parser.parse()

      expect(parser.lexcialErrors.length).toBe(0)
      expect(parser.syntaxErrors.length).toBe(0)
      expect(parser.program).toBeDefined()
      if (parser.program) {
        expect(parser.program.moduleStatemens.length).toBe(2)

        const { table, semanticErrors } = analysis(parser.program)
        expect(table.size).toBe(1)
        expect(semanticErrors.length).toBe(1)
        expect(semanticErrors[0].message).toBe(
          'Module 从首页进入旅游频道 has been declared twice'
        )
      }
    })

    it('have not been defined(goto)', () => {
      const input = `start <从首页进入旅游频道> = {
        goto <创建出行人>
      }`
      const parser = createParser(input)
      parser.parse()

      expect(parser.lexcialErrors.length).toBe(0)
      expect(parser.syntaxErrors.length).toBe(0)
      expect(parser.program).toBeDefined()
      if (parser.program) {
        expect(parser.program.moduleStatemens.length).toBe(1)

        const { table, semanticErrors } = analysis(parser.program)
        expect(table.size).toBe(1)
        expect(semanticErrors.length).toBe(1)
        expect(semanticErrors[0].message).toBe(
          'Module 创建出行人 has not been declared'
        )
      }
    })

    it('have not been defined(start)', () => {
      const input = `start <从首页进入旅游频道>`
      const parser = createParser(input)
      parser.parse()

      expect(parser.lexcialErrors.length).toBe(0)
      expect(parser.syntaxErrors.length).toBe(0)
      expect(parser.program).toBeDefined()
      if (parser.program) {
        expect(parser.program.moduleStatemens.length).toBe(1)

        const { table, semanticErrors } = analysis(parser.program)
        expect(table.size).toBe(0)
        expect(semanticErrors.length).toBe(1)
        expect(semanticErrors[0].message).toBe(
          'Module 从首页进入旅游频道 has not been declared'
        )
      }
    })

    it('have not been defined(export)', () => {
      const input = `export <从首页进入旅游频道>`
      const parser = createParser(input)
      parser.parse()

      expect(parser.lexcialErrors.length).toBe(0)
      expect(parser.syntaxErrors.length).toBe(0)
      expect(parser.program).toBeDefined()
      if (parser.program) {
        expect(parser.program.moduleStatemens.length).toBe(1)

        const { table, semanticErrors } = analysis(parser.program)
        expect(table.size).toBe(0)
        expect(semanticErrors.length).toBe(1)
        expect(semanticErrors[0].message).toBe(
          'Module 从首页进入旅游频道 has not been declared'
        )
      }
    })
  })
})
