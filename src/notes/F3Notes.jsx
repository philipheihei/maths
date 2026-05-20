import React, { useRef } from 'react';
import { Latex, CollapsibleSection } from './shared';
import { CoordinateGeometryFormulaTable } from '../components/CoordinateGeometryFormulaTable';

// ========================================
// 因式分解 (F3)
// ========================================
export const FactorizationNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-purple-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">因式分解</h1>
        <p className="text-slate-600">掌握三大因式分解技巧：提取公因式、併項法、二次多項式</p>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <p className="text-red-700 font-bold text-center text-lg">📌 答案一定有括號！</p>
      </div>

      <CollapsibleSection id="extract-common" title="提取公因式(重溫)" num={1} color="purple" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">📝 分析題目</h3>
            <p className="text-slate-700 mb-2">若所有項都出現相同代數/因數時可<span className="text-red-600 font-bold">抽取</span></p>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm text-slate-600 mb-2">例子 1：找出相同代數 及 公因數，然後抽出來寫前面，後面加括號裝剩下的代數/因數。</p>
              <div className="flex items-center gap-2 flex-wrap text-lg">
                <span><span className="bg-yellow-200 px-1 rounded">-</span><span className="bg-green-200 px-1 rounded">6</span>u<span className="bg-yellow-200 px-1 rounded">v</span> <span className="bg-yellow-200 px-1 rounded">-</span><span className="bg-green-200 px-1 rounded">8</span><span className="bg-yellow-200 px-1 rounded">v</span>w</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-lg mt-1">
                <span className="text-slate-500">=</span>
                <span><span className="bg-yellow-200 px-1 rounded">-</span><span className="bg-green-200 px-1 rounded">2</span><span className="bg-yellow-200 px-1 rounded">v</span>(<span className="bg-green-200 px-1 rounded">3</span>u+<span className="bg-green-200 px-1 rounded">4</span>w)</span>
              </div>
              <div className="mt-3 text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-200 px-2 py-0.5 rounded">黃</span><span>= 完全相同的代數</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-200 px-2 py-0.5 rounded">綠</span>
                  <span>= 可抽公因數（6和8是什麼的倍數？）</span>
                  <span className="text-slate-500">6÷<span className="text-red-600 font-bold">2</span>=3，8÷<span className="text-red-600 font-bold">2</span>=4</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-2">例子 2：遇上相同代數但不同次方，只抽最低次方</p>
              <div className="flex items-center gap-2 flex-wrap text-lg">
                <span><span className="bg-pink-200 px-1 rounded"><Latex math="m^3" /></span><span className="bg-cyan-200 px-1 rounded">n</span> - 3<span className="bg-pink-200 px-1 rounded">m</span><span className="bg-cyan-200 px-1 rounded"><Latex math="n^2" /></span></span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-lg mt-1">
                <span className="text-slate-500">=</span>
                <span>mn(<span className="bg-pink-200 px-1 rounded"><Latex math="m^2" /></span> - 3<span className="bg-cyan-200 px-1 rounded">n</span>)</span>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                <span className="text-pink-600">⤷</span> 抽走了一個 m，m³ 變為 <span className="bg-pink-200 px-1 rounded">m²</span>，原本的m則會消失。
              </div>
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 技巧</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 先找<span className="text-red-600 font-bold">數字</span>的公因數</li>
              <li>• 再找<span className="text-blue-600 font-bold">代數</span>的公因式（取最低次方）</li>
              <li>• 記住：<Latex math="a^3 \div a = a^2" />（次方相減）</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="grouping" title="併項法（重溫）" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 方法步驟</h3>
            <ol className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
              <li>將四項分成兩組（通常首兩項一組、後兩項一組）</li>
              <li>分別對每組提取公因式</li>
              <li>若兩組出現相同括號，再提取該括號</li>
            </ol>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子 1：標準四項</p>
            <Latex math="\begin{aligned} bm + bn + 5m + 5n &= b(m+n) + 5(m+n) \\ &= (m+n)(b+5) \end{aligned}" block />
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子 2：已有括號</p>
            <Latex math="\begin{aligned} &(2x-5) - (2x-5)y \\ &= (2x-5)(1-y) \end{aligned}" block />
            <p className="text-sm text-slate-500 mt-2">💡 抽相同括號放前，剩餘部分放後括號</p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="quadratic" title="二次多項式（十字相乘法 / FMLA 01）" num={3} color="green" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">🖩 計算機 FMLA 01 方法</h3>
            <p className="text-sm text-slate-700 mb-3">如沒相同代數/因數，出動 <span className="bg-green-200 px-2 py-0.5 rounded font-sans">FMLA 01</span>（二次方）</p>
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm font-bold text-slate-700 mb-2">步驟：</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">1</span><span>開啟 FMLA 01（按 FMLA 輸入 01）</span></div>
                <div className="flex items-center gap-2"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">2</span><span>輸入 a, b, c（如 <Latex math="8x^2 - 17x + 21" />：輸入 8, -17, 21）</span></div>
                <div className="flex items-center gap-2"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">3</span><span>按 EXE 得出兩個答案</span></div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-base font-bold text-slate-700 mb-3">例子：<Latex math="8x^2 - 17x - 21" /></p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-bold text-center mb-2 text-base">答案 1（整數）</p>
                  <p className="text-center text-3xl font-sans mb-2">3</p>
                  <p className="text-center text-sm text-slate-600 mt-2">→ 相反數：-3</p>
                  <p className="text-center text-sm text-slate-600">→ 括號：<Latex math="(x-3)" /></p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-bold text-center mb-2 text-base">答案 2（分數）</p>
                  <p className="text-center text-3xl font-sans mb-2">-0.875</p>
                  <p className="text-center text-sm text-slate-600 mt-2">= <Latex math="-\frac{7}{8}" /></p>
                  <p className="text-center text-sm text-slate-600">分母放前，分子相反數放後</p>
                  <p className="text-center text-sm text-slate-600">→ 括號：<Latex math="(8x+7)" /></p>
                </div>
              </div>
              <p className="text-center mt-4 font-bold text-green-700 text-base">∴ 答案 <Latex math="= (x-3)(8x+7)" /></p>
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-3">⚠️ 次序調動</h3>
            <p className="text-sm text-slate-700 mb-2">十字相乘法 / FMLA 01 需以 <Latex math="ax^2 + bx + c" /> 形式才能計算正確</p>
            <div className="bg-white rounded-lg p-3 mb-2">
              <p className="text-sm text-slate-600 mb-1">例子 1：調動次序</p>
              <Latex math="\begin{aligned} &50 - 15m + m^2 \\ &= m^2 - 15m + 50 \end{aligned}" block />
              <p className="text-xs text-slate-500">以 2次方/1次方/0次方(沒代數) 順序作調動</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-1">例子 2：<Latex math="a^2" /> 係數需是正數</p>
              <Latex math="\begin{aligned} &36 + 5a - a^2 \\ &= -a^2 + 5a + 36 \\ &= -(a^2 - 5a - 36) \\ &= -(a-9)(a+4) \end{aligned}" block />
              <p className="text-xs text-red-500 mt-2">⚠️ 若沒有抽負，因式分解答案會錯！</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📐 二元二次多項式</h3>
            <p className="text-sm text-slate-700 mb-2">形式：<Latex math="ax^2 + bxy + cy^2" /></p>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-2">💡 方法：先當只有前面的代數 x 用FMLA01去組成括號，最後再在每個括號後補上後面的代數 y</p>
              <p className="text-sm text-slate-600 mb-1">例子：</p>
              <Latex math="\begin{aligned} &6r^2 - 13rs - 28s^2 \\ &= (2r-7s)(3r+4s) \end{aligned}" block />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="dse-tips" title="DSE 題型技巧" num={4} color="red" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-3">📋 利用前題答案</h3>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-3">DSE 常見：(a) 和 (b) 有關聯</p>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex items-start gap-2"><span className="font-bold text-slate-700">(a)</span><span>因式分解 <span className="bg-yellow-200 px-1 rounded"><Latex math="6r^2 - 13rs - 28s^2" /></span></span></div>
                <div className="flex items-start gap-2"><span className="font-bold text-slate-700">(b)</span><span>因式分解 <Latex math="4r - 14s +" /> <span className="bg-yellow-200 px-1 rounded"><Latex math="6r^2 - 13rs - 28s^2" /></span></span></div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-3">
                <p className="text-sm font-bold text-green-700 mb-1">📝 (a) 部答案：</p>
                <Latex math="(2r-7s)(3r+4s)" block />
              </div>
              <div className="bg-yellow-50 p-2 rounded">
                <p className="text-slate-700 text-sm">➜ 找 (a) 題目部分（黃色 highlight），套用 (a) 部答案：</p>
                <Latex math="\begin{aligned} &= 4r - 14s + (2r-7s)(3r+4s) \\ &= 2(2r-7s) + (2r-7s)(3r+4s) \\ &= (2r-7s)(2 + 3r + 4s) \end{aligned}" block />
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3">❓ 問特定因式（MC 限定）</h3>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-2">例：下列何者是 <Latex math="4x^2 + 2x - 12" /> 的因式？</p>
              <div className="ml-4 text-sm space-y-1"><p>I. 2</p><p>II. 2x - 3</p><p>III. x - 2</p></div>
              <div className="bg-blue-50 p-2 rounded mt-3">
                <p className="text-sm"><span className="font-bold">①</span> 先因式分解：<Latex math="2(2x^2 + x - 6) = 2(2x-3)(x+2)" /></p>
                <p className="text-sm mt-1"><span className="font-bold">②</span> 因式即問有哪個括號 → 2 / (2x-3) → 選項 I + II</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH7 三角比 (F3)
