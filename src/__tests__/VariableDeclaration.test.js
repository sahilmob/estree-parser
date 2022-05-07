import { Parser } from "..";
import {
  Literal,
  Program,
  Identifier,
  VariableDeclaration,
  VariableDeclarator,
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
                init: new Literal({ value: "hello" }),
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
                init: new Literal({ value: 1 }),
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
                init: new Literal({ value: 30 }),
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
                init: new Literal({ value: 30 }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "y" }),
                init: new Literal({ value: 30 }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "z" }),
                init: new Literal({ value: 30 }),
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
                init: new Literal({ value: null }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "y" }),
                init: new Literal({ value: null }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "z" }),
                init: new Literal({ value: null }),
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
                init: new Literal({ value: undefined }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "y" }),
                init: new Literal({ value: undefined }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "z" }),
                init: new Literal({ value: undefined }),
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
                init: new Literal({ value: true }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "y" }),
                init: new Literal({ value: true }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "z" }),
                init: new Literal({ value: true }),
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
                init: new Literal({ value: false }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "y" }),
                init: new Literal({ value: false }),
              }),
              new VariableDeclarator({
                id: new Identifier({ name: "z" }),
                init: new Literal({ value: false }),
              }),
            ],
          }),
        ],
      })
    );
  });
});
