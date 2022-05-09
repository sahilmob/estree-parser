import { Parser } from "..";
import {
  Program,
  BooleanLiteral,
  StringLiteral,
  NullLiteral,
  ExpressionStatement,
  NumericLiteral,
} from "../nodes";

describe("StatementList", () => {
  it("parses two statements", () => {
    const parser = new Parser("'abc'; 'def';");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new StringLiteral({ value: "abc" }),
          }),
          new ExpressionStatement({
            expression: new StringLiteral({ value: "def" }),
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
            expression: new StringLiteral({ value: "abc" }),
          }),
          new ExpressionStatement({
            expression: new NumericLiteral({ value: 1 }),
          }),
          new ExpressionStatement({
            expression: new BooleanLiteral({ value: true }),
          }),
        ],
      })
    );
  });
});
