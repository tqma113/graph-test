import { isAction, isReference, isKeyword, isPath } from './index';
export var WordType;
(function (WordType) {
    WordType[WordType["Action"] = 0] = "Action";
    WordType[WordType["Reference"] = 1] = "Reference";
    WordType[WordType["Keyword"] = 2] = "Keyword";
    WordType[WordType["Path"] = 3] = "Path";
    WordType[WordType["Invalid"] = 4] = "Invalid";
})(WordType || (WordType = {}));
export var getWordType = function (word) {
    if (isKeyword(word)) {
        return WordType.Keyword;
    }
    if (isAction(word)) {
        return WordType.Action;
    }
    if (isReference(word)) {
        return WordType.Reference;
    }
    if (isPath(word)) {
        return WordType.Path;
    }
    return WordType.Invalid;
};
