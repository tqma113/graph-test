import * as monaco from "monaco-editor";
import { isKeyword, isReference, isAction } from '../utils';
var getKeywordHover = function (keyword) {
    switch (keyword) {
        case 'goto':
            return [
                {
                    value: 'goto'
                },
                {
                    value: 'Enter another progress.'
                }
            ];
        case 'start':
            return [
                {
                    value: 'start'
                },
                {
                    value: 'Set the progress as a enterance.'
                }
            ];
        default:
            return [];
    }
};
var getHoverProvider = function () {
    return {
        provideHover: function (model, position, token) {
            var word = model.getWordAtPosition(position);
            if (word) {
                if (isKeyword(word.word)) {
                    var contents = getKeywordHover(word.word);
                    var range = new monaco.Range(position.lineNumber, word.startColumn || 0, position.lineNumber, (word === null || word === void 0 ? void 0 : word.endColumn) || 0);
                    return {
                        range: range,
                        contents: contents
                    };
                }
                else {
                    var line = model.getLineContent(position.lineNumber);
                    var start = Math.max(0, word.startColumn - 2);
                    var end = Math.min(line.length, word.endColumn + 2);
                    var content = line.slice(start, end);
                    if (isReference(content)) {
                        var contents = [
                            {
                                value: 'Reference'
                            },
                            {
                                value: word.word
                            }
                        ];
                        var range = new monaco.Range(position.lineNumber, word.startColumn || 0, position.lineNumber, (word === null || word === void 0 ? void 0 : word.endColumn) || 0);
                        return {
                            range: range,
                            contents: contents
                        };
                    }
                    else if (isAction(content)) {
                        var contents = [
                            {
                                value: 'Action'
                            },
                            {
                                value: word.word
                            }
                        ];
                        var range = new monaco.Range(position.lineNumber, word.startColumn || 0, position.lineNumber, (word === null || word === void 0 ? void 0 : word.endColumn) || 0);
                        return {
                            range: range,
                            contents: contents
                        };
                    }
                    else {
                        return null;
                    }
                }
            }
            else {
                return null;
            }
        }
    };
};
export default getHoverProvider;
