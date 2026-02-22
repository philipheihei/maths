import React from 'react';
import AngleArc from '../../components/AngleArc';

export const questionsF2 = [
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
];
