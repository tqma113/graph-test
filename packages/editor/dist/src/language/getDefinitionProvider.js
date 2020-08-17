import { isReference } from '../utils';
import server from './server';
var getDefinitionProvider = function () {
    return {
        provideDefinition: function (model, position, token) {
            var uri = model.uri;
            var word = model.getWordAtPosition(position);
            if (word && isReference(word.word)) {
                var name_1 = word.word.slice(1, word.word.length - 1);
                var defination = server.definations.get(name_1);
                if (defination) {
                    return {
                        uri: uri,
                        range: {
                            startLineNumber: defination.definition.range.start.line,
                            startColumn: defination.definition.range.start.column,
                            endLineNumber: defination.definition.range.end.line,
                            endColumn: defination.definition.range.end.column
                        }
                    };
                }
            }
            return null;
        }
    };
};
export default getDefinitionProvider;
