export class VariableDeclaration {
  kind;
  declarations;
  type = "VariableDeclaration";

  constructor(args) {
    this.kind = args.kind;
    this.declarations = args.declarations;
  }
}
