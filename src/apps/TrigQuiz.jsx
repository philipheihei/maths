import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon, BookOpen, Calculator, GraduationCap, ArrowRight, ArrowLeft,
  Check, X, RefreshCw, Trophy, Lightbulb, ChevronDown, ChevronUp
} from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';
import { PythagorasNotesBlock, TrigRatiosNotesBlock } from '../components/F2TrigNotesShared';

// KaTeX 數學公式組件
const Latex = ({ math, block = false }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadKatexOnce().then(() => setIsLoaded(true)).catch(e => console.error("KaTeX load error:", e));
  }, []);

  useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        window.katex.render(math, containerRef.current, {
          throwOnError: false,
          displayMode: block,
          strict: false
        });
      } catch (e) {
        containerRef.current.textContent = math;
      }
    }
  }, [math, block, isLoaded]);

  return <span ref={containerRef} className={block ? "block text-center my-2" : "inline-block"} />;
};

// 混合文字+LaTeX 渲染
const StepText = ({ text }) => {
  if (text.startsWith('$$') && text.endsWith('$$')) {
    return <Latex math={text.slice(2, -2)} block />;
  }
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <span className="text-sm text-slate-700 leading-relaxed">
      {parts.map((part, i) =>
        part.startsWith('$') && part.endsWith('$')
          ? <Latex key={i} math={part.slice(1, -1)} />
          : <span key={i}>{part}</span>
      )}
    </span>
  );
};

// ========================================
// 虛擬鍵盤（三角比專用）
// ========================================
const TrigKeyboard = ({ onInput, onDelete, onSubmit, disabled }) => {
  const KEY = `h-11 rounded-lg font-medium text-base flex items-center justify-center select-none transition-all shadow-[0_2px_0_0_rgba(0,0,0,0.12)] active:shadow-none active:translate-y-[1px] border`;
  const NUM = `${KEY} bg-white text-slate-700 border-slate-200`;
  const OP  = `${KEY} bg-slate-100 text-slate-600 border-slate-200`;
  const DEL = `${KEY} bg-red-50 text-red-500 border-red-100`;

  const press = (v) => { if (!disabled) onInput(v); };

  return (
    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
      <div className="grid grid-cols-4 gap-2">
        {[7,8,9].map(n => <button key={n} className={NUM} onClick={() => press(String(n))}>{n}</button>)}
        <button className={DEL} onClick={() => { if (!disabled) onDelete(); }}>DEL</button>

        {[4,5,6].map(n => <button key={n} className={NUM} onClick={() => press(String(n))}>{n}</button>)}
        <button className={OP} onClick={() => press('√')}>√</button>

        {[1,2,3].map(n => <button key={n} className={NUM} onClick={() => press(String(n))}>{n}</button>)}
        <button className={`${KEY} bg-slate-200 text-slate-500 border-slate-300`} onClick={() => { if (!disabled) onInput('AC'); }}>AC</button>

        <button className={NUM} onClick={() => press('0')}>0</button>
        <button className={OP} onClick={() => press('.')}>.</button>
        <button className={OP} onClick={() => press('^')}>^</button>
        <button
          className={`${KEY} bg-blue-500 text-white border-blue-600`}
          onClick={() => { if (!disabled) onSubmit(); }}
        >
          ↵
        </button>
      </div>
    </div>
  );
};

// ========================================
// 三角形 SVG 繪圖
// ========================================
const TriangleSVG = ({ triangle, unknownSide, unknownAngle, quizType, visibleSides = ['a','b','c'], visibleAngles = ['A','B'] }) => {
  // triangle: { a, b, c, A, B } where C=90°, a=BC, b=AC, c=AB (hypotenuse)
  // A is angle at vertex A (opposite side a), B is angle at vertex B (opposite side b)
  const { a, b } = triangle;

  // Draw right-angle triangle: right angle at C (bottom-left)
  // C at origin, B along x-axis (side a), A along y-axis (side b)
  const pad = 50;
  const scale = Math.min(200 / Math.max(a, b), 25);
  const drawA = a * scale;
  const drawB = b * scale;

  const cx = pad;
  const cy = pad + drawB;
  const bx = pad + drawA;
  const by = pad + drawB;
  const ax = pad;
  const ay = pad;

  const w = drawA + pad * 2;
  const h = drawB + pad * 2;

  const sq = 15; // right-angle square size

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xs mx-auto" style={{ maxHeight: 260 }}>
      {/* Triangle */}
      <polygon
        points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
        fill="rgba(99,102,241,0.08)"
        stroke="#4f46e5"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Right angle square at C */}
      <polyline
        points={`${cx + sq},${cy} ${cx + sq},${cy - sq} ${cx},${cy - sq}`}
        fill="none"
        stroke="#4f46e5"
        strokeWidth="1.5"
      />

      {/* Labels */}
      {/* Vertex labels */}
      <text x={ax - 14} y={ay - 8} fontSize="16" fontWeight="bold" fill="#4f46e5" fontStyle="italic">A</text>
      <text x={bx + 8} y={by + 6} fontSize="16" fontWeight="bold" fill="#4f46e5" fontStyle="italic">B</text>
      <text x={cx - 18} y={cy + 8} fontSize="16" fontWeight="bold" fill="#4f46e5" fontStyle="italic">C</text>

      {/* Side labels — show value or "?" */}
      {/* Side a = BC (bottom) */}
      {(unknownSide === 'a' || visibleSides.includes('a')) && (
        <text x={(bx + cx) / 2} y={by + 22} fontSize="14" fontWeight="bold" textAnchor="middle"
          fill={unknownSide === 'a' ? '#dc2626' : '#334155'}>
          {unknownSide === 'a' ? '?' : triangle.a}
        </text>
      )}

      {/* Side b = AC (left) */}
      {(unknownSide === 'b' || visibleSides.includes('b')) && (
        <text x={ax - 24} y={(ay + cy) / 2 + 5} fontSize="14" fontWeight="bold" textAnchor="middle"
          fill={unknownSide === 'b' ? '#dc2626' : '#334155'}>
          {unknownSide === 'b' ? '?' : triangle.b}
        </text>
      )}

      {/* Side c = AB (hypotenuse) */}
      {(unknownSide === 'c' || visibleSides.includes('c')) && (
        <text x={(ax + bx) / 2 + 12} y={(ay + by) / 2 - 8} fontSize="14" fontWeight="bold" textAnchor="middle"
          fill={unknownSide === 'c' ? '#dc2626' : '#334155'}>
          {unknownSide === 'c' ? '?' : triangle.c}
        </text>
      )}

      {/* Angle labels for trig */}
      {quizType?.startsWith('trig') && (
        <>
          {/* Angle A arc & text */}
          {(unknownAngle === 'A' || visibleAngles.includes('A')) && (() => {
            const minSide = Math.min(drawB, Math.hypot(drawA, drawB));
            const arcRadius = Math.max(12, Math.min(24, minSide * 0.45));
            const aAB = Math.atan2(by - ay, bx - ax);
            const aAC = Math.PI / 2;
            const xA1 = ax + arcRadius * Math.cos(aAB);
            const yA1 = ay + arcRadius * Math.sin(aAB);
            const xA2 = ax + arcRadius * Math.cos(aAC);
            const yA2 = ay + arcRadius * Math.sin(aAC);
            const arcA = `M ${xA1} ${yA1} A ${arcRadius} ${arcRadius} 0 0 1 ${xA2} ${yA2}`;
            
            const midA = (aAB + aAC) / 2;
            const textDist = arcRadius + (drawB < 45 ? 10 : 14);
            const textAx = ax + textDist * Math.cos(midA);
            const textAy = ay + textDist * Math.sin(midA) + (drawB < 45 ? 2 : 5);
            
            return (
              <g>
                <path d={arcA} fill="none" stroke={unknownAngle === 'A' ? "#dc2626" : "#4f46e5"} strokeWidth="1.5" />
                <text x={textAx} y={textAy} fontSize="13" fontWeight="bold" textAnchor="middle" fill={unknownAngle === 'A' ? "#dc2626" : "#334155"}>
                  {unknownAngle === 'A' ? 'θ' : `${triangle.A}°`}
                </text>
              </g>
            );
          })()}

          {/* Angle B arc & text */}
          {(unknownAngle === 'B' || visibleAngles.includes('B')) && (() => {
            const minSide = Math.min(drawA, Math.hypot(drawA, drawB));
            const arcRadius = Math.max(12, Math.min(24, minSide * 0.45));
            const bBC = -Math.PI; // Use -PI so it is close to bBA (which is between -PI and -PI/2)
            const bBA = Math.atan2(ay - by, ax - bx);
            const xB1 = bx + arcRadius * Math.cos(bBC);
            const yB1 = by + arcRadius * Math.sin(bBC);
            const xB2 = bx + arcRadius * Math.cos(bBA);
            const yB2 = by + arcRadius * Math.sin(bBA);
            const arcB = `M ${xB1} ${yB1} A ${arcRadius} ${arcRadius} 0 0 1 ${xB2} ${yB2}`;
            
            const midB = (bBC + bBA) / 2;
            const textDist = arcRadius + (drawA < 45 ? 10 : 16);
            const textBx = bx + textDist * Math.cos(midB);
            const textBy = by + textDist * Math.sin(midB) + (drawA < 45 ? 2 : 5);

            return (
              <g>
                <path d={arcB} fill="none" stroke={unknownAngle === 'B' ? "#dc2626" : "#4f46e5"} strokeWidth="1.5" />
                <text x={textBx} y={textBy} fontSize="13" fontWeight="bold" textAnchor="middle" fill={unknownAngle === 'B' ? "#dc2626" : "#334155"}>
                  {unknownAngle === 'B' ? 'θ' : `${triangle.B}°`}
                </text>
              </g>
            );
          })()}
        </>
      )}
    </svg>
  );
};

