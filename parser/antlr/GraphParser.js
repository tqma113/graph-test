// Generated from GraphParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var GraphParserListener = require('./GraphParserListener').GraphParserListener;
var GraphParserVisitor = require('./GraphParserVisitor').GraphParserVisitor;

var GraphParserBase = require('./GraphParserBase').GraphParserBase;

var grammarFileName = "GraphParser.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u001e\u00b4\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
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
    "\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003\r\u0005\rv\n\r\u0003\r\u0003",
    "\r\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u0082\n\u000f\u0003\u0010",
    "\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012",
    "\u0003\u0012\u0005\u0012\u008c\n\u0012\u0003\u0012\u0003\u0012\u0005",
    "\u0012\u0090\n\u0012\u0005\u0012\u0092\n\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0013\u0006\u0013\u0097\n\u0013\r\u0013\u000e\u0013\u0098\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0005\u0014\u009f\n\u0014",
    "\u0003\u0015\u0003\u0015\u0003\u0015\u0005\u0015\u00a4\n\u0015\u0003",
    "\u0016\u0003\u0016\u0003\u0016\u0003\u0017\u0003\u0017\u0003\u0017\u0005",
    "\u0017\u00ac\n\u0017\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018",
    "\u0005\u0018\u00b2\n\u0018\u0003\u0018\u0002\u0002\u0019\u0002\u0004",
    "\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e ",
    "\"$&(*,.\u0002\u0002\u0002\u00b6\u00021\u0003\u0002\u0002\u0002\u0004",
    "<\u0003\u0002\u0002\u0002\u0006?\u0003\u0002\u0002\u0002\bC\u0003\u0002",
    "\u0002\u0002\nE\u0003\u0002\u0002\u0002\fK\u0003\u0002\u0002\u0002\u000e",
    "N\u0003\u0002\u0002\u0002\u0010R\u0003\u0002\u0002\u0002\u0012V\u0003",
    "\u0002\u0002\u0002\u0014\\\u0003\u0002\u0002\u0002\u0016a\u0003\u0002",
    "\u0002\u0002\u0018r\u0003\u0002\u0002\u0002\u001ay\u0003\u0002\u0002",
    "\u0002\u001c{\u0003\u0002\u0002\u0002\u001e\u0083\u0003\u0002\u0002",
    "\u0002 \u0085\u0003\u0002\u0002\u0002\"\u0089\u0003\u0002\u0002\u0002",
    "$\u0096\u0003\u0002\u0002\u0002&\u009a\u0003\u0002\u0002\u0002(\u00a0",
    "\u0003\u0002\u0002\u0002*\u00a5\u0003\u0002\u0002\u0002,\u00a8\u0003",
    "\u0002\u0002\u0002.\u00b1\u0003\u0002\u0002\u000202\u0007\u0003\u0002",
    "\u000210\u0003\u0002\u0002\u000212\u0003\u0002\u0002\u000224\u0003\u0002",
    "\u0002\u000235\u0005\u0006\u0004\u000243\u0003\u0002\u0002\u000245\u0003",
    "\u0002\u0002\u000256\u0003\u0002\u0002\u000267\u0007\u0002\u0002\u0003",
    "7\u0003\u0003\u0002\u0002\u00028=\u0005\u0010\t\u00029=\u0005\u0014",
    "\u000b\u0002:=\u0005\u0018\r\u0002;=\u0005,\u0017\u0002<8\u0003\u0002",
    "\u0002\u0002<9\u0003\u0002\u0002\u0002<:\u0003\u0002\u0002\u0002<;\u0003",
    "\u0002\u0002\u0002=\u0005\u0003\u0002\u0002\u0002>@\u0005\u0004\u0003",
    "\u0002?>\u0003\u0002\u0002\u0002@A\u0003\u0002\u0002\u0002A?\u0003\u0002",
    "\u0002\u0002AB\u0003\u0002\u0002\u0002B\u0007\u0003\u0002\u0002\u0002",
    "CD\u0007\u0010\u0002\u0002D\t\u0003\u0002\u0002\u0002EF\u0007\u0012",
    "\u0002\u0002F\u000b\u0003\u0002\u0002\u0002GL\u0005\u001a\u000e\u0002",
    "HL\u0005\u001c\u000f\u0002IL\u0005 \u0011\u0002JL\u0005*\u0016\u0002",
    "KG\u0003\u0002\u0002\u0002KH\u0003\u0002\u0002\u0002KI\u0003\u0002\u0002",
    "\u0002KJ\u0003\u0002\u0002\u0002L\r\u0003\u0002\u0002\u0002MO\u0005",
    "\f\u0007\u0002NM\u0003\u0002\u0002\u0002OP\u0003\u0002\u0002\u0002P",
    "N\u0003\u0002\u0002\u0002PQ\u0003\u0002\u0002\u0002Q\u000f\u0003\u0002",
    "\u0002\u0002RS\u0005\b\u0005\u0002ST\u0007\f\u0002\u0002TU\u0005\u0012",
    "\n\u0002U\u0011\u0003\u0002\u0002\u0002VX\u0007\u0006\u0002\u0002WY",
    "\u0005\u000e\b\u0002XW\u0003\u0002\u0002\u0002XY\u0003\u0002\u0002\u0002",
    "YZ\u0003\u0002\u0002\u0002Z[\u0007\u0007\u0002\u0002[\u0013\u0003\u0002",
    "\u0002\u0002\\]\u0007\u001b\u0002\u0002]^\u0005\u0016\f\u0002^_\u0007",
    "\u001c\u0002\u0002_`\u0005\n\u0006\u0002`\u0015\u0003\u0002\u0002\u0002",
    "ag\u0007\u0006\u0002\u0002bc\u0005\b\u0005\u0002cd\u0007\u000e\u0002",
    "\u0002df\u0003\u0002\u0002\u0002eb\u0003\u0002\u0002\u0002fi\u0003\u0002",
    "\u0002\u0002ge\u0003\u0002\u0002\u0002gh\u0003\u0002\u0002\u0002hn\u0003",
    "\u0002\u0002\u0002ig\u0003\u0002\u0002\u0002jl\u0005\b\u0005\u0002k",
    "m\u0007\u000e\u0002\u0002lk\u0003\u0002\u0002\u0002lm\u0003\u0002\u0002",
    "\u0002mo\u0003\u0002\u0002\u0002nj\u0003\u0002\u0002\u0002no\u0003\u0002",
    "\u0002\u0002op\u0003\u0002\u0002\u0002pq\u0007\u0007\u0002\u0002q\u0017",
    "\u0003\u0002\u0002\u0002ru\u0007\u001d\u0002\u0002sv\u0005\b\u0005\u0002",
    "tv\u0005\u0010\t\u0002us\u0003\u0002\u0002\u0002ut\u0003\u0002\u0002",
    "\u0002vw\u0003\u0002\u0002\u0002wx\u0005.\u0018\u0002x\u0019\u0003\u0002",
    "\u0002\u0002yz\u0007\u0011\u0002\u0002z\u001b\u0003\u0002\u0002\u0002",
    "{|\u0007\u0016\u0002\u0002|}\u0005\u001e\u0010\u0002}~\u0007\r\u0002",
    "\u0002~\u0081\u0005\u0012\n\u0002\u007f\u0080\u0007\u0017\u0002\u0002",
    "\u0080\u0082\u0005\u0012\n\u0002\u0081\u007f\u0003\u0002\u0002\u0002",
    "\u0081\u0082\u0003\u0002\u0002\u0002\u0082\u001d\u0003\u0002\u0002\u0002",
    "\u0083\u0084\u0007\u0011\u0002\u0002\u0084\u001f\u0003\u0002\u0002\u0002",
    "\u0085\u0086\u0007\u0018\u0002\u0002\u0086\u0087\u0005\u001e\u0010\u0002",
    "\u0087\u0088\u0005\"\u0012\u0002\u0088!\u0003\u0002\u0002\u0002\u0089",
    "\u008b\u0007\u0006\u0002\u0002\u008a\u008c\u0005$\u0013\u0002\u008b",
    "\u008a\u0003\u0002\u0002\u0002\u008b\u008c\u0003\u0002\u0002\u0002\u008c",
    "\u0091\u0003\u0002\u0002\u0002\u008d\u008f\u0005(\u0015\u0002\u008e",
    "\u0090\u0005$\u0013\u0002\u008f\u008e\u0003\u0002\u0002\u0002\u008f",
    "\u0090\u0003\u0002\u0002\u0002\u0090\u0092\u0003\u0002\u0002\u0002\u0091",
    "\u008d\u0003\u0002\u0002\u0002\u0091\u0092\u0003\u0002\u0002\u0002\u0092",
    "\u0093\u0003\u0002\u0002\u0002\u0093\u0094\u0007\u0007\u0002\u0002\u0094",
    "#\u0003\u0002\u0002\u0002\u0095\u0097\u0005&\u0014\u0002\u0096\u0095",
    "\u0003\u0002\u0002\u0002\u0097\u0098\u0003\u0002\u0002\u0002\u0098\u0096",
    "\u0003\u0002\u0002\u0002\u0098\u0099\u0003\u0002\u0002\u0002\u0099%",
    "\u0003\u0002\u0002\u0002\u009a\u009b\u0007\u0019\u0002\u0002\u009b\u009c",
    "\u0005\u001e\u0010\u0002\u009c\u009e\u0007\r\u0002\u0002\u009d\u009f",
    "\u0005\u0012\n\u0002\u009e\u009d\u0003\u0002\u0002\u0002\u009e\u009f",
    "\u0003\u0002\u0002\u0002\u009f\'\u0003\u0002\u0002\u0002\u00a0\u00a1",
    "\u0007\u001a\u0002\u0002\u00a1\u00a3\u0007\r\u0002\u0002\u00a2\u00a4",
    "\u0005\u0012\n\u0002\u00a3\u00a2\u0003\u0002\u0002\u0002\u00a3\u00a4",
    "\u0003\u0002\u0002\u0002\u00a4)\u0003\u0002\u0002\u0002\u00a5\u00a6",
    "\u0007\u0015\u0002\u0002\u00a6\u00a7\u0005\b\u0005\u0002\u00a7+\u0003",
    "\u0002\u0002\u0002\u00a8\u00ab\u0007\u0014\u0002\u0002\u00a9\u00ac\u0007",
    "\u0010\u0002\u0002\u00aa\u00ac\u0005\u0010\t\u0002\u00ab\u00a9\u0003",
    "\u0002\u0002\u0002\u00ab\u00aa\u0003\u0002\u0002\u0002\u00ac-\u0003",
    "\u0002\u0002\u0002\u00ad\u00b2\u0007\u000f\u0002\u0002\u00ae\u00b2\u0007",
    "\u0002\u0002\u0003\u00af\u00b2\u0006\u0018\u0002\u0002\u00b0\u00b2\u0006",
    "\u0018\u0003\u0002\u00b1\u00ad\u0003\u0002\u0002\u0002\u00b1\u00ae\u0003",
    "\u0002\u0002\u0002\u00b1\u00af\u0003\u0002\u0002\u0002\u00b1\u00b0\u0003",
    "\u0002\u0002\u0002\u00b2/\u0003\u0002\u0002\u0002\u001614<AKPXglnu\u0081",
    "\u008b\u008f\u0091\u0098\u009e\u00a3\u00ab\u00b1"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, null, "'{'", "'}'", "'['", "']'", 
                     "'<'", "'>'", "'='", "'->'", "','", "';'", null, null, 
                     null, null, "'start'", "'goto'", "'if'", "'else'", 
                     "'switch'", "'case'", "'default'", "'import'", "'from'", 
                     "'export'" ];

