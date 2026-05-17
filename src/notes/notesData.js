import { ApproximationNotes, AreaVolumeNotes, BasicCalculationNotes, DirectedNumbersNotes, LinearEquationNotes, AdvancedLinearEquationNotes, PolynomialsNotes, StatisticsNotes, CoordinateNotes, PercentageNotes, AnglesNotes } from './F1Notes';
import { InequalityNotes, SimultaneousEqF2Notes, PythagorasF2Notes, TrigRatiosF2Notes, MeasurementErrorsNotes, AlgebraicFractionsNotes } from './F2Notes';
import { FactorizationNotes, TrigonometricIdentitiesNotes, QuadrilateralNotes, CoordinateGeometryF3Notes, TrigonometryApplicationsNotes, TriangleLinesNotes } from './F3Notes';
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
        { id: 'divisibility', num: 1, title: '整除性', color: 'blue' },
        { id: 'indices', num: 2, title: '指數記數法 (次方)', color: 'blue' },
        { id: 'prime-factorization', num: 3, title: '質因數連乘式', color: 'blue' },
        { id: 'hcf-lcm', num: 4, title: '最大公因數 (H.C.F.) 及 最小公倍數 (L.C.M.)', color: 'blue' },
        { id: 'arithmetic', num: 5, title: '四則運算', color: 'blue' },
      ]
    },
    {
      id: 'directed-numbers',
      topic: 'CH2 有向數',
      color: 'red',
      subtopics: [
        { id: 'positive-negative', num: 1, title: '有向數即正負數', color: 'blue' },
        { id: 'number-line', num: 2, title: '數線與大小', color: 'green' },
        { id: 'operations', num: 3, title: '有向數的乘除變化', color: 'red' },
      ]
    },
    {
      id: 'linear-equation',
      topic: 'CH4 一元一次方程',
      color: 'red',
      subtopics: [
        { id: 'move-terms', num: 1, title: '移項變相反', color: 'green' },
        { id: 'big-picture', num: 2, title: '解代數時，看大畫面', color: 'red' },
        { id: 'fraction-addition', num: 3, title: '分數加減數', color: 'purple' },
      ]
    },
    {
      id: 'area-volume',
      topic: 'CH5 面積和體積',
      color: 'amber',
      subtopics: [
        { id: 'basic-area', num: 1, title: '簡單圖形的面積', color: 'blue' },
        { id: 'polygon-area', num: 2, title: '計算多邊形面積', color: 'green' },
        { id: 'prism-formulas', num: 3, title: '柱體體積及表面面積', color: 'purple' },
        { id: 'draw-3d', num: 4, title: '畫立體圖', color: 'amber' },
      ]
    },
    {
      id: 'polynomials',
      topic: 'CH6 多項式的運算',
      color: 'purple',
      subtopics: [
        { id: 'definition', num: 1, title: '分辨單項式與多項式', color: 'blue' },
        { id: 'terms-coeff', num: 2, title: '項數、係數與常數項', color: 'blue' },
        { id: 'degree-order', num: 3, title: '次數與排列', color: 'green' },
        { id: 'addition-subtraction', num: 4, title: '多項式的加減', color: 'orange' },
        { id: 'multiplication', num: 5, title: '多項式的乘法', color: 'red' }
      ]
    },
    {
      id: 'linear-equation-advanced',
      topic: 'CH7 進階一元一次方程',
      color: 'blue',
      subtopics: [
        { id: 'advanced-equations', num: 1, title: '分數方程與拆括號方程', color: 'blue' },
      ]
    },
    {
      id: 'statistics',
      topic: 'CH8 統計(一)',
      color: 'blue',
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
      color: 'blue',
      subtopics: [
        { id: 'interconversion', num: 1, title: '百分數 / 小數 / 分數互化', color: 'blue' },
        { id: 'percentage-of-part', num: 2, title: '表達部份的百分數', color: 'green' },
        { id: 'percentage-comparison', num: 3, title: '百分數比較', color: 'amber' },
        { id: 'percentage-change', num: 4, title: '百分變化', color: 'purple' },
      ]
    },
    {
      id: 'coordinate',
      topic: 'CH10 坐標',
      color: 'amber',
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
      color: 'blue',
      subtopics: [
        { id: 'lines-angles-naming', num: 0, title: '基礎知識：線和角的命名', color: 'slate' },
        { id: 'basic-angle-theorems', num: 1, title: '幾何角度定理 (1-5)', color: 'blue' },
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
    }
  ],
  F2: [
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
    }
  ],
  F3: [
    {
      id: 'factorization',
      topic: 'CH1 因式分解',
      color: 'purple',
      subtopics: [
        { id: 'extract-common', num: 1, title: '提取公因式', color: 'purple' },
        { id: 'grouping', num: 2, title: '併項法', color: 'blue' },
        { id: 'quadratic', num: 3, title: '二次多項式', color: 'green' },
        { id: 'dse-tips', num: 4, title: 'DSE 題型技巧', color: 'red' },
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
        { id: 'roots-sum-product', num: 4, title: '兩根之和與兩根之積', color: 'purple' },
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
        { id: 'find-equation', num: 1, title: '求直線方程的方法', color: 'blue' },
        { id: 'general-form-line', num: 2, title: '直線一般式', color: 'green' },
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
    }
  ],
  F6: [],
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
  const sortByChapter = (topics) => {
    return topics
      .map((topic, index) => ({ topic, index }))
      .sort((a, b) => {
        const aMatch = a.topic.topic.match(/CH\s*(\d+)/i);
        const bMatch = b.topic.topic.match(/CH\s*(\d+)/i);
        const aNum = aMatch ? Number(aMatch[1]) : Number.POSITIVE_INFINITY;
        const bNum = bMatch ? Number(bMatch[1]) : Number.POSITIVE_INFINITY;
        if (aNum !== bNum) return aNum - bNum;
        return a.index - b.index;
      })
      .map(({ topic }) => topic);
  };

  if (level === 'F6') {
    return sortByChapter([...(NOTES_DATA.F4 || []), ...(NOTES_DATA.F5 || []), ...(NOTES_DATA.F6 || [])]);
  }
  return sortByChapter(NOTES_DATA[level] || []);
};