// ========================================
export const TrigonometricIdentitiesNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-red-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH7 三角比的關係</h1>
        <p className="text-slate-600">sin, cos, tan 與畢氏定理的運用</p>
      </div>

      <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4 mb-6">
        <p className="text-red-600 font-bold mb-3 text-center text-lg">三角比口訣：對斜鄰斜對鄰</p>
        <div className="flex flex-wrap gap-6 items-center justify-center">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm text-center min-w-[140px]">
              <div className="text-2xl mb-2"><Latex math="\sin \theta" /></div>
              <div className="text-xl text-slate-600"><Latex math="= \dfrac{\text{對}}{\text{斜}}" /></div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm text-center min-w-[140px]">
              <div className="text-2xl mb-2"><Latex math="\cos \theta" /></div>
              <div className="text-xl text-slate-600"><Latex math="= \dfrac{\text{鄰}}{\text{斜}}" /></div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm text-center min-w-[140px]">
              <div className="text-2xl mb-2"><Latex math="\tan \theta" /></div>
              <div className="text-xl text-slate-600"><Latex math="= \dfrac{\text{對}}{\text{鄰}}" /></div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <svg width="240" height="200" viewBox="0 0 300 250" className="mx-auto">
              <defs>
                <marker id="arrow-trig" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#1565c0" />
                </marker>
              </defs>
              <path d="M 50,200 L 250,200 L 250,50 Z" fill="none" stroke="#1565c0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 250,180 L 230,180 L 230,200" fill="none" stroke="#1565c0" strokeWidth="2"/>
              <path d="M 90,200 A 40,40 0 0,0 85,175" fill="none" stroke="#1565c0" strokeWidth="2"/>
              <text x="100" y="195" fill="#1565c0" fontSize="24" fontWeight="bold">θ</text>
              <text x="130" y="110" fill="#1565c0" fontSize="28" fontWeight="bold" transform="rotate(-37, 150, 120)">斜</text>
              <text x="265" y="140" fill="#1565c0" fontSize="28" fontWeight="bold">對</text>
              <text x="140" y="240" fill="#1565c0" fontSize="28" fontWeight="bold">鄰</text>
            </svg>
          </div>
        </div>
      </div>

      <CollapsibleSection id="pythagoras" title="sin cos tan 輔以畢氏定理" num={1} color="green" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-green-700 font-bold text-lg mb-3">1. sin cos tan 輔以<span className="text-purple-600">畢氏定理</span>去解題</p>
            <p className="text-slate-700">如果不知道 3 條邊的長度，就不能同時找到 sin θ、cos θ 和 tan θ 的值</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-700 font-bold mb-3">例 1：圖中，∠Q=90°、PQ=12 及 PR=13。試不計算 θ，求 sin θ、cos θ 和 tan θ 的值。</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-green-600 mb-2">因題目是直角△，可用畢氏定理得出剩下的邊</p>
                    <div className="text-sm [&_.katex-display]:my-0.5">
                      <Latex math="\begin{aligned} 12^2 + RQ^2 &= 13^2 \\\\[-3px] RQ &= 5 \end{aligned}" block left />
                    </div>
                    <p className="text-green-600 mt-3 text-sm">已知 3 邊長度，可按定義寫出 <span className="text-purple-600 font-bold">sin θ / cos θ / tan θ</span></p>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-1/2">
                    <svg width="100%" height="auto" viewBox="8 28 340 200" className="max-w-[300px] mx-auto block">
                      <path d="M 40,160 L 280,160 L 280,60 Z" fill="rgba(147, 51, 234, 0.05)" stroke="#7e22ce" strokeWidth="3" strokeLinejoin="round" />
                      <polyline points="268,160 268,148 280,148" fill="none" stroke="#7e22ce" strokeWidth="2" />
                      <path d="M 280,90 A 30 30 0 0 1 252.3,71.5" fill="none" stroke="#7e22ce" strokeWidth="2" />
                      <text x="256" y="112" fill="#7e22ce" fontSize="18" fontWeight="bold" fontStyle="italic">θ</text>
                      <text x="22" y="166" fill="#7e22ce" fontSize="20" fontWeight="bold">P</text>
                      <text x="286" y="176" fill="#7e22ce" fontSize="20" fontWeight="bold">Q</text>
                      <text x="283" y="53" fill="#7e22ce" fontSize="20" fontWeight="bold">R</text>
                      <text x="150" y="185" fill="#7e22ce" fontSize="20" fontWeight="bold" className="font-sans">12</text>
                      <text x="290" y="120" fill="#22c55e" fontSize="20" fontWeight="bold" className="font-sans">5</text>
                      <text x="140" y="98" fill="#7e22ce" fontSize="20" fontWeight="bold" className="font-sans">13</text>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-blue-600 text-lg space-y-2">
                  <div><Latex math="\sin\theta = \frac{12}{13}" /></div>
                  <div><Latex math="\cos\theta = \frac{5}{13}" /></div>
                  <div><Latex math="\tan\theta = \frac{12}{5}" /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-blue-700 font-bold mb-3">例 2：已知 <Latex math="\sin\theta = \frac{3}{7}" inline />。求 <Latex math="\frac{\tan\theta}{\cos\theta}" inline /> 的值。</p>
            <div className="bg-white rounded-lg p-4 mb-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <p className="text-slate-700 mb-2">1. 如果題目沒提供 △ 圖像，需自行繪畫</p>
                  <p className="text-slate-700 mb-3">2. 利用畢氏定理找未知邊的長度</p>
                  <div className="text-green-600 [&_.katex-display]:my-0.5">
                    <Latex math="\begin{aligned} x^2 + 3^2 &= 7^2 \\\\[-3px] x^2 &= 40 \\\\[-3px] x &= \sqrt{40} \end{aligned}" block left />
                  </div>
                </div>
                  <div className="flex items-center justify-center md:justify-end mt-2 md:mt-0">
                    <svg width="100%" height="auto" viewBox="10 28 320 205" className="max-w-[280px] mx-auto block">
                      <path d="M 50,170 L 250,170 L 250,75 Z" fill="rgba(37, 99, 235, 0.05)" stroke="#1d4ed8" strokeWidth="3" strokeLinejoin="round" />
                      <polyline points="238,170 238,158 250,158" fill="none" stroke="#1d4ed8" strokeWidth="2" />
                      <path d="M 80,170 A 30 30 0 0 0 77.1,157.1" fill="none" stroke="#1d4ed8" strokeWidth="2" />
                      <text x="88" y="165" fill="#1d4ed8" fontSize="18" fontWeight="bold" fontStyle="italic">θ</text>
                      <text x="150" y="192" fill="#0ea5e9" fontSize="20" fontWeight="bold" className="font-sans">x</text>
                      <text x="260" y="130" fill="#16a34a" fontSize="20" fontWeight="bold" className="font-sans">3</text>
                      <text x="135" y="110" fill="#16a34a" fontSize="20" fontWeight="bold" className="font-sans">7</text>
                    </svg>
                  </div>
                </div>
              </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-slate-700 mb-2">3. 已知三邊邊長，求 <span className="text-green-600 font-bold"><Latex math="\frac{\tan\theta}{\cos\theta}" inline /></span></p>
              <div className="text-blue-600">
                <Latex math="\begin{aligned} \tan\theta &= \frac{3}{\sqrt{40}}, \quad \cos\theta = \frac{\sqrt{40}}{7} \\\\ \therefore \frac{\tan\theta}{\cos\theta} &= \frac{3}{\sqrt{40}} \times \frac{7}{\sqrt{40}} = \frac{21}{40} \end{aligned}" block left />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="special-angles" title="特殊三角比" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="border border-gray-400 p-3 text-center relative overflow-hidden" style={{ minWidth: '100px', minHeight: '60px' }}>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="100%" y2="100%" stroke="#9ca3af" strokeWidth="1" />
                    </svg>
                    <div className="relative flex justify-between items-start h-full">
                      <span className="self-end text-sm font-bold mt-4">三角比</span>
                      <span className="self-start text-sm font-bold mb-4">θ</span>
                    </div>
                  </th>
                  <th className="border border-gray-400 p-3 text-center">30°</th>
                  <th className="border border-gray-400 p-3 text-center">45°</th>
                  <th className="border border-gray-400 p-3 text-center">60°</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-3 text-center bg-green-50 font-bold">sin θ</td>
                  <td className="border border-gray-400 p-3 text-center"><Latex math="\frac{1}{2}" /> <span className="text-green-600 text-xs">易</span></td>
                  <td className="border border-gray-400 p-3 text-center bg-pink-100"><Latex math="\frac{1}{\sqrt{2}}" /> 或 <Latex math="\frac{\sqrt{2}}{2}" /></td>
                  <td className="border border-gray-400 p-3 text-center bg-yellow-100"><Latex math="\frac{\sqrt{3}}{2}" /></td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-3 text-center bg-green-50 font-bold">cos θ</td>
                  <td className="border border-gray-400 p-3 text-center bg-yellow-100"><Latex math="\frac{\sqrt{3}}{2}" /></td>
                  <td className="border border-gray-400 p-3 text-center bg-pink-100"><Latex math="\frac{1}{\sqrt{2}}" /> 或 <Latex math="\frac{\sqrt{2}}{2}" /></td>
                  <td className="border border-gray-400 p-3 text-center"><Latex math="\frac{1}{2}" /> <span className="text-green-600 text-xs">易</span></td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-3 text-center bg-green-50 font-bold">tan θ</td>
                  <td className="border border-gray-400 p-3 text-center"><Latex math="\frac{1}{\sqrt{3}}" /> 或 <Latex math="\frac{\sqrt{3}}{3}" /></td>
                  <td className="border border-gray-400 p-3 text-center">1 <span className="text-green-600 text-xs">易</span></td>
                  <td className="border border-gray-400 p-3 text-center"><Latex math="\sqrt{3}" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-green-700 font-bold mb-2">易：按計算機</p>
            <div className="text-blue-600 space-y-1 text-sm">
              <p>tan 60° = 1.732050808</p>
              <p>√3 = 1.732050808</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="trig-equations" title="三角方程" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="text-lg mb-4">
              <Latex math="2\sin\theta - \sqrt{3} = 0" />
              <span className="text-green-600 text-sm ml-4">目標：找 sin θ = ? (將 sin θ 以外的項移走)</span>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-blue-600 text-lg">
                <Latex math="\begin{aligned} 2\sin\theta &= \sqrt{3} \\\\ \sin\theta &= \frac{\sqrt{3}}{2} \end{aligned}" block left />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <p className="text-purple-600 font-bold mb-3">以 sin θ 找 θ：</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-slate-700">按</span>
              <span className="px-2 py-1 bg-gray-300 text-yellow-700 rounded text-xs font-bold">SHIFT</span>
              <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">sin</span>
              <span className="text-slate-700"><Latex math="\left(\frac{\sqrt{3}}{2}\right)" inline /></span>
              <span className="text-green-600 text-2xl">→</span>
              <span className="text-blue-600 text-xl font-bold">θ = 60°</span>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="identities" title="需記三角恆等式" num={4} color="red" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-6">
          <div className="bg-red-50 rounded-lg p-4 border-2 border-red-400">
            <h3 className="text-red-700 font-bold text-lg mb-4">需記三角恆等式</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center font-bold text-red-600 text-base border-b-2 border-red-300 pb-1">原式</div>
              <div className="text-center font-bold text-green-600 text-base border-b-2 border-green-300 pb-1">變種</div>
            </div>
            <div className="space-y-4 text-lg">
              {[
                {
                  label: 'A.',
                  orig: <Latex math="\sin^2\theta + \cos^2\theta = 1" />,
                  vars: [<Latex key="1" math="\sin^2\theta = 1 - \cos^2\theta" />, <Latex key="2" math="\cos^2\theta = 1 - \sin^2\theta" />]
                },
                {
                  label: 'B.',
                  orig: <Latex math="\tan\theta = \frac{\sin\theta}{\cos\theta}" />,
                  vars: [<Latex key="1" math="\frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}" />]
                },
                {
                  label: 'C.',
                  orig: <Latex math="\sin(90° - \theta) = \cos\theta" />,
                  vars: ['—']
                },
                {
                  label: 'D.',
                  orig: <Latex math="\cos(90° - \theta) = \sin\theta" />,
                  vars: ['—']
                },
                {
                  label: 'E.',
                  orig: <Latex math="\frac{1}{\tan(90° - \theta)} = \tan\theta" />,
                  vars: [<Latex key="1" math="\tan(90° - \theta) = \frac{1}{\tan\theta}" />]
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-3">
                  <p className="text-red-600 font-bold mb-2">{item.label}</p>
                  <div className="grid grid-cols-2 gap-3 items-start">
                    <div className="text-center">{item.orig}</div>
                    <div className="text-left text-green-700 space-y-1">
                      {item.vars.map((v, j) => <div key={j}>{v}</div>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH9 直線的坐標幾何 (F3)
// ========================================
export const CoordinateGeometryF3Notes = () => {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-teal-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH9 直線的坐標幾何</h1>
        <p className="text-slate-600">距離、斜率、中點、共線、平行與垂直、截點公式</p>
      </div>
      <CoordinateGeometryFormulaTable />
    </>
  );
};

// ========================================
// CH5 四邊形 (F3)
// ========================================
export const QuadrilateralNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  const RhombusDefinitionSVG = () => (
    <svg width="200" height="140" viewBox="0 0 200 140">
      <defs>
        <g id="tick-mark-double-rhom">
          <line x1="-3" y1="-5" x2="-3" y2="5" stroke="#0ea5e9" strokeWidth="2" />
          <line x1="3" y1="-5" x2="3" y2="5" stroke="#0ea5e9" strokeWidth="2" />
        </g>
      </defs>
      <path d="M20,70 L100,20 L180,70 L100,120 Z" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
      <g>
        <g transform="translate(60, 45) rotate(-32)"><use href="#tick-mark-double-rhom" /></g>
        <g transform="translate(140, 45) rotate(32)"><use href="#tick-mark-double-rhom" /></g>
        <g transform="translate(140, 95) rotate(-32)"><use href="#tick-mark-double-rhom" /></g>
        <g transform="translate(60, 95) rotate(32)"><use href="#tick-mark-double-rhom" /></g>
      </g>
    </svg>
  );

  const RhombusAnglesSVG = () => (
    <svg width="200" height="110" viewBox="0 0 200 110">
      <g stroke="#0ea5e9" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M90,30 A15,15 0 0,0 100,20" /><path d="M100,20 A15,15 0 0,0 110,30" />
        <path d="M90,80 A15,15 0 0,1 100,90" /><path d="M100,90 A15,15 0 0,1 110,80" />
        <path d="M35,48 A15,15 0 0,1 45,55" /><path d="M45,55 A15,15 0 0,1 35,62" />
        <path d="M165,48 A15,15 0 0,0 155,55" /><path d="M155,55 A15,15 0 0,0 165,62" />
      </g>
      <path d="M20,55 L100,5 L180,55 L100,105 Z" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="20" y1="55" x2="180" y2="55" stroke="#16a34a" strokeWidth="2" />
      <line x1="100" y1="5" x2="100" y2="105" stroke="#16a34a" strokeWidth="2" />
    </svg>
  );

  const RhombusPerpendicularSVG = () => (
    <svg width="200" height="110" viewBox="0 0 200 110">
      <path d="M20,55 L100,5 L180,55 L100,105 Z" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="20" y1="55" x2="180" y2="55" stroke="#16a34a" strokeWidth="2" />
      <line x1="100" y1="5" x2="100" y2="105" stroke="#16a34a" strokeWidth="2" />
      <polyline points="100,40 115,40 115,55" stroke="#0ea5e9" strokeWidth="2" fill="none" />
    </svg>
  );

  const RectangleDefinitionSVG = () => (
    <svg width="200" height="140" viewBox="0 0 200 140">
      <rect x="20" y="20" width="160" height="100" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
      <g stroke="#0ea5e9" strokeWidth="2" fill="none">
        <polyline points="20,40 40,40 40,20" /><polyline points="160,20 160,40 180,40" />
        <polyline points="180,100 160,100 160,120" /><polyline points="40,120 40,100 20,100" />
      </g>
    </svg>
  );

  const RectanglePropertiesSVG = () => (
    <svg width="210" height="170" viewBox="-10 -10 220 160">
      <defs>
        <g id="tick-mark-double-rect">
          <line x1="-3" y1="-5" x2="-3" y2="5" stroke="#0ea5e9" strokeWidth="2" />
          <line x1="3" y1="-5" x2="3" y2="5" stroke="#0ea5e9" strokeWidth="2" />
        </g>
      </defs>
      <rect x="20" y="20" width="160" height="100" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="20" y1="20" x2="180" y2="120" stroke="#16a34a" strokeWidth="2" />
      <line x1="180" y1="20" x2="20" y2="120" stroke="#16a34a" strokeWidth="2" />
      <text x="5" y="10" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">A</text>
      <text x="5" y="140" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">B</text>
      <text x="190" y="140" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">C</text>
      <text x="190" y="10" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">D</text>
      <text x="100" y="90" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold" textAnchor="middle">O</text>
      <g>
        <g transform="translate(60, 45) rotate(32)"><use href="#tick-mark-double-rect" /></g>
        <g transform="translate(140, 45) rotate(-32)"><use href="#tick-mark-double-rect" /></g>
        <g transform="translate(60, 95) rotate(-32)"><use href="#tick-mark-double-rect" /></g>
        <g transform="translate(140, 95) rotate(32)"><use href="#tick-mark-double-rect" /></g>
      </g>
    </svg>
  );

  const SquareDefinitionSVG = () => (
    <svg width="160" height="160" viewBox="0 0 160 160">
      <rect x="20" y="20" width="120" height="120" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
      <g stroke="#0ea5e9" strokeWidth="2" fill="none">
        <polyline points="20,35 35,35 35,20" /><polyline points="140,35 125,35 125,20" />
        <polyline points="140,125 125,125 125,140" /><polyline points="20,125 35,125 35,140" />
      </g>
      <g stroke="#0ea5e9" strokeWidth="2">
        <g transform="translate(80, 20)"><line x1="-3" y1="-5" x2="-3" y2="5" /><line x1="3" y1="-5" x2="3" y2="5" /></g>
        <g transform="translate(140, 80) rotate(90)"><line x1="-3" y1="-5" x2="-3" y2="5" /><line x1="3" y1="-5" x2="3" y2="5" /></g>
        <g transform="translate(80, 140)"><line x1="-3" y1="-5" x2="-3" y2="5" /><line x1="3" y1="-5" x2="3" y2="5" /></g>
        <g transform="translate(20, 80) rotate(90)"><line x1="-3" y1="-5" x2="-3" y2="5" /><line x1="3" y1="-5" x2="3" y2="5" /></g>
      </g>
    </svg>
  );

  const SquarePropertiesSVG = () => (
    <svg viewBox="0 0 400 400">
      <style>{`text { font-family: "Times New Roman", serif; font-size: 24px; fill: black; text-anchor: middle; dominant-baseline: middle; }
        .sq-shape { stroke: black; stroke-width: 2.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
        .sq-arc { stroke: #0ea5e9; stroke-width: 2; fill: none; }`}</style>
      <g className="sq-arc">
        <path d="M 90 50 A 40 40 0 0 1 78.28 78.28" /><path d="M 72.63 72.63 A 32 32 0 0 1 50 82" />
        <path d="M 350 90 A 40 40 0 0 1 321.72 78.28" /><path d="M 327.37 72.63 A 32 32 0 0 1 318 50" />
        <path d="M 310 350 A 40 40 0 0 1 321.72 321.72" /><path d="M 327.37 327.37 A 32 32 0 0 1 350 318" />
        <path d="M 50 310 A 40 40 0 0 1 78.28 321.72" /><path d="M 72.63 327.37 A 32 32 0 0 1 82 350" />
      </g>
      <g className="sq-shape">
        <rect x="50" y="50" width="300" height="300" />
        <line x1="50" y1="50" x2="350" y2="350" /><line x1="350" y1="50" x2="50" y2="350" />
      </g>
      <g>
        <text x="115" y="75">45°</text><text x="75" y="115">45°</text>
        <text x="325" y="115">45°</text><text x="285" y="75">45°</text>
        <text x="285" y="325">45°</text><text x="325" y="285">45°</text>
        <text x="75" y="285">45°</text><text x="115" y="325">45°</text>
      </g>
    </svg>
  );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH5 四邊形的性質</h1>
        <p className="text-slate-600">平行四邊形、菱形、長方形、正方形、中點定理、截線定理</p>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-sm text-slate-600 italic">
        <p>定義：最簡單的描述（幼稚園 / 小學就識講）</p>
        <p>性質：延伸知道的 邊 / 角 / 對角線 的關係</p>
      </div>

      <CollapsibleSection id="parallelogram" title="平行四邊形的定義和性質" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="text-sm text-slate-500 mb-3">3A05 §5.1, 5.2</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">(a) 定義</h3>
            <p className="text-slate-700 mb-3">有 <span className="bg-yellow-200 px-1 rounded font-bold text-green-700">兩對對邊平行</span> 的四邊形。</p>
            <div className="flex justify-center my-3">
              <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="arrow-head-single-p" d="M -5 -5 L 5 0 L -5 5" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <g id="arrow-head-double-p">
                    <path d="M -8 -5 L 2 0 L -8 5" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M 0 -5 L 10 0 L 0 5" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </defs>
                <path d="M 80 150 L 220 150 L 260 50 L 120 50 Z" fill="none" stroke="black" strokeWidth="2.5" strokeLinejoin="miter" strokeLinecap="round"/>
                <use href="#arrow-head-double-p" x="190" y="50" transform="rotate(0 190 50)" />
                <use href="#arrow-head-double-p" x="150" y="150" transform="rotate(0 150 150)" />
                <use href="#arrow-head-single-p" x="100" y="100" transform="rotate(-68.2 100 100)" />
                <use href="#arrow-head-single-p" x="240" y="100" transform="rotate(-68.2 240 100)" />
              </svg>
            </div>
            <p className="text-slate-500 italic text-sm">(簡記：平行四邊形定義)</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">(b) 性質</h3>
            <div className="space-y-3">
              {[
                { text: '(i) 對邊相等。', abbr: '(簡記：平行四邊形對邊)' },
                { text: '(ii) 對角相等。', abbr: '(簡記：平行四邊形對角)' },
                { text: '(iii) 對角線互相平分。', abbr: '(簡記：平行四邊形對角線)' },
              ].map((item, i) => (
                <div key={i}>
                  <span className="text-slate-700">{item.text}</span>
                  <p className="text-slate-500 italic text-xs ml-4">{item.abbr}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="parallelogram-test" title="平行四邊形的判定條件" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="text-sm text-slate-500 mb-3">3A05 §5.3</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: '(a) 兩對對邊相等', abbr: '(簡記：對邊相等)' },
            { label: '(b) 兩對對角相等', abbr: '(簡記：對角相等)' },
            { label: '(c) 對角線互相平分', abbr: '(簡記：對角線互相平分)' },
            { label: <span>(d) 一對對邊平行且相等 <span className="text-red-600">★</span></span>, abbr: '(簡記：對邊 // 且相等)' },
          ].map((item, i) => (
            <div key={i} className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-slate-700 font-medium mb-1">{item.label}</p>
              <p className="text-green-700 italic text-sm">{item.abbr}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="special-shapes" title="菱形 / 長方形 / 正方形的定義和性質" num={3} color="orange" activeSub={activeSub} sectionRef={s3}>
        <div className="text-sm text-slate-500 mb-3">3A05 §5.4A–C</div>
        {/* 菱形 */}
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500 mb-6">
          <h3 className="font-bold text-purple-800 mb-4 text-lg">③ 菱形的定義和性質</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-purple-900 font-semibold mb-3">(a) 菱形是四邊相等的四邊形。</p>
              <div className="flex justify-center my-4"><RhombusDefinitionSVG /></div>
              <p className="text-center text-purple-700 bg-white border border-purple-200 px-4 py-1 rounded-full">〔簡記：菱形定義〕</p>
            </div>
            <div>
              <p className="text-purple-900 font-semibold mb-2">(b) 菱形的性質：</p>
              <ul className="list-none space-y-3 text-gray-700">
                <li className="flex gap-2"><span className="font-bold text-purple-600">(i)</span><span>平行四邊形的所有性質</span></li>
                <li className="flex gap-2"><span className="font-bold text-purple-600">(ii)</span><div className="w-full">對角線平分每個內角。<div className="flex justify-center mt-2"><RhombusAnglesSVG /></div></div></li>
                <li className="flex gap-2"><span className="font-bold text-purple-600">(iii)</span><div className="w-full">對角線互相<span className="text-red-500 font-bold">垂直（90°）</span>。<div className="flex justify-center mt-2"><RhombusPerpendicularSVG /></div></div></li>
              </ul>
              <p className="mt-3 text-center text-purple-700 bg-white border border-purple-200 px-4 py-1 rounded-full">〔簡記：菱形性質〕</p>
            </div>
          </div>
        </div>
        {/* 長方形 */}
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500 mb-6">
          <h3 className="font-bold text-purple-800 mb-4 text-lg">④ 長方形的定義和性質</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-purple-900 font-semibold mb-3">(a) 長方形是所有內角都等於 90° 的四邊形。</p>
              <div className="flex justify-center my-4"><RectangleDefinitionSVG /></div>
              <p className="text-center text-purple-700 bg-white border border-purple-200 px-4 py-1 rounded-full">〔簡記：長方形定義〕</p>
            </div>
            <div>
              <p className="text-purple-900 font-semibold mb-2">(b) 長方形的性質：</p>
              <ul className="list-none space-y-2 text-gray-700">
                <li className="flex gap-2"><span className="font-bold text-purple-600">(i)</span><span>平行四邊形的所有性質</span></li>
                <li className="flex gap-2"><span className="font-bold text-purple-600">(ii)</span><span>對角線相等。即 AC = BD</span></li>
                <li className="flex gap-2"><span className="font-bold text-purple-600">(iii)</span><div className="w-full">對角線互相平分為四條相等的線段，即 OA = OB = OC = OD。<div className="flex justify-center mt-3"><RectanglePropertiesSVG /></div></div></li>
              </ul>
              <p className="mt-3 text-center text-purple-700 bg-white border border-purple-200 px-4 py-1 rounded-full">〔簡記：長方形性質〕</p>
            </div>
          </div>
        </div>
        {/* 正方形 */}
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
          <h3 className="font-bold text-purple-800 mb-4 text-lg">⑤ 正方形的定義和性質</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-purple-900 font-semibold mb-3">(a) 正方形是四邊相等且所有內角都等於 90° 的四邊形。</p>
              <div className="flex justify-center my-4"><SquareDefinitionSVG /></div>
              <p className="text-center text-purple-700 bg-white border border-purple-200 px-4 py-1 rounded-full">〔簡記：正方形定義〕</p>
            </div>
            <div>
              <p className="text-purple-900 font-semibold mb-2">(b) 正方形的性質：</p>
              <ul className="list-none space-y-2 text-gray-700">
                <li className="flex gap-2"><span className="font-bold text-purple-600">(i)</span><span>菱形的所有性質</span></li>
                <li className="flex gap-2"><span className="font-bold text-purple-600">(ii)</span><span>長方形的所有性質</span></li>
                <li className="flex gap-2"><span className="font-bold text-purple-600">(iii)</span><div className="w-full">任何邊與對角線的夾角都是 45°。<div className="flex justify-center mt-3"><SquarePropertiesSVG /></div></div></li>
              </ul>
              <p className="mt-3 text-center text-purple-700 bg-white border border-purple-200 px-4 py-1 rounded-full">〔簡記：正方形性質〕</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="midpoint-theorem" title="中點定理 (Mid-point Theorem)" num={4} color="purple" activeSub={activeSub} sectionRef={s4}>
        <div className="text-sm text-slate-500 mb-3">3A05 §5.6A</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-slate-700">若 M 和 N 分別是 AB 和 AC 的中點，</p>
            <p className="text-red-600 font-bold">則 (a) MN // BC</p>
            <p className="text-red-600 font-bold">　 (b) MN = <Latex math="\dfrac{1}{2}" /> BC</p>
            <p className="text-slate-500 italic text-sm mt-2">(簡記：中點定理)</p>
          </div>
          <div className="flex justify-center">
            <svg width="180" height="130" viewBox="0 0 180 130">
              <path d="M 90,15 L 25,115 L 155,115 Z" fill="none" stroke="#333" strokeWidth="2" strokeLinejoin="round" />
              <line x1="57" y1="65" x2="122" y2="65" stroke="#6a1b9a" strokeWidth="2.5" />
              {/* AM, MB ticks (single) */}
              <line x1="68.8" y1="36.7" x2="78.8" y2="43.3" stroke="#0ea5e9" strokeWidth="1.5" />
              <line x1="36.3" y1="86.7" x2="46.3" y2="93.3" stroke="#0ea5e9" strokeWidth="1.5" />
              {/* AN, NC ticks (double) */}
              <line x1="110.2" y1="35.0" x2="100.2" y2="41.6" stroke="#0ea5e9" strokeWidth="1.5" />
              <line x1="112.4" y1="38.4" x2="102.4" y2="45.0" stroke="#0ea5e9" strokeWidth="1.5" />
              <line x1="142.7" y1="85.0" x2="132.7" y2="91.6" stroke="#0ea5e9" strokeWidth="1.5" />
              <line x1="144.9" y1="88.4" x2="134.9" y2="95.0" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="85" y="12" fontSize="13" fill="#333">A</text>
              <text x="10" y="115" fontSize="13" fill="#333">B</text>
              <text x="158" y="115" fontSize="13" fill="#333">C</text>
              <text x="40" y="62" fontSize="13" fill="#6a1b9a">M</text>
              <text x="125" y="62" fontSize="13" fill="#6a1b9a">N</text>
            </svg>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="intercept-theorem" title="截線定理 (Intercept Theorem)" num={5} color="purple" activeSub={activeSub} sectionRef={s5}>
        <div className="text-sm text-slate-500 mb-3">3A05 §5.6B</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-slate-700">若 AB // CD // EF，且 AC = CE，</p>
            <p className="text-red-600 font-bold">則 BD = DF</p>
            <p className="text-slate-500 italic text-sm">(三條平行線截相等線段)</p>
            <p className="text-slate-500 italic text-sm">(簡記：截線定理)</p>
          </div>
          <div className="flex justify-center">
            <svg width="180" height="120" viewBox="0 0 180 120">
              <line x1="20" y1="20" x2="160" y2="20" stroke="#333" strokeWidth="1.5" />
              <line x1="20" y1="60" x2="160" y2="60" stroke="#333" strokeWidth="1.5" />
              <line x1="20" y1="100" x2="160" y2="100" stroke="#333" strokeWidth="1.5" />
              <line x1="50" y1="10" x2="75" y2="110" stroke="#1565c0" strokeWidth="2" />
              <line x1="110" y1="10" x2="135" y2="110" stroke="#1565c0" strokeWidth="2" />
              {/* Parallel signs (arrowheads pointing right) */}
              <polyline points="144,16 150,20 144,24" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="144,56 150,60 144,64" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="144,96 150,100 144,104" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {/* AC = CE tick marks (perpendicular to transversal) */}
              <line x1="52.5" y1="41.2" x2="62.5" y2="38.8" stroke="#0ea5e9" strokeWidth="1.5" />
              <line x1="62.5" y1="81.2" x2="72.5" y2="78.8" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="38" y="16" fontSize="12" fill="#333">A</text>
              <text x="100" y="16" fontSize="12" fill="#333">B</text>
              <text x="54" y="56" fontSize="12" fill="#333">C</text>
              <text x="115" y="56" fontSize="12" fill="#333">D</text>
              <text x="67" y="96" fontSize="12" fill="#333">E</text>
              <text x="128" y="96" fontSize="12" fill="#333">F</text>
            </svg>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
          <p className="font-bold text-green-700 mb-3">區分重點：中點定理 vs 截線定理</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold text-purple-700 mb-1">中點定理</p>
              <p className="text-slate-700">1 個三角形，2 個中點</p>
              <p className="text-red-600 font-bold">→ 平行 且 一半長度</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold text-purple-700 mb-1">截線定理</p>
              <p className="text-slate-700">3 條平行線，截線相等</p>
              <p className="text-red-600 font-bold">→ 另一邊也相等</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH6 三角形的心 (F3)
// ========================================

export const TriangleLinesNotes = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-orange-100 text-orange-800 border border-orange-300 px-2.5 py-1 rounded-full text-sm font-bold shadow-sm whitespace-nowrap">
            重點
          </span>
          <h3 className="text-xl font-bold text-slate-800">
            三角形的四條重要線(四線)特徵
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 高線 */}
          <div className="bg-red-50/50 rounded-xl p-4 border border-red-100 flex flex-col items-center">
            <svg width="200" height="150" viewBox="0 0 200 150">
              <path d="M 20 130 L 80 30 L 170 130 Z" fill="#f5ebe6" stroke="#9f6b53" strokeWidth="2" strokeLinejoin="round" />
              <polyline points="80,122 88,122 88,130" fill="#dcfce7" stroke="#15803d" strokeWidth="1.5" />
              <line x1="80" y1="10" x2="80" y2="150" stroke="#ef4444" strokeWidth="2" />
            </svg>
            <div className="text-center mt-3">
              <h4 className="text-lg font-bold text-red-600">1. 高線</h4>
              <div className="mt-2 text-sm text-left bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-200 w-full">
                <div className="font-bold text-green-700 mb-1">特徵：</div>
                <div className="font-bold text-green-700 text-lg flex items-center justify-between">
                  <span>• 垂直 (90°)</span>
                  <span className="text-purple-700 text-xs font-normal">（必須由頂點拉出來）</span>
                </div>
              </div>
            </div>
          </div>

          {/* 中線 */}
          <div className="bg-red-50/50 rounded-xl p-4 border border-red-100 flex flex-col items-center">
            <svg width="200" height="150" viewBox="0 0 200 150">
              <path d="M 20 130 L 80 30 L 170 130 Z" fill="#f5ebe6" stroke="#9f6b53" strokeWidth="2" strokeLinejoin="round" />
              <line x1="77" y1="10" x2="98" y2="150" stroke="#ef4444" strokeWidth="2" />
              <line x1="57.5" y1="126" x2="57.5" y2="134" stroke="#9f6b53" strokeWidth="2" />
              <line x1="132.5" y1="126" x2="132.5" y2="134" stroke="#9f6b53" strokeWidth="2" />
              <circle cx="95" cy="130" r="3.5" fill="#000" />
            </svg>
            <div className="text-center mt-3">
              <h4 className="text-lg font-bold text-red-600">2. 中線</h4>
              <div className="mt-2 text-sm text-left bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-200 w-full">
                <div className="font-bold text-green-700 mb-1">特徵：</div>
                <div className="font-bold text-green-700 text-lg flex flex-col gap-1">
                  <span>• 中點，長度相等</span>
                  <span className="text-purple-700 text-xs font-normal text-right">（必須由頂點拉出來）</span>
                </div>
              </div>
            </div>
          </div>

          {/* 角平分線 */}
          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex flex-col items-center">
            <svg width="200" height="150" viewBox="0 0 200 150">
              <path d="M 20 130 L 80 30 L 170 130 Z" fill="#f5ebe6" stroke="#9f6b53" strokeWidth="2" strokeLinejoin="round" />
              {/* 左邊的角（半徑25） */}
              <path d="M 67.1 51.4 A 25 25 0 0 0 82.5 54.9" fill="none" stroke="#15803d" strokeWidth="2" />
              {/* 右邊的角（半徑32，拉近距離） */}
              <path d="M 83.2 61.8 A 32 32 0 0 0 101.4 53.8" fill="none" stroke="#15803d" strokeWidth="2" />
              <line x1="78" y1="10" x2="92" y2="150" stroke="#ef4444" strokeWidth="2" />
            </svg>
            <div className="text-center mt-3">
              <h4 className="text-lg font-bold text-red-600">3. 角平分線</h4>
              <div className="mt-2 text-sm text-left bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-200 w-full">
                <div className="font-bold text-green-700 mb-1">特徵：</div>
                <div className="font-bold text-green-700 text-lg flex items-center justify-between">
                  <span>• 角度相同</span>
                  <span className="text-purple-700 text-xs font-normal">（必須由頂點拉出來）</span>
                </div>
              </div>
            </div>
          </div>

          {/* 垂直平分線 */}
          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex flex-col items-center">
            <svg width="200" height="150" viewBox="0 0 200 150">
              <path d="M 20 130 L 80 30 L 170 130 Z" fill="#f5ebe6" stroke="#9f6b53" strokeWidth="2" strokeLinejoin="round" />
              <polyline points="95,122 103,122 103,130" fill="#dcfce7" stroke="#15803d" strokeWidth="1.5" />
              <path d="M 54.5 125 L 54.5 135 M 60.5 125 L 60.5 135 M 129.5 125 L 129.5 135 M 135.5 125 L 135.5 135" stroke="#9f6b53" strokeWidth="2" />
              <line x1="95" y1="30" x2="95" y2="150" stroke="#ef4444" strokeWidth="2" />
              <circle cx="95" cy="130" r="3.5" fill="#000" />
            </svg>
            <div className="text-center mt-3">
              <h4 className="text-lg font-bold text-red-600">4. 垂直平分線</h4>
              <div className="mt-2 text-sm text-left bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-200 w-full">
                <div className="font-bold text-green-700 mb-1">特徵：</div>
                <div className="font-bold text-green-700 text-lg flex flex-col gap-1">
                  <span>• 垂直 (90°) + 長度相等</span>
                  <span className="text-slate-500 text-xs font-normal text-right">（不一定由頂點拉出來）</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// ========================================
// CH8 三角學的應用 (F3)
// ========================================

const GradientInclinationSVG1 = () => (
  <svg width="400" height="200" viewBox="0 0 400 200" className="mx-auto block">
    <defs>
      <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
      </marker>
    </defs>
    {/* 直角三角形 */}
    <path d="M 50,160 L 300,160 L 300,60 Z" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
    
    {/* 直角符號 */}
    <polyline points="288,160 288,148 300,148" fill="none" stroke="#334155" strokeWidth="2" />
    
    {/* 傾角弧度 (計算 dy=-100, dx=250 -> 角度約 -21.8度) */}
    <path d="M 90,160 A 40 40 0 0 0 87.1 145.2" fill="none" stroke="#3b82f6" strokeWidth="2" />
    <text x="105" y="152" fill="#3b82f6" fontSize="16" fontWeight="bold">傾角</text>
    
    {/* 底邊：地下 */}
    <text x="175" y="185" fill="#3b82f6" fontSize="16" fontWeight="bold">地下</text>
    
    {/* 垂直邊：斜坡頂的高度 */}
    <text x="395" y="100" fill="#22c55e" fontSize="16" fontWeight="bold" textAnchor="end">斜坡頂的高度</text>
    <path d="M 325,100 L 305,110" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-green)" />
    
    {/* 斜邊：斜坡 */}
    <text x="145" y="70" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle">斜坡</text>
    <path d="M 145,80 L 165,100" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red)" />
  </svg>
);

const GradientInclinationSVG2 = () => (
  <svg width="400" height="200" viewBox="0 0 400 200" className="mx-auto block">
    {/* 直角三角形 */}
    <path d="M 80,160 L 280,160 L 280,60 Z" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
    
    {/* 直角符號 */}
    <polyline points="268,160 268,148 280,148" fill="none" stroke="#334155" strokeWidth="2" />
    
    {/* 底邊：橫 */}
    <text x="180" y="185" fill="#22c55e" fontSize="20" fontWeight="bold" textAnchor="middle">橫</text>
    
    {/* 垂直邊：直 */}
    <text x="300" y="115" fill="#22c55e" fontSize="20" fontWeight="bold" textAnchor="middle">直</text>
  </svg>
);

const ContourLinesSVG = () => (
  <svg width="400" height="250" viewBox="0 0 400 250" className="mx-auto block">
    <defs>
      <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#1d4ed8" />
      </marker>
      <marker id="arrow-green2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#15803d" />
      </marker>
    </defs>
    
    {/* 地圖背景 */}
    <rect x="200" y="10" width="180" height="230" fill="#dcfce7" rx="10" />
    
    {/* 等高線 */}
    <path d="M 210,40 Q 280,60 370,30" fill="none" stroke="#333" strokeWidth="1.5" />
    <path d="M 205,95 Q 290,120 375,85" fill="none" stroke="#333" strokeWidth="1.5" />
    <text x="350" y="105" fill="#333" fontSize="12" fontWeight="bold">450 m</text>
    
    <path d="M 215,155 Q 280,180 370,145" fill="none" stroke="#333" strokeWidth="1.5" />
    <text x="350" y="165" fill="#333" fontSize="12" fontWeight="bold">400 m</text>
    
    <path d="M 225,215 Q 290,200 375,225" fill="none" stroke="#333" strokeWidth="1.5" />
    <text x="350" y="215" fill="#333" fontSize="12" fontWeight="bold">350 m</text>
    
    {/* 點 A (在 450m 線上) */}
    <g transform="translate(260, 105)">
      <line x1="-4" y1="-4" x2="4" y2="4" stroke="#1d4ed8" strokeWidth="2" />
      <line x1="-4" y1="4" x2="4" y2="-4" stroke="#1d4ed8" strokeWidth="2" />
      <text x="-15" y="5" fill="#1d4ed8" fontSize="14" fontWeight="bold">A</text>
    </g>
    
    {/* 點 B (在 400m 線上) */}
    <g transform="translate(300, 162)">
      <line x1="-4" y1="-4" x2="4" y2="4" stroke="#1d4ed8" strokeWidth="2" />
      <line x1="-4" y1="4" x2="4" y2="-4" stroke="#1d4ed8" strokeWidth="2" />
      <text x="12" y="5" fill="#1d4ed8" fontSize="14" fontWeight="bold">B</text>
    </g>
    
    {/* 連接線 */}
    <line x1="260" y1="105" x2="300" y2="162" stroke="#f97316" strokeWidth="2" strokeDasharray="4 4" />
    
    {/* 標示文字和箭頭 */}
    <text x="170" y="80" fill="#1d4ed8" fontSize="12" fontWeight="bold" textAnchor="end">題目提供：實際水平距離 325m</text>
    <path d="M 175,85 Q 230,105 270,125" fill="none" stroke="#1d4ed8" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
    
    <text x="170" y="190" fill="#15803d" fontSize="12" fontWeight="bold" textAnchor="end">自己計出爬升了 450 - 400 = 50m</text>
    <path d="M 175,185 Q 240,175 285,145" fill="none" stroke="#15803d" strokeWidth="1.5" markerEnd="url(#arrow-green2)" />
  </svg>
);

const BearingsSVG1 = () => (
  <svg width="400" height="200" viewBox="0 0 400 200" className="mx-auto block">
    <defs>
      <marker id="arrow-bearings-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
      </marker>
      <marker id="arrow-bearings-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
      </marker>
    </defs>
    {/* ===== 左圖 (真方位角) ===== */}
    <g transform="translate(100, 100)">
      {/* 十字軸 */}
      <line x1="0" y1="80" x2="0" y2="-80" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-bearings-gray)" />
      <line x1="-80" y1="0" x2="80" y2="0" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-bearings-gray)" />
      <text x="0" y="-90" fill="#334155" fontSize="14" fontWeight="bold" textAnchor="middle">N</text>
      <text x="-8" y="-10" fill="#334155" fontSize="14" fontStyle="italic" textAnchor="end">O</text>

      {/* 虛線 */}
      <line x1="0" y1="0" x2="50" y2="-60" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-bearings-p)" />
      <text x="55" y="-60" fill="#334155" fontSize="14" fontStyle="italic">A</text>
      
      <line x1="0" y1="0" x2="40" y2="60" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-bearings-p)" />
      <text x="45" y="65" fill="#334155" fontSize="14" fontStyle="italic">B</text>

      <line x1="0" y1="0" x2="-60" y2="40" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-bearings-p)" />
      <text x="-70" y="45" fill="#334155" fontSize="14" fontStyle="italic">C</text>

      {/* 弧度 */}
      {/* A: 由N至A (35度) */}
      <path d="M 0,-30 A 30 30 0 0 1 19.3,-23" fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x="25" y="-30" fill="#2563eb" fontSize="12" fontWeight="bold">35°</text>

      {/* B: 由N至B (152度) -> 與S角為28度 */}
      <path d="M 0,-40 A 40 40 0 0 1 22.2,33.3" fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x="35" y="15" fill="#2563eb" fontSize="12" fontWeight="bold">28°</text>

      {/* C: 由N至C (245度) -> 與S角為65度, 剩餘25度 */}
      <path d="M 0,-50 A 50 50 0 1 1 -42.4,28.3" fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d="M 0,35 A 35 35 0 0 1 -29.6,19.7" fill="none" stroke="#16a34a" strokeWidth="2" />
      <text x="-15" y="45" fill="#16a34a" fontSize="12" fontWeight="bold">65°</text>
      <text x="-35" y="15" fill="#2563eb" fontSize="12" fontWeight="bold">25°</text>
    </g>

    {/* ===== 右圖 (羅盤方位角) ===== */}
    <g transform="translate(300, 100)">
      {/* 十字軸 */}
      <line x1="0" y1="80" x2="0" y2="-80" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-bearings-gray)" />
      <line x1="-80" y1="0" x2="80" y2="0" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-bearings-gray)" />
      <text x="0" y="-90" fill="#16a34a" fontSize="14" fontWeight="bold" textAnchor="middle">N</text>
      <text x="0" y="95" fill="#dc2626" fontSize="14" fontWeight="bold" textAnchor="middle">S</text>
      <text x="-85" y="5" fill="#dc2626" fontSize="14" fontWeight="bold" textAnchor="end">W</text>
      <text x="85" y="5" fill="#16a34a" fontSize="14" fontWeight="bold" textAnchor="start">E</text>
      <text x="-8" y="-10" fill="#334155" fontSize="14" fontStyle="italic" textAnchor="end">O</text>

      {/* 虛線 */}
      <line x1="0" y1="0" x2="50" y2="-60" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-bearings-p)" />
      <text x="55" y="-60" fill="#334155" fontSize="14" fontStyle="italic">A</text>
      
      <line x1="0" y1="0" x2="40" y2="60" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-bearings-p)" />
      <text x="45" y="65" fill="#334155" fontSize="14" fontStyle="italic">B</text>

      <line x1="0" y1="0" x2="-60" y2="40" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-bearings-p)" />
      <text x="-70" y="45" fill="#334155" fontSize="14" fontStyle="italic">C</text>

      {/* 弧度 */}
      {/* A */}
      <path d="M 0,-30 A 30 30 0 0 1 19.3,-23" fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x="18" y="-38" fill="#2563eb" fontSize="12" fontWeight="bold">35°</text>

      {/* B */}
      <path d="M 0,30 A 30 30 0 0 0 16.6,25" fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x="25" y="40" fill="#2563eb" fontSize="12" fontWeight="bold">28°</text>

      {/* C */}
      <path d="M 0,35 A 35 35 0 0 1 -29.6,19.7" fill="none" stroke="#16a34a" strokeWidth="2" />
      <text x="-15" y="45" fill="#16a34a" fontSize="12" fontWeight="bold">65°</text>
      
      <path d="M -30,0 A 30 30 0 0 0 -25,16.7" fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x="-48" y="20" fill="#2563eb" fontSize="12" fontWeight="bold">25°</text>
    </g>
  </svg>
);

