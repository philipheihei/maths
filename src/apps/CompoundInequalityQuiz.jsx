import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Check, X, Trophy, BookOpen, ArrowRight, Home as HomeIcon, RotateCcw
} from 'lucide-react';

// --- KaTeX 加載與渲染組件 ---
const loadKatex = () => {
  return new Promise((resolve, reject) => {
    if (window.katex) {
      resolve();
      return;
    }

    if (!document.querySelector('link[href*="katex.min.css"]')) {
      const link = document.createElement('link');
      link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const Latex = ({ math, block = false }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadKatex().then(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        window.katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
          output: 'html',
        });
      } catch (e) {
        console.error("KaTeX render error:", e);
        containerRef.current.innerText = math;
      }
    }
  }, [math, block, isLoaded]);

  return <span ref={containerRef} className={block ? "block text-center my-2" : "inline-block"} />;
};

// --- NumberLine SVG 組件 ---
const NumberLine = ({ min = -5, max = 5, solutions, type = 'interval' }) => {
  const width = 600;
  const height = 120;
  const padding = 60;
  const lineY = height / 2;
  const usableWidth = width - 2 * padding;
  const scale = usableWidth / (max - min);

  const getX = (value) => padding + (value - min) * scale;

  const renderSolutionRegion = () => {
    if (!solutions || solutions.length === 0) return null;

    return solutions.map((sol, idx) => {
      if (sol.type === 'interval') {
        const x1 = getX(sol.start);
        const x2 = getX(sol.end);
        return (
          <g key={`interval-${idx}`}>
            <rect
              x={Math.min(x1, x2)}
              y={lineY - 8}
              width={Math.abs(x2 - x1)}
              height={16}
              fill="#22c55e"
              opacity="0.3"
            />
            <line
              x1={Math.min(x1, x2)}
              y1={lineY}
              x2={Math.max(x1, x2)}
              y2={lineY}
              stroke="#22c55e"
              strokeWidth="4"
            />
            <circle
              cx={x1}
              cy={lineY}
              r={sol.startClosed ? 5 : 4}
              fill={sol.startClosed ? '#22c55e' : 'none'}
              stroke="#22c55e"
              strokeWidth="2"
            />
            <circle
              cx={x2}
              cy={lineY}
              r={sol.endClosed ? 5 : 4}
              fill={sol.endClosed ? '#22c55e' : 'none'}
              stroke="#22c55e"
              strokeWidth="2"
            />
            {/* 垂直連接線 */}
            <line x1={x1} y1={lineY + 10} x2={x1} y2={lineY + 20} stroke="#22c55e" strokeWidth="1.5" />
            <line x1={x2} y1={lineY + 10} x2={x2} y2={lineY + 20} stroke="#22c55e" strokeWidth="1.5" />
          </g>
        );
      } else if (sol.type === 'union') {
        const components = [];
        for (const comp of sol.intervals) {
          const x1 = getX(comp.start);
          const x2 = getX(comp.end);
          components.push(
            <g key={`union-${idx}-${comp.start}`}>
              <rect
                x={Math.min(x1, x2)}
                y={lineY - 8}
                width={Math.abs(x2 - x1)}
                height={16}
                fill="#3b82f6"
                opacity="0.3"
              />
              <line
                x1={Math.min(x1, x2)}
                y1={lineY}
                x2={Math.max(x1, x2)}
                y2={lineY}
                stroke="#3b82f6"
                strokeWidth="4"
              />
              <circle
                cx={x1}
                cy={lineY}
                r={comp.startClosed ? 5 : 4}
                fill={comp.startClosed ? '#3b82f6' : 'none'}
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <circle
                cx={x2}
                cy={lineY}
                r={comp.endClosed ? 5 : 4}
                fill={comp.endClosed ? '#3b82f6' : 'none'}
                stroke="#3b82f6"
                strokeWidth="2"
              />
              {/* 垂直連接線 */}
              <line x1={x1} y1={lineY + 10} x2={x1} y2={lineY + 20} stroke="#3b82f6" strokeWidth="1.5" />
              <line x1={x2} y1={lineY + 10} x2={x2} y2={lineY + 20} stroke="#3b82f6" strokeWidth="1.5" />
            </g>
          );
        }
        return components;
      } else if (sol.type === 'empty') {
        return (
          <text
            key={`empty-${idx}`}
            x={width / 2}
            y={lineY + 35}
            textAnchor="middle"
            fill="#ef4444"
            fontSize="16"
            fontWeight="bold"
          >
            無解
          </text>
        );
      } else if (sol.type === 'all') {
        return (
          <g key={`all-${idx}`}>
            <line
              x1={padding}
              y1={lineY}
              x2={width - padding}
              y2={lineY}
              stroke="#10b981"
              strokeWidth="3"
            />
            <text
              x={width / 2}
              y={lineY + 35}
              textAnchor="middle"
              fill="#10b981"
              fontSize="16"
              fontWeight="bold"
            >
              所有實數
            </text>
          </g>
        );
      }
      return null;
    });
  };

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="mt-4">
      {/* 數線 */}
      <line
        x1={padding}
        y1={lineY}
        x2={width - padding}
        y2={lineY}
        stroke="#374151"
        strokeWidth="2"
      />

      {/* 刻度和標籤 */}
      {Array.from({ length: max - min + 1 }).map((_, i) => {
        const value = min + i;
        const x = getX(value);
        return (
          <g key={`tick-${value}`}>
            <line
              x1={x}
              y1={lineY - 8}
              x2={x}
              y2={lineY + 8}
              stroke="#6b7280"
              strokeWidth="2"
            />
            <text
              x={x}
              y={lineY + 25}
              textAnchor="middle"
              fontSize="14"
              fill="#374151"
              fontWeight="500"
            >
              {value}
            </text>
          </g>
        );
      })}

      {/* 箭頭指示 */}
      <path
        d={`M ${getX(max)} ${lineY} L ${getX(max) + 12} ${lineY - 8}`}
        stroke="#374151"
        strokeWidth="2"
        fill="none"
      />
      <path
        d={`M ${getX(max)} ${lineY} L ${getX(max) + 12} ${lineY + 8}`}
        stroke="#374151"
        strokeWidth="2"
        fill="none"
      />

      {/* 解區間 */}
      {renderSolutionRegion()}
    </svg>
  );
};

