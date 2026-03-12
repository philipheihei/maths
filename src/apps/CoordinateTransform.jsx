import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Home as HomeIcon, RefreshCw, CheckCircle, XCircle, ArrowRight, Play, Pause, RotateCcw, BookOpen, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

// ============= CONSTANTS =============
const GRID_SIZE = 7; // -7 to 7
const SVG_SIZE = 400;
const PADDING = 30;
const UNIT = (SVG_SIZE - 2 * PADDING) / (GRID_SIZE * 2);
const CENTER = SVG_SIZE / 2;

// Convert grid coordinates to SVG coordinates
const toSVG = (x, y) => ({
  x: CENTER + x * UNIT,
  y: CENTER - y * UNIT // Y is inverted in SVG
});

// Convert SVG coordinates to grid coordinates
const toGrid = (svgX, svgY) => ({
  x: Math.round((svgX - CENTER) / UNIT),
  y: Math.round((CENTER - svgY) / UNIT)
});

// ============= COORDINATE GRID COMPONENT =============
const CoordinateGrid = ({ children, size = SVG_SIZE, onMouseMove, onMouseUp, onMouseLeave }) => {
  const gridLines = [];
  
  // Generate grid lines
  for (let i = -GRID_SIZE; i <= GRID_SIZE; i++) {
    const pos = CENTER + i * UNIT;
    // Vertical lines
    gridLines.push(
      <line key={`v${i}`} x1={pos} y1={PADDING} x2={pos} y2={SVG_SIZE - PADDING}
        stroke={i === 0 ? '#333' : '#e0e7ff'} strokeWidth={i === 0 ? 2 : 1} />
    );
    // Horizontal lines
    gridLines.push(
      <line key={`h${i}`} x1={PADDING} y1={pos} x2={SVG_SIZE - PADDING} y2={pos}
        stroke={i === 0 ? '#333' : '#e0e7ff'} strokeWidth={i === 0 ? 2 : 1} />
    );
  }

  // Axis labels
  const labels = [];
  for (let i = -GRID_SIZE; i <= GRID_SIZE; i++) {
    if (i !== 0) {
      // X-axis labels
      labels.push(
        <text key={`xl${i}`} x={CENTER + i * UNIT} y={CENTER + 18} 
          textAnchor="middle" fontSize="11" fill="#666">{i}</text>
      );
      // Y-axis labels
      labels.push(
        <text key={`yl${i}`} x={CENTER - 15} y={CENTER - i * UNIT + 4}
          textAnchor="middle" fontSize="11" fill="#666">{i}</text>
      );
    }
  }

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} 
      className="bg-white rounded-xl border border-gray-200 shadow-sm"
      style={{ touchAction: 'none' }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchMove={onMouseMove}
      onTouchEnd={onMouseUp}
    >
      {/* Grid lines */}
      {gridLines}
      
      {/* X-axis arrow */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
      <line x1={PADDING} y1={CENTER} x2={SVG_SIZE - PADDING + 5} y2={CENTER} 
        stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <line x1={CENTER} y1={SVG_SIZE - PADDING} x2={CENTER} y2={PADDING - 5} 
        stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Axis labels */}
      {labels}
      <text x={SVG_SIZE - PADDING + 15} y={CENTER + 5} fontSize="14" fontWeight="bold" fill="#333">x</text>
      <text x={CENTER + 8} y={PADDING - 10} fontSize="14" fontWeight="bold" fill="#333">y</text>
      
      {/* Children (points, lines, etc.) */}
      {children}
    </svg>
  );
};