const BearingsSVG2 = () => (
  <svg width="400" height="240" viewBox="0 -20 400 240" className="mx-auto block">
    <defs>
      <marker id="arrow-bearings-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-bearings2-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
      </marker>
    </defs>
    
    <g transform="translate(200, 100)">
      {/* 十字軸 */}
      <line x1="0" y1="80" x2="0" y2="-80" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-bearings2-p)" />
      <line x1="-80" y1="0" x2="80" y2="0" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-bearings2-p)" />
      <text x="0" y="-95" fill="#334155" fontSize="18" fontWeight="bold" textAnchor="middle">N</text>
      <text x="15" y="-5" fill="#334155" fontSize="18" fontWeight="bold" textAnchor="start">A</text>
      <text x="15" y="-80" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="start">←從這裡開始轉</text>
      
      {/* 直角符號 */}
      <polyline points="-12,0 -12,12 0,12" stroke="#ef4444" strokeWidth="2" fill="none" />

      {/* 線段B */}
      <line x1="0" y1="0" x2="-80" y2="-32.36" stroke="#334155" strokeWidth="2" />
      <text x="-90" y="-35" fill="#334155" fontSize="18" fontStyle="italic" textAnchor="end">B</text>

      {/* 22度弧 (在-x軸以上) */}
      <path d="M -50,0 A 50 50 0 0 1 -46.35,-18.75" fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x="-70" y="-5" fill="#334155" fontSize="16" fontWeight="bold">22°</text>

      {/* 270度弧 (3格) */}
      <path d="M 0,-40 A 40 40 0 1 1 -40,0" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-bearings-red)" />
      <text x="20" y="45" fill="#2563eb" fontSize="16" fontWeight="bold">270°(3格)</text>
      <path d="M 20,38 Q 15,35 15,40" fill="none" stroke="#2563eb" strokeWidth="1.5" />

      {/* 90-22 弧 */}
      <path d="M 0,-25 A 25 25 0 0 0 -23.18,-9.37" fill="none" stroke="#16a34a" strokeWidth="2" />
      <text x="-40" y="-45" fill="#16a34a" fontSize="14" fontWeight="bold">90° - 22° = 68°</text>
    </g>
  </svg>
);

