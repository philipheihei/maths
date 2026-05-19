# GitHub Copilot Instructions - 遊數得計 (Math Learning Platform)

## Project Overview
Traditional Chinese (zh-Hant) interactive mathematics learning platform built with React + Vite + Tailwind CSS. The app consists of multiple standalone educational quiz modules targeting Hong Kong DSE curriculum levels F1-F6.

## Architecture Pattern: Single-File Quiz Modules

Each quiz in `src/apps/*.jsx` is a **self-contained component** (~600-900 lines) with:
- Complete quiz logic, state management, and UI in one file
- SVG-based interactive visualizations (geometry, drag-and-drop)
- No external state management libraries - uses React hooks only
- Direct KaTeX/external library integration via CDN when needed

**Key insight**: This is NOT a microservices architecture - each quiz is a monolithic component by design for educational simplicity and portability.

## Core File Structure

```
src/
├── App.jsx              # React Router setup with 5 routes
├── main.jsx             # Standard Vite entry point
├── pages/Home.jsx       # Hub with filterable quiz cards (by level/category)
└── apps/
    ├── AngleQuiz.jsx           # Geometry angle naming (SVG rendering, 3-level difficulty)
    ├── CircleTheorems.jsx      # DSE circle theorems (draggable interactive SVG)
    ├── IdentityQuiz.jsx        # Algebraic identities (dynamic KaTeX loading)
    └── SimultaneousEqQuiz.jsx  # Word problems (custom virtual keypad)
```

## Critical Development Patterns

### 1. Quiz State Management Convention
All quiz apps follow this structure:
```jsx
const [level, setLevel] = useState(1);
const [score, setScore] = useState(0);
const [currentQuestion, setCurrentQuestion] = useState(null);
const [feedback, setFeedback] = useState({ type: 'neutral', msg: '' });
const [isAnswered, setIsAnswered] = useState(false);
```

### 2. SVG Geometry Generation
**AngleQuiz.jsx** and **CircleTheorems.jsx** use procedural SVG generation:
- Functions like `generateLevel1()`, `generateConvexPolygonPoints()` create random valid geometry
- All coordinates calculated in viewport space (typically 400x300)
- Arc paths use `calculateArcPath()` with angle math for visual feedback

Example from AngleQuiz:
```jsx
const calculateArcPath = (v, p1, p2, radius = 35) => {
  let ang1 = Math.atan2(p1.y - v.y, p1.x - v.x);
  let ang2 = Math.atan2(p2.y - v.y, p2.x - v.x);
  // Returns SVG path string for angle arc
};
```

### 3. Traditional Chinese Language Requirements
- **All UI text must be in Traditional Chinese (繁體中文)**
- Comments can be in Chinese or English
- Variable names in English (`x`, `y`, `level`, `score`)
- Example UI patterns from Home.jsx:
  ```jsx
  badges: [{ level: 'F1', chapter: 'CH5', subject: '面積和體積（一）' }]
  ```

### 4. Custom Input Components
**SimultaneousEqQuiz.jsx** includes a reusable virtual keypad:
```jsx
<Keypad 
  onInput={handleKeypadInput} 
  onDelete={handleDelete} 
  onClear={handleClear}
  onEnter={handleSubmit}
  isVisible={keypadVisible}
  toggleVisibility={toggleKeypad}
/>
```
- Mobile-first design with fixed positioning
- Custom math expression rendering via `MathRenderer` component

### 5. External Library Loading
**IdentityQuiz.jsx** demonstrates CDN-based library loading:
```jsx
const loadKatex = () => {
  return new Promise((resolve, reject) => {
    if (window.katex) { resolve(); return; }
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
    // ...
  });
};
```
**Pattern**: Prefer CDN loading over npm packages for visualization/math libraries to reduce bundle size.

## Developer Workflow

### Build & Run
```bash
npm run dev      # Start dev server (Vite default port 5173)
npm run build    # Production build
npm run preview  # Preview production build
```

