import type { Program } from 'gt-language'
import type { Tree } from '../src'

export const sample = `<从首页进入旅游频道> = {
  [打开携程首页]

  [点击旅游频道]
}

<从旅游频道进入产品详情页> = {
  [点击进入跟团游]

  [点击周边安心游第一个产品]
}

start <下单流程> = {
  goto <从首页进入旅游频道>

  # 确认是上海站
  # 如果不是，选择上海站
  goto <选择上海站>

  goto <从旅游频道进入产品详情页>

  [点击立即预定]

  [选择1成人]

  [点击确定按钮进入填写页]

  # 去选择出行人
  goto <选择出行人>

  # 去填写联系人
  goto <填写联系人>

  [点击去付款]

  switch [当前城市] {
    case [上海] -> {

    }
    case [北京] -> {

    }
    default -> {

    }
  }
}

start <选择上海站> = {
  if [不是上海站] -> {
    [点击顶部城市选择栏]

    [选择上海出发地]
  }
}

<选择出行人> = {
  [点击选择出行人按钮]

  if [没有出行人] -> {
    # 去创建出行人
    goto <创建出行人>
  }

  [选择第一个出行人]

  [点击完成按钮]
}

<创建出行人> = {
  [点击新增旅客按钮]

  [填写中文姓名]

  [填写手机号]

  [点击保存]
}

<填写联系人> = {
  [填写联系人姓名]

  [填写联系人手机号]
}`

