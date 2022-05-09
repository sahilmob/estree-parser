import { Lexer } from "./lexer";
import {
  Program,
  Identifier,
  NullLiteral,
  StringLiteral,
  BooleanLiteral,
  NumericLiteral,
  EmptyStatement,
  BlockStatement,
  BinaryExpression,
  DebuggerStatement,
  VariableDeclarator,
  VariableDeclaration,
  ExpressionStatement,
  AssignmentExpression,
} from "./nodes/index";

export class Parser {
  string = "";
  lexer = null;
  lookahead = null;

  constructor(string) {
    this.string = string;
    this.lexer = new Lexer();
    this.lexer.init(string);
    this.lookahead = this.lexer.getNextToken();
  }

  parse() {
    return this.program();
  }

  program() {
    return new Program({ body: this.statementList() });
  }

  statementList(stopToken = null) {
    const statementList = [this.statement()];

    while (this.lookahead !== null && this.lookahead.type !== stopToken) {
      statementList.push(this.statement());
    }

    return statementList;
  }

  statement() {
    const { type } = this.lookahead;
    switch (type) {
      case "{":
        return this.blockStatement();
      case ";":
        return this.emptyStatement();
      case "DEBUGGER":
        return this.debuggerStatement();
      case "var":
      case "let":
      case "const":
        return this.variableDeclaration();
      default:
        return this.expressionStatement();
    }
  }

  blockStatement() {
    this.eat("{");

    const body = this.lookahead.type !== "}" ? this.statementList("}") : [];

    this.eat("}");

    return new BlockStatement({ body });
  }

  variableDeclaration() {
    const ids = [];

    const { type } = this.lookahead;
    const kind =
      type === "var"
        ? this.eat("var")
        : type === "let"
        ? this.eat("let")
        : this.eat("const");

    do {
      ids.push(this.identifier());
    } while (this.lookahead.type === "," && this.eat(","));

    this.eat("SIMPLE_ASSIGN");

    const init = this.expression();

    this.eat(";");

    return new VariableDeclaration({
      kind,
      declarations: ids.map((id) => new VariableDeclarator({ id, init })),
    });
  }

  identifier() {
    const name = this.eat("IDENTIFIER");
    return new Identifier({ name });
  }

  expressionStatement() {
    const expression = this.expression();
    this.eat(";");

    return new ExpressionStatement({ expression });
  }

  expression() {
    return this.assignmentExpression();
  }

  assignmentExpression() {
    const left = this.additiveExpression();

    if (
      this.lookahead.type !== "SIMPLE_ASSIGN" &&
      this.lookahead.type !== "COMPLEX_ASSIGN"
    )
      return left;

    const operator = this.binaryOperator();

    const right = this.expression();

    return new AssignmentExpression({ left, right, operator });
  }

  additiveExpression() {
    let left = this.multiplicativeExpression();

    while (this.lookahead.type === "ADDITIVE_OPERATOR") {
      const operator = this.eat("ADDITIVE_OPERATOR");
      const right = this.multiplicativeExpression();

      left = new BinaryExpression({
        left,
        right,
        operator,
      });
    }

    return left;
  }

  multiplicativeExpression() {
    let left = this.primaryExpression();

    while (this.lookahead.type === "MULTIPLICATIVE_OPERATOR") {
      const operator = this.eat("MULTIPLICATIVE_OPERATOR");
      const right = this.primaryExpression();

      left = new BinaryExpression({
        left,
        right,
        operator,
      });
    }

    return left;
  }

  // this highest providence of all expressions
  primaryExpression() {
    switch (this.lookahead.type) {
      case "(":
        return this.parenthesizedExpression();
      case "IDENTIFIER":
        return this.identifier();
      default:
        return this.literal();
    }
  }

  parenthesizedExpression() {
    this.eat("(");

    const expression = this.expression();

    this.eat(")");

    return expression;
  }

  debuggerStatement() {
    this.eat("DEBUGGER");
    return new DebuggerStatement();
  }

  emptyStatement() {
    this.eat(";");
    return new EmptyStatement();
  }

  literal() {
    switch (this.lookahead.type) {
      case "NUMBER":
        return this.numericLiteral();
      case "STRING":
        return this.stringLiteral();
      case "true":
        return this.booleanLiteral("true");
      case "false":
        return this.booleanLiteral("false");
      case "null":
        return this.nullLiteral();
      case "undefined":
        return this.undefined();
    }
  }

  numericLiteral() {
    const value = this.eat("NUMBER");
    return new NumericLiteral({ value: Number(value) });
  }

  stringLiteral() {
    const value = this.eat("STRING");
    return new StringLiteral({ value: value.slice(1, -1) });
  }

  booleanLiteral(type) {
    const value = this.eat(type);
    return new BooleanLiteral({ value: value === "true" ? true : false });
  }

  nullLiteral() {
    const value = this.eat("null");
    return new NullLiteral();
  }

  undefined() {
    const value = this.eat("undefined");
    return new Identifier({ name: "undefined" });
  }

  binaryOperator() {
    switch (this.lookahead.type) {
      case "SIMPLE_ASSIGN":
        return this.eat("SIMPLE_ASSIGN");
      case "COMPLEX_ASSIGN":
        return this.eat("COMPLEX_ASSIGN");
    }
  }

  eat(tokenType) {
    if (this.lookahead === undefined) {
      // missing ; at the end of a statement?
      throw SyntaxError("Expected " + tokenType + " got undefined");
    }

    if (this.lookahead === null) {
      throw SyntaxError("Expected " + tokenType + " got null");
    }

    const { type, value } = this.lookahead;

    if (type !== tokenType) {
      throw SyntaxError(
        "Unexpected token type " + type + " expected " + tokenType
      );
    }

    this.lookahead = this.lexer.getNextToken();

    return value;
  }
}
