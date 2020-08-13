var antlr4 = require('antlr4');
var MyGrammarLexer = require('./GraphLexer').GraphLexer;
var MyGrammarParser = require('./GraphParser').GraphParser;
var MyGrammarVisitor = require('./GraphParserVisitor').GraphParserVisitor;
var ErrorListener = require('./ErrorListener')

module.exports = function parser(input) {
  try {
    var chars = new antlr4.InputStream(input);
    var lexer = new MyGrammarLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new MyGrammarParser(tokens);
    parser.removeErrorListeners()
    var listener = new ErrorListener()
    parser.addErrorListener(listener)
    parser.buildParseTrees = true;
    var ctx = parser.program()
    var visitor = new MyGrammarVisitor()
    var ast = visitor.visitProgram(ctx)

    return {
      success: true,
      tokens,
      ast
    }
  } catch (err) {
    return {
      success: false,
      err
    }
  }
}