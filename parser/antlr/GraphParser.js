// Generated from GraphParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var GraphParserListener = require('./GraphParserListener').GraphParserListener;
var GraphParserBase = require('./GraphParserBase').GraphParserBase;

var grammarFileName = "GraphParser.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u001a\u00a7\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0003\u0002\u0005\u0002",
    ".\n\u0002\u0003\u0002\u0005\u00021\n\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0003\u0007\u00036\n\u0003\f\u0003\u000e\u00039\u000b\u0003\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004?\n\u0004\u0003\u0005",
    "\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006",
    "G\n\u0006\u0003\u0007\u0006\u0007J\n\u0007\r\u0007\u000e\u0007K\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0005\tT\n\t\u0003\t\u0003",
    "\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0007\u000ba\n\u000b\f\u000b\u000e\u000bd\u000b\u000b",
    "\u0003\u000b\u0003\u000b\u0005\u000bh\n\u000b\u0005\u000bj\n\u000b\u0003",
    "\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0005\fq\n\f\u0003\r\u0003",
    "\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0005\u000e{\n\u000e\u0003\u000f\u0003\u000f\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0005\u0011\u0085",
    "\n\u0011\u0003\u0011\u0003\u0011\u0005\u0011\u0089\n\u0011\u0005\u0011",
    "\u008b\n\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0006\u0012\u0090",
    "\n\u0012\r\u0012\u000e\u0012\u0091\u0003\u0013\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0005\u0013\u0098\n\u0013\u0003\u0014\u0003\u0014\u0003",
    "\u0014\u0005\u0014\u009d\n\u0014\u0003\u0015\u0003\u0015\u0003\u0015",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0005\u0016\u00a5\n\u0016\u0003",
    "\u0016\u0002\u0002\u0017\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014",
    "\u0016\u0018\u001a\u001c\u001e \"$&(*\u0002\u0002\u0002\u00a8\u0002",
    "-\u0003\u0002\u0002\u0002\u00047\u0003\u0002\u0002\u0002\u0006>\u0003",
    "\u0002\u0002\u0002\b@\u0003\u0002\u0002\u0002\nF\u0003\u0002\u0002\u0002",
    "\fI\u0003\u0002\u0002\u0002\u000eM\u0003\u0002\u0002\u0002\u0010Q\u0003",
    "\u0002\u0002\u0002\u0012W\u0003\u0002\u0002\u0002\u0014\\\u0003\u0002",
    "\u0002\u0002\u0016m\u0003\u0002\u0002\u0002\u0018r\u0003\u0002\u0002",
    "\u0002\u001at\u0003\u0002\u0002\u0002\u001c|\u0003\u0002\u0002\u0002",
    "\u001e~\u0003\u0002\u0002\u0002 \u0082\u0003\u0002\u0002\u0002\"\u008f",
    "\u0003\u0002\u0002\u0002$\u0093\u0003\u0002\u0002\u0002&\u0099\u0003",
    "\u0002\u0002\u0002(\u009e\u0003\u0002\u0002\u0002*\u00a1\u0003\u0002",
    "\u0002\u0002,.\u0007\u0003\u0002\u0002-,\u0003\u0002\u0002\u0002-.\u0003",
    "\u0002\u0002\u0002.0\u0003\u0002\u0002\u0002/1\u0005\u0004\u0003\u0002",
    "0/\u0003\u0002\u0002\u000201\u0003\u0002\u0002\u000212\u0003\u0002\u0002",
    "\u000223\u0007\u0002\u0002\u00033\u0003\u0003\u0002\u0002\u000246\u0005",
    "\u0006\u0004\u000254\u0003\u0002\u0002\u000269\u0003\u0002\u0002\u0002",
    "75\u0003\u0002\u0002\u000278\u0003\u0002\u0002\u00028\u0005\u0003\u0002",
    "\u0002\u000297\u0003\u0002\u0002\u0002:?\u0005\u000e\b\u0002;?\u0005",
    "\u0012\n\u0002<?\u0005\u0016\f\u0002=?\u0005*\u0016\u0002>:\u0003\u0002",
    "\u0002\u0002>;\u0003\u0002\u0002\u0002><\u0003\u0002\u0002\u0002>=\u0003",
    "\u0002\u0002\u0002?\u0007\u0003\u0002\u0002\u0002@A\u0007\u000f\u0002",
    "\u0002A\t\u0003\u0002\u0002\u0002BG\u0005\u0018\r\u0002CG\u0005\u001a",
    "\u000e\u0002DG\u0005\u001e\u0010\u0002EG\u0005(\u0015\u0002FB\u0003",
    "\u0002\u0002\u0002FC\u0003\u0002\u0002\u0002FD\u0003\u0002\u0002\u0002",
    "FE\u0003\u0002\u0002\u0002G\u000b\u0003\u0002\u0002\u0002HJ\u0005\n",
    "\u0006\u0002IH\u0003\u0002\u0002\u0002JK\u0003\u0002\u0002\u0002KI\u0003",
    "\u0002\u0002\u0002KL\u0003\u0002\u0002\u0002L\r\u0003\u0002\u0002\u0002",
    "MN\u0005\b\u0005\u0002NO\u0007\u000b\u0002\u0002OP\u0005\u0010\t\u0002",
    "P\u000f\u0003\u0002\u0002\u0002QS\u0007\u0005\u0002\u0002RT\u0005\f",
    "\u0007\u0002SR\u0003\u0002\u0002\u0002ST\u0003\u0002\u0002\u0002TU\u0003",
    "\u0002\u0002\u0002UV\u0007\u0006\u0002\u0002V\u0011\u0003\u0002\u0002",
    "\u0002WX\u0007\u0018\u0002\u0002XY\u0005\u0014\u000b\u0002YZ\u0007\u0019",
    "\u0002\u0002Z[\u0007\u000e\u0002\u0002[\u0013\u0003\u0002\u0002\u0002",
    "\\b\u0007\u0005\u0002\u0002]^\u0005\b\u0005\u0002^_\u0007\r\u0002\u0002",
    "_a\u0003\u0002\u0002\u0002`]\u0003\u0002\u0002\u0002ad\u0003\u0002\u0002",
    "\u0002b`\u0003\u0002\u0002\u0002bc\u0003\u0002\u0002\u0002ci\u0003\u0002",
    "\u0002\u0002db\u0003\u0002\u0002\u0002eg\u0005\b\u0005\u0002fh\u0007",
    "\r\u0002\u0002gf\u0003\u0002\u0002\u0002gh\u0003\u0002\u0002\u0002h",
    "j\u0003\u0002\u0002\u0002ie\u0003\u0002\u0002\u0002ij\u0003\u0002\u0002",
    "\u0002jk\u0003\u0002\u0002\u0002kl\u0007\u0006\u0002\u0002l\u0015\u0003",
    "\u0002\u0002\u0002mp\u0007\u001a\u0002\u0002nq\u0005\b\u0005\u0002o",
    "q\u0005\u000e\b\u0002pn\u0003\u0002\u0002\u0002po\u0003\u0002\u0002",
    "\u0002q\u0017\u0003\u0002\u0002\u0002rs\u0007\u0010\u0002\u0002s\u0019",
    "\u0003\u0002\u0002\u0002tu\u0007\u0013\u0002\u0002uv\u0005\u001c\u000f",
    "\u0002vw\u0007\f\u0002\u0002wz\u0005\u0010\t\u0002xy\u0007\u0014\u0002",
    "\u0002y{\u0005\u0010\t\u0002zx\u0003\u0002\u0002\u0002z{\u0003\u0002",
    "\u0002\u0002{\u001b\u0003\u0002\u0002\u0002|}\u0007\u0010\u0002\u0002",
    "}\u001d\u0003\u0002\u0002\u0002~\u007f\u0007\u0015\u0002\u0002\u007f",
    "\u0080\u0005\u001c\u000f\u0002\u0080\u0081\u0005 \u0011\u0002\u0081",
    "\u001f\u0003\u0002\u0002\u0002\u0082\u0084\u0007\u0005\u0002\u0002\u0083",
    "\u0085\u0005\"\u0012\u0002\u0084\u0083\u0003\u0002\u0002\u0002\u0084",
    "\u0085\u0003\u0002\u0002\u0002\u0085\u008a\u0003\u0002\u0002\u0002\u0086",
    "\u0088\u0005&\u0014\u0002\u0087\u0089\u0005\"\u0012\u0002\u0088\u0087",
    "\u0003\u0002\u0002\u0002\u0088\u0089\u0003\u0002\u0002\u0002\u0089\u008b",
    "\u0003\u0002\u0002\u0002\u008a\u0086\u0003\u0002\u0002\u0002\u008a\u008b",
    "\u0003\u0002\u0002\u0002\u008b\u008c\u0003\u0002\u0002\u0002\u008c\u008d",
    "\u0007\u0006\u0002\u0002\u008d!\u0003\u0002\u0002\u0002\u008e\u0090",
    "\u0005$\u0013\u0002\u008f\u008e\u0003\u0002\u0002\u0002\u0090\u0091",
    "\u0003\u0002\u0002\u0002\u0091\u008f\u0003\u0002\u0002\u0002\u0091\u0092",
    "\u0003\u0002\u0002\u0002\u0092#\u0003\u0002\u0002\u0002\u0093\u0094",
    "\u0007\u0016\u0002\u0002\u0094\u0095\u0005\u001c\u000f\u0002\u0095\u0097",
    "\u0007\f\u0002\u0002\u0096\u0098\u0005\u0010\t\u0002\u0097\u0096\u0003",
    "\u0002\u0002\u0002\u0097\u0098\u0003\u0002\u0002\u0002\u0098%\u0003",
    "\u0002\u0002\u0002\u0099\u009a\u0007\u0017\u0002\u0002\u009a\u009c\u0007",
    "\f\u0002\u0002\u009b\u009d\u0005\u0010\t\u0002\u009c\u009b\u0003\u0002",
    "\u0002\u0002\u009c\u009d\u0003\u0002\u0002\u0002\u009d\'\u0003\u0002",
    "\u0002\u0002\u009e\u009f\u0007\u0012\u0002\u0002\u009f\u00a0\u0005\b",
    "\u0005\u0002\u00a0)\u0003\u0002\u0002\u0002\u00a1\u00a4\u0007\u0011",
    "\u0002\u0002\u00a2\u00a5\u0005\b\u0005\u0002\u00a3\u00a5\u0005\u000e",
    "\b\u0002\u00a4\u00a2\u0003\u0002\u0002\u0002\u00a4\u00a3\u0003\u0002",
    "\u0002\u0002\u00a5+\u0003\u0002\u0002\u0002\u0015-07>FKSbgipz\u0084",
    "\u0088\u008a\u0091\u0097\u009c\u00a4"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, "'{'", "'}'", "'['", "']'", "'<'", 
                     "'>'", "'='", "'->'", "','", null, null, null, "'start'", 
                     "'goto'", "'if'", "'else'", "'switch'", "'case'", "'default'", 
                     "'import'", "'from'", "'export'" ];

