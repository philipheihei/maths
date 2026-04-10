import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { loadKatexOnce } from '../utils/katexLoader';
import {
  Home as HomeIcon,
  BookOpen,
  PenTool,
  GraduationCap,
  Trophy,
  ArrowRight,
  Check,
  X,
  XCircle
} from 'lucide-react';

// ============= LATEX COMPONENT =============
const Latex = ({ math, block = false }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    loadKatexOnce().then(() => setIsLoaded(true)).catch(e => console.error('KaTeX load error:', e));
  }, []);
  useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        containerRef.current.innerHTML = '';
        window.katex.render(math, containerRef.current, { displayMode: block, throwOnError: false, output: 'html' });
      } catch (e) { containerRef.current.innerText = math; }
    }
  }, [math, block, isLoaded]);
  return <span ref={containerRef} className={block ? 'block text-center my-1' : 'inline-block'} />;
};

// ============= CONSTANTS =============
const GRID_SIZE = 7;
const SVG_SIZE = 400;
const PADDING = 30;
const UNIT = (SVG_SIZE - 2 * PADDING) / (GRID_SIZE * 2);
const CENTER = SVG_SIZE / 2;

const toSVG = (x, y) => ({
  x: CENTER + x * UNIT,
  y: CENTER - y * UNIT
});

const toGrid = (svgX, svgY) => ({
  x: Math.round((svgX - CENTER) / UNIT),
  y: Math.round((CENTER - svgY) / UNIT)
});

// ============= COORDINATE GRID =============
const CoordinateGrid = ({ children, onMouseMove, onMouseUp, onMouseLeave }) => {
  const gridLines = [];
  for (let i = -GRID_SIZE; i <= GRID_SIZE; i++) {
    const pos = CENTER + i * UNIT;
    gridLines.push(
      <line key={`v${i}`} x1={pos} y1={PADDING} x2={pos} y2={SVG_SIZE - PADDING}
        stroke={i === 0 ? '#333' : '#e0e7ff'} strokeWidth={i === 0 ? 2 : 1} />
    );
    gridLines.push(
      <line key={`h${i}`} x1={PADDING} y1={pos} x2={SVG_SIZE - PADDING} y2={pos}
        stroke={i === 0 ? '#333' : '#e0e7ff'} strokeWidth={i === 0 ? 2 : 1} />
    );
  }

  const labels = [];
  for (let i = -GRID_SIZE; i <= GRID_SIZE; i++) {
    if (i !== 0) {
      labels.push(
        <text key={`xl${i}`} x={CENTER + i * UNIT} y={CENTER + 18}
          textAnchor="middle" fontSize="11" fill="#666">{i}</text>
      );
      labels.push(
        <text key={`yl${i}`} x={CENTER - 15} y={CENTER - i * UNIT + 4}
          textAnchor="middle" fontSize="11" fill="#666">{i}</text>
      );
    }
  }

  return (
    <svg
      width="100%" height="100%"
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      className="bg-white rounded-xl border border-gray-200 shadow-sm"
      style={{ touchAction: 'none' }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchMove={onMouseMove}
      onTouchEnd={onMouseUp}
    >
      {gridLines}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
      <line x1={PADDING} y1={CENTER} x2={SVG_SIZE - PADDING + 5} y2={CENTER}
        stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <line x1={CENTER} y1={SVG_SIZE - PADDING} x2={CENTER} y2={PADDING - 5}
        stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      {labels}
      <text x={SVG_SIZE - PADDING + 15} y={CENTER + 5} fontSize="14" fontWeight="bold" fill="#333">x</text>
      <text x={CENTER + 8} y={PADDING - 10} fontSize="14" fontWeight="bold" fill="#333">y</text>
      {children}
    </svg>
  );
};

// ============= DRAGGABLE POINT =============
const DraggablePoint = ({ point, onDragStart, isDragging, label, color = '#3b82f6' }) => {
  const svgCoords = toSVG(point.x, point.y);
  const handleMouseDown = (e) => { e.preventDefault(); e.stopPropagation(); onDragStart(); };
  const handleTouchStart = (e) => { e.preventDefault(); e.stopPropagation(); onDragStart(); };

  return (
    <g>
      <circle cx={svgCoords.x} cy={svgCoords.y} r="15" fill="transparent"
        style={{ cursor: 'grab' }} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} />
      <circle cx={svgCoords.x} cy={svgCoords.y} r={isDragging ? 10 : 8}
        fill={isDragging ? '#2563eb' : color} stroke="white" strokeWidth="2"
        style={{ cursor: 'grab', pointerEvents: 'none' }} />
      <text x={svgCoords.x + 12} y={svgCoords.y - 10} fontSize="14" fontWeight="bold" fill={color}
        style={{ pointerEvents: 'none' }}>{label}</text>
      <text x={svgCoords.x + 12} y={svgCoords.y + 5} fontSize="12" fill="#666"
        style={{ pointerEvents: 'none' }}>({point.x}, {point.y})</text>
      {!isDragging && (
        <text x={svgCoords.x} y={svgCoords.y + 26} fontSize="9" fill="#999"
          textAnchor="middle" style={{ pointerEvents: 'none' }}>拖拽移動</text>
      )}
    </g>
  );
};

// ============= QUIZ KEYBOARD =============
const QuizKeyboard = ({ onInput, onDelete, onClear, onSubmit, onNext, showNext, disabled }) => {
  const KEY = `h-12 rounded-lg font-medium text-lg flex items-center justify-center select-none transition-all shadow-[0_2px_0_0_rgba(0,0,0,0.12)] active:shadow-none active:translate-y-[1px] border`;
  const NUM = `${KEY} bg-white text-slate-700 border-slate-200`;
  const OP  = `${KEY} bg-slate-100 text-slate-600 border-slate-200`;
  const DEL_CLS = `${KEY} bg-red-50 text-red-500 border-red-100`;

  const press = (v) => { if (!disabled) onInput(v); };

  return (
    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
      <div className="grid grid-cols-4 gap-2">
        {[7,8,9].map(n => <button key={n} className={NUM} onClick={() => press(String(n))}>{n}</button>)}
        <button className={DEL_CLS} onClick={() => { if (!disabled) onDelete(); }}>DEL</button>

        {[4,5,6].map(n => <button key={n} className={NUM} onClick={() => press(String(n))}>{n}</button>)}
        <button className={OP} onClick={() => press('/')}>
          <div className="flex flex-col items-center leading-none gap-0.5">
            <span className="text-xs leading-none">□</span>
            <span className="border-t border-slate-400 w-4"></span>
            <span className="text-xs leading-none">□</span>
          </div>
        </button>

        {[1,2,3].map(n => <button key={n} className={NUM} onClick={() => press(String(n))}>{n}</button>)}
        <button className={`${KEY} bg-slate-200 text-slate-500 border-slate-300`}
          onClick={() => { if (!disabled) onClear(); }}>AC</button>

        <button className={NUM} onClick={() => press('-')}>−</button>
        <button className={NUM} onClick={() => press('0')}>0</button>
        <button className={OP} onClick={() => press('.')}>.</button>
        {showNext
          ? <button className={`${KEY} bg-teal-500 text-white border-teal-600`}
              onClick={() => { if (!disabled) onNext(); }}>下一個 →</button>
          : <button className={`${KEY} bg-blue-500 text-white border-blue-600`}
              onClick={() => { if (!disabled) onSubmit(); }}>提交</button>
        }
      </div>
    </div>
  );
};

