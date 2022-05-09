import { Parser } from "..";
import { Program, NullLiteral, ExpressionStatement } from "../nodes";

describe("NullLiteral", () => {
  it("parses null", () => {
    const parser = new Parser("null;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new NullLiteral(),
          }),
        ],
      })
    );
  });
});
