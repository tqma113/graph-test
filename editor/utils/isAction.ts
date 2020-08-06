export const isAction = (word: string) => {
  return /\[.*\]/.test(word)
}