import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, HelpCircle, CheckCircle, XCircle, RefreshCcw, Calculator, BookOpen } from 'lucide-react';

// --- 數學邏輯與輔助函數 ---

const generateQuestion = () => {
  // 隨機生成 8 種情況的題目
  const types = ['AND', 'OR'];
  const dirs = ['RR', 'LL', 'RL_OVERLAP', 'RL_GAP']; 
  // RR: x>a, x>b; LL: x<a, x<b; RL_OVERLAP: x>a, x<b (overlap); RL_GAP: x<a, x>b (gap)
  
  const type = types[Math.floor(Math.random() * types.length)];
  const dir = dirs[Math.floor(Math.random() * dirs.length)];
  
  let val1 = Math.floor(Math.random() * 10) - 5; // -5 to 4
  let val2 = val1 + (Math.floor(Math.random() * 3) + 2); // val2 always > val1 to simplify logic logic

  // 交換 val1 val2 讓題目更有變化，但保持 a < b 的邏輯關係用於生成答案
  const a = val1; 
  const b = val2;

  let q = { type, dir, a, b, ineq1: {}, ineq2: {}, answer: '', ansType: '', range: null };

  // 設定符號 (隨機 >= 或 >)
  const eq1 = Math.random() > 0.5;
  const eq2 = Math.random() > 0.5;
  const sym1 = eq1 ? '≥' : '>';
  const sym2 = eq2 ? '≥' : '>';
  const sym1Rev = eq1 ? '≤' : '<';
  const sym2Rev = eq2 ? '≤' : '<';

  // 根據方向構建題目
  if (dir === 'RR') {
    q.ineq1 = { val: a, op: sym1, rawOp: eq1?'>=':'>' };
    q.ineq2 = { val: b, op: sym2, rawOp: eq2?'>=':'>' };
    
    if (type === 'AND') {
        // x>a AND x>b -> x>b
        q.answer = `x ${sym2} ${b}`;
        q.ansType = 'GT'; // Greater Than
        q.limitVal = b;
        q.limitInc = eq2;
    } else {
        // x>a OR x>b -> x>a
        q.answer = `x ${sym1} ${a}`;
        q.ansType = 'GT';
        q.limitVal = a;
        q.limitInc = eq1;
    }
  } else if (dir === 'LL') {
    q.ineq1 = { val: a, op: sym1Rev, rawOp: eq1?'<=':'<' };
    q.ineq2 = { val: b, op: sym2Rev, rawOp: eq2?'<=':'<' };

    if (type === 'AND') {
        // x<a AND x<b -> x<a
        q.answer = `x ${sym1Rev} ${a}`;
        q.ansType = 'LT';
        q.limitVal = a;
        q.limitInc = eq1;
    } else {
        // x<a OR x<b -> x<b
        q.answer = `x ${sym2Rev} ${b}`;
        q.ansType = 'LT';
        q.limitVal = b;
        q.limitInc = eq2;
    }
  } else if (dir === 'RL_OVERLAP') {
    // x > a, x < b (Intersection exists)
    q.ineq1 = { val: a, op: sym1, rawOp: eq1?'>=':'>' };
    q.ineq2 = { val: b, op: sym2Rev, rawOp: eq2?'<=':'<' };

    if (type === 'AND') {
        // a < x < b
        q.answer = `${a} ${eq1?'≤':'<'} x ${eq2?'≤':'<'} ${b}`;
        q.ansType = 'BETWEEN';
        q.minVal = a; q.minInc = eq1;
        q.maxVal = b; q.maxInc = eq2;
    } else {
        q.answer = "所有實數";
        q.ansType = 'ALL';
    }
  } else if (dir === 'RL_GAP') {
     // x < a, x > b (Gap exists)
    q.ineq1 = { val: a, op: sym1Rev, rawOp: eq1?'<=':'<' };
    q.ineq2 = { val: b, op: sym2, rawOp: eq2?'>=':'>' };

    if (type === 'AND') {
        q.answer = "無解";
        q.ansType = 'NONE';
    } else {
        // x < a OR x > b
        q.answer = `x ${sym1Rev} ${a} 或 x ${sym2} ${b}`;
        q.ansType = 'SPLIT';
        q.leftVal = a; q.leftInc = eq1;
        q.rightVal = b; q.rightInc = eq2;
    }
  }
  
  return q;
};

