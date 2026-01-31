import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  Trophy,
  RefreshCw,
  DollarSign,
  Percent,
  Calculator
} from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';

// KaTeX 數學公式組件
const Latex = ({ math, block = false }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadKatexOnce().then(() => setIsLoaded(true)).catch(e => console.error("KaTeX load error:", e));
  }, []);

  useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        containerRef.current.innerHTML = '';
        window.katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
          output: 'html',
        });
      } catch (e) {
        console.error("KaTeX render error:", e);
        containerRef.current.innerText = math;
      }
    }
  }, [math, block, isLoaded]);

  return <span ref={containerRef} className={block ? "block text-center my-2" : "inline-block"} />;
};

// ========================================
// 教學頁面
// ========================================
const TeachingPage = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 頂部導航 */}
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <HomeIcon className="w-5 h-5" />
            <span className="text-sm font-medium">返回主頁</span>
          </Link>
          <div className="flex items-center gap-2 text-emerald-600">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">教學筆記</span>
          </div>
        </div>

        {/* 標題 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-emerald-500">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-800">百分數應用</h1>
          </div>
          <p className="text-slate-600">掌握價錢百分數與複利息計算</p>
        </div>

        {/* Section A: 關於錢的百分數 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">A</span>
            關於錢的百分數
          </h2>

          {/* 關鍵詞提示 */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 font-bold text-center">
              <Latex math="\text{必須了解幾個關鍵詞：}" />
            </p>
          </div>

          {/* 關鍵詞表格 */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-100">
                  <th className="border border-emerald-200 px-4 py-3 text-left font-bold text-emerald-800">關鍵詞</th>
                  <th className="border border-emerald-200 px-4 py-3 text-left font-bold text-emerald-800">定義 / 解釋</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-emerald-50 transition-colors">
                  <td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">標價</td>
                  <td className="border border-emerald-200 px-4 py-3">
                    <span className="text-red-600 font-bold">未折</span>的原價
                  </td>
                </tr>
                <tr className="bg-gray-50 hover:bg-emerald-50 transition-colors">
                  <td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">售價</td>
                  <td className="border border-emerald-200 px-4 py-3">
                    <span className="text-red-600 font-bold">折後</span>真正付的錢
                  </td>
                </tr>
                <tr className="bg-white hover:bg-emerald-50 transition-colors">
                  <td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">折扣</td>
                  <td className="border border-emerald-200 px-4 py-3">
                    標價 - 售價 <span className="text-green-600">（平了多少）</span>
                  </td>
                </tr>
                <tr className="bg-gray-50 hover:bg-emerald-50 transition-colors">
                  <td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">成本</td>
                  <td className="border border-emerald-200 px-4 py-3">
                    我做生意<span className="text-red-600 font-bold">買</span>/製作這件貨品需付的錢
                  </td>
                </tr>
                <tr className="bg-white hover:bg-emerald-50 transition-colors">
                  <td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">盈利</td>
                  <td className="border border-emerald-200 px-4 py-3">
                    扣除成本後<span className="bg-yellow-200 text-orange-600 font-bold px-1 rounded">賺</span>的錢：
                    <span className="text-red-600 font-bold">盈利 = 售價 - 成本</span>
                  </td>
                </tr>
                <tr className="bg-gray-50 hover:bg-emerald-50 transition-colors">
                  <td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">虧蝕</td>
                  <td className="border border-emerald-200 px-4 py-3">
                    扣除成本後<span className="bg-yellow-200 text-orange-600 font-bold px-1 rounded">蝕</span>的錢，即負盈利
                  </td>
                </tr>
                <tr className="bg-white hover:bg-emerald-50 transition-colors">
                  <td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">標價九折</td>
                  <td className="border border-emerald-200 px-4 py-3">
                    標價 <span className="text-green-600 font-bold">× 90%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 重要公式 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              重要公式
            </h3>
            <div className="bg-white rounded-lg p-4 border border-green-300">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-green-200">
                    <th className="text-left py-2 text-green-700">公式名稱</th>
                    <th className="text-left py-2 text-green-700">計算方法</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3">
                      <span className="text-green-600 font-bold">盈利/虧蝕百分率</span>
                    </td>
                    <td className="py-3">
                      <Latex math="\displaystyle \frac{\color{red}{\text{盈利/虧蝕}}}{\text{成本}} \times 100\%" block />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SVG 圖解 */}
          <div className="mt-6 bg-slate-50 rounded-lg p-4">
            <h3 className="font-bold text-slate-700 mb-4 text-center">💰 價錢關係圖解</h3>
            <svg viewBox="0 0 500 200" className="w-full max-w-lg mx-auto">
              {/* 成本 */}
              <rect x="20" y="80" width="100" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
              <text x="70" y="110" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">成本</text>
              
              {/* 箭頭 */}
              <path d="M125 105 L165 105" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="145" y="95" textAnchor="middle" fontSize="10" fill="#6b7280">+盈利</text>
              
              {/* 售價 */}
              <rect x="170" y="80" width="100" height="50" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="220" y="110" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#065f46">售價</text>
              
              {/* 箭頭 */}
              <path d="M275 105 L315 105" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="295" y="95" textAnchor="middle" fontSize="10" fill="#6b7280">+折扣</text>
              
              {/* 標價 */}
              <rect x="320" y="80" width="100" height="50" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
              <text x="370" y="110" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9d174d">標價</text>
              
              {/* 公式 */}
              <text x="220" y="170" textAnchor="middle" fontSize="12" fill="#374151">
                售價 = 標價 × 折扣率 = 成本 + 盈利
              </text>
              
              {/* 箭頭標記 */}
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* Section B: 複利息 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">B</span>
            複利息
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-blue-700 mb-3">複利息公式</h3>
            <div className="bg-white rounded-lg p-4 text-center">
              <Latex math="\text{本金} \times \left(1 + \frac{\text{年利率}}{\text{結算頻率}}\right)^{\text{期數}}" block />
            </div>
            <div className="mt-4 bg-blue-50 border border-blue-300 rounded-lg p-3">
              <p className="text-sm text-blue-800 mb-2">
                <span className="font-bold">例子：</span>本金 $10,000，年利率 6%，半年一結，年期 3 年
              </p>
              <div className="text-sm text-blue-900 my-2">
                <Latex math="\text{本金} \times \left(1 + \frac{6\%}{2}\right)^{6} = 10{,}000 \times (1.03)^{6}" />
              </div>
              <p className="text-xs text-blue-700 mt-2">
                💡 期數 = 年期 × 每年結算次數 = 3 × 2 = 6
              </p>
            </div>
          </div>

          {/* 結算次數表 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-blue-200 px-3 py-2">結算週期</th>
                  <th className="border border-blue-200 px-3 py-2">n (每年次數)</th>
                  <th className="border border-blue-200 px-3 py-2">例子：年利率 6%</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-blue-200 px-3 py-2 text-center">一年一結</td>
                  <td className="border border-blue-200 px-3 py-2 text-center font-bold">1</td>
                  <td className="border border-blue-200 px-3 py-2 text-center"><Latex math="\left(1+\frac{6\%}{1}\right)^{t} = (1+6\%)^{t}" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-blue-200 px-3 py-2 text-center">半年一結</td>
                  <td className="border border-blue-200 px-3 py-2 text-center font-bold">2</td>
                  <td className="border border-blue-200 px-3 py-2 text-center"><Latex math="\left(1+\frac{6\%}{2}\right)^{2t} = (1+3\%)^{2t}" /></td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-200 px-3 py-2 text-center">一季一結</td>
                  <td className="border border-blue-200 px-3 py-2 text-center font-bold">4</td>
                  <td className="border border-blue-200 px-3 py-2 text-center"><Latex math="\left(1+\frac{6\%}{4}\right)^{4t} = (1+1.5\%)^{4t}" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-blue-200 px-3 py-2 text-center">一月一結</td>
                  <td className="border border-blue-200 px-3 py-2 text-center font-bold">12</td>
                  <td className="border border-blue-200 px-3 py-2 text-center"><Latex math="\left(1+\frac{6\%}{12}\right)^{12t} = (1+0.5\%)^{12t}" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 開始測驗按鈕 */}
        <div className="text-center">
          <button
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <GraduationCap className="w-6 h-6" />
            開始測驗
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ========================================
// 測驗頁面
// ========================================
const QuizPage = ({ onBackToTeaching }) => {
  const [quizType, setQuizType] = useState(null); // 'price' or 'compound'
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState({ type: 'neutral', msg: '' });
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const inputRef = useRef(null);

  // =====================
  // 價錢百分數題目生成
  // =====================
  const generatePriceQuestion = () => {
    const types = [1, 2, 3, 4];
    const type = types[Math.floor(Math.random() * types.length)];

    switch (type) {
      case 1: return generateType1Question();
      case 2: return generateType2Question();
      case 3: return generateType3Question();
      case 4: return generateType4Question();
      default: return generateType1Question();
    }
  };

  // 類型1: 標價和售價的關係（已知折扣）
  const generateType1Question = () => {
    const discountOptions = [
      { zh: '四折', rate: 0.4 },
      { zh: '五折', rate: 0.5 },
      { zh: '六折', rate: 0.6 },
      { zh: '七折', rate: 0.7 },
      { zh: '八折', rate: 0.8 },
      { zh: '九折', rate: 0.9 },
    ];
    const items = ['紀念品', '玩具', '手錶', '相機', '背包', '耳機'];
    const item = items[Math.floor(Math.random() * items.length)];
    const discount = discountOptions[Math.floor(Math.random() * discountOptions.length)];

    const variant = Math.random() > 0.5;

    if (variant) {
      // 已知售價，求標價
      const sellingPrice = Math.round((Math.floor(Math.random() * 20) + 5) * 10 * discount.rate) * 10;
      const markedPrice = Math.round(sellingPrice / discount.rate);

      return {
        type: 1,
        text: `某${item}的售價為 $${sellingPrice}。該${item}以其標價${discount.zh}售出。求該${item}的標價。`,
        answer: markedPrice,
        hintLatex: `\\begin{aligned}
          \\text{售價} &= \\text{標價} \\times ${discount.rate} \\\\
          \\text{標價} &= \\text{售價} \\div ${discount.rate} \\\\
          &= \\$${sellingPrice} \\div ${discount.rate} \\\\
          &= \\$${markedPrice}
        \\end{aligned}`,
        unit: '$'
      };
    } else {
      // 已知標價，求售價
      const markedPrice = (Math.floor(Math.random() * 50) + 10) * 5;
      const sellingPrice = Math.round(markedPrice * discount.rate);

      return {
        type: 1,
        text: `某${item}的標價為 $${markedPrice}。該${item}現以其標價${discount.zh}售出。求該${item}的售價。`,
        answer: sellingPrice,
        hintLatex: `\\begin{aligned}
          \\text{售價} &= \\text{標價} \\times ${discount.rate} \\\\
          &= \\$${markedPrice} \\times ${discount.rate} \\\\
          &= \\$${sellingPrice}
        \\end{aligned}`,
        unit: '$'
      };
    }
  };

  // 類型2: 成本和售價的關係（已知賺/蝕實際金額）
  const generateType2Question = () => {
    const items = ['風扇', '襯衣', '電器', '書包', '運動鞋'];
    const item = items[Math.floor(Math.random() * items.length)];
    const discountOptions = ['五折', '六折', '七折', '八折', '九折'];
    const discountRates = [0.5, 0.6, 0.7, 0.8, 0.9];
    const discountIdx = Math.floor(Math.random() * discountOptions.length);
    const discountZh = discountOptions[discountIdx];
    const discountRate = discountRates[discountIdx];

    const profitPercent = [20, 25, 26, 30, 35][Math.floor(Math.random() * 5)];
    const profit = [60, 78, 80, 90, 100, 120][Math.floor(Math.random() * 6)];

    // 盈利百分率 = 盈利/成本 × 100%
    // 成本 = 盈利 / (盈利百分率/100)
    const cost = Math.round(profit / (profitPercent / 100));
    const sellingPrice = cost + profit;
    const markedPrice = Math.round(sellingPrice / discountRate);

    return {
      type: 2,
      text: `某${item}以其標價${discountZh}售出。售出該${item}後，盈利為 $${profit} 且盈利百分率為 ${profitPercent}%。求該${item}的標價。`,
      answer: markedPrice,
      hintLatex: `\\begin{aligned}
        \\text{成本} &= \\text{盈利} \\div \\text{盈利百分率} \\\\
        &= \\$${profit} \\div ${profitPercent}\\% \\\\
        &= \\$${cost} \\\\
        \\text{售價} &= \\text{成本} + \\text{盈利} \\\\
        &= \\$${cost} + \\$${profit} \\\\
        &= \\$${sellingPrice} \\\\
        \\text{標價} \\times ${discountRate} &= \\text{售價} \\\\
        \\text{標價} &= \\$${sellingPrice} \\div ${discountRate} \\\\
        &= \\$${markedPrice}
      \\end{aligned}`,
      unit: '$'
    };
  };

  // 類型3: 成本和售價的關係（已知盈利虧蝕百分率）
  const generateType3Question = () => {
    const items = ['書', '文具', '電子產品', '衣服', '鞋子'];
    const item = items[Math.floor(Math.random() * items.length)];
    const cost = (Math.floor(Math.random() * 20) + 10) * 25;
    const profitPercent = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];

    const isProfit = Math.random() > 0.3;
    let sellingPrice, questionText;

    if (isProfit) {
      sellingPrice = Math.round(cost * (1 + profitPercent / 100));
      questionText = `某${item}的成本為 $${cost}。現售出該${item}且盈利百分率為 ${profitPercent}%。求該${item}的售價。`;
    } else {
      sellingPrice = Math.round(cost * (1 - profitPercent / 100));
      questionText = `某${item}的成本為 $${cost}。現售出該${item}且虧蝕百分率為 ${profitPercent}%。求該${item}的售價。`;
    }

    const multiplier = isProfit ? (1 + profitPercent / 100) : (1 - profitPercent / 100);
    const operator = isProfit ? '+' : '-';
    const label = isProfit ? '盈利' : '虧蝕';

    return {
      type: 3,
      text: questionText,
      answer: sellingPrice,
      hintLatex: `\\begin{aligned}
        \\text{售價} &= \\text{成本} \\times (1 ${operator} \\text{${label}百分率}) \\\\
        &= \\$${cost} \\times (1 ${operator} ${profitPercent}\\%) \\\\
        &= \\$${cost} \\times ${multiplier} \\\\
        &= \\$${sellingPrice}
      \\end{aligned}`,
      unit: '$'
    };
  };

  // 類型4: 百分數比較（大於/小於）
  const generateType4Question = () => {
    const names = [
      { name1: '志偉', name2: '佩玲' },
      { name1: '小明', name2: '小華' },
      { name1: '阿強', name2: '阿美' }
    ];
    const pair = names[Math.floor(Math.random() * names.length)];
    const percentChange = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];
    const baseSalary = (Math.floor(Math.random() * 10) + 3) * 100;

    const variant = Math.floor(Math.random() * 4);

    switch (variant) {
      case 0: {
        // A的日薪為X，B較A高Y%，求B
        const answerSalary = Math.round(baseSalary * (1 + percentChange / 100));
        const multiplier = 1 + percentChange / 100;
        return {
          type: 4,
          text: `${pair.name1}的日薪為 $${baseSalary}。${pair.name2}的日薪較${pair.name1}高 ${percentChange}%。求${pair.name2}的日薪。`,
          answer: answerSalary,
          hintLatex: `\\begin{aligned}
            \\text{${pair.name2}的日薪} &= \\text{${pair.name1}的日薪} \\times (1 + ${percentChange}\\%) \\\\
            &= \\$${baseSalary} \\times ${multiplier} \\\\
            &= \\$${answerSalary}
          \\end{aligned}`,
          unit: '$'
        };
      }
      case 1: {
        // B的日薪為X，B較A高Y%，求A
        const multiplier = 1 + percentChange / 100;
        const otherSalary = Math.round(baseSalary / multiplier);
        return {
          type: 4,
          text: `${pair.name2}的日薪為 $${baseSalary}。${pair.name2}的日薪較${pair.name1}高 ${percentChange}%。求${pair.name1}的日薪。`,
          answer: otherSalary,
          hintLatex: `\\begin{aligned}
            \\text{${pair.name2}的日薪} &= \\text{${pair.name1}的日薪} \\times (1 + ${percentChange}\\%) \\\\
            \\text{${pair.name1}的日薪} &= \\text{${pair.name2}的日薪} \\div (1 + ${percentChange}\\%) \\\\
            &= \\$${baseSalary} \\div ${multiplier} \\\\
            &= \\$${otherSalary}
          \\end{aligned}`,
          unit: '$'
        };
      }
      case 2: {
        // A的日薪為X，B較A低Y%，求B
        const answerSalary = Math.round(baseSalary * (1 - percentChange / 100));
        const multiplier = 1 - percentChange / 100;
        return {
          type: 4,
          text: `${pair.name1}的日薪為 $${baseSalary}。${pair.name2}的日薪較${pair.name1}低 ${percentChange}%。求${pair.name2}的日薪。`,
          answer: answerSalary,
          hintLatex: `\\begin{aligned}
            \\text{${pair.name2}的日薪} &= \\text{${pair.name1}的日薪} \\times (1 - ${percentChange}\\%) \\\\
            &= \\$${baseSalary} \\times ${multiplier} \\\\
            &= \\$${answerSalary}
          \\end{aligned}`,
          unit: '$'
        };
      }
      default: {
        // B的日薪為X，B較A低Y%，求A
        const multiplier = 1 - percentChange / 100;
        const otherSalary = Math.round(baseSalary / multiplier);
        return {
          type: 4,
          text: `${pair.name2}的日薪為 $${baseSalary}。${pair.name2}的日薪較${pair.name1}低 ${percentChange}%。求${pair.name1}的日薪。`,
          answer: otherSalary,
          hintLatex: `\\begin{aligned}
            \\text{${pair.name2}的日薪} &= \\text{${pair.name1}的日薪} \\times (1 - ${percentChange}\\%) \\\\
            \\text{${pair.name1}的日薪} &= \\text{${pair.name2}的日薪} \\div (1 - ${percentChange}\\%) \\\\
            &= \\$${baseSalary} \\div ${multiplier} \\\\
            &= \\$${otherSalary}
          \\end{aligned}`,
          unit: '$'
        };
      }
    }
  };

  // =====================
  // 複利息題目生成
  // =====================
  const generateCompoundQuestion = () => {
    const principal = (Math.floor(Math.random() * 100) + 1) * 1000; // 1000 到 100000，千位齊頭數
    const annualRate = [2, 3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 7)];
    const years = [1, 2, 3, 4, 5, 6, 8, 10][Math.floor(Math.random() * 8)];
    
    const compoundingOptions = [
      { zh: '年', n: 1 },
      { zh: '半年', n: 2 },
      { zh: '一季', n: 4 },
      { zh: '一個月', n: 12 }
    ];
    const compounding = compoundingOptions[Math.floor(Math.random() * compoundingOptions.length)];
    
    const askForInterest = Math.random() > 0.5;

    // A = P(1 + r/n)^(nt)
    const r = annualRate / 100;
    const amount = principal * Math.pow(1 + r / compounding.n, compounding.n * years);
    const roundedAmount = Math.round(amount);
    const interest = roundedAmount - principal;

    // 根據結算頻率決定顯示格式
    const rateDisplay = compounding.n === 1 
      ? `${annualRate}\\%` 
      : `\\frac{${annualRate}\\%}{${compounding.n}}`;
    
    const formulaDisplay = compounding.n === 1
      ? `\\text{本利和} = \\$${principal.toLocaleString()} \\times (1 + ${annualRate}\\%)^{${years}}`
      : `\\text{本利和} = \\$${principal.toLocaleString()} \\times \\left(1 + \\frac{${annualRate}\\%}{${compounding.n}}\\right)^{${compounding.n} \\times ${years}}`;

    if (askForInterest) {
      return {
        type: 'compound',
        text: `存款 $${principal.toLocaleString()}，年利率 ${annualRate}%，年期 ${years} 年，複利計算，每${compounding.zh}一結。求利息，準確至最接近的元。`,
        answer: interest,
        hintLatex: `\\begin{aligned}
          ${formulaDisplay.replace(/\\/g, '\\\\')} &\\approx \\$${roundedAmount.toLocaleString()} \\\\
          \\text{利息} &= \\text{本利和} - \\text{本金} \\\\
          &= \\$${roundedAmount.toLocaleString()} - \\$${principal.toLocaleString()} \\\\
          &= \\$${interest.toLocaleString()}
        \\end{aligned}`,
        unit: '$',
        formula: {
          principal,
          rate: annualRate,
          years,
          n: compounding.n,
          compoundingZh: compounding.zh
        }
      };
    } else {
      return {
        type: 'compound',
        text: `存款 $${principal.toLocaleString()}，年利率 ${annualRate}%，年期 ${years} 年，複利計算，每${compounding.zh}一結。求本利和，準確至最接近的元。`,
        answer: roundedAmount,
        hintLatex: `\\begin{aligned}
          ${formulaDisplay.replace(/\\/g, '\\\\')} &\\approx \\$${roundedAmount.toLocaleString()}
        \\end{aligned}`,
        unit: '$',
        formula: {
          principal,
          rate: annualRate,
          years,
          n: compounding.n,
          compoundingZh: compounding.zh
        }
      };
    }
  };

  // 開始測驗
  const startQuiz = (type) => {
    setQuizType(type);
    setScore(0);
    setTotalQuestions(0);
    generateNewQuestion(type);
  };

  const generateNewQuestion = (type) => {
    const question = type === 'price' ? generatePriceQuestion() : generateCompoundQuestion();
    setCurrentQuestion(question);
    setUserAnswer('');
    setFeedback({ type: 'neutral', msg: '' });
    setIsAnswered(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 提交答案
  const handleSubmit = () => {
    if (!userAnswer.trim() || isAnswered) return;

    const numAnswer = parseFloat(userAnswer.replace(/[,$]/g, ''));
    const correctAnswer = currentQuestion.answer;

    // 允許1%的誤差範圍（四捨五入差異）
    const tolerance = Math.max(1, correctAnswer * 0.01);
    const isCorrect = Math.abs(numAnswer - correctAnswer) <= tolerance;

    setIsAnswered(true);
    setTotalQuestions(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback({ type: 'correct', msg: `正確！答案是 ${currentQuestion.unit}${correctAnswer.toLocaleString()}` });
    } else {
      setFeedback({ 
        type: 'incorrect', 
        msg: `答案是 ${currentQuestion.unit}${correctAnswer.toLocaleString()}`,
        hint: currentQuestion.hint,
        hintLatex: currentQuestion.hintLatex
      });
    }
  };

  // 下一題
  const handleNext = () => {
    generateNewQuestion(quizType);
  };

  // 返回選擇頁面
  const backToSelection = () => {
    setQuizType(null);
    setCurrentQuestion(null);
    setScore(0);
    setTotalQuestions(0);
  };

  // 測驗選擇界面
  if (!quizType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* 頂部導航 */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={onBackToTeaching}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回教學</span>
            </button>
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
              <HomeIcon className="w-5 h-5" />
              <span className="text-sm font-medium">主頁</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-center text-slate-800 mb-8">選擇測驗類型</h1>

          <div className="grid gap-6">
            {/* 價錢百分數 */}
            <button
              onClick={() => startQuiz('price')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-emerald-400 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-4 rounded-xl group-hover:bg-emerald-200 transition-colors">
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-800">測驗一：價錢的百分數</h2>
                  <p className="text-slate-600 text-sm mt-1">標價、售價、成本、盈利/虧蝕百分率</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 ml-auto group-hover:text-emerald-600 transition-colors" />
              </div>
            </button>

            {/* 複利息 */}
            <button
              onClick={() => startQuiz('compound')}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-blue-400 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <Percent className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-800">測驗二：複利息</h2>
                  <p className="text-slate-600 text-sm mt-1">本利和、利息、不同結算週期</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 ml-auto group-hover:text-blue-600 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 測驗界面
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 頂部導航 */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={backToSelection}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回選擇</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-bold text-slate-700">{score}/{totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* 題目類型標題 */}
        <div className={`rounded-xl p-4 mb-4 ${quizType === 'price' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
          <h2 className={`text-lg font-bold ${quizType === 'price' ? 'text-emerald-700' : 'text-blue-700'}`}>
            {quizType === 'price' ? '📦 價錢的百分數' : '🏦 複利息'}
          </h2>
        </div>

        {/* 題目卡片 */}
        {currentQuestion && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <p className="text-lg text-slate-800 leading-relaxed mb-6">
              {currentQuestion.text}
            </p>

            {/* 輸入區 */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-bold text-slate-600">{currentQuestion.unit}</span>
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (isAnswered ? handleNext() : handleSubmit())}
                placeholder="輸入答案..."
                disabled={isAnswered}
                className="flex-1 border-2 border-slate-300 rounded-lg px-4 py-3 text-lg focus:border-emerald-500 focus:outline-none disabled:bg-gray-100"
              />
            </div>

            {/* 反饋 */}
            {feedback.type !== 'neutral' && (
              <div className={`rounded-lg p-4 mb-4 ${
                feedback.type === 'correct' 
                  ? 'bg-green-100 border border-green-300' 
                  : 'bg-red-100 border border-red-300'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {feedback.type === 'correct' 
                    ? <Check className="w-5 h-5 text-green-600" />
                    : <X className="w-5 h-5 text-red-600" />
                  }
                  <span className={`font-bold ${
                    feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {feedback.type === 'correct' ? '正確！' : '不正確'}
                  </span>
                </div>
                <p className={feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}>
                  {feedback.msg}
                </p>
                {feedback.hint && (
                  <p className="text-red-600 text-sm mt-2 border-t border-red-200 pt-2">
                    💡 提示：{feedback.hint}
                  </p>
                )}
                {feedback.hintLatex && (
                  <div className="text-sm mt-2 border-t border-red-200 pt-2">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-slate-800">
                        <Latex math={feedback.hintLatex} block />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 按鈕 */}
            <div className="flex gap-3">
              {!isAnswered ? (
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="flex-1 bg-emerald-500 text-white py-3 rounded-lg font-bold hover:bg-emerald-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  提交答案
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  下一題
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* SVG 視覺化（價錢題目） */}
        {quizType === 'price' && currentQuestion && (
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <svg viewBox="0 0 400 120" className="w-full">
              {/* 價錢關係圖 */}
              <rect x="10" y="40" width="80" height="40" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
              <text x="50" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">成本</text>

              <path d="M95 60 L125 60" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowQ)" />
              
              <rect x="130" y="40" width="80" height="40" rx="5" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="170" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#065f46">售價</text>

              <path d="M215 60 L245 60" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowQ)" />
              
              <rect x="250" y="40" width="80" height="40" rx="5" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
              <text x="290" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9d174d">標價</text>

              {/* 標籤 */}
              <text x="110" y="35" textAnchor="middle" fontSize="9" fill="#6b7280">+盈利</text>
              <text x="230" y="35" textAnchor="middle" fontSize="9" fill="#6b7280">+折扣</text>

              <defs>
                <marker id="arrowQ" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
                </marker>
              </defs>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

// ========================================
// 主應用程式
// ========================================
const PercentageQuiz = () => {
  const [currentPage, setCurrentPage] = useState('teaching'); // 'teaching' or 'quiz'

  return currentPage === 'teaching' ? (
    <TeachingPage onStartQuiz={() => setCurrentPage('quiz')} />
  ) : (
    <QuizPage onBackToTeaching={() => setCurrentPage('teaching')} />
  );
};

export default PercentageQuiz;
