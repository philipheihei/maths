import { randInt } from '../utils.js';

const C0 = '#fef3c7'; // amber-100
const C1 = '#bae6fd'; // sky-200
const cb = (c, s) => {
  const content = /^[A-Za-z]$/.test(s) ? `\\textit{${s}}` : s;
  return `\\colorbox{${c}}{${content}}`;
};

const QUESTION_BANK = [
  {
    subtypeLabel: '代數式化簡（適用）',
    questionLatex: '\\dfrac{(x+1)^2-(x-1)^2}{2} =',
    options: ['2x', '2x^2', 'x^2+1', '4x'],
    correctIndex: 0,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [{ symbol: 'x', value: '2' }],
      questionText: '((x+1)^2-(x-1)^2)/2 =',
      substitutionText: 'x = 2：((2+1)^2-(2-1)^2)/2 = (9-1)/2 = 4',
      questionLatex: '\\dfrac{(x+1)^2-(x-1)^2}{2} =',
      questionHighlightLatex: `\\dfrac{(${cb(C0,'x')}+1)^2-(${cb(C0,'x')}-1)^2}{2}=`,
      substitutionLatex: 'x = 2:\\ \\dfrac{(2+1)^2-(2-1)^2}{2}=\\dfrac{9-1}{2}=4',
      substitutionHighlightLatex: `${cb(C0,'\\textit{x} = 2')}:\\ \\dfrac{(${cb(C0,'2')}+1)^2-(${cb(C0,'2')}-1)^2}{2}=\\dfrac{9-1}{2}=4`,
      optionChecks: [
        { label: 'A', text: '2x = 2(2) = 4', latex: `2(${cb(C0,'2')})=4`, correct: true },
        { label: 'B', text: '2x^2 = 2(2)^2 = 8', latex: `2(${cb(C0,'2')})^2=8`, correct: false },
        { label: 'C', text: 'x^2+1 = (2)^2+1 = 5', latex: `(${cb(C0,'2')})^2+1=5`, correct: false },
        { label: 'D', text: '4x = 4(2) = 8', latex: `4(${cb(C0,'2')})=8`, correct: false },
      ],
      answerLabel: 'A',
    },
    explanationLines: [
      '\\text{代 } x=2: \\dfrac{9-1}{2}=4',
      '\\text{A: }2x=4\\text{，與題目相同，對}',
      '\\text{B: }2x^2=8\\text{，與題目不同，錯}',
      '\\text{C: }x^2+1=5\\text{，與題目不同，錯}',
      '\\text{D: }4x=8\\text{，與題目不同，錯}',
      '\\therefore \\text{比較所有代入的答案，只有 A 跟題目的代入答案相同，所以答案為 A。}',
    ],
  },
  {
    subtypeLabel: '指數化簡（需代兩個值）',
    questionLatex: '\\dfrac{4^{n+1}\\cdot 8^n}{2^{3n+2}} =',
    options: ['2^n', '2^{2n}', '2^{2n-1}', '4'],
    correctIndex: 1,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [{ symbol: 'n', value: '2' }],
      questionText: '(4^(n+1)*8^n)/(2^(3n+2)) =',
      substitutionText: 'n = 2：(4^(2+1)*8^2)/(2^(3(2)+2)) = (4^3*8^2)/2^8 = 16',
      questionLatex: '\\dfrac{4^{n+1}\\cdot 8^n}{2^{3n+2}} =',
      questionHighlightLatex: `\\dfrac{4^{${cb(C0,'n')}+1}\\cdot 8^{${cb(C0,'n')}}}{2^{3${cb(C0,'n')}+2}}=`,
      substitutionLatex: 'n = 2:\\ \\dfrac{4^{2+1}\\cdot 8^2}{2^{3(2)+2}}=\\dfrac{4^3\\cdot 8^2}{2^8}=16',
      substitutionHighlightLatex: `${cb(C0,'\\textit{n} = 2')}:\\ \\dfrac{4^{${cb(C0,'2')}+1}\\cdot 8^{${cb(C0,'2')}}}{2^{3(${cb(C0,'2')})+2}}=\\dfrac{4^3\\cdot 8^2}{2^8}=16`,
      optionChecks: [
        { label: 'A', text: '2^n = 2^2 = 4', latex: `2^n=2^{${cb(C0,'2')}}=4`, correct: false },
        { label: 'B', text: '2^(2n) = 2^(2(2)) = 16', latex: `2^{2n}=2^{2(${cb(C0,'2')})}=16`, correct: true },
        { label: 'C', text: '2^(2n-1) = 2^(2(2)-1) = 8', latex: `2^{2n-1}=2^{2(${cb(C0,'2')})-1}=8`, correct: false },
        { label: 'D', text: '4 = 4', latex: '4=4', correct: false },
      ],
      answerLabel: 'B',
    },
    explanationLines: [
      '\\text{先代 }n=1: \\dfrac{4^2\\cdot 8}{2^5}=4\\text{，B 與 D 碰撞}',
      '\\text{再代 }n=2: \\dfrac{4^3\\cdot 8^2}{2^8}=16',
      '\\text{A: }2^n=4\\text{，與 16 不同，錯}',
      '\\text{B: }2^{2n}=16\\text{，與題目相同，對}',
      '\\text{C: }2^{2n-1}=8\\text{，與 16 不同，錯}',
      '\\text{D: }4\\text{，與 16 不同，錯}',
      '\\therefore \\text{比較所有代入的答案，只有 B 跟題目的代入答案相同，所以答案為 B。}',
    ],
  },
  {
    subtypeLabel: '分式化簡（適用）',
    questionLatex: '\\dfrac{1}{k+2}+\\dfrac{3}{5k-6} =',
    options: [
      '\\dfrac{-8k}{(k+2)(5k-6)}',
      '\\dfrac{-2k}{(k+2)(5k-6)}',
      '\\dfrac{2k}{(k+2)(5k-6)}',
      '\\dfrac{8k}{(k+2)(5k-6)}',
    ],
    correctIndex: 3,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [{ symbol: 'k', value: '2' }],
      questionText: '1/(k+2)+3/(5k-6) =',
      substitutionText: 'k = 2：1/(2+2)+3/(5(2)-6) = 1/4+3/4 = 1',
      questionLatex: '\\dfrac{1}{k+2}+\\dfrac{3}{5k-6} =',
      questionHighlightLatex: `\\dfrac{1}{${cb(C0,'k')}+2}+\\dfrac{3}{5${cb(C0,'k')}-6}=`,
      substitutionLatex: 'k = 2:\\ \\dfrac{1}{2+2}+\\dfrac{3}{5(2)-6}=\\dfrac14+\\dfrac34=1',
      substitutionHighlightLatex: `${cb(C0,'\\textit{k} = 2')}:\\ \\dfrac{1}{${cb(C0,'2')}+2}+\\dfrac{3}{5(${cb(C0,'2')})-6}=\\dfrac14+\\dfrac34=1`,
      optionChecks: [
        { label: 'A', text: '(-8(2))/((2+2)(5(2)-6)) = -16/16 = -1', latex: `\\dfrac{-8${cb(C0,'(2)')}}{(${cb(C0,'(2)')}+2)(5${cb(C0,'(2)')}-6)}=\\dfrac{-16}{16}=-1`, correct: false },
        { label: 'B', text: '(-2(2))/((2+2)(5(2)-6)) = -4/16 = -1/4', latex: `\\dfrac{-2${cb(C0,'(2)')}}{(${cb(C0,'(2)')}+2)(5${cb(C0,'(2)')}-6)}=\\dfrac{-4}{16}=-\\dfrac14`, correct: false },
        { label: 'C', text: '(2(2))/((2+2)(5(2)-6)) = 4/16 = 1/4', latex: `\\dfrac{2${cb(C0,'(2)')}}{(${cb(C0,'(2)')}+2)(5${cb(C0,'(2)')}-6)}=\\dfrac{4}{16}=\\dfrac14`, correct: false },
        { label: 'D', text: '(8(2))/((2+2)(5(2)-6)) = 16/16 = 1', latex: `\\dfrac{8${cb(C0,'(2)')}}{(${cb(C0,'(2)')}+2)(5${cb(C0,'(2)')}-6)}=\\dfrac{16}{16}=1`, correct: true },
      ],
      answerLabel: 'D',
    },
    explanationLines: [
      '\\text{代 }k=2\\text{（分母不為 0）}: \\dfrac{1}{4}+\\dfrac{3}{4}=1',
      '\\text{A: }\\dfrac{-8k}{(k+2)(5k-6)}=\\dfrac{-16}{16}=-1\\text{，錯}',
      '\\text{B: }\\dfrac{-2k}{(k+2)(5k-6)}=\\dfrac{-4}{16}=-\\dfrac14\\text{，錯}',
      '\\text{C: }\\dfrac{2k}{(k+2)(5k-6)}=\\dfrac{4}{16}=\\dfrac14\\text{，錯}',
      '\\text{D: }\\dfrac{8k}{(k+2)(5k-6)}=\\dfrac{16}{16}=1\\text{，對}',
      '\\therefore \\text{比較所有代入的答案，只有 D 跟題目的代入答案相同，所以答案為 D。}',
    ],
  },
  {
    subtypeLabel: '雙變數展開（適用）',
    questionLatex: '(2\\alpha-\\beta)^2+(\\alpha-2\\beta)^2 =',
    options: [
      '3\\alpha^2-4\\alpha\\beta+3\\beta^2',
      '3\\alpha^2-8\\alpha\\beta+3\\beta^2',
      '5\\alpha^2-4\\alpha\\beta+5\\beta^2',
      '5\\alpha^2-8\\alpha\\beta+5\\beta^2',
    ],
    correctIndex: 3,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [
        { symbol: 'α', value: '2' },
        { symbol: 'β', value: '3' },
      ],
      questionText: '(2α-β)^2 + (α-2β)^2 =',
      substitutionText: 'α = 2， β = 3：[2(2)-3]^2 + [(2)-2(3)]^2 = 17',
      questionLatex: '(2\\alpha-\\beta)^2+(\\alpha-2\\beta)^2 =',
      questionHighlightLatex: `(2${cb(C0,'α')}-${cb(C1,'β')})^2+(${cb(C0,'α')}-2${cb(C1,'β')})^2=`,
      substitutionLatex: '\\alpha = 2,\\ \\beta = 3:\\ [2(2)-3]^2+[(2)-2(3)]^2=17',
      substitutionHighlightLatex: `${cb(C0,'α = 2')},\\ ${cb(C1,'β = 3')}:\\ [2${cb(C0,'(2)')}-${cb(C1,'3')}]^2+[${cb(C0,'(2)')}-2${cb(C1,'(3)')}]^2=17`,
      optionChecks: [
        { label: 'A', text: '3(2)^2 - 4(2)(3) + 3(3)^2 = 15', latex: `3(${cb(C0,'2')})^2-4(${cb(C0,'2')})(${cb(C1,'3')})+3(${cb(C1,'3')})^2=15`, correct: false },
        { label: 'B', text: '3(2)^2 - 8(2)(3) + 3(3)^2 = -9', latex: `3(${cb(C0,'2')})^2-8(${cb(C0,'2')})(${cb(C1,'3')})+3(${cb(C1,'3')})^2=-9`, correct: false },
        { label: 'C', text: '5(2)^2 - 4(2)(3) + 5(3)^2 = 41', latex: `5(${cb(C0,'2')})^2-4(${cb(C0,'2')})(${cb(C1,'3')})+5(${cb(C1,'3')})^2=41`, correct: false },
        { label: 'D', text: '5(2)^2 - 8(2)(3) + 5(3)^2 = 17', latex: `5(${cb(C0,'2')})^2-8(${cb(C0,'2')})(${cb(C1,'3')})+5(${cb(C1,'3')})^2=17`, correct: true },
      ],
      answerLabel: 'D',
    },
    explanationLines: [
      '\\text{代 }\\alpha=2,\\beta=3: (4-3)^2+(2-6)^2=17',
      '\\text{A: }3(2)^2-4(2)(3)+3(3)^2=15\\text{，錯}',
      '\\text{B: }3(2)^2-8(2)(3)+3(3)^2=-9\\text{，錯}',
      '\\text{C: }5(2)^2-4(2)(3)+5(3)^2=41\\text{，錯}',
      '\\text{D: }5(2)^2-8(2)(3)+5(3)^2=17\\text{，對}',
      '\\therefore \\text{比較所有代入的答案，只有 D 跟題目的代入答案相同，所以答案為 D。}',
    ],
  },
  {
    subtypeLabel: '指數律（適用）',
    questionLatex: '\\dfrac{(27x)^5}{(3x^{-2})^4} =',
    options: ['3^2x^3', '3^4x^3', '3^{11}x^{13}', '3^{14}x^{13}'],
    correctIndex: 2,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [{ symbol: 'x', value: '3' }],
      questionText: '(27x)^5/(3x^(-2))^4 =',
      substitutionText: 'x = 3：((27*3)^5)/(3*(3^-2))^4 ≈ 2.8243×10^11',
      questionLatex: '\\dfrac{(27x)^5}{(3x^{-2})^4} =',
      questionHighlightLatex: `\\dfrac{(27${cb(C0,'x')})^5}{(3${cb(C0,'x')}^{-2})^4}=`,
      substitutionLatex: 'x = 3:\\ \\dfrac{(27\\cdot 3)^5}{(3\\cdot 3^{-2})^4}\\approx 2.8243\\times 10^{11}',
      substitutionHighlightLatex: `${cb(C0,'\\textit{x} = 3')}:\\ \\dfrac{(27\\cdot ${cb(C0,'3')})^5}{(3\\cdot ${cb(C0,'3')}^{-2})^4}\\approx 2.8243\\times 10^{11}`,
      optionChecks: [
        { label: 'A', text: '3^2x^3 = 3^2(3)^3 = 243', latex: `3^2${cb(C0,'x')}^3=3^2\\cdot(${cb(C0,'3')})^3=243`, correct: false },
        { label: 'B', text: '3^4x^3 = 3^4(3)^3 = 2187', latex: `3^4${cb(C0,'x')}^3=3^4\\cdot(${cb(C0,'3')})^3=2187`, correct: false },
        { label: 'C', text: '3^11x^13 = 3^11(3)^13 ≈ 2.8243×10^11', latex: `3^{11}${cb(C0,'x')}^{13}=3^{11}\\cdot(${cb(C0,'3')})^{13}\\approx 2.8243\\times 10^{11}`, correct: true },
        { label: 'D', text: '3^14x^13 = 3^14(3)^13 ≈ 7.6256×10^12', latex: `3^{14}${cb(C0,'x')}^{13}=3^{14}\\cdot(${cb(C0,'3')})^{13}\\approx 7.6256\\times 10^{12}`, correct: false },
      ],
      answerLabel: 'C',
    },
    explanationLines: [
      '\\text{代 }x=3: \\dfrac{(27x)^5}{(3x^{-2})^4}\\approx 2.8243\\times 10^{11}',
      '\\text{A: }3^2x^3=3^2\\cdot 3^3=243\\text{，錯}',
      '\\text{B: }3^4x^3=3^4\\cdot 3^3=2187\\text{，錯}',
      '\\text{C: }3^{11}x^{13}=3^{11}\\cdot 3^{13}\\approx 2.8243\\times 10^{11}\\text{，對}',
      '\\text{D: }3^{14}x^{13}=3^{14}\\cdot 3^{13}\\approx 7.6256\\times 10^{12}\\text{，錯}',
      '\\therefore \\text{比較所有代入的答案，只有 C 跟題目的代入答案相同，所以答案為 C。}',
    ],
  },
];

