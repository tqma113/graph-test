import { isReference } from '../utils';
import server from './server';
var getReferenceProvider = function () {
    return {
        provideReferences: function (model, position, context, token) {
            var uri = model.uri;
            var word = model.getWordAtPosition(position);
            console.log({
                word: word,
                uri: uri,
                isReference: isReference((word === null || word === void 0 ? void 0 : word.word) || '')
            });
            if (word && isReference(word.word)) {
                var name_1 = word.word.slice(1, word.word.length - 1);
                var defination = server.definations.get(name_1);
                if (defination) {
                    return [{
                            uri: uri,
                            range: {
                                startLineNumber: defination.definition.range.start.line,
                                startColumn: defination.definition.range.start.column,
                                endLineNumber: defination.definition.range.end.line,
                                endColumn: defination.definition.range.end.column
                            }
                        }];
                }
            }
            return null;
        }
    };
};
export default getReferenceProvider;
