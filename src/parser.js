import Lexer from "./lexer";
import {
  Program,
  Literal,
  Identifier,
  EmptyStatement,
  DebuggerStatement,
  VariableDeclarator,
  VariableDeclaration,
  ExpressionStatement,
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

  statementList() {
    const statementList = [this.statement()];

    while (this.lookahead !== null) {
      statementList.push(this.statement());
    }

    return statementList;
  }

  statement() {
    const { type } = this.lookahead;
    switch (type) {
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
    // return this.assignmentExpression()
    return this.literal();
  }

  assignmentExpression() {
    // const left =
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
    }
  }

  numericLiteral() {
    const value = this.eat("NUMBER");
    return new Literal({ value: Number(value) });
  }

  stringLiteral() {
    const value = this.eat("STRING");
    return new Literal({ value: value.slice(1, -1) });
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
