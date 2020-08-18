import { createLexer } from '../src'

describe('lexer', () => {
  it('work', () => {
    const input = `<从首页进入旅游频道> = {
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
    const lexer = createLexer(input)
    lexer.run()

    expect(lexer.lexicalErrors.length).toBe(0)
  })

  it('Identifier', () => {
    const input = `<从首页进入旅游频道>`
    const lexer = createLexer(input)
    lexer.run()

    expect(lexer.lexicalErrors.length).toBe(0)
    expect(lexer.tokens[0]).toStrictEqual({
      kind: 'identifier',
      word: '<从首页进入旅游频道>',
      range: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    })
  })

  it('Action', () => {
    const input = `[从首页进入旅游频道]`
    const lexer = createLexer(input)
    lexer.run()

    expect(lexer.lexicalErrors.length).toBe(0)
    expect(lexer.tokens[0]).toStrictEqual({
      kind: 'action',
      word: '[从首页进入旅游频道]',
      range: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    })
  })

  it('Path', () => {
    const input = `"从首页进入旅游频道"`
    const lexer = createLexer(input)
    lexer.run()

    expect(lexer.lexicalErrors.length).toBe(0)
    expect(lexer.tokens[0]).toStrictEqual({
      kind: 'path',
      word: '"从首页进入旅游频道"',
      range: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    })
  })

  it('Keyword', () => {
    const keywords = [
      'start', 'goto', 'if',
      'else', 'switch', 'case', 'default',
      'import', 'from', 'export', null
    ]
    const input = `start goto if else switch case default import from export`
    const lexer = createLexer(input)
    lexer.run()

    expect(lexer.tokens.length).toBe(11)
    expect(lexer.lexicalErrors.length).toBe(0)
    for (let i = 0; i< lexer.tokens.length; i++) {
      if (i < 10) {
        expect(lexer.tokens[i].kind).toBe('keyword')
      } else {
        expect(lexer.tokens[i].kind).toBe('eop')
      }
      expect(lexer.tokens[i].word).toBe(keywords[i])
    }
  })

  it('Operator', () => {
    const operators = [
      '{', '}', '=',
      '->', ',', null
    ]
    const input = `{ } = -> ,`
    const lexer = createLexer(input)
    lexer.run()

    expect(lexer.tokens.length).toBe(6)
    expect(lexer.lexicalErrors.length).toBe(0)
    for (let i = 0; i< lexer.tokens.length; i++) {
      if (i < 5) {
        expect(lexer.tokens[i].kind).toBe('operator')
      } else {
        expect(lexer.tokens[i].kind).toBe('eop')
      }
      expect(lexer.tokens[i].word).toBe(operators[i])
    }
  })

  it('unknown token error', () => {
    const input = `star`
    const lexer = createLexer(input)
    lexer.run()

    expect(lexer.lexicalErrors.length).toBe(1)
    expect(lexer.lexicalErrors[0].message).toBe('Unknown token: star')
  })

  it('Identifier has not been closed error', () => {
    const input = `<test`
    const lexer = createLexer(input)
    lexer.run()

    expect(lexer.lexicalErrors.length).toBe(1)
    expect(lexer.lexicalErrors[0].message).toBe('Identifier: <test has not been closed')
  })

  it('Action has not been closed error', () => {
    const input = `[test`
    const lexer = createLexer(input)
    lexer.run()

    expect(lexer.lexicalErrors.length).toBe(1)
    expect(lexer.lexicalErrors[0].message).toBe('Action: [test has not been closed')
  })

  it('Path has not been closed error', () => {
    const input = `"test`
    const lexer = createLexer(input)
    lexer.run()

    expect(lexer.lexicalErrors.length).toBe(1)
    expect(lexer.lexicalErrors[0].message).toBe('Path: "test has not been closed')
  })
})