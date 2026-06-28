import {
  BasicCalculationNotes,
  AlgebraBasicNotes,
  ApproximationNotes,
  CongruentTrianglesNotes,
  DirectedNumbersNotes,
  PolynomialsNotes,
  AreaVolumeNotes,
  LinearEquationNotes,
  AdvancedLinearEquationNotes,
  StatisticsNotes,
  CoordinateNotes,
  PercentageNotes,
  AnglesNotes,
  RateRatioNotes,
} from './F1Notes';
import {
  InequalityNotes,
  SimultaneousEqF2Notes,
  PythagorasF2Notes,
  TrigRatiosF2Notes,
  MeasurementErrorsNotes,
  SimilarTrianglesNotes,
  TriangleLineAnglesNotes,
  AlgebraicFractionsNotes,
  IdentitiesF2Notes,
  FactorizationF2Notes,
  CirclesCylindersF2Notes,
} from './F2Notes';
import { FactorizationNotes, TrigonometricIdentitiesNotes, QuadrilateralNotes, CoordinateGeometryF3Notes, TrigonometryApplicationsNotes, TriangleLinesNotes, CentralTendencyNotes, ProbabilityF3Notes, PercentageF3Notes } from './F3Notes';
import { QuadraticEquationNotes, NatureOfRootsNotes, RemainderFactorNotes, FunctionNotes, StraightLineEquationNotes } from './F4Notes';
import { VariationNotes } from './F5Notes';
import { SimEqCalculatorNotes } from './A1Notes';

