import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, RefreshCw, BookOpen, ArrowLeft, CheckCircle, XCircle, ChevronRight, Star, FileText } from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';

// ─── KaTeX Helpers ───────────────────────────────────────────────────────────
const useKatex = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { loadKatexOnce().then(() => setLoaded(true)).catch(console.error); }, []);
  return loaded;
};

const InlineMath = ({ math }) => {
  const ref = useRef(null);
  const katexLoaded = useKatex();
  useEffect(() => {
    if (katexLoaded && ref.current && window.katex) {
      try { window.katex.render(math, ref.current, { displayMode: false, throwOnError: false }); }
      catch (e) { if (ref.current) ref.current.textContent = math; }
    }
  }, [math, katexLoaded]);
  return <span ref={ref} />;
};

const BlockMath = ({ math }) => {
  const ref = useRef(null);
  const katexLoaded = useKatex();
  useEffect(() => {
    if (katexLoaded && ref.current && window.katex) {
      try { window.katex.render(math, ref.current, { displayMode: true, throwOnError: false }); }
      catch (e) { if (ref.current) ref.current.textContent = math; }
    }
  }, [math, katexLoaded]);
  return <div ref={ref} className="my-2 overflow-x-auto" />;
};

// ─── Math Utilities ───────────────────────────────────────────────────────────
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
const lcm = (a, b) => (a * b) / gcd(a, b);
const gcdMany = (arr) => arr.reduce((acc, v) => gcd(acc, v));
const lcmMany = (arr) => arr.reduce((acc, v) => lcm(acc, v));

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const randInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

