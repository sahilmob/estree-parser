export class ExpressionStatement {
  type = "ExpressionStatement";
  expression = null;

  constructor(expression) {
    this.expression = expression;
  }
}
