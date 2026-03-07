import { shuffle, randInt } from '../utils.js';

const toBin = (n) => (n >>> 0).toString(2);
const binStr = (n) => `\\text{${toBin(n)}}_2`;

const coeffPow2 = (k, n) =>
  n === 0 ? String(k) : k === 1 ? `2^{${n}}` : `${k} \\times 2^{${n}}`;

const fmtBinExpr = (terms) => {
  return terms.map((t, i) => {
    const s = coeffPow2(t.k, t.n ?? 0);
    return (i === 0 || s.startsWith('-')) ? s : `+${s}`;
  }).join('');
};

// ── Type A: k * (2^a + 2^b [+ 2^c]) – repeated bit-pattern ──────────────────
const genBinaryRepeatedQ = () => {
  const kOptions = [
    { k: 3,  bw: 2 },
    { k: 5,  bw: 3 },
    { k: 7,  bw: 3 },
    { k: 9,  bw: 4 },
    { k: 11, bw: 4 },
    { k: 13, bw: 4 },
    { k: 6,  bw: 3 },
    { k: 10, bw: 4 },
  ];
  const { k, bw } = kOptions[randInt(0, kOptions.length - 1)];
  const gap = bw + randInt(1, 3);
  const num_terms = Math.random() < 0.6 ? 3 : 2;
  const offsets = [0];
  for (let i = 1; i < num_terms; i++) offsets.push(offsets[i - 1] + gap + randInt(0, 2));
  const maxOffset = offsets[offsets.length - 1];
  if (maxOffset + bw > 16) return genBinaryRepeatedQ();

  const value = offsets.reduce((s, o) => s + k * Math.pow(2, o), 0);
  const binDisplay = binStr(value);

  const correctTerms = [...offsets].reverse().map(o => ({ k, n: o === 0 ? null : o }));
  const correctLatex = correctTerms.map((t, i) => {
    const s = t.n !== null ? `${k} \\times 2^{${t.n}}` : String(k);
    return i === 0 ? s : `+${s}`;
  }).join('');

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

// ── Type B: Binary → k×2^n + r ───────────────────────────────────────────────
const genBinaryCoeffRemainderQ = () => {
  const highN  = randInt(7, 12);
  const k      = randInt(2, 15);
  const r      = randInt(1, (1 << Math.min(highN - 1, 7)) - 1);
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

// ── Type C: Powers-of-2 expression → binary ──────────────────────────────────
const genExprToBinaryQ = () => {
  const numPowers = randInt(3, 5);
  const pool = Array.from({ length: 14 }, (_, i) => i + 1);
  const powers = shuffle(pool).slice(0, numPowers).sort((a, b) => b - a);
  const addConst = Math.random() < 0.5 ? randInt(1, 5) : 0;
  const value = powers.reduce((s, p) => s + Math.pow(2, p), 0) + addConst;
  if (value > 65535) return genExprToBinaryQ();

  const correctBin = toBin(value);

  const termList = powers.map(p => p === 1 ? '2' : `2^{${p}}`);
  if (addConst > 0) termList.push(String(addConst));
  const questionExpr = termList.join('+');

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

// ── Type D: Arithmetic with coefficients → binary ─────────────────────────────
const genArithToBinaryQ = () => {
  const base1 = randInt(8, 11);
  const k1    = randInt(2, 9);
  const base2 = randInt(4, base1 - 2);
  const k2    = randInt(1, 4);
  const sgn   = Math.random() < 0.4 ? -1 : 1;
  const base3 = randInt(0, base2 - 1);
  const k3    = randInt(1, 4);
  const value = k1 * Math.pow(2, base1) + k2 * Math.pow(2, base2) + sgn * k3 * Math.pow(2, base3);
  if (value <= 0 || value > 65535) return genArithToBinaryQ();

  const correctBin = toBin(value);

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

// ─── Master generator ─────────────────────────────────────────────────────────
export const generateBinaryQuestion = () => {
  const gens = [
    { fn: genBinaryRepeatedQ,       w: 25 },
    { fn: genBinaryCoeffRemainderQ,  w: 35 },
    { fn: genExprToBinaryQ,         w: 25 },
    { fn: genArithToBinaryQ,        w: 15 },
  ];
  const total = gens.reduce((s, g) => s + g.w, 0);
  let r = Math.random() * total;
  for (const g of gens) {
    r -= g.w;
    if (r <= 0) { try { return g.fn(); } catch (e) { /* retry */ } }
  }
  return genBinaryCoeffRemainderQ();
};
