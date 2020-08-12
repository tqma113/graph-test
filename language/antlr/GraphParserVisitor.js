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
  switch (childContext.parser.ruleNames[childContext.ruleIndex]) {
    case 'inferenceDeclaration':
      moduleStatement = this.visitInferenceDeclaration(childContext)
      break
    case 'importStatement':
      moduleStatement = this.visitImportStatement(childContext)
      break
    case 'exportStatement':
      moduleStatement = this.visitExportStatement(childContext)
      break
    case 'startStatement':
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
  return ctx.children.map(
    childContext => this.visitModuleStatement(childContext)
  )
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
  const childContext = ctx.children[0]
  let statement = null
  switch (childContext.parser.ruleNames[childContext.ruleIndex]) {
    case 'stepStatement':
      statement = this.visitStepStatement(childContext)
      break
    case 'ifStatement':
      statement = this.visitIfStatement(childContext)
      break
    case 'switchStatement':
      statement = this.visitSwitchStatement(childContext)
      break
    case 'gotoStatement':
      statement = this.visitGotoStatement(childContext)
      break
    default:
  }

  return statement
};


// Visit a parse tree produced by GraphParser#statementList.
GraphParserVisitor.prototype.visitStatementList = function(ctx) {
  return ctx.children.map(
    childContext => this.visitStatement(childContext)
  )
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
  const statements = ctx.children.length === 3 ?
    this.visitStatementList(ctx.children[1]) : []

  return {
    type: 'block',

    statements,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  }
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
  const items = ctx.children.slice(1, ctx.children.length - 1).filter((childContext) => {
    return (childContext.ruleIndex !== undefined) &&
      ctx.parser.ruleNames[childContext.ruleIndex] === 'identifier'
  })

  return {
    type: 'moduleItems',

    identifiers: items.map(childContext => this.visitIdentifier(childContext)),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#module.
GraphParserVisitor.prototype.visitModule = function(ctx) {
  const childContext = ctx.children[0]
  let module = null
  switch (childContext.parser.ruleNames[childContext.ruleIndex]) {
    case 'identifier':
      module = this.visitIdentifier(childContext)
      break
    case 'inferenceDeclaration':
      module = this.visitInferenceDeclaration(childContext)
      break
    default:
  }

  return module
};


// Visit a parse tree produced by GraphParser#exportStatement.
GraphParserVisitor.prototype.visitExportStatement = function(ctx) {
  return {
    type: 'exportStatement',

    module: this.visitModule(ctx.children[1]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#stepStatement.
GraphParserVisitor.prototype.visitStepStatement = function(ctx) {
  return {
    type: 'stepStatement',

    stepStr: ctx.children[0].getSymbol(),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#ifStatement.
GraphParserVisitor.prototype.visitIfStatement = function(ctx) {
  const elseBlock = ctx.children.length > 4 ?
    this.visitBlock(ctx.children[5]) : null

  return {
    type: 'ifStatement',

    expression: this.visitExpression(ctx.children[1]),
    block: this.visitBlock(ctx.children[3]),
    elseBlock,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#expression.
GraphParserVisitor.prototype.visitExpression = function(ctx) {
  return {
    type: 'expression',

    // expressionStr: ctx.children[0].getSymbol(),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#switchStatement.
GraphParserVisitor.prototype.visitSwitchStatement = function(ctx) {
  return {
    type: 'switchStatement',

    expression: this.visitExpression(ctx.children[1]),
    switchBlock: this.visitSwitchBlock(ctx.children[2]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#switchBlock.
GraphParserVisitor.prototype.visitSwitchBlock = function(ctx) {
  let caseClauses = []
  let defaultClause = null

  if (ctx.children.length > 2) {
    ctx.children.slice(1, ctx.children.length - 1).forEach((childContext) => {
      if (childContext.parser.ruleNames[childContext.ruleIndex] === 'defaultClause') {
        defaultClause = this.visitDefaultClause(childContext)
      } else if (childContext.parser.ruleNames[childContext.ruleIndex] === 'caseClauses') {
        caseClauses.concat(this.visitCaseClauses(childContext))
      }
    })
  }

  return {
    type: 'switchBlock',

    caseClauses,
    defaultClause,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#caseClauses.
GraphParserVisitor.prototype.visitCaseClauses = function(ctx) {
  return ctx.children.map(childContext => this.visitCaseClause(childContext));
};


// Visit a parse tree produced by GraphParser#caseClause.
GraphParserVisitor.prototype.visitCaseClause = function(ctx) {
  const block = ctx.children.length === 4 ?
    this.visitBlock(ctx.children[3]) : null
  return {
    type: 'caseClause',

    expression: this.visitExpression(ctx.children[1]),
    block,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#defaultClause.
GraphParserVisitor.prototype.visitDefaultClause = function(ctx) {
  const block = ctx.children.length === 3 ?
    this.visitBlock(ctx.children[2]) : null
  return {
    type: 'defaultClause',

    block,

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#gotoStatement.
GraphParserVisitor.prototype.visitGotoStatement = function(ctx) {
  return {
    type: 'gotoStatement',

    identifier: this.visitIdentifier(ctx.children[1]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};


// Visit a parse tree produced by GraphParser#startStatement.
GraphParserVisitor.prototype.visitStartStatement = function(ctx) {
  return {
    type: 'startStatement',

    module: this.visitModule(ctx.children[1]),

    pos: {
      start: ctx.start,
      stop: ctx.stop
    }
  };
};



exports.GraphParserVisitor = GraphParserVisitor;