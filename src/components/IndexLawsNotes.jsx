import React from 'react';
import { loadKatexOnce } from '../utils/katexLoader';
import { CornerDownRight, ArrowRight, CornerRightDown } from 'lucide-react';

const Latex = ({ math, block = false }) => {
  const containerRef = React.useRef(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    loadKatexOnce().then(() => setIsLoaded(true)).catch(e => console.error(e));
  }, []);

  React.useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        window.katex.render(math, containerRef.current, {
          throwOnError: false,
          displayMode: block,
          strict: false,
          trust: true
        });
      } catch (e) { containerRef.current.textContent = math; }
    }
  }, [math, block, isLoaded]);

  return <span ref={containerRef} className={block ? "block my-2" : "inline-block align-middle text-lg"} />;
};

export default function IndexLawsNotes() {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 text-slate-800 font-sans space-y-10 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", sans-serif' }}>
      
      {/* 總結：解題次序 */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>指數定律 解題次序：</span>
        </h2>
        <div className="ml-8 space-y-2 text-green-700 font-bold text-lg">
          <p>1. 拆括號</p>
          <p>2. 負指數 → 正指數</p>
          <p>3. 指數約簡</p>
        </div>
      </section>

      <hr className="border-blue-200" />

      {/* 1. 拆括號 */}
      <section>
        <h2 className="text-xl font-bold text-red-600 mb-4 tracking-wide flex flex-wrap items-center gap-1">
          <span>1. </span>
          <span className="bg-green-200 text-red-600 px-1 rounded">有括號</span>
          <span>就次方</span>
          <span className="bg-green-200 text-red-600 px-1 rounded">乘</span>
          <span>，</span>
          <span className="bg-yellow-200 text-red-600 px-1 rounded">沒括號</span>
          <span>就次方</span>
          <span className="bg-yellow-200 text-red-600 px-1 rounded">加</span>
        </h2>
        <div className="space-y-6 ml-4">
          
          <div className="relative">
            <span className="text-blue-900 font-bold mr-2 text-xl italic">e.g.</span>
            <Latex math="\Large y^{\colorbox{#fef08a}{\scriptsize $2$}} \cdot y^{\colorbox{#fef08a}{\scriptsize $3$}} = y^{\colorbox{#fef08a}{\scriptsize $2+3$}} = y^{\colorbox{#fef08a}{\scriptsize $5$}}" />
          </div>

          <div>
            <span className="text-blue-900 font-bold mr-2 text-xl italic">e.g.</span>
            <Latex math="\Large (y^{\colorbox{#bbf7d0}{\scriptsize $2$}})^{\colorbox{#bbf7d0}{\scriptsize $3$}} = y^{\colorbox{#bbf7d0}{\scriptsize $2 \times 3$}} = y^{\colorbox{#bbf7d0}{\scriptsize $6$}}" />
          </div>

        </div>
      </section>

      <hr className="border-blue-200" />

      {/* 2. 負指數 */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex flex-wrap items-center gap-2">
          <span>2. </span>
          <span className="bg-yellow-300 text-red-600 px-1 rounded">負指數</span>
          <span className="text-red-600">→ 正指數</span>
          <span className="text-green-700 ml-2">(上下調轉)</span>
        </h2>

        <div className="ml-4 overflow-x-auto">
          <div className="grid items-center gap-x-4 gap-y-6" style={{ gridTemplateColumns: 'auto auto auto auto 1fr' }}>
            {/* Row 1 */}
            <span className="text-blue-900 font-bold text-xl italic">e.g.</span>
            <Latex math="\Large x^{\colorbox{#fef08a}{\scriptsize $-4$}}" />
            <span className="font-bold text-xl">=</span>
            <Latex math="\Large \frac{1}{x^{\colorbox{#fef08a}{\scriptsize $4$}}}" />
            <span className="text-green-700 font-bold text-lg">負指數：上轉下</span>

            {/* Row 2 */}
            <span />
            <Latex math="\Large \frac{1}{y^{\colorbox{#fef08a}{\scriptsize $-3$}}}" />
            <span className="font-bold text-xl">=</span>
            <Latex math="\Large y^{\colorbox{#fef08a}{\scriptsize $3$}}" />
            <span className="text-green-700 font-bold text-lg">負指數：下轉上</span>

            {/* Row 3 */}
            <span />
            <Latex math="\Large \frac{x^{\colorbox{#fef08a}{\scriptsize $-2$}}}{y^{\colorbox{#fef08a}{\scriptsize $-5$}}}" />
            <span className="font-bold text-xl">=</span>
            <Latex math="\Large \frac{y^{\colorbox{#fef08a}{\scriptsize $5$}}}{x^{\colorbox{#fef08a}{\scriptsize $2$}}}" />
            <span className="text-green-700 font-bold text-lg">負指數：上下調轉</span>

            {/* Row 4 */}
            <span />
            <Latex math="\Large \frac{a^{\colorbox{#fef08a}{\scriptsize $-11$}}b^7}{b^5}" />
            <span className="font-bold text-xl">=</span>
            <Latex math="\Large \frac{b^7}{a^{11}b^5}" />
            <span className="text-green-700 font-bold text-lg leading-tight">負指數上下調轉，正指數不動</span>

            {/* Row 5 */}
            <span />
            <Latex math="\Large (ab)^{-2}" />
            <span className="font-bold text-xl">=</span>
            <Latex math="\Large \frac{1}{a^2b^2}" />
            <span className="text-green-700 font-bold text-lg">← 上面沒有 需補 1</span>
          </div>
        </div>
      </section>

      <hr className="border-blue-200" />

      {/* 3. 指數約簡 */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-red-600">3. 指數約簡</span>
          <span className="text-green-700">(大減小)</span>
        </h2>

        <div className="space-y-6 ml-4">
          <div>
            <h3 className="text-lg font-bold mb-4">A. 上下約 (分數)</h3>
            <div className="space-y-6 pl-4">
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
                <span className="text-green-700 font-bold whitespace-nowrap">情況 1 : 上面次方較大, 次方留在上</span>
                <span className="text-blue-900 font-bold italic ml-2 mr-1">e.g.</span>
                <Latex math="\Large \frac{a^7}{a^5} = \frac{a^{7-5}}{1} = a^2" />
              </div>
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
                <span className="text-green-700 font-bold whitespace-nowrap">情況 2 : 下面次方較大, 次方留在下</span>
                <span className="text-blue-900 font-bold italic ml-2 mr-1">e.g.</span>
                <Latex math="\Large \frac{a^5}{a^7} = \frac{1}{a^{7-5}} = \frac{1}{a^2}" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-bold mb-4">B. 左右約</h3>
            <div className="space-y-3 pl-8">
              <div className="flex items-center gap-4">
                <span className="text-blue-900 font-bold italic w-8 text-right">e.g.</span>
                <Latex math="\Large (ab^5)(a^2b^3)^2" />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 flex justify-end font-bold">=</span>
                <Latex math="\Large ab^5 \cdot a^4b^6" />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 flex justify-end font-bold">=</span>
                <Latex math="\Large \colorbox{#fef08a}{$a$} \cdot \colorbox{#fef08a}{$a^4$} \cdot \colorbox{#bbf7d0}{$b^5$} \cdot \colorbox{#bbf7d0}{$b^6$}" />
                <span className="text-green-700 font-bold ml-2">← 分類</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 flex justify-end font-bold">=</span>
                <Latex math="\Large \colorbox{#fef08a}{$a^5$} \cdot \colorbox{#bbf7d0}{$b^{11}$}" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-blue-200" />

      {/* 總結：按次序 flows */}
      <section>
        <h2 className="inline-block text-xl font-bold text-red-600 border-b-2 border-red-600 mb-6 pb-1">
          總結 : 按次序
        </h2>
        
        <div className="flex items-start">
          <div className="flex flex-col justify-between items-end space-y-12 text-green-700 font-bold text-lg mt-4 w-40">
            <div>1. 拆括號</div>
            <div>2. 負指數 → 正指數</div>
            <div>3. 上下 / 左右化簡</div>
          </div>

          <div className="flex flex-col ml-6 space-y-4 pt-1 relative">
            <div className="flex items-center">
              <Latex math="\Large \frac{\colorbox{#fef08a}{\scriptsize $(x^{-3}y^5)^2$}}{y^2}" />
            </div>
            <div className="px-4">
              <CornerDownRight size={24} className="text-green-600 mx-auto transform" />
            </div>
            <div className="flex items-center">
              <span className="mr-2 font-bold">=</span>
              <Latex math="\Large \frac{\colorbox{#fef08a}{\scriptsize $x^{-6}y^{10}$}}{y^2}" />
            </div>
            <div className="px-4">
              <CornerDownRight size={24} className="text-green-600 mx-auto" />
            </div>
            <div className="flex items-center">
              <span className="mr-2 font-bold">=</span>
              <Latex math="\Large \frac{y^{10}}{x^6y^2}" />
            </div>
            <div className="px-4">
              <CornerDownRight size={24} className="text-green-600 mx-auto" />
            </div>
            <div className="flex items-center">
              <span className="mr-2 font-bold">=</span>
              <Latex math="\Large \frac{y^8}{x^6}" />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-blue-200" />

      {/* MC 題目 */}
      <section className="bg-slate-50 p-4 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black mb-4">MC 題目 : 全數字沒代數</h2>
        
        <ul className="space-y-2 mb-8 text-lg">
          <li className="flex items-start gap-2">
            <span className="font-bold">-</span>
            <span>必須令<span className="text-green-700 font-bold mx-1">底數或指數</span>一樣才能化簡</span>
          </li>
          <li className="pl-4">
            需視乎可行性去通<span className="text-green-700 font-bold mx-1">底數 / 指數</span>
            <span className="text-red-600 font-bold text-sm sm:text-base">(觀察哪裡相似)</span>
          </li>
        </ul>

        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-bold mb-4">技巧 1 : 次方轉為相同</h3>
            <div className="space-y-4 pl-4 md:pl-8">
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
                <span className="text-blue-900 font-bold italic w-8 mr-2">e.g.</span>
                <Latex math="\Large \left(\frac{1}{4^{\colorbox{#fef08a}{\scriptsize $222$}}}\right)(12^{\colorbox{#fef08a}{\scriptsize $444$}})" />
                <span className="text-green-700 font-bold ml-2">← 適用於指數有倍數關係的題目</span>
              </div>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                <span className="font-bold w-4 mr-6 flex justify-end">=</span>
                <Latex math="\Large \frac{12^{\colorbox{#fef08a}{\scriptsize $444$}}}{(2^2)^{\colorbox{#fef08a}{\scriptsize $222$}}}" />
                <span className="text-green-700 font-bold whitespace-nowrap">2 × 222 = 444</span>
              </div>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mt-2">
                <span className="font-bold w-4 mr-6 flex justify-end">=</span>
                <Latex math="\Large \frac{12^{\colorbox{#fef08a}{\scriptsize $444$}}}{2^{\colorbox{#fef08a}{\scriptsize $444$}}}" />
                <span className="text-green-700 font-bold ml-2">← 次方相同，合成指數：<Latex math="\Large \frac{a^n}{b^n} = \left(\frac{a}{b}\right)^n" /></span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <span className="font-bold w-4 mr-6 flex justify-end">=</span>
                <Latex math="\Large \left(\frac{12}{2}\right)^{\colorbox{#fef08a}{\scriptsize $444$}}" />
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <span className="font-bold w-4 mr-6 flex justify-end">=</span>
                <Latex math="\Large 6^{\colorbox{#fef08a}{\scriptsize $444$}}" />
              </div>
            </div>
          </div>

          <div className="pb-4">
            <h3 className="text-xl font-bold mb-4">技巧 2 : 底數轉為相同</h3>
            <div className="space-y-4 pl-4 md:pl-8">
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                <span className="text-blue-900 font-bold italic w-8 mr-2">e.g.</span>
                <Latex math="\Large \colorbox{#fef08a}{\scriptsize $3$}^{3n+9} \cdot \colorbox{#fef08a}{\scriptsize $27$}^{n-2}" />
                <span className="text-green-700 font-bold ml-2">← 適用於兩者為次方的關係 <span className="font-sans">(3³=27)</span></span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold w-4 mr-6 flex justify-end">=</span>
                <Latex math="\Large \colorbox{#fef08a}{\scriptsize $3$}^{3n+9} \cdot (\colorbox{#fef08a}{\scriptsize $3$}^3)^{n-2}" />
              </div>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mt-2">
                <span className="font-bold w-4 mr-6 flex justify-end">=</span>
                <Latex math="\Large \colorbox{#fef08a}{\scriptsize $3$}^{3n+9} \cdot \colorbox{#fef08a}{\scriptsize $3$}^{3(n-2)}" />
                <span className="text-green-700 font-bold ml-2">← 底數相同，可合併次方加減</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold w-4 mr-6 flex justify-end">=</span>
                <Latex math="\Large 3^{3n+9+3(n-2)}" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold w-4 mr-6 flex justify-end">=</span>
                <Latex math="\Large 3^{3n+9+3n-6}" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold w-4 mr-6 flex justify-end">=</span>
                <Latex math="\Large 3^{6n+3}" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
