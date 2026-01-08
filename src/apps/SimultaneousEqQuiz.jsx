import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, Calculator, Lightbulb, Delete, CheckCircle, XCircle, Keyboard as KeyboardIcon, X, Trophy, Home as HomeIcon, RotateCcw, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, Calculator, Lightbulb, Delete, CheckCircle, XCircle, Keyboard as KeyboardIcon, X, Trophy, Home as HomeIcon, RotateCcw, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- KaTeX Latex Component for LV0 ---
const Latex = ({ children, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById('katex-css')) {
      const link = document.createElement('link');
      link.id = 'katex-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
      document.head.appendChild(link);
    }

    if (!window.katex) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
      script.onload = () => renderLatex();
      document.head.appendChild(script);
    } else {
      renderLatex();
    }
  }, [children]);

  const renderLatex = () => {
    if (window.katex && containerRef.current) {
      try {
        window.katex.render(children, containerRef.current, {
          throwOnError: false,
          displayMode: true,
        });
      } catch (e) {
        console.error("KaTeX error:", e);
      }
    }
  };

  return <div ref={containerRef} className={className} />;
};

// --- Utility Functions for LV0 ---
const gcd = (a, b) => {
  return b === 0 ? a : gcd(b, a % b);
};

const toFraction = (val) => {
  if (Number.isInteger(val)) return { n: val, d: 1 };
  const tolerance = 1.0E-6;
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = val;
  do {
      let a = Math.floor(b);
      let aux = h1; h1 = a * h1 + h2; h2 = aux;
      aux = k1; k1 = a * k1 + k2; k2 = aux;
      b = 1 / (b - a);
  } while (Math.abs(val - h1 / k1) > val * tolerance);
  return { n: h1, d: k1 };
};

const formatFraction = (val) => {
  const f = toFraction(val);
  if (f.d === 1) return `${f.n}`;
  if (f.d < 0) { f.n = -f.n; f.d = -f.d; } 
  return `${f.n}/${f.d}`;
};

const parseInput = (str) => {
  if (!str) return NaN;
  if (str.includes('/')) {
    const [n, d] = str.split('/').map(Number);
    if (d === 0) return NaN;
    return n / d;
  }
  return parseFloat(str);
};

const formatEquationToLatex = (a, b, c) => {
  const formatCoeff = (val, isFirst = false) => {
    if (val === 0) return "";
    let str = "";
    if (val < 0) str += "-";
    else if (!isFirst) str += "+";
    if (Math.abs(val) !== 1) str += Math.abs(val);
    return str;
  };

  let lhs = "";
  if (a !== 0) {
    const aStr = formatCoeff(a, true);
    lhs += `${aStr}x`;
  }
  if (b !== 0) {
    const bStr = formatCoeff(b, a === 0);
    if (a !== 0 && b > 0) lhs += " + ";
    if (a !== 0 && b < 0) lhs += " - ";
    if (Math.abs(b) !== 1) lhs += Math.abs(b);
    lhs += "y";
  }
  return `${lhs} = ${c}`;
};

