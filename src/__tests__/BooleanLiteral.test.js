import { Parser } from "..";
import { Literal, ExpressionStatement, Program } from "../nodes";

describe("BooleanLiteral", () => {
  it("parses true", () => {
    const parser = new Parser("true;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new Literal({ value: true }),
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
            expression: new Literal({ value: false }),
          }),
        ],
      })
    );
  });
});
