export class NumericLiteral {
  value;
  type = "NumericLiteral";

  constructor(args) {
    this.value = args.value;
  }
}
