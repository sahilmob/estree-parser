export class VariableDeclarator {
  id;
  init = null;
  type = "VariableDeclarator";

  constructor(args) {
    this.id = args.id;
    this.init = args.init || null;
  }
}