var symbolicNames = [ null, "HashBangLine", "SingleLineComment", "LineTerminator", 
                      "OpenBrace", "CloseBrace", "OpenBracket", "CloseBracket", 
                      "OpenAngleBracket", "CloseAngleBracket", "Assign", 
                      "Result", "Comma", "SemiColon", "Identifier", "Action", 
                      "Path", "WhiteSpaces", "Start", "Goto", "If", "Else", 
                      "Switch", "Case", "Default", "Import", "From", "Export", 
                      "String" ];

var ruleNames =  [ "program", "moduleStatement", "moduleStatements", "identifier", 
                   "path", "statement", "statementList", "inferenceDeclaration", 
                   "block", "importStatement", "moduleItems", "exportStatement", 
                   "stepStatement", "ifStatement", "expression", "switchStatement", 
                   "switchBlock", "caseClauses", "caseClause", "defaultClause", 
                   "gotoStatement", "startStatement", "eos" ];

function GraphParser (input) {
	GraphParserBase.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

GraphParser.prototype = Object.create(GraphParserBase.prototype);
GraphParser.prototype.constructor = GraphParser;

Object.defineProperty(GraphParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

GraphParser.EOF = antlr4.Token.EOF;
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
GraphParser.RULE_exportStatement = 11;
GraphParser.RULE_stepStatement = 12;
GraphParser.RULE_ifStatement = 13;
GraphParser.RULE_expression = 14;
GraphParser.RULE_switchStatement = 15;
GraphParser.RULE_switchBlock = 16;
GraphParser.RULE_caseClauses = 17;
GraphParser.RULE_caseClause = 18;
GraphParser.RULE_defaultClause = 19;
GraphParser.RULE_gotoStatement = 20;
GraphParser.RULE_startStatement = 21;
GraphParser.RULE_eos = 22;


function ProgramContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_program;
    return this;
}

ProgramContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ProgramContext.prototype.constructor = ProgramContext;

ProgramContext.prototype.EOF = function() {
    return this.getToken(GraphParser.EOF, 0);
};

ProgramContext.prototype.HashBangLine = function() {
    return this.getToken(GraphParser.HashBangLine, 0);
};

ProgramContext.prototype.moduleStatements = function() {
    return this.getTypedRuleContext(ModuleStatementsContext,0);
};

ProgramContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterProgram(this);
	}
};

ProgramContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitProgram(this);
	}
};

ProgramContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
        if(_la===GraphParser.HashBangLine) {
            this.state = 46;
            this.match(GraphParser.HashBangLine);
        }

        this.state = 50;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GraphParser.Identifier) | (1 << GraphParser.Start) | (1 << GraphParser.Import) | (1 << GraphParser.Export))) !== 0)) {
            this.state = 49;
            this.moduleStatements();
        }

        this.state = 52;
        this.match(GraphParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_moduleStatement;
    return this;
}

ModuleStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModuleStatementContext.prototype.constructor = ModuleStatementContext;

ModuleStatementContext.prototype.inferenceDeclaration = function() {
    return this.getTypedRuleContext(InferenceDeclarationContext,0);
};

ModuleStatementContext.prototype.importStatement = function() {
    return this.getTypedRuleContext(ImportStatementContext,0);
};

ModuleStatementContext.prototype.exportStatement = function() {
    return this.getTypedRuleContext(ExportStatementContext,0);
};

ModuleStatementContext.prototype.startStatement = function() {
    return this.getTypedRuleContext(StartStatementContext,0);
};

ModuleStatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterModuleStatement(this);
	}
};

ModuleStatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitModuleStatement(this);
	}
};

ModuleStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
        switch(this._input.LA(1)) {
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
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_moduleStatements;
    return this;
}

ModuleStatementsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModuleStatementsContext.prototype.constructor = ModuleStatementsContext;

ModuleStatementsContext.prototype.moduleStatement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ModuleStatementContext);
    } else {
        return this.getTypedRuleContext(ModuleStatementContext,i);
    }
};

ModuleStatementsContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterModuleStatements(this);
	}
};

ModuleStatementsContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitModuleStatements(this);
	}
};

ModuleStatementsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GraphParser.Identifier) | (1 << GraphParser.Start) | (1 << GraphParser.Import) | (1 << GraphParser.Export))) !== 0));
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_identifier;
    return this;
}

IdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IdentifierContext.prototype.constructor = IdentifierContext;

IdentifierContext.prototype.Identifier = function() {
    return this.getToken(GraphParser.Identifier, 0);
};

IdentifierContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterIdentifier(this);
	}
};

IdentifierContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitIdentifier(this);
	}
};

IdentifierContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_path;
    return this;
}

PathContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PathContext.prototype.constructor = PathContext;

PathContext.prototype.Path = function() {
    return this.getToken(GraphParser.Path, 0);
};

PathContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterPath(this);
	}
};

PathContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitPath(this);
	}
};

PathContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_statement;
    return this;
}

StatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatementContext.prototype.constructor = StatementContext;

