import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';

// ─────────────────────────────────────────────
// KaTeX 渲染元件
// ─────────────────────────────────────────────
const Formula = ({ children }) => {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { loadKatexOnce().then(() => setLoaded(true)); }, []);
  useEffect(() => {
    if (!loaded || !window.katex || !ref.current) return;
    try {
      window.katex.render(children, ref.current, { displayMode: true, throwOnError: false });
    } catch (e) { if (ref.current) ref.current.innerText = children; }
  }, [children, loaded]);
  return <div ref={ref} className="my-0.5 text-center" />;
};

const StepsDisplay = ({ steps }) => (
  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 mt-3">
    <p className="text-xs text-slate-500 mb-1">解題步驟：</p>
    {steps.map((s, i) => <Formula key={i}>{s}</Formula>)}
  </div>
);

// ─────────────────────────────────────────────
// 數字鍵盤
// ─────────────────────────────────────────────
const Numpad = ({ onKey }) => {
  const btn = (label, action, cls) => (
    <button
      key={label}
      onPointerDown={e => { e.preventDefault(); onKey(action ?? label); }}
      className={`py-4 rounded-xl text-white font-bold text-lg select-none active:opacity-70 ${cls || 'bg-blue-500 hover:bg-blue-600'}`}
    >{label}</button>
  );
  return (
    <div className="grid grid-cols-3 gap-2 mt-3 max-w-xs mx-auto">
      {['7', '8', '9', '4', '5', '6', '1', '2', '3'].map(d => btn(d))}
      {btn('.', '.')}
      {btn('0')}
      {btn('DEL', 'DEL', 'bg-red-500 hover:bg-red-600')}
      {btn('−', '-', 'bg-slate-600 hover:bg-slate-700')}
    </div>
  );
};

// ─────────────────────────────────────────────
// 工具函數
// ─────────────────────────────────────────────
const EXAM_CONTEXTS = ['數學考試', '英語考試', '物理測驗', '化學測驗', '生物測驗', '歷史考試', '地理考試'];
const NAMES = ['小明', '小華', '小美', '偉明', '家華', '小麗', '阿偉', '志明', '小恩', '子軒'];
const Z_OPTIONS = [-3, -2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3];

const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const rnd = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const fmtZ = z => z % 1 === 0 ? String(z) : z.toFixed(1);
const fmtNum = n => Number.isInteger(n) ? String(n) : n.toFixed(1);

// 處理顯示 μ + z·σ 中 z·σ 帶負號的情況
const addTerm = (base, term) =>
  term >= 0
    ? `${base} + ${term}`
    : `${base} - ${-term}`;

// ─────────────────────────────────────────────
// 題目生成器
// ─────────────────────────────────────────────

// 類型 A：求標準分 z = (x - μ) / σ
const genFindZ = () => {
  const sigma = rnd(4, 15);
  const mu = rnd(50, 80);
  const z = pick(Z_OPTIONS);
  const x = mu + z * sigma;
  if (!Number.isInteger(x) || x < 0 || x > 150) return null;
  const exam = pick(EXAM_CONTEXTS);
  const name = pick(NAMES);
  const diff = x - mu;
  return {
    context: `在某次${exam}中，全班的平均分為 ${mu} 分，標準差為 ${sigma} 分。${name}在該考試得 ${x} 分。`,
    parts: [{
      label: '',
      question: `求${name}在該考試的標準分。`,
      answer: z,
      steps: [
        `\\text{標準分} = \\dfrac{\\text{個人得分} - \\text{平均分}}{\\text{標準差}}`,
        `= \\dfrac{${x} - ${mu}}{${sigma}}`,
        `= \\dfrac{${diff}}{${sigma}}`,
        `= ${fmtZ(z)}`,
      ],
    }],
  };
};