// Convert variable exponents map to LaTeX monomial string
// e.g. {x:2, y:3, z:1} → "x^{2}y^{3}z"
const monomialLatex = (vars, exps, coeff = 1) => {
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
const makeWrongExps = (vars, correctExps, allExps, mode) => {
  // mode: 'hcf' → correct is min. wrongs use max/mid combos
  //       'lcm' → correct is max. wrongs use min/mid combos
  const results = [];
  const minExps = {};
  const maxExps = {};
  for (const v of vars) {
    minExps[v] = Math.min(...allExps.map(e => e[v] ?? 0));
    maxExps[v] = Math.max(...allExps.map(e => e[v] ?? 0));
  }

  // Wrong1: swap one variable to use max (for hcf) or min (for lcm)
  const w1 = { ...correctExps };
  const randomVar1 = vars[randInt(0, vars.length - 1)];
  w1[randomVar1] = mode === 'hcf' ? maxExps[randomVar1] : minExps[randomVar1];
  if (JSON.stringify(w1) !== JSON.stringify(correctExps)) results.push(w1);

  // Wrong2: all max (for hcf) or all min (for lcm)
  const w2 = {};
  for (const v of vars) w2[v] = mode === 'hcf' ? maxExps[v] : minExps[v];
  if (JSON.stringify(w2) !== JSON.stringify(correctExps)) results.push(w2);

  // Wrong3: mix – use max for first half, min for second
  const w3 = {};
  vars.forEach((v, i) => {
    w3[v] = i % 2 === 0
      ? (mode === 'hcf' ? maxExps[v] : minExps[v])
      : (mode === 'hcf' ? minExps[v] : maxExps[v]);
  });
  if (JSON.stringify(w3) !== JSON.stringify(correctExps) && JSON.stringify(w3) !== JSON.stringify(w1)) results.push(w3);

  // Wrong4: product of all exps (all max)
  const w4 = {};
  for (const v of vars) {
    const mid = Math.floor((minExps[v] + maxExps[v]) / 2);
    w4[v] = mode === 'hcf' ? Math.max(minExps[v] + 1, mid) : Math.max(maxExps[v] - 1, minExps[v]);
  }
  results.push(w4);

  // Remove duplicates and correct answer
  const seen = new Set([JSON.stringify(correctExps)]);
  const unique = [];
  for (const w of results) {
    const key = JSON.stringify(w);
    if (!seen.has(key)) { seen.add(key); unique.push(w); }
  }
  return unique.slice(0, 3);
};

// ─── Question Generators ──────────────────────────────────────────────────────

// Type 1 & 2: HCF / LCM of 3 pure monomials (no coefficients)
const genHCFLCMMonomialQ = (mode) => {
  const varPools = [['x', 'y', 'z'], ['a', 'b', 'c'], ['u', 'v', 'w'], ['p', 'q', 'r']];
  const poolIdx = randInt(0, varPools.length - 1);
  const allVars = varPools[poolIdx];
  const numVars = randInt(2, 3);
  const vars = allVars.slice(0, numVars);

  const exprExps = [];
  const targetExps = {};

  for (const v of vars) {
    const base = mode === 'hcf' ? randInt(1, 2) : randInt(1, 2);
    const spread = 3; // l - h
    const fixedE = mode === 'hcf' ? base : base + spread;
    const exps = [];
    for (let i = 0; i < 3; i++) exps.push(base + randInt(0, spread));
    // Force the constraining value into one expression
    exps[randInt(0, 2)] = fixedE;
    targetExps[v] = fixedE;
    exprExps.push(exps);
  }

  // Build the 3 expression exps maps
  const expMaps = [0, 1, 2].map(i => {
    const m = {};
    vars.forEach((v, vi) => { m[v] = exprExps[vi][i]; });
    return m;
  });

  // Verify correctness
  for (const v of vars) {
    const actual = mode === 'hcf'
      ? Math.min(...expMaps.map(m => m[v]))
      : Math.max(...expMaps.map(m => m[v]));
    targetExps[v] = actual;
  }

  const exprStrs = expMaps.map(m => monomialLatex(vars, m));
  const answerStr = monomialLatex(vars, targetExps);

  const wrongs = makeWrongExps(vars, targetExps, expMaps, mode).map(w => monomialLatex(vars, w));
  const uniqueWrongs = [...new Set(wrongs)].filter(w => w !== answerStr).slice(0, 3);

  // Pad wrongs if needed
  while (uniqueWrongs.length < 3) {
    const pad = {};
    for (const v of vars) pad[v] = targetExps[v] + (uniqueWrongs.length + 1);
    const padStr = monomialLatex(vars, pad);
    if (!uniqueWrongs.includes(padStr) && padStr !== answerStr) uniqueWrongs.push(padStr);
    else break;
  }

  const opts = shuffle([answerStr, ...uniqueWrongs.slice(0, 3)]);
  const correctIdx = opts.indexOf(answerStr);
  const label = mode === 'hcf' ? 'H.C.F.' : 'L.C.M.';
  const op = mode === 'hcf' ? '\\min' : '\\max';
  const ruleText = mode === 'hcf' ? '最小' : '最大';

  const varBreakdown = vars.map(v => {
    const vals = expMaps.map(m => m[v]).join(',');
    return `${v}: ${op}(${vals}) = ${targetExps[v]}`;
  }).join(', \\quad ');

  return {
    type: mode,
    questionLatex: `\\text{求 } ${exprStrs.join(' \\text{、} ')} \\text{ 的 } ${label}`,
    options: opts,
    correctIndex: correctIdx,
    explanationLines: [
      `\\textbf{${label}} \\text{ → 每個變量取${ruleText}指數}`,
      varBreakdown,
      `\\therefore \\text{${label}} = ${answerStr}`,
    ],
    subtypeLabel: `${label} — 純變量單項式`,
  };
};

// Type 3: HCF / LCM of 3 monomials WITH integer coefficients
const COEFF_TRIPLES = [
  [6, 9, 12],   // gcd=3, lcm=36
  [4, 6, 10],   // gcd=2, lcm=60
  [8, 12, 20],  // gcd=4, lcm=120
  [9, 12, 15],  // gcd=3, lcm=180
  [6, 10, 15],  // gcd=1, lcm=30
  [4, 8, 12],   // gcd=4, lcm=24
  [3, 6, 9],    // gcd=3, lcm=18
  [5, 10, 15],  // gcd=5, lcm=30
  [12, 18, 24], // gcd=6, lcm=72
  [6, 8, 12],   // gcd=2, lcm=24
];

const genHCFLCMCoeffQ = (mode) => {
  const varPools = [['a', 'b'], ['x', 'y'], ['p', 'q'], ['m', 'n']];
  const vars = varPools[randInt(0, varPools.length - 1)];
  const triple = COEFF_TRIPLES[randInt(0, COEFF_TRIPLES.length - 1)];
  const [c1, c2, c3] = triple;
  const targetCoeff = mode === 'hcf' ? gcdMany(triple) : lcmMany(triple);

  // Variable exponents
  const exprExps = [];
  const targetExps = {};
  for (const v of vars) {
    const base = randInt(1, 2);
    const spread = 2;
    const exps = [base + randInt(0, spread), base + randInt(0, spread), base + randInt(0, spread)];
    const fixedE = mode === 'hcf' ? base : base + spread;
    exps[randInt(0, 2)] = fixedE;
    exprExps.push(exps);
  }
  const expMaps = [0, 1, 2].map(i => {
    const m = {};
    vars.forEach((v, vi) => { m[v] = exprExps[vi][i]; });
    return m;
  });
  for (const v of vars) {
    targetExps[v] = mode === 'hcf'
      ? Math.min(...expMaps.map(m => m[v]))
      : Math.max(...expMaps.map(m => m[v]));
  }

  const exprStrs = [c1, c2, c3].map((c, i) => monomialLatex(vars, expMaps[i], c));
  const answerStr = monomialLatex(vars, targetExps, targetCoeff);

  // Plausible wrong coefficients
  const wrongCoeffs = mode === 'hcf'
    ? [lcmMany(triple), gcdMany([c1, c2]) * 2, gcdMany([c1, c3])]
    : [gcdMany(triple), lcmMany([c1, c2]), lcmMany([c1, c2]) * 2];

  const wrongs = makeWrongExps(vars, targetExps, expMaps, mode);
  const allWrongs = [
    monomialLatex(vars, targetExps, wrongCoeffs[0]),
    monomialLatex(vars, wrongs[0] || targetExps, targetCoeff),
    monomialLatex(vars, wrongs[1] || targetExps, wrongCoeffs[1]),
    monomialLatex(vars, targetExps, wrongCoeffs[2]),
  ].filter(w => w !== answerStr);

  const uniqueWrongs = [...new Set(allWrongs)].slice(0, 3);
  const opts = shuffle([answerStr, ...uniqueWrongs]);
  const correctIdx = opts.indexOf(answerStr);
  const label = mode === 'hcf' ? 'H.C.F.' : 'L.C.M.';
  const op = mode === 'hcf' ? '\\min' : '\\max';
  const ruleText = mode === 'hcf' ? '最小' : '最大';
  const coeffOp = mode === 'hcf' ? 'GCD' : 'LCM';

  const varBreakdown = vars.map(v => {
    const vals = expMaps.map(m => m[v]).join(',');
    return `${v}: ${op}(${vals}) = ${targetExps[v]}`;
  }).join(', \\quad ');

  return {
    type: mode,
    questionLatex: `\\text{求 } ${exprStrs.join(' \\text{、} ')} \\text{ 的 } ${label}`,
    options: opts,
    correctIndex: correctIdx,
    explanationLines: [
      `\\textbf{${label}} \\text{ → 係數取 ${coeffOp}，變量取${ruleText}指數}`,
      `\\text{係數：${coeffOp}}(${c1},${c2},${c3}) = ${targetCoeff}`,
      varBreakdown,
      `\\therefore \\text{${label}} = ${answerStr}`,
    ],
    subtypeLabel: `${label} — 含係數單項式`,
  };
};

// Type 4: HCF of factored polynomial expressions  x^a(x+k)^b(x+m)^c
const FACTOR_TEMPLATES = [
  { factors: ['x', '(x+1)', '(x+2)'] },
  { factors: ['x', '(x-1)', '(x+1)'] },
  { factors: ['x', '(x+2)', '(x-2)'] },
  { factors: ['(x+1)', '(x+2)', '(x+3)'] },
  { factors: ['x', '(x+3)', '(x-3)'] },
  { factors: ['x', '(x+1)', '(x-2)'] },
];

const genHCFFactoredQ = () => {
  const tmpl = FACTOR_TEMPLATES[randInt(0, FACTOR_TEMPLATES.length - 1)];
  const factors = tmpl.factors;
  const numF = factors.length;

  // Assign exponents for each expression (2 expressions)
  const e1 = factors.map(() => randInt(1, 3));
  const e2 = factors.map(() => randInt(1, 3));

  // HCF = min exponent for each factor that appears in BOTH
  const hcfExps = factors.map((_, i) => Math.min(e1[i], e2[i]));

  // LCM = max exponent for each factor
  const lcmExps = factors.map((_, i) => Math.max(e1[i], e2[i]));

  const toExpStr = (exps) => {
    return factors.map((f, i) => {
      if (exps[i] === 0) return '';
      if (exps[i] === 1) return f;
      return `${f}^{${exps[i]}}`;
    }).join('');
  };

  const expr1Str = toExpStr(e1);
  const expr2Str = toExpStr(e2);
  const answerStr = toExpStr(hcfExps);

  // Wrong answers: LCM, swap some exps, modified
  const lcmStr = toExpStr(lcmExps);
  const w2Exps = [...hcfExps]; w2Exps[0] = e1[0]; // use e1[0] instead of min
  const w3Exps = factors.map((_, i) => Math.max(e1[i], e2[i]) - 1 >= 1 ? Math.max(e1[i], e2[i]) - 1 : 1);
  const w4Exps = factors.map((_, i) => Math.min(e1[i], e2[i]) + 1);

  const wrongs = [lcmStr, toExpStr(w2Exps), toExpStr(w3Exps), toExpStr(w4Exps)]
    .filter(w => w !== answerStr);
  const uniqueWrongs = [...new Set(wrongs)].slice(0, 3);

  const opts = shuffle([answerStr, ...uniqueWrongs]);
  const correctIdx = opts.indexOf(answerStr);

  const factorBreakdown = factors.map((f, i) =>
    `${f}: \\min(${e1[i]},${e2[i]}) = ${hcfExps[i]}`
  ).join(', \\quad ');

  return {
    type: 'hcf',
    questionLatex: `\\text{求 } ${expr1Str} \\text{ 及 } ${expr2Str} \\text{ 的 H.C.F.}`,
    options: opts,
    correctIndex: correctIdx,
    explanationLines: [
      `\\textbf{H.C.F.} \\text{ → 對每個因式取最小次方}`,
      factorBreakdown,
      `\\therefore \\text{H.C.F.} = ${answerStr}`,
    ],
    subtypeLabel: 'H.C.F. — 因式形式多項式',
  };
};

// Type 5: Find 3rd expression given HCF, LCM, two of three monomials
const genFindThirdQ = () => {
  const varPools = [['x', 'y', 'z'], ['a', 'b', 'c'], ['p', 'q', 'r']];
  const vars = varPools[randInt(0, varPools.length - 1)];

  const hcfExps = {};
  const lcmExps = {};
  const e1 = {};
  const e2 = {};
  const e3 = {};

  for (const v of vars) {
    const h = randInt(1, 2);
    const l = h + randInt(2, 3);
    hcfExps[v] = h;
    lcmExps[v] = l;

    // Decide how e3 is forced (by min constraint or max constraint)
    const forcedByMin = Math.random() < 0.5;

    if (forcedByMin) {
      // min(e1,e2) > h  → e3 = h
      e3[v] = h;
      e1[v] = randInt(h + 1, l);
      e2[v] = randInt(h + 1, l);
      // Ensure max(e1,e2,e3) = l: since e3=h<l, we need max(e1,e2)=l
      if (Math.max(e1[v], e2[v]) < l) e1[v] = l;
    } else {
      // max(e1,e2) < l  → e3 = l
      e3[v] = l;
      e1[v] = randInt(h, l - 1);
      e2[v] = randInt(h, l - 1);
      // Ensure min(e1,e2,e3) = h: since e3=l>h, we need min(e1,e2)=h
      if (Math.min(e1[v], e2[v]) > h) e1[v] = h;
    }
  }

  const hcfStr = monomialLatex(vars, hcfExps);
  const lcmStr = monomialLatex(vars, lcmExps);
  const expr1Str = monomialLatex(vars, e1);
  const expr2Str = monomialLatex(vars, e2);
  const answerStr = monomialLatex(vars, e3);

  // Wrong answers: vary one or two variable exps
  const makeWrong = (delta) => {
    const w = {};
    vars.forEach((v, i) => {
      w[v] = Math.max(hcfExps[v], Math.min(lcmExps[v], e3[v] + (i === 0 ? delta : 0)));
    });
    return monomialLatex(vars, w);
  };

  const allWrongs = [
    makeWrong(1), makeWrong(-1), makeWrong(2),
    monomialLatex(vars, hcfExps),
    monomialLatex(vars, lcmExps),
  ].filter(w => w !== answerStr);
  const uniqueWrongs = [...new Set(allWrongs)].slice(0, 3);

  const opts = shuffle([answerStr, ...uniqueWrongs]);
  const correctIdx = opts.indexOf(answerStr);

  const varLines = vars.map(v => {
    const h = hcfExps[v], l = lcmExps[v];
    const a1 = e1[v], a2 = e2[v], a3 = e3[v];
    if (a3 === h) {
      return `${v}: \\min(${a1},${a2})=${Math.min(a1,a2)} > h,\\; \\therefore e_3=h=${h}`;
    } else {
      return `${v}: \\max(${a1},${a2})=${Math.max(a1,a2)} < l,\\; \\therefore e_3=l=${l}`;
    }
  });

  return {
    type: 'find_third',
    questionLatex: `\\text{三個單項式的 H.C.F. 及 L.C.M. 分別為 } ${hcfStr} \\text{ 及 } ${lcmStr}。\\text{若前兩個單項式分別為 } ${expr1Str} \\text{ 及 } ${expr2Str}，\\text{則第三個單項式為}`,
    options: opts,
    correctIndex: correctIdx,
    explanationLines: [
      `\\text{若 } \\min(e_1,e_2)>h \\Rightarrow e_3=h\\text{（補足 H.C.F.）}`,
      `\\text{若 } \\max(e_1,e_2)<l \\Rightarrow e_3=l\\text{（補足 L.C.M.）}`,
      ...varLines,
      `\\therefore \\text{第三式} = ${answerStr}`,
    ],
    subtypeLabel: '求第三個單項式（已知 H.C.F., L.C.M. 及兩個單項式）',
  };
};

// Type 6: LCM of factorable polynomial expressions (template-based)
// Each template stores the factored forms and LCM
const FACTORED_POLY_TEMPLATES = [
  {
    // x²(x+1)(x+2) and x(x+1)³ — HCF
    var: 'x',
    exprs: ['x^2(x+1)(x+2)', 'x(x+1)^3'],
    factored: ['x^2(x+1)(x+2)', 'x(x+1)^3'],
    mode: 'hcf',
    answer: 'x(x+1)',
    wrongs: ['x(x+1)(x+2)', 'x^2(x+1)^3', 'x^2(x+1)^3(x+2)'],
    hint: '\\text{取每個因式的最小次：} x^{\\min(2,1)}(x+1)^{\\min(1,3)}=x(x+1)',
  },
  {
    // 210xy² and 30x²yz — LCM
    var: 'x',
    exprs: ['210xy^2', '30x^2yz'],
    factored: ['2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot x \\cdot y^2', '2 \\cdot 3 \\cdot 5 \\cdot x^2 \\cdot y \\cdot z'],
    mode: 'lcm',
    answer: '630x^2y^2z',
    wrongs: ['30xy', '210x^2y^2z', '30xyz'],
    hint: `\\text{LCM}(210,30)=630,\\ \\text{LCM}(x,x^2)=x^2,\\ \\text{LCM}(y^2,y)=y^2,\\ \\text{LCM}(1,z)=z`,
  },
  {
    // x²-1 = (x+1)(x-1),  x²+2x+1 = (x+1)²   LCM
    var: 'x',
    exprs: ['x^2-1', 'x^2+2x+1'],
    factored: ['(x+1)(x-1)', '(x+1)^2'],
    mode: 'lcm',
    answer: '(x-1)(x+1)^2',
    wrongs: ['(x+1)', '(x-1)(x+1)', '(x-1)^2(x+1)^2'],
    hint: 'x^2-1=(x+1)(x-1),\\ x^2+2x+1=(x+1)^2',
  },
  {
    // x³-x² = x²(x-1),  x²-x = x(x-1)   HCF
    var: 'x',
    exprs: ['x^3-x^2', 'x^2-x'],
    factored: ['x^2(x-1)', 'x(x-1)'],
    mode: 'hcf',
    answer: 'x(x-1)',
    wrongs: ['x^2(x-1)', 'x', 'x^2(x-1)^2'],
    hint: 'x^3-x^2=x^2(x-1),\\ x^2-x=x(x-1)',
  },
  {
    // a³-a²b, a²b-ab²  HCF
    var: 'a',
    exprs: ['a^3-a^2b', 'a^2b-ab^2'],
    factored: ['a^2(a-b)', 'ab(a-b)'],
    mode: 'hcf',
    answer: 'a(a-b)',
    wrongs: ['a^2b(a-b)', 'a^2(a-b)', 'ab'],
    hint: 'a^3-a^2b=a^2(a-b),\\ a^2b-ab^2=ab(a-b)',
  },
  {
    // 12-31: H.C.F.=ab², L.C.M.=4a⁴b⁵c⁶, expr1=2a²b⁴, expr2=4a⁴b²c⁶ → find third
    var: 'a',
    exprs: ['\\text{H.C.F.}=ab^2,\\ \\text{L.C.M.}=4a^4b^5c^6', '\\text{第一個}=2a^2b^4,\\ \\text{第二個}=4a^4b^2c^6'],
    factored: ['', ''],
    mode: 'find_third',
    answer: '2ab^5c^6',
    wrongs: ['ab^5', 'ab^2c', '2ab^2c^6'],
    hint: `\\text{對每個因素：若兩式不能達到 H.C.F. 或 L.C.M.，則第三式須補足。}`,
  },
];

const genFactoredPolyQ = () => {
  const tmpl = FACTORED_POLY_TEMPLATES[randInt(0, FACTORED_POLY_TEMPLATES.length - 1)];
  const label = tmpl.mode === 'hcf' ? 'H.C.F.' : (tmpl.mode === 'lcm' ? 'L.C.M.' : '第三個多項式');

  let questionLatex;
  if (tmpl.mode === 'find_third') {
    questionLatex = `\\text{三個多項式的 } ${tmpl.exprs[0]}。${tmpl.exprs[1]}，\\text{則第三個多項式為}`;
  } else if (tmpl.exprs.length === 2) {
    questionLatex = `\\text{求 } ${tmpl.exprs[0]} \\text{ 及 } ${tmpl.exprs[1]} \\text{ 的 } ${label}`;
  } else {
    questionLatex = `\\text{求 } ${tmpl.exprs.join(' \\text{、} ')} \\text{ 的 } ${label}`;
  }

  const opts = shuffle([tmpl.answer, ...tmpl.wrongs.slice(0, 3)]);
  const correctIdx = opts.indexOf(tmpl.answer);

  const explLines = [];
  if (tmpl.hint) {
    tmpl.hint.split(',\\ ').forEach(s => explLines.push(s.trim()));
  }
  explLines.push(`\\therefore \\text{${tmpl.mode === 'find_third' ? '第三式' : label}} = ${tmpl.answer}`);

  return {
    type: tmpl.mode,
    questionLatex,
    options: opts,
    correctIndex: correctIdx,
    explanationLines: explLines,
    subtypeLabel: tmpl.mode === 'find_third' ? '求第三個多項式' : `${label} — 可因式分解多項式`,
  };
};

// Master generator: pick a random question type
const generateQuestion = () => {
  const typeWeights = [
    { gen: () => genHCFLCMMonomialQ('hcf'), w: 15 },
    { gen: () => genHCFLCMMonomialQ('lcm'), w: 15 },
    { gen: () => genHCFLCMCoeffQ('hcf'), w: 12 },
    { gen: () => genHCFLCMCoeffQ('lcm'), w: 12 },
    { gen: () => genHCFFactoredQ(), w: 8 },
    { gen: () => genFindThirdQ(), w: 15 },
    { gen: () => genFactoredPolyQ(), w: 23 },
  ];
  const total = typeWeights.reduce((s, t) => s + t.w, 0);
  let r = Math.random() * total;
  for (const t of typeWeights) { r -= t.w; if (r <= 0) return t.gen(); }
  return typeWeights[typeWeights.length - 1].gen();
};

// ─── Notes Component for HCF / LCM ───────────────────────────────────────────
const HCFLCMNotes = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
      <ArrowLeft className="w-5 h-5" /> 返回
    </button>
    <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-400 pb-3">
      📘 筆記：多項式的 H.C.F. 及 L.C.M.
    </h1>

    <div className="space-y-8 text-slate-700">
      {/* 定義 */}
      <section className="bg-blue-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-blue-800 mb-3">一、定義</h2>
        <ul className="space-y-3 list-none">
          <li className="bg-white rounded-lg p-3 shadow-sm">
            <span className="font-bold text-blue-700">H.C.F.（最高公因式）</span>：能整除所有給定多項式的最高次多項式。
          </li>
          <li className="bg-white rounded-lg p-3 shadow-sm">
            <span className="font-bold text-indigo-700">L.C.M.（最低公倍式）</span>：能被所有給定多項式整除的最低次多項式。
          </li>
        </ul>
      </section>

      {/* 單項式方法 */}
      <section className="bg-green-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-green-800 mb-3">二、單項式的 H.C.F. 及 L.C.M.</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-semibold text-green-700 mb-2">步驟：</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>將每個單項式的<strong>係數</strong>分開計算（若有）：<br />
              HCF 係數 = 各係數的 GCD，LCM 係數 = 各係數的 LCM
            </li>
            <li>對每個<strong>變量字母</strong>分開考慮：<br />
              <span className="text-blue-700 font-semibold">H.C.F.</span> 取<strong>最小</strong>指數，<span className="text-indigo-700 font-semibold">L.C.M.</span> 取<strong>最大</strong>指數
            </li>
          </ol>
        </div>

        <div className="bg-green-100 rounded-lg p-4">
          <p className="font-semibold mb-2">例題（14-31）：求 <InlineMath math="3x^4y^2z" />、<InlineMath math="4xy^5z" />、<InlineMath math="6x^2y^3" /> 的 H.C.F.</p>
          <BlockMath math="\text{係數：GCD}(3,4,6)=1" />
          <BlockMath math="x: \min(4,1,2)=1 \quad y: \min(2,5,3)=2 \quad z: \min(1,1,0)=0" />
          <BlockMath math="\therefore \text{H.C.F.} = xy^2" />
          <p className="text-sm text-green-700 mt-2">（注意：<InlineMath math="6x^2y^3" /> 沒有 <InlineMath math="z" />，故 <InlineMath math="z" /> 的最小指數為 0）</p>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4 mt-3">
          <p className="font-semibold mb-2">例題（16-31）：求 <InlineMath math="9a^2b" />、<InlineMath math="12a^4b^3" />、<InlineMath math="15a^6" /> 的 L.C.M.</p>
          <BlockMath math="\text{係數：LCM}(9,12,15)=180" />
          <BlockMath math="a: \max(2,4,6)=6 \quad b: \max(1,3,0)=3" />
          <BlockMath math="\therefore \text{L.C.M.} = 180a^6b^3" />
        </div>
      </section>

      {/* 多項式方法 */}
      <section className="bg-purple-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-800 mb-3">三、多項式的 H.C.F. 及 L.C.M.</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-semibold text-purple-700 mb-2">步驟：</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>完全因式分解</strong>每個多項式</li>
            <li>H.C.F. = <strong>公共因式的乘積</strong>，每個因式取<strong>最低次</strong></li>
            <li>L.C.M. = <strong>所有因式的乘積</strong>，每個因式取<strong>最高次</strong></li>
          </ol>
        </div>

        <div className="bg-purple-100 rounded-lg p-4">
          <p className="font-semibold mb-2">例題：求 <InlineMath math="a^2+4a+4" /> 及 <InlineMath math="a^2-4" /> 的 L.C.M.</p>
          <BlockMath math="a^2+4a+4 = (a+2)^2" />
          <BlockMath math="a^2-4 = (a+2)(a-2)" />
          <BlockMath math="\therefore \text{L.C.M.} = (a+2)^2(a-2)" />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-3">
          <p className="font-semibold mb-2">例題（05-38）：求 <InlineMath math="x^2(x+1)(x+2)" /> 及 <InlineMath math="x(x+1)^3" /> 的 H.C.F.</p>
          <BlockMath math="\text{公共因式：} x \text{ 及 } (x+1)" />
          <BlockMath math="x: \min(2,1)=1 \quad (x+1): \min(1,3)=1" />
          <BlockMath math="\therefore \text{H.C.F.} = x(x+1)" />
        </div>
      </section>

      {/* 求第三個多項式 */}
      <section className="bg-orange-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-orange-800 mb-3">四、已知 H.C.F.、L.C.M. 及兩個式，求第三個式</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-semibold text-orange-700 mb-2">方法（針對每個變量分開考慮）：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>設已知兩式的指數為 <InlineMath math="e_1, e_2" />，H.C.F. 指數為 <InlineMath math="h" />，L.C.M. 指數為 <InlineMath math="l" /></li>
            <li>若 <InlineMath math="\min(e_1,e_2) > h" />（兩式都達不到 H.C.F.）→ 第三式指數 = <InlineMath math="h" /></li>
            <li>若 <InlineMath math="\max(e_1,e_2) < l" />（兩式都達不到 L.C.M.）→ 第三式指數 = <InlineMath math="l" /></li>
          </ul>
        </div>

        <div className="bg-orange-100 rounded-lg p-4">
          <p className="font-semibold mb-2">例題（21-31）：H.C.F. = <InlineMath math="x^2y^2z" />，L.C.M. = <InlineMath math="x^3y^4z^5" /><br />第一式 = <InlineMath math="x^3y^2z^2" />，第二式 = <InlineMath math="x^2y^3z^5" />，求第三式</p>
          <div className="overflow-x-auto">
            <table className="text-sm text-center border-collapse mt-2 w-full">
              <thead>
                <tr className="bg-orange-200">
                  <th className="border border-orange-300 px-3 py-1">變量</th>
                  <th className="border border-orange-300 px-3 py-1">h</th>
                  <th className="border border-orange-300 px-3 py-1">l</th>
                  <th className="border border-orange-300 px-3 py-1">e₁</th>
                  <th className="border border-orange-300 px-3 py-1">e₂</th>
                  <th className="border border-orange-300 px-3 py-1">e₃</th>
                  <th className="border border-orange-300 px-3 py-1">理由</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-orange-300 px-3 py-1 font-bold">x</td>
                  <td className="border border-orange-300 px-3 py-1">2</td>
                  <td className="border border-orange-300 px-3 py-1">3</td>
                  <td className="border border-orange-300 px-3 py-1">3</td>
                  <td className="border border-orange-300 px-3 py-1">2</td>
                  <td className="border border-orange-300 px-3 py-1 text-blue-700 font-semibold">2 or 3</td>
                  <td className="border border-orange-300 px-3 py-1 text-xs">min=max=h,l 均達到</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-orange-300 px-3 py-1 font-bold">y</td>
                  <td className="border border-orange-300 px-3 py-1">2</td>
                  <td className="border border-orange-300 px-3 py-1">4</td>
                  <td className="border border-orange-300 px-3 py-1">2</td>
                  <td className="border border-orange-300 px-3 py-1">3</td>
                  <td className="border border-orange-300 px-3 py-1 text-indigo-700 font-semibold">4</td>
                  <td className="border border-orange-300 px-3 py-1 text-xs">max(2,3)=3 &lt; 4=l → e₃=4</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-orange-300 px-3 py-1 font-bold">z</td>
                  <td className="border border-orange-300 px-3 py-1">1</td>
                  <td className="border border-orange-300 px-3 py-1">5</td>
                  <td className="border border-orange-300 px-3 py-1">2</td>
                  <td className="border border-orange-300 px-3 py-1">5</td>
                  <td className="border border-orange-300 px-3 py-1 text-red-700 font-semibold">1</td>
                  <td className="border border-orange-300 px-3 py-1 text-xs">min(2,5)=2 &gt; 1=h → e₃=1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm">由選項得 <InlineMath math="e_{3x}=2" />，故第三式 = <InlineMath math="x^2y^4z" /></p>
        </div>
      </section>

      {/* 常見因式分解 提示 */}
      <section className="bg-yellow-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-yellow-800 mb-3">五、常用因式分解恆等式（配合 L.C.M./H.C.F.）</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ['a^2-b^2=(a+b)(a-b)', '平方差'],
            ['a^2+2ab+b^2=(a+b)^2', '完全平方和'],
            ['a^2-2ab+b^2=(a-b)^2', '完全平方差'],
          ].map(([formula, name]) => (
            <div key={name} className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3">
              <span className="text-yellow-600 font-bold text-sm w-14 shrink-0">{name}</span>
              <InlineMath math={formula} />
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

// ─── MC Option Button ─────────────────────────────────────────────────────────
const OptionBtn = ({ label, optionLatex, state, onClick }) => {
  // state: 'idle' | 'correct' | 'wrong' | 'reveal'
  const base = 'w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium';
  const styles = {
    idle: 'border-slate-200 hover:border-blue-400 hover:bg-blue-50 bg-white cursor-pointer',
    correct: 'border-green-500 bg-green-50 cursor-default',
    wrong: 'border-red-400 bg-red-50 cursor-default',
    reveal: 'border-green-400 bg-green-50 cursor-default opacity-80',
  };
  const icons = {
    idle: null,
    correct: <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />,
    wrong: <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    reveal: <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5 opacity-70" />,
  };

  return (
    <button className={`${base} ${styles[state]}`} onClick={onClick} disabled={state !== 'idle'}>
      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5
        ${state === 'idle' ? 'bg-slate-100 text-slate-600' :
          state === 'correct' ? 'bg-green-500 text-white' :
          state === 'wrong' ? 'bg-red-400 text-white' : 'bg-green-400 text-white'}`}>
        {label}
      </span>
      {icons[state]}
      <span><InlineMath math={optionLatex} /></span>
    </button>
  );
};

// ─── Quiz Component ───────────────────────────────────────────────────────────
const HCFLCMQuiz = ({ onBack }) => {
  const [question, setQuestion] = useState(() => generateQuestion());
  const [selected, setSelected] = useState(null); // index or null
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion());
    setSelected(null);
  }, []);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === question.correctIndex;
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    setStreak(st => isCorrect ? st + 1 : 0);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  const getOptionState = (idx) => {
    if (selected === null) return 'idle';
    if (idx === question.correctIndex) return selected === idx ? 'correct' : 'reveal';
    if (idx === selected) return 'wrong';
    return 'idle';
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium">
          <ArrowLeft className="w-5 h-5" /> 返回
        </button>
        <div className="flex items-center gap-4 text-sm">
          {streak >= 3 && (
            <span className="flex items-center gap-1 text-orange-500 font-bold">
              <Star className="w-4 h-4 fill-orange-400" /> ×{streak}
            </span>
          )}
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
            ✓ {score.correct}/{score.total}
          </span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
            {accuracy}%
          </span>
        </div>
      </div>

      {/* Subtype label */}
      <div className="mb-3">
        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
          {question.subtypeLabel}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-5">
        <p className="text-base font-semibold text-slate-700 mb-4">
          <InlineMath math={question.questionLatex} />
        </p>

        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <OptionBtn
              key={`${question.questionLatex}-${idx}`}
              label={optionLabels[idx]}
              optionLatex={opt}
              state={getOptionState(idx)}
              onClick={() => handleSelect(idx)}
            />
          ))}
        </div>
      </div>

      {/* Feedback */}
      {selected !== null && (
        <div className={`rounded-xl p-4 mb-4 border-l-4 ${selected === question.correctIndex
          ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-400'}`}>
          <div className="flex items-center gap-2 mb-3">
            {selected === question.correctIndex
              ? <CheckCircle className="w-5 h-5 text-green-600" />
              : <XCircle className="w-5 h-5 text-red-500" />}
            <span className={`font-bold ${selected === question.correctIndex ? 'text-green-700' : 'text-red-600'}`}>
              {selected === question.correctIndex ? '正確！' : `錯誤！答案是 ${optionLabels[question.correctIndex]}`}
            </span>
          </div>
          <div className="bg-white rounded-lg px-4 py-3 space-y-1">
            {(question.explanationLines || []).map((line, i) => (
              <BlockMath key={i} math={line} />
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      {selected !== null && (
        <button
          onClick={nextQuestion}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
          下一題 <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

// ─── Topic List ───────────────────────────────────────────────────────────────
const TOPICS = [
  {
    id: 'hcf-lcm',
    title: '多項式的 H.C.F. 及 L.C.M.',
    desc: '最高公因式與最小公倍式，涵蓋純變量單項式、含係數單項式、可因式分解多項式及求第三式',
    icon: '📐',
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50 border-blue-200',
    badges: [
      { level: 'F3', chapter: 'CH2', subject: '多項式' },
      { level: 'F4', chapter: 'CH1', subject: '多項式的運算' },
      { level: 'F4', chapter: 'CH4', subject: '續多項式' },
      { level: 'F5', chapter: 'CH11', subject: '更多關於多項式' },
    ],
  },
];

// ─── Main MCLimitedF6 App ─────────────────────────────────────────────────────
const MCLimitedF6 = () => {
  const [view, setView] = useState('home'); // 'home' | 'quiz' | 'notes'
  const [activeTopic, setActiveTopic] = useState(null);

  if (view === 'quiz' && activeTopic) {
    if (activeTopic.id === 'hcf-lcm') return <HCFLCMQuiz onBack={() => setView('home')} />;
  }
  if (view === 'notes' && activeTopic) {
    if (activeTopic.id === 'hcf-lcm') return <HCFLCMNotes onBack={() => setView('home')} />;
  }

  // Home – topic selector
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 shadow-sm px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600">
          <HomeIcon className="w-5 h-5" />
          <span className="text-sm font-medium">主頁</span>
        </Link>
        <h1 className="text-slate-800 font-bold text-lg tracking-wide">DSE MC限定</h1>
        <div className="w-16" />
      </nav>

      {/* Hero */}
      <div className="text-center py-12 px-4">
        <div className="inline-block bg-yellow-100 border border-yellow-300 text-yellow-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
          ★ DSE 歷屆 MC 模擬練習
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">選擇題限時衝刺</h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          自動生成仿 DSE 風格選擇題，涵蓋課程重點。選擇以下主題開始練習或閱讀筆記。
        </p>
      </div>

      {/* Topics Grid */}
      <div className="max-w-3xl mx-auto px-4 pb-16 grid gap-5">
        {TOPICS.map((topic) => (
          <div key={topic.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition shadow-sm">
            <div className={`bg-gradient-to-r ${topic.color} px-6 py-5 flex items-start gap-4`}>
              <span className="text-4xl">{topic.icon}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  {topic.badges.map((b, i) => (
                    <span key={i} className="bg-white/30 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {b.level} {b.chapter} {b.subject}
                    </span>
                  ))}
                </div>
                <h3 className="text-white font-bold text-xl">{topic.title}</h3>
                <p className="text-white/80 text-sm mt-1">{topic.desc}</p>
              </div>
            </div>

            <div className="px-6 py-4 flex gap-3 flex-wrap">
              <button
                onClick={() => { setActiveTopic(topic); setView('quiz'); }}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition shadow">
                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                開始練習
              </button>
              <button
                onClick={() => { setActiveTopic(topic); setView('notes'); }}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl hover:bg-slate-200 transition">
                <BookOpen className="w-4 h-4" />
                查看筆記
              </button>
            </div>
          </div>
        ))}

        {/* Coming Soon */}
        {[
          { title: '二進制轉換', icon: '🔟', level: 'F4' },
          { title: '變分常數', icon: '📊', level: 'F5' },
          { title: '複數 i', icon: '🔮', level: 'F6' },
        ].map(t => (
          <div key={t.title} className="bg-white/70 border border-slate-200 rounded-2xl px-6 py-5 flex items-center gap-4 opacity-60">
            <span className="text-3xl">{t.icon}</span>
            <div>
              <span className="bg-slate-200 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full mr-2">{t.level}</span>
              <span className="text-slate-500 font-semibold">{t.title}</span>
              <span className="ml-3 text-xs text-slate-400">（即將推出）</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCLimitedF6;
