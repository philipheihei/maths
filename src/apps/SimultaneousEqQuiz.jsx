import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, Calculator, Lightbulb, Delete, CheckCircle, XCircle, Keyboard as KeyboardIcon, X, Trophy, Home as HomeIcon, ChevronRight, RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadKatexOnce } from '../utils/katexLoader';

// ========== PROG01 工具函數 ==========
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};

const simplifyFraction = (num, den) => {
  if (den === 0) return { num: 0, den: 1 };
  const g = gcd(num, den);
  let sNum = num / g;
  let sDen = den / g;
  if (sDen < 0) {
    sNum = -sNum;
    sDen = -sDen;
  }
  return { num: sNum, den: sDen };
};

const formatAnswer = (num, den) => {
  const simplified = simplifyFraction(num, den);
  if (simplified.den === 1) {
    return String(simplified.num);
  }
  return `${simplified.num}/${simplified.den}`;
};

const parseUserAnswer = (input) => {
  if (!input || input.trim() === '') return null;
  const trimmed = input.trim();
  
  if (trimmed.includes('/')) {
    const parts = trimmed.split('/');
    if (parts.length !== 2) return null;
    const num = parseFloat(parts[0]);
    const den = parseFloat(parts[1]);
    if (isNaN(num) || isNaN(den) || den === 0) return null;
    return num / den;
  }
  
  const val = parseFloat(trimmed);
  if (isNaN(val)) return null;
  return val;
};

const compareAnswers = (userInput, correctNum, correctDen) => {
  const userVal = parseUserAnswer(userInput);
  if (userVal === null) return false;
  const correctVal = correctNum / correctDen;
  return Math.abs(userVal - correctVal) < 0.0001;
};

