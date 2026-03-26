import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, Calculator, Lightbulb, Delete, CheckCircle, XCircle, Keyboard as KeyboardIcon, X, Trophy, Home as HomeIcon, ChevronRight, RotateCcw, ArrowLeft, Cpu } from 'lucide-react';
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
  const value = num / den;
  // If it's an integer, show without decimal places
  if (Number.isInteger(value)) {
    return String(value);
  }
  // Otherwise show with 2 decimal places
  return value.toFixed(2);
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
      // 公式: kx = y, coef(y - offset) = x + offset
      // 代入: coef(kx - offset) = x + offset
      // coef*k*x - coef*offset = x + offset
      // x(coef*k - 1) = offset(1 + coef)
      // x = offset(1 + coef) / (coef*k - 1)
      // 需要確保 (coef*k - 1) 能整除 offset(1 + coef)
      const combinations = [
        { k: 2, coef: 3, offset: 10 },  // x = 10(4)/5 = 8, y = 16
        { k: 3, coef: 2, offset: 10 },  // x = 10(3)/5 = 6, y = 18
        { k: 4, coef: 2, offset: 14 },  // x = 14(3)/7 = 6, y = 24
        { k: 3, coef: 3, offset: 8 },   // x = 8(4)/8 = 4, y = 12
        { k: 2, coef: 2, offset: 9 },   // x = 9(3)/3 = 9, y = 18
        { k: 5, coef: 2, offset: 18 },  // x = 18(3)/9 = 6, y = 30
        { k: 4, coef: 3, offset: 22 },  // x = 22(4)/11 = 8, y = 32
        { k: 2, coef: 4, offset: 7 },   // x = 7(5)/7 = 5, y = 10
        { k: 3, coef: 4, offset: 11 }   // x = 11(5)/11 = 5, y = 15
      ];
      
      const { k, coef, offset } = combinations[Math.floor(Math.random() * combinations.length)];
      const c2 = offset * (1 + coef);
      const divisor = coef * k - 1;
      const x = c2 / divisor;
      const y = k * x;
      
      // 驗證答案是整數
      if (!Number.isInteger(x) || !Number.isInteger(y)) {
        // 備用方案：使用簡單的整數答案
        return {
          eq1Display: `2x = y`,
          eq2Display: `3(y − 9) = x + 9`,
          eq1Standard: { a: 2, b: -1, c: 0 },
          eq2Standard: { a: -1, b: 3, c: 36 },
          xVal: 9,
          yVal: 18
        };
      }
      
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
// Display for Prog01 LV2 original equations with LaTeX
const Prog01Lv2OriginalDisplay = ({ eq1, eq2, varX, varY }) => {
  const [katexLoaded, setKatexLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    loadKatexOnce().then(() => setKatexLoaded(true));
  }, []);

  useEffect(() => {
    if (katexLoaded && containerRef.current && window.katex) {
      // Clean up display equations by removing spaces around operators
      const cleanEq1 = eq1.replace(/\s+/g, '');
      const cleanEq2 = eq2.replace(/\s+/g, '');
      
      const latex = `\\left\\{\\begin{array}{l} ${cleanEq1} \\\\ ${cleanEq2} \\end{array}\\right.`;
      try {
        window.katex.render(latex, containerRef.current, {
          displayMode: true,
          throwOnError: false
        });
      } catch (e) {
        console.error('KaTeX render error:', e);
        containerRef.current.innerHTML = `<div class="text-xl space-y-2"><div>${eq1}</div><div>${eq2}</div></div>`;
      }
    }
  }, [katexLoaded, eq1, eq2]);

  if (!katexLoaded) {
    return (
      <div className="text-xl space-y-2 ml-4 font-sans">
        <div>{eq1}</div>
        <div>{eq2}</div>
      </div>
    );
  }

  return <div ref={containerRef} className="text-2xl ml-4" />;
};

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
    <div className={`flex items-center flex-wrap gap-1 font-sans ${sizeClass} text-gray-800`}>
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

