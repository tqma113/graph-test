import { isReference } from '../utils';
var getDefinitionProvider = function () {
    return {
        provideDefinition: function (model, position, token) {
            // TODO
            var resource = model.uri;
            var offset = model.getOffsetAt(position);
            var word = model.getWordAtPosition(position);
            if (word && isReference(word.word)) {
                // TODO: Find definition
            }
            console.log({
                resource: resource,
                offset: offset,
                word: word
            });
            return null;
        }
    };
};
export default getDefinitionProvider;
