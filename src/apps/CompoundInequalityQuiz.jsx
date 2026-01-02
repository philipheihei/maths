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
    loadKatex().then(() => setIsLoaded(true)).catch(e => console.error("KaTeX load error:", e));
  }, []);

  useEffect(() => {
    if (isLoaded && window.katex && containerRef.current && math) {
      try {
        containerRef.current.innerHTML = '';
        
        // 檢查是否包含 $ 符號（混合文本模式）
        if (math.includes('$')) {
          // 處理混合文本和公式：$..$ 表示 inline，$$...$$ 表示 display
          const parts = math.split(/(\$\$.*?\$\$|\$.*?\$)/g);
          
          parts.forEach(part => {
            if (part.startsWith('$$') && part.endsWith('$$')) {
              // Display 公式
              const latex = part.slice(2, -2);
              const span = document.createElement('div');
              span.style.margin = '10px 0';
              try {
                window.katex.render(latex, span, { displayMode: true, throwOnError: false });
              } catch (e) {
                span.textContent = part;
              }
              containerRef.current.appendChild(span);
            } else if (part.startsWith('$') && part.endsWith('$')) {
              // Inline 公式
              const latex = part.slice(1, -1);
              const span = document.createElement('span');
              try {
                window.katex.render(latex, span, { displayMode: false, throwOnError: false });
              } catch (e) {
                span.textContent = part;
              }
              containerRef.current.appendChild(span);
            } else if (part.trim()) {
              // 普通文本
              const textSpan = document.createElement('span');
              textSpan.textContent = part;
              containerRef.current.appendChild(textSpan);
            }
          });
        } else {
          // 純 LaTeX 公式模式（教學模式用）
          window.katex.render(math, containerRef.current, {
            displayMode: block,
            throwOnError: false,
            output: 'html',
          });
        }
      } catch (e) {
        console.error("KaTeX render error:", e);
        containerRef.current.innerText = math;
      }
    }
  }, [math, block, isLoaded]);

  return <span ref={containerRef} className={block ? "block text-center my-2" : "inline-block"} />;
};

