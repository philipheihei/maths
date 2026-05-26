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
                  <p><strong>眾數：</strong> 55 (只出現兩次)</p>
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
            <p className="text-sm text-slate-700 mb-2">框線圖直接顯示五個重要數值，無法找到平均數或標準差，但<span className="font-bold text-amber-600">可以直觀求 四分位數間距 與 分佈域</span>。</p>
            
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

            <ul className="text-sm text-slate-700 list-disc pl-5 mt-4">
              <li>分佈域 = 最右邊條線 - 最左邊條線 (最大 - 最小)</li>
              <li>四分位數間距 = 框框的右邊界 - 框框的左邊界 (<Latex inline math="Q_3 - Q_1" />)</li>
            </ul>
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
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH12-13 圓形性質 (F5)
// ========================================
const PropertyCard = ({ title, svg: SVGComp, condition, conclusion, directFormula }) => (
  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-slate-800 md:text-lg text-base">
      {title}
    </div>
    <div className="flex-1 p-2 flex items-center justify-center bg-white min-h-[220px]">
      <SVGComp />
    </div>
    <div className="px-4 py-4 border-t border-slate-200 bg-white min-h-[90px] flex items-center">
      {directFormula ? (
        <div className="flex items-center gap-3 w-full">
          <div className="w-1 h-8 bg-emerald-500 rounded-full shrink-0"></div>
          <p className="text-slate-800 mb-0 font-medium text-lg leading-none pt-2"><Latex math={directFormula} inline={false} block /></p>
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
    </div>
  </div>
);

export const CirclePropertiesNotes = ({ activeSub }) => {
  const s1 = useRef(null);

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
            directFormula="\angle AOB = 2\angle ACB"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <path d="M 31 140 L 100 100 L 169 140" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 31 140 L 100 20 L 169 140" fill="none" stroke="#334155" strokeWidth="1.5" />
                <text x="15" y="150" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="175" y="150" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="95" y="12" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="95" y="115" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
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
                <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="1.5" />
                <path d="M 20 100 L 60 31 L 180 100" fill="none" stroke="#334155" strokeWidth="1.5" />
                <polygon points="60,31 56,38 63,42 67,35" fill="none" stroke="#334155" strokeWidth="1" />
                <text x="5" y="105" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="185" y="105" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="53" y="24" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="95" y="115" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />

          <PropertyCard
            title="同弓形內的圓周角"
            directFormula="\angle APB = \angle AQB"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <line x1="31" y1="140" x2="169" y2="140" stroke="#334155" strokeWidth="1" />
                <path d="M 31 140 L 70 25 L 169 140" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 31 140 L 155 42 L 169 140" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 64 39 A 15 15 0 0 0 78 37" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 62 42 A 15 15 0 0 0 79 40" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 139 52 A 20 20 0 0 0 157 58" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 137 55 A 20 20 0 0 0 156 61" fill="none" stroke="#334155" strokeWidth="1" />
                <text x="17" y="150" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="175" y="150" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="65" y="15" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>P</text>
                <text x="162" y="38" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>Q</text>
              </svg>
            )}
          />

          <PropertyCard
            title="弧與圓心角成比例"
            directFormula="\widehat{AB} : \widehat{BC} = \angle AOB : \angle BOC"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <path d="M 100 100 L 31 60" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 100 100 L 140 31" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 100 100 L 178 117" fill="none" stroke="#334155" strokeWidth="1.5" />
                <path d="M 85 91 A 18 18 0 0 1 109 84" fill="none" stroke="#334155" strokeWidth="1" />
                <path d="M 115 88 A 20 20 0 0 1 120 103" fill="none" stroke="#334155" strokeWidth="1" />
                <text x="17" y="52" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="145" y="22" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="185" y="125" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="91" y="115" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
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
                <line x1="100" y1="100" x2="60" y2="31" stroke="#334155" strokeWidth="1.5" />
                <line x1="20" y1="54" x2="140" y2="-15" stroke="#334155" strokeWidth="1.5" />
                <polygon points="60,31 66,27 71,36 65,40" fill="none" stroke="#334155" strokeWidth="1" />
                <text x="10" y="70" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>P</text>
                <text x="150" y="-3" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>Q</text>
                <text x="40" y="28" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>T</text>
                <text x="105" y="115" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
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
                <line x1="100" y1="100" x2="60" y2="31" stroke="#334155" strokeWidth="1.5" />
                <line x1="20" y1="54" x2="140" y2="-15" stroke="#334155" strokeWidth="1.5" />
                <polygon points="60,31 66,27 71,36 65,40" fill="none" stroke="#334155" strokeWidth="1" />
                <text x="10" y="70" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>P</text>
                <text x="150" y="-3" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>Q</text>
                <text x="40" y="28" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>T</text>
                <text x="105" y="115" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>O</text>
              </svg>
            )}
          />
        </div>
      </CollapsibleSection>
    </>
  );
};
