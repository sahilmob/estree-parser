import { Parser } from "..";
import {
  Program,
  Identifier,
  StringLiteral,
  NumericLiteral,
  BooleanLiteral,
  BlockStatement,
  VariableDeclarator,
  VariableDeclaration,
  ExpressionStatement,
  AssignmentExpression,
} from "../nodes";

describe("BlockStatement", () => {
  it("parses block statement 1", () => {
    const parser = new Parser("{x = 'hello';}");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new BlockStatement({
            body: [
              new ExpressionStatement({
                expression: new AssignmentExpression({
                  operator: "=",
                  left: new Identifier({ name: "x" }),
                  right: new StringLiteral({ value: "hello" }),
                }),
              }),
            ],
          }),
        ],
      })
    );
  });

  it("parses block statement 2", () => {
    const parser = new Parser("{x = 1; y = 'hello';}");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new BlockStatement({
            body: [
              new ExpressionStatement({
                expression: new AssignmentExpression({
                  operator: "=",
                  left: new Identifier({ name: "x" }),
                  right: new NumericLiteral({ value: 1 }),
                }),
              }),
              new ExpressionStatement({
                expression: new AssignmentExpression({
                  operator: "=",
                  left: new Identifier({ name: "y" }),
                  right: new StringLiteral({ value: "hello" }),
                }),
              }),
            ],
          }),
        ],
      })
    );
  });

  it("parses empty block statement", () => {
    const parser = new Parser("{}");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new BlockStatement({
            body: [],
          }),
        ],
      })
    );
  });

  it("parses nested block statement", () => {
    const parser = new Parser("{x = 1; y = 'hello'; {let x = true;}}");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new BlockStatement({
            body: [
              new ExpressionStatement({
                expression: new AssignmentExpression({
                  operator: "=",
                  left: new Identifier({ name: "x" }),
                  right: new NumericLiteral({ value: 1 }),
                }),
              }),
              new ExpressionStatement({
                expression: new AssignmentExpression({
                  operator: "=",
                  left: new Identifier({ name: "y" }),
                  right: new StringLiteral({ value: "hello" }),
                }),
              }),
              new BlockStatement({
                body: [
                  new VariableDeclaration({
                    kind: "let",
                    declarations: [
                      new VariableDeclarator({
                        id: new Identifier({ name: "x" }),
                        init: new BooleanLiteral({ value: true }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  });
});
