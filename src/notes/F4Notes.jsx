import React, { useRef } from 'react';
import { Latex, CollapsibleSection, MathDisplay } from './shared';
export { CompoundInequalitiesNotes } from './F4CompoundInequalitiesNotes';

const QuadraticGraphReference = () => (
  <div className="bg-white rounded-lg p-3 border border-green-200 overflow-x-auto">
    <svg viewBox="0 0 900 330" className="w-full min-w-[680px]" role="img" aria-label="二次函數圖像：a 大於零和 a 小於零">
      <defs>
        <marker id="quadratic-axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#64748b" strokeWidth="1.5" />
        </marker>
      </defs>

      <g transform="translate(0 0)">
        <text x="190" y="24" textAnchor="middle" fontSize="20" fontWeight="700" fill="#166534">a &gt; 0</text>
        <line x1="45" y1="190" x2="385" y2="190" stroke="#64748b" strokeWidth="2" markerEnd="url(#quadratic-axis-arrow)" />
        <line x1="170" y1="295" x2="170" y2="42" stroke="#64748b" strokeWidth="2" markerEnd="url(#quadratic-axis-arrow)" />
        <text x="395" y="196" fontSize="16" fill="#475569">x</text>
        <text x="178" y="38" fontSize="16" fill="#475569">y</text>
        <text x="154" y="208" fontSize="15" fill="#475569" fontStyle="italic">O</text>
        <path d="M70 72 C110 150 150 250 200 250 C250 250 290 150 330 72" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
        <line x1="200" y1="48" x2="200" y2="288" stroke="#94a3b8" strokeWidth="2" strokeDasharray="7 7" />
        <circle cx="200" cy="250" r="4" fill="#334155" />
        <line x1="200" y1="250" x2="170" y2="250" stroke="#94a3b8" strokeWidth="2" strokeDasharray="7 7" />
        <text x="155" y="255" fontSize="15" fill="#475569">→</text>
        <text x="80" y="255" fontSize="15" fill="#475569">y 的極小值</text>
        <foreignObject x="210" y="250" width="234" height="52">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#475569', fontSize: '17px', whiteSpace: 'nowrap' }}>
            頂點 <math xmlns="http://www.w3.org/1998/Math/MathML" style={{ fontSize: '17px', verticalAlign: 'middle' }}>
              <mrow>
                <mo>(</mo><mo>−</mo><mfrac><mi>b</mi><mrow><mn>2</mn><mi>a</mi></mrow></mfrac>
                <mo>,</mo><mo>−</mo><mfrac><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow><mrow><mn>4</mn><mi>a</mi></mrow></mfrac><mo>)</mo>
              </mrow>
            </math>
          </div>
        </foreignObject>
        <text x="160" y="240" textAnchor="end" fontSize="15" fill="#475569">(0, c)</text>
        <text x="200" y="322" textAnchor="middle" fontSize="15" fill="#475569">對稱軸</text>
        <text x="320" y="125" fontSize="15" fill="#475569" fontStyle="italic">y = ax² + bx + c</text>
      </g>

      <g transform="translate(450 0)">
        <text x="225" y="24" textAnchor="middle" fontSize="20" fontWeight="700" fill="#b91c1c">a &lt; 0</text>
        <line x1="45" y1="190" x2="385" y2="190" stroke="#64748b" strokeWidth="2" markerEnd="url(#quadratic-axis-arrow)" />
        <line x1="170" y1="295" x2="170" y2="42" stroke="#64748b" strokeWidth="2" markerEnd="url(#quadratic-axis-arrow)" />
        <text x="395" y="196" fontSize="16" fill="#475569">x</text>
        <text x="178" y="38" fontSize="16" fill="#475569">y</text>
        <text x="154" y="208" fontSize="15" fill="#475569" fontStyle="italic">O</text>
        <path d="M65 282 C105 180 150 70 200 70 C250 70 295 180 335 282" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        <line x1="200" y1="48" x2="200" y2="288" stroke="#94a3b8" strokeWidth="2" strokeDasharray="7 7" />
        <circle cx="200" cy="70" r="4" fill="#334155" />
        <line x1="200" y1="70" x2="170" y2="70" stroke="#94a3b8" strokeWidth="2" strokeDasharray="7 7" />
        <text x="155" y="75" fontSize="15" fill="#475569">→</text>
        <text x="80" y="75" fontSize="15" fill="#475569">y 的極大值</text>
        <foreignObject x="210" y="32" width="234" height="52">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#475569', fontSize: '17px', whiteSpace: 'nowrap' }}>
            頂點 <math xmlns="http://www.w3.org/1998/Math/MathML" style={{ fontSize: '17px', verticalAlign: 'middle' }}>
              <mrow>
                <mo>(</mo><mo>−</mo><mfrac><mi>b</mi><mrow><mn>2</mn><mi>a</mi></mrow></mfrac>
                <mo>,</mo><mo>−</mo><mfrac><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow><mrow><mn>4</mn><mi>a</mi></mrow></mfrac><mo>)</mo>
              </mrow>
            </math>
          </div>
        </foreignObject>
        <text x="150" y="100" textAnchor="end" fontSize="15" fill="#475569">(0, c)</text>
        <text x="200" y="315" textAnchor="middle" fontSize="15" fill="#475569">對稱軸</text>
        <text x="280" y="125" fontSize="15" fill="#475569" fontStyle="italic">y = ax² + bx + c</text>
      </g>
    </svg>
  </div>
);

