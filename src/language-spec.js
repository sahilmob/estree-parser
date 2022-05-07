const SPEC = [
  [null, /^\s+/],
  [";", /^;/],
  [",", /^,/],
  ["DEBUGGER", /^\bdebugger\b/],
  ["true", /^\btrue\b/],
  ["false", /^\bfalse\b/],
  ["null", /^\bnull\b/],
  ["undefined", /^\bundefined\b/],
  ["NUMBER", /^\d+/],
  ["STRING", /^"[^"]*"/],
  ["STRING", /^'[^']*'/],
  ["var", /^\bvar\b/],
  ["let", /^\blet\b/],
  ["const", /^\bconst\b/],
  ["IDENTIFIER", /^\w+/],
  ["SIMPLE_ASSIGN", /^=/],
  ["COMPLEX_ASSIGN", /^[\*\/\+\-\|\^\&\%]=/],
  ["COMPLEX_ASSIGN", /^>{2,3}=/],
  ["COMPLEX_ASSIGN", /^<{2}=/],
];

export default SPEC;
