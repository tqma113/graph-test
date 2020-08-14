import React from 'react';
var fontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 36, 42, 48, 56];
export var FontSizeSelect = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return (React.createElement("span", null,
        React.createElement("span", null, "\u5B57\u53F7"),
        React.createElement("select", { value: value, onChange: onChange }, fontSizes.map(function (fontSize) {
            return (React.createElement("option", { key: fontSize, value: fontSize }, fontSize));
        }))));
};
