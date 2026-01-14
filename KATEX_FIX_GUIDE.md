# KaTeX 重複加載問題修復指南

## 問題診斷 ❌

### 症狀
- 添加 Subject.jsx 後，其他 app（IdentityQuiz、DispersionQuiz 等）的公式重複顯示兩次
- 公式渲染不穩定或出現樣式異常

### 根本原因
每個 app 都在**獨立加載** KaTeX CSS 和 JS：

```jsx
// ❌ 舊的做法（每個 app 都這樣做）
const loadKatex = () => {
  // 檢查 window.katex
  // 添加 <link href="...katex.min.css" /> ← 重複！
  // 添加 <script src="...katex.min.js" /> ← 重複！
};
```

**結果**：
- KaTeX CSS 被加載**多次**，導致樣式衝突
- 公式渲染層疊重複
- 多個 `<link>` 標籤在 DOM 中

---

## 解決方案 ✅

### 1. 創建統一的 KaTeX 加載器
📄 **新文件**: `src/utils/katexLoader.js`

```javascript
let katexLoadPromise = null;

export const loadKatexOnce = () => {
  if (katexLoadPromise) {
    return katexLoadPromise;  // ← 返回同一個 Promise
  }

  katexLoadPromise = new Promise((resolve, reject) => {
    if (window.katex) {
      resolve();
      return;
    }

    // ✅ 檢查 CSS 是否已存在
    if (!document.querySelector('link[href*="katex.min.css"]')) {
      const link = document.createElement('link');
      link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // ✅ 檢查 JS 是否已存在
    if (!document.querySelector('script[src*="katex.min.js"]')) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.js";
      script.async = true;
      script.onload = () => {
        window.katexReady = true;
        resolve();
      };
      document.body.appendChild(script);
    }
  });

  return katexLoadPromise;
};
```

### 2. 更新所有 App 使用統一加載器

#### 修改模式
```javascript
// ❌ 舊：每個 app 定義自己的 loadKatex()
// ✅ 新：導入共享的 loadKatexOnce()

import { loadKatexOnce } from '../utils/katexLoader';

// 在 Latex/MathDisplay 組件中
useEffect(() => {
  loadKatexOnce().then(() => setIsLoaded(true));
}, []);
```

#### 修改的文件
1. ✅ **Subject.jsx** - 已修改
2. ✅ **IdentityQuiz.jsx** - 已修改
3. ✅ **CompoundInequalityQuiz.jsx** - 已修改
4. ✅ **DispersionQuiz.jsx** - 已修改
5. ✅ **VariationQuiz.jsx** - 已修改

---

## 核心改進點 🎯

| 方面 | 舊方法 | 新方法 |
|------|------|-------|
| **CSS 加載** | 每個 app 各加一份 | 共享一份，檢查後不重複 |
| **JS 加載** | 每個 app 各加一份 | 共享一份，檢查後不重複 |
| **Promise 管理** | 每個 component 各建 Promise | 全局單一 Promise 實例 |
| **DRY 原則** | 違反（代碼重複） | 遵守（單一職責） |

---

## 預防策略 🛡️

### ✅ 下次添加新 Quiz 時的步驟

1. **導入統一加載器**
   ```javascript
   import { loadKatexOnce } from '../utils/katexLoader';
   ```

2. **在 Math 組件中使用**
   ```javascript
   const MathComponent = ({ latex }) => {
     const [isLoaded, setIsLoaded] = useState(false);
     
     useEffect(() => {
       loadKatexOnce().then(() => setIsLoaded(true));
     }, []);
     
     useEffect(() => {
       if (isLoaded && window.katex && containerRef.current) {
         window.katex.render(latex, containerRef.current, { ... });
       }
     }, [latex, isLoaded]);
     
     return <span ref={containerRef} />;
   };
   ```

3. **❌ 不要做這些**
   - ❌ 不要在每個 app 中定義 `loadKatex()` 函數
   - ❌ 不要用 `<link>` 或 `<script>` 直接在 JSX 中渲染
   - ❌ 不要在 `useEffect` 中多次添加相同的資源

4. **✅ 做這些**
   - ✅ 總是使用 `loadKatexOnce()`
   - ✅ 在 Latex 組件中等待 Promise 完成
   - ✅ 檢查 `window.katex` 是否存在後再用

---

## 驗證修復 ✓

### 檢查清單
- [ ] 打開任意兩個 app（如 Subject + IdentityQuiz）
- [ ] 切換 app，確認公式**只顯示一次**
- [ ] 打開瀏覽器開發者工具 → Elements
- [ ] 檢查 `<head>` 中只有**一個** `katex.min.css` `<link>` 標籤
- [ ] 檢查只有**一個** `katex.min.js` `<script>` 標籤
- [ ] 公式渲染正常，無重疊或模糊

### DevTools 檢查
```
F12 → Elements → <head>
應該看到：
✅ <link href="...katex.min.css" ...> (僅一個)
✅ <script src="...katex.min.js" ...> (僅一個)
```

---

## 技術原理 🔧

### Promise 單例模式
```javascript
let katexLoadPromise = null;  // ← 全局變量儲存狀態

export const loadKatexOnce = () => {
  if (katexLoadPromise) {
    return katexLoadPromise;  // ← 無論何時調用，都返回同一個 Promise
  }
  // ... 第一次才執行加載邏輯
};
```

### 多個 app 同時調用的執行流
```
App 1 called loadKatexOnce() → Promise created, loading starts
  ↓
App 2 called loadKatexOnce() → Returns existing Promise (等待中)
  ↓
App 3 called loadKatexOnce() → Returns existing Promise (等待中)
  ↓
KaTeX loaded → All apps are resolved with same Promise
```

---

## 常見問題 ❓

### Q: 為什麼不用 CDN 或全局 `<script>` 在 index.html 中？
A: 為了：
- 保持個別 app 的獨立性和可移植性
- 避免強制所有 app 都加載 KaTeX（可能未用到）
- 使代碼更清晰明瞭

### Q: 如果某個 app 不需要 KaTeX 怎麼辦？
A: 簡單 —— 不要調用 `loadKatexOnce()`！其他 app 不受影響。

### Q: `window.katexReady` 有什麼用？
A: 用於某些特殊情況下檢查 KaTeX 是否完全加載完成（可選）。

---

## 相關文件清單 📋

- ✅ `src/utils/katexLoader.js` - 新建的統一加載器
- ✅ `src/apps/Subject.jsx` - 已更新
- ✅ `src/apps/IdentityQuiz.jsx` - 已更新
- ✅ `src/apps/CompoundInequalityQuiz.jsx` - 已更新
- ✅ `src/apps/DispersionQuiz.jsx` - 已更新
- ✅ `src/apps/VariationQuiz.jsx` - 已更新

---

**修復完成！** 🎉 現在所有 app 共享一個 KaTeX 實例，公式將正確顯示，無重複。