const EquationDisplay = ({ a, b, c, varX = 'x', varY = 'y', showPlaceholders = false, inputs = {}, onInputChange, onFocus, inputRefs, eqIndex }) => {
  if (showPlaceholders) {
    return (
      <div className="flex items-center gap-1 text-xl md:text-2xl font-sans flex-wrap">
        <input
          ref={el => { if (inputRefs) inputRefs.current[`eq${eqIndex}-a`] = el; }}
          type="text"
          inputMode="none"
          value={inputs.a || ''}
          onChange={(e) => onInputChange && onInputChange('a', e.target.value)}
          onFocus={() => onFocus && onFocus('a')}
          className="w-12 h-10 text-center border-2 border-blue-300 rounded bg-blue-50 focus:border-blue-500 focus:outline-none"
          placeholder="?"
        />
        <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span>
        <span className="mx-1">+</span>
        <input
          ref={el => { if (inputRefs) inputRefs.current[`eq${eqIndex}-b`] = el; }}
          type="text"
          inputMode="none"
          value={inputs.b || ''}
          onChange={(e) => onInputChange && onInputChange('b', e.target.value)}
          onFocus={() => onFocus && onFocus('b')}
          className="w-12 h-10 text-center border-2 border-green-300 rounded bg-green-50 focus:border-green-500 focus:outline-none"
          placeholder="?"
        />
        <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varY}</span>
        <span className="mx-1">=</span>
        <input
          ref={el => { if (inputRefs) inputRefs.current[`eq${eqIndex}-c`] = el; }}
          type="text"
          inputMode="none"
          value={inputs.c || ''}
          onChange={(e) => onInputChange && onInputChange('c', e.target.value)}
          onFocus={() => onFocus && onFocus('c')}
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
    <div className="text-xl md:text-2xl font-sans flex items-center">
      {parts}
    </div>
  );
};

// ========== 鍵盤組件 ==========
// Fraction Icon Component (matches IndexLaws style)
const FractionIcon = () => (
  <span className="font-serif italic font-bold text-lg">a b/c</span>
);

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