var symbolicNames = [ null, "HashBangLine", "LineTerminator", "OpenBrace", 
                      "CloseBrace", "OpenBracket", "CloseBracket", "OpenAngleBracket", 
                      "CloseAngleBracket", "Assign", "Result", "Comma", 
                      "StringLiteral", "Identifier", "Action", "Start", 
                      "Goto", "If", "Else", "Switch", "Case", "Default", 
                      "Import", "From", "Export" ];

var ruleNames =  [ "program", "module", "moduleStatement", "identifier", 
                   "statement", "statementList", "inferenceDeclaration", 
                   "block", "importStatement", "moduleItems", "exportStatement", 
                   "stepStatement", "ifStatement", "expression", "switchStatement", 
                   "switchBlock", "caseClauses", "caseClause", "defaultClause", 
                   "gotoStatement", "startStatement" ];

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
GraphParser.LineTerminator = 2;
GraphParser.OpenBrace = 3;
GraphParser.CloseBrace = 4;
GraphParser.OpenBracket = 5;
GraphParser.CloseBracket = 6;
GraphParser.OpenAngleBracket = 7;
GraphParser.CloseAngleBracket = 8;
GraphParser.Assign = 9;
GraphParser.Result = 10;
GraphParser.Comma = 11;
GraphParser.StringLiteral = 12;
GraphParser.Identifier = 13;
GraphParser.Action = 14;
GraphParser.Start = 15;
GraphParser.Goto = 16;
GraphParser.If = 17;
GraphParser.Else = 18;
GraphParser.Switch = 19;
GraphParser.Case = 20;
GraphParser.Default = 21;
GraphParser.Import = 22;
GraphParser.From = 23;
GraphParser.Export = 24;