const labels = ['A', 'B', 'C', 'D'];

const fmtSignedInt = (n) => (n >= 0 ? `+${n}` : `${n}`);

const fmtLinear = (coef, variable, constant) => {
  const parts = [];
  if (coef !== 0) {
    if (coef === 1) parts.push(variable);
    else if (coef === -1) parts.push(`-${variable}`);
    else parts.push(`${coef}${variable}`);
  }
  if (constant !== 0 || parts.length === 0) {
    if (parts.length === 0) parts.push(`${constant}`);
    else parts.push(constant > 0 ? `+${constant}` : `${constant}`);
  }
  return parts.join('');
};

const formatNExp = (coefN, constant) => {
  const nPart = coefN === 1 ? 'n' : `${coefN}n`;
  if (constant === 0) return nPart;
  return constant > 0 ? `${nPart}+${constant}` : `${nPart}${constant}`;
};

const formatABExp = (coefA, coefAB, coefB) => {
  const t1 = coefA === 1 ? '\\alpha^2' : `${coefA}\\alpha^2`;
  const t2 = coefAB === 1 ? '\\alpha\\beta' : coefAB === -1 ? '-\\alpha\\beta' : `${coefAB}\\alpha\\beta`;
  const t3 = coefB === 1 ? '\\beta^2' : `${coefB}\\beta^2`;

  const mid = t2.startsWith('-') ? t2 : `+${t2}`;
  const end = t3.startsWith('-') ? t3 : `+${t3}`;
  return `${t1}${mid}${end}`;
};

const formatVarTerm = (coef, variable) => {
  if (coef === 1) return variable;
  if (coef === -1) return `-${variable}`;
  return `${coef}${variable}`;
};

const uniqueWrongs = (correct, wrongCandidates, fillerFn) => {
  const set = new Set();
  const out = [];
  for (const w of wrongCandidates) {
    if (!w || w === correct || set.has(w)) continue;
    set.add(w);
    out.push(w);
    if (out.length === 3) break;
  }
  while (out.length < 3) {
    const w = fillerFn(out.length);
    if (!w || w === correct || set.has(w)) continue;
    set.add(w);
    out.push(w);
  }
  return out;
};

