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

export enum Operator {
  OpenBrace             =         '{',
  CloseBrace            =         '}',
  Assign                =         '=',
  Result                =         '->',
  Comma                 =         ',',
}

export enum Keyword {
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


export enum TokenType {
  Comment               =         'comment',
  Operator              =         'operator',
  Keyword               =         'keyword',
  Identifier            =         'identifier',
  Action                =         'action',
  Path                  =         'path',
  EOP                   =         'eop'
}