# Graph Test

Graph test tool chain.

## Packages

+ [language](./packages/language/README.md)
+ [editor](./packages/editor/README.md)
+ [tree](./packages/tree/README.md)

## Development

1. `git clone https://github.com/tqma113/graph-test-language.git`
2. `cd graph-test-language`
3. `yarn`
3. `yarn build`
4. `cd example`
5. `yarn`
6. `yarn start`

look at localhost:3000

## Example

https://github.com/tqma113/gtl-example

## Conversion graph

```
                              +---------------------+
                              |                     |
              +-------------->|    Source(string)   |
              |               |                     |
              |               +-----+--------+------+
              |                         |
              |                         |
              |                    createLexer
              |                         |
              |                         |
              |                         v
              |               +---------------------+
              |               |                     |
           codegen            |       Token[]       |
              |               |                     |
              |               +-----+--------+------+
              |                         |
              |                         |
              |                       parse    +--------------------+
              |                         |      |                    |
              |                         |      |                    |
              |                         v      v                  format
              |               +---------------------+               |
              |               |                     |               |
              +---------------|       Program       |---------------+
                              |                     |
                              +-----+--------+------+
                                  |             ^
                                  |             |
                                  |             |
                              convert        reverse
                                  |             |
                                  |             |
                                  v             |
                              +---------------------+
                              |                     |
                              |         Tree        |
                              |                     |
                              +-----+--------+------+
                                  |             ^
                                  |             |
                                  |             |
                               unfold         fold
                                  |             |
                                  |             |
                                  v             |
                              +---------------------+
                              |                     |
                              |   TreeNodeRecord    |
                              |                     |
                              +-----+--------+------+
```
