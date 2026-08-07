import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, ChevronDown, ChevronRight } from 'lucide-react';
import { NOTES_DATA, NOTES_COMPONENTS, getNotesForLevel } from '../notes/notesData';

// ========================================
// Notes 主頁面
// ========================================
const Notes = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestedTopic = searchParams.get('topic');
  const isPrintMode = searchParams.get('print') === '1';
  const isPrintPreview = isPrintMode && searchParams.get('preview') === '1';
  const printLevel = searchParams.get('level');
  const printGroup = searchParams.get('group');

  const seniorLevels = ['F4', 'F5', 'F6'];
  const printableJuniorLevels = ['F1', 'F2', 'F3'];
  const printLevels = printGroup === 'senior'
    ? seniorLevels
    : (printLevel && printableJuniorLevels.includes(printLevel) ? [printLevel] : []);
  const printTopics = printLevels.flatMap((lvl) =>
    (NOTES_DATA[lvl] || []).map((topic) => ({ ...topic, _level: lvl }))
  );

  const getInitialState = () => {
    if (requestedTopic) {
      for (const [lvl, topics] of Object.entries(NOTES_DATA)) {
        const found = topics.find(t => t.id === requestedTopic);
        if (found) {
          return {
            level: lvl,
            topic: found.id,
            subtopic: found.subtopics && found.subtopics.length > 0 ? found.subtopics[0].id : null
          };
        }
      }
    }
    return { level: 'F1', topic: null, subtopic: null };
  };

  const initState = getInitialState();

  const [selectedLevel, setSelectedLevel] = useState(initState.level);
  const [expandedTopics, setExpandedTopics] = useState(initState.topic ? { [initState.topic]: true } : {});
  const [activeTopic, setActiveTopic] = useState(initState.topic);
  const [activeSubtopic, setActiveSubtopic] = useState(initState.subtopic);
  const [pdfUrl, setPdfUrl] = useState('');

  const levels = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', '高中甲(一)'];
  const notes = getNotesForLevel(selectedLevel);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      if (initState.topic) return;
    }
    const levelNotes = getNotesForLevel(selectedLevel);
    if (levelNotes.length > 0) {
      const firstTopic = levelNotes[0];
      setActiveTopic(firstTopic.id);
      setActiveSubtopic(firstTopic.subtopics.length > 0 ? firstTopic.subtopics[0].id : null);
      const expanded = {};
      levelNotes.forEach(t => { expanded[t.id] = false; });
      setExpandedTopics(expanded);
    } else {
      setActiveTopic(null);
      setActiveSubtopic(null);
      setExpandedTopics({});
    }
  }, [selectedLevel]);

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const selectTopic = (topicId) => {
    setActiveTopic(topicId);
    const topic = notes.find(t => t.id === topicId);
    setActiveSubtopic(topic && topic.subtopics.length > 0 ? topic.subtopics[0].id : null);
    setExpandedTopics(prev => ({ ...prev, [topicId]: true }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectSubtopic = (topicId, subId) => {
    setActiveTopic(topicId);
    setActiveSubtopic(subId);
    setExpandedTopics(prev => ({ ...prev, [topicId]: true }));
  };

  const navigateTo = (level, topicId, subId) => {
    setSelectedLevel(level);
    setTimeout(() => {
      setActiveTopic(topicId);
      setActiveSubtopic(subId);
      setExpandedTopics(prev => ({ ...prev, [topicId]: true }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const ActiveComponent = activeTopic ? NOTES_COMPONENTS[activeTopic] : null;

  const handlePdfImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPdfUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return URL.createObjectURL(file);
    });
  };

  const colorMap = {
    purple: { activeBg: 'bg-purple-100', activeText: 'text-purple-700', activeBorder: 'border-purple-500', numActive: 'bg-purple-500 text-white', numInactive: 'bg-purple-100 text-purple-600' },
    blue: { activeBg: 'bg-blue-100', activeText: 'text-blue-700', activeBorder: 'border-blue-500', numActive: 'bg-blue-500 text-white', numInactive: 'bg-blue-100 text-blue-600' },
    green: { activeBg: 'bg-green-100', activeText: 'text-green-700', activeBorder: 'border-green-500', numActive: 'bg-green-500 text-white', numInactive: 'bg-green-100 text-green-600' },
    red: { activeBg: 'bg-red-100', activeText: 'text-red-700', activeBorder: 'border-red-500', numActive: 'bg-red-500 text-white', numInactive: 'bg-red-100 text-red-600' },
    teal: { activeBg: 'bg-teal-100', activeText: 'text-teal-700', activeBorder: 'border-teal-500', numActive: 'bg-teal-500 text-white', numInactive: 'bg-teal-100 text-teal-600' },
    orange: { activeBg: 'bg-orange-100', activeText: 'text-orange-700', activeBorder: 'border-orange-500', numActive: 'bg-orange-500 text-white', numInactive: 'bg-orange-100 text-orange-600' },
    indigo: { activeBg: 'bg-indigo-100', activeText: 'text-indigo-700', activeBorder: 'border-indigo-500', numActive: 'bg-indigo-500 text-white', numInactive: 'bg-indigo-100 text-indigo-600' },
  };

  const renderTOC = (isMobile = false) => {
    if (notes.length === 0) return <p className="text-sm text-slate-400 text-center py-4">暫無筆記</p>;

    return (
      <nav className="space-y-1">
        {notes.map((topic) => {
          const isExpanded = expandedTopics[topic.id];
          const isActive = activeTopic === topic.id;
          const tc = colorMap[topic.color] || colorMap.blue;

          return (
            <div key={topic.id}>
              <button
                onClick={() => {
                  if (isActive && isExpanded) {
                    toggleTopic(topic.id);
                  } else {
                    selectTopic(topic.id);
                  }
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-2 text-sm font-bold ${
                  isActive ? `${tc.activeBg} ${tc.activeText}` : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                <span className="truncate">{topic.topic}</span>
              </button>
              {isExpanded && (
                <div className={`${isMobile ? 'ml-5' : 'ml-4'} mt-1 space-y-1`}>
                  {topic.subtopics.map((sub) => {
                    const sc = colorMap[sub.color] || colorMap.blue;
                    const isSubActive = activeTopic === topic.id && activeSubtopic === sub.id;
                    const displayTitle = sub.title.replace(/^\d+[A-Za-z]?[.．、)]\s*/, '');
                    return (
                      <button
                        key={sub.id}
                        onClick={() => selectSubtopic(topic.id, sub.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                          isSubActive
                            ? `${sc.activeBg} ${sc.activeText} font-bold border-l-4 ${sc.activeBorder}`
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs leading-none font-bold ${isSubActive ? sc.numActive : sc.numInactive}`}>
                          {sub.num}
                        </span>
                        <span className="truncate">{displayTitle}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  };

  if (isPrintMode) {
    return (
      <div className={`print-root min-h-screen bg-white px-4 py-6 md:px-8 ${isPrintPreview ? 'print-preview' : ''}`}>
        {isPrintPreview && (
          <div className="print-preview-toolbar sticky top-0 z-30 mx-auto mb-4 max-w-5xl rounded-xl border border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-slate-600">A4 Reader 預覽模式（每個 CH 另起一張 A4）</p>
              <div className="flex flex-wrap items-center gap-2">
                <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-50">
                  匯入 PDF 閱讀
                  <input type="file" accept="application/pdf,.pdf" onChange={handlePdfImport} className="sr-only" />
                </label>
                <button
                  onClick={() => window.print()}
                  className="rounded-lg bg-indigo-600 px-3 py-1.5 font-bold text-white hover:bg-indigo-700"
                >
                  列印 / 另存 PDF
                </button>
              </div>
            </div>
          </div>
        )}
        {isPrintPreview && pdfUrl && (
          <section className="pdf-reader-panel mx-auto mb-6 max-w-5xl overflow-hidden rounded-xl border border-slate-300 bg-slate-800 shadow-lg">
            <div className="flex items-center justify-between gap-3 border-b border-slate-600 px-4 py-2 text-sm text-white">
              <span>PDF 閱讀器（實際 A4 分頁）</span>
              <button
                onClick={() => {
                  URL.revokeObjectURL(pdfUrl);
                  setPdfUrl('');
                }}
                className="rounded-md px-2 py-1 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                關閉
              </button>
            </div>
            <iframe title="PDF 閱讀器" src={pdfUrl} className="pdf-reader-frame" />
          </section>
        )}
        {printTopics.length === 0 ? (
          <div className="max-w-3xl mx-auto border border-amber-300 bg-amber-50 text-amber-800 rounded-xl p-4">
            <h2 className="text-lg font-bold">列印模式參數無效</h2>
            <p className="mt-2 text-sm">初中請使用 ?print=1&level=F1/F2/F3；高中請使用 ?print=1&group=senior。</p>
          </div>
        ) : (
          printTopics.map((topic) => {
            const TopicComponent = NOTES_COMPONENTS[topic.id];
            if (!TopicComponent) return null;
            return (
              <section key={`${topic._level}-${topic.id}`} className="print-topic-page">
                <div className="print-topic-sheet">
                  <TopicComponent activeSub={null} onNavigate={() => {}} />
                  <footer className="print-page-footer">
                    <span>{topic._level} {topic.topic}</span>
                    <span className="print-page-number" aria-label="頁碼" />
                  </footer>
                </div>
              </section>
            );
          })
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 頂部導航 */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <HomeIcon className="w-5 h-5" />
            <span className="text-sm font-medium">返回主頁</span>
          </Link>
          <div className="text-indigo-600">
            <span className="font-bold text-lg">電子筆記 (測試編輯中)</span>
          </div>
          <div className="w-24" />
        </div>
      </div>

      {/* 級別選擇 */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <div className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-500 font-medium mr-2">級別：</span>
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedLevel === level
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* 左側目錄 */}
        <aside className="hidden md:block w-72 flex-shrink-0">
          <div className="sticky top-20 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <h3 className="font-bold text-slate-700 mb-4">目錄</h3>
              {renderTOC(false)}
            </div>
          </div>
        </aside>

        {/* 右側內容 */}
        <main className="flex-1 p-4 min-w-0">
          {/* 手機版目錄 */}
          <div className="md:hidden mb-4">
            <div className="bg-white rounded-xl shadow-sm p-3">
              <h3 className="font-bold text-slate-700 mb-2 text-sm">目錄</h3>
              {renderTOC(true)}
            </div>
          </div>

          {/* Notes 內容 */}
          {ActiveComponent ? (
            <ActiveComponent activeSub={activeSubtopic} onNavigate={navigateTo} />
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <h2 className="text-xl font-bold text-slate-400 mb-2">
                {notes.length === 0 ? '此級別暫無筆記' : '請從左側目錄選擇主題'}
              </h2>
              <p className="text-slate-400">
                {notes.length === 0 ? '筆記將會陸續加入，敬請期待！' : '點擊主題開始閱讀'}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Notes;