const buildAlgebraSimplifyVariant = (a) => {
  const xSub = 2;
  const qVal = ((xSub + a) ** 2 - (xSub - a) ** 2) / (2 * a);
  const xv = cb(C0, String(xSub));

  const correct = '2x';
  const wrongs = uniqueWrongs(
    correct,
    ['2x^2', `x^2+${a}`, `${2 * a}x`, `x^2+2x`],
    (i) => `${i + 3}x`
  );
  const optionPool = [correct, ...wrongs];
  const shuffled = shuffle(optionPool.map((opt, idx) => ({ opt, correct: idx === 0 })));
  const options = shuffled.map((item) => item.opt);
  const correctIndex = shuffled.findIndex((item) => item.correct);
  const answerLabel = labels[correctIndex];

  const optionValue = (opt) => {
    if (opt === '2x') return 2 * xSub;
    if (opt === '2x^2') return 2 * (xSub ** 2);
    if (opt === `x^2+${a}`) return xSub ** 2 + a;
    if (opt === `${2 * a}x`) return 2 * a * xSub;
    if (opt === 'x^2+2x') return xSub ** 2 + 2 * xSub;
    const m = opt.match(/^(\d+)x$/);
    if (m) return Number(m[1]) * xSub;
    return NaN;
  };

  const optionSubLatex = (opt) => {
    if (opt === '2x') return `2(${xv})=${2 * xSub}`;
    if (opt === '2x^2') return `2(${xv})^2=${2 * (xSub ** 2)}`;
    if (opt === `x^2+${a}`) return `(${xv})^2+${a}=${xSub ** 2 + a}`;
    if (opt === `${2 * a}x`) return `${2 * a}(${xv})=${2 * a * xSub}`;
    if (opt === 'x^2+2x') return `(${xv})^2+2(${xv})=${xSub ** 2 + 2 * xSub}`;
    const m = opt.match(/^(\d+)x$/);
    if (m) return `${m[1]}(${xv})=${Number(m[1]) * xSub}`;
    return `${opt}=${optionValue(opt)}`;
  };

  return {
    subtypeLabel: '代數式化簡（適用）',
    questionLatex: `\\dfrac{(x+${a})^2-(x-${a})^2}{${2 * a}} =`,
    options,
    correctIndex,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [{ symbol: 'x', value: String(xSub) }],
      questionText: `((x+${a})^2-(x-${a})^2)/${2 * a} =`,
      substitutionText: `x = ${xSub}: ((2+${a})^2-(2-${a})^2)/${2 * a} = ${qVal}`,
      questionLatex: `\\dfrac{(x+${a})^2-(x-${a})^2}{${2 * a}} =`,
      questionHighlightLatex: `\\dfrac{(${cb(C0, 'x')}+${a})^2-(${cb(C0, 'x')}-${a})^2}{${2 * a}}=`,
      substitutionLatex: `x=${xSub}:\\ \\dfrac{(${xSub}+${a})^2-(${xSub}-${a})^2}{${2 * a}}=${qVal}`,
      substitutionHighlightLatex: `${cb(C0, `\\textit{x} = ${xSub}`)}:\\ \\dfrac{(${xv}+${a})^2-(${xv}-${a})^2}{${2 * a}}=${qVal}`,
      optionChecks: shuffled.map((item, idx) => ({
        label: labels[idx],
        latex: optionSubLatex(item.opt),
        correct: item.correct,
      })),
      answerLabel,
    },
    explanationLines: [
      `\\text{代 }x=${xSub}: \\dfrac{(${xSub}+${a})^2-(${xSub}-${a})^2}{${2 * a}}=${qVal}`,
      `\\therefore \\text{比較所有代入的答案，只有 ${answerLabel} 跟題目的代入答案相同，所以答案為 ${answerLabel}。}`,
    ],
  };
};

const buildExponentSimplifyVariant = (p, q) => {
  const nSub = 2;
  const c = 2 * p - q;
  const nv = cb(C0, String(nSub));
  const correct = `2^{${formatNExp(1, c)}}`;
  const wrongs = uniqueWrongs(
    correct,
    [
      `2^{${formatNExp(2, c)}}`,
      `2^{${formatNExp(1, c + 1)}}`,
      `2^{${formatNExp(1, c - 1)}}`,
      `2^{${formatNExp(2, c - 1)}}`,
    ],
    (i) => `2^{${formatNExp(1, c + i + 2)}}`
  );
  const optionPool = [correct, ...wrongs];
  const shuffled = shuffle(optionPool.map((opt, idx) => ({ opt, correct: idx === 0 })));
  const options = shuffled.map((item) => item.opt);
  const correctIndex = shuffled.findIndex((item) => item.correct);
  const answerLabel = labels[correctIndex];

  const evalExp = (expStr) => {
    const m = expStr.match(/^2\^\{(\d*)n([+-]\d+)?\}$/);
    if (!m) return NaN;
    const coefN = m[1] === '' ? 1 : Number(m[1]);
    const k = m[2] ? Number(m[2]) : 0;
    return 2 ** (coefN * nSub + k);
  };

  const qVal = 2 ** (nSub + c);

  const optionSubLatex = (opt) => {
    const m = opt.match(/^2\^\{(\d*)n([+-]\d+)?\}$/);
    if (!m) return `${opt}=${evalExp(opt)}`;
    const coefN = m[1] === '' ? 1 : Number(m[1]);
    const k = m[2] ? Number(m[2]) : 0;
    const expLatex = k === 0 ? `${coefN === 1 ? '' : coefN}(${nv})` : `${coefN === 1 ? '' : coefN}(${nv})${k >= 0 ? '+' : ''}${k}`;
    return `2^{${coefN === 1 ? 'n' : `${coefN}n`}${k === 0 ? '' : (k > 0 ? `+${k}` : `${k}`)}}=2^{${expLatex}}=${2 ** (coefN * nSub + k)}`;
  };

  return {
    subtypeLabel: '指數化簡（需代兩個值）',
    questionLatex: `\\dfrac{4^{n+${p}}\\cdot 8^n}{2^{4n+${q}}} =`,
    options,
    correctIndex,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [{ symbol: 'n', value: String(nSub) }],
      questionText: `(4^(n+${p})*8^n)/(2^(4n+${q})) =`,
      substitutionText: `n = ${nSub}: (4^(${nSub}+${p})*8^${nSub})/2^(4(${nSub})+${q}) = ${qVal}`,
      questionLatex: `\\dfrac{4^{n+${p}}\\cdot 8^n}{2^{4n+${q}}} =`,
      questionHighlightLatex: `\\dfrac{4^{${cb(C0, 'n')}+${p}}\\cdot 8^{${cb(C0, 'n')}}}{2^{4${cb(C0, 'n')}+${q}}}=`,
      substitutionLatex: `n=${nSub}:\\ \\dfrac{4^{${nSub}+${p}}\\cdot 8^{${nSub}}}{2^{4(${nSub})+${q}}}=${qVal}`,
      substitutionHighlightLatex: `${cb(C0, `\\textit{n} = ${nSub}`)}:\\ \\dfrac{4^{${nv}+${p}}\\cdot 8^{${nv}}}{2^{4(${nv})+${q}}}=${qVal}`,
      optionChecks: shuffled.map((item, idx) => ({
        label: labels[idx],
        latex: optionSubLatex(item.opt),
        correct: item.correct,
      })),
      answerLabel,
    },
    explanationLines: [
      `\\text{代 }n=${nSub}: \\dfrac{4^{${nSub}+${p}}\\cdot 8^{${nSub}}}{2^{4(${nSub})+${q}}}=${qVal}`,
      `\\therefore \\text{比較所有代入的答案，只有 ${answerLabel} 跟題目的代入答案相同，所以答案為 ${answerLabel}。}`,
    ],
  };
};

const buildFractionSimplifyVariant = (a, b, c, d) => {
  const kSub = 2;
  const kv = cb(C0, String(kSub));
  const denomAtSub = (kSub + a) * (c * kSub - d);
  const numA = c + b;
  const numB = a * b - d;

  const correctNum = { A: numA, B: numB };
  const candidates = [
    { A: numA, B: -numB },
    { A: numA - 1, B: numB },
    { A: numA + 1, B: numB },
    { A: numA, B: numB + 2 },
    { A: -numA, B: numB },
  ];

  const numToLatex = ({ A, B }) => fmtLinear(A, 'k', B);
  const fracLatex = (n) => `\\dfrac{${numToLatex(n)}}{(k+${a})(${c}k-${d})}`;
  const evalNum = ({ A, B }) => A * kSub + B;
  const correctValue = evalNum(correctNum) / denomAtSub;

  const wrongNums = [];
  const seen = new Set([fracLatex(correctNum)]);
  for (const cand of candidates) {
    const latex = fracLatex(cand);
    const val = evalNum(cand) / denomAtSub;
    if (!seen.has(latex) && val !== correctValue) {
      seen.add(latex);
      wrongNums.push(cand);
      if (wrongNums.length === 3) break;
    }
  }
  while (wrongNums.length < 3) {
    const delta = wrongNums.length + 2;
    const cand = { A: numA + delta, B: numB - delta };
    const latex = fracLatex(cand);
    const val = evalNum(cand) / denomAtSub;
    if (!seen.has(latex) && val !== correctValue) {
      seen.add(latex);
      wrongNums.push(cand);
    }
  }

  const optionNums = [correctNum, ...wrongNums];
  const shuffled = shuffle(optionNums.map((num, idx) => ({ num, correct: idx === 0 })));
  const shuffledNums = shuffled.map((item) => item.num);
  const correctIndex = shuffled.findIndex((item) => item.correct);
  const answerLabel = labels[correctIndex];
  const options = shuffledNums.map(fracLatex);

  const qVal = 1 / (kSub + a) + b / (c * kSub - d);

  return {
    subtypeLabel: '分式化簡（適用）',
    questionLatex: `\\dfrac{1}{k+${a}}+\\dfrac{${b}}{${c}k-${d}} =`,
    options,
    correctIndex,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [{ symbol: 'k', value: String(kSub) }],
      questionText: `1/(k+${a})+${b}/(${c}k-${d}) =`,
      substitutionText: `k = ${kSub}: 1/(${kSub}+${a})+${b}/(${c}(${kSub})-${d}) = ${qVal}`,
      questionLatex: `\\dfrac{1}{k+${a}}+\\dfrac{${b}}{${c}k-${d}} =`,
      questionHighlightLatex: `\\dfrac{1}{${cb(C0, 'k')}+${a}}+\\dfrac{${b}}{${c}${cb(C0, 'k')}-${d}}=`,
      substitutionLatex: `k=${kSub}:\\ \\dfrac{1}{${kSub}+${a}}+\\dfrac{${b}}{${c}(${kSub})-${d}}=${qVal}`,
      substitutionHighlightLatex: `${cb(C0, `\\textit{k} = ${kSub}`)}:\\ \\dfrac{1}{${kv}+${a}}+\\dfrac{${b}}{${c}(${kv})-${d}}=${qVal}`,
      optionChecks: shuffled.map((item, idx) => {
        const num = item.num;
        return {
        label: labels[idx],
        latex: `\\dfrac{${num.A}(${kv})${num.B >= 0 ? '+' : ''}${num.B}}{((${kv})+${a})(${c}(${kv})-${d})}=\\dfrac{${evalNum(num)}}{${denomAtSub}}=${evalNum(num) / denomAtSub}`,
        correct: item.correct,
      };}),
      answerLabel,
    },
    explanationLines: [
      `\\text{代 }k=${kSub}: \\dfrac{1}{${kSub}+${a}}+\\dfrac{${b}}{${c}(${kSub})-${d}}=${qVal}`,
      `\\therefore \\text{比較所有代入的答案，只有 ${answerLabel} 跟題目的代入答案相同，所以答案為 ${answerLabel}。}`,
    ],
  };
};

