import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Check, X, ArrowRight, Calculator, Delete, RotateCcw, CornerDownLeft, Trophy, BookOpen, XCircle, Home as HomeIcon } from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';

// --- STYLES & CONFIG ---
const THEME = {
  bg: "bg-gray-50",
  cardBg: "bg-white",
  textMain: "text-slate-800",
  textSub: "text-slate-500",
  border: "border-slate-200",
  accent: "text-blue-600",
  keyBg: "bg-white",
  keyText: "text-slate-700",
  keyShadow: "shadow-[0_2px_0_0_rgba(0,0,0,0.15)]",
  keyActive: "active:shadow-none active:translate-y-[2px]",
  operatorBg: "bg-blue-50",
  operatorText: "text-blue-600",
  actionBg: "bg-blue-600",
  actionText: "text-white",
};

const KEY_BASE_CLASS = `
  relative w-full h-12 md:h-14 rounded-lg font-medium text-lg md:text-xl
  flex items-center justify-center select-none transition-all
  ${THEME.keyShadow} ${THEME.keyActive} border border-slate-200
`;

// --- DATA ---
const QUESTIONS_DATA = [
  { id: 1, text: "已知 $g(x)$ 的一部分為常數， 而另一部分則隨 $x$ 正變。", formula: "g(x) = k_1 + k_2 x", vars: ["g(x)", "x"] },
  { id: 2, text: "已知 $f(x)$ 的一部分為常數 ，而另一部分則隨 $x^2$ 正變 。", formula: "f(x) = k_1 + k_2 x^2", vars: ["f(x)", "x"] },
  { id: 3, text: "已知 $f(x)$ 的一部分隨 $x^2$ 正變， 而另一部分則隨 $x$ 正變。", formula: "f(x) = k_1 x^2 + k_2 x", vars: ["f(x)", "x"] },
  { id: 4, text: "已知 $f(x)$ 的一部分為常數， 另一部分則隨 $(x+4)^2$ 正變。", formula: "f(x) = k_1 + k_2 (x+4)^2", vars: ["f(x)", "x"] },
  { id: 5, text: "$P$ 的一部分為常數， 而另一部分隨 $h^3$ 正變。", formula: "P = k_1 + k_2 h^3", vars: ["P", "h"] },
  { id: 6, text: "已知 $y$ 隨 $x$ 反變。", formula: "y = \\frac{k}{x}", vars: ["y", "x"] },
  { id: 7, text: "已知 $f(x)$ 為兩部分之和， 一部分隨 $x$ 正變， 而另一部分隨 $x^2$ 正變。", formula: "f(x) = k_1 x + k_2 x^2", vars: ["f(x)", "x"] },
  { id: 8, text: "已知 $S$ 為兩部分之和， 一部分為常數， 而另一部分隨 $n$ 正變。", formula: "S = k_1 + k_2 n", vars: ["S", "n"] },
  { id: 9, text: "已知 $f(x)$ 為兩部分之和， 一部分隨 $x^2$ 正變， 而另一部分為常數。", formula: "f(x) = k_1 x^2 + k_2", vars: ["f(x)", "x"] },
  { id: 10, text: "已知 $W$ 為兩部分之和， 一部分隨 $l$ 正變， 另一部分隨 $l^2$ 正變。", formula: "W = k_1 l + k_2 l^2", vars: ["W", "l"] },
  { id: 11, text: "已知 $C$ 的一部分為常數， 而另一部分隨 $x$ 的平方正變。", formula: "C = k_1 + k_2 x^2", vars: ["C", "x"] },
  { id: 12, text: "已知 $z$ 隨 $x$ 的平方及 $y$ 的立方根正變。", formula: "z = k x^2 \\sqrt[3]{y}", vars: ["z", "x", "y"] },
  { id: 13, text: "已知 $z$ 隨 $x$ 的平方正變且隨 $y$ 反變。", formula: "z = \\frac{k x^2}{y}", vars: ["z", "x", "y"] },
  { id: 14, text: "若 $u$ 隨 $v$ 的平方根正變且隨 $w$ 反變。", formula: "u = \\frac{k \\sqrt{v}}{w}", vars: ["u", "v", "w"] },
  { id: 15, text: "若 $w$ 隨 $x$ 的平方正變且隨 $y$ 的立方反變。", formula: "w = \\frac{k x^2}{y^3}", vars: ["w", "x", "y"] },
  { id: 16, text: "已知 $w$ 隨 $u$ 的立方及 $v$ 的平方根正變。", formula: "w = k u^3 \\sqrt{v}", vars: ["w", "u", "v"] },
  { id: 17, text: "已知 $z$ 隨 $x$ 的平方正變且隨 $y$ 的平方根反變。", formula: "z = \\frac{k x^2}{\\sqrt{y}}", vars: ["z", "x", "y"] },
  { id: 18, text: "若 $w$ 隨 $u$ 的平方根正變且隨 $v$ 的平方反變。", formula: "w = \\frac{k \\sqrt{u}}{v^2}", vars: ["w", "u", "v"] },
  { id: 19, text: "已知 $z$ 隨 $\\sqrt{x}$ 正變且隨 $y$ 反變。", formula: "z = \\frac{k \\sqrt{x}}{y}", vars: ["z", "x", "y"] },
  { id: 20, text: "已知 $z$ 隨 $x^3$ 及 $y^2$ 正變。", formula: "z = k x^3 y^2", vars: ["z", "x", "y"] },
  { id: 21, text: "$z$ 隨 $x$ 反變且隨 $y$ 的立方正變。", formula: "z = \\frac{k y^3}{x}", vars: ["z", "x", "y"] },
  { id: 22, text: "$z$ 隨 $x$ 正變且隨 $y^2$ 反變。", formula: "z = \\frac{k x}{y^2}", vars: ["z", "x", "y"] },
  { id: 23, text: "$y$ 隨 $x$ 反變。", formula: "y = \\frac{k}{x}", vars: ["y", "x"] },
  { id: 24, text: "$y$ 隨 $x$ 正變。", formula: "y = kx", vars: ["y", "x"] },
  { id: 25, text: "$y$ 隨 $x$ 的平方根正變。", formula: "y = k \\sqrt{x}", vars: ["y", "x"] }
];

