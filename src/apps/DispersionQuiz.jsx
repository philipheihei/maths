import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  BarChart2, 
  Table, 
  LayoutList, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  RotateCcw,
  Sigma,
  TrendingUp,
  Home as HomeIcon
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
    script.onerror = () => reject(new Error("KaTeX 載入失敗"));
    document.head.appendChild(script);
  });
};

// KaTeX 分數元件
const Fraction = ({ numerator, denominator }) => {
  const [katexLoaded, setKatexLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    loadKatex().then(() => setKatexLoaded(true));
  }, []);

  useEffect(() => {
    if (katexLoaded && containerRef.current && window.katex) {
      try {
        containerRef.current.innerHTML = '';
        const latex = `\\frac{${numerator}}{${denominator}}`;
        window.katex.render(latex, containerRef.current, {
          throwOnError: false,
          displayMode: false
        });
      } catch (e) {
        console.error("KaTeX render error:", e);
      }
    }
  }, [numerator, denominator, katexLoaded]);

  return <div ref={containerRef} className="inline-block text-left text-2xl" />;
};

// KaTeX 單值顯示元件（用於統一答案格式）
const KaTeXValue = ({ value }) => {
  const [katexLoaded, setKatexLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    loadKatex().then(() => setKatexLoaded(true));
  }, []);

  useEffect(() => {
    if (katexLoaded && containerRef.current && window.katex) {
      try {
        containerRef.current.innerHTML = '';
        // 用 text style 确保大小与分数一致
        const latex = `\\textstyle ${String(value)}`;
        window.katex.render(latex, containerRef.current, {
          throwOnError: false,
          displayMode: false
        });
      } catch (e) {
        console.error("KaTeX render error:", e);
      }
    }
  }, [value, katexLoaded]);

  return <div ref={containerRef} className="inline-block text-left text-2xl" />;
};

// 橫向分數顯示元件 (a/b 格式，支援換行)
const HorizontalFraction = ({ numerator, denominator, maxWidth = "100%" }) => {
  const [katexLoaded, setKatexLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    loadKatex().then(() => setKatexLoaded(true));
  }, []);

  useEffect(() => {
    if (katexLoaded && containerRef.current && window.katex) {
      try {
        containerRef.current.innerHTML = '';
        // 使用 \cfrac 或简单的 / 格式，允许分子换行
        const latex = `${numerator} / ${denominator}`;
        window.katex.render(latex, containerRef.current, {
          throwOnError: false,
          displayMode: false
        });
      } catch (e) {
        console.error("KaTeX render error:", e);
      }
    }
  }, [numerator, denominator, katexLoaded]);

  return <div ref={containerRef} className="inline-block text-left text-2xl" style={{ maxWidth }} />;
};

// --- 數學工具函數庫 ---
const MathUtils = {
  sum: (arr) => arr.reduce((a, b) => a + b, 0),
  
  mean: (arr) => {
    return MathUtils.sum(arr) / arr.length;
  },
  
  median: (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 
      ? sorted[mid] 
      : (sorted[mid - 1] + sorted[mid]) / 2;
  },
  
  mode: (arr) => {
    const freq = {};
    let maxFreq = 0;
    arr.forEach(val => {
      freq[val] = (freq[val] || 0) + 1;
      if (freq[val] > maxFreq) maxFreq = freq[val];
    });
    if (maxFreq === 1) return []; // 無眾數
    return Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number).sort((a,b)=>a-b);
  },
  
  range: (arr) => {
    return Math.max(...arr) - Math.min(...arr);
  },
  
  quartiles: (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const q2 = MathUtils.median(sorted);
    const mid = Math.floor(sorted.length / 2);
    
    let lowerHalf = sorted.slice(0, mid);
    let upperHalf = sorted.length % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);
    
    const q1 = MathUtils.median(lowerHalf);
    const q3 = MathUtils.median(upperHalf);
    
    return { q1, q2, q3 };
  },
  
  iqr: (arr) => {
    const { q1, q3 } = MathUtils.quartiles(arr);
    return q3 - q1;
  },
  
  variance: (arr) => {
    const m = MathUtils.mean(arr);
    const sqDiffs = arr.map(v => (v - m) * (v - m));
    return MathUtils.sum(sqDiffs) / arr.length; // Population Variance
  },
  
  stdDev: (arr) => {
    return Math.sqrt(MathUtils.variance(arr));
  }
};

// --- 數據生成器 ---
const DataGenerator = {
  // 生成適合幹葉圖的數據 (10-99)
  generateStemLeafData: () => {
    const count = 15 + Math.floor(Math.random() * 10);
    const data = Array.from({ length: count }, () => Math.floor(Math.random() * 50) + 40); // 40-90 range
    return data.sort((a, b) => a - b);
  },

  // 生成適合棒形圖/表格的數據 (離散，頻數) - 確保眾數唯一
  generateFrequencyData: () => {
    const values = [1, 2, 3, 4, 5, 6]; // 例如骨子或計分
    const data = [];
    const freqs = values.map(() => Math.floor(Math.random() * 8) + 1); // 1-8 頻數
    const maxFreq = Math.max(...freqs);
    // 確保只有一個眾數（最高頻率的數似ぬ史は特策は一一不同）
    values.forEach((v, i) => {
      const freq = freqs[i] === maxFreq ? maxFreq : Math.max(1, Math.floor(Math.random() * maxFreq));
      if (freq === maxFreq && freqs.filter(f => f === maxFreq).length > 1) {
        // 如果有多個數有相同的最高頻率，減少後者
        freqs[i] = maxFreq - 1;
      }
      for (let j = 0; j < freqs[i]; j++) data.push(v);
    });
    return data.sort((a, b) => a - b);
  },
  
  // 生成適合框線圖的數據
  generateBoxPlotData: () => {
    const count = 11 + Math.floor(Math.random() * 10); // 奇數較好算中位數
    const data = Array.from({ length: count }, () => Math.floor(Math.random() * 40) + 10);
    return data.sort((a, b) => a - b);
  }
};

// --- SVG 圖表組件 ---