GraphParser.RULE_program = 0;
GraphParser.RULE_module = 1;
GraphParser.RULE_moduleStatement = 2;
GraphParser.RULE_identifier = 3;
GraphParser.RULE_statement = 4;
GraphParser.RULE_statementList = 5;
GraphParser.RULE_inferenceDeclaration = 6;
GraphParser.RULE_block = 7;
GraphParser.RULE_importStatement = 8;
GraphParser.RULE_moduleItems = 9;
GraphParser.RULE_exportStatement = 10;
GraphParser.RULE_stepStatement = 11;
GraphParser.RULE_ifStatement = 12;
GraphParser.RULE_expression = 13;
GraphParser.RULE_switchStatement = 14;
GraphParser.RULE_switchBlock = 15;
GraphParser.RULE_caseClauses = 16;
GraphParser.RULE_caseClause = 17;
GraphParser.RULE_defaultClause = 18;
GraphParser.RULE_gotoStatement = 19;
GraphParser.RULE_startStatement = 20;


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

ProgramContext.prototype.module = function() {
    return this.getTypedRuleContext(ModuleContext,0);
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




GraphParser.ProgramContext = ProgramContext;

GraphParser.prototype.program = function() {

    var localctx = new ProgramContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, GraphParser.RULE_program);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 43;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===GraphParser.HashBangLine) {
            this.state = 42;
            this.match(GraphParser.HashBangLine);
        }

        this.state = 46;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
        if(la_===1) {
            this.state = 45;
            this.module();

        }
        this.state = 48;
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


function ModuleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GraphParser.RULE_module;
    return this;
}

ModuleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModuleContext.prototype.constructor = ModuleContext;

ModuleContext.prototype.moduleStatement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ModuleStatementContext);
    } else {
        return this.getTypedRuleContext(ModuleStatementContext,i);
    }
};

ModuleContext.prototype.enterRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.enterModule(this);
	}
};

ModuleContext.prototype.exitRule = function(listener) {
    if(listener instanceof GraphParserListener ) {
        listener.exitModule(this);
	}
};




GraphParser.ModuleContext = ModuleContext;

GraphParser.prototype.module = function() {

    var localctx = new ModuleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, GraphParser.RULE_module);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 53;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GraphParser.Identifier) | (1 << GraphParser.Start) | (1 << GraphParser.Import) | (1 << GraphParser.Export))) !== 0)) {
            this.state = 50;
            this.moduleStatement();
            this.state = 55;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
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




GraphParser.ModuleStatementContext = ModuleStatementContext;

GraphParser.prototype.moduleStatement = function() {

    var localctx = new ModuleStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, GraphParser.RULE_moduleStatement);
    try {
        this.state = 60;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case GraphParser.Identifier:
            this.enterOuterAlt(localctx, 1);
            this.state = 56;
            this.inferenceDeclaration();
            break;
        case GraphParser.Import:
            this.enterOuterAlt(localctx, 2);
            this.state = 57;
            this.importStatement();
            break;
        case GraphParser.Export:
            this.enterOuterAlt(localctx, 3);
            this.state = 58;
            this.exportStatement();
            break;
        case GraphParser.Start:
            this.enterOuterAlt(localctx, 4);
            this.state = 59;
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




GraphParser.IdentifierContext = IdentifierContext;

GraphParser.prototype.identifier = function() {

    var localctx = new IdentifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, GraphParser.RULE_identifier);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 62;
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




GraphParser.StatementContext = StatementContext;

GraphParser.prototype.statement = function() {

    var localctx = new StatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, GraphParser.RULE_statement);
    try {
        this.state = 68;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case GraphParser.Action:
            this.enterOuterAlt(localctx, 1);
            this.state = 64;
            this.stepStatement();
            break;
        case GraphParser.If:
            this.enterOuterAlt(localctx, 2);
            this.state = 65;
            this.ifStatement();
            break;
        case GraphParser.Switch:
            this.enterOuterAlt(localctx, 3);
            this.state = 66;
            this.switchStatement();
            break;
        case GraphParser.Goto:
            this.enterOuterAlt(localctx, 4);
            this.state = 67;
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




GraphParser.StatementListContext = StatementListContext;

GraphParser.prototype.statementList = function() {

    var localctx = new StatementListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, GraphParser.RULE_statementList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 71; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 70;
            this.statement();
            this.state = 73; 
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




GraphParser.InferenceDeclarationContext = InferenceDeclarationContext;

GraphParser.prototype.inferenceDeclaration = function() {

    var localctx = new InferenceDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, GraphParser.RULE_inferenceDeclaration);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 75;
        this.identifier();
        this.state = 76;
        this.match(GraphParser.Assign);
        this.state = 77;
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




GraphParser.BlockContext = BlockContext;

GraphParser.prototype.block = function() {

    var localctx = new BlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, GraphParser.RULE_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 79;
        this.match(GraphParser.OpenBrace);
        this.state = 81;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GraphParser.Action) | (1 << GraphParser.Goto) | (1 << GraphParser.If) | (1 << GraphParser.Switch))) !== 0)) {
            this.state = 80;
            this.statementList();
        }

        this.state = 83;
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

