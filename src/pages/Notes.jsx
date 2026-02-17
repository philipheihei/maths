import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home as HomeIcon, ChevronDown, ChevronRight, ArrowRight
} from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';

// KaTeX 數學公式組件
const Latex = ({ math, block = false, left = false }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    loadKatexOnce().then(() => setIsLoaded(true)).catch(e => console.error("KaTeX load error:", e));
  }, []);
  useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        window.katex.render(math, containerRef.current, { throwOnError: false, displayMode: block, strict: false, trust: true });
      } catch (e) { containerRef.current.textContent = math; }
    }
  }, [math, block, isLoaded]);
  return <span ref={containerRef} className={block ? `block ${left ? 'text-left' : 'text-center'} my-2` : "inline-block"} />;
};

// MathDisplay (colored KaTeX with trust)
const MathDisplay = ({ latex, inline = false, className = '' }) => {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { loadKatexOnce().then(() => setLoaded(true)).catch(() => {}); }, []);
  useEffect(() => {
    if (loaded && window.katex && ref.current) {
      try {
        window.katex.render(latex, ref.current, { throwOnError: false, displayMode: !inline, strict: false, trust: true });
      } catch (e) { ref.current.textContent = latex; }
    }
  }, [latex, inline, loaded]);
  return <span ref={ref} className={`${inline ? 'inline-block' : 'block text-center my-1'} ${className}`} />;
};

