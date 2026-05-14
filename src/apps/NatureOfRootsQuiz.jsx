import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Settings, CheckCircle2, XCircle, ArrowRight, HelpCircle, FileText, ArrowLeft } from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';
import { useNavigate } from 'react-router-dom';
import { Latex } from '../notes/shared';

// -- Parabola SVG Generator --
const ParabolaSVG = ({ condition }) => {
  let vY = condition === 'two-roots' ? 160 : condition === 'one-root' ? 120 : 80;
  
  const drawParabola = (vY) => {
    let pts = [];
    for (let x = 30; x <= 170; x += 5) {
      let y = vY - 0.03 * (x - 100) * (x - 100);
      pts.push(`${x},${y}`);
    }
    return `M ${pts.join(' L ')}`;
  };

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[250px] mx-auto">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      
      {/* 坐標軸 */}
      <line x1="20" y1="120" x2="180" y2="120" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="180" y="135" fontSize="12" fontStyle="italic">x</text>
      
      <line x1="100" y1="180" x2="100" y2="20" stroke="#ccc" strokeWidth="1" strokeDasharray="4" />
      <text x="105" y="30" fontSize="12" fontStyle="italic" fill="#666">y</text>

      {/* 根的標示 */}
      {condition === 'two-roots' && (
        <>
          <circle cx="63.5" cy="120" r="4" fill="#ef4444" />
          <circle cx="136.5" cy="120" r="4" fill="#ef4444" />
          <text x="100" y="185" fontSize="14" textAnchor="middle" fill="#ef4444" fontWeight="bold">2 個 x 截距</text>
        </>
      )}
      {condition === 'one-root' && (
        <>
          <circle cx="100" cy="120" r="4" fill="#ef4444" />
          <text x="100" y="145" fontSize="14" textAnchor="middle" fill="#ef4444" fontWeight="bold">1 個 x 截距</text>
        </>
      )}
      {condition === 'no-roots' && (
        <text x="100" y="145" fontSize="14" textAnchor="middle" fill="#ef4444" fontWeight="bold">0 個 x 截距</text>
      )}

      {/* 拋物線 */}
      <path d={drawParabola(vY)} fill="none" stroke="#3b82f6" strokeWidth="3" />
    </svg>
  );
};