// ========== PROG01 題目生成器 ==========
const generateProg01Lv1Question = () => {
  // 确保答案是整数：只使用整数值
  const xNumerators = [-10, -8, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const yNumerators = [-10, -8, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const denominators = [1];  // 只使用1作为分母，确保答案是整数
  
  const xNum = xNumerators[Math.floor(Math.random() * xNumerators.length)];
  const xDen = 1;
  const yNum = yNumerators[Math.floor(Math.random() * yNumerators.length)];
  const yDen = 1;
  
  const xVal = xNum / xDen;
  const yVal = yNum / yDen;
  
  let a, b, c, d, e, f;
  let attempts = 0;
  
  do {
    // a 總是正數（第一個方程的 x 係數）
    a = Math.floor(Math.random() * 9) + 1;
    b = Math.floor(Math.random() * 9) + 1;
    if (Math.random() < 0.5) b = -b;  // b 有 50% 機率是負
    
    // d 總是正數或負數，但確保多樣性
    d = Math.floor(Math.random() * 9) + 1;
    if (Math.random() < 0.6) d = -d;  // d 有 60% 機率是負
    
    // e 的符號與 b 相反的機率較高（製造多樣題目）
    e = Math.floor(Math.random() * 9) + 1;
    if (b > 0) {
      if (Math.random() < 0.6) e = -e;  // 如果 b 是正，e 有 60% 機率是負
    } else {
      if (Math.random() < 0.4) e = -e;  // 如果 b 是負，e 有 40% 機率是負（增加多樣性）
    }
    
    c = a * xVal + b * yVal;
    f = d * xVal + e * yVal;
    
    attempts++;
  } while ((Math.abs(a * e - b * d) < 0.001 || !Number.isInteger(c) || !Number.isInteger(f)) && attempts < 100);
  
  if (!Number.isInteger(c) || !Number.isInteger(f)) {
    const simpleX = Math.floor(Math.random() * 10) - 5;
    const simpleY = Math.floor(Math.random() * 10) - 5;
    a = Math.floor(Math.random() * 5) + 1;  // a 總是正
    b = Math.floor(Math.random() * 5) + 1;
    if (Math.random() < 0.5) b = -b;
    
    d = Math.floor(Math.random() * 5) + 1;
    if (Math.random() < 0.6) d = -d;
    
    e = Math.floor(Math.random() * 5) + 1;
    if (b > 0) {
      if (Math.random() < 0.6) e = -e;
    } else {
      if (Math.random() < 0.4) e = -e;
    }
    
    c = a * simpleX + b * simpleY;
    f = d * simpleX + e * simpleY;
    
    return {
      a, b, c: Math.round(c), d, e, f: Math.round(f),
      xNum: simpleX, xDen: 1,
      yNum: simpleY, yDen: 1
    };
  }
  
  return {
    a, b, c: Math.round(c), d, e, f: Math.round(f),
    xNum, xDen,
    yNum, yDen
  };
};

const PROG01_LV2_TEMPLATES = [
  {
    id: 'A',
    generate: () => {
      // 使用能产生整数答案的k值和total组合
      const combinations = [
        { k: 2, total: 180 },     // x=120, y=60
        { k: 3, total: 200 },     // x=150, y=50
        { k: 1.5, total: 150 },   // x=90, y=60
        { k: 0.5, total: 120 },   // x=40, y=80
        { k: 2.5, total: 140 },   // x=100, y=40
        { k: 1.4, total: 120 },   // x=70, y=50
        { k: 0.8, total: 180 }    // x=80, y=100
      ];
      
      const { k, total } = combinations[Math.floor(Math.random() * combinations.length)];
      const y = total / (1 + k);
      const x = k * y;
      
      // 确保答案是整数（以防万一）
      const finalX = Math.round(x);
      const finalY = Math.round(y);
      
      return {
        eq1Display: `x + y = ${total}`,
        eq2Display: k === Math.floor(k) ? `x = ${k}y` : `x = ${k}y`,
        eq1Standard: { a: 1, b: 1, c: total },
        eq2Standard: { a: 1, b: -k, c: 0 },
        xVal: finalX,
        yVal: finalY
      };
    }
  },
  {
    id: 'B',
    generate: () => {
      // 使用能产生整数答案的参数组合
      const n = Math.floor(Math.random() * 20) + 10;  // n: 10-29的整数
      const a2 = Math.floor(Math.random() * 3) + 3;   // a2: 3-5
      const b2 = Math.floor(Math.random() * 3) + 3;   // b2: 3-5
      const m = (b2 * n) / a2;
      
      // 如果m不是整数，调整n使其成为整数
      let finalN = n;
      let finalM = m;
      if (!Number.isInteger(m)) {
        finalN = n * a2 / gcd(a2, b2);  // 调整n使m成为整数
        finalM = (b2 * finalN) / a2;
      }
      
      const a1 = Math.floor(Math.random() * 3) + 2;  // a1: 2-4
      const b1 = Math.floor(Math.random() * 3) + 2;  // b1: 2-4
      const c = a1 * finalM + b1 * finalN;
      
      return {
        eq1Display: `${a1}m + ${b1}n = ${c}`,
        eq2Display: `${a2}m = ${b2}n`,
        eq1Standard: { a: a1, b: b1, c: c },
        eq2Standard: { a: a2, b: -b2, c: 0 },
        xVal: Math.round(finalM),
        yVal: Math.round(finalN),
        varX: 'm',
        varY: 'n'
      };
    }
  },
  {
    id: 'C',
    generate: () => {
      // 使用能产生整数答案的参数组合
      const combinations = [
        { k: 2, coef: 2, offset: 20 },  // x=60, y=120
        { k: 3, coef: 2, offset: 20 },  // x=60, y=180
        { k: 2, coef: 3, offset: 20 },  // x=40, y=80
        { k: 3, coef: 3, offset: 30 },  // x=60, y=180
        { k: 4, coef: 2, offset: 30 },  // x=90, y=360
        { k: 2, coef: 2, offset: 30 }   // x=90, y=180
      ];
      
      const { k, coef, offset } = combinations[Math.floor(Math.random() * combinations.length)];
      const c2 = offset * (1 + coef);
      const x = c2 / (coef * k - 1);
      const y = k * x;
      
      return {
        eq1Display: `${k}x = y`,
        eq2Display: `${coef}(y − ${offset}) = x + ${offset}`,
        eq1Standard: { a: k, b: -1, c: 0 },
        eq2Standard: { a: -1, b: coef, c: c2 },
        xVal: Math.round(x),
        yVal: Math.round(y)
      };
    }
  }
];

const generateProg01Lv2Question = () => {
  const template = PROG01_LV2_TEMPLATES[Math.floor(Math.random() * PROG01_LV2_TEMPLATES.length)];
  const question = template.generate();
  return {
    ...question,
    varX: question.varX || 'x',
    varY: question.varY || 'y'
  };
};

// ========== 應用題資料庫 ==========
const WORD_PROBLEMS = [
  {
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
        skipInputIndices: [0, 1],
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

// ========== 工具函數 ==========
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

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

// ========== 渲染組件 ==========
const LaTeXEquationDisplay = ({ a, b, c, d, e, f }) => {
  const [katexLoaded, setKatexLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    loadKatexOnce().then(() => setKatexLoaded(true));
  }, []);

  useEffect(() => {
    if (katexLoaded && containerRef.current && window.katex) {
      // Format coefficient: omit 1, show -1 as just minus sign
      const formatCoef = (coef) => {
        if (coef === 1) return '';
        if (coef === -1) return '-';
        return String(coef);
      };
      
      // Format term with proper sign
      const formatTerm = (coef, variable) => {
        if (coef === 0) return '';
        if (coef === 1) return `+${variable}`;
        if (coef === -1) return `-${variable}`;
        if (coef > 0) return `+${coef}${variable}`;
        return `${coef}${variable}`;
      };
      
      const term1 = formatTerm(b, 'y');
      const term2 = formatTerm(e, 'y');
      const latex = `\\left\\{\\begin{array}{l} ${formatCoef(a)}x${term1} = ${c} \\\\ ${formatCoef(d)}x${term2} = ${f} \\end{array}\\right.`;
      try {
        window.katex.render(latex, containerRef.current, {
          displayMode: true,
          throwOnError: false
        });
      } catch (e) {
        console.error('KaTeX render error:', e);
      }
    }
  }, [katexLoaded, a, b, c, d, e, f]);

  if (!katexLoaded) {
    const formatTerm = (coef) => {
      if (coef > 0) return ` + ${coef}`;
      return ` ${coef}`;
    };
    
    return (
      <div className="text-xl space-y-2 ml-4">
        <div>{a}x{formatTerm(b)}y = {c}</div>
        <div>{d}x{formatTerm(e)}y = {f}</div>
      </div>
    );
  }

  return <div ref={containerRef} className="text-2xl" />;
};

const MathRenderer = ({ expression, size = 'normal' }) => {
  if (!expression) return <span className="text-gray-400 italic text-sm md:text-base">等待輸入...</span>;

  const sizeClass = size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl';
  
  // Handle fraction display for Prog01
  if (expression.includes('/') && !expression.includes('(') && !expression.includes('+') && !expression.includes('-') && !expression.includes('*')) {
    const parts = expression.split('/');
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return (
        <span className={`inline-flex flex-col items-center ${sizeClass}`}>
          <span className="border-b-2 border-current px-1">{parts[0]}</span>
          <span>{parts[1]}</span>
        </span>
      );
    }
  }

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
    <div className={`flex items-center flex-wrap gap-1 font-mono ${sizeClass} text-gray-800`}>
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

const EquationDisplay = ({ a, b, c, varX = 'x', varY = 'y', showPlaceholders = false, inputs = {}, onInputChange, inputRefs, eqIndex }) => {
  if (showPlaceholders) {
    return (
      <div className="flex items-center gap-1 text-xl md:text-2xl font-mono flex-wrap">
        <input
          ref={el => { if (inputRefs) inputRefs.current[`eq${eqIndex}-a`] = el; }}
          type="text"
          value={inputs.a || ''}
          onChange={(e) => onInputChange && onInputChange('a', e.target.value)}
          className="w-12 h-10 text-center border-2 border-blue-300 rounded bg-blue-50 focus:border-blue-500 focus:outline-none"
          placeholder="?"
        />
        <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span>
        <span className="mx-1">+</span>
        <input
          ref={el => { if (inputRefs) inputRefs.current[`eq${eqIndex}-b`] = el; }}
          type="text"
          value={inputs.b || ''}
          onChange={(e) => onInputChange && onInputChange('b', e.target.value)}
          className="w-12 h-10 text-center border-2 border-green-300 rounded bg-green-50 focus:border-green-500 focus:outline-none"
          placeholder="?"
        />
        <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varY}</span>
        <span className="mx-1">=</span>
        <input
          ref={el => { if (inputRefs) inputRefs.current[`eq${eqIndex}-c`] = el; }}
          type="text"
          value={inputs.c || ''}
          onChange={(e) => onInputChange && onInputChange('c', e.target.value)}
          className="w-14 h-10 text-center border-2 border-purple-300 rounded bg-purple-50 focus:border-purple-500 focus:outline-none"
          placeholder="?"
        />
      </div>
    );
  }

  const parts = [];
  
  if (a !== 0) {
    if (a === 1) {
      parts.push(<span key="x" className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span>);
    } else if (a === -1) {
      parts.push(<span key="x">−<span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span></span>);
    } else {
      parts.push(<span key="x">{a}<span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span></span>);
    }
  }
  
  if (b !== 0) {
    const sign = b > 0 ? ' + ' : ' − ';
    const absB = Math.abs(b);
    if (a !== 0) {
      parts.push(<span key="sign">{sign}</span>);
    } else if (b < 0) {
      parts.push(<span key="sign">−</span>);
    }
    if (absB === 1) {
      parts.push(<span key="y" className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varY}</span>);
    } else {
      parts.push(<span key="y">{absB}<span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varY}</span></span>);
    }
  }
  
  parts.push(<span key="eq"> = {c}</span>);
  
  return (
    <div className="text-xl md:text-2xl font-mono flex items-center">
      {parts}
    </div>
  );
};

