import React, { useRef } from 'react';
import { loadKatexOnce } from '../utils/katexLoader';
import { SimultaneousEqNotesContent } from '../components/SimultaneousEqNotesContent';
import { PythagorasNotesBlock, TrigRatiosNotesBlock } from '../components/F2TrigNotesShared';
import { SIMULTANEOUS_EQ_CHEATSHEET } from '../constants/simultaneousEqCheatsheet';
import { CollapsibleSection } from './shared';

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

const MathDisplay = ({ math, block = false, left = false }) => (
  <div className="font-semibold text-slate-800">
    <Latex math={math} block={block} left={left} />
  </div>
);

// ========================================
// CH1 相似三角形 (F2)
// ========================================
export const SimilarTrianglesNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH1 相似三角形</h1>
        <p className="text-slate-600">認識相似三角形的概念、性質及判定條件，並運用其解決未知量</p>
      </div>

      <CollapsibleSection id="similar-concept" title="1. 認識概念全等與相似" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 1. 認識概念</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded p-3 shadow-sm border border-slate-100">
                <p className="font-bold text-slate-800">全等 <span className="text-slate-500 font-normal">（Congruent）</span>：</p>
                <p className="text-red-600 font-bold ml-4 my-1">形狀 和 大小 一樣</p>
                <p className="text-blue-700 text-sm ml-4">（邊長／角度相等）</p>
              </div>
              <div className="bg-white rounded p-3 shadow-sm border border-slate-100">
                <p className="font-bold text-slate-800">相似 <span className="text-slate-500 font-normal">（Similar）</span>：</p>
                <p className="text-red-600 font-bold ml-4 my-1">形狀 相同，大小 按比例</p>
                <p className="text-blue-700 text-sm ml-4">（放大／縮小）</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="similar-properties" title="2. 相似三角形的性質" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">📝 2. 相似三角形的性質</h3>
            <p className="text-slate-700 font-bold mb-3">按字母前中後認對應角/邊</p>
            <p className="text-slate-700 mb-2">若 <span className="font-bold">△ABC ~ △XYZ</span>，則</p>
            
            <div className="space-y-4 pl-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex items-start gap-2 mb-1">
                  <span className="font-bold text-slate-700">(a)</span>
                  <div>
                    <span className="font-bold text-slate-800 tracking-wider">∠A=∠X , ∠B=∠Y , ∠C=∠Z</span>
                  </div>
                  <span className="ml-auto font-bold text-purple-700">角度相等</span>
                </div>
                <p className="text-slate-600 text-sm ml-6 mb-2">〔簡記：<span className="text-red-700 font-bold">相似 △ 的對應角</span>〕</p>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex items-start gap-2 mb-1">
                  <span className="font-bold text-slate-700">(b)</span>
                  <div>
                    <div className="font-bold text-slate-800 font-sans tracking-wide">
                      <Latex math="\dfrac{AB}{XY} = \dfrac{BC}{YZ} = \dfrac{AC}{XZ}" />
                    </div>
                  </div>
                  <span className="ml-auto font-bold text-purple-700">長度按比例</span>
                </div>
                <p className="text-slate-600 text-sm ml-6 mb-2">〔簡記：<span className="text-red-700 font-bold">相似 △ 的對應邊</span>〕</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 mt-4 border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">例如：已知 <span className="font-bold text-slate-800">△ABC ~ △PQR</span>。求 x 和 y。</p>
              
              <div className="relative">
                <div className="text-center mb-2 mx-auto text-green-700 font-bold bg-green-100 px-3 py-1 rounded inline-block">
                  用一對已知邊找放大比率：4 ÷ 3 = <Latex math="\dfrac{4}{3}" />
                  <span className="block text-xs text-purple-700 font-bold mt-1">（大 ÷ 小）</span>
                </div>
                
                {/* SVG 1: 相似性質例題 △ABC 及 △PQR */}
                <svg viewBox="0 0 400 160" className="w-full max-w-lg mx-auto relative z-10 touch-none my-4">
                  {/* 小三角形 ABC */}
                  <g transform="translate(30, 20)">
                    <polygon points="50,10 10,90 90,90" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                    <text x="50" y="-5" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">C</text>
                    <text x="-5" y="105" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">A</text>
                    <text x="105" y="105" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">B</text>
                    {/* 角 x */}
                    <path d="M 30 90 A 20 20 0 0 0 18.9 72.1" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                    <text x="35" y="82" fontSize="14" fill="#334155" textAnchor="middle" fontStyle="italic">x</text>
                    {/* 邊 AC = 3 */}
                    <rect x="20" y="40" width="16" height="16" fill="#fef08a" />
                    <text x="28" y="53" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">3</text>
                    {/* 邊 AB = 4.5 */}
                    <text x="50" y="110" fontSize="14" fill="#334155" textAnchor="middle">4.5</text>
                    <text x="50" y="65" fontSize="24" fill="#2563eb" fontWeight="bold" textAnchor="middle">小</text>
                  </g>
                  
                  {/* 大三角形 PQR */}
                  <g transform="translate(180, 10)">
                    <polygon points="66,13 13,120 120,120" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                    <text x="66" y="3" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">R</text>
                    <text x="-5" y="135" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">P</text>
                    <text x="135" y="135" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">Q</text>
                    {/* 角 56° */}
                    <path d="M 33 120 A 20 20 0 0 0 21.9 102.1" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                    <text x="44" y="112" fontSize="14" fill="#334155">56°</text>
                    {/* 邊 PR = 4 */}
                    <rect x="28" y="55" width="16" height="16" fill="#fef08a" />
                    <text x="36" y="68" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">4</text>
                    {/* 邊 PQ = y */}
                    <text x="66" y="140" fontSize="14" fill="#334155" textAnchor="middle" fontStyle="italic">y</text>
                    <text x="66" y="85" fontSize="24" fill="#2563eb" fontWeight="bold" textAnchor="middle">大</text>
                  </g>
                  
                  {/* 綠色箭頭 */}
                  <g stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 85 20 Q 160 -10 230 25" />
                    <polyline points="220,15 230,25 215,35" />
                  </g>
                  
                  {/* 紅色箭頭 */}
                  <g stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 120 125 Q 180 160 250 145" />
                    <polyline points="240,135 250,145 238,155" />
                  </g>
                  <text x="255" y="145" fontSize="16" fill="#dc2626" fontWeight="bold">
                    4.5 × 4/3 = 6
                  </text>
                  <text x="350" y="152" fontSize="14" fill="#16a34a" fontWeight="bold">放大率</text>
                </svg>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-50 rounded p-3 text-[15px]">
                    <div className="flex justify-between items-center bg-yellow-100 px-2 py-1 rounded mb-2">
                       <span className="font-bold">∠A = ∠P</span>
                       <span className="text-slate-600 text-sm">(相似 △ 的對應角)</span>
                    </div>
                    <div className="px-2 font-bold mb-4">
                      x = 56°
                    </div>
                    
                    <div className="flex justify-between items-center bg-yellow-100 px-2 py-1 rounded mb-2">
                       <span className="font-bold"><Latex math="\dfrac{AB}{PQ} = \dfrac{AC}{PR}" /></span>
                       <span className="text-slate-600 text-sm">(相似 △ 的對應邊)</span>
                    </div>
                    <div className="px-2 space-y-2 font-bold">
                       <Latex math="\dfrac{4.5}{y} = \dfrac{3}{4}" block left/>
                       <Latex math="4.5 \times 4 = 3y" block left/>
                       <Latex math="y = \dfrac{4.5 \times 4}{3}" block left/>
                       <Latex math="y = \underline{\underline{6}}" block left/>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded p-3 flex flex-col justify-center items-center border border-blue-200">
                    <p className="text-blue-800 font-bold mb-2">💡 快捷找答案技巧 (放大率)：</p>
                    <div className="text-lg font-bold text-red-700 flex items-center gap-2">
                      <Latex math="y = 4.5 \times \dfrac{4}{3} = \underline{\underline{6}}" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="similar-conditions" title="3. 相似三角形的判定條件" num={3} color="amber" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-3">📝 3. 相似三角形的判定條件</h3>
            <p className="text-red-600 font-bold mb-4 bg-red-50 inline-block px-2 py-1 rounded">判斷是否相似△</p>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="bg-white p-3 rounded shadow-sm border-l-4 border-blue-400">
                <div className="flex items-center gap-2 font-bold text-blue-800 text-lg mb-2">
                  (a) 3對角
                </div>
                {/* 📐 判定 AAA */}
                <svg viewBox="0 0 320 130" className="w-full max-w-sm mx-auto my-2 overflow-visible">
                  <g transform="translate(40, 10)">
                    <polygon points="40,10 10,80 80,80" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                    {/* 單弧 */}
                    <path d="M 34.1 23.8 A 15 15 0 0 0 47.4 23.0" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    {/* 雙弧 */}
                    <path d="M 25 80 A 15 15 0 0 0 15.9 66.2" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    <path d="M 28 80 A 18 18 0 0 0 17.1 63.5" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    {/* 三弧 */}
                    <path d="M 67 80 A 13 13 0 0 1 73.6 68.7" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    <path d="M 64 80 A 16 16 0 0 1 72.1 66.1" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    <path d="M 61 80 A 19 19 0 0 1 70.6 63.5" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                  </g>
                  <g transform="translate(160, 5) scale(1.3)">
                    <polygon points="40,10 10,80 80,80" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                    {/* 單弧 */}
                    <path d="M 34.1 23.8 A 15 15 0 0 0 47.4 23.0" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    {/* 雙弧 */}
                    <path d="M 25 80 A 15 15 0 0 0 15.9 66.2" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    <path d="M 28 80 A 18 18 0 0 0 17.1 63.5" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    {/* 三弧 */}
                    <path d="M 67 80 A 13 13 0 0 1 73.6 68.7" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    <path d="M 64 80 A 16 16 0 0 1 72.1 66.1" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    <path d="M 61 80 A 19 19 0 0 1 70.6 63.5" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                  </g>
                </svg>
                <p className="text-slate-600 font-bold">〔簡記：<span className="text-red-500">AAA</span>〕</p>
              </div>

              <div className="bg-white p-3 rounded shadow-sm border-l-4 border-blue-400">
                <div className="flex items-center gap-2 font-bold text-blue-800 text-lg mb-2">
                  (b) 3對邊
                </div>
                {/* 📐 判定 三邊成比例 */}
                <svg viewBox="0 0 320 130" className="w-full max-w-sm mx-auto my-2 overflow-visible">
                  <g transform="translate(40, 10)">
                    <polygon points="40,10 10,80 80,80" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                    <text x="14" y="45" fontSize="14" fill="#334155" fontStyle="italic">b</text>
                    <text x="68" y="45" fontSize="14" fill="#334155" fontStyle="italic">c</text>
                    <text x="45" y="95" fontSize="14" fill="#334155" fontStyle="italic">a</text>
                  </g>
                  <g transform="translate(160, 5) scale(1.3)">
                    <polygon points="40,10 10,80 80,80" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                    <text x="6" y="45" fontSize="12" fill="#334155" fontStyle="italic">kb</text>
                    <text x="65" y="45" fontSize="12" fill="#334155" fontStyle="italic">kc</text>
                    <text x="40" y="95" fontSize="12" fill="#334155" fontStyle="italic">ka</text>
                  </g>
                </svg>
                <p className="text-slate-600 font-bold">〔簡記：<span className="text-red-500">三邊成比例</span>〕</p>
              </div>

              <div className="bg-white p-3 rounded shadow-sm border-l-4 border-blue-400">
                <div className="flex items-center gap-2 font-bold text-blue-800 text-lg mb-2">
                  (c) 2對邊夾住一對角 <span className="text-green-600 text-sm bg-green-50 px-2 py-0.5 rounded">← 夾角</span>
                </div>
                {/* 📐 判定 兩邊成比例且夾角相等 */}
                <svg viewBox="0 0 320 130" className="w-full max-w-sm mx-auto my-2 overflow-visible">
                  <g transform="translate(20, 10)">
                    <polygon points="40,10 10,80 80,80" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                    <text x="14" y="45" fontSize="14" fill="#334155" fontStyle="italic">b</text>
                    <text x="45" y="95" fontSize="14" fill="#334155" fontStyle="italic">a</text>
                    <path d="M 25 80 A 15 15 0 0 0 15.9 66.2" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                    {/* 綠箭頭指夾角 */}
                    <g stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M 50 65 Q 40 70 30 72" />
                      <polyline points="33,66 30,72 37,76" />
                    </g>
                    <text x="55" y="58" fontSize="14" fill="#16a34a" fontWeight="bold">夾角</text>
                  </g>
                  <g transform="translate(160, 5) scale(1.3)">
                    <polygon points="40,10 10,80 80,80" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                    <text x="6" y="45" fontSize="12" fill="#334155" fontStyle="italic">kb</text>
                    <text x="40" y="95" fontSize="12" fill="#334155" fontStyle="italic">ka</text>
                    <path d="M 25 80 A 15 15 0 0 0 15.9 66.2" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                  </g>
                </svg>
                <p className="text-slate-600 font-bold">〔簡記：<span className="text-red-500">兩邊成比例且夾角相等</span>〕</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-600 mb-3">例如：考慮以下兩個三角形。</p>
              {/* 📐 判定條件例題 */}
              <svg viewBox="0 0 400 160" className="w-full max-w-lg mx-auto relative z-10 touch-none my-4">
                {/* 左下三角形 ABC */}
                <g transform="translate(60, 40)">
                  <polygon points="50,10 0,90 100,90" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <text x="50" y="0" fontSize="14" fill="#334155" fontStyle="italic" textAnchor="middle">A</text>
                  <text x="-10" y="100" fontSize="14" fill="#334155" fontStyle="italic" textAnchor="middle">B</text>
                  <text x="110" y="100" fontSize="14" fill="#334155" fontStyle="italic" textAnchor="middle">C</text>
                  
                  {/* 角 A = 80° */}
                  <path d="M 39.4 27 A 20 20 0 0 0 60.6 27" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                  <text x="50" y="45" fontSize="12" fill="#334155" textAnchor="middle">80°</text>
                  
                  {/* 角 B = 40° */}
                  <path d="M 10.6 73 A 20 20 0 0 1 20 90" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                  <text x="32" y="80" fontSize="12" fill="#334155">40°</text>
                </g>
                
                {/* 右上大三角形 PQR */}
                <g transform="translate(260, 30) scale(1.3)">
                  <polygon points="10,0 80,0 60,60" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <text x="5" y="-5" fontSize="12" fill="#334155" fontStyle="italic" textAnchor="middle">P</text>
                  <text x="85" y="-5" fontSize="12" fill="#334155" fontStyle="italic" textAnchor="middle">R</text>
                  <text x="65" y="70" fontSize="12" fill="#334155" fontStyle="italic" textAnchor="middle">Q</text>
                  
                  {/* 角 R = 80° */}
                  <path d="M 65 0 A 15 15 0 0 0 75.3 14.2" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                  <text x="60" y="18" fontSize="10" fill="#334155" textAnchor="middle">80°</text>
                  
                  {/* 角 Q = 60° */}
                  <path d="M 50.4 48.5 A 15 15 0 0 1 64.7 45.8" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                  <text x="68" y="47" fontSize="10" fill="#334155">60°</text>
                </g>
              </svg>
              
              <div className="bg-slate-50 rounded p-3 font-sans">
                <div className="grid grid-cols-[auto_auto_1fr_auto] gap-x-2 text-[15px] mb-2 leading-loose">
                  <div className="text-right">∠C</div>
                  <div className="text-center">=</div>
                  <div className="text-left font-bold text-slate-700">180° - 80° - 40°</div>
                  <div className="text-right text-slate-500 text-sm">(△ 內角和)</div>

                  <div className="text-right"></div>
                  <div className="text-center">=</div>
                  <div className="text-left font-bold text-slate-700">60°</div>
                  <div className="text-right"></div>

                  <div className="text-right">∠P</div>
                  <div className="text-center">=</div>
                  <div className="text-left font-bold text-slate-700">180° - 60° - 80°</div>
                  <div className="text-right text-slate-500 text-sm">(△ 內角和)</div>

                  <div className="text-right"></div>
                  <div className="text-center">=</div>
                  <div className="text-left font-bold text-slate-700">40°</div>
                  <div className="text-right"></div>
                </div>

                <div className="border-t border-slate-300 pt-3 relative">
                  <div className="absolute right-4 bottom-2 text-red-600 font-bold transform -rotate-12 bg-red-50 px-2 py-1 border border-red-200 shadow-sm rounded">判定條件</div>
                  <table className="text-[15px] mx-10 text-slate-800">
                    <tbody>
                      <tr>
                        <td className="pr-2 pb-1 font-serif italic text-lg">∵</td>
                        <td className="font-bold">∠A = ∠R</td>
                      </tr>
                      <tr>
                        <td className="pr-2 pb-1"></td>
                        <td className="font-bold">∠B = ∠P</td>
                      </tr>
                      <tr>
                        <td className="pr-2 pb-2"></td>
                        <td className="font-bold">∠C = ∠Q</td>
                      </tr>
                      <tr>
                        <td className="pr-2 pt-2 font-serif italic text-lg border-t border-slate-300">∴</td>
                        <td className="font-bold pt-2 border-t border-slate-300">△ABC ~ △RPQ <span className="border-b-2 border-red-500 text-red-700 mx-1 px-1">(AAA)</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="similar-example" title="4. 求未知量例題 (短中長)" num={4} color="purple" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">📝 4. 求下列各對相似三角形中的未知量。</h3>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="font-bold text-lg mb-3 flex items-center gap-4">
                <span>19. <span className="text-blue-800 underline decoration-green-500 underline-offset-4 decoration-2">△ABC</span> ~ <span className="text-blue-800 underline decoration-green-500 underline-offset-4 decoration-2">△EDC</span></span>
                <span className="text-red-600 text-sm bg-red-50 px-2 py-1 rounded-full flex items-center gap-1 group relative">
                  ← 1. 先看已知對應邊
                </span>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 items-start mt-4">
                <div className="w-full lg:w-[55%] flex-shrink-0">
                  {/* 📐 第 19 題短中長 */}
                  <svg viewBox="0 0 400 180" className="w-full mx-auto relative z-10 touch-none my-2">
                {/* ABCD 對接於 C。 A=(100,20), B=(40, 140), C=(220,100), D=(320, 70), E=(280, 150) */}
                <g transform="translate(10, 0)">
                  {/* BC-DC 線段 highlighted */}
                  <line x1="40" y1="140" x2="320" y2="70" stroke="#16a34a" strokeWidth="4" />
                  
                  {/* 大三角形 ABC */}
                  <polygon points="100,20 40,140 220,100" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <text x="100" y="10" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">A</text>
                  <text x="30" y="155" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">B</text>
                  <text x="210" y="90" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">C</text>
                  
                  {/* 中間大字 */}
                  <text x="120" y="95" fontSize="28" fill="#7e22ce" fontWeight="bold">大</text>
                  
                  {/* AB = 8 (中) */}
                  <text x="50" y="75" fontSize="16" fill="#334155" textAnchor="middle">8</text>
                  <text x="70" y="65" fontSize="14" fill="#0284c7" fontWeight="bold">中</text>
                  <path d="M 68 68 L 60 78 L 72 73" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                  
                  {/* BC = 10 (長) */}
                  <text x="140" y="135" fontSize="16" fill="#334155" textAnchor="middle">10</text>
                  <text x="165" y="135" fontSize="14" fill="#0284c7" fontWeight="bold">長</text>
                  <path d="M 160 120 L 150 115 L 155 125" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                  
                  {/* AC = x (短) */}
                  <text x="175" y="65" fontSize="16" fill="#334155" fontStyle="italic">x</text>
                  <text x="160" y="55" fontSize="14" fill="#0284c7" fontWeight="bold">短</text>
                  <path d="M 168 58 L 175 62 L 165 65" fill="none" stroke="#0284c7" strokeWidth="1.5" />

                  {/* 小三角形 EDC (E=280,150, D=320,70, C=220,100) */}
                  <polygon points="280,150 320,70 220,100" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <text x="330" y="65" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">D</text>
                  <text x="280" y="168" fontSize="16" fill="#334155" fontStyle="italic" textAnchor="middle">E</text>
                  
                  {/* 中間小字 */}
                  <text x="280" y="115" fontSize="24" fill="#7e22ce" fontWeight="bold">小</text>
                  
                  {/* ED = y (中) */}
                  <text x="305" y="125" fontSize="16" fill="#334155" fontStyle="italic">y</text>
                  <text x="320" y="125" fontSize="14" fill="#0284c7" fontWeight="bold">中</text>
                  <path d="M 315 120 L 308 115 L 310 125" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                  
                  {/* DC = 5 (長) */}
                  <text x="270" y="80" fontSize="16" fill="#334155" textAnchor="middle">5</text>
                  <text x="290" y="70" fontSize="14" fill="#0284c7" fontWeight="bold">長</text>
                  <path d="M 285 75 L 275 80 L 285 85" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                  
                  {/* EC = 3 (短) */}
                  <text x="245" y="135" fontSize="16" fill="#334155" textAnchor="middle">3</text>
                  <text x="235" y="145" fontSize="14" fill="#0284c7" fontWeight="bold">短</text>
                  <path d="M 245 140 L 252 135 L 255 145" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                </g>
              </svg>
                </div>

                <div className="w-full lg:w-[45%] space-y-4">
                  <div className="bg-blue-50 text-blue-900 font-bold p-3 rounded text-center text-base border border-blue-200">
                可以用「<span className="text-red-600">短、中、長</span>」的觀察方法去辨認
              </div>

              <div className="bg-slate-50 rounded p-4 font-sans text-slate-800">
                <div className="mb-4">
                  <p className="text-red-700 font-bold mb-1">2. 找放大率：</p>
                  <p className="font-bold text-lg ml-6">
                    <span className="text-green-700">10 ÷ 5 = 2 倍</span> <span className="text-blue-700 text-sm">(大 ÷ 小)</span>
                  </p>
                </div>
                
                <div>
                  <p className="text-red-700 font-bold mb-1">3. 以放大率找未知數：</p>
                  <div className="grid grid-cols-[1rem_auto_auto_auto] gap-x-2 gap-y-3 font-bold text-lg ml-6 text-green-700 items-center">
                    <div></div>
                    <div className="text-right">x</div>
                    <div className="text-center">=</div>
                    <div className="text-left">3(2) = 6</div>

                    <div></div>
                    <div className="text-right">2y</div>
                    <div className="text-center">=</div>
                    <div className="text-left">8</div>

                    <div></div>
                    <div className="text-right">y</div>
                    <div className="text-center">=</div>
                    <div className="text-left">4</div>
                  </div>
                </div>
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
// CH2 有關三角形和直線的角 (F2)
// ========================================
export const TriangleLineAnglesNotes = ({ activeSub }) => {
  const s1 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH2 有關三角形和直線的角</h1>
        <p className="text-slate-600">認識進階幾何角度定理、等腰三角形及多邊形的性質</p>
      </div>

      <CollapsibleSection id="advanced-angle-theorems" title="進階幾何角度定理 (6-12)" num={1} color="green" activeSub={activeSub} sectionRef={s1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* 6. 等腰三角形底角 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">6</span>
              等腰三角形底角
              <span className="text-sm text-red-500 font-normal">（等腰△ → 底角相等）</span>
            </h3>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
              <p className="text-center text-xl font-bold text-green-800 my-1">若 AB = AC，則 ∠B = ∠C</p>
              <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                <polygon points="150,20 80,120 220,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                <line x1="105" y1="70" x2="120" y2="78" stroke="#9333ea" strokeWidth="2" />
                <line x1="110" y1="63" x2="125" y2="71" stroke="#9333ea" strokeWidth="2" />
                <line x1="180" y1="78" x2="195" y2="70" stroke="#9333ea" strokeWidth="2" />
                <line x1="175" y1="71" x2="190" y2="63" stroke="#9333ea" strokeWidth="2" />
                <path d="M 100 120 A 20 20 0 0 0 91.5 103.6" stroke="#16a34a" strokeWidth="2" fill="none" />
                <path d="M 106 120 A 26 26 0 0 0 94.9 98.7" stroke="#16a34a" strokeWidth="2" fill="none" />
                <path d="M 200 120 A 20 20 0 0 1 208.5 103.6" stroke="#16a34a" strokeWidth="2" fill="none" />
                <path d="M 194 120 A 26 26 0 0 1 205.1 98.7" stroke="#16a34a" strokeWidth="2" fill="none" />
                <text x="145" y="14" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                <text x="60" y="125" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                <text x="230" y="125" fontSize="16" fill="#334155" fontStyle="italic">C</text>
              </svg>
              <div className="bg-white rounded p-3 mt-2 border border-slate-200">
                <p className="text-sm text-green-800 font-bold mb-2">例子：</p>
                <div className="flex items-center gap-4">
                  <svg viewBox="0 0 110 88" className="w-28 flex-none touch-none">
                    <polygon points="55,12 8,78 102,78" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <line x1="27.5" y1="42" x2="35.5" y2="48" stroke="#9333ea" strokeWidth="2" />
                    <line x1="82.5" y1="42" x2="74.5" y2="48" stroke="#9333ea" strokeWidth="2" />
                    <path d="M 21 78 A 13 13 0 0 0 15.5 67.4" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                    <path d="M 89 78 A 13 13 0 0 1 94.5 67.4" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                    <text x="25" y="72" fontSize="10" fill="#334155">67°</text>
                    <text x="83" y="72" fontSize="12" fill="#334155" fontStyle="italic">x</text>
                  </svg>
                  <div className="text-sm text-slate-700">
                    <p className="text-green-700 font-bold mb-1">底角 = 67°</p>
                    <div className="grid grid-cols-[auto_auto_1fr] gap-x-2">
                      <div className="text-right">x</div>
                      <div className="text-center">=</div>
                      <div className="text-left">180° - 67° - 67°</div>
                      
                      <div className="text-right">x</div>
                      <div className="text-center">=</div>
                      <div className="text-left">46°</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 text-center mt-3">
                <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(等腰△底角)</span>
              </p>
            </div>
          </div>

          {/* 7. 等角對邊相等 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">7</span>
              等角對邊相等
              <span className="text-sm text-slate-500 font-normal">（等底角 → 等腰）</span>
            </h3>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
              <p className="text-center text-xl font-bold text-green-800 my-1">若 ∠B = ∠C，則 AB = AC</p>
              <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                <polygon points="150,20 80,120 220,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                <path d="M 100 120 A 20 20 0 0 0 91.5 103.6" stroke="#2563eb" strokeWidth="2" fill="none" />
                <path d="M 106 120 A 26 26 0 0 0 94.9 98.7" stroke="#2563eb" strokeWidth="2" fill="none" />
                <path d="M 200 120 A 20 20 0 0 1 208.5 103.6" stroke="#2563eb" strokeWidth="2" fill="none" />
                <path d="M 194 120 A 26 26 0 0 1 205.1 98.7" stroke="#2563eb" strokeWidth="2" fill="none" />
                <line x1="105" y1="70" x2="120" y2="78" stroke="#ef4444" strokeWidth="2" />
                <line x1="180" y1="78" x2="195" y2="70" stroke="#ef4444" strokeWidth="2" />
                <text x="145" y="14" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                <text x="60" y="125" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                <text x="230" y="125" fontSize="16" fill="#334155" fontStyle="italic">C</text>
              </svg>
              <p className="text-sm text-slate-600 text-center mt-3">
                <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(等角對邊相等)</span>
              </p>
            </div>
          </div>

          {/* 8. 三角形外角 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">8</span>
              三角形外角
              <span className="text-sm text-slate-500 font-normal">（外角 = 內對角之和）</span>
            </h3>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
              <p className="text-center text-xl font-bold text-green-800 my-1">其中 d = a + b</p>
              <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                <polygon points="170,20 80,120 220,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                <line x1="220" y1="120" x2="280" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                <path d="M 160.0 31.1 A 15 15 0 0 0 176.7 33.4" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 100.0 120.0 A 20 20 0 0 0 93.4 105.1" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 213.3 106.6 A 15 15 0 0 1 235.0 120.0" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <text x="163" y="49" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                <text x="102" y="114" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                <text x="228.1" y="103.7" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">d</text>
                <text x="165" y="14" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                <text x="60" y="125" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                <text x="215" y="138" fontSize="16" fill="#334155" fontStyle="italic">C</text>
              </svg>
              <p className="text-sm text-slate-600 text-center mt-3">
                <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(△外角)</span>
              </p>
            </div>
          </div>

          {/* 9. 等邊三角形性質 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">9</span>
              等邊三角形性質
              <span className="text-sm text-slate-500 font-normal">（三邊等長 ⟷ 三角均 60°）</span>
            </h3>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
              <p className="text-center text-xl font-bold text-green-800 my-1">若 AB = BC = AC</p>
              <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                <polygon points="150,25 95,120 205,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                {/* Tick marks on edges */}
                <line x1="118.2" y1="70.0" x2="126.8" y2="75.0" stroke="#ef4444" strokeWidth="2" />
                <line x1="173.2" y1="75.0" x2="181.8" y2="70.0" stroke="#ef4444" strokeWidth="2" />
                <line x1="150.0" y1="115.0" x2="150.0" y2="125.0" stroke="#ef4444" strokeWidth="2" />

                <path d="M 140.0 42.3 A 20 20 0 0 0 160.0 42.3" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 115.0 120.0 A 20 20 0 0 0 105.0 102.7" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 195.0 102.7 A 20 20 0 0 0 185.0 120.0" stroke="#2563eb" strokeWidth="1.5" fill="none" />

                <text x="141" y="58" fontSize="12" fill="#1e3a8a">60°</text>
                <text x="115" y="115" fontSize="12" fill="#1e3a8a">60°</text>
                <text x="168" y="115" fontSize="12" fill="#1e3a8a">60°</text>

                <text x="145" y="18" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                <text x="80" y="125" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                <text x="210" y="125" fontSize="16" fill="#334155" fontStyle="italic">C</text>
              </svg>
              <p className="text-center font-bold text-blue-800 my-1">則 ∠A = ∠B = ∠C = 60°</p>
              <p className="text-sm text-slate-600 text-center mt-3">
                <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(等邊△性質)</span>
              </p>
            </div>
          </div>

          {/* 10. 等腰三角形性質 */}
          <div className="md:col-span-2 flex flex-col">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">10</span>
              等腰三角形性質
              <span className="text-sm text-slate-500 font-normal">（頂角平分線、底邊中線、底邊高線：三線合一）</span>
            </h3>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* case 1 */}
                <div className="text-center">
                  <p className="text-sm text-slate-700 mb-2">若 <b>AB = AC</b> 及 <b>BM = CM</b></p>
                  <svg viewBox="0 0 160 140" className="w-full max-w-[120px] mx-auto my-1 touch-none">
                    <polygon points="80,20 30,120 130,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <line x1="80" y1="20" x2="80" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="59.5" y1="72.2" x2="50.5" y2="67.8" stroke="#ef4444" strokeWidth="2" />
                    <line x1="100.5" y1="72.2" x2="109.5" y2="67.8" stroke="#ef4444" strokeWidth="2" />
                    <line x1="57" y1="115" x2="57" y2="125" stroke="#ef4444" strokeWidth="2" />
                    <line x1="53" y1="115" x2="53" y2="125" stroke="#ef4444" strokeWidth="2" />
                    <line x1="107" y1="115" x2="107" y2="125" stroke="#ef4444" strokeWidth="2" />
                    <line x1="103" y1="115" x2="103" y2="125" stroke="#ef4444" strokeWidth="2" />
                    <text x="75" y="14" fontSize="14" fill="#334155" fontStyle="italic">A</text>
                    <text x="15" y="125" fontSize="14" fill="#334155" fontStyle="italic">B</text>
                    <text x="135" y="125" fontSize="14" fill="#334155" fontStyle="italic">C</text>
                    <text x="74" y="135" fontSize="14" fill="#334155" fontStyle="italic">M</text>
                  </svg>
                  <p className="text-sm text-blue-800 font-bold">則 AM ⊥ BC 及 x = y</p>
                </div>

                {/* case 2 */}
                <div className="text-center md:border-l md:border-green-200">
                  <p className="text-sm text-slate-700 mb-2">若 <b>AB = AC</b> 及 <b>AM ⊥ BC</b></p>
                  <svg viewBox="0 0 160 140" className="w-full max-w-[120px] mx-auto my-1 touch-none">
                    <polygon points="80,20 30,120 130,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <line x1="80" y1="20" x2="80" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="59.5" y1="72.2" x2="50.5" y2="67.8" stroke="#ef4444" strokeWidth="2" />
                    <line x1="100.5" y1="72.2" x2="109.5" y2="67.8" stroke="#ef4444" strokeWidth="2" />
                    <polyline points="70,120 70,110 80,110" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <text x="75" y="14" fontSize="14" fill="#334155" fontStyle="italic">A</text>
                    <text x="15" y="125" fontSize="14" fill="#334155" fontStyle="italic">B</text>
                    <text x="135" y="125" fontSize="14" fill="#334155" fontStyle="italic">C</text>
                    <text x="74" y="135" fontSize="14" fill="#334155" fontStyle="italic">M</text>
                  </svg>
                  <p className="text-sm text-blue-800 font-bold">則 BM = CM 及 x = y</p>
                </div>

                {/* case 3 */}
                <div className="text-center md:border-l md:border-green-200">
                  <p className="text-sm text-slate-700 mb-2">若 <b>AB = AC</b> 及 <b>x = y</b></p>
                  <svg viewBox="0 0 160 140" className="w-full max-w-[120px] mx-auto my-1 touch-none">
                    <polygon points="80,20 30,120 130,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <line x1="80" y1="20" x2="80" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="59.5" y1="72.2" x2="50.5" y2="67.8" stroke="#ef4444" strokeWidth="2" />
                    <line x1="100.5" y1="72.2" x2="109.5" y2="67.8" stroke="#ef4444" strokeWidth="2" />
                    <path d="M 71.1 37.9 A 20 20 0 0 0 80.0 40.0" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 80.0 44.0 A 24 24 0 0 0 90.7 41.5" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <text x="67.6" y="56.1" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
                    <text x="82.4" y="56.1" fontSize="12" fill="#1e3a8a" fontStyle="italic">y</text>
                    <text x="75" y="14" fontSize="14" fill="#334155" fontStyle="italic">A</text>
                    <text x="15" y="125" fontSize="14" fill="#334155" fontStyle="italic">B</text>
                    <text x="135" y="125" fontSize="14" fill="#334155" fontStyle="italic">C</text>
                    <text x="74" y="135" fontSize="14" fill="#334155" fontStyle="italic">M</text>
                  </svg>
                  <p className="text-sm text-blue-800 font-bold">則 BM = CM 及 AM ⊥ BC</p>
                </div>

              </div>
              <p className="text-sm text-slate-600 text-center mt-3 border-t border-green-200 pt-2">
                <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(等腰△性質)</span>
              </p>
            </div>
          </div>

          {/* 11. 多邊形內角和 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">11</span>
              多邊形內角和
              <span className="text-sm text-slate-500 font-normal">（n 邊形內角和）</span>
            </h3>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 flex-1">
              <p className="text-center text-xl font-bold text-amber-800 my-1">內角和 = (n - 2) × 180°</p>
              <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                <polygon points="120,30 200,20 250,70 230,120 70,90" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                
                <path d="M 112.3 39.2 A 12 12 0 0 0 131.9 28.5" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 188.1 21.5 A 12 12 0 0 0 208.5 28.5" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 241.5 61.5 A 12 12 0 0 0 245.5 81.1" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 234.5 108.9 A 12 12 0 0 0 218.2 117.8" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 81.8 92.2 A 12 12 0 0 0 77.7 80.8" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                
                <text x="125.6" y="52" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
                <text x="187.9" y="45.8" fontSize="12" fill="#1e3a8a">133°</text>
                <text x="212.0" y="76.0" fontSize="12" fill="#1e3a8a">120°</text>
                <text x="214.4" y="105.7" fontSize="12" fill="#1e3a8a">80°</text>
                <text x="85.7" y="87.6" fontSize="12" fill="#1e3a8a">77°</text>
              </svg>
              <div className="bg-white rounded p-3 mt-2 border border-slate-200">
                <p className="text-sm text-amber-800 font-bold mb-2">例子（五邊形, n=5）：</p>
                <div className="text-sm text-slate-700 grid grid-cols-[1fr_auto_1fr] gap-x-2">
                  <div className="text-right">x + 77° + 80° + 120° + 133°</div>
                  <div className="text-center">=</div>
                  <div className="text-left">(5 - 2) × 180°</div>
                  
                  <div className="text-right">x + 410°</div>
                  <div className="text-center">=</div>
                  <div className="text-left">540°</div>
                  
                  <div className="text-right">x</div>
                  <div className="text-center">=</div>
                  <div className="text-left">130°</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 text-center mt-3">
                <span className="bg-white border rounded px-2 py-0.5 font-bold text-amber-900">(多邊形內角和)</span>
              </p>
            </div>
          </div>

          {/* 12. 多邊形外角和 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">12</span>
              多邊形外角和
              <span className="text-sm text-slate-500 font-normal">（外角總和 = 360°）</span>
            </h3>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 flex-1">
              <p className="text-center text-xl font-bold text-amber-800 my-1">外角和 = 360°</p>
              <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                <polygon points="130,40 120,90 200,110 260,60" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                
                <line x1="130" y1="40" x2="91" y2="34" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                <line x1="120" y1="90" x2="114" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                <line x1="200" y1="110" x2="240" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                <line x1="260" y1="60" x2="284" y2="40" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                
                <path d="M 118.1 38.2 A 12 12 0 0 0 127.6 51.8" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 117.6 101.8 A 12 12 0 0 0 131.6 92.9" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 211.6 112.9 A 12 12 0 0 0 209.2 102.3" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                <path d="M 269.2 52.3 A 12 12 0 0 0 248.1 58.2" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                
                <text x="103.0" y="57.6" fontSize="12" fill="#1e3a8a">95°</text>
                <text x="126.8" y="113.6" fontSize="12" fill="#1e3a8a">76°</text>
                <text x="216.4" y="110.1" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
                <text x="248.6" y="41.9" fontSize="12" fill="#1e3a8a">114°</text>

                <text x="135" y="32" fontSize="14" fill="#334155" fontStyle="italic">A</text>
                <text x="100" y="85" fontSize="14" fill="#334155" fontStyle="italic">B</text>
                <text x="195" y="125" fontSize="14" fill="#334155" fontStyle="italic">C</text>
                <text x="265" y="75" fontSize="14" fill="#334155" fontStyle="italic">D</text>
              </svg>
              <div className="bg-white rounded p-3 mt-2 border border-slate-200">
                <p className="text-sm text-amber-800 font-bold mb-2">例子（四邊形 ABCD）：</p>
                <div className="text-sm text-slate-700 grid grid-cols-[1fr_auto_1fr] gap-x-2">
                  <div className="text-right">x + 76° + 95° + 114°</div>
                  <div className="text-center">=</div>
                  <div className="text-left">360°</div>
                  
                  <div className="text-right">x + 285°</div>
                  <div className="text-center">=</div>
                  <div className="text-left">360°</div>
                  
                  <div className="text-right">x</div>
                  <div className="text-center">=</div>
                  <div className="text-left">75°</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 text-center mt-3">
                <span className="bg-white border rounded px-2 py-0.5 font-bold text-amber-900">(多邊形外角和)</span>
              </p>
            </div>
          </div>

        </div>
      </CollapsibleSection>
    </>
  );
};

// ========================================
// CH6 量度與誤差 (F2)
// ========================================
export const MeasurementErrorsNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-orange-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH6 量度與誤差</h1>
        <p className="text-slate-600">認識及計算量度刻度中的各類誤差</p>
      </div>

      <CollapsibleSection id="precision-absolute-error" title="精準度與絕對誤差" num={1} color="orange" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3">📝 1. 精準度 (Precision)</h3>
            <p className="text-slate-700 font-bold mb-2">定義：最近的量度刻度之差</p>
            <div className="bg-white rounded p-3 mb-2">
              <p className="text-blue-700 text-sm mb-2">例子 (電流錶)：0和200當中有10格</p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <span className="font-bold text-blue-700">精準度 = <Latex math="\dfrac{200}{10} = 20 \text{ A}" /></span>
                <div className="flex-1">
                  <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200">
                    <svg width="100%" viewBox="0 0 300 210" className="max-w-[280px]">
                      <defs>
                        <filter id="meter-shadow">
                          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      <path d="M 30 150 A 120 120 0 0 1 270 150" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                      
                      {Array.from({ length: 41 }).map((_, i) => {
                        const v = i * 20;
                        const angle = -150 + (v / 800) * 120;
                        const rad = angle * Math.PI / 180;
                        const isMajor = v % 200 === 0;
                        const isMid = v % 100 === 0 && !isMajor;
                        
                        const rOuter = 130;
                        const rInner = isMajor ? 110 : isMid ? 115 : 120;
                        
                        const x1 = 150 + rInner * Math.cos(rad);
                        const y1 = 150 + rInner * Math.sin(rad);
                        const x2 = 150 + rOuter * Math.cos(rad);
                        const y2 = 150 + rOuter * Math.sin(rad);
                        
                        return (
                          <g key={v}>
                            <line 
                              x1={x1} y1={y1} x2={x2} y2={y2} 
                              stroke="#1e293b" 
                              strokeWidth={isMajor ? 3 : isMid ? 2 : 1.5} 
                            />
                            {isMajor && (
                              <text 
                                x={150 + 82 * Math.cos(rad)} 
                                y={150 + 82 * Math.sin(rad) + 8} 
                                textAnchor="middle" 
                                fontSize="22" 
                                fontWeight="bold" 
                                fill="#0f172a"
                                className="font-sans tracking-tighter"
                              >
                                {v}
                              </text>
                            )}
                          </g>
                        );
                      })}

                      <text x="150" y="195" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#0f172a">A</text>

                      <g filter="url(#meter-shadow)">
                        <polygon points="146,160 154,160 151,35 149,35" fill="#1e293b" transform="rotate(-60 150 150)" />
                        <circle cx="150" cy="150" r="18" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" opacity="0.9" />
                        <circle cx="150" cy="150" r="8" fill="#0f172a" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 2. 絕對誤差 (Absolute Error)</h3>
            <div className="bg-white rounded p-3 border border-red-200">
              <p className="text-red-600 font-bold text-lg mb-2 border-b border-red-50 pb-2">量度錯了多少</p>
              <p className="text-slate-700 font-bold text-center mb-2">量度值 − 真確值 &nbsp; 或 &nbsp; 真確值 − 量度值</p>
              <p className="text-green-700 text-sm">(題目會提供真確值)</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="max-absolute-error" title="最大絕對誤差" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3 text-lg">3. 最大絕對誤差 (Maximum Absolute Error)</h3>
            
            <div className="bg-white rounded p-3 text-center mb-3">
              <p className="font-bold text-green-700 mb-1">(不知真確值)</p>
              <p className="font-bold text-lg text-slate-800">
                最大絕對誤差 = 精準度 <Latex math="\div" /> 2
              </p>
            </div>

            <div className="bg-amber-50 rounded p-3 border border-amber-200 mb-3">
              <p className="text-slate-700 text-sm font-bold mb-2">「<span className="bg-yellow-200 px-1 rounded text-green-700">精準度</span>」亦會表達為：</p>
              <ul className="text-sm space-y-1 text-blue-700 font-bold ml-4">
                <li>• 刻度之間的距離 /</li>
                <li>• 準確至最接近的 <span className="border-b-2 border-red-500 text-red-600">(單位)</span></li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-sm font-bold text-blue-800 mb-3 bg-blue-100 inline-block px-2 py-1 rounded">試做 6.4</p>
              <p className="text-slate-700 mb-3 text-sm">求下列各量度值的最大絕對誤差。</p>
              
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-700 w-6">(a)</span>
                  <span className="text-slate-600">100°C</span>
                  <span className="text-sm text-slate-500">(準確至最接近的 <span className="bg-yellow-200 px-1 rounded font-bold text-slate-800">10°C</span>)</span>
                  <span className="ml-auto font-bold text-blue-700"><Latex math="10^\circ \text{C} \div 2 = 5^\circ \text{C}" /></span>
                </div>
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-700 w-6">(b)</span>
                  <span className="text-slate-600">66.7 cm</span>
                  <span className="text-sm text-slate-500">(準確至最接近的 <span className="bg-yellow-200 px-1 rounded font-bold text-slate-800">0.1 cm</span>)</span>
                  <span className="ml-auto font-bold text-blue-700"><Latex math="0.1 \div 2 = 0.05 \text{ cm}" /></span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-700 w-6">(c)</span>
                  <span className="text-slate-600">12.85 kg</span>
                  <span className="text-sm text-slate-500">(準確至最接近的 <span className="bg-yellow-200 px-1 rounded font-bold text-slate-800">0.01 kg</span>)</span>
                  <span className="ml-auto font-bold text-blue-700"><Latex math="0.01 \div 2 = 0.005 \text{ kg}" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="relative-percentage-error" title="相對誤差與百分誤差" num={3} color="red" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-3 text-lg">4. 相對誤差 (Relative Error)</h3>
            <div className="bg-white rounded p-3 text-center mb-3">
              <p className="font-bold text-slate-800 text-lg mb-1">相對誤差 = 最大絕對誤差 <Latex math="\div" /> 量度值</p>
              <p className="font-bold text-red-600">(必定 小 <Latex math="\div" /> 大)</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-sm font-bold text-blue-800 mb-3 bg-blue-100 inline-block px-2 py-1 rounded">試做 6.6</p>
              <p className="text-slate-700 mb-3 text-sm">
                一部計算機的重量量得 250 g (準確至最接近的 10 g)。求量得的重量的
              </p>
              
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-bold text-slate-700 w-8">(a)</span>
                  <span className="text-slate-700">最大絕對誤差</span>
                  <span className="font-bold text-blue-700 mt-1 sm:mt-0 sm:ml-auto"><Latex math="10 \div 2 = 5 \text{ g}" /></span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-bold text-slate-700 w-8">(b)</span>
                  <span className="text-slate-700 bg-yellow-200 px-1 rounded font-bold">相對誤差</span>
                  <span className="text-green-600 font-bold ml-2 text-sm sm:hidden mt-2">↑ 不需單位</span>
                  <span className="font-bold text-blue-700 mt-1 sm:mt-0 sm:ml-auto flex items-center gap-2">
                    <Latex math="5 \div 250 = 0.02" />
                    <span className="text-green-600 font-bold hidden sm:inline-block">← 不需單位</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3 text-lg">5. 百分誤差 (Percentage Error)</h3>
            <div className="bg-white rounded p-3 text-center">
              <p className="font-bold text-slate-800 text-lg">百分誤差 = 相對誤差 <Latex math="\times 100\%" /></p>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

export const AlgebraicFractionsNotes = ({ activeSub }) => {
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    if (!activeSub) return;
    const target = rootRef.current?.querySelector(`[id="${activeSub}"]`) || document.getElementById(activeSub);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }, [activeSub]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-violet-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH5 代數分式</h1>
        <p className="text-slate-600">處理有未知數的分數運算及主項變換技巧</p>
      </div>

      <div ref={rootRef} className="space-y-8 text-slate-700">
        <CollapsibleSection id="addition-subtraction" title="代數分式加減 (看分母是否相同)" num={1} color="purple" activeSub={activeSub}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* 分母相同 */}
            <div className="flex-1 bg-green-50 p-5 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-800 mb-4 text-lg">A. 分母相同</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-sm font-bold font-serif italic">e.g.</span>
                  <div className="flex items-center gap-2 text-lg">
                    <Latex math="\dfrac{3x}{x+2}+\dfrac{6}{x+2}" />
                  </div>
                </div>
                
                <div className="pl-6 space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="font-bold">=</span>
                    <Latex math="\dfrac{3x+6}{x+2}" />
                    <span className="text-sm text-green-700">← 分子加減，分母相同二合為一</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">=</span>
                    <div className="relative">
                      <Latex math="\dfrac{3(x+2)}{x+2}" />
                      {/* strikethroughs for x+2 */}
                      <div className="absolute top-[18%] right-0 w-8 sm:w-10 h-[2px] bg-red-500 -rotate-[20deg]"></div>
                      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-8 sm:w-10 h-[2px] bg-red-500 -rotate-[20deg]"></div>
                    </div>
                    <span className="text-sm text-green-700">← 完成前檢查能否抽公因式和化簡</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">=</span>
                    <Latex math="3" />
                  </div>
                </div>
              </div>
            </div>

            {/* 分母不同 */}
            <div className="flex-1 bg-red-50 p-5 rounded-xl border border-red-200">
              <h3 className="font-bold text-red-800 mb-4 text-lg">B. 分母不同</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-red-200 text-red-800 px-2 py-0.5 rounded text-sm font-bold font-serif italic">e.g.</span>
                  <div className="flex items-center gap-2 text-lg">
                    <Latex math="\dfrac{1}{4y}+\dfrac{7}{10y}" />
                  </div>
                </div>

                <div className="pl-6 space-y-3">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-bold">=</span>
                    <Latex math="\dfrac{1 \cdot 10y}{4y \cdot 10y} + \dfrac{7 \cdot 4y}{10y \cdot 4y}" />
                    <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded">
                      ← 擴分 (分母互相乘對面，分子跟分母相乘)
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">=</span>
                    <Latex math="\dfrac{10y + 28y}{40y^2}" />
                    <span className="text-sm text-slate-500">← <Latex math="(1 \cdot 10y) + (7 \cdot 4y)" /></span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">=</span>
                    <div className="relative inline-block">
                      <Latex math="\dfrac{38y}{40y^2}" />
                      {/* strikethroughs for y and power 2 */}
                      <div className="absolute top-[20%] right-0 w-[0.8rem] h-[2px] bg-red-500 -rotate-[30deg]"></div>
                      <div className="absolute bottom-[40%] right-[-0.1rem] w-[0.6rem] h-[2px] bg-red-500 -rotate-[30deg]"></div>
                    </div>
                    <span className="text-sm text-green-700">← 完成前檢查能否抽公因式和化簡</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">=</span>
                    <Latex math="\dfrac{19}{20y}" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="multiplication-division" title="代數分式乘除 (約簡)" num={2} color="blue" activeSub={activeSub}>
          <div className="space-y-6">
            <div className="bg-green-50 text-green-800 p-3 rounded-lg border border-green-200 inline-block font-bold">
              口訣：上乘上，下乘下
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-sm font-bold font-serif italic">e.g.</span>
                  <Latex math="\dfrac{6}{7c} \times \dfrac{c}{2y}" />
                </div>
                <span className="font-bold">=</span>
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Latex math="\dfrac{6c}{14cy}" />
                      <div className="absolute top-2 right-1.5 w-3 h-0.5 bg-red-500 -rotate-45"></div>
                      <div className="absolute bottom-2 right-4 w-3 h-0.5 bg-red-500 -rotate-45"></div>
                    </div>
                    <div className="flex flex-col text-sm text-green-700">
                      <span>← 上乘上</span>
                      <span>← 下乘下</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-bold">=</span>
                    <Latex math="\dfrac{3}{7y}" />
                    <span className="text-sm bg-yellow-200 text-slate-800 px-2 py-0.5 rounded font-bold">計算機約簡</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-rose-50 p-5 rounded-xl border-2 border-rose-200 shadow-sm">
              <h3 className="font-bold text-red-600 mb-6 text-lg flex items-center gap-2">
                <span className="text-xl">⚠️</span> 需分辨何時可以 / 不能約簡 (<Latex math="\times \div" /> 可以 / <Latex math="+ -" /> 不能)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 可以約簡 */}
                <div className="bg-white p-4 rounded-lg border border-green-300 relative">
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl shadow">✓</div>
                  <div className="flex justify-center mb-6">
                    <div className="relative text-xl">
                      <Latex math="\dfrac{4pq}{14p^2q}" />
                      <div className="absolute top-1 left-0 text-red-600 text-xs font-bold line-through">4</div>
                      <div className="absolute bottom-1 left-0 text-red-600 text-xs font-bold line-through">14</div>
                      <div className="absolute -top-2 left-0 text-xs font-bold text-slate-700">2</div>
                      <div className="absolute -bottom-3 left-0 text-xs font-bold text-slate-700">7</div>
                      <div className="absolute top-2 right-1.5 w-3 h-0.5 bg-red-500 -rotate-45"></div>
                      <div className="absolute bottom-2 right-1.5 w-3 h-0.5 bg-red-500 -rotate-45"></div>
                      <div className="absolute top-2 right-4 w-3 h-0.5 bg-red-500 -rotate-45"></div>
                      <div className="absolute bottom-2 right-5 w-3 h-0.5 bg-red-500 -rotate-45"></div>
                    </div>
                  </div>
                  <div className="text-center font-bold text-green-700">
                    是乘數，可以約簡
                  </div>
                </div>

                {/* 不能約簡 */}
                <div className="bg-white p-4 rounded-lg border border-red-300 relative">
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl shadow">✗</div>
                  <div className="flex justify-center mb-4">
                    <div className="relative text-xl flex items-center gap-4">
                      <div>
                        <Latex math="\dfrac{4x + 2y}{2x}" />
                        <div className="absolute top-1 left-0 w-4 h-0.5 bg-red-500 -rotate-45"></div>
                        <div className="absolute bottom-2 left-1 w-4 h-0.5 bg-red-500 -rotate-45"></div>
                      </div>
                      <span className="text-3xl text-red-500 font-bold">X</span>
                    </div>
                  </div>
                  <div className="text-center text-sm">
                    <p className="font-bold text-green-700 mb-2">不能約簡，因為上面大畫面是 "+"</p>
                    <p className="text-purple-700 font-bold mb-3">↓ 要先找相同的因數/代數 因式分解</p>
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-3">
                        <div className="relative text-lg">
                          <Latex math="\dfrac{2(2x+y)}{2x}" />
                          <div className="absolute top-1 left-0 w-3 h-0.5 bg-red-500 -rotate-45"></div>
                          <div className="absolute bottom-1 left-0 w-3 h-0.5 bg-red-500 -rotate-45"></div>
                        </div>
                        <span className="text-green-700 font-bold text-xs">← 大畫面 <Latex math="2 \cdot (2x+y)" /> 為乘數</span>
                      </div>
                      <div>
                        <span className="font-bold">=</span>
                        <Latex math="\dfrac{2x+y}{x}" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="subject-change" title="主項變換" num={3} color="green" activeSub={activeSub}>
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <h3 className="font-bold text-blue-800 mb-3">成為主項的條件 (例: <Latex math="x" /> 是主項)</h3>
              <ol className="list-decimal list-inside text-red-600 font-bold space-y-1 ml-2">
                <li><Latex math="x" /> 只在左方 (其中一方)</li>
                <li>右方沒有 <Latex math="x" /></li>
              </ol>
            </div>

            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
              <h3 className="font-bold text-amber-900 mb-4 text-lg">實戰口訣：「乘拆移抽除」五步曲</h3>
              <p className="text-sm font-bold text-green-700 mb-3">在題目步驟中，(按順序) 見到 ______，就要 ______</p>
              
              <div className="overflow-hidden rounded-lg border border-amber-200 bg-white mb-6">
                <table className="w-full text-left text-sm md:text-base">
                  <thead className="bg-amber-100 text-amber-800">
                    <tr>
                      <th className="p-3">見到</th>
                      <th className="p-3 w-16 text-center">就要</th>
                      <th className="p-3">行動</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-50 font-bold">
                    <tr>
                      <td className="p-3 text-green-700">分數</td>
                      <td className="p-3 text-red-600 text-center text-lg">乘</td>
                      <td className="p-3 text-green-700">(交叉相乘)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-green-700">括號</td>
                      <td className="p-3 text-red-600 text-center text-lg">拆</td>
                      <td className="p-3 text-green-700">(拆除括號)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-green-700 flex flex-col">
                        <span>主項</span>
                        <span className="text-xs text-blue-600 font-normal">(例. <Latex math="x" /> 是主項)</span>
                      </td>
                      <td className="p-3 text-red-600 text-center text-lg">移</td>
                      <td className="p-3 text-green-700">(所有有 <Latex math="x" /> 的項放在同一邊)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-green-700">主項出現多於一次</td>
                      <td className="p-3 text-red-600 text-center text-lg">抽</td>
                      <td className="p-3 text-green-700">(因式分解抽 <Latex math="x" />)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-green-700">主項旁有其他數字/代數</td>
                      <td className="p-3 text-red-600 text-center text-lg">除</td>
                      <td className="p-3 text-green-700">(除去另一方變分數)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 例題 1 */}
              <div className="bg-white p-5 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-blue-800">例子 1：</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold">[ <Latex math="n" /> 為主項 ]</span>
                </div>
                
                <div className="space-y-3 font-sans text-sm md:text-base">
                  <div className="flex gap-4 items-center">
                    <Latex math="n(m-5) = 3m + 2n" block left />
                  </div>
                  <div className="text-xs text-purple-700 font-bold ml-4">
                    沒分數 → 有括號，拆 →
                  </div>
                  <div className="flex gap-4 items-center">
                    <Latex math="\boldsymbol{nm} - \boldsymbol{5n} = 3m + \boldsymbol{2n}" block left />
                  </div>
                  <div className="flex gap-4 items-center">
                    <Latex math="\boldsymbol{nm} - \boldsymbol{5n} - \boldsymbol{2n} = 3m" block left />
                    <span className="text-purple-700 text-xs whitespace-nowrap">← n全放左方</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Latex math="\boldsymbol{n}(m - 7) = 3m" block left />
                    <span className="text-purple-700 text-xs whitespace-nowrap">← 抽n (變成唯一主項)</span>
                  </div>
                  <div className="flex gap-4 items-center mt-2">
                    <Latex math="\boldsymbol{n} = \dfrac{3m}{m - 7}" block left />
                    <span className="text-purple-700 text-xs whitespace-nowrap">← 將 m-7 放進另一方除</span>
                  </div>
                </div>
              </div>

              {/* 例題 2 */}
              <div className="bg-white p-5 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-blue-800">例子 2：</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold">[ <Latex math="b" /> 為主項 ]</span>
                </div>

                <div className="space-y-3 font-sans text-sm md:text-base">
                  <div className="flex gap-4 items-center">
                    <Latex math="\dfrac{a+4}{3} = \dfrac{b+1}{2}" block left />
                    <span className="text-red-500 font-bold">乘</span>
                    <span className="text-green-700 text-xs whitespace-nowrap">交叉相乘 (拆分數)</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Latex math="2(a+4) = 3(b+1)" block left />
                    <span className="text-red-500 font-bold">拆</span>
                    <span className="text-green-700 text-xs whitespace-nowrap">拆括號</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Latex math="2a+8 = 3\boldsymbol{b}+3" block left />
                    <span className="text-red-500 font-bold">移</span>
                    <span className="text-green-700 text-xs whitespace-nowrap">主項放一邊，沒有主項放另一邊</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Latex math="2a+8-3 = 3\boldsymbol{b}" block left />
                    <span className="text-red-500 font-bold">抽</span>
                    <span className="text-green-700 text-xs whitespace-nowrap">(無)</span>
                  </div>
                  <div className="flex gap-4 items-center pl-4">
                    <Latex math="2a+5 = 3\boldsymbol{b}" block left />
                  </div>
                  <div className="flex gap-4 items-center mt-2">
                    <Latex math="\dfrac{2a+5}{3} = \boldsymbol{b}" block left />
                    <span className="text-red-500 font-bold">除</span>
                    <span className="text-green-700 text-xs whitespace-nowrap">b(主項)旁邊丟往另一邊除</span>
                  </div>
                  <div className="flex gap-4 items-center mt-2 pt-2 border-t border-slate-100">
                    <Latex math="\boldsymbol{b} = \dfrac{2a+5}{3}" block left />
                    <span className="text-purple-700 text-xs font-bold whitespace-nowrap ml-4">主項放左邊</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </>
  );
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
                            
                            <circle cx="65" cy="-20" r="5" fill="currentColor" stroke="currentColor" strokeWidth="2.5" />
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
                            <line x1="100" y1="-15" x2="100" y2="20" stroke="currentColor" strokeWidth="2.5" />
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
                            <line x1="65" y1="-15" x2="65" y2="20" stroke="currentColor" strokeWidth="2.5" />
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

