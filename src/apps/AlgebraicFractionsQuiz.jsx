import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Lightbulb, RefreshCw, CheckCircle, Delete, ArrowRight, AlertTriangle, Home as HomeIcon } from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';

// --- KaTeX Helper Hook (使用共享 katexLoader) ---
const useKatex = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadKatexOnce().then(() => setIsLoaded(true)).catch(console.error);
  }, []);

  return isLoaded;
};

const BlockMath = ({ math }) => {
  const containerRef = useRef(null);
  const katexLoaded = useKatex();

  useEffect(() => {
    if (katexLoaded && containerRef.current && window.katex) {
      try {
        window.katex.render(math, containerRef.current, { displayMode: true, throwOnError: false });
      } catch (e) {
        console.error("KaTeX render error:", e);
      }
    }
  }, [math, katexLoaded]);

  return <div ref={containerRef} className="my-1" />;
};

const InlineMath = ({ math }) => {
  const containerRef = useRef(null);
  const katexLoaded = useKatex();

  useEffect(() => {
    if (katexLoaded && containerRef.current && window.katex) {
      try {
        window.katex.render(math, containerRef.current, { displayMode: false, throwOnError: false });
      } catch (e) {
        console.error("KaTeX render error:", e);
      }
    }
  }, [math, katexLoaded]);

  return <span ref={containerRef} />;
};

// --- Teaching Tips Component Helper ---
const AnnotatedStep = ({ numerator, denominator, noteNum, noteDen }) => {
  return (
    <div className="flex items-center text-xl font-mono text-gray-800">
       <span className="mr-3 font-serif">=</span>
       <div className="inline-grid grid-cols-[auto_auto] gap-x-4 items-center">
           {/* Numerator with Border Bottom (Fraction Line) */}
           <div className="border-b-2 border-gray-900 pb-1 px-2 text-center w-full">
               <InlineMath math={`\\displaystyle ${numerator}`} />
           </div>
           <div className="text-sm text-gray-500 font-sans whitespace-nowrap">
               {noteNum && `← ${noteNum}`}
           </div>

           {/* Denominator */}
           <div className="pt-1 px-2 text-center w-full">
               <InlineMath math={`\\displaystyle ${denominator}`} />
           </div>
           <div className="text-sm text-gray-500 font-sans whitespace-nowrap">
               {noteDen && `← ${noteDen}`}
           </div>
       </div>
    </div>
  );
};