const buildBivariateExpandVariant = (p, q, r, s) => {
  const alphaSub = 2;
  const betaSub = 3;
  const av = cb(C0, String(alphaSub));
  const bv = cb(C1, String(betaSub));
  const tPText = formatVarTerm(p, 'α');
  const tQText = formatVarTerm(q, 'β');
  const tRText = formatVarTerm(r, 'α');
  const tSText = formatVarTerm(s, 'β');
  const tPLatex = formatVarTerm(p, '\\alpha');
  const tQLatex = formatVarTerm(q, '\\beta');
  const tRLatex = formatVarTerm(r, '\\alpha');
  const tSLatex = formatVarTerm(s, '\\beta');
  const A = p * p + r * r;
  const B = -2 * (p * q + r * s);
  const C = q * q + s * s;

  const correctModel = { a2: A, ab: B, b2: C };
  const wrongCandidates = [
    { a2: A, ab: -B, b2: C },
    { a2: A + 2, ab: B, b2: C },
    { a2: A, ab: B + 2, b2: C - 2 },
    { a2: A, ab: B - 2, b2: C + 2 },
    { a2: A + 1, ab: B, b2: C + 1 },
  ];
  const unique = [];
  const seen = new Set([`${A}|${B}|${C}`]);
  for (const cand of wrongCandidates) {
    const key = `${cand.a2}|${cand.ab}|${cand.b2}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(cand);
    if (unique.length === 3) break;
  }
  while (unique.length < 3) {
    const d = unique.length + 2;
    const cand = { a2: A + d, ab: B - d, b2: C + d };
    const key = `${cand.a2}|${cand.ab}|${cand.b2}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(cand);
    }
  }

  const optionModels = [correctModel, ...unique];
  const shuffled = shuffle(optionModels.map((model, idx) => ({ model, correct: idx === 0 })));
  const shuffledModels = shuffled.map((item) => item.model);
  const options = shuffledModels.map((m) => formatABExp(m.a2, m.ab, m.b2));
  const correctIndex = shuffled.findIndex((item) => item.correct);
  const answerLabel = labels[correctIndex];
  const evalAB = (model) => model.a2 * alphaSub * alphaSub + model.ab * alphaSub * betaSub + model.b2 * betaSub * betaSub;

  const qVal = ((p * alphaSub - q * betaSub) ** 2) + ((r * alphaSub - s * betaSub) ** 2);

  return {
    subtypeLabel: '雙變數展開（適用）',
    questionLatex: `(${tPLatex}-${tQLatex})^2+(${tRLatex}-${tSLatex})^2 =`,
    options,
    correctIndex,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [
        { symbol: 'α', value: String(alphaSub) },
        { symbol: 'β', value: String(betaSub) },
      ],
      questionText: `(${tPText}-${tQText})^2+(${tRText}-${tSText})^2 =`,
      substitutionText: `α = ${alphaSub}, β = ${betaSub}: (${p * alphaSub - q * betaSub})^2 + (${r * alphaSub - s * betaSub})^2 = ${qVal}`,
      questionLatex: `(${tPLatex}-${tQLatex})^2+(${tRLatex}-${tSLatex})^2 =`,
      questionHighlightLatex: `(${formatVarTerm(p, cb(C0, 'α'))}-${formatVarTerm(q, cb(C1, 'β'))})^2+(${formatVarTerm(r, cb(C0, 'α'))}-${formatVarTerm(s, cb(C1, 'β'))})^2=`,
      substitutionLatex: `\\alpha=${alphaSub},\\ \\beta=${betaSub}:\\ (${p * alphaSub - q * betaSub})^2+(${r * alphaSub - s * betaSub})^2=${qVal}`,
      substitutionHighlightLatex: `${cb(C0, `α = ${alphaSub}`)},\\ ${cb(C1, `β = ${betaSub}`)}:\\ (${p}(${av})-${q}(${bv}))^2+(${r}(${av})-${s}(${bv}))^2=${qVal}`,
      optionChecks: shuffled.map((item, idx) => {
        const model = item.model;
        return ({
        label: labels[idx],
        latex: `${model.a2}(${av})^2${model.ab >= 0 ? '+' : ''}${model.ab}(${av})(${bv})${model.b2 >= 0 ? '+' : ''}${model.b2}(${bv})^2=${evalAB(model)}`,
        correct: item.correct,
      });
      }),
      answerLabel,
    },
    explanationLines: [
      `\\text{代 }\\alpha=${alphaSub},\\beta=${betaSub}: (${p * alphaSub - q * betaSub})^2+(${r * alphaSub - s * betaSub})^2=${qVal}`,
      `\\therefore \\text{比較所有代入的答案，只有 ${answerLabel} 跟題目的代入答案相同，所以答案為 ${answerLabel}。}`,
    ],
  };
};

const buildExponentLawVariant = (u, v, m, n, p, q) => {
  const xSub = 3;
  const xv = cb(C0, String(xSub));
  const outP = Math.abs(p) <= 1 ? 2 : p;
  const outQ = Math.abs(q) <= 1 ? 2 : q;
  const K = u * outP - v * outQ;
  const E = m * outP + n * outQ;
  const baseNumU = 3 ** u;
  const baseNumV = 3 ** v;
  const withOuterPowLatex = (baseLatex, exp) => (exp === 1 ? baseLatex : `(${baseLatex})^{${exp}}`);
  const withOuterPowText = (baseText, exp) => (exp === 1 ? baseText : `(${baseText})^${exp}`);

  const coeffLatexFromPower3 = (k) => {
    if (k === 0) return '';
    if (k > 0) return `${3 ** k}`;
    return `\\dfrac{1}{${3 ** (-k)}}`;
  };

  const toMonomialLatex = (k, e) => {
    const coefLatex = coeffLatexFromPower3(k);
    return `${coefLatex}x^{${e}}`;
  };

  const parseMonomialLatex = (opt) => {
    let m2 = opt.match(/^x\^\{(-?\d+)\}$/);
    if (m2) return { coefValue: 1, coefLatex: '', e: Number(m2[1]) };

    m2 = opt.match(/^(\d+)x\^\{(-?\d+)\}$/);
    if (m2) return { coefValue: Number(m2[1]), coefLatex: m2[1], e: Number(m2[2]) };

    m2 = opt.match(/^\\dfrac\{1\}\{(\d+)\}x\^\{(-?\d+)\}$/);
    if (m2) return { coefValue: 1 / Number(m2[1]), coefLatex: `\\dfrac{1}{${m2[1]}}`, e: Number(m2[2]) };

    return null;
  };

  const correct = toMonomialLatex(K, E);
  const wrongs = uniqueWrongs(
    correct,
    [
      toMonomialLatex(K + 1, E),
      toMonomialLatex(K, E + 1),
      toMonomialLatex(Math.max(1, K - 1), E + 1),
      toMonomialLatex(K + 1, Math.max(1, E - 1)),
    ],
    (i) => toMonomialLatex(K + 1 + i, E + 1)
  );
  const optionPool = [correct, ...wrongs];
  const shuffled = shuffle(optionPool.map((opt, idx) => ({ opt, correct: idx === 0 })));
  const options = shuffled.map((item) => item.opt);
  const correctIndex = shuffled.findIndex((item) => item.correct);
  const answerLabel = labels[correctIndex];

  const evalOpt = (opt) => {
    const parsed = parseMonomialLatex(opt);
    if (!parsed) return NaN;
    return parsed.coefValue * (xSub ** parsed.e);
  };

  const qVal = 3 ** (K + E);

  return {
    subtypeLabel: '指數律（適用）',
    questionLatex: `\\dfrac{${withOuterPowLatex(`${baseNumU}x^{${m}}`, outP)}}{${withOuterPowLatex(`${baseNumV}x^{-${n}}`, outQ)}} =`,
    options,
    correctIndex,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [{ symbol: 'x', value: String(xSub) }],
      questionText: `(${withOuterPowText(`${baseNumU}x^${m}`, outP)})/(${withOuterPowText(`${baseNumV}x^(-${n})`, outQ)}) =`,
      substitutionText: `x = ${xSub}: (${withOuterPowText(`${baseNumU}*${xSub}^${m}`, outP)})/(${withOuterPowText(`${baseNumV}*${xSub}^(-${n})`, outQ)}) = ${qVal}`,
      questionLatex: `\\dfrac{${withOuterPowLatex(`${baseNumU}x^{${m}}`, outP)}}{${withOuterPowLatex(`${baseNumV}x^{-${n}}`, outQ)}} =`,
      questionHighlightLatex: `\\dfrac{${withOuterPowLatex(`${baseNumU}${cb(C0, 'x')}^{${m}}`, outP)}}{${withOuterPowLatex(`${baseNumV}${cb(C0, 'x')}^{-${n}}`, outQ)}}=`,
      substitutionLatex: `x=${xSub}:\\ \\dfrac{${withOuterPowLatex(`${baseNumU}(${xSub})^{${m}}`, outP)}}{${withOuterPowLatex(`${baseNumV}(${xSub})^{-${n}}`, outQ)}}=3^{${K + E}}=${qVal}`,
      substitutionHighlightLatex: `${cb(C0, `\\textit{x} = ${xSub}`)}:\\ \\dfrac{${withOuterPowLatex(`${baseNumU}(${xv})^{${m}}`, outP)}}{${withOuterPowLatex(`${baseNumV}(${xv})^{-${n}}`, outQ)}}=3^{${K + E}}=${qVal}`,
      optionChecks: shuffled.map((item, idx) => ({
        label: labels[idx],
        latex: (() => {
          const parsed = parseMonomialLatex(item.opt);
          if (!parsed) return `${item.opt}=${evalOpt(item.opt)}`;
          return `${parsed.coefLatex}(${xv})^{${parsed.e}}=${evalOpt(item.opt)}`;
        })(),
        correct: item.correct,
      })),
      answerLabel,
    },
    explanationLines: [
      `\\text{代 }x=${xSub}: \\dfrac{${withOuterPowLatex(`3^{${u}}(${xSub})^{${m}}`, outP)}}{${withOuterPowLatex(`3^{${v}}(${xSub})^{-${n}}`, outQ)}}=3^{${K + E}}`,
      `\\therefore \\text{比較所有代入的答案，只有 ${answerLabel} 跟題目的代入答案相同，所以答案為 ${answerLabel}。}`,
    ],
  };
};

