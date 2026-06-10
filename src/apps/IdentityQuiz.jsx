import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Lightbulb, Check, X, Trophy, GraduationCap, ArrowRight, Home as HomeIcon } from 'lucide-react';

// --- 動態載入 KaTeX 資源 (確保無外部依賴即可運作) ---
const loadKatexResources = () => {
  return new Promise((resolve, reject) => {
    if (window.katex) {
      resolve();
      return;
    }

    // 載入 CSS
    if (!document.getElementById('katex-css')) {
      const link = document.createElement('link');
      link.id = 'katex-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min.css';
      document.head.appendChild(link);
    }

    // 載入 JS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min.js';
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
};

// --- 自定義 LaTeX 元件 ---
const Latex = ({ math, block = false }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadKatexResources()
      .then(() => setIsLoaded(true))
      .catch(e => console.error("KaTeX 載入失敗:", e));
  }, []);

  useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        containerRef.current.innerHTML = '';
        window.katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
          output: 'html',
        });
      } catch (e) {
        console.error("KaTeX 渲染錯誤:", e);
        containerRef.current.innerText = math;
      }
    } else if (containerRef.current && !isLoaded) {
      // 載入中顯示純文字或簡單格式
      containerRef.current.innerText = math;
    }
  }, [math, block, isLoaded]);

  return <span ref={containerRef} className={block ? "block text-center my-2 katex-block" : "inline-block"} />;
};

// --- 輔助函數：將單個項除以常數 d (用於解決重複乘入公因數的 Bug) ---
const divideTerm = (termStr, d) => {
  if (d === 1) return termStr;
  const match = termStr.match(/^(\d*)(.*)$/);
  if (!match) return termStr;
  const coeff = match[1] === "" ? 1 : parseInt(match[1]);
  const vars = match[2];
  const newCoeff = coeff / d;
  if (newCoeff === 1 && vars !== "") return vars;
  return `${newCoeff}${vars}`;
};

// --- 輔助函數：將平方項或乘積項提取公因數 (修正字串縮減與 1 消失的 Bug) ---
const reduceTermWithFactor = (termStr, factor) => {
  if (factor === 1) return termStr;
  const match = termStr.match(/^(\d+)(.*)$/);
  if (match) {
    const newCoeff = parseInt(match[1]) / factor;
    if (newCoeff === 1) {
      return match[2] === "" ? "1" : match[2];
    }
    return `${newCoeff}${match[2]}`;
  }
  return termStr;
};

