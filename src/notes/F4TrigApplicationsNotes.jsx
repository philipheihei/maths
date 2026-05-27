import React, { useRef, useEffect } from 'react';
import { Latex, MathDisplay, CollapsibleSection } from './shared';

export const TrigApplicationsF4Notes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);

  useEffect(() => {
    const refs = {
      'area': s1,
      'sides-angles': s2
    };
    if (activeSub && refs[activeSub]?.current) {
      setTimeout(() => {
        refs[activeSub].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeSub]);

  // Helper for step with explanation on right
  const Step = ({ math, explain, indent, alignEq = true }) => {
    const shouldAlignEq = alignEq && math.includes('=') && !math.includes('\\therefore');
    const eqParts = shouldAlignEq ? math.match(/^(.*?)(=)(.*)$/) : null;

    return (
      <div className={`grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(140px,160px)] gap-x-3 py-1 ${indent ? 'pl-8' : ''}`}>
        <div className="min-w-0 text-left pr-1">
          {eqParts ? (
            <div className="w-full grid grid-cols-[76px_auto_minmax(0,1fr)] md:grid-cols-[96px_auto_minmax(0,1fr)] items-baseline gap-x-1.5">
              <div className="text-right pr-1"><Latex math={eqParts[1].trim()} block={false} /></div>
              <div><Latex math="=" block={false} /></div>
              <div className="min-w-0"><Latex math={eqParts[3].trim()} block={false} /></div>
            </div>
          ) : (
            <div className="min-w-0"><Latex math={math} block={false} /></div>
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

  const AreaSvg1 = () => (
    <svg viewBox="0 0 400 200" className="w-full max-w-xs mx-auto">
      {/* 5, 7, included angle 60°, arbitrary acute triangle */}
      <polygon points="120,160 280,160 170,40" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      {/* Angle arc at (120,160) */}
      <path d="M 152 160 A 32 32 0 0 0 132.2 130.6" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="160" y="152" fontSize="13" fill="#334155" fontWeight="bold">60°</text>
      <text x="200" y="180" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">7</text>
      <text x="135" y="100" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">5</text>
    </svg>
  );

  const AreaSvg2 = () => (
    <svg viewBox="0 0 400 200" className="w-full max-w-xs mx-auto">
      {/* Heron's formula: 11, 14, 15 */}
      <polygon points="100,160 300,160 170,30" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      <text x="200" y="180" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">15</text>
      <text x="120" y="90" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">11</text>
      <text x="250" y="90" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">14</text>
    </svg>
  );

  const SineLawSvg1 = () => (
    <svg viewBox="0 0 400 200" className="w-full max-w-xs mx-auto">
      {/* Sine law diagram with arrows */}
      {/* A(200, 30), B(80, 160), C(320, 160) */}
      <polygon points="80,160 320,160 200,30" fill="none" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      <text x="200" y="20" fontSize="15" fill="#e11d48" textAnchor="middle" fontWeight="bold">A</text>
      <text x="65" y="165" fontSize="15" fill="#e11d48" textAnchor="middle" fontWeight="bold">B</text>
      <text x="335" y="165" fontSize="15" fill="#e11d48" textAnchor="middle" fontWeight="bold">C</text>
      
      {/* Opposite sides */}
      <text x="200" y="180" fontSize="15" fill="#334155" textAnchor="middle" fontWeight="bold">a</text>
      <text x="130" y="90" fontSize="15" fill="#334155" textAnchor="middle" fontWeight="bold">c</text>
      <text x="270" y="90" fontSize="15" fill="#334155" textAnchor="middle" fontWeight="bold">b</text>

      {/* Arrows (dashed red) */}
      {/* A -> a (bottom) */}
      <path d="M 200 45 Q 220 100 200 150" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-red)" />
      {/* B -> b (right) */}
      <path d="M 95 155 Q 160 140 250 100" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-red)" />
      {/* C -> c (left) */}
      <path d="M 305 155 Q 230 140 150 100" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-red)" />

      <defs>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#e11d48" />
        </marker>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
        </marker>
      </defs>
    </svg>
  );

  const SineLawSvg2 = () => (
    <svg viewBox="0 0 400 200" className="w-full max-w-xs mx-auto">
      {/* Sine law example: 39°, 62°, 8, x */}
      {/* B: bottom-left 62°, C: bottom-right 39° (just an example config) */}
      <polygon points="60,160 340,160 160,40" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Left angle (e.g. 62°) */}
      <path d="M 90 160 A 30 30 0 0 0 79.2 136.9" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="105" y="152" fontSize="13" fill="#334155" fontWeight="bold">62°</text>

      {/* Right angle (e.g. 39°) */}
      <path d="M 300 160 A 40 40 0 0 1 306.7 137.8" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="285" y="150" fontSize="13" fill="#334155" fontWeight="bold">39°</text>

      {/* Opposite to 62° is x, Opposite to 39° is 8 */}
      <text x="260" y="90" fontSize="15" fill="#334155" textAnchor="middle" fontWeight="bold">x</text>
      <text x="100" y="95" fontSize="15" fill="#334155" textAnchor="middle" fontWeight="bold">8</text>

      {/* Blue dashed arrows */}
      <path d="M 95 145 Q 160 120 240 100" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-blue)" />
      <path d="M 290 145 Q 220 120 120 100" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-blue)" />
    </svg>
  );

  const CosineLawSvg1 = () => (
    <svg viewBox="0 0 400 200" className="w-full max-w-xs mx-auto">
      {/* Cosine law reference */}
      <polygon points="100,160 300,160 220,40" fill="none" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      {/* Top angle theta */}
      <path d="M 202.3 57.7 A 25 25 0 0 0 233.9 60.8" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="220" y="80" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">θ</text>
      
      {/* Sides a, b, c */}
      <text x="150" y="90" fontSize="15" fill="#334155" textAnchor="middle" fontWeight="bold">b</text>
      <text x="270" y="90" fontSize="15" fill="#334155" textAnchor="middle" fontWeight="bold">a</text>
      <text x="200" y="180" fontSize="15" fill="#334155" textAnchor="middle" fontWeight="bold">c</text>
    </svg>
  );

  const CosineLawSvg2 = () => (
    <svg viewBox="0 0 400 200" className="w-full max-w-xs mx-auto">
      {/* Cosine law example 1 (find side) */}
      <polygon points="120,160 340,160 80,60" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      {/* angle 114 at B (120,160) */}
      {/* A(80,60), B(120,160), C(340,160) */}
      <path d="M 145 160 A 25 25 0 0 0 110.7 136.8" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="145" y="145" fontSize="13" fill="#334155" fontWeight="bold">114°</text>
      
      <text x="90" y="120" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">11</text>
      <text x="230" y="180" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">16</text>
      <text x="220" y="100" fontSize="15" fill="#e11d48" textAnchor="middle" fontWeight="bold">x</text>
    </svg>
  );

  const CosineLawSvg3 = () => (
    <svg viewBox="0 0 400 200" className="w-full max-w-xs mx-auto">
      {/* Cosine law example 2 (find angle) */}
      {/* A(200,40), B(120,160), C(280,160) */}
      <polygon points="120,160 280,160 200,40" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Top angle theta */}
      <path d="M 186.1 60.8 A 25 25 0 0 0 213.9 60.8" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="200" y="80" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">θ</text>
      
      <text x="150" y="100" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">9</text>
      <text x="250" y="100" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">9</text>
      <text x="200" y="180" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">8</text>

      {/* Dashed arrow from theta to 8 */}
      <path d="M 200 90 L 200 155" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-blue)" />
    </svg>
  );


  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-rose-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH10 三角學的應用</h1>
        <p className="text-slate-600">此課重點為學在 <span className="font-bold text-slate-800">非直角△</span> 求邊長/角度/面積 etc.</p>
      </div>

      <CollapsibleSection id="area" title="1. 找 △ 面積" num={1} color="rose" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3 text-lg">A. 如知道 2 條邊長及其夾角</h3>
            <p className="mb-3 text-slate-700">用面積公式： <Latex math="\frac{1}{2}ab\sin C" inline /></p>
            
            <div className="mt-4">
              <AreaSvg1 />
            </div>
            
            <div className="bg-white rounded p-4 mt-4 font-sans space-y-1">
              <Step math="\text{面積} = \frac{1}{2}(5)(7)\sin 60^\circ" alignEq={false} />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3 text-lg">B. 如不知道角度，但知道 3 條邊長</h3>
            <p className="mb-1 text-slate-700">用希羅公式 <span className="text-red-600 font-bold">(FMLA 03 Heron's Formula)</span></p>
            <p className="mb-3 text-slate-700"><Latex math="a, b, c" inline /> 是 3 條邊的邊長</p>
            
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex-1">
                <AreaSvg2 />
              </div>
              <div className="text-xl font-bold text-slate-400">→</div>
              <div className="text-xl font-bold text-blue-800">
                <Latex math="73.5\text{ cm}^2" inline />
              </div>
            </div>

            <div className="bg-white rounded p-4 mt-4 font-sans space-y-2 border border-blue-100">
              <p className="font-bold text-slate-800">計算機 Step by Step（例：<Latex math="a=11,\ b=14,\ c=15" inline />）</p>
              <div className="text-sm text-slate-700 space-y-1">
                <p><span className="font-bold text-blue-700">Step 1：</span>按 <span className="bg-orange-500 text-white text-xs font-mono px-2 py-0.5 rounded">FMLA</span>，選 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">03</span>（Heron）。</p>
                <p><span className="font-bold text-blue-700">Step 2：</span>依序輸入三邊邊長：<span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">11</span> <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> → <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">14</span> <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> → <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">15</span> <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>。</p>
                <p><span className="font-bold text-blue-700">Step 3：</span>計算機會顯示 <span className="font-semibold">73.484...</span>，按題目要求取近似值：<span className="font-semibold">73.5 cm²</span>（準確至3位有效數字）。</p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-sm text-slate-700 space-y-1">
                <p className="font-bold text-slate-800">同場手算對照：</p>
                <Step math="s = \frac{11+14+15}{2} = 20" />
                <Step math="\text{面積} = \sqrt{s(s-a)(s-b)(s-c)}" />
                <Step math="\text{面積} = \sqrt{20(20-11)(20-14)(20-15)} = \sqrt{5400}" />
                <Step math="\text{面積} = 73.5\text{ cm}^2\ (\text{準確至3位有效數字})" />
              </div>
            </div>
          </div>

        </div>
      </CollapsibleSection>

      <CollapsibleSection id="sides-angles" title="2. 找 △ 邊長 / 角度" num={2} color="emerald" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <h3 className="font-bold text-emerald-800 mb-3 text-lg">A. 正弦公式 (sine law) (2邊2角組合)</h3>
            <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-lg mb-4">
              <div className="flex-1 text-center text-red-600 font-bold text-xl">
                <Latex math="\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}" block />
              </div>
              <div className="flex-1 w-full flex items-center justify-center">
                <SineLawSvg1 />
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-2 font-bold">e.g.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center">
                <SineLawSvg2 />
              </div>
              <div className="bg-white rounded p-4 font-sans flex flex-col justify-center">
                <p className="text-blue-800 font-bold mb-2">看對面的邊角組合：</p>
                <div className="flex justify-center gap-8 mb-4">
                  <span><Latex math="39^\circ \rightarrow 8" /></span>
                  <span><Latex math="62^\circ \rightarrow x" /></span>
                </div>
                <p className="text-red-600 font-bold text-sm bg-red-50 p-2 rounded">
                  注意：sin 只會配角度，不配邊長
                </p>
              </div>
            </div>

            <div className="bg-white rounded p-4 mt-4 font-sans space-y-1">
              <p className="font-bold mb-2">套用正弦公式，</p>
              <Step math="\frac{x}{\sin 62^\circ} = \frac{8}{\sin 39^\circ}" />
              <Step math="x = \frac{8 \sin 62^\circ}{\sin 39^\circ}" explain="要移項找 x" />
              <Step math="x = 11.2" />
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="font-bold text-indigo-800 mb-3 text-lg">B. 餘弦公式 (cosine law) (3邊1角組合)</h3>
            
            <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-lg mb-4">
              <div className="flex-1 text-center">
                <p className="text-green-700 font-bold mb-1">公式：</p>
                <div className="text-xl">
                  <Latex math="c^2 = a^2 + b^2 - 2(a)(b)\cos\theta" inline />
                </div>
                <p className="text-red-600 font-bold mt-2">一式走天涯便可!</p>
              </div>
              <div className="flex-1 w-full flex flex-col items-center">
                <CosineLawSvg1 />
                <p className="text-center font-bold text-lg mt-2">3條邊 + 1隻角</p>
                <p className="text-center text-red-600 text-sm">(題目必定會提供3項資訊)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Example 1 */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="mb-4">
                  <CosineLawSvg2 />
                </div>
                <p className="text-green-700 font-bold mb-2">先找已知角度的對邊 ↓</p>
                <div className="font-sans space-y-1">
                  <Step math="x^2 = 11^2 + 16^2 - 2(11)(16)\cos 114^\circ" explain="11, 16為其餘邊" />
                  <Step math="x^2 = 520.17" explain="因沒有未知數，所以直接按計算機" />
                  <Step math="x = 22.8" />
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="mb-4">
                  <CosineLawSvg3 />
                </div>
                <p className="text-green-700 font-bold mb-2"><Latex math="\theta" inline /> 的對邊 ↓</p>
                <div className="font-sans space-y-1">
                  <Step math="8^2 = 9^2 + 9^2 - 2(9)(9)\cos\theta" explain="9, 9為其餘邊" />
                  <Step math="64 = 162 - 162\cos\theta" explain="按紅線分隔用計算機簡化" />
                  <Step math="64 - 162 = -162\cos\theta" explain="移項至 cosθ = ?" />
                  <Step math="-98 = -162\cos\theta" />
                  <Step math="\frac{-98}{-162} = \cos\theta" explain="cos⁻¹θ" />
                  <p className="text-center font-bold mt-2"><Latex math="\theta = 52.8^\circ" /></p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </CollapsibleSection>
    </div>
  );
};