const BoxPlot = ({ data, highlight }) => {
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const { q1, q2, q3 } = MathUtils.quartiles(data);
  
  // Scale helper
  const padding = 40;
  const width = 500;
  const scale = (val) => ((val - (min - 5)) / ((max + 5) - (min - 5))) * (width - 2 * padding) + padding;

  const getStroke = (type) => highlight === type ? "#ef4444" : "#3b82f6";
  const getStrokeWidth = (type) => highlight === type ? 4 : 2;

  return (
    <svg viewBox={`0 0 ${width} 200`} className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
      <text x={width/2} y="20" textAnchor="middle" className="font-bold text-slate-700">框線圖 (Box-and-Whisker Diagram)</text>
      
      {/* Axis */}
      <line x1={padding} y1="150" x2={width-padding} y2="150" stroke="#94a3b8" strokeWidth="2" />
      {[min, q1, q2, q3, max].map((val, i) => {
        const formatValue = (v) => {
          if (Number.isInteger(v)) return v.toString();
          // 使用 parseFloat 移除尾隨零 (37.50 -> 37.5)
          return parseFloat(v.toFixed(2)).toString();
        };
        return (
          <g key={i}>
            <line x1={scale(val)} y1="145" x2={scale(val)} y2="155" stroke="#64748b" />
            <text x={scale(val)} y="170" textAnchor="middle" className="text-xs fill-slate-500">{formatValue(val)}</text>
          </g>
        );
      })}

      {/* Box Plot Elements */}
      {/* Whiskers - 橫線保持藍色 */}
      <line x1={scale(min)} y1="100" x2={scale(q1)} y2="100" stroke="#3b82f6" strokeWidth="2" />
      <line x1={scale(q3)} y1="100" x2={scale(max)} y2="100" stroke="#3b82f6" strokeWidth="2" />
      
      {/* Min/Max Caps - 只在 highlight === 'range' 時顯示 */}
      {highlight === 'range' && (
        <>
          <line x1={scale(min)} y1="80" x2={scale(min)} y2="120" stroke="#ef4444" strokeWidth="4" />
          <line x1={scale(max)} y1="80" x2={scale(max)} y2="120" stroke="#ef4444" strokeWidth="4" />
          <text x={scale(min)} y="60" textAnchor="middle" fill="#ef4444" className="text-sm font-bold">最小值</text>
          <text x={scale(max)} y="60" textAnchor="middle" fill="#ef4444" className="text-sm font-bold">最大值</text>
        </>
      )}

      {/* Box - 長方形保持藍色，但Q1和Q3的直線在highlight時變紅 */}
      {/* 上下橫線 */}
      <line x1={scale(q1)} y1="70" x2={scale(q3)} y2="70" stroke="#3b82f6" strokeWidth="2" />
      <line x1={scale(q1)} y1="130" x2={scale(q3)} y2="130" stroke="#3b82f6" strokeWidth="2" />
      {/* Q1 直線 */}
      <line x1={scale(q1)} y1="70" x2={scale(q1)} y2="130" stroke={highlight === 'iqr' ? "#ef4444" : "#3b82f6"} strokeWidth={highlight === 'iqr' ? 4 : 2} />
      {/* Q3 直線 */}
      <line x1={scale(q3)} y1="70" x2={scale(q3)} y2="130" stroke={highlight === 'iqr' ? "#ef4444" : "#3b82f6"} strokeWidth={highlight === 'iqr' ? 4 : 2} />
      
      {/* Median Line */}
      <line x1={scale(q2)} y1="70" x2={scale(q2)} y2="130" stroke={getStroke('median')} strokeWidth={getStrokeWidth('median')} />

      {/* Dynamic Labels based on Highlight */}
      {highlight === 'iqr' && (
        <>
          <text x={scale(q1)} y="55" textAnchor="middle" fill="#ef4444" className="text-sm font-bold">Q<tspan dy="3" fontSize="0.75em">1</tspan></text>
          <text x={scale(q3)} y="55" textAnchor="middle" fill="#ef4444" className="text-sm font-bold">Q<tspan dy="3" fontSize="0.75em">3</tspan></text>
          <text x={scale(q2)} y="40" textAnchor="middle" fill="#ef4444" className="text-sm font-bold">四分位數間距</text>
        </>
      )}
    </svg>
  );
};

