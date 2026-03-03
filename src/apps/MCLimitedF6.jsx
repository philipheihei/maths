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
    answer: '210x^2y^2z',
    wrongs: ['30xy', '630x^2y^2z', '30xyz'],
    hint: [
      '\\text{係數：}210=2{\\times}3{\\times}5{\\times}7,\\;30=2{\\times}3{\\times}5',
      '\\text{LCM}(210,30)=210\\;(\\because 210=7{\\times}30)',
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
  const realParts = [];
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
    if (rv !== 0) realParts.push(rv);
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
      `i^1=i,\\ i^2=-1,\\ i^3=-i,\\ i^4=1 \\text{（週期為4）}`,
      ...expLines,
      realParts.length > 1
        ? `\\therefore \\text{實部} = ${realParts.map(v => `(${v})`).join('+')} = ${realSum}`
        : `\\therefore \\text{實部} = ${realSum}`,
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
  // Deduplicate and pad to ensure exactly 3 wrongs (w2 can equal correct when m===n)
  const wrongs = [...new Set([w1, w2, w3].filter(w => w !== correct))];
  while (wrongs.length < 3) wrongs.push(`${m + n + wrongs.length}${pVar}`);
  const opts = shuffle([correct, ...wrongs.slice(0, 3)]);
  return {
    questionLatex: `\\text{若 }${pVar}\\text{ 為實數，則 }(${pVar}+${n}i)(${m}+i)\\text{ 的實部為}`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `(${pVar}+${n}i)(${m}+i) = ${m}${pVar}+${pVar}i+${n*m}i+${n}i^2`,
      `= ${m}${pVar}+${pVar}i+${n*m}i-${n}\\quad(\\because i^2=-1)`,
      `= (${mS}${pVar}-${n})+(${pVar}+${n*m})i`,
      `\\therefore \\text{實部} = ${mS}${pVar}-${n}`,
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
  // w3 was ${realCoeff+2}k which always equalled w2 (both = ${a+1}k); use ${a}k instead
  const w3 = `${realCoeff + 1}k+${imConst}i`;
  const wrongs = [w1, w2, w3].filter(w => w !== correct).slice(0, 3);
  const opts = shuffle([correct, ...wrongs]);
  return {
    questionLatex: `\\text{若 }k\\text{ 為實數，則 }${a}k-\\frac{${b}+ki}{i}=`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `\\frac{1}{i} = \\frac{-i}{i \\cdot (-i)} = \\frac{-i}{1} = -i`,
      `\\frac{${b}+ki}{i} = (${b}+ki)(-i) = -${b}i-ki^2`,
      `= -${b}i+k = k-${b}i\\quad(\\because i^2=-1)`,
      `${a}k-(k-${b}i) = ${a}k-k+${b}i = ${realCoeff}k+${imConst}i`,
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
  const groups = Math.floor(count / 4);
  // Build remainder term explanation
  let remExpLines = [];
  if (rem > 0) {
    const remStart = start + groups * 4;
    const remTerms = [];
    const remVals = [];
    for (let t = 0; t < rem; t++) {
      remTerms.push(`i^{${remStart + t}}`);
      remVals.push(iCycleStr(remStart + t));
    }
    const remValsJoined = remVals.map((v, i) => {
      if (i === 0) return v;
      return v.startsWith('-') ? v : `+${v}`;
    }).join('');
    remExpLines = [
      `\\text{餘 }${rem}\\text{ 項：}${remTerms.join('+')}`,
      `= ${remValsJoined} = ${correct}`,
    ];
  }
  return {
    questionLatex: `i^{${start}}+i^{${start+1}}+\\cdots+i^{${end}}=`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `i^1+i^2+i^3+i^4=0\\text{（每4項和為 0）}`,
      `\\text{共 }${count}\\text{ 項，}${count}=${groups}\\times4+${rem}`,
      ...(rem === 0
        ? [`\\therefore \\text{整除4，和為 }0`]
        : remExpLines),
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
      `\\text{乘共軛：}\\frac{${bVar}^2+${cSq}}{${bVar}+${c}i} \\times \\frac{${bVar}-${c}i}{${bVar}-${c}i}`,
      `\\text{分母 }(${bVar}+${c}i)(${bVar}-${c}i)=${bVar}^2+(${c})^2=${bVar}^2+${cSq}`,
      `=\\frac{(${bVar}^2+${cSq})(${bVar}-${c}i)}{${bVar}^2+${cSq}}=${bVar}-${c}i`,
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
  const coefAStr = coefA === 1 ? '' : coefA === -1 ? '-' : `${coefA}`;
  const imConstVal = p * r1.im + q * r2.im;
  const imConstStr = imConstVal === 0 ? '' : imConstVal > 0 ? `+${imConstVal}` : `${imConstVal}`;
  const opts = shuffle([correct, ...wrongs]);
  return {
    questionLatex: `\\text{設 }z=(a${pS})i^{${n1}}+(a${qS})i^{${n1+1}}\\text{，其中 }a\\text{ 為實數。若 }z\\text{ 為實數，則 }a=`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `i^{${n1}}=${iCycleStr(n1)},\\quad i^{${n1+1}}=${iCycleStr(n1+1)}`,
      `z=(a${pS})(${iCycleStr(n1)})+(a${qS})(${iCycleStr(n1+1)})`,
      `\\text{展開後收集虛部，令虛部}=0\\text{：}`,
      `${coefAStr}a${imConstStr}=0`,
      `\\therefore a=${aVal}`,
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
  // When a1=a2, w2 equals correct; deduplicate and pad
  const wrongs = [...new Set([w1, w2, w3].filter(w => w !== correct))];
  while (wrongs.length < 3) wrongs.push(`\\frac{${a1+a2}k-${a1}}{k^2+1}`);
  const a1Str = a1 > 1 ? `${a1}` : '';
  const opts = shuffle([correct, ...wrongs]);
  return {
    questionLatex: `\\text{若 }k\\text{ 為實數，則 }\\frac{${a1Str}i}{k-i}+\\frac{${a2}}{k+i}\\text{ 的實部為}`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `\\text{通分：分母}=(k-i)(k+i)=k^2+1`,
      `\\text{分子}=${a1}i(k+i)+${a2}(k-i)`,
      `=${a1}ki+${a1}i^2+${a2}k-${a2}i`,
      `=${a1}ki-${a1}+${a2}k-${a2}i\\quad(\\because i^2=-1)`,
      `=(${a2}k-${a1})+(${a1}k-${a2})i`,
      `\\therefore \\text{實部}=\\frac{${a2}k-${a1}}{k^2+1}`,
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

// ─── Helper: annotated binary number with bit-position labels ──────────────
const BinAnnotated = ({ bits }) => (
  <span className="inline-flex items-end font-mono">
    {bits.split('').map((bit, i) => {
      const pos = bits.length - 1 - i;
      return (
        <span key={i} className="inline-flex flex-col items-center" style={{ margin: '0 1px' }}>
          <span className="leading-none mb-0.5" style={{ fontSize: '11px', color: '#c00', fontWeight: 700 }}>{pos}</span>
          <span className={`text-xl font-bold leading-none ${bit === '1' ? 'text-red-600' : 'text-slate-500'}`}>{bit}</span>
        </span>
      );
    })}
    <span className="text-base self-end mb-0.5 ml-0.5">₂</span>
  </span>
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

            {/* DSE-2014-Q34 */}
            <div className="border-2 border-blue-300 rounded-lg p-3 bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">Question</span>
                <span className="text-xs font-semibold text-blue-700">DSE-2014-Q34</span>
              </div>
              <p className="font-semibold text-base mb-3">
                <InlineMath math="7\times 2^{10}+2^8+5\times 2^3-2^3 =" /> ?
              </p>
              <div className="space-y-1 mb-3 pl-2">
                <p>A.&nbsp;&nbsp;<InlineMath math="111010100000_2" /></p>
                <p>B.&nbsp;&nbsp;<InlineMath math="111100010000_2" /></p>
                <p>C.&nbsp;&nbsp;<InlineMath math="1110100100000_2" /></p>
                <p>D.&nbsp;&nbsp;<InlineMath math="1111000010000_2" /></p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <p className="font-bold text-blue-700 mb-3">Solution</p>

                <div className="mb-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0">1</span>
                    <span className="font-semibold">計算機直接出題目嘅數值</span>
                  </div>
                  <p className="ml-8"><InlineMath math="7\times 2^{10}+2^8+5\times 2^3-2^3 =" /> <span className="font-bold text-blue-700">7456</span></p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0">2</span>
                    <span className="font-semibold">用展開式(Expanded form)出每個答案嘅數值</span>
                  </div>
                  <div className="mt-1 ml-2 space-y-2">
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="font-semibold">A.&nbsp;<BinAnnotated bits="111010100000" /></p>
                      <p className="text-gray-500 text-xs"><InlineMath math="=2^{11}+2^{10}+2^9+2^7+2^5" /></p>
                      <p>= <span className="font-bold text-red-600">3744</span>&ensp;<span className="text-red-600">檢查同題目數值是否一樣 → 不同，所以不是答案</span></p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="font-semibold">B.&nbsp;<BinAnnotated bits="111100010000" /></p>
                      <p className="text-gray-500 text-xs"><InlineMath math="=2^{11}+2^{10}+2^9+2^8+2^4" /></p>
                      <p>= <span className="font-bold text-red-600">3856</span>&ensp;<span className="text-red-600">檢查同題目數值是否一樣 → 不同，所以不是答案</span></p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-3 bg-green-50 rounded pr-2 py-1">
                      <p className="font-semibold">C.&nbsp;<BinAnnotated bits="1110100100000" /></p>
                      <p className="text-gray-500 text-xs"><InlineMath math="=2^{12}+2^{11}+2^{10}+2^8+2^5" /></p>
                      <p>= <span className="font-bold text-green-600">7456</span>&ensp;<span className="text-green-700 font-semibold">檢查同題目數值是否一樣 → 一樣！答案：C</span></p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="font-semibold">D.&nbsp;<BinAnnotated bits="1111000010000" /></p>
                      <p className="text-gray-500 text-xs"><InlineMath math="=2^{12}+2^{11}+2^{10}+2^9+2^4" /></p>
                      <p>= <span className="font-bold text-red-600">7696</span>&ensp;<span className="text-red-600">檢查同題目數值是否一樣 → 不同，所以不是答案</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice problems */}
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

      {/* ══ MC 部份 ══ */}
      <div className="flex items-center gap-3">
        <span className="bg-teal-600 text-white text-sm font-bold px-3 py-1 rounded-full">MC 部份</span>
        <div className="flex-1 h-px bg-teal-200" />
      </div>

      {/* Section 1: Calculator */}
      <section className="bg-teal-50 rounded-xl p-5 border-2 border-teal-300">
        <h2 className="text-lg font-bold text-teal-800 mb-1">🧮 一、計算機神技 — Complex Mode</h2>
        <p className="text-sm text-teal-600 mb-4">見到 <em>i</em> 的題目，10秒用計算機搞掂！</p>

        {/* Steps */}
        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <span className="shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-sm flex items-center justify-center">1</span>
            <div>
              <p className="font-bold text-teal-800">開啟 Complex Mode</p>
              <p className="text-sm text-slate-600 mt-0.5">按 <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs font-bold">MODE</span> → 選 <span className="font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">2 (CMPLX)</span></p>
              <p className="text-xs text-slate-400 mt-1">⚠️ 每次計完記得 MODE → 1 返回一般模式</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <span className="shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-sm flex items-center justify-center">2</span>
            <div>
              <p className="font-bold text-teal-800">照題目直接輸入</p>
              <p className="text-sm text-slate-600 mt-0.5">將式子逐字撳入計算機，<InlineMath math="i" /> 按 <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs font-bold">ENG</span>（即 <InlineMath math="i" /> 鍵）</p>
              <p className="text-xs text-slate-400 mt-1">無限制題目可先代入數值（例如 k = 10）</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <span className="shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-sm flex items-center justify-center">3</span>
            <div>
              <p className="font-bold text-teal-800">讀出答案</p>
              <p className="text-xs text-slate-400 mt-0.5 mb-2">⚡ 系統預設先顯示<strong className="text-green-700">實部</strong>，直接按 EXE 即可</p>
              <div className="flex gap-3 mt-1 flex-wrap">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <span className="font-mono bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">EXE</span>
                  <span className="text-sm font-semibold text-green-800">→ 出 <span className="underline">實部</span>（Real Part）</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                  <span className="font-mono bg-slate-600 text-white text-xs px-2 py-1 rounded font-bold">SHIFT</span>
                  <span className="text-xs text-slate-400">+</span>
                  <span className="font-mono bg-slate-600 text-white text-xs px-2 py-1 rounded font-bold">EXE</span>
                  <span className="text-sm font-semibold text-blue-800">→ 出 <span className="underline">虛部</span>（Imag Part）</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Concept: a+bi form */}
        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded">重要概念</span>
            <span className="text-sm font-bold text-indigo-800">DSE 所有含 <InlineMath math="i" /> 的混算，答案均以 <InlineMath math="a+bi" /> 形式表達</span>
          </div>
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div className="bg-white rounded-lg px-4 py-3 border border-indigo-100">
              <p className="text-xs text-indigo-500 font-bold mb-2">認識 a 與 b</p>
              <div className="flex items-center gap-3 mb-1">
                <InlineMath math="a + bi" />
                <span className="text-xs text-slate-400">↑ 實部　↑ 虛部</span>
              </div>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="bg-green-100 text-green-800 rounded px-2 py-0.5 font-bold">a = 實部</span>
                <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-bold">b = 虛部</span>
              </div>
            </div>
            <div className="bg-white rounded-lg px-4 py-3 border border-indigo-100 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <InlineMath math="5 - 3i" />
                <span className="text-slate-400">→</span>
                <span className="bg-green-100 text-green-800 rounded px-2 py-0.5 text-xs">a = 5</span>
                <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs">b = −3</span>
              </div>
              <div className="flex items-center gap-2">
                <InlineMath math="8 + 7i" />
                <span className="text-slate-400">→</span>
                <span className="bg-green-100 text-green-800 rounded px-2 py-0.5 text-xs">a = 8</span>
                <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs">b = 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Warm-up: Mode 2 complex arithmetic */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-slate-600 text-white text-xs font-bold px-2 py-1 rounded">熱身練習</span>
            <span className="text-sm font-bold text-slate-700">用 Mode 2 計複數四則混算</span>
          </div>
          <p className="text-sm text-slate-500 mb-3">切換到 Mode 2 後，照樣輸入式子，計算機會自動以 <InlineMath math="a+bi" /> 形式顯示答案。</p>

          <div className="space-y-3">
            {/* Example 1 */}
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-400 font-bold mb-2">例 1</p>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <InlineMath math="-4(5-3i)" />
                <span className="text-slate-400">=</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">-4 × (5 - 3 <span className="text-teal-700 font-bold">i</span>)</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                  <span className="font-mono bg-green-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">EXE</span>
                  <span className="text-sm text-green-800">先出 <strong>−20</strong>（實部 a）</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
                  <span className="font-mono bg-slate-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">SHIFT</span>
                  <span className="text-xs text-slate-400">+</span>
                  <span className="font-mono bg-slate-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">EXE</span>
                  <span className="text-sm text-blue-800">後出 <strong>12</strong>（虛部 b）</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">∴ 答案為 <InlineMath math="-20+12i" /></p>
            </div>

            {/* Example 2 */}
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-400 font-bold mb-2">例 2</p>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <InlineMath math="\dfrac{4i^3}{i-1}" />
                <span className="text-slate-400 text-xs mx-1">→ 輸入：</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">4<span className="text-teal-700 font-bold">iii</span> ÷ ( <span className="text-teal-700 font-bold">i</span> - 1 )</span>
              </div>
              <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-2 py-1 mb-2">⚠️ CASIO 50FH II 的 CMPLX Mode <strong>不支援 ^ 鍵</strong>！輸入 <InlineMath math="i^3" /> 時須打 <code><em>i</em> × <em>i</em> × <em>i</em></code>（有幾次方就打幾個 <em>i</em> 相乘）</p>
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                  <span className="font-mono bg-green-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">EXE</span>
                  <span className="text-sm text-green-800">先出 <strong>-2</strong>（實部 a）</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
                  <span className="font-mono bg-slate-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">SHIFT</span>
                  <span className="text-xs text-slate-400">+</span>
                  <span className="font-mono bg-slate-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">EXE</span>
                  <span className="text-sm text-blue-800">後出 <strong>2</strong>（虛部 b）</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">∴ 答案為 <InlineMath math="-2+2i" /></p>
            </div>
          </div>
          <p className="text-xs text-teal-700 mt-3 bg-teal-50 rounded-lg px-3 py-2 border border-teal-100">💡 記住：<strong>EXE 先出實部（a）</strong>，<strong>SHIFT+EXE 後出虛部（b）</strong>，合起來就是 a+bi 的答案。</p>
        </div>

        {/* Example */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-teal-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">例題</span>
            <span className="text-sm font-bold text-slate-700">2023 DSE Paper2 Q34</span>
          </div>
          <p className="text-sm mb-3 text-slate-700">若 <InlineMath math="k" /> 為一實數，則 <InlineMath math="\dfrac{i}{k-i}+\dfrac{2}{k+i}" /> 的實部為？</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
              <span className="shrink-0 w-6 h-6 rounded-full bg-amber-400 text-white font-bold text-xs flex items-center justify-center">1</span>
              <span className="text-amber-800 font-semibold">無限制 → 代 <InlineMath math="k=10" /></span>
            </div>
            <div className="flex items-center gap-2 bg-teal-50 rounded-lg px-3 py-2">
              <span className="shrink-0 w-6 h-6 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center">2</span>
              <div>
                <span className="text-teal-800 font-semibold">Cal 機輸入：</span>
                <span className="font-mono bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded ml-1">( i ÷ (10 - i) ) + ( 2 ÷ (10 + i) )</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
              <span className="shrink-0 w-6 h-6 rounded-full bg-green-600 text-white font-bold text-xs flex items-center justify-center">3</span>
              <span className="text-green-800">按 <span className="font-mono bg-green-600 text-white text-xs px-2 py-0.5 rounded font-bold">EXE</span> → 實部 = <InlineMath math="\dfrac{19}{101}" /></span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <span className="shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center">4</span>
              <span className="text-blue-800">對比選項：代 <InlineMath math="k=10" /> 後答案為 <InlineMath math="\dfrac{19}{101}" /> → 選 <strong>B. <InlineMath math="\dfrac{2k-1}{k^2+1}" /></strong></span>
            </div>
          </div>

          <div className="mt-3 bg-slate-50 rounded-lg p-3 text-xs text-slate-500 border border-slate-200">
            💡 代入數值後，逐一代入4個選項，哪個答案相符即是正確選項。若兩個選項相符，換另一個數值再試。
          </div>
        </div>
      </section>

      {/* ══ 長答部份 ══ */}
      <div className="flex items-center gap-3">
        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">長答部份</span>
        <div className="flex-1 h-px bg-purple-200" />
      </div>

      {/* Section 2: i power derivations from first principles */}
      <section className="bg-purple-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-800 mb-3">二、<InlineMath math="i" /> 的四則混算（以計算機 Complex Mode 計）</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <p className="text-sm text-purple-700 font-semibold mb-3">由定義出發逐步推導：</p>
          <div className="space-y-2">
            {[
              { lhs: 'i', eq: '\\sqrt{-1}', note: '' },
              { lhs: 'i^2', eq: '(\\sqrt{-1})(\\sqrt{-1}) = -1', note: '' },
              { lhs: 'i^3', eq: 'i \\cdot i^2 = i(-1) = -i', note: '' },
              { lhs: 'i^4', eq: 'i^2 \\cdot i^2 = (-1)(-1) = 1', note: '' },
            ].map(({ lhs, eq, note }) => (
              <div key={lhs} className="flex items-center gap-3 bg-purple-50 rounded-lg px-3 py-2 text-sm">
                <span className="w-12 font-bold text-purple-700 shrink-0"><InlineMath math={lhs} /></span>
                <span className="text-slate-400">=</span>
                <span className="text-slate-700"><InlineMath math={eq} /></span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-100 rounded-lg p-4">
          <p className="font-semibold text-purple-800 mb-2">每 4 個次方為一個循環 🔄</p>
          <div className="grid grid-cols-4 gap-2 text-sm text-center">
            {[
              ['i^5', 'i'], ['i^6', '-1'], ['i^7', '-i'], ['i^8', '1'],
            ].map(([p, v]) => (
              <div key={p} className="bg-white rounded-lg py-2 shadow-sm">
                <div className="text-xs text-slate-400 mb-1"><InlineMath math={p} /></div>
                <div className="font-bold text-purple-700"><InlineMath math={v} /></div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 flex-wrap text-sm bg-white rounded-lg px-3 py-2">
            <InlineMath math="i^1=i" />
            <span className="text-slate-300">→</span>
            <InlineMath math="i^2=-1" />
            <span className="text-slate-300">→</span>
            <InlineMath math="i^3=-i" />
            <span className="text-slate-300">→</span>
            <InlineMath math="i^4=1" />
            <span className="text-slate-300">→</span>
            <InlineMath math="i^5=i" />
            <span className="text-slate-400 text-xs">（循環）</span>
          </div>
        </div>
      </section>

      {/* Section 3 (was 二) */}
      <section className="bg-indigo-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-indigo-800 mb-3">三、虛數單位 <em>i</em> 的冪次循環</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <BlockMath math="i^1 = i, \quad i^2 = -1, \quad i^3 = -i, \quad i^4 = 1" />
          <p className="text-sm text-indigo-700 mt-2">週期為 4，即 <InlineMath math="i^{4k} = 1" />，<InlineMath math="i^{4k+1} = i" />，<InlineMath math="i^{4k+2} = -1" />，<InlineMath math="i^{4k+3} = -i" /></p>
        </div>
        <div className="bg-indigo-100 rounded-lg p-3">
          <p className="font-semibold mb-1">技巧：用 n mod 4 判斷</p>
          <p className="text-sm">例：<InlineMath math="i^{37}" />，37 mod 4 = 1，故 <InlineMath math="i^{37} = i" /></p>
        </div>
      </section>

      {/* Section 4 (was 三) */}
      <section className="bg-blue-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-blue-800 mb-3">四、有理化含 i 的分式</h2>
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

      {/* Section 5 (was 四) */}
      <section className="bg-green-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-green-800 mb-3">五、「令式子為實數」問題</h2>
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

      {/* Section 6 (was 五) */}
      <section className="bg-yellow-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-yellow-800 mb-3">六、加權冪次求實部</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="font-semibold mb-1">例（13-36）：<InlineMath math="i+2i^2+3i^3+4i^4" /> 的實部為</p>
          <BlockMath math="= i + 2(-1) + 3(-i) + 4(1) = -2+4+\underbrace{i-3i}_{-2i} = 2-2i" />
          <BlockMath math="\text{實部} = 2" />
        </div>
      </section>

      {/* Section 7 (was 六) */}
      <section className="bg-red-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-red-800 mb-3">七、運算重點提示</h2>
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

        {/* Section 8: Number System Chart */}
        <section className="bg-slate-50 rounded-xl p-5 border border-slate-200 overflow-hidden">
          <h2 className="text-lg font-bold text-slate-800 mb-6">八、數系表</h2>
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[600px] flex flex-col items-center pt-2 select-none">
              
              {/* L1: Complex */}
              <div className="bg-[#e78a8d] text-[#2c3e50] font-bold text-lg py-2.5 px-20 border border-red-300 z-10 relative shadow-sm">
                複數
              </div>
              
              {/* Line L1 to L2 */}
              <div className="w-full flex flex-col items-center">
                <div className="w-0 h-5 border-l-2 border-slate-700"></div>
                <div className="w-[60%] border-t-2 border-slate-700 h-5 flex justify-between rounded-t-sm">
                  <div className="w-0 h-full border-l-2 border-slate-700 -ml-[1px]"></div>
                  <div className="w-0 h-full border-r-2 border-slate-700 -mr-[1px]"></div>
                </div>
              </div>
              
              {/* L2 row */}
              <div className="w-full flex justify-center gap-[10%] px-[5%] -mt-1">
                {/* L2 Left Node */}
                <div className="flex flex-col w-[40%] items-center z-10">
                  <div className="w-full text-center shadow-sm">
                    <div className="bg-[#acd691] text-[#2c3e50] font-bold py-2 border border-green-300">實數與虛數的和</div>
                    <div className="bg-[#fcde84] text-[#2c3e50] font-bold py-1.5 border border-yellow-400 mt-[-1px] text-base">有 <span className="italic font-bold text-lg">i</span> 的數</div>
                  </div>
                  <div className="mt-2 text-blue-600 font-bold self-start pl-2">
                    <span className="text-[#6495ed] text-xl font-bold">e.g. </span>
                    <span className="text-[#2c3e50] font-mono text-xl ml-2 tracking-wider">2+7i , -3i</span>
                  </div>
                </div>
                
                {/* L2 Right Node (Real) */}
                <div className="flex flex-col w-[40%] items-center z-10">
                  <div className="w-full text-center shadow-sm">
                    <div className="bg-[#abdbfb] text-[#2c3e50] font-bold py-2 border border-blue-300 tracking-[0.2em]">實數</div>
                    <div className="bg-[#fcde84] text-[#2c3e50] font-bold py-1.5 border border-yellow-400 mt-[-1px] text-base">無 <span className="italic font-bold text-lg">i</span> 的數</div>
                  </div>
                  
                  {/* Branch L2R -> L3 */}
                  <div className="w-full flex flex-col items-center">
                    <div className="w-0 h-5 border-l-2 border-slate-700"></div>
                    <div className="w-[85%] border-t-2 border-slate-700 h-5 flex justify-between rounded-t-sm">
                      <div className="w-0 h-full border-l-2 border-slate-700 -ml-[1px]"></div>
                      <div className="w-0 h-full border-r-2 border-slate-700 -mr-[1px]"></div>
                    </div>
                  </div>
                  
                  {/* L3 row */}
                  <div className="w-[120%] flex justify-between gap-[5%] -ml-[10%] -mt-1">
                    {/* L3 Left: Irrational */}
                    <div className="flex flex-col w-[45%] items-center z-10">
                      <div className="w-full text-center shadow-sm">
                        <div className="bg-[#abdbfb] text-[#2c3e50] font-bold py-1.5 border border-blue-300">無理數</div>
                        <div className="bg-[#fcde84] text-[#2c3e50] font-bold py-1.5 border border-yellow-400 mt-[-1px] text-[13px] whitespace-nowrap px-1"><span className="text-orange-500">爛數</span>(寫唔到做分數)</div>
                      </div>
                      <div className="mt-2 text-blue-600 font-bold self-start pl-1 flex items-center">
                        <span className="text-[#6495ed] text-lg font-bold">e.g. </span>
                        <span className="text-[#2c3e50] ml-2 flex items-center gap-1.5 inline-flex text-[17px] font-semibold">
                          <InlineMath math="\pi" /> , <InlineMath math="\sin 60^\circ" />
                        </span>
                      </div>
                    </div>
                    
                    {/* L3 Right: Rational */}
                    <div className="flex flex-col w-[45%] items-center z-10">
                      <div className="w-full text-center shadow-sm">
                        <div className="bg-[#abdbfb] text-[#2c3e50] font-bold py-1.5 border border-blue-300">有理數</div>
                        <div className="bg-[#fcde84] text-[#2c3e50] font-bold py-1.5 border border-yellow-400 mt-[-1px] text-[13px] whitespace-nowrap px-1"><span className="text-blue-500">靚數</span>(整數/分數)</div>
                      </div>
                      
                      {/* Branch L3R -> L4 */}
                      <div className="w-full flex flex-col items-center text-slate-700">
                        <div className="w-0 h-4 border-l-2 border-slate-700"></div>
                        <div className="w-[90%] border-t-2 border-slate-700 h-4 flex justify-between rounded-t-sm">
                          <div className="w-0 h-full border-l-2 border-slate-700 -ml-[1px]"></div>
                          <div className="w-0 h-full border-r-2 border-slate-700 -mr-[1px]"></div>
                        </div>
                      </div>
                      
                      {/* L4 row */}
                      <div className="w-[125%] flex justify-between gap-[5%] -ml-[12.5%] -mt-1">
                        {/* L4 Left: Integer */}
                        <div className="flex flex-col flex-1 items-center z-10">
                          <div className="w-full bg-[#abdbfb] text-[#2c3e50] font-bold py-1.5 text-center border border-blue-300 shadow-sm whitespace-nowrap">整數</div>
                          <div className="text-blue-600 font-bold self-start mt-2 w-full flex pl-1">
                            <span className="text-[#6495ed] text-sm">e.g.</span>
                            <span className="text-[#2c3e50] ml-1.5 font-mono tracking-widest text-[15px] pt-px">-4, 0, 7</span>
                          </div>
                        </div>
                        
                        {/* L4 Right: Fraction */}
                        <div className="flex flex-col flex-1 items-center z-10">
                          <div className="w-full bg-[#abdbfb] text-[#2c3e50] font-bold py-1.5 text-center border border-blue-300 shadow-sm whitespace-nowrap">分數</div>
                          <div className="text-blue-600 font-bold w-full self-start mt-1.5 flex items-start pl-1">
                            <span className="text-[#6495ed] text-sm mt-1">e.g.</span>
                            <span className="text-[#2c3e50] font-bold inline-flex items-center gap-2 text-base ml-1.5">
                              <InlineMath math="\dfrac{3}{5}" /> , <InlineMath math="\dfrac{2}{9}" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );

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

// ─── Topic 5: Function Graph (y = ax² + bx + c) Generators ──────────────────

// Helper: draw a parabola SVG for a quadratic with given properties
const ParabolaSVG = ({ aSign, yIntSign, vertexSide, className = '' }) => {
  // aSign: 1 or -1 (open up / down)
  // yIntSign: 1 (positive y-int), -1 (negative), 0 (through O)
  // vertexSide: 'left' | 'right' | 'center' (which side of y-axis)
  const W = 140, H = 130;
  const axisY = aSign > 0 ? 70 : 60;  // x-axis position
  const axisX = vertexSide === 'right' ? 40 : vertexSide === 'left' ? 100 : 70;

  // vertex x/y in SVG coords
  const vx = vertexSide === 'right' ? 95 : vertexSide === 'left' ? 35 : 70;
  const vy = aSign > 0
    ? axisY + 25   // vertex below axis (positive y = up in math = down in SVG)
    : axisY - 25;  // vertex above axis

  // y-intercept dot position
  const yIntY = yIntSign < 0 ? axisY + 18 : yIntSign > 0 ? axisY - 22 : axisY;

  // Let's compute a `k` factor such that sy = vy + k * (sx - vx)^2
  // It must pass through (axisX, yIntY) -> yIntY = vy + k * (axisX - vx)^2
  // So k = (yIntY - vy) / (axisX - vx)^2
  // Unless axisX == vx, then we just use a default k.
  const distSq = (axisX - vx) * (axisX - vx);
  let k = distSq > 0.1 ? (yIntY - vy) / distSq : (aSign > 0 ? -0.02 : 0.02);

  // Fallback: if k has the wrong sign (e.g. asking for an upward opening parabola but yInt is lower than vertex, which is impossible algebraically unless vertex is not the vertex),
  // we just use a default k and override yIntY to lie on the curve.
  let exactYIntY = yIntY;
  if ((aSign > 0 && k > 0) || (aSign < 0 && k < 0)) {
     k = aSign > 0 ? -0.03 : 0.03;
     exactYIntY = vy + k * distSq;
  }

  // Build parabola path via 5 sample points
  const pts = [];
  for (let sx = 5; sx <= W - 5; sx += 3) {
    const dx = sx - vx;
    const sy = vy + k * dx * dx;
    if (sy > -10 && sy < H + 10) pts.push(`${sx},${sy}`);
  }
  const pathD = pts.length > 1 ? `M${pts.join(' L')}` : '';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`w-36 h-32 ${className}`}>
      <defs>
        <marker id="fgArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
        </marker>
      </defs>
      {/* axes */}
      <line x1="5" y1={axisY} x2={W - 5} y2={axisY} stroke="#374151" strokeWidth="1.5" markerEnd="url(#fgArr)" />
      <line x1={axisX} y1={H - 5} x2={axisX} y2="5" stroke="#374151" strokeWidth="1.5" markerEnd="url(#fgArr)" />
      {/* labels */}
      <text x={W - 10} y={axisY + 12} fontSize="10" fill="#374151" fontWeight="bold">x</text>
      <text x={axisX + 5} y="14" fontSize="10" fill="#374151" fontWeight="bold">y</text>
      <text x={axisX - 10} y={axisY + 12} fontSize="9" fill="#374151">O</text>
      {/* parabola */}
      {pathD && <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" />}
      {/* y-intercept dot */}
      <circle cx={axisX} cy={exactYIntY} r="3" fill="#f59e0b" />
    </svg>
  );
};

// ── Type A: Vertex form y = a(x−h)² + k — statement check (NO graph) ────────
const genVertexFormQ = () => {
  const a = (Math.random() < 0.5 ? 1 : -1) * randInt(1, 4);
  const h = randInt(-6, 6);
  const k = randInt(-9, 9);

  // y = a(x - h)² + k
  // Direction: a>0 upward, a<0 downward
  // Vertex: (h, k)
  // y-intercept: a*h² + k  (sub x=0)
  const yInt = a * h * h + k;
  // Does it cross x-axis? Discriminant-like: if a>0 and k>0 → no x-int, etc.
  // Actually: a(x-h)²= -k → if -k/a >= 0 crosses, else no
  const crossesX = (-k / a) >= 0;

  // Format the equation LaTeX
  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const hPart = h === 0 ? 'x' : h > 0 ? `(x-${h})` : `(x+${-h})`;
  const kPart = k === 0 ? '' : k > 0 ? `+${k}` : `${k}`;
  const eqLatex = `y = ${aStr}${hPart}^2${kPart}`;

  // Build 4 statements: 1 correct + 3 wrong
  const stmts = [];
  // S1: direction
  stmts.push({ text: a > 0 ? '該圖像開口向上。' : '該圖像開口向下。', correct: true, expl: `a = ${a} ${a > 0 ? '> 0' : '< 0'}` });
  stmts.push({ text: a > 0 ? '該圖像開口向下。' : '該圖像開口向上。', correct: false, expl: `a = ${a} ${a > 0 ? '> 0 \\text{，開口向上}' : '< 0 \\text{，開口向下}'}` });
  // S2: y-intercept
  stmts.push({ text: `該圖像的 y 截距為 ${k}。`, correct: yInt === k, expl: `x=0 \\text{ 代入：} y = ${a}(0${h >= 0 ? `-${h}` : `+${-h}`})^2${kPart} = ${yInt}` });
  if (yInt !== k) {
    stmts.push({ text: `該圖像的 y 截距為 ${yInt}。`, correct: true, expl: `x=0 \\text{ 代入：} y = ${yInt}` });
  }
  // S3: passes through vertex
  stmts.push({ text: `該圖像通過點 (${h}, ${k})。`, correct: true, expl: `\\text{頂點} = (${h}, ${k})` });
  // S4: wrong point (swap sign or shift)
  const wrongPt = `(${-h}, ${k})`;
  if (-h !== h) {
    stmts.push({ text: `該圖像通過點 ${wrongPt}。`, correct: false, expl: `\\text{代入 }x=${-h}:\\; y = ${a}(${-h}-${h >= 0 ? h : `(${h})`})^2${kPart} \\neq ${k}` });
  }
  // S5: x-axis intersection
  stmts.push({ text: crossesX ? '該圖像與 x 軸沒有相交。' : '該圖像與 x 軸相交。',
    correct: false, expl: crossesX ? `\\frac{-k}{a} = \\frac{${-k}}{${a}} \\ge 0 \\text{，有交點}` : `\\frac{-k}{a} = \\frac{${-k}}{${a}} < 0 \\text{，無交點}` });
  stmts.push({ text: !crossesX ? '該圖像與 x 軸沒有相交。' : '該圖像與 x 軸相交。',
    correct: true, expl: !crossesX ? `\\text{無實根}` : `\\text{有實根}` });

  // Pick exactly 1 correct + 3 wrong
  const corrects = stmts.filter(s => s.correct);
  const wrongs = stmts.filter(s => !s.correct);
  const chosen = corrects[randInt(0, corrects.length - 1)];
  // Get 3 unique wrongs
  const wrongPool = shuffle(wrongs).slice(0, 3);

  const opts = shuffle([chosen, ...wrongPool]);
  const correctIndex = opts.indexOf(chosen);

  return {
    questionLatex: `\\text{下列有關 }${eqLatex}\\text{ 的圖像之敘述，何者正確？}`,
    options: opts.map(o => `\\text{${o.text}}`),
    correctIndex,
    explanationLines: [
      `${eqLatex}`,
      `a = ${a} ${a > 0 ? '> 0' : '< 0'} \\Rightarrow \\text{開口向${a > 0 ? '上' : '下'}}`,
      `\\text{y 截距：代 }x=0 \\Rightarrow y = ${yInt}`,
      `\\text{頂點} = (${h},\\; ${k})`,
      crossesX
        ? `\\frac{-k}{a} = ${(-k / a).toFixed?.((-k / a) % 1 === 0 ? 0 : 1)} \\ge 0 \\Rightarrow \\text{與 x 軸有交點}`
        : `\\frac{-k}{a} < 0 \\Rightarrow \\text{與 x 軸無交點}`,
      `\\therefore \\text{${chosen.text}}`,
    ],
    subtypeLabel: '函數圖像 — 頂點式敘述',
  };
};

// ── Type B: y = ax² + bx + c signs from graph (WITH SVG) ────────────────────
const genSignsFromGraphQ = () => {
  const aSign = Math.random() < 0.5 ? 1 : -1;
  const cSign = Math.random() < 0.33 ? 0 : Math.random() < 0.5 ? 1 : -1;
  // b determines axis of symmetry direction; pick random vertex side
  const vertexSide = ['left', 'right', 'center'][randInt(0, 2)];
  // For axis x = -b/(2a):
  //   vertexSide 'right' → axis > 0 → -b/(2a) > 0 → if a>0 then b<0; if a<0 then b>0
  //   vertexSide 'left'  → axis < 0 → opposite
  //   vertexSide 'center' → b ≈ 0
  let bSign;
  if (vertexSide === 'center') bSign = 0;
  else if (vertexSide === 'right') bSign = -aSign;
  else bSign = aSign;

  // We use variable names: default a,b. Sometimes m,n or other pairs.  
  const varSets = [
    { eq: (A, B) => `${A}x^2+x+${B}`, v1: 'm', v2: 'n', hasMiddle: true },
    { eq: (A, B) => `${A}x^2+${B}x+${A === 'a' ? 'b' : 'n'}`, v1: 'a', v2: 'b', hasMiddle: false },
  ];
  const vs = varSets[randInt(0, varSets.length - 1)];
  const v1 = vs.v1, v2 = vs.v2;

  // Build correct answer
  const aLabel = aSign > 0 ? `${v1} > 0` : `${v1} < 0`;
  const bLabel = cSign > 0 ? `${v2} > 0` : cSign < 0 ? `${v2} < 0` : `${v2} = 0`;
  const correct = `${aLabel} \\text{ 及 } ${bLabel}`;

  // 3 wrongs: flip one or both
  const w1 = `${aSign > 0 ? `${v1} < 0` : `${v1} > 0`} \\text{ 及 } ${bLabel}`;
  const w2 = `${aLabel} \\text{ 及 } ${cSign > 0 ? `${v2} < 0` : `${v2} > 0`}`;
  const w3 = `${aSign > 0 ? `${v1} < 0` : `${v1} > 0`} \\text{ 及 } ${cSign > 0 ? `${v2} < 0` : `${v2} > 0`}`;

  const wrongs = [...new Set([w1, w2, w3])].filter(w => w !== correct).slice(0, 3);
  while (wrongs.length < 3) wrongs.push(`${v1} = 0 \\text{ 及 } ${bLabel}`);

  const opts = shuffle([correct, ...wrongs.slice(0, 3)]);

  // equation display
  const eqDisplay = vs.hasMiddle ? `y = ${v1}x^2+x+${v2}` : `y = ${v1}x^2+${v2}x+b`;

  return {
    questionLatex: `\\text{圖中所示為 }${eqDisplay}\\text{ 的圖像，其中 }${v1}\\text{ 及 }${v2}\\text{ 均為常數。下列何者正確？}`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `\\text{圖像開口向${aSign > 0 ? '上' : '下'}} \\Rightarrow ${v1} ${aSign > 0 ? '> 0' : '< 0'}`,
      `\\text{y 截距${cSign > 0 ? '為正' : cSign < 0 ? '為負' : '為 0（過原點）'}} \\Rightarrow ${v2} ${cSign > 0 ? '> 0' : cSign < 0 ? '< 0' : '= 0'}`,
      `\\therefore ${correct}`,
    ],
    subtypeLabel: '函數圖像 — 讀圖判斷符號',
    // Graph data for rendering
    graphData: { aSign, yIntSign: cSign, vertexSide },
  };
};

// ── Type C: y = a(x+b)² signs from graph (WITH SVG) ─────────────────────────
const genVertexSquareSignsQ = () => {
  const aSign = Math.random() < 0.5 ? 1 : -1;
  // vertex at x = -b; if b>0 vertex is left of O, if b<0 vertex is right
  const bSign = Math.random() < 0.5 ? 1 : -1;
  const vertexSide = bSign > 0 ? 'left' : 'right';

  const correct = `${aSign > 0 ? 'a > 0' : 'a < 0'} \\text{ 及 } ${bSign > 0 ? 'b > 0' : 'b < 0'}`;
  const w1 = `${aSign > 0 ? 'a < 0' : 'a > 0'} \\text{ 及 } ${bSign > 0 ? 'b > 0' : 'b < 0'}`;
  const w2 = `${aSign > 0 ? 'a > 0' : 'a < 0'} \\text{ 及 } ${bSign > 0 ? 'b < 0' : 'b > 0'}`;
  const w3 = `${aSign > 0 ? 'a < 0' : 'a > 0'} \\text{ 及 } ${bSign > 0 ? 'b < 0' : 'b > 0'}`;

  const opts = shuffle([correct, w1, w2, w3]);

  return {
    questionLatex: `\\text{圖中所示為 }y = a(x+b)^2\\text{ 的圖像，其中 }a\\text{ 及 }b\\text{ 均為常數。下列何者正確？}`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `\\text{圖像開口向${aSign > 0 ? '上' : '下'}} \\Rightarrow a ${aSign > 0 ? '> 0' : '< 0'}`,
      `\\text{頂點在 y 軸${vertexSide === 'left' ? '左方' : '右方'}，即 }x = -b ${vertexSide === 'left' ? '< 0' : '> 0'}`,
      `\\Rightarrow b ${bSign > 0 ? '> 0' : '< 0'}`,
      `\\therefore ${correct}`,
    ],
    subtypeLabel: '函數圖像 — a(x+b)² 符號',
    graphData: { aSign, yIntSign: 0, vertexSide },
  };
};

// ── Type D: Axis of symmetry from expanded form (NO graph) ──────────────────
const genAxisOfSymmetryQ = () => {
  // y = -2x² + ax + b; given y-intercept and one root, find axis
  const leadCoeff = (Math.random() < 0.5 ? 1 : -1) * randInt(1, 3);
  const axisVal = randInt(1, 6);
  // b_coeff = -2 * leadCoeff * axisVal (from x = -b/(2a))
  const bCoeff = -2 * leadCoeff * axisVal;
  const cVal = randInt(-12, 12);

  const aStr = leadCoeff === 1 ? '' : leadCoeff === -1 ? '-' : `${leadCoeff}`;
  const bStr = bCoeff === 0 ? '' : bCoeff > 0 ? `+${bCoeff}` : `${bCoeff}`;
  const cStr = cVal === 0 ? '' : cVal > 0 ? `+${cVal}` : `${cVal}`;

  const correct = `x = ${axisVal}`;
  const wrongs = [`x = ${-axisVal}`, `x = ${axisVal + 1}`, `x = ${axisVal * 2}`, `y = ${axisVal}`]
    .filter(w => w !== correct);
  const uniqueWrongs = [...new Set(wrongs)].slice(0, 3);

  const opts = shuffle([correct, ...uniqueWrongs]);

  return {
    questionLatex: `\\text{函數 }y = ${aStr}x^2${bStr}x${cStr}\\text{ 的圖像之對稱軸方程為}`,
    options: opts.map(o => o),
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `a = ${leadCoeff},\\; b = ${bCoeff}`,
      `\\text{對稱軸：}x = -\\frac{b}{2a} = -\\frac{${bCoeff}}{2(${leadCoeff})} = -\\frac{${bCoeff}}{${2 * leadCoeff}} = ${axisVal}`,
      `\\therefore x = ${axisVal}`,
    ],
    subtypeLabel: '函數圖像 — 對稱軸',
  };
};

// ── Type E: Point substitution — find k (NO graph) ──────────────────────────
const genPointSubQ = () => {
  const a = (Math.random() < 0.5 ? 1 : -1) * randInt(1, 3);
  const b = (Math.random() < 0.5 ? 1 : -1) * randInt(1, 6);
  const xVal = randInt(1, 4);
  const yVal = a * xVal * xVal + b * xVal; // c = 0 so we can ask for k = y when pass through (xVal, k)
  const c = randInt(-8, 8);
  const k = a * xVal * xVal + b * xVal + c;

  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const bStr = b === 0 ? '' : b > 0 ? `+${b}` : `${b}`;
  const cStr = `+c`;

  const correct = String(k);
  const pool = [...new Set([k + 1, k - 1, k + 2, k - 2, -k, a * xVal * xVal + c].map(String))]
    .filter(w => w !== correct);
  const wrongs = pool.slice(0, 3);
  while (wrongs.length < 3) wrongs.push(String(k + wrongs.length + 3));

  const opts = shuffle([correct, ...wrongs]);

  return {
    questionLatex: `\\text{圖中，}y = ${aStr}x^2${bStr}x+c\\text{ 的圖像通過點 }(${xVal},\\; k)\\text{。若 }c = ${c}\\text{，求 }k\\text{ 的值。}`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanationLines: [
      `\\text{代 }x = ${xVal}\\text{ 入 }y = ${aStr}x^2${bStr}x+${c}`,
      `y = ${a}(${xVal})^2 ${b >= 0 ? '+' : ''}${b}(${xVal}) + ${c}`,
      `= ${a * xVal * xVal} ${b * xVal >= 0 ? '+' : ''}${b * xVal} ${c >= 0 ? '+' : ''}${c}`,
      `= ${k}`,
      `\\therefore k = ${k}`,
    ],
    subtypeLabel: '函數圖像 — 代點求值',
  };
};

// ── Type F: Factored/product form statement (NO graph, like 19-10) ──────────
const genFactoredFormQ = () => {
  const p = randInt(1, 5);
  const q = randInt(1, 5);
  const r = randInt(1, 8);
  // y = (p - x)(x + q) + r  = -x² + (p-q)x + pq + r
  const aCoeff = -1;
  const bCoeff = p - q;
  const cCoeff = p * q + r;
  const yInt = cCoeff;

  // Statements
  const s1_correct = true; // opens downward (a=-1<0)
  const s1_text = '該圖像開口向下。';
  const s1_wrong_text = '該圖像開口向上。';

  // Check point: does it pass through some specific point?
  // At x=p: y = 0*(p+q)+r = r → passes through (p, r)
  // At x=-q: y = (p+q)*0+r = r → passes through (-q, r)
  const testX = p;
  const testY = r;
  const s2_text = `該圖像通過點 (${testX}, ${testY})。`;
  const s2_correct = true;

  // x-intercepts: (p-x)(x+q)+r = 0 → not simply x=p or x=-q (because of +r)
  const s3_text = `該圖像的 x 截距為 ${-q} 及 ${p}。`;
  const s3_correct = false; // false because of +r

  // y-intercept
  const s4_text = `該圖像的 y 截距為 ${r}。`;
  const s4_correct = yInt === r; // pq + r ≠ r unless pq=0

  const s5_text = `該圖像的 y 截距為 ${yInt}。`;
  const s5_correct = true;

  // Pick statements for I, II, III format or simple 4-option
  // Use simple 4-option: pick 1 correct + 3 wrong  
  const pool = [
    { t: s1_text, c: true },
    { t: s1_wrong_text, c: false },
    { t: s2_text, c: true },
    { t: s3_text, c: false },
    { t: s4_text, c: s4_correct },
    { t: s5_text, c: true },
    { t: `該圖像通過點 (${-q}, ${r + 1})。`, c: false },
  ];

  const corrPool = pool.filter(s => s.c);
  const wrongPool = pool.filter(s => !s.c);
  const chosen = corrPool[randInt(0, corrPool.length - 1)];
  const wrongOpts = shuffle(wrongPool).slice(0, 3);

  const opts = shuffle([chosen, ...wrongOpts]);
  const correctIndex = opts.indexOf(chosen);

  return {
    questionLatex: `\\text{下列有關 }y = (${p}-x)(x+${q})+${r}\\text{ 的圖像之敘述，何者正確？}`,
    options: opts.map(o => `\\text{${o.t}}`),
    correctIndex,
    explanationLines: [
      `y = (${p}-x)(x+${q})+${r} = -x^2+${bCoeff === 0 ? '' : (bCoeff > 0 ? bCoeff : `(${bCoeff})`)}x+${cCoeff}`,
      `a = -1 < 0 \\Rightarrow \\text{開口向下}`,
      `\\text{y 截距：代 }x=0 \\Rightarrow y = ${p} \\times ${q} + ${r} = ${cCoeff}`,
      `\\text{代 }x=${p}\\text{：}y = 0 \\times (${p}+${q})+${r} = ${r} \\Rightarrow \\text{通過 }(${p},${r})`,
      `\\text{注意：x 截距不是 }${p}\\text{ 和 }${-q}\\text{（因為有 }+${r}\\text{）}`,
      `\\therefore \\text{${chosen.t}}`,
    ],
    subtypeLabel: '函數圖像 — 因式形式敘述',
  };
};

// Master generator for function graph topic
const generateFunctionGraphQuestion = () => {
  const gens = [
    { fn: genVertexFormQ, w: 25 },
    { fn: genSignsFromGraphQ, w: 20 },
    { fn: genVertexSquareSignsQ, w: 15 },
    { fn: genAxisOfSymmetryQ, w: 15 },
    { fn: genPointSubQ, w: 15 },
    { fn: genFactoredFormQ, w: 10 },
  ];
  const total = gens.reduce((s, g) => s + g.w, 0);
  let r = Math.random() * total;
  for (const g of gens) { r -= g.w; if (r <= 0) return g.fn(); }
  return genVertexFormQ();
};

// ─── Function Graph Quiz Component ──────────────────────────────────────────
const FunctionGraphQuiz = ({ onBack }) => {
  const [question, setQuestion] = useState(() => generateFunctionGraphQuestion());
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(generateFunctionGraphQuestion());
    setSelected(null);
  }, []);

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

      {/* Question stem */}
      <div className="text-base font-semibold text-slate-700 mb-3">
        <InlineMath math={question.questionLatex} />
      </div>

      {/* Graph if present */}
      {question.graphData && (
        <div className="flex justify-center mb-4 bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
          <ParabolaSVG
            aSign={question.graphData.aSign}
            yIntSign={question.graphData.yIntSign}
            vertexSide={question.graphData.vertexSide}
          />
        </div>
      )}

      {/* Options */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-5">
        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <OptionBtn
              key={`${idx}-${question.subtypeLabel}`}
              label={optionLabels[idx]}
              optionLatex={opt}
              state={getState(idx)}
              onClick={() => handleSelect(idx)}
            />
          ))}
        </div>
      </div>

      {/* Explanation */}
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
          <div className="bg-white rounded-lg px-4 py-3 space-y-1">
            {(question.explanationLines || []).map((line, i) => (
              <div key={i}><InlineMath math={line} /></div>
            ))}
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

// ─── Notes Component for Function Graphs ───────────────────────────────────────
const FunctionGraphNotes = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
      <ArrowLeft className="w-5 h-5" /> 返回
    </button>
    <h1 className="text-2xl font-bold text-slate-800 mb-2 border-b-2 border-orange-400 pb-3">
      📈 筆記：函數圖像 — <InlineMath math="y = ax^2+bx+c" /> 的 a、b、c
    </h1>
    <p className="text-sm text-slate-500 mb-6">F4 CH3 · 二次函數</p>

    <div className="space-y-8 text-slate-700">

      {/* 0: Intro */}
      <section className="bg-orange-50 rounded-xl p-5 border-2 border-orange-200">
        <div className="text-center mb-3">
          <span className="text-3xl font-black tracking-tight">
            <span className="text-slate-700">y = </span>
            <span className="text-orange-500">a</span>
            <span className="text-slate-700">x² + </span>
            <span className="text-amber-500">b</span>
            <span className="text-slate-700">x + </span>
            <span className="text-sky-500">c</span>
          </span>
        </div>
        <p className="text-sm text-center text-slate-600">
          呢條公式反映一幅<strong>拋物線</strong>嘅圖像。<br />
          <span className="text-orange-500 font-bold">a</span>、<span className="text-amber-500 font-bold">b</span>、<span className="text-sky-500 font-bold">c</span> 各自幫你搵圖像上嘅不同資訊 🔖
        </p>
      </section>

      {/* 1: a — Direction */}
      <section className="bg-orange-50 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-orange-500 text-white font-black text-lg px-3 py-1 rounded-lg">a</span>
          <h2 className="text-lg font-bold text-orange-800">開口方向</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* a > 0 */}
          <div className="bg-white rounded-xl p-4 border-2 border-yellow-300 shadow-sm flex flex-col items-center">
            <div className="text-base font-bold text-slate-700 mb-1"><InlineMath math="a > 0" /></div>
            <div className="text-xs text-slate-500 mb-3">開口向上</div>
            {/* SVG smiley parabola */}
            <svg viewBox="0 0 120 100" className="w-36 h-28">
              {/* axes */}
              <line x1="10" y1="70" x2="110" y2="70" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr1)" />
              <line x1="60" y1="95" x2="60" y2="5" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr1)" />
              <defs>
                <marker id="arr1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
                </marker>
              </defs>
              {/* upward parabola */}
              <path d="M 20,20 Q 60,150 100,20" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              {/* eyes */}
              <circle cx="42" cy="45" r="5" fill="#1e293b" />
              <circle cx="78" cy="45" r="5" fill="#1e293b" />
            </svg>
            <div className="mt-1 bg-yellow-100 text-yellow-800 font-bold text-sm px-3 py-1 rounded-full">正數：笑哈哈 🙂</div>
          </div>

          {/* a < 0 */}
          <div className="bg-white rounded-xl p-4 border-2 border-sky-300 shadow-sm flex flex-col items-center">
            <div className="text-base font-bold text-slate-700 mb-1"><InlineMath math="a < 0" /></div>
            <div className="text-xs text-slate-500 mb-3">開口向下</div>
            <svg viewBox="0 0 120 100" className="w-36 h-28">
              <line x1="10" y1="60" x2="110" y2="60" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr2)" />
              <line x1="60" y1="95" x2="60" y2="5" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr2)" />
              <defs>
                <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
                </marker>
              </defs>
              {/* downward parabola */}
              <path d="M 20,95 Q 60,-30 100,95" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
              {/* eyes */}
              <circle cx="42" cy="45" r="5" fill="#1e293b" />
              <circle cx="78" cy="45" r="5" fill="#1e293b" />
            </svg>
            <div className="mt-1 bg-sky-100 text-sky-800 font-bold text-sm px-3 py-1 rounded-full">負數：喊哈哈 ☹️</div>
          </div>
        </div>

        <div className="mt-4 bg-orange-100 rounded-lg px-4 py-3 text-sm text-orange-800">
          <strong>記法：</strong>正數笑😊，負數喊😢 — <em>a</em> 如人臉，正面就笑，負面就喊！
        </div>
      </section>

      {/* 2: c — y-intercept */}
      <section className="bg-sky-50 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-sky-500 text-white font-black text-lg px-3 py-1 rounded-lg">c</span>
          <h2 className="text-lg font-bold text-sky-800">y 截距</h2>
        </div>

        <div className="bg-white rounded-xl p-4 border border-sky-200 shadow-sm">
          <p className="text-sm mb-3">
            <span className="text-sky-500 font-black text-xl">c</span> 就係圖像與 <strong>y 軸的交點</strong>。
          </p>
          <div className="bg-sky-50 rounded-lg px-4 py-3 border border-sky-200 text-sm">
            <p className="font-semibold text-sky-700 mb-1">原因：</p>
            <p>代入 <InlineMath math="x = 0" />：</p>
            <BlockMath math="y = a(0)^2 + b(0) + c = c" />
            <p className="text-slate-600">∴ y 截距 = <span className="font-bold text-sky-600">c</span>，交點為 <InlineMath math="(0,\ c)" /></p>
          </div>
        </div>
      </section>

      {/* 3: b — Axis of Symmetry */}
      <section className="bg-amber-50 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-amber-500 text-white font-black text-lg px-3 py-1 rounded-lg">b</span>
          <h2 className="text-lg font-bold text-amber-800">對稱軸</h2>
        </div>

        <div className="bg-amber-100 rounded-lg px-4 py-3 mb-4 text-sm text-amber-800">
          ⚠️ <strong>b 無單獨所代表的資訊</strong>，但可以<strong>配合 a</strong> 用於搵對稱軸！
        </div>

        <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded">公式</span>
              <span className="text-lg font-bold">
                <InlineMath math="x = -\dfrac{b}{2a}" />
              </span>
            </div>
            <div className="bg-amber-50 rounded-lg px-3 py-2 border border-amber-200 text-xs text-amber-700">
              <strong>記法：</strong>計算 b ÷ 2a，加個負號，就係對稱軸 x 的值。
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200 text-sm">
              <p className="font-semibold text-slate-700 mb-1">例：<InlineMath math="y = 2x^2 - 8x + 3" /></p>
              <p className="text-slate-600"><InlineMath math="a=2,\ b=-8" /></p>
              <BlockMath math="x = -\frac{-8}{2(2)} = \frac{8}{4} = 2" />
              <p className="text-slate-600">∴ 對稱軸為 <InlineMath math="x = 2" /></p>
            </div>
          </div>

          {/* SVG axis of symmetry diagram */}
          <svg viewBox="0 0 140 120" className="w-40 h-40 shrink-0">
            <line x1="10" y1="85" x2="130" y2="85" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrB)" />
            <line x1="30" y1="115" x2="30" y2="5" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrB)" />
            <defs>
              <marker id="arrB" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
              </marker>
            </defs>
            {/* upward parabola */}
            <path d="M 20,25 Q 75,160 130,25" fill="none" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round" />
            {/* dashed axis of symmetry */}
            <line x1="75" y1="110" x2="75" y2="10" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" />
            {/* label */}
            <text x="50" y="118" fontSize="10" fill="#374151" fontWeight="bold">x</text>
            <text x="58" y="118" fontSize="10" fill="#374151" fontWeight="bold">=</text>
            <text x="66" y="118" fontSize="10" fill="#374151" fontWeight="bold">-</text>
            <text x="74" y="111" fontSize="9" fill="#f59e0b" fontWeight="bold">b</text>
            <line x1="72" y1="114" x2="84" y2="114" stroke="#374151" strokeWidth="1.5" />
            <text x="72" y="122" fontSize="9" fill="#374151" fontWeight="bold">2a</text>
          </svg>
        </div>
      </section>

      {/* 4: Summary */}
      <section className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">📋 總結</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-orange-200 shadow-sm">
            <span className="bg-orange-500 text-white font-black text-base px-2.5 py-0.5 rounded shrink-0 mt-0.5">a</span>
            <div>
              <p className="font-bold text-orange-800">開口方向</p>
              <p className="text-sm text-slate-600"><InlineMath math="a>0" /> → 開口向上（笑）　<InlineMath math="a<0" /> → 開口向下（喊）</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-sky-200 shadow-sm">
            <span className="bg-sky-500 text-white font-black text-base px-2.5 py-0.5 rounded shrink-0 mt-0.5">c</span>
            <div>
              <p className="font-bold text-sky-800">y 截距</p>
              <p className="text-sm text-slate-600">圖像與 y 軸交於 <InlineMath math="(0,\ c)" /></p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-amber-200 shadow-sm">
            <span className="bg-amber-500 text-white font-black text-base px-2.5 py-0.5 rounded shrink-0 mt-0.5">b</span>
            <div>
              <p className="font-bold text-amber-800">對稱軸</p>
              <p className="text-sm text-slate-600"><InlineMath math="x = -\dfrac{b}{2a}" />（b 獨立無意義，要配合 a）</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
);

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
  {
    id: 'function-graph',
    title: '函數圖像',
    desc: 'y = ax²+bx+c 中 a、b、c 的意義：開口方向、y 截距、對稱軸公式',
    icon: '📈',
    color: 'from-orange-500 to-amber-600',
    badges: [{ level: 'F4', chapter: 'CH3', subject: '二次函數' }],
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
    if (activeTopic.id === 'function-graph') return <FunctionGraphQuiz onBack={() => setView('home')} />;
  }
  if (view === 'notes' && activeTopic) {
    if (activeTopic.id === 'binary')   return <BinaryNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'hcf-lcm') return <HCFLCMNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'variation') return <VariationNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'complex') return <ComplexNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'function-graph') return <FunctionGraphNotes onBack={() => setView('home')} />;
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
              {!topic.notesOnly && (
                <button
                  onClick={() => { setActiveTopic(topic); setView('quiz'); }}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition shadow">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  開始練習
                </button>
              )}
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
