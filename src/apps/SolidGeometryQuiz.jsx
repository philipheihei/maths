import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeft, BookOpen, ChevronDown, ChevronRight, CornerDownLeft, Delete } from 'lucide-react';

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

// ========== 題目生成器 ==========
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const PI = Math.PI;
const round2 = v => {
  if (v === 0) return 0;
  const d = Math.floor(Math.log10(Math.abs(v)));
  const mag = Math.pow(10, 2 - d);
  return Math.round(v * mag) / mag;
};

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
      `一個圓柱體的底半徑為 ${r} cm，高為 ${h} cm。求圓柱體的曲面面積。（答案以 π 表示）`,
      2 * r * h,
      'π cm²',
      [
        `\\text{曲面面積} = 2\\pi r h`,
        `= 2\\pi(${r})(${h})`,
        `= ${2 * r * h}\\pi \\text{ cm}^2`
      ],
      '\\text{曲面面積} = 2\\pi r h'
    );
  },
  () => {
    const r = rand(2, 10), h = rand(3, 18);
    const ans = 2 * PI * r * h + 2 * PI * r * r;
    return mkQ(
      `一個圓柱體的底半徑為 ${r} cm，高為 ${h} cm。求圓柱體的總表面面積。（答案以 π 表示）`,
      2 * r * h + 2 * r * r,
      'π cm²',
      [
        `\\text{總表面面積} = 2\\pi r h + 2\\pi r^2`,
        `= 2\\pi(${r})(${h}) + 2\\pi(${r})^2`,
        `= ${2 * r * h}\\pi + ${2 * r * r}\\pi`,
        `= ${2 * r * h + 2 * r * r}\\pi \\text{ cm}^2`
      ],
      '\\text{總表面面積} = 2\\pi r h + 2\\pi r^2'
    );
  },
  () => {
    const r = rand(2, 12), h = rand(3, 20);
    return mkQ(
      `一個圓柱體的底半徑為 ${r} cm，高為 ${h} cm。求圓柱體的體積。（答案以 π 表示）`,
      r * r * h,
      'π cm³',
      [
        `\\text{圓柱體體積} = \\pi r^2 h`,
        `= \\pi(${r})^2(${h})`,
        `= ${r * r * h}\\pi \\text{ cm}^3`
      ],
      '\\text{圓柱體體積} = \\pi r^2 h'
    );
  },
  // 圓柱體 — 代數求 h
  () => {
    const r = rand(2, 8), h = rand(3, 15);
    const V = r * r * h;
    return mkQ(
      `一個圓柱體的底半徑為 ${r} cm，體積為 ${V}π cm³。求圓柱體的高 h。`,
      h,
      'cm',
      [
        `\\text{圓柱體體積} = \\pi r^2 h`,
        `${V}\\pi = \\pi(${r})^2 h`,
        `${V} = ${r * r} h`,
        `h = ${h} \\text{ cm}`
      ],
      '\\text{圓柱體體積} = \\pi r^2 h'
    );
  },

  // ── 圓錐體 ──
  () => {
    const r = rand(3, 12), l = rand(r + 1, 25);
    return mkQ(
      `一個圓錐體的底半徑為 ${r} cm，斜高為 ${l} cm。求圓錐體的曲面面積。（答案以 π 表示）`,
      r * l,
      'π cm²',
      [
        `\\text{曲面面積} = \\pi r l`,
        `= \\pi(${r})(${l})`,
        `= ${r * l}\\pi \\text{ cm}^2`
      ],
      '\\text{曲面面積} = \\pi r l'
    );
  },
  () => {
    const r = rand(3, 10), l = rand(r + 1, 20);
    return mkQ(
      `一個圓錐體的底半徑為 ${r} cm，斜高為 ${l} cm。求圓錐體的總表面面積。（答案以 π 表示）`,
      r * l + r * r,
      'π cm²',
      [
        `\\text{總表面面積} = \\pi r l + \\pi r^2`,
        `= \\pi(${r})(${l}) + \\pi(${r})^2`,
        `= ${r * l}\\pi + ${r * r}\\pi`,
        `= ${r * l + r * r}\\pi \\text{ cm}^2`
      ],
      '\\text{總表面面積} = \\pi r l + \\pi r^2'
    );
  },
  () => {
    const r = rand(3, 12), h = rand(4, 20);
    const vol = round2(r * r * h / 3);
    return mkQ(
      `一個圓錐體的底半徑為 ${r} cm，高為 ${h} cm。求圓錐體的體積。（答案以 π 表示）`,
      vol,
      'π cm³',
      [
        `\\text{圓錐體體積} = \\dfrac{1}{3}\\pi r^2 h`,
        `= \\dfrac{1}{3}\\pi(${r})^2(${h})`,
        `= \\dfrac{${r * r * h}}{3}\\pi`,
        `= ${vol}\\pi \\text{ cm}^3`
      ],
      '\\text{圓錐體體積} = \\dfrac{1}{3}\\pi r^2 h'
    );
  },
  // 圓錐體 — 代數求 h
  () => {
    const r = rand(3, 9), h = rand(3, 15);
    const Vcoeff = r * r * h;
    // \\text{體積} = (1/3)πr²h  =>  h = 3V/(πr²)
    // Give \\text{體積} = (Vcoeff/3)π  so h = integer
    const Vnum = Vcoeff; // \\text{體積} = (Vnum/3)π
    const displayV = Number.isInteger(Vnum / 3) ? `${Vnum / 3}` : `\\dfrac{${Vnum}}{3}`;
    return mkQ(
      `一個圓錐體的底半徑為 ${r} cm，體積為 ${Number.isInteger(Vnum / 3) ? Vnum / 3 : Vnum + '/3'}π cm³。求圓錐體的高 h。`,
      h,
      'cm',
      [
        `\\text{圓錐體體積} = \\dfrac{1}{3}\\pi r^2 h`,
        `${displayV}\\pi = \\dfrac{1}{3}\\pi(${r})^2 h`,
        `${displayV} = \\dfrac{${r * r}}{3} h`,
        `h = ${h} \\text{ cm}`
      ],
      '\\text{圓錐體體積} = \\dfrac{1}{3}\\pi r^2 h'
    );
  },

  // ── 直立角錐（正方形底） ──
  () => {
    const a = rand(3, 15), h = rand(4, 18);
    const base = a * a;
    const vol = round2(base * h / 3);
    return mkQ(
      `一個正四角錐的底邊長為 ${a} cm，高為 ${h} cm。求角錐的體積。`,
      vol,
      'cm³',
      [
        `\\text{角錐體積} = \\dfrac{1}{3} \\times \\text{底面積} \\times h`,
        `= \\dfrac{1}{3} \\times ${a}^2 \\times ${h}`,
        `= \\dfrac{1}{3} \\times ${base} \\times ${h}`,
        `= \\dfrac{${base * h}}{3} = ${vol} \\text{ cm}^3`
      ],
      '\\text{角錐體積} = \\dfrac{1}{3} \\times \\text{底面積} \\times h'
    );
  },
  // 直立角錐（長方形底）
  () => {
    const a = rand(3, 12), b = rand(3, 12), h = rand(4, 18);
    const base = a * b;
    const vol = round2(base * h / 3);
    return mkQ(
      `一個直立角錐的底為長方形（長 ${a} cm × 闊 ${b} cm），高為 ${h} cm。求角錐的體積。`,
      vol,
      'cm³',
      [
        `\\text{角錐體積} = \\dfrac{1}{3} \\times \\text{底面積} \\times h`,
        `= \\dfrac{1}{3} \\times (${a} \\times ${b}) \\times ${h}`,
        `= \\dfrac{1}{3} \\times ${base} \\times ${h}`,
        `= \\dfrac{${base * h}}{3} = ${vol} \\text{ cm}^3`
      ],
      '\\text{角錐體積} = \\dfrac{1}{3} \\times \\text{底面積} \\times h'
    );
  },
  // 直立角錐 — 代數求 h
  () => {
    const a = rand(3, 12), h = rand(3, 12);
    const base = a * a;
    const vol = round2(base * h / 3);
    return mkQ(
      `一個正四角錐的底邊長為 ${a} cm，體積為 ${vol} cm³。求角錐的高 h。`,
      h,
      'cm',
      [
        `\\text{角錐體積} = \\dfrac{1}{3} \\times \\text{底面積} \\times h`,
        `${vol} = \\dfrac{1}{3} \\times ${base} \\times h`,
        `${vol} \\times 3 = ${base} h`,
        `h = ${h} \\text{ cm}`
      ],
      '\\text{角錐體積} = \\dfrac{1}{3} \\times \\text{底面積} \\times h'
    );
  },

  // ── 球體 ──
  () => {
    const r = rand(2, 12);
    return mkQ(
      `一個球體的半徑為 ${r} cm。求球體的表面面積。（答案以 π 表示）`,
      4 * r * r,
      'π cm²',
      [
        `\\text{表面面積} = 4\\pi r^2`,
        `= 4\\pi(${r})^2`,
        `= ${4 * r * r}\\pi \\text{ cm}^2`
      ],
      '\text{表面面積} = 4\\pi r^2'
    );
  },
  () => {
    const r = rand(2, 12);
    const vol = round2(4 * r * r * r / 3);
    return mkQ(
      `一個球體的半徑為 ${r} cm。求球體的體積。（答案以 π 表示）`,
      vol,
      'π cm³',
      [
        `\\text{球體體積} = \\dfrac{4}{3}\\pi r^3`,
        `= \\dfrac{4}{3}\\pi(${r})^3`,
        `= \\dfrac{${4 * r * r * r}}{3}\\pi`,
        `= ${vol}\\pi \\text{ cm}^3`
      ],
      '\\text{球體體積} = \\dfrac{4}{3}\\pi r^3'
    );
  },
  // 球體 — 代數求 r
  () => {
    const r = rand(2, 10);
    const S = 4 * r * r;
    return mkQ(
      `一個球體的表面面積為 ${S}π cm²。求球體的半徑 r。`,
      r,
      'cm',
      [
        `\\text{表面面積} = 4\\pi r^2`,
        `${S}\\pi = 4\\pi r^2`,
        `r^2 = \\dfrac{${S}}{4} = ${S / 4}`,
        `r = \\sqrt{${S / 4}} = ${r} \\text{ cm}`
      ],
      '\text{表面面積} = 4\\pi r^2'
    );
  },

  // ── 半球體 ──
  () => {
    const r = rand(2, 12);
    return mkQ(
      `一個半球體的半徑為 ${r} cm。求半球體的總表面面積。（答案以 π 表示）`,
      3 * r * r,
      'π cm²',
      [
        `\\text{總表面面積} = 2\\pi r^2 + \\pi r^2 = 3\\pi r^2`,
        `= 3\\pi(${r})^2`,
        `= ${3 * r * r}\\pi \\text{ cm}^2`
      ],
      '\\text{總表面面積} = 3\\pi r^2'
    );
  },
  () => {
    const r = rand(2, 12);
    const vol = round2(2 * r * r * r / 3);
    return mkQ(
      `一個半球體的半徑為 ${r} cm。求半球體的體積。（答案以 π 表示）`,
      vol,
      'π cm³',
      [
        `\\text{半球體體積} = \\dfrac{2}{3}\\pi r^3`,
        `= \\dfrac{2}{3}\\pi(${r})^3`,
        `= \\dfrac{${2 * r * r * r}}{3}\\pi`,
        `= ${vol}\\pi \\text{ cm}^3`
      ],
      '\\text{半球體體積} = \\dfrac{2}{3}\\pi r^3'
    );
  },

  // ── 平截頭體（圓錐） ──
  () => {
    const R = rand(5, 14), r = rand(2, R - 1), h = rand(4, 16);
    const vol = round2(h * (R * R + R * r + r * r) / 3);
    return mkQ(
      `一個圓錐平截頭體的大底半徑為 ${R} cm，小底半徑為 ${r} cm，高為 ${h} cm。求圓錐平截頭體的體積。（答案以 π 表示）`,
      vol,
      'π cm³',
      [
        `\\text{圓錐平截頭體體積} = \\dfrac{1}{3}\\pi h(R^2 + Rr + r^2)`,
        `= \\dfrac{1}{3}\\pi(${h})(${R}^2 + ${R} \\times ${r} + ${r}^2)`,
        `= \\dfrac{1}{3}\\pi(${h})(${R * R} + ${R * r} + ${r * r})`,
        `= \\dfrac{1}{3}\\pi(${h})(${R * R + R * r + r * r})`,
        `= \\dfrac{${h * (R * R + R * r + r * r)}}{3}\\pi`,
        `= ${vol}\\pi \\text{ cm}^3`
      ],
      '\\text{圓錐平截頭體體積} = \\dfrac{1}{3}\\pi h(R^2 + Rr + r^2)'
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
      `一個正方形底角錐平截頭體的大底邊長為 ${a1} cm，小底邊長為 ${a2} cm，高為 ${h} cm。求角錐平截頭體的體積。`,
      vol,
      'cm³',
      [
        `\\text{角錐平截頭體體積} = \\dfrac{h}{3}(A_1 + A_2 + \\sqrt{A_1 A_2})`,
        `A_1 = ${a1}^2 = ${A1},\\quad A_2 = ${a2}^2 = ${A2}`,
        `\\sqrt{A_1 A_2} = \\sqrt{${A1} \\times ${A2}} = \\sqrt{${A1 * A2}} = ${round2(mid)}`,
        `\\text{角錐平截頭體體積} = \\dfrac{${h}}{3}(${A1} + ${A2} + ${round2(mid)})`,
        `= \\dfrac{${h}}{3}(${round2(A1 + A2 + mid)})`,
        `= ${vol} \\text{ cm}^3`
      ],
      '\\text{角錐平截頭體體積} = \\dfrac{h}{3}(A_1 + A_2 + \\sqrt{A_1 A_2})'
    );
  },
];

