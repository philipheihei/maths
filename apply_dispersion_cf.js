const fs = require('fs');
const file = 'src/apps/DispersionQuiz.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add LV2_CF_CONTEXTS and generateLV2CumulativeFreq before LV2_GENERATORS
const newGenCode = \
const LV2_CF_CONTEXTS = [
  { label: '時間', unit: '分鐘', varName: 't' },
  { label: '高度', unit: 'cm', varName: 'h' },
  { label: '重量', unit: 'kg', varName: 'w' },
  { label: '距離', unit: 'm', varName: 'd' },
];

const generateLV2CumulativeFreq = () => {
  for (let attempt = 0; attempt < 300; attempt++) {
    const numClasses = 4 + Math.floor(Math.random() * 2); // 4 or 5
    const ctx = LV2_CF_CONTEXTS[Math.floor(Math.random() * LV2_CF_CONTEXTS.length)];
    const startVal = 10 + Math.floor(Math.random() * 40);
    const classWidth = (Math.floor(Math.random() * 2) + 1) * 5; // 5 or 10

    const limits = [];
    const lessThans = [];
    for (let i = 0; i < numClasses; i++) {
        limits.push(\\\\\\\\textstyle \ \\\\\le \ < \\\\);
        lessThans.push(\\\\\\\\textstyle < \\\\);
    }

    const freqs = Array.from({ length: numClasses }, () => Math.floor(Math.random() * 10) + 2);
    const cumFreqs = [];
    let sum = 0;
    for (let i = 0; i < numClasses; i++) {
        sum += freqs[i];
        cumFreqs.push(sum);
    }

    const numHidden = Math.floor(Math.random() * 3) + 1; // 1 to 3
    const scenario = numHidden === 1 ? (Math.random() < 0.5 ? 1 : 2) : numHidden === 2 ? 3 : 4;
    
    let freqDisplays = [...freqs];
    let cfDisplays = [...cumFreqs];
    let parts = [];
    
    if (scenario === 1) {
        const idx = Math.floor(Math.random() * (numClasses - 1)) + 1;
        cfDisplays[idx] = 'x';
        parts.push({
            label: '(a)', question: '求 $ 的值。', answer: cumFreqs[idx], steps: [
                \\\x = \ + \\\\,
                \\\x = \\\\
            ]
        });
    } else if (scenario === 2) {
        const idx = Math.floor(Math.random() * (numClasses - 1)) + 1;
        freqDisplays[idx] = 'x';
        parts.push({
            label: '(a)', question: '求 $ 的值。', answer: freqs[idx], steps: [
                \\\x = \ - \\\\,
                \\\x = \\\\
            ]
        });
    } else if (scenario === 3) {
        const xIdx = 1;
        const yIdx = 2;
        cfDisplays[xIdx] = 'x';
        freqDisplays[yIdx] = 'y';
        parts.push({
            label: '(a)', question: '求 $ 的值。', answer: cumFreqs[xIdx], steps: [
                \\\x = \ + \\\\,
                \\\x = \\\\
            ]
        });
        parts.push({
            label: '(b)', question: '求 $ 的值。', answer: freqs[yIdx], steps: [
                \\\y = \ - x\\\,
                \\\y = \ - \\\\,
                \\\y = \\\\
            ]
        });
    } else if (scenario === 4) {
        const xIdx = 1;
        const yIdx = 2;
        const zIdx = 3 >= numClasses ? 2 : 3;
        if (zIdx === 2) continue;
        freqDisplays[xIdx] = 'x';
        cfDisplays[yIdx] = 'y';
        freqDisplays[zIdx] = 'z';
        parts.push({
            label: '(a)', question: '求 $ 的值。', answer: freqs[xIdx], steps: [
                \\\x = \ - \\\\,
                \\\x = \\\\
            ]
        });
        parts.push({
            label: '(b)', question: '求 $ 及 $ 的值。', answer: '', steps: [
                \\\y = \ + \\\\,
                \\\y = \\\\,
                \\\z = \ - y\\\,
                \\\z = \ - \\\\,
                \\\z = \\\\
            ]
        });
    }

    return {
      type: 'cumulative-freq-unknown',
      context: \\\下表顯示某班學生\的頻數分佈表及累積頻數分佈表\\\,
      xLabelFreq: \\\\（\）\\\,
      xLabelCf: \\\\少於（\）\\\,
      limits,
      lessThans,
      freqDisplays,
      cfDisplays,
      parts
    };
  }
  return null;
};