// --- LV0 Solver Trainer Component ---
const Prog01Trainer = ({ onBack }) => {
  const [equation, setEquation] = useState(null);
  const [inputs, setInputs] = useState({ x: '', y: '' });
  const [activeInput, setActiveInput] = useState('x');
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('answering');
  const [feedback, setFeedback] = useState(null);

  const generateQuestion = useCallback(() => {
    let valid = false;
    let newEq = {};

    while (!valid) {
      const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      const randNonZero = () => {
        let n = 0;
        while (n === 0) n = randInt(-9, 9);
        return n;
      };

      const isFraction = Math.random() > 0.7;
      let xVal, yVal;

      if (!isFraction) {
        xVal = randInt(-9, 9);
        yVal = randInt(-9, 9);
      } else {
        const dens = [2, 3, 4, 5];
        const dx = dens[Math.floor(Math.random() * dens.length)];
        const dy = dens[Math.floor(Math.random() * dens.length)];
        xVal = randInt(-10, 10) / dx;
        yVal = randInt(-10, 10) / dy;
      }

      let a = randNonZero();
      let b = randNonZero();
      let d = randNonZero();
      let e = randNonZero();

      let c = a * xVal + b * yVal;
      let f = d * xVal + e * yVal;

      const det = a * e - b * d;
      
      if (det !== 0 && Math.abs(c - Math.round(c)) < 0.0001 && Math.abs(f - Math.round(f)) < 0.0001) {
        valid = true;
        const eq1 = formatEquationToLatex(a, b, Math.round(c));
        const eq2 = formatEquationToLatex(d, e, Math.round(f));
        const latexString = `\\begin{cases} ${eq1} \\\\ ${eq2} \\end{cases}`;

        newEq = {
          a, b, c: Math.round(c),
          d, e, f: Math.round(f),
          solX: xVal,
          solY: yVal,
          latex: latexString
        };
      }
    }

    setEquation(newEq);
    setInputs({ x: '', y: '' });
    setActiveInput('x');
    setStatus('answering');
    setFeedback(null);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleKeyPress = (key) => {
    if (status !== 'answering') return;

    if (key === 'Enter') {
      if (activeInput === 'x') {
        setActiveInput('y');
      } else {
        handleSubmit();
      }
      return;
    }
    
    setInputs(prev => {
      const currentVal = prev[activeInput];
      
      if (key === 'Backspace') {
        return { ...prev, [activeInput]: currentVal.slice(0, -1) };
      }
      
      if (key === 'C') {
        return { ...prev, [activeInput]: '' };
      }

      if (key === '/' && currentVal.includes('/')) return prev;

      return { ...prev, [activeInput]: currentVal + key };
    });
  };

  const handleSubmit = () => {
    if (!inputs.x || !inputs.y) return;

    const userX = parseInput(inputs.x);
    const userY = parseInput(inputs.y);
    const correctX = equation.solX;
    const correctY = equation.solY;

    const isXCorrect = Math.abs(userX - correctX) < 0.001;
    const isYCorrect = Math.abs(userY - correctY) < 0.001;

    if (isXCorrect && isYCorrect) {
      setStatus('correct');
      setScore(s => s + 1);
      setFeedback('全對！正確！');
    } else {
      setStatus('wrong');
      setFeedback(`答錯了。X = ${formatFraction(correctX)}, Y = ${formatFraction(correctY)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden border-x border-gray-200">
      <div className="bg-white p-4 flex justify-between items-center border-b border-gray-200 shadow-sm z-10">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <Calculator className="w-6 h-6 text-teal-600" />
          <h1 className="font-bold text-xl text-gray-800">方程計算 (LV0)</h1>
        </div>
        <div className="text-sm font-mono font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">
          分數: {score}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col items-center">
        {equation && (
          <div className="w-full bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-md relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
             <div className="absolute top-2 left-3 text-lg font-bold text-gray-400 uppercase tracking-widest">題目</div>
             <div className="scale-125 transform origin-center w-full flex justify-center">
               <Latex>{equation.latex}</Latex>
             </div>
          </div>
        )}

        <div className="w-full flex gap-4 mb-4">
          {['x', 'y'].map((variable) => (
            <div 
              key={variable}
              onClick={() => status === 'answering' && setActiveInput(variable)}
              className={`flex-1 bg-white p-3 rounded-lg border-2 transition-all cursor-pointer relative shadow-sm
                ${activeInput === variable ? 'border-teal-500 ring-2 ring-teal-100' : 'border-gray-200'}
                ${status !== 'answering' ? 'opacity-80' : ''}
              `}
            >
              <span className="absolute top-1 left-2 text-lg text-gray-400 font-bold uppercase">{variable} =</span>
              <div className="text-center text-3xl h-10 font-mono text-gray-800 flex items-center justify-center mt-2">
                {inputs[variable] || <span className="text-gray-300 animate-pulse">?</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-16 flex items-center justify-center mb-2">
            {status === 'wrong' && (
                <div className="w-full bg-red-50 text-red-700 px-4 py-3 rounded-lg flex items-center justify-center gap-2 border border-red-200 animate-in slide-in-from-bottom-2 shadow-sm">
                    <div className="font-bold text-sm">正確答案:</div>
                    <div className="font-mono text-lg font-bold">x={formatFraction(equation.solX)}, y={formatFraction(equation.solY)}</div>
                </div>
            )}
            {status === 'correct' && (
                <div className="w-full bg-teal-50 text-teal-800 px-6 py-3 rounded-lg flex items-center justify-center gap-2 border border-teal-200 animate-in zoom-in-50 shadow-sm">
                    <Check className="w-6 h-6" /> 
                    <span className="font-bold text-lg">很好！正確！</span>
                </div>
            )}
        </div>
      </div>

      <div className="bg-gray-100 p-2 pb-6 grid grid-cols-4 gap-2 border-t border-gray-200 select-none shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {[7, 8, 9].map(n => (
          <KeyBtn key={n} val={n} onClick={() => handleKeyPress(n.toString())} />
        ))}
        <KeyBtn val="/" className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('/')} />

        {[4, 5, 6].map(n => (
          <KeyBtn key={n} val={n} onClick={() => handleKeyPress(n.toString())} />
        ))}
        <KeyBtn val="-" className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('-')} />

        {[1, 2, 3].map(n => (
          <KeyBtn key={n} val={n} onClick={() => handleKeyPress(n.toString())} />
        ))}
        <KeyBtn val="+" className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('+')} />

        <KeyBtn val="C" className="bg-red-100 text-red-600 border-red-200" onClick={() => handleKeyPress('C')} icon={<RotateCcw size={18} />} />
        <KeyBtn val={0} onClick={() => handleKeyPress('0')} />
        <KeyBtn val="Del" className="bg-amber-100 text-amber-700 border-amber-200" onClick={() => handleKeyPress('Backspace')} icon={<Delete size={18} />} />
        
        {status === 'answering' ? (
             <button 
             onClick={() => handleKeyPress('Enter')}
             className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md border-b-4 border-teal-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center font-bold text-lg"
           >
             {activeInput === 'x' ? 'Next' : 'Enter'}
           </button>
        ) : (
            <button 
            onClick={() => generateQuestion()}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center font-bold text-lg"
          >
            下一題 <ArrowRight className="ml-1 w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

const KeyBtn = ({ val, onClick, className = "", icon }) => (
  <button 
    onClick={onClick}
    className={`h-14 rounded-lg text-xl font-medium shadow-sm border border-gray-300 active:bg-gray-200 transition-colors flex items-center justify-center bg-white text-gray-800 hover:bg-gray-50 ${className}`}
  >
    {icon ? icon : val}
  </button>
);

// --- 資料庫 (包含所有題目與邏輯) ---
const QUESTIONS = [
    id: 1,
    title: "遊覽船船票",
    text: "某觀光遊覽船只有頭等和普通等兩類船票出售。已知共售出600張船票。其中售出的普通等船票數目為售出的頭等船票數目之三倍。若一張頭等船票的售價為$850,而一張普通等船票的售價為 $500,求售出船票的總值。",
    vars: "設 x 為頭等船票數目,y 為普通等船票數目。",
    segments: [
      { 
        text: "某觀光遊覽船只有頭等和普通等兩類船票出售。已知共售出600張船票。", 
        keywords: ["頭等", "和", "普通等", "共", "600"], 
        valid: ["x+y=600", "y+x=600"], 
        color: "text-red-600", 
        borderColor: "border-red-400",
        hint: "x + y = 600"
      },
      { 
        text: "售出的普通等船票數目為售出的頭等船票數目之三倍。", 
        keywords: ["普通等", "為", "頭等", "三倍"], 
        valid: ["y=3x", "y=3*x", "y=x*3"], 
        color: "text-green-600", 
        borderColor: "border-green-400",
        hint: "y = 3x"
      }
    ],
    answers: [
      ["x+y=600", "y+x=600"],
      ["y=3x", "y=3*x", "3x=y"]
    ]
  },
  {
    id: 2,
    title: "橙與蘋果",
    text: "一個橙子及一個蘋果的價錢分別為$2及$3,現花費了$46購買若干個橙子和蘋果。若所購買的橙子和蘋果的總數為20,求所購買橙子的數目。",
    vars: "設 x 為橙子數目,y 為蘋果數目。",
    segments: [
      { 
        text: "所購買的橙子和蘋果的總數為20。", 
        keywords: ["橙子", "和", "蘋果", "為", "20"], 
        valid: ["x+y=20", "y+x=20"], 
        color: "text-red-600", 
        borderColor: "border-red-400" 
      },
      { 
        text: "一個橙子及一個蘋果的價錢分別為$2及$3,現花費了$46購買若干個橙子和蘋果。", 
        keywords: ["花費了$46", "購買", "橙子", "和", "蘋果"],
        skipInputIndices: [0, 1], // 👈 跳過前兩個匹配（第一次的橙子和蘋果）
        valid: ["2x+3y=46", "3y+2x=46"], 
        color: "text-green-600", 
        borderColor: "border-green-400" 
      }
    ],
    answers: [
      ["x+y=20", "y+x=20"],
      ["2x+3y=46"]
    ]
  },
  {
    id: 3,
    title: "醫生診金",
    text: "某醫生為長者病人及非長者病人診症的診金分別為$120及$160。在某日,該醫生為67位病人診症,且總診金為$9000。該醫生當為多少位長者病人診症?",
    vars: "設 x 為長者病人人數,y 為非長者病人人數。",
    segments: [
      { text: "在某日,該醫生為67位病人診症。", keywords: ["67位病人"], valid: ["x+y=67", "y+x=67"], color: "text-red-600", borderColor: "border-red-400" },
      { 
        text: "某醫生為長者病人及非長者病人診症的診金分別為$120及$160,總診金為$9000。", 
        keywords: ["為", "長者病人", "及", "非長者病人診症的診金", "為", "及", "為", "9000"], 
        skipInputIndices: [0, 4, 5], 
        valid: ["120x+160y=9000"], 
        color: "text-green-600", 
        borderColor: "border-green-400" 
      }
    ],
    answers: [
      ["x+y=67", "y+x=67"],
      ["120x+160y=9000"]
    ]
  },
  {
    id: 4,
    title: "郵票數量",
    text: "偉明和小麗擁有郵票的總數為300。若小麗從郵局購入20枚郵票,她擁有郵票的數目將為偉明擁有的4倍。求偉明擁有郵票的數目。",
    vars: "設 x 為偉明郵票數,y 為小麗郵票數。",
    segments: [
      { text: "偉明和小麗擁有郵票的總數為300", keywords: ["偉明", "和", "小麗", "為", "300"], valid: ["x+y=300", "y+x=300"], color: "text-red-600", borderColor: "border-red-400" },
      { text: "若小麗從郵局購入20枚郵票, 她擁有郵票的數目將為偉明擁有的4倍。", keywords: ["購入20枚郵票, 她擁有郵票的數目", "將為", "偉明", "4倍"], valid: ["y+20=4x", "y+20=x*4"], color: "text-green-600", borderColor: "border-green-400" }
    ],
    answers: [
      ["x+y=300", "y+x=300"],
      ["y+20=4x", "4x=y+20"]
    ]
  },
  {
    id: 5,
    title: "飲品成本",
    text: "一瓶橙汁的成本與2瓶牛奶的成本相同。3瓶橙汁和5瓶牛奶的總成本為$66。求一瓶牛奶的成本。",
    vars: "設 x 為橙汁成本,y 為牛奶成本。",
    segments: [
      { 
        text: "一瓶橙汁的成本與2瓶牛奶的成本相同。", 
        keywords: ["橙汁的成本", "2瓶牛奶的成本", "相同"], 
        previewOrder: [0, 2, 1],
        valid: ["x=2y", "x=2*y"], 
        color: "text-red-600", 
        borderColor: "border-red-400" 
      },
      { text: "3瓶橙汁和5瓶牛奶的總成本為$66。", keywords: ["3瓶橙汁", "和", "5瓶牛奶", "為", "66"], valid: ["3x+5y=66"], color: "text-green-600", borderColor: "border-green-400" }
    ],
    answers: [
      ["x=2y"],
      ["3x+5y=66"]
    ]
  },
  {
    id: 6,
    title: "夏令營人數",
    text: "在某夏令營,男生人數與女生人數之比為7:6。若17名男生和4名女生離開該夏令營,則男生人數與女生人數相等。求在夏令營原本的女生人數。",
    vars: "設 x 為男生人數,y 為女生人數。",
    segments: [
      { text: "男生人數與女生人數之比為7:6。", keywords: ["男生人數與女生人數之比", "為", "7:6"], valid: ["x/y=7/6", "6x=7y"], color: "text-red-600", borderColor: "border-red-400" },
      { 
        text: "若17名男生和4名女生離開,人數相等。", 
        keywords: ["17名男生", "4名女生離開", "人數相等"], 
        previewOrder: [1, 5, 3],
        valid: ["x-17=y-4", "y-4=x-17"], 
        color: "text-green-600", 
        borderColor: "border-green-400" 
      }
    ],
    answers: [
      ["x/y=7/6", "6x=7y"],
      ["x-17=y-4", "y-4=x-17"]
    ]
  },
  {
    id: 7,
    title: "足球聯賽",
    text: "在某足球聯賽，每一球隊贏取一場球賽得3分，和得1分，而輸得0分。該聯賽的冠軍隊作賽36場且共得84分。已知該冠軍隊沒有輸掉任何一場球賽，求該冠軍隊贏取球賽的場數。",
    vars: "設 x 為贏場數,y 為和場數。",
    segments: [
      { 
        text: "該冠軍隊作賽36場(已知該冠軍隊沒有輸掉任何一場球賽)。", 
        keywords: ["作賽36場"], 
        valid: ["x+y=36"], 
        color: "text-red-600", 
        borderColor: "border-red-400" 
      },
      { 
        text: "共得 84 分 (贏取一場球賽得3分及和得1分)。", 
        keywords: ["共得", "84", "贏取一場球賽得3分", "及", "和得1分"], 
        previewOrder: [5, 7, 9, 1, 3],
        valid: ["84=3x+y", "3x+y=84"], 
        color: "text-green-600", 
        borderColor: "border-green-400" 
      }
    ],
    answers: [
      ["x+y=36", "y+x=36"],
      ["3x+y=84", "3x+1y=84"]
    ]
  },
  {
    id: 8,
    title: "保安員人數",
    text: "在設有6個展區的展覽中心內有132名保安員。各個展區均有相同人數的保安員。在每個展區內,女保安員均較男保安員多4名。求在該展覽中心內男保安員的人數。",
    vars: "設 x 為每區男保安,y 為每區女保安。",
    segments: [
      { text: "在設有6個展區的展覽中心內有132名保安員。各個展區均有相同人數的保安員。", keywords: ["6個展區", "內有", "132名保安員"], valid: ["6(x+y)=132", "6x+6y=132"], color: "text-red-600", borderColor: "border-red-400" },
      { text: "在每個展區內,女保安員均較男保安員多4名。", keywords: ["女", "較", "男", "多4名"], valid: ["y=x+4"], color: "text-green-600", borderColor: "border-green-400" }
    ],
    answers: [
      ["6(x+y)=132", "6x+6y=132"],
      ["y=x+4"]
    ]
  },
  {
    id: 9,
    title: "梨與橙 (價錢)",
    text: "7個梨和3個橙的價錢為$47,而5個梨和6個橙的價錢為$49。求一個梨的價錢。",
    vars: "設 x 為梨價錢,y 為橙價錢。",
    segments: [
      { text: "7個梨和3個橙的價錢為$47。", keywords: ["7個梨", "和", "3個橙", "為", "47"], valid: ["7x+3y=47"], color: "text-red-600", borderColor: "border-red-400" },
      { text: "而5個梨和6個橙的價錢為$49。", keywords: ["5個梨", "和", "6個橙", "為", "49"], valid: ["5x+6y=49"], color: "text-green-600", borderColor: "border-green-400" }
    ],
    answers: [
      ["7x+3y=47"],
      ["5x+6y=49"]
    ]
  },
  {
    id: 10,
    title: "蘋果轉讓",
    text: "佩玲擁有蘋果的數目為志偉擁有的4倍。若佩玲將她其中的12個蘋果送給志偉,他們將擁有相同數目的蘋果。求佩玲和志偉擁有蘋果的總數。",
    vars: "設 x 為佩玲數目,y 為志偉數目。",
    segments: [
      { 
        text: "佩玲擁有蘋果的數目為志偉擁有的4倍。", 
        keywords: ["佩玲", "為", "志偉", "4倍"], 
        valid: ["x=4y", "x=y*4"], 
        color: "text-red-600", 
        borderColor: "border-red-400" 
      },
      { 
        text: "佩玲將她其中的12個送給志偉,他們將擁有相同數目。", 
        keywords: ["佩玲", "12個送給志偉", "相同"], 
        previewOrder: [1, 5, 3],
        valid: ["x-12=y+12", "y+12=x-12"], 
        color: "text-green-600", 
        borderColor: "border-green-400" 
      }
    ],
    answers: [
      ["x=4y"],
      ["x-12=y+12"]
    ]
  },
  {
    id: 11,
    title: "劇院門票",
    text: "某劇院只有兩類門票:正價及特惠票。正價及特惠票的票價分別為$126及$78。在某日,售出正價票的數目為售出特惠票的數目之5倍,且售出門票所得的總金額為$50976,求該日售出門票的總數。",
    vars: "設 x 為正價數目,y 為特惠數目。",
    segments: [
      { text: "售出正價票的數目為售出特惠票的數目之5倍。", keywords: ["正價", "為", "特惠票", "5倍"], valid: ["x=5y"], color: "text-red-600", borderColor: "border-red-400" },
      { text: "某劇院只有兩類門票:正價及特惠票。正價及特惠票的票價分別是$126及$78,且售出門票所得的總金額為$50976", keywords: ["總金額", "為", "50976"], valid: ["126x+78y=50976"], color: "text-green-600", borderColor: "border-green-400" }
    ],
    answers: [
      ["x=5y"],
      ["126x+78y=50976", "78y+126x=50976"]
    ]
  },
  {
    id: 12,
    title: "遊樂場人數",
    text: "在某遊樂場,成人人數與小童人數之比為13:6 。若9名成人和24名小童進入該遊樂場,則成人人數與小童人數之比為8:7 。求在該遊樂場原本的成人人數。",
    vars: "設 x 為原本成人數,y 為原本小童數。",
    segments: [
      { text: "成人人數與小童人數之比為13:6。", keywords: ["成人人數與小童人數之比", "為", "13:6"], valid: ["x/y=13/6", "6x=13y"], color: "text-red-600", borderColor: "border-red-400" },
      { text: "若9名成人和24名小童進入該遊樂場,則成人人數與小童人數之比為8:7。", keywords: ["成人人數與小童人數之比", "為", "8:7"], valid: ["(x+9)/(y+24)=8/7", "7(x+9)=8(y+24)"], color: "text-green-600", borderColor: "border-green-400" }
    ],
    answers: [
      ["x/y=13/6", "6x=13y"],
      ["(x+9)/(y+24)=8/7", "7(x+9)=8(y+24)"]
    ]
  },
  {
    id: 13,
    title: "貼紙轉讓",
    text: "某男生擁有的貼紙數目為某女生擁有的3倍。若該男生將他其中的20張貼紙送給該女生,則該女生擁有貼紙的數目為該男生擁有的2倍。求該男生和該女生擁有貼紙的總數。",
    vars: "設 x 為男生數目,y 為女生數目。",
    segments: [
      { 
        text: "某男生擁有的貼紙數目為某女生擁有的3倍。", 
        keywords: ["男生", "為", "女生", "3倍"],
        valid: ["x=3y", "3y=x"], 
        color: "text-red-600", 
        borderColor: "border-red-400" 
      },
      { 
        text: "若該男生將他其中的20張貼紙送給該女生,則該女生擁有貼紙的數目為該男生擁有的2倍。", 
        keywords: ["男生", "女生擁有貼紙的數目", "為", "男生", "2倍"], 
        skipInputIndices: [0],
        valid: ["y+20=2(x-20)"], 
        color: "text-green-600", 
        borderColor: "border-green-400" 
      }
    ],
    answers: [
      ["x=3y", "3y=x"],
      ["y+20=2(x-20)", "y+20=2*(x-20)"]
    ]
  },
  {
    id: 14,
    title: "兩數關係",
    text: "設x及y為兩數。x與y之和為456,而7與x之積為y。求x。",
    vars: "設 x, y 為兩數。",
    segments: [
      { text: "x與y之和為456。", keywords: ["x", "與y之和", "為", "456"], valid: ["x+y=456"], color: "text-red-600", borderColor: "border-red-400" },
      { text: "7與x之積為y。", keywords: ["7", "與x之積", "為", "y"], valid: ["7x=y", "y=7x"], color: "text-green-600", borderColor: "border-green-400" }
    ],
    answers: [
      ["x+y=456"],
      ["7x=y", "7×x=y"]
    ]
  }
];

const CHEATSHEET = [
  { key: "連續數", val: "x, (x+1)" },
  { key: "大 / 多", val: "+" },
  { key: "小 / 少", val: "-" },
  { key: "2倍 (n倍)", val: "× 2 (× n)" },
  { key: "較 / 比 / 是", val: "=" },
  { key: "x 與 y 之和", val: "x + y" },
  { key: "x 的 12 年後", val: "x + 12" },
  { key: "y 的 3 年前", val: "y - 3" },
  { key: "一半", val: "÷ 2" },
  { key: "y 與 11 的積", val: "y × 11" },
  { key: "x 和 y 比例 6:5", val: "x/y = 6/5" }
];

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// 將題目文字中的 x, y 以 Times New Roman 斜體顯示（僅題目文本，不影響算式渲染）
const renderTextWithItalics = (text) => {
  if (!text) return null;
  const parts = text.split(/([xy])/g);
  return (
    <>
      {parts.map((part, idx) => (
        part === 'x' || part === 'y'
          ? <span key={idx} style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic' }}>{part}</span>
          : part
      ))}
    </>
  );
};

const MathRenderer = ({ expression }) => {
  if (!expression) return <span className="text-gray-400 italic text-sm md:text-base">等待輸入...</span>;

  const tokens = expression.match(/(\(.*?\)|[=+\-*/]|[0-9a-zA-Z.]+)/g) || [];

  const processedTokens = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === '/' && processedTokens.length > 0 && i + 1 < tokens.length) {
      const num = processedTokens.pop();
      const den = tokens[i + 1];
      
      const cleanNum = num.startsWith('(') && num.endsWith(')') ? num.slice(1, -1) : num;
      const cleanDen = den.startsWith('(') && den.endsWith(')') ? den.slice(1, -1) : den;

      processedTokens.push({ type: 'frac', num: cleanNum, den: cleanDen });
      i++;
    } else {
      processedTokens.push(token);
    }
  }

  const renderToken = (token) => {
    // Process each character: italicize only English letters, keep digits as normal
    const parts = token.split('');
    return (
      <span>
        {parts.map((char, idx) => {
          if (/[a-zA-Z]/.test(char)) {
            return <span key={idx} style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic' }}>{char}</span>;
          }
          return <span key={idx}>{char}</span>;
        })}
      </span>
    );
  };

  

  return (
    <div className="flex items-center flex-wrap gap-1 font-mono text-xl md:text-2xl text-gray-800">
      {processedTokens.map((part, idx) => {
        if (typeof part === 'object' && part.type === 'frac') {
          return (
            <div key={idx} className="inline-flex flex-col items-center justify-center align-middle mx-1">
              <span className="border-b-2 border-gray-800 px-1 leading-none pb-0.5 text-sm md:text-base" style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic' }}>{part.num}</span>
              <span className="leading-none pt-0.5 text-sm md:text-base" style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic' }}>{part.den}</span>
            </div>
          );
        } else if (['+', '-', '*', '='].includes(part)) {
           return <span key={idx} className="mx-1 font-bold">{part === '*' ? '×' : part}</span>;
        } else {
           return <span key={idx}>{renderToken(part)}</span>;
        }
      })}
    </div>
  );
};

const Keypad = ({ onInput, onDelete, onClear, onEnter, isVisible, toggleVisibility }) => {
  const keys = [
    '7', '8', '9', '/', '(', ')',
    '4', '5', '6', '*', 'x', 'y',
    '1', '2', '3', '+', '-', '=',
    'AC', '0', 'DEL', 'Enter'
  ];

  if (!isVisible) return (
     <button 
       onClick={toggleVisibility}
       className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition"
       title="開啟小鍵盤"
     >
       <KeyboardIcon size={24} />
     </button>
  );

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 md:bottom-4 md:right-4 bg-gray-100 p-2 border md:border-2 border-gray-300 md:rounded-xl shadow-2xl z-50 pb-6 md:pb-2 transition-all">
      <div className="flex justify-between items-center mb-2 px-1">
         <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Math Keypad</span>
         <button onClick={toggleVisibility} className="text-gray-400 hover:text-gray-600">
            <KeyboardIcon size={20}/>
         </button>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {keys.map((k) => {
          if (k === 'Enter') return (
            <button key={k} onClick={onEnter} className="col-span-2 bg-blue-600 text-white p-3 md:p-2 rounded-lg font-bold active:bg-blue-700 shadow hover:bg-blue-500 text-lg">提交</button>
          );
          if (k === 'AC') return (
            <button key={k} onClick={onClear} className="bg-red-200 p-3 md:p-2 rounded-lg font-bold text-red-800 active:bg-red-300 shadow hover:bg-red-100">AC</button>
          );
          if (k === 'DEL') return (
            <button key={k} onClick={onDelete} className="bg-orange-200 p-3 md:p-2 rounded-lg font-bold text-orange-800 active:bg-orange-300 shadow hover:bg-orange-100">
               <Delete size={20} className="mx-auto"/>
            </button>
          );
          return (
            <button key={k} onClick={() => onInput(k)} className="bg-white p-3 md:p-2 rounded-lg shadow font-bold text-lg md:text-xl active:bg-gray-200 hover:bg-gray-50 text-gray-700">
              {k}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const CheatsheetModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto shadow-2xl relative">
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition"
        >
            <X size={20} />
        </button>

        <h3 className="text-xl font-bold mb-4 flex items-center border-b pb-2 text-gray-800 pr-10">
            <BookOpen className="mr-2"/> 關鍵字筆記
        </h3>
        <div className="space-y-3">
          {CHEATSHEET.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
              <span className="font-medium text-gray-700 text-sm">{item.key}</span>
              <span className="font-mono text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-sm">{item.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SimultaneousEqQuiz() {
  const [mode, setMode] = useState('mode-select'); // 'mode-select', 'lv0', 'lv1', 'lv2'
  
  const [level, setLevel] = useState(1);
  const [qIndex, setQIndex] = useState(0);
  const [questionOrder, setQuestionOrder] = useState([]); 
  const [score, setScore] = useState(0);
  
  const [lv1Inputs, setLv1Inputs] = useState({});
  const [activeInput, setActiveInput] = useState(null); 
  const [lv2Inputs, setLv2Inputs] = useState(["", ""]);
  
  const [showNotes, setShowNotes] = useState(false);
  const [showKeypad, setShowKeypad] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [highlightHint, setHighlightHint] = useState(false);
  const [lv1Completed, setLv1Completed] = useState(false);
  const [inlineFeedback, setInlineFeedback] = useState(null);

  useEffect(() => {
    const indices = Array.from({ length: QUESTIONS.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setQuestionOrder(indices);
  }, []); 

  const currentQ = questionOrder.length > 0 ? QUESTIONS[questionOrder[qIndex]] : QUESTIONS[0];
  
  const inputRefs = useRef({});

  useEffect(() => {
    if (questionOrder.length > 0) {
        resetState();
    }
  }, [qIndex, level, questionOrder]);

  const resetState = () => {
    setLv1Inputs({});
    setLv2Inputs(["", ""]);
    setFeedback(null);
    setInlineFeedback(null);
    setLv1Completed(false);
    setHighlightHint(false);
    setActiveInput(null);
  };

  const handleVirtualInput = (char) => {
    if (!activeInput) return;
    
    let currentVal = "";
    if (activeInput.type === 'lv1') {
        currentVal = lv1Inputs[`${activeInput.index}-${activeInput.partIdx}`] || "";
    } else {
        currentVal = lv2Inputs[activeInput.index];
    }

    const newVal = currentVal + char;
    handleInputChange(newVal, activeInput.type, activeInput.index, activeInput.partIdx);
    
    let refKey = "";
    if (activeInput.type === 'lv1') {
        refKey = `lv1-${activeInput.index}-${activeInput.partIdx}`;
    } else {
        refKey = `lv2-${activeInput.index}`;
    }

    if(inputRefs.current[refKey]) {
        inputRefs.current[refKey].focus();
    }
  };
  
  const handleVirtualDelete = () => {
    if (!activeInput) return;
    let currentVal = "";
    if (activeInput.type === 'lv1') {
        currentVal = lv1Inputs[`${activeInput.index}-${activeInput.partIdx}`] || "";
    } else {
        currentVal = lv2Inputs[activeInput.index];
    }
    const newVal = currentVal.slice(0, -1);
    handleInputChange(newVal, activeInput.type, activeInput.index, activeInput.partIdx);
  };

  const handleVirtualClear = () => {
    if (!activeInput) return;
    handleInputChange("", activeInput.type, activeInput.index, activeInput.partIdx);
  };

  const handleInputChange = (newVal, type, index, partIdx) => {
    if (!type) return;

    if (type === 'lv1') {
      setLv1Inputs(prev => ({
          ...prev,
          [`${index}-${partIdx}`]: newVal
      }));
    } else {
      const newInputs = [...lv2Inputs];
      newInputs[index] = newVal;
      setLv2Inputs(newInputs);
    }
  };

  const normalize = (str) => {
    return str.toLowerCase().replace(/\s/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/:/g, '/');
  };

  const getCombinedLv1String = (segIdx) => {
    const segment = currentQ.segments[segIdx];
    const escapedKeywords = segment.keywords.map(escapeRegExp);
    const parts = segment.text.split(new RegExp(`(${escapedKeywords.join('|')})`, 'g'));
    
    if (segment.previewOrder) {
        // Use previewOrder to select and reorder parts, replacing keywords with inputs
        return segment.previewOrder.map(idx => {
            if (idx % 2 === 1) {
                // Keyword position - use the input value
                return lv1Inputs[`${segIdx}-${idx}`] || "";
            }
            // Text position - return as-is
            return parts[idx] || "";
        }).join("");
    }

    return parts.map((part, i) => {
        if (i % 2 === 1) {
             return lv1Inputs[`${segIdx}-${i}`] || "";
        }
        return ""; 
    }).join("");
  };

  const checkAnswer = () => {
    let allCorrect = true;
    let correctCount = 0;
    let correctAnswers = [];

    if (level === 1) {
        currentQ.segments.forEach((seg, idx) => {
            const userVal = normalize(getCombinedLv1String(idx));
            const validVals = seg.valid.map(normalize);
            
            if (validVals.includes(userVal)) {
                correctCount++;
            } else {
                allCorrect = false;
            }
            correctAnswers.push({
                label: idx === 0 ? "第一個方程" : "第二個方程",
                value: seg.valid[0]
            });
        });

        setScore(prev => prev + correctCount);

        if (allCorrect) {
            setInlineFeedback({ 
                type: 'success', 
                msg: `全對！做得好！ (+${correctCount} 分)`,
                action: nextQuestion,
                answers: []
            });
            setLv1Completed(true);
        } else {
            setInlineFeedback({ 
                type: 'error', 
                msg: `${correctCount > 0 ? `答對 ${correctCount} 個方程 (+${correctCount} 分)` : ''}`,
                action: nextQuestion,
                answers: correctAnswers
            });
        }
    } else {
        if (lv2Inputs.length < 2) {
            allCorrect = false;
        } else {
            lv2Inputs.forEach((input, idx) => {
                const userVal = normalize(input || "");
                if (currentQ.answers[idx]) {
                    const validVals = currentQ.answers[idx].map(normalize);
                    if (validVals.includes(userVal)) {
                        correctCount++;
                    } else {
                        allCorrect = false;
                    }
                    correctAnswers.push({
                        label: `方程 (${idx + 1})`,
                        value: currentQ.answers[idx][0]
                    });
                }
            });
        }

        setScore(prev => prev + correctCount);

        if (allCorrect) {
            setInlineFeedback({ 
                type: 'success', 
                msg: `全對！做得好！ (+${correctCount} 分)`,
                action: nextQuestion,
                answers: []
            });
            setLv1Completed(true);
        } else {
            setInlineFeedback({ 
                type: 'error', 
                msg: `${correctCount > 0 ? `答對 ${correctCount} 個方程 (+${correctCount} 分)` : ''}`,
                action: nextQuestion,
                answers: correctAnswers
            });
        }
    }
  };

  const nextQuestion = () => {
    setQIndex(prev => (prev + 1) % QUESTIONS.length);
    setFeedback(null); 
    setInlineFeedback(null);
  };

  const renderLv1Segment = (segment, idx) => {
    const escapedKeywords = segment.keywords.map(escapeRegExp);
    const parts = segment.text.split(new RegExp(`(${escapedKeywords.join('|')})`, 'g'));
    const skipInputIndices = segment.skipInputIndices || [];

    return (
      <div 
        key={idx} 
        className={`
          mb-8 p-4 rounded-xl border-l-8 transition-all relative
          ${segment.borderColor} bg-white shadow-sm
        `}
      >
        <div className="absolute -top-3 left-4 px-2 py-0.5 bg-white text-xs font-bold text-gray-500 rounded border shadow-sm">
            {idx === 0 ? "第一個方程" : "第二個方程"}
        </div>

        <div className="mb-4 text-lg md:text-xl leading-loose text-gray-700 font-serif break-words">
          {parts.map((part, i) => {
             const isKeyword = i % 2 === 1;
             
             if (isKeyword) {
                 const keywordIndex = (i - 1) / 2;
                 const shouldSkip = skipInputIndices.includes(keywordIndex);
                 
                 if (shouldSkip) {
                   return <span key={i} className="font-bold text-gray-700">{part}</span>;
                 }
                 
                 const isActive = activeInput?.type === 'lv1' && activeInput?.index === idx && activeInput?.partIdx === i;
                 return (
                   <span key={i} className="inline-flex flex-col items-center mx-2 align-top">
                     <input
                        ref={el => inputRefs.current[`lv1-${idx}-${i}`] = el}
                        type="text"
                        value={lv1Inputs[`${idx}-${i}`] || ""}
                        onChange={(e) => handleInputChange(e.target.value, 'lv1', idx, i)}
                        onFocus={() => setActiveInput({ type: 'lv1', index: idx, partIdx: i })}
                        style={{ width: `${Math.max(4, (lv1Inputs[`${idx}-${i}`] || "").length + 1)}ch` }}
                        className={`
                            h-10 text-center font-mono text-lg border-2 rounded-md shadow-sm min-w-[4rem]
                            focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors
                            ${isActive ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-50'}
                            ${segment.color.replace('text-', 'text-')}
                        `}
                        placeholder="..."
                      />
                      <span className={`text-sm mt-1 font-bold ${segment.color} opacity-70 whitespace-nowrap`}>
                        {part}
                      </span>
                   </span>
                 );
             } else {
               return <span key={i}>{part}</span>;
             }
          })}
        </div>

        <div className="mt-2 bg-gray-100 p-3 rounded-lg flex items-center gap-2">
            <span className="text-sm text-gray-500 font-bold">預覽:</span>
            <div className="flex-1 overflow-x-auto">
                <MathRenderer expression={getCombinedLv1String(idx)} />
            </div>
        </div>
      </div>
    );
  };

  // Mode selection screen
  if (mode === 'mode-select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Link 
          to="/" 
          className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
        >
          <HomeIcon size={18} />
          <span className="font-medium">返回首頁</span>
        </Link>

        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <Calculator className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">聯立方程特訓</h1>
            <p className="text-gray-600 text-lg">選擇您要進行的訓練模式</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* LV0 */}
            <button
              onClick={() => setMode('lv0')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all border-4 border-teal-200"
            >
              <div className="text-5xl mb-4">🔧</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">LV0</h2>
              <p className="text-gray-600 mb-4">方程計算</p>
              <p className="text-sm text-gray-500">
                基礎訓練：學會如何求解 2×2 聯立方程。從簡單的計算開始。
              </p>
            </button>

            {/* LV1 */}
            <button
              onClick={() => setMode('lv1')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all border-4 border-blue-200"
            >
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">LV1</h2>
              <p className="text-gray-600 mb-4">方程化簡</p>
              <p className="text-sm text-gray-500">
                進階訓練：從文字敍述提取關鍵詞，化成聯立方程。
              </p>
            </button>

            {/* LV2 */}
            <button
              onClick={() => setMode('lv2')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all border-4 border-purple-200"
            >
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">LV2</h2>
              <p className="text-gray-600 mb-4">全題挑戰</p>
              <p className="text-sm text-gray-500">
                完全挑戰：直接從文字題化簡並求解聯立方程。
              </p>
            </button>
          </div>

          <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Lightbulb className="text-amber-500" />
              訓練進度建議
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>✓ <strong>LV0 (初級)</strong>：掌握求解技巧，練習 10-20 題後進階</p>
              <p>✓ <strong>LV1 (中級)</strong>：熟悉關鍵詞提取，練習 15-25 題後進階</p>
              <p>✓ <strong>LV2 (進階)</strong>：全面掌握，DSE 備戰衝刺</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LV0 Trainer
  if (mode === 'lv0') {
    return <Prog01Trainer onBack={() => setMode('mode-select')} />;
  }

  // LV1 and LV2 Game modes
  return (
    <>
      <Link 
        to="/" 
        className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
      >
        <HomeIcon size={18} />
        <span className="font-medium">返回首頁</span>
      </Link>

      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white shadow-2xl min-h-screen md:min-h-[90vh] md:my-4 md:rounded-2xl overflow-hidden flex flex-col relative">
            
            <header className="bg-slate-800 text-white p-4 md:p-6 flex justify-between items-center z-10">
                <div>
                <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <Calculator className="text-blue-400"/> 
                    <span>聯立方程特訓</span>
                    <span className="text-sm bg-blue-600 px-2 py-0.5 rounded-full">LV{level}</span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                    <Trophy className="text-yellow-400" size={20}/>
                    <span className="text-lg font-bold text-yellow-400">{score} 分</span>
                </div>
                </div>
                <div className="flex gap-2">
                <button onClick={() => setMode('mode-select')} className="text-sm bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition border border-indigo-500 font-bold">
                    ← 選擇模式
                </button>
                <button onClick={() => setLevel(level === 1 ? 2 : 1)} className="text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition border border-slate-600">
                    切換模式
                </button>
                <button onClick={() => setShowNotes(true)} className="p-2 hover:bg-slate-700 rounded-lg transition text-blue-300">
                    <BookOpen size={24}/>
                </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 md:pb-8">
                {currentQ && (
                    <>
                    <div className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-200">
                        <p className="text-gray-800 text-lg leading-relaxed font-serif">{renderTextWithItalics(currentQ.text)}</p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                       <p className="text-blue-900 font-medium md:text-lg">
                         <span className="font-bold">題目：</span>{renderTextWithItalics(currentQ.vars)}
                       </p>
                    </div>

                    {level === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b pb-2">{currentQ.title}</h2>
                            {currentQ.segments.map((seg, idx) => renderLv1Segment(seg, idx))}
                            
                            {inlineFeedback && (
                                <div className={`p-4 rounded-xl border-2 animate-in fade-in slide-in-from-top-2 ${inlineFeedback.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                         {inlineFeedback.type === 'success' ? <CheckCircle size={20}/> : <XCircle size={20}/>}
                                         {inlineFeedback.type === 'success' ? '答對了！' : '再試一次'}
                                    </h3>
                                    {inlineFeedback.msg && (
                                        <div className="mb-3 text-sm">
                                            {inlineFeedback.msg}
                                        </div>
                                    )}
                                    {inlineFeedback.answers && inlineFeedback.answers.length > 0 && (
                                        <div className="space-y-2 mb-3 pl-7">
                                            <p className="text-sm font-semibold">正確答案參考：</p>
                                            {inlineFeedback.answers.map((ans, idx) => (
                                                <div key={idx} className="text-sm">
                                                    <span className="font-semibold">{ans.label}: </span>
                                                    <span className="inline-block ml-2">
                                                        <MathRenderer expression={ans.value} />
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-3 flex gap-2">
                                        <button 
                                            onClick={inlineFeedback.action} 
                                            className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition"
                                        >
                                            下一題
                                        </button>
                                        {inlineFeedback.type === 'error' && (
                                            <button onClick={() => setInlineFeedback(null)} className="text-sm underline opacity-70 hover:opacity-100 px-4 py-2">
                                                關閉提示
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {level === 2 && (
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentQ.title}</h2>
                                <p className="text-lg md:text-xl text-gray-700 leading-loose">
                                    {highlightHint ? (
                                        (() => {
                                            const allKeywords = currentQ.segments.flatMap(s => s.keywords);
                                            const escapedAllKeywords = allKeywords.map(escapeRegExp);
                                            const uniquePattern = [...new Set(escapedAllKeywords)].join('|');
                                            
                                            return currentQ.text.split(new RegExp(`(${uniquePattern})`, 'g')).map((part, i) => 
                                                allKeywords.includes(part) 
                                                ? <span key={i} className="bg-yellow-200 px-1 rounded">{part}</span> 
                                                : part
                                            );
                                        })()
                                    ) : currentQ.text}
                                </p>
                                <button 
                                    onClick={() => setHighlightHint(!highlightHint)}
                                    className="absolute top-6 right-6 text-amber-500 bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition"
                                >
                                    <Lightbulb size={24} className={highlightHint ? "fill-current" : ""}/>
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[0, 1].map((idx) => (
                                    <div 
                                        key={idx}
                                        className={`
                                            p-4 rounded-xl border-2 transition-all cursor-text relative
                                            ${activeInput?.type === 'lv2' && activeInput?.index === idx ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 bg-gray-50'}
                                        `}
                                        onClick={() => {
                                            setActiveInput({ type: 'lv2', index: idx });
                                            if(inputRefs.current[`lv2-${idx}`]) inputRefs.current[`lv2-${idx}`].focus();
                                        }}
                                    >
                                        <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold text-gray-500 border rounded">
                                            方程 ({idx + 1})
                                        </span>
                                        <div className="flex items-center mt-2">
                                            <input
                                                ref={el => inputRefs.current[`lv2-${idx}`] = el}
                                                type="text"
                                                value={lv2Inputs[idx]}
                                                onChange={(e) => handleInputChange(e.target.value, 'lv2', idx)}
                                                className="w-full bg-transparent text-xl md:text-2xl font-mono focus:outline-none"
                                                placeholder="..."
                                            />
                                        </div>
                                        <div className="mt-2 h-8 flex items-center justify-end text-gray-400">
                                             <MathRenderer expression={lv2Inputs[idx]} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {inlineFeedback && (
                                <div className={`p-4 rounded-xl border-2 animate-in fade-in slide-in-from-top-2 ${inlineFeedback.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                         {inlineFeedback.type === 'success' ? <CheckCircle size={20}/> : <XCircle size={20}/>}
                                         {inlineFeedback.type === 'success' ? '答對了！' : '再試一次'}
                                    </h3>
                                    {inlineFeedback.msg && (
                                        <div className="mb-3 text-sm">
                                            {inlineFeedback.msg}
                                        </div>
                                    )}
                                    {inlineFeedback.answers && inlineFeedback.answers.length > 0 && (
                                        <div className="space-y-2 mb-3 pl-7">
                                            <p className="text-sm font-semibold">正確答案參考：</p>
                                            {inlineFeedback.answers.map((ans, idx) => (
                                                <div key={idx} className="text-sm">
                                                    <span className="font-semibold">{ans.label}: </span>
                                                    <span className="inline-block ml-2">
                                                        <MathRenderer expression={ans.value} />
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-3 flex gap-2">
                                        <button 
                                            onClick={inlineFeedback.action} 
                                            className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition"
                                        >
                                            下一題
                                        </button>
                                        {inlineFeedback.type === 'error' && (
                                            <button onClick={() => setInlineFeedback(null)} className="text-sm underline opacity-70 hover:opacity-100 px-4 py-2">
                                                關閉提示
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    </>
                )}
            </main>

            <div className="bg-gray-800 text-white p-2 md:px-8 text-center md:text-left z-20 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">輸入值:</span>
                    <div className="bg-gray-700 px-4 py-1 rounded-lg min-w-[100px]">
                        <MathRenderer expression={
                            activeInput 
                            ? (activeInput.type === 'lv1' 
                                ? lv1Inputs[`${activeInput.index}-${activeInput.partIdx}`] 
                                : lv2Inputs[activeInput.index]) 
                            : ""
                        } />
                    </div>
                </div>
                <button onClick={checkAnswer} className="hidden md:block bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-bold shadow">
                    檢查答案
                </button>
            </div>
            
            <Keypad 
                isVisible={showKeypad}
                toggleVisibility={() => setShowKeypad(!showKeypad)}
                onInput={handleVirtualInput} 
                onDelete={handleVirtualDelete} 
                onClear={handleVirtualClear} 
                onEnter={checkAnswer} 
            />
            
            <CheatsheetModal isOpen={showNotes} onClose={() => setShowNotes(false)} />
        </div>
        </div>
    </>  );
}