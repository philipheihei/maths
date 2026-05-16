import React, { useRef } from 'react';
import { CollapsibleSection, Latex, MathDisplay } from './shared';

export const BasicCalculationNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  // 產生 1-100 質數表
  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const hundredGrid = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH1 基礎計算</h1>
        <p className="text-slate-600">整除性、質因數、最大公因數與最小公倍數</p>
      </div>

      <CollapsibleSection id="divisibility" title="1. 整除性" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📝 常見整除法則</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 2 整除</div>
                <div className="col-span-2">看尾數：雙數 <span className="text-green-600 font-bold">✓</span>，單數 <span className="text-red-500 font-bold">×</span></div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 3 整除</div>
                <div className="col-span-2">將該數的每一個數字相加，看是否 <span className="bg-yellow-200 px-1 rounded">3 的倍數</span></div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 4 整除</div>
                <div className="col-span-2">將尾 2 個數 ÷ 4，看有沒有餘數（沒有 <span className="text-green-600 font-bold">→ 能整除</span>）</div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 5 整除</div>
                <div className="col-span-2">看尾數：為 5 或 0</div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 6 整除</div>
                <div className="col-span-2">檢查是否同時被 2 和 3 整除（套用上兩行方法）</div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 8 整除</div>
                <div className="col-span-2">將尾 3 個數 ÷ 8，看有沒有餘數（沒有 <span className="text-green-600 font-bold">→ 能整除</span>）</div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 9 整除</div>
                <div className="col-span-2">將該數的每一個數字相加，看是否 <span className="bg-yellow-200 px-1 rounded">9 的倍數</span></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-bold text-slate-700">被 10 整除</div>
                <div className="col-span-2">看尾數：為 0</div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="indices" title="2. 指數記數法 (次方)" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 概念分辨</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Latex math={`3 \\times 5 = 3 + 3 + 3 + 3 + 3`} />
              </div>
              <div className="flex items-center gap-4">
                <Latex math={`3^5 = 3 \\times 3 \\times 3 \\times 3 \\times 3`} />
                <span className="text-slate-600 text-sm">（5 個 3 相乘）</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">例子：</p>
            <div className="flex flex-wrap items-center gap-2 font-sans font-bold">
              <span className="bg-yellow-200 px-1">5 × 5 × 5</span>
              <span>×</span>
              <span className="bg-blue-200 px-1">7 × 7 × 7 × 7 × 7 × 7</span>
              <span>=</span>
              <span className="bg-yellow-200 px-1">5<sup>3</sup></span>
              <span>×</span>
              <span className="bg-blue-200 px-1">7<sup>6</sup></span>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="prime-factorization" title="3. 質因數連乘式" num={3} color="blue" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-blue-800 mb-2">3.1 因數</h3>
            <p className="text-slate-700 mb-2">可以乘出該數的數字。</p>
            <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-4">
              <span className="font-bold">e.g. 24 的組合：</span>
              <ul className="text-slate-700">
                <li>1 × 24 = 24</li>
                <li>2 × 12 = 24</li>
                <li>3 × 8 = 24</li>
                <li>4 × 6 = 24</li>
              </ul>
            </div>
            <p className="mt-2 text-slate-700">▸ 24 的因數是 1, 2, 3, 4, 6, 8, 12, 24</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-blue-800 mb-4">3.2 質數</h3>
            <p className="text-slate-700 mb-4">只有 1 和數字本身是因數的數字。</p>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1 w-full max-w-sm">
                <div className="grid grid-cols-10 gap-1 text-center text-sm font-sans">
                  {hundredGrid.map((num) => (
                    <div 
                      key={num}
                      className={`py-1 border border-slate-200 ${isPrime(num) ? 'bg-yellow-300 font-bold' : 'bg-white text-slate-400'}`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-4 text-sm justify-center">
                  <div className="flex items-center gap-1"><span className="w-4 h-4 bg-yellow-300 border border-slate-300"></span> 質數 (Prime)</div>
                  <div className="flex items-center gap-1"><span className="w-4 h-4 bg-white border border-slate-300"></span> 1 或 合成數 (Composite)</div>
                </div>
              </div>
              
              <div className="flex-1 bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-700 mb-2">100以內的質數 - 快速記憶法</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  熟記 2、3、5、7，再找出 6 的倍數前後位置的數，只要不是 5 或 7 的倍數，就一定是質數，總共有 25 個質數。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-blue-800 mb-2">3.3 質因數</h3>
            <p className="text-slate-700 mb-2">同時是質數和因數。用質因數連乘式表達：</p>
            <div className="bg-slate-50 p-4 rounded-lg font-sans">
              <p className="mb-1">e.g. 40</p>
              <table className="ml-4 border-none text-slate-700">
                <tbody>
                  <tr>
                    <td className="text-right pr-2">=</td>
                    <td className="font-bold text-left"><span className="bg-yellow-200 px-1">8</span> × 5</td>
                    <td className="pl-4 text-green-700 text-sm">← 若當中有合成數，需繼續拆乘式</td>
                  </tr>
                  <tr>
                    <td className="text-right pr-2">=</td>
                    <td className="font-bold text-left"><span className="bg-yellow-200 px-1">2 × 4</span> × 5</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="text-right pr-2">=</td>
                    <td className="font-bold text-left">2 × <span className="bg-yellow-200 px-1">2 × 2</span> × 5</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="text-right pr-2">=</td>
                    <td className="font-bold text-left text-blue-700">2<sup className="text-xs">3</sup> × 5</td>
                    <td className="pl-4 text-green-700 text-sm">← 以次方表示</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="hcf-lcm" title="4. H.C.F. (最大公因數) 及 L.C.M. (最小公倍數)" num={4} color="blue" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <h3 className="font-bold text-blue-800 mb-4">2 個數字的 L.C.M. 和 H.C.F.</h3>
              <div className="flex font-mono text-lg mb-4">
                <div className="flex flex-col items-end pr-2 border-r-2 border-black">
                  <span className="bg-yellow-200 px-1 mb-1 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:-bottom-[3px] after:left-0">2</span>
                  <span className="bg-yellow-200 px-1 mb-1 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:-bottom-[3px] after:left-0">2</span>
                </div>
                <div className="flex flex-col pl-2">
                  <div className="flex gap-4 mb-1"><span>20</span><span>32</span></div>
                  <div className="flex gap-4 mb-1"><span>10</span><span>16</span></div>
                  <div className="flex gap-4"><span className="bg-yellow-200 px-1">5</span><span className="bg-yellow-200 px-1">8</span></div>
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li><span className="font-bold text-green-700">只看打直 → H.C.F.：</span> 2 × 2 = <span className="font-bold text-blue-700">4</span></li>
                <li><span className="font-bold text-green-700">看 L 形 → L.C.M.：</span> 2 × 2 × 5 × 8 = <span className="font-bold text-blue-700">160</span></li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">提示：L.C.M. 的數 {'>'} H.C.F. 的數</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <h3 className="font-bold text-blue-800 mb-4">3 個數字的 L.C.M. 和 H.C.F.</h3>
              <div className="flex font-mono text-lg mb-4">
                <div className="flex flex-col items-end pr-2 border-r-2 border-black">
                  <span className="relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:-bottom-[3px] after:left-0 px-1 mb-1 bg-green-200">2</span>
                  <span className="bg-yellow-200 px-1 mb-1 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:-bottom-[3px] after:left-0">3</span>
                  <span className="bg-yellow-200 px-1 mb-1 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:-bottom-[3px] after:left-0">2</span>
                </div>
                <div className="flex flex-col pl-2">
                  <div className="flex gap-4 mb-1"><span>18</span><span>20</span><span>24</span></div>
                  <div className="flex gap-4 mb-1">
                    <span className="bg-yellow-200 px-1">9</span><span>10</span><span className="bg-yellow-200 px-1">12</span>
                    <span className="text-green-700 text-sm font-sans ml-2">← 可選其中兩數的公因數繼續找 L.C.M.</span>
                  </div>
                  <div className="flex gap-4 mb-1">
                    <span>3</span><span>10</span><span>4</span>
                    <span className="text-green-700 text-sm font-sans ml-2">← 10照抄，因為除不盡3</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="bg-yellow-200 px-1">3</span><span className="bg-yellow-200 px-1">5</span><span className="bg-yellow-200 px-1">2</span>
                    <span className="text-green-700 text-sm font-sans ml-2">← 直至做到任何兩數字都除不盡</span>
                  </div>
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li><span className="font-bold text-green-700">3個數的因數 → H.C.F.：</span> = <span className="font-bold text-blue-700">2</span></li>
                <li><span className="font-bold bg-yellow-200 px-1 text-green-700">L 形 → L.C.M.：</span> 2 × 3 × 2 × 3 × 5 × 2 = <span className="font-bold text-blue-700">360</span></li>
              </ul>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="arithmetic" title="5. 四則運算" num={5} color="blue" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-4 inline-block">
            <h3 className="font-bold text-amber-800">💡 運算次序：先把括號，再乘除，後加減</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="font-sans text-lg mb-2 relative">
                <span className="mr-2">e.g.</span>
                <span>3 + </span>
                <span className="border-2 border-red-500 px-1 relative">
                  4 × 5
                  <span className="absolute -top-6 left-1/2 text-sm text-red-600 whitespace-nowrap -translate-x-1/2">← 先計乘</span>
                </span>
                <span> - 6</span>
              </div>
              <div className="pl-12 font-sans font-bold text-slate-700 space-y-1">
                <div>= 3 + <span className="text-blue-600 border-b-2 border-red-500">20</span> - 6</div>
                <div>= 17</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex gap-4 text-green-700 font-bold mb-2">
                <span>( ) 小括號</span>
                <span>[ ] 中括號</span>
                <span>{`{ }`} 大括號</span>
              </div>
              <div className="font-sans text-lg mb-2 mt-4 relative">
                <span className="mr-2">e.g.</span>
                <span>3 × </span>
                <span className="bg-yellow-200 px-1 relative">
                  [24 - (6 + 2)]
                  <span className="absolute -top-6 right-0 text-sm text-red-600 whitespace-nowrap">← 先計小括號，再計中括號</span>
                </span>
              </div>
              <div className="pl-12 font-sans font-bold text-slate-700 space-y-1 mt-6">
                <div>= 3 × (24 - <span className="text-blue-600">8</span>) <span className="text-red-500 text-sm font-normal">← 中括號轉小括號</span></div>
                <div>= 3 × 16</div>
                <div>= 48</div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

export const ApproximationNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH13 近似值</h1>
        <p className="text-slate-600">有效數字與捨入方法</p>
      </div>

      <CollapsibleSection id="sig-fig" title="有效數字 & 捨入方法" num={1} color="green" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-6 text-slate-700">
          <div className="border-b-2 border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-800">1. 有效數字：<span className="text-slate-600">不是開首的 0 就是有效數字</span></h3>
          </div>
          <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
            <div className="text-lg font-sans flex items-center gap-2">
              <span className="text-blue-600 font-bold">I.</span>
              <span className="relative">8<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">1</span></span><span>.</span>
              <span className="relative">4<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">2</span></span>
              <span className="relative">6<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">3</span></span>
            </div>
            <div className="text-lg font-sans flex items-center gap-2">
              <span className="text-blue-600 font-bold">II.</span>
              <span className="relative">0<span className="absolute -top-4 left-0 text-sm text-red-600 font-bold">×</span></span><span>.</span>
              <span className="relative">0<span className="absolute -top-4 left-0 text-sm text-red-600 font-bold">×</span></span>
              <span className="relative">5<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">1</span></span>
              <span className="relative">8<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">2</span></span>
              <span className="text-red-600 text-sm ml-4">× 不是有效數字</span>
            </div>
            <div className="text-lg font-sans flex items-center gap-2">
              <span className="text-blue-600 font-bold">III.</span>
              <span className="relative">0<span className="absolute -top-4 left-0 text-sm text-red-600 font-bold">×</span></span><span>.</span>
              <span className="relative">6<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">1</span></span>
              <span className="relative">0<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">2</span></span>
              <span className="relative">8<span className="absolute -top-4 left-0 text-sm text-green-600 font-bold">3</span></span>
              <span className="text-green-600 text-sm ml-4">1 第一位有效數字</span>
            </div>
          </div>
          <hr className="border-slate-300" />
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="font-bold">需注意：</span>
              <span className="text-blue-600 font-bold">1. 捨入方法</span>
              <span className="text-green-600 font-bold">2. 取值</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <h4 className="font-bold text-blue-800 mb-2">捨入方法：</h4>
                <div className="flex items-center gap-3"><span className="text-red-600 text-xs">(必定進位)</span><span className="text-blue-600 font-bold w-12">上捨</span><span className="font-sans">45.1 → <b>46</b></span></div>
                <div className="flex items-center gap-3"><span className="text-red-600 text-xs">(4捨5入)</span><span className="text-blue-600 font-bold w-12">捨入</span><span className="font-sans">45.1 → <b>45</b></span></div>
                <div className="flex items-center gap-3"><span className="text-red-600 text-xs">(不需進位)</span><span className="text-blue-600 font-bold w-12">下捨</span><span className="font-sans">45.9 → <b>45</b></span></div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">取值目標：</h4>
                <ul className="space-y-1 text-sm"><li>• 2位小數</li><li>• 有效數字</li><li>• 最接近整數</li><li>• 最接近十位</li><li>• 最接近百位</li></ul>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="approx-examples" title="題目範例" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <span className="text-black font-bold text-lg">題目示例</span>
            <ol className="list-[lower-alpha] list-inside mt-2 space-y-2">
              <li>把 <span className="border-2 border-red-400 rounded-full px-1">9</span><span className="border-b-2 border-blue-400">8</span>7.6543 <span className="text-blue-600 font-bold">上捨入</span>至最接近的百位。</li>
              <li>把 987.65<span className="border-2 border-red-400 rounded-full px-1">4</span><span className="border-b-2 border-blue-400">3</span> <span className="text-blue-600 font-bold">捨入</span>至三位小數。</li>
              <li>把 9<span className="border-2 border-red-400 rounded-full px-1">8</span><span className="border-b-2 border-blue-400">7</span>.6543 <span className="text-blue-600 font-bold">下捨入</span>至二位有效數字。</li>
            </ol>
          </div>
          <div className="space-y-3">
            <h3 className="text-red-600 font-bold">圈下位值及下一個數字</h3>
            <div className="space-y-2 bg-slate-50 p-4 rounded-lg">
              <div className="flex items-start gap-4"><span className="text-blue-600 font-bold">a. 1000</span><span className="text-purple-600 text-sm">(位值為9, <span className="text-red-600">上捨 → 必定進位</span>, 9 → 10)</span></div>
              <div className="flex items-start gap-4"><span className="text-blue-600 font-bold">b. 987.654</span><span className="text-purple-600 text-sm">(位值為4, 後面的數是3, <span className="text-red-600">四捨 → 不用進位</span>)</span></div>
              <div className="flex items-start gap-4"><span className="text-blue-600 font-bold">c. 980</span><span className="text-purple-600 text-sm">(位值為8, <span className="text-red-600">下捨 → 不需進位</span>, 8後的整數部份要補上0，小數點後忽略)</span></div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

export const DirectedNumbersNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null);

  return (
    <>
      <CollapsibleSection id="positive-negative" title="有向數即正負數" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-700 mb-2">+ / 正數 / 加數字眼</h3>
              <p className="text-green-700">上升, 增加, 賺, 盈利, 存入 ...</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-bold text-red-700 mb-2">- / 負數 / 減數字眼</h3>
              <p className="text-red-700">下降, 扣減, 蝕, 虧蝕, 提取 ...</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-red-600 mb-3">相反數：</h3>
            <ul className="space-y-2 text-slate-700 font-sans">
              <li><span className="font-bold text-blue-700">+6</span> 的相反數是 <span className="font-bold text-blue-700">-6</span></li>
              <li><span className="font-bold text-blue-700">-20</span> 的相反數是 <span className="font-bold text-blue-700">+20</span></li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="number-line" title="數線與大小" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="flex gap-6 items-center">
            <h3 className="font-bold text-lg">數字排大小：</h3>
            <div className="space-y-2 font-bold">
              <div className="text-green-700">遞增次序：小至大 ↗️</div>
              <div className="text-red-600">遞减次序：大至小 ↘️</div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
            <div>
              <p className="text-slate-600 mb-1">e.g. 16. 把 -5，+7，0 和 -11 按遞减次序排列。</p>
              <div className="flex items-center justify-between gap-4 ml-6">
                <p className="font-bold text-blue-700 text-lg">+7, 0, -5, -11</p>
                <span className="font-bold text-green-700 whitespace-nowrap">11 &gt; 5</span>
              </div>
            </div>
            <div>
              <p className="text-slate-600 mb-1">17. 把 -6.3，+7.4，-6.9 和 +6.2 按遞增次序排列。</p>
              <div className="flex items-center justify-between gap-4 ml-6">
                <p className="font-bold text-blue-700 text-lg">-6.9, -6.3, +6.2, +7.4</p>
                <span className="font-bold text-green-700 whitespace-nowrap">但 -11 &lt; -5</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-end">
              <span className="bg-yellow-200 px-2 py-1 rounded font-bold text-green-700">正負數的大小次序相反</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h3 className="font-bold mb-3">數線題：標記 / 辨認</h3>
            
            <div className="space-y-6">
              <div>
                <p className="font-bold text-blue-800 mb-2">每格是 1</p>
                <div className="w-full overflow-x-auto">
                  <svg viewBox="0 0 500 60" className="w-full max-w-lg min-w-[300px]">
                    <line x1="20" y1="30" x2="480" y2="30" stroke="#333" strokeWidth="2" />
                    <polyline points="475,25 485,30 475,35" fill="none" stroke="#333" strokeWidth="2" />
                    <polyline points="25,25 15,30 25,35" fill="none" stroke="#333" strokeWidth="2" />
                    
                    {[...Array(11)].map((_, i) => {
                      const x = 50 + i * 40;
                      const val = i - 5;
                      const showLabel = val === -5 || val === -3 || val === 0 || val === 1 || val === 3 || val === 5;
                      const isMark = val === 5 || val === -5 || val === 3 || val === -3;
                      
                      return (
                        <g key={i}>
                          <line x1={x} y1="25" x2={x} y2="35" stroke="#333" strokeWidth="2" />
                          {showLabel && (
                            <text x={x} y="50" textAnchor="middle" fontSize="12" fill="#666">
                              {val > 0 ? `+${val}` : val}
                            </text>
                          )}
                          {isMark && (
                            <g stroke="red" strokeWidth="2" strokeLinecap="round">
                              <line x1={x - 5} y1="25" x2={x + 5} y2="35" />
                              <line x1={x - 5} y1="35" x2={x + 5} y2="25" />
                              <text x={x} y="15" textAnchor="middle" fontSize="14" fill="red">{val > 0 ? `+${val}` : val}</text>
                            </g>
                          )}
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>

              <div>
                <p className="font-bold text-blue-800 mb-2">每格是 0.5</p>
                <div className="w-full overflow-x-auto">
                  <svg viewBox="0 0 500 60" className="w-full max-w-lg min-w-[300px]">
                    <line x1="20" y1="30" x2="480" y2="30" stroke="#333" strokeWidth="2" />
                    <polyline points="475,25 485,30 475,35" fill="none" stroke="#333" strokeWidth="2" />
                    <polyline points="25,25 15,30 25,35" fill="none" stroke="#333" strokeWidth="2" />
                    
                    {[...Array(13)].map((_, i) => {
                      const x = 40 + i * 35;
                      const val = (i - 6) * 0.5;
                      const isMark = val === -1 || val === 2.5 || val === -3 || val === -2.5 || val === -1.5;
                      const showLabel = val === -3 || val === -2.5 || val === -1.5 || val === -1 || val === 0 || val === 0.5 || val === 1 || val === 2.5;
                      
                      return (
                        <g key={i}>
                          <line x1={x} y1="25" x2={x} y2="35" stroke="#333" strokeWidth="2" />
                          {showLabel && (
                            <text x={x} y="50" textAnchor="middle" fontSize="12" fill="#666">
                              {val > 0 ? `+${val}` : val}
                            </text>
                          )}
                          {isMark && (
                            <g stroke="red" strokeWidth="2" strokeLinecap="round">
                              <line x1={x - 5} y1="25" x2={x + 5} y2="35" />
                              <line x1={x - 5} y1="35" x2={x + 5} y2="25" />
                              <text x={x} y="15" textAnchor="middle" fontSize="14" fill="red">{val > 0 ? `+${val}` : val}</text>
                            </g>
                          )}
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="operations" title="有向數的乘除變化" num={3} color="red" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex flex-col md:flex-row gap-6">
            <div className="space-y-2 text-lg">
              <div className="flex items-center gap-4">
                <span className="font-bold text-green-700 w-24 tracking-widest">+ + ➔ +</span>
                <span className="font-bold text-green-700 w-24">正正得正</span>
                <span className="text-red-600 text-sm">小學時已學！</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-green-700 w-24 tracking-widest">- - ➔ +</span>
                <span className="font-bold text-green-700 w-24">負負得正</span>
                <MathDisplay latex={String.raw`(-2) \times (-3) = +6`} inline className="text-blue-700 text-base" />
                <MathDisplay latex="(-x)(-x) = +x^2" inline className="text-red-700 text-base ml-2" />
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-green-700 w-24 tracking-widest">+ - ➔ -</span>
                <span className="font-bold text-green-700 w-24">正負得負</span>
                <MathDisplay latex={String.raw`(+2) \times (-3) = -6`} inline className="text-blue-700 text-base" />
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-green-700 w-24 tracking-widest">- + ➔ -</span>
                <span className="font-bold text-green-700 w-24">負正得負</span>
                <MathDisplay latex={String.raw`(-2) \times (+3) = -6`} inline className="text-blue-700 text-base" />
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200 space-y-4">
            <h3 className="font-bold text-red-700 text-lg flex items-center gap-2">
              需注意：<span className="text-sm">2個 +/- 痴在一起，需化簡</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-1 font-sans text-lg text-blue-800">
                <div className="flex items-start"><span className="w-12 text-slate-500 text-sm mt-1 flex-shrink-0">e.g.</span><div className="flex-1"><Latex math="(+24)-(-42)" block left /></div></div>
                <div className="flex items-start"><span className="w-12 flex-shrink-0"></span><div className="flex-1"><Latex math="= +24 + 42" block left /></div></div>
                <div className="flex items-start"><span className="w-12 flex-shrink-0"></span><div className="flex-1"><Latex math="= +66" block left /></div></div>
              </div>
              <div className="space-y-1 font-sans text-lg text-blue-800 relative">
                <div className="flex items-start"><span className="w-12 text-slate-500 text-sm mt-1 flex-shrink-0">e.g.</span><div className="flex-1"><Latex math="(-3)(-4)-5" block left /></div><div className="absolute right-4 top-2 text-sm text-green-600 font-bold">中間是 ×</div></div>
                <div className="flex items-start"><span className="w-12 flex-shrink-0"></span><div className="flex-1"><Latex math={`= +(3 \\times 4)-5`} block left /></div></div>
                <div className="flex items-start"><span className="w-12 flex-shrink-0"></span><div className="flex-1"><Latex math="= +12-5" block left /></div></div>
                <div className="flex items-start"><span className="w-12 flex-shrink-0"></span><div className="flex-1"><Latex math="= +7" block left /></div></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex flex-col gap-4 font-sans text-lg text-blue-800">
              <div className="flex items-center gap-4">
                <span className="w-8 text-slate-500 text-sm flex-shrink-0">e.g.</span>
                <div className="flex-1 max-w-xs">
                  <Latex math={`\\dfrac{-6+(-12)}{-3+5}`} block left />
                </div>
                <span className="text-green-600 text-sm font-bold ml-2">← 分數上下分開計</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="w-8 flex justify-end flex-shrink-0">=</span>
                <div className="flex-1 max-w-xs ml-2">
                  <Latex math={`\\dfrac{-18}{+2}`} block left />
                </div>
                <span className="text-green-600 text-sm font-bold ml-2">← 上下剩一個數，可計除數</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-8 flex justify-end flex-shrink-0">=</span>
                <div className="flex-1 max-w-xs ml-2">
                  <Latex math="-9" block left />
                </div>
              </div>
            </div>
          </div>

        </div>
      </CollapsibleSection>
    </>
  );
};

export const PolynomialsNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  return (
    <>
      {/* 1. 分辨單項式與多項式 */}
      <CollapsibleSection id="definition" title="分辨單項式與多項式" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3">📝 單項式 (Monomial)</h3>
              <p className="text-slate-700 mb-2">特徵：<strong>只有一項</strong></p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• 包含一個數字（例：<Latex math="2" />, <Latex math="\frac{5}{2}" />, <Latex math="-3.4" />）</li>
                <li>• 包含一個代數（例：<Latex math="x" />, <Latex math="y^2" />, <Latex math="a^3" />）</li>
                <li>• 只有乘，沒加減的項（例：<Latex math="2y" />, <Latex math="4x^2" />, <Latex math="-5m^3n^4" />）</li>
                <li>• 分母<strong>沒有代數</strong>的分數（例：<Latex math="\frac{x}{2}" />, <Latex math="-\frac{3y}{2}" />）</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-green-700 mb-3">📝 多項式 (Polynomial)</h3>
              <p className="text-slate-700 mb-2">特徵：<strong>多於一項</strong>，或包含以下情況</p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• 分母<strong>有代數</strong>的分數（例：<Latex math="\frac{2}{x}" />, <Latex math="\frac{2x}{y}" />）</li>
                <li>• 有 <Latex math="+" /> 或 <Latex math="-" /> 連接的式子（例：<Latex math="3x+4y" />）</li>
              </ul>
              <div className="mt-3 bg-white p-2 text-center rounded border border-green-100">
                <p className="text-sm font-bold text-green-800">一條式只要有 <Latex math="+" /> 或 <Latex math="-" /> 連接，便是多項式</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 項數、係數與常數項 */}
      <CollapsibleSection id="terms-coeff" title="項數、係數與常數項" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">📌 項數 (Number of terms)</h3>
            <p className="text-slate-700 mb-2">方法：按住 <Latex math="+" /> / <Latex math="-" /> 的前面分開，再數項數</p>
            <div className="bg-white p-3 rounded border border-slate-200 flex items-center gap-4">
              <span className="text-slate-600">例子：</span>
              <span className="bg-yellow-200 px-2 py-1 rounded">5</span>
              <span className="text-xl">/</span>
              <span className="bg-yellow-200 px-2 py-1 rounded">+ 2x^3</span>
              <span className="font-bold ml-2">👉 項數：2</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">📌 係數 (Coefficient)</h3>
            <p className="text-slate-700 mb-2">定義：某代數旁邊的數字</p>
            <div className="bg-white p-3 rounded border border-slate-200">
              <MathDisplay math="1x^2 - 4x^3 + 8" />
              <div className="flex flex-col gap-1 mt-2 mb-4">
                <p>• <Latex math="x^2" /> 的係數 = <Latex math="1" /></p>
                <p>• <Latex math="x^3" /> 的係數 = <Latex math="-4" /></p>
              </div>
              <p className="text-sm text-slate-500 border-t pt-2">多項式：<Latex math="0x^2 + 2x + 3" /> （項數為 3）</p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">📌 常數項 (Constant Term)</h3>
            <p className="text-slate-700 mb-2">定義：沒有代數的項的數字</p>
            <div className="bg-white p-3 rounded border border-slate-200">
              <Latex math="-5x^2y^3 + 2x^3y - 6 + x" block />
              <p className="text-center font-bold mt-2 text-purple-700">常數項是 <Latex math="-6" /></p>
            </div>
          </div>

        </div>
      </CollapsibleSection>

      {/* 3. 次數與排列 */}
      <CollapsibleSection id="degree-order" title="次數與排列" num={3} color="green" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">📌 次數 (Degree)</h3>
            <p className="text-slate-700 mb-2">定義：最大的次方（一個項內的代數次方相加）</p>
            <div className="bg-white p-3 rounded border border-slate-200">
              <Latex math="x^2y^1 + 5x + 1" block />
              <p className="text-center mt-2">次數：<Latex math="2 + 1 = 3" /></p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">📌 排列多項式 (升冪 / 降冪)</h3>
            <p className="text-slate-700 mb-2">方法：按次方的大小重新排多項式（冪 = 次方）</p>
            <div className="bg-white p-4 rounded border border-slate-200 space-y-3">
              <Latex math="5x - 3x^3 + 2x^2" block />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-2 rounded">
                  <p className="font-bold text-slate-700 mb-1">降冪 <span className="text-sm font-normal">（次方大到小 ↓）</span></p>
                  <Latex math="-3x^3 + 2x^2 + 5x" block />
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <p className="font-bold text-slate-700 mb-1">升冪 <span className="text-sm font-normal">（次方小到大 ↑）</span></p>
                  <Latex math="5x + 2x^2 - 3x^3" block />
                </div>
              </div>
            </div>
          </div>

        </div>
      </CollapsibleSection>

      {/* 4. 多項式的加減 */}
      <CollapsibleSection id="addition-subtraction" title="多項式的加減" num={4} color="orange" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 提示</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 同類項才能相加減</li>
              <li>• 拆括號時，若括號前是負號，括號內的項<span className="font-bold text-red-600">「正負調轉」</span></li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">例子 1：</p>
              <pre className="whitespace-pre font-sans text-lg">
                <Latex math="3x + 4x + 2x" /> <span className="text-sm text-slate-400">(3+4+2=9)</span>{'\n'}
=               <Latex math="9x" />
              </pre>
            </div>
            <hr />
            <div>
              <p className="text-sm text-slate-600 mb-1">例子 2：</p>
              <pre className="whitespace-pre font-sans text-lg">
                <Latex math="3y - 5y + 6y" /> <span className="text-sm text-slate-400">(3-5+6=4)</span>{'\n'}
=               <Latex math="4y" />
              </pre>
            </div>
            <hr />
            <div>
              <p className="text-sm text-slate-600 mb-1">例子 3 (分類)：</p>
              <pre className="whitespace-pre font-sans text-lg">
                <Latex math="2x - 3y - 7x - y" />{'\n'}
=               <Latex math="2x - 7x - 3y - y" /> <span className="text-sm text-slate-400">(-3-1)</span>{'\n'}
=               <Latex math="-5x - 4y" />
              </pre>
            </div>
            <hr />
            <div>
              <p className="text-sm text-slate-600 mb-1">例子 4 (拆括號)：</p>
              <pre className="whitespace-pre font-sans text-lg">
                <Latex math="5x + 3y - (4x - 3y)" />{'\n'}
=               <Latex math="5x + 3y - 4x + 3y" /> <span className="text-sm text-red-500 font-bold">← 正負調轉 (-4x +3y)</span>{'\n'}
=               <Latex math="5x - 4x + 3y + 3y" />{'\n'}
=               <Latex math="x + 6y" />
              </pre>
            </div>
          </div>

        </div>
      </CollapsibleSection>

      {/* 5. 多項式的乘法 */}
      <CollapsibleSection id="multiplication" title="多項式的乘法" num={5} color="red" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-2">📌 單項式 × 單項式</h3>
            <p className="text-slate-700 mb-2 text-sm">口訣：數字乘數字，英文乘英文</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border border-slate-200 text-center">
                <Latex math="(5x)(8x^2)" block />
                <Latex math="= 40x^3" block />
              </div>
              <div className="bg-white p-3 rounded border border-slate-200 text-center">
                <Latex math="(2x)(3x)" block />
                <Latex math="= 6x^2" block />
              </div>
              <div className="bg-white p-3 rounded border border-slate-200 text-center">
                <Latex math="(-\frac{3}{y})(5y)" block />
                <Latex math="= -15y^2" block />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">📌 單項式 × 多項式</h3>
            <p className="text-slate-700 mb-2 text-sm">方法：只會乘其他括號的項，順序相乘</p>
            <div className="bg-white p-4 rounded border border-slate-200 space-y-4">
              <div>
                <pre className="whitespace-pre font-sans text-lg">
                  <Latex math="5x(2x + 3)" />{'\n'}
=                 <Latex math="5x(2x) + 5x(3)" />{'\n'}
=                 <Latex math="10x^2 + 15x" /> <span className="text-sm text-slate-500">(同類項才能加)</span>
                </pre>
              </div>
              <hr />
              <div>
                <pre className="whitespace-pre font-sans text-lg">
                  <Latex math="(x + 5)(6x^2)" />{'\n'}
=                 <Latex math="x(6x^2) + 5(6x^2)" />{'\n'}
=                 <Latex math="6x^3 + 30x^2" />
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">📌 多項式 × 多項式 (拆括號)</h3>
            <p className="text-slate-700 mb-2 text-sm">認住位置乘：<Latex math="(①+②)(③+④) = ①×③ + ①×④ + ②×③ + ②×④" /></p>
            <div className="bg-white p-4 rounded border border-slate-200">
              <pre className="whitespace-pre font-sans text-lg">
                <Latex math="(4 - 5x)(5 + 6x)" />{'\n'}
=               <Latex math="4(5) + 4(6x) - 5x(5) - 5x(6x)" /> <span className="text-sm text-slate-500">(按順序乘)</span>{'\n'}
=               <Latex math="20 + 24x - 25x - 30x^2" /> <span className="text-sm text-red-500 font-bold">← 找同類項簡化</span>{'\n'}
=               <Latex math="20 - x - 30x^2" />{'\n'}
=               <Latex math="-30x^2 - x + 20" />
              </pre>
            </div>
          </div>

        </div>
      </CollapsibleSection>
    </>
  );
};

export const AreaVolumeNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  return (
    <>
      {/* 1. 簡單圖形的面積 */}
      <CollapsibleSection id="basic-area" title="簡單圖形的面積" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 提示</h3>
            <p className="text-slate-700">需熟習各形狀的面積公式 才能計算相應體積</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 text-sm text-slate-500">
            {/* 圖形 1: 正方形 */}
            <div className="flex border-b border-slate-100 pb-4 mb-4">
              <div className="w-1/2 flex flex-col items-center justify-center border-r border-slate-100">
                <svg viewBox="0 0 160 160" className="w-32 h-32">
                  <rect x="30" y="30" width="100" height="100" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" />
                  <polyline points="30,42 42,42 42,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="130,42 118,42 118,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="30,118 42,118 42,130" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="130,118 118,118 118,130" fill="none" stroke="#334155" strokeWidth="1.5" />
                  {/* Tick marks */}
                  <line x1="75" y1="26" x2="85" y2="34" stroke="#e63946" strokeWidth="2" />
                  <line x1="75" y1="126" x2="85" y2="134" stroke="#e63946" strokeWidth="2" />
                  <line x1="26" y1="75" x2="34" y2="85" stroke="#e63946" strokeWidth="2" />
                  <line x1="126" y1="75" x2="134" y2="85" stroke="#e63946" strokeWidth="2" />
                  
                  <text x="80" y="145" fontSize="13" fill="#475569" textAnchor="middle">邊長</text>
                  <text x="15" y="80" fontSize="13" fill="#475569" textAnchor="middle" writingMode="vertical-rl">邊長</text>
                </svg>
                <div className="mt-2 text-center text-red-600 font-bold">正方形的面積 = 邊長 × 邊長</div>
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center">
                <span className="text-sm text-slate-500 mb-2">例如：</span>
                <svg viewBox="0 0 160 160" className="w-32 h-32">
                  <rect x="30" y="30" width="100" height="100" fill="rgba(59,130,246,0.15)" stroke="#334155" strokeWidth="2" />
                  <polyline points="30,42 42,42 42,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <text x="80" y="145" fontSize="13" fill="#475569" textAnchor="middle">5 cm</text>
                  <text x="135" y="85" fontSize="13" fill="#475569" textAnchor="start">5 cm</text>
                </svg>
                <div className="mt-2 text-center">
                  正方形的面積 = 5 × 5 (cm²)<br/>
                  = <span className="underline">25 cm²</span>
                </div>
              </div>
            </div>

            {/* 圖形 2: 長方形 */}
            <div className="flex border-b border-slate-100 pb-4 mb-4">
              <div className="w-1/2 flex flex-col items-center justify-center border-r border-slate-100">
                <svg viewBox="0 0 200 120" className="w-40 h-24">
                  <rect x="20" y="30" width="160" height="60" fill="rgba(245,158,11,0.2)" stroke="#334155" strokeWidth="2" />
                  <polyline points="20,42 32,42 32,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="180,42 168,42 168,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="20,78 32,78 32,90" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="180,78 168,78 168,90" fill="none" stroke="#334155" strokeWidth="1.5" />
                  
                  <line x1="100" y1="26" x2="100" y2="34" stroke="#e63946" strokeWidth="2" />
                  <line x1="100" y1="86" x2="100" y2="94" stroke="#e63946" strokeWidth="2" />
                  <line x1="16" y1="57" x2="24" y2="57" stroke="#e63946" strokeWidth="2" />
                  <line x1="16" y1="63" x2="24" y2="63" stroke="#e63946" strokeWidth="2" />
                  <line x1="176" y1="57" x2="184" y2="57" stroke="#e63946" strokeWidth="2" />
                  <line x1="176" y1="63" x2="184" y2="63" stroke="#e63946" strokeWidth="2" />

                  <text x="100" y="105" fontSize="13" fill="#475569" textAnchor="middle">長</text>
                  <text x="185" y="65" fontSize="13" fill="#475569" textAnchor="start">闊</text>
                </svg>
                <div className="mt-2 text-center text-purple-700 font-bold">長方形的面積 = 長 × 闊</div>
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center">
                <span className="text-sm text-slate-500 mb-2">例如：</span>
                <svg viewBox="0 0 200 120" className="w-40 h-24">
                  <rect x="50" y="20" width="60" height="90" fill="rgba(245,158,11,0.2)" stroke="#334155" strokeWidth="2" />
                  <polyline points="50,32 62,32 62,20" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="110,32 98,32 98,20" fill="none" stroke="#334155" strokeWidth="1.5" />
                  
                  <text x="80" y="125" fontSize="13" fill="#475569" textAnchor="middle">6 cm</text>
                  <text x="45" y="70" fontSize="13" fill="#475569" textAnchor="end">9 cm</text>
                </svg>
                <div className="mt-2 text-center">
                  長方形的面積 = 9 × 6 (cm²)<br/>
                  = <span className="underline">54 cm²</span>
                </div>
              </div>
            </div>

            {/* 圖形 3: 平行四邊形 */}
            <div className="flex border-b border-slate-100 pb-4 mb-4">
              <div className="w-1/2 flex flex-col items-center justify-center border-r border-slate-100">
                <svg viewBox="0 0 240 120" className="w-48 h-24">
                  <polygon points="60,20 200,20 160,80 20,80" fill="rgba(236,72,153,0.15)" stroke="#334155" strokeWidth="2" />
                  
                  <line x1="60" y1="20" x2="60" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  <polyline points="60,68 72,68 72,80" fill="none" stroke="#334155" strokeWidth="1.5" />
                  
                  {/* Arrow marks for parallel sides */}
                  <polyline points="125,16 130,20 125,24" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                  <polyline points="132,16 137,20 132,24" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                  
                  <polyline points="85,76 90,80 85,84" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                  <polyline points="92,76 97,80 92,84" fill="none" stroke="#0ea5e9" strokeWidth="2" />

                  {/* Dimension lines */}
                  <line x1="20" y1="95" x2="160" y2="95" stroke="#475569" strokeWidth="1" />
                  <line x1="20" y1="90" x2="20" y2="100" stroke="#475569" strokeWidth="1" />
                  <line x1="160" y1="90" x2="160" y2="100" stroke="#475569" strokeWidth="1" />

                  <text x="90" y="110" fontSize="13" fill="#475569" textAnchor="middle">底</text>
                  <text x="70" y="55" fontSize="13" fill="#db2777" textAnchor="start">高</text>
                </svg>
                <div className="mt-2 text-center text-pink-700 font-bold">平行四邊形的面積 = 底 × 高</div>
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center">
                <span className="text-sm text-slate-500 mb-2">例如：</span>
                <svg viewBox="0 0 240 120" className="w-48 h-24">
                  <polygon points="90,30 200,30 150,80 40,80" fill="rgba(236,72,153,0.15)" stroke="#334155" strokeWidth="2" />
                  
                  {/* Extension line for height */}
                  <line x1="200" y1="30" x2="200" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="150" y1="80" x2="210" y2="80" stroke="#334155" strokeWidth="1" />
                  <polyline points="188,80 188,68 200,68" fill="none" stroke="#334155" strokeWidth="1.5" />

                  {/* Dimension lines */}
                  <line x1="40" y1="95" x2="150" y2="95" stroke="#475569" strokeWidth="1" />
                  <line x1="40" y1="90" x2="40" y2="100" stroke="#475569" strokeWidth="1" />
                  <line x1="150" y1="90" x2="150" y2="100" stroke="#475569" strokeWidth="1" />

                  <text x="95" y="110" fontSize="13" fill="#475569" textAnchor="middle">30 cm</text>
                  <text x="195" y="55" fontSize="13" fill="#db2777" textAnchor="end">8 cm</text>
                </svg>
                <div className="mt-2 text-center">
                  平行四邊形的面積 = 30 × 8 (cm²)<br/>
                  = <span className="underline">240 cm²</span>
                </div>
              </div>
            </div>

            {/* 圖形 4: 三角形 */}
            <div className="flex border-b border-slate-100 pb-4 mb-4">
              <div className="w-1/2 flex flex-col items-center justify-center border-r border-slate-100">
                <svg viewBox="0 0 200 120" className="w-40 h-24">
                  <polygon points="100,20 160,80 40,80" fill="rgba(250,204,21,0.2)" stroke="#334155" strokeWidth="2" />
                  
                  <line x1="100" y1="20" x2="100" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  <polyline points="100,68 112,68 112,80" fill="none" stroke="#334155" strokeWidth="1.5" />
                  
                  {/* Dimension lines */}
                  <line x1="40" y1="95" x2="160" y2="95" stroke="#475569" strokeWidth="1" />
                  <line x1="40" y1="90" x2="40" y2="100" stroke="#475569" strokeWidth="1" />
                  <line x1="160" y1="90" x2="160" y2="100" stroke="#475569" strokeWidth="1" />

                  <text x="100" y="110" fontSize="13" fill="#475569" textAnchor="middle">底</text>
                  <text x="105" y="55" fontSize="13" fill="#ca8a04" textAnchor="start">高</text>
                </svg>
                <div className="mt-2 text-center text-yellow-700 font-bold">三角形的面積 = <Latex math="\frac{1}{2}" /> × 底 × 高</div>
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center">
                <span className="text-sm text-slate-500 mb-2">例如：</span>
                <svg viewBox="0 0 200 120" className="w-40 h-24">
                  <polygon points="50,20 150,80 50,80" fill="rgba(250,204,21,0.2)" stroke="#334155" strokeWidth="2" />
                  <polyline points="50,68 62,68 62,80" fill="none" stroke="#334155" strokeWidth="1.5" />
                  
                  <text x="100" y="95" fontSize="13" fill="#475569" textAnchor="middle">12 m</text>
                  <text x="45" y="55" fontSize="13" fill="#475569" textAnchor="end">7 m</text>
                </svg>
                <div className="mt-2 text-center">
                  三角形的面積 = <Latex math="\frac{1}{2}" /> × 12 × 7 (m²)<br/>
                  = <span className="underline">42 m²</span>
                </div>
              </div>
            </div>

            {/* 圖形 5: 梯形 */}
            <div className="flex pb-2">
              <div className="w-1/2 flex flex-col items-center justify-center border-r border-slate-100">
                <svg viewBox="0 0 200 120" className="w-40 h-24">
                  <polygon points="70,20 130,20 160,80 40,80" fill="rgba(56,189,248,0.2)" stroke="#334155" strokeWidth="2" />
                  
                  <line x1="70" y1="20" x2="70" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  <polyline points="70,68 82,68 82,80" fill="none" stroke="#334155" strokeWidth="1.5" />
                  
                  {/* Dimension lines */}
                  <line x1="40" y1="95" x2="160" y2="95" stroke="#475569" strokeWidth="1" />
                  <line x1="40" y1="90" x2="40" y2="100" stroke="#475569" strokeWidth="1" />
                  <line x1="160" y1="90" x2="160" y2="100" stroke="#475569" strokeWidth="1" />
                  
                  <line x1="70" y1="10" x2="130" y2="10" stroke="#475569" strokeWidth="1" />

                  <text x="100" y="110" fontSize="13" fill="#475569" textAnchor="middle">下底</text>
                  <text x="100" y="15" fontSize="13" fill="#475569" textAnchor="middle">上底</text>
                  <text x="75" y="55" fontSize="13" fill="#0284c7" textAnchor="start">高</text>
                </svg>
                <div className="mt-2 text-center text-sky-700 font-bold">梯形的面積 = <Latex math="\frac{1}{2}" /> × (上底 + 下底) × 高</div>
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center">
                <span className="text-sm text-slate-500 mb-2">例如：</span>
                <svg viewBox="0 0 200 120" className="w-40 h-24">
                  <polygon points="70,30 150,30 160,80 40,80" fill="rgba(56,189,248,0.2)" stroke="#334155" strokeWidth="2" />
                  
                  <line x1="70" y1="30" x2="70" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  <polyline points="70,68 82,68 82,80" fill="none" stroke="#334155" strokeWidth="1.5" />

                  <text x="100" y="95" fontSize="13" fill="#475569" textAnchor="middle">8 mm</text>
                  <text x="110" y="22" fontSize="13" fill="#475569" textAnchor="middle">5 mm</text>
                  <text x="75" y="60" fontSize="13" fill="#0284c7" textAnchor="start">4 mm</text>
                </svg>
                <div className="mt-2 text-center whitespace-nowrap">
                  梯形面積 = <Latex math="\frac{1}{2}" />(5 + 8) × 4 (mm²)<br/>
                  = <span className="underline">26 mm²</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </CollapsibleSection>

      {/* 2. 計算多邊形面積 */}
      <CollapsibleSection id="polygon-area" title="計算多邊形面積" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-green-800 mb-3">1. 分割法</h3>
              <ul className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
                <li>把一個多邊形分割成兩個或以上較小的簡單圖形。</li>
                <li>把較小的簡單圖形的面積相加。</li>
              </ul>
              {/* 分割法示意圖 */}
              <div className="mt-3 bg-white border border-slate-200 rounded p-4 flex flex-col items-center justify-center">
                <svg viewBox="0 0 400 150" className="w-full max-w-sm h-auto">
                  {/* Original Polygon */}
                  <polygon points="40,20 100,20 100,70 140,70 140,120 40,120" fill="rgba(167,243,208,0.5)" stroke="#334155" strokeWidth="2" />
                  
                  <text x="170" y="75" fontSize="24" fill="#334155" textAnchor="middle">=</text>

                  {/* Split 1 */}
                  <polygon points="200,20 260,20 260,120 200,120" fill="rgba(167,243,208,0.5)" stroke="#334155" strokeWidth="2" />
                  
                  <text x="285" y="75" fontSize="24" fill="#334155" textAnchor="middle">+</text>

                  {/* Split 2 */}
                  <polygon points="310,70 350,70 350,120 310,120" fill="rgba(167,243,208,0.5)" stroke="#334155" strokeWidth="2" />

                  {/* Dashed line on original */}
                  <line x1="100" y1="70" x2="100" y2="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  
                  {/* Texts below */}
                  <text x="90" y="140" fontSize="12" fill="#475569" textAnchor="middle">的多邊形面積</text>
                  <text x="230" y="140" fontSize="12" fill="#475569" textAnchor="middle">的面積</text>
                  <text x="330" y="140" fontSize="12" fill="#475569" textAnchor="middle">的面積</text>
                </svg>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-green-800 mb-3">2. 填補法</h3>
              <ul className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
                <li>在多邊形上加添一個或以上的簡單圖形以組成一個較大的簡單圖形。</li>
                <li>從較大的簡單圖形的面積減去加添的簡單圖形的面積。</li>
              </ul>
              {/* 填補法示意圖 */}
              <div className="mt-3 bg-white border border-slate-200 rounded p-4 flex flex-col items-center justify-center">
                <svg viewBox="0 0 400 150" className="w-full max-w-sm h-auto">
                  {/* Original Polygon */}
                  <polygon points="40,20 100,20 100,70 140,70 140,120 40,120" fill="rgba(167,243,208,0.5)" stroke="#334155" strokeWidth="2" />
                  
                  <text x="170" y="75" fontSize="24" fill="#334155" textAnchor="middle">=</text>

                  {/* Filled Polygon */}
                  <rect x="200" y="20" width="100" height="100" fill="rgba(167,243,208,0.5)" stroke="#334155" strokeWidth="2" />
                  <rect x="260" y="20" width="40" height="50" fill="rgba(251,146,60,0.5)" stroke="none" />
                  <polyline points="260,20 300,20 300,70 260,70" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  
                  <text x="325" y="75" fontSize="24" fill="#334155" textAnchor="middle">-</text>

                  {/* Filler Shape */}
                  <rect x="350" y="20" width="40" height="50" fill="rgba(251,146,60,0.5)" stroke="#334155" strokeWidth="2" />

                  {/* Dashed line on original */}
                  <polyline points="100,20 140,20 140,70" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Texts below */}
                  <text x="90" y="140" fontSize="12" fill="#475569" textAnchor="middle">的多邊形面積</text>
                  <text x="250" y="140" fontSize="12" fill="#475569" textAnchor="middle">的面積</text>
                  <text x="370" y="140" fontSize="12" fill="#475569" textAnchor="middle">的面積</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 柱體公式 */}
      <CollapsibleSection id="prism-formulas" title="柱體體積及表面面積" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3">
              {/* 三角柱體標記圖 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-center h-full">
                <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto">
                  {/* Top Triangle */}
                  <polygon points="60,40 140,80 40,90" fill="rgba(167,243,208,0.5)" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  
                  {/* Bottom Triangle (hidden back lines) */}
                  <polyline points="40,170 140,160 60,120" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" strokeLinejoin="round" />
                  <line x1="40" y1="170" x2="60" y2="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Vertical Edges */}
                  <line x1="40" y1="90" x2="40" y2="170" stroke="#334155" strokeWidth="2" />
                  <line x1="140" y1="80" x2="140" y2="160" stroke="#334155" strokeWidth="2" />
                  <line x1="60" y1="40" x2="60" y2="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  
                  {/* Right Angle symbol in Top Triangle (Assuming 40,90 is the right angle based on 12, 16, 20) */}
                  {/* Let's say sides are: 40,90 to 60,40 = 20, 60,40 to 140,80 = 16, 40,90 to 140,80 = 12 this doesn't form a correct right angle.
                      Let's just draw a symbol at 40,90 */}
                  <polyline points="50,85 55,95 45,100" stroke="#e63946" strokeWidth="1.5" fill="none" transform="rotate(-20 40 90)" />

                  {/* Labels */}
                  <text x="35" y="60" fontSize="12" fill="#475569" textAnchor="end">20 cm</text>
                  <text x="50" y="80" fontSize="12" fill="#475569" textAnchor="start">16 cm</text>
                  <text x="95" y="95" fontSize="12" fill="#475569" textAnchor="middle">12 cm</text>
                  
                  {/* Height */}
                  <text x="25" y="135" fontSize="12" fill="#475569" textAnchor="end">24 cm</text>

                  {/* Highlight Labels */}
                  <text x="95" y="65" fontSize="14" fill="#047857" fontWeight="bold" textAnchor="middle">底</text>
                  <text x="90" y="135" fontSize="14" fill="#6b21a8" fontWeight="bold" textAnchor="middle">側</text>

                  <path d="M 80,70 Q 75,75 65,70" fill="none" stroke="#047857" strokeWidth="1.5" markerStart="url(#arrow)" />
                  <path d="M 75,135 Q 65,135 50,135" fill="none" stroke="#6b21a8" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <polygon points="0,0 10,5 0,10" fill="#475569" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
            
            <div className="md:w-2/3 space-y-4 text-lg">
              
              <div className="bg-white rounded-lg p-4 border border-slate-200 relative">
                <span className="absolute top-2 right-2 text-red-600 font-bold text-sm">留意單位</span>
                <p className="mb-2">
                  1. 求柱體<span className="bg-yellow-200 px-1 rounded">體積</span> = <span className="bg-green-200 px-1 rounded">底面積</span> × <span className="bg-blue-200 px-1 rounded">高</span>
                </p>
                <p className="pl-6">
                  <span className="bg-yellow-200 px-1 rounded">體積</span> = <span className="bg-green-200 px-1 rounded">16 × 12 ÷ 2</span> × <span className="bg-blue-200 px-1 rounded">24</span> = 2304 cm³
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <p className="mb-2">
                  2. 求柱體<span className="bg-yellow-200 px-1 rounded">側面面積</span> = <span className="bg-purple-200 px-1 rounded">底周界</span> × <span className="bg-blue-200 px-1 rounded">高</span>
                </p>
                <p className="pl-6">
                  <span className="bg-yellow-200 px-1 rounded">側面面積</span> = <span className="bg-purple-200 px-1 rounded">(12 + 16 + 20)</span> × <span className="bg-blue-200 px-1 rounded">24</span> = 1152 cm²
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <p className="mb-2 w-full">
                  3. 求柱體<span className="bg-yellow-200 px-1 rounded">總表面面積</span> = <span className="bg-purple-200 px-1 rounded">底周界</span> × <span className="bg-blue-200 px-1 rounded">高</span> + 2 × <span className="bg-green-200 px-1 rounded">底面積</span>
                </p>
                <p className="pl-6 w-full text-base sm:text-lg">
                  <span className="bg-yellow-200 px-1 rounded tracking-tighter sm:tracking-normal">總表面面積</span> = <span className="bg-purple-200 px-1 rounded">(12 + 16 + 20)</span> × <span className="bg-blue-200 px-1 rounded">24</span> + 2 × <span className="bg-green-200 px-1 rounded">(16 × 12 ÷ 2)</span> = 3456 cm²
                </p>
              </div>

            </div>
          </div>

        </div>
      </CollapsibleSection>

      {/* 4. 畫立體圖 */}
      <CollapsibleSection id="draw-3d" title="畫立體圖" num={4} color="amber" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 text-center font-bold text-lg flex justify-center space-x-8">
            <span className="text-red-600">虛線：看不到的線</span>
            <span className="text-green-700">實線：看到的線</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 border border-slate-200 rounded">
              <h4 className="font-bold text-white bg-orange-500 inline-block px-2 py-1 text-sm mb-2 rounded">步驟 1</h4>
              <p className="text-sm text-slate-700 mb-4">繪畫長方體的其中一個底。</p>
              {/* 圖 1: 實線長方形 */}
              <div className="h-32 bg-slate-50 flex items-center justify-center">
                <svg viewBox="0 0 200 120" className="w-full h-full max-w-[200px]">
                  <rect x="40" y="40" width="100" height="60" fill="none" stroke="#22c55e" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            <div className="bg-white p-4 border border-slate-200 rounded">
              <h4 className="font-bold text-white bg-orange-500 inline-block px-2 py-1 text-sm mb-2 rounded">步驟 2</h4>
              <p className="text-sm text-slate-700 mb-4">繪畫另一個底。</p>
              {/* 圖 2: 錯開的兩個長方形(部份用虛線) */}
              <div className="h-32 bg-slate-50 flex items-center justify-center">
                <svg viewBox="0 0 200 120" className="w-full h-full max-w-[200px]">
                  <rect x="40" y="40" width="100" height="60" fill="none" stroke="#22c55e" strokeWidth="2" />
                  
                  {/* Dashed lines for back rectangle where hidden */}
                  <polyline points="70,80 70,20 170,20 170,80" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <line x1="70" y1="80" x2="170" y2="80" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="70" y1="80" x2="70" y2="40" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
            </div>
            
            <div className="bg-white p-4 border border-slate-200 rounded">
              <h4 className="font-bold text-white bg-orange-500 inline-block px-2 py-1 text-sm mb-2 rounded">步驟 3</h4>
              <p className="text-sm text-slate-700 mb-2">用直線連接所有對應的頂點以繪畫長方體的高。</p>
              {/* 圖 3: 完成的長方體 */}
              <div className="h-32 bg-slate-50 flex items-center justify-center relative">
                <svg viewBox="0 0 200 120" className="w-full h-full max-w-[200px]">
                  {/* Back Face Lines */}
                  <line x1="70" y1="80" x2="170" y2="80" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="70" y1="20" x2="70" y2="80" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" />
                  
                  {/* Hidden Vertical Edge */}
                  <line x1="40" y1="100" x2="70" y2="80" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Front Face & Visible Edges */}
                  <rect x="40" y="40" width="100" height="60" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <polyline points="40,40 70,20 170,20 170,80 140,100" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <line x1="140" y1="40" x2="170" y2="20" stroke="#22c55e" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

export const LinearEquationNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-red-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH4 一元一次方程</h1>
        <p className="text-red-500 font-bold mb-3 text-lg">✻ 此課非常重要，之後每一課都需用這課的代數混算技巧</p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700 text-base">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">解方程 <Latex math="x + 2 = 5" /></span>
            <span className="text-red-500 font-bold ml-2">→ 目標：</span>
            <span>找 <Latex math="x = ?" /></span>
            <span className="text-red-500 font-bold ml-2">→ 思路：</span>
            <span>將跟住 x 的數字按下列規矩移走</span>
          </div>
        </div>
      </div>

      {/* 1. 移項變相反 */}
      <CollapsibleSection id="move-terms" title="1. 移項變相反" num={1} color="green" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-5 border border-green-200 inline-block w-full md:w-auto">
            <h3 className="font-bold text-green-800 mb-3 text-lg">📝 規矩：</h3>
            <ul className="text-slate-700 font-bold text-lg space-y-2 list-disc ml-6">
              <li><Latex math="+" /> / <Latex math="-" /> 為相反</li>
              <li><Latex math="\times" /> / <Latex math="\div" /> 為相反</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <p className="text-slate-600 font-bold mb-4">例子 1：左移右，<Latex math="+3" /> 的相反數為 <Latex math="-3" /></p>
              <pre className="whitespace-pre font-sans text-xl leading-relaxed">
                <Latex math="x " /> <span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="+ 3" /></span> <Latex math=" = 5" />
                <br/>
                <Latex math="x = 5 " /> <span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="- 3" /></span>
                <br/>
                <Latex math="x = 2" />
              </pre>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <p className="text-slate-600 font-bold mb-4">例子 2：左右調動，<Latex math="\times 3" /> 的相反為 <Latex math="\div 3" /></p>
              <pre className="whitespace-pre font-sans text-xl leading-relaxed">
                <span className="bg-yellow-200 py-1 px-[2px] rounded inline-block"><Latex math="3" /></span><Latex math="y = 63" />
                <br/>
                <Latex math="y = " /> <span className="bg-yellow-200 px-1 rounded inline-flex flex-col items-center justify-center align-middle" style={{ lineHeight: '1.2' }}>
                  <Latex math="\frac{63}{3}" />
                </span> <span className="text-base text-green-700 ml-4 inline-block align-middle font-bold">← <Latex math="\frac{63}{3}" /> 與 <Latex math="63 \div 3" /> 相同</span>
                <br/>
                <Latex math="y = 21" />
              </pre>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 解代數時，看大畫面 */}
      <CollapsibleSection id="big-picture" title="2. 解代數時，看大畫面" num={2} color="red" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <pre className="whitespace-pre font-sans text-xl leading-relaxed">
                <div className="flex items-center flex-wrap">
                  <Latex math="19 = " /> <span className="border-2 border-purple-500 rounded-full px-3 py-1 bg-purple-50 ml-1 inline-block"><Latex math="4" /> <Latex math=" + 3x" /></span>
                </div>
                <div className="text-base text-slate-500 my-2 whitespace-normal font-medium">← 大畫面為「+」數，先移「+」變「-」</div>
                
                <Latex math="19 " /> <span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="- 4" /></span> <Latex math=" = " /> <span className="bg-green-200 px-1 rounded inline-block"><Latex math="3" /></span><Latex math="x" />
                <br/>
                <Latex math="15 = " /> <span className="bg-green-200 px-1 rounded inline-block"><Latex math="3" /></span><Latex math="x" />
                <div className="text-base text-slate-500 my-2 whitespace-normal font-medium">← 大畫面為「×」數，可移另一方至「÷」</div>
                
                <span className="bg-green-200 px-1 rounded inline-flex flex-col items-center justify-center align-middle" style={{ lineHeight: '1.2' }}>
                  <Latex math="\frac{15}{3}" />
                </span> <Latex math=" = x" />
                <br/>
                <Latex math="x = 5" />
              </pre>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-5 border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-100 text-green-700 px-3 py-1 rounded-bl-lg font-bold text-sm">分數即「÷」數</div>
                <pre className="whitespace-pre font-sans text-xl leading-relaxed mt-2 text-center">
                  <Latex math="\frac{a + 11}{" /><span className="bg-green-200 px-1 rounded inline-block"><Latex math="6" /></span><Latex math="} = 4" />
                  <br/>
                  <Latex math="a " /> <span className="bg-yellow-200 px-[2px] rounded inline-block"><Latex math="+ 11" /></span> <Latex math=" = 4 \times " /> <span className="bg-green-200 px-1 rounded inline-block"><Latex math="6" /></span>
                  <br/>
                  <Latex math="a " /> <span className="bg-yellow-200 px-[2px] rounded inline-block"><Latex math="+ 11" /></span> <Latex math=" = 24" />
                  <br/>
                  <Latex math="a = 24 " /> <span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="- 11" /></span>
                  <br/>
                  <Latex math="a = 13" />
                </pre>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-100 text-green-700 px-3 py-1 rounded-bl-lg font-bold text-sm">括號即「×」數</div>
                <pre className="whitespace-pre font-sans text-xl leading-relaxed mt-2 text-center">
                  <span className="bg-green-200 px-1 rounded inline-block"><Latex math="2" /></span><Latex math="(b " /> <span className="bg-yellow-200 px-[2px] rounded inline-block"><Latex math="- 5" /></span><Latex math=") = 20" />
                  <br/>
                  <Latex math="b " /> <span className="bg-yellow-200 px-[2px] rounded inline-block"><Latex math="- 5" /></span> <Latex math=" = " /> <span className="bg-green-200 px-1 rounded inline-flex flex-col items-center justify-center align-middle" style={{ lineHeight: '1.2' }}><Latex math="\frac{20}{2}" /></span>
                  <br/>
                  <Latex math="b " /> <span className="bg-yellow-200 px-[2px] rounded inline-block"><Latex math="- 5" /></span> <Latex math=" = 10" />
                  <br/>
                  <Latex math="b = 10 " /> <span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="+ 5" /></span>
                  <br/>
                  <Latex math="b = 15" />
                </pre>
              </div>
            </div>

          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 分數加減數 */}
      <CollapsibleSection id="fraction-addition" title="3. 分數加減數" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 md:px-12 border border-slate-200 max-w-2xl mx-auto shadow-sm">
            <h4 className="font-bold text-green-700 mb-6 text-xl">大畫面「-」數</h4>
            
            <pre className="whitespace-pre font-sans text-2xl leading-loose tracking-wide">
              <Latex math="\frac{2x}{3} " /> <span className="bg-yellow-200 px-2 rounded inline-block"><Latex math="- 4" /></span> <Latex math=" = 8" />
              <div className="border-b-[3px] border-green-500 w-24 mb-4 relative -top-3"></div>
              
              <Latex math="\frac{2x}{3} = 8 " /> <span className="bg-yellow-200 px-2 rounded inline-block"><Latex math="+ 4" /></span>
              <br/>
              <span className="text-xl text-green-700 mr-4 font-bold inline-block align-middle">除數</span> <Latex math="\frac{2x}{" /> <span className="bg-green-200 px-2 rounded inline-block"><Latex math="3" /></span><Latex math="} = 12" />
              <br/>
              <span className="bg-cyan-200 px-1 rounded inline-block"><Latex math="2" /></span><Latex math="x = 12 \times " /> <span className="bg-green-200 px-2 rounded inline-block"><Latex math="3" /></span>
              <br/>
              <span className="bg-cyan-200 px-1 rounded inline-block"><Latex math="2" /></span><Latex math="x = 36" />
              <br/>
              <Latex math="x = " /> <span className="bg-cyan-200 px-2 rounded inline-flex flex-col items-center justify-center align-middle" style={{ lineHeight: '1.2' }}><Latex math="\frac{36}{2}" /></span>
              <br/>
              <Latex math="x = 18" />
            </pre>
          </div>

          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 w-full shadow-sm text-center">
            <p className="text-amber-800 font-bold text-lg md:text-xl">💡 額外資訊：「根」即是答案</p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

export const StatisticsNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null), s6 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH8 統計(一)</h1>
      </div>

      <CollapsibleSection id="bar-chart" title="1. 棒形圖" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <svg viewBox="0 0 400 250" className="w-full h-auto max-w-md mx-auto font-sans">
              <defs>
                <marker id="arrow-y" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                  <path d="M 1 1 L 5 3 L 1 5 Z" fill="#64748b" />
                </marker>
                <marker id="arrow-x" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                  <path d="M 1 1 L 5 3 L 1 5 Z" fill="#64748b" />
                </marker>
              </defs>
              
              {/* Y Grid lines */}
              {[30, 77.5, 125, 172.5].map((y, i) => (
                <line key={i} x1="50" y1={y} x2="380" y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
              ))}
              
              {/* Axes */}
              <line x1="50" y1="220" x2="380" y2="220" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-x)" />
              <line x1="50" y1="220" x2="50" y2="20" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-y)" />
              
              {/* Box plot areas */}
              <g fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2">
                <rect x="90" y="153.5" width="30" height="66.5" />
                <rect x="145" y="87" width="30" height="133" />
                <rect x="200" y="30" width="30" height="190" />
                <rect x="255" y="72.75" width="30" height="147.25" />
                <rect x="310" y="153.5" width="30" height="66.5" />
              </g>

              {/* Box Heights Text */}
              <g fill="#1d4ed8" fontSize="12" fontWeight="bold" textAnchor="middle">
                <text x="105" y="148.5">14</text>
                <text x="160" y="82">28</text>
                <text x="215" y="25">40</text>
                <text x="270" y="67.75">31</text>
                <text x="325" y="148.5">14</text>
              </g>

              {/* Labels (X-axis) */}
              <g fill="#475569" fontSize="12" textAnchor="middle">
                <text x="105" y="235">A</text>
                <text x="160" y="235">B</text>
                <text x="215" y="235">C</text>
                <text x="270" y="235">D</text>
                <text x="325" y="235">E</text>
                <text x="215" y="250" fontSize="11" fill="#64748b">候選人</text>
              </g>
              
              {/* Labels (Y-axis) */}
              <g fill="#475569" fontSize="11" textAnchor="end" dominantBaseline="middle">
                <text x="42" y="220">0</text>
                <text x="42" y="172.5">10</text>
                <text x="42" y="125">20</text>
                <text x="42" y="77.5">30</text>
                <text x="42" y="30">40</text>
                <text x="15" y="20">票數</text>
              </g>
            </svg>
          </div>
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-200 flex flex-col justify-center">
            <h3 className="font-bold text-blue-800 mb-4 text-lg">💡 能得知以下資訊：</h3>
            <ul className="text-slate-700 font-bold text-xl space-y-4 list-disc ml-8">
              <li>每類型票數</li>
              <li>總票數</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="pie-chart" title="2. 圓形圖" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-slate-700 font-bold text-lg mb-2 text-center text-blue-800">例：假設屋邨有 1200 名居民</p>
            <svg viewBox="0 0 400 300" className="w-full h-auto max-w-md mx-auto font-sans">
              <g transform="translate(200, 150)">
                {/* 120 deg: -90 to 30 */}
                <path d="M 0 0 L 0 -110 A 110 110 0 0 1 95.26 55 Z" fill="rgba(234,179,8,0.3)" stroke="#eab308" strokeWidth="2" strokeLinejoin="round" />
                {/* 69 deg: 30 to 99 */}
                <path d="M 0 0 L 95.26 55 A 110 110 0 0 1 -17.21 108.64 Z" fill="rgba(236,72,153,0.3)" stroke="#ec4899" strokeWidth="2" strokeLinejoin="round" />
                {/* 96 deg: 99 to 195 (-165) */}
                <path d="M 0 0 L -17.21 108.64 A 110 110 0 0 1 -106.25 28.47 Z" fill="rgba(249,115,22,0.3)" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />
                {/* 45 deg: 195 to 240 (-120) */}
                <path d="M 0 0 L -106.25 28.47 A 110 110 0 0 1 -95.26 -55 Z" fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="2" strokeLinejoin="round" />
                {/* 30 deg: 240 to 270 (-90) */}
                <path d="M 0 0 L -95.26 -55 A 110 110 0 0 1 0 -110 Z" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
              </g>

              {/* Angle Labels */}
              <g fontSize="12" fontWeight="bold" textAnchor="middle">
                {/* 120deg (0 to 120, avg 60, -90+60 = -30) -> cos(-30), sin(-30) */}
                <text x="250" y="100" fill="#a16207">120°</text>
                {/* 69deg (120 to 189, avg 154.5, -90+154.5 = 64.5) -> bot right */}
                <text x="260" y="210" fill="#be185d">69°</text>
                {/* 96deg (189 to 285, avg 237, -90+237=147) -> bot left */}
                <text x="130" y="235" fill="#c2410c">x°</text>
                {/* 45deg (285 to 330, avg 307.5, -90+307.5 = 217.5 = -142.5) -> top left */}
                <text x="120" y="145" fill="#15803d">45°</text>
                {/* 30deg (330 to 360, avg 345, -90+345=255 = -105) -> top */}
                <text x="175" y="80" fill="#1d4ed8">30°</text>
              </g>

              {/* Slice Category Labels */}
              <g fontSize="12" textAnchor="middle">
                {/* 120deg */}
                <text x="290" y="60" fill="#334155">60歲或以上</text>
                <line x1="260" y1="85" x2="290" y2="65" stroke="#94a3b8" strokeWidth="1" />
                
                {/* 69deg */}
                <text x="320" y="230" fill="#334155">45 - 59歲</text>
                <line x1="275" y1="215" x2="320" y2="215" stroke="#94a3b8" strokeWidth="1" />
                
                {/* 96deg */}
                <text x="80" y="260" fill="#334155">30 - 44歲</text>
                <line x1="120" y1="240" x2="80" y2="245" stroke="#94a3b8" strokeWidth="1" />

                {/* 45deg */}
                <text x="50" y="130" fill="#334155">15 - 29歲</text>
                <line x1="105" y1="135" x2="70" y2="135" stroke="#94a3b8" strokeWidth="1" />

                {/* 30deg */}
                <text x="150" y="30" fill="#334155">0 - 14歲</text>
                <line x1="170" y1="65" x2="150" y2="35" stroke="#94a3b8" strokeWidth="1" />
              </g>
            </svg>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3 text-lg">💡 能得知以下資訊：</h3>
              <ul className="text-slate-700 font-bold text-base space-y-4 list-disc ml-6">
                  <li>
                    圓形圖角度總和是 <span className="text-red-600">360°</span>，因此能找 x 的角度
                    <div className="text-slate-600 font-normal mt-2 ml-2">例：<Latex math="x = 360^\circ - 120^\circ - 30^\circ - 45^\circ - 69^\circ = 96^\circ" /></div>
                  </li>
                  <li>
                    若知總人數，能推出每格人數
                    <div className="text-red-600 font-bold mt-2 bg-red-50 p-2 rounded inline-block">每格人數 <Latex math="= \text{總人數} \times \frac{\text{該格角度}}{360^\circ}" /></div>
                  </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-5 border border-slate-200">
                <p className="text-slate-800 font-bold mb-3">例：已知總人數為 <span className="text-blue-700">1200</span>，<Latex math="360^\circ" /> 中佔 <span className="text-purple-600 bg-yellow-200 px-1 rounded">30°</span></p>
                <div className="whitespace-pre font-sans text-base leading-relaxed pl-4">
                  <span className="font-bold text-slate-700">能得出：</span><br/>
                  <div className="my-2 flex items-center flex-wrap gap-2">
                    <span className="font-bold">0 - 14歲 :</span>
                    <Latex math="1200 \times " />
                    <span className="inline-flex flex-col items-center justify-center align-middle bg-yellow-200 px-1 rounded text-purple-600" style={{ lineHeight: '1.2' }}>
                      <span className="border-b border-purple-600 block px-1 text-sm font-bold">30°</span>
                      <span className="block px-1 text-sm font-bold">360°</span>
                    </span>
                    <Latex math=" = 100 \text{ 人}" />
                  </div>
                  <div className="my-2 flex items-center flex-wrap gap-2">
                    <span className="font-bold">45 - 59歲 :</span>
                    <Latex math="1200 \times " />
                    <span className="inline-flex flex-col items-center justify-center align-middle" style={{ lineHeight: '1.2' }}>
                      <span className="border-b border-slate-700 block px-1 text-sm font-bold text-blue-700">69°</span>
                      <span className="block px-1 text-sm font-bold">360°</span>
                    </span>
                    <Latex math=" = 230 \text{ 人}" />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="line-graph" title="3. 折線圖" num={3} color="blue" activeSub={activeSub} sectionRef={s3}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <svg viewBox="0 0 400 250" className="w-full h-auto max-w-md mx-auto font-sans">
              <defs>
                <marker id="arrow-y2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                  <path d="M 1 1 L 5 3 L 1 5 Z" fill="#64748b" />
                </marker>
                <marker id="arrow-x2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                  <path d="M 1 1 L 5 3 L 1 5 Z" fill="#64748b" />
                </marker>
              </defs>
              
              {/* Y Grid lines & X Grid lines */}
              {[30, 77.5, 125, 172.5].map((y, i) => (
                <line key={`hy-${i}`} x1="50" y1={y} x2="380" y2={y} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              {[90, 130, 170, 210, 250, 290, 330].map((x, i) => (
                <line key={`vx-${i}`} x1={x} y1="30" x2={x} y2="220" stroke="#f1f5f9" strokeWidth="1" />
              ))}

              {/* Axes */}
              <line x1="50" y1="220" x2="380" y2="220" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-x2)" />
              <line x1="50" y1="220" x2="50" y2="20" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-y2)" />

              {/* Data points and Line */}
              <polyline 
                points="90,115.5 130,125 170,148.75 210,129.75 250,101.25 290,96.5 330,77.5"
                fill="none" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round"
              />
              <g fill="#3b82f6" stroke="#ffffff" strokeWidth="1">
                <circle cx="90" cy="115.5" r="4" />
                <circle cx="130" cy="125" r="4" />
                <circle cx="170" cy="148.75" r="4" />
                <circle cx="210" cy="129.75" r="4" />
                <circle cx="250" cy="101.25" r="4" />
                <circle cx="290" cy="96.5" r="4" />
                <circle cx="330" cy="77.5" r="4" />
              </g>

              {/* Labels (X-axis) */}
              <g fill="#475569" fontSize="11" textAnchor="middle">
                {['2012', '2013', '2014', '2015', '2016', '2017', '2018'].map((year, i) => (
                  <text key={year} x={90 + i * 40} y="235">{year}</text>
                ))}
                <text x="210" y="250" fontSize="11" fill="#64748b">年份</text>
              </g>
              
              {/* Labels (Y-axis) */}
              <g fill="#475569" fontSize="11" textAnchor="end" dominantBaseline="middle">
                <text x="42" y="220">0</text>
                <text x="42" y="172.5">10</text>
                <text x="42" y="125">20</text>
                <text x="42" y="77.5">30</text>
                <text x="42" y="30">40</text>
                {/* Vertical Y-axis title */}
                <g transform="translate(15, 125)">
                  <text x="0" y="0" textAnchor="middle" transform="rotate(-90)" fill="#64748b">失業率 (%)</text>
                </g>
              </g>
            </svg>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-blue-800 font-bold text-lg">折線圖：通常用於比較<span className="text-red-600 mx-1">不同時段</span>的數據變化</p>
            </div>
            <ul className="text-slate-700 font-bold text-lg space-y-4 list-disc ml-6 mt-4">
              <li>能得知不同時間的數據，並作出比較</li>
              <li>能看到現時趨勢 / 預測未來趨勢</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="stem-leaf" title="4. 幹葉圖" num={4} color="blue" activeSub={activeSub} sectionRef={s4}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border border-slate-200 h-full flex flex-col items-center justify-center">
            
            <p className="text-slate-800 font-bold mb-4 self-start">以下的幹葉圖顯示下列數據：</p>
            
            <div className="grid grid-cols-5 gap-y-2 gap-x-6 text-xl font-mono mb-8 text-center text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 w-full max-w-sm">
              <div>1</div>
              <div className="bg-yellow-200 px-1 rounded">21</div>
              <div>10</div>
              <div className="bg-blue-200 px-1 rounded text-red-600 font-bold relative">
                47
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm whitespace-nowrap text-red-600">最大</div>
              </div>
              <div>45</div>
              <div>23</div>
              <div className="relative">
                10
                <svg className="absolute w-8 h-8 -left-4 -top-3" style={{ pointerEvents: 'none' }}>
                  <ellipse cx="16" cy="18" rx="14" ry="10" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2"/>
                </svg>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm whitespace-nowrap text-red-600 font-bold">最小</div>
              </div>
              <div>42</div>
              <div>24</div>
              <div>48</div>
            </div>

            <table className="border-collapse text-xl">
              <thead>
                <tr className="border-b-[3px] border-slate-700">
                  <th className="px-5 py-2 text-slate-800 font-bold border-r-[3px] border-slate-700">幹(十位)</th>
                  <th className="px-5 py-2 text-slate-800 font-bold">葉(個位)</th>
                </tr>
              </thead>
              <tbody className="font-mono text-center text-slate-700">
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-5 py-2 border-r-[3px] border-slate-700">0</td>
                  <td className="px-5 py-2 text-left tracking-[0.5em]">1</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-5 py-2 border-r-[3px] border-slate-700">1</td>
                  <td className="px-5 py-2 text-left tracking-[0.5em]">
                    <span className="relative inline-block w-4 text-center">0
                      <svg className="absolute w-8 h-8 -left-2 -top-1" style={{ pointerEvents: 'none' }}>
                        <circle cx="16" cy="14" r="10" fill="none" stroke="#ef4444" strokeWidth="2" />
                      </svg>
                    </span>
                    0
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition bg-yellow-50">
                  <td className="px-5 py-2 border-r-[3px] border-slate-700 font-bold">2</td>
                  <td className="px-5 py-2 text-left tracking-[0.5em] font-bold">1<span className="text-blue-600">3</span>4</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-5 py-2 border-r-[3px] border-slate-700">4</td>
                  <td className="px-5 py-2 text-left tracking-[0.5em]">2 5 <span className="text-red-600 font-bold relative">7
                    <svg className="absolute w-8 h-8 -left-2.5 -top-1" style={{ pointerEvents: 'none' }}>
                      <circle cx="14" cy="14" r="10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    </svg>
                  </span> 8</td>
                </tr>
              </tbody>
            </table>

          </div>
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-4 text-xl border-b border-blue-200 pb-2">幹葉圖</h3>
            <ul className="text-slate-700 font-bold text-lg space-y-3 list-disc ml-6 mb-6">
              <li>能清楚知道每一個數據</li>
              <li>按大小<span className="bg-yellow-200 px-1 rounded text-slate-800">順序</span>排列數據</li>
              <li>能看到<span className="text-red-500 px-1">最大 / 最小</span>的數據</li>
              <li>可以得知<span className="text-red-500 px-1">總人數</span>
                <div className="text-slate-600 font-normal mt-1 border-l-4 border-slate-300 pl-3 ml-2 text-base">↳ 數葉（右方）的數字出現了多少次</div>
              </li>
            </ul>
            <div className="bg-white rounded-lg p-4 border border-slate-200 mt-4">
              <p className="text-blue-800 font-bold mb-3">例：能推斷 <span className="bg-blue-100 px-1 rounded"><Latex math="a = 9" /></span>，因 19 下一個數是 20</p>
              <div className="flex justify-center mb-4 text-lg">
                <table className="border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-400">
                      <th className="px-3 py-1 text-slate-600 font-normal">幹 (十位)</th>
                      <th className="px-3 py-1 border-l-2 border-slate-400 text-slate-600 font-normal">葉 (個位)</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-center">
                    <tr>
                      <td className="px-3 py-1">1</td>
                      <td className="px-3 py-1 border-l-2 border-slate-400 text-left tracking-widest"><span className="text-slate-500 font-sans">b</span> 9 <span className="text-green-600 font-sans font-bold">a</span> <span className="text-green-600 font-sans text-sm font-bold ml-2">←可能性只有 9</span></td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1">2</td>
                      <td className="px-3 py-1 border-l-2 border-slate-400 text-left tracking-widest">0 1 2 3 3 4 7 8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-blue-800 font-bold mt-2 text-sm md:text-base">若指出<span className="text-red-600">最大</span>跟<span className="text-red-600">最小</span>的數據差 15，便可得知：</p>
              <p className="text-green-700 font-bold text-center mt-2 text-lg break-all"><Latex math="\because 28 - 15 = 13 \rightarrow b = 3" /></p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="frequency-table" title="6. 頻數分佈表 (填表格)" num={6} color="blue" activeSub={activeSub} sectionRef={s6}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <p className="text-slate-800 font-bold mb-4 border-b pb-2">8. 以下是一些家庭擁有冷氣機的數目：</p>
            <div className="flex flex-wrap gap-[6px] mb-6 justify-center max-w-sm mx-auto p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="bg-pink-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">4</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-purple-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">1</span>
              <span className="bg-cyan-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">2</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-yellow-300 px-2 py-1 rounded text-slate-800 font-bold text-sm shadow-sm">0</span>
              <span className="bg-pink-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">4</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-purple-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">1</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-purple-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">1</span>
              <span className="bg-pink-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">4</span>
              
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-yellow-300 px-2 py-1 rounded text-slate-800 font-bold text-sm shadow-sm">0</span>
              <span className="bg-purple-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">1</span>
              <span className="bg-purple-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">1</span>
              <span className="bg-yellow-300 px-2 py-1 rounded text-slate-800 font-bold text-sm shadow-sm">0</span>
              <span className="bg-pink-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">4</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-pink-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">4</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
              <span className="bg-pink-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">4</span>
              <span className="bg-pink-300 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">4</span>
              <span className="bg-green-400 px-2 py-1 rounded text-white font-bold text-sm shadow-sm">3</span>
            </div>
            <p className="text-slate-500 text-sm mb-4">完成以下頻數分佈表。</p>
            <table className="w-full border-collapse border-2 border-slate-700 bg-white text-center shadow-sm max-w-xs mx-auto text-lg">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-slate-700 p-2 text-slate-800 font-bold">冷氣機的數目</th>
                  <th className="border-2 border-slate-700 p-2 text-slate-800 font-bold">劃記</th>
                  <th className="border-2 border-slate-700 p-2 text-slate-800 font-bold">頻數</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-2 border-slate-700 p-2 font-bold text-slate-700">0</td>
                  <td className="border-2 border-slate-700 p-2 text-red-600 font-bold tracking-[0.4em] text-xl">///</td>
                  <td className="border-2 border-slate-700 p-2 text-red-600 font-bold text-xl">3</td>
                </tr>
                <tr>
                  <td className="border-2 border-slate-700 p-3">1</td>
                  <td className="border-2 border-slate-700 p-3"></td>
                  <td className="border-2 border-slate-700 p-3"></td>
                </tr>
                <tr>
                  <td className="border-2 border-slate-700 p-3">...</td>
                  <td className="border-2 border-slate-700 p-3"></td>
                  <td className="border-2 border-slate-700 p-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-6 pt-4 flex flex-col justify-center">
            <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg flex items-start">
              <span className="text-blue-700 font-bold text-2xl mr-3">1.</span>
              <p className="text-blue-800 font-bold text-lg pt-1">以 <span className="bg-yellow-200 px-1 rounded">highlight 筆顏色</span> / <span className="underline decoration-blue-400 decoration-2 underline-offset-4">原子筆形狀</span> 分辨不同數據</p>
            </div>
            
            <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg flex items-start">
              <span className="text-blue-700 font-bold text-2xl mr-3">2.</span>
              <div className="pt-1">
                <p className="text-blue-800 font-bold text-lg mb-3">填寫出現的數字進<span className="text-red-600 ml-1">「數目」</span></p>
                <div className="space-y-3 bg-white p-4 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">▶</span>
                    <div>
                      先找 <span className="text-blue-800 font-bold">頻數</span>
                      <p className="text-slate-600 text-sm mt-1">（這個數字出現了多少次？）</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">▶</span>
                    <div>
                      後加 <span className="text-blue-800 font-bold">劃記</span>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">（<span className="text-red-500 font-bold tracking-[0.2em] bg-red-50 px-1 rounded mx-1">////</span> 每數 4 個，第 5 個需 <span className="text-red-500 font-bold line-through decoration-2 decoration-red-500 bg-red-50 px-1 rounded mx-1">卌</span> 加橫線串）</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="discrete-continuous" title="5. 需分辨數據為離散數據還是連續數據？" num={5} color="red" activeSub={activeSub} sectionRef={s5}>
        <div className="bg-white rounded-xl p-6 border-l-[6px] border-l-red-500 shadow-md max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 transition hover:shadow-md">
              <h3 className="text-red-800 font-bold text-xl mb-3 flex items-center"><span className="mr-2">📝</span>離散數據</h3>
              <p className="text-slate-700 text-lg mb-4"><span className="text-red-600 font-bold border-b-2 border-red-300 pb-1">數算</span>所得</p>
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <p className="text-blue-800 text-sm font-bold opacity-80 mb-1">例子：</p>
                <p className="text-slate-700 font-medium">錢，人數，物件數量 ...</p>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 transition hover:shadow-md">
              <h3 className="text-red-800 font-bold text-xl mb-3 flex items-center"><span className="mr-2">📏</span>連續數據</h3>
              <p className="text-slate-700 text-lg mb-4"><span className="text-red-600 font-bold border-b-2 border-red-300 pb-1">量度</span>所得</p>
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <p className="text-blue-800 text-sm font-bold opacity-80 mb-1">例子：</p>
                <p className="text-slate-700 font-medium">身高，體重，溫度，時間，容量，體積 ...</p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};
