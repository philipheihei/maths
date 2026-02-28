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

const LeftBlockMath = ({ math }) => {
  const ref = useRef(null);
  const katexLoaded = useKatex();
  useEffect(() => {
    if (katexLoaded && ref.current && window.katex) {
      try { window.katex.render(math, ref.current, { displayMode: true, throwOnError: false, fleqn: true }); }
      catch (e) { if (ref.current) ref.current.textContent = math; }
    }
  }, [math, katexLoaded]);
  return <div ref={ref} className="my-2 overflow-x-auto pl-2" />;
};

// Left-aligned, =-aligned explanation block
// Shows the question as first line, then each step on its own line (no scroll)
const AlignedSteps = ({ questionLatex, lines }) => {
  const allLines = [...(questionLatex ? [questionLatex] : []), ...(lines || [])];
  return (
    <div className="py-2 pl-2 text-left space-y-1">
      {allLines.map((line, i) => (
        <div key={i}><InlineMath math={line} /></div>
      ))}
    </div>
  );
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
  const vars = varPools[poolIdx]; // always 3 variables

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

  // Ensure all three expressions are distinct; retry if not
  if (new Set(exprStrs).size < 3) return genHCFLCMMonomialQ(mode);

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
  const ruleText = mode === 'hcf' ? '最小' : '最大';

  const varBreakdown = vars.map(v => {
    const termStrs = expMaps.map(m => {
      const e = m[v];
      return e === 1 ? v : `${v}^{${e}}`;
    }).join(',\\ ');
    const resultStr = targetExps[v] === 1 ? v : `${v}^{${targetExps[v]}}`;
    return `${termStrs} \\rightarrow \\text{${ruleText}次方：}${resultStr}`;
  });

  return {
    type: mode,
    questionLatex: `${exprStrs.slice(0, -1).join(' \\text{、} ')} \\text{ 及 } ${exprStrs[exprStrs.length - 1]} \\text{ 的 ${label} 為}`,
    options: opts,
    correctIndex: correctIdx,
    explanationLines: [
      `\\textbf{${label}} \\text{ → 每個變量取${ruleText}指數}`,
      ...varBreakdown,
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

  // Ensure all three expressions are distinct; retry if not
  if (new Set(exprStrs).size < 3) return genHCFLCMCoeffQ(mode);

  const answerStr = monomialLatex(vars, targetExps, targetCoeff);

  // DSE-style distractors (mirror pasted image 2 pattern):
  const oppCoeff = mode === 'hcf' ? lcmMany(triple) : gcdMany(triple);

  // opposite variable exponents (max for HCF question, min for LCM question)
  const oppExps = {};
  for (const v of vars) {
    oppExps[v] = mode === 'hcf'
      ? Math.max(...expMaps.map(m => m[v]))
      : Math.min(...expMaps.map(m => m[v]));
  }
  // sum of all exponents for each var (common wrong: add instead of min/max)
  const sumExps = {};
  for (const v of vars) {
    sumExps[v] = expMaps.reduce((acc, m) => acc + m[v], 0);
  }

  const allWrongs = [
    monomialLatex(vars, oppExps, oppCoeff),    // full opposite: e.g. L.C.M. as wrong for H.C.F.
    monomialLatex(vars, oppExps, targetCoeff), // correct coeff, opposite exponents
    monomialLatex(vars, targetExps, oppCoeff), // opposite coeff, correct exponents
    monomialLatex(vars, sumExps, targetCoeff), // correct coeff, sum exponents
    monomialLatex(vars, sumExps, oppCoeff),    // opposite coeff, sum exponents
  ].filter(w => w !== answerStr);

  const uniqueWrongs = [...new Set(allWrongs)].slice(0, 3);
  const opts = shuffle([answerStr, ...uniqueWrongs]);
  const correctIdx = opts.indexOf(answerStr);
  const label = mode === 'hcf' ? 'H.C.F.' : 'L.C.M.';
  const ruleText = mode === 'hcf' ? '最小' : '最大';
  const coeffOp = mode === 'hcf' ? 'GCD' : 'LCM';

  const varBreakdown = vars.map(v => {
    const termStrs = expMaps.map(m => {
      const e = m[v];
      return e === 1 ? v : `${v}^{${e}}`;
    }).join(',\\ ');
    const resultStr = targetExps[v] === 1 ? v : `${v}^{${targetExps[v]}}`;
    return `${termStrs} \\rightarrow \\text{${ruleText}次方：}${resultStr}`;
  });

  return {
    type: mode,
    questionLatex: `${exprStrs.slice(0, -1).join(' \\text{、} ')} \\text{ 及 } ${exprStrs[exprStrs.length - 1]} \\text{ 的 ${label} 為}`,
    options: opts,
    correctIndex: correctIdx,
    explanationLines: [
      `\\textbf{${label}} \\text{ → 數字取${mode === 'hcf' ? '最大公因數' : '最小公倍數'}，代數取${ruleText}指數}`,
      `\\text{${c1}, ${c2}, ${c3} 的${mode === 'hcf' ? '公因數' : '公倍數'}為 } ${targetCoeff}`,
      ...varBreakdown,
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
    questionLatex: `${expr1Str} \\text{ 及 } ${expr2Str} \\text{ 的 H.C.F. 為}`,
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

  const expStr = (v, e) => e === 1 ? v : `${v}^{${e}}`;

  const varLines = vars.map(v => {
    const h = hcfExps[v], l = lcmExps[v];
    const a1 = e1[v], a2 = e2[v], a3 = e3[v];
    const s1 = expStr(v, a1), s2 = expStr(v, a2);
    const sh = expStr(v, h), sl = expStr(v, l);
    if (a3 === h) {
      return `\\text{${v}：式1有 }${s1}\\text{，式2有 }${s2}\\text{，但 H.C.F. 為 }${sh}\\text{，能推理出第三個數式須有 }${sh}`;
    } else {
      return `\\text{${v}：式1有 }${s1}\\text{，式2有 }${s2}\\text{，但 L.C.M. 為 }${sl}\\text{，能推理出第三個數式須有 }${sl}`;
    }
  });

  return {
    type: 'find_third',
    questionLatex: `\\text{三個數式的 H.C.F. 及 L.C.M. 分別為 } ${hcfStr} \\text{ 及 } ${lcmStr}。`,
    questionLatex2: `\\text{若第一個數式及第二個數式分別為 } ${expr1Str} \\text{ 及 } ${expr2Str}\\text{，則第三個數式為}`,
    options: opts,
    correctIndex: correctIdx,
    explanationLines: [
      ...varLines,
      `\\therefore \\text{第三個數式} = ${answerStr}`,
    ],
    subtypeLabel: '求第三個數式（已知 H.C.F., L.C.M. 及兩個數式）',
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
    hint: [
      'x^2,\\ x \\rightarrow \\text{最小次方：}x',
      '(x+1)^1,\\ (x+1)^3 \\rightarrow \\text{最小次方：}(x+1)^1',
      '(x+2)^1,\\ \\text{沒有} \\rightarrow \\text{（不含 }(x+2)\\text{）}',
    ],
  },
  {
    // 210xy² and 30x²yz — LCM
    var: 'x',
    exprs: ['210xy^2', '30x^2yz'],
    factored: ['2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot x \\cdot y^2', '2 \\cdot 3 \\cdot 5 \\cdot x^2 \\cdot y \\cdot z'],
    mode: 'lcm',
    answer: '630x^2y^2z',
    wrongs: ['30xy', '210x^2y^2z', '30xyz'],
    hint: [
      '\\text{係數：210 及 30 的公倍數為 }630',
      'x,\\ x^2 \\rightarrow \\text{最大次方：}x^2',
      'y^2,\\ y \\rightarrow \\text{最大次方：}y^2',
      '1,\\ z \\rightarrow \\text{最大次方：}z',
    ],
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
    hcf: 'ab^2',
    lcm: '4a^4b^5c^6',
    expr1: '2a^2b^4',
    expr2: '4a^4b^2c^6',
    factored: ['', ''],
    mode: 'find_third',
    answer: 'ab^5',
    wrongs: ['2ab^5c^6', 'ab^2c', '2ab^2c^6'],
    hint: `\\text{對每個因素：若兩式不能達到 H.C.F. 或 L.C.M.，則第三式須補足。}`,
  },
];

const genFactoredPolyQ = () => {
  const tmpl = FACTORED_POLY_TEMPLATES[randInt(0, FACTORED_POLY_TEMPLATES.length - 1)];
  const label = tmpl.mode === 'hcf' ? 'H.C.F.' : (tmpl.mode === 'lcm' ? 'L.C.M.' : '第三個多項式');

  let questionLatex, questionLatex2;
  if (tmpl.mode === 'find_third') {
    questionLatex = `\\text{三個數式的 H.C.F. 及 L.C.M. 分別為 } ${tmpl.hcf} \\text{ 及 } ${tmpl.lcm}`;
    questionLatex2 = `\\text{若第一個數式及第二個數式分別為 } ${tmpl.expr1} \\text{ 及 } ${tmpl.expr2}\\text{，則第三個數式為}`;
  } else if (tmpl.exprs.length === 2) {
    questionLatex = `${tmpl.exprs[0]} \\text{ 及 } ${tmpl.exprs[1]} \\text{ 的 ${label} 為}`;
  } else {
    questionLatex = `${tmpl.exprs.slice(0, -1).join(' \\text{、} ')} \\text{ 及 } ${tmpl.exprs[tmpl.exprs.length - 1]} \\text{ 的 ${label} 為}`;
  }

  const opts = shuffle([tmpl.answer, ...tmpl.wrongs.slice(0, 3)]);
  const correctIdx = opts.indexOf(tmpl.answer);

  const explLines = [];
  if (tmpl.hint) {
    if (Array.isArray(tmpl.hint)) {
      tmpl.hint.forEach(s => explLines.push(s));
    } else {
      tmpl.hint.split(',\\ ').forEach(s => explLines.push(s.trim()));
    }
  }
  explLines.push(`\\therefore \\text{${tmpl.mode === 'find_third' ? '第三式' : label}} = ${tmpl.answer}`);

  return {
    type: tmpl.mode,
    questionLatex,
    questionLatex2,
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

// ─── Topic 1b: Binary Conversion Generator ─────────────────────────────────

const toBin = (n) => (n >>> 0).toString(2);
const binStr = (n) => `\\text{${toBin(n)}}_2`;

// Format k×2^n expression in LaTeX
const coeffPow2 = (k, n) =>
  n === 0 ? String(k) : k === 1 ? `2^{${n}}` : `${k} \\times 2^{${n}}`;

// Format a complete options string: [k1×2^n1 + k2×2^n2 + r]
const fmtBinExpr = (terms) => {
  // terms: [{k, n}] sorted high→low, last may have n=null meaning plain int
  return terms.map((t, i) => {
    const s = coeffPow2(t.k, t.n ?? 0);
    return (i === 0 || s.startsWith('-')) ? s : `+${s}`;
  }).join('');
};

// ── Type A: k * (2^a + 2^b [+ 2^c]) – repeated bit-pattern (23-31 style) ────
const genBinaryRepeatedQ = () => {
  // Pick a coefficient whose binary is a recognisable 3-4 bit pattern
  const kOptions = [
    { k: 3,  bw: 2 },  // 11
    { k: 5,  bw: 3 },  // 101
    { k: 7,  bw: 3 },  // 111
    { k: 9,  bw: 4 },  // 1001
    { k: 11, bw: 4 },  // 1011
    { k: 13, bw: 4 },  // 1101
    { k: 6,  bw: 3 },  // 110
    { k: 10, bw: 4 },  // 1010
  ];
  const { k, bw } = kOptions[randInt(0, kOptions.length - 1)];
  const gap = bw + randInt(1, 3);                    // ensure patterns don't overlap
  const num_terms = Math.random() < 0.6 ? 3 : 2;
  const offsets = [0];
  for (let i = 1; i < num_terms; i++) offsets.push(offsets[i - 1] + gap + randInt(0, 2));
  const maxOffset = offsets[offsets.length - 1];
  if (maxOffset + bw > 16) return genBinaryRepeatedQ(); // retry if too long

  const value = offsets.reduce((s, o) => s + k * Math.pow(2, o), 0);
  const binDisplay = binStr(value);

  // Correct: k×2^a + k×2^b [+ k×2^c]
  const correctTerms = [...offsets].reverse().map(o => ({ k, n: o === 0 ? null : o }));
  const correctLatex = correctTerms.map((t, i) => {
    const s = t.n !== null ? `${k} \\times 2^{${t.n}}` : String(k);
    return i === 0 ? s : `+${s}`;
  }).join('');

  // Distractors: shift all offsets by ±1 (off-by-one errors)
  const makeOpt = (delta) => {
    const terms = [...offsets].reverse().map(o => {
      const newO = o === 0 ? null : o + delta;
      return o === 0 ? String(k) : `${k} \\times 2^{${newO}}`;
    });
    return terms.map((s, i) => (i === 0 || s.startsWith('-')) ? s : `+${s}`).join('');
  };
  const w1 = makeOpt(1);
  const w2 = makeOpt(-1);
  const w3 = makeOpt(2);
  const wrongs = [w1, w2, w3].filter(w => w !== correctLatex);
  while (wrongs.length < 3) wrongs.push(makeOpt(wrongs.length + 3));

  const opts = shuffle([correctLatex, ...wrongs.slice(0, 3)]);
  return {
    questionLatex: `${binDisplay} =`,
    options: opts,
    correctIndex: opts.indexOf(correctLatex),
    explanationLines: [
      `${k}_{10} = ${toBin(k)}_2`,
      `\\text{二進制中「${toBin(k)}」圖案分別在位 ${[...offsets].reverse().join('、')} 出現}`,
      `= ${correctLatex}`,
    ],
    subtypeLabel: '二進制 → 重複圖案分解',
  };
};

// ── Type B: Binary → k×2^n + r  (SP-33 / 08-40 / 11-41 style) ──────────────
const genBinaryCoeffRemainderQ = () => {
  const highN  = randInt(7, 12);       // shift amount
  const k      = randInt(2, 15);       // coefficient for high part
  const r      = randInt(1, (1 << Math.min(highN - 1, 7)) - 1);  // remainder < 2^highN
  // Ensure k's binary doesn't interfere with r's bits
  const kBits  = Math.floor(Math.log2(k)) + 1;
  if (kBits + highN > 16) return genBinaryCoeffRemainderQ();

  const value  = k * Math.pow(2, highN) + r;
  if (value > 65535) return genBinaryCoeffRemainderQ();
  const binDisplay = binStr(value);

  const correctLatex = `${coeffPow2(k, highN)}+${r}`;
  const w1 = `${coeffPow2(k, highN + 1)}+${r}`;
  const w2 = `${coeffPow2(k, highN)}+${r * 2}`;
  const w3 = `${coeffPow2(k, highN + 1)}+${r * 2}`;
  const wrongs = [w1, w2, w3].filter(w => w !== correctLatex);
  while (wrongs.length < 3) wrongs.push(`${coeffPow2(k + 1, highN)}+${r}`);

  const opts = shuffle([correctLatex, ...wrongs.slice(0, 3)]);
  return {
    questionLatex: `${binDisplay} =`,
    options: opts,
    correctIndex: opts.indexOf(correctLatex),
    explanationLines: [
      `\\text{高位部分：} ${toBin(k)}_2 \\text{ 在位 } ${highN} = ${k} \\times 2^{${highN}}`,
      `\\text{低位部分：} ${toBin(r)}_2 = ${r}`,
      `\\therefore ${binDisplay} = ${correctLatex}`,
    ],
    subtypeLabel: '二進制 → 係數×2ⁿ + 餘數',
  };
};

// ── Type C: Powers-of-2 expression → binary  (15-33 style) ──────────────────
const genExprToBinaryQ = () => {
  const numPowers = randInt(3, 5);
  // Pick distinct powers (avoid overlap)
  const pool = Array.from({ length: 14 }, (_, i) => i + 1); // 1..14
  const powers = shuffle(pool).slice(0, numPowers).sort((a, b) => b - a);
  const addConst = Math.random() < 0.5 ? randInt(1, 5) : 0;  // optional small constant
  const value = powers.reduce((s, p) => s + Math.pow(2, p), 0) + addConst;
  if (value > 65535) return genExprToBinaryQ();

  const correctBin = toBin(value);

  // Build question expression
  const termList = powers.map(p => p === 1 ? '2' : `2^{${p}}`);
  if (addConst > 0) termList.push(String(addConst));
  const questionExpr = termList.join('+');

  // Generate wrong binaries (flip 1-2 bits)
  const makeBinWrong = (delta) => {
    const v2 = Math.max(1, value + delta);
    return toBin(v2);
  };
  const wrongValues = new Set();
  const candidates = [1, -1, 2, -2, 4, -4, 8, -8, 16, -16];
  for (const d of shuffle(candidates)) {
    const v2 = value + d;
    if (v2 > 0 && v2 !== value) wrongValues.add(v2);
    if (wrongValues.size >= 3) break;
  }
  const wrongs = [...wrongValues].map(toBin);

  const opts = shuffle([correctBin, ...wrongs.slice(0, 3)]);
  return {
    questionLatex: `${questionExpr} =`,
    options: opts.map(b => `${b}_2`),
    correctIndex: opts.indexOf(correctBin),
    explanationLines: [
      `\\text{計算值：}${value}_{10}`,
      `${value} \\div 2 \\text{ 逐步取餘：} ${correctBin}_2`,
    ],
    subtypeLabel: '冪次算式 → 二進制',
  };
};

// ── Type D: Arithmetic with coefficients → binary  (14-34 style) ─────────────
const genArithToBinaryQ = () => {
  // e.g. 7×2^10 + 2^8 + 5×2^3 - 2^3
  const base1 = randInt(8, 11);   // high power
  const k1    = randInt(2, 9);    // coefficient for high part
  const base2 = randInt(4, base1 - 2); // mid power
  const k2    = randInt(1, 4);
  const sgn   = Math.random() < 0.4 ? -1 : 1;
  const base3 = randInt(0, base2 - 1);
  const k3    = randInt(1, 4);
  const value = k1 * Math.pow(2, base1) + k2 * Math.pow(2, base2) + sgn * k3 * Math.pow(2, base3);
  if (value <= 0 || value > 65535) return genArithToBinaryQ();

  const correctBin = toBin(value);

  // Build LaTeX expression
  const t1 = coeffPow2(k1, base1);
  const t2 = coeffPow2(k2, base2);
  const t3 = coeffPow2(k3, base3);
  const questionExpr = `${t1}+${t2}${sgn > 0 ? '+' : '-'}${t3}`;

  const wrongDeltas = shuffle([1, -1, 2, -2, 4, -4, 8, 16]);
  const wrongs = [];
  for (const d of wrongDeltas) {
    const v2 = value + d;
    if (v2 > 0 && v2 !== value) { wrongs.push(toBin(v2)); }
    if (wrongs.length >= 3) break;
  }

  const opts = shuffle([correctBin, ...wrongs.slice(0, 3)]);
  return {
    questionLatex: `${questionExpr} =`,
    options: opts.map(b => `${b}_2`),
    correctIndex: opts.indexOf(correctBin),
    explanationLines: [
      `= ${k1 * Math.pow(2, base1)} + ${k2 * Math.pow(2, base2)} ${sgn > 0 ? '+' : '-'} ${k3 * Math.pow(2, base3)}`,
      `= ${value}_{10}`,
      `= ${correctBin}_2`,
    ],
    subtypeLabel: '係數算式 → 二進制',
  };
};

// Master generator for binary topic
const generateBinaryQuestion = () => {
  const gens = [
    { fn: genBinaryRepeatedQ,      w: 25 },
    { fn: genBinaryCoeffRemainderQ, w: 35 },
    { fn: genExprToBinaryQ,        w: 25 },
    { fn: genArithToBinaryQ,       w: 15 },
  ];
  const total = gens.reduce((s, g) => s + g.w, 0);
  let r = Math.random() * total;
  for (const g of gens) {
    r -= g.w;
    if (r <= 0) { try { return g.fn(); } catch (e) { /* retry */ } }
  }
  return genBinaryCoeffRemainderQ();
};

// ─── Topic 3: Variation Constants Generator ─────────────────────────────────

// Helper: format LaTeX term like x, x^{2}, \sqrt{x}
const powL = (v, p) => {
  if (p === 0) return '';
  if (p === 1) return v;
  if (p === 0.5) return `\\sqrt{${v}}`;
  return `${v}^{${p}}`;
};

// Helper: format symbolic expression coeff*varName + constVal
const fmtExpr = (coeff, varName, constVal) => {
  const parts = [];
  if (coeff === 1) parts.push(varName);
  else if (coeff === -1) parts.push(`-${varName}`);
  else if (coeff !== 0) parts.push(`${coeff}${varName}`);
  if (constVal > 0) parts.push(parts.length ? `+${constVal}` : `${constVal}`);
  else if (constVal < 0) parts.push(`${constVal}`);
  return parts.join('') || '0';
};

// Helper: format a+bi with optional symbolic parameter
const fmtComplex = (rC, rK, iC, iK, bVar) => {
  const re = fmtExpr(rC, bVar, rK);
  const im = fmtExpr(iC, bVar, iK);
  if (im === '0') return re;
  if (re === '0') return `${im} i`;
  const imSign = im.startsWith('-') ? '' : '+';
  return `${re}${imSign}${im} i`;
};

const genJointVariationQ = () => {
  const varGroups = [
    { main: 'z', v1: 'x', v2: 'y' },
    { main: 'w', v1: 'x', v2: 'y' },
    { main: 'z', v1: 'u', v2: 'v' },
    { main: 'w', v1: 'a', v2: 'b' },
    { main: 'z', v1: 'a', v2: 'b' },
  ];
  const { main, v1, v2 } = varGroups[randInt(0, varGroups.length - 1)];

  const powTypes = [
    // ── Direct k (6 types) ──────────────────────────────────────────────────
    { p1: 1, p2: 2, p1Desc: '',   p2Desc: '平方', sqrt: false, recip: false },
    { p1: 2, p2: 3, p1Desc: '平方', p2Desc: '立方', sqrt: false, recip: false },
    { p1: 1, p2: 3, p1Desc: '',   p2Desc: '立方', sqrt: false, recip: false },
    { p1: 2, p2: 1, p1Desc: '平方', p2Desc: '',   sqrt: false, recip: false },
    { p1: 3, p2: 2, p1Desc: '立方', p2Desc: '平方', sqrt: false, recip: false },
    { p1: 1, p2: 1, p1Desc: '',   p2Desc: '',     sqrt: false, recip: false },
    // ── k² variants: v1 is √ (2 types) ─────────────────────────────────────
    { p1: 0.5, p2: 2, p1Desc: '平方根', p2Desc: '平方', sqrt: true,  recip: false },
    { p1: 0.5, p2: 3, p1Desc: '平方根', p2Desc: '立方', sqrt: true,  recip: false },
    // ── 1/k variants: answer is reciprocal expression (4 types) ─────────────
    { p1: 1, p2: 2, p1Desc: '',   p2Desc: '平方', sqrt: false, recip: true },
    { p1: 2, p2: 1, p1Desc: '平方', p2Desc: '',   sqrt: false, recip: true },
    { p1: 3, p2: 2, p1Desc: '立方', p2Desc: '平方', sqrt: false, recip: true },
    { p1: 1, p2: 3, p1Desc: '',   p2Desc: '立方', sqrt: false, recip: true },
  ];
  const { p1, p2, p1Desc, p2Desc, sqrt: isSqrt, recip: isRecip } = powTypes[randInt(0, powTypes.length - 1)];

  const v1Desc = p1Desc ? `${v1}的${p1Desc}` : v1;
  const v2Desc = p2Desc ? `${v2}的${p2Desc}` : v2;
  const qLatex = `\\text{若 } ${main} \\text{ 隨 } ${v1Desc} \\text{ 正變且隨 } ${v2Desc} \\text{ 反變，下列何者必為常數？}`;

  // relationship: main = k * v1^p1 / v2^p2
  // constant forms:
  //   direct:  main * v2^p2 / v1^p1 = k
  //   isSqrt:  main^2 * v2^(2p2) / v1 = k²  (avoid √ in displayed answers)
  //   isRecip: v1^p1 / (main * v2^p2) = 1/k  (also a constant)
  let correctLatex, hintLine;
  if (isSqrt) {
    const numStr = `${powL(main, 2)}${powL(v2, 2 * p2)}`;
    const denStr = v1;
    correctLatex = `\\frac{${numStr}}{${denStr}}`;
    hintLine = `${main}=\\frac{k\\sqrt{${v1}}}{${powL(v2,p2)}} \\\\ \\frac{${numStr}}{${denStr}}=k^2=\\text{常數}`;
  } else if (isRecip) {
    const numStr = powL(v1, p1) || '1';
    const denStr = [main, powL(v2, p2)].filter(Boolean).join('');
    correctLatex = `\\frac{${numStr}}{${denStr}}`;
    hintLine = `${main}=\\frac{k${powL(v1,p1)}}{${powL(v2,p2)}} \\\\ \\frac{${numStr}}{${denStr}}=\\frac{1}{k}=\\text{常數}`;
  } else {
    const numParts = [main, powL(v2, p2)].filter(Boolean);
    const numStr = numParts.join('');
    const denStr = powL(v1, p1) || '1';
    correctLatex = denStr === '1' ? numStr : `\\frac{${numStr}}{${denStr}}`;
    hintLine = `${main}=\\frac{k${powL(v1,p1)}}{${powL(v2,p2)}} \\\\ \\frac{${numStr}}{${denStr}}=k=\\text{常數}`;
  }

  // Wrong options: clearly non-constant by using wrong variable arrangement
  const v1p = isSqrt ? v1 : powL(v1, p1);
  const v2p = isSqrt ? powL(v2, 2 * p2) : powL(v2, p2);
  const mainSq = powL(main, 2);

  const wrongCandidates = [
    `\\frac{${main}${v1p}}{${v2p}}`,
    `\\frac{${v1p}}{${main}${v2p}}`,
    `\\frac{${mainSq}${v1p}}{${v2p}}`,
    `${main}${v1p}${v2p}`,
    `\\frac{${v2p}}{${main}${v1p}}`,
  ];

  const uniqueWrongs = [...new Set(wrongCandidates)]
    .filter(w => w !== correctLatex)
    .slice(0, 3);
  while (uniqueWrongs.length < 3) uniqueWrongs.push(`\\frac{${main}^{${uniqueWrongs.length+2}}}{${v1p}${v2p}}`);

  const opts = shuffle([correctLatex, ...uniqueWrongs.slice(0, 3)]);

  // Build explanation using \begin{array}{l} so headers are truly flush left
  const df = (n, d) => `\\dfrac{${n}}{${d}}`;
  let explanationAligned;
  if (isSqrt) {
    const sqrtKNum = `${main}${powL(v2,p2)}`;
    explanationAligned = [
      `\\displaystyle\\begin{array}{l}`,
      `\\text{先嘗試找 } k \\\\[6pt]`,
      `\\quad ${main} = ${df(`k\\sqrt{${v1}}`, powL(v2,p2))} \\\\[10pt]`,
      `\\quad ${df(sqrtKNum, `\\sqrt{${v1}}`)} = k \\quad\\text{（此式含 }\\sqrt{\\,}\\text{，不在選項中）} \\\\[14pt]`,
      `\\text{改為嘗試找 } k^2 \\\\[6pt]`,
      `\\quad ${correctLatex} = k^2 \\quad\\checkmark\\text{（此式在選項中）} \\\\[14pt]`,
      `\\therefore \\text{答案為 } ${correctLatex}`,
      `\\end{array}`,
    ].join('\n');
  } else if (isRecip) {
    const recipNumStr = powL(v1, p1) || '1';
    const recipDenStr = [main, powL(v2, p2)].filter(Boolean).join('');
    explanationAligned = [
      `\\displaystyle\\begin{array}{l}`,
      `\\text{嘗試找 } \\dfrac{1}{k} \\\\[6pt]`,
      `\\quad ${main} = ${df(`k${powL(v1,p1)}`, powL(v2,p2))} \\\\[10pt]`,
      `\\quad ${df(recipNumStr, recipDenStr)} = \\dfrac{1}{k} \\quad\\checkmark\\text{（此式在選項中）} \\\\[14pt]`,
      `\\therefore \\text{答案為 } ${correctLatex}`,
      `\\end{array}`,
    ].join('\n');
  } else {
    const numParts = [main, powL(v2, p2)].filter(Boolean).join('');
    const denStr = powL(v1, p1) || '1';
    explanationAligned = [
      `\\displaystyle\\begin{array}{l}`,
      `\\text{先嘗試找 } k \\\\[6pt]`,
      `\\quad ${main} = ${df(`k${powL(v1,p1)}`, powL(v2,p2))} \\\\[10pt]`,
      `\\quad ${correctLatex} = k \\quad\\checkmark\\text{（此式在選項中）} \\\\[14pt]`,
      `\\therefore \\text{答案為 } ${correctLatex}`,
      `\\end{array}`,
    ].join('\n');
  }

  return {
    questionLatex: qLatex,
    options: opts,
    correctIndex: opts.indexOf(correctLatex),
    explanationAligned,
    variationQ: true,
    subtypeLabel: '變分常數',
  };
};

const generateVariationQuestion = () => genJointVariationQ();

// ─── Topic 4: Complex Numbers Generator ──────────────────────────────────────

// i powers: i^0=1, i^1=i, i^2=-1, i^3=-i  (period 4)
const iCycle = (n) => {
  const k = ((n % 4) + 4) % 4;
  return [{ re: 1, im: 0 }, { re: 0, im: 1 }, { re: -1, im: 0 }, { re: 0, im: -1 }][k];
};
const iCycleStr = (n) => ['1', 'i', '-1', '-i'][((n % 4) + 4) % 4];

// Type A: weighted sum c1*i^n + c2*i^(n+1) + ... find real part
const genIWeightedSumQ = () => {
  const startN = randInt(1, 8);
  let realSum = 0, imSum = 0;
  const terms = [];
  const expLines = [];
  for (let j = 0; j < 4; j++) {
    const n = startN + j;
    const coeff = j + 1;
    const p = iCycle(n);
    realSum += coeff * p.re;
    imSum += coeff * p.im;
    const pL = n === 1 ? 'i' : `i^{${n}}`;
    terms.push(`${coeff}${pL}`);
    const rv = coeff * p.re, iv = coeff * p.im;
    const vStr = (rv === 0 && iv === 0) ? '0' :
      (rv !== 0 ? String(rv) : '') +
      (iv > 0 && rv !== 0 ? `+${iv}i` : iv < 0 ? `${iv}i` : iv !== 0 ? `${iv}i` : '');
    expLines.push(`${coeff} \\cdot i^{${n}} = ${coeff}(${iCycleStr(n)}) = ${vStr || '0'}`);
  }
  const questionLatex = `${terms.join('+')} \\text{ 的實部為}`;
  const correct = String(realSum);
  const candidates = [...new Set([realSum + 2, realSum - 2, imSum, -realSum, realSum + 4].map(String))]
    .filter(w => w !== correct);
  while (candidates.length < 3) candidates.push(String(realSum + candidates.length * 3 + 1));
  const wrongs = candidates.slice(0, 3);
  const opts = shuffle([correct, ...wrongs]);
  return {
    questionLatex,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `i^1=i,\ i^2=-1,\ i^3=-i,\ i^4=1 \\text{（週期為4）}`,
      ...expLines,
      `\\text{實部} = ${realSum}`,
    ],
    subtypeLabel: '複數 i — 冪次加權實部',
  };
};

// Type B: i^n(βi ± c)  simplify, options in a+bi form with symbolic β
const genIExprSymQ = () => {
  const n = randInt(2, 7);
  const sgn = Math.random() < 0.5 ? 1 : -1;
  const c = randInt(1, 5);
  const p = iCycle(n);
  // (p.re + p.im*i)(β*i + sgn*c)
  // = p.re*(βi + sgn*c) + p.im*i*(βi + sgn*c)
  // = p.re*βi + p.re*sgn*c - p.im*β + p.im*sgn*c*i
  // Re: -p.im*β + p.re*sgn*c
  // Im:  p.re*β + p.im*sgn*c
  const rBeta = -p.im, rConst = p.re * sgn * c;
  const iBeta =  p.re, iConst = p.im * sgn * c;
  const bVar = '\\beta';
  const correct = fmtComplex(rBeta, rConst, iBeta, iConst, bVar);
  const w1 = fmtComplex(-rBeta, rConst,  iBeta, iConst, bVar);
  const w2 = fmtComplex( rBeta, rConst, -iBeta, iConst, bVar);
  const w3 = fmtComplex(-rBeta, rConst, -iBeta, iConst, bVar);
  const wrongs = [...new Set([w1, w2, w3])].filter(w => w !== correct).slice(0, 3);
  while (wrongs.length < 3) wrongs.push(fmtComplex(rBeta + wrongs.length, rConst, iBeta, iConst, bVar));
  const cStr = (sgn > 0 ? `+${c}` : `-${c}`);
  const opts = shuffle([correct, ...wrongs.slice(0, 3)]);
  return {
    questionLatex: `i^{${n}}(\\beta i${cStr}) =`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `i^{${n}} = ${iCycleStr(n)}`,
      `(${iCycleStr(n)})(\\beta i${cStr}) = \\beta \\cdot i^{${n+1}} ${sgn>0?'+':'-'}${c} \\cdot i^{${n}}`,
      `= \\beta(${iCycleStr(n+1)}) ${sgn>0?'+':'-'}${c}(${iCycleStr(n)})`,
      `= ${correct}`,
    ],
    subtypeLabel: '複數 i — 含參數化簡',
  };
};

// Type C: (x + ni)(m + i) find real part, x is real parameter
const genComplexMulRealQ = () => {
  const n = randInt(1, 5);
  const m = randInt(1, 5);
  const pVar = ['x', 'k', 'a'][randInt(0, 2)];
  // (pVar + ni)(m + i) = m*pVar + pVar*i + nm*i + n*i^2
  // = (m*pVar - n) + (pVar + nm)*i   → real part = m*pVar - n
  const mS = m > 1 ? `${m}` : '';
  const correct = `${mS}${pVar}-${n}`;
  const w1 = `${mS}${pVar}+${n}`;
  const w2 = n > 1 ? `${n}${pVar}-${m}` : `${pVar}-${m}`;
  const w3 = `${m + n}${pVar}`;
  const wrongs = [w1, w2, w3].filter(w => w !== correct).slice(0, 3);
  const opts = shuffle([correct, ...wrongs]);
  return {
    questionLatex: `\\text{若 }${pVar}\\text{ 為實數，則 }(${pVar}+${n}i)(${m}+i)\\text{ 的實部為}`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `(${pVar}+${n}i)(${m}+i) = ${m}${pVar}+${pVar}i+${n*m}i+${n}i^2`,
      `= ${m}${pVar}+${pVar}i+${n*m}i-${n}`,
      `= (${mS}${pVar}-${n})+(${pVar}+${n*m})i`,
      `\\text{實部} = ${mS}${pVar}-${n}`,
    ],
    subtypeLabel: '複數 i — 乘積實部',
  };
};

// Type D: ak - (b + ki)/i  = ?  (k is real)
const genDivideByIQ = () => {
  const a = randInt(2, 6);
  const b = randInt(1, 5);
  // ak - (b+ki)/i  where 1/i = -i
  // (b+ki)/i = (b+ki)(-i)/1 = -bi - ki^2 = k - bi
  // ak - (k - bi) = (a-1)k + bi
  const realCoeff = a - 1;
  const imConst = b;
  const correct = `${realCoeff}k+${imConst}i`;
  const w1 = `${realCoeff}k-${imConst}i`;
  const w2 = `${a + 1}k+${imConst}i`;
  const w3 = `${realCoeff + 2}k+${imConst}i`;
  const wrongs = [w1, w2, w3].filter(w => w !== correct).slice(0, 3);
  const opts = shuffle([correct, ...wrongs]);
  return {
    questionLatex: `\\text{若 }k\\text{ 為實數，則 }${a}k-\\frac{${b}+ki}{i}=`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `\\frac{1}{i} = \\frac{-i}{i \\cdot (-i)} = \\frac{-i}{1} = -i`,
      `\\frac{${b}+ki}{i} = (${b}+ki)(-i) = -${b}i-ki^2 = k-${b}i`,
      `${a}k-(k-${b}i) = ${realCoeff}k+${imConst}i`,
    ],
    subtypeLabel: '複數 i — 化簡含 i 分式',
  };
};

// Type E: sum of consecutive powers i^m + ... + i^n
const genIPowerRangeQ = () => {
  const start = randInt(7, 15);
  const end = randInt(start + 7, start + 16);
  let re = 0, im = 0;
  for (let n = start; n <= end; n++) {
    const p = iCycle(n);
    re += p.re; im += p.im;
  }
  const count = end - start + 1;
  const resultStr = (() => {
    if (re === 0 && im === 0) return '0';
    if (im === 0) return String(re);
    if (re === 0) return im === 1 ? 'i' : im === -1 ? '-i' : `${im}i`;
    return `${re}${im > 0 ? '+' : ''}${im === 1 ? '' : im === -1 ? '-' : im}i`;
  })();
  const correct = resultStr;
  const pool = ['0', 'i', '-i', '1', '-1', '1+i', '-1+i', '1-i', '-1-i'].filter(w => w !== correct);
  const wrongs = shuffle(pool).slice(0, 3);
  const opts = shuffle([correct, ...wrongs]);
  const rem = count % 4;
  return {
    questionLatex: `i^{${start}}+i^{${start+1}}+\\cdots+i^{${end}}=`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `i^1+i^2+i^3+i^4=0\\text{（每4項和為 0）}`,
      `\\text{共 }${count}\\text{ 項，}${count}=${Math.floor(count/4)}\\times4+${rem}`,
      rem === 0
        ? `\\text{整除4，故和為 0}` 
        : `\\text{餘 }${rem}\\text{ 項，從 }i^{${start + Math.floor(count/4)*4}}\\text{ 計}`,
      `\\therefore \\text{答案} = ${correct}`,
    ],
    subtypeLabel: '複數 i — 連續冪次之和',
  };
};

// Type F: (β² + c²)/(β + ci) rationalize, β real
const genRationalizeFracQ = () => {
  const c = randInt(1, 4);
  const cSq = c * c;
  const bVar = ['\\beta', '\\alpha', 'k'][randInt(0, 2)];
  // (β²+c²)/(β+ci) · (β-ci)/(β-ci) = (β+ci)(β-ci)·... wait
  // = (β²+c²)(β-ci)/((β)²+(c)²) = β - ci
  const correct = `${bVar}-${c}i`;
  const w1 = `${bVar}+${c}i`;
  const w2 = `${c}-${bVar} i`;
  const w3 = `${c}+${bVar} i`;
  const wrongs = [w1, w2, w3].filter(w => w !== correct).slice(0, 3);
  const opts = shuffle([correct, ...wrongs]);
  return {
    questionLatex: `\\text{若 }${bVar}\\text{ 為實數，則 }\\frac{${bVar}^2+${cSq}}{${bVar}+${c}i}=`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `\\frac{${bVar}^2+${cSq}}{${bVar}+${c}i} \\cdot \\frac{${bVar}-${c}i}{${bVar}-${c}i}`,
      `=\\frac{(${bVar}^2+${cSq})(${bVar}-${c}i)}{${bVar}^2+${cSq}}`,
      `=${bVar}-${c}i`,
    ],
    subtypeLabel: '複數 i — 有理化分式',
  };
};

