export class StringLiteral {
  value;
  type = "StringLiteral";

  constructor(args) {
    this.value = args.value;
  }
}
