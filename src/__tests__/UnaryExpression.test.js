import { Parser } from "..";
import {
  Program,
  Identifier,
  StringLiteral,
  BooleanLiteral,
  NumericLiteral,
  UnaryExpression,
  BinaryExpression,
  ExpressionStatement,
} from "../nodes";

describe("UnaryExpression", () => {
  it("parses ! unary operator", () => {
    const parser = new Parser("!5;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new UnaryExpression({
              prefix: true,
              operator: "!",
              argument: new NumericLiteral({ value: 5 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses + unary operator", () => {
    const parser = new Parser("+5;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new UnaryExpression({
              prefix: true,
              operator: "+",
              argument: new NumericLiteral({ value: 5 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses ! unary operator with binary expression", () => {
    const parser = new Parser("!5 + 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "+",
              left: new UnaryExpression({
                prefix: true,
                operator: "!",
                argument: new NumericLiteral({ value: 5 }),
              }),
              right: new NumericLiteral({ value: 2 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses ! unary operator with binary expression with parenthesized expression", () => {
    const parser = new Parser("!(5 + 3) + 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "+",
              left: new UnaryExpression({
                prefix: true,
                operator: "!",
                argument: new BinaryExpression({
                  operator: "+",
                  left: new NumericLiteral({ value: 5 }),
                  right: new NumericLiteral({ value: 3 }),
                }),
              }),
              right: new NumericLiteral({ value: 2 }),
            }),
          }),
        ],
      })
    );
  });
});
