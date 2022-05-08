import { Parser } from "..";
import { Literal, ExpressionStatement, Program } from "../nodes";

describe("StatementList", () => {
  it("parses two statements", () => {
    const parser = new Parser("'abc'; 'def';");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new Literal({ value: "abc" }),
          }),
          new ExpressionStatement({
            expression: new Literal({ value: "def" }),
          }),
        ],
      })
    );
  });

  it("parses three statements", () => {
    const parser = new Parser('"abc"; 1; true;');
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new Literal({ value: "abc" }),
          }),
          new ExpressionStatement({
            expression: new Literal({ value: 1 }),
          }),
          new ExpressionStatement({
            expression: new Literal({ value: true }),
          }),
        ],
      })
    );
  });
});
