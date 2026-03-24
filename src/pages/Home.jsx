import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, ArrowRight, BookOpen, Award, BarChart2, FileText
} from 'lucide-react';

const Home = () => {
  const [activeFilter, setActiveFilter] = useState('全部');

  const apps = [
    {
      id: 'angle-master-quiz',
      title: '尋找圖形角度',
      description: '中學各級角度定理練習，包含平行線錯角、三角形外角、圓心角與圓周角及交錯弓形',
      icon: Calculator,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      path: '/angle-master-quiz',
      level: 'F1',
      badges: [
        { level: 'F1', chapter: 'CH11', subject: '與直線和三角形有關的角' },
        { level: 'F2', chapter: 'CH2', subject: '多邊形' },
        { level: 'F3', chapter: 'CH5', subject: '四邊形' },
        { level: 'F5', chapter: 'CH12', subject: '圓的基本性質' },
        { level: 'F5', chapter: 'CH13', subject: '圓的切線' }
      ],
      category: '初中',
      topics: ['平行線', '三角形', '圓形定理'],
      inDevelopment: true
    },
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
      description: '指數定律：同底相乘、相除、冪的乘方及負指數',
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
      inDevelopment: false
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
      inDevelopment: false
    },
    {
      id: 'inequality-quiz',
      title: '基礎不等式',
      description: '不等式：文字轉換、數線圖形判讀、不等式基本概念',
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
      inDevelopment: false
    },
    {
      id: 'compound-inequality-quiz',
      title: '複合不等式',
      description: '複合不等式：AND/OR圖解法、整數解判斷',
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
      description: '變分：正變、反變、聯變、部分變公式特訓',
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
      description: '主項變換：學習「乘、拆、移、抽、除」五步曲',
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
      inDevelopment: true
    },
    {
      id: 'coordinate-transform',
      title: '坐標轉換',
      description: '坐標簡介：學習直角坐標的平移、旋轉、反射轉換',
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
    },
    {
      id: 'algebraic-fractions',
      title: '代數分式',
      description: '續多項式：代數分式四則混算、通分母、展開分子、化簡',
      icon: Calculator,
      color: 'bg-rose-500',
      hoverColor: 'hover:bg-rose-600',
      path: '/algebraic-fractions',
      level: 'F4',
      badges: [
        { level: 'F4', chapter: 'CH4', subject: '續多項式' }
      ],
      category: '高中',
      topics: ['代數分式', '通分母', '因式分解', '化簡'],
      inDevelopment: false
    },
    {
      id: 'approximation-quiz',
      title: '近似值',
      description: '近似值：有效數字、上捨入、下捨入、捨入至小數位/整數/有效數字',
      icon: Calculator,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      path: '/approximation-quiz',
      level: 'F1',
      badges: [
        { level: 'F1', chapter: 'CH13', subject: '近似值' }
      ],
      category: '初中',
      topics: ['有效數字', '捨入', '近似值'],
      inDevelopment: false
    },
    {
      id: 'percentage-quiz',
      title: '百分數應用',
      description: '百分數：標價/售價/折扣、盈利虧蝕百分率、複利息計算',
      icon: Calculator,
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
      path: '/percentage-quiz',
      level: 'F2',
      badges: [
        { level: 'F1', chapter: 'CH9', subject: '百分法（一）' },
        { level: 'F3', chapter: 'CH3', subject: '百分法（二）' }
      ],
      category: '初中',
      topics: ['百分數', '折扣', '盈利虧蝕', '複利息'],
      inDevelopment: true
    },
    {
      id: 'probability-quiz',
      title: '排列與組合',
      description: '概率：nPr vs nCr、潛規則、加法乘法、DSE 實戰模擬',
      icon: Calculator,
      color: 'bg-violet-500',
      hoverColor: 'hover:bg-violet-600',
      path: '/probability-quiz',
      level: 'F5',
      badges: [
        { level: 'F5', chapter: 'CH15', subject: '排列與組合' },
        { level: 'F5', chapter: 'CH16', subject: '續概率' }
      ],
      category: '高中',
      topics: ['排列', '組合', '概率', 'nPr', 'nCr'],
      inDevelopment: true
    },
    {
      id: 'factorization-quiz',
      title: '因式分解',
      description: '因式分解：提取公因式、併項法、二次多項式（十字相乘法/FMLA 01）',
      icon: Calculator,
      color: 'bg-violet-500',
      hoverColor: 'hover:bg-violet-600',
      path: '/factorization-quiz',
      level: 'F2',
      badges: [
        { level: 'F2', chapter: 'CH4', subject: '多項式的因式分解' },
        { level: 'F3', chapter: 'CH1', subject: '續多項式的因式分解' }
      ],
      category: '初中',
      topics: ['提取公因式', '併項法', '二次多項式', '十字相乘法'],
      inDevelopment: true
    },
    {
      id: 'remainder-factor-quiz',
      title: '餘式定理 & 因式定理',
      description: '餘式定理與因式定理：找相應的 f(x) 值',
      icon: Calculator,
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      path: '/remainder-factor-quiz',
      level: 'F4',
      badges: [
        { level: 'F4', chapter: 'CH4', subject: '續多項式' }
      ],
      category: '高中',
      topics: ['餘式定理', '因式定理', '多項式除法'],
      inDevelopment: false
    },
    {
      id: 'mc-limited-f6',
      title: 'DSE MC限定',
      description: 'DSE 歷屆 MC 模擬練習：自動生成仿 DSE 選擇題，附筆記',
      icon: Calculator,
      color: 'bg-slate-800',
      hoverColor: 'hover:bg-slate-900',
      path: '/mc-limited-f6',
      level: 'F6',
      badges: [
        { level: 'F3', chapter: 'CH2', subject: '整數指數定律' },
        { level: 'F4', chapter: 'CH1', subject: '一元二次方程（一）' },
        { level: 'F4', chapter: 'CH4', subject: '續多項式' },
        { level: 'F5', chapter: 'CH11', subject: '變分' },
      ],
      category: '高中',
      topics: ['H.C.F.', 'L.C.M.', '多項式', 'DSE MC'],
      inDevelopment: true
    },
    {
      id: 'solid-geometry',
      title: '立體面積及體積',
      description: '圓柱、圓錐、角錐、球體、半球、平截頭體的面積和體積計算',
      icon: Calculator,
      color: 'bg-cyan-600',
      hoverColor: 'hover:bg-cyan-700',
      path: '/solid-geometry',
      level: 'F2',
      badges: [
        { level: 'F2', chapter: 'CH13', subject: '面積和體積（二）' },
        { level: 'F3', chapter: 'CH04', subject: '面積和體積（三）' }
      ],
      category: '初中',
      topics: ['面積', '體積', '圓柱', '圓錐', '球體', '半球', '平截頭體'],
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
    // 檢查 app.level 或 badges 中是否有匹配的年級
    return app.level === activeFilter || app.badges.some(badge => badge.level === activeFilter);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
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
            <Link
              to="/notes"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <FileText className="w-5 h-5" />
              <span>溫習筆記</span>
            </Link>
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
                      <div className="flex items-center gap-3">
                        <Icon className="w-8 h-8 text-white" />
                        <h3 className="text-2xl font-bold text-white">
                          {app.title}
                        </h3>
                      </div>
                      <ArrowRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
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
