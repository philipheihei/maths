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
            <h3 className="font-bold text-blue-800 mb-3">📝 規則1：有括號指數乘</h3>
            <Latex math="(a^2 b^3)^3 = a^{2 \times 3} b^{3 \times 3} = a^6 b^9" block />
            <Latex math="\left(\frac{a^2}{b^3}\right)^4 = \frac{a^{2 \times 4}}{b^{3 \times 4}} = \frac{a^8}{b^{12}}" block />
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">📝 規則2：無括號指數加 (乘法) / 減 (除法)</h3>
            <Latex math="a^2 \cdot a^3 = a^{2+3} = a^5" block />
            <Latex math="\frac{a^3}{a^2} = a^{3−2} = a^1" block />
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">🔥 技巧：處理指數約簡時</h3>
            <p className="text-slate-700 mb-2">指數較<span className="bg-yellow-200 px-1 rounded">大</span>的位置留低，然後指數<span className="bg-yellow-200 px-1 rounded">大</span>減<span className="bg-green-200 px-1 rounded">小</span>。</p>
            <Latex math="\frac{8y^{\colorbox{#bbf7d0}{3}}}{y^{\colorbox{#fef08a}{5}}} = \frac{8}{y^{5−3}} = \frac{8}{y^2}" block />
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
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">定義</h3>
            <p className="text-slate-700">科學記數法是把一個數寫成 <Latex math="a \times 10^n" /> 的形式，其中 <Latex math="1 \leq a < 10" />，而 <Latex math="n" /> 是整數。</p>
            <p className="text-slate-700 mt-2">須掌握以下兩種轉換：</p>
            <div className="grid gap-3 mt-3 sm:grid-cols-2">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-slate-700 mb-1">數字或小數 → 科學記數法</p>
                <Latex math="149600000 = 1.496 \times 10^8" block />
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-slate-700 mb-1">科學記數法 → 數字或小數</p>
                <Latex math="5.62 \times 10^{−5} = 0.0000562" block />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">計算機顯示科學記數法</h3>
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
            <h3 className="font-bold text-blue-800 mb-3">📱 進入 BASE 模式</h3>
            <p className="text-slate-700 mb-2">
              CASIO fx-50FH II 按 <span className="bg-gray-300 text-gray-800 text-xs font-mono px-2 py-0.5 rounded">MODE</span> → <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">3</span> 進入 BASE 模式，預設為 <span className="text-green-600 font-bold">DEC</span>（十進制）。
            </p>
            <ul className="flex flex-wrap items-center gap-x-4 mt-2 pt-2 text-slate-700">
              <li className="pt-1">
                <span className="relative inline-block mx-1 align-middle">
                  <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                  <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                </span>：十進制
              </li>
              <li className="pt-1">
                <span className="relative inline-block mx-1 align-middle">
                  <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                  <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                </span>：二進制
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-4">
            <h3 className="font-bold text-purple-800 mb-2">🔄 二進制 ↔ 十進制轉換</h3>
            <div className="border-l-4 border-blue-400 pl-4 space-y-2">
              <p className="font-semibold text-blue-700">二進制 → 十進制</p>
              <ol className="list-decimal pl-4 space-y-1 text-sm text-slate-700">
                <li>在 BASE 模式（<span className="text-green-600 font-bold">DEC</span>）下，按
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                    <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                  </span>
                  切換至 BIN。
                </li>
                <li>輸入二進數（只能輸入 0 和 1）。</li>
                <li>按 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> 確認。</li>
                <li className="pt-3">按
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                    <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                  </span>
                  顯示十進制結果。
                </li>
              </ol>
              <div className="bg-blue-50 rounded px-3 py-2 text-sm">
                <p className="text-blue-700 text-xs mb-2">例：將 <Latex math="1100_2" /> 轉成十進制</p>
                <div className="flex flex-wrap items-center gap-1 pt-2">
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                    <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                  </span>
                  <span>→ 輸入 1100 →</span>
                  <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                  <span>→</span>
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                    <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                  </span>
                  <span>→ 顯示 <strong className="text-blue-700">12</strong></span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-400 pl-4 space-y-2">
              <p className="font-semibold text-green-700">算式 / 十進制 → 二進制</p>
              <ol className="list-decimal pl-4 space-y-1 text-sm text-slate-700">
                <li>先在 COMP 模式（<span className="bg-gray-300 text-gray-800 text-xs font-mono px-2 py-0.5 rounded">MODE</span> <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">1</span>）計算算式的十進制值。</li>
                <li>記下數值，再進入 BASE 模式（<span className="bg-gray-300 text-gray-800 text-xs font-mono px-2 py-0.5 rounded">MODE</span> <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">3</span>）。</li>
                <li className="pt-5">在 <span className="text-green-600 font-bold">DEC</span> 狀態輸入十進制數，按
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                    <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                  </span>
                  切換至 BIN，再按 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> 顯示二進制。
                </li>
              </ol>
              <div className="bg-green-50 rounded p-2 text-sm">
                例：在 COMP 算得 <Latex math="11+2^6+2^{10}+2^{11}=3147" />，再於 BASE 的 DEC 輸入 3147，切換至 BIN 並按 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>。
              </div>
            </div>
          </div>

          <div className="bg-purple-100 rounded-lg p-4">
            <h3 className="font-bold text-purple-700 mb-2">⚠️ 注意事項</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
              <li><span className="text-green-600 font-bold">BIN</span> 模式只能輸入 0 和 1。</li>
              <li>若二進數太長、超過計算機顯示位數，便可能無法顯示；可拆開不同部分計算，再推斷答案。</li>
              <li>計算其他算式時要離開 BASE 模式：按 <span className="bg-gray-300 text-gray-800 text-xs font-mono px-2 py-0.5 rounded">MODE</span> → <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">1</span> 回到 COMP。</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">📝 展開式原理</h3>
            <p className="text-slate-700 mb-2">例如這個 12 位二進數超出計算機可輸入的位數，可按位值拆解；數字 0 對應的項可以省略：</p>
            <div className="space-y-1 text-sm sm:text-base font-serif">
              <div className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-1">
                <span />
                <Latex math="110001001011_2" />
              </div>
              <div className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-1">
                <span className="text-right">=</span>
                <Latex math="2^{11}+2^{10}+2^6+2^3+2^1+2^0" />
              </div>
              <div className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-1">
                <span className="text-right">=</span>
                <Latex math="3147" />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
