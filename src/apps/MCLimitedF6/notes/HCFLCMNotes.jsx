import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InlineMath, BlockMath } from '../shared';

const HCFLCMNotes = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
      <ArrowLeft className="w-5 h-5" /> 返回
    </button>
    <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-400 pb-3">
      📘 筆記：多項式的 H.C.F. 及 L.C.M.
    </h1>

    <div className="space-y-8 text-slate-700">

      {/* 一、定義 */}
      <section className="bg-blue-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-blue-800 mb-3">一、要點</h2>
        <div className="space-y-3">
          <div className="bg-blue-100 rounded-lg p-4 flex items-start gap-3">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shrink-0">H.C.F.</span>
            <div>
              <p className="font-bold text-blue-800">最高公因式</p>
              <p className="text-sm mt-1">每個變量取<strong>最小次方</strong>（所有式子都有的部分）</p>
            </div>
          </div>
          <div className="bg-indigo-100 rounded-lg p-4 flex items-start gap-3">
            <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shrink-0">L.C.M.</span>
            <div>
              <p className="font-bold text-indigo-800">最低公倍式</p>
              <p className="text-sm mt-1">每個變量取<strong>最大次方</strong>（所有式子出現過的最高次）</p>
            </div>
          </div>
        </div>
      </section>

      {/* 二、單項式 */}
      <section className="bg-green-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-green-800 mb-3">二、單項式的 H.C.F. 及 L.C.M.</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-semibold text-green-700 mb-1">步驟：</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>係數另外計算：H.C.F. 係數 = 各係數的公因數，L.C.M. 係數 = 各係數的公倍數</li>
            <li>每個字母分一行，每行列出各式的次方，再取最小（H.C.F.）或最大（L.C.M.）次方</li>
          </ol>
        </div>

        <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
          <p className="font-semibold mb-3">例題 1：求 <InlineMath math="3x^4y^2z" />、<InlineMath math="4xy^5z" />、<InlineMath math="6x^2y^3" /> 的 H.C.F.</p>
          <p className="text-sm mb-2 text-green-700">係數：3、4、6 的公因數 = <strong>1</strong></p>
          <p className="text-sm mb-3 text-green-700">各字母分行比較（取<strong>最小</strong>次方）：</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <span className="font-bold text-blue-700 w-5">x</span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="x^4" /></span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="x^1" /></span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="x^2" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-blue-700">最小次方：<InlineMath math="x^1 = x" /></span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-lg px-3 py-2">
              <span className="font-bold text-green-700 w-5">y</span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="y^2" /></span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="y^5" /></span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="y^3" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-green-700">最小次方：<InlineMath math="y^2" /></span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
              <span className="font-bold text-amber-700 w-5">z</span>
              <span className="bg-amber-100 text-amber-800 rounded px-2 py-0.5 font-mono"><InlineMath math="z^1" /></span>
              <span className="bg-amber-100 text-amber-800 rounded px-2 py-0.5 font-mono"><InlineMath math="z^1" /></span>
              <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 font-mono text-xs">沒有</span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-amber-700">最小次方：<InlineMath math="z^0" />（不含 z）</span>
            </div>
          </div>
          <p className="text-xs text-amber-700 mt-2">⚠️ <InlineMath math="6x^2y^3" /> 沒有 z，視作 <InlineMath math="z^0" />，故 z 不出現在 H.C.F. 中</p>
          <BlockMath math="\therefore \text{H.C.F.} = xy^2" />
        </div>

        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
          <p className="font-semibold mb-3">例題 2：求 <InlineMath math="9a^2b" />、<InlineMath math="12a^4b^3" />、<InlineMath math="15a^6" /> 的 L.C.M.</p>
          <p className="text-sm mb-2 text-indigo-700">係數：9、12、15 的公倍數 = <strong>180</strong></p>
          <p className="text-sm mb-3 text-indigo-700">各字母分行比較（取<strong>最大</strong>次方）：</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <span className="font-bold text-blue-700 w-5">a</span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="a^2" /></span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="a^4" /></span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="a^6" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-blue-700">最大次方：<InlineMath math="a^6" /></span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-lg px-3 py-2">
              <span className="font-bold text-green-700 w-5">b</span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="b^1" /></span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="b^3" /></span>
              <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 font-mono text-xs">沒有</span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-green-700">最大次方：<InlineMath math="b^3" /></span>
            </div>
          </div>
          <p className="text-xs text-green-700 mt-2">⚠️ <InlineMath math="15a^6" /> 沒有 b，但 L.C.M. 取最大次方，b 仍需包含</p>
          <BlockMath math="\therefore \text{L.C.M.} = 180a^6b^3" />
        </div>
      </section>

      {/* 三、多項式 */}
      <section className="bg-purple-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-800 mb-3">三、多項式的 H.C.F. 及 L.C.M.</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-semibold text-purple-700 mb-1">步驟：</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>先<strong>因式分解</strong>每個多項式，寫成各因式之積</li>
            <li>每個因式分行比較次方，再取最小（H.C.F.）或最大（L.C.M.）次方</li>
          </ol>
        </div>

        <div className="bg-purple-100 rounded-lg p-4 mb-4">
          <p className="font-semibold mb-2">例題 3：求 <InlineMath math="p^2+4p+4" /> 及 <InlineMath math="p^2-4" /> 的 L.C.M.</p>
          <BlockMath math="p^2+4p+4 = (p+2)^2" />
          <BlockMath math="p^2-4 = (p+2)(p-2)" />
          <div className="space-y-2 text-sm mt-2">
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
              <span className="font-bold text-blue-700 w-16 text-xs">(p+2)</span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(p+2)^2" /></span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(p+2)^1" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-blue-700">最大：<InlineMath math="(p+2)^2" /></span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-lg px-3 py-2">
              <span className="font-bold text-green-700 w-16 text-xs">(p−2)</span>
              <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 font-mono text-xs">沒有</span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(p-2)^1" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-green-700">最大：<InlineMath math="(p-2)^1" /></span>
            </div>
          </div>
          <BlockMath math="\therefore \text{L.C.M.} = (p+2)^2(p-2)" />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="font-semibold mb-2">例題 4：求 <InlineMath math="x^2(x+1)(x+2)" /> 及 <InlineMath math="x(x+1)^3" /> 的 H.C.F.</p>
          <div className="space-y-2 text-sm mt-2">
            <div className="flex items-center gap-2 bg-blue-100 rounded-lg px-3 py-2">
              <span className="font-bold text-blue-700 w-8 text-xs">x</span>
              <span className="bg-blue-200 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="x^2" /></span>
              <span className="bg-blue-200 text-blue-800 rounded px-2 py-0.5 font-mono"><InlineMath math="x^1" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-blue-700">最小：<InlineMath math="x^1" /></span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 rounded-lg px-3 py-2">
              <span className="font-bold text-green-700 w-8 text-xs">(x+1)</span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(x+1)^1" /></span>
              <span className="bg-green-200 text-green-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(x+1)^3" /></span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-green-700">最小：<InlineMath math="(x+1)^1" /></span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
              <span className="font-bold text-amber-700 w-8 text-xs">(x+2)</span>
              <span className="bg-amber-100 text-amber-800 rounded px-2 py-0.5 font-mono"><InlineMath math="(x+2)^1" /></span>
              <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 font-mono text-xs">沒有</span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-amber-700">最小：<InlineMath math="(x+2)^0" />（不含）</span>
            </div>
          </div>
          <BlockMath math="\therefore \text{H.C.F.} = x(x+1)" />
        </div>
      </section>

      {/* 四、求第三式 */}
      <section className="bg-orange-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-orange-800 mb-3">四、已知 H.C.F.、L.C.M. 及兩個式，求第三個式</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-semibold text-orange-700 mb-2">方法（針對每個變量分行考慮）：</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>若兩個已知式的次方都<strong>高於</strong> H.C.F. → 第三式需補足 H.C.F. 的次方</li>
            <li>若兩個已知式的次方都<strong>低於</strong> L.C.M. → 第三式需補足 L.C.M. 的次方</li>
          </ul>
        </div>

        <div className="bg-orange-100 rounded-lg p-4">
          <p className="font-semibold mb-3">例題 5：H.C.F. = <InlineMath math="x^2y^2z" />，L.C.M. = <InlineMath math="x^3y^4z^5" />，第一式 = <InlineMath math="x^3y^2z^2" />，第二式 = <InlineMath math="x^2y^3z^5" />，求第三式</p>
          <div className="space-y-2 text-sm">
            <div className="bg-blue-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-blue-700 w-5">x</span>
                <span className="text-xs text-slate-500">H.C.F.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="x^2" /></span>
                <span className="text-xs text-slate-500">L.C.M.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="x^3" /></span>
                <span className="text-xs text-slate-500">式1:</span><span className="bg-blue-200 rounded px-1"><InlineMath math="x^3" /></span>
                <span className="text-xs text-slate-500">式2:</span><span className="bg-blue-200 rounded px-1"><InlineMath math="x^2" /></span>
              </div>
              <p className="text-xs mt-1 text-blue-700">式1有 x³，式2有 x²，已涵蓋 H.C.F.(x²) 和 L.C.M.(x³) → 第三式 x 次方自由（取 x² 或 x³ 均可）</p>
            </div>
            <div className="bg-green-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-green-700 w-5">y</span>
                <span className="text-xs text-slate-500">H.C.F.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="y^2" /></span>
                <span className="text-xs text-slate-500">L.C.M.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="y^4" /></span>
                <span className="text-xs text-slate-500">式1:</span><span className="bg-green-200 rounded px-1"><InlineMath math="y^2" /></span>
                <span className="text-xs text-slate-500">式2:</span><span className="bg-green-200 rounded px-1"><InlineMath math="y^3" /></span>
              </div>
              <p className="text-xs mt-1 text-green-700">式1和式2的最大次方是 y³，未達到 L.C.M. 的 y⁴ → 第三式必須有 <strong>y⁴</strong></p>
            </div>
            <div className="bg-amber-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-amber-700 w-5">z</span>
                <span className="text-xs text-slate-500">H.C.F.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="z^1" /></span>
                <span className="text-xs text-slate-500">L.C.M.:</span><span className="bg-slate-200 rounded px-1"><InlineMath math="z^5" /></span>
                <span className="text-xs text-slate-500">式1:</span><span className="bg-amber-200 rounded px-1"><InlineMath math="z^2" /></span>
                <span className="text-xs text-slate-500">式2:</span><span className="bg-amber-200 rounded px-1"><InlineMath math="z^5" /></span>
              </div>
              <p className="text-xs mt-1 text-amber-700">式1和式2的最小次方是 z²，高於 H.C.F. 的 z¹ → 第三式必須有 <strong>z¹</strong></p>
            </div>
          </div>
          <BlockMath math="\therefore \text{第三式} = x^2y^4z \text{（由選項確認 x 取 } x^2\text{）}" />
        </div>
      </section>

      {/* 五、常用恆等式 */}
      <section className="bg-yellow-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-yellow-800 mb-3">五、常用因式分解恆等式</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ['a^2-b^2=(a+b)(a-b)', '平方差'],
            ['a^2+2ab+b^2=(a+b)^2', '完全平方和'],
            ['a^2-2ab+b^2=(a-b)^2', '完全平方差'],
          ].map(([formula, name]) => (
            <div key={name} className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3">
              <span className="text-yellow-600 font-bold text-sm w-16 shrink-0">{name}</span>
              <InlineMath math={formula} />
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default HCFLCMNotes;
