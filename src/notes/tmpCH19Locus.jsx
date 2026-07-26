export const LocusAndCircleNotes = ({ activeSub, onNavigate }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  useEffect(() => {
    const refs = { 'locus-drawing': s1, 'circle-equation': s2, 'circle-features': s3, 'point-and-circle': s4, 'line-and-circle': s5 };
    if (activeSub && refs[activeSub]?.current) {
      refs[activeSub].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSub]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH19 軌跡及圓的方程</h1>
        <p className="text-slate-600">軌跡的代數方程及圓形相關運算</p>
      </div>

      <CollapsibleSection id="locus-drawing" title="繪畫及描述軌跡" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <p className="text-slate-700">以下是一些軌跡的例子：</p>
          <div className="grid grid-cols-1 gap-4">
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-emerald-600 font-bold mb-1">條件：<span className="text-slate-700 font-normal">一動點 <Latex math="P" inline /> 與一固定點 <Latex math="A" inline /> 保持固定距離 <Latex math="d" inline />。</span></div>
              <div className="text-emerald-600 font-bold mb-3">軌跡：<span className="text-slate-700 font-normal">一個圓心為 <Latex math="A" inline /> 及半徑為 <Latex math="d" inline /> 的圓</span></div>
              {/* 📐 待繪製：軌跡例1：固定點固定距離 — 見下方繪圖規格單 */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-400 text-sm">
                圖示待加入（@數學繪圖師）
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-emerald-600 font-bold mb-1">條件：<span className="text-slate-700 font-normal">一動點 <Latex math="P" inline /> 與一對平行線 <Latex math="L_1" inline /> 和 <Latex math="L_2" inline /> 保持相等距離。</span></div>
              <div className="text-emerald-600 font-bold mb-3">軌跡：<span className="text-slate-700 font-normal">一條位於 <Latex math="L_1" inline /> 和 <Latex math="L_2" inline /> 中間，且平行於 <Latex math="L_1" inline /> 和 <Latex math="L_2" inline /> 的直線 <Latex math="L" inline /></span></div>
              {/* 📐 待繪製：軌跡例2：兩平行線相等距離 — 見下方繪圖規格單 */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-400 text-sm">
                圖示待加入（@數學繪圖師）
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-emerald-600 font-bold mb-1">條件：<span className="text-slate-700 font-normal">一動點 <Latex math="P" inline /> 與直線 <Latex math="L" inline /> 保持固定距離 <Latex math="d" inline />。</span></div>
              <div className="text-emerald-600 font-bold mb-3">軌跡：<span className="text-slate-700 font-normal">兩條與 <Latex math="L" inline /> 相距 <Latex math="d" inline />，且平行於 <Latex math="L" inline /> 的直線 <Latex math="L_1" inline /> 和 <Latex math="L_2" inline /></span></div>
              {/* 📐 待繪製：軌跡例3：一直線固定距離 — 見下方繪圖規格單 */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-400 text-sm">
                圖示待加入（@數學繪圖師）
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-emerald-600 font-bold mb-1">條件：<span className="text-slate-700 font-normal">一動點 <Latex math="P" inline /> 與兩個固定點 <Latex math="A" inline /> 和 <Latex math="B" inline /> 保持相等距離。</span></div>
              <div className="text-emerald-600 font-bold mb-3">軌跡：<span className="text-slate-700 font-normal">線段 <Latex math="AB" inline /> 的垂直平分線</span></div>
              {/* 📐 待繪製：軌跡例4：兩點相等距離 — 見下方繪圖規格單 */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-400 text-sm">
                圖示待加入（@數學繪圖師）
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-emerald-600 font-bold mb-1">條件：<span className="text-slate-700 font-normal">一動點 <Latex math="P" inline /> 與兩條相交線保持相等距離。</span></div>
              <div className="text-emerald-600 font-bold mb-3">軌跡：<span className="text-slate-700 font-normal">兩條相交線所形成的角的兩條角平分線。</span></div>
              {/* 📐 待繪製：軌跡例5：兩相交線相等距離 — 見下方繪圖規格單 */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-400 text-sm">
                圖示待加入（@數學繪圖師）
              </div>
            </div>

          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 mt-6">
            <h3 className="font-bold text-slate-800 mb-3">📝 軌跡的代數方程例子</h3>
            <p className="text-sm text-slate-600 mb-3">已知一動點 <Latex math="P" inline /> 與 <Latex math="A(3, 7)" inline /> 和 <Latex math="B(−4, 0)" inline /> 兩點保持相等距離。求 <Latex math="P" inline /> 的軌跡方程。</p>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-slate-50 p-3 rounded">
                <p className="text-slate-700 mb-2">設 <Latex math="P" inline /> 的坐標為 <Latex math="(x, y)" inline />。</p>
                <div className="flex flex-col items-center">
                  <Latex math="\begin{aligned} AP &= BP \\ \sqrt{(x − 3)^2 + (y − 7)^2} &= \sqrt{[x − (−4)]^2 + (y − 0)^2} \\ (x − 3)^2 + (y − 7)^2 &= (x + 4)^2 + y^2 \\ −14x − 14y + 42 &= 0 \\ x + y − 3 &= 0 \end{aligned}" block />
                </div>
                <p className="text-slate-700 mt-2">∴ <Latex math="P" inline /> 的軌跡方程是 <Latex math="x + y − 3 = 0" inline />。</p>
              </div>
              <div className="flex-1 text-sm text-blue-700 space-y-3 pt-6 border-l-2 border-blue-200 pl-4 hidden md:block">
                <p>步驟 1： 設動點的坐標為 <Latex math="(x, y)" inline />。</p>
                <p>步驟 2： 根據該動點須滿足的條件，建立一個以 <Latex math="x" inline /> 和 <Latex math="y" inline /> 為變數的方程。</p>
                <p>步驟 3： 倘若可行，化簡該方程。</p>
              </div>
            </div>
          </div>

        </div>
      </CollapsibleSection>

      <CollapsibleSection id="circle-equation" title="圓形方程" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-purple-100 text-purple-900 px-3 py-1.5 rounded-md inline-block font-bold">
            需知道 / 可找到 圓心坐標 <Latex math="(x,y)" inline />，以及半徑 <Latex math="r" inline />
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-3">📝 2.1 標準式</h3>
            <MathDisplay math="(x − \text{x坐標})^2 + (y − \text{y坐標})^2 = \text{半徑}^2" />
            <div className="bg-white border border-slate-200 rounded p-4 mt-3">
              <p className="text-blue-800 font-bold mb-2">e.g. 已知一圓的圓心 <Latex math="(−1, 6)" inline /> 和半徑 9，可列出：</p>
              <pre className="whitespace-pre font-sans text-lg text-blue-900 flex flex-col items-center">
                <div>
                  <Latex math="[x − (−1)]^2 + (y − 6)^2 = 9^2" block />
                  <Latex math="(x + 1)^2 + (y − 6)^2 = 81" block />
                </div>
              </pre>
              <p className="text-purple-700 text-sm mt-3 text-right">← 不需展開有代數的 <Latex math="(\ )^2" inline />，只需化簡數字</p>
            </div>
          </div>

          <div className="cursor-pointer mx-auto w-12 text-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto transform rotate-180 scale-x-[-1] animate-bounce"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
            <span className="text-xs font-bold text-red-600 block mt-1">拆括號再按次序排列</span>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-3">📝 2.2 一般式</h3>
            <MathDisplay math="x^2 + y^2 + Dx + Ey + F = 0" />
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center bg-white p-3 rounded border border-slate-200">
              <span className="text-blue-800 font-bold text-lg"><span className="text-slate-600">圓心：</span><Latex math="\left( −\frac{D}{2}, −\frac{E}{2} \right)" inline /></span>
              <span className="text-blue-800 font-bold text-lg mt-3 md:mt-0"><span className="text-slate-600">半徑：</span><Latex math="\sqrt{\left(\frac{D}{2}\right)^2 + \left(\frac{E}{2}\right)^2 − F}" inline /></span>
            </div>
          </div>

        </div>
      </CollapsibleSection>

      <CollapsibleSection id="circle-features" title="題目問法及找圓心半徑" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-6">
          <h3 className="font-bold text-slate-800">題目問法：</h3>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2">1. 已提供圓心、半徑，要求你寫方程</h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><span className="text-red-600 font-bold">寫標準式</span>，如題目要求 / 需後續找其他才拆成一般式。</li>
              <li>某些題目需自己找半徑。<br/>
                <span className="text-green-600 text-sm">（例如：已知通過圓心及圓上一點，可計距離；或給直徑兩端，計中點為圓心，距離為半徑等。）</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2">2. 已提供圓形方程，要求你找圓心及半徑</h4>
            
            <div className="mt-4">
              <div className="bg-slate-50 p-3 rounded mb-3">
                <span className="text-red-500 font-bold mr-2">標準式：</span>
                <Latex math="(x − \color{#16a34a}{3})^2 + (y − \color{#9333ea}{4})^2 = \color{#2563eb}{36}" block />
                <div className="text-center mt-3 text-slate-800 font-bold text-lg">
                  ∴ 圓心：<Latex math="(\color{#16a34a}{3}, \color{#9333ea}{4})" inline />，半徑：<Latex math="\sqrt{\color{#2563eb}{36}} = 6" inline />
                </div>
                <p className="text-xs text-slate-500 text-center mt-2">註：加減號為固定格式，數字本身為答案資料</p>
              </div>

              <div className="bg-slate-50 p-3 rounded mt-6">
                <span className="text-red-500 font-bold mr-2">一般式：</span>
                <Latex math="x^2 + y^2 \color{#16a34a}{−6}x \color{#9333ea}{+8}y \color{#2563eb}{−11} = 0" block />
                <div className="text-center mt-3 text-slate-800 font-bold text-lg">
                  圓心：<Latex math="\left( \frac{\color{#16a34a}{−6}}{−2}, \frac{\color{#9333ea}{+8}}{−2} \right) \rightarrow (3, −4)" inline />
                </div>
                <div className="text-center mt-2 text-slate-800 font-bold text-lg">
                  半徑：<Latex math="\sqrt{(3)^2 + (−4)^2 − (\color{#2563eb}{−11})} = \sqrt{36} = 6" inline />
                </div>
                
                <div className="mt-5 border-t border-slate-200 pt-4 flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1">
                    <p className="text-blue-800 font-bold text-sm mb-1">e.g. 若 <Latex math="x^2" inline /> 和 <Latex math="y^2" inline /> 係數不為 1，需先全式除之：</p>
                    <Latex math="\color{#0e7490}{2x^2 + 2y^2 − 12x + 16y − 22 = 0}" block />
                    <p className="text-green-600 font-bold text-sm text-center my-1">全式 ÷ 2 ↓</p>
                    <Latex math="\color{#16a34a}{\underline{x^2 + y^2}} \color{#0e7490}{− 6x + 8y − 11 = 0}" block />
                  </div>
                  <div className="text-green-600 font-bold text-lg bg-green-50 px-3 py-2 rounded shrink-0">
                    <Latex math="x^2" inline /> 和 <Latex math="y^2" inline /> 的係數必定為 1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="point-and-circle" title="點與圓形的位置關係" num={4} color="orange" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800">3. 問點在圖形內 / 在圓上 / 外？</h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-800 mb-2">以代數法找：</h4>
            <div className="flex items-center justify-around my-4 bg-white p-4 rounded shadow-sm">
              <div className="text-center">
                <div className="text-green-600 font-bold text-lg border-b-2 border-green-600 px-2 pb-1 mb-1">代入結果 &lt; 0</div>
                <div className="text-green-800 font-bold text-xl">內 (負數)</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 font-bold text-lg border-b-2 border-blue-600 px-2 pb-1 mb-1">代入結果 = 0</div>
                <div className="text-blue-800 font-bold text-xl">在圓上</div>
              </div>
              <div className="text-center">
                <div className="text-purple-600 font-bold text-lg border-b-2 border-purple-600 px-2 pb-1 mb-1">代入結果 &gt; 0</div>
                <div className="text-purple-800 font-bold text-xl">外 (正數)</div>
              </div>
            </div>

            <div className="bg-white rounded p-4 border border-slate-200 mt-4">
              <p className="text-blue-800 font-bold mb-2 text-sm md:text-base">
                e.g. <Latex math="A(0, 1)" inline /> 在圓形 <Latex math="x^2 + y^2 − 6x + 8y − 11 = 0" inline /> 的圓內、圓外或圓上？
              </p>
              <pre className="whitespace-pre font-sans text-blue-900 mt-2">
                <Latex math="\begin{aligned} &\quad x^2 + y^2 − 6x + 8y − 11 \\ &= (\color{#ef4444}{0})^2 + (\color{#22c55e}{1})^2 − 6(\color{#ef4444}{0}) + 8(\color{#22c55e}{1}) − 11 \\ &= −2 \\ &\quad −2 < 0 \end{aligned}" block />
              </pre>
              <p className="text-slate-800 font-bold mt-2">∴ <Latex math="A" inline /> 點位於圖形內</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <h3 className="font-bold text-red-800 mb-2">💡 特別提示：三點共圓 (深!)</h3>
            <p className="text-sm text-slate-700">
              給予 3 點坐標，可以設立 3 個方程組求一般式的 <Latex math="D, E, F" inline /> 常數。
            </p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="line-and-circle" title="直線和圓形的交點數目" num={5} color="red" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-5 border border-slate-200">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <p className="text-blue-800 font-bold text-lg mb-2">e.g.</p>
                <div className="pl-4 border-l-2 border-slate-300 space-y-1">
                  <p className="text-blue-900"><span className="mr-2">圓形 C :</span> <Latex math="x^2 + y^2 + 8x + 8y − 32 = 0" inline /></p>
                  <p className="text-blue-900"><span className="mr-2">直線 L :</span> <Latex math="x + y + 2 = 0" inline /></p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex justify-center bg-blue-50 py-2 px-4 rounded w-full">
                  <Latex math="\color{#dc2626}{x = −y − 2}" block />
                </div>
                <div className="flex-1 text-green-700 font-bold text-sm">
                  1. 先將直線方程轉為 <Latex math="x = ? / y = ?" inline />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex justify-center bg-blue-50 py-2 px-4 rounded w-full">
                  <Latex math="\color{#dc2626}{(−y−2)}^2 + y^2 + 8\color{#dc2626}{(−y−2)} + 8y − 32 = 0" block />
                </div>
                <div className="flex-1 text-green-700 font-bold text-sm">
                  2. 把 x 代 y / 把 y 代 x<br/>
                  <span className="text-purple-700 tracking-wider">（直線方程代進圓形方程）</span>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <div className="h-4 border-l-2 border-slate-300"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex flex-col items-center bg-blue-50 py-2 px-4 rounded w-full">
                  <Latex math="\begin{aligned} y^2 + 4y + 4 + y^2 − 8y − 16 + 8y − 32 &= 0 \\ \textcolor{#1d4ed8}{2y^2 + 4y − 44} &= \textcolor{#1d4ed8}{0} \\ \underline{\overset{\textcolor{#9333ea}{\large a}}{y^2} + \overset{\textcolor{#9333ea}{\large b}}{\vphantom{y^2}2}y − \overset{\textcolor{#9333ea}{\large c}}{\vphantom{y^2}22}} &= \underline{0} \end{aligned}" block />
                </div>
                <div className="flex-1 text-green-700 font-bold text-sm">
                  3. 化簡至一元二次方程的一般式
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex flex-col items-center bg-blue-50 py-2 px-4 rounded w-full">
                  <Latex math="\begin{aligned} \Delta &= b^2 − 4ac \\ &= 2^2 − 4(1)(−22) \\ &= 92 > 0 \end{aligned}" block />
                  <div className="mt-3 font-bold text-blue-900 border-t border-slate-300 pt-2">
                    ∴ 圓形 C 和直線 L 有 2 個交點
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-green-700 font-bold text-sm mb-3">
                    4. 利用判別式找交點數目
                  </div>
                  <div className="bg-slate-100 p-2 rounded text-center grid grid-cols-3 gap-2 text-xs border border-slate-300">
                    <div className="border-r border-slate-300 pr-2">
                      <div className="font-bold text-blue-800">情況 I</div>
                      <div><Latex math="\Delta > 0" inline /></div>
                      <div className="font-bold mt-1">有兩個交點</div>
                    </div>
                    <div className="border-r border-slate-300 pr-2">
                      <div className="font-bold text-slate-800">情況 II</div>
                      <div><Latex math="\Delta = 0" inline /></div>
                      <div className="font-bold mt-1">有一個交點</div>
                    </div>
                    <div>
                      <div className="font-bold text-red-800">情況 III</div>
                      <div><Latex math="\Delta < 0" inline /></div>
                      <div className="font-bold mt-1">沒有交點</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mt-4">
            <h3 className="font-bold text-amber-900 mb-3">💡 直線和圓形方程的交點坐標：計算機 Prog 02</h3>
            <div className="bg-white p-3 rounded border border-slate-200 flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1">
                <Latex math="\begin{cases} \enspace\color{#fbbf24}{1}x \color{#fbbf24}{−5}y = \color{#fbbf24}{−3} \\ \enspace x^2 + y^2 + 2x − 6y − 3 = 0 \end{cases}" block />
              </div>
              <div className="flex-1 text-slate-800 font-bold text-center mt-3 md:mt-0">
                <span className="text-blue-600 mr-2 text-xl">⇒</span> <Latex math="x = −3, y = 0 \enspace ; \enspace x = 2, y = 1" inline />
                <p className="mt-2 text-emerald-700">∴ 交點：<Latex math="(−3, 0), (2, 1)" inline /></p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">註：順序輸入：紅1、紅2、紅3... 為計算機輸入次序及位置</p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};
