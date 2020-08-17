var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useLayoutEffect, useRef, useState } from "react";
import registerLanguage from './language';
import server from './language/server';
import createEditor from './createEditor';
import { initTheme } from './theme';
import { FontSizeSelect } from './component';
var defaultStyle = {
    width: '800px',
    height: '900px',
};
var defaultOptions = {
    fontSize: 12
};
function MonacoEditor(_a) {
    var onChange = _a.onChange, style = _a.style, initialValue = _a.initialValue;
    var _b = useState(initialValue || '# start from here\n\n'), value = _b[0], setValue = _b[1];
    var _c = useState(defaultOptions), options = _c[0], setOptions = _c[1];
    var containerRef = useRef(null);
    var editor = useRef();
    var subscription = useRef();
    useLayoutEffect(function () {
        initMonaco();
        return function () {
            destoryMonaco();
        };
    }, [options]);
    useLayoutEffect(function () {
        server.didChange(value);
    }, [value]);
    var initMonaco = function () {
        registerLanguage();
        initTheme();
        editor.current = createEditor(containerRef.current, value, options);
        var model = editor.current.getModel();
        if (model) {
            subscription.current = model.onDidChangeContent(function (e) {
                if (onChange) {
                    var lines = model.getLinesContent();
                    var content = lines.join('\n');
                    setValue(content);
                    onChange(content);
                }
            });
        }
    };
    var destoryMonaco = function () {
        if (editor.current) {
            editor.current.dispose();
            var model = editor.current.getModel();
            if (model) {
                model.dispose();
            }
        }
        if (subscription.current) {
            subscription.current.dispose();
        }
    };
    var handleFonSizeSelect = function (event) {
        var fontSize = Number(event.target.value);
        setOptions(__assign(__assign({}, options), { fontSize: fontSize }));
    };
    style = __assign(__assign({}, defaultStyle), style);
    return (React.createElement("div", null,
        React.createElement("span", null,
            React.createElement(FontSizeSelect, { value: options.fontSize, onChange: handleFonSizeSelect })),
        React.createElement("div", { ref: containerRef, style: style })));
}
export default MonacoEditor;
