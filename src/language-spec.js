const SPEC = [
  [null, /^\s+/],
  [";", /^;/],
  [",", /^,/],
  ["DEBUGGER", /^\bdebugger\b/],
  ["NUMBER", /^\d+/],
  ["STRING", /^"[^"]*"/],
  ["STRING", /^'[^']*'/],
  ["var", /^\bvar\b/],
  ["let", /^\blet\b/],
  ["const", /^\bconst\b/],
  ["IDENTIFIER", /^\w+/],
  ["SIMPLE_ASSIGN", /^=/],
];

export default SPEC;
