import React from 'react';
import { shuffle, randInt } from '../utils.js';

// ─── ParabolaSVG helper ───────────────────────────────────────────────────────
export const ParabolaSVG = ({ aSign, yIntSign, vertexSide, className = '' }) => {
  const W = 140, H = 130;
  const axisY = aSign > 0 ? 70 : 60;
  const axisX = vertexSide === 'right' ? 50 : vertexSide === 'left' ? 90 : 70;
  const vx = vertexSide === 'right' ? 85 : vertexSide === 'left' ? 55 : 70;
  const vy = aSign > 0 ? axisY + 40 : axisY - 40;
  const yIntY = yIntSign < 0 ? axisY + 15 : yIntSign > 0 ? axisY - 15 : axisY;
  const distSq = (axisX - vx) * (axisX - vx);
  let k = distSq > 0.1 ? (yIntY - vy) / distSq : (aSign > 0 ? -0.04 : 0.04);
  let exactYIntY = yIntY;
  
  // Double check consistency just in case
  if ((aSign > 0 && k > 0) || (aSign < 0 && k < 0)) {
    k = aSign > 0 ? -0.04 : 0.04;
    exactYIntY = vy + k * distSq;
  }
  
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
      <line x1="5" y1={axisY} x2={W - 5} y2={axisY} stroke="#374151" strokeWidth="1.5" markerEnd="url(#fgArr)" />
      <line x1={axisX} y1={H - 5} x2={axisX} y2="5" stroke="#374151" strokeWidth="1.5" markerEnd="url(#fgArr)" />
      <text x={W - 10} y={axisY + 12} fontSize="10" fill="#374151" fontWeight="bold">x</text>
      <text x={axisX + 5} y="14" fontSize="10" fill="#374151" fontWeight="bold">y</text>
      <text x={axisX - 10} y={axisY + 12} fontSize="9" fill="#374151">O</text>
      {pathD && <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" />}
      <circle cx={axisX} cy={exactYIntY} r="3" fill="#f59e0b" />
    </svg>
  );
};

