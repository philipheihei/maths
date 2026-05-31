import React, { useRef, useEffect } from 'react';
import { Latex, MathDisplay, CollapsibleSection } from './shared';

export const SequenceNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  const ChoiceDot = ({ label }) => <span className="inline-block w-6">{label}.</span>;
  const h = (c, v) => `\\colorbox{${c}}{${v}}`;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-indigo-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH20-21 數列 (Sequences)</h1>
        <p className="text-slate-600">等差數列 (A.S.)、等比數列 (G.S.) 與其他數列</p>
      </div>

      {/* 1. 通項對比 */}
      <CollapsibleSection id="nth-term" title="1. 通項 (nth term) 與公差/公比" num={1} color="indigo" activeSub={activeSub} sectionRef={s1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 左：等差 */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-4 text-center border-b border-red-200 pb-2">CH20 等差數列 (A.S.)</h3>
            
            <div className="mb-4">
              <div className="font-bold text-slate-700 mb-1">通項 (nth term)：</div>
              <div className="bg-white p-3 rounded-md shadow-sm text-center">
                <MathDisplay latex="T(n) = a + (n-1)d" inline={false} className="text-xl text-red-700" />
              </div>
              <ul className="text-sm text-slate-600 mt-2 ml-4 list-disc space-y-1">
                <li><MathDisplay latex="a" inline /> : <b>首項</b> (第一個數字)</li>
                <li><MathDisplay latex="n" inline /> : <b>第幾項</b></li>
                <li><MathDisplay latex="d" inline /> : <b>公差</b></li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font-bold text-slate-700 mb-1">公差 (d)：</div>
              <div className="bg-white p-3 rounded-md shadow-sm text-center">
                <p className="text-red-700 font-bold mb-1">後項 <MathDisplay latex="-" inline /> 前項</p>
                <MathDisplay latex="d = T(2) - T(1)" inline={false} />
              </div>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm space-y-2 text-sm">
              <div className="font-bold text-slate-600">例子：</div>
              <p>數列：3, 6, 9, 12, 15, ...</p>
              <p>第 100 項：<br/>
                <MathDisplay latex="T(100) = 3 + (100-1)(3) = 300" inline={false} />
              </p>
              <p>驗證第 5 項：<br/>
                <MathDisplay latex="T(5) = 3 + (5-1)(3) = 15" inline={false} />
              </p>
            </div>
          </div>

          {/* 右：等比 */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-4 text-center border-b border-purple-200 pb-2">CH21 等比數列 (G.S.)</h3>
            
            <div className="mb-4">
              <div className="font-bold text-slate-700 mb-1">通項 (nth term)：</div>
              <div className="bg-white p-3 rounded-md shadow-sm text-center">
                <MathDisplay latex="T(n) = a r^{n-1}" inline={false} className="text-xl text-purple-700" />
              </div>
              <ul className="text-sm text-slate-600 mt-2 ml-4 list-disc space-y-1">
                <li><MathDisplay latex="a" inline /> : <b>首項</b></li>
                <li><MathDisplay latex="n" inline /> : <b>第幾項</b></li>
                <li><MathDisplay latex="r" inline /> : <b>公比</b></li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font-bold text-slate-700 mb-1">公比 (r)：</div>
              <div className="bg-white p-3 rounded-md shadow-sm text-center">
                <p className="text-purple-700 font-bold mb-1">後項 <MathDisplay latex="\div" inline /> 前項</p>
                <MathDisplay latex="r = \frac{T(2)}{T(1)} = \frac{T(3)}{T(2)} = ..." inline={false} />
              </div>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm space-y-2 text-sm">
              <div className="font-bold text-slate-600">例子：</div>
              <p>數列：32, 16, 8, 4, ...</p>
              <p>第 7 項：<br/>
                <MathDisplay latex="T(7) = 32\left(\frac{1}{2}\right)^{7-1} = 0.5" inline={false} />
              </p>
              <p>（另一例子：3, 27, 243, ...）</p>
            </div>
          </div>

        </div>
      </CollapsibleSection>

      {/* 2. 求和對比 */}
      <CollapsibleSection id="sum" title="2. 求和 (Summation)" num={2} color="indigo" activeSub={activeSub} sectionRef={s2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 左：等差求和 */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-4 text-center border-b border-red-200 pb-2">等差求和 (Sum of A.S.)</h3>
            <div className="bg-white p-4 rounded-md shadow-sm text-center mb-4">
              <MathDisplay latex="S(n) = \frac{n}{2}[2a + (n-1)d]" inline={false} className="text-xl text-red-700" />
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4 text-sm text-slate-700 space-y-2">
              <div className="font-bold text-yellow-800">📌 概念理解</div>
              <ul className="list-disc pl-5 space-y-1">
                <li><MathDisplay latex="S(10) = T(1) + T(2) + ... + T(10)" inline /></li>
                <li><b>常見考核題型：</b>求「第 10 項至第 20 項之和」<br/>
                    算法：<span className="text-red-600 font-bold"><MathDisplay latex="S(20) - S(9)" inline /></span>
                </li>
              </ul>
            </div>
          </div>

          {/* 右：等比求和 */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-4 text-center border-b border-purple-200 pb-2">等比求和 (Sum of G.S.)</h3>
            <div className="bg-white p-4 rounded-md shadow-sm text-center space-y-6">
              
              <div>
                <p className="text-sm font-bold text-slate-600 mb-2">首 n 項和 (Sum of first n terms)：</p>
                <MathDisplay latex="S(n) = \frac{a(r^n - 1)}{r - 1}" inline={false} className="text-xl text-purple-700" />
              </div>

              <div className="border-t border-purple-100 pt-4">
                <p className="text-sm font-bold text-slate-600 mb-2">無限項之和 (Sum to infinity)：</p>
                <MathDisplay latex="S(\infty) = \frac{a}{1 - r}" inline={false} className="text-xl text-purple-700 font-bold" />
                <p className="text-xs text-slate-500 mt-2">條件：<MathDisplay latex="-1 < r < 1" inline /></p>
              </div>

            </div>
          </div>

        </div>
      </CollapsibleSection>

      {/* 3. 基本題型：分辨與找 T(n) */}
      <CollapsibleSection id="basic-questions" title="3. 考核題型 (1)：分辨與找特定項" num={3} color="indigo" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">1. 分辨等差數列 / 等比數列</h3>
            <p className="text-sm text-slate-600 mb-4">常見於 MC 題，分辨數組是否成等差/等比。</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-3 rounded border border-red-100">
                <div className="font-bold text-red-700 mb-1">成等差數列</div>
                <div className="text-sm text-slate-700 space-y-1">
                  <p>• 規律：加（<MathDisplay latex="+" inline />）或 減（<MathDisplay latex="-" inline />）</p>
                  <p>• 代數字法：可代入 1, 3, 5, 7, 9, ... 測試</p>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded border border-purple-100">
                <div className="font-bold text-purple-700 mb-1">成等比數列</div>
                <div className="text-sm text-slate-700 space-y-1">
                  <p>• 規律：乘（<MathDisplay latex="\times" inline />）或 除（<MathDisplay latex="\div" inline />）</p>
                  <p>• 代數字法：可代入 2, 4, 8, 16, 32, ... 測試</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">2. 得知 a 和 d / a 和 r 的值後，找 T(n)</h3>
            <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 space-y-2">
              <p><span className="font-bold text-emerald-700">第一步：</span>先找出 首項 <MathDisplay latex="a" inline /> 及 公差/公比</p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600 mb-3 block">
                <li>公差 <MathDisplay latex="d =" inline /> 後項 <MathDisplay latex="-" inline /> 前項</li>
                <li>首項 <MathDisplay latex="a =" inline /> 第一項</li>
              </ul>
              <p><span className="font-bold text-emerald-700">第二步：</span>設定 <MathDisplay latex="n" inline /> 為目標項數，代入通項公式。例如找第 8 項的值，即找 <MathDisplay latex="T(8)" inline />，代 <MathDisplay latex="n = 8" inline />。</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. 進階題型：找 n 項次 */}
      <CollapsibleSection id="advanced-questions" title="4. 考核題型 (2)：求項數與不等式應用" num={4} color="indigo" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📍 求數列的項數 (總數)</h3>
            <p className="text-sm text-slate-700 mb-2">例子：求等差數列 9, 13, 17, 21, ..., 113 的共有多少項？</p>
            
            <div className="bg-white p-4 rounded-md border border-blue-100 font-sans text-sm space-y-2 text-slate-700">
              <div className="flex gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2"><MathDisplay latex="T(n) = 9 + (n-1)(4)" /><span className="text-emerald-700 font-bold ml-2">← 1. 先找通項 (a=9, d=4)</span></div>
                  <div className="flex items-center gap-2"><MathDisplay latex="113 = 5 + 4n" /><span className="text-emerald-700 font-bold ml-2">← 2. 化簡並代入最尾項的值 (113)</span></div>
                  <MathDisplay latex="108 = 4n" block />
                  <MathDisplay latex="n = 27" block />
                </div>
              </div>
              <div className="mt-2 font-bold text-blue-800">∴ 總共有 27 項</div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-2">🔥 找第幾項大於/少於特定值 (DSE 長答/MC 熱門題型)</h3>
            <p className="text-sm font-bold text-slate-700 mb-4 bg-yellow-200 inline-block px-2 rounded">✨ 必須以「不等式」解決！</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* 長答例子 */}
              <div className="bg-white p-3 rounded-md shadow-sm border border-red-100 text-sm">
                <div className="font-bold text-slate-800 border-b pb-1 mb-2">📝 長答題例子 (2016-DSE-Q17)</div>
                <p className="text-slate-600 mb-2 leading-relaxed">已知等差數列的第 1 項及第 38 項分別為 666 及 555。<br/>(a) 該數列的公差，<br/>(b) <MathDisplay latex="n" inline /> 的最大值使得該數列的首 <MathDisplay latex="n" inline /> 項之和為正值。</p>
                
                <div className="space-y-1 mt-3">
                  <div className="text-blue-700 font-bold">a) 找公差 d：</div>
                  <MathDisplay latex="d = \frac{555 - 666}{38 - 1} = \frac{-111}{37} = -3" block />
                  
                    <div className="text-blue-700 font-bold mt-3">b) n 的最 大值 (首 n 項和 &gt; 0)：</div>
                  <div className="text-emerald-700 text-xs mb-1">要求： <MathDisplay latex="S(n) > 0" inline /></div>
                  <MathDisplay latex="\frac{n}{2}[2a + (n-1)d] > 0" block />
                  <div className="text-emerald-700 text-xs mt-1 mb-1">代入 a=666, d=-3：</div>
                  <MathDisplay latex="\frac{n}{2}[2(666) + (n-1)(-3)] > 0" block />
                  <MathDisplay latex="\frac{n}{2}(1332 - 3n + 3) > 0" block />
                  <div className="text-emerald-700 text-xs mt-1 mb-1">✨ n 不能為 0 (否則會漏答案)，直接把 n 及 /2 移走/除走：</div>
                  <MathDisplay latex="1335 - 3n > 0" block />
                  <MathDisplay latex="1335 > 3n" block />
                  <MathDisplay latex="n < 445" block />
                  <div className="font-bold text-red-700 mt-2">∴ n 的最大整數值為 444</div>
                </div>
              </div>

              {/* MC例子 */}
              <div className="bg-white p-3 rounded-md shadow-sm border border-red-100 text-sm">
                <div className="font-bold text-slate-800 border-b pb-1 mb-2">🎯 MC題例子 (2006-CE-MC)</div>
                <p className="text-slate-600 mb-2">等差數列 2006, 1998, 1990, ... 的<span className="font-bold text-red-600 underline">首個負值項</span>為</p>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3 ml-2">
                  <div>A. -8</div><div>B. -6</div><div>C. -4</div><div>D. -2</div>
                </div>

                <div className="space-y-1 text-slate-700">
                  <div className="text-blue-700 font-bold">解題步驟：</div>
                  <div className="text-emerald-700 text-xs mb-1">1. 找出通項 T(n) (已知 a=2006, d=-8)：</div>
                  <MathDisplay latex="T(n) = 2006 + (n-1)(-8)" block />
                  <MathDisplay latex="T(n) = 2006 - 8n + 8" block />
                  <MathDisplay latex="T(n) = 2014 - 8n" block />
                  
                  <div className="text-emerald-700 text-xs mt-3 mb-1">2. 設 T(n) &lt; 0 (首個負值項)：</div>
                  <MathDisplay latex="2014 - 8n < 0" block />
                  <MathDisplay latex="2014 < 8n" block />
                  <MathDisplay latex="251.75 < n" block />
                  
                  <div className="text-emerald-700 text-xs mt-3 mb-1">3. 找符合條件的 n 的最小整數值：</div>
                  <p className="ml-4 font-bold text-slate-800">∴ 滿足要求的 n 是 252 (第 252 項)</p>
                  
                  <div className="text-emerald-700 text-xs mt-3 mb-1">4. 代入找數值：</div>
                  <MathDisplay latex="T(252) = 2014 - 8(252) = -2" block />
                  <p className="font-bold text-red-700 mt-2">答案是 D</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. 其他數列 */}
      <CollapsibleSection id="other-sequence" title="5. 其他數列 (無「等差」「等比」字眼)" num={5} color="indigo" activeSub={activeSub} sectionRef={s5}>
        <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3 text-lg text-center border-b border-amber-200 pb-2">DSE 題目若沒提及「等差」或「等比」字眼，則為其他數列</h3>
          
          <p className="text-slate-700 mt-4 mb-3">題目通常會提供<span className="font-bold text-amber-700 inline-block bg-yellow-200 px-1 rounded">遞迴規矩 (Recurrence Relation)</span>：</p>
          
          <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200 text-sm space-y-3">
            <div className="flex flex-wrap items-baseline gap-2 mb-2 font-bold text-slate-800">
              <span>例子：已知</span>
              <MathDisplay latex="a_{n+2} = a_{n+1} - a_n" inline />
              <span>，若</span>
              <MathDisplay latex="a_5 = -13" inline /><span>，</span><MathDisplay latex="a_7 = 14" inline /><span>，</span>
              <span>求</span>
              <MathDisplay latex="a_4 = ?" inline />
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-100">
              <div className="text-emerald-700 font-bold mb-2">理解規矩：</div>
              <div className="flex gap-4 items-center">
                <MathDisplay latex="a_{n+2}" inline className="text-lg font-bold" />
                <span>=</span>
                <MathDisplay latex="a_{n+1}" inline className="text-lg font-bold" />
                <span>-</span>
                <MathDisplay latex="a_n" inline className="text-lg font-bold" />
              </div>
              <div className="flex gap-4 items-center text-xs text-slate-500 mt-1">
                <span className="w-8 text-center text-red-600 font-bold">下兩項</span>
                <span className="w-4"></span>
                <span className="w-8 text-center text-green-600 font-bold">下一項</span>
                <span className="w-4"></span>
                <span className="w-8 text-center text-blue-600 font-bold">某項</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="font-bold text-blue-700">逐步推算：</div>
              <p className="flex items-center gap-2">
                1. 代入 <MathDisplay latex="n=5" inline /> 找 <MathDisplay latex="a_6" inline />：
                <MathDisplay latex="a_7 = a_6 - a_5" inline />
                <span className="text-slate-400">→</span>
                <MathDisplay latex="14 = a_6 - (-13)" inline />
                <span className="text-slate-400">→</span>
                <MathDisplay latex="a_6 = 1" inline className="font-bold text-emerald-700" />
              </p>
              <p className="flex items-center gap-2">
                2. 代入 <MathDisplay latex="n=4" inline /> 找 <MathDisplay latex="a_4" inline />：
                <MathDisplay latex="a_6 = a_5 - a_4" inline />
                <span className="text-slate-400">→</span>
                <MathDisplay latex="1 = -13 - a_4" inline />
                <span className="text-slate-400">→</span>
                <MathDisplay latex="a_4 = -14" inline className="font-bold text-red-700" />
              </p>
            </div>

          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

