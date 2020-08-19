function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}

var tslib_es6 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	__extends: __extends,
	get __assign () { return __assign; },
	__rest: __rest,
	__decorate: __decorate,
	__param: __param,
	__metadata: __metadata,
	__awaiter: __awaiter,
	__generator: __generator,
	__createBinding: __createBinding,
	__exportStar: __exportStar,
	__values: __values,
	__read: __read,
	__spread: __spread,
	__spreadArrays: __spreadArrays,
	__await: __await,
	__asyncGenerator: __asyncGenerator,
	__asyncDelegator: __asyncDelegator,
	__asyncValues: __asyncValues,
	__makeTemplateObject: __makeTemplateObject,
	__importStar: __importStar,
	__importDefault: __importDefault,
	__classPrivateFieldGet: __classPrivateFieldGet,
	__classPrivateFieldSet: __classPrivateFieldSet
});

var constants = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenKind = exports.KeywordEnum = exports.OperatorEnum = exports.SymbolChar = void 0;
var SymbolChar;
(function (SymbolChar) {
    SymbolChar["OpenBrace"] = "{";
    SymbolChar["CloseBrace"] = "}";
    SymbolChar["OpenBracket"] = "[";
    SymbolChar["CloseBracket"] = "]";
    SymbolChar["OpenAngleBracket"] = "<";
    SymbolChar["CloseAngleBracket"] = ">";
    SymbolChar["Assign"] = "=";
    SymbolChar["Result"] = "->";
    SymbolChar["Comma"] = ",";
    SymbolChar["Quote"] = "\"";
    SymbolChar["Well"] = "#";
})(SymbolChar = exports.SymbolChar || (exports.SymbolChar = {}));
var OperatorEnum;
(function (OperatorEnum) {
    OperatorEnum["OpenBrace"] = "{";
    OperatorEnum["CloseBrace"] = "}";
    OperatorEnum["Assign"] = "=";
    OperatorEnum["Result"] = "->";
    OperatorEnum["Comma"] = ",";
})(OperatorEnum = exports.OperatorEnum || (exports.OperatorEnum = {}));
var KeywordEnum;
(function (KeywordEnum) {
    KeywordEnum["Start"] = "start";
    KeywordEnum["Goto"] = "goto";
    KeywordEnum["If"] = "if";
    KeywordEnum["Else"] = "else";
    KeywordEnum["Switch"] = "switch";
    KeywordEnum["Case"] = "case";
    KeywordEnum["Default"] = "default";
    KeywordEnum["Import"] = "import";
    KeywordEnum["From"] = "from";
    KeywordEnum["Export"] = "export";
})(KeywordEnum = exports.KeywordEnum || (exports.KeywordEnum = {}));
var TokenKind;
(function (TokenKind) {
    TokenKind["Comment"] = "comment";
    TokenKind["Operator"] = "operator";
    TokenKind["Keyword"] = "keyword";
    TokenKind["Identifier"] = "identifier";
    TokenKind["Action"] = "action";
    TokenKind["Path"] = "path";
    TokenKind["EOP"] = "eop";
})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
});

var LexicalError_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexicalError = void 0;
class LexicalError extends Error {
    constructor(message, position) {
        super(message);
        this.kind = 'error';
        this.name = 'LexicalError';
        this.message = message;
        this.position = position;
        this.stack = `${message} at line: ${position.line}, column: ${position.column}`;
    }
}
exports.LexicalError = LexicalError;
});

var util = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLetter = exports.isDigit = exports.isNewLineChar = exports.isWhitespace = exports.isReference = exports.isPath = exports.isAction = exports.isValidContentChar = exports.isOperator = exports.isKeyword = void 0;

const keywords = Object.values(constants.KeywordEnum);
exports.isKeyword = (word) => {
    return keywords.includes(word);
};
const operators = Object.values(constants.OperatorEnum);
exports.isOperator = (word) => {
    return operators.includes(word);
};
exports.isValidContentChar = (char) => {
    return /[^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]/g.test(char);
};
exports.isAction = (word) => {
    return /\[([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\]/.test(word);
};
exports.isPath = (word) => {
    return /\"([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\"/g.test(word);
};
exports.isReference = (word) => {
    return /<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)>/g.test(word);
};
exports.isWhitespace = (char) => {
    return /\s/.test(char) && char.length === 1;
};
exports.isNewLineChar = (char) => {
    return /[\r\n]+/.test(char);
};
exports.isDigit = (char) => {
    return /\d/.test(char) && char.length === 1;
};
exports.isLetter = (char) => {
    return /[a-zA-Z]/.test(char) && char.length === 1;
};
});

var lexer = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLexer = void 0;




