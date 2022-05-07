export class AssignmentExpression {
  left;
  right;
  operator;
  type = "AssignmentExpression";

  constructor(args) {
    this.left = args.left;
    this.right = args.right;
    this.operator = args.operator;
  }
}
