import { Parser } from "..";
import { ExpressionStatement, Literal } from "../nodes";

describe("NumericLiteral", () => {
  it("parses numeric literals", () => {
    const parser = new Parser("123;");
    const result = parser.parse();

    expect(result).toEqual({
      body: [new ExpressionStatement(new Literal("123"))],
      type: "Program",
    });
  });
});