### Adding a New Quiz
1. Create `src/apps/YourQuiz.jsx` as a default export functional component
2. Add route in `src/App.jsx`:
   ```jsx
   <Route path="/your-quiz" element={<YourQuiz />} />
   ```
3. Add card entry in `src/pages/Home.jsx` apps array with:
   - `id`, `title`, `description` (Traditional Chinese)
   - `path` matching route
   - `level` (F1-F6), `category` (初中/高中)
   - `badges` array with curriculum chapters

### Question Data Structure
Questions stored as const arrays at top of quiz files:
```jsx
const QUESTIONS = [
  {
    id: 1,
    title: "問題標題",
    text: "完整題目文字...",
    segments: [{ text: "...", keywords: [...], valid: [...], color: "..." }],
    answers: [["正確答案1", "正確答案2"]]
  }
];
```

## Styling Conventions
- **Tailwind utility classes only** - no custom CSS files except `index.css` (basic resets)
- Responsive design: mobile-first with `md:` breakpoints
- Color scheme:
  - Primary: `blue-500`, `blue-600` (interactive elements)
  - Feedback: `green-600` (correct), `red-600` (incorrect)
  - Backgrounds: gradient `from-blue-50 via-indigo-50 to-purple-50`

### Number / Answer Font Rule
- **All numbers and answer displays use the default sans-serif font** (do NOT add `font-mono` to answer inputs, result spans, or math step `<div>`s)
- **Exceptions — `font-mono` is ONLY allowed on:**
  1. CASIO calculator key `<span>` badges (e.g. `bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded`)
  2. Code blocks / terminal output