// 類型 B：求得分 x = μ + z·σ
const genFindX = () => {
  const sigma = rnd(4, 15);
  const mu = rnd(50, 80);
  const z = pick(Z_OPTIONS);
  const x = mu + z * sigma;
  if (!Number.isInteger(x) || x < 0 || x > 150) return null;
  const exam = pick(EXAM_CONTEXTS);
  const name = pick(NAMES);
  const zSigma = z * sigma;
  return {
    context: `在某次${exam}中，全班的平均分為 ${mu} 分，標準差為 ${sigma} 分。${name}在該考試的標準分為 ${fmtZ(z)}。`,
    parts: [{
      label: '',
      question: `求${name}在該考試的得分。`,
      answer: x,
      steps: [
        `\\begin{aligned}` +
        `\\text{標準分} &= \\dfrac{\\text{個人得分} - \\text{平均分}}{\\text{標準差}} \\\\[8pt]` +
        `${fmtZ(z)} &= \\dfrac{\\text{個人得分} - ${mu}}{${sigma}} \\\\[8pt]` +
        `${zSigma} &= \\text{個人得分} - ${mu} \\\\[4pt]` +
        `\\text{個人得分} &= ${x}` +
        `\\end{aligned}`,
      ],
    }],
  };
};

// 類型 C：已知 μ，已知甲的得分和標準分 → 求 σ，再求乙的得分
const genFindSigmaThenX = () => {
  const sigma = rnd(4, 15);
  const mu = rnd(50, 80);
  const z1 = pick(Z_OPTIONS);
  const x1 = mu + z1 * sigma;
  let z2;
  do { z2 = pick(Z_OPTIONS); } while (z2 === z1);
  const x2 = mu + z2 * sigma;
  if (!Number.isInteger(x1) || !Number.isInteger(x2) || x1 <= 0 || x2 <= 0 || x1 > 150 || x2 > 150) return null;
  const exam = pick(EXAM_CONTEXTS);
  const names = [...NAMES];
  const name1 = pick(names);
  const name2 = pick(names.filter(n => n !== name1));
  const diff1 = x1 - mu;
  const zSigma2 = z2 * sigma;
  return {
    context: `在某次${exam}中，全班的平均分為 ${mu} 分。${name1}在該考試得 ${x1} 分且其標準分為 ${fmtZ(z1)}。`,
    parts: [
      {
        label: '(a)',
        question: `求該考試成績的標準差。`,
        answer: sigma,
        steps: [
          `\\text{標準分} = \\dfrac{\\text{個人得分} - \\text{平均分}}{\\text{標準差}}`,
          `${fmtZ(z1)} = \\dfrac{${x1} - ${mu}}{\\sigma}`,
          `\\sigma = \\dfrac{${diff1}}{${fmtZ(z1)}} = ${sigma}`,
        ],
      },
      {
        label: '(b)',
        question: `若${name2}在該考試的標準分為 ${fmtZ(z2)}，求${name2}的得分。`,
        answer: x2,
        steps: [
          `\\begin{aligned}` +
          `\\text{標準分} &= \\dfrac{\\text{個人得分} - \\text{平均分}}{\\text{標準差}} \\\\[8pt]` +
          `${fmtZ(z2)} &= \\dfrac{\\text{個人得分} - ${mu}}{${sigma}} \\\\[8pt]` +
          `${zSigma2} &= \\text{個人得分} - ${mu} \\\\[4pt]` +
          `\\text{個人得分} &= ${x2}` +
          `\\end{aligned}`,
        ],
      },
    ],
  };
};

// 類型 D：由得分之差和標準分之差求標準差 σ = Δx / Δz
const genFindSigmaFromDiff = () => {
  const sigma = rnd(4, 15);
  const z1 = pick(Z_OPTIONS);
  let z2;
  do { z2 = pick(Z_OPTIONS); } while (z2 === z1 || Math.abs(z1 - z2) < 1);
  const deltaZ = Math.abs(z1 - z2);
  const deltaX = deltaZ * sigma;
  if (!Number.isInteger(deltaX)) return null;
  const exam = pick(EXAM_CONTEXTS);
  const dZStr = fmtZ(deltaZ);
  return {
    context: `在某次${exam}中，某兩學生的測驗個人得分之差及標準分之差分別為 ${deltaX} 分及 ${dZStr}。`,
    parts: [{
      label: '',
      question: `求該考試個人得分的標準差。`,
      answer: sigma,
      steps: [
        `\\text{標準分之差} = \\dfrac{\\text{個人得分之差}}{\\text{標準差}}`,
        `${dZStr} = \\dfrac{${deltaX}}{\\sigma}`,
        `\\sigma = \\dfrac{${deltaX}}{${dZStr}} = ${sigma}`,
      ],
    }],
  };
};

