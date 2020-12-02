const keywords = [
  'start',
  'goto',
  'if',
  'else',
  'switch',
  'case',
  'default',
  'import',
  'export',
  'from',
]

export const isKeyword = (word: string) => {
  return keywords.includes(word)
}

export const isValidIdentifierStr = (word: string) => {
  return /<([^\<\>\s]+)>/g.test(word)
}

export const isValidActionStr = (word: string) => {
  return /\[([^\[\]\s]+)\]/.test(word)
}

export const isValidPathStr = (word: string) => {
  return /\"([^\"\s]+)\"/g.test(word)
}
export enum WordType {
  Action,
  Reference,
  Keyword,
  Path,
  Invalid,
}

export const getWordType = (word: string) => {
  if (isKeyword(word)) {
    return WordType.Keyword
  }

  if (isValidActionStr(word)) {
    return WordType.Action
  }

  if (isValidIdentifierStr(word)) {
    return WordType.Reference
  }

  if (isValidPathStr(word)) {
    return WordType.Path
  }

  return WordType.Invalid
}
