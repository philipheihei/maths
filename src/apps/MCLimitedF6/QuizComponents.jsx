import React, { useState, useCallback } from 'react';
import { ArrowLeft, Star, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { InlineMath, LeftBlockMath, AlignedSteps, OptionBtn, SubstitutionSteps } from './shared';
import { generateQuestion } from './generators/hcfLcm';
import { generateFunctionGraphQuestion, ParabolaSVG } from './generators/functionGraph';

const normalizeMCQuestion = (question) => {
  if (!question || typeof question !== 'object') return question;

  let options = Array.isArray(question.options)
    ? question.options.filter(opt => opt !== null && opt !== undefined && String(opt).trim() !== '')
    : [];

  let correctIndex = Number.isInteger(question.correctIndex) ? question.correctIndex : 0;

  if (options.length === 0) {
    options = ['\\text{未提供選項}'];
    correctIndex = 0;
  }

  if (correctIndex < 0 || correctIndex >= options.length) {
    correctIndex = 0;
  }

  if (options.length > 4) {
    const correctOption = options[correctIndex];
    options = options.slice(0, 4);
    if (!options.includes(correctOption)) {
      options[3] = correctOption;
      correctIndex = 3;
    }
  }

  while (options.length < 4) {
    const fallback = `\\text{備用選項 ${options.length + 1}}`;
    options.push(fallback);
  }

  return {
    ...question,
    options,
    correctIndex,
  };
};

// ─── HCF/LCM Quiz ─────────────────────────────────────────────────────────────
export const HCFLCMQuiz = ({ onBack }) => {
  const [question, setQuestion] = useState(() => normalizeMCQuestion(generateQuestion()));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(normalizeMCQuestion(generateQuestion()));
    setSelected(null);
  }, []);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === question.correctIndex;
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    setStreak(st => isCorrect ? st + 1 : 0);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  const getOptionState = (idx) => {
    if (selected === null) return 'idle';
    if (idx === question.correctIndex) return selected === idx ? 'correct' : 'reveal';
    if (idx === selected) return 'wrong';
    return 'idle';
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium">
          <ArrowLeft className="w-5 h-5" /> 返回
        </button>
        <div className="flex items-center gap-4 text-sm">
          {streak >= 3 && (
            <span className="flex items-center gap-1 text-orange-500 font-bold">
              <Star className="w-4 h-4 fill-orange-400" /> ×{streak}
            </span>
          )}
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
            ✓ {score.correct}/{score.total}
          </span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
            {accuracy}%
          </span>
        </div>
      </div>

      <div className="mb-3">
        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
          {question.subtypeLabel}
        </span>
      </div>

      <div className="text-base font-semibold text-slate-700 mb-3 text-left space-y-1">
        <div><InlineMath math={question.questionLatex} /></div>
        {question.questionLatex2 && <div><InlineMath math={question.questionLatex2} /></div>}
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((opt, idx) => (
            <OptionBtn
              key={`${question.questionLatex}-${idx}`}
              label={optionLabels[idx]}
              optionLatex={opt}
              state={getOptionState(idx)}
              onClick={() => handleSelect(idx)}
            />
          ))}
        </div>
      </div>

      {selected !== null && (
        <div className={`rounded-xl p-4 mb-4 border-l-4 ${selected === question.correctIndex
          ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-400'}`}>
          <div className="flex items-center gap-2 mb-3">
            {selected === question.correctIndex
              ? <CheckCircle className="w-5 h-5 text-green-600" />
              : <XCircle className="w-5 h-5 text-red-500" />}
            <span className={`font-bold ${selected === question.correctIndex ? 'text-green-700' : 'text-red-600'}`}>
              {selected === question.correctIndex
                ? '正確！'
                : <span className="inline-flex items-center gap-1"><span>錯誤！</span><InlineMath math={`\\text{答案是 } \\mathrm{${optionLabels[question.correctIndex]}}`} /></span>}
            </span>
          </div>
          <div className="bg-white rounded-lg px-4 py-3">
            {question.explanationAligned
              ? <LeftBlockMath math={question.explanationAligned} />
              : question.explanationMode === 'substitution'
                ? <SubstitutionSteps question={question} />
                : <AlignedSteps questionLatex={question.variationQ ? '' : question.questionLatex} lines={question.explanationLines || []} />}
          </div>
        </div>
      )}

      {selected !== null && (
        <button
          onClick={nextQuestion}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
          下一題 <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

// ─── Function Graph Quiz ───────────────────────────────────────────────────────
export const FunctionGraphQuiz = ({ onBack }) => {
  const [question, setQuestion] = useState(() => normalizeMCQuestion(generateFunctionGraphQuestion()));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(normalizeMCQuestion(generateFunctionGraphQuestion()));
    setSelected(null);
  }, []);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const ok = idx === question.correctIndex;
    setScore(s => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
    setStreak(st => ok ? st + 1 : 0);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const getState = (idx) => {
    if (selected === null) return 'idle';
    if (idx === question.correctIndex) return selected === idx ? 'correct' : 'reveal';
    if (idx === selected) return 'wrong';
    return 'idle';
  };
  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium">
          <ArrowLeft className="w-5 h-5" /> 返回
        </button>
        <div className="flex items-center gap-3 text-sm">
          {streak >= 3 && (
            <span className="flex items-center gap-1 text-orange-500 font-bold">
              <Star className="w-4 h-4 fill-orange-400" /> ×{streak}
            </span>
          )}
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">✓ {score.correct}/{score.total}</span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">{accuracy}%</span>
        </div>
      </div>

      <div className="mb-3">
        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">{question.subtypeLabel}</span>
      </div>

      <div className="text-base font-semibold text-slate-700 mb-3 text-left">
        <InlineMath math={question.questionLatex} />
      </div>

      {question.graphData && (
        <div className="flex justify-center mb-4 bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
          <ParabolaSVG
            aSign={question.graphData.aSign}
            yIntSign={question.graphData.yIntSign}
            vertexSide={question.graphData.vertexSide}
          />
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((opt, idx) => (
            <OptionBtn
              key={`${idx}-${question.subtypeLabel}`}
              label={optionLabels[idx]}
              optionLatex={opt}
              state={getState(idx)}
              onClick={() => handleSelect(idx)}
            />
          ))}
        </div>
      </div>

      {selected !== null && (
        <div className={`rounded-xl p-4 mb-4 border-l-4 ${
          selected === question.correctIndex ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-400'}`}>
          <div className="flex items-center gap-2 mb-3">
            {selected === question.correctIndex
              ? <CheckCircle className="w-5 h-5 text-green-600" />
              : <XCircle className="w-5 h-5 text-red-500" />}
            <span className={`font-bold ${selected === question.correctIndex ? 'text-green-700' : 'text-red-600'}`}>
              {selected === question.correctIndex
                ? '正確！'
                : <span className="inline-flex items-center gap-1"><span>錯誤！</span><InlineMath math={`\\text{答案是 } \\mathrm{${optionLabels[question.correctIndex]}}`} /></span>}
            </span>
          </div>
          <div className="bg-white rounded-lg px-4 py-3 space-y-1">
            {(question.explanationLines || []).map((line, i) => (
              <div key={i}><InlineMath math={line} /></div>
            ))}
          </div>
        </div>
      )}

      {selected !== null && (
        <button onClick={nextQuestion}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
          下一題 <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

// ─── Generic Topic Quiz ───────────────────────────────────────────────────────
export const TopicQuiz = ({ onBack, generateFn, topicLabel }) => {
  const isSubstitutionTopic = topicLabel === '代數代入法';

  const substitutionTypeOptions = [
    { id: 'alg', label: '代數式化簡', match: '代數式化簡（適用）' },
    { id: 'exp2', label: '指數化簡（代兩值）', match: '指數化簡（需代兩個值）' },
    { id: 'frac', label: '分式化簡', match: '分式化簡（適用）' },
    { id: 'bivar', label: '雙變數展開', match: '雙變數展開（適用）' },
    { id: 'law', label: '指數律', match: '指數律（適用）' },
    { id: 'factor2', label: '二元因式分解', match: '二元因式分解（代入判別）' },
    { id: 'expProd', label: '指數乘積', match: '指數乘積（適用）' },
    { id: 'param', label: '參數方程', match: '參數方程（解集判別）' },
    { id: 'ratio', label: '比例方程', match: '比例方程（求比值）' },
    { id: 'ineqChain', label: '不等式（鏈式夾擠）', match: '不等式（鏈式夾擠）' },
    { id: 'ineqAnd', label: '不等式（及）', match: '不等式（取「且」）' },
    { id: 'ineqOr', label: '不等式（或）', match: '不等式（取「或」）' },
    { id: 'ineqNotEq', label: '不等式（夾外解）', match: '不等式（夾外解）' },
  ];

  const initialEnabledTypes = isSubstitutionTopic
    ? Object.fromEntries(substitutionTypeOptions.map(t => [t.id, true]))
    : {};

  const [enabledTypes, setEnabledTypes] = useState(initialEnabledTypes);

  const isSubtypeEnabled = (subtypeLabel, enabledMap) => {
    if (!isSubstitutionTopic) return true;
    const type = substitutionTypeOptions.find(t => t.match === subtypeLabel);
    if (!type) return true;
    return !!enabledMap[type.id];
  };

  const pickQuestionByEnabledTypes = (enabledMap) => {
    const maxTry = 60;
    for (let i = 0; i < maxTry; i++) {
      const cand = normalizeMCQuestion(generateFn());
      if (isSubtypeEnabled(cand?.subtypeLabel, enabledMap)) return cand;
    }
    return normalizeMCQuestion(generateFn());
  };

  const [question, setQuestion] = useState(() => pickQuestionByEnabledTypes(initialEnabledTypes));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const toggleType = (typeId) => {
    if (!isSubstitutionTopic) return;
    setEnabledTypes(prev => {
      const next = { ...prev, [typeId]: !prev[typeId] };
      const enabledCount = Object.values(next).filter(Boolean).length;
      if (enabledCount === 0) return prev;

      const nextQuestion = pickQuestionByEnabledTypes(next);
      setQuestion(nextQuestion);
      setSelected(null);
      return next;
    });
  };

  const nextQuestion = useCallback(() => {
    const next = pickQuestionByEnabledTypes(enabledTypes);
    setQuestion(next);
    setSelected(null);
  }, [enabledTypes, generateFn]);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const ok = idx === question.correctIndex;
    setScore(s => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
    setStreak(st => ok ? st + 1 : 0);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const getState = (idx) => {
    if (selected === null) return 'idle';
    if (idx === question.correctIndex) return selected === idx ? 'correct' : 'reveal';
    if (idx === selected) return 'wrong';
    return 'idle';
  };
  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium">
          <ArrowLeft className="w-5 h-5" /> 返回
        </button>
        <div className="flex items-center gap-3 text-sm">
          {streak >= 3 && (
            <span className="flex items-center gap-1 text-orange-500 font-bold">
              <Star className="w-4 h-4 fill-orange-400" /> ×{streak}
            </span>
          )}
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">✓ {score.correct}/{score.total}</span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">{accuracy}%</span>
        </div>
      </div>
      <div className="mb-3">
        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">{question.subtypeLabel}</span>
      </div>

      {isSubstitutionTopic && (
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
          <h3 className="font-bold text-gray-700 mb-3">選擇題目類型</h3>
          <div className="flex flex-wrap gap-3">
            {substitutionTypeOptions.map((type) => (
              <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!enabledTypes[type.id]}
                  onChange={() => toggleType(type.id)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium">{type.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="text-base font-semibold text-slate-700 mb-3 text-left space-y-1">
        <div><InlineMath math={question.questionLatex} /></div>
        {question.questionLatex2 && <div><InlineMath math={question.questionLatex2} /></div>}
      </div>
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((opt, idx) => (
            <OptionBtn
              key={`${idx}-${question.questionLatex.slice(0, 20)}`}
              label={optionLabels[idx]}
              optionLatex={opt}
              state={getState(idx)}
              onClick={() => handleSelect(idx)}
            />
          ))}
        </div>
      </div>
      {selected !== null && (
        <div className={`rounded-xl p-4 mb-4 border-l-4 ${
          selected === question.correctIndex ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-400'}`}>
          <div className="flex items-center gap-2 mb-3">
            {selected === question.correctIndex
              ? <CheckCircle className="w-5 h-5 text-green-600" />
              : <XCircle className="w-5 h-5 text-red-500" />}
            <span className={`font-bold ${selected === question.correctIndex ? 'text-green-700' : 'text-red-600'}`}>
              {selected === question.correctIndex
                ? '正確！'
                : <span className="inline-flex items-center gap-1"><span>錯誤！</span><InlineMath math={`\\text{答案是 } \\mathrm{${optionLabels[question.correctIndex]}}`} /></span>}
            </span>
          </div>
          <div className="bg-white rounded-lg px-4 py-3">
            {question.explanationAligned
              ? <LeftBlockMath math={question.explanationAligned} />
              : question.explanationMode === 'substitution'
                ? <SubstitutionSteps question={question} />
                : <AlignedSteps questionLatex={question.variationQ ? '' : question.questionLatex} lines={question.explanationLines || []} />}
          </div>
        </div>
      )}
      {selected !== null && (
        <button onClick={nextQuestion}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
          下一題 <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
