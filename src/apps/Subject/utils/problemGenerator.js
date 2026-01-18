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
  const n2 = randInt(2, 9);

  // TYPE 1: Simple Fraction: (as + n1)/n2 = a
  if (type === 'fraction_simple') {
    problem.text = `\\frac{${n1}${s} + ${a}}{${n2}} = ${b}`;
    problem.subject = s;
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
  else if (type === 'bracket_simple') {
    const coeff = simplifyCoefficient(n1, n2);
    problem.text = `${n1}(${s} + ${a}) = ${n2}${s} + ${b}`;
    problem.subject = s;
    problem.steps.hasFraction = false;
    problem.steps.step1Eq = problem.text;
    problem.steps.hasBracket = true;
    problem.steps.step2Eq = `${n1}${s}+${n1}${a}=${n2}${s}+${b}`;
    problem.steps.hasMove = true;
    problem.steps.step3Eq = `${n1}${s}-${n2}${s}=${b}-${n1}${a}`;
    
    // Only need Factor step if coefficients are different (not already combined)
    // If n1 = n2, then 5k - 5k = 0k (no factoring needed, already simplified)
    // Skip factor if coefficient is already a simple number after subtraction
    problem.steps.hasFactor = false;  // Changed: no need to factor when it's already simplified like 5k-8k=-3k
    problem.steps.step4Eq = problem.steps.step3Eq; // Skip factor, keep as is
    
    // Directly simplify to final form
    problem.steps.hasDivide = true;
    // Simplified final answer - just divide the combined coefficient
    const simplifiedCoeff = coeff.simplified;
    if (coeff.value === 1) {
      problem.steps.step5Eq = `${s}=${b}-${n1}${a}`;
    } else if (coeff.value === -1) {
      problem.steps.step5Eq = `${s}=${n1}${a}-${b}`;
    } else {
      problem.steps.step5Eq = `${s}=\\frac{${b}-${n1}${a}}{${simplifiedCoeff}}`;
    }
  }
  // TYPE 4: Pure Factorization Focus: as - b = cs
  else if (type === 'factor_simple') {
    const coeff = simplifyCoefficient(a, n1);
    problem.text = `${a}${s} - ${b} = ${n1}${s}`;
    problem.subject = s;
    problem.steps.hasFraction = false;
    problem.steps.step1Eq = problem.text;
    problem.steps.hasBracket = false;
    problem.steps.step2Eq = problem.text;
    problem.steps.hasMove = true;
    problem.steps.step3Eq = `${a}${s}-${n1}${s}=${b}`;
    problem.steps.hasFactor = true;
    problem.steps.step4Eq = `${s}(${a}-${n1})=${b}`;
    problem.steps.step4EqSimplified = coeff.value === 1 ? `${s}=${b}` : (coeff.value === -1 ? `-${s}=${b}` : `${coeff.simplified}${s}=${b}`);
    problem.steps.hasDivide = true;
    // Simplified final answer
    if (coeff.value === 1) {
      problem.steps.step5Eq = `${s}=${b}`;
    } else if (coeff.value === -1) {
      problem.steps.step5Eq = `${s}=-${b}`;
    } else {
      problem.steps.step5Eq = `${s}=\\frac{${b}}{${coeff.simplified}}`;
    }
  }

  return problem;
};
