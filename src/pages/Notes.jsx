import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, ChevronDown, ChevronRight } from 'lucide-react';
import { Previewer } from 'pagedjs';
import { NOTES_DATA, NOTES_COMPONENTS, getNotesForLevel } from '../notes/notesData';

const PrintTopicPages = ({ topic, TopicComponent, pageOffset = 0, onPageCount }) => {
  const measureRef = useRef(null);
  const [pages, setPages] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const source = measureRef.current;
      if (!source) return;

      const sheet = source.firstElementChild;
      if (!sheet || sheet.clientHeight === 0) return;
      const rootNodes = Array.from(sheet.children).filter((node) => node.tagName !== 'FOOTER');
      const initialNodes = rootNodes.length === 1 && rootNodes[0].children.length > 1
        ? Array.from(rootNodes[0].children)
        : rootNodes;
      const sheetStyles = window.getComputedStyle(sheet);
      const availableHeight = sheet.clientHeight
        - parseFloat(sheetStyles.paddingTop)
        - parseFloat(sheetStyles.paddingBottom);
      const expandOversizedNode = (node) => {
        const nodeStyles = window.getComputedStyle(node);
        const nodeHeight = node.getBoundingClientRect().height + parseFloat(nodeStyles.marginBottom || '0');
        const childNodes = Array.from(node.children).filter((child) => child.tagName !== 'FOOTER');
        if (nodeHeight > availableHeight && childNodes.length > 0) {
          const expandedNodes = childNodes.flatMap(expandOversizedNode);
          if (expandedNodes.length > 0 && expandedNodes.some((child) => child !== node)) {
            return expandedNodes;
          }
        }
        return [node];
      };
      const contentNodes = initialNodes.flatMap(expandOversizedNode);
      const isHeadingBlock = (node) => {
        const directChildren = Array.from(node.children);
        const hasDirectHeading = directChildren.some((child) => /^H[1-4]$/.test(child.tagName));
        const hasDirectChapterTitle = directChildren.some((child) => child.tagName === 'H1');
        const hasStructuralContent = directChildren.some((child) => ['DIV', 'SECTION', 'UL', 'OL'].includes(child.tagName));
        const hasDirectParagraph = directChildren.some((child) => child.tagName === 'P');
        return hasDirectChapterTitle || (hasDirectHeading && !hasStructuralContent && !hasDirectParagraph);
      };
      const pageUnits = [];
      let firstContentIndex = 0;
      const firstNodeIsChapterTitle = contentNodes[0]
        && Array.from(contentNodes[0].children).some((child) => child.tagName === 'H1');
      if (contentNodes.length > 1 && firstNodeIsChapterTitle) {
        const firstNodeIsSplitSectionHeading = contentNodes[1]
          && contentNodes.length > 2
          && contentNodes[1].querySelector(':scope > h2');
        const firstUnit = firstNodeIsSplitSectionHeading
          ? contentNodes.slice(0, 3)
          : contentNodes.slice(0, 2);
        pageUnits.push(firstUnit);
        firstContentIndex = firstUnit.length;
      }
      for (let nodeIndex = firstContentIndex; nodeIndex < contentNodes.length; nodeIndex += 1) {
        const node = contentNodes[nodeIndex];
        const isHeading = isHeadingBlock(node);
        const nextNode = contentNodes[nodeIndex + 1];
        const nextIsHeading = nextNode && isHeadingBlock(nextNode);
        if (isHeading && nextNode && !nextIsHeading) {
          pageUnits.push([node, nextNode]);
          nodeIndex += 1;
        } else {
          pageUnits.push([node]);
        }
      }
      const groups = [];
      let currentGroup = [];
      let currentHeight = 0;

      pageUnits.forEach((unit) => {
        const unitHeight = unit.reduce((height, node) => {
          const nodeStyles = window.getComputedStyle(node);
          return height + node.getBoundingClientRect().height + parseFloat(nodeStyles.marginBottom || '0');
        }, 0);
        if (currentGroup.length > 0 && currentHeight + unitHeight > availableHeight) {
          groups.push({ nodes: currentGroup, height: currentHeight });
          currentGroup = [];
          currentHeight = 0;
        }
        currentGroup.push(...unit.map((node) => node.outerHTML));
        currentHeight += unitHeight;
      });

      if (currentGroup.length > 0) groups.push({ nodes: currentGroup, height: currentHeight });

      const nextPages = groups.map((group) => ({
        html: group.nodes.join(''),
        scale: Math.min(1, availableHeight / group.height),
      }));
      setPages(nextPages);
      onPageCount(nextPages.length);
    }, 50);

    return () => window.clearTimeout(timer);
  }, [topic.id, TopicComponent, onPageCount]);

  return (
    <>
      <div ref={measureRef} className="print-pagination-measure" aria-hidden="true">
        <div className="print-topic-sheet">
          <TopicComponent activeSub={null} onNavigate={() => {}} />
        </div>
      </div>
      {pages && pages.map((page, pageIndex) => (
        <section key={`${topic.id}-page-${pageIndex}`} className="print-topic-page">
          <div className="print-topic-sheet">
            <div
              className="print-topic-page-content"
              style={{ transform: `scale(${page.scale})` }}
              dangerouslySetInnerHTML={{ __html: page.html }}
            />
            <footer className="print-page-footer">
              <span>{topic._level} {topic.topic}</span>
              <span className="print-page-number" aria-label="頁碼">p.{pageOffset + pageIndex + 1}</span>
            </footer>
          </div>
        </section>
      ))}
    </>
  );
};

