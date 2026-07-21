import React, { useRef } from 'react';
import { Latex, CollapsibleSection } from './shared';

export const AreaVolumeF3Notes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 px-4 md:px-0">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-teal-500">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">CH4 面積與體積(三)</h1>
          <p className="text-slate-600">重溫平面圖形面積，並掌握立體公式與相似比。</p>
        </div>

        {/* 1. 簡單圖形的面積 */}
        <CollapsibleSection id="basic-area" title="1. 簡單圖形的面積" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-2">💡 提示</h3>
              <p className="text-slate-700">需熟習各形狀的面積公式 才能計算相應體積</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 text-sm text-slate-500">
              {/* 圖形 1: 正方形 */}
              <div className="flex border-b border-slate-100 pb-4 mb-4">
                <div className="w-1/2 flex flex-col items-center justify-center border-r border-slate-100">
                  <svg viewBox="0 0 160 160" className="w-32 h-32">
                    <rect x="30" y="30" width="100" height="100" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" />
                    <polyline points="30,42 42,42 42,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="130,42 118,42 118,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="30,118 42,118 42,130" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="130,118 118,118 118,130" fill="none" stroke="#334155" strokeWidth="1.5" />
                    {/* Tick marks */}
                    <line x1="80" y1="24" x2="80" y2="36" stroke="#0ea5e9" strokeWidth="2" />
                    <line x1="80" y1="124" x2="80" y2="136" stroke="#0ea5e9" strokeWidth="2" />
                    <line x1="24" y1="80" x2="36" y2="80" stroke="#0ea5e9" strokeWidth="2" />
                    <line x1="124" y1="80" x2="136" y2="80" stroke="#0ea5e9" strokeWidth="2" />
                    
                    <text x="80" y="145" fontSize="13" fill="#475569" textAnchor="middle">邊長</text>
                    <text x="15" y="80" fontSize="13" fill="#475569" textAnchor="middle" writingMode="vertical-rl">邊長</text>
                  </svg>
                  <div className="mt-2 text-center text-red-600 font-bold">正方形的面積 = 邊長 × 邊長</div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                  <span className="text-sm text-slate-500 mb-2">例如：</span>
                  <svg viewBox="0 0 160 160" className="w-32 h-32">
                    <rect x="30" y="30" width="100" height="100" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" />
                    <polyline points="30,42 42,42 42,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="130,42 118,42 118,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="30,118 42,118 42,130" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="130,118 118,118 118,130" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <text x="80" y="142" fontSize="13" fill="#475569" textAnchor="middle">5 cm</text>
                    <text x="132" y="85" fontSize="13" fill="#475569" textAnchor="start">5 cm</text>
                  </svg>
                  <div className="mt-2 text-center">
                    <div className="inline-grid grid-cols-[auto_auto] gap-x-1 text-left font-sans leading-5">
                      <span>正方形的面積</span>
                      <span>= 5 × 5 (cm²)</span>
                      <span></span>
                      <span>= <span className="underline">25 cm²</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 圖形 2: 長方形 */}
              <div className="flex border-b border-slate-100 pb-4 mb-4">
                <div className="w-1/2 flex flex-col items-center justify-center border-r border-slate-100">
                  <svg viewBox="0 0 200 120" className="w-40 h-24">
                    <rect x="20" y="30" width="160" height="60" fill="rgba(245,158,11,0.2)" stroke="#334155" strokeWidth="2" />
                    <polyline points="20,42 32,42 32,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="180,42 168,42 168,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="20,78 32,78 32,90" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="180,78 168,78 168,90" fill="none" stroke="#334155" strokeWidth="1.5" />
                    
                    <line x1="100" y1="24" x2="100" y2="36" stroke="#0ea5e9" strokeWidth="2" />
                    <line x1="100" y1="84" x2="100" y2="96" stroke="#0ea5e9" strokeWidth="2" />
                    <line x1="14" y1="57" x2="26" y2="57" stroke="#0ea5e9" strokeWidth="2" />
                    <line x1="14" y1="63" x2="26" y2="63" stroke="#0ea5e9" strokeWidth="2" />
                    <line x1="174" y1="57" x2="186" y2="57" stroke="#0ea5e9" strokeWidth="2" />
                    <line x1="174" y1="63" x2="186" y2="63" stroke="#0ea5e9" strokeWidth="2" />

                    <text x="100" y="105" fontSize="13" fill="#475569" textAnchor="middle">長</text>
                    <text x="185" y="65" fontSize="13" fill="#475569" textAnchor="start">闊</text>
                  </svg>
                  <div className="mt-2 text-center text-purple-700 font-bold">長方形的面積 = 長 × 闊</div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                  <span className="text-sm text-slate-500 mb-2">例如：</span>
                  <svg viewBox="0 0 200 135" className="w-40 h-24">
                    <rect x="50" y="20" width="60" height="90" fill="rgba(245,158,11,0.2)" stroke="#334155" strokeWidth="2" />
                    <polyline points="50,32 62,32 62,20" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="110,32 98,32 98,20" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="50,98 62,98 62,110" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <polyline points="110,98 98,98 98,110" fill="none" stroke="#334155" strokeWidth="1.5" />
                    
                    <text x="80" y="121" fontSize="13" fill="#475569" textAnchor="middle">6 cm</text>
                    <text x="45" y="70" fontSize="13" fill="#475569" textAnchor="end">9 cm</text>
                  </svg>
                  <div className="mt-2 text-center">
                    <div className="inline-grid grid-cols-[auto_auto] gap-x-1 text-left font-sans leading-5">
                      <span>長方形的面積</span>
                      <span>= 9 × 6 (cm²)</span>
                      <span></span>
                      <span>= <span className="underline">54 cm²</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 圖形 3: 平行四邊形 */}
              <div className="flex border-b border-slate-100 pb-4 mb-4">
                <div className="w-1/2 flex flex-col items-center justify-center border-r border-slate-100">
                  <svg viewBox="0 0 240 120" className="w-48 h-24">
                    <polygon points="60,20 200,20 160,80 20,80" fill="rgba(236,72,153,0.15)" stroke="#334155" strokeWidth="2" />
                    
                    <line x1="60" y1="20" x2="60" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                    <polyline points="60,68 72,68 72,80" fill="none" stroke="#334155" strokeWidth="1.5" />
                    
                    {/* Arrow marks for parallel sides */}
                    <polyline points="125,16 130,20 125,24" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                    <polyline points="132,16 137,20 132,24" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                    
                    <polyline points="85,76 90,80 85,84" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                    <polyline points="92,76 97,80 92,84" fill="none" stroke="#0ea5e9" strokeWidth="2" />

                    {/* Left and right parallel marks (single arrows, pointing up) */}
                    <g transform="translate(40,50) rotate(-56.3)">
                      <polyline points="-5,-4 0,0 -5,4" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                    </g>
                    <g transform="translate(180,50) rotate(-56.3)">
                      <polyline points="-5,-4 0,0 -5,4" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                    </g>

                    {/* Dimension lines */}
                    <line x1="20" y1="95" x2="160" y2="95" stroke="#475569" strokeWidth="1" />
                    <line x1="20" y1="90" x2="20" y2="100" stroke="#475569" strokeWidth="1" />
                    <line x1="160" y1="90" x2="160" y2="100" stroke="#475569" strokeWidth="1" />

                    <text x="90" y="110" fontSize="13" fill="#475569" textAnchor="middle">底</text>
                    <text x="70" y="55" fontSize="13" fill="#db2777" textAnchor="start">高</text>
                  </svg>
                  <div className="mt-2 text-center text-pink-700 font-bold">平行四邊形的面積 = 底 × 高</div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                  <span className="text-sm text-slate-500 mb-2">例如：</span>
                  <svg viewBox="0 0 240 120" className="w-48 h-24">
                    <polygon points="90,30 200,30 150,80 40,80" fill="rgba(236,72,153,0.15)" stroke="#334155" strokeWidth="2" />
                    
                    {/* Extension line for height */}
                    <line x1="200" y1="30" x2="200" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="150" y1="80" x2="200" y2="80" stroke="#334155" strokeWidth="1" />
                    <polyline points="188,80 188,68 200,68" fill="none" stroke="#334155" strokeWidth="1.5" />

                    {/* Dimension lines */}
                    <line x1="40" y1="95" x2="150" y2="95" stroke="#475569" strokeWidth="1" />
                    <line x1="40" y1="90" x2="40" y2="100" stroke="#475569" strokeWidth="1" />
                    <line x1="150" y1="90" x2="150" y2="100" stroke="#475569" strokeWidth="1" />

                    <text x="95" y="110" fontSize="13" fill="#475569" textAnchor="middle">30 cm</text>
                    <text x="206" y="55" fontSize="13" fill="#db2777" textAnchor="start">8 cm</text>
                  </svg>
                  <div className="mt-2 text-center">
                    <div className="inline-grid grid-cols-[auto_auto] gap-x-1 text-left font-sans leading-5">
                      <span>平行四邊形的面積</span>
                      <span>= 30 × 8 (cm²)</span>
                      <span></span>
                      <span>= <span className="underline">240 cm²</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 圖形 4: 三角形 */}
              <div className="flex border-b border-slate-100 pb-4 mb-4">
                <div className="w-1/2 flex flex-col items-center justify-center border-r border-slate-100">
                  <svg viewBox="0 0 200 120" className="w-40 h-24">
                    <polygon points="100,20 160,80 40,80" fill="rgba(250,204,21,0.2)" stroke="#334155" strokeWidth="2" />
                    
                    <line x1="100" y1="20" x2="100" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                    <polyline points="100,68 112,68 112,80" fill="none" stroke="#334155" strokeWidth="1.5" />
                    
                    {/* Dimension lines */}
                    <line x1="40" y1="95" x2="160" y2="95" stroke="#475569" strokeWidth="1" />
                    <line x1="40" y1="90" x2="40" y2="100" stroke="#475569" strokeWidth="1" />
                    <line x1="160" y1="90" x2="160" y2="100" stroke="#475569" strokeWidth="1" />

                    <text x="100" y="110" fontSize="13" fill="#475569" textAnchor="middle">底</text>
                    <text x="105" y="55" fontSize="13" fill="#ca8a04" textAnchor="start">高</text>
                  </svg>
                  <div className="mt-2 text-center text-yellow-700 font-bold">三角形的面積 = <Latex math="\frac{1}{2}" /> × 底 × 高</div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                  <span className="text-sm text-slate-500 mb-2">例如：</span>
                  <svg viewBox="0 0 200 120" className="w-40 h-24">
                    <polygon points="50,20 150,80 50,80" fill="rgba(250,204,21,0.2)" stroke="#334155" strokeWidth="2" />
                    <polyline points="50,68 62,68 62,80" fill="none" stroke="#334155" strokeWidth="1.5" />
                    
                    <text x="100" y="95" fontSize="13" fill="#475569" textAnchor="middle">12 m</text>
                    <text x="45" y="55" fontSize="13" fill="#475569" textAnchor="end">7 m</text>
                  </svg>
                  <div className="mt-2 text-center">
                    <div className="inline-grid grid-cols-[auto_auto] gap-x-1 text-left font-sans leading-5">
                      <span>三角形的面積</span>
                      <span>= <Latex math="\frac{1}{2}" /> × 12 × 7 (m²)</span>
                      <span></span>
                      <span>= <span className="underline">42 m²</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 圖形 5: 梯形 */}
              <div className="flex pb-2">
                <div className="w-1/2 flex flex-col items-center justify-center border-r border-slate-100">
                  <svg viewBox="0 0 200 120" className="w-40 h-24">
                    <polygon points="70,20 130,20 160,80 40,80" fill="rgba(56,189,248,0.2)" stroke="#334155" strokeWidth="2" />
                    
                    <line x1="70" y1="20" x2="70" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                    <polyline points="70,68 82,68 82,80" fill="none" stroke="#334155" strokeWidth="1.5" />
                    
                    {/* Top and bottom parallel marks (single arrows) */}
                    <polyline points="95,16 100,20 95,24" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                    <polyline points="95,76 100,80 95,84" fill="none" stroke="#0ea5e9" strokeWidth="2" />

                    {/* Dimension lines */}
                    <line x1="40" y1="95" x2="160" y2="95" stroke="#475569" strokeWidth="1" />
                    <line x1="40" y1="90" x2="40" y2="100" stroke="#475569" strokeWidth="1" />
                    <line x1="160" y1="90" x2="160" y2="100" stroke="#475569" strokeWidth="1" />
                    
                    <text x="100" y="110" fontSize="13" fill="#475569" textAnchor="middle">下底</text>
                    <text x="100" y="15" fontSize="13" fill="#475569" textAnchor="middle">上底</text>
                    <text x="75" y="55" fontSize="13" fill="#0284c7" textAnchor="start">高</text>
                  </svg>
                  <div className="mt-2 text-center text-sky-700 font-bold">梯形的面積 = <Latex math="\frac{1}{2}" /> × (上底 + 下底) × 高</div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                  <span className="text-sm text-slate-500 mb-2">例如：</span>
                  <svg viewBox="0 0 200 120" className="w-40 h-24">
                    <polygon points="70,30 150,30 160,80 40,80" fill="rgba(56,189,248,0.2)" stroke="#334155" strokeWidth="2" />
                    
                    <line x1="70" y1="30" x2="70" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                    <polyline points="70,68 82,68 82,80" fill="none" stroke="#334155" strokeWidth="1.5" />

                    <text x="100" y="95" fontSize="13" fill="#475569" textAnchor="middle">8 mm</text>
                    <text x="110" y="22" fontSize="13" fill="#475569" textAnchor="middle">5 mm</text>
                    <text x="75" y="60" fontSize="13" fill="#0284c7" textAnchor="start">4 mm</text>
                  </svg>
                  <div className="mt-2 text-center">
                    <div className="inline-grid grid-cols-[auto_auto] gap-x-1 text-left font-sans leading-5">
                      <span>梯形面積</span>
                      <span>= <Latex math="\frac{1}{2}" />(5 + 8) × 4 (mm²)</span>
                      <span></span>
                      <span>= <span className="underline">26 mm²</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 2. 公式 */}
        <CollapsibleSection id="formulas" title="2. 公式" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
          <div className="space-y-4">
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3">📝 此課需考（的體積、表面面積）</h3>
              <ul className="text-slate-700 list-disc list-inside space-y-1">
                <li>角錐</li>
                <li>圓錐</li>
                <li>球體（<span className="text-green-600 font-bold">半球體</span>）</li>
                <li>平截頭體（<span className="text-green-600 font-bold">圓錐 / 角錐</span>）</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-green-800 mb-3">📦 體積公式</h3>
              <div className="space-y-3 font-sans">
                <div className="bg-white p-3 flex flex-wrap items-center justify-between rounded shadow-sm gap-2">
                  <span className="font-bold text-slate-700 whitespace-nowrap">柱體體積</span>
                  <span className="whitespace-nowrap">底面積 <Latex math="\times" /> 高</span>
                </div>
                <div className="bg-white p-3 flex flex-wrap items-center justify-between rounded shadow-sm gap-2">
                  <span className="font-bold text-slate-700 whitespace-nowrap">錐體體積</span>
                  <span className="whitespace-nowrap"><span className="text-red-600 font-bold mr-1"><Latex math="\dfrac{1}{3}" /></span> <Latex math="\times" /> 底面積 <Latex math="\times" /> 高</span>
                </div>
                <div className="bg-white p-3 flex flex-wrap items-center justify-between rounded shadow-sm gap-2">
                  <span className="font-bold text-slate-700 whitespace-nowrap">球體體積</span>
                  <span className="text-red-600 font-bold whitespace-nowrap"><Latex math="\dfrac{4}{3}\pi r^3" /></span>
                </div>
                <div className="bg-white p-3 flex flex-wrap items-center justify-between rounded shadow-sm gap-2">
                  <span className="font-bold text-slate-700 whitespace-nowrap">平截頭體體積</span>
                  <span className="whitespace-nowrap">大錐體體積 <Latex math="-" /> 小錐體體積</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-3">📐 面積公式</h3>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                <div className="space-y-3 font-sans">
                  <div className="bg-white p-3 flex flex-wrap items-center justify-between rounded shadow-sm gap-2">
                    <span className="font-bold text-slate-700 whitespace-nowrap">圓錐曲面面積</span>
                    <span className="text-red-600 font-bold whitespace-nowrap"><Latex math="\pi rl" /></span>
                  </div>
                  <div className="bg-white p-3 flex flex-wrap items-center justify-between rounded shadow-sm gap-2">
                    <span className="font-bold text-slate-700 whitespace-nowrap">圓錐總表面面積</span>
                    <span className="text-red-600 font-bold whitespace-nowrap"><Latex math="\pi rl + \pi r^2" /></span>
                  </div>
                  <div className="bg-white p-3 flex flex-wrap items-center justify-between rounded shadow-sm gap-2">
                    <span className="font-bold text-slate-700 whitespace-nowrap">球體表面面積</span>
                    <span className="text-red-600 font-bold whitespace-nowrap"><Latex math="4\pi r^2" /></span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm flex flex-col items-center justify-center min-h-[140px] md:min-h-0">
                  <div className="text-center font-bold text-purple-700 mb-2 text-sm"><span className="hidden md:inline">←</span><span className="md:hidden">↑</span> 斜高 (<Latex math="l" />)</div>
                  <svg viewBox="0 0 120 120" className="w-full h-full max-w-[120px]">
                    <path d="M 60 20 L 20 90 A 40 15 0 0 0 100 90 Z" fill="rgba(34, 197, 94, 0.1)" stroke="none" />
                    <path d="M 20 90 A 40 15 0 0 1 100 90" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                    <path d="M 20 90 A 40 15 0 0 0 100 90" fill="none" stroke="#22c55e" strokeWidth="2" />
                    <line x1="60" y1="20" x2="20" y2="90" stroke="#22c55e" strokeWidth="2" />
                    <line x1="60" y1="20" x2="100" y2="90" stroke="#22c55e" strokeWidth="2" />
                    <line x1="60" y1="90" x2="100" y2="90" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                    <text x="88" y="55" fontSize="16" fill="#7e22ce" fontWeight="bold" fontStyle="italic">l</text>
                    <text x="75" y="102" fontSize="13" fill="#475569" fontStyle="italic">r</text>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </CollapsibleSection>

        {/* 3. 相似圖形 / 相似立體 */}
        <CollapsibleSection id="similar-shapes" title="3. 相似圖形 / 相似立體" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
          <div className="space-y-4">
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-xl">📊</span> 相似圖形 / 相似立體比例
              </h3>
              <div className="bg-white rounded-lg p-4 shadow-sm space-y-4 font-sans">
                <div className="font-bold text-slate-800 text-lg border-b border-slate-200 pb-2">
                  設兩立體的長度比 = <Latex math="x : y" />
                </div>
                <div className="pl-4 md:pl-8 space-y-3 relative border-l-4 border-slate-300 ml-2 py-1">
                  <div className="text-lg md:text-xl flex flex-wrap items-center gap-2">
                    <span className="text-red-600 font-bold w-20">面積比</span>
                    <span className="text-red-600 font-bold"><Latex math="= (x : y)^2" inline /> <span className="text-slate-500 font-normal mx-1">=</span> <Latex math="x^2 : y^2" inline /></span>
                  </div>
                  <div className="text-lg md:text-xl flex flex-wrap items-center gap-2">
                    <span className="text-green-700 font-bold w-20">體積比</span>
                    <span className="text-green-700 font-bold"><Latex math="= (x : y)^3" inline /> <span className="text-slate-500 font-normal mx-1">=</span> <Latex math="x^3 : y^3" inline /></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-bold text-blue-800 mb-3 text-lg">例子：假設球體 A、B 為相似立體</h3>
              <div className="flex flex-col md:flex-row gap-6 mb-2">
                <div className="flex-1 flex justify-center items-center">
                  <svg viewBox="0 0 320 160" className="w-full max-w-[320px] h-auto">
                    {/* Sphere A */}
                    <circle cx="80" cy="90" r="40" fill="rgba(253,230,138,0.6)" stroke="#334155" strokeWidth="2" />
                    <path d="M 40 90 A 40 12 0 0 1 120 90" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4,4" />
                    <path d="M 40 90 A 40 12 0 0 0 120 90" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <line x1="40" y1="90" x2="80" y2="90" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4,4" />
                    <circle cx="80" cy="90" r="2.5" fill="#334155" />
                    <text x="60" y="80" fontSize="14" fill="#334155" textAnchor="middle">3 cm</text>
                    <text x="80" y="115" fontSize="16" fill="#334155" textAnchor="middle" fontStyle="italic">A</text>

                    {/* Sphere B */}
                    <circle cx="230" cy="80" r="70" fill="rgba(216,184,227,0.6)" stroke="#334155" strokeWidth="2" />
                    <path d="M 160 80 A 70 20 0 0 1 300 80" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="5,5" />
                    <path d="M 160 80 A 70 20 0 0 0 300 80" fill="none" stroke="#334155" strokeWidth="1.5" />
                    <line x1="160" y1="80" x2="230" y2="80" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" />
                    <circle cx="230" cy="80" r="3" fill="#334155" />
                    <text x="195" y="70" fontSize="16" fill="#334155" textAnchor="middle">6 cm</text>
                    <text x="230" y="135" fontSize="20" fill="#334155" textAnchor="middle" fontStyle="italic">B</text>
                  </svg>
                </div>
                
                <div className="flex-1 bg-white p-5 rounded shadow-sm flex flex-col justify-center space-y-4 font-sans text-base md:text-lg">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-bold text-slate-800 w-20">長度比</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">=</span>
                      <Latex math="3 : 6" inline />
                      <span className="text-slate-500">=</span>
                      <Latex math="1 : 2" inline />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-bold text-blue-700 w-20">面積比</span>
                    <div className="flex items-center gap-2 text-blue-700 font-bold">
                      <span className="text-slate-500 font-normal">=</span>
                      <Latex math="(3 : 6)^2" inline />
                      <span className="text-slate-500 font-normal">=</span>
                      <Latex math="9 : 36" inline />
                      <span className="text-slate-500 font-normal">=</span>
                      <Latex math="1 : 4" inline />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-bold text-green-700 w-20">體積比</span>
                    <div className="flex items-center gap-2 text-green-700 font-bold">
                      <span className="text-slate-500 font-normal">=</span>
                      <Latex math="(3 : 6)^3" inline />
                      <span className="text-slate-500 font-normal">=</span>
                      <Latex math="27 : 216" inline />
                      <span className="text-slate-500 font-normal">=</span>
                      <Latex math="1 : 8" inline />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="font-bold text-red-800 mb-3 text-lg flex items-center gap-2">
                <span className="text-2xl">🔥</span> 進階技巧：面積比 <Latex math="\rightarrow" inline /> 體積比
              </h3>
              <div className="bg-white rounded p-5 shadow-sm font-sans">
                <p className="text-blue-900 font-bold mb-4 text-base md:text-lg">e.g. A 和 B 立體的面積比是 <Latex math="16 : 25" inline /></p>
                <div className="space-y-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 border-l-4 border-blue-200 pl-3">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="font-bold text-slate-800 underline decoration-blue-300 underline-offset-4 w-28 shrink-0">A 和 B 長度比</span>
                      <span className="text-blue-700 font-bold"><Latex math="= \sqrt{16 : 25} = 4 : 5" inline /></span>
                    </div>
                    <span className="text-green-700 font-bold text-sm md:ml-4 bg-green-100 px-2 py-0.5 rounded shrink-0"><Latex math="\leftarrow" inline /> 先轉換長度比</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-2 border-l-4 border-blue-200 pl-3">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="font-bold text-slate-800 underline decoration-blue-300 underline-offset-4 w-28 shrink-0">A 和 B 體積比</span>
                      <span className="text-blue-700 font-bold"><Latex math="= (4 : 5)^3 = 64 : 125" inline /></span>
                    </div>
                    <span className="text-green-700 font-bold text-sm md:ml-4 bg-green-100 px-2 py-0.5 rounded shrink-0"><Latex math="\leftarrow" inline /> 再用長度比求體積比</span>
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

