export const isReference = (word: string) => {
  return /<.*>/.test(word)
}