// Type G: z = (a+p)i^n + (a+q)i^(n+1), find a such that z is real
const genMakeRealQ = () => {
  const n1 = randInt(4, 9);
  const p = randInt(2, 6);
  const q = randInt(-5, -1);
  const r1 = iCycle(n1), r2 = iCycle(n1 + 1);
  // Im part = (a+p)*r1.im + (a+q)*r2.im = 0
  const coefA = r1.im + r2.im;
  if (coefA === 0) return genMakeRealQ();
  const rhs = -(p * r1.im + q * r2.im);
  if (rhs % coefA !== 0) return genMakeRealQ();
  const aVal = rhs / coefA;
  if (Math.abs(aVal) > 8) return genMakeRealQ();
  const correct = String(aVal);
  const wrongs = [...new Set([-aVal, aVal + 2, aVal - 2, aVal + 3].map(String))]
    .filter(w => w !== correct).slice(0, 3);
  const pS = p >= 0 ? `+${p}` : `${p}`;
  const qS = q >= 0 ? `+${q}` : `${q}`;
  const opts = shuffle([correct, ...wrongs]);
  return {
    questionLatex: `\\text{設 }z=(a${pS})i^{${n1}}+(a${qS})i^{${n1+1}}\\text{，其中 }a\\text{ 為實數。若 }z\\text{ 為實數，則 }a=`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `i^{${n1}}=${iCycleStr(n1)},\\quad i^{${n1+1}}=${iCycleStr(n1+1)}`,
      `z=(a${pS})(${iCycleStr(n1)})+(a${qS})(${iCycleStr(n1+1)})`,
      `\\text{令虛部}=0:\\;${coefA}a+${p*r1.im+q*r2.im}=0`,
      `a=${aVal}`,
    ],
    subtypeLabel: '複數 i — 令式子為實數',
  };
};

