export var SymbolChar;
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
})(SymbolChar || (SymbolChar = {}));
export var OperatorEnum;
(function (OperatorEnum) {
    OperatorEnum["OpenBrace"] = "{";
    OperatorEnum["CloseBrace"] = "}";
    OperatorEnum["Assign"] = "=";
    OperatorEnum["Result"] = "->";
    OperatorEnum["Comma"] = ",";
})(OperatorEnum || (OperatorEnum = {}));
export var KeywordEnum;
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
})(KeywordEnum || (KeywordEnum = {}));
export var TokenKind;
(function (TokenKind) {
    TokenKind["Comment"] = "comment";
    TokenKind["Operator"] = "operator";
    TokenKind["Keyword"] = "keyword";
    TokenKind["Identifier"] = "identifier";
    TokenKind["Action"] = "action";
    TokenKind["Path"] = "path";
    TokenKind["EOP"] = "eop";
})(TokenKind || (TokenKind = {}));
