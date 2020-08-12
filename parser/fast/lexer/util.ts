import { KeywordEnum, OperatorEnum } from './constants'

const keywords = Object.values(KeywordEnum)
export const isKeyword = (word: string) => {
  return keywords.includes(word as any)
}

const operators = Object.values(OperatorEnum)
export const isOperator = (word: string) => {
  return operators.includes(word as any)
}

export const isValidContentChar = (char: string) => {
  return /[^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]/g.test(char)
}

export const isAction = (word: string) => { // [xxx]
  return /\[([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\]/.test(word)
}

export const isPath = (word: string) => { // "xxx"
  return /\"([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\"/g.test(word)
}

export const isReference = (word: string) => { // <xxx>
  return /<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)>/g.test(word)
}

export const isWhitespace = (char: string) => {
  return /\s/.test(char) && char.length === 1
}

export const isNewLineChar = (char: string) => {
  return /[\r\n]+/.test(char)
}

export const isDigit = (char: string) => {
  return /\d/.test(char) && char.length === 1
}

export const isLetter = (char: string) => {
  return /[a-zA-Z]/.test(char) && char.length === 1
}