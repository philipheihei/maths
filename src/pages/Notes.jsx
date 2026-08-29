import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, ChevronDown, ChevronRight } from 'lucide-react';
import { NOTES_DATA, NOTES_COMPONENTS, getNotesForLevel } from '../notes/notesData';

const PRINT_PAGE_CONTENT_HEIGHT_MM = 255;
const PRINT_PAGE_CONTENT_HEIGHT_PX = Math.round((PRINT_PAGE_CONTENT_HEIGHT_MM / 25.4) * 96);
const PRINT_ROUNDED_BLOCK_SELECTOR = '.rounded, .rounded-sm, .rounded-md, .rounded-lg, .rounded-xl, .rounded-2xl, .rounded-3xl';

const scopeSvgReferences = (markup, scope) => {
  if (!markup || typeof document === 'undefined') return markup;

  const template = document.createElement('template');
  template.innerHTML = markup;
  const referencedIds = new Set();

  template.content.querySelectorAll('*').forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      for (const match of attribute.value.matchAll(/url\(#([^)]+)\)/g)) {
        referencedIds.add(match[1]);
      }
      if ((attribute.name === 'href' || attribute.name === 'xlink:href') && attribute.value.startsWith('#')) {
        referencedIds.add(attribute.value.slice(1));
      }
    });
  });

  const idMap = new Map();
  template.content.querySelectorAll('[id]').forEach((element) => {
    if (referencedIds.has(element.id)) {
      const scopedId = `print-${scope}-${element.id}`.replace(/[^A-Za-z0-9_-]/g, '-');
      idMap.set(element.id, scopedId);
      element.id = scopedId;
    }
  });

  if (idMap.size > 0) {
    template.content.querySelectorAll('*').forEach((element) => {
      Array.from(element.attributes).forEach((attribute) => {
        let value = attribute.value.replace(/url\(#([^)]+)\)/g, (match, id) => (
          idMap.has(id) ? `url(#${idMap.get(id)})` : match
        ));
        if ((attribute.name === 'href' || attribute.name === 'xlink:href') && value.startsWith('#')) {
          const id = value.slice(1);
          if (idMap.has(id)) value = `#${idMap.get(id)}`;
        }
        if (value !== attribute.value) element.setAttribute(attribute.name, value);
      });
    });
  }

  return template.innerHTML;
};

