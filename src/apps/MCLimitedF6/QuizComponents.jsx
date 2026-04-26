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
  const [question, setQuestion] = useState(() => normalizeMCQuestion(generateFn()));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(normalizeMCQuestion(generateFn()));
    setSelected(null);
  }, [generateFn]);

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