StatementContext.prototype.stepStatement = function() {
    return this.getTypedRuleContext(StepStatementContext,0);
};

StatementContext.prototype.ifStatement = function() {
    return this.getTypedRuleContext(IfStatementContext,0);
};

StatementContext.prototype.switchStatement = function() {
    return this.getTypedRuleContext(SwitchStatementContext,0);
};

StatementContext.prototype.gotoStatement = function() {
    return this.getTypedRuleContext(GotoStatementContext,0);
};

StatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterStatement(this);
	}
};

StatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitStatement(this);
	}
};

StatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
        switch(this._input.LA(1)) {
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
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_statementList;
    return this;
}

StatementListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatementListContext.prototype.constructor = StatementListContext;

StatementListContext.prototype.statement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatementContext);
    } else {
        return this.getTypedRuleContext(StatementContext,i);
    }
};

StatementListContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterStatementList(this);
	}
};

StatementListContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitStatementList(this);
	}
};

StatementListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GraphParser.Action) | (1 << GraphParser.Goto) | (1 << GraphParser.If) | (1 << GraphParser.Switch))) !== 0));
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_inferenceDeclaration;
    return this;
}

InferenceDeclarationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InferenceDeclarationContext.prototype.constructor = InferenceDeclarationContext;

InferenceDeclarationContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext,0);
};

InferenceDeclarationContext.prototype.Assign = function() {
    return this.getToken(GraphParser.Assign, 0);
};

InferenceDeclarationContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};

InferenceDeclarationContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterInferenceDeclaration(this);
	}
};

InferenceDeclarationContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitInferenceDeclaration(this);
	}
};

InferenceDeclarationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_block;
    return this;
}

BlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BlockContext.prototype.constructor = BlockContext;

BlockContext.prototype.OpenBrace = function() {
    return this.getToken(GraphParser.OpenBrace, 0);
};

BlockContext.prototype.CloseBrace = function() {
    return this.getToken(GraphParser.CloseBrace, 0);
};

BlockContext.prototype.statementList = function() {
    return this.getTypedRuleContext(StatementListContext,0);
};

BlockContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterBlock(this);
	}
};

BlockContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitBlock(this);
	}
};

BlockContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GraphParser.Action) | (1 << GraphParser.Goto) | (1 << GraphParser.If) | (1 << GraphParser.Switch))) !== 0)) {
            this.state = 85;
            this.statementList();
        }

        this.state = 88;
        this.match(GraphParser.CloseBrace);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_importStatement;
    return this;
}

ImportStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ImportStatementContext.prototype.constructor = ImportStatementContext;

ImportStatementContext.prototype.Import = function() {
    return this.getToken(GraphParser.Import, 0);
};

ImportStatementContext.prototype.moduleItems = function() {
    return this.getTypedRuleContext(ModuleItemsContext,0);
};

ImportStatementContext.prototype.From = function() {
    return this.getToken(GraphParser.From, 0);
};

ImportStatementContext.prototype.path = function() {
    return this.getTypedRuleContext(PathContext,0);
};

ImportStatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterImportStatement(this);
	}
};

ImportStatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitImportStatement(this);
	}
};

ImportStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_moduleItems;
    return this;
}

ModuleItemsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModuleItemsContext.prototype.constructor = ModuleItemsContext;

ModuleItemsContext.prototype.OpenBrace = function() {
    return this.getToken(GraphParser.OpenBrace, 0);
};

ModuleItemsContext.prototype.CloseBrace = function() {
    return this.getToken(GraphParser.CloseBrace, 0);
};

ModuleItemsContext.prototype.identifier = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(IdentifierContext);
    } else {
        return this.getTypedRuleContext(IdentifierContext,i);
    }
};