// --- 組件: 數線繪圖 (SVG) ---
const NumberLine = ({ q, showResult = false, width = 300, height = 120 }) => {
  const range = 14; // -7 to 7 approx centered
  const center = (q.a + q.b) / 2;
  const scale = (width - 40) / range;
  const toX = (val) => (val - (center - range/2)) * scale + 20;

  const y1 = 30; // Line 1 height
  const y2 = 60; // Line 2 height
  const yResult = 90; // Result height

  const drawArrow = (val, op, y, color) => {
    const x = toX(val);
    const isRight = op.includes('>') || op.includes('≥');
    const isClosed = op.includes('=');
    const endX = isRight ? width - 10 : 10;
    
    return (
      <g>
        <line x1={x} y1={y} x2={endX} y2={y} stroke={color} strokeWidth="2" markerEnd="url(#arrowhead)" />
        <circle cx={x} cy={y} r="4" fill={isClosed ? color : "white"} stroke={color} strokeWidth="2" />
      </g>
    );
  };

  // Logic to draw the "Result" highlight
  const drawResult = () => {
    if (!showResult) return null;
    const color = "#10B981"; // Green for correct/result

    if (q.ansType === 'GT') {
        return drawArrow(q.limitVal, q.limitInc ? '>=' : '>', yResult, color);
    }
    if (q.ansType === 'LT') {
        return drawArrow(q.limitVal, q.limitInc ? '<=' : '<', yResult, color);
    }
    if (q.ansType === 'BETWEEN') {
        return (
            <g>
                <line x1={toX(q.minVal)} y1={yResult} x2={toX(q.maxVal)} y2={yResult} stroke={color} strokeWidth="4" />
                <circle cx={toX(q.minVal)} cy={yResult} r="4" fill={q.minInc ? color : "white"} stroke={color} strokeWidth="2" />
                <circle cx={toX(q.maxVal)} cy={yResult} r="4" fill={q.maxInc ? color : "white"} stroke={color} strokeWidth="2" />
            </g>
        );
    }
    if (q.ansType === 'SPLIT') {
        return (
            <g>
                {drawArrow(q.leftVal, q.leftInc?'<=':'<', yResult, color)}
                {drawArrow(q.rightVal, q.rightInc?'>=':'>', yResult, color)}
            </g>
        );
    }
    if (q.ansType === 'ALL') {
        return <text x={width/2} y={yResult + 5} textAnchor="middle" fill={color} fontSize="12">所有實數 (全覆蓋)</text>;
    }
    if (q.ansType === 'NONE') {
        return <text x={width/2} y={yResult + 5} textAnchor="middle" fill="#EF4444" fontSize="12">無解 (無重疊)</text>;
    }
    return null;
  };

  return (
    <svg width={width} height={height} className="mx-auto border bg-white rounded-lg shadow-sm">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
        </marker>
      </defs>
      
      {/* Base Line */}
      <line x1="10" y1={height - 20} x2={width-10} y2={height - 20} stroke="#374151" strokeWidth="1" />
      {/* Ticks */}
      {[q.a, q.b].map((val, i) => (
          <g key={i}>
            <line x1={toX(val)} y1={height - 25} x2={toX(val)} y2={height - 15} stroke="#374151" />
            <text x={toX(val)} y={height - 2} textAnchor="middle" fontSize="10">{val}</text>
          </g>
      ))}

      {/* Inequality 1 (Blue) */}
      {drawArrow(q.ineq1.val, q.ineq1.op, y1, "#3B82F6")}
      
      {/* Inequality 2 (Red) */}
      {drawArrow(q.ineq2.val, q.ineq2.op, y2, "#EF4444")}

      {/* Result Layer */}
      {drawResult()}
    </svg>
  );
};

