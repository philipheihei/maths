import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InlineMath, BlockMath } from '../shared';

const ComplexNotes = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
      <ArrowLeft className="w-5 h-5" /> 返回
    </button>
    <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-purple-400 pb-3">
      📘 筆記：複數 i
    </h1>
    <div className="space-y-8 text-slate-700">

      {/* MC 部份 */}
      <div className="flex items-center gap-3">
        <span className="bg-teal-600 text-white text-sm font-bold px-3 py-1 rounded-full">MC 部份</span>
        <div className="flex-1 h-px bg-teal-200" />
      </div>

      {/* Section 1: Calculator */}
      <section className="bg-teal-50 rounded-xl p-5 border-2 border-teal-300">
        <h2 className="text-lg font-bold text-teal-800 mb-1">🧮 一、計算機神技 — Complex Mode</h2>
        <p className="text-sm text-teal-600 mb-4">見到 <em>i</em> 的題目，10秒用計算機搞掂！</p>

        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <span className="shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-sm flex items-center justify-center">1</span>
            <div>
              <p className="font-bold text-teal-800">開啟 Complex Mode</p>
              <p className="text-sm text-slate-600 mt-0.5">按 <span className="font-mono bg-gray-300 text-gray-800 px-1.5 py-0.5 rounded text-xs font-bold">MODE</span> → 選 <span className="font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">2 (CMPLX)</span></p>
              <p className="text-xs text-slate-400 mt-1">⚠️ 每次計完記得 MODE → 1 返回一般模式</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <span className="shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-sm flex items-center justify-center">2</span>
            <div>
              <p className="font-bold text-teal-800">照題目直接輸入</p>
              <p className="text-sm text-slate-600 mt-0.5">將式子逐字撳入計算機，<InlineMath math="i" /> 按 <span className="font-mono bg-gray-900 text-white px-1.5 py-0.5 rounded text-xs font-bold">ENG</span>（即 <InlineMath math="i" /> 鍵）</p>
              <p className="text-xs text-slate-400 mt-1">無限制題目可先代入數值（例如 k = 10）</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <span className="shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white font-bold text-sm flex items-center justify-center">3</span>
            <div>
              <p className="font-bold text-teal-800">讀出答案</p>
              <p className="text-xs text-slate-400 mt-0.5 mb-2">⚡ 系統預設先顯示<strong className="text-green-700">實部</strong>，直接按 EXE 即可</p>
              <div className="flex gap-3 mt-1 flex-wrap">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <span className="font-mono bg-gray-900 text-white text-xs px-2 py-1 rounded font-bold">EXE</span>
                  <span className="text-sm font-semibold text-green-800">→ 出 <span className="underline">實部</span>（Real Part）</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                  <span className="font-mono bg-gray-300 text-yellow-700 text-xs px-2 py-1 rounded font-bold">SHIFT</span>
                  <span className="text-xs text-slate-400">+</span>
                  <span className="font-mono bg-gray-300 text-yellow-700 text-xs px-2 py-1 rounded font-bold">EXE</span>
                  <span className="text-sm font-semibold text-blue-800">→ 出 <span className="underline">虛部</span>（Imag Part）</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Concept: a+bi form */}
        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded">重要概念</span>
            <span className="text-sm font-bold text-indigo-800">DSE 所有含 <InlineMath math="i" /> 的混算，答案均以 <InlineMath math="a+bi" /> 形式表達</span>
          </div>
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div className="bg-white rounded-lg px-4 py-3 border border-indigo-100">
              <p className="text-xs text-indigo-500 font-bold mb-2">認識 a 與 b</p>
              <div className="flex items-center gap-3 mb-1">
                <InlineMath math="a + bi" />
                <span className="text-xs text-slate-400">↑ 實部　↑ 虛部</span>
              </div>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="bg-green-100 text-green-800 rounded px-2 py-0.5 font-bold">a = 實部</span>
                <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-bold">b = 虛部</span>
              </div>
            </div>
            <div className="bg-white rounded-lg px-4 py-3 border border-indigo-100 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <InlineMath math="5 - 3i" />
                <span className="text-slate-400">→</span>
                <span className="bg-green-100 text-green-800 rounded px-2 py-0.5 text-xs">a = 5</span>
                <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs">b = −3</span>
              </div>
              <div className="flex items-center gap-2">
                <InlineMath math="8 + 7i" />
                <span className="text-slate-400">→</span>
                <span className="bg-green-100 text-green-800 rounded px-2 py-0.5 text-xs">a = 8</span>
                <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs">b = 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Warm-up exercises */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-gray-300 text-yellow-700 text-xs font-bold px-2 py-1 rounded">熱身練習</span>
            <span className="text-sm font-bold text-slate-700">用 Mode 2 計複數四則混算</span>
          </div>
          <p className="text-sm text-slate-500 mb-3">切換到 Mode 2 後，照樣輸入式子，計算機會自動以 <InlineMath math="a+bi" /> 形式顯示答案。</p>

          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-400 font-bold mb-2">例 1</p>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <InlineMath math="-4(5-3i)" />
                <span className="text-slate-400">=</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">-4 × (5 - 3 <span className="text-teal-700 font-bold">i</span>)</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                  <span className="font-mono bg-gray-900 text-white text-xs px-1.5 py-0.5 rounded font-bold">EXE</span>
                  <span className="text-sm text-green-800">先出 <strong>−20</strong>（實部 a）</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
                  <span className="font-mono bg-gray-300 text-yellow-700 text-xs px-1.5 py-0.5 rounded font-bold">SHIFT</span>
                  <span className="text-xs text-slate-400">+</span>
                  <span className="font-mono bg-gray-300 text-yellow-700 text-xs px-1.5 py-0.5 rounded font-bold">EXE</span>
                  <span className="text-sm text-blue-800">後出 <strong>12</strong>（虛部 b）</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">∴ 答案為 <InlineMath math="-20+12i" /></p>
            </div>

            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-400 font-bold mb-2">例 2</p>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <InlineMath math="\dfrac{4i^3}{i-1}" />
                <span className="text-slate-400 text-xs mx-1">→ 輸入：</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">4<span className="text-teal-700 font-bold">iii</span> ÷ ( <span className="text-teal-700 font-bold">i</span> - 1 )</span>
              </div>
              <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-2 py-1 mb-2">⚠️ CASIO 50FH II 的 CMPLX Mode <strong>不支援 ^ 鍵</strong>！輸入 <InlineMath math="i^3" /> 時須打 <code><em>i</em> × <em>i</em> × <em>i</em></code>（有幾次方就打幾個 <em>i</em> 相乘）</p>
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                  <span className="font-mono bg-gray-900 text-white text-xs px-1.5 py-0.5 rounded font-bold">EXE</span>
                  <span className="text-sm text-green-800">先出 <strong>-2</strong>（實部 a）</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
                  <span className="font-mono bg-gray-300 text-yellow-700 text-xs px-1.5 py-0.5 rounded font-bold">SHIFT</span>
                  <span className="text-xs text-slate-400">+</span>
                  <span className="font-mono bg-gray-300 text-yellow-700 text-xs px-1.5 py-0.5 rounded font-bold">EXE</span>
                  <span className="text-sm text-blue-800">後出 <strong>2</strong>（虛部 b）</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">∴ 答案為 <InlineMath math="-2+2i" /></p>
            </div>
          </div>
          <p className="text-xs text-teal-700 mt-3 bg-teal-50 rounded-lg px-3 py-2 border border-teal-100">💡 記住：<strong>EXE 先出實部（a）</strong>，<strong>SHIFT+EXE 後出虛部（b）</strong>，合起來就是 a+bi 的答案。</p>
        </div>

        {/* Example: 2023 DSE */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-teal-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">例題</span>
            <span className="text-sm font-bold text-slate-700">2023 DSE Paper2 Q34</span>
          </div>
          <p className="text-sm mb-3 text-slate-700">若 <InlineMath math="k" /> 為一實數，則 <InlineMath math="\dfrac{i}{k-i}+\dfrac{2}{k+i}" /> 的實部為？</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
              <span className="shrink-0 w-6 h-6 rounded-full bg-amber-400 text-white font-bold text-xs flex items-center justify-center">1</span>
              <span className="text-amber-800 font-semibold">無限制 → 代 <InlineMath math="k=10" /></span>
            </div>
            <div className="flex items-center gap-2 bg-teal-50 rounded-lg px-3 py-2">
              <span className="shrink-0 w-6 h-6 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center">2</span>
              <div>
                <span className="text-teal-800 font-semibold">Cal 機輸入：</span>
                <span className="font-mono bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded ml-1">( i ÷ (10 - i) ) + ( 2 ÷ (10 + i) )</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
              <span className="shrink-0 w-6 h-6 rounded-full bg-green-600 text-white font-bold text-xs flex items-center justify-center">3</span>
              <span className="text-green-800">按 <span className="font-mono bg-gray-900 text-white text-xs px-2 py-0.5 rounded font-bold">EXE</span> → 實部 = <InlineMath math="\dfrac{19}{101}" /></span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <span className="shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center">4</span>
              <span className="text-blue-800">對比選項：代 <InlineMath math="k=10" /> 後答案為 <InlineMath math="\dfrac{19}{101}" /> → 選 <strong>B. <InlineMath math="\dfrac{2k-1}{k^2+1}" /></strong></span>
            </div>
          </div>
          <div className="mt-3 bg-slate-50 rounded-lg p-3 text-xs text-slate-500 border border-slate-200">
            💡 代入數值後，逐一代入4個選項，哪個答案相符即是正確選項。若兩個選項相符，換另一個數值再試。
          </div>
        </div>
      </section>

      {/* 長答部份 */}
      <div className="flex items-center gap-3">
        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">長答部份</span>
        <div className="flex-1 h-px bg-purple-200" />
      </div>

      {/* Section 2: i derivations */}
      <section className="bg-purple-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-800 mb-3">二、<InlineMath math="i" /> 的四則混算（以計算機 Complex Mode 計）</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <p className="text-sm text-purple-700 font-semibold mb-3">由定義出發逐步推導：</p>
          <div className="space-y-2">
            {[
              { lhs: 'i', eq: '\\sqrt{-1}' },
              { lhs: 'i^2', eq: '(\\sqrt{-1})(\\sqrt{-1}) = -1' },
              { lhs: 'i^3', eq: 'i \\cdot i^2 = i(-1) = -i' },
              { lhs: 'i^4', eq: 'i^2 \\cdot i^2 = (-1)(-1) = 1' },
            ].map(({ lhs, eq }) => (
              <div key={lhs} className="flex items-center gap-3 bg-purple-50 rounded-lg px-3 py-2 text-sm">
                <span className="w-12 font-bold text-purple-700 shrink-0"><InlineMath math={lhs} /></span>
                <span className="text-slate-400">=</span>
                <span className="text-slate-700"><InlineMath math={eq} /></span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-100 rounded-lg p-4">
          <p className="font-semibold text-purple-800 mb-2">每 4 個次方為一個循環 🔄</p>
          <div className="grid grid-cols-4 gap-2 text-sm text-center">
            {[['i^5','i'],['i^6','-1'],['i^7','-i'],['i^8','1']].map(([p,v]) => (
              <div key={p} className="bg-white rounded-lg py-2 shadow-sm">
                <div className="text-xs text-slate-400 mb-1"><InlineMath math={p} /></div>
                <div className="font-bold text-purple-700"><InlineMath math={v} /></div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 flex-wrap text-sm bg-white rounded-lg px-3 py-2">
            <InlineMath math="i^1=i" />
            <span className="text-slate-300">→</span>
            <InlineMath math="i^2=-1" />
            <span className="text-slate-300">→</span>
            <InlineMath math="i^3=-i" />
            <span className="text-slate-300">→</span>
            <InlineMath math="i^4=1" />
            <span className="text-slate-300">→</span>
            <InlineMath math="i^5=i" />
            <span className="text-slate-400 text-xs">（循環）</span>
          </div>
        </div>
      </section>

      {/* Section 3: i power cycle */}
      <section className="bg-indigo-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-indigo-800 mb-3">三、虛數單位 <em>i</em> 的冪次循環</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <BlockMath math="i^1 = i, \quad i^2 = -1, \quad i^3 = -i, \quad i^4 = 1" />
          <p className="text-sm text-indigo-700 mt-2">週期為 4，即 <InlineMath math="i^{4k} = 1" />，<InlineMath math="i^{4k+1} = i" />，<InlineMath math="i^{4k+2} = -1" />，<InlineMath math="i^{4k+3} = -i" /></p>
        </div>
        <div className="bg-indigo-100 rounded-lg p-3">
          <p className="font-semibold mb-1">技巧：用 n mod 4 判斷</p>
          <p className="text-sm">例：<InlineMath math="i^{37}" />，37 mod 4 = 1，故 <InlineMath math="i^{37} = i" /></p>
        </div>
      </section>

      {/* Section 4: Rationalization */}
      <section className="bg-blue-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-blue-800 mb-3">四、有理化含 i 的分式</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <p className="font-semibold text-blue-700 mb-2">共軛複數乘法：</p>
          <BlockMath math="\frac{a+bi}{c+di} = \frac{(a+bi)(c-di)}{c^2+d^2}" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="bg-blue-100 rounded-lg p-3">
            <p className="font-semibold mb-1 text-sm">除以 i：</p>
            <BlockMath math="\frac{1}{i} = \frac{-i}{i(-i)} = -i" />
          </div>
          <div className="bg-blue-100 rounded-lg p-3">
            <p className="font-semibold mb-1 text-sm">例（SP-34）：</p>
            <BlockMath math="4k-\frac{6+ki}{i}=4k-(k-6i)=3k+6i" />
          </div>
        </div>
      </section>

      {/* Section 5: Making real */}
      <section className="bg-green-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-green-800 mb-3">五、「令式子為實數」問題</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="font-semibold text-green-700 mb-2">方法：令虛部 = 0</p>
          <p>展開後，虛部含參數。令虛部 = 0，解出參數。</p>
        </div>
        <div className="bg-green-100 rounded-lg p-4 mt-3">
          <p className="font-semibold mb-1">例（15-35）：<InlineMath math="z = (a+5)i^6+(a-3)i^7" />，z 為實數</p>
          <BlockMath math="i^6 = -1,\quad i^7 = -i" />
          <BlockMath math="z = -(a+5) + (3-a)i" />
          <BlockMath math="\begin{aligned} \text{令虛部}=0:\; 3-a &= 0 \\ a &= 3 \end{aligned}" />
        </div>
      </section>

      {/* Section 6: Weighted sum */}
      <section className="bg-yellow-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-yellow-800 mb-3">六、加權冪次求實部</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="font-semibold mb-1">例（13-36）：<InlineMath math="i+2i^2+3i^3+4i^4" /> 的實部為</p>
          <BlockMath math="= i + 2(-1) + 3(-i) + 4(1) = -2+4+\underbrace{i-3i}_{-2i} = 2-2i" />
          <BlockMath math="\text{實部} = 2" />
        </div>
      </section>

      {/* Section 7: Arithmetic tips */}
      <section className="bg-red-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-red-800 mb-3">七、運算重點提示</h2>
        <ul className="space-y-2">
          <li className="bg-white rounded-lg p-3 shadow-sm">
            <InlineMath math="(a+bi)(c+di) = (ac-bd)+(ad+bc)i" />
          </li>
          <li className="bg-white rounded-lg p-3 shadow-sm">
            <span className="font-semibold">實部</span> = 不含 i 的部份；<span className="font-semibold">虛部</span> = i 的係數
          </li>
          <li className="bg-white rounded-lg p-3 shadow-sm">
            若 x 為實數，則 <InlineMath math="(x+ni)(m+i)" /> 展開後實部含 x
          </li>
        </ul>
      </section>

      {/* Section 8: Number system chart */}
      <section className="bg-slate-50 rounded-xl p-5 border border-slate-200 overflow-hidden">
        <h2 className="text-lg font-bold text-slate-800 mb-6">八、數系表</h2>
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[600px] flex flex-col items-center pt-2 select-none">
            {/* L1: Complex */}
            <div className="bg-[#e78a8d] text-[#2c3e50] font-bold text-lg py-2.5 px-20 border border-red-300 z-10 relative shadow-sm">
              複數
            </div>

            {/* Line L1 to L2 */}
            <div className="w-full flex flex-col items-center">
              <div className="w-0 h-5 border-l-2 border-slate-700"></div>
              <div className="w-[60%] border-t-2 border-slate-700 h-5 flex justify-between rounded-t-sm">
                <div className="w-0 h-full border-l-2 border-slate-700 -ml-[1px]"></div>
                <div className="w-0 h-full border-r-2 border-slate-700 -mr-[1px]"></div>
              </div>
            </div>

            {/* L2 row */}
            <div className="w-full flex justify-center gap-[10%] px-[5%] -mt-1">
              {/* L2 Left: Complex with i */}
              <div className="flex flex-col w-[40%] items-center z-10">
                <div className="w-full text-center shadow-sm">
                  <div className="bg-[#acd691] text-[#2c3e50] font-bold py-2 border border-green-300">實數與虛數的和</div>
                  <div className="bg-[#fcde84] text-[#2c3e50] font-bold py-1.5 border border-yellow-400 mt-[-1px] text-base">有 <span className="italic font-bold text-lg">i</span> 的數</div>
                </div>
                <div className="mt-2 text-blue-600 font-bold self-start pl-2">
                  <span className="text-[#6495ed] text-xl font-bold">e.g. </span>
                  <span className="text-[#2c3e50] font-mono text-xl ml-2 tracking-wider">2+7i , -3i</span>
                </div>
              </div>

              {/* L2 Right: Real */}
              <div className="flex flex-col w-[40%] items-center z-10">
                <div className="w-full text-center shadow-sm">
                  <div className="bg-[#abdbfb] text-[#2c3e50] font-bold py-2 border border-blue-300 tracking-[0.2em]">實數</div>
                  <div className="bg-[#fcde84] text-[#2c3e50] font-bold py-1.5 border border-yellow-400 mt-[-1px] text-base">無 <span className="italic font-bold text-lg">i</span> 的數</div>
                </div>

                {/* Branch L2R to L3 */}
                <div className="w-full flex flex-col items-center">
                  <div className="w-0 h-5 border-l-2 border-slate-700"></div>
                  <div className="w-[85%] border-t-2 border-slate-700 h-5 flex justify-between rounded-t-sm">
                    <div className="w-0 h-full border-l-2 border-slate-700 -ml-[1px]"></div>
                    <div className="w-0 h-full border-r-2 border-slate-700 -mr-[1px]"></div>
                  </div>
                </div>

                {/* L3 row */}
                <div className="w-[120%] flex justify-between gap-[5%] -ml-[10%] -mt-1">
                  {/* Irrational */}
                  <div className="flex flex-col w-[45%] items-center z-10">
                    <div className="w-full text-center shadow-sm">
                      <div className="bg-[#abdbfb] text-[#2c3e50] font-bold py-1.5 border border-blue-300">無理數</div>
                      <div className="bg-[#fcde84] text-[#2c3e50] font-bold py-1.5 border border-yellow-400 mt-[-1px] text-[13px] whitespace-nowrap px-1"><span className="text-orange-500">爛數</span>(寫唔到做分數)</div>
                    </div>
                    <div className="mt-2 text-blue-600 font-bold self-start pl-1 flex items-center">
                      <span className="text-[#6495ed] text-lg font-bold">e.g. </span>
                      <span className="text-[#2c3e50] ml-2 flex items-center gap-1.5 inline-flex text-[17px] font-semibold">
                        <InlineMath math="\pi" /> , <InlineMath math="\sin 60^\circ" />
                      </span>
                    </div>
                  </div>

                  {/* Rational */}
                  <div className="flex flex-col w-[45%] items-center z-10">
                    <div className="w-full text-center shadow-sm">
                      <div className="bg-[#abdbfb] text-[#2c3e50] font-bold py-1.5 border border-blue-300">有理數</div>
                      <div className="bg-[#fcde84] text-[#2c3e50] font-bold py-1.5 border border-yellow-400 mt-[-1px] text-[13px] whitespace-nowrap px-1"><span className="text-blue-500">靚數</span>(整數/分數)</div>
                    </div>

                    {/* Branch L3R to L4 */}
                    <div className="w-full flex flex-col items-center text-slate-700">
                      <div className="w-0 h-4 border-l-2 border-slate-700"></div>
                      <div className="w-[90%] border-t-2 border-slate-700 h-4 flex justify-between rounded-t-sm">
                        <div className="w-0 h-full border-l-2 border-slate-700 -ml-[1px]"></div>
                        <div className="w-0 h-full border-r-2 border-slate-700 -mr-[1px]"></div>
                      </div>
                    </div>

                    {/* L4 row */}
                    <div className="w-[125%] flex justify-between gap-[5%] -ml-[12.5%] -mt-1">
                      <div className="flex flex-col flex-1 items-center z-10">
                        <div className="w-full bg-[#abdbfb] text-[#2c3e50] font-bold py-1.5 text-center border border-blue-300 shadow-sm whitespace-nowrap">整數</div>
                        <div className="text-blue-600 font-bold self-start mt-2 w-full flex pl-1">
                          <span className="text-[#6495ed] text-sm">e.g.</span>
                          <span className="text-[#2c3e50] ml-1.5 font-mono tracking-widest text-[15px] pt-px">-4, 0, 7</span>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 items-center z-10">
                        <div className="w-full bg-[#abdbfb] text-[#2c3e50] font-bold py-1.5 text-center border border-blue-300 shadow-sm whitespace-nowrap">分數</div>
                        <div className="text-blue-600 font-bold w-full self-start mt-1.5 flex items-start pl-1">
                          <span className="text-[#6495ed] text-sm mt-1">e.g.</span>
                          <span className="text-[#2c3e50] font-bold inline-flex items-center gap-2 text-base ml-1.5">
                            <InlineMath math="\dfrac{3}{5}" /> , <InlineMath math="\dfrac{2}{9}" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
);

export default ComplexNotes;