export const IdentitiesF2Notes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 px-4 md:px-0">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-indigo-500">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">CH3 恆等式</h1>
          <p className="text-slate-600">認識恆等式的定義及比較同類項的技巧</p>
        </div>

        {/* 3.1 恆等式 */}
        <CollapsibleSection id="identities-def" title="3.1 恆等式" num={1} color="indigo" activeSub={activeSub} sectionRef={s1}>
          <div className="space-y-4">
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <h3 className="font-bold text-indigo-800 mb-3">📝 定義：恆等式是什麼？</h3>
              <p className="text-slate-700">恆等式（Identities）即是 <strong>永恆相等的等式</strong>。</p>
              <div className="mt-2 text-center text-indigo-900 bg-white/60 p-2 rounded inline-block mx-auto border border-indigo-100 shadow-sm">
                <Latex math="2y - y \equiv y" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">例子：證明恆等式</h3>
              <p className="text-slate-700 mb-3">證明 <Latex math="2(6x+8) = 4(3x+4)" /> 是恆等式</p>
              
              <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-3">
                <div className="flex items-start">
                  <span className="text-green-700 text-sm font-bold min-w-[210px] pt-1 shrink-0">先抄左方的式，然後進行化簡 ➔</span>
                  <div className="pl-2 space-y-1">
                    <div className="grid grid-cols-[3rem_1.25rem_auto] items-center">
                      <span className="font-semibold text-slate-800 text-right pr-2">左方</span>
                      <span className="font-semibold text-slate-700 text-center">=</span>
                      <Latex math="2(6x+8)" />
                    </div>
                    <div className="grid grid-cols-[3rem_1.25rem_auto] items-center">
                      <span></span>
                      <span className="font-semibold text-slate-700 text-center">=</span>
                      <Latex math="12x+16" />
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-green-700 text-sm font-bold min-w-[210px] pt-1 shrink-0">相同的步驟在右方重覆 ➔</span>
                  <div className="pl-2 space-y-1">
                    <div className="grid grid-cols-[3rem_1.25rem_auto] items-center">
                      <span className="font-semibold text-slate-800 text-right pr-2">右方</span>
                      <span className="font-semibold text-slate-700 text-center">=</span>
                      <Latex math="4(3x+4)" />
                    </div>
                    <div className="grid grid-cols-[3rem_1.25rem_auto] items-center">
                      <span></span>
                      <span className="font-semibold text-slate-700 text-center">=</span>
                      <Latex math="12x+16" />
                    </div>
                  </div>
                </div>

                <div className="flex items-start pt-2 border-t border-slate-200">
                  <span className="text-green-700 text-sm font-bold min-w-[210px] pt-1 shrink-0">固定格式 ➔</span>
                  <div className="pl-2 space-y-1">
                    <div className="grid grid-cols-[3rem_auto] items-center">
                      <span className="font-semibold text-slate-800 text-right pr-2">∵</span>
                      <Latex math="\text{左方}=\text{右方}" />
                    </div>
                    <div className="grid grid-cols-[3rem_auto] items-center">
                      <span className="font-semibold text-slate-800 text-right pr-2">∴</span>
                      <Latex math="2(6x+8)\equiv4(3x+4)" />
                    </div>
                  </div>
                </div>

                <p className="text-sm text-green-700 font-bold mt-1">由 "=" 變成 "≡"</p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 比較同類項 */}
        <CollapsibleSection id="identities-compare" title="可透過已知恆等式去比較同類項的係數" num={2} color="indigo" activeSub={activeSub} sectionRef={s2}>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <p className="mb-4">例如： <Latex math="4x - 5 \equiv Ax + B" /> ，找 <Latex math="A" /> 和 <Latex math="B" /> 的值</p>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6 justify-center">
                 <div className="text-center bg-slate-50 p-4 rounded-lg">
                   <div className="text-lg mb-2">
                     <span className="underline decoration-red-500 decoration-2 underline-offset-4 text-red-700 font-semibold px-1">4x</span> 
                     <span className="underline decoration-green-500 decoration-2 underline-offset-4 text-green-700 font-semibold px-1">- 5</span> 
                     <Latex math="\equiv" /> 
                     <span className="underline decoration-red-500 decoration-2 underline-offset-4 text-red-700 font-semibold px-1">Ax</span> 
                     <span className="underline decoration-green-500 decoration-2 underline-offset-4 text-green-700 font-semibold px-1">+ B</span>
                   </div>
                   <div className="flex justify-center gap-8 mt-4 text-sm font-bold">
                      <div className="flex flex-col text-red-600">
                        <span>(有 x 項)</span>
                        <Latex math="\therefore Ax = 4x" />
                        <Latex math="A = 4" />
                      </div>
                      <div className="flex flex-col text-green-600">
                        <span>(沒 x 項)</span>
                        <Latex math="-5 = B" />
                        <Latex math="B = -5" />
                      </div>
                   </div>
                 </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <p className="bg-amber-100 p-2 rounded mb-4 font-bold inline-block">例子： <Latex math="(3x+1)(x+7) \equiv 3x^2 + Px - 7Q" /></p>
              
              <div className="mb-4 text-indigo-800 font-bold text-sm">
                需先展開括號再比較：
                <span className="underline decoration-red-500 decoration-2 text-red-700 ml-2">x² 項</span>, 
                <span className="underline decoration-green-500 decoration-2 text-green-700 mx-2">x 項</span>, 
                <span className="underline decoration-purple-500 decoration-2 text-purple-700">常數 (沒 x)</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <MathDisplay math="左方 = (3x+1)(x+7)" />
                <MathDisplay math="= 3x^2 + 21x + x + 7" />
                <MathDisplay math="= 3x^2 + 22x + 7" />
              </div>
              
              <div className="mt-4 bg-slate-50 p-4 rounded-lg flex flex-col md:flex-row gap-6 justify-center">
                 <div className="flex flex-col text-green-600 font-bold border-l-4 border-green-400 pl-3">
                   <p className="text-slate-600 text-sm mb-1">比較 x 項：</p>
                   <Latex math="Px = 22x" />
                   <Latex math="P = 22" />
                 </div>
                 <div className="flex flex-col text-purple-600 font-bold border-l-4 border-purple-400 pl-3">
                   <p className="text-slate-600 text-sm mb-1">比較常數項：</p>
                   <Latex math="-7Q = 7" />
                   <Latex math="Q = -1" />
                 </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 三條必記恆等式 */}
        <CollapsibleSection id="identities-formulas" title="3.2 & 3.3 三條必記恆等式！" num={3} color="rose" activeSub={activeSub} sectionRef={s3}>
          <div className="bg-rose-50 rounded-lg p-5 border border-rose-200">
             <div className="space-y-4 mb-8 text-center text-lg md:text-xl font-bold font-serif text-slate-800">
               <div>1. <Latex math="(a+b)^2 = a^2 + 2ab + b^2" /></div>
               <div>2. <Latex math="(a-b)^2 = a^2 - 2ab + b^2" /></div>
               <div className="relative inline-block">
                 3. <Latex math="(a+b)(a-b) = a^2 - b^2" />
                 <div className="absolute -bottom-5 right-0 text-xs text-purple-700 font-bold">沒 2ab 項</div>
                 <div className="absolute -bottom-5 left-10 text-xs text-purple-700 font-bold">一加一減</div>
               </div>
             </div>

             <div className="space-y-6 pt-6 border-t border-rose-200">
               <div>
                  <h4 className="font-bold text-rose-800 mb-2">例子 1: <Latex math="(a+b)^2" /></h4>
                  <MathDisplay math="(x+8)^2 = x^2 + 2(8)(x) + 8^2" />
                  <MathDisplay math="= x^2 + 16x + 64" />
               </div>
               <div>
                  <h4 className="font-bold text-rose-800 mb-2">例子 2: <Latex math="(a-b)^2" /></h4>
                  <MathDisplay math="(2x-5)^2 = (2x)^2 - 2(2x)(5) + 5^2" />
                  <MathDisplay math="= 4x^2 - 20x + 25" />
               </div>
               <div>
                  <h4 className="font-bold text-rose-800 mb-2">例子 3: <Latex math="(a+b)(a-b)" /></h4>
                  <MathDisplay math="2(m+6n)(m-6n) = 2[m^2 - (6n)^2]" />
                  <MathDisplay math="= 2(m^2 - 36n^2)" />
                  <MathDisplay math="= 2m^2 - 72n^2" />
               </div>
             </div>
          </div>
        </CollapsibleSection>

      </div>
    </>
  );
};

