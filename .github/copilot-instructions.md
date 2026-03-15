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

## Calculator Key Styling (CASIO fx-50FH II)

When displaying CASIO fx-50FH II keys in notes or instructions, **always** use these exact Tailwind classes. Every new notes page or instruction section must follow this standard.

| Key | Examples | Classes |
|-----|----------|---------|
| Black key (standard) | EXE, 0-9, +, −, ×, ÷, log, sin, cos, tan, ln, x², ENG, EXP, Ans, (−), x⁻¹, a b/c | `bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded` |
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

## Common Pitfalls
1. **SVG coordinate system**: Remember Y-axis increases downward; angles calculated with `Math.atan2(y, x)`
2. **Traditional Chinese**: Do not use Simplified Chinese (简体中文)
3. **Route paths**: Must match exactly between App.jsx and Home.jsx `path` property
4. **Answer validation**: Always provide multiple valid answer formats in `valid` arrays (e.g., `["x+y=10", "y+x=10"]`)
5. **MC 4 options**: After building the options array, assert `opts.length === 4` mentally — if wrongs can collide or equal correct for any parameter value, add deduplication + padding
