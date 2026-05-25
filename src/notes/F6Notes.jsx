import React, { useRef } from 'react';
import { Latex, CollapsibleSection } from './shared';

// ========================================
// 二進制轉換 (F6)
// ========================================
export const BinaryConversionNotes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);

  return (
    <div className="space-y-6">
      <CollapsibleSection id="calculator-tricks" title="用計算機轉換 (DEC/BIN/HEX)" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">🖩 計數機 Base-N 模式</h3>
            <p className="text-slate-700 mb-2">在計數機按 <span className="bg-gray-300 text-gray-800 text-xs font-mono px-2 py-0.5 rounded">MODE</span> <span className="bg-gray-500 text-white text-xs font-mono px-2 py-0.5 rounded">3</span> 進入 BASE 模式。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700">
              <li>
                <span className="relative inline-block mx-1 align-middle">
                  <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                  <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                </span> : 十進制 (Decimal)
              </li>
              <li>
                <span className="relative inline-block mx-1 align-middle">
                  <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">HEX</span>
                  <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">^</span>
                </span> : 十六進制 (Hexadecimal)
              </li>
              <li>
                <span className="relative inline-block mx-1 align-middle">
                  <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                  <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                </span> : 二進制 (Binary)
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 轉換步驟</h3>
            <ol className="list-decimal pl-5 text-slate-700 space-y-2">
              <li>先確定目前在哪個進制（例如按 DEC）。</li>
              <li>輸入數字，然後按 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> 輸入到底部。</li>
              <li>按下目標進制的按鍵（如 BIN 或 HEX），螢幕上的數值便會即時轉換！</li>
            </ol>
            <p className="text-red-600 text-sm mt-3">注意：計數機處理位數有上限（通常只能計到十位左右，因此不能依賴計數機直接處理太大的數字，如 <Latex math="2^{20}" />）。</p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="expansion" title="進制展開式與移位" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">📝 展開式原理</h3>
            <p className="text-slate-700 mb-2">二進制/十六進制的大數字，如果無法放入計數機，需靠拆解其展開式或分析位置。</p>
            <Latex math="1101_2 = 1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0" block />
            <Latex math="B05_{16} = 11 \times 16^2 + 0 \times 16^1 + 5 \times 16^0" block />
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">🔥 MC 極速拆解技巧</h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• <Latex math="2^n" /> 在二進制中代表一個 1 後面跟著 <span className="bg-yellow-200 px-1 rounded">n 個 0</span>。</li>
              <li>• <Latex math="16^n = (2^4)^n = 2^{4n}" />，可輕易由十六進制轉為二進制的指標位。</li>
              <li>• 將大數字拆開成幾個次方項，分別對應不同位置的「1」，可不經計算直接寫出答案。</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
