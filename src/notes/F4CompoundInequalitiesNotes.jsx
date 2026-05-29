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
                <span className="font-bold text-teal-700">● 實心圓圈</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Latex math=">" /> / <Latex math="<" /> (不包括)：
                <span className="font-bold text-rose-500">○ 空心圓圈</span>
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
                  答案：<Latex math="2 < x < 5" />
                </p>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm border border-slate-100">
                <Latex math="x < 3" /> <span className="text-green-700 font-bold mx-2">及</span> <Latex math="x \geq 6" />
                
                {/* 📐 待繪製：[及 (AND) 不相交] — 繪製完成 */}
                <div className="mt-2 bg-white rounded-lg p-2 text-center text-slate-400 text-sm">
                  <NL_And_NoSol />
                </div>
                
                <p className="mt-2 text-center font-bold text-slate-800">
                  答案：<span className="text-red-600">無解 (No solution)</span>
                </p>
              </div>

              <div className="bg-white p-3 rounded shadow-sm border border-slate-100 mt-3 mb-3">
                <Latex math="x > 2" /> <span className="text-green-700 font-bold mx-2">及</span> <Latex math="x > 5" />
                <div className="mt-2 bg-white rounded-lg p-2 text-center text-slate-400 text-sm">
                  <NL_And_SameGT />
                </div>
                <p className="mt-2 text-center font-bold text-slate-800">
                  答案：<Latex math="x > 5" />
                </p>
              </div>

              <div className="bg-white p-3 rounded shadow-sm border border-slate-100">
                <Latex math="x < 3" /> <span className="text-green-700 font-bold mx-2">及</span> <Latex math="x < 6" />
                <div className="mt-2 bg-white rounded-lg p-2 text-center text-slate-400 text-sm">
                  <NL_And_SameLT />
                </div>
                <p className="mt-2 text-center font-bold text-slate-800">
                  答案：<Latex math="x < 3" />
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
                  答案：<span className="text-blue-600">所有實數 (All real numbers)</span>
                </p>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm border border-slate-100">
                <Latex math="x < 3" /> <span className="text-amber-700 font-bold mx-2">或</span> <Latex math="x \geq 6" />
                
                {/* 📐 待繪製：[或 (OR) 兩邊分開] — 繪製完成 */}
                <div className="mt-2 bg-white rounded-lg p-2 text-center text-slate-400 text-sm">
                  <NL_Or_Sep />
                </div>
                
                <p className="mt-2 text-center font-bold text-slate-800">
                  答案：<Latex math="x < 3" /> 或 <Latex math="x \geq 6" />
                </p>
              </div>

              <div className="bg-white p-3 rounded shadow-sm border border-slate-100 mt-3 mb-3">
                <Latex math="x > 2" /> <span className="text-amber-700 font-bold mx-2">或</span> <Latex math="x > 5" />
                <div className="mt-2 bg-white rounded-lg p-2 text-center text-slate-400 text-sm">
                  <NL_Or_SameGT />
                </div>
                <p className="mt-2 text-center font-bold text-slate-800">
                  答案：<Latex math="x > 2" />
                </p>
              </div>

              <div className="bg-white p-3 rounded shadow-sm border border-slate-100">
                <Latex math="x < 3" /> <span className="text-amber-700 font-bold mx-2">或</span> <Latex math="x < 6" />
                <div className="mt-2 bg-white rounded-lg p-2 text-center text-slate-400 text-sm">
                  <NL_Or_SameLT />
                </div>
                <p className="mt-2 text-center font-bold text-slate-800">
                  答案：<Latex math="x < 6" />
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
                <div className="space-y-1 flex flex-col items-center">
                  <div className="grid grid-cols-[7.5rem_1.75rem_3rem] items-center gap-x-1">
                    <span className="text-right"><Latex math="4x" /></span>
                    <span className="text-center"><Latex math="\leq" /></span>
                    <span className="text-left"><Latex math="12" /></span>
                  </div>
                  <div className="grid grid-cols-[7.5rem_1.75rem_3rem] items-center gap-x-1">
                    <span className="text-right"><Latex math="x" /></span>
                    <span className="text-center"><Latex math="\leq" /></span>
                    <span className="text-left"><Latex math="3" /></span>
                  </div>
                </div>
              </div>
              <div className="border-l border-slate-200">
                <div className="space-y-1 flex flex-col items-center">
                  <div className="grid grid-cols-[7.5rem_1.75rem_3rem] items-center gap-x-1">
                    <span className="text-right"><Latex math="-x - 2x" /></span>
                    <span className="text-center"><Latex math="\leq" /></span>
                    <span className="text-left"><Latex math="9" /></span>
                  </div>
                  <div className="grid grid-cols-[7.5rem_1.75rem_3rem] items-center gap-x-1">
                    <span className="text-right"><Latex math="-3x" /></span>
                    <span className="text-center"><Latex math="\leq" /></span>
                    <span className="text-left"><Latex math="9" /></span>
                  </div>
                </div>
                <div className="relative inline-block mt-2">
                  <div className="bg-red-100 px-2 py-1 rounded inline-block">
                    <div className="grid grid-cols-[7.5rem_1.75rem_3rem] items-center gap-x-1">
                      <span className="text-right"><Latex math="x" /></span>
                      <span className="text-center"><Latex math="\geq" /></span>
                      <span className="text-left"><Latex math="-3" /></span>
                    </div>
                  </div>
                  <div className="absolute text-xs text-red-600 top-full left-[14px] w-[180px] mt-1 font-bold text-left">
                    ↑ 乘/除負數，要變不等號方向!
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-10">
               <span className="font-bold mr-4">結合：</span>
              <div className="bg-slate-50 p-3 rounded w-full max-w-[920px] text-center">
                 {/* 📐 待繪製：[x <= 3 及 x >= -3 的數線] — 繪製完成 */}
                <div className="bg-white rounded-lg p-3 text-center text-slate-400 text-sm min-h-[96px]">
                    <NL_Combined_Ex />
                 </div>
               </div>
            </div>

            <div className="bg-green-100 text-green-800 p-3 rounded mt-4 text-center font-bold text-lg">
              <Latex math="\therefore\ -3 \leq x \leq 3" />
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
              <div className="flex items-stretch space-x-4">
                <div className="text-6xl leading-none font-light text-orange-700 flex items-center scale-y-150 origin-center select-none">{`{`}</div>
                <div className="space-y-1 flex flex-col justify-center">
                  <Latex math="3x - 1 < 4x" block={true} left={true} />
                  <Latex math="5x > 3" block={true} left={true} />
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

      <CollapsibleSection id="quadratic-application" title="5. 二次不等式 (乙部)" num={6} color="red" activeSub={activeSub} sectionRef={s6}>
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
// 數學繪圖師 - SVG Components (Compound Inequality Quiz Style)
// ==========================================

