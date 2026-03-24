import React from 'react';
import { loadKatexOnce } from '../utils/katexLoader';

const Latex = ({ math, block = false, left = false }) => {
  const containerRef = React.useRef(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    loadKatexOnce().then(() => setIsLoaded(true)).catch(e => console.error(e));
  }, []);

  React.useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        window.katex.render(math, containerRef.current, { throwOnError: false, displayMode: block, strict: false, trust: true });
      } catch (e) { containerRef.current.textContent = math; }
    }
  }, [math, block, isLoaded]);
  return <span ref={containerRef} className={block ? `block ${left ? 'text-left' : 'text-center'} my-1` : "inline-block align-middle"} />;
};

export const InequalityNotes = () => {
  return (
    <div className="space-y-12 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm text-lg font-sans max-w-4xl mx-auto mb-12">
      
      {/* =======================
          Part 1: 詞彙表 
          ======================= */}
      <div>
        <h2 className="text-[1.6rem] font-bold mb-4 font-serif tracking-widest"><span className="border-b-[3px] border-black pb-1">熟悉不同字眼代表的不等式</span></h2>
        <table className="w-full text-center border-collapse text-[1.1rem]">
          <thead>
            <tr className="bg-[#e5e7eb]">
              <th className="border border-gray-500 p-2 w-1/2 font-normal">句子</th>
              <th className="border border-gray-500 p-2 w-1/2 font-normal">不等式</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-500 p-3 italic">x <span className="bg-yellow-300">小於</span> 2。</td>
              <td className="border border-gray-500 p-3 font-serif text-xl tracking-wider">x {'<'} 2</td>
            </tr>
            <tr>
              <td className="border border-gray-500 p-3 italic">x <span className="bg-yellow-300">大於</span> 2。</td>
              <td className="border border-gray-500 p-3 font-serif text-xl tracking-wider">x {'>'} 2</td>
            </tr>
            
            {/* <= cluster */}
            <tr>
              <td className="border-l border-r border-gray-500 p-3 italic" style={{ borderBottom: '1px dashed #9ca3af' }}>x <span className="bg-yellow-300">小於或等於</span> 2。</td>
              <td className="border border-gray-500 p-3 font-serif text-xl tracking-wider" rowSpan={3}>x ≤ 2</td>
            </tr>
            <tr>
              <td className="border-l border-r border-gray-500 p-3 italic" style={{ borderBottom: '1px dashed #9ca3af' }}>x <span className="bg-yellow-300">不大於</span> 2。</td>
            </tr>
            <tr>
              <td className="border-l border-r border-b border-gray-500 p-3 italic">
                x <span className="bg-yellow-300">至大為</span> 2。<span className="text-red-600 font-bold ml-4 not-italic tracking-widest text-xl">(最多是)</span>
              </td>
            </tr>

            {/* >= cluster */}
            <tr>
              <td className="border-l border-r border-gray-500 p-3 italic" style={{ borderBottom: '1px dashed #9ca3af' }}>x <span className="bg-yellow-300">大於或等於</span> 2。</td>
              <td className="border border-gray-500 p-3 font-serif text-xl tracking-wider" rowSpan={3}>x ≥ 2</td>
            </tr>
            <tr>
              <td className="border-l border-r border-gray-500 p-3 italic" style={{ borderBottom: '1px dashed #9ca3af' }}>x <span className="bg-yellow-300">不小於</span> 2。</td>
            </tr>
            <tr>
              <td className="border-l border-r border-b border-gray-500 p-3 italic">
                x <span className="bg-yellow-300">至小為</span> 2。<span className="text-red-600 font-bold ml-4 not-italic tracking-widest text-xl">(最少是)</span>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-500 p-3 italic">x <span className="bg-yellow-300">不等於</span> 2。</td>
              <td className="border border-gray-500 p-3 font-serif text-xl tracking-wider">x ≠ 2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="h-px bg-blue-200 shadow-[0_1px_0_0_#93c5fd] my-2" />

      {/* =======================
          Part 2.1: 會考核
          ======================= */}
      <div>
        <div className="flex gap-2 text-xl font-bold mb-4 font-serif">
           <span>會考核：</span>
           <div className="flex flex-col tracking-wider">
              <span>1. 文字轉數字 <span className="text-green-700 mx-1">(不等式表示)</span></span>
           </div>
        </div>
        <div className="ml-12 mt-2 text-[1.1rem]">
          <div className="flex items-start gap-3">
            <span className="text-blue-700 italic font-serif whitespace-nowrap mt-0.5">e.g.</span>
            <div style={{display:'grid', gridTemplateColumns:'auto 1fr', rowGap:'6px', alignItems:'center'}}>
              <span className="text-green-700 tracking-wider whitespace-nowrap pr-3">文字：</span>
              <span className="tracking-wider">這款遊戲的參與人數<span className="text-red-600 font-serif mx-0.5">(n)</span>至多為 6</span>
              <span className="text-green-700 tracking-wider whitespace-nowrap pr-3">數字：</span>
              <span className="text-red-600 font-bold text-[1.3rem]"><Latex math="n \leq 6" /></span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-blue-200 shadow-[0_1px_0_0_#93c5fd] my-2" />

      {/* =======================
          Part 2.2: 畫圖表示不等式
          ======================= */}
      <div>
        <div className="text-xl font-bold font-serif mb-6 tracking-wider">2. 畫圖表示不等式</div>
        
        {/* Table for all steps to ensure strict left/right alignment without wrap */}
        <div className="w-full overflow-x-auto pb-4">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr>
                <th className="w-[35%] pb-6 font-normal"></th>
                <th className="w-[32.5%] pb-6 text-center text-blue-900 text-xl font-normal">
                   <span className="italic font-serif mr-4">e.g.</span> <span className="font-serif tracking-widest">x {'<'} 1</span>
                </th>
                <th className="w-[32.5%] pb-6 text-center text-blue-900 text-xl font-normal">
                   <span className="italic font-serif mr-4">e.g.</span> <span className="font-serif tracking-[0.15em]">x ≥ -2</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Step 1 */}
              <tr className="border-t border-slate-300">
                <td className="py-6 align-middle text-purple-900 tracking-wider font-bold pr-4">
                  <span className="font-serif italic mx-1">Step 1: </span>畫數線 + 寫不等式數字
                </td>
                <td className="py-6 align-middle text-center text-green-700">
                  <svg width="160" height="40" className="inline-block overflow-visible">
                    <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                    <polygon points="150,15 160,20 150,25" fill="currentColor" />
                    <line x1="80" y1="14" x2="80" y2="26" stroke="currentColor" strokeWidth="2.5" />
                    <text x="80" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">1</text>
                  </svg>
                </td>
                <td className="py-6 align-middle text-center text-green-700">
                  <svg width="160" height="40" className="inline-block overflow-visible">
                    <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                    <polygon points="150,15 160,20 150,25" fill="currentColor" />
                    <line x1="80" y1="14" x2="80" y2="26" stroke="currentColor" strokeWidth="2.5" />
                    <text x="80" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">-2</text>
                  </svg>
                </td>
              </tr>

              {/* Step 2 */}
              <tr className="border-t border-slate-300">
                <td className="py-6 align-middle text-purple-900 tracking-wider font-bold pr-4">
                  <span className="font-serif italic mx-1">Step 2: </span>加 0 (左小右大)
                </td>
                <td className="py-6 align-middle text-center text-green-700">
                  <div className="inline-flex items-center gap-4">
                    <svg width="160" height="40" className="overflow-visible">
                      <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                      <polygon points="150,15 160,20 150,25" fill="currentColor" />
                      <line x1="50" y1="14" x2="50" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="50" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">0</text>
                      <line x1="100" y1="14" x2="100" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="100" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">1</text>
                    </svg>
                    <span className="text-purple-800 font-bold font-serif tracking-widest whitespace-nowrap">(0 {'<'} 1)</span>
                  </div>
                </td>
                <td className="py-6 align-middle text-center text-green-700">
                  <div className="inline-flex items-center gap-4">
                    <svg width="160" height="40" className="overflow-visible">
                      <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                      <polygon points="150,15 160,20 150,25" fill="currentColor" />
                      <line x1="60" y1="14" x2="60" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="60" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">-2</text>
                      <line x1="110" y1="14" x2="110" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="110" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">0</text>
                    </svg>
                    <span className="text-purple-800 font-bold font-serif tracking-widest whitespace-nowrap">(0 {'>'} -2)</span>
                  </div>
                </td>
              </tr>

              {/* Step 3 */}
              <tr className="border-t border-slate-300">
                <td className="py-10 align-middle pr-4">
                  <div className="flex flex-col font-bold tracking-wider">
                    <div className="text-purple-900"><span className="font-serif italic mx-1">Step 3: </span>從不等式數字向上延伸，</div>
                    <div className="text-green-700 ml-[4.5rem]">再畫相應箭嘴！</div>
                    <div className="text-red-600 ml-[4.5rem] mt-1">(跟不等號方向)</div>
                  </div>
                </td>
                <td className="py-10 align-middle text-center text-green-700">
                  <div className="inline-block relative">
                    <div className="absolute bg-yellow-300 w-8 h-8 left-1 -top-[2.2rem] z-0 opacity-80" />
                    <svg width="160" height="40" className="overflow-visible relative z-10">
                      <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                      <polygon points="150,15 160,20 150,25" fill="currentColor" />
                      <line x1="50" y1="14" x2="50" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="50" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">0</text>
                      <line x1="100" y1="14" x2="100" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="100" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">1</text>
                      <circle cx="100" cy="-20" r="5" fill="white" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="100" y1="-15" x2="100" y2="20" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="95" y1="-20" x2="15" y2="-20" stroke="currentColor" strokeWidth="3" />
                      <polygon points="15,-26 3,-20 15,-14" fill="currentColor" />
                    </svg>
                    <div className="text-center font-bold tracking-widest text-[1.4rem] font-serif absolute w-full top-12 left-0">x {'<'} 1</div>
                  </div>
                </td>
                <td className="py-10 align-middle text-center text-green-700">
                  <div className="inline-block relative">
                    <div className="absolute bg-yellow-300 w-8 h-8 left-9 -top-[2.2rem] z-0 opacity-80" />
                    <svg width="160" height="40" className="overflow-visible relative z-10">
                      <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                      <polygon points="150,15 160,20 150,25" fill="currentColor" />
                      <line x1="60" y1="14" x2="60" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="60" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">-2</text>
                      <line x1="110" y1="14" x2="110" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="110" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">0</text>
                      <circle cx="60" cy="-20" r="5" fill="white" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="60" y1="-15" x2="60" y2="20" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="65" y1="-20" x2="150" y2="-20" stroke="currentColor" strokeWidth="3" />
                      <polygon points="150,-26 162,-20 150,-14" fill="currentColor" />
                    </svg>
                    <div className="text-center font-bold tracking-widest text-[1.4rem] font-serif absolute w-full top-12 whitespace-nowrap left-2">x <span className="bg-yellow-300 tracking-tighter px-0.5">≥</span> -2</div>
                  </div>
                </td>
              </tr>

              {/* Step 4 */}
              <tr className="border-t border-slate-300">
                <td className="py-10 align-middle pr-4">
                  <div className="flex flex-col font-bold tracking-wide text-[1.1rem]">
                     <div className="text-purple-900"><span className="font-serif italic mx-1">Step 4: </span>如包等於 (≥/≤) → <span className="text-green-700 ml-1">● 實心</span></div>
                     <div className="text-purple-900 ml-[4.4rem] mt-2">不包等於 ({'>'}/{'<'}) → <span className="text-green-700 ml-1">○ 空心</span></div>
                     <div className="text-purple-900 mt-4 text-xl">完成 <span className="font-sans font-bold">:)</span></div>
                  </div>
                </td>
                <td className="py-10 align-middle text-center text-green-700">
                  <div className="inline-block relative">
                    <div className="absolute bg-yellow-300 w-[18px] h-[18px] rounded-full left-[91px] -top-[1.8rem] z-0 opacity-90" />
                    <svg width="160" height="40" className="overflow-visible relative z-10">
                      <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                      <polygon points="150,15 160,20 150,25" fill="currentColor" />
                      <line x1="50" y1="14" x2="50" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="50" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">0</text>
                      <line x1="100" y1="14" x2="100" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="100" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">1</text>
                      <circle cx="100" cy="-20" r="5" fill="white" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="100" y1="-15" x2="100" y2="20" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="95" y1="-20" x2="15" y2="-20" stroke="currentColor" strokeWidth="3" />
                      <polygon points="15,-26 3,-20 15,-14" fill="currentColor" />
                    </svg>
                    <div className="text-center font-bold tracking-widest text-[1.4rem] font-serif absolute w-full top-12 whitespace-nowrap left-0 -ml-1">x <span className="bg-yellow-300 px-0.5 tracking-tighter">{'<'}</span> 1</div>
                  </div>
                </td>
                <td className="py-10 align-middle text-center text-green-700">
                  <div className="inline-block relative">
                    <div className="absolute bg-yellow-300 w-6 h-8 left-[48px] -top-[2.2rem] z-0 opacity-80" />
                    <svg width="160" height="40" className="overflow-visible relative z-10">
                      <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                      <polygon points="150,15 160,20 150,25" fill="currentColor" />
                      <line x1="60" y1="14" x2="60" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="60" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">-2</text>
                      <line x1="110" y1="14" x2="110" y2="26" stroke="currentColor" strokeWidth="2.5" />
                      <text x="110" y="44" textAnchor="middle" fill="currentColor" className="text-[1.1rem] font-bold font-serif">0</text>
                      <circle cx="60" cy="-20" r="5" fill="currentColor" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="60" y1="-15" x2="60" y2="20" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="65" y1="-20" x2="150" y2="-20" stroke="currentColor" strokeWidth="3" />
                      <polygon points="150,-26 162,-20 150,-14" fill="currentColor" />
                    </svg>
                    <div className="text-center font-bold tracking-widest text-[1.4rem] font-serif absolute w-full top-12 whitespace-nowrap left-2">x <span className="bg-yellow-300 tracking-tighter px-0.5">≥</span> -2</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom red remarks */}
        <div className="mt-14 mb-8 flex flex-col items-center">
            <div className="text-red-600 font-bold text-xl tracking-wider">* 需留意題目是否有要求「在數線上表示解」</div>
            <div className="flex flex-col items-center ml-20">
                <span className="text-green-700 text-3xl font-bold font-sans rotate-[140deg] -ml-16 mb-1">↑</span>
                <span className="text-green-700 font-bold text-xl tracking-widest font-serif">畫圖表示</span>
            </div>
        </div>

      </div>

      <div className="h-px bg-blue-200 shadow-[0_1px_0_0_#93c5fd] my-2" />

      {/* =======================
          Part 3: 找不等式範圍的可能值
          ======================= */}
      <div className="pt-4">
        <div className="text-[1.35rem] mb-6 font-bold tracking-wider font-serif">3. 找不等式範圍的可能值</div>
        
        <div className="ml-10 space-y-10 text-[1.2rem]">
          <div>
            <div className="flex items-center gap-4 text-blue-800">
               <span className="text-blue-700 italic font-serif -ml-1">e.g.</span>
               <span className="font-serif tracking-widest font-bold">x {'>'} 4 <span className="font-sans font-normal text-[1.2rem] mx-2">,</span> x 可以 = 5, 6, 7, 8, ...</span>
            </div>
            <div className="text-blue-800 ml-[3.6rem] mt-2 tracking-widest">
               符合 <span className="font-serif mx-2 font-bold">x {'>'} 4</span> 的最小整數是 5
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 text-blue-800">
               <span className="text-blue-700 italic font-serif -ml-1">e.g.</span>
               <span className="font-serif tracking-widest font-bold">y ≤ -3 <span className="font-sans font-normal text-[1.2rem] mx-2">,</span> y 可以 = -3, -4, -5, -6, ...</span>
            </div>
            <div className="text-blue-800 ml-[3.6rem] mt-2 tracking-widest">
               符合 <span className="font-serif mx-2 font-bold">y ≤ -3</span> 的最大整數是 -3
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-blue-200 shadow-[0_1px_0_0_#93c5fd] mt-10 mb-4" />

      {/* =======================
          Part 4: 不等式混算
          ======================= */}
      <div className="pt-4 pb-4">
        <div className="text-[1.35rem] mb-4 font-bold tracking-wider font-serif">4. 不等式混算</div>
        <div className="text-red-600 font-bold ml-4 mb-10 text-[1.25rem] tracking-widest">
          - 請緊記「乘除負數，轉不等號」
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-serif ml-4">
          
          {/* 左邊：乘除負數 */}
          <div>
            <div className="text-green-700 font-bold text-center text-2xl tracking-[0.2em] mb-6">乘除負數</div>
            <div className="flex text-blue-900 text-xl font-bold gap-4">
               <span className="whitespace-nowrap tracking-wider font-sans">例 1:</span>
               
               <div style={{display:'grid', gridTemplateColumns:'auto auto auto auto', columnGap:'8px', rowGap:'16px', alignItems:'center'}}>
                  <div style={{justifySelf:'end'}}><Latex math="-3x-2" /></div>
                  <div style={{justifySelf:'center'}}><Latex math="\leq" /></div>
                  <div><Latex math="10" /></div>
                  <div />
                  <div style={{justifySelf:'end'}}><Latex math="-3x" /></div>
                  <div style={{justifySelf:'center'}}><Latex math="\leq" /></div>
                  <div><Latex math="12" /></div>
                  <div />
                  <div style={{justifySelf:'end'}}><Latex math="\dfrac{-3x}{-3}" /></div>
                  <div style={{justifySelf:'center'}}>
                     <span className="bg-yellow-300 px-1.5 py-0.5 rounded font-bold inline-flex items-center"><Latex math="\geq" /></span>
                  </div>
                  <div><Latex math="\dfrac{12}{-3}" /></div>
                  <div className="text-purple-800 font-bold whitespace-nowrap pl-2 font-sans text-[0.95rem] flex items-center gap-0.5">← 轉不等號</div>
                  <div style={{justifySelf:'end'}}><Latex math="x" /></div>
                  <div style={{justifySelf:'center'}}><Latex math="\geq" /></div>
                  <div><Latex math="-4" /></div>
                  <div />
               </div>
            </div>
          </div>

          {/* 右邊：乘除正數 */}
          <div>
            <div className="text-green-700 font-bold text-center text-2xl tracking-[0.2em] mb-6">乘除正數</div>
            <div className="flex text-blue-900 text-xl font-bold gap-4">
               <span className="whitespace-nowrap tracking-wider font-sans">例 2:</span>
               
               <div style={{display:'grid', gridTemplateColumns:'auto auto auto auto', columnGap:'8px', rowGap:'16px', alignItems:'center'}}>
                  <div style={{justifySelf:'end'}}><Latex math="8y+7" /></div>
                  <div style={{justifySelf:'center'}}><Latex math="<" /></div>
                  <div><Latex math="3y-13" /></div>
                  <div />
                  <div style={{justifySelf:'end'}}><Latex math="8y-3y" /></div>
                  <div style={{justifySelf:'center'}}><Latex math="<" /></div>
                  <div><Latex math="-13-7" /></div>
                  <div />
                  <div style={{justifySelf:'end'}}><Latex math="5y" /></div>
                  <div style={{justifySelf:'center'}}><Latex math="<" /></div>
                  <div><Latex math="-20" /></div>
                  <div className="flex items-center gap-2 text-green-700 pl-2 font-sans font-bold whitespace-nowrap text-[0.95rem]">
                     <span className="text-xl">←</span>
                     <Latex math="\dfrac{5y}{5} < \dfrac{-20}{5}" />
                     <span>除正數</span>
                  </div>
                  <div style={{justifySelf:'end'}}><Latex math="y" /></div>
                  <div style={{justifySelf:'center'}}><Latex math="<" /></div>
                  <div><Latex math="-4" /></div>
                  <div />
               </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
