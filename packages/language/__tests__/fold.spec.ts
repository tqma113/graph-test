import {
  parse,
  convert,
  unfold,
  fold,
  Tree,
  NodeKind,
  LeafNodeKind,
  AntherNodeKind,
} from '../src'
import { sample } from './sample'

describe('fold', () => {
  it('Tree <-> Record', () => {
    const input = sample
    const { program, lexcialErrors, syntaxErrors } = parse(input)

    expect(lexcialErrors.length).toBe(0)
    expect(syntaxErrors.length).toBe(0)
    expect(program).toBeDefined()
    if (program) {
      const tree = convert(program)
      expect(fold(unfold(tree))).toStrictEqual(tree)
    }
  })

  describe('unfold', () => {
    describe('TreeBlock', () => {
      it('empty', () => {
        const tree = {
          kind: 'Tree',
          blocks: [],
          starts: [],
          comments: [],
        } as Tree
        const records = unfold(tree)

        expect(records.length).toBe(1)
        expect(records[0].kind).toBe(NodeKind.Tree)
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
        const records = unfold(tree)

        expect(records.length).toBe(3)
        expect(records[0].kind).toBe(NodeKind.Tree)
        expect(records[1].kind).toBe(NodeKind.TreeBlock)
        expect(records[2].kind).toBe(LeafNodeKind.Name)
        expect(records[2].content).toBe('从首页进入旅游频道')
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
        const records = unfold(tree)

        expect(records.length).toBe(7)
        expect(records[0].kind).toBe(NodeKind.Tree)
        expect(records[1].kind).toBe(NodeKind.TreeBlock)
        expect(records[2].kind).toBe(LeafNodeKind.Name)
        expect(records[2].content).toBe('从首页进入旅游频道')
        expect(records[3].kind).toBe(NodeKind.ActionNode)
        expect(records[4].kind).toBe(LeafNodeKind.Expression)
        expect(records[4].content).toBe('打开携程首页')
        expect(records[5].kind).toBe(NodeKind.ActionNode)
        expect(records[6].kind).toBe(LeafNodeKind.Expression)
        expect(records[6].content).toBe('点击旅游频道')
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
        const records = unfold(tree)

        expect(records.length).toBe(4)
        expect(records[0].kind).toBe(NodeKind.Tree)
        expect(records[1].kind).toBe(NodeKind.TreeBlock)
        expect(records[2].kind).toBe(LeafNodeKind.Name)
        expect(records[2].content).toBe('从首页进入旅游频道')
        expect(records[3].kind).toBe(LeafNodeKind.Start)
        expect(records[3].content).toBe('从首页进入旅游频道')
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
        const records = unfold(tree)

        expect(records.length).toBe(7)
        expect(records[0].kind).toBe(NodeKind.Tree)
        expect(records[1].kind).toBe(NodeKind.TreeBlock)
        expect(records[2].kind).toBe(LeafNodeKind.Name)
        expect(records[2].content).toBe('从首页进入旅游频道')
        expect(records[3].kind).toBe(NodeKind.ActionNode)
        expect(records[4].kind).toBe(LeafNodeKind.Expression)
        expect(records[4].content).toBe('打开携程首页')
        expect(records[5].kind).toBe(NodeKind.ActionNode)
        expect(records[6].kind).toBe(LeafNodeKind.Expression)
        expect(records[6].content).toBe('点击旅游频道')
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
        const records = unfold(tree)

        expect(records.length).toBe(7)
        expect(records[0].kind).toBe(NodeKind.Tree)
        expect(records[1].kind).toBe(NodeKind.TreeBlock)
        expect(records[2].kind).toBe(LeafNodeKind.Name)
        expect(records[2].content).toBe('从首页进入旅游频道')
        expect(records[3].kind).toBe(NodeKind.GotoNode)
        expect(records[4].kind).toBe(LeafNodeKind.Name)
        expect(records[4].content).toBe('选择出行人')
        expect(records[5].kind).toBe(NodeKind.TreeBlock)
        expect(records[6].kind).toBe(LeafNodeKind.Name)
        expect(records[6].content).toBe('选择出行人')
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
        const records = unfold(tree)

        expect(records.length).toBe(7)
        expect(records[0].kind).toBe(NodeKind.Tree)
        expect(records[1].kind).toBe(NodeKind.TreeBlock)
        expect(records[2].kind).toBe(LeafNodeKind.Name)
        expect(records[2].content).toBe('从首页进入旅游频道')
        expect(records[3].kind).toBe(NodeKind.IfTree)
        expect(records[4].kind).toBe(LeafNodeKind.Condition)
        expect(records[4].content).toBe('不是上海站')
        expect(records[5].kind).toBe(AntherNodeKind.SuccessBlock)
        expect(records[6].kind).toBe(AntherNodeKind.FaildBlock)
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
        const records = unfold(tree)

        expect(records.length).toBe(9)
        expect(records[0].kind).toBe(NodeKind.Tree)
        expect(records[1].kind).toBe(NodeKind.TreeBlock)
        expect(records[2].kind).toBe(LeafNodeKind.Name)
        expect(records[2].content).toBe('从首页进入旅游频道')
        expect(records[3].kind).toBe(NodeKind.IfTree)
        expect(records[4].kind).toBe(LeafNodeKind.Condition)
        expect(records[4].content).toBe('不是上海站')
        expect(records[5].kind).toBe(AntherNodeKind.SuccessBlock)
        expect(records[6].kind).toBe(AntherNodeKind.FaildBlock)
        expect(records[7].kind).toBe(NodeKind.ActionNode)
        expect(records[8].kind).toBe(LeafNodeKind.Expression)
        expect(records[8].content).toBe('打开携程首页')
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
        const records = unfold(tree)

        expect(records.length).toBe(9)
        expect(records[0].kind).toBe(NodeKind.Tree)
        expect(records[1].kind).toBe(NodeKind.TreeBlock)
        expect(records[2].kind).toBe(LeafNodeKind.Name)
        expect(records[2].content).toBe('从首页进入旅游频道')
        expect(records[3].kind).toBe(NodeKind.SwitchTree)
        expect(records[4].kind).toBe(LeafNodeKind.Condition)
        expect(records[4].content).toBe('当前城市')
        expect(records[5].kind).toBe(NodeKind.CaseNode)
        expect(records[6].kind).toBe(LeafNodeKind.Expectation)
        expect(records[6].content).toBe('上海')
        expect(records[7].kind).toBe(NodeKind.CaseNode)
        expect(records[8].kind).toBe(LeafNodeKind.Expectation)
        expect(records[8].content).toBe('北京')
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
        const records = unfold(tree)

        expect(records.length).toBe(10)
        expect(records[0].kind).toBe(NodeKind.Tree)
        expect(records[1].kind).toBe(NodeKind.TreeBlock)
        expect(records[2].kind).toBe(LeafNodeKind.Name)
        expect(records[2].content).toBe('从首页进入旅游频道')
        expect(records[3].kind).toBe(NodeKind.SwitchTree)
        expect(records[4].kind).toBe(LeafNodeKind.Condition)
        expect(records[4].content).toBe('当前城市')
        expect(records[5].kind).toBe(NodeKind.CaseNode)
        expect(records[6].kind).toBe(LeafNodeKind.Expectation)
        expect(records[6].content).toBe('上海')
        expect(records[7].kind).toBe(NodeKind.CaseNode)
        expect(records[8].kind).toBe(LeafNodeKind.Expectation)
        expect(records[8].content).toBe('北京')
        expect(records[9].kind).toBe(NodeKind.DefaultNode)
      })
    })
  })

  describe('fold', () => {
    describe('TreeBlock', () => {
      it('empty', () => {
        const tree = {
          kind: 'Tree',
          blocks: [],
          starts: [],
          comments: [],
        } as Tree

        expect(fold(unfold(tree))).toStrictEqual(tree)
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

        expect(fold(unfold(tree))).toStrictEqual(tree)
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

        expect(fold(unfold(tree))).toStrictEqual(tree)
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

        expect(fold(unfold(tree))).toStrictEqual(tree)
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

        expect(fold(unfold(tree))).toStrictEqual(tree)
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

        expect(fold(unfold(tree))).toStrictEqual(tree)
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

        expect(fold(unfold(tree))).toStrictEqual(tree)
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

        expect(fold(unfold(tree))).toStrictEqual(tree)
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

        expect(fold(unfold(tree))).toStrictEqual(tree)
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

        expect(fold(unfold(tree))).toStrictEqual(tree)
      })
    })
  })
})