// ========================================
// CH1 二次方程 (F4)
// ========================================
export const QuadraticEquationNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null), s6 = useRef(null), s7 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-red-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH1 二次方程</h1>
        <p className="text-slate-600">掌握解二次方程的多種方法</p>
      </div>

      <CollapsibleSection id="general-form" title="一般式" num={1} color="red" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-3 text-lg">一般式：<Latex math="ax^2 + bx + c = \textcolor{red}{\underline{0}}" />，<Latex math="\textcolor{red}{a > 0}" /></h3>
            <p className="text-green-600 text-sm mb-3"><Latex math="x^2" /> → x → 沒x &nbsp;&nbsp;&nbsp; ↙ 必定=0</p>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-red-600 font-bold mb-2">- 只有 <Latex math="a > 0" /> 才能使用計算機 <span className="px-2 py-1 bg-orange-500 text-white rounded text-xs font-bold">FMLA</span> <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">01</span></p>
              <p className="text-red-600">∴ 需要以一般式去得出 a / b / c 值去作計算</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-slate-800 mb-3">變換為一般式</h3>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-green-700 mb-2">題目：</p>
              <div className="text-blue-700">
                <Latex math="\begin{aligned} −x &= 5 + 2x^2 \\\\[-6px] 0 &= 5 + 2x^2 + x \\\\[-6px] 5 + 2x^2 + x &= 0 \\\\[-6px] 2x^2 + x + 5 &= 0 \end{aligned}" block />
              </div>
              <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-600">
                <p className="font-bold">← 合格的一般式：</p>
                <p>① <Latex math="x^2 \to x \to" /> 沒x順序</p>
                <p>② 右邊=0</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">📱 使用計算機 FMLA 01</h3>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-blue-600 mb-2">例：<Latex math="x^2 + 4x + 3 = 0" /></p>
              <div className="space-y-2">
                <p className="text-green-700"><span className="font-bold">Step 1:</span> 辨認 <Latex math="a,b,c" /> &nbsp;&nbsp; <span className="text-blue-600"><Latex math="a=1,\ b=4,\ c=3" /></span></p>
                <p className="text-green-700"><span className="font-bold">Step 2:</span> 按 <span className="px-2 py-1 bg-orange-500 text-white rounded text-xs font-bold">FMLA</span> <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">01</span></p>
                <div className="ml-4">
                  <div className="calculator-lcd-answer translate-x-16">
                    <span className="calculator-lcd-answer-label">Formula No?</span>
                    <p className="calculator-lcd-number">-01-</p>
                  </div>
                </div>
                <p className="text-green-700"><span className="font-bold">Step 3:</span> 輸入 a, b, c 的數值</p>
                <div className="ml-4 text-sm space-y-1">
                  <div className="flex flex-wrap items-start gap-3">
                    <div className="space-y-1">
                      <div><span className="inline-block w-6 h-6 rounded-full border-2 border-green-600 text-center text-xs leading-5">1</span> 見到 <span className="text-green-700 font-bold">a?</span> 輸入 <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">1</span> <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">EXE</span></div>
                      <div><span className="inline-block w-6 h-6 rounded-full border-2 border-purple-600 text-center text-xs leading-5">2</span> 見到 <span className="text-purple-700 font-bold">b?</span> 輸入 <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">4</span> <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">EXE</span></div>
                      <div><span className="inline-block w-6 h-6 rounded-full border-2 border-blue-600 text-center text-xs leading-5">3</span> 見到 <span className="text-blue-700 font-bold">c?</span> 輸入 <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">3</span> <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">EXE</span></div>
                    </div>
                    <div className="calculator-lcd-answer m-0 -ml-16">
                      <span className="calculator-lcd-answer-label" style={{ top: '22px' }}>a?</span>
                      <p className="calculator-lcd-number">1</p>
                    </div>
                  </div>
                </div>
                <p className="text-green-700"><span className="font-bold">Step 4:</span> 出答案 (2個!)</p>
                <div className="ml-4 space-y-2">
                  <div className="print-quadratic-answer-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-center mb-2 text-base">答案 1</p>
                      <div className="calculator-lcd-answer">
                        <span className="calculator-lcd-answer-label">01:QuadEquation</span>
                        <span className="calculator-lcd-answer-prefix">x=</span>
                        <p className="calculator-lcd-number">-1</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-center mb-2 text-base">答案 2</p>
                      <div className="calculator-lcd-answer">
                        <span className="calculator-lcd-answer-label">01:QuadEquation</span>
                        <span className="calculator-lcd-answer-prefix">x=</span>
                        <p className="calculator-lcd-number">-3</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-green-700 text-sm">按 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> 去第二個 x 的答案</p>
                </div>
                <p className="text-green-700 mt-2">∴ 答案是 <Latex math="-1 / -3" /></p>
                <p className="text-red-600 font-bold">寫： <Latex math="x=-1" /> 或 <Latex math="-3" /></p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="quad-formula" title="二次公式" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3 text-lg">二次公式</h3>
            <div className="text-center my-4">
              <Latex math="x = \frac{−b \pm \sqrt{b^2−4ac}}{2a}" block />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-green-700 mb-2">題目：解 <Latex math="x^2 + 2x = 2" /> <span className="text-red-500">(以根式表示答案)</span></p>
            <div>
              <div className="flex items-start gap-2 mb-2">
                <Latex math="x^2 + 2x − 2 = 0" />
                <span className="text-red-500 text-sm">← 變做一般式，解讀 a/b/c = ?</span>
              </div>
              <p className="text-green-600 mb-2"><Latex math="a=1, \quad b=2, \quad c=−2" /></p>
              <div className="text-blue-700">
                <Latex math="\begin{aligned} x &= \frac{−2 \pm \sqrt{2^2−4(1)(−2)}}{2(1)} \\\\[-6px] &= \frac{−2 \pm \sqrt{12}}{2} \quad \textcolor{red}{\text{← 此步已有分，仍可化簡}} \\\\[-6px] &= \frac{−2}{2} \pm \frac{\sqrt{12}}{2} \\\\[-6px] &= −1 \pm \frac{2\sqrt{3}}{2} \quad \textcolor{red}{\text{（因為 }\sqrt{12}=2\sqrt{3}\text{）}} \\\\[-6px] &= −1 \pm \sqrt{3} \quad \textcolor{red}{\text{← 標準答案}} \end{aligned}" block />
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="font-bold"><span className="text-red-600">二重根</span><span className="text-black"> → 兩個重複的根</span></p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="square-root" title="取平方根法" num={3} color="blue" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 核心概念</h3>
            <p className="text-slate-700 mb-2">- 二次方程最多可以有 2 個根/解 <span className="text-blue-600">(x答案)</span></p>
            <div className="bg-red-50 p-3 rounded my-3">
              <p className="text-black font-bold"><span className="text-black">解決方程的次序：</span><span className="text-red-600">先 + - , 後 × ÷ , 最後拆括號</span></p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-green-700 mb-2">題目：</p>
            <div className="text-blue-700">
              <Latex math="\begin{aligned} 4(5m+3)^2 − 28 &= 0 \\\\[-6px] 4(5m+3)^2 &= 28 && \textcolor{green}{\text{← 處理 + − }}\textcolor{purple}{\text{(−28)}} \\\\[-6px] (5m+3)^2 &= 7 && \textcolor{green}{\text{← 處理 × ÷ }}\textcolor{purple}{\text{(28÷4=7)}} \\\\[-6px] 5m+3 &= \pm\sqrt{7} && \textcolor{green}{\text{← 取平方根法}} \\\\[-6px] 5m &= −3 \pm\sqrt{7} && \textcolor{green}{\text{← 先處理 + −}} \\\\[-6px] m &= \frac{−3 \pm \sqrt{7}}{5} && \textcolor{green}{\text{← 後處理 × ÷}} \end{aligned}" block />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="calculator" title="計算機解未知數" num={4} color="orange" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3">📱 FMLA 01 步驟</h3>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-red-600 font-bold mb-3">FMLA → 01 → a? b? c? → x₁=?, x₂=?</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-blue-600 mb-2"><Latex math="x^2 − 4x + 4 = 0" /></p>
              <p className="text-black" style={{wordSpacing: '20px'}}>1 -4 4</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">原本的話，需二次方程計算</h3>
            <div>
              <div className="text-blue-700">
                <Latex math="\begin{aligned} x &= \frac{−(−4) \pm \sqrt{(−4)^2−4(1)(4)}}{2(1)} && \textcolor{green}{\leftarrow \frac{−b \pm \sqrt{b^2−4ac}}{2a}} \\\\[-6px] &= \frac{4 \pm \sqrt{0}}{2} \\\\[-6px] &= \frac{4}{2} \\\\[-6px] &= 2 \end{aligned}" block />
              </div>
              <p className="text-blue-600 font-bold mt-2">答案： x = 2 (二重根)</p>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-400 p-4 rounded-lg">
            <p className="text-red-600 font-bold text-xl">Maths Error → 沒有實根</p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="applications" title="二次方程應用題" num={5} color="purple" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">⚠️ 注意事項</h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <span className="text-black">- 留意一些限制，答案有機會</span>
                <span className="text-red-600 font-bold"> (捨去)</span>
              </li>
              <li className="ml-4">
                <p className="text-green-600 mb-1">e.g. x {"<"} 0 → 代表 x 不能是正數</p>
              </li>
              <li className="ml-4">
                <p className="text-green-600 mb-1">
                  有一些單位/性質 <span className="text-red-600 font-bold">必定為正數 / 0</span>
                </p>
                <p className="text-blue-600 text-sm">
                  (eg. 長度, 人數, 體積, 身高, 體重, 距離)
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-300 p-4 rounded-lg">
            <h3 className="font-bold text-amber-800 mb-2">💡 解題提示</h3>
            <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
              <li>先列出方程式</li>
              <li>變換為一般式</li>
              <li>用計算機或公式求解</li>
              <li>檢查答案是否合理（考慮限制條件）</li>
              <li>捨去不合理的負數或零值（視情況而定）</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="number-systems" title="數系" num={6} color="teal" activeSub={activeSub} sectionRef={s6}>
        <div className="space-y-4">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
            <h3 className="font-bold text-teal-800 mb-3">1. 數系分類</h3>
            <div className="space-y-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-bold text-slate-800">A. 整數 <span className="text-red-500 font-normal">→ 不是小數的數</span></p>
                <div className="mt-2 text-slate-700">
                  <p>e.g. <span className="text-green-600 font-bold border-b-2 border-green-400"> −3 , -1 </span> , <span className="text-green-600 font-bold border-b-2 border-green-400"> 1 , 3 </span></p>
                  <p className="text-xs text-green-600 mt-1">&nbsp;&nbsp;&nbsp;&nbsp; ↑負整數 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↑正整數</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-bold text-slate-800">B. 有理數 <span className="text-red-500 font-normal">→ 整數的分數 (分子/分母)</span></p>
                <div className="mt-2 text-slate-700 flex flex-wrap items-center gap-4">
                  <p>e.g. <Latex math="3, \frac{1}{3}, 0.8, \sqrt{4}, 0.\dot{3}" /></p>
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">靚數字 / 有規律</span>
                  <div className="calculator-lcd-answer m-0 shrink-0">
                    <span className="calculator-lcd-answer-label">5÷11</span>
                    <p className="calculator-lcd-number">0.454545454</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-bold text-slate-800">C. 無理數 <span className="text-red-500 font-normal">→ 有理數的相反</span></p>
                  <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded"> i 不是無理數</span>
                </div>
                <div className="mt-2 text-slate-700 flex flex-wrap items-center gap-4">
                  <p>e.g. <Latex math="\sqrt{2}, \sin 29^\circ, \pi" /></p>
                  <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded">數字核突 / 無規律</span>
                  <div className="calculator-lcd-answer m-0 shrink-0">
                    <span className="calculator-lcd-answer-label">sin(1)</span>
                    <p className="calculator-lcd-number">0.017452406</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded shadow-sm">
                <p className="font-bold text-slate-800">D. 實數 / 虛數</p>
                <ul className="mt-2 text-slate-700 list-disc list-inside">
                  <li><span className="font-bold">實數：</span>沒有 <Latex math="i" /> 的數，例如 <Latex math="3, -2, \frac{1}{2}, \sqrt{2}" /></li>
                  <li><span className="font-bold text-purple-600">虛數：</span>含有 <Latex math="i" /> 的數，例如 <Latex math="i, 2i, 1+3i" /></li>
                  <li><span className="font-bold text-purple-600">純虛數：</span>只有 <Latex math="i" /> 部分，沒有實數部分，例如 <Latex math="2i, -3i" /></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">2. 正整數/負整數在不等式的應用</h3>
            <p className="text-red-600 font-bold mb-3 bg-red-50 inline-block px-2 py-1 rounded">⚠️ 0 不是正數，也不是負數</p>
            
            <div className="print-number-system-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-slate-700">
              <div className="bg-white p-3 rounded shadow-sm">
                <p>e.g. <Latex math="x < 4" /> 的<span className="font-bold text-blue-600">所有正整數</span>：<br/> <Latex math="1, 2, 3" /></p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p>e.g. <Latex math="x < 4" /> 的<span className="font-bold text-blue-600">最大整數</span>：<br/> <Latex math="3" /></p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p>e.g. <Latex math="x > −3.5" /> 的<span className="font-bold text-blue-600">所有負整數</span>：<br/> <Latex math="−3, −2, −1" /></p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p>e.g. <Latex math="x > −3.5" /> 的<span className="font-bold text-blue-600">最小整數</span>：<br/> <Latex math="−3" /></p>
              </div>
            </div>

            {/* 📐 數線與負數、非負數區間 */}
            <div className="bg-white border-2 border-slate-200 rounded-lg p-4 flex justify-center overflow-x-auto">
              <svg viewBox="0 0 400 120" className="w-full max-w-md mx-auto">
                {/* 負數區與非負數區背景 highlight */}
                <rect x="45" y="70" width="135" height="24" fill="#dcfce7" /> {/* 綠色 highlight for 負數區 (-4..0 前) */}
                <rect x="180" y="70" width="135" height="24" fill="#fef08a" /> {/* 黃色 highlight for 非負數區 (0..4) */}
                
                {/* 軸 */}
                <line x1="30" y1="60" x2="355" y2="60" stroke="#334155" strokeWidth="2" />
                <polyline points="347,54 355,60 347,66" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="372" y="65" fontSize="16" fill="#334155" fontStyle="italic" fontWeight="bold" textAnchor="middle">x</text>
                
                {/* 刻度與數字 */}
                {[ -4, -3, -2, -1, 0, 1, 2, 3, 4 ].map((num, i) => (
                  <g key={num}>
                    <line x1={60 + i * 30} y1="54" x2={60 + i * 30} y2="66" stroke="#334155" strokeWidth="2" />
                    <text x={60 + i * 30} y="87" fontSize="14" fill={num < 0 ? "#16a34a" : "#ca8a04"} fontWeight="bold" textAnchor="middle">{num}</text>
                  </g>
                ))}

                {/* 區域文字標籤 */}
                <text x="112.5" y="113" fontSize="14" fill="#16a34a" fontWeight="bold" textAnchor="middle">負數區</text>
                <text x="247.5" y="113" fontSize="14" fill="#ca8a04" fontWeight="bold" textAnchor="middle">正數區</text>
                
                {/* 虛線分隔 (在 0 的位置, 即 x=180) */}
                <line x1="180" y1="35" x2="180" y2="115" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                {/* x > −3.5 範例箭頭 */}
                <line x1="75" y1="39" x2="75" y2="60" stroke="#3b82f6" strokeWidth="2" /> {/* 連接 -3.5 的向下實線 */}
                <circle cx="75" cy="35" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" /> {/* -3.5 空心圓 */}
                <line x1="79" y1="35" x2="330" y2="35" stroke="#3b82f6" strokeWidth="2" />
                <polyline points="322,29 330,35 322,41" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                
                <text x="75" y="22" fontSize="13" fill="#3b82f6" fontWeight="bold" textAnchor="middle">−3.5</text>
              </svg>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-3">3. 循環小數轉分數（計算機方法）</h3>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-slate-700 mb-2">
                循環小數：小數部分有數字不斷重複。例如 <Latex math="0.\dot{8}=0.888\cdots" />。
              </p>
              <p className="text-red-600 font-bold mb-3">
                ⚠️ 不斷輸入重複的數字，直到 MON 移位。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="calculator-lcd-answer m-0">
                  <span className="calculator-lcd-answer-label">0.888888888888</span>
                  <p className="calculator-lcd-number">
                    <span>8</span><span className="calculator-lcd-fraction-symbol" aria-hidden="true">┘</span><span>9</span>
                  </p>
                </div>
                <span className="text-amber-700 font-bold">打完重複數字後按 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>，再按 <span className="bg-gray-500 text-white text-xs font-mono px-2 py-0.5 rounded">a b/c</span> → 分數</span>
              </div>
            </div>

            <div className="space-y-3 text-slate-700">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="mb-1">e.g. <Latex math="0.1\dot{7}=0.171717\cdots" /></p>
                <p className="text-blue-700 font-bold"><Latex math="0.1\dot{7}=\frac{17}{99}" /></p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="mb-1">e.g. <Latex math="0.\dot{2}3\dot{4}=0.234234\cdots" /></p>
                <p className="text-blue-700 font-bold"><Latex math="0.\dot{2}3\dot{4}=\frac{26}{111}" /></p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="complex-i" title="複數 i" num={7} color="indigo" activeSub={activeSub} sectionRef={s7}>
        <div className="space-y-4">
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="font-bold text-indigo-800 mb-3">i 的定義</h3>
            <div className="bg-white rounded-lg p-4 text-center">
              <Latex math="i = \sqrt{-1}, \qquad i^2 = -1" block />
            </div>
            <p className="text-slate-700 mt-3">因為實數沒有平方後等於 −1 的數，所以引入新的數 <Latex math="i" />。</p>
            <p className="text-red-600 font-bold mt-2">注意：<Latex math="\sqrt{-1}" /> 不是實數，但可以寫成 <Latex math="i" />。</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <h3 className="font-bold text-indigo-800 mb-3">i 的次方循環</h3>
            <div className="print-complex-powers-grid grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-indigo-500 rounded-lg bg-indigo-50 px-2">
                <p className="text-center text-indigo-700 font-bold text-sm mt-2">基本循環（重點）</p>
                <Latex math="\begin{aligned} i^1 &= i \\ i^2 &= -1 \\ i^3 &= i^2 \times i = -i \\ i^4 &= i^2 \times i^2 = 1 \end{aligned}" block />
              </div>
              <Latex math="\begin{aligned} i^5 &= i^4 \times i = i \\ i^6 &= i^4 \times i^2 = -1 \\ i^7 &= i^4 \times i^3 = -i \\ i^8 &= i^4 \times i^4 = 1 \end{aligned}" block />
            </div>
            <p className="text-green-700 font-bold text-center mt-2">之後每 4 個次方重複一次：<Latex math="i, -1, -i, 1" /></p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">複數的形式</h3>
            <p className="text-slate-700 mb-3">複數通常寫成： <Latex math="a + bi" inline /></p>
            <div className="print-complex-forms-grid grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
              <p className="bg-white p-3 rounded"><span className="font-bold text-blue-600">實部：</span><Latex math="a" /></p>
              <p className="bg-white p-3 rounded"><span className="font-bold text-purple-600">虛部：</span><Latex math="b" />（<Latex math="i" /> 的係數）</p>
            </div>
            <div className="mt-3 space-y-1 text-slate-700">
              <p>e.g. <Latex math="5 - 3i" />：實部是 5，虛部是 −3</p>
              <p>e.g. <Latex math="8 + 7i" />：實部是 8，虛部是 7</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">複數運算</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-700 text-center [&>span]:my-0">
              <Latex math="\begin{aligned} &\phantom{=} -4(5-3i) \\ &= -20 + 12i \end{aligned}" block />
              <Latex math="\begin{aligned} &\phantom{=} (2+2i) - (i-1) \\ &= 3 + i \end{aligned}" block />
              <Latex math="\begin{aligned} &\phantom{=} (2+i)(3-i) \\ &= 6 - 2i + 3i - i^2 \\ &= 7+i \end{aligned}" block />
            </div>
            <p className="text-red-600 font-bold mt-0">計算時分開處理實部和虛部，並記得 <Latex math="i^2=-1" />。</p>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-3">二次方程中的複數根</h3>
            <p className="text-slate-700 mb-2">當判別式 <Latex math="\Delta=b^2-4ac<0" /> 時，沒有實根，但可能有複數根。</p>
            <div className="bg-white rounded-lg p-3 text-blue-700">
              <Latex math="x^2+1=0 \quad\Rightarrow\quad x^2=-1 \quad\Rightarrow\quad x=\pm i" block />
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH2 二次方程的根的性質 (F4)
// ========================================
export const NatureOfRootsNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH2 二次方程的根的性質</h1>
        <p className="text-slate-600">透過判別式 <Latex math="\Delta" /> 判斷根的數目與二次圖像關係</p>
      </div>

      <CollapsibleSection id="discriminant" title="判別式與根的數目" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3 text-lg">判別式 <Latex math="\Delta" /> (Delta)</h3>
            <p className="text-slate-700 mb-2">判別式是用來判斷一元二次方程式的根的情況，不用真的解方程就能知道答案的性質。</p>
            <p className="text-slate-700 mb-2">考慮二次方程 <Latex math="ax^2 + bx + c = 0" />，其中 <Latex math="a \neq 0" />：</p>
            <div className="text-center my-4 bg-white p-3 rounded shadow-sm border border-slate-200">
              <span className="text-xl font-bold text-blue-600"><Latex math="\Delta = b^2 − 4ac" /></span>
            </div>
            <div className="grid gap-3">
              <div className="bg-white p-3 rounded flex items-center shadow-sm">
                <span className="min-w-[5.5rem] whitespace-nowrap inline-flex justify-center items-center font-bold text-slate-700 bg-red-100 text-center rounded px-2 py-1 mr-3"><Latex math="\Delta > 0" /></span>
                <span className="text-slate-700">有<span className="font-bold text-red-600">兩個相異</span>實根</span>
              </div>
              <div className="bg-white p-3 rounded flex items-center shadow-sm">
                <span className="min-w-[5.5rem] whitespace-nowrap inline-flex justify-center items-center font-bold text-slate-700 bg-green-100 text-center rounded px-2 py-1 mr-3"><Latex math="\Delta = 0" /></span>
                <span className="text-slate-700">有<span className="font-bold text-green-600">一個二重</span>實根 (兩個相等的實根)</span>
              </div>
              <div className="bg-white p-3 rounded flex items-center shadow-sm">
                <span className="min-w-[5.5rem] whitespace-nowrap inline-flex justify-center items-center font-bold text-slate-700 bg-slate-200 text-center rounded px-2 py-1 mr-3"><Latex math="\Delta < 0" /></span>
                <span className="text-slate-700"><span className="font-bold text-slate-600">沒有</span>實根</span>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 text-sm shadow-sm">
            <p className="text-amber-800 font-bold mb-1">💡 考試常見字眼：</p>
            <p className="text-slate-700 mb-2">判別式條件 → 題目常見字眼（關鍵字）</p>
            <div className="space-y-2 text-slate-700">
              <div className="bg-white rounded border border-amber-200 px-3 py-2">
                <span className="font-bold mr-2"><Latex math="\Delta < 0" /></span>
                <span>沒有實根、不相交</span>
              </div>
              <div className="bg-white rounded border border-amber-200 px-3 py-2">
                <span className="font-bold mr-2"><Latex math="\Delta = 0" /></span>
                <span>二重實根、相等實根、相切於一點、一個 x 截距、等根</span>
              </div>
              <div className="bg-white rounded border border-amber-200 px-3 py-2">
                <span className="font-bold mr-2"><Latex math="\Delta > 0" /></span>
                <span>相異實根、相交於兩點、兩個 x 截距</span>
              </div>
              <div className="bg-white rounded border border-amber-200 px-3 py-2">
                <span className="font-bold mr-2"><Latex math="\Delta \geq 0" /></span>
                <span>有實根</span>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="graph-relations" title="Δ 與圖像 x 截距的關係" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">圖像與 <Latex math="x" /> 軸的關係 (<Latex math="y = ax^2 + bx + c" />)</h3>
            
            <div className="print-quadratic-graph-relations-grid grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
              <div className="bg-white p-3 border border-slate-200 rounded shadow-sm flex flex-col items-center">
                <div className="font-bold text-slate-800 mb-2 bg-red-100 px-3 py-1 rounded-full"><Latex math="\Delta > 0" /></div>
                <svg viewBox="0 0 100 100" className="w-24 h-24 mb-2">
                  <line x1="10" y1="70" x2="90" y2="70" stroke="#333" strokeWidth="2" />
                  <path d="M 20 20 Q 50 150 80 20" fill="none" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="35.6" cy="70" r="3" fill="#333" />
                  <circle cx="64.4" cy="70" r="3" fill="#333" />
                </svg>
                <p>相交於<span className="font-bold text-red-600">兩個</span>點</p>
                <p className="text-xs text-slate-500 mt-1">(2個 x 截距)</p>
              </div>

              <div className="bg-white p-3 border border-slate-200 rounded shadow-sm flex flex-col items-center">
                <div className="font-bold text-slate-800 mb-2 bg-green-100 px-3 py-1 rounded-full"><Latex math="\Delta = 0" /></div>
                <svg viewBox="0 0 100 100" className="w-24 h-24 mb-2">
                  <line x1="10" y1="70" x2="90" y2="70" stroke="#333" strokeWidth="2" />
                  <path d="M 20 20 Q 50 120 80 20" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="50" cy="70" r="3" fill="#333" />
                </svg>
                <p>只<span className="font-bold text-green-600">接觸</span>於一點</p>
                <p className="text-xs text-slate-500 mt-1">(1個 x 截距)</p>
              </div>

              <div className="bg-white p-3 border border-slate-200 rounded shadow-sm flex flex-col items-center">
                <div className="font-bold text-slate-800 mb-2 bg-slate-200 px-3 py-1 rounded-full"><Latex math="\Delta < 0" /></div>
                <svg viewBox="0 0 100 100" className="w-24 h-24 mb-2">
                  <line x1="10" y1="85" x2="90" y2="85" stroke="#333" strokeWidth="2" />
                  <path d="M 20 20 Q 50 120 80 20" fill="none" stroke="#64748b" strokeWidth="2" />
                </svg>
                <p><span className="font-bold text-slate-600">不相交</span></p>
                <p className="text-xs text-slate-500 mt-1">(0個 x 截距)</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="find-unknowns" title="求未知數 (k 取值範圍)" num={3} color="red" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-slate-800 mb-3">考試實戰例題</h3>
            <div className="bg-red-50 p-3 rounded mb-3">
              <p className="text-sm text-green-700 mb-2">題目：</p>
              <p className="text-slate-800 mb-2">若二次方程 <Latex math="16x^2 + kx + 1 = 0" /> 有一個<span className="bg-yellow-200 px-1 rounded">二重實根</span>，求 <Latex math="k" /> 的值。</p>
            </div>
            
            <div className="pl-4 border-l-2 border-slate-300 space-y-2 text-slate-700">
              <p className="text-sm rounded bg-amber-100 text-amber-800 inline-block px-2 py-0.5">解題步驟：</p>
              <p><Latex math="\because" /> 方程有一個二重實根</p>
              <p><Latex math="\therefore \Delta = 0" /></p>
              <div className="my-2 bg-slate-100 p-2 rounded">
                <Latex math="\begin{aligned} (k)^2 − 4(16)(1) &= 0 \\ k^2 − 64 &= 0 \\ k^2 &= 64 \\ k &= 8 \text{ 或 } −8 \end{aligned}" block />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="bg-blue-50 p-3 rounded mb-3">
              <p className="text-sm text-green-700 mb-2">題目：</p>
              <p className="text-slate-800 mb-2">若 <Latex math="y = 3x^2 + 6x − (k + 2)" /> 的圖像與 <Latex math="x" /> 軸並<span className="bg-yellow-200 px-1 rounded">不相交</span>，求 <Latex math="k" /> 的取值範圍。</p>
            </div>
            
            <div className="pl-4 border-l-2 border-slate-300 space-y-2 text-slate-700">
              <p><Latex math="\because" /> 圖像與 <Latex math="x" /> 軸並不相交</p>
              <p><Latex math="\therefore \Delta < 0" /></p>
              <div className="my-2 bg-slate-100 p-2 rounded overflow-x-auto">
                <Latex math="\begin{aligned} 6^2 − 4(3)[−(k+2)] &< 0 \\ 36 + 12(k+2) &< 0 \\ 3 + (k+2) &< 0 &\textcolor{blue}{\leftarrow \text{全式除以12}} \\ k &< −5 \end{aligned}" block />
              </div>
              <p className="text-slate-700 font-bold mt-2"><Latex math="\therefore k" /> 的取值範圍是 <Latex math="k < −5" />。</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="roots-sum-product" title="兩根之和與兩根之積" num={4} color="purple" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">一般式的二次方程與根</h3>
            <p className="text-slate-700 mb-4">若 <Latex math="\alpha" /> 和 <Latex math="\beta" /> 為方程 <Latex math="ax^2 + bx + c = 0" /> 的兩個根，即使不知道實質的值，也可以利用係數求出：</p>
            
            <div className="print-roots-sum-product-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 flex flex-col items-center justify-center">
                <span className="text-slate-600 mb-2 font-bold">兩根之和 (Sum of roots)</span>
                <span className="text-xl text-purple-700 font-bold"><Latex math="\alpha + \beta = −\frac{b}{a}" /></span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 flex flex-col items-center justify-center">
                <span className="text-slate-600 mb-2 font-bold">兩根之積 (Product of roots)</span>
                <span className="text-xl text-purple-700 font-bold"><Latex math="\alpha\beta = \frac{c}{a}" /></span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
              <h4 className="font-bold text-slate-800 mb-2 text-sm border-b pb-1">常見變種</h4>
              <p className="text-slate-700 text-sm mb-2">題目有機會考 <Latex math="(\alpha + \beta)" /> 和 <Latex math="\alpha\beta" /> 以外的變種，可將它們轉換為只包含 <Latex math="(\alpha + \beta)" /> 和 <Latex math="\alpha\beta" /> 的形式：</p>
              <div className="text-center bg-slate-50 p-3 rounded">
                <span className="text-lg font-bold text-blue-800"><Latex math="\alpha^2 + \beta^2 = (\alpha + \beta)^2 − 2\alpha\beta" /></span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 mt-4">
              <h4 className="font-bold text-slate-800 mb-2 text-sm border-b pb-1">長答例題</h4>
              <div className="bg-slate-50 rounded p-3 mb-3 text-slate-800">
                <p>已知二次方程 <Latex math="3x^2 − 5x + 2 = 0" /> 的根為 <Latex math="\alpha" />、<Latex math="\beta" />，求兩根之和及兩根之積。</p>
              </div>
              <div className="bg-blue-50 rounded p-3 overflow-x-auto">
                <Latex math="\begin{aligned}