// --- 鍵盤組件 ---
const Keypad = ({ onInput, onDelete, onSubmit, mode = 'full' }) => {
  const baseBtn = "p-3 rounded-lg font-bold shadow active:scale-95 transition-all text-lg";
  const numBtn = `${baseBtn} bg-white text-gray-700 hover:bg-gray-50 border border-gray-200`;
  const opBtn = `${baseBtn} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200`;
  const actionBtn = `${baseBtn} text-white`;

  return (
    <div className="bg-gray-100 p-2 rounded-xl mt-4">
      <div className="grid grid-cols-5 gap-2">
        {/* Row 1 */}
        <button className={numBtn} onClick={() => onInput('7')}>7</button>
        <button className={numBtn} onClick={() => onInput('8')}>8</button>
        <button className={numBtn} onClick={() => onInput('9')}>9</button>
        <button className={opBtn} onClick={() => onInput('>')}>&gt;</button>
        <button className={opBtn} onClick={() => onInput('<')}>&lt;</button>

        {/* Row 2 */}
        <button className={numBtn} onClick={() => onInput('4')}>4</button>
        <button className={numBtn} onClick={() => onInput('5')}>5</button>
        <button className={numBtn} onClick={() => onInput('6')}>6</button>
        <button className={opBtn} onClick={() => onInput('≥')}>≥</button>
        <button className={opBtn} onClick={() => onInput('≤')}>≤</button>

        {/* Row 3 */}
        <button className={numBtn} onClick={() => onInput('1')}>1</button>
        <button className={numBtn} onClick={() => onInput('2')}>2</button>
        <button className={numBtn} onClick={() => onInput('3')}>3</button>
        <button className={numBtn} onClick={() => onInput('x')}>x</button>
        {mode === 'full' ? (
           <button className={`${opBtn} text-sm`} onClick={() => onInput('或')}>或</button>
        ) : (
           <button className={`${opBtn} text-sm opacity-50 cursor-not-allowed`}>-</button>
        )}

        {/* Row 4 */}
        <button className={numBtn} onClick={() => onInput('0')}>0</button>
        <button className={numBtn} onClick={() => onInput('.')}>.</button>
        <button className={numBtn} onClick={() => onInput('-')}>(-)</button>
        {mode === 'full' ? (
            <button className={`${opBtn} text-sm`} onClick={() => onInput('及')}>及</button>
        ) : (
             <button className={`${opBtn} text-sm opacity-50 cursor-not-allowed`}>-</button>
        )}
        
        {/* Special Keys */}
        {mode === 'full' && (
             <button className={`${opBtn} text-xs col-span-1 leading-tight`} onClick={() => onInput('無解')}>無解</button>
        )}
        {mode !== 'full' && <div />}

        
      </div>
      
      <div className="grid grid-cols-5 gap-2 mt-2">
          {mode === 'full' && (
            <button className={`${opBtn} col-span-2 text-xs`} onClick={() => onInput('所有實數')}>所有實數</button>
          )}
          {mode !== 'full' && <div className="col-span-2"/>}
          
          <button className={`${actionBtn} bg-red-500 hover:bg-red-600 col-span-1`} onClick={onDelete}>⌫</button>
          <button className={`${actionBtn} bg-green-600 hover:bg-green-700 col-span-2`} onClick={onSubmit}>
            確定
          </button>
      </div>
    </div>
  );
};

// --- 主程式 ---

