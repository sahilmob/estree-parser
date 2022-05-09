import { Parser } from "..";
import { Program, BooleanLiteral, ExpressionStatement } from "../nodes";

describe("BooleanLiteral", () => {
  it("parses true", () => {
    const parser = new Parser("true;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BooleanLiteral({ value: true }),
          }),
        ],
      })
    );
  });

  it("parses false", () => {
    const parser = new Parser("false;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BooleanLiteral({ value: false }),
          }),
        ],
      })
    );
  });
});