export const NOTES_DATA = {
  F1: [
    {
      id: 'basic-calculation',
      topic: 'CH1 基礎計算',
      color: 'blue',
      subtopics: [
        { id: 'divisibility', num: 1, title: '1. 整除性', color: 'blue' },
        { id: 'indices', num: 2, title: '2. 指數記數法 (次方)', color: 'blue' },
        { id: 'prime-factorization', num: 3, title: '3. 質因數連乘式', color: 'blue' },
        { id: 'hcf-lcm', num: 4, title: '4. H.C.F. 及 L.C.M.', color: 'blue' },
        { id: 'arithmetic', num: 5, title: '5. 四則運算', color: 'blue' },
      ]
    },
    {
      id: 'directed-numbers',
      topic: 'CH2 有向數',
      color: 'green',
      subtopics: [
        { id: 'positive-negative', num: 1, title: '有向數即正負數', color: 'blue' },
        { id: 'number-line', num: 2, title: '數線與大小', color: 'green' },
        { id: 'operations', num: 3, title: '有向數的乘除變化', color: 'red' },
      ]
    },
    {
      id: 'algebra-basic',
      topic: 'CH3 代數式',
      color: 'emerald',
      subtopics: [
        { id: 'math-translation', num: 1, title: '中文句子 ↔ 數式', color: 'emerald' },
        { id: 'substitution', num: 2, title: '代入法', color: 'emerald' },
        { id: 'sequence', num: 3, title: '數列', color: 'emerald' },
      ]
    },
    {
      id: 'linear-equation',
      topic: 'CH4 一元一次方程',
      color: 'teal',
      subtopics: [
        { id: 'move-terms', num: 1, title: '移項變相反', color: 'green' },
        { id: 'big-picture', num: 2, title: '解代數時，看大畫面', color: 'red' },
        { id: 'fraction-addition', num: 3, title: '分數加減數', color: 'purple' },
      ]
    },
    {
      id: 'area-volume',
      topic: 'CH5 面積與體積 (一)',
      color: 'orange',
      subtopics: [
        { id: 'basic-area', num: 1, title: '簡單圖形的面積', color: 'blue' },
        { id: 'polygon-area', num: 2, title: '計算多邊形面積', color: 'green' },
        { id: 'prism-formulas', num: 3, title: '柱體體積及表面面積', color: 'purple' },
        { id: 'draw-3d', num: 4, title: '畫立體圖', color: 'amber' },
      ]
    },
    {
      id: 'polynomials',
      topic: 'CH6 多項式',
      color: 'purple',
      subtopics: [
        { id: 'definition', num: 1, title: '分辨單項式與多項式', color: 'blue' },
        { id: 'terms-coeff', num: 2, title: '項數、係數與常數項', color: 'blue' },
        { id: 'degree-order', num: 3, title: '次數與排列', color: 'green' },
        { id: 'addition-subtraction', num: 4, title: '多項式的加減', color: 'orange' },
        { id: 'multiplication', num: 5, title: '多項式的乘法', color: 'red' },
      ]
    },
    {
      id: 'advanced-linear-equation',
      topic: 'CH7 進階一元一次方程',
      color: 'indigo',
      subtopics: [
        { id: 'advanced-equations', num: 1, title: '進階解方程', color: 'blue' },
      ]
    },
    {
      id: 'statistics',
      topic: 'CH8 統計(一)',
      color: 'cyan',
      subtopics: [
        { id: 'bar-chart', num: 1, title: '棒形圖', color: 'blue' },
        { id: 'pie-chart', num: 2, title: '圓形圖', color: 'blue' },
        { id: 'line-graph', num: 3, title: '折線圖', color: 'blue' },
        { id: 'stem-leaf', num: 4, title: '幹葉圖', color: 'blue' },
        { id: 'discrete-continuous', num: 5, title: '連續數據 / 離散數據', color: 'red' },
        { id: 'frequency-table', num: 6, title: '頻數分佈表 (填表格)', color: 'blue' },
      ]
    },
    {
      id: 'percentage',
      topic: 'CH9 百分數',
      color: 'emerald',
      subtopics: [
        { id: 'interconversion', num: 1, title: '百分數 / 小數 / 分數互化', color: 'blue' },
        { id: 'percentage-of-part', num: 2, title: '表達部份的百分數', color: 'green' },
        { id: 'percentage-comparison', num: 3, title: '百分數比較', color: 'amber' },
        { id: 'percentage-change', num: 4, title: '百分變化', color: 'purple' },
      ]
    },
    {
      id: 'coordinate',
      topic: 'CH10 坐標幾何',
      color: 'sky',
      subtopics: [
        { id: 'coordinate-system', num: 1, title: '坐標系統 (直角坐標)', color: 'blue' },
        { id: 'quadrants', num: 2, title: '象限', color: 'green' },
        { id: 'length', num: 3, title: '坐標線段 找長度', color: 'amber' },
        { id: 'transformation', num: 4, title: '點的轉換', color: 'red' },
      ]
    },
    {
      id: 'angles',
      topic: 'CH11 直線相關的角',
      color: 'rose',
      subtopics: [
        { id: 'lines-angles-naming', num: 0, title: '基礎知識：線和角的命名', color: 'slate' },
        { id: 'basic-angle-theorems', num: 1, title: '幾何角度定理 (1-5)', color: 'blue' },
      ]
    },
    {
      id: 'congruent-triangles',
      topic: 'CH12 全等三角形',
      color: 'blue',
      subtopics: [
        { id: 'concept', num: 1, title: '1. 認識概念 (全等)', color: 'blue' },
        { id: 'corresponding-parts', num: 2, title: '2. 連接對應邊/對應角', color: 'green' },
        { id: 'conditions', num: 3, title: '3. 學判斷一組三角形是否全等', color: 'red' },
      ]
    },
    {
      id: 'approximation',
      topic: 'CH13 近似值',
      color: 'green',
      subtopics: [
        { id: 'sig-fig', num: 1, title: '有效數字 & 捨入方法', color: 'green' },
        { id: 'approx-examples', num: 2, title: '題目範例', color: 'blue' },
      ]
    },
    {
      id: 'rate-ratio',
      topic: 'CH14 率與比',
      color: 'blue',
      subtopics: [
        { id: 'unit-conversion', num: 1, title: '1. 單位轉換', color: 'slate' },
        { id: 'rate', num: 2, title: '2. 率 (Rate)', color: 'blue' },
        { id: 'ratio', num: 3, title: '3. 比 (Ratio)', color: 'purple' },
        { id: 'continued-ratio', num: 4, title: '4. 連比', color: 'indigo' },
        { id: 'scale', num: 5, title: '5. 比例圖', color: 'amber' },
        { id: 'proportion', num: 6, title: '6. 正比/反比', color: 'rose' },
      ]
    }
  ],
  F2: [
    {
      id: 'similar-triangles',
      topic: 'CH1 相似三角形',
      color: 'blue',
      subtopics: [
        { id: 'similar-concept', num: 1, title: '1. 認識概念全等與相似', color: 'blue' },
        { id: 'similar-properties', num: 2, title: '2. 相似三角形的性質', color: 'green' },
        { id: 'similar-conditions', num: 3, title: '3. 相似三角形的判定條件', color: 'amber' },
        { id: 'similar-example', num: 4, title: '求未知量例題 (短中長)', color: 'purple' },
      ]
    },
    {
      id: 'triangle-line-angles',
      topic: 'CH2 有關三角形和直線的角',
      color: 'green',
      subtopics: [
        { id: 'advanced-angle-theorems', num: 1, title: '角度定理', color: 'green' },
      ]
    },
    {
      id: 'identities-f2',
      topic: 'CH3 恒等式',
      color: 'indigo',
      subtopics: [
        { id: 'identities-def', num: 1, title: '恒等式的定義', color: 'indigo' },
        { id: 'identities-compare', num: 2, title: '比較法及代入法求常數', color: 'indigo' },
        { id: 'identities-formulas', num: 3, title: '三大必背恒等式', color: 'rose' },
      ]
    },
    {
      id: 'factorization-f2',
      topic: 'CH4 因式分解',
      color: 'emerald',
      subtopics: [
        { id: 'expand-vs-factorize', num: 1, title: '展開 vs 因式分解', color: 'emerald' },
        { id: 'extract-common-f2', num: 2, title: '提取公因式', color: 'purple' },
        { id: 'grouping-f2', num: 3, title: '併項法（用恒等式因式分解）', color: 'blue' },
        { id: 'dse-prev-answer-f2', num: 4, title: 'DSE 題目技巧（善用前一題答案）', color: 'red' },
        { id: 'factorization-tips-f2', num: 5, title: '常見五種情況總結', color: 'amber' },
      ]
    },
    {
      id: 'algebraic-fractions',
      topic: 'CH5 代數分式',
      color: 'purple',
      subtopics: [
        { id: 'addition-subtraction', num: 1, title: '代數分式加減', color: 'purple' },
        { id: 'multiplication-division', num: 2, title: '代數分式乘除', color: 'blue' },
        { id: 'subject-change', num: 3, title: '主項變換', color: 'green' },
      ]
    },
    {
      id: 'measurement-errors',
      topic: 'CH6 量度與誤差',
      color: 'orange',
      subtopics: [
        { id: 'precision-absolute-error', num: 1, title: '精準度與絕對誤差', color: 'orange' },
        { id: 'max-absolute-error', num: 2, title: '最大絕對誤差', color: 'green' },
        { id: 'relative-percentage-error', num: 3, title: '相對誤差與百分誤差', color: 'red' },
      ]
    },
    {
      id: 'inequality',
      topic: 'CH8 不等式',
      color: 'blue',
      subtopics: [
        { id: 'keywords', num: 1, title: '熟悉不同字眼代表的不等式', color: 'blue' },
        { id: 'applications', num: 2, title: '會考核（文字轉換及畫圖）', color: 'green' },
        { id: 'range', num: 3, title: '找不等式範圍的可能值', color: 'purple' },
        { id: 'calculation', num: 4, title: '不等式混算', color: 'red' },
      ]
    },
    {
      id: 'simultaneous-eq-f2',
      topic: 'CH9 二元一次聯立方程',
      color: 'teal',
      subtopics: [
        { id: 'sim-eq-graph', num: 1, title: '圖解法', color: 'teal' },
        { id: 'sim-eq-methods', num: 2, title: '代入法 + 加減法', color: 'sky' },
        { id: 'sim-eq-word', num: 3, title: '文字轉數式', color: 'emerald' },
        { id: 'sim-eq-solutions', num: 4, title: '解的數目', color: 'orange' },
      ]
    },
    {
      id: 'pythagoras-f2',
      topic: 'CH10 畢氏定理',
      color: 'blue',
      subtopics: [
        { id: 'pythagoras-core', num: 1, title: '畢氏定理', color: 'blue' },
      ]
    },
    {
      id: 'trig-ratios-f2',
      topic: 'CH12 三角比',
      color: 'green',
      subtopics: [
        { id: 'trig-ratios-core', num: 1, title: '三角比（不包特殊角）', color: 'green' },
      ]
    },
    {
      id: 'circles-cylinders-f2',
      topic: 'CH13 面積與體積 (二)',
      color: 'teal',
      subtopics: [
        { id: 'circles-circumference-arc', num: 1, title: '圓周及弧長', color: 'teal' },
        { id: 'circles-area-sector', num: 2, title: '圓面積及扇形面積', color: 'blue' },
        { id: 'cylinders', num: 3, title: '圓柱體體積及總表面面積', color: 'purple' },
      ]
    }
  ],
  F3: [
    {
      id: 'factorization',
      topic: 'CH1 因式分解',
      color: 'purple',
      subtopics: [
        { id: 'extract-common', num: 1, title: '提取公因式(重溫)', color: 'purple' },
        { id: 'grouping', num: 2, title: '併項法（重溫）', color: 'blue' },
        { id: 'quadratic', num: 3, title: '二次多項式', color: 'green' },
        { id: 'dse-tips', num: 4, title: 'DSE 題型技巧', color: 'red' },
      ]
    },
    {
      id: 'percentage-f3',
      topic: 'CH3 百分法(二)',
      color: 'emerald',
      subtopics: [
        { id: 'successive-change', num: 1, title: '連續百分變化', color: 'blue' },
        { id: 'growth-depreciation', num: 2, title: '增長/衰減', color: 'green' },
        { id: 'simple-interest', num: 3, title: '利息 (單利息)', color: 'amber' },
      ]
    },
    {
      id: 'quadrilateral',
      topic: 'CH5 四邊形',
      color: 'blue',
      subtopics: [
        { id: 'parallelogram', num: 1, title: '平行四邊形的定義和性質', color: 'blue' },
        { id: 'parallelogram-test', num: 2, title: '平行四邊形的判定條件', color: 'green' },
        { id: 'special-shapes', num: 3, title: '菱形 / 長方形 / 正方形', color: 'orange' },
        { id: 'midpoint-theorem', num: 4, title: '中點定理', color: 'purple' },
        { id: 'intercept-theorem', num: 5, title: '截線定理', color: 'purple' },
      ]
    },
    {
      id: 'triangle-lines',
      topic: 'CH6 三角形的心',
      color: 'orange',
      subtopics: [
        { id: 'four-lines', num: 1, title: '三角形的四條重要線(四線)特徵', color: 'red' },
      ]
    },
    {
      id: 'trig-identities',
      topic: 'CH7 三角比',
      color: 'red',
      subtopics: [
        { id: 'pythagoras', num: 1, title: 'sin cos tan 輔以畢氏定理', color: 'green' },
        { id: 'special-angles', num: 2, title: '特殊三角比', color: 'blue' },
        { id: 'trig-equations', num: 3, title: '三角方程', color: 'purple' },
        { id: 'identities', num: 4, title: '需記三角恆等式', color: 'red' },
      ]
    },
    {
      id: 'trig-applications',
      topic: 'CH8 三角學的應用',
      color: 'teal',
      subtopics: [
        { id: 'gradient-inclination', num: 1, title: '斜率與傾角', color: 'teal' },
        { id: 'contour-lines', num: 2, title: '地圖等高線', color: 'emerald' },
        { id: 'bearings', num: 3, title: '方位角', color: 'blue' },
        { id: 'elevation-depression', num: 4, title: '仰角 / 俯角', color: 'purple' },
      ]
    },
    {
      id: 'coordinate-geometry-f3',
      topic: 'CH9 直線的坐標幾何',
      color: 'teal',
      subtopics: [
        { id: 'coordinate-geometry-core', num: 1, title: '公式表', color: 'teal' },
      ]
    },
    {
      id: 'central-tendency',
      topic: 'CH10 集中趨勢的量度',
      color: 'indigo',
      subtopics: [
        { id: 'basic-measures', num: 1, title: '平均數 中位數 眾數', color: 'blue' },
        { id: 'table-format', num: 2, title: '以表格形式呈現', color: 'green' },
        { id: 'weighted-mean', num: 3, title: '加權平均數', color: 'purple' },
      ]
    },
    {
      id: 'probability-f3',
      topic: 'CH11 概率',
      color: 'orange',
      subtopics: [
        { id: 'tree-diagram-table', num: 1, title: '畫圖找組合/概率', color: 'orange' },
        { id: 'probability-definition', num: 2, title: '概率 (機會率)', color: 'green' },
        { id: 'expected-value', num: 3, title: '期望值', color: 'indigo' },
      ]
    }
  ],
  F4: [
    {
      id: 'quadratic-equation',
      topic: 'CH1 二次方程',
      color: 'red',
      subtopics: [
        { id: 'general-form', num: 1, title: '一般式', color: 'red' },
        { id: 'quad-formula', num: 2, title: '二次公式', color: 'green' },
        { id: 'square-root', num: 3, title: '取平方根法', color: 'blue' },
        { id: 'calculator', num: 4, title: '計算機解未知數', color: 'orange' },
        { id: 'applications', num: 5, title: '二次方程應用題', color: 'purple' },
      ]
    },
    {
      id: 'nature-of-roots',
      topic: 'CH2 二次方程的根的性質',
      color: 'blue',
      subtopics: [
        { id: 'discriminant', num: 1, title: '判別式與根的數目', color: 'blue' },
        { id: 'graph-relations', num: 2, title: 'Δ 與圖像 x 截距的關係', color: 'green' },
        { id: 'find-unknowns', num: 3, title: '求未知數 (k 取值範圍)', color: 'red' },
      ]
    },
    {
      id: 'functions',
      topic: 'CH3 函數 f(x)',
      color: 'indigo',
      subtopics: [
        { id: 'basic-sub', num: 1, title: '簡單代數字', color: 'indigo' },
        { id: 'find-unknown', num: 2, title: '用 f(x) 找未知數', color: 'purple' },
        { id: 'quadratic-graph', num: 3, title: '二次函數圖像', color: 'green' },
        { id: 'coordinates', num: 4, title: '提供坐標', color: 'blue' },
      ]
    },
    {
      id: 'remainder-factor',
      topic: 'CH4 續多項式',
      color: 'teal',
      subtopics: [
        { id: 'remainder', num: 1, title: '餘式定理', color: 'teal' },
        { id: 'factor', num: 2, title: '因式定理', color: 'orange' },
      ]
    },
    {
      id: 'straight-line-equation',
      topic: 'CH5 直線方程',
      color: 'blue',
      subtopics: [
        { id: 'find-equation', num: 1, title: '求直線方程（三種方法）', color: 'blue' },
        { id: 'general-form-line', num: 2, title: '直線的一般式', color: 'green' },
        { id: 'intersection-lines', num: 3, title: '兩直線的交點', color: 'purple' },
      ]
    }
  ],
  F5: [
    {
      id: 'variation',
      topic: 'CH11 變分',
      color: 'blue',
      subtopics: [
        { id: 'variation-formulas', num: 1, title: '四條公式 & 備註', color: 'blue' },
        { id: 'variation-symbol', num: 2, title: '變分符號', color: 'purple' },
        { id: 'variation-questions', num: 3, title: '題目問法', color: 'green' },
      ]
    },
    {
      id: 'circle-properties',
      topic: 'CH12-13 圓形性質',
      color: 'emerald',
      subtopics: [
        { id: 'circle-parts-concepts', num: 1, title: '圓的基本概念', color: 'purple' },
        { id: 'circle-theorems', num: 2, title: '常見圓形定理', color: 'emerald' },
        { id: 'other-theorems', num: 3, title: '其他圓形定理', color: 'teal' },
      ]
    },
    {
      id: 'statistics-f5',
      topic: 'CH14 統計',
      color: 'indigo',
      subtopics: [
        { id: 'stat-7-indicators', num: 1, title: '七個重要統計量', color: 'blue' },
        { id: 'stat-raw-data', num: 2, title: '從獨立數據中找統計量', color: 'indigo' },
        { id: 'stat-graphs', num: 3, title: '從圖表找統計量', color: 'purple' },
        { id: 'stat-standard-score', num: 4, title: '標準分 (Standard Score)', color: 'sky' },
        { id: 'stat-data-change', num: 5, title: '修改數據對各統計量的影響', color: 'red' },
      ]
    },
    {
      id: 'probability-f5',
      topic: 'CH15-16 排列與組合 + 概率',
      color: 'amber',
      subtopics: [
        { id: 'perm-comb-concepts', num: 1, title: '1. 排列 (nPr) vs 組合 (nCr)', color: 'blue' },
        { id: 'AND-OR-rules', num: 2, title: '2. 排列組合的基本法则 (AND / OR)', color: 'purple' },
        { id: 'probability-advanced', num: 3, title: '3. 進階概率計算', color: 'rose' },
        { id: 'at-least-rule', num: 4, title: '4. 「至少」題型', color: 'emerald' },
      ]
    },
    {
      id: 'compound-inequalities',
      topic: 'CH17 複合不等式',
      color: 'rose',
      subtopics: [
        { id: 'basics', num: 1, title: '0. 基礎知識', color: 'blue' },
        { id: 'drawing', num: 2, title: '1. 畫圖找答案', color: 'green' },
        { id: 'example-solving', num: 3, title: '2. 例子與解法', color: 'purple' },
        { id: 'other-formats', num: 4, title: '3. 其他問法', color: 'orange' },
        { id: 'integer-bounds', num: 5, title: '4. 問最大/最小整數', color: 'rose' },
        { id: 'quadratic-application', num: 6, title: '5. 二次不等式 (乙部)', color: 'red' },
      ]
    },
    {
      id: 'linear-programming',
      topic: 'CH18 線性規劃',
      color: 'pink',
      subtopics: [
        { id: 'lp-range', num: 1, title: '透過線段找範圍', color: 'blue' },
        { id: 'lp-mc', num: 2, title: 'MC：考最大值 / 最小值', color: 'red' },
        { id: 'lp-long', num: 3, title: '長答：設立約束條件 (求不等式組)', color: 'green' },
      ]
    },
    {
      id: 'locus-and-circle',
      topic: 'CH19 軌跡及圓的方程',
      color: 'teal',
      subtopics: [
        { id: 'locus-drawing', num: 1, title: '繪畫及描述軌跡', color: 'blue' },
        { id: 'circle-equation', num: 2, title: '圓形方程', color: 'green' },
        { id: 'circle-features', num: 3, title: '找圓心及半徑', color: 'purple' },
        { id: 'point-and-circle', num: 4, title: '點與圓形的位置關係', color: 'orange' },
        { id: 'line-and-circle', num: 5, title: '直線和圓形的交點數目', color: 'red' },
      ]
    }
  ],
  F6: [
    {
      id: 'sequence',
      topic: 'CH20-21 數列',
      color: 'indigo',
      subtopics: [
        { id: 'nth-term', num: 1, title: '通項 (nth term) 與公差/公比', color: 'indigo' },
        { id: 'sum', num: 2, title: '求和 (Summation)', color: 'blue' },
        { id: 'basic-questions', num: 3, title: '考核題型 (1)：分辨與找特定項', color: 'purple' },
        { id: 'advanced-questions', num: 4, title: '考核題型 (2)：求項數與不等式應用', color: 'red' },
        { id: 'other-sequence', num: 5, title: '其他數列', color: 'amber' },
      ]
    },
    {
      id: 'function-transform',
      topic: 'CH22 函數圖像變換',
      color: 'teal',
      subtopics: [
        { id: 'transform-rules', num: 1, title: '變換方向口訣', color: 'blue' },
        { id: 'translation', num: 2, title: '平移 (Translation)', color: 'green' },
        { id: 'reflection', num: 3, title: '反射 (Reflection)', color: 'red' },
        { id: 'stretch', num: 4, title: '伸展及收縮 (Stretch / Contraction)', color: 'purple' },
      ]
    }
  ],
  '高中甲(一)': [
    {
      id: 'simultaneous-eq',
      topic: '聯立方程',
      color: 'blue',
      subtopics: [
        { id: 'calculator', num: 1, title: '計算機使用', color: 'blue' },
      ]
    }
  ],
};

