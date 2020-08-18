import { FragmentKind } from '../parser/ast';
import { NodeKind, createBlock, createActionNode, createIfTree, createSwitchTree, createCaseNode, createDefaultNode, createGotoNode } from './ast';
export var convert = function (program) {
    var blocks = [];
    var starts = [];
    var convertProgram = function (program) {
        program.moduleStatemens.forEach(convertModuleStatement);
    };
    var convertModuleStatement = function (moduleStatement) {
        switch (moduleStatement.kind) {
            case FragmentKind.ImportStatement: {
                convertImportStatement(moduleStatement);
                break;
            }
            case FragmentKind.ExportStatement: {
                convertExportStatement(moduleStatement);
                break;
            }
            case FragmentKind.StartStatement: {
                convertStartStatement(moduleStatement);
                break;
            }
            case FragmentKind.InferenceDefinition: {
                convertInferenceDefinition(moduleStatement);
                break;
            }
        }
    };
    var convertInferenceDefinition = function (inferenceDefinition) {
        var name = getContent(inferenceDefinition.identifier.word);
        var children = convertBlock(inferenceDefinition.block);
        blocks.push(createBlock(name, children));
    };
    var convertImportStatement = function (importStatement) {
        convertModuleItems(importStatement.moduleItems);
    };
    var convertModuleItems = function (moduleItems) {
    };
    var convertModule = function (module) {
        if (module.definition) {
            convertInferenceDefinition(module.definition);
        }
    };
    var convertExportStatement = function (exportStatement) {
    };
    var convertStartStatement = function (startStatement) {
        var name = getContent(startStatement.module.identifier.word);
        convertModule(startStatement.module);
        starts.push(name);
    };
    var convertBlock = function (block) {
        return block.list.map(checkStatement);
    };
    var checkStatement = function (statement) {
        switch (statement.kind) {
            case FragmentKind.StepStatement: {
                return convertStepStatement(statement);
            }
            case FragmentKind.IfStatement: {
                return convertIfStatement(statement);
            }
            case FragmentKind.SwitchStatement: {
                return convertSwitchStatement(statement);
            }
            case FragmentKind.GotoStatement: {
                return convertGotoStatement(statement);
            }
        }
    };
    var convertStepStatement = function (stepStatement) {
        var expression = getContent(stepStatement.expression.word);
        return createActionNode(expression);
    };
    var convertIfStatement = function (ifStatement) {
        var expression = getContent(ifStatement.expression.word);
        var successChildren = convertBlock(ifStatement.ifBlock);
        var faildChildren = ifStatement.elseBlock
            ? convertBlock(ifStatement.elseBlock)
            : [];
        return createIfTree(expression, successChildren, faildChildren);
    };
    var convertSwitchStatement = function (switchStatement) {
        var condition = getContent(switchStatement.expression.word);
        var _a = convertSwitchBlock(switchStatement.switchBlock), children = _a[0], defaultChild = _a[1];
        return createSwitchTree(condition, children, defaultChild);
    };
    var convertSwitchBlock = function (switchBlock) {
        return [
            switchBlock.caseClauses.map(convertCaseClause),
            switchBlock.defaultClause ? convertDefaultClause(switchBlock.defaultClause) : null
        ];
    };
    var convertCaseClause = function (caseClause) {
        var expectation = getContent(caseClause.expression.word);
        var children = convertBlock(caseClause.block);
        return createCaseNode(expectation, children);
    };
    var convertDefaultClause = function (defaultClause) {
        var children = convertBlock(defaultClause.block);
        return createDefaultNode(children);
    };
    var convertGotoStatement = function (gotoStatement) {
        var name = getContent(gotoStatement.identifier.word);
        return createGotoNode(name);
    };
    convertProgram(program);
    return {
        kind: NodeKind.Tree,
        blocks: blocks,
        starts: starts
    };
};
var getContent = function (word) {
    return word.slice(1, word.length - 1);
};
