'use strict';

function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var antlr4 = _interopDefault(require('antlr4'));
var antlr4$1 = _interopDefault(require('antlr4'));
require('path');

function GraphLexerBase(input) {
  antlr4$1.Lexer.call(this, input);

  this.scopeStrictModes = new Array();
  this.lastToken = null;
  this.useStrictDefault = false;
  this.useStrictCurrent = false;
}

GraphLexerBase.prototype = Object.create(antlr4$1.Lexer.prototype);

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
  return antlr4$1.Lexer.prototype.nextToken.call(this);
};

GraphLexerBase.prototype.nextToken = function() {
  var next = antlr4$1.Lexer.prototype.nextToken.call(this);

  if (next.channel === antlr4$1.Token.DEFAULT_CHANNEL) {
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
      this.lastToken.type === GraphLexer_1.OpenBrace)
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
    case GraphLexer_1.Identifier:
    case GraphLexer_1.NullLiteral:
    case GraphLexer_1.BooleanLiteral:
    case GraphLexer_1.This:
    case GraphLexer_1.CloseBracket:
    case GraphLexer_1.CloseParen:
    case GraphLexer_1.OctalIntegerLiteral:
    case GraphLexer_1.DecimalLiteral:
    case GraphLexer_1.HexIntegerLiteral:
    case GraphLexer_1.StringLiteral:
    case GraphLexer_1.PlusPlus:
    case GraphLexer_1.MinusMinus:
      return false;
    default:
      return true;
  }
};

GraphLexerBase.prototype.IsStartOfFile = function() {
  return this.lastToken === null;
};


var GraphLexerBase_2 = GraphLexerBase;

var GraphLexerBase_1 = {
  GraphLexerBase: GraphLexerBase_2
};

// Generated from GraphLexer.g4 by ANTLR 4.8
// jshint ignore: start