// --- 主應用程式 ---
const CompoundInequalityQuiz = () => {
  // 遊戲狀態
  const [phase, setPhase] = useState('simplification'); // 'simplification' 或 'integer-solutions'
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('idle'); // 'idle', 'correct', 'wrong'
  const [showDiagram, setShowDiagram] = useState(false);
  const [streak, setStreak] = useState(0);
  const inputRef = useRef(null);

  // 題目資料庫
  const QUESTIONS = {
    simplification: [
      {
        id: 1,
        text: '化簡：$x > 2$ 且 $x < 5$',
        type: 'and',
        answer: '2 < x < 5',
        alternatives: ['x < 5 且 x > 2', 'x > 2 及 x < 5'],
        explanation: '「且」表示同時滿足兩個條件',
        numberLine: { solutions: [{ type: 'interval', start: 2, end: 5, startClosed: false, endClosed: false }] }
      },
      {
        id: 2,
        text: '化簡：$x \\leq -1$ 且 $x \\geq -3$',
        type: 'and',
        answer: '-3 ≤ x ≤ -1',
        alternatives: ['-3 ≤ x ≤ -1', 'x ≥ -3 且 x ≤ -1'],
        explanation: '兩個不等式同時成立的範圍',
        numberLine: { solutions: [{ type: 'interval', start: -3, end: -1, startClosed: true, endClosed: true }] }
      },
      {
        id: 3,
        text: '化簡：$x > 0$ 或 $x < -2$',
        type: 'or',
        answer: 'x < -2 或 x > 0',
        alternatives: ['x > 0 或 x < -2', 'x < -2 或 x > 0'],
        explanation: '「或」表示滿足至少其中一個條件',
        numberLine: { 
          solutions: [{ 
            type: 'union', 
            intervals: [
              { start: -5, end: -2, startClosed: false, endClosed: false },
              { start: 0, end: 5, startClosed: false, endClosed: false }
            ]
          }]
        }
      },
      {
        id: 4,
        text: '化簡：$x \\geq 3$ 且 $x < 1$',
        type: 'contradiction',
        answer: '無解',
        alternatives: ['無解', '空集', '∅'],
        explanation: '沒有數既大於等於3又小於1',
        numberLine: { solutions: [{ type: 'empty' }] }
      },
      {
        id: 5,
        text: '化簡：$x \\geq -2$ 且 $x \\leq 4$',
        type: 'and',
        answer: '-2 ≤ x ≤ 4',
        alternatives: ['-2 ≤ x ≤ 4', 'x ≥ -2 且 x ≤ 4'],
        explanation: '同時滿足兩個邊界條件',
        numberLine: { solutions: [{ type: 'interval', start: -2, end: 4, startClosed: true, endClosed: true }] }
      },
      {
        id: 6,
        text: '化簡：$x < 1$ 或 $x > 1$',
        type: 'or',
        answer: 'x ≠ 1',
        alternatives: ['x ≠ 1', 'x ∈ ℝ \\ {1}', '所有實數除了1'],
        explanation: '除了1以外的所有實數',
        numberLine: { solutions: [{ type: 'all' }] }
      },
      {
        id: 7,
        text: '化簡：$-3 < x$ 且 $x < 2$',
        type: 'and',
        answer: '-3 < x < 2',
        alternatives: ['x > -3 且 x < 2', '-3 < x < 2'],
        explanation: '介於-3和2之間的數',
        numberLine: { solutions: [{ type: 'interval', start: -3, end: 2, startClosed: false, endClosed: false }] }
      },
      {
        id: 8,
        text: '化簡：$x \\leq -4$ 或 $x \\geq -1$',
        type: 'or',
        answer: 'x ≤ -4 或 x ≥ -1',
        alternatives: ['x ≤ -4 或 x ≥ -1', 'x ≥ -1 或 x ≤ -4'],
        explanation: '兩個分離區間的並集',
        numberLine: { 
          solutions: [{ 
            type: 'union', 
            intervals: [
              { start: -5, end: -4, startClosed: true, endClosed: true },
              { start: -1, end: 5, startClosed: true, endClosed: true }
            ]
          }]
        }
      }
    ],
    'integer-solutions': [
      {
        id: 101,
        text: '求滿足 $1 < x < 4$ 的整數',
        type: 'interval-integer',
        answer: '2, 3',
        alternatives: ['2, 3', '2和3', 'x = 2 或 x = 3'],
        explanation: '介於1和4之間的整數只有2和3',
        numberLine: { solutions: [{ type: 'interval', start: 1, end: 4, startClosed: false, endClosed: false }] }
      },
      {
        id: 102,
        text: '求滿足 $-2 \\leq x < 3$ 的整數',
        type: 'interval-integer',
        answer: '-2, -1, 0, 1, 2',
        alternatives: ['-2, -1, 0, 1, 2', 'x ∈ {-2, -1, 0, 1, 2}'],
        explanation: '包括-2但不包括3的整數',
        numberLine: { solutions: [{ type: 'interval', start: -2, end: 3, startClosed: true, endClosed: false }] }
      },
      {
        id: 103,
        text: '求滿足 $x < -1$ 或 $x > 2$ 的整數（-3到4範圍內）',
        type: 'union-integer',
        answer: '-3, -2, 3, 4',
        alternatives: ['-3, -2, 3, 4', 'x ∈ {-3, -2, 3, 4}'],
        explanation: '兩個分離區間內的整數',
        numberLine: { 
          solutions: [{ 
            type: 'union', 
            intervals: [
              { start: -3, end: -1, startClosed: true, endClosed: false },
              { start: 2, end: 4, startClosed: false, endClosed: true }
            ]
          }]
        }
      },
      {
        id: 104,
        text: '求滿足 $-1 < x \\leq 3$ 的整數',
        type: 'interval-integer',
        answer: '0, 1, 2, 3',
        alternatives: ['0, 1, 2, 3', 'x ∈ {0, 1, 2, 3}'],
        explanation: '不包括-1但包括3的整數',
        numberLine: { solutions: [{ type: 'interval', start: -1, end: 3, startClosed: false, endClosed: true }] }
      },
      {
        id: 105,
        text: '求滿足 $0 < x < 2$ 的整數',
        type: 'interval-integer',
        answer: '1',
        alternatives: ['1', 'x = 1'],
        explanation: '介於0和2之間的整數只有1',
        numberLine: { solutions: [{ type: 'interval', start: 0, end: 2, startClosed: false, endClosed: false }] }
      },
      {
        id: 106,
        text: '求滿足 $x \\leq -3$ 或 $x \\geq 2$ 的整數（-4到3範圍內）',
        type: 'union-integer',
        answer: '-4, -3, 2, 3',
        alternatives: ['-4, -3, 2, 3', 'x ∈ {-4, -3, 2, 3}'],
        explanation: '兩個邊界包括的整數',
        numberLine: { 
          solutions: [{ 
            type: 'union', 
            intervals: [
              { start: -4, end: -3, startClosed: true, endClosed: true },
              { start: 2, end: 3, startClosed: true, endClosed: true }
            ]
          }]
        }
      },
      {
        id: 107,
        text: '求滿足 $-3 < x < 0$ 的整數',
        type: 'interval-integer',
        answer: '-2, -1',
        alternatives: ['-2, -1', 'x ∈ {-2, -1}'],
        explanation: '介於-3和0之間的整數',
        numberLine: { solutions: [{ type: 'interval', start: -3, end: 0, startClosed: false, endClosed: false }] }
      },
      {
        id: 108,
        text: '求滿足 $-5 \\leq x \\leq -2$ 的整數',
        type: 'interval-integer',
        answer: '-5, -4, -3, -2',
        alternatives: ['-5, -4, -3, -2', 'x ∈ {-5, -4, -3, -2}'],
        explanation: '兩個邊界都包括的整數',
        numberLine: { solutions: [{ type: 'interval', start: -5, end: -2, startClosed: true, endClosed: true }] }
      }
    ]
  };

  const currentQuestions = QUESTIONS[phase];

  // 初始化第一題
  useEffect(() => {
    selectRandomQuestion();
  }, [phase]);

  const selectRandomQuestion = () => {
    const randomQuestion = currentQuestions[Math.floor(Math.random() * currentQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setUserAnswer('');
    setFeedback('idle');
    setShowDiagram(false);
  };

  // 驗證答案
  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      alert('請輸入答案');
      return;
    }

    const userNormalized = userAnswer
      .trim()
      .replace(/\s+/g, '')
      .replace(/且|及|和/g, '且')
      .replace(/或/g, '或')
      .toLowerCase();

    const correctNormalized = currentQuestion.answer
      .trim()
      .replace(/\s+/g, '')
      .replace(/且|及|和/g, '且')
      .replace(/或/g, '或')
      .toLowerCase();

    const validAnswers = [correctNormalized, ...currentQuestion.alternatives.map(a => 
      a.trim()
        .replace(/\s+/g, '')
        .replace(/且|及|和/g, '且')
        .replace(/或/g, '或')
        .toLowerCase()
    )];

    if (validAnswers.includes(userNormalized)) {
      setFeedback('correct');
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setFeedback('wrong');
      setShowDiagram(true);
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    selectRandomQuestion();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && feedback === 'idle') {
      checkAnswer();
    } else if ((e.key === 'Enter' || e.key === ' ') && feedback !== 'idle') {
      nextQuestion();
    }
  };

  const switchPhase = (newPhase) => {
    setPhase(newPhase);
    setScore(0);
    setStreak(0);
  };

  if (!currentQuestion) {
    return <div className="text-center mt-10">載入中...</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* 頂部導航 */}
        <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition font-medium text-sm md:text-base"
            >
              <HomeIcon size={20} />
              <span className="hidden sm:inline">回首頁</span>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              複合不等式學習
            </h1>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase tracking-wider">累積分數</div>
                <div className="text-2xl font-bold text-indigo-600">{score}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 主內容區域 */}
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">

          {/* 階段選擇 */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <button
              onClick={() => switchPhase('simplification')}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                phase === 'simplification'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              階段 1: 化簡不等式
            </button>
            <button
              onClick={() => switchPhase('integer-solutions')}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                phase === 'integer-solutions'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              階段 2: 求整數解
            </button>
          </div>

          {/* 題目卡片 */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6 border border-slate-100">
            
            {/* 題號 */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold rounded-full">
                題 {currentQuestion.id}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {phase === 'simplification' ? '化簡不等式' : '求整數解'}
              </span>
            </div>

            {/* 題目文本 */}
            <div className="bg-slate-50 rounded-lg p-5 mb-6 border-l-4 border-blue-500">
              <h2 className="text-lg md:text-2xl font-bold text-slate-800 mb-2">
                <Latex math={currentQuestion.text} block={false} />
              </h2>
            </div>

            {/* 數線圖表（僅在答案錯誤或提交後顯示） */}
            {showDiagram && (
              <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200 animate-in fade-in">
                <h3 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wider">數線圖表</h3>
                <NumberLine {...currentQuestion.numberLine} />
              </div>
            )}

            {/* 輸入區域 */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                你的答案
              </label>
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="輸入你的答案..."
                disabled={feedback !== 'idle'}
                className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>

            {/* 反饋區域 */}
            <div className="flex flex-col gap-4 mb-6 min-h-[120px]">
              {feedback === 'idle' && (
                <button
                  onClick={checkAnswer}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition active:scale-95 flex items-center justify-center gap-2 text-lg"
                >
                  <Check size={20} />
                  提交答案
                </button>
              )}

              {feedback === 'correct' && (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-5 animate-in fade-in zoom-in">
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="text-green-500" size={28} />
                    <span className="text-2xl font-bold text-green-600">答對了！</span>
                  </div>
                  <p className="text-green-700 font-medium">{currentQuestion.explanation}</p>
                  <div className="bg-blue-50 rounded-lg p-4 mt-4 border-l-4 border-blue-500">
                    <div className="text-sm text-blue-700 mb-1">正確答案：</div>
                    <div className="text-xl font-bold text-blue-900">
                      <Latex math={currentQuestion.answer} />
                    </div>
                  </div>
                </div>
              )}

              {feedback === 'wrong' && (
                <div className="bg-red-50 border-2 border-red-500 rounded-lg p-5 animate-in fade-in zoom-in">
                  <div className="flex items-center gap-3 mb-3">
                    <X className="text-red-500" size={28} />
                    <span className="text-2xl font-bold text-red-600">再接再厲</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-red-200 mb-3">
                    <div className="text-xs text-red-600 font-bold mb-1">你的答案：</div>
                    <div className="text-lg text-red-700 font-mono">{userAnswer}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <div className="text-xs text-green-700 font-bold mb-1">正確答案：</div>
                    <div className="text-lg font-bold text-green-900">
                      <Latex math={currentQuestion.answer} />
                    </div>
                  </div>
                  <p className="text-slate-700 mt-3 text-sm">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>

            {/* 下一題按鈕 */}
            {feedback !== 'idle' && (
              <button
                onClick={nextQuestion}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition active:scale-95 flex items-center justify-center gap-2 text-lg"
              >
                <ArrowRight size={20} />
                下一題
              </button>
            )}
          </div>

          {/* 幫助提示 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 max-w-2xl mx-auto">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-lg">
              <BookOpen size={20} className="text-blue-500" />
              複合不等式提示
            </h3>
            <ul className="space-y-2 text-slate-700 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>且（AND）</strong>：同時滿足兩個條件，答案通常是一個區間</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>或（OR）</strong>：滿足至少一個條件，答案可能是多個分離區間</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>≤、≥</strong>：邊界點包括在內（實心圓）</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>&lt;、&gt;</strong>：邊界點不包括在內（空心圓）</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>整數解：只列出區間內的整數，用逗號分隔</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 頁腳 */}
        <div className="mt-12 bg-white border-t border-slate-200 py-4 text-center text-sm text-slate-500">
          <p>複合不等式是高中數學的重要概念 | 遊數得計 © 2025</p>
        </div>
      </div>
    </>
  );
};

export default CompoundInequalityQuiz;
