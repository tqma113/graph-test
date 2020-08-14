import { SemanticError } from './SemanticError';
import { FragmentKind } from '../parser/ast';
export var checkSemantic = function (program) {
    var inferenceTable = new Map();
    var errors = [];
    var record = function () {
        program.moduleStatemens.forEach(function (moduleStatement) {
            switch (moduleStatement.kind) {
                case FragmentKind.ImportStatement: {
                    recordImport(moduleStatement);
                    break;
                }
                case FragmentKind.InferenceDeclaration: {
                    recordDeclaration(moduleStatement);
                    break;
                }
                case FragmentKind.StartStatement: {
                    recordStart(moduleStatement);
                    break;
                }
            }
        });
    };
    var recordImport = function (importStatement) {
        importStatement.moduleItems.identifiers.forEach(function (identifier) {
            addInference({
                identifier: identifier,
                declaration: importStatement
            });
        });
    };
    var recordDeclaration = function (inferenceDeclaration) {
        addInference({
            identifier: inferenceDeclaration.identifier,
            declaration: inferenceDeclaration
        });
    };
    var recordStart = function (startStatement) {
        if (startStatement.module.declaration) {
            addInference({
                identifier: startStatement.module.identifier,
                declaration: startStatement.module.declaration
            });
        }
    };
    var addInference = function (inference) {
        var name = getContent(inference.identifier.word);
        if (inferenceTable.has(name)) {
            reportError("Module " + name + " has been declared twice", inference.declaration);
        }
        else {
            inferenceTable.set(name, inference);
        }
    };
    var checkProgram = function (program) {
        program.moduleStatemens.forEach(checkModuleStatement);
    };
    var checkModuleStatement = function (moduleStatement) {
        switch (moduleStatement.kind) {
            case FragmentKind.ImportStatement: {
                checkImportStatement(moduleStatement);
                break;
            }
            case FragmentKind.ExportStatement: {
                checkExportStatement(moduleStatement);
                break;
            }
            case FragmentKind.StartStatement: {
                checkStartStatement(moduleStatement);
                break;
            }
            case FragmentKind.InferenceDeclaration: {
                checkInferenceDeclaration(moduleStatement);
                break;
            }
        }
    };
    var checkInferenceDeclaration = function (inferenceDeclaration) {
        checkBlock(inferenceDeclaration.block);
    };
    var checkImportStatement = function (importStatement) {
        checkModuleItems(importStatement.moduleItems);
    };
    var checkModuleItems = function (moduleItems) {
    };
    var checkModule = function (module) {
        var name = getContent(module.identifier.word);
        if (!inferenceTable.has(name)) {
            reportError("Module " + name + " has not been declared", module);
        }
        if (module.declaration) {
            checkInferenceDeclaration(module.declaration);
        }
    };
    var checkExportStatement = function (exportStatement) {
        checkModule(exportStatement.module);
    };
    var checkStartStatement = function (startStatement) {
        checkModule(startStatement.module);
    };
    var checkBlock = function (block) {
        block.list.forEach(checkStatement);
    };
    var checkStatement = function (statement) {
        switch (statement.kind) {
            case FragmentKind.StepStatement: {
                checkStepStatement(statement);
                break;
            }
            case FragmentKind.IfStatement: {
                checkIfStatement(statement);
                break;
            }
            case FragmentKind.SwitchStatement: {
                checkSwitchStatement(statement);
                break;
            }
            case FragmentKind.GotoStatement: {
                checkGotoStatement(statement);
                break;
            }
        }
    };
    var checkStepStatement = function (stepStatement) {
    };
    var checkIfStatement = function (ifStatement) {
        checkBlock(ifStatement.ifBlock);
        if (ifStatement.elseBlock) {
            checkBlock(ifStatement.elseBlock);
        }
    };
    var checkSwitchStatement = function (switchStatement) {
        checkSwitchBlock(switchStatement.switchBlock);
    };
    var checkSwitchBlock = function (switchBlock) {
        switchBlock.caseClauses.forEach(checkCaseClause);
        if (switchBlock.defaultClause) {
            checkDefaultClause(switchBlock.defaultClause);
        }
    };
    var checkCaseClause = function (caseClause) {
        checkBlock(caseClause.block);
    };
    var checkDefaultClause = function (defaultClause) {
        checkBlock(defaultClause.block);
    };
    var checkGotoStatement = function (gotoStatement) {
        var name = getContent(gotoStatement.identifier.word);
        if (!inferenceTable.has(name)) {
            reportError("Module " + name + " has not been declared", gotoStatement);
        }
    };
    var reportError = function (message, fragment) {
        errors.push(new SemanticError(message, fragment));
    };
    record();
    checkProgram(program);
    return errors;
};
var getContent = function (word) {
    return word.slice(1, word.length - 1);
};
