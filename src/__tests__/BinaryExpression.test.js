import { Parser } from "..";
import {
  Program,
  Literal,
  Identifier,
  BinaryExpression,
  ExpressionStatement,
} from "../nodes";

describe("BinaryExpression", () => {
  it("parses + operator", () => {
    const parser = new Parser("5 + 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "+",
              left: new Literal({ value: 5 }),
              right: new Literal({ value: 2 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses - operator", () => {
    const parser = new Parser("5 - 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "-",
              left: new Literal({ value: 5 }),
              right: new Literal({ value: 2 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses multiple additive operators 1", () => {
    const parser = new Parser("5 + 2 - 3;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "-",
              left: new BinaryExpression({
                operator: "+",
                left: new Literal({ value: 5 }),
                right: new Literal({ value: 2 }),
              }),
              right: new Literal({ value: 3 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses multiple additive operators 2", () => {
    const parser = new Parser("5 - 2 + 3;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "+",
              left: new BinaryExpression({
                operator: "-",
                left: new Literal({ value: 5 }),
                right: new Literal({ value: 2 }),
              }),
              right: new Literal({ value: 3 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses * operator", () => {
    const parser = new Parser("5 * 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "*",
              left: new Literal({ value: 5 }),
              right: new Literal({ value: 2 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses / operator", () => {
    const parser = new Parser("5 / 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "/",
              left: new Literal({ value: 5 }),
              right: new Literal({ value: 2 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses mixed additive and multiplicative operators with correct persistence 1", () => {
    const parser = new Parser("3 + 5 / 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "+",
              left: new Literal({ value: 3 }),
              right: new BinaryExpression({
                operator: "/",
                left: new Literal({ value: 5 }),
                right: new Literal({ value: 2 }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses mixed additive and multiplicative operators with correct persistence 2", () => {
    const parser = new Parser("3 * 5 / 2;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "/",
              left: new BinaryExpression({
                operator: "*",
                left: new Literal({ value: 3 }),
                right: new Literal({ value: 5 }),
              }),
              right: new Literal({ value: 2 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses mixed additive and multiplicative operators with identifiers with correct persistence 1", () => {
    const parser = new Parser("3 * 5 / x;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "/",
              left: new BinaryExpression({
                operator: "*",
                left: new Literal({ value: 3 }),
                right: new Literal({ value: 5 }),
              }),
              right: new Identifier({ name: "x" }),
            }),
          }),
        ],
      })
    );
  });

  it("parses mixed additive and multiplicative operators with identifiers with correct persistence 2", () => {
    const parser = new Parser("x - 5 * x;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "-",
              left: new Identifier({ name: "x" }),
              right: new BinaryExpression({
                operator: "*",
                left: new Literal({ value: 5 }),
                right: new Identifier({ name: "x" }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses parenthesized expression correctly 1", () => {
    const parser = new Parser("(x - 5) * x;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "*",
              left: new BinaryExpression({
                operator: "-",
                left: new Identifier({ name: "x" }),
                right: new Literal({ value: 5 }),
              }),
              right: new Identifier({ name: "x" }),
            }),
          }),
        ],
      })
    );
  });

  it("parses parenthesized expression correctly 2", () => {
    const parser = new Parser("x - (5 * x);");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new BinaryExpression({
              operator: "-",
              left: new Identifier({ name: "x" }),
              right: new BinaryExpression({
                operator: "*",
                left: new Literal({ value: 5 }),
                right: new Identifier({ name: "x" }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses parenthesized expression correctly 3", () => {
    const parser = new Parser("(5);");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new Literal({ value: 5 }),
          }),
        ],
      })
    );
  });
});
