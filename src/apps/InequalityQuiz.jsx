import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, Delete, Trophy, HomeIcon } from 'lucide-react';

// --- Constants & Data ---
const TEXT_QUESTIONS = [
  { text: "x 小於 N", operator: "<", hint: "比它小，不包含它" },
  { text: "x 大於 N", operator: ">", hint: "比它大，不包含它" },
  { text: "x 小於或等於 N", operator: "<=", hint: "可以是它，或是比它小" },
  { text: "x 不大於 N", operator: "<=", hint: "「不大於」即是小於或等於 (≤)" },
  { text: "x 至大為 N", operator: "<=", hint: "最大只能是它，不能超過" },
  { text: "x 最多是 N", operator: "<=", hint: "最大只能是它，不能超過" },
  { text: "x 大於或等於 N", operator: ">=", hint: "可以是它，或是比它大" },
  { text: "x 不小於 N", operator: ">=", hint: "「不小於」即是大於或等於 (≥)" },
  { text: "x 至小為 N", operator: ">=", hint: "最小也要是它，不能更少" },
  { text: "x 最少是 N", operator: ">=", hint: "最小也要是它，不能更少" }
];

const GRAPH_TYPES = ['<', '>', '<=', '>='];

// --- Utility Functions ---
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- Components ---

// 1. Keypad Component (Reorganized)
const Keypad = ({ onKeyPress, onDelete, onSubmit, disabled }) => {
  // Top row: Only Inequalities (4 items to match 4 columns of numpad)
  const topRowKeys = ['<', '>', '≤', '≥'];
  
  const handlePress = (k) => {
    if (disabled) return;
    if (k === 'Enter') onSubmit();
    else if (k === 'Del') onDelete();
    else {
      let val = k;
      if (k === '≤') val = '<=';
      if (k === '≥') val = '>=';
      onKeyPress(val);
    }
  };

  return (
    <div className="mt-4 max-w-md mx-auto w-full flex flex-col gap-2">
      {/* Top Row: Operators */}
      <div className="grid grid-cols-4 gap-2">
        {topRowKeys.map((k) => (
          <button
            key={k}
            onClick={() => handlePress(k)}
            disabled={disabled}
            className="p-3 rounded-lg font-bold text-xl bg-blue-50 border border-blue-200 text-blue-800 shadow-[0_2px_0_rgba(0,0,0,0.05)] active:shadow-none active:translate-y-[2px] transition-all touch-manipulation hover:bg-blue-100"
          >
            {k}
          </button>
        ))}
      </div>

      {/* Bottom Grid: Numpad Style */}
      <div className="grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <KeyButton val="7" onClick={handlePress} disabled={disabled} />
        <KeyButton val="8" onClick={handlePress} disabled={disabled} />
        <KeyButton val="9" onClick={handlePress} disabled={disabled} />
        <button
            onClick={() => handlePress('Del')}
            disabled={disabled}
            className="p-3 rounded-lg font-bold text-lg bg-red-100 text-red-800 border border-red-200 shadow-[0_2px_0_rgba(0,0,0,0.05)] active:shadow-none active:translate-y-[2px] transition-all touch-manipulation flex items-center justify-center hover:bg-red-200"
        >
            <Delete size={24} />
        </button>

        {/* Row 2 */}
        <KeyButton val="4" onClick={handlePress} disabled={disabled} />
        <KeyButton val="5" onClick={handlePress} disabled={disabled} />
        <KeyButton val="6" onClick={handlePress} disabled={disabled} />
        <KeyButton val="-" onClick={handlePress} disabled={disabled} className="bg-slate-100 text-xl" />

        {/* Row 3 */}
        <KeyButton val="1" onClick={handlePress} disabled={disabled} />
        <KeyButton val="2" onClick={handlePress} disabled={disabled} />
        <KeyButton val="3" onClick={handlePress} disabled={disabled} />
        <KeyButton val="x" onClick={handlePress} disabled={disabled} className="bg-blue-50 text-blue-800 border-blue-200 text-xl italic" />

        {/* Row 4 */}
        <KeyButton val="0" onClick={handlePress} disabled={disabled} />
        <button
            onClick={() => handlePress('Enter')}
            disabled={disabled}
            className="col-span-3 p-3 rounded-lg font-bold text-lg bg-green-500 text-white shadow-[0_2px_0_#15803d] active:shadow-none active:translate-y-[2px] transition-all touch-manipulation hover:bg-green-600 flex items-center justify-center gap-2"
        >
            Enter <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const KeyButton = ({ val, onClick, disabled, className }) => (
    <button
        onClick={() => onClick(val)}
        disabled={disabled}
        className={`p-3 rounded-lg font-bold text-xl bg-white border border-slate-200 text-slate-700 shadow-[0_2px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[2px] transition-all touch-manipulation hover:bg-slate-50 ${className}`}
    >
        {val}
    </button>
);

// 2. SVG Number Line Component
const NumberLine = ({ value, operator }) => {
  if (!operator) return null;

  const width = 320;
  const height = 160; 
  
  const axisY = 120;  
  const graphY = 60;  
  
  const unitPixels = 40; 
  const range = 3; 

  const centerX = width / 2;
  
  const isRight = operator.includes('>');
  const isEqual = operator.includes('=');
  
  const ticks = [];
  for (let i = value - range; i <= value + range; i++) {
    const x = centerX + (i - value) * unitPixels;
    if (x > 10 && x < width - 10) {
      ticks.push(
        <g key={i}>
          <line x1={x} y1={axisY - 6} x2={x} y2={axisY + 6} stroke="#94a3b8" strokeWidth="2" />
          <text x={x} y={axisY + 30} textAnchor="middle" fontSize="14" fill="#64748b" fontWeight="600" fontFamily="monospace">{i}</text>
        </g>
      );
    }
  }

  return (
    <div className="flex justify-center overflow-hidden py-2">
        <svg width={width} height={height} className="bg-white rounded-xl border border-slate-200 shadow-sm">
        
        {/* --- 1. Axis --- */}
        <line x1="20" y1={axisY} x2={width - 20} y2={axisY} stroke="#cbd5e1" strokeWidth="2" />
        <polygon points={`${width-20},${axisY-5} ${width-5},${axisY} ${width-20},${axisY+5}`} fill="#cbd5e1" />
        <polygon points={`20,${axisY-5} 5,${axisY} 20,${axisY+5}`} fill="#cbd5e1" />
        
        {ticks}

        {/* --- 2. Graph --- */}
        <g>
            <line 
                x1={centerX} 
                y1={axisY} 
                x2={centerX} 
                y2={graphY} 
                stroke="#3b82f6" 
                strokeWidth="3" 
            />
            <line 
                x1={centerX} 
                y1={graphY} 
                x2={isRight ? width - 30 : 30} 
                y2={graphY} 
                stroke="#3b82f6" 
                strokeWidth="4" 
            />
            <polygon 
                points={isRight 
                ? `${width-30},${graphY-8} ${width-10},${graphY} ${width-30},${graphY+8}`
                : `30,${graphY-8} 10,${graphY} 30,${graphY+8}`
                } 
                fill="#3b82f6" 
            />
            <circle 
                cx={centerX} 
                cy={graphY} 
                r="7" 
                fill={isEqual ? "#3b82f6" : "white"} 
                stroke="#3b82f6" 
                strokeWidth="3" 
            />
        </g>
        </svg>
    </div>
  );
};

// --- Main App Component ---
export default function InequalityQuiz() {
  const [page, setPage] = useState('menu');
  const [score, setScore] = useState(0);
  // removed total state as it's no longer displayed
  
  const [currentQ, setCurrentQ] = useState(null);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('answering');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const generateTextQuestion = () => {
    const template = TEXT_QUESTIONS[Math.floor(Math.random() * TEXT_QUESTIONS.length)];
    const num = getRandomInt(-10, 10);
    const questionText = template.text.replace('N', num);
    const answer = `x${template.operator}${num}`;
    
    setCurrentQ({
      type: 'text',
      display: questionText,
      answer: answer,
      hint: template.hint,
      template: template
    });
    resetState();
  };

  const generateGraphQuestion = () => {
    const operator = GRAPH_TYPES[Math.floor(Math.random() * GRAPH_TYPES.length)];
    const num = getRandomInt(-5, 5);
    const answer = `x${operator}${num}`;

    setCurrentQ({
      type: 'graph',
      val: num,
      operator: operator,
      answer: answer
    });
    resetState();
  };

  const resetState = () => {
    setInput('');
    setStatus('answering');
    setFeedbackMsg('');
  };

  const handleInput = (val) => {
    setInput(prev => prev + val);
  };

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const checkAnswer = () => {
    if (!currentQ || status !== 'answering') return;

    const cleanInput = input.replace(/\s/g, '');
    const cleanAnswer = currentQ.answer;

    if (cleanInput === cleanAnswer) {
      setScore(s => s + 1);
      setStatus('correct');
      setFeedbackMsg('答對了！Excellent!');
    } else {
      setStatus('wrong');
      let explanation = "";
      if (currentQ.type === 'text') {
        explanation = `正確答案是 ${formatDisplay(cleanAnswer)}。\n提示：${currentQ.hint}`;
      } else {
        const isSolid = currentQ.operator.includes('=');
        const isRight = currentQ.operator.includes('>');
        
        explanation = `正確答案是 ${formatDisplay(cleanAnswer)}。\n`;
        explanation += `1. 觀察空心/實心圓點：${isSolid ? '實心 (包含等於)' : '空心 (不包含等於)'}。\n`;
        explanation += `2. 觀察箭頭方向：${isRight ? '指向右邊 (大於)' : '指向左邊 (小於)'}。`;
      }
      setFeedbackMsg(explanation);
    }
  };

  const nextQuestion = () => {
    if (page === 'text') generateTextQuestion();
    else generateGraphQuestion();
  };

  const switchPage = (newPage) => {
    setPage(newPage);
    setCurrentQ(null);
  };

  useEffect(() => {
    if (page === 'text') generateTextQuestion();
    if (page === 'graph') generateGraphQuestion();
  }, [page]);

  const formatDisplay = (str) => {
    if (!str) return "";
    return str
      .replace('<=', '≤')
      .replace('>=', '≥');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <nav className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <Link to="/" className="text-slate-500 hover:text-slate-700 flex items-center gap-2">
          <RotateCcw size={20} />
          <span className="text-sm">返回首頁</span>
        </Link>
        <div className="flex-1 text-center">
          <h1 className="font-bold text-slate-700">一元一次不等式</h1>
          <div className="mt-1 flex justify-center">
            <div className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full font-bold flex items-center gap-2 shadow-sm border-2 border-yellow-400">
              <Trophy size={16} className="fill-yellow-100 text-yellow-800" />
              <span className="text-sm leading-none">{score}</span>
            </div>
          </div>
        </div>
        {page !== 'menu' && (
          <button 
            onClick={() => switchPage('menu')}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-2"
          >
            <HomeIcon size={16} /> 主選單
          </button>
        )}
      </nav>

      <main className="flex-1 w-full max-w-xl mx-auto p-4 flex flex-col">
          
          {page === 'menu' && (
            <div className="flex flex-col justify-center flex-1 gap-6 animate-in fade-in zoom-in duration-300">
              <div className="text-center space-y-2 mb-4">
                <p className="text-2xl font-bold text-slate-700">準備好挑戰了嗎？</p>
                <p className="text-slate-500">請選擇挑戰模式</p>
              </div>
              
              <button 
                onClick={() => switchPage('text')}
                className="group relative overflow-hidden w-full p-6 bg-white border-2 border-blue-100 hover:border-blue-300 rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex items-center gap-5"
              >
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                    <CheckCircle size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-800 mb-1">1. 文字翻譯題</h3>
                  <p className="text-sm text-slate-500">根據字眼，轉不等式設式</p>
                </div>
              </button>

              <button 
                onClick={() => switchPage('graph')}
                className="group relative overflow-hidden w-full p-6 bg-white border-2 border-purple-100 hover:border-purple-300 rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex items-center gap-5"
              >
                <div className="bg-purple-100 text-purple-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                    <ArrowRight size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-800 mb-1">2. 看圖列式題</h3>
                  <p className="text-sm text-slate-500">觀察數線圖，寫出不等式</p>
                  <p className="text-xs text-slate-400 mt-1">* 包含實心/空心圓點與方向判斷</p>
                </div>
              </button>

              <Link
                to="/"
                className="mt-4 text-center text-slate-500 hover:text-slate-700 flex items-center justify-center gap-2"
              >
                <HomeIcon size={18} />
                <span className="text-sm">返回首頁</span>
              </Link>
            </div>
          )}

          {page !== 'menu' && currentQ && (
            <div className="flex flex-col flex-1 max-w-md mx-auto w-full animate-in slide-in-from-right duration-300">
              
              <div className="flex-1 flex flex-col justify-center items-center my-4 min-h-[200px]">
                <p className="text-sm text-slate-400 mb-4 font-bold tracking-wider uppercase text-center bg-white px-3 py-1 rounded-full shadow-sm">
                  {page === 'text' ? '請寫出對應的不等式' : '請根據圖形寫出 x的不等式'}
                </p>
                
                {page === 'text' ? (
                  <div className="text-2xl md:text-3xl font-bold text-center py-10 px-6 bg-white rounded-2xl w-full shadow-sm border border-slate-100 text-slate-700">
                    {currentQ.display}
                  </div>
                ) : (
                  currentQ.type === 'graph' && currentQ.operator && (
                      <div className="w-full">
                        <NumberLine value={currentQ.val} operator={currentQ.operator} />
                      </div>
                  )
                )}
              </div>

              <div className="mb-6">
                <div className={`
                    w-full h-16 flex items-center justify-center text-3xl font-mono tracking-wider rounded-xl border-2 bg-white transition-colors
                    ${status === 'correct' ? 'border-green-500 text-green-600 bg-green-50' : 
                      status === 'wrong' ? 'border-red-500 text-red-600 bg-red-50' : 
                      'border-slate-200 text-slate-800 shadow-inner'}
                `}>
                    {formatDisplay(input) || <span className="text-slate-200 animate-pulse">?</span>}
                </div>
              </div>

              {status !== 'answering' ? (
                <div className={`p-5 rounded-xl mb-4 text-center animate-in fade-in slide-in-from-bottom-2 shadow-sm border
                  ${status === 'correct' ? 'bg-green-100 border-green-200 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
                  <div className="font-bold text-lg mb-2 flex items-center justify-center gap-2">
                    {status === 'correct' ? <CheckCircle className="text-green-600" /> : <XCircle className="text-red-600"/>}
                    {status === 'correct' ? 'Correct!' : '錯誤'}
                  </div>
                  <div className="text-sm md:text-base whitespace-pre-line text-left bg-white/60 p-4 rounded-lg border border-black/5 leading-relaxed">
                    {feedbackMsg}
                  </div>
                  <button 
                    onClick={nextQuestion}
                    className="mt-4 w-full bg-slate-800 text-white py-3 rounded-lg font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-slate-700"
                  >
                    下一題 Next <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                 <Keypad 
                    onKeyPress={handleInput} 
                    onDelete={handleDelete} 
                    onSubmit={checkAnswer}
                    disabled={status !== 'answering'}
                  />
              )}

            </div>
          )}
      </main>
    </div>
  );
}
