import { default as React_2 } from 'react';

declare function MonacoEditor({ onChange, style, initialValue }: MonacoEditorProps): JSX.Element;
export default MonacoEditor;

export declare type MonacoEditorProps = {
    onChange?: (content: string) => void;
    onSave?: (content: string) => void;
    style?: React_2.CSSProperties;
    initialValue?: string;
};

export { }
