import React from 'react';

/**
 * Keyboard - 虛擬數學鍵盤組件
 * @param {Function} onKeyPress - 按鍵回調函數
 * @param {Object} problem - 當前問題對象
 * @param {string} currentEquation - 當前方程式
 */
const Keyboard = ({ onKeyPress, problem, currentEquation }) => {
  const btnClass = "bg-white border border-gray-300 rounded-lg p-3 shadow-sm active:bg-blue-100 hover:bg-gray-50 text-lg font-medium flex justify-center items-center transition-colors select-none";
  
  // All possible variables
  const allVars = ['x', 'y', 'a', 'b', 'h', 'k', 'm', 'n'];
  const usedVars = new Set();
  
  // Method 1: Use explicit allVariables from problem if available (most reliable)
  if (problem?.allVariables && Array.isArray(problem.allVariables)) {
    problem.allVariables.forEach(v => {
      if (allVars.includes(v)) {
        usedVars.add(v);
      }
    });
  }
  
  // Method 2: Always include subject
  if (problem?.subject && allVars.includes(problem.subject)) {
    usedVars.add(problem.subject);
  }
  
  // Method 3: Extract from text content as fallback
  const extractFromText = (text) => {
    if (!text) return;
    
    // Clean LaTeX commands but preserve variable letters
    let cleanText = text
      .replace(/\\frac/gi, ' ')
      .replace(/\\text\{[^}]*\}/gi, ' ')
      .replace(/\\[a-zA-Z]+/g, ' ') // Remove other LaTeX commands
      .replace(/[0-9+\-=*/(){}^,.\s\\]/g, ' ') // Remove non-letter chars
      .toLowerCase();
    
    // Find each variable
    allVars.forEach(v => {
      // Check if variable appears as standalone or adjacent to numbers
      const regex = new RegExp(`(^|[^a-z])${v}($|[^a-z])`, 'i');
      if (regex.test(cleanText) || cleanText.includes(v)) {
        usedVars.add(v);
      }
    });
  };
  
  // Extract from problem text
  if (problem?.text) {
    extractFromText(problem.text);
  }
  
  // Extract from current equation
  if (currentEquation) {
    extractFromText(currentEquation);
  }
  
  // Extract from all step equations
  if (problem?.steps) {
    ['step1Eq', 'step2Eq', 'step3Eq', 'step4Eq', 'step5Eq'].forEach(key => {
      if (problem.steps[key]) {
        extractFromText(problem.steps[key]);
      }
    });
  }
  
  // Build variable row - ensure we have up to 4 variables
  const varRow = allVars.filter(v => usedVars.has(v));
  
  // Pad with empty slots if less than 4 variables
  while (varRow.length < 4) {
    varRow.push(null);
  }
  
  const rows = [
    ['7', '8', '9', '/', 'DEL', 'AC'],
    ['4', '5', '6', '×', '(', ')'],
    ['1', '2', '3', '-', varRow[0], varRow[1]],
    ['0', '.', '=', '+', varRow[2], varRow[3]]
  ];

  return (
    <div className="grid grid-cols-6 gap-2 p-2 bg-gray-100 rounded-xl mt-4">
      {rows.map((row, rIdx) => (
        <React.Fragment key={rIdx}>
          {row.map((key, cIdx) => {
            const isEmptySlot = key === null;
            return (
              <button
                key={`${rIdx}-${cIdx}`}
                onClick={() => {
                  if (isEmptySlot) return;
                  if (key === '×') {
                    onKeyPress('*');
                  } else if (key === 'DEL') {
                    onKeyPress('DEL');
                  } else if (key === 'AC') {
                    onKeyPress('CLR');
                  } else {
                    onKeyPress(key);
                  }
                }}
                disabled={isEmptySlot}
                className={
                  isEmptySlot 
                    ? 'bg-gray-100 border-0 cursor-default opacity-0' 
                    : ['DEL', 'AC'].includes(key) 
                      ? "bg-red-100 text-red-800 border-red-200 " + btnClass.replace('bg-white', '') 
                      : btnClass
                }
              >
                {isEmptySlot ? '' : key === '/' ? (
                  <span className="flex flex-col items-center text-xs leading-none">
                    <span>◻</span>
                    <span className="border-t border-gray-400 w-full"></span>
                    <span>◻</span>
                  </span>
                ) : key}
              </button>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Keyboard;