const ElevationSVG = () => (
  <svg width="300" height="150" viewBox="0 0 300 150" className="mx-auto block">
    <defs>
      <marker id="arrow-red-e" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
      </marker>
    </defs>
    
    {/* 角度填充 */}
    <path d="M 50,80 L 80,80 A 30 30 0 0 0 76.8,66.6 Z" fill="rgba(37,99,235,0.8)" stroke="none" />
    
    {/* 線條 */}
    <line x1="50" y1="80" x2="200" y2="80" stroke="#22c55e" strokeWidth="2.5" />
    <line x1="50" y1="80" x2="150" y2="30" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-red-e)" />
    
    {/* 文字 */}
    <text x="35" y="85" fill="#334155" fontSize="20" fontWeight="bold">A</text>
    <text x="165" y="25" fill="#334155" fontSize="20" fontWeight="bold">B</text>
  </svg>
);

const DepressionSVG = () => (
  <svg width="300" height="150" viewBox="0 0 300 150" className="mx-auto block">
    <defs>
      <marker id="arrow-red-d" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
      </marker>
    </defs>
    
    {/* 角度填充 */}
    <path d="M 50,80 L 80,80 A 30 30 0 0 1 76.8,93.4 Z" fill="rgba(37,99,235,0.8)" stroke="none" />
    
    {/* 線條 */}
    <line x1="50" y1="80" x2="200" y2="80" stroke="#22c55e" strokeWidth="2.5" />
    <line x1="50" y1="80" x2="150" y2="130" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-red-d)" />
    
    {/* 文字 */}
    <text x="35" y="75" fill="#334155" fontSize="20" fontWeight="bold">C</text>
    <text x="160" y="145" fill="#334155" fontSize="20" fontWeight="bold">D</text>
  </svg>
);

