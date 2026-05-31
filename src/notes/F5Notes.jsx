import React, { useEffect, useRef } from 'react';
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

// ========================================
// CH14 統計 (F5)
// ========================================
export const StatisticsF5Notes = ({ activeSub, onNavigate }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-indigo-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH14 統計 (Statistics)</h1>
        <p className="text-slate-600">從離散數據找尋 7 個統計量、各類圖表的判讀，以及標準分與數據更動對離差的影響</p>
      </div>

      <CollapsibleSection id="stat-7-indicators" title="七個重要統計量" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">1. 集中趨勢 (Central Tendency) — 「3M」</h3>
            <ul className="text-slate-700 space-y-2 list-disc pl-5">
              <li><span className="font-bold text-slate-900">平均數 (Mean) <Latex math="\bar{x}" inline /></span>：所有數據之和 <Latex math="\div" inline /> 數據總數</li>
              <li><span className="font-bold text-slate-900">中位數 (Median)</span>：將數據由小至大排列後，位於最中間的數值（若有兩個中間數，取兩者平均）</li>
              <li><span className="font-bold text-slate-900">眾數 (Mode)</span>：出現次數最多的數值（可有多個）</li>
            </ul>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">2. 離差 (Dispersion) — 數據的分散程度</h3>
            <ul className="text-slate-700 space-y-2 list-disc pl-5">
              <li><span className="font-bold text-slate-900">分佈域 (Range)</span>：最大值 <Latex math="-" inline /> 最小值</li>
              <li><span className="font-bold text-slate-900">四分位數間距 (Interquartile Range)</span>：上四分位數 (<Latex math="Q_3" inline />) <Latex math="-" inline /> 下四分位數 (<Latex math="Q_1" inline />)</li>
              <li><span className="font-bold text-slate-900">標準差 (Standard Deviation, <Latex math="\sigma" inline />)</span>：量度數據偏離平均數的程度，數值越大代表數據越分散。計算機可直出。</li>
              <li><span className="font-bold text-slate-900">方差 (Variance, <Latex math="\sigma^2" inline />)</span>：標準差的平方（即 <Latex math="\text{方差} = (\text{標準差})^2" inline />）</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="stat-raw-data" title="從獨立數據中找統計量" num={2} color="indigo" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">例子：有一組數據： <span className="font-mono bg-slate-100 px-2 py-1 mx-1 rounded">2, 5, 8, 8, 12, 15</span> (已排大小)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-bold mb-1">手算集中趨勢</p>
                <ul className="text-sm space-y-1">
                  <li>平均數 = <Latex math="\frac{2+5+8+8+12+15}{6} = 8.33" inline /></li>
                  <li>中位數 = 中間兩數 (8, 8) 的平均 = 8</li>
                  <li>眾數 = 8 (出現 2 次)</li>
                </ul>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-bold mb-1">手算離差</p>
                <ul className="text-sm space-y-1">
                  <li>分佈域 = <Latex math="15 - 2 = 13" inline /></li>
                  <li>下四分位數 <Latex math="Q_1 = 5" inline /> (前半 2,5,8 的中間)</li>
                  <li>上四分位數 <Latex math="Q_3 = 12" inline /> (後半 8,12,15 的中間)</li>
                  <li>四分位數間距 = <Latex math="12 - 5 = 7" inline /></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">🖩 CASIO 計算機入法 (SD Mode)</h3>
            <p className="text-sm text-slate-700 mb-2">步驟 1：進入 SD 模式 <span className="bg-gray-300 text-gray-800 text-xs font-mono px-2 py-0.5 rounded mr-1">MODE</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">2</span></p>
            <p className="text-sm text-slate-700 mb-2">步驟 2：清除舊數據 <span className="bg-gray-300 text-yellow-700 text-xs font-mono px-2 py-0.5 rounded mr-1">SHIFT</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded mr-1">9</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded mr-1">1</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded mr-1">EXE</span></p>
            <p className="text-sm text-slate-700 mb-2">步驟 3：入 Data (逐個㩒 <Latex math="M+" inline />)</p>
            <div className="bg-white p-2 rounded text-sm mb-3 font-mono">
              2 <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded mr-2">M+</span> 
              5 <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded mr-2">M+</span> 
              ... 
              15 <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded">M+</span>
            </div>
            <p className="text-sm text-slate-700 font-bold">找結果：</p>
            <ul className="text-sm text-slate-700 space-y-1 pl-4 list-disc mt-1">
              <li>平均數 (<Latex math="\bar{x}" inline />)： <span className="bg-gray-300 text-yellow-700 text-xs font-mono px-2 py-0.5 rounded mr-1">SHIFT</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded mr-1">2</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded mr-1">1</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span></li>
              <li>標準差 (<Latex math="\sigma x" inline />)： <span className="bg-gray-300 text-yellow-700 text-xs font-mono px-2 py-0.5 rounded mr-1">SHIFT</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded mr-1">2</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded mr-1">2</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> <Latex math="= 4.31 (3\text{ sig. fig.})" inline /></li>
              <li>方差 (<Latex math="\sigma^2" inline />)： 在標準差的畫面上直接㩒 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded mr-1">x²</span><span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span></li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="stat-graphs" title="從圖表找統計量 (幹葉圖/棒型圖/框線圖)" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-6">
          {/* 幹葉圖 */}
          <div className="bg-white rounded-lg p-4 border border-violet-200">
            <h3 className="font-bold text-violet-800 mb-3 flex justify-between items-center">
              <span>A. 幹葉圖 (Stem-and-leaf Diagram)</span>
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 font-sans flex flex-col items-center min-w-[280px]">
                <h4 className="font-bold text-slate-700 mb-2">幹葉圖 (Stem-and-Leaf Diagram)</h4>
                <table className="border-collapse">
                  <thead>
                    <tr className="text-slate-500 text-sm border-b border-slate-400">
                      <th className="pr-2 text-right border-r-2 border-slate-400 pb-1">幹（十位）</th>
                      <th className="pl-2 text-left pb-1">葉（個位）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50">
                      <td className="pr-2 text-right border-r-2 border-slate-400 font-bold text-lg py-1">4</td>
                      <td className="pl-2 text-left text-lg tracking-[0.16em]">8 9</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="pr-2 text-right border-r-2 border-slate-400 font-bold text-lg py-1">5</td>
                      <td className="pl-2 text-left text-lg tracking-[0.16em]">0 2 4 5 5 6</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="pr-2 text-right border-r-2 border-slate-400 font-bold text-lg py-1">6</td>
                      <td className="pl-2 text-left text-lg tracking-[0.16em]">1 3 6 9</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="pr-2 text-right border-r-2 border-slate-400 font-bold text-lg py-1">7</td>
                      <td className="pl-2 text-left text-lg tracking-[0.16em]">0 1 3 6</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="pr-2 text-right border-r-2 border-slate-400 font-bold text-lg py-1">8</td>
                      <td className="pl-2 text-left text-lg tracking-[0.16em]">0 1 2 4</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 text-xs text-slate-500">Key: 5 | 2 = 52</div>
              </div>
              <div className="flex-1 space-y-2 text-sm text-slate-700">
                <p>數據共 20 個：48, 49, 50, 52, 54, 55, 55, 56, 61, 63, 66, 69, 70, 71, 73, 76, 80, 81, 82, 84。</p>
                <div className="grid grid-cols-2 gap-2 bg-violet-50 p-3 rounded mt-2">
                  <p><strong>平均數：</strong> 64.75 (建議用計數機)</p>
                  <p><strong>眾數：</strong> 55 (出現最多次數)</p>
                  <p><strong>中位數：</strong> 第10與第11個數平均 <Latex inline math="= \frac{63+66}{2}=64.5" /></p>
                  <p><strong>分佈域：</strong> <Latex inline math="84-48=36" /></p>
                  <p><strong><Latex inline math="Q_1" />：</strong> 前 10 個數中位數 <Latex inline math="=54.5" /></p>
                  <p><strong><Latex inline math="Q_3" />：</strong> 後 10 個數中位數 <Latex inline math="=74.5" /></p>
                  <p className="col-span-2"><strong>四分位數間距：</strong> <Latex inline math="Q_3-Q_1=74.5-54.5=20" /></p>
                </div>
              </div>
            </div>
          </div>

          {/* 表格 / 棒型圖 */}
          <div className="bg-white rounded-lg p-4 border border-emerald-200">
            <h3 className="font-bold text-emerald-800 mb-3">B. 表格 (Table) 或 棒型圖 (Bar Chart)</h3>
            <p className="text-sm text-slate-600 mb-2">這兩者本質相同，都是 <span className="font-bold text-emerald-700">數據 (x) 對應 頻數 (f)</span>。</p>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-4">
              <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="p-2 bg-slate-50 border-b border-slate-200 font-bold text-center text-slate-700">頻數表 (Frequency Table)</div>
                <table className="w-full text-sm text-center border-collapse">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="p-3 border-r border-b border-slate-300 font-bold">數值</th>
                      <th className="p-3 border-b border-slate-300 font-medium border-r border-slate-200">10</th>
                      <th className="p-3 border-b border-slate-300 font-medium border-r border-slate-200">11</th>
                      <th className="p-3 border-b border-slate-300 font-medium border-r border-slate-200">12</th>
                      <th className="p-3 border-b border-slate-300 font-medium border-r border-slate-200">13</th>
                      <th className="p-3 border-b border-slate-300 font-medium border-r border-slate-200">14</th>
                      <th className="p-3 border-b border-slate-300 font-medium">15</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-r border-slate-300 font-bold bg-slate-50">頻數</td>
                      <td className="p-3 border-r border-slate-200">2</td>
                      <td className="p-3 border-r border-slate-200">5</td>
                      <td className="p-3 border-r border-slate-200">3</td>
                      <td className="p-3 border-r border-slate-200">8</td>
                      <td className="p-3 border-r border-slate-200">4</td>
                      <td className="p-3">1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-3">
              <svg viewBox="0 0 500 250" className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
                <text x="250" y="20" textAnchor="middle" className="font-bold text-slate-700">棒型圖 (Bar Chart)</text>

                <line x1="40" y1="210" x2="460" y2="210" stroke="#334155" strokeWidth="2" />
                <line x1="40" y1="210" x2="40" y2="40" stroke="#334155" strokeWidth="2" />

                <text x="250" y="240" textAnchor="middle" className="text-xs">數值 (Score)</text>
                <text x="10" y="125" transform="rotate(-90, 10, 125)" textAnchor="middle" className="text-xs">頻數 (Freq)</text>

                <g>
                  <rect x="54" y="172.2" width="42" height="37.8" fill="#60a5fa" className="transition-all duration-300 hover:opacity-80" />
                  <text x="75" y="225" textAnchor="middle" className="text-xs">10</text>
                  <text x="75" y="167.2" textAnchor="middle" className="text-xs font-bold text-slate-600">2</text>
                </g>
                <g>
                  <rect x="124" y="115.6" width="42" height="94.4" fill="#60a5fa" className="transition-all duration-300 hover:opacity-80" />
                  <text x="145" y="225" textAnchor="middle" className="text-xs">11</text>
                  <text x="145" y="110.6" textAnchor="middle" className="text-xs font-bold text-slate-600">5</text>
                </g>
                <g>
                  <rect x="194" y="153.3" width="42" height="56.7" fill="#60a5fa" className="transition-all duration-300 hover:opacity-80" />
                  <text x="215" y="225" textAnchor="middle" className="text-xs">12</text>
                  <text x="215" y="148.3" textAnchor="middle" className="text-xs font-bold text-slate-600">3</text>
                </g>
                <g>
                  <rect x="264" y="58.9" width="42" height="151.1" fill="#60a5fa" className="transition-all duration-300 hover:opacity-80" />
                  <text x="285" y="225" textAnchor="middle" className="text-xs">13</text>
                  <text x="285" y="53.9" textAnchor="middle" className="text-xs font-bold text-slate-600">8</text>
                </g>
                <g>
                  <rect x="334" y="134.4" width="42" height="75.6" fill="#60a5fa" className="transition-all duration-300 hover:opacity-80" />
                  <text x="355" y="225" textAnchor="middle" className="text-xs">14</text>
                  <text x="355" y="129.4" textAnchor="middle" className="text-xs font-bold text-slate-600">4</text>
                </g>
                <g>
                  <rect x="404" y="191.1" width="42" height="18.9" fill="#60a5fa" className="transition-all duration-300 hover:opacity-80" />
                  <text x="425" y="225" textAnchor="middle" className="text-xs">15</text>
                  <text x="425" y="186.1" textAnchor="middle" className="text-xs font-bold text-slate-600">1</text>
                </g>
              </svg>
            </div>
            <div className="text-sm text-slate-700 space-y-2">
              <p>手算平均數：<Latex math="\frac{10\times 2 + 11\times 5 + 12\times 3 + 13\times 8 + 14\times 4 + 15\times 1}{23} \approx 12.4" inline /></p>
              <p>計數機入法 (開 FREQ/加入頻數)：</p>
              <div className="bg-emerald-50 p-2 rounded font-mono">
                10 <span className="bg-gray-300 text-yellow-700 text-xs px-2 py-0.5 rounded">SHIFT</span><span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded mr-1">,</span> 2 <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded">M+</span>
              </div>
              <p>中位數看法：總共 23 個數，找第 12 個。前面 10佔了2個位，11佔了5個位，12佔了3個位 (第1-10位)，13佔第11-18位，因此中位數在 13。</p>
            </div>
          </div>

          {/* 框線圖 */}
          <div className="bg-white rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">C. 框線圖 (Box-and-whisker plot)</h3>
            <p className="text-sm text-slate-700 mb-2">框線圖直接顯示五個重要數值，可透過圖形直接找到：</p>
            
            <div className="bg-amber-50 rounded p-4 text-center border-l-4 border-amber-500 my-3">
              <svg viewBox="0 0 500 130" className="w-full max-w-lg mx-auto">
                {/* Whiskers */}
                <line x1="50" y1="50" x2="150" y2="50" stroke="#3b82f6" strokeWidth="2" />
                <line x1="350" y1="50" x2="450" y2="50" stroke="#3b82f6" strokeWidth="2" />
                {/* Min/Max caps */}
                <line x1="50" y1="30" x2="50" y2="70" stroke="#3b82f6" strokeWidth="2" />
                <line x1="450" y1="30" x2="450" y2="70" stroke="#3b82f6" strokeWidth="2" />
                {/* Box */}
                <rect x="150" y="20" width="200" height="60" fill="white" stroke="#3b82f6" strokeWidth="2" />
                {/* Median */}
                <line x1="230" y1="20" x2="230" y2="80" stroke="#ef4444" strokeWidth="2" />
                
                {/* Labels */}
                <text x="50" y="95" textAnchor="middle" fontSize="14" fill="#64748b" fontWeight="bold">最小值</text>
                <text x="150" y="95" textAnchor="middle" fontSize="14" fill="#64748b" fontWeight="bold">Q₁</text>
                <text x="230" y="105" textAnchor="middle" fontSize="14" fill="#ef4444" fontWeight="bold">中位數</text>
                <text x="350" y="95" textAnchor="middle" fontSize="14" fill="#64748b" fontWeight="bold">Q₃</text>
                <text x="450" y="95" textAnchor="middle" fontSize="14" fill="#64748b" fontWeight="bold">最大值</text>
              </svg>
            </div>

            <ul className="text-sm text-slate-700 list-disc pl-5 mt-4 space-y-1">
              <li>中位數是長方框內中間的<span className="font-bold text-red-600">紅色直線</span></li>
              <li>分佈域 = 最右邊條線 - 最左邊條線 (最大 - 最小)</li>
              <li>四分位數間距 = 框框的右邊界 - 框框的左邊界 (<Latex inline math="Q_3 - Q_1" />)</li>
            </ul>
            <p className="text-sm text-slate-700 mt-3">框線圖<span className="font-bold text-red-600">未能顯示</span>平均數、眾數、標準差及方差。</p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="stat-standard-score" title="標準分 (Standard Score, z)" num={4} color="sky" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-sky-50 rounded-lg p-5 border border-sky-300">
            <h3 className="font-bold text-sky-800 mb-3 text-lg">📝 公式</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm w-fit mx-auto border border-slate-200">
              <MathDisplay latex="\text{標準分 } (z) = \frac{\text{某位學生分數 } (x) - \text{平均分數 } (\bar{x})}{\text{標準差 } (\sigma)}" block />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-700 mb-3">標準分用作比較不同科目的表現（相對於全班平均的水準）。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <Latex math="z < 0" block />
                <p className="font-bold text-red-700 mt-2">標準分為<span className="text-red-600 underline">負數</span></p>
                <p className="text-sm text-slate-600 mt-1">代表表現差過平均分 (Below Average)<br/>(屬於較一半差的人)</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <Latex math="z > 0" block />
                <p className="font-bold text-green-700 mt-2">標準分為<span className="text-green-600 underline">正數</span></p>
                <p className="text-sm text-slate-600 mt-1">代表表現好過平均分 (Above Average)<br/>(屬於較一半好的人)</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="stat-data-change" title="修改數據後對各統計量的影響 (MC 限定)" num={5} color="red" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4 border-2 border-red-300">
            <h3 className="font-bold text-red-800 text-lg mb-2">🔥 核心口訣</h3>
            <ul className="list-disc pl-5 text-slate-800 font-bold text-lg space-y-2">
              <li>「<Latex math="+" inline /> / <Latex math="-" inline />」：只有 3M 會變，離差<span className="text-red-600 underline">不變</span></li>
              <li>「<Latex math="\times" inline /> / <Latex math="\div" inline />」：全部皆變</li>
            </ul>
            <p className="text-sm mt-3 text-red-700">*註：3M 指 平均數 (Mean)、中位數 (Median)、眾數 (Mode)<br/>離差 指 分佈域 (Range)、四分位數間距、標準差 (<Latex math="\sigma" inline />)、方差 (<Latex math="\sigma^2" inline />)</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-3 border-b-2 border-slate-100 pb-2">例子 1：若每個數據都 <Latex math="+1" inline /></h4>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="border p-2"></th>
                    <th className="border p-2 w-1/4">舊數據</th>
                    <th className="border p-2 w-1/4">情況</th>
                    <th className="border p-2 w-1/4 bg-blue-50 text-blue-800">新數據</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold text-left bg-slate-50">平均數 / 眾數 / 中位數</td>
                    <td className="border p-2 text-slate-500">10</td>
                    <td className="border p-2 text-blue-600 font-bold">+ 1</td>
                    <td className="border p-2 font-bold text-blue-700 bg-blue-50">11</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold text-left bg-slate-50">分佈域 / 四分位數間距 / 標準差 / 方差</td>
                    <td className="border p-2 text-slate-500">2</td>
                    <td className="border p-2 text-red-500 font-bold">不變</td>
                    <td className="border p-2 font-bold text-blue-700 bg-blue-50">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-3 border-b-2 border-slate-100 pb-2">例子 2：若每個數據都 <Latex math="\times 2" inline /></h4>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="border p-2"></th>
                    <th className="border p-2 w-1/4">舊數據</th>
                    <th className="border p-2 w-1/4">情況</th>
                    <th className="border p-2 w-1/4 bg-blue-50 text-blue-800">新數據</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold text-left bg-slate-50">平均數 / 眾數 / 中位數 / 分佈域 / 四分位數間距 / 標準差 (<Latex math="\sigma" inline />)</td>
                    <td className="border p-2 text-slate-500">3</td>
                    <td className="border p-2 text-blue-600 font-bold"><Latex math="\times 2" inline /></td>
                    <td className="border p-2 font-bold text-blue-700 bg-blue-50">6</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold text-left bg-amber-50 text-amber-800">特例：方差 (<Latex math="\sigma^2" inline />)</td>
                    <td className="border p-2 text-slate-500">20</td>
                    <td className="border p-2 bg-amber-100 text-amber-800 font-bold whitespace-nowrap"><Latex math="\times (2^2) \rightarrow \times 4" inline /></td>
                    <td className="border p-2 font-bold text-amber-900 bg-amber-50">80</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-2">*方差的單位是平方，因此乘數必須配以 2 次方。</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-3 border-b-2 border-slate-100 pb-2">MC 例題（方差變換）</h4>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
              <p className="text-slate-800">若五個數 <Latex math="x_1,\ x_2,\ x_3,\ x_4,\ x_5" inline /> 的方差為 12，則</p>
              <p className="text-slate-800"><Latex math="2x_1 - 3,\ 2x_2 - 3,\ 2x_3 - 3,\ 2x_4 - 3,\ 2x_5 - 3" inline /> 這五個數的方差為：</p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="bg-white border border-slate-200 rounded p-2">A. 12</div>
                <div className="bg-white border border-slate-200 rounded p-2">B. 21</div>
                <div className="bg-white border border-slate-200 rounded p-2">C. 24</div>
                <div className="bg-white border border-slate-200 rounded p-2 font-bold text-emerald-700 border-emerald-300">D. 48</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-sm text-emerald-900">
                解題重點：<Latex math="-3" inline /> 不改變方差；<Latex math="\times 2" inline /> 令方差乘 <Latex math="2^2" inline />，
                所以新方差 <Latex math="= 12 \times 4 = 48" inline />。
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH12-13 圓形性質 (F5)
// ========================================
const PropertyCard = ({ title, svg: SVGComp, condition, conclusion, directFormula, formulaRemark, desc, className = "" }) => (
  <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-shadow ${className}`}>
    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-slate-800 md:text-lg text-base">
      {title}
    </div>
    <div className="flex-1 p-2 flex items-center justify-center bg-white min-h-[220px]">
      <SVGComp />
    </div>
    <div className="px-4 py-4 border-t border-slate-200 bg-white min-h-[90px] flex items-center">
      <div className="w-full">
        {directFormula ? (
          <div className="flex items-center gap-3 w-full">
            <div className="w-1 h-8 bg-emerald-500 rounded-full shrink-0"></div>
            <div className="flex flex-col md:flex-row md:items-center w-full">
              <p className="text-slate-800 mb-0 font-medium text-lg leading-none pt-2 shrink-0 md:mr-6"><Latex math={directFormula} inline={false} block /></p>
              {formulaRemark && (
                <p className="text-red-600 font-bold mt-2 md:mt-0 pt-2 text-sm">{formulaRemark}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3 w-full">
            <div className="flex gap-3 items-stretch">
              <div className="w-1 bg-slate-300 rounded-full shrink-0"></div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-0.5">條件</span>
                <span className="text-slate-600 font-medium">{condition}</span>
              </div>
            </div>
            <div className="flex gap-3 items-stretch mt-3">
              <div className="w-1 bg-emerald-500 rounded-full shrink-0"></div>
              <div>
                <span className="text-xs font-bold text-emerald-600 block mb-0.5">結論</span>
                <p className="text-slate-800 m-0 leading-none pt-1"><Latex math={conclusion} inline={false} /></p>
              </div>
            </div>
          </div>
        )}
        {desc && <div className="mt-3 text-red-600 font-bold text-sm text-center">{desc}</div>}
      </div>
    </div>
  </div>
);

export const CirclePropertiesNotes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-emerald-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH12-13 圓形性質 (Circle Properties)</h1>
        <p className="text-slate-600">圖形定理、性質整理及其格式寫法</p>
      </div>

      <CollapsibleSection id="circle-theorems" title="常見圓形定理" num={1} color="emerald" activeSub={activeSub} sectionRef={s1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PropertyCard
            title="圓心角兩倍於圓周角"
            directFormula="x = 2y"
            formulaRemark="必須要由兩隻相同的點拉出來的角作比較"
            className="md:col-span-2"
            svg={() => (
              <div className="flex flex-col md:flex-row w-full justify-around items-center gap-4 py-2">
                {/* Image 1: Standard Arrowhead */}
                <svg viewBox="0 0 200 200" className="w-full max-w-[180px]">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                  {/* Purple angle at O */}
                  <path d="M 100 100 L 87 107.5 A 15 15 0 0 0 113 107.5 Z" fill="#d8b4fe" stroke="#a855f7" strokeWidth="1" />
                  {/* Yellow angle at C */}
                  <path d="M 100 20 L 109 35.6 A 18 18 0 0 1 91 35.6 Z" fill="#fde047" stroke="#eab308" strokeWidth="1" />
                  
                  <path d="M 31 140 L 100 100 L 169 140" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <path d="M 31 140 L 100 20 L 169 140" fill="none" stroke="#334155" strokeWidth="1.5" />
                  
                  <circle cx="31" cy="140" r="3" fill="#ef4444" />
                  <circle cx="169" cy="140" r="3" fill="#ef4444" />
                  
                  <text x="100" y="52" fill="#475569" fontSize="14" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>y</text>
                  <text x="100" y="125" fill="#475569" fontSize="14" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>x</text>
                  
                  <text x="15" y="150" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                  <text x="175" y="150" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                  <text x="100" y="12" fill="#475569" fontSize="13" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                  <text x="100" y="93" fill="#475569" fontSize="13" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
                </svg>

                {/* Image 2: Reflex Kite */}
                <svg viewBox="0 0 200 200" className="w-full max-w-[180px]">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                  {/* Purple angle at O (reflex) */}
                  <path d="M 100 100 L 114.1 94.9 A 15 15 0 1 1 85.9 94.9 Z" fill="#d8b4fe" stroke="#a855f7" strokeWidth="1" />
                  {/* Yellow angle at C */}
                  <path d="M 100 20 L 114.7 30.4 A 18 18 0 0 1 85.3 30.4 Z" fill="#fde047" stroke="#eab308" strokeWidth="1" />
                  
                  <path d="M 25 73 L 100 100 L 175 73" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <path d="M 25 73 L 100 20 L 175 73" fill="none" stroke="#334155" strokeWidth="1.5" />
                  
                  <circle cx="25" cy="73" r="3" fill="#ef4444" />
                  <circle cx="175" cy="73" r="3" fill="#ef4444" />
                  
                  <text x="100" y="48" fill="#475569" fontSize="14" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>y</text>
                  <text x="100" y="130" fill="#475569" fontSize="14" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>x</text>
                  
                  <text x="8" y="80" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                  <text x="180" y="80" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                  <text x="100" y="12" fill="#475569" fontSize="13" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                  <text x="100" y="93" fill="#475569" fontSize="13" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
                </svg>

                {/* Image 3: Crossed Lines */}
                <svg viewBox="0 0 200 200" className="w-full max-w-[180px]">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                  {/* Purple angle at O */}
                  <path d="M 100 100 L 113.0 107.5 A 15 15 0 0 1 94.9 114.1 Z" fill="#d8b4fe" stroke="#a855f7" strokeWidth="1" />
                  {/* Yellow angle at C */}
                  <path d="M 21.2 86.1 L 41.9 93.6 A 22 22 0 0 1 32.2 105.2 Z" fill="#fde047" stroke="#eab308" strokeWidth="1" />
                  
                  <path d="M 72.6 175.2 L 100 100 L 169.3 140.0" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <path d="M 72.6 175.2 L 21.2 86.1 L 169.3 140.0" fill="none" stroke="#334155" strokeWidth="1.5" />
                  
                  <circle cx="72.6" cy="175.2" r="3" fill="#ef4444" />
                  <circle cx="169.3" cy="140.0" r="3" fill="#ef4444" />
                  
                  <text x="44" y="108" fill="#475569" fontSize="14" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>y</text>
                  <text x="110" y="130" fill="#475569" fontSize="14" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>x</text>
                  
                  <text x="65" y="190" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                  <text x="175" y="150" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                  <text x="15" y="80" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                  <text x="100" y="93" fill="#475569" fontSize="13" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
                </svg>
              </div>
            )}
          />

          <PropertyCard
            title="同弓形內的圓周角"
            directFormula="\angle APB = \angle AQB"
            desc="必須要由兩隻相同的點拉出來的角作比較"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <line x1="31" y1="140" x2="169" y2="140" stroke="#334155" strokeWidth="1" />
                <path d="M 31 140 L 70 25 L 169 140" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 31 140 L 155 42 L 169 140" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 63.6 43.9 A 20 20 0 0 0 83.0 40.2" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 62.6 46.8 A 23 23 0 0 0 85.0 42.4" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 139.3 54.4 A 20 20 0 0 0 157.8 61.8" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 137.0 56.3 A 23 23 0 0 0 158.2 64.8" fill="none" stroke="#334155" strokeWidth="1" />
                
                <circle cx="31" cy="140" r="3" fill="#ef4444" />
                <circle cx="169" cy="140" r="3" fill="#ef4444" />
                
                <text x="17" y="150" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="175" y="150" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="65" y="15" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>P</text>
                <text x="162" y="38" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>Q</text>
              </svg>
            )}
          />

          <PropertyCard
            title="半圓上的圓周角"
            condition={<>若 <Latex math="\text{AB}" inline /> 是圓的直徑，</>}
            conclusion="\angle ACB = 90^\circ"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                {/* Center O mark 'x' */}
                <path d="M 97 97 L 103 103 M 97 103 L 103 97" stroke="#334155" strokeWidth="1.5" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M 20 100 L 60 31 L 180 100" fill="none" stroke="#f97316" strokeWidth="1.5" />
                <polygon points="60,31 56,38 63,42 67,35" fill="none" stroke="#f97316" strokeWidth="1" />
                <text x="5" y="105" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="185" y="105" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="53" y="24" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="95" y="120" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="等弦對等弧"
            condition={<>若 <Latex math="AB = CD" inline />，</>}
            conclusion="\overset{\frown}{AB} = \overset{\frown}{CD}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                {/* 橙色弧 AB 和 CD */}
                <path d="M 60 31 A 80 80 0 0 0 25 73" fill="none" stroke="#f97316" strokeWidth="2" />
                <path d="M 140 169 A 80 80 0 0 0 175 127" fill="none" stroke="#f97316" strokeWidth="2" />
                <line x1="100" y1="100" x2="60" y2="31" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="25" y2="73" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="140" y2="169" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="175" y2="127" stroke="#334155" strokeWidth="1.5" />
                
                <line x1="60" y1="31" x2="25" y2="73" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="140" y1="169" x2="175" y2="127" stroke="#22c55e" strokeWidth="1.5" />
                
                {/* 弦 AB 和 CD 的雙綠色相等標記 */}
                <line x1="39.2" y1="50.6" x2="44.8" y2="55.2" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="41.2" y1="48.1" x2="46.8" y2="52.7" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="152.4" y1="146.3" x2="160.0" y2="152.7" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="155.0" y1="143.3" x2="162.6" y2="149.7" stroke="#22c55e" strokeWidth="1.5" />
                
                {/* 弧 AB 和 CD 的單劃橙色相等標記 */}
                <line x1="34.9" y1="45.6" x2="42.5" y2="52.0" stroke="#f97316" strokeWidth="1.5" />
                <line x1="157.5" y1="148.0" x2="165.1" y2="154.4" stroke="#f97316" strokeWidth="1.5" />
                
                <text x="60" y="24" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="14" y="80" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="135" y="185" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="182" y="130" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="110" y="100" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="等弧對等弦"
            condition={<>若 <Latex math="\overset{\frown}{AB} = \overset{\frown}{CD}" inline />，</>}
            conclusion="AB = CD"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                {/* 橙色弧 AB 和 CD */}
                <path d="M 60 31 A 80 80 0 0 0 25 73" fill="none" stroke="#f97316" strokeWidth="2" />
                <path d="M 140 169 A 80 80 0 0 0 175 127" fill="none" stroke="#f97316" strokeWidth="2" />
                <line x1="100" y1="100" x2="60" y2="31" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="25" y2="73" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="140" y2="169" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="175" y2="127" stroke="#334155" strokeWidth="1.5" />
                
                <line x1="60" y1="31" x2="25" y2="73" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="140" y1="169" x2="175" y2="127" stroke="#22c55e" strokeWidth="1.5" />
                
                {/* 弦 AB 和 CD 的雙綠色相等標記 */}
                <line x1="39.2" y1="50.6" x2="44.8" y2="55.2" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="41.2" y1="48.1" x2="46.8" y2="52.7" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="152.4" y1="146.3" x2="160.0" y2="152.7" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="155.0" y1="143.3" x2="162.6" y2="149.7" stroke="#22c55e" strokeWidth="1.5" />
                
                {/* 弧 AB 和 CD 的單劃橙色相等標記 */}
                <line x1="34.9" y1="45.6" x2="42.5" y2="52.0" stroke="#f97316" strokeWidth="1.5" />
                <line x1="157.5" y1="148.0" x2="165.1" y2="154.4" stroke="#f97316" strokeWidth="1.5" />
                
                <text x="60" y="24" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="14" y="80" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="135" y="185" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="182" y="130" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="110" y="100" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="等弧對等角 (圓心)"
            condition={<>若 <Latex math="\overset{\frown}{AB} = \overset{\frown}{CD}" inline />，</>}
            conclusion="\angle AOB = \angle COD"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                {/* 橙色弧 AB 和 CD */}
                <path d="M 60 31 A 80 80 0 0 0 25 73" fill="none" stroke="#f97316" strokeWidth="2" />
                <path d="M 140 169 A 80 80 0 0 0 175 127" fill="none" stroke="#f97316" strokeWidth="2" />
                <line x1="100" y1="100" x2="60" y2="31" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="25" y2="73" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="140" y2="169" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="175" y2="127" stroke="#334155" strokeWidth="1.5" />
                
                {/* AOB 和 COD 雙角標記 */}
                <path d="M 89.0 81.0 A 22 22 0 0 0 79.4 92.6" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 87.0 77.6 A 26 26 0 0 0 75.6 91.2" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 111.0 119.0 A 22 22 0 0 0 120.6 107.4" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 113.0 122.4 A 26 26 0 0 0 124.4 108.8" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                
                {/* 弧 AB 和 CD 的單劃橙色相等標記 */}
                <line x1="34.9" y1="45.6" x2="42.5" y2="52.0" stroke="#f97316" strokeWidth="1.5" />
                <line x1="157.5" y1="148.0" x2="165.1" y2="154.4" stroke="#f97316" strokeWidth="1.5" />
                
                <text x="60" y="24" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="14" y="80" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="135" y="185" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="182" y="130" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="110" y="100" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="等角對等弧"
            condition={<>若 <Latex math="\angle AOB = \angle COD" inline />，</>}
            conclusion="\overset{\frown}{AB} = \overset{\frown}{CD}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                {/* 橙色弧 AB 和 CD */}
                <path d="M 60 31 A 80 80 0 0 0 25 73" fill="none" stroke="#f97316" strokeWidth="2" />
                <path d="M 140 169 A 80 80 0 0 0 175 127" fill="none" stroke="#f97316" strokeWidth="2" />
                <line x1="100" y1="100" x2="60" y2="31" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="25" y2="73" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="140" y2="169" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="175" y2="127" stroke="#334155" strokeWidth="1.5" />
                
                {/* AOB 和 COD 雙角標記 */}
                <path d="M 89.0 81.0 A 22 22 0 0 0 79.4 92.6" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 87.0 77.6 A 26 26 0 0 0 75.6 91.2" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 111.0 119.0 A 22 22 0 0 0 120.6 107.4" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 113.0 122.4 A 26 26 0 0 0 124.4 108.8" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                
                {/* 弧 AB 和 CD 的單劃橙色相等標記 */}
                <line x1="34.9" y1="45.6" x2="42.5" y2="52.0" stroke="#f97316" strokeWidth="1.5" />
                <line x1="157.5" y1="148.0" x2="165.1" y2="154.4" stroke="#f97316" strokeWidth="1.5" />
                
                <text x="60" y="24" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="14" y="80" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="135" y="185" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="182" y="130" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="110" y="100" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="等弦對等角 (圓心)"
            condition={<>若 <Latex math="AB = CD" inline />，</>}
            conclusion="\angle AOB = \angle COD"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <line x1="100" y1="100" x2="60" y2="31" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="25" y2="73" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="140" y2="169" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="175" y2="127" stroke="#334155" strokeWidth="1.5" />
                
                <line x1="60" y1="31" x2="25" y2="73" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="140" y1="169" x2="175" y2="127" stroke="#22c55e" strokeWidth="1.5" />
                
                {/* 弦 AB 和 CD 的雙綠色相等標記 */}
                <line x1="39.2" y1="50.6" x2="44.8" y2="55.2" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="41.2" y1="48.1" x2="46.8" y2="52.7" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="152.4" y1="146.3" x2="160.0" y2="152.7" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="155.0" y1="143.3" x2="162.6" y2="149.7" stroke="#22c55e" strokeWidth="1.5" />
                
                {/* AOB 和 COD 雙角標記 */}
                <path d="M 89.0 81.0 A 22 22 0 0 0 79.4 92.6" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 87.0 77.6 A 26 26 0 0 0 75.6 91.2" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 111.0 119.0 A 22 22 0 0 0 120.6 107.4" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 113.0 122.4 A 26 26 0 0 0 124.4 108.8" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                
                <text x="60" y="24" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="14" y="80" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="135" y="185" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="182" y="130" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="110" y="100" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="等角對等弦"
            condition={<>若 <Latex math="\angle AOB = \angle COD" inline />，</>}
            conclusion="AB = CD"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <line x1="100" y1="100" x2="60" y2="31" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="25" y2="73" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="140" y2="169" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="175" y2="127" stroke="#334155" strokeWidth="1.5" />
                
                <line x1="60" y1="31" x2="25" y2="73" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="140" y1="169" x2="175" y2="127" stroke="#22c55e" strokeWidth="1.5" />
                
                {/* 弦 AB 和 CD 的雙綠色相等標記 */}
                <line x1="39.2" y1="50.6" x2="44.8" y2="55.2" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="41.2" y1="48.1" x2="46.8" y2="52.7" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="152.4" y1="146.3" x2="160.0" y2="152.7" stroke="#22c55e" strokeWidth="1.5" />
                <line x1="155.0" y1="143.3" x2="162.6" y2="149.7" stroke="#22c55e" strokeWidth="1.5" />
                
                {/* AOB 和 COD 雙角標記 */}
                <path d="M 89.0 81.0 A 22 22 0 0 0 79.4 92.6" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 87.0 77.6 A 26 26 0 0 0 75.6 91.2" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 111.0 119.0 A 22 22 0 0 0 120.6 107.4" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                <path d="M 113.0 122.4 A 26 26 0 0 0 124.4 108.8" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                
                <text x="60" y="24" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="14" y="80" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="135" y="185" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="182" y="130" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="110" y="100" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="弧與圓心角成比例"
            directFormula="\overset{\frown}{AB} : \overset{\frown}{CD} = x : y"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                
                {/* Arcs */}
                <path d="M 60 30.7 A 80 80 0 0 1 140 30.7" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                <path d="M 169.3 140.0 A 80 80 0 0 1 30.7 140.0" fill="none" stroke="#f97316" strokeWidth="2.5" />
                
                {/* Radii */}
                <line x1="100" y1="100" x2="60" y2="30.7" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="140" y2="30.7" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="169.3" y2="140.0" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="30.7" y2="140.0" stroke="#334155" strokeWidth="1.5" />
                
                {/* Angles */}
                <path d="M 90.0 82.7 A 20 20 0 0 1 110.0 82.7" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                <path d="M 117.3 110.0 A 20 20 0 0 1 82.7 110.0" fill="none" stroke="#f97316" strokeWidth="1.5" />
                
                {/* Labels */}
                <text x="100" y="76" fill="#22c55e" fontSize="14" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>x</text>
                <text x="100" y="130" fill="#f97316" fontSize="14" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>y</text>
                
                <text x="50" y="25" fill="#475569" fontSize="13" textAnchor="end" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="150" y="25" fill="#475569" fontSize="13" textAnchor="start" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="175" y="150" fill="#475569" fontSize="13" textAnchor="start" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="25" y="150" fill="#475569" fontSize="13" textAnchor="end" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="85" y="104" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="弧與圓周角成比例"
            directFormula="\overset{\frown}{AB} : \overset{\frown}{CD} = p : q"
            formulaRemark="(弧與圓周角成比例)"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                
                {/* Arcs */}
                <path d="M 30.7 140 A 80 80 0 0 0 86.1 178.8" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                <path d="M 140 169.3 A 80 80 0 0 0 178.8 113.9" fill="none" stroke="#f97316" strokeWidth="2.5" />
                
                {/* Lines for Angle E */}
                <path d="M 72.6 24.8 L 30.7 140" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 72.6 24.8 L 86.1 178.8" fill="none" stroke="#334155" strokeWidth="1.5" />
                
                {/* Lines for Angle F */}
                <path d="M 127.4 24.8 L 140 169.3" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 127.4 24.8 L 178.8 113.9" fill="none" stroke="#334155" strokeWidth="1.5" />
                
                {/* Angle arcs */}
                <path d="M 64.1 48.3 A 25 25 0 0 0 74.8 49.7" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                <path d="M 130.0 54.7 A 30 30 0 0 0 142.4 50.8" fill="none" stroke="#f97316" strokeWidth="1.5" />
                
                <text x="69" y="65" fill="#22c55e" fontSize="13" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>p</text>
                <text x="136" y="66" fill="#f97316" fontSize="13" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>q</text>
                
                <text x="73" y="15" fill="#475569" fontSize="13" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>E</text>
                <text x="127" y="15" fill="#475569" fontSize="13" textAnchor="middle" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>F</text>
                <text x="21" y="145" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="80" y="195" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="145" y="185" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="185" y="115" fill="#475569" fontSize="13" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
              </svg>
            )}
          />

          <PropertyCard
            title="切線 ⊥ 半徑"
            condition={<>若 <Latex math="\text{PQ}" inline /> 是圓在 <Latex math="\text{T}" inline /> 點的切線，</>}
            conclusion="\text{PQ} \perp \text{OT}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <line x1="100" y1="100" x2="100" y2="180" stroke="#334155" strokeWidth="1.5" />
                <line x1="25" y1="180" x2="175" y2="180" stroke="#334155" strokeWidth="1.5" />
                <polygon points="100,180 100,170 110,170 110,180" fill="none" stroke="#334155" strokeWidth="1" />
                <text x="12" y="184" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>P</text>
                <text x="180" y="184" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>Q</text>
                <text x="95" y="196" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>T</text>
                <text x="95" y="90" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="切線 ⊥ 半徑 逆定理"
            condition={<>若 <Latex math="\text{OT} \perp \text{PQ}" inline />，</>}
            conclusion="\text{PQ 是圓在 T 點的切線}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <line x1="100" y1="100" x2="100" y2="180" stroke="#334155" strokeWidth="1.5" />
                <line x1="25" y1="180" x2="175" y2="180" stroke="#334155" strokeWidth="1.5" />
                <polygon points="100,180 100,170 110,170 110,180" fill="none" stroke="#334155" strokeWidth="1" />
                <text x="12" y="184" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>P</text>
                <text x="180" y="184" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>Q</text>
                <text x="95" y="196" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>T</text>
                <text x="95" y="90" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="切線性質"
            condition={<>若 <Latex math="\text{TP}" inline /> 及 <Latex math="\text{TQ}" inline /> 分別是圓在 <Latex math="\text{P}" inline /> 及 <Latex math="\text{Q}" inline /> 點的切線<br/>(由 <Latex math="\text{T}" inline /> 引出)，</>}
            conclusion="\begin{aligned} \angle TOP &= \angle TOQ \\ \angle OTP &= \angle OTQ \\ TP &= TQ \end{aligned}"
            svg={() => (
              <svg viewBox="0 0 240 200" className="w-full max-w-[240px]">
                <circle cx="80" cy="100" r="70" fill="none" stroke="#64748b" strokeWidth="1" />
                <path d="M 80 100 L 90.4 30.8" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 80 100 L 131.8 147.1" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 80 100 L 220 50" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
                
                <line x1="90.4" y1="30.8" x2="220" y2="50" stroke="#334155" strokeWidth="1.5" />
                <line x1="131.8" y1="147.1" x2="220" y2="50" stroke="#334155" strokeWidth="1.5" />
                
                {/* 垂直符號 */}
                <polygon points="90.4,30.8 100.3,32.3 98.8,42.2 88.9,40.7" fill="none" stroke="#334155" strokeWidth="1" />
                <polygon points="131.8,147.1 138.5,139.7 131.1,133.0 124.4,140.4" fill="none" stroke="#334155" strokeWidth="1" />
                
                {/* 等長標記 (TP, TQ) - 兩劃 */}
                <line x1="152.5" y1="45.0" x2="153.9" y2="35.2" stroke="#0ea5e9" strokeWidth="1.5" />
                <line x1="156.5" y1="45.6" x2="157.9" y2="35.8" stroke="#0ea5e9" strokeWidth="1.5" />
                <line x1="178.3" y1="103.4" x2="170.9" y2="96.7" stroke="#0ea5e9" strokeWidth="1.5" />
                <line x1="181.0" y1="100.4" x2="173.6" y2="93.7" stroke="#0ea5e9" strokeWidth="1.5" />
                
                {/* 角標記 POT 兩劃 (半徑 18, 22) */}
                <path d="M 82.7 82.2 A 18 18 0 0 1 97.0 93.9" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 83.3 78.3 A 22 22 0 0 1 100.7 92.6" fill="none" stroke="#334155" strokeWidth="1" />
                
                {/* 角標記 QOT 兩劃 (半徑 26, 30) */}
                <path d="M 104.5 91.3 A 26 26 0 0 1 99.2 117.5" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 108.3 89.9 A 30 30 0 0 1 102.2 120.2" fill="none" stroke="#334155" strokeWidth="1" />
                
                {/* 角標記 ∠OTP (半徑 35) 和 ∠OTQ (半徑 42) */}
                <path d="M 185.4 44.9 A 35 35 0 0 0 187.0 61.8" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 180.4 64.1 A 42 42 0 0 0 191.8 81.1" fill="none" stroke="#334155" strokeWidth="1" />
                
                <text x="82" y="24" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>P</text>
                <text x="135" y="165" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>Q</text>
                <text x="65" y="105" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
                <text x="228" y="55" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>T</text>
              </svg>
            )}
          />

          {/* Spacer: keep row 8 right side empty on desktop so next two cards become row 9 */}
          <div className="hidden md:block" aria-hidden="true"></div>

          <PropertyCard
            title="圓內接四邊形對角"
            condition={<>若 <Latex math="ABCD" inline /> 為圓內接四邊形，</>}
            conclusion="\begin{aligned} \angle ABC + \angle ADC &= 180^\circ \\ \angle BAD + \angle BCD &= 180^\circ \end{aligned}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <polygon points="151.8,39.1 33.4,55.6 54.9,166.1 172.3,134.1" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 156.0 58.7 A 20 20 0 0 1 132.0 41.9" fill="none" stroke="#22c55e" strokeWidth="2" />
                <path d="M 51.1 146.5 A 20 20 0 0 1 74.2 160.8" fill="none" stroke="#22c55e" strokeWidth="2" />
                <path d="M 53.2 52.8 A 20 20 0 0 1 37.2 75.2" fill="none" stroke="#f97316" strokeWidth="2" />
                <path d="M 153.0 139.4 A 20 20 0 0 1 168.1 114.5" fill="none" stroke="#f97316" strokeWidth="2" />
                <text x="160" y="32" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="15" y="50" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="40" y="180" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="180" y="145" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
              </svg>
            )}
          />

          <PropertyCard
            title="圓內接四邊形外角"
            condition={<>若 <Latex math="ABCD" inline /> 為圓內接四邊形，</>}
            conclusion="\angle ABC = \angle ADE"
            svg={() => (
              <svg viewBox="0 0 240 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <polygon points="151.8,39.1 33.4,55.6 54.9,166.1 172.3,134.1" fill="none" stroke="#334155" strokeWidth="1.5" />
                <line x1="54.9" y1="166.1" x2="219.3" y2="121.3" stroke="#334155" strokeWidth="1.5" />
                <path d="M 53.2 52.8 A 20 20 0 0 1 37.2 75.2" fill="none" stroke="#f97316" strokeWidth="2" />
                <path d="M 168.1 114.5 A 20 20 0 0 1 191.6 128.8" fill="none" stroke="#f97316" strokeWidth="2" />
                <text x="160" y="32" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="15" y="50" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="40" y="180" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="168" y="152" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="225" y="115" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>E</text>
              </svg>
            )}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="other-theorems" title="其他圓形定理" num={2} color="teal" activeSub={activeSub} sectionRef={s2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PropertyCard
            title="圓心至弦的垂線平分弦"
            condition={<>若 <Latex math="\text{ON} \perp \text{AB}" inline />，</>}
            conclusion="\text{AN} = \text{NB}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                {/* 弦 AB: y=150, 從 x=100 - sqrt(80^2-50^2) = 100 - 62.45 = 37.55 到 162.45 */}
                <line x1="37.5" y1="150" x2="162.5" y2="150" stroke="#334155" strokeWidth="1.5" />
                {/* 圓心到弦 ON */}
                <line x1="100" y1="100" x2="100" y2="150" stroke="#334155" strokeWidth="1.5" />
                {/* 直角符號 */}
                <polygon points="100,150 100,140 90,140 90,150" fill="none" stroke="#334155" strokeWidth="1" />
                <text x="100" y="90" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }} textAnchor="middle">O</text>
                <text x="25" y="155" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="168" y="155" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="100" y="168" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }} textAnchor="middle">N</text>
              </svg>
            )}
          />

          <PropertyCard
            title="圓心至弦中點的連線垂直弦"
            condition={<>若 <Latex math="\text{AN} = \text{NB}" inline />，</>}
            conclusion="\text{ON} \perp \text{AB} \ (\angle \text{ANO} \text{ 及 } \angle \text{ONB} = 90^\circ)"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <line x1="37.5" y1="150" x2="162.5" y2="150" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="100" y2="150" stroke="#334155" strokeWidth="1.5" />
                {/* 相等標記 */}
                <line x1="68" y1="145" x2="68" y2="155" stroke="#0ea5e9" strokeWidth="1.5" />
                <line x1="131" y1="145" x2="131" y2="155" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="100" y="90" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }} textAnchor="middle">O</text>
                <text x="25" y="155" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="168" y="155" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="100" y="168" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }} textAnchor="middle">N</text>
              </svg>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <PropertyCard
            title="弦的垂直平分線穿過圓心"
            condition={<>若 <Latex math="\text{AN} = \text{NB}" inline /> 及 <Latex math="\text{CD} \perp \text{AB}" inline />，</>}
            conclusion="\text{CD 穿過圓心 O}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <line x1="37.5" y1="150" x2="162.5" y2="150" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="#334155" strokeWidth="1.5" />
                
                {/* 垂直標記 */}
                <polygon points="100,150 100,140 110,140 110,150" fill="none" stroke="#334155" strokeWidth="1" />
                
                {/* 弦等長標記 */}
                <line x1="68" y1="145" x2="68" y2="155" stroke="#0ea5e9" strokeWidth="1.5" />
                <line x1="131" y1="145" x2="131" y2="155" stroke="#0ea5e9" strokeWidth="1.5" />
                
                <text x="108" y="105" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
                <text x="100" y="15" textAnchor="middle" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="100" y="195" textAnchor="middle" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="25" y="155" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="168" y="155" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="85" y="165" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>N</text>
              </svg>
            )}
          />

          <PropertyCard
            title="等弦與圓心等距"
            condition={<>若 <Latex math="\text{AB} = \text{CD}" inline />、<Latex math="\text{OM} \perp \text{AB}" inline /> 及 <Latex math="\text{ON} \perp \text{CD}" inline />，</>}
            conclusion="\text{OM} = \text{ON}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <line x1="24.8" y1="72.6" x2="151.4" y2="38.7" stroke="#334155" strokeWidth="1.5" />
                <line x1="24.8" y1="127.4" x2="151.4" y2="161.3" stroke="#334155" strokeWidth="1.5" />
                
                <line x1="100" y1="100" x2="88.1" y2="55.6" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="88.1" y2="144.3" stroke="#334155" strokeWidth="1.5" />
                
                <polygon points="88.1,55.6 95.8,53.5 97.9,61.2 90.2,63.3" fill="none" stroke="#334155" strokeWidth="1" />
                <polygon points="88.1,144.3 95.8,146.4 97.9,138.7 90.2,136.6" fill="none" stroke="#334155" strokeWidth="1" />
                
                <text x="14" y="80" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="156" y="36" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="156" y="172" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="14" y="128" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="75" y="48" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>M</text>
                <text x="75" y="160" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>N</text>
                <text x="108" y="105" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="與圓心等距的弦等長"
            condition={<>若 <Latex math="\text{OM} = \text{ON}" inline />、<Latex math="\text{OM} \perp \text{AB}" inline /> 及 <Latex math="\text{ON} \perp \text{CD}" inline />，</>}
            conclusion="\text{AB} = \text{CD}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <line x1="24.8" y1="72.6" x2="151.4" y2="38.7" stroke="#334155" strokeWidth="1.5" />
                <line x1="24.8" y1="127.4" x2="151.4" y2="161.3" stroke="#334155" strokeWidth="1.5" />
                
                <line x1="100" y1="100" x2="88.1" y2="55.6" stroke="#334155" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="88.1" y2="144.3" stroke="#334155" strokeWidth="1.5" />
                
                <polygon points="88.1,55.6 95.8,53.5 97.9,61.2 90.2,63.3" fill="none" stroke="#334155" strokeWidth="1" />
                <polygon points="88.1,144.3 95.8,146.4 97.9,138.7 90.2,136.6" fill="none" stroke="#334155" strokeWidth="1" />
                
                {/* 相等距離標記 on OM and ON */}
                <line x1="90" y1="78.8" x2="98" y2="76.8" stroke="#0ea5e9" strokeWidth="1.5" />
                <line x1="90" y1="121.2" x2="98" y2="123.2" stroke="#0ea5e9" strokeWidth="1.5" />

                <text x="14" y="80" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="156" y="36" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="156" y="172" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="14" y="128" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="75" y="48" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>M</text>
                <text x="75" y="160" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>N</text>
                <text x="108" y="105" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="交錯弓形圓周角逆定理"
            condition={<>若 <Latex math="\angle QAC = \angle ABC" inline />，</>}
            conclusion="\text{PQ 是圓在 A 點的切線}"
            svg={() => (
              <svg viewBox="0 0 200 240" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <polygon points="43.4,156.6 100,20 180,100" fill="none" stroke="#334155" strokeWidth="1.5" />
                <line x1="13.4" y1="126.6" x2="93.4" y2="206.6" stroke="#334155" strokeWidth="1.5" />
                
                {/* Angle QAC double arc */}
                <path d="M 61.9 148.9 A 20 20 0 0 1 57.5 170.7" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 65.6 147.4 A 24 24 0 0 1 60.4 173.6" fill="none" stroke="#334155" strokeWidth="1" />
                
                {/* Angle ABC double arc */}
                <path d="M 114.1 34.1 A 20 20 0 0 1 92.3 38.5" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 117.0 37.0 A 24 24 0 0 1 90.8 42.2" fill="none" stroke="#334155" strokeWidth="1" />
                
                <text x="25" y="165" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="95" y="12" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="188" y="105" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="5" y="125" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>P</text>
                <text x="100" y="215" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>Q</text>
              </svg>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <PropertyCard
            title="對角互補 (圓內接逆定理)"
            condition={<>若 <Latex math="\angle DAB + \angle BCD = 180^\circ" inline />，</>}
            conclusion="\text{ABCD 共圓}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <polygon points="40,160 160,160 140,40 60,20" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 60 160 A 20 20 0 0 0 42.8 140.2" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 120.6 35.2 A 20 20 0 0 0 143.3 59.7" fill="none" stroke="#334155" strokeWidth="1.5" />
                
                <text x="25" y="170" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="165" y="170" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="145" y="30" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="45" y="15" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
              </svg>
            )}
          />

          <PropertyCard
            title="外角=內對角 (逆定理)"
            condition={<>若 <Latex math="\angle ADC = \angle CBE" inline />，</>}
            conclusion="\text{ABCD 共圓}"
            svg={() => (
              <svg viewBox="0 0 240 200" className="w-full max-w-[240px]">
                <polygon points="40,160 160,160 140,40 60,20" fill="none" stroke="#334155" strokeWidth="1.5" />
                <line x1="160" y1="160" x2="220" y2="160" stroke="#334155" strokeWidth="1.5" />
                <path d="M 57.2 39.8 A 20 20 0 0 0 79.4 24.8" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 156.7 140.3 A 20 20 0 0 1 180 160" fill="none" stroke="#334155" strokeWidth="1.5" />
                
                <text x="25" y="170" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="155" y="178" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="145" y="30" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="45" y="15" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="225" y="165" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>E</text>
              </svg>
            )}
          />

        </div>
      </CollapsibleSection>

    </>
  );
};

// ========================================
// CH18 線性規劃 (F5)
// ========================================
export const LinearProgrammingNotes = ({ activeSub, onNavigate }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-pink-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH18 線性規劃 (Linear Programming)</h1>
        <p className="text-slate-600">透過線段的不等式找尋點的範圍、最大值及最小值</p>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
        <p className="text-amber-800 font-bold">💡 考試小貼士：</p>
        <ul className="list-disc pl-5 mt-1 text-sm text-amber-900 space-y-1">
          <li>此課題為 DSE 冷門 topic，需認識但不會佔太多分。</li>
          <li>DSE 通常考 3 條線或以上 (只考直線)。</li>
        </ul>
      </div>

      <CollapsibleSection id="lp-range" title="透過線段的不等式找範圍" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 判斷大細區域</h3>
            <p className="text-sm text-slate-700 mb-4">
              畫出直線後，可以透過 <Latex math="y" inline /> 的大細來判斷不等式所代表的區域範圍。
            </p>
            
            {/* 📐 線性規劃大於小於區域圖 */}
            <div className="bg-white border text-center border-slate-200 shadow-sm rounded-lg p-4 mb-4 flex justify-center">
              <svg viewBox="0 0 300 240" className="w-full max-w-md">
                <defs>
                  <marker id="lp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#334155" />
                  </marker>
                </defs>
                
                {/* 區域填色 */}
                <polygon points="50,210 50,10 250,10" fill="#fef08a" opacity="0.4" />
                <polygon points="50,210 250,210 250,10" fill="#fbcfe8" opacity="0.4" />

                {/* 網格線 */}
                <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4">
                  <line x1="70" y1="10" x2="70" y2="210" />
                  <line x1="110" y1="10" x2="110" y2="210" />
                  <line x1="190" y1="10" x2="190" y2="210" />
                  <line x1="230" y1="10" x2="230" y2="210" />
                  <line x1="50" y1="30" x2="250" y2="30" />
                  <line x1="50" y1="70" x2="250" y2="70" />
                  <line x1="50" y1="110" x2="250" y2="110" />
                  <line x1="50" y1="190" x2="250" y2="190" />
                </g>

                {/* 坐標軸 */}
                <line x1="40" y1="150" x2="270" y2="150" stroke="#334155" strokeWidth="1.5" markerEnd="url(#lp-arrow)" />
                <line x1="150" y1="220" x2="150" y2="15" stroke="#334155" strokeWidth="1.5" markerEnd="url(#lp-arrow)" />

                {/* 刻度標籤 */}
                <g fontSize="10" fill="#64748b" textAnchor="middle">
                  <text x="70" y="165">-2</text>
                  <text x="110" y="165">-1</text>
                  <text x="190" y="165">1</text>
                  <text x="230" y="165">2</text>
                </g>
                <g fontSize="10" fill="#64748b" textAnchor="end">
                  <text x="142" y="193">-1</text>
                  <text x="142" y="113">1</text>
                  <text x="142" y="73">2</text>
                  <text x="142" y="33">3</text>
                  <text x="142" y="165">0</text>
                </g>

                {/* 坐標軸標籤 */}
                <text x="275" y="154" fontSize="12" fill="#334155" fontStyle="italic">x</text>
                <text x="135" y="20" fontSize="12" fill="#334155" fontStyle="italic">y</text>

                {/* 直線 y = x + 1 */}
                <line x1="50" y1="210" x2="250" y2="10" stroke="#1e293b" strokeWidth="2" />
                <text x="195" y="80" fontSize="12" fill="#1e293b" fontStyle="italic" fontWeight="bold">y = x + 1</text>

                {/* 區域標籤與文字塊 */}
                <text x="80" y="45" fontSize="14" fill="#a16207" fontWeight="bold" textAnchor="middle">區域 A</text>
                <g transform="translate(40, 60)">
                  <rect width="80" height="24" rx="4" fill="#fde047" opacity="0.9"/>
                  <text x="40" y="16" fontSize="12" fill="#854d0e" fontWeight="bold" textAnchor="middle">y &gt; x + 1</text>
                </g>

                <text x="220" y="185" fontSize="14" fill="#be185d" fontWeight="bold" textAnchor="middle">區域 B</text>
                <g transform="translate(180, 130)">
                  <rect width="80" height="24" rx="4" fill="#fbcfe8" opacity="0.9"/>
                  <text x="40" y="16" fontSize="12" fill="#9d174d" fontWeight="bold" textAnchor="middle">y &lt; x + 1</text>
                </g>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <span className="bg-yellow-200 px-2 py-1 rounded font-bold mb-2 inline-block"><Latex math="y > x + 1" inline /></span>
                <p className="text-sm text-slate-600">代表直線<strong>上方</strong>的區域 (區域 A)</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <span className="bg-pink-200 px-2 py-1 rounded font-bold mb-2 inline-block"><Latex math="y < x + 1" inline /></span>
                <p className="text-sm text-slate-600">代表直線<strong>下方</strong>的區域 (區域 B)</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="lp-mc" title="MC 主要題型：考最大值 / 最小值" num={2} color="red" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-2">📌 解題步驟</h3>
            <ul className="text-sm text-slate-800 space-y-2 list-decimal pl-5">
              <li>
                <strong>找所有交點</strong>：將提供的不等式當成等式，互相聯立解方程，找出所有可能成為極值的「交點組合」。<br/>
                <span className="text-slate-600 text-xs">（如果考 3 條線，則有 3 個交點；如果考 4 條線，則有 {'>'} 4 個交點。像畫「井」字可能有多個交點）</span>
              </li>
              <li><strong>逐個交點代入</strong>：將剛才找到的坐標逐一代入題目所求的數式，比較以找出最大值或最小值。</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="bg-slate-100 flex items-center justify-between px-3 py-1 rounded w-fit mb-3">
              <span className="text-sm text-slate-600 font-bold">例題：2013-DSE-MC-Q37 (46%)</span>
            </div>
            <p className="text-sm text-slate-700 mb-2">考慮以下的不等式組，設 D 為表示以下的解之區域：</p>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-sm w-fit mb-3">
              ① <Latex math="x \ge 2" inline /><br/>
              ② <Latex math="y \ge 0" inline /><br/>
              ③ <Latex math="x + 4y \le 22" inline /><br/>
              ④ <Latex math="4x - y \le 20" inline />
            </div>
            <p className="text-sm text-slate-700 mb-3">
              若 <Latex math="(x, y)" inline /> 為 D 中的一點，則 <span className="bg-green-100 px-1 rounded font-bold text-green-800"><Latex math="3y - 4x + 15" inline /></span> 的最大值為？
            </p>

            <div className="border-t border-slate-200 pt-3 mt-3">
              <h4 className="font-bold text-indigo-700 mb-2">1. 找所有交點組合</h4>
              
              <div className="bg-indigo-50 p-3 rounded-lg text-sm mb-3">
                <p className="font-bold text-indigo-800 mb-1">例如組合 ① + ③：</p>
                <div className="ml-4 space-y-1">
                  <p>把不等式當成 "=" 處理：用 <Latex math="x = 2" inline /> 和 <Latex math="x + 4y = 22" inline /></p>
                  <p>代入計算 <Latex math="\Rightarrow 2 + 4y = 22 \Rightarrow 4y = 20 \Rightarrow y = 5" inline /></p>
                  <p className="text-indigo-700 font-bold pt-1">→ <Latex math="(2, 5)" inline /> 是其中一個交點</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-4">其他可能組合如 ①+②=(2, 0) 等等... 將找出所有合理交點。</p>

              <h4 className="font-bold text-green-700 mb-2">2. 逐個交點代入數式比較最大值 / 最小值</h4>
              <p className="text-sm text-slate-600 mb-2">將找到的交點 <Latex math="(2, 5)" inline /> 代入目標式子 <span className="text-red-500 font-mono bg-red-50 px-1 rounded">3y - 4x + 15</span>：</p>
              <div className="bg-green-50 p-3 rounded-lg text-sm font-sans mx-auto md:mx-0 w-fit">
                <Latex math="3(5) - 4(2) + 15" block />
                <Latex math="= 15 - 8 + 15" block />
                <Latex math="= 22" block />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="lp-long" title="長答題型：設立約束條件 (求不等式組)" num={3} color="green" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">💡 概念與技巧</h3>
            <p className="text-sm text-slate-700 mb-2">
              計算總營養或總成本時，通常是需要將<span className="font-bold">不同食物/物品的份量相加</span>。
            </p>
            <p className="text-sm text-slate-700">
              必須思考現實生活中：<span className="bg-yellow-200 px-1 rounded font-bold text-slate-800">變量可否是負數？</span><br/>
              通常數量、重量不能為負，所以必定隱含 <Latex math="x \ge 0, y \ge 0" inline /> 的條件。
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-700 mb-3">
              <span className="font-bold">例子：</span>某廚師把 <Latex math="x\text{ kg}" inline /> 的食物 R 和 <Latex math="y\text{ kg}" inline /> 的食物 T 混合起來。<br/>
              混合物中，<span className="border-b-2 border-blue-500">鉀的含量最少 16 單位</span>，而<span className="border-b-2 border-red-500">鐵的含量最少 20 單位</span>。<br/>
              1 kg 食物 R 和 1 kg 食物 T 的營養成分如下表所示：
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full max-w-sm text-center border-collapse border border-slate-400 text-sm text-slate-800 shadow-sm mx-auto md:mx-0">
                <thead className="bg-[#fde68a]">
                  <tr>
                    <th className="border border-slate-400 p-2 w-1/3"></th>
                    <th className="border border-slate-400 p-2 w-1/3">鉀</th>
                    <th className="border border-slate-400 p-2 w-1/3">鐵</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#fef3c7]">
                    <td className="border border-slate-400 p-2 font-bold">食物 R</td>
                    <td className="border border-slate-400 p-2">3 單位</td>
                    <td className="border border-slate-400 p-2">2 單位</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-slate-400 p-2 font-bold">食物 T</td>
                    <td className="border border-slate-400 p-2">2 單位</td>
                    <td className="border border-slate-400 p-2">6 單位</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
              <p className="font-bold text-slate-800 mb-2 bg-yellow-200 inline-block px-1 rounded">(a) 寫出所有關於 <Latex math="x" inline /> 和 <Latex math="y" inline /> 的約束條件：</p>
              
              <div className="flex bg-white p-4 rounded border border-slate-200 w-fit mx-auto md:mx-0">
                <div className="text-4xl text-slate-300 font-light mr-3 mt-1 flex items-center justify-center">{'{'}</div>
                <div className="space-y-2 text-slate-800 flex flex-col justify-center">
                  <div className="flex gap-3 items-center min-h-8">
                    <span className="text-blue-700 font-bold whitespace-nowrap text-lg leading-none"><Latex math="3x + 2y \ge 16" inline /></span>
                    <span className="text-xs font-sans text-slate-500 bg-slate-100 px-2 py-0.5 rounded">← 鉀最少 16</span>
                  </div>
                  <div className="flex gap-3 items-center min-h-8">
                    <span className="text-red-500 font-bold whitespace-nowrap text-lg leading-none"><Latex math="2x + 6y \ge 20" inline /></span>
                    <span className="text-xs font-sans text-slate-500 bg-slate-100 px-2 py-0.5 rounded">← 鐵最少 20</span>
                  </div>
                  <div className="flex gap-3 items-center min-h-8">
                    <span className="text-indigo-700 font-bold whitespace-nowrap text-lg leading-none"><Latex math="x \ge 0" inline /></span>
                    <span className="text-xs font-sans text-slate-500 bg-slate-100 px-2 py-0.5 rounded">← 重量不可為負</span>
                  </div>
                  <div className="flex gap-3 items-center min-h-8">
                    <span className="text-indigo-700 font-bold whitespace-nowrap text-lg leading-none"><Latex math="y \ge 0" inline /></span>
                    <span className="text-xs font-sans text-slate-500 bg-slate-100 px-2 py-0.5 rounded">← 重量不可為負</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </CollapsibleSection>

    </>
  );
};

export const LocusAndCircleNotes = ({ activeSub, onNavigate }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  useEffect(() => {
    const refs = { 'locus-drawing': s1, 'circle-equation': s2, 'circle-features': s3, 'point-and-circle': s4, 'line-and-circle': s5 };
    if (activeSub && refs[activeSub]?.current) {
      refs[activeSub].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSub]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">CH19 軌跡及圓的方程</h1>
        <p className="text-slate-600">軌跡的代數方程及圓形相關運算</p>
      </div>

      <CollapsibleSection id="locus-drawing" title="繪畫及描述軌跡" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <p className="text-slate-700">以下是一些軌跡的例子：</p>
          <div className="grid grid-cols-1 gap-4">
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-emerald-600 font-bold mb-1">條件：<span className="text-slate-700 font-normal">一動點 <Latex math="P" inline /> 與一固定點 <Latex math="A" inline /> 保持固定距離 <Latex math="d" inline />。</span></div>
              <div className="text-emerald-600 font-bold mb-3">軌跡：<span className="text-slate-700 font-normal">一個圓心為 <Latex math="A" inline /> 及半徑為 <Latex math="d" inline /> 的圓</span></div>
              {/* 📐 軌跡例1：固定點固定距離 */}
              <div className="flex justify-center my-4">
                <svg viewBox="0 0 200 120" className="w-48 h-auto" overflow="visible">
                  <circle cx="100" cy="60" r="40" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="100" cy="60" r="3" fill="#0f172a" />
                  <text x="100" y="52" fontSize="14" textAnchor="middle" fill="#0f172a" fontWeight="bold">A</text>
                  <line x1="100" y1="60" x2="135" y2="40" stroke="#64748b" strokeWidth="1.5" />
                  <circle cx="135" cy="40" r="3" fill="#ef4444" />
                  <text x="144" y="38" fontSize="14" fill="#ef4444" fontWeight="bold">P</text>
                  <text x="117" y="45" fontSize="14" fill="#64748b" fontWeight="bold">d</text>
                </svg>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-emerald-600 font-bold mb-1">條件：<span className="text-slate-700 font-normal">一動點 <Latex math="P" inline /> 與一對平行線 <Latex math="L_1" inline /> 和 <Latex math="L_2" inline /> 保持相等距離。</span></div>
              <div className="text-emerald-600 font-bold mb-3">軌跡：<span className="text-slate-700 font-normal">一條位於 <Latex math="L_1" inline /> 和 <Latex math="L_2" inline /> 中間，且平行於 <Latex math="L_1" inline /> 和 <Latex math="L_2" inline /> 的直線 <Latex math="L" inline /></span></div>
              {/* 📐 軌跡例2：兩平行線相等距離 */}
              <div className="flex justify-center my-4">
                <svg viewBox="0 0 200 120" className="w-56 h-auto" overflow="visible">
                  <line x1="20" y1="30" x2="180" y2="30" stroke="#0f172a" strokeWidth="2" />
                  <text x="185" y="34" fontSize="14" fill="#0f172a" fontWeight="bold">L₁</text>
                  
                  <line x1="20" y1="90" x2="180" y2="90" stroke="#0f172a" strokeWidth="2" />
                  <text x="185" y="94" fontSize="14" fill="#0f172a" fontWeight="bold">L₂</text>
                  
                  <line x1="20" y1="60" x2="180" y2="60" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="185" y="64" fontSize="14" fill="#2563eb" fontWeight="bold">L</text>
                  
                  <line x1="100" y1="30" x2="100" y2="90" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="100" cy="60" r="3" fill="#ef4444" />
                  <text x="106" y="54" fontSize="14" fill="#ef4444" fontWeight="bold">P</text>
                  
                  <line x1="97" y1="45" x2="103" y2="45" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="97" y1="75" x2="103" y2="75" stroke="#64748b" strokeWidth="1.5" />
                  <polyline points="100,35 105,35 105,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <polyline points="100,55 105,55 105,60" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <polyline points="100,85 105,85 105,90" fill="none" stroke="#64748b" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-emerald-600 font-bold mb-1">條件：<span className="text-slate-700 font-normal">一動點 <Latex math="P" inline /> 與直線 <Latex math="L" inline /> 保持固定距離 <Latex math="d" inline />。</span></div>
              <div className="text-emerald-600 font-bold mb-3">軌跡：<span className="text-slate-700 font-normal">兩條與 <Latex math="L" inline /> 相距 <Latex math="d" inline />，且平行於 <Latex math="L" inline /> 的直線 <Latex math="L_1" inline /> 和 <Latex math="L_2" inline /></span></div>
              {/* 📐 軌跡例3：一直線固定距離 */}
              <div className="flex justify-center my-4">
                <svg viewBox="0 0 200 120" className="w-56 h-auto" overflow="visible">
                  <line x1="20" y1="60" x2="180" y2="60" stroke="#0f172a" strokeWidth="2" />
                  <text x="185" y="64" fontSize="14" fill="#0f172a" fontWeight="bold">L</text>
                  
                  <line x1="20" y1="20" x2="180" y2="20" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="185" y="24" fontSize="14" fill="#2563eb" fontWeight="bold">L₁</text>
                  
                  <line x1="20" y1="100" x2="180" y2="100" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="185" y="104" fontSize="14" fill="#2563eb" fontWeight="bold">L₂</text>
                  
                  <line x1="80" y1="20" x2="80" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="120" y1="60" x2="120" y2="100" stroke="#94a3b8" strokeWidth="1.5" />

                  <circle cx="80" cy="20" r="3" fill="#ef4444" />
                  <text x="86" y="14" fontSize="14" fill="#ef4444" fontWeight="bold">P</text>
                  <text x="70" y="44" fontSize="14" fill="#64748b" fontWeight="bold">d</text>

                  <circle cx="120" cy="100" r="3" fill="#ef4444" />
                  <text x="126" y="114" fontSize="14" fill="#ef4444" fontWeight="bold">P</text>
                  <text x="128" y="84" fontSize="14" fill="#64748b" fontWeight="bold">d</text>
                  
                  <polyline points="80,55 85,55 85,60" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <polyline points="120,65 125,65 125,60" fill="none" stroke="#64748b" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-emerald-600 font-bold mb-1">條件：<span className="text-slate-700 font-normal">一動點 <Latex math="P" inline /> 與兩個固定點 <Latex math="A" inline /> 和 <Latex math="B" inline /> 保持相等距離。</span></div>
              <div className="text-emerald-600 font-bold mb-3">軌跡：<span className="text-slate-700 font-normal">線段 <Latex math="AB" inline /> 的垂直平分線</span></div>
              {/* 📐 軌跡例4：兩點相等距離 */}
              <div className="flex justify-center my-4">
                <svg viewBox="0 0 200 120" className="w-56 h-auto" overflow="visible">
                  <line x1="50" y1="60" x2="150" y2="60" stroke="#0f172a" strokeWidth="2" />
                  <circle cx="50" cy="60" r="3" fill="#0f172a" />
                  <text x="36" y="64" fontSize="14" fill="#0f172a" fontWeight="bold">A</text>
                  <circle cx="150" cy="60" r="3" fill="#0f172a" />
                  <text x="157" y="64" fontSize="14" fill="#0f172a" fontWeight="bold">B</text>

                  <line x1="100" y1="10" x2="100" y2="110" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
                  
                  <line x1="100" y1="30" x2="50" y2="60" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="100" y1="30" x2="150" y2="60" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                  
                  <circle cx="100" cy="30" r="3" fill="#ef4444" />
                  <text x="108" y="26" fontSize="14" fill="#ef4444" fontWeight="bold">P</text>
                  
                  <line x1="75" y1="56" x2="75" y2="64" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="125" y1="56" x2="125" y2="64" stroke="#64748b" strokeWidth="1.5" />
                  <polyline points="100,55 105,55 105,60" fill="none" stroke="#64748b" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-emerald-600 font-bold mb-1">條件：<span className="text-slate-700 font-normal">一動點 <Latex math="P" inline /> 與兩條相交線保持相等距離。</span></div>
              <div className="text-emerald-600 font-bold mb-3">軌跡：<span className="text-slate-700 font-normal">兩條相交線所形成的角的兩條角平分線。</span></div>
              {/* 📐 軌跡例5：兩相交線相等距離 */}
              <div className="flex justify-center my-4">
                <svg viewBox="0 0 200 160" className="w-56 h-auto" overflow="visible">
                  <line x1="20" y1="80" x2="180" y2="80" stroke="#0f172a" strokeWidth="2" />
                  <line x1="60" y1="140" x2="140" y2="20" stroke="#0f172a" strokeWidth="2" />
                  
                  {/* Angle bisectors */}
                  {/* Bisector 1: angle ~ 31.7 deg */}
                  <line x1="40" y1="120" x2="160" y2="40" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
                  {/* Bisector 2: perpendicular */}
                  <line x1="60" y1="20" x2="140" y2="140" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />

                  <circle cx="130" cy="60" r="3" fill="#ef4444" />
                  <text x="135" y="55" fontSize="14" fill="#ef4444" fontWeight="bold">P</text>
                  
                  <line x1="130" y1="60" x2="130" y2="80" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="130" y1="60" x2="114" y2="50" stroke="#94a3b8" strokeWidth="1.5" />

                  {/* Right angles */}
                  <polyline points="130,75 125,75 125,80" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <polyline points="116,46 119,42 123,45" fill="none" stroke="#64748b" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 mt-6">
            <h3 className="font-bold text-slate-800 mb-3">📝 軌跡的代數方程例子</h3>
            <p className="text-sm text-slate-600 mb-3">已知一動點 <Latex math="P" inline /> 與 <Latex math="A(3, 7)" inline /> 和 <Latex math="B(-4, 0)" inline /> 兩點保持相等距離。求 <Latex math="P" inline /> 的軌跡方程。</p>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-slate-50 p-3 rounded">
                <p className="text-slate-700 mb-2">設 <Latex math="P" inline /> 的坐標為 <Latex math="(x, y)" inline />。</p>
                <div className="flex flex-col items-center">
                  <Latex math="\begin{aligned} AP &= BP \\ \sqrt{(x - 3)^2 + (y - 7)^2} &= \sqrt{[x - (-4)]^2 + (y - 0)^2} \\ (x - 3)^2 + (y - 7)^2 &= (x + 4)^2 + y^2 \\ -14x - 14y + 42 &= 0 \\ x + y - 3 &= 0 \end{aligned}" block />
                </div>
                <p className="text-slate-700 mt-2">∴ <Latex math="P" inline /> 的軌跡方程是 <Latex math="x + y - 3 = 0" inline />。</p>
              </div>
              <div className="flex-1 text-sm text-blue-700 space-y-3 pt-6 border-l-2 border-blue-200 pl-4 hidden md:block">
                <p>步驟 1： 設動點的坐標為 <Latex math="(x, y)" inline />。</p>
                <p>步驟 2： 根據該動點須滿足的條件，建立一個以 <Latex math="x" inline /> 和 <Latex math="y" inline /> 為變數的方程。</p>
                <p>步驟 3： 倘若可行，化簡該方程。</p>
              </div>
            </div>
          </div>

        </div>
      </CollapsibleSection>

      <CollapsibleSection id="circle-equation" title="圓形方程" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-purple-100 text-purple-900 px-3 py-1.5 rounded-md inline-block font-bold">
            需知道 / 可找到 圓心坐標 <Latex math="(x,y)" inline />，以及半徑 <Latex math="r" inline />
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-3">📝 2.1 標準式</h3>
            <MathDisplay math="(x - \text{x坐標})^2 + (y - \text{y坐標})^2 = \text{半徑}^2" />
            <div className="bg-white border border-slate-200 rounded p-4 mt-3">
              <p className="text-blue-800 font-bold mb-2">e.g. 已知一圓的圓心 <Latex math="(-1, 6)" inline /> 和半徑 9，可列出：</p>
              <pre className="whitespace-pre font-sans text-lg text-blue-900 flex flex-col items-center">
                <div>
                  <Latex math="[x - (-1)]^2 + (y - 6)^2 = 9^2" block />
                  <Latex math="(x + 1)^2 + (y - 6)^2 = 81" block />
                </div>
              </pre>
              <p className="text-purple-700 text-sm mt-3 text-right">← 不需展開有代數的 <Latex math="(\ )^2" inline />，只需化簡數字</p>
            </div>
          </div>

          <div className="cursor-pointer mx-auto w-12 text-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto transform rotate-180 scale-x-[-1] animate-bounce"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
            <span className="text-xs font-bold text-red-600 block mt-1">拆括號再按次序排列</span>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-3">📝 2.2 一般式</h3>
            <MathDisplay math="x^2 + y^2 + Dx + Ey + F = 0" />
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center bg-white p-3 rounded border border-slate-200">
              <span className="text-blue-800 font-bold text-lg"><span className="text-slate-600">圓心：</span><Latex math="\left( -\frac{D}{2}, -\frac{E}{2} \right)" inline /></span>
              <span className="text-blue-800 font-bold text-lg mt-3 md:mt-0"><span className="text-slate-600">半徑：</span><Latex math="\sqrt{\left(\frac{D}{2}\right)^2 + \left(\frac{E}{2}\right)^2 - F}" inline /></span>
            </div>
          </div>

        </div>
      </CollapsibleSection>

      <CollapsibleSection id="circle-features" title="題目問法及找圓心半徑" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-6">
          <h3 className="font-bold text-slate-800">題目問法：</h3>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2">1. 已提供圓心、半徑，要求你寫方程</h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><span className="text-red-600 font-bold">寫標準式</span>，如題目要求 / 需後續找其他才拆成一般式。</li>
              <li>某些題目需自己找半徑。<br/>
                <span className="text-green-600 text-sm">（例如：已知通過圓心及圓上一點，可計距離；或給直徑兩端，計中點為圓心，距離為半徑等。）</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2">2. 已提供圓形方程，要求你找圓心及半徑</h4>
            
            <div className="mt-4">
              <div className="bg-slate-50 p-3 rounded mb-3">
                <span className="text-red-500 font-bold mr-2">標準式：</span>
                <Latex math="(x - \color{#16a34a}{3})^2 + (y - \color{#9333ea}{4})^2 = \color{#2563eb}{36}" block />
                <div className="text-center mt-3 text-slate-800 font-bold text-lg">
                  ∴ 圓心：<Latex math="(\color{#16a34a}{3}, \color{#9333ea}{4})" inline />，半徑：<Latex math="\sqrt{\color{#2563eb}{36}} = 6" inline />
                </div>
                <p className="text-xs text-slate-500 text-center mt-2">註：加減號為固定格式，數字本身為答案資料</p>
              </div>

              <div className="bg-slate-50 p-3 rounded mt-6">
                <span className="text-red-500 font-bold mr-2">一般式：</span>
                <Latex math="x^2 + y^2 \color{#16a34a}{-6}x \color{#9333ea}{+8}y \color{#2563eb}{-11} = 0" block />
                <div className="text-center mt-3 text-slate-800 font-bold text-lg">
                  圓心：<Latex math="\left( \frac{\color{#16a34a}{-6}}{-2}, \frac{\color{#9333ea}{+8}}{-2} \right) \rightarrow (3, -4)" inline />
                </div>
                <div className="text-center mt-2 text-slate-800 font-bold text-lg">
                  半徑：<Latex math="\sqrt{(3)^2 + (-4)^2 - (\color{#2563eb}{-11})} = \sqrt{36} = 6" inline />
                </div>
                
                <div className="mt-5 border-t border-slate-200 pt-4 flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1">
                    <p className="text-blue-800 font-bold text-sm mb-1">e.g. 若係數不為 1，需先全式除之：</p>
                    <Latex math="\color{#0e7490}{2x^2 + 2y^2 - 12x + 16y - 22 = 0}" block />
                    <p className="text-green-600 font-bold text-sm text-center my-1">全式 ÷ 2 ↓</p>
                    <Latex math="\color{#16a34a}{\underline{x^2 + y^2}} \color{#0e7490}{- 6x + 8y - 11 = 0}" block />
                  </div>
                  <div className="text-green-600 font-bold text-lg bg-green-50 px-3 py-2 rounded shrink-0">
                    <Latex math="x^2" inline /> 和 <Latex math="y^2" inline /> 的係數必定為 1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="point-and-circle" title="點與圓形的位置關係" num={4} color="orange" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800">3. 問點在圖形內 / 在圓上 / 外？</h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-800 mb-2">以代數法找：</h4>
            <div className="flex items-center justify-around my-4 bg-white p-4 rounded shadow-sm">
              <div className="text-center">
                <div className="text-green-600 font-bold text-lg border-b-2 border-green-600 px-2 pb-1 mb-1">代入結果 &lt; 0</div>
                <div className="text-green-800 font-bold text-xl">內 (負數)</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 font-bold text-lg border-b-2 border-blue-600 px-2 pb-1 mb-1">代入結果 = 0</div>
                <div className="text-blue-800 font-bold text-xl">在圓上</div>
              </div>
              <div className="text-center">
                <div className="text-purple-600 font-bold text-lg border-b-2 border-purple-600 px-2 pb-1 mb-1">代入結果 &gt; 0</div>
                <div className="text-purple-800 font-bold text-xl">外 (正數)</div>
              </div>
            </div>

            <div className="bg-white rounded p-4 border border-slate-200 mt-4">
              <p className="text-blue-800 font-bold mb-2 text-sm md:text-base">
                e.g. <Latex math="A(0, 1)" inline /> 在圓形 <Latex math="x^2 + y^2 - 6x + 8y - 11 = 0" inline /> 的圓內、圓外或圓上？
              </p>
              <pre className="whitespace-pre font-sans text-blue-900 mt-2">
                <Latex math="\begin{aligned} &\quad x^2 + y^2 - 6x + 8y - 11 \\ &= (\color{#ef4444}{0})^2 + (\color{#22c55e}{1})^2 - 6(\color{#ef4444}{0}) + 8(\color{#22c55e}{1}) - 11 \\ &= -2 \\ &\quad -2 < 0 \end{aligned}" block />
              </pre>
              <p className="text-slate-800 font-bold mt-2">∴ <Latex math="A" inline /> 點位於圖形內</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <h3 className="font-bold text-red-800 mb-2">💡 特別提示：三點共圓 (深!)</h3>
            <p className="text-sm text-slate-700">
              給予 3 點坐標，可以設立 3 個方程組求一般式的 <Latex math="D, E, F" inline /> 常數。
            </p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="line-and-circle" title="直線和圓形的交點數目" num={5} color="red" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-5 border border-slate-200">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <p className="text-blue-800 font-bold text-lg mb-2">e.g.</p>
                <div className="pl-4 border-l-2 border-slate-300 space-y-1">
                  <p className="text-blue-900"><span className="mr-2">圓形 C :</span> <Latex math="x^2 + y^2 + 8x + 8y - 32 = 0" inline /></p>
                  <p className="text-blue-900"><span className="mr-2">直線 L :</span> <Latex math="x + y + 2 = 0" inline /></p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex justify-center bg-blue-50 py-2 px-4 rounded w-full">
                  <Latex math="\color{#dc2626}{x = -y - 2}" block />
                </div>
                <div className="flex-1 text-green-700 font-bold text-sm">
                  1. 先將直線方程轉為 <Latex math="x = ? / y = ?" inline />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex justify-center bg-blue-50 py-2 px-4 rounded w-full">
                  <Latex math="(\color{#dc2626}{-y-2})^2 + y^2 + 8(\color{#dc2626}{-y-2}) + 8y - 32 = 0" block />
                </div>
                <div className="flex-1 text-green-700 font-bold text-sm">
                  2. 把 x 代 y / 把 y 代 x<br/>
                  <span className="text-purple-700 tracking-wider">（直線方程代進圓形方程）</span>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <div className="h-4 border-l-2 border-slate-300"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex flex-col items-center bg-blue-50 py-2 px-4 rounded w-full">
                  <Latex math="y^2 + 4y + 4 + y^2 - 8y - 16 + 8y - 32 = 0" block />
                  <Latex math="\color{#1d4ed8}{2y^2 + 4y - 44 = 0}" block />
                  <p className="text-xs text-purple-700 mt-1 mb-2">a &emsp;&emsp; b &emsp;&emsp; c</p>
                  <Latex math="\underline{y^2 + 2y - 22 = 0}" block />
                </div>
                <div className="flex-1 text-green-700 font-bold text-sm">
                  3. 化簡至一般式一元二次方程
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex flex-col items-center bg-blue-50 py-2 px-4 rounded w-full">
                  <Latex math="\begin{aligned} \Delta &= b^2 - 4ac \\ &= 2^2 - 4(1)(-22) \\ &= 92 > 0 \end{aligned}" block />
                  <div className="mt-3 font-bold text-blue-900 border-t border-slate-300 pt-2">
                    ∴ 圓形 C 和直線 L 有 2 個交點
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-green-700 font-bold text-sm mb-3">
                    4. 利用判別式找交點數目
                  </div>
                  <div className="bg-slate-100 p-2 rounded text-center grid grid-cols-3 gap-2 text-xs border border-slate-300">
                    <div className="border-r border-slate-300 pr-2">
                      <div className="font-bold text-blue-800">情況 I</div>
                      <div><Latex math="\Delta > 0" inline /></div>
                      <div className="font-bold mt-1">有兩個交點</div>
                    </div>
                    <div className="border-r border-slate-300 pr-2">
                      <div className="font-bold text-slate-800">情況 II</div>
                      <div><Latex math="\Delta = 0" inline /></div>
                      <div className="font-bold mt-1">有一個交點</div>
                    </div>
                    <div>
                      <div className="font-bold text-red-800">情況 III</div>
                      <div><Latex math="\Delta < 0" inline /></div>
                      <div className="font-bold mt-1">沒有交點</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mt-4">
            <h3 className="font-bold text-amber-900 mb-3">💡 直線和圓形方程的交點坐標：計算機 Prog 02</h3>
            <div className="bg-white p-3 rounded border border-slate-200 flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1">
                <Latex math="\begin{cases} \enspace\color{#fbbf24}{1}x \color{#fbbf24}{-5}y = \color{#fbbf24}{-3} \\ \enspace x^2 + y^2 + 2x - 6y - 3 = 0 \end{cases}" block />
              </div>
              <div className="flex-1 text-slate-800 font-bold text-center mt-3 md:mt-0">
                <span className="text-blue-600 mr-2 text-xl">⇒</span> <Latex math="x = -3, y = 0 \enspace ; \enspace x = 2, y = 1" inline />
                <p className="mt-2 text-emerald-700">∴ 交點：<Latex math="(-3, 0), (2, 1)" inline /></p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">註：順序輸入：紅1、紅2、紅3... 為計算機輸入次序及位置</p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};


