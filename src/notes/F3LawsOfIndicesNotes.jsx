import React, { useRef } from 'react';
import { CalculatorLCD, Latex, CollapsibleSection } from './shared';

export const LawsOfIndicesNotes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH2 指數定律</h1>
        <p className="text-slate-600">指數運算規則、科學記數法與二進制轉換</p>
      </div>

      <CollapsibleSection id="laws" title="指數定律 (及新學知識)" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 提示</h3>
            <p className="text-sm text-slate-700">緊記：次方和一般數字的混算法是不同的。</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 規則名稱：有括號指數乘</h3>
            <Latex math="(a^2 b^3)^3 = a^{2 \times 3} b^{3 \times 3} = a^6 b^9" block />
            <Latex math="\left(\frac{a^2}{b^3}\right)^4 = \frac{a^{2 \times 4}}{b^{3 \times 4}} = \frac{a^8}{b^{12}}" block />
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">📝 規則名稱：無括號指數加 (乘法) / 減 (除法)</h3>
            <Latex math="a^2 \cdot a^3 = a^{2+3} = a^5" block />
            <Latex math="\frac{a^3}{a^2} = a^{3−2} = a^1" block />
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">🔥 技巧：處理指數約簡時</h3>
            <p className="text-slate-700 mb-2">指數較大的位置留，然後大減細。</p>
            <Latex math="\frac{8y^3}{y^5} = \frac{8}{y^{5−3}} = \frac{8}{y^2}" block />
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">0次方</h3>
            <p className="text-slate-700 font-bold mb-2">只需緊記：任何數的0次方 = 1</p>
            <Latex math="x^0 = 1 \quad , \quad 3^0 = 1" block />
            <Latex math="(−6)^0 = 1 \quad , \quad −6^0 = −1" block />
            <p className="text-slate-600 text-sm mt-2">因為0次方只應用於6，不包括負號。</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">負次方 (需轉成正次方)</h3>
            <p className="bg-yellow-200 px-1 rounded inline-block text-slate-800 mb-2">負變正的方法：分數上下調轉</p>
            <Latex math="x^{−4} = \frac{1}{x^4}" block />
            <Latex math="\frac{1}{y^{−3}} = y^3" block />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="scientific-notation" title="科學記數法" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-slate-700 mb-2">正指數向右移小數點：</p>
            <Latex math="1.496 \times 10^8 = 149600000" block />
            <Latex math="\text{前面數字必需 } \ge 1 \text{ 且 } < 10" block />
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-slate-700 mb-2">負指數向左移小數點：</p>
            <Latex math="5.62 \times 10^{−5} = 0.0000562" block />
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">🖩 計算機顯示科學記數法</h3>
            <p className="text-slate-700 mb-2">當數字很長時，計算機會顯示科學記數法：</p>
            <CalculatorLCD original="0.000031715" mantissa="3.1715" exponent="-05" />
            <p className="text-slate-700 mt-2">
              在計算機輸入 <Latex math="0.000031715" />，即可得知其科學記數法形式為 <Latex math="3.1715 \times 10^{−5}" />。
            </p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="binary-conversion" title="二進制轉換" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">🖩 計數機 Base-N 模式</h3>
            <p className="text-slate-700 mb-2">在計數機按 <span className="bg-gray-300 text-gray-800 text-xs font-mono px-2 py-0.5 rounded">MODE</span> <span className="bg-gray-500 text-white text-xs font-mono px-2 py-0.5 rounded">3</span> 進入 BASE 模式。</p>
            <ul className="list-disc pl-5 mt-2 pt-2 space-y-2 text-slate-700">
              <li className="pt-1">
                <span className="relative inline-block mx-1 align-middle">
                  <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                  <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                </span> : 十進制 (Decimal)
              </li>
              <li className="pt-1">
                <span className="relative inline-block mx-1 align-middle">
                  <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                  <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                </span> : 二進制 (Binary)
              </li>
            </ul>
            <p className="text-slate-700 text-sm mt-2">現時中學課程主要只考二進制和十進制的轉換。</p>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 轉換步驟</h3>
            <ol className="list-decimal pl-5 text-slate-700 space-y-2">
              <li>先確定目前在哪個進制（例如按 DEC）。</li>
              <li>輸入數字，然後按 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> 輸入到底部。</li>
              <li>按下目標進制的按鍵（如 BIN），螢幕上的數值便會即時轉換！</li>
            </ol>
            <p className="text-red-600 text-sm mt-3">注意：計數機處理位數有上限（通常只能計到十位左右），因此不能依賴計數機直接處理太大的數字，如 <Latex math="2^{20}" />。</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">📝 展開式原理</h3>
            <p className="text-slate-700 mb-2">二進制的大數字，如果無法輸入計數機，需靠拆解其展開式或分析位置。</p>
            <Latex math="1101_2 = 1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0" block />
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">🔥 MC 極速拆解技巧</h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• <Latex math="2^n" /> 在二進制中代表一個 1 後面跟著 <span className="bg-yellow-200 px-1 rounded">n 個 0</span>。</li>
              <li>• 將大數字拆開成幾個次方項，分別對應不同位置的「1」，可不經計算直接寫出答案。</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

