import { travel, Tree, ActualNode, NodeKind } from '../src'
import { tree as sampleTree } from './sample'

describe('travel', () => {
  let treeCount = 0
  let treeBlockCount = 0
  let actionNodeCount = 0
  let gotoNodeCount = 0
  let ifTreeCount = 0
  let switchTreeCount = 0
  let caseNodeCount = 0
  let defaultNodeCount = 0

  const callee = (node: ActualNode) => {
    switch (node.kind) {
      case NodeKind.Tree: {
        treeCount++
        break
      }
      case NodeKind.TreeBlock: {
        treeBlockCount++
        break
      }
      case NodeKind.ActionNode: {
        actionNodeCount++
        break
      }
      case NodeKind.GotoNode: {
        gotoNodeCount++
        break
      }
      case NodeKind.SwitchTree: {
        switchTreeCount++
        break
      }
      case NodeKind.CaseNode: {
        caseNodeCount++
        break
      }
      case NodeKind.DefaultNode: {
        defaultNodeCount++
        break
      }
      case NodeKind.IfTree: {
        ifTreeCount++
        break
      }
    }
  }

  beforeEach(() => {
    treeCount = 0
    treeBlockCount = 0
    actionNodeCount = 0
    gotoNodeCount = 0
    ifTreeCount = 0
    switchTreeCount = 0
    caseNodeCount = 0
    defaultNodeCount = 0
  })

  describe('Tree', () => {
    it('work', () => {
      travel(sampleTree, callee)

      expect(treeCount).toBe(1)
      expect(treeBlockCount).toBe(7)
      expect(actionNodeCount).toBe(19)
      expect(gotoNodeCount).toBe(6)
      expect(ifTreeCount).toBe(2)
      expect(switchTreeCount).toBe(1)
      expect(caseNodeCount).toBe(2)
      expect(defaultNodeCount).toBe(1)
    })
  })

  describe('TreeBlock', () => {
    it('empty', () => {
      const tree = {
        kind: 'Tree',
        blocks: [],
        starts: [],
        comments: [],
      } as Tree
      travel(tree, callee)

      expect(treeCount).toBe(1)
      expect(treeBlockCount).toBe(0)
      expect(actionNodeCount).toBe(0)
      expect(gotoNodeCount).toBe(0)
      expect(ifTreeCount).toBe(0)
      expect(switchTreeCount).toBe(0)
      expect(caseNodeCount).toBe(0)
      expect(defaultNodeCount).toBe(0)
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
      travel(tree, callee)

      expect(treeCount).toBe(1)
      expect(treeBlockCount).toBe(1)
      expect(actionNodeCount).toBe(0)
      expect(gotoNodeCount).toBe(0)
      expect(ifTreeCount).toBe(0)
      expect(switchTreeCount).toBe(0)
      expect(caseNodeCount).toBe(0)
      expect(defaultNodeCount).toBe(0)
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
      travel(tree, callee)

      expect(treeCount).toBe(1)
      expect(treeBlockCount).toBe(1)
      expect(actionNodeCount).toBe(2)
      expect(gotoNodeCount).toBe(0)
      expect(ifTreeCount).toBe(0)
      expect(switchTreeCount).toBe(0)
      expect(caseNodeCount).toBe(0)
      expect(defaultNodeCount).toBe(0)
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
      travel(tree, callee)

      expect(treeCount).toBe(1)
      expect(treeBlockCount).toBe(1)
      expect(actionNodeCount).toBe(2)
      expect(gotoNodeCount).toBe(0)
      expect(ifTreeCount).toBe(0)
      expect(switchTreeCount).toBe(0)
      expect(caseNodeCount).toBe(0)
      expect(defaultNodeCount).toBe(0)
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
      travel(tree, callee)

      expect(treeCount).toBe(1)
      expect(treeBlockCount).toBe(2)
      expect(actionNodeCount).toBe(0)
      expect(gotoNodeCount).toBe(1)
      expect(ifTreeCount).toBe(0)
      expect(switchTreeCount).toBe(0)
      expect(caseNodeCount).toBe(0)
      expect(defaultNodeCount).toBe(0)
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
      travel(tree, callee)

      expect(treeCount).toBe(1)
      expect(treeBlockCount).toBe(1)
      expect(actionNodeCount).toBe(0)
      expect(gotoNodeCount).toBe(0)
      expect(ifTreeCount).toBe(1)
      expect(switchTreeCount).toBe(0)
      expect(caseNodeCount).toBe(0)
      expect(defaultNodeCount).toBe(0)
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
      travel(tree, callee)

      expect(treeCount).toBe(1)
      expect(treeBlockCount).toBe(1)
      expect(actionNodeCount).toBe(1)
      expect(gotoNodeCount).toBe(0)
      expect(ifTreeCount).toBe(1)
      expect(switchTreeCount).toBe(0)
      expect(caseNodeCount).toBe(0)
      expect(defaultNodeCount).toBe(0)
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
      travel(tree, callee)

      expect(treeCount).toBe(1)
      expect(treeBlockCount).toBe(1)
      expect(actionNodeCount).toBe(0)
      expect(gotoNodeCount).toBe(0)
      expect(ifTreeCount).toBe(0)
      expect(switchTreeCount).toBe(1)
      expect(caseNodeCount).toBe(2)
      expect(defaultNodeCount).toBe(0)
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
      travel(tree, callee)

      expect(treeCount).toBe(1)
      expect(treeBlockCount).toBe(1)
      expect(actionNodeCount).toBe(0)
      expect(gotoNodeCount).toBe(0)
      expect(ifTreeCount).toBe(0)
      expect(switchTreeCount).toBe(1)
      expect(caseNodeCount).toBe(2)
      expect(defaultNodeCount).toBe(1)
    })
  })
})
