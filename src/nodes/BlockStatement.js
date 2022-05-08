export class BlockStatement {
  body;
  type = "BlockStatement";

  constructor(args) {
    this.body = args.body || [];
  }
}
