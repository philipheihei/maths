import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InlineMath, BlockMath } from '../shared';

const VariationNotes = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
      <ArrowLeft className="w-5 h-5" /> 返回
    </button>
    <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-amber-400 pb-3">
      📘 筆記：變分常數
    </h1>
    <div className="space-y-8 text-slate-700">
      <section className="bg-amber-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-amber-800 mb-3">一、正變與反變</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-bold text-amber-700 mb-2">正變（正比）</p>
            <BlockMath math="\begin{aligned} y &\propto x \\ y &= kx \end{aligned}" />
            <p className="text-sm">y 隨 x 增大而增大，常數 <InlineMath math="k = \frac{y}{x}" /></p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-bold text-amber-700 mb-2">反變（反比）</p>
            <BlockMath math="\begin{aligned} y &\propto \frac{1}{x} \\ y &= \frac{k}{x} \end{aligned}" />
            <p className="text-sm">y 隨 x 增大而減小，常數 <InlineMath math="k = xy" /></p>
          </div>
        </div>
      </section>

      <section className="bg-orange-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-orange-800 mb-3">二、聯變（Joint Variation）</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <p className="font-semibold text-orange-700 mb-2">一般形式：</p>
          <BlockMath math="z = k \cdot \frac{x^a}{y^b}" />
          <p>（z 隨 <InlineMath math="x^a" /> 正變，隨 <InlineMath math="y^b" /> 反變）</p>
        </div>
        <div className="bg-orange-100 rounded-lg p-4">
          <p className="font-semibold mb-2">求常數 k 的方法：</p>
          <BlockMath math="k = \frac{z \cdot y^b}{x^a}" />
          <p className="text-sm text-orange-700">故 <InlineMath math="\frac{zy^b}{x^a}" /> 必為常數。</p>
        </div>
      </section>

      <section className="bg-green-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-green-800 mb-3">三、常見描述與對應關係</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-green-300 px-3 py-2 text-left">描述</th>
                <th className="border border-green-300 px-3 py-2 text-left">關係式</th>
                <th className="border border-green-300 px-3 py-2 text-left">常數</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['z 隨 x² 正變，y³ 反變', 'z = kx^{2}/y^{3}', 'zy^{3}/x^{2}'],
                ['w 隨 √u 正變，v² 反變', 'w = k\\sqrt{u}/v^{2}', 'w^{2}v^{4}/u （= k²）'],
                ['z 隨 x 反變，y³ 正變', 'z = ky^{3}/x', 'xz/y^{3}'],
                ['z 隨 x 正變，y² 反變', 'z = kx/y^{2}', 'zy^{2}/x'],
              ].map(([desc, formula, constant], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                  <td className="border border-green-300 px-3 py-2">{desc}</td>
                  <td className="border border-green-300 px-3 py-2"><InlineMath math={formula} /></td>
                  <td className="border border-green-300 px-3 py-2 font-semibold text-green-700"><InlineMath math={constant} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-blue-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-blue-800 mb-3">四、特別情況：平方根正變</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
          <p className="font-semibold text-blue-700 mb-1">問題：w 隨 √u 正變，v² 反變</p>
          <BlockMath math="w = \frac{k\sqrt{u}}{v^2}" />
          <p className="text-sm text-blue-700 mb-2">直接常數含 √u，選項通常不出現根號。</p>
          <p className="font-semibold text-blue-700 mb-1">技巧：兩邊平方</p>
          <BlockMath math="\begin{aligned} w^2 &= \frac{k^2 u}{v^4} \\ \frac{w^2 v^4}{u} &= k^2 = \text{常數} \end{aligned}" />
        </div>
        <div className="bg-blue-100 rounded-lg p-3 text-sm">
          <p>⚠️ 注意：<InlineMath math="k^2" /> 也是常數，所以 <InlineMath math="\frac{w^2v^4}{u}" /> 必為常數。</p>
        </div>
      </section>

      <section className="bg-purple-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-800 mb-3">五、答題技巧</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>寫出關係式 <InlineMath math="z = k \cdot \frac{\text{正比因素}}{\text{反比因素}}" /></li>
          <li>移項求 k：常數 = <InlineMath math="z \times \frac{\text{反比因素}}{\text{正比因素}}" /></li>
          <li>若涉及根式，兩邊平方得 <InlineMath math="k^2" />，再構造含 <InlineMath math="k^2" /> 的常數式</li>
          <li>逐項代入選項驗證，看哪個結果恆等於常數</li>
        </ol>
      </section>
    </div>
  </div>
);

export default VariationNotes;
