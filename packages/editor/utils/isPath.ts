export const isPath = (word: string) => {
  return /\"([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\"/g.test(word)
}