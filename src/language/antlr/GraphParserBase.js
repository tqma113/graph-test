const antlr4 = require("antlr4");
const GraphParser = require("./GraphParser");

function GraphParserBase(input) {
  antlr4.Parser.call(this, input);
}

GraphParserBase.prototype = Object.create(antlr4.Parser.prototype);

GraphParserBase.prototype.p = function(str) {
  return this.prev(str);
};

GraphParserBase.prototype.prev = function(str) {
  const source = this._input.LT(-1).source[1].strdata;
  const start = this._input.LT(-1).start;
  const stop = this._input.LT(-1).stop;
  const prev = source.slice(start, stop + 1);
  return prev === str;
};

GraphParserBase.prototype.notLineTerminator = function() {
  return !this.here(GraphParser.LineTerminator);
};

GraphParserBase.prototype.notOpenBraceAndNotFunction = function() {
  const nextTokenType = this._input.LT(1).type;
  return (
    nextTokenType !== GraphParser.OpenBrace &&
    nextTokenType !== GraphParser.Function
  );
};

GraphParserBase.prototype.closeBrace = function() {
  return this._input.LT(1).type === GraphParser.CloseBrace;
};

GraphParserBase.prototype.here = function(type) {
  const possibleIndexEosToken = this.getCurrentToken().tokenIndex - 1;
  const ahead = this._input.get(possibleIndexEosToken);
  return ahead.channel === antlr4.Lexer.HIDDEN && ahead.type === type;
};

GraphParserBase.prototype.lineTerminatorAhead = function() {
  let possibleIndexEosToken = this.getCurrentToken().tokenIndex - 1;
  let ahead = this._input.get(possibleIndexEosToken);
  if (ahead.channel !== antlr4.Lexer.HIDDEN) {
    return false;
  }

  if (ahead.type === GraphParser.LineTerminator) {
    return true;
  }

  if (ahead.type === GraphParser.WhiteSpaces) {
    possibleIndexEosToken = this.getCurrentToken().getTokenIndex() - 2;
    ahead = this._input.get(possibleIndexEosToken);
  }

  const text = ahead.type;
  const type = ahead.type;

  return (
    (type === GraphParser.MultiLineComment &&
      (text.includes("\r") || text.includes("\n"))) ||
    type === GraphParser.LineTerminator
  );
};

module.exports.GraphParserBase = GraphParserBase;