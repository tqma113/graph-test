class SemanticError extends Error {
  constructor({ pos, name, lastPos }) {
    super(payload)

    this.code = 'SemanticError'
    this.message = `${name} has beed declared twice at line: ${pos.line}, column: ${pos.column}, last declaration at line: ${lastPos.line}, column: ${lastPos.column}`

    Error.captureStackTrace(this);
  }
}

module.exports = SyntaxError