export default function NatureOfRootsQuiz() {
  const navigate = useNavigate();
  const [katexReady, setKatexReady] = useState(false);
  const [mode, setMode] = useState(null); // null = menu, 'quiz' = active quiz
  
  // Quiz states
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [step, setStep] = useState(1); // 1: calc delta, 2: choose root nature, 3: result
  
  // Inputs
  const [deltaInput, setDeltaInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  const inputRef = useRef(null);

  useEffect(() => {
    loadKatexOnce().then(() => setKatexReady(true));
  }, []);

  const generateQuestion = useCallback(() => {
    let a, b, c, delta;
    do {
      a = Math.floor(Math.random() * 3) + 1; // 1 to 3
      b = Math.floor(Math.random() * 11) - 5; // -5 to 5
      c = Math.floor(Math.random() * 11) - 5; // -5 to 5
      delta = b * b - 4 * a * c;
    } while (Math.abs(delta) > 100); // 避免數字太大

    let eq = '';
    if (a === 1) eq += 'x^2';
    else eq += `${a}x^2`;

    if (b > 0) eq += ` + ${b}x`;
    else if (b < 0) eq += ` - ${Math.abs(b)}x`;
    
    if (b === 0 && c === 0) eq += ''; // ax^2=0
    
    if (c > 0) eq += ` + ${c}`;
    else if (c < 0) eq += ` - ${Math.abs(c)}`;

    eq += ' = 0';

    let condition = '';
    if (delta > 0) condition = 'two-roots';
    else if (delta === 0) condition = 'one-root';
    else condition = 'no-roots';

    setCurrentQuestion({ a, b, c, eq, delta, condition });
    setStep(1);
    setDeltaInput('');
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (mode === 'quiz' && !currentQuestion) {
      generateQuestion();
    }
  }, [mode, currentQuestion, generateQuestion]);

  const handleDeltaSubmit = () => {
    const val = parseInt(deltaInput, 10);
    if (isNaN(val)) return;

    if (val === currentQuestion.delta) {
      setFeedback({ type: 'success', text: '正確！請根據 Δ 判斷根的性質。' });
      setScore(s => s + 1);
      setTimeout(() => {
        setStep(2);
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback({ 
        type: 'error', 
        text: `錯誤！正确答案是 ${currentQuestion.delta}。\n計算： \nΔ = (${currentQuestion.b})^2 - 4(${currentQuestion.a})(${currentQuestion.c}) = ${currentQuestion.delta}`
      });
      setTimeout(() => {
        setStep(2);
        setFeedback(null);
      }, 3500);
    }
  };

  const handleNatureSelect = (choice) => {
    let isCorrect = false;
    if (choice === currentQuestion.condition) isCorrect = true;

    if (isCorrect) {
      setFeedback({ type: 'success', text: '答對了！' });
      setScore(s => s + 1);
    } else {
      const correctText = currentQuestion.condition === 'two-roots' ? 'Δ > 0 : 兩個相異實根' : 
                          currentQuestion.condition === 'one-root' ? 'Δ = 0 : 一個二重實根' : 
                          'Δ < 0 : 沒有實根';
      setFeedback({ type: 'error', text: `錯誤！正確為 ${correctText}` });
    }
    setStep(3);
  };

  const nextQuestion = () => {
    setQuestionCount(c => c + 1);
    generateQuestion();
  };

  const resetQuiz = () => {
    setMode(null);
    setCurrentQuestion(null);
    setScore(0);
    setQuestionCount(0);
    setStep(1);
  };

  if (!katexReady) {
    return <div className="flex justify-center items-center h-screen">載入中...</div>;
  }

  // --- Menu ---
  if (!mode) {
    return (
      <div className="max-w-2xl mx-auto p-4 pt-8">
        <button onClick={() => navigate('/')} className="mb-6 flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-1" /> 返回主頁
        </button>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-indigo-500">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">二次方程：根的性質</h1>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            學會計算判別式 <Latex math="\Delta = b^2 - 4ac" />，並以此判斷二次方程根的數目和幾何圖像關係。
          </p>
          
          <button 
            onClick={() => setMode('quiz')}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
          >
            開始練習
          </button>
        </div>
      </div>
    );
  }

  // --- Quiz UI ---
  return (
    <div className="max-w-2xl mx-auto p-4 pt-8">
      <div className="flex justify-between items-center mb-6">
        <button onClick={resetQuiz} className="flex items-center text-slate-500 hover:text-slate-700">
          <ArrowLeft className="w-4 h-4 mr-1" /> 退出練習
        </button>
        <div className="flex gap-4 text-sm font-medium">
          <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
            已答: {questionCount}
          </div>
          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
            得分: {score}
          </div>
        </div>
      </div>

      {currentQuestion && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white text-center">
            <h2 className="text-xl font-medium opacity-90 mb-2">已知方程式</h2>
            <div className="text-3xl font-bold">
              <Latex math={currentQuestion.eq} block />
            </div>
            {step === 1 && (
              <p className="mt-4 text-indigo-200">
                對應 <Latex math="ax^2 + bx + c = 0" />，請計算判別式
              </p>
            )}
          </div>

          <div className="p-6">
            {/* Step 1: Calc Delta */}
            {step === 1 && (
              <div className="text-center">
                <div className="mb-6 flex justify-center items-center gap-3">
                  <span className="text-2xl font-bold bg-slate-100 px-4 py-2 rounded-lg">
                    <Latex math="\Delta =" />
                  </span>
                  <input
                    ref={inputRef}
                    type="number"
                    value={deltaInput}
                    onChange={(e) => setDeltaInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDeltaSubmit()}
                    className="w-32 text-2xl p-2 border-2 border-slate-300 rounded-lg text-center focus:border-indigo-500 focus:outline-none"
                    placeholder="輸入數值"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleDeltaSubmit}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700"
                >
                  確認 <Latex math="\Delta" /> 值
                </button>
              </div>
            )}

            {/* Step 2: Choose Nature */}
            {step === 2 && (
              <div className="text-center animate-fade-in">
                <div className="mb-6 bg-slate-50 p-4 rounded-xl inline-block text-lg">
                  確認判別式： <Latex math={`\\Delta = ${currentQuestion.delta}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-4">根據以上 <Latex math="\Delta" />，方程的根是？</h3>
                
                <div className="grid gap-3 max-w-sm mx-auto">
                  <button 
                    onClick={() => handleNatureSelect('two-roots')}
                    className="p-4 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 flex flex-col items-center"
                  >
                    <span className="text-lg font-bold">2 個相異實根</span>
                    <span className="text-sm text-slate-500"><Latex math="\Delta > 0" /></span>
                  </button>
                  <button 
                    onClick={() => handleNatureSelect('one-root')}
                    className="p-4 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 flex flex-col items-center"
                  >
                    <span className="text-lg font-bold">1 個二重實根</span>
                    <span className="text-sm text-slate-500"><Latex math="\Delta = 0" /></span>
                  </button>
                  <button 
                    onClick={() => handleNatureSelect('no-roots')}
                    className="p-4 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 flex flex-col items-center"
                  >
                    <span className="text-lg font-bold">沒有實根</span>
                    <span className="text-sm text-slate-500"><Latex math="\Delta < 0" /></span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Result & SVG */}
            {step === 3 && (
              <div className="text-center animate-fade-in space-y-6">
                <div className="bg-slate-50 p-4 rounded-xl inline-block text-lg">
                  <p className="mb-2"><Latex math={`\\Delta = ${currentQuestion.delta}`} /></p>
                  <p className="font-bold text-indigo-700">
                    {currentQuestion.condition === 'two-roots' && 'Δ > 0，有 2 個相異實根'}
                    {currentQuestion.condition === 'one-root' && 'Δ = 0，有 1 個二重實根'}
                    {currentQuestion.condition === 'no-roots' && 'Δ < 0，沒有實根'}
                  </p>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-4 bg-white">
                  <h4 className="text-slate-600 font-bold mb-2">關聯的二次圖像 <Latex math={`(y = ${currentQuestion.eq.replace(' = 0', '')})`} /></h4>
                  <ParabolaSVG condition={currentQuestion.condition} />
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center mx-auto hover:bg-indigo-700"
                >
                  <span className="mr-2">下一題</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Feedback Message */}
            {feedback && (
              <div className={`mt-6 p-4 rounded-lg flex items-start ${
                feedback.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              } animate-fade-in`}>
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                )}
                <div className="whitespace-pre-line text-left leading-relaxed">
                  {feedback.text}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
