# 修復總結：KaTeX 重複加載問題

## 問題陳述
加入 Subject.jsx 後，其他 app（如 IdentityQuiz、DispersionQuiz）的公式開始重複顯示兩次，且可能破壞原有的 KaTeX 樣式設置。

---

## 原因分析

### 問題的根源
每個 app 都在其內部獨立定義並調用 `loadKatex()` 函數：

```javascript
// ❌ 舊設計（各 app 各自為政）
// Subject.jsx 中
const KatexStyle = () => (<link href="...katex.min.css" />);
useEffect(() => {
  const script = document.createElement('script');
  script.src = '...katex.min.js';
  document.body.appendChild(script);
});

// IdentityQuiz.jsx 中也是同樣的邏輯
// CompoundInequalityQuiz.jsx 中也是同樣的邏輯
// ...
```

**結果**：
- KaTeX CSS 被加載 **5 次**（Subject + IdentityQuiz + CompoundInequalityQuiz + DispersionQuiz + VariationQuiz）
- KaTeX JS 被加載 **5 次**
- 多個 CSS `<link>` 標籤導致**樣式層疊覆蓋**
- 多個 JS `<script>` 標籤導致**渲染衝突**
- 結果：公式顯示異常、重複或模糊

---

## 解決方案

### 第 1 步：創建統一的 KaTeX 加載器
**新文件**: `src/utils/katexLoader.js`

核心特性：
- ✅ 全局 Promise 實例（`katexLoadPromise`）確保**只加載一次**
- ✅ DOM 檢查確保不重複添加 `<link>` 和 `<script>`
- ✅ 支持多個 component 同時調用而無衝突

```javascript
let katexLoadPromise = null;

export const loadKatexOnce = () => {
  // 第一次調用時創建 Promise 並加載
  // 後續調用返回同一個 Promise（已解決或待解決）
  if (katexLoadPromise) {
    return katexLoadPromise;
  }
  // ... 加載邏輯
};
```

### 第 2 步：更新所有 App 使用統一加載器

#### 修改的文件及重點
1. **Subject.jsx**
   - ✅ 移除 `KatexStyle()` 組件
   - ✅ 移除重複的 KaTeX JS 加載代碼
   - ✅ 導入並使用 `loadKatexOnce()`
   - ✅ 添加返回主頁按鈕

2. **IdentityQuiz.jsx**
   - ✅ 移除本地 `loadKatex()` 定義
   - ✅ 導入 `loadKatexOnce()`
   - ✅ 在 `Latex` 組件中改用 `loadKatexOnce()`

3. **CompoundInequalityQuiz.jsx**
   - ✅ 移除本地 `loadKatex()` 定義
   - ✅ 導入 `loadKatexOnce()`
   - ✅ 同時簡化了 Latex 組件

4. **DispersionQuiz.jsx**
   - ✅ 移除本地 `loadKatex()` 定義
   - ✅ 導入 `loadKatexOnce()`
   - ✅ 更新 `Fraction`、`KaTeXValue`、`HorizontalFraction` 組件

5. **VariationQuiz.jsx**
   - ✅ 移除繁瑣的 `<link>` 和 `<script>` 添加代碼
   - ✅ 導入 `loadKatexOnce()`
   - ✅ 簡化 useEffect

---

## 修復前後對比

### 修復前
```
瀏覽器 DOM (<head>)：
<link href="...katex.min.css" />        ← Subject
<link href="...katex.min.css" />        ← IdentityQuiz
<link href="...katex.min.css" />        ← CompoundInequalityQuiz
<link href="...katex.min.css" />        ← DispersionQuiz
<link href="...katex.min.css" />        ← VariationQuiz
<script src="...katex.min.js" />        ← Subject
<script src="...katex.min.js" />        ← IdentityQuiz
<script src="...katex.min.js" />        ← CompoundInequalityQuiz
<script src="...katex.min.js" />        ← DispersionQuiz
<script src="...katex.min.js" />        ← VariationQuiz

結果：✗ 公式重複顯示、樣式衝突
```