const EXTRA_VARIANTS = [
  ...[2, 3, 4, 5, 6, 7].map((a) => buildAlgebraSimplifyVariant(a)),
  ...[
    [2, 1], [3, 2], [4, 3], [5, 4], [3, 1], [4, 2],
  ].map(([p, q]) => buildExponentSimplifyVariant(p, q)),
  ...[
    [3, 2, 4, 5],
    [4, 3, 5, 7],
    [2, 4, 3, 2],
    [5, 2, 4, 3],
    [3, 5, 6, 8],
    [4, 2, 5, 4],
  ].map(([a, b, c, d]) => buildFractionSimplifyVariant(a, b, c, d)),
  ...[
    [2, 1, 1, 2],
    [3, 1, 2, 1],
    [2, 3, 1, 1],
    [4, 1, 1, 3],
    [3, 2, 2, 1],
    [2, 1, 3, 2],
  ].map(([p, q, r, s]) => buildBivariateExpandVariant(p, q, r, s)),
  ...[
    [2, 1, 1, 1, 2, 2],
    [2, 1, 2, 1, 2, 3],
    [2, 2, 1, 1, 3, 2],
    [1, 1, 1, 1, 2, 2],
    [2, 1, 1, 2, 3, 2],
    [1, 1, 2, 1, 2, 3],
  ].map(([u, v, m, n, p, q]) => buildExponentLawVariant(u, v, m, n, p, q)),
];

const buildSignedExpr = (terms, bodyFn) => {
  const filtered = terms.filter(t => t.coef !== 0);
  if (filtered.length === 0) return '0';

  return filtered.map((t, idx) => {
    const absCoef = Math.abs(t.coef);
    const body = bodyFn(absCoef, t.kind);
    const sign = t.coef < 0 ? '-' : '+';
    if (idx === 0) return sign === '-' ? `-${body}` : body;
    return `${sign}${body}`;
  }).join('');
};

const shuffle = (arr) => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = randInt(0, i);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const gcdInt = (a, b) => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
};

const evalPoly = (coef, x, y) => (
  coef.xx * x * x +
  coef.xy * x * y +
  coef.yy * y * y +
  coef.x * x +
  coef.y * y
);

const evalOption = (a, cSigned, sx, sy, x, y) => (
  (x + sx * y) * (a * x + sy * y + cSigned)
);

const buildPolyExpr = (coef, order, bodyFn) => {
  const terms = order.map((k) => ({ coef: coef[k], kind: k }));
  return buildSignedExpr(terms, bodyFn);
};

const buildLinearExpr = (terms, bodyFn) => buildSignedExpr(terms, bodyFn);

const pickSubPair = (coef, a, cSigned, combos, correctIndex) => {
  const candidates = shuffle([
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 1 },
    { x: 3, y: 2 },
  ]);

  for (const p of candidates) {
    const qVal = evalPoly(coef, p.x, p.y);
    const vals = combos.map(cmb => evalOption(a, cSigned, cmb.sx, cmb.sy, p.x, p.y));
    const same = vals.filter(v => v === qVal).length;
    if (same === 1 && vals[correctIndex] === qVal) {
      return { ...p, qVal, vals };
    }
  }

  const fallback = { x: 2, y: 1 };
  return {
    ...fallback,
    qVal: evalPoly(coef, fallback.x, fallback.y),
    vals: combos.map(cmb => evalOption(a, cSigned, cmb.sx, cmb.sy, fallback.x, fallback.y)),
  };
};

