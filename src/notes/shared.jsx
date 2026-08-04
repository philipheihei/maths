import React, { useState, useEffect, useRef } from 'react';
import { loadKatexOnce } from '../utils/katexLoader';

// KaTeX 數學公式組件
export const Latex = ({ math, block = false, left = false }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    loadKatexOnce().then(() => setIsLoaded(true)).catch(e => console.error("KaTeX load error:", e));
  }, []);
  useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        window.katex.render(math, containerRef.current, { throwOnError: false, displayMode: block, strict: false, trust: true });
        if (block && left) {
          const displayEl = containerRef.current.querySelector('.katex-display');
          if (displayEl) {
            displayEl.style.margin = '0';
            displayEl.style.textAlign = 'left';
            const katexEl = displayEl.querySelector('.katex');
            if (katexEl) katexEl.style.textAlign = 'left';
          }
        }
      } catch (e) { containerRef.current.textContent = math; }
    }
  }, [math, block, isLoaded]);
  return <span ref={containerRef} className={block ? `block ${left ? 'text-left' : 'text-center'} my-2` : "inline-block"} />;
};

// MathDisplay (colored KaTeX with trust)
export const MathDisplay = ({ latex, inline = false, className = '' }) => {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { loadKatexOnce().then(() => setLoaded(true)).catch(() => {}); }, []);
  useEffect(() => {
    if (loaded && window.katex && ref.current) {
      try {
        window.katex.render(latex, ref.current, { throwOnError: false, displayMode: !inline, strict: false, trust: true });
      } catch (e) { ref.current.textContent = latex; }
    }
  }, [latex, inline, loaded]);
  return <span ref={ref} className={`${inline ? 'inline-block' : 'block text-center my-1'} ${className}`} />;
};

// 統一章節標題卡
export const ChapterHeader = ({ title, description, accent = 'blue' }) => {
  const accentBorder = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    teal: 'border-teal-500',
    indigo: 'border-indigo-500',
    orange: 'border-orange-500',
    red: 'border-red-500',
    rose: 'border-rose-500',
    sky: 'border-sky-500',
    emerald: 'border-emerald-500',
    amber: 'border-amber-500',
    cyan: 'border-cyan-500',
    slate: 'border-slate-500',
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 ${accentBorder[accent] || accentBorder.blue}`}>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">{title}</h1>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

// 可摺疊區段組件
export const CollapsibleSection = ({ id, title, num, color = 'blue', activeSub, sectionRef, children }) => {
  useEffect(() => {
    if (activeSub === id) {
      setTimeout(() => {
        const target = sectionRef?.current || document.getElementById(id);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeSub, id]);

  const numBg = {
    purple: 'bg-purple-500', blue: 'bg-blue-500', green: 'bg-green-500',
    red: 'bg-red-500', teal: 'bg-teal-500', orange: 'bg-orange-500', indigo: 'bg-indigo-500',
  };
  const textCol = {
    purple: 'text-purple-700', blue: 'text-blue-700', green: 'text-green-700',
    red: 'text-red-700', teal: 'text-teal-700', orange: 'text-orange-700', indigo: 'text-indigo-700',
  };
  const displayTitle = title
    .replace(/^\d+\s*&\s*\d+(?:\.\d+)?\s+/, '')
    .replace(/^\d+[A-Za-z]?[.．、)]\s*/, '')
    .replace(/^\d+\s+(?=[^\d&])/, '');

  return (
    <div id={id} ref={sectionRef} className="bg-white rounded-2xl shadow-lg mb-6 scroll-mt-24 overflow-hidden">
      <div className="flex items-center gap-3 p-5">
        {num !== undefined && num !== null && (
          <span className={`${numBg[color] || 'bg-blue-500'} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}>
            {num}
          </span>
        )}
        <h2 className={`text-lg font-bold ${textCol[color] || 'text-blue-700'} flex-1`}>{displayTitle}</h2>
      </div>
      <div className="px-6 pb-6">{children}</div>
    </div>
  );
};
