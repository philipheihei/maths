import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Calculator, Check, X, RefreshCw, ChevronRight, HelpCircle, ArrowRight, Info, Lightbulb, FileText, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadKatexOnce } from '../utils/katexLoader';

// --- Input to LaTeX Converter ---
const toLatex = (input) => {
  if (!input) return '';
  let latex = input;

  // Handle fractions: convert / to \frac{}{}
  if (latex.includes('/')) {
    const eqIndex = latex.indexOf('=');
    
    if (eqIndex !== -1) {
      // Has equation - process both sides
      const leftSide = latex.substring(0, eqIndex);
      const rightSide = latex.substring(eqIndex + 1);
      
      // Process left side
      let processedLeft = leftSide;
      if (leftSide.includes('/')) {
        processedLeft = processFraction(leftSide);
      }
      
      // Process right side
      let processedRight = rightSide;
      if (rightSide.includes('/')) {
        processedRight = processFraction(rightSide);
      }
      
      return processedLeft + '=' + processedRight;
    } else {
      // No = sign, process normally
      latex = processFraction(latex);
    }
  }

  return latex;
};

// Helper function to process fractions intelligently
const processFraction = (expr) => {
  const slashIndex = expr.lastIndexOf('/');
  if (slashIndex === -1) return expr;
  
  // Find numerator (everything up to the /)
  let numerator = expr.substring(0, slashIndex).trim();
  let denominator = expr.substring(slashIndex + 1).trim();
  
  // Handle cases where numerator has multiple terms like "2a-mn"
  // Check if numerator has operators but no parentheses
  if (numerator.includes('-') || numerator.includes('+')) {
    // If it contains operators, wrap it in braces for LaTeX
    if (!numerator.startsWith('(') && !numerator.startsWith('{')) {
      numerator = `{${numerator}}`;
    }
  }
  
  // If denominator has operators, also wrap it
  if ((denominator.includes('-') || denominator.includes('+')) && 
      !denominator.startsWith('(') && !denominator.startsWith('{')) {
    denominator = `{${denominator}}`;
  }
  
  return `\\frac${numerator}${denominator}`;
};

// --- Math Rendering Helper ---
const Latex = ({ children, block = false }) => {
  const containerRef = useRef(null);
  const [isKatexReady, setIsKatexReady] = useState(false);

  // Load KaTeX once globally
  useEffect(() => {
    loadKatexOnce().then(() => {
      setIsKatexReady(true);
    }).catch((err) => {
      console.error("KaTeX loading failed:", err);
      setIsKatexReady(false);
    });
  }, []);

  useEffect(() => {
    if (isKatexReady && window.katex && containerRef.current) {
      try {
        window.katex.render(children, containerRef.current, {
          throwOnError: false,
          displayMode: block,
        });
      } catch (e) {
        console.error("Katex error:", e);
        containerRef.current.innerText = children;
      }
    } else if (containerRef.current) {
        // Show raw text while loading to prevent empty space
        containerRef.current.innerText = children;
    }
  }, [children, block, isKatexReady]);

  return <span ref={containerRef} className={`${block ? "block my-2" : "inline"}`} />;
};

// --- Simplification Helper ---
const simplifyCoefficient = (n1, n2) => {
  const result = n1 - n2;
  return { original: `${n1}-${n2}`, simplified: result.toString(), value: result };
};

