export class LogicalExpression {
  left;
  right;
  operator;
  type = "LogicalExpression";

  constructor(args) {
    this.left = args.left;
    this.right = args.right;
    this.operator = args.operator;
  }
}
