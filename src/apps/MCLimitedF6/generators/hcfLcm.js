import { gcd, lcm, gcdMany, lcmMany, shuffle, randInt, monomialLatex, makeWrongExps } from '../utils.js';

// ─── Type 1 & 2: HCF / LCM of 3 pure monomials (no coefficients) ─────────────
export const genHCFLCMMonomialQ = (mode) => {
  const varPools = [['x', 'y', 'z'], ['a', 'b', 'c'], ['u', 'v', 'w'], ['p', 'q', 'r']];
  const poolIdx = randInt(0, varPools.length - 1);
  const vars = varPools[poolIdx];

  const exprExps = [];
  const targetExps = {};

  for (const v of vars) {
    const base = mode === 'hcf' ? randInt(1, 2) : randInt(1, 2);
    const spread = 3;
    const fixedE = mode === 'hcf' ? base : base + spread;
    const exps = [];
    for (let i = 0; i < 3; i++) exps.push(base + randInt(0, spread));
    exps[randInt(0, 2)] = fixedE;
    targetExps[v] = fixedE;
    exprExps.push(exps);
  }

  const expMaps = [0, 1, 2].map(i => {
    const m = {};
    vars.forEach((v, vi) => { m[v] = exprExps[vi][i]; });
    return m;
  });

  for (const v of vars) {
    const actual = mode === 'hcf'
      ? Math.min(...expMaps.map(m => m[v]))
      : Math.max(...expMaps.map(m => m[v]));
    targetExps[v] = actual;
  }

  const exprStrs = expMaps.map(m => monomialLatex(vars, m));

  if (new Set(exprStrs).size < 3) return genHCFLCMMonomialQ(mode);

  const answerStr = monomialLatex(vars, targetExps);

  const wrongs = makeWrongExps(vars, targetExps, expMaps, mode).map(w => monomialLatex(vars, w));
  const uniqueWrongs = [...new Set(wrongs)].filter(w => w !== answerStr).slice(0, 3);

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

// ─── Type 3: HCF / LCM of 3 monomials WITH integer coefficients ──────────────
export const COEFF_TRIPLES = [
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

export const genHCFLCMCoeffQ = (mode) => {
  const varPools = [['a', 'b'], ['x', 'y'], ['p', 'q'], ['m', 'n']];
  const vars = varPools[randInt(0, varPools.length - 1)];
  const triple = COEFF_TRIPLES[randInt(0, COEFF_TRIPLES.length - 1)];
  const [c1, c2, c3] = triple;
  const targetCoeff = mode === 'hcf' ? gcdMany(triple) : lcmMany(triple);

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

  if (new Set(exprStrs).size < 3) return genHCFLCMCoeffQ(mode);

  const answerStr = monomialLatex(vars, targetExps, targetCoeff);

  const oppCoeff = mode === 'hcf' ? lcmMany(triple) : gcdMany(triple);
  const oppExps = {};
  for (const v of vars) {
    oppExps[v] = mode === 'hcf'
      ? Math.max(...expMaps.map(m => m[v]))
      : Math.min(...expMaps.map(m => m[v]));
  }
  const sumExps = {};
  for (const v of vars) {
    sumExps[v] = expMaps.reduce((acc, m) => acc + m[v], 0);
  }

  const allWrongs = [
    monomialLatex(vars, oppExps, oppCoeff),
    monomialLatex(vars, oppExps, targetCoeff),
    monomialLatex(vars, targetExps, oppCoeff),
    monomialLatex(vars, sumExps, targetCoeff),
    monomialLatex(vars, sumExps, oppCoeff),
  ].filter(w => w !== answerStr);

  const uniqueWrongs = [...new Set(allWrongs)].slice(0, 3);
  const opts = shuffle([answerStr, ...uniqueWrongs]);
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
      `\\textbf{${label}} \\text{ → 數字取${mode === 'hcf' ? '最大公因數' : '最小公倍數'}，代數取${ruleText}指數}`,
      `\\text{${c1}, ${c2}, ${c3} 的${mode === 'hcf' ? '公因數' : '公倍數'}為 } ${targetCoeff}`,
      ...varBreakdown,
      `\\therefore \\text{${label}} = ${answerStr}`,
    ],
    subtypeLabel: `${label} — 含係數單項式`,
  };
};

// ─── Type 4: HCF of factored polynomial expressions ──────────────────────────
export const FACTOR_TEMPLATES = [
  { factors: ['x', '(x+1)', '(x+2)'] },
  { factors: ['x', '(x-1)', '(x+1)'] },
  { factors: ['x', '(x+2)', '(x-2)'] },
  { factors: ['(x+1)', '(x+2)', '(x+3)'] },
  { factors: ['x', '(x+3)', '(x-3)'] },
  { factors: ['x', '(x+1)', '(x-2)'] },
];

