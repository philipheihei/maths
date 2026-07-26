import React, { useRef, useEffect } from 'react';
import { Latex, CollapsibleSection } from './shared';

export const MoreEquationsNotes = ({ activeSub }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);
  const s4 = useRef(null);
  const s5 = useRef(null);
  const s6 = useRef(null);
  const s7 = useRef(null);

  useEffect(() => {
    const refs = {
      'simultaneous': s1,
      'fractional': s2,
      'higher-degree': s3,
      'exponential': s4,
      'logarithmic': s5,
      'trigonometric': s6,
      'radical': s7
    };
    if (activeSub && refs[activeSub]?.current) {
      setTimeout(() => {
        refs[activeSub].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeSub]);

  // Helper for step with explanation on right
  const Step = ({ math, explain, indent, alignEq = true }) => {
    const shouldAlignEq = alignEq && math.includes('=') && !math.includes('\\therefore');
    const eqParts = shouldAlignEq ? math.match(/^(.*?)(=)(.*)$/) : null;

    return (
      <div className={`grid grid-cols-1 md:grid-cols-[max-content_minmax(220px,1fr)] gap-x-3 py-1 ${indent ? 'pl-8' : ''}`}>
        <div className="min-w-0 text-left">
          {eqParts ? (
            <div className="w-full grid grid-cols-[136px_auto_minmax(0,1fr)] md:grid-cols-[190px_auto_minmax(0,1fr)] items-baseline gap-x-2">
              <div className="text-right pr-1"><Latex math={eqParts[1].trim()} block={false} /></div>
              <div><Latex math="=" block={false} /></div>
              <div className="min-w-0"><Latex math={eqParts[3].trim()} block={false} /></div>
            </div>
          ) : (
            <Latex math={math} block={false} />
          )}
        </div>
        {explain ? (
          <div className="mt-1 md:mt-0 text-red-600 text-sm flex items-start md:items-baseline md:justify-start gap-1.5 leading-snug">
            <span className="opacity-60">←</span>
            <span>{explain}</span>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-indigo-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH8 續方程</h1>
        <p className="text-slate-600">聯立方程與不同二次方程的變換解法</p>
      </div>

      <CollapsibleSection id="simultaneous" title="1. 聯立方程 (一元一次 + 一元二次)" num={1} color="teal" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">
            <strong>註：</strong>初中只有一次方，現在會有一次方加上二次方。
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">A. 圖解法</h3>
            <p className="text-slate-600">找交點</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">B. 代數方法</h3>
            <p className="text-sm text-slate-600 mb-2">例子：解聯立方程 <Latex math="\begin{cases} y = x^2 + 6x − 1 & \cdots ① \\ y = 4x + 2 & \cdots ② \end{cases}" /></p>
            
            <div className="bg-white rounded p-4 font-sans space-y-1">
              <Step math="y = x^2 + 6x − 1" explain="式① (先寫2次方程的式)" />
              <Step math="4x + 2 = x^2 + 6x − 1" explain="代 ② 進 ① (目的：將2個未知數減為一個)" />
              <Step math="0 = x^2 + 2x − 3" explain="變為一般式" />
              <Step math="x = 1 \text{ 或 } −3" explain="FMLA 01" />
              
              <div className="mt-4 pt-4">
                <Step math="\text{當 } x=1,\ y=4(1)+2=6" />
                <Step math="\text{當 } x=−3,\ y=4(−3)+2=−10" explain="以 x 的答案找 y 的對應值" />
                <Step math="\therefore \text{解是 } x=1, y=6 \text{ 和 } x=−3, y=−10" explain="需寫出2組的 x 和對應的 y 值（組合1 組合2）" />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <div className="bg-white rounded-2xl shadow-lg p-6 my-6 border-l-4 border-emerald-500">
        <h2 className="text-xl font-bold text-slate-800">2. 二次方程不同的呈現方法</h2>
      </div>

      <CollapsibleSection id="fractional" title="A. 分式方程 (有分數，分母為未知數)" num={2} color="emerald" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子：</p>
            <div className="bg-white rounded p-4 font-sans space-y-1">
              <Step math="(1 + \frac{4}{x})(x − 3) = 2" explain="首先找出未知數分母" />
              <Step math="x(1 + \frac{4}{x})(x − 3) = 2x" explain="2邊乘該未知數(x)，目的為消除分數" />
              <Step math="(x + 4)(x − 3) = 2x" explain="拆括號" />
              <Step math="x^2 − 3x + 4x − 12 = 2x" />
              <Step math="x^2 + x − 12 = 2x" />
              <Step math="x^2 − x − 12 = 0" />
              <Step math="x = 4 \text{ 或 } −3" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子：</p>
            <div className="bg-white rounded p-4 font-sans space-y-1">
              <Step math="\frac{8}{x^2 − 1} − \frac{4}{x − 1} = 1" explain="有理函數的四則運算" />
              <Step math="\frac{8}{(x+1)(x−1)} − \frac{4}{x − 1} = 1" explain="分母找 L.C.M. / 增補缺失的括號" />
              <Step math="\frac{8}{(x+1)(x−1)} − \frac{4(x+1)}{(x−1)(x+1)} = 1" />
              <Step math="\frac{8 − 4(x+1)}{(x+1)(x−1)} = 1" explain="要交叉相乘" />
              <Step math="8 − 4(x+1) = (x+1)(x−1)" />
              <Step math="8 − 4x − 4 = x^2 − 1" />
              <Step math="4 − 4x = x^2 − 1" />
              <Step math="0 = x^2 + 4x − 5" />
              <Step math="x = −5 \text{ 或 } 1\ (\text{捨去})" explain="分母不能 = 0" />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="higher-degree" title="B. 高次方程 (x⁴ / x⁶ etc.)" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-slate-700 font-bold mb-2">變換為一個數式的 2 次方：</p>
            <ul className="list-disc pl-5 text-slate-600">
              <li><Latex math="x^4 = (x^2)^2" /></li>
              <li><Latex math="x^6 = (x^3)^2" /></li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子：<Latex math="x^4 − 7x^2 − 18 = 0" /></p>
            <div className="bg-white rounded p-4 font-sans space-y-1">
              <Step math="(x^2)^2 − 7x^2 − 18 = 0" explain="變成 au² + bu + c = 0 的一般式，u = x²" />
              <Step math="x^2 = 9 \text{ 或 } x^2 = −2\ (\text{捨去})" explain="任何實數的 2 次方皆為正數" />
              <Step math="x = 3 \text{ 或 } −3" explain="只處理 x² = 9" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子：<Latex math="x^6 + 9x^3 + 8 = 0" /></p>
            <div className="bg-white rounded p-4 font-sans space-y-1">
              <Step math="(x^3)^2 + 9x^3 + 8 = 0" explain="以 x³ 為未知數的一般式" />
              <Step math="x^3 = −1 \text{ 或 } −8" />
              <Step math="x = −1 \text{ 或 } −2" />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="exponential" title="C. 指數方程 (指數為未知數)" num={4} color="amber" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子：<Latex math="3^{2x} + 2(3^x) − 8 = 0" /></p>
            <div className="bg-white rounded p-4 font-sans space-y-1">
              <Step math="(3^x)^2 + 2(3^x) − 8 = 0" explain="3ˣ 代替 x 的一般式" />
              <Step math="3^x = 2 \text{ 或 } 3^x = −4\ (\text{捨去})" explain="3 的任何次方都不會出負數" />
              <Step math="x \log 3 = \log 2" explain="次方為未知數需 take log 計算" />
              <Step math="x = \frac{\log 2}{\log 3}" />
              <Step math="x = 0.631" explain="(準確至3位有效數字)" />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="logarithmic" title="D. 對數方程 (含有 log)" num={5} color="cyan" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-green-700 mb-3 text-lg">10為底</h3>
            <p className="text-sm text-slate-600 mb-2">例子：<Latex math="\log (x − 3) + \log x = 1" /></p>
            <div className="bg-white rounded p-4 font-sans space-y-1">
              <Step math="\log (x − 3) + \log x = \log 10" explain="將所有數變為 log，方便消除/合併" />
              <Step math="\log [x(x − 3)] = \log 10" explain="兩邊各一個 log 包含晒所有的項，可刪 log" />
              <Step math="x(x − 3) = 10" />
              <Step math="x^2 − 3x = 10" />
              <Step math="x^2 − 3x − 10 = 0" />
              <Step math="x = 5 \text{ 或 } −2\ (\text{捨去})" explain="log x 的 x 不能為負數" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-green-700 mb-3 text-lg">10以外的數字為底</h3>
            <p className="text-sm text-slate-600 mb-2">例子：<Latex math="\log_3 x + \log_3 (x − 8) = 2" /></p>
            <div className="bg-white rounded p-4 font-sans space-y-1">
              <Step math="\log_3 x + \log_3 (x − 8) = \log_3 9" explain="首要是將2變為 log_3 的形式" />
              <Step math="\log_3 [x(x − 8)] = \log_3 9" />
              <Step math="x(x − 8) = 9" />
              <Step math="x^2 − 8x = 9" />
              <Step math="x^2 − 8x − 9 = 0" />
              <Step math="x = 9 \text{ 或 } −1\ (\text{捨去})" />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="trigonometric" title="E. 三角方程 (sin/cos/tan)" num={6} color="rose" activeSub={activeSub} sectionRef={s6}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-red-600 mb-2">緊記：</h3>
            <div className="md:flex justify-between items-center text-red-600 font-bold">
              <div>
                <p><Latex math="\sin^2\theta = 1 − \cos^2\theta" /></p>
                <p><Latex math="\cos^2\theta = 1 − \sin^2\theta" /></p>
              </div>
              <p className="mt-2 md:mt-0">➔ 由 <Latex math="\sin^2\theta + \cos^2\theta = 1" /> 衍生</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子：<Latex math="3\cos\theta − 2\sin^2\theta = 0" /></p>
            <div className="bg-white rounded p-4 font-sans space-y-1">
              <Step math="3\cos\theta − 2(1 − \cos^2\theta) = 0" explain="目的是將不同的三角函數(sin/cos/tan)變為只得一款" />
              <Step math="3\cos\theta − 2 + 2\cos^2\theta = 0" />
              <Step math="2\cos^2\theta + 3\cos\theta − 2 = 0" explain="重整為一般式" />
              
              <div className="mt-4 pt-4">
                <Step math="\cos\theta = 0.5 \text{ 或 } −2\ (\text{捨去})" explain="cosθ 範圍是 -1 至 1" />
                <Step math="\theta = 60^\circ \text{ 或 } 300^\circ" />
              </div>
            </div>

            {/* ASTC Quadrant diagram placeholder */}
            <div className="mt-4">
              {/* 📐 待繪製：[ASTC象限圖] — 見下方繪圖規格單 */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-400 text-sm">
                圖示待加入（@數學繪圖師）
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="radical" title="F. 含有根號的方程 (開方)" num={7} color="indigo" activeSub={activeSub} sectionRef={s7}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">例子：<Latex math="x = \sqrt{7−x} + 5" /></p>
            <div className="bg-white rounded p-4 font-sans space-y-1">
              <Step math="x − 5 = \sqrt{7−x}" explain="有根號包含的放一邊，沒根號的放另一邊" />
              <Step math="(x − 5)^2 = (\sqrt{7−x})^2" explain="左右 × 2次方消除開方" />
              <Step math="(x − 5)^2 = 7 − x" />
              <Step math="x^2 − 10x + 25 = 7 − x" />
              <Step math="x^2 − 9x + 18 = 0" />
              <Step math="x = 6 \text{ 或 } 3" />
              
              <div className="mt-4 pt-4 border-t border-slate-200 border-dashed">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 text-slate-700">
                  <div className="flex-1 space-y-2">
                    <p><Latex math="\text{當 } x=6，\text{右方} = \sqrt{7−6} + 5 = 6 = \text{左方}" /></p>
                    <p><Latex math="\text{當 } x=3，\text{右方} = \sqrt{7−3} + 5 = 7 \neq \text{左方}" /></p>
                    <p className="mt-4 font-bold"><Latex math="\therefore x = 6" /></p>
                  </div>
                  <div className="md:w-1/2 md:text-right text-red-600 text-sm">
                    <span className="opacity-60 hidden md:inline">←</span>
                    <span> 因2次方整條式後會產生一對一錯的答案，透過驗算的方法去做篩選。</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};
