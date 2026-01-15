import React from 'react';

/**
 * Keyboard - 虛擬數學鍵盤組件
 * @param {Function} onKeyPress - 按鍵回調函數
 * @param {Object} problem - 當前問題對象
 * @param {string} currentEquation - 當前方程式
 */
const Keyboard = ({ onKeyPress, problem, currentEquation }) => {
  const btnClass = "bg-white border border-gray-300 rounded-lg p-3 shadow-sm active:bg-blue-100 hover:bg-gray-50 text-lg font-medium flex justify-center items-center transition-colors select-none";
  
  // Extract variables from problem and current equation
  const allVars = ['x', 'y', 'a', 'b', 'h', 'k', 'm', 'n'];
  const usedVars = new Set();
  
  // Combine problem text and current equation for comprehensive variable extraction
  let extractionText = '';
  if (problem) {
    extractionText = problem.text + ' ' + problem.subject;
  }
  if (currentEquation) {
    extractionText += ' ' + currentEquation;
  }
  
  if (extractionText) {
    // Remove LaTeX commands to avoid false matches (e.g., 'a' in '\frac')
    const cleanText = extractionText
      .replace(/\\[a-zA-Z]+/g, '') // Remove LaTeX commands like \frac, \text, etc.
      .toLowerCase();
    
    // Split by non-letter characters to extract standalone variables
    const tokens = cleanText.split(/[^a-z]+/);
    allVars.forEach(v => {
      // Check if variable appears as a standalone token
      if (tokens.includes(v)) {
        usedVars.add(v);
      }
    });
  }
  
  // Build rows dynamically - max 4 variables
  const varRow = allVars.filter(v => usedVars.has(v)).slice(0, 4);
  
  const rows = [
    ['7', '8', '9', '/', 'DEL', 'AC'],
    ['4', '5', '6', '×', '(', ')'],
    ['1', '2', '3', '-', ...varRow.slice(0, 2)],
    ['0', '.', '=', '+', ...varRow.slice(2, 4)]
  ];

  return (
    <div className="grid grid-cols-6 gap-2 p-2 bg-gray-100 rounded-xl mt-4">
      {rows.map((row, rIdx) => (
        <React.Fragment key={rIdx}>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => {
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
              className={['DEL', 'AC'].includes(key) ? "bg-red-100 text-red-800 border-red-200" + btnClass.replace('bg-white', '') : btnClass}
            >
              {key === '/' ? (
                <span className="flex flex-col items-center text-xs leading-none">
                  <span>◻</span>
                  <span className="border-t border-gray-400 w-full"></span>
                  <span>◻</span>
                </span>
              ) : key}
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Keyboard;