tslib_es6.__exportStar(constants, exports);
tslib_es6.__exportStar(LexicalError_1, exports);
exports.createLexer = (input) => {
    let offset = 0;
    let forward = 0;
    let line = 1;
    let column = 1;
    let tokens = [];
    let lexicalErrors = [];
    const run = () => {
        while (!isEoP()) {
            const result = nextToken();
            if (result.kind === 'error') {
                lexicalErrors.push(result);
            }
            else {
                tokens.push(result);
            }
        }
        if (tokens.length === 0 || tokens[tokens.length - 1].kind !== constants.TokenKind.EOP) {
            tokens.push({
                kind: constants.TokenKind.EOP,
                word: null,
                range: getRange()
            });
        }
        return tokens[tokens.length - 1];
    };
    const next = () => {
        if (isEoP() && tokens.length > 0) {
            if (tokens[tokens.length - 1].kind !== constants.TokenKind.EOP) {
                tokens.push({
                    kind: constants.TokenKind.EOP,
                    word: null,
                    range: getRange()
                });
            }
            return tokens[tokens.length - 1];
        }
        let result = nextToken();
        while (true) {
            if (result.kind === 'error') {
                lexicalErrors.push(result);
            }
            else {
                tokens.push(result);
                break;
            }
            result = nextToken();
        }
        return result;
    };
    const nextToken = () => {
        const result = consumeWhitespace();
        if (result) {
            return result;
        }
        const char = getCurrentChar();
        switch (char) {
            case constants.SymbolChar.Well: {
                return matchComment();
            }
            case constants.SymbolChar.OpenAngleBracket: {
                return matchIdentifier();
            }
            case constants.SymbolChar.OpenBracket: {
                return matchAction();
            }
            case constants.SymbolChar.Quote: {
                return matchPath();
            }
            default: {
                if (util.isLetter(char)) {
                    return matchKeyword();
                }
                else {
                    return matchOperator();
                }
            }
        }
    };
    const consumeWhitespace = () => {
        while (true) {
            const char = getCurrentChar();
            if (isEoP()) {
                return {
                    kind: constants.TokenKind.EOP,
                    word: null,
                    range: getRange()
                };
            }
            if (util.isWhitespace(char)) {
                if (util.isNewLineChar(char)) {
                    nextLine();
                }
                nextChar();
                continue;
            }
            endWord();
            return null;
        }
    };
    const matchComment = () => {
        while (!isEoP() && !util.isNewLineChar(nextChar()))
            ;
        const word = getCurrentWord();
        const range = getRange();
        endWord();
        return {
            kind: constants.TokenKind.Comment,
            word,
            range
        };
    };
    const matchIdentifier = () => {
        let char;
        while (true) {
            char = nextChar();
            if (char === constants.SymbolChar.CloseAngleBracket) {
                nextChar();
                const word = getCurrentWord();
                const range = getRange();
                endWord();
                return {
                    kind: constants.TokenKind.Identifier,
                    word,
                    range
                };
            }
            if (isEoP() || !util.isValidContentChar(char)) {
                const word = getCurrentWord();
                return new LexicalError_1.LexicalError(`Identifier: ${word} has not been closed`, getPosition());
            }
        }
    };
    const matchAction = () => {
        let char;
        while (true) {
            char = nextChar();
            if (char === constants.SymbolChar.CloseBracket) {
                nextChar();
                const word = getCurrentWord();
                const range = getRange();
                endWord();
                return {
                    kind: constants.TokenKind.Action,
                    word,
                    range
                };
            }
            if (isEoP() || !util.isValidContentChar(char)) {
                const word = getCurrentWord();
                return new LexicalError_1.LexicalError(`Action: ${word} has not been closed`, getPosition());
            }
        }
    };
    const matchPath = () => {
        let char;
        while (true) {
            char = nextChar();
            if (char === constants.SymbolChar.Quote) {
                nextChar();
                const word = getCurrentWord();
                const range = getRange();
                endWord();
                return {
                    kind: constants.TokenKind.Path,
                    word,
                    range
                };
            }
            if (isEoP() || !util.isValidContentChar(char)) {
                const word = getCurrentWord();
                return new LexicalError_1.LexicalError(`Path: ${word} has not been closed`, getPosition());
            }
        }
    };
    const matchKeyword = () => {
        let char;
        while (true) {
            char = nextChar();
            if (isEoP() || !util.isLetter(char)) {
                const word = getCurrentWord();
                if (util.isKeyword(word)) {
                    const range = getRange();
                    endWord();
                    return {
                        kind: constants.TokenKind.Keyword,
                        word: word,
                        range
                    };
                }
                else {
                    return new LexicalError_1.LexicalError(`Unknown token: ${word}`, getPosition());
                }
            }
        }
    };
    const matchOperator = () => {
        const char = getCurrentChar();
        switch (char) {
            case constants.OperatorEnum.OpenBrace: {
                nextChar();
                const range = getRange();
                endWord();
                return {
                    kind: constants.TokenKind.Operator,
                    word: constants.OperatorEnum.OpenBrace,
                    range
                };
            }
            case constants.OperatorEnum.CloseBrace: {
                nextChar();
                const range = getRange();
                endWord();
                return {
                    kind: constants.TokenKind.Operator,
                    word: constants.OperatorEnum.CloseBrace,
                    range
                };
            }
            case constants.OperatorEnum.Assign: {
                nextChar();
                const range = getRange();
                endWord();
                return {
                    kind: constants.TokenKind.Operator,
                    word: constants.OperatorEnum.Assign,
                    range
                };
            }
            case constants.OperatorEnum.Result[0]: {
                const nc = nextChar();
                if (nc === constants.OperatorEnum.Result[1]) {
                    nextChar();
                    const range = getRange();
                    endWord();
                    return {
                        kind: constants.TokenKind.Operator,
                        word: constants.OperatorEnum.Result,
                        range
                    };
                }
                else {
                    nextChar();
                    const word = getCurrentWord();
                    return new LexicalError_1.LexicalError(`Unknown token: ${word}`, getPosition());
                }
            }
            case constants.OperatorEnum.Comma: {
                nextChar();
                const range = getRange();
                endWord();
                return {
                    kind: constants.TokenKind.Operator,
                    word: constants.OperatorEnum.Comma,
                    range
                };
            }
            default: {
                nextChar();
                return new LexicalError_1.LexicalError(`Unknown token: ${char}`, getPosition());
            }
        }
    };
    const nextChar = () => {
        forward++;
        column++;
        return input[forward];
    };
    const nextLine = () => {
        line++;
        column = 1;
    };
    const endWord = () => {
        offset = forward;
        forward = offset;
    };
    const getCurrentWord = () => {
        return input.slice(offset, forward);
    };
    const getCurrentChar = () => {
        return input[forward] || '';
    };
    const getPosition = () => {
        return {
            line,
            column
        };
    };
    const getRange = () => {
        const length = forward - offset;
        return {
            start: {
                line,
                column: column - length - 1
            },
            end: {
                line,
                column: column - 1
            }
        };
    };
    const isEoP = () => {
        return forward >= input.length;
    };
    return {
        get tokens() {
            return tokens;
        },
        get lexicalErrors() {
            return lexicalErrors;
        },
        getPosition,
        next,
        run
    };
};
});