// ============= HELPER FUNCTIONS =============
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

// 格式化距離
const formatDistance = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const sq = dx * dx + dy * dy;
  const root = Math.sqrt(sq);
  if (Number.isInteger(root)) return String(root);
  return `√${sq}`;
};

// 格式化斜率為分數或整數
const formatSlope = (a, b) => {
  if (b.x === a.x) return '未定義（斜率不存在）';
  const dy = b.y - a.y;
  const dx = b.x - a.x;
  if (dy === 0) return '0';
  const g = gcd(Math.abs(dy), Math.abs(dx));
  let num = dy / g;
  let den = dx / g;
  if (den < 0) { num = -num; den = -den; }
  if (den === 1) return String(num);
  return `${num}/${den}`;
};

// 格式化中點坐標分量
const formatMidCoord = (v1, v2) => {
  const sum = v1 + v2;
  if (sum % 2 === 0) return String(sum / 2);
  const neg = sum < 0;
  return `${neg ? '-' : ''}${Math.abs(sum)}/2`;
};
const midpointToLatex = (v1, v2) => {
  const sum = v1 + v2;
  if (sum % 2 === 0) return String(sum / 2);
  return `\\dfrac{${sum}}{2}`;
};

// 將 distStr / slopeStr 轉換為 LaTeX 字串
const distStrToLatex = (s) => s.startsWith('√') ? `\\sqrt{${s.slice(1)}}` : s;
const slopeStrToLatex = (s) => {
  if (s.includes('/')) { const [n, d] = s.split('/'); return `\\dfrac{${n}}{${d}}`; }
  return s;
};

// 將多行 LaTeX lines 組合成 aligned 環境（對齊 = 號）
const toAligned = (lines) => {
  const cvt = lines.map((l, i) =>
    i === 0 ? l.replace(' = ', ' &= ') : l.replace(/^= /, '&= ')
  );
  return `\\begin{aligned}${cvt.join(' \\\\ ')}\\end{aligned}`;
};

// ============= 出題生成器 =============
const generateQuizQuestion = (enabledTypes = { distance: true, slope: true, midpoint: true }) => {
  const allTypes = [];
  if (enabledTypes.distance) allTypes.push('distance');
  if (enabledTypes.slope) allTypes.push('slope');
  if (enabledTypes.midpoint) allTypes.push('midpoint');
  if (allTypes.length === 0) allTypes.push('distance');
  const type = allTypes[Math.floor(Math.random() * allTypes.length)];

  let ax, ay, bx, by;
  do {
    ax = Math.floor(Math.random() * 13) - 6;
    ay = Math.floor(Math.random() * 13) - 6;
    bx = Math.floor(Math.random() * 13) - 6;
    by = Math.floor(Math.random() * 13) - 6;
  } while (ax === bx && ay === by);

  const pointA = { x: ax, y: ay };
  let pointB = { x: bx, y: by };

  if (type === 'slope' && ax === bx) {
    bx = ax + (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
    bx = Math.max(-6, Math.min(6, bx));
    pointB = { x: bx, y: by };
  }

  if (type === 'distance') {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    const sq = dx * dx + dy * dy;
    const root = Math.sqrt(sq);
    const isInteger = Number.isInteger(root);
    return {
      type: 'distance',
      pointA,
      pointB,
      answer: isInteger ? String(Math.round(root)) : String(sq),
      displayAnswer: isInteger ? String(Math.round(root)) : `√${sq}`,
      displayAnswerLatex: isInteger ? String(Math.round(root)) : `\\sqrt{${sq}}`,
      prompt: isInteger ? '求兩點之間的距離。' : '求兩點之間的距離。（輸入根號內的數值，例如：√13 則輸入 13）',
      latexLines: (() => {
        const fax = pointA.x < 0 ? `(${pointA.x})` : String(pointA.x);
        const fay = pointA.y < 0 ? `(${pointA.y})` : String(pointA.y);
        const lines = [
          `\\text{距離} = \\sqrt{(${pointB.x}-${fax})^2 + (${pointB.y}-${fay})^2}`,
          `= \\sqrt{(${dx})^2 + (${dy})^2}`,
          `= \\sqrt{${dx * dx} + ${dy * dy}}`,
          `= \\sqrt{${sq}}`,
        ];
        if (isInteger) lines.push(`= ${Math.round(root)}`);
        return lines;
      })(),
      explanation: generateDistanceExplanation(pointA, pointB)
    };
  } else if (type === 'slope') {
    const dy = pointB.y - pointA.y;
    const dx = pointB.x - pointA.x;
    const g = gcd(Math.abs(dy), Math.abs(dx));
    let num = dy / g;
    let den = dx / g;
    if (den < 0) { num = -num; den = -den; }
    const answerStr = den === 1 ? String(num) : `${num}/${den}`;
    return {
      type: 'slope',
      pointA,
      pointB,
      answer: answerStr,
      displayAnswer: answerStr,
      displayAnswerLatex: den === 1 ? String(num) : `\\dfrac{${num}}{${den}}`,
      prompt: '求兩點所形成的直線斜率。（若為分數則以 a/b 輸入）',
      latexLines: (() => {
        const fax = pointA.x < 0 ? `(${pointA.x})` : String(pointA.x);
        const fay = pointA.y < 0 ? `(${pointA.y})` : String(pointA.y);
        const lines = [
          `\\text{斜率} = \\dfrac{${pointB.y}-${fay}}{${pointB.x}-${fax}}`,
          `= \\dfrac{${dy}}{${dx}}`,
        ];
        if (Math.abs(g) > 1 || dx < 0) {
          lines.push(den === 1 ? `= ${num}` : `= \\dfrac{${num}}{${den}}`);
        }
        return lines;
      })(),
      explanation: generateSlopeExplanation(pointA, pointB)
    };
  } else {
    // midpoint — 同時問整個坐標 (x, y)
    const answerX = formatMidCoord(pointA.x, pointB.x);
    const answerY = formatMidCoord(pointA.y, pointB.y);
    const sx = pointA.x + pointB.x;
    const sy = pointA.y + pointB.y;
    const mxL = sx % 2 === 0 ? String(sx / 2) : `\\dfrac{${sx}}{2}`;
    const myL = sy % 2 === 0 ? String(sy / 2) : `\\dfrac{${sy}}{2}`;
    const fax = pointA.x < 0 ? `(${pointA.x})` : String(pointA.x);
    const fay = pointA.y < 0 ? `(${pointA.y})` : String(pointA.y);
    const fbx = pointB.x < 0 ? `(${pointB.x})` : String(pointB.x);
    const fby = pointB.y < 0 ? `(${pointB.y})` : String(pointB.y);
    return {
      type: 'midpoint',
      pointA,
      pointB,
      answerX,
      answerY,
      answer: `${answerX},${answerY}`,
      displayAnswer: `(${answerX}, ${answerY})`,
      displayAnswerLatex: `\\text{中點} = \\left(${mxL},\\; ${myL}\\right)`,
      prompt: '求兩點的中點坐標。（若為分數則以 a/b 輸入）',
      latexLines: [
        `\\text{中點} = \\left(\\dfrac{${fax}+${fbx}}{2},\\; \\dfrac{${fay}+${fby}}{2}\\right)`,
        `= \\left(\\dfrac{${sx}}{2},\\; \\dfrac{${sy}}{2}\\right)`,
        `= \\left(${mxL},\\; ${myL}\\right)`,
      ],
      explanation: generateMidpointExplanation(pointA, pointB)
    };
  }
};

const generateDistanceExplanation = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const sq = dx * dx + dy * dy;
  const root = Math.sqrt(sq);
  const isInteger = Number.isInteger(root);
  const lines = [
    `距離公式：d = √[(x₂−x₁)² + (y₂−y₁)²]`,
    `= √[(${b.x}−${a.x < 0 ? `(${a.x})` : a.x})² + (${b.y}−${a.y < 0 ? `(${a.y})` : a.y})²]`,
    `= √[(${dx})² + (${dy})²]`,
  ];
  if (isInteger) {
    lines.push(`= ${Math.round(root)}`);
  } else {
    lines.push(`= √[${dx * dx} + ${dy * dy}]`);
    lines.push(`= √${sq}`);
  }
  return lines.join('\n');
};

