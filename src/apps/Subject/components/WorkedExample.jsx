import React, { useState } from 'react';
import { BookOpen, X, Lightbulb } from 'lucide-react';
import Latex from './Latex';

/**
 * WorkedExample - 顯示一個完整的解題步驟示範
 * @param {string} title - 例題標題
 * @param {Array} steps - 步驟數組，每個包含 { math, action, explain }
 */
const WorkedExample = ({ title, steps }) => {
  const [activeExplain, setActiveExplain] = useState(null);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
         <BookOpen size={20} className="text-blue-600"/>
         {title}
      </h3>
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-4 border-l-2 border-blue-100">
            <div className="flex items-center gap-3 flex-wrap">
               <div className="bg-gray-50 px-4 py-2 rounded-lg text-lg text-gray-800 font-serif border border-gray-100 shadow-sm min-w-[200px]">
                 <Latex>{step.math}</Latex>
               </div>
               
               {step.explain && (
                 <div className="relative">
                   <button 
                     onClick={() => setActiveExplain(activeExplain === idx ? null : idx)}
                     className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeExplain === idx ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                   >
                     {activeExplain === idx ? <X size={14}/> : <Lightbulb size={14}/>}
                     {step.action}
                   </button>
                   
                   {activeExplain === idx && (
                     <div className="absolute left-0 top-full mt-2 z-10 w-64 bg-amber-50 text-amber-900 text-sm p-3 rounded-xl shadow-lg border border-amber-100 animate-fade-in">
                       {step.explain}
                     </div>
                   )}
                 </div>
               )}
            </div>
            {idx < steps.length - 1 && (
               <div className="absolute left-[-5px] top-full mt-1 w-2 h-2 bg-blue-200 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkedExample;
