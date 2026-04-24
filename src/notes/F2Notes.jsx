import React from 'react';
import { loadKatexOnce } from '../utils/katexLoader';
import { SimultaneousEqNotesContent } from '../components/SimultaneousEqNotesContent';
import { PythagorasNotesBlock, TrigRatiosNotesBlock } from '../components/F2TrigNotesShared';
import { SIMULTANEOUS_EQ_CHEATSHEET } from '../constants/simultaneousEqCheatsheet';

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

export const InequalityNotes = ({ activeSub }) => {
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    if (!activeSub) return;

    const scrollToActiveSub = () => {
      const scopedTarget = rootRef.current?.querySelector(`[id="${activeSub}"]`);
      const fallbackTarget = document.getElementById(activeSub);
      const target = scopedTarget || fallbackTarget;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const t1 = window.setTimeout(scrollToActiveSub, 60);
    const t2 = window.setTimeout(scrollToActiveSub, 260);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [activeSub]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-violet-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH8 不等式</h1>
        <p className="text-slate-600">熟悉不等號、畫數線、計算及可能範圍</p>
      </div>

      <div ref={rootRef} className="space-y-8 text-slate-700">
        {/* =======================
            Part 1: 詞彙表 
            ======================= */}
        <section id="keywords" className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-600 text-white font-black text-lg px-3 py-1 rounded-lg">1</span>
            <h2 className="text-lg font-bold text-blue-800">熟悉不同字眼代表的不等式</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-blue-200 bg-white">
            <table className="w-full text-center text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="p-3 w-1/2 border-b border-r border-blue-200">句子</th>
                  <th className="p-3 w-1/2 border-b border-blue-200">不等式</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-3 border-r border-blue-200"><Latex math="x" /> <span className="bg-yellow-200 px-1 rounded font-bold text-slate-700">小於</span> 2。</td>
                  <td className="p-3 font-bold text-blue-700"><Latex math="x < 2" /></td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-3 border-r border-blue-200"><Latex math="x" /> <span className="bg-yellow-200 px-1 rounded font-bold text-slate-700">大於</span> 2。</td>
                  <td className="p-3 font-bold text-blue-700"><Latex math="x > 2" /></td>
                </tr>
                
                {/* <= cluster */}
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-3 border-r border-b border-dashed border-blue-200"><Latex math="x" /> <span className="bg-yellow-200 px-1 rounded font-bold text-slate-700">小於或等於</span> 2。</td>
                  <td className="p-3 font-bold text-blue-700 align-middle" rowSpan={3}><Latex math="x \leq 2" /></td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-3 border-r border-b border-dashed border-blue-200"><Latex math="x" /> <span className="bg-yellow-200 px-1 rounded font-bold text-slate-700">不大於</span> 2。</td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-3 border-r border-blue-200">
                    <Latex math="x" /> <span className="bg-yellow-200 px-1 rounded font-bold text-slate-700">至大為</span> 2。
                    <span className="text-rose-600 font-bold ml-2 text-sm">(最多是)</span>
                  </td>
                </tr>

                {/* >= cluster */}
                <tr className="hover:bg-blue-50/50 transition-colors border-t border-blue-200">
                  <td className="p-3 border-r border-b border-dashed border-blue-200"><Latex math="x" /> <span className="bg-yellow-200 px-1 rounded font-bold text-slate-700">大於或等於</span> 2。</td>
                  <td className="p-3 font-bold text-blue-700 align-middle" rowSpan={3}><Latex math="x \geq 2" /></td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-3 border-r border-b border-dashed border-blue-200"><Latex math="x" /> <span className="bg-yellow-200 px-1 rounded font-bold text-slate-700">不小於</span> 2。</td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-3 border-r border-blue-200">
                    <Latex math="x" /> <span className="bg-yellow-200 px-1 rounded font-bold text-slate-700">至小為</span> 2。
                    <span className="text-rose-600 font-bold ml-2 text-sm">(最少是)</span>
                  </td>
                </tr>

                <tr className="hover:bg-blue-50/50 transition-colors border-t border-blue-200">
                  <td className="p-3 border-r border-blue-200"><Latex math="x" /> <span className="bg-yellow-200 px-1 rounded font-bold text-slate-700">不等於</span> 2。</td>
                  <td className="p-3 font-bold text-blue-700"><Latex math="x \neq 2" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =======================
            Part 2: 文字轉數字 & 畫圖表示不等式
            ======================= */}
        <section id="applications" className="bg-emerald-50 rounded-xl p-5 border-2 border-emerald-200 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-600 text-white font-black text-lg px-3 py-1 rounded-lg">2</span>
            <h2 className="text-lg font-bold text-emerald-800">會考核題型</h2>
          </div>

          <div className="space-y-6 text-sm md:text-base">
            <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
              <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs">題型一</span> 文字轉數字 (不等式表示)
              </h3>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="bg-violet-100 text-violet-800 px-2 py-0.5 rounded font-bold text-xs">例題</span>
                <span className="text-slate-700">這款遊戲的參與人數 <Latex math="(n)" /> 至多為 <Latex math="6" />。</span>
                <span className="mx-2 text-slate-400">→</span>
                <span className="font-bold text-rose-600"><Latex math="n \leq 6" /></span>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg border border-emerald-200 shadow-sm">
              <h3 className="font-bold text-teal-800 mb-4 flex items-center gap-2">
                <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs">題型二</span> 畫圖表示不等式
                <span className="ml-auto text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded">* 留意題目是否有要求「在數線上表示解」</span>
              </h3>

              <div className="w-full overflow-x-auto pb-2">
                <table className="w-full min-w-[650px] text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="w-[30%] pb-4 font-normal"></th>
                      <th className="w-[35%] pb-4 text-center text-blue-800 font-bold">
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-normal mr-2 align-middle font-serif italic">e.g.</span>
                        <Latex math="x < 1" />
                      </th>
                      <th className="w-[35%] pb-4 text-center text-blue-800 font-bold">
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-normal mr-2 align-middle font-serif italic">e.g.</span>
                        <Latex math="x \geq -2" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Step 1 */}
                    <tr className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="py-5 align-middle text-violet-800 font-bold pr-2 flex items-center gap-2">
                        <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs">Step 1</span> <span className="text-emerald-600">畫數線 + 寫不等式數字</span>
                      </td>
                      <td className="py-5 align-middle text-center text-slate-700">
                        <svg width="160" height="40" className="inline-block overflow-visible">
                          <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                          <polygon points="150,15 160,20 150,25" fill="currentColor" />
                          <line x1="80" y1="14" x2="80" y2="26" stroke="currentColor" strokeWidth="2.5" />
                          <text x="80" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">1</text>
                        </svg>
                      </td>
                      <td className="py-5 align-middle text-center text-slate-700">
                        <svg width="160" height="40" className="inline-block overflow-visible">
                          <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                          <polygon points="150,15 160,20 150,25" fill="currentColor" />
                          <line x1="80" y1="14" x2="80" y2="26" stroke="currentColor" strokeWidth="2.5" />
                          <text x="80" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">-2</text>
                        </svg>
                      </td>
                    </tr>

                    {/* Step 2 */}
                    <tr className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="py-5 align-middle text-violet-800 font-bold pr-2 flex items-center gap-2">
                        <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs">Step 2</span> <span className="text-emerald-600">加 0</span> <span className="text-slate-700">(左小右大)</span>
                      </td>
                      <td className="py-5 align-middle text-center text-slate-700">
                        <div className="inline-flex items-center gap-2">
                          <svg width="120" height="40" className="overflow-visible">
                            <line x1="0" y1="20" x2="110" y2="20" stroke="currentColor" strokeWidth="2.5" />
                            <polygon points="110,15 120,20 110,25" fill="currentColor" />
                            <line x1="40" y1="14" x2="40" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="40" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">0</text>
                            <line x1="80" y1="14" x2="80" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="80" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">1</text>
                          </svg>
                          <span className="text-violet-600 font-bold text-xs"><Latex math="(0 < 1)" /></span>
                        </div>
                      </td>
                      <td className="py-5 align-middle text-center text-slate-700">
                        <div className="inline-flex items-center gap-2">
                          <svg width="120" height="40" className="overflow-visible">
                            <line x1="0" y1="20" x2="110" y2="20" stroke="currentColor" strokeWidth="2.5" />
                            <polygon points="110,15 120,20 110,25" fill="currentColor" />
                            <line x1="40" y1="14" x2="40" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="40" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">-2</text>
                            <line x1="80" y1="14" x2="80" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="80" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">0</text>
                          </svg>
                          <span className="text-violet-600 font-bold text-xs"><Latex math="(0 > -2)" /></span>
                        </div>
                      </td>
                    </tr>

                    {/* Step 3 */}
                    <tr className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="py-8 align-middle pr-2">
                        <div className="flex items-start gap-2">
                          <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap mt-0.5">Step 3</span>
                          <div className="text-sm font-bold text-slate-700 leading-relaxed">
                            <span className="text-emerald-600">從不等式數字向上延伸，<br/>
                            再畫相應箭嘴！</span><br/>
                            <span className="text-rose-500 font-normal text-xs">(跟不等號方向)</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-12 align-middle text-center text-slate-700">
                        <div className="inline-block relative">
                          <div className="absolute bg-yellow-200/50 w-8 h-8 left-1 -top-[2.2rem] z-0" />
                          <svg width="160" height="40" className="overflow-visible relative z-10">
                            <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                            <polygon points="150,15 160,20 150,25" fill="currentColor" />
                            <line x1="50" y1="14" x2="50" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="50" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">0</text>
                            <line x1="100" y1="14" x2="100" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="100" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">1</text>
                            
                            <circle cx="100" cy="-20" r="5" fill="white" stroke="currentColor" strokeWidth="2.5" />
                            <line x1="100" y1="-15" x2="100" y2="20" stroke="currentColor" strokeWidth="2.5" />
                            <line x1="95" y1="-20" x2="15" y2="-20" stroke="currentColor" strokeWidth="3" />
                            <polygon points="15,-26 3,-20 15,-14" fill="currentColor" />
                          </svg>
                          <div className="text-center font-bold text-lg font-serif absolute w-full top-12 left-0 text-slate-800"><Latex math="x < 1" /></div>
                        </div>
                      </td>
                      <td className="py-12 align-middle text-center text-slate-700">
                        <div className="inline-block relative">
                          <div className="absolute bg-yellow-200/50 w-8 h-8 left-[3.3rem] -top-[2.2rem] z-0" />
                          <svg width="160" height="40" className="overflow-visible relative z-10">
                            <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                            <polygon points="150,15 160,20 150,25" fill="currentColor" />
                            <line x1="65" y1="14" x2="65" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="65" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">-2</text>
                            <line x1="115" y1="14" x2="115" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="115" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">0</text>
                            
                            <circle cx="65" cy="-20" r="5" fill="white" stroke="currentColor" strokeWidth="2.5" />
                            <line x1="65" y1="-15" x2="65" y2="20" stroke="currentColor" strokeWidth="2.5" />
                            <line x1="70" y1="-20" x2="150" y2="-20" stroke="currentColor" strokeWidth="3" />
                            <polygon points="150,-26 162,-20 150,-14" fill="currentColor" />
                          </svg>
                          <div className="text-center font-bold text-lg font-serif absolute w-full top-12 left-0 text-slate-800"><Latex math="x \geq -2" /></div>
                        </div>
                      </td>
                    </tr>

                    {/* Step 4 */}
                    <tr className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="py-8 align-middle pr-2">
                        <div className="flex items-start gap-2">
                          <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap mt-0.5">Step 4</span>
                          <div className="text-sm font-bold text-slate-700 space-y-1">
                            <div><span className="text-emerald-600">包等於</span> <Latex math="\geq / \leq" /> → <span className="text-rose-600 ml-1">● 實心</span></div>
                            <div><span className="text-emerald-600">不包等於</span> <Latex math="> / <" /> → <span className="text-blue-600 ml-1">○ 空心</span></div>
                            <div className="text-emerald-600 pt-2 flex items-center gap-1">完成 <span className="text-lg">✨</span></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-12 align-middle text-center text-slate-700">
                        <div className="inline-block relative">
                          <svg width="160" height="40" className="overflow-visible relative z-10">
                            <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                            <polygon points="150,15 160,20 150,25" fill="currentColor" />
                            <line x1="50" y1="14" x2="50" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="50" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">0</text>
                            <line x1="100" y1="14" x2="100" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="100" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">1</text>
                            
                            <circle cx="100" cy="-20" r="5" fill="white" stroke="currentColor" strokeWidth="2.5" />
                            <line x1="100" y1="-15" x2="100" y2="20" stroke="currentColor" strokeWidth="2.5" strokeDasharray="2,2" />
                            <line x1="95" y1="-20" x2="15" y2="-20" stroke="currentColor" strokeWidth="3" />
                            <polygon points="15,-26 3,-20 15,-14" fill="currentColor" />
                          </svg>
                          <div className="text-center font-bold text-lg font-serif absolute w-full top-12 left-0 text-slate-800"><Latex math="x < 1" /></div>
                        </div>
                      </td>
                      <td className="py-12 align-middle text-center text-slate-700">
                        <div className="inline-block relative">
                          <svg width="160" height="40" className="overflow-visible relative z-10">
                            <line x1="10" y1="20" x2="150" y2="20" stroke="currentColor" strokeWidth="2.5" />
                            <polygon points="150,15 160,20 150,25" fill="currentColor" />
                            <line x1="65" y1="14" x2="65" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="65" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">-2</text>
                            <line x1="115" y1="14" x2="115" y2="26" stroke="currentColor" strokeWidth="2.5" />
                            <text x="115" y="44" textAnchor="middle" fill="currentColor" className="text-base font-bold font-serif">0</text>
                            
                            <circle cx="65" cy="-20" r="5" fill="currentColor" stroke="currentColor" strokeWidth="2.5" />
                            <line x1="65" y1="-15" x2="65" y2="20" stroke="currentColor" strokeWidth="2.5" strokeDasharray="2,2" />
                            <line x1="70" y1="-20" x2="150" y2="-20" stroke="currentColor" strokeWidth="3" />
                            <polygon points="150,-26 162,-20 150,-14" fill="currentColor" />
                          </svg>
                          <div className="text-center font-bold text-lg font-serif absolute w-full top-12 left-0 text-slate-800"><Latex math="x \geq -2" /></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                <span className="font-bold">💡 實用技巧：</span>
                畫數線時加上 <span className="bg-white px-2 py-0.5 rounded border border-amber-100 font-bold mx-1">0</span> 的位置，有助明確左小右大的概念！
              </div>
            </div>
          </div>
        </section>

        {/* =======================
            Part 3: 找不等式範圍的可能值
            ======================= */}
        <section id="range" className="bg-sky-50 rounded-xl p-5 border-2 border-sky-200 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-sky-600 text-white font-black text-lg px-3 py-1 rounded-lg">3</span>
            <h2 className="text-lg font-bold text-sky-800">找不等式範圍的可能值</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-sky-200">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="bg-violet-100 text-violet-800 px-2 py-0.5 rounded font-bold text-xs">例一</span>
                <span className="font-bold text-slate-800"><Latex math="x > 4" /></span>
                <span className="text-slate-400">→</span>
                <span className="text-slate-700 whitespace-nowrap"><Latex math="x" /> 可以 <Latex math="=" /> 5, 6, 7, 8...</span>
              </div>
              <div className="bg-rose-50 text-rose-800 p-2 rounded text-sm font-bold border border-rose-100">
                符合 <Latex math="x > 4" /> 的最小整數是 5
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-sky-200">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="bg-violet-100 text-violet-800 px-2 py-0.5 rounded font-bold text-xs">例二</span>
                <span className="font-bold text-slate-800"><Latex math="y \leq -3" /></span>
                <span className="text-slate-400">→</span>
                <span className="text-slate-700 whitespace-nowrap"><Latex math="y" /> 可以 <Latex math="=" /> -3, -4, -5, -6...</span>
              </div>
              <div className="bg-rose-50 text-rose-800 p-2 rounded text-sm font-bold border border-rose-100">
                符合 <Latex math="y \leq -3" /> 的最大整數是 <Latex math="-3" />
              </div>
            </div>
          </div>
        </section>

        {/* =======================
            Part 4: 不等式混算
            ======================= */}
        <section id="calculation" className="bg-amber-50 rounded-xl p-5 border-2 border-amber-200 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-amber-600 text-white font-black text-lg px-3 py-1 rounded-lg">4</span>
            <h2 className="text-lg font-bold text-amber-800">不等式解方程</h2>
          </div>
          
          <div className="bg-red-50 text-red-700 border-l-4 border-red-500 p-3 mb-6 font-bold text-sm">
            🚨 緊記：乘除負數，必須轉不等號方向！
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 左邊：乘除負數 */}
            <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm relative">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg font-bold text-sm">
                乘除負數
              </div>
              <p className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-xs">例 1</span>
              </p>
              
              <div className="bg-slate-50 rounded p-3 text-sm">
                <div className="inline-grid items-baseline gap-x-2 w-full text-center" style={{ gridTemplateColumns: 'minmax(40px, auto) auto minmax(40px, auto)' }}>
                  <div className="text-right"><Latex math="-3x - 2" /></div>
                  <div className="text-center font-bold px-2"><Latex math="\leq" /></div>
                  <div className="text-left"><Latex math="10" /></div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-0.5">
                      <span className="bg-red-200 text-red-800 px-1 rounded inline-block"><Latex math="-3" /></span>
                      <Latex math="x" />
                    </span>
                  </div>
                  <div className="text-center font-bold px-2"><Latex math="\leq" /></div>
                  <div className="text-left"><Latex math="12" /></div>

                  <div className="text-right"><Latex math="\frac{-3x}{-3}" /></div>
                  <div className="text-center font-bold px-1 pb-1 flex justify-center">
                    <span className="bg-red-200 text-red-800 px-1 rounded flex items-center"><Latex math="\geq" /></span>
                  </div>
                  <div className="text-left flex items-center gap-2">
                    <Latex math="\frac{12}{-3}" />
                    <span className="text-red-500 text-xs font-bold whitespace-nowrap hidden sm:inline">← 轉不等號</span>
                  </div>
                  
                  <div className="col-span-3 pb-1"></div>

                  <div className="text-right font-bold text-blue-700"><Latex math="x" /></div>
                  <div className="text-center font-bold text-blue-700 px-2"><Latex math="\geq" /></div>
                  <div className="text-left font-bold text-blue-700"><Latex math="-4" /></div>
                </div>
              </div>
            </div>

            {/* 右邊：乘除正數 */}
            <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm relative">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg font-bold text-sm">
                乘除正數
              </div>
              <p className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-xs">例 2</span>
              </p>

              <div className="bg-slate-50 rounded p-3 text-sm">
                <div className="inline-grid items-baseline gap-x-2 w-full text-center" style={{ gridTemplateColumns: 'minmax(40px, auto) auto minmax(40px, auto)' }}>
                  <div className="text-right"><Latex math="8y + 7" /></div>
                  <div className="text-center font-bold px-2"><Latex math="<" /></div>
                  <div className="text-left"><Latex math="3y - 13" /></div>

                  <div className="text-right"><Latex math="8y - 3y" /></div>
                  <div className="text-center font-bold px-2"><Latex math="<" /></div>
                  <div className="text-left"><Latex math="-13 - 7" /></div>

                  <div className="text-right"><Latex math="5y" /></div>
                  <div className="text-center font-bold px-2"><Latex math="<" /></div>
                  <div className="text-left"><Latex math="-20" /></div>
                  
                  <div className="text-right"><Latex math="\frac{5y}{5}" /></div>
                  <div className="text-center font-bold px-2"><Latex math="<" /></div>
                  <div className="text-left flex items-center gap-2">
                    <Latex math="\frac{-20}{5}" />
                    <span className="text-emerald-600 text-xs font-bold whitespace-nowrap hidden sm:inline">← 除正數不轉</span>
                  </div>
                  
                  <div className="col-span-3 pb-1"></div>

                  <div className="text-right font-bold text-blue-700"><Latex math="y" /></div>
                  <div className="text-center font-bold text-blue-700 px-2"><Latex math="<" /></div>
                  <div className="text-left font-bold text-blue-700"><Latex math="-4" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export const SimultaneousEqF2Notes = ({ activeSub }) => {
  return <SimultaneousEqNotesContent cheatsheet={SIMULTANEOUS_EQ_CHEATSHEET} activeSub={activeSub} />;
};

export const PythagorasF2Notes = () => {
  return (
    <div className="max-w-4xl mx-auto mb-12 px-4 md:px-0">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-violet-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH10 畢氏定理</h1>
        <p className="text-slate-600">掌握畢氏定理與逆定理，並運用於直角三角形問題</p>
      </div>
      <PythagorasNotesBlock />
    </div>
  );
};

export const TrigRatiosF2Notes = () => {
  return (
    <div className="max-w-4xl mx-auto mb-12 px-4 md:px-0">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-violet-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH12 三角比</h1>
        <p className="text-slate-600">認識正弦、餘弦、正切，並分辨對邊、鄰邊、斜邊</p>
      </div>
      <TrigRatiosNotesBlock />
    </div>
  );
};
