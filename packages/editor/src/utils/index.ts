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

export const isReference = (word: string) => {
  return /<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)>/g.test(
    word
  )
}

export const isAction = (word: string) => {
  return /\[([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\]/.test(
    word
  )
}

export const isPath = (word: string) => {
  return /\"([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\"/g.test(
    word
  )
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

  if (isAction(word)) {
    return WordType.Action
  }

  if (isReference(word)) {
    return WordType.Reference
  }

  if (isPath(word)) {
    return WordType.Path
  }

  return WordType.Invalid
}