// --- Problem Generator Logic ---
const generateProblem = () => {
  const types = [
    'fraction_simple',    // (n1*s + a)/n2 = b
    'cross_mult',         // n1/(s+a) = C/b
    'bracket_simple',     // n1(s + a) = n2*s + b
    'factor_simple',      // a*s - b = n1*s
    'double_bracket',     // n1(s + a) = n2(s + b) - 新增：兩邊都有括號
    'fraction_both_sides', // (n1*s + a)/n2 = (C*s + b)/d - 新增：兩邊都有分數
    'fraction_simple_both_sides', // 24-2: (Ax+C)/B = ns - 簡單分數兩邊都有主項
    'fraction_polynomial', // 23-1: 兩邊分數分子或分母多項式
    'fraction_add_subtract' // 13-1: 分數加減通分母 - 挑戰題
  ]; 
  const type = types[Math.floor(Math.random() * types.length)];
  
  const vars = ['x', 'y', 'a', 'b', 'h', 'k', 'm', 'n'];
  const getVar = (exclude = []) => {
    const available = vars.filter(v => !exclude.includes(v));
    return available[Math.floor(Math.random() * available.length)];
  };
  
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Helper to get a different random int
  const randIntExcept = (min, max, except) => {
    let num;
    do {
      num = randInt(min, max);
    } while (num === except);
    return num;
  };

  let problem = {
    id: Date.now(),
    text: "", 
    subject: "",
    allVariables: [], // Track all variables explicitly
    steps: {
      hasFraction: false, step1Eq: null,
      hasBracket: false, step2Eq: null,
      hasMove: true, step3Eq: null,
      hasFactor: false, step4Eq: null,
      hasDivide: false, step5Eq: null,
    }
  };

  const s = getVar(); 
  const a = getVar([s]); 
  const b = getVar([s, a]); 
  const n1 = randInt(2, 9);
  const n2 = randIntExcept(2, 9, n1); // 確保 n2 ≠ n1

  // TYPE 1: Simple Fraction: (as + n1)/n2 = a
  if (type === 'fraction_simple') {
    problem.text = `\\frac{${n1}${s} + ${a}}{${n2}} = ${b}`;
    problem.subject = s;
    problem.allVariables = [s, a, b];
    problem.steps.hasFraction = true;
    problem.steps.step1Eq = `${n1}${s}+${a}=${n2}${b}`;
    problem.steps.hasBracket = false;
    problem.steps.step2Eq = problem.steps.step1Eq; 
    problem.steps.hasMove = true;
    problem.steps.step3Eq = `${n1}${s}=${n2}${b}-${a}`;
    problem.steps.hasFactor = false;
    problem.steps.step4Eq = problem.steps.step3Eq;
    problem.steps.hasDivide = true;
    problem.steps.step5Eq = `${s}=\\frac{${n2}${b}-${a}}{${n1}}`;
  }
  // TYPE 2: Cross Multiply: a/(s+b) = c/d
  else if (type === 'cross_mult') {
    const C = getVar([s, a, b]);
    problem.text = `\\frac{${n1}}{${s} + ${a}} = \\frac{${C}}{${b}}`;
    problem.subject = s;
    problem.allVariables = [s, a, b, C];
    problem.steps.hasFraction = true;
    problem.steps.step1Eq = `${n1}${b}=${C}(${s}+${a})`;
    problem.steps.hasBracket = true;
    problem.steps.step2Eq = `${n1}${b}=${C}${s}+${C}${a}`;
    problem.steps.hasMove = true;
    problem.steps.step3Eq = `${n1}${b}-${C}${a}=${C}${s}`;
    problem.steps.hasFactor = false;
    problem.steps.step4Eq = problem.steps.step3Eq;
    problem.steps.hasDivide = true;
    problem.steps.step5Eq = `${s}=\\frac{${n1}${b}-${C}${a}}{${C}}`;
  }
  // TYPE 3: Brackets & Factorization: n1(s + a) = n2 s + b
  // 兩個主項系數都是數字 → 可以化簡 (仍算作抽的步驟)
  else if (type === 'bracket_simple') {
    problem.text = `${n1}(${s} + ${a}) = ${n2}${s} + ${b}`;
    problem.subject = s;
    problem.allVariables = [s, a, b];
    problem.steps.hasFraction = false;
    problem.steps.step1Eq = problem.text;
    problem.steps.hasBracket = true;
    problem.steps.step2Eq = `${n1}${s}+${n1}${a}=${n2}${s}+${b}`;
    problem.steps.hasMove = true;
    // Step3: 保留未簡化形式 (2個主項)
    problem.steps.step3Eq = `${n1}${s}-${n2}${s}=${b}-${n1}${a}`;
    
    // 有2個主項 → 需要抽 (Factor step)
    // 兩個係數都是數字 → 用戶需要合併同類項
    problem.steps.hasFactor = true;
    problem.steps.factorType = 'numeric'; // 可以化簡
    const coeffDiff = n1 - n2;
    if (coeffDiff === 1) {
      problem.steps.step4Eq = `${s}=${b}-${n1}${a}`;
    } else if (coeffDiff === -1) {
      problem.steps.step4Eq = `-${s}=${b}-${n1}${a}`;
    } else {
      problem.steps.step4Eq = `${coeffDiff}${s}=${b}-${n1}${a}`;
    }
    
    // Step5: 最終答案
    problem.steps.hasDivide = (coeffDiff !== 1);
    if (coeffDiff === 1) {
      problem.steps.step5Eq = `${s}=${b}-${n1}${a}`;
    } else if (coeffDiff === -1) {
      problem.steps.step5Eq = `${s}=${n1}${a}-${b}`;
    } else {
      problem.steps.step5Eq = `${s}=\\frac{${b}-${n1}${a}}{${coeffDiff}}`;
    }
  }
  // TYPE 4: Algebraic Factorization: a*s - b = n1*s (a is a variable!)
  // 其中一個主項系數是代數 → 只可以抽，不可以化簡
  else if (type === 'factor_simple') {
    problem.text = `${a}${s} - ${b} = ${n1}${s}`;
    problem.subject = s;
    problem.allVariables = [s, a, b];
    problem.steps.hasFraction = false;
    problem.steps.step1Eq = problem.text;
    problem.steps.hasBracket = false;
    problem.steps.step2Eq = problem.text;
    problem.steps.hasMove = true;
    // Step3: 保留未簡化形式 (2個主項: a*s 和 n1*s)
    problem.steps.step3Eq = `${a}${s}-${n1}${s}=${b}`;
    
    // 有2個主項 → 需要抽 (Factor step)
    // 其中一個係數是代數(a) → 只可以因式分解，不可以化簡
    // 答案是 s(a - n1) = b
    problem.steps.hasFactor = true;
    problem.steps.factorType = 'algebraic'; // 只可以抽
    problem.steps.step4Eq = `${s}(${a}-${n1})=${b}`;
    
    // Step5: 除過對面
    problem.steps.hasDivide = true;
    problem.steps.step5Eq = `${s}=\\frac{${b}}{${a}-${n1}}`;
  }
  // TYPE 5: Double Brackets: n1(s + a) = n2(s + b)
  // 兩邊都有括號 → 需要拆兩次
  else if (type === 'double_bracket') {
    const c = getVar([s, a, b]);
    problem.text = `${n1}(${s} + ${a}) = ${n2}(${s} + ${c})`;
    problem.subject = s;
    problem.allVariables = [s, a, c];
    problem.steps.hasFraction = false;
    problem.steps.step1Eq = problem.text;
    problem.steps.hasBracket = true;
    problem.steps.step2Eq = `${n1}${s}+${n1}${a}=${n2}${s}+${n2}${c}`;
    problem.steps.hasMove = true;
    problem.steps.step3Eq = `${n1}${s}-${n2}${s}=${n2}${c}-${n1}${a}`;
    
    problem.steps.hasFactor = true;
    problem.steps.factorType = 'numeric';
    const coeffDiff = n1 - n2;
    if (coeffDiff === 1) {
      problem.steps.step4Eq = `${s}=${n2}${c}-${n1}${a}`;
    } else if (coeffDiff === -1) {
      problem.steps.step4Eq = `-${s}=${n2}${c}-${n1}${a}`;
    } else {
      problem.steps.step4Eq = `${coeffDiff}${s}=${n2}${c}-${n1}${a}`;
    }
    
    problem.steps.hasDivide = (coeffDiff !== 1);
    if (coeffDiff === 1) {
      problem.steps.step5Eq = `${s}=${n2}${c}-${n1}${a}`;
    } else if (coeffDiff === -1) {
      problem.steps.step5Eq = `${s}=${n1}${a}-${n2}${c}`;
    } else {
      problem.steps.step5Eq = `${s}=\\frac{${n2}${c}-${n1}${a}}{${coeffDiff}}`;
    }
  }
  // TYPE 6: Fraction on Both Sides: (n1*s + a)/n2 = (C*s + b)/d
  // 兩邊都有分數 → 交叉相乘後會有兩個主項
  else if (type === 'fraction_both_sides') {
    const C = getVar([s, a, b]);
    const d = getVar([s, a, b, C]);
    const n3 = randInt(2, 5);
    
    // 確保係數差不為 0 或 1 (避免過於簡單)
    let coeffDiff;
    let d_val, n1_val, n2_val, n3_val;
    do {
      d_val = randInt(2, 5);
      n1_val = n1;
      n2_val = n2;
      n3_val = randInt(2, 5);
      coeffDiff = d_val * n1_val - n2_val * n3_val;
    } while (coeffDiff === 0 || coeffDiff === 1 || coeffDiff === -1);
    
    problem.text = `\\frac{${n1}${s} + ${a}}{${n2}} = \\frac{${n3}${s} + ${b}}{${d_val}}`;
    problem.subject = s;
    problem.allVariables = [s, a, b, d];
    problem.steps.hasFraction = true;
    problem.steps.step1Eq = `${d_val}(${n1}${s}+${a})=${n2}(${n3}${s}+${b})`;
    problem.steps.hasBracket = true;
    problem.steps.step2Eq = `${d_val * n1}${s}+${d_val}${a}=${n2 * n3}${s}+${n2}${b}`;
    problem.steps.hasMove = true;
    problem.steps.step3Eq = `${d_val * n1}${s}-${n2 * n3}${s}=${n2}${b}-${d_val}${a}`;
    
    problem.steps.hasFactor = true;
    problem.steps.factorType = 'numeric';
    problem.steps.step4Eq = `${coeffDiff}${s}=${n2}${b}-${d_val}${a}`;
    
    problem.steps.hasDivide = true;
    problem.steps.step5Eq = `${s}=\\frac{${n2}${b}-${d_val}${a}}{${coeffDiff}}`;
  }
  // TYPE 7: Simple Fraction Both Sides (24-2): (Ax + C)/B = n*s
  // 簡單分數，兩邊都有主項，但右邊沒有分數
  else if (type === 'fraction_simple_both_sides') {
    const C = getVar([s, a, b]);
    problem.text = `\\frac{${n1}${s} + ${C}}{${n2}} = ${a}${s}`;
    problem.subject = s;
    problem.allVariables = [s, a, C];
    problem.steps.hasFraction = true;
    problem.steps.step1Eq = `${n1}${s}+${C}=${n2}${a}${s}`;
    problem.steps.hasBracket = false;
    problem.steps.step2Eq = problem.steps.step1Eq;
    problem.steps.hasMove = true;
    problem.steps.step3Eq = `${n1}${s}-${n2}${a}${s}=${-1}${C}`.replace('-1', '-').replace('=-', '=-');
    problem.steps.step3Eq = `${n1}${s}-${n2}${a}${s}=-${C}`;
    
    problem.steps.hasFactor = true;
    problem.steps.factorType = 'algebraic';
    problem.steps.step4Eq = `${s}(${n1}-${n2}${a})=-${C}`;
    
    problem.steps.hasDivide = true;
    problem.steps.step5Eq = `${s}=\\frac{-${C}}{${n1}-${n2}${a}}`;
  }
  // TYPE 8: Fraction Polynomial (23-1): 兩邊分數分子或分母多項式
  // e.g., a/(s+b) = C/(s+d) 或 (as+b)/C = d/(s+e)
  else if (type === 'fraction_polynomial') {
    const C = getVar([s, a, b]);
    const d = getVar([s, a, b, C]);
    
    // 形式: a/(s+b) = C/(s+d)
    problem.text = `\\frac{${a}}{${s} + ${n1}} = \\frac{${C}}{${s} + ${n2}}`;
    problem.subject = s;
    problem.allVariables = [s, a, C];
    problem.steps.hasFraction = true;
    problem.steps.step1Eq = `${a}(${s}+${n2})=${C}(${s}+${n1})`;
    problem.steps.hasBracket = true;
    problem.steps.step2Eq = `${a}${s}+${n2}${a}=${C}${s}+${n1}${C}`;
    problem.steps.hasMove = true;
    problem.steps.step3Eq = `${a}${s}-${C}${s}=${n1}${C}-${n2}${a}`;
    
    problem.steps.hasFactor = true;
    problem.steps.factorType = 'algebraic';
    problem.steps.step4Eq = `${s}(${a}-${C})=${n1}${C}-${n2}${a}`;
    
    problem.steps.hasDivide = true;
    problem.steps.step5Eq = `${s}=\\frac{${n1}${C}-${n2}${a}}{${a}-${C}}`;
  }
  // TYPE 9: Fraction Add/Subtract (13-1): 分數加減通分母 - 挑戰題
  // e.g., hk(3/h - 1/k) = 2hk → 3k - h = 2hk
  else if (type === 'fraction_add_subtract') {
    const C = getVar([s, a, b]);
    
    // 形式: ab(n1/a - n2/b) = Cs  →  n1*b - n2*a = Cs
    problem.text = `${a}${b}\\left(\\frac{${n1}}{${a}} - \\frac{${n2}}{${b}}\\right) = ${C}${s}`;
    problem.subject = s;
    problem.allVariables = [s, a, b, C];
    problem.isChallenge = true; // 標記為挑戰題
    
    problem.steps.hasFraction = true;
    // 通分後: n1*b - n2*a = Cs
    problem.steps.step1Eq = `${n1}${b}-${n2}${a}=${C}${s}`;
    problem.steps.hasBracket = false;
    problem.steps.step2Eq = problem.steps.step1Eq;
    problem.steps.hasMove = false;
    problem.steps.step3Eq = problem.steps.step1Eq;
    
    problem.steps.hasFactor = false;
    problem.steps.step4Eq = problem.steps.step3Eq;
    
    problem.steps.hasDivide = true;
    problem.steps.step5Eq = `${s}=\\frac{${n1}${b}-${n2}${a}}{${C}}`;
  }

  return problem;
};

