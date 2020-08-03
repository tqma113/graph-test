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
  return {
    type: 'program',

    moduleStatements: this.visitModuleStatements(ctx.children[0]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#moduleStatement.
GraphParserVisitor.prototype.visitModuleStatement = function(ctx) {
  const childContext = ctx.children[0]
  let moduleStatement = null
  switch (childContext.ruleIndex) {
    // inferenceDeclaration
    case 7:
      moduleStatement = this.visitInferenceDeclaration(childContext)
      break
      // importStatement
    case 9:
      moduleStatement = this.visitImportStatement(childContext)
      break
      // exportStatement
    case 11:
      moduleStatement = this.visitExportDeclaration(childContext)
      break
      // startStatement
    case 21:
      moduleStatement = this.visitStartStatement(childContext)
      break
    default:
  }

  return {
    type: 'moduleStatement',

    moduleStatement,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#moduleStatements.
GraphParserVisitor.prototype.visitModuleStatements = function(ctx) {
  return {
    type: 'moduleStatements',

    moduleStatementList: ctx.children.map(
      childContext => this.visitModuleStatement(childContext)
    ),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#identifier.
GraphParserVisitor.prototype.visitIdentifier = function(ctx) {
  return {
    type: 'identifier',

    name: ctx.children[0].getSymbol(),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#path.
GraphParserVisitor.prototype.visitPath = function(ctx) {
  return {
    type: 'path',

    pathStr: ctx.children[0].getSymbol(),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
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
  return {
    type: 'inferenceDeclaration',

    identifier: this.visitIdentifier(ctx.children[0]),
    block: this.visitBlock(ctx.children[2]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
};


// Visit a parse tree produced by GraphParser#block.
GraphParserVisitor.prototype.visitBlock = function(ctx) {
  return {
    type: 'block'
  }
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by GraphParser#importStatement.
GraphParserVisitor.prototype.visitImportStatement = function(ctx) {
  return {
    type: 'importStatement',

    moduleItems: this.visitModuleItems(ctx.children[1]),
    path: this.visitPath(ctx.children[3]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
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