// --- 主應用程式 (App) ---
export default function App() {
  // 恆等式類型定義
  const IDENTITIES = {
    PLUS_SQ: 'plus_sq',
    MINUS_SQ: 'minus_sq',
    DIFF_SQ: 'diff_sq'
  };
  
  // 遊戲狀態
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('idle'); // idle, correct, wrong
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  
  const inputRef = useRef(null);

  // 提取題目中的變數
  const extractVariables = (questionText) => {
    if (!questionText) return ['x', 'y'];
    const matches = questionText.match(/[a-z]/g);
    if (!matches || matches.length === 0) return ['x', 'y'];
    const unique = [...new Set(matches)].sort();
    return unique.length >= 2 ? unique.slice(0, 2) : [unique[0], unique[0] === 'y' ? 'x' : 'y'];
  };

  // 用 useMemo 緩存變數
  const currentVariables = useMemo(() => {
    return currentQuestion ? extractVariables(currentQuestion.text) : ['x', 'y'];
  }, [currentQuestion]);

  // 生成隨機項
  const generateTerm = (allowVariable = true) => {
    const vars = ['x', 'y', 'a', 'b', 'm', 'n'];
    const isVar = allowVariable ? Math.random() > 0.4 : false;
    
    if (isVar) {
      const v = vars[Math.floor(Math.random() * vars.length)];
      const coeff = Math.floor(Math.random() * 8) + 1;
      return { str: coeff === 1 ? v : `${coeff}${v}`, val: { type: 'var', coeff, char: v } };
    } else {
      const num = Math.floor(Math.random() * 9) + 1;
      return { str: `${num}`, val: { type: 'num', val: num } };
    }
  };

  const getSquareStr = (term) => {
    if (term.val.type === 'num') {
      return (term.val.val * term.val.val).toString();
    } else {
      const cSq = term.val.coeff * term.val.coeff;
      return cSq === 1 ? `${term.val.char}^2` : `${cSq}${term.val.char}^2`;
    }
  };

  const get2ABStr = (termA, termB) => {
    let coeff = 2;
    let vars = '';
    
    if (termA.val.type === 'num') coeff *= termA.val.val;
    else {
      coeff *= termA.val.coeff;
      vars += termA.val.char;
    }

    if (termB.val.type === 'num') coeff *= termB.val.val;
    else {
      coeff *= termB.val.coeff;
      vars += termB.val.char;
    }

    vars = vars.split('').sort().join('');
    return `${coeff}${vars}`;
  };

  // 計算最大公因數
  const gcd = (a, b) => {
    return b === 0 ? a : gcd(b, a % b);
  };

  // 提取多個數的最大公因數
  const getCommonFactor = (coefficients) => {
    if (coefficients.length === 0) return 1;
    return coefficients.reduce((acc, val) => gcd(acc, Math.abs(val)));
  };

  // 從因式分解題目中提取公因數
  const extractCommonFactorForFactoring = (A2Str, _2ABStr, B2Str, identityType) => {
    const parseCoeff = (str) => {
      const match = str.match(/^(\d+)/);
      return match ? parseInt(match[1]) : 1;
    };

    const coeff1 = parseCoeff(A2Str);
    const coeff2 = parseCoeff(_2ABStr);
    const coeff3 = parseCoeff(B2Str);

    const commonFactor = getCommonFactor([coeff1, coeff2, coeff3]);

    if (commonFactor > 1) {
      const reduced1 = coeff1 / commonFactor;
      const reduced2 = coeff2 / commonFactor;
      const reduced3 = coeff3 / commonFactor;

      const reducedA2 = reduceTermWithFactor(A2Str, commonFactor);
      const reduced2AB = reduceTermWithFactor(_2ABStr, commonFactor);
      const reducedB2 = reduceTermWithFactor(B2Str, commonFactor);

      let middleSign = '+';
      if (identityType === IDENTITIES.MINUS_SQ) {
        middleSign = '-';
      }

      return {
        hasCommonFactor: true,
        factor: commonFactor,
        questionInside: `${reducedA2}${middleSign}${reduced2AB}+${reducedB2}`,
        coefficients: { reduced1, reduced2, reduced3 }
      };
    }

    return { hasCommonFactor: false, factor: 1 };
  };

  const generateQuestion = () => {
    let termA, termB;
    do {
      termA = generateTerm(true);
      termB = generateTerm(true);
    } while (
      (termA.val.type === 'num' && termB.val.type === 'num') || 
      (termA.val.type === 'var' && termB.val.type === 'var' && termA.val.char === termB.val.char)
    );

    const types = [IDENTITIES.PLUS_SQ, IDENTITIES.MINUS_SQ, IDENTITIES.DIFF_SQ];
    const type = types[Math.floor(Math.random() * types.length)];

    let mode = 'expand';
    if (level === 2) mode = 'factor';
    if (level === 3) mode = Math.random() > 0.5 ? 'expand' : 'factor';

    let questionText = '';
    let validAnswers = [];
    let hintText = '';

    const A = termA.str;
    const B = termB.str;
    const A2 = getSquareStr(termA);
    const B2 = getSquareStr(termB);
    const _2AB = get2ABStr(termA, termB);

    let diffSqCommonFactor = 1;

    if (type === IDENTITIES.PLUS_SQ) {
      hintText = `(a + b)^2 = a^2 + 2ab + b^2`;
      if (mode === 'expand') {
        questionText = `(${A}+${B})^2`;
        const baseAnswer = `${A2}+${_2AB}+${B2}`;
        validAnswers = [baseAnswer, `(${baseAnswer})`];
      } else {
        const factorInfo = extractCommonFactorForFactoring(A2, _2AB, B2, type);
        if (factorInfo.hasCommonFactor) {
          const d = Math.sqrt(factorInfo.factor);
          const redA = divideTerm(A, d);
          const redB = divideTerm(B, d);
          questionText = `${factorInfo.factor}(${factorInfo.questionInside})`;
          
          validAnswers = [
            `${factorInfo.factor}(${redA}+${redB})^2`, 
            `${factorInfo.factor}(${redB}+${redA})^2`, 
            `(${A}+${B})^2`, 
            `(${B}+${A})^2`,
            `${factorInfo.factor}(${redA}+${redB})(${redA}+${redB})`,
            `${factorInfo.factor}(${redB}+${redA})(${redB}+${redA})`,
            `(${A}+${B})(${A}+${B})`,
            `(${B}+${A})(${B}+${A})`
          ];
        } else {
          questionText = `${A2}+${_2AB}+${B2}`;
          validAnswers = [`(${A}+${B})^2`, `(${B}+${A})^2`, `(${A}+${B})(${A}+${B})`, `(${B}+${A})(${B}+${A})`];
        }
      }
    } else if (type === IDENTITIES.MINUS_SQ) {
      hintText = `(a - b)^2 = a^2 - 2ab + b^2`;
      if (mode === 'expand') {
        questionText = `(${A}-${B})^2`;
        const baseAnswer = `${A2}-${_2AB}+${B2}`;
        validAnswers = [baseAnswer, `(${baseAnswer})`];
      } else {
        const factorInfo = extractCommonFactorForFactoring(A2, _2AB, B2, type);
        if (factorInfo.hasCommonFactor) {
          const d = Math.sqrt(factorInfo.factor);
          const redA = divideTerm(A, d);
          const redB = divideTerm(B, d);
          questionText = `${factorInfo.factor}(${factorInfo.questionInside})`;
          
          validAnswers = [
            `${factorInfo.factor}(${redA}-${redB})^2`, 
            `${factorInfo.factor}(${redB}-${redA})^2`, 
            `(${A}-${B})^2`,
            `(${B}-${A})^2`,
            `${factorInfo.factor}(${redA}-${redB})(${redA}-${redB})`,
            `${factorInfo.factor}(${redB}-${redA})(${redB}-${redA})`,
            `(${A}-${B})(${A}-${B})`,
            `(${B}-${A})(${B}-${A})`
          ];
        } else {
          questionText = `${A2}-${_2AB}+${B2}`;
          validAnswers = [
            `(${A}-${B})^2`, 
            `(${B}-${A})^2`, 
            `(${A}-${B})(${A}-${B})`,
            `(${B}-${A})(${B}-${A})`
          ];
        }
      }
    } else {
      hintText = `(a + b)(a - b) = a^2 - b^2`;
      if (mode === 'expand') {
        questionText = Math.random() > 0.5 ? `(${A}+${B})(${A}-${B})` : `(${A}-${B})(${A}+${B})`;
        const baseAnswer = `${A2}-${B2}`;
        validAnswers = [baseAnswer, `(${baseAnswer})`];
      } else {
        const coeffA2 = A2.match(/^(\d+)/) ? parseInt(A2.match(/^(\d+)/)[1]) : 1;
        const coeffB2 = B2.match(/^(\d+)/) ? parseInt(B2.match(/^(\d+)/)[1]) : 1;
        const commonFactor = getCommonFactor([coeffA2, coeffB2]);

        let questionText_DIFF_SQ, validAnswers_DIFF_SQ;
        if (commonFactor > 1) {
          const reducedA2 = reduceTermWithFactor(A2, commonFactor);
          const reducedB2 = reduceTermWithFactor(B2, commonFactor);
          
          questionText_DIFF_SQ = `${commonFactor}(${reducedA2}-${reducedB2})`;
          
          const d = Math.sqrt(commonFactor);
          const redA = divideTerm(A, d);
          const redB = divideTerm(B, d);

          validAnswers_DIFF_SQ = [
            `${commonFactor}(${redA}+${redB})(${redA}-${redB})`, 
            `${commonFactor}(${redA}-${redB})(${redA}+${redB})`, 
            `${commonFactor}(${redB}+${redA})(${redA}-${redB})`, 
            `${commonFactor}(${redA}-${redB})(${redB}+${redA})`,
            `${commonFactor}(${redA}+${redB})(-${redB}+${redA})`,
            `${commonFactor}(-${redB}+${redA})(${redA}+${redB})`,
            `${commonFactor}(${redB}+${redA})(-${redB}+${redA})`,
            `${commonFactor}(-${redB}+${redA})(${redB}+${redA})`,
            `(${A}+${B})(${A}-${B})`,
            `(${A}-${B})(${A}+${B})`,
            `(${B}+${A})(${A}-${B})`,
            `(${A}-${B})(${B}+${A})`,
            `(${A}+${B})(-${B}+${A})`,
            `(-${B}+${A})(${A}+${B})`,
            `(${B}+${A})(-${B}+${A})`,
            `(-${B}+${A})(${B}+${A})`
          ];
          diffSqCommonFactor = commonFactor;
        } else {
          questionText_DIFF_SQ = `${A2}-${B2}`;
          validAnswers_DIFF_SQ = [
            `(${A}+${B})(${A}-${B})`, 
            `(${A}-${B})(${A}+${B})`, 
            `(${B}+${A})(${A}-${B})`, 
            `(${A}-${B})(${B}+${A})`,
            `(${A}+${B})(-${B}+${A})`, 
            `(-${B}+${A})(${A}+${B})`, 
            `(${B}+${A})(-${B}+${A})`, 
            `(-${B}+${A})(${B}+${A})` 
          ];
        }
        questionText = questionText_DIFF_SQ;
        validAnswers = validAnswers_DIFF_SQ;
      }
    }

    let factoringCommonInfo = { hasCommonFactor: false, factor: 1, insideExpression: '' };
    
    if (mode === 'factor' && type !== IDENTITIES.DIFF_SQ) {
      factoringCommonInfo = extractCommonFactorForFactoring(A2, _2AB, B2, type);
    } else if (mode === 'factor' && type === IDENTITIES.DIFF_SQ) {
      factoringCommonInfo = { 
        hasCommonFactor: diffSqCommonFactor > 1, 
        factor: diffSqCommonFactor 
      };
    }

    return {
      id: Date.now(),
      text: questionText,
      answers: validAnswers,
      hint: hintText,
      mode: mode === 'expand' ? '展開 (Expand)' : '因式分解 (Factorize)',
      identityType: type,
      A_str: A, 
      B_str: B,
      A2_str: A2,
      B2_str: B2,
      _2AB_str: _2AB,
      factoringCommonFactor: factoringCommonInfo.factor,
      hasFactoringCommonFactor: factoringCommonInfo.hasCommonFactor
    };
  };

  const getSolutionSteps = (q) => {
    if (!q || !q.A_str) return [];
    
    const A = q.A_str;
    const B = q.B_str;
    const identityType = q.identityType; 
    const finalAnswer = q.answers[0];
    const isExpand = q.mode.startsWith('展開');

    const parseLeadingCoeff = (termStr) => {
      const match = String(termStr).match(/^(\d+)/);
      return match ? parseInt(match[1], 10) : 1;
    };
    
    let steps = [{ label: '題目', math: q.text }];

    if (isExpand) {
      if (identityType === IDENTITIES.DIFF_SQ) {
        const step1_math = `(${A})^2 - (${B})^2`;
        const step1_label = '套用 (a+b)(a-b) = a^2 - b^2';
        
        steps.push({ label: step1_label, math: step1_math });
        steps.push({ label: '最終答案 (展開)', math: finalAnswer }); 
      } else {
        const sign = identityType === IDENTITIES.PLUS_SQ ? '+' : '-';
        const middleTermSign = sign;
        
        const step1_math = `(${A})^2 ${middleTermSign} 2(${A})(${B}) + (${B})^2`;
        const step1_label = `套用 (a${sign}b)^2 = a^2 ${middleTermSign} 2ab + b^2`;
        
        steps.push({ label: step1_label, math: step1_math });
        steps.push({ label: '最終答案 (展開)', math: finalAnswer }); 
      }
    } else {
      const hasCF = q.hasFactoringCommonFactor;
      const cf = q.factoringCommonFactor;
      const d = Math.sqrt(cf);

      if (identityType === IDENTITIES.DIFF_SQ) {
        if (hasCF && cf > 1) {
          const redA = divideTerm(A, d);
          const redB = divideTerm(B, d);
          const reducedA2 = reduceTermWithFactor(q.A2_str, cf);
          const reducedB2 = reduceTermWithFactor(q.B2_str, cf);
          const innerCF = getCommonFactor([
            parseLeadingCoeff(reducedA2),
            parseLeadingCoeff(reducedB2),
          ]);

          if (innerCF > 1) {
            steps.push({ label: '提取公因數', math: `${cf}(${reducedA2} - ${reducedB2})` });
          }
          steps.push({ label: '識別 a^2 - b^2 結構', math: `${cf}[(${redA})^2 - (${redB})^2]` });
          steps.push({ label: '最終答案 (因式分解)', math: finalAnswer });
        } else {
          const step1_math = `(${A})^2 - (${B})^2`;
          const step1_label = '識別 a^2 - b^2 結構';
          steps.push({ label: step1_label, math: step1_math });
          steps.push({ label: '最終答案 (因式分解)', math: finalAnswer }); 
        }
      } else {
        const middleTermSign = identityType === IDENTITIES.PLUS_SQ ? '+' : '-';
        
        if (hasCF && cf > 1) {
          const redA = divideTerm(A, d);
          const redB = divideTerm(B, d);
          const reducedA2 = reduceTermWithFactor(q.A2_str, cf);
          const reduced2AB = reduceTermWithFactor(q._2AB_str, cf);
          const reducedB2 = reduceTermWithFactor(q.B2_str, cf);
          const innerCF = getCommonFactor([
            parseLeadingCoeff(reducedA2),
            parseLeadingCoeff(reduced2AB),
            parseLeadingCoeff(reducedB2),
          ]);

          if (innerCF > 1) {
            steps.push({ label: '提取公因數', math: `${cf}(${reducedA2} ${middleTermSign} ${reduced2AB} + ${reducedB2})` });
          }
          steps.push({ label: `識別括號內 a^2 ${middleTermSign} 2ab + b^2 結構`, math: `${cf}[(${redA})^2 ${middleTermSign} 2(${redA})(${redB}) + (${redB})^2]` });
          steps.push({ label: '最終答案 (因式分解)', math: finalAnswer });
        } else {
          const step1_math = `(${A})^2 ${middleTermSign} 2(${A})(${B}) + (${B})^2`;
          const step1_label = `識別 a^2 ${middleTermSign} 2ab + b^2 結構`;
          steps.push({ label: step1_label, math: step1_math });
          steps.push({ label: '最終答案 (因式分解)', math: finalAnswer }); 
        }
      }
    }
    
    return steps;
  };

  useEffect(() => {
    nextQuestion();
  }, [level]);

  const nextQuestion = () => {
    const q = generateQuestion();
    setCurrentQuestion(q);
    setUserAnswer('');
    setFeedback('idle');
    setShowHint(false);
    setTimeout(() => {
      if(inputRef.current) inputRef.current.focus();
    }, 50);
  };

  const normalize = (str) => {
    let cleaned = str
      .replace(/\s+/g, '')
      .replace(/\^/g, '^')
      .toLowerCase();
    
    while (cleaned.startsWith('(') && cleaned.endsWith(')')) {
      let depth = 0;
      let isComplete = true;
      for (let i = 0; i < cleaned.length - 1; i++) {
        if (cleaned[i] === '(') depth++;
        if (cleaned[i] === ')') depth--;
        if (depth === 0) {
          isComplete = false;
          break;
        }
      }
      if (isComplete) {
        cleaned = cleaned.slice(1, -1);
      } else {
        break;
      }
    }
    
    return cleaned;
  };
  
  const normalizeTerm = (term) => {
    const match = term.match(/^([+-]?)(\d*)(.*)$/);
    if (!match) return term;
    
    let [, sign, coeff, rest] = match;

    // 修復隱式係數 1 問題：當使用者輸入 '1xy' 時，自動轉化為 'xy'
    if (coeff === "1" && rest !== "") {
      coeff = "";
    }

    const chars = [];
    let i = 0;
    while (i < rest.length) {
      if (i + 1 < rest.length && rest[i + 1] === '^') {
        const expEnd = i + 2 < rest.length && /\d/.test(rest[i + 2]) ? i + 3 : i + 2;
        chars.push(rest.slice(i, expEnd));
        i = expEnd;
      } else if (rest[i] !== '^' && /[a-z]/i.test(rest[i])) {
        chars.push(rest[i]);
        i++;
      } else {
        i++;
      }
    }
    
    const sortedVars = chars.sort().join('');
    return `${sign}${coeff}${sortedVars}`;
  };
  
  const getTerms = (polynomial) => {
    const normalized = polynomial.replace(/\s+/g, '').toLowerCase();
    const polyWithSign = normalized.startsWith('-') ? normalized : '+' + normalized;
    const terms = polyWithSign.match(/[+-][\dA-Za-z\^]+/g) || [];
    return terms.map(normalizeTerm).sort();
  };

  const checkAnswer = (e) => {
    if (e) e.preventDefault();
    if (!currentQuestion) return;

    // 如果已經在展示答案狀態，按 Enter 鍵時自動進入下一題
    if (feedback !== 'idle') {
      nextQuestion();
      return;
    }

    if (!userAnswer) return;

    const userClean = normalize(userAnswer);
    const isDirectMatch = currentQuestion.answers.some(ans => normalize(ans) === userClean);
    
    let isPermutationMatch = false;

    if (!isDirectMatch && currentQuestion.mode.startsWith('展開')) {
      const canonicalAnswer = currentQuestion.answers[0];
      try {
        const correctTerms = getTerms(canonicalAnswer);
        const userTerms = getTerms(userAnswer);
        
        if (correctTerms.length === userTerms.length) {
          isPermutationMatch = correctTerms.every((term, index) => term === userTerms[index]);
        }
      } catch (error) {
        console.error("排列檢查出錯:", error);
        isPermutationMatch = false;
      }
    }

    const isCorrect = isDirectMatch || isPermutationMatch;

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else {
      setFeedback('wrong');
      setStreak(0);
    }
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    setScore(0);
    setStreak(0);
  };

  const insertAtCursor = (textToInsert) => {
    const input = inputRef.current;
    if (!input) return;
  
    const startPos = input.selectionStart;
    const endPos = input.selectionEnd;
    const currentValue = input.value;
  
    const cursorOffset = textToInsert.length;
    const newValue = currentValue.substring(0, startPos) + textToInsert + currentValue.substring(endPos);
    setUserAnswer(newValue);
  
    setTimeout(() => {
      input.focus();
      const newCursorPos = startPos + cursorOffset;
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const getFeedbackIcon = () => {
    if (feedback === 'correct') return <Check className="w-12 h-12 text-green-500 drop-shadow-sm" />;
    if (feedback === 'wrong') return <X className="w-12 h-12 text-red-500 drop-shadow-sm" />;
    return null;
  };

  const getLevelButtonClass = (btnLevel, activeColorBg, activeColorText) => {
    const isActive = level === btnLevel;
    const baseClass = "px-4 py-2 rounded-full font-bold transition-all duration-200 shadow-sm border-2 text-xs md:text-sm";
    if (isActive) {
      const textClass = activeColorBg.includes('yellow') ? 'text-slate-900' : activeColorText;
      return `${baseClass} ${activeColorBg} ${textClass} border-transparent scale-105 shadow-md`;
    }
    return `${baseClass} bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50`;
  };

  const solutionSteps = feedback === 'wrong' ? getSolutionSteps(currentQuestion) : [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start p-4 font-sans select-none">
      
      {/* 頂部裝飾列 */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md overflow-hidden mb-4 border border-slate-100 mt-2">
        <div className="bg-white p-4 md:p-6 flex flex-wrap justify-between items-center gap-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <GraduationCap className="text-indigo-600 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">代數恆等式特訓</h1>
              <p className="text-xs text-slate-400 mt-0.5">強化乘法公式與因式分解的直覺反應</p>
            </div>
          </div>
          <div className="flex gap-1.5 md:gap-2">
            <button
              onClick={() => handleLevelChange(1)}
              className={getLevelButtonClass(1, 'bg-green-500', 'text-white')}
            >
              Lv 1 展開
            </button>
            <button
              onClick={() => handleLevelChange(2)}
              className={getLevelButtonClass(2, 'bg-yellow-400', 'text-slate-900')}
            >
              Lv 2 因式分解
            </button>
            <button
              onClick={() => handleLevelChange(3)}
              className={getLevelButtonClass(3, 'bg-red-500', 'text-white')}
            >
              Lv 3 混合
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-slate-50/50 px-6">
          <div className="flex items-center gap-2 text-slate-700">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-lg">分數: <span className="text-indigo-600">{score}</span></span>
          </div>
          <div className="text-sm text-slate-500 font-medium">
             連續答對: <span className="text-indigo-500 font-extrabold ml-1 text-lg">{streak}</span> 🔥
          </div>
        </div>
      </div>

      {/* 主作答卡片 */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden p-6 md:p-8 relative flex flex-col items-center text-center">
        
        {/* 當前模式標籤 */}
        <div className="mb-4">
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
            currentQuestion?.mode.startsWith('展開')
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {currentQuestion ? currentQuestion.mode : '...'}
          </span>
        </div>

        {/* 題目 LaTeX 渲染區 */}
        <div className="mb-6 w-full flex justify-center items-center min-h-[110px] bg-gradient-to-r from-slate-50 to-indigo-50/30 rounded-xl p-4 border border-slate-100">
          {currentQuestion ? (
            <div className="text-2xl md:text-4xl text-slate-800 font-bold tracking-tight flex items-center flex-wrap justify-center gap-2">
              <Latex math={currentQuestion.text} block={true} />
              <span className="text-slate-400 mx-2">=</span>
              <span className="w-12 h-10 border-b-4 border-dashed border-indigo-400 inline-block shrink-0"></span>
            </div>
          ) : (
            <span className="text-slate-400 text-lg animate-pulse">正在產生挑戰題...</span>
          )}
        </div>

        {/* 輸入與虛擬鍵盤 */}
        <div className="w-full max-w-lg flex flex-col items-center z-10">
          
          <form onSubmit={checkAnswer} className="w-full flex items-stretch gap-2 mb-3">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={feedback !== 'idle'}
              placeholder="在此輸入答案..."
              className={`w-full h-12 bg-slate-50 border-2 px-4 text-center text-xl md:text-2xl text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none transition-all font-mono shadow-inner
                ${feedback === 'correct' ? 'border-green-400 bg-green-50/60 text-green-700' : 
                  feedback === 'wrong' ? 'border-red-400 bg-red-50/60 text-red-700' : 'border-slate-200 focus:border-indigo-400 focus:bg-white focus:shadow-md'}`}
              autoComplete="off"
              spellCheck="false"
            />
            <div>
              {feedback === 'idle' ? (
                <button
                  type="submit"
                  disabled={!userAnswer}
                  className="h-12 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-200 text-white rounded-lg px-5 transition shadow-md disabled:shadow-none text-base font-bold whitespace-nowrap"
                >
                  提交
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextQuestion}
                  className="h-12 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-5 shadow-md text-base font-bold whitespace-nowrap"
                >
                  下一題
                </button>
              )}
            </div>
          </form>

          {/* 實時預覽框 */}
          <div className={`w-full min-h-[48px] flex justify-center items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 text-lg md:text-xl transition-all duration-200 mb-3 ${userAnswer ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {userAnswer && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-full">
                <span className="text-xs text-indigo-500 font-bold uppercase tracking-wider shrink-0">數式預覽:</span>
                <Latex math={userAnswer} />
              </div>
            )}
          </div>

          {/* 輔助鍵盤 */}
          {/* 第 1 行：( ) ^2 + */}
          <div className="w-full grid grid-cols-4 gap-1.5 mt-1">
            <button type="button" onClick={() => insertAtCursor('(')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              (
            </button>
            <button type="button" onClick={() => insertAtCursor(')')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              )
            </button>
            <button type="button" onClick={() => insertAtCursor('^2')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50 flex items-center justify-center">
              <Latex math="^{2}" />
            </button>
            <button type="button" onClick={() => insertAtCursor('+')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              +
            </button>
          </div>

          {/* 第 2 行：7 8 9 - */}
          <div className="w-full grid grid-cols-4 gap-1.5 mt-1.5">
            <button type="button" onClick={() => insertAtCursor('7')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              7
            </button>
            <button type="button" onClick={() => insertAtCursor('8')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              8
            </button>
            <button type="button" onClick={() => insertAtCursor('9')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              9
            </button>
            <button type="button" onClick={() => insertAtCursor('-')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              −
            </button>
          </div>

          {/* 第 3 行：4 5 6 × */}
          <div className="w-full grid grid-cols-4 gap-1.5 mt-1.5">
            <button type="button" onClick={() => insertAtCursor('4')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              4
            </button>
            <button type="button" onClick={() => insertAtCursor('5')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              5
            </button>
            <button type="button" onClick={() => insertAtCursor('6')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              6
            </button>
            <button type="button" onClick={() => insertAtCursor('*')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              ×
            </button>
          </div>

          {/* 第 4 行：1 2 3 ÷ */}
          <div className="w-full grid grid-cols-4 gap-1.5 mt-1.5">
            <button type="button" onClick={() => insertAtCursor('1')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              1
            </button>
            <button type="button" onClick={() => insertAtCursor('2')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              2
            </button>
            <button type="button" onClick={() => insertAtCursor('3')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              3
            </button>
            <button type="button" onClick={() => insertAtCursor('/')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              ÷
            </button>
          </div>

          {/* 第 5 行：0 x y ← 刪除 */}
          <div className="w-full grid grid-cols-4 gap-1.5 mt-1.5">
            <button type="button" onClick={() => insertAtCursor('0')} disabled={feedback !== 'idle'} className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-sans text-lg py-3 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50">
              0
            </button>
            <button
              type="button"
              onClick={() => insertAtCursor(currentVariables[0])}
              disabled={feedback !== 'idle'}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-lg py-3 rounded-lg transition active:scale-95 disabled:opacity-50 border border-blue-150 shadow-sm"
            >
              {currentVariables[0]}
            </button>
            <button
              type="button"
              onClick={() => insertAtCursor(currentVariables[1])}
              disabled={feedback !== 'idle'}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-lg py-3 rounded-lg transition active:scale-95 disabled:opacity-50 border border-blue-150 shadow-sm"
            >
              {currentVariables[1]}
            </button>
            <button
              type="button"
              onClick={() => {
                const cursorPos = inputRef.current?.selectionStart || userAnswer.length;
                if (cursorPos > 0) {
                  const textBeforeCursor = userAnswer.slice(0, cursorPos);
                  let deleteCount = 1;
                  
                  if (textBeforeCursor.endsWith('^2') || textBeforeCursor.endsWith('^3')) {
                    deleteCount = 2; // 連同 ^ 一起刪除
                  }
                  
                  setUserAnswer(prev => prev.slice(0, cursorPos - deleteCount) + prev.slice(cursorPos));
                  setTimeout(() => {
                    const newPos = cursorPos - deleteCount;
                    inputRef.current?.setSelectionRange(newPos, newPos);
                    inputRef.current?.focus();
                  }, 0);
                }
              }}
              disabled={feedback !== 'idle' || !userAnswer}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold py-3 rounded-lg transition active:scale-95 disabled:opacity-50 flex items-center justify-center border border-amber-200 text-sm shadow-sm"
            >
              ← 刪除
            </button>
          </div>

          {/* 提示與反饋區 */}
          <div className="mt-4 flex flex-col items-center justify-center w-full min-h-[90px]">
            
            {feedback === 'idle' && (
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition shadow-sm border border-indigo-150"
              >
                <Lightbulb size={16} className={showHint ? 'fill-indigo-500 text-indigo-500' : ''} />
                {showHint ? '隱藏公式提示' : '顯示公式提示'}
              </button>
            )}

            {showHint && feedback === 'idle' && (
              <div className="mt-3 text-slate-700 text-base md:text-lg bg-amber-50 px-5 py-2.5 rounded-xl border border-amber-200 shadow-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <Lightbulb size={18} className="text-amber-500 shrink-0"/>
                <span className="font-semibold text-slate-500 mr-1">提示：</span>
                <Latex math={currentQuestion?.hint} />
              </div>
            )}

            {feedback !== 'idle' && (
              <div className="flex flex-col items-center w-full animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 mb-3">
                  {getFeedbackIcon()}
                  <span className={`text-2xl md:text-3xl font-extrabold tracking-tight ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback === 'correct' ? '太棒了，答對了！' : '再試一次，加油！'}
                  </span>
                </div>
                
                {feedback === 'wrong' && (
                  <div className="bg-red-50/50 p-4 rounded-xl border border-red-100 text-center w-full max-w-md mt-1 shadow-sm">
                    <h3 className="text-red-700 font-extrabold mb-3 text-base md:text-lg flex items-center justify-center gap-1.5">
                      <span>💡 步驟解說</span>
                    </h3>
                    <div className="space-y-2 text-left">
                      {solutionSteps.map((step, index) => (
                        <div key={index} className="flex flex-col items-start p-2.5 bg-white rounded-lg border border-slate-100 shadow-sm">
                          <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${
                            index === 0
                              ? 'text-slate-400'
                              : index === solutionSteps.length - 1
                                ? 'text-green-600 font-black'
                                : 'text-indigo-500'
                          }`}>
                            {step.label}:
                          </span>
                          <div className="w-full text-base md:text-lg font-mono mt-0.5 text-slate-800">
                            <Latex math={step.math} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-slate-400 text-xs md:text-sm mt-3 font-semibold bg-slate-100/70 px-4 py-1.5 rounded-full">
                  按右側 <span className="text-indigo-600 font-bold">下一題</span> 或 實體鍵盤 <span className="text-indigo-600 font-bold">Enter</span> 鍵繼續
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="max-w-2xl w-full mt-4 text-slate-400 text-xs text-center leading-relaxed">
        <p>💡 提示：使用上方鍵盤可快速輸入。物理鍵盤亦可直接作答，使用 `^` 表示次方，如 `(2a-3)^2` 或 `x^2+4x+4`。</p>
      </div>

    </div>
  );
}