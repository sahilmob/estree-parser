export class BinaryExpression {
  left;
  right;
  operator;
  type = "BinaryExpression";

  constructor(args) {
    this.left = args.left;
    this.right = args.right;
    this.operator = args.operator;
  }
}