&a=3,\ b=−5,\ c=2 \\
\alpha+\beta&=−\frac{b}{a}=−\frac{−5}{3}=\frac{5}{3} \\
\alpha\beta&=\frac{c}{a}=\frac{2}{3}
\end{aligned}" block />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 mt-4">
              <h4 className="font-bold text-slate-800 mb-2 text-sm border-b pb-1">MC例題</h4>
              <div className="bg-slate-50 rounded p-3 mb-3 text-slate-800">
                <p>設 <Latex math="k" /> 為常數。若二次方程 <Latex math="x^2 + kx − 3 = 0" /> 的根為 <Latex math="\alpha" /> 及 <Latex math="\beta" />，則 <Latex math="\alpha^2+\beta^2" /> = ?</p>
              </div>
              <div className="bg-white rounded p-3 mb-3 border border-slate-200 text-slate-700 text-sm">
                <p className="mb-1">A. <Latex math="k^2 + 4" /></p>
                <p className="mb-1">B. <Latex math="k^2 + 6" /></p>
                <p className="mb-1">C. <Latex math="k^2 − 4" /></p>
                <p>D. <Latex math="k^2 − 8" /></p>
              </div>
              <div className="bg-emerald-50 rounded p-3 overflow-x-auto">
                <Latex math="\begin{aligned}
