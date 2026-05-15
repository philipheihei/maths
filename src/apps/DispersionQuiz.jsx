import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { loadKatexOnce } from '../utils/katexLoader';

// --- KaTeX 加載與渲染組件 ---

// KaTeX 分數元件
const Fraction = ({ numerator, denominator }) => {
  const [katexLoaded, setKatexLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    loadKatexOnce().then(() => setKatexLoaded(true)).catch(e => console.error("KaTeX load error:", e));
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
    loadKatexOnce().then(() => setKatexLoaded(true)).catch(e => console.error("KaTeX load error:", e));
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
    loadKatexOnce().then(() => setKatexLoaded(true)).catch(e => console.error("KaTeX load error:", e));
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

// --- 平均數解釋元件 ---
const MeanExplanation = ({ data, mean, chartType }) => {
  const total = data.reduce((a, b) => a + b, 0);
  const n = data.length;
  const sorted = [...data].sort((a, b) => a - b);

  return (
    <div className="text-left w-full max-w-md mx-auto mt-1 mb-2">
      <div className="border-2 border-orange-400 rounded-xl overflow-hidden">
        <div className="bg-orange-500 text-white px-4 py-2 font-bold flex items-center gap-2">
          <span>∑</span> 如何計算平均數
        </div>
        <div className="bg-white px-4 py-3 space-y-3 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">1</span>
            <div>
              <div>將所有數值加起來</div>
              <div className="mt-1 bg-slate-100 rounded px-3 py-1.5 font-mono text-xs text-slate-600 border border-slate-200">
                {sorted.join(' + ')} = <span className="font-bold text-blue-700">{total}</span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">2</span>
            <span>{chartType === 'table' ? '數一數頻數，有多少個數' : '數一數有幾多個數值'} → 共 <span className="font-bold text-blue-700">{n}</span> 個</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">3</span>
            <div>
              <span>平均數 = 總和 ÷ 數量</span>
              <div className="mt-1 bg-slate-100 rounded px-3 py-2 border border-slate-200">
                <span className="text-base font-bold">
                  <span className="text-slate-500">平均數 = </span>
                  <span className="text-blue-700">{total}</span>
                  <span className="text-slate-500"> ÷ </span>
                  <span className="text-blue-700">{n}</span>
                  <span className="text-slate-500"> = </span>
                  <span className="text-red-600">{mean}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 眾數解釋元件 ---
const ModeExplanation = ({ data, correctModes, chartType }) => {
  // 計算每個數值的頻數
  const freq = {};
  data.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  const maxFreq = Math.max(...Object.values(freq));
  const entries = Object.keys(freq).map(Number).sort((a, b) => a - b);

  return (
    <div className="text-left w-full max-w-md mx-auto mt-1 mb-2">
      <div className="border-2 border-blue-400 rounded-xl overflow-hidden">
        <div className="bg-blue-500 text-white px-4 py-2 font-bold flex items-center gap-2">
          <span>📊</span>
          {chartType === 'bar'
            ? '找出最高的柱 → 數值出現次數最多'
            : '找出出現次數最多的數值'
          }
        </div>
        <div className="bg-white px-4 py-3">
          <table className="w-full text-sm text-center border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-200 px-3 py-1">數值</th>
                {entries.map(v => (
                  <th key={v} className={`border px-3 py-1 ${
                    correctModes.includes(v)
                      ? 'bg-red-100 border-red-300 text-red-700 font-bold'
                      : 'border-slate-200'
                  }`}>{v}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-200 px-3 py-1 font-semibold bg-slate-50">頻數</td>
                {entries.map(v => (
                  <td key={v} className={`border px-3 py-1 ${
                    correctModes.includes(v)
                      ? 'bg-red-50 border-red-300 text-red-700 font-bold text-base'
                      : 'border-slate-200 text-slate-500'
                  }`}>
                    {freq[v]}
                    {correctModes.includes(v) && <span className="ml-1">&#9650;</span>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-500 mt-2">
            頻數最高為 <span className="font-bold text-red-600">{maxFreq}</span>，
            所以眾數是 <span className="font-bold text-red-600">{correctModes.join(', ')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- 中位數解釋元件 ---
const MedianExplanation = ({ data, chartType }) => {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const isOdd = n % 2 !== 0;
  const median = isOdd ? sorted[Math.floor(n / 2)] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;

  // 框線圖：直接從中線讀出中位數
  if (chartType === 'box') {
    return (
      <div className="text-left w-full max-w-md mx-auto mt-1 mb-2">
        <div className="border-2 border-teal-400 rounded-xl overflow-hidden">
          <div className="bg-teal-500 text-white px-4 py-2 font-bold flex items-center gap-2">
            <span>📊</span> 如何從框線圖讀出中位數
          </div>
          <div className="bg-white px-4 py-3 space-y-3 text-sm text-slate-700">
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">1</span>
              <span>框線圖「長方形」中間的<span className="font-bold text-red-600">直線</span>就是中位數</span>
            </div>
            <div className="mt-1 bg-slate-100 rounded px-3 py-2 border border-slate-200">
              <span className="text-base font-bold">
                <span className="text-slate-500">∴ 中位數 = </span>
                <span className="text-red-600">{median}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 頻數表 / 棒型圖：用累積頻數法
  if (chartType === 'table' || chartType === 'bar') {
    // 建立頻數表
    const freq = {};
    data.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
    const keys = Object.keys(freq).map(Number).sort((a, b) => a - b);

    // 建立累積頻數
    let cumFreq = 0;
    const rows = keys.map(k => {
      const from = cumFreq + 1;
      cumFreq += freq[k];
      return { val: k, f: freq[k], cum: cumFreq, from };
    });

    // 找中位數位置
    const pos1 = isOdd ? Math.ceil(n / 2) : n / 2;       // 1-indexed
    const pos2 = isOdd ? pos1 : n / 2 + 1;               // 1-indexed (same as pos1 if odd)

    // 找哪行包含 pos1 / pos2
    const rowForPos = (pos) => rows.find(r => pos >= r.from && pos <= r.cum);
    const r1 = rowForPos(pos1);
    const r2 = rowForPos(pos2);

    return (
      <div className="text-left w-full max-w-md mx-auto mt-1 mb-2">
        <div className="border-2 border-teal-400 rounded-xl overflow-hidden">
          <div className="bg-teal-500 text-white px-4 py-2 font-bold flex items-center gap-2">
            <span>📊</span> 如何用頻數表求中位數
          </div>
          <div className="bg-white px-4 py-3 space-y-3 text-sm text-slate-700">

            {/* Step 1: count total */}
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">1</span>
              <div>
                <span>先數<span className="font-bold text-blue-700">總頻數</span>（所有頻數加起來）</span>
                <div className="mt-1 bg-slate-100 rounded px-3 py-1.5 font-mono text-xs text-slate-600 border border-slate-200">
                  {rows.map(r => r.f).join(' + ')} = <span className="font-bold text-blue-700">{n}</span>
                </div>
              </div>
            </div>

            {/* Step 2: find position */}
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">2</span>
              <div>
                {isOdd ? (
                  <span>
                    總頻數 <span className="font-bold text-blue-700">{n}</span> 為<span className="font-bold">奇數</span>，
                    中位數是第 <span className="font-bold text-red-600">({n}+1)÷2 = {pos1}</span> 個數
                  </span>
                ) : (
                  <span>
                    總頻數 <span className="font-bold text-blue-700">{n}</span> 為<span className="font-bold">偶數</span>，
                    中位數是第 <span className="font-bold text-red-600">{pos1}</span> 和第{' '}
                    <span className="font-bold text-red-600">{pos2}</span> 個數的平均值
                    （即 {n}÷2 = {pos1}，{n}÷2+1 = {pos2}）
                  </span>
                )}
              </div>
            </div>

            {/* Step 3: cumulative freq table */}
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">3</span>
              <div className="w-full">
                <span>用<span className="font-bold text-blue-700">累積頻數</span>找出該位置屬於哪個數值</span>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full text-xs text-center border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-200 px-2 py-1">數值</th>
                        <th className="border border-slate-200 px-2 py-1">頻數</th>
                        <th className="border border-slate-200 px-2 py-1">累積頻數</th>
                        <th className="border border-slate-200 px-2 py-1">包含第…個數</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map(r => {
                        const isTarget = (r.val === r1?.val) || (r.val === r2?.val);
                        return (
                          <tr key={r.val} className={isTarget ? 'bg-red-50' : ''}>
                            <td className={`border px-2 py-1 font-bold ${
                              isTarget ? 'border-red-300 text-red-700' : 'border-slate-200'
                            }`}>{r.val}</td>
                            <td className={`border px-2 py-1 ${
                              isTarget ? 'border-red-300 text-red-700' : 'border-slate-200'
                            }`}>{r.f}</td>
                            <td className={`border px-2 py-1 font-bold ${
                              isTarget ? 'border-red-300 text-red-700' : 'border-slate-200'
                            }`}>{r.cum}</td>
                            <td className={`border px-2 py-1 ${
                              isTarget ? 'border-red-300 text-red-700 font-bold' : 'border-slate-200 text-slate-500'
                            }`}>
                              第 {r.from}{r.f > 1 ? `–${r.cum}` : ''} 個
                              {isTarget && <span className="ml-1">&#9664;</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Step 4: conclusion */}
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">4</span>
              <div className="bg-slate-100 rounded px-3 py-2 border border-slate-200 w-full">
                {isOdd ? (
                  <span className="text-base font-bold">
                    <span className="text-slate-500">第 {pos1} 個數 = </span>
                    <span className="text-red-600">{r1?.val}</span>
                    <span className="text-slate-500">，∴ 中位數 = </span>
                    <span className="text-red-600">{median}</span>
                  </span>
                ) : (
                  <span className="text-base font-bold">
                    <span className="text-slate-500">第{pos1}個數 = </span>
                    <span className="text-red-600">{r1?.val}</span>
                    <span className="text-slate-500">，第{pos2}個數 = </span>
                    <span className="text-red-600">{r2?.val}</span>
                    <span className="text-slate-500">，∴ 中位數 = ({r1?.val}+{r2?.val})÷2 = </span>
                    <span className="text-red-600">{median}</span>
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 幹葉圖：排列後找中間
  return (
    <div className="text-left w-full max-w-md mx-auto mt-1 mb-2">
      <div className="border-2 border-teal-400 rounded-xl overflow-hidden">
        <div className="bg-teal-500 text-white px-4 py-2 font-bold flex items-center gap-2">
          <span>📊</span> 如何從幹葉圖求中位數
        </div>
        <div className="bg-white px-4 py-3 space-y-3 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">1</span>
            <span>幹葉圖的數值已由小至大排列，共 <span className="font-bold text-blue-700">{n}</span> 個</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">2</span>
            <div>
              {isOdd ? (
                <span>共 <span className="font-bold text-blue-700">{n}</span> 個（奇數），中位數是第 <span className="font-bold text-red-600">({n}+1)÷2 = {Math.ceil(n/2)}</span> 個數</span>
              ) : (
                <span>共 <span className="font-bold text-blue-700">{n}</span> 個（偶數），中位數是第 <span className="font-bold text-red-600">{n/2}</span> 和第 <span className="font-bold text-red-600">{n/2+1}</span> 個數的平均值</span>
              )}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">3</span>
            <div className="w-full">
              <div className="mt-1 bg-slate-100 rounded px-3 py-1.5 font-mono text-xs text-slate-600 border border-slate-200 flex flex-wrap gap-1">
                {sorted.map((v, i) => {
                  const isMedianPos = isOdd
                    ? i === Math.floor(n / 2)
                    : i === n / 2 - 1 || i === n / 2;
                  return (
                    <span key={i} className={`px-1 rounded ${
                      isMedianPos ? 'bg-red-200 font-bold text-red-700' : ''
                    }`}>{v}</span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-slate-100 rounded px-3 py-2 border border-slate-200">
            <span className="text-base font-bold">
              {isOdd ? (
                <><span className="text-slate-500">∴ 中位數 = 第{Math.ceil(n/2)}個數 = </span><span className="text-red-600">{median}</span></>
              ) : (
                <><span className="text-slate-500">∴ 中位數 = ({sorted[n/2-1]} + {sorted[n/2]}) ÷ 2 = </span><span className="text-red-600">{median}</span></>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- IQR 解釋元件 ---
const IQRExplanation = ({ data, chartType }) => {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const mid = Math.floor(n / 2);
  const lowerHalf = sorted.slice(0, mid);
  const upperHalf = n % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);
  const q2 = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const q1 = lowerHalf.length % 2 !== 0
    ? lowerHalf[Math.floor(lowerHalf.length / 2)]
    : (lowerHalf[lowerHalf.length / 2 - 1] + lowerHalf[lowerHalf.length / 2]) / 2;
  const q3 = upperHalf.length % 2 !== 0
    ? upperHalf[Math.floor(upperHalf.length / 2)]
    : (upperHalf[upperHalf.length / 2 - 1] + upperHalf[upperHalf.length / 2]) / 2;
  const iqr = q3 - q1;

  // 框線圖專用說明：直接從圖讀 Q1/Q3
  if (chartType === 'box') {
    return (
      <div className="text-left w-full max-w-md mx-auto mt-1 mb-2">
        <div className="border-2 border-purple-400 rounded-xl overflow-hidden">
          <div className="bg-purple-500 text-white px-4 py-2 font-bold flex items-center gap-2">
            <span>📐</span> 如何從框線圖讀出四分位數間距
          </div>
          <div className="bg-white px-4 py-3 space-y-3 text-sm text-slate-700">
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">1</span>
              <span>從框線圖找出 <span className="font-bold text-blue-700">Q₁</span>（長方形左邊）和 <span className="font-bold text-red-700">Q₃</span>（長方形右邊）</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">2</span>
              <div className="bg-slate-100 rounded px-3 py-2 border border-slate-200 w-full">
                <span className="text-base font-bold">
                  <span className="text-slate-500">四分位數間距 = Q₃ − Q₁ = </span>
                  <span className="text-red-700">{q3}</span>
                  <span className="text-slate-500"> − </span>
                  <span className="text-blue-700">{q1}</span>
                  <span className="text-slate-500"> = </span>
                  <span className="text-red-600">{iqr}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-left w-full max-w-md mx-auto mt-1 mb-2">
      <div className="border-2 border-purple-400 rounded-xl overflow-hidden">
        <div className="bg-purple-500 text-white px-4 py-2 font-bold flex items-center gap-2">
          <span>📐</span> 如何計算四分位數間距 (IQR)
        </div>
        <div className="bg-white px-4 py-3 space-y-3 text-sm text-slate-700">

          {/* Step 1: sorted data */}
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">1</span>
            <div>
              <div>將數據由小至大排列</div>
              <div className="mt-1 bg-slate-100 rounded px-3 py-1.5 font-mono text-xs text-slate-600 border border-slate-200 flex flex-wrap gap-1">
                {sorted.map((v, i) => (
                  <span key={i} className={`px-1 rounded ${
                    i === mid && n % 2 !== 0 ? 'bg-yellow-200 font-bold' : ''
                  }`}>{v}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: find median => split */}
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">2</span>
            <div>
              <span>找出中位數，將數據分為上下半組</span>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-mono">
                  下半組: [{lowerHalf.join(', ')}]
                </span>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                  中位數 = {q2}
                </span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-mono">
                  上半組: [{upperHalf.join(', ')}]
                </span>
              </div>
            </div>
          </div>

          {/* Step 3: Q1 */}
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">3</span>
            <span>
              Q₁ = 下半組的中位數
              <span className="ml-2 font-mono bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-blue-700 font-bold">
                [{lowerHalf.join(', ')}] → Q₁ = {q1}
              </span>
            </span>
          </div>

          {/* Step 4: Q3 */}
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">4</span>
            <span>
              Q₃ = 上半組的中位數
              <span className="ml-2 font-mono bg-red-50 border border-red-200 px-2 py-0.5 rounded text-red-700 font-bold">
                [{upperHalf.join(', ')}] → Q₃ = {q3}
              </span>
            </span>
          </div>

          {/* Step 5: IQR */}
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">5</span>
            <div>
              <div className="bg-slate-100 rounded px-3 py-2 border border-slate-200">
                <span className="text-base font-bold">
                  <span className="text-slate-500">四分位數間距 = Q₃ − Q₁ = </span>
                  <span className="text-red-700">{q3}</span>
                  <span className="text-slate-500"> − </span>
                  <span className="text-blue-700">{q1}</span>
                  <span className="text-slate-500"> = </span>
                  <span className="text-red-600">{iqr}</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- 平均數步驟顯示元件 ---
const MeanSteps = ({ data, mean, chartType }) => {
  const [activeTab, setActiveTab] = useState('method1');
  const [showTip, setShowTip] = useState(false);

  const sum = data.reduce((a, b) => a + b, 0);
  const n = data.length;
  // Build frequency map
  const freq = {};
  data.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  const keys = Object.keys(freq).map(Number).sort((a, b) => a - b);
  // Compact numerator expression: v×f + v×f + ...
  const numExpr = keys.map(k => freq[k] === 1 ? `${k}` : `${k}×${freq[k]}`).join(' + ');
  // Compact denominator expression: f + f + ...
  const denExpr = keys.map(k => `${freq[k]}`).join(' + ');

  const isFreqChart = chartType === 'table' || chartType === 'bar';
  // Calculator example entries as JSX
  const sortedAll = [...data].sort((a, b) => a - b);
  const calcExampleJSX = isFreqChart
    ? keys.map((k, i) => (
        <span key={k} className="inline-flex items-center gap-0.5 mr-3">
          {k} <Kbd>;</Kbd> {freq[k]} <Kbd green>M+</Kbd>
        </span>
      ))
    : (() => {
        const runs = [];
        sortedAll.forEach(v => {
          if (runs.length > 0 && runs[runs.length - 1].v === v) runs[runs.length - 1].c++;
          else runs.push({ v, c: 1 });
        });
        const display = runs.slice(0, 7);
        const items = display.map((r, i) => (
          <span key={i} className="inline-flex items-center gap-0.5 mr-2">
            {r.v} {Array.from({ length: r.c }).map((_, j) => <Kbd key={j} green>M+</Kbd>)}
          </span>
        ));
        if (runs.length > 7) items.push(<span key="more" className="text-slate-400">…</span>);
        return items;
      })();

  const tabBorderColor = activeTab === 'method1' ? 'border-blue-400' : 'border-green-400';

  return (
    <div className={`text-left w-full max-w-md mx-auto mt-1 mb-2 border-2 rounded-xl overflow-hidden ${tabBorderColor}`}>

      {/* Tab buttons */}
      <div className="flex">
        <button
          onClick={() => setActiveTab('method1')}
          className={`flex-1 px-3 py-2 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'method1'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <span>📐</span>
          <span className="text-xs font-normal opacity-80">方法一</span>
          長答方法
        </button>
        <button
          onClick={() => setActiveTab('method2')}
          className={`flex-1 px-3 py-2 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors border-l ${
            activeTab === 'method2'
              ? 'bg-green-500 text-white border-green-400'
              : 'bg-slate-100 text-slate-500 hover:bg-green-50 hover:text-green-600 border-slate-200'
          }`}
        >
          <span>📱</span>
          <span className="text-xs font-normal opacity-80">方法二</span>
          計算機 SD
        </button>
      </div>

      {/* Method 1: Long method */}
      {activeTab === 'method1' && (
        <div className="bg-white px-4 py-3 space-y-2 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">1</span>
            <span>平均數 = <span className="font-bold text-blue-700">（所有數值加起來）÷（數值個數）</span></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">2</span>
            <span>
              將題目數字代入：
              <div className="mt-1 inline-flex flex-col items-center font-mono text-xs text-slate-700 border border-slate-300 rounded px-2 py-1 bg-slate-50 ml-1">
                <span className="border-b border-slate-500 pb-0.5 break-all">{numExpr}</span>
                <span className="pt-0.5 break-all">{denExpr}</span>
              </div>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">3</span>
            <span>化簡：
              <span className="font-mono ml-1">
                <span className="font-bold text-blue-700">{sum}</span>
                {' '}÷{' '}
                <span className="font-bold text-blue-700">{n}</span>
              </span>
            </span>
          </div>
          <div className="mt-2 bg-slate-100 rounded-lg px-3 py-2 font-mono text-base border border-slate-200">
            <span className="text-slate-500">∴ 平均數 =</span> <span className="text-red-600 font-bold text-lg">{mean}</span>
          </div>
        </div>
      )}

      {/* Method 2: Calculator method */}
      {activeTab === 'method2' && (
        <div className="bg-white px-4 py-3 space-y-2 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">1</span>
            <span>按 <Kbd>MODE</Kbd> <Kbd>4</Kbd> 進入統計模式</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">2</span>
            <span>按 <Kbd>SHIFT</Kbd> <Kbd>9</Kbd> <Kbd>1</Kbd> <Kbd>EXE</Kbd> 清除舊數據</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">3</span>
            <div>
              {isFreqChart ? (
                <span>輸入格式：數值 <Kbd>;</Kbd> 頻數 <Kbd green>M+</Kbd>（每組一次）</span>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span>逐一輸入每個數值，每個數值後按 <Kbd green>M+</Kbd> 儲存</span>
                    <button onClick={() => setShowTip(t => !t)} className="text-yellow-500 hover:text-yellow-600 text-base leading-none" title="小提示">💡</button>
                  </div>
                  {showTip && (
                    <div className="mt-1 text-xs text-slate-500 bg-yellow-50 border border-yellow-200 rounded px-2 py-1">
                      數字相同時可連按 <Kbd green>M+</Kbd>，毋須重新輸入數字<br />
                      例如出現 3 次 25：輸入 25 後連按 <Kbd green>M+</Kbd> <Kbd green>M+</Kbd> <Kbd green>M+</Kbd>
                    </div>
                  )}
                </>
              )}
              <div className="mt-1 bg-slate-100 rounded px-3 py-1.5 text-xs text-slate-600 border border-slate-200 flex flex-wrap gap-y-1">
                例：{calcExampleJSX}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">4</span>
            <span>完成後按 <Kbd>SHIFT</Kbd> <Kbd>2</Kbd> <Kbd>1</Kbd> 得出平均數（x̄）</span>
          </div>
          <div className="mt-2 bg-slate-100 rounded-lg px-3 py-2 border border-slate-200">
            <span className="text-base font-bold">
              <span className="text-slate-500">平均數 = </span>
              <span className="text-red-600">{mean}</span>
            </span>
          </div>
        </div>
      )}

    </div>
  );
};

// --- 計算機 SD Mode 步驟顯示元件 ---
const Kbd = ({ children, green }) => (
  <span className={`inline-block text-white text-xs font-bold px-2 py-0.5 rounded ${green ? 'bg-slate-500' : 'bg-slate-800'}`}>{children}</span>
);

const CalcSDSteps = ({ isVariance = false, sigmaValue = null, data = [], chartType = '' }) => {
  const [showTip, setShowTip] = useState(false);
  const isFreqChart = chartType === 'table' || chartType === 'bar';
  const sortedAll = [...data].sort((a, b) => a - b);

  // Build freq map for freq charts
  const freq = {};
  data.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  const freqKeys = Object.keys(freq).map(Number).sort((a, b) => a - b);

  // Build JSX example (run-length encoded for non-freq charts)
  const exampleJSX = isFreqChart
    ? freqKeys.map((k, i) => (
        <span key={k} className="inline-flex items-center gap-0.5 mr-3">
          {k} <Kbd>;</Kbd> {freq[k]} <Kbd green>M+</Kbd>
        </span>
      ))
    : (() => {
        const runs = [];
        sortedAll.forEach(v => {
          if (runs.length > 0 && runs[runs.length - 1].v === v) runs[runs.length - 1].c++;
          else runs.push({ v, c: 1 });
        });
        const display = runs.slice(0, 7);
        const items = display.map((r, i) => (
          <span key={i} className="inline-flex items-center gap-0.5 mr-2">
            {r.v} {Array.from({ length: r.c }).map((_, j) => <Kbd key={j} green>M+</Kbd>)}
          </span>
        ));
        if (runs.length > 7) items.push(<span key="more" className="text-slate-400">…</span>);
        return items;
      })();

  return (
    <div className="text-left w-full max-w-md mx-auto mt-1 mb-2">
      <div className="border-2 border-green-400 rounded-xl overflow-hidden">
        <div className="bg-green-500 text-white px-4 py-2 font-bold flex items-center gap-2">
          <span>📱</span> 使用計算機 SD Mode
        </div>
        <div className="bg-white px-4 py-3 space-y-2 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">1</span>
            <span>按 <Kbd>MODE</Kbd> <Kbd>4</Kbd> 進入統計模式</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">2</span>
            <span>按 <Kbd>SHIFT</Kbd> <Kbd>9</Kbd> <Kbd>1</Kbd> <Kbd>EXE</Kbd> 清除舊數據</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">3</span>
            <div>
              {isFreqChart ? (
                <span>輸入格式：數值 <Kbd>;</Kbd> 頻數 <Kbd green>M+</Kbd>（每組一次）</span>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span>逐一輸入每個數值，每個數值後按 <Kbd green>M+</Kbd> 儲存</span>
                    <button onClick={() => setShowTip(t => !t)} className="text-yellow-500 hover:text-yellow-600 text-base leading-none" title="小提示">💡</button>
                  </div>
                  {showTip && (
                    <div className="mt-1 text-xs text-slate-500 bg-yellow-50 border border-yellow-200 rounded px-2 py-1">
                      數字相同時可連按 <Kbd green>M+</Kbd>，毋須重新輸入數字<br />
                      例如出現 3 次 25：輸入 25 後連按 <Kbd green>M+</Kbd> <Kbd green>M+</Kbd> <Kbd green>M+</Kbd>
                    </div>
                  )}
                </>
              )}
              {data.length > 0 && (
                <div className="mt-1 bg-slate-100 rounded px-3 py-1.5 text-xs text-slate-600 border border-slate-200 flex flex-wrap gap-y-1">
                  例：{exampleJSX}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">4</span>
            <span>完成後按 <Kbd>SHIFT</Kbd> <Kbd>2</Kbd> <Kbd>2</Kbd> 得出標準差</span>
          </div>
          {isVariance && (
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-400 text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">5</span>
              <span>方差 = （標準差）²，即將標準差再按 <Kbd>x²</Kbd> 得出方差</span>
            </div>
          )}
          {sigmaValue !== null && (
            <div className="mt-2 bg-slate-100 rounded-lg px-3 py-2 border border-slate-200">
              {isVariance
                ? <span className="text-base font-bold"><span className="text-slate-500">標準差 = </span><span className="text-blue-700">{sigmaValue}</span><span className="text-slate-500">　∴ 方差 = </span><span className="text-red-600">{Number((sigmaValue * sigmaValue).toPrecision(3))}</span></span>
                : <span className="text-base font-bold"><span className="text-slate-500">標準差 = </span><span className="text-red-600">{sigmaValue}</span></span>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
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

const StemLeafPlot = ({ data, highlight, highlightIndices = [], highlightColors = {}, dividerIndices = [] }) => {
  // dividerIndices: 分隔线位置，格式为 [{afterIndex: number, label: string}]
  // afterIndex 表示在第几个数之后加分隔线（基于排序后的索引）
  // highlightColors: { sortedIndex: 'yellow' | 'green' } 用于IQR的颜色编码
  
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
  
  // 检查某个位置后是否需要分隔线
  const getDividerAfter = (sortedIndex) => {
    return dividerIndices.find(d => d.afterIndex === sortedIndex);
  };
  
  // 获取highlight的背景色
  const getHighlightColor = (sortedIndex) => {
    const color = highlightColors[sortedIndex];
    if (color === 'yellow') return 'bg-yellow-200';
    if (color === 'green') return 'bg-green-200';
    return 'bg-red-100'; // 默认为红色
  };

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
                <span className="text-lg flex items-center">
                  {stems[stem].map((item, i) => {
                    const isHighlighted = highlightIndices.includes(item.sortedIndex);
                    const divider = getDividerAfter(item.sortedIndex);
                    const hasColor = highlightColors[item.sortedIndex];
                    return (
                      <span key={i} className="inline-flex items-center">
                        <span className={`inline-block w-6 text-center transition-colors ${hasColor ? `text-slate-800 font-bold ${getHighlightColor(item.sortedIndex)} rounded` : isHighlighted ? 'text-red-600 font-bold bg-red-100 rounded' : highlight === 'data' ? 'text-blue-600 font-bold' : ''}`}>
                          {item.leaf}
                        </span>
                        {divider && (
                          <span className="relative inline-flex items-center mx-0.5">
                            <span className="w-0.5 h-8 bg-red-500"></span>
                            <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-red-600 text-xs font-bold whitespace-nowrap">
                              {divider.label}
                            </span>
                          </span>
                        )}
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
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-2 bg-slate-50 border-b border-slate-200 font-bold text-center text-slate-700">頻數表 (Frequency Table)</div>
      <table className="w-full text-sm text-center border-collapse">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="p-3 border-r border-b border-slate-300 font-bold">數值</th>
            {keys.map((k, i) => {
              const isMinMax = highlight === 'range' && (k === Math.min(...keys) || k === Math.max(...keys));
              return (
                <th 
                  key={k} 
                  className={`p-3 border-b border-slate-300 font-medium ${
                    isMinMax ? 'bg-red-100 text-red-700 font-bold' : ''
                  } ${i < keys.length - 1 ? 'border-r border-slate-200' : ''}`}
                >
                  {k}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr className={highlight === 'data' ? 'bg-blue-50' : ''}>
            <td className="p-3 border-r border-slate-300 font-bold bg-slate-50">頻數</td>
            {keys.map((k, i) => {
              const isMode = highlight === 'mode' && freq[k] === Math.max(...Object.values(freq));
              return (
                <td 
                  key={k} 
                  className={`p-3 ${
                    isMode ? 'bg-red-100 font-bold text-red-700' : ''
                  } ${i < keys.length - 1 ? 'border-r border-slate-200' : ''}`}
                >
                  {freq[k]}
                </td>
              );
            })}
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
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ================================================
// LV2 題目生成器和相關組件
// ================================================

const LV2_ITEM_CONTEXTS = [
  { label: '原子筆', unit: '支' },
  { label: '圖書', unit: '本' },
  { label: '計算機', unit: '部' },
  { label: '電話', unit: '部' },
  { label: '玩具', unit: '件' },
  { label: '文具', unit: '件' },
];

// LV2 Type A: 頻數表，已知平均數，求 n
const generateLV2FreqMeanN = () => {
  for (let attempt = 0; attempt < 300; attempt++) {
    const start = Math.floor(Math.random() * 4) + 1;
    const len = 4 + Math.floor(Math.random() * 2);
    const values = Array.from({ length: len }, (_, i) => start + i);
    const mean = start + Math.floor(Math.random() * (len - 1));
    const unknownIdx = Math.floor(Math.random() * len);
    const vk = values[unknownIdx];
    if (mean === vk) continue;
    const knownFreqs = values.map((_, i) => i === unknownIdx ? 0 : Math.floor(Math.random() * 8) + 3);
    const sumF = knownFreqs.reduce((a, b) => a + b, 0);
    const sumVF = values.reduce((s, v, i) => s + v * knownFreqs[i], 0);
    const denom = vk - mean;
    const numer = mean * sumF - sumVF;
    if (numer % denom !== 0) continue;
    const n = numer / denom;
    if (n < 2 || n > 15) continue;
    const ctx = LV2_ITEM_CONTEXTS[Math.floor(Math.random() * LV2_ITEM_CONTEXTS.length)];
    const meanSumF = mean * sumF;
    // Build expanded numerator: each known v*f product shown individually, unknown as vk*n
    const expandedNumer = values.map((v, i) =>
      i === unknownIdx ? `${vk}n` : String(v * knownFreqs[i])
    ).join(' + ');
    return {
      type: 'freq-mean-n',
      context: `下表顯示某班學生擁有${ctx.label}的數目的分佈`,
      xLabel: `${ctx.label}的數目（${ctx.unit}）`,
      values,
      displayFreqs: knownFreqs.map((f, i) => i === unknownIdx ? 'n' : String(f)),
      unknownIdx,
      mean,
      parts: [{
        label: '',
        question: '求 n 的值',
        answer: n,
        steps: [
          `\\dfrac{${expandedNumer}}{${sumF} + n} = ${mean}`,
          `\\dfrac{${sumVF} + ${vk}n}{${sumF} + n} = ${mean}`,
          `${sumVF} + ${vk}n = ${mean}(${sumF} + n)`,
          `${sumVF} + ${vk}n = ${meanSumF} + ${mean}n`,
          `n = ${n}`,
        ]
      }]
    };
  }
  return null;
};

// LV2 Type B: 頻數表，已知中位數，求 s 的最小/最大可取值
const generateLV2FreqMedianS = () => {
  for (let attempt = 0; attempt < 500; attempt++) {
    const start = Math.floor(Math.random() * 5) + 4;
    const values = [start, start + 1, start + 2, start + 3, start + 4];
    const medianVal = values[2];
    const unknownIdx = 3; // s after median → gives both min and max bounds
    const knownFreqs = values.map((_, i) => i === unknownIdx ? 0 : Math.floor(Math.random() * 8) + 3);
    const cB = knownFreqs[0] + knownFreqs[1]; // cumFreq below medianVal
    const cM = cB + knownFreqs[2];            // cumFreq up to medianVal
    const T = knownFreqs.reduce((a, b) => a + b, 0);
    // median = medianVal  ⟺  cB < (T+s)/2 ≤ cM
    const sMin = Math.max(1, 2 * cB - T + 1);
    const sMax = 2 * cM - T;
    if (sMax < sMin + 1 || sMax > 30) continue;
    const freqMedian = cM - cB; // frequency of medianVal group
    const ctx = LV2_ITEM_CONTEXTS[Math.floor(Math.random() * LV2_ITEM_CONTEXTS.length)];
    return {
      type: 'freq-median-s',
      context: `下表顯示某班學生擁有${ctx.label}的數目的分佈`,
      xLabel: `${ctx.label}的數目（${ctx.unit}）`,
      values,
      displayFreqs: knownFreqs.map((f, i) => i === unknownIdx ? 's' : String(f)),
      unknownIdx,
      medianVal,
      cB, cM, T,
      parts: [
        {
          label: '(a)',
          question: `求 s 的最小可取值`,
          answer: sMin,
          steps: [
            `\\text{想像全班按數目排隊：}`,
            `\\underbrace{\\text{前 }${cB}\\text{ 人}}_{\\leq ${values[1]}\\text{ ${ctx.unit}}} \\;\\Bigg|\\; \\underbrace{\\text{第 }${cB+1}\\text{–}${cM}\\text{ 人}}_{${medianVal}\\text{ ${ctx.unit}，共}${freqMedian}\\text{人}} \\;\\Bigg|\\; \\underbrace{\\text{後面 }s\\text{ 人}}_{${values[3]}\\text{ ${ctx.unit}}} \\;\\Bigg|\\; \\underbrace{\\text{最後 }${knownFreqs[4]}\\text{ 人}}_{${values[4]}\\text{ ${ctx.unit}}}`,
            `\\text{要中位數}=${medianVal}\\text{，正中間的人要站在第 }${cB+1}\\text{–}${cM}\\text{ 位}`,
            `\\text{如果 }s\\text{ 太少，全班人數太少，中間的人反而站在「}${values[1]}\\text{ ${ctx.unit}」組 → 中位數}\\neq ${medianVal}`,
            `\\text{全班共 }${T}+s\\text{ 人，正中間在第}\\dfrac{${T}+s}{2}\\text{位}`,
            `\\text{要讓中間位置}\\textbf{超過}\\text{前 }${cB}\\text{ 人：}\\dfrac{${T}+s}{2} > ${cB}`,
            `s > ${2*cB} - ${T} = ${2*cB-T}`,
            `\\therefore s\\text{ 的最小可取值是 }${sMin}`,
          ]
        },
        {
          label: '(b)',
          question: `寫出 s 的最大可取值`,
          answer: sMax,
          steps: [
            `\\text{如果 }s\\text{ 太多，中間的人(中位數)反而落入「}${values[3]}\\text{ ${ctx.unit}」組}\\neq ${medianVal}`,
            `\\text{要讓中間位置}\\textbf{不超過}\\text{第 }${cM}\\text{ 位：}\\dfrac{${T}+s}{2} \\leq ${cM}`,
            `s \\leq ${2*cM} - ${T} = ${sMax}`,
            `\\therefore s\\text{ 的最大可取值是 }${sMax}`,
          ]
        }
      ]
    };
  }
  return null;
};

// LV2 Type F: 頻數表，已知眾數，求 k 的最小/最大可取値
const generateLV2FreqModeK = () => {
  for (let attempt = 0; attempt < 300; attempt++) {
    const start = Math.floor(Math.random() * 3); // 0, 1, or 2
    const len = 4 + Math.floor(Math.random() * 2); // 4 or 5 values
    const values = Array.from({ length: len }, (_, i) => start + i);

    // mode index must not be first or last (so k at edge is more interesting)
    const modeIdx = 1 + Math.floor(Math.random() * (len - 2));
    const unknownIdx = Math.floor(Math.random() * len);
    if (unknownIdx === modeIdx) continue;

    const modeFreq = 7 + Math.floor(Math.random() * 5); // 7–11

    // All non-unknown, non-mode frequencies strictly less than modeFreq
    const knownFreqs = values.map((_, i) => {
      if (i === unknownIdx) return 0;
      if (i === modeIdx) return modeFreq;
      return 2 + Math.floor(Math.random() * (modeFreq - 2));
    });

    const kMin = 1;
    const kMax = modeFreq - 1;
    if (kMax < 2) continue;

    const ctx = LV2_ITEM_CONTEXTS[Math.floor(Math.random() * LV2_ITEM_CONTEXTS.length)];
    const modeVal = values[modeIdx];

    return {
      type: 'freq-mode-k',
      context: `下表顯示某班學生擁有${ctx.label}的數目的分佈`,
      xLabel: `${ctx.label}的數目（${ctx.unit}）`,
      values,
      displayFreqs: knownFreqs.map((f, i) => i === unknownIdx ? 'k' : String(f)),
      unknownIdx,
      modeVal,
      modeFreq,
      parts: [
        {
          label: '(i)',
          question: `若該分佈的眾數為 ${modeVal}，求 k 的最小可取値`,
          answer: kMin,
          steps: [
            `\\text{眾數} = ${modeVal} \\Rightarrow \\text{「${modeVal}\\text{」的頻數必須最大}}`,
            `\\text{「${modeVal}\\text{」}的頻數} = ${modeFreq}`,
            `k < ${modeFreq}\\text{（讓眾數保持為 }${modeVal}\\text{）}`,
            `k \\geq 1\\text{（k 為正整數）}`,
            `\\therefore k\\text{ 的最小可取值是 }${kMin}`,
          ],
        },
        {
          label: '(ii)',
          question: `若該分佈的眾數為 ${modeVal}，求 k 的最大可取値`,
          answer: kMax,
          steps: [
            `\\text{眾數} = ${modeVal} \\Rightarrow k < ${modeFreq}`,
            `k \\leq ${modeFreq} - 1 = ${kMax}`,
            `\\therefore k\\text{ 的最大可取值是 }${kMax}`,
          ],
        },
      ],
    };
  }
  return null;
};

// LV2 幹葉圖語境
const LV2_STEM_CONTEXTS = [
  '一群工人在某星期的工作時數（以小時為單位）',
  '某袋子內的信件的重量（以克為單位）',
  '某班學生在測驗中的分數（以分為單位）',
  '某公司職員的月薪（以千元為單位）',
  '某班同學某次數學測驗的成績（以分為單位）',
  '某超市每天的銷售量（以件為單位）',
];

// LV2 Type C: 幹葉圖有未知葉，已知分佈域，求未知值
const generateLV2StemLeafRange = () => {
  for (let attempt = 0; attempt < 300; attempt++) {
    const stemStart = 1 + Math.floor(Math.random() * 4);
    const numStems = 3 + Math.floor(Math.random() * 2);
    if (stemStart + numStems - 1 > 7) continue;
    const stems = Array.from({ length: numStems }, (_, i) => stemStart + i);

    // Generate 3-8 sorted leaves per stem
    const allLeaves = stems.map(() => {
      const count = 3 + Math.floor(Math.random() * 6);
      const leaves = Array.from({ length: count }, () => Math.floor(Math.random() * 10));
      return leaves.sort((a, b) => a - b);
    });

    const knownMin = stems[0] * 10 + allLeaves[0][0];
    const knownMax = stems[stems.length - 1] * 10 + allLeaves[stems.length - 1][allLeaves[stems.length - 1].length - 1];
    const unknownInFirst = Math.random() < 0.5;

    let unknownLeaf, actualMin, actualMax;

    if (unknownInFirst) {
      // a is inserted before all leaves of first stem → must be ≤ existing first leaf
      const maxPossibleLeaf = allLeaves[0][0];
      const loR = Math.max(15, knownMax - (stems[0] * 10 + maxPossibleLeaf));
      const hiR = Math.min(50, knownMax - stems[0] * 10);
      if (loR > hiR) continue;
      const rangeVal = loR + Math.floor(Math.random() * (hiR - loR + 1));
      actualMin = knownMax - rangeVal;
      unknownLeaf = actualMin - stems[0] * 10;
      if (unknownLeaf < 0 || unknownLeaf > maxPossibleLeaf) continue;
      actualMax = knownMax;
    } else {
      // w is appended after all leaves of last stem → must be ≥ existing last leaf
      const lastIdx = stems.length - 1;
      const minPossibleLeaf = allLeaves[lastIdx][allLeaves[lastIdx].length - 1];
      const loR = Math.max(15, stems[lastIdx] * 10 + minPossibleLeaf - knownMin);
      const hiR = Math.min(50, stems[lastIdx] * 10 + 9 - knownMin);
      if (loR > hiR) continue;
      const rangeVal = loR + Math.floor(Math.random() * (hiR - loR + 1));
      actualMax = knownMin + rangeVal;
      unknownLeaf = actualMax - stems[lastIdx] * 10;
      if (unknownLeaf < minPossibleLeaf || unknownLeaf > 9) continue;
      actualMin = knownMin;
    }

    const rangeVal = actualMax - actualMin;
    const varName = unknownInFirst ? 'a' : 'w';
    const ctx = LV2_STEM_CONTEXTS[Math.floor(Math.random() * LV2_STEM_CONTEXTS.length)];

    const displayLeaves = allLeaves.map((leaves, si) => {
      if (si === 0 && unknownInFirst) return [varName, ...leaves];
      if (si === stems.length - 1 && !unknownInFirst) return [...leaves, varName];
      return [...leaves];
    });

    const steps = unknownInFirst ? [
      `\\text{分佈域} = \\text{最大值} - \\text{最小值}`,
      `${rangeVal} = ${actualMax} - \\text{最小值}`,
      `\\text{最小值} = ${actualMax} - ${rangeVal}`,
      `\\text{最小值} = ${actualMin}`,
      `\\therefore ${varName} = ${unknownLeaf}`,
    ] : [
      `\\text{分佈域} = \\text{最大值} - \\text{最小值}`,
      `${rangeVal} = \\text{最大值} - ${actualMin}`,
      `\\text{最大值} = ${actualMin} + ${rangeVal}`,
      `\\text{最大值} = ${actualMax}`,
      `\\therefore ${varName} = ${unknownLeaf}`,
    ];

    return {
      type: 'stem-leaf-unknown',
      context: `下面的幹葉圖顯示${ctx}`,
      stems,
      displayLeaves,
      varName,
      rangeVal,
      parts: [{
        label: '',
        question: `已知該分佈的分佈域為 ${rangeVal}，求 ${varName} 的值`,
        answer: unknownLeaf,
        steps,
      }],
    };
  }
  return null;
};

// LV2 Type D: 幹葉圖有未知葉，分佈域 = k × IQR
const generateLV2StemLeafIQR = () => {
  // 與 MathUtils.quartiles 一致的 IQR 計算
  const computeIQR = (sorted) => {
    const n = sorted.length;
    const mid = Math.floor(n / 2);
    const lower = sorted.slice(0, mid);
    const upper = n % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);
    const medOf = arr => arr.length % 2 !== 0
      ? arr[Math.floor(arr.length / 2)]
      : (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2;
    return { q1: medOf(lower), q3: medOf(upper) };
  };

  for (let attempt = 0; attempt < 500; attempt++) {
    const stemStart = 1 + Math.floor(Math.random() * 4);
    const numStems = 3 + Math.floor(Math.random() * 2);
    if (stemStart + numStems - 1 > 7) continue;
    const stems = Array.from({ length: numStems }, (_, i) => stemStart + i);

    const allLeaves = stems.map(() => {
      const count = 3 + Math.floor(Math.random() * 5);
      return Array.from({ length: count }, () => Math.floor(Math.random() * 10)).sort((a, b) => a - b);
    });

    const allData = stems.flatMap((s, si) => allLeaves[si].map(l => s * 10 + l));
    const knownMin = allData[0];
    const knownMax = allData[allData.length - 1];
    const { q1, q3 } = computeIQR(allData);
    const iqr = q3 - q1;
    if (iqr <= 0 || !Number.isInteger(iqr)) continue;

    const k = 2 + Math.floor(Math.random() * 3); // k = 2, 3, or 4
    const rangeVal = k * iqr;
    const unknownInFirst = Math.random() < 0.5;
    let unknownLeaf, actualMin, actualMax, varName;

    if (unknownInFirst) {
      actualMin = knownMax - rangeVal;
      actualMax = knownMax;
      unknownLeaf = actualMin - stems[0] * 10;
      varName = 'a';
      if (unknownLeaf < 0 || unknownLeaf > allLeaves[0][0]) continue;
      // Verify IQR stays the same after inserting unknown at min
      const newData = [actualMin, ...allData];
      const { q1: nq1, q3: nq3 } = computeIQR(newData);
      if (nq3 - nq1 !== iqr) continue;
    } else {
      actualMax = knownMin + rangeVal;
      actualMin = knownMin;
      unknownLeaf = actualMax - stems[stems.length - 1] * 10;
      varName = 'w';
      if (unknownLeaf < allLeaves[stems.length - 1][allLeaves[stems.length - 1].length - 1] || unknownLeaf > 9) continue;
      const newData = [...allData, actualMax];
      const { q1: nq1, q3: nq3 } = computeIQR(newData);
      if (nq3 - nq1 !== iqr) continue;
    }

    const ctx = LV2_STEM_CONTEXTS[Math.floor(Math.random() * LV2_STEM_CONTEXTS.length)];
    const displayLeaves = allLeaves.map((leaves, si) => {
      if (si === 0 && unknownInFirst) return [varName, ...leaves];
      if (si === stems.length - 1 && !unknownInFirst) return [...leaves, varName];
      return [...leaves];
    });

    const steps = unknownInFirst ? [
      `\\text{四分位數間距} = Q_3 - Q_1 = ${q3} - ${q1} = ${iqr}`,
      `\\text{分佈域} = ${k} \\times \\text{四分位數間距} = ${k} \\times ${iqr} = ${rangeVal}`,
      `\\text{分佈域} = \\text{最大值} - \\text{最小值}`,
      `${rangeVal} = ${actualMax} - \\text{最小值}`,
      `\\text{最小值} = ${actualMax} - ${rangeVal} = ${actualMin}`,
      `\\therefore ${varName} = ${unknownLeaf}`,
    ] : [
      `\\text{四分位數間距} = Q_3 - Q_1 = ${q3} - ${q1} = ${iqr}`,
      `\\text{分佈域} = ${k} \\times \\text{四分位數間距} = ${k} \\times ${iqr} = ${rangeVal}`,
      `\\text{分佈域} = \\text{最大值} - \\text{最小值}`,
      `${rangeVal} = \\text{最大值} - ${actualMin}`,
      `\\text{最大值} = ${actualMin} + ${rangeVal} = ${actualMax}`,
      `\\therefore ${varName} = ${unknownLeaf}`,
    ];

    return {
      type: 'stem-leaf-unknown',
      context: `下面的幹葉圖顯示${ctx}`,
      stems,
      displayLeaves,
      varName,
      parts: [{
        label: '',
        question: `已知該分佈的分佈域為其四分位數間距的 ${k} 倍，求 ${varName} 的值`,
        answer: unknownLeaf,
        steps,
      }],
    };
  }
  return null;
};

// LV2 框線圖語境
const LV2_BOX_CONTEXTS = [
  '某公司 X 組文員的年齡',
  '某班學生的數學測驗成績（以分為單位）',
  '某公司員工的月薪（以千元為單位）',
  '某校男生的身高（以厘米為單位）',
  '某超市每日售出商品件數',
  '某班學生的體重（以千克為單位）',
];

// LV2 Type E: 框線圖，部分數值未知（a, b），已知分佈域及四分位數間距，求未知值
// 4 valid variants: {min,Q1}, {min,Q3}, {Q1,max}, {Q3,max}
const generateLV2BoxPlot = () => {
  // Defines all 4 solvable two-unknown combos
  const VARIANTS = [
    {
      unknownLabels: (v) => ({ min: 'a', q1: 'b' }),
      parts: (v) => [
        { label: '(a)', question: '求 a 的值', answer: v.min, steps: [
          `\\text{分佈域} = \\text{最大值} - \\text{最小值}`,
          `${v.max} - a = ${v.range}`,
          `a = ${v.min}`,
        ]},
        { label: '(b)', question: '求 b 的值', answer: v.q1, steps: [
          `\\text{四分位數間距} = Q_3 - Q_1`,
          `${v.q3} - b = ${v.iqr}`,
          `b = ${v.q1}`,
        ]},
      ],
    },
    {
      unknownLabels: (v) => ({ min: 'a', q3: 'b' }),
      parts: (v) => [
        { label: '(a)', question: '求 a 的值', answer: v.min, steps: [
          `\\text{分佈域} = \\text{最大值} - \\text{最小值}`,
          `${v.max} - a = ${v.range}`,
          `a = ${v.min}`,
        ]},
        { label: '(b)', question: '求 b 的值', answer: v.q3, steps: [
          `\\text{四分位數間距} = Q_3 - Q_1`,
          `b - ${v.q1} = ${v.iqr}`,
          `b = ${v.q3}`,
        ]},
      ],
    },
    {
      unknownLabels: (v) => ({ q1: 'a', max: 'b' }),
      parts: (v) => [
        { label: '(a)', question: '求 a 的值', answer: v.q1, steps: [
          `\\text{四分位數間距} = Q_3 - Q_1`,
          `${v.q3} - a = ${v.iqr}`,
          `a = ${v.q1}`,
        ]},
        { label: '(b)', question: '求 b 的值', answer: v.max, steps: [
          `\\text{分佈域} = \\text{最大值} - \\text{最小值}`,
          `b - ${v.min} = ${v.range}`,
          `b = ${v.max}`,
        ]},
      ],
    },
    {
      unknownLabels: (v) => ({ q3: 'a', max: 'b' }),
      parts: (v) => [
        { label: '(a)', question: '求 a 的值', answer: v.q3, steps: [
          `\\text{四分位數間距} = Q_3 - Q_1`,
          `a - ${v.q1} = ${v.iqr}`,
          `a = ${v.q3}`,
        ]},
        { label: '(b)', question: '求 b 的值', answer: v.max, steps: [
          `\\text{分佈域} = \\text{最大值} - \\text{最小值}`,
          `b - ${v.min} = ${v.range}`,
          `b = ${v.max}`,
        ]},
      ],
    },
  ];

  for (let attempt = 0; attempt < 300; attempt++) {
    const min = 15 + Math.floor(Math.random() * 25);
    const q1  = min + 5  + Math.floor(Math.random() * 15);
    const q2  = q1  + 3  + Math.floor(Math.random() * 12);
    const q3  = q2  + 3  + Math.floor(Math.random() * 12);
    const max = q3  + 5  + Math.floor(Math.random() * 20);
    const range = max - min;
    const iqr   = q3 - q1;
    if (iqr <= 5 || range <= iqr || range > 80) continue;

    const ctx = LV2_BOX_CONTEXTS[Math.floor(Math.random() * LV2_BOX_CONTEXTS.length)];
    const variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    const vals = { min, q1, q2, q3, max, range, iqr };

    return {
      type: 'box-plot-unknown',
      context: `下面的框線圖顯示${ctx}的分佈`,
      min, q1, q2, q3, max, range, iqr,
      unknownLabels: variant.unknownLabels(vals),
      conditionText: `已知該分佈的分佈域及四分位數間距分別為 ${range} 及 ${iqr}`,
      parts: variant.parts(vals),
    };
  }
  return null;
};

// 題型生成器陣列 — 新增題型時只需在此加入新函數
const LV2_GENERATORS = [
  generateLV2FreqMeanN,
  generateLV2FreqMedianS,
  generateLV2StemLeafRange,
  generateLV2StemLeafIQR,
  generateLV2BoxPlot,
  generateLV2FreqModeK,
];

// 隨機生成一個 LV2 題目（從所有題型中平均隨機選取）
const generateLV2Question = () => {
  const startIdx = Math.floor(Math.random() * LV2_GENERATORS.length);
  for (let i = 0; i < LV2_GENERATORS.length; i++) {
    const gen = LV2_GENERATORS[(startIdx + i) % LV2_GENERATORS.length];
    const q = gen();
    if (q) return q;
  }
  // 最後保底（理論上不會到達）
  return generateLV2FreqMeanN();
};

// LV2 頻數表顯示元件
const LV2FreqTableDisplay = ({ xLabel, values, displayFreqs, unknownIdx }) => (
  <div className="overflow-x-auto my-3">
    <table className="border-collapse mx-auto text-sm sm:text-base">
      <thead>
        <tr>
          <th className="border border-gray-400 px-4 py-2 font-bold text-center bg-blue-50 text-blue-800 min-w-[120px]">
            {xLabel}
          </th>
          {values.map(v => (
            <th key={v} className="border border-gray-400 px-4 py-2 text-center font-bold bg-blue-50">{v}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-400 px-4 py-2 font-bold text-center bg-blue-50 text-blue-800">學生人數</td>
          {displayFreqs.map((f, i) => (
            <td key={i} className={`border border-gray-400 px-3 py-2 text-center font-bold ${
              i === unknownIdx ? 'bg-amber-100 text-amber-700 italic text-lg' : ''
            }`}>
              {f}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);

// LV2 幹葉圖顯示元件（仿 LV1 幹葉圖格式）
const LV2StemLeafDisplay = ({ stems, displayLeaves, varName }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 font-mono flex flex-col items-center my-3">
    <h3 className="font-bold text-slate-700 mb-2">幹葉圖 (Stem-and-Leaf Diagram)</h3>
    <table className="border-collapse">
      <thead>
        <tr className="text-slate-500 text-sm border-b border-slate-400">
          <th className="pr-2 text-right border-r-2 border-slate-400 pb-1">幹（十位）</th>
          <th className="pl-2 text-left pb-1">葉（個位）</th>
        </tr>
      </thead>
      <tbody>
        {stems.map((stem, si) => (
          <tr key={stem} className="hover:bg-slate-50">
            <td className="pr-2 text-right border-r-2 border-slate-400 font-bold text-lg py-1">{stem}</td>
            <td className="pl-2 text-left">
              <span className="text-lg flex items-center gap-0">
                {displayLeaves[si].map((leaf, li) => (
                  <span
                    key={li}
                    className={`inline-block w-6 text-center ${String(leaf) === varName
                      ? 'font-bold italic text-amber-700 bg-amber-100 rounded'
                      : ''}`}
                  >
                    {leaf}
                  </span>
                ))}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-4 text-xs text-slate-500">
      Key: {stems[0]} | {displayLeaves[0].find(l => String(l) !== varName) ?? varName} = {stems[0]}{displayLeaves[0].find(l => String(l) !== varName) ?? varName}
    </div>
  </div>
);

// LV2 框線圖顯示元件
const LV2BoxPlotDisplay = ({ min, q1, q2, q3, max, unknownLabels = {} }) => {
  const padding = 50;
  const svgWidth = 500;
  const axisY = 128;
  const boxTop = 78;
  const boxBottom = 118;
  const midY = (boxTop + boxBottom) / 2;

  const span = max - min;
  const svgMin = min - span * 0.12;
  const svgMax = max + span * 0.12;
  const scale = (v) => ((v - svgMin) / (svgMax - svgMin)) * (svgWidth - 2 * padding) + padding;

  const getLabel = (key, val) => unknownLabels[key] !== undefined ? unknownLabels[key] : String(val);
  const isUnknown = (key) => unknownLabels[key] !== undefined;

  const positions = [
    { key: 'min', val: min },
    { key: 'q1',  val: q1  },
    { key: 'q2',  val: q2  },
    { key: 'q3',  val: q3  },
    { key: 'max', val: max },
  ];

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 my-3">
      <svg viewBox={`0 0 ${svgWidth} 165`} className="w-full">
        {/* Axis */}
        <line x1={padding - 15} y1={axisY} x2={svgWidth - padding + 15} y2={axisY} stroke="#94a3b8" strokeWidth="2" />
        {/* Whiskers */}
        <line x1={scale(min)} y1={midY} x2={scale(q1)} y2={midY} stroke="#3b82f6" strokeWidth="2" />
        <line x1={scale(q3)} y1={midY} x2={scale(max)} y2={midY} stroke="#3b82f6" strokeWidth="2" />
        {/* Min/Max caps */}
        <line x1={scale(min)} y1={boxTop + 5} x2={scale(min)} y2={boxBottom - 5} stroke="#3b82f6" strokeWidth="2" />
        <line x1={scale(max)} y1={boxTop + 5} x2={scale(max)} y2={boxBottom - 5} stroke="#3b82f6" strokeWidth="2" />
        {/* Box */}
        <rect x={scale(q1)} y={boxTop} width={scale(q3) - scale(q1)} height={boxBottom - boxTop}
          fill="white" stroke="#3b82f6" strokeWidth="2" />
        {/* Median */}
        <line x1={scale(q2)} y1={boxTop} x2={scale(q2)} y2={boxBottom} stroke="#3b82f6" strokeWidth="2" />
        {/* Tick marks and labels */}
        {positions.map(({ key, val }) => (
          <g key={key}>
            <line x1={scale(val)} y1={axisY - 4} x2={scale(val)} y2={axisY + 4} stroke="#64748b" strokeWidth="1.5" />
            <text
              x={scale(val)} y={axisY + 20}
              textAnchor="middle"
              fontSize="13"
              fill={isUnknown(key) ? '#d97706' : '#334155'}
              fontStyle={isUnknown(key) ? 'italic' : 'normal'}
              fontWeight={isUnknown(key) ? 'bold' : 'normal'}
            >
              {getLabel(key, val)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// LV2 單行 KaTeX 渲染元件（module-level，可使用 hooks）
const LV2KatexLine = ({ math }) => {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { loadKatexOnce().then(() => setLoaded(true)); }, []);
  useEffect(() => {
    if (!loaded || !window.katex || !ref.current) return;
    try {
      window.katex.render(math, ref.current, { displayMode: true, throwOnError: false });
    } catch (e) { if (ref.current) ref.current.innerText = math; }
  }, [math, loaded]);
  return <div ref={ref} className="my-0.5 text-center" />;
};

const LV2StepsDisplay = ({ steps }) => (
  <div>
    {steps.map((s, i) => <LV2KatexLine key={i} math={s} />)}
  </div>
);

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
  const navigate = useNavigate();
  const [mode, setMode] = useState('menu'); // menu, quiz, learn
  const [currentChart, setCurrentChart] = useState(null); // box, stem, bar, table
  const [currentMeasure, setCurrentMeasure] = useState(null);
  const [data, setData] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'wrong' | 'hint', msg: '', detail: '' }
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [highlight, setHighlight] = useState(null);

  // LV2 state
  const [quizLevel, setQuizLevel] = useState(null); // null | 'lv1' | 'lv2'
  const [lv2Q, setLv2Q] = useState(null);
  const [lv2SubPart, setLv2SubPart] = useState(0);
  const [lv2SubAnswered, setLv2SubAnswered] = useState(false);
  const [lv2Feedback, setLv2Feedback] = useState(null);
  const [lv2Score, setLv2Score] = useState(0);
  const [lv2Total, setLv2Total] = useState(0);
  const lv2InputRef = useRef(null);

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
            detail: `正確答案是：${formatAnswer(correct)}`,
            detailJSX: <ModeExplanation data={data} correctModes={[...correct].sort((a,b)=>a-b)} chartType={currentChart} />
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

      // 必須與顯示答案（3位有效數字）完全吻合，不設誤差
      if (user === parseFloat(formatAnswer(correct))) {
        setFeedback({ type: 'correct', msg: '答對了！太棒了！', detail: '' });
        setScore(s => s + 1);
        setTotalQuestions(t => t + 1);
      } else {
        let explanation = "";
        let explanationJSX = null;
        if (currentMeasure.id === 'mean') explanationJSX = <MeanSteps data={data} mean={formatAnswer(correct)} chartType={currentChart} />;
        if (currentMeasure.id === 'range') explanation = `分佈域 = 最大值 (${Math.max(...data)}) - 最小值 (${Math.min(...data)})`;
        if (currentMeasure.id === 'iqr') {
          explanationJSX = <IQRExplanation data={data} chartType={currentChart} />;
        }
        if (currentMeasure.id === 'variance') {
          const sd = MathUtils.stdDev(data);
          explanationJSX = <CalcSDSteps isVariance={true} sigmaValue={parseFloat(sd.toFixed(4))} data={data} chartType={currentChart} />;
        }
        if (currentMeasure.id === 'stdDev') {
          explanationJSX = <CalcSDSteps isVariance={false} sigmaValue={Number(parseFloat(correct).toPrecision(3))} data={data} chartType={currentChart} />;
        }
        if (currentMeasure.id === 'median') explanationJSX = <MedianExplanation data={data} chartType={currentChart} />;

        setFeedback({ 
          type: 'wrong', 
          msg: '答案不正確', 
          detail: (explanation && !explanationJSX) ? `正確答案是 ${formatAnswer(correct)}。\n${explanation}` : `正確答案是 ${formatAnswer(correct)}。`,
          detailJSX: explanationJSX
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
    } else if (currentMeasure.id === 'stdDev') {
      setHighlight('data');
      hintMsg = "提示：使用計算機 SD Mode 計算標準差。";
      setFeedback({ type: 'hint', msg: hintMsg, hintJSX: <CalcSDSteps data={data} chartType={currentChart} isVariance={false} sigmaValue={Number(parseFloat(MathUtils.stdDev(data)).toPrecision(3))} /> });
      return;
    } else if (currentMeasure.id === 'variance') {
      setHighlight('data');
      hintMsg = "提示：方差 = (標準差)²，先用計算機求標準差，再平方。";
      setFeedback({ type: 'hint', msg: hintMsg, hintJSX: <CalcSDSteps data={data} chartType={currentChart} isVariance={true} sigmaValue={parseFloat(MathUtils.stdDev(data).toFixed(4))} /> });
      return;
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
          <p className="text-slate-500">掌握平均數、中位數、眾數、方差、標準差、四分位數間距</p>
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
          onClick={() => { setMode('quiz'); setQuizLevel(null); }}
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

      {/* Score Display */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="text-lg">
            <span className="text-slate-600">題目數：</span>
            <span className="font-bold text-blue-600">
              {totalQuestions}
            </span>
          </div>
          <div className="text-lg">
            <span className="text-slate-600">得分：</span>
            <span className="font-bold text-green-600">
              {score} / {totalQuestions > 0 ? totalQuestions : '-'}
            </span>
          </div>
        </div>
      </div>

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
              
              {/* Hint Display */}
              {feedback?.type === 'hint' && (
                <div className="mt-2 w-full">
                  <div className="p-3 bg-amber-50 text-amber-800 text-sm rounded border border-amber-200 flex items-start gap-2 animate-fadeIn whitespace-pre-line">
                    <div className="mt-1"><HelpCircle size={14} /></div>
                    <div>{feedback.msg}</div>
                  </div>
                  {feedback.hintJSX && (
                    <div className="mt-2">{feedback.hintJSX}</div>
                  )}
                </div>
              )}
              
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
              {feedback.detailJSX ? (
                <div className="w-full mb-4">{feedback.detailJSX}</div>
              ) : feedback.detail && (
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
    const [selectedSection, setSelectedSection] = useState('charts'); // 'charts' | 'standard-score'

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
      let dividerIndices = []; // 分隔线位置
      let highlightColors = {}; // 用於IQR的顏色编码
      
      const n = learnData.length;
      const sorted = [...learnData].sort((a, b) => a - b);
      const mid = Math.floor(n / 2);
      
      if (selectedChart === 'stem' && learnHighlight === 'median') {
        // 中位數：高亮中間的一個或兩個數的位置
        if (n % 2 === 0) {
          // 偶數個：在中間兩個數之間加分隔线
          dividerIndices.push({ afterIndex: mid - 1, label: '中位數' });
        } else {
          // 奇數個：高亮第 mid 個位置
          highlightIndices = [mid];
        }
      } else if (selectedChart === 'stem' && learnHighlight === 'mode') {
        // 眾數：高亮所有眾數的位置
        const modes = MathUtils.mode(learnData);
        if (modes.length > 0) {
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
        // 四分位數間距：
        // 數據分成上下兩部分（以中位數為界）
        // - 下半部分（中位數前）的數字加黃色highlight
        // - 上半部分（中位數後）的數字加綠色highlight
        // - 無論數據量單雙都顯示Q1、中位數、Q3的分隔線
        
        let lowerHalf = sorted.slice(0, mid);
        let upperHalf = n % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);
        
        // 對下半部分中位數前的所有數字加黃色
        lowerHalf.forEach((val, idx) => {
          highlightColors[idx] = 'yellow';
        });
        
        // 對上半部分（中位數後）的所有數字加綠色
        const upperStartIndex = n % 2 === 0 ? mid : mid + 1;
        upperHalf.forEach((val, idx) => {
          highlightColors[upperStartIndex + idx] = 'green';
        });
        
        // 如果數據量是單數，中位數需要有紅色highlight及"中位數"標記
        if (n % 2 !== 0) {
          highlightIndices.push(mid); // 中位數位置加紅色highlight
        }
        
        // 計算Q1和Q3位置並添加分隔線標記
        const lowerLen = lowerHalf.length;
        const upperLen = upperHalf.length;
        const lowerMid = Math.floor(lowerLen / 2);
        const upperMid = Math.floor(upperLen / 2);
        
        // Q1 位置（下半部分的中位數）- 無論奇偶都添加
        if (lowerLen % 2 === 0) {
          // 偶數個：Q1 在兩個數中間
          dividerIndices.push({ afterIndex: lowerMid - 1, label: 'Q₁' });
        } else {
          // 奇數個：Q1 直接是某個數（該數後面加分隔線）
          dividerIndices.push({ afterIndex: lowerMid, label: 'Q₁' });
        }
        
        // 中位數位置 - 無論奇偶都添加
        if (n % 2 === 0) {
          // 偶數個：中位數在兩個數中間
          dividerIndices.push({ afterIndex: mid - 1, label: '中位數' });
        } else {
          // 奇數個：中位數已經有紅色highlight，分隔線在中位數後面
          dividerIndices.push({ afterIndex: mid, label: '中位數' });
        }
        
        // Q3 位置（上半部分的中位數）- 無論奇偶都添加
        const upperStartIndexForQ = n % 2 === 0 ? mid : mid + 1;
        if (upperLen % 2 === 0) {
          // 偶數個：Q3 在兩個數中間
          dividerIndices.push({ afterIndex: upperStartIndexForQ + upperMid - 1, label: 'Q₃' });
        } else {
          // 奇數個：Q3 直接是某個數（該數後面加分隔線）
          dividerIndices.push({ afterIndex: upperStartIndexForQ + upperMid, label: 'Q₃' });
        }
      }
      
      if (selectedChart === 'box') return <BoxPlot data={learnData} highlight={learnHighlight} />;
      if (selectedChart === 'stem') return <StemLeafPlot data={learnData} highlight={learnHighlight} highlightIndices={highlightIndices} highlightColors={highlightColors} dividerIndices={dividerIndices} />;
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
            <h3 className="font-bold text-slate-700 mb-2 px-2">選擇圖表類別:</h3>
            <div className="space-y-2">
              {Object.entries(chartTypes).map(([key, chart]) => (
                <button
                  key={key}
                  onClick={() => { setSelectedSection('charts'); handleChartSelect(key); }}
                  className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedSection === 'charts' && selectedChart === key
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {chart.name}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h3 className="font-bold text-slate-700 mb-2 px-2">其他概念:</h3>
              <button
                onClick={() => setSelectedSection('standard-score')}
                className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedSection === 'standard-score'
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                標準分 (Standard Score)
              </button>
              <button
                onClick={() => setSelectedSection('cumulative-freq')}
                className={`w-full tracking-tighter text-left p-3 rounded-lg text-sm font-medium transition-colors mt-2 ${
                  selectedSection === 'cumulative-freq'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                累積頻數分佈表 (Cumulative)
              </button>
            </div>
          </div>

          {/* 右側主內容 */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedSection === 'standard-score' ? (
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">標準分 (Standard Score)</h2>
                {/* 定義 */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-4">
                  <p className="text-slate-700 text-base leading-relaxed">
                    標準分提供在群體中某人大概的<span className="font-bold text-indigo-700">排名位置</span>，包括平均之上/下。
                  </p>
                </div>
                {/* 公式 */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-4">
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-wide mb-4">公式</p>
                  {/* 手寫風格公式佈局 */}
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    {/* 左：標準分(z) = */}
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-slate-700">標準分</span>
                      <span className="text-base text-green-600 font-bold">(z)</span>
                      <span className="text-lg font-bold text-slate-700 mx-1">=</span>
                    </div>
                    {/* 右：分數 */}
                    <div className="flex flex-col items-center">
                      {/* 分子 */}
                      <div className="flex items-center gap-1 border-b-2 border-slate-700 pb-1 px-2">
                        <span className="text-base font-bold text-slate-700">某學生的分數</span>
                        <span className="text-sm text-green-600 font-bold">(x)</span>
                        <span className="text-base font-bold text-slate-700 mx-1">−</span>
                        <span className="text-base font-bold text-slate-700">平均分數</span>
                        <span className="text-sm text-green-600 font-bold">(x̄)</span>
                      </div>
                      {/* 分母 */}
                      <div className="flex items-center gap-1 pt-1 px-2">
                        <span className="text-base font-bold text-slate-700">標準差</span>
                        <span className="text-sm text-green-600 font-bold">(σ)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-4 text-center">當中有 3 個數已提供，代入公式求未知的數</p>
                </div>
                {/* 正負意義 */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
                  <div className="bg-slate-800 text-white px-5 py-3 font-bold">標準分的意義</div>
                  <div className="divide-y divide-slate-100">
                    <div className="flex items-center gap-4 px-5 py-4">
                      <span className="text-2xl font-black text-red-500 w-10 text-center">−</span>
                      <div>
                        <p className="font-bold text-slate-700">標準分為<span className="text-red-500">負數</span></p>
                        <p className="text-sm text-slate-500 mt-0.5">差過平均（Below Average）→ 後半排名</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 px-5 py-4">
                      <span className="text-2xl font-black text-green-500 w-10 text-center">+</span>
                      <div>
                        <p className="font-bold text-slate-700">標準分為<span className="text-green-600">正數</span></p>
                        <p className="text-sm text-slate-500 mt-0.5">好過平均（Above Average）→ 前半排名</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 px-5 py-4">
                      <span className="text-2xl font-black text-blue-500 w-10 text-center">0</span>
                      <div>
                        <p className="font-bold text-slate-700">標準分為 <span className="text-blue-500">0</span></p>
                        <p className="text-sm text-slate-500 mt-0.5">剛好等於平均分</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 例題 */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <p className="font-bold text-amber-800 mb-3">例題</p>
                  <p className="text-slate-700 text-sm mb-3">某次測驗的平均分為 60 分，標準差為 8 分。小明得 76 分，求小明的標準分。</p>
                  <LV2KatexLine math={`z = \\dfrac{76 - 60}{8} = \\dfrac{16}{8} = 2`} />
                  <p className="text-sm text-slate-600 mt-2">標準分為 2，即小明的成績比平均高出 2 個標準差，排名在前半。</p>
                </div>
              </div>
            ) : selectedSection === 'cumulative-freq' ? (
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">累積頻數分佈表</h2>
                {/* 概念說明 */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-4">
                  <p className="text-slate-700 text-base leading-relaxed mb-4">
                    累積頻數分佈表（Cumulative Frequency Distribution Table）是用來記錄「某個數值以下」的數據總數。
                  </p>
                  <ul className="list-disc pl-5 text-slate-700 space-y-2">
                    <li><span className="font-bold text-indigo-700">頻數 (Frequency)</span>：該組別的數量</li>
                    <li><span className="font-bold text-emerald-700">累積頻數 (Cumulative Frequency)</span>：由第一組加到該組別的<span className="font-bold">總數</span></li>
                  </ul>
                </div>
                
                {/* 關係圖解 */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-4">
                  <p className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-4">如何找未知數 (Z字加法 vs 逆向減法)</p>
                  
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6">
                    {/* 簡化表 */}
                    <table className="border-collapse bg-white shadow-sm text-center text-sm md:text-base">
                      <thead>
                        <tr>
                          <th className="border border-slate-300 px-4 py-2 bg-slate-100 font-bold">組別</th>
                          <th className="border border-slate-300 px-4 py-2 bg-slate-100 font-bold text-indigo-600">頻數</th>
                          <th className="border border-slate-300 px-4 py-2 bg-slate-100 font-bold text-emerald-600">累積頻數</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 px-4 py-2">第1組</td>
                          <td className="border border-slate-300 px-4 py-2 text-indigo-700 font-bold">3 <span className="text-xs text-slate-400 font-normal ml-1">(a)</span></td>
                          <td className="border border-slate-300 px-4 py-2 text-emerald-700 font-bold bg-emerald-100/50">3</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 px-4 py-2">第2組</td>
                          <td className="border border-slate-300 px-4 py-2 text-indigo-700 font-bold bg-indigo-50">9</td>
                          <td className="border border-slate-300 px-4 py-2 text-emerald-700 font-bold bg-emerald-100/50">12 <span className="text-xs text-slate-400 font-normal ml-1">(x)</span></td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 px-4 py-2">第3組</td>
                          <td className="border border-slate-300 px-4 py-2 text-indigo-700 font-bold bg-indigo-50">5 <span className="text-xs text-slate-400 font-normal ml-1">(b)</span></td>
                          <td className="border border-slate-300 px-4 py-2 text-emerald-700 font-bold">17 <span className="text-xs text-slate-400 font-normal ml-1">(y)</span></td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 px-4 py-2">第4組</td>
                          <td className="border border-slate-300 px-4 py-2 text-indigo-700 font-bold">3</td>
                          <td className="border border-slate-300 px-4 py-2 text-emerald-700 font-bold">20</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/80 p-4 rounded-lg border border-emerald-100">
                      <p className="font-bold text-slate-800 mb-1">技巧 1：第一組相等</p>
                      <p className="text-sm text-slate-600 mb-2">第一組的「頻數」必定等於它的「累積頻數」。</p>
                      <LV2KatexLine math={`a = 3`} />
                    </div>
                    <div className="bg-white/80 p-4 rounded-lg border border-emerald-100">
                      <p className="font-bold text-slate-800 mb-1">技巧 2：Z字加法 (用來求累積頻數)</p>
                      <p className="text-sm text-slate-600 mb-2"><span className="text-emerald-600 font-bold">上一行累積頻數</span> + <span className="text-indigo-600 font-bold">本行頻數</span> = <span className="text-emerald-600 font-bold">本行累積頻數</span></p>
                      <LV2KatexLine math={`3 + 9 = x \\implies x = 12`} />
                    </div>
                    <div className="bg-white/80 p-4 rounded-lg border border-emerald-100">
                      <p className="font-bold text-slate-800 mb-1">技巧 3：逆向減法 (用來求頻數)</p>
                      <p className="text-sm text-slate-600 mb-2"><span className="text-emerald-600 font-bold">本行累積頻數</span> − <span className="text-emerald-600 font-bold">上一行累積頻數</span> = <span className="text-indigo-600 font-bold">本行頻數</span></p>
                      <LV2KatexLine math={`y - 12 = b \\quad \\text{(還差 y 未知)}`} />
                      <LV2KatexLine math={`20 - 3 = y \\implies y = 17 \\quad \\text{(從最尾推回去)}`} />
                      <LV2KatexLine math={`17 - 12 = b \\implies b = 5`} />
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedChart && learnData.length > 0 ? (
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
                            <MeanSteps data={learnData} mean={formatAnswer(MathUtils.mean(learnData))} chartType={selectedChart} />
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
                              先找中位數，<b>中位數 = {formatAnswer(MathUtils.median(learnData))}</b><br/>
                              <br/>
                              然後以中位數標記的左右分成兩部份，再在上半部份找出中間的數字 (即Q<sub>3</sub>)；在下半部份找出中間的數字（即Q<sub>1</sub>)。<br/>
                              <br/>
                              四分位數間距 = 上四分位數(Q<sub>3</sub>) - 下四分位數(Q<sub>1</sub>)。<br/>
                              排序後的數據：{[...learnData].sort((a,b) => a-b).join(', ')}<br/>
                              <code>上四分位數 (Q<sub>3</sub>) = {formatAnswer(MathUtils.quartiles(learnData).q3)}，下四分位數 (Q<sub>1</sub>) = {formatAnswer(MathUtils.quartiles(learnData).q1)}</code><br/>
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
                            <CalcSDSteps isVariance={true} sigmaValue={parseFloat(MathUtils.stdDev(learnData).toFixed(4))} data={learnData} chartType={selectedChart} />
                          )}
                          {selectedStat === 'stdDev' && (
                            <CalcSDSteps isVariance={false} sigmaValue={Number(parseFloat(MathUtils.stdDev(learnData)).toPrecision(3))} data={learnData} chartType={selectedChart} />
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


  // --- 難度選擇畫面 ---
  const LevelSelectView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <Link to="/" className="text-slate-500 hover:text-slate-700 flex items-center gap-2">
          <HomeIcon size={20} />
          <span className="text-sm">返回首頁</span>
        </Link>
        <span className="font-bold text-slate-700">高中統計特訓</span>
        <button onClick={() => setMode('menu')} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm">
          <RotateCcw size={16} /> 返回目錄
        </button>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">選擇難度</h1>
          <p className="text-slate-500">請選擇測驗模式</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <button
            onClick={() => { setQuizLevel('lv1'); setScore(0); setTotalQuestions(0); generateNewQuestion(); }}
            className="p-6 bg-white border-2 border-transparent hover:border-green-400 rounded-2xl shadow-md hover:shadow-lg transition-all text-left"
          >
            <div className="mb-3">
              <span className="text-2xl font-black text-green-500 bg-green-50 px-3 py-1 rounded-xl">LV1</span>
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-1">基礎題</h3>
            <p className="text-sm text-slate-500">從圖表直接計算平均數、中位數、眾數、分佈域、四分位數間距、標準差等統計量</p>
            <div className="mt-4 flex items-center gap-1 text-green-600 text-sm font-medium">
              開始 <ArrowRight size={14} />
            </div>
          </button>
          <button
            onClick={() => {
              const q = generateLV2Question();
              setLv2Q(q);
              setLv2SubPart(0);
              setLv2SubAnswered(false);
              setUserAnswer('');
              setLv2Feedback(null);
              setLv2Score(0);
              setLv2Total(0);
              setQuizLevel('lv2');
              setTimeout(() => lv2InputRef.current?.focus(), 150);
            }}
            className="p-6 bg-white border-2 border-transparent hover:border-blue-400 rounded-2xl shadow-md hover:shadow-lg transition-all text-left"
          >
            <div className="mb-3">
              <span className="text-2xl font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-xl">LV2</span>
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-1">進階題（DSE 題型）</h3>
            <p className="text-sm text-slate-500">頻數表含未知數，按已知條件（平均數 / 中位數）求未知數或其範圍</p>
            <div className="mt-4 flex items-center gap-1 text-blue-600 text-sm font-medium">
              開始 <ArrowRight size={14} />
            </div>
          </button>
          <button
            onClick={() => navigate('/standard-score-quiz')}
            className="p-6 bg-white border-2 border-transparent hover:border-indigo-400 rounded-2xl shadow-md hover:shadow-lg transition-all text-left"
          >
            <div className="mb-3">
              <span className="text-2xl font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-xl">標準分</span>
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-1">標準分特訓</h3>
            <p className="text-sm text-slate-500">已知平均分及標準差，求標準分或原始分數；從學生資料求標準差或平均分</p>
            <div className="mt-4 flex items-center gap-1 text-indigo-600 text-sm font-medium">
              開始 <ArrowRight size={14} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  // --- LV2 測驗畫面 ---
  const QuizLV2View = () => {
    if (!lv2Q) return null;
    const part = lv2Q.parts[lv2SubPart];
    const isLastPart = lv2SubPart >= lv2Q.parts.length - 1;
    const totalParts = lv2Q.parts.length;

    const handleSubmitLV2 = () => {
      if (!userAnswer.trim() || lv2SubAnswered) return;
      const userNum = parseFloat(userAnswer.trim());
      if (isNaN(userNum)) return;
      const correct = Math.abs(userNum - part.answer) < 0.5;
      setLv2Total(t => t + 1);
      if (correct) setLv2Score(s => s + 1);
      setLv2Feedback({ correct, answer: part.answer, steps: part.steps });
      setLv2SubAnswered(true);
    };

    const handleNextPartLV2 = () => {
      if (!isLastPart) {
        setLv2SubPart(p => p + 1);
        setLv2SubAnswered(false);
        setUserAnswer('');
        setLv2Feedback(null);
        setTimeout(() => lv2InputRef.current?.focus(), 100);
      } else {
        const newQ = generateLV2Question();
        setLv2Q(newQ);
        setLv2SubPart(0);
        setLv2SubAnswered(false);
        setUserAnswer('');
        setLv2Feedback(null);
        setTimeout(() => lv2InputRef.current?.focus(), 100);
      }
    };

    return (
      <div className="min-h-screen bg-slate-100">
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <Link to="/" className="text-slate-500 hover:text-slate-700 flex items-center gap-2">
            <HomeIcon size={20} />
            <span className="text-sm">返回首頁</span>
          </Link>
          <span className="font-bold text-slate-700">高中統計特訓 — LV2</span>
          <button onClick={() => { setMode('quiz'); setQuizLevel(null); }} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm">
            <RotateCcw size={16} /> 選難度
          </button>
        </div>

        <div className="max-w-2xl mx-auto p-4">
          {/* 分數 */}
          <div className="bg-white rounded-xl shadow p-3 mb-4 flex justify-between text-sm">
            <span className="text-slate-600">題數：<span className="font-bold text-blue-600">{lv2Total}</span></span>
            <span className="text-slate-600">得分：<span className="font-bold text-green-600">{lv2Score} / {lv2Total > 0 ? lv2Total : '-'}</span></span>
          </div>

          {/* 題目背景卡 */}
          <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
            <p className="text-slate-700 font-medium mb-1">{lv2Q.context}。</p>
            {lv2Q.type === 'stem-leaf-unknown' ? (
              <LV2StemLeafDisplay stems={lv2Q.stems} displayLeaves={lv2Q.displayLeaves} varName={lv2Q.varName} />
            ) : lv2Q.type === 'box-plot-unknown' ? (
              <>
                <LV2BoxPlotDisplay
                  min={lv2Q.min} q1={lv2Q.q1} q2={lv2Q.q2} q3={lv2Q.q3} max={lv2Q.max}
                  unknownLabels={lv2Q.unknownLabels}
                />
                <p className="text-blue-700 font-bold mt-2">{lv2Q.conditionText}。</p>
              </>
            ) : (
              <>
                <LV2FreqTableDisplay
                  xLabel={lv2Q.xLabel}
                  values={lv2Q.values}
                  displayFreqs={lv2Q.displayFreqs}
                  unknownIdx={lv2Q.unknownIdx}
                />
                <p className="text-blue-700 font-bold mt-2">
                  {lv2Q.type === 'freq-mean-n'
                    ? `該分佈的平均數為 ${lv2Q.mean}。`
                    : lv2Q.type === 'freq-mode-k'
                    ? 'k 為正整數。'
                    : `該分佈的中位數為 ${lv2Q.medianVal}。`}
                </p>
              </>
            )}
          </div>

          {/* 小題進度（多小題才顯示） */}
          {totalParts > 1 && (
            <div className="flex gap-2 mb-3">
              {lv2Q.parts.map((p, i) => (
                <span key={i} className={`px-3 py-1 rounded-full text-sm font-bold ${
                  i < lv2SubPart ? 'bg-green-200 text-green-700' :
                  i === lv2SubPart ? 'bg-blue-200 text-blue-700' :
                  'bg-gray-100 text-gray-400'
                }`}>{p.label}</span>
              ))}
            </div>
          )}

          {/* 當前小題 */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
              <p className="text-blue-800 font-bold">{part.label ? `${part.label} ` : ''}{part.question}</p>
            </div>
            <div className="p-5">
              {!lv2SubAnswered ? (
                <div className="flex flex-col gap-3 items-center">
                  <div className="flex gap-2 w-full max-w-xs">
                    <input
                      ref={lv2InputRef}
                      type="text"
                      inputMode="numeric"
                      value={userAnswer}
                      onChange={handleInputChange}
                      placeholder="輸入答案..."
                      onKeyDown={e => { if (e.key === 'Enter') handleSubmitLV2(); }}
                      className="flex-1 p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg text-center"
                      autoComplete="off"
                    />
                    <button
                      onClick={handleSubmitLV2}
                      disabled={!userAnswer.trim()}
                      className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >✓</button>
                  </div>
                  <Keypad value={userAnswer} onChange={setUserAnswer} />
                </div>
              ) : (
                <div className={`rounded-lg p-4 ${lv2Feedback?.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className={`flex items-center gap-2 font-bold text-lg mb-3 ${lv2Feedback?.correct ? 'text-green-700' : 'text-red-700'}`}>
                    {lv2Feedback?.correct ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    {lv2Feedback?.correct ? '答對了！' : `答案是 ${lv2Feedback?.answer}`}
                  </div>
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <p className="text-xs font-bold text-slate-400 mb-1">解題步驟：</p>
                    <LV2StepsDisplay steps={lv2Feedback?.steps || []} />
                  </div>
                  <button
                    onClick={handleNextPartLV2}
                    className="w-full py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    {isLastPart ? '下一題' : `繼續 ${lv2Q.parts[lv2SubPart + 1]?.label || '下一小問'}`}
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {mode === 'menu' && <MenuView />}
      {mode === 'quiz' && quizLevel === null && <LevelSelectView />}
      {mode === 'quiz' && quizLevel === 'lv1' && <QuizView />}
      {mode === 'quiz' && quizLevel === 'lv2' && <QuizLV2View />}
      {mode === 'learn' && <LearnView />}
    </div>
  );
}
