type Err<T> = {
  kind: 'Err'
  value: T
}

type Ok<T> = {
  kind: 'Ok'
  value: T
}

export type Result<A, B> = Ok<A> | Err<B>

export const Err = <B>(value: B): Result<any, B> => {
  return {
    kind: 'Err',
    value
  }
}

export const Ok = <A>(value: A): Result<A, any> => {
  return {
    kind: 'Ok',
    value
  }
}

export type ParserStateHooks = {
  getSource: () => string
  getOffset: () => number
  setOffset: (offset: number) => void
  getError: () => string
  setError: (message: string) => void
}

let currentSource = ''
let currentOffset = 0
let currentMessage = ''

const hooks: ParserStateHooks = {
  getSource: () => {
    return currentSource
  },
  getOffset: () => {
    return currentOffset
  },
  setOffset: (newOffset: number) => {
    currentOffset = newOffset
  },
  getError: () => {
    return currentMessage
  },
  setError: (newMessage: string) => {
    currentMessage = newMessage
  }
}

export type Parser<T = any> = () => Result<T, string>

const { getSource, getOffset, setOffset, getError, setError } = hooks

export const runParser = <P extends Parser>(
  parser: P,
  source: string
): [
  ReturnType<P>,
  {
    source: string
    offset: number
    message: string
  }
] => {
  currentSource = source
  currentOffset = 0
  currentMessage = ''

  let result = parser() as ReturnType<P>

  let info = {
    source,
    offset: currentOffset,
    message: currentMessage
  }

  currentSource = ''
  currentMessage = ''
  currentOffset = 0

  return [result, info]
}

export const inject = <T>(value: T): Parser<T> => {
  return () => Ok(value)
}

export const map = <A, B>(parser: Parser<A>, f: (a: A) => B): Parser<B> => {
  return () => {
    let result = parser()

    if (result.kind === 'Err') {
      return result
    }

    return Ok(f(result.value))
  }
}

export const ap = <A, B>(parserFn: Parser<(a: A) => B>, parserArg: Parser<A>): Parser<B> => {
  return () => {
    let resultFn = parserFn()

    if (resultFn.kind === 'Err') {
      return resultFn
    }

    let resultArg = parserArg()

    if (resultArg.kind === 'Err') {
      return resultArg
    }

    return Ok(resultFn.value(resultArg.value))
  }
}

export function apply<A, B>(parserFn: Parser<(a: A) => B>, a: Parser<A>): Parser<B>

export function apply<A, B, C>(
  parserFn: Parser<(a: A) => (b: B) => C>,
  a: Parser<A>,
  b: Parser<B>
): Parser<C>

export function apply<A, B, C, D>(
  parserFn: Parser<(a: A) => (b: B) => (c: C) => D>,
  a: Parser<A>,
  b: Parser<B>,
  c: Parser<C>
): Parser<D>

export function apply<A, B, C, D, E>(
  parserFn: Parser<(a: A) => (b: B) => (c: C) => (d: D) => E>,
  a: Parser<A>,
  b: Parser<B>,
  c: Parser<C>,
  d: Parser<D>
): Parser<E>