// ── Type A: Vertex form y = a(x−h)² + k — statement check (NO graph) ────────
const genVertexFormQ = () => {
  const a = (Math.random() < 0.5 ? 1 : -1) * randInt(1, 4);
  const h = randInt(-6, 6);
  const k = randInt(-9, 9);
  const yInt = a * h * h + k;
  const crossesX = (-k / a) >= 0;
  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const hPart = h === 0 ? 'x' : h > 0 ? `(x-${h})` : `(x+${-h})`;
  const kPart = k === 0 ? '' : k > 0 ? `+${k}` : `${k}`;
  const eqLatex = `y = ${aStr}${hPart}^2${kPart}`;

  const stmts = [];
  stmts.push({ text: a > 0 ? '該圖像開口向上。' : '該圖像開口向下。', correct: true });
  stmts.push({ text: a > 0 ? '該圖像開口向下。' : '該圖像開口向上。', correct: false });
  stmts.push({ text: `該圖像的 y 截距為 ${k}。`, correct: yInt === k });
  if (yInt !== k) {
    stmts.push({ text: `該圖像的 y 截距為 ${yInt}。`, correct: true });
  }
  stmts.push({ text: `該圖像通過點 (${h}, ${k})。`, correct: true });
  if (-h !== h) {
    stmts.push({ text: `該圖像通過點 (${-h}, ${k})。`, correct: false });
  }
  stmts.push({ text: crossesX ? '該圖像與 x 軸沒有相交。' : '該圖像與 x 軸相交。', correct: false });
  stmts.push({ text: !crossesX ? '該圖像與 x 軸沒有相交。' : '該圖像與 x 軸相交。', correct: true });

  const corrects = stmts.filter(s => s.correct);
  const wrongs = stmts.filter(s => !s.correct);
  const chosen = corrects[randInt(0, corrects.length - 1)];
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
        ? `\\frac{-k}{a} \\ge 0 \\Rightarrow \\text{與 x 軸有交點}`
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
  const vertexSide = ['left', 'right', 'center'][randInt(0, 2)];
  let bSign;
  if (vertexSide === 'center') bSign = 0;
  else if (vertexSide === 'right') bSign = -aSign;
  else bSign = aSign;

  const varSets = [
    { eq: (A, B) => `${A}x^2+x+${B}`, v1: 'm', v2: 'n', hasMiddle: true },
    { eq: (A, B) => `${A}x^2+${B}x+${A === 'a' ? 'b' : 'n'}`, v1: 'a', v2: 'b', hasMiddle: false },
  ];
  const vs = varSets[randInt(0, varSets.length - 1)];
  const v1 = vs.v1, v2 = vs.v2;

  const aLabel = aSign > 0 ? `${v1} > 0` : `${v1} < 0`;
  const bLabel = cSign > 0 ? `${v2} > 0` : cSign < 0 ? `${v2} < 0` : `${v2} = 0`;
  const correct = `${aLabel} \\text{ 及 } ${bLabel}`;

  const w1 = `${aSign > 0 ? `${v1} < 0` : `${v1} > 0`} \\text{ 及 } ${bLabel}`;
  const w2 = `${aLabel} \\text{ 及 } ${cSign > 0 ? `${v2} < 0` : `${v2} > 0`}`;
  const w3 = `${aSign > 0 ? `${v1} < 0` : `${v1} > 0`} \\text{ 及 } ${cSign > 0 ? `${v2} < 0` : `${v2} > 0`}`;

  const wrongs = [...new Set([w1, w2, w3])].filter(w => w !== correct).slice(0, 3);
  while (wrongs.length < 3) wrongs.push(`${v1} = 0 \\text{ 及 } ${bLabel}`);

  const opts = shuffle([correct, ...wrongs.slice(0, 3)]);
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
    graphData: { aSign, yIntSign: cSign, vertexSide },
  };
};

// ── Type C: y = a(x+b)² signs from graph (WITH SVG) ─────────────────────────
const genVertexSquareSignsQ = () => {
  const aSign = Math.random() < 0.5 ? 1 : -1;
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
  const leadCoeff = (Math.random() < 0.5 ? 1 : -1) * randInt(1, 3);
  const axisVal = randInt(1, 6);
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
  const c = randInt(-8, 8);
  const k = a * xVal * xVal + b * xVal + c;
  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const bStr = b === 0 ? '' : b > 0 ? `+${b}` : `${b}`;
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

// ── Type F: Factored/product form statement (NO graph) ──────────────────────
const genFactoredFormQ = () => {
  const p = randInt(1, 5);
  const q = randInt(1, 5);
  const r = randInt(1, 8);
  const bCoeff = p - q;
  const cCoeff = p * q + r;
  const yInt = cCoeff;

  const pool = [
    { t: '該圖像開口向下。', c: true },
    { t: '該圖像開口向上。', c: false },
    { t: `該圖像通過點 (${p}, ${r})。`, c: true },
    { t: `該圖像的 x 截距為 ${-q} 及 ${p}。`, c: false },
    { t: `該圖像的 y 截距為 ${r}。`, c: yInt === r },
    { t: `該圖像的 y 截距為 ${yInt}。`, c: true },
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
      `a = -1 < 0 \\Rightarrow \\text{開口向下}`,
      `\\text{y 截距：代 }x=0 \\Rightarrow y = ${p} \\times ${q} + ${r} = ${cCoeff}`,
      `\\text{代 }x=${p}\\text{：}y = 0 \\times (${p}+${q})+${r} = ${r} \\Rightarrow \\text{通過 }(${p},${r})`,
      `\\therefore \\text{${chosen.t}}`,
    ],
    subtypeLabel: '函數圖像 — 因式形式敘述',
  };
};

export const generateFunctionGraphQuestion = () => {
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
