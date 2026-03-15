import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, RefreshCw, ArrowRight, ArrowLeft, Plus, X, Lightbulb, Home as HomeIcon, BookOpen, Calculator } from 'lucide-react';

// --- 輔助函數 ---

// 最大公因數
const gcd = (a, b) => {
  return b === 0 ? a : gcd(b, a % b);
};

// 排列 (nPr)
const nPr = (n, r) => {
  if (r < 0 || r > n) return 0;
  let res = 1;
  for (let i = 0; i < r; i++) res *= (n - i);
  return res;
};

// 組合 (nCr)
const nCr = (n, r) => {
  if (r < 0 || r > n) return 0;
  if (r > n / 2) r = n - r;
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = res * (n - i + 1) / i;
  }
  return Math.round(res);
};

// 仿 LaTeX 數學符號顯示組件 (顯示 nCr 或 nPr)
const MathNotation = ({ type, n, r }) => (
  <span className="inline-flex items-center font-serif text-lg mx-0.5">
    <span className="italic">{type.toUpperCase()}</span>
    <span className="flex flex-col text-xs leading-tight ml-0.5 gap-0.5">
      <span>{n}</span>
      <span>{r}</span>
    </span>
  </span>
);

// 分數顯示組件 (優化版，支援組件作為分子分母)
const Fraction = ({ num, den }) => (
  <span className="inline-flex flex-col items-center align-middle mx-1 font-serif vertical-align-middle">
    <span className="border-b border-gray-800 leading-normal px-1 pb-0.5 text-center w-full">{num}</span>
    <span className="leading-normal px-1 pt-0.5 text-center w-full">{den}</span>
  </span>
);

// 註解括號組件 (用於還原手寫筆記的下括號和文字對齊)
const AnnotatedMath = ({ math, annotation, subAnnotation, braceColor = "border-purple-600", textColor = "text-purple-700", brace = true }) => (
  <div className="inline-flex flex-col items-center mx-2 my-1 align-top">
    <div className="mb-0.5">{math}</div>
    {brace && (
      <div className={`w-full h-2 border-b-2 border-l-2 border-r-2 rounded-b-md ${braceColor} mb-1 opacity-70`}></div>
    )}
    <div className={`text-xs font-medium text-center whitespace-nowrap ${textColor}`}>{annotation}</div>
    {subAnnotation && (
      <div className="text-[10px] text-slate-500 text-center whitespace-nowrap mt-0.5">{subAnnotation}</div>
    )}
  </div>
);

// --- 通用組件 ---
const FeedbackDisplay = ({ correct, text, onNext, showNextButton = true, nextButtonText = "挑戰下一題" }) => (
  <div className={`p-4 rounded-lg mb-4 mt-4 border ${correct ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
    <div className="flex items-start gap-3">
      <div className="mt-1">
        {correct ? <CheckCircle size={22} className="text-green-600" /> : <XCircle size={22} className="text-red-600" />}
      </div>
      <div className="flex-1">
        <p className="font-bold text-lg mb-1">{correct ? '回答正確！' : '回答錯誤'}</p>
        <div className="text-base leading-relaxed opacity-90">{text}</div>
      </div>
    </div>
    {showNextButton && (
      <button 
        onClick={onNext} 
        className={`mt-4 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${
          correct 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        <RefreshCw size={16}/> {nextButtonText}
      </button>
    )}
  </div>
);

// HintSection: 接收 isOpen 和 setIsOpen 由父組件控制
const HintSection = ({ text, isOpen, setIsOpen }) => {
  return (
    <div className="mt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors"
      >
        <Lightbulb size={18} />
        {isOpen ? '隱藏提示' : '顯示提示'}
      </button>
      {isOpen && (
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-sm animate-fade-in">
          <span className="font-bold">💡 提示：</span>{text}
        </div>
      )}
    </div>
  );
};

// --- Task 1: 排列 vs 組合 (自然情境) ---
const Task1 = ({ onComplete, score = 0 }) => {
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isHintOpen, setIsHintOpen] = useState(false);

  const generateQuestion = useCallback(() => {
    const scenarios = [
      {
        type: 'combination',
        template: (n, r) => `某班有 ${n} 名學生。需從該班中隨機選出 ${r} 名學生組成一個委員會。請問這是排列還是組合？`,
        reason: '選人組成委員會，次序並不重要 (A和B入選 = B和A入選)。',
        hint: '思考：如果選出的學生交換位置，委員會的成員組合會改變嗎？'
      },
      {
        type: 'permutation',
        template: (n, r) => `有 ${n} 位參賽者參加短跑比賽，設有冠、亞、季軍各一名。請問從中選出前 ${r} 名共有多少種結果？`,
        reason: '冠亞季軍有區別，次序很重要 (A冠B亞 ≠ B冠A亞)。',
        hint: '思考：冠軍是 A，亞軍是 B；跟冠軍是 B，亞軍是 A，結果一樣嗎？'
      },
      {
        type: 'combination',
        template: (n, r) => `從 ${n} 張不同的撲克牌中，隨機抽出 ${r} 張牌作為一手牌。請問這是排列還是組合？`,
        reason: '手牌的組合只看有哪些牌，不看抽到的先後次序。',
        hint: '思考：手上的牌重新排列，還是一樣的「一手牌」嗎？'
      },
      {
        type: 'permutation',
        template: (n, r) => `某公司有 ${n} 名員工，需選出 ${r} 人分別擔任經理、秘書和會計。請問這是排列還是組合？`,
        reason: '職位不同 (經理/秘書/會計)，人選的分配順序會影響結果。',
        hint: '思考：職位是有區別的，如果兩人互換職位，算是不同的結果嗎？'
      },
      {
        type: 'permutation',
        template: (n, r) => `用 ${n} 個不同的數字，組成一個 ${r} 位數的密碼 (數字不重複)。請問這是排列還是組合？`,
        reason: '密碼鎖對數字的順序有要求 (123 ≠ 321)。',
        hint: '思考：密碼 123 和 321 能開同一個鎖嗎？'
      },
      {
        type: 'combination',
        template: (n, r) => `麵包店有 ${n} 款不同的麵包，小明想選購 ${r} 款回家吃。請問這是排列還是組合？`,
        reason: '只是選購帶回家，選取的次序不影響最終買到的組合。',
        hint: '思考：先夾 A 麵包再夾 B 麵包，跟先夾 B 再夾 A，最後買回家的麵包一樣嗎？'
      },
      {
        type: 'permutation',
        template: (n, r) => `從 ${n} 名學生中選出 ${r} 名，負責學校開放日中 ${r} 個不同項目。請問這是排列還是組合？`,
        reason: '每名學生負責不同的項目，職責有區別，次序重要（A負責項目1、B負責項目2 ≠ B負責項目1、A負責項目2）。',
        hint: '思考：如果兩位學生交換負責的項目，算是不同的安排嗎？'
      },
      {
        type: 'permutation',
        template: (n) => `把 ${n} 名學生排成兩行準備合照。請問這是排列還是組合？`,
        reason: '排隊拍照有位置順序之分，站位不同會影響照片效果（第一位是A ≠ 第一位是B）。',
        hint: '思考：學生們交換站位，拍出來的照片會一樣嗎？'
      },
      {
        type: 'combination',
        template: (n, r) => `從一副 ${n} 張的撲克牌中抽出 ${r} 張。請問這是排列還是組合？`,
        reason: '抽牌只看抽到哪些牌，不看抽牌的先後順序（手上有A和B = 手上有B和A）。',
        hint: '思考：先抽到紅心A再抽到黑桃K，跟先抽黑桃K再抽紅心A，手上的牌一樣嗎？'
      },
      {
        type: 'permutation',
        template: (n) => `早會時，老師把 ${n} 名學生排成一行。請問這是排列還是組合？`,
        reason: '排成一行有明確的位置順序（第1位、第2位...），次序很重要。',
        hint: '思考：「排隊」這個動作，位置順序重要嗎？'
      }
    ];

    // 強制各 50% 機率，避免因題庫數量不平均而偏向某類型
    const combScenarios = scenarios.filter(s => s.type === 'combination');
    const permScenarios = scenarios.filter(s => s.type === 'permutation');
    const typePool = Math.random() > 0.5 ? permScenarios : combScenarios;
    const scenario = typePool[Math.floor(Math.random() * typePool.length)];
    const n = Math.floor(Math.random() * 6) + 6; 
    const r = scenario.type === 'permutation' && scenario.template.toString().includes('冠') ? 3 : Math.floor(Math.random() * 3) + 2; 

    setQuestion({
      type: scenario.type,
      text: scenario.template(n, r),
      reason: scenario.reason,
      hint: scenario.hint
    });
    setFeedback(null);
    setIsHintOpen(false);
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleAnswer = (ans) => {
    if (feedback) return;
    const isCorrect = ans === question.type;
    setFeedback({
      correct: isCorrect,
      text: isCorrect 
        ? `正確！${question.reason}` 
        : `不正確。提示：${question.reason}`
    });
    onComplete(isCorrect);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between border-b pb-2 border-dashed mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Task 1: 排列 (nPr) vs 組合 (nCr)</h2>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold border border-yellow-300 text-sm">Score: {score}</span>
      </div>
      {question && (
        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <p className="text-xl font-medium text-gray-800 leading-relaxed">{question.text}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleAnswer('permutation')} 
              className={`p-6 rounded-xl text-white font-bold text-xl transition-transform hover:scale-[1.02] active:scale-[0.98] ${feedback && question.type === 'permutation' ? 'ring-4 ring-indigo-300' : ''} bg-indigo-500 shadow-md`}
            >
              排列 (nPr)
            </button>
            <button 
              onClick={() => handleAnswer('combination')} 
              className={`p-6 rounded-xl text-white font-bold text-xl transition-transform hover:scale-[1.02] active:scale-[0.98] ${feedback && question.type === 'combination' ? 'ring-4 ring-teal-300' : ''} bg-teal-500 shadow-md`}
            >
              組合 (nCr)
            </button>
          </div>
          <HintSection text={question.hint} isOpen={isHintOpen} setIsOpen={setIsHintOpen} />
        </div>
      )}
      {feedback && <FeedbackDisplay {...feedback} onNext={generateQuestion} />}
    </div>
  );
};

// --- Task 2: 潛規則 (自然情境) ---