export function apply<A, B, C, D, E, F>(
  parserFn: Parser<(a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F>,
  a: Parser<A>,
  b: Parser<B>,
  c: Parser<C>,
  d: Parser<D>,
  e: Parser<E>
): Parser<F>

export function apply<A, B, C, D, E, F>(
  parserFn: Parser<(a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F>,
  a: Parser<A>,
  b: Parser<B>,
  c: Parser<C>,
  d: Parser<D>,
  e: Parser<E>
): Parser<F>

export function apply<A, B, C, D, E, F, G>(
  parserFn: Parser<(a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => G>,
  a: Parser<A>,
  b: Parser<B>,
  c: Parser<C>,
  d: Parser<D>,
  e: Parser<E>,
  f: Parser<F>
): Parser<G>

export function apply(...args: Parser[]) {
  if (args.length < 2) {
    throw new Error(`Expected receiving at least two arguments`)
  }
  return args.reduce(ap)
}

export const item: Parser<string> = () => {
  let source = getSource()
  let offset = getOffset()

  if (offset >= source.length) {
    return Err('EOF')
  }

  setOffset(offset + 1)

  return Ok(source[offset])
}

export const satisfy = (predicate: (a: string) => boolean): Parser<string> => {
  return () => {
    let result = item()

    if (result.kind === 'Err') {
      return result
    }

    if (predicate(result.value)) {
      return result
    } else {
      return Err(`Unmatched char ${result.value}`)
    }
  }
}

export const digit = satisfy(c => c >= '0' && c <= '9')
export const lower = satisfy(c => c >= 'a' && c <= 'z')
export const uppper = satisfy(c => c >= 'A' && c <= 'Z')

export const char = (target: string) => {
  return satisfy(c => c === target)
}

export const notChar = (x: string) => {
  return satisfy(value => value !== x)
}

export const comma = char(',')

export const semicolon = char(':')

export const either = <A, B>(parserA: Parser<A>, parserB: Parser<B>): Parser<A | B> => {
  return () => {
    let offset = getOffset()
    let resultA = parserA()

    if (resultA.kind === 'Err') {
      setOffset(offset)
      return parserB()
    }

    return resultA
  }
}

export function oneOf<A>(parserA: Parser<A>): Parser<A>

export function oneOf<A, B>(parserA: Parser<A>, parserB: Parser<B>): Parser<A | B>

export function oneOf<A, B, C>(
  parserA: Parser<A>,
  parserB: Parser<B>,
  parserC: Parser<C>
): Parser<A | B | C>

export function oneOf<A, B, C, D>(
  parserA: Parser<A>,
  parserB: Parser<B>,
  parserC: Parser<C>,
  parserD: Parser<D>
): Parser<A | B | C | D>

export function oneOf<A, B, C, D, E>(
  parserA: Parser<A>,
  parserB: Parser<B>,
  parserC: Parser<C>,
  parserD: Parser<D>,
  parserE: Parser<E>
): Parser<A | B | C | D | E>

export function oneOf<A, B, C, D, E, F>(
  parserA: Parser<A>,
  parserB: Parser<B>,
  parserC: Parser<C>,
  parserD: Parser<D>,
  parserE: Parser<E>,
  parserF: Parser<F>
): Parser<A | B | C | D | E | F>

export function oneOf<A, B, C, D, E, F, G>(
  parserA: Parser<A>,
  parserB: Parser<B>,
  parserC: Parser<C>,
  parserD: Parser<D>,
  parserE: Parser<E>,
  parserF: Parser<F>,
  parserG: Parser<G>
): Parser<A | B | C | D | E | F | G>

export function oneOf(...parsers: Parser[]) {
  if (parsers.length < 2) {
    throw new Error(`Expected received at least two parsers, but got ${parsers.length}`)
  }
  return parsers.reduce(either)
}

export const whiteSpace = satisfy(x => {
  if (x === ' ') return true
  if (x === '\n') return true
  if (x === '\t') return true
  if (x === '\r') return true
  return false
})

export const many = <T>(parser: Parser<T>): Parser<T[]> => {
  return () => {
    let list: T[] = []

    while (true) {
      let offset = getOffset()
      let result = parser()

      if (result.kind === 'Err') {
        setError(result.value)
        setOffset(offset)
        return Ok(list)
      } else {
        list[list.length] = result.value
      }
    }
  }
}

export const many1 = <T>(parser: Parser<T>): Parser<T[]> => {
  let manyParser = many(parser)
  return () => {
    let result = manyParser()

    if (result.kind === 'Err') {
      return result
    }

    if (result.value.length === 0) {
      return Err(getError() || `at least match once`)
    }

    return result
  }
}

export const whiteSpaces = many1(whiteSpace)

// tslint:disable-next-line: variable-name
export const string = (str: string): Parser<string> => {
  return () => {
    for (let i = 0; i < str.length; i++) {
      let result = item()

      if (result.kind === 'Err') {
        return result
      }

      if (result.value !== str[i]) {
        return Err(`Unmatched string: ${str}`)
      }
    }

    return Ok(str)
  }
}

export const letter = either(lower, uppper)

export const digits = many1(digit)

export const positiveInteger: Parser<number> = () => {
  let result = digits()

  if (result.kind === 'Err') {
    return result
  }

  let value = Number(result.value.join(''))

  return Ok(value)
}

export const negativeInteger: Parser<number> = () => {
  let charResult = char('-')()

  if (charResult.kind === 'Err') {
    return charResult
  }

  let intResult = positiveInteger()

  if (intResult.kind === 'Err') {
    return intResult
  }

  return Ok(-intResult.value)
}

export const integer = either(positiveInteger, negativeInteger)

export const dot = char('.')

export const positiveFloat: Parser<number> = () => {
  let digitsResult0 = digits()

  if (digitsResult0.kind === 'Err') {
    return digitsResult0
  }

  let dotResult = dot()

  if (dotResult.kind === 'Err') {
    return dotResult
  }

  let digitsResult1 = digits()

  if (digitsResult1.kind === 'Err') {
    return digitsResult1
  }

  let value = Number(digitsResult0.value.join('') + dotResult.value + digitsResult1.value.join(''))

  return Ok(value)
}

export const negativeFloat: Parser<number> = () => {
  let charResult = char('-')()

  if (charResult.kind === 'Err') {
    return charResult
  }

  let floatResult = positiveFloat()

  if (floatResult.kind === 'Err') {
    return floatResult
  }

  return Ok(-floatResult.value)
}

export const float = either(positiveFloat, negativeFloat)

// tslint:disable-next-line: variable-name
export const number = either(float, integer)

export const separateBy = <A, S>(parser: Parser<A>, separator: Parser<S>): Parser<A[]> => {
  let pair: Parser<A> = () => {
    let separatorResult = separator()

    if (separatorResult.kind === 'Err') {
      return separatorResult
    }

    return parser()
  }

  let pairs = many(pair)

  return () => {
    let result = parser()

    if (result.kind === 'Err') {
      return result
    }

    let pairsResult = pairs()

    if (pairsResult.kind === 'Err') {
      return pairsResult
    }

    let value = [result.value, ...pairsResult.value]

    return Ok(value)
  }
}

export const bracket = <O, A, C>(
  open: Parser<O>,
  parser: Parser<A>,
  close: Parser<C>
): Parser<A> => () => {
  let openResult = open()

  if (openResult.kind === 'Err') {
    return openResult
  }

  let parserResult = parser()

  if (parserResult.kind === 'Err') {
    return parserResult
  }

  let closeResult = close()

  if (closeResult.kind === 'Err') {
    return closeResult
  }

  return parserResult
}

export const aroundBy = <A, S>(parser: Parser<A>, surround: Parser<S>): Parser<A> => {
  return bracket(many(surround), parser, many(surround))
}

export const aroundBySpace = <A>(parser: Parser<A>): Parser<A> => {
  return aroundBy(parser, whiteSpace)
}

export const stringLiteral = map(bracket(char('"'), many(notChar('"')), char('"')), list =>
  list.join('')
)
