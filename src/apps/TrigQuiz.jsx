import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon, BookOpen, Calculator, GraduationCap, ArrowRight, ArrowLeft,
  Check, X, RefreshCw, Trophy, Lightbulb, ChevronDown, ChevronUp
} from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';

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
      {quizType === 'trig' && (
        <>
          {/* Angle A arc & text */}
          {(unknownAngle === 'A' || visibleAngles.includes('A')) && (() => {
            const arcRadius = 24;
            const aAB = Math.atan2(by - ay, bx - ax);
            const aAC = Math.PI / 2;
            const xA1 = ax + arcRadius * Math.cos(aAB);
            const yA1 = ay + arcRadius * Math.sin(aAB);
            const xA2 = ax + arcRadius * Math.cos(aAC);
            const yA2 = ay + arcRadius * Math.sin(aAC);
            const arcA = `M ${xA1} ${yA1} A ${arcRadius} ${arcRadius} 0 0 1 ${xA2} ${yA2}`;
            
            const midA = (aAB + aAC) / 2;
            const textAx = ax + (arcRadius + 14) * Math.cos(midA);
            const textAy = ay + (arcRadius + 14) * Math.sin(midA) + 5;
            
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
            const arcRadius = 24;
            const bBC = -Math.PI; // Use -PI so it is close to bBA (which is between -PI and -PI/2)
            const bBA = Math.atan2(ay - by, ax - bx);
            const xB1 = bx + arcRadius * Math.cos(bBC);
            const yB1 = by + arcRadius * Math.sin(bBC);
            const xB2 = bx + arcRadius * Math.cos(bBA);
            const yB2 = by + arcRadius * Math.sin(bBA);
            const arcB = `M ${xB1} ${yB1} A ${arcRadius} ${arcRadius} 0 0 1 ${xB2} ${yB2}`;
            
            const midB = (bBC + bBA) / 2;
            const textBx = bx + (arcRadius + 16) * Math.cos(midB);
            const textBy = by + (arcRadius + 16) * Math.sin(midB) + 5;

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
const toRad = (deg) => deg * Math.PI / 180;

// 常用的畢式三元數 (a, b, c) where a²+b²=c²
const PYTHAG_TRIPLES = [
  [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25],
  [6, 8, 10], [9, 12, 15], [12, 16, 20], [15, 20, 25],
  [10, 24, 26], [20, 21, 29], [9, 40, 41], [12, 35, 37]
];

// 畢氏定理題目生成
const generatePythagorasQuestion = () => {
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

// 三角比題目生成
const generateTrigQuestion = () => {
  // Common angles for clean values
  const angles = [30, 45, 60];
  // Nice side lengths that produce clean trig results
  const scenarios = [
    // Find side given angle and one side
    ...generateTrigFindSide(),
    // Find angle given two sides
    ...generateTrigFindAngle()
  ];
  return pick(scenarios);
};

const generateTrigFindSide = () => {
  const results = [];

  // --- Scenario group 1: Given angle A and one side, find another ---
  // angle A at vertex A, C=90°, B = 90-A
  // sin A = a/c (opp/hyp), cos A = b/c (adj/hyp), tan A = a/b (opp/adj)

  // Using angle 30°
  // sin30 = 1/2 → a/c = 1/2
  {
    const c = pick([10, 20, 14, 16, 18, 22, 24]);
    const a = c / 2;
    const b = round2(Math.sqrt(c * c - a * a));
    results.push({
      triangle: { a, b: round2(b), c, A: 30, B: 60 },
      unknownSide: 'a', unknownAngle: null,
      visibleSides: ['c'], visibleAngles: ['A'],
      answer: a, answerAlt: [String(a)],
      questionText: '求 BC 的長度。',
      steps: [
        `已掌握資料如下：$\\angle BAC = 30°$，AB = ${c}（斜邊）。`,
        `要找以下長度：BC（對邊）。對邊 + 斜邊的組合，使用 $\\sin$。`,
        `$$\\begin{align*}\\sin 30° &= \\dfrac{BC}{AB} \\\\[4pt] BC &= AB \\times \\sin 30° \\\\[4pt] &= ${c} \\times \\sin 30° \\\\[2pt] &= ${a}\\end{align*}$$`
      ]
    });
  }

  // cos30 = √3/2 → b/c
  {
    const c = pick([10, 20, 14, 16, 18, 22]);
    const b = round2(c * Math.sqrt(3) / 2);
    const a = c / 2;
    results.push({
      triangle: { a, b: round2(b), c, A: 30, B: 60 },
      unknownSide: 'b', unknownAngle: null,
      visibleSides: ['c'], visibleAngles: ['A'],
      answer: round2(b), answerAlt: [String(round2(b))],
      questionText: '求 AC 的長度。（答案取至3位有效數字）',
      steps: [
        `已掌握資料如下：$\\angle BAC = 30°$，AB = ${c}（斜邊）。`,
        `要找以下長度：AC（鄰邊）。鄰邊 + 斜邊的組合，使用 $\\cos$。`,
        `$$\\begin{align*}\\cos 30° &= \\dfrac{AC}{AB} \\\\[4pt] AC &= AB \\times \\cos 30° \\\\[4pt] &= ${c} \\times \\cos 30° \\\\[2pt] &= ${round2(b)}\\end{align*}$$`
      ]
    });
  }

  // tan45 = 1 → a = b
  {
    const b = pick([5, 7, 8, 9, 11, 12, 13, 15]);
    const a = b;
    const c = round2(Math.sqrt(a * a + b * b));
    results.push({
      triangle: { a, b, c: round2(c), A: 45, B: 45 },
      unknownSide: 'a', unknownAngle: null,
      visibleSides: ['b'], visibleAngles: ['A'],
      answer: a, answerAlt: [String(a)],
      questionText: '求 BC 的長度。',
      steps: [
        `已掌握資料如下：$\\angle BAC = 45°$，AC = ${b}（鄰邊）。`,
        `要找以下長度：BC（對邊）。對邊 + 鄰邊的組合，使用 $\\tan$。`,
        `$$\\begin{align*}\\tan 45° &= \\dfrac{BC}{AC} \\\\[4pt] BC &= AC \\times \\tan 45° \\\\[4pt] &= ${b} \\times \\tan 45° \\\\[2pt] &= ${a}\\end{align*}$$`
      ]
    });
  }

  // sin60 = √3/2 → a/c
  {
    const c = pick([10, 12, 14, 16, 18, 20, 22]);
    const a = round2(c * Math.sqrt(3) / 2);
    const b = c / 2;
    results.push({
      triangle: { a: round2(a), b, c, A: 60, B: 30 },
      unknownSide: 'a', unknownAngle: null,
      visibleSides: ['c'], visibleAngles: ['A'],
      answer: round2(a), answerAlt: [String(round2(a))],
      questionText: '求 BC 的長度。（答案取至3位有效數字）',
      steps: [
        `已掌握資料如下：$\\angle BAC = 60°$，AB = ${c}（斜邊）。`,
        `要找以下長度：BC（對邊）。對邊 + 斜邊的組合，使用 $\\sin$。`,
        `$$\\begin{align*}\\sin 60° &= \\dfrac{BC}{AB} \\\\[4pt] BC &= AB \\times \\sin 60° \\\\[4pt] &= ${c} \\times \\sin 60° \\\\[2pt] &= ${round2(a)}\\end{align*}$$`
      ]
    });
  }

  // cos60 = 1/2 → b/c
  {
    const c = pick([10, 12, 14, 16, 18, 20, 22]);
    const b = c / 2;
    const a = round2(Math.sqrt(c * c - b * b));
    results.push({
      triangle: { a: round2(a), b, c, A: 60, B: 30 },
      unknownSide: 'b', unknownAngle: null,
      visibleSides: ['c'], visibleAngles: ['A'],
      answer: b, answerAlt: [String(b)],
      questionText: '求 AC 的長度。',
      steps: [
        `已掌握資料如下：$\\angle BAC = 60°$，AB = ${c}（斜邊）。`,
        `要找以下長度：AC（鄰邊）。鄰邊 + 斜邊的組合，使用 $\\cos$。`,
        `$$\\begin{align*}\\cos 60° &= \\dfrac{AC}{AB} \\\\[4pt] AC &= AB \\times \\cos 60° \\\\[4pt] &= ${c} \\times \\cos 60° \\\\[2pt] &= ${b}\\end{align*}$$`
      ]
    });
  }

  // tan30 = 1/√3: given b, find a
  {
    const b = pick([6, 8, 10, 12, 15, 18, 20]);
    const a = round2(b * Math.tan(toRad(30)));
    const c = round2(Math.sqrt(a * a + b * b));
    results.push({
      triangle: { a: round2(a), b, c: round2(c), A: 30, B: 60 },
      unknownSide: 'a', unknownAngle: null,
      visibleSides: ['b'], visibleAngles: ['A'],
      answer: round2(a), answerAlt: [String(round2(a))],
      questionText: '求 BC 的長度。（答案取至3位有效數字）',
      steps: [
        `已掌握資料如下：$\\angle BAC = 30°$，AC = ${b}（鄰邊）。`,
        `要找以下長度：BC（對邊）。對邊 + 鄰邊的組合，使用 $\\tan$。`,
        `$$\\begin{align*}\\tan 30° &= \\dfrac{BC}{AC} \\\\[4pt] BC &= AC \\times \\tan 30° \\\\[4pt] &= ${b} \\times \\tan 30° \\\\[2pt] &= ${round2(a)}\\end{align*}$$`
      ]
    });
  }

  // tan60 = √3: given b, find a
  {
    const b = pick([4, 5, 6, 7, 8, 9, 10]);
    const a = round2(b * Math.sqrt(3));
    const c = round2(Math.sqrt(a * a + b * b));
    results.push({
      triangle: { a: round2(a), b, c: round2(c), A: 60, B: 30 },
      unknownSide: 'a', unknownAngle: null,
      visibleSides: ['b'], visibleAngles: ['A'],
      answer: round2(a), answerAlt: [String(round2(a))],
      questionText: '求 BC 的長度。（答案取至3位有效數字）',
      steps: [
        `已掌握資料如下：$\\angle BAC = 60°$，AC = ${b}（鄰邊）。`,
        `要找以下長度：BC（對邊）。對邊 + 鄰邊的組合，使用 $\\tan$。`,
        `$$\\begin{align*}\\tan 60° &= \\dfrac{BC}{AC} \\\\[4pt] BC &= AC \\times \\tan 60° \\\\[4pt] &= ${b} \\times \\tan 60° \\\\[2pt] &= ${round2(a)}\\end{align*}$$`
      ]
    });
  }

  // sin with general angle: find hyp given opp
  {
    const A = pick([25, 35, 40, 50, 55, 65, 70]);
    const a = pick([6, 8, 10, 12, 15]);
    const c = round2(a / Math.sin(toRad(A)));
    const b = round2(Math.sqrt(c * c - a * a));
    results.push({
      triangle: { a, b: round2(b), c: round2(c), A, B: 90 - A },
      unknownSide: 'c', unknownAngle: null,
      visibleSides: ['a'], visibleAngles: ['A'],
      answer: round2(c), answerAlt: [String(round2(c))],
      questionText: '求 AB 的長度。（答案取至3位有效數字）',
      steps: [
        `已掌握資料如下：$\\angle BAC = ${A}°$，BC = ${a}（對邊）。`,
        `要找以下長度：AB（斜邊）。對邊 + 斜邊的組合，使用 $\\sin$。`,
        `$$\\begin{align*}\\sin ${A}° &= \\dfrac{BC}{AB} \\\\[4pt] AB &= \\dfrac{BC}{\\sin ${A}°} \\\\[4pt] &= \\dfrac{${a}}{\\sin ${A}°} \\\\[2pt] &= ${round2(c)}\\end{align*}$$`
      ]
    });
  }

  return results;
};

const generateTrigFindAngle = () => {
  const results = [];

  // Given two sides, find angle (using inverse trig)
  // tan A = a/b → A = arctan(a/b)
  {
    const A = pick([25, 30, 35, 40, 45, 50, 55, 60, 65]);
    const b = pick([5, 6, 8, 10, 12, 15]);
    const a = round2(b * Math.tan(toRad(A)));
    const c = round2(Math.sqrt(a * a + b * b));
    results.push({
      triangle: { a: round2(a), b, c: round2(c), A, B: 90 - A },
      unknownSide: null, unknownAngle: 'A',
      visibleSides: ['a', 'b'], visibleAngles: [],
      answer: A, answerAlt: [String(A)],
      questionText: '求 ∠BAC 的度數。（答案取至整數）',
      steps: [
        `已掌握資料如下：BC = ${round2(a)}（對邊），AC = ${b}（鄰邊）。`,
        `要找以下角度：$\\angle BAC$。對邊 + 鄰邊的組合，使用 $\\tan$。`,
        `$$\\begin{align*}\\tan \\angle BAC &= \\dfrac{BC}{AC} \\\\[4pt] \\tan \\angle BAC &= \\dfrac{${round2(a)}}{${b}} \\\\[4pt] \\angle BAC &= ${A}°\\end{align*}$$`
      ]
    });
  }

  // sin A = a/c → A = arcsin(a/c)
  {
    const A = pick([25, 30, 35, 40, 45, 50, 55, 60, 65]);
    const c = pick([10, 13, 15, 17, 20, 25]);
    const a = round2(c * Math.sin(toRad(A)));
    const b = round2(Math.sqrt(c * c - a * a));
    results.push({
      triangle: { a: round2(a), b: round2(b), c, A, B: 90 - A },
      unknownSide: null, unknownAngle: 'A',
      visibleSides: ['a', 'c'], visibleAngles: [],
      answer: A, answerAlt: [String(A)],
      questionText: '求 ∠BAC 的度數。（答案取至整數）',
      steps: [
        `已掌握資料如下：BC = ${round2(a)}（對邊），AB = ${c}（斜邊）。`,
        `要找以下角度：$\\angle BAC$。對邊 + 斜邊的組合，使用 $\\sin$。`,
        `$$\\begin{align*}\\sin \\angle BAC &= \\dfrac{BC}{AB} \\\\[4pt] \\sin \\angle BAC &= \\dfrac{${round2(a)}}{${c}} \\\\[4pt] \\angle BAC &= ${A}°\\end{align*}$$`
      ]
    });
  }

  // cos A = b/c → A = arccos(b/c)
  {
    const A = pick([25, 30, 35, 40, 45, 50, 55, 60, 65]);
    const c = pick([10, 13, 15, 17, 20, 25]);
    const b = round2(c * Math.cos(toRad(A)));
    const a = round2(Math.sqrt(c * c - b * b));
    results.push({
      triangle: { a: round2(a), b: round2(b), c, A, B: 90 - A },
      unknownSide: null, unknownAngle: 'A',
      visibleSides: ['b', 'c'], visibleAngles: [],
      answer: A, answerAlt: [String(A)],
      questionText: '求 ∠BAC 的度數。（答案取至整數）',
      steps: [
        `已掌握資料如下：AC = ${round2(b)}（鄰邊），AB = ${c}（斜邊）。`,
        `要找以下角度：$\\angle BAC$。鄰邊 + 斜邊的組合，使用 $\\cos$。`,
        `$$\\begin{align*}\\cos \\angle BAC &= \\dfrac{AC}{AB} \\\\[4pt] \\cos \\angle BAC &= \\dfrac{${round2(b)}}{${c}} \\\\[4pt] \\angle BAC &= ${A}°\\end{align*}$$`
      ]
    });
  }

  // Find angle B instead
  {
    const B = pick([25, 30, 35, 40, 45, 50, 55, 60, 65]);
    const a = pick([5, 6, 8, 10, 12]);
    const b = round2(a * Math.tan(toRad(B)));
    const c = round2(Math.sqrt(a * a + b * b));
    results.push({
      triangle: { a, b: round2(b), c: round2(c), A: 90 - B, B },
      unknownSide: null, unknownAngle: 'B',
      visibleSides: ['a', 'b'], visibleAngles: [],
      answer: B, answerAlt: [String(B)],
      questionText: '求 ∠ABC 的度數。（答案取至整數）',
      steps: [
        `已掌握資料如下：AC = ${round2(b)}（對邊），BC = ${a}（鄰邊）。`,
        `要找以下角度：$\\angle ABC$。對邊 + 鄰邊的組合，使用 $\\tan$。`,
        `$$\\begin{align*}\\tan \\angle ABC &= \\dfrac{AC}{BC} \\\\[4pt] \\tan \\angle ABC &= \\dfrac{${round2(b)}}{${a}} \\\\[4pt] \\angle ABC &= ${B}°\\end{align*}$$`
      ]
    });
  }

  return results;
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

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="font-bold text-blue-700 mb-4">定理</p>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1 space-y-3">
                    <p className="text-slate-700">在直角三角形中，斜邊的平方等於其餘兩邊的平方和。</p>
                    <Latex math="c^2 = a^2 + b^2" block />
                    <p className="text-sm text-slate-500">其中 c 是斜邊（最長邊，直角的對邊）</p>
                  </div>
                  <div className="w-56 flex-shrink-0">
                    <svg viewBox="0 0 160 120" className="w-full">
                      <polygon points="10,100 130,100 130,20" fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth="2.5" strokeLinejoin="round" />
                      <polyline points="120,100 120,90 130,90" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
                      <text x="135" y="15" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#4f46e5">A</text>
                      <text x="0" y="105" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#4f46e5">B</text>
                      <text x="135" y="115" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#4f46e5">C</text>
                      <text x="70" y="115" fontSize="14" fontStyle="italic" fill="#334155">a</text>
                      <text x="140" y="65" fontSize="14" fontStyle="italic" fill="#334155">b</text>
                      <text x="60" y="50" fontSize="14" fontStyle="italic" fill="#334155">c</text>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="font-bold text-amber-700 mb-2">💡 步驟</p>
                <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                  <li><strong className="text-amber-800">1. 辨認最長的邊（斜邊）</strong>，其位於直角對面</li>
                  <li><strong className="text-amber-800">2. 寫出 <Latex math="c^2 = a^2 + b^2" /></strong>，將相應的數字放入公式</li>
                  <li>找斜邊：兩邊平方<strong>相加</strong>再開方</li>
                  <li>找短邊：斜邊平方<strong>減去</strong>另一邊平方再開方（需移項）</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                <div className="mb-4">
                  <p className="font-bold text-green-700 text-lg mb-1">例子：</p>
                  <p className="text-slate-700">求下列各三角形中的未知量。</p>
                  <p className="text-sm text-slate-500">（如有需要，取答案準確至三位有效數字。）</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Case 1 */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
                    <div className="flex gap-2 mb-4">
                      <span className="font-bold text-slate-700">(a)</span>
                      <div className="font-bold text-green-700">Case 1: 未知數為斜邊（最長）</div>
                    </div>
                    <div className="w-56 mx-auto mb-6">
                      <svg viewBox="0 0 160 120" className="w-full">
                        <polygon points="40,20 40,100 140,100" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="2.5" strokeLinejoin="round" />
                        <polyline points="40,90 50,90 50,100" fill="none" stroke="#16a34a" strokeWidth="1.5" />
                        <text x="35" y="15" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#16a34a">A</text>
                        <text x="25" y="110" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#16a34a">B</text>
                        <text x="145" y="110" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#16a34a">C</text>
                        <text x="5" y="65" fontSize="13" fill="#334155">6 m</text>
                        <text x="85" y="115" fontSize="13" fill="#334155">8 m</text>
                        <text x="95" y="50" fontSize="13" fill="#334155">x m</text>
                      </svg>
                    </div>
                    <Latex math="\begin{align*} x^2 &= 6^2 + 8^2 \\ x &= \sqrt{6^2 + 8^2} \\ x &= 10 \end{align*}" block />
                  </div>

                  {/* Case 2 */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
                    <div className="flex gap-2 mb-4">
                      <span className="font-bold text-slate-700">(b)</span>
                      <div className="font-bold text-amber-600">Case 2: 未知數為直角邊（非斜邊）</div>
                    </div>
                    <div className="w-56 mx-auto mb-6">
                      <svg viewBox="-20 0 180 120" className="w-full">
                        <polygon points="20,20 140,20 20,100" fill="rgba(217,119,6,0.08)" stroke="#d97706" strokeWidth="2.5" strokeLinejoin="round" />
                        <polyline points="20,30 30,30 30,20" fill="none" stroke="#d97706" strokeWidth="1.5" />
                        <text x="5" y="15" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#d97706">R</text>
                        <text x="145" y="15" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#d97706">Q</text>
                        <text x="5" y="110" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#d97706">P</text>
                        <text x="75" y="13" fontSize="13" fill="#334155">y cm</text>
                        <text x="17" y="65" fontSize="13" fill="#334155" textAnchor="end">10 cm</text>
                        <text x="85" y="70" fontSize="13" fill="#334155">22 cm</text>
                      </svg>
                    </div>
                    <div className="text-center">
                      <Latex math="\begin{align*} 10^2 + y^2 &= 22^2 \\ y^2 &= 22^2 - 10^2 \quad {\small\color{#d97706}(\text{需移項})} \\ y^2 &= 384 \\ y &= \sqrt{384} \\ y &= 19.6 \end{align*}" block />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 三角比 */}
          <section ref={section2Ref} className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white font-black text-lg px-3 py-1 rounded-lg">2</span>
              <h2 className="text-xl font-bold text-green-800">三角比（Trigonometric Ratios）</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="font-bold text-green-700 mb-3">三角比口訣：對斜鄰斜對鄰</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100">
                    <span className="bg-red-500 text-white font-bold px-3 py-1 rounded text-sm">正弦</span>
                    <div>
                      <Latex math="\sin \theta = \dfrac{\text{對邊}}{\text{斜邊}}" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100">
                    <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded text-sm">餘弦</span>
                    <div>
                      <Latex math="\cos \theta = \dfrac{\text{鄰邊}}{\text{斜邊}}" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100">
                    <span className="bg-green-600 text-white font-bold px-3 py-1 rounded text-sm">正切</span>
                    <div>
                      <Latex math="\tan \theta = \dfrac{\text{對邊}}{\text{鄰邊}}" />
                    </div>
                  </div>
                </div>
                {/* 三角形圖解 */}
                <div className="bg-white rounded-xl mt-3 border border-green-100 overflow-hidden" style={{ background: '#ffffff' }}>
                  <svg viewBox="0 0 600 260" className="w-full h-auto mx-auto" style={{ maxWidth: '600px' }}>
                    <defs>
                      <marker id="arrowBlue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                        <path d="M 0 2 L 10 6 L 0 10 z" fill="#3b75a6" />
                      </marker>
                      <marker id="arrowGreen" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                        <path d="M 0 2 L 10 6 L 0 10 z" fill="#5ba678" />
                      </marker>
                    </defs>
                    
                    {/* 內部三角形填充 */}
                    <polygon points="180,20 180,180 380,180" fill="rgba(59, 130, 246, 0.2)" />
                    
                    {/* 三條邊不同顏色 */}
                    <line x1="180" y1="20" x2="180" y2="180" stroke="#3b75a6" strokeWidth="4" strokeLinecap="round" />
                    <line x1="180" y1="180" x2="380" y2="180" stroke="#c9665e" strokeWidth="4" strokeLinecap="round" />
                    <line x1="180" y1="20" x2="380" y2="180" stroke="#5ba678" strokeWidth="4" strokeLinecap="round" />
                    
                    {/* 直角符號 */}
                    <polyline points="180,155 205,155 205,180" fill="none" stroke="#5ba678" strokeWidth="3" />
                    
                    {/* θ符號 */}
                    <path d="M 330 180 A 50 50 0 0 1 341 149" fill="none" stroke="#475569" strokeWidth="2.5" />
                    <text x="315" y="170" fill="#3b75a6" fontSize="24" fontWeight="bold" textAnchor="middle" fontStyle="italic">θ</text>
                    
                    {/* 兩條虛線箭頭 */}
                    <line x1="295" y1="150" x2="190" y2="100" stroke="#3b75a6" strokeWidth="3" strokeDasharray="8,6" markerEnd="url(#arrowBlue)" />
                    <line x1="210" y1="155" x2="270" y2="101" stroke="#5ba678" strokeWidth="3" strokeDasharray="8,6" markerEnd="url(#arrowGreen)" />
                    
                    {/* 左側文字 (對邊) */}
                    <text x="165" y="90" textAnchor="end" fill="#3b75a6" fontSize="24" fontWeight="bold" fontFamily="sans-serif">
                      <tspan x="165" dy="0"><tspan fontStyle="italic">θ</tspan> 對住個條邊</tspan>
                      <tspan x="165" dy="35">(對邊)</tspan>
                    </text>
                    
                    {/* 底部文字 (鄰邊) */}
                    <text x="280" y="225" textAnchor="middle" fill="#c9665e" fontSize="24" fontWeight="bold" fontFamily="sans-serif">
                      <tspan fontStyle="italic">θ</tspan>
                      <tspan> 同直角夾住個條邊 (鄰邊)</tspan>
                    </text>
                    
                    {/* 右側文字 (斜邊) */}
                    <text x="435" y="80" textAnchor="middle" fill="#5ba678" fontSize="24" fontWeight="bold" fontFamily="sans-serif">
                      <tspan x="435" dy="0">直角對住個條邊</tspan>
                      <tspan x="435" dy="35">(斜邊)</tspan>
                    </text>
                  </svg>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="font-bold text-amber-700 mb-2">💡 如何分辨對邊和鄰邊？</p>
                <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                  <li><strong>對邊</strong>：目標角的對面的邊</li>
                  <li><strong>鄰邊</strong>：目標角旁邊的邊（不是斜邊的那條）</li>
                  <li><strong>斜邊</strong>：直角對面、最長的邊</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="font-bold text-blue-700 mb-2">求角度（反三角函數）</p>
                <div className="text-sm space-y-1 text-slate-700">
                  <p>已知兩邊的比例，可以用反三角函數求角度：</p>
                  <div className="mt-2 space-y-1">
                    <Latex math="\theta = \sin^{-1}\left(\dfrac{\text{對邊}}{\text{斜邊}}\right)" block />
                    <Latex math="\theta = \cos^{-1}\left(\dfrac{\text{鄰邊}}{\text{斜邊}}\right)" block />
                    <Latex math="\theta = \tan^{-1}\left(\dfrac{\text{對邊}}{\text{鄰邊}}\right)" block />
                  </div>
                  <p className="mt-2 text-slate-500">計算機按法：<span className="bg-gray-300 text-yellow-700 text-xs font-mono px-2 py-0.5 rounded">SHIFT</span> + <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">sin</span> / <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">cos</span> / <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">tan</span></p>
                </div>
              </div>
            </div>
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
  const [quizType, setQuizType] = useState(null); // 'pythag' | 'trig'
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState({ type: 'neutral', msg: '' });
  const [scoreData, setScoreData] = useState({
    pythag: { score: 0, total: 0 },
    trig: { score: 0, total: 0 }
  });
  const [isAnswered, setIsAnswered] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const inputRef = useRef(null);

  const selectQuizType = (type) => {
    setQuizType(type);
    generateNewQuestion(type);
  };

  const generateNewQuestion = (type) => {
    const question = type === 'pythag' ? generatePythagorasQuestion() : generateTrigQuestion();
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
    const isCorrect = round3sf(userVal) === round3sf(correctVal);

    setIsAnswered(true);

    if (isCorrect) {
      setScoreData(prev => ({
        ...prev,
        [quizType]: { score: prev[quizType].score + 1, total: prev[quizType].total + 1 }
      }));
      setFeedback({
        type: 'correct', msg: '答案正確！',
        answer: String(correctVal),
        steps: currentQuestion.steps
      });
    } else {
      setScoreData(prev => ({
        ...prev,
        [quizType]: { ...prev[quizType], total: prev[quizType].total + 1 }
      }));
      setFeedback({
        type: 'incorrect',
        msg: `答案是 ${correctVal}`,
        answer: String(correctVal),
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

            {/* 三角比 */}
            <button
              onClick={() => selectQuizType('trig')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-green-400 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">三角比 (sin, cos, tan)</h2>
                  <p className="text-slate-600 text-sm">求邊長 / 求角度 θ</p>
                  <p className="text-xs text-slate-400 mt-1">
                    得分：{scoreData.trig.score}/{scoreData.trig.total}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-green-600 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 測驗界面
  const color = quizType === 'pythag' ? 'blue' : 'green';
  const typeName = quizType === 'pythag' ? '畢氏定理' : '三角比';
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
                className={`w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-lg focus:border-${color}-500 focus:outline-none disabled:bg-gray-100 font-mono`}
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
                  <span className="font-mono">{feedback.answer}{currentQuestion.unknownAngle ? '°' : ''}</span>
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