var _SyntaxError = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxError = void 0;
class SyntaxError extends Error {
    constructor(message, token) {
        super(message);
        this.kind = 'error';
        this.name = 'SyntaxError';
        this.message = message;
        this.token = token;
        this.stack = `${message} at line: ${token.range.start.line}, column: ${token.range.start.column}`;
    }
}
exports.SyntaxError = SyntaxError;
});

var ast = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGotoStatement = exports.createDefaultClause = exports.createCaseClause = exports.createSwitchBlock = exports.createSwitchStatement = exports.createIfStatement = exports.createStepStatement = exports.createBlock = exports.createStartStatement = exports.createExportStatement = exports.createModule = exports.createModuleItems = exports.createImportStatement = exports.createInferenceDefinition = exports.createProgram = exports.FragmentKind = void 0;
var FragmentKind;
(function (FragmentKind) {
    FragmentKind["Program"] = "Program";
    FragmentKind["InferenceDefinition"] = "InferenceDefinition";
    FragmentKind["ImportStatement"] = "ImportStatement";
    FragmentKind["ModuleItems"] = "ModuleItems";
    FragmentKind["Module"] = "Module";
    FragmentKind["ExportStatement"] = "ExportStatement";
    FragmentKind["StartStatement"] = "StartStatement";
    FragmentKind["Block"] = "Block";
    FragmentKind["StepStatement"] = "StepStatement";
    FragmentKind["IfStatement"] = "IfStatement";
    FragmentKind["SwitchStatement"] = "SwitchStatement";
    FragmentKind["SwitchBlock"] = "SwitchBlock";
    FragmentKind["CaseClause"] = "CaseClause";
    FragmentKind["DefaultClause"] = "DefaultClause";
    FragmentKind["GotoStatement"] = "GotoStatement";
})(FragmentKind = exports.FragmentKind || (exports.FragmentKind = {}));
exports.createProgram = (moduleStatemens, range) => {
    return {
        kind: FragmentKind.Program,
        moduleStatemens,
        range
    };
};
exports.createInferenceDefinition = (identifier, block, range) => {
    return {
        kind: FragmentKind.InferenceDefinition,
        identifier,
        block,
        range
    };
};
exports.createImportStatement = (moduleItems, path, range) => {
    return {
        kind: FragmentKind.ImportStatement,
        moduleItems,
        path,
        range
    };
};
exports.createModuleItems = (identifiers, range) => {
    return {
        kind: FragmentKind.ModuleItems,
        identifiers,
        range
    };
};
exports.createModule = (identifier, definition, range) => {
    return {
        kind: FragmentKind.Module,
        identifier,
        definition,
        range
    };
};
exports.createExportStatement = (module, range) => {
    return {
        kind: FragmentKind.ExportStatement,
        module,
        range
    };
};
exports.createStartStatement = (module, range) => {
    return {
        kind: FragmentKind.StartStatement,
        module,
        range
    };
};
exports.createBlock = (list, range) => {
    return {
        kind: FragmentKind.Block,
        list,
        range
    };
};
exports.createStepStatement = (expression, range) => {
    return {
        kind: FragmentKind.StepStatement,
        expression,
        range
    };
};
exports.createIfStatement = (expression, ifBlock, elseBlock, range) => {
    return {
        kind: FragmentKind.IfStatement,
        expression,
        ifBlock,
        elseBlock,
        range
    };
};
exports.createSwitchStatement = (expression, switchBlock, range) => {
    return {
        kind: FragmentKind.SwitchStatement,
        expression,
        switchBlock,
        range
    };
};
exports.createSwitchBlock = (caseClauses, defaultClause, range) => {
    return {
        kind: FragmentKind.SwitchBlock,
        caseClauses,
        defaultClause,
        range
    };
};
exports.createCaseClause = (expression, block, range) => {
    return {
        kind: FragmentKind.CaseClause,
        expression,
        block,
        range
    };
};
exports.createDefaultClause = (block, range) => {
    return {
        kind: FragmentKind.DefaultClause,
        block,
        range
    };
};
exports.createGotoStatement = (identifier, range) => {
    return {
        kind: FragmentKind.GotoStatement,
        identifier,
        range
    };
};
});