ImportStatementContext.prototype.StringLiteral = function() {
    return this.getToken(GraphParser.StringLiteral, 0);
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




GraphParser.ImportStatementContext = ImportStatementContext;

GraphParser.prototype.importStatement = function() {

    var localctx = new ImportStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, GraphParser.RULE_importStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 85;
        this.match(GraphParser.Import);
        this.state = 86;
        this.moduleItems();
        this.state = 87;
        this.match(GraphParser.From);
        this.state = 88;
        this.match(GraphParser.StringLiteral);
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




GraphParser.ModuleItemsContext = ModuleItemsContext;

GraphParser.prototype.moduleItems = function() {

    var localctx = new ModuleItemsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, GraphParser.RULE_moduleItems);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 90;
        this.match(GraphParser.OpenBrace);
        this.state = 96;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,7,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 91;
                this.identifier();
                this.state = 92;
                this.match(GraphParser.Comma); 
            }
            this.state = 98;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,7,this._ctx);
        }

        this.state = 103;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===GraphParser.Identifier) {
            this.state = 99;
            this.identifier();
            this.state = 101;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===GraphParser.Comma) {
                this.state = 100;
                this.match(GraphParser.Comma);
            }

        }

        this.state = 105;
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



GraphParser.ExportStatementContext = ExportStatementContext;