### 修復後
```
瀏覽器 DOM (<head>)：
<link href="...katex.min.css" />        ← ✅ 只有一個
<script src="...katex.min.js" />        ← ✅ 只有一個

所有 app 共享同一個 KaTeX 實例
結果：✓ 公式正確顯示、無衝突
```

---

## 下次如何避免

### 新增 Quiz 時的最佳實踐 ✅

```javascript
// ✅ 正確做法
import { loadKatexOnce } from '../utils/katexLoader';

const MyMathComponent = ({ latex }) => {
  const containerRef = useRef(null);
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

### 禁止做法 ❌

```javascript
// ❌ 錯誤 1：重新定義 loadKatex
const loadKatex = () => { ... };

// ❌ 錯誤 2：直接在 JSX 中渲染 link/script
return <link href="...katex.min.css" />;

// ❌ 錯誤 3：在 useEffect 中多次添加資源
useEffect(() => {
  document.head.appendChild(link);  // ← 每次 render 都添加
}, []);
```

### 檢查清單 📋
- [ ] 新 Quiz 導入 `loadKatexOnce` ？
- [ ] 是否定義了本地 `loadKatex()` ？（應該沒有）
- [ ] 是否有 `<link>` 或 `<script>` 直接在 JSX 中？（應該沒有）
- [ ] Math 組件是否等待 `loadKatexOnce()` 完成？

---

## 測試驗證

### 快速測試步驟
1. 打開兩個不同的 Quiz（如 Subject + IdentityQuiz）
2. 確認公式**只顯示一次**（不是兩次）
3. 切換 Quiz，確認無錯誤消息
4. 打開 DevTools → Elements → 檢查 `<head>`：
   - ✅ 只有 1 個 KaTeX CSS `<link>`
   - ✅ 只有 1 個 KaTeX JS `<script>`

### 預期結果
- ✅ 所有公式正確渲染
- ✅ 無樣式衝突
- ✅ 無重複顯示
- ✅ 性能提升（減少網路請求）

---

## 技術細節

### Promise 單例模式
```javascript
let katexLoadPromise = null;

// 無論何時調用，返回同一個 Promise
if (katexLoadPromise) {
  return katexLoadPromise;  // ← 關鍵
}

katexLoadPromise = new Promise(...);
return katexLoadPromise;
```

### DOM 查詢檢查
```javascript
// 確保不重複添加 CSS
if (!document.querySelector('link[href*="katex.min.css"]')) {
  document.head.appendChild(link);
}

// 確保不重複添加 JS
if (!document.querySelector('script[src*="katex.min.js"]')) {
  document.body.appendChild(script);
}
```

---

## 相關文件

| 文件 | 狀態 | 說明 |
|------|------|------|
| `src/utils/katexLoader.js` | ✅ 新建 | 統一 KaTeX 加載器 |
| `src/apps/Subject.jsx` | ✅ 已修改 | 移除重複加載 |
| `src/apps/IdentityQuiz.jsx` | ✅ 已修改 | 使用統一加載器 |
| `src/apps/CompoundInequalityQuiz.jsx` | ✅ 已修改 | 使用統一加載器 |
| `src/apps/DispersionQuiz.jsx` | ✅ 已修改 | 使用統一加載器 |
| `src/apps/VariationQuiz.jsx` | ✅ 已修改 | 使用統一加載器 |
| `KATEX_FIX_GUIDE.md` | ✅ 新建 | 詳細修復指南 |

---

## 總結

| 層面 | 改進 |
|------|------|
| **代碼質量** | DRY 原則，減少重複代碼 |
| **維護性** | 統一管理 KaTeX 加載邏輯 |
| **性能** | 減少 5 倍的網路請求和 DOM 操作 |
| **穩定性** | 消除樣式衝突和渲染問題 |
| **可擴展性** | 新 Quiz 只需一行導入，無需重寫加載邏輯 |

**修復完成！** 🎉