// --- Normalization for Math Checking ---
const normalizeMath = (str) => {
  if (!str) return "";
  return str.replace(/\s+/g, '')
            .replace(/\\cdot/g, '')
            .replace(/\\times/g, '')
            .replace(/\*/g, '');
};

// Sort terms in an expression to handle commutative property
const sortTerms = (expr) => {
  // Split by + and - while keeping the operators
  const terms = [];
  let currentTerm = '';
  let currentSign = '+';
  
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if ((char === '+' || char === '-') && i > 0) {
      terms.push(currentSign + currentTerm);
      currentSign = char;
      currentTerm = '';
    } else if (char !== '+' && char !== '-') {
      currentTerm += char;
    } else if (i === 0 && char === '-') {
      currentSign = '-';
    }
  }
  if (currentTerm) {
    terms.push(currentSign + currentTerm);
  }
  
  return terms.sort().join('').replace(/^\+/, '');
};

const checkAnswer = (input, expected, problem = null, currentStep = null) => {
  if (!expected) return true;
  
  // Convert both to LaTeX for visual comparison (not string comparison)
  const inputLatex = toLatex(input);
  const expectedLatex = toLatex(expected);
  
  // Normalize both LaTeX for comparison (remove spaces, brackets and formatting)
  const normalizeLatex = (latex) => {
    return latex
      .replace(/\s+/g, '')
      .replace(/\\frac/g, 'FRAC')  // Preserve frac structure
      .replace(/[{}()]/g, '')       // Remove all brackets
      .replace(/\\\(/g, '')
      .replace(/\\\)/g, '')
      .replace(/\\text\{[^}]*\}/g, '')  // Remove text commands
      .toLowerCase();
  };
  
  // Sort and normalize terms in an expression to handle commutative property (a+b = b+a)
  const sortTermsInExpr = (expr) => {
    if (!expr) return '';
    
    // Split by + and - while keeping operators
    const terms = [];
    let currentTerm = '';
    let currentSign = '+';
    
    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      if ((char === '+' || char === '-') && i > 0 && currentTerm) {
        terms.push({ sign: currentSign, term: currentTerm.trim() });
        currentSign = char;
        currentTerm = '';
      } else if (char !== '+' && char !== '-') {
        currentTerm += char;
      } else if (i === 0 && char === '-') {
        currentSign = '-';
      }
    }
    if (currentTerm.trim()) {
      terms.push({ sign: currentSign, term: currentTerm.trim() });
    }
    
    // Sort terms by their content (ignore sign for sorting)
    terms.sort((a, b) => a.term.localeCompare(b.term));
    
    // Reconstruct expression
    let result = '';
    terms.forEach((t, idx) => {
      if (idx === 0) {
        result += (t.sign === '-' ? '-' : '') + t.term;
      } else {
        result += t.sign + t.term;
      }
    });
    
    return result;
  };
  
  const normalizedInput = normalizeLatex(inputLatex);
  const normalizedExpected = normalizeLatex(expectedLatex);
  
  console.log('Input:', input, '→ LaTeX:', inputLatex, '→ Normalized:', normalizedInput);
  console.log('Expected:', expected, '→ LaTeX:', expectedLatex, '→ Normalized:', normalizedExpected);
  
  // Direct visual match
  if (normalizedInput === normalizedExpected) return true;
  
  // Check if it's an equation (has =)
  if (inputLatex.includes('=') && expectedLatex.includes('=')) {
    const partsIn = normalizedInput.split('=');
    const partsEx = normalizedExpected.split('=');
    
    if (partsIn.length === 2 && partsEx.length === 2) {
      let [inLeft, inRight] = partsIn.map(p => p.trim());
      let [exLeft, exRight] = partsEx.map(p => p.trim());
      
      // Sort terms in each side to handle commutative property
      inLeft = sortTermsInExpr(inLeft);
      inRight = sortTermsInExpr(inRight);
      exLeft = sortTermsInExpr(exLeft);
      exRight = sortTermsInExpr(exRight);
      
      // Check both orientations (left=right or right=left)
      const match1 = inLeft === exLeft && inRight === exRight;
      const match2 = inLeft === exRight && inRight === exLeft;
      
      console.log('Parts comparison (sorted):', {
        inLeft, inRight, exLeft, exRight,
        match1, match2
      });
      
      if (match1 || match2) {
        return true;
      }
    }
  }
  
  return false;
};