const paginatePrintContent = (source, pageHeight) => {
  const sourceRect = source.getBoundingClientRect();
  const childBottoms = Array.from(source.children).map((element) => (
    element.getBoundingClientRect().bottom - sourceRect.top
  ));
  const contentHeight = Math.max(
    1,
    ...childBottoms,
    childBottoms.length ? 0 : source.scrollHeight,
  );
  const resolvedPageHeight = pageHeight || PRINT_PAGE_CONTENT_HEIGHT_PX;
  const roundedBlocks = Array.from(source.querySelectorAll(PRINT_ROUNDED_BLOCK_SELECTOR))
    .filter((element) => ['DIV', 'SECTION', 'ARTICLE', 'ASIDE', 'LI', 'TABLE', 'PRE', 'BLOCKQUOTE'].includes(element.tagName))
    .map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        element,
        top: Math.round(rect.top - sourceRect.top),
        bottom: Math.round(rect.bottom - sourceRect.top),
        height: Math.round(rect.height),
        allowSplit: false,
      };
    })
    .filter(({ top, bottom, height }) => top >= 0 && bottom <= contentHeight + 1 && height >= 24);

  const sectionLeadRanges = Array.from(source.querySelectorAll('.print-section-content'))
    .map((content) => {
      const header = content.previousElementSibling;
      const firstLead = Array.from(content.querySelectorAll('h3, h4, h5, p, li, table, svg, img'))
        .find((element) => element.getBoundingClientRect().height > 0)
        || content.firstElementChild;
      if (!header || !firstLead) return null;

      const headerRect = header.getBoundingClientRect();
      const firstLeadRect = firstLead.getBoundingClientRect();
      const firstLeadHeading = firstLead.matches('h3, h4, h5') ? firstLead : null;
      const firstLeadSiblings = Array.from(firstLeadHeading?.parentElement?.children || []);
      const firstLeadIndex = firstLeadSiblings.indexOf(firstLeadHeading);
      const firstLeadContent = firstLeadHeading
        ? firstLeadSiblings
          .slice(firstLeadIndex + 1)
          .find((element) => element.getBoundingClientRect().height > 0)
        : null;
      const firstLeadContentRect = firstLeadContent?.getBoundingClientRect();
      const firstLeadContentIsOversized = firstLeadContentRect?.height > resolvedPageHeight;
      const firstRoundedBlock = roundedBlocks
        .filter(({ element }) => content.contains(element) && element.contains(firstLead))
        .sort((a, b) => a.height - b.height)[0];
      const top = Math.round(Math.min(headerRect.top, firstLeadRect.top) - sourceRect.top);
      const bottom = Math.round(Math.max(
        headerRect.bottom,
        firstLeadRect.bottom,
        firstLeadContentIsOversized
          ? firstLeadContentRect.top
          : Math.max(
            firstLeadContentRect?.bottom || firstLeadRect.bottom,
            firstRoundedBlock && firstRoundedBlock.height <= resolvedPageHeight
              ? firstRoundedBlock.bottom
              : firstLeadRect.bottom,
          ),
      ) - sourceRect.top);

      if (firstRoundedBlock && firstRoundedBlock.bottom - top > resolvedPageHeight) {
        firstRoundedBlock.allowSplit = true;
      }

      return {
        top,
        bottom,
        firstRoundedBlock,
        allowSplit: Boolean(firstLeadContentIsOversized),
      };
    })
    .filter((range) => range && range.top >= 0 && range.bottom <= contentHeight + 1 && range.bottom > range.top);

  const headingLeadRanges = Array.from(source.querySelectorAll('h2, h3, h4, h5'))
    .map((heading) => {
      const isTopicHeading = heading.tagName === 'H2';
      const siblings = Array.from(heading.parentElement?.children || []);
      const headingIndex = siblings.indexOf(heading);
      let firstContent = siblings
        .slice(headingIndex + 1)
        .find((element) => element.getBoundingClientRect().height > 0);

      if (!firstContent) {
        let container = heading.parentElement;
        while (container && container !== source && !firstContent) {
          const containerSiblings = Array.from(container.parentElement?.children || []);
          const containerIndex = containerSiblings.indexOf(container);
          firstContent = containerSiblings
            .slice(containerIndex + 1)
            .find((element) => element.getBoundingClientRect().height > 0);
          container = container.parentElement;
        }
      }

      if (isTopicHeading && firstContent?.classList.contains('print-section-content')) return null;
      if (!firstContent) return null;

      const headingRect = heading.getBoundingClientRect();
      const isFlowWrapper = typeof firstContent.className === 'string'
        && /\bspace-y-\d+\b/.test(firstContent.className);
      const firstContentUnit = isFlowWrapper
        ? Array.from(firstContent.children)
          .find((element) => element.getBoundingClientRect().height > 0)
        || firstContent
        : firstContent;
      const firstContentRect = firstContentUnit.getBoundingClientRect();
      const headingBlock = roundedBlocks
        .filter(({ element, height }) => height <= resolvedPageHeight && element.contains(heading))
        .sort((a, b) => a.height - b.height)[0];
      const firstContentBlock = roundedBlocks
        .find(({ element }) => element === firstContentUnit);
      const top = Math.round(Math.min(
        headingRect.top,
        headingBlock?.element.getBoundingClientRect().top || headingRect.top,
      ) - sourceRect.top);
      const bottom = Math.round(Math.max(headingRect.bottom, firstContentRect.bottom) - sourceRect.top);
      const allowSplit = firstContentRect.height > resolvedPageHeight
        && !(firstContentBlock && firstContentBlock.height > resolvedPageHeight);

      return { top, bottom, allowSplit };
    })
    .filter((range) => range && range.top >= 0 && range.bottom <= contentHeight + 1 && range.bottom > range.top);

  const tableBlocks = Array.from(source.querySelectorAll('table, tr'))
    .map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        element,
        top: Math.round(rect.top - sourceRect.top),
        bottom: Math.round(rect.bottom - sourceRect.top),
        height: Math.round(rect.height),
        allowSplit: false,
      };
    })
    .filter(({ top, bottom, height }) => top >= 0 && bottom <= contentHeight + 1 && height >= 18);
  const atomBlocks = Array.from(source.querySelectorAll('svg, img, canvas, .katex-display'))
    .map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        element,
        top: Math.round(rect.top - sourceRect.top),
        bottom: Math.round(rect.bottom - sourceRect.top),
        height: Math.round(rect.height),
        allowSplit: false,
      };
    })
    .filter(({ top, bottom, height }) => top >= 0 && bottom <= contentHeight + 1 && height >= 18);
  const protectedBlocks = [...roundedBlocks, ...tableBlocks, ...atomBlocks];

  roundedBlocks.forEach(({ element, height, allowSplit }) => {
    element.classList.toggle('print-oversized-rounded', height > resolvedPageHeight || allowSplit);
  });

  if (contentHeight <= resolvedPageHeight) {
    return { contentHeight, offsets: [0] };
  }

  const candidateOffsets = new Set([0, contentHeight]);
  const sourceTop = sourceRect.top;
  const addCandidate = (element) => {
    const elementTop = Math.round(element.getBoundingClientRect().top - sourceTop);
    if (elementTop > 8 && elementTop < contentHeight - 1) {
      candidateOffsets.add(elementTop);
    }
  };

  Array.from(source.children).forEach(addCandidate);
  source.querySelectorAll('.print-section-content > *, [data-print-break]').forEach(addCandidate);
  protectedBlocks.forEach(({ top }) => candidateOffsets.add(top));
  sectionLeadRanges.forEach(({ top }) => candidateOffsets.add(top));
  headingLeadRanges.forEach(({ top }) => candidateOffsets.add(top));

  const sortedCandidates = Array.from(candidateOffsets).sort((a, b) => a - b);
  const isSafeOffset = (offset) => (
    protectedBlocks.every(({ top, bottom, height, allowSplit }) => (
      height > resolvedPageHeight || allowSplit || offset <= top + 1 || offset >= bottom - 1
    ))
    && sectionLeadRanges.every(({ top, bottom, allowSplit }) => (
      allowSplit || offset <= top + 1 || offset >= bottom - 1
    ))
    && headingLeadRanges.every(({ top, bottom, allowSplit }) => (
      allowSplit || offset <= top + 1 || offset >= bottom - 1
    ))
  );
  const offsets = [0];
  let currentOffset = 0;

  while (currentOffset < contentHeight - 1) {
    const targetOffset = currentOffset + resolvedPageHeight;
    if (targetOffset >= contentHeight) break;

    const protectedBlocksCrossingTarget = protectedBlocks
      .filter(({ top, bottom, height, allowSplit }) => (
        height <= resolvedPageHeight
        && !allowSplit
        && top > currentOffset + 8
        && top < targetOffset
        && bottom > targetOffset
      ))
      .sort((a, b) => a.top - b.top);
    const sectionLeadCrossingTarget = sectionLeadRanges
      .filter(({ top, bottom, allowSplit }) => (
        !allowSplit
        && top > currentOffset + 8
        && top < targetOffset
        && bottom > targetOffset
      ))
      .sort((a, b) => a.top - b.top);
    const headingLeadCrossingTarget = headingLeadRanges
      .filter(({ top, bottom, allowSplit }) => (
        !allowSplit
        && top > currentOffset + 8
        && top < targetOffset
        && bottom > targetOffset
      ))
      .sort((a, b) => a.top - b.top);
    const leadCrossingTarget = [...sectionLeadCrossingTarget, ...headingLeadCrossingTarget]
      .sort((a, b) => a.top - b.top);
    const candidatesBeforeTarget = sortedCandidates.filter((candidate) => (
      candidate >= currentOffset + resolvedPageHeight * 0.68
      && candidate <= targetOffset
      && isSafeOffset(candidate)
    ));
    const forcedBreaks = [
      protectedBlocksCrossingTarget[0]?.top,
      leadCrossingTarget[0]?.top,
    ].filter((offset) => offset !== undefined);
    const nextOffset = forcedBreaks.length
      ? Math.min(...forcedBreaks)
      : (candidatesBeforeTarget.length ? candidatesBeforeTarget[candidatesBeforeTarget.length - 1] : targetOffset);

    offsets.push(nextOffset);
    currentOffset = nextOffset;
  }

  return { contentHeight, offsets };
};

