import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

// 在這裡貼上你原本的 AngleQuizApp 組件代碼
// 但需要做以下修改：

const AngleQuiz = () => {
  // ... (你原本的所有代碼)
  
  return (
    <>
      {/* 添加返回首頁按鈕 */}
      <Link 
        to="/" 
        className="fixed top-4 left-4 z-50 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-2 transition-all hover:shadow-lg"
      >
        <HomeIcon size={18} />
        <span className="font-medium">返回首頁</span>
      </Link>

      {/* 你原本的 AngleQuizApp UI */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans">
        {/* ... 原本的代碼 ... */}
      </div>
    </>
  );
};

export default AngleQuiz;