- LaTeX/KaTeX rendered math is exempt (handled by KaTeX's own stylesheet)

### Multi-line Equation Alignment Rule
When displaying **consecutive calculation steps** (2+ lines), always align the `=` signs vertically using leading spaces or a monospace-friendly layout. Example:
```
2x = 180° - 50° - 70°
2x = 60°
 x = 30°
```
Use a `<pre className="whitespace-pre font-sans">` tag so leading spaces are respected while keeping sans-serif font. In plain `<p>` / `<div>` tags, use `&nbsp;` or pad with a thin `<span>` to push shorter left-hand sides into alignment.

### Equal-Length Tick Mark Rule (SVG)
- **相等長度標記（tick marks）必須與所屬線段垂直**。
- 雙線標記的兩條短線間距要比預設再分開（約 +30%），避免視覺上黏在一起。
- 每條短線長度用中短尺度（約 12-14px），不要過短或過長。
- 顏色沿用幾何標記藍色（例如 `#0ea5e9`），保持全頁圖例一致。

### Coordinate Label Spacing Rule (SVG)
- 坐標標籤一律使用「字母 + 空格 + 括號」格式：`A (x, y)`、`B (x₂, y₂)`、`M (x, y)`、`P (x, y)`。
- 禁止使用無空格寫法（例如 `A(x, y)`、`P(x, y)`）。
- 此規則適用於所有教學圖示與示例 SVG，保持與出版社排版一致。

## Calculator Key Styling (CASIO fx-50FH II)

When displaying CASIO fx-50FH II keys in notes or instructions, **always** use these exact Tailwind classes. Every new notes page or instruction section must follow this standard.

| Key | Examples | Classes |
|-----|----------|---------|
| Black key (standard) | EXE, 0-9, +, −, ×, ÷, log, sin, cos, tan, ln, x², ENG, EXP, Ans, (−), x⁻¹ | `bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded` |
| Gray key — a b/c | a b/c | `bg-gray-500 text-white text-xs font-mono px-2 py-0.5 rounded` |
| Gray key — MODE/SETUP | MODE | `bg-gray-300 text-gray-800 text-xs font-mono px-2 py-0.5 rounded` |
| Gray key — SHIFT | SHIFT | `bg-gray-300 text-yellow-700 text-xs font-mono px-2 py-0.5 rounded` |
| Gray key — ALPHA | ALPHA | `bg-gray-300 text-red-600 text-xs font-mono px-2 py-0.5 rounded` |
| Orange key | Prog, FMLA | `bg-orange-500 text-white text-xs font-mono px-2 py-0.5 rounded` |
| SHIFT secondary label (green) | BIN, DEC, HEX, OCT | `text-green-600 text-xs font-bold` floating `absolute -top-3.5` above base key |

**Floating SHIFT-label pattern** (e.g. BIN printed above log key):
```jsx
<span className="relative inline-block mx-1 align-middle">
  <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
  <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
</span>
```

**Rules:**
- DEL / AC in quiz virtual keypads (touch UI) may use `bg-gray-900 text-red-400` to distinguish from numbers
- Do NOT use `bg-gray-800`, `bg-slate-600`, `bg-green-600`, `bg-purple-600`, or `bg-yellow-500` for CASIO key depictions
- Pure UI buttons (student input keypads in quizzes) are exempt — they use touch-friendly sizing and may differ

## Testing Approach
**No automated tests currently** - validation is done through:
- Manual quiz playthroughs
- Answer validation arrays in question data
- Browser DevTools for SVG coordinate debugging

## Dependencies
```json
"react": "^18.3.1",
"react-router-dom": "^6.22.0",  // Client-side routing only
"lucide-react": "^0.344.0"      // Icon library
```

**Note**: No state management (Redux/Zustand), no form libraries, no CSS-in-JS.

## MC Question Rules
- **每條MC必須有恰好4個選項**（1個正確 + 3個錯誤）
- Wrong answer arrays must always contain exactly 3 distinct items, all different from the correct answer
- Always use `[...new Set([w1, w2, w3].filter(w => w !== correct))]` and pad with a `while` loop if fewer than 3 remain
- Never rely on hardcoded wrongs being distinct — verify algebraically that no two wrongs can be equal for any valid input

## TrigQuiz — 答案顯示規則（3位有效數字）

`src/apps/TrigQuiz.jsx` 的所有非精確（irrational）答案必須**顯示為3位有效數字，並保留尾隨零**（如 `59.0`，而非 `59`）。

### 實作模式
使用 `format3sf(rawValue)` 函數（而非直接用 `round3sf`）生成顯示字串：
```js
const format3sf = (n) => {
  if (n === 0) return '0';
  if (Math.abs(n - Math.round(n)) < 0.001) return String(Math.round(n)); // exact integer
  return n.toPrecision(3); // preserves trailing zeros e.g. "59.0", "17.3"
};
```

### 使用規則
- **角度／無理數邊長**：先算 raw float → `round3sf(raw)` 存為數值（用於 SVG 繪圖）→ `format3sf(raw)` 存為 `answer` 字串（用於顯示及步驟）
- **精確整數答案**（如 `sin30° → a = c/2`）：直接儲存數值，`String(integer)` 顯示即可，無需 `format3sf`
- `answer` 欄位改為字串後，比較時須用 `round3sf(Number(correctVal))`

### 範例
| raw | `format3sf` 輸出 | 顯示 |
|-----|----------------|------|
| 59.036° | `"
"` | 59.0° ✓ |
| 45.000° | `"45"` | 45° ✓（精確值）|
| 8.6602 | `"8.66"` | 8.66 ✓ |
| 17.321 | `"17.3"` | 17.3 ✓ |

## Common Pitfalls
1. **SVG coordinate system**: Remember Y-axis increases downward; angles calculated with `Math.atan2(y, x)`

## GeneralTriangleSVG — 邊長標記規則

`GeneralTriangleSVG`（用於畢氏定理逆定理等）的邊長標記必須放置在**邊的中點，並沿著「垂直於該邊」的法向量向外偏移**，避免標籤與線段重疊或擠在狹長三角形兩側：
```jsx
// 1. 計算重心
const gcx = (pts[0].x + pts[1].x + pts[2].x) / 3;
const gcy = (pts[0].y + pts[1].y + pts[2].y) / 3;

// 2. 針對每條邊 (from, to) 計算中點與法向量
const mx = (from.x + to.x) / 2;
const my = (from.y + to.y) / 2;
const vx = to.x - from.x;
const vy = to.y - from.y;

// 3. 產生垂直法向量 (-vy, vx)
let nx = -vy;
let ny = vx;

// 4. 確保法向量指向三角形外側（藉由與「重心到中點」向量的內積測試）
if (nx * (mx - gcx) + ny * (my - gcy) < 0) {
  nx = -nx; ny = -ny;
}

// 5. 正規化並乘上固定偏移量 (off = 16)
const nLen = Math.sqrt(nx * nx + ny * ny) || 1;
const off = 16;
const lx = mx + (nx / nLen) * off;
const ly = my + (ny / nLen) * off;

<text x={lx} y={ly} fontSize="13" fontWeight="bold" textAnchor="middle" dominantBaseline="central" fill="#1e3a5f">{len}</text>
```
- 這種做法依賴「法向量」，能保證文字**確實平行且垂直推遠於邊線**，不會在鈍角或狹長圖形中被擠進去。
- SVG 尺寸建議加寬增加 padding 以免出界（例如：`svgW=240, svgH=210, pad=48`）。
- **不要**使用單純的從重心往外推（偏移角度不等於垂直線段）或加白色背景蓋住線段（易造成視覺不連貫）。

---

1. **SVG coordinate system**: Remember Y-axis increases downward; angles calculated with `Math.atan2(y, x)`
2. **Traditional Chinese**: Do not use Simplified Chinese (简体中文)
3. **Route paths**: Must match exactly between App.jsx and Home.jsx `path` property
4. **Answer validation**: Always provide multiple valid answer formats in `valid` arrays (e.g., `["x+y=10", "y+x=10"]`)
5. **MC 4 options**: After building the options array, assert `opts.length === 4` mentally — if wrongs can collide or equal correct for any parameter value, add deduplication + padding
6. **標記文字和arc不會重疊**: 在繪製SVG標記（文字a, b, c等）時，適當調整半徑和坐標，確保文字與角度arc保持足夠距離，不發生重疊。
7. **SVG Arc 方向 (Sweep-flag) — 一步到位規則**:
   - SVG arc 指令格式：`A rx ry 0 large-arc-flag sweep-flag ex ey`
   - **sweep-flag = 1**：從起點**順時針**畫到終點（弧凸向右/向下）
   - **sweep-flag = 0**：從起點**逆時針**畫到終點（弧凸向左/向上）
   - SVG Y 軸向下，所以「角往內包」的規律為：
     - **頂角（頂點在上，開口向下）**：起點在左邊斜線上，終點在右邊斜線上 → `sweep-flag = 0`
       ```svg
       <!-- 頂角，頂點 (150,20)，左邊到右邊 -->
       <path d="M 135.9 34.1 A 20 20 0 0 0 164.1 34.1" />
       ```
     - **左底角（頂點在左下，開口向右上）**：起點在底線上，終點在斜線上 → `sweep-flag = 0`
       ```svg
       <!-- 左底角，頂點 (60,110) -->
       <path d="M 80 110 A 20 20 0 0 0 74.1 95.9" />
       ```
     - **右底角（頂點在右下，開口向左上）**：起點在底線上，終點在斜線上 → `sweep-flag = 1`
       ```svg
       <!-- 右底角，頂點 (240,110) -->
       <path d="M 220 110 A 20 20 0 0 1 225.9 95.9" />
       ```
   - **計算 arc 端點的正確方法**：從頂點出發，沿各邊方向移動 radius 距離
     ```js
     // 頂點 V，邊方向單位向量 (ux,uy)，半徑 r
     startX = V.x + ux1 * r;  startY = V.y + uy1 * r;
     endX   = V.x + ux2 * r;  endY   = V.y + uy2 * r;
     ```
   - 如弧看起來反了，優先檢查端點計算是否沿邊方向（而非垂直方向），再考慮切換 sweep-flag。
