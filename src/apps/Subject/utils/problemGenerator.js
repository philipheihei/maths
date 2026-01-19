import { simplifyCoefficient } from './mathHelpers';

/**
 * Problem Generator
 * 生成隨機數學問題的函數
 */

/**
 * Generate a random problem for practice
 * 生成一個隨機練習題
 */
export const generateProblem = () => {
  const types = ['fraction_simple', 'cross_mult', 'bracket_simple', 'factor_simple']; 
  const type = types[Math.floor(Math.random() * types.length)];
  
  const vars = ['x', 'y', 'a', 'b', 'h', 'k', 'm', 'n'];
  const getVar = (exclude = []) => {
    const available = vars.filter(v => !exclude.includes(v));
    return available[Math.floor(Math.random() * available.length)];
  };
  
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  let problem = {
    id: Date.now(),
    text: "", 
    subject: "",
    allVariables: [], // 顯式追蹤所有變數
    steps: {
      hasFraction: false, step1Eq: null,
      hasBracket: false, step2Eq: null,
      hasMove: true, step3Eq: null,
      hasFactor: false, step4Eq: null,
      factorType: null, // 'numeric' (可化簡) 或 'algebraic' (只可抽)
      hasDivide: false, step5Eq: null,
    }
  };

  const s = getVar(); 
  const a = getVar([s]); 
  const b = getVar([s, a]); 
  const n1 = randInt(2, 9);
  const n2 = randInt(2, 9);

  // TYPE 1: Simple Fraction: (n1*s + a)/n2 = b
  // 例: (3x + a)/5 = b
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
  // TYPE 2: Cross Multiply: n1/(s+a) = C/b
  // 例: 5/(x+a) = k/b
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
  // TYPE 3: Brackets with numeric coefficients: n1(s + a) = n2*s + b
  // 例: 5(x + a) = 3x + b
  // 兩個主項系數都是數字 → 可以合併化簡
  else if (type === 'bracket_simple') {
    problem.text = `${n1}(${s} + ${a}) = ${n2}${s} + ${b}`;
    problem.subject = s;
    problem.allVariables = [s, a, b];
    problem.steps.hasFraction = false;
    problem.steps.step1Eq = problem.text;
    problem.steps.hasBracket = true;
    problem.steps.step2Eq = `${n1}${s}+${n1}${a}=${n2}${s}+${b}`;
    problem.steps.hasMove = true;
    // Step3: 移項後有2個主項 (n1*s 和 n2*s)
    problem.steps.step3Eq = `${n1}${s}-${n2}${s}=${b}-${n1}${a}`;
    
    // 兩個係數都是數字 → 需要「抽」步驟來合併同類項
    const coeffDiff = n1 - n2;
    problem.steps.hasFactor = true;
    problem.steps.factorType = 'numeric'; // 數字係數可以直接計算
    
    // Step4: 合併同類項後的結果
    if (coeffDiff === 1) {
      problem.steps.step4Eq = `${s}=${b}-${n1}${a}`;
    } else if (coeffDiff === -1) {
      problem.steps.step4Eq = `-${s}=${b}-${n1}${a}`;
    } else {
      problem.steps.step4Eq = `${coeffDiff}${s}=${b}-${n1}${a}`;
    }
    
    // Step5: 最終答案
    problem.steps.hasDivide = (Math.abs(coeffDiff) !== 1);
    if (coeffDiff === 1) {
      problem.steps.step5Eq = `${s}=${b}-${n1}${a}`;
    } else if (coeffDiff === -1) {
      problem.steps.step5Eq = `${s}=${n1}${a}-${b}`;
    } else {
      problem.steps.step5Eq = `${s}=\\frac{${b}-${n1}${a}}{${coeffDiff}}`;
    }
  }
  // TYPE 4: Algebraic Factorization: a*s - b = n1*s
  // 例: a*x - b = 5x
  // 其中一個主項系數是代數 → 只可以抽公因式，不可以化簡
  else if (type === 'factor_simple') {
    problem.text = `${a}${s} - ${b} = ${n1}${s}`;
    problem.subject = s;
    problem.allVariables = [s, a, b];
    problem.steps.hasFraction = false;
    problem.steps.step1Eq = problem.text;
    problem.steps.hasBracket = false;
    problem.steps.step2Eq = problem.text;
    problem.steps.hasMove = true;
    // Step3: 移項後有2個主項 (a*s 和 n1*s)
    problem.steps.step3Eq = `${a}${s}-${n1}${s}=${b}`;
    
    // 其中一個係數是代數(a) → 只可以因式分解抽公因式
    problem.steps.hasFactor = true;
    problem.steps.factorType = 'algebraic'; // 代數係數只可以抽
    problem.steps.step4Eq = `${s}(${a}-${n1})=${b}`;
    
    // Step5: 除過對面
    problem.steps.hasDivide = true;
    problem.steps.step5Eq = `${s}=\\frac{${b}}{${a}-${n1}}`;
  }

  return problem;
};