// 類型 E：已知 σ，已知甲的得分和標準分 → 求 μ，再求乙的得分
const genFindMuThenX = () => {
  const sigma = rnd(4, 15);
  const mu = rnd(50, 80);
  const z1 = pick(Z_OPTIONS);
  const x1 = mu + z1 * sigma;
  let z2;
  do { z2 = pick(Z_OPTIONS); } while (z2 === z1);
  const x2 = mu + z2 * sigma;
  if (!Number.isInteger(x1) || !Number.isInteger(x2) || x1 <= 0 || x2 <= 0 || x1 > 150 || x2 > 150) return null;
  const exam = pick(EXAM_CONTEXTS);
  const names = [...NAMES];
  const name1 = pick(names);
  const name2 = pick(names.filter(n => n !== name1));
  const z1Sigma = z1 * sigma;
  const z2Sigma = z2 * sigma;
  // For showing μ = x1 - z1·σ step cleanly
  const muStep = z1Sigma >= 0
    ? `\\mu = ${x1} - ${z1Sigma} = ${mu}`
    : `\\mu = ${x1} + ${-z1Sigma} = ${mu}`;
  return {
    context: `在某次${exam}中，成績的標準差為 ${sigma} 分。${name1}的個人得分為 ${x1} 分且標準分為 ${fmtZ(z1)}。`,
    parts: [
      {
        label: '(a)',
        question: `求該考試成績的平均分。`,
        answer: mu,
        steps: [
          `\\text{標準分} = \\dfrac{\\text{個人得分} - \\text{平均分}}{\\text{標準差}}`,
          `${fmtZ(z1)} = \\dfrac{${x1} - \\mu}{${sigma}}`,
          `${x1} - \\mu = (${fmtZ(z1)}) \\times ${sigma} = ${z1Sigma}`,
          muStep,
        ],
      },
      {
        label: '(b)',
        question: `若${name2}在該考試的標準分為 ${fmtZ(z2)}，求${name2}的得分。`,
        answer: x2,
        steps: [
          `\\begin{aligned}` +
          `\\text{標準分} &= \\dfrac{\\text{個人得分} - \\text{平均分}}{\\text{標準差}} \\\\[8pt]` +
          `${fmtZ(z2)} &= \\dfrac{\\text{個人得分} - ${mu}}{${sigma}} \\\\[8pt]` +
          `${z2Sigma} &= \\text{個人得分} - ${mu} \\\\[4pt]` +
          `\\text{個人得分} &= ${x2}` +
          `\\end{aligned}`,
        ],
      },
    ],
  };
};

