import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Home as HomeIcon, 
  Trophy, 
  BookOpen, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  X,
  GraduationCap,
  PenTool
} from 'lucide-react';

// ========== 題目生成器 ==========

// 生成隨機數字 (百位數至千位數，小數點後2-4位)
const generateRandomNumber = () => {
  // 整數部分：10 到 9999
  const intPart = Math.floor(Math.random() * 9990) + 10;
  // 小數位數：2到4位
  const decimalPlaces = Math.floor(Math.random() * 3) + 2;
  // 生成小數部分
  let decPart = '';
  for (let i = 0; i < decimalPlaces; i++) {
    decPart += Math.floor(Math.random() * 10);
  }
  return parseFloat(`${intPart}.${decPart}`);
};

// 捨入方法
const ROUNDING_METHODS = ['上捨入', '下捨入', '捨入'];

// 取值目標
const ROUNDING_TARGETS = [
  { label: '最接近的整數', type: 'integer', value: 0 },
  { label: '最接近的十位', type: 'tens', value: -1 },
  { label: '最接近的百位', type: 'hundreds', value: -2 },
  { label: '一位小數', type: 'decimal', value: 1 },
  { label: '二位小數', type: 'decimal', value: 2 },
  { label: '三位小數', type: 'decimal', value: 3 },
  { label: '一位有效數字', type: 'sig', value: 1 },
  { label: '二位有效數字', type: 'sig', value: 2 },
  { label: '三位有效數字', type: 'sig', value: 3 },
];

// 計算有效數字位數
const countSignificantFigures = (num) => {
  const str = Math.abs(num).toString().replace('.', '');
  // 移除開頭的0
  const trimmed = str.replace(/^0+/, '');
  return trimmed.length;
};

// 根據數字過濾可用的取值目標
const getValidTargets = (num) => {
  const sigFigs = countSignificantFigures(num);
  const intPart = Math.floor(Math.abs(num));
  const intDigits = intPart.toString().length;
  
  // 獲取小數位數
  const numStr = num.toString();
  const decimalPlaces = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  
  return ROUNDING_TARGETS.filter(target => {
    // 有效數字目標：不能超過原數字的有效數字位數
    if (target.type === 'sig') {
      return target.value < sigFigs;
    }
    // 百位：整數部分需要至少3位
    if (target.type === 'hundreds') {
      return intDigits >= 3;
    }
    // 十位：整數部分需要至少2位
    if (target.type === 'tens') {
      return intDigits >= 2;
    }
    // 小數位：原數字的小數位數必須大於目標小數位數
    if (target.type === 'decimal') {
      return decimalPlaces > target.value;
    }
    return true;
  });
};

// 執行捨入計算
const performRounding = (num, method, target) => {
  let result;
  
  if (target.type === 'integer') {
    // 最接近的整數
    if (method === '上捨入') {
      result = Math.ceil(num);
    } else if (method === '下捨入') {
      result = Math.floor(num);
    } else {
      result = Math.round(num);
    }
  } else if (target.type === 'tens') {
    // 最接近的十位
    if (method === '上捨入') {
      result = Math.ceil(num / 10) * 10;
    } else if (method === '下捨入') {
      result = Math.floor(num / 10) * 10;
    } else {
      result = Math.round(num / 10) * 10;
    }
  } else if (target.type === 'hundreds') {
    // 最接近的百位
    if (method === '上捨入') {
      result = Math.ceil(num / 100) * 100;
    } else if (method === '下捨入') {
      result = Math.floor(num / 100) * 100;
    } else {
      result = Math.round(num / 100) * 100;
    }
  } else if (target.type === 'decimal') {
    // 小數位
    const factor = Math.pow(10, target.value);
    if (method === '上捨入') {
      result = Math.ceil(num * factor) / factor;
    } else if (method === '下捨入') {
      result = Math.floor(num * factor) / factor;
    } else {
      result = Math.round(num * factor) / factor;
    }
    // 確保顯示正確的小數位數
    result = parseFloat(result.toFixed(target.value));
  } else if (target.type === 'sig') {
    // 有效數字
    const sigFigs = target.value;
    if (num === 0) {
      result = 0;
    } else {
      const magnitude = Math.floor(Math.log10(Math.abs(num)));
      const factor = Math.pow(10, magnitude - sigFigs + 1);
      if (method === '上捨入') {
        result = Math.ceil(num / factor) * factor;
      } else if (method === '下捨入') {
        result = Math.floor(num / factor) * factor;
      } else {
        result = Math.round(num / factor) * factor;
      }
    }
  }
  
  return result;
};

