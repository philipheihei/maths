import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Trophy, HelpCircle, CheckCircle, XCircle, ChevronRight, ArrowRight, Check, BarChart3, Table, GitBranch, Lightbulb } from 'lucide-react';

// --- KaTeX Loader ---
const useKatex = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (window.katex) { setIsLoaded(true); return; }
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);
  }, []);
  return isLoaded;
};

const Latex = ({ children, block = false, className = '' }) => {
  const containerRef = useRef(null);
  const isKatexLoaded = useKatex();
  useEffect(() => {
    if (isKatexLoaded && containerRef.current && children) {
      try {
        window.katex.render(children, containerRef.current, { throwOnError: false, displayMode: block });
      } catch (e) { containerRef.current.innerText = children; }
    }
  }, [children, isKatexLoaded, block]);
  if (!children) return <span className="text-gray-300 italic">...</span>;
  if (!isKatexLoaded) return <span className="font-serif animate-pulse">{children}</span>;
  return <span ref={containerRef} className={className} />;
};

// --- 統計計算函數 ---
const calculateStats = (data) => {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  
  // 平均數
  const mean = data.reduce((a, b) => a + b, 0) / n;
  
  // 中位數
  const median = n % 2 === 0 
    ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
    : sorted[Math.floor(n/2)];
  
  // 眾數
  const freq = {};
  data.forEach(x => freq[x] = (freq[x] || 0) + 1);
  const maxFreq = Math.max(...Object.values(freq));
  const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);
  const mode = modes.length === data.length ? null : modes; // 無眾數情況
  
  // 方差與標準差
  const variance = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  
  // 四分位數
  const getQuartile = (arr, q) => {
    const pos = (arr.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (arr[base + 1] !== undefined) {
      return arr[base] + rest * (arr[base + 1] - arr[base]);
    } else {
      return arr[base];
    }
  };
  
  const q1 = getQuartile(sorted, 0.25);
  const q3 = getQuartile(sorted, 0.75);
  const iqr = q3 - q1;
  
  // 分佈域 (Range)
  const range = sorted[n - 1] - sorted[0];
  const min = sorted[0];
  const max = sorted[n - 1];
  
  return { mean, median, mode, variance, stdDev, q1, q3, iqr, range, min, max, sorted };
};

// --- 數據生成器 ---
const generateData = (type) => {
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  switch(type) {
    case 'boxplot':
      // 生成10-15個數據，範圍適中
      const boxData = [];
      const boxBase = getRandomInt(20, 50);
      for (let i = 0; i < getRandomInt(10, 15); i++) {
        boxData.push(boxBase + getRandomInt(-15, 25));
      }
      return boxData;
    case 'stemleaf':
      // 生成8-12個兩位數
      const stemData = [];
      const stemBase = getRandomInt(3, 7) * 10;
      for (let i = 0; i < getRandomInt(8, 12); i++) {
        stemData.push(stemBase + getRandomInt(-15, 20));
      }
      return stemData.filter(x => x >= 10 && x <= 99);
    case 'barchart':
      // 生成頻率數據
      const barData = [];
      const values = [1, 2, 3, 4, 5];
      values.forEach(v => {
        const freq = getRandomInt(1, 6);
        for (let i = 0; i < freq; i++) barData.push(v);
      });
      return barData;
    case 'table':
      // 生成6-10個數據
      const tableData = [];
      for (let i = 0; i < getRandomInt(6, 10); i++) {
        tableData.push(getRandomInt(10, 50));
      }
      return tableData;
    default:
      return [10, 20, 30, 40, 50];
  }
};

// --- 圖表組件 ---

