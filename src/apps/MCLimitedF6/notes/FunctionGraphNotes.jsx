import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InlineMath, BlockMath } from '../shared';

const FunctionGraphNotes = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
      <ArrowLeft className="w-5 h-5" /> 返回
    </button>
    <h1 className="text-2xl font-bold text-slate-800 mb-2 border-b-2 border-orange-400 pb-3">
      📈 筆記：函數圖像 — <InlineMath math="y = ax^2+bx+c" /> 的 a、b、c
    </h1>
    <p className="text-sm text-slate-500 mb-6">F4 CH3 · 二次函數</p>

    <div className="space-y-8 text-slate-700">

      {/* 0: Intro */}
      <section className="bg-orange-50 rounded-xl p-5 border-2 border-orange-200">
        <div className="text-center mb-3">
          <span className="text-3xl font-black tracking-tight">
            <span className="text-slate-700">y = </span>
            <span className="text-orange-500">a</span>
            <span className="text-slate-700">x² + </span>
            <span className="text-amber-500">b</span>
            <span className="text-slate-700">x + </span>
            <span className="text-sky-500">c</span>
          </span>
        </div>
        <p className="text-sm text-center text-slate-600">
          呢條公式反映一幅<strong>拋物線</strong>嘅圖像。<br />
          <span className="text-orange-500 font-bold">a</span>、<span className="text-amber-500 font-bold">b</span>、<span className="text-sky-500 font-bold">c</span> 各自幫你搵圖像上嘅不同資訊 🔖
        </p>
      </section>

      {/* 1: a — Direction */}
      <section className="bg-orange-50 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-orange-500 text-white font-black text-lg px-3 py-1 rounded-lg">a</span>
          <h2 className="text-lg font-bold text-orange-800">開口方向</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* a > 0 */}
          <div className="bg-white rounded-xl p-4 border-2 border-yellow-300 shadow-sm flex flex-col items-center">
            <div className="text-base font-bold text-slate-700 mb-1"><InlineMath math="a > 0" /></div>
            <div className="text-xs text-slate-500 mb-3">開口向上</div>
            <svg viewBox="0 0 120 100" className="w-36 h-28">
              <defs>
                <marker id="arr1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
                </marker>
              </defs>
              <line x1="10" y1="70" x2="110" y2="70" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr1)" />
              <line x1="60" y1="95" x2="60" y2="5" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr1)" />
              <path d="M 20,20 Q 60,150 100,20" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="42" cy="45" r="5" fill="#1e293b" />
              <circle cx="78" cy="45" r="5" fill="#1e293b" />
            </svg>
            <div className="mt-1 bg-yellow-100 text-yellow-800 font-bold text-sm px-3 py-1 rounded-full">正數：笑哈哈 🙂</div>
          </div>

          {/* a < 0 */}
          <div className="bg-white rounded-xl p-4 border-2 border-sky-300 shadow-sm flex flex-col items-center">
            <div className="text-base font-bold text-slate-700 mb-1"><InlineMath math="a < 0" /></div>
            <div className="text-xs text-slate-500 mb-3">開口向下</div>
            <svg viewBox="0 0 120 100" className="w-36 h-28">
              <defs>
                <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
                </marker>
              </defs>
              <line x1="10" y1="60" x2="110" y2="60" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr2)" />
              <line x1="60" y1="95" x2="60" y2="5" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr2)" />
              <path d="M 20,95 Q 60,-30 100,95" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="42" cy="45" r="5" fill="#1e293b" />
              <circle cx="78" cy="45" r="5" fill="#1e293b" />
            </svg>
            <div className="mt-1 bg-sky-100 text-sky-800 font-bold text-sm px-3 py-1 rounded-full">負數：喊口樣 ☹️</div>
          </div>
        </div>
      </section>

      {/* 2: c — y-intercept */}
      <section className="bg-sky-50 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-sky-500 text-white font-black text-lg px-3 py-1 rounded-lg">c</span>
          <h2 className="text-lg font-bold text-sky-800">y 截距</h2>
        </div>

        <div className="bg-white rounded-xl p-4 border border-sky-200 shadow-sm">
          <p className="text-sm mb-3">
            <span className="text-sky-500 font-black text-xl">c</span> 就係圖像與 <strong>y 軸的交點</strong>。
          </p>
          <div className="bg-sky-50 rounded-lg px-4 py-3 border border-sky-200 text-sm">
            <p className="font-semibold text-sky-700 mb-1">原因：</p>
            <p>代入 <InlineMath math="x = 0" />：</p>
            <BlockMath math="y = a(0)^2 + b(0) + c = c" />
            <p className="text-slate-600">∴ y 截距 = <span className="font-bold text-sky-600">c</span>，交點為 <InlineMath math="(0,\ c)" /></p>
          </div>
        </div>
      </section>

      {/* 3: b — Axis of Symmetry */}
      <section className="bg-amber-50 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-amber-500 text-white font-black text-lg px-3 py-1 rounded-lg">b</span>
          <h2 className="text-lg font-bold text-amber-800">對稱軸</h2>
        </div>

        <div className="bg-amber-100 rounded-lg px-4 py-3 mb-4 text-sm text-amber-800">
          ⚠️ <strong>b 無單獨所代表的資訊</strong>，但可以<strong>配合 a</strong> 用於搵對稱軸！
        </div>

        <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded">公式</span>
              <span className="text-lg font-bold">
                <InlineMath math="x = -\dfrac{b}{2a}" />
              </span>
            </div>
            <div className="bg-amber-50 rounded-lg px-3 py-2 border border-amber-200 text-xs text-amber-700">
              <strong>記法：</strong>計算 b ÷ 2a，加個負號，就係對稱軸 x 的值。
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200 text-sm">
              <p className="font-semibold text-slate-700 mb-1">例：<InlineMath math="y = 2x^2 - 8x + 3" /></p>
              <p className="text-slate-600"><InlineMath math="a=2,\ b=-8" /></p>
              <BlockMath math="x = -\frac{-8}{2(2)} = \frac{8}{4} = 2" />
              <p className="text-slate-600">∴ 對稱軸為 <InlineMath math="x = 2" /></p>
            </div>
          </div>

          <svg viewBox="0 0 140 120" className="w-40 h-40 shrink-0">
            <defs>
              <marker id="arrB" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
              </marker>
            </defs>
            <line x1="10" y1="85" x2="130" y2="85" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrB)" />
            <line x1="30" y1="115" x2="30" y2="5" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrB)" />
            <path d="M 20,25 Q 75,160 130,25" fill="none" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="75" y1="110" x2="75" y2="10" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" />
            <text x="50" y="118" fontSize="10" fill="#374151" fontWeight="bold">x</text>
            <text x="58" y="118" fontSize="10" fill="#374151" fontWeight="bold">=</text>
            <text x="66" y="118" fontSize="10" fill="#374151" fontWeight="bold">-</text>
            <text x="74" y="111" fontSize="9" fill="#f59e0b" fontWeight="bold">b</text>
            <line x1="72" y1="114" x2="84" y2="114" stroke="#374151" strokeWidth="1.5" />
            <text x="72" y="122" fontSize="9" fill="#374151" fontWeight="bold">2a</text>
          </svg>
        </div>
      </section>

      {/* 4: Summary */}
      <section className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">📋 總結</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-orange-200 shadow-sm">
            <span className="bg-orange-500 text-white font-black text-base px-2.5 py-0.5 rounded shrink-0 mt-0.5">a</span>
            <div>
              <p className="font-bold text-orange-800">開口方向</p>
              <p className="text-sm text-slate-600"><InlineMath math="a>0" /> → 開口向上（笑）　<InlineMath math="a<0" /> → 開口向下（喊）</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-sky-200 shadow-sm">
            <span className="bg-sky-500 text-white font-black text-base px-2.5 py-0.5 rounded shrink-0 mt-0.5">c</span>
            <div>
              <p className="font-bold text-sky-800">y 截距</p>
              <p className="text-sm text-slate-600">圖像與 y 軸交於 <InlineMath math="(0,\ c)" /></p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-amber-200 shadow-sm">
            <span className="bg-amber-500 text-white font-black text-base px-2.5 py-0.5 rounded shrink-0 mt-0.5">b</span>
            <div>
              <p className="font-bold text-amber-800">對稱軸</p>
              <p className="text-sm text-slate-600"><InlineMath math="x = -\dfrac{b}{2a}" />（b 獨立無意義，要配合 a）</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
);

export default FunctionGraphNotes;
