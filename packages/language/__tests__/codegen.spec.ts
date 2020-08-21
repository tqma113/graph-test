import { codegen, Program } from '../src'
import { sample, program } from './sample'

describe('codegen', () => {
  describe('Program', () => {
    it('work', () => {
      expect(codegen(program)).toBe(sample)
    })

    it('work', () => {
      const program = {
        kind: 'Program',
        moduleStatemens: [],
        range: {
          start: {
            line: 1,
            column: 1,
          },
          end: {
            line: 1,
            column: 1,
          },
        },
        comments: [],
      } as Program
      const source = ''
      expect(codegen(program)).toBe(source)
    })
  })

  describe('InferenceDefinition', () => {
    it('empty', () => {
      const program = {
        kind: 'Program',
        moduleStatemens: [
          {
            kind: 'InferenceDefinition',
            identifier: {
              kind: 'identifier',
              word: '<从首页进入旅游频道>',
              range: {
                start: {
                  line: 1,
                  column: 0,
                },
                end: {
                  line: 1,
                  column: 11,
                },
              },
            },
            block: {
              kind: 'Block',
              list: [],
              range: {
                start: {
                  line: 1,
                  column: 14,
                },
                end: {
                  line: 3,
                  column: 8,
                },
              },
            },
            range: {
              start: {
                line: 1,
                column: 0,
              },
              end: {
                line: 3,
                column: 8,
              },
            },
            comments: [],
          },
        ],
        range: {
          start: {
            line: 1,
            column: 1,
          },
          end: {
            line: 3,
            column: 9,
          },
        },
        comments: [],
      } as Program
      const source = `<从首页进入旅游频道> = {\n\n}`
      expect(codegen(program)).toBe(source)
    })

    it.todo('with step')
  })

  describe('ImportStatement', () => {
    it.todo('single item')

    it.todo('multiple item')
  })

  describe('ExportStatement', () => {
    it.todo('inference')

    it.todo('definition')
  })
  
  describe('StartStatement', () => {
    it.todo('inference')

    it.todo('definition')
  })
  
  describe('StepStatement', () => {
    it.todo('single in module block')

    it.todo('multiple in module block')
  })
  
  describe('IfStatement', () => {
    it.todo('without else in module block')

    it.todo('with else in module block')
  })
  
  describe('SwitchStatement', () => {
    it.todo('empty block')

    it.todo('single case clause block without default clause block')

    it.todo('multiple cases clause block without default clause block')

    it.todo('multiple cases clause block with default clause block')
  })
  
  describe('GotoStatement', () => {
    it.todo('single in module block')
  })
})
