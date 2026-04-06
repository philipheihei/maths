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
                <div key={i} className="text-gray-800 bg-white/50 p-2 rounded">{step}</div>
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
            className="bg-white w-full max-w-4xl max-h-[92vh] rounded-t-2xl md:rounded-2xl overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 flex items-center justify-between px-5 py-4 rounded-t-2xl md:rounded-t-2xl z-10">
              <h2 className="text-lg font-bold text-slate-800">📐 甲(一) 初中找角度</h2>
              <button onClick={() => setShowNotes(false)} className="p-2 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-5">

              {/* F1 section label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">F1</span>
                <span className="text-slate-500 text-sm">基礎幾何角度定理</span>
                <div className="flex-1 border-t border-slate-200" />
              </div>

              {/* 0. 基礎知識 — full width */}
              <div className="mb-5">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-slate-600 text-white text-xs px-2 py-0.5 rounded-full">0</span>
                  基礎知識：線和角的命名
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-sm font-bold text-green-800 mb-1">線段</p>
                    <p className="text-sm text-slate-700 mb-2">由兩個端點組成，如 <span className="font-mono font-bold bg-white px-1 rounded">線段 AB</span>（從 A 到 B）</p>
                    <svg viewBox="0 0 300 60" className="w-full touch-none mt-2">
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
                    <svg viewBox="0 0 300 100" className="w-full touch-none">
                      <path d="M 60 80 L 120 30 M 60 80 L 180 80" stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <text x="125" y="25" fontSize="16" fill="#16a34a">A</text>
                      <text x="40" y="85" fontSize="16" fill="#16a34a">B</text>
                      <text x="185" y="85" fontSize="16" fill="#16a34a">C</text>
                      <path d="M 90 80 A 30 30 0 0 0 83 61" stroke="#dc2626" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Theorems grid — 2 columns on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                    <span className="bg-blue-200 px-2 py-0.5 rounded font-bold text-blue-900">在直線的所有角</span>之和 = 180°
                  </p>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-blue-900">(直線上的鄰角)</span>
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
                      {/* a arc (radius 14) */}
                      <path d="M 0 -14 A 14 14 0 0 1 11 9" stroke="#2563eb" strokeWidth="2" fill="none" />
                      {/* b arc (radius 22) */}
                      <path d="M 18 13 A 22 22 0 0 1 -15 16" stroke="#2563eb" strokeWidth="2" fill="none" />
                      {/* c arc (radius 18) */}
                      <path d="M -11 14 A 18 18 0 0 1 0 -18" stroke="#2563eb" strokeWidth="2" fill="none" />
                      <text x="17" y="-5" fontSize="14" fill="#1e3a8a">a</text>
                      <text x="-2" y="38" fontSize="14" fill="#1e3a8a">b</text>
                      <text x="-32" y="-6" fontSize="14" fill="#1e3a8a">c</text>
                    </g>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    <span className="bg-blue-200 px-2 py-0.5 rounded font-bold text-blue-900">圓圈的所有角</span>之和 = 360°
                  </p>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-blue-900">(同頂角)</span>
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
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-blue-900">(對頂角)</span>
                  </p>
                </div>
              </div>

              {/* 4A. 同位角 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4A</span>
                  同位角
                  <span className="text-sm text-red-500 font-normal">（F 形 → 相等）</span>
                </h3>
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-center text-xl font-bold text-red-800 my-1">a = b</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <line x1="40" y1="50" x2="260" y2="50" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="40" y1="100" x2="260" y2="100" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="168" y1="20" x2="102" y2="130" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    
                    <polyline points="230,50 150,50 102,130" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                    <line x1="120" y1="100" x2="230" y2="100" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
                    
                    <path d="M 195 45 L 205 50 L 195 55" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <path d="M 195 95 L 205 100 L 195 105" stroke="#16a34a" strokeWidth="2" fill="none" />
                    
                    <path d="M 165 50 A 15 15 0 0 1 142.3 62.8" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 135 100 A 15 15 0 0 1 112.3 112.8" stroke="#2563eb" strokeWidth="2" fill="none" />
                    
                    <text x="166" y="76" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                    <text x="136" y="126" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                    <text x="40" y="40" fontSize="16" fill="#334155">A</text>
                    <text x="250" y="40" fontSize="16" fill="#334155">B</text>
                    <text x="40" y="90" fontSize="16" fill="#334155">C</text>
                    <text x="250" y="90" fontSize="16" fill="#334155">D</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    <span className="bg-white border rounded px-2 py-0.5 text-sm text-blue-900 font-bold">(同位角, AB//CD)</span>
                  </p>
                </div>
              </div>

              {/* 4B. 內錯角 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4B</span>
                  內錯角
                  <span className="text-sm text-red-500 font-normal">（Z/N 形 → 相等）</span>
                </h3>
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-center text-xl font-bold text-red-800 my-1">a = b</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <line x1="100" y1="20" x2="100" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="200" y1="20" x2="200" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="100" y1="40" x2="200" y2="100" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    
                    <polyline points="100,120 100,40 200,100 200,20" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                    
                    <path d="M 92 85 L 100 75 L 108 85 M 92 95 L 100 85 L 108 95" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <path d="M 192 65 L 200 55 L 208 65 M 192 75 L 200 65 L 208 75" stroke="#16a34a" strokeWidth="2" fill="none" />
                    
                    <path d="M 112.8 47.7 A 15 15 0 0 1 100 55" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 200 85 A 15 15 0 0 0 187.2 92.3" stroke="#2563eb" strokeWidth="2" fill="none" />
                    
                    <text x="114" y="74" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                    <text x="176" y="76" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                    <text x="80" y="38" fontSize="16" fill="#334155">A</text>
                    <text x="80" y="115" fontSize="16" fill="#334155">B</text>
                    <text x="210" y="38" fontSize="16" fill="#334155">C</text>
                    <text x="210" y="115" fontSize="16" fill="#334155">D</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    <span className="bg-white border rounded px-2 py-0.5 text-sm text-blue-900 font-bold">(內錯角, AB//CD)</span>
                  </p>
                </div>
              </div>

              {/* 4C. 同旁內角 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4C</span>
                  同旁內角
                  <span className="text-sm text-red-500 font-normal">（C/U 形 → 180°）</span>
                </h3>
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-center text-xl font-bold text-red-800 my-1">a + b = 180°</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <line x1="40" y1="50" x2="260" y2="50" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="40" y1="100" x2="260" y2="100" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="168" y1="20" x2="102" y2="130" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    
                    <polyline points="230,50 150,50 120,100 230,100" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                    
                    <path d="M 190 45 L 200 50 L 190 55 M 200 45 L 210 50 L 200 55" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <path d="M 190 95 L 200 100 L 190 105 M 200 95 L 210 100 L 200 105" stroke="#16a34a" strokeWidth="2" fill="none" />
                    
                    <path d="M 165 50 A 15 15 0 0 1 142.3 62.8" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 127.7 87.2 A 15 15 0 0 1 135 100" stroke="#2563eb" strokeWidth="2" fill="none" />
                    
                    <text x="153" y="72" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                    <text x="135" y="85" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                    <text x="40" y="40" fontSize="16" fill="#334155">A</text>
                    <text x="250" y="40" fontSize="16" fill="#334155">B</text>
                    <text x="40" y="90" fontSize="16" fill="#334155">C</text>
                    <text x="250" y="90" fontSize="16" fill="#334155">D</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    <span className="bg-white border rounded px-2 py-0.5 text-sm text-blue-900 font-bold">(同旁內角, AB//CD)</span>
                  </p>
                </div>
              </div>

              {/* 5. 三角形內角和 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">5</span>
                  三角形內角和
                  <span className="text-sm text-red-500 font-normal">（△ → 180°）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-center text-xl font-bold text-green-800 my-1">三角形內， a + b + c = 180°</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="150,20 60,110 240,110" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <path d="M 135.9 34.1 A 20 20 0 0 0 164.1 34.1" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <path d="M 80 110 A 20 20 0 0 0 74.1 95.9" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <path d="M 220 110 A 20 20 0 0 1 225.9 95.9" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <text x="145" y="55" fontSize="16" fill="#15803d" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                    <text x="90" y="103" fontSize="16" fill="#15803d" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                    <text x="200" y="103" fontSize="16" fill="#15803d" fontFamily="Times New Roman, serif" fontStyle="italic">c</text>
                  </svg>
                  <div className="bg-white rounded p-3 mt-2 border border-slate-200">
                    <p className="text-sm text-green-800 font-bold mb-2">例子：</p>
                    <div className="flex items-center gap-4">
                      <svg viewBox="0 0 110 90" className="w-28 flex-none touch-none">
                        <polygon points="55,8 10,78 100,78" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        <path d="M 47.4 19.8 A 14 14 0 0 0 62.6 19.8" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                        <path d="M 24 78 A 14 14 0 0 0 17.6 66.2" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                        <path d="M 86 78 A 14 14 0 0 1 92.4 66.2" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                        <text x="43" y="36" fontSize="10" fill="#334155">70°</text>
                        <text x="27" y="73" fontSize="10" fill="#334155">50°</text>
                        <text x="69" y="73" fontSize="10" fill="#334155">2x</text>
                      </svg>
                      <pre className="text-sm text-slate-700 whitespace-pre font-sans">{`2x = 180° - 50° - 70°
2x = 60°
 x = 30°`}</pre>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(△內角和)</span>
                  </p>
                </div>
              </div>

              {/* 6. 等腰三角形底角 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">6</span>
                  等腰三角形底角
                  <span className="text-sm text-red-500 font-normal">（等腰△ → 底角相等）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-center text-xl font-bold text-green-800 my-1">若 AB = AC，則 ∠B = ∠C</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="150,20 80,120 220,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <line x1="105" y1="70" x2="120" y2="78" stroke="#9333ea" strokeWidth="2" />
                    <line x1="110" y1="63" x2="125" y2="71" stroke="#9333ea" strokeWidth="2" />
                    <line x1="180" y1="78" x2="195" y2="70" stroke="#9333ea" strokeWidth="2" />
                    <line x1="175" y1="71" x2="190" y2="63" stroke="#9333ea" strokeWidth="2" />
                    <path d="M 100 120 A 20 20 0 0 0 91.5 103.6" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <path d="M 106 120 A 26 26 0 0 0 94.9 98.7" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <path d="M 200 120 A 20 20 0 0 1 208.5 103.6" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <path d="M 194 120 A 26 26 0 0 1 205.1 98.7" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <text x="145" y="14" fontSize="16" fill="#334155">A</text>
                    <text x="60" y="125" fontSize="16" fill="#334155">B</text>
                    <text x="230" y="125" fontSize="16" fill="#334155">C</text>
                  </svg>
                  <div className="bg-white rounded p-3 mt-2 border border-slate-200">
                    <p className="text-sm text-green-800 font-bold mb-2">例子：</p>
                    <div className="flex items-center gap-4">
                      <svg viewBox="0 0 110 88" className="w-28 flex-none touch-none">
                        <polygon points="55,12 8,78 102,78" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        <line x1="27.5" y1="42" x2="35.5" y2="48" stroke="#9333ea" strokeWidth="2" />
                        <line x1="82.5" y1="42" x2="74.5" y2="48" stroke="#9333ea" strokeWidth="2" />
                        <path d="M 21 78 A 13 13 0 0 0 15.5 67.4" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                        <path d="M 89 78 A 13 13 0 0 1 94.5 67.4" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                        <text x="25" y="72" fontSize="10" fill="#334155">67°</text>
                        <text x="83" y="72" fontSize="12" fill="#334155" fontStyle="italic">x</text>
                      </svg>
                      <div className="text-sm text-slate-700">
                        <p className="text-green-700 font-bold mb-1">底角 = 67°</p>
                        <pre className="whitespace-pre font-sans">{`x = 180° - 67° - 67°
x = 46°`}</pre>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(等腰△底角)</span>
                  </p>
                </div>
              </div>

              </div>{/* end F1 theorems grid */}

              {/* F2 section label */}
              <div className="flex items-center gap-2 mt-8 mb-4">
                <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">F2</span>
                <span className="text-slate-500 text-sm">進階幾何角度與多邊形</span>
                <div className="flex-1 border-t border-slate-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* 7. 等角對邊相等 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">7</span>
                  等角對邊相等
                  <span className="text-sm text-slate-500 font-normal">（等底角 → 等腰）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-center text-xl font-bold text-green-800 my-1">若 ∠B = ∠C，則 AB = AC</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="150,20 80,120 220,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <path d="M 100 120 A 20 20 0 0 0 91.5 103.6" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 106 120 A 26 26 0 0 0 94.9 98.7" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 200 120 A 20 20 0 0 1 208.5 103.6" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 194 120 A 26 26 0 0 1 205.1 98.7" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <line x1="105" y1="70" x2="120" y2="78" stroke="#ef4444" strokeWidth="2" />
                    <line x1="180" y1="78" x2="195" y2="70" stroke="#ef4444" strokeWidth="2" />
                    <text x="145" y="14" fontSize="16" fill="#334155">A</text>
                    <text x="60" y="125" fontSize="16" fill="#334155">B</text>
                    <text x="230" y="125" fontSize="16" fill="#334155">C</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(等角對邊相等)</span>
                  </p>
                </div>
              </div>

              {/* 8. 三角形外角 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">8</span>
                  三角形外角
                  <span className="text-sm text-slate-500 font-normal">（外角 = 內對角之和）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-center text-xl font-bold text-green-800 my-1">其中 d = a + b</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="170,20 80,120 220,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <line x1="220" y1="120" x2="280" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 156.6 34.9 A 20 20 0 0 0 178.9 37.9" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 100.0 120.0 A 20 20 0 0 0 93.4 105.1" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 232.0 120.0 A 12 12 0 0 1 214.6 109.3" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <text x="160" y="55" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                    <text x="93" y="115" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                    <text x="237" y="114" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">d</text>
                    <text x="165" y="14" fontSize="16" fill="#334155">A</text>
                    <text x="60" y="125" fontSize="16" fill="#334155">B</text>
                    <text x="215" y="138" fontSize="16" fill="#334155">C</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(△外角)</span>
                  </p>
                </div>
              </div>

              {/* 9. 等腰三角形性質 */}
              <div className="md:col-span-2">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">9</span>
                  等腰三角形性質
                  <span className="text-sm text-slate-500 font-normal">（頂角平分線、底邊中線、底邊高線：三線合一）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* case 1 */}
                    <div className="text-center">
                      <p className="text-sm text-slate-700 mb-2">若 <b>AB = AC</b> 及 <b>BM = CM</b></p>
                      <svg viewBox="0 0 160 140" className="w-full max-w-[120px] mx-auto my-1 touch-none">
                        <polygon points="80,20 30,120 130,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        <line x1="80" y1="20" x2="80" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="54.6" y1="57.3" x2="65.4" y2="62.7" stroke="#ef4444" strokeWidth="2" />
                        <line x1="44.6" y1="77.3" x2="55.4" y2="82.7" stroke="#ef4444" strokeWidth="2" />
                        <line x1="94.6" y1="62.7" x2="105.4" y2="57.3" stroke="#ef4444" strokeWidth="2" />
                        <line x1="104.6" y1="82.7" x2="115.4" y2="77.3" stroke="#ef4444" strokeWidth="2" />
                        <line x1="55" y1="115" x2="55" y2="125" stroke="#ef4444" strokeWidth="2" />
                        <line x1="105" y1="115" x2="105" y2="125" stroke="#ef4444" strokeWidth="2" />
                        <text x="75" y="14" fontSize="14" fill="#334155">A</text>
                        <text x="15" y="125" fontSize="14" fill="#334155">B</text>
                        <text x="135" y="125" fontSize="14" fill="#334155">C</text>
                        <text x="74" y="135" fontSize="14" fill="#334155">M</text>
                      </svg>
                      <p className="text-sm text-blue-800 font-bold">則 AM ⊥ BC 及 x = y</p>
                    </div>

                    {/* case 2 */}
                    <div className="text-center md:border-l md:border-green-200">
                      <p className="text-sm text-slate-700 mb-2">若 <b>AB = AC</b> 及 <b>AM ⊥ BC</b></p>
                      <svg viewBox="0 0 160 140" className="w-full max-w-[120px] mx-auto my-1 touch-none">
                        <polygon points="80,20 30,120 130,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        <line x1="80" y1="20" x2="80" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="54.6" y1="57.3" x2="65.4" y2="62.7" stroke="#ef4444" strokeWidth="2" />
                        <line x1="44.6" y1="77.3" x2="55.4" y2="82.7" stroke="#ef4444" strokeWidth="2" />
                        <line x1="94.6" y1="62.7" x2="105.4" y2="57.3" stroke="#ef4444" strokeWidth="2" />
                        <line x1="104.6" y1="82.7" x2="115.4" y2="77.3" stroke="#ef4444" strokeWidth="2" />
                        <polyline points="72,120 72,112 80,112" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                        <text x="75" y="14" fontSize="14" fill="#334155">A</text>
                        <text x="15" y="125" fontSize="14" fill="#334155">B</text>
                        <text x="135" y="125" fontSize="14" fill="#334155">C</text>
                        <text x="74" y="135" fontSize="14" fill="#334155">M</text>
                      </svg>
                      <p className="text-sm text-blue-800 font-bold">則 BM = CM 及 x = y</p>
                    </div>

                    {/* case 3 */}
                    <div className="text-center md:border-l md:border-green-200">
                      <p className="text-sm text-slate-700 mb-2">若 <b>AB = AC</b> 及 <b>x = y</b></p>
                      <svg viewBox="0 0 160 140" className="w-full max-w-[120px] mx-auto my-1 touch-none">
                        <polygon points="80,20 30,120 130,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        <line x1="80" y1="20" x2="80" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="54.6" y1="57.3" x2="65.4" y2="62.7" stroke="#ef4444" strokeWidth="2" />
                        <line x1="44.6" y1="77.3" x2="55.4" y2="82.7" stroke="#ef4444" strokeWidth="2" />
                        <line x1="94.6" y1="62.7" x2="105.4" y2="57.3" stroke="#ef4444" strokeWidth="2" />
                        <line x1="104.6" y1="82.7" x2="115.4" y2="77.3" stroke="#ef4444" strokeWidth="2" />
                        <path d="M 70.2 39.7 A 22 22 0 0 0 80.0 42.0" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                        <path d="M 80.0 42.0 A 22 22 0 0 0 89.8 39.7" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                        <text x="58" y="52" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
                        <text x="87" y="52" fontSize="12" fill="#1e3a8a" fontStyle="italic">y</text>
                        <text x="75" y="14" fontSize="14" fill="#334155">A</text>
                        <text x="15" y="125" fontSize="14" fill="#334155">B</text>
                        <text x="135" y="125" fontSize="14" fill="#334155">C</text>
                        <text x="74" y="135" fontSize="14" fill="#334155">M</text>
                      </svg>
                      <p className="text-sm text-blue-800 font-bold">則 BM = CM 及 AM ⊥ BC</p>
                    </div>

                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3 border-t border-green-200 pt-2">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(等腰△性質)</span>
                  </p>
                </div>
              </div>

              {/* 10. 等邊三角形性質 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">10</span>
                  等邊三角形性質
                  <span className="text-sm text-slate-500 font-normal">（三邊等長 ⟷ 三角均 60°）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-center text-xl font-bold text-green-800 my-1">若 AB = BC = AC</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="150,20 60,120 240,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    {/* Tick marks on edges */}
                    <line x1="100" y1="70" x2="110" y2="70" stroke="#ef4444" strokeWidth="2" transform="rotate(45 105 70)" />
                    <line x1="200" y1="70" x2="190" y2="70" stroke="#ef4444" strokeWidth="2" transform="rotate(-45 195 70)" />
                    <line x1="150" y1="115" x2="150" y2="125" stroke="#ef4444" strokeWidth="2" />
                    
                    <path d="M 136.6 34.9 A 20 20 0 0 0 163.4 34.9" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 80.0 120.0 A 20 20 0 0 0 73.4 105.1" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 220.0 120.0 A 20 20 0 0 0 226.6 105.1" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    
                    <text x="143" y="48" fontSize="12" fill="#1e3a8a">60°</text>
                    <text x="75" y="112" fontSize="12" fill="#1e3a8a">60°</text>
                    <text x="207" y="110" fontSize="12" fill="#1e3a8a">60°</text>
                    
                    <text x="145" y="14" fontSize="16" fill="#334155">A</text>
                    <text x="45" y="125" fontSize="16" fill="#334155">B</text>
                    <text x="250" y="125" fontSize="16" fill="#334155">C</text>
                  </svg>
                  <p className="text-center font-bold text-blue-800 my-1">則 ∠A = ∠B = ∠C = 60°</p>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(等邊△性質)</span>
                  </p>
                </div>
              </div>

              {/* 11. 多邊形內角和 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">11</span>
                  多邊形內角和
                  <span className="text-sm text-slate-500 font-normal">（n 邊形內角和）</span>
                </h3>
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <p className="text-center text-xl font-bold text-orange-800 my-1">內角和 = (n - 2) × 180°</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="120,30 200,20 250,70 230,120 70,90" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    
                    <path d="M 111.7 40.0 A 13 13 0 0 0 132.9 28.4" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 187.1 21.6 A 13 13 0 0 0 209.2 29.2" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 240.8 60.8 A 13 13 0 0 0 245.2 82.1" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 234.8 107.9 A 13 13 0 0 0 217.2 117.6" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 82.8 92.4 A 13 13 0 0 0 78.3 80.0" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    
                    <text x="100" y="47" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
                    <text x="186" y="44" fontSize="12" fill="#1e3a8a">133°</text>
                    <text x="244" y="87" fontSize="12" fill="#1e3a8a">120°</text>
                    <text x="200" y="110" fontSize="12" fill="#1e3a8a">80°</text>
                    <text x="61" y="84" fontSize="12" fill="#1e3a8a">77°</text>
                  </svg>
                  <div className="bg-white rounded p-3 mt-2 border border-slate-200">
                    <p className="text-sm text-orange-800 font-bold mb-2">例子（五邊形, n=5）：</p>
                    <pre className="text-sm text-slate-700 whitespace-pre font-sans">
{`x + 77° + 80° + 120° + 133° = (5 - 2) × 180°
                    x + 410° = 540°
                           x = 130°`}
                    </pre>
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-orange-900">(多邊形內角和)</span>
                  </p>
                </div>
              </div>

              {/* 12. 多边形外角和 */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">12</span>
                  多邊形外角和
                  <span className="text-sm text-slate-500 font-normal">（外角總和 = 360°）</span>
                </h3>
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <p className="text-center text-xl font-bold text-orange-800 my-1">外角和 = 360°</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="130,40 120,90 200,110 260,60" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    
                    <line x1="130" y1="40" x2="91" y2="34" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="120" y1="90" x2="114" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="200" y1="110" x2="240" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="260" y1="60" x2="284" y2="40" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    
                    <path d="M 117.2 38.0 A 13 13 0 0 1 127.5 52.7" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 117.5 102.7 A 13 13 0 0 1 132.6 93.2" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 212.6 113.2 A 13 13 0 0 1 210.0 101.7" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 270.0 51.7 A 13 13 0 0 1 247.2 58.0" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    
                    <text x="96" y="42" fontSize="12" fill="#1e3a8a">95°</text>
                    <text x="106" y="113" fontSize="12" fill="#1e3a8a">76°</text>
                    <text x="216" y="120" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
                    <text x="268" y="46" fontSize="12" fill="#1e3a8a">114°</text>

                    <text x="135" y="32" fontSize="14" fill="#334155">A</text>
                    <text x="100" y="85" fontSize="14" fill="#334155">B</text>
                    <text x="195" y="125" fontSize="14" fill="#334155">C</text>
                    <text x="265" y="75" fontSize="14" fill="#334155">D</text>
                  </svg>
                  <div className="bg-white rounded p-3 mt-2 border border-slate-200">
                    <p className="text-sm text-orange-800 font-bold mb-2">例子（四邊形 ABCD）：</p>
                    <pre className="text-sm text-slate-700 whitespace-pre font-sans">
{`x + 76° + 95° + 114° = 360°
            x + 285° = 360°
                   x = 75°`}
                    </pre>
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-orange-900">(多邊形外角和)</span>
                  </p>
                </div>
              </div>

              </div>{/* end full theorems grid */}

              {/* 持續更新提示 */}
              <div className="text-center py-4 text-slate-500 font-bold opacity-80 md:col-span-2">
                其他定理持續制作中...
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
