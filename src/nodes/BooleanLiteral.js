export class BooleanLiteral {
  value;
  type = "BooleanLiteral";

  constructor(args) {
    this.value = args.value;
  }
}
