import React, { useRef } from 'react';
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
                  
                  <div className="text-blue-700 font-bold mt-3">b) n 的最大值 (首 n 項和 > 0)：</div>
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
