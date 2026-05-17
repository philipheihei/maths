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

const MathDisplay = ({ math }) => (
  <div className="font-semibold text-slate-800">
    <Latex math={math} />
  </div>
);

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
                                className="font-mono tracking-tighter"
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
                
                <div className="space-y-3 font-mono text-sm md:text-base">
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

                <div className="space-y-3 font-mono text-sm md:text-base">
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
              
              <div className="flex flex-col space-y-2 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-start">
                  <span className="text-green-700 text-sm font-bold min-w-40 pt-1 shrink-0">先抄左方的式，然後進行化簡 ➔</span>
                  <div className="pl-2">
                    <MathDisplay math="左方 = 2(6x+8)" />
                    <MathDisplay math="= 12x+16" />
                  </div>
                </div>
                <div className="flex items-start mt-2">
                  <span className="text-green-700 text-sm font-bold min-w-40 pt-1 shrink-0">相同的步驟在右方重覆 ➔</span>
                  <div className="pl-2 relative">
                    <MathDisplay math="右方 = 4(3x+4)" />
                    <MathDisplay math="= 12x+16" />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 mt-4 text-center">
                <span className="text-green-700 font-bold mb-2 inline-block">固定格式 ➔</span>
                <MathDisplay math="\\because 左方 = 右方" />
                <MathDisplay math="\\therefore 2(6x+8) \\equiv 4(3x+4)" />
                <p className="text-sm text-green-700 font-bold mt-1">由 "=" 變成 "\\equiv"</p>
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