// 框線圖 (Box Plot)
const BoxPlot = ({ data, showAnimation, highlightPart }) => {
  const stats = calculateStats(data);
  const { min, max, q1, median, q3 } = stats;
  
  const width = 320;
  const height = 120;
  const padding = 40;
  const plotWidth = width - 2 * padding;
  
  const scale = (val) => padding + ((val - min) / (max - min)) * plotWidth;
  
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md mx-auto">
      {/* 軸線 */}
      <line x1={padding} y1={80} x2={width - padding} y2={80} stroke="#cbd5e1" strokeWidth="1" />
      
      {/* 刻度 */}
      {[min, q1, median, q3, max].map((val, i) => (
        <g key={i}>
          <line x1={scale(val)} y1={78} x2={scale(val)} y2={82} stroke="#64748b" strokeWidth="1" />
          <text x={scale(val)} y={95} textAnchor="middle" className="text-xs fill-slate-600">{val.toFixed(1)}</text>
        </g>
      ))}
      
      {/* 鬚線 */}
      <line x1={scale(min)} y1={50} x2={scale(q1)} y2={50} stroke="#6366f1" strokeWidth="2" 
        className={highlightPart === 'range' ? 'animate-pulse' : ''} />
      <line x1={scale(q3)} y1={50} x2={scale(max)} y2={50} stroke="#6366f1" strokeWidth="2"
        className={highlightPart === 'range' ? 'animate-pulse' : ''} />
      
      {/* 端點 */}
      <line x1={scale(min)} y1={40} x2={scale(min)} y2={60} stroke="#6366f1" strokeWidth="2" />
      <line x1={scale(max)} y1={40} x2={scale(max)} y2={60} stroke="#6366f1" strokeWidth="2" />
      
      {/* 箱體 */}
      <rect 
        x={scale(q1)} y={30} 
        width={scale(q3) - scale(q1)} height={40} 
        fill={highlightPart === 'iqr' ? '#c7d2fe' : '#e0e7ff'} 
        stroke="#6366f1" strokeWidth="2"
        className={highlightPart === 'iqr' ? 'animate-pulse' : ''}
      />
      
      {/* 中位數線 */}
      <line 
        x1={scale(median)} y1={30} x2={scale(median)} y2={70} 
        stroke={highlightPart === 'median' ? '#dc2626' : '#4f46e5'} 
        strokeWidth="3"
        className={highlightPart === 'median' ? 'animate-pulse' : ''}
      />
      
      {/* 標籤 */}
      <text x={scale(min)} y={22} textAnchor="middle" className="text-xs fill-slate-500">最小值</text>
      <text x={scale(q1)} y={22} textAnchor="middle" className="text-xs fill-slate-500">Q₁</text>
      <text x={scale(median)} y={22} textAnchor="middle" className="text-xs fill-indigo-600 font-bold">中位數</text>
      <text x={scale(q3)} y={22} textAnchor="middle" className="text-xs fill-slate-500">Q₃</text>
      <text x={scale(max)} y={22} textAnchor="middle" className="text-xs fill-slate-500">最大值</text>
    </svg>
  );
};