// --- COMPONENTS ---

const Keyboard = ({ onKeyPress, problem, currentEquation }) => {
  const btnClass = "bg-white border border-gray-300 rounded-lg p-3 shadow-sm active:bg-blue-100 hover:bg-gray-50 text-lg font-medium flex justify-center items-center transition-colors select-none";
  
  // Extract variables from problem and current equation
  const allVars = ['x', 'y', 'a', 'b', 'h', 'k', 'm', 'n'];
  const usedVars = new Set();
  
  // Priority 1: Use explicit variable list from problem
  if (problem && problem.allVariables && Array.isArray(problem.allVariables)) {
    problem.allVariables.forEach(v => {
      if (allVars.includes(v)) {
        usedVars.add(v);
      }
    });
  }
  
  // Priority 2: Extract from text if explicit list not available or incomplete
  let extractionText = '';
  if (problem) {
    extractionText = problem.text + ' ' + problem.subject;
  }
  if (currentEquation) {
    extractionText += ' ' + currentEquation;
  }
  
  if (extractionText && usedVars.size < 2) {
    // More robust LaTeX cleaning
    let cleanedText = extractionText;
    
    // Step 1: Remove \text{...} commands completely (they don't contain variables)
    cleanedText = cleanedText.replace(/\\text\{[^}]*\}/g, ' ');
    
    // Step 2: Remove \frac and other commands but keep content
    cleanedText = cleanedText.replace(/\\frac/g, '');
    cleanedText = cleanedText.replace(/\\left|\\right/g, '');
    
    // Step 3: Remove braces but preserve content
    cleanedText = cleanedText.replace(/[{}]/g, ' ');
    
    // Step 4: Remove remaining backslashes
    cleanedText = cleanedText.replace(/\\/g, ' ');
    
    // Step 5: Normalize to lowercase
    cleanedText = cleanedText.toLowerCase();
    
    // Extract variables using word boundary detection
    allVars.forEach(v => {
      // Use regex to find variable as standalone or with numbers/operators
      const pattern = new RegExp(`[^a-z]${v}[^a-z]|^${v}[^a-z]|[^a-z]${v}$|^${v}$`, 'g');
      if (pattern.test(cleanedText) || cleanedText.includes(v)) {
        usedVars.add(v);
      }
    });
  }
  
  // Build rows dynamically - show ALL used variables (increase from 4 to 6 if needed)
  const varRow = allVars.filter(v => usedVars.has(v));
  
  const rows = [
    ['7', '8', '9', '/', 'DEL', 'AC'],
    ['4', '5', '6', '×', '(', ')'],
    ['1', '2', '3', '-', varRow[0] || 'EMPTY_0', varRow[1] || 'EMPTY_1'],
    ['0', '.', '=', '+', varRow[2] || 'EMPTY_2', varRow[3] || 'EMPTY_3']
  ];

  return (
    <div className="grid grid-cols-6 gap-2 p-2 bg-gray-100 rounded-xl mt-4">
      {rows.map((row, rIdx) => (
        <React.Fragment key={rIdx}>
          {row.map((key, colIdx) => {
            const isEmptySlot = key.startsWith('EMPTY_');
            return (
              <button
                key={`${rIdx}-${colIdx}`}
                onClick={() => {
                  if (key === '×') {
                    onKeyPress('*');
                  } else if (key === 'DEL') {
                    onKeyPress('DEL');
                  } else if (key === 'AC') {
                    onKeyPress('CLR');
                  } else if (!isEmptySlot) {
                    onKeyPress(key);
                  }
                }}
                disabled={isEmptySlot}
                className={
                  isEmptySlot ? 'bg-gray-50 border-0 cursor-default opacity-0' :
                  ['DEL', 'AC'].includes(key) ? "bg-red-100 text-red-800 border-red-200" + btnClass.replace('bg-white', '') : btnClass
                }
              >
              {isEmptySlot ? '' : key === '/' ? (
                <span className="flex flex-col items-center text-xs leading-none">
                  <span>◻</span>
                  <span className="border-t border-gray-400 w-full"></span>
                  <span>◻</span>
                </span>
              ) : key}
            </button>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- Example Component ---
const WorkedExample = ({ title, steps }) => {
  const [activeExplain, setActiveExplain] = useState(null);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
         <BookOpen size={20} className="text-blue-600"/>
         {title}
      </h3>
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-4 border-l-2 border-blue-100">
            <div className="flex items-center gap-3 flex-wrap">
               <div className="bg-gray-50 px-4 py-2 rounded-lg text-lg text-gray-800 font-serif border border-gray-100 shadow-sm min-w-[200px]">
                 <Latex>{step.math}</Latex>
               </div>
               
               {step.explain && (
                 <div className="relative">
                   <button 
                     onClick={() => setActiveExplain(activeExplain === idx ? null : idx)}
                     className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeExplain === idx ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                   >
                     {activeExplain === idx ? <X size={14}/> : <Lightbulb size={14}/>}
                     {step.action}
                   </button>
                   
                   {activeExplain === idx && (
                     <div className="absolute left-0 top-full mt-2 z-10 w-64 bg-amber-50 text-amber-900 text-sm p-3 rounded-xl shadow-lg border border-amber-100 animate-fade-in">
                       {step.explain}
                     </div>
                   )}
                 </div>
               )}
            </div>
            {idx < steps.length - 1 && (
               <div className="absolute left-[-5px] top-full mt-1 w-2 h-2 bg-blue-200 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Notes Section Component ---
const NotesSection = () => {
  const rows = [
    {
      condition: '\\color{green}{\\text{分數}}',
      action: '\\color{red}{\\text{乘}} (\\color{green}{\\text{交叉相乘}})',
      example: '\\color{purple}{\\text{沒分數}} \\rightarrow \\text{(跳過此步)}'
    },
    {
      condition: '\\color{green}{\\text{括號}}',
      action: '\\color{red}{\\text{拆}} (\\color{green}{\\text{拆除括號}})',
      example: '\\color{purple}{\\text{有括號，拆}} \\rightarrow \\color{blue}{nm - 5n = 3m + 2n}'
    },
    {
      condition: '\\color{green}{\\text{主項}} (\\text{例: } x \\text{是主項})',
      action: '\\color{red}{\\text{移}} (\\color{green}{\\text{所有有 } x \\text{ 的項放在同邊}})',
      example: '\\color{blue}{\\mathbf{n}m - 5\\mathbf{n} - 2\\mathbf{n} = 3m} \\\\ \\leftarrow \\color{purple}{n \\text{ 全放左方}}'
    },
    {
      condition: '\\color{green}{\\text{主項出現多於一次}}',
      action: '\\color{red}{\\text{抽}} (\\color{green}{\\text{因式分解抽 } x})',
      example: '\\color{blue}{n(m - 7) = 3m} \\\\ \\leftarrow \\color{purple}{\\text{抽 } n \\text{ (變成唯一主項)}}'
    },
    {
      condition: '\\color{green}{\\text{主項旁有其他數字/代數}}',
      action: '\\color{red}{\\text{除}} (\\color{green}{\\text{除到另一方變分數}})',
      example: '\\color{blue}{n = \\frac{3m}{m-7}} \\\\ \\leftarrow \\color{purple}{\\text{將 } m-7 \\text{ 放進另一方除}}'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
        <FileText size={24} className="text-amber-500" />
        重點筆記 (Notes)
      </h2>
      
      <div className="mb-6 bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
        <p className="text-gray-600 mb-2 font-bold text-sm uppercase tracking-wide">示範例子</p>
        <div className="text-xl">
          <Latex>{'n(m-5) = 3m + 2n \\quad [\\color{green}{n\\text{為主項}}]'}</Latex>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-4 font-bold text-gray-700 w-1/4">見到 (條件)</th>
              <th className="p-4 font-bold text-gray-700 w-1/4">就要 (行動)</th>
              <th className="p-4 font-bold text-gray-700 w-1/2">例子</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 align-top text-lg">
                  <Latex>{row.condition}</Latex>
                </td>
                <td className="p-4 align-top text-lg">
                  <Latex>{row.action}</Latex>
                </td>
                <td className="p-4 align-top text-lg">
                  <Latex block>{row.example}</Latex>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Learning Page
const LearnPage = ({ setTab }) => {
  const steps = [
    { num: 1, title: '乘 (Multiply)', desc: '消去分母', formula: '\\frac{A}{B} = C \\rightarrow A = BC', detail: '若有分數，利用交叉相乘或兩邊同乘分母。' },
    { num: 2, title: '拆 (Expand)', desc: '拆括號', formula: 'A(x+B) = C \\rightarrow Ax + AB = C', detail: '若有括號，將外面的數乘入括號內每一項。' },
    { num: 3, title: '移 (Move)', desc: '移項', formula: 'Ax + B = C \\rightarrow Ax = C - B', detail: '將含有主項(Subject)的項移至一邊，其他移至另一邊。緊記「過界變號」。' },
    { num: 4, title: '抽 (Factor)', desc: '提取公因式', formula: 'Ax + Bx = C \\rightarrow x(A+B) = C', detail: '若主項在多於一項出現，將主項抽出來，使其只出現一次。' },
    { num: 5, title: '除 (Divide)', desc: '除係數', formula: 'Ax = B \\rightarrow x = \\frac{B}{A}', detail: '將主項旁邊的係數或括號除到對面，令主項單獨存在。' },
  ];

  const example1 = [
    { math: '\\text{令 } y \\text{ 成為公式 } k = \\frac{3x - y}{y} \\text{ 的主項}', action: '題目', explain: '目標：找 y = ?' },
    { math: 'ky = 3x - y', action: '乘', explain: 'Step 1: 兩邊同乘 y (消去分母)' },
    { math: 'ky + y = 3x', action: '移', explain: 'Step 3: 將所有含 y 的項移到左邊 (移項)' },
    { math: 'y(k + 1) = 3x', action: '抽', explain: 'Step 4: 提取公因式 y (Factorize)' },
    { math: 'y = \\frac{3x}{k + 1}', action: '除', explain: 'Step 5: 將 (k+1) 除到對面' }
  ];

  const example2 = [
    { math: '\\text{令 } h \\text{ 成為公式 } \\frac{5}{h+k} = \\frac{k}{h-3} \\text{ 的主項}', action: '題目', explain: '目標：找 h = ?' },
    { math: '5(h-3) = k(h+k)', action: '乘', explain: 'Step 1: 交叉相乘 (Cross Multiply)' },
    { math: '5h - 15 = kh + k^2', action: '拆', explain: 'Step 2: 拆括號 (Expand)' },
    { math: '5h - kh = k^2 + 15', action: '移', explain: 'Step 3: 將有 h 的項移一邊，其他移另一邊' },
    { math: 'h(5 - k) = k^2 + 15', action: '抽', explain: 'Step 4: 提取公因式 h' },
    { math: 'h = \\frac{k^2 + 15}{5 - k}', action: '除', explain: 'Step 5: 將 (5-k) 除到對面' }
  ];

  return (
    <div className="p-4 pb-20 max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-2xl text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">主項變換五步曲</h1>
        <p className="opacity-90 text-lg">口訣：乘、拆、移、抽、除</p>
        <button 
          onClick={() => setTab('practice')} 
          className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          立即實戰 <ArrowRight size={18} />
        </button>
      </div>

      {/* NOTES SECTION ADDED HERE */}
      <NotesSection />

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 px-2 border-l-4 border-blue-500">基本步驟 (The 5 Steps)</h2>
        <div className="grid gap-4">
          {steps.map((step) => (
            <div key={step.num} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex items-start gap-4">
              <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0 mt-1">
                {step.title[0]}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-800">{step.title}</h3>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Step {step.num}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{step.desc}</p>
                <div className="bg-gray-50 px-3 py-2 rounded border border-gray-100 text-sm overflow-x-auto">
                  <Latex>{step.formula}</Latex>
                </div>
                <p className="text-xs text-gray-400 mt-2">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 px-2 border-l-4 border-amber-500">實例示範 (Worked Examples)</h2>
        <p className="text-gray-500 text-sm px-2">點擊按鈕 <Lightbulb size={12} className="inline text-amber-500"/> 查看詳細解釋</p>
        
        <WorkedExample title="例題 1 (Example 1)" steps={example1} />
        <WorkedExample title="例題 2 (Example 2)" steps={example2} />
      </div>
    </div>
  );
};

// Practice Page
const PracticePage = ({ score, setScore }) => {
  const [problem, setProblem] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(1);
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);

  useEffect(() => {
    loadNewProblem();
  }, []);

  const loadNewProblem = () => {
    setProblem(generateProblem());
    setHistory([]);
    setCurrentQIndex(1);
    setInputVal("");
    setFeedback(null);
    setCompleted(false);
    setShowKeyboard(false);
    setScore(0);
    setIsAnswering(false);
  };

  const currentStepData = () => {
    if (!problem) return {};
    
    let stepData = {};
    switch (currentQIndex) {
      case 1: 
        stepData = { 
          q: "有分數嗎?", 
          affirmative: "有分數",
          check: problem.steps.hasFraction, 
          expected: problem.steps.step1Eq,
          hint: "請進行交叉相乘或去分母 (Multiply)"
        };
        break;
      case 2: 
        stepData = { 
          q: "有括號嗎?", 
          affirmative: "有括號",
          check: problem.steps.hasBracket, 
          expected: problem.steps.step2Eq,
          hint: "請拆括號 (Expand)"
        };
        break;
      case 3: 
        stepData = { 
          q: "需要移項嗎?", 
          affirmative: "需移項",
          check: problem.steps.hasMove, 
          expected: problem.steps.step3Eq,
          hint: `將主項 ${problem.subject} 移至一邊，其他移至另一邊`
        };
        break;
      case 4: 
        stepData = { 
          q: `有重複出現的主項 (${problem.subject}) 嗎?`, 
          affirmative: "有重複出現的主項",
          check: problem.steps.hasFactor, 
          expected: problem.steps.step4Eq,
          hint: problem.steps.factorType === 'numeric' 
            ? `合併同類項 (Combine like terms): 計算 ${problem.subject} 的係數` 
            : `提取公因式 ${problem.subject} (Factor out ${problem.subject})`
        };
        break;
      case 5: 
        stepData = { 
          q: `主項 (${problem.subject}) 旁邊有其他代數或數字嗎?`, 
          affirmative: `主項 (${problem.subject}) 旁邊有其他代數或數字`,
          check: problem.steps.hasDivide, 
          expected: problem.steps.step5Eq,
          hint: "除過對面 (Divide)"
        };
        break;
      default: 
        stepData = {};
    }
    
    // Debug log
    console.log(`Step ${currentQIndex}:`, stepData);
    
    return stepData;
  };

  const handleYesNo = (answer) => {
    // Prevent multiple rapid clicks
    if (isAnswering || feedback) return;
    setIsAnswering(true);
    
    const { check, expected } = currentStepData();
    const correct = (answer === (check ? 'yes' : 'no'));

    if (correct) {
      if (answer === 'yes') {
        setHistory(prev => [...prev, { step: currentQIndex, type: 'yesno', answer, correct: true, done: false }]);
        setShowKeyboard(true);
        setIsAnswering(false);
      } else {
        setHistory(prev => [...prev, { step: currentQIndex, type: 'yesno', answer, correct: true, done: true, equation: null }]); 
        setTimeout(() => {
          nextStep(expected);
          setIsAnswering(false);
        }, 500);
      }
    } else {
      if (check) {
        // User said No, but actually Yes
        let errorMsg = '不對，其實有！請填寫變換後的式子。';
        if (currentQIndex === 1) errorMsg = '錯，因為有分數，所以需要交叉相乘或去分母。';
        if (currentQIndex === 2) errorMsg = '錯，因為出現括號，所以需要展開。';
        if (currentQIndex === 3) errorMsg = '錯，其實需要移項。';
        if (currentQIndex === 4) errorMsg = '錯，其實有重複主項，需要提取公因式。';
        if (currentQIndex === 5) errorMsg = '錯，其實主項旁有其他代數或數字，需要除過對面。';

        setFeedback({ type: 'error', msg: errorMsg });
        setHistory(prev => [...prev, { step: currentQIndex, type: 'yesno', answer, correct: false, forced: true, done: false }]);
        
        // Clear feedback after showing error, then enable input
        setTimeout(() => {
          setFeedback(null);
          setShowKeyboard(true);
          setIsAnswering(false);
        }, 1500);
      } else {
        // User said Yes, but actually No
        setFeedback({ type: 'error', msg: '不對，其實沒有。直接下一步。' });
        setHistory(prev => [...prev, { step: currentQIndex, type: 'yesno', answer, correct: false, forced: true, done: true }]);
        setTimeout(() => {
            setFeedback(null);
            nextStep(expected);
            setIsAnswering(false);
        }, 1500);
      }
    }
  };

  const handleEquationSubmit = () => {
    const { expected } = currentStepData();
    const isCorrect = checkAnswer(inputVal, expected, problem, currentQIndex);

    if (isCorrect) {
      setFeedback({ type: 'success', msg: '正確！' });
      setScore(prev => prev + 1);
      setHistory(prev => {
        const newHist = [...prev];
        newHist[newHist.length - 1].done = true;
        newHist[newHist.length - 1].equation = inputVal;
        return newHist;
      });
      setTimeout(() => {
        setFeedback(null);
        setInputVal("");
        setShowKeyboard(false);
        nextStep(expected);
      }, 1000);
    } else {
      setFeedback({ type: 'error', msg: `錯誤。正確應為: ${expected}` });
      setHistory(prev => {
        const newHist = [...prev];
        newHist[newHist.length - 1].done = true;
        newHist[newHist.length - 1].equation = expected; 
        newHist[newHist.length - 1].wasWrong = true;
        return newHist;
      });
      setTimeout(() => {
        setFeedback(null);
        setInputVal("");
        setShowKeyboard(false);
        nextStep(expected);
      }, 2500);
    }
  };

  const nextStep = (prevEquationResult) => {
    if (currentQIndex < 5) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const getCurrentEquation = () => {
    const completedSteps = history.filter(h => h.done);
    if (completedSteps.length === 0) return problem.text;
    const lastHist = completedSteps[completedSteps.length - 1];
    if (lastHist.equation) return lastHist.equation;
    
    const getEqForStep = (idx) => {
        if (idx === 0) return problem.text;
        const map = [null, problem.steps.step1Eq, problem.steps.step2Eq, problem.steps.step3Eq, problem.steps.step4Eq, problem.steps.step5Eq];
        return map[idx] || map[idx-1]; 
    };
    return getEqForStep(currentQIndex - 1);
  };

  if (!problem) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6 sticky top-4 z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Question</span>
            <h2 className="text-gray-500 mt-1 text-lg">
              令 <Latex>{problem.subject}</Latex> 成為公式 <Latex>{problem.text}</Latex> 的主項
            </h2>
          </div>
          <button onClick={loadNewProblem} className="text-gray-400 hover:text-blue-600 transition-colors">
            <RefreshCw size={20} />
          </button>
        </div>
        <div className="text-3xl font-serif text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
           <Latex block>{getCurrentEquation()}</Latex>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {history.map((h, idx) => (
          <div key={idx} className={`p-4 rounded-xl border ${h.wasWrong || (h.type === 'yesno' && !h.correct && h.forced) ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'} animate-fade-in`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${h.wasWrong ? 'bg-red-500' : 'bg-green-500'}`}>
                {h.step}
              </div>
              <span className="font-bold text-gray-700">
                {h.step === 1 && "乘 (Multiply)"}
                {h.step === 2 && "拆 (Expand)"}
                {h.step === 3 && "移 (Move)"}
                {h.step === 4 && "抽 (Factor)"}
                {h.step === 5 && "除 (Divide)"}
              </span>
            </div>
            {h.equation && (
               <div className="pl-9 text-lg text-gray-800">
                 <Latex>{h.equation.includes('\\') ? h.equation : toLatex(h.equation)}</Latex>
               </div>
            )}
            {!h.equation && h.done && (
               <div className="pl-9 text-sm text-gray-500 italic">無此步驟 (Skipped)</div>
            )}
          </div>
        ))}
      </div>

      {!completed && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 animate-slide-up">
           <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
             <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">{currentQIndex}</span>
             {showKeyboard ? currentStepData().affirmative : currentStepData().q}
           </h3>

           {!showKeyboard ? (
             <div className="flex gap-4">
               <button 
                 onClick={() => handleYesNo('yes')}
                 disabled={isAnswering || feedback}
                 className={`flex-1 font-bold py-3 rounded-xl transition-all shadow-md ${
                   isAnswering || feedback 
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                     : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                 }`}
               >
                 有 (Yes)
               </button>
               <button 
                 onClick={() => handleYesNo('no')}
                 disabled={isAnswering || feedback}
                 className={`flex-1 font-bold py-3 rounded-xl transition-all shadow-md ${
                   isAnswering || feedback 
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                     : 'bg-gray-100 hover:bg-gray-200 text-gray-700 active:scale-95'
                 }`}
               >
                 沒有 (No)
               </button>
             </div>
           ) : (
             <div className="space-y-4">
               <div className="text-sm text-blue-600 font-medium bg-blue-50 p-2 rounded">
                 <Info size={16} className="inline mr-1"/>
                 提示: {currentStepData().hint}
               </div>
               
               <div className="w-full bg-gray-50 border-2 border-blue-200 rounded-xl p-4 min-h-[60px] flex items-center text-xl relative focus-within:ring-2 ring-blue-400">
                 {inputVal ? <Latex>{toLatex(inputVal)}</Latex> : <span className="text-gray-400">點擊下方鍵盤輸入...</span>}
                 <div className="absolute right-3 top-3 animate-pulse w-0.5 h-6 bg-blue-500"></div>
               </div>

               <button 
                 onClick={handleEquationSubmit}
                 disabled={feedback || isAnswering}
                 className={`w-full font-bold py-3 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2 ${
                   feedback || isAnswering
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     : 'bg-green-600 hover:bg-green-700 text-white'
                 }`}
               >
                 確認 (Check) <Check size={20}/>
               </button>

               <Keyboard onKeyPress={(key) => {
                   if (key === 'CLR') setInputVal("");
                   else if (key === 'DEL') setInputVal(prev => prev.slice(0, -1));
                   else setInputVal(prev => prev + key);
               }} problem={problem} currentEquation={getCurrentEquation()} />
             </div>
           )}

           {feedback && (
             <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${feedback.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
               {feedback.type === 'error' ? <X size={20}/> : <Check size={20}/>}
               {feedback.msg}
             </div>
           )}
        </div>
      )}

      {completed && (
        <div className="bg-green-50 p-8 rounded-2xl text-center border border-green-200 animate-scale-in">
          <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg">
            <Check />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">完成！(Completed)</h2>
          <p className="text-green-700 mb-6">答案是 (Answer):</p>
          <div className="text-2xl mb-8 p-4 bg-white rounded-xl inline-block shadow-sm">
             <Latex>{problem.steps.step5Eq}</Latex>
          </div>
          <br/>
          <button 
            onClick={loadNewProblem}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            下一題 (Next Question) <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP SHELL ---
const App = () => {
  const [tab, setTab] = useState('learn'); // 'learn' | 'practice'
  const [score, setScore] = useState(0);

  // Load KaTeX globally once on component mount
  useEffect(() => {
    loadKatexOnce();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <HomeIcon className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">返回主頁</span>
            </Link>
            <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
              <Calculator className="w-6 h-6" />
              <span>主項變換大師</span>
            </div>
            <div className="flex gap-2 items-center">
              <button 
                onClick={() => setTab('learn')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${tab === 'learn' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                學習 (Learn)
              </button>
              <button 
                onClick={() => setTab('practice')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${tab === 'practice' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                實戰 (Practice)
              </button>
              {tab === 'practice' && (
                <div className="bg-yellow-100 text-yellow-800 font-bold px-4 py-2 rounded-full text-sm">
                  分數: {score}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="p-4">
        {tab === 'learn' ? <LearnPage setTab={setTab} /> : <PracticePage score={score} setScore={setScore} />}
      </main>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-slide-up { animation: fade-in 0.5s ease-out forwards; }
        .animate-scale-in { animation: fade-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default App;
