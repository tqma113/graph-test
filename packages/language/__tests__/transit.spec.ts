import {
  parse,
  convert,
  reverse,
  NodeKind,
  FragmentKind,
  ActionNode,
  IfTree,
  SwitchTree,
  GotoNode,
  Tree,
  InferenceDefinition,
  StepStatement,
  StartStatement,
  GotoStatement,
  IfStatement,
  SwitchStatement,
} from '../src'

describe('transit', () => {
  describe('convert', () => {
    describe('InferenceDefinition', () => {
      it('empty', () => {
        const input = `<从首页进入旅游频道> = {
        
        }`
        const { program, lexcialErrors, syntaxErrors } = parse(input)

        expect(lexcialErrors.length).toBe(0)
        expect(syntaxErrors.length).toBe(0)
        expect(program).toBeDefined()
        if (program) {
          const tree = convert(program)
          expect(tree.blocks.length).toBe(1)
          expect(tree.blocks[0].name).toBe('从首页进入旅游频道')
          expect(tree.blocks[0].children.length).toBe(0)
          expect(tree.starts.length).toBe(0)
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
          const tree = convert(program)
          expect(tree.blocks.length).toBe(1)
          expect(tree.blocks[0].name).toBe('从首页进入旅游频道')
          expect(tree.blocks[0].children.length).toBe(2)
          expect(tree.blocks[0].children[0].kind).toBe(NodeKind.ActionNode)
          const actionNode1 = tree.blocks[0].children[0] as ActionNode
          expect(actionNode1.expression).toBe('打开携程首页')
          expect(tree.blocks[0].children[1].kind).toBe(NodeKind.ActionNode)
          const actionNode2 = tree.blocks[0].children[1] as ActionNode
          expect(actionNode2.expression).toBe('点击旅游频道')
          expect(tree.starts.length).toBe(0)
        }
      })
    })

    describe('StartStatement', () => {
      it('work', () => {
        const input = `start <从首页进入旅游频道> = {
        
        }`
        const { program, lexcialErrors, syntaxErrors } = parse(input)

        expect(lexcialErrors.length).toBe(0)
        expect(syntaxErrors.length).toBe(0)
        expect(program).toBeDefined()
        if (program) {
          const tree = convert(program)
          expect(tree.blocks.length).toBe(1)
          expect(tree.blocks[0].name).toBe('从首页进入旅游频道')
          expect(tree.blocks[0].children.length).toBe(0)
          expect(tree.starts.length).toBe(1)
          expect(tree.starts[0]).toBe('从首页进入旅游频道')
        }
      })
    })

    describe('StepStatement', () => {
      it('work', () => {
        const input = `<从首页进入旅游频道> = {
          [打开携程首页]
        
          [点击旅游频道]
        }`
        const { program, lexcialErrors, syntaxErrors } = parse(input)

        expect(lexcialErrors.length).toBe(0)
        expect(syntaxErrors.length).toBe(0)
        expect(program).toBeDefined()
        if (program) {
          const tree = convert(program)
          expect(tree.blocks.length).toBe(1)
          expect(tree.blocks[0].name).toBe('从首页进入旅游频道')
          expect(tree.blocks[0].children.length).toBe(2)
          expect(tree.blocks[0].children[0].kind).toBe(NodeKind.ActionNode)
          const actionNode1 = tree.blocks[0].children[0] as ActionNode
          expect(actionNode1.expression).toBe('打开携程首页')
          expect(tree.blocks[0].children[1].kind).toBe(NodeKind.ActionNode)
          const actionNode2 = tree.blocks[0].children[1] as ActionNode
          expect(actionNode2.expression).toBe('点击旅游频道')
          expect(tree.starts.length).toBe(0)
        }
      })
    })

    describe('IfStatement', () => {
      it('without else', () => {
        const input = `<从首页进入旅游频道> = {
          if [没有出行人] -> {
            [创建出行人]
          }
        }
        `
        const { program, lexcialErrors, syntaxErrors } = parse(input)

        expect(lexcialErrors.length).toBe(0)
        expect(syntaxErrors.length).toBe(0)
        expect(program).toBeDefined()
        if (program) {
          const tree = convert(program)
          expect(tree.blocks.length).toBe(1)
          expect(tree.blocks[0].name).toBe('从首页进入旅游频道')
          expect(tree.blocks[0].children.length).toBe(1)
          expect(tree.blocks[0].children[0].kind).toBe(NodeKind.IfTree)
          const ifTree = tree.blocks[0].children[0] as IfTree
          expect(ifTree.condition).toBe('没有出行人')
          expect(ifTree.successChildren.length).toBe(1)
          expect(ifTree.successChildren[0].kind).toBe(NodeKind.ActionNode)
          const actionNode = ifTree.successChildren[0] as ActionNode
          expect(actionNode.expression).toBe('创建出行人')
          expect(ifTree.faildChildren.length).toBe(0)
          expect(tree.starts.length).toBe(0)
        }
      })

      it('with else', () => {
        const input = `<从首页进入旅游频道> = {
          if [没有出行人] -> {
            [创建出行人]
          } else {
            [点击去付款]
          }
        }
        `
        const { program, lexcialErrors, syntaxErrors } = parse(input)

        expect(lexcialErrors.length).toBe(0)
        expect(syntaxErrors.length).toBe(0)
        expect(program).toBeDefined()
        if (program) {
          const tree = convert(program)
          expect(tree.blocks.length).toBe(1)
          expect(tree.blocks[0].name).toBe('从首页进入旅游频道')
          expect(tree.blocks[0].children.length).toBe(1)
          expect(tree.blocks[0].children[0].kind).toBe(NodeKind.IfTree)
          const ifTree = tree.blocks[0].children[0] as IfTree
          expect(ifTree.condition).toBe('没有出行人')
          expect(ifTree.successChildren.length).toBe(1)
          expect(ifTree.successChildren[0].kind).toBe(NodeKind.ActionNode)
          const actionNode1 = ifTree.successChildren[0] as ActionNode
          expect(actionNode1.expression).toBe('创建出行人')
          expect(ifTree.faildChildren.length).toBe(1)
          expect(ifTree.faildChildren[0].kind).toBe(NodeKind.ActionNode)
          const actionNode2 = ifTree.faildChildren[0] as ActionNode
          expect(actionNode2.expression).toBe('点击去付款')
          expect(tree.starts.length).toBe(0)
        }
      })
    })

    describe('SwitchStatement', () => {
      it('without default', () => {
        const input = `<从首页进入旅游频道> = {
          switch [当前城市] {
            case [上海] -> {
              
            }
        
            case [北京] -> {
        
            }
          }
        }
        `
        const { program, lexcialErrors, syntaxErrors } = parse(input)

        expect(lexcialErrors.length).toBe(0)
        expect(syntaxErrors.length).toBe(0)
        expect(program).toBeDefined()
        if (program) {
          const tree = convert(program)
          expect(tree.blocks.length).toBe(1)
          expect(tree.blocks[0].name).toBe('从首页进入旅游频道')
          expect(tree.blocks[0].children.length).toBe(1)
          expect(tree.blocks[0].children[0].kind).toBe(NodeKind.SwitchTree)
          const switchTree = tree.blocks[0].children[0] as SwitchTree
          expect(switchTree.condition).toBe('当前城市')
          expect(switchTree.children.length).toBe(2)
          expect(switchTree.children[0].expectation).toBe('上海')
          expect(switchTree.children[1].expectation).toBe('北京')
          expect(switchTree.defaultChild).toBeNull()
          expect(tree.starts.length).toBe(0)
        }
      })

      it('with default', () => {
        const input = `<从首页进入旅游频道> = {
          switch [当前城市] {
            case [上海] -> {
              
            }
        
            case [北京] -> {
        
            }

            default -> {
        
            }
          }
        }
        `
        const { program, lexcialErrors, syntaxErrors } = parse(input)

        expect(lexcialErrors.length).toBe(0)
        expect(syntaxErrors.length).toBe(0)
        expect(program).toBeDefined()
        if (program) {
          const tree = convert(program)
          expect(tree.blocks.length).toBe(1)
          expect(tree.blocks[0].name).toBe('从首页进入旅游频道')
          expect(tree.blocks[0].children.length).toBe(1)
          expect(tree.blocks[0].children[0].kind).toBe(NodeKind.SwitchTree)
          const switchTree = tree.blocks[0].children[0] as SwitchTree
          expect(switchTree.condition).toBe('当前城市')
          expect(switchTree.children.length).toBe(2)
          expect(switchTree.children[0].expectation).toBe('上海')
          expect(switchTree.children[0].children.length).toBe(0)
          expect(switchTree.children[1].expectation).toBe('北京')
          expect(switchTree.children[1].children.length).toBe(0)
          expect(switchTree.defaultChild).toBeDefined()
          if (switchTree.defaultChild) {
            expect(switchTree.defaultChild.children.length).toBe(0)
          }
          expect(tree.starts.length).toBe(0)
        }
      })
    })

    describe('GotoStatement', () => {
      it('work', () => {
        const input = `<从首页进入旅游频道> = {
          goto <选择出行人>
        }
        
        <选择出行人> = {
          
        }
        `
        const { program, lexcialErrors, syntaxErrors } = parse(input)

        expect(lexcialErrors.length).toBe(0)
        expect(syntaxErrors.length).toBe(0)
        expect(program).toBeDefined()
        if (program) {
          const tree = convert(program)
          expect(tree.blocks.length).toBe(2)
          expect(tree.blocks[0].name).toBe('从首页进入旅游频道')
          expect(tree.blocks[0].children.length).toBe(1)
          expect(tree.blocks[0].children[0].kind).toBe(NodeKind.GotoNode)
          const gotoNode = tree.blocks[0].children[0] as GotoNode
          expect(gotoNode.name).toBe('选择出行人')
        }
      })
    })
  })

  describe('reverse', () => {
    describe('TreeBlock', () => {
      it('empty', () => {
        const tree = {
          kind: 'Tree',
          blocks: [],
          starts: [],
          comments: [],
        } as Tree
        const program = reverse(tree)

        expect(program.kind).toBe(FragmentKind.Program)
        expect(program.moduleStatemens.length).toBe(0)
      })

      it('without step', () => {
        const tree = {
          kind: 'Tree',
          blocks: [
            {
              kind: 'TreeBlock',
              name: '从首页进入旅游频道',
              children: [],
              comments: [],
            },
          ],
          starts: [],
          comments: [],
        } as Tree
        const program = reverse(tree)

        expect(program.moduleStatemens.length).toBe(1)
        expect(program.moduleStatemens[0].kind).toBe(
          FragmentKind.InferenceDefinition
        )

        const inferenceDefinition = program
          .moduleStatemens[0] as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(0)
      })

      it('with step', () => {
        const tree = {
          kind: 'Tree',
          blocks: [
            {
              kind: 'TreeBlock',
              name: '从首页进入旅游频道',
              children: [
                {
                  kind: 'ActionNode',
                  expression: '打开携程首页',
                  comments: [],
                },
                {
                  kind: 'ActionNode',
                  expression: '点击旅游频道',
                  comments: [],
                },
              ],
              comments: [],
            },
          ],
          starts: [],
          comments: [],
        } as Tree
        const program = reverse(tree)

        expect(program.moduleStatemens.length).toBe(1)
        expect(program.moduleStatemens[0].kind).toBe(
          FragmentKind.InferenceDefinition
        )
        const inferenceDefinition = program
          .moduleStatemens[0] as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(2)
        expect(inferenceDefinition.block.list[0].kind).toBe(
          FragmentKind.StepStatement
        )
      })
    })

    describe('start', () => {
      it('with definition', () => {
        const tree = {
          kind: 'Tree',
          blocks: [
            {
              kind: 'TreeBlock',
              name: '从首页进入旅游频道',
              children: [],
              comments: [],
            },
          ],
          starts: ['从首页进入旅游频道'],
          comments: [],
        } as Tree
        const program = reverse(tree)

        expect(program.moduleStatemens.length).toBe(1)
        expect(program.moduleStatemens[0].kind).toBe(
          FragmentKind.StartStatement
        )
        const startStatement = program.moduleStatemens[0] as StartStatement
        expect(startStatement.module.identifier.word).toBe(
          '<从首页进入旅游频道>'
        )
        expect(startStatement.module.definition).toBeDefined()
        if (startStatement.module.definition) {
          expect(startStatement.module.definition.identifier).toStrictEqual(
            startStatement.module.identifier
          )
        }
      })
    })

    describe('ActionNode', () => {
      it('work', () => {
        const tree = {
          kind: 'Tree',
          blocks: [
            {
              kind: 'TreeBlock',
              name: '从首页进入旅游频道',
              children: [
                {
                  kind: 'ActionNode',
                  expression: '打开携程首页',
                  comments: [],
                },
                {
                  kind: 'ActionNode',
                  expression: '点击旅游频道',
                  comments: [],
                },
              ],
              comments: [],
            },
          ],
          starts: [],
          comments: [],
        } as Tree
        const program = reverse(tree)

        expect(program.moduleStatemens.length).toBe(1)
        expect(program.moduleStatemens[0].kind).toBe(
          FragmentKind.InferenceDefinition
        )
        const inferenceDefinition = program
          .moduleStatemens[0] as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(2)
        expect(inferenceDefinition.block.list[0].kind).toBe(
          FragmentKind.StepStatement
        )
        const stepStatement1 = inferenceDefinition.block
          .list[0] as StepStatement
        expect(stepStatement1.expression.word).toBe('[打开携程首页]')
        expect(inferenceDefinition.block.list[1].kind).toBe(
          FragmentKind.StepStatement
        )
        const stepStatement2 = inferenceDefinition.block
          .list[1] as StepStatement
        expect(stepStatement2.expression.word).toBe('[点击旅游频道]')
      })
    })

    describe('GotoNode', () => {
      it('work', () => {
        const tree = {
          kind: 'Tree',
          blocks: [
            {
              kind: 'TreeBlock',
              name: '从首页进入旅游频道',
              children: [
                {
                  kind: 'GotoNode',
                  name: '选择出行人',
                  comments: [],
                },
              ],
              comments: [],
            },
            {
              kind: 'TreeBlock',
              name: '选择出行人',
              children: [],
              comments: [],
            },
          ],
          starts: [],
          comments: [],
        } as Tree
        const program = reverse(tree)

        expect(program.moduleStatemens.length).toBe(2)
        expect(program.moduleStatemens[0].kind).toBe(
          FragmentKind.InferenceDefinition
        )
        const inferenceDefinition = program
          .moduleStatemens[0] as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)
        expect(inferenceDefinition.block.list[0].kind).toBe(
          FragmentKind.GotoStatement
        )
        const gotoStatement = inferenceDefinition.block.list[0] as GotoStatement
        expect(gotoStatement.identifier.word).toBe('<选择出行人>')
      })
    })

    describe('IfTree', () => {
      it('without else', () => {
        const tree = {
          kind: 'Tree',
          blocks: [
            {
              kind: 'TreeBlock',
              name: '从首页进入旅游频道',
              children: [
                {
                  kind: 'IfTree',
                  condition: '不是上海站',
                  successChildren: [],
                  faildChildren: [],
                  comments: [],
                },
              ],
              comments: [],
            },
          ],
          starts: [],
          comments: [],
        } as Tree
        const program = reverse(tree)

        expect(program.moduleStatemens.length).toBe(1)
        expect(program.moduleStatemens[0].kind).toBe(
          FragmentKind.InferenceDefinition
        )
        const inferenceDefinition = program
          .moduleStatemens[0] as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)
        expect(inferenceDefinition.block.list[0].kind).toBe(
          FragmentKind.IfStatement
        )
        const ifStatement = inferenceDefinition.block.list[0] as IfStatement
        expect(ifStatement.expression.word).toBe('[不是上海站]')
        expect(ifStatement.ifBlock).toBeDefined()
        expect(ifStatement.elseBlock).toBeNull()
      })

      it('with else', () => {
        const tree = {
          kind: 'Tree',
          blocks: [
            {
              kind: 'TreeBlock',
              name: '从首页进入旅游频道',
              children: [
                {
                  kind: 'IfTree',
                  condition: '不是上海站',
                  successChildren: [],
                  faildChildren: [
                    {
                      kind: 'ActionNode',
                      expression: '打开携程首页',
                      comments: [],
                    },
                  ],
                  comments: [],
                },
              ],
              comments: [],
            },
          ],
          starts: [],
          comments: [],
        } as Tree
        const program = reverse(tree)

        expect(program.moduleStatemens.length).toBe(1)
        expect(program.moduleStatemens[0].kind).toBe(
          FragmentKind.InferenceDefinition
        )
        const inferenceDefinition = program
          .moduleStatemens[0] as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)
        expect(inferenceDefinition.block.list[0].kind).toBe(
          FragmentKind.IfStatement
        )
        const ifStatement = inferenceDefinition.block.list[0] as IfStatement
        expect(ifStatement.expression.word).toBe('[不是上海站]')
        expect(ifStatement.ifBlock).toBeDefined()
        expect(ifStatement.elseBlock).toBeDefined()
      })
    })

    describe('SwitchTree', () => {
      it('without default', () => {
        const tree = {
          kind: 'Tree',
          blocks: [
            {
              kind: 'TreeBlock',
              name: '从首页进入旅游频道',
              children: [
                {
                  kind: 'SwitchTree',
                  condition: '当前城市',
                  children: [
                    {
                      kind: 'CaseNode',
                      expectation: '上海',
                      children: [],
                      comments: [],
                    },
                    {
                      kind: 'CaseNode',
                      expectation: '北京',
                      children: [],
                      comments: [],
                    },
                  ],
                  defaultChild: null,
                  comments: [],
                },
              ],
              comments: [],
            },
          ],
          starts: [],
          comments: [],
        } as Tree
        const program = reverse(tree)

        expect(program.moduleStatemens.length).toBe(1)
        expect(program.moduleStatemens[0].kind).toBe(
          FragmentKind.InferenceDefinition
        )
        const inferenceDefinition = program
          .moduleStatemens[0] as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)
        expect(inferenceDefinition.block.list[0].kind).toBe(
          FragmentKind.SwitchStatement
        )
        const switchStatement = inferenceDefinition.block
          .list[0] as SwitchStatement
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
      })

      it('with default', () => {
        const tree = {
          kind: 'Tree',
          blocks: [
            {
              kind: 'TreeBlock',
              name: '从首页进入旅游频道',
              children: [
                {
                  kind: 'SwitchTree',
                  condition: '当前城市',
                  children: [
                    {
                      kind: 'CaseNode',
                      expectation: '上海',
                      children: [],
                      comments: [],
                    },
                    {
                      kind: 'CaseNode',
                      expectation: '北京',
                      children: [],
                      comments: [],
                    },
                  ],
                  defaultChild: {
                    kind: 'DefaultNode',
                    children: [],
                    comments: [],
                  },
                  comments: [],
                },
              ],
              comments: [],
            },
          ],
          starts: [],
          comments: [],
        } as Tree
        const program = reverse(tree)

        expect(program.moduleStatemens.length).toBe(1)
        expect(program.moduleStatemens[0].kind).toBe(
          FragmentKind.InferenceDefinition
        )
        const inferenceDefinition = program
          .moduleStatemens[0] as InferenceDefinition
        expect(inferenceDefinition.identifier.word).toBe('<从首页进入旅游频道>')
        expect(inferenceDefinition.block.list.length).toBe(1)
        expect(inferenceDefinition.block.list[0].kind).toBe(
          FragmentKind.SwitchStatement
        )
        const switchStatement = inferenceDefinition.block
          .list[0] as SwitchStatement
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
        expect(switchStatement.switchBlock.defaultClause).toBeDefined()
        if (switchStatement.switchBlock.defaultClause) {
          expect(
            switchStatement.switchBlock.defaultClause.block.list.length
          ).toBe(0)
        }
      })
    })
  })
})