var parser = createCommonjsModule(function (module, exports) {
/**
 * 递归下降分析法(recursive-descent parsing)
 *
 * 预测分析法(prdictive parsing)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParser = void 0;





tslib_es6.__exportStar(ast, exports);
tslib_es6.__exportStar(_SyntaxError, exports);
exports.createParser = (input) => {
    const lexer$1 = lexer.createLexer(input);
    let token = null;
    let cache = [];
    let program = null;
    let errors = [];
    const parse = () => {
        if (program) {
            return;
        }
        program = matchProgram();
    };
    const getNextToken = () => {
        while (true) {
            const tok = lexer$1.next();
            if (tok.kind !== constants.TokenKind.Comment) {
                return tok;
            }
        }
    };
    const nextToken = () => {
        if (cache.length > 0) {
            token = cache.shift();
        }
        else {
            token = getNextToken();
        }
        return token;
    };
    const predict = (key = 0) => {
        if (token && token.kind === constants.TokenKind.EOP) {
            return token;
        }
        if (cache.length > key) {
            return cache[key];
        }
        else {
            const token = getNextToken();
            cache.push(token);
            return token;
        }
    };
    /**
     * program
     *  : moduleStatement* EOP
     *  ;
     *
     * FIRST(program) = { EOP, FIRST(moduleStatement) }
     * FOLLOW(program) = { e }
     */
    const matchProgram = () => {
        let moduleStatemens = [];
        while (true) {
            const lookahead = predict();
            if (lookahead.kind !== constants.TokenKind.EOP) {
                const moduleStatement = matchModuleStatement();
                if (moduleStatement === null) {
                    recoveryFromProgram();
                }
                else {
                    moduleStatemens.push(moduleStatement);
                }
            }
            else {
                break;
            }
        }
        return ast.createProgram(moduleStatemens, {
            start: {
                line: 1,
                column: 1
            },
            end: lexer$1.getPosition()
        });
    };
    /**
     * moduleStatement
     *  : inferenceDefinition
     *  | importStatement
     *  | exportStatement
     *  | startStatement
     *  ;
     *
     * FIRST(moduleStatement) = { Import, Export, Start, Identifier }
     * FOLLOW(moduleStatement) = { FIRST(moduleStatement), EOF }
     */
    const matchModuleStatement = () => {
        const lookahead = predict();
        if (lookahead.kind === constants.TokenKind.Keyword) {
            switch (lookahead.word) {
                case constants.KeywordEnum.Import: {
                    return matchImportStatement();
                }
                case constants.KeywordEnum.Export: {
                    return matchExportStatement();
                }
                case constants.KeywordEnum.Start: {
                    return matchStartStatement();
                }
            }
        }
        else {
            if (lookahead.kind === constants.TokenKind.Identifier) {
                return matchInferenceDefinition();
            }
        }
        reportError(`'${constants.KeywordEnum.Start}', '${constants.KeywordEnum.Export}', '${constants.KeywordEnum.Import}', Identifier: <somethings>`, lookahead);
        return null;
    };
    /**
     * inferenceDefinition
     *  : identifier '=' block
     *  ;
     *
     * FIRST(inferenceDefinition) = { identifier }
     * FOLLOW(inferenceDefinition) = { FOLLOW(moduleStatement), FOLLOW(module) }
     */
    const matchInferenceDefinition = () => {
        if (requireIdentifier()) {
            const identifier = token;
            if (requireOperator(constants.OperatorEnum.Assign)) {
                const block = matchBlock();
                if (block === null) {
                    return null;
                }
                else {
                    return ast.createInferenceDefinition(identifier, block, {
                        start: identifier.range.start,
                        end: block.range.end
                    });
                }
            }
            else {
                reportError(constants.OperatorEnum.Assign, token);
                return null;
            }
        }
        else {
            reportError('Identifier: <somethings>', token);
            return null;
        }
    };
    /**
     * block
     *  : '{' statement*'}'
     *  ;
     *
     * FIRST(block) = { OpenBrace }
     * FOLLOW(block) = { FOLLOW(inferenceDefinition), Else, FOLLOW(ifStatement), FOLLOW(caseClause), FOLLOW(defaultClause) }
     */
    const matchBlock = () => {
        if (requireOperator(constants.OperatorEnum.OpenBrace)) {
            const start = token.range.start;
            let list = [];
            while (true) {
                const lookahead = predict();
                if (lookahead.kind === constants.TokenKind.Operator && lookahead.word === constants.OperatorEnum.CloseBrace) {
                    nextToken();
                    return ast.createBlock(list, {
                        start,
                        end: lookahead.range.end
                    });
                }
                if (lookahead.kind === constants.TokenKind.EOP) {
                    reportError(constants.OperatorEnum.CloseBrace, lookahead);
                    return null;
                }
                const statement = matchStatement();
                if (statement === null) {
                    recoveryFromBlock();
                }
                else {
                    list.push(statement);
                }
            }
        }
        else {
            reportError(constants.OperatorEnum.OpenBrace, token);
            return null;
        }
    };
    /**
     * importStatement
     *  : Import moduleItems From path
     *  ;
     *
     * FIRST(importStatement) = { Import }
     * FOLLOW(importStatement) = { FOLLOW(moduleStatement) }
     */
    const matchImportStatement = () => {
        if (requireKeyword(constants.KeywordEnum.Import)) {
            const start = token.range.start;
            const moduleItems = matchModuleItems();
            if (moduleItems) {
                if (requireKeyword(constants.KeywordEnum.From)) {
                    if (requirePath()) {
                        const path = token;
                        return ast.createImportStatement(moduleItems, path, {
                            start,
                            end: token.range.end
                        });
                    }
                    else {
                        reportError('Path: "somethings"', token);
                        return null;
                    }
                }
                else {
                    reportError(constants.KeywordEnum.From, token);
                    return null;
                }
            }
            else {
                return null;
            }
        }
        else {
            reportError(constants.KeywordEnum.Import, token);
            return null;
        }
    };
    /**
     * moduleItems
     *  : '{' (identifier ',')* (identifier ','?)? '}'
     *  ;
     *
     * FIRST(moduleItems) = { OpenBrace }
     * FOLLOW(moduleItems) = { From }
     */
    const matchModuleItems = () => {
        let identifiers = [];
        if (requireOperator(constants.OperatorEnum.OpenBrace)) {
            const start = token.range.start;
            if (requireIdentifier()) {
                identifiers.push(token);
                while (true) {
                    if (requireOperator(constants.OperatorEnum.Comma)) {
                        if (requireIdentifier()) {
                            identifiers.push(token);
                        }
                        else if (token.kind === constants.TokenKind.Operator && token.word === constants.OperatorEnum.CloseBrace) {
                            return ast.createModuleItems(identifiers, {
                                start,
                                end: token.range.end
                            });
                        }
                        else {
                            recoveryFromBlock();
                            return ast.createModuleItems(identifiers, {
                                start,
                                end: token.range.end
                            });
                        }
                    }
                    else if (token.kind === constants.TokenKind.Operator && token.word === constants.OperatorEnum.CloseBrace) {
                        return ast.createModuleItems(identifiers, {
                            start,
                            end: token.range.end
                        });
                    }
                    else {
                        reportError('Identifier: <somethings>', token);
                        return null;
                    }
                }
            }
            else {
                reportError('Identifier: <somethings>', token);
                return null;
            }
        }
        else {
            reportError(constants.OperatorEnum.OpenBrace, token);
            return null;
        }
    };
    /**
     * exportStatement
     *  : Export module
     *  ;
     *
     * FIRST(exportStatement) = { Export }
     * FOLLOW(exportStatement) = { FOLLOW(moduleStatement) }
     */
    const matchExportStatement = () => {
        if (requireKeyword(constants.KeywordEnum.Export)) {
            const start = token.range.start;
            const module = matchModule();
            if (module) {
                return ast.createExportStatement(module, {
                    start,
                    end: module.range.end
                });
            }
            else {
                return null;
            }
        }
        else {
            reportError(constants.KeywordEnum.Export, token);
            return null;
        }
    };
    /**
     * startStatement
     *  : Start module
     *  ;
     *
     * FIRST(startStatement) = { Start }
     * FOLLOW(startStatement) = { FOLLOW(moduleStatement) }
     */
    const matchStartStatement = () => {
        if (requireKeyword(constants.KeywordEnum.Start)) {
            const start = token.range.start;
            const module = matchModule();
            if (module) {
                return ast.createStartStatement(module, {
                    start,
                    end: module.range.end
                });
            }
            else {
                return null;
            }
        }
        else {
            reportError(constants.KeywordEnum.Start, token);
            return null;
        }
    };
    /**
     * module
     * : identifier
     * | inferenceDefinition
     * ;
     *
     * FIRST(module) = { Identifier }
     * FOLLOW(module) = { FOLLOW(startStatement), FOLLOW(exportStatement) }
     */
    const matchModule = () => {
        const lookahead = predict();
        if (lookahead.kind === constants.TokenKind.Identifier) {
            const identifier = lookahead;
            const lookahead2 = predict(1);
            if (lookahead2.kind === constants.TokenKind.Operator && lookahead2.word === constants.OperatorEnum.Assign) {
                const definition = matchInferenceDefinition();
                if (definition) {
                    return ast.createModule(identifier, definition, definition.range);
                }
                else {
                    return ast.createModule(identifier, null, identifier.range);
                }
            }
            else {
                nextToken();
                return ast.createModule(identifier, null, identifier.range);
            }
        }
        else {
            reportError('Identifier: <somethings>', lookahead);
            return null;
        }
    };
    /**
     * statement
     *  : stepStatement
     *  | ifStatement
     *  | switchStatement
     *  | gotoStatement
     *  ;
     *
     * FIRST(statement) = { If, Switch, Goto, Action }
     * FOLLOW(statement) = { FIRST(statement), CloseBrace }
     */
    const matchStatement = () => {
        const lookahead = predict();
        if (lookahead.kind === constants.TokenKind.Keyword) {
            switch (lookahead.word) {
                case constants.KeywordEnum.If: {
                    return matchIfStatement();
                }
                case constants.KeywordEnum.Switch: {
                    return matchSwitchStatement();
                }
                case constants.KeywordEnum.Goto: {
                    return matchGotoStatement();
                }
            }
        }
        else {
            if (lookahead.kind === constants.TokenKind.Action) {
                return matchStepStatement();
            }
        }
        reportError(`'${constants.KeywordEnum.If}', '${constants.KeywordEnum.Switch}', '${constants.KeywordEnum.Goto}', Action: [somethings]`, lookahead);
        return null;
    };
    /**
     * stepStatement
     *  : Action
     *  ;
     *
     * FIRST(stepStatement) = { Action }
     * FOLLOW(stepStatement) = { FOLLOW(statement) }
     */
    const matchStepStatement = () => {
        nextToken();
        const expression = token;
        return ast.createStepStatement(expression, token.range);
    };
    /**
     * ifStatement
     *  : If expression '->' block (Else block)?
     *  ;
     *
     * FRIST(ifStatement) = { If }
     * FOLLOW(ifStatement) = { FOLLOW(statement) }
     */
    const matchIfStatement = () => {
        if (requireKeyword(constants.KeywordEnum.If)) {
            const start = token.range.start;
            if (requireAction()) {
                const expression = token;
                if (requireOperator(constants.OperatorEnum.Result)) {
                    let ifBlock = matchBlock();
                    if (ifBlock) {
                        const lookahead = predict();
                        if (lookahead.kind === constants.TokenKind.Keyword && lookahead.word === constants.KeywordEnum.Else) {
                            nextToken();
                            const elseBlock = matchBlock();
                            if (elseBlock) {
                                return ast.createIfStatement(expression, ifBlock, elseBlock, {
                                    start,
                                    end: elseBlock.range.end
                                });
                            }
                            else {
                                return ast.createIfStatement(expression, ifBlock, null, {
                                    start,
                                    end: ifBlock.range.end
                                });
                            }
                        }
                        else {
                            return ast.createIfStatement(expression, ifBlock, null, {
                                start,
                                end: ifBlock.range.end
                            });
                        }
                    }
                    else {
                        return null;
                    }
                }
                else {
                    reportError(constants.OperatorEnum.Result, token);
                    return null;
                }
            }
            else {
                reportError('Action: [somethings]', token);
                return null;
            }
        }
        else {
            reportError(constants.KeywordEnum.If, token);
            return null;
        }
    };
    /**
     * switchStatement
     *  : Switch expression switchBlock
     *  ;
     *
     * FRIST(switchStatement) = { Switch }
     * FOLLOW(switchStatement) = { FOLLOW(statement) }
     */
    const matchSwitchStatement = () => {
        if (requireKeyword(constants.KeywordEnum.Switch)) {
            const start = token.range.start;
            if (requireAction()) {
                const expression = token;
                const switchBlock = matchSwitchBlock();
                if (switchBlock) {
                    return ast.createSwitchStatement(expression, switchBlock, {
                        start,
                        end: switchBlock.range.end
                    });
                }
                else {
                    return null;
                }
            }
            else {
                reportError('Action: [somethings]', token);
                return null;
            }
        }
        else {
            reportError(constants.KeywordEnum.Switch, token);
            return null;
        }
    };
    /**
     * switchBlock
     *  : '{' caseClause* (defaultClause caseClause*)? '}'
     *  ;
     *
     * FIRST(switchBlock) = { OpenBrace }
     * FOLLOW(switchBlock) = { FOLLOW(switchStatement) }
     */
    const matchSwitchBlock = () => {
        if (requireOperator(constants.OperatorEnum.OpenBrace)) {
            const start = token.range.start;
            let caseClauses = [];
            let defaultClause = null;
            while (true) {
                nextToken();
                if (token.kind === constants.TokenKind.Operator && token.word === constants.OperatorEnum.CloseBrace) {
                    return ast.createSwitchBlock(caseClauses, defaultClause, {
                        start,
                        end: token.range.end
                    });
                }
                else if (token.kind === constants.TokenKind.Keyword && token.word === constants.KeywordEnum.Case) {
                    const caseClause = matchCaseClause();
                    if (caseClause) {
                        caseClauses.push(caseClause);
                    }
                }
                else if (token.kind === constants.TokenKind.Keyword && token.word === constants.KeywordEnum.Default) {
                    const dc = matchDefaultClause();
                    if (dc) {
                        defaultClause = dc;
                    }
                }
                else {
                    reportError(`'${constants.KeywordEnum.Case}', '${constants.KeywordEnum.Default}', '${constants.OperatorEnum.CloseBrace}'`, token);
                    return null;
                }
            }
        }
        else {
            reportError(constants.OperatorEnum.OpenBrace, token);
            return null;
        }
    };
    /**
     * caseClause
     *  : Case expression '->' block?
     *  ;
     *
     * FIRST(caseClause) = { Case }
     * FOLLOW(caseClause) = { FIRST(caseClause), FIRST(defaultClause), CloseBrace }
     */
    const matchCaseClause = () => {
        const start = token.range.start;
        if (requireAction()) {
            const expression = token;
            if (requireOperator(constants.OperatorEnum.Result)) {
                const block = matchBlock();
                if (block) {
                    return ast.createCaseClause(expression, block, {
                        start,
                        end: block.range.end
                    });
                }
                else {
                    return null;
                }
            }
            else {
                reportError(constants.OperatorEnum.Result, token);
                return null;
            }
        }
        else {
            reportError('Action: [somethings]', token);
            return null;
        }
    };
    /**
     * defaultClause
     *  : Default '->' block?
     *  ;
     *
     * FIRST(defaultClause) = { Default }
     * FOLLOW(defaultClause) = { FIRST(caseClause), FIRST(defaultClause), CloseBrace }
     */
    const matchDefaultClause = () => {
        const start = token.range.start;
        if (requireOperator(constants.OperatorEnum.Result)) {
            const block = matchBlock();
            if (block) {
                return ast.createDefaultClause(block, {
                    start,
                    end: block.range.end
                });
            }
            else {
                return null;
            }
        }
        else {
            reportError(constants.OperatorEnum.Result, token);
            return null;
        }
    };
    /**
     * gotoStatement
     *  : Goto identifier
     *  ;
     *
     * FRIST(gotoStatement) = { Goto }
     * FOLLOW(gotoStatement) = { FOLLOW(statement) }
     */
    const matchGotoStatement = () => {
        if (requireKeyword(constants.KeywordEnum.Goto)) {
            const start = token.range.start;
            if (requireIdentifier()) {
                const identifier = token;
                return ast.createGotoStatement(identifier, {
                    start,
                    end: token.range.end
                });
            }
            else {
                reportError(`Identifier: <somethings>`, token);
                return null;
            }
        }
        else {
            reportError(constants.KeywordEnum.Goto, token);
            return null;
        }
    };
    const requirePath = () => {
        nextToken();
        return token.kind === constants.TokenKind.Path;
    };
    const requireAction = () => {
        nextToken();
        return token.kind === constants.TokenKind.Action;
    };
    const requireIdentifier = () => {
        nextToken();
        return token.kind === constants.TokenKind.Identifier;
    };
    const requireKeyword = (keyword) => {
        nextToken();
        return token.kind === constants.TokenKind.Keyword && token.word === keyword;
    };
    const requireOperator = (operator) => {
        nextToken();
        return token.kind === constants.TokenKind.Operator && token.word === operator;
    };
    const reportError = (expect, token) => {
        errors.push(new _SyntaxError.SyntaxError(`Expect { ${expect} }, accept '${token.word}'`, token));
    };
    const recoveryFromBlock = () => {
        while (true) {
            const lookahead = predict();
            if ((lookahead.kind === constants.TokenKind.Keyword && lookahead.word === constants.KeywordEnum.If)
                || (lookahead.kind === constants.TokenKind.Keyword && lookahead.word === constants.KeywordEnum.Switch)
                || (lookahead.kind === constants.TokenKind.Keyword && lookahead.word === constants.KeywordEnum.Goto)
                || (lookahead.kind === constants.TokenKind.Action)
                || lookahead.kind === constants.TokenKind.EOP) {
                break;
            }
            else {
                nextToken();
                if (lookahead.kind === constants.TokenKind.Operator && lookahead.word === constants.OperatorEnum.CloseBrace) {
                    break;
                }
            }
        }
    };
    const recoveryFromProgram = () => {
        while (true) {
            const lookahead = predict();
            if ((lookahead.kind === constants.TokenKind.Keyword && lookahead.word === constants.KeywordEnum.Start)
                || (lookahead.kind === constants.TokenKind.Keyword && lookahead.word === constants.KeywordEnum.Import)
                || (lookahead.kind === constants.TokenKind.Keyword && lookahead.word === constants.KeywordEnum.Export)
                || (lookahead.kind === constants.TokenKind.Identifier)
                || lookahead.kind === constants.TokenKind.EOP) {
                break;
            }
            else {
                nextToken();
            }
        }
    };
    return {
        get program() {
            return program;
        },
        get tokens() {
            return lexer$1.tokens;
        },
        get lexcialErrors() {
            return lexer$1.lexicalErrors;
        },
        get syntaxErrors() {
            return errors;
        },
        parse
    };
};
});

