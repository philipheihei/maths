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
  'F1': {
    level: 'F1',
    title: '平行線 (Alternate Angles)',
    text: '圖中，AB // CD，直線 PQ 分別與 AB 和 CD 相交於 M 和 N。已知 ∠AMQ = 65°，求 ∠MND。',
    answer: 65,
    steps: [
      '∠MND = ∠AMQ = 65° (錯角，AB // CD)'
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
  'F2': {
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
  'F3': {
    level: 'F3',
    title: '圓心角與圓周角 (Angle at Centre and Circumference)',
    text: '圖中，O 為圓心，A、B、C 為圓上的點。已知 ∠BOC = 100°，求 ∠BAC。',
    answer: 50,
    steps: [
      '∠BAC = ½ × ∠BOC (圓心角兩倍於圓周角)',
      '∠BAC = ½ × 100°',
      '∠BAC = 50°'
    ],
    renderSVG: (showHint) => (
      <svg viewBox="0 0 320 220" className="w-full h-full bg-[#f5f5f5]">
        <circle cx="160" cy="120" r="80" fill="none" stroke="black" strokeWidth="1.5" />
        
        <line x1="160" y1="120" x2="221.3" y2="171.4" stroke="black" strokeWidth="1.5" />
        <line x1="160" y1="120" x2="98.7" y2="171.4" stroke="black" strokeWidth="1.5" />
        <line x1="160" y1="40" x2="221.3" y2="171.4" stroke="black" strokeWidth="1.5" />
        <line x1="160" y1="40" x2="98.7" y2="171.4" stroke="black" strokeWidth="1.5" />
        
        <circle cx="160" cy="120" r="3" fill="black" />
        <circle cx="160" cy="40" r="3" fill="black" />
        <circle cx="221.3" cy="171.4" r="3" fill="black" />
        <circle cx="98.7" cy="171.4" r="3" fill="black" />
        
        <text x="160" y="110" fontSize="14" textAnchor="middle">O</text>
        <text x="160" y="25" fontSize="14" textAnchor="middle">A</text>
        <text x="235" y="185" fontSize="14">B</text>
        <text x="80" y="185" fontSize="14">C</text>
        
        <AngleArc cx={160} cy={120} r={20} startAngle={40} endAngle={140} label="100°" labelOffset={15} />
        <AngleArc cx={160} cy={40} r={25} startAngle={65} endAngle={115} label="" labelOffset={15} isHighlighted={showHint} />
      </svg>
    )
  },
  'Senior': {
    level: '高中 Senior',
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
        
        <text x="165" y="205" fontSize="14">A</text>
        <text x="65" y="125" fontSize="14">B</text>
        <text x="225" y="45" fontSize="14">C</text>
        <text x="60" y="205" fontSize="14">T</text>
        
        <AngleArc cx={160} cy={190} r={25} startAngle={180} endAngle={218} label="38°" labelOffset={15} />
        <AngleArc cx={216.6} cy={53.4} r={25} startAngle={112.5} endAngle={150.5} label="" labelOffset={15} isHighlighted={showHint} />
      </svg>
    )
  }
};

export default function AngleMasterQuiz() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [drawMode, setDrawMode] = useState('pen');
  const [penColor, setPenColor] = useState('rgba(220,50,50,0.85)');
  const [showHint, setShowHint] = useState(false);
  
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
    setCurrentScreen('question');
    setUserAnswer('');
    setIsSubmitted(false);
    setDrawMode('pen');
    setShowHint(false);
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
          {Object.keys(QUESTIONS).map(level => (
            <button
              key={level}
              onClick={() => handleLevelSelect(level)}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-blue-100 hover:border-blue-300 flex items-center justify-between"
            >
              <span className="text-2xl font-bold text-gray-800 w-24 text-left">{QUESTIONS[level].level}</span>
              <span className="text-lg text-gray-600 flex-1 text-left">{QUESTIONS[level].title}</span>
            </button>
          ))}
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
                <li>• 同頂角</li>
                <li>• 對頂角</li>
                <li>• 同位角</li>
                <li>• 錯角</li>
                <li>• 同旁內角</li>
                <li>• 三角形內角和</li>
                <li>• 三角形外角</li>
              </ul>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">F2</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 多邊形內角和</li>
                <li>• 多邊形外角和</li>
                <li>• 等腰三角形底角</li>
                <li>• 等邊對等角</li>
                <li>• 畢氏定理</li>
              </ul>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">F3</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 平行四邊形性質</li>
                <li>• 菱形性質</li>
                <li>• 矩形性質</li>
                <li>• 正方形性質</li>
                <li>• 中點定理</li>
                <li>• 截偶定理</li>
              </ul>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">高中</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 圓心角與圓周角</li>
                <li>• 半圓上的圓周角</li>
                <li>• 同弓形內的圓周角</li>
                <li>• 圓內接四邊形對角</li>
                <li>• 圓內接四邊形外角</li>
                <li>• 切線性質</li>
                <li>• 交錯弓形的圓周角</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[selectedLevel];
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
          {isSubmitted ? '1 / 1' : '0 / 1'}
        </div>
      </div>

      <div className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col gap-4">
        {/* Figure Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
          {/* Toolbar */}
          <div className="absolute top-2 right-2 z-10 flex gap-2 bg-white/90 p-1 rounded-lg shadow-sm border border-gray-200">
            <button 
              onClick={() => setShowHint(!showHint)}
              className={`p-2 rounded ${showHint ? 'bg-yellow-100 text-yellow-600' : 'text-gray-600 hover:bg-gray-100'}`}
              title="提示"
            >
              <Lightbulb className="w-5 h-5" />
            </button>
            <div className="w-px bg-gray-300 mx-1"></div>
            <div className="flex items-center gap-1 px-1">
              <button onClick={() => { setDrawMode('pen'); setPenColor('rgba(220,50,50,0.85)'); }} className={`w-6 h-6 rounded-full bg-red-500 ${drawMode === 'pen' && penColor === 'rgba(220,50,50,0.85)' ? 'ring-2 ring-offset-2 ring-red-500' : ''}`}></button>
              <button onClick={() => { setDrawMode('pen'); setPenColor('rgba(50,50,220,0.85)'); }} className={`w-6 h-6 rounded-full bg-blue-500 ${drawMode === 'pen' && penColor === 'rgba(50,50,220,0.85)' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}></button>
              <button onClick={() => { setDrawMode('pen'); setPenColor('rgba(50,200,50,0.85)'); }} className={`w-6 h-6 rounded-full bg-green-500 ${drawMode === 'pen' && penColor === 'rgba(50,200,50,0.85)' ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}></button>
              <button onClick={() => { setDrawMode('pen'); setPenColor('rgba(50,50,50,0.85)'); }} className={`w-6 h-6 rounded-full bg-gray-800 ${drawMode === 'pen' && penColor === 'rgba(50,50,50,0.85)' ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}></button>
            </div>
            <div className="w-px bg-gray-300 mx-1"></div>
            <button 
              onClick={() => setDrawMode('eraser')}
              className={`p-2 rounded ${drawMode === 'eraser' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Eraser className="w-5 h-5" />
            </button>
            <button 
              onClick={clearCanvas}
              className="p-2 rounded text-gray-600 hover:bg-gray-100"
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
              placeholder="輸入角度..."
            />
            <span className="text-lg">°</span>
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
              onClick={handleBack}
              className="mt-6 w-full bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700"
            >
              返回主頁 Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
