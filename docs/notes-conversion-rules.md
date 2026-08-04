# Notes 轉換規則（F1-F6）

## KaTeX 顯示規則
- 轉換手寫筆記時，凡是包含分數、次方、根號、百分比、三角函數的算式，優先使用 KaTeX。
- 獨立算式使用區塊顯示（block）；行內算式才用 inline。
- 例子：
  - `\\frac{3}{4}`、`x^2`、`\\sqrt{5}`、`25\\%`、`\\sin 30^\\circ`

## Highlight 與箭嘴解釋規則
- 黃底、綠底、粉底等手寫 highlight 要保留語意（以 Tailwind highlight 呈現）。
- 紅色箭嘴字屬於該行算式解釋時，盡量與該行同一橫行顯示，避免跳行失去對應。

## CASIO fx-50FH II LCD 顯示規範
- Notes 中需要模擬計算機螢幕時，優先使用 `CalculatorLCD`（由 `src/notes/shared.jsx` 匯出），不要在頁面內重新手寫 LCD HTML/CSS。
- 元件格式：`<CalculatorLCD original="0.000031715" mantissa="3.1715" exponent="-05" />`。
- 顯示結構必須跟隨 fx-50FH II：原數放左上方；科學記數法尾數放右下方；`x10` 放尾數右側；指數（例如 `-05`）放在 `x10` 的右上方。
- LCD 外觀標準：寬度最多 `520px`、比例 `520 / 140`、圓角約 `10px`、綠灰色 radial gradient、內陰影、外陰影及左上至右下的半透明 glare。
- 數字字體使用 DSEG7 Classic（jsDelivr `dseg@0.46.0`）；`x10` 使用 Arial/Helvetica 類 sans-serif，以接近實機排版。
- 顯示區必須 `width: min(520px, 100%)`，確保手機版不會水平溢出；原數靠上顯示、尾數靠下顯示，並保留足夠上下行間距，不可令原數、尾數或指數重疊。
- 這個 LCD 樣式只用於計算機顯示示意；一般答案、算式步驟及輸入框仍遵守數字使用 sans-serif 的規則。

## 百分變化（新舊）規則
- 在百分變化例子中，清楚標示「新」與「舊」所對應的數值。
- 例如：6000 屬於新、5000 屬於舊，並在代入式中保持可視化標記。

## 新增章節防漏檢查（必做）
每次新增 Notes 章節，必須同時完成以下三項：
1. 在對應檔案新增 React Notes component。
2. 在 notesData 的章節資料加入 topic 與 subtopics。
3. 在 NOTES_COMPONENTS 加入 id 對應 component（缺少這步會導致左欄有內容但右邊顯示不到）。
