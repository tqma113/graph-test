export const isReference = (word: string) => {
  return /<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)>/g.test(word)
}