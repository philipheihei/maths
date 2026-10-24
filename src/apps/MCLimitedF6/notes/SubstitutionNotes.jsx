import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InlineMath, LeftBlockMath } from '../shared';

const SubstitutionNotes = ({ onBack }) => {
  const H0 = '#fef3c7';
  const H1 = '#bae6fd';
  const H2 = '#fecdd3';
  const h = (c, v) => `\\colorbox{${c}}{${v}}`;
  const ChoiceDot = ({ label }) => <span className="inline-block w-6">{label}.</span>;
  const ChoiceColon = ({ label }) => <span className="inline-block w-6">{label}:</span>;

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 px-6 text-center relative shadow-md">
        <button onClick={onBack} className="absolute top-4 left-4 flex items-center gap-1 text-indigo-100 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> 返回
        </button>
        <h1 className="text-3xl font-bold mb-2">📐 MC 代數代入法</h1>
        <p className="text-indigo-200 text-lg">跟題型選方法，逐步代入檢查，減少選錯</p>
        <p className="text-indigo-300 text-sm mt-1">DSE 數學 · 應試技巧筆記</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* 方法分類 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 pl-3 border-l-4 border-indigo-500">💡 先看題目，再選代入方法</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            代入法不是每題都用同一個做法。先看題目在問甚麼，再照以下方法做。代入前先檢查數值是否符合題目限制，例如分母不可等於 0。
          </p>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <div className="font-bold text-indigo-800 mb-1">方法① 代數值，比較結果（題型一至四）</div>
              <div>題目問化簡、展開或計算代數式，選項也是代數式：選一組符合限制、容易計算的數值，代入題目原式並計出結果；再把同一組數值代入每個選項。結果不同的選項可以剔除。若有多個選項結果相同，換另一組數值再比較。只試一組數值相同，不能證明兩個代數式必定相同。</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="font-bold text-purple-800 mb-1">方法② 代選項，檢查條件（題型五及七）</div>
              <div>題目給出方程或條件，選項提供候選解或代數式：把選項所給的值或式子代回原題，檢查等式或條件是否成立；不成立的選項剔除。不要任意替題目中的所有字母選值，令原有條件不成立。</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <div className="font-bold text-emerald-800 mb-1">方法③ 試數值，比較解的範圍（題型六）</div>
              <div>不等式選項表示不同的解範圍：選一些測試值，代入原不等式，看看哪些值符合；再檢查各選項所表示的範圍是否包括這些值。要測試不同分界區間；分界點要另外檢查是否包括在解內。</div>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
            <strong>記住：</strong>代入數值可以幫你檢查或剔除選項；一個數值符合，不代表已證明答案一定正確。
          </div>
        </section>

        {/* 判斷能否使用 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 pl-3 border-l-4 border-indigo-500">🔍 辨認題型，選擇代入方法</h2>
          <p className="text-gray-600 mb-4 text-sm">先看題目和選項的形式，再選擇相應做法：</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300">
              <span className="text-xl">✅</span>
              <div>
                <div className="font-bold">方法①：代數值，比較結果</div>
                  <div className="text-sm mt-1 text-emerald-900">題目問化簡、展開或計算代數式，選項提供不同代數式。代同一組合法數值，比較題目和選項的結果。</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 text-amber-800 border border-amber-300">
              <span className="text-xl">⚠️</span>
              <div>
                <div className="font-bold">方法③：不等式要試不同範圍</div>
                <div className="text-sm mt-1 text-amber-900">用不同區間的測試值檢查解範圍；分界點要另外代入，檢查是否包括在答案內。</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50 text-purple-800 border border-purple-300">
              <span className="text-xl">②</span>
              <div>
                <div className="font-bold">方法②：代選項，檢查原題條件</div>
                <div className="text-sm mt-1 text-purple-900">例如 <InlineMath math="(3c+1)(d-4)=2d(5c-1)" /> 要求由 <InlineMath math="d" /> 求 <InlineMath math="c" />：把選項提供的 <InlineMath math="c" /> 表達式代回原等式檢查。不可任意同時指定 <InlineMath math="c" /> 和 <InlineMath math="d" />，否則未必符合題目條件。</div>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="font-bold text-yellow-800 mb-2">🎯 選值技巧</div>
            <ul className="text-sm text-yellow-900 space-y-1.5 list-disc list-inside">
              <li>方法①先試容易計算的數值，例如 <InlineMath math="2" /> 或 <InlineMath math="3" />；先檢查分母是否為 0，或有沒有其他限制。若不符合限制，換一個值。</li>
              <li>有兩個未知數時，兩個都要代值，例如 <InlineMath math="a=2, b=3" />；代入題目和每個選項時要用同一組數值。</li>
              <li>若多個選項代出相同結果，不能只憑這次結果作答；換另一組合法數值再比較。</li>
            </ul>
          </div>
        </section>

        {/* 題型示範 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 pl-3 border-l-4 border-indigo-500">📚 題型示範</h2>

          {/* 題型1 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">方法①</span>
              <span className="font-bold text-lg text-gray-800">題型一：分式化簡</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-left text-lg border border-gray-200 [&>div]:pl-0 [&_.katex-display>.katex]:!ml-0 [&_.katex-display>.katex]:!text-left">
              <LeftBlockMath math="\frac{1}{k+2} + \frac{3}{5k-6} = ?" />
              <div className="grid grid-cols-2 gap-3 mt-3 text-base text-left w-full">
                <div className="whitespace-nowrap"><ChoiceDot label="A" /><InlineMath math="\dfrac{-8k}{(k+2)(5k-6)}" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="B" /><InlineMath math="\dfrac{-2k}{(k+2)(5k-6)}" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="C" /><InlineMath math="\dfrac{2k}{(k+2)(5k-6)}" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="D" /><InlineMath math="\dfrac{8k}{(k+2)(5k-6)}" /></div>
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-indigo-800">📝 代入法步驟</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 1</span> 代 <InlineMath math="k = 2" />（避免分母為0，檢查：<InlineMath math="k+2=4" />, <InlineMath math="5k-6=4" />，OK）</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 2</span> 題目代入：<InlineMath math={`\\dfrac{1}{${h(H0, '2')}+2}+\\dfrac{3}{5(${h(H0, '2')})-6}=\\dfrac14+\\dfrac34=1`} /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 3</span> 代選項（分母 <InlineMath math="(4)(4)=16" />）：
                <ul className="mt-1.5 ml-5 space-y-1 list-none">
                  <li><ChoiceColon label="A" /><InlineMath math={`\\dfrac{-8(${h(H0, '2')})}{((${h(H0, '2')})+2)(5(${h(H0, '2')})-6)}=\\dfrac{-16}{16}=-1`} /> ❌</li>
                  <li><ChoiceColon label="B" /><InlineMath math={`\\dfrac{-2(${h(H0, '2')})}{((${h(H0, '2')})+2)(5(${h(H0, '2')})-6)}=\\dfrac{-4}{16}=-\\dfrac14`} /> ❌</li>
                  <li><ChoiceColon label="C" /><InlineMath math={`\\dfrac{2(${h(H0, '2')})}{((${h(H0, '2')})+2)(5(${h(H0, '2')})-6)}=\\dfrac{4}{16}=\\dfrac14`} /> ❌</li>
                  <li className="text-emerald-700 font-bold"><ChoiceColon label="D" /><InlineMath math={`\\dfrac{8(${h(H0, '2')})}{((${h(H0, '2')})+2)(5(${h(H0, '2')})-6)}=\\dfrac{16}{16}=1`} /> ✅ ← 答案</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 題型2 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">方法①</span>
              <span className="font-bold text-lg text-gray-800">題型二：指數運算化簡</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-left text-lg border border-gray-200 [&>div]:pl-0 [&_.katex-display>.katex]:!ml-0 [&_.katex-display>.katex]:!text-left">
              <LeftBlockMath math="\frac{9^{3n+1}}{(3^{2n+3})(27^{2n+1})} = ?" />
              <div className="grid grid-cols-2 gap-3 mt-3 text-base text-left w-full">
                <div className="whitespace-nowrap"><ChoiceDot label="A" /><InlineMath math="9^{-n-2}" /></div><div className="whitespace-nowrap"><ChoiceDot label="B" /><InlineMath math="9^{-n-1}" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="C" /><InlineMath math="9^{n-2}" /></div><div className="whitespace-nowrap"><ChoiceDot label="D" /><InlineMath math="9^{n-1}" /></div>
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-indigo-800">📝 代入法步驟</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 1</span> 代 <InlineMath math="n = 2" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 2</span> 題目代入（直接按機）：
                <InlineMath math={`\\dfrac{9^{3(${h(H0, '2')})+1}}{(3^{2(${h(H0, '2')})+3})(27^{2(${h(H0, '2')})+1})}=\\dfrac{1}{6561}`} />
              </div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 3</span> 代 <InlineMath math="n=2" /> 入選項（直接比對答案）：
                <ul className="mt-1.5 ml-5 space-y-1 list-none">
                  <li className="text-emerald-700 font-bold"><ChoiceColon label="A" /><InlineMath math={`9^{-${h(H0, '2')}-2}=\\dfrac{1}{6561}`} /> ✅ ← 答案</li>
                  <li><ChoiceColon label="B" /><InlineMath math={`9^{-${h(H0, '2')}-1}=\\dfrac{1}{729}`} /> ❌</li>
                  <li><ChoiceColon label="C" /><InlineMath math={`9^{${h(H0, '2')}-2}=1`} /> ❌</li>
                  <li><ChoiceColon label="D" /><InlineMath math={`9^{${h(H0, '2')}-1}=9`} /> ❌</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 題型3 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">方法①</span>
              <span className="font-bold text-lg text-gray-800">題型三：展開代數式（雙變數）</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-left text-lg border border-gray-200 overflow-x-auto [&>div]:pl-0 [&_.katex-display>.katex]:!ml-0 [&_.katex-display>.katex]:!text-left">
              <LeftBlockMath math="(2\alpha - \beta)^2 + (\alpha - 2\beta)^2 = ?" />
              <div className="grid grid-cols-2 gap-3 mt-3 text-sm text-left w-full">
                <div className="whitespace-nowrap"><ChoiceDot label="A" /><InlineMath math="3\alpha^2 - 4\alpha\beta + 3\beta^2" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="B" /><InlineMath math="3\alpha^2 - 8\alpha\beta + 3\beta^2" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="C" /><InlineMath math="5\alpha^2 - 4\alpha\beta + 5\beta^2" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="D" /><InlineMath math="5\alpha^2 - 8\alpha\beta + 5\beta^2" /></div>
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-indigo-800">📝 代入法步驟（雙變數要代兩個不同值）</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 1</span> 代 <InlineMath math="\alpha = 2,\ \beta = 3" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 2</span> 題目代入：<InlineMath math={`(2(${h(H0, '2')})-${h(H1, '3')})^2+(${h(H0, '2')}-2(${h(H1, '3')}))^2=17`} /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 3</span> 代選項：
                <ul className="mt-1.5 ml-5 space-y-1 list-none">
                  <li><ChoiceColon label="A" /><InlineMath math={`3(${h(H0, '2')})^2-4(${h(H0, '2')})(${h(H1, '3')})+3(${h(H1, '3')})^2=15`} /> ❌</li>
                  <li><ChoiceColon label="B" /><InlineMath math={`3(${h(H0, '2')})^2-8(${h(H0, '2')})(${h(H1, '3')})+3(${h(H1, '3')})^2=-9`} /> ❌</li>
                  <li><ChoiceColon label="C" /><InlineMath math={`5(${h(H0, '2')})^2-4(${h(H0, '2')})(${h(H1, '3')})+5(${h(H1, '3')})^2=41`} /> ❌</li>
                  <li className="text-emerald-700 font-bold"><ChoiceColon label="D" /><InlineMath math={`5(${h(H0, '2')})^2-8(${h(H0, '2')})(${h(H1, '3')})+5(${h(H1, '3')})^2=17`} /> ✅ ← 答案</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 題型4 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">方法①</span>
              <span className="font-bold text-lg text-gray-800">題型四：指數律化簡</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-left text-lg border border-gray-200 [&>div]:pl-0 [&_.katex-display>.katex]:!ml-0 [&_.katex-display>.katex]:!text-left">
              <LeftBlockMath math="\frac{(27x)^5}{(3x^{-2})^4} = ?" />
              <div className="grid grid-cols-2 gap-3 mt-3 text-base text-left w-full">
                <div className="whitespace-nowrap"><ChoiceDot label="A" /><InlineMath math="3^2 x^3" /></div><div className="whitespace-nowrap"><ChoiceDot label="B" /><InlineMath math="3^4 x^3" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="C" /><InlineMath math="3^{11} x^{13}" /></div><div className="whitespace-nowrap"><ChoiceDot label="D" /><InlineMath math="3^{14} x^{13}" /></div>
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-indigo-800">📝 代入法步驟</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 1</span> 代 <InlineMath math="x = 3" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 2</span> 題目代入（直接按機）：<InlineMath math={`\\dfrac{(27\\cdot ${h(H0, '3')})^5}{(3\\cdot ${h(H0, '3')}^{-2})^4}\\approx 2.8243\\times 10^{11}`} /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 3</span> 代選項（直接比對答案）：
                <ul className="mt-1.5 ml-5 space-y-1 list-none">
                  <li><ChoiceColon label="A" /><InlineMath math={`3^2(${h(H0, '3')})^3=243`} /> ❌</li>
                  <li><ChoiceColon label="B" /><InlineMath math={`3^4(${h(H0, '3')})^3=2187`} /> ❌</li>
                  <li className="text-emerald-700 font-bold"><ChoiceColon label="C" /><InlineMath math={`3^{11}(${h(H0, '3')})^{13}\\approx 2.8243\\times 10^{11}`} /> ✅ ← 答案</li>
                  <li><ChoiceColon label="D" /><InlineMath math={`3^{14}(${h(H0, '3')})^{13}\\approx 7.6256\\times 10^{12}`} /> ❌</li>
                </ul>
              </div>
              <div className="text-emerald-700 font-bold mt-2">答案：C（<InlineMath math="3^{11}x^{13}" />）</div>
            </div>
          </div>

          {/* 題型5 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">方法②</span>
              <span className="font-bold text-lg text-gray-800">題型五：解方程（代選項檢查等式）</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-lg border border-gray-200">
              解 <InlineMath math="(x+2s)(x+t) = sx + st" />，其中 <InlineMath math="s" /> 及 <InlineMath math="t" /> 均為常數。
              <div className="mt-2 text-sm text-gray-600">為避免選項在特殊情況下重合，假設 <InlineMath math="s\ne0,\;s\ne t,\;t\ne2s" />。</div>
              <div className="grid grid-cols-2 gap-3 mt-4 text-base text-left w-full">
                <div className="whitespace-nowrap"><ChoiceDot label="A" /><InlineMath math="x = -s" /></div><div className="whitespace-nowrap"><ChoiceDot label="B" /><InlineMath math="x = -2s" /></div>
                <div className="whitespace-nowrap text-sm md:text-base"><ChoiceDot label="C" /><InlineMath math="x = -s" /> 或 <InlineMath math="x = -t" /></div>
                <div className="whitespace-nowrap text-sm md:text-base"><ChoiceDot label="D" /><InlineMath math="x = -2s" /> 或 <InlineMath math="x = -t" /></div>
              </div>
            </div>
            <div className="border-l-4 border-emerald-400 bg-emerald-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-emerald-800">📝 做法：把選項的 x 值代回原方程，檢查左邊是否等於右邊</div>
              <div className="pl-2 space-y-1.5">
                <div>代 <InlineMath math="x = -s" />：</div>
                <div className="pl-4">左：<InlineMath math={`(${h(H0, '-s')}+2s)(${h(H0, '-s')}+t) = s(t-s)`} /></div>
                <div className="pl-4">右：<InlineMath math={`s(${h(H0, '-s')})+st = s(t-s)`} /> ✅ 左 = 右，<InlineMath math="x=-s" /> 成立</div>
                <div className="mt-1">代 <InlineMath math="x = -2s" />：</div>
                <div className="pl-4">左：<InlineMath math={`(${h(H1, '-2s')}+2s)(${h(H1, '-2s')}+t) = 0`} /></div>
                <div className="pl-4">右：<InlineMath math={`s(${h(H1, '-2s')})+st = s(t-2s)`} />。由於題目限制 <InlineMath math="s\ne0" /> 及 <InlineMath math="t\ne2s" />，所以右邊不等於 0，<InlineMath math="x=-2s" /> 不是解。</div>
                <div className="mt-1">代 <InlineMath math="x = -t" />：</div>
                <div className="pl-4">左：<InlineMath math={`(${h(H2, '-t')}+2s)(${h(H2, '-t')}+t) = 0`} /></div>
                <div className="pl-4">右：<InlineMath math={`s(${h(H2, '-t')})+st = 0`} /> ✅ 左 = 右，<InlineMath math="x=-t" /> 成立</div>
              </div>
              <div className="bg-white border border-emerald-200 rounded-lg p-2 mt-2">
                整理原方程可得 <InlineMath math="(x+s)(x+t)=0" />，所以一般解集是 <InlineMath math="x=-s" /> 或 <InlineMath math="x=-t" />。選項 B 只列出其中一個可能值，並非完整解集；在特殊參數下，該值也可能是解。
              </div>
              <div className="text-emerald-700 font-bold mt-2">答案：C（<InlineMath math="x = -s" /> 或 <InlineMath math="x = -t" />）</div>
            </div>
          </div>

          {/* 題型6 */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">方法③</span>
              <span className="font-bold text-lg text-gray-800">題型六：不等式（取「或」）</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-lg border border-gray-200 overflow-x-auto">
              <InlineMath math="x - 1 > \dfrac{2x-9}{3}" /> 或 <InlineMath math="3x + 12 \geq 0" /> 的解為？
              <div className="grid grid-cols-2 gap-3 mt-4 text-base text-left w-full">
                <div className="whitespace-nowrap"><ChoiceDot label="A" /><InlineMath math="x \leq -4" /></div><div className="whitespace-nowrap"><ChoiceDot label="B" /><InlineMath math="x \geq -4" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="C" /><InlineMath math="x < -6" /></div><div className="whitespace-nowrap"><ChoiceDot label="D" /><InlineMath math="x > -6" /></div>
              </div>
            </div>
            <div className="border-l-4 border-emerald-400 bg-emerald-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700 leading-relaxed">
              <div className="font-bold text-emerald-800">📝 做法：試不同範圍的數值，檢查哪些值符合不等式</div>
              <div>先找出不等式左右相等的分界值，再把數線分成不同區間。每個區間選一個數值，代入原不等式檢查是否成立。</div>
              <div>本題的分界值是 <InlineMath math="x=-6" /> 和 <InlineMath math="x=-4" />；先試各區間內的數值，再把分界值代回原不等式，檢查等號是否成立。</div>
              <div className="pl-2 space-y-1.5">
                <div><span className="bg-emerald-200 text-emerald-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 1</span> 試 <InlineMath math="x=-5" />（介乎 -6 與 -4 之間）</div>
                <div className="pl-4">第一條：<InlineMath math="-5-1 > \dfrac{2(-5)-9}{3}" />，即 <InlineMath math="-6 > -\dfrac{19}{3}" /> ✅</div>
                <div className="pl-4">第二條：<InlineMath math="3(-5)+12 \geq 0" />，即 <InlineMath math="-3 \geq 0" /> ❌</div>
                <div className="pl-4">因為是「或」，一條成立已經夠，所以 <InlineMath math="x=-5" /> 屬於答案範圍；但 <InlineMath math="x=-5" /> 不符合 <InlineMath math="x \geq -4" />，可排除選項 B。</div>
                <div className="mt-1"><span className="bg-emerald-200 text-emerald-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 2</span> 試 <InlineMath math="x=-7" />（小於 -6）</div>
                <div className="pl-4">第一條：<InlineMath math="-8 > -\dfrac{23}{3}" /> ❌；第二條：<InlineMath math="-9 \geq 0" /> ❌，兩條都不成立。</div>
                <div className="pl-4"><InlineMath math="x=-7" /> 唔喺答案範圍，可排除 <InlineMath math="x \leq -4" />（選項 A）及 <InlineMath math="x < -6" />（選項 C）。</div>
                <div className="mt-1"><span className="bg-emerald-200 text-emerald-800 rounded px-1.5 font-sans text-xs shadow-sm">Step 3</span> 試 <InlineMath math="x=0" />（大於 -4）</div>
                <div className="pl-4">第二條：<InlineMath math="3(0)+12 \geq 0" /> ✅。所有 <InlineMath math="x \geq -4" /> 都在聯集內，但 <InlineMath math="x=-5" /> 也在聯集內，所以答案範圍比 <InlineMath math="x \geq -4" /> 更大。</div>
              </div>
              <div className="bg-white border border-emerald-200 rounded-lg p-2 mt-2">
                兩條不等式的解分別是 <InlineMath math="x > -6" /> 和 <InlineMath math="x \geq -4" />。因為 <InlineMath math="x \geq -4" /> 已包含在 <InlineMath math="x > -6" /> 之內，聯集是 <InlineMath math="x > -6" />。
              </div>
              <div className="text-emerald-700 font-bold mt-2">答案：D（<InlineMath math="x > -6" />）</div>
            </div>
          </div>

          {/* 題型7 */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">方法②</span>
              <span className="font-bold text-lg text-gray-800">題型七：參數式求變數（由 <InlineMath math="d" /> 求 <InlineMath math="c" />）</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-left text-lg border border-gray-200 [&>div]:pl-0 [&_.katex-display>.katex]:!ml-0 [&_.katex-display>.katex]:!text-left">
              <LeftBlockMath math="\text{若 }(3c+1)(d-4)=2d(5c-1)\text{，則 }c=" />
              <div className="grid grid-cols-2 gap-3 mt-3 text-base text-left w-full">
                <div className="whitespace-nowrap"><ChoiceDot label="A" /><InlineMath math="\dfrac{3d-4}{7d+12}" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="B" /><InlineMath math="\dfrac{3d+4}{7d-12}" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="C" /><InlineMath math="\dfrac{7d-12}{3d+4}" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="D" /><InlineMath math="\dfrac{7d+12}{3d-4}" /></div>
              </div>
            </div>
            <div className="border-l-4 border-purple-400 bg-purple-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700 leading-relaxed">
            <div className="font-bold text-purple-800">📝 做法：把選項代回原等式檢查</div>
            <div>不要任意同時指定 <InlineMath math="c" /> 和 <InlineMath math="d" />。這題要找出 <InlineMath math="c" /> 的式子；把選項代回原等式，檢查等式是否成立。</div>
            <div className="pl-2 space-y-1.5">
              <div>先選一個簡單的 <InlineMath math="d" /> 值，例如 <InlineMath math="d=1" />，代入原等式後得到：</div>
              <div className="pl-4"><InlineMath math="(3c+1)(1-4)=2(1)(5c-1)" />，即 <InlineMath math="-9c-3=10c-2" />，所以 <InlineMath math="c=-\dfrac{1}{19}" />。</div>
              <div>再把 <InlineMath math="d=1" /> 代入各選項：A 得 <InlineMath math="-\dfrac{1}{19}" />；B、C、D 得到不同數值。只有 A 符合這次檢查。</div>
              <div>如有多個選項仍符合，或要確認唯一答案，換另一個符合限制的 <InlineMath math="d" /> 再檢查。代一個值吻合只可作檢查，不能單獨證明兩個式子恆等。</div>
            </div>
            <div className="bg-white border border-purple-200 rounded-lg p-2 mt-2">
              <strong>注意：</strong>若要正式求出答案，可整理原等式：<InlineMath math="(3c+1)(d-4)=2d(5c-1)" />，得 <InlineMath math="c=\dfrac{3d-4}{7d+12}" />（<InlineMath math="d\neq-\dfrac{12}{7}" />），即選項 A。
            </div>
            <div className="text-purple-700 font-bold mt-2">這題屬於方法②：代選項回原題，檢查條件是否成立。</div>
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
                  <th className="p-3.5 text-center">方法</th>
                  <th className="p-3.5 text-left">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50"><td className="p-3">化簡、展開或計算代數式（題型一至四）</td><td className="p-3 text-center text-indigo-600 font-bold whitespace-nowrap">方法①</td><td className="p-3 text-gray-600">同一組合法數值代入題目和所有選項，比較結果；未能分辨就換值再試</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">方程／條件，選項提供候選答案（題型五及七）</td><td className="p-3 text-center text-purple-600 font-bold whitespace-nowrap">方法②</td><td className="p-3 text-gray-600">把選項代回原題，檢查等式或條件是否成立</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">不等式解範圍（題型六）</td><td className="p-3 text-center text-amber-600 font-bold whitespace-nowrap">方法③</td><td className="p-3 text-gray-600">不同區間試數值；分界點另行檢查是否包括在解內</td></tr>
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