// ─── Math Utilities ───────────────────────────────────────────────────────────
export const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
export const lcm = (a, b) => (a * b) / gcd(a, b);
export const gcdMany = (arr) => arr.reduce((acc, v) => gcd(acc, v));
export const lcmMany = (arr) => arr.reduce((acc, v) => lcm(acc, v));

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const randInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

// Convert variable exponents map to LaTeX monomial string
// e.g. {x:2, y:3, z:1} → "x^{2}y^{3}z"
export const monomialLatex = (vars, exps, coeff = 1) => {
  let parts = [];
  if (coeff !== 1) parts.push(String(coeff));
  for (const v of vars) {
    const e = exps[v] ?? 0;
    if (e === 0) continue;
    if (e === 1) parts.push(v);
    else parts.push(`${v}^{${e}}`);
  }
  if (parts.length === 0) return '1';
  return parts.join('');
};

// Generate plausible wrong exponent maps by tweaking correct exps
export const makeWrongExps = (vars, correctExps, allExps, mode) => {
  const results = [];
  const minExps = {};
  const maxExps = {};
  for (const v of vars) {
    minExps[v] = Math.min(...allExps.map(e => e[v] ?? 0));
    maxExps[v] = Math.max(...allExps.map(e => e[v] ?? 0));
  }

  const w1 = { ...correctExps };
  const randomVar1 = vars[randInt(0, vars.length - 1)];
  w1[randomVar1] = mode === 'hcf' ? maxExps[randomVar1] : minExps[randomVar1];
  if (JSON.stringify(w1) !== JSON.stringify(correctExps)) results.push(w1);

  const w2 = {};
  for (const v of vars) w2[v] = mode === 'hcf' ? maxExps[v] : minExps[v];
  if (JSON.stringify(w2) !== JSON.stringify(correctExps)) results.push(w2);

  const w3 = {};
  vars.forEach((v, i) => {
    w3[v] = i % 2 === 0
      ? (mode === 'hcf' ? maxExps[v] : minExps[v])
      : (mode === 'hcf' ? minExps[v] : maxExps[v]);
  });
  if (JSON.stringify(w3) !== JSON.stringify(correctExps) && JSON.stringify(w3) !== JSON.stringify(w1)) results.push(w3);

  const w4 = {};
  for (const v of vars) {
    const mid = Math.floor((minExps[v] + maxExps[v]) / 2);
    w4[v] = mode === 'hcf' ? Math.max(minExps[v] + 1, mid) : Math.max(maxExps[v] - 1, minExps[v]);
  }
  results.push(w4);

  const seen = new Set([JSON.stringify(correctExps)]);
  const unique = [];
  for (const w of results) {
    const key = JSON.stringify(w);
    if (!seen.has(key)) { seen.add(key); unique.push(w); }
  }
  return unique.slice(0, 3);
};
