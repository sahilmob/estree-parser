import { Parser } from "..";
import { ExpressionStatement, Literal, Program } from "../nodes";

describe("NumericLiteral", () => {
  it("parses numeric literals", () => {
    const parser = new Parser("123;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new Literal({ value: 123 }),
          }),
        ],
      })
    );
  });
});