// 類型 F：已知甲的得分和標準分，已知乙的得分 → 求乙的標準分（需先求 μ 和 σ 兩個未知量 - 不可行）
// 改成：已知表格（兩科的 μ 和 σ），求某人的得分或標準分
const genTwoSubjects = () => {
  const sigmaA = rnd(4, 15);
  const muA = rnd(50, 80);
  const sigmaB = rnd(4, 15);
  const muB = rnd(40, 75);
  // Ensure they are different enough
  if (Math.abs(muA - muB) < 5 || sigmaA === sigmaB) return null;

  const z = pick(Z_OPTIONS);
  const xA = muA + z * sigmaA;
  if (!Number.isInteger(xA) || xA <= 0 || xA > 150) return null;

  // For part (b), ask for a different person's score in another subject
  const z2 = pick(Z_OPTIONS.filter(zz => zz !== z));
  const xB = muB + z2 * sigmaB;
  if (!Number.isInteger(xB) || xB <= 0 || xB > 150) return null;

  const name = pick(NAMES);
  const subjectA = pick(['數學', '物理', '化學']);
  const subjectB = pick(['英語', '生物', '歷史', '地理'].filter(s => s !== subjectA));
  const diffA = xA - muA;
  const zSigmaA = z * sigmaA;
  const zSigmaB2 = z2 * sigmaB;

  return {
    context: `下表顯示某次考試中${subjectA}及${subjectB}科的平均分及標準差：`,
    table: [
      { subject: subjectA, mu: muA, sigma: sigmaA },
      { subject: subjectB, mu: muB, sigma: sigmaB },
    ],
    parts: [
      {
        label: '(a)',
        question: `${name}在${subjectA}科的標準分為 ${fmtZ(z)}，求其${subjectA}科得分。`,
        answer: xA,
        steps: [
          `\\begin{aligned}` +
          `\\text{標準分} &= \\dfrac{\\text{個人得分} - \\text{平均分}}{\\text{標準差}} \\\\[8pt]` +
          `${fmtZ(z)} &= \\dfrac{\\text{個人得分} - ${muA}}{${sigmaA}} \\\\[8pt]` +
          `${zSigmaA} &= \\text{個人得分} - ${muA} \\\\[4pt]` +
          `\\text{個人得分} &= ${xA}` +
          `\\end{aligned}`,
        ],
      },
      {
        label: '(b)',
        question: `若某同學在${subjectB}科的標準分為 ${fmtZ(z2)}，求其${subjectB}科得分。`,
        answer: xB,
        steps: [
          `\\begin{aligned}` +
          `\\text{標準分} &= \\dfrac{\\text{個人得分} - \\text{平均分}}{\\text{標準差}} \\\\[8pt]` +
          `${fmtZ(z2)} &= \\dfrac{\\text{個人得分} - ${muB}}{${sigmaB}} \\\\[8pt]` +
          `${zSigmaB2} &= \\text{個人得分} - ${muB} \\\\[4pt]` +
          `\\text{個人得分} &= ${xB}` +
          `\\end{aligned}`,
        ],
      },
    ],
  };
};

const GENERATORS = [genFindZ, genFindX, genFindSigmaThenX, genFindSigmaFromDiff, genFindMuThenX, genTwoSubjects];

const generateQuestion = () => {
  const startIdx = Math.floor(Math.random() * GENERATORS.length);
  for (let i = 0; i < GENERATORS.length * 4; i++) {
    const q = GENERATORS[(startIdx + i) % GENERATORS.length]();
    if (q) return q;
  }
  return genFindX();
};

