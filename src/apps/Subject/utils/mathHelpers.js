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
 */
export const checkAnswer = (input, expected, problem = null, currentStep = null) => {
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
  
  // Sort terms in an expression to handle commutative property (a+b = b+a)
  const sortTermsInExpr = (expr) => {
    // Split by + and - while keeping operators
    const terms = [];
    let currentTerm = '';
    let currentSign = '+';
    
    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      if ((char === '+' || char === '-') && i > 0 && currentTerm) {
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
    
    // Sort terms alphabetically
    return terms.sort().join('').replace(/^\+/, '');
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
