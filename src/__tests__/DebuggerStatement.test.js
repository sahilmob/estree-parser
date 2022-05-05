import { Parser } from "..";
import { Program, DebuggerStatement } from "../nodes";

describe("DebuggerStatement", () => {
  it("parses debugger statement", () => {
    const parser = new Parser("debugger");
    const result = parser.parse();

    expect(result).toEqual(new Program([new DebuggerStatement()]));
  });
});
