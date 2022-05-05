import Lexer from "./lexer";
import {
  Program,
  Literal,
  EmptyStatement,
  DebuggerStatement,
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
    return new Program(this.statementList());
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
      default:
        return this.expressionStatement();
    }
  }

  expressionStatement() {
    const expression = this.expression();
    this.eat(";");

    return new ExpressionStatement(expression);
  }

  expression() {
    return this.literal();
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
    return new Literal(value);
  }

  stringLiteral() {
    const value = this.eat("STRING");
    return new Literal(value.slice(1, -1));
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
