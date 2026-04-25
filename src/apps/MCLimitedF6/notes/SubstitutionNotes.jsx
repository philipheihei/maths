import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InlineMath, BlockMath } from '../shared';

const SubstitutionNotes = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
        <ArrowLeft className="w-5 h-5" /> 返回
      </button>

      <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-pink-400 pb-3">
        📘 筆記：MC 代數代入法
      </h1>

      <div className="space-y-8 text-slate-700">
        <section className="bg-pink-50 rounded-xl p-5">
          <h2 className="text-lg font-bold text-pink-800 mb-3">一、甚麼是代入法？</h2>
          <p className="text-sm leading-7 mb-4">
            當 MC 題目要求你判斷「哪個代數式等於題目結果」時，可以先選一組簡單數值代入，
            然後比較各選項，通常比完整推導更快。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm font-semibold">
            <div className="bg-white rounded-lg p-4 border border-pink-200">1. 代入簡單值（如 <InlineMath math="x=2" />）</div>
            <div className="bg-white rounded-lg p-4 border border-pink-200">2. 先算題目結果</div>
            <div className="bg-white rounded-lg p-4 border border-pink-200">3. 逐個代入選項比對</div>
          </div>
        </section>

        <section className="bg-amber-50 rounded-xl p-5">
          <h2 className="text-lg font-bold text-amber-800 mb-3">二、何時可用 / 不可用？</h2>
          <div className="space-y-3 text-sm">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="font-bold text-green-700 mb-1">✅ 可以用</p>
              <p>代數式化簡、展開括號、指數運算、分式運算、雙變數代數式。</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="font-bold text-yellow-700 mb-1">⚠️ 要小心</p>
              <p>有機會兩個選項在第一組數值同時成立，需再代第二組值排除。</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="font-bold text-red-700 mb-1">❌ 不適合</p>
              <p>不等式範圍題、概率題、證明題、需要完整步驟的長題目。</p>
            </div>
          </div>

          <div className="mt-4 bg-white rounded-lg border border-amber-200 p-4 text-sm">
            <p className="font-bold text-amber-800 mb-2">🎯 選值技巧</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>盡量用 <InlineMath math="2, 3" /> 等小整數，避免 <InlineMath math="0,1" /> 引致碰撞。</li>
              <li>兩個未知數時，可用 <InlineMath math="a=2,b=3" /> 這類不同值。</li>
              <li>第一輪未能唯一判斷，立即代第二輪數值。</li>
            </ul>
          </div>
        </section>

        <section className="bg-indigo-50 rounded-xl p-5">
          <h2 className="text-lg font-bold text-indigo-800 mb-3">三、示範 1：分式化簡</h2>
          <div className="bg-white rounded-lg p-4 border border-indigo-200 mb-3">
            <BlockMath math="\\frac{1}{k+2}+\\frac{3}{5k-6}=?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2">
              <div>A. <InlineMath math="\\dfrac{-8k}{(k+2)(5k-6)}" /></div>
              <div>B. <InlineMath math="\\dfrac{-2k}{(k+2)(5k-6)}" /></div>
              <div>C. <InlineMath math="\\dfrac{2k}{(k+2)(5k-6)}" /></div>
              <div>D. <InlineMath math="\\dfrac{8k}{(k+2)(5k-6)}" /></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border-l-4 border-indigo-500 p-4 text-sm space-y-2">
            <p><strong>Step 1：</strong>代 <InlineMath math="k=2" />，分母不為零。</p>
            <p><strong>Step 2：</strong>題目值 <InlineMath math="\\dfrac{1}{4}+\\dfrac{3}{4}=1" />。</p>
            <p><strong>Step 3：</strong>只有 D 代入後為 <InlineMath math="\\dfrac{16}{16}=1" />，故答案 D。</p>
          </div>
        </section>

        <section className="bg-cyan-50 rounded-xl p-5">
          <h2 className="text-lg font-bold text-cyan-800 mb-3">四、示範 2：指數題碰撞處理</h2>
          <div className="bg-white rounded-lg p-4 border border-cyan-200 mb-3">
            <BlockMath math="\\frac{4^{n+1}\\cdot 8^n}{2^{3n+2}}=?" />
            <p className="text-sm">先代 <InlineMath math="n=1" /> 會見到兩個選項同時吻合，必須再代 <InlineMath math="n=2" /> 才能唯一判斷。</p>
          </div>
          <div className="bg-white rounded-lg border-l-4 border-cyan-500 p-4 text-sm space-y-2">
            <p><InlineMath math="n=1" /> 時，題目值為 4，B 與 D 均可。</p>
            <p><InlineMath math="n=2" /> 時，題目值為 16，只剩 B。</p>
            <p className="font-semibold text-cyan-700">結論：有碰撞就要代第二個值。</p>
          </div>
        </section>

        <section className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-3">五、快速總結</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-200 text-slate-800">
                  <th className="text-left p-2">題型</th>
                  <th className="text-center p-2">代入法</th>
                  <th className="text-left p-2">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="p-2">代數式化簡 / 展開</td>
                  <td className="p-2 text-center text-green-700 font-bold">✅</td>
                  <td className="p-2">首選簡單整數代入</td>
                </tr>
                <tr>
                  <td className="p-2">指數 / 對數化簡</td>
                  <td className="p-2 text-center text-green-700 font-bold">✅</td>
                  <td className="p-2">若碰撞需再代第二值</td>
                </tr>
                <tr>
                  <td className="p-2">不等式範圍題</td>
                  <td className="p-2 text-center text-red-700 font-bold">❌</td>
                  <td className="p-2">必須解不等式</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SubstitutionNotes;
