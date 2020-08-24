// prettier-ignore
export enum SymbolChar {
  OpenBrace             =         '{',
  CloseBrace            =         '}',
  OpenBracket           =         '[',
  CloseBracket          =         ']',
  OpenAngleBracket      =         '<',
  CloseAngleBracket     =         '>',
  Assign                =         '=',
  Result                =         '->',
  Comma                 =         ',',
  Quote                 =         '"',
  Well                  =         '#'
}

// prettier-ignore
export enum OperatorEnum {
  OpenBrace             =         '{',
  CloseBrace            =         '}',
  Assign                =         '=',
  Result                =         '->',
  Comma                 =         ',',
}

// prettier-ignore
export enum KeywordEnum {
  Start                 =         'start',
  Goto                  =         'goto',
  If                    =         'if',
  Else                  =         'else',
  Switch                =         'switch',
  Case                  =         'case',
  Default               =         'default',
  Import                =         'import',
  From                  =         'from',
  Export                =         'export',
}

// prettier-ignore
export enum TokenKind {
  Comment               =         'comment',
  Operator              =         'operator',
  Keyword               =         'keyword',
  Identifier            =         'identifier',
  Action                =         'action',
  Path                  =         'path',
  EOP                   =         'eop'
}