// ========== 鍵盤組件 ==========
// Reusable Key Component
const KeyBtn = ({ val, onClick, className = "", icon }) => (
  <button 
    onClick={onClick}
    className={`
      h-14 rounded-lg text-xl font-medium shadow-sm border border-gray-300 
      active:bg-gray-200 transition-colors flex items-center justify-center
      bg-white text-gray-800 hover:bg-gray-50
      ${className}
    `}
  >
    {icon ? icon : val}
  </button>
);

const Keypad = ({ onInput, onDelete, onClear, onEnter, onTab, showFraction = false }) => {
  const handleKeyPress = (key) => {
    if (key === 'C') onClear();
    else if (key === 'Backspace') onDelete();
    else if (key === 'Enter') onEnter();
    else if (key === 'Tab') {
      // Tab functionality - move to next input
      if (onTab) onTab();
    }
    else onInput(key);
  };

  if (showFraction) {
    // Fraction Keypad (4 columns)
    return (
      <div className="fixed bottom-0 left-0 right-0 md:relative z-30">
        {/* Drag handle for mobile only */}
        <div className="flex justify-center pt-2 md:hidden bg-gray-100">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        
        <div className="bg-gray-100 p-2 pb-6 md:pb-2 grid grid-cols-4 gap-2 border-t border-gray-200 select-none shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          {/* Row 1 */}
          {[7, 8, 9].map(n => (
            <KeyBtn key={n} val={n} onClick={() => handleKeyPress(n.toString())} />
          ))}
          <KeyBtn val="/" className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('/')} />

          {/* Row 2 */}
          {[4, 5, 6].map(n => (
            <KeyBtn key={n} val={n} onClick={() => handleKeyPress(n.toString())} />
          ))}
          <KeyBtn val="-" className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('-')} />

          {/* Row 3 */}
          {[1, 2, 3].map(n => (
            <KeyBtn key={n} val={n} onClick={() => handleKeyPress(n.toString())} />
          ))}
          <KeyBtn val="+" className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('+')} />

          {/* Row 4 (Special Keys) */}
          <KeyBtn val="AC" className="bg-red-100 text-red-600 border-red-200" onClick={() => handleKeyPress('C')} />
          <KeyBtn val={0} onClick={() => handleKeyPress('0')} />
          <KeyBtn val="DEL" className="bg-amber-100 text-amber-700 border-amber-200" onClick={() => handleKeyPress('Backspace')} />
          
          {/* Action Button with TAB effect */}
          <button 
            onClick={() => handleKeyPress('Tab')}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md border-b-4 border-teal-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center font-bold text-lg"
          >
            next
          </button>
        </div>
      </div>
    );
  }

  // Algebraic Keypad (6 columns)
  return (
    <div className="fixed bottom-0 left-0 right-0 md:relative z-30">
      {/* Drag handle for mobile only */}
      <div className="flex justify-center pt-2 md:hidden bg-gray-100">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
      </div>
      
      <div className="bg-gray-100 p-2 pb-6 md:pb-2 grid grid-cols-6 gap-2 border-t border-gray-200 select-none shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {/* Row 1 */}
        {[7, 8, 9].map(n => (
          <KeyBtn key={n} val={n} onClick={() => handleKeyPress(n.toString())} />
        ))}
        <KeyBtn val="/" className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('/')} />
        <KeyBtn val="(" className="bg-gray-200 text-gray-600" onClick={() => handleKeyPress('(')} />
        <KeyBtn val=")" className="bg-gray-200 text-gray-600" onClick={() => handleKeyPress(')')} />

        {/* Row 2 */}
        {[4, 5, 6].map(n => (
          <KeyBtn key={n} val={n} onClick={() => handleKeyPress(n.toString())} />
        ))}
        <KeyBtn val="×" className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('*')} />
        <KeyBtn val="x" className="bg-blue-100 text-blue-700 border-blue-200 italic font-serif" onClick={() => handleKeyPress('x')} />
        <KeyBtn val="y" className="bg-green-100 text-green-700 border-green-200 italic font-serif" onClick={() => handleKeyPress('y')} />

        {/* Row 3 */}
        {[1, 2, 3].map(n => (
          <KeyBtn key={n} val={n} onClick={() => handleKeyPress(n.toString())} />
        ))}
        <KeyBtn val="+" className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('+')} />
        <KeyBtn val="-" className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('-')} />
        <KeyBtn val="=" className="bg-gray-200 text-gray-600" onClick={() => handleKeyPress('=')} />

        {/* Row 4 (Special Keys) */}
        <KeyBtn val="AC" className="bg-red-100 text-red-600 border-red-200" onClick={() => handleKeyPress('C')} />
        <KeyBtn val={0} onClick={() => handleKeyPress('0')} />
        <KeyBtn val="DEL" className="bg-amber-100 text-amber-700 border-amber-200" onClick={() => handleKeyPress('Backspace')} />
        
        {/* Action Button with TAB effect - spans 3 columns */}
        <button 
          onClick={() => handleKeyPress('Tab')}
          className="col-span-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md border-b-4 border-teal-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center font-bold text-lg"
        >
          next
        </button>
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

