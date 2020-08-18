import * as monaco from "monaco-editor";
import { MODE_ID } from './index';
import server from './server';
var registerDiagnosticsAdapter = function () {
    var doValidate = function (model) {
        var markers = [];
        server.lexicalErrors.forEach(function (error) {
            markers.push({
                severity: monaco.MarkerSeverity.Error,
                message: error.message,
                startLineNumber: error.position.line,
                startColumn: error.position.column,
                endLineNumber: error.position.line,
                endColumn: error.position.column
            });
        });
        server.syntaxErrors.forEach(function (error) {
            markers.push({
                severity: monaco.MarkerSeverity.Error,
                message: error.message,
                startLineNumber: error.token.range.start.line,
                startColumn: error.token.range.start.column,
                endLineNumber: error.token.range.end.line,
                endColumn: error.token.range.end.column
            });
        });
        server.semanticErrors.forEach(function (error) {
            markers.push({
                severity: monaco.MarkerSeverity.Error,
                message: error.message,
                startLineNumber: error.fragment.range.start.line,
                startColumn: error.fragment.range.start.column,
                endLineNumber: error.fragment.range.end.line,
                endColumn: error.fragment.range.end.column
            });
        });
        monaco.editor.setModelMarkers(model, MODE_ID, markers);
    };
    var disposables = [];
    var listener = Object.create(null);
    var onModelAdd = function (model) {
        var handle;
        var changeSubscription = model.onDidChangeContent(function () {
            clearTimeout(handle);
            handle = setTimeout(function () { return doValidate(model); }, 500);
        });
        listener[model.uri.toString()] = {
            dispose: function () {
                changeSubscription.dispose();
                clearTimeout(handle);
            }
        };
        doValidate(model);
    };
    var onModelRemoved = function (model) {
        monaco.editor.setModelMarkers(model, MODE_ID, []);
        var key = model.uri.toString();
        if (listener[key]) {
            listener[key].dispose();
            delete listener[key];
        }
    };
    disposables.push(monaco.editor.onDidCreateModel(onModelAdd));
    disposables.push(monaco.editor.onWillDisposeModel(onModelRemoved));
    disposables.push({
        dispose: function () {
            for (var _i = 0, _a = monaco.editor.getModels(); _i < _a.length; _i++) {
                var model = _a[_i];
                onModelRemoved(model);
            }
        }
    });
    monaco.editor.getModels().forEach(onModelAdd);
};
export default registerDiagnosticsAdapter;
