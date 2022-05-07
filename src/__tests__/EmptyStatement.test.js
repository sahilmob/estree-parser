import { Parser } from "..";
import { Program, EmptyStatement } from "../nodes";

describe("EmptyStatement", () => {
  it("parses empty statement", () => {
    const parser = new Parser(";");
    const result = parser.parse();

    expect(result).toEqual(new Program({ body: [new EmptyStatement()] }));
  });
});