const MathDisplay = ({ latex, className = "", inline = false }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current && window.katex) {
      try {
        containerRef.current.innerHTML = '';
        window.katex.render(latex, containerRef.current, {
          throwOnError: false,
          displayMode: !inline,
        });
      } catch (e) {
        containerRef.current.innerText = latex;
      }
    }
  }, [latex, inline]);
  
  const Component = inline ? 'span' : 'div';
  return <Component ref={containerRef} className={`${className} pointer-events-none`} />;
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const VariationQuiz = () => {
  const [questionSequence, setQuestionSequence] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // --- ADJUSTABLE DIMENSIONS ---
  const boxWidth = "max-w-2xl"; 
  const boxHeight = "min-h-[100px]";

  useEffect(() => {
    loadKatexOnce().then(() => {
      setIsLoaded(true);
    });
    setQuestionSequence(shuffleArray(QUESTIONS_DATA));
  }, []);

  const currentQuestion = questionSequence[currentQIndex];

  // List of inputs that should NOT trigger auto-close of sqrt
  const NON_CLOSING_INPUTS = ['+', '-', '=', '/', '(', ')', '^2', '^3', 'sqrt('];

  const handleKeyClick = (val) => {
    if (feedback) return;
    
    // Auto-close logic for sqrt
    // If the input currently ends with "sqrt(", and the user types a simple term (var, const, num),
    // we append the term AND a closing bracket.
    if (inputValue.endsWith('sqrt(') && !NON_CLOSING_INPUTS.includes(val)) {
        setInputValue(prev => prev + val + ')');
    } else {
        setInputValue(prev => prev + val);
    }
  };

  const handleBackspace = () => {
    if (feedback) return;

    // 定義需要整組刪除的符號 (Tokens)
    const specialTokens = ["sqrt(", "^2", "^3", "k_1", "k_2"];

    if (currentQuestion && currentQuestion.vars) {
        currentQuestion.vars.forEach(v => {
            if (v.length > 1) specialTokens.push(v);
        });
    }

    specialTokens.sort((a, b) => b.length - a.length);

    for (const token of specialTokens) {
        if (inputValue.endsWith(token)) {
             setInputValue(prev => prev.slice(0, -token.length));
             return; 
        }
    }

    setInputValue(prev => prev.slice(0, -1));
  };

  const resetGame = () => {
    setQuestionSequence(shuffleArray(QUESTIONS_DATA));
    setCurrentQIndex(0);
    setScore(0);
    setInputValue("");
    setFeedback(null);
  }

  const parseInputToLatex = (rawInput) => {
    let out = "";
    let i = 0;
    
    // 1. Handle Sqrt Blocks 'sqrt(...)'
    let processedSqrt = "";
    while (i < rawInput.length) {
       if (rawInput.substr(i, 5) === 'sqrt(') {
           processedSqrt += "\\sqrt{";
           i += 5;
           let balance = 1;
           while (i < rawInput.length && balance > 0) {
               const char = rawInput[i];
               if (char === '(') balance++;
               else if (char === ')') balance--;
               
               if (balance > 0) processedSqrt += char;
               i++;
           }
           processedSqrt += "}";
       } else {
           processedSqrt += rawInput[i];
           i++;
       }
    }

    // 2. Handle Fractions '/'
    out = processedSqrt.replace(
        /([a-zA-Z0-9_\\^\\{\\}\+\-\(\)]+)\/([a-zA-Z0-9_\\^\\{\\}\+\-\(\)]+)/g, 
        "\\frac{$1}{$2}"
    );
    return out;
  };

  const checkAnswer = () => {
    if (!currentQuestion) return;
    const userClean = inputValue.replace(/\s/g, "");
    const answerClean = currentQuestion.formula.replace(/\s/g, "");
    const userLatex = parseInputToLatex(userClean);
    if (userLatex === answerClean) {
      setScore(s => s + 1); 
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  const nextQuestion = () => {
    if (currentQIndex + 1 < questionSequence.length) {
      setCurrentQIndex(curr => curr + 1);
      setInputValue("");
      setFeedback(null);
    } else {
      setFeedback('finished');
    }
  };

  if (!isLoaded || questionSequence.length === 0) {
    return <div className={`flex items-center justify-center min-h-screen ${THEME.bg} ${THEME.textSub}`}>Loading...</div>;
  }

  if (feedback === 'finished') {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${THEME.bg}`}>
        <div className={`p-8 rounded-2xl shadow-xl max-w-md w-full text-center ${THEME.cardBg} ${THEME.border} border`}>
            <div className="mb-4 flex justify-center text-green-500"><Check className="w-16 h-16" /></div>
            <h2 className={`text-3xl font-bold mb-2 ${THEME.textMain}`}>測驗完成!</h2>
            <p className={`${THEME.textSub} mb-6`}>最終得分</p>
            <div className={`text-6xl font-bold ${THEME.accent} mb-8`}>{score}</div>
            <div className="flex flex-col gap-3">
              <button onClick={resetGame} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center gap-2 mx-auto transition-all">
                  <RotateCcw className="w-5 h-5" /> 再玩一次
              </button>
              <Link to="/" className="text-slate-500 hover:text-slate-700 flex items-center justify-center gap-2 text-sm">
                <HomeIcon className="w-4 h-4" /> 返回首頁
              </Link>
            </div>
        </div>
      </div>
    );
  }

  const variableKeys = currentQuestion?.vars || ['x', 'y'];
  const displayVars = [...variableKeys];
  while(displayVars.length < 3) displayVars.push(null); 

  return (
    <div className={`flex flex-col h-screen ${THEME.bg} font-sans overflow-hidden relative`}>
      {/* Hide scrollbars style */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      
      {/* Header */}
      <div className={`${THEME.cardBg} shadow-sm px-4 py-2 relative flex justify-between items-center z-10 border-b ${THEME.border} min-h-[60px]`}>
        <Link to="/" className="text-slate-500 hover:text-slate-700 flex items-center gap-2">
          <HomeIcon size={20} />
          <span className="text-sm">返回首頁</span>
        </Link>
        <div className={`font-bold text-lg flex items-center gap-2 ${THEME.textMain}`}>
          <Calculator className="w-5 h-5 text-blue-500" />
          <span>變分公式特訓</span>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-blue-900 font-bold text-sm">分數:</span>
            <span className="text-blue-600 text-lg font-bold">{score}</span>
        </div>
      </div>

      {/* Notes Modal - Strictly Following User Content */}
      {showNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                <BookOpen className="w-5 h-5 text-blue-600" />
                變分筆記
              </h3>
              <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-slate-700 bg-white">
              <h2 className="text-xl font-bold text-center text-slate-900 mb-4 border-b pb-2">變分(Variation) 四條公式</h2>
              
              <div className="space-y-4">
                {/* 1. 正變 */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-blue-800">1. 正變：</span>
                    <MathDisplay latex="y = k \textcolor{#ca8a04}{x}" className="text-lg font-bold" />
                  </div>
                </div>

                {/* 2. 反變 */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-blue-800">2. 反變：</span>
                    <MathDisplay latex="y = \frac{k}{\textcolor{#ca8a04}{x}}" className="text-lg font-bold" />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">可設佈為分數形式</div>
                </div>

                {/* 3. 聯變 */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-blue-800">3. 聯變：</span>
                    <MathDisplay latex="z = k \textcolor{#ca8a04}{x} \textcolor{#ca8a04}{y}" className="text-lg font-bold" />
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    <span className="font-bold">字眼：</span>"且"、"及"
                  </div>
                </div>

                {/* 4. 部分變 */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-blue-800">4. 部分變：</span>
                    <MathDisplay latex="y = k_1 \textcolor{#ca8a04}{x} + k_2 \textcolor{#ca8a04}{x^2}" className="text-lg font-bold" />
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    <span className="font-bold">字眼：</span>"部份"、"而"
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-800 mb-2">
                    註：代數 (<span className="text-yellow-600">黃色highlight </span>) 按題目不同字眼而改變：
                </h4>
                <p className="text-sm text-slate-600 mb-2">例子：</p>
                <ul className="space-y-2 text-sm bg-yellow-50 p-3 rounded-lg text-slate-700">
                  <li className="flex items-center justify-between border-b border-yellow-100 pb-1">
                    <span>x 的 <span className="text-red-600 font-bold">平方</span></span>
                    <div className="flex items-center">
                        <ArrowRight className="w-3 h-3 mx-2 text-slate-400"/>
                        <MathDisplay latex="x^{\textcolor{red}{2}}" />
                    </div>
                  </li>
                  <li className="flex items-center justify-between border-b border-yellow-100 pb-1">
                    <span>y 的 <span className="text-red-600 font-bold">立方</span></span>
                    <div className="flex items-center">
                        <ArrowRight className="w-3 h-3 mx-2 text-slate-400"/>
                        <MathDisplay latex="y^{\textcolor{red}{3}}" />
                    </div>
                  </li>
                  <li className="flex items-center justify-between border-b border-yellow-100 pb-1">
                    <span>x 的 <span className="text-red-600 font-bold">平方根</span></span>
                    <div className="flex items-center">
                        <ArrowRight className="w-3 h-3 mx-2 text-slate-400"/>
                        <MathDisplay latex="\textcolor{red}{\sqrt{\textcolor{black}{x}}}" />
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>z 的 <span className="text-red-600 font-bold">立方根</span></span>
                    <div className="flex items-center">
                        <ArrowRight className="w-3 h-3 mx-2 text-slate-400"/>
                        <MathDisplay latex="\textcolor{red}{\sqrt[3]{\textcolor{black}{z}}}" />
                    </div>
                  </li>
                </ul>
              </div>

            </div>
            
            <div className="p-4 border-t bg-slate-50 text-center flex-shrink-0">
              <button 
                onClick={() => setShowNotes(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full transition-all shadow-md active:scale-95"
              >
                明白
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 items-center w-full">
        {/* Container for Question Box and External Button */}
        <div className={`flex flex-row gap-3 w-full ${boxWidth}`}>
            
            {/* Question Area */}
            <div className={`relative ${THEME.cardBg} p-2 rounded-2xl shadow-sm border ${THEME.border} ${boxHeight} flex flex-row items-center flex-1 gap-4 pr-3`}>
                <div className="flex-none w-24 flex items-center justify-center border-r border-slate-100 py-2 h-full">
                    <h3 className="text-xl font-bold text-slate-400 tracking-wide">題目</h3>
                </div>
                
                <div className={`flex-1 text-xl md:text-2xl text-left leading-relaxed font-serif ${THEME.textMain}`}>
                    {currentQuestion.text.split(/(\$[^\$]+\$)/g).map((part, i) => {
                    if (part.startsWith('$') && part.endsWith('$')) {
                        return <span key={i} className="inline-block mx-1"><MathDisplay latex={part.replace(/\$/g, '')} inline={true} /></span>;
                    }
                    return <span key={i}>{part}</span>
                    })}
                </div>
            </div>

            {/* Notes Button - External to the right */}
            <button 
                onClick={() => setShowNotes(true)}
                className="flex-none flex flex-col items-center justify-center gap-1 text-xs font-bold text-yellow-700 hover:text-yellow-800 bg-yellow-50 hover:bg-yellow-100 w-20 rounded-xl transition-all border border-yellow-200 active:scale-95 shadow-sm"
                title="查看筆記"
                style={{ height: 'auto', minHeight: '100px' }} // Match min-height of question box roughly
            >
                <BookOpen className="w-6 h-6" />
                <span>筆記</span>
            </button>

        </div>

        {/* Answer Area - Side by Side Layout */}
        <div className={`relative ${THEME.cardBg} rounded-xl border-2 p-2 ${boxWidth} ${boxHeight} flex flex-row items-stretch transition-colors shadow-inner w-full
            ${feedback === 'correct' ? 'border-green-500 bg-green-50' : 
              feedback === 'wrong' ? 'border-red-500 bg-red-50' : 'border-blue-200'}
        `}>
           <div className="flex-none w-24 flex items-center justify-center border-r border-slate-200/50 py-2">
               <h3 className="text-xl font-bold text-slate-400 tracking-wide">列式</h3>
           </div>
           
           <div className="flex-1 flex flex-col justify-center relative min-w-0">
               {/* Added overflow-y-hidden to prevent vertical scrollbar */}
               <div className="flex items-center justify-center w-full px-4 overflow-x-auto overflow-y-hidden no-scrollbar flex-grow min-h-[50px]">
                   {inputValue ? (
                     <MathDisplay latex={parseInputToLatex(inputValue)} className={`text-3xl ${THEME.textMain}`} />
                   ) : (
                     <span className="text-slate-300 italic text-lg select-none">在此輸入公式...</span>
                   )}
               </div>
           </div>
        </div>

        {/* Feedback Section - Now Outside and Below Answer Box */}
        {feedback && (
            <div className={`w-full ${boxWidth} flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 mb-4`}>
                {feedback === 'correct' ? (
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-green-700 font-bold text-lg bg-green-100 px-6 py-3 rounded-full shadow-sm">
                            <Check className="w-6 h-6" /> 答對了！
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 w-full">
                        <div className="flex items-center gap-2 text-red-700 font-bold text-lg">
                            <X className="w-6 h-6" /> 答錯了，正確答案：
                        </div>
                        <div className="bg-white border-2 border-red-200 rounded-xl p-4 w-full shadow-md flex justify-center items-center overflow-x-auto">
                            <MathDisplay latex={currentQuestion.formula} className="text-2xl text-slate-800" />
                        </div>
                    </div>
                )}
                
                <button onClick={nextQuestion} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 text-lg">
                    下一題 <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        )}
      </div>

      <div className={`mt-auto ${THEME.cardBg} border-t ${THEME.border} p-3 pb-6 shadow-lg z-30 ${feedback ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-5 gap-2 mb-2">
                {displayVars.map((v, i) => v ? (
                   <button key={v} onClick={() => handleKeyClick(v)} className={`${KEY_BASE_CLASS} ${THEME.keyBg} ${THEME.accent} border-blue-200 font-serif italic`}><MathDisplay latex={v} inline={true} /></button>
                ) : ( <div key={i} className="invisible"></div> ))}
                <div className="col-span-2 grid grid-cols-3 gap-1">
                   <button onClick={() => handleKeyClick('k')} className={`${KEY_BASE_CLASS} ${THEME.operatorBg} ${THEME.operatorText}`}><MathDisplay latex="k" inline={true} /></button>
                   <button onClick={() => handleKeyClick('k_1')} className={`${KEY_BASE_CLASS} ${THEME.operatorBg} ${THEME.operatorText}`}><MathDisplay latex="k_1" inline={true} /></button>
                   <button onClick={() => handleKeyClick('k_2')} className={`${KEY_BASE_CLASS} ${THEME.operatorBg} ${THEME.operatorText}`}><MathDisplay latex="k_2" inline={true} /></button>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {[7,8,9,'+'].map(k => <button key={k} onClick={() => handleKeyClick(k.toString())} className={`${KEY_BASE_CLASS} ${THEME.keyBg} ${THEME.keyText}`}>{k}</button>)}
                <button onClick={handleBackspace} className={`${KEY_BASE_CLASS} bg-red-50 text-red-500 border-red-100`}>DEL</button>
                {[4,5,6,'='].map(k => <button key={k} onClick={() => handleKeyClick(k.toString())} className={`${KEY_BASE_CLASS} ${THEME.keyBg} ${THEME.keyText}`}>{k}</button>)}
                <button onClick={() => handleKeyClick('/')} className={`${KEY_BASE_CLASS} ${THEME.operatorBg} ${THEME.operatorText} flex flex-col text-xs leading-none`}><span>◻</span><span className="border-t border-current w-3 my-0.5"></span><span>◻</span></button>
                {[1,2,3,'(',')'].map(k => <button key={k} onClick={() => handleKeyClick(k.toString())} className={`${KEY_BASE_CLASS} ${THEME.keyBg} ${THEME.keyText}`}>{k}</button>)}
                <button onClick={() => handleKeyClick('0')} className={`${KEY_BASE_CLASS} ${THEME.keyBg} ${THEME.keyText}`}>0</button>
                <button onClick={() => handleKeyClick('^2')} className={`${KEY_BASE_CLASS} ${THEME.operatorBg} ${THEME.operatorText}`}><MathDisplay latex="x^2" inline={true} /></button>
                <button onClick={() => handleKeyClick('sqrt(')} className={`${KEY_BASE_CLASS} ${THEME.operatorBg} ${THEME.operatorText}`}><MathDisplay latex="\sqrt{\square}" inline={true} /></button>
                <button onClick={() => handleKeyClick('^3')} className={`${KEY_BASE_CLASS} ${THEME.operatorBg} ${THEME.operatorText}`}><MathDisplay latex="x^3" inline={true} /></button>
                <button onClick={checkAnswer} disabled={!inputValue} className={`${KEY_BASE_CLASS} ${THEME.actionBg} ${THEME.actionText}`}><CornerDownLeft className="w-6 h-6" /></button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VariationQuiz;
