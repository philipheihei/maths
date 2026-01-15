import React, { useState, useEffect } from 'react';
import { Calculator, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadKatexOnce } from '../../utils/katexLoader';
import LearnPage from './components/LearnPage';
import PracticePage from './components/PracticePage';

/**
 * Subject - 主項變換大師 (主應用組件)
 * 包含學習和練習兩個標籤頁
 */
const Subject = () => {
  const [tab, setTab] = useState('learn'); // 'learn' | 'practice'
  const [score, setScore] = useState(0);

  // Load KaTeX globally once on component mount
  useEffect(() => {
    loadKatexOnce();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <HomeIcon className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">返回主頁</span>
            </Link>
            <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
              <Calculator className="w-6 h-6" />
              <span>主項變換大師</span>
            </div>
            <div className="flex gap-2 items-center">
              <button 
                onClick={() => setTab('learn')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${tab === 'learn' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                學習 (Learn)
              </button>
              <button 
                onClick={() => setTab('practice')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${tab === 'practice' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                實戰 (Practice)
              </button>
              {tab === 'practice' && (
                <div className="bg-yellow-100 text-yellow-800 font-bold px-4 py-2 rounded-full text-sm">
                  分數: {score}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="p-4">
        {tab === 'learn' ? <LearnPage setTab={setTab} /> : <PracticePage score={score} setScore={setScore} />}
      </main>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-slide-up { animation: fade-in 0.5s ease-out forwards; }
        .animate-scale-in { animation: fade-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default Subject;
