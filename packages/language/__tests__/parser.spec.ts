import {
  parse,
  InferenceDefinition,
  ImportStatement,
  ExportStatement,
  StartStatement,
  StepStatement,
  IfStatement,
  SwitchStatement,
  GotoStatement,
  FragmentKind,
} from '../src'
import { sample } from './sample'

describe('parser', () => {
  describe('Program', () => {
    it('work', () => {
      const input = sample
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(program).toBeDefined()
      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
    })

    it('empty', () => {
      const input = ``
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)

      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(0)
      }
    })
  })

  describe('InferenceDefinition', () => {
    it('empty', () => {
      const input = `<从首页进入旅游频道> = {
        
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
      }
    })

    it('with step', () => {
      const input = `<从首页进入旅游频道> = {
        [打开携程首页]
      
        [点击旅游频道]
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
      }
    })
  })

  describe('ImportStatement', () => {
    it('single item', () => {
      const input = `import { <测试> } from "测试"`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.ImportStatement)

        const importStatement = moduleStatement as ImportStatement
        expect(importStatement.path.word).toBe('"测试"')
        expect(importStatement.moduleItems.identifiers.length).toBe(1)
        expect(importStatement.moduleItems.identifiers[0].word).toBe('<测试>')
      }
    })

    it('multiple item', () => {
      const input = `import { <测试>, <测试1> } from "测试"`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.ImportStatement)

        const importStatement = moduleStatement as ImportStatement
        expect(importStatement.path.word).toBe('"测试"')
        expect(importStatement.moduleItems.identifiers.length).toBe(2)
        expect(importStatement.moduleItems.identifiers[0].word).toBe('<测试>')
        expect(importStatement.moduleItems.identifiers[1].word).toBe('<测试1>')
      }
    })
  })

  describe('ExportStatement', () => {
    it('inference', () => {
      const input = `export <从首页进入旅游频道>`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.ExportStatement)

        const exportStatement = moduleStatement as ExportStatement
        expect(exportStatement.module.identifier.word).toBe(
          '<从首页进入旅游频道>'
        )
        expect(exportStatement.module.definition).toBeNull()
      }
    })

    it('definition', () => {
      const input = `export <从首页进入旅游频道> = {
        [打开携程首页]
      
        [点击旅游频道]
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.ExportStatement)

        const exportStatement = moduleStatement as ExportStatement
        expect(exportStatement.module.identifier.word).toBe(
          '<从首页进入旅游频道>'
        )
        expect(exportStatement.module.definition).toBeDefined()
        if (exportStatement.module.definition) {
          expect(exportStatement.module.definition.identifier).toStrictEqual(
            exportStatement.module.identifier
          )
        }
      }
    })
  })

  describe('StartStatement', () => {
    it('inference', () => {
      const input = `start <从首页进入旅游频道>`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.StartStatement)

        const startStatement = moduleStatement as StartStatement
        expect(startStatement.module.identifier.word).toBe(
          '<从首页进入旅游频道>'
        )
      }
    })

    it('definition', () => {
      const input = `start <从首页进入旅游频道> = {
        [打开携程首页]
      
        [点击旅游频道]
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.StartStatement)

        const startStatement = moduleStatement as StartStatement
        expect(startStatement.module.identifier.word).toBe(
          '<从首页进入旅游频道>'
        )
        expect(startStatement.module.definition).toBeDefined()
        if (startStatement.module.definition) {
          expect(startStatement.module.definition.identifier).toStrictEqual(
            startStatement.module.identifier
          )
        }
      }
    })
  })

  describe('StepStatement', () => {
    it('single in module block', () => {
      const input = `<从首页进入旅游频道> = {
        [打开携程首页]
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)

        const statement = inferenceDefinition.block.list[0]
        expect(statement.kind).toBe(FragmentKind.StepStatement)

        const stepStatement = statement as StepStatement
        expect(stepStatement.expression.word).toBe('[打开携程首页]')
      }
    })

    it('multiple in module block', () => {
      const input = `<从首页进入旅游频道> = {
        [打开携程首页]
      
        [点击旅游频道]
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(2)

        const statement1 = inferenceDefinition.block.list[0]
        expect(statement1.kind).toBe(FragmentKind.StepStatement)

        const stepStatement1 = statement1 as StepStatement
        expect(stepStatement1.expression.word).toBe('[打开携程首页]')

        const statement2 = inferenceDefinition.block.list[1]
        expect(statement2.kind).toBe(FragmentKind.StepStatement)

        const stepStatement2 = statement2 as StepStatement
        expect(stepStatement2.expression.word).toBe('[点击旅游频道]')
      }
    })
  })

  describe('IfStatement', () => {
    it('without else in module block', () => {
      const input = `<从首页进入旅游频道> = {
        if [不是上海站] -> {

        }
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)

        const statement = inferenceDefinition.block.list[0]
        expect(statement.kind).toBe(FragmentKind.IfStatement)

        const ifStatement = statement as IfStatement
        expect(ifStatement.expression.word).toBe('[不是上海站]')
        expect(ifStatement.ifBlock).toBeDefined()
        expect(ifStatement.elseBlock).toBeNull()
      }
    })

    it('with else in module block', () => {
      const input = `<从首页进入旅游频道> = {
        if [不是上海站] -> {

        } else {

        }
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)

        const statement = inferenceDefinition.block.list[0]
        expect(statement.kind).toBe(FragmentKind.IfStatement)

        const ifStatement = statement as IfStatement
        expect(ifStatement.expression.word).toBe('[不是上海站]')
        expect(ifStatement.ifBlock).toBeDefined()
        expect(ifStatement.elseBlock).toBeDefined()
      }
    })
  })

  describe('SwitchStatement', () => {
    it('empty block', () => {
      const input = `<从首页进入旅游频道> = {
        switch [当前城市] {

        }
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)

        const statement = inferenceDefinition.block.list[0]
        expect(statement.kind).toBe(FragmentKind.SwitchStatement)

        const switchStatement = statement as SwitchStatement
        expect(switchStatement.expression.word).toBe('[当前城市]')
        expect(switchStatement.switchBlock.caseClauses.length).toBe(0)
        expect(switchStatement.switchBlock.defaultClause).toBeNull()
      }
    })

    it('single case clause block without default clause block', () => {
      const input = `<从首页进入旅游频道> = {
        switch [当前城市] {
          case [上海] -> {
      
          }
        }
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)

        const statement = inferenceDefinition.block.list[0]
        expect(statement.kind).toBe(FragmentKind.SwitchStatement)

        const switchStatement = statement as SwitchStatement
        expect(switchStatement.expression.word).toBe('[当前城市]')
        expect(switchStatement.switchBlock.caseClauses.length).toBe(1)

        expect(switchStatement.switchBlock.caseClauses[0].expression.word).toBe(
          '[上海]'
        )
        expect(
          switchStatement.switchBlock.caseClauses[0].block.list.length
        ).toBe(0)

        expect(switchStatement.switchBlock.defaultClause).toBeNull()
      }
    })

    it('multiple cases clause block without default clause block', () => {
      const input = `<从首页进入旅游频道> = {
        switch [当前城市] {
          case [上海] -> {
      
          }

          case [北京] -> {
      
          }
        }
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)

        const statement = inferenceDefinition.block.list[0]
        expect(statement.kind).toBe(FragmentKind.SwitchStatement)

        const switchStatement = statement as SwitchStatement
        expect(switchStatement.expression.word).toBe('[当前城市]')
        expect(switchStatement.switchBlock.caseClauses.length).toBe(2)

        expect(switchStatement.switchBlock.caseClauses[0].expression.word).toBe(
          '[上海]'
        )
        expect(
          switchStatement.switchBlock.caseClauses[0].block.list.length
        ).toBe(0)
        expect(switchStatement.switchBlock.caseClauses[1].expression.word).toBe(
          '[北京]'
        )
        expect(
          switchStatement.switchBlock.caseClauses[1].block.list.length
        ).toBe(0)

        expect(switchStatement.switchBlock.defaultClause).toBeNull()
      }
    })

    it('multiple case clause block with default clause block', () => {
      const input = `<从首页进入旅游频道> = {
        switch [当前城市] {
          case [上海] -> {
      
          }

          case [北京] -> {
      
          }

          default -> {
      
          }
        }
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)

        const statement = inferenceDefinition.block.list[0]
        expect(statement.kind).toBe(FragmentKind.SwitchStatement)

        const switchStatement = statement as SwitchStatement
        expect(switchStatement.expression.word).toBe('[当前城市]')

        expect(switchStatement.switchBlock.caseClauses.length).toBe(2)
        expect(switchStatement.switchBlock.caseClauses[0].expression.word).toBe(
          '[上海]'
        )
        expect(
          switchStatement.switchBlock.caseClauses[0].block.list.length
        ).toBe(0)
        expect(switchStatement.switchBlock.caseClauses[1].expression.word).toBe(
          '[北京]'
        )
        expect(
          switchStatement.switchBlock.caseClauses[1].block.list.length
        ).toBe(0)

        expect(switchStatement.switchBlock.defaultClause).toBeDefined()
        if (switchStatement.switchBlock.defaultClause) {
          expect(
            switchStatement.switchBlock.defaultClause.block.list.length
          ).toBe(0)
        }
      }
    })
  })

  describe('GotoStatement', () => {
    it('single in module block', () => {
      const input = `<从首页进入旅游频道> = {
        goto <选择出行人>
      }`
      const { program, lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(0)
      expect(program).toBeDefined()
      if (program) {
        expect(program.moduleStatemens.length).toBe(1)

        const moduleStatement = program.moduleStatemens[0]
        expect(moduleStatement.kind).toBe(FragmentKind.InferenceDefinition)

        const inferenceDefinition = moduleStatement as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)

        const statement = inferenceDefinition.block.list[0]
        expect(statement.kind).toBe(FragmentKind.GotoStatement)

        const gotoStatement = statement as GotoStatement
        expect(gotoStatement.identifier.word).toBe('<选择出行人>')
      }
    })
  })

  describe('SyntaxError', () => {
    it('InferenceDefinition case 1', () => {
      const input = `<从首页进入旅游频道> {

      }`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe("Expect { = }, accept '{'")
    })

    it('InferenceDefinition case 2', () => {
      const input = `<从首页进入旅游频道> =

      }`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe("Expect { { }, accept '}'")
    })

    it('InferenceDefinition case 3', () => {
      const input = `<从首页进入旅游频道> = {

      `
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe("Expect { } }, accept 'eop'")
    })

    it('ImportStatement case 1', () => {
      const input = `import { } from "测试"`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe(
        "Expect { Identifier: <somethings> }, accept '}'"
      )
    })

    it('ImportStatement case 2', () => {
      const input = `import { <测试> } "测试"`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe('Expect { from }, accept \'"测试"\'')
    })

    it('ImportStatement case 3', () => {
      const input = `import from "测试"`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe("Expect { { }, accept 'from'")
    })

    it('ExportStatement case 1', () => {
      const input = `export <从首页进入旅游频道> =`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe("Expect { { }, accept 'eop'")
    })

    it('ExportStatement case 2', () => {
      const input = `export`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe(
        "Expect { Identifier: <somethings> }, accept 'eop'"
      )
    })

    it('StartStatement case 1', () => {
      const input = `start`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe(
        "Expect { Identifier: <somethings> }, accept 'eop'"
      )
    })

    it('StartStatement case 2', () => {
      const input = `start <从首页进入旅游频道> =`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe("Expect { { }, accept 'eop'")
    })

    it('IfStatement case 1', () => {
      const input = `start <选择上海站> = {
        if [不是上海站] {
          [点击顶部城市选择栏]
          [选择上海出发地]
        }
      }`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(1)
      expect(syntaxErrors[0].message).toBe("Expect { -> }, accept '{'")
    })

    it('IfStatement case 2', () => {
      const input = `start <选择上海站> = {
        if [不是上海站] ->
      }`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(2)
      expect(syntaxErrors[0].message).toBe("Expect { { }, accept '}'")
      expect(syntaxErrors[1].message).toBe("Expect { } }, accept 'eop'")
    })

    it('GotoStatement case 1', () => {
      const input = `start <选择上海站> = {
        goto
      }`
      const { lexcialErrors, syntaxErrors } = parse(input)

      expect(lexcialErrors.length).toBe(0)
      expect(syntaxErrors.length).toBe(2)
      expect(syntaxErrors[0].message).toBe(
        "Expect { Identifier: <somethings> }, accept '}'"
      )
      expect(syntaxErrors[1].message).toBe("Expect { } }, accept 'eop'")
    })
  })
})
