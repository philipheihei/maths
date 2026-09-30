import React, { useRef, useEffect } from 'react';
import { Latex, MathDisplay, CollapsibleSection } from './shared';

export const TrigApplicationsF4Notes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);
  const s4 = useRef(null);
  const s5 = useRef(null);
  const s6 = useRef(null);
  const s7 = useRef(null);

  useEffect(() => {
    const refs = {
      'area': s1,
      'sides-angles': s2,
      'projection': s3,
      'line-plane-angle': s4,
      'dihedral-angle': s5,
      'three-perpendicular': s6,
      'three-dimensional-problems': s7
    };
    if (activeSub && refs[activeSub]?.current) {
      setTimeout(() => {
        refs[activeSub].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeSub]);

  // Helper for step with explanation on right
  const Step = ({ math, explain, indent, alignEq = true, explainClass = '' }) => {
    const shouldAlignEq = alignEq && math.includes('=') && !math.includes('\\therefore');
    const hasFraction = math.includes('\\frac');
    const eqParts = shouldAlignEq ? math.match(/^(.*?)(=)(.*)$/) : null;

    return (
      <div className={`grid grid-cols-1 md:grid-cols-[max-content_max-content] md:justify-start gap-x-3 py-1 ${indent ? 'pl-8' : ''}`}>
        <div className="min-w-0 text-left pr-1">
          {eqParts ? (
            <div className={`w-full grid grid-cols-[48px_auto_minmax(0,1fr)] items-baseline gap-x-1.5 ${hasFraction ? 'text-lg' : ''}`}>
              <div className="text-right pr-1"><Latex math={eqParts[1].trim()} block={false} /></div>
              <div><Latex math="=" block={false} /></div>
              <div className="min-w-0"><Latex math={eqParts[3].trim()} block={false} /></div>
            </div>
          ) : (
            <div className={`min-w-0 ${hasFraction ? 'text-lg' : ''}`}><Latex math={math} block={false} /></div>
          )}
        </div>
        {explain ? (
          <div className={`mt-1 md:mt-0 text-red-600 text-sm flex items-start md:items-baseline md:justify-start gap-1.5 leading-snug ${explainClass}`}>
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
      {/* Side lengths 5 and 7 with included angle 60° */}
      <polygon points="120,160 280,160 177.1,61" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      {/* Angle arc at (120,160) */}
      <path d="M 145 160 A 25 25 0 0 0 132.5 138.3" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="154" y="145" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">60°</text>
      <text x="200" y="180" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">7</text>
      <text x="135" y="100" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">5</text>
    </svg>
  );

  const AreaSvg2 = () => (
    <svg viewBox="0 0 400 200" className="w-full max-w-xs mx-auto">
      {/* Heron's formula: 11, 14, 15 */}
      <polygon points="100,160 300,160 166.7,29.4" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      <text x="200" y="180" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">15</text>
      <text x="122" y="95" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">11</text>
      <text x="244" y="95" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">14</text>
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
      <defs>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
        </marker>
      </defs>
      {/* Sine law example: 39°, 62°, 8, x */}
      {/* B: bottom-left 62°, C: bottom-right 39° */}
      <polygon points="95,160 305,160 158,41" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Left angle (62°) */}
      <path d="M 119 160 A 24 24 0 0 0 106.3 138.8" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="122" y="150" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">62°</text>

      {/* Right angle (39°) */}
      <path d="M 279 160 A 26 26 0 0 1 284.7 143.6" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="268" y="152" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">39°</text>

      {/* Opposite to 62° is x, Opposite to 39° is 8 */}
      <text x="248" y="98" fontSize="15" fill="#334155" textAnchor="start" fontWeight="bold">x</text>
      <text x="106" y="98" fontSize="15" fill="#334155" textAnchor="end" fontWeight="bold">8</text>

      {/* Blue dashed arrows */}
      <path d="M 132 136 Q 180 122 215 102" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-blue)" />
      <path d="M 258 141 Q 190 122 142 102" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-blue)" />
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
      <polygon points="120,160 280,160 75.3,59.5" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      {/* angle 114 at B (120,160) */}
      {/* A(75.3,59.5), B(120,160), C(280,160) */}
      <path d="M 145 160 A 25 25 0 0 0 109.8 137.2" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="145" y="137" fontSize="13" fill="#334155" fontWeight="bold">114°</text>
      
      <text x="84" y="118" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">11</text>
      <text x="200" y="180" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">16</text>
      <text x="186" y="101" fontSize="15" fill="#e11d48" textAnchor="middle" fontWeight="bold">x</text>
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

  const ProjectionSvg = () => (
    <svg viewBox="0 0 380 180" className="w-full max-w-xs mx-auto">
      {/* Plane pi */}
      <polygon points="50,150 260,150 330,75 120,75" fill="rgba(6,182,212,0.12)" stroke="#0891b2" strokeWidth="1.5" />
      <text x="315" y="92" fontSize="14" fill="#0891b2" fontStyle="italic" fontWeight="bold">π</text>

      {/* Perpendicular AH (dashed vertical) */}
      <line x1="200" y1="35" x2="200" y2="115" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
      {/* Right angle mark at H in perspective */}
      <polyline points="200,103 188,105 188,117" fill="none" stroke="#ef4444" strokeWidth="1.5" />

      {/* Projection line HB on plane */}
      <line x1="200" y1="115" x2="100" y2="130" stroke="#0891b2" strokeWidth="3" />

      {/* Slanted line AB in space */}
      <line x1="200" y1="35" x2="100" y2="130" stroke="#2563eb" strokeWidth="2.5" />

      {/* Points */}
      <circle cx="200" cy="35" r="4" fill="#ef4444" />
      <circle cx="200" cy="115" r="3.5" fill="#ef4444" />
      <circle cx="100" cy="130" r="4" fill="#2563eb" />

      {/* Labels */}
      <text x="200" y="25" fontSize="13" fill="#ef4444" textAnchor="middle" fontWeight="bold">A</text>
      <text x="210" y="125" fontSize="13" fill="#ef4444" fontWeight="bold">H (垂足)</text>
      <text x="85" y="135" fontSize="13" fill="#2563eb" fontWeight="bold">B</text>
      
      <text x="135" y="70" fontSize="12" fill="#2563eb" textAnchor="middle" fontWeight="bold">斜線 AB</text>
      <text x="235" y="75" fontSize="12" fill="#ef4444" fontWeight="bold">垂直線 AH</text>
      <text x="145" y="145" fontSize="12" fill="#0891b2" textAnchor="middle" fontWeight="bold">正射影 HB</text>
    </svg>
  );

  const LinePlaneAngleSvg = () => (
    <svg viewBox="0 0 380 180" className="w-full max-w-xs mx-auto">
      {/* Plane pi */}
      <polygon points="50,150 260,150 330,75 120,75" fill="rgba(59,130,246,0.1)" stroke="#2563eb" strokeWidth="1.5" />
      <text x="315" y="92" fontSize="14" fill="#2563eb" fontStyle="italic" fontWeight="bold">π</text>

      {/* Perpendicular AH */}
      <line x1="210" y1="35" x2="210" y2="115" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
      <polyline points="210,103 198,105 198,117" fill="none" stroke="#ef4444" strokeWidth="1.5" />

      {/* Projection BH on plane */}
      <line x1="210" y1="115" x2="90" y2="130" stroke="#0ea5e9" strokeWidth="3" />

      {/* Slanted line AB in space */}
      <line x1="210" y1="35" x2="90" y2="130" stroke="#1e293b" strokeWidth="2.5" />

      {/* Angle theta arc at B: angle from BH to BA */}
      <path d="M 125 125.6 A 35 35 0 0 0 117.4 108.3" fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x="134" y="116" fontSize="13" fill="#dc2626" fontWeight="bold">θ</text>

      {/* Points */}
      <circle cx="210" cy="35" r="4" fill="#ef4444" />
      <circle cx="210" cy="115" r="3.5" fill="#ef4444" />
      <circle cx="90" cy="130" r="4" fill="#1e293b" />

      {/* Labels */}
      <text x="210" y="25" fontSize="13" fill="#ef4444" textAnchor="middle" fontWeight="bold">A</text>
      <text x="222" y="120" fontSize="13" fill="#ef4444" fontWeight="bold">H</text>
      <text x="75" y="135" fontSize="13" fill="#1e293b" fontWeight="bold">B</text>
      <text x="140" y="70" fontSize="12" fill="#1e293b" textAnchor="middle" fontWeight="bold">斜線 AB</text>
      <text x="235" y="75" fontSize="12" fill="#ef4444" fontWeight="bold">高 AH</text>
      <text x="150" y="145" fontSize="12" fill="#0ea5e9" textAnchor="middle" fontWeight="bold">投影 BH</text>
    </svg>
  );

  const DihedralAngleSvg = () => (
    <svg viewBox="0 0 380 190" className="w-full max-w-xs mx-auto">
      {/* Bottom plane beta */}
      <polygon points="60,110 320,110 260,175 20,175" fill="rgba(168,85,247,0.12)" stroke="#9333ea" strokeWidth="1.5" />
      <text x="35" y="165" fontSize="14" fill="#9333ea" fontStyle="italic" fontWeight="bold">β</text>

      {/* Slanted plane alpha */}
      <polygon points="60,110 320,110 350,30 110,30" fill="rgba(59,130,246,0.12)" stroke="#2563eb" strokeWidth="1.5" />
      <text x="330" y="48" fontSize="14" fill="#2563eb" fontStyle="italic" fontWeight="bold">α</text>

      {/* Intersection line l */}
      <line x1="50" y1="110" x2="330" y2="110" stroke="#334155" strokeWidth="2.5" />
      <text x="335" y="114" fontSize="12" fill="#334155" fontWeight="bold">交線 ℓ</text>

      {/* Ray OA on plane alpha (OA perpendicular to l) */}
      <line x1="190" y1="110" x2="225" y2="40" stroke="#2563eb" strokeWidth="2" />
      {/* Ray OB on plane beta (OB perpendicular to l) */}
      <line x1="190" y1="110" x2="145" y2="165" stroke="#9333ea" strokeWidth="2" />

      {/* Right angle at O on plane alpha */}
      <polyline points="202,110 208,98 196,98" fill="none" stroke="#2563eb" strokeWidth="1.5" />
      {/* Right angle at O on plane beta */}
      <polyline points="202,110 193,122 181,122" fill="none" stroke="#9333ea" strokeWidth="1.5" />

      {/* Angle theta arc between OA and OB at O(190, 110) */}
      <path d="M 200.5 89 A 23 23 0 0 1 171.2 123.5" fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x="175" y="98" fontSize="13" fill="#dc2626" fontWeight="bold">θ</text>

      {/* Points */}
      <circle cx="190" cy="110" r="3.5" fill="#334155" />
      <circle cx="225" cy="40" r="3.5" fill="#2563eb" />
      <circle cx="145" cy="165" r="3.5" fill="#9333ea" />

      {/* Labels */}
      <text x="195" y="125" fontSize="13" fill="#334155" fontWeight="bold">O</text>
      <text x="235" y="42" fontSize="13" fill="#2563eb" fontWeight="bold">A</text>
      <text x="135" y="172" fontSize="13" fill="#9333ea" fontWeight="bold">B</text>
      <text x="235" y="80" fontSize="11" fill="#2563eb" fontWeight="bold">OA ⊥ ℓ</text>
      <text x="130" y="140" fontSize="11" fill="#9333ea" fontWeight="bold">OB ⊥ ℓ</text>
    </svg>
  );

  const ThreePerpendicularSvg = () => (
    <svg viewBox="0 0 380 190" className="w-full max-w-xs mx-auto">
      {/* Plane pi */}
      <polygon points="40,165 270,165 340,75 125,75" fill="rgba(244,63,94,0.08)" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="325" y="92" fontSize="14" fill="#f43f5e" fontStyle="italic" fontWeight="bold">π</text>

      {/* Line l on plane through B(100, 130) */}
      <line x1="55" y1="95" x2="160" y2="165" stroke="#334155" strokeWidth="2" />
      <text x="50" y="90" fontSize="12" fill="#334155" fontWeight="bold">直線 ℓ</text>

      {/* Perpendicular 1: AH perpendicular to pi */}
      <line x1="210" y1="35" x2="210" y2="115" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
      <polyline points="210,103 198,105 198,117" fill="none" stroke="#ef4444" strokeWidth="1.5" />

      {/* Projection HB on plane */}
      <line x1="210" y1="115" x2="100" y2="130" stroke="#0ea5e9" strokeWidth="2.5" />

      {/* Perpendicular 2: l perpendicular to HB at B */}
      <polyline points="107,135 117,133.5 110,128.5" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />

      {/* Slanted line AB in space */}
      <line x1="210" y1="35" x2="100" y2="130" stroke="#dc2626" strokeWidth="2.5" />

      {/* Perpendicular 3: l perpendicular to AB at B (highlighted conclusion) */}
      <polyline points="108,122 118,120.5 110,113" fill="none" stroke="#dc2626" strokeWidth="1.5" />

      {/* Points */}
      <circle cx="210" cy="35" r="4" fill="#ef4444" />
      <circle cx="210" cy="115" r="3.5" fill="#ef4444" />
      <circle cx="100" cy="130" r="4" fill="#334155" />

      {/* Labels */}
      <text x="210" y="25" fontSize="13" fill="#ef4444" textAnchor="middle" fontWeight="bold">A</text>
      <text x="222" y="120" fontSize="13" fill="#ef4444" fontWeight="bold">H</text>
      <text x="85" y="135" fontSize="13" fill="#334155" fontWeight="bold">B</text>
      <text x="235" y="75" fontSize="11" fill="#ef4444" fontWeight="bold">① AH ⊥ π</text>
      <text x="160" y="135" fontSize="11" fill="#0ea5e9" fontWeight="bold">② ℓ ⊥ HB</text>
      <text x="125" y="75" fontSize="11" fill="#dc2626" fontWeight="bold">③ 得出 ℓ ⊥ AB</text>
    </svg>
  );

  const CuboidSvg = () => (
    <svg viewBox="0 0 380 200" className="w-full max-w-xs mx-auto">
      {/* Hidden edges (dashed) */}
      <line x1="80" y1="145" x2="140" y2="105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="140" y1="105" x2="280" y2="105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="140" y1="105" x2="140" y2="35" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Bottom diagonal AC (projection) - blue dashed */}
      <line x1="80" y1="145" x2="280" y2="105" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
      <text x="175" y="132" fontSize="12" fill="#2563eb" fontWeight="bold">10 cm</text>

      {/* Body diagonal AG - red solid */}
      <line x1="80" y1="145" x2="280" y2="35" stroke="#dc2626" strokeWidth="2.5" />
      <text x="175" y="80" fontSize="12" fill="#dc2626" fontWeight="bold">AG</text>

      {/* Angle theta arc at A(80, 145) between AC and AG */}
      <path d="M 115 138 A 36 36 0 0 0 111.5 127.7" fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x="123" y="132" fontSize="12" fill="#dc2626" fontWeight="bold">θ</text>

      {/* Right angle at C between AC and CG */}
      <polyline points="280,95 270,97 270,107" fill="none" stroke="#2563eb" strokeWidth="1.5" />

      {/* Solid edges */}
      {/* Front rectangle ABFE */}
      <polygon points="80,145 220,145 220,75 80,75" fill="rgba(59,130,246,0.06)" stroke="#334155" strokeWidth="2" />
      {/* Right side BCGF */}
      <polygon points="220,145 280,105 280,35 220,75" fill="rgba(59,130,246,0.12)" stroke="#334155" strokeWidth="2" />
      {/* Top side EFGH */}
      <polygon points="80,75 220,75 280,35 140,35" fill="rgba(59,130,246,0.18)" stroke="#334155" strokeWidth="2" />

      {/* Vertex Labels */}
      <text x="70" y="155" fontSize="13" fill="#334155" fontWeight="bold">A</text>
      <text x="225" y="155" fontSize="13" fill="#334155" fontWeight="bold">B</text>
      <text x="290" y="112" fontSize="13" fill="#334155" fontWeight="bold">C</text>
      <text x="135" y="118" fontSize="13" fill="#94a3b8" fontWeight="bold">D</text>
      <text x="70" y="70" fontSize="13" fill="#334155" fontWeight="bold">E</text>
      <text x="225" y="70" fontSize="13" fill="#334155" fontWeight="bold">F</text>
      <text x="288" y="32" fontSize="13" fill="#334155" fontWeight="bold">G</text>
      <text x="135" y="28" fontSize="13" fill="#334155" fontWeight="bold">H</text>

      {/* Dimension Labels */}
      <text x="150" y="162" fontSize="12" fill="#475569" textAnchor="middle">8 cm</text>
      <text x="258" y="135" fontSize="12" fill="#475569">6 cm</text>
      <text x="288" y="75" fontSize="12" fill="#475569">5 cm</text>
    </svg>
  );

  const PyramidSvg = () => (
    <svg viewBox="0 0 380 200" className="w-full max-w-xs mx-auto">
      {/* Hidden base edges (dashed) */}
      <line x1="80" y1="145" x2="135" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="135" y1="95" x2="255" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      {/* Hidden edge SD */}
      <line x1="167" y1="30" x2="135" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Base Center O (167, 120) */}
      {/* Height SO (dashed) */}
      <line x1="167" y1="30" x2="167" y2="120" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4" />
      {/* Segment OM (from center to midpoint M of AB) */}
      <line x1="167" y1="120" x2="140" y2="145" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4" />
      {/* Slant height SM (solid red) */}
      <line x1="167" y1="30" x2="140" y2="145" stroke="#dc2626" strokeWidth="2.5" />

      {/* Right angle at O in triangle SOM */}
      <polyline points="167,112 161,114 161,122" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />

      {/* Right angle at M on base between OM and AB */}
      <polyline points="144,141 149,145 145,145" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />

      {/* Angle theta arc at M(140, 145) between MO and MS */}
      <path d="M 152 134 A 20 20 0 0 0 146.5 117.5" fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x="156" y="125" fontSize="12" fill="#dc2626" fontWeight="bold">θ</text>

      {/* Visible base edges */}
      <line x1="80" y1="145" x2="200" y2="145" stroke="#334155" strokeWidth="2" />
      <line x1="200" y1="145" x2="255" y2="95" stroke="#334155" strokeWidth="2" />

      {/* Slant faces / edges */}
      <line x1="167" y1="30" x2="80" y2="145" stroke="#334155" strokeWidth="2" />
      <line x1="167" y1="30" x2="200" y2="145" stroke="#334155" strokeWidth="2" />
      <line x1="167" y1="30" x2="255" y2="95" stroke="#334155" strokeWidth="2" />

      {/* Points */}
      <circle cx="167" cy="30" r="3.5" fill="#334155" />
      <circle cx="167" cy="120" r="3" fill="#0ea5e9" />
      <circle cx="140" cy="145" r="3.5" fill="#dc2626" />

      {/* Vertex Labels */}
      <text x="167" y="22" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">S</text>
      <text x="68" y="152" fontSize="13" fill="#334155" fontWeight="bold">A</text>
      <text x="205" y="155" fontSize="13" fill="#334155" fontWeight="bold">B</text>
      <text x="262" y="98" fontSize="13" fill="#334155" fontWeight="bold">C</text>
      <text x="122" y="94" fontSize="13" fill="#94a3b8" fontWeight="bold">D</text>
      <text x="175" y="122" fontSize="12" fill="#0ea5e9" fontWeight="bold">O</text>
      <text x="135" y="160" fontSize="13" fill="#dc2626" fontWeight="bold">M</text>

      {/* Dimension labels */}
      <text x="178" y="80" fontSize="12" fill="#0ea5e9">8 cm</text>
      <text x="145" y="137" fontSize="11" fill="#0ea5e9">6 cm</text>
      <text x="130" y="172" fontSize="12" fill="#475569">12 cm</text>
    </svg>
  );

  const TetrahedronSvg = () => (
    <svg viewBox="0 0 380 190" className="w-full max-w-xs mx-auto">
      {/* Hidden base edge AC (dashed) */}
      <line x1="110" y1="120" x2="280" y2="105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* SA vertical (perpendicular to plane ABC) */}
      <line x1="110" y1="30" x2="110" y2="120" stroke="#ef4444" strokeWidth="2.5" />
      {/* Right angle at A between SA and AB */}
      <polyline points="110,108 120,110 120,122" fill="none" stroke="#ef4444" strokeWidth="1.5" />

      {/* Base edge AB */}
      <line x1="110" y1="120" x2="190" y2="145" stroke="#334155" strokeWidth="2" />
      {/* Base edge BC */}
      <line x1="190" y1="145" x2="280" y2="105" stroke="#334155" strokeWidth="2" />

      {/* Right angle at B on base between AB and BC (AB perp BC) */}
      <polyline points="181,142 188,135 197,138" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />

      {/* Slanted edge SB (hypotenuse of SAB) - red */}
      <line x1="110" y1="30" x2="190" y2="145" stroke="#dc2626" strokeWidth="2.5" />
      {/* Slanted edge SC */}
      <line x1="110" y1="30" x2="280" y2="105" stroke="#334155" strokeWidth="2" />

      {/* Right angle at B in space between SB and BC (3-perpendicular conclusion!) */}
      <polyline points="183,135 190,128 197,136" fill="none" stroke="#dc2626" strokeWidth="1.5" />

      {/* Angle theta arc at B between BA and BS */}
      <path d="M 166 137.5 A 25 25 0 0 1 172.5 120" fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x="156" y="125" fontSize="12" fill="#dc2626" fontWeight="bold">θ</text>

      {/* Points */}
      <circle cx="110" cy="30" r="3.5" fill="#334155" />
      <circle cx="110" cy="120" r="3.5" fill="#ef4444" />
      <circle cx="190" cy="145" r="3.5" fill="#dc2626" />
      <circle cx="280" cy="105" r="3.5" fill="#334155" />

      {/* Labels */}
      <text x="110" y="20" fontSize="13" fill="#334155" textAnchor="middle" fontWeight="bold">S</text>
      <text x="95" y="125" fontSize="13" fill="#ef4444" fontWeight="bold">A</text>
      <text x="195" y="160" fontSize="13" fill="#dc2626" fontWeight="bold">B</text>
      <text x="290" y="110" fontSize="13" fill="#334155" fontWeight="bold">C</text>

      {/* Dimension labels */}
      <text x="80" y="75" fontSize="12" fill="#ef4444">12 cm</text>
      <text x="145" y="142" fontSize="12" fill="#475569">5 cm</text>
      <text x="160" y="85" fontSize="12" fill="#dc2626" fontWeight="bold">13 cm</text>
      <text x="245" y="135" fontSize="12" fill="#475569">8 cm</text>

      {/* Tag */}
      <text x="235" y="55" fontSize="11" fill="#dc2626" fontWeight="bold">由三垂線定理：</text>
      <text x="235" y="70" fontSize="11" fill="#dc2626" fontWeight="bold">BC ⊥ SB</text>
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
              <div className="w-full max-w-xs flex-none">
                <AreaSvg2 />
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xl font-bold text-slate-400">→</div>
                <div className="text-xl font-bold text-blue-800">
                  <Latex math="73.5\text{ cm}^2" inline />
                </div>
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
                <Step math="\text{面積} = \sqrt{s(s−a)(s−b)(s−c)}" />
                <Step math="\text{面積} = \sqrt{20(20−11)(20−14)(20−15)} = \sqrt{5400}" />
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
                  <Latex math="c^2 = a^2 + b^2 − 2(a)(b)\cos\theta" inline />
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
                  <Step math="x^2 = 11^2 + 16^2 − 2(11)(16)\cos 114^\circ" explain="11, 16為其餘邊" />
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
                  <Step math="8^2 = 9^2 + 9^2 − 2(9)(9)\cos\theta" explain="9, 9為其餘邊" />
                  <Step math="64 = 162 − 162\cos\theta" explain="按紅線分隔用計算機簡化" />
                  <Step math="−98 = −162\cos\theta" explain="移項至 cosθ = ?" />
                  <Step math="\frac{−98}{−162} = \cos\theta" explain="cos⁻¹θ" />
                  <Step math="\theta = 52.8^\circ" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </CollapsibleSection>

      <CollapsibleSection id="projection" title="3. 正射影" num={3} color="cyan" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <h3 className="font-bold text-cyan-900 mb-2 text-lg">點與線段的正射影</h3>
                <p className="text-slate-700">點 A 在平面 π 上的正射影，是由 A 向 π 作垂線所得的垂足 H，即 <Latex math="AH\perp\pi" inline />。若 B 在 π 上，斜線段 AB 在 π 上的正射影就是 HB。</p>
                <p className="text-slate-700 mt-2">因此 <Latex math="\triangle AHB" inline /> 是直角三角形，斜線 AB、垂直高度 AH 和投影 HB 滿足：</p>
                <div className="bg-white rounded-lg p-3 mt-2 border border-cyan-100">
                  <Latex math="AB^2=AH^2+HB^2" block />
                  <Latex math="\text{投影長 }HB=AB\cos\theta,\quad \text{離平面高度 }AH=AB\sin\theta" block />
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-cyan-100 flex items-center justify-center">
                <ProjectionSvg />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">快速判斷</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><Latex math="AB\perp\pi" inline />：AB 的正射影縮成一點。</li>
              <li><Latex math="AB\parallel\pi" inline />：AB 的正射影與 AB 平行且等長。</li>
              <li>求立體圖形中的投影時，先找垂足；位於平面上的端點投影仍是它本身。</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="line-plane-angle" title="4. 直線與平面角" num={4} color="blue" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <h3 className="font-bold text-blue-900 mb-2 text-lg">定義與公式</h3>
                <p className="text-slate-700">若斜線 AB 與平面 π 相交於 B，而 A 向 π 的垂足是 H，則 AB 在 π 上的正射影是 BH。AB 與 π 的夾角 θ，就是斜線 AB 與其正射影 BH 的較小夾角 <Latex math="\angle ABH" inline />。</p>
                <p className="text-sm text-slate-600 mt-2">若 <Latex math="AB\perp\pi" inline />，正射影縮成一點，線面角直接是 <Latex math="90^\circ" inline />；此時不能使用分母含投影長 BH 的 tan 公式。</p>
                <div className="bg-white rounded-lg p-3 mt-3 border border-blue-100 space-y-1">
                  <Latex math="\sin\theta=\frac{AH}{AB},\qquad \cos\theta=\frac{BH}{AB},\qquad \tan\theta=\frac{AH}{BH}" block />
                  <p className="text-sm text-slate-600">θ 是線面角；<Latex math="AH" inline /> 是垂直高度，<Latex math="BH" inline /> 是投影長，<Latex math="AB" inline /> 是斜線長。</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-100 flex items-center justify-center">
                <LinePlaneAngleSvg />
              </div>
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-2">解題次序</h3>
            <ol className="list-decimal pl-5 space-y-1 text-slate-700">
              <li>確認所求斜線，以及它所在的平面。</li>
              <li>從斜線的平面外端點作垂線，標出垂足。</li>
              <li>找出斜線在平面上的正射影；線面角就是斜線與投影的夾角。</li>
              <li>在由斜線、高度和投影組成的直角三角形中選用 sin、cos 或 tan。</li>
            </ol>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="dihedral-angle" title="5. 兩平面角（二面角）" num={5} color="purple" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <h3 className="font-bold text-purple-900 mb-2 text-lg">怎樣量度兩個平面之間的角？</h3>
                <p className="text-slate-700">兩平面 α、β 相交於直線 ℓ。選 ℓ 上一點 O，在 α、β 內分別作射線 OA、OB，並令 <Latex math="OA\perp\ell" inline />、<Latex math="OB\perp\ell" inline />。在同一側所取的 <Latex math="\angle AOB" inline />，就是該二面角的平面角。</p>
                <div className="bg-white rounded-lg p-3 mt-3 border border-purple-100">
                  <p className="font-bold text-slate-800 mb-1">作平面角的步驟</p>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                    <li>找出兩平面的交線 ℓ。</li>
                    <li>在 ℓ 上選同一個頂點 O。</li>
                    <li>在兩平面內各找一條過 O 且垂直 ℓ 的線。</li>
                    <li>求這兩條線的夾角；不要直接取兩平面上任意兩條線的夾角。</li>
                  </ol>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-100 flex items-center justify-center">
                <DihedralAngleSvg />
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600">立體題若問「側面與底面的夾角」，交線是側面和底面的公共邊；在兩個平面內分別找垂直這條公共邊的線，便能把二面角轉成平面三角形中的角。</p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="three-perpendicular" title="6. 三垂線定理" num={6} color="rose" activeSub={activeSub} sectionRef={s6}>
        <div className="space-y-4">
          <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <h3 className="font-bold text-rose-900 mb-2 text-lg">定理</h3>
                <p className="text-slate-700">設 <Latex math="AH\perp\pi" inline />，H 是 A 在平面 π 上的垂足；B 在 π 上，所以斜線 AB 在 π 上的正射影是 HB。若平面 π 內的直線 ℓ 通過 B，並且 <Latex math="\ell\perp HB" inline />，則 <Latex math="\ell\perp AB" inline />。</p>
                <div className="bg-white rounded-lg p-3 mt-3 border border-rose-100">
                  <Latex math="\ell\subset\pi,\quad \ell\cap HB=B,\quad \ell\perp HB\quad\Longrightarrow\quad \ell\perp AB" block />
                  <p className="text-sm text-slate-600">反過來，若 ℓ 在 π 內、通過 B，且 <Latex math="\ell\perp AB" inline />，也可推出 <Latex math="\ell\perp HB" inline />。</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-rose-100 flex items-center justify-center">
                <ThreePerpendicularSvg />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">套用前檢查</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>ℓ 必須在指定平面 π 內，並在斜線與平面的交點 B 通過。</li>
              <li>先找出斜線的正射影 HB，再證明 <Latex math="\ell\perp HB" inline />；不能只憑立體圖看起來垂直。</li>
              <li>結論是 <Latex math="\ell\perp AB" inline />，可用來建立直角三角形或證明空間兩線垂直。</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="three-dimensional-problems" title="7. 三維立體綜合題" num={7} color="indigo" activeSub={activeSub} sectionRef={s7}>
        <div className="space-y-4">
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="font-bold text-indigo-900 mb-2 text-lg">例 1：長方體內的線面角</h3>
            <p className="text-slate-700">長方體 ABCD-EFGH 中，AB = 8 cm、BC = 6 cm、AE = 5 cm，且 AE 垂直底面 ABCD。求體對角線 AG 與底面 ABCD 的夾角 θ，以及 AG 的長度。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-3">
              <div className="bg-white rounded-lg p-3 border border-indigo-100 flex items-center justify-center">
                <CuboidSvg />
              </div>
              <div className="bg-white rounded-lg p-4 space-y-1 border border-indigo-100">
                <Step math="\text{投影：}\ AG\text{ 在底面上的正射影是 }AC" alignEq={false} />
                <Step math="AC=\sqrt{8^2+6^2}=10\text{ cm}" />
                <Step math="AG=\sqrt{AC^2+CG^2}=\sqrt{10^2+5^2}=5\sqrt{5}\approx11.2\text{ cm}" />
                <Step math="\tan\theta=\frac{CG}{AC}=\frac{5}{10}" />
                <Step math="\theta=\tan^{-1}(0.5)\approx26.6^\circ" />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-900 mb-2 text-lg">例 2：正四角錐的二面角</h3>
            <p className="text-slate-700">正四角錐 S-ABCD 的底面邊長為 12 cm，O 是正方形底面的中心，SO = 8 cm 且 <Latex math="SO\perp ABCD" inline />。求側面 SAB 與底面 ABCD 的夾角 θ。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-3">
              <div className="bg-white rounded-lg p-3 border border-purple-100 flex items-center justify-center">
                <PyramidSvg />
              </div>
              <div className="bg-white rounded-lg p-4 space-y-1 border border-purple-100">
                <Step math="\text{令 }M\text{ 為 }AB\text{ 的中點；交線是 }AB" alignEq={false} />
                <Step math="OM\perp AB,\quad SM\perp AB\quad\Longrightarrow\quad\theta=\angle SMO" alignEq={false} />
                <Step math="OM=\frac{12}{2}=6\text{ cm}" />
                <Step math="\tan\theta=\frac{SO}{OM}=\frac{8}{6}=\frac{4}{3}" />
                <Step math="\theta=\tan^{-1}\!\left(\frac{4}{3}\right)\approx53.1^\circ" />
              </div>
            </div>
          </div>

          <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
            <h3 className="font-bold text-rose-900 mb-2 text-lg">例 3：用三垂線定理證明並求線面角</h3>
            <p className="text-slate-700">在三角錐 S-ABC 中，<Latex math="SA\perp\text{平面 }ABC" inline />、SA = 12 cm、AB = 5 cm、BC = 8 cm，且 <Latex math="AB\perp BC" inline />。求 SB，證明 <Latex math="BC\perp SB" inline />，並求 SB 與平面 ABC 的夾角 θ。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-3">
              <div className="bg-white rounded-lg p-3 border border-rose-100 flex items-center justify-center">
                <TetrahedronSvg />
              </div>
              <div className="bg-white rounded-lg p-4 space-y-1 border border-rose-100">
                <Step math="\text{SB 在底面上的正射影是 }AB" alignEq={false} />
                <Step math="AB\perp BC\quad\Longrightarrow\quad SB\perp BC\quad(\text{三垂線定理})" alignEq={false} />
                <Step math="SB=\sqrt{SA^2+AB^2}=\sqrt{12^2+5^2}=13\text{ cm}" />
                <Step math="\theta=\angle SBA,\quad\tan\theta=\frac{SA}{AB}=\frac{12}{5}" />
                <Step math="\theta=\tan^{-1}\!\left(\frac{12}{5}\right)\approx67.4^\circ" />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-2">三維題通用流程</h3>
            <p className="text-slate-700">先辨認所求角的種類，再找投影或兩平面的交線；把空間關係轉成直角三角形後，標清楚對邊、鄰邊和斜邊，最後才選用三角比。題目要求證明垂直時，檢查能否使用三垂線定理。</p>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