// Type H: find k such that expr/(k-i) + c/(k+i) real part = ?
const genSumFracRealQ = () => {
  const a1 = randInt(1, 3);
  const a2 = randInt(1, 3);
  // a1*i/(k-i) + a2/(k+i)
  // common denom (k-i)(k+i) = k²+1
  // numerator = a1*i*(k+i) + a2*(k-i)
  //           = a1*(ki+i²) + a2*(k-i)
  //           = a1*ki - a1 + a2*k - a2*i
  //           = (a2*k - a1) + (a1*k - a2)*i
  // Re = (a2*k - a1)/(k²+1)
  const correct = `\\frac{${a2}k-${a1}}{k^2+1}`;
  const w1 = `\\frac{${a2}k+${a1}}{k^2+1}`;
  const w2 = `\\frac{${a1}k-${a2}}{k^2+1}`;
  const w3 = `\\frac{${a2}k-${a1}}{k^2-1}`;
  const wrongs = [w1, w2, w3].filter(w => w !== correct).slice(0, 3);
  const a1Str = a1 > 1 ? `${a1}` : '';
  const opts = shuffle([correct, ...wrongs]);
  return {
    questionLatex: `\\text{若 }k\\text{ 為實數，則 }\\frac{${a1Str}i}{k-i}+\\frac{${a2}}{k+i}\\text{ 的實部為}`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `\\text{通分：分母}=(k-i)(k+i)=k^2+1`,
      `\\text{分子}=${a1}i(k+i)+${a2}(k-i)=${a1}ki+${a1}i^2+${a2}k-${a2}i`,
      `=(${a2}k-${a1})+(${a1}k-${a2})i`,
      `\\text{實部}=\\frac{${a2}k-${a1}}{k^2+1}`,
    ],
    subtypeLabel: '複數 i — 分式之和實部',
  };
};

