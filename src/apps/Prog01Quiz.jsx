import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calculator, Trophy, Home as HomeIcon, Delete, Keyboard as KeyboardIcon, ChevronRight, RotateCcw, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 工具函數 ---
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
  
  // Handle fraction format: a/b
  if (trimmed.includes('/')) {
    const parts = trimmed.split('/');
    if (parts.length !== 2) return null;
    const num = parseFloat(parts[0]);
    const den = parseFloat(parts[1]);
    if (isNaN(num) || isNaN(den) || den === 0) return null;
    return num / den;
  }
  
  // Handle decimal or integer
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

// --- LV1 題目生成器 ---
const generateLv1Question = () => {
  // Generate x and y as integers or simple fractions
  const xNumerators = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const yNumerators = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const denominators = [1, 1, 1, 1, 2, 2, 3]; // Weighted towards integers
  
  const xNum = xNumerators[Math.floor(Math.random() * xNumerators.length)];
  const xDen = denominators[Math.floor(Math.random() * denominators.length)];
  const yNum = yNumerators[Math.floor(Math.random() * yNumerators.length)];
  const yDen = denominators[Math.floor(Math.random() * denominators.length)];
  
  // x and y values
  const xVal = xNum / xDen;
  const yVal = yNum / yDen;
  
  // Generate coefficients that will give integer results for c and f
  let a, b, c, d, e, f;
  let attempts = 0;
  
  do {
    a = Math.floor(Math.random() * 9) + 1;
    if (Math.random() < 0.3) a = -a;
    b = Math.floor(Math.random() * 9) + 1;
    if (Math.random() < 0.3) b = -b;
    d = Math.floor(Math.random() * 9) + 1;
    if (Math.random() < 0.3) d = -d;
    e = Math.floor(Math.random() * 9) + 1;
    if (Math.random() < 0.3) e = -e;
    
    // Calculate c and f
    c = a * xVal + b * yVal;
    f = d * xVal + e * yVal;
    
    // Check determinant is non-zero (unique solution exists)
    const det = a * e - b * d;
    
    attempts++;
  } while ((Math.abs(a * e - b * d) < 0.001 || !Number.isInteger(c) || !Number.isInteger(f)) && attempts < 100);
  
  // If we couldn't find good coefficients, use simple integer solution
  if (!Number.isInteger(c) || !Number.isInteger(f)) {
    const simpleX = Math.floor(Math.random() * 10) - 5;
    const simpleY = Math.floor(Math.random() * 10) - 5;
    a = Math.floor(Math.random() * 5) + 1;
    b = Math.floor(Math.random() * 5) + 1;
    d = Math.floor(Math.random() * 5) + 1;
    e = Math.floor(Math.random() * 5) + 1;
    if (Math.random() < 0.3) a = -a;
    if (Math.random() < 0.3) b = -b;
    if (Math.random() < 0.3) d = -d;
    if (Math.random() < 0.3) e = -e;
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

// --- LV2 題目模板 ---
const LV2_TEMPLATES = [
  // Type A: x = k*y form
  {
    id: 'A',
    generate: () => {
      const k = [1.2, 1.4, 1.5, 2, 0.5, 0.8, 2.5][Math.floor(Math.random() * 7)];
      const total = [100, 120, 150, 180, 200, 240][Math.floor(Math.random() * 6)];
      const y = total / (1 + k);
      const x = k * y;
      
      // Only use if x and y are nice numbers
      if (!Number.isInteger(x) && !Number.isInteger(y * 10) / 10 === y) {
        // Fallback to simple case
        const simpleY = 50;
        const simpleX = k * simpleY;
        const simpleTotal = simpleX + simpleY;
        
        return {
          eq1Display: `x + y = ${simpleTotal}`,
          eq2Display: k === Math.floor(k) ? `x = ${k}y` : `x = ${k}y`,
          eq1Standard: { a: 1, b: 1, c: simpleTotal },
          eq2Standard: { a: 1, b: -k, c: 0 },
          xVal: simpleX,
          yVal: simpleY
        };
      }
      
      return {
        eq1Display: `x + y = ${total}`,
        eq2Display: k === Math.floor(k) ? `x = ${k}y` : `x = ${k}y`,
        eq1Standard: { a: 1, b: 1, c: total },
        eq2Standard: { a: 1, b: -k, c: 0 },
        xVal: x,
        yVal: y
      };
    }
  },
  // Type B: am = bn form
  {
    id: 'B',
    generate: () => {
      const a1 = Math.floor(Math.random() * 4) + 2;
      const b1 = Math.floor(Math.random() * 4) + 2;
      const a2 = Math.floor(Math.random() * 5) + 5;
      const b2 = Math.floor(Math.random() * 5) + 5;
      
      // a1*m + b1*n = c, a2*m = b2*n
      // From eq2: m = (b2/a2)*n
      // Sub into eq1: a1*(b2/a2)*n + b1*n = c
      // n = c / (a1*b2/a2 + b1)
      
      const c = (a1 * b2 + b1 * a2) * 3; // Make sure we get nice numbers
      const n = c * a2 / (a1 * b2 + b1 * a2);
      const m = (b2 / a2) * n;
      
      return {
        eq1Display: `${a1}m + ${b1}n = ${c}`,
        eq2Display: `${a2}m = ${b2}n`,
        eq1Standard: { a: a1, b: b1, c: c },
        eq2Standard: { a: a2, b: -b2, c: 0 },
        xVal: m,
        yVal: n,
        varX: 'm',
        varY: 'n'
      };
    }
  },
  // Type C: ax = y, expression form
  {
    id: 'C',
    generate: () => {
      const k = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
      const offset = (Math.floor(Math.random() * 4) + 1) * 10; // 10, 20, 30, 40
      
      // 3x = y, 2(y - 20) = x + 20
      // From eq1: y = kx
      // eq2: 2y - 40 = x + 20 → -x + 2y = 60
      
      const coef = Math.floor(Math.random() * 2) + 2; // 2 or 3
      // coef(y - offset) = x + offset
      // coef*y - coef*offset = x + offset
      // -x + coef*y = offset + coef*offset = offset(1 + coef)
      
      const c2 = offset * (1 + coef);
      
      // kx = y → kx - y = 0
      // -x + coef*y = c2
      
      // Solve: from eq1 y = kx, sub into eq2
      // -x + coef*kx = c2
      // x(coef*k - 1) = c2
      const x = c2 / (coef * k - 1);
      const y = k * x;
      
      return {
        eq1Display: `${k}x = y`,
        eq2Display: `${coef}(y − ${offset}) = x + ${offset}`,
        eq1Standard: { a: k, b: -1, c: 0 },
        eq2Standard: { a: -1, b: coef, c: c2 },
        xVal: x,
        yVal: y
      };
    }
  }
];

const generateLv2Question = () => {
  const template = LV2_TEMPLATES[Math.floor(Math.random() * LV2_TEMPLATES.length)];
  const question = template.generate();
  return {
    ...question,
    varX: question.varX || 'x',
    varY: question.varY || 'y'
  };
};

// --- 數學渲染組件 ---
const MathRenderer = ({ expression, size = 'normal' }) => {
  if (!expression) return <span className="text-gray-400 italic">...</span>;
  
  const sizeClass = size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl';
  
  // Handle fraction display
  if (expression.includes('/')) {
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
  
  // Render with italics for variables
  const chars = expression.split('');
  return (
    <span className={sizeClass}>
      {chars.map((char, idx) => {
        if (/[a-zA-Z]/.test(char)) {
          return <span key={idx} style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic' }}>{char}</span>;
        }
        return <span key={idx}>{char}</span>;
      })}
    </span>
  );
};

const EquationDisplay = ({ a, b, c, varX = 'x', varY = 'y', showPlaceholders = false, inputs = {}, onInputChange, inputRefs, eqIndex }) => {
  const formatCoef = (coef, isFirst = false, showSign = true) => {
    if (coef === 0) return null;
    const sign = coef > 0 ? '+' : '−';
    const absCoef = Math.abs(coef);
    const coefStr = absCoef === 1 ? '' : String(absCoef);
    
    if (isFirst) {
      if (coef === 1) return '';
      if (coef === -1) return '−';
      return String(coef);
    }
    
    return { sign: showSign ? sign : '', coef: coefStr };
  };

  if (showPlaceholders) {
    return (
      <div className="flex items-center gap-1 text-xl md:text-2xl font-mono">
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

  // Display equation in standard form
  const parts = [];
  
  // First term (ax)
  if (a !== 0) {
    if (a === 1) {
      parts.push(<span key="x" className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span>);
    } else if (a === -1) {
      parts.push(<span key="x">−<span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span></span>);
    } else {
      parts.push(<span key="x">{a}<span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span></span>);
    }
  }
  
  // Second term (by)
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

// --- 虛擬鍵盤組件 ---
const Keypad = ({ onInput, onDelete, onClear, onEnter, isVisible, toggleVisibility, showFraction = true }) => {
  const keys = showFraction 
    ? [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '+',
        '±', '0', '.', '-',
        'AC', 'DEL', 'Enter'
      ]
    : [
        '7', '8', '9', '+',
        '4', '5', '6', '-',
        '1', '2', '3', '/',
        '±', '0', '.', '',
        'AC', 'DEL', 'Enter'
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
    <div className="fixed bottom-0 right-0 w-full md:w-80 md:bottom-4 md:right-4 bg-gray-100 p-3 border md:border-2 border-gray-300 md:rounded-xl shadow-2xl z-50 pb-8 md:pb-3 transition-all">
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Prog01 Keypad</span>
        <button onClick={toggleVisibility} className="text-gray-400 hover:text-gray-600">
          <KeyboardIcon size={20}/>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {keys.map((k, idx) => {
          if (k === '') return <div key={idx} />;
          if (k === 'Enter') return (
            <button key={k} onClick={onEnter} className="col-span-2 bg-blue-600 text-white p-3 md:p-2 rounded-lg font-bold active:bg-blue-700 shadow hover:bg-blue-500 text-lg">
              確定
            </button>
          );
          if (k === 'AC') return (
            <button key={k} onClick={onClear} className="bg-red-200 p-3 md:p-2 rounded-lg font-bold text-red-800 active:bg-red-300 shadow hover:bg-red-100">AC</button>
          );
          if (k === 'DEL') return (
            <button key={k} onClick={onDelete} className="bg-orange-200 p-3 md:p-2 rounded-lg font-bold text-orange-800 active:bg-orange-300 shadow hover:bg-orange-100">
              <Delete size={20} className="mx-auto"/>
            </button>
          );
          if (k === '±') return (
            <button key={k} onClick={() => onInput('±')} className="bg-gray-200 p-3 md:p-2 rounded-lg font-bold text-gray-700 active:bg-gray-300 shadow hover:bg-gray-100">±</button>
          );
          return (
            <button 
              key={k} 
              onClick={() => onInput(k)} 
              className="bg-white p-3 md:p-2 rounded-lg shadow font-bold text-lg md:text-xl active:bg-gray-200 hover:bg-gray-50 text-gray-700"
            >
              {k === '*' ? '×' : k}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- 主組件 ---
export default function Prog01Quiz() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState({ x: 0, y: 0, total: 0 });
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showKeypad, setShowKeypad] = useState(true);
  const [activeInput, setActiveInput] = useState(null);
  
  // LV1 inputs
  const [xAnswer, setXAnswer] = useState('');
  const [yAnswer, setYAnswer] = useState('');
  
  // LV2 inputs - Step 1: Convert to standard form
  const [lv2Step, setLv2Step] = useState(1);
  const [eq1Inputs, setEq1Inputs] = useState({ a: '', b: '', c: '' });
  const [eq2Inputs, setEq2Inputs] = useState({ a: '', b: '', c: '' });
  
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  
  const inputRefs = useRef({});

  const generateQuestion = useCallback(() => {
    if (level === 1) {
      setCurrentQuestion(generateLv1Question());
    } else {
      setCurrentQuestion(generateLv2Question());
      setLv2Step(1);
    }
    setXAnswer('');
    setYAnswer('');
    setEq1Inputs({ a: '', b: '', c: '' });
    setEq2Inputs({ a: '', b: '', c: '' });
    setFeedback(null);
    setShowHint(false);
    setActiveInput(null);
  }, [level]);

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const handleKeypadInput = (char) => {
    if (!activeInput) return;
    
    const { field, setter, current } = activeInput;
    
    if (char === '±') {
      // Toggle sign
      if (current.startsWith('-')) {
        setter(current.slice(1));
      } else if (current !== '' && current !== '0') {
        setter('-' + current);
      }
      return;
    }
    
    setter(current + char);
  };

  const handleKeypadDelete = () => {
    if (!activeInput) return;
    const { setter, current } = activeInput;
    setter(current.slice(0, -1));
  };

  const handleKeypadClear = () => {
    if (!activeInput) return;
    const { setter } = activeInput;
    setter('');
  };

  const checkLv1Answer = () => {
    if (!currentQuestion) return;
    
    const { xNum, xDen, yNum, yDen } = currentQuestion;
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

  const checkLv2Step1 = () => {
    if (!currentQuestion) return;
    
    const { eq1Standard, eq2Standard } = currentQuestion;
    
    // Check eq1
    const eq1Correct = 
      parseFloat(eq1Inputs.a) === eq1Standard.a &&
      parseFloat(eq1Inputs.b) === eq1Standard.b &&
      parseFloat(eq1Inputs.c) === eq1Standard.c;
    
    // Check eq2
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
        setLv2Step(2);
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

  const checkLv2Step2 = () => {
    if (!currentQuestion) return;
    
    const { xVal, yVal } = currentQuestion;
    
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

  const handleSubmit = () => {
    if (level === 1) {
      checkLv1Answer();
    } else {
      if (lv2Step === 1) {
        checkLv2Step1();
      } else {
        checkLv2Step2();
      }
    }
  };

  const nextQuestion = () => {
    generateQuestion();
  };

  const renderLv1 = () => {
    if (!currentQuestion) return null;
    const { a, b, c, d, e, f } = currentQuestion;
    
    return (
      <div className="space-y-6">
        {/* Equations Display */}
        <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
          <h3 className="text-lg font-bold text-slate-700 mb-4">解以下聯立方程：</h3>
          <div className="space-y-3 ml-4">
            <EquationDisplay a={a} b={b} c={c} />
            <EquationDisplay a={d} b={e} c={f} />
          </div>
        </div>

        {/* Answer Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div 
            className={`p-4 rounded-xl border-2 transition-all ${activeInput?.field === 'x' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
            onClick={() => {
              setActiveInput({ field: 'x', setter: setXAnswer, current: xAnswer });
              inputRefs.current['x']?.focus();
            }}
          >
            <label className="block text-sm font-bold text-gray-600 mb-2">
              <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>x</span> =
            </label>
            <input
              ref={el => inputRefs.current['x'] = el}
              type="text"
              value={xAnswer}
              onChange={(e) => setXAnswer(e.target.value)}
              onFocus={() => setActiveInput({ field: 'x', setter: setXAnswer, current: xAnswer })}
              className={`w-full text-2xl font-mono p-2 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${feedback?.xWrong ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              placeholder="?"
            />
          </div>
          
          <div 
            className={`p-4 rounded-xl border-2 transition-all ${activeInput?.field === 'y' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
            onClick={() => {
              setActiveInput({ field: 'y', setter: setYAnswer, current: yAnswer });
              inputRefs.current['y']?.focus();
            }}
          >
            <label className="block text-sm font-bold text-gray-600 mb-2">
              <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>y</span> =
            </label>
            <input
              ref={el => inputRefs.current['y'] = el}
              type="text"
              value={yAnswer}
              onChange={(e) => setYAnswer(e.target.value)}
              onFocus={() => setActiveInput({ field: 'y', setter: setYAnswer, current: yAnswer })}
              className={`w-full text-2xl font-mono p-2 border-2 rounded-lg focus:outline-none focus:border-green-500 ${feedback?.yWrong ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              placeholder="?"
            />
          </div>
        </div>

        {/* Feedback */}
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
              onClick={nextQuestion}
              className="mt-4 bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition flex items-center gap-2"
            >
              下一題 <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderLv2 = () => {
    if (!currentQuestion) return null;
    const { eq1Display, eq2Display, eq1Standard, eq2Standard, varX, varY } = currentQuestion;

    return (
      <div className="space-y-6">
        {/* Original Equations */}
        <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200">
          <h3 className="text-lg font-bold text-amber-800 mb-4">原題：</h3>
          <div className="space-y-2 ml-4 text-xl font-mono">
            <p>{eq1Display}</p>
            <p>{eq2Display}</p>
          </div>
        </div>

        {lv2Step === 1 ? (
          <>
            {/* Step 1: Convert to standard form */}
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
                        setter: (v) => setEq1Inputs(p => ({ ...p, [key]: v })),
                        current: val
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
                        setter: (v) => setEq2Inputs(p => ({ ...p, [key]: v })),
                        current: val
                      });
                    }}
                    inputRefs={inputRefs}
                    eqIndex={2}
                  />
                </div>
              </div>

              {/* Hint Button */}
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

            {/* Step 1 Feedback */}
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
                  onClick={nextQuestion}
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
            {/* Step 2: Solve */}
            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2</span>
                求解：
              </h3>
              
              <div className="space-y-2 ml-4 mb-4 text-lg font-mono">
                <EquationDisplay a={eq1Standard.a} b={eq1Standard.b} c={eq1Standard.c} varX={varX} varY={varY} />
                <EquationDisplay a={eq2Standard.a} b={eq2Standard.b} c={eq2Standard.c} varX={varX} varY={varY} />
              </div>

              {/* Answer Inputs */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div 
                  className={`p-4 rounded-xl border-2 transition-all ${activeInput?.field === 'x' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                  onClick={() => {
                    setActiveInput({ field: 'x', setter: setXAnswer, current: xAnswer });
                    inputRefs.current['x2']?.focus();
                  }}
                >
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varX}</span> =
                  </label>
                  <input
                    ref={el => inputRefs.current['x2'] = el}
                    type="text"
                    value={xAnswer}
                    onChange={(e) => setXAnswer(e.target.value)}
                    onFocus={() => setActiveInput({ field: 'x', setter: setXAnswer, current: xAnswer })}
                    className={`w-full text-2xl font-mono p-2 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${feedback?.xWrong ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    placeholder="?"
                  />
                </div>
                
                <div 
                  className={`p-4 rounded-xl border-2 transition-all ${activeInput?.field === 'y' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}
                  onClick={() => {
                    setActiveInput({ field: 'y', setter: setYAnswer, current: yAnswer });
                    inputRefs.current['y2']?.focus();
                  }}
                >
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>{varY}</span> =
                  </label>
                  <input
                    ref={el => inputRefs.current['y2'] = el}
                    type="text"
                    value={yAnswer}
                    onChange={(e) => setYAnswer(e.target.value)}
                    onFocus={() => setActiveInput({ field: 'y', setter: setYAnswer, current: yAnswer })}
                    className={`w-full text-2xl font-mono p-2 border-2 rounded-lg focus:outline-none focus:border-green-500 ${feedback?.yWrong ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    placeholder="?"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 Feedback */}
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
                  onClick={nextQuestion}
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

  return (
    <>
      <Link 
        to="/" 
        className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
      >
        <HomeIcon size={18} />
        <span className="font-medium">返回首頁</span>
      </Link>

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-white shadow-2xl min-h-screen md:min-h-[90vh] md:my-4 md:rounded-2xl overflow-hidden flex flex-col relative">
          
          {/* Header */}
          <header className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  <Calculator className="text-blue-400"/> 
                  <span>Prog 01 訓練</span>
                </h1>
                <p className="text-slate-300 text-sm mt-1">聯立二元一次方程</p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <Trophy className="text-yellow-400" size={24}/>
                  <span className="text-2xl font-bold text-yellow-400">{score.total}</span>
                  <span className="text-slate-400 text-sm">分</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  <span className="italic" style={{ fontFamily: 'Times New Roman, serif' }}>x</span>: {score.x} | 
                  <span className="italic ml-1" style={{ fontFamily: 'Times New Roman, serif' }}>y</span>: {score.y}
                </div>
              </div>
            </div>

            {/* Level Tabs */}
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setLevel(1)}
                className={`px-4 py-2 rounded-lg font-bold transition ${level === 1 ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}
              >
                LV1 標準形式
              </button>
              <button 
                onClick={() => setLevel(2)}
                className={`px-4 py-2 rounded-lg font-bold transition ${level === 2 ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}
              >
                LV2 轉換形式
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-40 md:pb-24">
            {/* Question Counter */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">已完成: {questionCount} 題</span>
              <button 
                onClick={generateQuestion}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <RotateCcw size={14} /> 換一題
              </button>
            </div>

            {level === 1 ? renderLv1() : renderLv2()}
          </main>

          {/* Bottom Bar */}
          <div className="bg-slate-800 text-white p-3 md:px-6 flex justify-between items-center">
            <div className="text-sm text-slate-400">
              {activeInput ? (
                <span>正在輸入: <span className="text-white font-mono">{activeInput.field}</span></span>
              ) : (
                <span>點擊輸入框開始作答</span>
              )}
            </div>
            <button 
              onClick={handleSubmit} 
              disabled={feedback !== null}
              className="hidden md:block bg-green-600 hover:bg-green-500 disabled:bg-gray-600 px-6 py-2 rounded-lg font-bold shadow transition"
            >
              {level === 2 && lv2Step === 1 ? '檢查轉換' : '提交答案'}
            </button>
          </div>

          {/* Virtual Keypad */}
          <Keypad 
            isVisible={showKeypad}
            toggleVisibility={() => setShowKeypad(!showKeypad)}
            onInput={handleKeypadInput}
            onDelete={handleKeypadDelete}
            onClear={handleKeypadClear}
            onEnter={handleSubmit}
            showFraction={true}
          />
        </div>
      </div>
    </>
  );
}
