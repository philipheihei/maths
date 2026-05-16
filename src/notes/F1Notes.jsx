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
