import React, { useRef } from 'react';
import { CollapsibleSection, Latex, MathDisplay } from './shared';

// ========================================
// 聯立方程 - 計算機使用 (高中甲一)
// ========================================
export const SimEqCalculatorNotes = ({ activeSub }) => {
  const s1 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">聯立方程</h1>
        <p className="text-slate-600">CASIO fx-50FH II 計算機程式</p>
      </div>

      <CollapsibleSection id="calculator" title="計算機使用（Prog 01）" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-6">
          {/* 適用範圍 */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center border-2 border-blue-400">
            <p className="text-sm text-gray-600 mb-2">📟 CASIO fx-50FH II — Prog 01：解聯立二元一次方程</p>
            <div className="text-lg font-bold text-blue-900 flex items-center justify-center gap-3">
              <Latex math="\begin{cases} Ax + By = C \\ Dx + Ey = F \end{cases}" />
            </div>
          </div>

          {/* 特殊符號 */}
          <div>
            <h3 className="text-blue-900 font-bold mb-3 border-l-4 border-blue-500 pl-3">⌨️ 特殊符號輸入方法</h3>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { symbol: '?', keys: ['SHIFT', '3', '1'] },
                  { symbol: '→', keys: ['SHIFT', '3', '2'] },
                  { symbol: ':', keys: ['SHIFT', '3', '3'] },
                  { symbol: '◢', keys: ['SHIFT', '3', '4'] },
                  { symbol: '⁻¹', keys: ['x⁻¹'] },
                  { symbol: '┘', keys: ['a b/c'] },
                  { symbol: 'A', keys: ['ALPHA', 'A'], symbolColor: 'text-red-600' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200">
                    <span className={`w-8 text-center text-lg font-bold ${item.symbolColor || 'text-blue-900'}`}>{item.symbol}</span>
                    <div className="flex flex-wrap gap-1">
                      {item.keys.map((key, i) => (
                        <span key={i} className={`px-2 py-1 rounded text-xs font-bold shadow-sm ${
                          key === 'SHIFT' ? 'bg-gray-300 text-yellow-700' :
                          key === 'ALPHA' ? 'bg-gray-300 text-red-600' :
                          'bg-gray-900 text-white'
                        }`}>{key}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 輸入程式 */}
          <div>
            <h3 className="text-blue-900 font-bold mb-3 border-l-4 border-blue-500 pl-3">📝 輸入程式</h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <strong>進入程式編輯模式</strong>
              </div>
              <div className="flex flex-wrap gap-1 items-center text-sm">
                <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded text-xs font-bold">MODE</span>
                <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded text-xs font-bold">MODE</span>
                <span className="text-blue-900 font-bold">→</span>
                <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">6</span>
                <span className="text-gray-500 text-xs">(PRGM)</span>
                <span className="text-blue-900 font-bold">→</span>
                <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">1</span>
                <span className="text-gray-500 text-xs">(EDIT)</span>
                <span className="text-blue-900 font-bold">→</span>
                <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">1</span>
                <span className="text-gray-500 text-xs">(Prog 1)</span>
                <span className="text-blue-900 font-bold">→</span>
                <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">1</span>
                <span className="text-gray-500 text-xs">(COMP)</span>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <strong>輸入以下程式碼</strong>
              </div>
              <div className="bg-black rounded-lg p-3 font-sans text-green-400 text-sm overflow-x-auto">
                <div>?→A : ?→B : ?→C : ?→D : ?→X : ?→Y :</div>
                <div>AX－DB→M : M⁻¹(CX－YB→X◢</div>
                <div>M⁻¹(AY－DC→Y</div>
                <div className="text-gray-500 text-right text-xs mt-2">（共 53 步）</div>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <strong>確認並離開</strong>
              </div>
              <p className="text-sm">完成輸入後，檢查計算機是否顯示 <strong className="text-blue-900">053</strong>。如是，按 <span className="px-2 py-1 bg-red-600 text-white rounded text-xs font-bold">ON</span> 離開。如否，請檢查是否輸入錯漏。</p>
            </div>
          </div>

          {/* 使用方法 */}
          <div>
            <h3 className="text-blue-900 font-bold mb-3 border-l-4 border-blue-500 pl-3">🎯 使用方法</h3>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-400">
              <p className="font-bold text-center mb-3">輸入順序：</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th colSpan="3" className="p-2 border border-blue-700">第一條方程：Ax + By = C</th>
                      <th colSpan="3" className="p-2 border border-blue-700">第二條方程：Dx + Ey = F</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white"><td className="p-2 border text-center">A</td><td className="p-2 border text-center">B</td><td className="p-2 border text-center">C</td><td className="p-2 border text-center">D</td><td className="p-2 border text-center">E</td><td className="p-2 border text-center">F</td></tr>
                    <tr className="bg-gray-50 text-xs text-gray-600"><td className="p-2 border text-center">x的係數</td><td className="p-2 border text-center">y的係數</td><td className="p-2 border text-center">常數</td><td className="p-2 border text-center">x的係數</td><td className="p-2 border text-center">y的係數</td><td className="p-2 border text-center">常數</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-center mt-3 text-sm"><strong>輸出：</strong>先顯示 <span className="text-red-600 font-bold">x</span>，按 EXE 後顯示 <span className="text-red-600 font-bold">y</span></p>
            </div>
          </div>

          {/* 範例 */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-500">
            <h4 className="text-green-700 font-bold mb-3">📌 範例：解聯立方程</h4>
            <div className="bg-white p-3 rounded-lg text-center mb-4 border border-green-400">
              <div className="text-lg font-sans flex items-center justify-center gap-3">
                <Latex math="\begin{cases} x + 2y = 10 \\ 3x - 4y = -6 \end{cases}" />
              </div>
            </div>
            <p className="font-bold text-sm mb-2">步驟一：執行程式</p>
            <div className="bg-white p-2 rounded mb-3">
              <span className="px-2 py-1 bg-orange-500 text-white rounded text-xs font-bold">Prog</span>
              <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold ml-1">1</span>
              <span className="text-gray-500 text-xs ml-2">→ 計算機顯示「A?」</span>
            </div>
            <p className="font-bold text-sm mb-2">步驟二：依次輸入係數</p>
            <div className="bg-white p-2 rounded space-y-1 text-sm">
              {[
                { keys: ['1'], label: '（A = 1）' }, { keys: ['2'], label: '（B = 2）' },
                { keys: ['1', '0'], label: '（C = 10）' }, { keys: ['3'], label: '（D = 3）' },
                { keys: ['(−)', '4'], label: '（E = −4）' }, { keys: ['(−)', '6'], label: '（F = −6）' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-1">
                  {item.keys.map((k, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">{k}</span>
                  ))}
                  <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">EXE</span>
                  <span className="text-gray-500 text-xs">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-100 p-3 rounded-lg mt-3 text-center border border-blue-300">
              <p>計算機顯示 <span className="text-2xl font-bold text-blue-700">2.8</span> <span className="text-sm text-gray-600">（x = 2.8）</span></p>
              <p className="mt-2">按 <span className="px-2 py-1 bg-gray-900 text-white rounded text-xs font-bold">EXE</span> 後顯示 <span className="text-2xl font-bold text-blue-700">3.6</span> <span className="text-sm text-gray-600">（y = 3.6）</span></p>
              <div className="mt-3 pt-3 border-t border-blue-300">✅ <strong>答案：x = 2.8，y = 3.6</strong></div>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="bg-red-50 border-2 border-red-400 p-3 rounded-lg">
            <div className="font-bold text-red-700 mb-2">⚠️ 注意</div>
            <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
              <li>輸入負數時要用 <span className="px-1 bg-gray-900 text-white rounded text-xs">(−)</span> 鍵（負號鍵），不是減號</li>
              <li>係數為 1 時也要輸入 <span className="px-1 bg-gray-900 text-white rounded text-xs">1</span></li>
              <li>注意輸入順序：先 x 係數，再 y 係數，最後常數</li>
              <li>如方程要整理（如 4y + 3x = 10），先改寫成 3x + 4y = 10</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-400 p-3 rounded-lg">
            <div className="font-bold text-yellow-700 mb-2">💡 提示</div>
            <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
              <li>如果顯示「Math ERROR」，表示方程無解或有無限多解</li>
              <li>要重新計算，只需按 <span className="px-1 bg-orange-500 text-white rounded text-xs">Prog</span> <span className="px-1 bg-gray-900 text-white rounded text-xs">1</span> 再次執行</li>
              <li>程式會永久保存，關機後仍可使用</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// MC 課題 - 圖形比例 (高中甲一)
// ========================================
export const MCTopicsNotes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">圖形比例 (MC限定課題)</h1>
        <p className="text-slate-600">學習圖形比例，以及利用設 k 求代數比例</p>
      </div>

      <CollapsibleSection id="shape-proportion" title="圖形比例 (較深)" num={1} color="green" activeSub={activeSub} sectionRef={s1}>
        <div className="pb-4">
          {/* 問題內容 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 mb-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-6 mb-4 items-center">
              <div className="flex-1 text-slate-800 leading-relaxed">
                <p className="mb-4 text-base">
                  圖中，ABCD 為一梯形且 AD // BC 及 AD : BC = 2 : 3。設 E 為 BC 的中點。AC 與 DE 相交於 F。
                  若 <Latex math="\Delta CEF" /> 的面積為 36 cm²，則梯形 ABCD 的面積為
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-md mb-2">
                  <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">A. 216 cm²</div>
                  <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">B. 264 cm²</div>
                  <div className="px-3 py-2 rounded-lg bg-green-50 border border-green-300 text-green-800 font-bold">C. 280 cm² ✓</div>
                  <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">D. 320 cm²</div>
                </div>
              </div>
              <div className="w-full max-w-[320px] flex-shrink-0 mx-auto">
                <svg viewBox="0 0 280 172" className="block w-full overflow-visible mx-auto">
                  {/* 梯形邊線 */}
                  <polygon points="65,30 185,30 215,125 35,125" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinejoin="round" />
                  {/* 對角線 */}
                  <line x1="65" y1="30" x2="215" y2="125" stroke="#1e293b" strokeWidth="1.5" />
                  <line x1="185" y1="30" x2="125" y2="125" stroke="#1e293b" strokeWidth="1.5" />
                  
                  {/* 頂點標籤 */}
                  <text x="50" y="27" fontSize="12" fontWeight="600" fontFamily="sans-serif" fill="#1e293b">A</text>
                  <text x="192" y="27" fontSize="12" fontWeight="600" fontFamily="sans-serif" fill="#1e293b">D</text>
                  <text x="20" y="132" fontSize="12" fontWeight="600" fontFamily="sans-serif" fill="#1e293b">B</text>
                  <text x="222" y="132" fontSize="12" fontWeight="600" fontFamily="sans-serif" fill="#1e293b">C</text>
                  <text x="125" y="139" textAnchor="middle" fontSize="12" fontWeight="600" fontFamily="sans-serif" fill="#1e293b">E</text>
                  <text x="157" y="86" fontSize="12" fontWeight="600" fontFamily="sans-serif" fill="#1e293b">F</text>

                  {/* 比例標記 (藍色) - 上底 2（無底線） */}
                  <text x="125" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">2</text>
                  
                  {/* BE 與 EC 長度比例 1.5 */}
                  <text x="80" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">1.5</text>
                  <text x="170" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">1.5</text>
                  
                  {/* 下底 BC 總比例大括號與「3」 */}
                  <path d="M 35 142 Q 35 150 75 150 L 115 150 Q 125 150 125 156 Q 125 150 135 150 L 175 150 Q 215 150 215 142" fill="none" stroke="#2563eb" strokeWidth="1.2" />
                  <text x="125" y="169" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">3</text>

                  {/* 平行箭頭 (紅色) - 分別置於 AD 及 BC 上 */}
                  <polyline points="121,26 129,30 121,34" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="106,121 114,125 106,129" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* 等長刻痕 (青藍色雙線，位於 BE 與 EC 中點垂直線段) */}
                  <line x1="77" y1="120" x2="77" y2="130" stroke="#0ea5e9" strokeWidth="1.5" />
                  <line x1="83" y1="120" x2="83" y2="130" stroke="#0ea5e9" strokeWidth="1.5" />
                  <line x1="167" y1="120" x2="167" y2="130" stroke="#0ea5e9" strokeWidth="1.5" />
                  <line x1="173" y1="120" x2="173" y2="130" stroke="#0ea5e9" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* 技巧詳解卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200 mt-2">
              
              {/* 技巧 1 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-emerald-800 mb-3 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  技巧 1：找相似 <Latex math="\Delta" /> 比例
                </h3>
                
                <div className="w-full max-w-[280px] mx-auto mb-4">
                  <svg viewBox="0 0 280 160" className="block w-full overflow-visible mx-auto">
                    <defs>
                      <marker id="arrow-fn" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
                      </marker>
                    </defs>

                    {/* 底圖梯形 */}
                    <polygon points="65,30 185,30 215,125 35,125" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="65" y1="30" x2="215" y2="125" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="185" y1="30" x2="125" y2="125" stroke="#cbd5e1" strokeWidth="1" />
                    
                    {/* 高亮相似三角形：ADF (紫) 與 CEF (藍) */}
                    <polygon points="65,30 185,30 150.7,84.3" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round" />
                    <polygon points="125,125 215,125 150.7,84.3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" strokeLinejoin="round" />
                    
                    {/* 頂點文字 */}
                    <text x="50" y="27" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">A</text>
                    <text x="192" y="27" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">D</text>
                    <text x="20" y="132" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">B</text>
                    <text x="222" y="132" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">C</text>
                    <text x="125" y="139" textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">E</text>
                    <text x="156" y="86" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">F</text>

                    {/* 平行箭頭 (紅色) */}
                    <polyline points="121,26 129,30 121,34" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* 數據標籤 */}
                    <text x="125" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">2</text>
                    
                    <text x="170" y="142" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">1.5</text>
                    
                    <text x="163" y="112" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1" fontFamily="sans-serif">36 cm²</text>
                    
                    {/* 漏斗組合指示箭頭與文字 */}
                    <path d="M 230 46 C 205 46 195 56 186 68" fill="none" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-fn)" />
                    <text x="234" y="42" fontSize="11" fontFamily="sans-serif" fill="#334155" fontWeight="bold">漏斗組合：</text>
                    <text x="234" y="58" fontSize="11" fontFamily="sans-serif" fill="#334155" fontWeight="bold">上下Δ相似</text>
                  </svg>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-slate-700 mb-2">透過長度比例得出面積比例：</p>
                    <div className="bg-white rounded-lg border border-slate-200 p-3 my-2 text-center">
                      <Latex math="\begin{aligned} \left(\frac{1.5}{2}\right)^2 &= \frac{36}{x} \\ x &= \frac{36 \times 4}{1.5^2} \\ &= 64 \end{aligned}" block />
                    </div>
                  </div>
                  <p className="mt-3 pt-2 border-t border-slate-200 text-sm text-center font-bold text-emerald-700">
                    ∴ <Latex math="\Delta ADF" /> 面積 = 64
                  </p>
                </div>
              </div>

              {/* 技巧 2 */}
              <div className="flex flex-col md:border-l md:border-slate-200 md:pl-6">
                <h3 className="font-bold text-emerald-800 mb-3 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  技巧 2：同高 <Latex math="\Delta" />
                </h3>
                
                <div className="w-full max-w-[280px] mx-auto mb-4">
                  <svg viewBox="0 0 280 160" className="block w-full overflow-visible mx-auto">
                    <defs>
                      <marker id="arrow-blue-diag" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#1d4ed8" />
                      </marker>
                    </defs>

                    {/* 底圖梯形 */}
                    <polygon points="65,30 185,30 215,125 35,125" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="65" y1="30" x2="215" y2="125" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="185" y1="30" x2="125" y2="125" stroke="#cbd5e1" strokeWidth="1" />
                    
                    {/* 高亮同高三角形：ADF (紫線)、CDF (紅線) 與 CEF (淺藍線) */}
                    <polygon points="65,30 185,30 150.7,84.3" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round" />
                    <polygon points="185,30 215,125 150.7,84.3" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round" />
                    <polygon points="125,125 215,125 150.7,84.3" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round" />
                    
                    {/* 頂點文字 */}
                    <text x="50" y="27" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">A</text>
                    <text x="192" y="27" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">D</text>
                    <text x="20" y="132" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">B</text>
                    <text x="222" y="132" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">C</text>
                    <text x="125" y="139" textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">E</text>
                    <text x="156" y="86" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="#64748b">F</text>
                    
                    {/* 上底 AD 標籤 2 */}
                    <text x="125" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">2</text>

                    {/* 對角線 AC 上的線段比：AF 對應 2，FC 對應 1.5 */}
                    <path d="M 85,18 Q 110,26 102,48" fill="none" stroke="#1d4ed8" strokeWidth="1.3" markerEnd="url(#arrow-blue-diag)" />
                    <text x="108" y="38" fontSize="13" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">2</text>

                    <path d="M 198,136 Q 192,118 186,110" fill="none" stroke="#1d4ed8" strokeWidth="1.3" markerEnd="url(#arrow-blue-diag)" />
                    <text x="204" y="142" fontSize="13" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">1.5</text>
                    
                    {/* 底邊 EC 的 1.5 標記 */}
                    <text x="170" y="142" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">1.5</text>
                  </svg>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-slate-700 mb-2">
                      AF : FC = 2 : 1.5 <span className="text-xs font-normal text-slate-500">（DF 為公共高）</span>
                    </p>
                    <div className="bg-white rounded-lg border border-slate-200 p-3 my-2 text-center">
                      <Latex math="\begin{aligned} \Delta ADF \text{ 面積} : \Delta CDF \text{ 面積} &= 2 : 1.5 \\ &= 64 : 48 \end{aligned}" block />
                    </div>
                  </div>
                  <p className="mt-3 pt-2 border-t border-slate-200 text-sm text-center font-bold text-emerald-700">
                    ∴ <Latex math="\Delta CDF" /> 面積 = 48
                  </p>
                </div>
              </div>
            </div>

            {/* 解題思路整合 */}
            <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <h4 className="font-bold text-slate-800 mb-3 text-base flex items-center gap-2">
                <span className="bg-emerald-600 text-white rounded-full w-5 h-5 inline-flex items-center justify-center text-xs font-bold">3</span>
                解題思路整合
              </h4>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                  <span className="font-bold text-emerald-600 shrink-0">Step 1</span>
                  <div>
                    得出 <Latex math="\Delta ADF" /> 面積 = 64 及 <Latex math="\Delta CDF" /> 面積 = 48：
                    <div className="font-bold text-slate-800 mt-1">
                      <Latex math="\Delta ACD \text{ 面積} = 64 + 48 = 112" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                  <span className="font-bold text-emerald-600 shrink-0">Step 2</span>
                  <div>
                    已知 AD // BC 且底邊之比 AD : BC = 2 : 3。
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                  <span className="font-bold text-emerald-600 shrink-0">Step 3</span>
                  <div>
                    <Latex math="\Delta ABC" /> 與 <Latex math="\Delta ACD" /> 共用相同的高（即梯形的高），因此面積比亦為 3 : 2：
                    <div className="font-bold text-slate-800 mt-1">
                      <Latex math="\Delta ABC \text{ 面積} = 112 \div 2 \times 3 = 168" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                  <span className="font-bold text-emerald-700 shrink-0">結論</span>
                  <div className="text-emerald-900 font-medium">
                    梯形 ABCD 總面積 = <Latex math="112 + 168 =" /> <strong className="text-lg text-emerald-800 font-bold ml-1">280 cm²</strong>
                    <span className="ml-3 font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">✓ 選項 C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="algebraic-proportion" title="代數比例：設 k 求比值" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-5">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="font-bold text-blue-900 mb-2">題目</p>
            <p className="text-slate-800 leading-relaxed">
              設 <Latex math="a" />、<Latex math="b" /> 及 <Latex math="c" /> 均為非零的數，使得
              <Latex math="5a=6c" /> 及 <Latex math="\frac{2b+7c}{b+c}=4" />。求
              <Latex math="\frac{5a+8b}{2b+3c}" />。
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="font-bold text-amber-900 mb-2">解題方法：先找出 a : b : c</p>
            <p className="text-slate-700">
              目標式中的分子和分母都是 <Latex math="a,b,c" /> 的一次式，因此只要找出三個數的比例，不必求出它們的實際值。
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-emerald-800 mb-3">步驟 1：由第一個條件用 k 表示 a、c</h3>
            <div className="text-blue-900 font-bold overflow-x-auto">
              <Latex math="\begin{aligned} 5a &= 6c \\ a &= 6k,\quad c = 5k \end{aligned}" block />
            </div>
            <p className="text-sm text-slate-600 mt-2">因為 <Latex math="a:c=6:5" />，所以用同一個非零常數 <Latex math="k" /> 表示兩者。</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-violet-800 mb-3">步驟 2：交叉相乘，找出 b 與 c 的關係</h3>
            <div className="text-blue-900 font-bold overflow-x-auto">
              <Latex math="\begin{aligned} \frac{2b+7c}{b+c} &= 4 \\ 2b+7c &= 4(b+c) \\ 2b+7c &= 4b+4c \\ 3c &= 2b \\ b &= \frac{3}{2}c = \frac{15}{2}k \end{aligned}" block />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-indigo-800 mb-3">步驟 3：寫出整數連比</h3>
            <div className="text-blue-900 font-bold overflow-x-auto">
              <Latex math="\begin{aligned} a:b:c &= 6k:\frac{15}{2}k:5k \\ &= 6:\frac{15}{2}:5 \\ &= 12:15:10 \end{aligned}" block />
            </div>
            <p className="text-sm text-slate-600 mt-2">比例中有分數時，把每一項同乘 2，化成整數比；共同因數 <Latex math="k" /> 可以約去。</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-900 mb-3">步驟 4：用比例代回目標式</h3>
            <div className="text-green-900 font-bold overflow-x-auto">
              <Latex math="\begin{aligned} a:b:c &= 12:15:10 \quad\Rightarrow\quad a=12k,\ b=15k,\ c=10k \\ \frac{5a+8b}{2b+3c} &= \frac{5(12k)+8(15k)}{2(15k)+3(10k)} \\ &= \frac{60k+120k}{30k+30k} = \frac{180k}{60k} = 3 \end{aligned}" block />
            </div>
            <p className="mt-3 font-bold text-green-800">答案：3</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-bold text-red-800">記住</p>
            <p className="text-red-800 mt-1">
              先逐條利用已知條件找比例；遇到分式方程先交叉相乘。最後若要求的是同次齊次式（分子、分母的次數相同），代入連比時共同的 <Latex math="k" /> 會約去。
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};