// --- Teaching Tips Component ---
const TeachingTipsContent = () => {
  return (
    <div className="space-y-6 text-gray-800">
      <div>
        <h4 className="font-bold text-xl mb-3 text-blue-700 border-b pb-2">代數分式四則混算</h4>
        <h5 className="font-bold mb-2 text-lg">解題步驟 (Steps)：</h5>
        <ul className="list-decimal pl-5 space-y-2 text-base font-medium">
          <li>
            <span className="font-bold">分母交叉乘分子</span>（分母拍埋加括號）
          </li>
          <li>
            <span className="font-bold">分子拆括號</span>（分母不用拆）
          </li>
          <li>
            <span className="font-bold">分子化簡</span>
          </li>
        </ul>
      </div>

      <div>
        <h5 className="font-bold mb-3 text-lg border-l-4 border-yellow-400 pl-2">例題：</h5>
        <div className="mb-4 bg-gray-50 p-4 rounded-lg text-center text-xl">
           <BlockMath math="\frac{3}{2x-3} + \frac{9}{5-6x}" />
        </div>
        
        <h5 className="font-bold mb-3 text-lg border-l-4 border-green-400 pl-2">運算過程：</h5>
        
        <div className="space-y-6 overflow-x-auto pb-2">
          {/* Step 1 */}
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <AnnotatedStep 
                numerator="3\colorbox{#bbf7d0}{$(5-6x)$} + 9\colorbox{#fef08a}{$(2x-3)$}"
                denominator="\colorbox{#fef08a}{$(2x-3)$}\colorbox{#bbf7d0}{$(5-6x)$}"
                noteNum="分母交叉乘分子"
                noteDen="分母拍埋加括號"
              />
          </div>

          {/* Step 2 */}
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
               <AnnotatedStep 
                numerator="15 - 18x + 18x - 27"
                denominator="(2x-3)(5-6x)"
                noteNum="分子拆括號"
                noteDen="分母不需拆括號"
              />
          </div>

          {/* Step 3 */}
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
               <AnnotatedStep 
                numerator="-12"
                denominator="(2x-3)(5-6x)"
                noteNum="分子化簡"
                noteDen=""
              />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Button Components ---

const Button = ({ onClick, children, className = "", variant = "primary", disabled = false }) => {
  const baseStyle = "flex items-center justify-center font-bold transition-all active:scale-95 select-none touch-manipulation";
  
  const variants = {
    primary: "px-4 py-3 bg-blue-600 text-white rounded-xl shadow-md active:bg-blue-700",
    secondary: "px-4 py-3 bg-purple-600 text-white rounded-xl shadow-md active:bg-purple-700",
    outline: "px-2 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50",
    
    keyNum: "h-14 bg-gray-100 text-gray-800 text-2xl rounded-lg shadow-[0_2px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]",
    keyOp: "h-14 bg-orange-100 text-orange-900 text-xl rounded-lg shadow-[0_2px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]",
    keyAction: "h-14 bg-red-100 text-red-900 text-lg rounded-lg shadow-[0_2px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]",
    keyFunction: "h-14 bg-gray-300 text-gray-900 text-lg rounded-lg shadow-[0_2px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]",
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

export default function AlgebraicFractionsQuiz() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  
  const [step1, setStep1] = useState("");
  const [step2, setStep2] = useState("");
  const [answer, setAnswer] = useState("");
  
  const [feedback, setFeedback] = useState(null); // 'correct' | 'partial' | 'incorrect'
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [activeInput, setActiveInput] = useState('step1'); 
  
  const katexLoaded = useKatex();

  // Helper: Greatest Common Divisor
  const gcd = (x, y) => {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      let t = y;
      y = x % y;
      x = t;
    }
    return x;
  };

  // Helper to generate a binomial like "3y+5" with coprime coefficients
  const generateBinomial = (v) => {
    let a, b;
    // Loop until we find a pair (a, b) that are coprime (gcd == 1) and b is not 0
    do {
        a = Math.floor(Math.random() * 4) + 1; // 1 to 4
        b = Math.floor(Math.random() * 19) - 9; // -9 to 9
    } while (b === 0 || gcd(a, b) !== 1);

    const display = `${a === 1 ? '' : a}${v} ${b > 0 ? '+' : '-'} ${Math.abs(b)}`;
    return { a, b, display };
  };

  const generateQuestion = () => {
    // 1. Pick random variable
    const vars = ['x', 'y', 'z', 'a', 'b', 'm', 'n', 'k'];
    const v = vars[Math.floor(Math.random() * vars.length)];

    const d1 = generateBinomial(v);
    let d2 = generateBinomial(v);
    
    // Ensure denominators are not identical
    while (d1.a === d2.a && d1.b === d2.b) {
      d2 = generateBinomial(v);
    }

    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const isAddition = Math.random() > 0.5;

    let q = { num1, num2, d1, d2, isAddition, variable: v, id: Date.now() };

    setQuestion(q);
    setStep1("");
    setStep2("");
    setAnswer("");
    setFeedback(null);
    setEarnedPoints(0);
    setActiveInput('step1');
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleKeyPad = (value) => {
    if (feedback) return;

    const setters = { 'step1': setStep1, 'step2': setStep2, 'answer': setAnswer };
    const currentSetter = setters[activeInput];
    const currentVal = { step1, step2, answer }[activeInput];

    if (value === 'DEL') {
      currentSetter(currentVal.slice(0, -1));
    } else if (value === 'CLEAR') {
      currentSetter("");
    } else if (value === '/') {
        // Fraction Logic: assume everything before / is numerator
        // Only allow one slash
        if (currentVal.includes('/')) return;
        currentSetter(currentVal + '/');
    } else {
      currentSetter(currentVal + value);
    }
  };

  // Improved Latex Converter for Display
  const formatInputToLatex = (str) => {
    if (!str) return "\\text{ }";

    // Split by slash to detect Fraction Mode
    const parts = str.split('/');
    if (parts.length === 2) {
        // We have Numerator / Denominator
        const num = formatSimpleMath(parts[0]) || "\\text{?}";
        const den = formatSimpleMath(parts[1]) || "\\text{?}"; // Show placeholder if empty
        return `\\frac{${num}}{${den}}`;
    }
    
    return formatSimpleMath(str);
  };

  const formatSimpleMath = (str) => {
    return str
      .replace(/\*/g, '\\times ')
      // We don't replace / here because we handled it above
      // Ensure variables look math-like? KaTeX does this by default for letters
      .replace(/\s/g, '\\,'); 
  };

  const normalize = (str) => str.replace(/\s+/g, '').replace(/\*/g, '').replace(/（/g, '(').replace(/）/g, ')');

  // New robust check function
  const checkAnswer = () => {
    if (!question) return;

    const { num1, num2, d1, d2, isAddition, variable: v } = question;
    const opFactor = isAddition ? 1 : -1;

    // --- 1. Prepare Expected Strings for Denominator ---
    // Denominator is always (D1)(D2) or (D2)(D1)
    const d1Bare = `${d1.a === 1 ? '' : d1.a}${v}${d1.b >= 0 ? '+' : ''}${d1.b}`;
    const d2Bare = `${d2.a === 1 ? '' : d2.a}${v}${d2.b >= 0 ? '+' : ''}${d2.b}`;
    const d1Str = `(${d1Bare})`;
    const d2Str = `(${d2Bare})`;
    const expectedDenom1 = normalize(`${d1Str}${d2Str}`);
    const expectedDenom2 = normalize(`${d2Str}${d1Str}`);

    // Helper to check any string against valid denominators
    const isValidDenom = (uDen) => (uDen === expectedDenom1) || (uDen === expectedDenom2);

    // --- 2. Validation Logic for Answer (3 Points) ---
    const validateFinalAnswer = () => {
        const t1_x = num1 * d2.a;
        const t1_c = num1 * d2.b;
        const t2_x = opFactor * num2 * d1.a;
        const t2_c = opFactor * num2 * d1.b;
        
        const final_x = t1_x + t2_x;
        const final_c = t1_c + t2_c;

        const formatTermX = (coeff) => {
            if (coeff === 0) return "";
            if (coeff === 1) return v;
            if (coeff === -1) return "-" + v;
            return `${coeff}${v}`;
        };

        // Format 1: Ax + B
        let correctNumPoly1 = "";
        const termX = formatTermX(final_x);
        correctNumPoly1 += termX;
        if (final_c > 0) correctNumPoly1 += (termX ? `+${final_c}` : `${final_c}`);
        else if (final_c < 0) correctNumPoly1 += `${final_c}`;
        else if (!termX) correctNumPoly1 = "0";

        // Format 2: B + Ax
        let correctNumPoly2 = "";
        if (final_c !== 0) {
            correctNumPoly2 += `${final_c}`;
            if (final_x > 0) correctNumPoly2 += `+${formatTermX(final_x)}`;
            else if (final_x < 0) correctNumPoly2 += `${formatTermX(final_x)}`;
        } else {
            correctNumPoly2 = correctNumPoly1;
        }

        const uParts = answer.split('/');
        if (uParts.length === 2) {
            let uNum = normalize(uParts[0]);
            const uDen = normalize(uParts[1]);
            // Remove wrapping parens if user typed (Ax+B)/...
            if (uNum.startsWith('(') && uNum.endsWith(')')) uNum = uNum.slice(1, -1);

            return (
                (uNum === normalize(correctNumPoly1) || uNum === normalize(correctNumPoly2)) && 
                isValidDenom(uDen)
            );
        }
        return false;
    };

    // --- 3. Validation Logic for Step 2 (2 Points) ---
    // Expanded numerator terms: T1 (expanded) op T2 (expanded)
    const validateStep2 = () => {
        // T1 expanded: (num1*a2)x + (num1*b2)
        const t1_x = num1 * d2.a;
        const t1_c = num1 * d2.b;
        // T2 expanded with sign applied: op*(num2*a1)x + op*(num2*b1)
        const t2_x = opFactor * num2 * d1.a;
        const t2_c = opFactor * num2 * d1.b;

        // Construct expected string "T1x T1c T2x T2c" (strictly ordered for simplicity, as per teaching)
        // User inputs: 15 - 18x + 18x - 27
        // We will construct the signed string of all 4 terms
        
        const termStr = (val, isFirst) => {
            if (val === 0) return "";
            if (isFirst) return val.toString();
            return val > 0 ? `+${val}` : `${val}`; // Negative number includes -
        };
        const termXStr = (val, isFirst) => {
            if (val === 0) return "";
            let s = "";
            if (Math.abs(val) === 1) s = v;
            else s = `${Math.abs(val)}${v}`;
            
            if (val > 0) return isFirst ? s : `+${s}`;
            return `-${s}`;
        };

        // Standard expansion order: T1(x terms then c terms?) -> No, usually expanding (ax+b) gives ax+b order
        // 3(5-6x) -> 15-18x
        // So we follow the order of the binomial d1/d2
        // d.display is ax+b
        
        let expectedNum = "";
        
        // Expand term 1: num1 * (d2.a x + d2.b)
        expectedNum += termXStr(t1_x, true);
        expectedNum += termStr(t1_c, expectedNum === "");
        
        // Expand term 2: op * num2 * (d1.a x + d1.b)
        expectedNum += termXStr(t2_x, false);
        expectedNum += termStr(t2_c, false);

        // Normalized check
        const uParts = step2.split('/');
        if (uParts.length === 2) {
            let uNum = normalize(uParts[0]);
            const uDen = normalize(uParts[1]);
            if (uNum.startsWith('(') && uNum.endsWith(')')) uNum = uNum.slice(1, -1);
            
            return (uNum === normalize(expectedNum)) && isValidDenom(uDen);
        }
        return false;
    };

    // --- 4. Validation Logic for Step 1 (1 Point) ---
    // N1(D2) ± N2(D1)
    const validateStep1 = () => {
        // Expected: num1(d2_str) op num2(d1_str)
        const op = isAddition ? '+' : '-';
        
        // Generate options for term:
        // - If coeff is 1: accept paren + bare, with optional leading 1
        // - If coeff > 1: require parentheses for clarity
        const getTermOptions = (n, polyPar, polyBare) => {
            if (n === 1) return [`1${polyPar}`, `${polyPar}`, `${polyBare}`];
            return [`${n}${polyPar}`];
        };

        const t1Options = getTermOptions(num1, d2Str, d2Bare);
        const t2Options = getTermOptions(num2, d1Str, d1Bare);

        const expectedNums = [];
        t1Options.forEach(t1 => {
            t2Options.forEach(t2 => {
                // Form: T1 op T2
                expectedNums.push(normalize(`${t1}${op}${t2}`));
                // Form: T2 + T1 (only if addition)
                if (isAddition) {
                    expectedNums.push(normalize(`${t2}+${t1}`));
                }
            });
        });

        const uParts = step1.split('/');
        if (uParts.length === 2) {
            let uNum = normalize(uParts[0]);
            const uDen = normalize(uParts[1]);
            // If user wrapped WHOLE numerator in parens:
            let uNumStripped = uNum;
            if (uNum.startsWith('(') && uNum.endsWith(')')) {
                 uNumStripped = uNum.slice(1, -1);
            }

            const isNumCorrect = expectedNums.some(e => e === uNum || e === uNumStripped);
            return isNumCorrect && isValidDenom(uDen);
        }
        return false;
    };

    // --- Main Scoring Logic ---
    let pts = 0;
    let newFeedback = 'incorrect';

    if (validateFinalAnswer()) {
        pts = 3;
        newFeedback = 'correct';
    } else if (validateStep2()) {
        pts = 2;
        newFeedback = 'partial';
    } else if (validateStep1()) {
        pts = 1;
        newFeedback = 'partial';
    } else {
        pts = 0;
        newFeedback = 'incorrect';
    }

    setScore(s => s + pts);
    setEarnedPoints(pts);
    setFeedback(newFeedback);
  };

  const renderSolution = () => {
    if (!question) return null;
    const { num1, num2, d1, d2, isAddition, variable: v } = question;
    const op = isAddition ? "+" : "-";

    // 1. Construct Question LaTeX
    const Question_tex = `\\frac{${num1}}{${d1.display}} ${op} \\frac{${num2}}{${d2.display}}`;

    const D1_tex = `(${d1.display})`;
    const D2_tex = `(${d2.display})`;
    const Denom_tex = `${D1_tex}${D2_tex}`;

    // Improve Step 1 Display: Omit '1' if coefficient is 1
    const term1_tex = (num1 === 1) ? D2_tex : `${num1}${D2_tex}`;
    const term2_tex = (num2 === 1) ? D1_tex : `${num2}${D1_tex}`;
    const Step1_Num_tex = `${term1_tex} ${op} ${term2_tex}`;
    const Step1_tex = `=\\frac{${Step1_Num_tex}}{${Denom_tex}}`;

    // Term 1 expanded
    const t1_x = num1 * d2.a;
    const t1_c = num1 * d2.b;
    const T1_str = `${t1_x === 1 ? '' : t1_x}${v} ${t1_c >= 0 ? '+' : '-'} ${Math.abs(t1_c)}`;
    
    // Term 2 expanded logic with direct sign handling
    const t2_x_raw = num2 * d1.a;
    const t2_c_raw = num2 * d1.b;
    
    let T2_str_expanded = "";
    if (isAddition) {
        // + (ax + b) => + ax + b
        // + (ax - b) => + ax - b
        T2_str_expanded += `+ ${t2_x_raw === 1 ? '' : t2_x_raw}${v}`; 
        T2_str_expanded += ` ${t2_c_raw >= 0 ? '+' : '-'} ${Math.abs(t2_c_raw)}`;
    } else {
        // - (ax + b) => - ax - b
        // - (ax - b) => - ax + b
        // Note: t2_x_raw (coeff of variable) is always positive in our generator (a=1..4, num2=1..9)
        T2_str_expanded += `- ${t2_x_raw === 1 ? '' : t2_x_raw}${v}`;
        // Flip the sign of the constant term
        T2_str_expanded += ` ${t2_c_raw >= 0 ? '-' : '+'} ${Math.abs(t2_c_raw)}`;
    }
    
    const Step2_Num_tex = `${T1_str} ${T2_str_expanded}`;
    const Step2_tex = `=\\frac{${Step2_Num_tex}}{${Denom_tex}}`;

    const opFactor = isAddition ? 1 : -1;
    const final_x = (num1 * d2.a) + (opFactor * num2 * d1.a);
    const final_c = (num1 * d2.b) + (opFactor * num2 * d1.b);
    
    let ans_num_tex = "";
    if (final_x !== 0) ans_num_tex += `${final_x === 1 ? '' : (final_x === -1 ? '-' : final_x)}${v}`;
    if (final_c > 0) ans_num_tex += `${final_x !== 0 ? '+' : ''}${final_c}`;
    else if (final_c < 0) ans_num_tex += `${final_c}`;
    if (ans_num_tex === "") ans_num_tex = "0";

    const Ans_tex = `=\\frac{${ans_num_tex}}{${Denom_tex}}`;

    return (
      <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200 text-left text-gray-800 animate-in slide-in-from-bottom-2">
        <h3 className="font-bold text-red-600 flex items-center gap-2 mb-2">
            <X size={20} /> 正確步驟 (Correct Steps)：
        </h3>
        {/* Removed overflow-x-auto to delete scroll */}
        <div className="flex flex-col gap-4">
            {/* Added Question Display */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm bg-gray-200 px-2 py-1 rounded text-gray-600">題目</span>
                <div className="text-lg"><InlineMath math={Question_tex} /></div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm bg-gray-200 px-2 py-1 rounded text-gray-600">第一行步驟</span>
                <div className="text-lg"><InlineMath math={Step1_tex} /></div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm bg-gray-200 px-2 py-1 rounded text-gray-600">第二行步驟</span>
                <div className="text-lg"><InlineMath math={Step2_tex} /></div>
            </div>
            <div className="flex items-center gap-2 flex-wrap border-t border-red-200 pt-2 mt-1">
                <span className="font-bold text-sm bg-red-600 text-white px-2 py-1 rounded">答案</span>
                <div className="text-xl text-red-700 font-bold"><InlineMath math={Ans_tex} /></div>
            </div>
        </div>
      </div>
    );
  };

  const renderInputBox = (label, value, fieldName) => {
    const isActive = activeInput === fieldName && !feedback;
    const latex = formatInputToLatex(value);
    
    return (
        <div 
            onClick={() => !feedback && setActiveInput(fieldName)}
            className={`
                bg-white p-4 rounded-xl border-2 transition-all cursor-pointer relative min-h-[5.5rem] flex flex-col justify-center
                ${isActive ? 'border-blue-500 ring-4 ring-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}
            `}
        >
            <span className={`
                absolute top-2 left-3 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider
                ${fieldName === 'answer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}
            `}>
                {label}
            </span>
            
            <div className="flex items-center justify-center w-full overflow-x-auto pt-4 pb-2 px-2">
                {/* Math Display */}
                <div className={`text-xl ${fieldName === 'answer' ? 'text-blue-700' : 'text-gray-800'} ${!value && 'opacity-30'}`}>
                    <InlineMath math={value ? latex : "\\text{輸入...}"} />
                </div>
                {/* Blinking Cursor Indicator */}
                {isActive && (
                    <div className="w-0.5 h-6 bg-blue-500 animate-pulse ml-2 shadow-[0_0_4px_rgba(59,130,246,0.5)]"></div>
                )}
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-[32rem] md:pb-10">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center justify-center relative">
        <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors z-20">
          <HomeIcon size={20} />
          <span className="text-sm font-semibold">返回主頁</span>
        </Link>
        {/* Centered Title */}
        <h1 className="font-bold text-xl text-gray-800 absolute left-1/2 transform -translate-x-1/2 w-full text-center pointer-events-none">
            DSE代數分式
        </h1>

        {/* Right side controls - Pushed to right */}
        <div className="flex items-center gap-2 ml-auto z-20">
            <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold border border-yellow-300 text-sm md:text-base">
                Score: {score}
            </div>
            <Button 
                variant="outline" 
                onClick={() => setShowTips(true)} 
                className="flex items-center gap-1.5 !px-3 !py-1.5 bg-yellow-50 border-yellow-300 hover:bg-yellow-100 transition-colors"
            >
                <Lightbulb size={18} className="text-yellow-600" />
                <span className="text-yellow-800 font-bold text-sm">教學筆記</span>
            </Button>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4 flex flex-col gap-4">
        
        {/* Question Card */}
        {question && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <div className="text-gray-500 text-sm mb-1 w-full text-left font-bold">題目 (Question):</div>
                <div className="py-2 w-full flex justify-center scale-110">
                    <BlockMath math={`\\frac{${question.num1}}{${question.d1.display}} ${question.isAddition ? '+' : '-'} \\frac{${question.num2}}{${question.d2.display}}`} />
                </div>
            </div>
        )}

        {/* Inputs */}
        <div className="flex flex-col gap-3">
            {renderInputBox("Step 1: 通分母", step1, "step1")}
            {renderInputBox("Step 2: 展開分子", step2, "step2")}
            {renderInputBox("Answer: 最終答案", answer, "answer")}
        </div>

        {/* Action Buttons */}
        {!feedback ? (
             <Button onClick={checkAnswer} className="w-full py-4 text-xl shadow-lg shadow-blue-200 mt-2">
                提交答案 (Submit)
            </Button>
        ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                {feedback === 'correct' ? (
                    <div className="bg-green-100 p-4 rounded-xl border border-green-300 text-green-800 flex items-center gap-3 mb-4">
                        <CheckCircle className="flex-shrink-0 w-8 h-8" />
                        <div>
                            <div className="font-bold text-lg">正確！ (Correct) +3分</div>
                            <div className="text-sm opacity-90">做得好！繼續挑戰下一題。</div>
                        </div>
                    </div>
                ) : feedback === 'partial' ? (
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-300 text-yellow-800 flex items-center gap-3 mb-4">
                        <AlertTriangle className="flex-shrink-0 w-8 h-8" />
                        <div>
                            <div className="font-bold text-lg">部分正確 (Partial) +{earnedPoints}分</div>
                            <div className="text-sm opacity-90">請參考下方正確步驟，修正錯誤。</div>
                        </div>
                    </div>
                ) : (
                   <div className="mb-4 text-center text-gray-500 text-sm">
                       獲得 +0 分，請參考正確答案。
                   </div>
                )}
                
                {/* Always show solution unless completely correct (optional, but requested for '答錯') */}
                {feedback !== 'correct' && renderSolution()}
                
                <Button onClick={generateQuestion} variant={feedback === 'correct' ? 'primary' : 'secondary'} className="w-full py-4 text-xl mt-4 flex items-center justify-center gap-2 shadow-lg">
                    <RefreshCw size={22} /> 下一題 (Next Question)
                </Button>
            </div>
        )}

      </main>

      {/* Realistic Keypad Layout */}
      {/* Fixed on Mobile: bottom-0, fixed.
          Relative on Desktop: md:relative, md:bg-transparent.
          This ensures desktop users can scroll past the content naturally.
      */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-3 z-30 pb-safe md:relative md:shadow-none md:bg-transparent md:border-none md:pb-0 md:mt-8">
        
        {/* Drag handle for mobile only */}
        <div className="flex justify-center mb-2 md:hidden">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 max-w-xl mx-auto">
            {/* Row 1 */}
            <Button variant="keyFunction" onClick={() => handleKeyPad('(')}>(</Button>
            <Button variant="keyFunction" onClick={() => handleKeyPad(')')}>)</Button>
            <Button variant="keyAction" onClick={() => handleKeyPad('DEL')}>DEL</Button>
            <Button variant="keyAction" onClick={() => handleKeyPad('CLEAR')}>AC</Button>

            {/* Row 2 */}
            <Button variant="keyNum" onClick={() => handleKeyPad('7')}>7</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('8')}>8</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('9')}>9</Button>
            <Button variant="keyOp" onClick={() => handleKeyPad('/')} className="bg-orange-100 flex flex-col items-center justify-center gap-0.5" title="Fraction">
                <div className="w-4 h-4 border-2 border-orange-800 rounded-sm"></div>
                <div className="w-6 h-0.5 bg-orange-800"></div>
                <div className="w-4 h-4 border-2 border-orange-800 border-dashed rounded-sm opacity-50"></div>
            </Button>

            {/* Row 3 - Plus is here now */}
            <Button variant="keyNum" onClick={() => handleKeyPad('4')}>4</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('5')}>5</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('6')}>6</Button>
            <Button variant="keyOp" onClick={() => handleKeyPad('+')}>+</Button>

            {/* Row 4 */}
            <Button variant="keyNum" onClick={() => handleKeyPad('1')}>1</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('2')}>2</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('3')}>3</Button>
            <Button variant="keyOp" onClick={() => handleKeyPad('-')}>-</Button>

            {/* Row 5 - Variable is here now (next to .) */}
            <Button variant="keyNum" onClick={() => handleKeyPad('0')}>0</Button>
            <Button variant="keyNum" onClick={() => handleKeyPad('.')} className="font-bold">.</Button>
            <Button variant="keyOp" onClick={() => handleKeyPad(question?.variable || 'x')} className="font-serif italic text-2xl font-normal">
                {question?.variable || 'x'}
            </Button>
            <Button variant="primary" onClick={checkAnswer} disabled={!!feedback} className="bg-blue-600 !text-white !shadow-sm active:bg-blue-700">
               <ArrowRight />
            </Button>
        </div>
      </div>

      {/* Tips Modal */}
      {showTips && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col scale-100 animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b flex justify-between items-center bg-yellow-50">
                    <h3 className="font-bold text-lg text-yellow-800 flex items-center gap-2">
                        <Lightbulb size={20} /> 作答技巧 (Tips)
                    </h3>
                    <button onClick={() => setShowTips(false)} className="p-2 hover:bg-yellow-100 rounded-full text-yellow-800 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                   <TeachingTipsContent />
                </div>
                <div className="p-4 border-t bg-gray-50">
                    <Button onClick={() => setShowTips(false)} className="w-full">
                        明白 (Got it)
                    </Button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}
