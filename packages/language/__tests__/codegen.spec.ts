import { codegen, parse } from '../src'
import { sample, program } from './sample'

describe('codegen', () => {
  describe('Program', () => {
    it('work', () => {
      expect(codegen(program)).toBe(sample)
    })

    it('work', () => {
      const source = ``
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })
  })

  describe('InferenceDefinition', () => {
    it('empty', () => {
      const source = `<从首页进入旅游频道> = {\n\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })

    it('with step', () => {
      const source = `<从首页进入旅游频道> = {\n  [打开携程首页]\n\n  [点击旅游频道]\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })
  })

  describe('ImportStatement', () => {
    it('single item', () => {
      const source = `import { <测试> } from "测试"`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })

    it('multiple item', () => {
      const source = `import { <测试>, <测试1> } from "测试"`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })
  })

  describe('ExportStatement', () => {
    it('inference', () => {
      const source = `export <从首页进入旅游频道>`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })

    it('definition', () => {
      const source = `export <从首页进入旅游频道> = {\n  [打开携程首页]\n\n  [点击旅游频道]\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })
  })

  describe('StartStatement', () => {
    it('inference', () => {
      const source = `start <从首页进入旅游频道>`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })

    it('definition', () => {
      const source = `start <从首页进入旅游频道> = {\n  [打开携程首页]\n\n  [点击旅游频道]\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })
  })

  describe('StepStatement', () => {
    it('single in module block', () => {
      const source = `<从首页进入旅游频道> = {\n  [打开携程首页]\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })

    it('multiple in module block', () => {
      const source = `<从首页进入旅游频道> = {\n  [打开携程首页]\n\n  [点击旅游频道]\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })
  })

  describe('IfStatement', () => {
    it('without else in module block', () => {
      const source = `<从首页进入旅游频道> = {\n  if [不是上海站] -> {\n\n  }\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })

    it('with else in module block', () => {
      const source = `<从首页进入旅游频道> = {\n  if [不是上海站] -> {\n\n  } else {\n\n  }\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })
  })

  describe('SwitchStatement', () => {
    it('empty block', () => {
      const source = `<从首页进入旅游频道> = {\n  switch [当前城市] {\n\n  }\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })

    it('single case clause block without default clause block', () => {
      const source = `<从首页进入旅游频道> = {\n  switch [当前城市] {\n    case [上海] -> {\n\n    }\n  }\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })

    it('multiple cases clause block without default clause block', () => {
      const source = `<从首页进入旅游频道> = {\n  switch [当前城市] {\n    case [上海] -> {\n\n    }\n    case [北京] -> {\n\n    }\n  }\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })

    it('multiple cases clause block with default clause block', () => {
      const source = `<从首页进入旅游频道> = {\n  switch [当前城市] {\n    case [上海] -> {\n\n    }\n    case [北京] -> {\n\n    }\n    default -> {\n\n    }\n  }\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })
  })

  describe('GotoStatement', () => {
    it('single in module block', () => {
      const source = `<从首页进入旅游频道> = {\n  goto <选择出行人>\n}`
      const { program } = parse(source)
      if (program) {
        expect(codegen(program)).toBe(source)
      } else {
        expect(false).toBeTruthy()
      }
    })
  })
})
