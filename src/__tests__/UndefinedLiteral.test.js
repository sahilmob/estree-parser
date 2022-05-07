import { Parser } from "..";
import { Literal, ExpressionStatement, Program } from "../nodes";

describe("UndefinedLiteral", () => {
  it("parses undefined", () => {
    const parser = new Parser("undefined;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new Literal({ value: undefined }),
          }),
        ],
      })
    );
  });
});
