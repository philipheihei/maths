import React, { useState, useEffect, useRef } from 'react';
import { loadKatexOnce } from '../../utils/katexLoader';
import { CheckCircle, XCircle } from 'lucide-react';

// ─── KaTeX Helpers ────────────────────────────────────────────────────────────
export const useKatex = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { loadKatexOnce().then(() => setLoaded(true)).catch(console.error); }, []);
  return loaded;
};

export const InlineMath = ({ math }) => {
  const ref = useRef(null);
  const katexLoaded = useKatex();
  useEffect(() => {
    if (katexLoaded && ref.current && window.katex) {
      try { window.katex.render(math, ref.current, { displayMode: false, throwOnError: false }); }
      catch (e) { if (ref.current) ref.current.textContent = math; }
    }
  }, [math, katexLoaded]);
  return <span ref={ref} />;
};

export const BlockMath = ({ math }) => {
  const ref = useRef(null);
  const katexLoaded = useKatex();
  useEffect(() => {
    if (katexLoaded && ref.current && window.katex) {
      try { window.katex.render(math, ref.current, { displayMode: true, throwOnError: false }); }
      catch (e) { if (ref.current) ref.current.textContent = math; }
    }
  }, [math, katexLoaded]);
  return <div ref={ref} className="my-2 overflow-x-auto" />;
};

export const LeftBlockMath = ({ math }) => {
  const ref = useRef(null);
  const katexLoaded = useKatex();
  useEffect(() => {
    if (katexLoaded && ref.current && window.katex) {
      try { window.katex.render(math, ref.current, { displayMode: true, throwOnError: false, fleqn: true }); }
      catch (e) { if (ref.current) ref.current.textContent = math; }
    }
  }, [math, katexLoaded]);
  return <div ref={ref} className="my-2 overflow-x-auto pl-2" />;
};

export const AlignedSteps = ({ questionLatex, lines }) => {
  const allLines = [...(questionLatex ? [questionLatex] : []), ...(lines || [])];
  return (
    <div className="py-2 pl-2 text-left space-y-1">
      {allLines.map((line, i) => (
        <div key={i}><InlineMath math={line} /></div>
      ))}
    </div>
  );
};

const HIGHLIGHT_CLASSES = [
  'bg-amber-100 text-amber-900',
  'bg-sky-100 text-sky-900',
  'bg-emerald-100 text-emerald-900',
  'bg-rose-100 text-rose-900',
];

const getVarClass = (varDefs, idx) => {
  if (!Array.isArray(varDefs) || varDefs.length === 0) return HIGHLIGHT_CLASSES[0];
  return HIGHLIGHT_CLASSES[idx % HIGHLIGHT_CLASSES.length];
};

const renderWithRules = (text, rules) => {
  if (!text) return null;
  if (!rules || rules.length === 0) return <>{text}</>;

  const sorted = [...rules].sort((a, b) => b.token.length - a.token.length);
  const out = [];
  let i = 0;

  while (i < text.length) {
    let matched = null;
    for (const r of sorted) {
      if (text.slice(i, i + r.token.length) === r.token) {
        matched = r;
        break;
      }
    }
    if (matched) {
      out.push(
        <span key={`${i}-${matched.token}`} className={`px-1 rounded ${matched.className}`}>
          {matched.token}
        </span>
      );
      i += matched.token.length;
    } else {
      out.push(<span key={i}>{text[i]}</span>);
      i += 1;
    }
  }

  return out;
};

export const SubstitutionSteps = ({ question }) => {
  const view = question?.substitutionView;
  if (!view) return null;

  const vars = view.variables || [];

  const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const renderSubstitutedHighlights = (latex) => {
    if (!latex) return latex;
    let out = latex;
    vars.forEach((v) => {
      const sym = escapeRegex(v.symbol);
      const val = `(${v.value})`;
      out = out.replace(
        new RegExp(`\\\\colorbox\\{([^}]+)\\}\\{\\\\textit\\{${sym}\\}\\}`, 'g'),
        (_, color) => `\\colorbox{${color}}{${val}}`
      );
      out = out.replace(
        new RegExp(`\\\\colorbox\\{([^}]+)\\}\\{${sym}\\}`, 'g'),
        (_, color) => `\\colorbox{${color}}{${val}}`
      );
    });
    return out;
  };

  const buildOptionRules = () => {
    const rules = [];
    vars.forEach((v, i) => {
      const cls = getVarClass(vars, i);
      rules.push({ token: `(${v.value})`, className: cls });
    });
    return rules;
  };

  return (
    <div className="py-2 pl-2 text-left space-y-2">
      <div className="leading-7">
        <InlineMath math={`\\text{題目：} ${view.questionHighlightLatex || view.questionLatex || question.questionLatex || ''}`} />
      </div>
      <div className="leading-7">
        <InlineMath math={`\\text{題目：代 } ${view.substitutionHighlightLatex || view.substitutionLatex || ''}`} />
      </div>

      {(view.optionChecks || []).map((row, idx) => {
        const ok = !!row.correct;
        const mark = ok ? '✅' : '❌';
        const markCls = ok ? 'text-green-700' : 'text-red-700';
        const optionRules = buildOptionRules();
        return (
          <div key={`${row.label}-${idx}`} className="leading-8 text-[1.15rem]">
            <span className="font-semibold mr-2">{row.label}:</span>
            {row.latex
              ? <InlineMath math={`\\quad ${renderSubstitutedHighlights(row.latex)}`} />
              : renderWithRules(row.text, optionRules)}
            <span className={`ml-2 font-bold ${markCls}`}>{mark}</span>
          </div>
        );
      })}

      <div className="leading-6 text-sm font-medium text-slate-700">
        <InlineMath math={`\\therefore \\text{比較所有代入的答案，只有 }\\mathrm{${view.answerLabel}}\\text{ 跟題目的代入答案相同，所以答案為 }\\mathrm{${view.answerLabel}}\\text{。}`} />
      </div>
    </div>
  );
};

// ─── OptionBtn ────────────────────────────────────────────────────────────────
export const OptionBtn = ({ label, optionLatex, state, onClick }) => {
  const base = 'w-full text-left flex items-start gap-3 px-4 py-4 rounded-xl border-2 transition-all duration-200 font-medium';
  const styles = {
    idle: 'border-slate-200 hover:border-blue-400 hover:bg-blue-50 bg-white cursor-pointer',
    correct: 'border-green-500 bg-green-50 cursor-default',
    wrong: 'border-red-400 bg-red-50 cursor-default',
    reveal: 'border-green-400 bg-green-50 cursor-default opacity-80',
  };
  const icons = {
    idle: null,
    correct: <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />,
    wrong: <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    reveal: <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5 opacity-70" />,
  };

  return (
    <button className={`${base} ${styles[state]}`} onClick={onClick} disabled={state !== 'idle'}>
      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5
        ${state === 'idle' ? 'bg-slate-100 text-slate-600' :
          state === 'correct' ? 'bg-green-500 text-white' :
          state === 'wrong' ? 'bg-red-400 text-white' : 'bg-green-400 text-white'}`}>
        {label}
      </span>
      {icons[state]}
      <span className="text-lg leading-relaxed"><InlineMath math={optionLatex} /></span>
    </button>
  );
};