// ============= DRAGGABLE POINT COMPONENT =============
const DraggablePoint = ({ point, onDragStart, isDragging, label = 'P', color = '#3b82f6' }) => {
  const svgCoords = toSVG(point.x, point.y);
  
  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDragStart();
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDragStart();
  };

  return (
    <g>
      {/* Larger invisible hit area for easier dragging */}
      <circle
        cx={svgCoords.x}
        cy={svgCoords.y}
        r="15"
        fill="transparent"
        style={{ cursor: 'grab' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
      {/* Visible draggable point */}
      <circle
        cx={svgCoords.x}
        cy={svgCoords.y}
        r={isDragging ? 10 : 8}
        fill={isDragging ? '#2563eb' : color}
        stroke="white"
        strokeWidth="2"
        style={{ cursor: 'grab', pointerEvents: 'none' }}
        className="transition-all duration-150"
      />
      <text 
        x={svgCoords.x + 12} 
        y={svgCoords.y - 10} 
        fontSize="14" 
        fontWeight="bold" 
        fill={color}
        style={{ pointerEvents: 'none' }}
      >
        {label}
      </text>
      <text 
        x={svgCoords.x + 12} 
        y={svgCoords.y + 5} 
        fontSize="12" 
        fill="#666"
        style={{ pointerEvents: 'none' }}
      >
        ({point.x}, {point.y})
      </text>
      {/* Drag hint */}
      {!isDragging && (
        <text
          x={svgCoords.x}
          y={svgCoords.y + 26}
          fontSize="9"
          fill="#999"
          textAnchor="middle"
          style={{ pointerEvents: 'none' }}
        >
          拖拽移動
        </text>
      )}
    </g>
  );
};

// ============= ANIMATED POINT COMPONENT =============
const AnimatedPoint = ({ from, to, label, labelPrime, color = '#3b82f6', progress = 1, showPath = false }) => {
  const fromSVG = toSVG(from.x, from.y);
  const toSVG_coords = toSVG(to.x, to.y);
  const midSVG = toSVG(to.x, from.y); // Intermediate point after horizontal movement
  
  // Two-step animation: horizontal first (0-0.5), then vertical (0.5-1)
  let currentX, currentY;
  if (progress <= 0.5) {
    // First half: horizontal movement
    const horizontalProgress = progress * 2;
    currentX = fromSVG.x + (midSVG.x - fromSVG.x) * horizontalProgress;
    currentY = fromSVG.y;
  } else {
    // Second half: vertical movement
    const verticalProgress = (progress - 0.5) * 2;
    currentX = midSVG.x;
    currentY = midSVG.y + (toSVG_coords.y - midSVG.y) * verticalProgress;
  }
  
  return (
    <g>
      {/* Path lines - horizontal then vertical */}
      {showPath && progress > 0 && (
        <>
          {/* Horizontal path */}
          <line x1={fromSVG.x} y1={fromSVG.y} x2={progress <= 0.5 ? currentX : midSVG.x} y2={fromSVG.y}
            stroke={color} strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
          {/* Vertical path */}
          {progress > 0.5 && (
            <line x1={midSVG.x} y1={midSVG.y} x2={currentX} y2={currentY}
              stroke={color} strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
          )}
          {/* Intermediate point indicator at corner */}
          {progress > 0.5 && (
            <circle cx={midSVG.x} cy={midSVG.y} r="3" fill={color} opacity="0.7" />
          )}
        </>
      )}
      
      {/* Original point */}
      <circle cx={fromSVG.x} cy={fromSVG.y} r="6" fill={color} opacity="0.5" />
      <text x={fromSVG.x + 12} y={fromSVG.y - 10} fontSize="14" fontWeight="bold" fill={color}>{label}</text>
      <text x={fromSVG.x + 12} y={fromSVG.y + 5} fontSize="12" fill="#666">({from.x}, {from.y})</text>
      
      {/* Moving/Final point */}
      {progress > 0 && (
        <>
          <circle cx={currentX} cy={currentY} r="7" fill="#ef4444" stroke="white" strokeWidth="2" />
          {progress === 1 && (
            <>
              <text x={currentX + 12} y={currentY - 10} fontSize="14" fontWeight="bold" fill="#ef4444">{labelPrime}</text>
              <text x={currentX + 12} y={currentY + 5} fontSize="12" fill="#666">({to.x}, {to.y})</text>
            </>
          )}
        </>
      )}
    </g>
  );
};

// ============= ROTATION ANIMATION COMPONENT =============
const RotationPoint = ({ from, angle, label, labelPrime, color = '#3b82f6', progress = 1, clockwise = true }) => {
  const fromSVG = toSVG(from.x, from.y);
  const angleRad = (clockwise ? -1 : 1) * (angle * Math.PI / 180) * progress;
  
  // Calculate rotated position (P' target position)
  const rotatedX = from.x * Math.cos(angleRad) - from.y * Math.sin(angleRad);
  const rotatedY = from.x * Math.sin(angleRad) + from.y * Math.cos(angleRad);
  const toCoords = { x: Math.round(rotatedX), y: Math.round(rotatedY) };
  const currentSVG = toSVG(rotatedX, rotatedY);
  
  // Arc path for rotation visualization
  const radius = Math.sqrt(from.x * from.x + from.y * from.y) * UNIT;
  const startAngle = Math.atan2(-from.y, from.x); // SVG y is inverted
  
  // Calculate target angle (P' position) - SVG y is inverted
  const targetAngle = Math.atan2(-rotatedY, rotatedX);
  
  // Shorten arc to leave gap between arrow head and P'
  // Arrow length (~10px) with minimal offset ≈ 9px to sit right at the perimeter edge
  const totalShortenPixels = 9;
  const shortenAngle = totalShortenPixels / radius;
  
  // Arc endpoint: move back from target angle by shortenAngle
  // Direction depends on clockwise rotation
  // CCW: angle gets more negative due to SVG Y inversion, so add shortenAngle to stop earlier
  // CW: angle gets more positive, so subtract to stop earlier
  const arcEndAngle = targetAngle + (clockwise ? -shortenAngle : shortenAngle);
  
  const arcPath = radius > 5 ? `
    M ${CENTER + radius * Math.cos(startAngle)} ${CENTER + radius * Math.sin(startAngle)}
    A ${radius} ${radius} 0 ${Math.abs(angle * progress) > 180 ? 1 : 0} ${clockwise ? 1 : 0} 
      ${CENTER + radius * Math.cos(arcEndAngle)} ${CENTER + radius * Math.sin(arcEndAngle)}
  ` : '';

  return (
    <g>
      {/* Arrow marker definition for rotation arc */}
      <defs>
        <marker 
          id="rotationArrow" 
          markerWidth="10" 
          markerHeight="10" 
          refX="9" 
          refY="5" 
          orient="auto"
        >
          <path 
            d="M 2,2 L 9,5 L 2,8" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      
      {/* Rotation arc - green dotted line connecting P and P' along the circular path with arrow */}
      {progress > 0 && radius > 5 && (
        <path 
          d={arcPath} 
          fill="none" 
          stroke="#10b981" 
          strokeWidth="2" 
          strokeDasharray="5,5"
          markerEnd="url(#rotationArrow)"
        />
      )}
      
      {/* Radius line from origin to original point (light) */}
      <line x1={CENTER} y1={CENTER} x2={fromSVG.x} y2={fromSVG.y}
        stroke={color} strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
      
      {/* Original point */}
      <circle cx={fromSVG.x} cy={fromSVG.y} r="6" fill={color} opacity="0.5" />
      <text x={fromSVG.x + 12} y={fromSVG.y - 10} fontSize="14" fontWeight="bold" fill={color}>{label}</text>
      <text x={fromSVG.x + 12} y={fromSVG.y + 5} fontSize="12" fill="#666">({from.x}, {from.y})</text>
      
      {/* Current radius line (only when animating) */}
      {progress > 0 && progress < 1 && (
        <line x1={CENTER} y1={CENTER} x2={currentSVG.x} y2={currentSVG.y}
          stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      )}
      
      {/* Final radius line (when complete) */}
      {progress === 1 && (
        <line x1={CENTER} y1={CENTER} x2={currentSVG.x} y2={currentSVG.y}
          stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
      )}
      
      {/* Moving/Final point */}
      {progress > 0 && (
        <>
          <circle cx={currentSVG.x} cy={currentSVG.y} r="7" fill="#ef4444" stroke="white" strokeWidth="2" />
          {progress === 1 && (
            <>
              <text x={currentSVG.x + 12} y={currentSVG.y - 10} fontSize="14" fontWeight="bold" fill="#ef4444">{labelPrime}</text>
              <text x={currentSVG.x + 12} y={currentSVG.y + 5} fontSize="12" fill="#666">({toCoords.x}, {toCoords.y})</text>
            </>
          )}
        </>
      )}
      
      {/* Origin point indicator */}
      <circle cx={CENTER} cy={CENTER} r="4" fill="#333" />
      <text x={CENTER - 15} y={CENTER + 20} fontSize="12" fontWeight="bold" fill="#333">O</text>
    </g>
  );
};

// ============= REFLECTION ANIMATION COMPONENT =============
const ReflectionPoint = ({ from, axis, axisValue = 0, label, labelPrime, color = '#3b82f6', progress = 1 }) => {
  const fromSVG = toSVG(from.x, from.y);
  
  // Calculate reflected position
  let to;
  if (axis === 'x') {
    to = { x: from.x, y: -from.y };
  } else if (axis === 'y') {
    to = { x: -from.x, y: from.y };
  } else if (axis === 'x=') {
    to = { x: 2 * axisValue - from.x, y: from.y };
  } else if (axis === 'y=') {
    to = { x: from.x, y: 2 * axisValue - from.y };
  }
  
  const toSVG_coords = toSVG(to.x, to.y);
  const currentX = fromSVG.x + (toSVG_coords.x - fromSVG.x) * progress;
  const currentY = fromSVG.y + (toSVG_coords.y - fromSVG.y) * progress;
  
  // Reflection line
  let lineStart, lineEnd;
  if (axis === 'x') {
    lineStart = toSVG(-GRID_SIZE, 0);
    lineEnd = toSVG(GRID_SIZE, 0);
  } else if (axis === 'y') {
    lineStart = toSVG(0, -GRID_SIZE);
    lineEnd = toSVG(0, GRID_SIZE);
  } else if (axis === 'x=') {
    lineStart = toSVG(axisValue, -GRID_SIZE);
    lineEnd = toSVG(axisValue, GRID_SIZE);
  } else if (axis === 'y=') {
    lineStart = toSVG(-GRID_SIZE, axisValue);
    lineEnd = toSVG(GRID_SIZE, axisValue);
  }

  return (
    <g>
      {/* Red arrowhead marker */}
      <defs>
        <marker id="redArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
        </marker>
      </defs>
      
      {/* Reflection axis line */}
      <line x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y}
        stroke="#8b5cf6" strokeWidth="3" strokeDasharray="8,4" />
      
      {/* Perpendicular line from point to axis */}
      {progress > 0 && (
        <line x1={fromSVG.x} y1={fromSVG.y} x2={currentX} y2={currentY}
          stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" opacity="0.7" />
      )}
      
      {/* Distance arrows for x=k and y=k (after animation completes) */}
      {progress === 1 && (axis === 'x=' || axis === 'y=') && (
        <>
          {axis === 'x=' && (
            <>
              {/* Arrow from original point to reflection line */}
              <line 
                x1={fromSVG.x} 
                y1={fromSVG.y} 
                x2={toSVG(axisValue, from.y).x} 
                y2={toSVG(axisValue, from.y).y}
                stroke="#ef4444" 
                strokeWidth="2" 
                markerEnd="url(#redArrow)"
              />
              {/* Arrow from reflection line to reflected point */}
              <line 
                x1={toSVG(axisValue, to.y).x} 
                y1={toSVG(axisValue, to.y).y} 
                x2={toSVG_coords.x} 
                y2={toSVG_coords.y}
                stroke="#ef4444" 
                strokeWidth="2" 
                markerEnd="url(#redArrow)"
              />
              {/* Distance label from line to original point */}
              <text 
                x={(toSVG(axisValue, from.y).x + fromSVG.x) / 2} 
                y={fromSVG.y - 8} 
                fontSize="13" 
                fontWeight="bold" 
                fill="#ef4444"
              >
                {(axisValue - from.x) >= 0 ? '+' : ''}{axisValue - from.x}
              </text>
              {/* Distance label from line to reflected point */}
              <text 
                x={(toSVG(axisValue, to.y).x + toSVG_coords.x) / 2} 
                y={toSVG_coords.y - 8} 
                fontSize="13" 
                fontWeight="bold" 
                fill="#ef4444"
              >
                {(to.x - axisValue) >= 0 ? '+' : ''}{to.x - axisValue}
              </text>
            </>
          )}
          {axis === 'y=' && (
            <>
              {/* Arrow from original point to reflection line */}
              <line 
                x1={fromSVG.x} 
                y1={fromSVG.y} 
                x2={toSVG(from.x, axisValue).x} 
                y2={toSVG(from.x, axisValue).y}
                stroke="#ef4444" 
                strokeWidth="2" 
                markerEnd="url(#redArrow)"
              />
              {/* Arrow from reflection line to reflected point */}
              <line 
                x1={toSVG(to.x, axisValue).x} 
                y1={toSVG(to.x, axisValue).y} 
                x2={toSVG_coords.x} 
                y2={toSVG_coords.y}
                stroke="#ef4444" 
                strokeWidth="2" 
                markerEnd="url(#redArrow)"
              />
              {/* Distance label from original point to line */}
              <text 
                x={fromSVG.x - 15} 
                y={(fromSVG.y + toSVG(from.x, axisValue).y) / 2} 
                fontSize="13" 
                fontWeight="bold" 
                fill="#ef4444"
              >
                {(axisValue - from.y) >= 0 ? '+' : ''}{axisValue - from.y}
              </text>
              {/* Distance label from line to reflected point */}
              <text 
                x={toSVG_coords.x - 15} 
                y={(toSVG(to.x, axisValue).y + toSVG_coords.y) / 2} 
                fontSize="13" 
                fontWeight="bold" 
                fill="#ef4444"
              >
                {(to.y - axisValue) >= 0 ? '+' : ''}{to.y - axisValue}
              </text>
            </>
          )}
        </>
      )}
      
      {/* Original point */}
      <circle cx={fromSVG.x} cy={fromSVG.y} r="6" fill={color} opacity="0.5" />
      <text x={fromSVG.x + 12} y={fromSVG.y - 10} fontSize="14" fontWeight="bold" fill={color}>{label}</text>
      <text x={fromSVG.x + 12} y={fromSVG.y + 5} fontSize="12" fill="#666">({from.x}, {from.y})</text>
      
      {/* Moving/Final point */}
      {progress > 0 && (
        <>
          <circle cx={currentX} cy={currentY} r="7" fill="#ef4444" stroke="white" strokeWidth="2" />
          {progress === 1 && (
            <>
              <text x={currentX + 12} y={currentY - 10} fontSize="14" fontWeight="bold" fill="#ef4444">{labelPrime}</text>
              <text x={currentX + 12} y={currentY + 5} fontSize="12" fill="#666">({to.x}, {to.y})</text>
            </>
          )}
        </>
      )}
    </g>
  );
};

