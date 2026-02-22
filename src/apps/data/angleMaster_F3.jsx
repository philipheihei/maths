import React from 'react';
import AngleArc from '../../components/AngleArc';

export const questionsF3 = [
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
];