// ========== 主組件 ==========
export default function SimultaneousEqQuiz() {
  // 模式選擇: null, 'prog01-lv1', 'prog01-lv2', 'word-lv1', 'word-lv2'
  const [mode, setMode] = useState(null);
  const [score, setScore] = useState({ x: 0, y: 0, total: 0 });
  const [questionCount, setQuestionCount] = useState(0);
  
  // Prog01 states
  const [prog01Question, setProg01Question] = useState(null);
  const [prog01Step, setProg01Step] = useState(1); // For Prog01 LV2
  const [xAnswer, setXAnswer] = useState('');
  const [yAnswer, setYAnswer] = useState('');
  const [eq1Inputs, setEq1Inputs] = useState({ a: '', b: '', c: '' });
  const [eq2Inputs, setEq2Inputs] = useState({ a: '', b: '', c: '' });
  
  // Word problem states
  const [qIndex, setQIndex] = useState(0);
  const [questionOrder, setQuestionOrder] = useState([]);
  const [lv1Inputs, setLv1Inputs] = useState({});
  const [lv2Inputs, setLv2Inputs] = useState(["", ""]);
  const [wordLv1Completed, setWordLv1Completed] = useState(false);
  
  const [activeInput, setActiveInput] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [highlightHint, setHighlightHint] = useState(false);
  const [inlineFeedback, setInlineFeedback] = useState(null);
  
  const inputRefs = useRef({});

  // Initialize word problem order
  useEffect(() => {
    if (mode === 'word-lv1' || mode === 'word-lv2') {
      const indices = Array.from({ length: WORD_PROBLEMS.length }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setQuestionOrder(indices);
    }
  }, [mode]);

  const generateProg01Question = useCallback(() => {
    if (mode === 'prog01-lv1') {
      setProg01Question(generateProg01Lv1Question());
    } else if (mode === 'prog01-lv2') {
      setProg01Question(generateProg01Lv2Question());
      setProg01Step(1);
    }
    setXAnswer('');
    setYAnswer('');
    setEq1Inputs({ a: '', b: '', c: '' });
    setEq2Inputs({ a: '', b: '', c: '' });
    setFeedback(null);
    setShowHint(false);
    setActiveInput(null);
  }, [mode]);

  useEffect(() => {
    if (mode && mode.startsWith('prog01')) {
      generateProg01Question();
    }
  }, [mode, generateProg01Question]);

  useEffect(() => {
    if (mode && mode.startsWith('word') && questionOrder.length > 0) {
      resetWordState();
    }
  }, [qIndex, mode, questionOrder]);

  // Auto-focus first input when prog01 question loads
  useEffect(() => {
    if (mode === 'prog01-lv1' && prog01Question && !activeInput && inputRefs.current['x']) {
      setActiveInput({ field: 'x', setter: setXAnswer });
      setTimeout(() => inputRefs.current['x']?.focus(), 0);
    }
  }, [prog01Question, mode]);

  // Auto-focus first input when prog01 lv2 step changes
  useEffect(() => {
    if (mode === 'prog01-lv2' && prog01Step === 1 && prog01Question && !activeInput && inputRefs.current['eq1-a']) {
      setActiveInput({ 
        field: 'eq1-a', 
        setter: (v) => setEq1Inputs(p => ({ ...p, a: v }))
      });
      setTimeout(() => inputRefs.current['eq1-a']?.focus(), 0);
    }
  }, [prog01Step, prog01Question, mode]);

  const resetWordState = () => {
    setLv1Inputs({});
    setLv2Inputs(["", ""]);
    setFeedback(null);
    setInlineFeedback(null);
    setWordLv1Completed(false);
    setHighlightHint(false);
    setActiveInput(null);
  };

  const handleKeypadInput = (char) => {
    if (!activeInput) return;
    
    const { setter } = activeInput;
    
    if (char === '±') {
      setter(prev => {
        if (prev.startsWith('-')) {
          return prev.slice(1);
        } else if (prev !== '' && prev !== '0') {
          return '-' + prev;
        }
        return prev;
      });
      return;
    }
    
    setter(prev => prev + char);
  };

  const handleKeypadDelete = () => {
    if (!activeInput) return;
    const { setter } = activeInput;
    setter(prev => prev.slice(0, -1));
  };

  const handleKeypadClear = () => {
    if (!activeInput) return;
    const { setter } = activeInput;
    setter('');
  };

  const handleKeypadTab = () => {
    // Move to next input field
    const allInputKeys = Object.keys(inputRefs.current);
    if (allInputKeys.length === 0) return;
    
    const currentField = activeInput?.field;
    if (!currentField) {
      // Focus first input if no active input
      const firstKey = allInputKeys[0];
      inputRefs.current[firstKey]?.focus();
      return;
    }
    
    // Find current index and move to next
    const currentIndex = allInputKeys.indexOf(currentField);
    if (currentIndex !== -1 && currentIndex < allInputKeys.length - 1) {
      const nextKey = allInputKeys[currentIndex + 1];
      inputRefs.current[nextKey]?.focus();
    } else {
      // Loop back to first input
      const firstKey = allInputKeys[0];
      inputRefs.current[firstKey]?.focus();
    }
  };

  const handleInputChange = (newVal, type, index, partIdx) => {
    if (!type) return;

    if (type === 'lv1') {
      setLv1Inputs(prev => ({
          ...prev,
          [`${index}-${partIdx}`]: newVal
      }));
    } else if (type === 'lv2') {
      const newInputs = [...lv2Inputs];
      newInputs[index] = newVal;
      setLv2Inputs(newInputs);
    }
  };

  const normalize = (str) => {
    return str.toLowerCase().replace(/\s/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/:/g, '/');
  };

  const getCombinedLv1String = (segIdx) => {
    const currentQ = WORD_PROBLEMS[questionOrder[qIndex]];
    const segment = currentQ.segments[segIdx];
    const escapedKeywords = segment.keywords.map(escapeRegExp);
    const parts = segment.text.split(new RegExp(`(${escapedKeywords.join('|')})`, 'g'));
    
    if (segment.previewOrder) {
        return segment.previewOrder.map(idx => {
            if (idx % 2 === 1) {
                return lv1Inputs[`${segIdx}-${idx}`] || "";
            }
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

  // Check Prog01 LV1 Answer
  const checkProg01Lv1Answer = () => {
    if (!prog01Question) return;
    
    const { xNum, xDen, yNum, yDen } = prog01Question;
    const xCorrect = compareAnswers(xAnswer, xNum, xDen);
    const yCorrect = compareAnswers(yAnswer, yNum, yDen);
    
    let pointsEarned = { x: 0, y: 0 };
    if (xCorrect) pointsEarned.x = 1;
    if (yCorrect) pointsEarned.y = 1;
    
    setScore(prev => ({
      x: prev.x + pointsEarned.x,
      y: prev.y + pointsEarned.y,
      total: prev.total + pointsEarned.x + pointsEarned.y
    }));
    
    setQuestionCount(prev => prev + 1);
    
    const correctXStr = formatAnswer(xNum, xDen);
    const correctYStr = formatAnswer(yNum, yDen);
    
    if (xCorrect && yCorrect) {
      setFeedback({
        type: 'success',
        message: '全對！做得好！ (+2 分)',
        correctX: correctXStr,
        correctY: correctYStr
      });
    } else {
      setFeedback({
        type: 'error',
        message: `${pointsEarned.x + pointsEarned.y > 0 ? `答對 ${pointsEarned.x + pointsEarned.y} 個 (+${pointsEarned.x + pointsEarned.y} 分)` : '答錯了'}`,
        correctX: correctXStr,
        correctY: correctYStr,
        xWrong: !xCorrect,
        yWrong: !yCorrect
      });
    }
  };

  // Check Prog01 LV2 Step 1
  const checkProg01Lv2Step1 = () => {
    if (!prog01Question) return;
    
    const { eq1Standard, eq2Standard } = prog01Question;
    
    const eq1Correct = 
      parseFloat(eq1Inputs.a) === eq1Standard.a &&
      parseFloat(eq1Inputs.b) === eq1Standard.b &&
      parseFloat(eq1Inputs.c) === eq1Standard.c;
    
    const eq2Correct = 
      parseFloat(eq2Inputs.a) === eq2Standard.a &&
      parseFloat(eq2Inputs.b) === eq2Standard.b &&
      parseFloat(eq2Inputs.c) === eq2Standard.c;
    
    if (eq1Correct && eq2Correct) {
      setFeedback({
        type: 'success',
        message: '轉換正確！現在求解 x 和 y。'
      });
      setTimeout(() => {
        setProg01Step(2);
        setFeedback(null);
      }, 1500);
    } else {
      setFeedback({
        type: 'error',
        message: '轉換有誤，請再試一次。',
        showCorrect: true,
        eq1: eq1Standard,
        eq2: eq2Standard
      });
    }
  };

  // Check Prog01 LV2 Step 2
  const checkProg01Lv2Step2 = () => {
    if (!prog01Question) return;
    
    const { xVal, yVal } = prog01Question;
    
    const xCorrect = Math.abs(parseUserAnswer(xAnswer) - xVal) < 0.01;
    const yCorrect = Math.abs(parseUserAnswer(yAnswer) - yVal) < 0.01;
    
    let pointsEarned = { x: 0, y: 0 };
    if (xCorrect) pointsEarned.x = 1;
    if (yCorrect) pointsEarned.y = 1;
    
    setScore(prev => ({
      x: prev.x + pointsEarned.x,
      y: prev.y + pointsEarned.y,
      total: prev.total + pointsEarned.x + pointsEarned.y
    }));
    
    setQuestionCount(prev => prev + 1);
    
    const correctXStr = Number.isInteger(xVal) ? String(xVal) : xVal.toFixed(2);
    const correctYStr = Number.isInteger(yVal) ? String(yVal) : yVal.toFixed(2);
    
    if (xCorrect && yCorrect) {
      setFeedback({
        type: 'success',
        message: '全對！做得好！ (+2 分)',
        correctX: correctXStr,
        correctY: correctYStr
      });
    } else {
      setFeedback({
        type: 'error',
        message: `${pointsEarned.x + pointsEarned.y > 0 ? `答對 ${pointsEarned.x + pointsEarned.y} 個 (+${pointsEarned.x + pointsEarned.y} 分)` : '答錯了'}`,
        correctX: correctXStr,
        correctY: correctYStr,
        xWrong: !xCorrect,
        yWrong: !yCorrect
      });
    }
  };

  // Check Word LV1 Answer
  const checkWordLv1Answer = () => {
    const currentQ = WORD_PROBLEMS[questionOrder[qIndex]];
    let allCorrect = true;
    let correctCount = 0;
    let correctAnswers = [];

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

    setScore(prev => ({
      ...prev,
      total: prev.total + correctCount
    }));

    if (allCorrect) {
        setInlineFeedback({ 
            type: 'success', 
            msg: `全對！做得好！ (+${correctCount} 分)`,
            action: nextWordQuestion,
            answers: []
        });
        setWordLv1Completed(true);
    } else {
        setInlineFeedback({ 
            type: 'error', 
            msg: `${correctCount > 0 ? `答對 ${correctCount} 個方程 (+${correctCount} 分)` : ''}`,
            action: nextWordQuestion,
            answers: correctAnswers
        });
    }
  };

  // Check Word LV2 Answer
  const checkWordLv2Answer = () => {
    const currentQ = WORD_PROBLEMS[questionOrder[qIndex]];
    let allCorrect = true;
    let correctCount = 0;
    let correctAnswers = [];

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

    setScore(prev => ({
      ...prev,
      total: prev.total + correctCount
    }));

    if (allCorrect) {
        setInlineFeedback({ 
            type: 'success', 
            msg: `全對！做得好！ (+${correctCount} 分)`,
            action: nextWordQuestion,
            answers: []
        });
        setWordLv1Completed(true);
    } else {
        setInlineFeedback({ 
            type: 'error', 
            msg: `${correctCount > 0 ? `答對 ${correctCount} 個方程 (+${correctCount} 分)` : ''}`,
            action: nextWordQuestion,
            answers: correctAnswers
        });
    }
  };

  const handleSubmit = () => {
    if (mode === 'prog01-lv1') {
      checkProg01Lv1Answer();
    } else if (mode === 'prog01-lv2') {
      if (prog01Step === 1) {
        checkProg01Lv2Step1();
      } else {
        checkProg01Lv2Step2();
      }
    } else if (mode === 'word-lv1') {
      checkWordLv1Answer();
    } else if (mode === 'word-lv2') {
      checkWordLv2Answer();
    }
  };

  const nextProg01Question = () => {
    generateProg01Question();
  };

  const nextWordQuestion = () => {
    setQIndex(prev => (prev + 1) % WORD_PROBLEMS.length);
    setFeedback(null);
    setInlineFeedback(null);
  };

  // ========== 渲染函數 ==========

  // Mode Selection Screen
  if (!mode) {
    return (
      <>
        <Link 
          to="/" 
          className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
        >
          <HomeIcon size={18} />
          <span className="font-medium">返回首頁</span>
        </Link>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 text-slate-800 flex items-center justify-center gap-3">
              <Calculator className="text-blue-600" size={36} />
              聯立方程訓練中心
            </h1>
            <p className="text-center text-gray-600 mb-8">選擇訓練模式</p>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setMode('prog01-lv1')}
                className="group p-6 bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-white"
              >
                <div className="text-sm font-bold mb-2 opacity-90">Prog 01 訓練</div>
                <div className="text-2xl font-bold mb-2">LV1 標準形式</div>
                <div className="text-sm opacity-80">求解 ax + by = c 形式的聯立方程</div>
              </button>

              <button
                onClick={() => setMode('prog01-lv2')}
                className="group p-6 bg-gradient-to-br from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-white"
              >
                <div className="text-sm font-bold mb-2 opacity-90">Prog 01 訓練</div>
                <div className="text-2xl font-bold mb-2">LV2 轉換形式</div>
                <div className="text-sm opacity-80">先轉換成標準形式，再求解</div>
              </button>

              <button
                onClick={() => setMode('word-lv1')}
                className="group p-6 bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-white"
              >
                <div className="text-sm font-bold mb-2 opacity-90">設式特訓</div>
                <div className="text-2xl font-bold mb-2">LV1 填空模式</div>
                <div className="text-sm opacity-80">從應用題文字中提取關鍵詞設式</div>
              </button>

              <button
                onClick={() => setMode('word-lv2')}
                className="group p-6 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-white"
              >
                <div className="text-sm font-bold mb-2 opacity-90">設式特訓</div>
                <div className="text-2xl font-bold mb-2">LV2 完整設式</div>
                <div className="text-sm opacity-80">從應用題完整寫出兩條方程</div>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Prog01 LV1 Render
  const renderProg01Lv1 = () => {
    if (!prog01Question) return null;
    const { a, b, c, d, e, f } = prog01Question;
    
    return (
      <div className="space-y-6">
        <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
          <h3 className="text-lg font-bold text-slate-700 mb-4">解以下聯立方程：</h3>
          <LaTeXEquationDisplay a={a} b={b} c={c} d={d} e={e} f={f} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div 
            className={`p-4 rounded-xl border-2 transition-all ${activeInput?.field === 'x' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
            onClick={() => inputRefs.current['x']?.focus()}
          >
            <label className="block text-lg font-bold text-gray-600 mb-2">
              <span className="italic text-2xl" style={{ fontFamily: 'Times New Roman, serif' }}>x</span> =
            </label>
            <input
              ref={el => inputRefs.current['x'] = el}
              type="text"
              value={xAnswer}
              onChange={(e) => setXAnswer(e.target.value)}
              onFocus={() => setActiveInput({ field: 'x', setter: setXAnswer })}
              className={`w-full text-2xl font-mono p-2 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${feedback?.xWrong ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              placeholder="?"
            />
          </div>
          
          <div 
            className={`p-4 rounded-xl border-2 transition-all ${activeInput?.field === 'y' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
            onClick={() => inputRefs.current['y']?.focus()}
          >
            <label className="block text-lg font-bold text-gray-600 mb-2">
              <span className="italic text-2xl" style={{ fontFamily: 'Times New Roman, serif' }}>y</span> =
            </label>
            <input
              ref={el => inputRefs.current['y'] = el}
              type="text"
              value={yAnswer}
              onChange={(e) => setYAnswer(e.target.value)}
              onFocus={() => setActiveInput({ field: 'y', setter: setYAnswer })}
              className={`w-full text-2xl font-mono p-2 border-2 rounded-lg focus:outline-none focus:border-green-500 ${feedback?.yWrong ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              placeholder="?"
            />
          </div>
        </div>

        {feedback && (
          <div className={`p-4 rounded-xl border-2 ${feedback.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className={`font-bold text-lg ${feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {feedback.message}
            </p>
            {feedback.type === 'error' && (
              <div className="mt-3 space-y-1 text-gray-700">
                <p>正確答案：</p>
                <p className="ml-4 font-mono">
                  <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>x</span> = {feedback.correctX}
                </p>
                <p className="ml-4 font-mono">
                  <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>y</span> = {feedback.correctY}
                </p>
              </div>
            )}
            <button
              onClick={nextProg01Question}
              className="mt-4 bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition flex items-center gap-2"
            >
              下一題 <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  };

  // Prog01 LV2 Render
  const renderProg01Lv2 = () => {
    if (!prog01Question) return null;
    const { eq1Display, eq2Display, eq1Standard, eq2Standard, varX, varY } = prog01Question;
    
    if (!eq1Standard || !eq2Standard) {
      console.error('Missing eq1Standard or eq2Standard:', prog01Question);
      return <div className="p-4 text-red-600">題目資料錯誤，請重新整理頁面</div>;
    }

    return (
      <div className="space-y-6">
        <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200">
          <h3 className="text-lg font-bold text-amber-800 mb-4">原題：</h3>
          <div className="space-y-2 ml-4 text-xl font-mono">
            <p>{eq1Display}</p>
            <p>{eq2Display}</p>
          </div>
        </div>

        {prog01Step === 1 ? (
          <>
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">1</span>
                將方程化為標準形式：
              </h3>
              
              <div className="space-y-4 ml-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-500 mr-2">方程 (1):</span>
                  <EquationDisplay 
                    showPlaceholders 
                    varX={varX} 
                    varY={varY}
                    inputs={eq1Inputs}
                    onInputChange={(key, val) => {
                      setEq1Inputs(prev => ({ ...prev, [key]: val }));
                      setActiveInput({ 
                        field: `eq1-${key}`, 
                        setter: (v) => setEq1Inputs(p => ({ ...p, [key]: v }))
                      });
                    }}
                    inputRefs={inputRefs}
                    eqIndex={1}
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-500 mr-2">方程 (2):</span>
                  <EquationDisplay 
                    showPlaceholders 
                    varX={varX} 
                    varY={varY}
                    inputs={eq2Inputs}
                    onInputChange={(key, val) => {
                      setEq2Inputs(prev => ({ ...prev, [key]: val }));
                      setActiveInput({ 
                        field: `eq2-${key}`, 
                        setter: (v) => setEq2Inputs(p => ({ ...p, [key]: v }))
                      });
                    }}
                    inputRefs={inputRefs}
                    eqIndex={2}
                  />
                </div>
              </div>

              <button
                onClick={() => setShowHint(!showHint)}
                className="mt-4 text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm"
              >
                <Lightbulb size={16} className={showHint ? 'fill-current' : ''} />
                {showHint ? '隱藏提示' : '顯示提示'}
              </button>

              {showHint && (
                <div className="mt-2 p-3 bg-amber-100 rounded-lg text-sm text-amber-800">
                  <p>提示：將所有含 {varX} 和 {varY} 的項移到等號左邊，常數移到右邊。</p>
                  <p className="mt-1">標準形式：a{varX} + b{varY} = c</p>
                </div>
              )}
            </div>

            {feedback && feedback.type === 'error' && feedback.showCorrect && (
              <div className="p-4 rounded-xl border-2 bg-red-50 border-red-200">
                <p className="font-bold text-red-700">{feedback.message}</p>
                <div className="mt-3 space-y-2 text-gray-700">
                  <p>正確標準形式：</p>
                  <div className="ml-4">
                    <EquationDisplay a={feedback.eq1.a} b={feedback.eq1.b} c={feedback.eq1.c} varX={varX} varY={varY} />
                    <EquationDisplay a={feedback.eq2.a} b={feedback.eq2.b} c={feedback.eq2.c} varX={varX} varY={varY} />
                  </div>
                </div>
                <button
                  onClick={nextProg01Question}
                  className="mt-4 bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition flex items-center gap-2"
                >
                  下一題 <ChevronRight size={20} />
                </button>
              </div>
            )}

            {feedback && feedback.type === 'success' && (
              <div className="p-4 rounded-xl border-2 bg-green-50 border-green-200">
                <p className="font-bold text-green-700">{feedback.message}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2</span>
                求解：
              </h3>
              
              <div className="space-y-2 ml-4 mb-4 text-lg font-mono">
                <EquationDisplay a={eq1Standard.a} b={eq1Standard.b} c={eq1Standard.c} varX={varX} varY={varY} />
                <EquationDisplay a={eq2Standard.a} b={eq2Standard.b} c={eq2Standard.c} varX={varX} varY={varY} />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div 
                  className={`p-4 rounded-xl border-2 transition-all ${activeInput?.field === 'x' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                  onClick={() => inputRefs.current['x2']?.focus()}
                >
                  <label className="block text-lg font-bold text-gray-600 mb-2">
                    <span className="italic text-2xl" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span> =
                  </label>
                  <input
                    ref={el => inputRefs.current['x2'] = el}
                    type="text"
                    inputMode="none"
                    readOnly
                    value={xAnswer}
                    onChange={(e) => setXAnswer(e.target.value)}
                    onFocus={() => setActiveInput({ field: 'x', setter: setXAnswer })}
                    className={`w-full text-2xl font-mono p-2 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${feedback?.xWrong ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    placeholder="?"
                  />
                </div>
                
                <div 
                  className={`p-4 rounded-xl border-2 transition-all ${activeInput?.field === 'y' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}
                  onClick={() => inputRefs.current['y2']?.focus()}
                >
                  <label className="block text-lg font-bold text-gray-600 mb-2">
                    <span className="italic text-2xl" style={{ fontFamily: 'Times New Roman, serif' }}>{varY}</span> =
                  </label>
                  <input
                    ref={el => inputRefs.current['y2'] = el}
                    type="text"
                    inputMode="none"
                    readOnly
                    value={yAnswer}
                    onChange={(e) => setYAnswer(e.target.value)}
                    onFocus={() => setActiveInput({ field: 'y', setter: setYAnswer })}
                    className={`w-full text-2xl font-mono p-2 border-2 rounded-lg focus:outline-none focus:border-green-500 ${feedback?.yWrong ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    placeholder="?"
                  />
                </div>
              </div>
            </div>

            {feedback && (
              <div className={`p-4 rounded-xl border-2 ${feedback.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <p className={`font-bold text-lg ${feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {feedback.message}
                </p>
                {feedback.type === 'error' && (
                  <div className="mt-3 space-y-1 text-gray-700">
                    <p>正確答案：</p>
                    <p className="ml-4 font-mono">
                      <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span> = {feedback.correctX}
                    </p>
                    <p className="ml-4 font-mono">
                      <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varY}</span> = {feedback.correctY}
                    </p>
                  </div>
                )}
                <button
                  onClick={nextProg01Question}
                  className="mt-4 bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition flex items-center gap-2"
                >
                  下一題 <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Word Problem LV1 Render
  const renderWordLv1Segment = (segment, idx) => {
    const currentQ = WORD_PROBLEMS[questionOrder[qIndex]];
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

  const renderWordLv1 = () => {
    if (questionOrder.length === 0) return null;
    const currentQ = WORD_PROBLEMS[questionOrder[qIndex]];

    return (
      <div className="space-y-6">
        <div className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-800 text-lg leading-relaxed font-serif">{renderTextWithItalics(currentQ.text)}</p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
           <p className="text-blue-900 font-medium md:text-lg">
             <span className="font-bold">題目：</span>{renderTextWithItalics(currentQ.vars)}
           </p>
        </div>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b pb-2">{currentQ.title}</h2>
            {currentQ.segments.map((seg, idx) => renderWordLv1Segment(seg, idx))}
            
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
      </div>
    );
  };

  // Word Problem LV2 Render
  const renderWordLv2 = () => {
    if (questionOrder.length === 0) return null;
    const currentQ = WORD_PROBLEMS[questionOrder[qIndex]];

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentQ.title}</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-loose font-serif">
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
                ) : renderTextWithItalics(currentQ.text)}
            </p>
            <button 
                onClick={() => setHighlightHint(!highlightHint)}
                className="absolute top-6 right-6 text-amber-500 bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition"
            >
                <Lightbulb size={24} className={highlightHint ? "fill-current" : ""}/>
            </button>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
           <p className="text-blue-900 font-medium md:text-lg">
             <span className="font-bold">題目：</span>{renderTextWithItalics(currentQ.vars)}
           </p>
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
    );
  };

  // Main render with mode selected
  const getModeTitle = () => {
    if (mode === 'prog01-lv1') return 'Prog 01 訓練 - LV1';
    if (mode === 'prog01-lv2') return 'Prog 01 訓練 - LV2';
    if (mode === 'word-lv1') return '設式特訓 - LV1';
    if (mode === 'word-lv2') return '設式特訓 - LV2';
    return '';
  };

  const getModeSubtitle = () => {
    if (mode === 'prog01-lv1') return '標準形式求解';
    if (mode === 'prog01-lv2') return '轉換形式求解';
    if (mode === 'word-lv1') return '填空模式';
    if (mode === 'word-lv2') return '完整設式';
    return '';
  };

  const showFractionKeypad = mode === 'prog01-lv1' || mode === 'prog01-lv2';

  return (
    <>
      <button 
        onClick={() => {
          setMode(null);
          setProg01Step(1);
          setFeedback(null);
          setXAnswer('');
          setYAnswer('');
          setEq1Inputs({ a: '', b: '', c: '' });
          setEq2Inputs({ a: '', b: '', c: '' });
        }}
        className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">返回選單</span>
      </button>

      <Link 
        to="/" 
        className="fixed top-4 right-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
      >
        <HomeIcon size={18} />
        <span className="font-medium">首頁</span>
      </Link>

      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white shadow-2xl min-h-screen md:min-h-[90vh] md:my-4 md:rounded-2xl overflow-hidden flex flex-col relative">
            
            <header className="bg-slate-800 text-white p-4 md:p-6 flex justify-between items-center z-10">
                <div>
                <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <Calculator className="text-blue-400"/> 
                    <span>{getModeTitle()}</span>
                </h1>
                <p className="text-slate-300 text-sm mt-1">{getModeSubtitle()}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Trophy className="text-yellow-400" size={20}/>
                      <span className="text-xl font-bold text-yellow-400">{score.total}</span>
                      <span className="text-slate-400 text-xs">分</span>
                    </div>
                  </div>
                  {mode.startsWith('word') && (
                    <button onClick={() => setShowNotes(true)} className="p-2 hover:bg-slate-700 rounded-lg transition text-blue-300">
                      <BookOpen size={24}/>
                    </button>
                  )}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 md:pb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">已完成: {questionCount} 題</span>
                  {mode.startsWith('prog01') && (
                    <button 
                      onClick={generateProg01Question}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <RotateCcw size={14} /> 換一題
                    </button>
                  )}
                </div>

                {mode === 'prog01-lv1' && renderProg01Lv1()}
                {mode === 'prog01-lv2' && renderProg01Lv2()}
                {mode === 'word-lv1' && renderWordLv1()}
                {mode === 'word-lv2' && renderWordLv2()}
            </main>

            <div className="bg-gray-800 text-white p-2 md:px-8 text-center md:text-left z-20 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">
                      {activeInput 
                        ? `輸入: ${activeInput.field || activeInput.type}` 
                        : '點擊輸入框作答'
                      }
                    </span>
                </div>
                <button 
                  onClick={handleSubmit} 
                  disabled={feedback !== null && feedback.type !== 'error'}
                  className="hidden md:block bg-green-600 hover:bg-green-500 disabled:bg-gray-600 px-6 py-2 rounded-lg font-bold shadow transition"
                >
                  {mode && mode.startsWith('prog01') ? '遞交答案' : '檢查答案'}
                </button>
            </div>
            
            <Keypad 
                onInput={handleKeypadInput} 
                onDelete={handleKeypadDelete} 
                onClear={handleKeypadClear} 
                onEnter={handleSubmit}
                onTab={handleKeypadTab}
                showFraction={showFractionKeypad}
            />
            
            <CheatsheetModal isOpen={showNotes} onClose={() => setShowNotes(false)} />
        </div>
      </div>
    </>
  );
}
