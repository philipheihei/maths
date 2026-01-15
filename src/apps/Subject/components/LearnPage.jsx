import React from 'react';
import { ArrowRight } from 'lucide-react';
import NotesSection from './NotesSection';
import WorkedExample from './WorkedExample';
import Latex from './Latex';

/**
 * LearnPage - 學習頁面，包含教學內容和範例
 * @param {Function} setTab - 切換到其他標籤的函數
 */
const LearnPage = ({ setTab }) => {
  const steps = [
    { num: 1, title: '乘 (Multiply)', desc: '消去分母', formula: '\\frac{A}{B} = C \\rightarrow A = BC', detail: '若有分數，利用交叉相乘或兩邊同乘分母。' },
    { num: 2, title: '拆 (Expand)', desc: '拆括號', formula: 'A(x+B) = C \\rightarrow Ax + AB = C', detail: '若有括號，將外面的數乘入括號內每一項。' },
    { num: 3, title: '移 (Move)', desc: '移項', formula: 'Ax + B = C \\rightarrow Ax = C - B', detail: '將含有主項(Subject)的項移至一邊，其他移至另一邊。緊記「過界變號」。' },
    { num: 4, title: '抽 (Factor)', desc: '提取公因式', formula: 'Ax + Bx = C \\rightarrow x(A+B) = C', detail: '若主項在多於一項出現，將主項抽出來，使其只出現一次。' },
    { num: 5, title: '除 (Divide)', desc: '除係數', formula: 'Ax = B \\rightarrow x = \\frac{B}{A}', detail: '將主項旁邊的係數或括號除到對面，令主項單獨存在。' },
  ];

  const example1 = [
    { math: '\\text{令 } y \\text{ 成為公式 } k = \\frac{3x - y}{y} \\text{ 的主項}', action: '題目', explain: '目標：找 y = ?' },
    { math: 'ky = 3x - y', action: '乘', explain: 'Step 1: 兩邊同乘 y (消去分母)' },
    { math: 'ky + y = 3x', action: '移', explain: 'Step 3: 將所有含 y 的項移到左邊 (移項)' },
    { math: 'y(k + 1) = 3x', action: '抽', explain: 'Step 4: 提取公因式 y (Factorize)' },
    { math: 'y = \\frac{3x}{k + 1}', action: '除', explain: 'Step 5: 將 (k+1) 除到對面' }
  ];

  const example2 = [
    { math: '\\text{令 } h \\text{ 成為公式 } \\frac{5}{h+k} = \\frac{k}{h-3} \\text{ 的主項}', action: '題目', explain: '目標：找 h = ?' },
    { math: '5(h-3) = k(h+k)', action: '乘', explain: 'Step 1: 交叉相乘 (Cross Multiply)' },
    { math: '5h - 15 = kh + k^2', action: '拆', explain: 'Step 2: 拆括號 (Expand)' },
    { math: '5h - kh = k^2 + 15', action: '移', explain: 'Step 3: 將有 h 的項移一邊，其他移另一邊' },
    { math: 'h(5 - k) = k^2 + 15', action: '抽', explain: 'Step 4: 提取公因式 h' },
    { math: 'h = \\frac{k^2 + 15}{5 - k}', action: '除', explain: 'Step 5: 將 (5-k) 除到對面' }
  ];

  return (
    <div className="p-4 pb-20 max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-2xl text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">主項變換五步曲</h1>
        <p className="opacity-90 text-lg">口訣：乘、拆、移、抽、除</p>
        <button 
          onClick={() => setTab('practice')} 
          className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          立即實戰 <ArrowRight size={18} />
        </button>
      </div>

      {/* NOTES SECTION */}
      <NotesSection />

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 px-2 border-l-4 border-blue-500">基本步驟 (The 5 Steps)</h2>
        <div className="grid gap-4">
          {steps.map((step) => (
            <div key={step.num} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex items-start gap-4">
              <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0 mt-1">
                {step.title[0]}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-800">{step.title}</h3>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Step {step.num}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{step.desc}</p>
                <div className="bg-gray-50 px-3 py-2 rounded border border-gray-100 text-sm overflow-x-auto">
                  <Latex>{step.formula}</Latex>
                </div>
                <p className="text-xs text-gray-400 mt-2">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 px-2 border-l-4 border-amber-500">實例示範 (Worked Examples)</h2>
        <p className="text-gray-500 text-sm px-2">點擊按鈕查看詳細解釋</p>
        
        <WorkedExample title="例題 1 (Example 1)" steps={example1} />
        <WorkedExample title="例題 2 (Example 2)" steps={example2} />
      </div>
    </div>
  );
};

export default LearnPage;
