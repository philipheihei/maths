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
          <text x="165" y="70" fontSize="14">M</text>
          <text x="130" y="150" fontSize="14">N</text>
          
          <AngleArc cx={160} cy={80} r={20} startAngle={115} endAngle={180} label="65°" labelOffset={15} />
          <AngleArc cx={122.7} cy={160} r={20} startAngle={295} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
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
          <AngleArc cx={160} cy={160} r={25} startAngle={288} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
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
          <text x="165" y="125" fontSize="14">O</text>
          <AngleArc cx={160} cy={110} r={25} startAngle={270} endAngle={400} label="130°" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={25} startAngle={40} endAngle={180} label="140°" labelOffset={15} />
          <AngleArc cx={160} cy={110} r={20} startAngle={180} endAngle={270} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    }
  ],
  'F2': [
    {
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
          <line x1="125" y1="110" x2="135" y2="110" stroke="black" strokeWidth="1.5" />
          <line x1="185" y1="110" x2="195" y2="110" stroke="black" strokeWidth="1.5" />
          <AngleArc cx={160} cy={40} r={25} startAngle={66.8} endAngle={113.2} label="40°" labelOffset={15} />
          <AngleArc cx={100} cy={180} r={20} startAngle={293.2} endAngle={360} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    }
  ],
  'F3': [
    {
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
      level: 'F3',
      title: '中點定理 (Mid-point Theorem)',
      text: '圖中，在 △ABC 中，D 和 E 分別是 AB 和 AC 的中點。已知 BC = 14，求 DE。',
      answer: 7,
      unit: '',
      steps: [
        'DE = BC / 2 (中點定理)',
        'DE = 14 / 2 = 7'
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
    }
  ],
  'Senior': [
    {
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
          
          <AngleArc cx={160} cy={190} r={30} startAngle={180} endAngle={218} label="38°" labelOffset={18} />
          <AngleArc cx={216.6} cy={53.4} r={25} startAngle={112.5} endAngle={150.5} label="" labelOffset={15} isHighlighted={showHint} />
        </svg>
      )
    },
    {
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
      level: 'F4-F6',
      title: '圓心角兩倍於圓周角 (∠ at centre twice ∠ at circumference)',
      text: '圖中，O 為圓心，A、B、C 為圓上的點。已知 ∠AOB = 110°，求 ∠ACB。',
      answer: 55,
      steps: [
        '∠ACB = ∠AOB / 2 (圓心角兩倍於圓周角)',
        '∠ACB = 110° / 2 = 55°'
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
    }
  ]
};

export default function AngleMasterQuiz() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [drawMode, setDrawMode] = useState('pen');
  const [penColor, setPenColor] = useState('rgba(220,50,50,0.85)');
  const [showHint, setShowHint] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  
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

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setCurrentQuestionIndex(0);
    setCurrentScreen('question');
    setUserAnswer('');
    setIsSubmitted(false);
    setDrawMode('pen');
    setShowHint(false);
    setShowColorPicker(false);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % QUESTIONS[selectedLevel].length);
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

  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 p-4 flex flex-col items-center justify-center">
        <div className="absolute top-4 left-4">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm">
            <HomeIcon className="w-5 h-5 mr-2" />
            <span className="font-bold">返回主頁</span>
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-blue-800 mb-2">尋找圖形角度</h1>
        <h2 className="text-xl text-blue-600 mb-8">Angle Master</h2>
        
        <div className="grid grid-cols-1 gap-4 w-full max-w-md mb-8">
          {Object.keys(QUESTIONS).map(level => {
            const LEVEL_TITLES = {
              'F1': '中一幾何定理',
              'F2': '中二幾何定理',
              'F3': '中三幾何定理',
              'Senior': '圓的性質'
            };
            return (
              <button
                key={level}
                onClick={() => handleLevelSelect(level)}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-blue-100 hover:border-blue-300 flex items-center justify-between"
              >
                <span className="text-2xl font-bold text-gray-800 w-24 text-left">{QUESTIONS[level][0].level}</span>
                <span className="text-lg text-gray-600 flex-1 text-left">{LEVEL_TITLES[level]}練習</span>
              </button>
            );
          })}
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

  const q = QUESTIONS[selectedLevel][currentQuestionIndex];
  const isCorrect = parseInt(userAnswer) === q.answer;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="font-bold text-lg">{q.level} - {q.title}</div>
        <div className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {currentQuestionIndex + 1} / {QUESTIONS[selectedLevel].length}
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
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300"
              >
                返回主頁 Back to Home
              </button>
              <button
                onClick={handleNextQuestion}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
              >
                下一題 Next Question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