export default function CompoundInequalityApp() {
  const [page, setPage] = useState('teach'); // 'teach' or 'quiz'
  const [scores, setScores] = useState({ teach: 0, quiz: 0 }); // Just holding generic scores logic
  const [quizScore, setQuizScore] = useState(0);
  
  // Quiz State
  const [q, setQ] = useState(null);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState(1); // 1: Simplify, 2: Integer
  const [status, setStatus] = useState('idle'); // idle, correct, wrong
  const [showHint, setShowHint] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    newQuestion();
  }, []);

  const newQuestion = () => {
    setQ(generateQuestion());
    setInput('');
    setPhase(1);
    setStatus('idle');
    setShowHint(false);
  };

  const handleInput = (char) => setInput(prev => prev + char);
  const handleDelete = () => setInput(prev => prev.slice(0, -1));

  // 標準化答案字串以進行比較 (去除空格)
  const normalize = (str) => str.replace(/\s/g, '').replace('和', '及');

  const checkPhase1 = () => {
    const userAns = normalize(input);
    const correctAns = normalize(q.answer);
    
    // 簡單的字串比對，實際生產環境可能需要更強大的解析器
    // 允許 "x<3或x>5" 和 "x>5或x<3"
    let isCorrect = userAns === correctAns;
    
    // 特殊情況處理：SPLIT類型的順序
    if (q.ansType === 'SPLIT') {
        const altAns = normalize(`x${q.rightInc?'>=':'>'}${q.rightVal}或x${q.leftInc?'<=':'<'}${q.leftVal}`);
        if (userAns === altAns) isCorrect = true;
    }
    // 特殊情況：BETWEEN
    if (q.ansType === 'BETWEEN') {
        // user might type a<x and x<b or a<x<b
        // 這裡簡化要求學生輸入 a<x<b 格式
    }

    if (isCorrect) {
      setStatus('correct');
      // Delay to next phase
      setTimeout(() => {
        setPhase(2);
        setInput('');
        setStatus('idle');
      }, 1500);
    } else {
      setStatus('wrong');
      // Even if wrong, show result and move to phase 2 after user acknowledges? 
      // Requirement: "即使1. 答錯，也會提供正確答案讓學生在同一頁答承上題"
    }
  };

  const getIntegerAnswer = () => {
      // 根據題目類型計算最大/最小整數
      // 簡單規則：求最接近邊界的整數
      // 如果是 GT (x > a): 最小整數。
      // 如果是 LT (x < a): 最大整數。
      // 如果是 BETWEEN (a < x < b): 寫出所有的整數 (太多了，簡化為最大或最小)
      // 題目設計：我們固定問 "滿足不等式的 最小整數 (若 x>...) 或 最大整數 (若 x<...)"
      
      if (q.ansType === 'GT') {
          return { type: 'min', val: q.limitInc ? q.limitVal : q.limitVal + 1 };
      }
      if (q.ansType === 'LT') {
          return { type: 'max', val: q.limitInc ? q.limitVal : q.limitVal - 1 };
      }
      if (q.ansType === 'BETWEEN') {
          // 問最大和最小
          return { 
             type: 'range', 
             min: q.minInc ? q.minVal : q.minVal + 1,
             max: q.maxInc ? q.maxVal : q.maxVal - 1
          };
      }
      if (q.ansType === 'SPLIT') {
         // This is tricky. usually ask positive min or similar. 
         // For simplicity in this app, we might skip Phase 2 for SPLIT/ALL/NONE or ask specific logic
         return { type: 'none' };
      }
      return { type: 'none' }; // ALL or NONE
  };

  const intAns = q ? getIntegerAnswer() : { type: 'none' };

  const checkPhase2 = () => {
      if (intAns.type === 'none') {
          // Skip or auto correct
          setQuizScore(s => s + 10);
          newQuestion();
          return;
      }
      
      const val = parseInt(input);
      let isCorrect = false;

      if (intAns.type === 'min' && val === intAns.val) isCorrect = true;
      if (intAns.type === 'max' && val === intAns.val) isCorrect = true;
      if (intAns.type === 'range') {
          // 這裡簡化，假設題目只問最小
           if (val === intAns.min) isCorrect = true;
      }

      if (isCorrect) {
          setQuizScore(s => s + 10);
          // animation
          setStatus('correct');
          setTimeout(newQuestion, 1000);
      } else {
          setStatus('wrong');
      }
  };

  const getPhase2QuestionText = () => {
      if (intAns.type === 'min') return `承上題，滿足該不等式的 最小整數 是什麼？`;
      if (intAns.type === 'max') return `承上題，滿足該不等式的 最大整數 是什麼？`;
      if (intAns.type === 'range') return `承上題，滿足該不等式的 最小整數 是什麼？`;
      return "承上題，此情況無特定最大/最小整數，按確定跳過。";
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg flex flex-col font-sans">
      {/* Header Tabs */}
      <div className="flex bg-slate-800 text-white">
        <button 
            className={`flex-1 p-4 font-bold ${page==='teach'?'bg-slate-700 border-b-4 border-blue-400':''}`}
            onClick={() => setPage('teach')}
        >
            <BookOpen className="inline mr-2 w-5 h-5"/> 教學
        </button>
        <button 
            className={`flex-1 p-4 font-bold ${page==='quiz'?'bg-slate-700 border-b-4 border-green-400':''}`}
            onClick={() => setPage('quiz')}
        >
            <Calculator className="inline mr-2 w-5 h-5"/> 測驗 
            <span className="ml-2 bg-green-600 text-xs px-2 py-0.5 rounded-full">{quizScore}分</span>
        </button>
      </div>

      {/* --- TEACHING PAGE --- */}
      {page === 'teach' && (
        <div className="p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-slate-800">複合不等式圖解法</h2>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2 text-lg">口訣記憶</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                    <span className="block text-2xl font-black text-red-500 mb-1">AND (及)</span>
                    <p className="text-sm text-gray-700">只看兩線 <span className="font-bold text-red-600 border-b-2 border-red-600">重疊</span> 位</p>
                    <div className="mt-2 text-xs text-gray-500">(找 Intersection)</div>
                </div>
                <div className="text-center">
                    <span className="block text-2xl font-black text-blue-500 mb-1">OR (或)</span>
                    <p className="text-sm text-gray-700">看上面 <span className="font-bold text-blue-600 border-b-2 border-blue-600">有蓋</span> 範圍</p>
                    <div className="mt-2 text-xs text-gray-500">(找 Union)</div>
                </div>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-2">圖解範例 (8種情況)：</h3>
          <div className="space-y-6">
              {[
                  { title: "方向相同 (向右)", desc: "AND取大，OR取小", q: { a:2, b:5, ineq1:{val:2, op:'>'}, ineq2:{val:5, op:'>'}, ansType:'GT', limitVal:5, limitInc:false } },
                  { title: "方向相對 (重疊)", desc: "AND夾中間，OR全實數", q: { a:2, b:5, ineq1:{val:2, op:'>'}, ineq2:{val:5, op:'<'}, ansType:'BETWEEN', minVal:2, maxVal:5 } },
                  { title: "方向相反 (分離)", desc: "AND無解，OR分兩邊", q: { a:2, b:5, ineq1:{val:2, op:'<'}, ineq2:{val:5, op:'>'}, ansType:'NONE' } } 
              ].map((item, idx) => (
                  <div key={idx} className="border rounded p-2">
                      <div className="font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-gray-500 mb-2">{item.desc}</div>
                      {/* Using the NumberLine component for static teaching display */}
                      <NumberLine q={item.q} showResult={true} height={80} width={280} />
                  </div>
              ))}
          </div>
          
          <div className="mt-8 bg-yellow-50 p-4 rounded border border-yellow-200">
              <h3 className="font-bold text-yellow-800">整數解小貼士</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2 mt-2">
                  <li><strong>x &gt; 3.5</strong> : 最小整數是 4</li>
                  <li><strong>x &ge; 3</strong> : 最小整數是 3</li>
                  <li><strong>x &lt; 5</strong> : 最大整數是 4</li>
              </ul>
          </div>
        </div>
      )}

      {/* --- QUIZ PAGE --- */}
      {page === 'quiz' && q && (
        <div className="flex-1 flex flex-col p-4 bg-gray-50">
          
          {/* Question Display */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-4 text-center relative">
            <div className="text-gray-500 text-sm mb-1">化簡以下不等式:</div>
            <div className="text-2xl font-bold text-slate-800 tracking-wide font-mono">
                {`x ${q.ineq1.op} ${q.ineq1.val}`} 
                <span className={`mx-3 ${q.type==='AND'?'text-red-500':'text-blue-500'}`}>
                    {q.type === 'AND' ? '及' : '或'}
                </span>
                {`x ${q.ineq2.op} ${q.ineq2.val}`}
            </div>
            
            <button 
                onClick={() => setShowHint(!showHint)}
                className="absolute top-2 right-2 text-gray-400 hover:text-blue-500"
            >
                <HelpCircle size={20} />
            </button>
            
            {showHint && (
                <div className="mt-3 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                    提示：畫圖分析。<br/>
                    {q.type==='AND' ? '「及」看兩線重疊位' : '「或」看線覆蓋範圍'}
                </div>
            )}
          </div>

          {/* Visualization Area (Shows on Error or Success) */}
          {(status !== 'idle' || phase === 2) && (
              <div className="mb-4 animate-fade-in">
                 <div className="text-xs text-center text-gray-500 mb-1">圖解分析</div>
                 <NumberLine q={q} showResult={true} />
              </div>
          )}

          {/* Interaction Area */}
          <div className="flex-1">
              
              {/* Phase 1: Simplify */}
              {phase === 1 && (
                <>
                    <div className={`p-3 rounded-lg border-2 text-xl font-mono min-h-[3.5rem] flex items-center justify-center bg-white 
                        ${status==='wrong' ? 'border-red-400 bg-red-50' : status==='correct' ? 'border-green-400 bg-green-50' : 'border-blue-300'}`}>
                        {input || <span className="text-gray-300">請輸入答案...</span>}
                    </div>

                    {status === 'wrong' && (
                        <div className="mt-2 text-center">
                            <p className="text-red-500 font-bold">答案錯誤</p>
                            <p className="text-gray-600 text-sm">正確答案: {q.answer}</p>
                            <button onClick={() => { setPhase(2); setInput(''); setStatus('idle'); }} className="mt-2 text-sm bg-gray-200 px-3 py-1 rounded">
                                下一步 (找整數)
                            </button>
                        </div>
                    )}
                    
                    {status !== 'wrong' && (
                        <Keypad 
                            onInput={handleInput} 
                            onDelete={handleDelete} 
                            onSubmit={checkPhase1} 
                            mode="full"
                        />
                    )}
                </>
              )}

              {/* Phase 2: Integer */}
              {phase === 2 && (
                  <div className="animate-slide-up">
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-3 text-sm text-yellow-800 font-medium">
                          {getPhase2QuestionText()}
                      </div>
                      
                      {intAns.type !== 'none' ? (
                        <>
                            <div className={`p-3 rounded-lg border-2 text-xl font-mono text-center bg-white mb-2
                                ${status==='wrong' ? 'border-red-400' : status==='correct' ? 'border-green-400' : 'border-yellow-400'}`}>
                                {input || '?'}
                            </div>
                            
                            {status === 'wrong' && (
                                <div className="text-center mb-2">
                                    <span className="text-red-500 text-sm">不正確。正確答案是 {intAns.type==='range' ? intAns.min : intAns.val}</span>
                                    <div className="text-xs text-gray-500">
                                        {q.limitInc ? '包含等號，取本身' : '不含等號，取下一個整數'}
                                    </div>
                                    <button onClick={newQuestion} className="mt-2 bg-slate-800 text-white px-4 py-1 rounded text-sm">
                                        下一題 <ArrowRight className="inline w-3 h-3"/>
                                    </button>
                                </div>
                            )}

                            {status !== 'wrong' && (
                                <Keypad 
                                    onInput={handleInput} 
                                    onDelete={handleDelete} 
                                    onSubmit={checkPhase2} 
                                    mode="number" 
                                />
                            )}
                        </>
                      ) : (
                          <div className="text-center">
                              <p className="text-gray-500 mb-4">此題無特定整數解。</p>
                              <button onClick={newQuestion} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                                  下一題
                              </button>
                          </div>
                      )}
                  </div>
              )}

          </div>
        </div>
      )}
    </div>
  );
}
