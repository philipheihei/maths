import React from 'react';
import AngleArc from '../../components/AngleArc';

export const questionsSenior = [
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
        <AngleArc cx={160} cy={160} r={30} startAngle={225} endAngle={292.5} label="" labelOffset={15} isHighlighted={showHint} />
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
];