const PrintSource = React.memo(({ TopicComponent, sourceRef }) => (
  <div ref={sourceRef} className="print-source-content print-pagination-source print-topic-page">
    <TopicComponent activeSub={null} onNavigate={() => {}} />
  </div>
));

const PrintTopicPages = ({ topic, TopicComponent, pageOffset = 0, onPageCount }) => {
  const sourceRef = useRef(null);
  const pageSizeRef = useRef(null);
  const onPageCountRef = useRef(onPageCount);
  const [pagination, setPagination] = useState({ markup: '', pageMarkup: [], contentHeight: 0, offsets: [], pageHeight: 0 });

  useEffect(() => {
    onPageCountRef.current = onPageCount;
  }, [onPageCount]);

  useEffect(() => {
    const source = sourceRef.current;
    if (!source) return undefined;

    let frameId = 0;
    const updatePagination = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const pageHeight = pageSizeRef.current?.getBoundingClientRect().height || PRINT_PAGE_CONTENT_HEIGHT_PX;
        const { contentHeight, offsets } = paginatePrintContent(source, pageHeight);
        const markup = source.innerHTML;
        const pageMarkup = offsets.map((_, index) => scopeSvgReferences(
          markup,
          `${topic._level}-${topic.id}-${index}`
        ));

        setPagination((current) => {
          const sameOffsets = current.offsets.length === offsets.length
            && current.offsets.every((offset, index) => offset === offsets[index]);
          if (current.markup === markup && current.contentHeight === contentHeight && current.pageHeight === pageHeight && sameOffsets) {
            return current;
          }
          return { markup, pageMarkup, contentHeight, offsets, pageHeight };
        });
        onPageCountRef.current(offsets.length);
      });
    };

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updatePagination) : null;
    resizeObserver?.observe(source);
    if (pageSizeRef.current) resizeObserver?.observe(pageSizeRef.current);

    const mutationObserver = typeof MutationObserver !== 'undefined' ? new MutationObserver(updatePagination) : null;
    mutationObserver?.observe(source, { childList: true, subtree: true, characterData: true });

    updatePagination();
    document.fonts?.ready.then(updatePagination);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [TopicComponent]);

  const pageHeight = pagination.pageHeight || PRINT_PAGE_CONTENT_HEIGHT_PX;

  return (
    <>
      <div className="print-pagination-measure" aria-hidden="true">
        <PrintSource TopicComponent={TopicComponent} sourceRef={sourceRef} />
        <div ref={pageSizeRef} className="print-page-height-measure" />
      </div>
      {pagination.offsets.map((offset, index) => {
        const nextOffset = pagination.offsets[index + 1] ?? pagination.contentHeight;
        const visibleHeight = Math.max(1, Math.min(pageHeight, nextOffset - offset));
        return (
          <section key={`${topic._level}-${topic.id}-page-${index}`} className={`print-topic-page ${index === 0 ? 'print-chapter-start' : ''}`}>
            <div className="print-topic-sheet">
              <div className="print-page-content-viewport" style={{ height: `${visibleHeight}px` }}>
                <div
                  className="print-topic-page-content"
                  style={{ transform: `translateY(-${offset}px)` }}
                  dangerouslySetInnerHTML={{ __html: pagination.pageMarkup[index] || pagination.markup }}
                />
              </div>
              <footer className="print-page-footer">
                <span>{topic._level} {topic.topic}</span>
                <span className="print-page-number" aria-label="頁碼">p.{pageOffset + index + 1}</span>
              </footer>
            </div>
          </section>
        );
      })}
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
  const initialPrintSelection = printGroup === 'senior' || printGroup === 'f4-6' || ['F4', 'F5', 'F6'].includes(printLevel)
    ? 'senior'
    : (printLevel && printableJuniorLevels.includes(printLevel) ? printLevel : 'F1');

  const [printSelection, setPrintSelection] = useState(initialPrintSelection);
  const printLevels = printSelection === 'senior'
    ? seniorLevels
    : [printSelection];
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
  const [isSpreadView, setIsSpreadView] = useState(false);
  const [topicPageCounts, setTopicPageCounts] = useState({});

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

  useEffect(() => {
    if (isPrintMode) {
      setPrintSelection(initialPrintSelection);
      setTopicPageCounts({});
    }
  }, [isPrintMode, initialPrintSelection]);

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

  const pageOffsets = {};
  let pageOffset = 0;
  printTopics.forEach((topic) => {
    const topicKey = `${topic._level}-${topic.id}`;
    pageOffsets[topicKey] = pageOffset;
    pageOffset += topicPageCounts[topicKey] || 0;
  });

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
              <p className="text-slate-600">A4 Reader 預覽模式</p>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  ['F1', 'F1'],
                  ['F2', 'F2'],
                  ['F3', 'F3'],
                  ['senior', 'F4-6'],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => {
                      setTopicPageCounts({});
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
                  onClick={() => setIsSpreadView((current) => !current)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-50"
                >
                  {isSpreadView ? '單頁顯示' : '雙面顯示'}
                </button>
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
        {printTopics.length === 0 ? (
          <div className="max-w-3xl mx-auto border border-amber-300 bg-amber-50 text-amber-800 rounded-xl p-4">
            <h2 className="text-lg font-bold">列印模式參數無效</h2>
            <p className="mt-2 text-sm">請使用 /notes/print，然後在頁面上選擇 F1、F2、F3 或高中。</p>
          </div>
        ) : (
          <div className={`print-document ${isSpreadView ? 'print-spread-view' : ''}`}>
            {printTopics.map((topic) => {
            const TopicComponent = NOTES_COMPONENTS[topic.id];
            if (!TopicComponent) return null;
            return (
              <PrintTopicPages
                key={`${topic._level}-${topic.id}`}
                topic={topic}
                TopicComponent={TopicComponent}
                pageOffset={pageOffsets[`${topic._level}-${topic.id}`]}
                onPageCount={(count) => {
                  const topicKey = `${topic._level}-${topic.id}`;
                  setTopicPageCounts((current) => (
                    current[topicKey] === count ? current : { ...current, [topicKey]: count }
                  ));
                }}
              />
            );
            })}
          </div>
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