&\colorbox{#fef08a}{$\alpha+\beta$}=−\frac{b}{a}=\colorbox{#fef08a}{$−k$},\quad \colorbox{#fbcfe8}{$\alpha\beta$}=\frac{c}{a}=\colorbox{#fbcfe8}{$−3$} \\
&\alpha^2+\beta^2=(\colorbox{#fef08a}{$\alpha+\beta$})^2−2\colorbox{#fbcfe8}{$\alpha\beta$} \\
&\qquad\qquad\ =(\colorbox{#fef08a}{$−k$})^2−2(\colorbox{#fbcfe8}{$−3$}) \\
&\qquad\qquad\ =k^2+6
\end{aligned}" block />
              </div>
              <p className="mt-2 text-slate-700 font-bold">正確選擇：B</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}

// ========================================
// CH4 餘式定理 & 因式定理 (F4)
// ========================================
export const RemainderFactorNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-teal-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH4 續多項式</h1>
        <p className="text-slate-600">掌握餘式定理與因式定理</p>
      </div>

      <CollapsibleSection id="remainder" title="餘式定理" num="1." color="teal" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
            <h3 className="font-bold text-teal-800 mb-3">📝 核心概念</h3>
            <p className="text-slate-700 mb-3">當 <Latex math="f(x)" /> 除以<span className="text-red-600 font-bold">除式</span>，所得的餘數可以用 <Latex math="f(\text{相反數})" /> 求得</p>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm text-slate-600 mb-2">例子：</p>
              <p className="text-slate-700"><Latex math="f(x)" /> 除以 <span className="bg-yellow-200 px-1 rounded"><Latex math="x + 3" /></span>，所得的餘數是 <Latex math="−8" /></p>
              <div className="mt-2 pl-4 border-l-2 border-teal-300">
                <p className="text-sm text-slate-600"><span className="text-green-600 font-bold">3</span> 的相反是 <span className="text-red-600 font-bold">−3</span></p>
                <p className="text-lg mt-1"><Latex math="f(−3) = −8" /> ← <span className="text-sm text-slate-500">填餘數</span></p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-amber-800 text-sm">📌 註：做長答題時，如果題目沒有提及 <Latex math="f(x)" />，需設 <Latex math="f(x)" /></p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-teal-200">
            <h3 className="font-bold text-teal-700 mb-3">Step 1：找相應的 <Latex math="f(x)" /></h3>
            <p className="text-sm text-red-600 font-medium mb-3">Case 1：找相反數</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-200"><th className="text-left py-2 px-3 text-slate-600">除式</th><th className="text-left py-2 px-3 text-slate-600">找</th></tr></thead>
                <tbody>
                  <tr className="border-b border-slate-100"><td className="py-2 px-3">除以 <Latex math="x + 3" /></td><td className="py-2 px-3">→ 找 <Latex math="f(−3)" /></td></tr>
                  <tr className="border-b border-slate-100"><td className="py-2 px-3">除以 <Latex math="x − 4" /></td><td className="py-2 px-3">→ 找 <Latex math="f(4)" /></td></tr>
                  <tr className="border-b border-slate-100"><td className="py-2 px-3">除以 <Latex math="2x + 5" /></td><td className="py-2 px-3">→ 找 <Latex math="f(−\frac{5}{2})" /></td></tr>
                  <tr><td className="py-2 px-3">除以 <Latex math="3x − 7" /></td><td className="py-2 px-3">→ 找 <Latex math="f(\frac{7}{3})" /></td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-sm text-blue-800"><span className="font-bold">💡 技巧（當 <Latex math="ax + b" /> 形式）：</span></p>
              <div className="mt-2 flex items-center gap-2 text-sm"><span>令 <Latex math="ax + b = 0" /></span><span>→</span><span><Latex math="x = −\frac{b}{a}" /></span></div>
              <p className="text-sm text-slate-600 mt-2"><span className="bg-cyan-200 px-1 rounded">前面數字</span>放分母，<span className="bg-pink-200 px-1 rounded">後面數字相反數</span>放分子</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="factor" title="因式定理" num="2." color="orange" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3">📝 核心概念</h3>
            <p className="text-slate-700 mb-2">因式定理 = 餘式定理的<span className="bg-yellow-200 px-1 rounded font-bold">餘數 = 0</span> 版本</p>
            <div className="bg-white rounded-lg p-3 space-y-3">
              <div>
                <p className="text-sm text-slate-600 mb-1">例子 1：</p>
                <p className="text-slate-700"><Latex math="f(x)" /> 可被 <Latex math="x − 2" /> <span className="bg-yellow-200 px-1 rounded font-bold">整除</span></p>
                <p className="text-lg mt-1 pl-4">→ <Latex math="f(2) = 0" /></p>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <p className="text-sm text-slate-600 mb-1">例子 2：</p>
                <p className="text-slate-700">已知 <Latex math="x + 3" /> 是 <Latex math="f(x)" /> 的<span className="bg-yellow-200 px-1 rounded font-bold">因式</span></p>
                <p className="text-lg mt-1 pl-4">→ <Latex math="f(−3) = 0" /></p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-700 mb-3">📋 證明/判斷題型</h3>
            <div className="bg-amber-50 rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-2">例：判斷 <Latex math="x + 4" /> 是否 <Latex math="f(x)" /> 的因式?</p>
              <div className="mt-2 space-y-2">
                <p className="text-slate-700">→ 代數計 <Latex math="f(−4)" /> 是否 <Latex math="= 0" /> ？</p>
                <div className="flex items-center gap-4 text-sm mt-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">= 0 → Yes ✓</span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded">≠ 0 → No ✗</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-orange-50 rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-3">🔑 關鍵字對照</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3">
                <p className="font-bold text-teal-600 mb-2">餘式定理</p>
                <ul className="space-y-1 text-slate-600"><li>• 除以...</li><li>• 餘數為...</li><li>• 餘數相等</li></ul>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="font-bold text-orange-600 mb-2">因式定理</p>
                <ul className="space-y-1 text-slate-600"><li>• 整除</li><li>• ...的因式</li><li>• 可被...除盡</li></ul>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="algebraic-fractions" title="代數分式四則運算" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">DSE 代數分式題目 作答技巧</h3>
            <ol className="list-decimal pl-5 space-y-2 text-slate-700 font-medium">
              <li><span className="font-bold">分母交叉乘分子</span>（分母拍埋，記得加括號）</li>
              <li><span className="font-bold">分子拆括號</span>（分母不用拆）</li>
              <li><span className="font-bold">分子化簡</span></li>
            </ol>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-700 mb-3">例題：四則混算</h3>
            <div className="bg-amber-50 rounded-lg p-3 text-center mb-4 overflow-x-auto">
              <Latex math="\frac{3}{2x-3} + \frac{9}{5-6x}" block />
            </div>

            <h4 className="font-bold text-green-700 mb-2">Step 1：分母交叉乘分子</h4>
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm overflow-x-auto">
              <div className="flex min-w-max items-center gap-4 text-slate-700">
                <span className="text-xl">=</span>
                <Latex math="\frac{3\colorbox{#bbf7d0}{$(5-6x)$}+9\colorbox{#fef08a}{$(2x-3)$}}{\colorbox{#fef08a}{$(2x-3)$}\colorbox{#bbf7d0}{$(5-6x)$}}" block />
                <div className="text-sm text-slate-500 leading-8">
                  <p>← 分母交叉乘分子</p>
                  <p>← 分母拍埋加括號</p>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-green-700 mt-4 mb-2">Step 2：分子拆括號</h4>
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm overflow-x-auto">
              <div className="flex min-w-max items-center gap-4 text-slate-700">
                <span className="text-xl">=</span>
                <Latex math="\frac{15-18x+18x-27}{(2x-3)(5-6x)}" block />
                <div className="text-sm text-slate-500 leading-8">
                  <p>← 分子拆括號</p>
                  <p>← 分母不需拆括號</p>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-green-700 mt-4 mb-2">Step 3：分子化簡</h4>
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm overflow-x-auto">
              <div className="flex min-w-max items-center gap-4 text-slate-700">
                <span className="text-xl">=</span>
                <Latex math="\frac{-12}{(2x-3)(5-6x)}" block />
                <p className="text-sm text-slate-500 whitespace-nowrap">← 分子化簡</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="text-red-700 font-bold">⚠️ 小心：負號和括號</p>
            <p className="text-slate-700 mt-1">分母有代數式時，交叉相乘必須拍埋加括號，拆分子時每一項都要乘入括號內。</p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="division-expression" title="除法算式" num={4} color="green" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">除法算式</h3>
            <p className="text-slate-700 mb-3">若多項式 <Latex math="f(x)" /> 除以多項式 <Latex math="p(x)" />，所得的商式為 <Latex math="Q(x)" />，餘式為 <Latex math="R(x)" />：</p>
            <div className="bg-white rounded-lg p-4 overflow-x-auto">
              <Latex math="\begin{aligned} \text{被除式} &= \text{除式} \times \text{商式} + \text{餘式} \\ f(x) &= p(x) \cdot Q(x) + R(x) \end{aligned}" block />
            </div>
            <p className="text-slate-700 mt-3">其中 <Latex math="R(x)" /> 的次數必須小於 <Latex math="p(x)" /> 的次數。</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-700 mb-3">例 3</h3>
            <p className="text-slate-700 mb-3">設 <Latex math="f(x)" /> 為多項式。當 <Latex math="f(x)" /> 除以 <Latex math="x+2" />，商式是 <Latex math="x^2+3x-1" />，而餘式是 <Latex math="4" />。求多項式 <Latex math="f(x)" />。</p>
            <div className="bg-emerald-50 rounded-lg p-4 overflow-x-auto">
              <p className="text-green-700 font-bold mb-2">解</p>
              <p className="text-slate-600 mb-2">根據除法算式，可得：</p>
              <Latex math="\begin{aligned} f(x) &= (x+2)(x^2+3x-1)+4 \\ &= x(x^2+3x-1)+2(x^2+3x-1)+4 \\ &= x^3+3x^2-x+2x^2+6x-2+4 \\ &= x^3+5x^2+5x+2 \end{aligned}" block />
            </div>
            <p className="text-blue-700 font-bold mt-3">∴ <Latex math="f(x)=x^3+5x^2+5x+2" /></p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH3 函數 f(x) (F4)
// ========================================
export const FunctionNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-indigo-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH3 函數 f(x)</h1>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
        <p className="text-slate-700 font-bold mb-2">要懂得解讀 f(x)：代入法</p>
        <p className="text-slate-700 mb-1"><span className="font-bold">F1：</span>代 x=2 進 <Latex math="x^2+2" /></p>
        <p className="text-slate-700 mb-1"><span className="font-bold">高中：</span><Latex math="f(x) = x^2+2" />，計算 <Latex math="f(2)" /> ← 代 x=2</p>
        <p className="text-sm text-slate-600">e.g. <Latex math="f(x)" />、<Latex math="g(x)" />、<Latex math="h(x)" />... 不同的英文字代表不同的算式</p>
      </div>

      <CollapsibleSection id="basic-sub" title="簡單代數字" num={1} color="indigo" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <p className="text-sm text-green-700 mb-2">題目：<Latex math="f(x) = 5x − 1" />，求 <Latex math="f(2)" /> 和 <Latex math="2f(3)" /></p>
            <div className="bg-white rounded-lg p-3 space-y-2 text-sm">
              <div>
                <span className="text-blue-600 font-bold">答案：</span>
                <Latex math="f(2) = 5(2) − 1 = 9" />
              </div>
              <div className="pl-12">
                <Latex math="2f(3) = 2[5(3) − 1] = 2 \times 14 = 28" />
                <span className="text-slate-500 ml-2">← 2×f(3)</span>
              </div>
              <p className="text-red-500 font-bold mt-1">必須寫在計算什麼</p>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-green-700 mb-2">題目：<Latex math="h(x) = 2x + 1" />，求 <Latex math="[h(3)]^2" /></p>
            <div className="bg-white rounded-lg p-3 text-sm">
              <span className="text-blue-600 font-bold">答案：</span>
              <Latex math="[h(3)]^2 = [2(3)+1]^2 = 7^2 = 49" />
              <p className="text-red-500 mt-2">先計 h(3)，再全式 2 次方</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-green-700 mb-2">題目：<Latex math="f(x) = \frac{2}{x+3}" />，<Latex math="g(x) = x^2 + 3" /></p>
            <div className="bg-white rounded-lg p-3 text-sm">
              <span className="text-blue-600 font-bold">答案：</span>
              <Latex math="f(2) \cdot g(−2) = \left(\frac{2}{2+3}\right) \cdot \left((−2)^2 + 3\right) = \frac{2}{5} \times 7 = \frac{14}{5}" />
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <p className="text-sm text-green-700 mb-2">題目：考慮 <Latex math="H(x) = \frac{x+1}{x}" />，其中 <Latex math="x \neq 0" /></p>
            <p className="text-slate-800 mb-2">(a) 求 <Latex math="H(2)" /> 和 <Latex math="H\!\left(\frac{1}{2}\right)" /> 的值 &nbsp; (b) 求 <Latex math="H\!\left(\frac{1}{2}\right) \div H(2)" /> 的值</p>
            <div className="bg-white rounded-lg p-3 text-sm space-y-2">
              <div className="flex w-full flex-wrap items-center gap-x-8 gap-y-2 text-lg">
                <span className="text-blue-600 font-bold">a. </span>
                <Latex math="H(2) = \frac{2+1}{2} = \frac{3}{2}" />
                <Latex math="H\!\left(\frac{1}{2}\right) = \frac{\frac{1}{2}+1}{\frac{1}{2}} = \frac{1.5}{0.5} = 3" />
              </div>
              <div className="border-t pt-2 flex items-center text-lg">
                <span className="text-blue-600 font-bold">b. </span>
                <span className="ml-8"><Latex math="H\!\left(\frac{1}{2}\right) \div H(2) = 3 \div \frac{3}{2} = 2" /></span>
              </div>
              <p className="text-green-600 text-xs mt-1">→ <span className="bg-yellow-200 px-1 rounded">分別代入之前成果</span></p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="find-unknown" title="用 f(x) 找未知數" num={2} color="purple" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm font-bold text-slate-700 mb-2">16. 考慮 <Latex math="g(x) = 2x^2 + ax" /> 其中 a 是一個常數，且 <Latex math="g(−1) = 1" /></p>
            <p className="text-slate-800 mb-3">(a) 求 <Latex math="a" /> 的值 &nbsp; (b) 若 <Latex math="g(t) = 6" />，求 <Latex math="t" /> 的值</p>

            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-blue-600 font-bold text-sm mb-2">答案：</p>
              <p className="text-blue-600 font-bold text-sm mb-2">a. 代 x = -1：</p>
              <div className="text-sm space-y-1 ml-4">
                <div className="grid grid-cols-[8rem_auto_auto_1fr] items-center gap-x-2">
                  <span className="justify-self-end"><Latex math="2(−1)^2 + a(−1)" /></span>
                  <Latex math="=" />
                  <Latex math="1" />
                  <span className="text-red-500 whitespace-nowrap">← 利用方程計算 a 值</span>
                </div>
                <div className="grid grid-cols-[8rem_auto_auto_1fr] items-center gap-x-2">
                  <span className="justify-self-end"><Latex math="2 − a" /></span>
                  <Latex math="=" />
                  <Latex math="1" />
                </div>
                <div className="grid grid-cols-[8rem_auto_auto_1fr] items-center gap-x-2">
                  <span className="justify-self-end"><Latex math="a" /></span>
                  <Latex math="=" />
                  <Latex math="1" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <p className="text-blue-600 font-bold text-sm mb-2">答案：</p>
              <p className="text-blue-600 font-bold text-sm mb-2">b. <Latex math="g(x) = 2x^2 + (1)x" /></p>
              <div className="text-sm space-y-1 ml-4">
                <div className="flex items-start gap-2">
                  <Latex math="g(t) = 2t^2 + t" />
                  <span className="text-red-500">← 按 x 位置代 t</span>
                </div>
                <div className="flex items-start gap-2">
                  <Latex math="\therefore g(t) = 6 \rightarrow 6 = 2t^2 + t" />
                  <span className="text-red-500">← 2次方程需用 FMLA 01</span>
                </div>
                <div className="flex items-start gap-2">
                  <Latex math="0 = 2t^2 + t − 6" />
                  <span className="text-red-500">← 先轉一般式，才 FMLA 01</span>
                </div>
                <p className="mt-2 text-slate-700"><span className="font-bold">∴ t = 1.5 或 -2</span></p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="quadratic-graph" title="二次函數圖像" num={3} color="green" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <QuadraticGraphReference />
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">📝 一般式：<Latex math="y = ax^2 + bx + c" /></h3>
            <p className="text-green-700 font-bold mb-3"><Latex math="a" />：開口方向</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 text-center border border-green-200 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16 mb-2">
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#94a3b8" strokeWidth="2" />
                  <polyline points="86,46 90,50 86,54" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="#94a3b8" strokeWidth="2" />
                  <polyline points="46,14 50,10 54,14" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 20 20 Q 50 100 80 20" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <p className="font-bold text-green-700"><Latex math="a > 0" /></p>
                <p className="text-sm text-slate-600">開口<span className="text-green-600 font-bold">向上</span>（+ve）</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-red-200 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16 mb-2">
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#94a3b8" strokeWidth="2" />
                  <polyline points="86,46 90,50 86,54" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="#94a3b8" strokeWidth="2" />
                  <polyline points="46,14 50,10 54,14" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 20 80 Q 50 0 80 80" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <p className="font-bold text-red-700"><Latex math="a < 0" /></p>
                <p className="text-sm text-slate-600">開口<span className="text-red-600 font-bold">向下</span>（-ve）</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3"><Latex math="c" />：<Latex math="y" /> 截距</h3>
            <p className="text-sm text-slate-600 mb-2">（方程掂 y 軸的位置）</p>
            <div className="space-y-2 text-sm">
              <p>在 x 軸之<span className="text-red-600 font-bold">下</span> → <Latex math="c < 0" /></p>
              <p>在 x 軸之<span className="text-green-600 font-bold">上</span> → <Latex math="c > 0" /></p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">📌 例子</h3>
            <div className="bg-white rounded-lg p-3 text-sm">
              <Latex math="y = −5x^2 + 6x + 3" block />
              <div className="flex gap-6 mt-2">
                <span><span className="text-red-600 font-bold"><Latex math="a=-5" /></span> → 開口向下 ∩</span>
                <span><span className="text-green-600 font-bold"><Latex math="c=3" /></span> → <Latex math="y" />截距 <Latex math="=3" /></span>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="coordinates" title="提供坐標" num={4} color="blue" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 核心概念</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>提供坐標 ⇒ 代 <Latex math="(x, y)" /> 進方程找未知數</p>
              <p>⇒ check 哪一條方程對應相交坐標</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-green-700 mb-2">例：坐標 <Latex math="(4, 0)" /> → <span className="text-red-500">代 <Latex math="x=4,\ y=0" /></span></p>
            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="font-bold text-green-700 mb-1">穿過 ✓</p>
                <p>左方 = 右方</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <p className="font-bold text-red-700 mb-1">不穿過 ✗</p>
                <p>左方 ≠ 右方</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH5 直線方程 (F4)
// ========================================
export const StraightLineEquationNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH5 直線方程</h1>
        <p className="text-slate-600">掌握點斜式、斜截式、直線一般式及交點計算</p>
      </div>

      <CollapsibleSection id="find-equation" title="求直線方程的方法" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">1.1 點斜式 <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded ml-2">最常用</span></h3>
            <div className="bg-white rounded-lg p-3 text-center my-3 shadow-sm border border-blue-100">
              <span className="text-xl font-bold text-blue-700"><Latex math="y − y_1 = m(x − x_1)" /></span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-slate-700"><span className="font-bold text-purple-700">需得知資訊：</span>一點坐標 + 斜率 <Latex math="m" /></p>
              <div className="bg-white p-2 rounded text-sm text-blue-800">
                <span className="font-bold">例：</span>題目提供一點坐標 (3, 7)，斜率為 2，直接代入：
                <div className="mt-1 text-center text-base">
                  <Latex math="y - 7 = 2(x - 3)" block />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">1.2 斜截式 <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded ml-2">較常用</span></h3>
            <div className="bg-white rounded-lg p-3 text-center my-3 shadow-sm border border-green-100">
              <span className="text-xl font-bold text-green-700"><Latex math="y = mx + c" /></span>
              <p className="text-xs text-slate-500 mt-2">m = 斜率，c = y截距</p>
            </div>
            <p className="text-slate-700"><span className="font-bold text-purple-700">需得知資訊：</span>y截距 + 斜率</p>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 提示</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 如沒有斜率，需用提供<span className="font-bold">兩點</span>找斜率</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="general-form-line" title="直線一般式" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1 bg-white border border-green-200 rounded px-3 py-2 mb-3">
              <h3 className="font-bold text-green-800">直線一般式：</h3>
              <Latex math="Ax + By + C = 0" />
            </div>
            <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-1 bg-yellow-100 border border-yellow-300 rounded px-3 py-2 mb-3 text-red-600 font-bold">
              <span className="text-slate-800">* 可用來找：</span>
              <span className="text-lg">斜率 <Latex math="= −\frac{A}{B}" /></span>
            </div>
            <p className="text-slate-700 text-sm">亦可透過代 <span className="bg-pink-200 px-1 rounded text-pink-800"><Latex math="x = 0" /></span> / <span className="bg-green-200 px-1 rounded text-green-800"><Latex math="y = 0" /></span> 找 <span className="bg-pink-200 px-1 rounded text-pink-800">y截距</span> / <span className="bg-green-200 px-1 rounded text-green-800">x截距</span></p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-600 mb-2">例子： <Latex math="−2x + 4y − 1 = 0" /></p>
            <div className="bg-yellow-50 border-4 border-yellow-300 rounded p-3 text-center mb-4">
              <span className="font-bold text-blue-700">斜率 <Latex math="= −\frac{A}{B} = −\left(\frac{−2}{4}\right)" /> <Latex math="= \frac{1}{2}" /></span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm mt-3">
              <div className="border-4 border-green-400 bg-green-50 rounded-lg p-3">
                <p className="font-bold text-green-700 mb-2">代 <Latex math="y = 0" /> 找 x 截距 →</p>
                <div className="text-slate-700 text-center">
                  <Latex math="\begin{aligned} −2x + 4(0) − 1 &= 0 \\ −2x − 1 &= 0 \\ x &= −\frac{1}{2} \end{aligned}" block />
                </div>
                <p className="font-bold text-blue-700 mt-2 text-center">x截距：<Latex math="−\frac{1}{2}" /></p>
              </div>

              <div className="border-4 border-pink-300 bg-pink-50 rounded-lg p-3">
                <p className="font-bold text-green-700 mb-2">代 <Latex math="x = 0" /> 找 y 截距：</p>
                <div className="text-slate-700 text-center">
                  <Latex math="\begin{aligned} −2(0) + 4y − 1 &= 0 \\ 4y − 1 &= 0 \\ y &= \frac{1}{4} \end{aligned}" block />
                </div>
                <p className="font-bold text-blue-700 mt-2 text-center">y截距：<Latex math="\frac{1}{4}" /></p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="intersection-lines" title="兩直線的交點" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">利用計數機找交點</h3>
            <p className="text-slate-700 mb-3">兩直線的交點，可透過 <span className="bg-orange-500 text-white px-2 py-0.5 rounded font-mono text-xs">Prog</span> <span className="bg-gray-900 text-white px-2 py-0.5 rounded font-mono text-xs">1</span> 找（或需移至Prog1 樣式）</p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-4 mb-4">
              <div className="text-sm flex flex-col sm:flex-row items-center gap-4">
                <div>
                  <p><Latex math="L_1 : x + 2y − 5 = 0" /></p>
                  <p><Latex math="L_2 : x − y + 1 = 0" /></p>
                </div>
                <span className="font-bold text-xl">→</span>
                <div>
                  <Latex math="\begin{cases} x + 2y = 5 \\ x − y = −1 \end{cases}" />
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-sm text-slate-700 mt-3 flex items-start gap-2">
              <span className="font-bold text-red-600">⚠️</span>
              <div>
                <p>如 <span className="bg-orange-500 text-white px-1 py-0.5 rounded font-mono text-[10px]">Prog</span> <span className="bg-gray-900 text-white px-1 py-0.5 rounded font-mono text-[10px]">1</span> 出 <span className="text-red-600 font-bold">Maths Error</span>，</p>
                <p>則<span className="font-bold">沒有交點</span> / <span className="font-bold">無限交點</span>（看 <span className="text-green-700 font-bold">y截距</span> 是否一樣）</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH6-7 指數函數與對數函數 (log) (F4)
// ========================================
export const LogFunctionNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-purple-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH6-7 指數函數與對數函數 (log)</h1>
        <p className="text-slate-600">掌握指數與對數的轉換及運算法則</p>
      </div>

      <CollapsibleSection id="simplify-indices" title="簡化指數算式" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">（初中只限整數次方 ／ 高中包括分數次方）</h3>
            <div className="grid md:grid-cols-2 gap-3 items-start">
              <div className="bg-white p-4 rounded-lg flex items-center gap-6 w-fit mx-auto md:mx-0 shadow-sm border border-slate-100">
                <div className="flex flex-col gap-3">
                  <Latex math="\sqrt[3]{x^4}" />
                  <Latex math="\sqrt{x}" />
                </div>
                <div className="flex flex-col gap-3 items-center">
                  <span className="font-bold text-slate-400">→</span>
                  <span className="font-bold text-slate-400">→</span>
                </div>
                <div className="flex flex-col gap-3">
                  <Latex math="x^{\frac{4}{3}}" />
                  <Latex math="x^{\frac{1}{2}}" />
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg flex items-center gap-3 flex-wrap">
                <Latex math="\sqrt[5]{a^2 b^2}" />
                <span className="font-bold text-blue-500">→</span>
                <Latex math="(a^2 b^2)^{\frac{1}{5}}" />
                <span className="font-bold text-blue-500">→</span>
                <Latex math="a^{\frac{2}{5}} b^{\frac{2}{5}}" />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="log-definition" title="log 的定義與對數性質" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">📝 log 的定義</h3>
            <div className="bg-white p-4 rounded-lg flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="text-red-600 font-bold"><Latex math="\because 10^2 = 100" /></span>
                <span className="text-green-700 font-bold">← 指數形式（會考轉換）</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-700 font-bold"><Latex math="\therefore \log_{10} 100 = 2" /></span>
                <span className="text-green-700 font-bold">← 對數形式</span>
              </div>
            </div>
            
            <p className="text-blue-700 font-bold mt-3">💡 常用對數，set做例子幫你想其他題</p>
            <p className="text-blue-700 font-bold mt-1">應記住： <Latex math="\log 10 = 1" /> ， <Latex math="\log 100 = 2" /> ， <Latex math="\log 1000 = 3" /></p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="font-bold text-indigo-800 mb-3">📝 對數的性質</h3>
            <ul className="space-y-3 text-slate-700 list-decimal list-inside">
              <li><Latex math="\log_a 1 = 0 \quad \Rightarrow a^0 = 1" /></li>
              <li><Latex math="\log_a a = 1 \quad \Rightarrow \text{e.g. } \log_3 3 = 1" /></li>
              <li>
                <Latex math="\log_a MN = \log_a M + \log_a N" />
                <span className="text-red-500 font-bold ml-2">（乘數 → + ，合併/分拆 log）</span>
              </li>
              <li>
                <Latex math="\log_a \frac{M}{N} = \log_a M − \log_a N" />
                <span className="text-red-500 font-bold ml-2">（除數 → - ）</span>
              </li>
              <li>
                <Latex math="\log_a M^k = k \log_a M" />
                <span className="text-slate-500 ml-2">e.g. <Latex math="\log 10^3 \rightarrow 3\log 10" /></span>
              </li>
              <li>
                <div className="inline-flex items-center gap-2">
                  <Latex math="\log_a M = \frac{\log_b M}{\log_b a}" />
                  <span className="text-green-700 font-bold">換底公式</span>
                  <span className="text-slate-500">→ e.g. <Latex math="\log_{16} 5 \rightarrow \frac{\log_{10} 5}{\log_{10} 16}" /></span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">例子：化簡</p>
            <MathDisplay latex={String.raw`
\begin{aligned}
\frac{\log \sqrt{x^5}}{\log \sqrt{x} + \log x} &= \frac{\log(x^5)^{\frac{1}{2}}}{\log x^{\frac{1}{2}} + \log x} \\
&= \frac{\frac{5}{2} \log x}{\log \left( x^{\frac{1}{2}} \cdot x^1 \right)} \\
&= \frac{\frac{5}{2} \log x}{\log x^{\frac{3}{2}}} \\
&= \frac{\frac{5}{2} \log x}{\frac{3}{2} \log x} \quad \leftarrow \frac{5}{2} \div \frac{3}{2} \\
&= \frac{5}{3}
\end{aligned}
            `} />
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">例子：已知 <Latex math="\log 2 = a" />, <Latex math="\log 3 = b" />，以 <Latex math="a" /> 和 <Latex math="b" /> 表達 <Latex math="\log 150" />。</p>
            <p className="text-sm text-red-600 font-bold mb-2">（關鍵：如何將 150 以 2, 3, 10 表示）</p>
            <MathDisplay latex={String.raw`
\begin{aligned}
\log 150 &= \log (15 \times 10) \quad \leftarrow (\neq \log 15 \times 10) \\
&= \log (3 \times 5 \times 10) \\
&= \log \left(3 \times \frac{10}{2} \times 10 \right) \quad \leftarrow \text{2, 3, 10 的組合} \\
&= \log 3 + \log 10 − \log 2 + \log 10 \quad \leftarrow \text{分拆 log} \\
&= b + 1 − a + 1 \\
&= 2 + b − a
\end{aligned}
            `} />
            <p className="text-sm text-red-600 font-bold mt-2">提示：</p>
            <ul className="text-sm text-red-600">
              <li><Latex math="5 \rightarrow \frac{10}{2}" /></li>
              <li><Latex math="50 \rightarrow \frac{100}{2}" /></li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="log-equations" title="指數方程與對數方程" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="font-bold text-red-800 mb-2">🎈 指數相等</h3>
              <p className="text-slate-700 mb-2"><Latex math="\textcolor{red}{a}^{\textcolor{blue}{x}} = 3^{\textcolor{blue}{x}} \rightarrow \textcolor{red}{a} = 3" /></p>
              <p className="text-sm text-slate-500">e.g. <Latex math="2^5 = a^5 \rightarrow 2 = a" /></p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-2">🎈 底數字相等</h3>
              <p className="text-slate-700 mb-2"><Latex math="\textcolor{purple}{2}^{\textcolor{red}{5}} = \textcolor{purple}{2}^{\textcolor{red}{y}} \rightarrow 5 = \textcolor{red}{y}" /></p>
              <p className="text-sm text-slate-500">e.g. <Latex math="2^x = 64 \rightarrow 2^x = 2^6 \rightarrow x = 6" /></p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">💡 如看見方程的未知數 (x) 在指數部份，需兩邊加 log！</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg">
                <MathDisplay latex={String.raw`
\begin{aligned}
2^x &= 30 \quad \leftarrow \text{(準確至 3 位有效數字)} \\
\log(2^x) &= \log 30 \quad \leftarrow \text{要加括號} \\
x \log 2 &= \log 30 \\
x &= \frac{\log 30}{\log 2} \\
x &= 4.91
\end{aligned}
                `} />
              </div>
              <div className="bg-white p-3 rounded-lg">
                <MathDisplay latex={String.raw`
\begin{aligned}
8^x &= 50 \quad \leftarrow \log(8^x) = \log 50 \\
x \log 8 &= \log 50 \\
x &= \frac{\log 50}{\log 8} \quad \leftarrow \text{計算機出 ANS} \\
x &= 1.88
\end{aligned}
                `} />
              </div>
            </div>
            <div className="bg-slate-100 p-3 mt-3 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">例：(右邊為多項式也一樣)</p>
              <Latex math="2^x = 30 + y" /> <br />
              <Latex math="\log (2^x) = \log(30 + y)" /> <span className="text-red-600 text-sm font-bold">← 要加括號</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">💡 如原本有 log，需想辦法刪除 log 部份</h3>
            <div className="bg-white p-4 rounded-lg mb-3">
              <p className="text-sm text-slate-600 mb-2">e.g. 13.</p>
              <MathDisplay latex={String.raw`
\begin{aligned}
\log (x − 1) &= −1 \quad \leftarrow \text{1, 2, 3 可轉化成為 } \log (\text{對數}) \\
\log (x − 1) &= −\log 10 \quad ( \text{或 } \log \frac{1}{10} ) \\
\log (x − 1) &= \log 10^{−1} \\
x − 1 &= 10^{−1} \\
x − 1 &= \frac{1}{10} \\
x &= \frac{11}{10}
\end{aligned}
              `} />
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-slate-600 mb-2">e.g. 25.</p>
              <MathDisplay latex={String.raw`
\begin{aligned}
\log (4x − 1) &= \log 5(2x + 1) − 1 \\
\log (4x − 1) &= \log 5(2x + 1) − \log 10 \\
\log (4x − 1) &= \log \left[ \frac{5(2x + 1)}{10} \right] \\
\log (4x − 1) &= \log \left( \frac{2x + 1}{2} \right) \\
4x − 1 &= \frac{2x + 1}{2} \\
8x − 2 &= 2x + 1 \\
6x &= 3 \\
x &= 0.5
\end{aligned}
              `} />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="log-applications" title="應用題" num={4} color="amber" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">常見應用題型</h3>
            <div className="flex items-center gap-3">
              <ul className="text-slate-700 list-none space-y-1 font-bold">
                <li>- 黎克特制地震</li>
                <li>- 聲音的強度</li>
              </ul>
              <span className="inline-block text-red-600 font-bold text-5xl leading-none scale-y-125">{"}"}</span>
              <span className="text-red-600 font-bold text-xl">不用記公式，題目會提供</span>
            </div>
            <div className="text-slate-700 font-bold mt-1">- 其他</div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};
