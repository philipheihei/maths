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
        <p className="text-indigo-200 text-lg">即使唔識計，都能輕鬆作答選擇題</p>
        <p className="text-indigo-300 text-sm mt-1">DSE 數學 · 應試技巧筆記</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* 原理 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 pl-3 border-l-4 border-indigo-500">💡 甚麼是代入法？</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            當遇上某些 MC 題目不懂計的時候，你未必需要正式計算，可以透過 MC 代數代入法去得出正確答案。<br/>
            步驟如下：
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
                <div className="font-bold">參數式求變數（初學者暫不建議靠代入）</div>
                <div className="text-sm mt-1 text-red-900">例如 <InlineMath math="(3c+1)(d-4)=2d(5c-1)" /> 呢類「由 <InlineMath math="d" /> 求 <InlineMath math="c" />」題，對弱底同學太易亂。胡亂代值會令左邊 <InlineMath math="\neq" /> 右邊，前設錯誤，後面自然全錯。</div>
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
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 1</span> 代 <InlineMath math="k = 2" />（避免分母為0，檢查：<InlineMath math="k+2=4" />, <InlineMath math="5k-6=4" />，OK）</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 2</span> 題目代入：<InlineMath math={`\\dfrac{1}{${h(H0, '2')}+2}+\\dfrac{3}{5(${h(H0, '2')})-6}=\\dfrac14+\\dfrac34=1`} /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 3</span> 代選項（分母 <InlineMath math="(4)(4)=16" />）：
                <ul className="mt-1.5 ml-5 space-y-1 list-none">
                  <li><ChoiceColon label="A" /><InlineMath math={`\\dfrac{-8(${h(H0, '2')})}{((${h(H0, '2')})+2)(4(${h(H0, '2')})-5)}=\\dfrac{-16}{15}`} /> ❌</li>
                  <li><ChoiceColon label="B" /><InlineMath math={`\\dfrac{-2(${h(H0, '2')})}{((${h(H0, '2')})+2)(4(${h(H0, '2')})-5)}=\\dfrac{-4}{15}`} /> ❌</li>
                  <li><ChoiceColon label="C" /><InlineMath math={`\\dfrac{2(${h(H0, '2')})}{((${h(H0, '2')})+2)(4(${h(H0, '2')})-5)}=\\dfrac{4}{15}`} /> ❌</li>
                  <li className="text-emerald-700 font-bold"><ChoiceColon label="D" /><InlineMath math={`\\dfrac{8(${h(H0, '2')})}{((${h(H0, '2')})+2)(4(${h(H0, '2')})-5)}=\\dfrac{16}{15}`} /> ✅ ← 答案</li>
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
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-left text-lg border border-gray-200 [&>div]:pl-0 [&_.katex-display>.katex]:!ml-0 [&_.katex-display>.katex]:!text-left">
              <LeftBlockMath math="\frac{9^{3n+1}}{(3^{2n+3})(27^{2n+1})} = ?" />
              <div className="grid grid-cols-2 gap-3 mt-3 text-base text-left w-full">
                <div className="whitespace-nowrap"><ChoiceDot label="A" /><InlineMath math="9^{-n-2}" /></div><div className="whitespace-nowrap"><ChoiceDot label="B" /><InlineMath math="9^{-n-1}" /></div>
                <div className="whitespace-nowrap"><ChoiceDot label="C" /><InlineMath math="9^{n-2}" /></div><div className="whitespace-nowrap"><ChoiceDot label="D" /><InlineMath math="9^{n-1}" /></div>
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-indigo-800">📝 代入法步驟</div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 1</span> 代 <InlineMath math="n = 1" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 2</span> 題目代入：
                <InlineMath math={`\\dfrac{9^{3(${h(H0, '1')})+1}}{(3^{2(${h(H0, '1')})+3})(27^{2(${h(H0, '1')})+1})}=9^{-3}`} />
              </div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 3</span> 代 <InlineMath math="n=1" /> 入選項：
                <ul className="mt-1.5 ml-5 space-y-1 list-none">
                  <li className="text-emerald-700 font-bold"><ChoiceColon label="A" /><InlineMath math={`9^{-${h(H0, '1')}-2}=9^{-3}`} /> ✅ ← 答案</li>
                  <li><ChoiceColon label="B" /><InlineMath math={`9^{-${h(H0, '1')}-1}=9^{-2}`} /> ❌</li>
                  <li><ChoiceColon label="C" /><InlineMath math={`9^{${h(H0, '1')}-2}=9^{-1}`} /> ❌</li>
                  <li><ChoiceColon label="D" /><InlineMath math={`9^{${h(H0, '1')}-1}=9^0=1`} /> ❌</li>
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
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 1</span> 代 <InlineMath math="\alpha = 2,\ \beta = 3" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 2</span> 題目代入：<InlineMath math={`(2(${h(H0, '2')})-${h(H1, '3')})^2+(${h(H0, '2')}-2(${h(H1, '3')}))^2=17`} /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 3</span> 代選項：
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
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">✅ 適用</span>
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
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 1</span> 代 <InlineMath math="x = 3" /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 2</span> 題目代入：<InlineMath math={`\\dfrac{(27\\cdot ${h(H0, '3')})^5}{(3\\cdot ${h(H0, '3')}^{-2})^4}=3^{24}`} /></div>
              <div><span className="bg-indigo-200 text-indigo-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 3</span> 代選項：
                <ul className="mt-1.5 ml-5 space-y-1 list-none">
                  <li><ChoiceColon label="A" /><InlineMath math={`3^2(${h(H0, '3')})^3=3^5`} /> ❌</li>
                  <li><ChoiceColon label="B" /><InlineMath math={`3^4(${h(H0, '3')})^3=3^7`} /> ❌</li>
                  <li className="text-emerald-700 font-bold"><ChoiceColon label="C" /><InlineMath math={`3^{11}(${h(H0, '3')})^{13}=3^{24}`} /> ✅ ← 答案</li>
                  <li><ChoiceColon label="D" /><InlineMath math={`3^{14}(${h(H0, '3')})^{13}=3^{27}`} /> ❌</li>
                </ul>
              </div>
              <div className="text-emerald-700 font-bold mt-2">答案：C（<InlineMath math="3^{11}x^{13}" />）</div>
            </div>
          </div>

          {/* 題型5 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">✅ 可代入</span>
              <span className="font-bold text-lg text-gray-800">題型五：解方程（有等式 , check左 = 右）</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 text-lg border border-gray-200">
              解 <InlineMath math="(x+2s)(x+t) = sx + st" />，其中 <InlineMath math="s" /> 及 <InlineMath math="t" /> 均為常數。
              <div className="grid grid-cols-2 gap-3 mt-4 text-base text-left w-full">
                <div className="whitespace-nowrap"><ChoiceDot label="A" /><InlineMath math="x = -s" /></div><div className="whitespace-nowrap"><ChoiceDot label="B" /><InlineMath math="x = -2s" /></div>
                <div className="whitespace-nowrap text-sm md:text-base"><ChoiceDot label="C" /><InlineMath math="x = -s" /> 或 <InlineMath math="x = -t" /></div>
                <div className="whitespace-nowrap text-sm md:text-base"><ChoiceDot label="D" /><InlineMath math="x = -2s" /> 或 <InlineMath math="x = -t" /></div>
              </div>
            </div>
            <div className="border-l-4 border-emerald-400 bg-emerald-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700">
              <div className="font-bold text-emerald-800">📝 分析：將選項的 x 值代入兩邊，check 左 = 右</div>
              <div className="pl-2 space-y-1.5">
                <div>代 <InlineMath math="x = -s" />：</div>
                <div className="pl-4">左：<InlineMath math={`(${h(H0, '-s')}+2s)(${h(H0, '-s')}+t) = s(t-s)`} /></div>
                <div className="pl-4">右：<InlineMath math={`s(${h(H0, '-s')})+st = s(t-s)`} /> ✅ 左 = 右，<InlineMath math="x=-s" /> 成立</div>
                <div className="mt-1">代 <InlineMath math="x = -2s" />：</div>
                <div className="pl-4">左：<InlineMath math={`(${h(H1, '-2s')}+2s)(${h(H1, '-2s')}+t) = 0`} /></div>
                <div className="pl-4">右：<InlineMath math={`s(${h(H1, '-2s')})+st = s(t-2s)`} /> ❌ 左 ≠ 右，<InlineMath math="x=-2s" /> 不對!</div>
                <div className="mt-1">代 <InlineMath math="x = -t" />：</div>
                <div className="pl-4">左：<InlineMath math={`(${h(H2, '-t')}+2s)(${h(H2, '-t')}+t) = 0`} /></div>
                <div className="pl-4">右：<InlineMath math={`s(${h(H2, '-t')})+st = 0`} /> ✅ 左 = 右，<InlineMath math="x=-t" /> 成立</div>
              </div>
              <div className="bg-white border border-emerald-200 rounded-lg p-2 mt-2">
                <InlineMath math="x=-s" /> ✅ 及 <InlineMath math="x=-t" /> ✅ → 答案 C
              </div>
              <div className="text-emerald-700 font-bold mt-2">答案：C（<InlineMath math="x = -s" /> 或 <InlineMath math="x = -t" />）</div>
            </div>
          </div>

          {/* 題型6 */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">✅ 可用技巧</span>
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
              <div className="font-bold text-emerald-800">📝 分析：唔識解不等式，都可以用「試數字」方法</div>
              <div>做法好簡單：揀幾個 <InlineMath math="x" /> 值代入左右兩邊，睇住不等號方向有無成立（例如 <InlineMath math="左 > 右" /> 或 <InlineMath math="左 \geq 右" />）。</div>
              <div>先找兩個分界位：<InlineMath math="x=-6" />、<InlineMath math="x=-4" />（即係答案可能會由「啱」變「唔啱」的轉折位），再試這兩個位附近的數字就得。</div>
              <div className="pl-2 space-y-1.5">
                <div><span className="bg-emerald-200 text-emerald-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 1</span> 試 <InlineMath math="x=-5" />（介乎 -6 與 -4 之間）</div>
                <div className="pl-4">第一條：<InlineMath math="-5-1 > \dfrac{2(-5)-9}{3}" />，即 <InlineMath math="-6 > -\dfrac{19}{3}" /> ✅</div>
                <div className="pl-4">第二條：<InlineMath math="3(-5)+12 \geq 0" />，即 <InlineMath math="-3 \geq 0" /> ❌</div>
                <div className="pl-4">因為是「或」，一條成立已經夠，所以 <InlineMath math="x=-5" /> 屬於答案範圍。</div>
                <div className="mt-1"><span className="bg-emerald-200 text-emerald-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 2</span> 試 <InlineMath math="x=-7" />（小於 -6）</div>
                <div className="pl-4">第一條：<InlineMath math="-8 > -\dfrac{23}{3}" /> ❌；第二條：<InlineMath math="-9 \geq 0" /> ❌，兩條都不成立。</div>
                <div className="pl-4"><InlineMath math="x=-7" /> 唔喺答案範圍，可排除 <InlineMath math="x < -6" />（選項 C）。</div>
                <div className="mt-1"><span className="bg-emerald-200 text-emerald-800 rounded px-1.5 font-mono text-xs shadow-sm">Step 3</span> 試 <InlineMath math="x=0" />（大於 -4）</div>
                <div className="pl-4">第二條：<InlineMath math="3(0)+12 \geq 0" /> ✅，所以所有 <InlineMath math="x \geq -4" /> 都會在「或」題中保留。</div>
              </div>
              <div className="bg-white border border-emerald-200 rounded-lg p-2 mt-2">
                由測試可知：小於 -6 不行，而 -5、0 都可行，答案是 <strong>B</strong>（<InlineMath math="x \geq -4" />）。
              </div>
              <div className="text-emerald-700 font-bold mt-2">答案：B（<InlineMath math="x \geq -4" />）</div>
            </div>
          </div>

          {/* 題型7 */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">❌ 初學者先跳過</span>
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
            <div className="border-l-4 border-red-400 bg-red-50 rounded-r-xl p-4 text-sm space-y-2 text-gray-700 leading-relaxed">
              <div className="font-bold text-red-800">📝 重點：呢類題唔用代入法</div>
              <div>原因：題目本身係「有條件等式」，即 <InlineMath math="(3c+1)(d-4)=2d(5c-1)" /> 要成立。你一亂代 <InlineMath math="c,d" />，多數會破壞呢個條件。</div>
              <div className="pl-2 space-y-1.5">
                <div><span className="bg-red-200 text-red-800 rounded px-1.5 font-mono text-xs shadow-sm">例子</span> 你話代 <InlineMath math="c=2,d=3" />：</div>
                <div className="pl-4">左：<InlineMath math="(3(2)+1)(3-4)=7(-1)=-7" /></div>
                <div className="pl-4">右：<InlineMath math="2(3)(5(2)-1)=6(9)=54" /></div>
                <div className="pl-4">左 <InlineMath math="\neq" /> 右，所以你代入嘅 <InlineMath math="(c,d)" /> 根本唔符合題目前設，用佢去比選項會誤導。</div>
              </div>
              <div className="bg-white border border-red-200 rounded-lg p-2 mt-2">
                學生分辨特徵：
                <br/>1. 題目有兩個字母（例如 <InlineMath math="c,d" />）
                <br/>2. 前面寫「若 ... 則 ...」
                <br/>3. 要求「其中一個字母用另一個字母表示」
                <br/>見到以上 3 點，就當「唔用代入法題」。
              </div>
              <div className="text-red-700 font-bold mt-2">呢題重點係識別方法：唔用亂代，避免前設錯誤。</div>
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
                <tr className="hover:bg-gray-50"><td className="p-3">解方程（選項含「或」）</td><td className="p-3 text-center text-emerald-600 font-bold whitespace-nowrap">✅ 適用</td><td className="p-3 text-gray-600">逐一代入兩邊 check 左 = 右</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">不等式範圍</td><td className="p-3 text-center text-amber-600 font-bold whitespace-nowrap">⚠️ 有技巧</td><td className="p-3 text-gray-600">試幾個 x 值，檢查不等號方向</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">參數式求變數（如由 <InlineMath math="d" /> 求 <InlineMath math="c" />）</td><td className="p-3 text-center text-red-600 font-bold whitespace-nowrap">❌ 初學者先唔用代入法</td><td className="p-3 text-gray-600">用固定模板：搬項 → 抽 <InlineMath math="c" /> → 相除</td></tr>
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