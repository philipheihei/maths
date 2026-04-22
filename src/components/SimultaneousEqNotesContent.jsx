import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';

export const SimultaneousEqNotesContent = ({
  cheatsheet = [],
  showBack = false,
  onBack,
  onShowCalcProgram,
}) => {
  const [katexLoaded, setKatexLoaded] = React.useState(false);

  React.useEffect(() => {
    loadKatexOnce().then(() => setKatexLoaded(true)).catch(() => {});
  }, []);

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
    <div className="max-w-3xl mx-auto px-4 py-8">
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
          <div className="text-center mb-3">
            <Latex math="\begin{cases} ax + by = c \\ dx + ey = f \end{cases}" block />
          </div>
          <p className="text-sm text-center text-slate-600">
            聯立方程有兩條方程、兩個未知數。<br />
            解法主要有<strong>代入消元法</strong>和<strong>加減消元法</strong>兩種。
          </p>
        </section>

        <section className="bg-sky-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-sky-600 text-white font-black text-lg px-3 py-1 rounded-lg">方法一</span>
            <h2 className="text-lg font-bold text-sky-800">代入消元法（Substitution）</h2>
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
        </section>

        <section className="bg-violet-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-violet-600 text-white font-black text-lg px-3 py-1 rounded-lg">方法二</span>
            <h2 className="text-lg font-bold text-violet-800">加減消元法（Elimination）</h2>
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

        <section className="bg-emerald-50 rounded-xl p-5 border-2 border-emerald-200">
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