const generateBivariateFactorizationQuestion = () => {
  const a = randInt(2, 4);
  const c = randInt(2, 6);
  const cSign = randInt(0, 1) === 0 ? 1 : -1;
  const cSigned = cSign * c;
  const sx = randInt(0, 1) === 0 ? 1 : -1;
  const sy = randInt(0, 1) === 0 ? 1 : -1;

  const combos = [
    { sx: 1, sy: 1 },
    { sx: 1, sy: -1 },
    { sx: -1, sy: 1 },
    { sx: -1, sy: -1 },
  ];
  const correctIndex = combos.findIndex(cmb => cmb.sx === sx && cmb.sy === sy);

  const coef = {
    xx: a,
    xy: sy + a * sx,
    yy: sx * sy,
    x: cSigned,
    y: sx * cSigned,
  };

  const polyOrders = [
    ['xx', 'xy', 'yy', 'x', 'y'],
    ['xx', 'yy', 'xy', 'x', 'y'],
    ['xx', 'xy', 'x', 'yy', 'y'],
    ['xy', 'xx', 'yy', 'y', 'x'],
  ];
  const polyOrder = polyOrders[randInt(0, polyOrders.length - 1)];

  const firstPerm = randInt(0, 1) === 0 ? [0, 1] : [1, 0];
  const secondPerms = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];
  const secondPerm = secondPerms[randInt(0, secondPerms.length - 1)];

  const renderPolyVar = (absCoef, kind) => {
    if (kind === 'xx') return absCoef === 1 ? 'x^2' : `${absCoef}x^2`;
    if (kind === 'xy') return absCoef === 1 ? 'xy' : `${absCoef}xy`;
    if (kind === 'yy') return absCoef === 1 ? 'y^2' : `${absCoef}y^2`;
    if (kind === 'x') return absCoef === 1 ? 'x' : `${absCoef}x`;
    return absCoef === 1 ? 'y' : `${absCoef}y`;
  };

  const renderPolyVarHL = (absCoef, kind) => {
    const xh = cb(C0, 'x');
    const yh = cb(C1, 'y');
    if (kind === 'xx') return absCoef === 1 ? `${xh}^2` : `${absCoef}${xh}^2`;
    if (kind === 'xy') return absCoef === 1 ? `${xh}${yh}` : `${absCoef}${xh}${yh}`;
    if (kind === 'yy') return absCoef === 1 ? `${yh}^2` : `${absCoef}${yh}^2`;
    if (kind === 'x') return absCoef === 1 ? xh : `${absCoef}${xh}`;
    return absCoef === 1 ? yh : `${absCoef}${yh}`;
  };

  const questionCore = buildPolyExpr(coef, polyOrder, renderPolyVar);
  const questionHighlightCore = buildPolyExpr(coef, polyOrder, renderPolyVarHL);

  const buildOptionLatex = (cmb) => {
    const t1 = [
      { coef: 1, kind: 'x' },
      { coef: cmb.sx, kind: 'y' },
    ];
    const t2 = [
      { coef: a, kind: 'x' },
      { coef: cmb.sy, kind: 'y' },
      { coef: cSigned, kind: 'c' },
    ];

    const s1 = firstPerm.map(i => t1[i]);
    const s2 = secondPerm.map(i => t2[i]);

    const varBody = (absCoef, kind) => {
      if (kind === 'x') return absCoef === 1 ? 'x' : `${absCoef}x`;
      if (kind === 'y') return absCoef === 1 ? 'y' : `${absCoef}y`;
      return `${absCoef}`;
    };

    const f1 = buildLinearExpr(s1, varBody);
    const f2 = buildLinearExpr(s2, varBody);
    return {
      latex: `(${f1})(${f2})`,
      terms1: s1,
      terms2: s2,
    };
  };

  const optionModels = combos.map(buildOptionLatex);
  const options = optionModels.map(m => m.latex);

  const picked = pickSubPair(coef, a, cSigned, combos, correctIndex);

  const renderPolySub = (absCoef, kind) => {
    if (kind === 'xx') return absCoef === 1 ? `(${picked.x})^2` : `${absCoef}(${picked.x})^2`;
    if (kind === 'xy') return absCoef === 1 ? `(${picked.x})(${picked.y})` : `${absCoef}(${picked.x})(${picked.y})`;
    if (kind === 'yy') return absCoef === 1 ? `(${picked.y})^2` : `${absCoef}(${picked.y})^2`;
    if (kind === 'x') return absCoef === 1 ? `(${picked.x})` : `${absCoef}(${picked.x})`;
    return absCoef === 1 ? `(${picked.y})` : `${absCoef}(${picked.y})`;
  };

  const renderPolySubHL = (absCoef, kind) => {
    const xv = cb(C0, String(picked.x));
    const yv = cb(C1, String(picked.y));
    if (kind === 'xx') return absCoef === 1 ? `(${xv})^2` : `${absCoef}(${xv})^2`;
    if (kind === 'xy') return absCoef === 1 ? `(${xv})(${yv})` : `${absCoef}(${xv})(${yv})`;
    if (kind === 'yy') return absCoef === 1 ? `(${yv})^2` : `${absCoef}(${yv})^2`;
    if (kind === 'x') return absCoef === 1 ? `(${xv})` : `${absCoef}(${xv})`;
    return absCoef === 1 ? `(${yv})` : `${absCoef}(${yv})`;
  };

  const polySubCore = buildPolyExpr(coef, polyOrder, renderPolySub);
  const polySubCoreHL = buildPolyExpr(coef, polyOrder, renderPolySubHL);

  const labels = ['A', 'B', 'C', 'D'];

  const optionChecks = optionModels.map((m, i) => {
    const subBody = (absCoef, kind) => {
      if (kind === 'c') return `${absCoef}`;
      const v = kind === 'x' ? picked.x : picked.y;
      return absCoef === 1 ? `(${v})` : `${absCoef}(${v})`;
    };
    const subBodyHL = (absCoef, kind) => {
      if (kind === 'c') return `${absCoef}`;
      const isX = kind === 'x';
      const v = isX ? picked.x : picked.y;
      const colored = isX ? cb(C0, String(v)) : cb(C1, String(v));
      return absCoef === 1 ? `(${colored})` : `${absCoef}(${colored})`;
    };
    const f1Sub = buildLinearExpr(m.terms1, subBody);
    const f2Sub = buildLinearExpr(m.terms2, subBody);
    const f1SubHL = buildLinearExpr(m.terms1, subBodyHL);
    const f2SubHL = buildLinearExpr(m.terms2, subBodyHL);
    return {
      label: labels[i],
      text: `(${f1Sub})(${f2Sub}) = ${picked.vals[i]}`,
      latex: `(${f1SubHL})(${f2SubHL})=${picked.vals[i]}`,
      correct: i === correctIndex,
    };
  });

  const answerLabel = labels[correctIndex];

  return {
    subtypeLabel: '二元因式分解（代入判別）',
    questionLatex: `${questionCore}=`,
    options,
    correctIndex,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [
        { symbol: 'x', value: String(picked.x) },
        { symbol: 'y', value: String(picked.y) },
      ],
      questionText: `${questionCore} =`,
      substitutionText: `x = ${picked.x}, y = ${picked.y}: ${polySubCore} = ${picked.qVal}`,
      questionLatex: `${questionCore}=`,
      questionHighlightLatex: `${questionHighlightCore}=`,
      substitutionLatex: `x=${picked.x},\ y=${picked.y}:\ ${polySubCore}=${picked.qVal}`,
      substitutionHighlightLatex: `${cb(C0, `\\textit{x} = ${picked.x}`)},\ ${cb(C1, `\\textit{y} = ${picked.y}`)}:\ ${polySubCoreHL}=${picked.qVal}`,
      optionChecks,
      answerLabel,
    },
    explanationLines: [
      `\\text{代 }x=${picked.x},y=${picked.y}: ${polySubCore}=${picked.qVal}`,
      `\\therefore \\text{比較所有代入的答案，只有 ${answerLabel} 跟題目的代入答案相同，所以答案為 ${answerLabel}。}`,
    ],
  };
};

const generateExponentProductQuestion = () => {
  const CASIO_SIG_FIGS = 10;
  const CASIO_INT_DIGIT_LIMIT = 10;
  const CASIO_TINY_THRESHOLD = 1e-4;
  const CASIO_MAX = 10n ** 100n;

  const powBigInt = (base, exp) => {
    let out = 1n;
    let b = BigInt(base);
    let e = exp;
    while (e > 0) {
      if (e % 2 === 1) out *= b;
      b *= b;
      e = Math.floor(e / 2);
    }
    return out;
  };

  const toSciLatexFromDigits = (digits) => {
    let exp10 = digits.length - 1;
    const nextDigit = Number(digits[CASIO_SIG_FIGS] || '0');

    // Keep CASIO_SIG_FIGS significant digits and round by the next digit.
    let sig = digits.slice(0, CASIO_SIG_FIGS).padEnd(CASIO_SIG_FIGS, '0');
    if (nextDigit >= 5) {
      sig = (BigInt(sig) + 1n).toString();
      if (sig.length > CASIO_SIG_FIGS) {
        // Example: 9.999... rounds to 1.000... × 10^(k+1)
        sig = sig.slice(0, CASIO_SIG_FIGS);
        exp10 += 1;
      }
    }

    const lead = sig[0];
    const frac = sig.slice(1).padEnd(CASIO_SIG_FIGS - 1, '0');
    return `${lead}.${frac}\\times 10^{${exp10}}`;
  };

  const toCasioLatex = (value) => {
    if (typeof value === 'bigint') {
      if (value > CASIO_MAX) return '\\text{Maths ERROR}';
      const digits = value.toString();
      if (digits.length <= CASIO_INT_DIGIT_LIMIT) return digits;
      return toSciLatexFromDigits(digits);
    }

    if (!Number.isFinite(value)) return '\\text{Maths ERROR}';
    const abs = Math.abs(value);
    if (abs === 0) return '0';
    if (abs >= 1e100) return '\\text{Maths ERROR}';

    const intDigits = abs >= 1 ? Math.floor(abs).toString().length : 1;
    const useSci = intDigits > CASIO_INT_DIGIT_LIMIT || abs < CASIO_TINY_THRESHOLD;
    if (!useSci) return `${value}`;

    const sci = abs.toExponential(CASIO_SIG_FIGS - 1);
    const [mantissa, expPart] = sci.split('e');
    const expNum = Number(expPart);
    const sign = value < 0 ? '-' : '';
    return `${sign}${mantissa}\\times 10^{${expNum}}`;
  };

  // 常見用中小指數；保留少量大數情況作應試訓練
  const bucket = randInt(1, 100);
  const p = bucket <= 82
    ? randInt(4, 16)
    : bucket <= 97
      ? randInt(17, 28)
      : randInt(29, 70);
  const q = 2 * p;
  const nSub = 1;

  const candidates = [
    { base: 6, a: 2, b: q, correct: true },
    { base: 6, a: 4, b: 2 * q, correct: false },
    { base: 12, a: 2, b: q, correct: false },
    { base: 12, a: 3, b: q + 2, correct: false },
  ];

  const shuffled = shuffle(candidates).map((c, idx) => ({ ...c, label: ['A', 'B', 'C', 'D'][idx] }));
  const correctIndex = shuffled.findIndex(c => c.correct);
  const answerLabel = ['A', 'B', 'C', 'D'][correctIndex];

  const fmtExp = (a, b) => {
    const nTerm = a === 1 ? 'n' : `${a}n`;
    if (b === 0) return nTerm;
    return b > 0 ? `${nTerm}+${b}` : `${nTerm}${b}`;
  };

  const qValueBig = powBigInt(4, nSub + p) * powBigInt(3, 2 * nSub + q);
  const qValueLatex = toCasioLatex(qValueBig);

  const optionChecks = shuffled.map((o) => {
    const expNum = o.a * nSub + o.b;
    const valBig = powBigInt(o.base, expNum);
    const valLatex = toCasioLatex(valBig);
    return {
      label: o.label,
      text: `${o.base}^(${o.a}(${nSub})+${o.b}) = ${o.base}^${expNum}`,
      latex: `${o.base}^{${fmtExp(o.a, o.b)}}=${o.base}^{${o.a}(${cb(C0, String(nSub))})+${o.b}}=${o.base}^{${expNum}}=${valLatex}`,
      correct: !!o.correct,
    };
  });

  return {
    subtypeLabel: '指數乘積（適用）',
    questionLatex: `4^{n+${p}}\\cdot 3^{2n+${q}} =`,
    options: shuffled.map(o => `${o.base}^{${fmtExp(o.a, o.b)}}`),
    correctIndex,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [{ symbol: 'n', value: String(nSub) }],
      questionText: `4^(n+${p})*3^(2n+${q}) =`,
      substitutionText: `n = ${nSub}: 4^(${nSub}+${p})*3^(2(${nSub})+${q})`,
      questionLatex: `4^{n+${p}}\\cdot 3^{2n+${q}} =`,
      questionHighlightLatex: `4^{${cb(C0, 'n')}+${p}}\\cdot 3^{2${cb(C0, 'n')}+${q}}=`,
      substitutionLatex: `n=${nSub}:\\ 4^{${nSub}+${p}}\\cdot 3^{2(${nSub})+${q}}=${qValueLatex}`,
      substitutionHighlightLatex: `${cb(C0, `\\textit{n} = ${nSub}`)}:\\ 4^{${cb(C0, String(nSub))}+${p}}\\cdot 3^{2(${cb(C0, String(nSub))})+${q}}=${qValueLatex}`,
      optionChecks,
      answerLabel,
    },
    explanationLines: [
      `\\text{代 }n=${nSub}: 4^{${nSub}+${p}}\\cdot 3^{2(${nSub})+${q}}=${qValueLatex}`,
      `\\therefore \\text{比較所有代入的答案，只有 ${answerLabel} 跟題目的代入答案相同，所以答案為 ${answerLabel}。}`,
    ],
  };
};