var GraphLexerBase$1 = GraphLexerBase_1.GraphLexerBase;


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
  "\u0002\u001e\u018c\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
  "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
  "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
  "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
  "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
  "\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017",
  "\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a",
  "\u0004\u001b\t\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e",
  "\t\u001e\u0004\u001f\t\u001f\u0004 \t \u0004!\t!\u0004\"\t\"\u0004#",
  "\t#\u0004$\t$\u0004%\t%\u0004&\t&\u0004\'\t\'\u0004(\t(\u0004)\t)\u0004",
  "*\t*\u0004+\t+\u0004,\t,\u0004-\t-\u0004.\t.\u0004/\t/\u00040\t0\u0004",
  "1\t1\u00042\t2\u00043\t3\u00044\t4\u00045\t5\u00046\t6\u0003\u0002\u0003",
  "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0007\u0002s\n\u0002\f\u0002",
  "\u000e\u0002v\u000b\u0002\u0003\u0003\u0003\u0003\u0007\u0003z\n\u0003",
  "\f\u0003\u000e\u0003}\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0004",
  "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005",
  "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\b",
  "\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003",
  "\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000f",
  "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f",
  "\u0003\u000f\u0005\u000f\u00a4\n\u000f\u0003\u0010\u0003\u0010\u0003",
  "\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003",
  "\u0012\u0003\u0012\u0007\u0012\u00b0\n\u0012\f\u0012\u000e\u0012\u00b3",
  "\u000b\u0012\u0003\u0012\u0003\u0012\u0003\u0013\u0006\u0013\u00b8\n",
  "\u0013\r\u0013\u000e\u0013\u00b9\u0003\u0013\u0003\u0013\u0003\u0014",
  "\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0015",
  "\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0016\u0003\u0016",
  "\u0003\u0016\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017",
  "\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018",
  "\u0003\u0018\u0003\u0019\u0003\u0019\u0003\u0019\u0003\u0019\u0003\u0019",
  "\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a",
  "\u0003\u001a\u0003\u001a\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001b",
  "\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001c\u0003\u001c\u0003\u001c",
  "\u0003\u001c\u0003\u001c\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001d",
  "\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001e\u0003\u001e\u0007\u001e",
  "\u00fa\n\u001e\f\u001e\u000e\u001e\u00fd\u000b\u001e\u0003\u001f\u0003",
  "\u001f\u0003\u001f\u0003\u001f\u0005\u001f\u0103\n\u001f\u0003 \u0003",
  " \u0003 \u0003 \u0005 \u0109\n \u0003!\u0003!\u0003!\u0003!\u0003!\u0005",
  "!\u0110\n!\u0003\"\u0003\"\u0005\"\u0114\n\"\u0003#\u0003#\u0003#\u0003",
  "#\u0003$\u0003$\u0003$\u0003$\u0003$\u0003$\u0003$\u0003$\u0003$\u0003",
  "$\u0006$\u0124\n$\r$\u000e$\u0125\u0003$\u0003$\u0005$\u012a\n$\u0003",
  "%\u0003%\u0003%\u0006%\u012f\n%\r%\u000e%\u0130\u0003%\u0003%\u0003",
  "&\u0003&\u0003\'\u0003\'\u0003(\u0003(\u0005(\u013b\n(\u0003)\u0003",
  ")\u0003)\u0003*\u0003*\u0003+\u0003+\u0003+\u0007+\u0145\n+\f+\u000e",
  "+\u0148\u000b+\u0005+\u014a\n+\u0003,\u0003,\u0005,\u014e\n,\u0003,",
  "\u0006,\u0151\n,\r,\u000e,\u0152\u0003-\u0003-\u0003-\u0003-\u0003-",
  "\u0005-\u015a\n-\u0003.\u0003.\u0003.\u0003.\u0005.\u0160\n.\u0003/",
  "\u0005/\u0163\n/\u00030\u00050\u0166\n0\u00031\u00051\u0169\n1\u0003",
  "2\u00052\u016c\n2\u00033\u00033\u00033\u00033\u00073\u0172\n3\f3\u000e",
  "3\u0175\u000b3\u00033\u00053\u0178\n3\u00034\u00034\u00034\u00034\u0007",
  "4\u017e\n4\f4\u000e4\u0181\u000b4\u00034\u00054\u0184\n4\u00035\u0003",
  "5\u00055\u0188\n5\u00036\u00036\u00036\u0002\u00027\u0003\u0003\u0005",
  "\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013\u000b",
  "\u0015\f\u0017\r\u0019\u000e\u001b\u000f\u001d\u0002\u001f\u0010!\u0011",
  "#\u0012%\u0013\'\u0014)\u0015+\u0016-\u0017/\u00181\u00193\u001a5\u001b",
  "7\u001c9\u001d;\u001e=\u0002?\u0002A\u0002C\u0002E\u0002G\u0002I\u0002",
  "K\u0002M\u0002O\u0002Q\u0002S\u0002U\u0002W\u0002Y\u0002[\u0002]\u0002",
  "_\u0002a\u0002c\u0002e\u0002g\u0002i\u0002k\u0002\u0003\u0002\u0016",
  "\u0005\u0002\f\f\u000f\u000f\u202a\u202b\u0004\u0002&&aa\u0006\u0002",
  "\u000b\u000b\r\u000e\"\"\u00a2\u00a2\u0006\u0002\f\f\u000f\u000f$$^",
  "^\u0006\u0002\f\f\u000f\u000f))^^\u000b\u0002$$))^^ddhhppttvvxx\u000e",
  "\u0002\f\f\u000f\u000f$$))2;^^ddhhppttvxzz\u0005\u00022;wwzz\u0006\u0002",
  "2;CHaach\u0003\u00023;\u0004\u00022;aa\u0004\u0002GGgg\u0004\u0002-",
  "-//\u0101\u0002C\\c|\u00ac\u00ac\u00b7\u00b7\u00bc\u00bc\u00c2\u00d8",
  "\u00da\u00f8\u00fa\u0221\u0224\u0235\u0252\u02af\u02b2\u02ba\u02bd\u02c3",
  "\u02d2\u02d3\u02e2\u02e6\u02f0\u02f0\u037c\u037c\u0388\u0388\u038a\u038c",
  "\u038e\u038e\u0390\u03a3\u03a5\u03d0\u03d2\u03d9\u03dc\u03f5\u0402\u0483",
  "\u048e\u04c6\u04c9\u04ca\u04cd\u04ce\u04d2\u04f7\u04fa\u04fb\u0533\u0558",
  "\u055b\u055b\u0563\u0589\u05d2\u05ec\u05f2\u05f4\u0623\u063c\u0642\u064c",
  "\u0673\u06d5\u06d7\u06d7\u06e7\u06e8\u06fc\u06fe\u0712\u0712\u0714\u072e",
  "\u0782\u07a7\u0907\u093b\u093f\u093f\u0952\u0952\u095a\u0963\u0987\u098e",
  "\u0991\u0992\u0995\u09aa\u09ac\u09b2\u09b4\u09b4\u09b8\u09bb\u09de\u09df",
  "\u09e1\u09e3\u09f2\u09f3\u0a07\u0a0c\u0a11\u0a12\u0a15\u0a2a\u0a2c\u0a32",
  "\u0a34\u0a35\u0a37\u0a38\u0a3a\u0a3b\u0a5b\u0a5e\u0a60\u0a60\u0a74\u0a76",
  "\u0a87\u0a8d\u0a8f\u0a8f\u0a91\u0a93\u0a95\u0aaa\u0aac\u0ab2\u0ab4\u0ab5",
  "\u0ab7\u0abb\u0abf\u0abf\u0ad2\u0ad2\u0ae2\u0ae2\u0b07\u0b0e\u0b11\u0b12",
  "\u0b15\u0b2a\u0b2c\u0b32\u0b34\u0b35\u0b38\u0b3b\u0b3f\u0b3f\u0b5e\u0b5f",
  "\u0b61\u0b63\u0b87\u0b8c\u0b90\u0b92\u0b94\u0b97\u0b9b\u0b9c\u0b9e\u0b9e",
  "\u0ba0\u0ba1\u0ba5\u0ba6\u0baa\u0bac\u0bb0\u0bb7\u0bb9\u0bbb\u0c07\u0c0e",
  "\u0c10\u0c12\u0c14\u0c2a\u0c2c\u0c35\u0c37\u0c3b\u0c62\u0c63\u0c87\u0c8e",
  "\u0c90\u0c92\u0c94\u0caa\u0cac\u0cb5\u0cb7\u0cbb\u0ce0\u0ce0\u0ce2\u0ce3",
  "\u0d07\u0d0e\u0d10\u0d12\u0d14\u0d2a\u0d2c\u0d3b\u0d62\u0d63\u0d87\u0d98",
  "\u0d9c\u0db3\u0db5\u0dbd\u0dbf\u0dbf\u0dc2\u0dc8\u0e03\u0e32\u0e34\u0e35",
  "\u0e42\u0e48\u0e83\u0e84\u0e86\u0e86\u0e89\u0e8a\u0e8c\u0e8c\u0e8f\u0e8f",
  "\u0e96\u0e99\u0e9b\u0ea1\u0ea3\u0ea5\u0ea7\u0ea7\u0ea9\u0ea9\u0eac\u0ead",
  "\u0eaf\u0eb2\u0eb4\u0eb5\u0ebf\u0ec6\u0ec8\u0ec8\u0ede\u0edf\u0f02\u0f02",
  "\u0f42\u0f6c\u0f8a\u0f8d\u1002\u1023\u1025\u1029\u102b\u102c\u1052\u1057",
  "\u10a2\u10c7\u10d2\u10f8\u1102\u115b\u1161\u11a4\u11aa\u11fb\u1202\u1208",
  "\u120a\u1248\u124a\u124a\u124c\u124f\u1252\u1258\u125a\u125a\u125c\u125f",
  "\u1262\u1288\u128a\u128a\u128c\u128f\u1292\u12b0\u12b2\u12b2\u12b4\u12b7",
  "\u12ba\u12c0\u12c2\u12c2\u12c4\u12c7\u12ca\u12d0\u12d2\u12d8\u12da\u12f0",
  "\u12f2\u1310\u1312\u1312\u1314\u1317\u131a\u1320\u1322\u1348\u134a\u135c",
  "\u13a2\u13f6\u1403\u1678\u1683\u169c\u16a2\u16ec\u1782\u17b5\u1822\u1879",
  "\u1882\u18aa\u1e02\u1e9d\u1ea2\u1efb\u1f02\u1f17\u1f1a\u1f1f\u1f22\u1f47",
  "\u1f4a\u1f4f\u1f52\u1f59\u1f5b\u1f5b\u1f5d\u1f5d\u1f5f\u1f5f\u1f61\u1f7f",
  "\u1f82\u1fb6\u1fb8\u1fbe\u1fc0\u1fc0\u1fc4\u1fc6\u1fc8\u1fce\u1fd2\u1fd5",
  "\u1fd8\u1fdd\u1fe2\u1fee\u1ff4\u1ff6\u1ff8\u1ffe\u2081\u2081\u2104\u2104",
  "\u2109\u2109\u210c\u2115\u2117\u2117\u211b\u211f\u2126\u2126\u2128\u2128",
  "\u212a\u212a\u212c\u212f\u2131\u2133\u2135\u213b\u2162\u2185\u3007\u3009",
  "\u3023\u302b\u3033\u3037\u303a\u303c\u3043\u3096\u309f\u30a0\u30a3\u30fc",
  "\u30fe\u3100\u3107\u312e\u3133\u3190\u31a2\u31b9\u3402\u4dc1\u4e02\ua48e",
  "\uac02\uac02\ud7a5\ud7a5\uf902\ufa2f\ufb02\ufb08\ufb15\ufb19\ufb1f\ufb1f",
  "\ufb21\ufb2a\ufb2c\ufb38\ufb3a\ufb3e\ufb40\ufb40\ufb42\ufb43\ufb45\ufb46",
  "\ufb48\ufbb3\ufbd5\ufd3f\ufd52\ufd91\ufd94\ufdc9\ufdf2\ufdfd\ufe72\ufe74",
  "\ufe76\ufe76\ufe78\ufefe\uff23\uff3c\uff43\uff5c\uff68\uffc0\uffc4\uffc9",
  "\uffcc\uffd1\uffd4\uffd9\uffdc\uffdef\u0002\u0302\u0350\u0362\u0364",
  "\u0485\u0488\u0593\u05a3\u05a5\u05bb\u05bd\u05bf\u05c1\u05c1\u05c3\u05c4",
  "\u05c6\u05c6\u064d\u0657\u0672\u0672\u06d8\u06de\u06e1\u06e6\u06e9\u06ea",
  "\u06ec\u06ef\u0713\u0713\u0732\u074c\u07a8\u07b2\u0903\u0905\u093e\u093e",
  "\u0940\u094f\u0953\u0956\u0964\u0965\u0983\u0985\u09be\u09c6\u09c9\u09ca",
  "\u09cd\u09cf\u09d9\u09d9\u09e4\u09e5\u0a04\u0a04\u0a3e\u0a3e\u0a40\u0a44",
  "\u0a49\u0a4a\u0a4d\u0a4f\u0a72\u0a73\u0a83\u0a85\u0abe\u0abe\u0ac0\u0ac7",
  "\u0ac9\u0acb\u0acd\u0acf\u0b03\u0b05\u0b3e\u0b3e\u0b40\u0b45\u0b49\u0b4a",
  "\u0b4d\u0b4f\u0b58\u0b59\u0b84\u0b85\u0bc0\u0bc4\u0bc8\u0bca\u0bcc\u0bcf",
  "\u0bd9\u0bd9\u0c03\u0c05\u0c40\u0c46\u0c48\u0c4a\u0c4c\u0c4f\u0c57\u0c58",
  "\u0c84\u0c85\u0cc0\u0cc6\u0cc8\u0cca\u0ccc\u0ccf\u0cd7\u0cd8\u0d04\u0d05",
  "\u0d40\u0d45\u0d48\u0d4a\u0d4c\u0d4f\u0d59\u0d59\u0d84\u0d85\u0dcc\u0dcc",
  "\u0dd1\u0dd6\u0dd8\u0dd8\u0dda\u0de1\u0df4\u0df5\u0e33\u0e33\u0e36\u0e3c",
  "\u0e49\u0e50\u0eb3\u0eb3\u0eb6\u0ebb\u0ebd\u0ebe\u0eca\u0ecf\u0f1a\u0f1b",
  "\u0f37\u0f37\u0f39\u0f39\u0f3b\u0f3b\u0f40\u0f41\u0f73\u0f86\u0f88\u0f89",
  "\u0f92\u0f99\u0f9b\u0fbe\u0fc8\u0fc8\u102e\u1034\u1038\u103b\u1058\u105b",
  "\u17b6\u17d5\u18ab\u18ab\u20d2\u20de\u20e3\u20e3\u302c\u3031\u309b\u309c",
  "\ufb20\ufb20\ufe22\ufe25\u0016\u00022;\u0662\u066b\u06f2\u06fb\u0968",
  "\u0971\u09e8\u09f1\u0a68\u0a71\u0ae8\u0af1\u0b68\u0b71\u0be9\u0bf1\u0c68",
  "\u0c71\u0ce8\u0cf1\u0d68\u0d71\u0e52\u0e5b\u0ed2\u0edb\u0f22\u0f2b\u1042",
  "\u104b\u136b\u1373\u17e2\u17eb\u1812\u181b\uff12\uff1b\t\u0002aa\u2041",
  "\u2042\u30fd\u30fd\ufe35\ufe36\ufe4f\ufe51\uff41\uff41\uff67\uff67\b",
  "\u0002\f\f\u000f\u000f,,11]^\u202a\u202b\u0007\u0002\f\f\u000f\u000f",
  "11]^\u202a\u202b\u0006\u0002\f\f\u000f\u000f^_\u202a\u202b\u0002\u019b",
  "\u0002\u0003\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002",
  "\u0002\u0007\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002",
  "\u0002\u000b\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002",
  "\u0002\u000f\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002",
  "\u0002\u0013\u0003\u0002\u0002\u0002\u0002\u0015\u0003\u0002\u0002\u0002",
  "\u0002\u0017\u0003\u0002\u0002\u0002\u0002\u0019\u0003\u0002\u0002\u0002",
  "\u0002\u001b\u0003\u0002\u0002\u0002\u0002\u001f\u0003\u0002\u0002\u0002",
  "\u0002!\u0003\u0002\u0002\u0002\u0002#\u0003\u0002\u0002\u0002\u0002",
  "%\u0003\u0002\u0002\u0002\u0002\'\u0003\u0002\u0002\u0002\u0002)\u0003",
  "\u0002\u0002\u0002\u0002+\u0003\u0002\u0002\u0002\u0002-\u0003\u0002",
  "\u0002\u0002\u0002/\u0003\u0002\u0002\u0002\u00021\u0003\u0002\u0002",
  "\u0002\u00023\u0003\u0002\u0002\u0002\u00025\u0003\u0002\u0002\u0002",
  "\u00027\u0003\u0002\u0002\u0002\u00029\u0003\u0002\u0002\u0002\u0002",
  ";\u0003\u0002\u0002\u0002\u0003m\u0003\u0002\u0002\u0002\u0005w\u0003",
  "\u0002\u0002\u0002\u0007\u0080\u0003\u0002\u0002\u0002\t\u0084\u0003",
  "\u0002\u0002\u0002\u000b\u0087\u0003\u0002\u0002\u0002\r\u008a\u0003",
  "\u0002\u0002\u0002\u000f\u008c\u0003\u0002\u0002\u0002\u0011\u008e\u0003",
  "\u0002\u0002\u0002\u0013\u0090\u0003\u0002\u0002\u0002\u0015\u0092\u0003",
  "\u0002\u0002\u0002\u0017\u0094\u0003\u0002\u0002\u0002\u0019\u0097\u0003",
  "\u0002\u0002\u0002\u001b\u0099\u0003\u0002\u0002\u0002\u001d\u00a3\u0003",
  "\u0002\u0002\u0002\u001f\u00a5\u0003\u0002\u0002\u0002!\u00a9\u0003",
  "\u0002\u0002\u0002#\u00ad\u0003\u0002\u0002\u0002%\u00b7\u0003\u0002",
  "\u0002\u0002\'\u00bd\u0003\u0002\u0002\u0002)\u00c3\u0003\u0002\u0002",
  "\u0002+\u00c8\u0003\u0002\u0002\u0002-\u00cb\u0003\u0002\u0002\u0002",
  "/\u00d0\u0003\u0002\u0002\u00021\u00d7\u0003\u0002\u0002\u00023\u00dc",
  "\u0003\u0002\u0002\u00025\u00e4\u0003\u0002\u0002\u00027\u00eb\u0003",
  "\u0002\u0002\u00029\u00f0\u0003\u0002\u0002\u0002;\u00f7\u0003\u0002",
  "\u0002\u0002=\u0102\u0003\u0002\u0002\u0002?\u0108\u0003\u0002\u0002",
  "\u0002A\u010f\u0003\u0002\u0002\u0002C\u0113\u0003\u0002\u0002\u0002",
  "E\u0115\u0003\u0002\u0002\u0002G\u0129\u0003\u0002\u0002\u0002I\u012b",
  "\u0003\u0002\u0002\u0002K\u0134\u0003\u0002\u0002\u0002M\u0136\u0003",
  "\u0002\u0002\u0002O\u013a\u0003\u0002\u0002\u0002Q\u013c\u0003\u0002",
  "\u0002\u0002S\u013f\u0003\u0002\u0002\u0002U\u0149\u0003\u0002\u0002",
  "\u0002W\u014b\u0003\u0002\u0002\u0002Y\u0159\u0003\u0002\u0002\u0002",
  "[\u015f\u0003\u0002\u0002\u0002]\u0162\u0003\u0002\u0002\u0002_\u0165",
  "\u0003\u0002\u0002\u0002a\u0168\u0003\u0002\u0002\u0002c\u016b\u0003",
  "\u0002\u0002\u0002e\u0177\u0003\u0002\u0002\u0002g\u0183\u0003\u0002",
  "\u0002\u0002i\u0187\u0003\u0002\u0002\u0002k\u0189\u0003\u0002\u0002",
  "\u0002mn\u0006\u0002\u0002\u0002no\u0007%\u0002\u0002op\u0007#\u0002",
  "\u0002pt\u0003\u0002\u0002\u0002qs\n\u0002\u0002\u0002rq\u0003\u0002",
  "\u0002\u0002sv\u0003\u0002\u0002\u0002tr\u0003\u0002\u0002\u0002tu\u0003",
  "\u0002\u0002\u0002u\u0004\u0003\u0002\u0002\u0002vt\u0003\u0002\u0002",
  "\u0002w{\u0007%\u0002\u0002xz\n\u0002\u0002\u0002yx\u0003\u0002\u0002",
  "\u0002z}\u0003\u0002\u0002\u0002{y\u0003\u0002\u0002\u0002{|\u0003\u0002",
  "\u0002\u0002|~\u0003\u0002\u0002\u0002}{\u0003\u0002\u0002\u0002~\u007f",
  "\b\u0003\u0002\u0002\u007f\u0006\u0003\u0002\u0002\u0002\u0080\u0081",
  "\t\u0002\u0002\u0002\u0081\u0082\u0003\u0002\u0002\u0002\u0082\u0083",
  "\b\u0004\u0002\u0002\u0083\b\u0003\u0002\u0002\u0002\u0084\u0085\u0007",
  "}\u0002\u0002\u0085\u0086\b\u0005\u0003\u0002\u0086\n\u0003\u0002\u0002",
  "\u0002\u0087\u0088\u0007\u007f\u0002\u0002\u0088\u0089\b\u0006\u0004",
  "\u0002\u0089\f\u0003\u0002\u0002\u0002\u008a\u008b\u0007]\u0002\u0002",
  "\u008b\u000e\u0003\u0002\u0002\u0002\u008c\u008d\u0007_\u0002\u0002",
  "\u008d\u0010\u0003\u0002\u0002\u0002\u008e\u008f\u0007>\u0002\u0002",
  "\u008f\u0012\u0003\u0002\u0002\u0002\u0090\u0091\u0007@\u0002\u0002",
  "\u0091\u0014\u0003\u0002\u0002\u0002\u0092\u0093\u0007?\u0002\u0002",
  "\u0093\u0016\u0003\u0002\u0002\u0002\u0094\u0095\u0007/\u0002\u0002",
  "\u0095\u0096\u0007@\u0002\u0002\u0096\u0018\u0003\u0002\u0002\u0002",
  "\u0097\u0098\u0007.\u0002\u0002\u0098\u001a\u0003\u0002\u0002\u0002",
  "\u0099\u009a\u0007=\u0002\u0002\u009a\u001c\u0003\u0002\u0002\u0002",
  "\u009b\u00a4\u0005]/\u0002\u009c\u00a4\u0005_0\u0002\u009d\u00a4\u0005",
  "c2\u0002\u009e\u00a4\t\u0003\u0002\u0002\u009f\u00a0\u0007^\u0002\u0002",
  "\u00a0\u00a4\u0005G$\u0002\u00a1\u00a4\u0005a1\u0002\u00a2\u00a4\u0004",
  "\u200e\u200f\u0002\u00a3\u009b\u0003\u0002\u0002\u0002\u00a3\u009c\u0003",
  "\u0002\u0002\u0002\u00a3\u009d\u0003\u0002\u0002\u0002\u00a3\u009e\u0003",
  "\u0002\u0002\u0002\u00a3\u009f\u0003\u0002\u0002\u0002\u00a3\u00a1\u0003",
  "\u0002\u0002\u0002\u00a3\u00a2\u0003\u0002\u0002\u0002\u00a4\u001e\u0003",
  "\u0002\u0002\u0002\u00a5\u00a6\u0007>\u0002\u0002\u00a6\u00a7\u0005",
  ";\u001e\u0002\u00a7\u00a8\u0007@\u0002\u0002\u00a8 \u0003\u0002\u0002",
  "\u0002\u00a9\u00aa\u0007]\u0002\u0002\u00aa\u00ab\u0005;\u001e\u0002",
  "\u00ab\u00ac\u0007_\u0002\u0002\u00ac\"\u0003\u0002\u0002\u0002\u00ad",
  "\u00b1\u0007$\u0002\u0002\u00ae\u00b0\u0005=\u001f\u0002\u00af\u00ae",
  "\u0003\u0002\u0002\u0002\u00b0\u00b3\u0003\u0002\u0002\u0002\u00b1\u00af",
  "\u0003\u0002\u0002\u0002\u00b1\u00b2\u0003\u0002\u0002\u0002\u00b2\u00b4",
  "\u0003\u0002\u0002\u0002\u00b3\u00b1\u0003\u0002\u0002\u0002\u00b4\u00b5",
  "\u0007$\u0002\u0002\u00b5$\u0003\u0002\u0002\u0002\u00b6\u00b8\t\u0004",
  "\u0002\u0002\u00b7\u00b6\u0003\u0002\u0002\u0002\u00b8\u00b9\u0003\u0002",
  "\u0002\u0002\u00b9\u00b7\u0003\u0002\u0002\u0002\u00b9\u00ba\u0003\u0002",
  "\u0002\u0002\u00ba\u00bb\u0003\u0002\u0002\u0002\u00bb\u00bc\b\u0013",
  "\u0002\u0002\u00bc&\u0003\u0002\u0002\u0002\u00bd\u00be\u0007u\u0002",
  "\u0002\u00be\u00bf\u0007v\u0002\u0002\u00bf\u00c0\u0007c\u0002\u0002",
  "\u00c0\u00c1\u0007t\u0002\u0002\u00c1\u00c2\u0007v\u0002\u0002\u00c2",
  "(\u0003\u0002\u0002\u0002\u00c3\u00c4\u0007i\u0002\u0002\u00c4\u00c5",
  "\u0007q\u0002\u0002\u00c5\u00c6\u0007v\u0002\u0002\u00c6\u00c7\u0007",
  "q\u0002\u0002\u00c7*\u0003\u0002\u0002\u0002\u00c8\u00c9\u0007k\u0002",
  "\u0002\u00c9\u00ca\u0007h\u0002\u0002\u00ca,\u0003\u0002\u0002\u0002",
  "\u00cb\u00cc\u0007g\u0002\u0002\u00cc\u00cd\u0007n\u0002\u0002\u00cd",
  "\u00ce\u0007u\u0002\u0002\u00ce\u00cf\u0007g\u0002\u0002\u00cf.\u0003",
  "\u0002\u0002\u0002\u00d0\u00d1\u0007u\u0002\u0002\u00d1\u00d2\u0007",
  "y\u0002\u0002\u00d2\u00d3\u0007k\u0002\u0002\u00d3\u00d4\u0007v\u0002",
  "\u0002\u00d4\u00d5\u0007e\u0002\u0002\u00d5\u00d6\u0007j\u0002\u0002",
  "\u00d60\u0003\u0002\u0002\u0002\u00d7\u00d8\u0007e\u0002\u0002\u00d8",
  "\u00d9\u0007c\u0002\u0002\u00d9\u00da\u0007u\u0002\u0002\u00da\u00db",
  "\u0007g\u0002\u0002\u00db2\u0003\u0002\u0002\u0002\u00dc\u00dd\u0007",
  "f\u0002\u0002\u00dd\u00de\u0007g\u0002\u0002\u00de\u00df\u0007h\u0002",
  "\u0002\u00df\u00e0\u0007c\u0002\u0002\u00e0\u00e1\u0007w\u0002\u0002",
  "\u00e1\u00e2\u0007n\u0002\u0002\u00e2\u00e3\u0007v\u0002\u0002\u00e3",
  "4\u0003\u0002\u0002\u0002\u00e4\u00e5\u0007k\u0002\u0002\u00e5\u00e6",
  "\u0007o\u0002\u0002\u00e6\u00e7\u0007r\u0002\u0002\u00e7\u00e8\u0007",
  "q\u0002\u0002\u00e8\u00e9\u0007t\u0002\u0002\u00e9\u00ea\u0007v\u0002",
  "\u0002\u00ea6\u0003\u0002\u0002\u0002\u00eb\u00ec\u0007h\u0002\u0002",
  "\u00ec\u00ed\u0007t\u0002\u0002\u00ed\u00ee\u0007q\u0002\u0002\u00ee",
  "\u00ef\u0007o\u0002\u0002\u00ef8\u0003\u0002\u0002\u0002\u00f0\u00f1",
  "\u0007g\u0002\u0002\u00f1\u00f2\u0007z\u0002\u0002\u00f2\u00f3\u0007",
  "r\u0002\u0002\u00f3\u00f4\u0007q\u0002\u0002\u00f4\u00f5\u0007t\u0002",
  "\u0002\u00f5\u00f6\u0007v\u0002\u0002\u00f6:\u0003\u0002\u0002\u0002",
  "\u00f7\u00fb\u0005\u001d\u000f\u0002\u00f8\u00fa\u0005\u001d\u000f\u0002",
  "\u00f9\u00f8\u0003\u0002\u0002\u0002\u00fa\u00fd\u0003\u0002\u0002\u0002",
  "\u00fb\u00f9\u0003\u0002\u0002\u0002\u00fb\u00fc\u0003\u0002\u0002\u0002",
  "\u00fc<\u0003\u0002\u0002\u0002\u00fd\u00fb\u0003\u0002\u0002\u0002",
  "\u00fe\u0103\n\u0005\u0002\u0002\u00ff\u0100\u0007^\u0002\u0002\u0100",
  "\u0103\u0005A!\u0002\u0101\u0103\u0005Q)\u0002\u0102\u00fe\u0003\u0002",
  "\u0002\u0002\u0102\u00ff\u0003\u0002\u0002\u0002\u0102\u0101\u0003\u0002",
  "\u0002\u0002\u0103>\u0003\u0002\u0002\u0002\u0104\u0109\n\u0006\u0002",
  "\u0002\u0105\u0106\u0007^\u0002\u0002\u0106\u0109\u0005A!\u0002\u0107",
  "\u0109\u0005Q)\u0002\u0108\u0104\u0003\u0002\u0002\u0002\u0108\u0105",
  "\u0003\u0002\u0002\u0002\u0108\u0107\u0003\u0002\u0002\u0002\u0109@",
  "\u0003\u0002\u0002\u0002\u010a\u0110\u0005C\"\u0002\u010b\u0110\u0007",
  "2\u0002\u0002\u010c\u0110\u0005E#\u0002\u010d\u0110\u0005G$\u0002\u010e",
  "\u0110\u0005I%\u0002\u010f\u010a\u0003\u0002\u0002\u0002\u010f\u010b",
  "\u0003\u0002\u0002\u0002\u010f\u010c\u0003\u0002\u0002\u0002\u010f\u010d",
  "\u0003\u0002\u0002\u0002\u010f\u010e\u0003\u0002\u0002\u0002\u0110B",
  "\u0003\u0002\u0002\u0002\u0111\u0114\u0005K&\u0002\u0112\u0114\u0005",
  "M\'\u0002\u0113\u0111\u0003\u0002\u0002\u0002\u0113\u0112\u0003\u0002",
  "\u0002\u0002\u0114D\u0003\u0002\u0002\u0002\u0115\u0116\u0007z\u0002",
  "\u0002\u0116\u0117\u0005S*\u0002\u0117\u0118\u0005S*\u0002\u0118F\u0003",
  "\u0002\u0002\u0002\u0119\u011a\u0007w\u0002\u0002\u011a\u011b\u0005",
  "S*\u0002\u011b\u011c\u0005S*\u0002\u011c\u011d\u0005S*\u0002\u011d\u011e",
  "\u0005S*\u0002\u011e\u012a\u0003\u0002\u0002\u0002\u011f\u0120\u0007",
  "w\u0002\u0002\u0120\u0121\u0007}\u0002\u0002\u0121\u0123\u0005S*\u0002",
  "\u0122\u0124\u0005S*\u0002\u0123\u0122\u0003\u0002\u0002\u0002\u0124",
  "\u0125\u0003\u0002\u0002\u0002\u0125\u0123\u0003\u0002\u0002\u0002\u0125",
  "\u0126\u0003\u0002\u0002\u0002\u0126\u0127\u0003\u0002\u0002\u0002\u0127",
  "\u0128\u0007\u007f\u0002\u0002\u0128\u012a\u0003\u0002\u0002\u0002\u0129",
  "\u0119\u0003\u0002\u0002\u0002\u0129\u011f\u0003\u0002\u0002\u0002\u012a",
  "H\u0003\u0002\u0002\u0002\u012b\u012c\u0007w\u0002\u0002\u012c\u012e",
  "\u0007}\u0002\u0002\u012d\u012f\u0005S*\u0002\u012e\u012d\u0003\u0002",
  "\u0002\u0002\u012f\u0130\u0003\u0002\u0002\u0002\u0130\u012e\u0003\u0002",
  "\u0002\u0002\u0130\u0131\u0003\u0002\u0002\u0002\u0131\u0132\u0003\u0002",
  "\u0002\u0002\u0132\u0133\u0007\u007f\u0002\u0002\u0133J\u0003\u0002",
  "\u0002\u0002\u0134\u0135\t\u0007\u0002\u0002\u0135L\u0003\u0002\u0002",
  "\u0002\u0136\u0137\n\b\u0002\u0002\u0137N\u0003\u0002\u0002\u0002\u0138",
  "\u013b\u0005K&\u0002\u0139\u013b\t\t\u0002\u0002\u013a\u0138\u0003\u0002",
  "\u0002\u0002\u013a\u0139\u0003\u0002\u0002\u0002\u013bP\u0003\u0002",
  "\u0002\u0002\u013c\u013d\u0007^\u0002\u0002\u013d\u013e\t\u0002\u0002",
  "\u0002\u013eR\u0003\u0002\u0002\u0002\u013f\u0140\t\n\u0002\u0002\u0140",
  "T\u0003\u0002\u0002\u0002\u0141\u014a\u00072\u0002\u0002\u0142\u0146",
  "\t\u000b\u0002\u0002\u0143\u0145\t\f\u0002\u0002\u0144\u0143\u0003\u0002",
  "\u0002\u0002\u0145\u0148\u0003\u0002\u0002\u0002\u0146\u0144\u0003\u0002",
  "\u0002\u0002\u0146\u0147\u0003\u0002\u0002\u0002\u0147\u014a\u0003\u0002",
  "\u0002\u0002\u0148\u0146\u0003\u0002\u0002\u0002\u0149\u0141\u0003\u0002",
  "\u0002\u0002\u0149\u0142\u0003\u0002\u0002\u0002\u014aV\u0003\u0002",
  "\u0002\u0002\u014b\u014d\t\r\u0002\u0002\u014c\u014e\t\u000e\u0002\u0002",
  "\u014d\u014c\u0003\u0002\u0002\u0002\u014d\u014e\u0003\u0002\u0002\u0002",
  "\u014e\u0150\u0003\u0002\u0002\u0002\u014f\u0151\t\f\u0002\u0002\u0150",
  "\u014f\u0003\u0002\u0002\u0002\u0151\u0152\u0003\u0002\u0002\u0002\u0152",
  "\u0150\u0003\u0002\u0002\u0002\u0152\u0153\u0003\u0002\u0002\u0002\u0153",
  "X\u0003\u0002\u0002\u0002\u0154\u015a\u0005[.\u0002\u0155\u015a\u0005",
  "_0\u0002\u0156\u015a\u0005a1\u0002\u0157\u015a\u0005c2\u0002\u0158\u015a",
  "\u0004\u200e\u200f\u0002\u0159\u0154\u0003\u0002\u0002\u0002\u0159\u0155",
  "\u0003\u0002\u0002\u0002\u0159\u0156\u0003\u0002\u0002\u0002\u0159\u0157",
  "\u0003\u0002\u0002\u0002\u0159\u0158\u0003\u0002\u0002\u0002\u015aZ",
  "\u0003\u0002\u0002\u0002\u015b\u0160\u0005]/\u0002\u015c\u0160\t\u0003",
  "\u0002\u0002\u015d\u015e\u0007^\u0002\u0002\u015e\u0160\u0005G$\u0002",
  "\u015f\u015b\u0003\u0002\u0002\u0002\u015f\u015c\u0003\u0002\u0002\u0002",
  "\u015f\u015d\u0003\u0002\u0002\u0002\u0160\\\u0003\u0002\u0002\u0002",
  "\u0161\u0163\t\u000f\u0002\u0002\u0162\u0161\u0003\u0002\u0002\u0002",
  "\u0163^\u0003\u0002\u0002\u0002\u0164\u0166\t\u0010\u0002\u0002\u0165",
  "\u0164\u0003\u0002\u0002\u0002\u0166`\u0003\u0002\u0002\u0002\u0167",
  "\u0169\t\u0011\u0002\u0002\u0168\u0167\u0003\u0002\u0002\u0002\u0169",
  "b\u0003\u0002\u0002\u0002\u016a\u016c\t\u0012\u0002\u0002\u016b\u016a",
  "\u0003\u0002\u0002\u0002\u016cd\u0003\u0002\u0002\u0002\u016d\u0178",
  "\n\u0013\u0002\u0002\u016e\u0178\u0005k6\u0002\u016f\u0173\u0007]\u0002",
  "\u0002\u0170\u0172\u0005i5\u0002\u0171\u0170\u0003\u0002\u0002\u0002",
  "\u0172\u0175\u0003\u0002\u0002\u0002\u0173\u0171\u0003\u0002\u0002\u0002",
  "\u0173\u0174\u0003\u0002\u0002\u0002\u0174\u0176\u0003\u0002\u0002\u0002",
  "\u0175\u0173\u0003\u0002\u0002\u0002\u0176\u0178\u0007_\u0002\u0002",
  "\u0177\u016d\u0003\u0002\u0002\u0002\u0177\u016e\u0003\u0002\u0002\u0002",
  "\u0177\u016f\u0003\u0002\u0002\u0002\u0178f\u0003\u0002\u0002\u0002",
  "\u0179\u0184\n\u0014\u0002\u0002\u017a\u0184\u0005k6\u0002\u017b\u017f",
  "\u0007]\u0002\u0002\u017c\u017e\u0005i5\u0002\u017d\u017c\u0003\u0002",
  "\u0002\u0002\u017e\u0181\u0003\u0002\u0002\u0002\u017f\u017d\u0003\u0002",
  "\u0002\u0002\u017f\u0180\u0003\u0002\u0002\u0002\u0180\u0182\u0003\u0002",
  "\u0002\u0002\u0181\u017f\u0003\u0002\u0002\u0002\u0182\u0184\u0007_",
  "\u0002\u0002\u0183\u0179\u0003\u0002\u0002\u0002\u0183\u017a\u0003\u0002",
  "\u0002\u0002\u0183\u017b\u0003\u0002\u0002\u0002\u0184h\u0003\u0002",
  "\u0002\u0002\u0185\u0188\n\u0015\u0002\u0002\u0186\u0188\u0005k6\u0002",
  "\u0187\u0185\u0003\u0002\u0002\u0002\u0187\u0186\u0003\u0002\u0002\u0002",
  "\u0188j\u0003\u0002\u0002\u0002\u0189\u018a\u0007^\u0002\u0002\u018a",
  "\u018b\n\u0002\u0002\u0002\u018bl\u0003\u0002\u0002\u0002 \u0002t{\u00a3",
  "\u00b1\u00b9\u00fb\u0102\u0108\u010f\u0113\u0125\u0129\u0130\u013a\u0146",
  "\u0149\u014d\u0152\u0159\u015f\u0162\u0165\u0168\u016b\u0173\u0177\u017f",
  "\u0183\u0187\u0005\u0002\u0003\u0002\u0003\u0005\u0002\u0003\u0006\u0003"
].join("");