export const getNotesForLevel = (level) => {
  if (level === 'F6') {
    return [...(NOTES_DATA.F4 || []), ...(NOTES_DATA.F5 || []), ...(NOTES_DATA.F6 || [])];
  }
  return NOTES_DATA[level] || [];
};

export const NOTES_COMPONENTS = {
  'basic-calculation': BasicCalculationNotes,
  'algebra-basic': AlgebraBasicNotes,
  'directed-numbers': DirectedNumbersNotes,
  'polynomials': PolynomialsNotes,
  'area-volume': AreaVolumeNotes,
  'linear-equation': LinearEquationNotes,
  'advanced-linear-equation': AdvancedLinearEquationNotes,
  'statistics': StatisticsNotes,
  'coordinate': CoordinateNotes,
  'triangle-line-angles': TriangleLineAnglesNotes,
  'algebraic-fractions': AlgebraicFractionsNotes,
  'identities-f2': IdentitiesF2Notes,
  'factorization-f2': FactorizationF2Notes,
  'circles-cylinders-f2': CirclesCylindersF2Notes,
  'measurement-errors': MeasurementErrorsNotes,
  'inequality': InequalityNotes,
  'simultaneous-eq-f2': SimultaneousEqF2Notes,
  'pythagoras-f2': PythagorasF2Notes,
  'trig-ratios-f2': TrigRatiosF2Notes,
  'factorization': FactorizationNotes,
  'percentage-f3': PercentageF3Notes,
  'trig-identities': TrigonometricIdentitiesNotes,
  'quadrilateral': QuadrilateralNotes,
  'triangle-lines': TriangleLinesNotes,
  'coordinate-geometry-f3': CoordinateGeometryF3Notes,
  'trig-applications': TrigonometryApplicationsNotes,
  'central-tendency': CentralTendencyNotes,
  'probability-f3': ProbabilityF3Notes,
  'quadratic-equation': QuadraticEquationNotes,
  'nature-of-roots': NatureOfRootsNotes,
  'remainder-factor': RemainderFactorNotes,
  'variation': VariationNotes,
  'simultaneous-eq': SimEqCalculatorNotes,
  'approximation': ApproximationNotes,
  'percentage': PercentageNotes,
  'angles': AnglesNotes,
  'congruent-triangles': CongruentTrianglesNotes,
  'rate-ratio': RateRatioNotes,
  'functions': FunctionNotes,
  'straight-line-equation': StraightLineEquationNotes,
  'similar-triangles': SimilarTrianglesNotes,
};
