// Generated from GraphParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by GraphParser.

function GraphParserVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

GraphParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
GraphParserVisitor.prototype.constructor = GraphParserVisitor;

// Visit a parse tree produced by GraphParser#program.
GraphParserVisitor.prototype.visitProgram = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#sourceElements.
GraphParserVisitor.prototype.visitSourceElements = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#sourceElement.
GraphParserVisitor.prototype.visitSourceElement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#moduleStatement.
GraphParserVisitor.prototype.visitModuleStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#identifier.
GraphParserVisitor.prototype.visitIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#statement.
GraphParserVisitor.prototype.visitStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#statementList.
GraphParserVisitor.prototype.visitStatementList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#inferenceDeclaration.
GraphParserVisitor.prototype.visitInferenceDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#block.
GraphParserVisitor.prototype.visitBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#importStatement.
GraphParserVisitor.prototype.visitImportStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#moduleItems.
GraphParserVisitor.prototype.visitModuleItems = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#ExportDeclaration.
GraphParserVisitor.prototype.visitExportDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#stepStatement.
GraphParserVisitor.prototype.visitStepStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#ifStatement.
GraphParserVisitor.prototype.visitIfStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#expression.
GraphParserVisitor.prototype.visitExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#switchStatement.
GraphParserVisitor.prototype.visitSwitchStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#switchBlock.
GraphParserVisitor.prototype.visitSwitchBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#caseClauses.
GraphParserVisitor.prototype.visitCaseClauses = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#caseClause.
GraphParserVisitor.prototype.visitCaseClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#defaultClause.
GraphParserVisitor.prototype.visitDefaultClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#gotoStatement.
GraphParserVisitor.prototype.visitGotoStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#startStatement.
GraphParserVisitor.prototype.visitStartStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#eos.
GraphParserVisitor.prototype.visitEos = function(ctx) {
  return this.visitChildren(ctx);
};



exports.GraphParserVisitor = GraphParserVisitor;