export const TrigonometryApplicationsNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-teal-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">三角學的應用</h1>
        <p className="text-slate-600">探討斜坡斜率與傾角的關係</p>
      </div>

      <CollapsibleSection id="gradient-inclination" title="1. 斜率與傾角" num={1} color="teal" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">📐 斜坡上的應用</h3>
            <p className="text-sm text-slate-700 mb-3">- 三角學可應用在斜坡上。<br />- 傾角用來量度一個斜坡的斜率（斜坡即有幾斜）。</p>
            {/* 📐 繪製：斜坡與傾角（直角三角形） */}
            <div className="flex justify-center mb-3">
              <GradientInclinationSVG1 />
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-2">📝 斜率公式</h3>
            <div className="bg-white rounded-lg p-3 mb-3 text-center">
              <Latex math="\text{斜率} = \frac{\text{鉛垂距離 (打直)}}{\text{水平距離 (打橫)}}" block />
              <p className="text-sm text-slate-600 mt-2 text-red-600">斜率通常以 <span className="font-bold">1:n</span> 的形式表達</p>
            </div>
            {/* 📐 繪製：鉛垂與水平距離（直角三角形） */}
            <div className="flex justify-center mb-3">
              <GradientInclinationSVG2 />
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 斜率關係</h3>
            <ul className="text-sm text-slate-700 space-y-2 mb-3 list-none">
              <li><span className="text-red-500">-</span> 斜坡的斜率<span className="text-red-600 font-bold">越大</span> → <span className="text-red-600 font-bold">越斜</span></li>
              <li><span className="text-red-500">-</span> 斜坡的斜率<span className="text-red-600 font-bold">越小</span> → <span className="text-red-600 font-bold">越平坦</span></li>
            </ul>
            <p className="text-sm text-slate-600 bg-white p-2 rounded border border-amber-100">
              斜率可以 1:4 / 1比4 / <Latex math="\frac{1}{4}" /> / 25% 的形式表達
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">✨ 結合三角比</h3>
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="text-lg text-red-600 font-bold"><Latex math="\text{斜率} = \tan \text{傾角}" /></p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="contour-lines" title="2. 地圖等高線" num={2} color="emerald" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <h3 className="font-bold text-emerald-800 mb-3">📍 用途與特點</h3>
            <ul className="text-sm text-slate-700 space-y-2 list-none">
              <li><span className="text-emerald-600 font-bold">-</span> 遠足 / 測量地勢用</li>
              <li>
                <span className="text-emerald-600 font-bold">-</span> 題目會提供水平距離 <span className="bg-yellow-200 px-1 rounded text-red-600 font-bold">(走多遠)</span>
              </li>
              <li>
                <span className="text-emerald-600 font-bold">-</span> 能從地圖中找到鉛垂距離 <span className="bg-yellow-200 px-1 rounded text-red-600 font-bold">(爬升高度)</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">🗺️ 實際應用例子</h3>
            {/* 📐 繪製：地圖等高線 */}
            <div className="flex justify-center mb-3">
              <ContourLinesSVG />
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">🔹</span>
                <p className="text-sm text-slate-700 font-bold text-blue-800">題目提供：實際水平距離 325m</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">🔹</span>
                <div className="text-sm text-slate-700">
                  <p className="font-bold text-green-700 mb-1">自己計出爬升了（鉛垂距離）：</p>
                  <p className="font-bold">450 - 400 = 50m</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded text-center text-sm font-bold text-blue-800 border border-blue-200">
                ✔️ 可找 斜率 / 傾角！
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="bearings" title="3. 方位角" num={3} color="blue" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-3">📍 真方位角與羅盤方位角</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <p className="font-bold text-red-600 mb-2 border-b border-red-100 pb-1">真方位角</p>
                <ul className="text-sm text-slate-700 space-y-1 mb-3">
                  <li>• 0 - 360° 表達</li>
                  <li>• 必定由 N 開始<span className="text-red-600 font-bold">量度</span> (順時針)</li>
                  <li>• 答案<span className="text-red-600 font-bold">必定出現 3 位數字</span></li>
                </ul>
                <div className="bg-slate-50 p-2 rounded text-sm text-slate-700">
                  <p className="font-bold mb-1">e.g.</p>
                  <p>O 測得 A：035°</p>
                  <p>O 測得 B：152°</p>
                  <p>O 測得 C：245°</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <p className="font-bold text-red-600 mb-2 border-b border-red-100 pb-1">羅盤方位角</p>
                <ul className="text-sm text-slate-700 space-y-1 mb-3">
                  <li>• 以 0° - 90° 表達</li>
                  <li><span className="bg-yellow-200 px-1 rounded text-red-600 font-bold">①</span> 以 N/S 作開首 (論線/角度近 N/S)</li>
                  <li><span className="bg-yellow-200 px-1 rounded text-red-600 font-bold">②</span> 配 0 - 90° (順/逆時針)</li>
                  <li><span className="bg-yellow-200 px-1 rounded text-red-600 font-bold">③</span> 以 W/E 作結束 (想想角度向哪移動)</li>
                </ul>
                <div className="bg-slate-50 p-2 rounded text-sm space-y-1">
                  <p className="font-bold mb-1">e.g.</p>
                  <div className="flex items-center gap-2">O 測得 A：<span className="bg-yellow-200 px-1 font-bold">N</span><span className="text-red-500 font-bold">35°</span><span className="bg-blue-200 px-1 font-bold text-blue-800">E</span></div>
                  <div className="flex items-center gap-2">O 測得 B：<span className="bg-yellow-200 px-1 font-bold">S</span><span className="text-red-500 font-bold">28°</span><span className="bg-blue-200 px-1 font-bold text-blue-800">E</span></div>
                  <div className="flex items-center gap-2">O 測得 C：<span className="bg-yellow-200 px-1 font-bold">S</span><span className="text-red-500 font-bold">65°</span><span className="bg-blue-200 px-1 font-bold text-blue-800">W</span></div>
                </div>
              </div>
            </div>
            {/* 📐 繪製：真方位角與羅盤方位角圖示 */}
            <div className="flex justify-center mb-3 mt-3">
              <BearingsSVG1 />
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 提示：善用 90° / 180° / 270° 去篩選需找的角度</h3>
            <div className="bg-white rounded-lg p-4 border border-slate-200 mt-2">
              <p className="text-slate-700 font-bold mb-2">例：A 測得 B 的真方位角 / 羅盤方位角</p>
              {/* 📐 繪製：方位角計算例題圖示 */}
              <div className="flex justify-center mb-3 mt-2">
                <BearingsSVG2 />
              </div>
              <div className="space-y-2 mt-3 text-sm">
                <p className="text-slate-700"><span className="text-blue-600 font-bold">真方位角：</span>270° + 22° = <span className="font-bold">292°</span></p>
                <p className="text-slate-700"><span className="text-green-600 font-bold">羅盤方位角：</span>90° - 22° = 68° <span className="text-slate-500">→</span> <span className="font-bold">N68°W</span></p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="elevation-depression" title="4. 仰角 / 俯角" num={4} color="purple" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                
                <div className="text-center">
                  <h3 className="font-bold text-lg text-slate-800 mb-2">仰角</h3>
                  <p className="text-sm text-slate-600 mb-2">A 望 B (向上望)</p>
                  <div className="flex justify-center">
                    <ElevationSVG />
                  </div>
                </div>

                <div className="text-center font-bold text-green-700 bg-green-50 rounded-lg p-3 shadow-sm border border-green-200 mx-auto md:mt-14 my-4 md:my-0">
                  <p className="text-xs mb-1">💡 技巧：</p>
                  <p>出發點</p>
                  <p className="text-sm whitespace-nowrap hidden md:block">←加水平線，找夾角→</p>
                  <p className="text-sm md:hidden">↑加水平線，找夾角↓</p>
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-lg text-slate-800 mb-2">俯角</h3>
                  <p className="text-sm text-slate-600 mb-2">C 望 D (向下望)</p>
                  <div className="flex justify-center">
                    <DepressionSVG />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH11 概率 (F3)