const generateParamEquationRootsQuestion = () => {
  const fmtC = (coef) => (coef === 1 ? 'c' : `${coef}c`);
  const labels = ['A', 'B', 'C', 'D'];

  const t = randInt(2, 5); // first root coefficient
  let k = randInt(3, 7);   // second root coefficient
  while (k === t) k = randInt(3, 7);
  const m = 2 * t - 1;     // ensures (m+1)/2 = t

  const keyOfPair = (a, b) => {
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    return `${lo}|${hi}`;
  };
  const correctPair = [t, k];
  const pairSet = new Set([keyOfPair(correctPair[0], correctPair[1])]);
  const wrongPairs = [];
  const candidates = [
    [t, k + 1],
    [Math.max(1, t - 1), k],
    [1, k],
    [t + 1, Math.max(1, k - 1)],
    [k + 1, t + 1],
  ];
  for (const pair of candidates) {
    const key = keyOfPair(pair[0], pair[1]);
    if (!pairSet.has(key)) {
      pairSet.add(key);
      wrongPairs.push(pair);
    }
    if (wrongPairs.length === 3) break;
  }
  while (wrongPairs.length < 3) {
    const a = randInt(1, 8);
    const b = randInt(1, 8);
    const key = keyOfPair(a, b);
    if (!pairSet.has(key)) {
      pairSet.add(key);
      wrongPairs.push([a, b]);
    }
  }

  const toOptionLatex = (pair) => `x=${fmtC(pair[0])}\\text{ 或 }x=${fmtC(pair[1])}`;
  const optionModels = shuffle([
    { roots: correctPair, correct: true },
    ...wrongPairs.map(roots => ({ roots, correct: false })),
  ]).map((m, idx) => ({ ...m, label: labels[idx], latex: toOptionLatex(m.roots) }));

  const options = optionModels.map(m => m.latex);
  const correctIndex = optionModels.findIndex(m => m.correct);
  const answerLabel = labels[correctIndex];

  const reducedVal = (r) => (2 * r - (m + 1)) * (r - k);
  const renderVal = (v) => (v === 0 ? '0' : `${v}c^2`);

  const optionChecks = optionModels.map((opt) => {
    const uniqueRoots = [...new Set(opt.roots)];
    const linesForRoot = (r) => {
      const leftVal = (r - 1) * (r - k);
      const rightVal = (m - r) * (r - k);
      const ok = leftVal === rightVal;
      const status = ok
        ? `\\text{✅ 左 = 右，}x=${fmtC(r)}\\text{ 成立}`
        : `\\text{❌ 左 \\ne 右，}x=${fmtC(r)}\\text{ 不對}`;
      return [
        `x=${fmtC(r)}:`,
        `\\text{左：}(x-c)(x-${fmtC(k)})=(${r}-1)(${r}-${k})c^2=${renderVal(leftVal)}`,
        `\\text{右：}(${fmtC(m)}-x)(x-${fmtC(k)})=(${m}-${r})(${r}-${k})c^2=${renderVal(rightVal)}\\ ${status}`,
      ];
    };
    const bothOk = uniqueRoots.every(r => reducedVal(r) === 0);
    return {
      label: opt.label,
      latexLines: uniqueRoots.flatMap(linesForRoot),
      correct: bothOk,
    };
  });

  return {
    subtypeLabel: '參數方程（解集判別）',
    questionLatex: `\\text{設 }c\\text{ 為常數。解方程 }(x-c)(x-${fmtC(k)})=(${fmtC(m)}-x)(x-${fmtC(k)})`,
    options,
    correctIndex,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [],
      questionLatex: `\\text{設 }c\\text{ 為常數。解方程 }(x-c)(x-${fmtC(k)})=(${fmtC(m)}-x)(x-${fmtC(k)})`,
      substitutionLatex: '\\text{逐一代入選項內 }x\\text{ 值，check 左 = 右}',
      optionChecks,
      answerLabel,
    },
    explanationLines: [],
  };
};

const generateRatioEquationQuestion = () => {
  const pairs = [
    [8, 5], [7, 4], [9, 5], [5, 3], [11, 7], [13, 8],
  ];
  const [a, b] = pairs[randInt(0, pairs.length - 1)];

  const p = randInt(2, 5);
  const q = randInt(2, 6);
  const r = randInt(2, 5);

  // x:y=a:b -> x=at, y=bt; from px=qz-ry => qz=(pa+rb)t
  const numRaw = b * q;
  const denRaw = p * a + r * b;
  const g = gcdInt(numRaw, denRaw);
  const num = numRaw / g;
  const den = denRaw / g;

  const correct = `${num}:${den}`;
  const w1 = `${den}:${num}`;
  const w2 = `${numRaw}:${denRaw}`;
  const w3 = `${num}:${den + 1}`;

  const wrongs = [...new Set([w1, w2, w3].filter(w => w !== correct))];
  while (wrongs.length < 3) {
    const n2 = num + randInt(1, 3);
    const d2 = den + randInt(1, 3);
    const cand = `${n2}:${d2}`;
    if (cand !== correct && !wrongs.includes(cand)) wrongs.push(cand);
  }

  const options = shuffle([correct, ...wrongs.slice(0, 3)]);
  const correctIndex = options.indexOf(correct);
  const labels = ['A', 'B', 'C', 'D'];
  const answerLabel = labels[correctIndex];

  return {
    subtypeLabel: '比例方程（求比值）',
    questionLatex: `\\text{設 }x,y,z\\text{ 均為非零的數。若 }x:y=${a}:${b}\\text{ 及 }${p}x=${q}z-${r}y\\text{，則 }y:z=`,
    options,
    correctIndex,
    explanationAligned: `\\begin{aligned}
&\\text{由 }x:y=${a}:${b}\\text{，可直接代 }x=${a},\\ y=${b}\\\\
&\\text{代入 }${p}x=${q}z-${r}y\\text{：}\\\\
${p}(${a}) & = ${q}z-${r}(${b})\\\\
${p * a} & = ${q}z-${r * b}\\\\
${p * a + r * b} & = ${q}z\\\\
z & = \\dfrac{${p * a + r * b}}{${q}}\\\\
&\\therefore y:z=${b}:\\dfrac{${p * a + r * b}}{${q}}=${b * q}:${p * a + r * b}=${num}:${den}\\\\
&\\therefore \\text{答案是 }\\mathrm{${answerLabel}}\\text{。}
\\end{aligned}`,
    explanationLines: [
      `\\text{由 }x:y=${a}:${b}\\text{，可直接代 }x=${a},\\ y=${b}`,
      `\\text{代入 }${p}x=${q}z-${r}y\\text{： }${p}(${a})=${q}z-${r}(${b})`,
      `\\Rightarrow ${p * a}=${q}z-${r * b}`,
      `\\Rightarrow ${p * a + r * b}=${q}z`,
      `\\Rightarrow z=\\dfrac{${p * a + r * b}}{${q}}`,
      `\\therefore y:z=${b}:\\dfrac{${p * a + r * b}}{${q}}=${b * q}:${p * a + r * b}=${num}:${den}`,
      `\\therefore \\text{答案是 }\\mathrm{${answerLabel}}\\text{。}`,
    ],
  };
};

const buildInequalityOptions = (correct, wrongCandidates, fillerFn) => {
  const wrongs = uniqueWrongs(correct, wrongCandidates, fillerFn);
  const options = shuffle([correct, ...wrongs]);
  return {
    options,
    correctIndex: options.indexOf(correct),
  };
};

