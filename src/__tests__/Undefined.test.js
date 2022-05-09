import { Parser } from "..";
import { Program, Identifier, ExpressionStatement } from "../nodes";

describe("UndefinedLiteral", () => {
  it("parses undefined", () => {
    const parser = new Parser("undefined;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new Identifier({ name: "undefined" }),
          }),
        ],
      })
    );
  });
});
