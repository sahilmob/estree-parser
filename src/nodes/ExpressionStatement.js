export class ExpressionStatement {
  expression;
  type = "ExpressionStatement";

  constructor(args) {
    this.expression = args.expression;
  }
}