var atn = new antlr4$1.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map(function(ds, index) { return new antlr4$1.dfa.DFA(ds, index); });

function GraphLexer(input) {
  GraphLexerBase$1.call(this, input);
  this._interp = new antlr4$1.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4$1.PredictionContextCache());
  return this;
}

GraphLexer.prototype = Object.create(GraphLexerBase$1.prototype);
GraphLexer.prototype.constructor = GraphLexer;

Object.defineProperty(GraphLexer.prototype, "atn", {
  get: function() {
    return atn;
  }
});

GraphLexer.EOF = antlr4$1.Token.EOF;
GraphLexer.HashBangLine = 1;
GraphLexer.SingleLineComment = 2;
GraphLexer.LineTerminator = 3;
GraphLexer.OpenBrace = 4;
GraphLexer.CloseBrace = 5;
GraphLexer.OpenBracket = 6;
GraphLexer.CloseBracket = 7;
GraphLexer.OpenAngleBracket = 8;
GraphLexer.CloseAngleBracket = 9;
GraphLexer.Assign = 10;
GraphLexer.Result = 11;
GraphLexer.Comma = 12;
GraphLexer.SemiColon = 13;
GraphLexer.Identifier = 14;
GraphLexer.Action = 15;
GraphLexer.Path = 16;
GraphLexer.WhiteSpaces = 17;
GraphLexer.Start = 18;
GraphLexer.Goto = 19;
GraphLexer.If = 20;
GraphLexer.Else = 21;
GraphLexer.Switch = 22;
GraphLexer.Case = 23;
GraphLexer.Default = 24;
GraphLexer.Import = 25;
GraphLexer.From = 26;
GraphLexer.Export = 27;
GraphLexer.String = 28;