// ========================================
// CH4 因式分解 (F2)
// ========================================
export const FactorizationF2Notes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);
  const s4 = useRef(null);
  const s5 = useRef(null);

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 px-4 md:px-0">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-emerald-500">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">CH4 因式分解</h1>
          <p className="text-slate-600">認識展開與因式分解之分別</p>
        </div>

        <CollapsibleSection id="expand-vs-factorize" title="展開 vs 因式分解" num={1} color="emerald" activeSub={activeSub} sectionRef={s1}>
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
              <h3 className="font-bold text-slate-800 mb-6 text-lg border-b border-slate-200 pb-3">
                ⚠️ 需分清楚問題在問<span className="text-red-600 font-bold mx-1">展開</span>還是<span className="text-green-700 font-bold mx-1">因式分解</span>
              </h3>
              
              <div className="relative flex justify-center items-center h-48 my-2">
                <div className="absolute left-1/2 -ml-40 text-3xl font-bold text-slate-800 bg-white px-2 z-10">
                  <Latex math="2(x+2)" />
                </div>
                
                <div className="absolute right-1/2 -mr-40 text-3xl font-bold text-slate-800 bg-white px-2 z-10">
                  <Latex math="2x+4" />
                </div>

                {/* Top arrow */}
                <svg width="240" height="80" className="absolute top-0 left-1/2 -translate-x-1/2 overflow-visible">
                  <path d="M 30 50 Q 120 -10 210 50" fill="none" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
                  <text x="120" y="10" fontSize="18" fontWeight="bold" fill="#ef4444" textAnchor="middle">展開 (拆括號)</text>
                  <defs>
                    <marker id="arrow-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                  </defs>
                </svg>

                {/* Bottom arrow */}
                <svg width="240" height="80" className="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-visible">
                  <path d="M 210 30 Q 120 90 30 30" fill="none" stroke="#15803d" strokeWidth="3" markerEnd="url(#arrow-green)" />
                  <text x="120" y="80" fontSize="18" fontWeight="bold" fill="#15803d" textAnchor="middle">因式分解 [加括號]</text>
                  <defs>
                     <marker id="arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#15803d" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="extract-common-f2" title="提取公因式" num={2} color="purple" activeSub={activeSub} sectionRef={s2}>
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-bold text-purple-800 mb-3">📝 分析題目</h3>
              <p className="text-slate-700 mb-2">若所有項都出現相同代數/因數時可<span className="text-red-600 font-bold">抽取</span></p>

              <div className="bg-white rounded-lg p-3 mb-3">
                <p className="text-sm text-slate-600 mb-2">例子 1：找出相同代數及公因數，先抽出到前面，再加括號裝剩餘部分。</p>
                <div className="flex items-center gap-2 flex-wrap text-lg">
                  <span><span className="bg-yellow-200 px-1 rounded">-</span><span className="bg-green-200 px-1 rounded">6</span>u<span className="bg-yellow-200 px-1 rounded">v</span> <span className="bg-yellow-200 px-1 rounded">-</span><span className="bg-green-200 px-1 rounded">8</span><span className="bg-yellow-200 px-1 rounded">v</span>w</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-lg mt-1">
                  <span className="text-slate-500">=</span>
                  <span><span className="bg-yellow-200 px-1 rounded">-</span><span className="bg-green-200 px-1 rounded">2</span><span className="bg-yellow-200 px-1 rounded">v</span>(<span className="bg-green-200 px-1 rounded">3</span>u+<span className="bg-green-200 px-1 rounded">4</span>w)</span>
                </div>
                <div className="mt-3 text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-200 px-2 py-0.5 rounded">黃</span>
                    <span>= 完全相同的代數</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-200 px-2 py-0.5 rounded">綠</span>
                    <span>= 可抽公因數（6 和 8 都是 2 的倍數）</span>
                    <span className="text-slate-500">6÷2=3，8÷2=4</span>
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
                  <span className="text-pink-600">⤷</span> 抽走一個 m 後，m^3 變為 m^2。
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-2">💡 技巧</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• 先找數字的公因數</li>
                <li>• 再找代數的公因式（取最低次方）</li>
                <li>• 記住：<Latex math="a^3 \\div a = a^2" />（次方相減）</li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="grouping-f2" title="併項法（分組因式分解）" num={3} color="blue" activeSub={activeSub} sectionRef={s3}>
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
              <p className="text-sm text-slate-600 mb-3">例子 1：標準四項</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 shrink-0" />
                  <div className="text-sm w-40 shrink-0"><Latex math="bm + bn + 5m + 5n" /></div>
                  <div className="text-xs text-slate-500 italic">← 前兩項找相同，後兩項找相同</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 shrink-0 text-right font-sans text-sm text-slate-700">=</div>
                  <div className="text-sm w-40 shrink-0"><Latex math="b(m+n) + 5(m+n)" /></div>
                  <div className="text-xs text-slate-500 italic">← 將相同括號抽出</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 shrink-0 text-right font-sans text-sm text-slate-700">=</div>
                  <div className="text-sm w-40 shrink-0"><Latex math="(m+n)(b+5)" /></div>
                  <div className="text-xs text-slate-500 italic">← 另一個括號按順序寫</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-slate-600 mb-2">例子 2：已有括號</p>
              <div className="space-y-1">
                <Latex math={String.raw`\begin{aligned} &(2x-5) - (2x-5)y \\ &= (2x-5)(1-y) \end{aligned}`} block />
              </div>
              <p className="text-sm text-slate-500 mt-2">💡 抽相同括號放前，剩餘部分放後括號</p>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="dse-prev-answer-f2" title="DSE 題型技巧：利用前題答案" num={4} color="red" activeSub={activeSub} sectionRef={s4}>
          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="font-bold text-red-800 mb-3">📋 利用前題答案</h3>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-slate-600 mb-3">DSE 常見 (a) 同 (b) 互相關聯；(b) 可以直接套用 (a) 結果，減少重算。</p>

                <div className="space-y-2 text-sm mb-3">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-700">(a)</span>
                    <span>因式分解 <span className="bg-yellow-200 px-1 rounded"><Latex math="6r^2 - 13rs - 28s^2" /></span></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-700">(b)</span>
                    <span>因式分解 <Latex math="4r - 14s +" /> <span className="bg-yellow-200 px-1 rounded"><Latex math="6r^2 - 13rs - 28s^2" /></span></span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-3">
                  <p className="text-sm font-bold text-green-700 mb-1">(a) 部答案：</p>
                  <Latex math="6r^2 - 13rs - 28s^2 = (2r-7s)(3r+4s)" block />
                </div>

                <div className="bg-yellow-50 p-3 rounded">
                  <p className="text-sm font-bold text-green-700 mb-2">(b) 部套用：</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 shrink-0 text-right font-sans text-sm text-slate-700">=</div>
                      <div className="flex items-center flex-wrap gap-0.5 min-w-0">
                        <Latex math="4r - 14s +" />
                        <span className="bg-yellow-200 rounded px-0.5"><Latex math="(2r-7s)(3r+4s)" /></span>
                      </div>
                      <div className="text-xs text-slate-500 italic shrink-0">← 套用 (a) 部答案</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 shrink-0 text-right font-sans text-sm text-slate-700">=</div>
                      <div className="flex items-center flex-wrap gap-0.5 min-w-0">
                        <span className="bg-green-100 text-green-800 rounded px-0.5"><Latex math="2" /></span>
                        <span className="bg-purple-100 text-purple-800 rounded px-0.5"><Latex math="(2r-7s)" /></span>
                        <span className="bg-green-100 text-green-800 rounded px-0.5"><Latex math="+" /></span>
                        <span className="bg-purple-100 text-purple-800 rounded px-0.5"><Latex math="(2r-7s)" /></span>
                        <span className="bg-green-100 text-green-800 rounded px-0.5"><Latex math="(3r+4s)" /></span>
                      </div>
                      <div className="text-xs text-slate-500 italic shrink-0">← 非 (a) 部答案 抽公因式，應看到有最少兩個 <span className="bg-purple-100 text-purple-800 px-0.5 rounded">相同括號</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 shrink-0 text-right font-sans text-sm text-slate-700">=</div>
                      <div className="flex items-center flex-wrap gap-0.5 min-w-0">
                        <span className="bg-purple-100 text-purple-800 rounded px-0.5"><Latex math="(2r-7s)" /></span>
                        <span className="bg-green-100 text-green-800 rounded px-0.5"><Latex math="(2 + 3r + 4s)" /></span>
                      </div>
                      <div className="text-xs text-slate-500 italic shrink-0">← 抽<span className="bg-purple-100 text-purple-800 px-0.5 rounded">相同的括號</span>放前，<span className="bg-green-100 text-green-800 px-0.5 rounded">剩餘部份</span>放後括號</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="factorization-tips-f2" title="注意事項及陷阱" num={5} color="amber" activeSub={activeSub} sectionRef={s5}>
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-red-600 mb-3 text-lg">＊ 提示 1：</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 my-4">
                {/* 算式部份 */}
                <div className="text-2xl font-bold text-red-600 tracking-wider">
                  49<span className="bg-yellow-200 px-1 rounded mx-0.5">x</span>² - 14<span className="bg-yellow-200 px-1 rounded mx-0.5">x</span>y + y²
                </div>
                
                {/* Q&A 部份 */}
                <div className="flex flex-col space-y-2 text-green-700 font-bold text-lg leading-relaxed">
                  <div className="flex items-start">
                    <span className="mr-2 hidden md:inline">←</span>
                    <div>
                      <div>Q : 只有兩個項有 x 可以抽嗎？</div>
                      <div>A : 需全部項都有 才能抽！</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </>
  );
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