// ─────────────────────────────────────────────
// 題目背景卡：表格顯示（類型 F 用）
// ─────────────────────────────────────────────
const SubjectTable = ({ table }) => (
  <div className="overflow-x-auto mt-3">
    <table className="border-collapse mx-auto text-sm">
      <thead>
        <tr className="bg-blue-50">
          <th className="border border-gray-300 px-4 py-2 font-bold text-blue-800">科目</th>
          <th className="border border-gray-300 px-4 py-2 font-bold text-blue-800">平均分</th>
          <th className="border border-gray-300 px-4 py-2 font-bold text-blue-800">標準差</th>
        </tr>
      </thead>
      <tbody>
        {table.map(row => (
          <tr key={row.subject}>
            <td className="border border-gray-300 px-4 py-2 text-center font-medium">{row.subject}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{row.mu} 分</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{row.sigma} 分</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─────────────────────────────────────────────
// 主元件
// ─────────────────────────────────────────────
export default function StandardScoreQuiz() {
  const [q, setQ] = useState(() => generateQuestion());
  const [subPart, setSubPart] = useState(0);
  const [input, setInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const inputRef = useRef(null);

  const parts = q.parts;
  const part = parts[subPart];
  const isLastPart = subPart >= parts.length - 1;

  const handleKey = (k) => {
    if (answered) return;
    setInput(prev => {
      if (k === 'DEL') return prev.slice(0, -1);
      if (k === '-') return prev.startsWith('-') ? prev.slice(1) : '-' + prev;
      if (k === '.' && prev.includes('.')) return prev;
      return prev + k;
    });
  };

  const handleSubmit = () => {
    if (answered || !input.trim()) return;
    const userNum = parseFloat(input.trim());
    if (isNaN(userNum)) return;
    const correct = Math.abs(userNum - part.answer) < 0.05;
    setTotal(t => t + 1);
    if (correct) setScore(s => s + 1);
    setFeedback({ correct, answer: part.answer, steps: part.steps });
    setAnswered(true);
  };

  const handleNext = () => {
    if (!isLastPart) {
      setSubPart(p => p + 1);
      setAnswered(false);
      setInput('');
      setFeedback(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQ(generateQuestion());
      setSubPart(0);
      setAnswered(false);
      setInput('');
      setFeedback(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const reset = () => {
    setQ(generateQuestion());
    setSubPart(0);
    setAnswered(false);
    setInput('');
    setFeedback(null);
    setScore(0);
    setTotal(0);
  };

  return (
    <div className="min-h-screen bg-gradient-from-blue-50 bg-slate-100">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <Link to="/" className="text-slate-500 hover:text-slate-700 flex items-center gap-2">
          <HomeIcon size={20} />
          <span className="text-sm">返回首頁</span>
        </Link>
        <span className="font-bold text-slate-700">標準分特訓</span>
        <button onClick={reset} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm">
          <RotateCcw size={16} /> 重置
        </button>
      </div>

      <div className="max-w-lg mx-auto p-4">
        {/* Score */}
        <div className="bg-white rounded-xl shadow p-3 mb-4 flex justify-between text-sm">
          <span className="text-slate-600">題數：<span className="font-bold text-blue-600">{total}</span></span>
          <span className="text-slate-600">得分：<span className="font-bold text-green-600">{score} / {total || '-'}</span></span>
        </div>

        {/* Question context card */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
          <p className="text-slate-700 font-medium">{q.context}</p>
          {q.table && <SubjectTable table={q.table} />}

          {/* Multi-part progress */}
          {parts.length > 1 && (
            <div className="flex gap-2 mt-3">
              {parts.map((p, i) => (
                <span key={i} className={`px-3 py-1 rounded-full text-sm font-bold ${
                  i < subPart ? 'bg-green-200 text-green-700' :
                  i === subPart ? 'bg-blue-200 text-blue-700' :
                  'bg-gray-100 text-gray-400'
                }`}>{p.label}</span>
              ))}
            </div>
          )}
        </div>

        {/* Current part */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <p className="text-blue-800 font-bold">
              {part.label ? `${part.label} ` : ''}{part.question}
            </p>
          </div>
          <div className="p-5">
            {!answered ? (
              <>
                <div className="flex gap-2 max-w-xs mx-auto">
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="decimal"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
                    placeholder="輸入答案..."
                    className="flex-1 p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg text-center"
                    autoComplete="off"
                  />
                  <button
                    onClick={handleSubmit}
                    className="px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-bold text-xl"
                  >✓</button>
                </div>
                <Numpad onKey={handleKey} />
              </>
            ) : (
              <div>
                {feedback.correct ? (
                  <div className="flex items-center gap-2 text-green-600 font-bold text-lg mb-2">
                    <CheckCircle size={24} /> 答對了！
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 font-bold text-lg mb-2">
                    <XCircle size={24} /> 答案是 {fmtNum(feedback.answer)}
                  </div>
                )}
                <StepsDisplay steps={feedback.steps} />
                <button
                  onClick={handleNext}
                  className="mt-4 w-full p-4 bg-slate-800 text-white rounded-xl font-bold text-lg"
                >
                  {isLastPart ? '下一題 →' : `繼續 ${parts[subPart + 1]?.label} →`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