// ========================================

const TreeDiagramSVG = () => (
  <svg width="100%" height="260" viewBox="0 0 600 260" className="mx-auto mt-2 block overflow-visible">
    <g fontSize="16" fontWeight="bold">
      <text x="40" y="30" fill="#334155" textDecoration="underline">包裝</text>
      <text x="140" y="30" fill="#334155" textDecoration="underline">口味</text>
      <text x="260" y="30" fill="#334155" textDecoration="underline">配料</text>
      <text x="360" y="30" fill="#334155" textDecoration="underline">可能結果</text>
    </g>

    <g fontSize="16" fontWeight="bold" transform="translate(0 12)">
      <line x1="0" y1="140" x2="30" y2="80" stroke="#64748b" strokeWidth="2" />
      <line x1="0" y1="140" x2="30" y2="200" stroke="#64748b" strokeWidth="2" />
      
      <text x="40" y="85" fill="#1e293b">D</text>
      <line x1="60" y1="80" x2="130" y2="50" stroke="#64748b" strokeWidth="2" />
      <line x1="60" y1="80" x2="130" y2="110" stroke="#64748b" strokeWidth="2" />
      
      <text x="140" y="55" fill="#1e293b">V</text>
      <line x1="160" y1="50" x2="250" y2="35" stroke="#64748b" strokeWidth="2" />
      <line x1="160" y1="50" x2="250" y2="65" stroke="#64748b" strokeWidth="2" />
      <text x="260" y="40" fill="#1e293b">A</text>
      <text x="380" y="40" fill="#1e293b">DVA</text>
      <text x="260" y="70" fill="#1e293b">B</text>
      <text x="380" y="70" fill="#1e293b">DVB</text>
      
      <text x="140" y="115" fill="#1e293b">M</text>
      <line x1="160" y1="110" x2="250" y2="95" stroke="#64748b" strokeWidth="2" />
      <line x1="160" y1="110" x2="250" y2="125" stroke="#64748b" strokeWidth="2" />
      <text x="260" y="100" fill="#1e293b">A</text>
      <text x="380" y="100" fill="#1e293b">DMA</text>
      <text x="260" y="130" fill="#1e293b">B</text>
      <text x="380" y="130" fill="#1e293b">DMB</text>
      
      <text x="40" y="205" fill="#ea580c">C</text>
      <line x1="60" y1="200" x2="130" y2="170" stroke="#64748b" strokeWidth="2" />
      <line x1="60" y1="200" x2="130" y2="230" stroke="#64748b" strokeWidth="2" />
      
      <text x="140" y="175" fill="#16a34a">V</text>
      <line x1="160" y1="170" x2="250" y2="155" stroke="#64748b" strokeWidth="2" />
      <line x1="160" y1="170" x2="250" y2="185" stroke="#64748b" strokeWidth="2" />
      <text x="260" y="160" fill="#1e293b">A</text>
      <text x="380" y="160" fill="#1e293b">CVA</text>
      <text x="260" y="190" fill="#2563eb">B</text>
      <text x="380" y="190" fill="#2563eb">CVB</text>
      
      <text x="140" y="235" fill="#1e293b">M</text>
      <line x1="160" y1="230" x2="250" y2="215" stroke="#64748b" strokeWidth="2" />
      <line x1="160" y1="230" x2="250" y2="245" stroke="#64748b" strokeWidth="2" />
      <text x="260" y="220" fill="#1e293b">A</text>
      <text x="380" y="220" fill="#1e293b">CMA</text>
      <text x="260" y="250" fill="#1e293b">B</text>
      <text x="380" y="250" fill="#1e293b">CMB</text>
    </g>

    <path d="M 425,197 L 445,197" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue-tree)"/>
    <defs>
      <marker id="arrow-blue-tree" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
      </marker>
    </defs>
    <rect x="455" y="157" width="145" height="80" rx="8" fill="white" stroke="#94a3b8" strokeDasharray="4 4" />
    <text x="465" y="180" fontSize="13" fill="#334155"><tspan fill="#ea580c" fontWeight="bold">C</tspan><tspan fill="#16a34a" fontWeight="bold">V</tspan><tspan fill="#2563eb" fontWeight="bold">B</tspan> 即一個筒裝(<tspan fill="#ea580c" fontWeight="bold">C</tspan>)</text>
    <text x="465" y="200" fontSize="13" fill="#334155">的香草(<tspan fill="#16a34a" fontWeight="bold">V</tspan>)雪糕配</text>
    <text x="465" y="220" fontSize="13" fill="#334155">藍莓(<tspan fill="#2563eb" fontWeight="bold">B</tspan>)。</text>
  </svg>
);