const NL_X_GE_3 = () => (
  <svg width="100%" height="180" viewBox="0 0 600 180" className="mt-4 max-w-[600px] mx-auto">
    <line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />
    <polygon points="36,140 46,134 46,146" fill="#374151" />
    <polygon points="564,140 554,134 554,146" fill="#374151" />
    <text x="579" y="145" fontSize="16" fill="#374151" fontWeight="500" fontStyle="italic">x</text>
    
    {[0, 1, 2, 3, 4, 5, 6].map((val) => {
      const px = 100 + (val * 400) / 6;
      return (
        <g key={val}>
          <line x1={px} y1="132" x2={px} y2="148" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="165" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    <g>
      <rect x="300" y="79" width="264" height="32" fill="#f59e0b" opacity="0.18" rx="6" />
      <line x1="305" y1="95" x2="556" y2="95" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="300" cy="95" r="5" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" />
      <polygon points="564,95 556,89 556,101" fill="#3b82f6" />
      <line x1="300" y1="100" x2="300" y2="140" stroke="#3b82f6" strokeWidth="4" opacity="1" />
    </g>
  </svg>
);

const NL_And_Overlap = () => (
  <svg width="100%" height="180" viewBox="0 0 600 180" className="mt-4 max-w-[600px] mx-auto">
    <line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />
    <polygon points="36,140 46,134 46,146" fill="#374151" />
    <polygon points="564,140 554,134 554,146" fill="#374151" />
    <text x="579" y="145" fontSize="16" fill="#374151" fontWeight="500" fontStyle="italic">x</text>
    
    {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => {
      const px = 100 + val * 55;
      return (
        <g key={val}>
          <line x1={px} y1="132" x2={px} y2="148" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="165" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    <g>
      {/* 重疊高亮 */}
      <rect x="210" y="44" width="165" height="68" fill="#f59e0b" opacity="0.45" rx="6" />
      
      {/* 左邊 x > 2 */}
      <line x1="215" y1="95" x2="556" y2="95" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <circle cx="210" cy="95" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
      <polygon points="564,95 556,89 556,101" fill="#ef4444" />
      <line x1="210" y1="100" x2="210" y2="140" stroke="#ef4444" strokeWidth="4" />
      
      {/* x < 5 */}
      <line x1="44" y1="60" x2="370" y2="60" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="375" cy="60" r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
      <polygon points="36,60 44,54 44,66" fill="#3b82f6" />
      <line x1="375" y1="65" x2="375" y2="140" stroke="#3b82f6" strokeWidth="4" />
    </g>
  </svg>
);

const NL_And_NoSol = () => (
  <svg width="100%" height="180" viewBox="0 0 600 180" className="mt-4 max-w-[600px] mx-auto">
    <line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />
    <polygon points="36,140 46,134 46,146" fill="#374151" />
    <polygon points="564,140 554,134 554,146" fill="#374151" />
    
    {[1, 2, 3, 4, 5, 6, 7].map((val) => {
      const px = 100 + (val-1) * 65;
      return (
        <g key={val}>
          <line x1={px} y1="132" x2={px} y2="148" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="165" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    <g>
      {/* x < 3 */}
      <line x1="44" y1="95" x2="225" y2="95" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <circle cx="230" cy="95" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
      <polygon points="36,95 44,89 44,101" fill="#ef4444" />
      <line x1="230" y1="100" x2="230" y2="140" stroke="#ef4444" strokeWidth="4" />
      
      {/* x >= 6 */}
      <line x1="430" y1="60" x2="556" y2="60" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="425" cy="60" r="5" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" />
      <polygon points="564,60 556,54 556,66" fill="#3b82f6" />
      <line x1="425" y1="65" x2="425" y2="140" stroke="#3b82f6" strokeWidth="4" />
    </g>
  </svg>
);

const NL_Or_All = () => (
  <svg width="100%" height="180" viewBox="0 0 600 180" className="mt-4 max-w-[600px] mx-auto">
    <line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />
    <polygon points="36,140 46,134 46,146" fill="#374151" />
    <polygon points="564,140 554,134 554,146" fill="#374151" />
    
    {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => {
      const px = 100 + val * 55;
      return (
        <g key={val}>
          <line x1={px} y1="132" x2={px} y2="148" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="165" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    <g>
      {/* x > 2 */}
      <rect x="210" y="79" width="354" height="32" fill="#f59e0b" opacity="0.18" rx="6" />
      <line x1="215" y1="95" x2="564" y2="95" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <circle cx="210" cy="95" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
      <polygon points="564,95 556,89 556,101" fill="#ef4444" />
      <line x1="210" y1="100" x2="210" y2="140" stroke="#ef4444" strokeWidth="4" />
      
      {/* x < 5 */}
      <rect x="36" y="44" width="339" height="32" fill="#f59e0b" opacity="0.18" rx="6" />
      <line x1="36" y1="60" x2="370" y2="60" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="375" cy="60" r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
      <polygon points="36,60 44,54 44,66" fill="#3b82f6" />
      <line x1="375" y1="65" x2="375" y2="140" stroke="#3b82f6" strokeWidth="4" />
    </g>
  </svg>
);

const NL_Or_Sep = () => (
  <svg width="100%" height="180" viewBox="0 0 600 180" className="mt-4 max-w-[600px] mx-auto">
    <line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />
    <polygon points="36,140 46,134 46,146" fill="#374151" />
    <polygon points="564,140 554,134 554,146" fill="#374151" />
    
    {[1, 2, 3, 4, 5, 6, 7].map((val) => {
      const px = 100 + (val-1) * 65;
      return (
        <g key={val}>
          <line x1={px} y1="132" x2={px} y2="148" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="165" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    <g>
      {/* x < 3 */}
      <rect x="36" y="79" width="194" height="32" fill="#f59e0b" opacity="0.18" rx="6" />
      <line x1="36" y1="95" x2="225" y2="95" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <circle cx="230" cy="95" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
      <polygon points="36,95 44,89 44,101" fill="#ef4444" />
      <line x1="230" y1="100" x2="230" y2="140" stroke="#ef4444" strokeWidth="4" />
      
      {/* x >= 6 */}
      <rect x="425" y="44" width="139" height="32" fill="#f59e0b" opacity="0.18" rx="6" />
      <line x1="430" y1="60" x2="564" y2="60" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="425" cy="60" r="5" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" />
      <polygon points="564,60 556,54 556,66" fill="#3b82f6" />
      <line x1="425" y1="65" x2="425" y2="140" stroke="#3b82f6" strokeWidth="4" />
    </g>
  </svg>
);

const NL_And_SameGT = () => (
  <svg width="100%" height="150" viewBox="0 0 600 150" className="max-w-[520px] mx-auto">
    <line x1="36" y1="110" x2="564" y2="110" stroke="#374151" strokeWidth="2" />
    <polygon points="564,110 554,104 554,116" fill="#374151" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => {
      const px = 100 + val * 55;
      return (
        <g key={val}>
          <line x1={px} y1="102" x2={px} y2="118" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="136" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    {/* x > 2 */}
    <line x1="215" y1="72" x2="564" y2="72" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
    <circle cx="210" cy="72" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
    <polygon points="564,72 556,66 556,78" fill="#ef4444" />
    <line x1="210" y1="77" x2="210" y2="110" stroke="#ef4444" strokeWidth="4" />

    {/* x > 5 */}
    <line x1="380" y1="45" x2="564" y2="45" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
    <circle cx="375" cy="45" r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
    <polygon points="564,45 556,39 556,51" fill="#3b82f6" />
    <line x1="375" y1="50" x2="375" y2="110" stroke="#3b82f6" strokeWidth="4" />

    {/* AND result = stricter one (cover both red/blue lines) */}
    <rect x="375" y="40" width="189" height="40" fill="#f59e0b" opacity="0.25" rx="6" />
  </svg>
);

const NL_And_SameLT = () => (
  <svg width="100%" height="150" viewBox="0 0 600 150" className="max-w-[520px] mx-auto">
    <line x1="36" y1="110" x2="564" y2="110" stroke="#374151" strokeWidth="2" />
    <polygon points="36,110 46,104 46,116" fill="#374151" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => {
      const px = 100 + val * 55;
      return (
        <g key={val}>
          <line x1={px} y1="102" x2={px} y2="118" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="136" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    {/* x < 3 */}
    <line x1="36" y1="72" x2="260" y2="72" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
    <circle cx="265" cy="72" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
    <polygon points="36,72 44,66 44,78" fill="#ef4444" />
    <line x1="265" y1="77" x2="265" y2="110" stroke="#ef4444" strokeWidth="4" />

    {/* x < 6 */}
    <line x1="36" y1="45" x2="425" y2="45" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
    <circle cx="430" cy="45" r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
    <polygon points="36,45 44,39 44,51" fill="#3b82f6" />
    <line x1="430" y1="50" x2="430" y2="110" stroke="#3b82f6" strokeWidth="4" />

    {/* AND result = stricter one (cover both red/blue lines) */}
    <rect x="36" y="40" width="229" height="40" fill="#f59e0b" opacity="0.25" rx="6" />
  </svg>
);

const NL_Or_SameGT = () => (
  <svg width="100%" height="150" viewBox="0 0 600 150" className="max-w-[520px] mx-auto">
    <line x1="36" y1="110" x2="564" y2="110" stroke="#374151" strokeWidth="2" />
    <polygon points="564,110 554,104 554,116" fill="#374151" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => {
      const px = 100 + val * 55;
      return (
        <g key={val}>
          <line x1={px} y1="102" x2={px} y2="118" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="136" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    {/* x > 2 */}
    <line x1="215" y1="72" x2="564" y2="72" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
    <circle cx="210" cy="72" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
    <polygon points="564,72 556,66 556,78" fill="#ef4444" />
    <line x1="210" y1="77" x2="210" y2="110" stroke="#ef4444" strokeWidth="4" />

    {/* x > 5 */}
    <line x1="380" y1="45" x2="564" y2="45" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
    <circle cx="375" cy="45" r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
    <polygon points="564,45 556,39 556,51" fill="#3b82f6" />
    <line x1="375" y1="50" x2="375" y2="110" stroke="#3b82f6" strokeWidth="4" />

    {/* OR result = broader one */}
    <rect x="210" y="56" width="354" height="32" fill="#f59e0b" opacity="0.25" rx="6" />
  </svg>
);

const NL_Or_SameLT = () => (
  <svg width="100%" height="150" viewBox="0 0 600 150" className="max-w-[520px] mx-auto">
    <line x1="36" y1="110" x2="564" y2="110" stroke="#374151" strokeWidth="2" />
    <polygon points="36,110 46,104 46,116" fill="#374151" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => {
      const px = 100 + val * 55;
      return (
        <g key={val}>
          <line x1={px} y1="102" x2={px} y2="118" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="136" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    {/* x < 3 */}
    <line x1="36" y1="72" x2="260" y2="72" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
    <circle cx="265" cy="72" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
    <polygon points="36,72 44,66 44,78" fill="#ef4444" />
    <line x1="265" y1="77" x2="265" y2="110" stroke="#ef4444" strokeWidth="4" />

    {/* x < 6 */}
    <line x1="36" y1="45" x2="425" y2="45" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
    <circle cx="430" cy="45" r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
    <polygon points="36,45 44,39 44,51" fill="#3b82f6" />
    <line x1="430" y1="50" x2="430" y2="110" stroke="#3b82f6" strokeWidth="4" />

    {/* OR result = broader one */}
    <rect x="36" y="56" width="394" height="32" fill="#f59e0b" opacity="0.25" rx="6" />
  </svg>
);

const NL_Combined_Ex = () => (
  <svg viewBox="0 0 600 180" className="w-full h-auto mt-2 max-w-[900px] mx-auto">
    <line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />
    <polygon points="36,140 46,134 46,146" fill="#374151" />
    <polygon points="564,140 554,134 554,146" fill="#374151" />
    
    {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map((val) => {
      const px = 100 + (val+5) * 40;
      return (
        <g key={val}>
          <line x1={px} y1="132" x2={px} y2="148" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="165" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    <g>
      <rect x="180" y="44" width="160" height="68" fill="#f59e0b" opacity="0.45" rx="6" />
      
      {/* x >= -3 */}
      <line x1="185" y1="95" x2="564" y2="95" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <circle cx="180" cy="95" r="5" fill="#ef4444" stroke="#ef4444" strokeWidth="2" />
      <polygon points="564,95 556,89 556,101" fill="#ef4444" />
      <line x1="180" y1="100" x2="180" y2="140" stroke="#ef4444" strokeWidth="4" />
      
      {/* x <= 3 */}
      <line x1="36" y1="60" x2="335" y2="60" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="340" cy="60" r="5" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" />
      <polygon points="36,60 44,54 44,66" fill="#3b82f6" />
      <line x1="340" y1="65" x2="340" y2="140" stroke="#3b82f6" strokeWidth="4" />
    </g>
  </svg>
);

const NL_Max_3_5 = () => (
  <svg width="100%" height="180" viewBox="0 0 600 180" className="mt-4 max-w-[600px] mx-auto">
    <line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />
    <polygon points="36,140 46,134 46,146" fill="#374151" />
    <polygon points="564,140 554,134 554,146" fill="#374151" />
    
    {[0,1,2,3,4,5].map((val) => {
      const px = 100 + val * 80;
      return (
        <g key={val}>
          <line x1={px} y1="132" x2={px} y2="148" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="165" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    <g>
      {/* x <= 3.5 */}
      <line x1="36" y1="60" x2="375" y2="60" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="380" cy="60" r="5" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" />
      <text x="380" y="45" fontSize="14" fill="#3b82f6" fontWeight="bold" textAnchor="middle">3.5</text>
      <polygon points="36,60 44,54 44,66" fill="#3b82f6" />
      <line x1="380" y1="65" x2="380" y2="140" stroke="#3b82f6" strokeWidth="4" />
      
      {/* Arrow pointing to Max integer = 3 */}
      <path d="M 340 100 Q 300 80 260 110" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-max)"/>
      <circle cx="340" cy="140" r="6" fill="#10b981" />
      <text x="250" y="125" fontSize="16" fill="#047857" fontWeight="bold">最大整數</text>
      <defs>
        <marker id="arrow-max" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
      </defs>
    </g>
  </svg>
);

const NL_Min_2 = () => (
  <svg width="100%" height="180" viewBox="0 0 600 180" className="mt-4 max-w-[600px] mx-auto">
    <line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />
    <polygon points="36,140 46,134 46,146" fill="#374151" />
    <polygon points="564,140 554,134 554,146" fill="#374151" />
    
    {[0,1,2,3,4,5].map((val) => {
      const px = 100 + val * 80;
      return (
        <g key={val}>
          <line x1={px} y1="132" x2={px} y2="148" stroke="#6b7280" strokeWidth="2" />
          <text x={px} y="165" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="500">{val}</text>
        </g>
      );
    })}

    <g>
      {/* x > 2 */}
      <line x1="265" y1="60" x2="564" y2="60" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <circle cx="260" cy="60" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
      <polygon points="564,60 556,54 556,66" fill="#ef4444" />
      <line x1="260" y1="65" x2="260" y2="140" stroke="#ef4444" strokeWidth="4" />
      
      {/* Arrow pointing to Min integer = 3 */}
      <path d="M 340 100 Q 380 80 420 110" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-min)"/>
      <circle cx="340" cy="140" r="6" fill="#10b981" />
      <text x="430" y="125" fontSize="16" fill="#047857" fontWeight="bold">最小整數</text>
      <defs>
        <marker id="arrow-min" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
      </defs>
    </g>
  </svg>
);

const NL_Quad_Parabola = () => (
  <svg width="100%" height="200" viewBox="0 0 600 200" className="mt-4 max-w-[600px] mx-auto">
    {/* Background color highlight for >0 and <0 */}
    <rect x="250" y="20" width="100" height="120" fill="#22c55e" opacity="0.1" />
    <rect x="50" y="20" width="200" height="120" fill="#3b82f6" opacity="0.1" />
    <rect x="350" y="20" width="200" height="120" fill="#3b82f6" opacity="0.1" />

    <line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />
    <polygon points="564,140 554,134 554,146" fill="#374151" />
    <text x="579" y="145" fontSize="16" fill="#374151" fontWeight="500" fontStyle="italic">x</text>
    
    <path d="M 150 40 Q 300 265 450 40" fill="none" stroke="#1e293b" strokeWidth="3" />
    
    <circle cx="250" cy="140" r="5" fill="white" stroke="#1e293b" strokeWidth="2" />
    <text x="250" y="165" textAnchor="middle" fontSize="16" fill="#374151" fontWeight="bold">-3</text>
    
    <circle cx="350" cy="140" r="5" fill="white" stroke="#1e293b" strokeWidth="2" />
    <text x="350" y="165" textAnchor="middle" fontSize="16" fill="#374151" fontWeight="bold">5</text>

    {/* Labels */}
    <text x="180" y="70" textAnchor="middle" fontSize="18" fill="#2563eb" fontWeight="bold">&gt; 0</text>
    <text x="420" y="70" textAnchor="middle" fontSize="18" fill="#2563eb" fontWeight="bold">&gt; 0</text>
    <text x="300" y="120" textAnchor="middle" fontSize="18" fill="#16a34a" fontWeight="bold">&lt; 0</text>
  </svg>
);
