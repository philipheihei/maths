import React, { useRef, useEffect, useState } from 'react';
import { loadKatexOnce } from '../../../utils/katexLoader';

/**
 * Latex Component - Renders LaTeX math expressions using KaTeX
 * @param {string} children - LaTeX expression to render
 * @param {boolean} block - Whether to render as block or inline
 */
const Latex = ({ children, block = false }) => {
  const containerRef = useRef(null);
  const [isKatexReady, setIsKatexReady] = useState(false);

  // Load KaTeX once globally
  useEffect(() => {
    loadKatexOnce().then(() => {
      setIsKatexReady(true);
    }).catch((err) => {
      console.error("KaTeX loading failed:", err);
      setIsKatexReady(false);
    });
  }, []);

  useEffect(() => {
    if (isKatexReady && window.katex && containerRef.current) {
      try {
        window.katex.render(children, containerRef.current, {
          throwOnError: false,
          displayMode: block,
        });
      } catch (e) {
        console.error("Katex error:", e);
        containerRef.current.innerText = children;
      }
    } else if (containerRef.current) {
        // Show raw text while loading to prevent empty space
        containerRef.current.innerText = children;
    }
  }, [children, block, isKatexReady]);

  return <span ref={containerRef} className={`${block ? "block my-2" : "inline"}`} />;
};

export default Latex;
