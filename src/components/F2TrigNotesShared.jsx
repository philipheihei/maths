import React from 'react';
import { loadKatexOnce } from '../utils/katexLoader';

const Latex = ({ math, block = false }) => {
  const containerRef = React.useRef(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    loadKatexOnce().then(() => setIsLoaded(true)).catch(() => {});
  }, []);

  React.useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        window.katex.render(math, containerRef.current, {
          throwOnError: false,
          displayMode: block,
          strict: false,
        });
      } catch (e) {
        containerRef.current.textContent = math;
      }
    }
  }, [math, block, isLoaded]);

  return <span ref={containerRef} className={block ? 'block text-center my-2' : 'inline-block'} />;
};

export const PythagorasNotesBlock = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <p className="font-bold text-blue-700 mb-4">定理</p>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3">
            <p className="text-slate-700">在直角三角形中，斜邊的平方等於其餘兩邊的平方和。</p>
            <Latex math="c^2 = a^2 + b^2" block />
            <p className="text-sm text-slate-500">其中 c 是斜邊（最長邊，直角的對邊）</p>
          </div>
          <div className="w-56 flex-shrink-0">
            <svg viewBox="0 0 160 120" className="w-full">
              <polygon points="10,100 130,100 130,20" fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth="2.5" strokeLinejoin="round" />
              <polyline points="120,100 120,90 130,90" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
              <text x="135" y="15" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#4f46e5">A</text>
              <text x="0" y="105" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#4f46e5">B</text>
              <text x="135" y="115" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#4f46e5">C</text>
              <text x="70" y="115" fontSize="14" fontStyle="italic" fill="#334155">a</text>
              <text x="140" y="65" fontSize="14" fontStyle="italic" fill="#334155">b</text>
              <text x="60" y="50" fontSize="14" fontStyle="italic" fill="#334155">c</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <p className="font-bold text-amber-700 mb-2">💡 步驟</p>
        <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
          <li><strong className="text-amber-800">1. 辨認最長的邊（斜邊）</strong>，其位於直角對面</li>
          <li><strong className="text-amber-800">2. 寫出 <Latex math="c^2 = a^2 + b^2" /></strong>，將相應的數字放入公式</li>
          <li>找斜邊：兩邊平方<strong>相加</strong>再開方</li>
          <li>找直角邊：斜邊平方<strong>減去</strong>另一邊平方再開方（需移項）</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-xl p-5 border border-green-200">
        <div className="mb-4">
          <p className="font-bold text-green-700 text-lg mb-1">例子：</p>
          <p className="text-slate-700">求下列各三角形中的未知量。</p>
          <p className="text-sm text-slate-500">（如有需要，取答案準確至三位有效數字。）</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <div className="flex gap-2 mb-4">
              <span className="font-bold text-slate-700">(a)</span>
              <div className="font-bold text-green-700">Case 1: 未知數為斜邊（最長）</div>
            </div>
            <div className="w-56 mx-auto mb-6">
              <svg viewBox="0 0 160 120" className="w-full">
                <polygon points="40,20 40,100 140,100" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="2.5" strokeLinejoin="round" />
                <polyline points="40,90 50,90 50,100" fill="none" stroke="#16a34a" strokeWidth="1.5" />
                <text x="35" y="15" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#16a34a">A</text>
                <text x="25" y="110" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#16a34a">B</text>
                <text x="145" y="110" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#16a34a">C</text>
                <text x="5" y="65" fontSize="13" fill="#334155">6 m</text>
                <text x="85" y="115" fontSize="13" fill="#334155">8 m</text>
                <text x="95" y="50" fontSize="13" fill="#334155">x m</text>
              </svg>
            </div>
            <Latex math="\begin{align*} x^2 &= 6^2 + 8^2 \\ x &= \sqrt{6^2 + 8^2} \\ x &= 10 \end{align*}" block />
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <div className="flex gap-2 mb-4">
              <span className="font-bold text-slate-700">(b)</span>
              <div className="font-bold text-amber-600">Case 2: 未知數為直角邊（非斜邊）</div>
            </div>
            <div className="w-56 mx-auto mb-6">
              <svg viewBox="-20 0 180 120" className="w-full">
                <polygon points="20,20 140,20 20,100" fill="rgba(217,119,6,0.08)" stroke="#d97706" strokeWidth="2.5" strokeLinejoin="round" />
                <polyline points="20,30 30,30 30,20" fill="none" stroke="#d97706" strokeWidth="1.5" />
                <text x="5" y="15" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#d97706">R</text>
                <text x="145" y="15" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#d97706">Q</text>
                <text x="5" y="110" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#d97706">P</text>
                <text x="75" y="13" fontSize="13" fill="#334155">y cm</text>
                <text x="17" y="65" fontSize="13" fill="#334155" textAnchor="end">10 cm</text>
                <text x="85" y="70" fontSize="13" fill="#334155">22 cm</text>
              </svg>
            </div>
            <div className="text-center">
              <Latex math="\begin{align*} 10^2 + y^2 &= 22^2 \\ y^2 &= 22^2 - 10^2 \quad {\small\color{#d97706}(\text{需移項})} \\ y^2 &= 384 \\ y &= \sqrt{384} \\ y &= 19.6 \end{align*}" block />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TrigRatiosNotesBlock = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
        <p className="font-bold text-green-700 mb-3">三角比口訣：對斜鄰斜對鄰</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100">
            <span className="bg-red-500 text-white font-bold px-3 py-1 rounded text-sm">正弦</span>
            <div>
              <Latex math="\sin \theta = \dfrac{\text{對邊}}{\text{斜邊}}" />
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100">
            <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded text-sm">餘弦</span>
            <div>
              <Latex math="\cos \theta = \dfrac{\text{鄰邊}}{\text{斜邊}}" />
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100">
            <span className="bg-green-600 text-white font-bold px-3 py-1 rounded text-sm">正切</span>
            <div>
              <Latex math="\tan \theta = \dfrac{\text{對邊}}{\text{鄰邊}}" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl mt-3 border border-green-100 overflow-hidden" style={{ background: '#ffffff' }}>
          <svg viewBox="0 0 600 260" className="w-full h-auto mx-auto" style={{ maxWidth: '600px' }}>
            <defs>
              <marker id="arrowBlueShared" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                <path d="M 0 2 L 10 6 L 0 10 z" fill="#3b75a6" />
              </marker>
              <marker id="arrowGreenShared" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                <path d="M 0 2 L 10 6 L 0 10 z" fill="#5ba678" />
              </marker>
            </defs>

            <polygon points="180,20 180,180 380,180" fill="rgba(59, 130, 246, 0.2)" />

            <line x1="180" y1="20" x2="180" y2="180" stroke="#3b75a6" strokeWidth="4" strokeLinecap="round" />
            <line x1="180" y1="180" x2="380" y2="180" stroke="#c9665e" strokeWidth="4" strokeLinecap="round" />
            <line x1="180" y1="20" x2="380" y2="180" stroke="#5ba678" strokeWidth="4" strokeLinecap="round" />

            <polyline points="180,155 205,155 205,180" fill="none" stroke="#5ba678" strokeWidth="3" />

            <path d="M 330 180 A 50 50 0 0 1 341 149" fill="none" stroke="#475569" strokeWidth="2.5" />
            <text x="315" y="170" fill="#3b75a6" fontSize="24" fontWeight="bold" textAnchor="middle" fontStyle="italic">θ</text>

            <line x1="295" y1="150" x2="190" y2="100" stroke="#3b75a6" strokeWidth="3" strokeDasharray="8,6" markerEnd="url(#arrowBlueShared)" />
            <line x1="210" y1="155" x2="270" y2="101" stroke="#5ba678" strokeWidth="3" strokeDasharray="8,6" markerEnd="url(#arrowGreenShared)" />

            <text x="165" y="90" textAnchor="end" fill="#3b75a6" fontSize="24" fontWeight="bold" fontFamily="sans-serif">
              <tspan x="165" dy="0"><tspan fontStyle="italic">θ</tspan> 對住個條邊</tspan>
              <tspan x="165" dy="35">(對邊)</tspan>
            </text>

            <text x="280" y="225" textAnchor="middle" fill="#c9665e" fontSize="24" fontWeight="bold" fontFamily="sans-serif">
              <tspan fontStyle="italic">θ</tspan>
              <tspan> 同直角夾住個條邊 (鄰邊)</tspan>
            </text>

            <text x="435" y="80" textAnchor="middle" fill="#5ba678" fontSize="24" fontWeight="bold" fontFamily="sans-serif">
              <tspan x="435" dy="0">直角對住個條邊</tspan>
              <tspan x="435" dy="35">(斜邊)</tspan>
            </text>
          </svg>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <p className="font-bold text-amber-700 mb-2">💡 如何分辨對邊和鄰邊？</p>
        <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
          <li><strong>對邊</strong>：目標角的對面的邊</li>
          <li><strong>鄰邊</strong>：目標角旁邊的邊（不是斜邊的那條）</li>
          <li><strong>斜邊</strong>：直角對面、最長的邊</li>
        </ul>
      </div>

      <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
        <h3 className="font-bold text-purple-800 text-lg mb-4 flex items-center flex-wrap gap-2">
          <span className="text-xl">🤔</span>
          <span>如何區別何時使用</span>
          <span className="text-red-600 inline-flex items-baseline leading-none">
            <Latex math="\sin" />
          </span>
          <span>/</span>
          <span className="text-red-600 inline-flex items-baseline leading-none">
            <Latex math="\sin^{-1}" />
          </span>
          <span>？</span>
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100 flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-40 flex-shrink-0 flex justify-center text-xl">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="inline-block bg-yellow-200 px-1 rounded-sm">
                  <Latex math="\sin\,x" />
                </span>
                <Latex math="=" />
                <Latex math="0.5" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-green-700 font-bold mb-2 text-lg tracking-wide">sin 與數字分開</p>
              <div className="text-slate-600 flex items-center flex-wrap gap-2 text-base">
                計算機按：
                <span className="bg-gray-300 text-yellow-700 text-xs font-mono px-2 py-0.5 rounded shadow-sm">SHIFT</span>
                <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded shadow-sm">sin</span>
                <span className="font-bold text-slate-800">0.5</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100 flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-40 flex-shrink-0 flex justify-center text-xl">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="inline-block bg-yellow-200 px-1 rounded-sm">
                  <Latex math="\sin\,0.5" />
                </span>
                <Latex math="=" />
                <Latex math="x" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-green-700 font-bold mb-2 text-lg tracking-wide">sin 與數字痴在一起</p>
              <div className="text-slate-600 flex items-center flex-wrap gap-2 text-base">
                計算機按：
                <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded shadow-sm">sin</span>
                <span className="font-bold text-slate-800">0.5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
