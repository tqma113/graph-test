Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const language_1 = tslib_1.__importDefault(require("./language"));
const createEditor_1 = tslib_1.__importDefault(require("./createEditor"));
const theme_1 = require("./theme");
const component_1 = require("./component");
const defaultStyle = {
    width: '800px',
    height: '900px',
};
const defaultOptions = {
    fontSize: 12
};
function MonacoEditor({ onChange, style, initialValue }) {
    const [value, setValue] = react_1.useState(initialValue || '# start from here\n\n');
    const [options, setOptions] = react_1.useState(defaultOptions);
    const containerRef = react_1.useRef(null);
    const editor = react_1.useRef();
    const subscription = react_1.useRef();
    react_1.useLayoutEffect(() => {
        initMonaco();
        return () => {
            destoryMonaco();
        };
    }, [options]);
    const initMonaco = () => {
        language_1.default();
        theme_1.initTheme();
        editor.current = createEditor_1.default(containerRef.current, value, options);
        const model = editor.current.getModel();
        if (model) {
            subscription.current = model.onDidChangeContent((e) => {
                if (onChange) {
                    const lines = model.getLinesContent();
                    const content = lines.join('\n');
                    setValue(content);
                    onChange(content);
                }
            });
        }
    };
    const destoryMonaco = () => {
        if (editor.current) {
            editor.current.dispose();
            const model = editor.current.getModel();
            if (model) {
                model.dispose();
            }
        }
        if (subscription.current) {
            subscription.current.dispose();
        }
    };
    const handleFonSizeSelect = (event) => {
        const fontSize = Number(event.target.value);
        setOptions({
            ...options,
            fontSize
        });
    };
    style = {
        ...defaultStyle,
        ...style
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("span", null,
            react_1.default.createElement(component_1.FontSizeSelect, { value: options.fontSize, onChange: handleFonSizeSelect })),
        react_1.default.createElement("div", { ref: containerRef, style: style })));
}
exports.default = MonacoEditor;