// ============= KEYBOARD COMPONENT =============
const NumKeyboard = ({ onInput, onDelete, onClear }) => {
  const keys = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['-', '0', 'DEL']
  ];

  const btnClass = "bg-white border border-gray-300 rounded-lg p-3 shadow-sm active:bg-blue-100 hover:bg-gray-50 text-lg font-medium transition-colors select-none";

  return (
    <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
      {keys.map((row, rIdx) =>
        row.map((key, cIdx) => (
          <button
            key={`${rIdx}-${cIdx}`}
            onClick={() => {
              if (key === 'DEL') onDelete();
              else if (key === 'AC') onClear();
              else onInput(key);
            }}
            className={key === 'DEL' ? `${btnClass} bg-red-100 text-red-800 border-red-200` : btnClass}
          >
            {key}
          </button>
        ))
      )}
      <button onClick={onClear} className={`${btnClass} col-span-3 bg-gray-100 text-gray-700`}>
        AC
      </button>
    </div>
  );
};

// ============= COORDINATE INPUT COMPONENT =============
const CoordinateInput = ({ value, onChange, onSubmit, disabled = false }) => {
  const xRef = useRef(null);
  const yRef = useRef(null);
  const [activeField, setActiveField] = useState('x');

  // Reset to X field when answer is cleared (new question)
  useEffect(() => {
    if (value.x === '' && value.y === '') {
      setActiveField('x');
    }
  }, [value]);

  const handleKeyInput = (key) => {
    if (activeField === 'x') {
      const newX = value.x + key;
      // Validate: allow - only at start, max 2 chars for -7 to 7
      if (newX === '-' || (parseInt(newX) >= -7 && parseInt(newX) <= 7 && newX.length <= 2)) {
        onChange({ ...value, x: newX });
        // Auto-jump to Y if X is complete (single digit or -digit)
        if ((newX.length === 1 && newX !== '-') || (newX.length === 2 && newX[0] === '-')) {
          setActiveField('y');
          setTimeout(() => yRef.current?.focus(), 50);
        }
      }
    } else {
      const newY = value.y + key;
      if (newY === '-' || (parseInt(newY) >= -7 && parseInt(newY) <= 7 && newY.length <= 2)) {
        onChange({ ...value, y: newY });
      }
    }
  };

  const handleDelete = () => {
    if (activeField === 'y' && value.y === '') {
      setActiveField('x');
    } else if (activeField === 'y') {
      onChange({ ...value, y: value.y.slice(0, -1) });
    } else {
      onChange({ ...value, x: value.x.slice(0, -1) });
    }
  };

  const handleClear = () => {
    onChange({ x: '', y: '' });
    setActiveField('x');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 text-2xl font-mono">
        <span className="text-gray-600">(</span>
        <input
          ref={xRef}
          type="text"
          value={value.x}
          readOnly
          onClick={() => setActiveField('x')}
          className={`w-14 h-12 text-center border-2 rounded-lg text-xl font-bold ${
            activeField === 'x' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          placeholder="x"
          disabled={disabled}
        />
        <span className="text-gray-600">,</span>
        <input
          ref={yRef}
          type="text"
          value={value.y}
          readOnly
          onClick={() => setActiveField('y')}
          className={`w-14 h-12 text-center border-2 rounded-lg text-xl font-bold ${
            activeField === 'y' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          placeholder="y"
          disabled={disabled}
        />
        <span className="text-gray-600">)</span>
      </div>

      {!disabled && (
        <>
          <NumKeyboard onInput={handleKeyInput} onDelete={handleDelete} onClear={handleClear} />
          <button
            onClick={onSubmit}
            disabled={value.x === '' || value.y === ''}
            className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${
              value.x !== '' && value.y !== '' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            確認答案
          </button>
        </>
      )}
    </div>
  );
};

// ============= TEACHING PAGE =============
const TeachingPage = ({ onGoToQuiz }) => {
  const [transformType, setTransformType] = useState('translation');
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);

  // Demo settings
  const [translationDelta, setTranslationDelta] = useState({ dx: 3, dy: -2 });
  const [rotationAngle, setRotationAngle] = useState(90);
  const [rotationClockwise, setRotationClockwise] = useState(false);
  const [reflectionAxis, setReflectionAxis] = useState('y');
  const [reflectionValue, setReflectionValue] = useState(0);

  // Draggable demo point
  const [demoPoint, setDemoPoint] = useState({ x: 2, y: 3 });
  const [isDragging, setIsDragging] = useState(false);
  
  const label = 'P';
  const labelPrime = "P'";

  // Handle drag start
  const handleDragStart = () => {
    setIsDragging(true);
    setProgress(0); // Reset animation when dragging
    setIsPlaying(false);
  };

  // Handle mouse/touch move during drag
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    
    // Get position (support both mouse and touch)
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Convert to SVG coordinates
    const svgX = ((clientX - rect.left) / rect.width) * SVG_SIZE;
    const svgY = ((clientY - rect.top) / rect.height) * SVG_SIZE;
    
    // Convert to grid coordinates and clamp to valid range
    const gridCoords = toGrid(svgX, svgY);
    const clampedX = Math.max(-GRID_SIZE + 1, Math.min(GRID_SIZE - 1, gridCoords.x));
    const clampedY = Math.max(-GRID_SIZE + 1, Math.min(GRID_SIZE - 1, gridCoords.y));
    
    setDemoPoint({ x: clampedX, y: clampedY });
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Animation effect
  useEffect(() => {
    if (isPlaying) {
      const startTime = Date.now();
      const duration = 1500; // 1.5 seconds

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(elapsed / duration, 1);
        setProgress(newProgress);

        if (newProgress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsPlaying(false);
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isPlaying]);

  const handlePlay = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  // Calculate target point for display
  const getTargetPoint = () => {
    if (transformType === 'translation') {
      return { x: demoPoint.x + translationDelta.dx, y: demoPoint.y + translationDelta.dy };
    } else if (transformType === 'rotation') {
      const angleRad = (rotationClockwise ? -1 : 1) * (rotationAngle * Math.PI / 180);
      return {
        x: Math.round(demoPoint.x * Math.cos(angleRad) - demoPoint.y * Math.sin(angleRad)),
        y: Math.round(demoPoint.x * Math.sin(angleRad) + demoPoint.y * Math.cos(angleRad))
      };
    } else {
      if (reflectionAxis === 'x') return { x: demoPoint.x, y: -demoPoint.y };
      if (reflectionAxis === 'y') return { x: -demoPoint.x, y: demoPoint.y };
      if (reflectionAxis === 'x=') return { x: 2 * reflectionValue - demoPoint.x, y: demoPoint.y };
      if (reflectionAxis === 'y=') return { x: demoPoint.x, y: 2 * reflectionValue - demoPoint.y };
    }
    return demoPoint;
  };

  const getTransformDescription = () => {
    const target = getTargetPoint();
    const showTarget = progress === 1; // Only show target coordinates after animation completes
    
    if (transformType === 'translation') {
      const dirs = [];
      if (translationDelta.dx > 0) dirs.push(`向右平移 ${translationDelta.dx} 單位`);
      if (translationDelta.dx < 0) dirs.push(`向左平移 ${Math.abs(translationDelta.dx)} 單位`);
      if (translationDelta.dy > 0) dirs.push(`向上平移 ${translationDelta.dy} 單位`);
      if (translationDelta.dy < 0) dirs.push(`向下平移 ${Math.abs(translationDelta.dy)} 單位`);
      
      if (showTarget) {
        return `${label}(${demoPoint.x}, ${demoPoint.y}) ${dirs.join('，然後')}至 ${labelPrime}(${target.x}, ${target.y})。`;
      } else {
        return `${label}(${demoPoint.x}, ${demoPoint.y}) ${dirs.join('，然後')}`;
      }
    } else if (transformType === 'rotation') {
      const direction = rotationClockwise ? '順時針' : '逆時針';
      
      if (showTarget) {
        return `${label}(${demoPoint.x}, ${demoPoint.y}) 繞原點 O ${direction}方向旋轉 ${rotationAngle}° 至 ${labelPrime}(${target.x}, ${target.y})。`;
      } else {
        return `${label}(${demoPoint.x}, ${demoPoint.y}) 繞原點 O ${direction}方向旋轉 ${rotationAngle}°`;
      }
    } else {
      let axisStr = '';
      if (reflectionAxis === 'x') axisStr = 'x 軸';
      else if (reflectionAxis === 'y') axisStr = 'y 軸';
      else if (reflectionAxis === 'x=') axisStr = `直線 x = ${reflectionValue}`;
      else if (reflectionAxis === 'y=') axisStr = `直線 y = ${reflectionValue}`;
      
      if (showTarget) {
        return `點 ${label} 的坐標為(${demoPoint.x}, ${demoPoint.y})。${label} 對 ${axisStr} 作反射至點 ${labelPrime}，${labelPrime} 的坐標為(${target.x}, ${target.y})。`;
      } else {
        return `點 ${label} 的坐標為(${demoPoint.x}, ${demoPoint.y})。${label} 對 ${axisStr} 作反射至點 ${labelPrime}。`;
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <BookOpen size={28} />
          直角坐標的轉換
        </h1>
        <p className="opacity-90">學習平移、旋轉和反射的基本概念</p>
      </div>

      {/* Transform Type Selector */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="font-bold text-gray-700">選擇轉換類型</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'translation', label: '平移', icon: '↔️' },
              { id: 'rotation', label: '旋轉', icon: '🔄' },
              { id: 'reflection', label: '反射', icon: '🪞' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => { setTransformType(type.id); handleReset(); }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  transformType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* SVG Visualization */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <CoordinateGrid
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Preview lines for rotation (when not playing) */}
            {progress === 0 && !isPlaying && transformType === 'rotation' && (
              <>
                {/* Origin point O */}
                <circle cx={CENTER} cy={CENTER} r="4" fill="#333" />
                <text x={CENTER - 15} y={CENTER + 20} fontSize="12" fontWeight="bold" fill="#333">O</text>
                
                {/* Line from O to P */}
                <line 
                  x1={CENTER} 
                  y1={CENTER} 
                  x2={toSVG(demoPoint.x, demoPoint.y).x} 
                  y2={toSVG(demoPoint.x, demoPoint.y).y}
                  stroke="#3b82f6" 
                  strokeWidth="2" 
                  strokeDasharray="5,5" 
                  opacity="0.5" 
                />
              </>
            )}
            
            {/* Preview line for reflection (when not playing) */}
            {progress === 0 && !isPlaying && transformType === 'reflection' && (
              <>
                {/* Reflection axis line */}
                {(() => {
                  let lineStart, lineEnd;
                  if (reflectionAxis === 'x') {
                    lineStart = toSVG(-GRID_SIZE, 0);
                    lineEnd = toSVG(GRID_SIZE, 0);
                  } else if (reflectionAxis === 'y') {
                    lineStart = toSVG(0, -GRID_SIZE);
                    lineEnd = toSVG(0, GRID_SIZE);
                  } else if (reflectionAxis === 'x=') {
                    lineStart = toSVG(reflectionValue, -GRID_SIZE);
                    lineEnd = toSVG(reflectionValue, GRID_SIZE);
                  } else if (reflectionAxis === 'y=') {
                    lineStart = toSVG(-GRID_SIZE, reflectionValue);
                    lineEnd = toSVG(GRID_SIZE, reflectionValue);
                  }
                  return (
                    <line 
                      x1={lineStart.x} 
                      y1={lineStart.y} 
                      x2={lineEnd.x} 
                      y2={lineEnd.y}
                      stroke="#8b5cf6" 
                      strokeWidth="3" 
                      strokeDasharray="8,4" 
                    />
                  );
                })()}
              </>
            )}

            {/* Draggable point P - show when animation is not playing */}
            {progress === 0 && !isPlaying && (
              <DraggablePoint
                point={demoPoint}
                onDragStart={handleDragStart}
                isDragging={isDragging}
                label={label}
              />
            )}
            
            {/* Animation components - show when animation has started */}
            {(progress > 0 || isPlaying) && transformType === 'translation' && (
              <AnimatedPoint
                from={demoPoint}
                to={getTargetPoint()}
                label={label}
                labelPrime={labelPrime}
                progress={progress}
                showPath={true}
              />
            )}
            {(progress > 0 || isPlaying) && transformType === 'rotation' && (
              <RotationPoint
                from={demoPoint}
                angle={rotationAngle}
                label={label}
                labelPrime={labelPrime}
                progress={progress}
                clockwise={rotationClockwise}
              />
            )}
            {(progress > 0 || isPlaying) && transformType === 'reflection' && (
              <ReflectionPoint
                from={demoPoint}
                axis={reflectionAxis}
                axisValue={reflectionValue}
                label={label}
                labelPrime={labelPrime}
                progress={progress}
              />
            )}
          </CoordinateGrid>

          {/* Drag instruction */}
          <div className="text-center text-sm text-gray-500 mt-2">
            💡 拖拽點 P 到任意格點位置
          </div>

          {/* Play Controls */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={18} /> 播放動畫
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
            >
              <RotateCcw size={18} /> 重置
            </button>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
          <h3 className="font-bold text-gray-700 mb-3">調整參數</h3>

          {transformType === 'translation' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  水平移動: {translationDelta.dx > 0 ? `向右平移 ${translationDelta.dx} 單位` : translationDelta.dx < 0 ? `向左平移 ${Math.abs(translationDelta.dx)} 單位` : '沒有移動'}
                </label>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={translationDelta.dx}
                  onChange={(e) => {
                    setTranslationDelta({ ...translationDelta, dx: parseInt(e.target.value) });
                    setProgress(0);
                    setIsPlaying(false);
                  }}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  垂直移動: {translationDelta.dy > 0 ? `向上平移 ${translationDelta.dy} 單位` : translationDelta.dy < 0 ? `向下平移 ${Math.abs(translationDelta.dy)} 單位` : '沒有移動'}
                </label>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={translationDelta.dy}
                  onChange={(e) => {
                    setTranslationDelta({ ...translationDelta, dy: parseInt(e.target.value) });
                    setProgress(0);
                    setIsPlaying(false);
                  }}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {transformType === 'rotation' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">旋轉方向</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => { 
                      setRotationClockwise(false); 
                      setProgress(0);
                      setIsPlaying(false);
                    }}
                    className={`flex-1 py-2 rounded-lg font-medium ${!rotationClockwise ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  >
                    ↺ 逆時針
                  </button>
                  <button
                    onClick={() => { 
                      setRotationClockwise(true); 
                      setProgress(0);
                      setIsPlaying(false);
                    }}
                    className={`flex-1 py-2 rounded-lg font-medium ${rotationClockwise ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  >
                    ↻ 順時針
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">旋轉角度: {rotationAngle}°</label>
                <div className="flex gap-2">
                  {[90, 180, 270].map(angle => (
                    <button
                      key={angle}
                      onClick={() => { 
                        setRotationAngle(angle); 
                        setProgress(0);
                        setIsPlaying(false);
                      }}
                      className={`flex-1 py-2 rounded-lg font-medium ${rotationAngle === angle ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                    >
                      {angle}°
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {transformType === 'reflection' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">反射軸</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'x', label: 'x 軸' },
                    { id: 'y', label: 'y 軸' },
                    { id: 'x=', label: 'x = k' },
                    { id: 'y=', label: 'y = k' }
                  ].map(axis => (
                    <button
                      key={axis.id}
                      onClick={() => {
                        setReflectionAxis(axis.id);
                        setProgress(0);
                        setIsPlaying(false);
                      }}
                      className={`py-2 rounded-lg font-medium ${reflectionAxis === axis.id ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                    >
                      {axis.label}
                    </button>
                  ))}
                </div>
              </div>
              {(reflectionAxis === 'x=' || reflectionAxis === 'y=') && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    {reflectionAxis === 'x=' ? 'x' : 'y'} = {reflectionValue}
                  </label>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={reflectionValue}
                    onChange={(e) => {
                      setReflectionValue(parseInt(e.target.value));
                      setProgress(0);
                      setIsPlaying(false);
                    }}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
            <h4 className="font-bold text-blue-800 mb-2">題目描述</h4>
            <p className="text-blue-700">{getTransformDescription()}</p>
          </div>

          {/* Formula Card */}
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <h4 className="font-bold text-amber-800 mb-2">教學</h4>
            {transformType === 'translation' && (
              <div className="text-amber-700 font-mono text-sm space-y-1">
                <p>x 坐標左右移，y 坐標上下移</p>
                <p>向上/向右加 (+)</p>
                <p>向下/向左減 (-)</p>
              </div>
            )}
            {transformType === 'rotation' && (
              <div className="text-amber-700 font-mono text-sm space-y-2">
                <p>每移 90° (x, y) 數字調轉，正負睇象限。</p>
                {progress === 1 && (
                  <div className="mt-4 pt-4 border-t border-amber-200 space-y-2">
                    <p className="font-bold">步驟說明：</p>
                    <p>步驟1: 每旋轉90°，(x, y) 數字調轉，所以轉{rotationAngle}°會數字調轉{rotationAngle / 90}次，結果為({getTargetPoint().x}, {getTargetPoint().y})</p>
                    <p>步驟2: 每旋轉90°，會移過一個象限。留意P' 的象限 x坐標為{getTargetPoint().x >= 0 ? '+ve' : '-ve'}，y坐標為{getTargetPoint().y >= 0 ? '+ve' : '-ve'}。所以結果為({getTargetPoint().x}, {getTargetPoint().y})</p>
                  </div>
                )}
              </div>
            )}
            {transformType === 'reflection' && (
              <div className="text-amber-700 font-mono text-sm space-y-1">
                <p>對 x 軸反射 → 上下反轉 → y轉正負號</p>
                <p>對 y 軸反射 → 左右反轉 → x轉正負號</p>
                <hr className="border-amber-200 my-2"/>
                <p>對 x = k 反射：即 x 的數值改變</p>
                <p className="pl-4">x 向右移到 k，再向右移相同距離</p>
                <hr className="border-amber-200 my-2"/>
                <p>對 y = k 反射：即 y 的數值改變</p>
                <p className="pl-4">y 向上移到 k，再向上移相同距離</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Go to Quiz Button */}
      <div className="text-center">
        <button
          onClick={onGoToQuiz}
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-transform hover:scale-105"
        >
          開始測驗 <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// ============= QUIZ PAGE =============
const QuizPage = ({ score, setScore, onGoToLearn }) => {
  const [enabledTypes, setEnabledTypes] = useState({
    translation: true,
    rotation: true,
    reflection: true
  });
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState({ x: '', y: '' });
  const [feedback, setFeedback] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const animRef = useRef(null);

  // Generate a random question
  const generateQuestion = useCallback(() => {
    const availableTypes = Object.entries(enabledTypes)
      .filter(([_, enabled]) => enabled)
      .map(([type]) => type);
    
    if (availableTypes.length === 0) {
      return null;
    }

    const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    const labels = ['A', 'B', 'C', 'P', 'Q', 'R', 'S', 'T'];
    const label = labels[Math.floor(Math.random() * labels.length)];
    
    // Generate point within valid range for transformation
    let from, to, description, explanation;
    
    // Helper function to generate rotation steps
    const generateRotationSteps = (fromPoint, angle, clockwise, toPoint) => {
      const direction = clockwise ? '順時針' : '逆時針';
      const rotationTimes = angle / 90;
      
      // Normalize -0 to 0
      const normalizedX = toPoint.x === 0 ? 0 : toPoint.x;
      const normalizedY = toPoint.y === 0 ? 0 : toPoint.y;
      
      // Step 1: Count rotations
      let step1 = `步驟1: 每旋轉90°，(x, y) 數字調轉，所以轉${angle}°會數字調轉${rotationTimes}次，結果為(${normalizedX}, ${normalizedY})`;
      
      // Step 2: Determine quadrant and signs
      let quadrant = '';
      let xSign = normalizedX > 0 ? '+ve' : normalizedX < 0 ? '-ve' : '0';
      let ySign = normalizedY > 0 ? '+ve' : normalizedY < 0 ? '-ve' : '0';
      
      if (normalizedX > 0 && normalizedY > 0) quadrant = '第一';
      else if (normalizedX < 0 && normalizedY > 0) quadrant = '第二';
      else if (normalizedX < 0 && normalizedY < 0) quadrant = '第三';
      else if (normalizedX > 0 && normalizedY < 0) quadrant = '第四';
      else if (normalizedX === 0 && normalizedY > 0) quadrant = '正y軸上';
      else if (normalizedX === 0 && normalizedY < 0) quadrant = '負y軸上';
      else if (normalizedY === 0 && normalizedX > 0) quadrant = '正x軸上';
      else if (normalizedY === 0 && normalizedX < 0) quadrant = '負x軸上';
      else quadrant = '原點';
      
      let step2 = `步驟2: 每旋轉90°，會移過一個象限。留意P' 在${quadrant}，x坐標為${xSign}，y坐標為${ySign}。所以結果為(${normalizedX}, ${normalizedY})`;
      
      return `${step1}\n${step2}`;
    };
    
    if (type === 'translation') {
      const dx = Math.floor(Math.random() * 9) - 4; // -4 to 4
      const dy = Math.floor(Math.random() * 9) - 4;
      if (dx === 0 && dy === 0) return generateQuestion(); // Regenerate if no movement
      
      // Ensure result is within range
      const maxX = 7 - Math.max(0, dx);
      const minX = -7 - Math.min(0, dx);
      const maxY = 7 - Math.max(0, dy);
      const minY = -7 - Math.min(0, dy);
      
      from = {
        x: Math.floor(Math.random() * (maxX - minX + 1)) + minX,
        y: Math.floor(Math.random() * (maxY - minY + 1)) + minY
      };
      to = { x: from.x + dx, y: from.y + dy };
      
      const dirs = [];
      if (dx > 0) dirs.push(`向右平移 ${dx} 單位`);
      if (dx < 0) dirs.push(`向左平移 ${Math.abs(dx)} 單位`);
      if (dy > 0) dirs.push(`向上平移 ${dy} 單位`);
      if (dy < 0) dirs.push(`向下平移 ${Math.abs(dy)} 單位`);
      description = `${label}(${from.x}, ${from.y}) ${dirs.join('，然後')}至 ${label}'。求 ${label}' 的坐標。`;
      
      // Build step-by-step explanation
      let explainSteps = [];
      if (dx !== 0) {
        const midX = from.x + dx;
        explainSteps.push(`先${dirs[0]}：(${from.x}, ${from.y}) → (${midX}, ${from.y})`);
      }
      if (dy !== 0) {
        const startPoint = dx !== 0 ? `(${from.x + dx}, ${from.y})` : `(${from.x}, ${from.y})`;
        const dyDir = dirs.length > 1 ? dirs[1] : dirs[0];
        explainSteps.push(`${dx !== 0 ? '然後' : ''}${dyDir}：${startPoint} → (${to.x}, ${to.y})`);
      }
      explanation = explainSteps.join('\n');
      
      return { type, from, to, label, description, explanation, dx, dy };
    }
    
    if (type === 'rotation') {
      const angles = [90, 180, 270];
      const angle = angles[Math.floor(Math.random() * angles.length)];
      const clockwise = Math.random() < 0.5;
      
      // Generate point, ensure result within range
      const maxCoord = 5; // Keep smaller to ensure result fits
      from = {
        x: Math.floor(Math.random() * (maxCoord * 2 + 1)) - maxCoord,
        y: Math.floor(Math.random() * (maxCoord * 2 + 1)) - maxCoord
      };
      if (from.x === 0 && from.y === 0) return generateQuestion();
      
      const angleRad = (clockwise ? -1 : 1) * (angle * Math.PI / 180);
      to = {
        x: Math.round(from.x * Math.cos(angleRad) - from.y * Math.sin(angleRad)),
        y: Math.round(from.x * Math.sin(angleRad) + from.y * Math.cos(angleRad))
      };
      
      // Check if result is in range
      if (Math.abs(to.x) > 7 || Math.abs(to.y) > 7) return generateQuestion();
      
      const direction = clockwise ? '順時針' : '逆時針';
      const sentenceType = Math.random() < 0.5 ? 1 : 2;
      if (sentenceType === 1) {
        description = `${label}(${from.x}, ${from.y}) 繞 O ${direction}方向旋轉 ${angle}° 至 ${label}'，其中 O 為原點。求 ${label}' 的坐標。`;
      } else {
        description = `${label}(${from.x}, ${from.y}) 繞原點${direction}方向旋轉 ${angle}° 至 ${label}'。求 ${label}' 的坐標。`;
      }
      
      let formula = '';
      // Normalize -0 to 0 for display
      const normalizeZero = (val) => val === 0 ? 0 : val;
      
      if (!clockwise) {
        if (angle === 90) formula = `(x, y) → (-y, x)\n(${from.x}, ${from.y}) → (${normalizeZero(-from.y)}, ${normalizeZero(from.x)})`;
        else if (angle === 180) formula = `(x, y) → (-x, -y)\n(${from.x}, ${from.y}) → (${normalizeZero(-from.x)}, ${normalizeZero(-from.y)})`;
        else if (angle === 270) formula = `(x, y) → (y, -x)\n(${from.x}, ${from.y}) → (${normalizeZero(from.y)}, ${normalizeZero(-from.x)})`;
      } else {
        if (angle === 90) formula = `(x, y) → (y, -x)\n(${from.x}, ${from.y}) → (${normalizeZero(from.y)}, ${normalizeZero(-from.x)})`;
        else if (angle === 180) formula = `(x, y) → (-x, -y)\n(${from.x}, ${from.y}) → (${normalizeZero(-from.x)}, ${normalizeZero(-from.y)})`;
        else if (angle === 270) formula = `(x, y) → (-y, x)\n(${from.x}, ${from.y}) → (${normalizeZero(-from.y)}, ${normalizeZero(from.x)})`;
      }
      explanation = `繞原點${direction}旋轉 ${angle}°：\n${formula} = (${normalizeZero(to.x)}, ${normalizeZero(to.y)})`;
      
      // Generate rotation steps explanation
      const rotationSteps = generateRotationSteps(from, angle, clockwise, to);
      
      return { type, from, to, label, description, explanation, angle, clockwise, rotationSteps };
    }
    
    if (type === 'reflection') {
      const axes = ['x', 'y', 'x=', 'y='];
      const axis = axes[Math.floor(Math.random() * axes.length)];
      let axisValue = 0;
      
      if (axis === 'x=' || axis === 'y=') {
        axisValue = Math.floor(Math.random() * 7) - 3; // -3 to 3
      }
      
      // Generate point within range
      const maxCoord = 5;
      from = {
        x: Math.floor(Math.random() * (maxCoord * 2 + 1)) - maxCoord,
        y: Math.floor(Math.random() * (maxCoord * 2 + 1)) - maxCoord
      };
      
      if (axis === 'x') {
        to = { x: from.x, y: -from.y };
      } else if (axis === 'y') {
        to = { x: -from.x, y: from.y };
      } else if (axis === 'x=') {
        to = { x: 2 * axisValue - from.x, y: from.y };
      } else {
        to = { x: from.x, y: 2 * axisValue - from.y };
      }
      
      // Check if result is in range
      if (Math.abs(to.x) > 7 || Math.abs(to.y) > 7) return generateQuestion();
      
      let axisStr = '';
      if (axis === 'x') axisStr = 'x 軸';
      else if (axis === 'y') axisStr = 'y 軸';
      else if (axis === 'x=') axisStr = `直線 x = ${axisValue}`;
      else axisStr = `直線 y = ${axisValue}`;
      
      // Generate description
      description = `${label}(${from.x}, ${from.y}) 對 ${axisStr} 作反射至點 ${label}'。求 ${label}' 的坐標。`;
      
      // Normalize -0 to 0 for display
      const normalizeZero = (val) => val === 0 ? 0 : val;
      
      let formula = '';
      if (axis === 'x') {
        formula = `對 x 軸反射: (x, y) → (x, -y)\n(${from.x}, ${from.y}) → (${normalizeZero(from.x)}, ${normalizeZero(-from.y)})`;
      } else if (axis === 'y') {
        formula = `對 y 軸反射: (x, y) → (-x, y)\n(${from.x}, ${from.y}) → (${normalizeZero(-from.x)}, ${normalizeZero(from.y)})`;
      } else if (axis === 'x=') {
        formula = `對 x = ${axisValue} 反射: (x, y) → (2×${axisValue} - x, y)\n(${from.x}, ${from.y}) → (${normalizeZero(2*axisValue - from.x)}, ${from.y}) = (${normalizeZero(to.x)}, ${normalizeZero(to.y)})`;
      } else {
        formula = `對 y = ${axisValue} 反射: (x, y) → (x, 2×${axisValue} - y)\n(${from.x}, ${from.y}) → (${from.x}, ${normalizeZero(2*axisValue - from.y)}) = (${normalizeZero(to.x)}, ${normalizeZero(to.y)})`;
      }
      explanation = formula;
      
      return { type, from, to, label, description, explanation, axis, axisValue };
    }
    
    return null;
  }, [enabledTypes]);

  // Load first question
  useEffect(() => {
    const q = generateQuestion();
    setQuestion(q);
  }, []);

  // Animation effect for showing answer
  useEffect(() => {
    if (showAnimation) {
      const startTime = Date.now();
      const duration = 1500;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(elapsed / duration, 1);
        setAnimProgress(newProgress);

        if (newProgress < 1) {
          animRef.current = requestAnimationFrame(animate);
        }
      };

      animRef.current = requestAnimationFrame(animate);

      return () => {
        if (animRef.current) {
          cancelAnimationFrame(animRef.current);
        }
      };
    }
  }, [showAnimation]);

  const handleSubmit = () => {
    if (!question) return;
    
    const userX = parseInt(answer.x);
    const userY = parseInt(answer.y);
    const correct = userX === question.to.x && userY === question.to.y;

    if (correct) {
      setScore(s => s + 1);
      setFeedback({ type: 'correct', message: '答對了！' });
    } else {
      const rotationSteps = question.rotationSteps ? `\n\n${question.rotationSteps}` : '';
      setFeedback({ 
        type: 'wrong', 
        message: `答錯了！正確答案是 (${question.to.x}, ${question.to.y})`,
        explanation: question.explanation + rotationSteps
      });
    }
    setShowAnimation(true);
    setAnimProgress(0);
  };

  const handleNext = () => {
    const q = generateQuestion();
    setQuestion(q);
    setAnswer({ x: '', y: '' });
    setFeedback(null);
    setShowAnimation(false);
    setAnimProgress(0);
  };

  const toggleType = (type) => {
    const newEnabled = { ...enabledTypes, [type]: !enabledTypes[type] };
    // Ensure at least one is enabled
    if (Object.values(newEnabled).some(v => v)) {
      setEnabledTypes(newEnabled);
    }
  };

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-gray-600">請至少選擇一種題目類型</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header with Score */}
      <div className="flex justify-between items-center">
        <button
          onClick={onGoToLearn}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <BookOpen size={20} />
          <span>返回教學</span>
        </button>
        <div className="bg-yellow-100 text-yellow-800 font-bold px-6 py-2 rounded-full">
          分數: {score}
        </div>
      </div>

      {/* Type Selection */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h3 className="font-bold text-gray-700 mb-3">選擇題目類型</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { id: 'translation', label: '平移' },
            { id: 'rotation', label: '旋轉' },
            { id: 'reflection', label: '反射' }
          ].map(type => (
            <label key={type.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enabledTypes[type.id]}
                onChange={() => toggleType(type.id)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-medium">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Question and SVG */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase">Question</span>
              <button onClick={handleNext} className="text-gray-400 hover:text-blue-600">
                <RefreshCw size={20} />
              </button>
            </div>
            <p className="text-lg text-gray-800 leading-relaxed">{question.description}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <CoordinateGrid>
              {question.type === 'translation' && (
                <AnimatedPoint
                  from={question.from}
                  to={question.to}
                  label={question.label}
                  labelPrime={`${question.label}'`}
                  progress={showAnimation ? animProgress : 0}
                  showPath={true}
                />
              )}
              {question.type === 'rotation' && (
                <RotationPoint
                  from={question.from}
                  angle={question.angle}
                  label={question.label}
                  labelPrime={`${question.label}'`}
                  progress={showAnimation ? animProgress : 0}
                  clockwise={question.clockwise}
                />
              )}
              {question.type === 'reflection' && (
                <ReflectionPoint
                  from={question.from}
                  axis={question.axis}
                  axisValue={question.axisValue || 0}
                  label={question.label}
                  labelPrime={`${question.label}'`}
                  progress={showAnimation ? animProgress : 0}
                />
              )}
            </CoordinateGrid>
          </div>
        </div>

        {/* Answer Input */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-bold text-gray-700 mb-4 text-center">
            輸入 {question.label}' 的坐標
          </h3>

          <CoordinateInput
            value={answer}
            onChange={setAnswer}
            onSubmit={handleSubmit}
            disabled={feedback !== null}
          />

          {/* Feedback */}
          {feedback && (
            <div className={`mt-6 p-4 rounded-xl ${
              feedback.type === 'correct' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {feedback.type === 'correct' ? (
                  <CheckCircle className="text-green-600" size={24} />
                ) : (
                  <XCircle className="text-red-600" size={24} />
                )}
                <span className={`font-bold ${feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                  {feedback.message}
                </span>
              </div>
              {feedback.explanation && (
                <div className="mt-3 p-3 bg-white rounded-lg text-sm text-gray-700 whitespace-pre-line font-mono">
                  {feedback.explanation}
                </div>
              )}
            </div>
          )}

          {/* Next Button */}
          {feedback && (
            <button
              onClick={handleNext}
              className="w-full mt-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              下一題 <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============= MAIN APP =============
const CoordinateTransform = () => {
  const [page, setPage] = useState('learn'); // 'learn' or 'quiz'
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <HomeIcon className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">返回主頁</span>
            </Link>
            <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
              <Target className="w-6 h-6" />
              <span>坐標轉換</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage('learn')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  page === 'learn' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                教學
              </button>
              <button
                onClick={() => setPage('quiz')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  page === 'quiz' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                測驗
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-10">
        {page === 'learn' ? (
          <TeachingPage onGoToQuiz={() => setPage('quiz')} />
        ) : (
          <QuizPage 
            score={score} 
            setScore={setScore}
            onGoToLearn={() => setPage('learn')}
          />
        )}
      </main>
    </div>
  );
};

export default CoordinateTransform;
