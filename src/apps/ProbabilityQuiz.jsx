import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, RefreshCw, ArrowRight, Plus, X, Lightbulb, Home as HomeIcon } from 'lucide-react';

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
    <span className="flex flex-col text-xs leading-none ml-0.5">
      <span className="-mb-1">{n}</span>
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
const Task1 = ({ onComplete }) => {
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

    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
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
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 border-b pb-2 border-dashed">Task 1: 排列 (nPr) vs 組合 (nCr)</h2>
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
const Task2 = ({ onComplete }) => {
  const [question, setQuestion] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);

  const generateQuestion = useCallback(() => {
    const total = Math.floor(Math.random() * 20) + 20; 
    const groupA = Math.floor(total * 0.4 + Math.random() * (total * 0.3));
    const groupB = total - groupA;

    const isPeople = Math.random() > 0.5;
    let text = '';
    let known, unknown, unknownLabel;

    if (isPeople) {
      text = `某班總共有 ${total} 名學生。如果已知其中 ${groupA} 人是「男生」，請推斷有多少個是「女生」？`;
      known = groupA;
      unknown = groupB;
      unknownLabel = '女生';
    } else {
      text = `盒子裡總共有 ${total} 個球，當中有白色和綠色。如果已知其中 ${groupA} 個是「白球」，請推斷有多少個是「綠球」？`;
      known = groupA;
      unknown = groupB;
      unknownLabel = '綠球';
    }

    setQuestion({
      total,
      known,
      unknown,
      unknownLabel,
      text
    });
    setFeedback(null);
    setInputValue('');
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const checkAnswer = () => {
    if (feedback) return;
    const userAns = parseInt(inputValue);
    if (userAns === question.unknown) {
      setFeedback({ correct: true, text: `正確！邏輯：總數 (${question.total}) - 已知 (${question.known}) = 未知 (${question.unknown})` });
      onComplete(true);
    } else {
      setFeedback({ correct: false, text: `不正確。請計算：${question.total} (總數) 減去 ${question.known} (已知數量)。正確答案是 ${question.unknown}。` });
      onComplete(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 border-b pb-2 border-dashed">Task 2: 隱含資訊 (潛規則)</h2>
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
const Task3 = ({ onComplete }) => {
  const [question, setQuestion] = useState(null);
  const [selectedGreens, setSelectedGreens] = useState([]); 
  const [blueInputs, setBlueInputs] = useState({}); 
  const [step, setStep] = useState(1); 
  const [step1Feedback, setStep1Feedback] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const generateQuestion = useCallback(() => {
    const A_name = '綠筆';
    const B_name = '藍筆';
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
      A_name, B_name, A_total, B_total, draw_total, max_A, 
      correctGreens, rangeOptions: rangeOptions.filter((v, i, a) => a.indexOf(v) === i), 
      text: `盒子有 ${A_total} 枝 ${A_name} 及 ${B_total} 枝 ${B_name}，從中隨機抽出 ${draw_total} 枝筆。如果條件是「最多抽 ${max_A} 枝 ${A_name}」，請選出所有可能的情況。`,
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
        text: `不正確。提示：「最多 ${question.max_A} 枝」意味著綠筆可以是 ${question.correctGreens.join(' 或 ')} 枝。現在已為您選出正確選項，請繼續填寫對應的藍筆數量。`
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
      setFeedback({ correct: false, text: `不正確。請檢查藍筆數量。總共抽 ${question.draw_total} 枝，如果綠筆有 x 枝，藍筆應是 ${question.draw_total} - x 枝。` });
      onComplete(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 border-b pb-2 border-dashed">Task 3: 列出可能性</h2>
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
                    <span className="font-bold text-green-700 w-24 text-right">{g} 枝{question.A_name}</span>
                    <Plus size={16} className="text-gray-400" />
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        value={blueInputs[g] || ''}
                        onChange={(e) => handleBlueInput(g, e.target.value)}
                        className="w-16 text-center border-2 border-blue-200 rounded p-1 focus:border-blue-500 outline-none no-spinners"
                      />
                      <span className="ml-2 text-blue-800 font-bold">枝{question.B_name}</span>
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

// --- Task 4: 分辨加法與乘法 ---
const Task4 = ({ onComplete }) => {
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const generateQuestion = useCallback(() => {
    const scenario = Math.random() > 0.5 ? 'multiply' : 'add';
    let q;
    if (scenario === 'multiply') {
      const totalR = Math.floor(Math.random() * 5) + 8;
      const totalW = Math.floor(Math.random() * 5) + 8;
      const total = totalR + totalW;
      const r = Math.floor(Math.random() * 2) + 2;
      const w = Math.floor(Math.random() * 2) + 2;
      const draw = r + w;

      q = {
        type: 'multiply',
        text: `在袋中${total}個球，當中有${totalR}個紅球和${totalW}個白球。若從中抽出${draw}個球，計算當中有 ${r} 個紅球 和 ${w} 個白球的概率。計算可能組合時，你需要把這兩種情況的方法數相加還是相乘？`,
        hint: 'AND/同時發生，需要將步驟連接起來。',
        correct_text: `回答正確！抽出 ${r} 個紅球 和 ${w} 個白球 是同時發生(AND)。概率 = P(${r}個紅球) × P(${w}個白球)`,
        wrong_text: `不正確。請想想情境是「同時發生」(AND) 還是「任選一種可能」(OR)。這題是同時發生(AND)，概率 = P(${r}個紅球) × P(${w}個白球)`
      };
    } else {
      const r = Math.floor(Math.random() * 2) + 2;
      const w = Math.floor(Math.random() * 2) + 4;
      q = {
        type: 'add',
        text: `想計算抽出 ${r} 個紅球 或 ${w} 個白球的概率。計算可能組合時，你需要把這兩種情況的方法數相加還是相乘？`,
        hint: 'OR/互不相容的事件，需要將所有可能性加起來。',
        correct_text: `回答正確！抽出 ${r} 個紅球 或 ${w} 個白球 屬於不同情況（互斥事件）。你需要將這兩種情況的組合數相加 (+) 以獲得總方法數。`,
        wrong_text: `不正確。請想想情境是「同時發生」(AND) 還是「任選一種可能」(OR)。`
      };
    }
    setQuestion(q);
    setFeedback(null);
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleAnswer = (ans) => {
    if (feedback) return;
    if (ans === question.type) {
      setFeedback({ correct: true, text: question.correct_text });
      onComplete(true);
    } else {
      setFeedback({ 
        correct: false, 
        text: question.wrong_text || `不正確。${question.hint}`
      });
      onComplete(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 border-b pb-2 border-dashed">Task 4: 運算符號 (加法 vs 乘法)</h2>
      {question && (
        <div>
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 mb-6">
            <p className="text-xl font-medium text-gray-800 leading-relaxed">{question.text}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleAnswer('add')} className="flex-1 px-5 py-4 rounded-xl text-white font-bold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] bg-orange-500 flex justify-center items-center gap-2 shadow-md">
              <Plus size={24}/> 相加 (+)
            </button>
            <button onClick={() => handleAnswer('multiply')} className="flex-1 px-5 py-4 rounded-xl text-white font-bold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] bg-red-500 flex justify-center items-center gap-2 shadow-md">
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
const Task5 = ({ onComplete }) => {
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
        const fracA = `${numA/com}/${denA/com}`;
        const formulaB = `1 - P(2男2女) = 1 - ${fracA}`;
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
        const fracA = `${numA/com}/${denA/com}`;
        const formulaB = `1 - P(4隻相同顏色) = 1 - ${fracA}`;
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
        
        const formulaB = `1 - P(3綠) - P(4綠)`;
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
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 border-b pb-2 border-dashed">Task 5: DSE 實戰模擬</h2>
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


// --- 主程式框架 ---
const ProbabilityQuiz = () => {
  const [activeTab, setActiveTab] = useState('task5');
  const [taskStatus, setTaskStatus] = useState({});

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

        {/* 導航 Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap bg-white/50 p-2 rounded-2xl backdrop-blur-sm shadow-sm w-fit mx-auto">
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
        <main className="transition-all duration-300 ease-in-out">
          {activeTab === 'task1' && <Task1 onComplete={(c) => handleTaskComplete('task1', c)} />}
          {activeTab === 'task2' && <Task2 onComplete={(c) => handleTaskComplete('task2', c)} />}
          {activeTab === 'task3' && <Task3 onComplete={(c) => handleTaskComplete('task3', c)} />}
          {activeTab === 'task4' && <Task4 onComplete={(c) => handleTaskComplete('task4', c)} />}
          {activeTab === 'task5' && <Task5 onComplete={(c) => handleTaskComplete('task5', c)} />}
        </main>
      </div>
    </div>
  );
};

export default ProbabilityQuiz;
