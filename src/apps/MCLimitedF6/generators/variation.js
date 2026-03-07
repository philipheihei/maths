import { shuffle, randInt } from '../utils.js';

// Helper: format LaTeX term like x, x^{2}, \sqrt{x}
const powL = (v, p) => {
  if (p === 0) return '';
  if (p === 1) return v;
  if (p === 0.5) return `\\sqrt{${v}}`;
  return `${v}^{${p}}`;
};

const genJointVariationQ = () => {
  const varGroups = [
    { main: 'z', v1: 'x', v2: 'y' },
    { main: 'w', v1: 'x', v2: 'y' },
    { main: 'z', v1: 'u', v2: 'v' },
    { main: 'w', v1: 'a', v2: 'b' },
    { main: 'z', v1: 'a', v2: 'b' },
  ];
  const { main, v1, v2 } = varGroups[randInt(0, varGroups.length - 1)];

  const powTypes = [
    { p1: 1, p2: 2, p1Desc: '',   p2Desc: '平方', sqrt: false, recip: false },
    { p1: 2, p2: 3, p1Desc: '平方', p2Desc: '立方', sqrt: false, recip: false },
    { p1: 1, p2: 3, p1Desc: '',   p2Desc: '立方', sqrt: false, recip: false },
    { p1: 2, p2: 1, p1Desc: '平方', p2Desc: '',   sqrt: false, recip: false },
    { p1: 3, p2: 2, p1Desc: '立方', p2Desc: '平方', sqrt: false, recip: false },
    { p1: 1, p2: 1, p1Desc: '',   p2Desc: '',     sqrt: false, recip: false },
    { p1: 0.5, p2: 2, p1Desc: '平方根', p2Desc: '平方', sqrt: true,  recip: false },
    { p1: 0.5, p2: 3, p1Desc: '平方根', p2Desc: '立方', sqrt: true,  recip: false },
    { p1: 1, p2: 2, p1Desc: '',   p2Desc: '平方', sqrt: false, recip: true },
    { p1: 2, p2: 1, p1Desc: '平方', p2Desc: '',   sqrt: false, recip: true },
    { p1: 3, p2: 2, p1Desc: '立方', p2Desc: '平方', sqrt: false, recip: true },
    { p1: 1, p2: 3, p1Desc: '',   p2Desc: '立方', sqrt: false, recip: true },
  ];
  const { p1, p2, p1Desc, p2Desc, sqrt: isSqrt, recip: isRecip } = powTypes[randInt(0, powTypes.length - 1)];

  const v1Desc = p1Desc ? `${v1}的${p1Desc}` : v1;
  const v2Desc = p2Desc ? `${v2}的${p2Desc}` : v2;
  const qLatex = `\\text{若 } ${main} \\text{ 隨 } ${v1Desc} \\text{ 正變且隨 } ${v2Desc} \\text{ 反變，下列何者必為常數？}`;

  let correctLatex, hintLine;
  if (isSqrt) {
    const numStr = `${powL(main, 2)}${powL(v2, 2 * p2)}`;
    const denStr = v1;
    correctLatex = `\\frac{${numStr}}{${denStr}}`;
    hintLine = `${main}=\\frac{k\\sqrt{${v1}}}{${powL(v2,p2)}} \\\\ \\frac{${numStr}}{${denStr}}=k^2=\\text{常數}`;
  } else if (isRecip) {
    const numStr = powL(v1, p1) || '1';
    const denStr = [main, powL(v2, p2)].filter(Boolean).join('');
    correctLatex = `\\frac{${numStr}}{${denStr}}`;
    hintLine = `${main}=\\frac{k${powL(v1,p1)}}{${powL(v2,p2)}} \\\\ \\frac{${numStr}}{${denStr}}=\\frac{1}{k}=\\text{常數}`;
  } else {
    const numParts = [main, powL(v2, p2)].filter(Boolean);
    const numStr = numParts.join('');
    const denStr = powL(v1, p1) || '1';
    correctLatex = denStr === '1' ? numStr : `\\frac{${numStr}}{${denStr}}`;
    hintLine = `${main}=\\frac{k${powL(v1,p1)}}{${powL(v2,p2)}} \\\\ \\frac{${numStr}}{${denStr}}=k=\\text{常數}`;
  }

  const v1p = isSqrt ? v1 : powL(v1, p1);
  const v2p = isSqrt ? powL(v2, 2 * p2) : powL(v2, p2);
  const mainSq = powL(main, 2);

  const wrongCandidates = [
    `\\frac{${main}${v1p}}{${v2p}}`,
    `\\frac{${v1p}}{${main}${v2p}}`,
    `\\frac{${mainSq}${v1p}}{${v2p}}`,
    `${main}${v1p}${v2p}`,
    `\\frac{${v2p}}{${main}${v1p}}`,
  ];

  const uniqueWrongs = [...new Set(wrongCandidates)]
    .filter(w => w !== correctLatex)
    .slice(0, 3);
  while (uniqueWrongs.length < 3) uniqueWrongs.push(`\\frac{${main}^{${uniqueWrongs.length+2}}}{${v1p}${v2p}}`);

  const opts = shuffle([correctLatex, ...uniqueWrongs.slice(0, 3)]);

  const df = (n, d) => `\\dfrac{${n}}{${d}}`;
  let explanationAligned;
  if (isSqrt) {
    const sqrtKNum = `${main}${powL(v2,p2)}`;
    explanationAligned = [
      `\\displaystyle\\begin{array}{l}`,
      `\\text{先嘗試找 } k \\\\[6pt]`,
      `\\quad ${main} = ${df(`k\\sqrt{${v1}}`, powL(v2,p2))} \\\\[10pt]`,
      `\\quad ${df(sqrtKNum, `\\sqrt{${v1}}`)} = k \\quad\\text{（此式含 }\\sqrt{\\,}\\text{，不在選項中）} \\\\[14pt]`,
      `\\text{改為嘗試找 } k^2 \\\\[6pt]`,
      `\\quad ${correctLatex} = k^2 \\quad\\checkmark\\text{（此式在選項中）} \\\\[14pt]`,
      `\\therefore \\text{答案為 } ${correctLatex}`,
      `\\end{array}`,
    ].join('\n');
  } else if (isRecip) {
    const recipNumStr = powL(v1, p1) || '1';
    const recipDenStr = [main, powL(v2, p2)].filter(Boolean).join('');
    explanationAligned = [
      `\\displaystyle\\begin{array}{l}`,
      `\\text{嘗試找 } \\dfrac{1}{k} \\\\[6pt]`,
      `\\quad ${main} = ${df(`k${powL(v1,p1)}`, powL(v2,p2))} \\\\[10pt]`,
      `\\quad ${df(recipNumStr, recipDenStr)} = \\dfrac{1}{k} \\quad\\checkmark\\text{（此式在選項中）} \\\\[14pt]`,
      `\\therefore \\text{答案為 } ${correctLatex}`,
      `\\end{array}`,
    ].join('\n');
  } else {
    const numParts = [main, powL(v2, p2)].filter(Boolean).join('');
    const denStr = powL(v1, p1) || '1';
    explanationAligned = [
      `\\displaystyle\\begin{array}{l}`,
      `\\text{先嘗試找 } k \\\\[6pt]`,
      `\\quad ${main} = ${df(`k${powL(v1,p1)}`, powL(v2,p2))} \\\\[10pt]`,
      `\\quad ${correctLatex} = k \\quad\\checkmark\\text{（此式在選項中）} \\\\[14pt]`,
      `\\therefore \\text{答案為 } ${correctLatex}`,
      `\\end{array}`,
    ].join('\n');
  }

  return {
    questionLatex: qLatex,
    options: opts,
    correctIndex: opts.indexOf(correctLatex),
    explanationAligned,
    variationQ: true,
    subtypeLabel: '變分常數',
  };
};

export const generateVariationQuestion = () => genJointVariationQ();