const Keypad = ({ onInput, onDelete, onClear, onEnter, onTab, showFraction = false, mode = null }) => {
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
          {mode === 'prog01-lv2' ? (
            <KeyBtn val="." className="bg-gray-200 text-teal-700 font-bold" onClick={() => handleKeyPress('.')} />
          ) : (
            <KeyBtn icon={<FractionIcon />} className="bg-gray-200 text-teal-700" onClick={() => handleKeyPress('/')} />
          )}

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
        <KeyBtn icon={<FractionIcon />} className="bg-gray-200 text-teal-700" onClick={() => handleKeyPress('/')} />
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
              <span className="font-sans text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-sm">{item.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ========== 計算機程式 Modal ==========
const CalculatorProgramModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-blue-950 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu size={24} className="text-blue-300" />
            <span className="font-bold text-lg">計算機程式</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-blue-800 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-white p-4 md:p-6">
          {/* Calculator Model */}
          <div className="bg-blue-900 text-white text-center py-2 px-4 rounded-lg mb-4 text-sm md:text-base">
            📟 CASIO fx-50FH II 計算機程式
          </div>
          
          <h2 className="text-blue-900 font-bold text-lg md:text-xl text-center border-b-2 border-blue-500 pb-2 mb-4">
            Prog 01：解聯立二元一次方程
          </h2>
          
          {/* Equation Box */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center mb-6 border-2 border-blue-400">
            <p className="text-sm text-gray-600 mb-2">適用於解以下題目：</p>
            <div className="text-lg md:text-xl font-bold text-blue-900 flex items-center justify-center gap-3">
              <span className="text-5xl leading-none">{`{`}</span>
              <div className="text-left">
                <div>Ax + By = C</div>
                <div>Dx + Ey = F</div>
              </div>
            </div>
          </div>
          
          {/* Symbol Input Methods */}
          <h3 className="text-blue-900 font-bold text-base md:text-lg mb-3 border-l-4 border-blue-500 pl-3">
            ⌨️ 特殊符號輸入方法
          </h3>
          
          <div className="bg-gray-50 rounded-xl p-3 md:p-4 mb-6">
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
                        key === 'SHIFT' ? 'bg-gray-300 text-yellow-700' :
                        key === 'ALPHA' ? 'bg-gray-300 text-red-600' :
                        key === 'x⁻¹' ? 'bg-gray-900 text-white' :
                        key === 'a b/c' ? 'bg-gray-900 text-white' :
                        'bg-gray-900 text-white'
                      }`}>{key}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Program Input Steps */}
          <h3 className="text-blue-900 font-bold text-base md:text-lg mb-3 border-l-4 border-blue-500 pl-3">
            📝 輸入程式
          </h3>
          
          {/* Step 1 */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <strong>進入程式編輯模式</strong>
            </div>
            <div className="flex flex-wrap gap-1 items-center text-sm">
              <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded text-xs font-bold">MODE</span>
              <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded text-xs font-bold">MODE</span>
              <span className="text-blue-900 font-bold">→</span>
              <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">6</span>
              <span className="text-gray-500 text-xs">(PRGM)</span>
              <span className="text-blue-900 font-bold">→</span>
              <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">1</span>
              <span className="text-gray-500 text-xs">(EDIT)</span>
              <span className="text-blue-900 font-bold">→</span>
              <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">1</span>
              <span className="text-gray-500 text-xs">(Prog 1)</span>
              <span className="text-blue-900 font-bold">→</span>
              <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">1</span>
              <span className="text-gray-500 text-xs">(COMP)</span>
            </div>
          </div>
          
          {/* Step 2 - Code */}
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
          
          {/* Step 3 */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <strong>確認並離開</strong>
            </div>
            <p className="text-sm">
              完成輸入後，檢查計算機是否顯示 <strong className="text-blue-900">053</strong>。<br />
              如是，按 <span className="px-2 py-1 bg-red-600 text-white rounded text-xs font-bold">ON</span> 離開程式編輯模式。
              <br />如否，請檢查是否輸入錯漏程式碼。
            </p>
          </div>
          
          {/* Usage Method */}
          <h3 className="text-blue-900 font-bold text-base md:text-lg mb-3 border-l-4 border-blue-500 pl-3">
            🎯 使用方法
          </h3>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl mb-6 border-2 border-blue-400">
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
                  <tr className="bg-white">
                    <td className="p-2 border text-center">A</td>
                    <td className="p-2 border text-center">B</td>
                    <td className="p-2 border text-center">C</td>
                    <td className="p-2 border text-center">D</td>
                    <td className="p-2 border text-center">E</td>
                    <td className="p-2 border text-center">F</td>
                  </tr>
                  <tr className="bg-gray-50 text-xs text-gray-600">
                    <td className="p-2 border text-center">x的係數</td>
                    <td className="p-2 border text-center">y的係數</td>
                    <td className="p-2 border text-center">常數</td>
                    <td className="p-2 border text-center">x的係數</td>
                    <td className="p-2 border text-center">y的係數</td>
                    <td className="p-2 border text-center">常數</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center mt-3 text-sm">
              <strong>輸出：</strong>先顯示 <span className="text-red-600 font-bold">x</span>，按 EXE 後顯示 <span className="text-red-600 font-bold">y</span>
            </p>
          </div>
          
          {/* Example */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl mb-6 border-2 border-green-500">
            <h4 className="text-green-700 font-bold mb-3">📌 範例：解聯立方程</h4>
            
            <div className="bg-white p-3 rounded-lg text-center mb-4 border border-green-400">
              <div className="text-lg font-sans flex items-center justify-center gap-3">
                <span className="text-5xl leading-none">{`{`}</span>
                <div className="text-left">
                  <div>x + 2y = 10</div>
                  <div>3x − 4y = −6</div>
                </div>
              </div>
            </div>
            
            <p className="font-bold text-sm mb-2">步驟一：執行程式</p>
            <div className="bg-white p-2 rounded mb-3">
              <span className="px-2 py-1 bg-orange-500 text-white rounded text-xs font-bold">Prog</span>
              <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold ml-1">1</span>
              <span className="text-gray-500 text-xs ml-2">→ 計算機顯示「A?」</span>
            </div>
            
            <p className="font-bold text-sm mb-2">步驟二：依次輸入係數</p>
            <div className="bg-white p-2 rounded space-y-1 text-sm">
              {[
                { keys: ['1'], label: '（第一條方程 x 的係數 A = 1）' },
                { keys: ['2'], label: '（第一條方程 y 的係數 B = 2）' },
                { keys: ['1', '0'], label: '（第一條方程常數 C = 10）' },
                { keys: ['3'], label: '（第二條方程 x 的係數 D = 3）' },
                { keys: ['(−)', '4'], label: '（第二條方程 y 的係數 E = −4）' },
                { keys: ['(−)', '6'], label: '（第二條方程常數 F = −6）' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-1">
                  {item.keys.map((k, i) => (
                    <span key={i} className={`px-2 py-1 rounded text-xs font-bold ${
                      k === '(−)' ? 'bg-gray-900 text-white' : 'bg-gray-900 text-white'
                    }`}>{k}</span>
                  ))}
                  <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">EXE</span>
                  <span className="text-gray-500 text-xs">{item.label}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-100 p-3 rounded-lg mt-3 text-center border border-blue-300">
              <p>計算機顯示 <span className="text-2xl font-bold text-blue-700">2.8</span> <span className="text-sm text-gray-600 font-medium">（即 x = 2.8）</span></p>
              <p className="mt-2">按 <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">EXE</span> 後顯示 <span className="text-2xl font-bold text-blue-700">3.6</span> <span className="text-sm text-gray-600 font-medium">（即 y = 3.6）</span></p>
              <div className="mt-3 pt-3 border-t border-blue-300">
                ✅ <strong>答案：x = 2.8，y = 3.6</strong>
              </div>
            </div>
          </div>
          
          {/* Notes */}
          <h3 className="text-blue-900 font-bold text-base md:text-lg mb-3 border-l-4 border-blue-500 pl-3">
            📋 注意事項
          </h3>
          
          <div className="bg-red-50 border-2 border-red-400 p-3 rounded-lg mb-3">
            <div className="font-bold text-red-700 mb-2">⚠️ 注意</div>
            <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
              <li>輸入負數時要用 <span className="px-1 bg-gray-900 text-white rounded text-xs">(−)</span> 鍵（負號鍵），不是減號</li>
              <li>係數為 1 時也要輸入 <span className="px-1 bg-gray-900 text-white rounded text-xs">1</span></li>
              <li>注意輸入順序：先 x 係數，再 y 係數，最後常數</li>
              <li>
                如方程未整理，先改寫成 <strong>Ax + By = C</strong> 標準形式：
                <div className="mt-2 space-y-1.5 pl-3 border-l-2 border-red-300">
                  {[
                    { before: '4y + 3x = 10', after: '3x + 4y = 10', note: '調換左右項順序' },
                    { before: 'n = 2m',        after: '−2m + n = 0',  note: '移項，常數為 0' },
                    { before: '5m = 4n − 7',   after: '5m − 4n = 7',  note: '移項' },
                  ].map((ex, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-1.5 text-xs font-mono bg-white rounded px-2 py-1 border border-red-200">
                      <span className="text-gray-500">{ex.before}</span>
                      <span className="text-red-400 font-sans">→</span>
                      <span className="text-red-700 font-bold">{ex.after}</span>
                      <span className="text-gray-400 font-sans text-[10px] ml-auto">（{ex.note}）</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border-2 border-yellow-400 p-3 rounded-lg">
            <div className="font-bold text-yellow-700 mb-2">💡 提示</div>
            <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
              <li>如果顯示「Math ERROR」，表示方程無解或有無限多解</li>
              <li>要重新計算，只需按 <span className="px-1 bg-orange-500 text-white rounded text-xs">Prog</span> <span className="px-1 bg-gray-900 text-white rounded text-xs">1</span> 再次執行</li>
              <li>程式會永久保存，關機後仍可使用</li>
            </ul>
          </div>
          
          {/* Footer */}
          <div className="text-center text-gray-400 text-xs mt-6 pt-4 border-t">
            📟 適用於 CASIO fx-50FH II 計算機
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== 聯立方程筆記 ==========
const SimultaneousEqNotes = ({ onBack, onShowCalcProgram }) => {
  const [katexLoaded, setKatexLoaded] = React.useState(false);
  React.useEffect(() => {
    loadKatexOnce().then(() => setKatexLoaded(true)).catch(() => {});
  }, []);

  const Latex = ({ math, block = false }) => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      if (katexLoaded && window.katex && ref.current) {
        try { window.katex.render(math, ref.current, { throwOnError: false, displayMode: block }); }
        catch (e) { if (ref.current) ref.current.textContent = math; }
      }
    }, [math, block, katexLoaded]);
    return <span ref={ref} className={block ? 'block text-center my-2' : 'inline-block align-middle'} />;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
        <ArrowLeft className="w-5 h-5" /> 返回
      </button>
      <h1 className="text-2xl font-bold text-slate-800 mb-2 border-b-2 border-blue-400 pb-3">
        📐 筆記：二元一次聯立方程
      </h1>
      <p className="text-sm text-slate-500 mb-6">F2 CH9 · 二元一次聯立方程</p>

      <div className="space-y-8 text-slate-700">

        {/* Intro */}
        <section className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
          <div className="text-center mb-3">
            <Latex math="\begin{cases} ax + by = c \\ dx + ey = f \end{cases}" block />
          </div>
          <p className="text-sm text-center text-slate-600">
            聯立方程有兩條方程、兩個未知數。<br />
            解法主要有<strong>代入消元法</strong>和<strong>加減消元法</strong>兩種。
          </p>
        </section>

        {/* Method 1: Substitution */}
        <section className="bg-sky-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-sky-600 text-white font-black text-lg px-3 py-1 rounded-lg">方法一</span>
            <h2 className="text-lg font-bold text-sky-800">代入消元法（Substitution）</h2>
          </div>
          <div className="bg-sky-100 rounded-lg px-4 py-3 mb-4 text-sm text-sky-800">
            💡 <strong>原理：</strong>從其中一條方程中<strong>以一個未知數作主項</strong>，然後代入另一條方程，消去其中一個未知數。
          </div>

          <div className="space-y-4">
            {/* Example */}
            <div className="bg-white rounded-xl p-4 border border-sky-200 shadow-sm">
              <p className="font-bold text-sky-700 mb-1">例題</p>
              <p className="text-sm text-slate-500 mb-3">解：<Latex math="x = 2y - 6" />，&nbsp;<Latex math="x + 4y = 12" /></p>
              <div className="bg-slate-50 rounded-lg p-3 mb-4 text-center">
                <Latex math="\begin{cases} x = 2y - 6 & \cdots\textcircled{1} \\ x + 4y = 12 & \cdots\textcircled{2} \end{cases}" block />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex gap-2 items-start">
                  <span className="bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">Step 1</span>
                  <p className="text-slate-600">加「{'{'} 」代表聯立方程，標示式①／式②</p>
                </div>

                <div className="flex gap-2 items-start">
                  <span className="bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">Step 2</span>
                  <div className="flex-1">
                    <p className="text-slate-600 mb-1">選<strong>已有主項</strong>的方程（式①），代入另一項方程</p>
                    <p className="text-xs text-slate-400 mb-2">（目的：2個代數的式 減至 1個代數）</p>
                    <p className="text-slate-600 mb-1">代①入②：</p>
                    <div className="bg-amber-50 rounded p-2">
                      <Latex math="(2y - 6) + 4y = 12" block />
                      <Latex math="6y - 6 = 12" block />
                      <Latex math="6y = 18" block />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <span className="bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">Step 3</span>
                  <div className="flex-1">
                    <p className="text-slate-600 mb-1">計算其中一個未知數的值</p>
                    <div className="bg-amber-50 rounded p-2">
                      <Latex math="y = 3 \quad \cdots\textcircled{3}" block />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <span className="bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">Step 4</span>
                  <div className="flex-1">
                    <p className="text-slate-600 mb-1">代 <Latex math="y=3" /> 進①（代另一條式）：</p>
                    <div className="bg-green-50 rounded p-2 border border-green-200">
                      <Latex math="x = 2(3) - 6 = 0" block />
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-3 border border-green-300 text-center">
                  <span className="font-bold text-green-700">∴ </span>
                  <Latex math="x = 0,\quad y = 3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Method 2: Elimination */}
        <section className="bg-violet-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-violet-600 text-white font-black text-lg px-3 py-1 rounded-lg">方法二</span>
            <h2 className="text-lg font-bold text-violet-800">加減消元法（Elimination）</h2>
          </div>
          <div className="bg-violet-100 rounded-lg px-4 py-3 mb-4 text-sm text-violet-800">
            💡 <strong>原理：</strong>對齊位置後，分辨有沒有<strong>相同數字</strong>，將兩條方程相加或相減，消去其中一個未知數。
          </div>

          <div className="space-y-4">
            {/* Example */}
            <div className="bg-white rounded-xl p-4 border border-violet-200 shadow-sm">
              <p className="font-bold text-violet-700 mb-1">例題一 <span className="text-xs font-normal text-slate-400">（已有相同係數）</span></p>
              <div className="bg-slate-50 rounded-lg p-3 mb-4 text-center">
                <Latex math="\begin{cases} 5x + 7y = -2 & \cdots\textcircled{1} \\ 3x - 7y = 10 & \cdots\textcircled{2} \end{cases}" block />
              </div>
              <p className="text-xs text-slate-500 mb-4">觀察：<Latex math="+7y" /> 與 <Latex math="-7y" /> 係數相反 → 兩式相加即可消去 <Latex math="y" /></p>

              <div className="space-y-3 text-sm">
                <div className="flex gap-2 items-start">
                  <div className="flex flex-col gap-1 shrink-0 mt-0.5">
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">①+②</span>
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">解 x</span>
                  </div>
                  <div className="flex-1 bg-amber-50 rounded p-3">
                    {/* CSS grid: [prefix] [LHS] [=] [RHS] */}
                    <div className="inline-grid items-baseline gap-x-1" style={{ gridTemplateColumns: 'auto auto auto auto' }}>
                      <span />
                      <Latex math="5x + 7y" />
                      <Latex math="=" />
                      <Latex math="-2" />

                      <span className="font-bold text-slate-500 pr-1">+)</span>
                      <Latex math="3x - 7y" />
                      <Latex math="=" />
                      <Latex math="10" />

                      <span className="col-span-4 border-b border-slate-400 my-1" />

                      <span />
                      <Latex math="8x" />
                      <Latex math="=" />
                      <Latex math="8" />

                      <span />
                      <Latex math="x" />
                      <Latex math="=" />
                      <span className="flex items-baseline gap-1"><Latex math="1" /><span className="text-slate-500 text-xs ml-1">···③</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">代③進①</span>
                  <div className="flex-1">
                    <p className="text-slate-600 mb-1">代 <Latex math="x=1" /> 進①：</p>
                    <div className="bg-green-50 rounded p-2 border border-green-200">
                      <div className="inline-grid items-baseline gap-x-1" style={{ gridTemplateColumns: '1fr auto auto', justifyItems: 'end' }}>
                        <Latex math="5(1) + 7y" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="-2" /></div>
                        <Latex math="7y" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="-7" /></div>
                        <Latex math="y" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="-1" /></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-3 border border-green-300 text-center">
                  <span className="font-bold text-green-700">∴ </span>
                  <Latex math="x = 1,\quad y = -1" />
                </div>
              </div>
            </div>

            {/* Example 2: both equations need multiplying */}
            <div className="bg-white rounded-xl p-4 border border-violet-200 shadow-sm">
              <p className="font-bold text-violet-700 mb-1">例題二 <span className="text-xs font-normal text-slate-400">（沒有相同係數，需兩式各自乘倍數）</span></p>
              <div className="bg-slate-50 rounded-lg p-3 mb-3 text-center">
                <Latex math="\begin{cases} 11x + 8y + 6 = 0 & \cdots\textcircled{1} \\ 5x - 3y + 16 = 0 & \cdots\textcircled{2} \end{cases}" block />
              </div>
              <p className="text-xs text-slate-500 mb-4">觀察：<Latex math="y" /> 的係數為 8 和 −3，<strong>沒有相同或相反係數</strong> → 取 LCM(8, 3) = 24，①×3 及 ②×8，令 <Latex math="y" /> 係數變為 ±24，再相加消去 <Latex math="y" /></p>

              <div className="space-y-3 text-sm">
                <div className="flex gap-2 items-start">
                  <div className="flex flex-col gap-1 shrink-0 mt-0.5">
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">①×3</span>
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">+②×8</span>
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">解 x</span>
                  </div>
                  <div className="flex-1 bg-amber-50 rounded p-3">
                    <div className="inline-grid items-baseline gap-x-1" style={{ gridTemplateColumns: 'auto auto auto auto' }}>
                      {/* Reference multiplications */}
                      <span className="text-slate-400 text-xs pr-1">①×3：</span>
                      <Latex math="33x + 24y + 18" />
                      <Latex math="=" />
                      <span className="flex items-baseline gap-1"><Latex math="0" /><span className="text-slate-500 text-xs ml-1">···③</span></span>

                      <span className="text-slate-400 text-xs pr-1">②×8：</span>
                      <Latex math="40x - 24y + 128" />
                      <Latex math="=" />
                      <span className="flex items-baseline gap-1"><Latex math="0" /><span className="text-slate-500 text-xs ml-1">···④</span></span>

                      <span className="col-span-4 pb-1" />

                      {/* Vertical calculation in ax+by+c=0 form */}
                      <span />
                      <Latex math="33x + 24y + 18" />
                      <Latex math="=" />
                      <Latex math="0" />

                      <span className="font-bold text-slate-500 pr-1">+)</span>
                      <Latex math="40x - 24y + 128" />
                      <Latex math="=" />
                      <Latex math="0" />

                      <span className="col-span-4 border-b border-slate-400 my-1" />

                      <span />
                      <Latex math="73x + 146" />
                      <Latex math="=" />
                      <Latex math="0" />

                      <span />
                      <Latex math="x" />
                      <Latex math="=" />
                      <span className="flex items-baseline gap-1"><Latex math="-2" /><span className="text-slate-500 text-xs ml-1">···⑤</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">代⑤進①</span>
                  <div className="flex-1">
                    <p className="text-slate-600 mb-1">代 <Latex math="x=-2" /> 進①：</p>
                    <div className="bg-green-50 rounded p-2 border border-green-200">
                      <div className="inline-grid items-baseline gap-x-1" style={{ gridTemplateColumns: '1fr auto auto', justifyItems: 'end' }}>
                        <Latex math="11(-2) + 8y + 6" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="0" /></div>
                        <Latex math="8y - 16" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="0" /></div>
                        <Latex math="y" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="2" /></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-3 border border-green-300 text-center">
                  <span className="font-bold text-green-700">∴ </span>
                  <Latex math="x = -2,\quad y = 2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4">📋 選哪種方法？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-sky-200 shadow-sm">
              <p className="font-bold text-sky-700 mb-2">代入消元法 適合</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                <li>其中一條方程已表達為 <Latex math="x = \ldots" /> 或 <Latex math="y = \ldots" /></li>
                <li>其中一個未知數係數為 1 或 −1</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-violet-200 shadow-sm">
              <p className="font-bold text-violet-700 mb-2">加減消元法 適合</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                <li>兩條方程都是標準形式（<Latex math="ax+by=c" />）</li>
                <li>某個未知數的係數相同或互為相反數</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prog 01 Calculator Link */}
        {onShowCalcProgram && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 flex items-start gap-3">
            <span className="text-yellow-500 text-lg mt-0.5">⚠️</span>
            <p className="text-sm text-slate-700">
              解聯立方程時可使用到計算機{' '}
              <button
                onClick={onShowCalcProgram}
                className="text-blue-600 underline hover:text-blue-800 font-medium"
              >
                Prog 01 解聯立方程
              </button>
              。
            </p>
          </div>
        )}

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
  const [showCalcProgram, setShowCalcProgram] = useState(false);
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
    } else if (mode === 'prog01-lv2' && prog01Step === 2 && prog01Question && !feedback) {
      // Auto-focus when entering step 2
      const { varX } = prog01Question;
      const firstInputKey = varX === 'x' ? 'x2' : 'm2';
      if (inputRefs.current[firstInputKey] && !activeInput) {
        setActiveInput({ field: varX, setter: setXAnswer });
        setTimeout(() => inputRefs.current[firstInputKey]?.focus(), 100);
      }
    }
  }, [prog01Step, prog01Question, mode, feedback, activeInput]);

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
    
    // Handle word problem modes (lv1 and lv2)
    if (activeInput.type === 'lv1') {
      const key = `${activeInput.index}-${activeInput.partIdx}`;
      if (char === '±') {
        setLv1Inputs(prev => {
          const current = prev[key] || '';
          if (current.startsWith('-')) {
            return { ...prev, [key]: current.slice(1) };
          } else if (current !== '' && current !== '0') {
            return { ...prev, [key]: '-' + current };
          }
          return prev;
        });
      } else {
        setLv1Inputs(prev => ({
          ...prev,
          [key]: (prev[key] || '') + char
        }));
      }
      return;
    }
    
    if (activeInput.type === 'lv2') {
      const idx = activeInput.index;
      if (char === '±') {
        setLv2Inputs(prev => {
          const newInputs = [...prev];
          const current = newInputs[idx] || '';
          if (current.startsWith('-')) {
            newInputs[idx] = current.slice(1);
          } else if (current !== '' && current !== '0') {
            newInputs[idx] = '-' + current;
          }
          return newInputs;
        });
      } else {
        setLv2Inputs(prev => {
          const newInputs = [...prev];
          newInputs[idx] = (newInputs[idx] || '') + char;
          return newInputs;
        });
      }
      return;
    }
    
    // Handle prog01 modes with setter function
    const { setter } = activeInput;
    if (!setter) return;
    
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
    
    // Handle word problem modes (lv1 and lv2)
    if (activeInput.type === 'lv1') {
      const key = `${activeInput.index}-${activeInput.partIdx}`;
      setLv1Inputs(prev => ({
        ...prev,
        [key]: (prev[key] || '').slice(0, -1)
      }));
      return;
    }
    
    if (activeInput.type === 'lv2') {
      const idx = activeInput.index;
      setLv2Inputs(prev => {
        const newInputs = [...prev];
        newInputs[idx] = (newInputs[idx] || '').slice(0, -1);
        return newInputs;
      });
      return;
    }
    
    // Handle prog01 modes with setter function
    const { setter } = activeInput;
    if (!setter) return;
    setter(prev => prev.slice(0, -1));
  };

  const handleKeypadClear = () => {
    // Clear all inputs for prog01 modes
    if (mode === 'prog01-lv1') {
      setXAnswer('');
      setYAnswer('');
    } else if (mode === 'prog01-lv2') {
      if (prog01Step === 1) {
        setEq1Inputs({ a: '', b: '', c: '' });
        setEq2Inputs({ a: '', b: '', c: '' });
      } else {
        setXAnswer('');
        setYAnswer('');
      }
    } else if (activeInput) {
      // For other modes, just clear active input
      const { setter } = activeInput;
      setter('');
    }
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
    
    // Helper function to check if user input matches expected value
    const isCorrectCoefficient = (userInput, expected) => {
      const trimmed = (userInput || '').trim();
      const expectedVal = parseFloat(expected);
      
      // If expected is 1
      if (expectedVal === 1) {
        return trimmed === '1' || trimmed === '' || trimmed === '+' || trimmed === '+1';
      }
      
      // If expected is -1
      if (expectedVal === -1) {
        return trimmed === '-1' || trimmed === '-';
      }
      
      // For other values, parse and compare
      const userVal = parseFloat(trimmed);
      return !isNaN(userVal) && Math.abs(userVal - expectedVal) < 0.0001;
    };
    
    const eq1Correct = 
      isCorrectCoefficient(eq1Inputs.a, eq1Standard.a) &&
      isCorrectCoefficient(eq1Inputs.b, eq1Standard.b) &&
      isCorrectCoefficient(eq1Inputs.c, eq1Standard.c);
    
    const eq2Correct = 
      isCorrectCoefficient(eq2Inputs.a, eq2Standard.a) &&
      isCorrectCoefficient(eq2Inputs.b, eq2Standard.b) &&
      isCorrectCoefficient(eq2Inputs.c, eq2Standard.c);
    
    if (eq1Correct && eq2Correct) {
      setFeedback({
        type: 'success',
        message: '轉換正確！現在求解 x 和 y。'
      });
      setTimeout(() => {
        setProg01Step(2);
        setFeedback(null);
        // Auto-focus first input in step 2
        const firstInputKey = varX === 'x' ? 'x2' : 'm2';
        setActiveInput({ field: varX, setter: setXAnswer });
        setTimeout(() => inputRefs.current[firstInputKey]?.focus(), 100);
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

  // Notes Screen
  if (mode === 'notes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Link
          to="/"
          className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
        >
          <HomeIcon size={18} />
          <span className="font-medium">返回首頁</span>
        </Link>
        <div className="pt-16 pb-12">
          <SimultaneousEqNotes onBack={() => setMode(null)} onShowCalcProgram={() => setShowCalcProgram(true)} />
          <CalculatorProgramModal isOpen={showCalcProgram} onClose={() => setShowCalcProgram(false)} />
        </div>
      </div>
    );
  }

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
                onClick={() => setMode('notes')}
                className="group p-6 bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-white md:col-span-2"
              >
                <div className="text-sm font-bold mb-2 opacity-90">課程筆記</div>
                <div className="text-2xl font-bold mb-2">📐 解聯立方程方法</div>
                <div className="text-sm opacity-80">消元法 &amp; 代入法，附 KaTeX 步驟示範</div>
              </button>

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
          <h3 className="text-lg font-bold text-amber-800 mb-4">解以下聯立方程：</h3>
          <Prog01Lv2OriginalDisplay eq1={eq1Display} eq2={eq2Display} varX={varX} varY={varY} />
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
                    }}
                    onFocus={(key) => {
                      setActiveInput({ 
                        field: `eq1-${key}`, 
                        setter: (fnOrVal) => {
                          setEq1Inputs(p => {
                            const newVal = typeof fnOrVal === 'function' ? fnOrVal(p[key] || '') : fnOrVal;
                            return { ...p, [key]: newVal };
                          });
                        }
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
                    }}
                    onFocus={(key) => {
                      setActiveInput({ 
                        field: `eq2-${key}`, 
                        setter: (fnOrVal) => {
                          setEq2Inputs(p => {
                            const newVal = typeof fnOrVal === 'function' ? fnOrVal(p[key] || '') : fnOrVal;
                            return { ...p, [key]: newVal };
                          });
                        }
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
                            className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition"
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
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition"
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
                  {mode.startsWith('prog01') && (
                    <button 
                      onClick={() => setShowCalcProgram(true)} 
                      className="p-2 hover:bg-slate-700 rounded-lg transition text-blue-300 flex items-center gap-1"
                      title="計算機程式"
                    >
                      <Cpu size={20}/>
                      <span className="hidden md:inline text-sm">計算機程式</span>
                    </button>
                  )}
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

            <div className="bg-gray-900 text-white p-2 md:px-8 text-center md:text-left z-20 flex justify-between items-center">
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
                mode={mode}
            />
            
            <CheatsheetModal isOpen={showNotes} onClose={() => setShowNotes(false)} />
            <CalculatorProgramModal isOpen={showCalcProgram} onClose={() => setShowCalcProgram(false)} />
        </div>
      </div>
    </>
  );
}