// Master generator for complex topic
const generateComplexQuestion = () => {
  const gens = [
    { fn: genIWeightedSumQ, w: 20 },
    { fn: genIExprSymQ,     w: 20 },
    { fn: genComplexMulRealQ, w: 15 },
    { fn: genDivideByIQ,    w: 15 },
    { fn: genIPowerRangeQ,  w: 15 },
    { fn: genMakeRealQ,     w: 10 },
    { fn: genRationalizeFracQ, w: 10 },
    { fn: genSumFracRealQ,  w: 10 },
  ];
  const total = gens.reduce((s, g) => s + g.w, 0);
  let r = Math.random() * total;
  for (const g of gens) {
    r -= g.w;
    if (r <= 0) { try { return g.fn(); } catch (e) { /* retry */ } }
  }
  return genIWeightedSumQ();
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

      {/* 一、定義 */}
      <section className="bg-blue-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-blue-800 mb-3">一、要點</h2>
        <div className="space-y-3">
          <div className="bg-blue-100 rounded-lg p-4 flex items-start gap-3">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shrink-0">H.C.F.</span>
            <div>
              <p className="font-bold text-blue-800">最高公因式</p>
              <p className="text-sm mt-1">每個變量取<strong>最小次方</strong>（所有式子都有的部分）</p>
            </div>
          </div>
          <div className="bg-indigo-100 rounded-lg p-4 flex items-start gap-3">
            <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shrink-0">L.C.M.</span>
            <div>
              <p className="font-bold text-indigo-800">最低公倍式</p>
              <p className="text-sm mt-1">每個變量取<strong>最大次方</strong>（所有式子出現過的最高次）</p>
            </div>
          </div>
        </div>
      </section>

      {/* 二、單項式 */}
      <section className="bg-green-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-green-800 mb-3">二、單項式的 H.C.F. 及 L.C.M.</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-semibold text-green-700 mb-1">步驟：</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>係數另外計算：H.C.F. 係數 = 各係數的公因數，L.C.M. 係數 = 各係數的公倍數</li>
            <li>每個字母分一行，每行列出各式的次方，再取最小（H.C.F.）或最大（L.C.M.）次方</li>
          </ol>
        </div>

        {/* HCF Example */}
        <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
          <p className="font-semibold mb-3">例題 1：求 <InlineMath math="3x^4y^2z" />、<InlineMath math="4xy^5z" />、<InlineMath math="6x^2y^3" /> 的 H.C.F.</p>
          <p className="text-sm mb-2 text-green-700">係數：3、4、6 的公因數 = <strong>1</strong></p>
          <p className="text-sm mb-3 text-green-700">各字母分行比較（取<strong>最小</strong>次方）：</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <span className="font-bold text-blue-700 w-5">x</span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="x^4" /></span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="x^1" /></span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="x^2" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-blue-700">最小次方：<InlineMath math="x^1 = x" /></span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-lg px-3 py-2">
              <span className="font-bold text-green-700 w-5">y</span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="y^2" /></span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="y^5" /></span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="y^3" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-green-700">最小次方：<InlineMath math="y^2" /></span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
              <span className="font-bold text-amber-700 w-5">z</span>
              <span className="bg-amber-100 text-amber-800 rounded px-2 py-0.5 font-mono"><InlineMath math="z^1" /></span>
              <span className="bg-amber-100 text-amber-800 rounded px-2 py-0.5 font-mono"><InlineMath math="z^1" /></span>
              <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 font-mono text-xs">沒有</span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-amber-700">最小次方：<InlineMath math="z^0" />（不含 z）</span>
            </div>
          </div>
          <p className="text-xs text-amber-700 mt-2">⚠️ <InlineMath math="6x^2y^3" /> 沒有 z，視作 <InlineMath math="z^0" />，故 z 不出現在 H.C.F. 中</p>
          <BlockMath math="\therefore \text{H.C.F.} = xy^2" />
        </div>

        {/* LCM Example */}
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
          <p className="font-semibold mb-3">例題 2：求 <InlineMath math="9a^2b" />、<InlineMath math="12a^4b^3" />、<InlineMath math="15a^6" /> 的 L.C.M.</p>
          <p className="text-sm mb-2 text-indigo-700">係數：9、12、15 的公倍數 = <strong>180</strong></p>
          <p className="text-sm mb-3 text-indigo-700">各字母分行比較（取<strong>最大</strong>次方）：</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <span className="font-bold text-blue-700 w-5">a</span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="a^2" /></span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="a^4" /></span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="a^6" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-blue-700">最大次方：<InlineMath math="a^6" /></span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-lg px-3 py-2">
              <span className="font-bold text-green-700 w-5">b</span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="b^1" /></span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="b^3" /></span>
              <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 font-mono text-xs">沒有</span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-green-700">最大次方：<InlineMath math="b^3" /></span>
            </div>
          </div>
          <p className="text-xs text-green-700 mt-2">⚠️ <InlineMath math="15a^6" /> 沒有 b，但 L.C.M. 取最大次方，b 仍需包含</p>
          <BlockMath math="\therefore \text{L.C.M.} = 180a^6b^3" />
        </div>
      </section>

      {/* 三、多項式 */}
      <section className="bg-purple-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-800 mb-3">三、多項式的 H.C.F. 及 L.C.M.</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-semibold text-purple-700 mb-1">步驟：</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>先<strong>因式分解</strong>每個多項式，寫成各因式之積</li>
            <li>每個因式分行比較次方，再取最小（H.C.F.）或最大（L.C.M.）次方</li>
          </ol>
        </div>

        <div className="bg-purple-100 rounded-lg p-4 mb-4">
          <p className="font-semibold mb-2">例題 3：求 <InlineMath math="p^2+4p+4" /> 及 <InlineMath math="p^2-4" /> 的 L.C.M.</p>
          <BlockMath math="p^2+4p+4 = (p+2)^2" />
          <BlockMath math="p^2-4 = (p+2)(p-2)" />
          <div className="space-y-2 text-sm mt-2">
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <span className="font-bold text-blue-700 w-16 text-xs">(p+2)</span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(p+2)^2" /></span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(p+2)^1" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-blue-700">最大：<InlineMath math="(p+2)^2" /></span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-lg px-3 py-2">
              <span className="font-bold text-green-700 w-16 text-xs">(p−2)</span>
              <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 font-mono text-xs">沒有</span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(p-2)^1" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-green-700">最大：<InlineMath math="(p-2)^1" /></span>
            </div>
          </div>
          <BlockMath math="\therefore \text{L.C.M.} = (p+2)^2(p-2)" />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="font-semibold mb-2">例題 4：求 <InlineMath math="x^2(x+1)(x+2)" /> 及 <InlineMath math="x(x+1)^3" /> 的 H.C.F.</p>
          <div className="space-y-2 text-sm mt-2">
            <div className="flex items-center gap-2 bg-blue-100 rounded-lg px-3 py-2">
              <span className="font-bold text-blue-700 w-8 text-xs">x</span>
              <span className="bg-blue-200 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="x^2" /></span>
              <span className="bg-blue-200 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="x^1" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-blue-700">最小：<InlineMath math="x^1" /></span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-lg px-3 py-2">
              <span className="font-bold text-green-700 w-8 text-xs">(x+1)</span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(x+1)^1" /></span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(x+1)^3" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-green-700">最小：<InlineMath math="(x+1)^1" /></span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
              <span className="font-bold text-amber-700 w-8 text-xs">(x+2)</span>
              <span className="bg-amber-100 text-amber-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(x+2)^1" /></span>
              <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 font-mono text-xs">沒有</span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-amber-700">最小：<InlineMath math="(x+2)^0" />（不含）</span>
            </div>
          </div>
          <BlockMath math="\therefore \text{H.C.F.} = x(x+1)" />
        </div>
      </section>

      {/* 四、求第三式 */}
      <section className="bg-orange-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-orange-800 mb-3">四、已知 H.C.F.、L.C.M. 及兩個式，求第三個式</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-semibold text-orange-700 mb-2">方法（針對每個變量分行考慮）：</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>若兩個已知式的次方都<strong>高於</strong> H.C.F. → 第三式需補足 H.C.F. 的次方</li>
            <li>若兩個已知式的次方都<strong>低於</strong> L.C.M. → 第三式需補足 L.C.M. 的次方</li>
          </ul>
        </div>

        <div className="bg-orange-100 rounded-lg p-4">
          <p className="font-semibold mb-3">例題 5：H.C.F. = <InlineMath math="x^2y^2z" />，L.C.M. = <InlineMath math="x^3y^4z^5" />，第一式 = <InlineMath math="x^3y^2z^2" />，第二式 = <InlineMath math="x^2y^3z^5" />，求第三式</p>

          <div className="space-y-2 text-sm">
            {/* x row */}
            <div className="bg-blue-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-blue-700 w-5">x</span>
                <span className="text-xs text-slate-500">H.C.F.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="x^2" /></span>
                <span className="text-xs text-slate-500">L.C.M.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="x^3" /></span>
                <span className="text-xs text-slate-500">式1:</span><span className="bg-blue-200 rounded px-1"><InlineMath math="x^3" /></span>
                <span className="text-xs text-slate-500">式2:</span><span className="bg-blue-200 rounded px-1"><InlineMath math="x^2" /></span>
              </div>
              <p className="text-xs mt-1 text-blue-700">式1有 x³，式2有 x²，已涵蓋 H.C.F.(x²) 和 L.C.M.(x³) → 第三式 x 次方自由（取 x² 或 x³ 均可）</p>
            </div>
            {/* y row */}
            <div className="bg-green-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-green-700 w-5">y</span>
                <span className="text-xs text-slate-500">H.C.F.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="y^2" /></span>
                <span className="text-xs text-slate-500">L.C.M.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="y^4" /></span>
                <span className="text-xs text-slate-500">式1:</span><span className="bg-green-200 rounded px-1"><InlineMath math="y^2" /></span>
                <span className="text-xs text-slate-500">式2:</span><span className="bg-green-200 rounded px-1"><InlineMath math="y^3" /></span>
              </div>
              <p className="text-xs mt-1 text-green-700">式1和式2的最大次方是 y³，未達到 L.C.M. 的 y⁴ → 第三式必須有 <strong>y⁴</strong></p>
            </div>
            {/* z row */}
            <div className="bg-amber-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-amber-700 w-5">z</span>
                <span className="text-xs text-slate-500">H.C.F.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="z^1" /></span>
                <span className="text-xs text-slate-500">L.C.M.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="z^5" /></span>
                <span className="text-xs text-slate-500">式1:</span><span className="bg-amber-200 rounded px-1"><InlineMath math="z^2" /></span>
                <span className="text-xs text-slate-500">式2:</span><span className="bg-amber-200 rounded px-1"><InlineMath math="z^5" /></span>
              </div>
              <p className="text-xs mt-1 text-amber-700">式1和式2的最小次方是 z²，高於 H.C.F. 的 z¹ → 第三式必須有 <strong>z¹</strong></p>
            </div>
          </div>
          <BlockMath math="\therefore \text{第三式} = x^2y^4z \text{（由選項確認 x 取 } x^2\text{）}" />
        </div>
      </section>

      {/* 五、常用恆等式 */}
      <section className="bg-yellow-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-yellow-800 mb-3">五、常用因式分解恆等式</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ['a^2-b^2=(a+b)(a-b)', '平方差'],
            ['a^2+2ab+b^2=(a+b)^2', '完全平方和'],
            ['a^2-2ab+b^2=(a-b)^2', '完全平方差'],
          ].map(([formula, name]) => (
            <div key={name} className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3">
              <span className="text-yellow-600 font-bold text-sm w-16 shrink-0">{name}</span>
              <InlineMath math={formula} />
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

// ─── Notes Component for Binary Conversion ──────────────────────────────────
const BinaryNotes = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
      <ArrowLeft className="w-5 h-5" /> 返回
    </button>
    <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-teal-400 pb-3">
      📘 筆記：二進制轉換
    </h1>
    <div className="space-y-8 text-slate-700">

      {/* Section 1: Bit positions */}
      <section className="bg-teal-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-teal-800 mb-3">一、數位概念</h2>
        <div className="space-y-4">
          <div className="bg-teal-100 rounded-lg p-4">
            <p className="font-semibold mb-2">⚠️ 數位置的方法（重要！）</p>
            <p className="text-sm mb-3">從<strong>右至左</strong>，最右邊為第 0 位，向左依次為第 1, 2, 3, … 位。</p>
            <div className="overflow-x-auto">
              <table className="text-sm text-center border-collapse w-full">
                <thead>
                  <tr className="bg-teal-200">
                    <th className="border border-teal-300 px-3 py-1">二進制數</th>
                    {[11,10,9,8,7,6,5,4,3,2,1,0].map(p => (
                      <th key={p} className="border border-teal-300 px-2 py-1 text-xs">位 {p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-teal-300 px-3 py-1 font-mono font-bold">110001001011</td>
                    {[1,1,0,0,0,1,0,0,1,0,1,1].map((b, i) => (
                      <td key={i} className={`border border-teal-300 px-2 py-1 font-mono font-bold ${b===1 ? 'text-teal-700' : 'text-slate-400'}`}>{b}</td>
                    ))}
                  </tr>
                  <tr className="bg-teal-50">
                    <td className="border border-teal-300 px-3 py-1 text-xs">對應冪次</td>
                    {[11,10,9,8,7,6,5,4,3,2,1,0].map(p => (
                      <td key={p} className="border border-teal-300 px-2 py-1 text-xs"><InlineMath math={`2^{${p}}`} /></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-3 text-teal-800">
              例：<InlineMath math="11+2^6+2^{10}+2^{11}" /> → 先用計算機得十進制值，再轉二進制。
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: CASIO BASE MODE */}
      <section className="bg-purple-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-800 mb-3">二、CASIO fx-50FHII — 計算機 Mode 3</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-bold text-purple-700 mb-3">📱 進入 BASE 模式</p>
          <div className="flex items-center flex-wrap gap-2 text-sm bg-purple-50 rounded p-3">
            <span className="bg-gray-800 text-white text-xs font-mono px-2 py-1 rounded">MODE</span>
            <span>→</span>
            <span className="bg-gray-800 text-white text-xs font-mono px-2 py-1 rounded">3</span>
            <span className="text-gray-500">（進入 BASE 模式，預設 <span className="text-green-600 font-bold">DEC</span> 十進制）</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-bold text-purple-700 mb-3">🔄 二進制 ↔ 十進制 轉換</p>
          <div className="space-y-4">

            <div className="border-l-4 border-blue-400 pl-4 space-y-2">
              <p className="font-semibold text-blue-700">二進制 → 十進制</p>
              <ol className="list-decimal pl-4 space-y-1 text-sm">
                <li>在 BASE 模式（<span className="text-green-600 font-bold">DEC</span> 狀態）下，按
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                    <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                  </span>
                  切換到 <strong><span className="text-green-600">BIN</span> 二進制輸入</strong>
                </li>
                <li>輸入二進制數字（只能輸入 0 和 1）</li>
                <li>按
                  <span className="mx-1 bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                  確認
                </li>
                <li className="pt-3">按
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                    <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                  </span>
                  → 顯示十進制結果
                </li>
              </ol>
              <div className="bg-blue-50 rounded px-3 pb-3 pt-2 text-sm">
                <div className="font-sans text-blue-700 mb-2 text-xs">題目：想將 <InlineMath math="1100_2" /> 變成十進數</div>
                <div className="font-mono flex flex-wrap items-center gap-1 pt-4">
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                    <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                  </span>
                  <span>→ 輸入 <strong>1100</strong> →</span>
                  <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                  <span>→</span>
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                    <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                  </span>
                  <span>→ 顯示 <strong className="text-blue-700">12</strong>（十進數為 12）</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-400 pl-4 space-y-2">
              <p className="font-semibold text-green-700">算式 / 十進制 → 二進制</p>
              <ol className="list-decimal pl-4 space-y-1 text-sm">
                <li>先在 COMP 模式（MODE 1）計算算式的十進制值</li>
                <li>記下數值，進入 BASE 模式（MODE 3）</li>
                <li>在 <span className="text-green-600 font-bold">DEC</span> 狀態下輸入十進制數 → 按
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                    <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                  </span>
                  切換到 <span className="text-green-600 font-bold">BIN</span> → 按
                  <span className="mx-1 bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                  → 顯示二進制
                </li>
              </ol>
              <div className="bg-green-50 rounded p-2 text-sm font-mono">
                例：COMP 算得 <InlineMath math="11+2^6+2^{10}+2^{11}=3147" /> → BASE MODE → 輸入 3147 → <span className="text-green-600 font-bold">BIN</span> → 得二進制
              </div>
            </div>

          </div>
        </div>

        <div className="bg-purple-100 rounded-lg p-4 mb-4">
          <p className="font-bold text-purple-700 mb-2">⚠️ 注意事項</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><span className="text-green-600 font-bold">BIN</span> 模式只能輸入 0 和 1</li>
            <li>若二進制數太長（超過計算機顯示位數）會顯示不了，需要拆開不同組件計算去推斷答案。</li>
            <li>計其他數要離開 BASE 模式：<span className="bg-gray-800 text-white text-xs font-mono px-1 py-0.5 rounded">MODE</span> → <span className="bg-gray-800 text-white text-xs font-mono px-1 py-0.5 rounded">1</span>（回 COMP）</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="font-bold text-purple-700 mb-3">📝 實戰例題</p>
          <div className="space-y-4 text-sm">
            <div className="border border-slate-200 rounded-lg p-3">
              <p className="font-semibold mb-1">題目：求 <InlineMath math="11+2^6+2^{10}+2^{11}" /> 的二進制（如圖例題）</p>
              <p>① 在 COMP 模式計算十進制：<InlineMath math="11+64+1024+2048=3147" /></p>
              <p>② MODE 3 → <span className="text-green-600 font-bold">DEC</span> 輸入 3147 → 按 log（<span className="text-green-600 font-bold">BIN</span>）→ <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> → 得 <InlineMath math="110001001011_2" /></p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3">
              <p className="font-semibold mb-1">題目：求 <InlineMath math="7 \times 2^{10}+2^8+5 \times 2^3-2^3" /> 的二進制</p>
              <p>① COMP：<InlineMath math="7168+256+40-8=7456" /></p>
              <p>② BASE MODE → <span className="text-green-600 font-bold">DEC</span> 輸入 7456 → 按 log（<span className="text-green-600 font-bold">BIN</span>）→ <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> → 得 <InlineMath math="1110100100000_2" /></p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3">
              <p className="font-semibold mb-1">題目：求 <InlineMath math="1100_2" /> 的十進制</p>
              <p>MODE 3 → 按 log（<span className="text-green-600 font-bold">BIN</span>）→ 輸入 1100 → <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> →
                <span className="relative inline-block mx-1 align-middle">
                  <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                  <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                </span>
                → 得 <InlineMath math="12" /></p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
);

// ─── Notes Component for Variation ─────────────────────────────────────────────
const VariationNotes = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
      <ArrowLeft className="w-5 h-5" /> 返回
    </button>
    <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-amber-400 pb-3">
      📘 筆記：變分常數
    </h1>
    <div className="space-y-8 text-slate-700">
      <section className="bg-amber-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-amber-800 mb-3">一、正變與反變</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-bold text-amber-700 mb-2">正變（正比）</p>
            <BlockMath math="\begin{aligned} y &\propto x \\ y &= kx \end{aligned}" />
            <p className="text-sm">y 隨 x 增大而增大，常數 <InlineMath math="k = \frac{y}{x}" /></p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-bold text-amber-700 mb-2">反變（反比）</p>
            <BlockMath math="\begin{aligned} y &\propto \frac{1}{x} \\ y &= \frac{k}{x} \end{aligned}" />
            <p className="text-sm">y 隨 x 增大而減小，常數 <InlineMath math="k = xy" /></p>
          </div>
        </div>
      </section>

      <section className="bg-orange-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-orange-800 mb-3">二、聯變（Joint Variation）</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <p className="font-semibold text-orange-700 mb-2">一般形式：</p>
          <BlockMath math="z = k \cdot \frac{x^a}{y^b}" />
          <p>（z 隨 <InlineMath math="x^a" /> 正變，隨 <InlineMath math="y^b" /> 反變）</p>
        </div>
        <div className="bg-orange-100 rounded-lg p-4">
          <p className="font-semibold mb-2">求常數 k 的方法：</p>
          <BlockMath math="k = \frac{z \cdot y^b}{x^a}" />
          <p className="text-sm text-orange-700">故 <InlineMath math="\frac{zy^b}{x^a}" /> 必為常數。</p>
        </div>
      </section>

      <section className="bg-green-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-green-800 mb-3">三、常見描述與對應關係</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-green-300 px-3 py-2 text-left">描述</th>
                <th className="border border-green-300 px-3 py-2 text-left">關係式</th>
                <th className="border border-green-300 px-3 py-2 text-left">常數</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['z 隨 x² 正變，y³ 反變', 'z = kx²/y³', 'zy³/x²'],
                ['w 隨 √u 正變，v² 反變', 'w = k√u/v²', 'w²v⁴/u （= k²）'],
                ['z 隨 x 反變，y³ 正變', 'z = ky³/x', 'xz/y³'],
                ['z 隨 x 正變，y² 反變', 'z = kx/y²', 'zy²/x'],
              ].map(([desc, formula, constant], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                  <td className="border border-green-300 px-3 py-2">{desc}</td>
                  <td className="border border-green-300 px-3 py-2"><InlineMath math={formula.replace(/²/g,'^{2}').replace(/³/g,'^{3}').replace(/√u/,'\\sqrt{u}')} /></td>
                  <td className="border border-green-300 px-3 py-2 font-semibold text-green-700"><InlineMath math={constant.replace(/²/g,'^{2}').replace(/³/g,'^{3}').replace(/⁴/g,'^{4}')} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-blue-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-blue-800 mb-3">四、特別情況：平方根正變</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <p className="font-semibold text-blue-700 mb-1">問題：w 隨 √u 正變，v² 反變</p>
          <BlockMath math="w = \frac{k\sqrt{u}}{v^2}" />
          <p className="text-sm text-blue-700 mb-2">直接常數含 √u，選項通常不出現根號。</p>
          <p className="font-semibold text-blue-700 mb-1">技巧：兩邊平方</p>
          <BlockMath math="\begin{aligned} w^2 &= \frac{k^2 u}{v^4} \\ \frac{w^2 v^4}{u} &= k^2 = \text{常數} \end{aligned}" />
        </div>
        <div className="bg-blue-100 rounded-lg p-3 text-sm">
          <p>⚠️ 注意：<InlineMath math="k^2" /> 也是常數，所以 <InlineMath math="\frac{w^2v^4}{u}" /> 必為常數。</p>
        </div>
      </section>

      <section className="bg-purple-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-800 mb-3">五、答題技巧</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>寫出關係式 <InlineMath math="z = k \cdot \frac{\text{正比因素}}{\text{反比因素}}" /></li>
          <li>移項求 k：常數 = <InlineMath math="z \times \frac{\text{反比因素}}{\text{正比因素}}" /></li>
          <li>若涉及根式，兩邊平方得 <InlineMath math="k^2" />，再構造含 <InlineMath math="k^2" /> 的常數式</li>
          <li>逐項代入選項驗證，看哪個結果恆等於常數</li>
        </ol>
      </section>
    </div>
  </div>
);

// ─── Notes Component for Complex Numbers ─────────────────────────────────────
const ComplexNotes = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
      <ArrowLeft className="w-5 h-5" /> 返回
    </button>
    <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-purple-400 pb-3">
      📘 筆記：複數 i
    </h1>
    <div className="space-y-8 text-slate-700">
      <section className="bg-purple-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-800 mb-3">一、虛數單位 i 的冪次循環</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <BlockMath math="i^1 = i, \quad i^2 = -1, \quad i^3 = -i, \quad i^4 = 1" />
          <p className="text-sm text-purple-700 mt-2">週期為 4，即 <InlineMath math="i^{4k} = 1" />，<InlineMath math="i^{4k+1} = i" />，<InlineMath math="i^{4k+2} = -1" />，<InlineMath math="i^{4k+3} = -i" /></p>
        </div>
        <div className="bg-purple-100 rounded-lg p-3">
          <p className="font-semibold mb-1">技巧：用 n mod 4 判斷</p>
          <p className="text-sm">例：<InlineMath math="i^{37}" />，37 mod 4 = 1，故 <InlineMath math="i^{37} = i" /></p>
        </div>
      </section>

      <section className="bg-indigo-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-indigo-800 mb-3">二、連續冪次之和</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <p className="font-semibold text-indigo-700 mb-1">關鍵：每 4 項和為 0</p>
          <BlockMath math="i^n + i^{n+1} + i^{n+2} + i^{n+3} = i^n(1+i-1-i) = 0" />
        </div>
        <div className="bg-indigo-100 rounded-lg p-3">
          <p className="font-semibold mb-1">例（25-35）：<InlineMath math="i^9+i^{10}+\cdots+i^{999}" /></p>
          <BlockMath math="\text{共 } 999-9+1 = 991 \text{ 項}" />
          <BlockMath math="991 = 247 \times 4 + 3" />
          <BlockMath math="\text{餘 3 項：} i^{997}+i^{998}+i^{999} = i+(-1)+(-i) = -1" />
        </div>
      </section>

      <section className="bg-blue-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-blue-800 mb-3">三、有理化含 i 的分式</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <p className="font-semibold text-blue-700 mb-2">共軛複數乘法：</p>
          <BlockMath math="\frac{a+bi}{c+di} = \frac{(a+bi)(c-di)}{c^2+d^2}" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="bg-blue-100 rounded-lg p-3">
            <p className="font-semibold mb-1 text-sm">除以 i：</p>
            <BlockMath math="\frac{1}{i} = \frac{-i}{i(-i)} = -i" />
          </div>
          <div className="bg-blue-100 rounded-lg p-3">
            <p className="font-semibold mb-1 text-sm">例（SP-34）：</p>
            <BlockMath math="4k-\frac{6+ki}{i}=4k-(k-6i)=3k+6i" />
          </div>
        </div>
      </section>

      <section className="bg-green-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-green-800 mb-3">四、「令式子為實數」問題</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="font-semibold text-green-700 mb-2">方法：令虛部 = 0</p>
          <p>展開後，虛部含參數。令虛部 = 0，解出參數。</p>
        </div>
        <div className="bg-green-100 rounded-lg p-4 mt-3">
          <p className="font-semibold mb-1">例（15-35）：<InlineMath math="z = (a+5)i^6+(a-3)i^7" />，z 為實數</p>
          <BlockMath math="i^6 = -1,\quad i^7 = -i" />
          <BlockMath math="z = -(a+5) + (3-a)i" />
          <BlockMath math="\begin{aligned} \text{令虛部}=0:\; 3-a &= 0 \\ a &= 3 \end{aligned}" />
        </div>
      </section>

      <section className="bg-yellow-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-yellow-800 mb-3">五、加權冪次求實部</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="font-semibold mb-1">例（13-36）：<InlineMath math="i+2i^2+3i^3+4i^4" /> 的實部為</p>
          <BlockMath math="= i + 2(-1) + 3(-i) + 4(1) = -2+4+\underbrace{i-3i}_{-2i} = 2-2i" />
          <BlockMath math="\text{實部} = 2" />
        </div>
      </section>

      <section className="bg-red-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-red-800 mb-3">六、運算重點提示</h2>
        <ul className="space-y-2">
          <li className="bg-white rounded-lg p-3 shadow-sm">
            <InlineMath math="(a+bi)(c+di) = (ac-bd)+(ad+bc)i" />
          </li>
          <li className="bg-white rounded-lg p-3 shadow-sm">
            <span className="font-semibold">實部</span> = 不含 i 的部份；<span className="font-semibold">虛部</span> = i 的係數
          </li>
          <li className="bg-white rounded-lg p-3 shadow-sm">
            若 x 為實數，則 <InlineMath math="(x+ni)(m+i)" /> 展開後實部含 x
          </li>
        </ul>
      </section>
    </div>
  </div>
);

// ─── MC Option Button ─────────────────────────────────────────────────────────
const OptionBtn = ({ label, optionLatex, state, onClick }) => {
  // state: 'idle' | 'correct' | 'wrong' | 'reveal'
  const base = 'w-full text-left flex items-start gap-3 px-4 py-4 rounded-xl border-2 transition-all duration-200 font-medium';
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
      <span className="text-lg leading-relaxed"><InlineMath math={optionLatex} /></span>
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

      {/* Question */}
      <div className="text-base font-semibold text-slate-700 mb-3">
        <div><InlineMath math={question.questionLatex} /></div>
        {question.questionLatex2 && <div><InlineMath math={question.questionLatex2} /></div>}
      </div>

      {/* Options Card */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-5">
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
          <div className="bg-white rounded-lg px-4 py-3">
            {question.explanationAligned
              ? <LeftBlockMath math={question.explanationAligned} />
              : <AlignedSteps questionLatex={question.variationQ ? '' : question.questionLatex} lines={question.explanationLines || []} />}
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

// ─── Generic Topic Quiz ──────────────────────────────────────────────────────
const TopicQuiz = ({ onBack, generateFn, topicLabel }) => {
  const [question, setQuestion] = useState(() => generateFn());
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(generateFn());
    setSelected(null);
  }, [generateFn]);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const ok = idx === question.correctIndex;
    setScore(s => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
    setStreak(st => ok ? st + 1 : 0);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const getState = (idx) => {
    if (selected === null) return 'idle';
    if (idx === question.correctIndex) return selected === idx ? 'correct' : 'reveal';
    if (idx === selected) return 'wrong';
    return 'idle';
  };
  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium">
          <ArrowLeft className="w-5 h-5" /> 返回
        </button>
        <div className="flex items-center gap-3 text-sm">
          {streak >= 3 && (
            <span className="flex items-center gap-1 text-orange-500 font-bold">
              <Star className="w-4 h-4 fill-orange-400" /> ×{streak}
            </span>
          )}
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">✓ {score.correct}/{score.total}</span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">{accuracy}%</span>
        </div>
      </div>
      <div className="mb-3">
        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">{question.subtypeLabel}</span>
      </div>
      <div className="text-base font-semibold text-slate-700 mb-3">
        <div><InlineMath math={question.questionLatex} /></div>
        {question.questionLatex2 && <div><InlineMath math={question.questionLatex2} /></div>}
      </div>
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-5">
        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <OptionBtn
              key={`${idx}-${question.questionLatex.slice(0,20)}`}
              label={optionLabels[idx]}
              optionLatex={opt}
              state={getState(idx)}
              onClick={() => handleSelect(idx)}
            />
          ))}
        </div>
      </div>
      {selected !== null && (
        <div className={`rounded-xl p-4 mb-4 border-l-4 ${
          selected === question.correctIndex ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-400'}`}>
          <div className="flex items-center gap-2 mb-3">
            {selected === question.correctIndex
              ? <CheckCircle className="w-5 h-5 text-green-600" />
              : <XCircle className="w-5 h-5 text-red-500" />}
            <span className={`font-bold ${selected === question.correctIndex ? 'text-green-700' : 'text-red-600'}`}>
              {selected === question.correctIndex ? '正確！' : `錯誤！答案是 ${optionLabels[question.correctIndex]}`}
            </span>
          </div>
          <div className="bg-white rounded-lg px-4 py-3">
            {question.explanationAligned
              ? <LeftBlockMath math={question.explanationAligned} />
              : <AlignedSteps questionLatex={question.variationQ ? '' : question.questionLatex} lines={question.explanationLines || []} />}
          </div>
        </div>
      )}
      {selected !== null && (
        <button onClick={nextQuestion}
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
    id: 'binary',
    title: '二進制轉換',
    desc: '二進制與十進制互轉、二進制算式求值、係數×2ⁿ+餘數分解，CASIO 50FHII BASE MODE 技巧',
    icon: '🔟',
    color: 'from-teal-500 to-cyan-600',
    badges: [{ level: 'F3', chapter: 'CH2', subject: '指數定律' }],
  },
  {
    id: 'hcf-lcm',
    title: '多項式的 H.C.F. 及 L.C.M.',
    desc: '最高公因式與最小公倍式，涵蓋純變量單項式、含係數單項式、可因式分解多項式及求第三式',
    icon: '📐',
    color: 'from-blue-500 to-indigo-600',
    badges: [{ level: 'F4', chapter: 'CH4', subject: '續多項式' }],
  },
  {
    id: 'variation',
    title: '變分常數',
    desc: '正變、反變、聯變：判斷哪個代數式必為常數，涵蓋整數次及平方根次正變',
    icon: '📊',
    color: 'from-amber-500 to-orange-600',
    badges: [{ level: 'F5', chapter: 'CH11', subject: '變分' }],
  },
  {
    id: 'complex',
    title: '複數 i',
    desc: 'i 的冪次循環、化簡含 i 的代數式、有理化分式、令式子為實數，DSE 歷屆題型',
    icon: '🔮',
    color: 'from-purple-500 to-violet-600',
    badges: [{ level: 'F4', chapter: 'CH1', subject: '數系' }],
  },
];

// ─── Main MCLimitedF6 App ─────────────────────────────────────────────────────
const MCLimitedF6 = () => {
  const [view, setView] = useState('home'); // 'home' | 'quiz' | 'notes'
  const [activeTopic, setActiveTopic] = useState(null);

  if (view === 'quiz' && activeTopic) {
    if (activeTopic.id === 'binary')   return <TopicQuiz onBack={() => setView('home')} generateFn={generateBinaryQuestion} topicLabel="二進制轉換" />;
    if (activeTopic.id === 'hcf-lcm') return <HCFLCMQuiz onBack={() => setView('home')} />;
    if (activeTopic.id === 'variation') return <TopicQuiz onBack={() => setView('home')} generateFn={generateVariationQuestion} topicLabel="變分常數" />;
    if (activeTopic.id === 'complex') return <TopicQuiz onBack={() => setView('home')} generateFn={generateComplexQuestion} topicLabel="複數 i" />;
  }
  if (view === 'notes' && activeTopic) {
    if (activeTopic.id === 'binary')   return <BinaryNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'hcf-lcm') return <HCFLCMNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'variation') return <VariationNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'complex') return <ComplexNotes onBack={() => setView('home')} />;
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
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">選擇題</h2>
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


      </div>
    </div>
  );
};

export default MCLimitedF6;
