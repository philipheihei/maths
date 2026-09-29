import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, ArrowLeft } from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';
import { useNavigate } from 'react-router-dom';
import { Latex } from '../notes/shared';

const TOTAL_QUESTIONS = 10;
const ROOT_PREVIEW_OPTIONS = [
  { condition: 'two-roots', label: '兩個交點', detail: 'Δ > 0：有兩個相異實根' },
  { condition: 'one-root', label: '一個交點', detail: 'Δ = 0：有一個重根' },
  { condition: 'no-roots', label: '沒有交點', detail: 'Δ < 0：沒有實根' },
];
const ROOT_GAME_OPTIONS = [
  {
    id: 'discriminant',
    title: '判別式與根的數目',
    description: '計算判別式，判斷實根數目和拋物線交點。',
    formulas: ['\\Delta = b^2 - 4ac'],
  },
  {
    id: 'relations',
    title: '兩根之和與兩根之積',
    description: '每條方程同時計算兩根之和及兩根之積。',
    formulas: ['\\alpha + \\beta = -\\frac{b}{a}', '\\alpha\\beta = \\frac{c}{a}'],
  },
];

const formatEquation = (a, b, c) => {
  let equation = a === 1 ? 'x^2' : `${a}x^2`;
  if (b > 0) equation += ` + ${b}x`;
  else if (b < 0) equation += ` - ${Math.abs(b)}x`;
  if (c > 0) equation += ` + ${c}`;
  else if (c < 0) equation += ` - ${Math.abs(c)}`;
  return `${equation} = 0`;
};

