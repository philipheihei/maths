import React, { useState, useEffect } from 'react';
import { RefreshCw, Check, X, Info, ArrowRight } from 'lucide-react';
import { generateProblem } from '../utils/problemGenerator';
import { toLatex, checkAnswer } from '../utils/mathHelpers';
import Latex from './Latex';
import Keyboard from './Keyboard';

/**
 * PracticePage - 練習頁面，包含互動式問題解答
 * @param {number} score - 當前分數
 * @param {Function} setScore - 設置分數的函數
 */
const PracticePage = ({ score, setScore }) => {
  const [problem, setProblem] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(1);
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);

  useEffect(() => {
    loadNewProblem();
  }, []);

  const loadNewProblem = () => {
    setProblem(generateProblem());
    setHistory([]);
    setCurrentQIndex(1);
    setInputVal("");
    setFeedback(null);
    setCompleted(false);
    setShowKeyboard(false);
    setScore(0);
    setIsAnswering(false);
  };

  const currentStepData = () => {
    if (!problem) return {};
    
    let stepData = {};
    switch (currentQIndex) {
      case 1: 
        stepData = { 
          q: "有分數嗎?", 
          affirmative: "有分數",
          check: problem.steps.hasFraction, 
          expected: problem.steps.step1Eq,
          hint: "請進行交叉相乘或去分母 (Multiply)"
        };
        break;
      case 2: 
        stepData = { 
          q: "有括號嗎?", 
          affirmative: "有括號",
          check: problem.steps.hasBracket, 
          expected: problem.steps.step2Eq,
          hint: "請拆括號 (Expand)"
        };
        break;
      case 3: 
        stepData = { 
          q: "需要移項嗎?", 
          affirmative: "需移項",
          check: problem.steps.hasMove, 
          expected: problem.steps.step3Eq,
          hint: `將主項 ${problem.subject} 移至一邊，其他移至另一邊`
        };
        break;
      case 4: 
        stepData = { 
          q: `有重複出現的主項 (${problem.subject}) 嗎?`, 
          affirmative: "有重複出現的主項",
          check: problem.steps.hasFactor, 
          expected: problem.steps.step4Eq,
          hint: "提取公因式 (Factorize)"
        };
        break;
      case 5: 
        stepData = { 
          q: `主項 (${problem.subject}) 旁邊有其他代數或數字嗎?`, 
          affirmative: `主項 (${problem.subject}) 旁邊有其他代數或數字`,
          check: problem.steps.hasDivide, 
          expected: problem.steps.step5Eq,
          hint: "除過對面 (Divide)"
        };
        break;
      default: 
        stepData = {};
    }
    
    // Debug log
    console.log(`Step ${currentQIndex}:`, stepData);
    
    return stepData;
  };

  const handleYesNo = (answer) => {
    // Prevent multiple rapid clicks
    if (isAnswering || feedback) return;
    setIsAnswering(true);
    
    const { check, expected } = currentStepData();
    const correct = (answer === (check ? 'yes' : 'no'));

    if (correct) {
      if (answer === 'yes') {
        setHistory(prev => [...prev, { step: currentQIndex, type: 'yesno', answer, correct: true, done: false }]);
        setShowKeyboard(true);
        setIsAnswering(false);
      } else {
        setHistory(prev => [...prev, { step: currentQIndex, type: 'yesno', answer, correct: true, done: true, equation: null }]); 
        setTimeout(() => {
          nextStep(expected);
          setIsAnswering(false);
        }, 500);
      }
    } else {
      if (check) {
        // User said No, but actually Yes
        let errorMsg = '不對，其實有！請填寫變換後的式子。';
        if (currentQIndex === 1) errorMsg = '錯，因為有分數，所以需要交叉相乘或去分母。';
        if (currentQIndex === 2) errorMsg = '錯，因為出現括號，所以需要展開。';
        if (currentQIndex === 3) errorMsg = '錯，其實需要移項。';
        if (currentQIndex === 4) errorMsg = '錯，其實有重複主項，需要提取公因式。';
        if (currentQIndex === 5) errorMsg = '錯，其實主項旁有其他代數或數字，需要除過對面。';

        setFeedback({ type: 'error', msg: errorMsg });
        setHistory(prev => [...prev, { step: currentQIndex, type: 'yesno', answer, correct: false, forced: true, done: false }]);
        setShowKeyboard(true);
        setIsAnswering(false);
      } else {
        // User said Yes, but actually No
        setFeedback({ type: 'error', msg: '不對，其實沒有。直接下一步。' });
        setHistory(prev => [...prev, { step: currentQIndex, type: 'yesno', answer, correct: false, forced: true, done: true }]);
        setTimeout(() => {
            setFeedback(null);
            nextStep(expected);
            setIsAnswering(false);
        }, 1500);
      }
    }
  };

  const handleEquationSubmit = () => {
    const { expected } = currentStepData();
    const isCorrect = checkAnswer(inputVal, expected, problem, currentQIndex);

    if (isCorrect) {
      setFeedback({ type: 'success', msg: '正確！' });
      setScore(prev => prev + 1);
      setHistory(prev => {
        const newHist = [...prev];
        newHist[newHist.length - 1].done = true;
        newHist[newHist.length - 1].equation = inputVal;
        return newHist;
      });
      setTimeout(() => {
        setFeedback(null);
        setInputVal("");
        setShowKeyboard(false);
        nextStep(expected);
      }, 1000);
    } else {
      setFeedback({ type: 'error', msg: `錯誤。正確應為: ${expected}` });
      setHistory(prev => {
        const newHist = [...prev];
        newHist[newHist.length - 1].done = true;
        newHist[newHist.length - 1].equation = expected; 
        newHist[newHist.length - 1].wasWrong = true;
        return newHist;
      });
      setTimeout(() => {
        setFeedback(null);
        setInputVal("");
        setShowKeyboard(false);
        nextStep(expected);
      }, 2500);
    }
  };

  const nextStep = (prevEquationResult) => {
    if (currentQIndex < 5) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const getCurrentEquation = () => {
    const completedSteps = history.filter(h => h.done);
    if (completedSteps.length === 0) return problem.text;
    const lastHist = completedSteps[completedSteps.length - 1];
    if (lastHist.equation) return lastHist.equation;
    
    const getEqForStep = (idx) => {
        if (idx === 0) return problem.text;
        const map = [null, problem.steps.step1Eq, problem.steps.step2Eq, problem.steps.step3Eq, problem.steps.step4Eq, problem.steps.step5Eq];
        return map[idx] || map[idx-1]; 
    };
    return getEqForStep(currentQIndex - 1);
  };

  if (!problem) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6 sticky top-4 z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Question</span>
            <h2 className="text-gray-500 mt-1 text-lg">
              令 <Latex>{problem.subject}</Latex> 成為公式 <Latex>{problem.text}</Latex> 的主項
            </h2>
          </div>
          <button onClick={loadNewProblem} className="text-gray-400 hover:text-blue-600 transition-colors">
            <RefreshCw size={20} />
          </button>
        </div>
        <div className="text-3xl font-serif text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
           <Latex block>{getCurrentEquation()}</Latex>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {history.map((h, idx) => (
          <div key={idx} className={`p-4 rounded-xl border ${h.wasWrong || (h.type === 'yesno' && !h.correct && h.forced) ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'} animate-fade-in`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${h.wasWrong ? 'bg-red-500' : 'bg-green-500'}`}>
                {h.step}
              </div>
              <span className="font-bold text-gray-700">
                {h.step === 1 && "乘 (Multiply)"}
                {h.step === 2 && "拆 (Expand)"}
                {h.step === 3 && "移 (Move)"}
                {h.step === 4 && "抽 (Factor)"}
                {h.step === 5 && "除 (Divide)"}
              </span>
            </div>
            {h.equation && (
               <div className="pl-9 text-lg text-gray-800">
                 <Latex>{h.equation.includes('\\') ? h.equation : toLatex(h.equation)}</Latex>
               </div>
            )}
            {!h.equation && h.done && (
               <div className="pl-9 text-sm text-gray-500 italic">無此步驟 (Skipped)</div>
            )}
          </div>
        ))}
      </div>

      {!completed && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 animate-slide-up">
           <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
             <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">{currentQIndex}</span>
             {showKeyboard ? currentStepData().affirmative : currentStepData().q}
           </h3>

           {!showKeyboard ? (
             <div className="flex gap-4">
               <button 
                 onClick={() => handleYesNo('yes')}
                 disabled={isAnswering || feedback}
                 className={`flex-1 font-bold py-3 rounded-xl transition-all shadow-md ${
                   isAnswering || feedback 
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                     : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                 }`}
               >
                 有 (Yes)
               </button>
               <button 
                 onClick={() => handleYesNo('no')}
                 disabled={isAnswering || feedback}
                 className={`flex-1 font-bold py-3 rounded-xl transition-all shadow-md ${
                   isAnswering || feedback 
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                     : 'bg-gray-100 hover:bg-gray-200 text-gray-700 active:scale-95'
                 }`}
               >
                 沒有 (No)
               </button>
             </div>
           ) : (
             <div className="space-y-4">
               <div className="text-sm text-blue-600 font-medium bg-blue-50 p-2 rounded">
                 <Info size={16} className="inline mr-1"/>
                 提示: {currentStepData().hint}
               </div>
               
               <div className="w-full bg-gray-50 border-2 border-blue-200 rounded-xl p-4 min-h-[60px] flex items-center text-xl relative focus-within:ring-2 ring-blue-400">
                 {inputVal ? <Latex>{toLatex(inputVal)}</Latex> : <span className="text-gray-400">點擊下方鍵盤輸入...</span>}
                 <div className="absolute right-3 top-3 animate-pulse w-0.5 h-6 bg-blue-500"></div>
               </div>

               <button 
                 onClick={handleEquationSubmit}
                 disabled={feedback || isAnswering}
                 className={`w-full font-bold py-3 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2 ${
                   feedback || isAnswering
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     : 'bg-green-600 hover:bg-green-700 text-white'
                 }`}
               >
                 確認 (Check) <Check size={20}/>
               </button>

               <Keyboard onKeyPress={(key) => {
                   if (key === 'CLR') setInputVal("");
                   else if (key === 'DEL') setInputVal(prev => prev.slice(0, -1));
                   else setInputVal(prev => prev + key);
               }} problem={problem} currentEquation={getCurrentEquation()} />
             </div>
           )}

           {feedback && (
             <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${feedback.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
               {feedback.type === 'error' ? <X size={20}/> : <Check size={20}/>}
               {feedback.msg}
             </div>
           )}
        </div>
      )}

      {completed && (
        <div className="bg-green-50 p-8 rounded-2xl text-center border border-green-200 animate-scale-in">
          <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg">
            <Check />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">完成！(Completed)</h2>
          <p className="text-green-700 mb-6">答案是 (Answer):</p>
          <div className="text-2xl mb-8 p-4 bg-white rounded-xl inline-block shadow-sm">
             <Latex>{problem.steps.step5Eq}</Latex>
          </div>
          <br/>
          <button 
            onClick={loadNewProblem}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            下一題 (Next Question) <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PracticePage;
