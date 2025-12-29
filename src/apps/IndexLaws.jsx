import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, XCircle, HelpCircle, Calculator, ChevronRight, Eraser, Delete, ArrowRight, Check, Trophy, Home as HomeIcon } from 'lucide-react';

// --- KaTeX Loader & Component ---
const useKatex = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.katex) {
      setIsLoaded(true);
      return;
    }

    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);
  }, []);

  return isLoaded;
};

const Latex = ({ children, block = false, className = '' }) => {
  const containerRef = useRef(null);
  const isKatexLoaded = useKatex();

  useEffect(() => {
    if (isKatexLoaded && containerRef.current && children) {
      try {
        window.katex.render(children, containerRef.current, {
          throwOnError: false,
          displayMode: block,
        });
      } catch (e) {
        containerRef.current.innerText = children;
      }
    }
  }, [children, isKatexLoaded, block]);

  if (!children) return <span className="text-gray-300 italic min-h-[1.5em] inline-block">...</span>;

  if (!isKatexLoaded) return <span className="font-serif animate-pulse">{children}</span>;

  return <span ref={containerRef} className={`${className} ${block ? 'my-2' : ''}`} />;
};

// --- Input to LaTeX Converter ---
const toLatex = (input) => {
  if (!input) return '';
  let latex = input;

  if (latex.includes('/')) {
    const parts = latex.split('/');
    if (parts.length === 2) {
      latex = `\\frac{${parts[0]}}{${parts[1]}}`;
    } else {
      latex = latex.replace(/\//g, '\\div ');
    }
  }

  latex = latex.replace(/\^([a-zA-Z0-9-]+)/g, '^{$1}');
  latex = latex.replace(/\*/g, '\\times ');

  return latex;
};

// --- 輔助函數 ---
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomNonZero = (min, max) => {
  let val = 0;
  while (val === 0) val = getRandomInt(min, max);
  return val;
};

// --- 題目資料 ---
const LAWS = [
  { id: 'mult', title: '同底相乘', rule: 'a^m \\times a^n = a^{m+n}', desc: '底數相同，指數相加' },
  { id: 'div', title: '同底相除', rule: '\\frac{a^m}{a^n} = a^{m-n}', desc: '底數相同，指數相減' },
  { id: 'power', title: '冪的乘方', rule: '(a^m)^n = a^{mn}', desc: '指數相乘' },
  { id: 'neg', title: '負指數', rule: 'a^{-n} = \\frac{1}{a^n}', desc: '負指數變分母' },
];

export default function IndexLaws() {
  const [level, setLevel] = useState(1);
  const [problem, setProblem] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [activeField, setActiveField] = useState('final');
  const [hasChecked, setHasChecked] = useState(false);
  const [score, setScore] = useState(0);

  // 初始化：載入第一道題目
  useEffect(() => {
    if (!problem) {
      generateProblemLV1();
    }
  }, []);

  // --- Input Logic ---
  const handleInput = (val, fieldName) => {
    if (hasChecked) return;
    setUserInputs(prev => ({ ...prev, [fieldName]: val }));
  };

  const insertChar = (char) => {
    if (hasChecked) return;
    const currentVal = userInputs[activeField] || '';
    handleInput(currentVal + char, activeField);
  };

  const clearInput = () => {
    if (hasChecked) return;
    handleInput('', activeField);
  };

  const backspace = () => {
    if (hasChecked) return;
    const currentVal = userInputs[activeField] || '';
    handleInput(currentVal.slice(0, -1), activeField);
  };

  const formatPositiveIndex = (base, exp) => {
    if (exp === 0) return '1';
    if (exp > 0) return `${base}^${exp}`;
    return `1/${base}^${Math.abs(exp)}`;
  };

  // --- Problem Generators ---
  const generateProblemLV1 = () => {
    const lawIdx = getRandomInt(0, 3);
    const law = LAWS[lawIdx];
    const base = 'x';
    let qLatex = '', ans = '';

    const n1 = getRandomNonZero(-5, 9);
    const n2 = getRandomNonZero(-5, 9);

    let finalExp = 0;

    switch (law.id) {
      case 'mult':
        qLatex = `${base}^{${n1}} \\times ${base}^{${n2}}`;
        finalExp = n1 + n2;
        ans = formatPositiveIndex(base, finalExp);
        break;
      case 'div':
        qLatex = `\\frac{${base}^{${n1}}}{${base}^{${n2}}}`;
        finalExp = n1 - n2;
        ans = formatPositiveIndex(base, finalExp);
        break;
      case 'power':
        qLatex = `(${base}^{${n1}})^{${n2}}`;
        finalExp = n1 * n2;
        ans = formatPositiveIndex(base, finalExp);
        break;
      case 'neg':
        const negVal = -1 * Math.abs(n1);
        qLatex = `${base}^{${negVal}}`;
        ans = `1/${base}^${Math.abs(negVal)}`;
        break;
      default:
        break;
    }

    setProblem({ level: 1, law, qLatex, ans });
    resetState();
  };

  const generateProblemLV2 = () => {
    const a = getRandomNonZero(-4, 4);
    const b = getRandomNonZero(-4, 4);
    const k = getRandomInt(2, 3) * (Math.random() > 0.5 ? -1 : 1);
    const c = getRandomNonZero(-4, 4);
    const d = getRandomNonZero(-4, 4);

    const num = `(x^{${a}}y^{${b}})^{${k}}`;
    const den = `x^{${c}}y^{${d}}`;
    const qLatex = `\\frac{${num}}{${den}}`;

    const step1X = a * k;
    const step1Y = b * k;
    const finalX = step1X - c;
    const finalY = step1Y - d;

    const numStrParts = [];
    const denStrParts = [];

    if (finalX > 0) numStrParts.push(`x^${finalX}`);
    if (finalX < 0) denStrParts.push(`x^${Math.abs(finalX)}`);
    if (finalY > 0) numStrParts.push(`y^${finalY}`);
    if (finalY < 0) denStrParts.push(`y^${Math.abs(finalY)}`);

    let finalAnsStr = '';
    if (numStrParts.length === 0) numStrParts.push('1');

    if (denStrParts.length === 0) {
      finalAnsStr = numStrParts.join('');
    } else {
      finalAnsStr = `${numStrParts.join('')}/${denStrParts.join('')}`;
    }

    setProblem({
      level: 2,
      qLatex,
      expectations: {
        step1Keywords: [`x^${step1X}`, `y^${step1Y}`],
        finalAns: finalAnsStr,
      },
    });
    resetState();
    setActiveField('step1');
  };

  const resetState = () => {
    setUserInputs({ step1: '', step2: '', step3: '', final: '' });
    setFeedback(null);
    setShowHint(false);
    setHasChecked(false);
    setActiveField(level === 1 ? 'final' : 'step1');
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    if (newLevel === 1) generateProblemLV1();
    else generateProblemLV2();
  };

  // --- Check Logic ---
  const normalizeStr = (str) => {
    if (!str) return '';
    return str.replace(/\s/g, '').replace(/\^1(?!\d)/g, '').replace(/\*/g, '').toLowerCase();
  };

  const checkAnswer = () => {
    if (hasChecked) return;

    const userFinal = normalizeStr(userInputs.final);
    let isCorrect = false;

    if (level === 1) {
      const correctAns = normalizeStr(problem.ans);
      if (userFinal === correctAns) {
        setFeedback({ correct: true, msg: '太棒了！答案正確' });
        isCorrect = true;
      } else {
        setFeedback({ correct: false, msg: '正確答案是:' });
      }
    } else {
      const userStep3 = normalizeStr(userInputs.step3);
      const correctAns = normalizeStr(problem.expectations.finalAns);
      isCorrect = userStep3 === correctAns;

      let stepCredit = false;
      const userStep1 = normalizeStr(userInputs.step1);
      const keys = problem.expectations.step1Keywords;

      const hasKey1 = userStep1.includes(normalizeStr(keys[0]));
      const hasKey2 = userStep1.includes(normalizeStr(keys[1]));

      if (hasKey1 && hasKey2) stepCredit = true;

      if (isCorrect) {
        setFeedback({ correct: true, msg: '全對！滿分' });
      } else if (stepCredit) {
        setFeedback({ correct: false, msg: '最終答案不正確，但去括號步驟正確！' });
      } else {
        setFeedback({ correct: false, msg: '正確答案是:' });
      }
    }

    if (isCorrect) {
      setScore(s => s + 1);
    }
    setHasChecked(true);
  };

  // --- UI Components ---
  const FractionIcon = () => (
    <span className="font-serif italic font-bold text-lg">a b/c</span>
  );

  const Keypad = () => {
    const keys = [
      'x', 'y', '->', '7',
      '8', '9', '^', '4',
      '5', '6', '/', '1',
      '2', '3', '-', '0',
      'DEL', 'CLR'
    ];

    return (
      <div className="bg-gray-50 border-t border-gray-200 p-4 pb-8">
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {keys.map(k => (
            <button
              key={k}
              onClick={() => {
                if (k === 'DEL') backspace();
                else if (k === 'CLR') clearInput();
                else insertChar(k);
              }}
              disabled={hasChecked}
              className={`h-12 rounded-xl text-lg font-medium shadow-sm active:scale-95 transition-all
                ${hasChecked ? 'opacity-50 cursor-not-allowed' : ''}
                ${['DEL', 'CLR'].includes(k) ? 'bg-red-50 text-red-500 hover:bg-red-100' : 
                  ['x', 'y', '^', '/', '->', '-'].includes(k) ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-serif italic' : 
                  'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
            >
              {k === '/' ? <FractionIcon /> : 
               k === 'DEL' ? <Delete size={20} className="mx-auto"/> : 
               k === 'CLR' ? <Eraser size={20} className="mx-auto"/> : k}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // --- Main Render ---
  if (!problem) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <Link 
            to="/"
            className="p-2 -ml-2 text-slate-400 hover:text-slate-700 flex items-center gap-1"
          >
            <HomeIcon size={20} />
          </Link>
          <h1 className="font-bold text-slate-700">指數定律特訓</h1>
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
            <Trophy size={16} className="text-yellow-600" />
            <span className="font-bold text-yellow-700">{score}</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-slate-400 mb-6">正在載入...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <Link 
          to="/"
          className="p-2 -ml-2 text-slate-400 hover:text-slate-700 flex items-center gap-1"
        >
          <HomeIcon size={20} />
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-700">指數定律</span>
          <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">⚠️ 開發中</span>
          <div className="flex gap-2">
            <button 
              onClick={() => handleLevelChange(1)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${level === 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'}`}
            >
              LV1
            </button>
            <button 
              onClick={() => handleLevelChange(2)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${level === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'}`}
            >
              LV2
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
          <Trophy size={16} className="text-yellow-600" />
          <span className="font-bold text-yellow-700">{score}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full overflow-y-auto pb-4">
        <div className="m-4 mt-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">題目</span>
            <span className="text-lg font-bold text-black">請以正指數表示</span>
            <button 
              onClick={() => setShowHint(!showHint)}
              className="text-slate-400 hover:text-indigo-500 flex items-center gap-1 text-xs font-medium transition-colors"
            >
              <HelpCircle size={14} /> 提示
            </button>
          </div>

          {showHint && (
            <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-900 text-sm animate-in fade-in slide-in-from-top-2">
              {level === 1 ? (
                <div className="text-center">
                  <Latex block>{problem.law.rule}</Latex>
                  <p className="mt-2 opacity-80">{problem.law.desc}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p>解題順序：</p>
                  <ol className="list-decimal list-inside space-y-1 opacity-90">
                    <li>去括號：<Latex>(x^a)^b = x^{`ab`}</Latex></li>
                    <li>整理分子分母</li>
                    <li>合併同類項：<Latex>\\frac{x^m}{x^n} = x^{`m-n`}</Latex></li>
                  </ol>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-center py-8 min-h-[160px] bg-white rounded-2xl border-2 border-dashed border-slate-100">
            <div className="text-2xl text-slate-800 transform scale-125">
              <Latex block>{problem?.qLatex || ''}</Latex>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-6">
          {level === 1 ? (
            <div className="group">
              <label className="text-sm font-bold text-slate-700 mb-2 block">
                預覽答案:
              </label>
              <div 
                onClick={() => !hasChecked && setActiveField('final')}
                className={`relative bg-slate-50 p-4 rounded-xl border-2 transition-all min-h-[100px] flex flex-col justify-center items-center
                  ${activeField === 'final' && !hasChecked ? 'border-indigo-500 bg-white shadow-md shadow-indigo-100' : 'border-slate-100'}`}
              >
                {userInputs.final ? (
                  <div className="text-4xl font-bold text-slate-800">
                    <Latex>{toLatex(userInputs.final)}</Latex>
                  </div>
                ) : (
                  <span className="text-slate-300 text-lg">輸入答案...</span>
                )}
              </div>
            </div>
          ) : (
            <>
              <div onClick={() => !hasChecked && setActiveField('step1')} 
                className={`p-3 rounded-xl border-2 transition-all ${activeField === 'step1' && !hasChecked ? 'border-indigo-400 bg-white shadow-sm' : 'border-transparent bg-slate-50'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-indigo-500">步驟 1：拆括號</span>
                  <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded-full border">過程分</span>
                </div>
                <div className="min-h-[2em] text-lg flex items-center">
                  {userInputs.step1 ? <Latex>{toLatex(userInputs.step1)}</Latex> : <span className="text-slate-300 text-sm">輸入...</span>}
                </div>
              </div>

              <div onClick={() => !hasChecked && setActiveField('step2')} 
                className={`p-3 rounded-xl border-2 transition-all ${activeField === 'step2' && !hasChecked ? 'border-indigo-400 bg-white shadow-sm' : 'border-transparent bg-slate-50'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-600">步驟 2：負指數轉正指數</span>
                  <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded-full border">過程分</span>
                </div>
                <div className="min-h-[2em] text-lg flex items-center">
                  {userInputs.step2 ? <Latex>{toLatex(userInputs.step2)}</Latex> : <span className="text-slate-300 text-sm">輸入...</span>}
                </div>
              </div>

              <div onClick={() => !hasChecked && setActiveField('step3')} 
                className={`p-4 rounded-xl border-2 transition-all ${activeField === 'step3' && !hasChecked ? 'border-emerald-500 bg-white shadow-md' : 'border-slate-200 bg-slate-50'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-emerald-600">步驟 3：指數約簡（正指數）</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">答案分</span>
                </div>
                <div className="min-h-[3em] text-4xl flex items-center justify-center font-bold text-slate-800">
                  {userInputs.step3 ? <Latex>{toLatex(userInputs.step3)}</Latex> : <span className="text-slate-300 text-base font-normal">輸入最終答案...</span>}
                </div>
              </div>
            </>
          )}

          {feedback && (
            <div className={`p-6 rounded-2xl flex flex-col gap-3 animate-in slide-in-from-bottom-2 shadow-sm ${feedback.correct ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-1 rounded-full ${feedback.correct ? 'bg-emerald-100' : 'bg-red-100'}`}>
                  {feedback.correct ? <CheckCircle size={24} /> : <XCircle size={24} />}
                </div>
                <p className="font-bold text-lg">{feedback.msg}</p>
              </div>
              {!feedback.correct && (
                <div className="mt-2 p-4 bg-white/60 rounded-xl border border-red-100/50 text-center">
                  <div className="text-3xl font-bold text-slate-800 my-2">
                    <Latex>{level === 1 ? problem.ans : toLatex(problem.expectations.finalAns)}</Latex>
                  </div>
                </div>
              )}
            </div>
          )}

          {!hasChecked ? (
            <button 
              onClick={checkAnswer}
              disabled={level === 1 ? !userInputs.final : !userInputs.step3}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95 mb-4 flex items-center justify-center
                ${(level === 1 ? !userInputs.final : !userInputs.step3) 
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'}`}
            >
              <Check size={32} strokeWidth={3} />
            </button>
          ) : (
            <button 
              onClick={() => {
                if (level === 1) generateProblemLV1();
                else generateProblemLV2();
              }}
              className="w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95 mb-4 bg-slate-800 text-white hover:bg-slate-900 shadow-slate-200 flex items-center justify-center gap-2"
            >
              下一題 <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>

      <Keypad />
    </div>
  );
}