// 題型生成器陣列 — 新增題型時只需在此加入新函數
const LV2_GENERATORS = [\;

content = content.replace('// 題型生成器陣列 — 新增題型時只需在此加入新函數\\nconst LV2_GENERATORS = [', newGenCode);

// 2. Add generateLV2CumulativeFreq to LV2_GENERATORS
content = content.replace(
  'generateLV2FreqModeK,\\n];',
  'generateLV2FreqModeK,\\n  generateLV2CumulativeFreq,\\n];'
);

// 3. Add LV2CumulativeFreqTableDisplay component
const newCompCode = \
// LV2 累積頻數表顯示元件
const LV2CumulativeFreqTableDisplay = ({ xLabelFreq, xLabelCf, limits, lessThans, freqDisplays, cfDisplays }) => (
  <div className="flex flex-col sm:flex-row gap-4 my-3 justify-center items-start">
    <div className="overflow-x-auto border border-gray-300 shadow-sm rounded-lg flex-1">
      <table className="border-collapse bg-white text-sm sm:text-base w-full">
        <thead>
          <tr>
            <th className="border border-slate-400 px-4 py-2 font-bold text-center bg-blue-50 text-blue-800">
              {xLabelFreq}
            </th>
            <th className="border border-slate-400 px-4 py-2 font-bold text-center bg-blue-50 text-blue-800">
              頻數
            </th>
          </tr>
        </thead>
        <tbody>
          {limits.map((limit, i) => (
            <tr key={\\\-\\\\} className="hover:bg-slate-50">
              <td className="border border-slate-300 px-4 py-2 text-center whitespace-nowrap"><KaTeXValue value={limit} /></td>
              <td className={\\\order border-slate-300 px-4 py-2 text-center font-bold \\\\}>{freqDisplays[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    <div className="overflow-x-auto border border-gray-300 shadow-sm rounded-lg flex-1">
      <table className="border-collapse bg-white text-sm sm:text-base w-full">
        <thead>
          <tr>
            <th className="border border-slate-400 px-4 py-2 font-bold text-center bg-emerald-50 text-emerald-800">
              {xLabelCf}
            </th>
            <th className="border border-slate-400 px-4 py-2 font-bold text-center bg-emerald-50 text-emerald-800">
              累積頻數
            </th>
          </tr>
        </thead>
        <tbody>
          {lessThans.map((lt, i) => (
            <tr key={\\\cf-\\\\} className="hover:bg-slate-50">
              <td className="border border-slate-300 px-4 py-2 text-center whitespace-nowrap"><KaTeXValue value={lt} /></td>
              <td className={\\\order border-slate-300 px-4 py-2 text-center font-bold \\\\}>{cfDisplays[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// LV2 頻數表顯示元件\;

content = content.replace('// LV2 頻數表顯示元件', newCompCode);


// 4. Update LV2App render
const displayReplaceCode = \
          <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
            <p className="text-slate-700 font-medium mb-1">{lv2Q.context}。</p>
            {lv2Q.type === 'cumulative-freq-unknown' ? (
              <LV2CumulativeFreqTableDisplay 
                xLabelFreq={lv2Q.xLabelFreq} xLabelCf={lv2Q.xLabelCf}
                limits={lv2Q.limits} lessThans={lv2Q.lessThans}
                freqDisplays={lv2Q.freqDisplays} cfDisplays={lv2Q.cfDisplays}
              />
            ) : lv2Q.type === 'stem-leaf-unknown' ? (\;

content = content.replace(
  '<div className="bg-white rounded-xl shadow-lg p-5 mb-4">\\n            <p className="text-slate-700 font-medium mb-1">{lv2Q.context}。</p>\\n            {lv2Q.type === \\'stem-leaf-unknown\\' ? (',
  displayReplaceCode
);

fs.writeFileSync(file, content, 'utf8');
console.log('Done!');