const generateInequalityChainQuestion = () => {
  const p = randInt(-6, 1);
  const q = randInt(p + 2, 8);
  const b = randInt(2, 4);
  const c = randInt(-5, 5);

  const L = b * p + c;
  const R = b * q + c;
  const linear = fmtLinear(b, 'y', c);
  const midY = Math.floor((p + q) / 2);

  const correct = `${p}<y\\leq${q}`;
  const { options, correctIndex } = buildInequalityOptions(
    correct,
    [
      `${p}\\leq y<${q}`,
      `${p}<y<${q}`,
      `${p}\\leq y\\leq ${q}`,
      `y<${p}\\ \\text{ 或 }\\ y>${q}`,
    ],
    (i) => `${p - (i + 1)}<y\\leq${q}`
  );

  const labels = ['A', 'B', 'C', 'D'];
  const answerLabel = labels[correctIndex];

  return {
    subtypeLabel: '不等式（鏈式夾擠）',
    variationQ: true,
    questionLatex: `${L}<${linear}\\leq ${R}\\text{ 的解為？}`,
    options,
    correctIndex,
    explanationLines: [
      `\\text{先看題目選項，需試 }y=${p}\\text{、}y=${q}\\text{，以及中間值 }y=${midY}\\text{ 是否滿足不等式。}`,
      `\\text{判準（及）：左右兩邊條件都要同時成立才為✅。}`,
      `\\text{Step 1 試 }y=${midY}\\text{（中間值）}:\\ ${L}<${b}(${midY})${c >= 0 ? '+' : ''}${c}=${b * midY + c}\\leq ${R}\\ \\text{✅}`,
      `\\text{Step 2 試左分界 }y=${p}:\\ ${L}<${b}(${p})${c >= 0 ? '+' : ''}${c}=${L}\\leq ${R}\\ \\text{❌（左邊要嚴格小於）}`,
      `\\text{Step 3 試右分界 }y=${q}:\\ ${L}<${b}(${q})${c >= 0 ? '+' : ''}${c}=${R}\\leq ${R}\\ \\text{✅（右邊可等號）}`,
      `\\text{再試外面兩點 }y=${p - 1},${q + 1}:\\ ${b * (p - 1) + c}\\text{ 太細，} ${b * (q + 1) + c}\\text{ 太大，兩個都 }\\text{❌}`,
      `\\therefore \\text{答案是 }\\mathrm{${answerLabel}}\\text{。}`,
    ],
  };
};

const generateInequalityAndQuestion = () => {
  const A = randInt(-6, 1);
  const B = randInt(A + 2, 7);

  const eq1 = `${fmtLinear(1, 'x', -A)}>0`;
  const eq2 = `${fmtLinear(2, 'x', -2 * B)}\\leq 0`;
  const midX = Math.floor((A + B) / 2);

  const correct = `${A}<x\\leq ${B}`;
  const { options, correctIndex } = buildInequalityOptions(
    correct,
    [
      `${A}\\leq x<${B}`,
      `${A}<x<${B}`,
      `${A}\\leq x\\leq ${B}`,
      `x\\leq ${A}\\ \\text{ 或 }\\ x>${B}`,
    ],
    (i) => `${A - i - 1}<x\\leq ${B}`
  );

  const labels = ['A', 'B', 'C', 'D'];
  const answerLabel = labels[correctIndex];

  return {
    subtypeLabel: '不等式（取「且」）',
    variationQ: true,
    questionLatex: `${eq1}\\ \\text{ 且 }\\ ${eq2}\\text{ 的解為？}`,
    options,
    correctIndex,
    explanationLines: [
      `\\text{先看題目選項，需試 }x=${A}\\text{、}x=${B}\\text{ 及中間值 }x=${midX}\\text{ 是否滿足不等式。}`,
      `\\text{判準（及）：必須同時滿足兩條不等式才為✅。}`,
      `\\text{試 }x=${A}:\\ 0>0\\ \\text{ 且 }\\ ${2 * A - 2 * B}\\leq 0\\ \\text{❌，故 }x=${A}\\text{ 不包括}`,
      `\\text{試 }x=${B}:\\ ${B - A}>0\\ \\text{ 且 }\\ 0\\leq 0\\ \\text{✅，故 }x=${B}\\text{ 包括}`,
      `\\text{再試 }x=${midX}:\\ ${midX - A}>0\\ \\text{ 且 }\\ ${2 * midX - 2 * B}\\leq 0\\ \\text{✅}`,
      `\\text{再試 }x=${B + 1}:\\ ${B + 1 - A}>0\\ \\text{ 但 }\\ ${2 * (B + 1) - 2 * B}\\leq 0\\ \\text{❌}`,
      `\\therefore \\text{答案是 }\\mathrm{${answerLabel}}\\text{。}`,
    ],
  };
};

const generateInequalityOrOutsideQuestion = () => {
  const L = randInt(-8, -2);
  const R = randInt(2, 8);

  const eq1 = `${fmtLinear(1, 'x', -L)}\\leq 0`;
  const eq2 = `${fmtLinear(1, 'x', -R)}\\geq 0`;
  const midX = Math.floor((L + R) / 2);

  const correct = `x\\leq ${L}\\ \\text{ 或 }\\ x\\geq ${R}`;
  const { options, correctIndex } = buildInequalityOptions(
    correct,
    [
      `${L}\\leq x\\leq ${R}`,
      `x<${L}\\ \\text{ 或 }\\ x>${R}`,
      `x\\geq ${L}`,
      `${L}<x<${R}`,
    ],
    (i) => `x\\leq ${L - i - 1}\\ \\text{ 或 }\\ x\\geq ${R}`
  );

  const labels = ['A', 'B', 'C', 'D'];
  const answerLabel = labels[correctIndex];

  return {
    subtypeLabel: '不等式（取「或」）',
    variationQ: true,
    questionLatex: `${eq1}\\ \\text{ 或 }\\ ${eq2}\\text{ 的解為？}`,
    options,
    correctIndex,
    explanationLines: [
      `\\text{先看題目選項，需試 }x=${L}\\text{、}x=${R}\\text{ 及中間值 }x=${midX}\\text{ 是否滿足不等式。}`,
      `\\text{判準（或）：滿足其中一條不等式即為✅。}`,
      `\\text{試 }x=${L}:\\ ${L - L}\\leq 0\\ \\text{✅}`,
      `\\text{試 }x=${R}:\\ ${R - R}\\geq 0\\ \\text{✅}`,
      `\\text{再試 }x=${midX}:\\ ${midX - L}\\leq 0\\ \\text{❌，且 }\\ ${midX - R}\\geq 0\\ \\text{❌}`,
      `\\text{再試外面兩點 }x=${L - 1},${R + 1}:\\ x=${L - 1}\\text{ 令第一條 }\\text{✅}，x=${R + 1}\\text{ 令第二條 }\\text{✅}`,
      `\\therefore \\text{答案是 }\\mathrm{${answerLabel}}\\text{。}`,
    ],
  };
};

const generateInequalityNotEqualQuestion = () => {
  const k = randInt(-6, 6);
  const a = k + randInt(2, 6);
  const b = a - k;
  const d = randInt(2, 5);
  const e = randInt(1, 4);
  const c = k + d * e;

  const eq1 = `${fmtLinear(1, 'x', -a)}<-${b}`;
  const eq2 = `\\dfrac{${c}-x}{${d}}<${e}`;

  const correct = `x\\ne ${k}`;
  const { options, correctIndex } = buildInequalityOptions(
    correct,
    [
      `x<${k}`,
      `x>${k}`,
      `x=${k}`,
      `x\\leq ${k}\\ \\text{ 或 }\\ x\\geq ${k}`,
    ],
    (i) => `x\\ne ${k + i + 1}`
  );

  const labels = ['A', 'B', 'C', 'D'];
  const answerLabel = labels[correctIndex];

  return {
    subtypeLabel: '不等式（夾外解）',
    variationQ: true,
    questionLatex: `${eq1}\\ \\text{ 或 }\\ ${eq2}\\text{ 的解為？}`,
    options,
    correctIndex,
    explanationLines: [
      `\\text{先看題目選項，需試 }x=${k}\\text{、}x>${k}\\text{（選 }x=${k + 1}\\text{）及 }x<${k}\\text{（選 }x=${k - 1}\\text{）是否滿足不等式。}`,
      `\\text{判準（或）：滿足其中一條不等式即為✅。}`,
      `\\text{Step 1 試分界位 }x=${k}\\text{：試 }x=${k}\\text{ 出 }${k - a}<-${b}\\text{。}`,
      `\\text{Step 2 試 }x=${k - 1}:\\ ${k - 1 - a}<-${b}\\ \\text{✅，第二條 }\\text{❌}`,
      `\\text{Step 3 試 }x=${k + 1}:\\ ${k + 1 - a}<-${b}\\ \\text{❌，但 }\\dfrac{${c}-${k + 1}}{${d}}<${e}\\ \\text{✅}`,
      `\\text{兩邊都可成立，但 }x=${k}\\text{ 唔得，所以只排除 }x=${k}`,
      `\\therefore \\text{答案是 }\\mathrm{${answerLabel}}\\text{。}`,
    ],
  };
};

export const generateSubstitutionQuestion = () => {
  const bank = [
    ...QUESTION_BANK,
    ...EXTRA_VARIANTS,
    generateBivariateFactorizationQuestion(),
    generateExponentProductQuestion(),
    generateParamEquationRootsQuestion(),
    generateRatioEquationQuestion(),
    generateInequalityChainQuestion(),
    generateInequalityAndQuestion(),
    generateInequalityOrOutsideQuestion(),
    generateInequalityNotEqualQuestion(),
  ];
  const q = bank[randInt(0, bank.length - 1)];
  return {
    ...q,
    options: [...q.options],
    explanationLines: [...q.explanationLines],
  };
};
