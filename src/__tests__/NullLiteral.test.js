import { Parser } from "..";
import { Literal, ExpressionStatement, Program } from "../nodes";

describe("NullLiteral", () => {
  it("parses null", () => {
    const parser = new Parser("null;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new Literal({ value: null }),
          }),
        ],
      })
    );
  });
});