const getRootRelationCalculation = (game, question) => game === 'sum'
  ? `\\alpha + \\beta = -\\frac{b}{a} = -\\frac{${question.b}}{${question.a}} = ${question.rootSum}`
  : `\\alpha\\beta = \\frac{c}{a} = \\frac{${question.c}}{${question.a}} = ${question.rootProduct}`;

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
  const [mode, setMode] = useState(null); // null = menu, 'quiz' = active quiz, 'complete' = results
  const [selectedGame, setSelectedGame] = useState('discriminant');
  const [previewCondition, setPreviewCondition] = useState('two-roots');
  
  // Quiz states
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [step, setStep] = useState(1); // 1: calc delta, 2: choose root nature, 3: result
  
  // Inputs
  const [deltaInput, setDeltaInput] = useState('');
  const [sumInput, setSumInput] = useState('');
  const [productInput, setProductInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  const inputRef = useRef(null);
  const usedQuestionKeysRef = useRef(new Set());
  const isDiscriminantGame = selectedGame === 'discriminant';
  const maximumScore = TOTAL_QUESTIONS * 2;

  const progressPercent = Math.min(
    100,
    ((questionCount + (step === 1 ? 0 : isDiscriminantGame && step === 2 ? 0.5 : 1)) / TOTAL_QUESTIONS) * 100
  );

  useEffect(() => {
    loadKatexOnce().then(() => setKatexReady(true));
  }, []);

  const generateQuestion = useCallback((game = 'discriminant') => {
    let a, b, c, delta, equation, questionKey;
    do {
      a = Math.floor(Math.random() * 3) + 1; // 1 to 3
      if (game === 'discriminant') {
        b = Math.floor(Math.random() * 11) - 5; // -5 to 5
        c = Math.floor(Math.random() * 11) - 5; // -5 to 5
      } else {
        const rootSum = Math.floor(Math.random() * 17) - 8; // -8 to 8
        const rootProduct = Math.floor(Math.random() * 17) - 8; // -8 to 8
        b = -a * rootSum;
        c = a * rootProduct;
      }
      delta = b * b - 4 * a * c;
      equation = formatEquation(a, b, c);
      questionKey = `${game}:${equation}`;
    } while (
      (game === 'discriminant' && Math.abs(delta) > 100) ||
      (game === 'relations' && delta < 0) ||
      usedQuestionKeysRef.current.has(questionKey)
    );

    usedQuestionKeysRef.current.add(questionKey);

    let condition = '';
    if (delta > 0) condition = 'two-roots';
    else if (delta === 0) condition = 'one-root';
    else condition = 'no-roots';

    setCurrentQuestion({ a, b, c, eq: equation, delta, condition, rootSum: -b / a, rootProduct: c / a });
    setStep(1);
    setDeltaInput('');
    setSumInput('');
    setProductInput('');
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (mode === 'quiz' && !currentQuestion) {
      generateQuestion(selectedGame);
    }
  }, [mode, currentQuestion, generateQuestion, selectedGame]);

  const handleAnswerSubmit = () => {
    if (feedback?.type === 'success' || feedback?.type === 'error') return;

    if (isDiscriminantGame) {
      const trimmedInput = deltaInput.trim();
      if (!/^-?\d+$/.test(trimmedInput)) {
        setFeedback({ type: 'warning', text: '請輸入整數。' });
        return;
      }

      const val = Number(trimmedInput);
      const calculation = `\\Delta = (${currentQuestion.b})^2 - 4(${currentQuestion.a})(${currentQuestion.c}) = ${currentQuestion.delta}`;

      if (val === currentQuestion.delta) {
        setFeedback({ type: 'success', text: '判別式計算正確。', calculation });
        setScore(s => s + 1);
      } else {
        setFeedback({
          type: 'error',
          text: `答案不符，正確值是 ${currentQuestion.delta}。`,
          calculation,
        });
      }
      return;
    }

    const trimmedSum = sumInput.trim();
    const trimmedProduct = productInput.trim();
    if (!/^-?\d+$/.test(trimmedSum) || !/^-?\d+$/.test(trimmedProduct)) {
      setFeedback({ type: 'warning', text: '請在兩個答案欄都輸入整數。' });
      return;
    }

    const sumCorrect = Number(trimmedSum) === currentQuestion.rootSum;
    const productCorrect = Number(trimmedProduct) === currentQuestion.rootProduct;
    const correctCount = Number(sumCorrect) + Number(productCorrect);
    const text = correctCount === 2
      ? '兩項答案都正確。'
      : correctCount === 1
        ? '其中一項正確，請核對兩個公式。'
        : '兩項答案都需要修正。';

    setFeedback({
      type: correctCount === 2 ? 'success' : 'error',
      text,
      calculations: [
        { label: '兩根之和', math: getRootRelationCalculation('sum', currentQuestion) },
        { label: '兩根之積', math: getRootRelationCalculation('product', currentQuestion) },
      ],
    });
    setScore((scoreValue) => scoreValue + correctCount);
    setStep(3);
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
    if (questionCount + 1 >= TOTAL_QUESTIONS) {
      setQuestionCount(TOTAL_QUESTIONS);
      setMode('complete');
      setFeedback(null);
      return;
    }

    setQuestionCount(c => c + 1);
    generateQuestion(selectedGame);
  };

  const restartQuiz = () => {
    usedQuestionKeysRef.current.clear();
    setScore(0);
    setQuestionCount(0);
    setMode('quiz');
    generateQuestion(selectedGame);
  };

  const startGame = (game) => {
    usedQuestionKeysRef.current.clear();
    setSelectedGame(game);
    setCurrentQuestion(null);
    setScore(0);
    setQuestionCount(0);
    setStep(1);
    setDeltaInput('');
    setSumInput('');
    setProductInput('');
    setFeedback(null);
    setMode('quiz');
  };

  const resetQuiz = () => {
    setMode(null);
    setCurrentQuestion(null);
    setScore(0);
    setQuestionCount(0);
    setStep(1);
    setDeltaInput('');
    setSumInput('');
    setProductInput('');
    setFeedback(null);
    usedQuestionKeysRef.current.clear();
  };

  const phaseLabels = isDiscriminantGame
    ? ['計算判別式', '判斷根的性質', '查看拋物線']
    : ['同題計算兩根之和與兩根之積'];
  const activePhase = isDiscriminantGame ? step : 1;

  if (!katexReady) {
    return <div className="flex justify-center items-center h-screen">載入中...</div>;
  }

  // --- Menu ---
  if (!mode) {
    return (
      <div className="max-w-5xl mx-auto p-4 pt-8 pb-12">
        <button onClick={() => navigate('/')} className="mb-6 flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-1" /> 返回主頁
        </button>
        <div className="mb-8 grid items-center gap-8 rounded-2xl border-t-4 border-indigo-500 bg-white p-6 shadow-lg sm:p-8 md:grid-cols-2">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
              <span className="text-2xl font-bold text-indigo-700">Δ</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-slate-800">二次方程：根的性質</h1>
            <p className="max-w-md text-slate-600">
              探索判別式與根的數目、兩根之和及兩根之積之間的關係。
            </p>
          </div>
          <section aria-label="判別式與拋物線交點預覽">
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="選擇實根數目">
              {ROOT_PREVIEW_OPTIONS.map((option) => (
                <button
                  key={option.condition}
                  type="button"
                  aria-pressed={previewCondition === option.condition}
                  onClick={() => setPreviewCondition(option.condition)}
                  className={`min-h-11 rounded-lg px-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    previewCondition === option.condition
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="mt-3 flex min-h-[250px] items-center justify-center rounded-xl bg-slate-50 px-3">
              <ParabolaSVG condition={previewCondition} />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-slate-600" aria-live="polite">
              {ROOT_PREVIEW_OPTIONS.find((option) => option.condition === previewCondition)?.detail}
            </p>
          </section>
        </div>

        <h2 className="mb-4 text-xl font-bold text-slate-800">選擇分課題</h2>
        <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
          {ROOT_GAME_OPTIONS.map((game) => (
            <article key={game.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800">{game.title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-slate-600">{game.description}</p>
              <div className="mt-4 flex min-h-[100px] flex-col justify-center space-y-2 rounded-lg bg-slate-50 px-3 py-4 text-center text-lg text-indigo-800">
                {game.formulas.map((formula) => (
                  <div key={formula}>
                    <Latex math={formula} />
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-5">
                <button
                  onClick={() => startGame(game.id)}
                  className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-bold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                >
                  開始遊玩
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'complete') {
    const summary = score >= maximumScore * 0.8
      ? '掌握得不錯，繼續保持。'
      : '再練習一次，留意方程係數與根之間的關係。';

    return (
      <div className="max-w-xl mx-auto p-4 pt-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-indigo-500">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="text-sm font-semibold text-indigo-600 mb-2">練習完成</p>
          <h1 className="text-3xl font-bold text-slate-800 mb-5">本次得分</h1>
          <p className="text-5xl font-bold text-indigo-700">
            {score}<span className="text-2xl text-slate-400"> / {maximumScore}</span>
          </p>
          <p className="mt-5 mb-8 text-slate-600">{summary}</p>
          <div className="mb-6 text-slate-600">
            <p>本單元重點：</p>
            {ROOT_GAME_OPTIONS.find((game) => game.id === selectedGame)?.formulas.map((formula) => (
              <div key={formula}><Latex math={formula} /></div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            >
              再練一次
            </button>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              返回介紹
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Quiz UI ---
  return (
    <div className="max-w-3xl mx-auto p-4 pt-8">
      <div className="flex justify-between items-center mb-5">
        <button onClick={resetQuiz} className="flex items-center text-slate-500 hover:text-slate-700">
          <ArrowLeft className="w-4 h-4 mr-1" /> 退出練習
        </button>
        <div className="flex gap-4 text-sm font-medium">
          <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full" aria-live="polite">
            第 {Math.min(questionCount + 1, TOTAL_QUESTIONS)} / {TOTAL_QUESTIONS} 題
          </div>
          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
            得分: {score} / {maximumScore}
          </div>
        </div>
      </div>

      <div className="mb-5 space-y-3">
        <div className="h-2 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label="練習進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progressPercent)}>
          <div className="h-full rounded-full bg-indigo-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className={`grid ${isDiscriminantGame ? 'grid-cols-3' : 'grid-cols-1'} gap-2 text-center text-xs sm:text-sm`}>
          {phaseLabels.map((label, index) => {
            const phase = index + 1;
            const phaseStyle = activePhase === phase
              ? 'bg-indigo-600 text-white'
              : activePhase > phase
                ? 'bg-indigo-50 text-indigo-700'
                : 'bg-slate-100 text-slate-500';

            return (
              <div key={label} className={`rounded-lg px-2 py-2 font-semibold ${phaseStyle}`}>
                {phase}. {label}
              </div>
            );
          })}
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
                {isDiscriminantGame ? (
                  <>對應 <Latex math="ax^2 + bx + c = 0" />，請計算判別式</>
                ) : (
                  <>利用根與係數的關係，同時計算 <Latex math={'\\alpha + \\beta'} /> 與 <Latex math={'\\alpha\\beta'} /></>
                )}
              </p>
            )}
          </div>

          <div className="p-6">
            {/* Step 1: Calc Delta */}
            {step === 1 && (
              <div className="text-center">
                {isDiscriminantGame ? (
                  <div className="mb-6 flex justify-center items-center gap-3">
                    <span className="text-2xl font-bold bg-slate-100 px-4 py-2 rounded-lg">
                      <Latex math="\\Delta =" />
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      inputMode="numeric"
                      pattern="-?[0-9]*"
                      value={deltaInput}
                      onChange={(e) => {
                        setDeltaInput(e.target.value);
                        if (feedback?.type === 'warning') setFeedback(null);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                      disabled={feedback?.type === 'success' || feedback?.type === 'error'}
                      className="w-32 text-2xl p-2 border-2 border-slate-300 rounded-lg text-center focus:border-indigo-500 focus:outline-none disabled:bg-slate-100"
                      placeholder="輸入數值"
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="mb-6 grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-4 font-semibold text-slate-700">
                      <span>兩根之和 <Latex math={'\\alpha + \\beta'} /></span>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="-?[0-9]*"
                        aria-label="兩根之和"
                        value={sumInput}
                        onChange={(e) => {
                          setSumInput(e.target.value);
                          if (feedback?.type === 'warning') setFeedback(null);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                        disabled={feedback?.type === 'success' || feedback?.type === 'error'}
                        className="w-full max-w-48 rounded-lg border-2 border-slate-300 bg-white p-3 text-center text-2xl focus:border-indigo-500 focus:outline-none disabled:bg-slate-100"
                        placeholder="輸入整數"
                      />
                    </label>
                    <label className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-4 font-semibold text-slate-700">
                      <span>兩根之積 <Latex math={'\\alpha\\beta'} /></span>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="-?[0-9]*"
                        aria-label="兩根之積"
                        value={productInput}
                        onChange={(e) => {
                          setProductInput(e.target.value);
                          if (feedback?.type === 'warning') setFeedback(null);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                        disabled={feedback?.type === 'success' || feedback?.type === 'error'}
                        className="w-full max-w-48 rounded-lg border-2 border-slate-300 bg-white p-3 text-center text-2xl focus:border-indigo-500 focus:outline-none disabled:bg-slate-100"
                        placeholder="輸入整數"
                      />
                    </label>
                  </div>
                )}
                <button
                  onClick={handleAnswerSubmit}
                  disabled={feedback?.type === 'success' || feedback?.type === 'error'}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isDiscriminantGame ? '確認 Δ 值' : '確認兩項答案'}
                </button>
              </div>
            )}

            {/* Step 2: Choose Nature */}
            {step === 2 && (
              <div className="text-center animate-fade-in">
                <div className="mb-6 bg-slate-50 p-4 rounded-xl inline-block text-lg">
                  確認判別式： <Latex math={`\\Delta = ${currentQuestion.delta}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-4">根據以上 <Latex math={'\\Delta'} />，方程的根是？</h3>
                
                <div className="grid gap-3 max-w-sm mx-auto">
                  <button 
                    onClick={() => handleNatureSelect('two-roots')}
                    className="p-4 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 flex flex-col items-center"
                  >
                    <span className="text-lg font-bold">2 個相異實根</span>
                    <span className="text-sm text-slate-500"><Latex math={'\\Delta > 0'} /></span>
                  </button>
                  <button 
                    onClick={() => handleNatureSelect('one-root')}
                    className="p-4 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 flex flex-col items-center"
                  >
                    <span className="text-lg font-bold">1 個二重實根</span>
                    <span className="text-sm text-slate-500"><Latex math={'\\Delta = 0'} /></span>
                  </button>
                  <button 
                    onClick={() => handleNatureSelect('no-roots')}
                    className="p-4 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 flex flex-col items-center"
                  >
                    <span className="text-lg font-bold">沒有實根</span>
                    <span className="text-sm text-slate-500"><Latex math={'\\Delta < 0'} /></span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Result & SVG */}
            {step === 3 && (
              <div className="text-center animate-fade-in space-y-6">
                {isDiscriminantGame ? (
                  <>
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
                  </>
                ) : (
                  <div className="rounded-xl bg-indigo-50 p-5">
                    <h3 className="mb-3 font-bold text-slate-700">本題答案</h3>
                    <div className="space-y-2 text-lg text-indigo-800">
                      <p><Latex math={getRootRelationCalculation('sum', currentQuestion)} /></p>
                      <p><Latex math={getRootRelationCalculation('product', currentQuestion)} /></p>
                    </div>
                  </div>
                )}

                <button
                  onClick={nextQuestion}
                  className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center mx-auto hover:bg-indigo-700"
                >
                  <span className="mr-2">{questionCount + 1 >= TOTAL_QUESTIONS ? '完成練習' : '下一題'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Feedback Message */}
            {feedback && (
              <div className={`mt-6 p-4 rounded-lg flex items-start ${
                feedback.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : feedback.type === 'warning'
                    ? 'bg-amber-50 text-amber-800'
                    : 'bg-red-50 text-red-800'
              } animate-fade-in`}>
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                ) : feedback.type === 'warning' ? (
                  <HelpCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 text-left leading-relaxed">
                  <p>{feedback.text}</p>
                  {feedback.calculation && (
                    <p className="mt-2"><span className="font-semibold">計算核對：</span><Latex math={feedback.calculation} /></p>
                  )}
                  {feedback.calculations?.map((calculation) => (
                    <p key={calculation.label} className="mt-2">
                      <span className="font-semibold">{calculation.label}：</span><Latex math={calculation.math} />
                    </p>
                  ))}
                  {isDiscriminantGame && step === 1 && feedback.type !== 'warning' && (
                    <button
                      onClick={() => {
                        setStep(2);
                        setFeedback(null);
                      }}
                      className="mt-4 rounded-lg bg-white px-4 py-2 font-bold text-indigo-700 shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      繼續判斷
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
