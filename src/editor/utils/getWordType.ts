import { isAction, isReference, isKeyword, isPath } from './index'

export enum WordType {
  Action,
  Reference,
  Keyword,
  Path,
  Invalid
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