export const NOTES_COMPONENTS = {
  'basic-calculation': BasicCalculationNotes,
  'directed-numbers': DirectedNumbersNotes,
  'algebraic-fractions': AlgebraicFractionsNotes,
  'measurement-errors': MeasurementErrorsNotes,
  'inequality': InequalityNotes,
  'simultaneous-eq-f2': SimultaneousEqF2Notes,
  'pythagoras-f2': PythagorasF2Notes,
  'trig-ratios-f2': TrigRatiosF2Notes,
  'factorization': FactorizationNotes,
  'trig-identities': TrigonometricIdentitiesNotes,
  'quadrilateral': QuadrilateralNotes,
  'triangle-lines': TriangleLinesNotes,
  'coordinate-geometry-f3': CoordinateGeometryF3Notes,
  'trig-applications': TrigonometryApplicationsNotes,
  'quadratic-equation': QuadraticEquationNotes,
  'nature-of-roots': NatureOfRootsNotes,
  'remainder-factor': RemainderFactorNotes,
  'straight-line-equation': StraightLineEquationNotes,
  'variation': VariationNotes,
  'simultaneous-eq': SimEqCalculatorNotes,
  'approximation': ApproximationNotes,
  'area-volume': AreaVolumeNotes,
  'linear-equation': LinearEquationNotes,
  'linear-equation-advanced': AdvancedLinearEquationNotes,
  'polynomials': PolynomialsNotes,
  'statistics': StatisticsNotes,
  'coordinate': CoordinateNotes,
  'percentage': PercentageNotes,
  'functions': FunctionNotes,
  'angles': AnglesNotes,
};
