parser grammar GraphParser;

options {
    tokenVocab=GraphLexer;
    superClass=GraphParserBase;
}


program
    : HashBangLine? moduleStatements? EOF
    ;

moduleStatement
    : inferenceDefinition
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


inferenceDefinition
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

module
    : identifier
    | inferenceDefinition
    ;

exportStatement
    : Export module
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
    : Start module
    ;
