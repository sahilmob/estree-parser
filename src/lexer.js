import SPEC from "./language-spec";

export class Lexer {
  string = "";
  cursor = 0;

  init(string) {
    this.cursor = 0;
    this.string = string;
  }

  hasMoreTokens() {
    return this.cursor < this.string.length;
  }

  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this.string.slice(this.cursor);
    for (const [type, regex] of SPEC) {
      const tokenValue = this.match(regex, string);

      if (tokenValue === null) {
        continue;
      }

      if (type === null) {
        return this.getNextToken();
      }

      return {
        type,
        value: tokenValue,
      };
    }
  }

  match(regexp, string) {
    const matched = regexp.exec(string);
    if (matched == null) {
      return null;
    }
    this.cursor += matched[0].length;
    return matched[0];
  }
}
