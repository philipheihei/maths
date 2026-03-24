import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeft, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';

/* ====================================================================
   立體面積及體積 — SolidGeometryQuiz
   F1 CH5  面積和體積（一）
   ==================================================================== */

// ========== KaTeX 載入 ==========
let katexPromise = null;
const loadKatexOnce = () => {
  if (katexPromise) return katexPromise;
  katexPromise = new Promise((resolve, reject) => {
    if (window.katex) { resolve(); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
  return katexPromise;
};

const Latex = ({ math, block = false }) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(!!window.katex);
  useEffect(() => { if (!ready) loadKatexOnce().then(() => setReady(true)).catch(() => {}); }, [ready]);
  useEffect(() => {
    if (!ready || !ref.current) return;
    try { window.katex.render(math, ref.current, { throwOnError: false, displayMode: block }); }
    catch { if (ref.current) ref.current.textContent = math; }
  }, [math, block, ready]);
  return <span ref={ref} className={block ? 'block text-center my-2' : 'inline-block align-middle'} />;
};

// ========== 公式資料 ==========
const FORMULAS = [
  {
    group: '圓柱體',
    emoji: '🥫',
    color: 'blue',
    items: [
      { name: '曲面面積', latex: 'S_{\\text{曲}} = 2\\pi r h', vars: 'r = 底半徑，h = 高' },
      { name: '總表面面積', latex: 'S_{\\text{總}} = 2\\pi r h + 2\\pi r^2', vars: 'r = 底半徑，h = 高' },
      { name: '體積', latex: 'V = \\pi r^2 h', vars: 'r = 底半徑，h = 高' },
    ]
  },
  {
    group: '圓錐體',
    emoji: '🍦',
    color: 'orange',
    items: [
      { name: '曲面面積', latex: 'S_{\\text{曲}} = \\pi r l', vars: 'r = 底半徑，l = 斜高' },
      { name: '總表面面積', latex: 'S_{\\text{總}} = \\pi r l + \\pi r^2', vars: 'r = 底半徑，l = 斜高' },
      { name: '體積', latex: 'V = \\dfrac{1}{3}\\pi r^2 h', vars: 'r = 底半徑，h = 高' },
    ]
  },
  {
    group: '直立角錐',
    emoji: '🔺',
    color: 'red',
    items: [
      { name: '體積', latex: 'V = \\dfrac{1}{3} \\times \\text{底面積} \\times h', vars: 'h = 高' },
    ]
  },
  {
    group: '球體',
    emoji: '🏀',
    color: 'green',
    items: [
      { name: '表面面積', latex: 'S = 4\\pi r^2', vars: 'r = 半徑' },
      { name: '體積', latex: 'V = \\dfrac{4}{3}\\pi r^3', vars: 'r = 半徑' },
    ]
  },
  {
    group: '半球體',
    emoji: '🥣',
    color: 'teal',
    items: [
      { name: '總表面面積', latex: 'S_{\\text{總}} = 3\\pi r^2', vars: 'r = 半徑' },
      { name: '體積', latex: 'V = \\dfrac{2}{3}\\pi r^3', vars: 'r = 半徑' },
    ]
  },
  {
    group: '平截頭體（圓錐）',
    emoji: '🪣',
    color: 'purple',
    items: [
      { name: '體積', latex: 'V = \\dfrac{1}{3}\\pi h(R^2 + Rr + r^2)', vars: 'R = 大底半徑，r = 小底半徑，h = 高' },
    ]
  },
  {
    group: '平截頭體（角錐）',
    emoji: '⬡',
    color: 'indigo',
    items: [
      { name: '體積', latex: 'V = \\dfrac{h}{3}(A_1 + A_2 + \\sqrt{A_1 A_2})', vars: 'A₁ = 大底面積，A₂ = 小底面積，h = 高' },
    ]
  },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-300', title: 'text-blue-800', badge: 'bg-blue-600' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-300', title: 'text-orange-800', badge: 'bg-orange-600' },
  red: { bg: 'bg-red-50', border: 'border-red-300', title: 'text-red-800', badge: 'bg-red-600' },
  green: { bg: 'bg-green-50', border: 'border-green-300', title: 'text-green-800', badge: 'bg-green-600' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-300', title: 'text-teal-800', badge: 'bg-teal-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-300', title: 'text-purple-800', badge: 'bg-purple-600' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-300', title: 'text-indigo-800', badge: 'bg-indigo-600' },
};

// ========== 題目生成器 ==========
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const PI = Math.PI;
const round2 = v => Math.round(v * 100) / 100;

// Helper: generate question object
const mkQ = (text, answer, unit, steps, formulaLatex) => ({
  text, answer: round2(answer), unit, steps, formulaLatex
});

const generators = [
  // ── 圓柱體 ──
  () => {
    const r = rand(2, 12), h = rand(3, 20);
    const ans = 2 * PI * r * h;
    return mkQ(
      `一個圓柱體的底半徑為 ${r} cm，高為 ${h} cm。求其曲面面積。（答案以 π 表示）`,
      2 * r * h,
      'π cm²',
      [
        `S_{\\text{曲}} = 2\\pi r h`,
        `= 2\\pi(${r})(${h})`,
        `= ${2 * r * h}\\pi \\text{ cm}^2`
      ],
      'S_{\\text{曲}} = 2\\pi r h'
    );
  },
  () => {
    const r = rand(2, 10), h = rand(3, 18);
    const ans = 2 * PI * r * h + 2 * PI * r * r;
    return mkQ(
      `一個圓柱體的底半徑為 ${r} cm，高為 ${h} cm。求其總表面面積。（答案以 π 表示）`,
      2 * r * h + 2 * r * r,
      'π cm²',
      [
        `S_{\\text{總}} = 2\\pi r h + 2\\pi r^2`,
        `= 2\\pi(${r})(${h}) + 2\\pi(${r})^2`,
        `= ${2 * r * h}\\pi + ${2 * r * r}\\pi`,
        `= ${2 * r * h + 2 * r * r}\\pi \\text{ cm}^2`
      ],
      'S_{\\text{總}} = 2\\pi r h + 2\\pi r^2'
    );
  },
  () => {
    const r = rand(2, 12), h = rand(3, 20);
    return mkQ(
      `一個圓柱體的底半徑為 ${r} cm，高為 ${h} cm。求其體積。（答案以 π 表示）`,
      r * r * h,
      'π cm³',
      [
        `V = \\pi r^2 h`,
        `= \\pi(${r})^2(${h})`,
        `= ${r * r * h}\\pi \\text{ cm}^3`
      ],
      'V = \\pi r^2 h'
    );
  },
  // 圓柱體 — 代數求 h
  () => {
    const r = rand(2, 8), h = rand(3, 15);
    const V = r * r * h;
    return mkQ(
      `一個圓柱體的底半徑為 ${r} cm，體積為 ${V}π cm³。求其高 h。`,
      h,
      'cm',
      [
        `V = \\pi r^2 h`,
        `${V}\\pi = \\pi(${r})^2 h`,
        `${V} = ${r * r} h`,
        `h = \\dfrac{${V}}{${r * r}} = ${h} \\text{ cm}`
      ],
      'V = \\pi r^2 h'
    );
  },

  // ── 圓錐體 ──
  () => {
    const r = rand(3, 12), l = rand(r + 1, 25);
    return mkQ(
      `一個圓錐體的底半徑為 ${r} cm，斜高為 ${l} cm。求其曲面面積。（答案以 π 表示）`,
      r * l,
      'π cm²',
      [
        `S_{\\text{曲}} = \\pi r l`,
        `= \\pi(${r})(${l})`,
        `= ${r * l}\\pi \\text{ cm}^2`
      ],
      'S_{\\text{曲}} = \\pi r l'
    );
  },
  () => {
    const r = rand(3, 10), l = rand(r + 1, 20);
    return mkQ(
      `一個圓錐體的底半徑為 ${r} cm，斜高為 ${l} cm。求其總表面面積。（答案以 π 表示）`,
      r * l + r * r,
      'π cm²',
      [
        `S_{\\text{總}} = \\pi r l + \\pi r^2`,
        `= \\pi(${r})(${l}) + \\pi(${r})^2`,
        `= ${r * l}\\pi + ${r * r}\\pi`,
        `= ${r * l + r * r}\\pi \\text{ cm}^2`
      ],
      'S_{\\text{總}} = \\pi r l + \\pi r^2'
    );
  },
  () => {
    const r = rand(3, 12), h = rand(4, 20);
    const vol = round2(r * r * h / 3);
    return mkQ(
      `一個圓錐體的底半徑為 ${r} cm，高為 ${h} cm。求其體積。（答案以 π 表示）`,
      vol,
      'π cm³',
      [
        `V = \\dfrac{1}{3}\\pi r^2 h`,
        `= \\dfrac{1}{3}\\pi(${r})^2(${h})`,
        `= \\dfrac{${r * r * h}}{3}\\pi`,
        `= ${vol}\\pi \\text{ cm}^3`
      ],
      'V = \\dfrac{1}{3}\\pi r^2 h'
    );
  },
  // 圓錐體 — 代數求 h
  () => {
    const r = rand(3, 9), h = rand(3, 15);
    const Vcoeff = r * r * h;
    // V = (1/3)πr²h  =>  h = 3V/(πr²)
    // Give V = (Vcoeff/3)π  so h = integer
    const Vnum = Vcoeff; // V = (Vnum/3)π
    const displayV = Number.isInteger(Vnum / 3) ? `${Vnum / 3}` : `\\dfrac{${Vnum}}{3}`;
    return mkQ(
      `一個圓錐體的底半徑為 ${r} cm，體積為 ${Number.isInteger(Vnum / 3) ? Vnum / 3 : Vnum + '/3'}π cm³。求其高 h。`,
      h,
      'cm',
      [
        `V = \\dfrac{1}{3}\\pi r^2 h`,
        `${displayV}\\pi = \\dfrac{1}{3}\\pi(${r})^2 h`,
        `${displayV} = \\dfrac{${r * r}}{3} h`,
        `h = \\dfrac{${displayV} \\times 3}{${r * r}} = ${h} \\text{ cm}`
      ],
      'V = \\dfrac{1}{3}\\pi r^2 h'
    );
  },

  // ── 直立角錐（正方形底） ──
  () => {
    const a = rand(3, 15), h = rand(4, 18);
    const base = a * a;
    const vol = round2(base * h / 3);
    return mkQ(
      `一個正四角錐的底邊長為 ${a} cm，高為 ${h} cm。求其體積。`,
      vol,
      'cm³',
      [
        `V = \\dfrac{1}{3} \\times \\text{底面積} \\times h`,
        `= \\dfrac{1}{3} \\times ${a}^2 \\times ${h}`,
        `= \\dfrac{1}{3} \\times ${base} \\times ${h}`,
        `= \\dfrac{${base * h}}{3} = ${vol} \\text{ cm}^3`
      ],
      'V = \\dfrac{1}{3} \\times \\text{底面積} \\times h'
    );
  },
  // 直立角錐（長方形底）
  () => {
    const a = rand(3, 12), b = rand(3, 12), h = rand(4, 18);
    const base = a * b;
    const vol = round2(base * h / 3);
    return mkQ(
      `一個直立角錐的底為長方形（長 ${a} cm × 闊 ${b} cm），高為 ${h} cm。求其體積。`,
      vol,
      'cm³',
      [
        `V = \\dfrac{1}{3} \\times \\text{底面積} \\times h`,
        `= \\dfrac{1}{3} \\times (${a} \\times ${b}) \\times ${h}`,
        `= \\dfrac{1}{3} \\times ${base} \\times ${h}`,
        `= \\dfrac{${base * h}}{3} = ${vol} \\text{ cm}^3`
      ],
      'V = \\dfrac{1}{3} \\times \\text{底面積} \\times h'
    );
  },
  // 直立角錐 — 代數求 h
  () => {
    const a = rand(3, 12), h = rand(3, 12);
    const base = a * a;
    const vol = round2(base * h / 3);
    return mkQ(
      `一個正四角錐的底邊長為 ${a} cm，體積為 ${vol} cm³。求其高 h。`,
      h,
      'cm',
      [
        `V = \\dfrac{1}{3} \\times \\text{底面積} \\times h`,
        `${vol} = \\dfrac{1}{3} \\times ${base} \\times h`,
        `${vol} \\times 3 = ${base} h`,
        `h = \\dfrac{${vol * 3}}{${base}} = ${h} \\text{ cm}`
      ],
      'V = \\dfrac{1}{3} \\times \\text{底面積} \\times h'
    );
  },

  // ── 球體 ──
  () => {
    const r = rand(2, 12);
    return mkQ(
      `一個球體的半徑為 ${r} cm。求其表面面積。（答案以 π 表示）`,
      4 * r * r,
      'π cm²',
      [
        `S = 4\\pi r^2`,
        `= 4\\pi(${r})^2`,
        `= ${4 * r * r}\\pi \\text{ cm}^2`
      ],
      'S = 4\\pi r^2'
    );
  },
  () => {
    const r = rand(2, 12);
    const vol = round2(4 * r * r * r / 3);
    return mkQ(
      `一個球體的半徑為 ${r} cm。求其體積。（答案以 π 表示）`,
      vol,
      'π cm³',
      [
        `V = \\dfrac{4}{3}\\pi r^3`,
        `= \\dfrac{4}{3}\\pi(${r})^3`,
        `= \\dfrac{${4 * r * r * r}}{3}\\pi`,
        `= ${vol}\\pi \\text{ cm}^3`
      ],
      'V = \\dfrac{4}{3}\\pi r^3'
    );
  },
  // 球體 — 代數求 r
  () => {
    const r = rand(2, 10);
    const S = 4 * r * r;
    return mkQ(
      `一個球體的表面面積為 ${S}π cm²。求其半徑 r。`,
      r,
      'cm',
      [
        `S = 4\\pi r^2`,
        `${S}\\pi = 4\\pi r^2`,
        `r^2 = \\dfrac{${S}}{4} = ${S / 4}`,
        `r = \\sqrt{${S / 4}} = ${r} \\text{ cm}`
      ],
      'S = 4\\pi r^2'
    );
  },

  // ── 半球體 ──
  () => {
    const r = rand(2, 12);
    return mkQ(
      `一個半球體的半徑為 ${r} cm。求其總表面面積。（答案以 π 表示）`,
      3 * r * r,
      'π cm²',
      [
        `S_{\\text{總}} = 2\\pi r^2 + \\pi r^2 = 3\\pi r^2`,
        `= 3\\pi(${r})^2`,
        `= ${3 * r * r}\\pi \\text{ cm}^2`
      ],
      'S_{\\text{總}} = 3\\pi r^2'
    );
  },
  () => {
    const r = rand(2, 12);
    const vol = round2(2 * r * r * r / 3);
    return mkQ(
      `一個半球體的半徑為 ${r} cm。求其體積。（答案以 π 表示）`,
      vol,
      'π cm³',
      [
        `V = \\dfrac{2}{3}\\pi r^3`,
        `= \\dfrac{2}{3}\\pi(${r})^3`,
        `= \\dfrac{${2 * r * r * r}}{3}\\pi`,
        `= ${vol}\\pi \\text{ cm}^3`
      ],
      'V = \\dfrac{2}{3}\\pi r^3'
    );
  },

  // ── 平截頭體（圓錐） ──
  () => {
    const R = rand(5, 14), r = rand(2, R - 1), h = rand(4, 16);
    const vol = round2(h * (R * R + R * r + r * r) / 3);
    return mkQ(
      `一個圓錐平截頭體的大底半徑為 ${R} cm，小底半徑為 ${r} cm，高為 ${h} cm。求其體積。（答案以 π 表示）`,
      vol,
      'π cm³',
      [
        `V = \\dfrac{1}{3}\\pi h(R^2 + Rr + r^2)`,
        `= \\dfrac{1}{3}\\pi(${h})(${R}^2 + ${R} \\times ${r} + ${r}^2)`,
        `= \\dfrac{1}{3}\\pi(${h})(${R * R} + ${R * r} + ${r * r})`,
        `= \\dfrac{1}{3}\\pi(${h})(${R * R + R * r + r * r})`,
        `= \\dfrac{${h * (R * R + R * r + r * r)}}{3}\\pi`,
        `= ${vol}\\pi \\text{ cm}^3`
      ],
      'V = \\dfrac{1}{3}\\pi h(R^2 + Rr + r^2)'
    );
  },

  // ── 平截頭體（角錐） ──
  () => {
    // 正方形底的角錐平截頭體
    const a1 = rand(6, 15), a2 = rand(2, a1 - 1), h = rand(4, 16);
    const A1 = a1 * a1, A2 = a2 * a2;
    const mid = Math.sqrt(A1 * A2);
    const vol = round2(h * (A1 + A2 + mid) / 3);
    return mkQ(
      `一個正方形底角錐平截頭體的大底邊長為 ${a1} cm，小底邊長為 ${a2} cm，高為 ${h} cm。求其體積。`,
      vol,
      'cm³',
      [
        `V = \\dfrac{h}{3}(A_1 + A_2 + \\sqrt{A_1 A_2})`,
        `A_1 = ${a1}^2 = ${A1},\\quad A_2 = ${a2}^2 = ${A2}`,
        `\\sqrt{A_1 A_2} = \\sqrt{${A1} \\times ${A2}} = \\sqrt{${A1 * A2}} = ${round2(mid)}`,
        `V = \\dfrac{${h}}{3}(${A1} + ${A2} + ${round2(mid)})`,
        `= \\dfrac{${h}}{3}(${round2(A1 + A2 + mid)})`,
        `= ${vol} \\text{ cm}^3`
      ],
      'V = \\dfrac{h}{3}(A_1 + A_2 + \\sqrt{A_1 A_2})'
    );
  },
];

const generateQuestion = () => {
  const gen = pick(generators);
  return gen();
};

// ========== 教學模式 ==========
const FormulaSheet = ({ onBack }) => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
        <ArrowLeft className="w-5 h-5" /> 返回
      </button>
      <h1 className="text-2xl font-bold text-slate-800 mb-2 border-b-2 border-blue-400 pb-3">
        📐 立體面積及體積 — 公式表
      </h1>
      <p className="text-sm text-slate-500 mb-6">F1 CH5 · 面積和體積（一）</p>

      <div className="space-y-4">
        {FORMULAS.map((group, gIdx) => {
          const c = colorMap[group.color];
          const isOpen = openIdx === gIdx;
          return (
            <div key={gIdx} className={`${c.bg} border ${c.border} rounded-xl overflow-hidden`}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : gIdx)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{group.emoji}</span>
                  <span className={`font-bold text-lg ${c.title}`}>{group.group}</span>
                </div>
                {isOpen ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  {group.items.map((item, iIdx) => (
                    <div key={iIdx} className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
                      <span className={`${c.badge} text-white text-xs font-bold px-2 py-0.5 rounded mr-2`}>{item.name}</span>
                      <Latex math={item.latex} block />
                      <p className="text-xs text-slate-500 mt-1">{item.vars}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick reference table */}
      <div className="mt-8 bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="font-bold text-slate-700 mb-3">📋 速查表</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-200">
                <th className="p-2 text-left border border-slate-300">立體</th>
                <th className="p-2 text-center border border-slate-300">表面面積</th>
                <th className="p-2 text-center border border-slate-300">體積</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="p-2 border border-slate-200 font-medium">圓柱體</td>
                <td className="p-2 border border-slate-200 text-center"><Latex math="2\pi r(r+h)" /></td>
                <td className="p-2 border border-slate-200 text-center"><Latex math="\pi r^2 h" /></td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-2 border border-slate-200 font-medium">圓錐體</td>
                <td className="p-2 border border-slate-200 text-center"><Latex math="\pi r(r+l)" /></td>
                <td className="p-2 border border-slate-200 text-center"><Latex math="\frac{1}{3}\pi r^2 h" /></td>
              </tr>
              <tr className="bg-white">
                <td className="p-2 border border-slate-200 font-medium">直立角錐</td>
                <td className="p-2 border border-slate-200 text-center text-slate-400">—</td>
                <td className="p-2 border border-slate-200 text-center"><Latex math="\frac{1}{3}Ah" /></td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-2 border border-slate-200 font-medium">球體</td>
                <td className="p-2 border border-slate-200 text-center"><Latex math="4\pi r^2" /></td>
                <td className="p-2 border border-slate-200 text-center"><Latex math="\frac{4}{3}\pi r^3" /></td>
              </tr>
              <tr className="bg-white">
                <td className="p-2 border border-slate-200 font-medium">半球體</td>
                <td className="p-2 border border-slate-200 text-center"><Latex math="3\pi r^2" /></td>
                <td className="p-2 border border-slate-200 text-center"><Latex math="\frac{2}{3}\pi r^3" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ========== 測驗模式 ==========
const QuizMode = ({ onBack }) => {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState(null); // null | { correct, steps }
  const [showSteps, setShowSteps] = useState(false);
  const inputRef = useRef(null);

  const newQuestion = useCallback(() => {
    setQuestion(generateQuestion());
    setUserAnswer('');
    setFeedback(null);
    setShowSteps(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => { newQuestion(); }, [newQuestion]);

  const handleSubmit = () => {
    if (!question || feedback) return;
    const parsed = parseFloat(userAnswer);
    if (isNaN(parsed)) return;
    const correct = Math.abs(parsed - question.answer) < 0.02;
    setTotal(t => t + 1);
    if (correct) setScore(s => s + 1);
    setFeedback({ correct, steps: question.steps });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (feedback) newQuestion();
      else handleSubmit();
    }
  };

  if (!question) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
        <ArrowLeft className="w-5 h-5" /> 返回
      </button>

      {/* Score */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">📝 測驗模式</h1>
        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-sm">
            {score} / {total}
          </span>
          {total > 0 && (
            <span className="text-slate-500 text-sm">
              {Math.round(score / total * 100)}%
            </span>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-sm mb-6">
        <div className="text-sm text-blue-600 font-medium mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <Latex math={question.formulaLatex} />
        </div>
        <p className="text-lg text-slate-800 leading-relaxed">{question.text}</p>
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!!feedback}
            placeholder="輸入數值（不含 π）"
            className={`w-full px-4 py-3 text-lg border-2 rounded-xl outline-none transition-colors ${
              feedback
                ? feedback.correct ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'
                : 'border-slate-300 focus:border-blue-500'
            }`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">{question.unit}</span>
        </div>
        {!feedback ? (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            確定
          </button>
        ) : (
          <button
            onClick={newQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            下一題
          </button>
        )}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`rounded-xl p-4 border-2 ${feedback.correct ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'} mb-4`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{feedback.correct ? '✅' : '❌'}</span>
            <span className={`font-bold text-lg ${feedback.correct ? 'text-green-700' : 'text-red-700'}`}>
              {feedback.correct ? '正確！' : `答案：${question.answer} ${question.unit}`}
            </span>
          </div>

          {/* Toggle steps */}
          <button
            onClick={() => setShowSteps(s => !s)}
            className="text-sm text-blue-600 hover:text-blue-800 underline mt-1"
          >
            {showSteps ? '隱藏步驟' : '顯示步驟'}
          </button>

          {showSteps && (
            <div className="mt-3 bg-white rounded-lg p-4 border border-slate-200 space-y-1">
              {feedback.steps.map((step, i) => (
                <Latex key={i} math={step} block />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ========== 主組件 ==========
export default function SolidGeometryQuiz() {
  const [mode, setMode] = useState(null); // null | 'formulas' | 'quiz'

  if (mode === 'formulas') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Link to="/" className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg">
          <HomeIcon size={18} /><span className="font-medium">返回首頁</span>
        </Link>
        <div className="pt-16 pb-12">
          <FormulaSheet onBack={() => setMode(null)} />
        </div>
      </div>
    );
  }

  if (mode === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Link to="/" className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg">
          <HomeIcon size={18} /><span className="font-medium">返回首頁</span>
        </Link>
        <div className="pt-16 pb-12">
          <QuizMode onBack={() => setMode(null)} />
        </div>
      </div>
    );
  }

  // Mode Selection
  return (
    <>
      <Link to="/" className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg">
        <HomeIcon size={18} /><span className="font-medium">返回首頁</span>
      </Link>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">📐</span>
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">立體面積及體積</h1>
            <p className="text-slate-500">F1 CH5 · 面積和體積（一）</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setMode('formulas')}
              className="w-full bg-white hover:bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 text-left transition-all hover:shadow-lg hover:border-blue-400 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📖</div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">教學模式</h2>
                  <p className="text-sm text-slate-500 mt-1">瀏覽所有面積和體積公式</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setMode('quiz')}
              className="w-full bg-white hover:bg-green-50 border-2 border-green-300 rounded-2xl p-6 text-left transition-all hover:shadow-lg hover:border-green-400 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">✏️</div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">測驗模式</h2>
                  <p className="text-sm text-slate-500 mt-1">隨機出題，計算面積和體積</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