export const ProbabilityF3Notes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 px-4 md:px-0">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-orange-500">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">CH11 概率</h1>
          <p className="text-slate-600">學會畫樹形圖及表格尋找所有結果，掌握概率及期望值計算</p>
        </div>

        {/* 1. 畫圖找組合/概率 */}
        <CollapsibleSection id="tree-diagram-table" title="畫圖找組合/概率" num={1} color="orange" activeSub={activeSub} sectionRef={s1}>
          <div className="space-y-6">
            
            {/* A. 樹形圖 */}
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-3 text-lg">A. 樹形圖</h3>
              <p className="text-slate-700 mb-4">
                <strong className="text-purple-700">樹形圖</strong>利用分支顯示一個活動的所有可能結果。
                <br/>
                <span className="text-sm text-slate-500">（例：單球雪糕餐牌 — 包裝、口味、配料）</span>
              </p>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 overflow-x-auto">
                <TreeDiagramSVG />
              </div>
            </div>

            {/* B. 數表 */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3 text-lg">B. 數表 <span className="text-sm font-normal text-slate-600">（只能表達兩個階段）</span></h3>
              <p className="text-slate-700 mb-4">
                當事件只有兩個階段時，我們可利用下表顯示所有可能結果。
                <br/>
                <span className="text-sm text-slate-500">（例：兩隻小狗的性別組合）</span>
              </p>
              
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                {/* 數表 */}
                <div className="relative pt-6 pl-8">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-slate-700 font-bold whitespace-nowrap">第二隻小狗</div>
                  <div className="absolute left-[-1rem] top-1/2 -translate-y-1/2 text-slate-700 font-bold" style={{ writingMode: 'vertical-rl' }}>第一隻小狗</div>
                  
                  <table className="border-collapse text-center w-48 text-lg bg-white">
                    <tbody>
                      <tr>
                        <td className="w-16 h-12 border border-slate-300"></td>
                        <td className="w-16 h-12 border border-slate-300 bg-amber-100 font-bold text-blue-600">F</td>
                        <td className="w-16 h-12 border border-slate-300 bg-amber-100 font-bold text-blue-600">M</td>
                      </tr>
                      <tr>
                        <td className="w-16 h-12 border border-slate-300 bg-amber-100 font-bold text-green-600">F</td>
                        <td className="w-16 h-12 border border-slate-300 font-bold"><span className="text-green-600">F</span><span className="text-blue-600">F</span></td>
                        <td className="w-16 h-12 border-2 border-slate-800 font-bold relative">
                          <span className="text-green-600">F</span><span className="text-blue-600">M</span>
                          {/* 箭頭連結提示 */}
                          <div className="absolute top-1/2 -right-6 md:-right-8 w-6 md:w-8 h-px bg-slate-400"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-16 h-12 border border-slate-300 bg-amber-100 font-bold text-green-600">M</td>
                        <td className="w-16 h-12 border border-slate-300 font-bold"><span className="text-green-600">M</span><span className="text-blue-600">F</span></td>
                        <td className="w-16 h-12 border border-slate-300 font-bold"><span className="text-green-600">M</span><span className="text-blue-600">M</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 文字說明卡片 */}
                <div className="bg-white border border-dashed border-slate-400 rounded-lg p-3 text-sm text-slate-700 w-48 shrink-0 relative mt-4 md:mt-0">
                  <span className="font-bold"><span className="text-green-600">F</span><span className="text-blue-600">M</span></span> 代表第一隻小狗是<span className="text-green-600 font-bold">雌性 (F)</span> 及第二隻小狗是<span className="text-blue-600 font-bold">雄性 (M)</span>。
                </div>
              </div>
            </div>
            
          </div>
        </CollapsibleSection>

        {/* 2. 概率 */}
        <CollapsibleSection id="probability-definition" title="概率 (機會率)" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
          <div className="bg-white rounded-lg p-5 border border-green-200 space-y-4">
            
            <div className="flex items-start gap-3">
              <span className="bg-green-100 text-green-800 font-bold px-2 py-1 rounded w-20 text-center shrink-0">範圍</span>
              <div className="pt-1">
                <span className="text-lg font-bold text-red-600">0 - 1</span>
                <ul className="list-disc list-inside mt-2 text-slate-700 space-y-1 ml-1">
                  <li><span className="text-red-500 font-bold">0</span> 是一定<span className="underline">不會</span>發生 <span className="text-slate-500">(e.g. 太陽從西邊升起)</span></li>
                  <li><span className="text-red-500 font-bold">1</span> 是一定<span className="underline">會</span>發生 <span className="text-slate-500">(e.g. 太陽從東邊升起)</span></li>
                </ul>
                <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-2 mt-3 text-sm flex items-center justify-center font-bold">
                  按：如果計到概率是負數 / 大於 1，則必定錯誤
                </div>
              </div>
            </div>

            <div className="border-t border-green-100 my-4"></div>

            <div className="bg-slate-50 rounded-lg p-4">
              <p className="font-bold text-slate-800 mb-2">
                想表達 A 事件的概率 可寫成 <span className="text-green-700 ml-2 border border-green-300 bg-green-100 px-2 py-1 rounded"><Latex math="P(A)" /></span>
              </p>
              <div className="text-slate-700 mt-3 space-y-3 font-sans">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-blue-700 font-sans">e.g. 抽到單數的概率</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-green-700 font-bold"><Latex math="P(\text{單數})" /></span>
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-blue-700 font-sans">x {'>'} 4 的概率是 0.5</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-green-700 font-bold"><Latex math="P(x > 4) = 0.5" /></span>
                </div>
              </div>
            </div>

          </div>
        </CollapsibleSection>

        {/* 3. 期望值 */}
        <CollapsibleSection id="expected-value" title="期望值" num={3} color="indigo" activeSub={activeSub} sectionRef={s3}>
          <div className="space-y-4">
            
            <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-200">
              <h3 className="font-bold text-slate-800 text-lg flex items-center flex-wrap gap-2 mb-2">
                期望值：<span className="bg-yellow-200 px-2 py-1 rounded font-sans break-all text-xl">概率 <Latex math="\times" /> 次數/金額</span>
              </h3>
              <p className="text-green-700 font-bold mb-4 mt-2">
                註：題目未必提供概率，需自行計算
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border border-slate-200">
              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-slate-700 text-sm mb-4">
                <strong>e.g.</strong> 某箱內有九張 $50 現金券和一張 $100 現金券。從該箱內隨機抽出一張現金券。
              </div>

              <div className="space-y-4 font-bold text-slate-800">
                <div className="flex flex-col md:flex-row gap-4 md:items-center text-blue-900 border-l-4 border-blue-500 pl-3">
                  <span><Latex math="\hookrightarrow" /> 能推出：</span>
                  <span className="bg-blue-100 px-2 py-1 rounded border border-blue-200">
                    <Latex math="P(\text{抽} \$50) = \dfrac{9}{10}" />
                  </span>
                  <span className="bg-blue-100 px-2 py-1 rounded border border-blue-200">
                    <Latex math="P(\text{抽} \$100) = \dfrac{1}{10}" />
                  </span>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg mt-4 border border-indigo-200">
                  <p className="mb-2">假設一定抽到，期望值：</p>
                  <p className="text-lg md:text-xl flex flex-wrap items-center gap-y-2 mt-2">
                    <Latex math="\dfrac{9}{10} \times \$50 + \dfrac{1}{10} \times \$100" />
                  </p>
                  <p className="text-lg md:text-xl text-red-600 mt-2">
                    <Latex math="= \$55" />
                  </p>
                </div>
              </div>
            </div>

          </div>
        </CollapsibleSection>

      </div>
    </>
  );
};