// ========================================
// CH13 面積與體積 (二) (F2)
// ========================================
export const CirclesCylindersF2Notes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 px-4 md:px-0">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-teal-500">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">CH13 面積與體積 (二)</h1>
          <p className="text-teal-700 font-bold text-lg">這課全部是有關圓形！</p>
        </div>

        {/* ========================================
            1. 圓周與弧長
            ======================================== */}
        <CollapsibleSection id="circles-circumference-arc" title="圓周與弧長" num={1} color="teal" activeSub={activeSub} sectionRef={s1}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* 左：圓周 */}
            <div className="w-full md:basis-[36%] md:max-w-[36%] md:flex-none bg-white rounded-lg p-4 border border-teal-200">
              <h3 className="font-bold text-slate-800 mb-3 text-lg flex items-center gap-2">
                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-sm">1.</span> 圓周：
                <span className="bg-green-200 text-slate-800 px-2 py-0.5 rounded font-sans"><Latex math="2 \pi r" /></span>
              </h3>
              
              <div className="relative text-sm text-green-700 font-bold ml-16 -mt-2 mb-2">
                <span className="absolute -top-3 left-6">↖ 半徑</span>
              </div>

              <div className="flex justify-center mb-4">
                <svg viewBox="0 0 160 160" className="w-40 h-40">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#000" strokeWidth="2" />
                  <line x1="80" y1="80" x2="80" y2="150" stroke="#000" strokeWidth="2" />
                  <circle cx="80" cy="80" r="3" fill="#000" />
                  <text x="80" y="70" textAnchor="middle" fontSize="14" fontStyle="italic">O</text>
                  <text x="85" y="120" textAnchor="start" fontSize="14">8 cm</text>
                </svg>
              </div>

              <div className="bg-blue-50 text-blue-900 p-3 rounded font-bold">
                <p>例：圓周：<Latex math="2 \pi (8) = 16 \pi" /> cm</p>
              </div>
            </div>

            {/* 右：弧長 */}
            <div className="w-full md:basis-[64%] md:max-w-[64%] md:flex-none bg-white rounded-lg p-4 border border-teal-200 relative">
              <div className="absolute left-[-26px] top-1/2 -translate-y-1/2 hidden md:block text-slate-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>

              <h3 className="font-bold text-slate-800 mb-3 text-lg flex items-center gap-2 flex-wrap leading-relaxed border-b border-teal-100 pb-2 pt-6">
                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-sm">2.</span> 弧長 <span className="text-sm font-normal text-green-700">(圓周的一部份)</span>：
                <span className="bg-green-200 px-2 py-0.5 rounded font-sans relative">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-sm font-bold text-green-700 whitespace-nowrap hidden md:block">
                    ↓ 圓周公式
                  </div>
                  <Latex math="2 \pi r" />
                </span>
                <Latex math="\times" />
                <span className="bg-yellow-300 px-2 py-0.5 rounded font-sans text-xl"><Latex math="\dfrac{\theta}{360^\circ}" /></span>
              </h3>

              <div className="flex justify-center md:justify-start md:ml-10 mb-4 mt-4 relative min-h-[160px]">
                 <div className="relative">
                   <svg viewBox="0 0 160 160" className="w-40 h-40 overflow-visible">
                     <circle cx="80" cy="80" r="70" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
                     <path d="M 80 80 L 67.8 11.0 A 70 70 0 0 1 150 80 Z" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="6 4" />
                     <path d="M 67.8 11.0 A 70 70 0 0 1 150 80" fill="none" stroke="#d97706" strokeWidth="3.5" />
                     <line x1="80" y1="80" x2="67.8" y2="11.0" stroke="#000" strokeWidth="2" strokeDasharray="5 3"/>
                     <line x1="80" y1="80" x2="150" y2="80" stroke="#000" strokeWidth="2" strokeDasharray="5 3"/>
                     {/* Angle Arc */}
                     <path d="M 95 80 A 15 15 0 0 0 77.4 65.2" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                     <text x="80" y="95" textAnchor="middle" fontSize="14" fontStyle="italic">O</text>
                     <text x="115" y="95" textAnchor="middle" fontSize="14">4 m</text>
                     <text x="60" y="10" textAnchor="middle" fontSize="14" fontStyle="italic">A</text>
                     <text x="157" y="90" textAnchor="middle" fontSize="14" fontStyle="italic">B</text>
                     <text x="100" y="65" textAnchor="middle" fontSize="14" fill="#000">100°</text>
                   </svg>

                   {/* Annotations */}
                   <div className="absolute top-[35px] left-[135px] text-sm text-green-700 font-bold whitespace-nowrap hidden md:block bg-white/50 px-1 rounded">
                     ← 弧 AB / <Latex math={String.raw`\overset{\frown}{AB}`} />
                   </div>
                   
                   <svg viewBox="0 0 160 160" className="w-40 h-40 overflow-visible absolute top-0 left-0 pointer-events-none hidden md:block">
                      <path d="M 160 85 Q 140 100 115 75" fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-red-100)" />
                      <defs>
                        <marker id="arrow-red-100" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                        </marker>
                      </defs>
                   </svg>
                   
                   <div className="absolute top-[80px] left-[165px] text-sm text-blue-800 font-bold hidden md:block max-w-[220px] leading-relaxed">
                     <span className="text-red-600">360°</span> 當中只要 <span className="bg-pink-200 px-1 rounded text-red-600">100°</span> → 
                     <span className="bg-pink-100 text-red-600 px-1 py-0.5 rounded mx-1"><Latex math="\dfrac{100^\circ}{360^\circ}" /></span>
                     <div className="text-xs text-blue-700 text-center mt-1">按題目而變</div>
                   </div>
                 </div>
              </div>

              <div className="bg-blue-50 text-blue-900 p-3 rounded font-bold w-full relative">
                <p className="flex items-center flex-wrap gap-y-1">
                  <Latex math={String.raw`\overset{\frown}{AB} = 2 \pi (4) \times`} />
                  <span className="bg-yellow-300 px-1 rounded mx-1 text-lg leading-none py-0.5 mt-0.5"><Latex math="\dfrac{100^\circ}{360^\circ}" /></span>
                  <Latex math="= 6.98" /> m
                </p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* ========================================
            2. 圓面積與扇形面積
            ======================================== */}
        <CollapsibleSection id="circles-area-sector" title="圓面積與扇形面積" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* 左：圓面積 */}
            <div className="w-full md:basis-[36%] md:max-w-[36%] md:flex-none bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-3 text-lg flex items-center gap-2">
                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-sm">3.</span> 圓面積：
                <span className="bg-blue-200 text-slate-800 px-2 py-0.5 rounded font-sans"><Latex math="\pi r^2" /></span>
              </h3>

              <div className="flex justify-center mb-4 mt-6">
                <svg viewBox="0 0 160 160" className="w-40 h-40">
                  <circle cx="80" cy="80" r="70" fill="#fde047" stroke="#000" strokeWidth="2" />
                  <line x1="80" y1="80" x2="10" y2="80" stroke="#000" strokeWidth="2" />
                  <circle cx="80" cy="80" r="3" fill="#000" />
                  <text x="90" y="90" textAnchor="middle" fontSize="14" fontStyle="italic">O</text>
                  <text x="45" y="95" textAnchor="middle" fontSize="14">3 cm</text>
                </svg>
              </div>

              <div className="bg-blue-50 text-blue-900 p-3 rounded font-bold">
                <p>例：圓面積：<Latex math="\pi (3)^2 = 9 \pi" /> cm²</p>
              </div>
            </div>

            {/* 右：扇形面積 */}
            <div className="w-full md:basis-[64%] md:max-w-[64%] md:flex-none bg-white rounded-lg p-4 border border-blue-200 relative">
              <div className="absolute left-[-26px] top-1/2 -translate-y-1/2 hidden md:block text-slate-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>

              <h3 className="font-bold text-slate-800 mb-3 text-lg flex items-center gap-2 flex-wrap leading-relaxed border-b border-blue-100 pb-2">
                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-sm">4.</span> 扇形 <span className="text-sm font-normal text-green-700">(圓面積的一部份)</span>：
                <span className="bg-blue-200 px-2 py-0.5 rounded font-sans"><Latex math="\pi r^2" /></span>
                <Latex math="\times" />
                <span className="bg-yellow-300 px-2 py-0.5 rounded font-sans text-xl"><Latex math="\dfrac{\theta}{360^\circ}" /></span>
              </h3>

              <div className="flex justify-center mb-6 mt-6 md:mt-2 relative">
                 <div className="relative">
                   <svg viewBox="0 0 160 160" className="w-40 h-40 overflow-visible">
                     <path d="M 80 80 L 10 80 A 70 70 0 0 1 115 19.4 Z" fill="#fef08a" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
                     <circle cx="80" cy="80" r="70" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" />
                     <circle cx="80" cy="80" r="3" fill="#000" />
                     {/* Arc for 120° */}
                     <path d="M 65 80 A 15 15 0 0 1 87.5 67" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                     <text x="80" y="95" textAnchor="middle" fontSize="14" fontStyle="italic">O</text>
                     <text x="45" y="95" textAnchor="middle" fontSize="14">14 cm</text>
                     <text x="8" y="75" textAnchor="end" fontSize="14" fontStyle="italic">S</text>
                     <text x="120" y="15" textAnchor="start" fontSize="14" fontStyle="italic">T</text>
                     <text x="70" y="60" textAnchor="middle" fontSize="14" fill="#000">120°</text>
                   </svg>
                 </div>
                 
                 <div className="absolute top-14 right-1 text-sm text-green-700 font-bold text-right leading-relaxed hidden md:block max-w-[220px]">
                   扇形像在整個 pizza cut 一部份<br/>
                   360° 的 pizza 只要 120°！
                 </div>
              </div>

              <div className="bg-blue-50 text-blue-900 p-3 rounded font-bold w-full mt-4">
                <p className="flex items-center flex-wrap gap-y-1">
                  例：扇形 STO 面積：<Latex math="\pi (14)^2 \times" />
                  <span className="bg-yellow-300 px-1 rounded mx-1 text-lg leading-none py-0.5 mt-0.5"><Latex math="\dfrac{120^\circ}{360^\circ}" /></span>
                  <Latex math="= 205" /> cm²
                </p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* ========================================
            3. 圓柱體體積及表面面積
            ======================================== */}
        <CollapsibleSection id="cylinders" title="圓柱體體積及表面面積" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
          <div className="space-y-6">
            
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-200 shadow-sm relative">
              <h3 className="font-bold text-red-600 mb-3 text-xl flex items-center gap-2">
                5. 圓柱體體積： <span className="text-red-700 italic font-serif"><Latex math="\pi r^2 \cdot h" /></span>
                <span className="text-green-700 text-sm md:text-base ml-2 md:ml-4 relative font-bold">
                  <span className="absolute -left-4 md:-left-5 top-1 -mr-2 text-green-700 font-sans">↙</span> 高度 (height)
                </span>
              </h3>
            </div>

            <div className="bg-[#fdf6ea] rounded-lg p-5 border border-amber-200 shadow-sm relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 space-y-5 relative z-10 w-full p-2">
                  <div className="flex items-start gap-2 bg-white/70 p-3 rounded">
                    <span className="text-red-600 font-bold text-lg leading-none shadow-sm rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 border border-red-200">6</span>
                    <div className="font-bold text-slate-800 pt-0.5 leading-relaxed">
                      直立圓柱的曲面面積 <Latex math="= 2\pi rh" />
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 bg-white/70 p-3 rounded">
                    <span className="text-red-600 font-bold text-lg leading-none shadow-sm rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 border border-red-200">7</span>
                    <div className="space-y-2 font-bold text-slate-800 w-full">
                      <div>直立圓柱的總表面面積</div>
                      <div className="border-b border-amber-200/50 pb-2"><Latex math="= 2 \times \text{底面積} + \text{曲面面積}" /></div>
                      <div className="pt-1 text-lg truncate"><Latex math="= 2\pi r^2 + 2\pi rh" /></div>
                    </div>
                  </div>
                </div>

                <div className="relative shrink-0 pr-10 pb-4 h-48 w-44 md:w-56 mt-4 md:mt-0 ml-10 flex items-center">
                   <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
                     {/* Lower Base */}
                     <ellipse cx="80" cy="130" rx="50" ry="15" fill="#fca5a5" stroke="#000" strokeWidth="2" strokeDasharray="3 3"/>
                     {/* Red Hatching Pattern via path */}
                     <path d="M 40 130 L 60 120 M 50 135 L 75 122 M 60 140 L 90 125 M 75 142 L 110 125 M 95 140 L 120 128" stroke="#ef4444" strokeWidth="2" />
                     
                     {/* Curved Surface */}
                     <path d="M 30 50 L 30 130 A 50 15 0 0 0 130 130 L 130 50 Z" fill="#fde047" stroke="#000" strokeWidth="2" />
                     
                     {/* Upper Base */}
                     <ellipse cx="80" cy="50" rx="50" ry="15" fill="#fde047" stroke="#000" strokeWidth="2" />
                     <circle cx="80" cy="50" r="3" fill="#000" />
                     <text x="75" y="47" textAnchor="end" fontSize="14" fontStyle="italic">O</text>
                     <line x1="80" y1="50" x2="130" y2="50" stroke="#000" strokeWidth="2" strokeDasharray="4 2" />
                     <text x="105" y="45" textAnchor="middle" fontSize="14" fontStyle="italic">r</text>

                     <line x1="130" y1="50" x2="130" y2="130" stroke="none" />
                     <text x="140" y="95" textAnchor="start" fontSize="14" fill="#10b981" fontStyle="italic" fontWeight="bold">h</text>
                   </svg>
                   
                   <div className="absolute top-2 -right-8 md:-right-16 text-red-600 font-bold whitespace-nowrap text-lg">
                      <span className="relative">
                        底面積 (上)
                        <svg width="40" height="40" viewBox="0 0 40 40" className="absolute -left-12 -top-2 overflow-visible stroke-red-600">
                           <path d="M 40 18 Q 20 20 10 32" fill="none" strokeWidth="3" markerEnd="url(#arrow-head)" strokeLinecap="round" />
                           <defs>
                             <marker id="arrow-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                               <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                             </marker>
                           </defs>
                        </svg>
                        <span className="absolute -bottom-6 left-[-1.5rem] transform -translate-x-1/2 text-[10px] text-red-800/60 font-sans tracking-widest hidden md:block">圓周</span>
                      </span>
                   </div>

                   <div className="absolute top-[85px] -right-8 md:-right-12 text-green-700 font-bold whitespace-nowrap text-lg flex items-center">
                      <svg width="40" height="20" viewBox="0 0 40 20" className="mr-1 mt-1 overflow-visible stroke-green-700">
                        <line x1="40" y1="10" x2="10" y2="10" strokeWidth="3" markerEnd="url(#arrow-head-green)" strokeLinecap="round" />
                        <defs>
                          <marker id="arrow-head-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                          </marker>
                        </defs>
                      </svg>
                      曲面面積
                   </div>

                   <div className="absolute bottom-[20px] md:-bottom-2 -right-10 md:-right-12 text-red-600 font-bold whitespace-nowrap text-lg flex items-center gap-1">
                      <svg width="30" height="30" viewBox="0 0 30 30" className="mr-1 overflow-visible stroke-red-600">
                        <line x1="30" y1="30" x2="5" y2="5" strokeWidth="3" markerEnd="url(#arrow-head-up)" strokeLinecap="round" />
                        <defs>
                          <marker id="arrow-head-up" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                          </marker>
                        </defs>
                      </svg>
                      底面積 (下)
                   </div>
                </div>
              </div>
            </div>

          </div>
        </CollapsibleSection>

      </div>
    </>
  );
};
