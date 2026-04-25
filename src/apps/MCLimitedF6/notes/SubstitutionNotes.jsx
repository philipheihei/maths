import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InlineMath, BlockMath } from '../shared';

const SubstitutionNotes = ({ onBack }) => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 px-6 text-center relative shadow-md">
        <button onClick={onBack} className="absolute top-4 left-4 flex items-center gap-1 text-indigo-100 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> 返回
        </button>
        <h1 className="text-3xl font-bold mb-2">📐 MC 代數代入法</h1>
        <p className="text-indigo-200 text-lg">即使唔識計，都能輕鬆作答選擇題</p>
        <p className="text-indigo-300 text-sm mt-1">DSE 數學 · 應試技巧筆記</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* 原理 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 pl-3 border-l-4 border-indigo-500">💡 甚麼是代入法？</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            當 MC 題目問「哪個式子等於⋯」時，你不需要正式計算。<br/>
            只需要：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-sm font-semibold text-gray-700">
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <div className="text-2xl mb-1">1️⃣</div>
              <div>自己假設一個<br/><span className="text-indigo-600 font-bold">簡單數值</span>代入題目</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="text-2xl mb-1">2️⃣</div>
              <div>計算題目的<br/><span className="text-purple-600 font-bold">結果數值</span></div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <div className="text-2xl mb-1">3️⃣</div>
              <div>逐一代入選項，<br/>找出<span className="text-emerald-600 font-bold">吻合</span>的一個</div>
            </div>
          </div>
        </section>

        {/* 判斷能否使用 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 pl-3 border-l-4 border-indigo-500">🔍 如何判斷能否使用？</h2>
          <p className="text-gray-600 mb-4 text-sm">睇題目有冇以下特徵：</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300">
              <span className="text-xl">✅</span>
              <div>
                <div className="font-bold">可以用</div>
                <div className="text-sm mt-1 text-emerald-900">題目及選項都係<strong>代數式</strong>（含未知數如 <InlineMath math="x" />, <InlineMath math="k" />, <InlineMath math="n" />）；化簡某條式子；指數／對數運算；展開括號</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 text-amber-800 border border-amber-300">
              <span className="text-xl">⚠️</span>
              <div>
                <div className="font-bold">要小心（代兩個值）</div>
                <div className="text-sm mt-1 text-amber-900">二次函數配方；三角恆等式；有機會兩個選項同時符合第一個值 → 必須再代第二個值排除</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 text-red-800 border border-red-300">
              <span className="text-xl">❌</span>
              <div>
                <div className="font-bold">不適合用</div>
                <div className="text-sm mt-1 text-red-900">不等式範圍題（選項係 <InlineMath math="x \leq a" /> 等）；概率題；需要列步驟的 Long Q；證明題</div>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="font-bold text-yellow-800 mb-2">🎯 選值技巧</div>
            <ul className="text-sm text-yellow-900 space-y-1.5 list-disc list-inside">
              <li>盡量選 <InlineMath math="x = 2" /> 或 <InlineMath math="x = 3" />，避免代 <InlineMath math="0" /> 或 <InlineMath math="1" />（容易令不同選項計出相同答案）</li>
              <li>若有兩個未知數（如 <InlineMath math="a" />, <InlineMath math="b" />），分別代不同值，例如 <InlineMath math="a=2, b=3" /></li>
              <li>若一個值不夠排除，立即再代第二個值</li>
            </ul>
          </div>
        </section>

        {/* 題型示範 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 pl-3 border-l-4 border-indigo-500">📚 題型示範</h2>

          {/* 題型1 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">✅ 適用</span>
              <span className="font-bold text-lg text-gray-800">題型一：分式化簡</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-center text-lg border border-gray-200">
              <BlockMath math="\frac{1}{k+2} + \frac{3}{5k-6} = ?" />
              <div className="grid grid-cols-2 gap-2 mt-3 text-base text-left max-w-sm mx-auto">
                <div>A. <InlineMath math="\dfrac{-8k}{(k+2)(5k-6)}" /></div>
                <div>B. <InlineMath math="\dfrac{-2k}{(k+2)(5k-6)}" /></div>
                <div>C. <InlineMath math="\dfrac{2k}{(k+2)(5k-6)}" /></div>
                <div>D. <InlineMath math="\dfrac{8k}{(k+2)(5k-6)}" /></div>
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-indigo-800">📝 代入法步驟</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 1</span> 代 <InlineMath math="k = 2" />（避免分母為0，檢查：<InlineMath math="k+2=4" />, <InlineMath math="5k-6=4" />，OK）</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 2</span> 計題目：<InlineMath math="\dfrac{1}{4} + \dfrac{3}{4} = 1" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 3</span> 代選項（分母 <InlineMath math="(4)(4)=16" />）：
                <ul className="mt-1.5 ml-5 space-y-1 list-none">
                  <li>A: <InlineMath math="\dfrac{-16}{16} = -1" /> ❌</li>
                  <li>B: <InlineMath math="\dfrac{-4}{16} = -0.25" /> ❌</li>
                  <li>C: <InlineMath math="\dfrac{4}{16} = 0.25" /> ❌</li>
                  <li className="text-emerald-700 font-bold">D: <InlineMath math="\dfrac{16}{16} = 1" /> ✅ ← 答案</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 題型2 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">✅ 適用</span>
              <span className="font-bold text-lg text-gray-800">題型二：指數運算化簡</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-center text-lg border border-gray-200">
              <BlockMath math="\frac{9^{3n+1}}{(3^{2n+3})(27^{2n+1})} = ?" />
              <div className="grid grid-cols-2 gap-2 mt-3 text-base text-left max-w-xs mx-auto">
                <div>A. <InlineMath math="9^{-n-2}" /></div><div>B. <InlineMath math="9^{-n-1}" /></div>
                <div>C. <InlineMath math="9^{n-2}" /></div><div>D. <InlineMath math="9^{n-1}" /></div>
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-indigo-800">📝 代入法步驟</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 1</span> 代 <InlineMath math="n = 1" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 2</span> 計題目：
                <InlineMath math="\dfrac{9^{4}}{(3^{5})(27^{3})} = \dfrac{6561}{243 \times 19683} = \dfrac{6561}{4782969} = \dfrac{1}{729} = 9^{-3}" />
              </div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 3</span> 代 <InlineMath math="n=1" /> 入選項：
                <ul className="mt-1.5 ml-5 space-y-1 list-none">
                  <li className="text-emerald-700 font-bold">A: <InlineMath math="9^{-1-2} = 9^{-3}" /> ✅ ← 答案</li>
                  <li>B: <InlineMath math="9^{-1-1} = 9^{-2}" /> ❌</li>
                  <li>C: <InlineMath math="9^{1-2} = 9^{-1}" /> ❌</li>
                  <li>D: <InlineMath math="9^{1-1} = 9^{0} = 1" /> ❌</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 題型3 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">✅ 適用</span>
              <span className="font-bold text-lg text-gray-800">題型三：展開代數式（雙變數）</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-center text-lg border border-gray-200 overflow-x-auto">
              <BlockMath math="(2\alpha - \beta)^2 + (\alpha - 2\beta)^2 = ?" />
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-left max-w-sm mx-auto">
                <div>A. <InlineMath math="3\alpha^2 - 4\alpha\beta + 3\beta^2" /></div>
                <div>B. <InlineMath math="3\alpha^2 - 8\alpha\beta + 3\beta^2" /></div>
                <div>C. <InlineMath math="5\alpha^2 - 4\alpha\beta + 5\beta^2" /></div>
                <div>D. <InlineMath math="5\alpha^2 - 8\alpha\beta + 5\beta^2" /></div>
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-indigo-800">📝 代入法步驟（雙變數要代兩個不同值）</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 1</span> 代 <InlineMath math="\alpha = 2,\ \beta = 3" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 2</span> 計題目：<InlineMath math="(4-3)^2 + (2-6)^2 = 1 + 16 = 17" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 3</span> 代選項：
                <ul className="mt-1.5 ml-5 space-y-1 list-none">
                  <li>A: <InlineMath math="12 - 24 + 27 = 15" /> ❌</li>
                  <li>B: <InlineMath math="12 - 48 + 27 = -9" /> ❌</li>
                  <li>C: <InlineMath math="20 - 24 + 45 = 41" /> ❌</li>
                  <li className="text-emerald-700 font-bold">D: <InlineMath math="20 - 48 + 45 = 17" /> ✅ ← 答案</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 題型4 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">✅ 適用</span>
              <span className="font-bold text-lg text-gray-800">題型四：指數律化簡</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-center text-lg border border-gray-200">
              <BlockMath math="\frac{(27x)^5}{(3x^{-2})^4} = ?" />
              <div className="grid grid-cols-2 gap-2 mt-3 text-base text-left max-w-xs mx-auto">
                <div>A. <InlineMath math="3^2 x^3" /></div><div>B. <InlineMath math="3^4 x^3" /></div>
                <div>C. <InlineMath math="3^{11} x^{13}" /></div><div>D. <InlineMath math="3^{14} x^{13}" /></div>
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-indigo-800">📝 代入法步驟</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 1</span> 代 <InlineMath math="x = 1" />（選項只有 <InlineMath math="x" /> 的冪，代1可快速排除；但係數要靠計算驗證）</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 2</span> 計題目：<InlineMath math="\dfrac{(27)^5}{(3)^4} = \dfrac{3^{15}}{3^4} = 3^{11}" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 3</span> <InlineMath math="x=1" /> 時，A→<InlineMath math="9" /> ❌，B→<InlineMath math="81" /> ❌，C→<InlineMath math="3^{11}" /> ✅，D→<InlineMath math="3^{14}" /> ❌
                <br/>→ 再代 <InlineMath math="x=3" /> 驗證C與D的 <InlineMath math="x" /> 次數：題目得 <InlineMath math="3^{11} \cdot 3^{13}" />，C得 <InlineMath math="3^{11}\cdot 3^{13}" /> ✅，D得 <InlineMath math="3^{14}\cdot 3^{13}" /> ❌
              </div>
              <div className="text-emerald-700 font-bold mt-2">答案：C（<InlineMath math="3^{11}x^{13}" />）</div>
            </div>
          </div>

          {/* 題型5 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">⚠️ 要小心</span>
              <span className="font-bold text-lg text-gray-800">題型五：解方程（含兩個常數）</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-lg border border-gray-200">
              解 <InlineMath math="(x+2s)(x+t) = sx + st" />，其中 <InlineMath math="s" /> 及 <InlineMath math="t" /> 均為常數。
              <div className="grid grid-cols-2 gap-2 mt-4 text-base text-left max-w-xs mx-auto">
                <div>A. <InlineMath math="x = -s" /></div><div>B. <InlineMath math="x = -2s" /></div>
                <div className="col-span-2 text-sm md:text-base md:col-span-1">C. <InlineMath math="x = -s" /> 或 <InlineMath math="x = -t" /></div>
                <div className="col-span-2 text-sm md:text-base md:col-span-1">D. <InlineMath math="x = -2s" /> 或 <InlineMath math="x = -t" /></div>
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-indigo-800">📝 分析：此題不宜直接代入</div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 mb-2">
                ⚠️ 選項混合了 <InlineMath math="x =" /> 單一值 vs 「或」兩個值，代入法無法直接判斷答案是否需要「或」。<br/>
                <strong>建議：</strong>展開整理，<InlineMath math="(x+2s)(x+t) - sx - st = 0" />，因式分解求解。
              </div>
              <div className="pl-2">展開：<InlineMath math="x^2 + tx + 2sx + 2st - sx - st = 0" /></div>
              <div className="pl-2"><InlineMath math="x^2 + (t+s)x + st = 0" /></div>
              <div className="pl-2"><InlineMath math="(x+s)(x+t) = 0" /></div>
              <div className="text-emerald-700 font-bold mt-2">答案：C（<InlineMath math="x = -s" /> 或 <InlineMath math="x = -t" />）</div>
            </div>
          </div>

          {/* 題型6 */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">❌ 不適用</span>
              <span className="font-bold text-lg text-gray-800">題型六：不等式（取「或」）</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-lg border border-gray-200 overflow-x-auto">
              <InlineMath math="x - 1 > \dfrac{2x-9}{3}" /> 或 <InlineMath math="3x + 12 \geq 0" /> 的解為？
              <div className="grid grid-cols-2 gap-3 mt-4 text-base text-left max-w-xs mx-auto">
                <div>A. <InlineMath math="x \leq -4" /></div><div>B. <InlineMath math="x \geq -4" /></div>
                <div>C. <InlineMath math="x < -6" /></div><div>D. <InlineMath math="x > -6" /></div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800 leading-relaxed">
              ❌ <strong>為何不適用？</strong><br/>
              選項是不等式範圍，無法靠代一個特定 <InlineMath math="x" /> 值來「驗證」哪個範圍正確。代入法在此完全失效，必須老老實實解不等式。<br/><br/>
              <strong>正確做法：</strong>分別解兩個不等式，再取「或」（聯集）。<br/>
              解得 <InlineMath math="x > -6" /> 或 <InlineMath math="x \geq -4" /> → 合併：<InlineMath math="x \geq -4" />，答案 <strong>B</strong>。
            </div>
          </div>
        </section>

        {/* 總結表 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 pl-3 border-l-4 border-indigo-500">📊 快速判斷總結表</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-indigo-50 text-indigo-900 border-b border-indigo-100">
                  <th className="p-3.5 text-left">題目特徵</th>
                  <th className="p-3.5 text-center">代入法</th>
                  <th className="p-3.5 text-left">備注</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50"><td className="p-3">代數式化簡（分式、展開）</td><td className="p-3 text-center text-emerald-600 font-bold whitespace-nowrap">✅ 適用</td><td className="p-3 text-gray-600">選 <InlineMath math="x=2" /> 或 <InlineMath math="x=3" /></td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">指數 / 對數運算</td><td className="p-3 text-center text-emerald-600 font-bold whitespace-nowrap">✅ 適用</td><td className="p-3 text-gray-600">代簡單整數</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">雙變數代數式</td><td className="p-3 text-center text-emerald-600 font-bold whitespace-nowrap">✅ 適用</td><td className="p-3 text-gray-600">兩變數代不同值</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">二次函數配方</td><td className="p-3 text-center text-amber-600 font-bold whitespace-nowrap">⚠️ 小心</td><td className="p-3 text-gray-600">代兩個值排除</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">解方程（選項含「或」）</td><td className="p-3 text-center text-amber-600 font-bold whitespace-nowrap">⚠️ 小心</td><td className="p-3 text-gray-600">無法判斷「或」，考慮直接計</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">不等式範圍</td><td className="p-3 text-center text-red-600 font-bold whitespace-nowrap">❌ 不適用</td><td className="p-3 text-gray-600">必須解不等式</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">概率題</td><td className="p-3 text-center text-red-600 font-bold whitespace-nowrap">❌ 不適用</td><td className="p-3 text-gray-600">邏輯性強，需計算</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="text-center text-gray-400 text-sm pb-8 font-medium">
          DSE 數學 · MC 代數代入法學習筆記 · 僅供參考
        </div>
      </div>
    </div>
  );
};

export default SubstitutionNotes;