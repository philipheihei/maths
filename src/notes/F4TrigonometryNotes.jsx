import React, { useRef, useEffect } from 'react';
import { Latex, CollapsibleSection } from './shared';

export const TrigonometryF4Notes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  useEffect(() => {
    const refs = {
      'astc-quadrants': s1,
      'find-ratios': s2,
      'trig-graphs': s3,
      'simplify-ratios': s4,
      'trig-equations': s5
    };
    if (activeSub && refs[activeSub]?.current) {
      setTimeout(() => {
        refs[activeSub].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeSub]);

  const Step = ({ math, explain, indent, alignEq = true }) => {
    const shouldAlignEq = alignEq && math.includes('=') && !math.includes('\\therefore');
    const eqParts = shouldAlignEq ? math.match(/^(.*?)(=)(.*)$/) : null;

    return (
      <div className={`grid grid-cols-1 md:grid-cols-[max-content_minmax(220px,1fr)] gap-x-3 py-1 ${indent ? 'pl-8' : ''}`}>
        <div className="min-w-0 text-left">
          {eqParts ? (
            <div className="w-full grid grid-cols-[136px_auto_minmax(0,1fr)] md:grid-cols-[190px_auto_minmax(0,1fr)] items-baseline gap-x-2">
              <div className="text-right pr-1"><Latex math={eqParts[1].trim()} block={false} /></div>
              <div><Latex math="=" block={false} /></div>
              <div className="min-w-0"><Latex math={eqParts[3].trim()} block={false} /></div>
            </div>
          ) : (
            <Latex math={math} block={false} />
          )}
        </div>
        {explain ? (
          <div className="mt-1 md:mt-0 text-red-600 text-sm flex items-start md:items-baseline md:justify-start gap-1.5 leading-snug">
            <span className="opacity-60">←</span>
            <span>{explain}</span>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  };

  const AstcSvg = () => (
    <svg viewBox="-15 0 370 320" className="w-full max-w-[360px] mx-auto">
      {/* Axes */}
      <line x1="26" y1="160" x2="314" y2="160" stroke="#334155" strokeWidth="2" />
      <line x1="170" y1="26" x2="170" y2="294" stroke="#334155" strokeWidth="2" />
      <polyline points="309,155 314,160 309,165" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="165,31 170,26 175,31" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Degrees */}
      <text x="300" y="151" fontSize="12" fill="#334155">0°</text>
      <text x="293" y="176" fontSize="12" fill="#334155">360°</text>
      <text x="170" y="18" fontSize="12" fill="#334155" textAnchor="middle">90°</text>
      <text x="20" y="164" fontSize="12" fill="#334155" textAnchor="end">180°</text>
      <text x="170" y="312" fontSize="12" fill="#334155" textAnchor="middle">270°</text>

      {/* Quadrants and ASTC */}
      <text x="240" y="108" fontSize="40" fill="#16a34a" fontWeight="bold" textAnchor="middle">A</text>
      <text x="240" y="130" fontSize="12" fill="#334155" textAnchor="middle">I (0°-90°)</text>
      <text x="240" y="146" fontSize="12" fill="#334155" textAnchor="middle">全部 +ve</text>

      <text x="100" y="108" fontSize="40" fill="#16a34a" fontWeight="bold" textAnchor="middle">S</text>
      <text x="100" y="130" fontSize="12" fill="#334155" textAnchor="middle">II (90°-180°)</text>
      <text x="100" y="146" fontSize="12" fill="#2563eb" textAnchor="middle">得 sin +ve</text>

      <text x="100" y="226" fontSize="40" fill="#16a34a" fontWeight="bold" textAnchor="middle">T</text>
      <text x="100" y="248" fontSize="12" fill="#334155" textAnchor="middle">III (180°-270°)</text>
      <text x="100" y="264" fontSize="12" fill="#2563eb" textAnchor="middle">得 tan +ve</text>

      <text x="240" y="226" fontSize="40" fill="#16a34a" fontWeight="bold" textAnchor="middle">C</text>
      <text x="240" y="248" fontSize="12" fill="#334155" textAnchor="middle">IV (270°-360°)</text>
      <text x="240" y="264" fontSize="12" fill="#2563eb" textAnchor="middle">得 cos +ve</text>
    </svg>
  );

  const DrawTriangleSvg = () => (
    <svg viewBox="0 0 300 200" className="w-full max-w-xs mx-auto">
      <line x1="20" y1="100" x2="280" y2="100" stroke="#334155" strokeWidth="1.5" />
      <line x1="150" y1="20" x2="150" y2="180" stroke="#334155" strokeWidth="1.5" />
      
      {/* Triangle in Q2 */}
      <polygon points="150,100 80,100 80,40" fill="rgba(59,130,246,0.15)" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
      <line x1="150" y1="100" x2="80" y2="40" stroke="#2563eb" strokeWidth="2" />
      
      <circle cx="80" cy="40" r="3" fill="#334155" />
      <text x="75" y="30" fontSize="12" fill="#334155" textAnchor="end">P(-3, 4)</text>

      {/* Theta arg */}
      <path d="M 180 100 A 30 30 0 0 0 128.8 78.8" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-red)" />
      <text x="140" y="65" fontSize="14" fill="#e11d48">θ</text>
      
      {/* Angle inside triangle */}
      <path d="M 135 100 A 15 15 0 0 1 138.8 89.4" fill="none" stroke="#2563eb" strokeWidth="2" />

      {/* Labels */}
      <text x="115" y="115" fontSize="12" fill="#16a34a" fontWeight="bold">−3</text>
      <text x="65" y="75" fontSize="12" fill="#16a34a" fontWeight="bold">4</text>
      <text x="125" y="60" fontSize="12" fill="#334155" fontWeight="bold">r=5</text>
    </svg>
  );

  const TanGraphSvg = () => {
    const pts1 = [], pts2 = [], pts3 = [];
    for (let x = 0; x <= 44.5; x += 0.5) {
      const y = -15 * Math.tan((x / 180) * 2 * Math.PI);
      pts1.push(`${x},${y}`);
    }
    for (let x = 45.5; x <= 134.5; x += 0.5) {
      const y = -15 * Math.tan((x / 180) * 2 * Math.PI);
      pts2.push(`${x},${y}`);
    }
    for (let x = 135.5; x <= 180; x += 0.5) {
      const y = -15 * Math.tan((x / 180) * 2 * Math.PI);
      pts3.push(`${x},${y}`);
    }
    return (
      <svg viewBox="-20 -65 220 130" className="w-full h-auto min-w-[120px] max-w-[200px] mx-auto">
        <defs>
          <clipPath id="tan-clip">
            <rect x="-20" y="-60" width="220" height="120" />
          </clipPath>
        </defs>
        <line x1="-10" y1="0" x2="190" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="0" y1="-55" x2="0" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
        <polyline points="186,-4 190,0 186,4" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <polyline points="-4,-51 0,-55 4,-51" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        
        <line x1="45" y1="-55" x2="45" y2="55" stroke="#f43f5e" strokeDasharray="4 4" strokeWidth="1" />
        <line x1="135" y1="-55" x2="135" y2="55" stroke="#f43f5e" strokeDasharray="4 4" strokeWidth="1" />
        
        <text x="45" y="63" fontSize="10" fill="#64748b" textAnchor="middle">90°</text>
        <text x="90" y="14" fontSize="10" fill="#64748b" textAnchor="middle">180°</text>
        <text x="135" y="63" fontSize="10" fill="#64748b" textAnchor="middle">270°</text>
        <text x="180" y="14" fontSize="10" fill="#64748b" textAnchor="middle">360°</text>
        <text x="-5" y="14" fontSize="10" fill="#64748b" textAnchor="end">0</text>

        <g clipPath="url(#tan-clip)">
          <polyline points={pts1.join(' ')} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
          <polyline points={pts2.join(' ')} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
          <polyline points={pts3.join(' ')} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
        </g>
      </svg>
    );
  };

  const CosGraphSvg = () => {
    const pts = [];
    for (let x = 0; x <= 180; x += 5) {
      const y = -30 * Math.cos((x / 180) * 2 * Math.PI);
      pts.push(`${x},${y}`);
    }
    return (
      <svg viewBox="-20 -65 220 130" className="w-full h-auto min-w-[120px] max-w-[200px] mx-auto">
        <line x1="-10" y1="0" x2="190" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="0" y1="-55" x2="0" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
        <polyline points="186,-4 190,0 186,4" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <polyline points="-4,-51 0,-55 4,-51" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        
        <line x1="-5" y1="-30" x2="180" y2="-30" stroke="#cbd5e1" strokeDasharray="3 3" />
        <line x1="-5" y1="30" x2="180" y2="30" stroke="#cbd5e1" strokeDasharray="3 3" />
        <text x="-8" y="-27" fontSize="10" fill="#64748b" textAnchor="end">1</text>
        <text x="-8" y="33" fontSize="10" fill="#64748b" textAnchor="end">−1</text>
        
        <text x="45" y="14" fontSize="10" fill="#64748b" textAnchor="middle">90°</text>
        <text x="135" y="14" fontSize="10" fill="#64748b" textAnchor="middle">270°</text>
        <text x="180" y="-36" fontSize="10" fill="#64748b" textAnchor="middle">360°</text>
        <text x="-5" y="14" fontSize="10" fill="#64748b" textAnchor="end">0</text>

        <polyline points={pts.join(' ')} fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" />
        
        <circle cx="0" cy="-30" r="3" fill="#ef4444" />
        <circle cx="90" cy="30" r="3" fill="#ef4444" />
        <circle cx="180" cy="-30" r="3" fill="#ef4444" />
      </svg>
    );
  };

  const SinGraphSvg = () => {
    const pts = [];
    for (let x = 0; x <= 180; x += 5) {
      const y = -30 * Math.sin((x / 180) * 2 * Math.PI);
      pts.push(`${x},${y}`);
    }
    return (
      <svg viewBox="-20 -65 220 130" className="w-full h-auto min-w-[120px] max-w-[200px] mx-auto">
        <line x1="-10" y1="0" x2="190" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="0" y1="-55" x2="0" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
        <polyline points="186,-4 190,0 186,4" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <polyline points="-4,-51 0,-55 4,-51" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        
        <line x1="-5" y1="-30" x2="180" y2="-30" stroke="#cbd5e1" strokeDasharray="3 3" />
        <line x1="-5" y1="30" x2="180" y2="30" stroke="#cbd5e1" strokeDasharray="3 3" />
        <text x="-8" y="-27" fontSize="10" fill="#64748b" textAnchor="end">1</text>
        <text x="-8" y="33" fontSize="10" fill="#64748b" textAnchor="end">−1</text>
        
        <text x="90" y="14" fontSize="10" fill="#64748b" textAnchor="middle">180°</text>
        <text x="180" y="14" fontSize="10" fill="#64748b" textAnchor="middle">360°</text>
        <text x="-5" y="14" fontSize="10" fill="#64748b" textAnchor="end">0</text>

        <polyline points={pts.join(' ')} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
        
        <circle cx="45" cy="-30" r="3" fill="#ef4444" />
        <circle cx="135" cy="30" r="3" fill="#ef4444" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-cyan-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH9 三角學</h1>
        <p className="text-slate-600">此課重點為學習利用 <span className="font-bold text-slate-800">ASTC 圖</span>，分辨 <Latex math="\sin\theta, \cos\theta, \tan\theta" /> 於 <Latex math="0^\circ − 360^\circ" /> 情況下的正負值及求角解方程。</p>
      </div>

      {/* 1. ASTC 象限圖 */}
      <CollapsibleSection id="astc-quadrants" title="ASTC 象限圖" num={1} color="cyan" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 w-full text-slate-700">
              <h3 className="font-bold text-cyan-800 mb-3 text-lg">分辨正負值</h3>
              <p className="mb-2">解讀：出現該英文字，代表該區域為正數</p>
              <p className="mb-3 text-sm text-slate-700">
                口訣：
                <span className="font-bold text-green-700">A</span>h{' '}
                <span className="font-bold text-green-700">S</span>ir{' '}
                <span className="font-bold text-green-700">T</span>each{' '}
                <span className="font-bold text-green-700">C</span>hinese
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li><span className="font-bold text-green-700">A</span>ll <Latex math="\rightarrow" /> 全部為正數</li>
                <li><span className="font-bold text-green-700">S</span>in <Latex math="\rightarrow" /> 只有 <Latex math="\sin\theta" /> 是 +ve</li>
                <li><span className="font-bold text-green-700">T</span>an <Latex math="\rightarrow" /> 只有 <Latex math="\tan\theta" /> 是 +ve</li>
                <li><span className="font-bold text-green-700">C</span>os <Latex math="\rightarrow" /> 只有 <Latex math="\cos\theta" /> 是 +ve</li>
              </ul>
              <div className="bg-white p-3 rounded border border-slate-200 shadow-sm text-sm w-full md:w-[420px]">
                <p className="font-bold text-slate-800 mb-1">例子：</p>
                <p><Latex math="\sin 91^\circ" /> 為 +ve（因落在第二象限 S）</p>
                <p><Latex math="\cos 91^\circ" /> / <Latex math="\tan 91^\circ" /> 為 -ve</p>
              </div>
              <p className="mt-4 text-red-600 font-bold">象限 <Latex inline math="\rightarrow" /> 認象限是方便去分辨 sinθ/cosθ/tanθ 的正/負值</p>
            </div>
            <div className="w-full max-w-[360px]">
              <AstcSvg />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 透過象限找三角比 */}
      <CollapsibleSection id="find-ratios" title="透過象限找三角比" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3 text-lg">📝 步驟 (已知 P 點坐標或三角比，求其他三角比)</h3>
            <ol className="list-decimal pl-5 space-y-2 text-slate-700 font-medium">
              <li>分辨角度的大小範圍 <span className="text-blue-600">（在哪個象限）</span></li>
              <li>畫相應 <Latex math="\Delta" /> <span className="text-red-600 font-bold">（必定選痴住 <Latex math="x" /> 軸的 <Latex math="\Delta" />）</span>，<span className="text-blue-800 line-through">絕對不可貼 y 軸</span></li>
              <li>Mark 低標示角 <Latex math="\theta" /> <span className="text-green-700">（貼原點 <Latex math="(0,0)" />）</span>、<Latex math="\Delta" /> 高度和底 <span className="text-blue-800">（負數照寫）</span></li>
              <li>找 <Latex math="r" />（黑色線斜邊）的長度 / 已知 <Latex math="r" />，找未知邊 <span className="text-blue-800">（畢氏定理）</span></li>
              <li>當寫好 <Latex math="\Delta" /> 3 條邊的長度，便可找 <Latex math="\sin\theta / \cos\theta / \tan\theta" /> <span className="text-green-700">（初中方法）</span></li>
            </ol>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <p className="text-slate-700 font-bold mb-3">例：P 位於角 <Latex math="\theta" /> 的終邊上，求 <Latex math="\sin\theta, \cos\theta, \tan\theta" />。</p>
              <div className="flex justify-center mb-4">
                <DrawTriangleSvg />
              </div>
              <div className="space-y-1 bg-slate-50 p-3 rounded">
                <Step math="\sin\theta = \frac{4}{5}" alignEq={false} />
                <Step math="\cos\theta = −\frac{3}{5}" alignEq={false} />
                <Step math="\tan\theta = −\frac{4}{3}" alignEq={false} />
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm flex flex-col justify-center">
              <p className="text-slate-700 font-bold mb-3">知道不同的問法：</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-4 text-sm">
                <li><span className="font-bold">直接比角度範圍</span>：<Latex math="(180^\circ − 270^\circ)" /></li>
                <li><span className="font-bold">象限</span>：(象限 IV)</li>
                <li><span className="font-bold">比大細</span>：<Latex math="\sin\theta / \cos\theta / \tan\theta > 0 \text{ 或 } < 0" /></li>
              </ul>
              
              <div className="bg-amber-50 border border-amber-200 p-3 rounded">
                <p className="font-bold text-amber-800 mb-2">例：若 <Latex math="\cos\theta = \frac{4}{5}" /> 和 <Latex math="\theta" /> 位於象限 IV</p>
                <div className="space-y-1 text-sm font-sans mb-2">
                  <Step math="x^2 + y^2 = r^2" alignEq={false} />
                  <Step math="4^2 + a^2 = 5^2" />
                  <Step math="a = \pm 3" />
                  <p className="text-slate-700 mt-1 pl-4">因為在 IV 象限，<Latex math="y" /> 軸為負，<Latex math="a = −3" />（捨去正數）</p>
                </div>
                <div className="space-y-1 font-bold">
                  <Step math="\sin\theta = −\frac{3}{5}" alignEq={false} />
                  <Step math="\tan\theta = −\frac{3}{4}" alignEq={false} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm mt-4">
            <h4 className="font-bold text-slate-800 mb-2">進階推斷象限例子：</h4>
            <div className="bg-slate-50 p-4 rounded flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p className="font-bold text-slate-700 mb-2">若 <Latex math="\sin\theta = −\frac{1}{3}" /> 和 <Latex math="\cos\theta > 0" />，求 <Latex math="\cos\theta" /> 和 <Latex math="\tan\theta" />：</p>
                <ul className="space-y-1 text-sm text-slate-700 list-disc pl-5">
                  <li><Latex math="\sin\theta" /> 是 -ve <Latex math="\rightarrow" /> 範圍在 T (III) 或 C (IV) 象限</li>
                  <li><Latex math="\cos\theta > 0" /> (+ve) <Latex math="\rightarrow" /> 範圍在 A (I) 或 C (IV) 象限</li>
                  <li><span className="font-bold text-red-600">重疊條件在 IV 象限 <Latex math="(270^\circ − 360^\circ)" /></span></li>
                </ul>
              </div>
              <div className="flex-1 w-full flex justify-center">
                <svg viewBox="0 0 200 150" className="w-full max-w-[150px]">
                  <line x1="20" y1="75" x2="180" y2="75" stroke="#e11d48" strokeWidth="2" />
                  <line x1="100" y1="10" x2="100" y2="140" stroke="#e11d48" strokeWidth="2" />
                  <text x="120" y="50" fontSize="24" fill="#334155" fontWeight="bold">A</text>
                  <text x="60" y="50" fontSize="24" fill="#ef4444" fontWeight="bold">S</text>
                  <text x="60" y="110" fontSize="24" fill="#ef4444" fontWeight="bold">T</text>
                  <text x="120" y="110" fontSize="24" fill="#16a34a" fontWeight="bold">C <tspan fontSize="16">✓ IV</tspan></text>
                  {/* Cancel signs for S and T */}
                  <line x1="80" y1="40" x2="90" y2="50" stroke="#334155" strokeWidth="2" />
                  <line x1="90" y1="40" x2="80" y2="50" stroke="#334155" strokeWidth="2" />
                  <line x1="80" y1="100" x2="90" y2="110" stroke="#334155" strokeWidth="2" />
                  <line x1="90" y1="100" x2="80" y2="110" stroke="#334155" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. sin/cos/tan 的圖像 */}
      <CollapsibleSection id="trig-graphs" title="sin/cos/tan 的圖像" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3 text-lg">極大值與極小值</h3>
            <p className="text-red-600 font-bold mb-2">* 極大值/極小值只會問 <Latex math="\sin / \cos" />。</p>
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse bg-white">
                <thead>
                  <tr className="bg-purple-100 text-purple-900 border-b-2 border-purple-200">
                    <th className="p-2 border-r border-purple-200"></th>
                    <th className="p-2 border-r border-purple-200"><Latex math="y = \sin x" /></th>
                    <th className="p-2 border-r border-purple-200"><Latex math="y = \cos x" /></th>
                    <th className="p-2"><Latex math="y = \tan x" /></th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-200">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-200">圖像</td>
                    <td className="p-2 border-r border-slate-200"><SinGraphSvg /></td>
                    <td className="p-2 border-r border-slate-200"><CosGraphSvg /></td>
                    <td className="p-2"><TanGraphSvg /></td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-200">極大值 (Max)</td>
                    <td className="p-2 border-r border-slate-200 text-blue-700 font-bold">1</td>
                    <td className="p-2 border-r border-slate-200 text-blue-700 font-bold">1</td>
                    <td className="p-2">/</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-200">極小值 (Min)</td>
                    <td className="p-2 border-r border-slate-200 text-red-600 font-bold">−1</td>
                    <td className="p-2 border-r border-slate-200 text-red-600 font-bold">−1</td>
                    <td className="p-2">/</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-200">週期 (Period)</td>
                    <td className="p-2 border-r border-slate-200"><Latex math="360^\circ" /></td>
                    <td className="p-2 border-r border-slate-200"><Latex math="360^\circ" /></td>
                    <td className="p-2"><Latex math="180^\circ" /></td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-200">x 軸截距 <span className="font-normal text-sm block">(y=0)</span></td>
                    <td className="p-2 border-r border-slate-200 font-bold"><Latex math="0^\circ,\ 180^\circ,\ 360^\circ" /></td>
                    <td className="p-2 border-r border-slate-200 font-bold"><Latex math="90^\circ,\ 270^\circ" /></td>
                    <td className="p-2 font-bold"><Latex math="0^\circ,\ 180^\circ,\ 360^\circ" /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 bg-white p-3 rounded border border-slate-200 shadow-sm text-sm">
              <p className="font-bold text-slate-800 mb-1">若果遇到平方（<Latex math="\sin^2 x" /> / <Latex math="\cos^2 x" />）：</p>
              <p className="text-blue-800 font-bold bg-blue-50 p-2 rounded">
                極大值會是 1，極小值會是 0。<br/>
                <span className="font-normal text-slate-600">（因為任何實數的平方必定為 <Latex math="\ge 0" />）</span>
              </p>
              <p className="mt-2 text-slate-600">附註：問其他圖像週期（例：<Latex math="\sin 2x" />）必定會提供圖像是以數格子推斷。</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. 簡化三角比 */}
      <CollapsibleSection id="simplify-ratios" title="簡化三角比" num={4} color="rose" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
            <h3 className="font-bold text-rose-800 mb-3 text-lg">
              💡 口訣：
              <span className="text-blue-700">直變橫不變</span>
              ，
              <span className="text-green-700">符號看象限</span>
            </h3>
            
            <div className="bg-white rounded p-4 border border-slate-200 shadow-sm mb-4">
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li><span className="font-bold text-blue-700">決定是否要轉換</span>：若用 <Latex math="90^\circ, 270^\circ" />（直軸）轉換，<Latex math="\tan \leftrightarrow \frac{1}{\tan}, \sin \leftrightarrow \cos" />；用 <Latex math="180^\circ, 360^\circ" />（橫軸）不變。</li>
                <li><span className="font-bold text-green-700">畫 ASTC 圖看符號</span>：原角落在不在原本那個函數為正的象限。</li>
              </ul>
              
              <div className="mt-4 bg-slate-50 p-3 rounded">
                <p className="font-bold text-slate-800 mb-2">例：計算 <Latex math="\sin 300^\circ" /> <span className="font-normal text-slate-500">（以 <Latex math="0^\circ − 90^\circ" /> 銳角表示）</span></p>
                <div className="font-sans space-y-2">
                  <Step math="\sin 300^\circ = \sin(360^\circ − 60^\circ)" explain="1. 將度數轉換成最接近的橫/直軸 ±" />
                  <Step math="= −\sin 60^\circ" explain="看象限：300° 在第四象限(C)，sin 是負的，加 '-'" />
                  <Step math="= −0.866" explain="計算機驗證" />
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded p-4 border border-amber-200 shadow-sm">
              <h4 className="font-bold text-amber-800 mb-2">🔥 需緊記的三角恆等式：</h4>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex items-center justify-center p-2 bg-white rounded border border-slate-200 font-bold text-lg">
                  <Latex math="\tan\theta = \frac{\sin\theta}{\cos\theta}" />
                </div>
                <div className="flex-1 flex items-center justify-center p-2 bg-white rounded border border-slate-200 font-bold text-lg">
                  <Latex math="\sin^2\theta + \cos^2\theta = 1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. 三角方程 */}
      <CollapsibleSection id="trig-equations" title="三角方程" num={5} color="indigo" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="font-bold text-indigo-800 mb-3 text-lg">由 <Latex math="0 \le \theta < 90^\circ" /> 到 <Latex math="0 \le \theta < 360^\circ" /></h3>
            <p className="text-slate-700 mb-3">初中時按計算機（如 <Latex math="\sin^{−1}(1/3)" />）會給出 <Latex math="\theta = 19.5^\circ" />。<br/>但在高中，因為 <Latex math="\theta" /> 擴展到 <Latex math="360^\circ" />，<strong className="text-indigo-800">每個基礎三角方程通常都有 2 個答案。</strong></p>

            <div className="flex flex-col lg:flex-row gap-6 mb-4">
              <div className="flex-1 bg-white p-4 rounded border border-slate-200 shadow-sm">
                 <p className="font-bold text-slate-800 mb-2">例：解方程 <Latex math="\sin\theta = \frac{1}{3}" /> <span className="font-normal text-sm">對於 <Latex math="0^\circ \le \theta < 360^\circ" /></span></p>
                 <ol className="list-decimal pl-5 space-y-2 text-slate-700 text-sm mb-3">
                   <li>按計算機找出基礎銳角：<Latex math="\theta = 19.5^\circ" /></li>
                   <li>因為 <Latex math="\sin\theta > 0" />，答案在 <strong>象限 I (A)</strong> 及 <strong>象限 II (S)</strong>。</li>
                   <li>套用公式找第 2 個答案。</li>
                 </ol>
                 <div className="space-y-1 font-bold text-indigo-800 bg-indigo-50 p-2 rounded">
                   <Step math="\theta = 19.5^\circ" alignEq={false} />
                   <div className="text-slate-600 text-sm">或</div>
                   <Step math="\theta = 180^\circ − 19.5^\circ = 160.5^\circ" alignEq={false} />
                 </div>
              </div>
              <div className="w-full max-w-[200px] flex items-center justify-center mx-auto">
                <svg viewBox="0 0 200 200" className="w-full">
                  <line x1="10" y1="100" x2="190" y2="100" stroke="#334155" strokeWidth="2" />
                  <line x1="100" y1="10" x2="100" y2="190" stroke="#334155" strokeWidth="2" />
                  <polyline points="185,95 190,100 185,105" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="95,15 100,10 105,15" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  
                  <text x="140" y="60" fontSize="24" fill="#16a34a" fontWeight="bold">A</text>
                  <text x="140" y="80" fontSize="14" fill="#334155" fontWeight="bold">θ</text>
                  
                  <text x="60" y="60" fontSize="24" fill="#16a34a" fontWeight="bold">S</text>
                  <text x="40" y="80" fontSize="14" fill="#334155" fontWeight="bold">180°-θ</text>
                  
                  <text x="60" y="140" fontSize="24" fill="#16a34a" fontWeight="bold">T</text>
                  <text x="40" y="160" fontSize="14" fill="#334155" fontWeight="bold">180°+θ</text>
                  
                  <text x="140" y="140" fontSize="24" fill="#16a34a" fontWeight="bold">C</text>
                  <text x="140" y="160" fontSize="14" fill="#334155" fontWeight="bold">360°-θ</text>
                </svg>
              </div>
            </div>

            <div className="bg-red-50 p-3 flex gap-2 items-start rounded border border-red-200">
              <span className="text-xl">⚠️</span>
              <p className="text-sm text-red-800">
                <strong>注意：</strong>如果 <Latex math="\theta" /> 答案超出 <Latex math="0^\circ \le \theta < 360^\circ" /> 的範圍（例如因為平移得出負數），則需要 <strong><Latex math="+360^\circ / −360^\circ" /></strong> 使它回到正確的同界角範圍內。
              </p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

    </div>
  );
};