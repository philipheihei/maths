import { shuffle, randInt } from '../utils.js';

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

// Type B: i^n(βi ± c) simplify, options in a+bi form with symbolic β
const genIExprSymQ = () => {
  const n = randInt(2, 7);
  const sgn = Math.random() < 0.5 ? 1 : -1;
  const c = randInt(1, 5);
  const p = iCycle(n);
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
  const mS = m > 1 ? `${m}` : '';
  const correct = `${mS}${pVar}-${n}`;
  const w1 = `${mS}${pVar}+${n}`;
  const w2 = n > 1 ? `${n}${pVar}-${m}` : `${pVar}-${m}`;
  const w3 = `${m + n}${pVar}`;
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

// Type D: ak - (b + ki)/i = ?  (k is real)
const genDivideByIQ = () => {
  const a = randInt(2, 6);
  const b = randInt(1, 5);
  const realCoeff = a - 1;
  const imConst = b;
  const correct = `${realCoeff}k+${imConst}i`;
  const w1 = `${realCoeff}k-${imConst}i`;
  const w2 = `${a + 1}k+${imConst}i`;
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
  const correct = `\\frac{${a2}k-${a1}}{k^2+1}`;
  const w1 = `\\frac{${a2}k+${a1}}{k^2+1}`;
  const w2 = `\\frac{${a1}k-${a2}}{k^2+1}`;
  const w3 = `\\frac{${a2}k-${a1}}{k^2-1}`;
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

export const generateComplexQuestion = () => {
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