const generateSlopeExplanation = (a, b) => {
  const dy = b.y - a.y;
  const dx = b.x - a.x;
  const g = gcd(Math.abs(dy), Math.abs(dx));
  let num = dy / g;
  let den = dx / g;
  if (den < 0) { num = -num; den = -den; }
  const lines = [
    `斜率公式：m = (y₂−y₁) / (x₂−x₁)`,
    `= (${b.y}−${a.y < 0 ? `(${a.y})` : a.y}) / (${b.x}−${a.x < 0 ? `(${a.x})` : a.x})`,
    `= ${dy} / ${dx}`,
  ];
  if (Math.abs(g) > 1 || dx < 0) {
    lines.push(`= ${den === 1 ? num : `${num}/${den}`}`);
  }
  return lines.join('\n');
};

const generateMidpointExplanation = (a, b) => {
  const mx = formatMidCoord(a.x, b.x);
  const my = formatMidCoord(a.y, b.y);
  const sumX = a.x + b.x;
  const sumY = a.y + b.y;
  const needsSimplify = (sumX % 2 === 0) || (sumY % 2 === 0);
  const lines = [
    `中點公式：M = ((x₁+x₂)/2, (y₁+y₂)/2)`,
    `= ((${a.x}+${b.x})/2, (${a.y}+${b.y})/2)`,
  ];
  if (needsSimplify) {
    lines.push(`= (${sumX}/2, ${sumY}/2)`);
  }
  lines.push(`= (${mx}, ${my})`);
  return lines.join('\n');
};

