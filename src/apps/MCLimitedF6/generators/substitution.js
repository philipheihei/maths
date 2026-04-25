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
      substitutionText: 'x=2：(9-1)/2 = 4',
      questionLatex: '\\dfrac{(x+1)^2-(x-1)^2}{2} =',
      questionHighlightLatex: `\\dfrac{(${cb(C0,'x')}+1)^2-(${cb(C0,'x')}-1)^2}{2}=`,
      substitutionLatex: 'x=2:\\ \\dfrac{9-1}{2}=4',
      substitutionHighlightLatex: `${cb(C0,'x')}=${cb(C0,'2')}:\\ \\dfrac{9-1}{2}=4`,
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
      '\\therefore \\text{答案為 A}',
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
      substitutionText: 'n=2：(4^3*8^2)/2^8 = 16',
      questionLatex: '\\dfrac{4^{n+1}\\cdot 8^n}{2^{3n+2}} =',
      questionHighlightLatex: `\\dfrac{4^{${cb(C0,'n')}+1}\\cdot 8^{${cb(C0,'n')}}}{2^{3${cb(C0,'n')}+2}}=`,
      substitutionLatex: 'n=2:\\ \\dfrac{4^3\\cdot 8^2}{2^8}=16',
      substitutionHighlightLatex: `${cb(C0,'n')}=${cb(C0,'2')}:\ \\dfrac{4^3\\cdot 8^2}{2^8}=16`,
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
      '\\therefore \\text{答案為 B}',
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
      substitutionText: 'k=2：1/4+3/4 = 1',
      questionLatex: '\\dfrac{1}{k+2}+\\dfrac{3}{5k-6} =',
      questionHighlightLatex: `\\dfrac{1}{${cb(C0,'k')}+2}+\\dfrac{3}{5${cb(C0,'k')}-6}=`,
      substitutionLatex: 'k=2:\\ \\dfrac14+\\dfrac34=1',
      substitutionHighlightLatex: `${cb(C0,'k')}=${cb(C0,'2')}:\ \\dfrac{1}{4}+\\dfrac{3}{4}=1`,
      optionChecks: [
        { label: 'A', text: '(-8k)/((k+2)(5k-6)) = -16/16 = -1', latex: `\\dfrac{-8${cb(C0,'k')}}{(${cb(C0,'k')}+2)(5${cb(C0,'k')}-6)}=\\dfrac{-16}{16}=-1`, correct: false },
        { label: 'B', text: '(-2k)/((k+2)(5k-6)) = -4/16 = -1/4', latex: `\\dfrac{-2${cb(C0,'k')}}{(${cb(C0,'k')}+2)(5${cb(C0,'k')}-6)}=\\dfrac{-4}{16}=-\\dfrac14`, correct: false },
        { label: 'C', text: '(2k)/((k+2)(5k-6)) = 4/16 = 1/4', latex: `\\dfrac{2${cb(C0,'k')}}{(${cb(C0,'k')}+2)(5${cb(C0,'k')}-6)}=\\dfrac{4}{16}=\\dfrac14`, correct: false },
        { label: 'D', text: '(8k)/((k+2)(5k-6)) = 16/16 = 1', latex: `\\dfrac{8${cb(C0,'k')}}{(${cb(C0,'k')}+2)(5${cb(C0,'k')}-6)}=\\dfrac{16}{16}=1`, correct: true },
      ],
      answerLabel: 'D',
    },
    explanationLines: [
      '\\text{代 }k=2\\text{（分母不為 0）}: \\dfrac{1}{4}+\\dfrac{3}{4}=1',
      '\\text{A: }\\dfrac{-8k}{(k+2)(5k-6)}=\\dfrac{-16}{16}=-1\\text{，錯}',
      '\\text{B: }\\dfrac{-2k}{(k+2)(5k-6)}=\\dfrac{-4}{16}=-\\dfrac14\\text{，錯}',
      '\\text{C: }\\dfrac{2k}{(k+2)(5k-6)}=\\dfrac{4}{16}=\\dfrac14\\text{，錯}',
      '\\text{D: }\\dfrac{8k}{(k+2)(5k-6)}=\\dfrac{16}{16}=1\\text{，對}',
      '\\therefore \\text{答案為 D}',
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
      substitutionText: 'α=2，β=3：(4-3)^2 + (2-6)^2 = 17',
      questionLatex: '(2\\alpha-\\beta)^2+(\\alpha-2\\beta)^2 =',
      questionHighlightLatex: `(2${cb(C0,'α')}-${cb(C1,'β')})^2+(${cb(C0,'α')}-2${cb(C1,'β')})^2=`,
      substitutionLatex: '\\alpha=2,\\ \\beta=3:\\ (4-3)^2+(2-6)^2=17',
      substitutionHighlightLatex: `${cb(C0,'α')}=${cb(C0,'2')},\\ ${cb(C1,'β')}=${cb(C1,'3')}:\\ (4-3)^2+(2-6)^2=17`,
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
      '\\therefore \\text{答案為 D}',
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
      substitutionText: 'x=3：((27*3)^5)/(3*(3^-2))^4 = 3^24',
      questionLatex: '\\dfrac{(27x)^5}{(3x^{-2})^4} =',
      questionHighlightLatex: `\\dfrac{(27${cb(C0,'x')})^5}{(3${cb(C0,'x')}^{-2})^4}=`,
      substitutionLatex: 'x=3:\\ \\dfrac{(27\\cdot 3)^5}{(3\\cdot 3^{-2})^4}=3^{24}',
      substitutionHighlightLatex: `${cb(C0,'x')}=${cb(C0,'3')}:\ \\dfrac{(27\\cdot${cb(C0,'3')})^5}{(3\\cdot${cb(C0,'3')}^{-2})^4}=3^{24}`,
      optionChecks: [
        { label: 'A', text: '3^2x^3 = 3^2(3)^3 = 3^5', latex: `3^2${cb(C0,'x')}^3=3^2\\cdot(${cb(C0,'3')})^3=3^5`, correct: false },
        { label: 'B', text: '3^4x^3 = 3^4(3)^3 = 3^7', latex: `3^4${cb(C0,'x')}^3=3^4\\cdot(${cb(C0,'3')})^3=3^7`, correct: false },
        { label: 'C', text: '3^11x^13 = 3^11(3)^13 = 3^24', latex: `3^{11}${cb(C0,'x')}^{13}=3^{11}\\cdot(${cb(C0,'3')})^{13}=3^{24}`, correct: true },
        { label: 'D', text: '3^14x^13 = 3^14(3)^13 = 3^27', latex: `3^{14}${cb(C0,'x')}^{13}=3^{14}\\cdot(${cb(C0,'3')})^{13}=3^{27}`, correct: false },
      ],
      answerLabel: 'C',
    },
    explanationLines: [
      '\\text{代 }x=3: \\dfrac{(27x)^5}{(3x^{-2})^4}=3^{24}',
      '\\text{A: }3^2x^3=3^2\\cdot 3^3=3^5\\text{，錯}',
      '\\text{B: }3^4x^3=3^4\\cdot 3^3=3^7\\text{，錯}',
      '\\text{C: }3^{11}x^{13}=3^{11}\\cdot 3^{13}=3^{24}\\text{，對}',
      '\\text{D: }3^{14}x^{13}=3^{14}\\cdot 3^{13}=3^{27}\\text{，錯}',
      '\\therefore \\text{答案為 C}',
    ],
  },
  {
    subtypeLabel: '題型判斷（不適用）',
    questionLatex: '\\text{以下哪題不適合使用代入法？}',
    options: [
      '(a+b)^2-(a-b)^2 \\text{ 的化簡}',
      '\\dfrac{3^{2n}}{9^{n-1}} \\text{ 的化簡}',
      '2x+3>x-1 \\text{ 或 } x+5\\le 0',
      '\\dfrac{x^2-4}{x+2} \\text{ 的化簡}',
    ],
    correctIndex: 2,
    explanationMode: 'substitution',
    substitutionView: {
      variables: [
        { symbol: 'x', value: '2' },
      ],
      questionText: '以下哪題不適合使用代入法？',
      substitutionText: 'x=2（此題為題型判斷，重點在是否可代入）',
      questionLatex: '\\text{以下哪題不適合使用代入法？}',
      questionHighlightLatex: '\\text{以下哪題不適合使用代入法？}',
      substitutionLatex: '\\text{題型判斷題，重點是辨識是否適用代入法}',
      substitutionHighlightLatex: '\\text{題型判斷題，重點是辨識是否適用代入法}',
      optionChecks: [
        { label: 'A', text: '代數式化簡，可用代入法', latex: '\\text{代數式化簡，可用代入法}', correct: false },
        { label: 'B', text: '指數化簡，可用代入法', latex: '\\text{指數化簡，可用代入法}', correct: false },
        { label: 'C', text: '不等式範圍題，不適合代入法', latex: '\\text{不等式範圍題，不適合代入法}', correct: true },
        { label: 'D', text: '分式化簡，可用代入法', latex: '\\text{分式化簡，可用代入法}', correct: false },
      ],
      answerLabel: 'C',
    },
    explanationLines: [
      '\\text{A: 代數式化簡，可用代入法，錯}',
      '\\text{B: 指數化簡，可用代入法，錯}',
      '\\text{C: 不等式範圍題，不適合代入法，對}',
      '\\text{D: 分式化簡，可用代入法，錯}',
      '\\therefore \\text{答案為 C}',
    ],
  },
];

export const generateSubstitutionQuestion = () => {
  const q = QUESTION_BANK[randInt(0, QUESTION_BANK.length - 1)];
  return {
    ...q,
    options: [...q.options],
    explanationLines: [...q.explanationLines],
  };
};
