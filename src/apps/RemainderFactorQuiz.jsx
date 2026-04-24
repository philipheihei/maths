import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, BookOpen, Calculator, GraduationCap, ArrowRight, ArrowLeft, Trophy, Check, X, RefreshCw, Lightbulb, Delete, SkipForward } from 'lucide-react';

// --- Button Component (from AlgebraicFractionsQuiz) ---
const Button = ({ onClick, children, className = "", variant = "primary", disabled = false }) => {
  const baseStyle = "flex items-center justify-center font-bold transition-all active:scale-95 select-none touch-manipulation";
  
  const variants = {
    primary: "px-4 py-3 bg-teal-600 text-white rounded-xl shadow-md active:bg-teal-700",
    secondary: "px-4 py-3 bg-cyan-600 text-white rounded-xl shadow-md active:bg-cyan-700",
    outline: "px-2 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50",
    
    keyNum: "h-14 bg-gray-100 text-gray-800 text-2xl rounded-lg shadow-[0_2px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]",
    keyOp: "h-14 bg-orange-100 text-orange-900 text-xl rounded-lg shadow-[0_2px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]",
    keyAction: "h-14 bg-red-100 text-red-900 text-lg rounded-lg shadow-[0_2px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]",
    keyFunction: "h-14 bg-gray-300 text-gray-900 text-lg rounded-lg shadow-[0_2px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]",
    keyNext: "h-14 bg-teal-100 text-teal-900 text-lg rounded-lg shadow-[0_2px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// KaTeX loader
let katexLoadPromise = null;
const loadKatexOnce = () => {
  if (katexLoadPromise) return katexLoadPromise;
  katexLoadPromise = new Promise((resolve, reject) => {
    if (window.katex) { resolve(); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return katexLoadPromise;
};

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
          displayMode: block
        });
      } catch (e) {
        console.error("KaTeX render error:", e);
        containerRef.current.textContent = math;
      }
    }
  }, [math, block, isLoaded]);

  return <span ref={containerRef} className={block ? "block text-center my-2" : "inline-block"} />;
};

// 分數顯示組件 (使用 KaTeX)
const FractionDisplay = ({ value }) => {
  if (!value || typeof value !== 'string') return value;
  
  // 檢查是否包含斜線
  if (value.includes('/')) {
    const parts = value.split('/');
    if (parts.length === 2) {
      const numerator = parts[0].trim();
      const denominator = parts[1].trim();
      // 使用 KaTeX 顯示分數
      return <Latex math={`\\frac{${numerator}}{${denominator}}`} />;
    }
  }
  
  return value;
};

