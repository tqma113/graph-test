import React from "react";
export declare type MonacoEditorProps = {
    onChange?: (content: string) => void;
    onSave?: (content: string) => void;
    style?: React.CSSProperties;
    initialValue?: string;
};
declare function MonacoEditor({ onChange, style, initialValue }: MonacoEditorProps): JSX.Element;
export default MonacoEditor;
