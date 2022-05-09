import { Parser } from "..";
import {
  Program,
  Identifier,
  StringLiteral,
  BooleanLiteral,
  NumericLiteral,
  BinaryExpression,
  LogicalExpression,
  ExpressionStatement,
} from "../nodes";

describe("LogicalExpression", () => {
  it("parses && operator", () => {
    const parser = new Parser("5 && 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new LogicalExpression({
              operator: "&&",
              left: new NumericLiteral({ value: 5 }),
              right: new NumericLiteral({ value: 2 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses && operator with booleans", () => {
    const parser = new Parser("true && false;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new LogicalExpression({
              operator: "&&",
              left: new BooleanLiteral({ value: true }),
              right: new BooleanLiteral({ value: false }),
            }),
          }),
        ],
      })
    );
  });

  it("parses && operator with strings", () => {
    const parser = new Parser("'a' && 'b';");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new LogicalExpression({
              operator: "&&",
              left: new StringLiteral({ value: "a" }),
              right: new StringLiteral({ value: "b" }),
            }),
          }),
        ],
      })
    );
  });

  it("parses || operator", () => {
    const parser = new Parser("5 || 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new LogicalExpression({
              operator: "||",
              left: new NumericLiteral({ value: 5 }),
              right: new NumericLiteral({ value: 2 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses multiple logical operators 1", () => {
    const parser = new Parser("5 && 2 || 3;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new LogicalExpression({
              operator: "||",
              left: new LogicalExpression({
                operator: "&&",
                left: new NumericLiteral({ value: 5 }),
                right: new NumericLiteral({ value: 2 }),
              }),
              right: new NumericLiteral({ value: 3 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses multiple logical operators 2", () => {
    const parser = new Parser("5 || 2 && 3;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new LogicalExpression({
              operator: "||",
              left: new NumericLiteral({ value: 5 }),
              right: new LogicalExpression({
                operator: "&&",
                left: new NumericLiteral({ value: 2 }),
                right: new NumericLiteral({ value: 3 }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses logical operators with parenthesized expression", () => {
    const parser = new Parser("5 && (2 || 3);");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new LogicalExpression({
              operator: "&&",
              left: new NumericLiteral({ value: 5 }),
              right: new LogicalExpression({
                operator: "||",
                left: new NumericLiteral({ value: 2 }),
                right: new NumericLiteral({ value: 3 }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses logical expression with binary expression", () => {
    const parser = new Parser("3 + 5 || 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new LogicalExpression({
              operator: "||",
              left: new BinaryExpression({
                operator: "+",
                left: new NumericLiteral({ value: 3 }),
                right: new NumericLiteral({ value: 5 }),
              }),
              right: new NumericLiteral({ value: 2 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses logical expression with binary expression and parenthesized expression", () => {
    const parser = new Parser("3 * (5 || 2);");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "*",
              left: new NumericLiteral({ value: 3 }),
              right: new LogicalExpression({
                operator: "||",
                left: new NumericLiteral({ value: 5 }),
                right: new NumericLiteral({ value: 2 }),
              }),
            }),
          }),
        ],
      })
    );
  });
});