const StemLeafPlot = ({ data, highlight, highlightIndices = [] }) => {
  // 先將數據排序並記錄位置
  const sortedData = [...data].sort((a, b) => a - b);
  
  // 建立幹葉結構，保留排序後的索引
  const stems = {};
  sortedData.forEach((val, sortedIndex) => {
    const stem = Math.floor(val / 10);
    const leaf = val % 10;
    if (!stems[stem]) stems[stem] = [];
    stems[stem].push({ leaf, sortedIndex });
  });
  
  const sortedStems = Object.keys(stems).sort((a,b)=>a-b);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 font-mono flex flex-col items-center">
      <h3 className="font-bold text-slate-700 mb-2">幹葉圖 (Stem-and-Leaf Diagram)</h3>
      <table className="border-collapse">
        <thead>
          <tr className="text-slate-500 text-sm border-b border-slate-400">
            <th className="pr-2 text-right border-r-2 border-slate-400 pb-1">幹（十位）</th>
            <th className="pl-2 text-left pb-1">葉（個位）</th>
          </tr>
        </thead>
        <tbody>
          {sortedStems.map(stem => (
            <tr key={stem} className="hover:bg-slate-50">
              <td className="pr-2 text-right border-r-2 border-slate-400 font-bold text-lg py-1">{stem}</td>
              <td className="pl-2 text-left">
                <span className="text-lg flex">
                  {stems[stem].map((item, i) => {
                    const isHighlighted = highlightIndices.includes(item.sortedIndex);
                    return (
                      <span key={i} className={`inline-block w-6 text-center transition-colors ${isHighlighted ? 'text-red-600 font-bold bg-red-100 rounded' : highlight === 'data' ? 'text-blue-600 font-bold' : ''}`}>
                        {item.leaf}
                      </span>
                    );
                  })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-xs text-slate-500">
        Key: 4 | 2 = 42
      </div>
    </div>
  );
};

const BarChart = ({ data, highlight }) => {
  const freq = {};
  data.forEach(v => freq[v] = (freq[v] || 0) + 1);
  const keys = Object.keys(freq).map(Number).sort((a,b)=>a-b);
  const maxFreq = Math.max(...Object.values(freq));
  
  const width = 500;
  const height = 250;
  const margin = 40;
  const barWidth = (width - 2*margin) / keys.length * 0.6;
  
  const scaleY = (f) => ((f) / (maxFreq + 1)) * (height - 2*margin);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
      <text x={width/2} y="20" textAnchor="middle" className="font-bold text-slate-700">棒型圖 (Bar Chart)</text>
      
      {/* Axes */}
      <line x1={margin} y1={height-margin} x2={width-margin} y2={height-margin} stroke="#334155" strokeWidth="2" />
      <line x1={margin} y1={height-margin} x2={margin} y2={margin} stroke="#334155" strokeWidth="2" />
      
      <text x={width/2} y={height-10} textAnchor="middle" className="text-xs">數值 (Score)</text>
      <text x={10} y={height/2} transform={`rotate(-90, 10, ${height/2})`} textAnchor="middle" className="text-xs">頻數 (Freq)</text>

      {keys.map((k, i) => {
        const x = margin + i * ((width - 2*margin) / keys.length) + 20;
        const h = scaleY(freq[k]);
        const isMode = highlight === 'mode' && freq[k] === maxFreq;
        const isRange = highlight === 'range' && (i === 0 || i === keys.length - 1);
        
        return (
          <g key={k}>
            <rect 
              x={x} 
              y={height - margin - h} 
              width={barWidth} 
              height={h} 
              fill={isMode ? "#ef4444" : isRange ? "#ef4444" : "#60a5fa"}
              className="transition-all duration-300 hover:opacity-80"
            />
            <text x={x + barWidth/2} y={height - margin + 15} textAnchor="middle" className="text-xs">{k}</text>
            <text x={x + barWidth/2} y={height - margin - h - 5} textAnchor="middle" className="text-xs font-bold text-slate-600">{freq[k]}</text>
          </g>
        );
      })}
    </svg>
  );
};

const FrequencyTable = ({ data, highlight }) => {
  const freq = {};
  data.forEach(v => freq[v] = (freq[v] || 0) + 1);
  const keys = Object.keys(freq).map(Number).sort((a,b)=>a-b);
  
  // 計算累積頻數 for Median explanation
  let cumFreq = 0;
  const cumFreqs = keys.map(k => {
    cumFreq += freq[k];
    return cumFreq;
  });

  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-2 bg-slate-50 border-b border-slate-200 font-bold text-center text-slate-700">頻數表 (Frequency Table)</div>
      <table className="w-full text-sm text-center">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="p-2 border-r">數值 (x)</th>
            <th className="p-2">頻數 (f)</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((k, i) => {
            const isMinMax = highlight === 'range' && (k === Math.min(...keys) || k === Math.max(...keys));
            return (
              <tr key={k} className={`border-b ${highlight === 'data' ? 'bg-blue-50' : ''}`}>
                <td className={`p-2 border-r font-medium ${isMinMax ? 'bg-red-100 font-bold text-red-700' : ''}`}>{k}</td>
                <td className={`p-2 ${highlight === 'mode' && freq[k] === Math.max(...Object.values(freq)) ? 'bg-red-100 font-bold' : ''}`}>{freq[k]}</td>
              </tr>
            );
          })}
          <tr className="bg-slate-50 font-bold">
            <td className="p-2 border-r">總和</td>
            <td className="p-2">{data.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// --- 虛擬鍵盤組件 ---
const Keypad = ({ value, onChange }) => {
  const handleKeyClick = (key) => {
    if (key === 'DEL') {
      onChange(value.slice(0, -1));
    } else {
      // 防止多個小數點
      if (key === '.' && value.includes('.')) return;
      onChange(value + key);
    }
  };

  const buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', 'DEL']
  ];

  return (
    <div className="bg-slate-100 p-4 rounded-lg border border-slate-300 w-full max-w-xs mx-auto">
      <div className="grid grid-cols-3 gap-2">
        {buttons.map((row, rowIdx) => (
          <div key={rowIdx} className="contents">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className={`p-4 rounded font-bold text-lg transition-colors ${
                  key === 'DEL'
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : key === '.'
                    ? 'bg-slate-400 hover:bg-slate-500 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {key === 'DEL' ? '⌫' : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 主應用邏輯 ---

// 將圖表組件完全獨立並 memoized，避免輸入時重新渲染
const ChartDisplay = React.memo(({ chartType, data, highlight }) => {
  if (chartType === 'box') return <BoxPlot data={data} highlight={highlight} />;
  if (chartType === 'stem') return <StemLeafPlot data={data} highlight={highlight} />;
  if (chartType === 'bar') return <BarChart data={data} highlight={highlight} />;
  if (chartType === 'table') return <FrequencyTable data={data} highlight={highlight} />;
  return null;
});

export default function StatisticsApp() {
  const [mode, setMode] = useState('menu'); // menu, quiz, learn
  const [currentChart, setCurrentChart] = useState(null); // box, stem, bar, table
  const [currentMeasure, setCurrentMeasure] = useState(null);
  const [data, setData] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'wrong' | 'hint', msg: '', detail: '' }
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [highlight, setHighlight] = useState(null);

  // 使用 useCallback 優化輸入處理，避免不必要的重新渲染
  const handleInputChange = useCallback((e) => {
    setUserAnswer(e.target.value);
  }, []);

  const topics = [
    { id: 'mean', label: '平均數 (Mean)', layers: ['stem', 'bar', 'table'] },
    { id: 'median', label: '中位數 (Median)', layers: ['box', 'stem', 'bar', 'table'] },
    { id: 'mode', label: '眾數 (Mode)', layers: ['stem', 'bar', 'table'] },
    { id: 'range', label: '分佈域 (Range)', layers: ['box', 'stem', 'bar', 'table'] },
    { id: 'iqr', label: '四分位數間距 (Interquartile Range)', layers: ['box', 'stem', 'bar', 'table'] },
    { id: 'variance', label: '方差 (Variance)', layers: ['stem', 'bar', 'table'] },
    { id: 'stdDev', label: '標準差 (SD)', layers: ['stem', 'bar', 'table'] },
  ];

  const generateNewQuestion = (forceTopic = null) => {
    // 1. Pick Topic
    let topic = forceTopic || topics[Math.floor(Math.random() * topics.length)];
    
    // 2. For mode questions, regenerate until we get a single mode
    let attempts = 0;
    while (topic.id === 'mode' && attempts < 5) {
      // Pick chart type compatible with mode
      const chartType = topic.layers[Math.floor(Math.random() * topic.layers.length)];
      
      // Generate data
      let newData = [];
      if (chartType === 'box') newData = DataGenerator.generateBoxPlotData();
      else if (chartType === 'stem') newData = DataGenerator.generateStemLeafData();
      else newData = DataGenerator.generateFrequencyData();
      
      // Check if mode is valid (exactly one mode, not multiple)
      const modes = MathUtils.mode(newData);
      if (modes.length === 1) {
        // Valid single mode - use this data
        setCurrentMeasure(topic);
        setCurrentChart(chartType);
        setData(newData);
        setUserAnswer('');
        setFeedback(null);
        setHighlight(null);
        return;
      }
      attempts++;
    }
    
    // If we couldn't get a valid mode, skip to a non-mode topic
    if (topic.id === 'mode') {
      const nonModeTopics = topics.filter(t => t.id !== 'mode');
      topic = nonModeTopics[Math.floor(Math.random() * nonModeTopics.length)];
    }
    
    // 3. Pick Compatible Chart Layer
    const chartType = topic.layers[Math.floor(Math.random() * topic.layers.length)];
    
    // 4. Generate Data
    let newData = [];
    if (chartType === 'box') newData = DataGenerator.generateBoxPlotData();
    else if (chartType === 'stem') newData = DataGenerator.generateStemLeafData();
    else newData = DataGenerator.generateFrequencyData();

    setCurrentMeasure(topic);
    setCurrentChart(chartType);
    setData(newData);
    setUserAnswer('');
    setFeedback(null);
    setHighlight(null);
  };

  const getCorrectAnswer = () => {
    switch (currentMeasure.id) {
      case 'mean': return MathUtils.mean(data);
      case 'median': return MathUtils.median(data);
      case 'mode': 
        const modes = MathUtils.mode(data);
        return modes.length > 0 ? modes : null; // 返回所有眾數
      case 'range': return MathUtils.range(data);
      case 'iqr': return MathUtils.iqr(data);
      case 'variance': return MathUtils.variance(data);
      case 'stdDev': return MathUtils.stdDev(data);
      default: return 0;
    }
  };

  const formatAnswer = (val) => {
    if (Array.isArray(val)) {
      // 眾數情況
      return val.map(v => formatAnswer(v)).join(',');
    }
    // 整數不顯示小數
    if (Number.isInteger(val)) return val.toString();
    // 使用3位有效數字
    return formatToSignificantFigures(val, 3);
  };

  // 格式化為指定有效數字
  const formatToSignificantFigures = (val, sigFigs = 3) => {
    if (val === 0) return '0';
    const magnitude = Math.floor(Math.log10(Math.abs(val)));
    const factor = Math.pow(10, sigFigs - magnitude - 1);
    const rounded = Math.round(val * factor) / factor;
    return rounded.toString();
  };

  const checkAnswer = () => {
    const correct = getCorrectAnswer();
    
    if (currentMeasure.id === 'mode') {
      // 眾數特殊處理
      if (correct === null) {
        // 無眾數
        if (userAnswer.toLowerCase().includes('無') || userAnswer === '') {
          setFeedback({ type: 'correct', msg: '答對了！太棒了！', detail: '' });
          setScore(s => s + 1);
          setTotalQuestions(t => t + 1);
        } else {
          setFeedback({ 
            type: 'wrong', 
            msg: '答案不正確', 
            detail: `正確答案是：無眾數（每個數值出現的次數相同）` 
          });
          setTotalQuestions(t => t + 1);
        }
      } else {
        // 有眾數
        const userModes = userAnswer.split(',').map(s => s.trim()).map(Number).filter(n => !isNaN(n)).sort((a,b)=>a-b);
        const correctModes = [...correct].sort((a,b)=>a-b);
        
        const isCorrect = userModes.length === correctModes.length && 
                          userModes.every((val, idx) => val === correctModes[idx]);
        
        if (isCorrect) {
          setFeedback({ type: 'correct', msg: '答對了！太棒了！', detail: '' });
          setScore(s => s + 1);
          setTotalQuestions(t => t + 1);
        } else {
          setFeedback({ 
            type: 'wrong', 
            msg: '答案不正確', 
            detail: `正確答案是：${formatAnswer(correct)}（用逗號分隔多個眾數）` 
          });
          setTotalQuestions(t => t + 1);
        }
      }
    } else {
      // 其他統計量
      const user = parseFloat(userAnswer);
      
      if (isNaN(user)) {
        setFeedback({ type: 'wrong', msg: '請輸入數字', detail: '' });
        return;
      }

      // Tolerance for float
      if (Math.abs(user - correct) < 0.05) {
        setFeedback({ type: 'correct', msg: '答對了！太棒了！', detail: '' });
        setScore(s => s + 1);
        setTotalQuestions(t => t + 1);
      } else {
        let explanation = "";
        if (currentMeasure.id === 'mean') explanation = `平均數 = 總和 (${MathUtils.sum(data)}) ÷ 數量 (${data.length})`;
        if (currentMeasure.id === 'range') explanation = `分佈域 = 最大值 (${Math.max(...data)}) - 最小值 (${Math.min(...data)})`;
        if (currentMeasure.id === 'iqr') {
          const {q1, q3} = MathUtils.quartiles(data);
          explanation = `IQR = Q3 (${q3}) - Q1 (${q1})`;
        }
        if (currentMeasure.id === 'variance') explanation = `方差 (σ²) = 每個數與平均數差的平方和 ÷ N`;
        if (currentMeasure.id === 'stdDev') explanation = `標準差 (σ) = √方差`;
        if (currentMeasure.id === 'median') explanation = `中位數 = 排序後中間的數`;

        setFeedback({ 
          type: 'wrong', 
          msg: '答案不正確', 
          detail: `正確答案是 ${formatAnswer(correct)}。\n${explanation}` 
        });
        setTotalQuestions(t => t + 1);
      }
    }
  };

  const showHint = () => {
    let hintMsg = "";
    if (currentMeasure.id === 'range') {
      setHighlight('range');
      hintMsg = "提示：找出最大值和最小值，然後相減。";
    } else if (currentMeasure.id === 'iqr') {
      setHighlight('iqr');
      hintMsg = "提示：找出上四分位數和下四分位數，然後相減。";
    } else if (currentMeasure.id === 'mode') {
      setHighlight('mode');
      hintMsg = "提示：找出出現次數最多的數值。";
    } else if (currentMeasure.id === 'mean') {
      setHighlight('data');
      hintMsg = "提示：將所有數值加起來，除以總數量。";
    } else if (currentMeasure.id === 'median') {
      setHighlight('median');
      hintMsg = "提示：將數據由小至大排列，找出正中間的數。";
    } else {
      setHighlight('data');
      hintMsg = "提示：仔細觀察數據分佈。";
    }
    setFeedback({ type: 'hint', msg: hintMsg });
  };

  // --- Views ---

  const MenuView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <Link to="/" className="text-slate-500 hover:text-slate-700 flex items-center gap-2">
          <HomeIcon size={20} />
          <span className="text-sm">返回首頁</span>
        </Link>
        <span className="font-bold text-slate-700">高中統計特訓</span>
        <div className="w-24"></div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">📊 統計學離差大師</h1>
          <p className="text-slate-500">掌握 Mean, Median, Mode, Variance, SD, IQR</p>
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
        <button 
          onClick={() => { setMode('learn'); generateNewQuestion(); }}
          className="p-6 bg-white border-2 border-blue-100 hover:border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-center mb-3 text-blue-500 group-hover:scale-110 transition-transform">
            <BookOpen size={48} />
          </div>
          <h3 className="text-xl font-bold text-slate-700">教學模式 (Learn)</h3>
          <p className="text-sm text-slate-500 mt-2">視覺化解釋各種概念</p>
        </button>

        <button 
          onClick={() => { setMode('quiz'); setScore(0); setTotalQuestions(0); generateNewQuestion(); }}
          className="p-6 bg-white border-2 border-green-100 hover:border-green-500 rounded-xl shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-center mb-3 text-green-500 group-hover:scale-110 transition-transform">
            <Calculator size={48} />
          </div>
          <h3 className="text-xl font-bold text-slate-700">測驗模式 (Quiz)</h3>
          <p className="text-sm text-slate-500 mt-2">隨機題型挑戰</p>
        </button>
      </div>
      </div>
    </div>
  );

  const QuizView = () => (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <Link to="/" className="text-slate-500 hover:text-slate-700 flex items-center gap-2">
          <HomeIcon size={20} />
          <span className="text-sm">返回首頁</span>
        </Link>
        <span className="font-bold text-slate-700">高中統計特訓</span>
        <button onClick={() => setMode('menu')} className="text-slate-500 hover:text-slate-800 flex items-center gap-2">
          <RotateCcw size={16} /> 返回目錄
        </button>
      </div>
    <div className="max-w-4xl mx-auto p-4">

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden mb-6">
        <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2">
            <HelpCircle size={20} />
            題目: 找出以下「{currentChart === 'box' ? '框線圖' : currentChart === 'stem' ? '幹葉圖' : currentChart === 'bar' ? '棒型圖' : '頻數表'}」中的「{currentMeasure?.label}」
          </h2>
          <span className="text-xs uppercase tracking-wider text-blue-400 font-bold bg-white px-2 py-1 rounded">
            {currentChart === 'box' ? '框線圖' : currentChart === 'stem' ? '幹葉圖' : currentChart === 'bar' ? '棒型圖' : '頻數表'}
          </span>
        </div>
        
        <div className="p-6 flex flex-col items-center justify-center min-h-[300px] bg-slate-50/50">
          <div className="w-full max-w-lg">
            <ChartDisplay chartType={currentChart} data={data} highlight={highlight} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          {!feedback || feedback.type === 'hint' ? (
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <input 
                    type="text" 
                    inputMode="decimal"
                    value={userAnswer}
                    onChange={handleInputChange}
                    placeholder={currentMeasure?.id === 'mode' ? '輸入眾數（多個用逗號分隔，如：58,67,89）' : '輸入你的答案...'}
                    className="w-full p-3 pr-14 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg text-center"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        checkAnswer();
                      }
                    }}
                    autoComplete="off"
                  />
                  <button 
                    onClick={checkAnswer}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition-colors flex items-center justify-center"
                    title="提交答案"
                  >
                    ✓
                  </button>
                </div>
                <button 
                  onClick={showHint}
                  className="flex-1 md:flex-none px-6 py-3 bg-amber-100 text-amber-700 font-bold rounded-lg hover:bg-amber-200 transition-colors flex items-center justify-center gap-2"
                >
                  <HelpCircle size={18} /> 提示
                </button>
              </div>
              
              {/* 虛擬數字鍵盤 */}
              <Keypad 
                value={userAnswer}
                onChange={setUserAnswer}
              />
            </div>
          ) : (
            <div className={`p-4 rounded-lg flex flex-col items-center text-center ${feedback.type === 'correct' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <div className="flex items-center gap-2 font-bold text-lg mb-2">
                {feedback.type === 'correct' ? <CheckCircle /> : <XCircle />}
                {feedback.msg}
              </div>
              {feedback.type === 'correct' && (
                <div className="text-sm mb-2">
                  正確答案：<span className="font-bold">{formatAnswer(getCorrectAnswer())}</span>
                </div>
              )}
              {feedback.detail && (
                <pre className="text-sm font-mono whitespace-pre-wrap bg-white/50 p-3 rounded mb-4">
                  {feedback.detail}
                </pre>
              )}
              <button 
                onClick={() => generateNewQuestion()}
                className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 flex items-center gap-2"
              >
                下一題 <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Hint Display */}
          {feedback?.type === 'hint' && (
             <div className="mt-4 p-3 bg-amber-50 text-amber-800 text-sm rounded border border-amber-200 flex items-start gap-2 animate-fadeIn">
               <div className="mt-1"><HelpCircle size={14} /></div>
               <div>{feedback.msg}</div>
             </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );

  // Learn View - Chart on left, stats on top
  const LearnView = () => {
    const [selectedChart, setSelectedChart] = useState(null);
    const [selectedStat, setSelectedStat] = useState(null);
    const [learnData, setLearnData] = useState([]);
    const [learnMeasure, setLearnMeasure] = useState(null);
    const [learnHighlight, setLearnHighlight] = useState(null);

    const chartTypes = {
      box: { name: '框線圖 (Box-and-Whisker Diagram)', stats: ['median', 'range', 'iqr'] },
      stem: { name: '幹葉圖 (Stem-and-Leaf Diagram)', stats: ['mean', 'median', 'mode', 'range', 'iqr', 'stdDev', 'variance'] },
      bar: { name: '棒型圖 (Bar Chart)', stats: ['mean', 'median', 'mode', 'range', 'iqr', 'stdDev', 'variance'] },
      table: { name: '頻數表 (Frequency Table)', stats: ['mean', 'median', 'mode', 'range', 'iqr', 'stdDev', 'variance'] }
    };

    const handleChartSelect = (chartType) => {
      setSelectedChart(chartType);
      
      let newData = [];
      if (chartType === 'box') newData = DataGenerator.generateBoxPlotData();
      else if (chartType === 'stem') {
        // 幹葉圖特殊處理：確保有單一眾數
        let attempts = 0;
        do {
          newData = DataGenerator.generateStemLeafData();
          const modes = MathUtils.mode(newData);
          if (modes.length === 1) break; // 有單一眾數
          attempts++;
        } while (attempts < 10);
        // 如果10次都無法生成，強制生成一個有眾數的數據
        if (attempts >= 10) {
          newData = [42, 42, 42, 45, 47, 50, 53, 55, 58, 60, 63, 65, 68, 70, 72]; // 眾數=42
        }
      }
      else newData = DataGenerator.generateFrequencyData();
      
      setLearnData(newData);
      setLearnHighlight(null);
      
      // 自動選擇該圖表的第一個統計量
      const firstStat = chartTypes[chartType].stats[0];
      setSelectedStat(firstStat);
      const topic = topics.find(t => t.id === firstStat);
      setLearnMeasure(topic);
    };

    const handleStatSelect = (statId) => {
      setSelectedStat(statId);
      const topic = topics.find(t => t.id === statId);
      setLearnMeasure(topic);
      setLearnHighlight(null);
      
      // 如果是幹葉圖且選擇眾數，重新生成數據確保有單一眾數
      if (selectedChart === 'stem' && statId === 'mode') {
        let newData = [];
        let attempts = 0;
        do {
          newData = DataGenerator.generateStemLeafData();
          const modes = MathUtils.mode(newData);
          if (modes.length === 1) break;
          attempts++;
        } while (attempts < 10);
        if (attempts >= 10) {
          newData = [42, 42, 42, 45, 47, 50, 53, 55, 58, 60, 63, 65, 68, 70, 72];
        }
        setLearnData(newData);
      }
    };

    const renderLearnChart = () => {
      if (!selectedChart || learnData.length === 0) return null;
      
      // 計算需要高亮的位置索引（基於排序後的位置）
      let highlightIndices = [];
      if (selectedChart === 'stem' && learnHighlight === 'median') {
        // 中位數：高亮中間的一個或兩個數的位置
        const n = learnData.length;
        const mid = Math.floor(n / 2);
        if (n % 2 === 0) {
          // 偶數個：高亮第 mid-1 和第 mid 個位置（排序後）
          highlightIndices = [mid - 1, mid];
        } else {
          // 奇數個：高亮第 mid 個位置
          highlightIndices = [mid];
        }
      } else if (selectedChart === 'stem' && learnHighlight === 'mode') {
        // 眾數：高亮所有眾數的位置
        const modes = MathUtils.mode(learnData);
        if (modes.length > 0) {
          const sorted = [...learnData].sort((a, b) => a - b);
          sorted.forEach((val, idx) => {
            if (modes.includes(val)) {
              highlightIndices.push(idx);
            }
          });
        }
      } else if (selectedChart === 'stem' && learnHighlight === 'range') {
        // 分佈域：高亮最小值和最大值的位置
        highlightIndices = [0, learnData.length - 1];
      } else if (selectedChart === 'stem' && learnHighlight === 'iqr') {
        // 四分位數間距：高亮 Q1 和 Q3 的位置
        const n = learnData.length;
        const sorted = [...learnData].sort((a, b) => a - b);
        const mid = Math.floor(n / 2);
        
        let lowerHalf = sorted.slice(0, mid);
        let upperHalf = n % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);
        
        // 計算 Q1 和 Q3 的位置
        const q1Index = Math.floor(lowerHalf.length / 2);
        const q3Index = mid + Math.floor(upperHalf.length / 2) + (n % 2 === 1 ? 1 : 0);
        
        // 轉換回原始排序後的數據中的位置
        highlightIndices = [q1Index, q3Index];
      }
      
      if (selectedChart === 'box') return <BoxPlot data={learnData} highlight={learnHighlight} />;
      if (selectedChart === 'stem') return <StemLeafPlot data={learnData} highlight={learnHighlight} highlightIndices={highlightIndices} />;
      if (selectedChart === 'bar') return <BarChart data={learnData} highlight={learnHighlight} />;
      if (selectedChart === 'table') return <FrequencyTable data={learnData} highlight={learnHighlight} />;
      return null;
    };

    return (
      <div className="min-h-screen bg-slate-100">
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <Link to="/" className="text-slate-500 hover:text-slate-700 flex items-center gap-2">
            <HomeIcon size={20} />
            <span className="text-sm">返回首頁</span>
          </Link>
          <span className="font-bold text-slate-700">高中統計特訓 - 教學模式</span>
          <button onClick={() => setMode('menu')} className="text-slate-500 hover:text-slate-800 flex items-center gap-2">
            <RotateCcw size={16} /> 返回目錄
          </button>
        </div>

        <div className="flex h-[calc(100vh-60px)]">
          {/* 左側邊欄：圖表類型選擇 */}
          <div className="w-64 bg-white border-r border-slate-200 p-4 overflow-y-auto">
            <h3 className="font-bold text-slate-700 mb-4 px-2">選擇圖表類別:</h3>
            <div className="space-y-2">
              {Object.entries(chartTypes).map(([key, chart]) => (
                <button
                  key={key}
                  onClick={() => handleChartSelect(key)}
                  className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedChart === key
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {chart.name}
                </button>
              ))}
            </div>
          </div>

          {/* 右側主內容 */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedChart && learnData.length > 0 ? (
              <div className="max-w-4xl">
                {/* 標題 */}
                <h2 className="text-3xl font-bold text-slate-800 mb-4">{chartTypes[selectedChart].name}</h2>

                {/* 統計量選擇按鈕（橫排） */}
                <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-lg p-4 border border-slate-200">
                  {chartTypes[selectedChart].stats.map(statId => {
                    const stat = topics.find(t => t.id === statId);
                    return (
                      <button
                        key={statId}
                        onClick={() => handleStatSelect(statId)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedStat === statId
                            ? 'bg-slate-800 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {stat?.label.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                {/* 教學內容 */}
                {selectedStat && learnMeasure && (
                  <div className="space-y-6">
                    {/* 圖表 */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                      {renderLearnChart()}
                    </div>

                    {/* 計算說明 */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                      <h4 className="font-bold text-lg mb-4 text-slate-700">{learnMeasure.label}</h4>
                      <div className="space-y-4">
                        {/* 標準差和方差沒有視覺化重點按鈕 */}
                        {selectedStat !== 'stdDev' && selectedStat !== 'variance' && (
                          <button 
                            type="button"
                            onClick={() => {
                              if(selectedStat === 'iqr') setLearnHighlight('iqr');
                              else if(selectedStat === 'range') setLearnHighlight('range');
                              else if(selectedStat === 'median') setLearnHighlight('median');
                              else if(selectedStat === 'mode') setLearnHighlight('mode');
                              else setLearnHighlight('data');
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg hover:bg-blue-50 text-sm w-full text-left"
                          >
                            <TrendingUp size={16} className="text-blue-500"/>
                            視覺化重點 (點擊查看)
                          </button>
                        )}
                        
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm leading-relaxed">
                          {selectedStat === 'mean' && (
                            <p>
                              將所有數值加總，除以數據個數。<br/>
                              {selectedChart === 'table' || selectedChart === 'bar' ? (
                                // 頻數表和棒型圖：使用 f × x 格式
                                (() => {
                                  const freq = {};
                                  learnData.forEach(v => freq[v] = (freq[v] || 0) + 1);
                                  const keys = Object.keys(freq).map(Number).sort((a,b)=>a-b);
                                  const terms = keys.map(k => `${k}(${freq[k]})`);
                                  return (
                                    <>
                                      <div className="mt-2 flex items-center gap-2">
                                        <span className="font-semibold">平均數 =</span>
                                        <Fraction 
                                          numerator={terms.join(' + ')} 
                                          denominator={learnData.length}
                                        />
                                      </div>
                                      <div className="mt-2 flex items-center gap-2">
                                        <span className="font-semibold">平均數 =</span>
                                        <KaTeXValue value={formatAnswer(MathUtils.mean(learnData))} />
                                      </div>
                                    </>
                                  );
                                })()
                              ) : (
                                // 其他圖表：列出所有數據
                                <>
                                  <div className="mt-2 flex items-center gap-2">
                                    <span className="font-semibold">平均數 =</span>
                                    <Fraction 
                                      numerator={learnData.join(' + ')} 
                                      denominator={learnData.length}
                                    />
                                  </div>
                                  <div className="mt-2 flex items-center gap-2">
                                    <span className="font-semibold">平均數 =</span>
                                    <KaTeXValue value={formatAnswer(MathUtils.mean(learnData))} />
                                  </div>
                                </>
                              )}
                            </p>
                          )}
                          
                          {selectedStat === 'median' && selectedChart === 'box' && (
                            <p>
                              <b>在框線圖中：</b>找出長方框中間的直線。<br/>
                              該直線所對應的數值就是中位數。<br/>
                              <b>中位數 = {formatAnswer(MathUtils.median(learnData))}</b>
                            </p>
                          )}
                          {selectedStat === 'median' && selectedChart !== 'box' && (
                            <p>
                              將數據由小到大排列，找出正中間的位置。<br/>
                              如果數據總數為雙數，取中間兩個數的平均。<br/>
                              {learnData.length % 2 === 0 ? (
                                <>
                                  排序後的數據：{[...learnData].sort((a,b) => a-b).join(', ')}<br/>
                                  數據總數 = {learnData.length} (雙數)<br/>
                                  中間兩個位置：第 {learnData.length/2} 和第 {learnData.length/2 + 1} 個數<br/>
                                  {(() => {
                                    const sorted = [...learnData].sort((a,b) => a-b);
                                    const mid1 = sorted[learnData.length/2 - 1];
                                    const mid2 = sorted[learnData.length/2];
                                    return (
                                      <>
                                        <div className="mt-2 flex items-center gap-2">
                                          <span className="font-semibold">中位數 =</span>
                                          <Fraction 
                                            numerator={`${mid1} + ${mid2}`}
                                            denominator="2"
                                          />
                                        </div>
                                        <div className="mt-2 flex items-center gap-2">
                                          <span className="font-semibold">中位數 =</span>
                                          <KaTeXValue value={formatAnswer((mid1 + mid2) / 2)} />
                                        </div>
                                      </>
                                    );
                                  })()}
                                </>
                              ) : (
                                <>
                                  排序後的數據：{[...learnData].sort((a,b) => a-b).join(', ')}<br/>
                                  數據總數 = {learnData.length} (單數)<br/>
                                  <div className="mt-2 flex items-center gap-2">
                                    <span className="font-semibold">中位數 =</span>
                                    <KaTeXValue value={formatAnswer(MathUtils.median(learnData))} />
                                  </div>
                                </>
                              )}
                            </p>
                          )}
                          
                          {selectedStat === 'range' && selectedChart === 'box' && (
                            <p>
                              <b>在框線圖中：</b>從最左端（最小值）到最右端（最大值）的距離。<br/>
                              <code>最大值 = {Math.max(...learnData)}，最小值 = {Math.min(...learnData)}</code><br/>
                              <b>公式：分佈域 = 最大值 - 最小值</b><br/>
                              <b>分佈域 = {Math.max(...learnData)} - {Math.min(...learnData)} = {formatAnswer(MathUtils.range(learnData))}</b>
                            </p>
                          )}
                          {selectedStat === 'range' && selectedChart !== 'box' && (
                            <p>
                              最大值減去最小值。<br/>
                              <code>最大值 = {Math.max(...learnData)}，最小值 = {Math.min(...learnData)}</code><br/>
                              <b>公式：分佈域 = 最大值 - 最小值</b><br/>
                              <b>分佈域 = {Math.max(...learnData)} - {Math.min(...learnData)} = {formatAnswer(MathUtils.range(learnData))}</b>
                            </p>
                          )}
                          
                          {selectedStat === 'iqr' && selectedChart === 'box' && (
                            <p>
                              <b>在框線圖中：</b>長方框的寬度。<br/>
                              從方框左邊（Q<sub>1</sub>）到右邊（Q<sub>3</sub>）的距離。<br/>
                              <code>上四分位數 = {formatAnswer(MathUtils.quartiles(learnData).q3)}，下四分位數 = {formatAnswer(MathUtils.quartiles(learnData).q1)}</code><br/>
                              <b>四分位數間距 = Q<sub>3</sub> - Q<sub>1</sub> = {formatAnswer(MathUtils.quartiles(learnData).q3)} - {formatAnswer(MathUtils.quartiles(learnData).q1)} = {formatAnswer(MathUtils.iqr(learnData))}</b>
                            </p>
                          )}
                          {selectedStat === 'iqr' && selectedChart !== 'box' && (
                            <p>
                              四分位數間距 = 上四分位數 - 下四分位數。<br/>
                              排序後的數據：{[...learnData].sort((a,b) => a-b).join(', ')}<br/>
                              <code>上四分位數 = {formatAnswer(MathUtils.quartiles(learnData).q3)}，下四分位數 = {formatAnswer(MathUtils.quartiles(learnData).q1)}</code><br/>
                              <b>四分位數間距 = Q<sub>3</sub> - Q<sub>1</sub> = {formatAnswer(MathUtils.quartiles(learnData).q3)} - {formatAnswer(MathUtils.quartiles(learnData).q1)} = {formatAnswer(MathUtils.iqr(learnData))}</b>
                            </p>
                          )}
                          
                          {selectedStat === 'mode' && (
                            <p>
                              出現頻率最高的數值。<br/>
                              <b>眾數 = {formatAnswer(MathUtils.mode(learnData).length > 0 ? MathUtils.mode(learnData) : '無')}</b><br/>
                              <br/>
                              <span className="text-slate-600 text-sm">
                                • <b>無眾數</b>：當所有數值出現次數相同時，則無眾數。<br/>
                                • <b>多個眾數</b>：當有多個數值出現最高頻率時，則有多個眾數。<br/>
                                例：1, 1, 2, 2, 3 → 眾數為 1 和 2
                              </span>
                            </p>
                          )}
                          {selectedStat === 'variance' && (
                            <p>
                              計算每個數與平均數距離的平方，取平均。<br/>
                              <br/>
                              <b>使用 CASIO fx-50FH II 計算機計算：</b><br/>
                              <span className="text-slate-600 text-sm">
                                1. 先按上述方法計算標準差 (σn)<br/>
                                2. 將標準差平方即可得到方差<br/>
                              </span>
                              <br/>
                              <b>公式：方差 = (標準差)²</b><br/>
                              標準差 = {formatToSignificantFigures(MathUtils.stdDev(learnData), 3)}<br/>
                              <b>方差 = ({formatToSignificantFigures(MathUtils.stdDev(learnData), 3)})² = {formatAnswer(MathUtils.variance(learnData))}</b>
                            </p>
                          )}
                          {selectedStat === 'stdDev' && (
                            <p>
                              <b>使用 CASIO fx-50FH II 計算機 SD 模式：</b><br/>
                              <span className="text-slate-600 text-sm">
                                1. 按 <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">MODE</kbd> → 選擇 <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">2 (SD)</kbd><br/>
                                2. 逐個輸入數據，每個數後按 <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">M+</kbd> 或 <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">DATA</kbd><br/>
                                3. 輸入完畢後，按 <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">SHIFT</kbd> + <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">2</kbd> (Ïσn) 得到標準差<br/>
                              </span>
                              <br/>
                              數據：{learnData.join(', ')}<br/>
                              <b>標準差 (SD) = {formatToSignificantFigures(MathUtils.stdDev(learnData), 3)}</b> <span className="text-slate-500 text-sm">(約至3位有效數字)</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-400 text-lg">請從左側選擇圖表類別</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {mode === 'menu' && <MenuView />}
      {mode === 'quiz' && <QuizView />}
      {mode === 'learn' && <LearnView />}
    </div>
  );
}