GraphLexer.ERROR = 2;

GraphLexer.prototype.channelNames = ["DEFAULT_TOKEN_CHANNEL", "HIDDEN",
  "ERROR"
];

GraphLexer.prototype.modeNames = ["DEFAULT_MODE"];

GraphLexer.prototype.literalNames = [null, null, null, null, "'{'", "'}'",
  "'['", "']'", "'<'", "'>'", "'='",
  "'->'", "','", "';'", null, null,
  null, null, "'start'", "'goto'", "'if'",
  "'else'", "'switch'", "'case'", "'default'",
  "'import'", "'from'", "'export'"
];

GraphLexer.prototype.symbolicNames = [null, "HashBangLine", "SingleLineComment",
  "LineTerminator", "OpenBrace", "CloseBrace",
  "OpenBracket", "CloseBracket", "OpenAngleBracket",
  "CloseAngleBracket", "Assign", "Result",
  "Comma", "SemiColon", "Identifier",
  "Action", "Path", "WhiteSpaces",
  "Start", "Goto", "If", "Else", "Switch",
  "Case", "Default", "Import", "From",
  "Export", "String"
];

GraphLexer.prototype.ruleNames = ["HashBangLine", "SingleLineComment",
  "LineTerminator", "OpenBrace", "CloseBrace",
  "OpenBracket", "CloseBracket", "OpenAngleBracket",
  "CloseAngleBracket", "Assign", "Result",
  "Comma", "SemiColon", "StringPart", "Identifier",
  "Action", "Path", "WhiteSpaces", "Start",
  "Goto", "If", "Else", "Switch", "Case",
  "Default", "Import", "From", "Export",
  "String", "DoubleStringCharacter", "SingleStringCharacter",
  "EscapeSequence", "CharacterEscapeSequence",
  "HexEscapeSequence", "UnicodeEscapeSequence",
  "ExtendedUnicodeEscapeSequence", "SingleEscapeCharacter",
  "NonEscapeCharacter", "EscapeCharacter",
  "LineContinuation", "HexDigit", "DecimalIntegerLiteral",
  "ExponentPart", "IdentifierPart", "IdentifierStart",
  "UnicodeLetter", "UnicodeCombiningMark",
  "UnicodeDigit", "UnicodeConnectorPunctuation",
  "RegularExpressionFirstChar", "RegularExpressionChar",
  "RegularExpressionClassChar", "RegularExpressionBackslashSequence"
];

GraphLexer.prototype.grammarFileName = "GraphLexer.g4";

GraphLexer.prototype.action = function(localctx, ruleIndex, actionIndex) {
  switch (ruleIndex) {
    case 3:
      this.OpenBrace_action(localctx, actionIndex);
      break;
    case 4:
      this.CloseBrace_action(localctx, actionIndex);
      break;
    default:
      throw "No registered action for:" + ruleIndex;
  }
};


GraphLexer.prototype.OpenBrace_action = function(localctx, actionIndex) {
  switch (actionIndex) {
    case 0:
      this.ProcessOpenBrace();
      break;
    default:
      throw "No registered action for:" + actionIndex;
  }
};

GraphLexer.prototype.CloseBrace_action = function(localctx, actionIndex) {
  switch (actionIndex) {
    case 1:
      this.ProcessCloseBrace();
      break;
    default:
      throw "No registered action for:" + actionIndex;
  }
};
GraphLexer.prototype.sempred = function(localctx, ruleIndex, predIndex) {
  switch (ruleIndex) {
    case 0:
      return this.HashBangLine_sempred(localctx, predIndex);
    default:
      throw "No registered predicate for:" + ruleIndex;
  }
};

GraphLexer.prototype.HashBangLine_sempred = function(localctx, predIndex) {
  switch (predIndex) {
    case 0:
      return this.IsStartOfFile();
    default:
      throw "No predicate with index:" + predIndex;
  }
};



var GraphLexer_2 = GraphLexer;

var GraphLexer_1 = {
  GraphLexer: GraphLexer_2
};

// Generated from GraphParser.g4 by ANTLR 4.8
// jshint ignore: start


// This class defines a complete listener for a parse tree produced by GraphParser.
function GraphParserListener() {
  antlr4$1.tree.ParseTreeListener.call(this);
  return this;
}

GraphParserListener.prototype = Object.create(antlr4$1.tree.ParseTreeListener.prototype);
GraphParserListener.prototype.constructor = GraphParserListener;

// Enter a parse tree produced by GraphParser#program.
GraphParserListener.prototype.enterProgram = function(ctx) {};

// Exit a parse tree produced by GraphParser#program.
GraphParserListener.prototype.exitProgram = function(ctx) {};


// Enter a parse tree produced by GraphParser#moduleStatement.
GraphParserListener.prototype.enterModuleStatement = function(ctx) {};

// Exit a parse tree produced by GraphParser#moduleStatement.
GraphParserListener.prototype.exitModuleStatement = function(ctx) {};


// Enter a parse tree produced by GraphParser#moduleStatements.
GraphParserListener.prototype.enterModuleStatements = function(ctx) {};

// Exit a parse tree produced by GraphParser#moduleStatements.
GraphParserListener.prototype.exitModuleStatements = function(ctx) {};


// Enter a parse tree produced by GraphParser#identifier.
GraphParserListener.prototype.enterIdentifier = function(ctx) {};

// Exit a parse tree produced by GraphParser#identifier.
GraphParserListener.prototype.exitIdentifier = function(ctx) {};


// Enter a parse tree produced by GraphParser#path.
GraphParserListener.prototype.enterPath = function(ctx) {};

// Exit a parse tree produced by GraphParser#path.
GraphParserListener.prototype.exitPath = function(ctx) {};


// Enter a parse tree produced by GraphParser#statement.
GraphParserListener.prototype.enterStatement = function(ctx) {};

// Exit a parse tree produced by GraphParser#statement.
GraphParserListener.prototype.exitStatement = function(ctx) {};


// Enter a parse tree produced by GraphParser#statementList.
GraphParserListener.prototype.enterStatementList = function(ctx) {};

// Exit a parse tree produced by GraphParser#statementList.
GraphParserListener.prototype.exitStatementList = function(ctx) {};


// Enter a parse tree produced by GraphParser#inferenceDeclaration.
GraphParserListener.prototype.enterInferenceDeclaration = function(ctx) {};

// Exit a parse tree produced by GraphParser#inferenceDeclaration.
GraphParserListener.prototype.exitInferenceDeclaration = function(ctx) {};


// Enter a parse tree produced by GraphParser#block.
GraphParserListener.prototype.enterBlock = function(ctx) {};

// Exit a parse tree produced by GraphParser#block.
GraphParserListener.prototype.exitBlock = function(ctx) {};


// Enter a parse tree produced by GraphParser#importStatement.
GraphParserListener.prototype.enterImportStatement = function(ctx) {};

// Exit a parse tree produced by GraphParser#importStatement.
GraphParserListener.prototype.exitImportStatement = function(ctx) {};


// Enter a parse tree produced by GraphParser#moduleItems.
GraphParserListener.prototype.enterModuleItems = function(ctx) {};

// Exit a parse tree produced by GraphParser#moduleItems.
GraphParserListener.prototype.exitModuleItems = function(ctx) {};


// Enter a parse tree produced by GraphParser#module.
GraphParserListener.prototype.enterModule = function(ctx) {};

// Exit a parse tree produced by GraphParser#module.
GraphParserListener.prototype.exitModule = function(ctx) {};


// Enter a parse tree produced by GraphParser#exportStatement.
GraphParserListener.prototype.enterExportStatement = function(ctx) {};

// Exit a parse tree produced by GraphParser#exportStatement.
GraphParserListener.prototype.exitExportStatement = function(ctx) {};


// Enter a parse tree produced by GraphParser#stepStatement.
GraphParserListener.prototype.enterStepStatement = function(ctx) {};

// Exit a parse tree produced by GraphParser#stepStatement.
GraphParserListener.prototype.exitStepStatement = function(ctx) {};


// Enter a parse tree produced by GraphParser#ifStatement.
GraphParserListener.prototype.enterIfStatement = function(ctx) {};

// Exit a parse tree produced by GraphParser#ifStatement.
GraphParserListener.prototype.exitIfStatement = function(ctx) {};


// Enter a parse tree produced by GraphParser#expression.
GraphParserListener.prototype.enterExpression = function(ctx) {};

// Exit a parse tree produced by GraphParser#expression.
GraphParserListener.prototype.exitExpression = function(ctx) {};


// Enter a parse tree produced by GraphParser#switchStatement.
GraphParserListener.prototype.enterSwitchStatement = function(ctx) {};

// Exit a parse tree produced by GraphParser#switchStatement.
GraphParserListener.prototype.exitSwitchStatement = function(ctx) {};


// Enter a parse tree produced by GraphParser#switchBlock.
GraphParserListener.prototype.enterSwitchBlock = function(ctx) {};

// Exit a parse tree produced by GraphParser#switchBlock.
GraphParserListener.prototype.exitSwitchBlock = function(ctx) {};


// Enter a parse tree produced by GraphParser#caseClauses.
GraphParserListener.prototype.enterCaseClauses = function(ctx) {};

// Exit a parse tree produced by GraphParser#caseClauses.
GraphParserListener.prototype.exitCaseClauses = function(ctx) {};


// Enter a parse tree produced by GraphParser#caseClause.
GraphParserListener.prototype.enterCaseClause = function(ctx) {};

// Exit a parse tree produced by GraphParser#caseClause.
GraphParserListener.prototype.exitCaseClause = function(ctx) {};


// Enter a parse tree produced by GraphParser#defaultClause.
GraphParserListener.prototype.enterDefaultClause = function(ctx) {};

// Exit a parse tree produced by GraphParser#defaultClause.
GraphParserListener.prototype.exitDefaultClause = function(ctx) {};


// Enter a parse tree produced by GraphParser#gotoStatement.
GraphParserListener.prototype.enterGotoStatement = function(ctx) {};