// ========================================
// 教學筆記頁面
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

  // 監聽滾動以更新目錄高亮
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { num: 1, ref: section1Ref },
        { num: 2, ref: section2Ref },
        { num: 3, ref: section3Ref }
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
    { num: 1, title: '餘式定理', color: 'teal' },
    { num: 2, title: '因式定理', color: 'orange' },
    { num: 3, title: 'DSE實戰', color: 'blue' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* 頂部導航 */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <HomeIcon className="w-5 h-5" />
            <span className="text-sm font-medium">返回主頁</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-teal-600">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">教學筆記</span>
            </div>
            <button
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow hover:from-teal-600 hover:to-cyan-600 transition-all flex items-center gap-2"
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
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-teal-500">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-8 h-8 text-teal-600" />
              <h1 className="text-2xl font-bold text-slate-800">餘式定理 & 因式定理</h1>
            </div>
            <p className="text-slate-600">掌握多項式除法的核心技巧</p>
          </div>

          {/* Section 1: 餘式定理 */}
          <div ref={section1Ref} className="bg-white rounded-2xl shadow-lg p-6 mb-6 scroll-mt-24">
            <h2 className="text-xl font-bold text-teal-700 flex items-center gap-2 mb-4">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">1</span>
              餘式定理
            </h2>

            <div className="space-y-4">
              {/* 核心概念 */}
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <h3 className="font-bold text-teal-800 mb-3">📝 核心概念</h3>
                <p className="text-slate-700 mb-3">
                  當 <Latex math="f(x)" /> 除以<span className="text-red-600 font-bold">除式</span>，所得的餘數可以用 <Latex math="f(\text{相反數})" /> 求得
                </p>
                
                <div className="bg-white rounded-lg p-3 mb-3">
                  <p className="text-sm text-slate-600 mb-2">例子：</p>
                  <p className="text-slate-700">
                    <Latex math="f(x)" /> 除以 <span className="bg-yellow-200 px-1 rounded"><Latex math="x + 3" /></span>，所得的餘數是 <Latex math="-8" />
                  </p>
                  <div className="mt-2 pl-4 border-l-2 border-teal-300">
                    <p className="text-sm text-slate-600">
                      <span className="text-green-600 font-bold">3</span> 的相反是 <span className="text-red-600 font-bold">-3</span>
                    </p>
                    <p className="text-lg mt-1">
                      <Latex math="f(-3) = -8" /> ← <span className="text-sm text-slate-500">填餘數</span>
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-amber-800 text-sm">
                    📌 註：做長答題時，如果題目沒有提及 <Latex math="f(x)" />，需設 <Latex math="f(x)" />
                  </p>
                </div>
              </div>

              {/* Step 1: 找相應的 f(x) */}
              <div className="bg-white rounded-lg p-4 border border-teal-200">
                <h3 className="font-bold text-teal-700 mb-3">Step 1：找相應的 <Latex math="f(x)" /></h3>
                <p className="text-sm text-red-600 font-medium mb-3">Case 1：找相反數</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-3 text-slate-600">除式</th>
                        <th className="text-left py-2 px-3 text-slate-600">找</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b border-slate-100">
                        <td className="py-2 px-3">除以 <Latex math="x + 3" /></td>
                        <td className="py-2 px-3">→ 找 <Latex math="f(-3)" /></td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 px-3">除以 <Latex math="x - 4" /></td>
                        <td className="py-2 px-3">→ 找 <Latex math="f(4)" /></td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 px-3">除以 <Latex math="2x + 5" /></td>
                        <td className="py-2 px-3">→ 找 <Latex math="f(-\frac{5}{2})" /></td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">除以 <Latex math="3x - 7" /></td>
                        <td className="py-2 px-3">→ 找 <Latex math="f(\frac{7}{3})" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-bold">💡 技巧（當 <Latex math="ax + b" /> 形式）：</span>
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span><Latex math="ax + b = 0" /></span>
                    <span>→</span>
                    <span><Latex math="x = -\frac{b}{a}" /></span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    <span className="bg-cyan-200 px-1 rounded">前面數字</span>放分母，
                    <span className="bg-pink-200 px-1 rounded">後面數字相反數</span>放分子
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 因式定理 */}
          <div ref={section2Ref} className="bg-white rounded-2xl shadow-lg p-6 mb-6 scroll-mt-24">
            <h2 className="text-xl font-bold text-orange-700 flex items-center gap-2 mb-4">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">2</span>
              因式定理
            </h2>

            <div className="space-y-4">
              {/* 核心概念 */}
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-bold text-orange-800 mb-3">📝 核心概念</h3>
                <p className="text-slate-700 mb-2">
                  因式定理 = 餘式定理的<span className="bg-yellow-200 px-1 rounded font-bold">餘數 = 0</span> 版本
                </p>
                
                <div className="bg-white rounded-lg p-3 space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">例子 1：</p>
                    <p className="text-slate-700">
                      <Latex math="f(x)" /> 可被 <Latex math="x - 2" /> <span className="bg-yellow-200 px-1 rounded font-bold">整除</span>
                    </p>
                    <p className="text-lg mt-1 pl-4">
                      → <Latex math="f(2) = 0" />
                    </p>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-3">
                    <p className="text-sm text-slate-600 mb-1">例子 2：</p>
                    <p className="text-slate-700">
                      已知 <Latex math="x + 3" /> 是 <Latex math="f(x)" /> 的<span className="bg-yellow-200 px-1 rounded font-bold">因式</span>
                    </p>
                    <p className="text-lg mt-1 pl-4">
                      → <Latex math="f(-3) = 0" />
                    </p>
                  </div>
                </div>
              </div>

              {/* 證明題型 */}
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <h3 className="font-bold text-orange-700 mb-3">📋 證明題型</h3>
                
                <div className="bg-amber-50 rounded-lg p-3">
                  <p className="text-sm text-slate-600 mb-2">例：題目：證明 <Latex math="x + 4" /> 是 <Latex math="f(x)" /> 的因式</p>
                  <div className="mt-2 space-y-2">
                    <p className="text-slate-700">
                      → <Latex math="f(-4)" /> 是否 <Latex math="= 0" /> ？
                    </p>
                    <div className="flex items-center gap-4 text-sm mt-2">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">= 0 → Yes ✓</span>
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">≠ 0 → No ✗</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 關鍵字對照 */}
              <div className="bg-gradient-to-r from-teal-50 to-orange-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-bold text-slate-700 mb-3">🔑 關鍵字對照</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-bold text-teal-600 mb-2">餘式定理</p>
                    <ul className="space-y-1 text-slate-600">
                      <li>• 除以...</li>
                      <li>• 餘數為...</li>
                      <li>• 餘數相等</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-bold text-orange-600 mb-2">因式定理</p>
                    <ul className="space-y-1 text-slate-600">
                      <li>• 整除</li>
                      <li>• ...的因式</li>
                      <li>• 可被...除盡</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 第 3 節 */}
          <div ref={section3Ref} className="bg-white rounded-2xl shadow-lg p-6 mb-6 scroll-mt-24">
            <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">3</span>
              DSE實戰
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3">📝 經典題型</h3>
                
                <div className="bg-white rounded-lg p-4 border border-slate-200 mb-4 shadow-sm">
                  <p className="text-slate-700 mb-2 leading-loose">
                    設 <Latex math="f(x) = 2x^3 + hx^2 + kx - 5" />，其中 <Latex math="h" /> 及 <Latex math="k" /> 均為常數。
                    當 <Latex math="f(x)" /> 除以 <Latex math="x + 1" /> 時，餘數為 <Latex math="-12" />。
                    已知 <Latex math="f(x)" /> 可被 <Latex math="2x - 1" /> 整除。
                  </p>
                  <div className="text-slate-700 font-medium">
                    <p>(a) 求 <Latex math="h" /> 及 <Latex math="k" />。</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-2 mb-3">建議步驟</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-slate-600 mb-1 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-xs font-bold">1</span>
                        利用餘式定理，代入 <Latex math="x = -1" />：
                      </p>
                      <div className="pl-4 mt-2">
                        <Latex
                          block
                          math={"\\begin{aligned}"
                            + "f(-1) &= -12 \\\\"
                            + "2(-1)^3 + h(-1)^2 + k(-1) - 5 &= -12 \\\\"
                            + "-2 + h - k - 5 &= -12 \\\\"
                            + "h - k &= -5 \\quad \\cdots\\,(1)"
                            + "\\end{aligned}"}
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-3">
                      <p className="text-slate-600 mb-1 flex items-center gap-2">
                        <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs font-bold">2</span>
                        利用因式定理，代入 <Latex math="x = \dfrac{1}{2}" />：
                      </p>
                      <div className="pl-4 mt-2">
                        <Latex
                          block
                          math={"\\begin{aligned}"
                            + "f\\left(\\frac{1}{2}\\right) &= 0 \\\\"
                            + "2\\left(\\frac{1}{2}\\right)^3 + h\\left(\\frac{1}{2}\\right)^2 + k\\left(\\frac{1}{2}\\right) - 5 &= 0 \\\\"
                            + "\\frac{1}{4} + \\frac{1}{4}h + \\frac{1}{2}k - 5 &= 0 \\\\"
                            + "\\frac{1}{4}h + \\frac{1}{2}k &= \\frac{19}{4} \\quad \\cdots\\,(2)"
                            + "\\end{aligned}"}
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-3">
                      <p className="text-slate-800 font-semibold">
                        答案：<Latex math="h=3" />，<Latex math="k=8" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 開始測驗按鈕 - 底部 */}
          <div className="text-center pb-8">
            <button
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
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
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState({ input1: '', input2: '' });
  const [feedback, setFeedback] = useState({ type: 'neutral', msg: '' });
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isAnswered, setIsAnswered] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [activeInput, setActiveInput] = useState('input1');

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  // GCD 函數 (最大公約數)
  const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  // 鍵盤輸入處理
  const handleKeyPad = (value) => {
    if (isAnswered) return;

    const setters = { 'input1': (val) => setAnswers(prev => ({ ...prev, input1: val })), 'input2': (val) => setAnswers(prev => ({ ...prev, input2: val })) };
    const currentSetter = setters[activeInput];
    const currentVal = answers[activeInput];

    if (value === 'DEL') {
      currentSetter(currentVal.slice(0, -1));
    } else if (value === 'CLEAR') {
      currentSetter("");
    } else if (value === 'NEXT') {
      // 切換到下一個輸入框
      if (activeInput === 'input1') {
        setActiveInput('input2');
        input2Ref.current?.focus();
      } else {
        // 如果已經在最後一個，則提交
        if (answers.input1.trim() && answers.input2.trim()) {
          handleSubmit();
        }
      }
    } else if (value === '/') {
      // 分數斜線 - 只允許一個
      if (currentVal.includes('/')) return;
      currentSetter(currentVal + '/');
    } else {
      currentSetter(currentVal + value);
    }
  };

  // 生成題目
  const generateQuestion = () => {
    const types = ['remainder', 'factor_divisible', 'factor_is_factor', 'equal_remainder'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // 生成除式係數 (確保 a 和 b 互質)
    let a, b;
    do {
      const useAx = Math.random() > 0.5;
      a = useAx ? [2, 3, 4, 5][Math.floor(Math.random() * 4)] : 1;
      b = [-7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7][Math.floor(Math.random() * 14)];
    } while (gcd(a, b) !== 1); // 確保 a 和 b 互質
    
    // 計算 f() 內的值：ax + b = 0，x = -b/a
    const numerator = -b;
    const denominator = a;
    
    // 格式化答案
    const formatAnswer = () => {
      if (denominator === 1) {
        return numerator.toString();
      } else {
        const sign = numerator * denominator < 0 ? '-' : '';
        const absNum = Math.abs(numerator);
        const absDen = Math.abs(denominator);
        return `${sign}${absNum}/${absDen}`;
      }
    };
    
    // 格式化除式顯示
    const formatDivisor = () => {
      const bSign = b > 0 ? '+' : '-';
      const absB = Math.abs(b);
      if (a === 1) {
        return `x ${bSign} ${absB}`;
      }
      return `${a}x ${bSign} ${absB}`;
    };
    
    // 將分數轉為 LaTeX（如 "1/4" → "\\dfrac{1}{4}"）
    const toLatexVal = (val) => {
      if (typeof val === 'string' && val.includes('/')) {
        const neg = val.startsWith('-');
        const stripped = neg ? val.slice(1) : val;
        const [num, den] = stripped.split('/');
        return `${neg ? '-' : ''}\\dfrac{${num}}{${den}}`;
      }
      return val;
    };

    const funcName = ['f', 'g', 'p', 'h'][Math.floor(Math.random() * 4)];
    const divisor = formatDivisor();
    const answerValue = formatAnswer();
    const latexVal = toLatexVal(answerValue);
    
    let question, correctAnswers, explanation, explanationLatex, template;
    
    switch (type) {
      case 'remainder': {
        const remainder = Math.floor(Math.random() * 21) - 10; // -10 to 10
        question = `當 ${funcName}(x) 除以 ${divisor} ，餘數為 ${remainder}`;
        correctAnswers = {
          input1: answerValue,
          input2: remainder.toString()
        };
        explanation = `將 ${divisor} = 0，得 x = ${answerValue}，所以 ${funcName}(${answerValue}) = ${remainder}`;
        explanationLatex = `\\begin{aligned}& \\text{將 } ${divisor} = 0\\text{，得 } x = ${latexVal} \\\\ & \\therefore ${funcName}(${latexVal}) = ${remainder}\\end{aligned}`;
        template = { type: 'standard', funcName, answerValue, remainder };
        break;
      }
      
      case 'factor_divisible': {
        question = `${funcName}(x) 可被 ${divisor} 整除`;
        correctAnswers = {
          input1: answerValue,
          input2: '0'
        };
        explanation = `「整除」即餘數為 0。將 ${divisor} = 0，得 x = ${answerValue}，所以 ${funcName}(${answerValue}) = 0`;
        explanationLatex = `\\begin{aligned}& \\text{「整除」即餘數為 } 0 \\\\ & \\text{將 } ${divisor} = 0\\text{，得 } x = ${latexVal} \\\\ & \\therefore ${funcName}(${latexVal}) = 0\\end{aligned}`;
        template = { type: 'standard', funcName, answerValue, remainder: 0 };
        break;
      }
      
      case 'factor_is_factor': {
        question = `已知 ${divisor} 是 ${funcName}(x) 的因式`;
        correctAnswers = {
          input1: answerValue,
          input2: '0'
        };
        explanation = `「因式」即餘數為 0。將 ${divisor} = 0，得 x = ${answerValue}，所以 ${funcName}(${answerValue}) = 0`;
        explanationLatex = `\\begin{aligned}& \\text{「因式」即餘數為 } 0 \\\\ & \\text{將 } ${divisor} = 0\\text{，得 } x = ${latexVal} \\\\ & \\therefore ${funcName}(${latexVal}) = 0\\end{aligned}`;
        template = { type: 'standard', funcName, answerValue, remainder: 0 };
        break;
      }
      
      case 'equal_remainder': {
        // 生成第二個除式 (確保 a2 和 b2 互質)
        let a2, b2;
        do {
          const useAx2 = Math.random() > 0.5;
          a2 = useAx2 ? [2, 3, 4, 5][Math.floor(Math.random() * 4)] : 1;
          b2 = [-7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7][Math.floor(Math.random() * 14)];
        } while (gcd(a2, b2) !== 1 || (a2 === a && b2 === b)); // 確保互質且不同於第一個除式
        
        const numerator2 = -b2;
        const denominator2 = a2;
        
        const formatAnswer2 = () => {
          if (denominator2 === 1) {
            return numerator2.toString();
          } else {
            const sign = numerator2 * denominator2 < 0 ? '-' : '';
            const absNum = Math.abs(numerator2);
            const absDen = Math.abs(denominator2);
            return `${sign}${absNum}/${absDen}`;
          }
        };
        
        const formatDivisor2 = () => {
          const bSign = b2 > 0 ? '+' : '-';
          const absB = Math.abs(b2);
          if (a2 === 1) {
            return `x ${bSign} ${absB}`;
          }
          return `${a2}x ${bSign} ${absB}`;
        };
        
        const divisor2 = formatDivisor2();
        const answerValue2 = formatAnswer2();
        const latexVal2 = toLatexVal(answerValue2);
        
        question = `當 ${funcName}(x) 除以 ${divisor} 時及當 ${funcName}(x) 除以 ${divisor2} 時，所得的兩餘數相等`;
        correctAnswers = {
          input1: answerValue,
          input2: answerValue2
        };
        explanation = `餘數相等即 ${funcName}(${answerValue}) = ${funcName}(${answerValue2})`;
        explanationLatex = `\\begin{aligned}& \\text{除式一：} ${divisor} = 0 \\Rightarrow x = ${latexVal} \\\\ & \\text{除式二：} ${divisor2} = 0 \\Rightarrow x = ${latexVal2} \\\\ & \\text{餘數相等即 } ${funcName}(${latexVal}) = ${funcName}(${latexVal2})\\end{aligned}`;
        template = { type: 'equal', funcName, answerValue, answerValue2 };
        break;
      }
      
      default:
        break;
    }
    
    return { question, correctAnswers, explanation, explanationLatex, template, type };
  };

  // 初始化
  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, []);

  // 檢查答案
  const normalizeAnswer = (ans) => {
    return ans.replace(/\s+/g, '').replace(/\+/g, '');
  };

  const handleSubmit = () => {
    if (!answers.input1.trim() || !answers.input2.trim() || isAnswered) return;
    
    const norm1 = normalizeAnswer(answers.input1);
    const norm2 = normalizeAnswer(answers.input2);
    const correct1 = normalizeAnswer(currentQuestion.correctAnswers.input1);
    const correct2 = normalizeAnswer(currentQuestion.correctAnswers.input2);
    
    // 對於 equal_remainder，兩個順序都可以
    let isCorrect;
    if (currentQuestion.type === 'equal_remainder') {
      isCorrect = (norm1 === correct1 && norm2 === correct2) || 
                  (norm1 === correct2 && norm2 === correct1);
    } else {
      isCorrect = norm1 === correct1 && norm2 === correct2;
    }
    
    setIsAnswered(true);
    
    if (isCorrect) {
      setFeedback({
        type: 'correct',
        explanationLatex: currentQuestion.explanationLatex
      });
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      const template = currentQuestion.template;
      let correctDisplay;
      if (template.type === 'standard') {
        correctDisplay = { type: 'standard', funcName: template.funcName, val1: template.answerValue, val2: template.remainder.toString() };
      } else {
        correctDisplay = { type: 'equal', funcName: template.funcName, val1: template.answerValue, val2: template.answerValue2 };
      }
      setFeedback({
        type: 'incorrect',
        explanationLatex: currentQuestion.explanationLatex,
        correctDisplay
      });
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleNext = () => {
    setCurrentQuestion(generateQuestion());
    setAnswers({ input1: '', input2: '' });
    setFeedback({ type: 'neutral', msg: '' });
    setIsAnswered(false);
    setActiveInput('input1');
    setTimeout(() => input1Ref.current?.focus(), 100);
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      if (isAnswered) {
        handleNext();
      } else if (nextRef) {
        nextRef.current?.focus();
      } else {
        handleSubmit();
      }
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 pb-4">
      <div className="flex flex-col md:flex-row max-w-4xl mx-auto p-4 gap-4">
        
        {/* 主內容區域 */}
        <main className="flex-1 min-w-0">
          {/* 頂部導航 */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={onBackToTeaching}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回筆記</span>
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
              >
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm font-medium">提示</span>
              </button>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-slate-700">{score.correct}/{score.total}</span>
              </div>
            </div>
          </div>

          {/* 標題 */}
          <div className="rounded-xl p-4 mb-4 bg-teal-100">
            <h2 className="text-lg font-bold text-teal-700">
              📐 餘式定理 & 因式定理 Quiz
            </h2>
          </div>

          {/* 題目卡片 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <p className="text-sm text-slate-500 mb-2">根據以下條件，填寫相應列式：</p>
          
          {/* 題目 */}
          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <p className="text-lg text-slate-800">{currentQuestion.question}</p>
          </div>

          {/* 答案區域 */}
          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-3">填寫步驟：</p>
            
            {currentQuestion.template.type === 'standard' ? (
              <div className="flex items-center gap-2 text-xl justify-center flex-wrap">
                <Latex math={`${currentQuestion.template.funcName}(`} />
                <div className="relative inline-flex items-center">
                  {isAnswered && answers.input1 ? (
                    <div className={`min-w-[5rem] border-2 rounded-lg px-2 py-1 text-center font-mono bg-gray-100 ${activeInput === 'input1' ? 'border-teal-500 bg-teal-50' : 'border-slate-300'} flex items-center justify-center`}>
                      <FractionDisplay value={answers.input1} />
                    </div>
                  ) : (
                    <input
                      ref={input1Ref}
                      type="text"
                      value={answers.input1}
                      onChange={(e) => setAnswers(prev => ({ ...prev, input1: e.target.value }))}
                      onKeyDown={(e) => handleKeyDown(e, input2Ref)}
                      onFocus={() => setActiveInput('input1')}
                      disabled={isAnswered}
                      className={`w-20 border-2 rounded-lg px-2 py-1 text-center font-mono focus:outline-none disabled:bg-gray-100 ${activeInput === 'input1' ? 'border-teal-500 bg-teal-50' : 'border-slate-300'}`}
                      placeholder="?"
                    />
                  )}
                </div>
                <span className="font-mono">) =</span>
                <div className="relative inline-flex items-center">
                  {isAnswered && answers.input2 ? (
                    <div className={`min-w-[5rem] border-2 rounded-lg px-2 py-1 text-center font-mono bg-gray-100 ${activeInput === 'input2' ? 'border-teal-500 bg-teal-50' : 'border-slate-300'} flex items-center justify-center`}>
                      <FractionDisplay value={answers.input2} />
                    </div>
                  ) : (
                    <input
                      ref={input2Ref}
                      type="text"
                      value={answers.input2}
                      onChange={(e) => setAnswers(prev => ({ ...prev, input2: e.target.value }))}
                      onKeyDown={(e) => handleKeyDown(e, null)}
                      onFocus={() => setActiveInput('input2')}
                      disabled={isAnswered}
                      className={`w-20 border-2 rounded-lg px-2 py-1 text-center font-mono focus:outline-none disabled:bg-gray-100 ${activeInput === 'input2' ? 'border-teal-500 bg-teal-50' : 'border-slate-300'}`}
                      placeholder="?"
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xl justify-center flex-wrap">
                <Latex math={`${currentQuestion.template.funcName}(`} />
                <div className="relative inline-flex items-center">
                  {isAnswered && answers.input1 ? (
                    <div className={`min-w-[5rem] border-2 rounded-lg px-2 py-1 text-center font-mono bg-gray-100 ${activeInput === 'input1' ? 'border-teal-500 bg-teal-50' : 'border-slate-300'} flex items-center justify-center`}>
                      <FractionDisplay value={answers.input1} />
                    </div>
                  ) : (
                    <input
                      ref={input1Ref}
                      type="text"
                      value={answers.input1}
                      onChange={(e) => setAnswers(prev => ({ ...prev, input1: e.target.value }))}
                      onKeyDown={(e) => handleKeyDown(e, input2Ref)}
                      onFocus={() => setActiveInput('input1')}
                      disabled={isAnswered}
                      className={`w-20 border-2 rounded-lg px-2 py-1 text-center font-mono focus:outline-none disabled:bg-gray-100 ${activeInput === 'input1' ? 'border-teal-500 bg-teal-50' : 'border-slate-300'}`}
                      placeholder="?"
                    />
                  )}
                </div>
                <Latex math={`) = ${currentQuestion.template.funcName}(`} />
                <div className="relative inline-flex items-center">
                  {isAnswered && answers.input2 ? (
                    <div className={`min-w-[5rem] border-2 rounded-lg px-2 py-1 text-center font-mono bg-gray-100 ${activeInput === 'input2' ? 'border-teal-500 bg-teal-50' : 'border-slate-300'} flex items-center justify-center`}>
                      <FractionDisplay value={answers.input2} />
                    </div>
                  ) : (
                    <input
                      ref={input2Ref}
                      type="text"
                      value={answers.input2}
                      onChange={(e) => setAnswers(prev => ({ ...prev, input2: e.target.value }))}
                      onKeyDown={(e) => handleKeyDown(e, null)}
                      onFocus={() => setActiveInput('input2')}
                      disabled={isAnswered}
                      className={`w-20 border-2 rounded-lg px-2 py-1 text-center font-mono focus:outline-none disabled:bg-gray-100 ${activeInput === 'input2' ? 'border-teal-500 bg-teal-50' : 'border-slate-300'}`}
                      placeholder="?"
                    />
                  )}
                </div>
                <span className="font-mono">)</span>
              </div>
            )}
          </div>

          {/* 回饋 */}
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
              {feedback.type === 'incorrect' && feedback.correctDisplay && (
                <div className={`mb-2 text-lg flex items-center justify-center gap-1 flex-wrap ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                  <span className="font-bold mr-1">正確答案：</span>
                  <Latex math={`${feedback.correctDisplay.funcName}(`} />
                  <FractionDisplay value={feedback.correctDisplay.val1} />
                  {feedback.correctDisplay.type === 'equal' ? (
                    <Latex math={`) = ${feedback.correctDisplay.funcName}(`} />
                  ) : (
                    <Latex math=") =" />
                  )}
                  <FractionDisplay value={feedback.correctDisplay.val2} />
                  {feedback.correctDisplay.type === 'equal' && <Latex math=")" />}
                </div>
              )}
              {feedback.explanationLatex && (
                <div className={`mt-2 ${feedback.type === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                  <Latex math={feedback.explanationLatex} block />
                </div>
              )}
            </div>
          )}

          {/* 按鈕 */}
          <div className="flex gap-3 mb-4">
            {!isAnswered ? (
              <button
                onClick={handleSubmit}
                disabled={!answers.input1.trim() || !answers.input2.trim()}
                className="flex-1 bg-teal-500 text-white py-3 rounded-lg font-bold hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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

          {/* 鍵盤 */}
          <div className="grid grid-cols-4 gap-2">
            <Button variant="keyNum" onClick={() => handleKeyPad('7')}>7</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('8')}>8</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('9')}>9</Button>
            <Button variant="keyOp" onClick={() => handleKeyPad('-')}>-</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('4')}>4</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('5')}>5</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('6')}>6</Button>
            <Button variant="keyOp" onClick={() => handleKeyPad('/')} className="bg-orange-100 flex flex-col items-center justify-center gap-0.5" title="Fraction">
              <div className="w-4 h-4 border-2 border-orange-800 rounded-sm"></div>
              <div className="w-6 h-0.5 bg-orange-800"></div>
              <div className="w-4 h-4 border-2 border-orange-800 border-dashed rounded-sm opacity-50"></div>
            </Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('1')}>1</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('2')}>2</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('3')}>3</Button>
            <Button variant="keyOp" onClick={() => handleKeyPad('+')}>+</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('0')}>0</Button>
            <Button variant="keyAction" onClick={() => handleKeyPad('DEL')}><Delete className="w-5 h-5" /></Button>
            <Button
              variant="keyNext"
              onClick={() => handleKeyPad('NEXT')}
              className="col-span-2 flex items-center justify-center gap-1"
            >
              NEXT
            </Button>
          </div>
        </div>

        {/* 提示彈窗 */}
        {showNotes && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">💡 快速提示</h3>
                <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="bg-teal-50 p-3 rounded-lg">
                  <p className="font-bold text-teal-700 mb-1">餘式定理</p>
                  <p>除以 <Latex math="ax + b" /> → 找 <Latex math="f(-\frac{b}{a})" /></p>
                </div>
                
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="font-bold text-orange-700 mb-1">因式定理</p>
                  <p>「整除」或「因式」→ 餘數 = 0</p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-bold text-blue-700 mb-1">技巧</p>
                  <p><Latex math="x + 3" /> → <Latex math="f(-3)" /></p>
                  <p><Latex math="2x - 5" /> → <Latex math="f(\frac{5}{2})" /></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>


    </div>
    </div>
  );
};

// ========================================
// 主應用程式
// ========================================
const RemainderFactorQuiz = () => {
  const [currentPage, setCurrentPage] = useState('teaching');

  return currentPage === 'teaching' ? (
    <TeachingPage onStartQuiz={() => setCurrentPage('quiz')} />
  ) : (
    <QuizPage onBackToTeaching={() => setCurrentPage('teaching')} />
  );
};

export default RemainderFactorQuiz;
