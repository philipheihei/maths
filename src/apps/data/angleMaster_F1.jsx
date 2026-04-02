import React from 'react';
import AngleArc from '../../components/AngleArc';

export const questionsF1 = [
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
        <text x="168" y="102" fontSize="14">O</text>
        <AngleArc cx={160} cy={110} r={25} startAngle={270} endAngle={400} label="130°" labelOffset={15} />
        <AngleArc cx={160} cy={110} r={35} startAngle={40} endAngle={180} label="140°" labelOffset={15} />
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
        <line x1="188.9" y1="30" x2="90.7" y2="200" stroke="black" strokeWidth="1.5" />
        <circle cx="160" cy="80" r="3" fill="black" />
        <circle cx="113.8" cy="160" r="3" fill="black" />
        <text x="30" y="85" fontSize="14">A</text>
        <text x="290" y="85" fontSize="14">B</text>
        <text x="30" y="165" fontSize="14">C</text>
        <text x="290" y="165" fontSize="14">D</text>
        <text x="175" y="25" fontSize="14">P</text>
        <text x="100" y="210" fontSize="14">Q</text>
        <text x="170" y="75" fontSize="14">M</text>
        <text x="125" y="155" fontSize="14">N</text>
        <AngleArc cx={160} cy={80} r={20} startAngle={180} endAngle={300} label="120°" labelOffset={15} />
        <AngleArc cx={113.8} cy={160} r={20} startAngle={180} endAngle={300} label="" labelOffset={15} isHighlighted={showHint} />
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
        <text x="110" y="70" fontSize="14">M</text>
        <text x="170" y="175" fontSize="14">N</text>
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
    text: '圖中，AB // CD，直線 PQ 分別與 AB 和 CD 相交於 M 和 N。已知 ∠AMN = 54° 及 ∠MNC = 3x，求 x。',
    answer: 42,
    steps: [
      '∠AMN + ∠MNC = 180° (同旁內角，AB // CD)',
      '54° + 3x = 180°',
      '3x = 126°',
      'x = 42°'
    ],
    renderSVG: (showHint) => (
      <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
        <line x1="40" y1="80" x2="280" y2="80" stroke="black" strokeWidth="1.5" />
        <line x1="40" y1="160" x2="280" y2="160" stroke="black" strokeWidth="1.5" />
        <line x1="196.3" y1="30" x2="72.8" y2="200" stroke="black" strokeWidth="1.5" />
        <circle cx="160" cy="80" r="3" fill="black" />
        <circle cx="101.9" cy="160" r="3" fill="black" />
        <text x="30" y="85" fontSize="14">A</text>
        <text x="290" y="85" fontSize="14">B</text>
        <text x="30" y="165" fontSize="14">C</text>
        <text x="290" y="165" fontSize="14">D</text>
        <text x="185" y="25" fontSize="14">P</text>
        <text x="80" y="210" fontSize="14">Q</text>
        <text x="170" y="70" fontSize="14">M</text>
        <text x="85" y="175" fontSize="14">N</text>
        <AngleArc cx={160} cy={80} r={20} startAngle={126} endAngle={180} label="54°" labelOffset={15} />
        <AngleArc cx={101.9} cy={160} r={20} startAngle={180} endAngle={306} label="3x" labelOffset={15} />
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
        <AngleArc cx={148} cy={40} r={25} startAngle={60} endAngle={132} label="6f" labelOffset={5} />
        <AngleArc cx={217.3} cy={160} r={20} startAngle={180} endAngle={240} label="5f" labelOffset={20} />
        <AngleArc cx={217.3} cy={160} r={25} startAngle={312} endAngle={360} label="48°" labelOffset={20} />
      </svg>
    )
  }
];