export const genHCFFactoredQ = () => {
  const tmpl = FACTOR_TEMPLATES[randInt(0, FACTOR_TEMPLATES.length - 1)];
  const factors = tmpl.factors;

  const e1 = factors.map(() => randInt(1, 3));
  const e2 = factors.map(() => randInt(1, 3));

  const hcfExps = factors.map((_, i) => Math.min(e1[i], e2[i]));
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

  const lcmStr = toExpStr(lcmExps);
  const w2Exps = [...hcfExps]; w2Exps[0] = e1[0];
  const w3Exps = factors.map((_, i) => Math.max(e1[i], e2[i]) - 1 >= 1 ? Math.max(e1[i], e2[i]) - 1 : 1);
  const w4Exps = factors.map((_, i) => Math.min(e1[i], e2[i]) + 1);

  const wrongs = [lcmStr, toExpStr(w2Exps), toExpStr(w3Exps), toExpStr(w4Exps)]
    .filter(w => w !== answerStr);
  const uniqueWrongs = [...new Set(wrongs)].slice(0, 3);

  const opts = shuffle([answerStr, ...uniqueWrongs]);
  const correctIdx = opts.indexOf(answerStr);

  const factorPowStr = (f, e) => (e === 1 ? f : `${f}^{${e}}`);
  const factorBreakdown = factors.map((f, i) =>
    `${factorPowStr(f, e1[i])},\\ ${factorPowStr(f, e2[i])} \\rightarrow \\text{最小次方：}${factorPowStr(f, hcfExps[i])}`
  );

  return {
    type: 'hcf',
    questionLatex: `${expr1Str} \\text{ 及 } ${expr2Str} \\text{ 的 H.C.F. 為}`,
    options: opts,
    correctIndex: correctIdx,
    explanationLines: [
      `\\textbf{H.C.F.} \\text{ → 對每個因式取最小次方}`,
      ...factorBreakdown,
      `\\therefore \\text{H.C.F.} = ${answerStr}`,
    ],
    subtypeLabel: 'H.C.F. — 因式形式多項式',
  };
};

// ─── Type 5: Find 3rd expression given HCF, LCM, two of three monomials ──────
export const genFindThirdQ = () => {
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

    const forcedByMin = Math.random() < 0.5;

    if (forcedByMin) {
      e3[v] = h;
      e1[v] = randInt(h + 1, l);
      e2[v] = randInt(h + 1, l);
      if (Math.max(e1[v], e2[v]) < l) e1[v] = l;
    } else {
      e3[v] = l;
      e1[v] = randInt(h, l - 1);
      e2[v] = randInt(h, l - 1);
      if (Math.min(e1[v], e2[v]) > h) e1[v] = h;
    }
  }

  const hcfStr = monomialLatex(vars, hcfExps);
  const lcmStr = monomialLatex(vars, lcmExps);
  const expr1Str = monomialLatex(vars, e1);
  const expr2Str = monomialLatex(vars, e2);
  const answerStr = monomialLatex(vars, e3);

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

// ─── Type 6: Template-based HCF/LCM of factorable polynomial expressions ──────
export const FACTORED_POLY_TEMPLATES = [
  {
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
    var: 'x',
    exprs: ['x^2-1', 'x^2+2x+1'],
    factored: ['(x+1)(x-1)', '(x+1)^2'],
    mode: 'lcm',
    answer: '(x-1)(x+1)^2',
    wrongs: ['(x+1)', '(x-1)(x+1)', '(x-1)^2(x+1)^2'],
    hint: 'x^2-1=(x+1)(x-1),\\ x^2+2x+1=(x+1)^2',
  },
  {
    var: 'x',
    exprs: ['x^3-x^2', 'x^2-x'],
    factored: ['x^2(x-1)', 'x(x-1)'],
    mode: 'hcf',
    answer: 'x(x-1)',
    wrongs: ['x^2(x-1)', 'x', 'x^2(x-1)^2'],
    hint: 'x^3-x^2=x^2(x-1),\\ x^2-x=x(x-1)',
  },
  {
    var: 'a',
    exprs: ['a^3-a^2b', 'a^2b-ab^2'],
    factored: ['a^2(a-b)', 'ab(a-b)'],
    mode: 'hcf',
    answer: 'a(a-b)',
    wrongs: ['a^2b(a-b)', 'a^2(a-b)', 'ab'],
    hint: 'a^3-a^2b=a^2(a-b),\\ a^2b-ab^2=ab(a-b)',
  },
  {
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

export const genFactoredPolyQ = () => {
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

// ─── Master generator ─────────────────────────────────────────────────────────
export const generateQuestion = () => {
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
