import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';

// Questions data - equations where students make y the subject
const QUESTIONS = [
  {
    id: 1,
    equation: "7(y+x)=2y+k",
    steps: [
      { title: "展開 (Expand)", formula: "7y+7x=2y+k" },
      { title: "移項 (Move terms)", formula: "7y-2y=k-7x" },
      { title: "合併 (Combine)", formula: "5y=k-7x" },
      { title: "除 (Divide)", formula: "y=\\frac{k-7x}{5}" }
    ],
    correctAnswer: "y=(k-7x)/5",
    validAnswers: [
      "y=(k-7x)/5",
      "y=(k-7x)/5",
      "(k-7x)/5",
      "y=k/5-7x/5",
      "y=k/5-(7x)/5",
      "y=(k/5)-(7x/5)"
    ],
    hint: "記得將 7-2 化簡為 5"
  },
  {
    id: 2,
    equation: "3(y-2)=5y+k",
    steps: [
      { title: "展開 (Expand)", formula: "3y-6=5y+k" },
      { title: "移項 (Move terms)", formula: "3y-5y=k+6" },
      { title: "合併 (Combine)", formula: "-2y=k+6" },
      { title: "除 (Divide)", formula: "y=\\frac{k+6}{-2}" }
    ],
    correctAnswer: "y=(k+6)/(-2)",
    validAnswers: [
      "y=(k+6)/(-2)",
      "y=-(k+6)/2",
      "y=(-k-6)/2",
      "(k+6)/(-2)",
      "-(k+6)/2",
      "(-k-6)/2"
    ],
    hint: "記得將 3-5 化簡為 -2"
  },
  {
    id: 3,
    equation: "4y+3x=9y-k",
    steps: [
      { title: "移項 (Move terms)", formula: "4y-9y=-k-3x" },
      { title: "合併 (Combine)", formula: "-5y=-k-3x" },
      { title: "除 (Divide)", formula: "y=\\frac{-k-3x}{-5}" }
    ],
    correctAnswer: "y=(-k-3x)/(-5)",
    validAnswers: [
      "y=(-k-3x)/(-5)",
      "y=(k+3x)/5",
      "(k+3x)/5",
      "y=k/5+3x/5",
      "y=(k/5)+(3x/5)"
    ],
    hint: "記得將 4-9 化簡為 -5"
  },
  {
    id: 4,
    equation: "8(y-x)=3y+2k",
    steps: [
      { title: "展開 (Expand)", formula: "8y-8x=3y+2k" },
      { title: "移項 (Move terms)", formula: "8y-3y=2k+8x" },
      { title: "合併 (Combine)", formula: "5y=2k+8x" },
      { title: "除 (Divide)", formula: "y=\\frac{2k+8x}{5}" }
    ],
    correctAnswer: "y=(2k+8x)/5",
    validAnswers: [
      "y=(2k+8x)/5",
      "(2k+8x)/5",
      "y=2k/5+8x/5",
      "y=(2k/5)+(8x/5)"
    ],
    hint: "記得將 8-3 化簡為 5"
  },
  {
    id: 5,
    equation: "6y+4=10y-3k",
    steps: [
      { title: "移項 (Move terms)", formula: "6y-10y=-3k-4" },
      { title: "合併 (Combine)", formula: "-4y=-3k-4" },
      { title: "除 (Divide)", formula: "y=\\frac{-3k-4}{-4}" }
    ],
    correctAnswer: "y=(-3k-4)/(-4)",
    validAnswers: [
      "y=(-3k-4)/(-4)",
      "y=(3k+4)/4",
      "(3k+4)/4",
      "y=3k/4+1",
      "y=(3k/4)+1",
      "y=3k/4+4/4"
    ],
    hint: "記得將 6-10 化簡為 -4"
  }
];

// KaTeX loading utility
const loadKatex = () => {
  return new Promise((resolve, reject) => {
    if (window.katex) {
      resolve();
      return;
    }

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load KaTeX'));
    document.head.appendChild(script);
  });
};