// --- NumberLine SVG 組件 ---
const NumberLine = ({ min = -5, max = 5, solutions, type = 'interval', showMultiLine = false }) => {
  const width = 600;
  const height = showMultiLine ? 180 : 120;
  const padding = 60;
  const lineY = showMultiLine ? 140 : height / 2;
  const usableWidth = width - 2 * padding;
  const scale = usableWidth / (max - min);

  const getX = (value) => padding + (value - min) * scale;

  const renderSolutionRegion = () => {
    if (!solutions || solutions.length === 0) return null;

    return solutions.map((sol, idx) => {
      if (sol.type === 'interval') {
        const x1 = getX(sol.start);
        const x2 = getX(sol.end);
        
        // 多線模式（用於顯示 AND/OR）
        if (showMultiLine && sol.lines) {
          return (
            <g key={`interval-${idx}`}>
              {sol.lines.map((line, lineIdx) => {
                const lineY_offset = 60 + lineIdx * 35;
                const startX = getX(line.start);
                const lineStartX = line.direction === 'right' ? startX : padding;
                const lineEndX = line.direction === 'right' ? width - padding : startX;
                const color = line.color || '#3b82f6';
                
                return (
                  <g key={`line-${lineIdx}`}>
                    {/* 線段 */}
                    <line
                      x1={lineStartX}
                      y1={lineY_offset}
                      x2={lineEndX}
                      y2={lineY_offset}
                      stroke={color}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    
                    {/* 起點圓點 */}
                    <circle
                      cx={startX}
                      cy={lineY_offset}
                      r="5"
                      fill={line.closed ? color : 'white'}
                      stroke={color}
                      strokeWidth="2"
                    />
                    
                    {/* 終點箭頭 */}
                    {line.direction === 'right' && (
                      <>
                        <polygon
                          points={`${lineEndX},${lineY_offset} ${lineEndX - 8},${lineY_offset - 6} ${lineEndX - 8},${lineY_offset + 6}`}
                          fill={color}
                        />
                      </>
                    )}
                    {line.direction === 'left' && (
                      <>
                        <polygon
                          points={`${lineStartX},${lineY_offset} ${lineStartX + 8},${lineY_offset - 6} ${lineStartX + 8},${lineY_offset + 6}`}
                          fill={color}
                        />
                      </>
                    )}
                    
                    {/* 實線連接到主數線（停在圓圈上方） */}
                    <line
                      x1={startX}
                      y1={lineY_offset - 5}
                      x2={startX}
                      y2={lineY + 8}
                      stroke={color}
                      strokeWidth="1.5"
                      opacity="0.7"
                    />
                    
                    {/* 在主數線上的標記 */}
                    <circle
                      cx={startX}
                      cy={lineY}
                      r="4"
                      fill={color}
                      opacity="0.7"
                    />
                  </g>
                );
              })}
            </g>
          );
        }
        
        // 原始單線模式
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
  // 模式狀態
  const [mode, setMode] = useState('learn'); // 'learn' 或 'quiz' - 移除 'menu'
  // 遊戲狀態
  const [phase, setPhase] = useState('simplification'); // 'simplification' 或 'integer-solutions'
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('idle'); // 'idle', 'correct', 'wrong'
  const [showDiagram, setShowDiagram] = useState(false);
  const [streak, setStreak] = useState(0);
  const [learnHighlight, setLearnHighlight] = useState(null); // 教學模式高亮
  const [questionStage, setQuestionStage] = useState(1); // 題目階段：1 或 2
  const [stage2Question, setStage2Question] = useState(null); // 第二階段題目
  const [showHint, setShowHint] = useState(false); // 提示按鈕狀態
  const inputRef = useRef(null);

  // 8 種複合不等式情況
  const EIGHT_CASES = [
    {
      id: 1,
      title: '方向相同 (向右)',
      subtitle: 'AND取大，OR取小',
      examples: [
        { label: 'AND (及)', latex: 'x > 2 \\text{ 及 } x > 5', result: 'x > 5', color: 'blue', highlight: { start: 5, end: 8, color: '#3b82f6' } },
        { label: 'OR (或)', latex: 'x > 2 \\text{ 或 } x > 5', result: 'x > 2', color: 'red', highlight: { start: 2, end: 8, color: '#ef4444' } }
      ],
      numberLines: [
        { min: 0, max: 8, lines: [
          { start: 2, direction: 'right', closed: false, color: '#3b82f6', y: 30 },
          { start: 5, direction: 'right', closed: false, color: '#ef4444', y: 60 }
        ]},
      ]
    },
    {
      id: 2,
      title: '方向相同 (向左)',
      subtitle: 'AND取小，OR取大',
      examples: [
        { label: 'AND (及)', latex: 'x < 2 \\text{ 及 } x < 5', result: 'x < 2', color: 'blue', highlight: { start: 0, end: 2, color: '#3b82f6' } },
        { label: 'OR (或)', latex: 'x < 2 \\text{ 或 } x < 5', result: 'x < 5', color: 'red', highlight: { start: 0, end: 5, color: '#ef4444' } }
      ],
      numberLines: [
        { min: 0, max: 8, lines: [
          { start: 2, direction: 'left', closed: false, color: '#3b82f6', y: 30 },
          { start: 5, direction: 'left', closed: false, color: '#ef4444', y: 60 }
        ]},
      ]
    },
    {
      id: 3,
      title: '方向相對 (重疊)',
      subtitle: 'AND夾中間，OR全實數',
      examples: [
        { label: 'AND (及)', latex: 'x > 2 \\text{ 及 } x < 5', result: '2 < x < 5', color: 'blue', highlight: { start: 2, end: 5, color: '#3b82f6' } },
        { label: 'OR (或)', latex: 'x > 2 \\text{ 或 } x < 5', result: '所有實數', color: 'red', highlight: { start: 0, end: 8, color: '#ef4444' } }
      ],
      numberLines: [
        { min: 0, max: 8, lines: [
          { start: 2, direction: 'right', closed: false, color: '#3b82f6', y: 30 },
          { start: 5, direction: 'left', closed: false, color: '#ef4444', y: 60 }
        ]},
      ]
    },
    {
      id: 4,
      title: '方向相反 (分離)',
      subtitle: 'AND無解，OR分兩邊',
      examples: [
        { label: 'AND (及)', latex: 'x < 2 \\text{ 及 } x > 5', result: '無解', color: 'blue', highlight: { start: 0, end: 0, color: '#3b82f6' } },
        { label: 'OR (或)', latex: 'x < 2 \\text{ 或 } x > 5', result: 'x < 2 或 x > 5', color: 'red', highlight: { start: 0, end: 8, color: '#ef4444' } }
      ],
      numberLines: [
        { min: 0, max: 8, lines: [
          { start: 2, direction: 'left', closed: false, color: '#3b82f6', y: 30 },
          { start: 5, direction: 'right', closed: false, color: '#ef4444', y: 60 }
        ]},
      ]
    }
  ];

  // 雙線數線 SVG 組件（用於教學模式）
  const TwoLineNumberLine = ({ min, max, lines, highlightRegion }) => {
    const width = 400;
    const height = 140;
    const padding = 40;
    const usableWidth = width - 2 * padding;
    const scale = usableWidth / (max - min);
    const axisY = 120;

    const getX = (value) => padding + (value - min) * scale;

    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="mt-2">
        {/* 高亮區域 */}
        {highlightRegion && (
          <rect
            x={getX(highlightRegion.start)}
            y={highlightRegion.lineY - 15}
            width={Math.abs(getX(highlightRegion.end) - getX(highlightRegion.start))}
            height={30}
            fill={highlightRegion.color}
            opacity="0.2"
          />
        )}

        {/* 數軸 */}
        <line x1={padding} y1={axisY} x2={width - padding} y2={axisY} stroke="#374151" strokeWidth="2" />
        
        {/* 刻度 */}
        {Array.from({ length: max - min + 1 }).map((_, i) => {
          const value = min + i;
          const x = getX(value);
          return (
            <g key={`tick-${value}`}>
              <line x1={x} y1={axisY - 5} x2={x} y2={axisY + 5} stroke="#6b7280" strokeWidth="1.5" />
              <text x={x} y={axisY + 20} textAnchor="middle" fontSize="11" fill="#374151">{value}</text>
            </g>
          );
        })}

        {/* 繪製兩條不等式線 */}
        {lines.map((line, idx) => {
          const x = getX(line.start);
          const lineY = line.y + 20;
          const arrowEnd = line.direction === 'right' ? width - padding + 10 : padding - 10;
          
          return (
            <g key={`line-${idx}`}>
              {/* 不等式線 - 全實線 */}
              <line 
                x1={x} 
                y1={lineY} 
                x2={arrowEnd} 
                y2={lineY} 
                stroke={line.color} 
                strokeWidth="3" 
              />
              {/* 箭頭 */}
              {line.direction === 'right' ? (
                <path d={`M ${arrowEnd - 8} ${lineY - 5} L ${arrowEnd} ${lineY} L ${arrowEnd - 8} ${lineY + 5}`} fill={line.color} />
              ) : (
                <path d={`M ${arrowEnd + 8} ${lineY - 5} L ${arrowEnd} ${lineY} L ${arrowEnd + 8} ${lineY + 5}`} fill={line.color} />
              )}
              {/* 邊界圓 - 無縫貼合連接線 */}
              <circle 
                cx={x} 
                cy={lineY} 
                r={5} 
                fill={line.closed ? line.color : 'white'} 
                stroke={line.color} 
                strokeWidth="2" 
              />
              {/* 垂直連接線到數軸 - 實線，無縫貼合 */}
              <line 
                x1={x} 
                y1={lineY + 5} 
                x2={x} 
                y2={axisY - 5} 
                stroke={line.color} 
                strokeWidth="2" 
              />
            </g>
          );
        })}
      </svg>
    );
  };

  // 題目資料庫
  const QUESTIONS = {
    simplification: [
      {
        id: 1,
        text: '化簡：$x > 2$ 及 $x < 5$',
        type: 'and',
        answer: '2 < x < 5',
        alternatives: ['x < 5 及 x > 2', 'x > 2 及 x < 5'],
        explanation: '「及」表示同時滿足兩個條件',
        numberLine: { 
          solutions: [{ 
            type: 'interval', 
            start: 2, 
            end: 5, 
            startClosed: false, 
            endClosed: false,
            lines: [
              { start: 2, direction: 'right', closed: false, color: '#3b82f6' },
              { start: 5, direction: 'left', closed: false, color: '#ef4444' }
            ]
          }] 
        },
        stage2: {
          id: 201,
          text: '求滿足 $2 < x < 5$ 的整數',
          type: 'interval-integer',
          answer: '3, 4',
          alternatives: ['3, 4', '3和4', 'x = 3 或 x = 4'],
          explanation: '介於2和5之間的整數有3和4',
          numberLine: { solutions: [{ type: 'interval', start: 2, end: 5, startClosed: false, endClosed: false }] }
        }
      },
      {
        id: 2,
        text: '化簡：$x \\leq -1$ 及 $x \\geq -3$',
        type: 'and',
        answer: '-3 ≤ x ≤ -1',
        alternatives: ['-3 ≤ x ≤ -1', 'x ≥ -3 及 x ≤ -1'],
        explanation: '兩個不等式同時成立的範圍',
        numberLine: { 
          solutions: [{ 
            type: 'interval', 
            start: -3, 
            end: -1, 
            startClosed: true, 
            endClosed: true,
            lines: [
              { start: -1, direction: 'left', closed: true, color: '#3b82f6' },
              { start: -3, direction: 'right', closed: true, color: '#ef4444' }
            ]
          }] 
        },
        stage2: {
          id: 202,
          text: '求滿足 $-3 \\leq x \\leq -1$ 的整數',
          type: 'interval-integer',
          answer: '-3, -2, -1',
          alternatives: ['-3, -2, -1', 'x ∈ {-3, -2, -1}'],
          explanation: '從-3到-1的所有整數共3個',
          numberLine: { solutions: [{ type: 'interval', start: -3, end: -1, startClosed: true, endClosed: true }] }
        }
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
            ],
            lines: [
              { start: -2, direction: 'left', closed: false, color: '#3b82f6' },
              { start: 0, direction: 'right', closed: false, color: '#ef4444' }
            ]
          }]
        }
      },
      {
        id: 4,
        text: '化簡：$x \\geq 3$ 及 $x < 1$',
        type: 'contradiction',
        answer: '無解',
        alternatives: ['無解', '空集', '∅'],
        explanation: '沒有數既大於等於3又小於1',
        numberLine: { 
          solutions: [{ 
            type: 'empty',
            lines: [
              { start: 3, direction: 'right', closed: true, color: '#3b82f6' },
              { start: 1, direction: 'left', closed: false, color: '#ef4444' }
            ]
          }] 
        }
      },
      {
        id: 5,
        text: '化簡：$x \\geq -2$ 及 $x \\leq 4$',
        type: 'and',
        answer: '-2 ≤ x ≤ 4',
        alternatives: ['-2 ≤ x ≤ 4', 'x ≥ -2 及 x ≤ 4'],
        explanation: '同時滿足兩個邊界條件',
        numberLine: { 
          solutions: [{ 
            type: 'interval', 
            start: -2, 
            end: 4, 
            startClosed: true, 
            endClosed: true,
            lines: [
              { start: -2, direction: 'right', closed: true, color: '#3b82f6' },
              { start: 4, direction: 'left', closed: true, color: '#ef4444' }
            ]
          }] 
        }
      },
      {
        id: 6,
        text: '化簡：$x < 1$ 或 $x > 1$',
        type: 'or',
        answer: 'x ≠ 1',
        alternatives: ['x ≠ 1', 'x ∈ ℝ \\ {1}', '所有實數除了1'],
        explanation: '除了1以外的所有實數',
        numberLine: { 
          solutions: [{ 
            type: 'all',
            lines: [
              { start: 1, direction: 'left', closed: false, color: '#3b82f6' },
              { start: 1, direction: 'right', closed: false, color: '#ef4444' }
            ]
          }] 
        }
      },
      {
        id: 7,
        text: '化簡：$-3 < x$ 及 $x < 2$',
        type: 'and',
        answer: '-3 < x < 2',
        alternatives: ['x > -3 及 x < 2', '-3 < x < 2'],
        explanation: '介於-3和2之間的數',
        numberLine: { 
          solutions: [{ 
            type: 'interval', 
            start: -3, 
            end: 2, 
            startClosed: false, 
            endClosed: false,
            lines: [
              { start: -3, direction: 'right', closed: false, color: '#3b82f6' },
              { start: 2, direction: 'left', closed: false, color: '#ef4444' }
            ]
          }] 
        }
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
            ],
            lines: [
              { start: -4, direction: 'left', closed: true, color: '#3b82f6' },
              { start: -1, direction: 'right', closed: true, color: '#ef4444' }
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
    setShowHint(false);
  };

  // 驗證答案
  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      alert('請輸入答案');
      return;
    }

    // 根據當前階段選擇正確答案
    const currentQuestionToCheck = questionStage === 1 ? currentQuestion : stage2Question;

    const userNormalized = userAnswer
      .trim()
      .replace(/\s+/g, '')
      .replace(/且|及|和/g, '及')
      .replace(/或/g, '或')
      .toLowerCase();

    const correctNormalized = currentQuestionToCheck.answer
      .trim()
      .replace(/\s+/g, '')
      .replace(/且|及|和/g, '及')
      .replace(/或/g, '或')
      .toLowerCase();

    const validAnswers = [correctNormalized, ...currentQuestionToCheck.alternatives.map(a => 
      a.trim()
        .replace(/\s+/g, '')
        .replace(/且|及|和/g, '及')
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
    // 如果當前是第一階段且題目有第二階段
    if (questionStage === 1 && currentQuestion.stage2) {
      // 切換到第二階段
      setQuestionStage(2);
      setStage2Question(currentQuestion.stage2);
      setUserAnswer('');
      setFeedback('idle');
      setShowDiagram(false);
      setShowHint(false);
    } else {
      // 回到第一階段，選擇新題目
      setQuestionStage(1);
      setStage2Question(null);
      selectRandomQuestion();
    }
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

  // 教學視圖
  const LearnView = () => (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <Link to="/" className="text-slate-500 hover:text-slate-700 flex items-center gap-2">
          <HomeIcon size={20} />
          <span className="text-sm">返回首頁</span>
        </Link>
        <span className="font-bold text-slate-700">複合不等式 - 教學模式</span>
        <div className="w-24"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 口訣記憶 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-slate-100">
          <h2 className="text-lg font-bold text-slate-700 mb-4">口訣記憶</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">AND (及)</div>
              <p className="text-sm text-slate-600">只看兩線 <span className="text-red-500 font-bold underline">重疊</span> 位</p>
              <p className="text-xs text-slate-400 mt-1">(找 Intersection)</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500 mb-2">OR (或)</div>
              <p className="text-sm text-slate-600">看上面 <span className="text-blue-500 font-bold underline">有蓋</span> 範圍</p>
              <p className="text-xs text-slate-400 mt-1">(找 Union)</p>
            </div>
          </div>
        </div>

        {/* 圖解範例 (8種情況) */}
        <h2 className="text-lg font-bold text-slate-700 mb-4">圖解範例 (8種情況)：</h2>
        
        <div className="space-y-4">
          {EIGHT_CASES.map((caseItem) => (
            <div key={caseItem.id} className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-1">{caseItem.title}</h3>
              <p className="text-sm text-slate-500 mb-3">{caseItem.subtitle}</p>
              
              {/* 數線圖 */}
              <div className="bg-slate-50 rounded-lg p-3 mb-4">
                <TwoLineNumberLine 
                  {...caseItem.numberLines[0]} 
                  highlightRegion={learnHighlight?.caseId === caseItem.id ? learnHighlight.region : null}
                />
              </div>

              {/* AND 和 OR 結果 */}
              <div className="grid grid-cols-2 gap-4">
                {caseItem.examples.map((ex, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      setLearnHighlight({
                        caseId: caseItem.id,
                        region: { ...ex.highlight, lineY: 50 }
                      });
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${ex.color === 'blue' ? 'bg-blue-50 border border-blue-200 hover:shadow-md' : 'bg-red-50 border border-red-200 hover:shadow-md'} ${learnHighlight?.caseId === caseItem.id && ((ex.color === 'blue' && learnHighlight.region.color === '#3b82f6') || (ex.color === 'red' && learnHighlight.region.color === '#ef4444')) ? 'ring-2 ring-offset-1 ring-yellow-400' : ''}`}
                  >
                    <div className={`text-xs font-bold mb-2 ${ex.color === 'blue' ? 'text-blue-600' : 'text-red-600'}`}>
                      {ex.label}
                    </div>
                    <div className="text-sm text-slate-700 mb-2">
                      <Latex math={ex.latex} /> 
                    </div>
                    <div className={`text-lg md:text-xl font-bold ${ex.color === 'blue' ? 'text-blue-800' : 'text-red-800'}`}>
                      → {ex.result}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 進入測驗按鈕 */}
        <div className="mt-8 text-center">
          <button
            onClick={() => { setMode('quiz'); setScore(0); selectRandomQuestion(); }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition shadow-lg"
          >
            開始測驗 <ArrowRight size={18} className="inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );

  // 測驗視圖
  const QuizView = () => {
    if (!currentQuestion) {
      return <div className="text-center mt-10">載入中...</div>;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* 頂部導航 */}
        <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
            <button 
              onClick={() => setMode('learn')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition font-medium text-sm md:text-base"
            >
              <RotateCcw size={20} />
              <span className="hidden sm:inline">返回教學模式</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              複合不等式測驗
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
            {/* 題目階段指示 */}
            {stage2Question && (
              <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200">
                <span className="text-xs font-bold text-purple-700">第 {questionStage} 階段</span>
              </div>
            )}
            
            {/* 題號 */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold rounded-full">
                題 {questionStage === 1 ? currentQuestion.id : stage2Question.id}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {questionStage === 1 ? (phase === 'simplification' ? '化簡不等式' : '求整數解') : '求整數解'}
              </span>
            </div>

            {/* 題目文本 */}
            <div className="bg-slate-50 rounded-lg p-5 mb-4 border-l-4 border-blue-500">
              <h2 className="text-lg md:text-2xl font-bold text-slate-800 mb-2">
                <Latex math={questionStage === 1 ? currentQuestion.text : stage2Question.text} block={false} />
              </h2>
            </div>

            {/* 提示區域 - 放在公式下方 */}
            <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm text-amber-800 flex items-start gap-2 flex-1">
                  <BookOpen size={16} className="mt-0.5 text-amber-600" />
                  <div>
                    <strong>提示：</strong>
                    {questionStage === 1 && phase === 'simplification' ? (
                      <span>「及」表示兩個條件同時成立，「或」表示至少一個條件成立</span>
                    ) : (
                      <span>找出區間內的所有整數，用逗號分隔</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-3 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold rounded text-xs whitespace-nowrap transition"
                >
                  {showHint ? '隱藏' : '更多'} 提示
                </button>
              </div>
              {showHint && (
                <div className="mt-3 pt-3 border-t border-amber-300 text-sm text-amber-900">
                  <p className="font-bold mb-1">繪圖提示：</p>
                  <p>你需要畫圖去尋找答案，需留意「及」/「或」是看畫圖的多少條線。</p>
                </div>
              )}
            </div>

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
            <div className="flex flex-col gap-4 mb-6 min-h-[80px]">
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
                  <p className="text-green-700 font-medium">{questionStage === 1 ? currentQuestion.explanation : stage2Question.explanation}</p>
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
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500 mb-3">
                    <div className="text-xs text-green-700 font-bold mb-1">正確答案：</div>
                    <div className="text-lg font-bold text-green-900">
                      <Latex math={questionStage === 1 ? currentQuestion.answer : stage2Question.answer} />
                    </div>
                  </div>
                  {/* 添加數線圖表 */}
                  {(questionStage === 1 ? currentQuestion.numberLine : stage2Question.numberLine) && (
                    <div className="bg-white rounded-lg p-4 border border-slate-200 mb-3">
                      <div className="text-xs text-slate-700 font-bold mb-2">解的數線圖表：</div>
                      <NumberLine 
                        {...(questionStage === 1 ? currentQuestion.numberLine : stage2Question.numberLine)} 
                        showMultiLine={true}
                      />
                    </div>
                  )}
                  <p className="text-slate-700 mt-3 text-sm">{questionStage === 1 ? currentQuestion.explanation : stage2Question.explanation}</p>
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
        </div>
      </div>
    );
  };

  // 主渲染
  return (
    <>
      {mode === 'learn' && <LearnView />}
      {mode === 'quiz' && <QuizView />}
    </>
  );
};

export default CompoundInequalityQuiz;
