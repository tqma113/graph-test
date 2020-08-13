const antlr4 = require("antlr4");
const GraphLexer = require("./GraphLexer");

function GraphLexerBase(input) {
  antlr4.Lexer.call(this, input);

  this.scopeStrictModes = new Array();
  this.lastToken = null;
  this.useStrictDefault = false;
  this.useStrictCurrent = false;
}

GraphLexerBase.prototype = Object.create(antlr4.Lexer.prototype);

GraphLexerBase.prototype.getStrictDefault = function() {
  return this.useStrictDefault;
};

GraphLexerBase.prototype.setUseStrictDefault = function(value) {
  this.useStrictDefault = value;
  this.useStrictCurrent = value;
};

GraphLexerBase.prototype.IsStrictMode = function() {
  return this.useStrictCurrent;
};

GraphLexerBase.prototype.getCurrentToken = function() {
  return antlr4.Lexer.prototype.nextToken.call(this);
};

GraphLexerBase.prototype.nextToken = function() {
  var next = antlr4.Lexer.prototype.nextToken.call(this);

  if (next.channel === antlr4.Token.DEFAULT_CHANNEL) {
    this.lastToken = next;
  }
  return next;
};

GraphLexerBase.prototype.ProcessOpenBrace = function() {
  this.useStrictCurrent =
    this.scopeStrictModes.length > 0 && this.scopeStrictModes[0] ?
    true :
    this.useStrictDefault;
  this.scopeStrictModes.push(this.useStrictCurrent);
};

GraphLexerBase.prototype.ProcessCloseBrace = function() {
  this.useStrictCurrent =
    this.scopeStrictModes.length > 0 ?
    this.scopeStrictModes.pop() :
    this.useStrictDefault;
};

GraphLexerBase.prototype.ProcessStringLiteral = function() {
  if (
    this.lastToken !== undefined &&
    (this.lastToken === null ||
      this.lastToken.type === GraphLexer.OpenBrace)
  ) {
    const text = this._input.strdata.slice(0, "use strict".length);
    if (text === '"use strict"' || text === "'use strict'") {
      if (this.scopeStrictModes.length > 0) {
        this.scopeStrictModes.pop();
      }
      this.useStrictCurrent = true;
      this.scopeStrictModes.push(this.useStrictCurrent);
    }
  }
};

GraphLexerBase.prototype.IsRegexPossible = function() {
  if (this.lastToken === null) {
    return true;
  }

  switch (this.lastToken.type) {
    case GraphLexer.Identifier:
    case GraphLexer.NullLiteral:
    case GraphLexer.BooleanLiteral:
    case GraphLexer.This:
    case GraphLexer.CloseBracket:
    case GraphLexer.CloseParen:
    case GraphLexer.OctalIntegerLiteral:
    case GraphLexer.DecimalLiteral:
    case GraphLexer.HexIntegerLiteral:
    case GraphLexer.StringLiteral:
    case GraphLexer.PlusPlus:
    case GraphLexer.MinusMinus:
      return false;
    default:
      return true;
  }
};

GraphLexerBase.prototype.IsStartOfFile = function() {
  return this.lastToken === null;
};


module.exports.GraphLexerBase = GraphLexerBase;