// 格式化結果顯示
const formatResult = (result, target) => {
  if (target.type === 'decimal') {
    return result.toFixed(target.value);
  }
  if (target.type === 'sig') {
    // 對於有效數字，不使用toPrecision避免科學記數法
    // 根據結果决定小數位數
    if (result === 0) return '0';
    
    // 如果是整數，直接返回
    if (Math.floor(result) === result) {
      return result.toString();
    }
    
    // 如果有小數，找出需要保留的小數位數
    const resultStr = result.toString();
    if (resultStr.includes('e')) {
      // 如果JavaScript自動轉換成科學記數法，手動處理
      return result.toFixed(0);
    }
    return resultStr;
  }
  return result.toString();
};

// 生成解釋說明
const generateExplanation = (num, method, target, answer) => {
  const numStr = num.toString();
  let positionDigit = '';
  let nextDigit = '';
  let positionName = '';
  
  // 找出位值和下一位數字
  if (target.type === 'integer') {
    positionName = '個位';
    const parts = numStr.split('.');
    positionDigit = parts[0].slice(-1);
    nextDigit = parts[1] ? parts[1][0] : '0';
  } else if (target.type === 'tens') {
    positionName = '十位';
    const intPart = Math.floor(num).toString();
    positionDigit = intPart.length >= 2 ? intPart.slice(-2, -1) : '0';
    nextDigit = intPart.slice(-1);
  } else if (target.type === 'hundreds') {
    positionName = '百位';
    const intPart = Math.floor(num).toString();
    positionDigit = intPart.length >= 3 ? intPart.slice(-3, -2) : '0';
    nextDigit = intPart.length >= 2 ? intPart.slice(-2, -1) : '0';
  } else if (target.type === 'decimal') {
    positionName = `第${target.value}位小數`;
    const parts = numStr.split('.');
    const decPart = parts[1] || '';
    positionDigit = decPart[target.value - 1] || '0';
    nextDigit = decPart[target.value] || '0';
  } else if (target.type === 'sig') {
    positionName = `第${target.value}位有效數字`;
    // 找出有效數字
    const cleanStr = numStr.replace('.', '');
    const firstNonZero = cleanStr.search(/[1-9]/);
    if (firstNonZero !== -1) {
      positionDigit = cleanStr[firstNonZero + target.value - 1] || '0';
      nextDigit = cleanStr[firstNonZero + target.value] || '0';
    }
  }
  
  // 生成解釋
  let explanation = '';
  
  // 判斷是小數位還是整數位
  const isDecimalPlace = target.type === 'decimal';
  const isIntegerType = target.type === 'integer';
  const isHigherIntegerPlace = target.type === 'tens' || target.type === 'hundreds';
  
  // 獲取目標類型的中文描述
  let targetLabel = '';
  if (isIntegerType) {
    targetLabel = '最接近的整數';
  } else if (target.type === 'tens') {
    targetLabel = '最接近的十位';
  } else if (target.type === 'hundreds') {
    targetLabel = '最接近的百位';
  } else if (isDecimalPlace) {
    targetLabel = target.label;
  } else if (target.type === 'sig') {
    targetLabel = target.label;
  }
  
  // 第一行：分析
  explanation = `分析：${targetLabel} → 位值為${positionDigit}。\n`;
  
  // 第二行：捨入方法及結果
  if (method === '上捨入') {
    if (isDecimalPlace) {
      const nextValue = parseInt(positionDigit) + 1;
      explanation += `上捨入 ---> 必定進位至${nextValue}。\n`;
      explanation += `${positionDigit}之後的小數可以省略不寫。`;
    } else if (isIntegerType) {
      const resultInt = Math.floor(answer);
      explanation += `上捨 → 必定進位。\n`;
      explanation += `所以保留${resultInt}，小數可以省略不寫。`;
    } else if (isHigherIntegerPlace) {
      const nextValue = parseInt(positionDigit) + 1;
      explanation += `上捨 → 必定進位至${nextValue}。\n`;
      explanation += `${positionDigit}之後的整數部份數字需補0，小數可以省略不寫。`;
    } else {
      // 有效數字 - 從答案中提取進位後的數字
      const answerStr = answer.toString().replace('.', '');
      const firstNonZeroAns = answerStr.search(/[1-9]/);
      const actualDigit = firstNonZeroAns !== -1 ? answerStr[firstNonZeroAns + target.value - 1] : positionDigit;
      explanation += `上捨 → 必定進位至${actualDigit}。\n`;
      explanation += `${actualDigit}之後的整數部份數字需補0，小數可以省略不寫。`;
    }
  } else if (method === '下捨入') {
    if (isDecimalPlace) {
      explanation += `下捨入 ---> 不需進位。\n`;
      explanation += `${positionDigit}之後的小數可以省略不寫。`;
    } else if (isIntegerType) {
      const resultInt = Math.floor(answer);
      explanation += `下捨 → 不需進位。\n`;
      explanation += `所以保留${resultInt}，小數可以省略不寫。`;
    } else if (isHigherIntegerPlace) {
      explanation += `下捨 → 不需進位。\n`;
      explanation += `${positionDigit}之後的整數部份數字需補0，小數可以省略不寫。`;
    } else {
      // 有效數字
      explanation += `下捨 → 不需進位。\n`;
      explanation += `${positionDigit}之後的整數部份數字需補0，小數可以省略不寫。`;
    }
  } else {
    // 捨入 (四捨五入)
    const nextVal = parseInt(nextDigit);
    if (nextVal >= 5) {
      if (isDecimalPlace) {
        const nextValue = parseInt(positionDigit) + 1;
        explanation += `捨入 ---> 後面的數是 ${nextDigit}，五入 → 進位至${nextValue}。\n`;
        explanation += `${positionDigit}之後的小數可以省略不寫。`;
      } else if (isIntegerType) {
        const resultInt = Math.floor(answer);
        explanation += `後面的數是 ${nextDigit}，五入 → 進位。\n`;
        explanation += `所以保留${resultInt}，小數可以省略不寫。`;
      } else if (isHigherIntegerPlace) {
        const nextValue = parseInt(positionDigit) + 1;
        explanation += `後面的數是 ${nextDigit}，五入 → 進位至${nextValue}。\n`;
        explanation += `${positionDigit}之後的整數部份數字需補0，小數可以省略不寫。`;
      } else {
        // 有效數字 - 從答案中提取進位後的數字
        const answerStr = answer.toString().replace('.', '');
        const firstNonZeroAns = answerStr.search(/[1-9]/);
        const actualDigit = firstNonZeroAns !== -1 ? answerStr[firstNonZeroAns + target.value - 1] : positionDigit;
        explanation += `後面的數是 ${nextDigit}，五入 → 進位至${actualDigit}。\n`;
        explanation += `${actualDigit}之後的整數部份數字需補0，小數可以省略不寫。`;
      }
    } else {
      if (isDecimalPlace) {
        explanation += `捨入 ---> 後面的數是 ${nextDigit}，四捨 → 不用進位。\n`;
        explanation += `${positionDigit}之後的小數可以省略不寫。`;
      } else if (isIntegerType) {
        const resultInt = Math.floor(answer);
        explanation += `後面的數是 ${nextDigit}，四捨 → 不用進位。\n`;
        explanation += `所以保留${resultInt}，小數可以省略不寫。`;
      } else if (isHigherIntegerPlace) {
        explanation += `後面的數是 ${nextDigit}，四捨 → 不用進位。\n`;
        explanation += `${positionDigit}之後的整數部份數字需補0，小數可以省略不寫。`;
      } else {
        // 有效數字
        explanation += `後面的數是 ${nextDigit}，四捨 → 不用進位。\n`;
        explanation += `${positionDigit}之後的整數部份數字需補0，小數可以省略不寫。`;
      }
    }
  }
  
  return explanation;
};

