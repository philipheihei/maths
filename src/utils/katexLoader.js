/**
 * Unified KaTeX Loader - 集中管理所有app的KaTeX加載
 * 避免重複加載CSS和JS，防止樣式衝突
 */

let katexLoadPromise = null;

/**
 * 全局一次性加載KaTeX CSS和JS
 * 多次調用會返回同一個Promise，確保只加載一次
 */
export const loadKatexOnce = () => {
  if (katexLoadPromise) {
    return katexLoadPromise;
  }

  katexLoadPromise = new Promise((resolve, reject) => {
    // 如果KaTeX已在window上，直接返回
    if (window.katex) {
      resolve();
      return;
    }

    // 確保CSS只加載一次
    if (!document.querySelector('link[href*="katex.min.css"]')) {
      const link = document.createElement('link');
      link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css";
      link.rel = "stylesheet";
      link.integrity = "sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }

    // 確保JS只加載一次
    if (!document.querySelector('script[src*="katex.min.js"]')) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.js";
      script.integrity = "sha384-X/XCfMm41VSsqRNQgDerQczD69XqmjOOOwYQvr/uuC+j4OPoNhVgjdGFwhvN02Ja";
      script.crossOrigin = "anonymous";
      script.async = true;
      script.onload = () => {
        window.katexReady = true;
        resolve();
      };
      script.onerror = () => {
        reject(new Error("Failed to load KaTeX"));
      };
      document.body.appendChild(script);
    } else {
      // JS已存在但可能未完成加載
      const checkKatex = setInterval(() => {
        if (window.katex) {
          window.katexReady = true;
          clearInterval(checkKatex);
          resolve();
        }
      }, 100);
    }
  });

  return katexLoadPromise;
};

/**
 * 獲取KaTeX實例（確保已加載）
 */
export const getKatex = async () => {
  await loadKatexOnce();
  return window.katex;
};