// Math expression renderer component
const MathRenderer = ({ expression, displayMode = false }) => {
  const spanRef = React.useRef(null);

  useEffect(() => {
    if (spanRef.current && window.katex) {
      try {
        window.katex.render(expression, spanRef.current, {
          displayMode: displayMode,
          throwOnError: false
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
      }
    }
  }, [expression, displayMode]);

  return <span ref={spanRef}>{expression}</span>;
};

// Normalize answer for comparison
const normalizeAnswer = (answer) => {
  return answer
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/\*/g, '')
    .replace(/\{|\}/g, '')
    .replace(/\\frac/g, '')
    .replace(/\\left|\\right/g, '');
};

// Custom keypad component
const Keypad = ({ onInput, onDelete, onClear, onEnter, isVisible, toggleVisibility }) => {
  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      >
        顯示鍵盤
      </button>
    );
  }

  const buttons = [
    ['7', '8', '9', 'x', 'k'],
    ['4', '5', '6', 'y', '='],
    ['1', '2', '3', '+', '-'],
    ['0', '(', ')', '/', 'Del'],
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 p-4 shadow-lg z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between mb-2">
          <button
            onClick={toggleVisibility}
            className="text-gray-600 hover:text-gray-800"
          >
            隱藏鍵盤
          </button>
          <button
            onClick={onClear}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            清除全部
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {buttons.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((btn) => (
                <button
                  key={btn}
                  onClick={() => btn === 'Del' ? onDelete() : onInput(btn)}
                  className={`p-4 text-lg font-medium rounded-lg ${
                    btn === 'Del'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </React.Fragment>
          ))}
          <button
            onClick={onEnter}
            className="col-span-5 p-4 text-lg font-medium bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            提交答案
          </button>
        </div>
      </div>
    </div>
  );
};

const MakeSubjectQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState({ type: 'neutral', msg: '' });
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const [katexLoaded, setKatexLoaded] = useState(false);
  const [keypadVisible, setKeypadVisible] = useState(true);

  useEffect(() => {
    loadKatex()
      .then(() => setKatexLoaded(true))
      .catch((err) => console.error('KaTeX loading failed:', err));
  }, []);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  const handleKeypadInput = (value) => {
    setUserAnswer(prev => prev + value);
  };

  const handleDelete = () => {
    setUserAnswer(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setUserAnswer('');
  };

  const toggleKeypad = () => {
    setKeypadVisible(!keypadVisible);
  };

  const handleSubmit = () => {
    if (isAnswered) return;

    const normalized = normalizeAnswer(userAnswer);
    const isCorrect = currentQuestion.validAnswers.some(
      validAnswer => normalizeAnswer(validAnswer) === normalized
    );

    if (isCorrect) {
      setFeedback({ 
        type: 'correct', 
        msg: '正確！答案已化簡。' 
      });
      setScore(score + 1);
    } else {
      setFeedback({ 
        type: 'incorrect', 
        msg: `不正確。記得要化簡！正確答案是 ${currentQuestion.correctAnswer}` 
      });
    }
    setIsAnswered(true);
    setShowSteps(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setFeedback({ type: 'neutral', msg: '' });
      setIsAnswered(false);
      setShowSteps(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setFeedback({ type: 'neutral', msg: '' });
    setIsAnswered(false);
    setScore(0);
    setShowSteps(false);
  };

  const isComplete = currentQuestionIndex === QUESTIONS.length - 1 && isAnswered;

  if (!katexLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 pb-80">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft size={20} />
            <span>返回主頁</span>
          </Link>
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <RotateCcw size={18} />
            <span>重新開始</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            令 y 成為主項
          </h1>
          <p className="text-gray-600">
            Making y the subject of the formula
          </p>
        </div>

        {/* Score Display */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-lg">
              <span className="text-gray-600">題目：</span>
              <span className="font-bold text-blue-600">
                {currentQuestionIndex + 1} / {QUESTIONS.length}
              </span>
            </div>
            <div className="text-lg">
              <span className="text-gray-600">得分：</span>
              <span className="font-bold text-green-600">
                {score} / {QUESTIONS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              令 y 成為以下公式的主項：
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-2xl">
                <MathRenderer expression={currentQuestion.equation} displayMode={true} />
              </div>
            </div>
          </div>

          {/* Hint */}
          {!isAnswered && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-800">
                💡 提示：{currentQuestion.hint}
              </p>
            </div>
          )}

          {/* Answer Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              你的答案（請輸入化簡後的答案）：
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="例如：y=(k-7x)/5"
              disabled={isAnswered}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100 text-lg"
            />
          </div>

          {/* Submit Button */}
          {!isAnswered && (
            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              提交答案
            </button>
          )}

          {/* Feedback */}
          {feedback.msg && (
            <div className={`mt-6 p-4 rounded-lg ${
              feedback.type === 'correct' 
                ? 'bg-green-50 border-2 border-green-500' 
                : 'bg-red-50 border-2 border-red-500'
            }`}>
              <p className={`font-medium ${
                feedback.type === 'correct' ? 'text-green-800' : 'text-red-800'
              }`}>
                {feedback.msg}
              </p>
            </div>
          )}

          {/* Solution Steps */}
          {showSteps && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                解題步驟：
              </h3>
              <div className="space-y-4">
                {currentQuestion.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-700 mb-2">{step.title}</p>
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <MathRenderer expression={step.formula} displayMode={false} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next/Complete Button */}
          {isAnswered && (
            <div className="mt-6">
              {!isComplete ? (
                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  下一題 →
                </button>
              ) : (
                <div className="text-center">
                  <div className="mb-4 p-6 bg-green-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                      完成！(Completed)
                    </h3>
                    <p className="text-xl text-gray-700">
                      最終得分：<span className="font-bold text-green-600">{score} / {QUESTIONS.length}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleRestart}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    再做一次
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Virtual Keypad */}
      <Keypad
        onInput={handleKeypadInput}
        onDelete={handleDelete}
        onClear={handleClear}
        onEnter={handleSubmit}
        isVisible={keypadVisible}
        toggleVisibility={toggleKeypad}
      />
    </div>
  );
};

export default MakeSubjectQuiz;
