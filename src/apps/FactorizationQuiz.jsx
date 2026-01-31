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

// ========================================
// 教學筆記頁面
// ========================================
const TeachingPage = ({ onStartQuiz }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 頂部導航 */}
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <HomeIcon className="w-5 h-5" />
            <span className="text-sm font-medium">返回主頁</span>
          </Link>
          <div className="flex items-center gap-2 text-purple-600">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">教學筆記</span>
          </div>
        </div>

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
            📌 因式分解重點：題目沒括號 ➜ 答案加括號！
          </p>
        </div>

        {/* Section 1: 提取公因式 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <button 
            onClick={() => toggleSection(1)}
            className="w-full flex items-center justify-between"
          >
            <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">1</span>
              提取公因式
            </h2>
            {openSection === 1 ? <ChevronUp className="w-6 h-6 text-purple-500" /> : <ChevronDown className="w-6 h-6 text-purple-500" />}
          </button>

          {openSection === 1 && (
            <div className="mt-4 space-y-4 animate-fade-in">
              {/* 分析題目 */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-bold text-purple-800 mb-3">📝 分析題目</h3>
                <p className="text-slate-700 mb-2">若所有項都出現相同代數/因數時可<span className="text-red-600 font-bold">抽取</span></p>
                
                <div className="bg-white rounded-lg p-3 mb-3">
                  <p className="text-sm text-slate-600 mb-2">例子 1：找出共同因數</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Latex math="-6uv - 8vw" />
                    <span className="text-slate-500">=</span>
                    <Latex math="-2v(3u + 4w)" />
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="bg-yellow-200 px-1 rounded">-6 和 -8</span> 的公因數是 <span className="text-red-600 font-bold">-2</span>
                    <span className="ml-2">（6÷2=3，8÷2=4）</span>
                  </div>
                  <div className="text-sm">
                    <span className="bg-green-200 px-1 rounded">v</span> 是完全相同的代數
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-slate-600 mb-2">例子 2：處理次方的數學</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Latex math="m^3n - 3mn^2" />
                    <span className="text-slate-500">=</span>
                    <Latex math="mn(m^2 - 3n)" />
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    抽走了一個 m，還有 m² ；抽走了一個 n，還有 n
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
          )}
        </div>

        {/* Section 2: 併項法 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <button 
            onClick={() => toggleSection(2)}
            className="w-full flex items-center justify-between"
          >
            <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">2</span>
              併項法（分組因式分解）
            </h2>
            {openSection === 2 ? <ChevronUp className="w-6 h-6 text-blue-500" /> : <ChevronDown className="w-6 h-6 text-blue-500" />}
          </button>

          {openSection === 2 && (
            <div className="mt-4 space-y-4 animate-fade-in">
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
                <div className="space-y-1">
                  <Latex math="bm + bn + 5m + 5n" block />
                  <Latex math="= b(m+n) + 5(m+n)" block />
                  <Latex math="= (m+n)(b+5)" block />
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-slate-600 mb-2">例子 2：已有括號</p>
                <div className="space-y-1">
                  <Latex math="(2x-5) - (2x-5)y" block />
                  <Latex math="= (2x-5)(1-y)" block />
                </div>
                <p className="text-sm text-slate-500 mt-2">💡 抽相同括號放前，剩餘部分放後括號</p>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: 二次多項式 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <button 
            onClick={() => toggleSection(3)}
            className="w-full flex items-center justify-between"
          >
            <h2 className="text-xl font-bold text-green-700 flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">3</span>
              二次多項式（十字相乘法 / FMLA 01）
            </h2>
            {openSection === 3 ? <ChevronUp className="w-6 h-6 text-green-500" /> : <ChevronDown className="w-6 h-6 text-green-500" />}
          </button>

          {openSection === 3 && (
            <div className="mt-4 space-y-4 animate-fade-in">
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
                      <span>開啟 FMLA 01（按 MODE → 方程式）</span>
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
                  <p className="text-sm font-bold text-slate-700 mb-2">例子：<Latex math="8x^2 - 17x - 21" /></p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="font-bold text-center mb-1">答案 1（整數）</p>
                      <p className="text-center text-2xl font-mono">3</p>
                      <p className="text-center text-xs text-slate-500 mt-1">→ 相反數：-3</p>
                      <p className="text-center text-xs text-slate-500">→ 括號：<Latex math="(x-3)" /></p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="font-bold text-center mb-1">答案 2（分數）</p>
                      <p className="text-center text-2xl font-mono">-0.875</p>
                      <p className="text-center text-xs text-slate-500 mt-1">= <Latex math="-\frac{7}{8}" /></p>
                      <p className="text-center text-xs text-slate-500">分母放前，分子相反數放後</p>
                      <p className="text-center text-xs text-slate-500">→ 括號：<Latex math="(8x+7)" /></p>
                    </div>
                  </div>
                  <p className="text-center mt-3 font-bold text-green-700">
                    ∴ 答案 = <Latex math="(x-3)(8x+7)" />
                  </p>
                </div>
              </div>

              {/* 次序調動 */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-3">⚠️ 次序調動</h3>
                <p className="text-sm text-slate-700 mb-2">
                  十字相乘法 / FMLA 需以 <Latex math="ax^2 + bx + c" /> 形式進行
                </p>
                
                <div className="bg-white rounded-lg p-3 mb-2">
                  <p className="text-sm text-slate-600 mb-1">例子 1：調動次序</p>
                  <Latex math="50 - 15m + m^2 = m^2 - 15m + 50" block />
                  <p className="text-xs text-slate-500">以 2次/1次/0次 代數(0次) 次序作調動</p>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-slate-600 mb-1">例子 2：<Latex math="a^2" /> 係數需是正數</p>
                  <div className="space-y-1">
                    <Latex math="36 + 5a - a^2" block />
                    <Latex math="= -a^2 + 5a + 36" block />
                    <Latex math="= -(a^2 - 5a - 36)" block />
                    <Latex math="= -(a-9)(a+4)" block />
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
                  <p className="text-sm text-slate-600 mb-1">例子：</p>
                  <Latex math="6r^2 - 13rs - 28s^2 = (2r-7s)(3r+4s)" block />
                  <p className="text-xs text-slate-500 mt-2">💡 方法：先用 FMLA 處理係數，再補上第二個變數</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: DSE 題型 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <button 
            onClick={() => toggleSection(4)}
            className="w-full flex items-center justify-between"
          >
            <h2 className="text-xl font-bold text-red-700 flex items-center gap-2">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">4</span>
              DSE 題型技巧
            </h2>
            {openSection === 4 ? <ChevronUp className="w-6 h-6 text-red-500" /> : <ChevronDown className="w-6 h-6 text-red-500" />}
          </button>

          {openSection === 4 && (
            <div className="mt-4 space-y-4 animate-fade-in">
              {/* 題型1: 利用前題 */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-3">📋 利用前題答案</h3>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-slate-600 mb-2">DSE 常見：(a) 和 (b) 有關聯</p>
                  <div className="space-y-2 text-sm">
                    <p>(a) <Latex math="6r^2 - 13rs - 28s^2 = (2r-7s)(3r+4s)" /></p>
                    <p>(b) <Latex math="4r - 14s + 6r^2 - 13rs - 28s^2" /></p>
                    <div className="bg-yellow-50 p-2 rounded mt-2">
                      <p className="text-slate-700">
                        ➜ 找 (a) 題目部分，套用 (a) 部答案：
                      </p>
                      <Latex math="= 4r - 14s + (2r-7s)(3r+4s)" block />
                      <Latex math="= 2(2r-7s) + (2r-7s)(3r+4s)" block />
                      <Latex math="= (2r-7s)(2 + 3r + 4s)" block />
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
          )}
        </div>

        {/* 開始測驗按鈕 */}
        <div className="text-center">
          <button
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <GraduationCap className="w-6 h-6" />
            開始測驗
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ========================================
// 測驗頁面
// ========================================
const QuizPage = ({ onBackToTeaching }) => {
  const [quizType, setQuizType] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState({ type: 'neutral', msg: '' });
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [level, setLevel] = useState(1);

  const inputRef = useRef(null);

  // =====================
  // 提取公因式題目生成
  // =====================
  const generateCommonFactorQuestion = (lv = 1) => {
    if (lv === 1) {
      // LV1: 單一公因式
      const scenarios = [
        // 數字公因式
        () => {
          const factor = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
          const a = Math.floor(Math.random() * 5) + 1;
          const b = Math.floor(Math.random() * 5) + 1;
          const vars = ['x', 'y', 'm', 'n', 'a', 'b'];
          const v1 = vars[Math.floor(Math.random() * vars.length)];
          const v2 = vars.filter(v => v !== v1)[Math.floor(Math.random() * (vars.length - 1))];
          const sign = Math.random() > 0.5 ? '+' : '-';
          return {
            question: `${factor * a}${v1} ${sign} ${factor * b}${v2}`,
            answer: `${factor}(${a}${v1} ${sign} ${b}${v2})`,
            answerAlt: [`${factor}(${a}${v1}${sign}${b}${v2})`],
            hint: `找出 ${factor * a} 和 ${factor * b} 的公因數`
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
            hint: `${common} 是公因式`
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
            hint: `抽出 -${common}`
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
          const a = Math.floor(Math.random() * 4) + 1;
          const b = Math.floor(Math.random() * 4) + 1;
          const common = ['p', 'q', 'r', 's'][Math.floor(Math.random() * 4)];
          const v1 = ['m', 'n', 'x', 'y'][Math.floor(Math.random() * 4)];
          const sign = Math.random() > 0.5 ? '+' : '-';
          return {
            question: `-${factor * a}${common}${v1} ${sign} ${factor * b}${common}`,
            answer: `-${factor}${common}(${a}${v1} ${sign === '+' ? '-' : '+'} ${b})`,
            answerAlt: [],
            hint: `公因式是 -${factor}${common}`
          };
        },
        // 次方抽取
        () => {
          const base = ['r', 's', 'm', 'n'][Math.floor(Math.random() * 4)];
          const coef1 = [2, 3, 6][Math.floor(Math.random() * 3)];
          const coef2 = coef1 * 2;
          const exp1 = 3;
          const exp2 = 2;
          const var2 = ['s', 't', 'x', 'y'].filter(v => v !== base)[0];
          return {
            question: `${coef1}${base}^3 - ${coef2}${base}^2${var2}`,
            answer: `${coef1}${base}^2(${base} - 2${var2})`,
            answerAlt: [`${coef1}${base}²(${base}-2${var2})`],
            hint: `抽出 ${coef1}${base}²`
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
          hint: `先分組：${c1}(${a}+${b}) + ${c2}(${a}+${b})`
        };
      },
      // 已有括號
      () => {
        const a = Math.floor(Math.random() * 4) + 2;
        const b = Math.floor(Math.random() * 6) + 2;
        const v = ['x', 'y', 'a', 'b'][Math.floor(Math.random() * 4)];
        const sign = Math.random() > 0.5 ? '+' : '-';
        return {
          question: `(${a}${v} ${sign} ${b}) - (${a}${v} ${sign} ${b})y`,
          answer: `(${a}${v} ${sign} ${b})(1 - y)`,
          answerAlt: [`(${a}${v}${sign}${b})(1-y)`],
          hint: `抽出共同括號 (${a}${v} ${sign} ${b})`
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
          const r1 = Math.floor(Math.random() * 9) - 4; // -4 to 4
          const r2 = Math.floor(Math.random() * 9) - 4;
          const b = -(r1 + r2);
          const c = r1 * r2;
          const v = ['x', 'y', 'a', 'm'][Math.floor(Math.random() * 4)];
          const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}${v}` : ` - ${Math.abs(b)}${v}`);
          const cStr = c === 0 ? '' : (c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`);
          
          const ans1 = r1 >= 0 ? `(${v} - ${r1})` : `(${v} + ${Math.abs(r1)})`;
          const ans2 = r2 >= 0 ? `(${v} - ${r2})` : `(${v} + ${Math.abs(r2)})`;
          
          return {
            question: `${v}^2${bStr}${cStr}`,
            answer: `${ans1}${ans2}`,
            answerAlt: [`${ans2}${ans1}`],
            hint: `找兩個數：相加得 ${b}，相乘得 ${c}`
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
            hint: `這是平方差：a² - b² = (a+b)(a-b)`
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
            { a: 2, b: -7, c: 3, d: 4, ans: `(2${v1}-7${v2})(3${v1}+4${v2})` },
            { a: 1, b: -3, c: 2, d: 5, ans: `(${v1}-3${v2})(2${v1}+5${v2})` },
            { a: 3, b: 2, c: 1, d: -4, ans: `(3${v1}+2${v2})(${v1}-4${v2})` }
          ];
          const p = pairs[Math.floor(Math.random() * pairs.length)];
          const aCoef = p.a * p.c;
          const bCoef = p.a * p.d + p.b * p.c;
          const cCoef = p.b * p.d;
          
          const bStr = bCoef === 0 ? '' : (bCoef > 0 ? ` + ${bCoef}${v1}${v2}` : ` - ${Math.abs(bCoef)}${v1}${v2}`);
          const cStr = cCoef === 0 ? '' : (cCoef > 0 ? ` + ${cCoef}${v2}^2` : ` - ${Math.abs(cCoef)}${v2}^2`);
          
          return {
            question: `${aCoef}${v1}^2${bStr}${cStr}`,
            answer: p.ans,
            answerAlt: [],
            hint: `用 FMLA 01 找出係數`
          };
        }
      ];
      return scenarios[0]();
    }
  };

  // 開始測驗
  const startQuiz = (type, lv = 1) => {
    setQuizType(type);
    setLevel(lv);
    setScore(0);
    setTotalQuestions(0);
    generateNewQuestion(type, lv);
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

  // 正規化答案（移除空格等）
  const normalizeAnswer = (ans) => {
    return ans.replace(/\s+/g, '').replace(/²/g, '^2').replace(/³/g, '^3').toLowerCase();
  };

  // 提交答案
  const handleSubmit = () => {
    if (!userAnswer.trim() || isAnswered) return;

    const normalized = normalizeAnswer(userAnswer);
    const correctNormalized = normalizeAnswer(currentQuestion.answer);
    const altCorrect = currentQuestion.answerAlt?.some(alt => normalizeAnswer(alt) === normalized);

    const isCorrect = normalized === correctNormalized || altCorrect;

    setIsAnswered(true);
    setTotalQuestions(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback({ type: 'correct', msg: '答案正確！' });
    } else {
      setFeedback({ 
        type: 'incorrect', 
        msg: `答案是 ${currentQuestion.answer}`,
        hint: currentQuestion.hint
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
    setScore(0);
    setTotalQuestions(0);
  };

  // 測驗選擇界面
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

          <h1 className="text-2xl font-bold text-center text-slate-800 mb-8">選擇測驗類型</h1>

          <div className="grid gap-4">
            {/* 提取公因式 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-purple-400 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-4 rounded-xl">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">提取公因式</h2>
                  <p className="text-slate-600 text-sm">抽取共同因數</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startQuiz('common', 1)}
                  className="flex-1 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600"
                >
                  LV1 單一公因式
                </button>
                <button
                  onClick={() => startQuiz('common', 2)}
                  className="flex-1 py-2 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-800"
                >
                  LV2 多個/次方
                </button>
              </div>
            </div>

            {/* 併項法 */}
            <button
              onClick={() => startQuiz('grouping', 1)}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-blue-400 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <Calculator className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">併項法</h2>
                  <p className="text-slate-600 text-sm">分組因式分解</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 ml-auto group-hover:text-blue-600 transition-colors" />
              </div>
            </button>

            {/* 二次多項式 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-green-400 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 p-4 rounded-xl">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">二次多項式</h2>
                  <p className="text-slate-600 text-sm">十字相乘法 / FMLA 01</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startQuiz('quadratic', 1)}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
                >
                  LV1 一元二次
                </button>
                <button
                  onClick={() => startQuiz('quadratic', 2)}
                  className="flex-1 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800"
                >
                  LV2 二元二次
                </button>
              </div>
            </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-4">
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
              <span className="font-bold text-slate-700">{score}/{totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* 題目類型標題 */}
        <div className={`rounded-xl p-4 mb-4 bg-${color}-100`}>
          <h2 className={`text-lg font-bold text-${color}-700`}>
            📐 {quizTypeNames[quizType]} {level > 1 ? `LV${level}` : ''}
          </h2>
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
              <p className="text-xs text-slate-400">提示：使用 ^ 表示次方，如 x^2 表示 x²</p>
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
                <p className={feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}>
                  {feedback.msg}
                </p>
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