// ========================================
// 一般三角形 SVG（用於畢氏定理逆定理）
// 支援旋轉以呈現不同朝向
// ========================================
const GeneralTriangleSVG = ({ sides, label, rotation = 0 }) => {
  // sides = [s1, s2, s3] — the three side lengths as given (not necessarily sorted)
  const [s1, s2, s3] = sides;

  // Use cosine rule to find the angle opposite s3
  const cosC = (s1 * s1 + s2 * s2 - s3 * s3) / (2 * s1 * s2);
  const angC = Math.acos(Math.max(-1, Math.min(1, cosC)));

  // Vertex coords before rotation: V0 at origin, V1 along x-axis (s1), V2 via angle (s2)
  const rawPts = [
    { x: 0, y: 0 },
    { x: s1, y: 0 },
    { x: s2 * Math.cos(angC), y: -s2 * Math.sin(angC) }
  ];

  // Rotate all points
  const rad = rotation * Math.PI / 180;
  const rotated = rawPts.map(p => ({
    x: p.x * Math.cos(rad) - p.y * Math.sin(rad),
    y: p.x * Math.sin(rad) + p.y * Math.cos(rad)
  }));

  // Normalize to SVG space with generous padding for labels outside
  const xs = rotated.map(p => p.x);
  const ys = rotated.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const svgW = 240, svgH = 210, pad = 48;
  const scale = Math.min((svgW - 2 * pad) / rangeX, (svgH - 2 * pad) / rangeY);

  const pts = rotated.map(p => ({
    x: pad + (p.x - minX) * scale,
    y: pad + (p.y - minY) * scale
  }));

  // Centroid — used to push labels outward from each edge
  const gcx = (pts[0].x + pts[1].x + pts[2].x) / 3;
  const gcy = (pts[0].y + pts[1].y + pts[2].y) / 3;

  // Edge midpoints — labels at midpoint, nudged outward from centroid, with white backing
  const edges = [
    { from: pts[0], to: pts[1], len: s1 },
    { from: pts[1], to: pts[2], len: s3 },
    { from: pts[2], to: pts[0], len: s2 }
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-sm font-bold text-slate-700 mb-1">三角形 {label}</p>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ maxHeight: 190 }}>
        <polygon
          points={pts.map(p => `${p.x},${p.y}`).join(' ')}
          fill="rgba(99,102,241,0.08)"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {edges.map(({ from, to, len }, i) => {
          const mx = (from.x + to.x) / 2;
          const my = (from.y + to.y) / 2;
          
          // 計算邊向量
          const vx = to.x - from.x;
          const vy = to.y - from.y;
          
          // 產生法向量 (垂直於邊)
          let nx = -vy;
          let ny = vx;
          
          // 確保法向量指向三角形外側 (與重心到中點的向量同向)
          if (nx * (mx - gcx) + ny * (my - gcy) < 0) {
            nx = -nx;
            ny = -ny;
          }
          
          // 正規化法向量並加上偏移量
          const nLen = Math.sqrt(nx * nx + ny * ny) || 1;
          const off = 16;
          const lx = mx + (nx / nLen) * off;
          const ly = my + (ny / nLen) * off;
          
          return (
            <text
              key={i}
              x={lx}
              y={ly}
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#1e3a5f"
            >
              {len}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// ========================================
// 題目生成器
// ========================================
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const round2 = (n) => Math.round(n * 100) / 100;
const round3sf = (n) => {
  if (n === 0) return 0;
  const d = Math.floor(Math.log10(Math.abs(n))) + 1;
  const factor = Math.pow(10, 3 - d);
  return Math.round(n * factor) / factor;
};
// 格式化至3位有效數字的字串（保留尾隨零，如 "59.0"；若為真確整數則不加小數點）
const format3sf = (n) => {
  if (n === 0) return '0';
  if (Math.abs(n - Math.round(n)) < 0.001) return String(Math.round(n));
  return n.toPrecision(3);
};
const toRad = (deg) => deg * Math.PI / 180;

// 常用的畢式三元數 (a, b, c) where a²+b²=c²
const PYTHAG_TRIPLES = [
  [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25],
  [6, 8, 10], [9, 12, 15], [12, 16, 20], [15, 20, 25],
  [10, 24, 26], [20, 21, 29], [9, 40, 41], [12, 35, 37]
];

const isPerfectSquare = (n) => Number.isInteger(Math.sqrt(n));
const simplifySqrt = (n) => {
  let coeff = 1;
  let radicand = n;
  for (let i = 2; i * i <= radicand; i++) {
    while (radicand % (i * i) === 0) {
      coeff *= i;
      radicand /= i * i;
    }
  }
  if (radicand === 1) {
    return { text: String(coeff), latex: String(coeff) };
  }
  if (coeff === 1) {
    return { text: `√${radicand}`, latex: `\\sqrt{${radicand}}` };
  }
  return { text: `${coeff}√${radicand}`, latex: `${coeff}\\sqrt{${radicand}}` };
};

// 畢氏定理題目生成
const generatePythagorasQuestion = () => {
  // 少量題目改為無理數答案（根式），其餘維持整數題。
  if (Math.random() < 0.25) {
    const surdType = rand(0, 2); // 0: 找斜邊, 1: 找BC, 2: 找AC

    if (surdType === 0) {
      let a = rand(4, 14);
      let b = rand(4, 14);
      let sumSq = a * a + b * b;
      let guard = 0;
      while (isPerfectSquare(sumSq) && guard < 50) {
        a = rand(4, 14);
        b = rand(4, 14);
        sumSq = a * a + b * b;
        guard++;
      }
      const surd = simplifySqrt(sumSq);
      return {
        triangle: { a, b, c: round2(Math.sqrt(sumSq)), A: null, B: null },
        unknownSide: 'c',
        unknownAngle: null,
        answer: Math.sqrt(sumSq),
        answerDisplay: surd.text,
        answerAlt: [surd.text],
        steps: [
          `$$\\begin{align*}AB^2 &= AC^2 + BC^2 \\\\[4pt] &= ${b}^2 + ${a}^2 \\\\[4pt] &= ${b * b} + ${a * a} \\\\[4pt] &= ${sumSq} \\\\[4pt] AB &= \\sqrt{${sumSq}} \\\\[4pt] &= ${surd.latex}\\end{align*}$$`
        ],
        questionText: '求 AB 的長度。（可用根式作答）'
      };
    }

    if (surdType === 1) {
      let b = rand(4, 12);
      let c = rand(b + 1, 18);
      let diffSq = c * c - b * b;
      let guard = 0;
      while ((diffSq <= 0 || isPerfectSquare(diffSq)) && guard < 50) {
        b = rand(4, 12);
        c = rand(b + 1, 18);
        diffSq = c * c - b * b;
        guard++;
      }
      const surd = simplifySqrt(diffSq);
      return {
        triangle: { a: round2(Math.sqrt(diffSq)), b, c, A: null, B: null },
        unknownSide: 'a',
        unknownAngle: null,
        answer: Math.sqrt(diffSq),
        answerDisplay: surd.text,
        answerAlt: [surd.text],
        steps: [
          `$$\\begin{align*}AB^2 &= AC^2 + BC^2 \\\\[4pt] ${c}^2 &= ${b}^2 + BC^2 \\\\[4pt] BC^2 &= ${c}^2 - ${b}^2 \\\\[4pt] &= ${c * c} - ${b * b} \\\\[4pt] &= ${diffSq} \\\\[4pt] BC &= \\sqrt{${diffSq}} \\\\[4pt] &= ${surd.latex}\\end{align*}$$`
        ],
        questionText: '求 BC 的長度。（可用根式作答）'
      };
    }

    let a = rand(4, 12);
    let c = rand(a + 1, 18);
    let diffSq = c * c - a * a;
    let guard = 0;
    while ((diffSq <= 0 || isPerfectSquare(diffSq)) && guard < 50) {
      a = rand(4, 12);
      c = rand(a + 1, 18);
      diffSq = c * c - a * a;
      guard++;
    }
    const surd = simplifySqrt(diffSq);
    return {
      triangle: { a, b: round2(Math.sqrt(diffSq)), c, A: null, B: null },
      unknownSide: 'b',
      unknownAngle: null,
      answer: Math.sqrt(diffSq),
      answerDisplay: surd.text,
      answerAlt: [surd.text],
      steps: [
        `$$\\begin{align*}AB^2 &= AC^2 + BC^2 \\\\[4pt] ${c}^2 &= AC^2 + ${a}^2 \\\\[4pt] AC^2 &= ${c}^2 - ${a}^2 \\\\[4pt] &= ${c * c} - ${a * a} \\\\[4pt] &= ${diffSq} \\\\[4pt] AC &= \\sqrt{${diffSq}} \\\\[4pt] &= ${surd.latex}\\end{align*}$$`
      ],
      questionText: '求 AC 的長度。（可用根式作答）'
    };
  }

  const triple = pick(PYTHAG_TRIPLES);
  // Randomly assign which sides are a (BC), b (AC), c (AB=hyp)
  // triple = [leg1, leg2, hyp]
  const [leg1, leg2, hyp] = triple;

  // Decide which side to find: 0=leg1(a), 1=leg2(b), 2=hyp(c)
  const findIndex = rand(0, 2);

  let a, b, c, unknownSide, answer, steps;

  if (findIndex === 0) {
    // Find a (=leg1), given b=leg2, c=hyp
    a = leg1; b = leg2; c = hyp;
    unknownSide = 'a';
    answer = a;
    steps = [
      `$$\\begin{align*}AB^2 &= AC^2 + BC^2 \\\\[4pt] ${c}^2 &= ${b}^2 + BC^2 \\\\[4pt] BC^2 &= ${c}^2 - ${b}^2 \\\\[4pt] &= ${c * c} - ${b * b} \\\\[4pt] &= ${c * c - b * b} \\\\[4pt] BC &= \\sqrt{${c * c - b * b}} \\\\[4pt] &= ${a}\\end{align*}$$`
    ];
  } else if (findIndex === 1) {
    // Find b (=leg2), given a=leg1, c=hyp
    a = leg1; b = leg2; c = hyp;
    unknownSide = 'b';
    answer = b;
    steps = [
      `$$\\begin{align*}AB^2 &= AC^2 + BC^2 \\\\[4pt] ${c}^2 &= AC^2 + ${a}^2 \\\\[4pt] AC^2 &= ${c}^2 - ${a}^2 \\\\[4pt] &= ${c * c} - ${a * a} \\\\[4pt] &= ${c * c - a * a} \\\\[4pt] AC &= \\sqrt{${c * c - a * a}} \\\\[4pt] &= ${b}\\end{align*}$$`
    ];
  } else {
    // Find c (hyp), given a=leg1, b=leg2
    a = leg1; b = leg2; c = hyp;
    unknownSide = 'c';
    answer = c;
    steps = [
      `$$\\begin{align*}AB^2 &= AC^2 + BC^2 \\\\[4pt] &= ${b}^2 + ${a}^2 \\\\[4pt] &= ${b * b} + ${a * a} \\\\[4pt] &= ${b * b + a * a} \\\\[4pt] AB &= \\sqrt{${b * b + a * a}} \\\\[4pt] &= ${c}\\end{align*}$$`
    ];
  }

  return {
    triangle: { a, b, c, A: null, B: null },
    unknownSide,
    unknownAngle: null,
    answer,
    answerAlt: [String(answer)],
    steps,
    questionText: `求 ${unknownSide === 'a' ? 'BC' : unknownSide === 'b' ? 'AC' : 'AB'} 的長度。`
  };
};

// 三角比題目生成 (Legacy function, no longer used directly since split)
const generateTrigQuestion = () => {
  const scenarios = [
    ...generateTrigFindSide(),
    ...generateTrigFindAngle()
  ];
  return pick(scenarios);
};

const generateTrigFindSide = () => {
  const results = [];
  const niceSides = [6, 8, 10, 12, 14, 15, 16, 18, 20, 24];
  const angles = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];

  // Helpers
  const isExactInt = (n) => Math.abs(n - Math.round(n)) < 0.001;
  const ans = (raw) => isExactInt(raw) ? Math.round(raw) : format3sf(raw);
  const qSuffix = (raw) => isExactInt(raw) ? '' : '（答案取至3位有效數字）';

  // Type 1: sin A = BC/AB → find BC (opp) given AB (hyp)
  {
    const A = pick(angles);
    const c = pick(niceSides);
    const rawA = c * Math.sin(toRad(A));
    const a = round3sf(rawA);
    const aAns = ans(rawA);
    const b = round2(Math.sqrt(Math.max(0, c * c - a * a)));
    results.push({
      triangle: { a, b, c, A, B: 90 - A },
      unknownSide: 'a', unknownAngle: null,
      visibleSides: ['c'], visibleAngles: ['A'],
      answer: aAns,
      questionText: `求 BC 的長度。${qSuffix(rawA)}`,
      steps: [
        `已掌握資料如下：$\\angle BAC = ${A}°$，AB = ${c}（斜邊）。`,
        `要找以下長度：BC（對邊）。對邊 + 斜邊的組合，使用 $\\sin$。`,
        `$$\\begin{align*}\\sin ${A}° &= \\dfrac{BC}{AB} \\\\[4pt] BC &= AB \\times \\sin ${A}° \\\\[4pt] &= ${c} \\times \\sin ${A}° \\\\[2pt] &= ${aAns}\\end{align*}$$`
      ]
    });
  }

  // Type 2: cos A = AC/AB → find AC (adj) given AB (hyp)
  {
    const A = pick(angles);
    const c = pick(niceSides);
    const rawB = c * Math.cos(toRad(A));
    const b = round3sf(rawB);
    const bAns = ans(rawB);
    const a = round2(Math.sqrt(Math.max(0, c * c - b * b)));
    results.push({
      triangle: { a, b, c, A, B: 90 - A },
      unknownSide: 'b', unknownAngle: null,
      visibleSides: ['c'], visibleAngles: ['A'],
      answer: bAns,
      questionText: `求 AC 的長度。${qSuffix(rawB)}`,
      steps: [
        `已掌握資料如下：$\\angle BAC = ${A}°$，AB = ${c}（斜邊）。`,
        `要找以下長度：AC（鄰邊）。鄰邊 + 斜邊的組合，使用 $\\cos$。`,
        `$$\\begin{align*}\\cos ${A}° &= \\dfrac{AC}{AB} \\\\[4pt] AC &= AB \\times \\cos ${A}° \\\\[4pt] &= ${c} \\times \\cos ${A}° \\\\[2pt] &= ${bAns}\\end{align*}$$`
      ]
    });
  }

  // Type 3: tan A = BC/AC → find BC (opp) given AC (adj)
  {
    const A = pick(angles);
    const b = pick(niceSides);
    const rawA = b * Math.tan(toRad(A));
    const a = round3sf(rawA);
    const aAns = ans(rawA);
    const c = round2(Math.sqrt(a * a + b * b));
    results.push({
      triangle: { a, b, c, A, B: 90 - A },
      unknownSide: 'a', unknownAngle: null,
      visibleSides: ['b'], visibleAngles: ['A'],
      answer: aAns,
      questionText: `求 BC 的長度。${qSuffix(rawA)}`,
      steps: [
        `已掌握資料如下：$\\angle BAC = ${A}°$，AC = ${b}（鄰邊）。`,
        `要找以下長度：BC（對邊）。對邊 + 鄰邊的組合，使用 $\\tan$。`,
        `$$\\begin{align*}\\tan ${A}° &= \\dfrac{BC}{AC} \\\\[4pt] BC &= AC \\times \\tan ${A}° \\\\[4pt] &= ${b} \\times \\tan ${A}° \\\\[2pt] &= ${aAns}\\end{align*}$$`
      ]
    });
  }

  // Type 4: sin A = BC/AB → find AB (hyp) given BC (opp)
  {
    const A = pick(angles);
    const a = pick(niceSides);
    const rawC = a / Math.sin(toRad(A));
    const c = round3sf(rawC);
    const cAns = ans(rawC);
    const b = round2(Math.sqrt(Math.max(0, c * c - a * a)));
    results.push({
      triangle: { a, b, c, A, B: 90 - A },
      unknownSide: 'c', unknownAngle: null,
      visibleSides: ['a'], visibleAngles: ['A'],
      answer: cAns,
      questionText: `求 AB 的長度。${qSuffix(rawC)}`,
      steps: [
        `已掌握資料如下：$\\angle BAC = ${A}°$，BC = ${a}（對邊）。`,
        `要找以下長度：AB（斜邊）。對邊 + 斜邊的組合，使用 $\\sin$。`,
        `$$\\begin{align*}\\sin ${A}° &= \\dfrac{BC}{AB} \\\\[4pt] AB &= \\dfrac{BC}{\\sin ${A}°} \\\\[4pt] &= \\dfrac{${a}}{\\sin ${A}°} \\\\[2pt] &= ${cAns}\\end{align*}$$`
      ]
    });
  }

  // Type 5: cos A = AC/AB → find AB (hyp) given AC (adj)
  {
    const A = pick(angles);
    const b = pick(niceSides);
    const rawC = b / Math.cos(toRad(A));
    const c = round3sf(rawC);
    const cAns = ans(rawC);
    const a = round2(Math.sqrt(Math.max(0, c * c - b * b)));
    results.push({
      triangle: { a, b, c, A, B: 90 - A },
      unknownSide: 'c', unknownAngle: null,
      visibleSides: ['b'], visibleAngles: ['A'],
      answer: cAns,
      questionText: `求 AB 的長度。${qSuffix(rawC)}`,
      steps: [
        `已掌握資料如下：$\\angle BAC = ${A}°$，AC = ${b}（鄰邊）。`,
        `要找以下長度：AB（斜邊）。鄰邊 + 斜邊的組合，使用 $\\cos$。`,
        `$$\\begin{align*}\\cos ${A}° &= \\dfrac{AC}{AB} \\\\[4pt] AB &= \\dfrac{AC}{\\cos ${A}°} \\\\[4pt] &= \\dfrac{${b}}{\\cos ${A}°} \\\\[2pt] &= ${cAns}\\end{align*}$$`
      ]
    });
  }

  // Type 6: tan A = BC/AC → find AC (adj) given BC (opp)
  {
    const A = pick(angles);
    const a = pick(niceSides);
    const rawB = a / Math.tan(toRad(A));
    const b = round3sf(rawB);
    const bAns = ans(rawB);
    const c = round2(Math.sqrt(a * a + b * b));
    results.push({
      triangle: { a, b, c, A, B: 90 - A },
      unknownSide: 'b', unknownAngle: null,
      visibleSides: ['a'], visibleAngles: ['A'],
      answer: bAns,
      questionText: `求 AC 的長度。${qSuffix(rawB)}`,
      steps: [
        `已掌握資料如下：$\\angle BAC = ${A}°$，BC = ${a}（對邊）。`,
        `要找以下長度：AC（鄰邊）。對邊 + 鄰邊的組合，使用 $\\tan$。`,
        `$$\\begin{align*}\\tan ${A}° &= \\dfrac{BC}{AC} \\\\[4pt] AC &= \\dfrac{BC}{\\tan ${A}°} \\\\[4pt] &= \\dfrac{${a}}{\\tan ${A}°} \\\\[2pt] &= ${bAns}\\end{align*}$$`
      ]
    });
  }

  return results;
};

const generateTrigFindAngle = () => {
  const angles = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
  const sideLengths = [5, 6, 8, 10, 12, 15, 18, 20];
  const hypSides = [10, 12, 14, 15, 16, 18, 20, 24, 25];

  const makeTanQuestion = () => {
    // tan 題型會隨機出 A 或 B，整體仍視為 tan 一類
    const targetAtA = Math.random() < 0.5;

    if (targetAtA) {
      const A_target = pick(angles);
      const b = pick(sideLengths);
      const a = Math.max(1, Math.round(b * Math.tan(toRad(A_target))));
      const rawA = Math.atan2(a, b) * 180 / Math.PI;
      const A = round3sf(rawA);
      const Astr = format3sf(rawA);
      const c = round2(Math.sqrt(a * a + b * b));
      return {
        triangle: { a, b, c, A, B: 90 - A },
        unknownSide: null, unknownAngle: 'A',
        visibleSides: ['a', 'b'], visibleAngles: [],
        answer: Astr,
        questionText: '求 ∠BAC 的度數。（答案取至3位有效數字）',
        steps: [
          `已掌握資料如下：BC = ${a}（對邊），AC = ${b}（鄰邊）。`,
          `要找以下角度：$\\angle BAC$。對邊 + 鄰邊的組合，使用 $\\tan$。`,
          `$$\\begin{align*}\\tan \\angle BAC &= \\dfrac{BC}{AC} \\\\[4pt] \\tan \\angle BAC &= \\dfrac{${a}}{${b}} \\\\[4pt] \\angle BAC &= ${Astr}°\\end{align*}$$`
        ]
      };
    }

    const B_target = pick(angles);
    const a = pick(sideLengths);
    const b = Math.max(1, Math.round(a * Math.tan(toRad(B_target))));
    const rawB = Math.atan2(b, a) * 180 / Math.PI;
    const B = round3sf(rawB);
    const Bstr = format3sf(rawB);
    const c = round2(Math.sqrt(a * a + b * b));
    return {
      triangle: { a, b, c, A: 90 - B, B },
      unknownSide: null, unknownAngle: 'B',
      visibleSides: ['a', 'b'], visibleAngles: [],
      answer: Bstr,
      questionText: '求 ∠ABC 的度數。（答案取至3位有效數字）',
      steps: [
        `已掌握資料如下：AC = ${b}（對邊），BC = ${a}（鄰邊）。`,
        `要找以下角度：$\\angle ABC$。對邊 + 鄰邊的組合，使用 $\\tan$。`,
        `$$\\begin{align*}\\tan \\angle ABC &= \\dfrac{AC}{BC} \\\\[4pt] \\tan \\angle ABC &= \\dfrac{${b}}{${a}} \\\\[4pt] \\angle ABC &= ${Bstr}°\\end{align*}$$`
      ]
    };
  };

  const makeSinQuestion = () => {
    // 以 guard 確保分子 < 分母，避免退化成 90°
    let tries = 0;
    while (tries < 30) {
      const A_target = pick(angles);
      const c = pick(hypSides);
      const a = Math.max(1, Math.round(c * Math.sin(toRad(A_target))));
      if (a < c) {
        const rawA = Math.asin(a / c) * 180 / Math.PI;
        const A = round3sf(rawA);
        const Astr = format3sf(rawA);
        const b = round2(Math.sqrt(c * c - a * a));
        return {
          triangle: { a, b, c, A, B: 90 - A },
          unknownSide: null, unknownAngle: 'A',
          visibleSides: ['a', 'c'], visibleAngles: [],
          answer: Astr,
          questionText: '求 ∠BAC 的度數。（答案取至3位有效數字）',
          steps: [
            `已掌握資料如下：BC = ${a}（對邊），AB = ${c}（斜邊）。`,
            `要找以下角度：$\\angle BAC$。對邊 + 斜邊的組合，使用 $\\sin$。`,
            `$$\\begin{align*}\\sin \\angle BAC &= \\dfrac{BC}{AB} \\\\[4pt] \\sin \\angle BAC &= \\dfrac{${a}}{${c}} \\\\[4pt] \\angle BAC &= ${Astr}°\\end{align*}$$`
          ]
        };
      }
      tries++;
    }
    return null;
  };

  const makeCosQuestion = () => {
    // 以 guard 確保鄰邊 < 斜邊，避免退化成 0°
    let tries = 0;
    while (tries < 30) {
      const A_target = pick(angles);
      const c = pick(hypSides);
      const b = Math.max(1, Math.round(c * Math.cos(toRad(A_target))));
      if (b < c) {
        const rawA = Math.acos(b / c) * 180 / Math.PI;
        const A = round3sf(rawA);
        const Astr = format3sf(rawA);
        const a = round2(Math.sqrt(c * c - b * b));
        return {
          triangle: { a, b, c, A, B: 90 - A },
          unknownSide: null, unknownAngle: 'A',
          visibleSides: ['b', 'c'], visibleAngles: [],
          answer: Astr,
          questionText: '求 ∠BAC 的度數。（答案取至3位有效數字）',
          steps: [
            `已掌握資料如下：AC = ${b}（鄰邊），AB = ${c}（斜邊）。`,
            `要找以下角度：$\\angle BAC$。鄰邊 + 斜邊的組合，使用 $\\cos$。`,
            `$$\\begin{align*}\\cos \\angle BAC &= \\dfrac{AC}{AB} \\\\[4pt] \\cos \\angle BAC &= \\dfrac{${b}}{${c}} \\\\[4pt] \\angle BAC &= ${Astr}°\\end{align*}$$`
          ]
        };
      }
      tries++;
    }
    return null;
  };

  const results = [makeTanQuestion(), makeSinQuestion(), makeCosQuestion()].filter(Boolean);

  return results;
};

// ========================================
// 畢氏定理逆定理題目生成
// 生成3個三角形，1-2個為直角三角形
// ========================================
const generateConverseQuestion = () => {
  const labels = ['P', 'Q', 'R'];
  const rotations = [0, 45, 90, 135, 180, 225, 270, 315];

  // 生成直角三角形（從畢式三元數）
  const makeRight = () => {
    const triple = pick(PYTHAG_TRIPLES);
    const k = pick([1, 2]); // 倍數
    const sides = triple.map(s => s * k);
    // 隨機打亂顯示順序
    const shuffled = [...sides].sort(() => Math.random() - 0.5);
    return { sides: shuffled, isRight: true };
  };

  // 生成非直角三角形
  const makeNonRight = () => {
    let a, b, c;
    let attempts = 0;
    do {
      a = rand(5, 30);
      b = rand(5, 30);
      c = rand(5, 30);
      attempts++;
    } while (
      attempts < 100 && (
        // 三角不等式
        a + b <= c || a + c <= b || b + c <= a ||
        // 不能是直角三角形
        (() => {
          const sorted = [a, b, c].sort((x, y) => x - y);
          return sorted[0] * sorted[0] + sorted[1] * sorted[1] === sorted[2] * sorted[2];
        })() ||
        // 避免退化三角形（太扁）
        Math.min(a, b, c) < Math.max(a, b, c) * 0.2
      )
    );
    return { sides: [a, b, c], isRight: false };
  };

  // 決定 1 或 2 個直角三角形
  const rightCount = pick([1, 2]);
  const triangles = [];
  const usedRotations = [];

  for (let i = 0; i < 3; i++) {
    const isRight = i < rightCount;
    const tri = isRight ? makeRight() : makeNonRight();
    let rot;
    do { rot = pick(rotations); } while (usedRotations.includes(rot));
    usedRotations.push(rot);
    triangles.push({ ...tri, rotation: rot, label: labels[i] });
  }

  // 隨機打亂順序
  triangles.sort(() => Math.random() - 0.5);
  triangles.forEach((t, i) => { t.label = labels[i]; });

  // 生成每個三角形的步驟
  const steps = triangles.map(t => {
    const sorted = [...t.sides].sort((a, b) => a - b);
    const [s1, s2, s3] = sorted;
    const sumSq = s1 * s1 + s2 * s2;
    const maxSq = s3 * s3;
    const isR = sumSq === maxSq;
    return {
      label: t.label,
      isRight: isR,
      lines: [
        `三角形 ${t.label}：三邊 = ${t.sides.join(', ')}，最長邊 = ${s3}`,
        `$${s1}^2 + ${s2}^2 = ${s1 * s1} + ${s2 * s2} = ${sumSq}$`,
        `$${s3}^2 = ${maxSq}$`,
        isR
          ? `∵ $${s1}^2 + ${s2}^2 = ${s3}^2$`
          : `∵ $${s1}^2 + ${s2}^2 \\neq ${s3}^2$`,
      ],
      conclusion: isR
        ? `∴ 三角形 ${t.label} 是直角三角形 ✓`
        : `∴ 三角形 ${t.label} 不是直角三角形 ✗`,
    };
  });

  return { triangles, steps };
};

// ========================================
// 教學筆記
// ========================================
const TeachingPage = ({ onStartQuiz }) => {
  const [activeSection, setActiveSection] = useState(1);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (sectionNum) => {
    setActiveSection(sectionNum);
    const refs = { 1: section1Ref, 2: section2Ref, 3: section3Ref };
    refs[sectionNum]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: section1Ref, num: 1 },
        { ref: section2Ref, num: 2 },
        { ref: section3Ref, num: 3 }
      ];
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(section.num);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tocItems = [
    { num: 1, title: '畢氏定理', color: 'blue' },
    { num: 2, title: '三角比 (sin, cos, tan)', color: 'green' },
    { num: 3, title: '特殊角的三角比', color: 'amber' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 頂部導航 */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <HomeIcon className="w-5 h-5" />
            <span className="text-sm font-medium">返回主頁</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-blue-600">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">教學筆記</span>
            </div>
            <button
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              開始測驗
            </button>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* 左側目錄 */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                目錄
              </h3>
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <button
                    key={item.num}
                    onClick={() => scrollToSection(item.num)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                      activeSection === item.num
                        ? `bg-${item.color}-100 text-${item.color}-700 font-bold border-l-4 border-${item.color}-500`
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full bg-${item.color}-500 text-white flex items-center justify-center text-xs font-bold`}>
                      {item.num}
                    </span>
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* 主內容 */}
        <main className="flex-1 p-4 md:p-6 space-y-8 max-w-4xl">
          {/* Section 1: 畢氏定理 */}
          <section ref={section1Ref} className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 text-white font-black text-lg px-3 py-1 rounded-lg">1</span>
              <h2 className="text-xl font-bold text-blue-800">畢氏定理（Pythagoras' Theorem）</h2>
            </div>
            <PythagorasNotesBlock />
          </section>

          {/* Section 2: 三角比 */}
          <section ref={section2Ref} className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white font-black text-lg px-3 py-1 rounded-lg">2</span>
              <h2 className="text-xl font-bold text-green-800">三角比（Trigonometric Ratios）</h2>
            </div>
            <TrigRatiosNotesBlock />
          </section>

          {/* Section 3: 特殊角 */}
          <section ref={section3Ref} className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-amber-500 text-white font-black text-lg px-3 py-1 rounded-lg">3</span>
              <h2 className="text-xl font-bold text-amber-800">特殊角的三角比 (F3)</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="font-bold text-amber-700 mb-3">必背特殊角數值</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-center text-sm border-collapse">
                    <thead>
                      <tr className="bg-amber-100">
                        <th className="border border-amber-300 px-3 py-2"><Latex math="\theta" /></th>
                        <th className="border border-amber-300 px-3 py-2"><Latex math="30°" /></th>
                        <th className="border border-amber-300 px-3 py-2"><Latex math="45°" /></th>
                        <th className="border border-amber-300 px-3 py-2"><Latex math="60°" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-amber-300 px-3 py-2 font-bold text-red-600"><Latex math="\sin \theta" /></td>
                        <td className="border border-amber-300 px-3 py-2"><Latex math="\dfrac{1}{2}" /></td>
                        <td className="border border-amber-300 px-3 py-2"><Latex math="\dfrac{\sqrt{2}}{2}" /></td>
                        <td className="border border-amber-300 px-3 py-2"><Latex math="\dfrac{\sqrt{3}}{2}" /></td>
                      </tr>
                      <tr className="bg-amber-50">
                        <td className="border border-amber-300 px-3 py-2 font-bold text-blue-600"><Latex math="\cos \theta" /></td>
                        <td className="border border-amber-300 px-3 py-2"><Latex math="\dfrac{\sqrt{3}}{2}" /></td>
                        <td className="border border-amber-300 px-3 py-2"><Latex math="\dfrac{\sqrt{2}}{2}" /></td>
                        <td className="border border-amber-300 px-3 py-2"><Latex math="\dfrac{1}{2}" /></td>
                      </tr>
                      <tr>
                        <td className="border border-amber-300 px-3 py-2 font-bold text-green-600"><Latex math="\tan \theta" /></td>
                        <td className="border border-amber-300 px-3 py-2"><Latex math="\dfrac{1}{\sqrt{3}}" /></td>
                        <td className="border border-amber-300 px-3 py-2"><Latex math="1" /></td>
                        <td className="border border-amber-300 px-3 py-2"><Latex math="\sqrt{3}" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <p className="font-bold text-purple-700 mb-2">💡 記憶技巧</p>
                <div className="text-sm space-y-2 text-slate-700">
                  <p><strong>sin 值</strong>（分子由小到大）：<Latex math="\dfrac{1}{2},\ \dfrac{\sqrt{2}}{2},\ \dfrac{\sqrt{3}}{2}" /></p>
                  <p><strong>cos 值</strong>（與 sin 反過來）：<Latex math="\dfrac{\sqrt{3}}{2},\ \dfrac{\sqrt{2}}{2},\ \dfrac{1}{2}" /></p>
                  <p><strong>tan 值</strong>：<Latex math="\dfrac{1}{\sqrt{3}},\ 1,\ \sqrt{3}" /></p>
                </div>
              </div>
            </div>
          </section>

          {/* 開始測驗按鈕 */}
          <div className="text-center py-6">
            <button
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center gap-3 mx-auto"
            >
              <GraduationCap className="w-6 h-6" />
              開始測驗
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

// ========================================
// 測驗頁面
// ========================================
const QuizPage = ({ onBackToTeaching }) => {
  const [quizType, setQuizType] = useState(null); // 'pythag' | 'trig_side' | 'trig_angle' | 'converse'
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState({ type: 'neutral', msg: '' });
  const [scoreData, setScoreData] = useState({
    pythag: { score: 0, total: 0 },
    trig_side: { score: 0, total: 0 },
    trig_angle: { score: 0, total: 0 },
    converse: { score: 0, total: 0 }
  });
  const [isAnswered, setIsAnswered] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // 逆定理專用狀態
  const [converseData, setConverseData] = useState(null);
  const [selectedTriangles, setSelectedTriangles] = useState(new Set());

  const inputRef = useRef(null);
  const lastQuestionKey = useRef(null);

  const selectQuizType = (type) => {
    lastQuestionKey.current = null;
    setQuizType(type);
    if (type === 'converse') {
      setConverseData(generateConverseQuestion());
      setSelectedTriangles(new Set());
      setFeedback({ type: 'neutral', msg: '' });
      setIsAnswered(false);
    } else {
      generateNewQuestion(type);
    }
  };

  const generateNewQuestion = (type) => {
    let question;
    let attempts = 0;
    if (type === 'converse') {
      setConverseData(generateConverseQuestion());
      setSelectedTriangles(new Set());
      setFeedback({ type: 'neutral', msg: '' });
      setIsAnswered(false);
      return;
    }
    do {
      if (type === 'pythag') question = generatePythagorasQuestion();
      else if (type === 'trig_side') question = pick(generateTrigFindSide());
      else if (type === 'trig_angle') question = pick(generateTrigFindAngle());
      attempts++;
    } while (
      attempts < 10 &&
      lastQuestionKey.current !== null &&
      `${question.questionText}|${question.answer}` === lastQuestionKey.current
    );
    lastQuestionKey.current = `${question.questionText}|${question.answer}`;
    setCurrentQuestion(question);
    setUserAnswer('');
    setFeedback({ type: 'neutral', msg: '' });
    setIsAnswered(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Parse expressions like "√8", "2√3", "10" into a numeric value
  const parseSurd = (str) => {
    const s = str.trim().replace(/\s/g, '');
    // Match: optional coefficient, √, radicand — e.g. "2√3", "√8", "10√2"
    const m = s.match(/^(\d+(?:\.\d+)?)?√(\d+(?:\.\d+)?)$/);
    if (m) {
      const coeff = m[1] ? parseFloat(m[1]) : 1;
      return coeff * Math.sqrt(parseFloat(m[2]));
    }
    const n = parseFloat(s);
    return isNaN(n) ? null : n;
  };

  const handleSubmit = () => {
    if (!userAnswer.trim() || isAnswered) return;

    const userVal = parseSurd(userAnswer);
    if (userVal === null) return;

    const correctVal = currentQuestion.answer;
    const isCorrect = round3sf(userVal) === round3sf(Number(correctVal));
    const shownAnswer = currentQuestion.answerDisplay || String(correctVal);

    setIsAnswered(true);

    if (isCorrect) {
      setScoreData(prev => ({
        ...prev,
        [quizType]: { score: prev[quizType].score + 1, total: prev[quizType].total + 1 }
      }));
      setFeedback({
        type: 'correct', msg: '答案正確！',
        answer: shownAnswer,
        steps: currentQuestion.steps
      });
    } else {
      setScoreData(prev => ({
        ...prev,
        [quizType]: { ...prev[quizType], total: prev[quizType].total + 1 }
      }));
      setFeedback({
        type: 'incorrect',
        msg: `答案是 ${shownAnswer}`,
        answer: shownAnswer,
        steps: currentQuestion.steps
      });
    }
  };

  const handleNext = () => {
    generateNewQuestion(quizType);
  };

  const handleKeypadInput = (val) => {
    if (val === 'AC') {
      setUserAnswer('');
      return;
    }
    setUserAnswer(prev => prev + val);
  };

  const handleKeypadDelete = () => {
    setUserAnswer(prev => prev.slice(0, -1));
  };

  const backToSelection = () => {
    setQuizType(null);
    setCurrentQuestion(null);
    setConverseData(null);
    setSelectedTriangles(new Set());
  };

  // 逆定理：切換選擇
  const toggleTriangle = (label) => {
    if (isAnswered) return;
    setSelectedTriangles(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  };

  // 逆定理：提交答案
  const handleConverseSubmit = () => {
    if (isAnswered || !converseData) return;
    setIsAnswered(true);

    const correctLabels = new Set(
      converseData.triangles.filter(t => t.isRight).map(t => t.label)
    );
    const isCorrect =
      selectedTriangles.size === correctLabels.size &&
      [...selectedTriangles].every(l => correctLabels.has(l));

    const correctStr = [...correctLabels].join('、');

    if (isCorrect) {
      setScoreData(prev => ({
        ...prev,
        converse: { score: prev.converse.score + 1, total: prev.converse.total + 1 }
      }));
      setFeedback({ type: 'correct', msg: '答案正確！' });
    } else {
      setScoreData(prev => ({
        ...prev,
        converse: { ...prev.converse, total: prev.converse.total + 1 }
      }));
      setFeedback({ type: 'incorrect', msg: `正確答案：三角形 ${correctStr}` });
    }
  };

  // 逆定理：下一題
  const handleConverseNext = () => {
    setConverseData(generateConverseQuestion());
    setSelectedTriangles(new Set());
    setFeedback({ type: 'neutral', msg: '' });
    setIsAnswered(false);
  };

  const getCurrentScore = () => {
    if (!quizType) return { score: 0, total: 0 };
    return scoreData[quizType];
  };

  // 類型選擇界面
  if (!quizType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={onBackToTeaching}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回教學</span>
            </button>
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
              <HomeIcon className="w-5 h-5" />
              <span className="text-sm font-medium">主頁</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">選擇測驗類型</h1>

          <div className="grid gap-4">
            {/* 畢氏定理 */}
            <button
              onClick={() => selectQuizType('pythag')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-blue-400 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <Calculator className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">畢氏定理</h2>
                  <p className="text-slate-600 text-sm">直角三角形求邊長</p>
                  <p className="text-xs text-slate-400 mt-1">
                    得分：{scoreData.pythag.score}/{scoreData.pythag.total}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>

            <a
              href="/ninja-trig-dojo.html"
              target="_blank"
              rel="noopener noreferrer"
              className="-mt-1 bg-blue-50 rounded-xl border border-blue-200 px-5 py-3 text-blue-800 font-semibold hover:bg-blue-100 transition-colors text-center"
            >
              分辨對鄰斜邊（忍者貓道場）
            </a>

            {/* 三角比 - 求邊長 */}
            <button
              onClick={() => selectQuizType('trig_side')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-green-400 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">三角比 (求邊長)</h2>
                  <p className="text-slate-600 text-sm">已知一角和一邊求另一邊</p>
                  <p className="text-xs text-slate-400 mt-1">
                    得分：{scoreData.trig_side.score}/{scoreData.trig_side.total}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-green-600 transition-colors" />
              </div>
            </button>

            {/* 三角比 - 求角度 */}
            <button
              onClick={() => selectQuizType('trig_angle')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-purple-400 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-4 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">三角比 (求角度)</h2>
                  <p className="text-slate-600 text-sm">已知兩邊長度求未知角 θ</p>
                  <p className="text-xs text-slate-400 mt-1">
                    得分：{scoreData.trig_angle.score}/{scoreData.trig_angle.total}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </button>

            {/* 畢氏定理逆定理 */}
            <button
              onClick={() => selectQuizType('converse')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-amber-400 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 p-4 rounded-xl group-hover:bg-amber-200 transition-colors">
                  <Calculator className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">畢氏定理的逆定理</h2>
                  <p className="text-slate-600 text-sm">判斷哪些是直角三角形</p>
                  <p className="text-xs text-slate-400 mt-1">
                    得分：{scoreData.converse.score}/{scoreData.converse.total}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-amber-600 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── 逆定理測驗界面 ───
  if (quizType === 'converse' && converseData) {
    const correctLabels = new Set(
      converseData.triangles.filter(t => t.isRight).map(t => t.label)
    );
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* 頂部導航 */}
          <div className="mb-4 flex items-center justify-between">
            <button onClick={backToSelection} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回選擇</span>
            </button>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-bold text-slate-700">{scoreData.converse.score}/{scoreData.converse.total}</span>
            </div>
          </div>

          {/* 題目類型標題 */}
          <div className="rounded-xl p-4 mb-4 bg-amber-100">
            <h2 className="text-lg font-bold text-amber-700">📐 畢氏定理的逆定理</h2>
          </div>

          {/* 題目卡片 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <p className="text-sm text-slate-600 mb-4">下列哪些是直角三角形？（可多於一個答案）</p>

            {/* 三個三角形 */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {converseData.triangles.map(t => {
                let sel = undefined; // unresolved
                if (isAnswered) {
                  sel = t.isRight; // true=green, false=red
                } else if (selectedTriangles.has(t.label)) {
                  sel = 'selected';
                }
                const borderClass =
                  sel === true ? 'border-green-400 ring-2 ring-green-300' :
                  sel === false ? 'border-red-400 ring-2 ring-red-300' :
                  sel === 'selected' ? 'border-blue-400 ring-2 ring-blue-300' :
                  'border-slate-200 hover:border-blue-400';
                const checkColor = isAnswered
                  ? (t.isRight ? 'text-green-600' : 'text-red-400')
                  : (selectedTriangles.has(t.label) ? 'text-blue-600' : 'text-slate-300');

                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => toggleTriangle(t.label)}
                    disabled={isAnswered}
                    className={`bg-white rounded-xl border-2 p-2 transition-all ${borderClass} flex flex-col items-center relative`}
                  >
                    {/* 勾選標記 */}
                    <div className={`absolute top-2 right-2 w-5 h-5 rounded border-2 flex items-center justify-center text-xs font-bold ${
                      (selectedTriangles.has(t.label) || (isAnswered && t.isRight))
                        ? `${checkColor} border-current bg-current/10`
                        : 'border-slate-300'
                    }`}>
                      {(selectedTriangles.has(t.label) || (isAnswered && t.isRight)) && '✓'}
                    </div>
                    <GeneralTriangleSVG
                      sides={t.sides}
                      label={t.label}
                      rotation={t.rotation}
                    />
                  </button>
                );
              })}
            </div>

            {/* 反饋 */}
            {feedback.type !== 'neutral' && (
              <div className={`rounded-lg p-4 mb-4 ${
                feedback.type === 'correct'
                  ? 'bg-green-100 border border-green-300'
                  : 'bg-red-100 border border-red-300'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {feedback.type === 'correct'
                    ? <Check className="w-5 h-5 text-green-600" />
                    : <X className="w-5 h-5 text-red-600" />
                  }
                  <span className={`font-bold ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                    {feedback.type === 'correct' ? '正確！' : '不正確'}
                  </span>
                </div>
                {feedback.type === 'incorrect' && (
                  <p className={`text-sm font-medium text-red-700 mb-2`}>{feedback.msg}</p>
                )}
                {/* 步驟：顯示全部3個三角形的計算 */}
                <div className="mt-3 border-t pt-3 border-green-300 space-y-3">
                  <p className={`text-xs font-bold ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>解題步驟：</p>
                  {converseData.steps.map((s, i) => (
                    <div key={i} className="bg-white/60 rounded-lg p-3">
                      {s.lines.map((line, j) => (
                        <div key={j} className="mb-0.5">
                          <StepText text={line} />
                        </div>
                      ))}
                      <div className={`mt-1 font-bold text-sm ${s.isRight ? 'text-green-700' : 'text-red-600'}`}>
                        {s.conclusion}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 按鈕 */}
            <div className="flex gap-3">
              {!isAnswered ? (
                <button
                  onClick={handleConverseSubmit}
                  disabled={selectedTriangles.size === 0}
                  className="flex-1 bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  提交答案
                </button>
              ) : (
                <button
                  onClick={handleConverseNext}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  下一題
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 測驗界面
  let color = 'blue';
  let typeName = '畢氏定理';
  if (quizType === 'pythag') { color = 'blue'; typeName = '畢氏定理'; }
  else if (quizType === 'trig_side') { color = 'green'; typeName = '三角比 (求邊長)'; }
  else if (quizType === 'trig_angle') { color = 'purple'; typeName = '三角比 (求角度)'; }
  const currentScoreData = getCurrentScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 頂部導航 */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={backToSelection}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回選擇</span>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm font-medium">筆記</span>
            </button>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-bold text-slate-700">{currentScoreData.score}/{currentScoreData.total}</span>
            </div>
          </div>
        </div>

        {/* 題目類型標題 */}
        <div className={`rounded-xl p-4 mb-4 bg-${color}-100`}>
          <h2 className={`text-lg font-bold text-${color}-700`}>
            📐 {typeName}
          </h2>
        </div>

        {/* 題目卡片 */}
        {currentQuestion && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <p className="text-sm text-slate-500 mb-2">{currentQuestion.questionText}</p>

            {/* 三角形 SVG */}
            <div className="my-4">
              <TriangleSVG
                triangle={currentQuestion.triangle}
                unknownSide={currentQuestion.unknownSide}
                unknownAngle={currentQuestion.unknownAngle}
                quizType={quizType}
                visibleSides={currentQuestion.visibleSides || ['a','b','c']}
                visibleAngles={currentQuestion.visibleAngles || ['A','B']}
              />
            </div>

            {/* 輸入區 */}
            <div className="flex flex-col gap-3 mb-4">
              <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (isAnswered ? handleNext() : handleSubmit())}
                placeholder={currentQuestion.unknownAngle ? '輸入角度（度）' : '輸入長度'}
                disabled={isAnswered}
                className={`w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-lg focus:border-${color}-500 focus:outline-none disabled:bg-gray-100`}
              />
            </div>

            {/* 反饋 */}
            {feedback.type !== 'neutral' && (
              <div className={`rounded-lg p-4 mb-4 ${
                feedback.type === 'correct'
                  ? 'bg-green-100 border border-green-300'
                  : 'bg-red-100 border border-red-300'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {feedback.type === 'correct'
                    ? <Check className="w-5 h-5 text-green-600" />
                    : <X className="w-5 h-5 text-red-600" />
                  }
                  <span className={`font-bold ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                    {feedback.type === 'correct' ? '正確！' : '不正確'}
                  </span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                  <span className="font-medium">答案：</span>
                  <span className="font-bold">{feedback.answer}{currentQuestion.unknownAngle ? '°' : ''}</span>
                </div>
                {feedback.steps && feedback.steps.length > 0 && (
                  <div className={`mt-3 border-t pt-2 ${feedback.type === 'correct' ? 'border-green-300' : 'border-red-300'}`}>
                    <p className={`text-xs font-bold mb-1 ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>解題步驟：</p>
                    {feedback.steps.map((step, i) => (
                      <div key={i} className="mb-1">
                        <StepText text={step} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 按鈕 */}
            <div className="flex gap-3">
              {!isAnswered ? (
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className={`flex-1 bg-${color}-500 text-white py-3 rounded-lg font-bold hover:bg-${color}-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >
                  提交答案
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  下一題
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 虛擬鍵盤 */}
        {currentQuestion && (
          <TrigKeyboard
            onInput={handleKeypadInput}
            onDelete={handleKeypadDelete}
            onSubmit={isAnswered ? handleNext : handleSubmit}
            disabled={isAnswered}
          />
        )}

        {/* 快速筆記 Modal */}
        {showNotes && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowNotes(false)}>
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">📝 快速筆記</h3>
                <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-bold text-blue-700 mb-1">1. 畢氏定理</p>
                  <Latex math="c^2 = a^2 + b^2" />
                  <p className="text-slate-600 mt-1">斜邊² = 兩直角邊²之和</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-bold text-green-700 mb-1">2. 三角比 SOH CAH TOA</p>
                  <div className="space-y-1 text-slate-600">
                    <p><Latex math="\sin\theta = \frac{\text{對}}{\text{斜}}" />　
                       <Latex math="\cos\theta = \frac{\text{鄰}}{\text{斜}}" />　
                       <Latex math="\tan\theta = \frac{\text{對}}{\text{鄰}}" /></p>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-bold text-amber-700 mb-1">3. 特殊角</p>
                  <p className="text-slate-600">sin 30°=½　cos 60°=½　tan 45°=1</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ========================================
// 主應用程式
// ========================================
const TrigQuiz = () => {
  const [currentPage, setCurrentPage] = useState('teaching');

  return currentPage === 'teaching' ? (
    <TeachingPage onStartQuiz={() => setCurrentPage('quiz')} />
  ) : (
    <QuizPage onBackToTeaching={() => setCurrentPage('teaching')} />
  );
};

export default TrigQuiz;
