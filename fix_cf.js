const fs = require('fs');
const file = 'src/apps/DispersionQuiz.jsx';
let content = fs.readFileSync(file, 'utf8');

// The function is named generateLV2CumulativeFreq, let's just replace its body.
const newFunc = \const generateLV2CumulativeFreq = () => {
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
            label: '(a)', question: '求 $ 的值', answer: cumFreqs[idx], steps: [
                \\\x = \ + \\\\,
                \\\x = \\\\
            ]
        });
    } else if (scenario === 2) {
        const idx = Math.floor(Math.random() * (numClasses - 1)) + 1;
        freqDisplays[idx] = 'x';
        parts.push({
            label: '(a)', question: '求 $ 的值', answer: freqs[idx], steps: [
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
            label: '(a)', question: '求 $ 的值', answer: cumFreqs[xIdx], steps: [
                \\\x = \ + \\\\,
                \\\x = \\\\
            ]
        });
        parts.push({
            label: '(b)', question: '求 $ 的值', answer: freqs[yIdx], steps: [
                \\\y = \ - x\\\,
                \\\y = \ - \\\\,
                \\\y = \\\\
            ]
        });
    } else if (scenario === 4) {
        let xIdx = 1;
        let yIdx = 2;
        let zIdx = 3 >= numClasses ? 2 : 3;
        if (zIdx === 2) {
            yIdx = 1;
            zIdx = 2;
        } else {
            yIdx = 2;
            zIdx = 3;
        }
        freqDisplays[xIdx] = 'x';
        cfDisplays[yIdx] = 'y';
        freqDisplays[zIdx] = 'z';
        parts.push({
            label: '(a)', question: '求 $ 的值', answer: freqs[xIdx], steps: [
                \\\x = \ - \\\\,
                \\\x = \\\\
            ]
        });
        parts.push({
            label: '(b)', question: '求 $ 的值', answer: cumFreqs[yIdx], steps: [
                \\\y = \ + \\\\,
                \\\y = \\\\
            ]
        });
        parts.push({
            label: '(c)', question: '求 $ 的值', answer: freqs[zIdx], steps: [
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
};\;
const match = /const generateLV2CumulativeFreq = \(\) => \\{[\\s\\S]*?  return null;\\n};/.exec(content);
content = content.replace(match[0], newFunc);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed parts for multiple answers');