// ============= 教學頁面 =============
const TeachingPage = ({ onGoToQuiz }) => {
  const [pointA, setPointA] = useState({ x: -3, y: -2 });
  const [pointB, setPointB] = useState({ x: 4, y: 3 });
  const [dragging, setDragging] = useState(null);
  const [showFormula, setShowFormula] = useState('formulas');

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    let clientX, clientY;
    if (e.touches) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
    else { clientX = e.clientX; clientY = e.clientY; }
    const svgX = ((clientX - rect.left) / rect.width) * SVG_SIZE;
    const svgY = ((clientY - rect.top) / rect.height) * SVG_SIZE;
    const grid = toGrid(svgX, svgY);
    const cx = Math.max(-GRID_SIZE + 1, Math.min(GRID_SIZE - 1, grid.x));
    const cy = Math.max(-GRID_SIZE + 1, Math.min(GRID_SIZE - 1, grid.y));
    if (dragging === 'A') setPointA({ x: cx, y: cy });
    else setPointB({ x: cx, y: cy });
  };
  const handleMouseUp = () => setDragging(null);

  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  const distStr = formatDistance(pointA, pointB);
  const slopeStr = formatSlope(pointA, pointB);
  const svgA = toSVG(pointA.x, pointA.y);
  const svgB = toSVG(pointB.x, pointB.y);
  const midX = (pointA.x + pointB.x) / 2;
  const midY = (pointA.y + pointB.y) / 2;
  const svgM = toSVG(midX, midY);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 rounded-2xl text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <BookOpen size={28} />
          兩點之間的距離及斜率
        </h1>
        <p className="opacity-90">拖動兩點，觀察距離和斜率的變化</p>
      </div>

      {/* 顯示選項 */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="font-bold text-gray-700">顯示公式</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'formulas', label: '📋 公式表' },
              { id: 'distance', label: '距離' },
              { id: 'slope', label: '斜率' },
              { id: 'midpoint', label: '中點' }
            ].map(opt => (
              <button key={opt.id}
                onClick={() => setShowFormula(opt.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showFormula === opt.id
                    ? opt.id === 'formulas' ? 'bg-purple-600 text-white' : 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 公式表模式 */}
      {showFormula === 'formulas' && (
        <div className="space-y-5">
          {/* 符號說明 */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-700 mb-4 text-base">📌 符號說明</h3>
            <div className="grid md:grid-cols-2 gap-5 items-center">
              <div className="flex justify-center">
                <svg viewBox="0 0 280 130" width="280" height="130" className="overflow-visible">
                  {/* 連線（線段，無箭頭） */}
                  <line x1="60" y1="75" x2="220" y2="30" stroke="#3b82f6" strokeWidth="2" />
                  {/* 點 1 — 較小黑色交叉 */}
                  <line x1="53" y1="68" x2="67" y2="82" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                  <line x1="67" y1="68" x2="53" y2="82" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                  {/* ① 在交叉下面 */}
                  <text x="60" y="100" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">①</text>
                  {/* 坐標標籤 — KaTeX style */}
                  <text x="18" y="118" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#1d4ed8">(</text>
                  <text x="26" y="118" fontSize="13" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#3b82f6">x<tspan dy="3" fontSize="9" fontStyle="normal">1</tspan></text>
                  <text x="40" y="118" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#555">,</text>
                  <text x="47" y="118" fontSize="13" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">y<tspan dy="3" fontSize="9" fontStyle="normal">1</tspan></text>
                  <text x="60" y="118" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#1d4ed8">)</text>
                  {/* 點 2 — 較小黑色交叉 */}
                  <line x1="213" y1="23" x2="227" y2="37" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                  <line x1="227" y1="23" x2="213" y2="37" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                  {/* ② 在交叉下面 */}
                  <text x="220" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">②</text>
                  {/* 坐標標籤 — KaTeX style */}
                  <text x="198" y="16" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#1d4ed8">(</text>
                  <text x="206" y="16" fontSize="13" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#3b82f6">x<tspan dy="3" fontSize="9" fontStyle="normal">2</tspan></text>
                  <text x="220" y="16" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#555">,</text>
                  <text x="227" y="16" fontSize="13" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">y<tspan dy="3" fontSize="9" fontStyle="normal">2</tspan></text>
                  <text x="240" y="16" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#1d4ed8">)</text>
                </svg>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-600 w-6">L</span>
                  <span>＝ Line，即一條直線</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-600 w-6">m</span>
                  <span>＝ slope，即斜率（直線的傾斜程度）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-600 w-6">AB</span>
                  <span>＝ 由 A 點到 B 點的線段</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1. 距離公式 */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h3 className="font-bold text-emerald-800 mb-3 text-lg">1. 距離公式</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-2">公式</p>
                <Latex math={"\\text{距離} = \\sqrt{(\\textcolor{blue}{x_1}-\\textcolor{blue}{x_2})^2 + (\\textcolor{green}{y_1}-\\textcolor{green}{y_2})^2}"} block />
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-600 mb-2">例：A(<span className="text-blue-600">5</span>, <span className="text-green-600">8</span>) 和 B(<span className="text-blue-600">2</span>, <span className="text-green-600">−10</span>) 的距離</p>
                <Latex math={"\\begin{aligned}AB &= \\sqrt{(\\textcolor{blue}{5}-\\textcolor{blue}{2})^2 + (\\textcolor{green}{8}-({\\textcolor{green}{-10}}))^2} \\\\ &= \\sqrt{\\textcolor{blue}{3}^2 + \\textcolor{green}{18}^2} \\\\ &= \\sqrt{333}\\end{aligned}"} block />
              </div>
            </div>
          </div>

          {/* 2. 斜率公式 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="font-bold text-blue-800 mb-3 text-lg">2. 斜率公式</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-2">公式</p>
                <Latex math={"\\text{斜率} = \\dfrac{\\textcolor{green}{y_1}-\\textcolor{green}{y_2}}{\\textcolor{blue}{x_1}-\\textcolor{blue}{x_2}}"} block />
                <p className="mt-3 text-xs text-slate-500"><span className="text-green-600 font-bold">y</span> 上 <span className="text-blue-500 font-bold">x</span> 下</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-600 mb-2">例：A(<span className="text-blue-600">5</span>, <span className="text-green-600">8</span>) 和 B(<span className="text-blue-600">2</span>, <span className="text-green-600">−10</span>) 的斜率</p>
                <Latex math={"\\begin{aligned}m_{AB} &= \\dfrac{\\textcolor{green}{8}-(\\textcolor{green}{-10})}{\\textcolor{blue}{5}-\\textcolor{blue}{2}} \\\\ &= \\dfrac{\\textcolor{green}{18}}{\\textcolor{blue}{3}} \\\\ &= 6\\end{aligned}"} block />
              </div>
            </div>
          </div>

          {/* 共線 */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h3 className="font-bold text-orange-800 mb-3 text-lg">共線</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 space-y-2">
                <p className="text-xs text-slate-400 mb-1">定義</p>
                <p className="text-sm font-bold text-slate-700">若 A、B、C 三點<span className="bg-orange-200 px-1 rounded">共線</span>，則 ABC 任意兩點的斜率都相等</p>
                <p className="text-sm text-slate-600">方法：分別找 AB、AC、BC 其中兩線段的斜率，再比較是否相等。</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-2">例：判斷 A(<span className="text-blue-600">1</span>, <span className="text-green-600">2</span>)、B(<span className="text-blue-600">3</span>, <span className="text-green-600">6</span>)、C(<span className="text-blue-600">5</span>, <span className="text-green-600">10</span>) 是否共線</p>
                <div className="space-y-2 text-sm text-slate-700">
                  <Latex math={"\\begin{aligned}m_{AB} &= \\dfrac{\\textcolor{green}{6}-\\textcolor{green}{2}}{\\textcolor{blue}{3}-\\textcolor{blue}{1}} = \\dfrac{4}{2} = 2\\end{aligned}"} block />
                  <Latex math={"\\begin{aligned}m_{BC} &= \\dfrac{\\textcolor{green}{10}-\\textcolor{green}{6}}{\\textcolor{blue}{5}-\\textcolor{blue}{3}} = \\dfrac{4}{2} = 2\\end{aligned}"} block />
                  <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-orange-800 font-semibold">
                    ∵ AB斜率 = BC斜率，∴ A、B、C 三點共線。
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 平行 / 垂直 */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
            <h3 className="font-bold text-rose-800 mb-3 text-lg">3. 平行 / 垂直</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 space-y-3">
                <p className="text-xs text-slate-400 mb-1">定義</p>
                <div>
                  <p className="text-sm font-bold text-slate-700"><span className="bg-yellow-200 px-1 rounded">平行</span>：兩條線斜率<span className="bg-yellow-200 px-1 rounded">相同</span></p>
                  <Latex math={"L_1 \\mathbin{/\\!/} L_2 \\;\\Rightarrow\\; m_1 = m_2"} block />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700"><span className="bg-green-200 px-1 rounded">垂直</span>：兩條線斜率相乘 = <span className="bg-green-200 px-1 rounded">−1</span></p>
                  <Latex math={"L_1 \\perp L_2 \\;\\Rightarrow\\; m_1 \\times m_2 = -1"} block />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-2">例：若 AB ⊥ CD，求 CD 的斜率</p>
                <p className="text-sm text-slate-600 mb-2">已知 AB 的斜率 = 6</p>
                <Latex math={"\\begin{aligned}m_{AB} \\times m_{CD} &= -1 \\\\ 6 \\times m_{CD} &= -1 \\\\ m_{CD} &= -\\dfrac{1}{6}\\end{aligned}"} block />
              </div>
            </div>
          </div>

          {/* 4. 中點公式 */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-bold text-amber-800 mb-3 text-lg">4. 中點公式</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-2">公式（頭尾 ÷ 2 = 中間）</p>
                <Latex math={"\\text{中點} = \\left(\\dfrac{\\textcolor{blue}{x_1}+\\textcolor{blue}{x_2}}{2},\\; \\dfrac{\\textcolor{green}{y_1}+\\textcolor{green}{y_2}}{2}\\right)"} block />
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-600 mb-2">例：A(<span className="text-blue-600">5</span>, <span className="text-green-600">2</span>) 和 B(<span className="text-blue-600">2</span>, <span className="text-green-600">−10</span>) 的中點</p>
                <Latex math={"\\begin{aligned}\\text{中點} &= \\left(\\dfrac{\\textcolor{blue}{5}+\\textcolor{blue}{2}}{2},\\; \\dfrac{\\textcolor{green}{2}+(\\textcolor{green}{-10})}{2}\\right) \\\\ &= \\left(3.5,\\; -4\\right)\\end{aligned}"} block />
              </div>
            </div>
          </div>

          {/* 5. 截點公式 */}
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
            <h3 className="font-bold text-violet-800 mb-3 text-lg">5. 截點公式 <span className="text-sm font-normal text-violet-500">（非基礎課程）</span></h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-2">公式（比例與點交叉乘！）</p>
                <div className="space-y-1">
                  <p className="text-sm text-slate-600 mb-1">P 將 AB 分成 r : s</p>
                  <Latex math={"x = \\dfrac{s \\cdot x_1 + r \\cdot x_2}{r + s}"} block />
                  <Latex math={"y = \\dfrac{s \\cdot y_1 + r \\cdot y_2}{r + s}"} block />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-2">例：P 將 A(1, 3)、B(7, 9) 分成 2 : 1</p>
                <Latex math={"\\begin{aligned}x &= \\dfrac{1 \\times \\textcolor{blue}{1} + 2 \\times \\textcolor{blue}{7}}{2+1} = \\dfrac{\\textcolor{blue}{15}}{3} = \\textcolor{blue}{5} \\\\ y &= \\dfrac{1 \\times \\textcolor{green}{3} + 2 \\times \\textcolor{green}{9}}{2+1} = \\dfrac{\\textcolor{green}{21}}{3} = \\textcolor{green}{7}\\end{aligned}"} block />
                <div className="mt-2 text-center">
                  <Latex math={"P = (\\textcolor{blue}{5},\\; \\textcolor{green}{7})"} block />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button onClick={onGoToQuiz}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto transition-all shadow-lg">
              開始測驗 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 互動模式（距離/斜率/中點）*/}
      {showFormula !== 'formulas' && (
      <div className="grid md:grid-cols-2 gap-6">
        {/* SVG */}
        <div className="bg-white rounded-xl shadow-sm border p-4 self-start sticky top-4">
          <CoordinateGrid onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            {/* 線段 */}
            <line x1={svgA.x} y1={svgA.y} x2={svgB.x} y2={svgB.y}
              stroke="#10b981" strokeWidth="2.5" />

            {/* Δx / Δy 輔助虛線 */}
            {showFormula === 'distance' && dx !== 0 && dy !== 0 && (
              <>
                <line x1={svgA.x} y1={svgA.y} x2={svgB.x} y2={svgA.y}
                  stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,4" />
                <line x1={svgB.x} y1={svgA.y} x2={svgB.x} y2={svgB.y}
                  stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,4" />
                <text x={(svgA.x + svgB.x) / 2} y={svgA.y + (dy > 0 ? 18 : -8)}
                  textAnchor="middle" fontSize="13" fontWeight="bold" fill="#3b82f6">
                  Δx={dx}
                </text>
                <text x={svgB.x + (dx > 0 ? 10 : -10)} y={(svgA.y + svgB.y) / 2}
                  textAnchor={dx > 0 ? 'start' : 'end'} fontSize="13" fontWeight="bold" fill="#ef4444">
                  Δy={dy}
                </text>
                {(() => {
                  const corner = toSVG(pointB.x, pointA.y);
                  const s = 8;
                  const sx = dx > 0 ? -s : s;
                  const sy = dy > 0 ? s : -s;
                  return (
                    <path d={`M ${corner.x + sx} ${corner.y} L ${corner.x + sx} ${corner.y + sy} L ${corner.x} ${corner.y + sy}`}
                      fill="none" stroke="#666" strokeWidth="1" />
                  );
                })()}
              </>
            )}

            {/* 距離標籤（顯示在線段中點旁）*/}
            {showFormula === 'distance' && (
              <text x={(svgA.x + svgB.x) / 2 + (dy >= 0 ? -12 : 12)}
                y={(svgA.y + svgB.y) / 2 + (dx >= 0 ? -10 : 10)}
                textAnchor="middle" fontSize="13" fontWeight="bold" fill="#10b981">
                d = {distStr}
              </text>
            )}

            {/* 中點標記 */}
            {showFormula === 'midpoint' && (
              <>
                <circle cx={svgM.x} cy={svgM.y} r={6} fill="#f59e0b" stroke="white" strokeWidth="2" />
                <text x={svgM.x + 10} y={svgM.y - 8} fontSize="13" fontWeight="bold" fill="#d97706"
                  style={{ pointerEvents: 'none' }}>中點</text>
                <text x={svgM.x + 10} y={svgM.y + 6} fontSize="11" fill="#92400e"
                  style={{ pointerEvents: 'none' }}>({formatMidCoord(pointA.x, pointB.x)}, {formatMidCoord(pointA.y, pointB.y)})</text>
              </>
            )}

            <DraggablePoint point={pointA} label="A" color="#3b82f6"
              isDragging={dragging === 'A'} onDragStart={() => setDragging('A')} />
            <DraggablePoint point={pointB} label="B" color="#ef4444"
              isDragging={dragging === 'B'} onDragStart={() => setDragging('B')} />
          </CoordinateGrid>
        </div>

        {/* 公式說明 */}
        <div className="space-y-4">
          {/* 坐標顯示 */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-bold text-gray-700 mb-3">坐標</h3>
            <div className="flex gap-6 text-lg">
              <span><span className="text-blue-600 font-bold">A</span>({pointA.x}, {pointA.y})</span>
              <span><span className="text-red-500 font-bold">B</span>({pointB.x}, {pointB.y})</span>
            </div>
          </div>

          {/* 距離公式 */}
          {showFormula === 'distance' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h3 className="font-bold text-emerald-800 mb-3">📏 距離公式</h3>
              <div className="bg-white rounded-lg p-3 mb-3 text-center">
                <Latex math={"\\text{距離} = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}"} block />
              </div>
              <div className="text-slate-700 text-sm leading-relaxed px-1">
                {(() => {
                  const sq = dx * dx + dy * dy;
                  const root = Math.sqrt(sq);
                  const fax = pointA.x < 0 ? `(${pointA.x})` : String(pointA.x);
                  const fay = pointA.y < 0 ? `(${pointA.y})` : String(pointA.y);
                  const lines = [
                    `AB &= \\sqrt{(${pointB.x}-${fax})^2 + (${pointB.y}-${fay})^2}`,
                    `&= \\sqrt{(${dx})^2 + (${dy})^2}`,
                  ];
                  if (Number.isInteger(root)) {
                    lines.push(`&= ${Math.round(root)}`);
                  } else {
                    lines.push(`&= \\sqrt{${dx * dx} + ${dy * dy}}`);
                    lines.push(`&= \\sqrt{${sq}}`);
                  }
                  return <Latex math={`\\begin{aligned}${lines.join(' \\\\ ')}\\end{aligned}`} block />;
                })()}
              </div>
              <div className="mt-3 text-center">
                <Latex math={`AB = ${distStrToLatex(distStr)}`} block />
              </div>
            </div>
          )}

          {/* 斜率公式 */}
          {showFormula === 'slope' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-bold text-blue-800 mb-3">📐 斜率公式</h3>
              <div className="bg-white rounded-lg p-3 mb-3 text-center">
                <Latex math={"\\text{斜率} = \\dfrac{y_2-y_1}{x_2-x_1}"} block />
              </div>
              {dx === 0 ? (
                <div className="text-red-600 font-bold text-center">
                  x₁ = x₂，斜率未定義（垂直線）
                </div>
              ) : (
                <>
                  <div className="text-slate-700 text-sm leading-relaxed px-1">
                    {(() => {
                      const g = gcd(Math.abs(dy), Math.abs(dx));
                      let num = dy / g; let den = dx / g;
                      if (den < 0) { num = -num; den = -den; }
                      const fay = pointA.y < 0 ? `(${pointA.y})` : String(pointA.y);
                      const fax = pointA.x < 0 ? `(${pointA.x})` : String(pointA.x);
                      const lines = [
                        `m_{AB} &= \\dfrac{${pointB.y}-${fay}}{${pointB.x}-${fax}}`,
                        `&= \\dfrac{${dy}}{${dx}}`,
                      ];
                      if (Math.abs(g) > 1 || dx < 0) {
                        lines.push(den === 1 ? `&= ${num}` : `&= \\dfrac{${num}}{${den}}`);
                      }
                      return <Latex math={`\\begin{aligned}${lines.join(' \\\\ ')}\\end{aligned}`} block />;
                    })()}
                  </div>
                  <div className="mt-3 text-center">
                    <Latex math={`m_{AB} = ${slopeStrToLatex(slopeStr)}`} block />
                  </div>
                </>
              )}
            </div>
          )}

          {/* 中點公式 */}
          {showFormula === 'midpoint' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="font-bold text-amber-800 mb-3">📍 中點公式</h3>
              <div className="bg-white rounded-lg p-3 mb-3 text-center">
                <Latex math={"\\text{中點} = \\left(\\dfrac{x_1+x_2}{2},\\; \\dfrac{y_1+y_2}{2}\\right)"} block />
              </div>
              <div className="text-slate-700 text-sm leading-relaxed px-1">
                {(() => {
                  const fax = pointA.x < 0 ? `(${pointA.x})` : String(pointA.x);
                  const fay = pointA.y < 0 ? `(${pointA.y})` : String(pointA.y);
                  const fbx = pointB.x < 0 ? `(${pointB.x})` : String(pointB.x);
                  const fby = pointB.y < 0 ? `(${pointB.y})` : String(pointB.y);
                  const sx = pointA.x + pointB.x;
                  const sy = pointA.y + pointB.y;
                  const mxL = sx % 2 === 0 ? String(sx / 2) : `\\dfrac{${sx}}{2}`;
                  const myL = sy % 2 === 0 ? String(sy / 2) : `\\dfrac{${sy}}{2}`;
                  const needsSimplify = (sx % 2 === 0) || (sy % 2 === 0);
                  const lines = [
                    `\\text{中點} &= \\left(\\dfrac{${fax}+${fbx}}{2},\\; \\dfrac{${fay}+${fby}}{2}\\right)`,
                  ];
                  if (needsSimplify) {
                    lines.push(`&= \\left(\\dfrac{${sx}}{2},\\; \\dfrac{${sy}}{2}\\right)`);
                  }
                  lines.push(`&= \\left(${mxL},\\; ${myL}\\right)`);
                  return <Latex math={`\\begin{aligned}${lines.join(' \\\\ ')}\\end{aligned}`} block />;
                })()}
              </div>
              <div className="mt-3 text-center">
                <Latex math={`\\text{中點} = \\left(${midpointToLatex(pointA.x, pointB.x)},\\; ${midpointToLatex(pointA.y, pointB.y)}\\right)`} block />
              </div>
            </div>
          )}

          <div className="text-center pt-2">
            <button onClick={onGoToQuiz}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto transition-all shadow-lg">
              開始測驗 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

// ============= 筆記內容 =============
const NotesContent = () => (
  <div className="space-y-6">
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
      <h3 className="font-bold text-emerald-800 mb-3">📏 距離公式</h3>
      <div className="bg-white rounded-lg p-3 text-center">
        <Latex math={"\\text{距離} = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}"} block />
      </div>
    </div>
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <h3 className="font-bold text-blue-800 mb-3">📐 斜率公式</h3>
      <div className="bg-white rounded-lg p-3 text-center">
        <Latex math={"\\text{斜率} = \\dfrac{y_2-y_1}{x_2-x_1}"} block />
      </div>
      <p className="mt-2 text-sm text-slate-600">* 當 x₁ = x₂ 時，斜率未定義（垂直線）</p>
    </div>
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
      <h3 className="font-bold text-amber-800 mb-3">📍 中點公式</h3>
      <div className="bg-white rounded-lg p-3 text-center">
        <Latex math={"\\text{中點} = \\left(\\dfrac{x_1+x_2}{2},\\; \\dfrac{y_1+y_2}{2}\\right)"} block />
      </div>
    </div>
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
      <h3 className="font-bold text-amber-800 mb-3">題目示例</h3>
      <div className="space-y-3 text-sm text-slate-700">
        <div>
          <p className="font-bold">A(1, 2) 和 B(4, 6) 的距離：</p>
          <div className="space-y-1 mt-1 text-slate-600">
            <Latex math={"\\begin{aligned}\\text{距離} &= \\sqrt{(4-1)^2 + (6-2)^2} \\\\ &= \\sqrt{9 + 16} \\\\ &= \\sqrt{25} \\\\ &= 5\\end{aligned}"} block />
          </div>
        </div>
        <div>
          <p className="font-bold">A(1, 2) 和 B(4, 6) 的斜率：</p>
          <div className="space-y-1 mt-1 text-slate-600">
            <Latex math={"\\begin{aligned}\\text{斜率} &= \\dfrac{6-2}{4-1} \\\\ &= \\dfrac{4}{3}\\end{aligned}"} block />
          </div>
        </div>
        <div>
          <p className="font-bold">A(1, 2) 和 B(4, 6) 的中點：</p>
          <div className="space-y-1 mt-1 text-slate-600">
            <Latex math={"\\begin{aligned}\\text{中點} &= \\left(\\dfrac{1+4}{2},\\; \\dfrac{2+6}{2}\\right) \\\\ &= \\left(\\dfrac{5}{2},\\; 4\\right)\\end{aligned}"} block />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============= 主組件 =============
export default function DistanceSlopeQuiz() {
  const [mode, setMode] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [midpointX, setMidpointX] = useState('');
  const [midpointY, setMidpointY] = useState('');
  const [midpointFocus, setMidpointFocus] = useState('x');
  const [feedback, setFeedback] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [enabledTypes, setEnabledTypes] = useState({ distance: true, slope: true, midpoint: true });

  const toggleType = (id) => {
    setEnabledTypes(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (!next.distance && !next.slope && !next.midpoint) return prev;
      return next;
    });
  };

  const generateNewQuestion = useCallback(() => {
    setCurrentQuestion(generateQuizQuestion(enabledTypes));
    setUserAnswer('');
    setMidpointX('');
    setMidpointY('');
    setMidpointFocus('x');
    setFeedback(null);
  }, [enabledTypes]);

  useEffect(() => {
    if (mode === 'quiz') generateNewQuestion();
  }, [mode, generateNewQuestion]);

  const checkAnswer = () => {
    if (!currentQuestion) return;
    if (currentQuestion.type === 'midpoint') {
      if (!midpointX.trim() || !midpointY.trim()) return;
    } else if (!userAnswer.trim()) return;

    const parseFrac = (s) => {
      s = s.trim();
      if (s.includes('/')) {
        const [n, d] = s.split('/').map(Number);
        return (d === 0 || isNaN(n) || isNaN(d)) ? NaN : n / d;
      }
      return parseFloat(s);
    };

    let isCorrect = false;
    if (currentQuestion.type === 'midpoint') {
      const ux = parseFrac(midpointX);
      const uy = parseFrac(midpointY);
      const cx = parseFrac(currentQuestion.answerX);
      const cy = parseFrac(currentQuestion.answerY);
      isCorrect = !isNaN(ux) && !isNaN(uy) && Math.abs(ux - cx) < 1e-9 && Math.abs(uy - cy) < 1e-9;
    } else if (currentQuestion.type === 'slope') {
      const uv = parseFrac(userAnswer.trim());
      const cv = parseFrac(currentQuestion.answer);
      isCorrect = !isNaN(uv) && !isNaN(cv) && Math.abs(uv - cv) < 1e-9;
    } else {
      isCorrect = userAnswer.trim() === currentQuestion.answer;
    }

    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback({
        type: 'correct',
        message: '答對了！',
        latexLines: currentQuestion.latexLines
      });
    } else {
      setFeedback({
        type: 'wrong',
        message: '答錯了',
        correctAnswer: currentQuestion.displayAnswer,
        correctAnswerLatex: currentQuestion.displayAnswerLatex,
        latexLines: currentQuestion.latexLines,
        explanation: currentQuestion.explanation
      });
    }
    setQuestionCount(c => c + 1);
  };

  const backToMenu = () => {
    setMode(null);
    setScore(0);
    setQuestionCount(0);
    setFeedback(null);
    setCurrentQuestion(null);
    setUserAnswer('');
    setMidpointX('');
    setMidpointY('');
    setMidpointFocus('x');
  };

  const handleKeypadInput = (v) => {
    if (feedback) return;
    if (currentQuestion?.type === 'midpoint') {
      if (midpointFocus === 'x') setMidpointX(prev => prev + v);
      else setMidpointY(prev => prev + v);
    } else {
      setUserAnswer(prev => prev + v);
    }
  };
  const handleKeypadDelete = () => {
    if (feedback) return;
    if (currentQuestion?.type === 'midpoint') {
      if (midpointFocus === 'x') setMidpointX(prev => prev.slice(0, -1));
      else setMidpointY(prev => prev.slice(0, -1));
    } else {
      setUserAnswer(prev => prev.slice(0, -1));
    }
  };
  const handleKeypadClear = () => {
    if (feedback) return;
    if (currentQuestion?.type === 'midpoint') {
      if (midpointFocus === 'x') setMidpointX('');
      else setMidpointY('');
    } else {
      setUserAnswer('');
    }
  };
  const handleKeypadNext = () => { setMidpointFocus('y'); };
  const handleKeypadSubmit = () => { if (feedback) generateNewQuestion(); else checkAnswer(); };

  // ========== 模式選擇 ==========
  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
        <Link to="/"
          className="fixed top-4 right-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg">
          <HomeIcon size={18} />
          <span className="font-medium">首頁</span>
        </Link>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl shadow-lg mb-4">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">距離與斜率</h1>
              <p className="text-slate-500">學習兩點之間的距離、斜率和中點公式</p>
            </div>
            <div className="grid gap-4">
              <button onClick={() => setMode('learn')}
                className="group p-6 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-lg"><GraduationCap className="w-8 h-8" /></div>
                  <div className="text-left">
                    <div className="text-xl font-bold mb-1">學習模式</div>
                    <div className="text-sm opacity-80">拖拽兩點，觀察距離、斜率和中點</div>
                  </div>
                </div>
              </button>
              <button onClick={() => setMode('quiz')}
                className="group p-6 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-lg"><PenTool className="w-8 h-8" /></div>
                  <div className="text-left">
                    <div className="text-xl font-bold mb-1">測驗模式</div>
                    <div className="text-sm opacity-80">練習計算距離、斜率和中點</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== 學習模式 ==========
  if (mode === 'learn') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <button onClick={backToMenu}
          className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg">
          <ArrowRight size={18} className="rotate-180" />
          <span className="font-medium">返回選單</span>
        </button>
        <Link to="/"
          className="fixed top-4 right-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg">
          <HomeIcon size={18} />
          <span className="font-medium">首頁</span>
        </Link>
        <div className="flex-1 pt-16 pb-8 px-4">
          <TeachingPage onGoToQuiz={() => setMode('quiz')} />
        </div>
      </div>
    );
  }

  // ========== 測驗模式 ==========
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <button onClick={backToMenu}
        className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg">
        <ArrowRight size={18} className="rotate-180" />
        <span className="font-medium">返回選單</span>
      </button>
      <Link to="/"
        className="fixed top-4 right-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg">
        <HomeIcon size={18} />
        <span className="font-medium">首頁</span>
      </Link>

      <div className="flex-1 flex justify-center pt-20 pb-8 px-4">
        <div className="w-full max-w-xl">
          {/* 分數 */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-slate-600">分數：</span>
              <span className="text-2xl font-bold text-blue-600">{score}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">已完成: {questionCount} 題</span>
              <button onClick={() => setShowNotes(true)}
                className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-600" title="查看筆記">
                <BookOpen size={20} />
              </button>
            </div>
          </div>

          {/* 題目類型選擇 */}
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            <h3 className="font-bold text-gray-700 mb-3">選擇題目類型</h3>
            <div className="flex flex-wrap gap-4">
              {[
                { id: 'distance', label: '距離' },
                { id: 'slope', label: '斜率' },
                { id: 'midpoint', label: '中點' }
              ].map(t => (
                <label key={t.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabledTypes[t.id]}
                    onChange={() => toggleType(t.id)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium">{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 題目 */}
          {currentQuestion && (
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="mb-2">
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-bold">題目</span>
                <span className={`ml-2 inline-block px-3 py-1 rounded-md text-sm font-bold ${
                  currentQuestion.type === 'distance' ? 'bg-emerald-100 text-emerald-700' :
                  currentQuestion.type === 'slope' ? 'bg-indigo-100 text-indigo-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {currentQuestion.type === 'distance' ? '距離' : currentQuestion.type === 'slope' ? '斜率' : '中點'}
                </span>
              </div>

              <div className="text-center mb-6 mt-4">
                <div className="text-lg text-slate-600 mb-2">
                  已知&nbsp;
                  <span className="font-bold text-blue-600">A({currentQuestion.pointA.x}, {currentQuestion.pointA.y})</span>
                  &nbsp;和&nbsp;
                  <span className="font-bold text-red-500">B({currentQuestion.pointB.x}, {currentQuestion.pointB.y})</span>
                </div>
                <p className="text-slate-500 text-sm">{currentQuestion.prompt}</p>
              </div>

              {/* 答案輸入 */}
              {currentQuestion.type === 'midpoint' ? (
                <div className="mb-4">
                  <p className="text-sm text-slate-500 mb-3 text-center">輸入中點坐標（點擊方框後輸入）：</p>
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-700">
                    <span className="text-3xl">(</span>
                    <button
                      onClick={() => !feedback && setMidpointFocus('x')}
                      className={`w-24 text-center p-3 border-2 rounded-xl text-2xl transition-all ${
                        feedback?.type === 'correct' ? 'border-green-500 bg-green-50' :
                        feedback?.type === 'wrong' ? 'border-red-500 bg-red-50' :
                        midpointFocus === 'x' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {midpointX || <span className="text-slate-300 text-xl">x</span>}
                    </button>
                    <span className="text-slate-400">,</span>
                    <button
                      onClick={() => !feedback && setMidpointFocus('y')}
                      className={`w-24 text-center p-3 border-2 rounded-xl text-2xl transition-all ${
                        feedback?.type === 'correct' ? 'border-green-500 bg-green-50' :
                        feedback?.type === 'wrong' ? 'border-red-500 bg-red-50' :
                        midpointFocus === 'y' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {midpointY || <span className="text-slate-300 text-xl">y</span>}
                    </button>
                    <span className="text-3xl">)</span>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block text-sm text-slate-500 mb-2 text-center">你的答案：</label>
                  <input
                    type="text"
                    value={userAnswer}
                    readOnly
                    className={`w-full text-3xl text-center p-4 border-2 rounded-xl focus:outline-none transition-all
                      ${feedback?.type === 'correct' ? 'border-green-500 bg-green-50' :
                        feedback?.type === 'wrong' ? 'border-red-500 bg-red-50' :
                        'border-slate-300'}`}
                    placeholder="輸入答案"
                  />
                </div>
              )}

              {/* 反饋 */}
              {feedback && (
                <div className={`p-4 rounded-xl mb-4 text-center ${
                  feedback.type === 'correct' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <div className={`flex items-center justify-center gap-2 text-lg font-bold ${
                    feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {feedback.type === 'correct'
                      ? <><Check className="w-6 h-6" />{feedback.message}</>
                      : <><X className="w-6 h-6" />{feedback.message}</>}
                  </div>
                  {(feedback.correctAnswer || feedback.latexLines) && (
                    <div className="mt-4 border-t border-slate-200 pt-4">
                      {feedback.correctAnswer && (
                        <>
                          <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-md text-sm font-bold mb-2">正確答案</span>
                          <div className="text-2xl font-bold text-slate-700">
                            <Latex math={feedback.correctAnswerLatex || feedback.correctAnswer} block />
                          </div>
                        </>
                      )}
                      {feedback.latexLines && (
                        <div className="mt-3 text-purple-700 bg-purple-50 px-3 py-2 rounded-lg text-sm">
                          <Latex math={toAligned(feedback.latexLines)} block />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 鍵盤 */}
              <QuizKeyboard
                onInput={handleKeypadInput}
                onDelete={handleKeypadDelete}
                onClear={handleKeypadClear}
                onSubmit={handleKeypadSubmit}
                onNext={handleKeypadNext}
                showNext={!feedback && currentQuestion?.type === 'midpoint' && midpointFocus === 'x'}
                disabled={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* 筆記彈窗 */}
      {showNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                距離與斜率 筆記
              </h3>
              <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <NotesContent />
            </div>
            <div className="p-4 border-t bg-slate-50 text-center">
              <button onClick={() => setShowNotes(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full transition-all shadow-md">
                明白
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