const TASK2_SCENARIOS = [
  // 人
  { build: (t, a, b) => ({
      knownLabel: '男生', unknownLabel: '女生', unit: '名',
      text: `某班總共有 ${t} 名學生。如果已知其中 ${a} 人是「男生」，請推斷有多少個是「女生」？`
  })},
  // 球
  { build: (t, a, b) => ({
      knownLabel: '白球', unknownLabel: '綠球', unit: '個',
      text: `袋子裡總共有 ${t} 個球，當中有白色和綠色。如果已知其中 ${a} 個是「白球」，請推斷有多少個是「綠球」？`
  })},
  { build: (t, a, b) => ({
      knownLabel: '紅球', unknownLabel: '黃球', unit: '個',
      text: `袋子裡總共有 ${t} 個球，當中有紅色和黃色。如果已知其中 ${a} 個是「紅球」，請推斷有多少個是「黃球」？`
  })},
  // 筆
  { build: (t, a, b) => ({
      knownLabel: '紅筆', unknownLabel: '藍筆', unit: '枝',
      text: `筆盒裡總共有 ${t} 枝筆，當中有紅色和藍色。如果已知其中 ${a} 枝是「紅筆」，請推斷有多少枝是「藍筆」？`
  })},
  { build: (t, a, b) => ({
      knownLabel: '綠筆', unknownLabel: '黃筆', unit: '枝',
      text: `筆盒裡總共有 ${t} 枝筆，當中有綠色和黃色。如果已知其中 ${a} 枝是「綠筆」，請推斷有多少枝是「黃筆」？`
  })},
  // 杯
  { build: (t, a, b) => ({
      knownLabel: '紅杯', unknownLabel: '藍杯', unit: '個',
      text: `桌上總共有 ${t} 個杯，當中有紅色和藍色。如果已知其中 ${a} 個是「紅杯」，請推斷有多少個是「藍杯」？`
  })},
  { build: (t, a, b) => ({
      knownLabel: '白杯', unknownLabel: '黑杯', unit: '個',
      text: `桌上總共有 ${t} 個杯，當中有白色和黑色。如果已知其中 ${a} 個是「白杯」，請推斷有多少個是「黑杯」？`
  })},
  // 碟
  { build: (t, a, b) => ({
      knownLabel: '紅碟', unknownLabel: '綠碟', unit: '隻',
      text: `架上總共有 ${t} 隻碟，當中有紅色和綠色。如果已知其中 ${a} 隻是「紅碟」，請推斷有多少隻是「綠碟」？`
  })},
  { build: (t, a, b) => ({
      knownLabel: '白碟', unknownLabel: '藍碟', unit: '隻',
      text: `架上總共有 ${t} 隻碟，當中有白色和藍色。如果已知其中 ${a} 隻是「白碟」，請推斷有多少隻是「藍碟」？`
  })},
];

