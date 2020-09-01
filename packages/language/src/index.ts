export type Position = {
  /**
   * Line position in a document (zero-based).
   */
  line: number

  /**
   * Character offset on a line in a document (zero-based). Assuming that the line is
   * represented as a string, the `column` value represents the gap between the
   * `column` and `column + 1`.
   *
   * If the column value is greater than the line length it defaults back to the line
   * length.
   */
  column: number
}

export type Range = {
  /**
   * The range's start position.
   */
  start: Position

  /**
   * The range's end position.
   */
  end: Position
}

export * from './lexer'
export * from './parser'
export * from './semantic'
export * from './codegen'
export * from './formatter'
