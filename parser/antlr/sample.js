var antlr4 = require('antlr4');
var MyGrammarLexer = require('./GraphLexer').GraphLexer;
var MyGrammarParser = require('./GraphParser').GraphParser;
var MyGrammarListener = require('./GraphParserListener').GraphParserListener;


var input = `
start <选择上海站> = {
  if [不是上海站] -> {
    [点击顶部城市选择栏]
    [选择上海出发地]
  }
}

export [打开携程首页]

import { [打开携程首页] } from "./asdf.graph"

<从首页进入旅游频道> = {
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



<选择出行人> = {
  [点击选择出行人按钮]

  if [没有出行人] -> {
    # 去创建出行人
    goto [创建出行人]
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
}
`
var chars = new antlr4.InputStream(input);
var lexer = new MyGrammarLexer(chars);
var tokens = new antlr4.CommonTokenStream(lexer);
var parser = new MyGrammarParser(tokens);

console.log({
  lexer,
  tokens,
  parser
})

// console.log(parser.p())

// console.log({
//   lexer,
//   tokens,
//   parser
// })

setTimeout(() => {

}, 10000000)