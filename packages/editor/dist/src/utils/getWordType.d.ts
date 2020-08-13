export declare enum WordType {
    Action = 0,
    Reference = 1,
    Keyword = 2,
    Path = 3,
    Invalid = 4
}
export declare const getWordType: (word: string) => WordType;
