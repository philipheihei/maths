import React, { useRef } from 'react';
import { Latex, CollapsibleSection } from './shared';

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

      <CollapsibleSection id="extract-common" title="提取公因式" num={1} color="purple" activeSub={activeSub} sectionRef={s1}>
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

      <CollapsibleSection id="grouping" title="併項法（分組因式分解）" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
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
            <p className="text-sm text-slate-700 mb-3">如沒相同代數/因數，出動 <span className="bg-green-200 px-2 py-0.5 rounded font-mono">FMLA 01</span>（二次方）</p>
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
// CH7 三角恆等式 (F3)
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
                    <div className="text-sm">
                      <Latex math="\begin{aligned} 12^2 + RQ^2 &= 13^2 \\\\ RQ &= 5 \end{aligned}" block left />
                    </div>
                    <p className="text-green-600 mt-3 text-sm">已知 3 邊長度，可按定義寫出 <span className="text-purple-600 font-bold">sin θ / cos θ / tan θ</span></p>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
                      <style>{`.math-line { stroke: #5e35b1; stroke-width: 4; fill: none; stroke-linecap: round; stroke-linejoin: round; }
                        .math-text { font-family: sans-serif; font-size: 24px; fill: #5e35b1; font-weight: bold; }
                        .math-label { font-family: sans-serif; font-size: 20px; fill: #5e35b1; }`}</style>
                      <path d="M 40 200 L 280 200 L 280 100 Z" className="math-line" />
                      <path d="M 280 180 L 260 180 L 260 200" className="math-line" strokeWidth="3" />
                      <path d="M 280 135 Q 265 135 258 118" className="math-line" strokeWidth="2" />
                      <text x="20" y="210" className="math-text">P</text>
                      <text x="290" y="215" className="math-text">Q</text>
                      <text x="290" y="90" className="math-text">R</text>
                      <text x="150" y="230" className="math-text">12</text>
                      <text x="300" y="160" className="math-text">5</text>
                      <text x="130" y="130" className="math-text">13</text>
                      <text x="245" y="155" className="math-text">θ</text>
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
              <div className="flex flex-wrap gap-6 items-start">
                <div className="flex-1 min-w-[200px]">
                  <p className="text-slate-700 mb-2">1. 如果題目沒提供 △ 圖像，需自行繪畫</p>
                  <p className="text-slate-700 mb-3">2. 利用畢氏定理找未知邊的長度</p>
                  <div className="text-green-600">
                    <Latex math="\begin{aligned} x^2 + 3^2 &= 7^2 \\\\ x^2 &= 40 \\\\ x &= \sqrt{40} \end{aligned}" block left />
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                    <style>{`.line { fill: none; stroke: #0047AB; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
                    .angle-mark { fill: none; stroke: #0047AB; stroke-width: 3; }
                    .text-green-svg { font-family: sans-serif; font-size: 32px; fill: #008000; font-weight: bold; }
                    .text-blue-svg { font-family: sans-serif; font-size: 32px; fill: #00BFFF; font-weight: bold; }
                    .text-angle { font-family: serif; font-size: 28px; fill: #0047AB; font-style: italic; }`}</style>
                    <path d="M 90 200 L 300 200 L 300 100 Z" className="line" />
                    <polyline points="280,200 280,180 300,180" className="angle-mark" />
                    <path d="M 125 200 A 35 35 0 0 0 118 187" className="angle-mark" strokeWidth="2" />
                    <text x="135" y="195" className="text-angle">θ</text>
                    <text x="180" y="130" className="text-green-svg" textAnchor="middle">7</text>
                    <text x="320" y="160" className="text-green-svg" textAnchor="start">3</text>
                    <text x="195" y="240" className="text-blue-svg" textAnchor="middle">x</text>
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
      <text x="5" y="15" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">A</text>
      <text x="5" y="135" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">B</text>
      <text x="182" y="135" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">C</text>
      <text x="182" y="15" fontFamily="Times New Roman, serif" fontSize="20" fontStyle="italic" fill="black" fontWeight="bold">D</text>
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
        <path d="M 90 50 A 40 40 0 0 1 78.28 78.28" /><path d="M 78.28 78.28 A 40 40 0 0 1 50 90" />
        <path d="M 350 90 A 40 40 0 0 1 321.72 78.28" /><path d="M 321.72 78.28 A 40 40 0 0 1 310 50" />
        <path d="M 310 350 A 40 40 0 0 1 321.72 321.72" /><path d="M 321.72 321.72 A 40 40 0 0 1 350 310" />
        <path d="M 50 310 A 40 40 0 0 1 78.28 321.72" /><path d="M 78.28 321.72 A 40 40 0 0 1 90 350" />
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
              <line x1="55" y1="35" x2="65" y2="45" stroke="#333" strokeWidth="1.5" />
              <line x1="35" y1="85" x2="45" y2="95" stroke="#333" strokeWidth="1.5" />
              <line x1="115" y1="35" x2="125" y2="45" stroke="#333" strokeWidth="1.5" />
              <line x1="130" y1="85" x2="140" y2="95" stroke="#333" strokeWidth="1.5" />
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
              <line x1="58" y1="38" x2="62" y2="42" stroke="#d32f2f" strokeWidth="2" />
              <line x1="67" y1="78" x2="71" y2="82" stroke="#d32f2f" strokeWidth="2" />
              <line x1="118" y1="38" x2="122" y2="42" stroke="#d32f2f" strokeWidth="2" />
              <line x1="127" y1="78" x2="131" y2="82" stroke="#d32f2f" strokeWidth="2" />
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