ModuleItemsContext.prototype.Comma = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(GraphParser.Comma);
    } else {
        return this.getToken(GraphParser.Comma, i);
    }
};


ModuleItemsContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterModuleItems(this);
	}
};

ModuleItemsContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitModuleItems(this);
	}
};

ModuleItemsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
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
        var _alt = this._interp.adaptivePredict(this._input,7,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 96;
                this.identifier();
                this.state = 97;
                this.match(GraphParser.Comma); 
            }
            this.state = 103;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,7,this._ctx);
        }

        this.state = 108;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===GraphParser.Identifier) {
            this.state = 104;
            this.identifier();
            this.state = 106;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===GraphParser.Comma) {
                this.state = 105;
                this.match(GraphParser.Comma);
            }

        }

        this.state = 110;
        this.match(GraphParser.CloseBrace);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_exportStatement;
    return this;
}

ExportStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExportStatementContext.prototype.constructor = ExportStatementContext;


 
ExportStatementContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function ExportDeclarationContext(parser, ctx) {
	ExportStatementContext.call(this, parser);
    ExportStatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExportDeclarationContext.prototype = Object.create(ExportStatementContext.prototype);
ExportDeclarationContext.prototype.constructor = ExportDeclarationContext;

GraphParser.ExportDeclarationContext = ExportDeclarationContext;

ExportDeclarationContext.prototype.Export = function() {
    return this.getToken(GraphParser.Export, 0);
};

ExportDeclarationContext.prototype.eos = function() {
    return this.getTypedRuleContext(EosContext,0);
};

ExportDeclarationContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext,0);
};

ExportDeclarationContext.prototype.inferenceDeclaration = function() {
    return this.getTypedRuleContext(InferenceDeclarationContext,0);
};
ExportDeclarationContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterExportDeclaration(this);
	}
};

ExportDeclarationContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitExportDeclaration(this);
	}
};

ExportDeclarationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitExportDeclaration(this);
    } else {
        return visitor.visitChildren(this);
    }
};



GraphParser.ExportStatementContext = ExportStatementContext;

GraphParser.prototype.exportStatement = function() {

    var localctx = new ExportStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, GraphParser.RULE_exportStatement);
    try {
        localctx = new ExportDeclarationContext(this, localctx);
        this.enterOuterAlt(localctx, 1);
        this.state = 112;
        this.match(GraphParser.Export);
        this.state = 115;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
        switch(la_) {
        case 1:
            this.state = 113;
            this.identifier();
            break;

        case 2:
            this.state = 114;
            this.inferenceDeclaration();
            break;

        }
        this.state = 117;
        this.eos();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_stepStatement;
    return this;
}

StepStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StepStatementContext.prototype.constructor = StepStatementContext;

StepStatementContext.prototype.Action = function() {
    return this.getToken(GraphParser.Action, 0);
};

StepStatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterStepStatement(this);
	}
};

StepStatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitStepStatement(this);
	}
};

StepStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitStepStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.StepStatementContext = StepStatementContext;

GraphParser.prototype.stepStatement = function() {

    var localctx = new StepStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, GraphParser.RULE_stepStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 119;
        this.match(GraphParser.Action);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_ifStatement;
    return this;
}

IfStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IfStatementContext.prototype.constructor = IfStatementContext;

IfStatementContext.prototype.If = function() {
    return this.getToken(GraphParser.If, 0);
};

IfStatementContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

IfStatementContext.prototype.Result = function() {
    return this.getToken(GraphParser.Result, 0);
};

IfStatementContext.prototype.block = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(BlockContext);
    } else {
        return this.getTypedRuleContext(BlockContext,i);
    }
};

IfStatementContext.prototype.Else = function() {
    return this.getToken(GraphParser.Else, 0);
};

IfStatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterIfStatement(this);
	}
};

IfStatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitIfStatement(this);
	}
};

IfStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitIfStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.IfStatementContext = IfStatementContext;

GraphParser.prototype.ifStatement = function() {

    var localctx = new IfStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, GraphParser.RULE_ifStatement);
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
        if(_la===GraphParser.Else) {
            this.state = 125;
            this.match(GraphParser.Else);
            this.state = 126;
            this.block();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_expression;
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.Action = function() {
    return this.getToken(GraphParser.Action, 0);
};

ExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterExpression(this);
	}
};

ExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitExpression(this);
	}
};

ExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.ExpressionContext = ExpressionContext;

GraphParser.prototype.expression = function() {

    var localctx = new ExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, GraphParser.RULE_expression);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 129;
        this.match(GraphParser.Action);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_switchStatement;
    return this;
}

SwitchStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SwitchStatementContext.prototype.constructor = SwitchStatementContext;

SwitchStatementContext.prototype.Switch = function() {
    return this.getToken(GraphParser.Switch, 0);
};

SwitchStatementContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

SwitchStatementContext.prototype.switchBlock = function() {
    return this.getTypedRuleContext(SwitchBlockContext,0);
};

SwitchStatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterSwitchStatement(this);
	}
};

SwitchStatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitSwitchStatement(this);
	}
};

SwitchStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitSwitchStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.SwitchStatementContext = SwitchStatementContext;

GraphParser.prototype.switchStatement = function() {

    var localctx = new SwitchStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, GraphParser.RULE_switchStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 131;
        this.match(GraphParser.Switch);
        this.state = 132;
        this.expression();
        this.state = 133;
        this.switchBlock();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_switchBlock;
    return this;
}

SwitchBlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SwitchBlockContext.prototype.constructor = SwitchBlockContext;

SwitchBlockContext.prototype.OpenBrace = function() {
    return this.getToken(GraphParser.OpenBrace, 0);
};

SwitchBlockContext.prototype.CloseBrace = function() {
    return this.getToken(GraphParser.CloseBrace, 0);
};

SwitchBlockContext.prototype.caseClauses = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(CaseClausesContext);
    } else {
        return this.getTypedRuleContext(CaseClausesContext,i);
    }
};

SwitchBlockContext.prototype.defaultClause = function() {
    return this.getTypedRuleContext(DefaultClauseContext,0);
};

SwitchBlockContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterSwitchBlock(this);
	}
};

SwitchBlockContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitSwitchBlock(this);
	}
};

SwitchBlockContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitSwitchBlock(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.SwitchBlockContext = SwitchBlockContext;

GraphParser.prototype.switchBlock = function() {

    var localctx = new SwitchBlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, GraphParser.RULE_switchBlock);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 135;
        this.match(GraphParser.OpenBrace);
        this.state = 137;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===GraphParser.Case) {
            this.state = 136;
            this.caseClauses();
        }

        this.state = 143;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===GraphParser.Default) {
            this.state = 139;
            this.defaultClause();
            this.state = 141;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===GraphParser.Case) {
                this.state = 140;
                this.caseClauses();
            }

        }

        this.state = 145;
        this.match(GraphParser.CloseBrace);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_caseClauses;
    return this;
}

CaseClausesContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CaseClausesContext.prototype.constructor = CaseClausesContext;

CaseClausesContext.prototype.caseClause = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(CaseClauseContext);
    } else {
        return this.getTypedRuleContext(CaseClauseContext,i);
    }
};

CaseClausesContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterCaseClauses(this);
	}
};

CaseClausesContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitCaseClauses(this);
	}
};

CaseClausesContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitCaseClauses(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.CaseClausesContext = CaseClausesContext;

GraphParser.prototype.caseClauses = function() {

    var localctx = new CaseClausesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, GraphParser.RULE_caseClauses);
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
        } while(_la===GraphParser.Case);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_caseClause;
    return this;
}

CaseClauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CaseClauseContext.prototype.constructor = CaseClauseContext;

CaseClauseContext.prototype.Case = function() {
    return this.getToken(GraphParser.Case, 0);
};

CaseClauseContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

CaseClauseContext.prototype.Result = function() {
    return this.getToken(GraphParser.Result, 0);
};

CaseClauseContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};

CaseClauseContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterCaseClause(this);
	}
};

CaseClauseContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitCaseClause(this);
	}
};

CaseClauseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitCaseClause(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.CaseClauseContext = CaseClauseContext;

GraphParser.prototype.caseClause = function() {

    var localctx = new CaseClauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, GraphParser.RULE_caseClause);
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
        if(_la===GraphParser.OpenBrace) {
            this.state = 155;
            this.block();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_defaultClause;
    return this;
}

DefaultClauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DefaultClauseContext.prototype.constructor = DefaultClauseContext;

DefaultClauseContext.prototype.Default = function() {
    return this.getToken(GraphParser.Default, 0);
};

DefaultClauseContext.prototype.Result = function() {
    return this.getToken(GraphParser.Result, 0);
};

DefaultClauseContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};

DefaultClauseContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterDefaultClause(this);
	}
};

DefaultClauseContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitDefaultClause(this);
	}
};

DefaultClauseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitDefaultClause(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.DefaultClauseContext = DefaultClauseContext;

GraphParser.prototype.defaultClause = function() {

    var localctx = new DefaultClauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, GraphParser.RULE_defaultClause);
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
        if(_la===GraphParser.OpenBrace) {
            this.state = 160;
            this.block();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_gotoStatement;
    return this;
}

GotoStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
GotoStatementContext.prototype.constructor = GotoStatementContext;

GotoStatementContext.prototype.Goto = function() {
    return this.getToken(GraphParser.Goto, 0);
};

GotoStatementContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext,0);
};

GotoStatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterGotoStatement(this);
	}
};

GotoStatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitGotoStatement(this);
	}
};

GotoStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitGotoStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.GotoStatementContext = GotoStatementContext;

GraphParser.prototype.gotoStatement = function() {

    var localctx = new GotoStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, GraphParser.RULE_gotoStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 163;
        this.match(GraphParser.Goto);
        this.state = 164;
        this.identifier();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_startStatement;
    return this;
}

StartStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StartStatementContext.prototype.constructor = StartStatementContext;

StartStatementContext.prototype.Start = function() {
    return this.getToken(GraphParser.Start, 0);
};

StartStatementContext.prototype.Identifier = function() {
    return this.getToken(GraphParser.Identifier, 0);
};

StartStatementContext.prototype.inferenceDeclaration = function() {
    return this.getTypedRuleContext(InferenceDeclarationContext,0);
};

StartStatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterStartStatement(this);
	}
};

StartStatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitStartStatement(this);
	}
};

StartStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitStartStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.StartStatementContext = StartStatementContext;

GraphParser.prototype.startStatement = function() {

    var localctx = new StartStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, GraphParser.RULE_startStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 166;
        this.match(GraphParser.Start);
        this.state = 169;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
        switch(la_) {
        case 1:
            this.state = 167;
            this.match(GraphParser.Identifier);
            break;

        case 2:
            this.state = 168;
            this.inferenceDeclaration();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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


function EosContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_eos;
    return this;
}

EosContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EosContext.prototype.constructor = EosContext;

EosContext.prototype.SemiColon = function() {
    return this.getToken(GraphParser.SemiColon, 0);
};

EosContext.prototype.EOF = function() {
    return this.getToken(GraphParser.EOF, 0);
};

EosContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterEos(this);
	}
};

EosContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitEos(this);
	}
};

EosContext.prototype.accept = function(visitor) {
    if ( visitor instanceof GraphParserVisitor ) {
        return visitor.visitEos(this);
    } else {
        return visitor.visitChildren(this);
    }
};




GraphParser.EosContext = EosContext;

GraphParser.prototype.eos = function() {

    var localctx = new EosContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, GraphParser.RULE_eos);
    try {
        this.state = 175;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 171;
            this.match(GraphParser.SemiColon);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 172;
            this.match(GraphParser.EOF);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 173;
            if (!( this.lineTerminatorAhead())) {
                throw new antlr4.error.FailedPredicateException(this, "this.lineTerminatorAhead()");
            }
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 174;
            if (!( this.closeBrace())) {
                throw new antlr4.error.FailedPredicateException(this, "this.closeBrace()");
            }
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
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


GraphParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 22:
			return this.eos_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

GraphParser.prototype.eos_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.lineTerminatorAhead();
		case 1:
			return this.closeBrace();
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.GraphParser = GraphParser;
