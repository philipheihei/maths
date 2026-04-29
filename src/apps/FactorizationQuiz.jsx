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
const StepText = ({ text, className = 'text-sm text-slate-700 leading-relaxed' }) => {
  const parts = text.split(/(\$[^$]+\$|\[\[[^\]]+\]\])/g);
  const getKeyClass = (label) => {
    const normalized = label.replace(/\s+/g, '').toLowerCase();
    if (normalized === 'ab/c') {
      return 'bg-gray-500 text-white text-xs font-mono px-2 py-0.5 rounded';
    }
    return 'bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded';
  };

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          return <Latex key={i} math={part.slice(1, -1)} />;
        }
        if (part.startsWith('[[') && part.endsWith(']]')) {
          const label = part.slice(2, -2).trim();
          return (
            <span key={i} className="inline-block mx-0.5 align-middle">
              <span className={getKeyClass(label)}>{label}</span>
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
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
                <p className="text-sm text-slate-600 mb-3">例子 1：標準四項</p>
                <div className="space-y-2">
                  {/* Line 1: starting expression */}
                  <div className="flex items-center gap-2">
                    <div className="w-4 shrink-0" />
                    <div className="text-sm w-40 shrink-0"><Latex math="bm + bn + 5m + 5n" /></div>
                    <div className="text-xs text-slate-500 italic">← 通常出4個項，前2項找相同，後2項找相同</div>
                  </div>
                  {/* Line 2 */}
                  <div className="flex items-center gap-2">
                    <div className="w-4 shrink-0 text-right font-mono text-sm text-slate-700">=</div>
                    <div className="text-sm w-40 shrink-0"><Latex math="b(m+n) + 5(m+n)" /></div>
                    <div className="text-xs text-slate-500 italic">← 將相同括號抽出</div>
                  </div>
                  {/* Line 3 */}
                  <div className="flex items-center gap-2">
                    <div className="w-4 shrink-0 text-right font-mono text-sm text-slate-700">=</div>
                    <div className="text-sm w-40 shrink-0"><Latex math="(m+n)(b+5)" /></div>
                    <div className="text-xs text-slate-500 italic">← 不是相同括號的按順序放另一個括號</div>
                  </div>
                </div>
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
                  如二次多項式沒相同代數/因數，出動 <span className="bg-orange-500 text-white px-2 py-0.5 rounded font-mono">FMLA</span> 01
                </p>
                
                <div className="bg-white rounded-lg p-3 mb-3">
                  <p className="text-sm font-bold text-slate-700 mb-2">步驟：</p>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs shrink-0 mt-0.5">1</span>
                      <span>確保計算機在 COMP 模式：按 <span className="bg-gray-300 text-gray-800 text-xs font-mono px-2 py-0.5 rounded">MODE</span> <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">1</span></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs shrink-0 mt-0.5">2</span>
                      <span>開啟 FMLA 01：按 <span className="bg-orange-500 text-white text-xs font-mono px-2 py-0.5 rounded">FMLA</span> 然後輸入 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">0</span> <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">1</span> <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs shrink-0 mt-0.5">3</span>
                      <span>依次輸入 a <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>，b <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>，c <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs shrink-0 mt-0.5">4</span>
                      <span>顯示答案 1；再按 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> 顯示答案 2；<span className="text-orange-600 font-semibold">見到小數先按 <span className="bg-gray-500 text-white text-xs font-mono px-1.5 py-0.5 rounded">a b/c</span> 轉分數</span></span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <p className="text-base font-bold text-slate-700 mb-2">例子：<Latex math="8x^2 - 17x - 21" /></p>

                  {/* 輸入按鍵 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 mb-3">
                    <p className="text-xs text-slate-500 mb-1.5">按鍵步驟：</p>
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="bg-orange-500 text-white text-xs font-mono px-2 py-0.5 rounded">FMLA</span>
                      <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">0</span>
                      <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">1</span>
                      <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                      <span className="text-slate-400 mx-0.5">→</span>
                      <span className="text-xs text-slate-700 font-mono">8</span>
                      <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                      <span className="text-xs text-slate-700 font-mono">(−)17</span>
                      <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                      <span className="text-xs text-slate-700 font-mono">(−)21</span>
                      <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-center mb-2 text-base">答案 1（整數）</p>
                      <p className="text-center text-3xl font-mono mb-2">3</p>
                      <p className="text-center text-sm text-slate-600 mt-2">→ 相反數：-3</p>
                      <p className="text-center text-sm text-slate-600">→ 括號：<Latex math="(x-3)" /></p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-center mb-2 text-base">答案 2（小數）</p>
                      <p className="text-center text-3xl font-mono mb-1">-0.875</p>
                      <p className="text-center text-xs text-orange-600 font-semibold mb-1">按 <span className="bg-gray-500 text-white text-xs font-mono px-1.5 py-0.5 rounded">a b/c</span> 轉分數</p>
                      <p className="text-center text-sm text-slate-600">= <Latex math="-\frac{7}{8}" /></p>
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

                {/* 方法概覽 */}
                <div className="bg-white rounded-lg p-3 mb-3">
                  <p className="text-sm font-bold text-slate-700 mb-2">💡 方法（4步）：</p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex gap-2 items-start">
                      <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs font-bold shrink-0">1</span>
                      <span>暫時忽略第二個代數（s），只用第一個代數（r）的係數識別 a, b, c</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs font-bold shrink-0">2</span>
                      <span>用 FMLA 01 輸入 a, b, c，得兩個根</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs font-bold shrink-0">3</span>
                      <span>將每個根寫成分數 <Latex math="\frac{p}{q}" />，組成括號 <Latex math="(q \cdot r - p)" /></span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs font-bold shrink-0">4</span>
                      <span>在每個括號中，數字後面補上 s</span>
                    </div>
                  </div>
                </div>

                {/* 例子 */}
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-bold text-slate-700 mb-3">例子：<Latex math="6r^2 - 13rs - 28s^2" /></p>

                  {/* Step 2 (merged with Step 1) */}
                  <div className="mb-3 rounded-lg overflow-hidden border border-green-200">
                    <div className="bg-green-600 text-white text-xs font-bold px-3 py-1.5">Step 1　FMLA 01 輸入</div>
                    <div className="bg-green-50 px-3 py-2">
                      <div className="flex items-center gap-1 flex-wrap mb-1">
                        <span className="text-slate-600 text-xs">開啟：</span>
                        <span className="bg-orange-500 text-white text-xs font-mono px-2 py-0.5 rounded">FMLA</span>
                        <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">0</span>
                        <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">1</span>
                        <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                        <span className="text-slate-400 text-xs mx-1">｜</span>
                        <span className="text-slate-500 text-xs italic">(如按 FMLA 沒反應，先按</span>
                        <span className="bg-gray-300 text-gray-800 text-xs font-mono px-2 py-0.5 rounded">MODE</span>
                        <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">1</span>)
                      </div>
                      <div className="text-xs text-slate-600 mb-1 pl-1">
                        把 <Latex math="6r^2 - 13rs - 28s^2" /> 當作 <Latex math="6r^2 - 13r - 28" />
                      </div>
                      <div className="text-xs text-slate-500 mb-2 pl-1">→ a = 6，b = −13，c = −28</div>
                      <div className="flex items-center gap-1 flex-wrap mb-3">
                        <span className="text-slate-600 text-xs">輸入：</span>
                        <span className="text-slate-700 text-xs font-mono">6</span>
                        <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                        <span className="text-slate-700 text-xs font-mono">−13</span>
                        <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                        <span className="text-slate-700 text-xs font-mono">−28</span>
                        <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded border p-2 text-center">
                          <p className="text-xs text-slate-500 mb-1">答案 1</p>
                          <p className="text-2xl font-mono font-bold text-slate-800">3.5</p>
                          <p className="text-xs text-orange-600 font-semibold mt-1">按 <span className="bg-gray-500 text-white text-xs font-mono px-1.5 py-0.5 rounded">a b/c</span> → <Latex math="\frac{7}{2}" /></p>
                        </div>
                        <div className="bg-white rounded border p-2 text-center">
                          <p className="text-xs text-slate-500 mb-1">答案 2</p>
                          <p className="text-2xl font-mono font-bold text-slate-800">−1.333...</p>
                          <p className="text-xs text-orange-600 font-semibold mt-1">按 <span className="bg-gray-500 text-white text-xs font-mono px-1.5 py-0.5 rounded">a b/c</span> → <Latex math="-\frac{4}{3}" /></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="mb-3 rounded-lg overflow-hidden border border-amber-200">
                    <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5">Step 2　組成括號（分母配 r 放前，分子取相反）</div>
                    <div className="bg-amber-50 px-3 py-2">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Answer 1 */}
                        <div className="bg-white rounded border border-amber-200 p-2">
                          <p className="text-xs font-bold text-amber-700 mb-1 text-center">答案 1：3.5 = <Latex math="\frac{7}{2}" /></p>
                          <div className="text-xs text-slate-600 space-y-0.5 mt-1">
                            <p>分母 <span className="font-bold text-blue-700">2</span> 配 r 放前</p>
                            <p>分子 <span className="font-bold">7</span> 取相反 → <span className="font-bold text-red-600">−7</span></p>
                          </div>
                          <p className="text-sm font-bold text-center text-blue-700 mt-2"><Latex math="(2r - 7)" /></p>
                        </div>
                        {/* Answer 2 */}
                        <div className="bg-white rounded border border-amber-200 p-2">
                          <p className="text-xs font-bold text-amber-700 mb-1 text-center">答案 2：−1.333... = <Latex math="-\frac{4}{3}" /></p>
                          <div className="text-xs text-slate-600 space-y-0.5 mt-1">
                            <p>分母 <span className="font-bold text-blue-700">3</span> 配 r 放前</p>
                            <p>分子 <span className="font-bold">−4</span> 取相反 → <span className="font-bold text-red-600">+4</span></p>
                          </div>
                          <p className="text-sm font-bold text-center text-blue-700 mt-2"><Latex math="(3r + 4)" /></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="mb-3 rounded-lg overflow-hidden border border-purple-200">
                    <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1.5">Step 3　在每個括號的數字後補上 s</div>
                    <div className="bg-purple-50 px-3 py-2">
                      <div className="grid grid-cols-2 gap-3 text-center text-sm">
                        <div>
                          <Latex math="(2r - 7)" />
                          <p className="text-xs text-slate-500 my-1">7 後加 s</p>
                          <p className="text-base font-bold text-purple-700"><Latex math="(2r - 7s)" /></p>
                        </div>
                        <div>
                          <Latex math="(3r + 4)" />
                          <p className="text-xs text-slate-500 my-1">4 後加 s</p>
                          <p className="text-base font-bold text-purple-700"><Latex math="(3r + 4s)" /></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 最終答案 */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-green-700">
                      ∴ 答案 <Latex math="= (2r - 7s)(3r + 4s)" />
                    </p>
                  </div>
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
                  <p className="text-sm text-slate-600 mb-3">DSE 常見：(a) 和 (b) 有關聯（如果出現 (c)，則 (a) + (b) 都和 (c) 有關聯）</p>
                  
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

                  {/* (a) 答案 */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-3">
                    <p className="text-sm font-bold text-green-700 mb-1">📝 (a) 部答案：</p>
                    <Latex math="6r^2 - 13rs - 28s^2 = (2r-7s)(3r+4s)" block />
                  </div>

                  {/* 解題步驟 */}
                  <div className="bg-yellow-50 p-3 rounded">
                    <p className="text-sm font-bold text-green-700 mb-2">📝 (b) 部答案：</p>
                    {/* Starting expression (no = prefix) */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 shrink-0" />
                      <div className="flex items-center flex-wrap gap-0.5 text-sm min-w-0">
                        <Latex math="4r - 14s + " />
                        <span className="bg-yellow-200 rounded px-0.5"><Latex math="6r^2 - 13rs - 28s^2" /></span>
                      </div>
                    </div>
                    {/* Column layout: = sign anchor | expression | annotation */}
                    <div className="space-y-2">

                      {/* Line 1 */}
                      <div className="flex items-center gap-2">
                        <div className="w-4 shrink-0 text-right font-mono text-sm text-slate-700">=</div>
                        <div className="flex items-center flex-wrap gap-0.5 text-sm min-w-0">
                          <Latex math="4r - 14s + " />
                          <span className="bg-yellow-200 rounded px-0.5"><Latex math="(2r-7s)(3r+4s)" /></span>
                        </div>
                        <div className="text-xs text-slate-500 italic shrink-0">← 套用 (a) 部答案</div>
                      </div>

                      {/* Line 2 */}
                      <div className="flex items-center gap-2">
                        <div className="w-4 shrink-0 text-right font-mono text-sm text-slate-700">=</div>
                        <div className="flex items-center flex-wrap gap-0.5 text-sm min-w-0">
                          <span className="bg-green-100 text-green-800 rounded px-0.5"><Latex math="2" /></span>
                          <span className="bg-purple-100 text-purple-800 rounded px-0.5"><Latex math="(2r-7s)" /></span>
                          <span className="bg-green-100 text-green-800 rounded px-0.5"><Latex math="+" /></span>
                          <span className="bg-purple-100 text-purple-800 rounded px-0.5"><Latex math="(2r-7s)" /></span>
                          <span className="bg-green-100 text-green-800 rounded px-0.5"><Latex math="(3r+4s)" /></span>
                        </div>
                        <div className="text-xs text-slate-500 italic shrink-0">← 非 (a) 部答案 抽公因式，應看到有最少兩個 <span className="bg-purple-100 text-purple-800 px-0.5 rounded">相同括號</span></div>
                      </div>

                      {/* Line 3 */}
                      <div className="flex items-center gap-2">
                        <div className="w-4 shrink-0 text-right font-mono text-sm text-slate-700">=</div>
                        <div className="flex items-center flex-wrap gap-0.5 text-sm min-w-0">
                          <span className="bg-purple-100 text-purple-800 rounded px-0.5"><Latex math="(2r-7s)" /></span>
                          <span className="bg-green-100 text-green-800 rounded px-0.5"><Latex math="(2 + 3r + 4s)" /></span>
                        </div>
                        <div className="text-xs text-slate-500 italic shrink-0">← 抽<span className="bg-purple-100 text-purple-800 px-0.5 rounded">相同的括號</span>放前，<span className="bg-green-100 text-green-800 px-0.5 rounded">剩餘部份</span>放後括號</div>
                      </div>

                    </div>
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
    quadratic: { 1: { score: 0, total: 0 }, 2: { score: 0, total: 0 } },
    dse: { 1: { score: 0, total: 0 } }
  });
  const [isAnswered, setIsAnswered] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [dseFlow, setDseFlow] = useState(null);
  const [dseInputStage, setDseInputStage] = useState('answer');
  const [stageNotice, setStageNotice] = useState('');

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
            highlightedQuestion: `\\colorbox{yellow}{${factor * a}}${v1} ${sign} \\colorbox{yellow}{${factor * b}}${v2}`,
            steps: [
              `找出 $${factor * a}$ 和 $${factor * b}$ 的最大公因數：$${factor}$`,
              `$${factor * a}${v1} \\div ${factor} = ${aStr}${v1}$，$${factor * b}${v2} \\div ${factor} = ${bStr}${v2}$`,
              `先寫公因式在前，加上括號在後放不同的數字/代數`,
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
            highlightedQuestion: `\\colorbox{yellow}{${common}}${v1} ${sign} \\colorbox{yellow}{${common}}${v2}`,
            steps: [
              `公因式是 $${common}$`,
              `$${common}${v1} \\div ${common} = ${v1}$，$${common}${v2} \\div ${common} = ${v2}$`,
              `先寫公因式在前，加上括號在後放不同的數字/代數`,
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
            highlightedQuestion: `-\\colorbox{yellow}{${common}}${v1} - \\colorbox{yellow}{${common}}${v2}`,
            steps: [
              `每項都含有 $-${common}$（公因式）`,
              `先寫公因式在前，加上括號在後放不同的數字/代數`,
              `$-${common}${v1} - ${common}${v2} = -${common}(${v1} + ${v2})$`
            ],
            vars: [common, v1, v2]
          };
        },
        // LV1 三項數字公因式（如 4a - 10b + 8c）
        () => {
          const factor = [2, 3, 4][Math.floor(Math.random() * 3)];
          let a, b, cc;
          do {
            a = Math.floor(Math.random() * 5) + 1;
            b = Math.floor(Math.random() * 5) + 1;
            cc = Math.floor(Math.random() * 5) + 1;
          } while (gcd(gcd(a, b), cc) !== 1);
          const pool = ['a', 'b', 'c', 'x', 'y', 'z', 'm', 'n', 'p'];
          const v1 = pool[Math.floor(Math.random() * pool.length)];
          const r1 = pool.filter(v => v !== v1);
          const v2 = r1[Math.floor(Math.random() * r1.length)];
          const r2 = r1.filter(v => v !== v2);
          const v3 = r2[Math.floor(Math.random() * r2.length)];
          const s1 = Math.random() > 0.5 ? '+' : '-';
          const s2 = Math.random() > 0.5 ? '+' : '-';
          const aStr = c1(a); const bStr = c1(b); const cStr = c1(cc);
          return {
            question: `${factor * a}${v1} ${s1} ${factor * b}${v2} ${s2} ${factor * cc}${v3}`,
            answer: `${factor}(${aStr}${v1} ${s1} ${bStr}${v2} ${s2} ${cStr}${v3})`,
            answerAlt: [`${factor}(${aStr}${v1}${s1}${bStr}${v2}${s2}${cStr}${v3})`],
            hint: `找出 ${factor * a}、${factor * b} 和 ${factor * cc} 的公因數`,
            highlightedQuestion: `\\colorbox{yellow}{${factor * a}}${v1} ${s1} \\colorbox{yellow}{${factor * b}}${v2} ${s2} \\colorbox{yellow}{${factor * cc}}${v3}`,
            steps: [
              `找出 $${factor * a}$、$${factor * b}$、$${factor * cc}$ 的最大公因數：$${factor}$`,
              `各項除以 $${factor}$：$${aStr}${v1}$，$${bStr}${v2}$，$${cStr}${v3}$`,
              `先寫公因式在前，加上括號在後放不同的數字/代數`,
              `$${factor * a}${v1} ${s1} ${factor * b}${v2} ${s2} ${factor * cc}${v3} = ${factor}(${aStr}${v1} ${s1} ${bStr}${v2} ${s2} ${cStr}${v3})$`
            ],
            vars: [v1, v2, v3]
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
            highlightedQuestion: `-\\colorbox{yellow}{${factor * a}}\\colorbox{yellow}{${common}}${v1} ${sign} \\colorbox{yellow}{${factor * b}}\\colorbox{yellow}{${common}}`,
            steps: [
              `公因式是 $-${factor}${common}$`,
              `$-${factor * a}${common}${v1} \\div (-${factor}${common}) = ${aStr}${v1}$`,
              `$${sign === '+' ? '' : '-'}${factor * b}${common} \\div (-${factor}${common}) = ${sign === '+' ? '-' : ''}${bStr}$`,
              `先寫公因式在前，加上括號在後放不同的數字/代數`,
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
            highlightedQuestion: `\\colorbox{yellow}{${coef1}}${base}^3 - \\colorbox{yellow}{${coef2}}${base}^2${var2}`,
            steps: [
              `公因式是 $${coef1}${base}^2$`,
              `$${coef1}${base}^3 \\div ${coef1}${base}^2 = ${base}$`,
              `$${coef2}${base}^2${var2} \\div ${coef1}${base}^2 = 2${var2}$`,
              `先寫公因式在前，加上括號在後放不同的數字/代數`,
              `$${coef1}${base}^3 - ${coef2}${base}^2${var2} = ${coef1}${base}^2(${base} - 2${var2})$`
            ],
            vars: [base, var2]
          };
        },
        // LV2 兩個代數變數為公因式（如 6p²q + 9pq² = 3pq(2p+3q)）
        () => {
          const factor = [2, 3, 5][Math.floor(Math.random() * 3)];
          const pool = ['p', 'q', 'x', 'y', 'a', 'b'];
          const v1 = pool[Math.floor(Math.random() * pool.length)];
          const v2 = pool.filter(v => v !== v1)[Math.floor(Math.random() * (pool.length - 1))];
          let a, b;
          do {
            a = Math.floor(Math.random() * 4) + 1;
            b = Math.floor(Math.random() * 4) + 1;
          } while (gcd(a, b) !== 1);
          const sign = Math.random() > 0.5 ? '+' : '-';
          const aStr = c1(a); const bStr = c1(b);
          // terms: factor*a * v1^2*v2  sign  factor*b * v1*v2^2
          // = factor*v1*v2 * (a*v1  sign  b*v2)
          const t1 = factor * a; const t2 = factor * b;
          const cfStr = `${factor}${v1}${v2}`;
          return {
            question: `${t1}${v1}^2${v2} ${sign} ${t2}${v1}${v2}^2`,
            answer: `${cfStr}(${aStr}${v1} ${sign} ${bStr}${v2})`,
            answerAlt: [`${cfStr}(${aStr}${v1}${sign}${bStr}${v2})`],
            hint: `每項都含有 ${factor}、${v1} 和 ${v2}，公因式是 ${cfStr}`,
            highlightedQuestion: `\\colorbox{yellow}{${t1}}\\colorbox{yellow}{${v1}}^2\\colorbox{yellow}{${v2}} ${sign} \\colorbox{yellow}{${t2}}\\colorbox{yellow}{${v1}}\\colorbox{yellow}{${v2}}^2`,
            steps: [
              `每一項數字都含有 "$${factor}$"（或 "$${factor}$" 的倍數），字母都含有 $${v1}$、$${v2}$`,
              `先寫公因式（公因數/相同代數） $${cfStr}$ 在前，加上括號在後放不同的數字/代數`,
              `$= ${cfStr}(${aStr}${v1} ${sign} ${bStr}${v2})$`
            ],
            vars: [v1, v2]
          };
        },
        // LV2 三項複合公因式（如 14x²y² - 35xy² + 7y⁴ = 7y²(2x²-5x+y²)）
        () => {
          const factor = [2, 3, 7][Math.floor(Math.random() * 3)];
          const pool = ['x', 'y', 'a', 'b', 'm', 'n'];
          const v1 = pool[Math.floor(Math.random() * pool.length)];
          const v2 = pool.filter(v => v !== v1)[Math.floor(Math.random() * (pool.length - 1))];
          let a, b, cc;
          do {
            a = Math.floor(Math.random() * 4) + 1;
            b = Math.floor(Math.random() * 4) + 1;
            cc = Math.floor(Math.random() * 3) + 1;
          } while (gcd(gcd(a, b), cc) !== 1);
          const s1 = Math.random() > 0.5 ? '+' : '-';
          const s2 = Math.random() > 0.5 ? '+' : '-';
          const aStr = c1(a); const bStr = c1(b); const cStr = c1(cc);
          // terms: factor*a*v1^2*v2^2  s1  factor*b*v1*v2^2  s2  factor*cc*v2^4
          // = factor*v2^2 * (a*v1^2  s1  b*v1  s2  cc*v2^2)
          const t1 = factor * a; const t2 = factor * b; const t3 = factor * cc;
          const cfStr = `${factor}${v2}^2`;
          const inner = `${aStr}${v1}^2 ${s1} ${bStr}${v1} ${s2} ${cStr}${v2}^2`;
          return {
            question: `${t1}${v1}^2${v2}^2 ${s1} ${t2}${v1}${v2}^2 ${s2} ${t3}${v2}^4`,
            answer: `${cfStr}(${inner})`,
            answerAlt: [`${cfStr}(${aStr}${v1}^2${s1}${bStr}${v1}${s2}${cStr}${v2}^2)`],
            hint: `每項都含有 ${factor} 和 ${v2}²，公因式是 ${cfStr}`,
            highlightedQuestion: `\\colorbox{yellow}{${t1}}${v1}^2\\colorbox{yellow}{${v2}}^2 ${s1} \\colorbox{yellow}{${t2}}${v1}\\colorbox{yellow}{${v2}}^2 ${s2} \\colorbox{yellow}{${t3}}\\colorbox{yellow}{${v2}}^4`,
            steps: [
              `每一項數字都含有 "$${factor}$"（或 "$${factor}$" 的倍數），字母都含有 $${v2}^2$`,
              `先寫公因式（公因數/相同代數） $${cfStr}$ 在前，加上括號在後放不同的數字/代數`,
              `$= ${cfStr}(${inner})$`
            ],
            vars: [v1, v2]
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
          const validRange = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,10];
          const r1 = validRange[Math.floor(Math.random() * validRange.length)];
          const r2 = validRange[Math.floor(Math.random() * validRange.length)];
          const b = -(r1 + r2);
          const c = r1 * r2;
          const v = ['x', 'y', 'a', 'm'][Math.floor(Math.random() * 4)];
          const bCoef = Math.abs(b) === 1 ? '' : `${Math.abs(b)}`;
          const bStr = b === 0 ? '' : (b > 0 ? ` + ${bCoef}${v}` : ` - ${bCoef}${v}`);
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
            hint: `FMLA 01 輸入 a=1, b=${b}, c=${c}`,
            steps: [
              `FMLA 01 輸入：$a=1,\\ b=${b},\\ c=${c}$`,
              `得出兩個整數答案：$${r1}$ 和 $${r2}$，各取相反數放入括號`,
              `$= ${ans1}${ans2}$`
            ],
            vars: [v]
          };
        },
        // 平方差 a² - b²
        () => {
          const a = Math.floor(Math.random() * 9) + 2;
          const v = ['x', 'y', 'a', 'b'][Math.floor(Math.random() * 4)];
          return {
            question: `${v}^2 - ${a * a}`,
            answer: `(${v} + ${a})(${v} - ${a})`,
            answerAlt: [`(${v}-${a})(${v}+${a})`],
            hint: `此題需使用平方差公式`,
            steps: [
              `此題需使用平方差公式：$a^2 - b^2 = (a+b)(a-b)$`,
              `$${v}^2 - ${a * a}$`,
              `$= ${v}^2 - ${a}^2$`,
              `$= (${v}+${a})(${v}-${a})$`
            ],
            vars: [v]
          };
        }
      ];
      return scenarios[Math.random() < 0.75 ? 0 : 1]();
    } else {
      // LV2: 二元二次 ax² + bxy + cy²（完全隨機，係數範圍至12）
      const varPairs = [['x','y'],['a','b'],['r','s'],['m','n'],['p','q']];
      const [v1, v2] = varPairs[Math.floor(Math.random() * varPairs.length)];

      // 最大公因數
      const gcd2 = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };

      // 生成候選值：與 coef 互質的非零整數（範圍 ±8）
      const makeCands = (coef) => {
        const cands = [];
        for (let v = -8; v <= 8; v++) {
          if (v !== 0 && gcd2(coef, Math.abs(v)) === 1) cands.push(v);
        }
        return cands;
      };

      let p1, p2, q1, q2, A, B, C;
      let attempts = 0;
      do {
        p1 = Math.floor(Math.random() * 4) + 1;  // 1–4
        q1 = Math.floor(Math.random() * 4) + 1;  // 1–4
        const cp = makeCands(p1);
        const cq = makeCands(q1);
        p2 = cp[Math.floor(Math.random() * cp.length)];
        q2 = cq[Math.floor(Math.random() * cq.length)];
        A = p1 * q1;
        B = p1 * q2 + p2 * q1;
        C = p2 * q2;
        attempts++;
      } while ((Math.abs(A) > 12 || Math.abs(B) > 12 || Math.abs(C) > 12 || B === 0 || C === 0) && attempts < 300);

      // 構建題目字串（係數1省略）
      const coef1omit = (n) => Math.abs(n) === 1 ? '' : `${Math.abs(n)}`;
      const aStr = A === 1 ? '' : `${A}`;
      const bStr = B === 0 ? '' : (B > 0 ? ` + ${coef1omit(B)}${v1}${v2}` : ` - ${coef1omit(B)}${v1}${v2}`);
      const cStr = C === 0 ? '' : (C > 0 ? ` + ${coef1omit(C)}${v2}^2` : ` - ${coef1omit(C)}${v2}^2`);

      // 構建因式字串 (c1*v1 + c2*v2)
      const factStr = (c1, c2) => {
        const left = c1 === 1 ? v1 : `${c1}${v1}`;
        const right = c2 === 1 ? ` + ${v2}` : c2 === -1 ? ` - ${v2}` :
                      c2 > 0 ? ` + ${c2}${v2}` : ` - ${Math.abs(c2)}${v2}`;
        return `(${left}${right})`;
      };
      const ans1 = factStr(p1, p2);
      const ans2 = factStr(q1, q2);
      const answer = `${ans1}${ans2}`;
      const answerAlt = [`${ans2}${ans1}`, answer.replace(/\s/g,''), `${ans2}${ans1}`.replace(/\s/g,'')];

      // 分數 LaTeX 顯示（分母永遠 > 0，已互質）
      // 根1 = -p2/p1，根2 = -q2/q1
      const fracTex = (num, den) => {
        // den > 0 guaranteed (p1, q1 > 0)
        if (den === 1) return `${num}`;
        if (num < 0) return `-\\dfrac{${Math.abs(num)}}{${den}}`;
        return `\\dfrac{${num}}{${den}}`;
      };
      const r1tex = fracTex(-p2, p1);
      const r2tex = fracTex(-q2, q1);

      // 根 → 因式說明
      const rootLine = (rNum, rDen, fac) => {
        // rNum = -p2 or -q2 (numerator), rDen = p1 or q1 (denominator)
        const tex = fracTex(rNum, rDen);
        if (rDen === 1) {
          return `$${tex}$（整數），取相反數放入括號 → $${fac}$`;
        }
        const rev = rNum < 0 ? `+${Math.abs(rNum)}` : `-${rNum}`;
        return `$${tex}$，分母 $${rDen}$ 放前，分子取相反得 $${rev}$ → $${fac}$`;
      };

      const hint = `在 FMLA 01 輸入 ${A} EXE ${B} EXE ${C} EXE。分數答案：分母放前、分子取相反；整數答案：直接取相反`;

      const rootSteps = [
        `FMLA 01 輸入：$a=${A},\ b=${B},\ c=${C}$`,
        `得出兩根：$${r1tex}$ 和 $${r2tex}$（小數需轉分數，按 [[a b/c]] [[EXE]]）`,
        `口訣：分母放前，分子放後變相反`,
        rootLine(-p2, p1, ans1),
        rootLine(-q2, q1, ans2),
        `$= ${ans1}${ans2}$`
      ];

      return {
        question: `${aStr}${v1}^2${bStr}${cStr}`,
        answer,
        answerAlt,
        hint,
        steps: rootSteps,
        vars: [v1, v2]
      };
    }
  };

  // =====================
  // DSE 實戰題目生成
  // 目前先做兩類：
  // 1) (a), (b)；作答 (b)
  // 2) (a), (b), (c)；作答 (c)
  // =====================
  const termAbs = (n, v) => `${Math.abs(n) === 1 ? '' : Math.abs(n)}${v}`;
  const signedJoin = (terms) => {
    const valid = terms.filter(t => t.coef !== 0);
    if (valid.length === 0) return '0';
    return valid.map((t, i) => {
      const body = `${Math.abs(t.coef) === 1 ? '' : Math.abs(t.coef)}${t.var}`;
      if (i === 0) return t.coef < 0 ? `-${body}` : body;
      return t.coef < 0 ? ` - ${body}` : ` + ${body}`;
    }).join('');
  };

  const generateDSEQuestionSet = () => {
    const scenarios = [
      // (a), (b) 題型：用 (a) 的因式分解代入 (b)
      () => {
        const varPairs = [['r', 's'], ['p', 'q'], ['m', 'n']];
        const [v1, v2] = varPairs[Math.floor(Math.random() * varPairs.length)];

        let a1, b1Abs;
        do {
          a1 = Math.floor(Math.random() * 3) + 2; // 2..4
          b1Abs = Math.floor(Math.random() * 4) + 2; // 2..5
        } while (gcd(a1, b1Abs) !== 1);
        const b1Sign = Math.random() > 0.5 ? 1 : -1;
        const b1 = b1Sign * b1Abs;

        let a2, b2Abs;
        do {
          a2 = Math.floor(Math.random() * 3) + 2; // 2..4
          b2Abs = Math.floor(Math.random() * 4) + 2; // 2..5
        } while (gcd(a2, b2Abs) !== 1);
        const b2Sign = b1Sign === 1 ? -1 : 1; // 避免太單調
        const b2 = b2Sign * b2Abs;

        const A = a1 * a2;
        const B = a1 * b2 + b1 * a2;
        const C = b1 * b2;

        const factor1Inner = `${termAbs(a1, v1)} ${b1 >= 0 ? '+' : '-'} ${termAbs(b1, v2)}`;
        const factor2Inner = `${termAbs(a2, v1)} ${b2 >= 0 ? '+' : '-'} ${termAbs(b2, v2)}`;
        const factor1 = `(${factor1Inner})`;
        const factor2 = `(${factor2Inner})`;
        const rootTex = (num, den) => {
          if (num === 0) return '0';
          if (den === 1) return String(num);
          if (num < 0) return `-\\dfrac{${Math.abs(num)}}{${den}}`;
          return `\\dfrac{${num}}{${den}}`;
        };
        const root1Tex = rootTex(-b1, a1);
        const root2Tex = rootTex(-b2, a2);
        const aExpr = signedJoin([
          { coef: A, var: `${v1}^2` },
          { coef: B, var: `${v1}${v2}` },
          { coef: C, var: `${v2}^2` }
        ]);

        const t = Math.floor(Math.random() * 4) + 2; // 2..5
        const bLeadExpr = signedJoin([
          { coef: t * a2, var: v1 },
          { coef: t * b2, var: v2 }
        ]);
        const bExpr = `${bLeadExpr} + ${aExpr}`;

        const finalSecond = `(${t} + ${factor1Inner})`;
        const finalSecondAlt = `(${factor1Inner} + ${t})`;
        const answer = `${factor2}${finalSecond}`;
        const stem = `\\begin{aligned}&\\text{(a)}\\; ${aExpr},\\\\&\\text{(b)}\\; ${bExpr}.\\end{aligned}`;

        return {
          vars: [v1, v2],
          parts: [
            {
              label: 'a',
              question: stem,
              prompt: '因式分解 (a)',
              answer: `${factor1}${factor2}`,
              answerAlt: [
                `${factor2}${factor1}`,
                `${factor1}${factor2}`.replace(/\s/g, ''),
                `${factor2}${factor1}`.replace(/\s/g, '')
              ],
              hint: '先把 (a) 因式分解',
              steps: [
                `FMLA 01 輸入：$a=${A},\ b=${B},\ c=${C}$`,
                `得出兩根：$${root1Tex}$ 和 $${root2Tex}$（小數需轉分數，按 [[a b/c]] [[EXE]]）`,
                `口訣：分母放前，分子放後變相反`,
                `$${root1Tex}$ 對應 $${factor1}$，$${root2Tex}$ 對應 $${factor2}$`,
                `(a) 答案：$${aExpr} = ${factor1}${factor2}$`
              ],
              requiresSetup: false
            },
            {
              label: 'b',
              question: stem,
              prompt: '因式分解 (b)',
              answer,
              answerAlt: [
                `${finalSecond}${factor2}`,
                `${factor2}${finalSecondAlt}`,
                `${finalSecondAlt}${factor2}`,
                answer.replace(/\s/g, ''),
                `${finalSecond}${factor2}`.replace(/\s/g, ''),
                `${factor2}${finalSecondAlt}`.replace(/\s/g, ''),
                `${finalSecondAlt}${factor2}`.replace(/\s/g, '')
              ],
              hint: '用 (a) 的答案直接代入 (b)',
              steps: [
                `(a) 答案：$${aExpr} = ${factor1}${factor2}$`,
                `先代入列式：$${bExpr} = ${t}${factor2} + ${factor1}${factor2}$`,
                `抽共同括號並完成：$= ${factor2}(${t} + ${factor1Inner})$`
              ],
              requiresSetup: true,
              setupPrompt: '先輸入代入列式（相應位置套用 (a) 答案，其餘照抄）',
              setupPlaceholder: '先輸入列式：相應位置套用 (a) 答案，其他照抄',
              setupAnswer: `${bExpr} = ${t}${factor2} + ${factor1}${factor2}`,
              setupAnswerAlt: [
                `${t}${factor2} + ${factor1}${factor2} = ${bExpr}`,
                `${bExpr}=${t}${factor2}+${factor1}${factor2}`,
                `${t}${factor2} + ${factor1}${factor2}`,
                `${bLeadExpr} + ${factor1}${factor2}`,
                `${bExpr} = ${factor1}${factor2} + ${t}${factor2}`,
                `${factor1}${factor2} + ${t}${factor2}`
              ],
              setupHint: '在對應位置套用 (a) 答案，其餘項照抄。(不要漏寫 "+")',
              carryAnswers: [
                { label: '(a) 正確答案', value: `${factor1}${factor2}` }
              ],
              setupEquationHighlight: {
                left: bExpr,
                topSegments: [
                  { kind: 'lead', tex: bLeadExpr },
                  { kind: 'op', tex: '+' },
                  { kind: 'a', tex: aExpr }
                ],
                topCaption: '原式（標示 (a) 對應位置）',
                midSegments: [
                  { kind: 'lead', tex: bLeadExpr },
                  { kind: 'op', tex: '+' },
                  { kind: 'a', tex: `${factor1}${factor2}` }
                ],
                midCaption: '先套用 (a) 答案，照抄剩餘部份',
                segments: [
                  { kind: 'lead', tex: `${t}${factor2}` },
                  { kind: 'op', tex: '+' },
                  { kind: 'a', tex: `${factor1}${factor2}` }
                ],
                bottomCaption: '之後再抽剩餘部份的公因式，\n避免開頭抽錯失代入步驟分'
              },
              solutionEquationHighlight: {
                left: bExpr,
                topSegments: [
                  { kind: 'plain', tex: bLeadExpr, underline: true },
                  { kind: 'plain', tex: `+ ${aExpr}` }
                ],
                topCaption: '原式：會找到與 (a) 相同部份，非 (a) 部份為紅線，需抽公因式。',
                midSegments: [
                  { kind: 'p', tex: `${t}`, underline: true, joinNext: true },
                  { kind: 'g', tex: factor2, underline: true, joinPrev: true },
                  { kind: 'g', tex: '+' },
                  { kind: 'g', tex: factor1 },
                  { kind: 'p', tex: factor2 }
                ],
                midCaption: '先套用 (a) 答案：紫色是相同括號，綠色是其餘部份',
                segments: [
                  { kind: 'p', tex: factor2 },
                  { kind: 'g', tex: `(${t} + ${factor1Inner})` }
                ],
                bottomCaptionSegments: [
                  { text: '抽 ' },
                  { text: '相同括號', kind: 'p' },
                  { text: '放前；' },
                  { text: '剩餘部份', kind: 'g' },
                  { text: '放後括號' }
                ]
              }
            }
          ]
        };
      },

      // (a), (b), (c) 題型：用 (a) 的答案代入 (c)
      () => {
        const p = 'p';
        const q = 'q';
        const r = 'r';

        let x1, x2Abs;
        do {
          x1 = Math.floor(Math.random() * 3) + 2; // 2..4
          x2Abs = Math.floor(Math.random() * 3) + 2; // 2..4
        } while (x1 === x2Abs || gcd(x1, x2Abs) !== 1);
        const x2Sign = Math.random() > 0.5 ? 1 : -1;
        const x2 = x2Sign * x2Abs;
        const xInner = `${termAbs(x1, p)} ${x2 >= 0 ? '+' : '-'} ${termAbs(x2, q)}`;

        const k = Math.floor(Math.random() * 4) + 2; // 2..5
        const aExpr = signedJoin([
          { coef: k * x1, var: `${p}${r}` },
          { coef: k * x2, var: `${q}${r}` }
        ]);

        let y1, y2Abs;
        do {
          y1 = Math.floor(Math.random() * 4) + 2; // 2..5
          y2Abs = Math.floor(Math.random() * 4) + 2; // 2..5
        } while (gcd(y1, y2Abs) !== 1);
        const y2Sign = x2Sign === 1 ? -1 : 1;
        const y2 = y2Sign * y2Abs;
        const yInner = `${termAbs(y1, p)} ${y2 >= 0 ? '+' : '-'} ${termAbs(y2, q)}`;

        const bExpr = signedJoin([
          { coef: x1 * y1, var: `${p}^2` },
          { coef: x1 * y2 + x2 * y1, var: `${p}${q}` },
          { coef: x2 * y2, var: `${q}^2` }
        ]);

        const cExpr = signedJoin([
          { coef: x1 * y1, var: `${p}^2` },
          { coef: x1 * y2 + x2 * y1, var: `${p}${q}` },
          { coef: x2 * y2, var: `${q}^2` },
          { coef: -(k * x1), var: `${p}${r}` },
          { coef: -(k * x2), var: `${q}${r}` }
        ]);

        const xFactor = `(${xInner})`;
        const yFactor = `(${yInner})`;
        const bAnswer = `${xFactor}${yFactor}`;
        const bAnswerSwap = `${yFactor}${xFactor}`;
        const cSecond = `(${yInner} - ${k}${r})`;
        const cSecondAlt = `(-${k}${r} + ${yInner})`;
        const cAnswer = `${xFactor}${cSecond}`;
        const cSubExpr = `${bAnswer} - ${k}${r}${xFactor}`;
        const cSubExprAlt1 = `${bAnswer} - ${xFactor}${k}${r}`;
        const cSubExprAlt2 = `${bAnswerSwap} - ${k}${r}${xFactor}`;
        const cSubExprAlt3 = `${bAnswerSwap} - ${xFactor}${k}${r}`;
        const rootTex = (num, den) => {
          if (num === 0) return '0';
          if (den === 1) return String(num);
          if (num < 0) return `-\\dfrac{${Math.abs(num)}}{${den}}`;
          return `\\dfrac{${num}}{${den}}`;
        };
        const bRoot1Tex = rootTex(-x2, x1);
        const bRoot2Tex = rootTex(-y2, y1);
        const stem = `\\begin{aligned}&\\text{(a)}\\; ${aExpr},\\\\&\\text{(b)}\\; ${bExpr},\\\\&\\text{(c)}\\; ${cExpr}.\\end{aligned}`;

        return {
          vars: [p, q, r],
          parts: [
            {
              label: 'a',
              question: stem,
              prompt: '因式分解 (a)',
              answer: `${k}${r}${xFactor}`,
              answerAlt: [`${xFactor}${k}${r}`, `${k}${r}${xFactor}`.replace(/\s/g, ''), `${xFactor}${k}${r}`.replace(/\s/g, '')],
              hint: '先把 (a) 因式分解',
              steps: [
                `先看 (a)：$${aExpr}$`,
                `先抽公因式 $${k}${r}$`,
                `(a) 答案：$${aExpr} = ${k}${r}${xFactor}$`
              ],
              requiresSetup: false
            },
            {
              label: 'b',
              question: stem,
              prompt: '因式分解 (b)',
              answer: bAnswer,
              answerAlt: [
                `${yFactor}${xFactor}`,
                `${bAnswer}`.replace(/\s/g, ''),
                `${yFactor}${xFactor}`.replace(/\s/g, '')
              ],
              hint: '直接因式分解 (b)',
              steps: [
                `FMLA 01 輸入：$a=${x1 * y1},\ b=${x1 * y2 + x2 * y1},\ c=${x2 * y2}$`,
                `得出兩根：$${bRoot1Tex}$ 和 $${bRoot2Tex}$（小數需轉分數，按 [[a b/c]] [[EXE]]）`,
                `口訣：分母放前，分子放後變相反`,
                `$${bRoot1Tex}$ 對應 $${xFactor}$，$${bRoot2Tex}$ 對應 $${yFactor}$`,
                `(b) 答案：$${bExpr} = ${bAnswer}$`
              ],
              requiresSetup: false
            },
            {
              label: 'c',
              question: stem,
              prompt: '因式分解 (c)',
              answer: cAnswer,
              answerAlt: [
                `${cSecond}${xFactor}`,
                `${xFactor}${cSecondAlt}`,
                `${cSecondAlt}${xFactor}`,
                cAnswer.replace(/\s/g, ''),
                `${cSecond}${xFactor}`.replace(/\s/g, ''),
                `${xFactor}${cSecondAlt}`.replace(/\s/g, ''),
                `${cSecondAlt}${xFactor}`.replace(/\s/g, '')
              ],
              hint: '',
              steps: [
                `(a) 答案：$${aExpr} = ${k}${r}${xFactor}$`,
                `(b) 答案：$${bExpr} = ${bAnswer}$`,
                `先代入列式：$${cExpr} = ${cSubExpr}$`,
                `抽共同括號並完成：$= ${xFactor}${cSecond}$`
              ],
              requiresSetup: true,
              setupPrompt: '先輸入代入列式（相應位置套用 (a) + (b) 答案，其餘照抄）',
              setupPlaceholder: '先輸入列式：相應位置套用 (a) 和 (b) 答案，其他照抄',
              setupAnswer: `${cExpr} = ${cSubExpr}`,
              setupAnswerAlt: [
                `${cSubExpr} = ${cExpr}`,
                `${cExpr}=${cSubExpr}`,
                `${cExpr} = ${cSubExprAlt1}`,
                `${cExpr} = ${cSubExprAlt2}`,
                `${cExpr} = ${cSubExprAlt3}`,
                `${cExpr} = ${bExpr} - (${aExpr})`,
                `${bExpr} - (${aExpr}) = ${cExpr}`,
                `${cExpr}=${bExpr}-(${aExpr})`
              ],
              setupHint: '在對應位置套用 (a) 與 (b) 答案，其餘項照抄',
              carryAnswers: [
                { label: '(a) 正確答案', value: `${k}${r}${xFactor}` },
                { label: '(b) 正確答案', value: bAnswer }
              ],
              setupEquationHighlight: {
                left: cExpr,
                topSegments: [
                  { kind: 'b', tex: bExpr },
                  { kind: 'op', tex: '-' },
                  { kind: 'a', tex: aExpr }
                ],
                topCaption: '原式（標示 (b) 與 (a) 對應位置）',
                midSegments: [
                  { kind: 'b', tex: bAnswer },
                  { kind: 'op', tex: '-' },
                  { kind: 'a', tex: `${k}${r}${xFactor}` }
                ],
                midCaption: '先套用 (a) 與 (b) 答案，照抄剩餘部份',
                segments: [
                  { kind: 'plain', tex: xFactor },
                  { kind: 'plain', tex: `(${yInner} - ${k}${r})` }
                ],
                bottomCaption: '再抽共同括號完成最終答案'
              },
              solutionEquationHighlight: {
                left: cExpr,
                topSegments: [
                  { kind: 'plain', tex: bExpr },
                  { kind: 'plain', tex: `- ${aExpr}` }
                ],
                topCaption: '原式',
                midSegments: [
                  { kind: 'p', tex: xFactor },
                  { kind: 'g', tex: yFactor },
                  { kind: 'g', tex: `-${k}${r}` },
                  { kind: 'p', tex: xFactor }
                ],
                midCaption: '先套用 (a) 與 (b) 答案：紫色是相同括號，綠色是其餘部份',
                segments: [
                  { kind: 'p', tex: xFactor },
                  { kind: 'g', tex: cSecond }
                ],
                bottomCaptionSegments: [
                  { text: '抽 ' },
                  { text: '相同括號', kind: 'p' },
                  { text: '放前；' },
                  { text: '剩餘部份', kind: 'g' },
                  { text: '放後括號' }
                ]
              }
            }
          ]
        };
      }
    ];

    // 歷屆大約 (含 c 題) : (不含 c 題) = 3 : 10
    // 即含 c 題約 3/13 機率
    const includePartC = Math.random() < (3 / 13);
    return includePartC ? scenarios[1]() : scenarios[0]();
  };

  const buildDSEPartQuestion = (setData, partIndex) => {
    const part = setData.parts[partIndex];
    return {
      question: part.question,
      prompt: part.prompt,
      answer: part.answer,
      answerAlt: part.answerAlt,
      hint: part.hint,
      steps: part.steps,
      vars: setData.vars,
      partLabel: part.label,
      requiresSetup: !!part.requiresSetup,
      setupPrompt: part.setupPrompt || '',
      setupPlaceholder: part.setupPlaceholder || '',
      setupAnswer: part.setupAnswer || '',
      setupAnswerAlt: part.setupAnswerAlt || [],
      setupHint: part.setupHint || '',
      carryAnswers: part.carryAnswers || [],
      setupEquationHighlight: part.setupEquationHighlight || null,
      solutionEquationHighlight: part.solutionEquationHighlight || null
    };
  };

  const startNewDSESet = () => {
    const setData = generateDSEQuestionSet();
    setDseFlow({ setData, partIndex: 0 });
    setCurrentQuestion(buildDSEPartQuestion(setData, 0));
    setUserAnswer('');
    setFeedback({ type: 'neutral', msg: '' });
    setIsAnswered(false);
    setDseInputStage(setData.parts[0].requiresSetup ? 'setup' : 'answer');
    setStageNotice('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 開始測驗（選擇類型）
  const selectQuizType = (type) => {
    setQuizType(type);
    // 對於只有一個等級的類型，直接開始
    if (type === 'grouping' || type === 'dse') {
      setLevel(1);
      if (type === 'dse') {
        startNewDSESet();
      } else {
        generateNewQuestion(type, 1);
      }
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
      case 'dse':
        startNewDSESet();
        break;
      default:
        question = generateCommonFactorQuestion(lv);
    }
    if (type === 'dse') return;
    setCurrentQuestion(question);
    setUserAnswer('');
    setFeedback({ type: 'neutral', msg: '' });
    setIsAnswered(false);
    setDseInputStage('answer');
    setStageNotice('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 正規化答案（移除空格、統一符號、處理係數1省略）
  const normalizeAnswer = (ans) => {
    const base = ans
      .replace(/\s+/g, '')
      .replace(/²/g, '^2')
      .replace(/³/g, '^3')
      .toLowerCase()
      .replace(/\(1([a-z])/g, '($1')  // 括號內 1y → y
      .replace(/([+\-])1([a-z])/g, '$1$2')  // +1y 或 -1y → +y 或 -y
      .replace(/^1([a-z])/g, '$1'); // 開頭的 1y → y

    // 括號內若是線性加減式，將項目排序標準化，容許 2p-3q+2 / 2+2p-3q / -3q+2p+2 視為同一式
    const canonicalizeLinearExpr = (expr) => {
      if (!expr || /[^a-z0-9^+\-]/.test(expr)) return null;
      const parts = expr.match(/[+\-]?[^+\-]+/g);
      if (!parts || parts.length === 0) return null;

      const acc = new Map();
      for (const part of parts) {
        const sign = part[0] === '-' ? -1 : 1;
        const body = (part[0] === '+' || part[0] === '-') ? part.slice(1) : part;
        if (!body) return null;

        let coef;
        let varPart;

        if (/^\d+$/.test(body)) {
          coef = Number(body);
          varPart = '';
        } else {
          const m = body.match(/^(\d+)?([a-z][a-z0-9^]*)$/);
          if (!m) return null;
          coef = m[1] ? Number(m[1]) : 1;
          varPart = m[2];
        }

        const prev = acc.get(varPart) || 0;
        acc.set(varPart, prev + sign * coef);
      }

      const keys = [...acc.keys()].filter(k => (acc.get(k) || 0) !== 0);
      if (keys.length === 0) return '0';

      // 先排字母項，常數放最後，確保括號內同類式會歸一到同一字串
      keys.sort((a, b) => {
        if (a === '') return 1;
        if (b === '') return -1;
        return a.localeCompare(b);
      });

      const out = [];
      for (const key of keys) {
        const c = acc.get(key);
        if (!c) continue;
        const abs = Math.abs(c);
        const term = key ? `${abs === 1 ? '' : abs}${key}` : `${abs}`;
        const s = c < 0 ? '-' : '+';
        out.push((out.length === 0 && s === '+') ? term : `${s}${term}`);
      }

      return out.join('');
    };

    return base.replace(/\(([^()]+)\)/g, (full, inner) => {
      const canon = canonicalizeLinearExpr(inner);
      return canon ? `(${canon})` : full;
    });
  };

  // 提交答案
  const handleSubmit = () => {
    if (!userAnswer.trim() || isAnswered) return;

    if (quizType === 'dse' && dseInputStage === 'setup') {
      const normalizedSetup = normalizeAnswer(userAnswer);
      const setupCorrect = normalizeAnswer(currentQuestion.setupAnswer || '') === normalizedSetup;
      const setupAltCorrect = currentQuestion.setupAnswerAlt?.some(
        alt => normalizeAnswer(alt) === normalizedSetup
      );

      if (setupCorrect || setupAltCorrect) {
        setDseInputStage('answer');
        setUserAnswer('');
        setFeedback({ type: 'neutral', msg: '' });
        setStageNotice('列式正確，現在請輸入最終因式分解答案。');
      } else {
        setFeedback({
          type: 'incorrect',
          msg: `列式可寫成 ${currentQuestion.setupAnswer}`,
          hint: currentQuestion.setupHint || '先把前題答案代入再整理',
          answerLabel: '參考列式',
          answer: currentQuestion.setupAnswer,
          equationHighlight: currentQuestion.setupEquationHighlight || null,
          stepEquationHighlight: currentQuestion.setupEquationHighlight || null,
          steps: []
        });
        setDseInputStage('answer');
        setUserAnswer('');
        setStageNotice('已顯示參考列式，請繼續完成最終答案（併項）。');
      }
      return;
    }

    setStageNotice('');

    const normalized = normalizeAnswer(userAnswer);
    const correctNormalized = normalizeAnswer(currentQuestion.answer);
    const altCorrect = currentQuestion.answerAlt?.some(alt => normalizeAnswer(alt) === normalized);
    const isTargetDseFinalPart =
      quizType === 'dse' && (
        (dseFlow?.setData?.parts?.length === 2 && currentQuestion.partLabel === 'b') ||
        (dseFlow?.setData?.parts?.length === 3 && currentQuestion.partLabel === 'c')
      );

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
      setFeedback({
        type: 'correct',
        msg: '答案正確！',
        answer: currentQuestion.answer,
        steps: currentQuestion.steps,
        answerLabel: isTargetDseFinalPart ? '解題步驟' : undefined,
        hideLegacyStepsBlock: isTargetDseFinalPart,
        equationHighlight: currentQuestion.solutionEquationHighlight || null,
        stepEquationHighlight: currentQuestion.solutionEquationHighlight || null
      });
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
        steps: currentQuestion.steps,
        answerLabel: isTargetDseFinalPart ? '解題步驟' : undefined,
        hideLegacyStepsBlock: isTargetDseFinalPart,
        equationHighlight: currentQuestion.solutionEquationHighlight || null,
        stepEquationHighlight: currentQuestion.solutionEquationHighlight || null
      });
    }
  };

  // 下一題
  const handleNext = () => {
    if (quizType === 'dse' && dseFlow) {
      const nextPartIndex = dseFlow.partIndex + 1;
      if (nextPartIndex < dseFlow.setData.parts.length) {
        setDseFlow({ ...dseFlow, partIndex: nextPartIndex });
        setCurrentQuestion(buildDSEPartQuestion(dseFlow.setData, nextPartIndex));
        setUserAnswer('');
        setFeedback({ type: 'neutral', msg: '' });
        setIsAnswered(false);
        setDseInputStage(dseFlow.setData.parts[nextPartIndex].requiresSetup ? 'setup' : 'answer');
        setStageNotice('');
        setTimeout(() => inputRef.current?.focus(), 100);
        return;
      }
      startNewDSESet();
      return;
    }
    generateNewQuestion(quizType, level);
  };

  // 返回選擇頁面
  const backToSelection = () => {
    setQuizType(null);
    setCurrentQuestion(null);
    setLevel(1);
    setDseFlow(null);
    setDseInputStage('answer');
    setStageNotice('');
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

            {/* DSE 實戰 */}
            <button
              onClick={() => selectQuizType('dse')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-red-400 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-4 rounded-xl group-hover:bg-red-200 transition-colors">
                  <GraduationCap className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-800">DSE 實戰</h2>
                  </div>
                  <p className="text-slate-600 text-sm">(a)(b) / (a)(b)(c) 代入題</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-red-600 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 等級選擇界面（第二層，對於有多個等級的類型）
  if (!currentQuestion && quizType !== 'grouping' && quizType !== 'dse') {
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
    quadratic: '二次多項式',
    dse: 'DSE 實戰'
  };

  const quizTypeColors = {
    common: 'purple',
    grouping: 'blue',
    quadratic: 'green',
    dse: 'red'
  };

  const color = quizTypeColors[quizType];
  const currentScoreData = getCurrentScore();

  // 返回按鈕處理
  const handleBack = () => {
    if (quizType === 'grouping' || quizType === 'dse') {
      backToSelection();
    } else {
      backToLevelSelection();
    }
  };

  const renderCaptionWithRedUnderline = (text) => {
    if (!text) return null;
    const parts = String(text).split('紅線');
    return parts.map((part, idx) => (
      <React.Fragment key={idx}>
        {part}
        {idx < parts.length - 1 && (
          <span className="text-red-700 underline decoration-red-600 decoration-2 underline-offset-2">紅線</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 頂部導航 */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{(quizType === 'grouping' || quizType === 'dse') ? '返回選擇' : '返回等級'}</span>
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
            📐 {quizTypeNames[quizType]} {!['grouping', 'dse'].includes(quizType) && level > 0 ? `LV${level}` : ''}
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
            {quizType === 'dse' ? (
              <div className="py-3">
                <div className="text-2xl text-center font-mono">
                  <Latex
                    math={isAnswered && currentQuestion.highlightedQuestion ? currentQuestion.highlightedQuestion : currentQuestion.question}
                    block
                  />
                </div>
                <p className="text-sm text-slate-500 text-left mt-1">{currentQuestion.prompt}</p>
                {dseInputStage === 'setup' && currentQuestion.requiresSetup && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-amber-700 font-bold">列式步驟 Session</p>
                    <p className="text-xs text-amber-700 mt-0.5">{currentQuestion.setupPrompt}</p>
                  </div>
                )}
                {currentQuestion.carryAnswers && currentQuestion.carryAnswers.length > 0 && (
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentQuestion.carryAnswers.map((item, idx) => (
                      <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                        <p className="text-xs text-blue-700 font-bold mb-1">{item.label}</p>
                        <p className="text-sm text-blue-800 font-mono"><Latex math={item.value} /></p>
                      </div>
                    ))}
                  </div>
                )}
                {stageNotice && (
                  <div className="mt-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-green-700 font-bold">✅ {stageNotice}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-2xl text-center py-4 font-mono">
                <Latex math={isAnswered && currentQuestion.highlightedQuestion ? currentQuestion.highlightedQuestion : currentQuestion.question} />
              </div>
            )}

            {/* 輸入區 */}
            <div className="flex flex-col gap-3 mb-4">
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (isAnswered ? handleNext() : handleSubmit())}
                placeholder={
                  quizType === 'dse' && dseInputStage === 'setup'
                    ? (currentQuestion.setupPlaceholder || '先輸入列式：相應位置套用答案，其他照抄')
                    : '輸入答案，例如：(x+2)(x-3)'
                }
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
                <div className={`flex items-start gap-2 text-sm ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                  <span className="font-medium shrink-0 whitespace-nowrap">{feedback.answerLabel || '答案'}：</span>
                  {feedback.equationHighlight ? (
                    <div className="font-mono text-sm">
                      {feedback.equationHighlight.topSegments?.length > 0 ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="w-4 shrink-0" />
                            <div className="flex-1 min-w-0 overflow-x-auto">
                              <div className="inline-flex items-center gap-1 whitespace-nowrap">
                                {feedback.equationHighlight.topSegments.map((seg, idx) => (
                                  seg.kind === 'op' ? (
                                    <span key={idx} className="px-1 text-red-700 font-bold"><Latex math={seg.tex} /></span>
                                  ) : seg.kind === 'plain' ? (
                                    <span key={idx} className={`px-1 text-slate-700 ${seg.underline ? 'border-b-2 border-red-600 pb-0.5' : ''} ${seg.joinNext ? '-mr-1 rounded-r-none' : ''} ${seg.joinPrev ? 'rounded-l-none' : ''}`}>
                                      <Latex math={seg.tex} />
                                    </span>
                                  ) : (
                                    <span
                                      key={idx}
                                      className={`${seg.kind === 'p'
                                        ? 'bg-purple-100 text-purple-800 rounded px-1'
                                        : seg.kind === 'g'
                                          ? 'bg-green-100 text-green-800 rounded px-1'
                                          : seg.kind === 'a'
                                            ? 'bg-yellow-200 text-amber-900 rounded px-1'
                                            : 'bg-cyan-200 text-cyan-900 rounded px-1'} ${seg.underline ? 'border-b-2 border-red-600 pb-0.5' : ''} ${seg.joinNext ? '-mr-1 rounded-r-none' : ''} ${seg.joinPrev ? 'rounded-l-none' : ''}`}
                                    >
                                      <Latex math={seg.tex} />
                                    </span>
                                  )
                                ))}
                              </div>
                            </div>
                            {feedback.equationHighlight.topCaption && (
                              <span className="text-xs text-slate-500 italic leading-snug whitespace-nowrap w-72 shrink-0">&larr; {renderCaptionWithRedUnderline(feedback.equationHighlight.topCaption)}</span>
                            )}
                          </div>
                          {feedback.equationHighlight.midSegments?.length > 0 && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="w-4 shrink-0 text-right font-mono">=</span>
                              <div className="flex-1 min-w-0 overflow-x-auto">
                                <div className="inline-flex items-center gap-1 whitespace-nowrap">
                                  {feedback.equationHighlight.midSegments.map((seg, idx) => (
                                    seg.kind === 'op' ? (
                                      <span key={idx} className="px-1 text-red-700 font-bold"><Latex math={seg.tex} /></span>
                                    ) : seg.kind === 'plain' ? (
                                      <span key={idx} className={`px-1 text-slate-700 ${seg.underline ? 'border-b-2 border-red-600 pb-0.5' : ''} ${seg.joinNext ? '-mr-1 rounded-r-none' : ''} ${seg.joinPrev ? 'rounded-l-none' : ''}`}>
                                        <Latex math={seg.tex} />
                                      </span>
                                    ) : (
                                      <span
                                        key={idx}
                                        className={`${seg.kind === 'p'
                                          ? 'bg-purple-100 text-purple-800 rounded px-1'
                                          : seg.kind === 'g'
                                            ? 'bg-green-100 text-green-800 rounded px-1'
                                            : seg.kind === 'a'
                                              ? 'bg-yellow-200 text-amber-900 rounded px-1'
                                              : 'bg-cyan-200 text-cyan-900 rounded px-1'} ${seg.underline ? 'border-b-2 border-red-600 pb-0.5' : ''} ${seg.joinNext ? '-mr-1 rounded-r-none' : ''} ${seg.joinPrev ? 'rounded-l-none' : ''}`}
                                      >
                                        <Latex math={seg.tex} />
                                      </span>
                                    )
                                  ))}
                                </div>
                              </div>
                              {feedback.equationHighlight.midCaption && (
                                <span className="text-xs text-slate-500 italic leading-snug whitespace-nowrap w-72 shrink-0">&larr; {renderCaptionWithRedUnderline(feedback.equationHighlight.midCaption)}</span>
                              )}
                            </div>
                          )}
                          {feedback.answerLabel !== '參考列式' && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="w-4 shrink-0 text-right font-mono">=</span>
                              <div className="flex-1 min-w-0 overflow-x-auto">
                                <div className="inline-flex items-center gap-1 whitespace-nowrap">
                                  {feedback.equationHighlight.segments.map((seg, idx) => (
                                    seg.kind === 'op' ? (
                                      <span key={idx} className="px-1 text-red-700 font-bold"><Latex math={seg.tex} /></span>
                                    ) : seg.kind === 'plain' ? (
                                      <span key={idx} className={`px-1 text-slate-700 ${seg.underline ? 'border-b-2 border-red-600 pb-0.5' : ''} ${seg.joinNext ? '-mr-1 rounded-r-none' : ''} ${seg.joinPrev ? 'rounded-l-none' : ''}`}>
                                        <Latex math={seg.tex} />
                                      </span>
                                    ) : (
                                      <span
                                        key={idx}
                                        className={`${seg.kind === 'p'
                                          ? 'bg-purple-100 text-purple-800 rounded px-1'
                                          : seg.kind === 'g'
                                            ? 'bg-green-100 text-green-800 rounded px-1'
                                            : seg.kind === 'a'
                                              ? 'bg-yellow-200 text-amber-900 rounded px-1'
                                              : 'bg-cyan-200 text-cyan-900 rounded px-1'} ${seg.underline ? 'border-b-2 border-red-600 pb-0.5' : ''} ${seg.joinNext ? '-mr-1 rounded-r-none' : ''} ${seg.joinPrev ? 'rounded-l-none' : ''}`}
                                      >
                                        <Latex math={seg.tex} />
                                      </span>
                                    )
                                  ))}
                                </div>
                              </div>
                              {feedback.equationHighlight.bottomCaptionSegments?.length > 0 ? (
                                <span className="text-xs text-slate-500 italic leading-snug whitespace-nowrap w-72 shrink-0">
                                  &larr; {feedback.equationHighlight.bottomCaptionSegments.map((seg, i) => (
                                    <span
                                      key={i}
                                      className={seg.kind === 'p'
                                        ? 'bg-purple-100 text-purple-800 rounded px-0.5'
                                        : seg.kind === 'g'
                                          ? 'bg-green-100 text-green-800 rounded px-0.5'
                                          : ''}
                                    >
                                      {seg.text}
                                    </span>
                                  ))}
                                </span>
                              ) : feedback.equationHighlight.bottomCaption ? (
                                <span className="text-xs text-slate-500 italic leading-snug whitespace-nowrap w-72 shrink-0">&larr; {renderCaptionWithRedUnderline(feedback.equationHighlight.bottomCaption)}</span>
                              ) : null}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="w-4 shrink-0" />
                            <Latex math={feedback.equationHighlight.left} />
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-4 shrink-0 text-right font-mono">=</span>
                            <div className="flex-1 min-w-0 overflow-x-auto">
                              <div className="inline-flex items-center gap-1 whitespace-nowrap">
                                {feedback.equationHighlight.segments.map((seg, idx) => (
                                  seg.kind === 'op' ? (
                                    <span key={idx} className="px-1 text-red-700 font-bold"><Latex math={seg.tex} /></span>
                                  ) : seg.kind === 'plain' ? (
                                    <span key={idx} className={`px-1 text-slate-700 ${seg.underline ? 'border-b-2 border-red-600 pb-0.5' : ''} ${seg.joinNext ? '-mr-1 rounded-r-none' : ''} ${seg.joinPrev ? 'rounded-l-none' : ''}`}>
                                      <Latex math={seg.tex} />
                                    </span>
                                  ) : (
                                    <span
                                      key={idx}
                                      className={`${seg.kind === 'p'
                                        ? 'bg-purple-100 text-purple-800 rounded px-1'
                                        : seg.kind === 'g'
                                          ? 'bg-green-100 text-green-800 rounded px-1'
                                          : seg.kind === 'a'
                                            ? 'bg-yellow-200 text-amber-900 rounded px-1'
                                            : 'bg-cyan-200 text-cyan-900 rounded px-1'} ${seg.underline ? 'border-b-2 border-red-600 pb-0.5' : ''} ${seg.joinNext ? '-mr-1 rounded-r-none' : ''} ${seg.joinPrev ? 'rounded-l-none' : ''}`}
                                    >
                                      <Latex math={seg.tex} />
                                    </span>
                                  )
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="font-mono"><Latex math={feedback.answer || ''} /></span>
                  )}
                </div>
                {/* 解題步驟 */}
                {feedback.steps && feedback.steps.length > 0 && !feedback.hideLegacyStepsBlock && (
                  <div className={`mt-3 border-t pt-2 ${feedback.type === 'correct' ? 'border-green-300' : 'border-red-300'}`}>
                    <p className={`text-xs font-bold mb-1 ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>解題步驟：</p>
                    {feedback.stepEquationHighlight?.topSegments?.length > 0 && (
                      <div className="mb-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-4 shrink-0" />
                          <div className="flex items-center flex-wrap gap-1">
                            {feedback.stepEquationHighlight.topSegments.map((seg, idx) => (
                              <span
                                key={idx}
                                className={seg.kind === 'op'
                                  ? 'px-1 text-red-700 font-bold'
                                  : 'bg-yellow-200 text-slate-800 rounded px-1'}
                              >
                                {seg.kind === 'op' ? <Latex math={seg.tex} /> : <Latex math={seg.tex} />}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 shrink-0 text-right font-mono text-slate-700">=</span>
                          <div className="flex items-center flex-wrap gap-1">
                            {feedback.stepEquationHighlight.segments.map((seg, idx) => (
                              <span
                                key={idx}
                                className={seg.kind === 'op'
                                  ? 'px-1 text-red-700 font-bold'
                                  : 'bg-yellow-200 text-slate-800 rounded px-1'}
                              >
                                {seg.kind === 'op' ? <Latex math={seg.tex} /> : <Latex math={seg.tex} />}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
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
                  {quizType === 'dse' && dseInputStage === 'setup' ? '提交列式' : '提交答案'}
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