export const program = {
  kind: 'Program',
  moduleStatemens: [
    {
      kind: 'InferenceDefinition',
      identifier: {
        kind: 'identifier',
        word: '<从首页进入旅游频道>',
        range: {
          start: {
            line: 1,
            column: 0,
          },
          end: {
            line: 1,
            column: 11,
          },
        },
      },
      block: {
        kind: 'Block',
        list: [
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[打开携程首页]',
              range: {
                start: {
                  line: 2,
                  column: 5,
                },
                end: {
                  line: 2,
                  column: 13,
                },
              },
            },
            range: {
              start: {
                line: 2,
                column: 5,
              },
              end: {
                line: 2,
                column: 13,
              },
            },
            comments: [],
          },
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[点击旅游频道]',
              range: {
                start: {
                  line: 4,
                  column: 5,
                },
                end: {
                  line: 4,
                  column: 13,
                },
              },
            },
            range: {
              start: {
                line: 4,
                column: 5,
              },
              end: {
                line: 4,
                column: 13,
              },
            },
            comments: [],
          },
        ],
        range: {
          start: {
            line: 1,
            column: 14,
          },
          end: {
            line: 5,
            column: 4,
          },
        },
      },
      range: {
        start: {
          line: 1,
          column: 0,
        },
        end: {
          line: 5,
          column: 4,
        },
      },
      comments: [],
    },
    {
      kind: 'InferenceDefinition',
      identifier: {
        kind: 'identifier',
        word: '<从旅游频道进入产品详情页>',
        range: {
          start: {
            line: 7,
            column: 3,
          },
          end: {
            line: 7,
            column: 17,
          },
        },
      },
      block: {
        kind: 'Block',
        list: [
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[点击进入跟团游]',
              range: {
                start: {
                  line: 8,
                  column: 5,
                },
                end: {
                  line: 8,
                  column: 14,
                },
              },
            },
            range: {
              start: {
                line: 8,
                column: 5,
              },
              end: {
                line: 8,
                column: 14,
              },
            },
            comments: [],
          },
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[点击周边安心游第一个产品]',
              range: {
                start: {
                  line: 10,
                  column: 5,
                },
                end: {
                  line: 10,
                  column: 19,
                },
              },
            },
            range: {
              start: {
                line: 10,
                column: 5,
              },
              end: {
                line: 10,
                column: 19,
              },
            },
            comments: [],
          },
        ],
        range: {
          start: {
            line: 7,
            column: 20,
          },
          end: {
            line: 11,
            column: 4,
          },
        },
      },
      range: {
        start: {
          line: 7,
          column: 3,
        },
        end: {
          line: 11,
          column: 4,
        },
      },
      comments: [],
    },
    {
      kind: 'StartStatement',
      module: {
        kind: 'Module',
        identifier: {
          kind: 'identifier',
          word: '<下单流程>',
          range: {
            start: {
              line: 13,
              column: 9,
            },
            end: {
              line: 13,
              column: 15,
            },
          },
        },
        definition: {
          kind: 'InferenceDefinition',
          identifier: {
            kind: 'identifier',
            word: '<下单流程>',
            range: {
              start: {
                line: 13,
                column: 9,
              },
              end: {
                line: 13,
                column: 15,
              },
            },
          },
          block: {
            kind: 'Block',
            list: [
              {
                kind: 'GotoStatement',
                identifier: {
                  kind: 'identifier',
                  word: '<从首页进入旅游频道>',
                  range: {
                    start: {
                      line: 14,
                      column: 10,
                    },
                    end: {
                      line: 14,
                      column: 21,
                    },
                  },
                },
                range: {
                  start: {
                    line: 14,
                    column: 5,
                  },
                  end: {
                    line: 14,
                    column: 21,
                  },
                },
                comments: [],
              },
              {
                kind: 'GotoStatement',
                identifier: {
                  kind: 'identifier',
                  word: '<选择上海站>',
                  range: {
                    start: {
                      line: 18,
                      column: 10,
                    },
                    end: {
                      line: 18,
                      column: 17,
                    },
                  },
                },
                range: {
                  start: {
                    line: 18,
                    column: 5,
                  },
                  end: {
                    line: 18,
                    column: 17,
                  },
                },
                comments: [
                  {
                    kind: 'comment',
                    word: '# 确认是上海站',
                    range: {
                      start: {
                        line: 16,
                        column: 5,
                      },
                      end: {
                        line: 16,
                        column: 13,
                      },
                    },
                  },
                  {
                    kind: 'comment',
                    word: '# 如果不是，选择上海站',
                    range: {
                      start: {
                        line: 17,
                        column: 5,
                      },
                      end: {
                        line: 17,
                        column: 17,
                      },
                    },
                  },
                ],
              },
              {
                kind: 'GotoStatement',
                identifier: {
                  kind: 'identifier',
                  word: '<从旅游频道进入产品详情页>',
                  range: {
                    start: {
                      line: 20,
                      column: 10,
                    },
                    end: {
                      line: 20,
                      column: 24,
                    },
                  },
                },
                range: {
                  start: {
                    line: 20,
                    column: 5,
                  },
                  end: {
                    line: 20,
                    column: 24,
                  },
                },
                comments: [],
              },
              {
                kind: 'StepStatement',
                expression: {
                  kind: 'action',
                  word: '[点击立即预定]',
                  range: {
                    start: {
                      line: 22,
                      column: 5,
                    },
                    end: {
                      line: 22,
                      column: 13,
                    },
                  },
                },
                range: {
                  start: {
                    line: 22,
                    column: 5,
                  },
                  end: {
                    line: 22,
                    column: 13,
                  },
                },
                comments: [],
              },
              {
                kind: 'StepStatement',
                expression: {
                  kind: 'action',
                  word: '[选择1成人]',
                  range: {
                    start: {
                      line: 24,
                      column: 5,
                    },
                    end: {
                      line: 24,
                      column: 12,
                    },
                  },
                },
                range: {
                  start: {
                    line: 24,
                    column: 5,
                  },
                  end: {
                    line: 24,
                    column: 12,
                  },
                },
                comments: [],
              },
              {
                kind: 'StepStatement',
                expression: {
                  kind: 'action',
                  word: '[点击确定按钮进入填写页]',
                  range: {
                    start: {
                      line: 26,
                      column: 5,
                    },
                    end: {
                      line: 26,
                      column: 18,
                    },
                  },
                },
                range: {
                  start: {
                    line: 26,
                    column: 5,
                  },
                  end: {
                    line: 26,
                    column: 18,
                  },
                },
                comments: [],
              },
              {
                kind: 'GotoStatement',
                identifier: {
                  kind: 'identifier',
                  word: '<选择出行人>',
                  range: {
                    start: {
                      line: 29,
                      column: 10,
                    },
                    end: {
                      line: 29,
                      column: 17,
                    },
                  },
                },
                range: {
                  start: {
                    line: 29,
                    column: 5,
                  },
                  end: {
                    line: 29,
                    column: 17,
                  },
                },
                comments: [
                  {
                    kind: 'comment',
                    word: '# 去选择出行人',
                    range: {
                      start: {
                        line: 28,
                        column: 5,
                      },
                      end: {
                        line: 28,
                        column: 13,
                      },
                    },
                  },
                ],
              },
              {
                kind: 'GotoStatement',
                identifier: {
                  kind: 'identifier',
                  word: '<填写联系人>',
                  range: {
                    start: {
                      line: 32,
                      column: 10,
                    },
                    end: {
                      line: 32,
                      column: 17,
                    },
                  },
                },
                range: {
                  start: {
                    line: 32,
                    column: 5,
                  },
                  end: {
                    line: 32,
                    column: 17,
                  },
                },
                comments: [
                  {
                    kind: 'comment',
                    word: '# 去填写联系人',
                    range: {
                      start: {
                        line: 31,
                        column: 5,
                      },
                      end: {
                        line: 31,
                        column: 13,
                      },
                    },
                  },
                ],
              },
              {
                kind: 'StepStatement',
                expression: {
                  kind: 'action',
                  word: '[点击去付款]',
                  range: {
                    start: {
                      line: 34,
                      column: 5,
                    },
                    end: {
                      line: 34,
                      column: 12,
                    },
                  },
                },
                range: {
                  start: {
                    line: 34,
                    column: 5,
                  },
                  end: {
                    line: 34,
                    column: 12,
                  },
                },
                comments: [],
              },
              {
                kind: 'SwitchStatement',
                expression: {
                  kind: 'action',
                  word: '[当前城市]',
                  range: {
                    start: {
                      line: 36,
                      column: 12,
                    },
                    end: {
                      line: 36,
                      column: 18,
                    },
                  },
                },
                switchBlock: {
                  kind: 'SwitchBlock',
                  caseClauses: [
                    {
                      kind: 'CaseClause',
                      expression: {
                        kind: 'action',
                        word: '[上海]',
                        range: {
                          start: {
                            line: 37,
                            column: 12,
                          },
                          end: {
                            line: 37,
                            column: 16,
                          },
                        },
                      },
                      block: {
                        kind: 'Block',
                        list: [],
                        range: {
                          start: {
                            line: 37,
                            column: 20,
                          },
                          end: {
                            line: 39,
                            column: 8,
                          },
                        },
                      },
                      range: {
                        start: {
                          line: 37,
                          column: 7,
                        },
                        end: {
                          line: 39,
                          column: 8,
                        },
                      },
                      comments: [],
                    },
                    {
                      kind: 'CaseClause',
                      expression: {
                        kind: 'action',
                        word: '[北京]',
                        range: {
                          start: {
                            line: 41,
                            column: 12,
                          },
                          end: {
                            line: 41,
                            column: 16,
                          },
                        },
                      },
                      block: {
                        kind: 'Block',
                        list: [],
                        range: {
                          start: {
                            line: 41,
                            column: 20,
                          },
                          end: {
                            line: 43,
                            column: 8,
                          },
                        },
                      },
                      range: {
                        start: {
                          line: 41,
                          column: 7,
                        },
                        end: {
                          line: 43,
                          column: 8,
                        },
                      },
                      comments: [],
                    },
                  ],
                  defaultClause: {
                    kind: 'DefaultClause',
                    block: {
                      kind: 'Block',
                      list: [],
                      range: {
                        start: {
                          line: 45,
                          column: 18,
                        },
                        end: {
                          line: 47,
                          column: 8,
                        },
                      },
                    },
                    range: {
                      start: {
                        line: 45,
                        column: 7,
                      },
                      end: {
                        line: 47,
                        column: 8,
                      },
                    },
                    comments: [],
                  },
                  range: {
                    start: {
                      line: 36,
                      column: 19,
                    },
                    end: {
                      line: 48,
                      column: 6,
                    },
                  },
                },
                range: {
                  start: {
                    line: 36,
                    column: 5,
                  },
                  end: {
                    line: 48,
                    column: 6,
                  },
                },
                comments: [],
              },
            ],
            range: {
              start: {
                line: 13,
                column: 18,
              },
              end: {
                line: 49,
                column: 4,
              },
            },
          },
          range: {
            start: {
              line: 13,
              column: 9,
            },
            end: {
              line: 49,
              column: 4,
            },
          },
          comments: [],
        },
        range: {
          start: {
            line: 13,
            column: 9,
          },
          end: {
            line: 49,
            column: 4,
          },
        },
      },
      range: {
        start: {
          line: 13,
          column: 3,
        },
        end: {
          line: 49,
          column: 4,
        },
      },
      comments: [],
    },
    {
      kind: 'StartStatement',
      module: {
        kind: 'Module',
        identifier: {
          kind: 'identifier',
          word: '<选择上海站>',
          range: {
            start: {
              line: 51,
              column: 9,
            },
            end: {
              line: 51,
              column: 16,
            },
          },
        },
        definition: {
          kind: 'InferenceDefinition',
          identifier: {
            kind: 'identifier',
            word: '<选择上海站>',
            range: {
              start: {
                line: 51,
                column: 9,
              },
              end: {
                line: 51,
                column: 16,
              },
            },
          },
          block: {
            kind: 'Block',
            list: [
              {
                kind: 'IfStatement',
                expression: {
                  kind: 'action',
                  word: '[不是上海站]',
                  range: {
                    start: {
                      line: 52,
                      column: 8,
                    },
                    end: {
                      line: 52,
                      column: 15,
                    },
                  },
                },
                ifBlock: {
                  kind: 'Block',
                  list: [
                    {
                      kind: 'StepStatement',
                      expression: {
                        kind: 'action',
                        word: '[点击顶部城市选择栏]',
                        range: {
                          start: {
                            line: 53,
                            column: 7,
                          },
                          end: {
                            line: 53,
                            column: 18,
                          },
                        },
                      },
                      range: {
                        start: {
                          line: 53,
                          column: 7,
                        },
                        end: {
                          line: 53,
                          column: 18,
                        },
                      },
                      comments: [],
                    },
                    {
                      kind: 'StepStatement',
                      expression: {
                        kind: 'action',
                        word: '[选择上海出发地]',
                        range: {
                          start: {
                            line: 54,
                            column: 7,
                          },
                          end: {
                            line: 54,
                            column: 16,
                          },
                        },
                      },
                      range: {
                        start: {
                          line: 54,
                          column: 7,
                        },
                        end: {
                          line: 54,
                          column: 16,
                        },
                      },
                      comments: [],
                    },
                  ],
                  range: {
                    start: {
                      line: 52,
                      column: 19,
                    },
                    end: {
                      line: 55,
                      column: 6,
                    },
                  },
                },
                elseBlock: null,
                range: {
                  start: {
                    line: 52,
                    column: 5,
                  },
                  end: {
                    line: 55,
                    column: 6,
                  },
                },
                comments: [],
              },
            ],
            range: {
              start: {
                line: 51,
                column: 19,
              },
              end: {
                line: 56,
                column: 4,
              },
            },
          },
          range: {
            start: {
              line: 51,
              column: 9,
            },
            end: {
              line: 56,
              column: 4,
            },
          },
          comments: [],
        },
        range: {
          start: {
            line: 51,
            column: 9,
          },
          end: {
            line: 56,
            column: 4,
          },
        },
      },
      range: {
        start: {
          line: 51,
          column: 3,
        },
        end: {
          line: 56,
          column: 4,
        },
      },
      comments: [],
    },
    {
      kind: 'InferenceDefinition',
      identifier: {
        kind: 'identifier',
        word: '<选择出行人>',
        range: {
          start: {
            line: 58,
            column: 3,
          },
          end: {
            line: 58,
            column: 10,
          },
        },
      },
      block: {
        kind: 'Block',
        list: [
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[点击选择出行人按钮]',
              range: {
                start: {
                  line: 59,
                  column: 5,
                },
                end: {
                  line: 59,
                  column: 16,
                },
              },
            },
            range: {
              start: {
                line: 59,
                column: 5,
              },
              end: {
                line: 59,
                column: 16,
              },
            },
            comments: [],
          },
          {
            kind: 'IfStatement',
            expression: {
              kind: 'action',
              word: '[没有出行人]',
              range: {
                start: {
                  line: 61,
                  column: 8,
                },
                end: {
                  line: 61,
                  column: 15,
                },
              },
            },
            ifBlock: {
              kind: 'Block',
              list: [
                {
                  kind: 'GotoStatement',
                  identifier: {
                    kind: 'identifier',
                    word: '<创建出行人>',
                    range: {
                      start: {
                        line: 63,
                        column: 12,
                      },
                      end: {
                        line: 63,
                        column: 19,
                      },
                    },
                  },
                  range: {
                    start: {
                      line: 63,
                      column: 7,
                    },
                    end: {
                      line: 63,
                      column: 19,
                    },
                  },
                  comments: [
                    {
                      kind: 'comment',
                      word: '# 去创建出行人',
                      range: {
                        start: {
                          line: 62,
                          column: 7,
                        },
                        end: {
                          line: 62,
                          column: 15,
                        },
                      },
                    },
                  ],
                },
              ],
              range: {
                start: {
                  line: 61,
                  column: 19,
                },
                end: {
                  line: 64,
                  column: 6,
                },
              },
            },
            elseBlock: null,
            range: {
              start: {
                line: 61,
                column: 5,
              },
              end: {
                line: 64,
                column: 6,
              },
            },
            comments: [],
          },
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[选择第一个出行人]',
              range: {
                start: {
                  line: 66,
                  column: 5,
                },
                end: {
                  line: 66,
                  column: 15,
                },
              },
            },
            range: {
              start: {
                line: 66,
                column: 5,
              },
              end: {
                line: 66,
                column: 15,
              },
            },
            comments: [],
          },
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[点击完成按钮]',
              range: {
                start: {
                  line: 68,
                  column: 5,
                },
                end: {
                  line: 68,
                  column: 13,
                },
              },
            },
            range: {
              start: {
                line: 68,
                column: 5,
              },
              end: {
                line: 68,
                column: 13,
              },
            },
            comments: [],
          },
        ],
        range: {
          start: {
            line: 58,
            column: 13,
          },
          end: {
            line: 69,
            column: 4,
          },
        },
      },
      range: {
        start: {
          line: 58,
          column: 3,
        },
        end: {
          line: 69,
          column: 4,
        },
      },
      comments: [],
    },
    {
      kind: 'InferenceDefinition',
      identifier: {
        kind: 'identifier',
        word: '<创建出行人>',
        range: {
          start: {
            line: 71,
            column: 3,
          },
          end: {
            line: 71,
            column: 10,
          },
        },
      },
      block: {
        kind: 'Block',
        list: [
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[点击新增旅客按钮]',
              range: {
                start: {
                  line: 72,
                  column: 5,
                },
                end: {
                  line: 72,
                  column: 15,
                },
              },
            },
            range: {
              start: {
                line: 72,
                column: 5,
              },
              end: {
                line: 72,
                column: 15,
              },
            },
            comments: [],
          },
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[填写中文姓名]',
              range: {
                start: {
                  line: 73,
                  column: 5,
                },
                end: {
                  line: 73,
                  column: 13,
                },
              },
            },
            range: {
              start: {
                line: 73,
                column: 5,
              },
              end: {
                line: 73,
                column: 13,
              },
            },
            comments: [],
          },
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[填写手机号]',
              range: {
                start: {
                  line: 74,
                  column: 5,
                },
                end: {
                  line: 74,
                  column: 12,
                },
              },
            },
            range: {
              start: {
                line: 74,
                column: 5,
              },
              end: {
                line: 74,
                column: 12,
              },
            },
            comments: [],
          },
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[点击保存]',
              range: {
                start: {
                  line: 75,
                  column: 5,
                },
                end: {
                  line: 75,
                  column: 11,
                },
              },
            },
            range: {
              start: {
                line: 75,
                column: 5,
              },
              end: {
                line: 75,
                column: 11,
              },
            },
            comments: [],
          },
        ],
        range: {
          start: {
            line: 71,
            column: 13,
          },
          end: {
            line: 76,
            column: 4,
          },
        },
      },
      range: {
        start: {
          line: 71,
          column: 3,
        },
        end: {
          line: 76,
          column: 4,
        },
      },
      comments: [],
    },
    {
      kind: 'InferenceDefinition',
      identifier: {
        kind: 'identifier',
        word: '<填写联系人>',
        range: {
          start: {
            line: 78,
            column: 3,
          },
          end: {
            line: 78,
            column: 10,
          },
        },
      },
      block: {
        kind: 'Block',
        list: [
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[填写联系人姓名]',
              range: {
                start: {
                  line: 79,
                  column: 5,
                },
                end: {
                  line: 79,
                  column: 14,
                },
              },
            },
            range: {
              start: {
                line: 79,
                column: 5,
              },
              end: {
                line: 79,
                column: 14,
              },
            },
            comments: [],
          },
          {
            kind: 'StepStatement',
            expression: {
              kind: 'action',
              word: '[填写联系人手机号]',
              range: {
                start: {
                  line: 80,
                  column: 5,
                },
                end: {
                  line: 80,
                  column: 15,
                },
              },
            },
            range: {
              start: {
                line: 80,
                column: 5,
              },
              end: {
                line: 80,
                column: 15,
              },
            },
            comments: [],
          },
        ],
        range: {
          start: {
            line: 78,
            column: 13,
          },
          end: {
            line: 81,
            column: 4,
          },
        },
      },
      range: {
        start: {
          line: 78,
          column: 3,
        },
        end: {
          line: 81,
          column: 4,
        },
      },
      comments: [],
    },
  ],
  range: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 82,
      column: 2,
    },
  },
  comments: [],
} as Program

