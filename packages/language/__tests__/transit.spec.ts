import {
  createParser,
  convert,
  NodeKind,
  ActionNode,
  IfTree,
  SwitchTree,
  GotoNode
} from '../src'

describe('transit', () => {
  describe('convert', () => {
    describe('InferenceDefinition', () => {
      it('empty', () => {
        const input = `<从首页进入旅游频道> = {
        
        }`
        const parser = createParser(input)
        parser.parse()

        expect(parser.lexcialErrors.length).toBe(0)
        expect(parser.syntaxErrors.length).toBe(0)
        expect(parser.program).toBeDefined()
        if (parser.program) {
          const tree = convert(parser.program)
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
        const parser = createParser(input)
        parser.parse()

        expect(parser.lexcialErrors.length).toBe(0)
        expect(parser.syntaxErrors.length).toBe(0)
        expect(parser.program).toBeDefined()
        if (parser.program) {
          const tree = convert(parser.program)
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
        const parser = createParser(input)
        parser.parse()

        expect(parser.lexcialErrors.length).toBe(0)
        expect(parser.syntaxErrors.length).toBe(0)
        expect(parser.program).toBeDefined()
        if (parser.program) {
          const tree = convert(parser.program)
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
        const parser = createParser(input)
        parser.parse()

        expect(parser.lexcialErrors.length).toBe(0)
        expect(parser.syntaxErrors.length).toBe(0)
        expect(parser.program).toBeDefined()
        if (parser.program) {
          const tree = convert(parser.program)
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
        const parser = createParser(input)
        parser.parse()

        expect(parser.lexcialErrors.length).toBe(0)
        expect(parser.syntaxErrors.length).toBe(0)
        expect(parser.program).toBeDefined()
        if (parser.program) {
          const tree = convert(parser.program)
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
        const parser = createParser(input)
        parser.parse()

        expect(parser.lexcialErrors.length).toBe(0)
        expect(parser.syntaxErrors.length).toBe(0)
        expect(parser.program).toBeDefined()
        if (parser.program) {
          const tree = convert(parser.program)
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
        const parser = createParser(input)
        parser.parse()

        expect(parser.lexcialErrors.length).toBe(0)
        expect(parser.syntaxErrors.length).toBe(0)
        expect(parser.program).toBeDefined()
        if (parser.program) {
          const tree = convert(parser.program)
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
        const parser = createParser(input)
        parser.parse()

        expect(parser.lexcialErrors.length).toBe(0)
        expect(parser.syntaxErrors.length).toBe(0)
        expect(parser.program).toBeDefined()
        if (parser.program) {
          const tree = convert(parser.program)
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
        const parser = createParser(input)
        parser.parse()

        expect(parser.lexcialErrors.length).toBe(0)
        expect(parser.syntaxErrors.length).toBe(0)
        expect(parser.program).toBeDefined()
        if (parser.program) {
          const tree = convert(parser.program)
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
    it.todo('wotk')
  })
})
