import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Pen, Eraser, Trash2, Home as HomeIcon, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const AngleArc = ({ cx, cy, r, startAngle, endAngle, label, labelOffset = 15, isHighlighted = false }) => {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  
  let diff = endAngle - startAngle;
  if (diff < 0) diff += 360;
  const largeArcFlag = diff > 180 ? 1 : 0;
  
  const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  const arcPathData = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

  const midAngle = startAngle + diff / 2;
  const midRad = (midAngle * Math.PI) / 180;
  const lx = cx + (r + labelOffset) * Math.cos(midRad);
  const ly = cy + (r + labelOffset) * Math.sin(midRad);

  return (
    <g>
      {isHighlighted && (
        <path d={pathData} fill="rgba(255, 255, 0, 0.5)" stroke="none" />
      )}
      <path d={arcPathData} fill="none" stroke="black" strokeWidth="1.5" />
      {label && (
        <text x={lx} y={ly} fontSize="14" textAnchor="middle" dominantBaseline="middle" fill="black">
          {label}
        </text>
      )}
    </g>
  );
};

const QUESTIONS = {
  'F1': [
    {
      id: 'F1-01',
      difficulty: '淺',
      level: 'F1',
      title: '平行線 (Alternate Angles)',
      text: '圖中，AB // CD，直線 PQ 分別與 AB 和 CD 相交於 M 和 N。已知 ∠AMQ = 65°，求 ∠MND。',
      answer: 65,
      steps: [
        '∠MND = ∠AMQ = 65° (內錯角，AB // CD)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="80" x2="280" y2="80" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="178.6" y1="40" x2="104.1" y2="200" stroke="black" strokeWidth="1.5" />
          
          <circle cx="160" cy="80" r="3" fill="black" />
          <circle cx="122.7" cy="160" r="3" fill="black" />
          
          <text x="30" y="85" fontSize="14">A</text>
          <text x="290" y="85" fontSize="14">B</text>
          <text x="30" y="165" fontSize="14">C</text>
          <text x="290" y="165" fontSize="14">D</text>
          <text x="185" y="35" fontSize="14">P</text>
          <text x="95" y="210" fontSize="14">Q</text>
          <text x="170" y="75" fontSize="14">M</text>
          <text x="105" y="155" fontSize="14">N</text>
          
          <AngleArc cx={160} cy={80} r={20} startAngle={115} endAngle={180} label="65°" labelOffset={15} />
          <AngleArc cx={122.7} cy={160} r={20} startAngle={295} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-02',
      difficulty: '淺',
      level: 'F1',
      title: '直線上的鄰角 (Adj. ∠s on st. line)',
      text: '圖中，AOB 是一條直線。已知 ∠AOC = 108°，求 ∠BOC。',
      answer: 72,
      steps: [
        '∠BOC + ∠AOC = 180° (直線上的鄰角)',
        '∠BOC + 108° = 180°',
        '∠BOC = 72°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="160" x2="197.1" y2="45.9" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="160" r="3" fill="black" />
          <text x="30" y="165" fontSize="14">A</text>
          <text x="155" y="180" fontSize="14">O</text>
          <text x="290" y="165" fontSize="14">B</text>
          <text x="205" y="40" fontSize="14">C</text>
          <AngleArc cx={160} cy={160} r={25} startAngle={180} endAngle={288} label="108°" labelOffset={15} />
          <AngleArc cx={160} cy={160} r={18} startAngle={288} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-03',
      difficulty: '中',
      level: 'F1',
      title: '同頂角 (∠s at a pt.)',
      text: '圖中，已知 ∠AOB = 130° 及 ∠BOC = 140°，求 ∠COA。',
      answer: 90,
      steps: [
        '∠COA + ∠AOB + ∠BOC = 360° (同頂角)',
        '∠COA + 130° + 140° = 360°',
        '∠COA = 90°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="160" y1="110" x2="160" y2="20" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="110" x2="228.9" y2="167.8" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="110" x2="70" y2="110" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="110" r="3" fill="black" />
          <text x="155" y="15" fontSize="14">A</text>
          <text x="240" y="175" fontSize="14">B</text>
          <text x="55" y="115" fontSize="14">C</text>
          <text x="175" y="95" fontSize="14">O</text>
          <AngleArc cx={160} cy={110} r={25} startAngle={270} endAngle={400} label="130°" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={18} startAngle={40} endAngle={180} label="140°" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={20} startAngle={180} endAngle={270} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-04',
      difficulty: '難',
      level: 'F1',
      title: '平行線與直線上的鄰角 (Mixed)',
      text: '圖中，AB // CD，直線 PQ 分別與 AB 和 CD 相交於 M 和 N。已知 ∠AMQ = 65°，求 ∠PND。',
      answer: 115,
      steps: [
        '∠MND = ∠AMQ = 65° (內錯角，AB // CD)',
        '∠PND + ∠MND = 180° (直線上的鄰角)',
        '∠PND + 65° = 180°',
        '∠PND = 115°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="80" x2="280" y2="80" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="178.6" y1="40" x2="104.1" y2="200" stroke="black" strokeWidth="1.5" />
          
          <circle cx="160" cy="80" r="3" fill="black" />
          <circle cx="122.7" cy="160" r="3" fill="black" />
          
          <text x="30" y="85" fontSize="14">A</text>
          <text x="290" y="85" fontSize="14">B</text>
          <text x="30" y="165" fontSize="14">C</text>
          <text x="290" y="165" fontSize="14">D</text>
          <text x="185" y="35" fontSize="14">P</text>
          <text x="95" y="210" fontSize="14">Q</text>
          <text x="170" y="75" fontSize="14">M</text>
          <text x="105" y="155" fontSize="14">N</text>
          
          <AngleArc cx={160} cy={80} r={20} startAngle={115} endAngle={180} label="65°" labelOffset={15} />
          <AngleArc cx={122.7} cy={160} r={20} startAngle={295} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-05',
      difficulty: '淺',
      level: 'F1',
      title: '對頂角 (Vert. opp. ∠s)',
      text: '圖中，直線 AB 和 CD 相交於 O。已知 ∠AOC = 55°，求 ∠BOD。',
      answer: 55,
      steps: [
        '∠BOD = ∠AOC (對頂角)',
        '∠BOD = 55°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="60" y1="60" x2="260" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="60" y1="160" x2="260" y2="60" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="110" r="3" fill="black" />
          <text x="45" y="55" fontSize="14">A</text>
          <text x="270" y="170" fontSize="14">B</text>
          <text x="45" y="170" fontSize="14">C</text>
          <text x="270" y="55" fontSize="14">D</text>
          <text x="160" y="130" fontSize="14" textAnchor="middle">O</text>
          <AngleArc cx={160} cy={110} r={25} startAngle={153} endAngle={207} label="55°" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={25} startAngle={333} endAngle={27} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-06',
      difficulty: '淺',
      level: 'F1',
      title: '同位角 (Corr. ∠s)',
      text: '圖中，AB // CD，直線 PQ 分別與 AB 和 CD 相交於 M 和 N。已知 ∠AMP = 120°，求 ∠CNP。',
      answer: 120,
      steps: [
        '∠CNP = ∠AMP = 120° (同位角，AB // CD)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="80" x2="280" y2="80" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="120" y1="30" x2="200" y2="200" stroke="black" strokeWidth="1.5" />
          <circle cx="143.5" cy="80" r="3" fill="black" />
          <circle cx="181.2" cy="160" r="3" fill="black" />
          <text x="30" y="85" fontSize="14">A</text>
          <text x="290" y="85" fontSize="14">B</text>
          <text x="30" y="165" fontSize="14">C</text>
          <text x="290" y="165" fontSize="14">D</text>
          <text x="110" y="25" fontSize="14">P</text>
          <text x="210" y="210" fontSize="14">Q</text>
          <text x="155" y="75" fontSize="14">M</text>
          <text x="195" y="155" fontSize="14">N</text>
          <AngleArc cx={143.5} cy={80} r={20} startAngle={180} endAngle={245} label="120°" labelOffset={15} />
          <AngleArc cx={181.2} cy={160} r={20} startAngle={180} endAngle={245} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-07',
      difficulty: '淺',
      level: 'F1',
      title: '同旁內角 (Int. ∠s)',
      text: '圖中，AB // CD，直線 PQ 分別與 AB 和 CD 相交於 M 和 N。已知 ∠BMN = 75°，求 ∠MND。',
      answer: 105,
      steps: [
        '∠MND + ∠BMN = 180° (同旁內角，AB // CD)',
        '∠MND + 75° = 180°',
        '∠MND = 105°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="80" x2="280" y2="80" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="40" x2="220" y2="200" stroke="black" strokeWidth="1.5" />
          <circle cx="130" cy="80" r="3" fill="black" />
          <circle cx="190" cy="160" r="3" fill="black" />
          <text x="30" y="85" fontSize="14">A</text>
          <text x="290" y="85" fontSize="14">B</text>
          <text x="30" y="165" fontSize="14">C</text>
          <text x="290" y="165" fontSize="14">D</text>
          <text x="90" y="35" fontSize="14">P</text>
          <text x="230" y="210" fontSize="14">Q</text>
          <text x="110" y="65" fontSize="14">M</text>
          <text x="215" y="185" fontSize="14">N</text>
          <AngleArc cx={130} cy={80} r={20} startAngle={0} endAngle={53} label="75°" labelOffset={15} />
          <AngleArc cx={190} cy={160} r={20} startAngle={233} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-08',
      difficulty: '中',
      level: 'F1',
      title: '直線上的鄰角與對頂角',
      text: '圖中，直線 AB 和 CD 相交於 O。已知 ∠AOC = 2x 及 ∠BOC = 3x，求 ∠AOD。',
      answer: 108,
      steps: [
        '2x + 3x = 180° (直線上的鄰角)',
        '5x = 180°',
        'x = 36°',
        '∠AOD = ∠BOC (對頂角)',
        '∠AOD = 3(36°) = 108°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="110" x2="280" y2="110" stroke="black" strokeWidth="1.5" />
          <line x1="130" y1="202" x2="190" y2="18" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="110" r="3" fill="black" />
          <text x="30" y="115" fontSize="14">A</text>
          <text x="290" y="115" fontSize="14">B</text>
          <text x="120" y="215" fontSize="14">C</text>
          <text x="200" y="15" fontSize="14">D</text>
          <text x="165" y="130" fontSize="14">O</text>
          <AngleArc cx={160} cy={110} r={20} startAngle={108} endAngle={180} label="2x" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={25} startAngle={0} endAngle={108} label="3x" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={30} startAngle={180} endAngle={288} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-09',
      difficulty: '中',
      level: 'F1',
      title: '同頂角 (∠s at a pt.)',
      text: '圖中，已知 ∠AOB = x，∠BOC = 2x，∠COD = 3x，∠DOA = 4x。求 x。',
      answer: 36,
      steps: [
        'x + 2x + 3x + 4x = 360° (同頂角)',
        '10x = 360°',
        'x = 36°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="160" y1="110" x2="240" y2="110" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="110" x2="224" y2="63" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="110" x2="135" y2="34" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="110" x2="95" y2="157" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="110" r="3" fill="black" />
          <text x="250" y="115" fontSize="14">A</text>
          <text x="235" y="60" fontSize="14">B</text>
          <text x="125" y="30" fontSize="14">C</text>
          <text x="85" y="165" fontSize="14">D</text>
          <text x="165" y="130" fontSize="14">O</text>
          <AngleArc cx={160} cy={110} r={20} startAngle={324} endAngle={360} label="x" labelOffset={15} isHighlighted={showHint} />
          <AngleArc cx={160} cy={110} r={25} startAngle={252} endAngle={324} label="2x" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={30} startAngle={144} endAngle={252} label="3x" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={35} startAngle={0} endAngle={144} label="4x" labelOffset={15} />
        </svg>
      )
    },
    {
      id: 'F1-10',
      difficulty: '中',
      level: 'F1',
      title: '平行線 (Mixed)',
      text: '圖中，AB // CD，直線 PQ 分別與 AB 和 CD 相交於 M 和 N。已知 ∠AMP = 100°，求 ∠DNQ。',
      answer: 100,
      steps: [
        '∠BMQ = ∠AMP = 100° (對頂角)',
        '∠DNQ = ∠BMQ = 100° (同位角，AB // CD)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="80" x2="280" y2="80" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="120" y1="30" x2="200" y2="200" stroke="black" strokeWidth="1.5" />
          <circle cx="143.5" cy="80" r="3" fill="black" />
          <circle cx="181.2" cy="160" r="3" fill="black" />
          <text x="30" y="85" fontSize="14">A</text>
          <text x="290" y="85" fontSize="14">B</text>
          <text x="30" y="165" fontSize="14">C</text>
          <text x="290" y="165" fontSize="14">D</text>
          <text x="110" y="25" fontSize="14">P</text>
          <text x="210" y="210" fontSize="14">Q</text>
          <text x="155" y="75" fontSize="14">M</text>
          <text x="195" y="155" fontSize="14">N</text>
          <AngleArc cx={143.5} cy={80} r={20} startAngle={180} endAngle={245} label="100°" labelOffset={15} />
          <AngleArc cx={181.2} cy={160} r={20} startAngle={0} endAngle={65} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-11',
      difficulty: '淺',
      level: 'F1',
      title: '平行線 (Mixed)',
      text: '圖中，AB // CD，直線 PQ 分別與 AB 和 CD 相交於 M 和 N。已知 ∠BMQ = 115°，求 ∠MNC。',
      answer: 115,
      steps: [
        '∠MNC = ∠BMQ = 115° (內錯角，AB // CD)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="80" x2="280" y2="80" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="180" y1="30" x2="100" y2="200" stroke="black" strokeWidth="1.5" />
          <circle cx="156.5" cy="80" r="3" fill="black" />
          <circle cx="118.8" cy="160" r="3" fill="black" />
          <text x="30" y="85" fontSize="14">A</text>
          <text x="290" y="85" fontSize="14">B</text>
          <text x="30" y="165" fontSize="14">C</text>
          <text x="290" y="165" fontSize="14">D</text>
          <text x="190" y="25" fontSize="14">P</text>
          <text x="90" y="210" fontSize="14">Q</text>
          <text x="175" y="65" fontSize="14">M</text>
          <text x="90" y="185" fontSize="14">N</text>
          <AngleArc cx={156.5} cy={80} r={20} startAngle={0} endAngle={115} label="115°" labelOffset={15} />
          <AngleArc cx={118.8} cy={160} r={20} startAngle={180} endAngle={295} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-12',
      difficulty: '難',
      level: 'F1',
      title: '平行線 (Algebra)',
      text: '圖中，AB // CD，直線 PQ 分別與 AB 和 CD 相交於 M 和 N。已知 ∠AMN = 54° 及 ∠MND = 3x，求 x。',
      answer: 42,
      steps: [
        '∠AMN + ∠MND = 180° (同旁內角，AB // CD)',
        '54° + 3x = 180°',
        '3x = 126°',
        'x = 42°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="80" x2="280" y2="80" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="30" x2="200" y2="200" stroke="black" strokeWidth="1.5" />
          <circle cx="129.4" cy="80" r="3" fill="black" />
          <circle cx="176.5" cy="160" r="3" fill="black" />
          <text x="30" y="85" fontSize="14">A</text>
          <text x="290" y="85" fontSize="14">B</text>
          <text x="30" y="165" fontSize="14">C</text>
          <text x="290" y="165" fontSize="14">D</text>
          <text x="90" y="25" fontSize="14">P</text>
          <text x="210" y="210" fontSize="14">Q</text>
          <text x="140" y="70" fontSize="14">M</text>
          <text x="190" y="175" fontSize="14">N</text>
          <AngleArc cx={129.4} cy={80} r={20} startAngle={60} endAngle={180} label="54°" labelOffset={15} />
          <AngleArc cx={176.5} cy={160} r={20} startAngle={240} endAngle={360} label="3x" labelOffset={15} />
        </svg>
      )
    },
    {
      id: 'F1-13',
      difficulty: '難',
      level: 'F1',
      title: '平行線 (輔助線)',
      text: '圖中，AB // EF。已知 ∠ABC = 45° 及 ∠CEF = 35°，求 ∠BCE。',
      answer: 80,
      steps: [
        '過 C 作直線 PQ // AB // EF。',
        '∠BCQ = ∠ABC = 45° (內錯角，AB // PQ)',
        '∠ECQ = ∠CEF = 35° (內錯角，PQ // EF)',
        '∠BCE = ∠BCQ + ∠ECQ = 45° + 35° = 80°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="50" x2="240" y2="50" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="170" x2="240" y2="170" stroke="black" strokeWidth="1.5" />
          <line x1="200" y1="50" x2="140" y2="110" stroke="black" strokeWidth="1.5" />
          <line x1="200" y1="170" x2="140" y2="110" stroke="black" strokeWidth="1.5" />
          <circle cx="200" cy="50" r="3" fill="black" />
          <circle cx="140" cy="110" r="3" fill="black" />
          <circle cx="200" cy="170" r="3" fill="black" />
          <text x="30" y="55" fontSize="14">A</text>
          <text x="210" y="40" fontSize="14">B</text>
          <text x="125" y="115" fontSize="14">C</text>
          <text x="210" y="190" fontSize="14">E</text>
          <text x="30" y="175" fontSize="14">F</text>
          <AngleArc cx={200} cy={50} r={25} startAngle={135} endAngle={180} label="45°" labelOffset={15} />
          <AngleArc cx={200} cy={170} r={25} startAngle={180} endAngle={225} label="35°" labelOffset={15} />
          <AngleArc cx={140} cy={110} r={20} startAngle={315} endAngle={405} label="" labelOffset={15} isHighlighted={showHint} />
          {showHint && <line x1="60" y1="110" x2="260" y2="110" stroke="red" strokeWidth="1.5" strokeDasharray="5,5" />}
        </svg>
      )
    },
    {
      id: 'F1-14',
      difficulty: '淺',
      level: 'F1',
      title: '三角形內角和 (∠ sum of △)',
      text: '圖中，△ABC 是一個三角形。已知 ∠A = 65° 及 ∠B = 50°，求 ∠C。',
      answer: 65,
      steps: [
        '∠A + ∠B + ∠C = 180° (△內角和)',
        '65° + 50° + ∠C = 180°',
        '∠C = 65°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,40 80,160 240,160" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="40" r="3" fill="black" />
          <circle cx="80" cy="160" r="3" fill="black" />
          <circle cx="240" cy="160" r="3" fill="black" />
          <text x="155" y="30" fontSize="14">A</text>
          <text x="65" y="175" fontSize="14">B</text>
          <text x="245" y="175" fontSize="14">C</text>
          <AngleArc cx={160} cy={40} r={25} startAngle={56} endAngle={124} label="65°" labelOffset={15} />
          <AngleArc cx={80} cy={160} r={25} startAngle={304} endAngle={360} label="50°" labelOffset={15} />
          <AngleArc cx={240} cy={160} r={25} startAngle={180} endAngle={236} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-22',
      difficulty: '中',
      level: 'F1',
      title: '平行線與三角形 (Mixed)',
      text: '圖中，AB // CD。已知 ∠EAB = 40° 及 ∠ECD = 50°，求 ∠AEC。',
      answer: 90,
      steps: [
        '過 E 作直線 PQ // AB // CD。',
        '∠AEQ = ∠EAB = 40° (內錯角，AB // PQ)',
        '∠CEQ = ∠ECD = 50° (內錯角，PQ // CD)',
        '∠AEC = ∠AEQ + ∠CEQ = 40° + 50° = 90°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="50" x2="240" y2="50" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="170" x2="240" y2="170" stroke="black" strokeWidth="1.5" />
          <polygon points="135,45 145,50 135,55" fill="black" />
          <polygon points="135,165 145,170 135,175" fill="black" />
          <line x1="100" y1="50" x2="160" y2="110" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="170" x2="160" y2="110" stroke="black" strokeWidth="1.5" />
          <circle cx="100" cy="50" r="3" fill="black" />
          <circle cx="160" cy="110" r="3" fill="black" />
          <circle cx="100" cy="170" r="3" fill="black" />
          <text x="90" y="40" fontSize="14">A</text>
          <text x="250" y="55" fontSize="14">B</text>
          <text x="90" y="190" fontSize="14">C</text>
          <text x="250" y="175" fontSize="14">D</text>
          <text x="175" y="115" fontSize="14">E</text>
          <AngleArc cx={100} cy={50} r={25} startAngle={0} endAngle={45} label="40°" labelOffset={15} />
          <AngleArc cx={100} cy={170} r={25} startAngle={315} endAngle={360} label="50°" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={20} startAngle={135} endAngle={225} label="" labelOffset={15} isHighlighted={showHint} />
          {showHint && <line x1="60" y1="110" x2="260" y2="110" stroke="red" strokeWidth="1.5" strokeDasharray="5,5" />}
        </svg>
      )
    },
    {
      id: 'F1-23',
      difficulty: '淺',
      level: 'F1',
      title: '相交線 (Intersecting lines)',
      text: '圖中，AD、BE 與 CF 相交於 O。求 x。',
      answer: 100,
      steps: [
        '∠EOF = ∠BOC = 45° (對頂角)',
        '∠AOF + ∠EOF + ∠EOD = 180° (直線上的鄰角)',
        '55° + 45° + x - 20° = 180°',
        'x + 80° = 180°',
        'x = 100°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="83.4" y1="45.7" x2="236.6" y2="174.3" stroke="black" strokeWidth="1.5" />
          <line x1="210" y1="23.4" x2="110" y2="196.6" stroke="black" strokeWidth="1.5" />
          <line x1="256.6" y1="84.1" x2="63.4" y2="135.9" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="110" r="3" fill="black" />
          <text x="75" y="40" fontSize="14">A</text>
          <text x="215" y="20" fontSize="14">B</text>
          <text x="265" y="85" fontSize="14">C</text>
          <text x="245" y="185" fontSize="14">D</text>
          <text x="95" y="205" fontSize="14">E</text>
          <text x="45" y="145" fontSize="14">F</text>
          <text x="165" y="100" fontSize="14">O</text>
          <AngleArc cx={160} cy={110} r={25} startAngle={165} endAngle={220} label="55°" labelOffset={20} />
          <AngleArc cx={160} cy={110} r={25} startAngle={300} endAngle={345} label="45°" labelOffset={20} />
          <AngleArc cx={160} cy={110} r={25} startAngle={40} endAngle={120} label="x - 20°" labelOffset={25} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F1-24',
      difficulty: '中',
      level: 'F1',
      title: '平行線與三角形 (Mixed)',
      text: '圖中，ED // BF。求 f。',
      answer: 12,
      steps: [
        '∠ABC = ∠EGB = 4f (內錯角，ED // BF)',
        '在 △ABC 中，',
        '4f + 5f + 6f = 180° (△ 內角和)',
        '15f = 180°',
        'f = 12°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="80" x2="300" y2="80" stroke="black" strokeWidth="1.5" />
          <line x1="20" y1="160" x2="300" y2="160" stroke="black" strokeWidth="1.5" />
          <polygon points="180,75 190,80 180,85" fill="black" />
          <polygon points="180,155 190,160 180,165" fill="black" />
          <line x1="148" y1="40" x2="40" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="148" y1="40" x2="217.3" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="217.3" y1="160" x2="289.3" y2="80" stroke="black" strokeWidth="1.5" />
          <text x="145" y="30" fontSize="14">A</text>
          <text x="25" y="175" fontSize="14">B</text>
          <text x="210" y="180" fontSize="14">C</text>
          <text x="295" y="75" fontSize="14">D</text>
          <text x="40" y="75" fontSize="14">E</text>
          <text x="295" y="175" fontSize="14">F</text>
          <text x="105" y="70" fontSize="14">G</text>
          <text x="175" y="70" fontSize="14">H</text>
          <AngleArc cx={112} cy={80} r={20} startAngle={132} endAngle={180} label="4f" labelOffset={20} />
          <AngleArc cx={148} cy={40} r={25} startAngle={60} endAngle={132} label="6f" labelOffset={20} />
          <AngleArc cx={217.3} cy={160} r={20} startAngle={180} endAngle={240} label="5f" labelOffset={20} />
          <AngleArc cx={217.3} cy={160} r={25} startAngle={312} endAngle={360} label="48°" labelOffset={20} />
        </svg>
      )
    }
  ],
  'F2': [
    {
      id: 'F2-01',
      difficulty: '淺',
      level: 'F2',
      title: '三角形外角 (Exterior Angle of Triangle)',
      text: '圖中，△ABC 的邊 BC 延長至 D。已知 ∠BAC = 48° 及 ∠ABC = 65°，求 ∠ACD。',
      answer: 113,
      steps: [
        '∠ACD = ∠BAC + ∠ABC (△外角)',
        '∠ACD = 48° + 65°',
        '∠ACD = 113°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="80" y1="175" x2="280" y2="175" stroke="black" strokeWidth="1.5" />
          <line x1="80" y1="175" x2="143" y2="40" stroke="black" strokeWidth="1.5" />
          <line x1="143" y1="40" x2="200" y2="175" stroke="black" strokeWidth="1.5" />
          
          <circle cx="143" cy="40" r="3" fill="black" />
          <circle cx="80" cy="175" r="3" fill="black" />
          <circle cx="200" cy="175" r="3" fill="black" />
          
          <text x="143" y="30" fontSize="14" textAnchor="middle">A</text>
          <text x="70" y="190" fontSize="14">B</text>
          <text x="195" y="195" fontSize="14">C</text>
          <text x="285" y="190" fontSize="14">D</text>
          
          <AngleArc cx={143} cy={40} r={25} startAngle={67} endAngle={115} label="48°" labelOffset={12} />
          <AngleArc cx={80} cy={175} r={20} startAngle={295} endAngle={360} label="65°" labelOffset={15} />
          <AngleArc cx={200} cy={175} r={20} startAngle={247} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-02',
      difficulty: '中',
      level: 'F2',
      title: '多邊形內角和 (∠ sum of polygon)',
      text: '圖中為一個正五邊形 ABCDE。求 ∠ABC。',
      answer: 108,
      steps: [
        '五邊形內角和 = (5 - 2) × 180° = 540° (多邊形內角和)',
        '∠ABC = 540° ÷ 5 = 108°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,40 236.1,95.3 207.0,184.7 113.0,184.7 83.9,95.3" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="155" y="30" fontSize="14">A</text>
          <text x="245" y="95" fontSize="14">B</text>
          <text x="215" y="200" fontSize="14">C</text>
          <text x="100" y="200" fontSize="14">D</text>
          <text x="65" y="95" fontSize="14">E</text>
          <AngleArc cx={236.1} cy={95.3} r={20} startAngle={108} endAngle={216} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-03',
      difficulty: '中',
      level: 'F2',
      title: '等腰三角形 (Isosceles Triangle)',
      text: '圖中，△ABC 為等腰三角形，AB = AC。已知 ∠BAC = 40°，求 ∠ABC。',
      answer: 70,
      steps: [
        '∠ABC = ∠ACB (等腰△底角)',
        '∠ABC + ∠ACB + 40° = 180° (△內角和)',
        '2∠ABC = 140°',
        '∠ABC = 70°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,40 100,180 220,180" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="155" y="30" fontSize="14">A</text>
          <text x="85" y="190" fontSize="14">B</text>
          <text x="230" y="190" fontSize="14">C</text>
          <line x1="125.4" y1="108" x2="134.6" y2="112" stroke="black" strokeWidth="1.5" />
          <line x1="194.6" y1="108" x2="185.4" y2="112" stroke="black" strokeWidth="1.5" />
          <AngleArc cx={160} cy={40} r={25} startAngle={66.8} endAngle={113.2} label="40°" labelOffset={15} />
          <AngleArc cx={100} cy={180} r={20} startAngle={293.2} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-04',
      difficulty: '難',
      level: 'F2',
      title: '等腰三角形與外角 (Mixed)',
      text: '圖中，△ABC 為等腰三角形，AB = AC。邊 BC 延長至 D。已知 ∠ACD = 110°，求 ∠BAC。',
      answer: 40,
      steps: [
        '∠ACB + ∠ACD = 180° (直線上的鄰角)',
        '∠ACB = 180° - 110° = 70°',
        '∠ABC = ∠ACB = 70° (等腰△底角)',
        '∠BAC + ∠ABC + ∠ACB = 180° (△內角和)',
        '∠BAC + 70° + 70° = 180°',
        '∠BAC = 40°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="80" y1="180" x2="280" y2="180" stroke="black" strokeWidth="1.5" />
          <line x1="80" y1="180" x2="140" y2="40" stroke="black" strokeWidth="1.5" />
          <line x1="140" y1="40" x2="200" y2="180" stroke="black" strokeWidth="1.5" />
          
          <circle cx="140" cy="40" r="3" fill="black" />
          <circle cx="80" cy="180" r="3" fill="black" />
          <circle cx="200" cy="180" r="3" fill="black" />
          
          <text x="140" y="30" fontSize="14" textAnchor="middle">A</text>
          <text x="70" y="195" fontSize="14">B</text>
          <text x="195" y="200" fontSize="14">C</text>
          <text x="285" y="195" fontSize="14">D</text>
          
          <line x1="105.4" y1="108" x2="114.6" y2="112" stroke="black" strokeWidth="1.5" />
          <line x1="174.6" y1="108" x2="165.4" y2="112" stroke="black" strokeWidth="1.5" />
          
          <AngleArc cx={200} cy={180} r={20} startAngle={246.8} endAngle={360} label="110°" labelOffset={15} />
          <AngleArc cx={140} cy={40} r={25} startAngle={66.8} endAngle={113.2} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-05',
      difficulty: '淺',
      level: 'F2',
      title: '畢氏定理 (Pythagoras\' Theorem)',
      text: '圖中，△ABC 為直角三角形，∠C = 90°。已知 AC = 3 及 BC = 4，求 AB。',
      answer: 5,
      steps: [
        'AB² = AC² + BC² (畢氏定理)',
        'AB² = 3² + 4²',
        'AB² = 9 + 16 = 25',
        'AB = 5'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="100,40 100,160 220,160" fill="none" stroke="black" strokeWidth="1.5" />
          <polyline points="100,150 110,150 110,160" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="90" y="30" fontSize="14">A</text>
          <text x="230" y="170" fontSize="14">B</text>
          <text x="85" y="170" fontSize="14">C</text>
          <text x="80" y="105" fontSize="14">3</text>
          <text x="160" y="180" fontSize="14">4</text>
          {showHint && <line x1="100" y1="40" x2="220" y2="160" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    },
    {
      id: 'F2-06',
      difficulty: '中',
      level: 'F2',
      title: '畢氏定理 (Pythagoras\' Theorem)',
      text: '圖中，△ABC 為直角三角形，∠C = 90°。已知 AB = 13 及 BC = 12，求 AC。',
      answer: 5,
      steps: [
        'AC² + BC² = AB² (畢氏定理)',
        'AC² + 12² = 13²',
        'AC² + 144 = 169',
        'AC² = 25',
        'AC = 5'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="100,40 100,160 220,160" fill="none" stroke="black" strokeWidth="1.5" />
          <polyline points="100,150 110,150 110,160" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="90" y="30" fontSize="14">A</text>
          <text x="230" y="170" fontSize="14">B</text>
          <text x="85" y="170" fontSize="14">C</text>
          <text x="165" y="95" fontSize="14">13</text>
          <text x="160" y="180" fontSize="14">12</text>
          {showHint && <line x1="100" y1="40" x2="100" y2="160" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    },
    {
      id: 'F2-07',
      difficulty: '難',
      level: 'F2',
      title: '畢氏定理逆定理 (Converse of Pyth. Thm.)',
      text: '圖中，△ABC 的邊長分別為 7, 24 和 25。求最大角的度數。',
      answer: 90,
      steps: [
        '7² + 24² = 49 + 576 = 625',
        '25² = 625',
        '∵ 7² + 24² = 25²',
        '∴ △ABC 是一個直角三角形 (畢氏定理的逆定理)',
        '最大角 = 90°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="80,160 240,160 240,40" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="65" y="170" fontSize="14">A</text>
          <text x="250" y="170" fontSize="14">C</text>
          <text x="250" y="35" fontSize="14">B</text>
          <text x="160" y="180" fontSize="14">24</text>
          <text x="260" y="105" fontSize="14">7</text>
          <text x="145" y="90" fontSize="14">25</text>
          {showHint && <polyline points="230,160 230,150 240,150" fill="none" stroke="rgba(255, 0, 0, 0.5)" strokeWidth="3" />}
        </svg>
      )
    },
    {
      id: 'F2-08',
      difficulty: '淺',
      level: 'F2',
      title: '多邊形內角和 (∠ sum of polygon)',
      text: '圖中，ABCD 為四邊形。求 x。',
      answer: 125,
      steps: [
        'x + 75° + 95° + 65° = (4 - 2) × 180° (多邊形內角和)',
        'x + 235° = 360°',
        'x = 125°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="80,60 260,60 200,180 100,150" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="65" y="55" fontSize="14">A</text>
          <text x="265" y="55" fontSize="14">D</text>
          <text x="205" y="195" fontSize="14">C</text>
          <text x="80" y="165" fontSize="14">B</text>
          <AngleArc cx={80} cy={60} r={20} startAngle={0} endAngle={77.5} label="75°" labelOffset={20} />
          <AngleArc cx={260} cy={60} r={20} startAngle={116.6} endAngle={180} label="65°" labelOffset={20} />
          <AngleArc cx={200} cy={180} r={20} startAngle={196.7} endAngle={296.6} label="95°" labelOffset={20} />
          <AngleArc cx={100} cy={150} r={20} startAngle={257.5} endAngle={16.7} label="x" labelOffset={20} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-09',
      difficulty: '淺',
      level: 'F2',
      title: '多邊形外角和 (Sum of ext. ∠s of polygon)',
      text: '圖中，ABCDE 為五邊形。求 x。',
      answer: 80,
      steps: [
        'x + 75° + 40° + 105° + 60° = 360° (多邊形外角和)',
        'x + 280° = 360°',
        'x = 80°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="176" y1="63" x2="40" y2="126" stroke="black" strokeWidth="1.5" />
          <line x1="85" y1="105" x2="108" y2="189" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="160" x2="220" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="180" y1="160" x2="272" y2="83" stroke="black" strokeWidth="1.5" />
          <line x1="241" y1="109" x2="144" y2="40" stroke="black" strokeWidth="1.5" />
          <text x="70" y="105" fontSize="14">A</text>
          <text x="80" y="165" fontSize="14">B</text>
          <text x="175" y="175" fontSize="14">C</text>
          <text x="245" y="125" fontSize="14">D</text>
          <text x="170" y="50" fontSize="14">E</text>
          <AngleArc cx={85} cy={105} r={20} startAngle={74.7} endAngle={155.1} label="x" labelOffset={20} isHighlighted={showHint} />
          <AngleArc cx={100} cy={160} r={20} startAngle={0} endAngle={74.7} label="75°" labelOffset={20} />
          <AngleArc cx={180} cy={160} r={20} startAngle={320.1} endAngle={360} label="40°" labelOffset={20} />
          <AngleArc cx={241} cy={109} r={20} startAngle={215.3} endAngle={320.1} label="105°" labelOffset={20} />
          <AngleArc cx={176} cy={63} r={20} startAngle={155.1} endAngle={215.3} label="60°" labelOffset={20} />
        </svg>
      )
    },
    {
      id: 'F2-10',
      difficulty: '中',
      level: 'F2',
      title: '多邊形內角和 (Algebra)',
      text: '圖中，ABCDE 為五邊形。求 x。',
      answer: 45,
      steps: [
        '3x + 90° + 3x + 3x + x = (5 - 2) × 180° (多邊形內角和)',
        '10x + 90° = 540°',
        '10x = 450°',
        'x = 45°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="120,80 80,140 140,180 200,180 280,120" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="110" y="70" fontSize="14">A</text>
          <text x="65" y="145" fontSize="14">B</text>
          <text x="135" y="200" fontSize="14">C</text>
          <text x="200" y="200" fontSize="14">D</text>
          <text x="290" y="125" fontSize="14">E</text>
          <AngleArc cx={120} cy={80} r={20} startAngle={14.0} endAngle={123.7} label="3x" labelOffset={20} />
          <polyline points="92.5,148.3 100.8,135.8 88.3,127.5" fill="none" stroke="black" strokeWidth="1.5" />
          <AngleArc cx={140} cy={180} r={20} startAngle={213.7} endAngle={360} label="3x" labelOffset={20} />
          <AngleArc cx={200} cy={180} r={20} startAngle={180} endAngle={323.1} label="3x" labelOffset={20} />
          <AngleArc cx={280} cy={120} r={20} startAngle={143.1} endAngle={194.0} label="x" labelOffset={25} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-11',
      difficulty: '難',
      level: 'F2',
      title: '多邊形內角與外角 (Mixed)',
      text: '一個正多邊形的內角是外角的 3 倍，求該多邊形的邊數。',
      answer: 8,
      steps: [
        '設外角為 x，則內角為 3x。',
        'x + 3x = 180° (直線上的鄰角)',
        '4x = 180°',
        'x = 45°',
        '邊數 n = 360° ÷ 45° = 8'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,30 225,57 252,122 225,187 160,214 95,187 68,122 95,57" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="160" y="122" fontSize="16" textAnchor="middle">正多邊形</text>
          <text x="160" y="142" fontSize="14" textAnchor="middle">內角 = 3 × 外角</text>
        </svg>
      )
    },
    {
      id: 'F2-16',
      difficulty: '淺',
      level: 'F2',
      title: '畢氏定理 (Pythagoras\' Theorem)',
      text: '圖中，△ABC 為直角三角形，∠C = 90°。已知 AC = 6 及 BC = 8，求 AB。',
      answer: 10,
      steps: [
        'AB² = AC² + BC² (畢氏定理)',
        'AB² = 6² + 8²',
        'AB² = 36 + 64 = 100',
        'AB = 10'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="100,40 100,160 220,160" fill="none" stroke="black" strokeWidth="1.5" />
          <polyline points="100,150 110,150 110,160" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="90" y="30" fontSize="14">A</text>
          <text x="230" y="170" fontSize="14">B</text>
          <text x="85" y="170" fontSize="14">C</text>
          <text x="80" y="105" fontSize="14">6</text>
          <text x="160" y="180" fontSize="14">8</text>
          {showHint && <line x1="100" y1="40" x2="220" y2="160" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    },
    {
      id: 'F2-17',
      difficulty: '中',
      level: 'F2',
      title: '畢氏定理 (Pythagoras\' Theorem)',
      text: '圖中，△ABC 為直角三角形，∠C = 90°。已知 AB = 17 及 BC = 15，求 AC。',
      answer: 8,
      steps: [
        'AC² + BC² = AB² (畢氏定理)',
        'AC² + 15² = 17²',
        'AC² + 225 = 289',
        'AC² = 64',
        'AC = 8'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="100,40 100,160 220,160" fill="none" stroke="black" strokeWidth="1.5" />
          <polyline points="100,150 110,150 110,160" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="90" y="30" fontSize="14">A</text>
          <text x="230" y="170" fontSize="14">B</text>
          <text x="85" y="170" fontSize="14">C</text>
          <text x="165" y="95" fontSize="14">17</text>
          <text x="160" y="180" fontSize="14">15</text>
          {showHint && <line x1="100" y1="40" x2="100" y2="160" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    },
    {
      id: 'F2-18',
      difficulty: '難',
      level: 'F2',
      title: '畢氏定理逆定理 (Converse of Pyth. Thm.)',
      text: '圖中，△ABC 的邊長分別為 9, 40 和 41。求最大角的度數。',
      answer: 90,
      steps: [
        '9² + 40² = 81 + 1600 = 1681',
        '41² = 1681',
        '∵ 9² + 40² = 41²',
        '∴ △ABC 是一個直角三角形 (畢氏定理的逆定理)',
        '最大角 = 90°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="80,160 240,160 240,40" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="65" y="170" fontSize="14">A</text>
          <text x="250" y="170" fontSize="14">C</text>
          <text x="250" y="35" fontSize="14">B</text>
          <text x="160" y="180" fontSize="14">40</text>
          <text x="260" y="105" fontSize="14">9</text>
          <text x="145" y="90" fontSize="14">41</text>
          {showHint && <polyline points="230,160 230,150 240,150" fill="none" stroke="rgba(255, 0, 0, 0.5)" strokeWidth="3" />}
        </svg>
      )
    },
    {
      id: 'F2-19',
      difficulty: '淺',
      level: 'F2',
      title: '多邊形內角和 (∠ sum of polygon)',
      text: '求一個正十邊形的內角。',
      answer: 144,
      steps: [
        '內角和 = (n - 2) × 180°',
        '內角和 = (10 - 2) × 180° = 1440°',
        '每個內角 = 1440° ÷ 10 = 144°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,30 200,43 230,73 243,113 230,153 200,183 160,196 120,183 90,153 77,113 90,73 120,43" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="120" cy="183" r="3" fill="black" />
          <AngleArc cx={120} cy={183} r={20} startAngle={288} endAngle={72} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-20',
      difficulty: '中',
      level: 'F2',
      title: '平行線與多邊形外角 (Parallel lines & ext. ∠s)',
      text: '圖中，ABCDE 為五邊形，且 AE // CD。求 x + y。',
      answer: 165,
      steps: [
        'AE // CD',
        'x = 105° (平行線性質)',
        '多邊形外角和 = 360°',
        '35° + 85° + y + x + (180° - 105°) = 360°',
        '120° + y + 105° + 75° = 360°',
        'y + 300° = 360°',
        'y = 60°',
        'x + y = 105° + 60° = 165°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="60" y1="60" x2="260" y2="60" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="157" x2="280" y2="157" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="60" x2="14.5" y2="120" stroke="black" strokeWidth="1.5" />
          <line x1="43" y1="100" x2="91" y2="185.5" stroke="black" strokeWidth="1.5" />
          <line x1="246" y1="157" x2="220" y2="60" stroke="black" strokeWidth="1.5" />
          <polygon points="160,55 170,60 160,65" fill="black" />
          <polygon points="160,152 170,157 160,162" fill="black" />
          <text x="100" y="50" fontSize="14">A</text>
          <text x="25" y="100" fontSize="14">B</text>
          <text x="55" y="175" fontSize="14">C</text>
          <text x="246" y="175" fontSize="14">D</text>
          <text x="225" y="50" fontSize="14">E</text>
          <AngleArc cx={100} cy={60} r={20} startAngle={145} endAngle={180} label="35°" labelOffset={25} />
          <AngleArc cx={43} cy={100} r={20} startAngle={60.7} endAngle={145} label="85°" labelOffset={25} />
          <AngleArc cx={75} cy={157} r={20} startAngle={0} endAngle={60.7} label="y" labelOffset={20} isHighlighted={showHint} />
          <AngleArc cx={246} cy={157} r={20} startAngle={255} endAngle={360} label="x" labelOffset={20} isHighlighted={showHint} />
          <AngleArc cx={220} cy={60} r={20} startAngle={75} endAngle={180} label="105°" labelOffset={25} />
        </svg>
      )
    },
    {
      id: 'F2-21',
      difficulty: '中',
      level: 'F2',
      title: '多邊形內角和 (Algebra)',
      text: '一個 n 邊形的內角和是 1800°，求 n。',
      answer: 12,
      steps: [
        '(n - 2) × 180° = 1800°',
        'n - 2 = 10',
        'n = 12'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,30 225,57 252,122 225,187 160,214 95,187 68,122 95,57" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="160" y="122" fontSize="16" textAnchor="middle">n 邊形</text>
          <text x="160" y="142" fontSize="14" textAnchor="middle">內角和 = 1800°</text>
        </svg>
      )
    },
    {
      id: 'F2-22',
      difficulty: '難',
      level: 'F2',
      title: '多邊形內角與外角 (Mixed)',
      text: '一個正多邊形的內角是外角的 4 倍，求該多邊形的邊數。',
      answer: 10,
      steps: [
        '設外角為 x，則內角為 4x。',
        'x + 4x = 180° (直線上的鄰角)',
        '5x = 180°',
        'x = 36°',
        '邊數 n = 360° ÷ 36° = 10'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,30 225,57 252,122 225,187 160,214 95,187 68,122 95,57" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="160" y="122" fontSize="16" textAnchor="middle">正多邊形</text>
          <text x="160" y="142" fontSize="14" textAnchor="middle">內角 = 4 × 外角</text>
        </svg>
      )
    },
    {
      id: 'F2-23',
      difficulty: '淺',
      level: 'F2',
      title: '全等三角形 (Congruent △s)',
      text: '已知 △ABC ≅ △PQR。若 AB = 5, BC = 7, AC = 8，求 PQ。',
      answer: 5,
      steps: [
        'PQ = AB = 5 (全等△的對應邊)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="80,40 40,140 140,140" fill="none" stroke="black" strokeWidth="1.5" />
          <polygon points="240,40 200,140 300,140" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="75" y="30" fontSize="14">A</text>
          <text x="25" y="155" fontSize="14">B</text>
          <text x="145" y="155" fontSize="14">C</text>
          <text x="235" y="30" fontSize="14">P</text>
          <text x="185" y="155" fontSize="14">Q</text>
          <text x="305" y="155" fontSize="14">R</text>
          <text x="160" y="100" fontSize="16" textAnchor="middle">≅</text>
          <text x="45" y="90" fontSize="14">5</text>
          <text x="90" y="160" fontSize="14">7</text>
          <text x="115" y="90" fontSize="14">8</text>
          {showHint && <line x1="240" y1="40" x2="200" y2="140" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    },
    {
      id: 'F2-24',
      difficulty: '淺',
      level: 'F2',
      title: '等腰三角形 (Isos. △)',
      text: '圖中，△ABC 中，AB = AC。已知 ∠A = 40°，求 ∠B。',
      answer: 70,
      steps: [
        '∠B = ∠C (等腰△底角)',
        '∠A + ∠B + ∠C = 180° (△內角和)',
        '40° + 2∠B = 180°',
        '2∠B = 140°',
        '∠B = 70°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,40 100,180 220,180" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="40" r="3" fill="black" />
          <circle cx="100" cy="180" r="3" fill="black" />
          <circle cx="220" cy="180" r="3" fill="black" />
          <text x="155" y="30" fontSize="14">A</text>
          <text x="85" y="195" fontSize="14">B</text>
          <text x="225" y="195" fontSize="14">C</text>
          <line x1="123" y1="107" x2="137" y2="113" stroke="black" strokeWidth="1.5" />
          <line x1="197" y1="107" x2="183" y2="113" stroke="black" strokeWidth="1.5" />
          <AngleArc cx={160} cy={40} r={30} startAngle={67} endAngle={113} label="40°" labelOffset={15} />
          <AngleArc cx={100} cy={180} r={25} startAngle={293} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-25',
      difficulty: '中',
      level: 'F2',
      title: '等腰三角形 (Isos. △)',
      text: '圖中，△ABC 中，AB = AC。已知 ∠B = 65°，求 ∠A。',
      answer: 50,
      steps: [
        '∠C = ∠B = 65° (等腰△底角)',
        '∠A + ∠B + ∠C = 180° (△內角和)',
        '∠A + 65° + 65° = 180°',
        '∠A = 50°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,40 100,180 220,180" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="40" r="3" fill="black" />
          <circle cx="100" cy="180" r="3" fill="black" />
          <circle cx="220" cy="180" r="3" fill="black" />
          <text x="155" y="30" fontSize="14">A</text>
          <text x="85" y="195" fontSize="14">B</text>
          <text x="225" y="195" fontSize="14">C</text>
          <line x1="123" y1="107" x2="137" y2="113" stroke="black" strokeWidth="1.5" />
          <line x1="197" y1="107" x2="183" y2="113" stroke="black" strokeWidth="1.5" />
          <AngleArc cx={100} cy={180} r={25} startAngle={293} endAngle={360} label="65°" labelOffset={15} />
          <AngleArc cx={160} cy={40} r={30} startAngle={67} endAngle={113} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-26',
      difficulty: '中',
      level: 'F2',
      title: '等邊三角形 (Equil. △)',
      text: '圖中，△ABC 是一個等邊三角形。求 ∠A。',
      answer: 60,
      steps: [
        '∠A = ∠B = ∠C (等邊△性質)',
        '∠A + ∠B + ∠C = 180° (△內角和)',
        '3∠A = 180°',
        '∠A = 60°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,40 80,178.6 240,178.6" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="40" r="3" fill="black" />
          <circle cx="80" cy="178.6" r="3" fill="black" />
          <circle cx="240" cy="178.6" r="3" fill="black" />
          <text x="155" y="30" fontSize="14">A</text>
          <text x="65" y="195" fontSize="14">B</text>
          <text x="245" y="195" fontSize="14">C</text>
          <line x1="114" y1="106" x2="126" y2="113" stroke="black" strokeWidth="1.5" />
          <line x1="194" y1="113" x2="206" y2="106" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="172" x2="160" y2="186" stroke="black" strokeWidth="1.5" />
          <AngleArc cx={160} cy={40} r={30} startAngle={60} endAngle={120} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-27',
      difficulty: '難',
      level: 'F2',
      title: '三角形外角 (Ext. ∠ of △)',
      text: '圖中，△ABC 的邊 BC 延長至 D。已知 ∠A = 55° 及 ∠ACD = 120°，求 ∠B。',
      answer: 65,
      steps: [
        '∠A + ∠B = ∠ACD (△外角)',
        '55° + ∠B = 120°',
        '∠B = 65°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="60" y1="160" x2="260" y2="160" stroke="black" strokeWidth="1.5" />
          <polygon points="140,40 60,160 180,160" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="140" cy="40" r="3" fill="black" />
          <circle cx="60" cy="160" r="3" fill="black" />
          <circle cx="180" cy="160" r="3" fill="black" />
          <text x="135" y="30" fontSize="14">A</text>
          <text x="45" y="175" fontSize="14">B</text>
          <text x="175" y="180" fontSize="14">C</text>
          <text x="265" y="175" fontSize="14">D</text>
          <AngleArc cx={140} cy={40} r={25} startAngle={72} endAngle={124} label="55°" labelOffset={15} />
          <AngleArc cx={180} cy={160} r={20} startAngle={252} endAngle={360} label="120°" labelOffset={15} />
          <AngleArc cx={60} cy={160} r={25} startAngle={304} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-28',
      difficulty: '難',
      level: 'F2',
      title: '三角形外角 (Ext. ∠ of △)',
      text: '圖中，△ABC 的邊 BC 延長至 D。已知 ∠B = 45° 及 ∠ACD = 110°，求 ∠A。',
      answer: 65,
      steps: [
        '∠A + ∠B = ∠ACD (△外角)',
        '∠A + 45° = 110°',
        '∠A = 65°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="60" y1="160" x2="260" y2="160" stroke="black" strokeWidth="1.5" />
          <polygon points="140,40 60,160 180,160" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="140" cy="40" r="3" fill="black" />
          <circle cx="60" cy="160" r="3" fill="black" />
          <circle cx="180" cy="160" r="3" fill="black" />
          <text x="135" y="30" fontSize="14">A</text>
          <text x="45" y="175" fontSize="14">B</text>
          <text x="175" y="180" fontSize="14">C</text>
          <text x="265" y="175" fontSize="14">D</text>
          <AngleArc cx={60} cy={160} r={25} startAngle={304} endAngle={360} label="45°" labelOffset={15} />
          <AngleArc cx={180} cy={160} r={20} startAngle={252} endAngle={360} label="110°" labelOffset={15} />
          <AngleArc cx={140} cy={40} r={25} startAngle={72} endAngle={124} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-29',
      difficulty: '難',
      level: 'F2',
      title: '多邊形內角和 (∠ sum of polygon)',
      text: '求一個正五邊形的內角。',
      answer: 108,
      steps: [
        '內角和 = (n - 2) × 180°',
        '內角和 = (5 - 2) × 180° = 540°',
        '每個內角 = 540° ÷ 5 = 108°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,30 240,88 209,183 111,183 80,88" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="30" r="3" fill="black" />
          <circle cx="240" cy="88" r="3" fill="black" />
          <circle cx="209" cy="183" r="3" fill="black" />
          <circle cx="111" cy="183" r="3" fill="black" />
          <circle cx="80" cy="88" r="3" fill="black" />
          <AngleArc cx={111} cy={183} r={25} startAngle={252} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-30',
      difficulty: '難',
      level: 'F2',
      title: '多邊形外角和 (Sum of ext. ∠s of polygon)',
      text: '求一個正六邊形的外角。',
      answer: 60,
      steps: [
        '外角和 = 360°',
        '每個外角 = 360° ÷ 6 = 60°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,30 225,68 225,143 160,180 95,143 95,68" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="180" x2="220" y2="214" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="180" r="3" fill="black" />
          <AngleArc cx={160} cy={180} r={25} startAngle={330} endAngle={390} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F2-31',
      difficulty: '難',
      level: 'F2',
      title: '多邊形內角和 (Algebra)',
      text: '一個 n 邊形的內角和是 1080°，求 n。',
      answer: 8,
      steps: [
        '(n - 2) × 180° = 1080°',
        'n - 2 = 6',
        'n = 8'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,30 225,57 252,122 225,187 160,214 95,187 68,122 95,57" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="160" y="122" fontSize="16" textAnchor="middle">n 邊形</text>
          <text x="160" y="142" fontSize="14" textAnchor="middle">內角和 = 1080°</text>
        </svg>
      )
    }
  ],
  'F3': [
    {
      id: 'F3-01',
      difficulty: '淺',
      level: 'F3',
      title: '平行四邊形 (Parallelogram)',
      text: '圖中，ABCD 為平行四邊形。已知 ∠DAB = 70°，求 ∠ABC。',
      answer: 110,
      steps: [
        '∠ABC + ∠DAB = 180° (同旁內角, AD // BC)',
        '∠ABC = 180° - 70°',
        '∠ABC = 110°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="60,175 220,175 260,55 100,55" fill="none" stroke="black" strokeWidth="1.5" />
          
          <circle cx="60" cy="175" r="3" fill="black" />
          <circle cx="220" cy="175" r="3" fill="black" />
          <circle cx="260" cy="55" r="3" fill="black" />
          <circle cx="100" cy="55" r="3" fill="black" />

          <text x="40" y="192" fontSize="14">A</text>
          <text x="224" y="192" fontSize="14">B</text>
          <text x="265" y="50" fontSize="14">C</text>
          <text x="82" y="50" fontSize="14">D</text>

          <AngleArc cx={60} cy={175} r={22} startAngle={290} endAngle={360} label="70°" labelOffset={14} />
          <AngleArc cx={220} cy={175} r={22} startAngle={180} endAngle={290} label="" labelOffset={18} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F3-02',
      difficulty: '中',
      level: 'F3',
      title: '菱形性質 (Properties of Rhombus)',
      text: '圖中，ABCD 為菱形，對角線 AC 與 BD 相交於 E。已知 ∠DAC = 35°，求 ∠ADE。',
      answer: 55,
      steps: [
        '∠AED = 90° (菱形對角線性質)',
        '∠ADE + 35° + 90° = 180° (△內角和)',
        '∠ADE = 55°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,30 240,110 160,190 80,110" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="30" x2="160" y2="190" stroke="black" strokeWidth="1.5" />
          <line x1="80" y1="110" x2="240" y2="110" stroke="black" strokeWidth="1.5" />
          <text x="155" y="20" fontSize="14">A</text>
          <text x="250" y="115" fontSize="14">B</text>
          <text x="155" y="210" fontSize="14">C</text>
          <text x="60" y="115" fontSize="14">D</text>
          <text x="165" y="105" fontSize="14">E</text>
          <AngleArc cx={160} cy={30} r={30} startAngle={90} endAngle={135} label="35°" labelOffset={15} />
          <AngleArc cx={80} cy={110} r={25} startAngle={315} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F3-03',
      difficulty: '難',
      level: 'F3',
      title: '中點定理 (Mid-point Theorem)',
      text: '圖中，在 △ABC 中，D 和 E 分別是 AB 和 AC 的中點。已知 BC = 14，求 DE。',
      answer: 7,
      unit: '',
      steps: [
        <span>∵ <i>D</i> 和 <i>E</i> 分別是 <i>AB</i> 和 <i>AC</i> 的中點</span>,
        <span>∴ <i>AD</i> = <i>DB</i>, <i>AE</i> = <i>EC</i></span>,
        <span><i>DE</i> = <i>BC</i> ÷ 2 (中點定理)</span>,
        <span><i>DE</i> = 14 ÷ 2 = 7</span>
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,40 80,180 260,180" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="120" y1="110" x2="210" y2="110" stroke="black" strokeWidth="1.5" />
          <circle cx="120" cy="110" r="3" fill="black" />
          <circle cx="210" cy="110" r="3" fill="black" />
          <text x="155" y="30" fontSize="14">A</text>
          <text x="65" y="190" fontSize="14">B</text>
          <text x="270" y="190" fontSize="14">C</text>
          <text x="100" y="105" fontSize="14">D</text>
          <text x="220" y="105" fontSize="14">E</text>
          <text x="170" y="195" fontSize="14">14</text>
          {showHint && <line x1="120" y1="110" x2="210" y2="110" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    },
    {
      id: 'F3-04',
      difficulty: '淺',
      level: 'F3',
      title: '平行四邊形 (Parallelogram)',
      text: '圖中，ABCD 為平行四邊形。已知 ∠DAB = 65°，求 ∠BCD。',
      answer: 65,
      steps: [
        '∠BCD = ∠DAB = 65° (平行四邊形對角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="60,175 220,175 260,55 100,55" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="40" y="192" fontSize="14">A</text>
          <text x="224" y="192" fontSize="14">B</text>
          <text x="265" y="50" fontSize="14">C</text>
          <text x="82" y="50" fontSize="14">D</text>
          <AngleArc cx={60} cy={175} r={22} startAngle={290} endAngle={360} label="65°" labelOffset={14} />
          <AngleArc cx={260} cy={55} r={22} startAngle={110} endAngle={180} label="" labelOffset={18} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F3-05',
      difficulty: '中',
      level: 'F3',
      title: '平行四邊形 (Parallelogram)',
      text: '圖中，ABCD 為平行四邊形。已知 AB = 3x - 2 及 DC = x + 8，求 x。',
      answer: 5,
      steps: [
        'AB = DC (平行四邊形對邊)',
        '3x - 2 = x + 8',
        '2x = 10',
        'x = 5'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="60,175 220,175 260,55 100,55" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="40" y="192" fontSize="14">A</text>
          <text x="224" y="192" fontSize="14">B</text>
          <text x="265" y="50" fontSize="14">C</text>
          <text x="82" y="50" fontSize="14">D</text>
          <text x="120" y="195" fontSize="14">3x - 2</text>
          <text x="160" y="45" fontSize="14">x + 8</text>
          {showHint && <line x1="60" y1="175" x2="220" y2="175" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
          {showHint && <line x1="100" y1="55" x2="260" y2="55" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    },
    {
      id: 'F3-06',
      difficulty: '中',
      level: 'F3',
      title: '平行四邊形 (Parallelogram)',
      text: '圖中，ABCD 為平行四邊形，對角線 AC 與 BD 相交於 E。已知 AE = 4 及 BE = 5，求 AC。',
      answer: 8,
      steps: [
        'AC = 2 × AE (平行四邊形對角線互相平分)',
        'AC = 2 × 4 = 8'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="60,175 220,175 260,55 100,55" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="60" y1="175" x2="260" y2="55" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="55" x2="220" y2="175" stroke="black" strokeWidth="1.5" />
          <text x="40" y="192" fontSize="14">A</text>
          <text x="224" y="192" fontSize="14">B</text>
          <text x="265" y="50" fontSize="14">C</text>
          <text x="82" y="50" fontSize="14">D</text>
          <text x="160" y="105" fontSize="14">E</text>
          <text x="105" y="140" fontSize="14">4</text>
          <text x="195" y="140" fontSize="14">5</text>
          {showHint && <line x1="60" y1="175" x2="260" y2="55" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    },
    {
      id: 'F3-07',
      difficulty: '中',
      level: 'F3',
      title: '長方形 (Rectangle)',
      text: '圖中，ABCD 為長方形，對角線 AC 與 BD 相交於 E。已知 AC = 10，求 BE。',
      answer: 5,
      steps: [
        'BD = AC = 10 (長方形對角線相等)',
        'BE = BD ÷ 2 = 5 (平行四邊形對角線互相平分)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="60,160 260,160 260,60 60,60" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="60" y1="160" x2="260" y2="60" stroke="black" strokeWidth="1.5" />
          <line x1="60" y1="60" x2="260" y2="160" stroke="black" strokeWidth="1.5" />
          <text x="45" y="175" fontSize="14">A</text>
          <text x="270" y="175" fontSize="14">B</text>
          <text x="270" y="50" fontSize="14">C</text>
          <text x="45" y="50" fontSize="14">D</text>
          <text x="160" y="130" fontSize="14">E</text>
          <text x="100" y="100" fontSize="14">10</text>
          {showHint && <line x1="160" y1="110" x2="260" y2="160" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    },
    {
      id: 'F3-08',
      difficulty: '淺',
      level: 'F3',
      title: '正方形 (Square)',
      text: '圖中，ABCD 為正方形，對角線 AC 與 BD 相交於 E。求 ∠AEB。',
      answer: 90,
      steps: [
        '∠AEB = 90° (正方形對角線互相垂直)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="110,160 210,160 210,60 110,60" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="110" y1="160" x2="210" y2="60" stroke="black" strokeWidth="1.5" />
          <line x1="110" y1="60" x2="210" y2="160" stroke="black" strokeWidth="1.5" />
          <text x="95" y="175" fontSize="14">A</text>
          <text x="220" y="175" fontSize="14">B</text>
          <text x="220" y="50" fontSize="14">C</text>
          <text x="95" y="50" fontSize="14">D</text>
          <text x="160" y="100" fontSize="14">E</text>
          <AngleArc cx={160} cy={110} r={15} startAngle={45} endAngle={135} label="?" labelOffset={20} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F3-09',
      difficulty: '淺',
      level: 'F3',
      title: '梯形 (Trapezium)',
      text: '圖中，ABCD 為梯形，AD // BC。已知 ∠DAB = 115°，求 ∠ABC。',
      answer: 65,
      steps: [
        '∠ABC + ∠DAB = 180° (同旁內角, AD // BC)',
        '∠ABC = 180° - 115° = 65°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="60,170 260,170 200,60 100,60" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="45" y="185" fontSize="14">B</text>
          <text x="270" y="185" fontSize="14">C</text>
          <text x="210" y="50" fontSize="14">D</text>
          <text x="85" y="50" fontSize="14">A</text>
          <AngleArc cx={100} cy={60} r={20} startAngle={0} endAngle={110} label="115°" labelOffset={15} />
          <AngleArc cx={60} cy={170} r={20} startAngle={290} endAngle={360} label="?" labelOffset={15} isHighlighted={showHint} />
          <polygon points="160,60 150,55 150,65" fill="black" />
          <polygon points="170,170 160,165 160,175" fill="black" />
        </svg>
      )
    },
    {
      id: 'F3-10',
      difficulty: '中',
      level: 'F3',
      title: '等腰梯形 (Isosceles Trapezium)',
      text: '圖中，ABCD 為等腰梯形，AD // BC 且 AB = DC。已知 ∠ABC = 70°，求 ∠BCD。',
      answer: 70,
      steps: [
        '∠BCD = ∠ABC = 70° (等腰梯形底角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="60,170 260,170 200,60 120,60" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="45" y="185" fontSize="14">B</text>
          <text x="270" y="185" fontSize="14">C</text>
          <text x="210" y="50" fontSize="14">D</text>
          <text x="105" y="50" fontSize="14">A</text>
          <AngleArc cx={60} cy={170} r={20} startAngle={298} endAngle={360} label="70°" labelOffset={15} />
          <AngleArc cx={260} cy={170} r={20} startAngle={180} endAngle={242} label="" labelOffset={15} isHighlighted={showHint} />
          <line x1="85" y1="115" x2="95" y2="115" stroke="black" strokeWidth="1.5" />
          <line x1="225" y1="115" x2="235" y2="115" stroke="black" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'F3-11',
      difficulty: '難',
      level: 'F3',
      title: '鷂形 (Kite)',
      text: '圖中，ABCD 為鷂形，AB = AD 及 CB = CD。對角線 AC 與 BD 相交於 E。已知 ∠ABE = 40°，求 ∠BAE。',
      answer: 50,
      steps: [
        '∠AEB = 90° (鷂形對角線互相垂直)',
        '∠BAE + ∠ABE + ∠AEB = 180° (△內角和)',
        '∠BAE + 40° + 90° = 180°',
        '∠BAE = 50°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,20 220,80 160,200 100,80" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="20" x2="160" y2="200" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="80" x2="220" y2="80" stroke="black" strokeWidth="1.5" />
          <text x="155" y="15" fontSize="14">A</text>
          <text x="230" y="85" fontSize="14">B</text>
          <text x="155" y="215" fontSize="14">C</text>
          <text x="85" y="85" fontSize="14">D</text>
          <text x="165" y="95" fontSize="14">E</text>
          <AngleArc cx={220} cy={80} r={25} startAngle={180} endAngle={225} label="40°" labelOffset={15} />
          <AngleArc cx={160} cy={20} r={30} startAngle={45} endAngle={90} label="" labelOffset={15} isHighlighted={showHint} />
          <polyline points="160,70 170,70 170,80" fill="none" stroke="black" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'F3-12',
      difficulty: '中',
      level: 'F3',
      title: '中點定理 (Mid-point Theorem)',
      text: '圖中，在 △ABC 中，D 和 E 分別是 AB 和 AC 的中點。已知 ∠ADE = 60°，求 ∠ABC。',
      answer: 60,
      steps: [
        'DE // BC (中點定理)',
        '∠ABC = ∠ADE = 60° (同位角, DE // BC)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,40 80,180 260,180" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="120" y1="110" x2="210" y2="110" stroke="black" strokeWidth="1.5" />
          <text x="155" y="30" fontSize="14">A</text>
          <text x="65" y="190" fontSize="14">B</text>
          <text x="270" y="190" fontSize="14">C</text>
          <text x="100" y="105" fontSize="14">D</text>
          <text x="220" y="105" fontSize="14">E</text>
          <AngleArc cx={120} cy={110} r={20} startAngle={300} endAngle={360} label="60°" labelOffset={15} />
          <AngleArc cx={80} cy={180} r={20} startAngle={300} endAngle={360} label="?" labelOffset={15} isHighlighted={showHint} />
          <line x1="135" y1="72" x2="145" y2="78" stroke="black" strokeWidth="1.5" />
          <line x1="95" y1="142" x2="105" y2="148" stroke="black" strokeWidth="1.5" />
          <line x1="178" y1="76" x2="188" y2="70" stroke="black" strokeWidth="1.5" />
          <line x1="182" y1="80" x2="192" y2="74" stroke="black" strokeWidth="1.5" />
          <line x1="228" y1="146" x2="238" y2="140" stroke="black" strokeWidth="1.5" />
          <line x1="232" y1="150" x2="242" y2="144" stroke="black" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'F3-13',
      difficulty: '中',
      level: 'F3',
      title: '截線定理 (Intercept Theorem)',
      text: '圖中，L1 // L2 // L3。直線 AB 和 CD 分別與這三條平行線相交。已知 AB = BC，且 DE = 6，求 EF。',
      answer: 6,
      steps: [
        '∵ L1 // L2 // L3 且 AB = BC',
        '∴ DE = EF (截線定理)',
        'EF = 6'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="60" x2="280" y2="60" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="110" x2="280" y2="110" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="40" x2="140" y2="180" stroke="black" strokeWidth="1.5" />
          <line x1="220" y1="40" x2="180" y2="180" stroke="black" strokeWidth="1.5" />
          <text x="20" y="65" fontSize="14">L1</text>
          <text x="20" y="115" fontSize="14">L2</text>
          <text x="20" y="165" fontSize="14">L3</text>
          <text x="90" y="55" fontSize="14">A</text>
          <text x="105" y="105" fontSize="14">B</text>
          <text x="120" y="175" fontSize="14">C</text>
          <text x="225" y="55" fontSize="14">D</text>
          <text x="205" y="105" fontSize="14">E</text>
          <text x="190" y="175" fontSize="14">F</text>
          <text x="220" y="85" fontSize="14">6</text>
          <line x1="105" y1="85" x2="115" y2="85" stroke="black" strokeWidth="1.5" />
          <line x1="115" y1="135" x2="125" y2="135" stroke="black" strokeWidth="1.5" />
          {showHint && <line x1="200" y1="110" x2="185" y2="160" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    },
    {
      id: 'F3-14',
      difficulty: '難',
      level: 'F3',
      title: '截線定理 (Intercept Theorem)',
      text: '圖中，L1 // L2 // L3。已知 AB = BC，DE = 2x + 1，EF = x + 5，求 x。',
      answer: 4,
      steps: [
        'DE = EF (截線定理)',
        '2x + 1 = x + 5',
        'x = 4'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="60" x2="280" y2="60" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="110" x2="280" y2="110" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="40" x2="140" y2="180" stroke="black" strokeWidth="1.5" />
          <line x1="220" y1="40" x2="180" y2="180" stroke="black" strokeWidth="1.5" />
          <text x="20" y="65" fontSize="14">L1</text>
          <text x="20" y="115" fontSize="14">L2</text>
          <text x="20" y="165" fontSize="14">L3</text>
          <text x="90" y="55" fontSize="14">A</text>
          <text x="105" y="105" fontSize="14">B</text>
          <text x="120" y="175" fontSize="14">C</text>
          <text x="225" y="55" fontSize="14">D</text>
          <text x="205" y="105" fontSize="14">E</text>
          <text x="190" y="175" fontSize="14">F</text>
          <text x="220" y="85" fontSize="14">2x + 1</text>
          <text x="205" y="135" fontSize="14">x + 5</text>
          <line x1="105" y1="85" x2="115" y2="85" stroke="black" strokeWidth="1.5" />
          <line x1="115" y1="135" x2="125" y2="135" stroke="black" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'F3-15',
      difficulty: '中',
      level: 'F3',
      title: '正方形 (Square)',
      text: '圖中，ABCD 為正方形，對角線 BD 與直線 EC 相交於 O。已知 ∠BOC = 75°，求 x。',
      answer: 120,
      steps: [
        '∠OBC = 45° (正方形對角線性質)',
        '∠OCB = 180° - 75° - 45° = 60° (△ 內角和)',
        '∠DEC = ∠OCB = 60° (內錯角, AD // BC)',
        'x = 180° - 60° = 120° (直線上的鄰角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="80,40 240,40 240,200 80,200" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="80" y1="200" x2="240" y2="40" stroke="black" strokeWidth="1.5" />
          <line x1="147.6" y1="40" x2="240" y2="200" stroke="black" strokeWidth="1.5" />
          <text x="65" y="35" fontSize="14">A</text>
          <text x="245" y="35" fontSize="14">D</text>
          <text x="65" y="215" fontSize="14">B</text>
          <text x="245" y="215" fontSize="14">C</text>
          <text x="140" y="30" fontSize="14">E</text>
          <text x="190" y="100" fontSize="14">O</text>
          <AngleArc cx={181.4} cy={98.6} r={20} startAngle={60} endAngle={135} label="75°" labelOffset={20} />
          <AngleArc cx={147.6} cy={40} r={20} startAngle={60} endAngle={180} label="x" labelOffset={20} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F3-16',
      difficulty: '淺',
      level: 'F3',
      title: '長方形 (Rectangle)',
      text: '圖中，PQRS 是一個長方形，對角線 PR 和 QS 相交於 T。已知 ∠PTS = 120°，求 ∠TQP。',
      answer: 60,
      steps: [
        '∠PTQ = 180° - 120° = 60° (直線上的鄰角)',
        'TP = TQ (長方形對角線互相平分且相等)',
        '∠TQP = ∠TPQ (等腰 △ 底角)',
        '∠TQP = (180° - 60°) ÷ 2 = 60° (△ 內角和)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="90.7,70 229.3,70 229.3,150 90.7,150" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="90.7" y1="70" x2="229.3" y2="150" stroke="black" strokeWidth="1.5" />
          <line x1="90.7" y1="150" x2="229.3" y2="70" stroke="black" strokeWidth="1.5" />
          <text x="75" y="65" fontSize="14">P</text>
          <text x="235" y="65" fontSize="14">S</text>
          <text x="75" y="165" fontSize="14">Q</text>
          <text x="235" y="165" fontSize="14">R</text>
          <text x="155" y="130" fontSize="14">T</text>
          <AngleArc cx={160} cy={110} r={20} startAngle={210} endAngle={330} label="120°" labelOffset={20} />
          <AngleArc cx={90.7} cy={150} r={25} startAngle={270} endAngle={330} label="?" labelOffset={20} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F3-17',
      difficulty: '中',
      level: 'F3',
      title: '菱形 (Rhombus)',
      text: '圖中，ABCD 是一個菱形。已知 ∠ABC = 70°，求 x。',
      answer: 55,
      steps: [
        '∠BCD + 70° = 180° (同旁內角, AB // DC)',
        '∠BCD = 110°',
        'x = 110° ÷ 2 = 55° (菱形對角線平分內角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="113.9,48.4 253.9,48.4 206,180 66,180" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="113.9" y1="48.4" x2="206" y2="180" stroke="black" strokeWidth="1.5" />
          <text x="100" y="45" fontSize="14">A</text>
          <text x="260" y="45" fontSize="14">D</text>
          <text x="50" y="190" fontSize="14">B</text>
          <text x="215" y="190" fontSize="14">C</text>
          <AngleArc cx={66} cy={180} r={25} startAngle={290} endAngle={360} label="70°" labelOffset={20} />
          <AngleArc cx={206} cy={180} r={30} startAngle={235} endAngle={290} label="x" labelOffset={20} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F3-18',
      difficulty: '中',
      level: 'F3',
      title: '菱形 (Rhombus)',
      text: '圖中，PQRS 是一個菱形。已知 ∠QSR = 80°，求 x + y 的值。',
      answer: 170,
      steps: [
        'x = 90° (菱形對角線互相垂直)',
        'y = 80° (菱形對角線平分內角)',
        'x + y = 90° + 80° = 170°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,52.3 260,110 160,167.7 60,110" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="60" y1="110" x2="260" y2="110" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="52.3" x2="160" y2="167.7" stroke="black" strokeWidth="1.5" />
          <text x="155" y="45" fontSize="14">P</text>
          <text x="270" y="115" fontSize="14">S</text>
          <text x="155" y="185" fontSize="14">R</text>
          <text x="40" y="115" fontSize="14">Q</text>
          <text x="140" y="125" fontSize="14">T</text>
          <AngleArc cx={260} cy={110} r={35} startAngle={150} endAngle={180} label="80°" labelOffset={20} />
          <AngleArc cx={260} cy={110} r={35} startAngle={180} endAngle={210} label="y" labelOffset={20} isHighlighted={showHint} />
          <AngleArc cx={160} cy={110} r={20} startAngle={180} endAngle={270} label="x" labelOffset={20} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'F3-24',
      difficulty: '難',
      level: 'F3',
      title: '菱形 (Rhombus)',
      text: '圖中，ABCD 為菱形，對角線 AC = 6，BD = 8。求菱形的周長。',
      answer: 20,
      steps: [
        '對角線互相垂直平分，設交點為 E',
        'AE = 3, BE = 4',
        'AB = √(3² + 4²) = 5 (畢氏定理)',
        '周長 = 4 × 5 = 20'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,30 240,110 160,190 80,110" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="30" x2="160" y2="190" stroke="black" strokeWidth="1.5" />
          <line x1="80" y1="110" x2="240" y2="110" stroke="black" strokeWidth="1.5" />
          <text x="155" y="20" fontSize="14">A</text>
          <text x="250" y="115" fontSize="14">B</text>
          <text x="155" y="210" fontSize="14">C</text>
          <text x="60" y="115" fontSize="14">D</text>
          <text x="165" y="105" fontSize="14">E</text>
          <text x="170" y="70" fontSize="14">3</text>
          <text x="200" y="105" fontSize="14">4</text>
          <polyline points="160,100 170,100 170,110" fill="none" stroke="black" strokeWidth="1.5" />
          {showHint && <line x1="160" y1="30" x2="240" y2="110" stroke="rgba(255, 255, 0, 0.5)" strokeWidth="8" />}
        </svg>
      )
    }
  ],
  'Senior': [
    {
      id: 'S-01',
      difficulty: '中',
      level: 'F4-F6',
      title: '交錯弓形的圓周角 (Angle in Alternate Segment)',
      text: '圖中，AB 為圓的一條弦，直線 TA 切圓於 A，C 為優弧 AB 上的一點。已知 ∠BAT = 38°，求 ∠ACB。',
      answer: 38,
      steps: [
        '∠ACB = ∠BAT = 38° (交錯弓形的圓周角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="110" r="80" fill="none" stroke="black" strokeWidth="1.5" />
          
          <line x1="60" y1="190" x2="260" y2="190" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="190" x2="82.4" y2="129.3" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="190" x2="216.6" y2="53.4" stroke="black" strokeWidth="1.5" />
          <line x1="82.4" y1="129.3" x2="216.6" y2="53.4" stroke="black" strokeWidth="1.5" />
          
          <circle cx="160" cy="190" r="3" fill="black" />
          <circle cx="82.4" cy="129.3" r="3" fill="black" />
          <circle cx="216.6" cy="53.4" r="3" fill="black" />
          
          <text x="165" y="210" fontSize="14">A</text>
          <text x="65" y="125" fontSize="14">B</text>
          <text x="225" y="45" fontSize="14">C</text>
          <text x="60" y="205" fontSize="14">T</text>
          
          <AngleArc cx={160} cy={190} r={30} startAngle={180} endAngle={218} label="" labelOffset={18} />
          <line x1="110" y1="205" x2="126" y2="188" stroke="black" strokeWidth="1.5" />
          <polygon points="128,186 120,188 125,193" fill="black" />
          <text x="105" y="215" fontSize="14" textAnchor="middle">38°</text>
          
          <AngleArc cx={216.6} cy={53.4} r={25} startAngle={112.5} endAngle={150.5} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-02',
      difficulty: '淺',
      level: 'F4-F6',
      title: '同弓形內的圓周角 (∠s in same segment)',
      text: '圖中，A、B、C、D 是圓上的點。已知 ∠BAC = 50°，求 ∠BDC。',
      answer: 50,
      steps: [
        '∠BDC = ∠BAC = 50° (同弓形內的圓周角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="110" r="80" fill="none" stroke="black" strokeWidth="1.5" />
          <polygon points="98.7,58.6 98.7,161.4 221.3,161.4 200,40.7" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="98.7" y1="58.6" x2="221.3" y2="161.4" stroke="black" strokeWidth="1.5" />
          <line x1="200" y1="40.7" x2="98.7" y2="161.4" stroke="black" strokeWidth="1.5" />
          <text x="85" y="50" fontSize="14">A</text>
          <text x="80" y="175" fontSize="14">B</text>
          <text x="235" y="175" fontSize="14">C</text>
          <text x="210" y="35" fontSize="14">D</text>
          <AngleArc cx={98.7} cy={58.6} r={25} startAngle={40} endAngle={90} label="50°" labelOffset={15} />
          <AngleArc cx={200} cy={40.7} r={25} startAngle={80} endAngle={130} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-03',
      difficulty: '中',
      level: 'F4-F6',
      title: '圓心角兩倍於圓周角 (∠ at centre twice ∠ at circumference)',
      text: '圖中，O 為圓心，A、B、C 為圓上的點。已知 ∠AOB = 110°，求 ∠ACB。',
      answer: 55,
      steps: [
        '∠ACB = ∠AOB ÷ 2 (圓心角兩倍於圓周角)',
        '∠ACB = 110° ÷ 2 = 55°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="120" r="70" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="120" r="3" fill="black" />
          <text x="165" y="115" fontSize="14">O</text>
          <line x1="160" y1="120" x2="102.7" y2="160.1" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="120" x2="217.3" y2="160.1" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="50" x2="102.7" y2="160.1" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="50" x2="217.3" y2="160.1" stroke="black" strokeWidth="1.5" />
          <text x="85" y="175" fontSize="14">A</text>
          <text x="230" y="175" fontSize="14">B</text>
          <text x="155" y="40" fontSize="14">C</text>
          <AngleArc cx={160} cy={120} r={20} startAngle={35} endAngle={145} label="110°" labelOffset={15} />
          <AngleArc cx={160} cy={50} r={25} startAngle={62.5} endAngle={117.5} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-04',
      difficulty: '淺',
      level: 'F4-F6',
      title: '半圓上的圓周角 (∠ in semi-circle)',
      text: '圖中，AB 為圓的直徑，C 為圓上的一點。已知 ∠BAC = 35°，求 ∠ABC。',
      answer: 55,
      steps: [
        '∠ACB = 90° (半圓上的圓周角)',
        '∠ABC = 180° - 90° - 35° = 55° (△內角和)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="120" r="70" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="90" y1="120" x2="230" y2="120" stroke="black" strokeWidth="1.5" />
          <line x1="90" y1="120" x2="183.9" y2="54.2" stroke="black" strokeWidth="1.5" />
          <line x1="230" y1="120" x2="183.9" y2="54.2" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="120" r="3" fill="black" />
          <text x="75" y="125" fontSize="14">A</text>
          <text x="240" y="125" fontSize="14">B</text>
          <text x="185" y="45" fontSize="14">C</text>
          <text x="155" y="140" fontSize="14">O</text>
          <AngleArc cx={90} cy={120} r={25} startAngle={325} endAngle={360} label="35°" labelOffset={15} />
          <AngleArc cx={230} cy={120} r={25} startAngle={180} endAngle={235} label="" labelOffset={15} isHighlighted={showHint} />
          {showHint && <polyline points="175.7,60 181.5,68.2 189.7,62.4" fill="none" stroke="red" strokeWidth="1.5" />}
        </svg>
      )
    },
    {
      id: 'S-05',
      difficulty: '淺',
      level: 'F4-F6',
      title: '圓內接四邊形對角 (Opp. ∠s, cyclic quad.)',
      text: '圖中，A、B、C、D 為圓上的點。已知 ∠DAB = 105°，求 ∠BCD。',
      answer: 75,
      steps: [
        '∠BCD + ∠DAB = 180° (圓內接四邊形對角)',
        '∠BCD + 105° = 180°',
        '∠BCD = 75°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="110" r="70" fill="none" stroke="black" strokeWidth="1.5" />
          <polygon points="99.4,75 90,110 160,180 220.6,75" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="85" y="65" fontSize="14">A</text>
          <text x="70" y="115" fontSize="14">B</text>
          <text x="160" y="200" fontSize="14">C</text>
          <text x="230" y="70" fontSize="14">D</text>
          <AngleArc cx={99.4} cy={75} r={20} startAngle={0} endAngle={105} label="105°" labelOffset={15} />
          <AngleArc cx={160} cy={180} r={20} startAngle={225} endAngle={300} label="?" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-06',
      difficulty: '淺',
      level: 'F4-F6',
      title: '圓內接四邊形外角 (Ext. ∠, cyclic quad.)',
      text: '圖中，A、B、C、D 為圓上的點，直線 BCE 是一條直線。已知 ∠DCE = 82°，求 ∠DAB。',
      answer: 82,
      steps: [
        '∠DAB = ∠DCE = 82° (圓內接四邊形外角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="110" r="70" fill="none" stroke="black" strokeWidth="1.5" />
          <polygon points="125,49.4 110.5,159.5 209.5,159.5 221.2,76.1" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="209.5" y1="159.5" x2="260" y2="159.5" stroke="black" strokeWidth="1.5" />
          <text x="115" y="40" fontSize="14">A</text>
          <text x="95" y="175" fontSize="14">B</text>
          <text x="200" y="180" fontSize="14">C</text>
          <text x="235" y="70" fontSize="14">D</text>
          <text x="265" y="155" fontSize="14">E</text>
          <AngleArc cx={209.5} cy={159.5} r={20} startAngle={278} endAngle={360} label="82°" labelOffset={15} />
          <AngleArc cx={125} cy={49.4} r={20} startAngle={15.5} endAngle={97.5} label="?" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-07',
      difficulty: '淺',
      level: 'F4-F6',
      title: '切線 ⊥ 半徑 (Tangent ⊥ radius)',
      text: '圖中，O 為圓心，直線 TA 切圓於 A，B 為圓上的一點。已知 ∠OAB = 25°，求 ∠TAB。',
      answer: 65,
      steps: [
        '∠OAT = 90° (切線 ⊥ 半徑)',
        '∠TAB = 90° - 25° = 65°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="100" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="100" r="3" fill="black" />
          <line x1="160" y1="100" x2="160" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="100" x2="212" y2="70" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="160" x2="212" y2="70" stroke="black" strokeWidth="1.5" />
          <line x1="80" y1="160" x2="240" y2="160" stroke="black" strokeWidth="1.5" />
          <text x="150" y="95" fontSize="14">O</text>
          <text x="165" y="175" fontSize="14">A</text>
          <text x="220" y="65" fontSize="14">B</text>
          <text x="70" y="165" fontSize="14">T</text>
          <AngleArc cx={160} cy={160} r={25} startAngle={300} endAngle={360} label="25°" labelOffset={15} />
          <AngleArc cx={160} cy={160} r={20} startAngle={180} endAngle={300} label="" labelOffset={15} isHighlighted={showHint} />
          {showHint && <polyline points="150,160 150,150 160,150" fill="none" stroke="red" strokeWidth="1.5" />}
        </svg>
      )
    },
    {
      id: 'S-08',
      difficulty: '中',
      level: 'F4-F6',
      title: '切線性質 (Tangent properties)',
      text: '圖中，TA 和 TB 分別切圓於 A 和 B。已知 ∠ATB = 50°，求 ∠TAB。',
      answer: 65,
      steps: [
        'TA = TB (切線性質)',
        '∠TAB = ∠TBA (等腰△底角)',
        '∠TAB = (180° - 50°) ÷ 2 = 65°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="200" cy="110" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="60" y1="110" x2="174.3" y2="55.8" stroke="black" strokeWidth="1.5" />
          <line x1="60" y1="110" x2="174.3" y2="164.2" stroke="black" strokeWidth="1.5" />
          <line x1="174.3" y1="55.8" x2="174.3" y2="164.2" stroke="black" strokeWidth="1.5" />
          <text x="45" y="115" fontSize="14">T</text>
          <text x="175" y="45" fontSize="14">A</text>
          <text x="175" y="180" fontSize="14">B</text>
          <AngleArc cx={60} cy={110} r={25} startAngle={334.6} endAngle={25.4} label="50°" labelOffset={15} />
          <AngleArc cx={174.3} cy={55.8} r={25} startAngle={90} endAngle={154.6} label="?" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-09',
      difficulty: '中',
      level: 'F4-F6',
      title: '交錯弓形的圓周角 (Angle in Alternate Segment)',
      text: '圖中，直線 TA 切圓於 A，B 和 C 為圓上的點。已知 ∠TAB = 42° 及 ∠ABC = 60°，求 ∠BCA。',
      answer: 42,
      steps: [
        '∠BCA = ∠TAB = 42° (交錯弓形的圓周角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="100" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="80" y1="160" x2="240" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="160" x2="100.3" y2="106.3" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="160" x2="212" y2="70" stroke="black" strokeWidth="1.5" />
          <line x1="100.3" y1="106.3" x2="212" y2="70" stroke="black" strokeWidth="1.5" />
          <text x="165" y="175" fontSize="14">A</text>
          <text x="85" y="105" fontSize="14">B</text>
          <text x="225" y="65" fontSize="14">C</text>
          <text x="70" y="165" fontSize="14">T</text>
          <AngleArc cx={160} cy={160} r={25} startAngle={180} endAngle={222} label="42°" labelOffset={15} />
          <AngleArc cx={100.3} cy={106.3} r={20} startAngle={342} endAngle={42} label="60°" labelOffset={15} />
          <AngleArc cx={212} cy={70} r={20} startAngle={120} endAngle={162} label="?" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-10',
      difficulty: '難',
      level: 'F4-F6',
      title: '交錯弓形的圓周角 (Mixed)',
      text: '圖中，直線 TA 切圓於 A，B 和 C 為圓上的點。已知 ∠TAB = 45° 及 ∠ABC = 65°，求 ∠BAC。',
      answer: 70,
      steps: [
        '∠BCA = ∠TAB = 45° (交錯弓形的圓周角)',
        '∠BAC = 180° - 45° - 65° = 70° (△內角和)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="100" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="80" y1="160" x2="240" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="160" x2="100" y2="100" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="160" x2="202.4" y2="57.6" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="100" x2="202.4" y2="57.6" stroke="black" strokeWidth="1.5" />
          <text x="165" y="175" fontSize="14">A</text>
          <text x="85" y="100" fontSize="14">B</text>
          <text x="215" y="50" fontSize="14">C</text>
          <text x="70" y="165" fontSize="14">T</text>
          <AngleArc cx={160} cy={160} r={25} startAngle={180} endAngle={225} label="45°" labelOffset={15} />
          <AngleArc cx={100} cy={100} r={20} startAngle={337.5} endAngle={405} label="65°" labelOffset={15} />
          <AngleArc cx={160} cy={160} r={25} startAngle={225} endAngle={292.5} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-11',
      difficulty: '中',
      level: 'F4-F6',
      title: '圓心角與圓周角 (Mixed)',
      text: '圖中，O 為圓心，A、B、C 為圓上的點。已知 ∠OAB = 20° 及 ∠OBC = 30°，求 ∠AOC。',
      answer: 100,
      steps: [
        'OA = OB (半徑)，∴ ∠OBA = ∠OAB = 20°',
        '∠ABC = ∠OBA + ∠OBC = 20° + 30° = 50°',
        '∠AOC = 2 × ∠ABC = 100° (圓心角兩倍於圓周角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="120" r="70" fill="none" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="120" r="3" fill="black" />
          <text x="165" y="115" fontSize="14">O</text>
          <line x1="160" y1="120" x2="115" y2="173.6" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="120" x2="160" y2="50" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="120" x2="220.6" y2="155" stroke="black" strokeWidth="1.5" />
          <line x1="115" y1="173.6" x2="160" y2="50" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="50" x2="220.6" y2="155" stroke="black" strokeWidth="1.5" />
          <text x="100" y="190" fontSize="14">A</text>
          <text x="155" y="40" fontSize="14">B</text>
          <text x="230" y="165" fontSize="14">C</text>
          <AngleArc cx={115} cy={173.6} r={25} startAngle={290} endAngle={310} label="20°" labelOffset={15} />
          <AngleArc cx={160} cy={50} r={25} startAngle={60} endAngle={90} label="30°" labelOffset={15} />
          <AngleArc cx={160} cy={120} r={20} startAngle={30} endAngle={130} label="?" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-12',
      difficulty: '難',
      level: 'F4-F6',
      title: '圓內接四邊形 (Mixed)',
      text: '圖中，ABCD 為圓內接四邊形，AB = AD。已知 ∠BCD = 110°，求 ∠ABD。',
      answer: 55,
      steps: [
        '∠BAD + ∠BCD = 180° (圓內接四邊形對角)',
        '∠BAD = 180° - 110° = 70°',
        'AB = AD，∴ ∠ABD = ∠ADB (等腰△底角)',
        '∠ABD = (180° - 70°) ÷ 2 = 55°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="110" r="70" fill="none" stroke="black" strokeWidth="1.5" />
          <polygon points="160,40 100,144 160,180 220,144" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="144" x2="220" y2="144" stroke="black" strokeWidth="1.5" />
          <text x="155" y="30" fontSize="14">A</text>
          <text x="85" y="150" fontSize="14">B</text>
          <text x="155" y="195" fontSize="14">C</text>
          <text x="230" y="150" fontSize="14">D</text>
          <line x1="125" y1="92" x2="135" y2="92" stroke="black" strokeWidth="1.5" />
          <line x1="185" y1="92" x2="195" y2="92" stroke="black" strokeWidth="1.5" />
          <AngleArc cx={160} cy={180} r={20} startAngle={210} endAngle={330} label="110°" labelOffset={15} />
          <AngleArc cx={100} cy={144} r={25} startAngle={300} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-13',
      difficulty: '難',
      level: 'F4-F6',
      title: '切線與圓周角 (Mixed)',
      text: '圖中，直線 TA 切圓於 A，B 和 C 為圓上的點。已知 ∠TAC = 75° 及 ∠BAC = 35°，求 ∠ABC。',
      answer: 75,
      steps: [
        '∠ABC = ∠TAC = 75° (交錯弓形的圓周角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="100" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="80" y1="160" x2="240" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="160" x2="110" y2="66.8" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="160" x2="212" y2="70" stroke="black" strokeWidth="1.5" />
          <line x1="110" y1="66.8" x2="212" y2="70" stroke="black" strokeWidth="1.5" />
          <text x="165" y="175" fontSize="14">A</text>
          <text x="95" y="60" fontSize="14">B</text>
          <text x="225" y="65" fontSize="14">C</text>
          <text x="70" y="165" fontSize="14">T</text>
          <AngleArc cx={160} cy={160} r={25} startAngle={180} endAngle={300} label="75°" labelOffset={15} />
          <AngleArc cx={160} cy={160} r={35} startAngle={240} endAngle={300} label="35°" labelOffset={15} />
          <AngleArc cx={110} cy={66.8} r={20} startAngle={0} endAngle={60} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-14',
      difficulty: '中',
      level: 'F4-F6',
      title: '正弦公式 (Sine Formula)',
      text: '圖中，△ABC 中，AB = 10，BC = 10√2，∠BAC = 45°。求 ∠ACB。',
      answer: 30,
      steps: [
        'BC / sin A = AB / sin C (正弦公式)',
        '10√2 / sin 45° = 10 / sin C',
        '10√2 / (1/√2) = 10 / sin C',
        '20 = 10 / sin C',
        'sin C = 1/2',
        '∠ACB = 30°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="60,160 260,160 160,60" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="45" y="165" fontSize="14">A</text>
          <text x="270" y="165" fontSize="14">C</text>
          <text x="155" y="50" fontSize="14">B</text>
          <text x="95" y="100" fontSize="14">10</text>
          <text x="215" y="100" fontSize="14">10√2</text>
          <AngleArc cx={60} cy={160} r={25} startAngle={315} endAngle={360} label="45°" labelOffset={15} />
          <AngleArc cx={260} cy={160} r={25} startAngle={180} endAngle={225} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-15',
      difficulty: '中',
      level: 'F4-F6',
      title: '餘弦公式 (Cosine Formula)',
      text: '圖中，△ABC 中，AB = 3，BC = 5，AC = 7。求 ∠ABC。',
      answer: 120,
      steps: [
        'AC² = AB² + BC² - 2(AB)(BC)cos B (餘弦公式)',
        '7² = 3² + 5² - 2(3)(5)cos B',
        '49 = 9 + 25 - 30cos B',
        '15 = -30cos B',
        'cos B = -1/2',
        '∠ABC = 120°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="160,160 260,160 110,73.4" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="155" y="180" fontSize="14">B</text>
          <text x="270" y="165" fontSize="14">C</text>
          <text x="95" y="65" fontSize="14">A</text>
          <text x="120" y="130" fontSize="14">3</text>
          <text x="210" y="180" fontSize="14">5</text>
          <text x="190" y="105" fontSize="14">7</text>
          <AngleArc cx={160} cy={160} r={20} startAngle={240} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-16',
      difficulty: '中',
      level: 'F4-F6',
      title: '三角形面積 (Area of Triangle)',
      text: '圖中，△ABC 的面積為 15。已知 AB = 6，AC = 10，且 ∠BAC 為銳角。求 ∠BAC。',
      answer: 30,
      steps: [
        '面積 = 1/2 × AB × AC × sin A',
        '15 = 1/2 × 6 × 10 × sin A',
        '15 = 30 sin A',
        'sin A = 1/2',
        '∠BAC = 30°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="60,160 260,160 233.2,60" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="45" y="165" fontSize="14">A</text>
          <text x="270" y="165" fontSize="14">C</text>
          <text x="235" y="50" fontSize="14">B</text>
          <text x="135" y="100" fontSize="14">6</text>
          <text x="160" y="180" fontSize="14">10</text>
          <text x="160" y="130" fontSize="14" fill="blue">面積 = 15</text>
          <AngleArc cx={60} cy={160} r={30} startAngle={330} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-18',
      difficulty: '難',
      level: 'F4-F6',
      title: '3D 三角學 (Angle between two planes)',
      text: '圖中，VABC 是一個角錐體，底 ABC 是直角三角形，∠ABC = 90°。VA 垂直於底 ABC。已知 VA = 4，AB = 4。求平面 VBC 與平面 ABC 的交角。',
      answer: 45,
      steps: [
        '∵ VA ⊥ 平面 ABC，AB ⊥ BC',
        '∴ VB ⊥ BC (三垂線定理)',
        '交角為 ∠VBA。',
        'tan ∠VBA = VA / AB = 4 / 4 = 1',
        '∠VBA = 45°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="100,160 220,160 160,100" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="160" x2="100" y2="40" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="40" x2="220" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="40" x2="160" y2="100" stroke="black" strokeWidth="1.5" />
          <text x="85" y="170" fontSize="14">A</text>
          <text x="230" y="170" fontSize="14">B</text>
          <text x="165" y="95" fontSize="14">C</text>
          <text x="95" y="30" fontSize="14">V</text>
          <text x="85" y="100" fontSize="14">4</text>
          <text x="160" y="180" fontSize="14">4</text>
          <polyline points="210,160 210,150 220,150" fill="none" stroke="black" strokeWidth="1.5" />
          <AngleArc cx={220} cy={160} r={25} startAngle={180} endAngle={225} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-21',
      difficulty: '難',
      level: 'F4-F6',
      title: '圓的方程 (Equation of Circle)',
      text: '圓 C 的方程為 x² + y² - 4x - 4y = 0。直線 L 在原點 O(0,0) 與圓 C 相切。求 L 的傾角。',
      answer: 135,
      steps: [
        '圓心坐標 = (-(-4)/2, -(-4)/2) = (2, 2)',
        '半徑與原點的斜率 = (2 - 0) / (2 - 0) = 1',
        '切線 L 垂直於半徑，∴ L 的斜率 = -1',
        'tan θ = -1 => θ = 135°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="200" x2="100" y2="40" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="100" r="84.8" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="60" y1="120" x2="140" y2="200" stroke="blue" strokeWidth="2" />
          <circle cx="100" cy="160" r="3" fill="black" />
          <circle cx="160" cy="100" r="3" fill="black" />
          <text x="85" y="175" fontSize="14">O</text>
          <text x="165" y="95" fontSize="14">(2, 2)</text>
          <text x="270" y="175" fontSize="14">x</text>
          <text x="85" y="50" fontSize="14">y</text>
          <text x="50" y="115" fontSize="14" fill="blue">L</text>
          <AngleArc cx={100} cy={160} r={25} startAngle={135} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-22',
      difficulty: '中',
      level: 'F4-F6',
      title: '圓定理 (Intersecting Chords)',
      text: '圖中，弦 AB 和 CD 相交於 E。已知 ∠CAB = 30° 及 ∠ACD = 50°，求 ∠AED。',
      answer: 80,
      steps: [
        '在 △ACE 中，∠AED 是外角。',
        '∠AED = ∠CAE + ∠ACE (△外角)',
        '∠AED = 30° + 50° = 80°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="110" r="70" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="74" x2="220" y2="146" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="146" x2="220" y2="74" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="74" x2="100" y2="146" stroke="black" strokeWidth="1.5" />
          <text x="85" y="70" fontSize="14">A</text>
          <text x="230" y="155" fontSize="14">B</text>
          <text x="85" y="160" fontSize="14">C</text>
          <text x="230" y="70" fontSize="14">D</text>
          <text x="160" y="130" fontSize="14">E</text>
          <AngleArc cx={100} cy={74} r={25} startAngle={31} endAngle={90} label="30°" labelOffset={15} />
          <AngleArc cx={100} cy={146} r={25} startAngle={270} endAngle={329} label="50°" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={20} startAngle={149} endAngle={211} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-23',
      difficulty: '淺',
      level: 'F4-F6',
      title: '圓定理 (Parallel chords)',
      text: '圖中，AB 和 CD 是圓的兩條平行弦。已知 ∠BAC = 25°，求 ∠ACD。',
      answer: 25,
      steps: [
        '∠ACD = ∠BAC = 25° (內錯角，AB // CD)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="110" r="70" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="74" x2="220" y2="74" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="146" x2="220" y2="146" stroke="black" strokeWidth="1.5" />
          <line x1="100" y1="74" x2="220" y2="146" stroke="black" strokeWidth="1.5" />
          <text x="85" y="70" fontSize="14">A</text>
          <text x="230" y="70" fontSize="14">B</text>
          <text x="230" y="155" fontSize="14">C</text>
          <text x="85" y="155" fontSize="14">D</text>
          <line x1="155" y1="74" x2="165" y2="69" stroke="black" strokeWidth="1.5" />
          <line x1="155" y1="74" x2="165" y2="79" stroke="black" strokeWidth="1.5" />
          <line x1="155" y1="146" x2="165" y2="141" stroke="black" strokeWidth="1.5" />
          <line x1="155" y1="146" x2="165" y2="151" stroke="black" strokeWidth="1.5" />
          <AngleArc cx={100} cy={74} r={30} startAngle={0} endAngle={31} label="25°" labelOffset={15} />
          <AngleArc cx={220} cy={146} r={30} startAngle={180} endAngle={211} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-24',
      difficulty: '中',
      level: 'F4-F6',
      title: '圓定理 (Diameter and tangent)',
      text: '圖中，AB 為圓的直徑，直線 TA 切圓於 A，C 為圓上的一點。已知 ∠CBA = 32°，求 ∠CAT。',
      answer: 32,
      steps: [
        '∠CAT = ∠CBA = 32° (交錯弓形的圓周角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="110" r="70" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="90" y1="110" x2="230" y2="110" stroke="black" strokeWidth="1.5" />
          <line x1="90" y1="110" x2="129.3" y2="47.1" stroke="black" strokeWidth="1.5" />
          <line x1="230" y1="110" x2="129.3" y2="47.1" stroke="black" strokeWidth="1.5" />
          <line x1="90" y1="40" x2="90" y2="180" stroke="black" strokeWidth="1.5" />
          <text x="75" y="115" fontSize="14">A</text>
          <text x="240" y="115" fontSize="14">B</text>
          <text x="135" y="40" fontSize="14">C</text>
          <text x="75" y="45" fontSize="14">T</text>
          <AngleArc cx={230} cy={110} r={40} startAngle={180} endAngle={212} label="32°" labelOffset={15} />
          <AngleArc cx={90} cy={110} r={25} startAngle={270} endAngle={302} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-25',
      difficulty: '中',
      level: 'F4-F6',
      title: '圓定理 (Cyclic quad and parallel lines)',
      text: '圖中，ABCD 為圓內接四邊形，AB // DC。已知 ∠DAB = 100°，求 ∠ADC。',
      answer: 80,
      steps: [
        '∠ADC + ∠DAB = 180° (同旁內角，AB // DC)',
        '∠ADC = 180° - 100° = 80°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="110" r="70" fill="none" stroke="black" strokeWidth="1.5" />
          <polygon points="100,74 220,74 200,167.4 120,167.4" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="85" y="70" fontSize="14">A</text>
          <text x="230" y="70" fontSize="14">B</text>
          <text x="210" y="185" fontSize="14">C</text>
          <text x="105" y="185" fontSize="14">D</text>
          <line x1="155" y1="74" x2="165" y2="69" stroke="black" strokeWidth="1.5" />
          <line x1="155" y1="74" x2="165" y2="79" stroke="black" strokeWidth="1.5" />
          <line x1="155" y1="167.4" x2="165" y2="162.4" stroke="black" strokeWidth="1.5" />
          <line x1="155" y1="167.4" x2="165" y2="172.4" stroke="black" strokeWidth="1.5" />
          <AngleArc cx={100} cy={74} r={20} startAngle={0} endAngle={78} label="100°" labelOffset={15} />
          <AngleArc cx={120} cy={167.4} r={20} startAngle={258} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-26',
      difficulty: '難',
      level: 'F4-F6',
      title: '圓定理 (Tangent and secant)',
      text: '圖中，直線 TA 切圓於 A，TBC 是一條割線。已知 ∠ATB = 40° 及 ∠TAB = 30°，求 ∠ACT。',
      answer: 30,
      steps: [
        '∠ACT = ∠TAB = 30° (交錯弓形的圓周角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="200" cy="110" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="60" y1="160" x2="170" y2="58" stroke="black" strokeWidth="1.5" />
          <line x1="60" y1="160" x2="260" y2="110" stroke="black" strokeWidth="1.5" />
          <line x1="170" y1="58" x2="145" y2="134" stroke="black" strokeWidth="1.5" />
          <line x1="170" y1="58" x2="260" y2="110" stroke="black" strokeWidth="1.5" />
          <text x="45" y="165" fontSize="14">T</text>
          <text x="175" y="45" fontSize="14">A</text>
          <text x="135" y="150" fontSize="14">B</text>
          <text x="270" y="115" fontSize="14">C</text>
          <AngleArc cx={60} cy={160} r={30} startAngle={317} endAngle={346} label="40°" labelOffset={15} />
          <AngleArc cx={170} cy={58} r={30} startAngle={105} endAngle={137} label="30°" labelOffset={15} />
          <AngleArc cx={260} cy={110} r={30} startAngle={166} endAngle={210} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-27',
      difficulty: '淺',
      level: 'F4-F6',
      title: '3D 三角學 (Angle of elevation)',
      text: '圖中，AB 是一支垂直的旗桿，C 是地面上的一點。已知 AB = 10 m，AC = 10 m。求從 C 測 B 的仰角。',
      answer: 45,
      steps: [
        '仰角為 ∠BCA。',
        'tan ∠BCA = AB / AC = 10 / 10 = 1',
        '∠BCA = 45°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <polygon points="100,160 220,160 100,40" fill="none" stroke="black" strokeWidth="1.5" />
          <polyline points="100,150 110,150 110,160" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="85" y="170" fontSize="14">A</text>
          <text x="230" y="170" fontSize="14">C</text>
          <text x="85" y="40" fontSize="14">B</text>
          <text x="75" y="105" fontSize="14">10</text>
          <text x="155" y="180" fontSize="14">10</text>
          <AngleArc cx={220} cy={160} r={25} startAngle={180} endAngle={225} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-29',
      difficulty: '中',
      level: 'F4-F6',
      title: '坐標幾何 (Intersection of line and circle)',
      text: '圓 C 的方程為 x² + y² = 4。直線 y = 2 與圓 C 相交於點 P。求 OP 與 x 軸正方向的交角。',
      answer: 90,
      steps: [
        '代入 y = 2 到 x² + y² = 4，得 x² + 4 = 4 => x = 0',
        '交點 P 為 (0, 2)',
        'OP 在 y 軸上，與 x 軸正方向的交角為 90°'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="200" x2="160" y2="40" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="160" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="40" y1="100" x2="280" y2="100" stroke="blue" strokeWidth="2" />
          <circle cx="160" cy="160" r="3" fill="black" />
          <circle cx="160" cy="100" r="3" fill="black" />
          <text x="145" y="175" fontSize="14">O</text>
          <text x="145" y="90" fontSize="14">P</text>
          <text x="270" y="175" fontSize="14">x</text>
          <text x="145" y="50" fontSize="14">y</text>
          <text x="260" y="90" fontSize="14" fill="blue">y = 2</text>
          <AngleArc cx={160} cy={160} r={20} startAngle={270} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
      id: 'S-30',
      difficulty: '難',
      level: 'F4-F6',
      title: '綜合圓定理 (Mixed Circle Theorems)',
      text: '圖中，O 為圓心，TA 和 TC 分別切圓於 A 和 C。已知 ∠ATC = 50°，求 ∠ABC。',
      answer: 65,
      steps: [
        '∠OAT = ∠OCT = 90° (切線 ⊥ 半徑)',
        '∠AOC = 360° - 90° - 90° - 50° = 130° (多邊形內角和)',
        '∠ABC = ∠AOC ÷ 2 = 65° (圓心角兩倍於圓周角)'
      ],
      renderSVG: (showHint) => (
        <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
          <circle cx="160" cy="70" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="212" x2="105.6" y2="95.4" stroke="black" strokeWidth="1.5" />
          <line x1="160" y1="212" x2="214.4" y2="95.4" stroke="black" strokeWidth="1.5" />
          <line x1="105.6" y1="95.4" x2="160" y2="10" stroke="black" strokeWidth="1.5" />
          <line x1="214.4" y1="95.4" x2="160" y2="10" stroke="black" strokeWidth="1.5" />
          <circle cx="160" cy="70" r="3" fill="black" />
          <text x="165" y="75" fontSize="14">O</text>
          <text x="155" y="205" fontSize="14">T</text>
          <text x="90" y="100" fontSize="14">A</text>
          <text x="225" y="100" fontSize="14">C</text>
          <text x="155" y="25" fontSize="14">B</text>
          <AngleArc cx={160} cy={212} r={30} startAngle={245} endAngle={295} label="50°" labelOffset={15} />
          <AngleArc cx={160} cy={10} r={25} startAngle={57.5} endAngle={122.5} label="" labelOffset={15} isHighlighted={showHint} />
          {showHint && (
            <>
              <line x1="160" y1="70" x2="105.6" y2="95.4" stroke="red" strokeWidth="1.5" strokeDasharray="4" />
              <line x1="160" y1="70" x2="214.4" y2="95.4" stroke="red" strokeWidth="1.5" strokeDasharray="4" />
            </>
          )}
        </svg>
      )
    }
  ]
};

export default function AngleMasterQuiz() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedDiffs, setSelectedDiffs] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [drawMode, setDrawMode] = useState('pen');
  const [penColor, setPenColor] = useState('rgba(220,50,50,0.85)');
  const [showHint, setShowHint] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const ADMIN_PW = '1234';

  const handleAdminLogin = () => {
    const pw = window.prompt('Admin 密碼：');
    if (pw === ADMIN_PW) setShowAdmin(true);
    else if (pw !== null) window.alert('密碼錯誤！');
  };
  
  const canvasRef = useRef(null);

  useEffect(() => {
    if (currentScreen !== 'question') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    const ctx = canvas.getContext('2d');

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const handleStart = (e) => {
      e.preventDefault();
      isDrawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
    };

    const handleMove = (e) => {
      e.preventDefault();
      if (!isDrawing) return;
      const pos = getPos(e);
      
      if (drawMode === 'pen') {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = penColor;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      } else if (drawMode === 'eraser') {
        ctx.clearRect(pos.x - 30, pos.y - 30, 60, 60);
      }
      lastX = pos.x;
      lastY = pos.y;
    };

    const handleEnd = (e) => {
      e.preventDefault();
      isDrawing = false;
    };

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd, { passive: false });
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('mouseleave', handleEnd);
    };
  }, [currentScreen, drawMode, penColor]);

  const handleStartMixed = () => {
    let pool = [];
    Object.keys(QUESTIONS).forEach(level => {
      if (selectedLevels.includes(level)) {
        pool = pool.concat(QUESTIONS[level].filter(q => selectedDiffs.includes(q.difficulty)));
      }
    });
    
    if (pool.length === 0) {
      alert('請至少選擇一個級別和難度！');
      return;
    }
    
    // Shuffle the pool to mix questions
    pool.sort(() => Math.random() - 0.5);
    
    setActiveQuestions(pool);
    setCurrentQuestionIndex(0);
    setCurrentScreen('question');
    setUserAnswer('');
    setIsSubmitted(false);
    setDrawMode('pen');
    setShowHint(false);
    setShowColorPicker(false);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % activeQuestions.length);
    setUserAnswer('');
    setIsSubmitted(false);
    setDrawMode('pen');
    setShowHint(false);
    setShowColorPicker(false);
    clearCanvas();
  };

  const handleSubmit = () => {
    if (!userAnswer) return;
    setIsSubmitted(true);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Admin Mode: full-page gallery of all SVGs
  if (showAdmin) {
    const allQ = Object.values(QUESTIONS).flat();
    const DIFF_COLORS = { '淺': 'bg-green-100 text-green-800', '中': 'bg-yellow-100 text-yellow-800', '難': 'bg-red-100 text-red-800' };
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-gray-100 py-2 z-10 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800">🔧 Admin 圖表總覽</h2>
          <button onClick={() => setShowAdmin(false)} className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700">
            ← 返回
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allQ.map((q) => (
            <div key={q.id} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
              <div className="aspect-[320/220]">{q.renderSVG(false)}</div>
              <div className="p-2 border-t border-gray-100">
                <div className="flex items-center gap-1 flex-wrap mb-1">
                  <span className="font-mono font-bold text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{q.id}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${DIFF_COLORS[q.difficulty]}`}>{q.difficulty}</span>
                </div>
                <p className="text-xs text-gray-700 leading-tight">{q.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 p-4 flex flex-col items-center justify-center">
        <div className="absolute top-4 left-4">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm">
            <HomeIcon className="w-5 h-5 mr-2" />
            <span className="font-bold">返回主頁</span>
          </Link>
        </div>
        <div className="absolute top-4 right-4">
          <button onClick={handleAdminLogin} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 bg-white/70 hover:bg-white px-3 py-1.5 rounded-lg text-xs border border-gray-200 shadow-sm transition-colors">
            🔧 Admin
          </button>
        </div>
        
        <h1 className="text-4xl font-bold text-blue-800 mb-2">尋找圖形角度</h1>
        <h2 className="text-xl text-blue-600 mb-8">Angle Master</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-4">自訂訓練模式 (混合模式)</h3>
          
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-2">選擇級別 (可多選)</h4>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 cursor-pointer bg-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-700 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedLevels.length === 4}
                  onChange={(e) => setSelectedLevels(e.target.checked ? ['F1', 'F2', 'F3', 'Senior'] : [])}
                  className="w-5 h-5 rounded focus:ring-blue-300"
                />
                <span className="text-lg font-bold text-white">全部 (F1–F6)</span>
              </label>
              {['F1', 'F2', 'F3', 'Senior'].map(lvl => (
                <label key={lvl} className="flex items-center gap-2 cursor-pointer bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedLevels.includes(lvl)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedLevels([...selectedLevels, lvl]);
                      else setSelectedLevels(selectedLevels.filter(l => l !== lvl));
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-lg font-bold text-blue-800">{lvl === 'Senior' ? 'F4-F6' : lvl}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-2">選擇難度 (可多選)</h4>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 cursor-pointer bg-green-600 px-4 py-2 rounded-lg border border-green-600 hover:bg-green-700 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedDiffs.length === 3}
                  onChange={(e) => setSelectedDiffs(e.target.checked ? ['淺', '中', '難'] : [])}
                  className="w-5 h-5 rounded focus:ring-green-300"
                />
                <span className="text-lg font-bold text-white">全部混合</span>
              </label>
              {['淺', '中', '難'].map(diff => (
                <label key={diff} className="flex items-center gap-2 cursor-pointer bg-green-50 px-4 py-2 rounded-lg border border-green-100 hover:bg-green-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedDiffs.includes(diff)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedDiffs([...selectedDiffs, diff]);
                      else setSelectedDiffs(selectedDiffs.filter(d => d !== diff));
                    }}
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-lg font-bold text-green-800">{diff}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            onClick={handleStartMixed}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            開始訓練 Start Quiz
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 p-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-blue-800 text-center">中學圖形定理概覽</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">F1</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 直線上的鄰角</li>
                <li>• 對頂角</li>
                <li>• 同位角</li>
                <li>• 內錯角</li>
                <li>• 同旁內角</li>
                <li>• 三角形內角和</li>
              </ul>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">F2</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 三角形外角</li>
                <li>• 多邊形內角和</li>
                <li>• 多邊形外角和</li>
                <li>• 等腰三角形性質</li>
                <li>• 等邊三角形性質</li>
                <li>• 等角對邊相等</li>
                <li>• 畢氏定理</li>
              </ul>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">F3</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 平行四邊形性質</li>
                <li>• 菱形性質</li>
                <li>• 長方形性質</li>
                <li>• 正方形性質</li>
                <li>• 中點定理</li>
                <li>• 截線定理</li>
              </ul>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">F4-F6</h4>
              <div className="grid grid-cols-2 gap-x-2 text-gray-600">
                <ul className="space-y-2">
                  <li>• 圓心角與圓周角</li>
                  <li>• 半圓上的圓周角</li>
                  <li>• 同弓形內的圓周角</li>
                  <li>• 圓內接四邊形對角</li>
                  <li>• 圓內接四邊形外角</li>
                  <li>• 交錯弓形的圓周角</li>
                  <li>• 切線 ⊥ 半徑</li>
                </ul>
                <ul className="space-y-2">
                  <li>• 等角對等弧</li>
                  <li>• 等弧對等角</li>
                  <li>• 等角對等弦</li>
                  <li>• 等弦對等角</li>
                  <li>• 等弧對等弦</li>
                  <li>• 等弦對等弧</li>
                  <li>• 切線性質</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = activeQuestions[currentQuestionIndex];
  const isCorrect = parseInt(userAnswer) === q.answer;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="font-bold text-lg">[{q.id}] {q.level === 'Senior' ? 'F4-F6' : q.level} - {q.title} ({q.difficulty})</div>
        <div className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {currentQuestionIndex + 1} / {activeQuestions.length}
        </div>
      </div>

      <div className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col gap-4">
        {/* Figure Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
          {/* Hint button — floats top-right of figure */}
          <button
            onClick={() => setShowHint(!showHint)}
            className={`absolute top-2 right-2 z-20 p-2 rounded-lg shadow border ${
              showHint ? 'bg-yellow-100 border-yellow-400 text-yellow-600' : 'bg-white/90 border-gray-200 text-gray-500 hover:bg-gray-100'
            }`}
            title="提示"
          >
            <Lightbulb className="w-5 h-5" />
          </button>

          {/* Drawing toolbar — bottom-left of figure */}
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 bg-white/90 p-1 rounded-lg shadow-sm border border-gray-200">
            {/* Pen button: shows current color, click toggles color picker */}
            <div className="relative">
              <button
                onClick={() => { setDrawMode('pen'); setShowColorPicker(v => !v); }}
                className={`p-1.5 rounded flex items-center gap-1 ${
                  drawMode === 'pen' ? 'bg-gray-100' : 'hover:bg-gray-100'
                }`}
                title="畫筆"
              >
                <Pen className="w-5 h-5" style={{ color: penColor.replace(/[^,]+(?=\))/, '1') }} />
              </button>
              {showColorPicker && (
                <div className="absolute bottom-full mb-1 left-0 flex flex-row gap-1 bg-white/95 p-1.5 rounded-lg shadow-md border border-gray-200">
                  {[
                    { color: 'rgba(220,50,50,0.85)', bg: 'bg-red-500', ring: 'ring-red-500' },
                    { color: 'rgba(50,50,220,0.85)', bg: 'bg-blue-500', ring: 'ring-blue-500' },
                    { color: 'rgba(50,180,50,0.85)', bg: 'bg-green-500', ring: 'ring-green-500' },
                    { color: 'rgba(30,30,30,0.90)', bg: 'bg-gray-800', ring: 'ring-gray-800' },
                  ].map(({ color, bg, ring }) => (
                    <button
                      key={color}
                      onClick={() => { setPenColor(color); setShowColorPicker(false); }}
                      className={`w-7 h-7 rounded-full ${bg} ${
                        penColor === color ? `ring-2 ring-offset-1 ${ring}` : ''
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => { setDrawMode('eraser'); setShowColorPicker(false); }}
              className={`p-1.5 rounded ${
                drawMode === 'eraser' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Eraser className="w-5 h-5" />
            </button>
            <button
              onClick={() => { clearCanvas(); setShowColorPicker(false); }}
              className="p-1.5 rounded text-gray-600 hover:bg-gray-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="relative w-full aspect-[320/220] bg-[#f5f5f5] touch-none">
            {q.renderSVG(showHint)}
            <canvas
              ref={canvasRef}
              width={640}
              height={440}
              className="absolute inset-0 w-full h-full z-0"
              style={{ touchAction: 'none' }}
            />
          </div>
        </div>

        {/* Question Text */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-lg">
          {q.text}
        </div>

        {/* Answer Input */}
        {!isSubmitted ? (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-4 items-center">
            <span className="text-lg font-bold whitespace-nowrap">答案 Answer:</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value.replace(/[^0-9]/g, ''))}
              className="flex-1 border-2 border-gray-300 rounded-lg p-2 text-lg focus:border-blue-500 focus:outline-none min-w-0"
              placeholder="輸入數值..."
            />
            <span className="text-lg">{q.unit !== undefined ? q.unit : '°'}</span>
            <button
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50 whitespace-nowrap"
            >
              提交 Submit
            </button>
          </div>
        ) : (
          <div className={`p-6 rounded-xl shadow-sm border-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '✅ 答對了！ Correct!' : '❌ 答錯了！ Wrong!'}
            </div>
            <div className="space-y-2 text-lg">
              <div className="font-bold text-gray-700 mb-2">解題步驟 Solution:</div>
              {q.steps.map((step, i) => (
                <div key={i} className="text-gray-800 font-mono bg-white/50 p-2 rounded">{step}</div>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
            >
              下一題 Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