export const FunctionTransformNotes = ({ activeSub, onNavigate }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  useEffect(() => {
    const refs = { 'transform-rules': s1, 'translation': s2, 'reflection': s3, 'stretch': s4 };
    if (activeSub && refs[activeSub]?.current) {
      refs[activeSub].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSub]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-teal-500 mt-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH22 函數圖像變換 (Transformations of Graphs)</h1>
        <p className="text-slate-600">總結函數變換的規律：平移、反射、伸展及收縮</p>
      </div>

      <CollapsibleSection id="transform-rules" title="變換方向口訣" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-4">只需記以下變化基本原則：</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="relative inline-block text-4xl mt-6 mb-4">
              <span className="text-emerald-700 font-bold">f(x)</span>
              <span className="text-green-700 font-bold mx-3">+</span>
              <span className="text-green-700 font-bold">k</span>
              
              <div className="absolute -top-8 left-0 w-32 pb-1 pl-2 font-sans">
                <span className="absolute -top-6 -left-2 text-indigo-700 font-bold text-sm whitespace-nowrap">括號內：左右變化</span>
                <span className="absolute -bottom-1 left-4 text-indigo-700 text-2xl font-bold">↓</span>
              </div>
              <div className="absolute -top-8 right-0 w-24 pb-1 pr-2 font-sans">
                <span className="absolute -top-6 -right-6 text-indigo-700 font-bold text-sm whitespace-nowrap">括號外：上下變化</span>
                <span className="absolute -bottom-1 -left-2 text-indigo-700 text-xl font-bold origin-center -rotate-45">↓</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans mt-2">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div className="text-lg font-bold text-blue-800 mb-2">1. 平移 (加減)</div>
              <ul className="text-sm text-slate-700 space-y-2">
                <li className="flex items-start"><span className="text-blue-600 mr-2 font-bold">•</span><span className="font-bold">y 移動</span>，函數<span className="text-red-500 font-bold mx-1">外相同方向</span></li>
                <li className="flex items-start"><span className="text-blue-600 mr-2 font-bold">•</span><span className="font-bold">x 移動</span>，函數<span className="text-red-500 font-bold mx-1">內相反方向</span></li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div className="text-lg font-bold text-red-800 mb-2">2. 反射</div>
              <p className="text-sm font-bold text-slate-700 flex items-center h-full">反射加負號 (﹣)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div className="text-lg font-bold text-purple-800 mb-2">3. 伸展 / 收縮</div>
              <p className="text-sm font-bold text-slate-700 flex items-center h-full">放大 / 縮小，加係數</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="translation" title="平移 (Translation)" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-3 border-b border-slate-300">變換種類</th>
                <th className="p-3 border-b border-slate-300">以代數方法表示 (<Latex math="k > 0" inline />)</th>
                <th className="p-3 border-b border-slate-300">以幾何方法表示</th>
                <th className="p-3 border-b border-slate-300">圖像示例</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-slate-200">
                <td className="p-3 bg-slate-50 font-bold text-slate-700 border-r border-slate-200" rowSpan="2">垂直平移</td>
                <td className="p-3 border-r border-slate-200"><Latex math="y = f(x) + k" inline /></td>
                <td className="p-3 text-left pl-6">向<span className="font-bold text-blue-700 mx-1">上</span>平移 <Latex math="k" inline /> 單位</td>
                <td className="p-3 border-l border-slate-200">
                  <svg viewBox="0 0 200 150" className="w-[230px] mx-auto overflow-visible">
                    <path d="M 20 100 L 180 100" stroke="#64748b" strokeWidth="1" />
                    <path d="M 50 140 L 50 10" stroke="#64748b" strokeWidth="1" />
                    <polyline points="176,96 180,100 176,104" fill="none" stroke="#64748b" strokeWidth="1" />
                    <polyline points="46,14 50,10 54,14" fill="none" stroke="#64748b" strokeWidth="1" />
                    <text x="180" y="112" fontSize="10" fill="#64748b" fontFamily="sans-serif">x</text>
                    <text x="38" y="15" fontSize="10" fill="#64748b" fontFamily="sans-serif">y</text>
                    
                    <path d="M 10,110 C 40,0 70,110 110,50 C 130,20 150,20 180,110" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                    <text x="150" y="125" fontSize="11" fill="#9ca3af" fontFamily="serif" fontStyle="italic">y=f(x)</text>

                    <path d="M 10,80 C 40,-30 70,80 110,20 C 130,-10 150,-10 180,80" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    <text x="125" y="65" fontSize="11" fill="#3b82f6" fontFamily="serif" fontStyle="italic">y=f(x)+k</text>
                    <path d="M 110,45 L 110,25" stroke="#1d4ed8" strokeWidth="1.5" />
                    <polyline points="107,29 110,25 113,29" fill="none" stroke="#1d4ed8" strokeWidth="1.5" />
                    <text x="115" y="40" fontSize="12" fill="#1d4ed8" fontFamily="sans-serif">+k</text>
                  </svg>
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3 border-r border-slate-200"><Latex math="y = f(x) - k" inline /></td>
                <td className="p-3 text-left pl-6">向<span className="font-bold text-blue-700 mx-1">下</span>平移 <Latex math="k" inline /> 單位</td>
                <td className="p-3 border-l border-slate-200">
                  <svg viewBox="0 0 200 150" className="w-[230px] mx-auto overflow-visible">
                    <path d="M 20 100 L 180 100" stroke="#64748b" strokeWidth="1" />
                    <path d="M 50 140 L 50 10" stroke="#64748b" strokeWidth="1" />
                    <polyline points="176,96 180,100 176,104" fill="none" stroke="#64748b" strokeWidth="1" />
                    <polyline points="46,14 50,10 54,14" fill="none" stroke="#64748b" strokeWidth="1" />
                    <text x="180" y="112" fontSize="10" fill="#64748b" fontFamily="sans-serif">x</text>
                    <text x="38" y="15" fontSize="10" fill="#64748b" fontFamily="sans-serif">y</text>

                    <path d="M 10,110 C 40,0 70,110 110,50 C 130,20 150,20 180,110" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                    <text x="145" y="95" fontSize="11" fill="#9ca3af" fontFamily="serif" fontStyle="italic">y=f(x)</text>

                    <path d="M 10,140 C 40,30 70,140 110,80 C 130,50 150,50 180,140" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    <text x="125" y="150" fontSize="11" fill="#3b82f6" fontFamily="serif" fontStyle="italic">y=f(x)-k</text>
                    <path d="M 110,55 L 110,75" stroke="#1d4ed8" strokeWidth="1.5" />
                    <polyline points="107,71 110,75 113,71" fill="none" stroke="#1d4ed8" strokeWidth="1.5" />
                    <text x="115" y="70" fontSize="12" fill="#1d4ed8" fontFamily="sans-serif">-k</text>
                  </svg>
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3 bg-slate-50 font-bold text-slate-700 border-r border-slate-200" rowSpan="2">水平平移</td>
                <td className="p-3 border-r border-slate-200"><Latex math="y = f(x + k)" inline /></td>
                <td className="p-3 text-left pl-6">向<span className="font-bold text-green-700 mx-1">左</span>平移 <Latex math="k" inline /> 單位</td>
                <td className="p-3 border-l border-slate-200">
                  <svg viewBox="0 0 200 150" className="w-[230px] mx-auto overflow-visible">
                    <path d="M 20 100 L 180 100" stroke="#64748b" strokeWidth="1" />
                    <path d="M 50 140 L 50 10" stroke="#64748b" strokeWidth="1" />
                    <polyline points="176,96 180,100 176,104" fill="none" stroke="#64748b" strokeWidth="1" />
                    <polyline points="46,14 50,10 54,14" fill="none" stroke="#64748b" strokeWidth="1" />
                    <text x="180" y="112" fontSize="10" fill="#64748b" fontFamily="sans-serif">x</text>
                    <text x="38" y="15" fontSize="10" fill="#64748b" fontFamily="sans-serif">y</text>

                    <path d="M 10,110 C 40,0 70,110 110,50 C 130,20 150,20 180,110" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                    <text x="145" y="125" fontSize="11" fill="#9ca3af" fontFamily="serif" fontStyle="italic">y=f(x)</text>
                    
                    <path d="M -20,110 C 10,0 40,110 80,50 C 100,20 120,20 150,110" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <text x="5" y="45" fontSize="11" fill="#16a34a" fontFamily="serif" fontStyle="italic">y=f(x+k)</text>
                    <path d="M 98,35 L 72,35" stroke="#15803d" strokeWidth="1.5" />
                    <polyline points="76,31 72,35 76,39" fill="none" stroke="#15803d" strokeWidth="1.5" />
                    <text x="80" y="27" fontSize="12" fill="#15803d" fontFamily="sans-serif">-k</text>
                  </svg>
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3 border-r border-slate-200"><Latex math="y = f(x - k)" inline /></td>
                <td className="p-3 text-left pl-6">向<span className="font-bold text-green-700 mx-1">右</span>平移 <Latex math="k" inline /> 單位</td>
                <td className="p-3 border-l border-slate-200">
                  <svg viewBox="0 0 200 150" className="w-[230px] mx-auto overflow-visible">
                    <path d="M 20 100 L 180 100" stroke="#64748b" strokeWidth="1" />
                    <path d="M 50 140 L 50 10" stroke="#64748b" strokeWidth="1" />
                    <polyline points="176,96 180,100 176,104" fill="none" stroke="#64748b" strokeWidth="1" />
                    <polyline points="46,14 50,10 54,14" fill="none" stroke="#64748b" strokeWidth="1" />
                    <text x="180" y="112" fontSize="10" fill="#64748b" fontFamily="sans-serif">x</text>
                    <text x="38" y="15" fontSize="10" fill="#64748b" fontFamily="sans-serif">y</text>

                    <path d="M 10,110 C 40,0 70,110 110,50 C 130,20 150,20 180,110" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                    <text x="110" y="125" fontSize="11" fill="#9ca3af" fontFamily="serif" fontStyle="italic">y=f(x)</text>

                    <path d="M 40,110 C 70,0 100,110 140,50 C 160,20 180,20 210,110" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <text x="155" y="65" fontSize="11" fill="#16a34a" fontFamily="serif" fontStyle="italic">y=f(x-k)</text>
                    <path d="M 122,35 L 148,35" stroke="#15803d" strokeWidth="1.5" />
                    <polyline points="144,31 148,35 144,39" fill="none" stroke="#15803d" strokeWidth="1.5" />
                    <text x="127" y="27" fontSize="12" fill="#15803d" fontFamily="sans-serif">+k</text>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="reflection" title="反射 (Reflection)" num={3} color="red" activeSub={activeSub} sectionRef={s3}>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-3 border-b border-slate-300">變換種類</th>
                <th className="p-3 border-b border-slate-300">以代數方法表示</th>
                <th className="p-3 border-b border-slate-300">以幾何方法表示</th>
                <th className="p-3 border-b border-slate-300">圖像示例</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-slate-200">
                <td className="p-3 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">沿 x 軸</td>
                <td className="p-3 border-r border-slate-200"><Latex math="y = -f(x)" inline /></td>
                <td className="p-3">沿 <Latex math="x" inline /> 軸反射</td>
                <td className="p-3 border-l border-slate-200">
                  <svg viewBox="0 0 200 150" className="w-[230px] mx-auto overflow-visible">
                    <path d="M 20 75 L 180 75" stroke="#64748b" strokeWidth="1" />
                    <path d="M 100 140 L 100 10" stroke="#64748b" strokeWidth="1" />
                    <polyline points="176,71 180,75 176,79" fill="none" stroke="#64748b" strokeWidth="1" />
                    <polyline points="96,14 100,10 104,14" fill="none" stroke="#64748b" strokeWidth="1" />
                    <text x="180" y="87" fontSize="10" fill="#64748b" fontFamily="sans-serif">x</text>
                    <text x="88" y="15" fontSize="10" fill="#64748b" fontFamily="sans-serif">y</text>
                    <text x="92" y="86" fontSize="10" fill="#64748b" fontFamily="sans-serif">0</text>
                    
                    <path d="M 20,130 C 50,20 90,20 100,75 C 110,130 150,130 180,20" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                    <text x="145" y="45" fontSize="11" fill="#9ca3af" fontFamily="serif" fontStyle="italic">y=f(x)</text>

                    <path d="M 20,20 C 50,130 90,130 100,75 C 110,20 150,20 180,130" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <text x="145" y="145" fontSize="11" fill="#16a34a" fontFamily="serif" fontStyle="italic">y=-f(x)</text>
                  </svg>
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">沿 y 軸</td>
                <td className="p-3 border-r border-slate-200"><Latex math="y = f(-x)" inline /></td>
                <td className="p-3">沿 <Latex math="y" inline /> 軸反射</td>
                <td className="p-3 border-l border-slate-200">
                  <svg viewBox="0 0 200 150" className="w-[230px] mx-auto overflow-visible">
                    <path d="M 20 75 L 180 75" stroke="#64748b" strokeWidth="1" />
                    <path d="M 100 140 L 100 10" stroke="#64748b" strokeWidth="1" />
                    <polyline points="176,71 180,75 176,79" fill="none" stroke="#64748b" strokeWidth="1" />
                    <polyline points="96,14 100,10 104,14" fill="none" stroke="#64748b" strokeWidth="1" />
                    <text x="180" y="87" fontSize="10" fill="#64748b" fontFamily="sans-serif">x</text>
                    <text x="88" y="15" fontSize="10" fill="#64748b" fontFamily="sans-serif">y</text>
                    <text x="92" y="86" fontSize="10" fill="#64748b" fontFamily="sans-serif">0</text>
                    
                    <path d="M 20,130 C 50,20 90,20 100,75 C 110,130 150,130 180,20" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                    <text x="145" y="45" fontSize="11" fill="#9ca3af" fontFamily="serif" fontStyle="italic">y=f(x)</text>

                    <path d="M 180,130 C 150,20 110,20 100,75 C 90,130 50,130 20,20" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <text x="25" y="145" fontSize="11" fill="#16a34a" fontFamily="serif" fontStyle="italic">y=f(-x)</text>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="p-3 bg-red-50 text-red-800 text-sm font-bold border-t border-red-100 text-center">
            💡 口訣：外負反上下 (沿 x 軸)；內負反左右 (沿 y 軸)
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="stretch" title="伸展及收縮 (Stretch / Contraction)" num={4} color="purple" activeSub={activeSub} sectionRef={s4}>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-3 border-b border-slate-300">變換種類</th>
                <th className="p-3 border-b border-slate-300">以代數方法表示 (<Latex math="k > 1" inline />)</th>
                <th className="p-3 border-b border-slate-300">以幾何方法表示</th>
                <th className="p-3 border-b border-slate-300">圖像示例</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-slate-200">
                <td className="p-3 bg-slate-50 font-bold text-slate-700 border-r border-slate-200" rowSpan="2">垂直伸展 / 收縮</td>
                <td className="p-3 border-r border-slate-200"><Latex math="y = kf(x)" inline /></td>
                <td className="p-3 text-left pl-6">垂直伸展至原來的 <Latex math="k" inline /> 倍</td>
                <td className="p-3 border-l border-slate-200">
                  <svg viewBox="0 0 200 150" className="w-[230px] mx-auto overflow-visible">
                    <path d="M 20 75 L 180 75" stroke="#64748b" strokeWidth="1" />
                    <path d="M 20 140 L 20 10" stroke="#64748b" strokeWidth="1" />
                    <polyline points="176,71 180,75 176,79" fill="none" stroke="#64748b" strokeWidth="1" />
                    <polyline points="16,14 20,10 24,14" fill="none" stroke="#64748b" strokeWidth="1" />
                    <text x="180" y="87" fontSize="10" fill="#64748b" fontFamily="sans-serif">x</text>
                    <text x="8" y="15" fontSize="10" fill="#64748b" fontFamily="sans-serif">y</text>
                    <text x="8" y="86" fontSize="10" fill="#64748b" fontFamily="sans-serif">0</text>
                    
                    <path d="M 20,75 Q 60,25 100,75 T 180,75" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                    <text x="145" y="95" fontSize="10" fill="#9ca3af" fontFamily="serif" fontStyle="italic">y=f(x)</text>

                    <path d="M 20,75 Q 60,-25 100,75 T 180,75" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <text x="145" y="145" fontSize="11" fill="#16a34a" fontFamily="serif" fontStyle="italic">y=kf(x)</text>
                  </svg>
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3 border-r border-slate-200"><Latex math="y = \frac{1}{k}f(x)" inline /></td>
                <td className="p-3 text-left pl-6">垂直收縮至原來的 <Latex math="\frac{1}{k}" inline /></td>
                <td className="p-3 border-l border-slate-200">
                  <svg viewBox="0 0 200 150" className="w-[230px] mx-auto overflow-visible">
                    <path d="M 20 75 L 180 75" stroke="#64748b" strokeWidth="1" />
                    <path d="M 20 140 L 20 10" stroke="#64748b" strokeWidth="1" />
                    <polyline points="176,71 180,75 176,79" fill="none" stroke="#64748b" strokeWidth="1" />
                    <polyline points="16,14 20,10 24,14" fill="none" stroke="#64748b" strokeWidth="1" />
                    <text x="180" y="87" fontSize="10" fill="#64748b" fontFamily="sans-serif">x</text>
                    <text x="8" y="15" fontSize="10" fill="#64748b" fontFamily="sans-serif">y</text>
                    <text x="8" y="86" fontSize="10" fill="#64748b" fontFamily="sans-serif">0</text>
                    
                    <path d="M 20,75 Q 60,-25 100,75 T 180,75" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                    <text x="145" y="145" fontSize="10" fill="#9ca3af" fontFamily="serif" fontStyle="italic">y=f(x)</text>

                    <path d="M 20,75 Q 60,25 100,75 T 180,75" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <text x="135" y="95" fontSize="11" fill="#16a34a" fontFamily="serif" fontStyle="italic">y=f(x)/k</text>
                  </svg>
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3 bg-slate-50 font-bold text-slate-700 border-r border-slate-200" rowSpan="2">水平伸展 / 收縮</td>
                <td className="p-3 border-r border-slate-200"><Latex math="y = f(kx)" inline /></td>
                <td className="p-3 text-left pl-6">水平收縮至原來的 <Latex math="\frac{1}{k}" inline /></td>
                <td className="p-3 border-l border-slate-200">
                  <svg viewBox="0 0 200 150" className="w-[230px] mx-auto overflow-visible">
                    <path d="M 20 75 L 180 75" stroke="#64748b" strokeWidth="1" />
                    <path d="M 20 140 L 20 10" stroke="#64748b" strokeWidth="1" />
                    <polyline points="176,71 180,75 176,79" fill="none" stroke="#64748b" strokeWidth="1" />
                    <polyline points="16,14 20,10 24,14" fill="none" stroke="#64748b" strokeWidth="1" />
                    <text x="180" y="87" fontSize="10" fill="#64748b" fontFamily="sans-serif">x</text>
                    <text x="8" y="15" fontSize="10" fill="#64748b" fontFamily="sans-serif">y</text>
                    <text x="8" y="86" fontSize="10" fill="#64748b" fontFamily="sans-serif">0</text>
                    
                    <path d="M 20,75 Q 60,15 100,75 T 180,75" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                    <text x="90" y="40" fontSize="10" fill="#9ca3af" fontFamily="serif" fontStyle="italic">y=f(x)</text>

                    <path d="M 20,75 Q 30,15 40,75 T 60,75 Q 70,15 80,75 T 100,75 Q 110,15 120,75 T 140,75 Q 150,15 160,75 T 180,75 Q 190,15 200,75" stroke="#16a34a" strokeWidth="2" fill="none" clipPath="url(#clip)" />
                    <text x="135" y="40" fontSize="11" fill="#16a34a" fontFamily="serif" fontStyle="italic">y=f(kx)</text>
                    <defs>
                      <clipPath id="clip"><rect x="0" y="0" width="180" height="150" /></clipPath>
                    </defs>
                  </svg>
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3 border-r border-slate-200"><Latex math="y = f\left(\frac{1}{k}x\right)" inline /></td>
                <td className="p-3 text-left pl-6">水平伸展至原來的 <Latex math="k" inline /> 倍</td>
                <td className="p-3 border-l border-slate-200">
                  <svg viewBox="0 0 200 150" className="w-[230px] mx-auto overflow-visible">
                    <path d="M 20 75 L 180 75" stroke="#64748b" strokeWidth="1" />
                    <path d="M 20 140 L 20 10" stroke="#64748b" strokeWidth="1" />
                    <polyline points="176,71 180,75 176,79" fill="none" stroke="#64748b" strokeWidth="1" />
                    <polyline points="16,14 20,10 24,14" fill="none" stroke="#64748b" strokeWidth="1" />
                    <text x="180" y="87" fontSize="10" fill="#64748b" fontFamily="sans-serif">x</text>
                    <text x="8" y="15" fontSize="10" fill="#64748b" fontFamily="sans-serif">y</text>
                    <text x="8" y="86" fontSize="10" fill="#64748b" fontFamily="sans-serif">0</text>
                    
                    <path d="M 20,75 Q 40,15 60,75 T 100,75 Q 120,15 140,75 T 180,75 Q 200,15 220,75" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" fill="none" clipPath="url(#clip2)" />
                    <text x="50" y="125" fontSize="10" fill="#9ca3af" fontFamily="serif" fontStyle="italic">y=f(x)</text>

                    <path d="M 20,75 Q 60,15 100,75 T 180,75" stroke="#16a34a" strokeWidth="2" fill="none" />
                    <text x="100" y="25" fontSize="11" fill="#16a34a" fontFamily="serif" fontStyle="italic">y=f(x/k)</text>
                    <defs>
                      <clipPath id="clip2"><rect x="0" y="0" width="180" height="150" /></clipPath>
                    </defs>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>
    </>
  );
};
