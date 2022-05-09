export class UnaryExpression {
  prefix;
  argument;
  operator;
  type = "UnaryExpression";

  constructor(args) {
    this.prefix = args.prefix;
    this.argument = args.argument;
    this.operator = args.operator;
  }
}