// Exit a parse tree produced by GraphParser#gotoStatement.
GraphParserListener.prototype.exitGotoStatement = function(ctx) {};


// Enter a parse tree produced by GraphParser#startStatement.
GraphParserListener.prototype.enterStartStatement = function(ctx) {};

// Exit a parse tree produced by GraphParser#startStatement.
GraphParserListener.prototype.exitStartStatement = function(ctx) {};



var GraphParserListener_2 = GraphParserListener;

var GraphParserListener_1 = {
  GraphParserListener: GraphParserListener_2
};

// Generated from GraphParser.g4 by ANTLR 4.8
// jshint ignore: start


// This class defines a complete generic visitor for a parse tree produced by GraphParser.

function GraphParserVisitor() {
  antlr4$1.tree.ParseTreeVisitor.call(this);
  return this;
}

GraphParserVisitor.prototype = Object.create(antlr4$1.tree.ParseTreeVisitor.prototype);
GraphParserVisitor.prototype.constructor = GraphParserVisitor;

// Visit a parse tree produced by GraphParser#program.
GraphParserVisitor.prototype.visitProgram = function(ctx) {
  return {
    type: 'program',

    moduleStatements: this.visitModuleStatements(ctx.children[0]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#moduleStatement.
GraphParserVisitor.prototype.visitModuleStatement = function(ctx) {
  const childContext = ctx.children[0];
  let moduleStatement = null;
  switch (childContext.parser.ruleNames[childContext.ruleIndex]) {
    case 'inferenceDeclaration':
      moduleStatement = this.visitInferenceDeclaration(childContext);
      break
    case 'importStatement':
      moduleStatement = this.visitImportStatement(childContext);
      break
    case 'exportStatement':
      moduleStatement = this.visitExportStatement(childContext);
      break
    case 'startStatement':
      moduleStatement = this.visitStartStatement(childContext);
      break
  }

  return {
    type: 'moduleStatement',

    moduleStatement,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#moduleStatements.
GraphParserVisitor.prototype.visitModuleStatements = function(ctx) {
  return ctx.children.map(
    childContext => this.visitModuleStatement(childContext)
  )
};


// Visit a parse tree produced by GraphParser#identifier.
GraphParserVisitor.prototype.visitIdentifier = function(ctx) {
  return {
    type: 'identifier',

    name: ctx.children[0].getSymbol(),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#path.
GraphParserVisitor.prototype.visitPath = function(ctx) {
  return {
    type: 'path',

    pathStr: ctx.children[0].getSymbol(),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#statement.
GraphParserVisitor.prototype.visitStatement = function(ctx) {
  const childContext = ctx.children[0];
  let statement = null;
  switch (childContext.parser.ruleNames[childContext.ruleIndex]) {
    case 'stepStatement':
      statement = this.visitStepStatement(childContext);
      break
    case 'ifStatement':
      statement = this.visitIfStatement(childContext);
      break
    case 'switchStatement':
      statement = this.visitSwitchStatement(childContext);
      break
    case 'gotoStatement':
      statement = this.visitGotoStatement(childContext);
      break
  }

  return statement
};


// Visit a parse tree produced by GraphParser#statementList.
GraphParserVisitor.prototype.visitStatementList = function(ctx) {
  return ctx.children.map(
    childContext => this.visitStatement(childContext)
  )
};


// Visit a parse tree produced by GraphParser#inferenceDeclaration.
GraphParserVisitor.prototype.visitInferenceDeclaration = function(ctx) {
  return {
    type: 'inferenceDeclaration',

    identifier: this.visitIdentifier(ctx.children[0]),
    block: this.visitBlock(ctx.children[2]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#block.
GraphParserVisitor.prototype.visitBlock = function(ctx) {
  const statements = ctx.children.length === 3 ?
    this.visitStatementList(ctx.children[1]) : [];

  return {
    type: 'block',

    statements,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#importStatement.
GraphParserVisitor.prototype.visitImportStatement = function(ctx) {
  return {
    type: 'importStatement',

    moduleItems: this.visitModuleItems(ctx.children[1]),
    path: this.visitPath(ctx.children[3]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#moduleItems.
GraphParserVisitor.prototype.visitModuleItems = function(ctx) {
  const items = ctx.children.slice(1, ctx.children.length - 1).filter((childContext) => {
    return (childContext.ruleIndex !== undefined) &&
      ctx.parser.ruleNames[childContext.ruleIndex] === 'identifier'
  });

  return {
    type: 'moduleItems',

    identifiers: items.map(childContext => this.visitIdentifier(childContext)),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#module.
GraphParserVisitor.prototype.visitModule = function(ctx) {
  const childContext = ctx.children[0];
  let module = null;
  switch (childContext.parser.ruleNames[childContext.ruleIndex]) {
    case 'identifier':
      module = this.visitIdentifier(childContext);
      break
    case 'inferenceDeclaration':
      module = this.visitInferenceDeclaration(childContext);
      break
  }

  return module
};


// Visit a parse tree produced by GraphParser#exportStatement.
GraphParserVisitor.prototype.visitExportStatement = function(ctx) {
  return {
    type: 'exportStatement',

    module: this.visitModule(ctx.children[1]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#stepStatement.
GraphParserVisitor.prototype.visitStepStatement = function(ctx) {
  return {
    type: 'stepStatement',

    stepStr: ctx.children[0].getSymbol(),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#ifStatement.
GraphParserVisitor.prototype.visitIfStatement = function(ctx) {
  const elseBlock = ctx.children.length > 4 ?
    this.visitBlock(ctx.children[5]) : null;

  return {
    type: 'ifStatement',

    expression: this.visitExpression(ctx.children[1]),
    block: this.visitBlock(ctx.children[3]),
    elseBlock,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#expression.
GraphParserVisitor.prototype.visitExpression = function(ctx) {
  return {
    type: 'expression',

    // expressionStr: ctx.children[0].getSymbol(),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#switchStatement.
GraphParserVisitor.prototype.visitSwitchStatement = function(ctx) {
  return {
    type: 'switchStatement',

    expression: this.visitExpression(ctx.children[1]),
    switchBlock: this.visitSwitchBlock(ctx.children[2]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#switchBlock.
GraphParserVisitor.prototype.visitSwitchBlock = function(ctx) {
  let caseClauses = [];
  let defaultClause = null;

  if (ctx.children.length > 2) {
    ctx.children.slice(1, ctx.children.length - 1).forEach((childContext) => {
      if (childContext.parser.ruleNames[childContext.ruleIndex] === 'defaultClause') {
        defaultClause = this.visitDefaultClause(childContext);
      } else if (childContext.parser.ruleNames[childContext.ruleIndex] === 'caseClauses') {
        caseClauses.concat(this.visitCaseClauses(childContext));
      }
    });
  }

  return {
    type: 'switchBlock',

    caseClauses,
    defaultClause,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#caseClauses.
GraphParserVisitor.prototype.visitCaseClauses = function(ctx) {
  return ctx.children.map(childContext => this.visitCaseClause(childContext));
};


// Visit a parse tree produced by GraphParser#caseClause.
GraphParserVisitor.prototype.visitCaseClause = function(ctx) {
  const block = ctx.children.length === 4 ?
    this.visitBlock(ctx.children[3]) : null;
  return {
    type: 'caseClause',

    expression: this.visitExpression(ctx.children[1]),
    block,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#defaultClause.
GraphParserVisitor.prototype.visitDefaultClause = function(ctx) {
  const block = ctx.children.length === 3 ?
    this.visitBlock(ctx.children[2]) : null;
  return {
    type: 'defaultClause',

    block,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#gotoStatement.
GraphParserVisitor.prototype.visitGotoStatement = function(ctx) {
  return {
    type: 'gotoStatement',

    identifier: this.visitIdentifier(ctx.children[1]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#startStatement.
GraphParserVisitor.prototype.visitStartStatement = function(ctx) {
  return {
    type: 'startStatement',

    module: this.visitModule(ctx.children[1]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};



var GraphParserVisitor_2 = GraphParserVisitor;

var GraphParserVisitor_1 = {
  GraphParserVisitor: GraphParserVisitor_2
};

function GraphParserBase(input) {
  antlr4$1.Parser.call(this, input);
}

GraphParserBase.prototype = Object.create(antlr4$1.Parser.prototype);

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
  return !this.here(GraphParser_1.LineTerminator);
};

GraphParserBase.prototype.notOpenBraceAndNotFunction = function() {
  const nextTokenType = this._input.LT(1).type;
  return (
    nextTokenType !== GraphParser_1.OpenBrace &&
    nextTokenType !== GraphParser_1.Function
  );
};

GraphParserBase.prototype.closeBrace = function() {
  return this._input.LT(1).type === GraphParser_1.CloseBrace;
};

GraphParserBase.prototype.here = function(type) {
  const possibleIndexEosToken = this.getCurrentToken().tokenIndex - 1;
  const ahead = this._input.get(possibleIndexEosToken);
  return ahead.channel === antlr4$1.Lexer.HIDDEN && ahead.type === type;
};

GraphParserBase.prototype.lineTerminatorAhead = function() {
  let possibleIndexEosToken = this.getCurrentToken().tokenIndex - 1;
  let ahead = this._input.get(possibleIndexEosToken);
  if (ahead.channel !== antlr4$1.Lexer.HIDDEN) {
    return false;
  }

  if (ahead.type === GraphParser_1.LineTerminator) {
    return true;
  }

  if (ahead.type === GraphParser_1.WhiteSpaces) {
    possibleIndexEosToken = this.getCurrentToken().getTokenIndex() - 2;
    ahead = this._input.get(possibleIndexEosToken);
  }

  const text = ahead.type;
  const type = ahead.type;

  return (
    (type === GraphParser_1.MultiLineComment &&
      (text.includes("\r") || text.includes("\n"))) ||
    type === GraphParser_1.LineTerminator
  );
};

var GraphParserBase_2 = GraphParserBase;

var GraphParserBase_1 = {
  GraphParserBase: GraphParserBase_2
};

// Generated from GraphParser.g4 by ANTLR 4.8
// jshint ignore: start

var GraphParserListener$1 = GraphParserListener_1.GraphParserListener;
var GraphParserVisitor$1 = GraphParserVisitor_1.GraphParserVisitor;

var GraphParserBase$1 = GraphParserBase_1.GraphParserBase;


var serializedATN$1 = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
  "\u0003\u001e\u00ac\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
  "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
  "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
  "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
  "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
  "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017",
  "\u0004\u0018\t\u0018\u0003\u0002\u0005\u00022\n\u0002\u0003\u0002\u0005",
  "\u00025\n\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003",
  "\u0003\u0003\u0003\u0005\u0003=\n\u0003\u0003\u0004\u0006\u0004@\n\u0004",
  "\r\u0004\u000e\u0004A\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006",
  "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0005\u0007L\n\u0007",
  "\u0003\b\u0006\bO\n\b\r\b\u000e\bP\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
  "\n\u0003\n\u0005\nY\n\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003",
  "\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0007",
  "\ff\n\f\f\f\u000e\fi\u000b\f\u0003\f\u0003\f\u0005\fm\n\f\u0005\fo\n",
  "\f\u0003\f\u0003\f\u0003\r\u0003\r\u0005\ru\n\r\u0003\u000e\u0003\u000e",
  "\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0010",
  "\u0003\u0010\u0003\u0010\u0003\u0010\u0005\u0010\u0082\n\u0010\u0003",
  "\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003",
  "\u0013\u0003\u0013\u0005\u0013\u008c\n\u0013\u0003\u0013\u0003\u0013",
  "\u0005\u0013\u0090\n\u0013\u0005\u0013\u0092\n\u0013\u0003\u0013\u0003",
  "\u0013\u0003\u0014\u0006\u0014\u0097\n\u0014\r\u0014\u000e\u0014\u0098",
  "\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0005\u0015\u009f\n",
  "\u0015\u0003\u0016\u0003\u0016\u0003\u0016\u0005\u0016\u00a4\n\u0016",
  "\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0018\u0003\u0018\u0003\u0018",
  "\u0003\u0018\u0002\u0002\u0019\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012",
  "\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.\u0002\u0002\u0002\u00aa",
  "\u00021\u0003\u0002\u0002\u0002\u0004<\u0003\u0002\u0002\u0002\u0006",
  "?\u0003\u0002\u0002\u0002\bC\u0003\u0002\u0002\u0002\nE\u0003\u0002",
  "\u0002\u0002\fK\u0003\u0002\u0002\u0002\u000eN\u0003\u0002\u0002\u0002",
  "\u0010R\u0003\u0002\u0002\u0002\u0012V\u0003\u0002\u0002\u0002\u0014",
  "\\\u0003\u0002\u0002\u0002\u0016a\u0003\u0002\u0002\u0002\u0018t\u0003",
  "\u0002\u0002\u0002\u001av\u0003\u0002\u0002\u0002\u001cy\u0003\u0002",
  "\u0002\u0002\u001e{\u0003\u0002\u0002\u0002 \u0083\u0003\u0002\u0002",
  "\u0002\"\u0085\u0003\u0002\u0002\u0002$\u0089\u0003\u0002\u0002\u0002",
  "&\u0096\u0003\u0002\u0002\u0002(\u009a\u0003\u0002\u0002\u0002*\u00a0",
  "\u0003\u0002\u0002\u0002,\u00a5\u0003\u0002\u0002\u0002.\u00a8\u0003",
  "\u0002\u0002\u000202\u0007\u0003\u0002\u000210\u0003\u0002\u0002\u0002",
  "12\u0003\u0002\u0002\u000224\u0003\u0002\u0002\u000235\u0005\u0006\u0004",
  "\u000243\u0003\u0002\u0002\u000245\u0003\u0002\u0002\u000256\u0003\u0002",
  "\u0002\u000267\u0007\u0002\u0002\u00037\u0003\u0003\u0002\u0002\u0002",
  "8=\u0005\u0010\t\u00029=\u0005\u0014\u000b\u0002:=\u0005\u001a\u000e",
  "\u0002;=\u0005.\u0018\u0002<8\u0003\u0002\u0002\u0002<9\u0003\u0002",
  "\u0002\u0002<:\u0003\u0002\u0002\u0002<;\u0003\u0002\u0002\u0002=\u0005",
  "\u0003\u0002\u0002\u0002>@\u0005\u0004\u0003\u0002?>\u0003\u0002\u0002",
  "\u0002@A\u0003\u0002\u0002\u0002A?\u0003\u0002\u0002\u0002AB\u0003\u0002",
  "\u0002\u0002B\u0007\u0003\u0002\u0002\u0002CD\u0007\u0010\u0002\u0002",
  "D\t\u0003\u0002\u0002\u0002EF\u0007\u0012\u0002\u0002F\u000b\u0003\u0002",
  "\u0002\u0002GL\u0005\u001c\u000f\u0002HL\u0005\u001e\u0010\u0002IL\u0005",
  "\"\u0012\u0002JL\u0005,\u0017\u0002KG\u0003\u0002\u0002\u0002KH\u0003",
  "\u0002\u0002\u0002KI\u0003\u0002\u0002\u0002KJ\u0003\u0002\u0002\u0002",
  "L\r\u0003\u0002\u0002\u0002MO\u0005\f\u0007\u0002NM\u0003\u0002\u0002",
  "\u0002OP\u0003\u0002\u0002\u0002PN\u0003\u0002\u0002\u0002PQ\u0003\u0002",
  "\u0002\u0002Q\u000f\u0003\u0002\u0002\u0002RS\u0005\b\u0005\u0002ST",
  "\u0007\f\u0002\u0002TU\u0005\u0012\n\u0002U\u0011\u0003\u0002\u0002",
  "\u0002VX\u0007\u0006\u0002\u0002WY\u0005\u000e\b\u0002XW\u0003\u0002",
  "\u0002\u0002XY\u0003\u0002\u0002\u0002YZ\u0003\u0002\u0002\u0002Z[\u0007",
  "\u0007\u0002\u0002[\u0013\u0003\u0002\u0002\u0002\\]\u0007\u001b\u0002",
  "\u0002]^\u0005\u0016\f\u0002^_\u0007\u001c\u0002\u0002_`\u0005\n\u0006",
  "\u0002`\u0015\u0003\u0002\u0002\u0002ag\u0007\u0006\u0002\u0002bc\u0005",
  "\b\u0005\u0002cd\u0007\u000e\u0002\u0002df\u0003\u0002\u0002\u0002e",
  "b\u0003\u0002\u0002\u0002fi\u0003\u0002\u0002\u0002ge\u0003\u0002\u0002",
  "\u0002gh\u0003\u0002\u0002\u0002hn\u0003\u0002\u0002\u0002ig\u0003\u0002",
  "\u0002\u0002jl\u0005\b\u0005\u0002km\u0007\u000e\u0002\u0002lk\u0003",
  "\u0002\u0002\u0002lm\u0003\u0002\u0002\u0002mo\u0003\u0002\u0002\u0002",
  "nj\u0003\u0002\u0002\u0002no\u0003\u0002\u0002\u0002op\u0003\u0002\u0002",
  "\u0002pq\u0007\u0007\u0002\u0002q\u0017\u0003\u0002\u0002\u0002ru\u0005",
  "\b\u0005\u0002su\u0005\u0010\t\u0002tr\u0003\u0002\u0002\u0002ts\u0003",
  "\u0002\u0002\u0002u\u0019\u0003\u0002\u0002\u0002vw\u0007\u001d\u0002",
  "\u0002wx\u0005\u0018\r\u0002x\u001b\u0003\u0002\u0002\u0002yz\u0007",
  "\u0011\u0002\u0002z\u001d\u0003\u0002\u0002\u0002{|\u0007\u0016\u0002",
  "\u0002|}\u0005 \u0011\u0002}~\u0007\r\u0002\u0002~\u0081\u0005\u0012",
  "\n\u0002\u007f\u0080\u0007\u0017\u0002\u0002\u0080\u0082\u0005\u0012",
  "\n\u0002\u0081\u007f\u0003\u0002\u0002\u0002\u0081\u0082\u0003\u0002",
  "\u0002\u0002\u0082\u001f\u0003\u0002\u0002\u0002\u0083\u0084\u0007\u0011",
  "\u0002\u0002\u0084!\u0003\u0002\u0002\u0002\u0085\u0086\u0007\u0018",
  "\u0002\u0002\u0086\u0087\u0005 \u0011\u0002\u0087\u0088\u0005$\u0013",
  "\u0002\u0088#\u0003\u0002\u0002\u0002\u0089\u008b\u0007\u0006\u0002",
  "\u0002\u008a\u008c\u0005&\u0014\u0002\u008b\u008a\u0003\u0002\u0002",
  "\u0002\u008b\u008c\u0003\u0002\u0002\u0002\u008c\u0091\u0003\u0002\u0002",
  "\u0002\u008d\u008f\u0005*\u0016\u0002\u008e\u0090\u0005&\u0014\u0002",
  "\u008f\u008e\u0003\u0002\u0002\u0002\u008f\u0090\u0003\u0002\u0002\u0002",
  "\u0090\u0092\u0003\u0002\u0002\u0002\u0091\u008d\u0003\u0002\u0002\u0002",
  "\u0091\u0092\u0003\u0002\u0002\u0002\u0092\u0093\u0003\u0002\u0002\u0002",
  "\u0093\u0094\u0007\u0007\u0002\u0002\u0094%\u0003\u0002\u0002\u0002",
  "\u0095\u0097\u0005(\u0015\u0002\u0096\u0095\u0003\u0002\u0002\u0002",
  "\u0097\u0098\u0003\u0002\u0002\u0002\u0098\u0096\u0003\u0002\u0002\u0002",
  "\u0098\u0099\u0003\u0002\u0002\u0002\u0099\'\u0003\u0002\u0002\u0002",
  "\u009a\u009b\u0007\u0019\u0002\u0002\u009b\u009c\u0005 \u0011\u0002",
  "\u009c\u009e\u0007\r\u0002\u0002\u009d\u009f\u0005\u0012\n\u0002\u009e",
  "\u009d\u0003\u0002\u0002\u0002\u009e\u009f\u0003\u0002\u0002\u0002\u009f",
  ")\u0003\u0002\u0002\u0002\u00a0\u00a1\u0007\u001a\u0002\u0002\u00a1",
  "\u00a3\u0007\r\u0002\u0002\u00a2\u00a4\u0005\u0012\n\u0002\u00a3\u00a2",
  "\u0003\u0002\u0002\u0002\u00a3\u00a4\u0003\u0002\u0002\u0002\u00a4+",
  "\u0003\u0002\u0002\u0002\u00a5\u00a6\u0007\u0015\u0002\u0002\u00a6\u00a7",
  "\u0005\b\u0005\u0002\u00a7-\u0003\u0002\u0002\u0002\u00a8\u00a9\u0007",
  "\u0014\u0002\u0002\u00a9\u00aa\u0005\u0018\r\u0002\u00aa/\u0003\u0002",
  "\u0002\u0002\u001414<AKPXglnt\u0081\u008b\u008f\u0091\u0098\u009e\u00a3"
].join("");


var atn$1 = new antlr4$1.atn.ATNDeserializer().deserialize(serializedATN$1);

var decisionsToDFA$1 = atn$1.decisionToState.map(function(ds, index) { return new antlr4$1.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4$1.PredictionContextCache();

var literalNames = [null, null, null, null, "'{'", "'}'", "'['", "']'",
  "'<'", "'>'", "'='", "'->'", "','", "';'", null, null,
  null, null, "'start'", "'goto'", "'if'", "'else'",
  "'switch'", "'case'", "'default'", "'import'", "'from'",
  "'export'"
];

var symbolicNames = [null, "HashBangLine", "SingleLineComment", "LineTerminator",
  "OpenBrace", "CloseBrace", "OpenBracket", "CloseBracket",
  "OpenAngleBracket", "CloseAngleBracket", "Assign",
  "Result", "Comma", "SemiColon", "Identifier", "Action",
  "Path", "WhiteSpaces", "Start", "Goto", "If", "Else",
  "Switch", "Case", "Default", "Import", "From", "Export",
  "String"
];

var ruleNames = ["program", "moduleStatement", "moduleStatements", "identifier",
  "path", "statement", "statementList", "inferenceDeclaration",
  "block", "importStatement", "moduleItems", "module",
  "exportStatement", "stepStatement", "ifStatement", "expression",
  "switchStatement", "switchBlock", "caseClauses", "caseClause",
  "defaultClause", "gotoStatement", "startStatement"
];

function GraphParser(input) {
  GraphParserBase$1.call(this, input);
  this._interp = new antlr4$1.atn.ParserATNSimulator(this, atn$1, decisionsToDFA$1, sharedContextCache);
  this.ruleNames = ruleNames;
  this.literalNames = literalNames;
  this.symbolicNames = symbolicNames;
  return this;
}

GraphParser.prototype = Object.create(GraphParserBase$1.prototype);
GraphParser.prototype.constructor = GraphParser;

Object.defineProperty(GraphParser.prototype, "atn", {
  get: function() {
    return atn$1;
  }
});

GraphParser.EOF = antlr4$1.Token.EOF;
GraphParser.HashBangLine = 1;
GraphParser.SingleLineComment = 2;
GraphParser.LineTerminator = 3;
GraphParser.OpenBrace = 4;
GraphParser.CloseBrace = 5;
GraphParser.OpenBracket = 6;
GraphParser.CloseBracket = 7;
GraphParser.OpenAngleBracket = 8;
GraphParser.CloseAngleBracket = 9;
GraphParser.Assign = 10;
GraphParser.Result = 11;
GraphParser.Comma = 12;
GraphParser.SemiColon = 13;
GraphParser.Identifier = 14;
GraphParser.Action = 15;
GraphParser.Path = 16;
GraphParser.WhiteSpaces = 17;
GraphParser.Start = 18;
GraphParser.Goto = 19;
GraphParser.If = 20;
GraphParser.Else = 21;
GraphParser.Switch = 22;
GraphParser.Case = 23;
GraphParser.Default = 24;
GraphParser.Import = 25;
GraphParser.From = 26;
GraphParser.Export = 27;
GraphParser.String = 28;

GraphParser.RULE_program = 0;
GraphParser.RULE_moduleStatement = 1;
GraphParser.RULE_moduleStatements = 2;
GraphParser.RULE_identifier = 3;
GraphParser.RULE_path = 4;
GraphParser.RULE_statement = 5;
GraphParser.RULE_statementList = 6;
GraphParser.RULE_inferenceDeclaration = 7;
GraphParser.RULE_block = 8;
GraphParser.RULE_importStatement = 9;
GraphParser.RULE_moduleItems = 10;
GraphParser.RULE_module = 11;
GraphParser.RULE_exportStatement = 12;
GraphParser.RULE_stepStatement = 13;
GraphParser.RULE_ifStatement = 14;
GraphParser.RULE_expression = 15;
GraphParser.RULE_switchStatement = 16;
GraphParser.RULE_switchBlock = 17;
GraphParser.RULE_caseClauses = 18;
GraphParser.RULE_caseClause = 19;
GraphParser.RULE_defaultClause = 20;
GraphParser.RULE_gotoStatement = 21;
GraphParser.RULE_startStatement = 22;


function ProgramContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_program;
  return this;
}

ProgramContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
ProgramContext.prototype.constructor = ProgramContext;

ProgramContext.prototype.EOF = function() {
  return this.getToken(GraphParser.EOF, 0);
};

ProgramContext.prototype.HashBangLine = function() {
  return this.getToken(GraphParser.HashBangLine, 0);
};

ProgramContext.prototype.moduleStatements = function() {
  return this.getTypedRuleContext(ModuleStatementsContext, 0);
};

ProgramContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterProgram(this);
  }
};

ProgramContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitProgram(this);
  }
};

ProgramContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitProgram(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.ProgramContext = ProgramContext;

GraphParser.prototype.program = function() {

  var localctx = new ProgramContext(this, this._ctx, this.state);
  this.enterRule(localctx, 0, GraphParser.RULE_program);
  var _la = 0; // Token type
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 47;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    if (_la === GraphParser.HashBangLine) {
      this.state = 46;
      this.match(GraphParser.HashBangLine);
    }

    this.state = 50;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    if ((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GraphParser.Identifier) | (1 << GraphParser.Start) | (1 << GraphParser.Import) | (1 << GraphParser.Export))) !== 0)) {
      this.state = 49;
      this.moduleStatements();
    }

    this.state = 52;
    this.match(GraphParser.EOF);
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function ModuleStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_moduleStatement;
  return this;
}

ModuleStatementContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
ModuleStatementContext.prototype.constructor = ModuleStatementContext;

ModuleStatementContext.prototype.inferenceDeclaration = function() {
  return this.getTypedRuleContext(InferenceDeclarationContext, 0);
};

ModuleStatementContext.prototype.importStatement = function() {
  return this.getTypedRuleContext(ImportStatementContext, 0);
};

ModuleStatementContext.prototype.exportStatement = function() {
  return this.getTypedRuleContext(ExportStatementContext, 0);
};

ModuleStatementContext.prototype.startStatement = function() {
  return this.getTypedRuleContext(StartStatementContext, 0);
};

ModuleStatementContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterModuleStatement(this);
  }
};

ModuleStatementContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitModuleStatement(this);
  }
};

ModuleStatementContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitModuleStatement(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.ModuleStatementContext = ModuleStatementContext;

GraphParser.prototype.moduleStatement = function() {

  var localctx = new ModuleStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 2, GraphParser.RULE_moduleStatement);
  try {
    this.state = 58;
    this._errHandler.sync(this);
    switch (this._input.LA(1)) {
      case GraphParser.Identifier:
        this.enterOuterAlt(localctx, 1);
        this.state = 54;
        this.inferenceDeclaration();
        break;
      case GraphParser.Import:
        this.enterOuterAlt(localctx, 2);
        this.state = 55;
        this.importStatement();
        break;
      case GraphParser.Export:
        this.enterOuterAlt(localctx, 3);
        this.state = 56;
        this.exportStatement();
        break;
      case GraphParser.Start:
        this.enterOuterAlt(localctx, 4);
        this.state = 57;
        this.startStatement();
        break;
      default:
        throw new antlr4$1.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function ModuleStatementsContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_moduleStatements;
  return this;
}

ModuleStatementsContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
ModuleStatementsContext.prototype.constructor = ModuleStatementsContext;

ModuleStatementsContext.prototype.moduleStatement = function(i) {
  if (i === undefined) {
    i = null;
  }
  if (i === null) {
    return this.getTypedRuleContexts(ModuleStatementContext);
  } else {
    return this.getTypedRuleContext(ModuleStatementContext, i);
  }
};

ModuleStatementsContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterModuleStatements(this);
  }
};

ModuleStatementsContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitModuleStatements(this);
  }
};

ModuleStatementsContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitModuleStatements(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.ModuleStatementsContext = ModuleStatementsContext;

GraphParser.prototype.moduleStatements = function() {

  var localctx = new ModuleStatementsContext(this, this._ctx, this.state);
  this.enterRule(localctx, 4, GraphParser.RULE_moduleStatements);
  var _la = 0; // Token type
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 61;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    do {
      this.state = 60;
      this.moduleStatement();
      this.state = 63;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
    } while ((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GraphParser.Identifier) | (1 << GraphParser.Start) | (1 << GraphParser.Import) | (1 << GraphParser.Export))) !== 0));
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function IdentifierContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_identifier;
  return this;
}

IdentifierContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
IdentifierContext.prototype.constructor = IdentifierContext;

IdentifierContext.prototype.Identifier = function() {
  return this.getToken(GraphParser.Identifier, 0);
};

IdentifierContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterIdentifier(this);
  }
};

IdentifierContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitIdentifier(this);
  }
};

IdentifierContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitIdentifier(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.IdentifierContext = IdentifierContext;

GraphParser.prototype.identifier = function() {

  var localctx = new IdentifierContext(this, this._ctx, this.state);
  this.enterRule(localctx, 6, GraphParser.RULE_identifier);
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 65;
    this.match(GraphParser.Identifier);
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function PathContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_path;
  return this;
}

PathContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
PathContext.prototype.constructor = PathContext;

PathContext.prototype.Path = function() {
  return this.getToken(GraphParser.Path, 0);
};

PathContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterPath(this);
  }
};

PathContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitPath(this);
  }
};

PathContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitPath(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.PathContext = PathContext;

GraphParser.prototype.path = function() {

  var localctx = new PathContext(this, this._ctx, this.state);
  this.enterRule(localctx, 8, GraphParser.RULE_path);
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 67;
    this.match(GraphParser.Path);
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function StatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_statement;
  return this;
}

StatementContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
StatementContext.prototype.constructor = StatementContext;

StatementContext.prototype.stepStatement = function() {
  return this.getTypedRuleContext(StepStatementContext, 0);
};

StatementContext.prototype.ifStatement = function() {
  return this.getTypedRuleContext(IfStatementContext, 0);
};

StatementContext.prototype.switchStatement = function() {
  return this.getTypedRuleContext(SwitchStatementContext, 0);
};

StatementContext.prototype.gotoStatement = function() {
  return this.getTypedRuleContext(GotoStatementContext, 0);
};

StatementContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterStatement(this);
  }
};

StatementContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitStatement(this);
  }
};

StatementContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitStatement(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.StatementContext = StatementContext;

GraphParser.prototype.statement = function() {

  var localctx = new StatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 10, GraphParser.RULE_statement);
  try {
    this.state = 73;
    this._errHandler.sync(this);
    switch (this._input.LA(1)) {
      case GraphParser.Action:
        this.enterOuterAlt(localctx, 1);
        this.state = 69;
        this.stepStatement();
        break;
      case GraphParser.If:
        this.enterOuterAlt(localctx, 2);
        this.state = 70;
        this.ifStatement();
        break;
      case GraphParser.Switch:
        this.enterOuterAlt(localctx, 3);
        this.state = 71;
        this.switchStatement();
        break;
      case GraphParser.Goto:
        this.enterOuterAlt(localctx, 4);
        this.state = 72;
        this.gotoStatement();
        break;
      default:
        throw new antlr4$1.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function StatementListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_statementList;
  return this;
}

StatementListContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
StatementListContext.prototype.constructor = StatementListContext;

StatementListContext.prototype.statement = function(i) {
  if (i === undefined) {
    i = null;
  }
  if (i === null) {
    return this.getTypedRuleContexts(StatementContext);
  } else {
    return this.getTypedRuleContext(StatementContext, i);
  }
};

StatementListContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterStatementList(this);
  }
};

StatementListContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitStatementList(this);
  }
};

StatementListContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitStatementList(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.StatementListContext = StatementListContext;

GraphParser.prototype.statementList = function() {

  var localctx = new StatementListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 12, GraphParser.RULE_statementList);
  var _la = 0; // Token type
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 76;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    do {
      this.state = 75;
      this.statement();
      this.state = 78;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
    } while ((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GraphParser.Action) | (1 << GraphParser.Goto) | (1 << GraphParser.If) | (1 << GraphParser.Switch))) !== 0));
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function InferenceDeclarationContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_inferenceDeclaration;
  return this;
}

InferenceDeclarationContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
InferenceDeclarationContext.prototype.constructor = InferenceDeclarationContext;

InferenceDeclarationContext.prototype.identifier = function() {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

InferenceDeclarationContext.prototype.Assign = function() {
  return this.getToken(GraphParser.Assign, 0);
};

InferenceDeclarationContext.prototype.block = function() {
  return this.getTypedRuleContext(BlockContext, 0);
};

InferenceDeclarationContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterInferenceDeclaration(this);
  }
};

InferenceDeclarationContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitInferenceDeclaration(this);
  }
};

InferenceDeclarationContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitInferenceDeclaration(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.InferenceDeclarationContext = InferenceDeclarationContext;

GraphParser.prototype.inferenceDeclaration = function() {

  var localctx = new InferenceDeclarationContext(this, this._ctx, this.state);
  this.enterRule(localctx, 14, GraphParser.RULE_inferenceDeclaration);
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 80;
    this.identifier();
    this.state = 81;
    this.match(GraphParser.Assign);
    this.state = 82;
    this.block();
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function BlockContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_block;
  return this;
}

BlockContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
BlockContext.prototype.constructor = BlockContext;

BlockContext.prototype.OpenBrace = function() {
  return this.getToken(GraphParser.OpenBrace, 0);
};

BlockContext.prototype.CloseBrace = function() {
  return this.getToken(GraphParser.CloseBrace, 0);
};

BlockContext.prototype.statementList = function() {
  return this.getTypedRuleContext(StatementListContext, 0);
};

BlockContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterBlock(this);
  }
};

BlockContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitBlock(this);
  }
};

BlockContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitBlock(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.BlockContext = BlockContext;

GraphParser.prototype.block = function() {

  var localctx = new BlockContext(this, this._ctx, this.state);
  this.enterRule(localctx, 16, GraphParser.RULE_block);
  var _la = 0; // Token type
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 84;
    this.match(GraphParser.OpenBrace);
    this.state = 86;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    if ((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GraphParser.Action) | (1 << GraphParser.Goto) | (1 << GraphParser.If) | (1 << GraphParser.Switch))) !== 0)) {
      this.state = 85;
      this.statementList();
    }

    this.state = 88;
    this.match(GraphParser.CloseBrace);
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function ImportStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_importStatement;
  return this;
}

ImportStatementContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
ImportStatementContext.prototype.constructor = ImportStatementContext;

ImportStatementContext.prototype.Import = function() {
  return this.getToken(GraphParser.Import, 0);
};

ImportStatementContext.prototype.moduleItems = function() {
  return this.getTypedRuleContext(ModuleItemsContext, 0);
};

ImportStatementContext.prototype.From = function() {
  return this.getToken(GraphParser.From, 0);
};

ImportStatementContext.prototype.path = function() {
  return this.getTypedRuleContext(PathContext, 0);
};

ImportStatementContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterImportStatement(this);
  }
};

ImportStatementContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitImportStatement(this);
  }
};

ImportStatementContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitImportStatement(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.ImportStatementContext = ImportStatementContext;

GraphParser.prototype.importStatement = function() {

  var localctx = new ImportStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 18, GraphParser.RULE_importStatement);
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 90;
    this.match(GraphParser.Import);
    this.state = 91;
    this.moduleItems();
    this.state = 92;
    this.match(GraphParser.From);
    this.state = 93;
    this.path();
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function ModuleItemsContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_moduleItems;
  return this;
}

ModuleItemsContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
ModuleItemsContext.prototype.constructor = ModuleItemsContext;

ModuleItemsContext.prototype.OpenBrace = function() {
  return this.getToken(GraphParser.OpenBrace, 0);
};

ModuleItemsContext.prototype.CloseBrace = function() {
  return this.getToken(GraphParser.CloseBrace, 0);
};

ModuleItemsContext.prototype.identifier = function(i) {
  if (i === undefined) {
    i = null;
  }
  if (i === null) {
    return this.getTypedRuleContexts(IdentifierContext);
  } else {
    return this.getTypedRuleContext(IdentifierContext, i);
  }
};

ModuleItemsContext.prototype.Comma = function(i) {
  if (i === undefined) {
    i = null;
  }
  if (i === null) {
    return this.getTokens(GraphParser.Comma);
  } else {
    return this.getToken(GraphParser.Comma, i);
  }
};


ModuleItemsContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterModuleItems(this);
  }
};

ModuleItemsContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitModuleItems(this);
  }
};

ModuleItemsContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitModuleItems(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.ModuleItemsContext = ModuleItemsContext;

GraphParser.prototype.moduleItems = function() {

  var localctx = new ModuleItemsContext(this, this._ctx, this.state);
  this.enterRule(localctx, 20, GraphParser.RULE_moduleItems);
  var _la = 0; // Token type
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 95;
    this.match(GraphParser.OpenBrace);
    this.state = 101;
    this._errHandler.sync(this);
    var _alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
    while (_alt != 2 && _alt != antlr4$1.atn.ATN.INVALID_ALT_NUMBER) {
      if (_alt === 1) {
        this.state = 96;
        this.identifier();
        this.state = 97;
        this.match(GraphParser.Comma);
      }
      this.state = 103;
      this._errHandler.sync(this);
      _alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
    }

    this.state = 108;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    if (_la === GraphParser.Identifier) {
      this.state = 104;
      this.identifier();
      this.state = 106;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === GraphParser.Comma) {
        this.state = 105;
        this.match(GraphParser.Comma);
      }

    }

    this.state = 110;
    this.match(GraphParser.CloseBrace);
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function ModuleContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_module;
  return this;
}

ModuleContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
ModuleContext.prototype.constructor = ModuleContext;

ModuleContext.prototype.identifier = function() {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

ModuleContext.prototype.inferenceDeclaration = function() {
  return this.getTypedRuleContext(InferenceDeclarationContext, 0);
};

ModuleContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterModule(this);
  }
};

ModuleContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitModule(this);
  }
};

ModuleContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitModule(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.ModuleContext = ModuleContext;

GraphParser.prototype.module = function() {

  var localctx = new ModuleContext(this, this._ctx, this.state);
  this.enterRule(localctx, 22, GraphParser.RULE_module);
  try {
    this.state = 114;
    this._errHandler.sync(this);
    var la_ = this._interp.adaptivePredict(this._input, 10, this._ctx);
    switch (la_) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        this.state = 112;
        this.identifier();
        break;

      case 2:
        this.enterOuterAlt(localctx, 2);
        this.state = 113;
        this.inferenceDeclaration();
        break;

    }
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function ExportStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_exportStatement;
  return this;
}

ExportStatementContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
ExportStatementContext.prototype.constructor = ExportStatementContext;

ExportStatementContext.prototype.Export = function() {
  return this.getToken(GraphParser.Export, 0);
};

ExportStatementContext.prototype.module = function() {
  return this.getTypedRuleContext(ModuleContext, 0);
};

ExportStatementContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterExportStatement(this);
  }
};

ExportStatementContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitExportStatement(this);
  }
};

ExportStatementContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitExportStatement(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.ExportStatementContext = ExportStatementContext;

GraphParser.prototype.exportStatement = function() {

  var localctx = new ExportStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 24, GraphParser.RULE_exportStatement);
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 116;
    this.match(GraphParser.Export);
    this.state = 117;
    this.module();
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function StepStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_stepStatement;
  return this;
}

StepStatementContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
StepStatementContext.prototype.constructor = StepStatementContext;

StepStatementContext.prototype.Action = function() {
  return this.getToken(GraphParser.Action, 0);
};

StepStatementContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterStepStatement(this);
  }
};

StepStatementContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitStepStatement(this);
  }
};

StepStatementContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitStepStatement(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.StepStatementContext = StepStatementContext;

GraphParser.prototype.stepStatement = function() {

  var localctx = new StepStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 26, GraphParser.RULE_stepStatement);
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 119;
    this.match(GraphParser.Action);
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function IfStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_ifStatement;
  return this;
}

IfStatementContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
IfStatementContext.prototype.constructor = IfStatementContext;

IfStatementContext.prototype.If = function() {
  return this.getToken(GraphParser.If, 0);
};

IfStatementContext.prototype.expression = function() {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

IfStatementContext.prototype.Result = function() {
  return this.getToken(GraphParser.Result, 0);
};

IfStatementContext.prototype.block = function(i) {
  if (i === undefined) {
    i = null;
  }
  if (i === null) {
    return this.getTypedRuleContexts(BlockContext);
  } else {
    return this.getTypedRuleContext(BlockContext, i);
  }
};

IfStatementContext.prototype.Else = function() {
  return this.getToken(GraphParser.Else, 0);
};

IfStatementContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterIfStatement(this);
  }
};

IfStatementContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitIfStatement(this);
  }
};

IfStatementContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitIfStatement(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.IfStatementContext = IfStatementContext;

GraphParser.prototype.ifStatement = function() {

  var localctx = new IfStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 28, GraphParser.RULE_ifStatement);
  var _la = 0; // Token type
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 121;
    this.match(GraphParser.If);
    this.state = 122;
    this.expression();
    this.state = 123;
    this.match(GraphParser.Result);
    this.state = 124;
    this.block();
    this.state = 127;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    if (_la === GraphParser.Else) {
      this.state = 125;
      this.match(GraphParser.Else);
      this.state = 126;
      this.block();
    }

  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function ExpressionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_expression;
  return this;
}

ExpressionContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.Action = function() {
  return this.getToken(GraphParser.Action, 0);
};

ExpressionContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterExpression(this);
  }
};

ExpressionContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitExpression(this);
  }
};

ExpressionContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitExpression(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.ExpressionContext = ExpressionContext;

GraphParser.prototype.expression = function() {

  var localctx = new ExpressionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 30, GraphParser.RULE_expression);
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 129;
    this.match(GraphParser.Action);
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function SwitchStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_switchStatement;
  return this;
}

SwitchStatementContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
SwitchStatementContext.prototype.constructor = SwitchStatementContext;

SwitchStatementContext.prototype.Switch = function() {
  return this.getToken(GraphParser.Switch, 0);
};

SwitchStatementContext.prototype.expression = function() {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

SwitchStatementContext.prototype.switchBlock = function() {
  return this.getTypedRuleContext(SwitchBlockContext, 0);
};

SwitchStatementContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterSwitchStatement(this);
  }
};

SwitchStatementContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitSwitchStatement(this);
  }
};

SwitchStatementContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitSwitchStatement(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.SwitchStatementContext = SwitchStatementContext;

GraphParser.prototype.switchStatement = function() {

  var localctx = new SwitchStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 32, GraphParser.RULE_switchStatement);
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 131;
    this.match(GraphParser.Switch);
    this.state = 132;
    this.expression();
    this.state = 133;
    this.switchBlock();
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function SwitchBlockContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_switchBlock;
  return this;
}

SwitchBlockContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
SwitchBlockContext.prototype.constructor = SwitchBlockContext;

SwitchBlockContext.prototype.OpenBrace = function() {
  return this.getToken(GraphParser.OpenBrace, 0);
};

SwitchBlockContext.prototype.CloseBrace = function() {
  return this.getToken(GraphParser.CloseBrace, 0);
};

SwitchBlockContext.prototype.caseClauses = function(i) {
  if (i === undefined) {
    i = null;
  }
  if (i === null) {
    return this.getTypedRuleContexts(CaseClausesContext);
  } else {
    return this.getTypedRuleContext(CaseClausesContext, i);
  }
};

SwitchBlockContext.prototype.defaultClause = function() {
  return this.getTypedRuleContext(DefaultClauseContext, 0);
};

SwitchBlockContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterSwitchBlock(this);
  }
};

SwitchBlockContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitSwitchBlock(this);
  }
};

SwitchBlockContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitSwitchBlock(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.SwitchBlockContext = SwitchBlockContext;

GraphParser.prototype.switchBlock = function() {

  var localctx = new SwitchBlockContext(this, this._ctx, this.state);
  this.enterRule(localctx, 34, GraphParser.RULE_switchBlock);
  var _la = 0; // Token type
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 135;
    this.match(GraphParser.OpenBrace);
    this.state = 137;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    if (_la === GraphParser.Case) {
      this.state = 136;
      this.caseClauses();
    }

    this.state = 143;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    if (_la === GraphParser.Default) {
      this.state = 139;
      this.defaultClause();
      this.state = 141;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === GraphParser.Case) {
        this.state = 140;
        this.caseClauses();
      }

    }

    this.state = 145;
    this.match(GraphParser.CloseBrace);
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function CaseClausesContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_caseClauses;
  return this;
}

CaseClausesContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
CaseClausesContext.prototype.constructor = CaseClausesContext;

CaseClausesContext.prototype.caseClause = function(i) {
  if (i === undefined) {
    i = null;
  }
  if (i === null) {
    return this.getTypedRuleContexts(CaseClauseContext);
  } else {
    return this.getTypedRuleContext(CaseClauseContext, i);
  }
};

CaseClausesContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterCaseClauses(this);
  }
};

CaseClausesContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitCaseClauses(this);
  }
};

CaseClausesContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitCaseClauses(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.CaseClausesContext = CaseClausesContext;

GraphParser.prototype.caseClauses = function() {

  var localctx = new CaseClausesContext(this, this._ctx, this.state);
  this.enterRule(localctx, 36, GraphParser.RULE_caseClauses);
  var _la = 0; // Token type
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 148;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    do {
      this.state = 147;
      this.caseClause();
      this.state = 150;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
    } while (_la === GraphParser.Case);
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function CaseClauseContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_caseClause;
  return this;
}

CaseClauseContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
CaseClauseContext.prototype.constructor = CaseClauseContext;

CaseClauseContext.prototype.Case = function() {
  return this.getToken(GraphParser.Case, 0);
};

CaseClauseContext.prototype.expression = function() {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

CaseClauseContext.prototype.Result = function() {
  return this.getToken(GraphParser.Result, 0);
};

CaseClauseContext.prototype.block = function() {
  return this.getTypedRuleContext(BlockContext, 0);
};

CaseClauseContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterCaseClause(this);
  }
};

CaseClauseContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitCaseClause(this);
  }
};

CaseClauseContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitCaseClause(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.CaseClauseContext = CaseClauseContext;

GraphParser.prototype.caseClause = function() {

  var localctx = new CaseClauseContext(this, this._ctx, this.state);
  this.enterRule(localctx, 38, GraphParser.RULE_caseClause);
  var _la = 0; // Token type
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 152;
    this.match(GraphParser.Case);
    this.state = 153;
    this.expression();
    this.state = 154;
    this.match(GraphParser.Result);
    this.state = 156;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    if (_la === GraphParser.OpenBrace) {
      this.state = 155;
      this.block();
    }

  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function DefaultClauseContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_defaultClause;
  return this;
}

DefaultClauseContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
DefaultClauseContext.prototype.constructor = DefaultClauseContext;

DefaultClauseContext.prototype.Default = function() {
  return this.getToken(GraphParser.Default, 0);
};

DefaultClauseContext.prototype.Result = function() {
  return this.getToken(GraphParser.Result, 0);
};

DefaultClauseContext.prototype.block = function() {
  return this.getTypedRuleContext(BlockContext, 0);
};

DefaultClauseContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterDefaultClause(this);
  }
};

DefaultClauseContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitDefaultClause(this);
  }
};

DefaultClauseContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitDefaultClause(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.DefaultClauseContext = DefaultClauseContext;

GraphParser.prototype.defaultClause = function() {

  var localctx = new DefaultClauseContext(this, this._ctx, this.state);
  this.enterRule(localctx, 40, GraphParser.RULE_defaultClause);
  var _la = 0; // Token type
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 158;
    this.match(GraphParser.Default);
    this.state = 159;
    this.match(GraphParser.Result);
    this.state = 161;
    this._errHandler.sync(this);
    _la = this._input.LA(1);
    if (_la === GraphParser.OpenBrace) {
      this.state = 160;
      this.block();
    }

  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function GotoStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_gotoStatement;
  return this;
}

GotoStatementContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
GotoStatementContext.prototype.constructor = GotoStatementContext;

GotoStatementContext.prototype.Goto = function() {
  return this.getToken(GraphParser.Goto, 0);
};

GotoStatementContext.prototype.identifier = function() {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

GotoStatementContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterGotoStatement(this);
  }
};

GotoStatementContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitGotoStatement(this);
  }
};

GotoStatementContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitGotoStatement(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.GotoStatementContext = GotoStatementContext;

GraphParser.prototype.gotoStatement = function() {

  var localctx = new GotoStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 42, GraphParser.RULE_gotoStatement);
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 163;
    this.match(GraphParser.Goto);
    this.state = 164;
    this.identifier();
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


function StartStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }
  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }
  antlr4$1.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = GraphParser.RULE_startStatement;
  return this;
}

StartStatementContext.prototype = Object.create(antlr4$1.ParserRuleContext.prototype);
StartStatementContext.prototype.constructor = StartStatementContext;

StartStatementContext.prototype.Start = function() {
  return this.getToken(GraphParser.Start, 0);
};

StartStatementContext.prototype.module = function() {
  return this.getTypedRuleContext(ModuleContext, 0);
};

StartStatementContext.prototype.enterRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.enterStartStatement(this);
  }
};

StartStatementContext.prototype.exitRule = function(listener) {
  if (listener instanceof GraphParserListener$1) {
    listener.exitStartStatement(this);
  }
};

StartStatementContext.prototype.accept = function(visitor) {
  if (visitor instanceof GraphParserVisitor$1) {
    return visitor.visitStartStatement(this);
  } else {
    return visitor.visitChildren(this);
  }
};




GraphParser.StartStatementContext = StartStatementContext;

GraphParser.prototype.startStatement = function() {

  var localctx = new StartStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 44, GraphParser.RULE_startStatement);
  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 166;
    this.match(GraphParser.Start);
    this.state = 167;
    this.module();
  } catch (re) {
    if (re instanceof antlr4$1.error.RecognitionException) {
      localctx.exception = re;
      this._errHandler.reportError(this, re);
      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }
  return localctx;
};


var GraphParser_2 = GraphParser;

var GraphParser_1 = {
  GraphParser: GraphParser_2
};

class SyntaxError extends Error {
  constructor({ pos, message }) {
    super({ pos, message });

    this.pos = pos;
    this.code = 'SyntaxError';
    this.message = `${message} at line: ${pos.line}, column: ${pos.column}`;

    Error.captureStackTrace(this);
  }
}

var _SyntaxError = SyntaxError;

/**
 * Custom Error Listener
 *
 * @returns {object}
 */
class ErrorListener extends antlr4.error.ErrorListener {
  /**
   * Checks syntax error
   *
   * @param {object} recognizer The parsing support code essentially. Most of it is error recovery stuff
   * @param {object} symbol Offending symbol
   * @param {int} line Line of offending symbol
   * @param {int} column Position in line of offending symbol
   * @param {string} message Error message
   * @param {string} payload Stack trace
   */
  syntaxError(recognizer, symbol, line, column, message, payload) {
    throw new _SyntaxError({ pos: { line, column }, message });
  }
}

var ErrorListener_1 = ErrorListener;

var MyGrammarLexer = GraphLexer_1.GraphLexer;
var MyGrammarParser = GraphParser_1.GraphParser;
var MyGrammarVisitor = GraphParserVisitor_1.GraphParserVisitor;


var antlr = function parser(input) {
  try {
    var chars = new antlr4.InputStream(input);
    var lexer = new MyGrammarLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new MyGrammarParser(tokens);
    parser.removeErrorListeners();
    var listener = new ErrorListener_1();
    parser.addErrorListener(listener);
    parser.buildParseTrees = true;
    var ctx = parser.program();
    var visitor = new MyGrammarVisitor();
    var ast = visitor.visitProgram(ctx);

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
};

module.exports = antlr;