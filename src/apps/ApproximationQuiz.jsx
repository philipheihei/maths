import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { loadKatexOnce } from '../utils/katexLoader';
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
  
  // 第一行：分析（使用##標記位值數字以便後續高亮）
  explanation = `分析：${targetLabel} → 位值為##${positionDigit}##。\n`;
  
  // 第二行：捨入方法及結果
  if (method === '上捨入') {
    if (isDecimalPlace) {
      const nextValue = parseInt(positionDigit) + 1;
      explanation += `上捨入 ---> 必定進位至${nextValue}。\n`;
      explanation += `##${positionDigit}##之後的小數可以省略不寫。`;
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
      explanation += `##${positionDigit}##之後的小數可以省略不寫。`;
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
        explanation += `##${positionDigit}##之後的小數可以省略不寫。`;
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
        explanation += `##${positionDigit}##之後的小數可以省略不寫。`;
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
  
  // 找出位值的位置（用於高亮顯示）
  let targetDigitIndex = -1;
  let answerDigitIndex = -1;
  const numStr = num.toString();
  const answerStr = formatResult(answer, target);
  
  if (target.type === 'decimal') {
    const parts = numStr.split('.');
    if (parts[1]) {
      // 小數點位置 + 目標小數位
      targetDigitIndex = parts[0].length + 1 + (target.value - 1);
      // 答案中的位置相同
      answerDigitIndex = targetDigitIndex;
    }
  } else if (target.type === 'integer') {
    // 個位：整數部分最後一位
    const intPart = Math.floor(Math.abs(num)).toString();
    targetDigitIndex = intPart.length - 1;
    // 答案中的個位
    const ansIntPart = Math.floor(Math.abs(answer)).toString();
    answerDigitIndex = ansIntPart.length - 1;
  } else if (target.type === 'tens') {
    // 十位：整數部分倒數第二位
    const intPart = Math.floor(Math.abs(num)).toString();
    targetDigitIndex = intPart.length - 2;
    // 答案中的十位
    const ansIntPart = Math.floor(Math.abs(answer)).toString();
    answerDigitIndex = ansIntPart.length - 2;
  } else if (target.type === 'hundreds') {
    // 百位：整數部分倒數第三位
    const intPart = Math.floor(Math.abs(num)).toString();
    targetDigitIndex = intPart.length - 3;
    // 答案中的百位
    const ansIntPart = Math.floor(Math.abs(answer)).toString();
    answerDigitIndex = ansIntPart.length - 3;
  } else if (target.type === 'sig') {
    // 有效數字：找出第n位有效數字
    const cleanStr = numStr.replace('.', '');
    const firstNonZero = cleanStr.search(/[1-9]/);
    if (firstNonZero !== -1) {
      // 計算在原始字符串中的位置
      const decimalPos = numStr.indexOf('.');
      let count = 0;
      for (let i = 0; i < numStr.length; i++) {
        const char = numStr[i];
        if (char !== '.' && char !== '0') {
          count++;
          if (count === target.value) {
            targetDigitIndex = i;
            break;
          }
        } else if (char === '0' && count > 0) {
          count++;
          if (count === target.value) {
            targetDigitIndex = i;
            break;
          }
        }
      }
      
      // 答案中的位置
      const ansCleanStr = answerStr.replace('.', '');
      const ansFirstNonZero = ansCleanStr.search(/[1-9]/);
      if (ansFirstNonZero !== -1) {
        let ansCount = 0;
        for (let i = 0; i < answerStr.length; i++) {
          const char = answerStr[i];
          if (char !== '.' && char !== '0') {
            ansCount++;
            if (ansCount === target.value) {
              answerDigitIndex = i;
              break;
            }
          } else if (char === '0' && ansCount > 0) {
            ansCount++;
            if (ansCount === target.value) {
              answerDigitIndex = i;
              break;
            }
          }
        }
      }
    }
  }
  
  return {
    number: num,
    method,
    target,
    answer,
    displayAnswer: formatResult(answer, target),
    targetDigitIndex,
    answerDigitIndex
  };
};

// ========== 輔助函數：渲染帶高亮的數字 ==========
const renderHighlightedNumber = (numStr, highlightIndex) => {
  if (highlightIndex === -1) {
    return <span>{numStr}</span>;
  }
  
  const chars = numStr.split('');
  return (
    <span>
      {chars.map((char, idx) => (
        <span
          key={idx}
          className={idx === highlightIndex ? 'bg-yellow-300 px-1 rounded' : ''}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

// 渲染帶高亮標記的解釋文本
const renderHighlightedText = (text) => {
  const parts = text.split('##');
  return parts.map((part, idx) => {
    // 奇數索引的是需要高亮的部分
    if (idx % 2 === 1) {
      return (
        <span key={idx} className="bg-yellow-300 px-1 rounded font-bold">
          {part}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
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
        <div className="text-lg flex items-center gap-2">
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
        
        <div className="text-lg flex items-center gap-2">
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
        
        <div className="text-lg flex items-center gap-2">
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
              <span>45.1 → <b>46</b></span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xs">(4捨5入)</span>
              <span className="text-blue-600 font-bold w-12">捨入</span>
              <span>45.1 → <b>45</b></span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xs">(不需進位)</span>
              <span className="text-blue-600 font-bold w-12">下捨</span>
              <span>45.9 → <b>45</b></span>
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
        <span className="text-black-600 font-bold text-lg">題目示例</span>
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
              (位值為8, <span className="text-red-600">下捨 → 不需進位</span>, 8後的整數部份要補上0，小數點後的數字忽略)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== MC 題目生成器 ==========

// 類型1：給定捨入值，求x的範圍
const generateRangeQuestion = () => {
  // 題型A: n位小數捨入值
  // 題型B: n位有效數字捨入值
  // 題型C: 給定範圍，哪個說法正確
  const typeRoll = Math.random();
  
  if (typeRoll < 0.5) {
    // 類型A: x = V (準確至n位小數)，求x的範圍
    const dpChoices = [1, 2, 3];
    const dp = dpChoices[Math.floor(Math.random() * dpChoices.length)];
    // 生成一個有dp位小數的值
    const base = (Math.floor(Math.random() * 900) + 100) / Math.pow(10, dp - 1);
    const v = parseFloat(base.toFixed(dp));
    const half = 0.5 / Math.pow(10, dp);
    const lower = parseFloat((v - half).toPrecision(15));
    const upper = parseFloat((v + half).toPrecision(15));
    const lowerStr = lower.toFixed(dp + 1);
    const upperStr = upper.toFixed(dp + 1);
    const vStr = v.toFixed(dp);

    const correct = { lower, upper, lowerInc: true, upperExc: true }; // lower ≤ x < upper
    // 4 choices
    const opts = [
      { label: `${(v - half).toFixed(dp + 1)} < x ≤ ${vStr}`, lowerInc: false, upperExc: false },
      { label: `${lowerStr} ≤ x < ${upperStr}`, lowerInc: true, upperExc: true, isCorrect: true },
      { label: `${(v - half).toFixed(dp + 1)} < x < ${upperStr}`, lowerInc: false, upperExc: true },
      { label: `${lowerStr} ≤ x ≤ ${upperStr}`, lowerInc: true, upperExc: false },
    ];
    // shuffle
    const shuffled = opts.sort(() => Math.random() - 0.5);
    const correctIdx = shuffled.findIndex(o => o.isCorrect);

    const dpLabel = ['一', '二', '三'][dp - 1];
    const explanation = buildRangeExplanation(vStr, dp, 'decimal', lowerStr, upperStr);
    return {
      mcType: 'range',
      question: `若 x = ${vStr}（準確至${dpLabel}位小數），求 x 值的範圍。`,
      options: shuffled.map(o => o.label),
      correctIndex: correctIdx,
      explanation,
    };
  } else if (typeRoll < 0.85) {
    // 類型B: x = V (準確至n位有效數字)，求x的範圍
    const sfChoices = [2, 3];
    const sf = sfChoices[Math.floor(Math.random() * sfChoices.length)];
    // 生成一個sf位有效數字的值
    // 整數部分1-3位
    const intDigits = Math.floor(Math.random() * 3) + 1;
    const multiplier = Math.pow(10, intDigits - 1);
    const rawInt = Math.floor(Math.random() * 9 * multiplier) + multiplier;
    // sf位有效數字：rawInt有intDigits位，如果sf > intDigits then need decimals
    let v, lowerStr, upperStr;
    if (sf <= intDigits) {
      // e.g. sf=2, intDigits=3 → 123 rounds to 120 range
      const factor = Math.pow(10, intDigits - sf);
      const rounded = Math.round(rawInt / factor) * factor;
      const half = factor / 2;
      v = rounded;
      lowerStr = String(rounded - half);
      upperStr = String(rounded + half);
    } else {
      // sf > intDigits: need decimals, e.g. sf=3, intDigits=2 → 73.8
      const dp = sf - intDigits;
      const factor = Math.pow(10, dp);
      const rawWithDec = rawInt + Math.floor(Math.random() * 9 * factor + factor) / (factor * 10);
      v = parseFloat(rawWithDec.toFixed(dp));
      const half = 0.5 / factor;
      lowerStr = (v - half).toFixed(dp + 1);
      upperStr = (v + half).toFixed(dp + 1);
    }
    const vStr = typeof v === 'number' && !Number.isInteger(v) ? v.toString() : v.toString();

    const opts4 = [
      { label: `${lowerStr} ≤ x < ${upperStr}`, isCorrect: true },
      { label: `${lowerStr} < x ≤ ${upperStr}`, isCorrect: false },
      { label: `${lowerStr} < x < ${upperStr}`, isCorrect: false },
      { label: `${lowerStr} ≤ x ≤ ${upperStr}`, isCorrect: false },
    ].sort(() => Math.random() - 0.5);
    const correctIdx = opts4.findIndex(o => o.isCorrect);
    const sfLabel = ['一', '二', '三'][sf - 1];
    const explanation = buildRangeExplanation(vStr, sf, 'sig', lowerStr, upperStr);
    return {
      mcType: 'range',
      question: `若 x = ${vStr}（準確至${sfLabel}位有效數字），求 x 值的範圍。`,
      options: opts4.map(o => o.label),
      correctIndex: correctIdx,
      explanation,
    };
  } else {
    // 類型C: 給定範圍，哪個是正確的捨入說法
    // 生成如 0.06557 < x < 0.06564 → x = 0.0656 (3 sf)
    const templates = [
      { lo: 0.06557, hi: 0.06564, correct: 'x = 0.0656（準確至三位有效數字）', wrongs: ['x = 0.065（準確至二位小數）', 'x = 0.065（準確至二位有效數字）', 'x = 0.0656（準確至三位小數）'], explanation: '若 0.06557 < x < 0.06564，則 x 捨入至三位有效數字後為 0.0656。\n\n• 三位有效數字 0.0656：範圍為 0.06555 ≤ x < 0.06565，包含該區間 ✓\n• 二位小數 0.065：範圍為 0.065 ≤ x < 0.075，範圍太大 ✗\n• 二位有效數字 0.065：範圍為 0.0645 ≤ x < 0.0655，不包含該區間 ✗\n• 三位小數 0.0656：範圍為 0.0656 ≤ x < 0.0657，不包含 0.06557 ✗' },
    ];
    const t = templates[0];
    const opts = [t.correct, ...t.wrongs].sort(() => Math.random() - 0.5);
    return {
      mcType: 'range',
      question: `若 ${t.lo} < x < ${t.hi}，則下列何者正確？`,
      options: opts,
      correctIndex: opts.indexOf(t.correct),
      explanation: t.explanation,
    };
  }
};

// 類型2：計算並捨入
const generateRoundingMCQuestion = () => {
  // 直接給算式或數字，選出正確捨入答案
  // 選4個不同準確度的捨入，只有一個是題目問的
  const toSuperscript = (value) => {
    const map = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    return String(value).split('').map((ch) => map[ch] || ch).join('');
  };

  const roundToDp = (num, dp) => {
    const factor = Math.pow(10, dp);
    return Math.round(num * factor) / factor;
  };

  const truncateToDp = (num, dp) => {
    const factor = Math.pow(10, dp);
    return Math.floor(num * factor) / factor;
  };

  const roundToSf = (num, sf) => {
    if (num === 0) return 0;
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const factor = Math.pow(10, magnitude - sf + 1);
    return Math.round(num / factor) * factor;
  };

  const truncateToSf = (num, sf) => {
    if (num === 0) return 0;
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const factor = Math.pow(10, magnitude - sf + 1);
    return Math.floor(num / factor) * factor;
  };

  const formatSf = (num, sf) => {
    if (num === 0) return '0';
    return Number(num.toPrecision(sf)).toString();
  };

  const buildOption = (raw, cfg, isCorrect) => {
    let correctVal;
    let wrongVal;
    let valueText;

    if (cfg.kind === 'int') {
      correctVal = Math.round(raw);
      wrongVal = Math.floor(raw);
      if (wrongVal === correctVal) wrongVal = correctVal + 1;
      valueText = String(isCorrect ? correctVal : wrongVal);
    } else if (cfg.kind === 'dp') {
      const unit = Math.pow(10, -cfg.value);
      correctVal = roundToDp(raw, cfg.value);
      wrongVal = truncateToDp(raw, cfg.value);
      if (Math.abs(wrongVal - correctVal) < unit / 10) wrongVal = correctVal + unit;
      valueText = (isCorrect ? correctVal : wrongVal).toFixed(cfg.value);
    } else {
      const magnitude = raw === 0 ? 0 : Math.floor(Math.log10(Math.abs(raw)));
      const unit = Math.pow(10, magnitude - cfg.value + 1);
      correctVal = roundToSf(raw, cfg.value);
      wrongVal = truncateToSf(raw, cfg.value);
      if (Math.abs(wrongVal - correctVal) < Math.abs(unit) / 10) wrongVal = correctVal + unit;
      valueText = formatSf(isCorrect ? correctVal : wrongVal, cfg.value);
    }

    return {
      label: `${valueText}（準確至${cfg.label}）`,
      isCorrect,
      precisionLabel: cfg.label,
      correctText: cfg.kind === 'int'
        ? String(Math.round(raw))
        : cfg.kind === 'dp'
          ? roundToDp(raw, cfg.value).toFixed(cfg.value)
          : formatSf(roundToSf(raw, cfg.value), cfg.value),
      shownText: valueText,
    };
  };

  const buildCalculationQuestion = ({ expressionText, expressionLatex, raw, optionConfigs }) => {
    const correctCfg = optionConfigs[Math.floor(Math.random() * optionConfigs.length)];
    const opts = optionConfigs.map((cfg) => buildOption(raw, cfg, cfg.key === correctCfg.key));
    const shuffled = [...opts].sort(() => Math.random() - 0.5);
    const correctIndex = shuffled.findIndex((o) => o.isCorrect);
    const explanationLines = shuffled.map((o) => (
      o.isCorrect
        ? `• ${o.label}：符合${o.precisionLabel}的捨入結果 ✓`
        : `• ${o.label}：此準確度應為 ${o.correctText}，不是 ${o.shownText} ✗`
    ));

    return {
      mcType: 'calculation',
      question: `${expressionText} =`,
      questionLatex: `${expressionLatex} =`,
      options: shuffled.map((o) => o.label),
      correctIndex,
      explanation: `${expressionText} ≈ ${raw.toFixed(8)}…\n\n${explanationLines.join('\n')}`,
    };
  };
  
  const templates = [
    // surd 題：√n（n 隨機）
    () => {
      const radicands = [347, 389, 421, 514, 587, 733, 915, 947];
      const n = radicands[Math.floor(Math.random() * radicands.length)];
      const raw = Math.sqrt(n);
      return buildCalculationQuestion({
        expressionText: `√${n}`,
        expressionLatex: `\\sqrt{${n}}`,
        raw,
        optionConfigs: [
          { key: 'int', kind: 'int', label: '最接近的整數' },
          { key: 'dp2', kind: 'dp', value: 2, label: '二位小數' },
          { key: 'sf3', kind: 'sf', value: 3, label: '三位有效數字' },
          { key: 'dp4', kind: 'dp', value: 4, label: '四位小數' },
        ],
      });
    },
    // pi 題：a/π^n（a, n 隨機）
    () => {
      const variants = [
        { coef: 1, power: 3 },
        { coef: 2, power: 3 },
        { coef: 2, power: 4 },
        { coef: 3, power: 4 },
        { coef: 1, power: 5 },
        { coef: 3, power: 5 },
      ];
      const pick = variants[Math.floor(Math.random() * variants.length)];
      const raw = pick.coef / Math.pow(Math.PI, pick.power);
      const superscriptPower = toSuperscript(pick.power);
      return buildCalculationQuestion({
        expressionText: `${pick.coef}/π${superscriptPower}`,
        expressionLatex: `\\dfrac{${pick.coef}}{\\pi^${pick.power}}`,
        raw,
        optionConfigs: [
          { key: 'sf3', kind: 'sf', value: 3, label: '三位有效數字' },
          { key: 'sf4', kind: 'sf', value: 4, label: '四位有效數字' },
          { key: 'dp5', kind: 'dp', value: 5, label: '五位小數' },
          { key: 'dp6', kind: 'dp', value: 6, label: '六位小數' },
        ],
      });
    },
  ];

  // Generic: random number with specific rounding
  const generateGenericMC = () => {
    // Generate a number like 0.0765403 style
    const presets = [
      { num: 0.0765403, opts: [
        { label: '0.076（準確至二位有效數字）', isCorrect: false, exp: '0.076 是二位有效數字，但 0.0765 的二位有效數字是 0.077（第三位是6，五入）' },
        { label: '0.0765（準確至三位小數）', isCorrect: false, exp: '0.0765 是三位小數，但 0.0765403 準確至三位小數是 0.077（第四位是5，五入）' },
        { label: '0.07654（準確至四位有效數字）', isCorrect: true, exp: '0.0765403 → 四位有效數字：7,6,5,4 → 下一位是0，四捨 → 0.07654 ✓' },
        { label: '0.076540（準確至五位小數）', isCorrect: false, exp: '0.076540 是五位小數（0.07654），但第六位是0，四捨，所以準確至五位小數是 0.07654，尾巴0省略也可，但選項 0.076540 和 0.07654 相等，不可能同時作為不同答案，需核查選項' },
      ]},
      { num: 0.0322515, opts: [
        { label: '0.032（準確至三位有效數字）', isCorrect: false, exp: '三位有效數字 3,2,2 → 下一位5，五入 → 0.0323，不是 0.032' },
        { label: '0.0322（準確至四位小數）', isCorrect: false, exp: '0.0322515 準確至四位小數，第四位是2，下一位是5，五入 → 0.0323' },
        { label: '0.03225（準確至五位有效數字）', isCorrect: true, exp: '五位有效數字 3,2,2,5,1 → 下一位是5，五入 → 0.032252，不對！重新計算：五位有效數字 3,2,2,2,5 → 下一位是1，四捨 → 0.03225 ✓' },
        { label: '0.032252（準確至六位小數）', isCorrect: false, exp: '0.0322515 準確至六位小數，第六位是1，下一位是5，五入 → 0.032252，不是 0.032252（實際第七位才決定第六位是否進位）' },
      ]},
    ];
    const preset = presets[Math.floor(Math.random() * presets.length)];
    const shuffled = [...preset.opts].sort(() => Math.random() - 0.5);
    const exp = `${preset.num} =\n\n` + shuffled.map(o => `• ${o.label}：${o.exp}`).join('\n');
    return {
      mcType: 'calculation',
      question: `${preset.num} =`,
      options: shuffled.map(o => o.label),
      correctIndex: shuffled.findIndex(o => o.isCorrect),
      explanation: exp,
    };
  };

  const roll = Math.random();
  if (roll < 0.3) return templates[0]();
  if (roll < 0.5) return templates[1]();
  return generateGenericMC();
};

// 主MC生成器：按「過去題型」隨機生成
const generateMCQuestion = () => {
  const roll = Math.random();
  if (roll < 0.6) return generateRangeQuestion();
  return generateRoundingMCQuestion();
};

// 建立範圍解釋
const buildRangeExplanation = (vStr, precision, precType, lowerStr, upperStr) => {
  const vNum = parseFloat(vStr);
  const halfNum = precType === 'decimal'
    ? 0.5 / Math.pow(10, precision)
    : (() => {
        const mag = Math.floor(Math.log10(Math.abs(vNum)));
        return Math.pow(10, mag - precision + 1) / 2;
      })();
  const half = precType === 'decimal'
    ? `0.${'0'.repeat(precision - 1)}5`
    : halfNum.toString();
  const nextValueNum = vNum + 2 * halfNum;
  const nextValueStr = precType === 'decimal'
    ? nextValueNum.toFixed(precision)
    : (() => {
        const mag = Math.floor(Math.log10(Math.abs(vNum)));
        const factor = Math.pow(10, mag - precision + 1);
        return String(Math.round(nextValueNum / factor) * factor);
      })();
  const precLabel = precType === 'decimal'
    ? ['一', '二', '三'][precision - 1] + '位小數'
    : ['一', '二', '三'][precision - 1] + '位有效數字';
  return (
    `準確至${precLabel}的捨入，誤差範圍為 ±${half}。\n\n` +
    `下限：${vStr} − ${half} = ${lowerStr}（包含，≤）\n` +
    `上限：${vStr} + ${half} = ${upperStr}（不包含，<）\n\n` +
    `原因：若 x = ${upperStr} 準確至${precLabel}，捨入後會是 ${nextValueStr}，並非 ${vStr}，所以只能（<）不能（≤）。\n` +
    `而下限 ${lowerStr} 捨入後恰好等於 ${vStr}，所以包含（≤）。\n\n` +
    `∴ ${lowerStr} ≤ x < ${upperStr}`
  );
};

// ========== 主組件 ==========
export default function ApproximationQuiz() {
  // 模式選擇: null, 'learn', 'quiz', 'mc'
  const [mode, setMode] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  // MC mode state
  const [mcQuestion, setMcQuestion] = useState(null);
  const [mcScore, setMcScore] = useState(0);
  const [mcCount, setMcCount] = useState(0);
  const [mcSelected, setMcSelected] = useState(null);
  const [mcAnswered, setMcAnswered] = useState(false);
  const [katexReady, setKatexReady] = useState(false);
  
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
    setMcQuestion(null);
    setMcScore(0);
    setMcCount(0);
    setMcSelected(null);
    setMcAnswered(false);
  };

  // MC 生成新題目
  const generateNewMCQuestion = () => {
    setMcQuestion(generateMCQuestion());
    setMcSelected(null);
    setMcAnswered(false);
  };

  // MC 選擇答案
  const handleMCSelect = (idx) => {
    if (mcAnswered) return;
    setMcSelected(idx);
    setMcAnswered(true);
    if (idx === mcQuestion.correctIndex) {
      setMcScore(s => s + 1);
    }
    setMcCount(c => c + 1);
  };

  // KaTeX 加載
  useEffect(() => {
    loadKatexOnce().then(() => setKatexReady(true)).catch(() => {});
  }, []);

  // MC 模式初始化
  useEffect(() => {
    if (mode === 'mc') {
      generateNewMCQuestion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

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
                    <div className="text-xl font-bold mb-1">測驗模式（長答）</div>
                    <div className="text-sm opacity-80">練習捨入計算</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setMode('mc')}
                className="group p-6 bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-white"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold mb-1">MC 訓練</div>
                    <div className="text-sm opacity-80">多項選擇題練習（附解釋）</div>
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

  // ========== MC 訓練模式 ==========
  if (mode === 'mc') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 flex flex-col">
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
                <span className="text-slate-600">MC 分數：</span>
                <span className="text-2xl font-bold text-purple-600">{mcScore}</span>
              </div>
              <span className="text-sm text-slate-500">已完成：{mcCount} 題</span>
            </div>

            {/* MC 題目卡 */}
            {mcQuestion && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="mb-4">
                  <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-bold">MC 題目</span>
                </div>

                {/* 題目文字 */}
                <div className="text-xl font-bold text-slate-800 mb-6 text-center leading-relaxed">
                  {mcQuestion.questionLatex && katexReady
                    ? <span dangerouslySetInnerHTML={{ __html: window.katex.renderToString(mcQuestion.questionLatex, { throwOnError: false, displayMode: true }) }} />
                    : mcQuestion.question
                  }
                </div>

                {/* 選項 */}
                <div className="mb-6 border border-slate-200 rounded-xl overflow-hidden">
                  {mcQuestion.options.map((opt, idx) => {
                    const label = ['A', 'B', 'C', 'D'][idx];
                    const isCorrect = idx === mcQuestion.correctIndex;
                    const isSelected = idx === mcSelected;
                    let rowClass = 'w-full text-left flex items-center transition-all border-b last:border-b-0 border-slate-200 ';
                    if (!mcAnswered) {
                      rowClass += 'hover:bg-purple-50 cursor-pointer';
                    } else if (isCorrect) {
                      rowClass += 'bg-green-50';
                    } else if (isSelected && !isCorrect) {
                      rowClass += 'bg-red-50';
                    } else {
                      rowClass += 'bg-white opacity-60';
                    }
                    return (
                      <button key={idx} className={rowClass} onClick={() => handleMCSelect(idx)} disabled={mcAnswered}>
                        <span className={`flex-shrink-0 w-12 self-stretch flex items-center justify-center font-bold text-base border-r border-slate-200
                          ${!mcAnswered ? 'text-purple-700 bg-purple-50' :
                            isCorrect ? 'bg-green-500 text-white border-green-500' :
                            isSelected ? 'bg-red-400 text-white border-red-400' : 'text-slate-400 bg-slate-50'}`}>
                          {label}.
                        </span>
                        <span className="flex-1 px-4 py-3 text-slate-700 text-left">{opt}</span>
                        {mcAnswered && isCorrect && <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />}
                        {mcAnswered && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* 解釋區域 */}
                {mcAnswered && (
                  <div className={`rounded-xl p-4 mb-6 ${mcSelected === mcQuestion.correctIndex ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                    <div className={`font-bold mb-2 flex items-center gap-2 ${mcSelected === mcQuestion.correctIndex ? 'text-green-700' : 'text-amber-700'}`}>
                      {mcSelected === mcQuestion.correctIndex
                        ? <><Check className="w-5 h-5" /> 答對了！</>
                        : <><X className="w-5 h-5" /> 答錯了，正確答案為 {['A', 'B', 'C', 'D'][mcQuestion.correctIndex]}</>
                      }
                    </div>
                    <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-white rounded-lg p-3 border border-slate-200">
                      <span className="font-bold text-purple-700">解釋：</span>
                      <br />
                      {mcQuestion.explanation}
                    </div>
                  </div>
                )}

                {/* 按鈕 */}
                <div className="flex justify-center gap-3">
                  {mcAnswered ? (
                    <button
                      onClick={generateNewMCQuestion}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg"
                    >
                      下一題 <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <p className="text-slate-400 text-sm py-3">請選擇一個答案</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ========== 測驗模式（長答）==========
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
                <div className="text-4xl font-bold text-slate-800 mb-4">
                  {feedback 
                    ? renderHighlightedNumber(currentQuestion.number.toString(), currentQuestion.targetDigitIndex)
                    : currentQuestion.number
                  }
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
                  className={`w-full text-3xl text-center p-4 border-2 rounded-xl focus:outline-none transition-all
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
                        <span className="font-bold text-2xl">
                          {renderHighlightedNumber(feedback.correctAnswer, currentQuestion.answerDigitIndex)}
                        </span>
                      </div>
                      {feedback.explanation && (
                        <div className="mt-3 text-sm text-purple-700 bg-purple-50 px-3 py-2 rounded-lg whitespace-pre-line">
                          {renderHighlightedText(feedback.explanation)}
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
