import React, { useRef, useEffect } from 'react';
import { Latex, MathDisplay, CollapsibleSection } from './shared';

export const CompoundInequalitiesNotes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);
  const s4 = useRef(null);
  const s5 = useRef(null);
  const s6 = useRef(null);

  useEffect(() => {
    const refs = {
      'basics': s1,
      'drawing': s2,
      'example-solving': s3,
      'other-formats': s4,
      'integer-bounds': s5,
      'quadratic-application': s6
    };
    if (activeSub && refs[activeSub]?.current) {
      setTimeout(() => {
        refs[activeSub].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeSub]);

  return (
    <div className="space-y-6">

      <CollapsibleSection id="basics" title="0. 基礎知識" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">數線上的開口與實心</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Latex math="\geq" /> / <Latex math="\leq" /> (包括等號)：
                <span className="font-bold text-teal-700">● 實心圓形黑點</span>
                <span className="bg-yellow-200 px-1 rounded">(有 `=` = 填滿)</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Latex math=">" /> / <Latex math="<" /> (不包括)：
                <span className="font-bold text-rose-500">○ 空心圓形點</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded border border-slate-200 text-sm shadow-sm">
              <p className="text-slate-600 mb-1">例子：<Latex math="x \geq 3" /></p>
              <NL_X_GE_3 />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 繪圖規格單 #1（可直接複製交給 @數學繪圖師）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
圖形名稱：數線例子 x >= 3
所在章節：F4Notes — 複合不等式，CollapsibleSection id="basics"
viewBox：400 × 100

點／線：
  - 水平數線（帶向右箭頭）
  - 刻度：2, 3, 4

標記：
  - 在 x=3 處有一個實心黑點 (●)
  - 從 x=3 出發有一條線引向上方，然後向右延伸（帶箭頭）
  - 標示 "x ≥ 3"

互動：無

對應手寫圖說明：Image 1 的第1部分
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}

      <CollapsibleSection id="drawing" title="1. 畫圖找答案" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-green-800 mb-3 text-lg border-b-2 border-green-200 pb-1">及 (AND) = 兩條線重疊</h3>
              
              <div className="bg-white p-3 rounded shadow-sm border border-slate-100 mb-3">
                <Latex math="x > 2" /> <span className="text-green-700 font-bold mx-2">及</span> <Latex math="x < 5" />
                
                {/* 📐 待繪製：[及 (AND) 重疊] — 繪製完成 */}
                <div className="mt-2 bg-white rounded-lg p-2 text-center text-slate-400 text-sm">
                  <NL_And_Overlap />
                </div>
                
                <p className="mt-2 text-center font-bold text-slate-800">
                  ans: <Latex math="2 < x < 5" />
                </p>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm border border-slate-100">
                <Latex math="x < 3" /> <span className="text-green-700 font-bold mx-2">及</span> <Latex math="x \geq 6" />
                
                {/* 📐 待繪製：[及 (AND) 不相交] — 繪製完成 */}
                <div className="mt-2 bg-white rounded-lg p-2 text-center text-slate-400 text-sm">
                  <NL_And_NoSol />
                </div>
                
                <p className="mt-2 text-center font-bold text-slate-800">
                  ans: <span className="text-red-600">無解 (No solution)</span>
                </p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-3 text-lg border-b-2 border-amber-200 pb-1">或 (OR) = 有線覆蓋的地方</h3>
              
              <div className="bg-white p-3 rounded shadow-sm border border-slate-100 mb-3">
                <Latex math="x > 2" /> <span className="text-amber-700 font-bold mx-2">或</span> <Latex math="x < 5" />
                
                {/* 📐 待繪製：[或 (OR) 全覆蓋] — 繪製完成 */}
                <div className="mt-2 bg-white rounded-lg p-2 text-center text-slate-400 text-sm">
                  <NL_Or_All />
                </div>
                
                <p className="mt-2 text-center font-bold text-slate-800">
                  ans: <span className="text-blue-600">所有實數 (All real numbers)</span>
                </p>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm border border-slate-100">
                <Latex math="x < 3" /> <span className="text-amber-700 font-bold mx-2">或</span> <Latex math="x \geq 6" />
                
                {/* 📐 待繪製：[或 (OR) 兩邊分開] — 繪製完成 */}
                <div className="mt-2 bg-white rounded-lg p-2 text-center text-slate-400 text-sm">
                  <NL_Or_Sep />
                </div>
                
                <p className="mt-2 text-center font-bold text-slate-800">
                  ans: <Latex math="x < 3" /> 或 <Latex math="x \geq 6" />
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </CollapsibleSection>

      {/* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 繪圖規格單 #2（可直接複製交給 @數學繪圖師）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
圖形名稱：AND 重疊、AND 無解、OR 全覆蓋、OR 分開
所在章節：F4Notes — 複合不等式，CollapsibleSection id="drawing"
四個獨立的小圖，建議每個 viewBox：250 × 80

每個圖都需要：
  - 水平數線
  - 根據該區塊的不等式畫線和開口/實心圓
  - 重疊部分可用半透明顏色標示（如需要）

對應手寫圖說明：Image 1 的第2部分（四種情況）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}

      <CollapsibleSection id="example-solving" title="2. 例子與解法" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-slate-600 font-bold mb-2 text-lg border-b pb-2">例子 e.g. 解複合不等式：</p>
            
            <div className="text-center font-bold text-slate-800 my-4 text-xl">
              <Latex math="4x + 1 \leq 13" /> <span className="text-green-600 mx-2">及</span> <Latex math="-x \leq 2x + 9" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-center mt-6 text-lg">
              <div>
                <MathDisplay latex="4x \leq 12" />
                <MathDisplay latex="x \leq 3" />
              </div>
              <div className="border-l border-slate-200">
                <MathDisplay latex="-x - 2x \leq 9" />
                <MathDisplay latex="-3x \leq 9" />
                <div className="relative inline-block mt-2">
                  <div className="bg-red-100 px-2 py-1 rounded inline-block">
                    <Latex math="x \geq -3" />
                  </div>
                  <div className="absolute text-xs text-red-600 top-full left-1/2 -translate-x-1/2 w-[160px] mt-1 font-bold">
                    ↑ 乘/除負數，要變號!
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-10">
               <span className="font-bold mr-4">結合：</span>
               <div className="bg-slate-50 p-2 rounded w-64 text-center">
                 {/* 📐 待繪製：[x <= 3 及 x >= -3 的數線] — 繪製完成 */}
                 <div className="bg-white rounded-lg p-2 text-center text-slate-400 text-sm min-h-[60px]">
                    <NL_Combined_Ex />
                 </div>
               </div>
            </div>

            <div className="bg-green-100 text-green-800 p-3 rounded mt-4 text-center font-bold text-lg">
              <span className="mr-2">ans:</span> <Latex math="-3 \leq x \leq 3" />
            </div>

          </div>
        </div>
      </CollapsibleSection>

      {/* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 繪圖規格單 #3（可直接複製交給 @數學繪圖師）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
圖形名稱：x<=3 及 x>=-3 的組合圖
所在章節：F4Notes — 複合不等式，CollapsibleSection id="example-solving"
viewBox：300 × 80

點／線：
  - 數線，標記 -3 與 3
  - -3 實心點，向右畫線
  - 3 實心點，向左畫線
  - 線段在中間重疊（可畫在同一水平或稍低/稍高並標示中間重疊區）

對應手寫圖說明：Image 2 的右下角小數線圖
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}

      <CollapsibleSection id="other-formats" title="3. 其他問法" num={4} color="orange" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-3">1. 大括號形式</h3>
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-light">{`{`}</div>
                <div className="space-y-2">
                  <Latex math="3x - 1 < 4x" />
                  <br/>
                  <Latex math="5x > 3" />
                </div>
              </div>
              <p className="mt-4 text-slate-700 bg-white p-2 border border-orange-100 rounded text-sm">
                即是暗指 <span className="font-bold text-green-600">『及(AND)』</span>
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-3">2. 串連形式</h3>
              <MathDisplay latex="3 < 2x - 1 \leq 7" />
              <p className="text-slate-700 font-bold mt-2 text-center text-sm">拆分成2條：</p>
              <div className="bg-white p-3 rounded mt-2 border border-orange-100 flex justify-center items-center font-bold">
                <Latex math="3 < 2x - 1" />
                <span className="text-green-600 mx-3 text-lg">及</span>
                <Latex math="2x - 1 \leq 7" />
              </div>
            </div>

          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="integer-bounds" title="4. 問最大整數/最小整數 (熱門)" num={5} color="rose" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
            <h3 className="font-bold text-rose-800 mb-2">⭐ 常見題型</h3>
            <p className="text-slate-700 mb-4">題目經常問符合條件的<span className="bg-yellow-200 px-1 rounded">最小整數 / 最大整數</span></p>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-bold text-slate-800 mb-2 border-b pb-1">找最大整數</p>
                  <p className="my-2">若答案是 <Latex math="x \leq 3.5" /> (或 <Latex math="x < 3.5" />)</p>
                  
                  {/* 📐 待繪製：[x <= 3.5 數線及整數標點] — 繪製完成 */}
                  <div className="bg-white rounded-lg p-2 text-center text-slate-400 text-sm mb-2">
                    <NL_Max_3_5 />
                  </div>
                  
                  <p className="text-teal-700 font-bold bg-teal-50 p-2 rounded text-center mt-2">
                    最大整數 = 3
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-800 mb-2 border-b pb-1">找最小整數</p>
                  <p className="my-2">若答案是 <Latex math="x > 2" /></p>
                  
                  {/* 📐 待繪製：[x > 2 數線及整數標點] — 繪製完成 */}
                  <div className="bg-white rounded-lg p-2 text-center text-slate-400 text-sm mb-2">
                    <NL_Min_2 />
                  </div>
                  
                  <p className="text-teal-700 font-bold bg-teal-50 p-2 rounded text-center mt-2">
                    最小整數 = 3
                  </p>
                  <p className="text-xs text-red-500 text-center mt-1">(不包2)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
      
      {/* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 繪圖規格單 #4（可直接複製交給 @數學繪圖師）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
圖形名稱：最大/最小整數 數線標重點
所在章節：F4Notes — 複合不等式，CollapsibleSection id="integer-bounds"
兩個小圖 viewBox 建議 250x60
圖1： x <= 3.5 
  - 刻度：2, 3, 4
  - 實心 3.5，箭頭向左
  - 指住 3 標示最大整數
圖2： x > 2
  - 刻度：1, 2, 3, 4
  - 空心 2，箭頭向右
  - 指住 3 標示最小整數
對應手寫圖說明：Image 3 的上半部
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}

      <CollapsibleSection id="quadratic-application" title="5. 適用: 二次不等式(乙部)" num={6} color="red" activeSub={activeSub} sectionRef={s6}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-3 text-lg">利用計數機 FMLA 01 (二次方程公式)</h3>
            
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <p className="font-bold text-slate-800 mb-2">例子: <Latex math="x^2 - 2x - 15 > 0" /></p>
              
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-2">1. 計數機入 1, -2, -15</p>
                  <p className="text-sm text-slate-600 mb-2">2. 得出根為 <span className="font-bold text-slate-800">5</span> 及 <span className="font-bold text-slate-800">-3</span></p>
                  <p className="text-sm text-slate-600">3. 畫簡單開口向上的拋物線 (因為 <Latex math="x^2" /> 是正數)</p>
                </div>
                
                <div className="bg-white rounded-lg p-2 text-center text-slate-400 text-sm flex-1 w-full min-h-[100px] flex items-center justify-center">
                  {/* 📐 待繪製：[拋物線圖，x截距=-3, 5] — 繪製完成 */}
                  <NL_Quad_Parabola />
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="font-bold text-slate-800 mb-2 text-center">判斷區間：</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded border border-blue-100 text-center">
                    <p className="font-bold bg-white px-2 py-1 rounded inline-block text-blue-800 mb-2">
                      大於零 <Latex math="(> 0)" />
                    </p>
                    <p className="text-sm text-slate-600">取 x 軸上方的兩旁</p>
                    <MathDisplay latex="x < -3 \quad \text{或} \quad x > 5" />
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-100 text-center">
                    <p className="font-bold bg-white px-2 py-1 rounded inline-block text-green-800 mb-2">
                       小於零 <Latex math="(< 0)" />
                    </p>
                    <p className="text-sm text-slate-600">取 x 軸下方的中間</p>
                    <MathDisplay latex="-3 < x < 5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
      
      {/* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 繪圖規格單 #5（可直接複製交給 @數學繪圖師）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
圖形名稱：二次不等式判斷圖
所在章節：F4Notes — 複合不等式，CollapsibleSection id="quadratic-application"
viewBox：約 200 × 100
圖形：
  - 一條水平 x 軸
  - 開口向上的 U 型拋物線交於 x=-3 及 x=5
  - 可以用顏色高亮 x軸上方的分支（表示 >0），或下方肚兜（表示 <0）
對應手寫圖說明：Image 3 的下半部分
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 
      */}

    </div>
  );
};

// ==========================================
// 數學繪圖師 - SVG Components
// ==========================================

const MarkerArrow = ({ id, color }) => (
  <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
    <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
  </marker>
);

const NL_X_GE_3 = () => (
  <svg viewBox="0 0 300 80" className="w-full h-auto max-w-[300px] mx-auto">
    <defs>
      <MarkerArrow id="nl1-axis" color="#64748b" />
      <MarkerArrow id="nl1-blue" color="#0ea5e9" />
    </defs>
    <line x1="20" y1="60" x2="280" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#nl1-axis)" />
    {[2, 3, 4].map((num, i) => (
      <g key={num}>
        <line x1={80 + i * 70} y1="56" x2={80 + i * 70} y2="64" stroke="#64748b" strokeWidth="2" />
        <text x={80 + i * 70} y="78" fontSize="14" fill="#475569" textAnchor="middle">{num}</text>
      </g>
    ))}
    {/* x >= 3 */}
    <path d="M 150 25 L 260 25" fill="none" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#nl1-blue)" />
    <line x1="150" y1="60" x2="150" y2="25" stroke="#0ea5e9" strokeWidth="2" />
    <circle cx="150" cy="60" r="5" fill="#0ea5e9" />
    <text x="205" y="15" fontSize="14" fill="#0284c7" fontWeight="bold">x ≥ 3</text>
  </svg>
);

const NL_And_Overlap = () => (
  <svg viewBox="0 0 250 80" className="w-full h-auto max-w-[250px] mx-auto space-y-2">
    <defs>
      <MarkerArrow id="and1-axis" color="#94a3b8" />
      <MarkerArrow id="and1-blue" color="#3b82f6" />
      <MarkerArrow id="and1-red" color="#ef4444" />
    </defs>
    <rect x="80" y="20" width="90" height="50" fill="rgba(34,197,94,0.15)" rx="4" />
    <line x1="20" y1="65" x2="230" y2="65" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#and1-axis)" />
    
    <line x1="80" y1="61" x2="80" y2="69" stroke="#94a3b8" strokeWidth="2" />
    <text x="80" y="80" fontSize="12" fill="#64748b" textAnchor="middle">2</text>
    
    <line x1="170" y1="61" x2="170" y2="69" stroke="#94a3b8" strokeWidth="2" />
    <text x="170" y="80" fontSize="12" fill="#64748b" textAnchor="middle">5</text>
    
    <path d="M 80 35 L 220 35" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#and1-blue)" />
    <line x1="80" y1="65" x2="80" y2="35" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
    <circle cx="80" cy="65" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
    
    <path d="M 170 20 L 30 20" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#and1-red)" />
    <line x1="170" y1="65" x2="170" y2="20" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
    <circle cx="170" cy="65" r="4" fill="#fff" stroke="#ef4444" strokeWidth="2" />
  </svg>
);

const NL_And_NoSol = () => (
  <svg viewBox="0 0 250 80" className="w-full h-auto max-w-[250px] mx-auto">
    <defs>
      <MarkerArrow id="and2-axis" color="#94a3b8" />
      <MarkerArrow id="and2-blue" color="#3b82f6" />
      <MarkerArrow id="and2-red" color="#ef4444" />
    </defs>
    <line x1="20" y1="65" x2="230" y2="65" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#and2-axis)" />
    
    <line x1="80" y1="61" x2="80" y2="69" stroke="#94a3b8" strokeWidth="2" />
    <text x="80" y="80" fontSize="12" fill="#64748b" textAnchor="middle">3</text>
    
    <line x1="170" y1="61" x2="170" y2="69" stroke="#94a3b8" strokeWidth="2" />
    <text x="170" y="80" fontSize="12" fill="#64748b" textAnchor="middle">6</text>
    
    <path d="M 80 35 L 30 35" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#and2-blue)" />
    <line x1="80" y1="65" x2="80" y2="35" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
    <circle cx="80" cy="65" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
    
    <path d="M 170 20 L 220 20" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#and2-red)" />
    <line x1="170" y1="65" x2="170" y2="20" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
    <circle cx="170" cy="65" r="4" fill="#ef4444" stroke="#ef4444" strokeWidth="2" />
  </svg>
);

const NL_Or_All = () => (
  <svg viewBox="0 0 250 80" className="w-full h-auto max-w-[250px] mx-auto">
    <defs>
      <MarkerArrow id="or1-axis" color="#94a3b8" />
      <MarkerArrow id="or1-blue" color="#3b82f6" />
      <MarkerArrow id="or1-red" color="#ef4444" />
    </defs>
    <rect x="20" y="20" width="210" height="50" fill="rgba(34,197,94,0.15)" rx="4" />
    <line x1="20" y1="65" x2="230" y2="65" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#or1-axis)" />
    
    <line x1="80" y1="61" x2="80" y2="69" stroke="#94a3b8" strokeWidth="2" />
    <text x="80" y="80" fontSize="12" fill="#64748b" textAnchor="middle">2</text>
    
    <line x1="170" y1="61" x2="170" y2="69" stroke="#94a3b8" strokeWidth="2" />
    <text x="170" y="80" fontSize="12" fill="#64748b" textAnchor="middle">5</text>
    
    <path d="M 80 35 L 220 35" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#or1-blue)" />
    <line x1="80" y1="65" x2="80" y2="35" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
    <circle cx="80" cy="65" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
    
    <path d="M 170 20 L 30 20" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#or1-red)" />
    <line x1="170" y1="65" x2="170" y2="20" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
    <circle cx="170" cy="65" r="4" fill="#fff" stroke="#ef4444" strokeWidth="2" />
  </svg>
);

const NL_Or_Sep = () => (
  <svg viewBox="0 0 250 80" className="w-full h-auto max-w-[250px] mx-auto">
    <defs>
      <MarkerArrow id="or2-axis" color="#94a3b8" />
      <MarkerArrow id="or2-blue" color="#3b82f6" />
      <MarkerArrow id="or2-red" color="#ef4444" />
    </defs>
    <rect x="25" y="20" width="55" height="50" fill="rgba(34,197,94,0.15)" rx="4" />
    <rect x="170" y="15" width="55" height="55" fill="rgba(34,197,94,0.15)" rx="4" />
    <line x1="20" y1="65" x2="230" y2="65" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#or2-axis)" />
    
    <line x1="80" y1="61" x2="80" y2="69" stroke="#94a3b8" strokeWidth="2" />
    <text x="80" y="80" fontSize="12" fill="#64748b" textAnchor="middle">3</text>
    
    <line x1="170" y1="61" x2="170" y2="69" stroke="#94a3b8" strokeWidth="2" />
    <text x="170" y="80" fontSize="12" fill="#64748b" textAnchor="middle">6</text>
    
    <path d="M 80 35 L 30 35" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#or2-blue)" />
    <line x1="80" y1="65" x2="80" y2="35" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
    <circle cx="80" cy="65" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
    
    <path d="M 170 20 L 220 20" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#or2-red)" />
    <line x1="170" y1="65" x2="170" y2="20" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
    <circle cx="170" cy="65" r="4" fill="#ef4444" stroke="#ef4444" strokeWidth="2" />
  </svg>
);

const NL_Combined_Ex = () => (
  <svg viewBox="0 0 300 80" className="w-full h-auto max-w-[300px] mx-auto">
    <defs>
      <MarkerArrow id="comb-axis" color="#64748b" />
      <MarkerArrow id="comb-blue" color="#0ea5e9" />
      <MarkerArrow id="comb-red" color="#e11d48" />
    </defs>
    <rect x="90" y="20" width="120" height="50" fill="rgba(34,197,94,0.15)" rx="4" />
    <line x1="30" y1="65" x2="270" y2="65" stroke="#64748b" strokeWidth="2" markerEnd="url(#comb-axis)" />
    
    <line x1="90" y1="61" x2="90" y2="69" stroke="#64748b" strokeWidth="2" />
    <text x="90" y="80" fontSize="14" fill="#475569" textAnchor="middle">-3</text>
    
    <line x1="210" y1="61" x2="210" y2="69" stroke="#64748b" strokeWidth="2" />
    <text x="210" y="80" fontSize="14" fill="#475569" textAnchor="middle">3</text>
    
    {/* x >= -3 */}
    <path d="M 90 35 L 260 35" fill="none" stroke="#e11d48" strokeWidth="2" markerEnd="url(#comb-red)" />
    <line x1="90" y1="65" x2="90" y2="35" stroke="#e11d48" strokeWidth="2" />
    <circle cx="90" cy="65" r="4" fill="#e11d48" />
    
    {/* x <= 3 */}
    <path d="M 210 20 L 40 20" fill="none" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#comb-blue)" />
    <line x1="210" y1="65" x2="210" y2="20" stroke="#0ea5e9" strokeWidth="2" />
    <circle cx="210" cy="65" r="4" fill="#0ea5e9" />
  </svg>
);

const NL_Max_3_5 = () => (
  <svg viewBox="0 0 250 80" className="w-full h-auto max-w-[250px] mx-auto">
    <defs>
      <MarkerArrow id="max-axis" color="#94a3b8" />
      <MarkerArrow id="max-blue" color="#0ea5e9" />
    </defs>
    <line x1="20" y1="60" x2="230" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#max-axis)" />
    {[2, 3, 4].map((num, i) => (
      <g key={num}>
        <line x1={70 + i * 50} y1="56" x2={70 + i * 50} y2="64" stroke="#94a3b8" strokeWidth="2" />
        <text x={70 + i * 50} y="76" fontSize="12" fill="#64748b" textAnchor="middle">{num}</text>
      </g>
    ))}
    
    <path d="M 145 25 L 30 25" fill="none" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#max-blue)" />
    <line x1="145" y1="60" x2="145" y2="25" stroke="#0ea5e9" strokeWidth="1.5" />
    <circle cx="145" cy="60" r="4" fill="#0ea5e9" />
    <text x="145" y="78" fontSize="12" fill="#0ea5e9" textAnchor="middle">3.5</text>
    
    <path d="M 120 40 Q 120 50 110 55" fill="none" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#max-axis)" />
    <text x="120" y="32" fontSize="12" fill="#0f766e" textAnchor="middle" fontWeight="bold">最大整數</text>
    <circle cx="120" cy="60" r="4" fill="#14b8a6" />
  </svg>
);

const NL_Min_2 = () => (
  <svg viewBox="0 0 250 80" className="w-full h-auto max-w-[250px] mx-auto">
    <defs>
      <MarkerArrow id="min-axis" color="#94a3b8" />
      <MarkerArrow id="min-blue" color="#0ea5e9" />
    </defs>
    <line x1="20" y1="60" x2="230" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#min-axis)" />
    {[1, 2, 3, 4].map((num, i) => (
      <g key={num}>
        <line x1={50 + i * 50} y1="56" x2={50 + i * 50} y2="64" stroke="#94a3b8" strokeWidth="2" />
        <text x={50 + i * 50} y="76" fontSize="12" fill="#64748b" textAnchor="middle">{num}</text>
      </g>
    ))}
    
    <path d="M 100 25 L 220 25" fill="none" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#min-blue)" />
    <line x1="100" y1="60" x2="100" y2="25" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="2,2"/>
    <circle cx="100" cy="60" r="4" fill="#fff" stroke="#0ea5e9" strokeWidth="2" />
    
    <path d="M 150 40 Q 150 50 155 55" fill="none" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#min-axis)" />
    <text x="150" y="32" fontSize="12" fill="#0f766e" textAnchor="middle" fontWeight="bold">最小整數</text>
    <circle cx="150" cy="60" r="4" fill="#14b8a6" />
  </svg>
);

const NL_Quad_Parabola = () => (
  <svg viewBox="0 0 200 120" className="w-full h-auto max-w-[200px] mx-auto">
    <defs>
      <MarkerArrow id="quad-axis" color="#64748b" />
    </defs>
    <rect x="25" y="4" width="45" height="56" fill="rgba(59,130,246,0.15)" />
    <rect x="130" y="4" width="45" height="56" fill="rgba(59,130,246,0.15)" />
    <path d="M 70 60 Q 100 120 130 60" fill="rgba(34,197,94,0.15)" />
    
    <line x1="10" y1="60" x2="190" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#quad-axis)" />
    <path d="M 30 10 Q 100 150 170 10" fill="none" stroke="#334155" strokeWidth="2" />
    
    <circle cx="70" cy="60" r="4" fill="#fff" stroke="#334155" strokeWidth="2" />
    <text x="60" y="75" fontSize="14" fill="#475569" textAnchor="middle">-3</text>
    
    <circle cx="130" cy="60" r="4" fill="#fff" stroke="#334155" strokeWidth="2" />
    <text x="140" y="75" fontSize="14" fill="#475569" textAnchor="middle">5</text>
    
    <text x="50" y="30" fontSize="14" fill="#1d4ed8" fontWeight="bold" textAnchor="middle">&gt; 0</text>
    <text x="150" y="30" fontSize="14" fill="#1d4ed8" fontWeight="bold" textAnchor="middle">&gt; 0</text>
    <text x="100" y="85" fontSize="14" fill="#15803d" fontWeight="bold" textAnchor="middle">&lt; 0</text>
  </svg>
);
