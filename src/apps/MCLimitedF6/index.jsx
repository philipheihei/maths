import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, BookOpen, Star } from 'lucide-react';

import HCFLCMNotes from './notes/HCFLCMNotes';
import BinaryNotes from './notes/BinaryNotes';
import VariationNotes from './notes/VariationNotes';
import ComplexNotes from './notes/ComplexNotes';
import FunctionGraphNotes from './notes/FunctionGraphNotes';
import SubstitutionNotes from './notes/SubstitutionNotes';

import { HCFLCMQuiz, TopicQuiz, FunctionGraphQuiz } from './QuizComponents';

import { generateBinaryQuestion } from './generators/binary';
import { generateVariationQuestion } from './generators/variation';
import { generateComplexQuestion } from './generators/complex';
import { generateSubstitutionQuestion } from './generators/substitution';

const TOPICS = [
  {
    id: 'substitution-method',
    title: '代數代入法',
    desc: 'MC 應試技巧：代入簡單數值快速判斷選項，涵蓋分式、指數、展開與不適用題型識別',
    icon: '📐',
    color: 'from-pink-500 to-rose-600',
    badges: [{ level: 'F6', chapter: 'MC', subject: '應試技巧' }],
  },
  {
    id: 'binary',
    title: '二進制轉換',
    desc: '二進制與十進制互轉、二進制算式求值、係數×2ⁿ+餘數分解，CASIO 50FHII BASE MODE 技巧',
    icon: '🔟',
    color: 'from-teal-500 to-cyan-600',
    badges: [{ level: 'F3', chapter: 'CH2', subject: '指數定律' }],
  },
  {
    id: 'hcf-lcm',
    title: '多項式的 H.C.F. 及 L.C.M.',
    desc: '最高公因式與最小公倍式，涵蓋純變量單項式、含係數單項式、可因式分解多項式及求第三式',
    icon: '📐',
    color: 'from-blue-500 to-indigo-600',
    badges: [{ level: 'F4', chapter: 'CH4', subject: '續多項式' }],
  },
  {
    id: 'variation',
    title: '變分常數',
    desc: '正變、反變、聯變：判斷哪個代數式必為常數，涵蓋整數次及平方根次正變',
    icon: '📊',
    color: 'from-amber-500 to-orange-600',
    badges: [{ level: 'F5', chapter: 'CH11', subject: '變分' }],
  },
  {
    id: 'complex',
    title: '複數 i',
    desc: 'i 的冪次循環、化簡含 i 的代數式、有理化分式、令式子為實數，DSE 歷屆題型',
    icon: '🔮',
    color: 'from-purple-500 to-violet-600',
    badges: [{ level: 'F4', chapter: 'CH1', subject: '數系' }],
  },
  {
    id: 'function-graph',
    title: '函數圖像',
    desc: 'y = ax²+bx+c 中 a、b、c 的意義：開口方向、y 截距、對稱軸公式',
    icon: '📈',
    color: 'from-orange-500 to-amber-600',
    badges: [{ level: 'F4', chapter: 'CH3', subject: '二次函數' }],
  },
];

const MCLimitedF6 = () => {
  const [view, setView] = useState('home'); // 'home' | 'quiz' | 'notes'
  const [activeTopic, setActiveTopic] = useState(null);

  if (view === 'quiz' && activeTopic) {
    if (activeTopic.id === 'substitution-method') return <TopicQuiz onBack={() => setView('home')} generateFn={generateSubstitutionQuestion} topicLabel="代數代入法" />;
    if (activeTopic.id === 'binary')         return <TopicQuiz onBack={() => setView('home')} generateFn={generateBinaryQuestion} topicLabel="二進制轉換" />;
    if (activeTopic.id === 'hcf-lcm')        return <HCFLCMQuiz onBack={() => setView('home')} />;
    if (activeTopic.id === 'variation')      return <TopicQuiz onBack={() => setView('home')} generateFn={generateVariationQuestion} topicLabel="變分常數" />;
    if (activeTopic.id === 'complex')        return <TopicQuiz onBack={() => setView('home')} generateFn={generateComplexQuestion} topicLabel="複數 i" />;
    if (activeTopic.id === 'function-graph') return <FunctionGraphQuiz onBack={() => setView('home')} />;
  }
  if (view === 'notes' && activeTopic) {
    if (activeTopic.id === 'substitution-method') return <SubstitutionNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'binary')         return <BinaryNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'hcf-lcm')        return <HCFLCMNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'variation')      return <VariationNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'complex')        return <ComplexNotes onBack={() => setView('home')} />;
    if (activeTopic.id === 'function-graph') return <FunctionGraphNotes onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white border-b border-slate-200 shadow-sm px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600">
          <HomeIcon className="w-5 h-5" />
          <span className="text-sm font-medium">主頁</span>
        </Link>
        <h1 className="text-slate-800 font-bold text-lg tracking-wide">DSE MC限定</h1>
        <div className="w-16" />
      </nav>

      <div className="text-center py-12 px-4">
        <div className="inline-block bg-yellow-100 border border-yellow-300 text-yellow-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
          ★ DSE 歷屆 MC 模擬練習
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">選擇題</h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          自動生成仿 DSE 風格選擇題，涵蓋課程重點。選擇以下主題開始練習或閱讀筆記。
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-16 grid gap-5">
        {TOPICS.map((topic) => (
          <div key={topic.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition shadow-sm">
            <div className={`bg-gradient-to-r ${topic.color} px-6 py-5 flex items-start gap-4`}>
              <span className="text-4xl">{topic.icon}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  {topic.badges.map((b, i) => (
                    <span key={i} className="bg-white/30 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {b.level} {b.chapter} {b.subject}
                    </span>
                  ))}
                </div>
                <h3 className="text-white font-bold text-xl">{topic.title}</h3>
                <p className="text-white/80 text-sm mt-1">{topic.desc}</p>
              </div>
            </div>

            <div className="px-6 py-4 flex gap-3 flex-wrap">
              {!topic.notesOnly && (
                <button
                  onClick={() => { setActiveTopic(topic); setView('quiz'); }}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition shadow">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  開始練習
                </button>
              )}
              <button
                onClick={() => { setActiveTopic(topic); setView('notes'); }}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl hover:bg-slate-200 transition">
                <BookOpen className="w-4 h-4" />
                查看筆記
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCLimitedF6;
