import { Parser } from "..";
import { Program, StringLiteral, ExpressionStatement } from "../nodes";

describe("StringLiteral", () => {
  it("parses string literals with single quotes", () => {
    const parser = new Parser("'abc';");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new StringLiteral({ value: "abc" }),
          }),
        ],
      })
    );
  });

  it("parses string literals with double quotes", () => {
    const parser = new Parser('"abc";');
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new StringLiteral({ value: "abc" }),
          }),
        ],
      })
    );
  });
});
