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

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* 先辨認題目特徵，再選代入方式 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-2 pl-3 border-l-4 border-indigo-500">🔍 睇題目，揀方法</h2>
          <p className="text-gray-600 mb-5">先睇題目長甚麼樣，再跟住做：</p>

          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-full bg-emerald-700 px-3 py-1 text-sm font-bold text-white">方法①</span>
                <h3 className="text-lg font-bold text-emerald-900">問「化簡成甚麼？」→ 可自己選數字試</h3>
              </div>
              <p className="rounded-lg bg-white p-3 text-gray-800">例如：<InlineMath math="x+2x=?" />，問化簡或展開成甚麼。</p>
              <p className="mt-3 font-bold text-emerald-900">自己選數字 → 代入題目和每個選項 → 比較答案</p>
              <p className="mt-2 text-sm text-emerald-800">題型一：分式化簡　｜　題型二：指數運算化簡<br />題型三：展開代數式　｜　題型四：指數律化簡</p>
              <p className="mt-2 text-sm font-semibold text-emerald-950">不同答案可以刪走；答案相同就換數字再試。</p>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-full bg-purple-700 px-3 py-1 text-sm font-bold text-white">方法②</span>
                <h3 className="text-lg font-bold text-purple-900">要找答案 → 不要亂選數字</h3>
              </div>
              <p className="rounded-lg bg-white p-3 text-gray-800">例如：<InlineMath math="x+2=5" />，問 <InlineMath math="x" /> 是多少。</p>
              <p className="mt-3 font-bold text-purple-900">代選項回原題 → 檢查等式是否成立</p>
              <p className="mt-2 text-sm text-purple-800">題型五：解方程　｜　題型六：由一個字母求另一個字母</p>
              <p className="mt-2 text-sm text-purple-900">有兩個字母？不要各自亂選；先代一個，再按題目條件求另一個。</p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-full bg-amber-700 px-3 py-1 text-sm font-bold text-white">方法③</span>
                <h3 className="text-lg font-bold text-amber-900">答案是範圍 → 不能只試一個數字</h3>
              </div>
              <p className="rounded-lg bg-white p-3 text-gray-800">例如：選項是 <InlineMath math="x<2" />、<InlineMath math="x\geq2" />。</p>
              <p className="mt-3 font-bold text-amber-900">每個範圍試數字 → 分界的數字也要試</p>
              <p className="mt-2 text-sm text-amber-800">題型七：不等式</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm leading-relaxed text-rose-950">
            <div className="font-bold text-rose-900 mb-2">🚫 以下題目不要靠「自己亂選數字」</div>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>問方程的答案：</strong>不要任選未知數；把選項代回題目檢查。</li>
              <li><strong>字母之間有關係：</strong>不能每個字母各自亂選，代入後要符合題目條件。</li>
              <li><strong>問不等式的答案範圍：</strong>一個數字不能代表整個範圍；不同範圍和分界都要檢查。</li>
              <li><strong>要證明對所有數字都成立：</strong>試數字不能代替證明；選擇題中只用來刪走錯誤答案。</li>
            </ul>
            <p className="mt-3 rounded-lg bg-white p-3"><strong>記住：</strong>「自己選數字」和「把選項代回題目」是兩種不同做法。</p>
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

          <div className="mb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">方法②</span>
              <span className="font-bold text-lg text-gray-800">題型六：參數式求變數（由 <InlineMath math="d" /> 求 <InlineMath math="c" />）</span>
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
            <div className="font-bold text-purple-800">📝 做法：把選項代回題目檢查</div>
            <div>不要任意同時指定 <InlineMath math="c" /> 和 <InlineMath math="d" />。這題要找出 <InlineMath math="c" /> 的式；把選項代回題目，檢查等式是否成立。</div>
            <div className="pl-2 space-y-1.5">
              <div>先選一個簡單的 <InlineMath math="d" /> 值，例如 <InlineMath math="d=1" />，代入題目後得到：</div>
              <div className="pl-4"><InlineMath math="(3c+1)(1-4)=2(1)(5c-1)" />，即 <InlineMath math="-9c-3=10c-2" />，所以 <InlineMath math="c=-\dfrac{1}{19}" />。</div>
              <div>再把 <InlineMath math="d=1" /> 代入各選項：A 得 <InlineMath math="-\dfrac{1}{19}" />；B、C、D 得到不同數值。只有 A 符合這次檢查。</div>
              <div>如有多個選項仍符合，或要確認唯一答案，換另一個符合限制的 <InlineMath math="d" /> 再檢查。代一個值吻合只可作檢查，不能單獨證明兩個式恆等。</div>
            </div>
            <div className="bg-white border border-purple-200 rounded-lg p-2 mt-2">
              <strong>注意：</strong>若要正式求出答案，可整理題目：<InlineMath math="(3c+1)(d-4)=2d(5c-1)" />，得 <InlineMath math="c=\dfrac{3d-4}{7d+12}" />（<InlineMath math="d\neq-\dfrac{12}{7}" />），即選項 A。
            </div>
            <div className="text-purple-700 font-bold mt-2">這題屬於方法②：代選項回原題，檢查條件是否成立。</div>
            </div>
          </div>

          {/* 題型6 */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">方法③</span>
              <span className="font-bold text-lg text-gray-800">題型七：不等式（取「或」）</span>
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
              <div>先找出不等式左右相等的分界值，再把數線分成不同範圍。每個範圍選一個數值，代入原不等式檢查是否成立。</div>
              <div>本題的分界值是 <InlineMath math="x=-6" /> 和 <InlineMath math="x=-4" />；先試各範圍內的數值，再把分界值代回原不等式，檢查是否成立。</div>
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
        </section>

        <div className="text-center text-gray-400 text-sm pb-8 font-medium">
          DSE 數學 · MC 代數代入法學習筆記 · 僅供參考
        </div>
      </div>
    </div>
  );
};

export default SubstitutionNotes;