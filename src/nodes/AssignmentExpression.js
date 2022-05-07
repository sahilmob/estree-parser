export class AssignmentExpression {
  left;
  right;
  type = "AssignmentExpression";

  constructor(args) {
    this.left = args.left;
    this.right = args.right;
  }
}