const BookletPrintView = ({ topics, isPreview }) => {
  const sourceRef = useRef(null);
  const pagesRef = useRef(null);
  const [status, setStatus] = useState('正在整理頁面…');

  useEffect(() => {
    let cancelled = false;
    const renderBooklet = async () => {
      if (!sourceRef.current || !pagesRef.current) return;
      pagesRef.current.innerHTML = '';
      setStatus('正在分頁…');
      try {
        const previewer = new Previewer();
        await previewer.preview(sourceRef.current.innerHTML, [], pagesRef.current);
        const renderedPages = Array.from(pagesRef.current.querySelectorAll('.pagedjs_page'));
        let currentChapter = '';
        renderedPages.forEach((page, pageIndex) => {
          const chapterHeading = page.querySelector('.booklet-running-title');
          const tocPage = page.querySelector('.booklet-toc');
          if (chapterHeading) currentChapter = chapterHeading.textContent.trim();
          page.querySelectorAll('[id^="chapter-"]').forEach((chapter) => {
            const chapterId = chapter.id.replace(/^chapter-/, '');
            const tocLink = pagesRef.current.querySelector(`.booklet-toc a[href="#chapter-${chapterId}"]`);
            if (tocLink && !tocLink.querySelector('.booklet-toc-page-number')) {
              const pageNumber = document.createElement('span');
              pageNumber.className = 'booklet-toc-page-number';
              pageNumber.textContent = String(pageIndex + 1);
              tocLink.appendChild(pageNumber);
            }
          });
          const pageBox = page.querySelector('.pagedjs_pagebox');
          if (!pageBox) return;
          const headerText = tocPage ? '目錄' : currentChapter;
          if (headerText && !page.querySelector('.booklet-generated-header')) {
            const header = document.createElement('div');
            header.className = 'booklet-generated-header';
            header.textContent = headerText;
            pageBox.appendChild(header);
          }
          if (!page.querySelector('.booklet-generated-footer')) {
            const footer = document.createElement('div');
            footer.className = 'booklet-generated-footer';
            footer.textContent = `頁 ${pageIndex + 1} / ${renderedPages.length}`;
            pageBox.appendChild(footer);
          }
        });
        if (!cancelled) setStatus('已完成分頁');
      } catch (error) {
        if (!cancelled) setStatus('分頁失敗，請重新整理頁面');
        console.error('Paged.js preview failed', error);
      }
    };

    const timer = window.setTimeout(renderBooklet, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [topics]);

  return (
    <>
      {isPreview && <p className="booklet-status" aria-live="polite">{status}</p>}
      <div ref={sourceRef} className="booklet-source" aria-hidden="true">
        <section className="booklet-cover">
          <img className="booklet-logo" src="/school-logo.svg" alt="學校標誌" />
          <p className="booklet-kicker">數學自習天地</p>
          <h1>數學筆記小冊</h1>
          <p className="booklet-date">{new Intl.DateTimeFormat('zh-HK', { dateStyle: 'long' }).format(new Date())}</p>
        </section>

        <nav className="booklet-toc" aria-label="目錄">
          <h1>目錄</h1>
          <ol>
            {topics.map((topic) => (
              <li key={`toc-${topic.id}`}>
                <a href={`#chapter-${topic.id}`}>{topic.topic}</a>
              </li>
            ))}
          </ol>
        </nav>

        {topics.map((topic) => {
          const TopicComponent = NOTES_COMPONENTS[topic.id];
          if (!TopicComponent) return null;
          return (
            <article key={topic.id} id={`chapter-${topic.id}`} className="booklet-chapter">
              <h1 className="booklet-running-title">{topic.topic}</h1>
              <TopicComponent activeSub={null} onNavigate={() => {}} />
            </article>
          );
        })}
      </div>
      <div ref={pagesRef} className="booklet-pages" />
    </>
  );
};

// ========================================
// Notes 主頁面
// ========================================
const Notes = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isCleanPrintPath = location.pathname === '/notes/print';
  const requestedTopic = searchParams.get('topic');
  const isPrintMode = isCleanPrintPath || searchParams.get('print') === '1';
  const isPrintPreview = isCleanPrintPath || (isPrintMode && searchParams.get('preview') === '1');
  const printLevel = searchParams.get('level');
  const printGroup = searchParams.get('group');
  const seniorLevels = ['F4', 'F5', 'F6'];
  const printableJuniorLevels = ['F1', 'F2', 'F3'];
  const initialPrintSelection = printGroup === 'senior'
    ? 'senior'
    : (printLevel && printableJuniorLevels.includes(printLevel) ? printLevel : 'F1');

  const [printSelection, setPrintSelection] = useState(initialPrintSelection);
  const printLevels = printSelection === 'senior'
    ? seniorLevels
    : [printSelection];
  const printTopics = printLevels.flatMap((lvl) =>
    (NOTES_DATA[lvl] || []).map((topic) => ({ ...topic, _level: lvl }))
  );
  const bookletIds = (searchParams.get('ids') || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const allBookletTopics = Object.entries(NOTES_DATA).flatMap(([lvl, topics]) =>
    topics.map((topic) => ({ ...topic, _level: lvl }))
  );
  const bookletTopics = bookletIds.length > 0
    ? bookletIds.map((id) => {
      const numericId = Number(id);
      return Number.isInteger(numericId) && numericId > 0
        ? allBookletTopics[numericId - 1]
        : allBookletTopics.find((topic) => topic.id === id);
    }).filter(Boolean)
    : printTopics;

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
      <div className={`print-root booklet-print-root min-h-screen bg-white px-4 py-6 md:px-8 ${isPrintPreview ? 'print-preview' : ''}`}>
        {isPrintPreview && (
          <div className="print-preview-toolbar sticky top-0 z-30 mx-auto mb-4 max-w-5xl rounded-xl border border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-slate-600">Paged.js booklet 預覽 · {bookletTopics.length} 章</p>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  ['F1', 'F1'],
                  ['F2', 'F2'],
                  ['F3', 'F3'],
                  ['senior', '高中'],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => {
                      window.history.replaceState({}, '', `/notes/print?${new URLSearchParams({ print: '1', preview: '1', ...(value === 'senior' ? { group: value } : { level: value }) })}`);
                      setPrintSelection(value);
                    }}
                    className={`rounded-lg border px-3 py-1.5 font-bold ${
                      printSelection === value
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => window.print()}
                  className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 font-bold text-emerald-800 hover:bg-emerald-100"
                >
                  高質素列印／另存 PDF
                </button>
              </div>
            </div>
          </div>
        )}
        {bookletTopics.length === 0 ? (
          <div className="max-w-3xl mx-auto border border-amber-300 bg-amber-50 text-amber-800 rounded-xl p-4">
            <h2 className="text-lg font-bold">列印模式參數無效</h2>
            <p className="mt-2 text-sm">請使用 /notes/print?ids=1,5,12，或在頁面上選擇級別。</p>
          </div>
        ) : (
          <BookletPrintView topics={bookletTopics} isPreview={isPrintPreview} />
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