// 生成題目
const generateQuestion = () => {
  const num = generateRandomNumber();
  const validTargets = getValidTargets(num);
  const target = validTargets[Math.floor(Math.random() * validTargets.length)];
  const method = ROUNDING_METHODS[Math.floor(Math.random() * ROUNDING_METHODS.length)];
  const answer = performRounding(num, method, target);
  
  return {
    number: num,
    method,
    target,
    answer,
    displayAnswer: formatResult(answer, target)
  };
};

// ========== 筆記組件 ==========
const NotesSection = () => {
  return (
    <div className="space-y-6 text-slate-700">
      {/* 標題部分 */}
      <div className="border-b-2 border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-800">
          1. 有效數字：<span className="text-slate-600">不是開首的 0 就是有效數字</span>
        </h2>
      </div>

      {/* 例子 I, II, III */}
      <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
        <div className="text-lg font-mono flex items-center gap-2">
          <span className="text-blue-600 font-bold">I.</span>
          <span className="relative">
            8<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">1</span>
          </span>
          <span>.</span>
          <span className="relative">
            4<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">2</span>
          </span>
          <span className="relative">
            6<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">3</span>
          </span>
        </div>
        
        <div className="text-lg font-mono flex items-center gap-2">
          <span className="text-blue-600 font-bold">II.</span>
          <span className="relative">
            0<span className="absolute -top-4 left-0 text-sm text-red-600 font-bold">×</span>
          </span>
          <span>.</span>
          <span className="relative">
            0<span className="absolute -top-4 left-0 text-sm text-red-600 font-bold">×</span>
          </span>
          <span className="relative">
            5<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">1</span>
          </span>
          <span className="relative">
            8<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">2</span>
          </span>
          <span className="text-red-600 text-sm ml-4">× 不是有效數字</span>
        </div>
        
        <div className="text-lg font-mono flex items-center gap-2">
          <span className="text-blue-600 font-bold">III.</span>
          <span className="relative">
            0<span className="absolute -top-4 left-0 text-sm text-red-600 font-bold">×</span>
          </span>
          <span>.</span>
          <span className="relative">
            6<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">1</span>
          </span>
          <span className="relative">
            0<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">2</span>
          </span>
          <span className="relative">
            8<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">3</span>
          </span>
          <span className="text-green-600 text-sm ml-4">1 第一位有效數字</span>
        </div>
      </div>

      <hr className="border-slate-300" />

      {/* 注意事項 & 捨入方法 */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="font-bold">需注意：</span>
          <span className="text-blue-600 font-bold">1. 捨入方法</span>
          <span className="text-green-600 font-bold">2. 取值</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 左側：捨入規則 */}
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <h3 className="font-bold text-blue-800 mb-2">捨入方法：</h3>
            
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xs">(必定進位)</span>
              <span className="text-blue-600 font-bold w-12">上捨</span>
              <span className="font-mono">45.1 → <b>46</b></span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xs">(4捨5入)</span>
              <span className="text-blue-600 font-bold w-12">捨入</span>
              <span className="font-mono">45.1 → <b>45</b></span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xs">(不需進位)</span>
              <span className="text-blue-600 font-bold w-12">下捨</span>
              <span className="font-mono">45.9 → <b>45</b></span>
            </div>
          </div>

          {/* 右側：取值目標 */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">取值目標：</h3>
            <ul className="space-y-1 text-sm">
              <li>• 2位小數</li>
              <li>• 有效數字</li>
              <li>• 最接近整數</li>
              <li>• 最接近十位</li>
              <li>• 最接近百位</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 題目範例 */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <span className="text-blue-600 font-bold text-lg">e.g.</span>
        <ol className="list-[lower-alpha] list-inside mt-2 space-y-2">
          <li>
            把 <span className="border-2 border-red-400 rounded-full px-1">9</span>
            <span className="border-b-2 border-blue-400">8</span>7.6543 
            <span className="text-blue-600 font-bold"> 上捨入</span>至最接近的百位。
          </li>
          <li>
            把 987.65<span className="border-2 border-red-400 rounded-full px-1">4</span>
            <span className="border-b-2 border-blue-400">3</span> 
            <span className="text-blue-600 font-bold"> 捨入</span>至三位小數。
          </li>
          <li>
            把 9<span className="border-2 border-red-400 rounded-full px-1">8</span>
            <span className="border-b-2 border-blue-400">7</span>.6543 
            <span className="text-blue-600 font-bold"> 下捨入</span>至二位有效數字。
          </li>
        </ol>
      </div>

      {/* 解答部分 */}
      <div className="space-y-3">
        <h3 className="text-red-600 font-bold">圈下位值及下一個數字</h3>
        
        <div className="space-y-2 bg-slate-50 p-4 rounded-lg">
          <div className="flex items-start gap-4">
            <span className="text-blue-600 font-bold">a. 1000</span>
            <span className="text-purple-600 text-sm">
              (位值為9, <span className="text-red-600">上捨 → 必定進位</span>, 9 → 10)
            </span>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-blue-600 font-bold">b. 987.654</span>
            <span className="text-purple-600 text-sm">
              (位值為4, 後面的數是3, <span className="text-red-600">四捨 → 不用進位</span>)
            </span>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-blue-600 font-bold">c. 980</span>
            <span className="text-purple-600 text-sm">
              (位值為8, <span className="text-red-600">下捨 → 不需進位</span>, 小數點後的數字忽略)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== 主組件 ==========
export default function ApproximationQuiz() {
  // 模式選擇: null, 'learn', 'quiz'
  const [mode, setMode] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  
  const inputRef = useRef(null);

  // 生成新題目
  const generateNewQuestion = useCallback(() => {
    const q = generateQuestion();
    setCurrentQuestion(q);
    setUserAnswer('');
    setFeedback(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // 初始化
  useEffect(() => {
    if (mode === 'quiz') {
      generateNewQuestion();
    }
  }, [mode, generateNewQuestion]);

  // 檢查答案
  const checkAnswer = () => {
    if (!currentQuestion || !userAnswer.trim()) return;
    
    const userVal = parseFloat(userAnswer);
    const correctVal = currentQuestion.answer;
    
    // 比較數值（允許小誤差）
    const isCorrect = Math.abs(userVal - correctVal) < 0.0001;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback({ type: 'correct', message: '答對了！' });
    } else {
      const explanation = generateExplanation(
        currentQuestion.number,
        currentQuestion.method,
        currentQuestion.target,
        currentQuestion.answer
      );
      setFeedback({ 
        type: 'wrong', 
        message: '答錯了',
        correctAnswer: currentQuestion.displayAnswer,
        explanation
      });
    }
    setQuestionCount(c => c + 1);
  };

  // 下一題
  const nextQuestion = () => {
    generateNewQuestion();
  };

  // 重置
  const resetQuiz = () => {
    setScore(0);
    setQuestionCount(0);
    setFeedback(null);
    generateNewQuestion();
  };

  // 返回選單
  const backToMenu = () => {
    setMode(null);
    setScore(0);
    setQuestionCount(0);
    setFeedback(null);
    setCurrentQuestion(null);
    setUserAnswer('');
  };

  // 處理鍵盤輸入
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (feedback) {
        nextQuestion();
      } else {
        checkAnswer();
      }
    }
  };

  // ========== 模式選擇頁面 ==========
  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
        <Link 
          to="/" 
          className="fixed top-4 right-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
        >
          <HomeIcon size={18} />
          <span className="font-medium">首頁</span>
        </Link>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-lg mb-4">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">近似值</h1>
              <p className="text-slate-500">學習捨入方法與有效數字</p>
            </div>

            <div className="grid gap-4">
              <button
                onClick={() => setMode('learn')}
                className="group p-6 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-white"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold mb-1">學習模式</div>
                    <div className="text-sm opacity-80">查看筆記與範例</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setMode('quiz')}
                className="group p-6 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-white"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <PenTool className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold mb-1">測驗模式</div>
                    <div className="text-sm opacity-80">練習捨入計算</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== 學習模式 ==========
  if (mode === 'learn') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <button 
          onClick={backToMenu}
          className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
        >
          <ArrowRight size={18} className="rotate-180" />
          <span className="font-medium">返回選單</span>
        </button>

        <Link 
          to="/" 
          className="fixed top-4 right-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
        >
          <HomeIcon size={18} />
          <span className="font-medium">首頁</span>
        </Link>

        <div className="flex-1 flex justify-center pt-20 pb-8 px-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <BookOpen className="w-8 h-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-slate-800">近似值筆記</h1>
            </div>
            
            <NotesSection />

            <div className="mt-8 pt-6 border-t text-center">
              <button
                onClick={() => setMode('quiz')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto transition-all shadow-lg"
              >
                開始測驗 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== 測驗模式 ==========
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <button 
        onClick={backToMenu}
        className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
      >
        <ArrowRight size={18} className="rotate-180" />
        <span className="font-medium">返回選單</span>
      </button>

      <Link 
        to="/" 
        className="fixed top-4 right-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
      >
        <HomeIcon size={18} />
        <span className="font-medium">首頁</span>
      </Link>

      <div className="flex-1 flex justify-center pt-20 pb-8 px-4">
        <div className="w-full max-w-xl">
          {/* 分數顯示 */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-slate-600">分數：</span>
              <span className="text-2xl font-bold text-blue-600">{score}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">已完成: {questionCount} 題</span>
              <button
                onClick={() => setShowNotes(true)}
                className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-600"
                title="查看筆記"
              >
                <BookOpen size={20} />
              </button>
            </div>
          </div>

          {/* 題目區域 */}
          {currentQuestion && (
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="mb-2">
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-bold">題目</span>
              </div>
              <div className="text-center mb-8">
                <h2 className="text-xl text-slate-600 mb-4">將</h2>
                <div className="text-4xl font-bold text-slate-800 mb-4 font-mono">
                  {currentQuestion.number}
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-lg">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                    {currentQuestion.method}
                  </span>
                  <span>至</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                    {currentQuestion.target.label}
                  </span>
                </div>
              </div>

              {/* 答案輸入 */}
              <div className="mb-6">
                <label className="block text-sm text-slate-500 mb-2 text-center">你的答案：</label>
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="decimal"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={feedback !== null}
                  className={`w-full text-3xl font-mono text-center p-4 border-2 rounded-xl focus:outline-none transition-all
                    ${feedback?.type === 'correct' ? 'border-green-500 bg-green-50' : 
                      feedback?.type === 'wrong' ? 'border-red-500 bg-red-50' : 
                      'border-slate-300 focus:border-blue-500'}`}
                  placeholder="輸入答案"
                />
              </div>

              {/* 回饋區域 */}
              {feedback && (
                <div className={`p-4 rounded-xl mb-6 text-center ${
                  feedback.type === 'correct' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <div className={`flex items-center justify-center gap-2 text-lg font-bold ${
                    feedback.type === 'correct' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {feedback.type === 'correct' ? (
                      <>
                        <Check className="w-6 h-6" />
                        {feedback.message}
                      </>
                    ) : (
                      <>
                        <X className="w-6 h-6" />
                        {feedback.message}
                      </>
                    )}
                  </div>
                  {feedback.correctAnswer && (
                    <div className="mt-4 border-t border-slate-200 pt-4">
                      <div className="mb-2">
                        <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-md text-sm font-bold">正確答案</span>
                      </div>
                      <div className="text-slate-700 text-lg">
                        <span className="font-bold font-mono text-2xl">{feedback.correctAnswer}</span>
                      </div>
                      {feedback.explanation && (
                        <div className="mt-3 text-sm text-purple-700 bg-purple-50 px-3 py-2 rounded-lg whitespace-pre-line">
                          {feedback.explanation}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 按鈕區域 */}
              <div className="flex justify-center">
                {feedback ? (
                  <button
                    onClick={nextQuestion}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg"
                  >
                    下一題 <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg"
                  >
                    提交答案
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 筆記彈窗 */}
      {showNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                近似值筆記
              </h3>
              <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <NotesSection />
            </div>
            
            <div className="p-4 border-t bg-slate-50 text-center">
              <button 
                onClick={() => setShowNotes(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full transition-all shadow-md"
              >
                明白
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
