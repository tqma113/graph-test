import { createLexer } from "../src";
import { sample } from "./sample";

describe("lexer", () => {
  describe("total", () => {
    it("work", () => {
      const input = sample;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.lexicalErrors.length).toBe(0);
    });

    it("empty", () => {
      const input = ``;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.lexicalErrors.length).toBe(0);
      expect(lexer.tokens.length).toBe(1);
      expect(lexer.tokens[0].kind).toBe("eop");
    });

    it("Identifier", () => {
      const input = `<从首页进入旅游频道>`;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.lexicalErrors.length).toBe(0);
      expect(lexer.tokens[0]).toStrictEqual({
        kind: "identifier",
        word: "<从首页进入旅游频道>",
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
      });
    });

    it("Action", () => {
      const input = `[从首页进入旅游频道]`;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.lexicalErrors.length).toBe(0);
      expect(lexer.tokens[0]).toStrictEqual({
        kind: "action",
        word: "[从首页进入旅游频道]",
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
      });
    });

    it("Path", () => {
      const input = `"从首页进入旅游频道"`;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.lexicalErrors.length).toBe(0);
      expect(lexer.tokens[0]).toStrictEqual({
        kind: "path",
        word: '"从首页进入旅游频道"',
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
      });
    });

    it("Keyword", () => {
      const keywords = [
        "start",
        "goto",
        "if",
        "else",
        "switch",
        "case",
        "default",
        "import",
        "from",
        "export",
        null,
      ];
      const input = `start goto if else switch case default import from export`;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.tokens.length).toBe(11);
      expect(lexer.lexicalErrors.length).toBe(0);
      for (let i = 0; i < lexer.tokens.length; i++) {
        if (i < 10) {
          expect(lexer.tokens[i].kind).toBe("keyword");
        } else {
          expect(lexer.tokens[i].kind).toBe("eop");
        }
        expect(lexer.tokens[i].word).toBe(keywords[i]);
      }
    });

    it("Operator", () => {
      const operators = ["{", "}", "=", "->", ",", null];
      const input = `{ } = -> ,`;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.tokens.length).toBe(6);
      expect(lexer.lexicalErrors.length).toBe(0);
      for (let i = 0; i < lexer.tokens.length; i++) {
        if (i < 5) {
          expect(lexer.tokens[i].kind).toBe("operator");
        } else {
          expect(lexer.tokens[i].kind).toBe("eop");
        }
        expect(lexer.tokens[i].word).toBe(operators[i]);
      }
    });

    it("unknown token error", () => {
      const input = `star`;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.lexicalErrors.length).toBe(1);
      expect(lexer.lexicalErrors[0].message).toBe("Unknown token: star");
    });

    it("Identifier has not been closed error", () => {
      const input = `<test`;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.lexicalErrors.length).toBe(1);
      expect(lexer.lexicalErrors[0].message).toBe(
        "Identifier: <test has not been closed"
      );
    });

    it("Action has not been closed error", () => {
      const input = `[test`;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.lexicalErrors.length).toBe(1);
      expect(lexer.lexicalErrors[0].message).toBe(
        "Action: [test has not been closed"
      );
    });

    it("Path has not been closed error", () => {
      const input = `"test`;
      const lexer = createLexer(input);
      lexer.run();

      expect(lexer.lexicalErrors.length).toBe(1);
      expect(lexer.lexicalErrors[0].message).toBe(
        'Path: "test has not been closed'
      );
    });
  });

  describe('generator', () => {
    it("work", () => {
      const input = sample;
      const lexer = createLexer(input);
      while(lexer.next().kind !== 'eop');

      expect(lexer.lexicalErrors.length).toBe(0);
    });

    it("empty", () => {
      const input = ``;
      const lexer = createLexer(input);

      expect(lexer.next().kind).toBe("eop");
      expect(lexer.lexicalErrors.length).toBe(0);
    });

    it("Identifier", () => {
      const input = `<从首页进入旅游频道>`;
      const lexer = createLexer(input);

      expect(lexer.next()).toStrictEqual({
        kind: "identifier",
        word: "<从首页进入旅游频道>",
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
      });
      expect(lexer.next().kind).toBe("eop");
      expect(lexer.lexicalErrors.length).toBe(0);
    });

    it("Action", () => {
      const input = `[从首页进入旅游频道]`;
      const lexer = createLexer(input);

      expect(lexer.next()).toStrictEqual({
        kind: "action",
        word: "[从首页进入旅游频道]",
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
      });
      expect(lexer.next().kind).toBe("eop");
      expect(lexer.lexicalErrors.length).toBe(0);
    });

    it("Path", () => {
      const input = `"从首页进入旅游频道"`;
      const lexer = createLexer(input);

      expect(lexer.next()).toStrictEqual({
        kind: "path",
        word: '"从首页进入旅游频道"',
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
      });
      expect(lexer.next().kind).toBe("eop");
      expect(lexer.lexicalErrors.length).toBe(0);
    });

    it("Keyword", () => {
      const keywords = [
        "start",
        "goto",
        "if",
        "else",
        "switch",
        "case",
        "default",
        "import",
        "from",
        "export",
        null,
      ];
      const input = `start goto if else switch case default import from export`;
      const lexer = createLexer(input);

      for (let i = 0; i < 11; i++) {
        const token = lexer.next()
        if (i < 10) {
          expect(token.kind).toBe("keyword");
        } else {
          expect(token.kind).toBe("eop");
        }
        expect(token.word).toBe(keywords[i]);
      }
      expect(lexer.tokens.length).toBe(11);
      expect(lexer.lexicalErrors.length).toBe(0);
    });

    it("Operator", () => {
      const operators = ["{", "}", "=", "->", ",", null];
      const input = `{ } = -> ,`;
      const lexer = createLexer(input);

      for (let i = 0; i < 6; i++) {
        const token = lexer.next()
        if (i < 5) {
          expect(token.kind).toBe("operator");
        } else {
          expect(token.kind).toBe("eop");
        }
        expect(token.word).toBe(operators[i]);
      }
      expect(lexer.tokens.length).toBe(6);
      expect(lexer.lexicalErrors.length).toBe(0);
    });

    it("unknown token error", () => {
      const input = `star`;
      const lexer = createLexer(input);
      lexer.next();

      expect(lexer.lexicalErrors.length).toBe(1);
      expect(lexer.lexicalErrors[0].message).toBe("Unknown token: star");
    });

    it("Identifier has not been closed error", () => {
      const input = `<test`;
      const lexer = createLexer(input);
      lexer.next();

      expect(lexer.lexicalErrors.length).toBe(1);
      expect(lexer.lexicalErrors[0].message).toBe(
        "Identifier: <test has not been closed"
      );
    });

    it("Action has not been closed error", () => {
      const input = `[test`;
      const lexer = createLexer(input);
      lexer.next();

      expect(lexer.lexicalErrors.length).toBe(1);
      expect(lexer.lexicalErrors[0].message).toBe(
        "Action: [test has not been closed"
      );
    });

    it("Path has not been closed error", () => {
      const input = `"test`;
      const lexer = createLexer(input);
      lexer.next();

      expect(lexer.lexicalErrors.length).toBe(1);
      expect(lexer.lexicalErrors[0].message).toBe(
        'Path: "test has not been closed'
      );
    });
  })
});
