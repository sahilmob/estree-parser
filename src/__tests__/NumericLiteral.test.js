import { Parser } from "..";
import { Program, NumericLiteral, ExpressionStatement } from "../nodes";

describe("NumericLiteral", () => {
  it("parses numeric literals", () => {
    const parser = new Parser("123;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new NumericLiteral({ value: 123 }),
          }),
        ],
      })
    );
  });
});
