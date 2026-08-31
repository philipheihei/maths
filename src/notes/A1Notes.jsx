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
              <span className="text-5xl leading-none">{`{`}</span>
              <div className="text-left"><div>Ax + By = C</div><div>Dx + Ey = F</div></div>
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
  const s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">MC 課題</h1>
        <p className="text-slate-600">圖形比例進階技巧</p>
      </div>

      <CollapsibleSection id="shape-proportion" title="4. 圖形比例 (較深)" num={4} color="green" activeSub={activeSub} sectionRef={s4}>
        <div className="pb-4">
          {/* 問題內容 */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 mb-4">
              <div className="flex-1 text-slate-800 leading-relaxed">
                <p className="mb-4">
                  圖中，ABCD 為一梯形且 AD // BC 及 AD:BC = 2:3。設 E 為 BC 的中點。AC 與 DE 相交於 F。
                  若 <Latex math="\Delta CEF" inline /> 的面積為 36 cm<sup className="text-xs">2</sup>，則梯形 ABCD 的面積為
                </p>
                <div className="pl-6 space-y-2 font-serif mb-4">
                  <div>A. 216 cm<sup className="text-xs">2</sup></div>
                  <div>B. 264 cm<sup className="text-xs">2</sup></div>
                  <div className="font-bold text-green-700 bg-green-50 inline-block px-2 py-1 rounded">C. 280 cm<sup className="text-xs">2</sup></div>
                  <div>D. 320 cm<sup className="text-xs">2</sup></div>
                </div>
              </div>
              <div className="w-[240px] flex-shrink-0 mx-auto">
                <svg viewBox="0 0 200 150" className="w-[240px] overflow-visible mx-auto">
                  {/* 梯形邊線 */}
                  <polygon points="60,20 140,20 160,120 40,120" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinejoin="round" />
                  {/* 中間輔助線 */}
                  <line x1="60" y1="20" x2="160" y2="120" stroke="#1e293b" strokeWidth="1.5" />
                  <line x1="140" y1="20" x2="100" y2="120" stroke="#1e293b" strokeWidth="1.5" />
                  
                  {/* 標籤 */}
                  <text x="50" y="18" fontSize="12" fontFamily="serif" fill="#1e293b">A</text>
                  <text x="146" y="18" fontSize="12" fontFamily="serif" fill="#1e293b">D</text>
                  <text x="30" y="135" fontSize="12" fontFamily="serif" fill="#1e293b">B</text>
                  <text x="166" y="135" fontSize="12" fontFamily="serif" fill="#1e293b">C</text>
                  <text x="96" y="135" fontSize="12" fontFamily="serif" fill="#1e293b">E</text>
                  <text x="108" y="68" fontSize="12" fontFamily="serif" fill="#1e293b">F</text>

                  {/* 比例標記 (藍色) */}
                  <line x1="60" y1="12" x2="140" y2="12" stroke="#1d4ed8" strokeWidth="1.5" />
                  <polygon points="100,12 95,8 95,16" fill="#1d4ed8" />
                  <text x="100" y="8" fontSize="12" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">2</text>
                  <text x="68" y="112" fontSize="14" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">1.5</text>
                  <text x="132" y="112" fontSize="14" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">1.5</text>
                  <path d="M 45 130 C 70 145 155 145 155 130" fill="none" stroke="#3b82f6" strokeWidth="1" />
                  <text x="98" y="145" fontSize="14" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">3</text>

                  {/* 平行箭頭 (紅色) */}
                  <polyline points="95,16 105,20 95,24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="95,116 105,120 95,124" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* 等長標記 (藍色雙線) */}
                  <line x1="68" y1="117" x2="72" y2="123" stroke="#1d4ed8" strokeWidth="1.5" />
                  <line x1="72" y1="117" x2="76" y2="123" stroke="#1d4ed8" strokeWidth="1.5" />
                  <line x1="128" y1="117" x2="132" y2="123" stroke="#1d4ed8" strokeWidth="1.5" />
                  <line x1="132" y1="117" x2="136" y2="123" stroke="#1d4ed8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* 解題技巧分隔線 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200 mt-2">
              
              {/* 技巧1 */}
              <div>
                <h3 className="font-bold text-green-700 mb-4 text-lg">技巧 1：找相似 <Latex math="\Delta" inline /> 比例</h3>
                
                <div className="w-[240px] mx-auto mb-4 relative">
                  <svg viewBox="0 0 200 150" className="w-[240px] overflow-visible mx-auto">
                    {/* 淡色底圖梯形 */}
                    <polygon points="60,20 140,20 160,120 40,120" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="60" y1="20" x2="160" y2="120" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="140" y1="20" x2="100" y2="120" stroke="#cbd5e1" strokeWidth="1" />
                    
                    {/* 重點高亮: ADF 與 CEF */}
                    <polygon points="60,20 140,20 117.1,77.1" fill="none" stroke="#7e22ce" strokeWidth="2" strokeLinejoin="round" />
                    <polygon points="100,120 160,120 117.1,77.1" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round" />
                    
                    {/* 頂點文字 */}
                    <text x="50" y="18" fontSize="11" fontFamily="serif" fill="#64748b">A</text>
                    <text x="146" y="18" fontSize="11" fontFamily="serif" fill="#64748b">D</text>
                    <text x="30" y="135" fontSize="11" fontFamily="serif" fill="#64748b">B</text>
                    <text x="166" y="135" fontSize="11" fontFamily="serif" fill="#64748b">C</text>
                    <text x="96" y="135" fontSize="11" fontFamily="serif" fill="#64748b">E</text>
                    <text x="108" y="68" fontSize="11" fontFamily="serif" fill="#64748b">F</text>

                    {/* 數據 */}
                    <line x1="60" y1="12" x2="140" y2="12" stroke="#1d4ed8" strokeWidth="1.5" />
                    <polygon points="100,12 95,8 95,16" fill="#1d4ed8" />
                    <text x="100" y="8" fontSize="12" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">2</text>
                    
                    <line x1="100" y1="128" x2="160" y2="128" stroke="#1d4ed8" strokeWidth="1.5" />
                    <polygon points="135,128 130,124 130,132" fill="#1d4ed8" />
                    <text x="135" y="142" fontSize="12" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">1.5</text>
                    
                    <text x="115" y="110" fontSize="11" fontWeight="bold" fill="#1e3a8a" fontFamily="sans-serif">36 cm²</text>
                    
                    {/* 漏斗組合指示 */}
                    <line x1="140" y1="48" x2="160" y2="48" stroke="#0f172a" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <text x="165" y="52" fontSize="12" fontFamily="sans-serif" fill="#0f172a" fontWeight="bold">漏斗組合：</text>
                    <text x="165" y="70" fontSize="12" fontFamily="sans-serif" fill="#0f172a" fontWeight="bold">上下Δ相似</text>
                    
                    {/* 直式箭頭指引列式 */}
                    <path d="M 80,60 Q 60,60 60,90 Q 60,120 70,120 Q 80,120 80,135" fill="none" stroke="#7e22ce" strokeWidth="1.5" markerEnd="url(#arrow-purple)" />
                    
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a" />
                      </marker>
                      <marker id="arrow-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7e22ce" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-purple-900">
                  <p className="font-bold mb-2">可透過長度比例得出面積比例：</p>
                  <div className="flex items-center justify-center py-2 text-xl">
                    <Latex math="\left(\frac{1.5}{2}\right)^2 = \frac{36}{x}" />
                  </div>
                  <div className="mt-2 text-slate-800 text-center text-lg">
                    <Latex math="x = \frac{36 \times 4}{1.5^2}" />
                    <br />
                    <div className="mt-1"><Latex math="x = 64" /></div>
                  </div>
                  <p className="mt-2 pt-2 border-t border-purple-200 text-sm text-center font-bold">
                    所以 <Latex math="\Delta ADF" inline /> 面積 = 64
                  </p>
                </div>
              </div>

              {/* 技巧2 */}
              <div className="border-l border-slate-200 pl-6">
                <h3 className="font-bold text-green-700 mb-4 text-lg">技巧 2：同高 <Latex math="\Delta" inline /></h3>
                
                <div className="w-[240px] mx-auto mb-4">
                  <svg viewBox="0 0 200 150" className="w-[240px] overflow-visible mx-auto">
                    {/* 淡色底圖梯形 */}
                    <polygon points="60,20 140,20 160,120 40,120" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="60" y1="20" x2="160" y2="120" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="140" y1="20" x2="100" y2="120" stroke="#cbd5e1" strokeWidth="1" />
                    
                    {/* 高亮同高三角形 (用紫色和紅色) */}
                    <polygon points="60,20 140,20 117.1,77.1" fill="none" stroke="#7e22ce" strokeWidth="2" strokeLinejoin="round" />
                    <polygon points="140,20 160,120 117.1,77.1" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round" />
                    
                     {/* F是交點，CEF 稍微維持淡藍代表已知的起始點 */}
                    <polygon points="100,120 160,120 117.1,77.1" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinejoin="round" />
                    
                    {/* 頂點文字 */}
                    <text x="50" y="18" fontSize="11" fontFamily="serif" fill="#64748b">A</text>
                    <text x="146" y="18" fontSize="11" fontFamily="serif" fill="#64748b">D</text>
                    <text x="30" y="135" fontSize="11" fontFamily="serif" fill="#64748b">B</text>
                    <text x="166" y="135" fontSize="11" fontFamily="serif" fill="#64748b">C</text>
                    <text x="96" y="135" fontSize="11" fontFamily="serif" fill="#64748b">E</text>
                    <text x="108" y="68" fontSize="11" fontFamily="serif" fill="#64748b">F</text>
                    
                    {/* 比例標記 - 對角線上的比重 */}
                    <path d="M 80,10 Q 100,20 95,45" fill="none" stroke="#1d4ed8" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
                    <text x="100" y="32" fontSize="14" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">2</text>

                    <path d="M 145,135 Q 140,110 135,110" fill="none" stroke="#1d4ed8" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
                    <text x="135" y="145" fontSize="14" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">1.5</text>
                    <text x="120" y="105" fontSize="14" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">1.5</text>

                    <text x="120" y="90" fontSize="16" fill="#1d4ed8" fontWeight="bold">↑</text>

                    <defs>
                      <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#1d4ed8" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                
                <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-red-900">
                  <p className="font-bold mb-2 font-sans text-lg text-slate-800">
                    AF : FC = 2 : 1.5 <span className="text-sm font-normal text-slate-500 ml-1">，DF 為兩 <Latex math="\Delta" inline /> 同高</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mb-2 font-bold mt-3">
                    <span className="text-xl">∴</span> 
                    <span className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded"><Latex math="\Delta ADF" inline /> 面積</span> : 
                    <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded"><Latex math="\Delta CDF" inline /> 面積</span> 
                  </div>
                  <div className="text-right font-bold text-slate-800 text-xl border-l-[3px] border-slate-300 ml-6 pl-4 my-2">
                    = 2 : 1.5
                    <div className="text-blue-700">= 64 : 48</div>
                  </div>
                  <p className="mt-4 pt-2 border-t border-red-200 text-sm text-center font-bold">
                    所以 <Latex math="\Delta CDF" inline /> 面積 = 48
                  </p>
                </div>
              </div>
            </div>

            {/* Hint / Final Computation  */}
            <div className="mt-8 p-5 bg-slate-50 border border-slate-300 rounded-lg shadow-inner">
              <h4 className="font-bold text-slate-800 mb-3 text-lg border-b border-slate-200 pb-2 flex items-center">
                <span className="bg-slate-700 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">3</span>
                解題思路整合
              </h4>
              <ol className="list-decimal list-inside space-y-3 text-[15px] text-slate-700 font-sans pl-2">
                <li>
                  得出 <Latex math="\Delta ADF" inline /> (64) 及 <Latex math="\Delta CDF" inline /> (48) 後，
                  <span className="font-bold bg-yellow-100 px-2 rounded">
                    <Latex math="\Delta ACD" inline /> 面積 = 64 + 48 = 112
                  </span>。
                </li>
                <li>因為 AD // BC 且它們為梯形的兩底邊，底邊長度比 AD : BC = 2 : 3。</li>
                <li>
                  <Latex math="\Delta ABC" inline /> 與 <Latex math="\Delta ACD" inline /> 共用相同的高（梯形高），所以面積比也是 3 : 2。
                  <div className="pl-6 text-blue-700 font-bold mt-1">
                    <div className="inline-block border-l-2 border-blue-400 pl-3">
                      112 ÷ 2 × 3 = 168
                    </div>
                  </div>
                </li>
                <li className="pt-2">
                  <strong className="text-slate-800">總面積</strong> = <Latex math="\Delta ACD" inline /> + <Latex math="\Delta ABC" inline /> = 112 + 168 = 
                  <span className="text-xl text-green-700 font-bold ml-2">280</span>。 
                  <span className="text-green-600 font-bold ml-2 inline-flex items-center bg-green-100 px-2 py-1 rounded">
                    <span className="mr-1">✓</span> C 選項
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};
