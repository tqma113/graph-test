class SyntaxError extends Error {
  constructor({ pos, message }) {
    super({ pos, message })

    this.pos = pos
    this.code = 'SyntaxError'
    this.message = `${message} at line: ${pos.line}, column: ${pos.column}`

    Error.captureStackTrace(this);
  }
}

module.exports = SyntaxError