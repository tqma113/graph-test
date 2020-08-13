export declare enum SymbolChar {
    OpenBrace = "{",
    CloseBrace = "}",
    OpenBracket = "[",
    CloseBracket = "]",
    OpenAngleBracket = "<",
    CloseAngleBracket = ">",
    Assign = "=",
    Result = "->",
    Comma = ",",
    Quote = "\"",
    Well = "#"
}
export declare enum OperatorEnum {
    OpenBrace = "{",
    CloseBrace = "}",
    Assign = "=",
    Result = "->",
    Comma = ","
}
export declare enum KeywordEnum {
    Start = "start",
    Goto = "goto",
    If = "if",
    Else = "else",
    Switch = "switch",
    Case = "case",
    Default = "default",
    Import = "import",
    From = "from",
    Export = "export"
}
export declare enum TokenKind {
    Comment = "comment",
    Operator = "operator",
    Keyword = "keyword",
    Identifier = "identifier",
    Action = "action",
    Path = "path",
    EOP = "eop"
}
