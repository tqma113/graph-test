import { KeywordEnum, OperatorEnum } from './constants';
var keywords = Object.values(KeywordEnum);
export var isKeyword = function (word) {
    return keywords.includes(word);
};
var operators = Object.values(OperatorEnum);
export var isOperator = function (word) {
    return operators.includes(word);
};
export var isValidContentChar = function (char) {
    return /[^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]/g.test(char);
};
export var isAction = function (word) {
    return /\[([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\]/.test(word);
};
export var isPath = function (word) {
    return /\"([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\"/g.test(word);
};
export var isReference = function (word) {
    return /<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)>/g.test(word);
};
export var isWhitespace = function (char) {
    return /\s/.test(char) && char.length === 1;
};
export var isNewLineChar = function (char) {
    return /[\r\n]+/.test(char);
};
export var isDigit = function (char) {
    return /\d/.test(char) && char.length === 1;
};
export var isLetter = function (char) {
    return /[a-zA-Z]/.test(char) && char.length === 1;
};
