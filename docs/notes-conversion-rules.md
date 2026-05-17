# Notes 轉換規則（F1-F6）

## KaTeX 顯示規則
- 轉換手寫筆記時，凡是包含分數、次方、根號、百分比、三角函數的算式，優先使用 KaTeX。
- 獨立算式使用區塊顯示（block）；行內算式才用 inline。
- 例子：
  - `\\frac{3}{4}`、`x^2`、`\\sqrt{5}`、`25\\%`、`\\sin 30^\\circ`

## Highlight 與箭嘴解釋規則
- 黃底、綠底、粉底等手寫 highlight 要保留語意（以 Tailwind highlight 呈現）。
- 紅色箭嘴字屬於該行算式解釋時，盡量與該行同一橫行顯示，避免跳行失去對應。

## 百分變化（新舊）規則
- 在百分變化例子中，清楚標示「新」與「舊」所對應的數值。
- 例如：6000 屬於新、5000 屬於舊，並在代入式中保持可視化標記。

## 新增章節防漏檢查（必做）
每次新增 Notes 章節，必須同時完成以下三項：
1. 在對應檔案新增 React Notes component。
2. 在 notesData 的章節資料加入 topic 與 subtopics。
3. 在 NOTES_COMPONENTS 加入 id 對應 component（缺少這步會導致左欄有內容但右邊顯示不到）。
