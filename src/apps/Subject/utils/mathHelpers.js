/**
 * Math Helper Functions
 * 數學運算相關的工具函數
 */

/**
 * Input to LaTeX Converter
 * 將用戶輸入轉換為 LaTeX 格式
 */
export const toLatex = (input) => {
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

/**
 * Helper function to process fractions intelligently
 * 智能處理分數轉換
 */
export const processFraction = (expr) => {
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

/**
 * Simplify coefficient by subtraction
 * 簡化係數相減
 */
export const simplifyCoefficient = (n1, n2) => {
  const result = n1 - n2;
  return { original: `${n1}-${n2}`, simplified: result.toString(), value: result };
};

/**
 * Normalize math expression for comparison
 * 標準化數學表達式以進行比較
 */
export const normalizeMath = (str) => {
  if (!str) return "";
  return str.replace(/\s+/g, '')
            .replace(/\\cdot/g, '')
            .replace(/\\times/g, '')
            .replace(/\*/g, '');
};

/**
 * Sort terms in an expression to handle commutative property (a+b = b+a)
 * 排序表達式中的項以處理交換律
 */
export const sortTerms = (expr) => {
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

/**
 * Check if user's answer matches expected answer (visual comparison)
 * 檢查用戶答案是否匹配預期答案（視覺比較）
 * 
 * 支持多種等價形式:
 * - 項序不同: a+b = b+a
 * - 等式兩邊對調: x=a+b 等於 a+b=x
 * - 分數表達: a/b 等於 \frac{a}{b}
 * - 係數1省略: 1x 等於 x
 */
export const checkAnswer = (input, expected, problem = null, currentStep = null) => {
  if (!expected) return true;
  
  // Convert both to LaTeX for visual comparison
  const inputLatex = toLatex(input);
  const expectedLatex = toLatex(expected);
  
  /**
   * 標準化 LaTeX 表達式
   * 移除格式差異，保留數學結構
   */
  const normalizeLatex = (latex) => {
    let result = latex
      .replace(/\s+/g, '')
      .replace(/\\cdot/g, '')
      .replace(/\\times/g, '')
      .replace(/\*/g, '')
      .toLowerCase();
    
    // 處理 \frac{a}{b} 格式，轉換為統一的 (a)/(b) 格式
    result = result.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)');
    result = result.replace(/\\frac([^{])([^{])/g, '($1)/($2)');
    
    // 移除多餘的括號和空格
    result = result.replace(/[{}]/g, '');
    
    return result;
  };
  
  /**
   * 解析表達式為項的列表
   * 例: "2a-3b+c" → ["+2a", "-3b", "+c"]
   * 支持分數項: 保持 (...)/(...)格式完整
   */
  const parseTerms = (expr) => {
    const terms = [];
    let currentTerm = '';
    let currentSign = '+';
    let parenDepth = 0;
    
    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      
      // 追蹤括號深度
      if (char === '(') parenDepth++;
      if (char === ')') parenDepth--;
      
      // 只有在括號外才識別為項分隔符
      if ((char === '+' || char === '-') && i > 0 && parenDepth === 0 && currentTerm.length > 0) {
        // 確保完成分數項
        if (!currentTerm.includes('/') || currentTerm.split('/').length === 2) {
          terms.push(currentSign + normalizeCoeff(currentTerm));
          currentSign = char;
          currentTerm = '';
          continue;
        }
      }
      
      if (char === '+' && i === 0) {
        currentSign = '+';
      } else if (char === '-' && i === 0) {
        currentSign = '-';
      } else if (char !== '+' && char !== '-' || parenDepth > 0 || i === 0) {
        currentTerm += char;
      } else if (char === '-' || char === '+') {
        terms.push(currentSign + normalizeCoeff(currentTerm));
        currentSign = char;
        currentTerm = '';
      }
    }
    
    if (currentTerm) {
      terms.push(currentSign + normalizeCoeff(currentTerm));
    }
    
    return terms;
  };
  
  /**
   * 標準化係數
   * 1x → x, -1x → -x
   */
  const normalizeCoeff = (term) => {
    // 移除開頭的 1 係數（但保留 -1）
    let result = term.replace(/^1([a-z])/, '$1');
    // 處理 -1 係數
    result = result.replace(/^-1([a-z])/, '-$1');
    return result;
  };
  
  /**
   * 排序並連接項（處理交換律）
   */
  const sortAndJoinTerms = (expr) => {
    const terms = parseTerms(expr);
    // 對項進行排序（忽略符號）
    terms.sort((a, b) => {
      const aClean = a.replace(/^[+-]/, '');
      const bClean = b.replace(/^[+-]/, '');
      return aClean.localeCompare(bClean);
    });
    
    // 連接項，處理開頭的 +
    let result = terms.join('');
    if (result.startsWith('+')) result = result.slice(1);
    return result;
  };
  
  /**
   * 比較兩個表達式是否等價
   */
  const compareExpressions = (expr1, expr2) => {
    // 直接比較
    if (expr1 === expr2) return true;
    
    // 排序項後比較
    const sorted1 = sortAndJoinTerms(expr1);
    const sorted2 = sortAndJoinTerms(expr2);
    if (sorted1 === sorted2) return true;
    
    return false;
  };
  
  const normalizedInput = normalizeLatex(inputLatex);
  const normalizedExpected = normalizeLatex(expectedLatex);
  
  console.log('Input:', input, '→ LaTeX:', inputLatex, '→ Normalized:', normalizedInput);
  console.log('Expected:', expected, '→ LaTeX:', expectedLatex, '→ Normalized:', normalizedExpected);
  
  // 直接匹配
  if (normalizedInput === normalizedExpected) return true;
  
  // 檢查等式（有 = 的情況）
  if (normalizedInput.includes('=') && normalizedExpected.includes('=')) {
    const partsIn = normalizedInput.split('=');
    const partsEx = normalizedExpected.split('=');
    
    if (partsIn.length === 2 && partsEx.length === 2) {
      const [inLeft, inRight] = partsIn.map(p => p.trim());
      const [exLeft, exRight] = partsEx.map(p => p.trim());
      
      // 檢查兩種方向（正常和對調）
      const match1 = compareExpressions(inLeft, exLeft) && compareExpressions(inRight, exRight);
      const match2 = compareExpressions(inLeft, exRight) && compareExpressions(inRight, exLeft);
      
      console.log('Equation comparison:', {
        inLeft, inRight, exLeft, exRight,
        sortedInLeft: sortAndJoinTerms(inLeft),
        sortedInRight: sortAndJoinTerms(inRight),
        sortedExLeft: sortAndJoinTerms(exLeft),
        sortedExRight: sortAndJoinTerms(exRight),
        match1, match2
      });
      
      if (match1 || match2) {
        return true;
      }
    }
  }
  
  // 對非等式表達式進行項排序比較
  if (!normalizedInput.includes('=') && !normalizedExpected.includes('=')) {
    if (compareExpressions(normalizedInput, normalizedExpected)) {
      return true;
    }
  }
  
  return false;
};
