var keywords = ['start', 'goto', 'if', 'else', 'switch', 'case', 'default', 'import', 'export', 'from'];
export var isKeyword = function (word) {
    return keywords.includes(word);
};
