const keywords = ['start', 'goto', 'if', 'else', 'switch', 'case', 'default', 'import', 'export', 'from']

export const isKeyword = (word: string) => {
  return keywords.includes(word)
}

const operators = ['{', '}', '=', '->', ',']

export const isOperator = (word: string) => {
  return operators.includes(word)
}

export const isAction = (word: string) => {
  return /\[([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\]/.test(word)
}

export const isPath = (word: string) => {
  return /\"([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\"/g.test(word)
}

export const isReference = (word: string) => {
  return /<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)>/g.test(word)
}

export const isWhitespace = (char: string) => {
  return /\s/.test(char) && char.length === 1
}

export const isDigit = (char: string) => {
  return /\d/.test(char) && char.length === 1
}