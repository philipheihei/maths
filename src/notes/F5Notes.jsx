import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Latex, MathDisplay, CollapsibleSection } from './shared';

// ========================================
// CH11 變分 (F5)
// ========================================
export const VariationNotes = ({ activeSub, onNavigate }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH11 變分 (Variation)</h1>
        <p className="text-slate-600">掌握四條變分公式及其應用</p>
      </div>

      <CollapsibleSection id="variation-formulas" title="四條公式 & 備註" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-blue-800 text-lg">1. 正變：</span>
              <MathDisplay latex="y = k \textcolor{#ca8a04}{x}" inline className="text-lg font-bold" />
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-blue-800 text-lg">2. 反變：</span>
              <MathDisplay latex="y = \frac{k}{\textcolor{#ca8a04}{x}}" inline className="text-lg font-bold" />
            </div>
            <div className="text-sm text-slate-500 mt-1">可設佈為分數形式</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-blue-800 text-lg">3. 聯變：</span>
              <MathDisplay latex="z = k \textcolor{#ca8a04}{x} \textcolor{#ca8a04}{y}" inline className="text-lg font-bold" />
            </div>
            <div className="text-sm text-slate-600 mt-1"><span className="font-bold">字眼：</span>"且"、"及"</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-blue-800 text-lg">4. 部分變：</span>
              <MathDisplay latex="y = k_1 \textcolor{#ca8a04}{x} + k_2 \textcolor{#ca8a04}{x^2}" inline className="text-lg font-bold" />
            </div>
            <div className="text-sm text-slate-600 mt-1"><span className="font-bold">字眼：</span>"部份"、"而"</div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-800 mb-2">註：代數 (<span className="text-yellow-600">黃色highlight </span>) 按題目不同字眼而改變：</h4>
            <p className="text-sm text-slate-600 mb-2">例子：</p>
            <ul className="space-y-2 text-sm bg-yellow-50 p-3 rounded-lg text-slate-700">
              <li className="flex items-center justify-between border-b border-yellow-100 pb-1">
                <span>x 的 <span className="text-red-600 font-bold">平方</span></span>
                <div className="flex items-center"><ArrowRight className="w-3 h-3 mx-2 text-slate-400"/><MathDisplay latex="x^{\textcolor{red}{2}}" inline /></div>
              </li>
              <li className="flex items-center justify-between border-b border-yellow-100 pb-1">
                <span>y 的 <span className="text-red-600 font-bold">立方</span></span>
                <div className="flex items-center"><ArrowRight className="w-3 h-3 mx-2 text-slate-400"/><MathDisplay latex="y^{\textcolor{red}{3}}" inline /></div>
              </li>
              <li className="flex items-center justify-between border-b border-yellow-100 pb-1">
                <span>x 的 <span className="text-red-600 font-bold">平方根</span></span>
                <div className="flex items-center"><ArrowRight className="w-3 h-3 mx-2 text-slate-400"/><MathDisplay latex="\textcolor{red}{\sqrt{\textcolor{black}{x}}}" inline /></div>
              </li>
              <li className="flex items-center justify-between">
                <span>z 的 <span className="text-red-600 font-bold">立方根</span></span>
                <div className="flex items-center"><ArrowRight className="w-3 h-3 mx-2 text-slate-400"/><MathDisplay latex="\textcolor{red}{\sqrt[3]{\textcolor{black}{z}}}" inline /></div>
              </li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="variation-symbol" title="變分符號" num={2} color="purple" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">📝 符號意義</h3>
            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-lg">
                <span className="font-bold">變分符號：</span>
                <Latex math="\propto" />
                <span className="text-slate-500">←</span>
                <span>意指 <span className="bg-yellow-200 px-2 py-0.5 rounded font-bold">"= k"</span></span>
              </div>
              <div className="border-t pt-3">
                <p className="text-sm text-slate-600 mb-2">例子：</p>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-green-700">e.g.</span>
                  <Latex math="y \propto x" />
                  <span className="text-slate-500 mx-2">⟹</span>
                  <Latex math="y = kx" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="variation-questions" title="題目問法" num={3} color="green" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">A. 以 x 表示 y ／求一個聯繫 x 和 y 的方程 ／求 f(x) <span className="text-red-500 text-sm bg-red-100 px-2 py-0.5 rounded ml-2">最新</span></h3>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm text-red-600 font-bold mb-2">按題目提供數值找 k，然後列出變分公式</p>
              <div className="bg-green-50 rounded p-3 mt-2">
                <p className="text-sm text-green-700 mb-2">例題：x 隨 y 正變，當 x = 5，y = 25</p>
                <p className="font-bold text-slate-700 mb-2">a. 以 x 表 y</p>
                <div className="space-y-1 ml-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Latex math="x = ky" />
                    <span className="text-red-500">← 先列公式</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Latex math="5 = k(25)" />
                    <span className="text-red-500">← 代入題目提供數值</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Latex math="k = \frac{1}{5}" />
                    <span className="text-red-500">← 成功找到變分常數 k</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Latex math="x = \frac{1}{5}y" />
                    <span className="text-red-500">← 最尾請放 k 進公式，x / y 保留</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">B. 當 x = ?，y = ?</h3>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-blue-700 mb-2">例：當 x = 10，求 y 的值</p>
              <div className="ml-4 text-sm">
                <Latex math="\begin{aligned} x &= \frac{1}{5}y && \textcolor{red}{\text{← 列找到的式 (a部)}} \\\\ 10 &= \frac{1}{5}y && \textcolor{red}{\text{← 代入法}} \\\\ 10 \times 5 &= y \\\\ y &= 50 \end{aligned}" block />
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3">C. 哪個必為常數？ <span className="text-sm bg-yellow-200 border border-yellow-400 px-2 py-0.5 rounded">MC 限定</span></h3>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm text-red-600 font-bold mb-3">目標：要找 k = ?</p>
              <div className="bg-green-50 rounded p-3">
                <p className="text-sm text-green-700 mb-2">題目：P 隨 x 正變且隨 <Latex math="\sqrt{y}" /> 反變，下列何者必為常數？</p>
                <div className="ml-4 space-y-1 text-sm mb-3">
                  <p className="flex items-center gap-2"><span className="border-2 border-green-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">A</span> <Latex math="\frac{P\sqrt{y}}{x}" /></p>
                  <p className="flex items-center gap-2"><span className="w-6 h-6 flex items-center justify-center text-xs">B.</span> <Latex math="\frac{x\sqrt{y}}{P}" /></p>
                  <p className="flex items-center gap-2"><span className="w-6 h-6 flex items-center justify-center text-xs">C.</span> <Latex math="\frac{Px}{\sqrt{y}}" /></p>
                  <p className="flex items-center gap-2"><span className="w-6 h-6 flex items-center justify-center text-xs">D.</span> <Latex math="Px\sqrt{y}" /></p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-red-600 font-bold mb-2">目標：k / k 的變種做主項</p>
                  <div className="space-y-1 ml-4 text-sm">
                    <Latex math="P = \frac{kx}{\sqrt{y}}" block />
                    <Latex math="\frac{P\sqrt{y}}{x} = k" block />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">→ 答案 A</p>
                  <p className="text-xs text-slate-500 mt-1">💡 如在選擇中找不到 k 的答案，可找 <Latex math="k^2" /> / <Latex math="\frac{1}{k}" /></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
            <h3 className="font-bold text-amber-800 mb-2">⚠️ 部分變方程解題</h3>
            <p className="text-sm text-slate-700 mb-3">
              解部分變方程時需要用到計算機{' '}
              <a
                onClick={() => onNavigate && onNavigate('高中甲(一)', 'simultaneous-eq', 'calculator')}
                className="text-blue-600 hover:text-blue-800 underline cursor-pointer font-semibold"
              >
                Prog 01 解聯立方程
              </a>
              。
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};