const generateQuestion = () => {
  const gen = pick(generators);
  return gen();
};

// ========== 教學模式 ==========
const FormulaSheet = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
        <ArrowLeft className="w-5 h-5" /> 返回
      </button>
      
      {/* 筆記版面 */}
      <div className="bg-white rounded-xl shadow-sm border border-blue-200 mb-8 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-400 pb-3">公式</h2>
        
        {/* Top section: DSE會考... */}
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 text-lg font-medium text-slate-700">
          <div className="font-bold text-blue-800 whitespace-nowrap">DSE會考：</div>
          <div className="flex items-stretch gap-4">
            <div className="flex flex-col space-y-2 text-right">
              <span>角錐</span>
              <span>圓錐</span>
              <span>球體 <span className="text-emerald-600 text-base">（半球體）</span></span>
              <span>平截頭體 <span className="text-emerald-600 text-base">（圓錐/角錐）</span></span>
            </div>
            <div className="text-blue-300 text-7xl font-extralight flex items-center leading-none mt-[-5px]">
              {'{'}
            </div>
            <div className="flex flex-col justify-center space-y-6 font-bold text-blue-800">
              <span>的 體積</span>
              <span>表面面積</span>
            </div>
          </div>
        </div>

        {/* Volume section */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span> 體積公式
          </h3>
          <div className="bg-slate-50 rounded-lg p-5 space-y-4 text-slate-700">
            <div className="flex items-center">
              <span className="w-32 font-medium">柱體體積：</span>
              <span>底面積 <Latex math="\times" /> 高</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 font-medium">錐體體積：</span>
              <span><strong className="text-red-600"><Latex math="\frac{1}{3} \times" /></strong> 底面積 <Latex math="\times" /> 高</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 font-medium">球體體積：</span>
              <span><strong className="text-red-600"><Latex math="\frac{4}{3}\pi r^3" /></strong></span>
            </div>
            <div className="flex items-center">
              <span className="w-32 font-medium">平截頭體體積：</span>
              <span>大錐體體積 <Latex math="-" /> 小錐體體積</span>
            </div>
          </div>
        </div>

        {/* Surface Area section */}
        <div className="mb-4">
          <h3 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2">
            <span className="w-2 h-6 bg-orange-400 rounded-full"></span> 面積公式
          </h3>
          <div className="bg-slate-50 rounded-lg p-5 space-y-4 text-slate-700">
            <div className="flex items-center">
              <span className="w-40 font-medium">圓錐曲面面積：</span>
              <span><strong className="text-red-600"><Latex math="\pi r l" /></strong></span>
            </div>
            <div className="flex items-center">
              <span className="w-40 font-medium">圓錐總表面面積：</span>
              <span><strong className="text-red-600"><Latex math="\pi r l + \pi r^2" /></strong></span>
            </div>
            <div className="flex items-center">
              <span className="w-40 font-medium">球體表面面積：</span>
              <span><strong className="text-red-600"><Latex math="4\pi r^2" /></strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick reference table */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm relative z-20">
        <h3 className="font-bold text-slate-700 text-lg mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          公式速查表
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base border-collapse bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-200 text-slate-700">
                <th className="p-3 text-left border border-slate-300 font-bold">立體</th>
                <th className="p-3 text-center border border-slate-300 font-bold">表面面積</th>
                <th className="p-3 text-center border border-slate-300 font-bold">體積</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3 border border-slate-200 font-bold text-blue-800">圓柱體</td>
                <td className="p-3 border border-slate-200 text-center"><Latex math="2\pi r(r+h)" /></td>
                <td className="p-3 border border-slate-200 text-center"><Latex math="\pi r^2 h" /></td>
              </tr>
              <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <td className="p-3 border border-slate-200 font-bold text-orange-800">圓錐體</td>
                <td className="p-3 border border-slate-200 text-center"><Latex math="\pi r(r+l)" /></td>
                <td className="p-3 border border-slate-200 text-center"><Latex math="\frac{1}{3}\pi r^2 h" /></td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3 border border-slate-200 font-bold text-red-800">直立角錐</td>
                <td className="p-3 border border-slate-200 text-center text-slate-400">—</td>
                <td className="p-3 border border-slate-200 text-center"><Latex math="\frac{1}{3}Ah" /></td>
              </tr>
              <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <td className="p-3 border border-slate-200 font-bold text-green-800">球體</td>
                <td className="p-3 border border-slate-200 text-center"><Latex math="4\pi r^2" /></td>
                <td className="p-3 border border-slate-200 text-center"><Latex math="\frac{4}{3}\pi r^3" /></td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3 border border-slate-200 font-bold text-teal-800">半球體</td>
                <td className="p-3 border border-slate-200 text-center"><Latex math="3\pi r^2" /></td>
                <td className="p-3 border border-slate-200 text-center"><Latex math="\frac{2}{3}\pi r^3" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ========== 測驗模式 ==========
const KEY_BASE_CLASS = 'h-14 sm:h-16 rounded-xl text-2xl font-bold shadow-sm active:translate-y-1 transition-all flex items-center justify-center cursor-pointer select-none';

const QuizMode = ({ onBack }) => {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState(null); // null | { correct, steps }

  const newQuestion = useCallback(() => {
    setQuestion(generateQuestion());
    setUserAnswer('');
    setFeedback(null);
  }, []);

  useEffect(() => { newQuestion(); }, [newQuestion]);

  const handleSubmit = useCallback(() => {
    if (!question || feedback || !userAnswer) return;
    if (question.unit.includes('π')) {
      let coeff;
      if (userAnswer.endsWith('π')) {
        const raw = userAnswer.slice(0, -1);
        coeff = raw === '' ? 1 : parseFloat(raw);
      } else {
        coeff = parseFloat(userAnswer);
      }
      if (isNaN(coeff)) return;
      const correct = Math.abs(coeff - question.answer) < 0.1;
      setTotal(t => t + 1);
      if (correct) setScore(s => s + 1);
      setFeedback({ correct, steps: question.steps });
    } else {
      const parsed = parseFloat(userAnswer);
      if (isNaN(parsed)) return;
      const correct = Math.abs(parsed - question.answer) < 0.1;
      setTotal(t => t + 1);
      if (correct) setScore(s => s + 1);
      setFeedback({ correct, steps: question.steps });
    }
  }, [question, feedback, userAnswer]);

  const handleKey = (key) => {
    if (feedback) return;
    if (key === 'AC') {
      setUserAnswer('');
    } else if (key === 'DEL') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else {
      setUserAnswer(prev => prev + key);
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
      <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-sm mb-4">
        <p className="text-lg text-slate-800 leading-relaxed">{question.text}</p>
      </div>

      {/* Answer display */}
      <div className={`w-full px-4 py-4 text-2xl font-bold border-2 rounded-xl min-h-[70px] flex items-center justify-between mb-4 transition-colors ${
        feedback
          ? feedback.correct ? 'border-green-400 bg-green-50 text-green-800' : 'border-red-400 bg-red-50 text-red-800'
          : 'border-blue-400 bg-white text-slate-800'
      }`}>
        <span className={userAnswer ? '' : 'text-slate-300 font-normal text-lg'}>
          {userAnswer || '輸入計算結果...'}
        </span>
        <span className="text-slate-400 text-lg font-normal ml-4 shrink-0">
          {question.unit.startsWith('π ') ? question.unit.slice(2) : question.unit}
        </span>
      </div>

      {/* Feedback & Steps */}
      {feedback && (
        <div className={`rounded-xl p-5 border-2 ${feedback.correct ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'} mb-4`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{feedback.correct ? '✅' : '❌'}</span>
            <span className={`font-bold text-lg ${feedback.correct ? 'text-green-700' : 'text-red-700'}`}>
              {feedback.correct ? '正確！' : `答案：${question.answer} ${question.unit}`}
            </span>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200 overflow-x-auto mb-4">
            <Latex math={`\\begin{aligned}${feedback.steps.map(s => s.replace('=', '&=')).join(' \\\\ ')}\\end{aligned}`} block />
          </div>
          <button
            onClick={newQuestion}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors text-lg"
          >
            下一題
          </button>
        </div>
      )}

      {/* Custom Keypad */}
      {!feedback && (
        <div className="bg-slate-100 p-3 rounded-2xl border border-slate-300">
          <div className="grid grid-cols-4 gap-2">
            {[7, 8, 9].map(k => (
              <button key={k} onClick={() => handleKey(String(k))}
                className={`${KEY_BASE_CLASS} bg-white text-slate-800 border-b-4 border-slate-300 hover:bg-slate-50`}>{k}</button>
            ))}
            <button onClick={() => handleKey('AC')}
              className={`${KEY_BASE_CLASS} bg-rose-100 text-rose-700 border-b-4 border-rose-200 hover:bg-rose-200`}>AC</button>
            {[4, 5, 6].map(k => (
              <button key={k} onClick={() => handleKey(String(k))}
                className={`${KEY_BASE_CLASS} bg-white text-slate-800 border-b-4 border-slate-300 hover:bg-slate-50`}>{k}</button>
            ))}
            <button onClick={() => handleKey('DEL')}
              className={`${KEY_BASE_CLASS} bg-red-50 text-red-500 border-b-4 border-red-200 hover:bg-red-100`}>
              <Delete className="w-6 h-6" />
            </button>
            {[1, 2, 3].map(k => (
              <button key={k} onClick={() => handleKey(String(k))}
                className={`${KEY_BASE_CLASS} bg-white text-slate-800 border-b-4 border-slate-300 hover:bg-slate-50`}>{k}</button>
            ))}
            <button onClick={() => handleKey('π')}
              className={`${KEY_BASE_CLASS} bg-blue-50 text-blue-700 border-b-4 border-blue-200 hover:bg-blue-100 italic font-serif`}>π</button>
            <button onClick={() => handleKey('0')}
              className={`${KEY_BASE_CLASS} col-span-2 bg-white text-slate-800 border-b-4 border-slate-300 hover:bg-slate-50`}>0</button>
            <button onClick={() => handleKey('.')}
              className={`${KEY_BASE_CLASS} bg-white text-slate-800 border-b-4 border-slate-300 hover:bg-slate-50`}>.</button>
            <button onClick={handleSubmit} disabled={!userAnswer}
              className={`${KEY_BASE_CLASS} bg-blue-600 text-white border-b-4 border-blue-800 hover:bg-blue-700 disabled:opacity-40 disabled:active:translate-y-0`}>
              EXE
            </button>
          </div>
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