GraphParser.prototype.exportStatement = function() {

    var localctx = new ExportStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, GraphParser.RULE_exportStatement);
    try {
        localctx = new ExportDeclarationContext(this, localctx);
        this.enterOuterAlt(localctx, 1);
        this.state = 107;
        this.match(GraphParser.Export);
        this.state = 110;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
        switch(la_) {
        case 1:
            this.state = 108;
            this.identifier();
            break;

        case 2:
            this.state = 109;
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




GraphParser.StepStatementContext = StepStatementContext;

GraphParser.prototype.stepStatement = function() {

    var localctx = new StepStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, GraphParser.RULE_stepStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 112;
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




GraphParser.IfStatementContext = IfStatementContext;

GraphParser.prototype.ifStatement = function() {

    var localctx = new IfStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, GraphParser.RULE_ifStatement);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 114;
        this.match(GraphParser.If);
        this.state = 115;
        this.expression();
        this.state = 116;
        this.match(GraphParser.Result);
        this.state = 117;
        this.block();
        this.state = 120;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===GraphParser.Else) {
            this.state = 118;
            this.match(GraphParser.Else);
            this.state = 119;
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




GraphParser.ExpressionContext = ExpressionContext;

GraphParser.prototype.expression = function() {

    var localctx = new ExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, GraphParser.RULE_expression);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 122;
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




GraphParser.SwitchStatementContext = SwitchStatementContext;

GraphParser.prototype.switchStatement = function() {

    var localctx = new SwitchStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, GraphParser.RULE_switchStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 124;
        this.match(GraphParser.Switch);
        this.state = 125;
        this.expression();
        this.state = 126;
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




GraphParser.SwitchBlockContext = SwitchBlockContext;

GraphParser.prototype.switchBlock = function() {

    var localctx = new SwitchBlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, GraphParser.RULE_switchBlock);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 128;
        this.match(GraphParser.OpenBrace);
        this.state = 130;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===GraphParser.Case) {
            this.state = 129;
            this.caseClauses();
        }

        this.state = 136;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===GraphParser.Default) {
            this.state = 132;
            this.defaultClause();
            this.state = 134;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===GraphParser.Case) {
                this.state = 133;
                this.caseClauses();
            }

        }

        this.state = 138;
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




GraphParser.CaseClausesContext = CaseClausesContext;

GraphParser.prototype.caseClauses = function() {

    var localctx = new CaseClausesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, GraphParser.RULE_caseClauses);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 141; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 140;
            this.caseClause();
            this.state = 143; 
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




GraphParser.CaseClauseContext = CaseClauseContext;

GraphParser.prototype.caseClause = function() {

    var localctx = new CaseClauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, GraphParser.RULE_caseClause);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 145;
        this.match(GraphParser.Case);
        this.state = 146;
        this.expression();
        this.state = 147;
        this.match(GraphParser.Result);
        this.state = 149;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===GraphParser.OpenBrace) {
            this.state = 148;
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




GraphParser.DefaultClauseContext = DefaultClauseContext;

GraphParser.prototype.defaultClause = function() {

    var localctx = new DefaultClauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, GraphParser.RULE_defaultClause);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 151;
        this.match(GraphParser.Default);
        this.state = 152;
        this.match(GraphParser.Result);
        this.state = 154;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===GraphParser.OpenBrace) {
            this.state = 153;
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




GraphParser.GotoStatementContext = GotoStatementContext;

GraphParser.prototype.gotoStatement = function() {

    var localctx = new GotoStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, GraphParser.RULE_gotoStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 156;
        this.match(GraphParser.Goto);
        this.state = 157;
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

StartStatementContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext,0);
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




GraphParser.StartStatementContext = StartStatementContext;

GraphParser.prototype.startStatement = function() {

    var localctx = new StartStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, GraphParser.RULE_startStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 159;
        this.match(GraphParser.Start);
        this.state = 162;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
        switch(la_) {
        case 1:
            this.state = 160;
            this.identifier();
            break;

        case 2:
            this.state = 161;
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


exports.GraphParser = GraphParser;