export const tree = {
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
    {
      kind: 'TreeBlock',
      name: '从旅游频道进入产品详情页',
      children: [
        {
          kind: 'ActionNode',
          expression: '点击进入跟团游',
          comments: [],
        },
        {
          kind: 'ActionNode',
          expression: '点击周边安心游第一个产品',
          comments: [],
        },
      ],
      comments: [],
    },
    {
      kind: 'TreeBlock',
      name: '下单流程',
      children: [
        {
          kind: 'GotoNode',
          name: '从首页进入旅游频道',
          comments: [],
        },
        {
          kind: 'GotoNode',
          name: '选择上海站',
          comments: ['确认是上海站', '如果不是，选择上海站'],
        },
        {
          kind: 'GotoNode',
          name: '从旅游频道进入产品详情页',
          comments: [],
        },
        {
          kind: 'ActionNode',
          expression: '点击立即预定',
          comments: [],
        },
        {
          kind: 'ActionNode',
          expression: '选择1成人',
          comments: [],
        },
        {
          kind: 'ActionNode',
          expression: '点击确定按钮进入填写页',
          comments: [],
        },
        {
          kind: 'GotoNode',
          name: '选择出行人',
          comments: ['去选择出行人'],
        },
        {
          kind: 'GotoNode',
          name: '填写联系人',
          comments: ['去填写联系人'],
        },
        {
          kind: 'ActionNode',
          expression: '点击去付款',
          comments: [],
        },
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
    {
      kind: 'TreeBlock',
      name: '选择上海站',
      children: [
        {
          kind: 'IfTree',
          condition: '不是上海站',
          successChildren: [
            {
              kind: 'ActionNode',
              expression: '点击顶部城市选择栏',
              comments: [],
            },
            {
              kind: 'ActionNode',
              expression: '选择上海出发地',
              comments: [],
            },
          ],
          faildChildren: [],
          comments: [],
        },
      ],
      comments: [],
    },
    {
      kind: 'TreeBlock',
      name: '选择出行人',
      children: [
        {
          kind: 'ActionNode',
          expression: '点击选择出行人按钮',
          comments: [],
        },
        {
          kind: 'IfTree',
          condition: '没有出行人',
          successChildren: [
            {
              kind: 'GotoNode',
              name: '创建出行人',
              comments: ['去创建出行人'],
            },
          ],
          faildChildren: [],
          comments: [],
        },
        {
          kind: 'ActionNode',
          expression: '选择第一个出行人',
          comments: [],
        },
        {
          kind: 'ActionNode',
          expression: '点击完成按钮',
          comments: [],
        },
      ],
      comments: [],
    },
    {
      kind: 'TreeBlock',
      name: '创建出行人',
      children: [
        {
          kind: 'ActionNode',
          expression: '点击新增旅客按钮',
          comments: [],
        },
        {
          kind: 'ActionNode',
          expression: '填写中文姓名',
          comments: [],
        },
        {
          kind: 'ActionNode',
          expression: '填写手机号',
          comments: [],
        },
        {
          kind: 'ActionNode',
          expression: '点击保存',
          comments: [],
        },
      ],
      comments: [],
    },
    {
      kind: 'TreeBlock',
      name: '填写联系人',
      children: [
        {
          kind: 'ActionNode',
          expression: '填写联系人姓名',
          comments: [],
        },
        {
          kind: 'ActionNode',
          expression: '填写联系人手机号',
          comments: [],
        },
      ],
      comments: [],
    },
  ],
  starts: ['下单流程', '选择上海站'],
  comments: [],
} as Tree
