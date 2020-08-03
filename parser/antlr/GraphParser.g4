parser grammar GraphParser;

options {
    tokenVocab=GraphLexer;
    superClass=GraphParserBase;
}


program
    : HashBangLine? moduleStatements? EOF
    ;

moduleStatement
    : inferenceDeclaration
    | importStatement
    | exportStatement
    | startStatement
    ;

moduleStatements
    : moduleStatement+
    ;

identifier
    : Identifier
    ;

path
    : Path
    ;

statement
    : stepStatement
    | ifStatement
    | switchStatement
    | gotoStatement
    ;

statementList
    : statement+
    ;


inferenceDeclaration
    : identifier '=' block
    ;

block
    : '{' statementList? '}'
    ;


importStatement
    : Import moduleItems From path
    ;

moduleItems
    : '{' (identifier ',')* (identifier ','?)? '}'
    ;

exportStatement
    : Export (identifier | inferenceDeclaration) eos   # ExportDeclaration
    ;

stepStatement
    : Action
    ;

ifStatement
    : If expression '->' block (Else block)?
    ;

expression
    : Action
    ;


switchStatement
    : Switch expression switchBlock
    ;

switchBlock
    : '{' caseClauses? (defaultClause caseClauses?)? '}'
    ;

caseClauses
    : caseClause+
    ;

caseClause
    : Case expression '->' block?
    ;

defaultClause
    : Default '->' block?
    ;

gotoStatement
    : Goto identifier
    ;

startStatement
    : Start (Identifier | inferenceDeclaration)
    ;


eos
    : SemiColon
    | EOF
    | {this.lineTerminatorAhead()}?
    | {this.closeBrace()}?
    ;