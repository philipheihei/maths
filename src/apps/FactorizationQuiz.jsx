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

// 混合文字+LaTeX 渲染（以 $...$ 標記 LaTeX 部分）
const StepText = ({ text }) => {
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
// 虛擬鍵盤（因式分解專用）
// ========================================
const FactorizationKeyboard = ({ onInput, onDelete, onSubmit, disabled, questionVars = [] }) => {
  const KEY = `h-11 rounded-lg font-medium text-base flex items-center justify-center select-none transition-all shadow-[0_2px_0_0_rgba(0,0,0,0.12)] active:shadow-none active:translate-y-[1px] border`;
  const NUM = `${KEY} bg-white text-slate-700 border-slate-200`;
  const VAR = `${KEY} bg-blue-50 text-blue-700 border-blue-200 font-mono italic text-lg`;
  const OP  = `${KEY} bg-slate-100 text-slate-600 border-slate-200`;
  const DEL = `${KEY} bg-red-50 text-red-500 border-red-100`;

  // 只顯示題目中出現的 variable（最多5個，但目前題目最多3個）
  const vars = questionVars.slice(0, 5);

  return (
    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mt-3">
      {/* Variable row — 只顯示題目 variable */}
      {vars.length > 0 && (
        <div className="grid grid-cols-5 gap-1.5 mb-1.5">
          {vars.map(v => (
            <button key={v} onClick={() => onInput(v)} disabled={disabled} className={VAR}>{v}</button>
          ))}
          {/* 剩餘空位填空白佔位 */}
          {Array.from({ length: 5 - vars.length }).map((_, i) => (
            <div key={`sp-${i}`} />
          ))}
        </div>
      )}
      {/* 7 8 9 + DEL */}
      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        {[7, 8, 9].map(n => <button key={n} onClick={() => onInput(String(n))} disabled={disabled} className={NUM}>{n}</button>)}
        <button onClick={() => onInput('+')} disabled={disabled} className={OP}>+</button>
        <button onClick={onDelete} disabled={disabled} className={DEL}>DEL</button>
      </div>
      {/* 4 5 6 − x² */}
      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        {[4, 5, 6].map(n => <button key={n} onClick={() => onInput(String(n))} disabled={disabled} className={NUM}>{n}</button>)}
        <button onClick={() => onInput('-')} disabled={disabled} className={OP}>−</button>
        <button onClick={() => onInput('^2')} disabled={disabled} className={OP}>x²</button>
      </div>
      {/* 1 2 3 ( ) */}
      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        {[1, 2, 3].map(n => <button key={n} onClick={() => onInput(String(n))} disabled={disabled} className={NUM}>{n}</button>)}
        <button onClick={() => onInput('(')} disabled={disabled} className={OP}>(</button>
        <button onClick={() => onInput(')')} disabled={disabled} className={OP}>)</button>
      </div>
      {/* 0 (寬) + 提交 */}
      <div className="grid grid-cols-5 gap-1.5">
        <button onClick={() => onInput('0')} disabled={disabled} className={`${NUM} col-span-4`}>0</button>
        <button onClick={onSubmit} disabled={disabled} className={`${KEY} bg-blue-500 text-white border-blue-600`}>↵</button>
      </div>
    </div>
  );
};

// ========================================
// 教學筆記頁面
// ========================================
const TeachingPage = ({ onStartQuiz }) => {
  const [activeSection, setActiveSection] = useState(1);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  const scrollToSection = (sectionNum) => {
    setActiveSection(sectionNum);
    const refs = { 1: section1Ref, 2: section2Ref, 3: section3Ref, 4: section4Ref };
    refs[sectionNum]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 監聽滾動以更新目錄高亮
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: section1Ref, num: 1 },
        { ref: section2Ref, num: 2 },
        { ref: section3Ref, num: 3 },
        { ref: section4Ref, num: 4 }
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
    { num: 1, title: '提取公因式', color: 'purple' },
    { num: 2, title: '併項法', color: 'blue' },
    { num: 3, title: '二次多項式', color: 'green' },
    { num: 4, title: 'DSE 題型技巧', color: 'red' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      {/* 頂部導航 */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <HomeIcon className="w-5 h-5" />
            <span className="text-sm font-medium">返回主頁</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-purple-600">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">教學筆記</span>
            </div>
            <button
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow hover:from-purple-600 hover:to-indigo-600 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              開始測驗
            </button>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* 左側目錄 - 固定位置 */}
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
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      activeSection === item.num
                        ? `bg-${item.color}-500 text-white`
                        : `bg-${item.color}-100 text-${item.color}-600`
                    }`}>
                      {item.num}
                    </span>
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* 右側內容 - 所有 Notes 顯示 */}
        <main className="flex-1 p-4 min-w-0">
          {/* 標題 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-purple-500">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-slate-800">因式分解</h1>
            </div>
            <p className="text-slate-600">掌握三大因式分解技巧：提取公因式、併項法、二次多項式</p>
          </div>

          {/* 重點提示 */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 font-bold text-center text-lg">
              📌 答案一定有括號！
            </p>
          </div>

          {/* Section 1: 提取公因式 */}
          <div ref={section1Ref} className="bg-white rounded-2xl shadow-lg p-6 mb-6 scroll-mt-24">
            <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2 mb-4">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">1</span>
              提取公因式
            </h2>

            <div className="space-y-4">
              {/* 分析題目 */}
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
                      <span className="bg-yellow-200 px-2 py-0.5 rounded">黃</span>
                      <span>= 完全相同的代數</span>
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

              {/* 技巧提示 */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">💡 技巧</h3>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• 先找<span className="text-red-600 font-bold">數字</span>的公因數</li>
                  <li>• 再找<span className="text-blue-600 font-bold">代數</span>的公因式（取最低次方）</li>
                  <li>• 記住：<Latex math="a^3 \div a = a^2" />（次方相減）</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: 併項法 */}
          <div ref={section2Ref} className="bg-white rounded-2xl shadow-lg p-6 mb-6 scroll-mt-24">
            <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">2</span>
              併項法（分組因式分解）
            </h2>

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
                <div className="space-y-1">
                  <Latex math="\begin{aligned} &(2x-5) - (2x-5)y \\ &= (2x-5)(1-y) \end{aligned}" block />
                </div>
                <p className="text-sm text-slate-500 mt-2">💡 抽相同括號放前，剩餘部分放後括號</p>
              </div>
            </div>
          </div>

          {/* Section 3: 二次多項式 */}
          <div ref={section3Ref} className="bg-white rounded-2xl shadow-lg p-6 mb-6 scroll-mt-24">
            <h2 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">3</span>
              二次多項式（十字相乘法 / FMLA 01）
            </h2>

            <div className="space-y-4">
              {/* 計算機方法 */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-bold text-green-800 mb-3">🖩 計算機 FMLA 01 方法</h3>
                <p className="text-sm text-slate-700 mb-3">
                  如沒相同代數/因數，出動 <span className="bg-green-200 px-2 py-0.5 rounded font-mono">FMLA 01</span>（二次方）
                </p>
                
                <div className="bg-white rounded-lg p-3 mb-3">
                  <p className="text-sm font-bold text-slate-700 mb-2">步驟：</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">1</span>
                      <span>開啟 FMLA 01（按 FMLA 輸入 01）</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">2</span>
                      <span>輸入 a, b, c（如 <Latex math="8x^2 - 17x + 21" />：輸入 8, -17, 21）</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">3</span>
                      <span>按 EXE 得出兩個答案</span>
                    </div>
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
                  <p className="text-center mt-4 font-bold text-green-700 text-base">
                    ∴ 答案 <Latex math="= (x-3)(8x+7)" />
                  </p>
                </div>
              </div>

              {/* 次序調動 */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-3">⚠️ 次序調動</h3>
                <p className="text-sm text-slate-700 mb-2">
                  十字相乘法 / FMLA 01 需以 <Latex math="ax^2 + bx + c" /> 形式才能計算正確
                </p>
                
                <div className="bg-white rounded-lg p-3 mb-2">
                  <p className="text-sm text-slate-600 mb-1">例子 1：調動次序</p>
                  <Latex math="\begin{aligned} &50 - 15m + m^2 \\ &= m^2 - 15m + 50 \end{aligned}" block />
                  <p className="text-xs text-slate-500">以 2次方/1次方/0次方(沒代數) 順序作調動</p>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-slate-600 mb-1">例子 2：<Latex math="a^2" /> 係數需是正數</p>
                  <div className="space-y-1">
                    <Latex math="\begin{aligned} &36 + 5a - a^2 \\ &= -a^2 + 5a + 36 \\ &= -(a^2 - 5a - 36) \\ &= -(a-9)(a+4) \end{aligned}" block />
                  </div>
                  <p className="text-xs text-red-500 mt-2">⚠️ 若沒有抽負，因式分解答案會錯！</p>
                </div>
              </div>

              {/* 二元二次 */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3">📐 二元二次多項式</h3>
                <p className="text-sm text-slate-700 mb-2">
                  形式：<Latex math="ax^2 + bxy + cy^2" />
                </p>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-2">💡 方法：先當只有前面的代數 x 用FMLA01去組成括號，最後再在每個括號後補上後面的代數 y</p>
                  <p className="text-sm text-slate-600 mb-1">例子：</p>
                  <Latex math="\begin{aligned} &6r^2 - 13rs - 28s^2 \\ &= (2r-7s)(3r+4s) \end{aligned}" block />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: DSE 題型 */}
          <div ref={section4Ref} className="bg-white rounded-2xl shadow-lg p-6 mb-6 scroll-mt-24">
            <h2 className="text-xl font-bold text-red-700 flex items-center gap-2 mb-4">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">4</span>
              DSE 題型技巧
            </h2>

            <div className="space-y-4">
              {/* 題型1: 利用前題 */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-3">📋 利用前題答案</h3>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-slate-600 mb-3">DSE 常見：(a) 和 (b) 有關聯</p>
                  
                  {/* 題目 */}
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-slate-700">(a)</span>
                      <span>因式分解 <span className="bg-yellow-200 px-1 rounded"><Latex math="6r^2 - 13rs - 28s^2" /></span></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-slate-700">(b)</span>
                      <span>因式分解 <Latex math="4r - 14s +" /> <span className="bg-yellow-200 px-1 rounded"><Latex math="6r^2 - 13rs - 28s^2" /></span></span>
                    </div>
                  </div>

                  {/* 答案 */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-3">
                    <p className="text-sm font-bold text-green-700 mb-1">📝 (a) 部答案：</p>
                    <Latex math="(2r-7s)(3r+4s)" block />
                  </div>

                  {/* 解題步驟 */}
                  <div className="bg-yellow-50 p-2 rounded">
                    <p className="text-slate-700 text-sm">
                      ➜ 找 (a) 題目部分（黃色 highlight），套用 (a) 部答案：
                    </p>
                    <Latex math="\begin{aligned} &= 4r - 14s + (2r-7s)(3r+4s) \\ &= 2(2r-7s) + (2r-7s)(3r+4s) \\ &= (2r-7s)(2 + 3r + 4s) \end{aligned}" block />
                  </div>
                </div>
              </div>

              {/* 題型2: 問特定因式 */}
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-bold text-orange-800 mb-3">❓ 問特定因式（MC 限定）</h3>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-slate-600 mb-2">例：下列何者是 <Latex math="4x^2 + 2x - 12" /> 的因式？</p>
                  <div className="ml-4 text-sm space-y-1">
                    <p>I. 2</p>
                    <p>II. 2x - 3</p>
                    <p>III. x - 2</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded mt-3">
                    <p className="text-sm">
                      <span className="font-bold">①</span> 先因式分解：<Latex math="2(2x^2 + x - 6) = 2(2x-3)(x+2)" />
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-bold">②</span> 因式即問有哪個括號 → 2 / (2x-3) → 選項 I + II
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 開始測驗按鈕 - 底部 */}
          <div className="text-center pb-8">
            <button
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <GraduationCap className="w-6 h-6" />
              開始測驗
              <ArrowRight className="w-6 h-6" />
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
  const [quizType, setQuizType] = useState(null);
  const [level, setLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState({ type: 'neutral', msg: '' });
  const [levelData, setLevelData] = useState({
    common: { 1: { score: 0, total: 0 }, 2: { score: 0, total: 0 } },
    grouping: { 1: { score: 0, total: 0 } },
    quadratic: { 1: { score: 0, total: 0 }, 2: { score: 0, total: 0 } }
  });
  const [isAnswered, setIsAnswered] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const inputRef = useRef(null);

  // =====================
  // 提取公因式題目生成
  // =====================
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const c1 = (n) => n === 1 ? '' : String(n); // 係數1省略

  const generateCommonFactorQuestion = (lv = 1) => {
    if (lv === 1) {
      // LV1: 單一公因式
      const scenarios = [
        // 數字公因式
        () => {
          const factor = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
          // 確保 a 和 b 互質，使 factor 是最大公因數
          let a, b;
          do {
            a = Math.floor(Math.random() * 5) + 1;
            b = Math.floor(Math.random() * 5) + 1;
          } while (gcd(a, b) !== 1);
          const vars = ['x', 'y', 'm', 'n', 'a', 'b'];
          const v1 = vars[Math.floor(Math.random() * vars.length)];
          const v2 = vars.filter(v => v !== v1)[Math.floor(Math.random() * (vars.length - 1))];
          const sign = Math.random() > 0.5 ? '+' : '-';
          const aStr = c1(a);
          const bStr = c1(b);
          return {
            question: `${factor * a}${v1} ${sign} ${factor * b}${v2}`,
            answer: `${factor}(${aStr}${v1} ${sign} ${bStr}${v2})`,
            answerAlt: [`${factor}(${aStr}${v1}${sign}${bStr}${v2})`],
            hint: `找出 ${factor * a} 和 ${factor * b} 的公因數`,
            steps: [
              `找出 $${factor * a}$ 和 $${factor * b}$ 的最大公因數：$${factor}$`,
              `$${factor * a}${v1} \\div ${factor} = ${aStr}${v1}$，$${factor * b}${v2} \\div ${factor} = ${bStr}${v2}$`,
              `$${factor * a}${v1} ${sign} ${factor * b}${v2} = ${factor}(${aStr}${v1} ${sign} ${bStr}${v2})$`
            ],
            vars: [v1, v2]
          };
        },
        // 代數公因式
        () => {
          const vars = ['a', 'b', 'c', 'p', 'q', 'r'];
          const common = vars[Math.floor(Math.random() * vars.length)];
          const v1 = vars.filter(v => v !== common)[Math.floor(Math.random() * (vars.length - 1))];
          const v2 = vars.filter(v => v !== common && v !== v1)[Math.floor(Math.random() * (vars.length - 2))];
          const sign = Math.random() > 0.5 ? '+' : '-';
          return {
            question: `${common}${v1} ${sign} ${common}${v2}`,
            answer: `${common}(${v1} ${sign} ${v2})`,
            answerAlt: [`${common}(${v1}${sign}${v2})`],
            hint: `${common} 是公因式`,
            steps: [
              `公因式是 $${common}$`,
              `$${common}${v1} \\div ${common} = ${v1}$，$${common}${v2} \\div ${common} = ${v2}$`,
              `$${common}${v1} ${sign} ${common}${v2} = ${common}(${v1} ${sign} ${v2})$`
            ],
            vars: [common, v1, v2]
          };
        },
        // 負號公因式
        () => {
          const vars = ['a', 'b', 'c', 'm', 'n'];
          const common = vars[Math.floor(Math.random() * vars.length)];
          const v1 = vars.filter(v => v !== common)[0];
          const v2 = vars.filter(v => v !== common && v !== v1)[0];
          return {
            question: `-${common}${v1} - ${common}${v2}`,
            answer: `-${common}(${v1} + ${v2})`,
            answerAlt: [`-${common}(${v1}+${v2})`],
            hint: `抽出 -${common}`,
            steps: [
              `負號公因式：$-${common}$`,
              `$-${common}${v1} \\div (-${common}) = ${v1}$，$-${common}${v2} \\div (-${common}) = ${v2}$`,
              `$-${common}${v1} - ${common}${v2} = -${common}(${v1} + ${v2})$`
            ],
            vars: [common, v1, v2]
          };
        }
      ];
      return scenarios[Math.floor(Math.random() * scenarios.length)]();
    } else {
      // LV2: 多個公因式 / 次方
      const scenarios = [
        // 數字 + 代數公因式
        () => {
          const factor = [2, 3, 7][Math.floor(Math.random() * 3)];
          let a, b;
          do {
            a = Math.floor(Math.random() * 4) + 1;
            b = Math.floor(Math.random() * 4) + 1;
          } while (gcd(a, b) !== 1);
          const common = ['p', 'q', 'r', 's'][Math.floor(Math.random() * 4)];
          const v1 = ['m', 'n', 'x', 'y'][Math.floor(Math.random() * 4)];
          const sign = Math.random() > 0.5 ? '+' : '-';
          const innerSign = sign === '+' ? '-' : '+';
          const aStr = c1(a); // 係數1省略（前面有代數）
          const bStr = String(b); // 純數字不省略1
          return {
            question: `-${factor * a}${common}${v1} ${sign} ${factor * b}${common}`,
            answer: `-${factor}${common}(${aStr}${v1} ${innerSign} ${bStr})`,
            answerAlt: [`-${factor}${common}(${aStr}${v1}${innerSign}${bStr})`],
            hint: `公因式是 -${factor}${common}`,
            steps: [
              `公因式是 $-${factor}${common}$`,
              `$-${factor * a}${common}${v1} \\div (-${factor}${common}) = ${aStr}${v1}$`,
              `$${sign === '+' ? '' : '-'}${factor * b}${common} \\div (-${factor}${common}) = ${sign === '+' ? '-' : ''}${bStr}$`,
              `$= -${factor}${common}(${aStr}${v1} ${innerSign} ${bStr})$`
            ],
            vars: [common, v1]
          };
        },
        // 次方抽取
        () => {
          const base = ['r', 's', 'm', 'n'][Math.floor(Math.random() * 4)];
          const coef1 = [2, 3, 6][Math.floor(Math.random() * 3)];
          const coef2 = coef1 * 2;
          const var2 = ['s', 't', 'x', 'y'].filter(v => v !== base)[0];
          return {
            question: `${coef1}${base}^3 - ${coef2}${base}^2${var2}`,
            answer: `${coef1}${base}^2(${base} - 2${var2})`,
            answerAlt: [`${coef1}${base}²(${base}-2${var2})`],
            hint: `抽出 ${coef1}${base}²`,
            steps: [
              `公因式是 $${coef1}${base}^2$`,
              `$${coef1}${base}^3 \\div ${coef1}${base}^2 = ${base}$`,
              `$${coef2}${base}^2${var2} \\div ${coef1}${base}^2 = 2${var2}$`,
              `$${coef1}${base}^3 - ${coef2}${base}^2${var2} = ${coef1}${base}^2(${base} - 2${var2})$`
            ],
            vars: [base, var2]
          };
        }
      ];
      return scenarios[Math.floor(Math.random() * scenarios.length)]();
    }
  };

  // =====================
  // 併項法題目生成
  // =====================
  const generateGroupingQuestion = () => {
    const scenarios = [
      // 標準四項
      () => {
        const vars = ['m', 'n', 'p', 'q', 'x', 'y'];
        const a = vars[Math.floor(Math.random() * vars.length)];
        const b = vars.filter(v => v !== a)[Math.floor(Math.random() * (vars.length - 1))];
        const c1 = ['a', 'b', 'c'][Math.floor(Math.random() * 3)];
        const c2 = Math.floor(Math.random() * 8) + 2;
        return {
          question: `${c1}${a} + ${c1}${b} + ${c2}${a} + ${c2}${b}`,
          answer: `(${a} + ${b})(${c1} + ${c2})`,
          answerAlt: [`(${a}+${b})(${c1}+${c2})`, `(${c1}+${c2})(${a}+${b})`],
          hint: `先分組：${c1}(${a}+${b}) + ${c2}(${a}+${b})`,
          steps: [
            `分組：$(${c1}${a} + ${c1}${b}) + (${c2}${a} + ${c2}${b})$`,
            `$= ${c1}(${a} + ${b}) + ${c2}(${a} + ${b})$`,
            `取出公因式 $(${a} + ${b})$`,
            `$= (${a} + ${b})(${c1} + ${c2})$`
          ],
          vars: [a, b, c1]
        };
      },
      // 已有括號
      () => {
        const a = Math.floor(Math.random() * 4) + 2;
        const b = Math.floor(Math.random() * 6) + 2;
        const v = ['x', 'a', 'b', 'm'][Math.floor(Math.random() * 4)];
        const sign = Math.random() > 0.5 ? '+' : '-';
        return {
          question: `(${a}${v} ${sign} ${b}) - (${a}${v} ${sign} ${b})y`,
          answer: `(${a}${v} ${sign} ${b})(1 - y)`,
          answerAlt: [`(${a}${v}${sign}${b})(1-y)`],
          hint: `抽出共同括號 (${a}${v} ${sign} ${b})`,
          steps: [
            `$(${a}${v} ${sign} ${b})$ 是公因式`,
            `$= (${a}${v} ${sign} ${b}) \\cdot 1 - (${a}${v} ${sign} ${b}) \\cdot y$`,
            `$= (${a}${v} ${sign} ${b})(1 - y)$`
          ],
          vars: [v, 'y']
        };
      }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)]();
  };

  // =====================
  // 二次多項式題目生成
  // =====================
  const generateQuadraticQuestion = (lv = 1) => {
    if (lv === 1) {
      // LV1: 一元二次 ax² + bx + c
      const scenarios = [
        // a = 1
        () => {
          const validRange = [-4, -3, -2, -1, 1, 2, 3, 4];
          const r1 = validRange[Math.floor(Math.random() * validRange.length)];
          const r2 = validRange[Math.floor(Math.random() * validRange.length)];
          const b = -(r1 + r2);
          const c = r1 * r2;
          const v = ['x', 'y', 'a', 'm'][Math.floor(Math.random() * 4)];
          const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}${v}` : ` - ${Math.abs(b)}${v}`);
          const cStr = c === 0 ? '' : (c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`);
          
          const ans1 = r1 > 0 ? `(${v}-${r1})` : `(${v}+${Math.abs(r1)})`;
          const ans2 = r2 > 0 ? `(${v}-${r2})` : `(${v}+${Math.abs(r2)})`;
          
          const answerAlt = [];
          answerAlt.push(`${ans2}${ans1}`);
          answerAlt.push(`${ans1}${ans2}`.replace(/\s/g, ''));
          answerAlt.push(`${ans2}${ans1}`.replace(/\s/g, ''));
          answerAlt.push(`${ans1} ${ans2}`);
          answerAlt.push(`${ans2} ${ans1}`);
          
          return {
            question: `${v}^2${bStr}${cStr}`,
            answer: `${ans1}${ans2}`,
            answerAlt: answerAlt,
            hint: `找兩個數：相加得 ${b}，相乘得 ${c}`,
            steps: [
              `找兩數：相加得 $${b}$，相乘得 $${c}$`,
              `兩數為 $${-r1}$ 和 $${-r2}$（即根的相反數）`,
              `∴ $${v}^2${bStr}${cStr} = ${ans1}${ans2}$`
            ],
            vars: [v]
          };
        },
        // 平方差 a² - b²
        () => {
          const a = Math.floor(Math.random() * 6) + 2;
          const v = ['x', 'y', 'a', 'b'][Math.floor(Math.random() * 4)];
          return {
            question: `${v}^2 - ${a * a}`,
            answer: `(${v} + ${a})(${v} - ${a})`,
            answerAlt: [`(${v}-${a})(${v}+${a})`],
            hint: `這是平方差：a² - b² = (a+b)(a-b)`,
            steps: [
              `平方差公式：$a^2 - b^2 = (a+b)(a-b)$`,
              `$${v}^2 - ${a * a} = ${v}^2 - ${a}^2$`,
              `$= (${v}+${a})(${v}-${a})$`
            ],
            vars: [v]
          };
        }
      ];
      return scenarios[Math.floor(Math.random() * scenarios.length)]();
    } else {
      // LV2: 二元二次 ax² + bxy + cy²
      const scenarios = [
        () => {
          const v1 = 'r';
          const v2 = 's';
          // 簡單例子
          const pairs = [
            { a: 2, b: -7, c: 3, d: 4, ans: `(2${v1}-7${v2})(3${v1}+4${v2})`, fmla: [6, -13, -28] },
            { a: 1, b: -3, c: 2, d: 5, ans: `(${v1}-3${v2})(2${v1}+5${v2})`, fmla: [2, -1, -15] },
            { a: 3, b: 2, c: 1, d: -4, ans: `(3${v1}+2${v2})(${v1}-4${v2})`, fmla: [3, -10, -8] }
          ];
          const p = pairs[Math.floor(Math.random() * pairs.length)];
          const aCoef = p.a * p.c;
          const bCoef = p.a * p.d + p.b * p.c;
          const cCoef = p.b * p.d;
          
          const bStr = bCoef === 0 ? '' : (bCoef > 0 ? ` + ${bCoef}${v1}${v2}` : ` - ${Math.abs(bCoef)}${v1}${v2}`);
          const cStr = cCoef === 0 ? '' : (cCoef > 0 ? ` + ${cCoef}${v2}^2` : ` - ${Math.abs(cCoef)}${v2}^2`);
          
          // 生成替代答案格式
          const answerAlt = [];
          // 分解 p.ans 來生成不同格式
          const parts = p.ans.match(/\([^)]+\)/g);
          if (parts && parts.length === 2) {
            answerAlt.push(`${parts[1]}${parts[0]}`); // 次序相反
            answerAlt.push(p.ans.replace(/\s/g, '')); // 無空格
            answerAlt.push(`${parts[1]}${parts[0]}`.replace(/\s/g, ''));
          }
          
          // 構建詳細提示
          const [fA, fB, fC] = p.fmla;
          const hint = `在 FMLA 01 輸入 ${fA} EXE ${fB} EXE ${fC} EXE。然後會顯示兩個答案，分數答案的分母放前、分子相反數放後；整數答案直接用相反數`;
          
          return {
            question: `${aCoef}${v1}^2${bStr}${cStr}`,
            answer: p.ans,
            answerAlt: answerAlt,
            hint: hint,
            steps: [
              `用 FMLA 01 輸入 $a=${fA},\\ b=${fB},\\ c=${fC}$`,
              `得出兩根後轉換成括號形式`,
              `∴ $${aCoef}${v1}^2${bStr}${cStr} = ${p.ans}$`
            ],
            vars: [v1, v2]
          };
        }
      ];
      return scenarios[0]();
    }
  };

  // 開始測驗（選擇類型）
  const selectQuizType = (type) => {
    setQuizType(type);
    // 對於只有一個等級的類型，直接開始
    if (type === 'grouping') {
      setLevel(1);
      generateNewQuestion(type, 1);
    }
  };

  // 選擇等級並開始
  const startQuiz = (lv) => {
    setLevel(lv);
    generateNewQuestion(quizType, lv);
  };

  const generateNewQuestion = (type, lv) => {
    let question;
    switch (type) {
      case 'common':
        question = generateCommonFactorQuestion(lv);
        break;
      case 'grouping':
        question = generateGroupingQuestion();
        break;
      case 'quadratic':
        question = generateQuadraticQuestion(lv);
        break;
      default:
        question = generateCommonFactorQuestion(lv);
    }
    setCurrentQuestion(question);
    setUserAnswer('');
    setFeedback({ type: 'neutral', msg: '' });
    setIsAnswered(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 正規化答案（移除空格、統一符號、處理係數1省略）
  const normalizeAnswer = (ans) => {
    return ans
      .replace(/\s+/g, '')
      .replace(/²/g, '^2')
      .replace(/³/g, '^3')
      .toLowerCase()
      .replace(/\(1([a-z])/g, '($1')  // 括號內 1y → y
      .replace(/([+\-])1([a-z])/g, '$1$2')  // +1y 或 -1y → +y 或 -y
      .replace(/^1([a-z])/g, '$1'); // 開頭的 1y → y
  };

  // 提交答案
  const handleSubmit = () => {
    if (!userAnswer.trim() || isAnswered) return;

    const normalized = normalizeAnswer(userAnswer);
    const correctNormalized = normalizeAnswer(currentQuestion.answer);
    const altCorrect = currentQuestion.answerAlt?.some(alt => normalizeAnswer(alt) === normalized);

    const isCorrect = normalized === correctNormalized || altCorrect;

    setIsAnswered(true);

    if (isCorrect) {
      setLevelData(prev => ({
        ...prev,
        [quizType]: {
          ...prev[quizType],
          [level]: {
            score: prev[quizType][level].score + 1,
            total: prev[quizType][level].total + 1
          }
        }
      }));
      setFeedback({ type: 'correct', msg: '答案正確！', answer: currentQuestion.answer, steps: currentQuestion.steps });
    } else {
      setLevelData(prev => ({
        ...prev,
        [quizType]: {
          ...prev[quizType],
          [level]: {
            ...prev[quizType][level],
            total: prev[quizType][level].total + 1
          }
        }
      }));
      setFeedback({ 
        type: 'incorrect', 
        msg: `答案是 ${currentQuestion.answer}`,
        hint: currentQuestion.hint,
        answer: currentQuestion.answer,
        steps: currentQuestion.steps
      });
    }
  };

  // 下一題
  const handleNext = () => {
    generateNewQuestion(quizType, level);
  };

  // 返回選擇頁面
  const backToSelection = () => {
    setQuizType(null);
    setCurrentQuestion(null);
    setLevel(1);
  };

  // 返回等級選擇（對於有多等級的類型）
  const backToLevelSelection = () => {
    setCurrentQuestion(null);
    setLevel(1);
  };

  // 獲取當前分數
  const getCurrentScore = () => {
    if (!quizType) return { score: 0, total: 0 };
    return levelData[quizType][level] || { score: 0, total: 0 };
  };

  // 測驗類型選擇界面（第一層）
  if (!quizType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-4">
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

          <h1 className="text-2xl font-bold text-center text-slate-800 mb-4">選擇測驗類型</h1>
          
          {/* 重點提示 */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
            <p className="text-red-700 font-bold text-center">
              📌 因式分解重點：答案一定有括號！
            </p>
          </div>

          <div className="grid gap-4">
            {/* 提取公因式 */}
            <button
              onClick={() => selectQuizType('common')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-purple-400 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-4 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">提取公因式</h2>
                  <p className="text-slate-600 text-sm">抽取共同因數</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </button>

            {/* 併項法 */}
            <button
              onClick={() => selectQuizType('grouping')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-blue-400 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <Calculator className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">併項法</h2>
                  <p className="text-slate-600 text-sm">分組因式分解</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>

            {/* 二次多項式 */}
            <button
              onClick={() => selectQuizType('quadratic')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-green-400 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">二次多項式</h2>
                  <p className="text-slate-600 text-sm">十字相乘法 / FMLA 01</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-green-600 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 等級選擇界面（第二層，對於有多個等級的類型）
  if (!currentQuestion && quizType !== 'grouping') {
    const typeConfig = {
      common: {
        title: '提取公因式',
        color: 'purple',
        levels: [
          { lv: 1, label: 'LV1 單一公因式', desc: '抽一個數字或代數' },
          { lv: 2, label: 'LV2 多個/次方', desc: '抽多個公因式或次方' }
        ]
      },
      quadratic: {
        title: '二次多項式',
        color: 'green',
        levels: [
          { lv: 1, label: 'LV1 一元二次', desc: 'ax² + bx + c' },
          { lv: 2, label: 'LV2 二元二次', desc: 'ax² + bxy + cy²' }
        ]
      }
    };

    const config = typeConfig[quizType];

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={backToSelection}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回選擇</span>
            </button>
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
              <HomeIcon className="w-5 h-5" />
              <span className="text-sm font-medium">主頁</span>
            </Link>
          </div>

          <div className={`bg-${config.color}-100 rounded-2xl p-6 mb-6`}>
            <h1 className={`text-2xl font-bold text-${config.color}-700 text-center`}>
              📐 {config.title}
            </h1>
          </div>

          {/* 重點提示 */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
            <p className="text-red-700 font-bold text-center">
              📌 答案一定有括號！
            </p>
          </div>

          <p className="text-center text-slate-600 mb-6">選擇難度等級</p>

          <div className="grid gap-4">
            {config.levels.map(lvl => (
              <button
                key={lvl.lv}
                onClick={() => startQuiz(lvl.lv)}
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-${config.color}-400 transition-all group text-left`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{lvl.label}</h2>
                    <p className="text-slate-600 text-sm">{lvl.desc}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      得分：{levelData[quizType][lvl.lv].score}/{levelData[quizType][lvl.lv].total}
                    </p>
                  </div>
                  <ArrowRight className={`w-6 h-6 text-slate-400 group-hover:text-${config.color}-600 transition-colors`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 測驗界面
  const quizTypeNames = {
    common: '提取公因式',
    grouping: '併項法',
    quadratic: '二次多項式'
  };

  const quizTypeColors = {
    common: 'purple',
    grouping: 'blue',
    quadratic: 'green'
  };

  const color = quizTypeColors[quizType];
  const currentScoreData = getCurrentScore();

  // 返回按鈕處理
  const handleBack = () => {
    if (quizType === 'grouping') {
      backToSelection();
    } else {
      backToLevelSelection();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 頂部導航 */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{quizType === 'grouping' ? '返回選擇' : '返回等級'}</span>
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
            📐 {quizTypeNames[quizType]} {quizType !== 'grouping' && level > 0 ? `LV${level}` : ''}
          </h2>
        </div>

        {/* 重點提示 */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-4">
          <p className="text-red-600 font-bold text-center text-sm">
            📌 答案一定有括號！
          </p>
        </div>

        {/* 題目卡片 */}
        {currentQuestion && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <p className="text-sm text-slate-500 mb-2">因式分解：</p>
            <div className="text-2xl text-center py-4 font-mono">
              <Latex math={currentQuestion.question} />
            </div>

            {/* 輸入區 */}
            <div className="flex flex-col gap-3 mb-4">
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (isAnswered ? handleNext() : handleSubmit())}
                placeholder="輸入答案，例如：(x+2)(x-3)"
                disabled={isAnswered}
                className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-lg focus:border-purple-500 focus:outline-none disabled:bg-gray-100 font-mono"
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
                  <span className={`font-bold ${
                    feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {feedback.type === 'correct' ? '正確！' : '不正確'}
                  </span>
                </div>
                {/* 答案（LaTeX 渲染） */}
                <div className={`flex items-center gap-2 text-sm ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                  <span className="font-medium">答案：</span>
                  <span className="font-mono"><Latex math={feedback.answer || ''} /></span>
                </div>
                {/* 解題步驟 */}
                {feedback.steps && feedback.steps.length > 0 && (
                  <div className={`mt-3 border-t pt-2 ${feedback.type === 'correct' ? 'border-green-300' : 'border-red-300'}`}>
                    <p className={`text-xs font-bold mb-1 ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>解題步驟：</p>
                    {feedback.steps.map((step, i) => (
                      <div key={i} className="mb-1">
                        <StepText text={step} className={`text-sm ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`} />
                      </div>
                    ))}
                  </div>
                )}
                {feedback.hint && (
                  <p className="text-red-600 text-sm mt-2 border-t border-red-200 pt-2">
                    💡 提示：{feedback.hint}
                  </p>
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
          <FactorizationKeyboard
            onInput={(val) => { if (!isAnswered) setUserAnswer(prev => prev + val); }}
            onDelete={() => { if (!isAnswered) setUserAnswer(prev => prev.slice(0, -1)); }}
            onSubmit={isAnswered ? handleNext : handleSubmit}
            disabled={false}
            questionVars={currentQuestion.vars || []}
          />
        )}

        {/* 筆記彈出框 */}
        {showNotes && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">📝 快速筆記</h3>
                <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="font-bold text-purple-700 mb-1">1. 提取公因式</p>
                  <p>找所有項共同的數字/代數，抽出來放前面</p>
                  <p className="text-slate-600 mt-1">例：<Latex math="6x + 6y = 6(x+y)" /></p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-bold text-blue-700 mb-1">2. 併項法</p>
                  <p>四項分兩組，各自提取公因式，找共同括號</p>
                  <p className="text-slate-600 mt-1">例：<Latex math="bm + bn + 5m + 5n = (m+n)(b+5)" /></p>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-bold text-green-700 mb-1">3. 二次多項式</p>
                  <p>用計算機 FMLA 01 找答案</p>
                  <p className="text-slate-600 mt-1">整數答案取相反數；分數答案分母放前、分子相反數放後</p>
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
const FactorizationQuiz = () => {
  const [currentPage, setCurrentPage] = useState('teaching');

  return currentPage === 'teaching' ? (
    <TeachingPage onStartQuiz={() => setCurrentPage('quiz')} />
  ) : (
    <QuizPage onBackToTeaching={() => setCurrentPage('teaching')} />
  );
};

export default FactorizationQuiz;
