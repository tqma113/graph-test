const keywords = ['start', 'goto', 'if', 'else', 'switch', 'case', 'default', 'import', 'export', 'from']

export const isKeyword = (word: string) => {
  return keywords.includes(word)
}