import { Parser } from "..";
import { Literal, ExpressionStatement } from "../nodes";

describe("StringLiteral", () => {
  it("parses string literals with single quotes", () => {
    const parser = new Parser("'abc';");
    const result = parser.parse();

    expect(result).toEqual({
      body: [new ExpressionStatement(new Literal("abc"))],
      type: "Program",
    });
  });

  it("parses string literals with double quotes", () => {
    const parser = new Parser('"abc";');
    const result = parser.parse();

    expect(result).toEqual({
      body: [new ExpressionStatement(new Literal("abc"))],
      type: "Program",
    });
  });
});