var SemanticError_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticError = void 0;
class SemanticError extends Error {
    constructor(message, fragment) {
        super(message);
        this.kind = 'error';
        this.name = 'SemanticError';
        this.message = message;
        this.fragment = fragment;
        this.range = fragment.range;
        this.stack = `${message} at line: ${fragment.range.start.line}, column: ${fragment.range.start.column}`;
    }
}
exports.SemanticError = SemanticError;
});

var semantic = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.analysis = void 0;



tslib_es6.__exportStar(SemanticError_1, exports);
exports.analysis = (program) => {
    let inferenceTable = new Map();
    let semanticErrors = [];
    const record = () => {
        program.moduleStatemens.forEach((moduleStatement) => {
            switch (moduleStatement.kind) {
                case ast.FragmentKind.ImportStatement: {
                    recordImport(moduleStatement);
                    break;
                }
                case ast.FragmentKind.InferenceDefinition: {
                    recordDefinition(moduleStatement);
                    break;
                }
                case ast.FragmentKind.StartStatement: {
                    recordStart(moduleStatement);
                    break;
                }
            }
        });
    };
    const recordImport = (importStatement) => {
        importStatement.moduleItems.identifiers.forEach((identifier) => {
            addInference({
                identifier,
                definition: importStatement
            });
        });
    };
    const recordDefinition = (inferenceDefinition) => {
        addInference({
            identifier: inferenceDefinition.identifier,
            definition: inferenceDefinition
        });
    };
    const recordStart = (startStatement) => {
        if (startStatement.module.definition) {
            addInference({
                identifier: startStatement.module.identifier,
                definition: startStatement.module.definition
            });
        }
    };
    const addInference = (inference) => {
        const name = getContent(inference.identifier.word);
        if (inferenceTable.has(name)) {
            reportError(`Module ${name} has been declared twice`, inference.definition);
        }
        else {
            inferenceTable.set(name, inference);
        }
    };
    const checkProgram = (program) => {
        program.moduleStatemens.forEach(checkModuleStatement);
    };
    const checkModuleStatement = (moduleStatement) => {
        switch (moduleStatement.kind) {
            case ast.FragmentKind.ImportStatement: {
                checkImportStatement(moduleStatement);
                break;
            }
            case ast.FragmentKind.ExportStatement: {
                checkExportStatement(moduleStatement);
                break;
            }
            case ast.FragmentKind.StartStatement: {
                checkStartStatement(moduleStatement);
                break;
            }
            case ast.FragmentKind.InferenceDefinition: {
                checkInferenceDefinition(moduleStatement);
                break;
            }
        }
    };
    const checkInferenceDefinition = (inferenceDefinition) => {
        checkBlock(inferenceDefinition.block);
    };
    const checkImportStatement = (importStatement) => {
        checkModuleItems(importStatement.moduleItems);
    };
    const checkModuleItems = (moduleItems) => {
    };
    const checkModule = (module) => {
        const name = getContent(module.identifier.word);
        if (!inferenceTable.has(name)) {
            reportError(`Module ${name} has not been declared`, module);
        }
        if (module.definition) {
            checkInferenceDefinition(module.definition);
        }
    };
    const checkExportStatement = (exportStatement) => {
        checkModule(exportStatement.module);
    };
    const checkStartStatement = (startStatement) => {
        checkModule(startStatement.module);
    };
    const checkBlock = (block) => {
        block.list.forEach(checkStatement);
    };
    const checkStatement = (statement) => {
        switch (statement.kind) {
            case ast.FragmentKind.StepStatement: {
                break;
            }
            case ast.FragmentKind.IfStatement: {
                checkIfStatement(statement);
                break;
            }
            case ast.FragmentKind.SwitchStatement: {
                checkSwitchStatement(statement);
                break;
            }
            case ast.FragmentKind.GotoStatement: {
                checkGotoStatement(statement);
                break;
            }
        }
    };
    const checkIfStatement = (ifStatement) => {
        checkBlock(ifStatement.ifBlock);
        if (ifStatement.elseBlock) {
            checkBlock(ifStatement.elseBlock);
        }
    };
    const checkSwitchStatement = (switchStatement) => {
        checkSwitchBlock(switchStatement.switchBlock);
    };
    const checkSwitchBlock = (switchBlock) => {
        switchBlock.caseClauses.forEach(checkCaseClause);
        if (switchBlock.defaultClause) {
            checkDefaultClause(switchBlock.defaultClause);
        }
    };
    const checkCaseClause = (caseClause) => {
        checkBlock(caseClause.block);
    };
    const checkDefaultClause = (defaultClause) => {
        checkBlock(defaultClause.block);
    };
    const checkGotoStatement = (gotoStatement) => {
        const name = getContent(gotoStatement.identifier.word);
        if (!inferenceTable.has(name)) {
            reportError(`Module ${name} has not been declared`, gotoStatement);
        }
    };
    const reportError = (message, fragment) => {
        semanticErrors.push(new SemanticError_1.SemanticError(message, fragment));
    };
    record();
    checkProgram(program);
    return {
        get semanticErrors() {
            return semanticErrors;
        },
        get table() {
            return inferenceTable;
        }
    };
};
const getContent = (word) => {
    return word.slice(1, word.length - 1);
};
});

var src = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(lexer, exports);
tslib_es6.__exportStar(parser, exports);
tslib_es6.__exportStar(semantic, exports);
});

var index = /*@__PURE__*/getDefaultExportFromCjs(src);

export default index;