const Task2 = ({ onComplete, score = 0 }) => {
  const [question, setQuestion] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);

  const generateQuestion = useCallback(() => {
    const total = Math.floor(Math.random() * 20) + 20;
    const groupA = Math.floor(total * 0.4 + Math.random() * (total * 0.3));
    const groupB = total - groupA;

    const tmpl = TASK2_SCENARIOS[Math.floor(Math.random() * TASK2_SCENARIOS.length)];
    const built = tmpl.build(total, groupA, groupB);

    setQuestion({
      total,
      known: groupA,
      unknown: groupB,
      knownLabel: built.knownLabel,
      unknownLabel: built.unknownLabel,
      unit: built.unit,
      text: built.text,
    });
    setFeedback(null);
    setInputValue('');
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const checkAnswer = () => {
    if (feedback) return;
    const userAns = parseInt(inputValue);
    if (userAns === question.unknown) {
      setFeedback({ correct: true, text: `正確！${question.total}（總數）- ${question.known}（${question.knownLabel}）= ${question.unknown} ${question.unit}（${question.unknownLabel}）` });
      onComplete(true);
    } else {
      setFeedback({ correct: false, text: `不正確。${question.total}（總數）- ${question.known}（${question.knownLabel}）= ${question.unknown} ${question.unit}（${question.unknownLabel}）` });
      onComplete(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between border-b pb-2 border-dashed mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Task 2: 隱含資訊 (潛規則)</h2>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold border border-yellow-300 text-sm">Score: {score}</span>
      </div>
      {question && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <p className="text-xl font-medium text-gray-800 leading-relaxed">{question.text}</p>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl w-fit">
            <span className="font-bold text-gray-700">{question.unknownLabel}數量：</span>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-28 text-center border-2 border-gray-300 rounded-lg p-2 text-xl focus:border-blue-500 outline-none no-spinners"
              placeholder="?"
            />
            <button onClick={checkAnswer} className="px-6 py-2.5 rounded-lg text-white font-bold bg-blue-600 hover:bg-blue-700 shadow-sm">提交</button>
          </div>
        </div>
      )}
      {feedback && <FeedbackDisplay {...feedback} onNext={generateQuestion} />}
    </div>
  );
};

// --- Task 3: 列出可能性 (兩階段) ---

// 情境模板（只限兩類選項）
const TASK3_SCENARIOS = [
  // 筆
  { A_color: '紅', B_color: '藍', item: '筆', unit: '枝', container: '盒子' },
  { A_color: '綠', B_color: '黃', item: '筆', unit: '枝', container: '盒子' },
  // 杯
  { A_color: '紅', B_color: '藍', item: '杯', unit: '個', container: '桌上' },
  { A_color: '白', B_color: '黑', item: '杯', unit: '個', container: '桌上' },
  // 碟
  { A_color: '紅', B_color: '綠', item: '碟', unit: '隻', container: '架上' },
  { A_color: '白', B_color: '藍', item: '碟', unit: '隻', container: '架上' },
  // 球
  { A_color: '紅', B_color: '黃', item: '球', unit: '個', container: '袋裡' },
  { A_color: '白', B_color: '黑', item: '球', unit: '個', container: '袋裡' },
  // 男生女生
  { A_color: '', B_color: '', item: '人', unit: '名', container: '組裡', A_name: '男生', B_name: '女生', verb: '同學' },
];

const Task3 = ({ onComplete, score = 0 }) => {
  const [question, setQuestion] = useState(null);
  const [selectedGreens, setSelectedGreens] = useState([]); 
  const [blueInputs, setBlueInputs] = useState({}); 
  const [step, setStep] = useState(1); 
  const [step1Feedback, setStep1Feedback] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const generateQuestion = useCallback(() => {
    const tmpl = TASK3_SCENARIOS[Math.floor(Math.random() * TASK3_SCENARIOS.length)];
    const A_name = tmpl.A_name || `${tmpl.A_color}${tmpl.item}`;
    const B_name = tmpl.B_name || `${tmpl.B_color}${tmpl.item}`;
    const drawNoun = tmpl.verb || tmpl.item;

    const A_total = Math.floor(Math.random() * 3) + 4; 
    const B_total = Math.floor(Math.random() * 4) + 6; 
    let draw_total = Math.floor(Math.random() * 2) + 4; 
    
    const max_A = Math.min(Math.floor(Math.random() * 2) + 1, draw_total - 1); 
    
    let correctGreens = [];
    let rangeOptions = [];
    
    const rangeLimit = Math.min(draw_total, A_total);
    for(let i=0; i<=rangeLimit; i++) {
      const neededBlue = draw_total - i;
      if (i <= max_A && neededBlue <= B_total && neededBlue >= 0) {
        correctGreens.push(i);
      }
      if (neededBlue >= 0) {
        rangeOptions.push(i);
      }
    }
    
    setQuestion({
      A_name, B_name, A_total, B_total, draw_total, max_A, unit: tmpl.unit,
      correctGreens, rangeOptions: rangeOptions.filter((v, i, a) => a.indexOf(v) === i), 
      text: `${tmpl.container}有 ${A_total} ${tmpl.unit} ${A_name} 及 ${B_total} ${tmpl.unit} ${B_name}，從中隨機抽出 ${draw_total} ${tmpl.unit}${drawNoun}。如果條件是「最多抽 ${max_A} ${tmpl.unit} ${A_name}」，請選出所有可能的情況。`,
    });
    setSelectedGreens([]);
    setBlueInputs({});
    setStep(1);
    setFeedback(null);
    setStep1Feedback(null);
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const toggleGreenOption = (num) => {
    if (step !== 1) return;
    setSelectedGreens(prev => {
      if (prev.includes(num)) return prev.filter(n => n !== num);
      return [...prev, num].sort((a,b) => a-b);
    });
  };

  const handleBlueInput = (greenNum, value) => {
    setBlueInputs(prev => ({...prev, [greenNum]: value}));
  };

  const checkStep1 = () => {
    if (step1Feedback) return; 

    const isCorrect = selectedGreens.length === question.correctGreens.length &&
                      selectedGreens.every(val => question.correctGreens.includes(val));
    
    if (isCorrect) {
      setStep1Feedback({ correct: true, text: 'Part 1 正確！您已成功列出所有組合情況。請完成 Part 2 的計算。' });
      setStep(2);
    } else {
      setStep1Feedback({
        correct: false,
        text: `不正確。提示：「最多 ${question.max_A} ${question.unit}」意味著${question.A_name}可以是 ${question.correctGreens.join(' 或 ')} ${question.unit}。現在已為您選出正確選項，請繼續填寫對應的${question.B_name}數量。`
      });
      setSelectedGreens(question.correctGreens); 
      setStep(2); 
    }
  };

  const checkStep2 = () => {
    if (feedback && feedback.correct) return; 

    let allCorrect = true;
    for (let g of selectedGreens) {
      const userBlue = parseInt(blueInputs[g]);
      const correctBlue = question.draw_total - g;
      if (userBlue !== correctBlue || isNaN(userBlue)) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      setFeedback({ correct: true, text: '完全正確！您已成功計算所有組合情況。' });
      onComplete(true);
    } else {
      setFeedback({ correct: false, text: `不正確。請檢查${question.B_name}數量。總共抽 ${question.draw_total} ${question.unit}，如果${question.A_name}有 x ${question.unit}，${question.B_name}應是 ${question.draw_total} - x ${question.unit}。` });
      onComplete(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between border-b pb-2 border-dashed mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Task 3: 列出可能性</h2>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold border border-yellow-300 text-sm">Score: {score}</span>
      </div>
      {question && (
        <div className="space-y-6">
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
            <p className="text-xl font-medium text-gray-800 leading-relaxed">{question.text}</p>
          </div>

          <div className={`transition-all ${step === 2 && step1Feedback?.correct ? 'opacity-50 pointer-events-none' : ''}`}>
            <p className="font-bold text-gray-700 mb-3">1. 請問可能抽到幾枝{question.A_name}？(可多選)</p>
            <div className="flex flex-wrap gap-3">
              {question.rangeOptions.map((num) => (
                <button
                  key={num}
                  onClick={() => toggleGreenOption(num)}
                  className={`w-14 h-14 rounded-full border-2 text-xl font-bold flex items-center justify-center transition-all ${
                    selectedGreens.includes(num)
                      ? 'bg-yellow-500 border-yellow-600 text-white shadow-md scale-110'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-yellow-400'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            {step === 1 && !step1Feedback && (
              <button onClick={checkStep1} className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-700">
                下一步
              </button>
            )}
          </div>

          {step1Feedback && (
            <div className="mt-4 mb-4">
              <FeedbackDisplay 
                correct={step1Feedback.correct} 
                text={step1Feedback.text} 
                showNextButton={false} 
              />
            </div>
          )}
          
          {step === 2 && (
            <div className="animate-fade-in border-t pt-4">
              <p className="font-bold text-gray-700 mb-3">2. 請填寫對應的{question.B_name}數量：</p>
              <div className="space-y-3">
                {selectedGreens.map(g => (
                  <div key={g} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="font-bold text-green-700 w-28 text-right">{g} {question.unit}{question.A_name}</span>
                    <Plus size={16} className="text-gray-400" />
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        value={blueInputs[g] || ''}
                        onChange={(e) => handleBlueInput(g, e.target.value)}
                        className="w-16 text-center border-2 border-blue-200 rounded p-1 focus:border-blue-500 outline-none no-spinners"
                      />
                      <span className="ml-2 text-blue-800 font-bold">{question.unit}{question.B_name}</span>
                    </div>
                  </div>
                ))}
              </div>
              {!feedback?.correct && (
                <button onClick={checkStep2} className="mt-4 px-8 py-3 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 shadow-md">
                  提交答案
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {feedback && <FeedbackDisplay {...feedback} onNext={generateQuestion} />}
    </div>
  );
};

// --- Task 4: 分辨加法與乘法 (修正版) ---
const Task4 = ({ onComplete, score = 0 }) => {
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // 🔥 乘法法則情境庫
  const multiplyScenarios = [
    {
      id: 1,
      generator: () => {
        const main = Math.floor(Math.random() * 2) + 4;
        const soup = Math.floor(Math.random() * 2) + 3;
        const dessert = Math.floor(Math.random() * 2) + 4;
        return {
          text: `餐廳提供 ${main} 款主餐、${soup} 款湯和 ${dessert} 款甜品。客人要各選一款，計算套餐組合數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「各選一款」表示每個類別都要選，是連續步驟（同時發生）。同時發生 → 相乘 (×)\n\n總組合 = ${main} × ${soup} × ${dessert} = ${main * soup * dessert} 種`,
          wrong: `不正確！\n\n「各選一款」表示同時選擇（AND），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 2,
      generator: () => {
        const boys = Math.floor(Math.random() * 3) + 5;
        const girls = Math.floor(Math.random() * 3) + 4;
        const result = boys * girls;
        return {
          text: `某委員會由 ${boys} 名男生和 ${girls} 名女生組成。需選出 1 名男生和 1 名女生作為委員代表，計算有多少種不同的人選配搭時，應該相加還是相乘？`,
          correct: `回答正確！\n\n1 名男生和 1 名女生可以「同時」作為委員代表 → 相乘 (×)\n\n配搭總數 = ₍${boys}₎C₁ × ₍${girls}₎C₁ = ${boys} × ${girls} = ${result} 種`,
          wrong: `不正確！\n\n「男生和女生」都要選（同時發生），兩個步驟可以同時完成 → 相乘 (×)`
        };
      }
    },
    {
      id: 3,
      generator: () => {
        const digits = 10;
        return {
          text: `設定一個 4 位數密碼（0-9）。計算可能的密碼總數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n4 位密碼需要依次填入 4 個數字，是連續步驟（同時發生）。同時發生 → 相乘 (×)\n\n總數 = 10 × 10 × 10 × 10 = ${Math.pow(10, 4)} 種`,
          wrong: `不正確！\n\n每位數字依次選擇（連續步驟），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 4,
      generator: () => {
        const dieSides = [4, 6, 8][Math.floor(Math.random() * 3)];
        const coinSides = 2;
        const total = dieSides * coinSides;
        return {
          text: `同時擲一粒 ${dieSides} 面骰子和拋一枚硬幣，計算所有可能的結果數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n骰子和硬幣的結果同時發生，同時發生 → 相乘 (×)\n\n總數 = ${dieSides} × ${coinSides} = ${total} 種`,
          wrong: `不正確！\n\n骰子和硬幣的結果同時發生，同時發生 → 相乘 (×)\n\n總數 = ${dieSides} × ${coinSides} = ${total} 種`
        };
      }
    },
    {
      id: 5,
      generator: () => {
        const tops = Math.floor(Math.random() * 3) + 5;
        const pants = Math.floor(Math.random() * 3) + 4;
        const shoes = Math.floor(Math.random() * 2) + 3;
        return {
          text: `衣櫃有 ${tops} 件上衣、${pants} 條褲子和 ${shoes} 對鞋子。計算穿搭組合數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n穿搭需要「各選一件」：上衣、褲子和鞋子都要選（同時發生）。同時發生 → 相乘 (×)\n\n組合 = ${tops} × ${pants} × ${shoes} = ${tops * pants * shoes} 種`,
          wrong: `不正確！\n\n穿搭是同時選擇上衣、褲子、鞋子（AND），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 6,
      generator: () => {
        const leaders = Math.floor(Math.random() * 4) + 8;
        return {
          text: `${leaders} 人中選出正副隊長各 1 人（不能同一人）。計算選擇方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n選正副隊長是兩個步驟：先選正隊長，再選副隊長（同時發生）。同時發生 → 相乘 (×)\n\n方法 = ${leaders} × ${leaders - 1} = ${leaders * (leaders - 1)} 種`,
          wrong: `不正確！\n\n「正副隊長」是兩個連續步驟（AND），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 7,
      generator: () => {
        const morning = Math.floor(Math.random() * 2) + 4;
        const afternoon = Math.floor(Math.random() * 2) + 3;
        const evening = Math.floor(Math.random() * 2) + 3;
        return {
          text: `旅行有 ${morning} 個上午活動、${afternoon} 個下午活動和 ${evening} 個晚上活動。若各時段選一個活動，計算行程組合數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「各時段選一個」表示每個時段都要選，是連續步驟（同時發生）。同時發生 → 相乘 (×)\n\n組合 = ${morning} × ${afternoon} × ${evening} = ${morning * afternoon * evening} 種`,
          wrong: `不正確！\n\n「各時段選一個」是連續步驟（AND），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 8,
      generator: () => {
        const totalR = Math.floor(Math.random() * 5) + 8;
        const totalW = Math.floor(Math.random() * 5) + 8;
        const r = Math.floor(Math.random() * 2) + 2;
        const w = Math.floor(Math.random() * 2) + 2;
        return {
          text: `袋中有 ${totalR} 個紅球和 ${totalW} 個白球。計算抽出「${r} 個紅球和 ${w} 個白球」的組合數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「抽紅球和白球」表示兩種都要抽到（同時發生）。同時發生 → 相乘 (×)\n\n組合 = C(${totalR},${r}) × C(${totalW},${w})`,
          wrong: `不正確！\n\n「抽紅球和白球」是同時發生（AND），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 9,
      generator: () => {
        const days = Math.floor(Math.random() * 2) + 3;
        const places = Math.floor(Math.random() * 3) + 5;
        return {
          text: `旅行共 ${days} 天，每天從 ${places} 個景點中選一個。計算行程安排數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「每天選一個」表示 ${days} 個連續步驟，每天都要選（同時發生）。同時發生 → 相乘 (×)\n\n總數 = ${places}^${days} = ${Math.pow(places, days)} 種`,
          wrong: `不正確！\n\n「每天選一個」是 ${days} 個連續步驟（AND），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 10,
      generator: () => {
        const adults = Math.floor(Math.random() * 4) + 8;
        const kids = Math.floor(Math.random() * 3) + 5;
        return {
          text: `有 ${adults} 名成人和 ${kids} 名小童。選 1 名成人和 1 名小童組隊，計算組隊方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「成人和小童」都要選，是兩個步驟（同時發生）。同時發生 → 相乘 (×)\n\n方法 = ${adults} × ${kids} = ${adults * kids} 種`,
          wrong: `不正確！\n\n「選成人和小童」是兩個步驟（AND），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 11,
      generator: () => {
        const sci = Math.floor(Math.random() * 3) + 4;
        const math = Math.floor(Math.random() * 3) + 5;
        const r1 = Math.floor(Math.random() * 2) + 2;
        const r2 = Math.floor(Math.random() * 2) + 2;
        const c1 = nCr(sci, r1);
        const c2 = nCr(math, r2);
        return {
          text: `班上有 ${sci} 本科學書和 ${math} 本數學書。需從科學書中選 ${r1} 本，並從數學書中選 ${r2} 本，計算選書方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n從科學書選「並」從數學書選，兩個動作都要完成（同時發生）→ 相乘 (×)\n\n總數 = ₍${sci}₎C${r1} × ₍${math}₎C${r2} = ${c1} × ${c2} = ${c1 * c2} 種`,
          wrong: `不正確！\n\n「科學書並數學書」是兩個步驟都要完成（AND），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 12,
      generator: () => {
        const total = Math.floor(Math.random() * 5) + 10;
        const select = Math.floor(Math.random() * 2) + 3;
        const positions = select;
        const permutations = nPr(total, select);
        return {
          text: `${total} 名學生排成 ${positions} 個位置（第1位、第2位...第${positions}位）。計算排列方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n排列需要依次填入每個位置，${positions} 個步驟連續進行（同時發生）→ 相乘 (×)\n\n方法 = ₍${total}₎P${select} = ${permutations} 種`,
          wrong: `不正確！\n\n排列是連續步驟（AND），每個位置都要填入 → 相乘 (×)`
        };
      }
    },
    {
      id: 13,
      generator: () => {
        const males = Math.floor(Math.random() * 4) + 6;
        const females = Math.floor(Math.random() * 4) + 6;
        const r1 = 2;
        const r2 = 3;
        const c1 = nCr(males, r1);
        const c2 = nCr(females, r2);
        return {
          text: `學會有 ${males} 名男會員和 ${females} 名女會員。需選出 ${r1} 名男會員和 ${r2} 名女會員組成小組，計算方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n男女兩組都要選出（同時發生）→ 相乘 (×)\n\n總數 = ₍${males}₎C${r1} × ₍${females}₎C${r2} = ${c1} × ${c2} = ${c1 * c2} 種`,
          wrong: `不正確！\n\n「男會員和女會員」都要選（AND），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 14,
      generator: () => {
        const appetizer = Math.floor(Math.random() * 3) + 3;
        const main = Math.floor(Math.random() * 3) + 4;
        const dessert = Math.floor(Math.random() * 2) + 3;
        return {
          text: `自助餐有 ${appetizer} 款前菜、${main} 款主菜和 ${dessert} 款甜品。若前菜、主菜、甜品各選 1 款，計算用餐組合數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n三個類別各選一款，全部都要選擇（同時發生）→ 相乘 (×)\n\n組合 = ${appetizer} × ${main} × ${dessert} = ${appetizer * main * dessert} 種`,
          wrong: `不正確！\n\n「各選一款」是三個步驟（AND），同時發生 → 相乘 (×)`
        };
      }
    },
    {
      id: 15,
      generator: () => {
        const from_cities = Math.floor(Math.random() * 3) + 4;
        const to_cities = Math.floor(Math.random() * 3) + 5;
        return {
          text: `從城市 A 到 B 有 ${from_cities} 條路線，從 B 到 C 有 ${to_cities} 條路線。計算從 A 經 B 到 C 的路線總數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n要「先」選 A→B 路線，「再」選 B→C 路線，兩步缺一不可（同時發生）→ 相乘 (×)\n\n總數 = ${from_cities} × ${to_cities} = ${from_cities * to_cities} 種`,
          wrong: `不正確！\n\n從 A 到 C 需要兩段路線都選（AND），同時發生 → 相乘 (×)`
        };
      }
    }
  ];

  // 🔥 加法法則情境庫
  const addScenarios = [
    {
      id: 1,
      generator: () => {
        const action = Math.floor(Math.random() * 5) + 6;
        const comedy = Math.floor(Math.random() * 5) + 4;
        const drama = Math.floor(Math.random() * 4) + 3;
        return {
          text: `某戲院正上映 ${action} 部動作片、${comedy} 部喜劇和 ${drama} 部劇情片。小明想看其中一部電影，計算選擇方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「其中一部」表示只選一種類型，不能同時看多部。這是「或」的關係（互斥事件）。\n\n總選擇 = ${action} + ${comedy} + ${drama} = ${action + comedy + drama} 種`,
          wrong: `不正確！\n\n「其中一部」是選擇其中一種（OR），不同類型不能同時發生 → 相加 (+)`
        };
      }
    },
    {
      id: 2,
      generator: () => {
        const novels = Math.floor(Math.random() * 4) + 5;
        const comics = Math.floor(Math.random() * 4) + 6;
        const science = Math.floor(Math.random() * 5) + 7;
        return {
          text: `圖書館有 ${novels} 本小說、${comics} 本漫畫和 ${science} 本科學書。學生要借任何一本書，計算借書方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「任何一本」表示從所有書中只選一本，不能同時借多本。不能同時發生 → 相加 (+)\n\n總方法 = ${novels} + ${comics} + ${science} = ${novels + comics + science} 種`,
          wrong: `不正確！\n\n「任何一本」代表從三類書中選其一（OR），不能同時發生 → 相加 (+)`
        };
      }
    },
    {
      id: 3,
      generator: () => {
        const bus = Math.floor(Math.random() * 3) + 3;
        const mtr = Math.floor(Math.random() * 2) + 2;
        const tram = Math.floor(Math.random() * 2) + 1;
        return {
          text: `從家到學校有 ${bus} 條巴士路線、${mtr} 條地鐵路線或 ${tram} 條電車路線。計算交通方式的數目時，應該相加還是相乘？`,
          correct: `回答正確！\n\n只選擇一種交通工具，不能同時搭多種。不能同時發生 → 相加 (+)\n\n總數 = ${bus} + ${mtr} + ${tram} = ${bus + mtr + tram} 種`,
          wrong: `不正確！\n\n只選「一種」交通方式（OR），不能同時發生 → 相加 (+)`
        };
      }
    },
    {
      id: 4,
      generator: () => {
        const men = Math.floor(Math.random() * 3) + 4;
        const women = Math.floor(Math.random() * 3) + 5;
        const children = Math.floor(Math.random() * 4) + 6;
        return {
          text: `活動有 ${men} 名男士、${women} 名女士和 ${children} 名小童。若只選 1 人當代表，計算選擇方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「只選 1 人」表示從三組中選其一，不能同時選多人。不能同時發生 → 相加 (+)\n\n總數 = ${men} + ${women} + ${children} = ${men + women + children} 種`,
          wrong: `不正確！\n\n「只選 1 人」是從不同組別中選一個（OR），不能同時發生 → 相加 (+)`
        };
      }
    },
    {
      id: 5,
      generator: () => {
        const red = Math.floor(Math.random() * 10) + 13;
        const black = Math.floor(Math.random() * 10) + 13;
        return {
          text: `一副撲克牌有 ${red} 張紅色牌和 ${black} 張黑色牌。抽出「紅色牌或黑色牌」的方法數，應該相加還是相乘？`,
          correct: `回答正確！\n\n「或」代表只能抽一種顏色，不能同時抽紅色和黑色。不能同時發生 → 相加 (+)\n\n紅色或黑色 = ${red} + ${black} = ${red + black} 種`,
          wrong: `不正確！\n\n「或」代表選擇其中一種（OR），不能同時發生 → 相加 (+)`
        };
      }
    },
    {
      id: 6,
      generator: () => {
        const rice = Math.floor(Math.random() * 2) + 3;
        const noodles = Math.floor(Math.random() * 2) + 2;
        return {
          text: `餐廳有 ${rice} 款飯和 ${noodles} 款麵。客人選擇「飯或麵」作為主食，計算選擇方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n主食只選一種，不能同時吃飯又吃麵。不能同時發生 → 相加 (+)\n\n總數 = ${rice} + ${noodles} = ${rice + noodles} 種`,
          wrong: `不正確！\n\n「飯或麵」是二選一（OR），不能同時發生 → 相加 (+)`
        };
      }
    },
    {
      id: 7,
      generator: () => {
        const math = Math.floor(Math.random() * 3) + 4;
        const english = Math.floor(Math.random() * 3) + 5;
        const science = Math.floor(Math.random() * 3) + 3;
        return {
          text: `課外活動有 ${math} 個數學班、${english} 個英文班和 ${science} 個科學班。學生選修其中一個班，計算選擇數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「其中一個」表示只選一個班，不能同時上多個班。不能同時發生 → 相加 (+)\n\n總數 = ${math} + ${english} + ${science} = ${math + english + science} 種`,
          wrong: `不正確！\n\n「其中一個班」是從不同類別選一個（OR），不能同時發生 → 相加 (+)`
        };
      }
    },
    {
      id: 8,
      generator: () => {
        const gold = Math.floor(Math.random() * 2) + 2;
        const silver = Math.floor(Math.random() * 2) + 3;
        const bronze = Math.floor(Math.random() * 3) + 4;
        return {
          text: `抽獎有 ${gold} 個金獎、${silver} 個銀獎或 ${bronze} 個銅獎。每人只能得一個獎，計算獲獎方式數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n每人只能得一個獎項，即只能獲金、銀或銅，不能同時拿多個獎項。不能同時發生 → 相加 (+)\n\n總數 = ${gold} + ${silver} + ${bronze} = ${gold + silver + bronze} 種`,
          wrong: `不正確！\n\n「只能得一個獎」表示選其一（OR），不能同時獲得多個獎項 → 相加 (+)`
        };
      }
    },
    {
      id: 9,
      generator: () => {
        const senior = Math.floor(Math.random() * 5) + 8;
        const junior = Math.floor(Math.random() * 5) + 10;
        return {
          text: `學校有 ${senior} 名高中生或 ${junior} 名初中生。若只選 1 名學生當代表，計算選擇方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「高中生或初中生」只選一人，不能同時選兩個組別。不能同時發生 → 相加 (+)\n\n總數 = ${senior} + ${junior} = ${senior + junior} 種`,
          wrong: `不正確！\n\n「或」表示選其一（OR），不能同時發生 → 相加 (+)`
        };
      }
    },
    {
      id: 10,
      generator: () => {
        const routeA = Math.floor(Math.random() * 3) + 3;
        const routeB = Math.floor(Math.random() * 3) + 4;
        return {
          text: `從城市 X 到城市 Y 可以選 A 路線（${routeA} 種方式）或 B 路線（${routeB} 種方式）。計算總共有多少種前往方法時，應該相加還是相乘？`,
          correct: `回答正確！\n\n選擇 A 路線「或」B 路線，只能走其中一條（互斥）。不能同時發生 → 相加 (+)\n\n總數 = ${routeA} + ${routeB} = ${routeA + routeB} 種`,
          wrong: `不正確！\n\n「A 或 B」是二選一（OR），不能同時發生 → 相加 (+)`
        };
      }
    },
    {
      id: 11,
      generator: () => {
        const red = Math.floor(Math.random() * 4) + 5;
        const blue = Math.floor(Math.random() * 4) + 6;
        const green = Math.floor(Math.random() * 4) + 4;
        const r = Math.floor(Math.random() * 2) + 2;
        const c1 = nCr(red, r);
        const c2 = nCr(blue, r);
        const c3 = nCr(green, r);
        return {
          text: `盒子有 ${red} 個紅球、${blue} 個藍球和 ${green} 個綠球。抽出 ${r} 個「全紅」或「全藍」或「全綠」的球，計算方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「全紅或全藍或全綠」只能選一種顏色，不能同時發生 → 相加 (+)\n\n總數 = ₍${red}₎C${r} + ₍${blue}₎C${r} + ₍${green}₎C${r} = ${c1} + ${c2} + ${c3} = ${c1 + c2 + c3} 種`,
          wrong: `不正確！\n\n「全紅或全藍或全綠」是選其一（OR），不能同時發生 → 相加 (+)`
        };
      }
    },
    {
      id: 12,
      generator: () => {
        const morning = Math.floor(Math.random() * 3) + 4;
        const afternoon = Math.floor(Math.random() * 3) + 5;
        return {
          text: `健身房提供 ${morning} 個早上時段或 ${afternoon} 個下午時段。會員只能選一個時段，計算選擇方法數時，應該相加還是相乘？`,
          correct: `回答正確！\n\n「早上或下午」只選一個時段，不能同時上課。不能同時發生 → 相加 (+)\n\n總數 = ${morning} + ${afternoon} = ${morning + afternoon} 種`,
          wrong: `不正確！\n\n「早上或下午」是二選一（OR），不能同時發生 → 相加 (+)`
        };
      }
    }
  ];

  const generateQuestion = useCallback(() => {
    const useMultiply = Math.random() > 0.5;
    
    if (useMultiply) {
      const scenario = multiplyScenarios[Math.floor(Math.random() * multiplyScenarios.length)];
      const q = scenario.generator();
      setQuestion({
        type: 'multiply',
        ...q
      });
    } else {
      const scenario = addScenarios[Math.floor(Math.random() * addScenarios.length)];
      const q = scenario.generator();
      setQuestion({
        type: 'add',
        ...q
      });
    }
    
    setFeedback(null);
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleAnswer = (ans) => {
    if (feedback) return;
    if (ans === question.type) {
      setFeedback({ correct: true, text: question.correct });
      onComplete(true);
    } else {
      setFeedback({ 
        correct: false, 
        text: question.wrong
      });
      onComplete(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between border-b pb-2 border-dashed mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Task 4: 運算符號 (加法 vs 乘法)</h2>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold border border-yellow-300 text-sm">Score: {score}</span>
      </div>
      {question && (
        <div>
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 mb-6">
            <p className="text-xl font-medium text-gray-800 leading-relaxed">
              {question.text}
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => handleAnswer('add')} 
              className="flex-1 px-5 py-4 rounded-xl text-white font-bold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] bg-orange-500 flex justify-center items-center gap-2 shadow-md"
            >
              <Plus size={24}/> 相加 (+)
            </button>
            <button 
              onClick={() => handleAnswer('multiply')} 
              className="flex-1 px-5 py-4 rounded-xl text-white font-bold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] bg-red-500 flex justify-center items-center gap-2 shadow-md"
            >
              <X size={24}/> 相乘 (×)
            </button>
          </div>
        </div>
      )}
      {feedback && <FeedbackDisplay {...feedback} onNext={generateQuestion} />}
    </div>
  );
};

// --- Task 5: DSE 實戰 (兩段式問答) ---
const Task5 = ({ onComplete, score = 0 }) => {
  const [problem, setProblem] = useState(null);
  const [currentPart, setCurrentPart] = useState('a'); 
  const [userNum, setUserNum] = useState('');
  const [userDenom, setUserDenom] = useState('');
  const [partAFeedback, setPartAFeedback] = useState(null); 
  const [partBFeedback, setPartBFeedback] = useState(null);
  const [isHintAOpen, setIsHintAOpen] = useState(false);
  const [isHintBOpen, setIsHintBOpen] = useState(false);

  // 題目生成器
  const generateProblem = useCallback(() => {
    const templates = [
      // Template 1: 袋子 (紅色杯/白色杯) - 恰好 / 至多
      () => {
        const R = Math.floor(Math.random() * 6) + 12;
        const W = Math.floor(Math.random() * 4) + 4;
        const total = R + W;
        const draw = 5;
        
        const numA = nCr(W, 1) * nCr(R, draw - 1);
        const denA = nCr(total, draw);
        const formulaA = <Fraction 
          num={<><MathNotation type="C" n={W} r={1}/> × <MathNotation type="C" n={R} r={draw-1}/></>}
          den={<MathNotation type="C" n={total} r={draw}/>}
        />;
        const hintA = `分子：從${W}個白杯選1個，再從${R}個紅杯選${draw-1}個。分母：總共${total}個選${draw}個。`;

        let numB = 0;
        let numeratorParts = [];
        for(let r=0; r<=3; r++){
          let w = draw - r;
          if(w <= W && w >= 0) {
            numB += nCr(R, r) * nCr(W, w);
            numeratorParts.push(<span key={r}><MathNotation type="C" n={R} r={r}/> <MathNotation type="C" n={W} r={w}/></span>);
          }
        }
        const denB = nCr(total, draw);
        
        const numFormulaB = numeratorParts.reduce((prev, curr, i) => [prev, <span key={`p${i}`} className="mx-1">+</span>, curr]);
        
        const formulaB = <Fraction num={numFormulaB} den={<MathNotation type="C" n={total} r={draw}/>} />;
        const hintB = `至多3個紅色杯 = 0紅 或 1紅 或 2紅 或 3紅。將這些情況的組合數相加做分子。`;

        return {
          text: `某袋子內有 ${R} 個紅色杯及 ${W} 個白色杯。若從該袋子中隨機同時抽出 ${draw} 個杯，求`,
          questions: {
            a: { text: `(a) 抽出恰好 1 個白色杯的概率。`, num: numA, den: denA, formula: formulaA, hint: hintA },
            b: { text: `(b) 抽出至多 3 個紅色杯的概率。`, num: numB, den: denB, formula: formulaB, hint: hintB }
          }
        };
      },
      // Template 2: 委員會 (男/女)
      () => {
        const B = Math.floor(Math.random() * 5) + 8;
        const G = Math.floor(Math.random() * 5) + 8;
        const total = B + G;
        const select = 4;

        const numA = nCr(B, 2) * nCr(G, 2);
        const denA = nCr(total, select);
        const formulaA = <Fraction 
          num={<><MathNotation type="C" n={B} r={2}/> × <MathNotation type="C" n={G} r={2}/></>}
          den={<MathNotation type="C" n={total} r={select}/>}
        />;
        const hintA = `從${B}名男生選2名，${G}名女生選2名。`;

        const numB = denA - numA; 
        const denB = denA;
        const com = gcd(numA, denA);
        const simpleNumA = numA / com;
        const simpleDenA = denA / com;
        const formulaB = (
          <span className="flex items-center gap-1 flex-wrap">
            1 - P(2男2女) = 1 - <Fraction num={simpleNumA} den={simpleDenA} />
          </span>
        );
        const hintB = `男生與女生人數不同，即不是「2男2女」。利用 1 - Part(a)答案。`;

        return {
          text: `某班有 ${B} 名男生及 ${G} 名女生。若從該班中隨機選出 ${select} 名學生組成一個委員會，`,
          questions: {
            a: { text: `(a) 求該委員會有 2 名男生及 2 名女生的概率。`, num: numA, den: denA, formula: formulaA, hint: hintA },
            b: { text: `(b) 求該委員會男生人數與女生人數不同的概率。`, num: numB, den: denB, formula: formulaB, hint: hintB }
          }
        };
      },
      // Template 3: 碟子 (藍/綠/紫) - 相同顏色 / 至少2隻不同
      () => {
        const B = 3, G = 7, P = 9; 
        const total = B + G + P;
        const draw = 4;

        const numA = nCr(G, 4) + nCr(P, 4);
        const denA = nCr(total, draw);
        
        const formulaA = <Fraction 
          num={<><MathNotation type="C" n={G} r={4}/> + <MathNotation type="C" n={P} r={4}/></>}
          den={<MathNotation type="C" n={total} r={draw}/>}
        />;
        
        const hintA = `只有綠色和紫色夠數量抽4隻。藍色只有3隻，不能抽4隻。`;

        const numB = denA - numA;
        const denB = denA;
        const com = gcd(numA, denA);
        const simpleNumA = numA / com;
        const simpleDenA = denA / com;
        const formulaB = (
          <span className="flex items-center gap-1 flex-wrap">
            1 - P(4隻相同顏色) = 1 - <Fraction num={simpleNumA} den={simpleDenA} />
          </span>
        );
        const hintB = `直接計算比較複雜。「至少2隻不同」的相反是「全部相同顏色」。利用 1 - Part(a)答案。`;

        return {
          text: `某箱子內有 ${B} 隻藍色碟、${G} 隻綠色碟及 ${P} 隻紫色碟。若從該箱子中隨機同時抽出 ${draw} 隻碟，求`,
          questions: {
            a: { text: `(a) 抽出 4 隻相同顏色的碟的概率。`, num: numA, den: denA, formula: formulaA, hint: hintA },
            b: { text: `(b) 抽出至少 2 隻不同顏色的碟的概率。`, num: numB, den: denB, formula: formulaB, hint: hintB }
          }
        };
      },
      // Template 4: 白色杯/藍色杯 - 至少4白 / 至少3藍
      () => {
        const W = 5, B = 11;
        const total = W + B;
        const draw = 6;

        const numA = nCr(W, 4)*nCr(B, 2) + nCr(W, 5)*nCr(B, 1);
        const denA = nCr(total, draw);
        const formulaA = <Fraction 
          num={<><MathNotation type="C" n={W} r={4}/><MathNotation type="C" n={B} r={2}/> + <MathNotation type="C" n={W} r={5}/><MathNotation type="C" n={B} r={1}/></>}
          den={<MathNotation type="C" n={total} r={draw}/>}
        />;
        const hintA = `「至少4個白色」 = 4白2藍 或 5白1藍。白色最多只有5個，不可能抽出6個。`;

        let numB = 0;
        let numPartsB = [];
        for (let b = 3; b <= 6; b++) {
          let w = draw - b;
          if (w <= W) {
            numB += nCr(B, b) * nCr(W, w);
            numPartsB.push(<span key={b}><MathNotation type="C" n={B} r={b}/><MathNotation type="C" n={W} r={w}/></span>);
          }
        }
        const denB = denA;
        const numFormulaB = numPartsB.reduce((prev, curr, i) => [prev, <span key={`p${i}`} className="mx-1">+</span>, curr]);
        const formulaB = <Fraction num={numFormulaB} den={<MathNotation type="C" n={total} r={draw}/>} />;
        const hintB = `「至少3個藍色」 = 3藍3白, 4藍2白, 5藍1白, 6藍0白。`;

        return {
          text: `某盒子內有 ${W} 個白色杯及 ${B} 個藍色杯。若從該盒子中隨機同時由出 ${draw} 個杯，求`,
          questions: {
            a: { text: `(a) 抽出至少 4 個白色杯的概率。`, num: numA, den: denA, formula: formulaA, hint: hintA },
            b: { text: `(b) 抽出至少 3 個藍色杯的概率。`, num: numB, den: denB, formula: formulaB, hint: hintB }
          }
        };
      },
      // Template 5: 紅碗/黃碗/白碗 - 恰好2紅 / 至少2紅
      () => {
        const R=5, Y=6, W=3;
        const total = R + Y + W;
        const draw = 4;
        const Others = Y + W;

        const numA = nCr(R, 2) * nCr(Others, 2);
        const denA = nCr(total, draw);
        const formulaA = <Fraction 
          num={<><MathNotation type="C" n={R} r={2}/> × <MathNotation type="C" n={Others} r={2}/></>}
          den={<MathNotation type="C" n={total} r={draw}/>}
        />;
        const hintA = `恰好2紅 = 2紅 與 2非紅。非紅色碗共有 ${Others} 個。`;

        let numB = 0;
        let numPartsB = [];
        for (let r = 2; r <= 4; r++) {
          let o = draw - r;
          numB += nCr(R, r) * nCr(Others, o);
          numPartsB.push(<span key={r}><MathNotation type="C" n={R} r={r}/><MathNotation type="C" n={Others} r={o}/></span>);
        }
        const denB = denA;
        const numFormulaB = numPartsB.reduce((prev, curr, i) => [prev, <span key={`p${i}`} className="mx-1">+</span>, curr]);
        const formulaB = <Fraction num={numFormulaB} den={<MathNotation type="C" n={total} r={draw}/>} />;
        const hintB = `至少2紅 = 2紅, 3紅, 4紅。`;

        return {
          text: `某盒子內有 ${R} 個紅色碗、${Y} 個黃色碗及 ${W} 個白色碗。若從該盒子中隨機同時抽出 ${draw} 個碗，求`,
          questions: {
            a: { text: `(a) 抽出恰好 2 個紅色碗的概率。`, num: numA, den: denA, formula: formulaA, hint: hintA },
            b: { text: `(b) 抽出至少 2 個紅色碗的概率。`, num: numB, den: denB, formula: formulaB, hint: hintB }
          }
        };
      },
      // Template 6: 綠筆/藍筆/黑筆 - 恰好3綠 / 不多於2綠
      () => {
        const G=4, Bl=7, Bk=8;
        const total = G + Bl + Bk;
        const draw = 5;
        const Others = Bl + Bk;

        const numA = nCr(G, 3) * nCr(Others, 2);
        const denA = nCr(total, draw);
        const formulaA = <Fraction 
          num={<><MathNotation type="C" n={G} r={3}/> × <MathNotation type="C" n={Others} r={2}/></>}
          den={<MathNotation type="C" n={total} r={draw}/>}
        />;
        const hintA = `恰好3綠 = 3綠 與 2非綠。`;

        const prob3G = numA;
        const prob4G = nCr(G, 4) * nCr(Others, 1);
        const numB = nCr(total, draw) - prob3G - prob4G;
        const denB = denA;
        
        const com3 = gcd(prob3G, denB);
        const com4 = gcd(prob4G, denB);
        const simple3Num = prob3G / com3;
        const simple3Den = denB / com3;
        const simple4Num = prob4G / com4;
        const simple4Den = denB / com4;
        
        const formulaB = (
          <span className="flex items-center gap-1 flex-wrap">
            1 - P(3綠) - P(4綠) = 1 - <Fraction num={simple3Num} den={simple3Den} /> - <Fraction num={simple4Num} den={simple4Den} />
          </span>
        );
        const hintB = `綠筆最多4枝。「不多於2枝」(0,1,2) 的相反是「3枝或4枝」。利用 1 減去這兩種情況的概率。`;

        return {
          text: `某袋子內有 ${G} 枝綠筆、${Bl} 枝藍筆及 ${Bk} 枝黑筆。若從該袋子中隨機同時抽出 ${draw} 枝筆，求`,
          questions: {
            a: { text: `(a) 抽出恰好 3 枝綠筆的概率。`, num: numA, den: denA, formula: formulaA, hint: hintA },
            b: { text: `(b) 抽出不多於 2 枝綠筆的概率。`, num: numB, den: denB, formula: formulaB, hint: hintB }
          }
        };
      }
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    setProblem(template());
    setCurrentPart('a');
    setUserNum('');
    setUserDenom('');
    setPartAFeedback(null);
    setPartBFeedback(null);
    setIsHintAOpen(false);
    setIsHintBOpen(false);
  }, []);

  useEffect(() => { generateProblem(); }, [generateProblem]);

  const checkAnswer = () => {
    if (!problem) return;
    const currentQ = problem.questions[currentPart];
    
    const uNum = parseInt(userNum);
    const uDen = parseInt(userDenom);
    
    if (isNaN(uNum) || isNaN(uDen) || uDen === 0) return;

    const common = gcd(currentQ.num, currentQ.den);
    const simpleNum = currentQ.num / common;
    const simpleDen = currentQ.den / common;

    const isCorrect = uNum * simpleDen === uDen * simpleNum;
    
    const feedbackObj = {
      correct: isCorrect,
      simpleNum,
      simpleDen,
      formula: currentQ.formula
    };

    if (currentPart === 'a') {
      setPartAFeedback(feedbackObj);
    } else {
      setPartBFeedback(feedbackObj);
      onComplete(isCorrect); 
    }
  };

  const nextPart = () => {
    setCurrentPart('b');
    setUserNum('');
    setUserDenom('');
    setIsHintBOpen(false);
  };

  const nextProblem = () => {
    generateProblem();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between border-b pb-2 border-dashed mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Task 5: DSE 實戰模擬</h2>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold border border-yellow-300 text-sm">Score: {score}</span>
      </div>
      {problem && (
        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <p className="text-xl font-medium text-gray-800 leading-relaxed">{problem.text}</p>
          </div>

          {/* Part A */}
          <div className="p-4 rounded-xl border-l-4 border-indigo-500 bg-gray-50">
            <p className="text-lg font-bold text-indigo-900 mb-3">{problem.questions.a.text}</p>
            
            {!partAFeedback ? (
              <>
                <div className="flex items-center gap-4 bg-white p-3 rounded-lg border w-fit">
                  <span className="font-serif italic text-lg">P = </span>
                  <div className="flex flex-col items-center gap-1">
                    <input type="number" value={userNum} onChange={e=>setUserNum(e.target.value)} className="w-20 text-center border rounded p-1 no-spinners" placeholder="分子"/>
                    <div className="w-full h-px bg-black"></div>
                    <input type="number" value={userDenom} onChange={e=>setUserDenom(e.target.value)} className="w-20 text-center border rounded p-1 no-spinners" placeholder="分母"/>
                  </div>
                  <button onClick={checkAnswer} className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">提交 (a)</button>
                </div>
                <HintSection text={problem.questions.a.hint} isOpen={isHintAOpen} setIsOpen={setIsHintAOpen} />
              </>
            ) : (
              <div className={`mt-2 p-3 rounded ${partAFeedback.correct ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {partAFeedback.correct ? <CheckCircle size={20}/> : <XCircle size={20}/>}
                  <span className="font-bold">{partAFeedback.correct ? 'Part (a) 正確！' : 'Part (a) 回答錯誤'}</span>
                </div>
                <div className="text-base mt-2">
                  {partAFeedback.correct ? (
                    <div className="flex flex-wrap items-center gap-2">
                      答案是 {partAFeedback.formula} = <Fraction num={partAFeedback.simpleNum} den={partAFeedback.simpleDen} />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center">
                        正確答案是 <Fraction num={partAFeedback.simpleNum} den={partAFeedback.simpleDen}/>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm opacity-90">
                        參考算式： {partAFeedback.formula}
                      </div>
                    </div>
                  )}
                </div>
                {currentPart === 'a' && (
                  <button onClick={nextPart} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 text-sm font-bold">
                    繼續作答 Part (b) <ArrowRight size={16}/>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Part B */}
          {currentPart === 'b' && (
            <div className="p-4 rounded-xl border-l-4 border-teal-500 bg-gray-50 mt-4 animate-fade-in">
              <p className="text-lg font-bold text-teal-900 mb-3">{problem.questions.b.text}</p>
              
              {!partBFeedback ? (
                <>
                  <div className="flex items-center gap-4 bg-white p-3 rounded-lg border w-fit">
                    <span className="font-serif italic text-lg">P = </span>
                    <div className="flex flex-col items-center gap-1">
                      <input type="number" value={userNum} onChange={e=>setUserNum(e.target.value)} className="w-20 text-center border rounded p-1 no-spinners" placeholder="分子"/>
                      <div className="w-full h-px bg-black"></div>
                      <input type="number" value={userDenom} onChange={e=>setUserDenom(e.target.value)} className="w-20 text-center border rounded p-1 no-spinners" placeholder="分母"/>
                    </div>
                    <button onClick={checkAnswer} className="ml-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">提交 (b)</button>
                  </div>
                  <HintSection text={problem.questions.b.hint} isOpen={isHintBOpen} setIsOpen={setIsHintBOpen} />
                </>
              ) : (
                <FeedbackDisplay 
                  correct={partBFeedback.correct} 
                  text={
                    <div>
                      {partBFeedback.correct ? (
                        <div className="flex flex-wrap items-center gap-2">
                          答案是 {partBFeedback.formula} = <Fraction num={partBFeedback.simpleNum} den={partBFeedback.simpleDen} />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center">
                            正確答案是 <Fraction num={partBFeedback.simpleNum} den={partBFeedback.simpleDen}/>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm opacity-90">
                            參考算式： {partBFeedback.formula}
                          </div>
                        </div>
                      )}
                    </div>
                  }
                  onNext={nextProblem}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};


// --- 教學筆記 ---
const ProbabilityNotes = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-left pb-16">
      {/* 1. 二分法 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0">1</span>
          二分法
        </h3>
        <p className="mb-4 text-slate-700 font-medium">有些情景只有兩種可能性：</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-indigo-50 p-3 rounded-xl text-center font-bold text-indigo-800">男 / 女</div>
          <div className="bg-indigo-50 p-3 rounded-xl text-center font-bold text-indigo-800">成人 / 小童</div>
          <div className="bg-indigo-50 p-3 rounded-xl text-center font-bold text-indigo-800">下雨 / 沒有下雨</div>
          <div className="bg-indigo-50 p-3 rounded-xl text-center font-bold text-indigo-800">答案 <span className="text-green-600 mx-0.5">✓</span> / <span className="text-red-600 mx-0.5">✗</span></div>
        </div>
        
        <h4 className="font-bold text-red-600 mb-3">二分法推想：</h4>
        <div className="space-y-3">
          <div className="flex gap-3 bg-slate-50 p-4 rounded-xl items-start">
            <span className="font-bold text-slate-500 mt-0.5">e.g.</span>
            <div>
              <p className="text-slate-700 mb-1">已知全班人數為 30，女生人數為 18</p>
              <p className="text-green-700 font-bold flex items-center gap-2">
                <ArrowRight className="w-4 h-4 shrink-0" /> 
                能計算出男生為 30 − 18 = 12人
              </p>
            </div>
          </div>
          <div className="flex gap-3 bg-slate-50 p-4 rounded-xl items-start">
            <span className="font-bold text-slate-500 mt-0.5">e.g.</span>
            <div>
              <p className="text-slate-700 mb-1">袋中總共有球 20 個，其中 7 個為紅色球</p>
              <p className="text-green-700 font-bold flex items-center gap-2">
                <ArrowRight className="w-4 h-4 shrink-0" /> 
                能推論出非紅色球有 20 - 7 = 13個
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 排列與組合 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-2">
          <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0">2</span>
          排列與組合 <span className="text-sm font-normal text-slate-500 ml-2 hidden sm:inline">(常見於 DSE 乙部 Q15/16 + 每年 MC 必出)</span>
        </h3>
        
        <div className="bg-yellow-50 p-4 sm:p-5 rounded-xl border border-yellow-200 mb-6 font-medium">
          <div className="flex items-center gap-2 text-yellow-800 font-bold mb-3 pb-2 border-b border-yellow-200 border-dashed">
            <Calculator className="text-yellow-600 w-5 h-5 shrink-0"/>
            學習使用計算機計算排列 (nPr) / 組合 (nCr)
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-700 mt-4">
            <div className="flex items-start gap-3">
              <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">例</span>
              <div>
                <p className="font-bold text-slate-800 mb-2">計算 10 個抽 3 個的排列 = <MathNotation type="P" n="10" r="3" /></p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-sm sm:text-base mt-3 mb-1">
                  <span className="font-bold text-slate-800 text-lg">10</span>
                  <span className="text-slate-400">👉</span>
                  
                  <span className="bg-gray-400 text-amber-900 font-bold px-3 py-1 rounded-md text-xs sm:text-sm tracking-wider flex items-center justify-center h-[28px]">
                    SHIFT
                  </span>
                  
                  <span className="text-slate-400">👉</span>
                  
                  <span className="inline-flex flex-col items-center justify-end -mt-4">
                    <span className="text-[10px] sm:text-xs text-amber-600 font-bold leading-none mb-1">nPr</span>
                    <span className="bg-gray-800 text-white font-bold px-3 py-1 rounded-md text-lg leading-none flex items-center justify-center">
                      ×
                    </span>
                  </span>
                  
                  <span className="text-slate-400">👉</span>
                  <span className="font-bold text-slate-800 text-lg">3</span>
                  <span className="text-slate-400">👉</span>
                  
                  <span className="bg-gray-800 text-white font-bold px-3 py-1 rounded-md text-xs sm:text-sm tracking-wider flex items-center justify-center h-[28px]">
                    EXE
                  </span>
                  
                  <span className="ml-2 font-bold text-indigo-700 text-lg">= <span className="text-xl">720</span></span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 border-t border-yellow-200/50 pt-4 mt-2">
              <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">例</span>
              <div>
                <p className="font-bold text-slate-800 mb-2">計算 8 個抽 3 個的組合 = <MathNotation type="C" n="8" r="3" /></p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-sm sm:text-base mt-3 mb-1">
                  <span className="font-bold text-slate-800 text-lg">8</span>
                  <span className="text-slate-400">👉</span>
                  
                  <span className="bg-gray-400 text-amber-900 font-bold px-3 py-1 rounded-md text-xs sm:text-sm tracking-wider flex items-center justify-center h-[28px]">
                    SHIFT
                  </span>
                  
                  <span className="text-slate-400">👉</span>
                  
                  <span className="inline-flex flex-col items-center justify-end -mt-4">
                    <span className="text-[10px] sm:text-xs text-amber-600 font-bold leading-none mb-1">nCr</span>
                    <span className="bg-gray-800 text-white font-bold px-3 py-1 rounded-md text-lg leading-none flex items-center justify-center">
                      ÷
                    </span>
                  </span>
                  
                  <span className="text-slate-400">👉</span>
                  <span className="font-bold text-slate-800 text-lg">3</span>
                  <span className="text-slate-400">👉</span>
                  
                  <span className="bg-gray-800 text-white font-bold px-3 py-1 rounded-md text-xs sm:text-sm tracking-wider flex items-center justify-center h-[28px]">
                    EXE
                  </span>
                  
                  <span className="ml-2 font-bold text-teal-700 text-lg">= <span className="text-xl">56</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border-2 border-indigo-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-indigo-100 p-3 font-bold text-indigo-800 text-lg flex items-center justify-between">
              <span>計次序 <ArrowRight className="inline mx-2 w-4 h-4"/> 排列 P</span>
            </div>
            <div className="p-4 bg-white text-slate-700">
              <span className="text-indigo-600 font-bold block mb-2">例子：</span>
              排隊、拍照、密碼...
            </div>
          </div>
          <div className="border-2 border-teal-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-teal-100 p-3 font-bold text-teal-800 text-lg flex items-center justify-between">
              <span>不計次序 <ArrowRight className="inline mx-2 w-4 h-4"/> 組合 C</span>
            </div>
            <div className="p-4 bg-white text-slate-700">
              <span className="text-teal-600 font-bold block mb-2">例子：</span>
              選拔、分發、抽取...
            </div>
          </div>
        </div>

        {/* 題目示範 */}
        <div className="grid gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-blue-200">
            <h4 className="font-bold text-blue-800 text-lg mb-2">例題 1：排列 P</h4>
            <p className="text-slate-700 mb-4 bg-blue-50 p-3 rounded-lg text-sm sm:text-base">某店鋪中，有 10 個不同的手袋可放在櫥窗上。求下列各情況中擺放手袋的方法的總數。</p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-400 pl-4 py-1">
                <p className="font-bold text-slate-800 mb-1">(a) 把 3 個手袋<span className="ring-2 ring-green-400 rounded-full px-1">排</span>成一列。<span className="text-blue-700 font-normal text-sm ml-2">(10個抽3個，計次序)</span></p>
                <div className="text-base sm:text-lg font-serif mt-3 flex items-start text-blue-700">
                  <span className="mr-2">a. 排列 <ArrowRight className="inline w-4 h-4 text-slate-400"/></span>
                  <div className="flex flex-col items-center">
                    <div className="flex">
                      <span className="italic mr-1 text-xl">P</span>
                      <div className="flex flex-col text-xs leading-tight ml-0.5 gap-1">
                        <div className="flex items-center">
                          <span>10</span>
                          <span className="text-[10px] text-red-600 font-bold ml-1 flex items-center"><ArrowRight className="w-3 h-3 transform rotate-180"/> 總數</span>
                        </div>
                        <div className="flex items-center">
                          <span>3</span>
                          <span className="text-[10px] text-red-600 font-bold ml-1 flex items-center"><ArrowRight className="w-3 h-3 transform rotate-180"/> 要抽</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="ml-2 font-bold mt-1">= 720</span>
                </div>
              </div>
              
              <div className="border-l-4 border-indigo-400 pl-4 py-1">
                <p className="font-bold text-slate-800 mb-1">(b) 把 5 個手袋排成一列。<span className="text-blue-700 font-normal text-sm ml-2">(10個抽5個，計次序)</span></p>
                <div className="text-base sm:text-lg font-serif mt-3 text-blue-700">
                  b. 排列 <ArrowRight className="inline w-4 h-4 text-slate-400"/> <MathNotation type="P" n="10" r="5" /> = <span className="font-bold text-slate-800">30240</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-teal-200">
            <h4 className="font-bold text-teal-800 text-lg mb-2">例題 2：組合 C</h4>
            <div className="text-slate-700 leading-relaxed bg-teal-50 p-3 rounded-lg mb-4 text-sm sm:text-base relative border-l-4 border-green-400">
              <div className="absolute -left-[52px] top-4 text-green-600 font-bold text-xs bg-white px-1 rounded shadow-sm border border-green-200 hidden sm:block">挑選<ArrowRight className="inline w-3 h-3"/> C</div>
              某寵物店有 8 隻蒼鼠和 6 隻白兔。求下列各情況中<span className="ring-2 ring-green-400 rounded-full px-1 mx-1">選</span>出動物的組合的總數。<br/>
              <span className="text-red-600 font-bold text-xs sm:text-sm mt-3 flex items-center gap-1">💡 試想想可能情況？ <ArrowRight className="inline w-3 h-3 transform rotate-45 ml-2 mr-1 text-slate-400"/> 0, 1, 2... 隻蒼鼠等組合</span>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-teal-400 pl-4 py-1">
                <p className="font-bold text-slate-800 mb-1">(a) 選出 <span className="ring-2 ring-green-400 ring-offset-1 rounded-full px-1">3</span> 隻蒼鼠和 3 隻白兔。</p>
                <div className="text-base sm:text-lg font-serif mt-4">
                  <div className="flex items-center text-green-700 font-bold mb-2 text-sm sm:text-base">
                    <span>a. 使用組合 </span>
                    <span className="font-normal text-slate-500 text-xs sm:text-sm mx-2">(因不注重次序)</span> 
                    <ArrowRight className="inline w-4 h-4 mx-1"/>
                  </div>
                  <div className="flex items-start flex-wrap gap-2">
                    <AnnotatedMath 
                      math={<span className="text-xl"> <MathNotation type="C" n="8" r="3" /> </span>}
                      annotation="蒼鼠8簡3"
                      braceColor="border-green-600"
                      textColor="text-green-700"
                      brace={false}
                    />
                    <span className="font-bold text-slate-800 self-start mt-2 mx-2">X</span>
                    <AnnotatedMath 
                      math={<span className="text-xl"> <MathNotation type="C" n="6" r="3" /> </span>}
                      annotation="白兔6簡3"
                      braceColor="border-red-600"
                      textColor="text-red-600"
                      brace={false}
                    />
                    <span className="self-start mt-2 ml-4">= <span className="font-bold text-slate-800">1120</span></span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-teal-400 pl-4 py-1">
                <p className="font-bold text-slate-800 mb-2">(b) 選出 5 隻動物，其中<span className="border-b-2 border-red-500">至多有 2 隻蒼鼠</span>。</p>
                <div className="overflow-x-auto pb-4 pt-2">
                  <div className="flex gap-1 sm:gap-2 min-w-max text-center text-sm font-serif items-start">
                    <div className="flex items-start">
                      <span className="mr-3 font-bold text-slate-700 mt-2">b.</span>
                      <AnnotatedMath 
                        math={<span className="text-base sm:text-lg flex items-center justify-center gap-1"><MathNotation type="C" n="8" r="0" /> X <MathNotation type="C" n="6" r="5" /></span>}
                        annotation="5隻沒蒼鼠 → 即選了5兔"
                        subAnnotation="情況1 : 0蒼鼠+5兔"
                        braceColor="border-purple-600"
                        textColor="text-purple-700"
                      />
                    </div>
                    
                    <span className="font-bold text-slate-400 self-start mt-2">+</span>
                    
                    <AnnotatedMath 
                      math={<span className="text-base sm:text-lg flex items-center justify-center gap-1"><MathNotation type="C" n="8" r="1" /> X <MathNotation type="C" n="6" r="4" /></span>}
                      annotation="抽1蒼 → 剩餘抽4兔"
                      subAnnotation="情況2 : 1蒼鼠+4兔"
                      braceColor="border-purple-600"
                      textColor="text-purple-700"
                    />

                    <span className="font-bold text-slate-400 self-start mt-2">+</span>

                    <AnnotatedMath 
                      math={<span className="text-base sm:text-lg flex items-center justify-center gap-1"><MathNotation type="C" n="8" r="2" /> X <MathNotation type="C" n="6" r="3" /></span>}
                      annotation="抽2蒼 → 剩餘抽3兔"
                      subAnnotation="情況3 : 2蒼鼠+3兔"
                      braceColor="border-purple-600"
                      textColor="text-purple-700"
                    />
                    
                    <span className="self-start mt-2 ml-2 text-base sm:text-lg">= <span className="font-bold text-slate-800">686</span></span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-teal-400 pl-4 py-1">
                <p className="font-bold text-slate-800 mb-2">(c) 選出 6 隻動物，其中<span className="border-b-2 border-purple-500">至少有 1 隻白兔</span>。 <span className="text-purple-700 text-sm font-normal">← 運用二分法, 1 - P(0兔)</span></p>
                <div className="overflow-x-auto pb-4 pt-2">
                  <div className="flex gap-2 min-w-max text-center text-sm font-serif items-start">
                    <div className="flex items-start">
                      <span className="mr-3 font-bold text-slate-700 mt-2">c.</span>
                      <AnnotatedMath 
                        math={<span className="text-lg"><MathNotation type="C" n="14" r="6" /></span>}
                        annotation={<span className="text-blue-700">全部情況</span>}
                        subAnnotation={<span className="text-slate-500 whitespace-normal w-32 break-words leading-tight">沒限制: 總共14隻<br/>動物選6隻</span>}
                        braceColor="border-transparent"
                        textColor="text-blue-700"
                        brace={false}
                      />
                    </div>
                    
                    <span className="font-bold text-slate-800 self-start mt-2">-</span>
                    
                    <AnnotatedMath 
                      math={<span className="text-base sm:text-lg flex items-center justify-center gap-1"><MathNotation type="C" n="6" r="0" /> X <MathNotation type="C" n="8" r="6" /></span>}
                      annotation={<span className="text-red-600">沒兔 → 即6隻全部為蒼</span>}
                      subAnnotation={<span className="text-slate-500 whitespace-normal w-40 break-words leading-tight">只有0兔6倉這情況<br/>沒有至少一隻白兔</span>}
                      braceColor="border-red-500"
                      textColor="text-red-600"
                      brace={false}
                    />
                    
                    <span className="self-start mt-2 ml-2 text-base sm:text-lg flex flex-col items-center">
                      <span>= <span className="font-bold text-slate-800">2975</span></span>
                      <span className="text-green-600 font-bold text-xs mt-3 flex flex-col items-center">
                        <ArrowRight className="w-3 h-3 transform -rotate-90"/>運用二分法<br/><span className="font-normal mt-1">比由 P(1兔) 至 P(6兔) 數得快</span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-teal-400 pl-4 py-1">
                <p className="font-bold text-slate-800 mb-2">(d) 選出 6 隻動物，且<span className="border-b-2 border-slate-500">蒼鼠與白兔的數目不同</span>。</p>
                <div className="mb-4 text-xs sm:text-sm">
                  <span className="text-slate-700">d. 需<span className="bg-yellow-200">列出</span>倉鼠和兔 不同數量 的組合，但因逐一計算太麻煩，</span><br/>
                  <span className="text-slate-700 ml-4">可想：</span>
                </div>
                <div className="flex gap-2 text-sm font-serif items-start pl-6">
                  <AnnotatedMath 
                    math={<span className="text-lg"><MathNotation type="C" n="14" r="6" /></span>}
                    annotation={<span className="text-red-600 font-bold">總數</span>}
                    braceColor="border-transparent"
                    brace={false}
                  />
                  
                  <span className="font-bold text-slate-800 self-start mt-2">-</span>
                  
                  <AnnotatedMath 
                    math={<span className="text-base sm:text-lg flex items-center justify-center gap-1"><MathNotation type="C" n="8" r="3" /> X <MathNotation type="C" n="6" r="3" /></span>}
                    annotation={<span className="text-red-600 font-bold">使用 (a) 答案</span>}
                    subAnnotation="(相同數量)"
                    braceColor="border-transparent"
                    brace={false}
                  />
                  
                  <span className="self-start mt-2 ml-2 text-base sm:text-lg">= <span className="font-bold text-slate-800">1883</span></span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 3. 概率 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b pb-3">
          <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0">3</span>
          概率
        </h3>
        
        <p className="text-slate-700 mb-6 font-bold text-lg">DSE 問排列組合時可能會問到其概率 <ArrowRight className="inline mx-2 w-5 h-5 text-emerald-600"/> 要用分數表示答案</p>

        <div className="flex flex-col items-center justify-center bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-100 mb-8 mx-auto w-fit shadow-sm">
          <div className="flex items-center gap-4 text-xl sm:text-2xl">
            <span className="font-bold text-slate-800">概率 <span className="italic font-serif">P</span> =</span>
            <div className="flex flex-col items-center font-bold">
              <span className="text-blue-700 border-b-[3px] border-slate-800 px-4 pb-1 mb-1">想要目標的情況</span>
              <span className="text-green-700 px-4 pt-1 mt-1">題目原本沒限制的情況</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-10 space-y-4">
          <div className="flex items-center text-slate-700 font-bold text-lg sm:text-xl">
            <span className="mr-3 text-slate-400">-</span>一定發生的概率 = <span className="ml-3 font-bold text-slate-900 text-2xl">1</span>
          </div>
          <div className="flex items-center text-slate-700 font-bold text-lg sm:text-xl">
            <span className="mr-3 text-slate-400">-</span>一定不會發生的概率 = <span className="ml-3 font-bold text-slate-900 text-2xl">0</span>
          </div>
          <div className="mt-6 pt-4 border-t-2 border-slate-200 border-dashed flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
           <span className="font-bold text-slate-800 text-lg">概率的可能範圍： 0 - 1</span>
           <span className="text-emerald-700 font-bold text-sm sm:text-base">(如計到負數 / &gt;1的數，則必定錯誤)</span>
          </div>
        </div>

        {/* 例題：子健企右 */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-emerald-200 shadow-sm">
          <h4 className="font-bold text-emerald-800 text-lg sm:text-xl mb-4">例題 3：概率</h4>
          <p className="text-slate-800 font-medium mb-6 bg-emerald-50/50 p-4 rounded-lg text-base sm:text-lg border border-emerald-100">
            <span className="font-bold mr-2 text-emerald-700"></span>子健和 6 位朋友隨機排成一行拍照。
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-400 pl-4 sm:pl-6 py-2">
              <p className="font-bold text-slate-800 mb-6 text-base sm:text-lg">(a) 求子健必須站在最右方的概率。</p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center font-serif text-lg sm:text-xl pl-2 sm:pl-4 overflow-x-auto pb-4">
                <span className="mr-4 font-bold text-slate-800 mt-2 self-start sm:self-center">=</span>
                <div className="flex items-center">
                  <Fraction 
                    num={
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 w-[140px]">
                        <MathNotation type="P" n="1" r="1" />
                        <span className="font-bold mx-1 sm:mx-2 text-slate-800">x</span>
                        <MathNotation type="P" n="6" r="6" />
                      </div>
                    }
                    den={
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mt-2 w-[140px]">
                        <MathNotation type="P" n="7" r="7" />
                      </div>
                    }
                  />
                  <div className="flex flex-col gap-5 ml-4 sm:ml-8 mt-1">
                    <div className="flex items-center text-green-700 text-sm sm:text-base font-bold bg-green-50 px-2 py-1 rounded border border-green-200">
                      <ArrowLeft className="w-4 h-4 mr-2"/> 目標：子健企最右的情況
                    </div>
                    <div className="flex items-center text-green-700 text-sm sm:text-base font-bold bg-green-50 px-2 py-1 rounded border border-green-200">
                      <ArrowLeft className="w-4 h-4 mr-2"/> 無限制 (7人隨機排列，子健沒限制企位) 的情況
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center font-serif text-lg sm:text-xl pl-2 sm:pl-4 mt-2">
                <span className="mr-4 font-bold text-slate-800">=</span>
                <Fraction 
                  num={<span className="font-bold text-slate-800 px-4">1</span>}
                  den={<span className="font-bold text-slate-800 px-4">7</span>}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center pt-8 pb-4">
        <p className="text-slate-400 text-sm">準備好挑戰了嗎？切換到上方「互動測驗」開始練習吧！</p>
      </div>
    </div>
  );
};

// --- 主程式框架 ---
const ProbabilityQuiz = () => {
  const [activeTab, setActiveTab] = useState('task5');
  const [taskStatus, setTaskStatus] = useState({});
  const [viewMode, setViewMode] = useState('quiz'); // 'quiz' or 'notes'

  const handleTaskComplete = (taskId, isCorrect) => {
    setTaskStatus(prev => ({
      ...prev,
      [taskId]: (prev[taskId] || 0) + (isCorrect ? 1 : 0)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* 內嵌樣式 */}
      <style>
        {`
        .no-spinners::-webkit-inner-spin-button,
        .no-spinners::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinners {
          -moz-appearance: textfield;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>

      {/* 頂部導航列 */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-sm font-medium">返回主頁</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-2xl">🎲</span>
            排列與組合
          </h1>
          <div className="w-24"></div> {/* 佔位元素，保持標題居中 */}
        </div>
      </div>

      <div className="p-4 sm:p-8 font-sans text-gray-800">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 mb-2 tracking-tight flex items-center justify-center gap-3">
            <span className="text-4xl sm:text-5xl">🎓</span> 
            <span>排列與組合：邏輯與實戰</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">透過五大核心任務，掌握概率計算的基礎與 DSE 實戰技巧。</p>
        </header>

        {/* 主要模式切換 */}
        <div className="flex justify-center gap-4 mb-6">
          <button 
            onClick={() => setViewMode('notes')}
            className={`px-6 py-2.5 rounded-full font-bold text-base sm:text-lg transition-all flex items-center gap-2 ${viewMode === 'notes' ? 'bg-indigo-600 text-white shadow-md scale-105' : 'bg-white text-indigo-600 border-2 border-indigo-200 hover:bg-indigo-50'}`}
          >
            <BookOpen className="w-5 h-5"/> 教學筆記
          </button>
          <button 
            onClick={() => setViewMode('quiz')}
            className={`px-6 py-2.5 rounded-full font-bold text-base sm:text-lg transition-all flex items-center gap-2 ${viewMode === 'quiz' ? 'bg-indigo-600 text-white shadow-md scale-105' : 'bg-white text-indigo-600 border-2 border-indigo-200 hover:bg-indigo-50'}`}
          >
            <Calculator className="w-5 h-5"/> 互動測驗
          </button>
        </div>

        {viewMode === 'notes' ? (
          <ProbabilityNotes />
        ) : (
          <>
            {/* 導航 Tabs */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap bg-white/50 p-2 rounded-2xl backdrop-blur-sm shadow-sm w-fit mx-auto animate-fade-in">
              {[
                {id: 'task1', label: '1. nPr vs nCr'},
                {id: 'task2', label: '2. 潛規則邏輯'},
                {id: 'task3', label: '3. 列出可能性'},
                {id: 'task4', label: '4. 加法 vs 乘法'},
                {id: 'task5', label: '5. DSE 實戰'},
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl font-bold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-lg scale-105' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/50'
                  }`}
                >
                  {tab.label} <span className="opacity-60 text-xs ml-1">(答對: {taskStatus[tab.id] || 0})</span>
                </button>
              ))}
            </div>

            {/* 內容區域 */}
            <main className="transition-all duration-300 ease-in-out animate-fade-in">
              {activeTab === 'task1' && <Task1 onComplete={(c) => handleTaskComplete('task1', c)} score={taskStatus['task1'] || 0} />}
              {activeTab === 'task2' && <Task2 onComplete={(c) => handleTaskComplete('task2', c)} score={taskStatus['task2'] || 0} />}
              {activeTab === 'task3' && <Task3 onComplete={(c) => handleTaskComplete('task3', c)} score={taskStatus['task3'] || 0} />}
              {activeTab === 'task4' && <Task4 onComplete={(c) => handleTaskComplete('task4', c)} score={taskStatus['task4'] || 0} />}
              {activeTab === 'task5' && <Task5 onComplete={(c) => handleTaskComplete('task5', c)} score={taskStatus['task5'] || 0} />}
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default ProbabilityQuiz;
