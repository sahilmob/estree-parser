export class Literal {
  value;
  type = "Literal";

  constructor(args) {
    this.value = args.value;
  }
}
