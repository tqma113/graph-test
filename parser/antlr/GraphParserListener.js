// Generated from GraphParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by GraphParser.
function GraphParserListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

GraphParserListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
GraphParserListener.prototype.constructor = GraphParserListener;

// Enter a parse tree produced by GraphParser#program.
GraphParserListener.prototype.enterProgram = function(ctx) {
};

// Exit a parse tree produced by GraphParser#program.
GraphParserListener.prototype.exitProgram = function(ctx) {
};


// Enter a parse tree produced by GraphParser#moduleStatement.
GraphParserListener.prototype.enterModuleStatement = function(ctx) {
};

// Exit a parse tree produced by GraphParser#moduleStatement.
GraphParserListener.prototype.exitModuleStatement = function(ctx) {
};


// Enter a parse tree produced by GraphParser#moduleStatements.
GraphParserListener.prototype.enterModuleStatements = function(ctx) {
};

// Exit a parse tree produced by GraphParser#moduleStatements.
GraphParserListener.prototype.exitModuleStatements = function(ctx) {
};


// Enter a parse tree produced by GraphParser#identifier.
GraphParserListener.prototype.enterIdentifier = function(ctx) {
};

// Exit a parse tree produced by GraphParser#identifier.
GraphParserListener.prototype.exitIdentifier = function(ctx) {
};


// Enter a parse tree produced by GraphParser#path.
GraphParserListener.prototype.enterPath = function(ctx) {
};

// Exit a parse tree produced by GraphParser#path.
GraphParserListener.prototype.exitPath = function(ctx) {
};


// Enter a parse tree produced by GraphParser#statement.
GraphParserListener.prototype.enterStatement = function(ctx) {
};

// Exit a parse tree produced by GraphParser#statement.
GraphParserListener.prototype.exitStatement = function(ctx) {
};


// Enter a parse tree produced by GraphParser#statementList.
GraphParserListener.prototype.enterStatementList = function(ctx) {
};

// Exit a parse tree produced by GraphParser#statementList.
GraphParserListener.prototype.exitStatementList = function(ctx) {
};


// Enter a parse tree produced by GraphParser#inferenceDeclaration.
GraphParserListener.prototype.enterInferenceDeclaration = function(ctx) {
};

// Exit a parse tree produced by GraphParser#inferenceDeclaration.
GraphParserListener.prototype.exitInferenceDeclaration = function(ctx) {
};


// Enter a parse tree produced by GraphParser#block.
GraphParserListener.prototype.enterBlock = function(ctx) {
};

// Exit a parse tree produced by GraphParser#block.
GraphParserListener.prototype.exitBlock = function(ctx) {
};


// Enter a parse tree produced by GraphParser#importStatement.
GraphParserListener.prototype.enterImportStatement = function(ctx) {
};

// Exit a parse tree produced by GraphParser#importStatement.
GraphParserListener.prototype.exitImportStatement = function(ctx) {
};


// Enter a parse tree produced by GraphParser#moduleItems.
GraphParserListener.prototype.enterModuleItems = function(ctx) {
};

// Exit a parse tree produced by GraphParser#moduleItems.
GraphParserListener.prototype.exitModuleItems = function(ctx) {
};


// Enter a parse tree produced by GraphParser#module.
GraphParserListener.prototype.enterModule = function(ctx) {
};

// Exit a parse tree produced by GraphParser#module.
GraphParserListener.prototype.exitModule = function(ctx) {
};


// Enter a parse tree produced by GraphParser#exportStatement.
GraphParserListener.prototype.enterExportStatement = function(ctx) {
};

// Exit a parse tree produced by GraphParser#exportStatement.
GraphParserListener.prototype.exitExportStatement = function(ctx) {
};


// Enter a parse tree produced by GraphParser#stepStatement.
GraphParserListener.prototype.enterStepStatement = function(ctx) {
};

// Exit a parse tree produced by GraphParser#stepStatement.
GraphParserListener.prototype.exitStepStatement = function(ctx) {
};


// Enter a parse tree produced by GraphParser#ifStatement.
GraphParserListener.prototype.enterIfStatement = function(ctx) {
};

// Exit a parse tree produced by GraphParser#ifStatement.
GraphParserListener.prototype.exitIfStatement = function(ctx) {
};


// Enter a parse tree produced by GraphParser#expression.
GraphParserListener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by GraphParser#expression.
GraphParserListener.prototype.exitExpression = function(ctx) {
};


// Enter a parse tree produced by GraphParser#switchStatement.
GraphParserListener.prototype.enterSwitchStatement = function(ctx) {
};

// Exit a parse tree produced by GraphParser#switchStatement.
GraphParserListener.prototype.exitSwitchStatement = function(ctx) {
};


// Enter a parse tree produced by GraphParser#switchBlock.
GraphParserListener.prototype.enterSwitchBlock = function(ctx) {
};

// Exit a parse tree produced by GraphParser#switchBlock.
GraphParserListener.prototype.exitSwitchBlock = function(ctx) {
};


// Enter a parse tree produced by GraphParser#caseClauses.
GraphParserListener.prototype.enterCaseClauses = function(ctx) {
};

// Exit a parse tree produced by GraphParser#caseClauses.
GraphParserListener.prototype.exitCaseClauses = function(ctx) {
};


// Enter a parse tree produced by GraphParser#caseClause.
GraphParserListener.prototype.enterCaseClause = function(ctx) {
};

// Exit a parse tree produced by GraphParser#caseClause.
GraphParserListener.prototype.exitCaseClause = function(ctx) {
};


// Enter a parse tree produced by GraphParser#defaultClause.
GraphParserListener.prototype.enterDefaultClause = function(ctx) {
};

// Exit a parse tree produced by GraphParser#defaultClause.
GraphParserListener.prototype.exitDefaultClause = function(ctx) {
};


// Enter a parse tree produced by GraphParser#gotoStatement.
GraphParserListener.prototype.enterGotoStatement = function(ctx) {
};

// Exit a parse tree produced by GraphParser#gotoStatement.
GraphParserListener.prototype.exitGotoStatement = function(ctx) {
};


// Enter a parse tree produced by GraphParser#startStatement.
GraphParserListener.prototype.enterStartStatement = function(ctx) {
};

// Exit a parse tree produced by GraphParser#startStatement.
GraphParserListener.prototype.exitStartStatement = function(ctx) {
};



exports.GraphParserListener = GraphParserListener;