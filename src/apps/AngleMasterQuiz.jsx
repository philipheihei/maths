import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Pen, Eraser, Trash2, Home as HomeIcon, Lightbulb, BookOpen, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import AngleArc from '../components/AngleArc';
import { questionsF1 } from './data/angleMaster_F1';
import { questionsF2 } from './data/angleMaster_F2';
import { questionsF3 } from './data/angleMaster_F3';
import { questionsSenior } from './data/angleMaster_Senior';

const QUESTIONS = {
  'F1': questionsF1,
  'F2': questionsF2,
  'F3': questionsF3,
  'Senior': questionsSenior
};

export default function AngleMasterQuiz() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedDiffs, setSelectedDiffs] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [drawMode, setDrawMode] = useState('pen');
  const [penColor, setPenColor] = useState('rgba(220,50,50,0.85)');
  const [showHint, setShowHint] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const ADMIN_PW = '1234';

  const handleAdminLogin = () => {
    const pw = window.prompt('Admin 密碼：');
    if (pw === ADMIN_PW) setShowAdmin(true);
    else if (pw !== null) window.alert('密碼錯誤！');
  };
  
  const canvasRef = useRef(null);

  useEffect(() => {
    if (currentScreen !== 'question') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    const ctx = canvas.getContext('2d');

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const handleStart = (e) => {
      e.preventDefault();
      isDrawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
    };

    const handleMove = (e) => {
      e.preventDefault();
      if (!isDrawing) return;
      const pos = getPos(e);
      
      if (drawMode === 'pen') {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = penColor;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      } else if (drawMode === 'eraser') {
        ctx.clearRect(pos.x - 30, pos.y - 30, 60, 60);
      }
      lastX = pos.x;
      lastY = pos.y;
    };

    const handleEnd = (e) => {
      e.preventDefault();
      isDrawing = false;
    };

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd, { passive: false });
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('mouseleave', handleEnd);
    };
  }, [currentScreen, drawMode, penColor]);

  const handleStartMixed = () => {
    let pool = [];
    Object.keys(QUESTIONS).forEach(level => {
      if (selectedLevels.includes(level)) {
        pool = pool.concat(QUESTIONS[level].filter(q => selectedDiffs.includes(q.difficulty)));
      }
    });
    
    if (pool.length === 0) {
      alert('請至少選擇一個級別和難度！');
      return;
    }
    
    // Shuffle the pool to mix questions
    pool.sort(() => Math.random() - 0.5);
    
    setActiveQuestions(pool);
    setCurrentQuestionIndex(0);
    setCurrentScreen('question');
    setUserAnswer('');
    setIsSubmitted(false);
    setDrawMode('pen');
    setShowHint(false);
    setShowColorPicker(false);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % activeQuestions.length);
    setUserAnswer('');
    setIsSubmitted(false);
    setDrawMode('pen');
    setShowHint(false);
    setShowColorPicker(false);
    clearCanvas();
  };

  const handleSubmit = () => {
    if (!userAnswer) return;
    setIsSubmitted(true);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Admin Mode: full-page gallery of all SVGs
  if (showAdmin) {
    const allQ = Object.values(QUESTIONS).flat();
    const DIFF_COLORS = { '淺': 'bg-green-100 text-green-800', '中': 'bg-yellow-100 text-yellow-800', '難': 'bg-red-100 text-red-800' };
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-gray-100 py-2 z-10 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800">🔧 Admin 圖表總覽</h2>
          <button onClick={() => setShowAdmin(false)} className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700">
            ← 返回
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allQ.map((q) => (
            <div key={q.id} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
              <div className="aspect-[320/220]">{q.renderSVG(false)}</div>
              <div className="p-2 border-t border-gray-100">
                <div className="flex items-center gap-1 flex-wrap mb-1">
                  <span className="font-mono font-bold text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{q.id}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${DIFF_COLORS[q.difficulty]}`}>{q.difficulty}</span>
                </div>
                <p className="text-xs text-gray-700 leading-tight">{q.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 p-4 flex flex-col items-center justify-center">
        <div className="absolute top-4 left-4">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm">
            <HomeIcon className="w-5 h-5 mr-2" />
            <span className="font-bold">返回主頁</span>
          </Link>
        </div>
        <div className="absolute top-4 right-4">
          <button onClick={handleAdminLogin} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 bg-white/70 hover:bg-white px-3 py-1.5 rounded-lg text-xs border border-gray-200 shadow-sm transition-colors">
            🔧 Admin
          </button>
        </div>
        
        <h1 className="text-4xl font-bold text-blue-800 mb-2">尋找圖形角度</h1>
        <h2 className="text-xl text-blue-600 mb-8">Angle Master</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-4">自訂訓練模式 (混合模式)</h3>
          
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-2">選擇級別 (可多選)</h4>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 cursor-pointer bg-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-700 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedLevels.length === 4}
                  onChange={(e) => setSelectedLevels(e.target.checked ? ['F1', 'F2', 'F3', 'Senior'] : [])}
                  className="w-5 h-5 rounded focus:ring-blue-300"
                />
                <span className="text-lg font-bold text-white">全部 (F1–F6)</span>
              </label>
              {['F1', 'F2', 'F3', 'Senior'].map(lvl => (
                <label key={lvl} className="flex items-center gap-2 cursor-pointer bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedLevels.includes(lvl)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedLevels([...selectedLevels, lvl]);
                      else setSelectedLevels(selectedLevels.filter(l => l !== lvl));
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-lg font-bold text-blue-800">{lvl === 'Senior' ? 'F4-F6' : lvl}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-2">選擇難度 (可多選)</h4>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 cursor-pointer bg-green-600 px-4 py-2 rounded-lg border border-green-600 hover:bg-green-700 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedDiffs.length === 3}
                  onChange={(e) => setSelectedDiffs(e.target.checked ? ['淺', '中', '難'] : [])}
                  className="w-5 h-5 rounded focus:ring-green-300"
                />
                <span className="text-lg font-bold text-white">全部混合</span>
              </label>
              {['淺', '中', '難'].map(diff => (
                <label key={diff} className="flex items-center gap-2 cursor-pointer bg-green-50 px-4 py-2 rounded-lg border border-green-100 hover:bg-green-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedDiffs.includes(diff)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedDiffs([...selectedDiffs, diff]);
                      else setSelectedDiffs(selectedDiffs.filter(d => d !== diff));
                    }}
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-lg font-bold text-green-800">{diff}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            onClick={handleStartMixed}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            開始訓練 Start Quiz
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 p-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-blue-800 text-center">中學圖形定理概覽</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">F1</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 直線上的鄰角</li>
                <li>• 對頂角</li>
                <li>• 同位角</li>
                <li>• 內錯角</li>
                <li>• 同旁內角</li>
                <li>• 三角形內角和</li>
              </ul>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">F2</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 三角形外角</li>
                <li>• 多邊形內角和</li>
                <li>• 多邊形外角和</li>
                <li>• 等腰三角形性質</li>
                <li>• 等邊三角形性質</li>
                <li>• 等角對邊相等</li>
                <li>• 畢氏定理</li>
              </ul>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">F3</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 平行四邊形性質</li>
                <li>• 菱形性質</li>
                <li>• 長方形性質</li>
                <li>• 正方形性質</li>
                <li>• 中點定理</li>
                <li>• 截線定理</li>
              </ul>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">F4-F6</h4>
              <div className="grid grid-cols-2 gap-x-2 text-gray-600">
                <ul className="space-y-2">
                  <li>• 圓心角與圓周角</li>
                  <li>• 半圓上的圓周角</li>
                  <li>• 同弓形內的圓周角</li>
                  <li>• 圓內接四邊形對角</li>
                  <li>• 圓內接四邊形外角</li>
                  <li>• 交錯弓形的圓周角</li>
                  <li>• 切線 ⊥ 半徑</li>
                </ul>
                <ul className="space-y-2">
                  <li>• 等角對等弧</li>
                  <li>• 等弧對等角</li>
                  <li>• 等角對等弦</li>
                  <li>• 等弦對等角</li>
                  <li>• 等弧對等弦</li>
                  <li>• 等弦對等弧</li>
                  <li>• 切線性質</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = activeQuestions[currentQuestionIndex];
  const isCorrect = parseInt(userAnswer) === q.answer;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="font-bold text-lg">[{q.id}] {q.level === 'Senior' ? 'F4-F6' : q.level} - {q.title} ({q.difficulty})</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(true)}
            className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold hover:bg-indigo-100 active:bg-indigo-200 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">筆記</span>
          </button>
          <div className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {currentQuestionIndex + 1} / {activeQuestions.length}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col gap-4">
        {/* Figure Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
          {/* Hint button — floats top-right of figure */}
          <button
            onClick={() => setShowHint(!showHint)}
            className={`absolute top-2 right-2 z-20 p-2 rounded-lg shadow border ${
              showHint ? 'bg-yellow-100 border-yellow-400 text-yellow-600' : 'bg-white/90 border-gray-200 text-gray-500 hover:bg-gray-100'
            }`}
            title="提示"
          >
            <Lightbulb className="w-5 h-5" />
          </button>

          {/* Drawing toolbar — bottom-left of figure */}
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 bg-white/90 p-1 rounded-lg shadow-sm border border-gray-200">
            {/* Pen button: shows current color, click toggles color picker */}
            <div className="relative">
              <button
                onClick={() => { setDrawMode('pen'); setShowColorPicker(v => !v); }}
                className={`p-1.5 rounded flex items-center gap-1 ${
                  drawMode === 'pen' ? 'bg-gray-100' : 'hover:bg-gray-100'
                }`}
                title="畫筆"
              >
                <Pen className="w-5 h-5" style={{ color: penColor.replace(/[^,]+(?=\))/, '1') }} />
              </button>
              {showColorPicker && (
                <div className="absolute bottom-full mb-1 left-0 flex flex-row gap-1 bg-white/95 p-1.5 rounded-lg shadow-md border border-gray-200">
                  {[
                    { color: 'rgba(220,50,50,0.85)', bg: 'bg-red-500', ring: 'ring-red-500' },
                    { color: 'rgba(50,50,220,0.85)', bg: 'bg-blue-500', ring: 'ring-blue-500' },
                    { color: 'rgba(50,180,50,0.85)', bg: 'bg-green-500', ring: 'ring-green-500' },
                    { color: 'rgba(30,30,30,0.90)', bg: 'bg-gray-800', ring: 'ring-gray-800' },
                  ].map(({ color, bg, ring }) => (
                    <button
                      key={color}
                      onClick={() => { setPenColor(color); setShowColorPicker(false); }}
                      className={`w-7 h-7 rounded-full ${bg} ${
                        penColor === color ? `ring-2 ring-offset-1 ${ring}` : ''
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => { setDrawMode('eraser'); setShowColorPicker(false); }}
              className={`p-1.5 rounded ${
                drawMode === 'eraser' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Eraser className="w-5 h-5" />
            </button>
            <button
              onClick={() => { clearCanvas(); setShowColorPicker(false); }}
              className="p-1.5 rounded text-gray-600 hover:bg-gray-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="relative w-full aspect-[320/220] bg-[#f5f5f5] touch-none">
            {q.renderSVG(showHint)}
            <canvas
              ref={canvasRef}
              width={640}
              height={440}
              className="absolute inset-0 w-full h-full z-0"
              style={{ touchAction: 'none' }}
            />
          </div>
        </div>

        {/* Question Text */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-lg">
          {q.text}
        </div>

        {/* Answer Input */}
        {!isSubmitted ? (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-4 items-center">
            <span className="text-lg font-bold whitespace-nowrap">答案 Answer:</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value.replace(/[^0-9]/g, ''))}
              className="flex-1 border-2 border-gray-300 rounded-lg p-2 text-lg focus:border-blue-500 focus:outline-none min-w-0"
              placeholder="輸入數值..."
            />
            <span className="text-lg">{q.unit !== undefined ? q.unit : '°'}</span>
            <button
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50 whitespace-nowrap"
            >
              提交 Submit
            </button>
          </div>
        ) : (
          <div className={`p-6 rounded-xl shadow-sm border-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '✅ 答對了！ Correct!' : '❌ 答錯了！ Wrong!'}
            </div>
            <div className="space-y-2 text-lg">
              <div className="font-bold text-gray-700 mb-2">解題步驟 Solution:</div>
              {q.steps.map((step, i) => (
                <div key={i} className="text-gray-800 font-mono bg-white/50 p-2 rounded">{step}</div>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
            >
              下一題 Next Question
            </button>
          </div>
        )}
      </div>

      {/* ── 筆記 Modal ── */}
      {showNotes && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center"
          onClick={() => setShowNotes(false)}
        >
          <div
            className="bg-white w-full max-w-lg max-h-[85vh] rounded-t-2xl md:rounded-2xl overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 flex items-center justify-between px-5 py-4 rounded-t-2xl md:rounded-t-2xl z-10">
              <h2 className="text-lg font-bold text-slate-800">📐 甲(一) 初中找角度</h2>
              <button onClick={() => setShowNotes(false)} className="p-2 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-5 space-y-5">

              {/* 0. 基礎知識 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-slate-600 text-white text-xs px-2 py-0.5 rounded-full">0</span>
                  基礎知識：線和角的命名
                </h3>
                <div className="space-y-2">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-sm font-bold text-green-800 mb-1">線段</p>
                    <p className="text-sm text-slate-700 mb-2">由兩個端點組成，如 <span className="font-mono font-bold bg-white px-1 rounded">線段 AB</span>（從 A 到 B）</p>
                    <svg viewBox="0 0 300 60" className="w-full max-w-sm mx-auto touch-none mt-2">
                      <line x1="80" y1="30" x2="220" y2="20" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="80" cy="30" r="3" fill="#334155" />
                      <circle cx="220" cy="20" r="3" fill="#334155" />
                      <text x="60" y="35" fontSize="16" fill="#16a34a" fontFamily="sans-serif">A</text>
                      <text x="230" y="25" fontSize="16" fill="#16a34a" fontFamily="sans-serif">B</text>
                    </svg>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-sm font-bold text-green-800 mb-1">角的命名（角的特徵）</p>
                    <p className="text-sm text-slate-700 mb-2">由三個點命名，如 <span className="font-mono font-bold bg-white px-1 rounded">∠ABC</span>
                      <span className="ml-2 text-xs text-amber-700 font-bold">⚠️ 頂點（vertex）在<span className="text-red-600">中間</span>的英文字母</span>
                    </p>
                    <svg viewBox="0 0 300 100" className="w-full max-w-sm mx-auto touch-none">
                      <path d="M 60 80 L 120 30 M 60 80 L 180 80" stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <text x="125" y="25" fontSize="16" fill="#16a34a">A</text>
                      <text x="40" y="85" fontSize="16" fill="#16a34a">B</text>
                      <text x="185" y="85" fontSize="16" fill="#16a34a">C</text>
                      <path d="M 90 80 A 30 30 0 0 0 83 61" stroke="#dc2626" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 1. 直線上的鄰角 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">1</span>
                  直線上的鄰角
                  <span className="text-sm text-red-500 font-normal">（直線 → 180°）</span>
                </h3>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-center text-xl font-bold text-blue-800 my-1">a + b + c = 180°</p>
                  <svg viewBox="0 0 300 100" className="w-full max-w-sm mx-auto my-3 touch-none">
                    <line x1="40" y1="80" x2="260" y2="80" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="150" y1="80" x2="100" y2="20" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="150" y1="80" x2="230" y2="35" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    {/* a arc (radius 22) */}
                    <path d="M 128 80 A 22 22 0 0 1 133 60" stroke="#2563eb" strokeWidth="2" fill="none" />
                    {/* b arc (radius 17) */}
                    <path d="M 139 67 A 17 17 0 0 1 165 72" stroke="#2563eb" strokeWidth="2" fill="none" />
                    {/* c arc (radius 22) */}
                    <path d="M 169 70 A 22 22 0 0 1 172 80" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <text x="115" y="75" fontSize="14" fill="#1e3a8a">a</text>
                    <text x="151" y="62" fontSize="14" fill="#1e3a8a">b</text>
                    <text x="180" y="75" fontSize="14" fill="#1e3a8a">c</text>
                    <text x="40" y="98" fontSize="14" fill="#dc2626">A</text>
                    <text x="146" y="98" fontSize="14" fill="#dc2626">O</text>
                    <text x="250" y="98" fontSize="14" fill="#dc2626">B</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    <span className="bg-blue-200 px-1 rounded font-bold text-blue-900">在直線的所有角</span>之和 = 180°
                  </p>
                </div>
              </div>

              {/* 2. 同頂角 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
                  同頂角
                  <span className="text-sm text-red-500 font-normal">（圓形 → 360°）</span>
                </h3>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-center text-xl font-bold text-blue-800 my-1">a + b + c = 360°</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <g transform="translate(150, 70)">
                      <line x1="0" y1="0" x2="0" y2="-60" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                      <line x1="0" y1="0" x2="55" y2="40" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                      <line x1="0" y1="0" x2="-45" y2="50" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                      {/* a arc (radius 15) */}
                      <path d="M 0 -15 A 15 15 0 0 1 12 9" stroke="#2563eb" strokeWidth="2" fill="none" />
                      {/* b arc (radius 22) */}
                      <path d="M 18 13 A 22 22 0 0 1 -15 16" stroke="#2563eb" strokeWidth="2" fill="none" />
                      {/* c arc (radius 15) */}
                      <path d="M -10 11 A 15 15 0 0 1 0 -15" stroke="#2563eb" strokeWidth="2" fill="none" />
                      <text x="22" y="-5" fontSize="14" fill="#1e3a8a">a</text>
                      <text x="-2" y="38" fontSize="14" fill="#1e3a8a">b</text>
                      <text x="-32" y="-2" fontSize="14" fill="#1e3a8a">c</text>
                    </g>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    <span className="bg-blue-200 px-1 rounded font-bold text-blue-900">圍圍的所有角</span>之和 = 360°
                  </p>
                </div>
              </div>

              {/* 3. 對頂角 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
                  對頂角
                  <span className="text-sm text-slate-500 font-normal">（對面頂住的角）</span>
                </h3>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-center text-xl font-bold text-blue-800 my-1">a = b</p>
                  <svg viewBox="0 0 300 120" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <line x1="70" y1="20" x2="230" y2="100" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="70" y1="100" x2="230" y2="20" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <g transform="translate(150, 60)">
                      <path d="M -18 -8 A 20 20 0 0 0 -18 8" stroke="#2563eb" strokeWidth="2" fill="none" />
                      <path d="M 18 -8 A 20 20 0 0 1 18 8" stroke="#2563eb" strokeWidth="2" fill="none" />
                      <text x="-35" y="5" fontSize="16" fill="#1e3a8a">a</text>
                      <text x="25" y="5" fontSize="16" fill="#1e3a8a">b</text>
                    </g>
                  </svg>
                  <div className="bg-amber-50 rounded p-2 mt-2 border border-amber-200">
                    <p className="text-sm text-amber-800">💡 <span className="font-bold">提示：</span>兩直線相交（打交叉）→ 對面的角<span className="font-bold text-red-600">相等</span></p>
                  </div>
                </div>
              </div>

              {/* 持續更新提示 */}
              <div className="text-center py-4 text-slate-500 font-bold opacity-80">
                其他定理持續制作中...
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
