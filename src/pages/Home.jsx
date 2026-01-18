import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, ArrowRight, BookOpen, Award, BarChart2
} from 'lucide-react';

const Home = () => {
  const [activeFilter, setActiveFilter] = useState('全部');

  const apps = [
    {
      id: 'angle-quiz',
      title: '角的標記',
      description: '學習如何正確標記和命名角度 (使用三個英文字母)',
      icon: Calculator,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      path: '/angle-quiz',
      level: 'F1',
      badges: [
        { level: 'F1', chapter: 'CH5', subject: '面積和體積（一）' }
      ],
      category: '初中',
      topics: ['角度命名', '幾何圖形', '三點標記法']
    },
    { 
      id: 'circle-theorems',
      title: '高中DSE圓形定理',
      description: 'DSE 圓形幾何互動模型：不同核心定理動態演示，可拖動點觀察數值變化',
      icon: Calculator,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      path: '/circle-theorems',
      level: 'F5',
      badges: [
        { level: 'F5', chapter: 'CH12', subject: '圓的基本性質' },
        { level: 'F5', chapter: 'CH13', subject: '圓的切線' }
      ],
      category: '高中',
      topics: ['圓形性質', '切線', '圓內接四邊形']
    },
    {  
      id: 'identity',  
      title: '恆等式展開/因式分解',  
      description: '恆等式展開與因式分解練習',  
      icon: Calculator,  
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',  
      path: '/identity-quiz',  
      level: 'F2',
      badges: [
        { level: 'F2', chapter: 'CH3', subject: '恆等式' },
        { level: 'F2', chapter: 'CH4', subject: '因式分解' }
      ],
      category: '初中',
      topics: ['完全平方', '展開', '因式分解']
    },
    {
      id: 'index-laws',
      title: '指數定律',
      description: 'F3 CH2 指數定律：同底相乘、相除、冪的乘方及負指數',
      icon: Calculator,
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
      path: '/index-laws',
      level: 'F3',
      badges: [
        { level: 'F3', chapter: 'CH2', subject: '指數定律' }
      ],
      category: '初中',
      topics: ['指數運算', '負指數'],
      inDevelopment: true
    },
    {
      id: 'simultaneous-eq',
      title: '聯立方程特訓',
      description: '熟習聯立方程應用題設式',
      icon: Calculator,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      path: '/simultaneous-eq-quiz',
      level: 'F2',
      badges: [
        { level: 'F2', chapter: 'CH9', subject: '二元一次方程' }
      ],
      category: '初中',
      topics: ['聯立方程', '設式'],
      inDevelopment: true
    },
    {
      id: 'dispersion-quiz',
      title: '高中統計特訓',
      description: '學習如何在不同圖表得出以下集中趨勢的量度：平均數、中位數、眾數、四分位數間距、分佈域、標準差、方差',
      icon: BarChart2,
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      path: '/dispersion-quiz',
      level: 'F5',
      badges: [
        { level: 'F5', chapter: 'CH14', subject: '統計' }
      ],
      category: '高中',
      topics: ['平均數', '中位數', '標準差', '四分位數'],
      inDevelopment: true
    },
    {
      id: 'inequality-quiz',
      title: '基礎不等式',
      description: 'F2 CH8 不等式：文字轉換、數線圖形判讀、不等式基本概念',
      icon: Calculator,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      path: '/inequality-quiz',
      level: 'F2',
      badges: [
        { level: 'F2', chapter: 'CH8', subject: '一元一次不等式' }
      ],
      category: '初中',
      topics: ['不等式', '文字翻譯', '數線表示'],
      inDevelopment: true
    },
    {
      id: 'compound-inequality-quiz',
      title: '複合不等式',
      description: 'F5 CH17 複合不等式：AND/OR圖解法、整數解判斷',
      icon: Calculator,
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      path: '/compound-inequality-quiz',
      level: 'F5',
      badges: [
        { level: 'F5', chapter: 'CH17', subject: '複合不等式' }
      ],
      category: '高中',
      topics: ['複合不等式', '圖解法', '整數解'],
      inDevelopment: true
    },
    {
      id: 'variation-quiz',
      title: '變分設式',
      description: 'F5 CH11 變分：正變、反變、聯變、部分變公式特訓',
      icon: Calculator,
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600',
      path: '/variation-quiz',
      level: 'F5',
      badges: [
        { level: 'F5', chapter: 'CH11', subject: '變分' }
      ],
      category: '高中',
      topics: ['正變', '反變', '聯變', '部分變'],
      inDevelopment: false
    },
    {
      id: 'subject',
      title: '主項變換',
      description: 'F2 CH5 主項變換：學習「乘、拆、移、抽、除」五步曲',
      icon: Calculator,
      color: 'bg-cyan-500',
      hoverColor: 'hover:bg-cyan-600',
      path: '/subject',
      level: 'F2',
      badges: [
        { level: 'F2', chapter: 'CH5', subject: '主項變換' }
      ],
      category: '初中',
      topics: ['主項變換', '公式變換', '代數'],
      inDevelopment: false
    },
    {
      id: 'coordinate-transform',
      title: '坐標轉換',
      description: 'F1 CH10 坐標簡介：學習直角坐標的平移、旋轉、反射轉換',
      icon: Calculator,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      path: '/coordinate-transform',
      level: 'F1',
      badges: [
        { level: 'F1', chapter: 'CH10', subject: '坐標簡介' }
      ],
      category: '初中',
      topics: ['坐標轉換', '平移', '旋轉', '反射'],
      inDevelopment: false
    }
  ];

  // 篩選邏輯
  const filters = ['全部', '初中', '高中', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6'];

  const filteredApps = apps.filter(app => {
    if (activeFilter === '全部') return true;
    if (activeFilter === '初中' || activeFilter === '高中') {
      return app.category === activeFilter;
    }
    return app.level === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                遊數得計
              </h1>
              <p className="text-lg text-slate-600">數學自習天地</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            歡迎來到數學自習天地 🎓
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            透過互動式學習工具，讓你以輕鬆的遊戲方式去鞏固知識，溫習測考！<br/>
            選擇下方的應用程式開始你的學習之旅。
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{apps.length}</div>
            <div className="text-sm text-slate-600">款互動程式</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">多個</div>
            <div className="text-sm text-slate-600">數學主題</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">即時</div>
            <div className="text-sm text-slate-600">互動練習</div>
          </div>
        </div>

        {/* ✅ 篩選器 Filter */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full font-bold transition-all text-sm ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => {
              const Icon = app.icon;
              return (
                <Link
                  key={app.id}
                  to={app.path}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 hover:-translate-y-1"
                >
                  {/* Card Header */}
                  <div className={`${app.color} p-6 ${app.hoverColor} transition-colors relative`}>
                    {app.inDevelopment && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                        ⚠️ 開發中
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-10 h-10 text-white" />
                      <ArrowRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {app.title}
                    </h3>
                    {/* ✅ 課程標籤 - 支持多個 badges */}
                    <div className="flex flex-wrap gap-2">
                      {app.badges.map((badge, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-white/30 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full"
                        >
                          {badge.level} {badge.chapter} {badge.subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {app.description}
                    </p>
                    
                    {/* Topics */}
                    <div className="flex flex-wrap gap-2">
                      {app.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                      開始練習
                      <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            // ✅ 空狀態處理
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400 text-xl font-medium">
                暫無符合條件的學習工具 😔
              </p>
              <button 
                onClick={() => setActiveFilter('全部')}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                查看全部
              </button>
            </div>
          )}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-md border border-slate-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">更多工具即將推出...</h3>
          <p className="text-slate-600">我們正在開發更多互動式學習工具，敬請期待！</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-slate-600 text-sm">
          <p>© 2026 遊數得計 數學自習天地 | 創建者:李柏熹老師</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