// ========================================
// CH10 集中趨勢的量度 (F3)
// ========================================
export const CentralTendencyNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-indigo-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH10 集中趨勢的量度</h1>
        <p className="text-slate-600">平均數、中位數、眾數與加權平均數的計算</p>
      </div>

      <CollapsibleSection id="basic-measures" title="平均數 中位數 眾數" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-slate-800 mb-2">例：一組數據</h3>
            <p className="text-lg font-bold text-slate-800 mb-3 tracking-widest">
              1, 3, 4, 7 <span className="text-red-500 mx-1">|</span> 7, 8, 8, 8
            </p>
            <div className="space-y-4">
              <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <span className="font-bold text-slate-800 w-16">平均數</span>
                  <Latex math="= \frac{1+3+4+7+7+8+8+8}{8}" />
                  <span className="text-red-600 font-bold ml-2">← 所有數值相加</span>
                </div>
                <div className="ml-[4.5rem]">
                  <span className="text-red-600 font-bold text-sm">← 總共 8 個數字</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 w-16">中位數</span>
                  <Latex math="= \frac{7+7}{2} = 7" />
                </div>
              </div>

              <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="font-bold text-slate-800 w-16">眾數</span>
                  <Latex math="= 8" />
                  <span className="text-red-600 font-bold ml-2">← 出現得最多的數字</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="table-format" title="以表格形式呈現" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-slate-800 mb-2">亦可以以表格形式呈現</h3>
            <p className="text-sm text-slate-600 mb-3">例：下表顯示一組學生在暑假期間所閱讀的書本數量</p>
            
            <div className="overflow-x-auto mb-4 bg-white p-2 rounded shadow-sm">
              <table className="text-center border-collapse mx-auto">
                <tbody>
                  <tr>
                    <td className="border border-slate-400 p-2 bg-green-100 font-bold text-slate-800 w-24">書本數量</td>
                    <td className="border border-slate-400 p-2 w-[53px] h-[41px] min-w-[53px]">1</td>
                    <td className="border border-slate-400 p-2 w-[53px] h-[41px] min-w-[53px]">2</td>
                    <td className="border border-slate-400 p-2 w-[53px] h-[41px] min-w-[53px]">3</td>
                    <td className="border border-slate-400 p-2 w-[53px] h-[41px] min-w-[53px]">4</td>
                    <td className="border border-slate-400 p-2 w-[53px] h-[41px] min-w-[53px]">5</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 bg-green-100 font-bold text-green-800 w-24">
                      <div className="relative">
                        <span className="absolute -left-12 -top-4 text-green-700 font-bold text-xs" style={{ whiteSpace: 'nowrap' }}>出現數量<br/>↓</span>
                        頻數
                      </div>
                    </td>
                    <td className="border border-slate-400 p-2 w-[53px] h-[41px] min-w-[53px]">5</td>
                    <td className="border border-slate-400 p-2 w-[53px] h-[41px] min-w-[53px]">10</td>
                    <td className="border border-slate-400 p-2 w-[53px] h-[41px] min-w-[53px]">4</td>
                    <td className="border border-slate-400 p-2 w-[53px] h-[41px] min-w-[53px]">3</td>
                    <td className="border border-slate-400 p-2 border-r-4 w-[53px] h-[41px] min-w-[53px]">1</td>
                    <td className="border-none text-left pl-2 hidden sm:table-cell text-green-700 font-bold text-sm whitespace-nowrap">
                      ← 能加到總數：5+10+4+3+1 = 23
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="sm:hidden text-green-700 font-bold text-sm mt-2 text-center">能加到總數：5+10+4+3+1 = 23</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                  <span className="font-bold text-slate-800 w-16 mb-2 lg:mb-0">平均數：</span>
                  <div>
                    <div className="border-b-2 border-slate-800 text-center pb-1">
                      <Latex math="1 \times 5 + 2 \times 10 + 3 \times 4 + 4 \times 3 + 5 \times 1" inline />
                    </div>
                    <div className="text-center pt-1">
                      <Latex math="5 + 10 + 4 + 3 + 1" inline />
                    </div>
                  </div>
                  <div className="text-green-700 font-bold text-sm lg:ml-4 flex flex-col">
                    <span>← 上 × 下，加在一起！</span>
                    <span>← 總次數</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded shadow-sm border border-slate-200 relative">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-24">
                    <span className="font-bold text-slate-800">中位數：</span>
                    <span className="text-lg font-bold ml-2">2</span>
                  </div>
                  <div className="text-green-700 font-bold text-sm space-y-1">
                    <p>Step 1：總數 = ? (23)</p>
                    <p>Step 2：÷ 2 找最中間的位置 (23 ÷ 2 = 11.5)</p>
                    <p>Step 3：中間的位置是哪一格 (第11.5個在頻數10)</p>
                    <p>Step 4：答案！ (頻數10代表的是 2)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="font-bold text-slate-800 w-16">眾數：</span>
                  <span className="text-lg font-bold mr-2">2</span>
                  <span className="text-green-700 font-bold text-sm">
                    ← 直觀 (頻數10是最大頻數，背後代表兩本書)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="weighted-mean" title="加權平均數" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-slate-800 mb-1">加權平均數</h3>
            <p className="text-purple-700 font-bold text-sm mb-3">和上述計法相同</p>
            <p className="text-sm text-slate-600 mb-2">例：</p>
            
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="bg-white p-2 rounded shadow-sm overflow-x-auto w-full lg:w-auto">
                <table className="text-center border-collapse min-w-[200px]">
                  <thead>
                    <tr className="bg-orange-100">
                      <th className="border border-slate-400 p-2 font-bold w-24"></th>
                      <th className="border border-slate-400 p-2 font-bold w-20">分數 (分)</th>
                      <th className="border border-slate-400 p-2 font-bold w-16">權</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-slate-400 p-2 text-left bg-orange-50/50">普通話</td>
                      <td className="border border-slate-400 p-2">78</td>
                      <td className="border border-slate-400 p-2">3</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 text-left bg-orange-50/50">中國歷史</td>
                      <td className="border border-slate-400 p-2">72</td>
                      <td className="border border-slate-400 p-2">3</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 text-left bg-orange-50/50">音樂</td>
                      <td className="border border-slate-400 p-2">56</td>
                      <td className="border border-slate-400 p-2">2</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 text-left bg-orange-50/50">視覺藝術</td>
                      <td className="border border-slate-400 p-2">90</td>
                      <td className="border border-slate-400 p-2">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-white p-4 rounded shadow-sm border border-slate-200 flex-1">
                <p className="font-bold text-slate-800 mb-2">加權平均數：</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <div className="border-b-2 border-slate-800 text-center pb-1 text-blue-700 font-bold whitespace-nowrap pt-1 px-2">
                      78 × 3 + 72 × 3 + 56 × 2 + 90 × 2
                    </div>
                    <div className="text-center pt-1 text-blue-700 font-bold px-2">
                      3 + 3 + 2 + 2
                    </div>
                  </div>
                  <div className="text-green-700 font-bold text-sm space-y-2">
                    <p>← 左 × 右 / 上 × 下 再相加</p>
                    <p>← 權相加</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};
