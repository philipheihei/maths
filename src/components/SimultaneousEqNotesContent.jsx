import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';

export const SimultaneousEqNotesContent = ({
  cheatsheet = [],
  activeSub,
  showBack = false,
  onBack,
  onShowCalcProgram,
  noteMode = 'full',
}) => {
  const [katexLoaded, setKatexLoaded] = React.useState(false);
  const rootRef = React.useRef(null);
  const isCompactMode = noteMode === 'compact';

  React.useEffect(() => {
    loadKatexOnce().then(() => setKatexLoaded(true)).catch(() => {});
  }, []);

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

    // 先做一次定位，再於版面穩定後補一次，避免 KaTeX 載入後高度改變造成偏位。
    const t1 = window.setTimeout(scrollToActiveSub, 60);
    const t2 = window.setTimeout(scrollToActiveSub, 260);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [activeSub, katexLoaded]);

  const Latex = ({ math, block = false }) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
      if (katexLoaded && window.katex && ref.current) {
        try {
          window.katex.render(math, ref.current, { throwOnError: false, displayMode: block });
        } catch (e) {
          if (ref.current) ref.current.textContent = math;
        }
      }
    }, [math, block, katexLoaded]);

    return <span ref={ref} className={block ? 'block text-center my-2' : 'inline-block align-middle'} />;
  };

  return (
    <div ref={rootRef} className="max-w-3xl mx-auto px-4 py-8">
      {showBack && (
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
          <ArrowLeft className="w-5 h-5" /> 返回
        </button>
      )}

      <h1 className="text-2xl font-bold text-slate-800 mb-2 border-b-2 border-blue-400 pb-3">
        📐 筆記：二元一次聯立方程
      </h1>
      <p className="text-sm text-slate-500 mb-6">F2 CH9 · 二元一次聯立方程</p>

      <div className="space-y-8 text-slate-700">
        <section className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">二元一次方程 ➡️</span>
            <span className="text-rose-600 font-bold px-1 rounded border border-rose-200 bg-white">2 未知數</span>
            <span className="text-green-600 font-bold px-1 rounded border border-green-200 bg-white">1 次方</span>
          </div>
          <p className="text-slate-600 mb-4 bg-white p-3 border border-blue-100 rounded-lg flex items-center justify-center text-lg shadow-sm">
            <span className="font-serif italic text-blue-800 mr-4 text-base">例子</span>
            <Latex math="x + y = 3" />
          </p>
          <p className="text-sm text-center text-slate-600">
            聯立方程有兩條方程、兩個未知數。<br />
            {isCompactMode ? (
              <>
                訓練中心筆記重點：<strong>消元法</strong>（代入 / 加減）與 <strong>文字題設式</strong>。
              </>
            ) : (
              <>
                解法主要分為 <strong>A. 圖解法</strong> 和 <strong>B. 消元法</strong>（代入 / 加減）兩種。
              </>
            )}
          </p>
        </section>

        {/* =======================
            A. 圖解法
            ======================= */}
        {!isCompactMode && (
        <section id="sim-eq-graph" className="bg-emerald-50 rounded-xl p-5 border-2 border-emerald-200 scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-600 text-white font-black text-lg px-3 py-1 rounded-lg">A</span>
            <h2 className="text-lg font-bold text-emerald-800">圖解法</h2>
          </div>
          <p className="font-bold text-rose-600 mb-6 bg-white p-3 rounded-lg border border-red-100 shadow-sm">
            💡 兩直線的交點為聯立方程答案 (解)
          </p>

          <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-sm mb-6">
            <p className="text-slate-700 font-bold mb-4">
              例如：利用圖解法解 <Latex math="\begin{cases} y = x + 2 \\ x + y = 4 \end{cases}" />。
            </p>
            
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* 圖表 */}
              <div className="w-full max-w-sm shrink-0 border border-slate-200 rounded-lg p-3 bg-slate-50 relative overflow-hidden aspect-square flex items-center justify-center">
                <svg viewBox="-60 -180 240 240" className="w-full h-auto font-sans">
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse" x="0" y="0">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#bae6fd" strokeWidth="1" />
                    </pattern>
                    <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M 0 0 L 6 3 L 0 6 Z" fill="#16a34a" />
                    </marker>
                  </defs>
                  
                  {/* 背景格線: x = -60 to 180, y = -180 to 60 */}
                  <rect x="-60" y="-180" width="240" height="240" fill="url(#grid)" />
                  <rect x="-60" y="-180" width="240" height="240" fill="none" stroke="#60a5fa" strokeWidth="2" />

                  {/* x 軸和 y 軸 */}
                  <line x1="-60" y1="0" x2="165" y2="0" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="0" y1="60" x2="0" y2="-165" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow)" />
                  
                  <text x="170" y="4" fill="#16a34a" fontSize="14" fontStyle="italic" fontWeight="bold">x</text>
                  <text x="-4" y="-170" fill="#16a34a" fontSize="14" fontStyle="italic" fontWeight="bold">y</text>
                  <text x="-12" y="14" fill="#16a34a" fontSize="12">0</text>

                  {/* x 軸 Ticks */}
                  {[-1, 1, 2, 3, 4, 5].map(i => (
                    <g key={`x${i}`}>
                      <line x1={i * 30} y1="-3" x2={i * 30} y2="3" stroke="#16a34a" strokeWidth="1.5" />
                      <text x={i * 30} y="16" fill="#16a34a" fontSize="12" textAnchor="middle">{i}</text>
                    </g>
                  ))}
                  
                  {/* y 軸 Ticks */}
                  {[-1, 1, 2, 3, 4, 5].map(i => (
                    <g key={`y${i}`}>
                      <line x1="-3" y1={-i * 30} x2="3" y2={-i * 30} stroke="#16a34a" strokeWidth="1.5" />
                      <text x="-8" y={-i * 30 + 4} fill="#16a34a" fontSize="12" textAnchor="end">{i}</text>
                    </g>
                  ))}

                  {/* 直線 x + y = 4  =>  y = -x + 4 (通過 (0,4)= y:-120 和 (4,0)= x:120) */}
                  <line x1="-30" y1="-150" x2="165" y2="45" stroke="#334155" strokeWidth="2" />
                  <text x="120" y="-35" fill="#334155" fontSize="12" fontStyle="italic" fontWeight="bold">x + y = 4</text>

                  {/* 直線 y = x + 2 (通過 (0,2)= y:-60 和 (-2,0)= x:-60) */}
                  <line x1="-60" y1="0" x2="100" y2="-160" stroke="#334155" strokeWidth="2" />
                  <text x="75" y="-165" fill="#334155" fontSize="12" fontStyle="italic" fontWeight="bold">y = x + 2</text>

                  {/* 交點 (1, 3) */}
                  <line x1="30" y1="0" x2="30" y2="-90" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="-90" x2="30" y2="-90" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
                  <circle cx="30" cy="-90" r="4" fill="#ef4444" />
                  <text x="40" y="-85" fill="#ef4444" fontSize="12" fontWeight="bold">(1, 3)</text>

                  {/* 測試點 (3, 5) -> x:90, y:-150 */}
                  <circle cx="90" cy="-150" r="4" fill="#2563eb" />
                  <text x="100" y="-155" fill="#2563eb" fontSize="12" fontWeight="bold">(3, 5)</text>

                  {/* 測試點 (3, 4) -> x:90, y:-120 */}
                  <circle cx="90" cy="-120" r="4" fill="#16a34a" />
                  <text x="100" y="-125" fill="#16a34a" fontSize="12" fontWeight="bold">(3, 4)</text>

                  {/* 拉線說明：箭頭指向 (3,5) */}
                  <path d="M 160 -120 Q 150 -150 100 -150" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />
                </svg>
              </div>

              {/* 右方解說 */}
              <div className="flex-1 space-y-4">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg font-bold shadow-sm border border-emerald-200">
                  由上圖可見，聯立方程的解是 <Latex math="(1, 3)" />。
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm relative pt-6">
                  <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-br-lg rounded-tl-lg font-bold text-sm">
                    坐標與直線的關係
                  </div>
                  <p className="text-blue-800 font-bold mb-3 mt-1">如坐標在線上，則為該方程（直線）的解</p>
                  
                  <p className="text-slate-700 font-bold mb-2">例如：<Latex math="y = x + 2" /></p>
                  <div className="space-y-2 mb-3 ml-2">
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-100 px-2 py-1 rounded text-sm shrink-0"><Latex math="(3, 5)" /></span>
                      <div className="flex-1 border-b border-dashed border-slate-300 relative h-0"></div>
                      <span className="text-blue-700 font-bold shrink-0"><Latex math="5 = 3 + 2" /></span>
                      <span className="text-green-600 font-bold text-lg shrink-0">✓</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-100 px-2 py-1 rounded text-sm shrink-0"><Latex math="(3, 4)" /></span>
                      <div className="flex-1 border-b border-dashed border-slate-300 relative h-0"></div>
                      <span className="text-slate-500 line-through decoration-red-500 decoration-2 shrink-0"><Latex math="4 = 3 + 2" /></span>
                      <span className="text-red-500 font-bold text-lg shrink-0">✗</span>
                    </div>
                  </div>
                  <p className="text-red-600 font-bold text-sm bg-red-50 p-2 rounded">
                    ⚠️ 直線穿過該點（坐標）才能代入 <Latex math="(x, y)" /> 值！
                  </p>
                </div>
              </div>
            </div>
            
            {/* 例題 */}
            <div className="mt-6 bg-yellow-50 p-5 rounded-xl border border-yellow-200 shadow-sm">
              <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs leading-none">例題</span>
                求未知數
              </h3>
              <p className="text-slate-700 mb-4">
                若方程 <Latex math="x - ky - 13 = 0" /> 的圖像通過 <Latex math="(-3, -4)" />，求 <Latex math="k" /> 的值。
              </p>
              <div className="bg-white rounded-lg p-4 text-center border border-yellow-100 shadow-sm flex flex-col items-center">
                 <Latex math="\begin{align*} (-3) - k(-4) - 13 &= 0 \\ -3 + 4k - 13 &= 0 \\ 4k &= 16 \\ k &= 4 \end{align*}" block />
              </div>
            </div>
          </div>
        </section>
        )}

        {/* =======================
            B. 消元法
            ======================= */}
        <section id="sim-eq-methods" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-4 pl-1">
            <span className="bg-sky-600 text-white font-black text-lg px-3 py-1 rounded-lg">B</span>
            <h2 className="text-lg font-bold text-sky-800">消元法</h2>
          </div>
          
          <div className="space-y-8">
            <div className="bg-sky-50 rounded-xl p-5 border-2 border-sky-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-slate-200 text-slate-800 font-black px-2 py-1 rounded-lg text-sm">B-1</span>
                <h3 className="text-base font-bold text-sky-800">代入消元法（Substitution）</h3>
              </div>
          <div className="bg-sky-100 rounded-lg px-4 py-3 mb-4 text-sm text-sky-800">
            💡 <strong>原理：</strong>從其中一條方程中<strong>以一個未知數作主項</strong>，然後代入另一條方程，消去其中一個未知數。
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-sky-200 shadow-sm">
              <p className="font-bold text-sky-700 mb-1">例題</p>
              <p className="text-sm text-slate-500 mb-3">解：<Latex math="x = 2y - 6" />，&nbsp;<Latex math="x + 4y = 12" /></p>
              <div className="bg-slate-50 rounded-lg p-3 mb-4 text-center">
                <Latex math="\begin{cases} x = 2y - 6 & \cdots\textcircled{1} \\ x + 4y = 12 & \cdots\textcircled{2} \end{cases}" block />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex gap-2 items-start">
                  <span className="bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">Step 1</span>
                  <p className="text-slate-600">加「{'{'} 」代表聯立方程，標示式①／式②</p>
                </div>

                <div className="flex gap-2 items-start">
                  <div className="flex flex-col gap-1 shrink-0 mt-0.5">
                    <span className="bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">Step 2</span>
                    <span className="bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">Step 3</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-600 mb-1">選<strong>已有主項</strong>的方程（式①），代入另一項方程，並計算該未知數的值</p>
                    <p className="text-xs text-slate-400 mb-2">（目的：2個代數的式 減至 1個代數）</p>
                    <p className="text-slate-600 mb-1">代①入②：</p>
                    <div className="bg-amber-50 rounded p-4">
                      <Latex math={"\\begin{aligned} (2y - 6) + 4y &= 12 \\\\ 6y - 6 &= 12 \\\\ 6y &= 18 \\\\ y &= 3 \\quad & \\cdots\\textcircled{3} \\end{aligned}"} block />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <span className="bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">Step 4</span>
                  <div className="flex-1">
                    <p className="text-slate-600 mb-1">代 <Latex math="y=3" /> 進①（代另一條式）：</p>
                    <div className="bg-green-50 rounded p-2 border border-green-200">
                      <Latex math="x = 2(3) - 6 = 0" block />
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-3 border border-green-300 text-center">
                  <span className="font-bold text-green-700">∴ </span>
                  <Latex math="x = 0,\quad y = 3" />
                </div>
              </div>
            </div>
          </div>
            </div>

        <div className="bg-violet-50 rounded-xl p-5 border-2 border-violet-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-slate-200 text-slate-800 font-black px-2 py-1 rounded-lg text-sm">B-2</span>
            <h3 className="text-base font-bold text-violet-800">加減消元法（Elimination）</h3>
          </div>
          <div className="bg-violet-100 rounded-lg px-4 py-3 mb-4 text-sm text-violet-800">
            💡 <strong>原理：</strong>對齊位置後，分辨有沒有<strong>相同數字</strong>，將兩條方程相加或相減，消去其中一個未知數。
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-violet-200 shadow-sm">
              <p className="font-bold text-violet-700 mb-1">例題一 <span className="text-xs font-normal text-slate-400">（已有相同係數）</span></p>
              <div className="bg-slate-50 rounded-lg p-3 mb-4 text-center">
                <Latex math="\begin{cases} 5x + 7y = -2 & \cdots\textcircled{1} \\ 3x - 7y = 10 & \cdots\textcircled{2} \end{cases}" block />
              </div>
              <p className="text-xs text-slate-500 mb-4">觀察：<Latex math="+7y" /> 與 <Latex math="-7y" /> 係數相反 → 兩式相加即可消去 <Latex math="y" /></p>

              <div className="space-y-3 text-sm">
                <div className="flex gap-2 items-start">
                  <div className="flex flex-col gap-1 shrink-0 mt-0.5">
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">①+②</span>
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">解 x</span>
                  </div>
                  <div className="flex-1 bg-amber-50 rounded p-3">
                    <div className="inline-grid items-baseline gap-x-1" style={{ gridTemplateColumns: 'auto auto auto auto' }}>
                      <span />
                      <Latex math="5x + 7y" />
                      <Latex math="=" />
                      <Latex math="-2" />

                      <span className="font-bold text-slate-500 pr-1">+)</span>
                      <Latex math="3x - 7y" />
                      <Latex math="=" />
                      <Latex math="10" />

                      <span className="col-span-4 border-b border-slate-400 my-1" />

                      <span />
                      <Latex math="8x" />
                      <Latex math="=" />
                      <Latex math="8" />

                      <span />
                      <Latex math="x" />
                      <Latex math="=" />
                      <span className="flex items-baseline gap-1"><Latex math="1" /><span className="text-slate-500 text-xs ml-1">···③</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">代③進①</span>
                  <div className="flex-1">
                    <p className="text-slate-600 mb-1">代 <Latex math="x=1" /> 進①：</p>
                    <div className="bg-green-50 rounded p-2 border border-green-200">
                      <div className="inline-grid items-baseline gap-x-1" style={{ gridTemplateColumns: '1fr auto auto', justifyItems: 'end' }}>
                        <Latex math="5(1) + 7y" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="-2" /></div>
                        <Latex math="7y" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="-7" /></div>
                        <Latex math="y" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="-1" /></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-3 border border-green-300 text-center">
                  <span className="font-bold text-green-700">∴ </span>
                  <Latex math="x = 1,\quad y = -1" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-violet-200 shadow-sm">
              <p className="font-bold text-violet-700 mb-1">例題二 <span className="text-xs font-normal text-slate-400">（沒有相同係數，需兩式各自乘倍數）</span></p>
              <div className="bg-slate-50 rounded-lg p-3 mb-3 text-center">
                <Latex math="\begin{cases} 11x + 8y + 6 = 0 & \cdots\textcircled{1} \\ 5x - 3y + 16 = 0 & \cdots\textcircled{2} \end{cases}" block />
              </div>
              <p className="text-xs text-slate-500 mb-4">觀察：<Latex math="y" /> 的係數為 8 和 −3，<strong>沒有相同或相反係數</strong> → 取 LCM(8, 3) = 24，①×3 及 ②×8，令 <Latex math="y" /> 係數變為 ±24，再相加消去 <Latex math="y" /></p>

              <div className="space-y-3 text-sm">
                <div className="flex gap-2 items-start">
                  <div className="flex flex-col gap-1 shrink-0 mt-0.5">
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">①×3</span>
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">+②×8</span>
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded text-center">解 x</span>
                  </div>
                  <div className="flex-1 bg-amber-50 rounded p-3">
                    <div className="inline-grid items-baseline gap-x-1" style={{ gridTemplateColumns: 'auto auto auto auto auto auto' }}>
                      <span className="text-slate-400 text-xs pr-1">①×3：</span>
                      <Latex math="33x" />
                      <Latex math="+ 24y" />
                      <Latex math="+ 18" />
                      <Latex math="=" />
                      <span className="flex items-baseline gap-1"><Latex math="0" /><span className="text-slate-500 text-xs ml-1">···③</span></span>

                      <span className="text-slate-400 text-xs pr-1">②×8：</span>
                      <Latex math="40x" />
                      <Latex math="-24y" />
                      <Latex math="+ 128" />
                      <Latex math="=" />
                      <span className="flex items-baseline gap-1"><Latex math="0" /><span className="text-slate-500 text-xs ml-1">···④</span></span>

                      <span className="col-span-6 pb-1" />

                      <span />
                      <Latex math="33x" />
                      <Latex math="+ 24y" />
                      <Latex math="+ 18" />
                      <Latex math="=" />
                      <Latex math="0" />

                      <span className="font-bold text-slate-500 pr-1">+)</span>
                      <Latex math="40x" />
                      <Latex math="-24y" />
                      <Latex math="+ 128" />
                      <Latex math="=" />
                      <Latex math="0" />

                      <span className="col-span-6 border-b border-slate-400 my-1" />

                      <span />
                      <Latex math="73x" />
                      <span />
                      <Latex math="+ 146" />
                      <Latex math="=" />
                      <Latex math="0" />

                      <span />
                      <Latex math="x" />
                      <span />
                      <span />
                      <Latex math="=" />
                      <span className="flex items-baseline gap-1"><Latex math="-2" /><span className="text-slate-500 text-xs ml-1">···⑤</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">代⑤進①</span>
                  <div className="flex-1">
                    <p className="text-slate-600 mb-1">代 <Latex math="x=-2" /> 進①：</p>
                    <div className="bg-green-50 rounded p-2 border border-green-200">
                      <div className="inline-grid items-baseline gap-x-1" style={{ gridTemplateColumns: '1fr auto auto', justifyItems: 'end' }}>
                        <Latex math="11(-2) + 8y + 6" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="0" /></div>
                        <Latex math="8y - 16" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="0" /></div>
                        <Latex math="y" />
                        <Latex math="=" />
                        <div style={{ justifySelf: 'start' }}><Latex math="2" /></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-3 border border-green-300 text-center">
                  <span className="font-bold text-green-700">∴ </span>
                  <Latex math="x = -2,\quad y = 2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </section>

        <section className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4">📋 選哪種方法？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-sky-200 shadow-sm">
              <p className="font-bold text-sky-700 mb-2">代入消元法 適合</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                <li>其中一條方程已表達為 <Latex math="x = \ldots" /> 或 <Latex math="y = \ldots" /></li>
                <li>其中一個未知數係數為 1 或 −1</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-violet-200 shadow-sm">
              <p className="font-bold text-violet-700 mb-2">加減消元法 適合</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                <li>兩條方程都是標準形式（<Latex math="ax+by=c" />）</li>
                <li>某個未知數的係數相同或互為相反數</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="sim-eq-word" className="bg-emerald-50 rounded-xl p-5 border-2 border-emerald-200 scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-600 text-white font-black text-lg px-3 py-1 rounded-lg">文字題</span>
            <h2 className="text-lg font-bold text-emerald-800">文字轉數式 (組件)</h2>
          </div>

          <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-100 text-emerald-800 text-sm">
                  <th className="py-3 px-4 font-bold border-b border-emerald-200 w-1/2">關鍵字</th>
                  <th className="py-3 px-4 font-bold border-b border-emerald-200 w-1/2">列式</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700 divide-y divide-emerald-50">
                {cheatsheet.map((item, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{item.key}</td>
                    <td className="py-3 px-4 font-sans text-blue-700 bg-blue-50/50 rounded-r-lg">
                      <span className="bg-blue-100 px-3 py-1 rounded-full inline-flex items-center">
                        <Latex math={item.latex || item.val} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-teal-50 rounded-xl p-5 border-2 border-teal-200 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-teal-600 text-white font-black text-lg px-3 py-1 rounded-lg">文字題</span>
            <h2 className="text-lg font-bold text-teal-800">常見題目句式結構</h2>
          </div>

          <div className="bg-white rounded-xl border border-teal-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-teal-100 text-teal-800 text-sm">
                  <th className="py-3 px-4 font-bold border-b border-teal-200 w-[55%]">關鍵詞組 (題目)</th>
                  <th className="py-3 px-4 font-bold border-b border-teal-200 w-[45%]">列式 (答案)</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base divide-y divide-teal-100">
                <tr className="hover:bg-teal-50 transition-colors">
                  <td className="py-4 px-4 text-slate-700 leading-loose">
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-blue-100 text-blue-800">A</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-rose-100 text-rose-800">比</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-amber-100 text-amber-800">B</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-emerald-100 text-emerald-800">多</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-purple-100 text-purple-800">6</span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-sans leading-loose whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="A" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 mx-0.5"><Latex math="=" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800"><Latex math="B" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 mx-0.5"><Latex math="+" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-purple-100 text-purple-800"><Latex math="6" /></span>
                  </td>
                </tr>

                <tr className="hover:bg-teal-50 transition-colors">
                  <td className="py-4 px-4 text-slate-700 leading-loose">
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-blue-100 text-blue-800">A 和 B 之和 / 總值</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-rose-100 text-rose-800">是</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-purple-100 text-purple-800">24</span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-sans leading-loose whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="A+B" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 mx-0.5"><Latex math="=" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-purple-100 text-purple-800"><Latex math="24" /></span>
                  </td>
                </tr>

                <tr className="hover:bg-teal-50 transition-colors">
                  <td className="py-4 px-4 text-slate-700 leading-loose">
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-blue-100 text-blue-800">A</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-rose-100 text-rose-800">是</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-amber-100 text-amber-800">B 的 5 倍</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-emerald-100 text-emerald-800">多</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-purple-100 text-purple-800">25</span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-sans leading-loose whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="A" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 mx-0.5"><Latex math="=" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800"><Latex math="5B" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 mx-0.5"><Latex math="+" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-purple-100 text-purple-800"><Latex math="25" /></span>
                  </td>
                </tr>

                <tr className="hover:bg-teal-50 transition-colors">
                  <td className="py-4 px-4 text-slate-700 leading-loose">
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-blue-100 text-blue-800">A</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-rose-100 text-rose-800">是</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-amber-100 text-amber-800">B 的 1/3</span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-sans leading-loose whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="A" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 mx-0.5"><Latex math="=" /></span>
                    <span className="inline-block px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800"><Latex math={"B\\times\\dfrac{1}{3}"} /></span>
                  </td>
                </tr>

                <tr className="hover:bg-teal-50 transition-colors">
                  <td className="py-4 px-4 text-slate-700 leading-loose">
                    購買了
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-purple-100 text-purple-800">10 個</span>
                    蘋果和香蕉，其中有
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-blue-100 text-blue-800">x 個</span>
                    <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-red-100 text-red-800">蘋果</span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-sans leading-loose">
                    <div className="mb-2 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-red-100 text-red-800">蘋果</span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold mx-0.5">=</span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="x" /></span>
                    </div>
                    <div className="whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800">香蕉</span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold mx-0.5">=</span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-purple-100 text-purple-800"><Latex math="10" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold mx-0.5">-</span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="x" /></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =======================
            C. 解的數目
            ======================= */}
        {!isCompactMode && (
        <section id="sim-eq-solutions" className="bg-orange-50 rounded-xl p-5 border-2 border-orange-200 scroll-mt-24 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-orange-600 text-white font-black text-lg px-3 py-1 rounded-lg">C</span>
            <h2 className="text-lg font-bold text-orange-800">解的數目</h2>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
            <p className="font-bold text-slate-700 mb-4">二元一次聯立方程 解的可能數目有：</p>
            <ul className="space-y-3 mb-6 ml-2">
              <li className="flex items-center gap-3">
                <span className="text-red-600 font-bold text-lg font-sans">1. 沒有解</span>
                <span className="text-slate-500 text-sm">（0個答案）</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-600 font-bold text-lg font-sans">2. 一個解</span>
                <span className="text-slate-500 text-sm">（1個答案）</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-600 font-bold text-lg font-sans">3. 無限個解</span>
                <span className="text-slate-500 text-sm">（無限個答案）</span>
              </li>
            </ul>

            <div className="space-y-6">
              {/* e.g. 1 */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <div className="grid grid-cols-1 lg:grid-cols-[64px_minmax(0,1fr)_auto_minmax(0,1fr)_auto_92px] items-center justify-items-center gap-x-3 gap-y-3">
                  <span className="font-bold text-blue-800 italic text-base">例子1</span>

                  <Latex math="\begin{cases} 12x + 15y = 5 & \cdots\textcircled{1} \\ 4x + 5y = 2 & \cdots\textcircled{2} \end{cases}" />

                  <Latex math="\xrightarrow{\text{\textcircled{2}}\times 3}" />

                  <Latex math="\begin{cases} 12x + 15y = 5 \\ 12x + 15y = 6 \end{cases}" />

                  <span className="text-red-600 text-2xl leading-none">⇒</span>
                  <span className="font-bold text-red-600 text-xl whitespace-nowrap">無解</span>
                </div>
                <p className="text-red-500 font-bold text-center mt-5 text-sm">原因：相同式 <Latex math="= 5" /> 又 <Latex math="= 6" />，不可能！</p>
              </div>

              {/* e.g. 2 */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <div className="grid grid-cols-1 lg:grid-cols-[64px_minmax(0,1fr)_auto_minmax(0,1fr)_auto_92px] items-center justify-items-center gap-x-3 gap-y-3">
                  <span className="font-bold text-blue-800 italic text-base">例子2</span>

                  <Latex math="\begin{cases} 9x - 7y = 5 & \cdots\textcircled{1} \\ 18x - 16y = 14 & \cdots\textcircled{2} \end{cases}" />

                  <Latex math="\xrightarrow{\text{\textcircled{1}}\times 2}" />

                  <Latex math="\begin{cases} 18x - 14y = 10 \\ 18x - 16y = 14 \end{cases}" />

                  <span className="text-green-600 text-2xl leading-none">⇒</span>
                  <span className="font-bold text-green-600 text-xl whitespace-nowrap">一個解</span>
                </div>
                <p className="text-red-500 font-bold text-center mt-5 text-sm">原因：得一組數字變為相同，其他不一樣！</p>
              </div>

              {/* e.g. 3 */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <div className="grid grid-cols-1 lg:grid-cols-[64px_minmax(0,1fr)_auto_minmax(0,1fr)_auto_92px] items-center justify-items-center gap-x-3 gap-y-3">
                  <span className="font-bold text-blue-800 italic text-base">例子3</span>

                  <Latex math="\begin{cases} 24x + 12y = -48 & \cdots\textcircled{1} \\ 4x + 2y = -8 & \cdots\textcircled{2} \end{cases}" />

                  <Latex math="\xrightarrow{\text{\textcircled{2}}\times 6}" />

                  <Latex math="\begin{cases} 24x + 12y = -48 \\ 24x + 12y = -48 \end{cases}" />

                  <span className="text-blue-600 text-2xl leading-none">⇒</span>
                  <span className="font-bold text-blue-600 text-xl whitespace-nowrap">無限解</span>
                </div>
                <p className="text-red-500 font-bold text-center mt-5 text-sm">原因：兩條式完全相同！</p>
              </div>
            </div>
          </div>
        </section>
        )}

        {onShowCalcProgram && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 flex items-start gap-3">
            <span className="text-yellow-500 text-lg mt-0.5">⚠️</span>
            <p className="text-sm text-slate-700">
              解聯立方程時可使用到計算機{' '}
              <button
                onClick={onShowCalcProgram}
                className="text-blue-600 underline hover:text-blue-800 font-medium"
              >
                Prog 01 解聯立方程
              </button>
              。
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
