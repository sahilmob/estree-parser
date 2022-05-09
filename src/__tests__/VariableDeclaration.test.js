import { Parser } from "..";
import {
  Program,
  Identifier,
  NullLiteral,
  StringLiteral,
  BooleanLiteral,
  NumericLiteral,
  VariableDeclarator,
  VariableDeclaration,
} from "../nodes";

describe("VariableDeclaration", () => {
  it("parses var variable declaration", () => {
    const parser = new Parser("var x = 'hello';");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new VariableDeclaration({
            kind: "var",
            declarations: [
              new VariableDeclarator({
                id: new Identifier({ name: "x" }),
                init: new StringLiteral({ value: "hello" }),
              }),
            ],
          }),
        ],
      })
    );
  });

  it("parses let variable declaration", () => {
    const parser = new Parser("let x = 1;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new VariableDeclaration({
            kind: "let",
            declarations: [
              new VariableDeclarator({
                id: new Identifier({ name: "x" }),
                init: new NumericLiteral({ value: 1 }),
              }),
            ],
          }),
        ],
      })
    );
  });
  it("parses const variable declaration", () => {
    const parser = new Parser("const x = 30;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new VariableDeclaration({
            kind: "const",
            declarations: [
              new VariableDeclarator({
                id: new Identifier({ name: "x" }),
                init: new NumericLiteral({ value: 30 }),
              }),
            ],
          }),
        ],
      })
    );
  });

  it("parses multiple declarator", () => {
    const parser = new Parser("const x, y, z = 30;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new VariableDeclaration({
            kind: "const",
            declarations: [
              new VariableDeclarator({
                id: new Identifier({ name: "x" }),
                init: new NumericLiteral({ value: 30 }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "y" }),
                init: new NumericLiteral({ value: 30 }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "z" }),
                init: new NumericLiteral({ value: 30 }),
              }),
            ],
          }),
        ],
      })
    );
  });

  it("parses multiple declarator when init === null", () => {
    const parser = new Parser("const x, y, z = null;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new VariableDeclaration({
            kind: "const",
            declarations: [
              new VariableDeclarator({
                id: new Identifier({ name: "x" }),
                init: new NullLiteral(),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "y" }),
                init: new NullLiteral(),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "z" }),
                init: new NullLiteral(),
              }),
            ],
          }),
        ],
      })
    );
  });

  it("parses multiple declarator when init === undefined", () => {
    const parser = new Parser("const x, y, z = undefined;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new VariableDeclaration({
            kind: "const",
            declarations: [
              new VariableDeclarator({
                id: new Identifier({ name: "x" }),
                init: new Identifier({ name: "undefined" }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "y" }),
                init: new Identifier({ name: "undefined" }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "z" }),
                init: new Identifier({ name: "undefined" }),
              }),
            ],
          }),
        ],
      })
    );
  });

  it("parses multiple declarator when init === true", () => {
    const parser = new Parser("const x, y, z = true;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new VariableDeclaration({
            kind: "const",
            declarations: [
              new VariableDeclarator({
                id: new Identifier({ name: "x" }),
                init: new BooleanLiteral({ value: true }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "y" }),
                init: new BooleanLiteral({ value: true }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "z" }),
                init: new BooleanLiteral({ value: true }),
              }),
            ],
          }),
        ],
      })
    );
  });

  it("parses multiple declarator when init === false", () => {
    const parser = new Parser("const x, y, z = false;");
    const result = parser.parse();

    expect(result).toEqual(
      new Program({
        body: [
          new VariableDeclaration({
            kind: "const",
            declarations: [
              new VariableDeclarator({
                id: new Identifier({ name: "x" }),
                init: new BooleanLiteral({ value: false }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "y" }),
                init: new BooleanLiteral({ value: false }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "z" }),
                init: new BooleanLiteral({ value: false }),
              }),
            ],
          }),
        ],
      })
    );
  });
});
