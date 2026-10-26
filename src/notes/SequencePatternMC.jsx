import React from 'react';

const ChoiceDot = ({ label }) => <span className="inline-block w-6">{label}.</span>;

const DotPattern = ({ rows, count, label }) => {
  const points = rows.flatMap((rowCount, rowIndex) => Array.from({ length: rowCount }, (_, pointIndex) => ({
    cx: 70 + (pointIndex - (rowCount - 1) / 2) * 20,
    cy: 28 + rowIndex * 20
  })));

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 120" className="w-full h-28" role="img" aria-label={`${label}，${count} 粒點`}>
        {points.map((point, index) => <circle key={index} cx={point.cx} cy={point.cy} r="4.5" fill="#64748b" stroke="#1e293b" strokeWidth="1" />)}
      </svg>
      <span className="text-red-600 font-bold text-sm">{label}：{count} 粒</span>
    </div>
  );
};

const PatternArrow = () => (
  <svg viewBox="0 0 48 28" className="w-12 h-7 shrink-0" aria-hidden="true">
    <path d="M2 8 H32 V2 L46 14 L32 26 V20 H2 Z" fill="#9ca3af" stroke="#334155" strokeWidth="1.5" />
  </svg>
);

export const SequencePatternMC = () => (
  <div className="space-y-4">
    <div className="bg-red-50 rounded-lg p-5 border border-red-200">
      <h3 className="font-bold text-red-800 mb-3 text-lg">圖像數列 MC 解題方法</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="bg-white rounded-lg p-3 border border-red-100"><span className="font-bold text-red-600">1. 紅字：</span>先 mark 每張圖的點子數目。</div>
        <div className="bg-white rounded-lg p-3 border border-blue-100"><span className="font-bold text-blue-600">2. 藍字：</span>找每兩個圖案相差多少。</div>
        <div className="bg-white rounded-lg p-3 border border-amber-100"><span className="font-bold text-slate-700">3. 留意：</span>題目問第幾個圖案的點子數目。</div>
        <div className="bg-white rounded-lg p-3 border border-purple-100"><span className="font-bold text-purple-600">4. 紫字：</span>逐個列數至目標項。</div>
      </div>
      <p className="mt-4 bg-white rounded-lg p-3 text-sm text-slate-700">
        圖案只是幫你看出規律；最穩陣的方法是先數點，再寫出數列，最後逐項數到題目要求的項數。
      </p>
      <p className="mt-2 text-sm text-slate-700"><span className="font-bold text-blue-600">相差數</span>可以是固定數、遞增雙數或遞增單數，例如：+4、+4、+4……，或 +4、+5、+6……。</p>
    </div>

    <div className="bg-white rounded-lg p-4 border border-slate-200">
      <h3 className="font-bold text-slate-800 mb-2">例題</h3>
      <p className="text-sm text-slate-700 mb-3">圖中，第 1 個圖案包含 6 粒點子。對任意正整數 n，第 (n+1) 個圖案是由第 n 個圖案加上 (n+3) 粒點子所組成。求<span className="bg-yellow-200 px-1 rounded">第 9 個圖案</span>的點子數目。</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
        <DotPattern rows={[1, 2, 3]} count="6" label="第1個圖案" />
        <PatternArrow />
        <DotPattern rows={[1, 2, 3, 4]} count="10" label="第2個圖案" />
        <PatternArrow />
        <DotPattern rows={[1, 2, 3, 4, 5]} count="15" label="第3個圖案" />
      </div>
      <div className="mb-3 text-sm text-left space-y-1">
        <div><ChoiceDot label="A" /> 45</div>
        <div><ChoiceDot label="B" /> 55</div>
        <div><ChoiceDot label="C" /> 66 <span className="text-green-600 font-bold">✓</span></div>
        <div><ChoiceDot label="D" /> 78</div>
      </div>
      <div className="bg-slate-50 rounded-lg p-3 text-sm space-y-1">
        <p className="text-red-600 font-bold">1. 點子數：6，10，15</p>
        <p className="text-blue-600 font-bold">2. 相差數：+4，+5，下一次 +6</p>
        <p className="text-slate-700 font-bold">3. 題目問：第 9 個圖案</p>
        <p className="text-purple-600 font-bold">4. 逐項列出：6 → 10 → 15 → 21 → 28 → 36 → 45 → 55 → 66（第 9 項）</p>
      </div>
    </div>
  </div>
);