// ========================================
// 可摺疊區段組件
// ========================================
const CollapsibleSection = ({ id, title, num, color = 'blue', activeSub, sectionRef, children }) => {
  useEffect(() => {
    if (activeSub === id) {
      setTimeout(() => {
        sectionRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeSub, id]);

  const numBg = {
    purple: 'bg-purple-500', blue: 'bg-blue-500', green: 'bg-green-500',
    red: 'bg-red-500', teal: 'bg-teal-500', orange: 'bg-orange-500', indigo: 'bg-indigo-500',
  };
  const textCol = {
    purple: 'text-purple-700', blue: 'text-blue-700', green: 'text-green-700',
    red: 'text-red-700', teal: 'text-teal-700', orange: 'text-orange-700', indigo: 'text-indigo-700',
  };

  return (
    <div ref={sectionRef} className="bg-white rounded-2xl shadow-lg mb-6 scroll-mt-24 overflow-hidden">
      <div className="flex items-center gap-3 p-5">
        {num && (
          <span className={`${numBg[color] || 'bg-blue-500'} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}>
            {num}
          </span>
        )}
        <h2 className={`text-lg font-bold ${textCol[color] || 'text-blue-700'} flex-1`}>{title}</h2>
      </div>
      <div className="px-6 pb-6">{children}</div>
    </div>
  );
};

// ========================================
// 筆記資料結構
// ========================================
const NOTES_DATA = {
  F1: [
    {
      id: 'approximation',
      topic: 'CH13 近似值',
      color: 'green',
      subtopics: [
        { id: 'sig-fig', num: 1, title: '有效數字 & 捨入方法', color: 'green' },
        { id: 'approx-examples', num: 2, title: '題目範例', color: 'blue' },
      ]
    }
  ],
  F2: [],
  F3: [
    {
      id: 'factorization',
      topic: '因式分解',
      color: 'purple',
      subtopics: [
        { id: 'extract-common', num: 1, title: '提取公因式', color: 'purple' },
        { id: 'grouping', num: 2, title: '併項法', color: 'blue' },
        { id: 'quadratic', num: 3, title: '二次多項式', color: 'green' },
        { id: 'dse-tips', num: 4, title: 'DSE 題型技巧', color: 'red' },
      ]
    },
    {
      id: 'trig-identities',
      topic: 'CH7 三角恆等式',
      color: 'red',
      subtopics: [
        { id: 'pythagoras', num: 1, title: 'sin cos tan 輔以畢氏定理', color: 'green' },
        { id: 'special-angles', num: 2, title: '特殊三角比', color: 'blue' },
        { id: 'trig-equations', num: 3, title: '三角方程', color: 'purple' },
        { id: 'identities', num: 4, title: '需記三角恆等式', color: 'red' },
      ]
    },
    {
      id: 'quadrilateral',
      topic: 'CH5 四邊形',
      color: 'blue',
      subtopics: [
        { id: 'parallelogram', num: 1, title: '平行四邊形的定義和性質', color: 'blue' },
        { id: 'parallelogram-test', num: 2, title: '平行四邊形的判定條件', color: 'green' },
        { id: 'special-shapes', num: 3, title: '菱形 / 長方形 / 正方形', color: 'orange' },
        { id: 'midpoint-theorem', num: 4, title: '中點定理', color: 'purple' },
        { id: 'intercept-theorem', num: 5, title: '截線定理', color: 'purple' },
      ]
    }
  ],
  F4: [
    {
      id: 'quadratic-equation',
      topic: 'CH1 二次方程',
      color: 'red',
      subtopics: [
        { id: 'general-form', num: 1, title: '一般式', color: 'red' },
        { id: 'quad-formula', num: 2, title: '二次公式', color: 'green' },
        { id: 'square-root', num: 3, title: '取平方根法', color: 'blue' },
        { id: 'calculator', num: 4, title: '計算機解未知數', color: 'orange' },
        { id: 'applications', num: 5, title: '二次方程應用題', color: 'purple' },
      ]
    },
    {
      id: 'functions',
      topic: 'CH3 函數 f(x)',
      color: 'indigo',
      subtopics: [
        { id: 'basic-sub', num: 1, title: '簡單代數字', color: 'indigo' },
        { id: 'find-unknown', num: 2, title: '用 f(x) 找未知數', color: 'purple' },
        { id: 'quadratic-graph', num: 3, title: '二次函數圖像', color: 'green' },
        { id: 'coordinates', num: 4, title: '提供坐標', color: 'blue' },
      ]
    },
    {
      id: 'remainder-factor',
      topic: 'CH4 續多項式',
      color: 'teal',
      subtopics: [
        { id: 'remainder', num: 1, title: '餘式定理', color: 'teal' },
        { id: 'factor', num: 2, title: '因式定理', color: 'orange' },
      ]
    }
  ],
  F5: [
    {
      id: 'variation',
      topic: 'CH11 變分',
      color: 'blue',
      subtopics: [
        { id: 'variation-formulas', num: 1, title: '四條公式 & 備註', color: 'blue' },
        { id: 'variation-symbol', num: 2, title: '變分符號', color: 'purple' },
        { id: 'variation-questions', num: 3, title: '題目問法', color: 'green' },
      ]
    }
  ],
  F6: [],
  '高中甲(一)': [
    {
      id: 'simultaneous-eq',
      topic: '聯立方程',
      color: 'blue',
      subtopics: [
        { id: 'calculator', num: 1, title: '計算機使用', color: 'blue' },
      ]
    }
  ],
};

// F6 合併 F4 + F5 + F6
const getNotesForLevel = (level) => {
  if (level === 'F6') {
    return [...(NOTES_DATA.F4 || []), ...(NOTES_DATA.F5 || []), ...(NOTES_DATA.F6 || [])];
  }
  return NOTES_DATA[level] || [];
};

// ========================================
// 因式分解 (F3)
// ========================================
const FactorizationNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-purple-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">因式分解</h1>
        <p className="text-slate-600">掌握三大因式分解技巧：提取公因式、併項法、二次多項式</p>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <p className="text-red-700 font-bold text-center text-lg">📌 答案一定有括號！</p>
      </div>

      {/* 1. 提取公因式 */}
      <CollapsibleSection id="extract-common" title="提取公因式" num={1} color="purple" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">📝 分析題目</h3>
            <p className="text-slate-700 mb-2">若所有項都出現相同代數/因數時可<span className="text-red-600 font-bold">抽取</span></p>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm text-slate-600 mb-2">例子 1：找出相同代數 及 公因數，然後抽出來寫前面，後面加括號裝剩下的代數/因數。</p>
              <div className="flex items-center gap-2 flex-wrap text-lg">
                <span><span className="bg-yellow-200 px-1 rounded">-</span><span className="bg-green-200 px-1 rounded">6</span>u<span className="bg-yellow-200 px-1 rounded">v</span> <span className="bg-yellow-200 px-1 rounded">-</span><span className="bg-green-200 px-1 rounded">8</span><span className="bg-yellow-200 px-1 rounded">v</span>w</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-lg mt-1">
                <span className="text-slate-500">=</span>
                <span><span className="bg-yellow-200 px-1 rounded">-</span><span className="bg-green-200 px-1 rounded">2</span><span className="bg-yellow-200 px-1 rounded">v</span>(<span className="bg-green-200 px-1 rounded">3</span>u+<span className="bg-green-200 px-1 rounded">4</span>w)</span>
              </div>
              <div className="mt-3 text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-200 px-2 py-0.5 rounded">黃</span><span>= 完全相同的代數</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-200 px-2 py-0.5 rounded">綠</span>
                  <span>= 可抽公因數（6和8是什麼的倍數？）</span>
                  <span className="text-slate-500">6÷<span className="text-red-600 font-bold">2</span>=3，8÷<span className="text-red-600 font-bold">2</span>=4</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-2">例子 2：遇上相同代數但不同次方，只抽最低次方</p>
              <div className="flex items-center gap-2 flex-wrap text-lg">
                <span><span className="bg-pink-200 px-1 rounded"><Latex math="m^3" /></span><span className="bg-cyan-200 px-1 rounded">n</span> - 3<span className="bg-pink-200 px-1 rounded">m</span><span className="bg-cyan-200 px-1 rounded"><Latex math="n^2" /></span></span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-lg mt-1">
                <span className="text-slate-500">=</span>
                <span>mn(<span className="bg-pink-200 px-1 rounded"><Latex math="m^2" /></span> - 3<span className="bg-cyan-200 px-1 rounded">n</span>)</span>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                <span className="text-pink-600">⤷</span> 抽走了一個 m，m³ 變為 <span className="bg-pink-200 px-1 rounded">m²</span>，原本的m則會消失。
              </div>
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 技巧</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 先找<span className="text-red-600 font-bold">數字</span>的公因數</li>
              <li>• 再找<span className="text-blue-600 font-bold">代數</span>的公因式（取最低次方）</li>
              <li>• 記住：<Latex math="a^3 \div a = a^2" />（次方相減）</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 併項法 */}
      <CollapsibleSection id="grouping" title="併項法（分組因式分解）" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 方法步驟</h3>
            <ol className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
              <li>將四項分成兩組（通常首兩項一組、後兩項一組）</li>
              <li>分別對每組提取公因式</li>
              <li>若兩組出現相同括號，再提取該括號</li>
            </ol>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子 1：標準四項</p>
            <Latex math="\begin{aligned} bm + bn + 5m + 5n &= b(m+n) + 5(m+n) \\ &= (m+n)(b+5) \end{aligned}" block />
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子 2：已有括號</p>
            <Latex math="\begin{aligned} &(2x-5) - (2x-5)y \\ &= (2x-5)(1-y) \end{aligned}" block />
            <p className="text-sm text-slate-500 mt-2">💡 抽相同括號放前，剩餘部分放後括號</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 二次多項式 */}
      <CollapsibleSection id="quadratic" title="二次多項式（十字相乘法 / FMLA 01）" num={3} color="green" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">🖩 計算機 FMLA 01 方法</h3>
            <p className="text-sm text-slate-700 mb-3">如沒相同代數/因數，出動 <span className="bg-green-200 px-2 py-0.5 rounded font-mono">FMLA 01</span>（二次方）</p>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm font-bold text-slate-700 mb-2">步驟：</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">1</span><span>開啟 FMLA 01（按 FMLA 輸入 01）</span></div>
                <div className="flex items-center gap-2"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">2</span><span>輸入 a, b, c（如 <Latex math="8x^2 - 17x + 21" />：輸入 8, -17, 21）</span></div>
                <div className="flex items-center gap-2"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">3</span><span>按 EXE 得出兩個答案</span></div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-base font-bold text-slate-700 mb-3">例子：<Latex math="8x^2 - 17x - 21" /></p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-bold text-center mb-2 text-base">答案 1（整數）</p>
                  <p className="text-center text-3xl font-mono mb-2">3</p>
                  <p className="text-center text-sm text-slate-600 mt-2">→ 相反數：-3</p>
                  <p className="text-center text-sm text-slate-600">→ 括號：<Latex math="(x-3)" /></p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-bold text-center mb-2 text-base">答案 2（分數）</p>
                  <p className="text-center text-3xl font-mono mb-2">-0.875</p>
                  <p className="text-center text-sm text-slate-600 mt-2">= <Latex math="-\frac{7}{8}" /></p>
                  <p className="text-center text-sm text-slate-600">分母放前，分子相反數放後</p>
                  <p className="text-center text-sm text-slate-600">→ 括號：<Latex math="(8x+7)" /></p>
                </div>
              </div>
              <p className="text-center mt-4 font-bold text-green-700 text-base">∴ 答案 <Latex math="= (x-3)(8x+7)" /></p>
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-3">⚠️ 次序調動</h3>
            <p className="text-sm text-slate-700 mb-2">十字相乘法 / FMLA 01 需以 <Latex math="ax^2 + bx + c" /> 形式才能計算正確</p>
            <div className="bg-white rounded-lg p-3 mb-2">
              <p className="text-sm text-slate-600 mb-1">例子 1：調動次序</p>
              <Latex math="\begin{aligned} &50 - 15m + m^2 \\ &= m^2 - 15m + 50 \end{aligned}" block />
              <p className="text-xs text-slate-500">以 2次方/1次方/0次方(沒代數) 順序作調動</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-1">例子 2：<Latex math="a^2" /> 係數需是正數</p>
              <Latex math="\begin{aligned} &36 + 5a - a^2 \\ &= -a^2 + 5a + 36 \\ &= -(a^2 - 5a - 36) \\ &= -(a-9)(a+4) \end{aligned}" block />
              <p className="text-xs text-red-500 mt-2">⚠️ 若沒有抽負，因式分解答案會錯！</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📐 二元二次多項式</h3>
            <p className="text-sm text-slate-700 mb-2">形式：<Latex math="ax^2 + bxy + cy^2" /></p>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-2">💡 方法：先當只有前面的代數 x 用FMLA01去組成括號，最後再在每個括號後補上後面的代數 y</p>
              <p className="text-sm text-slate-600 mb-1">例子：</p>
              <Latex math="\begin{aligned} &6r^2 - 13rs - 28s^2 \\ &= (2r-7s)(3r+4s) \end{aligned}" block />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. DSE 題型技巧 */}
      <CollapsibleSection id="dse-tips" title="DSE 題型技巧" num={4} color="red" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-3">📋 利用前題答案</h3>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-3">DSE 常見：(a) 和 (b) 有關聯</p>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex items-start gap-2"><span className="font-bold text-slate-700">(a)</span><span>因式分解 <span className="bg-yellow-200 px-1 rounded"><Latex math="6r^2 - 13rs - 28s^2" /></span></span></div>
                <div className="flex items-start gap-2"><span className="font-bold text-slate-700">(b)</span><span>因式分解 <Latex math="4r - 14s +" /> <span className="bg-yellow-200 px-1 rounded"><Latex math="6r^2 - 13rs - 28s^2" /></span></span></div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-3">
                <p className="text-sm font-bold text-green-700 mb-1">📝 (a) 部答案：</p>
                <Latex math="(2r-7s)(3r+4s)" block />
              </div>
              <div className="bg-yellow-50 p-2 rounded">
                <p className="text-slate-700 text-sm">➜ 找 (a) 題目部分（黃色 highlight），套用 (a) 部答案：</p>
                <Latex math="\begin{aligned} &= 4r - 14s + (2r-7s)(3r+4s) \\ &= 2(2r-7s) + (2r-7s)(3r+4s) \\ &= (2r-7s)(2 + 3r + 4s) \end{aligned}" block />
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3">❓ 問特定因式（MC 限定）</h3>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-2">例：下列何者是 <Latex math="4x^2 + 2x - 12" /> 的因式？</p>
              <div className="ml-4 text-sm space-y-1"><p>I. 2</p><p>II. 2x - 3</p><p>III. x - 2</p></div>
              <div className="bg-blue-50 p-2 rounded mt-3">
                <p className="text-sm"><span className="font-bold">①</span> 先因式分解：<Latex math="2(2x^2 + x - 6) = 2(2x-3)(x+2)" /></p>
                <p className="text-sm mt-1"><span className="font-bold">②</span> 因式即問有哪個括號 → 2 / (2x-3) → 選項 I + II</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH7 三角恆等式 (F3)
// ========================================
const TrigonometricIdentitiesNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-red-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH7 三角比的關係</h1>
        <p className="text-slate-600">sin, cos, tan 與畢氏定理的運用</p>
      </div>

      {/* 口訣提示框 */}
      <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4 mb-6">
        <p className="text-red-600 font-bold mb-3 text-center text-lg">三角比口訣：對斜鄰斜對鄰</p>
        <div className="flex flex-wrap gap-6 items-center justify-center">
          {/* 左側：三個公式（左右排列） */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm text-center min-w-[140px]">
              <div className="text-2xl mb-2"><Latex math="\sin \theta" /></div>
              <div className="text-xl text-slate-600">
                <Latex math="= \dfrac{\text{對}}{\text{斜}}" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm text-center min-w-[140px]">
              <div className="text-2xl mb-2"><Latex math="\cos \theta" /></div>
              <div className="text-xl text-slate-600">
                <Latex math="= \dfrac{\text{鄰}}{\text{斜}}" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm text-center min-w-[140px]">
              <div className="text-2xl mb-2"><Latex math="\tan \theta" /></div>
              <div className="text-xl text-slate-600">
                <Latex math="= \dfrac{\text{對}}{\text{鄰}}" />
              </div>
            </div>
          </div>

          {/* 右側：直角三角形圖 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <svg width="240" height="200" viewBox="0 0 300 250" className="mx-auto">
              {/* 定義箭頭 */}
              <defs>
                <marker id="arrow-trig" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#1565c0" />
                </marker>
              </defs>

              {/* 三角形主體 - 直角在右下 */}
              {/* 頂點座標: 左下(50, 200), 右下(250, 200), 右上(250, 50) */}
              <path d="M 50,200 L 250,200 L 250,50 Z" 
                    fill="none" stroke="#1565c0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              
              {/* 直角標記 */}
              <path d="M 250,180 L 230,180 L 230,200" fill="none" stroke="#1565c0" strokeWidth="2"/>
              
              {/* Theta 角標記 */}
              <path d="M 90,200 A 40,40 0 0,0 85,175" fill="none" stroke="#1565c0" strokeWidth="2"/>
              <text x="100" y="195" fill="#1565c0" fontSize="24" fontWeight="bold">θ</text>

              {/* 標籤 */}
              {/* 斜邊 */}
              <text x="130" y="110" fill="#1565c0" fontSize="28" fontWeight="bold" transform="rotate(-37, 150, 120)">斜</text>
              
              {/* 對邊 */}
              <text x="265" y="140" fill="#1565c0" fontSize="28" fontWeight="bold">對</text>
              
              {/* 鄰邊 */}
              <text x="140" y="240" fill="#1565c0" fontSize="28" fontWeight="bold">鄰</text>
            </svg>
          </div>
        </div>
      </div>

      {/* 1. sin cos tan 輔以畢氏定理 */}
      <CollapsibleSection id="pythagoras" title="sin cos tan 輔以畢氏定理" num={1} color="green" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-green-700 font-bold text-lg mb-3">1. sin cos tan 輔以<span className="text-purple-600">畢氏定理</span>去解題</p>
            <p className="text-slate-700">如果不知道 3 條邊的長度，就不能同時找到 sin θ、cos θ 和 tan θ 的值</p>
          </div>

          {/* 例 1 */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-700 font-bold mb-3">
              例 1：圖中，∠Q=90°、PQ=12 及 PR=13。試不計算 θ，求 sin θ、cos θ 和 tan θ 的值。
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-green-600 mb-2">因題目是直角△，可用畢氏定理得出剩下的邊</p>
                    <div className="text-sm">
                      <Latex math="\begin{aligned} 12^2 + RQ^2 &= 13^2 \\\\ RQ &= 5 \end{aligned}" block left />
                    </div>
                    <p className="text-green-600 mt-3 text-sm">已知 3 邊長度，可按定義寫出 <span className="text-purple-600 font-bold">sin θ / cos θ / tan θ</span></p>
                  </div>
                  
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
                      {/* 定義樣式 */}
                      <style>
                        {`.math-line { stroke: #5e35b1; stroke-width: 4; fill: none; stroke-linecap: round; stroke-linejoin: round; }
                        .math-text { font-family: sans-serif; font-size: 24px; fill: #5e35b1; font-weight: bold; }
                        .math-label { font-family: sans-serif; font-size: 20px; fill: #5e35b1; }`}
                      </style>

                      {/* 主三角形 P(40, 200) -> Q(280, 200) -> R(280, 100) 
                           比例：底 240px (代表12), 高 100px (代表5) */}
                      <path d="M 40 200 L 280 200 L 280 100 Z" className="math-line" />

                      {/* 直角符號 (在 Q 點) */}
                      <path d="M 280 180 L 260 180 L 260 200" className="math-line" strokeWidth="3" />

                      {/* θ 角度弧線 (在 R 點) */}
                      {/* 控制點調整過，使其看起來自然 */}
                      <path d="M 280 135 Q 265 135 258 118" className="math-line" strokeWidth="2" />

                      {/* 頂點標籤 */}
                      <text x="20" y="210" className="math-text">P</text>
                      <text x="290" y="215" className="math-text">Q</text>
                      <text x="290" y="90" className="math-text">R</text>

                      {/* 邊長數據 */}
                      <text x="150" y="230" className="math-text">12</text> {/* 底邊 */}
                      <text x="300" y="160" className="math-text">5</text>  {/* 高 */}
                      <text x="130" y="130" className="math-text">13</text> {/* 斜邊 */}

                      {/* θ 符號 */}
                      <text x="245" y="155" className="math-text">θ</text>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="text-blue-600 text-lg space-y-2">
                  <div><Latex math="\sin\theta = \frac{12}{13}" /></div>
                  <div><Latex math="\cos\theta = \frac{5}{13}" /></div>
                  <div><Latex math="\tan\theta = \frac{12}{5}" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* 例 2 */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-blue-700 font-bold mb-3">
              例 2：已知 <Latex math="\sin\theta = \frac{3}{7}" inline />。求 <Latex math="\frac{\tan\theta}{\cos\theta}" inline /> 的值。
              <span className="text-purple-600 text-xs ml-2">利用 sin θ = <Latex math="\frac{\text{對}}{\text{斜}}" inline /></span>
            </p>
            
            <div className="bg-white rounded-lg p-4 mb-3">
              <div className="flex flex-wrap gap-6 items-start">
                <div className="flex-1 min-w-[200px]">
                  <p className="text-slate-700 mb-2">1. 如果題目沒提供 △ 圖像，需自行繪畫</p>
                  <p className="text-slate-700 mb-3">2. 利用畢氏定理找未知邊的長度</p>
                  
                  <div className="text-green-600">
                    <Latex math="\begin{aligned} x^2 + 3^2 &= 7^2 \quad \text{(畢氏定理)} \\\\ x^2 &= 7^2 - 3^2 \\\\ x^2 &= 40 \\\\ x &= \sqrt{40} \quad \textcolor{purple}{\text{← 出無盡小數，寫 √ 形式}} \end{aligned}" block left />
                  </div>
                </div>
                
                {/* 右側三角形圖 */}
                <div className="flex-shrink-0">
                  <svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                    {/* Styles matching the hand-drawn image */}
                    <style>
                      {`.line { fill: none; stroke: #0047AB; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
                      .angle-mark { fill: none; stroke: #0047AB; stroke-width: 3; }
                      .text-green { font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif; font-size: 32px; fill: #008000; font-weight: bold; }
                      .text-blue { font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif; font-size: 32px; fill: #00BFFF; font-weight: bold; }
                      .text-angle { font-family: serif; font-size: 28px; fill: #0047AB; font-style: italic; }`}
                    </style>

                    {/* Coordinates: 
                         Right angle at (300, 200)
                         Height = 100 units (representing 3)
                         Width approx 210 units (representing ~6.32)
                         Top vertex: (300, 100)
                         Left vertex: (90, 200)
                    */}

                    {/* The Triangle */}
                    <path d="M 90 200 L 300 200 L 300 100 Z" className="line" />

                    {/* Right Angle Symbol */}
                    <polyline points="280,200 280,180 300,180" className="angle-mark" />

                    {/* Theta Angle Arc */}
                    <path d="M 125 200 A 35 35 0 0 0 118 187" className="angle-mark" strokeWidth="2" />
                    <text x="135" y="195" className="text-angle">θ</text>

                    {/* Labels */}
                    {/* Hypotenuse (7) - Green */}
                    <text x="180" y="130" className="text-green" textAnchor="middle">7</text>

                    {/* Opposite Side (3) - Green */}
                    <text x="320" y="160" className="text-green" textAnchor="start">3</text>

                    {/* Adjacent Side (x) - Cyan/Blue */}
                    <text x="195" y="240" className="text-blue" textAnchor="middle">x</text>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-slate-700 mb-2">3. 已知三邊邊長，可找題目要求 <span className="text-green-600 font-bold"><Latex math="\frac{\tan\theta}{\cos\theta}" inline /></span></p>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <div className="text-blue-600">
                    <Latex math="\begin{aligned} \tan\theta &= \frac{3}{\sqrt{40}} \\\\ \cos\theta &= \frac{\sqrt{40}}{7} \end{aligned}" block left />
                  </div>
                  
                  <div className="text-blue-600 text-lg mt-4">
                    <Latex math="\therefore \frac{\tan\theta}{\cos\theta} = \frac{\frac{3}{\sqrt{40}}}{\frac{\sqrt{40}}{7}} = \frac{3}{\sqrt{40}} \times \frac{7}{\sqrt{40}} = \frac{21}{40}" block />
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 特殊三角比 */}
      <CollapsibleSection id="special-angles" title="特殊三角比" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="border border-gray-400 p-3 text-center relative overflow-hidden" style={{ minWidth: '100px', minHeight: '60px' }}>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="100%" y2="100%" stroke="#9ca3af" strokeWidth="1" />
                    </svg>
                    <div className="relative flex justify-between items-start h-full">
                      <span className="self-end text-sm font-bold mt-4">三角比</span>
                      <span className="self-start text-sm font-bold mb-4">θ</span>
                    </div>
                  </th>
                  <th className="border border-gray-400 p-3 text-center">30°</th>
                  <th className="border border-gray-400 p-3 text-center">45°</th>
                  <th className="border border-gray-400 p-3 text-center">60°</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-3 text-center bg-green-50 font-bold">sin θ</td>
                  <td className="border border-gray-400 p-3 text-center">
                    <Latex math="\frac{1}{2}" /> <span className="text-green-600 text-xs">易</span>
                  </td>
                  <td className="border border-gray-400 p-3 text-center bg-pink-100">
                    <Latex math="\frac{1}{\sqrt{2}}" /> 或 <Latex math="\frac{\sqrt{2}}{2}" />
                  </td>
                  <td className="border border-gray-400 p-3 text-center bg-yellow-100">
                    <Latex math="\frac{\sqrt{3}}{2}" />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-3 text-center bg-green-50 font-bold">cos θ</td>
                  <td className="border border-gray-400 p-3 text-center bg-yellow-100">
                    <Latex math="\frac{\sqrt{3}}{2}" />
                  </td>
                  <td className="border border-gray-400 p-3 text-center bg-pink-100">
                    <Latex math="\frac{1}{\sqrt{2}}" /> 或 <Latex math="\frac{\sqrt{2}}{2}" />
                  </td>
                  <td className="border border-gray-400 p-3 text-center">
                    <Latex math="\frac{1}{2}" /> <span className="text-green-600 text-xs">易</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-3 text-center bg-green-50 font-bold">tan θ</td>
                  <td className="border border-gray-400 p-3 text-center">
                    <Latex math="\frac{1}{\sqrt{3}}" /> 或 <Latex math="\frac{\sqrt{3}}{3}" />
                  </td>
                  <td className="border border-gray-400 p-3 text-center">
                    1 <span className="text-green-600 text-xs">易</span>
                  </td>
                  <td className="border border-gray-400 p-3 text-center">
                    <Latex math="\sqrt{3}" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-green-700 font-bold mb-2">易：按計算機</p>
            <div className="text-blue-600 space-y-1 text-sm">
              <p>tan 60° = 1.732050808</p>
              <p>√3 = 1.732050808</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 三角方程 */}
      <CollapsibleSection id="trig-equations" title="三角方程" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="text-lg mb-4">
              <Latex math="2\sin\theta - \sqrt{3} = 0" />
              <span className="text-green-600 text-sm ml-4">目標：找 sin θ = ? (將 sin θ 以外的項移走)</span>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="text-blue-600 text-lg">
                <Latex math="\begin{aligned} 2\sin\theta &= \sqrt{3} \\\\ \sin\theta &= \frac{\sqrt{3}}{2} \end{aligned}" block left />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <p className="text-purple-600 font-bold mb-3">以 sin θ 找 θ：</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-slate-700">按</span>
              <span className="px-2 py-1 bg-yellow-500 text-black rounded text-xs font-bold">SHIFT</span>
              <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">sin</span>
              <span className="text-slate-700"><Latex math="\left(\frac{\sqrt{3}}{2}\right)" inline /></span>
              <span className="text-green-600 text-2xl">→</span>
              <span className="text-blue-600 text-xl font-bold">θ = 60°</span>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. 需記三角恆等式 */}
      <CollapsibleSection id="identities" title="需記三角恆等式" num={4} color="red" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-6">
          <div className="bg-red-50 rounded-lg p-4 border-2 border-red-400">
            <h3 className="text-red-700 font-bold text-lg mb-4">需記三角恆等式</h3>
            
            {/* 兩欄標題列 */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center font-bold text-red-600 text-base border-b-2 border-red-300 pb-1">原式</div>
              <div className="text-center font-bold text-green-600 text-base border-b-2 border-green-300 pb-1">變種</div>
            </div>

            <div className="space-y-4 text-lg">
              {/* A */}
              <div className="bg-white rounded-lg p-3">
                <p className="text-red-600 font-bold mb-2">A.</p>
                <div className="grid grid-cols-2 gap-3 items-start">
                  <div className="text-center">
                    <Latex math="\sin^2\theta + \cos^2\theta = 1" />
                  </div>
                  <div className="text-left text-green-700 space-y-1">
                    <div><Latex math="\sin^2\theta = 1 - \cos^2\theta" /></div>
                    <div><Latex math="\cos^2\theta = 1 - \sin^2\theta" /></div>
                  </div>
                </div>
              </div>

              {/* B */}
              <div className="bg-white rounded-lg p-3">
                <p className="text-red-600 font-bold mb-2">B.</p>
                <div className="grid grid-cols-2 gap-3 items-center">
                  <div className="text-center">
                    <Latex math="\tan\theta = \frac{\sin\theta}{\cos\theta}" />
                  </div>
                  <div className="text-left text-green-700">
                    <Latex math="\frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}" />
                  </div>
                </div>
              </div>

              {/* C */}
              <div className="bg-white rounded-lg p-3">
                <p className="text-red-600 font-bold mb-2">C.</p>
                <div className="grid grid-cols-2 gap-3 items-center">
                  <div className="text-center">
                    <Latex math="\sin(90° - \theta) = \cos\theta" />
                  </div>
                  <div className="text-left text-slate-400 text-sm">—</div>
                </div>
              </div>

              {/* D */}
              <div className="bg-white rounded-lg p-3">
                <p className="text-red-600 font-bold mb-2">D.</p>
                <div className="grid grid-cols-2 gap-3 items-center">
                  <div className="text-center">
                    <Latex math="\cos(90° - \theta) = \sin\theta" />
                  </div>
                  <div className="text-left text-slate-400 text-sm">—</div>
                </div>
              </div>

              {/* E */}
              <div className="bg-white rounded-lg p-3">
                <p className="text-red-600 font-bold mb-2">E.</p>
                <div className="grid grid-cols-2 gap-3 items-center">
                  <div className="text-center">
                    <Latex math="\frac{1}{\tan(90° - \theta)} = \tan\theta" />
                  </div>
                  <div className="text-left text-green-700">
                    <Latex math="\tan(90° - \theta) = \frac{1}{\tan\theta}" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH5 四邊形 (F3)
// ========================================
const QuadrilateralNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH5 四邊形的性質</h1>
        <p className="text-slate-600">平行四邊形、菱形、長方形、正方形、中點定理、截線定理</p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-sm text-slate-600 italic">
        <p>定義：最簡單的描述（幼稚園 / 小學就識講）</p>
        <p>性質：延伸知道的 邊 / 角 / 對角線 的關係</p>
      </div>

      {/* 1. 平行四邊形的定義和性質 */}
      <CollapsibleSection id="parallelogram" title="平行四邊形的定義和性質" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="text-sm text-slate-500 mb-3">3A05 §5.1, 5.2</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* (a) 定義 */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">(a) 定義</h3>
            <p className="text-slate-700 mb-3">有 <span className="bg-yellow-200 px-1 rounded font-bold text-green-700">兩對對邊平行</span> 的四邊形。</p>
            <div className="flex justify-center my-3">
              <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="arrow-head-single" d="M -5 -5 L 5 0 L -5 5" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <g id="arrow-head-double">
                      <path d="M -8 -5 L 2 0 L -8 5" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M 0 -5 L 10 0 L 0 5" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </defs>
                <path d="M 80 150 L 220 150 L 260 50 L 120 50 Z" 
                      fill="none" 
                      stroke="black" 
                      strokeWidth="2.5" 
                      strokeLinejoin="miter"
                      strokeLinecap="round"/>
                <use href="#arrow-head-double" x="190" y="50" transform="rotate(0 190 50)" />
                <use href="#arrow-head-double" x="150" y="150" transform="rotate(0 150 150)" />
                <use href="#arrow-head-single" x="100" y="100" transform="rotate(-68.2 100 100)" />
                <use href="#arrow-head-single" x="240" y="100" transform="rotate(-68.2 240 100)" />
              </svg>
            </div>
            <p className="text-slate-500 italic text-sm">(簡記：平行四邊形定義)</p>
          </div>

          {/* (b) 性質 */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">(b) 性質</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-slate-700">(i) 對邊相等。</span>
                <svg width="160" height="80" viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <style>{`
                      .shape { fill: none; stroke: black; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                      .mark { fill: none; stroke: #0ea5e9; stroke-width: 2; stroke-linecap: round; }
                    `}</style>
                  </defs>
                  <g transform="translate(10, 10)">
                    <g transform="translate(100, 0)"> 
                       <line x1="-3" y1="-5" x2="-3" y2="5" className="mark" />
                       <line x1="3" y1="-5" x2="3" y2="5" className="mark" />
                    </g>
                    <g transform="translate(60, 60)"> 
                       <line x1="-3" y1="-5" x2="-3" y2="5" className="mark" />
                       <line x1="3" y1="-5" x2="3" y2="5" className="mark" />
                    </g>
                    <line x1="15.8" y1="27.2" x2="24.2" y2="32.8" className="mark" /> 
                    <line x1="135.8" y1="27.2" x2="144.2" y2="32.8" className="mark" /> 
                    <path d="M40,0 L160,0 L120,60 L0,60 Z" className="shape" />
                  </g>
                </svg>
              </div>
              <p className="text-slate-500 italic text-xs ml-4">(簡記：平行四邊形對邊)</p>
              <div className="flex items-center gap-3">
                <span className="text-slate-700">(ii) 對角相等。</span>
                <svg width="160" height="80" viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <style>{`
                      .shape { fill: none; stroke: black; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                      .mark { fill: none; stroke: #0ea5e9; stroke-width: 2; stroke-linecap: round; }
                    `}</style>
                  </defs>
                  <g transform="translate(10, 10)">
                    <path d="M15,60 A15,15 0 0,0 8.4,47.4" className="mark" />
                    <path d="M145,0 A15,15 0 0,0 151.6,12.6" className="mark" />
                    <path d="M52,0 A12,12 0 0,1 33.3,10" className="mark" />
                    <path d="M56,0 A16,16 0 0,1 31.1,13.3" className="mark" />
                    <path d="M108,60 A12,12 0 0,1 126.7,50" className="mark" />
                    <path d="M104,60 A16,16 0 0,1 128.9,46.7" className="mark" />
                    <path d="M40,0 L160,0 L120,60 L0,60 Z" className="shape" />
                  </g>
                </svg>
              </div>
              <p className="text-slate-500 italic text-xs ml-4">(簡記：平行四邊形對角)</p>
              <div className="flex items-center gap-3">
                <span className="text-slate-700">(iii) 對角線互相平分。</span>
                <svg width="160" height="80" viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <style>{`
                      .shape { fill: none; stroke: black; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                      .mark { fill: none; stroke: #0ea5e9; stroke-width: 2; stroke-linecap: round; }
                    `}</style>
                  </defs>
                  <g transform="translate(10, 10)">
                    <line x1="57" y1="19" x2="63" y2="11" className="mark" />
                    <line x1="97" y1="49" x2="103" y2="41" className="mark" />
                    <g transform="translate(120, 15)">
                        <line x1="-3.62" y1="-3.98" x2="-0.12" y2="5.38" className="mark" />
                        <line x1="0.12" y1="-5.38" x2="3.62" y2="3.98" className="mark" />
                    </g>
                    <g transform="translate(40, 45)">
                        <line x1="-3.62" y1="-3.98" x2="-0.12" y2="5.38" className="mark" />
                        <line x1="0.12" y1="-5.38" x2="3.62" y2="3.98" className="mark" />
                    </g>
                    <line x1="40" y1="0" x2="120" y2="60" className="shape" strokeWidth="1.5" />
                    <line x1="160" y1="0" x2="0" y2="60" className="shape" strokeWidth="1.5" />
                    <path d="M40,0 L160,0 L120,60 L0,60 Z" className="shape" />
                  </g>
                </svg>
              </div>
              <p className="text-slate-500 italic text-xs ml-4">(簡記：平行四邊形對角線)</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 平行四邊形的判定條件 */}
      <CollapsibleSection id="parallelogram-test" title="平行四邊形的判定條件" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="text-sm text-slate-500 mb-3">3A05 §5.3</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-slate-700 font-medium">(a) 兩對對邊相等</span>
              <svg width="100" height="70" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>{`
                    .shape { fill: none; stroke: black; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                    .mark { fill: none; stroke: #0ea5e9; stroke-width: 2; stroke-linecap: round; }
                  `}</style>
                </defs>
                <g transform="translate(0, 0)">
                  <g transform="translate(120, 0)"> 
                     <line x1="-3" y1="-5" x2="-3" y2="5" className="mark" />
                     <line x1="3" y1="-5" x2="3" y2="5" className="mark" />
                  </g>
                  <g transform="translate(80, 60)"> 
                     <line x1="-3" y1="-5" x2="-3" y2="5" className="mark" />
                     <line x1="3" y1="-5" x2="3" y2="5" className="mark" />
                  </g>
                  <line x1="35.8" y1="27.2" x2="44.2" y2="32.8" className="mark" /> 
                  <line x1="155.8" y1="27.2" x2="164.2" y2="32.8" className="mark" /> 
                  <path d="M60,0 L180,0 L140,60 L20,60 Z" className="shape" />
                </g>
              </svg>
            </div>
            <p className="text-green-700 italic text-sm">(簡記：對邊相等)</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-slate-700 font-medium">(b) 兩對對角相等</span>
              <svg width="100" height="70" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>{`
                    .shape { fill: none; stroke: black; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                    .mark { fill: none; stroke: #0ea5e9; stroke-width: 2; stroke-linecap: round; }
                  `}</style>
                </defs>
                <g transform="translate(0, 0)">
                  <path d="M35,60 A15,15 0 0,0 28.4,47.4" className="mark" />
                  <path d="M165,0 A15,15 0 0,0 171.6,12.6" className="mark" />
                  <path d="M72,0 A12,12 0 0,1 53.3,10" className="mark" />
                  <path d="M76,0 A16,16 0 0,1 51.1,13.3" className="mark" />
                  <path d="M128,60 A12,12 0 0,1 146.7,50" className="mark" />
                  <path d="M124,60 A16,16 0 0,1 148.9,46.7" className="mark" />
                  <path d="M60,0 L180,0 L140,60 L20,60 Z" className="shape" />
                </g>
              </svg>
            </div>
            <p className="text-green-700 italic text-sm">(簡記：對角相等)</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-slate-700 font-medium">(c) 對角線互相平分</span>
              <svg width="100" height="70" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>{`
                    .shape { fill: none; stroke: black; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                    .mark { fill: none; stroke: #0ea5e9; stroke-width: 2; stroke-linecap: round; }
                  `}</style>
                </defs>
                <g transform="translate(0, 0)">
                  <line x1="77" y1="19" x2="83" y2="11" className="mark" />
                  <line x1="117" y1="49" x2="123" y2="41" className="mark" />
                  <g transform="translate(140, 15)">
                      <line x1="-3.62" y1="-3.98" x2="-0.12" y2="5.38" className="mark" />
                      <line x1="0.12" y1="-5.38" x2="3.62" y2="3.98" className="mark" />
                  </g>
                  <g transform="translate(60, 45)">
                      <line x1="-3.62" y1="-3.98" x2="-0.12" y2="5.38" className="mark" />
                      <line x1="0.12" y1="-5.38" x2="3.62" y2="3.98" className="mark" />
                  </g>
                  <line x1="60" y1="0" x2="140" y2="60" className="shape" strokeWidth="1.5" />
                  <line x1="180" y1="0" x2="20" y2="60" className="shape" strokeWidth="1.5" />
                  <path d="M60,0 L180,0 L140,60 L20,60 Z" className="shape" />
                </g>
              </svg>
            </div>
            <p className="text-green-700 italic text-sm">(簡記：對角線互相平分)</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-slate-700 font-medium">(d) 一對對邊平行且相等 <span className="text-red-600">★</span></span>
              <svg width="100" height="70" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>{`
                    .shape { fill: none; stroke: black; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                    .mark { fill: none; stroke: #0ea5e9; stroke-width: 2; stroke-linecap: round; }
                    .fill-mark { fill: #0ea5e9; stroke: none; }
                  `}</style>
                </defs>
                <g transform="translate(0, 0)">
                  <path d="M110,0 L100,-5 L100,5 Z" className="fill-mark" />
                  <g transform="translate(125, 0)"> 
                     <line x1="-3" y1="-5" x2="-3" y2="5" className="mark" />
                     <line x1="3" y1="-5" x2="3" y2="5" className="mark" />
                  </g>
                  <path d="M70,60 L60,55 L60,65 Z" className="fill-mark" />
                  <g transform="translate(85, 60)"> 
                     <line x1="-3" y1="-5" x2="-3" y2="5" className="mark" />
                     <line x1="3" y1="-5" x2="3" y2="5" className="mark" />
                  </g>
                  <path d="M60,0 L180,0 L140,60 L20,60 Z" className="shape" />
                </g>
              </svg>
            </div>
            <p className="text-green-700 italic text-sm">(簡記：對邊 // 且相等)</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 菱形 / 長方形 / 正方形 */}
      <CollapsibleSection id="special-shapes" title="
      菱形 / 長方形 / 正方形的定義和性質" num={3} color="orange" activeSub={activeSub} sectionRef={s3}>
        <div className="text-sm text-slate-500 mb-3">3A05 §5.4A–C</div>
        
        {/* SVG 共用样式组件 */}
        {(() => {
          const SvgStyles = () => (
            <defs>
              <style>{`
                .shape { fill: white; stroke: black; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                .mark { fill: none; stroke: #0ea5e9; stroke-width: 2; stroke-linecap: round; }
                .mark-thin { fill: none; stroke: #0ea5e9; stroke-width: 1.5; stroke-linecap: round; }
                .label { font-family: "Times New Roman", serif; font-size: 16px; fill: black; font-weight: bold; font-style: italic; }
                .angle-text { font-family: sans-serif; font-size: 11px; fill: #333; text-anchor: middle; font-weight: bold; }
              `}</style>
            </defs>
          );

          const RhombusDefinitionSVG = () => (
            <svg width="200" height="140" viewBox="0 0 200 140">
              <defs>
                <g id="tick-mark-double">
                  <line x1="-3" y1="-5" x2="-3" y2="5" stroke="#0ea5e9" strokeWidth="2" />
                  <line x1="3" y1="-5" x2="3" y2="5" stroke="#0ea5e9" strokeWidth="2" />
                </g>
              </defs>
              <path d="M20,70 L100,20 L180,70 L100,120 Z" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
              <g>
                <g transform="translate(60, 45) rotate(-32)"><use href="#tick-mark-double" /></g>
                <g transform="translate(140, 45) rotate(32)"><use href="#tick-mark-double" /></g>
                <g transform="translate(140, 95) rotate(-32)"><use href="#tick-mark-double" /></g>
                <g transform="translate(60, 95) rotate(32)"><use href="#tick-mark-double" /></g>
              </g>
            </svg>
          );

          const RhombusAnglesSVG = () => (
            <svg width="200" height="110" viewBox="0 0 200 110">
              <g stroke="#0ea5e9" strokeWidth="1.5" fill="none" strokeLinecap="round">
                <path d="M90,30 A15,15 0 0,0 100,20" />
                <path d="M100,20 A15,15 0 0,0 110,30" />
                <path d="M90,80 A15,15 0 0,1 100,90" />
                <path d="M100,90 A15,15 0 0,1 110,80" />
                <path d="M35,48 A15,15 0 0,1 45,55" />
                <path d="M45,55 A15,15 0 0,1 35,62" />
                <path d="M165,48 A15,15 0 0,0 155,55" />
                <path d="M155,55 A15,15 0 0,0 165,62" />
                <line x1="93" y1="22" x2="97" y2="26" strokeWidth="1"/>
                <line x1="103" y1="26" x2="107" y2="22" strokeWidth="1"/>
                <line x1="93" y1="88" x2="97" y2="84" strokeWidth="1"/>
                <line x1="103" y1="84" x2="107" y2="88" strokeWidth="1"/>
                <g strokeWidth="1">
                  <line x1="38" y1="49" x2="42" y2="51"/> <line x1="39" y1="51" x2="43" y2="53"/>
                  <line x1="38" y1="61" x2="42" y2="59"/> <line x1="39" y1="59" x2="43" y2="57"/>
                  <line x1="158" y1="51" x2="162" y2="49"/> <line x1="157" y1="53" x2="161" y2="51"/>
                  <line x1="158" y1="59" x2="162" y2="61"/> <line x1="157" y1="57" x2="161" y2="59"/>
                </g>
              </g>
              <path d="M20,55 L100,5 L180,55 L100,105 Z" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
              <line x1="20" y1="55" x2="180" y2="55" stroke="#16a34a" strokeWidth="2" />
              <line x1="100" y1="5" x2="100" y2="105" stroke="#16a34a" strokeWidth="2" />
            </svg>
          );

          const RhombusPerpendicularSVG = () => (
            <svg width="200" height="110" viewBox="0 0 200 110">
              <path d="M20,55 L100,5 L180,55 L100,105 Z" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
              <line x1="20" y1="55" x2="180" y2="55" stroke="#16a34a" strokeWidth="2" />
              <line x1="100" y1="5" x2="100" y2="105" stroke="#16a34a" strokeWidth="2" />
              <polyline points="100,40 115,40 115,55" stroke="#0ea5e9" strokeWidth="2" fill="none" />
            </svg>
          );

          const RectangleDefinitionSVG = () => (
            <svg width="200" height="140" viewBox="0 0 200 140">
              <rect x="20" y="20" width="160" height="100" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
              <g stroke="#0ea5e9" strokeWidth="2" fill="none">
                <polyline points="20,40 40,40 40,20" />
                <polyline points="160,20 160,40 180,40" />
                <polyline points="180,100 160,100 160,120" />
                <polyline points="40,120 40,100 20,100" />
              </g>
            </svg>
          );

          const RectanglePropertiesSVG = () => (
            <svg width="210" height="170" viewBox="-10 -10 220 160">
              <defs>
                <g id="tick-mark-double-diag">
                  <line x1="-3" y1="-5" x2="-3" y2="5" stroke="#0ea5e9" strokeWidth="2" />
                  <line x1="3" y1="-5" x2="3" y2="5" stroke="#0ea5e9" strokeWidth="2" />
                </g>
              </defs>
              <rect x="20" y="20" width="160" height="100" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
              <line x1="20" y1="20" x2="180" y2="120" stroke="#16a34a" strokeWidth="2" />
              <line x1="180" y1="20" x2="20" y2="120" stroke="#16a34a" strokeWidth="2" />
              <text x="5" y="15" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">A</text>
              <text x="5" y="135" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">B</text>
              <text x="182" y="135" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">C</text>
              <text x="182" y="15" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">D</text>
              <text x="100" y="90" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold" textAnchor="middle">O</text>
              <g>
                <g transform="translate(60, 45) rotate(32)"><use href="#tick-mark-double-diag" /></g>
                <g transform="translate(140, 45) rotate(-32)"><use href="#tick-mark-double-diag" /></g>
                <g transform="translate(60, 95) rotate(-32)"><use href="#tick-mark-double-diag" /></g>
                <g transform="translate(140, 95) rotate(32)"><use href="#tick-mark-double-diag" /></g>
              </g>
            </svg>
          );

          const SquareDefinitionSVG = () => (
            <svg width="160" height="160" viewBox="0 0 160 160">
              <rect x="20" y="20" width="120" height="120" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
              <g stroke="#0ea5e9" strokeWidth="2" fill="none">
                <polyline points="20,35 35,35 35,20" />
                <polyline points="140,35 125,35 125,20" />
                <polyline points="140,125 125,125 125,140" />
                <polyline points="20,125 35,125 35,140" />
              </g>
              <g stroke="#0ea5e9" strokeWidth="2">
                <g transform="translate(80, 20)"><line x1="-3" y1="-5" x2="-3" y2="5" /> <line x1="3" y1="-5" x2="3" y2="5" /></g>
                <g transform="translate(140, 80) rotate(90)"><line x1="-3" y1="-5" x2="-3" y2="5" /> <line x1="3" y1="-5" x2="3" y2="5" /></g>
                <g transform="translate(80, 140)"><line x1="-3" y1="-5" x2="-3" y2="5" /> <line x1="3" y1="-5" x2="3" y2="5" /></g>
                <g transform="translate(20, 80) rotate(90)"><line x1="-3" y1="-5" x2="-3" y2="5" /> <line x1="3" y1="-5" x2="3" y2="5" /></g>
              </g>
            </svg>
          );

          const SquarePropertiesSVG = () => (
            <svg viewBox="0 0 400 400">
              <style>{`
                text { font-family: "Times New Roman", serif; font-size: 24px; fill: black; text-anchor: middle; dominant-baseline: middle; }
                .shape { stroke: black; stroke-width: 2.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
                .arc { stroke: #0ea5e9; stroke-width: 2; fill: none; }
              `}</style>
              <g className="arc">
                <path d="M 90 50 A 40 40 0 0 1 78.28 78.28" />
                <path d="M 78.28 78.28 A 40 40 0 0 1 50 90" />
                <path d="M 350 90 A 40 40 0 0 1 321.72 78.28" />
                <path d="M 321.72 78.28 A 40 40 0 0 1 310 50" />
                <path d="M 310 350 A 40 40 0 0 1 321.72 321.72" />
                <path d="M 321.72 321.72 A 40 40 0 0 1 350 310" />
                <path d="M 50 310 A 40 40 0 0 1 78.28 321.72" />
                <path d="M 78.28 321.72 A 40 40 0 0 1 90 350" />
              </g>
              <g className="shape">
                <rect x="50" y="50" width="300" height="300" />
                <line x1="50" y1="50" x2="350" y2="350" />
                <line x1="350" y1="50" x2="50" y2="350" />
              </g>
              <g>
                <text x="115" y="75">45°</text><text x="75" y="115">45°</text>
                <text x="325" y="115">45°</text><text x="285" y="75">45°</text>
                <text x="285" y="325">45°</text><text x="325" y="285">45°</text>
                <text x="75" y="285">45°</text><text x="115" y="325">45°</text>
              </g>
            </svg>
          );

          return (
            <>
              {/* 菱形 */}
              <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500 mb-6">
                <h3 className="font-bold text-purple-800 mb-4 text-lg">③ 菱形的定義和性質</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-purple-200 transform -translate-x-1/2 hidden md:block"></div>
                  
                  <div className="pr-0 md:pr-4">
                    <p className="text-purple-900 font-semibold mb-3">(a) 菱形是四邊相等的四邊形。</p>
                    <div className="flex justify-center my-4">
                      <RhombusDefinitionSVG />
                    </div>
                    <div className="text-center text-purple-700 bg-white border border-purple-200 inline-block px-4 py-1 rounded-full mx-auto w-full">
                      〔簡記：菱形定義〕
                    </div>
                  </div>

                  <div className="pl-0 md:pl-4">
                    <p className="text-purple-900 font-semibold mb-2">(b) 菱形的性質：</p>
                    <ul className="list-none space-y-3 text-gray-700">
                      <li className="flex gap-2">
                        <span className="font-bold text-purple-600">(i)</span>
                        <span>平行四邊形的所有性質</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-purple-600">(ii)</span>
                        <div className="w-full">
                          對角線平分每個內角。
                          <div className="flex justify-center mt-2">
                            <RhombusAnglesSVG />
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-purple-600">(iii)</span>
                        <div className="w-full">
                          <div className="flex items-center gap-2">
                            對角線互相<span className="text-red-500 font-bold">垂直（90°）</span>。
                          </div>
                          <div className="flex justify-center mt-2">
                            <RhombusPerpendicularSVG />
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-3 text-center text-purple-700 bg-white border border-purple-200 px-4 py-1 rounded-full">
                      〔簡記：菱形性質〕
                    </div>
                  </div>
                </div>
              </div>

              {/* 長方形 */}
              <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500 mb-6">
                <h3 className="font-bold text-purple-800 mb-4 text-lg">④ 長方形的定義和性質</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-purple-200 transform -translate-x-1/2 hidden md:block"></div>
                  
                  <div className="pr-0 md:pr-4">
                    <p className="text-purple-900 font-semibold mb-3">(a) 長方形是所有內角都等於 90° 的四邊形。</p>
                    <div className="flex justify-center my-4">
                      <RectangleDefinitionSVG />
                    </div>
                    <div className="text-center text-purple-700 bg-white border border-purple-200 inline-block px-4 py-1 rounded-full mx-auto w-full">
                      〔簡記：長方形定義〕
                    </div>
                  </div>

                  <div className="pl-0 md:pl-4">
                    <p className="text-purple-900 font-semibold mb-2">(b) 長方形的性質：</p>
                    <ul className="list-none space-y-2 text-gray-700">
                      <li className="flex gap-2">
                        <span className="font-bold text-purple-600">(i)</span>
                        <span>平行四邊形的所有性質</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-purple-600">(ii)</span>
                        <div>
                          對角線相等。<br/>
                          即 AC = BD
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-purple-600">(iii)</span>
                        <div className="w-full">
                          對角線互相平分為四條相等的線段。<br/>
                          即 OA = OB = OC = OD。
                          <div className="flex justify-center mt-3">
                            <RectanglePropertiesSVG />
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-3 text-center text-purple-700 bg-white border border-purple-200 px-4 py-1 rounded-full">
                      〔簡記：長方形性質〕
                    </div>
                  </div>
                </div>
              </div>

              {/* 正方形 */}
              <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                <h3 className="font-bold text-purple-800 mb-4 text-lg">⑤ 正方形的定義和性質</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-purple-200 transform -translate-x-1/2 hidden md:block"></div>
                  
                  <div className="pr-0 md:pr-4">
                    <p className="text-purple-900 font-semibold mb-3">(a) 正方形是四邊相等且所有內角都等於 90° 的四邊形。</p>
                    <div className="flex justify-center my-4">
                      <SquareDefinitionSVG />
                    </div>
                    <div className="text-center text-purple-700 bg-white border border-purple-200 inline-block px-4 py-1 rounded-full mx-auto w-full">
                      〔簡記：正方形定義〕
                    </div>
                  </div>

                  <div className="pl-0 md:pl-4">
                    <p className="text-purple-900 font-semibold mb-2">(b) 正方形的性質：</p>
                    <ul className="list-none space-y-2 text-gray-700">
                      <li className="flex gap-2">
                        <span className="font-bold text-purple-600">(i)</span>
                        <span>菱形的所有性質</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-purple-600">(ii)</span>
                        <span>長方形的所有性質</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-purple-600">(iii)</span>
                        <div className="w-full">
                          任何邊與對角線的夾角都是 45°。
                          <div className="flex justify-center mt-3">
                            <SquarePropertiesSVG />
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-3 text-center text-purple-700 bg-white border border-purple-200 px-4 py-1 rounded-full">
                      〔簡記：正方形性質〕
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })()}
      </CollapsibleSection>

      {/* 4. 中點定理 */}
      <CollapsibleSection id="midpoint-theorem" title="中點定理 (Mid-point Theorem)" num={4} color="purple" activeSub={activeSub} sectionRef={s4}>
        <div className="text-sm text-slate-500 mb-3">3A05 §5.6A</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-slate-700">若 M 和 N 分別是 AB 和 AC 的中點，</p>
            <p className="text-red-600 font-bold">則 (a) MN // BC</p>
            <p className="text-red-600 font-bold">　 (b) MN = <Latex math="\dfrac{1}{2}" /> BC</p>
            <p className="text-slate-500 italic text-sm mt-2">(簡記：中點定理)</p>
          </div>
          <div className="flex justify-center">
            <svg width="180" height="130" viewBox="0 0 180 130">
              <path d="M 90,15 L 25,115 L 155,115 Z" fill="none" stroke="#333" strokeWidth="2" strokeLinejoin="round" />
              <line x1="57" y1="65" x2="122" y2="65" stroke="#6a1b9a" strokeWidth="2.5" />
              {/* Equal tick marks on AM, MB */}
              <line x1="55" y1="35" x2="65" y2="45" stroke="#333" strokeWidth="1.5" />
              <line x1="35" y1="85" x2="45" y2="95" stroke="#333" strokeWidth="1.5" />
              {/* Equal tick marks on AN, NC */}
              <line x1="115" y1="35" x2="125" y2="45" stroke="#333" strokeWidth="1.5" />
              <line x1="130" y1="85" x2="140" y2="95" stroke="#333" strokeWidth="1.5" />
              <text x="85" y="12" fontSize="13" fill="#333">A</text>
              <text x="10" y="115" fontSize="13" fill="#333">B</text>
              <text x="158" y="115" fontSize="13" fill="#333">C</text>
              <text x="40" y="62" fontSize="13" fill="#6a1b9a">M</text>
              <text x="125" y="62" fontSize="13" fill="#6a1b9a">N</text>
            </svg>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. 截線定理 */}
      <CollapsibleSection id="intercept-theorem" title="截線定理 (Intercept Theorem)" num={5} color="purple" activeSub={activeSub} sectionRef={s5}>
        <div className="text-sm text-slate-500 mb-3">3A05 §5.6B</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-slate-700">若 AB // CD // EF，</p>
            <p className="text-slate-700">且 AC = CE，</p>
            <p className="text-red-600 font-bold">則 BD = DF</p>
            <p className="text-slate-500 italic text-sm">(三條平行線截相等線段)</p>
            <p className="text-slate-500 italic text-sm">(簡記：截線定理)</p>
          </div>
          <div className="flex justify-center">
            <svg width="180" height="120" viewBox="0 0 180 120">
              {/* 三條平行線 */}
              <line x1="20" y1="20" x2="160" y2="20" stroke="#333" strokeWidth="1.5" />
              <line x1="20" y1="60" x2="160" y2="60" stroke="#333" strokeWidth="1.5" />
              <line x1="20" y1="100" x2="160" y2="100" stroke="#333" strokeWidth="1.5" />
              {/* 兩條截線 */}
              <line x1="50" y1="10" x2="75" y2="110" stroke="#1565c0" strokeWidth="2" />
              <line x1="110" y1="10" x2="135" y2="110" stroke="#1565c0" strokeWidth="2" />
              {/* 左截線等號 tick */}
              <line x1="58" y1="38" x2="62" y2="42" stroke="#d32f2f" strokeWidth="2" />
              <line x1="67" y1="78" x2="71" y2="82" stroke="#d32f2f" strokeWidth="2" />
              {/* 右截線等號 tick */}
              <line x1="118" y1="38" x2="122" y2="42" stroke="#d32f2f" strokeWidth="2" />
              <line x1="127" y1="78" x2="131" y2="82" stroke="#d32f2f" strokeWidth="2" />
              {/* Labels */}
              <text x="38" y="16" fontSize="12" fill="#333">A</text>
              <text x="100" y="16" fontSize="12" fill="#333">B</text>
              <text x="54" y="56" fontSize="12" fill="#333">C</text>
              <text x="115" y="56" fontSize="12" fill="#333">D</text>
              <text x="67" y="96" fontSize="12" fill="#333">E</text>
              <text x="128" y="96" fontSize="12" fill="#333">F</text>
            </svg>
          </div>
        </div>

        {/* 區分重點 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
          <p className="font-bold text-green-700 mb-3">區分重點：中點定理 vs 截線定理</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold text-purple-700 mb-1">中點定理</p>
              <p className="text-slate-700">1 個三角形，2 個中點</p>
              <p className="text-red-600 font-bold">→ 平行 且 一半長度</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold text-purple-700 mb-1">截線定理</p>
              <p className="text-slate-700">3 條平行線，截線相等</p>
              <p className="text-red-600 font-bold">→ 另一邊也相等</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH1 二次方程 (F4)
// ========================================
const QuadraticEquationNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-red-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH1 二次方程</h1>
        <p className="text-slate-600">掌握解二次方程的多種方法</p>
      </div>

      {/* 1. 一般式 */}
      <CollapsibleSection id="general-form" title="一般式" num={1} color="red" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-3 text-lg">一般式：<Latex math="ax^2 + bx + c = \textcolor{red}{\underline{0}}" />，<Latex math="\textcolor{red}{a > 0}" /></h3>
            <p className="text-green-600 text-sm mb-3"><Latex math="x^2" /> → x → 沒x &nbsp;&nbsp;&nbsp; ↙ 必定=0</p>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-red-600 font-bold mb-2">- 一般式是去做二次公式 / 按計算機 <span className="px-2 py-1 bg-orange-500 text-white rounded text-xs font-bold">FMLA</span> <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">01</span> 時有用</p>
              <p className="text-red-600">∴ 需要以一般式去得出 a / b / c 值去作計算</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-slate-800 mb-3">變換為一般式</h3>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-green-700 mb-2">題目：</p>
              <div className="text-blue-700">
                <Latex math="\begin{aligned} -x &= 5 + 2x^2 \\\\ 0 &= 5 + 2x^2 + x \\\\ 5 + 2x^2 + x &= 0 \\\\ 2x^2 + x + 5 &= 0 \end{aligned}" block left />
              </div>
              <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-600">
                <p className="font-bold">← 合格的一般式：</p>
                <p>① <Latex math="x^2 \to x \to" /> 沒x順序</p>
                <p>② 右邊=0</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">📱 使用計算機 FMLA 01</h3>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-blue-600 mb-2">例：<Latex math="x^2 + 4x + 3 = 0" /></p>
              <div className="space-y-2">
                <p className="text-green-700"><span className="font-bold">Step 1:</span> 認 a, b, c &nbsp;&nbsp; <span className="text-blue-600">a=1, b=4, c=3</span></p>
                <p className="text-green-700"><span className="font-bold">Step 2:</span> 按 <span className="px-2 py-1 bg-orange-500 text-white rounded text-xs font-bold">FMLA</span> <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">01</span></p>
                <p className="text-slate-500 text-sm ml-4">(屏幕顯示: Formula No?)</p>
                <p className="text-slate-500 text-sm ml-4">輸入: <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">0</span> <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">1</span></p>
                <p className="text-green-700"><span className="font-bold">Step 3:</span> 輸入 a, b, c 的數值</p>
                <div className="ml-4 text-sm space-y-1">
                  <div><span className="inline-block w-6 h-6 rounded-full border-2 border-green-600 text-center text-xs leading-5">1</span> <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">1</span> <span className="px-2 py-1 bg-gray-300 text-black rounded text-xs font-bold">EXE</span></div>
                  <div><span className="inline-block w-6 h-6 rounded-full border-2 border-purple-600 text-center text-xs leading-5">2</span> 輸入!</div>
                </div>
                <p className="text-green-700"><span className="font-bold">Step 4:</span> 出答案 (2個!)</p>
                <div className="ml-4 space-y-2">
                  <div className="border border-slate-300 p-2 bg-slate-50 rounded font-mono text-sm">
                    <p>01: QuadEquation</p>
                    <p className="text-red-600">x₁ &nbsp;&nbsp;&nbsp;&nbsp; -1</p>
                  </div>
                  <div className="border border-slate-300 p-2 bg-slate-50 rounded font-mono text-sm">
                    <p>01: QuadEquation</p>
                    <p className="text-black">x₂ &nbsp;&nbsp;&nbsp;&nbsp; -3</p>
                  </div>
                  <p className="text-green-700 text-sm"><span className="inline-block w-6 h-6 rounded-full border-2 border-red-600 text-center text-xs leading-5">1</span> → 去答案2</p>
                </div>
                <p className="text-green-700 mt-2">∴ ANS是 -1 / -3</p>
                <p className="text-red-600 font-bold">寫： x = -1 或 -3</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 二次公式 */}
      <CollapsibleSection id="quad-formula" title="二次公式" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3 text-lg">二次公式</h3>
            <div className="text-center my-4">
              <Latex math="x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}" block />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-green-700 mb-2">題目：解 <Latex math="x^2 + 2x = 2" /> <span className="text-red-500">(開方 - 以根式表示答案)</span></p>
            <div>
              <div className="flex items-start gap-2 mb-2">
                <Latex math="x^2 + 2x - 2 = 0" />
                <span className="text-red-500 text-sm">← 變做一般式，解讀 a/b/c = ?</span>
              </div>
              <p className="text-green-600 mb-2"><Latex math="a=1, \quad b=2, \quad c=-2" /></p>
              <div className="text-blue-700">
                <Latex math="\begin{aligned} x &= \frac{-2 \pm \sqrt{2^2-4(1)(-2)}}{2(1)} \\\\ &= \frac{-2 \pm \sqrt{12}}{2} \quad \textcolor{red}{\text{← 已經接受此答案}} \\\\ &= \frac{-2}{2} \pm \frac{\sqrt{12}}{2} \\\\ &= -1 \pm \frac{\sqrt{12}}{2} \end{aligned}" block left />
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="text-red-600 font-bold">二重根 → 兩個重複的根</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 取平方根法 */}
      <CollapsibleSection id="square-root" title="取平方根法" num={3} color="blue" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 核心概念</h3>
            <p className="text-slate-700 mb-2">- 二次方程最多可以有 2 個根/解 <span className="text-blue-600">(x答案)</span></p>
            <div className="bg-red-50 p-3 rounded my-3">
              <p className="text-red-600 font-bold">解決方程的次序：先 + - , 後 × ÷ , 最後拆括號</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-green-700 mb-2">題目：</p>
            <div className="text-blue-700">
              <Latex math="\begin{aligned} 4(5m+3)^2 - 28 &= 0 \\\\ 4(5m+3)^2 &= 28 && \textcolor{green}{\text{← 處理 + - (-28)}} \\\\ (5m+3)^2 &= 7 && \textcolor{green}{\text{← 處理 × ÷ (28÷4=7)}} \\\\ 5m+3 &= \pm\sqrt{7} && \textcolor{green}{\text{← 取平方根法}} \\\\ 5m &= -3 \pm\sqrt{7} && \textcolor{green}{\text{← 先處理 + -}} \\\\ m &= \frac{-3 \pm \sqrt{7}}{5} && \textcolor{green}{\text{← 後處理 × ÷}} \end{aligned}" block left />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. 計算機解未知數 */}
      <CollapsibleSection id="calculator" title="計算機解未知數" num={4} color="orange" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3">📱 FMLA 01 步驟</h3>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-red-600 font-bold mb-3">FMLA → 01 → a? b? c? → x₁=?, x₂=?</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-blue-600 mb-2"><Latex math="x^2 - 4x + 4 = 0" /></p>
              <p className="text-black" style={{wordSpacing: '20px'}}>1 -4 4</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">原本的話，需二次方程計算</h3>
            <div>
              <div className="text-blue-700">
                <Latex math="\begin{aligned} x &= \frac{-(-4) \pm \sqrt{(-4)^2-4(1)(4)}}{2(1)} && \textcolor{green}{\leftarrow \frac{-b \pm \sqrt{b^2-4ac}}{2a}} \\\\ &= \frac{4 \pm \sqrt{0}}{2} \\\\ &= \frac{4}{2} \\\\ &= 2 \end{aligned}" block left />
              </div>
              <p className="text-blue-600 font-bold mt-2">答案： x = 2 (二重根)</p>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-400 p-4 rounded-lg">
            <p className="text-red-600 font-bold text-xl">Maths Error → 沒有根</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. 二次方程應用題 */}
      <CollapsibleSection id="applications" title="二次方程應用題" num={5} color="purple" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">⚠️ 注意事項</h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <span className="text-black">- 留意一些限制，答案有機會</span>
                <span className="text-red-600 font-bold"> (捨去)</span>
              </li>
              <li className="ml-4">
                <p className="text-green-600 mb-1">e.g. x {"<"} 0 → 代表 x 不能是正數</p>
              </li>
              <li className="ml-4">
                <p className="text-green-600 mb-1">
                  有一些單位/性質 <span className="text-red-600 font-bold">必定為正數 / 0</span>
                </p>
                <p className="text-blue-600 text-sm">
                  (eg. 長度, 人數, 體積, 身高, 體重, 距離)
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-300 p-4 rounded-lg">
            <h3 className="font-bold text-amber-800 mb-2">💡 解題提示</h3>
            <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
              <li>先列出方程式</li>
              <li>變換為一般式</li>
              <li>用計算機或公式求解</li>
              <li>檢查答案是否合理（考慮限制條件）</li>
              <li>捨去不合理的負數或零值（視情況而定）</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// 餘式定理 & 因式定理 (F4)
// ========================================
const RemainderFactorNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-teal-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH4 續多項式</h1>
        <p className="text-slate-600">掌握餘式定理與因式定理</p>
      </div>

      <CollapsibleSection id="remainder" title="餘式定理" num="4.3" color="teal" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
            <h3 className="font-bold text-teal-800 mb-3">📝 核心概念</h3>
            <p className="text-slate-700 mb-3">當 <Latex math="f(x)" /> 除以<span className="text-red-600 font-bold">除式</span>，所得的餘數可以用 <Latex math="f(\text{相反數})" /> 求得</p>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm text-slate-600 mb-2">例子：</p>
              <p className="text-slate-700"><Latex math="f(x)" /> 除以 <span className="bg-yellow-200 px-1 rounded"><Latex math="x + 3" /></span>，所得的餘數是 <Latex math="-8" /></p>
              <div className="mt-2 pl-4 border-l-2 border-teal-300">
                <p className="text-sm text-slate-600"><span className="text-green-600 font-bold">3</span> 的相反是 <span className="text-red-600 font-bold">-3</span></p>
                <p className="text-lg mt-1"><Latex math="f(-3) = -8" /> ← <span className="text-sm text-slate-500">填餘數</span></p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-amber-800 text-sm">📌 註：做長答題時，如果題目沒有提及 <Latex math="f(x)" />，需設 <Latex math="f(x)" /></p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-teal-200">
            <h3 className="font-bold text-teal-700 mb-3">Step 1：找相應的 <Latex math="f(x)" /></h3>
            <p className="text-sm text-red-600 font-medium mb-3">Case 1：找相反數</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-200"><th className="text-left py-2 px-3 text-slate-600">除式</th><th className="text-left py-2 px-3 text-slate-600">找</th></tr></thead>
                <tbody>
                  <tr className="border-b border-slate-100"><td className="py-2 px-3">除以 <Latex math="x + 3" /></td><td className="py-2 px-3">→ 找 <Latex math="f(-3)" /></td></tr>
                  <tr className="border-b border-slate-100"><td className="py-2 px-3">除以 <Latex math="x - 4" /></td><td className="py-2 px-3">→ 找 <Latex math="f(4)" /></td></tr>
                  <tr className="border-b border-slate-100"><td className="py-2 px-3">除以 <Latex math="2x + 5" /></td><td className="py-2 px-3">→ 找 <Latex math="f(-\frac{5}{2})" /></td></tr>
                  <tr><td className="py-2 px-3">除以 <Latex math="3x - 7" /></td><td className="py-2 px-3">→ 找 <Latex math="f(\frac{7}{3})" /></td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-sm text-blue-800"><span className="font-bold">💡 技巧（當 <Latex math="ax + b" /> 形式）：</span></p>
              <div className="mt-2 flex items-center gap-2 text-sm"><span>令 <Latex math="ax + b = 0" /></span><span>→</span><span><Latex math="x = -\frac{b}{a}" /></span></div>
              <p className="text-sm text-slate-600 mt-2"><span className="bg-cyan-200 px-1 rounded">前面數字</span>放分母，<span className="bg-pink-200 px-1 rounded">後面數字相反數</span>放分子</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="factor" title="因式定理" num="4.4" color="orange" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3">📝 核心概念</h3>
            <p className="text-slate-700 mb-2">因式定理 = 餘式定理的<span className="bg-yellow-200 px-1 rounded font-bold">餘數 = 0</span> 版本</p>
            <div className="bg-white rounded-lg p-3 space-y-3">
              <div>
                <p className="text-sm text-slate-600 mb-1">例子 1：</p>
                <p className="text-slate-700"><Latex math="f(x)" /> 可被 <Latex math="x - 2" /> <span className="bg-yellow-200 px-1 rounded font-bold">整除</span></p>
                <p className="text-lg mt-1 pl-4">→ <Latex math="f(2) = 0" /></p>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <p className="text-sm text-slate-600 mb-1">例子 2：</p>
                <p className="text-slate-700">已知 <Latex math="x + 3" /> 是 <Latex math="f(x)" /> 的<span className="bg-yellow-200 px-1 rounded font-bold">因式</span></p>
                <p className="text-lg mt-1 pl-4">→ <Latex math="f(-3) = 0" /></p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-700 mb-3">📋 證明題型</h3>
            <div className="bg-amber-50 rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-2">例：題目：證明 <Latex math="x + 4" /> 是 <Latex math="f(x)" /> 的因式</p>
              <div className="mt-2 space-y-2">
                <p className="text-slate-700">→ <Latex math="f(-4)" /> 是否 <Latex math="= 0" /> ？</p>
                <div className="flex items-center gap-4 text-sm mt-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">= 0 → Yes ✓</span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded">≠ 0 → No ✗</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-orange-50 rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-3">🔑 關鍵字對照</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3">
                <p className="font-bold text-teal-600 mb-2">餘式定理</p>
                <ul className="space-y-1 text-slate-600"><li>• 除以...</li><li>• 餘數為...</li><li>• 餘數相等</li></ul>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="font-bold text-orange-600 mb-2">因式定理</p>
                <ul className="space-y-1 text-slate-600"><li>• 整除</li><li>• ...的因式</li><li>• 可被...除盡</li></ul>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH11 變分 (F5)
// ========================================
const VariationNotes = ({ activeSub, onNavigate }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH11 變分 (Variation)</h1>
        <p className="text-slate-600">掌握四條變分公式及其應用</p>
      </div>

      {/* 1. 四條公式 & 備註 */}
      <CollapsibleSection id="variation-formulas" title="四條公式 & 備註" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-blue-800 text-lg">1. 正變：</span>
              <MathDisplay latex="y = k \textcolor{#ca8a04}{x}" inline className="text-lg font-bold" />
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-blue-800 text-lg">2. 反變：</span>
              <MathDisplay latex="y = \frac{k}{\textcolor{#ca8a04}{x}}" inline className="text-lg font-bold" />
            </div>
            <div className="text-sm text-slate-500 mt-1">可設佈為分數形式</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-blue-800 text-lg">3. 聯變：</span>
              <MathDisplay latex="z = k \textcolor{#ca8a04}{x} \textcolor{#ca8a04}{y}" inline className="text-lg font-bold" />
            </div>
            <div className="text-sm text-slate-600 mt-1"><span className="font-bold">字眼：</span>"且"、"及"</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-blue-800 text-lg">4. 部分變：</span>
              <MathDisplay latex="y = k_1 \textcolor{#ca8a04}{x} + k_2 \textcolor{#ca8a04}{x^2}" inline className="text-lg font-bold" />
            </div>
            <div className="text-sm text-slate-600 mt-1"><span className="font-bold">字眼：</span>"部份"、"而"</div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-800 mb-2">註：代數 (<span className="text-yellow-600">黃色highlight </span>) 按題目不同字眼而改變：</h4>
            <p className="text-sm text-slate-600 mb-2">例子：</p>
            <ul className="space-y-2 text-sm bg-yellow-50 p-3 rounded-lg text-slate-700">
              <li className="flex items-center justify-between border-b border-yellow-100 pb-1">
                <span>x 的 <span className="text-red-600 font-bold">平方</span></span>
                <div className="flex items-center"><ArrowRight className="w-3 h-3 mx-2 text-slate-400"/><MathDisplay latex="x^{\textcolor{red}{2}}" inline /></div>
              </li>
              <li className="flex items-center justify-between border-b border-yellow-100 pb-1">
                <span>y 的 <span className="text-red-600 font-bold">立方</span></span>
                <div className="flex items-center"><ArrowRight className="w-3 h-3 mx-2 text-slate-400"/><MathDisplay latex="y^{\textcolor{red}{3}}" inline /></div>
              </li>
              <li className="flex items-center justify-between border-b border-yellow-100 pb-1">
                <span>x 的 <span className="text-red-600 font-bold">平方根</span></span>
                <div className="flex items-center"><ArrowRight className="w-3 h-3 mx-2 text-slate-400"/><MathDisplay latex="\textcolor{red}{\sqrt{\textcolor{black}{x}}}" inline /></div>
              </li>
              <li className="flex items-center justify-between">
                <span>z 的 <span className="text-red-600 font-bold">立方根</span></span>
                <div className="flex items-center"><ArrowRight className="w-3 h-3 mx-2 text-slate-400"/><MathDisplay latex="\textcolor{red}{\sqrt[3]{\textcolor{black}{z}}}" inline /></div>
              </li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 變分符號 */}
      <CollapsibleSection id="variation-symbol" title="變分符號" num={2} color="purple" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">📝 符號意義</h3>
            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-lg">
                <span className="font-bold">變分符號：</span>
                <Latex math="\propto" />
                <span className="text-slate-500">←</span>
                <span>意指 <span className="bg-yellow-200 px-2 py-0.5 rounded font-bold">"= k"</span></span>
              </div>
              <div className="border-t pt-3">
                <p className="text-sm text-slate-600 mb-2">例子：</p>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-green-700">e.g.</span>
                  <Latex math="y \propto x" />
                  <span className="text-slate-500 mx-2">⟹</span>
                  <Latex math="y = kx" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 題目問法 */}
      <CollapsibleSection id="variation-questions" title="題目問法" num={3} color="green" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-6">
          {/* A. 以x表示y */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">A. 以 x 表示 y ／求一個聯繫 x 和 y 的方程 ／求 f(x) <span className="text-red-500 text-sm bg-red-100 px-2 py-0.5 rounded ml-2">最新</span></h3>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm text-red-600 font-bold mb-2">按題目提供數值找 k，然後列出變分公式</p>
              <div className="bg-green-50 rounded p-3 mt-2">
                <p className="text-sm text-green-700 mb-2">例題：x 隨 y 正變，當 x = 5，y = 25</p>
                <p className="font-bold text-slate-700 mb-2">a. 以 x 表 y</p>
                <div className="space-y-1 ml-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Latex math="x = ky" />
                    <span className="text-red-500">← 先列公式</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Latex math="5 = k(25)" />
                    <span className="text-red-500">← 代入題目提供數值</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Latex math="k = \frac{1}{5}" />
                    <span className="text-red-500">← 成功找到變分常數 k</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Latex math="x = \frac{1}{5}y" />
                    <span className="text-red-500">← 最尾請放 k 進公式，x / y 保留</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* B. 當x=?, y=? */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">B. 當 x = ?，y = ?</h3>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-blue-700 mb-2">例：當 x = 10，求 y 的值</p>
              <div className="ml-4 text-sm">
                <Latex math="\begin{aligned} x &= \frac{1}{5}y && \textcolor{red}{\text{← 列找到的式 (a部)}} \\\\ 10 &= \frac{1}{5}y && \textcolor{red}{\text{← 代入法}} \\\\ 10 \times 5 &= y \\\\ y &= 50 \end{aligned}" block left />
              </div>
            </div>
          </div>

          {/* C. 哪個是必為常數 MC */}
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3">C. 哪個是必為常數？ <span className="text-sm bg-yellow-200 border border-yellow-400 px-2 py-0.5 rounded">MC 限定</span></h3>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm text-red-600 font-bold mb-3">目標：要找 k = ?</p>
              <div className="bg-green-50 rounded p-3">
                <p className="text-sm text-green-700 mb-2">題目：P 隨 x 正變且隨 <Latex math="\sqrt{y}" /> 反變，下列何者必為常數？</p>
                <div className="ml-4 space-y-1 text-sm mb-3">
                  <p className="flex items-center gap-2"><span className="border-2 border-green-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">A</span> <Latex math="\frac{P\sqrt{y}}{x}" /></p>
                  <p className="flex items-center gap-2"><span className="w-6 h-6 flex items-center justify-center text-xs">B.</span> <Latex math="\frac{x\sqrt{y}}{P}" /></p>
                  <p className="flex items-center gap-2"><span className="w-6 h-6 flex items-center justify-center text-xs">C.</span> <Latex math="\frac{Px}{\sqrt{y}}" /></p>
                  <p className="flex items-center gap-2"><span className="w-6 h-6 flex items-center justify-center text-xs">D.</span> <Latex math="Px\sqrt{y}" /></p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-red-600 font-bold mb-2">目標：k / k 的變種做主項</p>
                  <div className="space-y-1 ml-4 text-sm">
                    <Latex math="P = \frac{kx}{\sqrt{y}}" block />
                    <Latex math="\frac{P\sqrt{y}}{x} = k" block />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">→ 答案 A</p>
                  <p className="text-xs text-slate-500 mt-1">💡 如在選擇中找不到 k 的答案，可找 <Latex math="k^2" /> / <Latex math="\frac{1}{k}" /></p>
                </div>
              </div>
            </div>
          </div>

          {/* 部分變 Prog 01 提示 */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
            <h3 className="font-bold text-amber-800 mb-2">⚠️ 部分變方程解題</h3>
            <p className="text-sm text-slate-700 mb-3">
              解部分變方程時需要用到計算機{' '}
              <a
                onClick={() => onNavigate && onNavigate('高中甲(一)', 'simultaneous-eq', 'calculator')}
                className="text-blue-600 hover:text-blue-800 underline cursor-pointer font-semibold"
              >
                Prog 01 解聯立方程
              </a>
              。
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// 聯立方程 - 計算機使用 (高中甲一)
// ========================================
const SimEqCalculatorNotes = ({ activeSub }) => {
  const s1 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">聯立方程</h1>
        <p className="text-slate-600">CASIO fx-50FH II 計算機程式</p>
      </div>

      <CollapsibleSection id="calculator" title="計算機使用（Prog 01）" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-6">
          {/* 適用範圍 */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center border-2 border-blue-400">
            <p className="text-sm text-gray-600 mb-2">📟 CASIO fx-50FH II — Prog 01：解聯立二元一次方程</p>
            <div className="text-lg font-bold text-blue-900 flex items-center justify-center gap-3">
              <span className="text-5xl leading-none">{`{`}</span>
              <div className="text-left"><div>Ax + By = C</div><div>Dx + Ey = F</div></div>
            </div>
          </div>

          {/* 特殊符號 */}
          <div>
            <h3 className="text-blue-900 font-bold mb-3 border-l-4 border-blue-500 pl-3">⌨️ 特殊符號輸入方法</h3>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { symbol: '?', keys: ['SHIFT', '3', '1'] },
                  { symbol: '→', keys: ['SHIFT', '3', '2'] },
                  { symbol: ':', keys: ['SHIFT', '3', '3'] },
                  { symbol: '◢', keys: ['SHIFT', '3', '4'] },
                  { symbol: '⁻¹', keys: ['x⁻¹'] },
                  { symbol: '┘', keys: ['a b/c'] },
                  { symbol: 'A', keys: ['ALPHA', 'A'], symbolColor: 'text-red-600' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200">
                    <span className={`w-8 text-center text-lg font-bold ${item.symbolColor || 'text-blue-900'}`}>{item.symbol}</span>
                    <div className="flex flex-wrap gap-1">
                      {item.keys.map((key, i) => (
                        <span key={i} className={`px-2 py-1 rounded text-xs font-bold shadow-sm ${
                          key === 'SHIFT' ? 'bg-yellow-500 text-black' :
                          key === 'ALPHA' ? 'bg-red-600 text-white' :
                          (key === 'x⁻¹' || key === 'a b/c') ? 'bg-gray-700 text-white' :
                          'bg-gray-800 text-white'
                        }`}>{key}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 輸入程式 */}
          <div>
            <h3 className="text-blue-900 font-bold mb-3 border-l-4 border-blue-500 pl-3">📝 輸入程式</h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <strong>進入程式編輯模式</strong>
              </div>
              <div className="flex flex-wrap gap-1 items-center text-sm">
                <span className="px-2 py-1 bg-purple-600 text-white rounded text-xs font-bold">MODE</span>
                <span className="px-2 py-1 bg-purple-600 text-white rounded text-xs font-bold">MODE</span>
                <span className="text-blue-900 font-bold">→</span>
                <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">6</span>
                <span className="text-gray-500 text-xs">(PRGM)</span>
                <span className="text-blue-900 font-bold">→</span>
                <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">1</span>
                <span className="text-gray-500 text-xs">(EDIT)</span>
                <span className="text-blue-900 font-bold">→</span>
                <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">1</span>
                <span className="text-gray-500 text-xs">(Prog 1)</span>
                <span className="text-blue-900 font-bold">→</span>
                <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">1</span>
                <span className="text-gray-500 text-xs">(COMP)</span>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <strong>輸入以下程式碼</strong>
              </div>
              <div className="bg-black rounded-lg p-3 font-mono text-green-400 text-sm overflow-x-auto">
                <div>?→A : ?→B : ?→C : ?→D : ?→X : ?→Y :</div>
                <div>AX－DB→M : M⁻¹(CX－YB→X◢</div>
                <div>M⁻¹(AY－DC→Y</div>
                <div className="text-gray-500 text-right text-xs mt-2">（共 53 步）</div>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <strong>確認並離開</strong>
              </div>
              <p className="text-sm">完成輸入後，檢查計算機是否顯示 <strong className="text-blue-900">053</strong>。如是，按 <span className="px-2 py-1 bg-red-600 text-white rounded text-xs font-bold">ON</span> 離開。如否，請檢查是否輸入錯漏。</p>
            </div>
          </div>

          {/* 使用方法 */}
          <div>
            <h3 className="text-blue-900 font-bold mb-3 border-l-4 border-blue-500 pl-3">🎯 使用方法</h3>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-400">
              <p className="font-bold text-center mb-3">輸入順序：</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th colSpan="3" className="p-2 border border-blue-700">第一條方程：Ax + By = C</th>
                      <th colSpan="3" className="p-2 border border-blue-700">第二條方程：Dx + Ey = F</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white"><td className="p-2 border text-center">A</td><td className="p-2 border text-center">B</td><td className="p-2 border text-center">C</td><td className="p-2 border text-center">D</td><td className="p-2 border text-center">E</td><td className="p-2 border text-center">F</td></tr>
                    <tr className="bg-gray-50 text-xs text-gray-600"><td className="p-2 border text-center">x的係數</td><td className="p-2 border text-center">y的係數</td><td className="p-2 border text-center">常數</td><td className="p-2 border text-center">x的係數</td><td className="p-2 border text-center">y的係數</td><td className="p-2 border text-center">常數</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-center mt-3 text-sm"><strong>輸出：</strong>先顯示 <span className="text-red-600 font-bold">x</span>，按 EXE 後顯示 <span className="text-red-600 font-bold">y</span></p>
            </div>
          </div>

          {/* 範例 */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-500">
            <h4 className="text-green-700 font-bold mb-3">📌 範例：解聯立方程</h4>
            <div className="bg-white p-3 rounded-lg text-center mb-4 border border-green-400">
              <div className="text-lg font-mono flex items-center justify-center gap-3">
                <span className="text-5xl leading-none">{`{`}</span>
                <div className="text-left"><div>x + 2y = 10</div><div>3x − 4y = −6</div></div>
              </div>
            </div>
            <p className="font-bold text-sm mb-2">步驟一：執行程式</p>
            <div className="bg-white p-2 rounded mb-3">
              <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold">Prog</span>
              <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold ml-1">1</span>
              <span className="text-gray-500 text-xs ml-2">→ 計算機顯示「A?」</span>
            </div>
            <p className="font-bold text-sm mb-2">步驟二：依次輸入係數</p>
            <div className="bg-white p-2 rounded space-y-1 text-sm">
              {[
                { keys: ['1'], label: '（A = 1）' }, { keys: ['2'], label: '（B = 2）' },
                { keys: ['1', '0'], label: '（C = 10）' }, { keys: ['3'], label: '（D = 3）' },
                { keys: ['(−)', '4'], label: '（E = −4）' }, { keys: ['(−)', '6'], label: '（F = −6）' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-1">
                  {item.keys.map((k, i) => (
                    <span key={i} className={`px-2 py-1 rounded text-xs font-bold ${k === '(−)' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'}`}>{k}</span>
                  ))}
                  <span className="px-2 py-1 bg-green-600 text-white rounded text-xs font-bold">EXE</span>
                  <span className="text-gray-500 text-xs">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-100 p-3 rounded-lg mt-3 text-center border border-blue-300">
              <p>計算機顯示 <span className="text-2xl font-bold text-blue-700">2.8</span> <span className="text-sm text-gray-600">（x = 2.8）</span></p>
              <p className="mt-2">按 <span className="px-2 py-1 bg-green-600 text-white rounded text-xs font-bold">EXE</span> 後顯示 <span className="text-2xl font-bold text-blue-700">3.6</span> <span className="text-sm text-gray-600">（y = 3.6）</span></p>
              <div className="mt-3 pt-3 border-t border-blue-300">✅ <strong>答案：x = 2.8，y = 3.6</strong></div>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="bg-red-50 border-2 border-red-400 p-3 rounded-lg">
            <div className="font-bold text-red-700 mb-2">⚠️ 注意</div>
            <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
              <li>輸入負數時要用 <span className="px-1 bg-gray-800 text-white rounded text-xs">(−)</span> 鍵（負號鍵），不是減號</li>
              <li>係數為 1 時也要輸入 <span className="px-1 bg-gray-800 text-white rounded text-xs">1</span></li>
              <li>注意輸入順序：先 x 係數，再 y 係數，最後常數</li>
              <li>如方程要整理（如 4y + 3x = 10），先改寫成 3x + 4y = 10</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-400 p-3 rounded-lg">
            <div className="font-bold text-yellow-700 mb-2">💡 提示</div>
            <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
              <li>如果顯示「Math ERROR」，表示方程無解或有無限多解</li>
              <li>要重新計算，只需按 <span className="px-1 bg-blue-600 text-white rounded text-xs">Prog</span> <span className="px-1 bg-gray-800 text-white rounded text-xs">1</span> 再次執行</li>
              <li>程式會永久保存，關機後仍可使用</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH13 近似值 (F1)
// ========================================
const ApproximationNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH13 近似值</h1>
        <p className="text-slate-600">有效數字與捨入方法</p>
      </div>

      <CollapsibleSection id="sig-fig" title="有效數字 & 捨入方法" num={1} color="green" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-6 text-slate-700">
          <div className="border-b-2 border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-800">1. 有效數字：<span className="text-slate-600">不是開首的 0 就是有效數字</span></h3>
          </div>
          <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
            <div className="text-lg font-mono flex items-center gap-2">
              <span className="text-blue-600 font-bold">I.</span>
              <span className="relative">8<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">1</span></span><span>.</span>
              <span className="relative">4<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">2</span></span>
              <span className="relative">6<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">3</span></span>
            </div>
            <div className="text-lg font-mono flex items-center gap-2">
              <span className="text-blue-600 font-bold">II.</span>
              <span className="relative">0<span className="absolute -top-4 left-0 text-sm text-red-600 font-bold">×</span></span><span>.</span>
              <span className="relative">0<span className="absolute -top-4 left-0 text-sm text-red-600 font-bold">×</span></span>
              <span className="relative">5<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">1</span></span>
              <span className="relative">8<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">2</span></span>
              <span className="text-red-600 text-sm ml-4">× 不是有效數字</span>
            </div>
            <div className="text-lg font-mono flex items-center gap-2">
              <span className="text-blue-600 font-bold">III.</span>
              <span className="relative">0<span className="absolute -top-4 left-0 text-sm text-red-600 font-bold">×</span></span><span>.</span>
              <span className="relative">6<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">1</span></span>
              <span className="relative">0<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">2</span></span>
              <span className="relative">8<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">3</span></span>
              <span className="text-green-600 text-sm ml-4">1 第一位有效數字</span>
            </div>
          </div>
          <hr className="border-slate-300" />
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="font-bold">需注意：</span>
              <span className="text-blue-600 font-bold">1. 捨入方法</span>
              <span className="text-green-600 font-bold">2. 取值</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <h4 className="font-bold text-blue-800 mb-2">捨入方法：</h4>
                <div className="flex items-center gap-3"><span className="text-red-600 text-xs">(必定進位)</span><span className="text-blue-600 font-bold w-12">上捨</span><span className="font-mono">45.1 → <b>46</b></span></div>
                <div className="flex items-center gap-3"><span className="text-red-600 text-xs">(4捨5入)</span><span className="text-blue-600 font-bold w-12">捨入</span><span className="font-mono">45.1 → <b>45</b></span></div>
                <div className="flex items-center gap-3"><span className="text-red-600 text-xs">(不需進位)</span><span className="text-blue-600 font-bold w-12">下捨</span><span className="font-mono">45.9 → <b>45</b></span></div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">取值目標：</h4>
                <ul className="space-y-1 text-sm"><li>• 2位小數</li><li>• 有效數字</li><li>• 最接近整數</li><li>• 最接近十位</li><li>• 最接近百位</li></ul>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="approx-examples" title="題目範例" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <span className="text-black font-bold text-lg">題目示例</span>
            <ol className="list-[lower-alpha] list-inside mt-2 space-y-2">
              <li>把 <span className="border-2 border-red-400 rounded-full px-1">9</span><span className="border-b-2 border-blue-400">8</span>7.6543 <span className="text-blue-600 font-bold">上捨入</span>至最接近的百位。</li>
              <li>把 987.65<span className="border-2 border-red-400 rounded-full px-1">4</span><span className="border-b-2 border-blue-400">3</span> <span className="text-blue-600 font-bold">捨入</span>至三位小數。</li>
              <li>把 9<span className="border-2 border-red-400 rounded-full px-1">8</span><span className="border-b-2 border-blue-400">7</span>.6543 <span className="text-blue-600 font-bold">下捨入</span>至二位有效數字。</li>
            </ol>
          </div>
          <div className="space-y-3">
            <h3 className="text-red-600 font-bold">圈下位值及下一個數字</h3>
            <div className="space-y-2 bg-slate-50 p-4 rounded-lg">
              <div className="flex items-start gap-4"><span className="text-blue-600 font-bold">a. 1000</span><span className="text-purple-600 text-sm">(位值為9, <span className="text-red-600">上捨 → 必定進位</span>, 9 → 10)</span></div>
              <div className="flex items-start gap-4"><span className="text-blue-600 font-bold">b. 987.654</span><span className="text-purple-600 text-sm">(位值為4, 後面的數是3, <span className="text-red-600">四捨 → 不用進位</span>)</span></div>
              <div className="flex items-start gap-4"><span className="text-blue-600 font-bold">c. 980</span><span className="text-purple-600 text-sm">(位值為8, <span className="text-red-600">下捨 → 不需進位</span>, 8後的整數部份要補上0，小數點後忽略)</span></div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// 函數 f(x) (F4)
// ========================================
const FunctionNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-indigo-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH3 函數 f(x)</h1>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
        <p className="text-slate-700 font-bold mb-2">要懂得解讀 f(x)：代入法</p>
        <p className="text-slate-700 mb-1"><span className="font-bold">F1：</span>代 x=2 進 <Latex math="x^2+2" /></p>
        <p className="text-slate-700 mb-1"><span className="font-bold">高中：</span><Latex math="f(x) = x^2+2" />，計算 <Latex math="f(2)" /> ← 代 x=2</p>
        <p className="text-sm text-slate-600">e.g. <Latex math="f(x)" />、<Latex math="g(x)" />、<Latex math="h(x)" />... 不同的英文字代表不同的算式</p>
      </div>

      {/* 1. 簡單代數字 */}
      <CollapsibleSection id="basic-sub" title="簡單代數字" num={1} color="indigo" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          {/* 例子 1 */}
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <p className="text-sm text-green-700 mb-2">題目：<Latex math="f(x) = 5x - 1" />，求 <Latex math="f(2)" /> 和 <Latex math="2f(3)" /></p>
            <div className="bg-white rounded-lg p-3 space-y-2 text-sm">
              <div>
                <span className="text-blue-600 font-bold">答案：</span>
                <Latex math="f(2) = 5(2) - 1 = 9" />
              </div>
              <div>
                <Latex math="2f(3) = 2[5(3) - 1] = 2 \times 14 = 28" />
                <span className="text-slate-500 ml-2">← 2×f(3)</span>
              </div>
              <p className="text-red-500 font-bold mt-1">必須寫在計算什麼</p>
            </div>
          </div>
          {/* 例子 2 */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-green-700 mb-2">題目：<Latex math="h(x) = 2x + 1" />，求 <Latex math="[h(3)]^2" /></p>
            <div className="bg-white rounded-lg p-3 text-sm">
              <span className="text-blue-600 font-bold">答案：</span>
              <Latex math="[h(3)]^2 = [2(3)+1]^2 = 7^2 = 49" />
              <p className="text-red-500 mt-2">先計 h(3)，再全式 2 次方</p>
            </div>
          </div>
          {/* 例子 3 */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-green-700 mb-2">題目：<Latex math="f(x) = \frac{2}{x+3}" />，<Latex math="g(x) = x^2 + 3" /></p>
            <div className="bg-white rounded-lg p-3 text-sm">
              <span className="text-blue-600 font-bold">答案：</span>
              <p className="mb-1"><Latex math="f(2) \cdot g(-2)" /></p>
              <Latex math="= \left(\frac{2}{2+3}\right) \cdot \left((-2)^2 + 3\right) = \frac{2}{5} \times 7 = \frac{14}{5}" block />
            </div>
          </div>
          {/* 例子 4 - DSE 題 */}
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <p className="text-sm text-green-700 mb-2">題目：考慮 <Latex math="H(x) = \frac{x+1}{x}" />，其中 <Latex math="x \neq 0" /></p>
            <p className="text-xs text-slate-500 mb-2">(a) 求 H(2) 和 H(½) 的值 &nbsp; (b) 求 H(½) ÷ H(2) 的值</p>
            <div className="bg-white rounded-lg p-3 text-sm space-y-2">
              <div>
                <span className="text-blue-600 font-bold">a. </span>
                <Latex math="H(2) = \frac{2+1}{2} = \frac{3}{2}" />
              </div>
              <div>
                <Latex math="H\!\left(\frac{1}{2}\right) = \frac{\frac{1}{2}+1}{\frac{1}{2}} = \frac{1.5}{0.5} = 3" />
              </div>
              <div className="border-t pt-2">
                <span className="text-blue-600 font-bold">(b) </span>
                <Latex math="H\!\left(\frac{1}{2}\right) \div H(2) = 3 \div \frac{3}{2} = 2" />
              </div>
              <p className="text-green-600 text-xs mt-1">→ <span className="bg-yellow-200 px-1 rounded">分別代入之前成果</span></p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 用 f(x) 找未知數 */}
      <CollapsibleSection id="find-unknown" title="用 f(x) 找未知數" num={2} color="purple" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm font-bold text-slate-700 mb-2">16. 考慮 <Latex math="g(x) = 2x^2 + ax" /> 其中 a 是一個常數，且 <Latex math="g(-1) = 1" /></p>
            <p className="text-xs text-slate-500 mb-3">(a) 求 a 的值 &nbsp; (b) 若 g(t) = 6，求 t 的值</p>

            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-blue-600 font-bold text-sm mb-2">答案：</p>
              <p className="text-blue-600 font-bold text-sm mb-2">a. 代 x = -1：</p>
              <div className="text-sm space-y-1 ml-4">
                <div className="flex items-start gap-2">
                  <Latex math="2(-1)^2 + a(-1) = 1" />
                  <span className="text-red-500">← 利用方程計算 a 值</span>
                </div>
                <Latex math="2 - a = 1" block />
                <Latex math="a = 1" block />
              </div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <p className="text-blue-600 font-bold text-sm mb-2">答案：</p>
              <p className="text-blue-600 font-bold text-sm mb-2">b. <Latex math="g(x) = 2x^2 + (1)x" /></p>
              <div className="text-sm space-y-1 ml-4">
                <div className="flex items-start gap-2">
                  <Latex math="g(t) = 2t^2 + t" />
                  <span className="text-red-500">← 按 x 位置代 t</span>
                </div>
                <div className="flex items-start gap-2">
                  <Latex math="\therefore g(t) = 6 \rightarrow 6 = 2t^2 + t" />
                  <span className="text-red-500">← 2次方程需用 FMLA 01</span>
                </div>
                <div className="flex items-start gap-2">
                  <Latex math="0 = 2t^2 + t - 6" />
                  <span className="text-red-500">← 先轉一般式，才 FMLA 01</span>
                </div>
                <p className="mt-2 text-slate-700"><span className="font-bold">∴ t = 1.5 或 -2</span></p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 二次函數圖像 */}
      <CollapsibleSection id="quadratic-graph" title="二次函數圖像" num={3} color="green" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">📝 一般式：<Latex math="ax^2 + bx + c = 0" /></h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 text-center border border-green-200">
                <p className="text-4xl mb-2">∪</p>
                <p className="font-bold text-green-700"><Latex math="a > 0" /></p>
                <p className="text-sm text-slate-600">開口<span className="text-green-600 font-bold">向上</span>（+ve）</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-red-200">
                <p className="text-4xl mb-2">∩</p>
                <p className="font-bold text-red-700"><Latex math="a < 0" /></p>
                <p className="text-sm text-slate-600">開口<span className="text-red-600 font-bold">向下</span>（-ve）</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📐 c：y 截距</h3>
            <p className="text-sm text-slate-600 mb-2">（方程抹 y 軸的值）</p>
            <div className="space-y-2 text-sm">
              <p>在 x 軸之<span className="text-red-600 font-bold">下</span> → <Latex math="c < 0" /></p>
              <p>在 x 軸之<span className="text-green-600 font-bold">上</span> → <Latex math="c > 0" /></p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">📌 例子</h3>
            <div className="bg-white rounded-lg p-3 text-sm">
              <Latex math="-5x^2 + 6x + 3 = 0" block />
              <div className="flex gap-6 mt-2">
                <span><span className="text-red-600 font-bold">a = -5</span> → 開口向下 ∩</span>
                <span><span className="text-green-600 font-bold">c = 3</span> → y截距 = 3</span>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. 提供坐標 */}
      <CollapsibleSection id="coordinates" title="提供坐標" num={4} color="blue" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 核心概念</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>提供坐標 ⇒ 代 <Latex math="(x, y)" /> 進方程找未知數</p>
              <p>⇒ check 哪一條方程對應相交坐標</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-green-700 mb-2">例：坐標 <Latex math="(4, 0)" /> → <span className="text-red-500">代 x = 4，y = 0</span></p>
            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="font-bold text-green-700 mb-1">穿過 ✓</p>
                <p>左方 = 右方</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <p className="font-bold text-red-700 mb-1">不穿過 ✗</p>
                <p>左方 ≠ 右方</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// 筆記內容映射
// ========================================
const NOTES_COMPONENTS = {
  'factorization': FactorizationNotes,
  'trig-identities': TrigonometricIdentitiesNotes,
  'quadrilateral': QuadrilateralNotes,
  'quadratic-equation': QuadraticEquationNotes,
  'remainder-factor': RemainderFactorNotes,
  'variation': VariationNotes,
  'simultaneous-eq': SimEqCalculatorNotes,
  'approximation': ApproximationNotes,
  'functions': FunctionNotes,
};

// ========================================
// Notes 主頁面
// ========================================
const Notes = () => {
  const [selectedLevel, setSelectedLevel] = useState('F1');
  const [expandedTopics, setExpandedTopics] = useState({});
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeSubtopic, setActiveSubtopic] = useState(null);

  const levels = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', '高中甲(一)'];
  const notes = getNotesForLevel(selectedLevel);

  // 當切換級別時，自動選第一個 topic 及 subtopic，但目錄保持收起
  useEffect(() => {
    const levelNotes = getNotesForLevel(selectedLevel);
    if (levelNotes.length > 0) {
      const firstTopic = levelNotes[0];
      setActiveTopic(firstTopic.id);
      setActiveSubtopic(firstTopic.subtopics.length > 0 ? firstTopic.subtopics[0].id : null);
      // 所有topic預設收起
      const expanded = {};
      levelNotes.forEach(t => { expanded[t.id] = false; });
      setExpandedTopics(expanded);
    } else {
      setActiveTopic(null);
      setActiveSubtopic(null);
      setExpandedTopics({});
    }
  }, [selectedLevel]);

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const selectTopic = (topicId) => {
    setActiveTopic(topicId);
    const topic = notes.find(t => t.id === topicId);
    setActiveSubtopic(topic && topic.subtopics.length > 0 ? topic.subtopics[0].id : null);
    setExpandedTopics(prev => ({ ...prev, [topicId]: true }));
  };

  const selectSubtopic = (topicId, subId) => {
    setActiveTopic(topicId);
    setActiveSubtopic(subId);
    setExpandedTopics(prev => ({ ...prev, [topicId]: true }));
  };

  // 跨主題導航 (e.g. 變分 → Prog 01)
  const navigateTo = (level, topicId, subId) => {
    setSelectedLevel(level);
    setTimeout(() => {
      setActiveTopic(topicId);
      setActiveSubtopic(subId);
      setExpandedTopics(prev => ({ ...prev, [topicId]: true }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const ActiveComponent = activeTopic ? NOTES_COMPONENTS[activeTopic] : null;

  const colorMap = {
    purple: { activeBg: 'bg-purple-100', activeText: 'text-purple-700', activeBorder: 'border-purple-500', numActive: 'bg-purple-500 text-white', numInactive: 'bg-purple-100 text-purple-600' },
    blue: { activeBg: 'bg-blue-100', activeText: 'text-blue-700', activeBorder: 'border-blue-500', numActive: 'bg-blue-500 text-white', numInactive: 'bg-blue-100 text-blue-600' },
    green: { activeBg: 'bg-green-100', activeText: 'text-green-700', activeBorder: 'border-green-500', numActive: 'bg-green-500 text-white', numInactive: 'bg-green-100 text-green-600' },
    red: { activeBg: 'bg-red-100', activeText: 'text-red-700', activeBorder: 'border-red-500', numActive: 'bg-red-500 text-white', numInactive: 'bg-red-100 text-red-600' },
    teal: { activeBg: 'bg-teal-100', activeText: 'text-teal-700', activeBorder: 'border-teal-500', numActive: 'bg-teal-500 text-white', numInactive: 'bg-teal-100 text-teal-600' },
    orange: { activeBg: 'bg-orange-100', activeText: 'text-orange-700', activeBorder: 'border-orange-500', numActive: 'bg-orange-500 text-white', numInactive: 'bg-orange-100 text-orange-600' },
    indigo: { activeBg: 'bg-indigo-100', activeText: 'text-indigo-700', activeBorder: 'border-indigo-500', numActive: 'bg-indigo-500 text-white', numInactive: 'bg-indigo-100 text-indigo-600' },
  };

  // 目錄渲染 helper
  const renderTOC = (isMobile = false) => {
    if (notes.length === 0) return <p className="text-sm text-slate-400 text-center py-4">暫無筆記</p>;

    return (
      <nav className="space-y-1">
        {notes.map((topic) => {
          const isExpanded = expandedTopics[topic.id];
          const isActive = activeTopic === topic.id;
          const tc = colorMap[topic.color] || colorMap.blue;

          return (
            <div key={topic.id}>
              <button
                onClick={() => { 
                  if (isActive && isExpanded) {
                    toggleTopic(topic.id);
                  } else {
                    selectTopic(topic.id);
                  }
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-2 text-sm font-bold ${
                  isActive ? `${tc.activeBg} ${tc.activeText}` : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                <span className="truncate">{topic.topic}</span>
              </button>
              {isExpanded && (
                <div className={`${isMobile ? 'ml-5' : 'ml-4'} mt-1 space-y-1`}>
                  {topic.subtopics.map((sub) => {
                    const sc = colorMap[sub.color] || colorMap.blue;
                    const isSubActive = activeTopic === topic.id && activeSubtopic === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => selectSubtopic(topic.id, sub.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                          isSubActive
                            ? `${sc.activeBg} ${sc.activeText} font-bold border-l-4 ${sc.activeBorder}`
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${isSubActive ? sc.numActive : sc.numInactive}`}>
                          {sub.num}
                        </span>
                        <span className="truncate">{sub.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 頂部導航 */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <HomeIcon className="w-5 h-5" />
            <span className="text-sm font-medium">返回主頁</span>
          </Link>
          <div className="text-indigo-600">
            <span className="font-bold text-lg">電子筆記 (測試編輯中)</span>
          </div>
          <div className="w-24" />
        </div>
      </div>

      {/* 級別選擇 */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <div className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-500 font-medium mr-2">級別：</span>
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedLevel === level
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* 左側目錄 */}
        <aside className="hidden md:block w-72 flex-shrink-0">
          <div className="sticky top-20 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <h3 className="font-bold text-slate-700 mb-4">
                目錄
              </h3>
              {renderTOC(false)}
            </div>
          </div>
        </aside>

        {/* 右側內容 */}
        <main className="flex-1 p-4 min-w-0">
          {/* 手機版目錄 */}
          <div className="md:hidden mb-4">
            <div className="bg-white rounded-xl shadow-sm p-3">
              <h3 className="font-bold text-slate-700 mb-2 text-sm">
                目錄
              </h3>
              {renderTOC(true)}
            </div>
          </div>

          {/* Notes 內容 */}
          {ActiveComponent ? (
            <ActiveComponent activeSub={activeSubtopic} onNavigate={navigateTo} />
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <h2 className="text-xl font-bold text-slate-400 mb-2">
                {notes.length === 0 ? '此級別暫無筆記' : '請從左側目錄選擇主題'}
              </h2>
              <p className="text-slate-400">
                {notes.length === 0 ? '筆記將會陸續加入，敬請期待！' : '點擊主題開始閱讀'}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Notes;
