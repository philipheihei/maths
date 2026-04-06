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
                      <text x="60" y="35" fontSize="16" fill="#16a34a" fontFamily="sans-serif" fontStyle="italic">A</text>
                      <text x="230" y="25" fontSize="16" fill="#16a34a" fontFamily="sans-serif" fontStyle="italic">B</text>
                    </svg>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-sm font-bold text-green-800 mb-1">角的命名（角的特徵）</p>
                    <p className="text-sm text-slate-700 mb-2">由三個點命名，如 <span className="font-mono font-bold bg-white px-1 rounded">∠ABC</span>
                      <span className="ml-2 text-xs text-amber-700 font-bold">⚠️ 頂點（vertex）在<span className="text-red-600">中間</span>的英文字母</span>
                    </p>
                    <svg viewBox="0 0 300 100" className="w-full touch-none">
                      <path d="M 60 80 L 120 30 M 60 80 L 180 80" stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <text x="125" y="25" fontSize="16" fill="#16a34a" fontStyle="italic">A</text>
                      <text x="40" y="85" fontSize="16" fill="#16a34a" fontStyle="italic">B</text>
                      <text x="185" y="85" fontSize="16" fill="#16a34a" fontStyle="italic">C</text>
                      <path d="M 90 80 A 30 30 0 0 0 83 61" stroke="#dc2626" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Theorems grid — 2 columns on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* 1. 直線上的鄰角 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">1</span>
                  直線上的鄰角
                  <span className="text-sm text-red-500 font-normal">（直線 → 180°）</span>
                </h3>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 flex-1">
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
                    <text x="115" y="75" fontSize="14" fill="#1e3a8a" fontStyle="italic">a</text>
                    <text x="151" y="62" fontSize="14" fill="#1e3a8a" fontStyle="italic">b</text>
                    <text x="180" y="75" fontSize="14" fill="#1e3a8a" fontStyle="italic">c</text>
                    <text x="40" y="98" fontSize="14" fill="#dc2626" fontStyle="italic">A</text>
                    <text x="146" y="98" fontSize="14" fill="#dc2626" fontStyle="italic">O</text>
                    <text x="250" y="98" fontSize="14" fill="#dc2626" fontStyle="italic">B</text>
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
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
                  同頂角
                  <span className="text-sm text-red-500 font-normal">（圓形 → 360°）</span>
                </h3>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 flex-1">
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
                      <text x="17" y="-5" fontSize="14" fill="#1e3a8a" fontStyle="italic">a</text>
                      <text x="-2" y="38" fontSize="14" fill="#1e3a8a" fontStyle="italic">b</text>
                      <text x="-32" y="-6" fontSize="14" fill="#1e3a8a" fontStyle="italic">c</text>
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
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
                  對頂角
                  <span className="text-sm text-slate-500 font-normal">（對面頂住的角）</span>
                </h3>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 flex-1">
                  <p className="text-center text-xl font-bold text-blue-800 my-1">a = b</p>
                  <svg viewBox="0 0 300 120" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <line x1="70" y1="20" x2="230" y2="100" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="70" y1="100" x2="230" y2="20" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <g transform="translate(150, 60)">
                      <path d="M -18 -8 A 20 20 0 0 0 -18 8" stroke="#2563eb" strokeWidth="2" fill="none" />
                      <path d="M 18 -8 A 20 20 0 0 1 18 8" stroke="#2563eb" strokeWidth="2" fill="none" />
                      <text x="-35" y="5" fontSize="16" fill="#1e3a8a" fontStyle="italic">a</text>
                      <text x="25" y="5" fontSize="16" fill="#1e3a8a" fontStyle="italic">b</text>
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
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4A</span>
                  同位角
                  <span className="text-sm text-red-500 font-normal">（F 形 → 相等）</span>
                </h3>
                <div className="bg-red-50 rounded-lg p-3 border border-red-200 flex-1">
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
                    <text x="23" y="55" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                    <text x="265" y="55" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                    <text x="23" y="95" fontSize="16" fill="#334155" fontStyle="italic">C</text>
                    <text x="265" y="95" fontSize="16" fill="#334155" fontStyle="italic">D</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    <span className="bg-white border rounded px-2 py-0.5 text-sm text-blue-900 font-bold">(同位角, AB//CD)</span>
                  </p>
                </div>
              </div>

              {/* 4B. 內錯角 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4B</span>
                  內錯角
                  <span className="text-sm text-red-500 font-normal">（Z/N 形 → 相等）</span>
                </h3>
                <div className="bg-red-50 rounded-lg p-3 border border-red-200 flex-1">
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
                    <text x="84" y="17" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                    <text x="84" y="133" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                    <text x="204" y="17" fontSize="16" fill="#334155" fontStyle="italic">C</text>
                    <text x="204" y="133" fontSize="16" fill="#334155" fontStyle="italic">D</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    <span className="bg-white border rounded px-2 py-0.5 text-sm text-blue-900 font-bold">(內錯角, AB//CD)</span>
                  </p>
                </div>
              </div>

              {/* 4C. 同旁內角 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4C</span>
                  同旁內角
                  <span className="text-sm text-red-500 font-normal">（C/U 形 → 180°）</span>
                </h3>
                <div className="bg-red-50 rounded-lg p-3 border border-red-200 flex-1">
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
                    <text x="23" y="55" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                    <text x="265" y="55" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                    <text x="40" y="90" fontSize="16" fill="#334155" fontStyle="italic">C</text>
                    <text x="250" y="90" fontSize="16" fill="#334155" fontStyle="italic">D</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    <span className="bg-white border rounded px-2 py-0.5 text-sm text-blue-900 font-bold">(同旁內角, AB//CD)</span>
                  </p>
                </div>
              </div>

              {/* 5. 三角形內角和 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">5</span>
                  三角形內角和
                  <span className="text-sm text-red-500 font-normal">（△ → 180°）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
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
                        <text x="69" y="73" fontSize="10" fill="#334155" fontStyle="italic">2x</text>
                      </svg>
                      <div className="text-sm text-slate-700 grid grid-cols-[auto_auto_1fr] gap-x-2">
                        <div className="text-right">2x</div>
                        <div className="text-center">=</div>
                        <div className="text-left">180° - 50° - 70°</div>
                        
                        <div className="text-right">2x</div>
                        <div className="text-center">=</div>
                        <div className="text-left">60°</div>
                        
                        <div className="text-right">x</div>
                        <div className="text-center">=</div>
                        <div className="text-left">30°</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(△內角和)</span>
                  </p>
                </div>
              </div>

              {/* 6. 等腰三角形底角 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">6</span>
                  等腰三角形底角
                  <span className="text-sm text-red-500 font-normal">（等腰△ → 底角相等）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
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
                    <text x="145" y="14" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                    <text x="60" y="125" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                    <text x="230" y="125" fontSize="16" fill="#334155" fontStyle="italic">C</text>
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
                        <div className="grid grid-cols-[auto_auto_1fr] gap-x-2">
                          <div className="text-right">x</div>
                          <div className="text-center">=</div>
                          <div className="text-left">180° - 67° - 67°</div>
                          
                          <div className="text-right">x</div>
                          <div className="text-center">=</div>
                          <div className="text-left">46°</div>
                        </div>
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
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">7</span>
                  等角對邊相等
                  <span className="text-sm text-slate-500 font-normal">（等底角 → 等腰）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
                  <p className="text-center text-xl font-bold text-green-800 my-1">若 ∠B = ∠C，則 AB = AC</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="150,20 80,120 220,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <path d="M 100 120 A 20 20 0 0 0 91.5 103.6" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 106 120 A 26 26 0 0 0 94.9 98.7" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 200 120 A 20 20 0 0 1 208.5 103.6" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 194 120 A 26 26 0 0 1 205.1 98.7" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <line x1="105" y1="70" x2="120" y2="78" stroke="#ef4444" strokeWidth="2" />
                    <line x1="180" y1="78" x2="195" y2="70" stroke="#ef4444" strokeWidth="2" />
                    <text x="145" y="14" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                    <text x="60" y="125" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                    <text x="230" y="125" fontSize="16" fill="#334155" fontStyle="italic">C</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(等角對邊相等)</span>
                  </p>
                </div>
              </div>

              {/* 8. 三角形外角 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">8</span>
                  三角形外角
                  <span className="text-sm text-slate-500 font-normal">（外角 = 內對角之和）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
                  <p className="text-center text-xl font-bold text-green-800 my-1">其中 d = a + b</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="170,20 80,120 220,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    <line x1="220" y1="120" x2="280" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 160.0 31.1 A 15 15 0 0 0 176.7 33.4" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 100.0 120.0 A 20 20 0 0 0 93.4 105.1" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 213.3 106.6 A 15 15 0 0 1 235.0 120.0" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <text x="163" y="49" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                    <text x="102" y="114" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                    <text x="228.1" y="103.7" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">d</text>
                    <text x="165" y="14" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                    <text x="60" y="125" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                    <text x="215" y="138" fontSize="16" fill="#334155" fontStyle="italic">C</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(△外角)</span>
                  </p>
                </div>
              </div>

              {/* 9. 等腰三角形性質 */}
              <div className="md:col-span-2 flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">9</span>
                  等腰三角形性質
                  <span className="text-sm text-slate-500 font-normal">（頂角平分線、底邊中線、底邊高線：三線合一）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* case 1 */}
                    <div className="text-center">
                      <p className="text-sm text-slate-700 mb-2">若 <b>AB = AC</b> 及 <b>BM = CM</b></p>
                      <svg viewBox="0 0 160 140" className="w-full max-w-[120px] mx-auto my-1 touch-none">
                        <polygon points="80,20 30,120 130,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        <line x1="80" y1="20" x2="80" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="59.5" y1="67.8" x2="50.5" y2="72.2" stroke="#ef4444" strokeWidth="2" />
                        <line x1="100.5" y1="72.2" x2="109.5" y2="67.8" stroke="#ef4444" strokeWidth="2" />
                        <line x1="57" y1="115" x2="57" y2="125" stroke="#ef4444" strokeWidth="2" />
                        <line x1="53" y1="115" x2="53" y2="125" stroke="#ef4444" strokeWidth="2" />
                        <line x1="107" y1="115" x2="107" y2="125" stroke="#ef4444" strokeWidth="2" />
                        <line x1="103" y1="115" x2="103" y2="125" stroke="#ef4444" strokeWidth="2" />
                        <text x="75" y="14" fontSize="14" fill="#334155" fontStyle="italic">A</text>
                        <text x="15" y="125" fontSize="14" fill="#334155" fontStyle="italic">B</text>
                        <text x="135" y="125" fontSize="14" fill="#334155" fontStyle="italic">C</text>
                        <text x="74" y="135" fontSize="14" fill="#334155" fontStyle="italic">M</text>
                      </svg>
                      <p className="text-sm text-blue-800 font-bold">則 AM ⊥ BC 及 x = y</p>
                    </div>

                    {/* case 2 */}
                    <div className="text-center md:border-l md:border-green-200">
                      <p className="text-sm text-slate-700 mb-2">若 <b>AB = AC</b> 及 <b>AM ⊥ BC</b></p>
                      <svg viewBox="0 0 160 140" className="w-full max-w-[120px] mx-auto my-1 touch-none">
                        <polygon points="80,20 30,120 130,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        <line x1="80" y1="20" x2="80" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="59.5" y1="67.8" x2="50.5" y2="72.2" stroke="#ef4444" strokeWidth="2" />
                        <line x1="100.5" y1="72.2" x2="109.5" y2="67.8" stroke="#ef4444" strokeWidth="2" />
                        <polyline points="70,120 70,110 80,110" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                        <text x="75" y="14" fontSize="14" fill="#334155" fontStyle="italic">A</text>
                        <text x="15" y="125" fontSize="14" fill="#334155" fontStyle="italic">B</text>
                        <text x="135" y="125" fontSize="14" fill="#334155" fontStyle="italic">C</text>
                        <text x="74" y="135" fontSize="14" fill="#334155" fontStyle="italic">M</text>
                      </svg>
                      <p className="text-sm text-blue-800 font-bold">則 BM = CM 及 x = y</p>
                    </div>

                    {/* case 3 */}
                    <div className="text-center md:border-l md:border-green-200">
                      <p className="text-sm text-slate-700 mb-2">若 <b>AB = AC</b> 及 <b>x = y</b></p>
                      <svg viewBox="0 0 160 140" className="w-full max-w-[120px] mx-auto my-1 touch-none">
                        <polygon points="80,20 30,120 130,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        <line x1="80" y1="20" x2="80" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="59.5" y1="67.8" x2="50.5" y2="72.2" stroke="#ef4444" strokeWidth="2" />
                        <line x1="100.5" y1="72.2" x2="109.5" y2="67.8" stroke="#ef4444" strokeWidth="2" />
                        <path d="M 71.1 37.9 A 20 20 0 0 0 80.0 40.0" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                        <path d="M 80.0 40.0 A 20 20 0 0 0 88.9 37.9" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                        <text x="67.6" y="56.1" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
                        <text x="82.4" y="56.1" fontSize="12" fill="#1e3a8a" fontStyle="italic">y</text>
                        <text x="75" y="14" fontSize="14" fill="#334155" fontStyle="italic">A</text>
                        <text x="15" y="125" fontSize="14" fill="#334155" fontStyle="italic">B</text>
                        <text x="135" y="125" fontSize="14" fill="#334155" fontStyle="italic">C</text>
                        <text x="74" y="135" fontSize="14" fill="#334155" fontStyle="italic">M</text>
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
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">10</span>
                  等邊三角形性質
                  <span className="text-sm text-slate-500 font-normal">（三邊等長 ⟷ 三角均 60°）</span>
                </h3>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
                  <p className="text-center text-xl font-bold text-green-800 my-1">若 AB = BC = AC</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="150,25 95,120 205,120" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    {/* Tick marks on edges */}
                    <line x1="118.2" y1="70.0" x2="126.8" y2="75.0" stroke="#ef4444" strokeWidth="2" />
                    <line x1="173.2" y1="75.0" x2="181.8" y2="70.0" stroke="#ef4444" strokeWidth="2" />
                    <line x1="150.0" y1="115.0" x2="150.0" y2="125.0" stroke="#ef4444" strokeWidth="2" />
                    
                    <path d="M 140.0 42.3 A 20 20 0 0 0 160.0 42.3" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 115.0 120.0 A 20 20 0 0 0 105.0 102.7" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 195.0 102.7 A 20 20 0 0 0 185.0 120.0" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    
                    <text x="141" y="58" fontSize="12" fill="#1e3a8a">60°</text>
                    <text x="115" y="115" fontSize="12" fill="#1e3a8a">60°</text>
                    <text x="168" y="115" fontSize="12" fill="#1e3a8a">60°</text>
                    
                    <text x="145" y="18" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                    <text x="80" y="125" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                    <text x="210" y="125" fontSize="16" fill="#334155" fontStyle="italic">C</text>
                  </svg>
                  <p className="text-center font-bold text-blue-800 my-1">則 ∠A = ∠B = ∠C = 60°</p>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(等邊△性質)</span>
                  </p>
                </div>
              </div>

              {/* 11. 多邊形內角和 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">11</span>
                  多邊形內角和
                  <span className="text-sm text-slate-500 font-normal">（n 邊形內角和）</span>
                </h3>
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200 flex-1">
                  <p className="text-center text-xl font-bold text-orange-800 my-1">內角和 = (n - 2) × 180°</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="120,30 200,20 250,70 230,120 70,90" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    
                    <path d="M 112.3 39.2 A 12 12 0 0 0 131.9 28.5" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 188.1 21.5 A 12 12 0 0 0 208.5 28.5" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 241.5 61.5 A 12 12 0 0 0 245.5 81.1" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 234.5 108.9 A 12 12 0 0 0 218.2 117.8" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 81.8 92.2 A 12 12 0 0 0 77.7 80.8" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    
                    <text x="125.6" y="52" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
                    <text x="187.9" y="45.8" fontSize="12" fill="#1e3a8a">133°</text>
                    <text x="212.0" y="76.0" fontSize="12" fill="#1e3a8a">120°</text>
                    <text x="214.4" y="105.7" fontSize="12" fill="#1e3a8a">80°</text>
                    <text x="85.7" y="87.6" fontSize="12" fill="#1e3a8a">77°</text>
                  </svg>
                  <div className="bg-white rounded p-3 mt-2 border border-slate-200">
                    <p className="text-sm text-orange-800 font-bold mb-2">例子（五邊形, n=5）：</p>
                    <div className="text-sm text-slate-700 grid grid-cols-[1fr_auto_1fr] gap-x-2">
                      <div className="text-right">x + 77° + 80° + 120° + 133°</div>
                      <div className="text-center">=</div>
                      <div className="text-left">(5 - 2) × 180°</div>
                      
                      <div className="text-right">x + 410°</div>
                      <div className="text-center">=</div>
                      <div className="text-left">540°</div>
                      
                      <div className="text-right">x</div>
                      <div className="text-center">=</div>
                      <div className="text-left">130°</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-orange-900">(多邊形內角和)</span>
                  </p>
                </div>
              </div>

              {/* 12. 多邊形外角和 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">12</span>
                  多邊形外角和
                  <span className="text-sm text-slate-500 font-normal">（外角總和 = 360°）</span>
                </h3>
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200 flex-1">
                  <p className="text-center text-xl font-bold text-orange-800 my-1">外角和 = 360°</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <polygon points="130,40 120,90 200,110 260,60" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    
                    <line x1="130" y1="40" x2="91" y2="34" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="120" y1="90" x2="114" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="200" y1="110" x2="240" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="260" y1="60" x2="284" y2="40" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    
                    <path d="M 118.1 38.2 A 12 12 0 0 0 127.6 51.8" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 117.6 101.8 A 12 12 0 0 0 131.6 92.9" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 211.6 112.9 A 12 12 0 0 0 209.2 102.3" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 269.2 52.3 A 12 12 0 0 0 248.1 58.2" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    
                    <text x="103.0" y="57.6" fontSize="12" fill="#1e3a8a">95°</text>
                    <text x="126.8" y="113.6" fontSize="12" fill="#1e3a8a">76°</text>
                    <text x="216.4" y="110.1" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
                    <text x="248.6" y="41.9" fontSize="12" fill="#1e3a8a">114°</text>

                    <text x="135" y="32" fontSize="14" fill="#334155" fontStyle="italic">A</text>
                    <text x="100" y="85" fontSize="14" fill="#334155" fontStyle="italic">B</text>
                    <text x="195" y="125" fontSize="14" fill="#334155" fontStyle="italic">C</text>
                    <text x="265" y="75" fontSize="14" fill="#334155" fontStyle="italic">D</text>
                  </svg>
                  <div className="bg-white rounded p-3 mt-2 border border-slate-200">
                    <p className="text-sm text-orange-800 font-bold mb-2">例子（四邊形 ABCD）：</p>
                    <div className="text-sm text-slate-700 grid grid-cols-[1fr_auto_1fr] gap-x-2">
                      <div className="text-right">x + 76° + 95° + 114°</div>
                      <div className="text-center">=</div>
                      <div className="text-left">360°</div>
                      
                      <div className="text-right">x + 285°</div>
                      <div className="text-center">=</div>
                      <div className="text-left">360°</div>
                      
                      <div className="text-right">x</div>
                      <div className="text-center">=</div>
                      <div className="text-left">75°</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-orange-900">(多邊形外角和)</span>
                  </p>
                </div>
              </div>

              </div>{/* end full theorems grid */}

              {/* F5 section label */}
              <div className="flex items-center gap-2 mt-8 mb-4">
                <span className="bg-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full">F5</span>
                <span className="text-slate-500 text-sm">圓形性質</span>
                <div className="flex-1 border-t border-slate-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* 13. 圓心角兩倍於圓周角 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">13</span>
                  圓心角兩倍於圓周角
                  <span className="text-sm text-pink-500 font-normal">（必記！）</span>
                </h3>
                <div className="bg-pink-50 rounded-lg p-3 border border-pink-200 flex-1">
                  <p className="text-center text-xl font-bold text-pink-800 my-1">x = 2y</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-sm mx-auto my-3 touch-none">
                    <g transform="translate(0, 10)">
                      <circle cx="50" cy="60" r="40" stroke="#334155" strokeWidth="1.5" fill="none" />
                      <circle cx="50" cy="60" r="2" fill="#334155" />
                      <polygon points="26.5,92.4 50,20 73.5,92.4 50,60" stroke="#334155" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                      <line x1="26.5" y1="92.4" x2="50" y2="60" stroke="#334155" strokeWidth="1.5" />
                      <line x1="73.5" y1="92.4" x2="50" y2="60" stroke="#334155" strokeWidth="1.5" />
                      <path d="M 44.5 28 A 9 9 0 0 0 55.5 28" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                      <path d="M 40 68 A 12 12 0 0 0 60 68" fill="none" stroke="#eab308" strokeWidth="1.5" />
                      <text x="14" y="102" fontSize="12" fill="#334155" fontStyle="italic">A</text>
                      <text x="80" y="102" fontSize="12" fill="#334155" fontStyle="italic">B</text>
                      <text x="46" y="15" fontSize="12" fill="#334155" fontStyle="italic">C</text>
                      <text x="50" y="54" fontSize="12" fill="#334155" fontStyle="italic" textAnchor="middle">O</text>
                      <text x="48" y="40" fontSize="10" fill="#2563eb" fontStyle="italic">y</text>
                      <text x="48" y="85" fontSize="10" fill="#eab308" fontStyle="italic">x</text>
                    </g>
                    <g transform="translate(100, 10)">
                      <circle cx="50" cy="60" r="40" stroke="#334155" strokeWidth="1.5" fill="none" />
                      <circle cx="50" cy="60" r="2" fill="#334155" />
                      <polygon points="73.5,92.4 26.5,27.6 10,60 50,60" stroke="#334155" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                      <line x1="10" y1="60" x2="50" y2="60" stroke="#334155" strokeWidth="1.5" />
                      <line x1="73.5" y1="92.4" x2="50" y2="60" stroke="#334155" strokeWidth="1.5" />
                      <path d="M 22 36 A 9 9 0 0 0 32.5 32.5" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                      <path d="M 38 60 A 12 12 0 0 0 43 69" fill="none" stroke="#eab308" strokeWidth="1.5" />
                      <text x="78" y="104" fontSize="12" fill="#334155" fontStyle="italic">B</text>
                      <text x="-1" y="64" fontSize="12" fill="#334155" fontStyle="italic">A</text>
                      <text x="18" y="24" fontSize="12" fill="#334155" fontStyle="italic">C</text>
                      <text x="54" y="56" fontSize="12" fill="#334155" fontStyle="italic" textAnchor="middle">O</text>
                      <text x="32" y="50" fontSize="10" fill="#2563eb" fontStyle="italic">y</text>
                      <text x="32" y="76" fontSize="10" fill="#eab308" fontStyle="italic">x</text>
                    </g>
                    <g transform="translate(200, 10)">
                      <circle cx="50" cy="60" r="40" stroke="#334155" strokeWidth="1.5" fill="none" />
                      <circle cx="50" cy="60" r="2" fill="#334155" />
                      <path d="M 12 72.4 L 88 66.4 L 30 94.6 Z" stroke="#334155" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                      <line x1="12" y1="72.4" x2="50" y2="60" stroke="#334155" strokeWidth="1.5" />
                      <line x1="30" y1="94.6" x2="50" y2="60" stroke="#334155" strokeWidth="1.5" />
                      <line x1="88" y1="66.4" x2="50" y2="60" stroke="#334155" strokeWidth="1.5" />
                      <path d="M 80 68 A 9 9 0 0 0 81 71" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                      <path d="M 40 55 A 12 12 0 0 0 54 72" fill="none" stroke="#eab308" strokeWidth="1.5" />
                      <text x="2" y="75" fontSize="12" fill="#334155" fontStyle="italic">A</text>
                      <text x="24" y="108" fontSize="12" fill="#334155" fontStyle="italic">B</text>
                      <text x="94" y="68" fontSize="12" fill="#334155" fontStyle="italic">C</text>
                      <text x="54" y="54" fontSize="12" fill="#334155" fontStyle="italic" textAnchor="middle">O</text>
                      <text x="70" y="74" fontSize="10" fill="#2563eb" fontStyle="italic">y</text>
                      <text x="35" y="70" fontSize="10" fill="#eab308" fontStyle="italic">x</text>
                    </g>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-pink-900">(圓心角兩倍於圓周角)</span>
                  </p>
                </div>
              </div>

              {/* 14. 半圓上的圓周角 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">14</span>
                  半圓上的圓周角
                  <span className="text-sm text-pink-500 font-normal">（直徑 → 90°）</span>
                </h3>
                <div className="bg-pink-50 rounded-lg p-3 border border-pink-200 flex-1">
                  <p className="text-center text-xl font-bold text-pink-800 my-1">若 AB 為直徑，則 ∠APB = 90°</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <circle cx="150" cy="80" r="50" stroke="#334155" strokeWidth="2" fill="none" />
                    <circle cx="150" cy="80" r="3" fill="#334155" />
                    <line x1="100" y1="80" x2="200" y2="80" stroke="#16a34a" strokeWidth="2" />
                    <polygon points="100,80 175,36.7 200,80" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinejoin="round" />
                    
                    <!-- Right angle marker -->
                    <path d="M 166.3 41.7 L 171.3 50.4 L 180 45.4" stroke="#ea580c" strokeWidth="1.5" fill="none" />
                    <rect x="169" y="44" width="3" height="3" fill="#ea580c" transform="rotate(30 170.5 45.5)" />

                    <text x="145" y="98" fontSize="12" fill="#334155" fontStyle="italic">O</text>
                    <text x="85" y="85" fontSize="12" fill="#334155" fontStyle="italic">A</text>
                    <text x="205" y="85" fontSize="12" fill="#334155" fontStyle="italic">B</text>
                    <text x="175" y="26" fontSize="12" fill="#334155" fontStyle="italic">P</text>
                  </svg>
                  <div className="bg-white rounded p-3 mt-2 border border-slate-200">
                    <p className="text-sm text-pink-800 font-bold text-center">關鍵字眼：直徑 → 90°</p>
                    <p className="text-xs text-slate-500 text-center mt-1">逆定理：若 ∠APB = 90°，則 AB 為直徑。</p>
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-pink-900">(半圓上的圓周角)</span>
                  </p>
                </div>
              </div>

              {/* 15. 同弓形內的圓周角 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">15</span>
                  同弓形內的圓周角
                  <span className="text-sm text-slate-500 font-normal">（同一弦拉出的角）</span>
                </h3>
                <div className="bg-pink-50 rounded-lg p-3 border border-pink-200 flex-1">
                  <p className="text-center text-xl font-bold text-pink-800 my-1">x = y</p>
                  <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                    <!-- Segment fill -->
                    <path d="M 102 106.6 A 60 60 0 1 1 198 106.6 L 102 106.6 Z" fill="#dcfce3" />
                    <path d="M 102 106.6 A 60 60 0 0 0 198 106.6 L 102 106.6 Z" fill="#fce7f3" />
                    
                    <circle cx="150" cy="70" r="60" stroke="#334155" strokeWidth="1.5" fill="none" />
                    <line x1="102" y1="106.6" x2="198" y2="106.6" stroke="#22c55e" strokeWidth="2" />
                    
                    <polygon points="102,106.6 112,23.3 198,106.6" stroke="#334155" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                    <polygon points="102,106.6 182,19 198,106.6" stroke="#334155" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                    
                    <path d="M 115 38 A 12 12 0 0 1 123 32" stroke="#2563eb" strokeWidth="1.5" fill="none" />
                    <path d="M 170 33 A 12 12 0 0 1 179 40" stroke="#2563eb" strokeWidth="1.5" fill="none" />

                    <text x="119" y="47" fontSize="12" fill="#2563eb" fontStyle="italic">x</text>
                    <text x="170" y="48" fontSize="12" fill="#2563eb" fontStyle="italic">y</text>
                    
                    <text x="90" y="120" fontSize="12" fill="#334155" fontStyle="italic">A</text>
                    <text x="202" y="120" fontSize="12" fill="#334155" fontStyle="italic">B</text>
                    <text x="100" y="18" fontSize="12" fill="#334155" fontStyle="italic">C</text>
                    <text x="185" y="12" fontSize="12" fill="#334155" fontStyle="italic">D</text>
                    <circle cx="195" cy="110" r="4" fill="#ef4444" />

                    <text x="115" y="70" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
                    <text x="171" y="65" fontSize="12" fill="#1e3a8a" fontStyle="italic">y</text>

                    <text x="90" y="125" fontSize="14" fill="#334155" fontStyle="italic">A</text>
                    <text x="205" y="125" fontSize="14" fill="#334155" fontStyle="italic">B</text>
                    <text x="85" y="45" fontSize="14" fill="#334155" fontStyle="italic">P</text>
                    <text x="200" y="35" fontSize="14" fill="#334155" fontStyle="italic">Q</text>
                  </svg>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-pink-900">(同弓形內的圓周角)</span>
                  </p>
                </div>
              </div>

              {/* 16. 等角/弧/弦 的組合 */}
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">16</span>
                  等角對等弧/弦
                  <span className="text-sm text-slate-500 font-normal">（角、弧、弦有互相相等的關係）</span>
                </h3>
                <div className="bg-pink-50 rounded-lg p-3 border border-pink-200 flex-1 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
                    <svg viewbox="0 0 160 140" className="w-[140px] touch-none">
                      <!-- Fill for sectors -->
                      <path d="M 80 70 L 32.5 35.8 A 58 58 0 0 0 32.5 104.2 Z" fill="#fef08a" opacity="0.4" />
                      <path d="M 80 70 L 127.5 35.8 A 58 58 0 0 1 127.5 104.2 Z" fill="#fef08a" opacity="0.4" />
                      <!-- Main Circle -->
                      <circle cx="80" cy="70" r="58" stroke="#334155" strokeWidth="1.5" fill="none" />
                      <circle cx="80" cy="70" r="3" fill="#334155" />
                      <!-- Radii -->
                      <line x1="80" y1="70" x2="32.5" y2="35.8" stroke="#334155" strokeWidth="1.5" />
                      <line x1="80" y1="70" x2="32.5" y2="104.2" stroke="#334155" strokeWidth="1.5" />
                      <line x1="80" y1="70" x2="127.5" y2="35.8" stroke="#334155" strokeWidth="1.5" />
                      <line x1="80" y1="70" x2="127.5" y2="104.2" stroke="#334155" strokeWidth="1.5" />
                      <!-- Chords -->
                      <line x1="32.5" y1="35.8" x2="32.5" y2="104.2" stroke="#eab308" strokeWidth="2" />
                      <line x1="127.5" y1="35.8" x2="127.5" y2="104.2" stroke="#eab308" strokeWidth="2" />
                      <line x1="28" y1="67" x2="37" y2="73" stroke="#eab308" strokeWidth="1.5" />
                      <line x1="28" y1="73" x2="37" y2="67" stroke="#eab308" strokeWidth="1.5" />
                      <line x1="123" y1="67" x2="132" y2="73" stroke="#eab308" strokeWidth="1.5" />
                      <line x1="123" y1="73" x2="132" y2="67" stroke="#eab308" strokeWidth="1.5" />
                      <!-- Arc marks -->
                      <path d="M 32.5 35.8 A 58 58 0 0 0 32.5 104.2" fill="none" stroke="#ef4444" strokeWidth="3" />
                      <path d="M 127.5 35.8 A 58 58 0 0 1 127.5 104.2" fill="none" stroke="#ef4444" strokeWidth="3" />
                      <path d="M 4 67 A 62 62 0 0 0 4 73" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                      <path d="M 7 67 A 62 62 0 0 0 7 73" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                      <path d="M 153 67 A 62 62 0 0 1 153 73" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                      <path d="M 156 67 A 62 62 0 0 1 156 73" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                      <path d="M 66 60 A 17 17 0 0 0 66 80" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
                      <path d="M 94 60 A 17 17 0 0 1 94 80" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
                      <text x="54" y="74" fontSize="12" fill="#3b82f6" fontStyle="italic">x</text>
                      <text x="98" y="74" fontSize="12" fill="#3b82f6" fontStyle="italic">x</text>
                      <!-- Labels -->
                      <text x="16" y="32" fontSize="14" fill="#334155" fontStyle="italic">A</text>
                      <text x="16" y="116" fontSize="14" fill="#3334155" fontStyle="italic">B</text>
                      <text x="136" y="32" fontSize="14" fill="#334155" fontStyle="italic">D</text>
                      <text x="136" y=!116" fontSize="14" fill="#334155" fontStyle="italic">C</text>
                      <text x="75" y="58" fontSize="14" fill="#334155" fontStyle="italic">O</text>
                    </svg>
                    </svg>
                    <div className="text-sm text-pink-900 border-l-2 border-pink-300 pl-3">
                      <p className="font-bold">以下三項中，若一成立，則其餘兩項亦成立：</p>
                      <ul className="list-decimal pl-4 mt-2 space-y-1">
                        <li>∠AOB = ∠COD (角)</li>
                        <li>弦 AB = 弦 CD (弦)</li>
                        <li>弧 AB = 弧 CD (弧)</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-pink-900">(等角/弧/弦的互相轉換)</span>
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
