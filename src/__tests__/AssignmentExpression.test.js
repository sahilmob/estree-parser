import { Parser } from "..";
import {
  Literal,
  Program,
  Identifier,
  ExpressionStatement,
  AssignmentExpression,
} from "../nodes";

describe("AssignmentExpression", () => {
  it("parses assignment expression where right is string", () => {
    const parser = new Parser("x = 'hello';");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new AssignmentExpression({
              left: new Identifier({ name: "x" }),
              right: new Literal({ value: "hello" }),
            }),
          }),
        ],
      })
    );
  });

  it("parses assignment expression where right is number", () => {
    const parser = new Parser("x = 1;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new AssignmentExpression({
              left: new Identifier({ name: "x" }),
              right: new Literal({ value: 1 }),
            }),
          }),
        ],
      })
    );
  });

  it("parses assignment expression where right is identifier", () => {
    const parser = new Parser("x = y;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new AssignmentExpression({
              left: new Identifier({ name: "x" }),
              right: new Identifier({ name: "y" }),
            }),
          }),
        ],
      })
    );
  });

  it("parses assignment expression where right is an assignment expression itself", () => {
    const parser = new Parser("x = y = z;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new AssignmentExpression({
              left: new Identifier({ name: "x" }),
              right: new AssignmentExpression({
                left: new Identifier({ name: "y" }),
                right: new Identifier({ name: "z" }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses assignment expression where right is an assignment expression itself with number", () => {
    const parser = new Parser("x = y = 1;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new AssignmentExpression({
              left: new Identifier({ name: "x" }),
              right: new AssignmentExpression({
                left: new Identifier({ name: "y" }),
                right: new Literal({ value: 1 }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses assignment expression where right is an assignment expression itself with string", () => {
    const parser = new Parser("x = y = 'hello';");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new AssignmentExpression({
              left: new Identifier({ name: "x" }),
              right: new AssignmentExpression({
                left: new Identifier({ name: "y" }),
                right: new Literal({ value: "hello" }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses assignment expression where right is an assignment expression itself with null", () => {
    const parser = new Parser("x = y = null;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new AssignmentExpression({
              left: new Identifier({ name: "x" }),
              right: new AssignmentExpression({
                left: new Identifier({ name: "y" }),
                right: new Literal({ value: null }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses assignment expression where right is an assignment expression itself with undefined", () => {
    const parser = new Parser("x = y = undefined;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new AssignmentExpression({
              left: new Identifier({ name: "x" }),
              right: new AssignmentExpression({
                left: new Identifier({ name: "y" }),
                right: new Literal({ value: undefined }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses assignment expression where right is an assignment expression itself with true", () => {
    const parser = new Parser("x = y = true;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new AssignmentExpression({
              left: new Identifier({ name: "x" }),
              right: new AssignmentExpression({
                left: new Identifier({ name: "y" }),
                right: new Literal({ value: true }),
              }),
            }),
          }),
        ],
      })
    );
  });

  it("parses assignment expression where right is an assignment expression itself with false", () => {
    const parser = new Parser("x = y = false;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new ExpressionStatement({
            expression: new AssignmentExpression({
              left: new Identifier({ name: "x" }),
              right: new AssignmentExpression({
                left: new Identifier({ name: "y" }),
                right: new Literal({ value: false }),
              }),
            }),
          }),
        ],
      })
    );
  });
});