// 幹葉圖 (Stem-and-Leaf)
const StemLeafPlot = ({ data, highlightPart }) => {
  const sorted = [...data].sort((a, b) => a - b);
  const stems = {};
  
  sorted.forEach(val => {
    const stem = Math.floor(val / 10);
    const leaf = val % 10;
    if (!stems[stem]) stems[stem] = [];
    stems[stem].push(leaf);
  });
  
  const stemKeys = Object.keys(stems).map(Number).sort((a, b) => a - b);
  
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 max-w-xs mx-auto">
      <div className="text-xs text-slate-500 mb-2 text-center">幹 | 葉</div>
      <div className="font-mono text-sm space-y-1">
        {stemKeys.map(stem => (
          <div key={stem} className="flex">
            <span className="w-8 text-right pr-2 border-r-2 border-slate-300 text-slate-600 font-bold">{stem}</span>
            <span className="pl-2 text-indigo-600">{stems[stem].join(' ')}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-slate-400 mt-3 text-center">例: 3|5 = 35</div>
    </div>
  );
};

// 棒型圖 (Bar Chart)
const BarChart = ({ data, highlightPart }) => {
  const freq = {};
  data.forEach(x => freq[x] = (freq[x] || 0) + 1);
  const values = Object.keys(freq).map(Number).sort((a, b) => a - b);
  const maxFreq = Math.max(...Object.values(freq));
  
  const width = 300;
  const height = 160;
  const barWidth = 40;
  const gap = 10;
  
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-sm mx-auto">
      {/* Y軸 */}
      <line x1={40} y1={20} x2={40} y2={130} stroke="#cbd5e1" strokeWidth="1" />
      {/* X軸 */}
      <line x1={40} y1={130} x2={width - 20} y2={130} stroke="#cbd5e1" strokeWidth="1" />
      
      {/* Y軸刻度 */}
      {[0, Math.ceil(maxFreq/2), maxFreq].map((v, i) => (
        <g key={i}>
          <text x={35} y={130 - (v / maxFreq) * 100} textAnchor="end" className="text-xs fill-slate-500">{v}</text>
          <line x1={38} y1={130 - (v / maxFreq) * 100} x2={40} y2={130 - (v / maxFreq) * 100} stroke="#64748b" />
        </g>
      ))}
      
      {/* 柱狀 */}
      {values.map((val, i) => {
        const barHeight = (freq[val] / maxFreq) * 100;
        const x = 50 + i * (barWidth + gap);
        return (
          <g key={val}>
            <rect 
              x={x} y={130 - barHeight} 
              width={barWidth} height={barHeight}
              fill="#818cf8" 
              className="hover:fill-indigo-500 transition-colors"
            />
            <text x={x + barWidth/2} y={145} textAnchor="middle" className="text-xs fill-slate-600">{val}</text>
            <text x={x + barWidth/2} y={125 - barHeight} textAnchor="middle" className="text-xs fill-slate-700 font-bold">{freq[val]}</text>
          </g>
        );
      })}
      
      {/* 標籤 */}
      <text x={width/2} y={158} textAnchor="middle" className="text-xs fill-slate-500">數值</text>
      <text x={12} y={75} textAnchor="middle" className="text-xs fill-slate-500" transform="rotate(-90, 12, 75)">頻率</text>
    </svg>
  );
};

// 表格顯示
const DataTable = ({ data }) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 max-w-md mx-auto overflow-x-auto">
      <table className="w-full text-center">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="py-2 px-3 text-xs text-slate-500">序號</th>
            {data.map((_, i) => (
              <th key={i} className="py-2 px-3 text-xs text-slate-500">{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-3 text-sm text-slate-600 font-medium">數值</td>
            {data.map((val, i) => (
              <td key={i} className="py-2 px-3 text-lg font-bold text-indigo-600">{val}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// --- 統計量定義 ---
const STAT_TYPES = {
  mean: { name: '平均數', symbol: '\\bar{x}', availableIn: ['stemleaf', 'barchart', 'table'] },
  median: { name: '中位數', symbol: 'M', availableIn: ['boxplot', 'stemleaf', 'barchart', 'table'] },
  mode: { name: '眾數', symbol: 'Mo', availableIn: ['stemleaf', 'barchart', 'table'] },
  stdDev: { name: '標準差', symbol: '\\sigma', availableIn: ['stemleaf', 'barchart', 'table'] },
  variance: { name: '方差', symbol: '\\sigma^2', availableIn: ['stemleaf', 'barchart', 'table'] },
  iqr: { name: '四分位數間距', symbol: 'IQR', availableIn: ['boxplot', 'stemleaf', 'barchart', 'table'] },
  range: { name: '分佈域', symbol: 'R', availableIn: ['boxplot', 'stemleaf', 'barchart', 'table'] },
};

const CHART_TYPES = {
  boxplot: { name: '框線圖', icon: '📊', stats: ['median', 'iqr', 'range'] },
  stemleaf: { name: '幹葉圖', icon: '🌿', stats: ['mean', 'median', 'mode', 'stdDev', 'variance', 'iqr', 'range'] },
  barchart: { name: '棒型圖', icon: '📶', stats: ['mean', 'median', 'mode', 'stdDev', 'variance', 'iqr', 'range'] },
  table: { name: '表格', icon: '📋', stats: ['mean', 'median', 'mode', 'stdDev', 'variance', 'iqr', 'range'] },
};

// --- 提示內容 ---
const getHint = (statType) => {
  const hints = {
    mean: {
      formula: '\\bar{x} = \\frac{\\sum x_i}{n}',
      steps: ['1. 將所有數據加總', '2. 除以數據個數 n'],
    },
    median: {
      formula: 'M = \\text{排序後中間位置的數}',
      steps: ['1. 將數據由小到大排序', '2. 若 n 為奇數：中位數 = 第 (n+1)/2 個數', '3. 若 n 為偶數：中位數 = 第 n/2 和 n/2+1 個數的平均'],
    },
    mode: {
      formula: 'Mo = \\text{出現次數最多的數}',
      steps: ['1. 數出每個數值出現的次數', '2. 找出出現最多次的數值', '3. 可能有多個眾數，或無眾數'],
    },
    variance: {
      formula: '\\sigma^2 = \\frac{\\sum(x_i - \\bar{x})^2}{n}',
      steps: ['1. 先計算平均數 x̄', '2. 每個數據減去平均數', '3. 將差值平方後加總', '4. 除以數據個數 n'],
    },
    stdDev: {
      formula: '\\sigma = \\sqrt{\\frac{\\sum(x_i - \\bar{x})^2}{n}}',
      steps: ['1. 先計算方差 σ²', '2. 將方差開根號'],
    },
    iqr: {
      formula: 'IQR = Q_3 - Q_1',
      steps: ['1. 將數據排序', '2. 找出 Q₁（第25百分位數）', '3. 找出 Q₃（第75百分位數）', '4. IQR = Q₃ - Q₁'],
    },
    range: {
      formula: 'R = \\text{最大值} - \\text{最小值}',
      steps: ['1. 找出數據中的最大值', '2. 找出數據中的最小值', '3. 相減得到分佈域'],
    },
  };
  return hints[statType];
};

// --- 計算過程生成 ---
const getSolution = (statType, data, stats) => {
  const n = data.length;
  const sorted = stats.sorted;
  
  switch(statType) {
    case 'mean':
      const sum = data.reduce((a, b) => a + b, 0);
      return {
        formula: `\\bar{x} = \\frac{${data.join(' + ')}}{${n}} = \\frac{${sum}}{${n}} = ${stats.mean.toFixed(2)}`,
        answer: stats.mean.toFixed(2),
      };
    case 'median':
      if (n % 2 === 0) {
        const mid1 = sorted[n/2 - 1];
        const mid2 = sorted[n/2];
        return {
          formula: `\\text{排序: } ${sorted.join(', ')} \\\\ M = \\frac{${mid1} + ${mid2}}{2} = ${stats.median.toFixed(2)}`,
          answer: stats.median.toFixed(2),
        };
      } else {
        return {
          formula: `\\text{排序: } ${sorted.join(', ')} \\\\ M = \\text{第 } ${Math.ceil(n/2)} \\text{ 個} = ${stats.median}`,
          answer: stats.median.toString(),
        };
      }
    case 'mode':
      if (stats.mode === null) {
        return { formula: `\\text{每個數值出現次數相同，無眾數}`, answer: '無眾數' };
      }
      return {
        formula: `Mo = ${stats.mode.join(', ')}`,
        answer: stats.mode.join(', '),
      };
    case 'variance':
      const meanVal = stats.mean;
      const deviations = data.map(x => `(${x} - ${meanVal.toFixed(2)})^2`).join(' + ');
      return {
        formula: `\\sigma^2 = \\frac{${deviations}}{${n}} = ${stats.variance.toFixed(2)}`,
        answer: stats.variance.toFixed(2),
      };
    case 'stdDev':
      return {
        formula: `\\sigma = \\sqrt{${stats.variance.toFixed(2)}} = ${stats.stdDev.toFixed(2)}`,
        answer: stats.stdDev.toFixed(2),
      };
    case 'iqr':
      return {
        formula: `IQR = Q_3 - Q_1 = ${stats.q3.toFixed(2)} - ${stats.q1.toFixed(2)} = ${stats.iqr.toFixed(2)}`,
        answer: stats.iqr.toFixed(2),
      };
    case 'range':
      return {
        formula: `R = ${stats.max} - ${stats.min} = ${stats.range}`,
        answer: stats.range.toString(),
      };
    default:
      return { formula: '', answer: '' };
  }
};

// --- 主組件 ---
export default function DispersionQuiz() {
  const [chartType, setChartType] = useState(null); // 當前選擇的圖表類型
  const [currentStat, setCurrentStat] = useState(null); // 當前練習的統計量
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState('select'); // 'select' | 'learn' | 'quiz'
  const [learnStep, setLearnStep] = useState(0);

  // 選擇圖表類型
  const selectChartType = (type) => {
    setChartType(type);
    setMode('learn');
    setLearnStep(0);
    setCurrentStat(CHART_TYPES[type].stats[0]);
    const newData = generateData(type);
    setData(newData);
    setStats(calculateStats(newData));
  };

  // 開始測驗
  const startQuiz = (statType) => {
    setMode('quiz');
    setCurrentStat(statType);
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
    const newData = generateData(chartType);
    setData(newData);
    setStats(calculateStats(newData));
  };

  // 檢查答案
  const checkAnswer = () => {
    const solution = getSolution(currentStat, data, stats);
    const userVal = parseFloat(userAnswer);
    const correctVal = parseFloat(solution.answer);
    
    let isCorrect = false;
    if (currentStat === 'mode') {
      // 眾數特殊處理
      const userModes = userAnswer.split(',').map(s => s.trim());
      if (stats.mode === null && userAnswer.includes('無')) {
        isCorrect = true;
      } else if (stats.mode) {
        isCorrect = stats.mode.every(m => userModes.includes(m.toString())) && 
                   userModes.every(u => stats.mode.includes(parseInt(u)));
      }
    } else {
      isCorrect = Math.abs(userVal - correctVal) < 0.1;
    }
    
    if (isCorrect) {
      setFeedback({ correct: true, solution });
      setScore(s => s + 1);
    } else {
      setFeedback({ correct: false, solution });
    }
  };

  // 下一題
  const nextQuestion = () => {
    const newData = generateData(chartType);
    setData(newData);
    setStats(calculateStats(newData));
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
  };

  // 返回選擇頁面
  const backToSelect = () => {
    setMode('select');
    setChartType(null);
    setCurrentStat(null);
    setFeedback(null);
    setShowHint(false);
  };

  // 渲染圖表
  const renderChart = () => {
    switch(chartType) {
      case 'boxplot':
        return <BoxPlot data={data} highlightPart={currentStat} />;
      case 'stemleaf':
        return <StemLeafPlot data={data} highlightPart={currentStat} />;
      case 'barchart':
        return <BarChart data={data} highlightPart={currentStat} />;
      case 'table':
        return <DataTable data={data} />;
      default:
        return null;
    }
  };

  // 選擇頁面
  if (mode === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <Link to="/" className="p-2 -ml-2 text-slate-400 hover:text-slate-700 flex items-center gap-1">
            <HomeIcon size={20} />
            <span className="text-sm">返回首頁</span>
          </Link>
          <span className="font-bold text-slate-700">統計離差特訓</span>
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
            <Trophy size={16} className="text-yellow-600" />
            <span className="font-bold text-yellow-700">{score}</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">選擇圖表類型</h1>
          <p className="text-center text-slate-500 mb-8">先學習如何從不同圖表中找出各種統計量</p>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(CHART_TYPES).map(([key, chart]) => (
              <button
                key={key}
                onClick={() => selectChartType(key)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 hover:border-indigo-300 hover:-translate-y-1 text-left"
              >
                <div className="text-4xl mb-3">{chart.icon}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{chart.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {chart.stats.map(stat => (
                    <span key={stat} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                      {STAT_TYPES[stat].name}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
              <Lightbulb size={18} /> 統計量速查
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(STAT_TYPES).map(([key, stat]) => (
                <div key={key} className="flex items-center gap-2">
                  <Latex>{stat.symbol}</Latex>
                  <span className="text-slate-600">{stat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 學習/測驗頁面
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button onClick={backToSelect} className="p-2 -ml-2 text-slate-400 hover:text-slate-700 flex items-center gap-1">
          <HomeIcon size={20} />
          <span className="text-sm">選擇圖表</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{CHART_TYPES[chartType].icon}</span>
          <span className="font-bold text-slate-700">{CHART_TYPES[chartType].name}</span>
        </div>
        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
          <Trophy size={16} className="text-yellow-600" />
          <span className="font-bold text-yellow-700">{score}</span>
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full p-4 overflow-y-auto">
        {/* 統計量選擇器 */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {CHART_TYPES[chartType].stats.map(stat => (
            <button
              key={stat}
              onClick={() => startQuiz(stat)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                currentStat === stat 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200'
              }`}
            >
              {STAT_TYPES[stat].name}
            </button>
          ))}
        </div>

        {/* 圖表顯示 */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
          {renderChart()}
        </div>

        {/* 當前統計量信息 */}
        {currentStat && (
          <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-indigo-600">
                  <Latex>{STAT_TYPES[currentStat].symbol}</Latex>
                </span>
                <span className="font-bold text-slate-800">{STAT_TYPES[currentStat].name}</span>
              </div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-amber-500 hover:text-amber-600 flex items-center gap-1 text-sm"
              >
                <HelpCircle size={16} />
                {showHint ? '隱藏提示' : '提示'}
              </button>
            </div>

            {/* 提示 */}
            {showHint && (
              <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-100 animate-in slide-in-from-top-2">
                <div className="text-lg mb-2 text-center">
                  <Latex block>{getHint(currentStat).formula}</Latex>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-sm text-amber-900">
                  {getHint(currentStat).steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* 輸入區 */}
            {mode === 'quiz' && !feedback && (
              <div className="space-y-3">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={currentStat === 'mode' ? '輸入眾數（多個用逗號分隔，或輸入「無眾數」）' : '輸入答案（保留兩位小數）'}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none text-lg text-center"
                />
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer}
                  className={`w-full py-3 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    userAnswer 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <Check size={24} /> 確認答案
                </button>
              </div>
            )}

            {/* 反饋 */}
            {feedback && (
              <div className={`p-4 rounded-xl ${feedback.correct ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
                <div className="flex items-center gap-2 mb-3">
                  {feedback.correct ? (
                    <>
                      <CheckCircle className="text-emerald-600" size={24} />
                      <span className="font-bold text-emerald-800 text-lg">答對了！</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-600" size={24} />
                      <span className="font-bold text-red-800 text-lg">答錯了</span>
                    </>
                  )}
                </div>
                
                <div className="bg-white/60 rounded-lg p-3 mb-3">
                  <div className="text-sm text-slate-600 mb-1">計算過程：</div>
                  <div className="text-center">
                    <Latex block>{feedback.solution.formula}</Latex>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="text-sm text-slate-600">正確答案：</span>
                  <span className="text-xl font-bold text-slate-800 ml-2">{feedback.solution.answer}</span>
                </div>
                
                <button
                  onClick={nextQuestion}
                  className="w-full mt-4 py-3 rounded-xl font-bold bg-slate-800 text-white hover:bg-slate-900 flex items-center justify-center gap-2"
                >
                  下一題 <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 數據列表（非表格時顯示） */}
        {chartType !== 'table' && data.length > 0 && (
          <div className="bg-slate-100 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-500">原始數據：</span>
            <span className="text-sm text-slate-700 ml-2">{data.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
