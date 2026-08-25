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
            <h3 className="font-bold text-blue-800 mb-3">📝 檢查整除看特徵</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 2 整除</div>
                <div className="col-span-2">看尾數：雙數 <span className="text-green-600 font-bold">✓</span>，單數 <span className="text-red-500 font-bold">×</span></div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 3 整除</div>
                <div className="col-span-2">將該數的<span className="bg-yellow-200 px-1 rounded">每一個數字相加</span>，看是否 <span className="bg-yellow-200 px-1 rounded">3 的倍數</span></div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 4 整除</div>
                <div className="col-span-2">將尾 2 個數 ÷ 4，看有沒有餘數（沒有 <span className="text-green-600 font-bold">→ 能整除</span>；有<span className="text-red-600 font-bold">→ 不能整除</span>）</div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 5 整除</div>
                <div className="col-span-2">看尾數：為 5 或 0</div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 6 整除</div>
                <div className="col-span-2">檢查是否同時被 2 和 3 整除 </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 8 整除</div>
                <div className="col-span-2">將尾 3 個數 ÷ 8，看有沒有餘數（沒有 <span className="text-green-600 font-bold">→ 能整除</span>；有<span className="text-red-600 font-bold">→ 不能整除</span>）</div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-blue-100 pb-2">
                <div className="font-bold text-slate-700">被 9 整除</div>
                <div className="col-span-2">將該數的<span className="bg-yellow-200 px-1 rounded">每一個數字相加</span>，看是否 <span className="bg-yellow-200 px-1 rounded">9 的倍數</span></div>
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
            <div className="flex flex-col gap-2 items-start">
              <div className="[&>span]:!text-left">
                <Latex math={`\\begin{aligned} 3 \\times 5 &= 3 + 3 + 3 + 3 + 3 \\\\ 3^5 &= 3 \\times 3 \\times 3 \\times 3 \\times 3 \\end{aligned}`} block />
              </div>
              <span className="text-slate-600 text-sm">（5 個 3 相乘）</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">例子：</p>
            <div className="flex flex-wrap items-center gap-2 font-sans font-bold">
              <span className="bg-yellow-200 px-1"><Latex math="5 \times 5 \times 5" /></span>
              <Latex math="\times" />
              <span className="bg-blue-200 px-1"><Latex math="7 \times 7 \times 7 \times 7 \times 7 \times 7" /></span>
              <Latex math="=" />
              <span className="bg-yellow-200 px-1"><Latex math="5^3" /></span>
              <Latex math="\times" />
              <span className="bg-blue-200 px-1"><Latex math="7^6" /></span>
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
            <p className="text-slate-700 mb-4">如果該數的因數只有 1 和該數字本身，就為質數。</p>
            
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
                    <td className="font-bold text-left"><span className="bg-yellow-200 px-1"><Latex math="8" /></span> × 5</td>
                    <td className="pl-4 text-green-700 text-sm">← 若當中有合成數，需繼續拆乘式</td>
                  </tr>
                  <tr>
                    <td className="text-right pr-2">=</td>
                    <td className="font-bold text-left"><span className="bg-yellow-200 px-1"><Latex math="2 \times 4" /></span> × 5</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="text-right pr-2">=</td>
                    <td className="font-bold text-left"><span className="bg-yellow-200 px-1"><Latex math="2 \times 2 \times 2" /></span> × 5</td>
                    <td className="pl-4 text-green-700 text-sm">← 直至全部數字都是質數</td>
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
              <div className="inline-grid grid-cols-[auto_1fr] font-sans text-lg mb-4 items-end gap-y-1">
                <div className="pr-2 pb-1 text-right">
                  <span className="bg-yellow-200 px-1">2</span>
                </div>
                <div className="pl-2 border-l-2 border-b-2 border-black pb-1 flex gap-4 w-max">
                  <span className="w-6 text-center">20</span><span className="w-6 text-center">32</span>
                </div>
                <div className="pr-2 pb-1 text-right">
                  <span className="bg-yellow-200 px-1">2</span>
                </div>
                <div className="pl-2 border-l-2 border-b-2 border-black pb-1 flex gap-4 w-max">
                  <span className="w-6 text-center">10</span><span className="w-6 text-center">16</span>
                </div>
                <div></div>
                <div className="pl-2 pt-1 flex gap-4 w-max">
                  <span className="bg-yellow-200 px-1 w-6 text-center">5</span><span className="bg-yellow-200 px-1 w-6 text-center">8</span>
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li><span className="font-bold text-green-700">只看打直 → H.C.F.：</span> 2 × 2 = <span className="font-bold text-blue-700">4</span></li>
                <li className="ml-2"><span className="font-bold text-green-700">看 L 形 → L.C.M.：</span> 2 × 2 × 5 × 8 = <span className="font-bold text-blue-700">160</span></li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">提示：L.C.M. 的數 {'≥'} H.C.F. 的數</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <h3 className="font-bold text-blue-800 mb-4">3 個數字的 L.C.M. 和 H.C.F.</h3>
              <div className="inline-grid grid-cols-[auto_auto_1fr] font-sans text-lg mb-4 items-end gap-y-1">
                <div className="pr-2 pb-1 text-right">
                  <span className="bg-green-200 px-1">2</span>
                </div>
                <div className="pl-2 pr-4 border-l-2 border-b-2 border-black pb-1 flex gap-4 w-max">
                  <span className="w-6 text-center">18</span><span className="w-6 text-center">20</span><span className="w-6 text-center">24</span>
                </div>
                <div></div>

                <div className="pr-2 pb-1 text-right">
                  <span className="bg-yellow-200 px-1">3</span>
                </div>
                <div className="pl-2 pr-4 border-l-2 border-b-2 border-black pb-1 flex gap-4 w-max">
                  <span className="bg-yellow-200 px-1 w-6 text-center">9</span><span className="w-6 text-center">10</span><span className="bg-yellow-200 px-1 w-6 text-center">12</span>
                </div>
                <div className="pl-2 pb-1 flex flex-col justify-center">
                  <span className="text-green-700 text-sm font-sans">← 如果三個數沒公因數，</span>
                  <span className="text-green-700 text-sm font-sans">　可選其中兩數的公因數繼續找 L.C.M.</span>
                </div>

                <div className="pr-2 pb-1 text-right">
                  <span className="bg-yellow-200 px-1">2</span>
                </div>
                <div className="pl-2 pr-4 border-l-2 border-b-2 border-black pb-1 flex gap-4 w-max">
                  <span className="w-6 text-center">3</span><span className="w-6 text-center">10</span><span className="w-6 text-center">4</span>
                </div>
                <div className="pl-2 pb-1 flex items-center">
                  <span className="text-green-700 text-sm font-sans">← 10照抄，因為除不盡3</span>
                </div>

                <div></div>
                <div className="pl-2 pr-4 pt-1 flex gap-4 w-max">
                  <span className="bg-yellow-200 px-1 w-6 text-center">3</span><span className="bg-yellow-200 px-1 w-6 text-center">5</span><span className="bg-yellow-200 px-1 w-6 text-center">2</span>
                </div>
                <div className="pl-2 pt-1 flex items-center">
                  <span className="text-green-700 text-sm font-sans">← 直至做到任何兩數字都除不盡</span>
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-baseline gap-1">
                  <span className="font-bold inline-block w-[6.5rem] text-right">3個數的<span className="bg-green-200 px-1 rounded">因數</span></span>
                  <span className="font-bold">→</span>
                  <span className="font-bold">H.C.F.=</span>
                  <span><span className="font-bold text-blue-700">2</span></span>
                </li>
                <li className="flex items-baseline gap-1">
                  <span className="font-bold inline-block w-[6.5rem] text-right"><span className="bg-yellow-200 px-1">L</span> 形</span>
                  <span className="font-bold">→</span>
                  <span className="font-bold">L.C.M.=</span>
                  <span>2 × 3 × 2 × 3 × 5 × 2 = <span className="font-bold text-blue-700">360</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="arithmetic" title="5. 四則運算" num={5} color="blue" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-4 inline-block">
            <h3 className="font-bold text-amber-800">💡 運算次序：先處理括號，再乘除，後加減</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="font-sans text-lg mb-2 grid grid-cols-[2.75rem_1rem_1fr] gap-x-1 gap-y-1 items-baseline">
                <div className="font-bold text-slate-700">e.g.</div>
                <div></div>
                <div>
                  <span>3 + </span>
                  <span className="border-2 border-red-500 px-1">4 × 5</span>
                  <span> − 6</span>
                  <span className="text-red-500 text-sm font-normal ml-2 whitespace-nowrap">← 先計乘</span>
                </div>
                <div></div>
                <div className="font-bold text-slate-700">=</div>
                <div className="font-bold text-slate-700">3 + <span className="text-slate-900 border-b-2 border-red-500">20</span> − 6</div>
                <div></div>
                <div className="font-bold text-slate-700">=</div>
                <div className="font-bold text-slate-700">17</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex gap-4 text-green-700 font-bold mb-2">
                <span>( ) 小括號</span>
                <span>[ ] 中括號</span>
                <span>{`{ }`} 大括號</span>
              </div>
              <div className="font-sans text-lg mb-2 mt-4 grid grid-cols-[2.75rem_1rem_1fr] gap-x-1 gap-y-1 items-baseline">
                <div className="font-bold text-slate-700">e.g.</div>
                <div></div>
                <div>
                  <span>3 × </span>
                  <span className="bg-yellow-200 px-1">[24 − (6 + 2)]</span>
                  <span className="text-red-500 text-sm font-normal ml-2 whitespace-nowrap">← 先計小括號，再計中括號</span>
                </div>
                <div></div>
                <div className="font-bold text-slate-700">=</div>
                <div className="font-bold text-slate-700">3 × (24 − <span className="text-blue-600">8</span>) <span className="text-red-500 text-sm font-normal">← 中括號轉小括號</span></div>
                <div></div>
                <div className="font-bold text-slate-700">=</div>
                <div className="font-bold text-slate-700">3 × 16</div>
                <div></div>
                <div className="font-bold text-slate-700">=</div>
                <div className="font-bold text-slate-700">48</div>
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
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH2 有向數</h1>
        <p className="text-slate-600">正負數概念、數線比較與有向數乘除規律</p>
      </div>

      <CollapsibleSection id="positive-negative" title="有向數即正負數" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-700 mb-2">+ / 正數 / 加數字眼</h3>
              <p className="text-green-700">上升, 增加, 賺, 盈利, 存入 ...</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-bold text-red-700 mb-2">− / 負數 / 減數字眼</h3>
              <p className="text-red-700">下降, 扣減, 蝕, 虧蝕, 提取 ...</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-red-600 mb-3">相反數：</h3>
            <ul className="space-y-2 text-slate-700 font-sans">
              <li><span className="font-bold text-blue-700">+6</span> 的相反數是 <span className="font-bold text-blue-700">−6</span></li>
              <li><span className="font-bold text-blue-700">−20</span> 的相反數是 <span className="font-bold text-blue-700">+20</span></li>
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
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="font-bold text-green-700">11 &gt; 5</span>
                  <span className="invisible bg-yellow-200 px-2 py-1 rounded font-bold text-green-700">正負數的大小次序相反</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-slate-600 mb-1">17. 把 -6.3，+7.4，-6.9 和 +6.2 按遞增次序排列。</p>
              <div className="flex items-center justify-between gap-4 ml-6">
                <p className="font-bold text-blue-700 text-lg">−6.9, -6.3, +6.2, +7.4</p>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="font-bold text-green-700">但 -11 &lt; -5</span>
                  <span className="bg-yellow-200 px-2 py-1 rounded font-bold text-green-700">正負數的大小次序相反</span>
                </div>
              </div>
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
                      const isMark = val === 5 || val === -5 || val === 3 || val === -3;
                      const showLabel = !isMark && (val === 0 || val === 1);
                      
                      return (
                        <g key={i}>
                          <line x1={x} y1="25" x2={x} y2="35" stroke="#333" strokeWidth="2" />
                          {showLabel && (
                            <text x={x} y="50" textAnchor="middle" fontSize="12" fill="#666">
                              {val > 0 ? `+${val}` : val}
                            </text>
                          )}
                          {isMark && (
                            <g stroke="#38bdf8" strokeWidth="2" strokeLinecap="round">
                              <line x1={x - 5} y1="25" x2={x + 5} y2="35" />
                              <line x1={x - 5} y1="35" x2={x + 5} y2="25" />
                              <text x={x} y="15" textAnchor="middle" fontSize="14" fill="#38bdf8" stroke="none">{val > 0 ? `+${val}` : val}</text>
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
                      const showLabel = !isMark && (val === 0 || val === 0.5 || val === 1);
                      
                      return (
                        <g key={i}>
                          <line x1={x} y1="25" x2={x} y2="35" stroke="#333" strokeWidth="2" />
                          {showLabel && (
                            <text x={x} y="50" textAnchor="middle" fontSize="12" fill="#666">
                              {val > 0 ? `+${val}` : val}
                            </text>
                          )}
                          {isMark && (
                            <g stroke="#38bdf8" strokeWidth="2" strokeLinecap="round">
                              <line x1={x - 5} y1="25" x2={x + 5} y2="35" />
                              <line x1={x - 5} y1="35" x2={x + 5} y2="25" />
                              <text x={x} y="15" textAnchor="middle" fontSize="14" fill="#38bdf8" stroke="none">{val > 0 ? `+${val}` : val}</text>
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
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
            <div className="w-full">
              <div className="space-y-2 text-lg min-w-0">
                <div className="grid grid-cols-[minmax(4rem,5.5rem)_minmax(1.5rem,2.75rem)_minmax(1.5rem,2.25rem)_minmax(5rem,6.5rem)_minmax(0,1fr)] items-center gap-x-3">
                  <span className="font-bold text-green-700 flex items-center justify-center gap-2 leading-none text-2xl"><span className="w-5 text-center">+</span><span className="w-5 text-center">+</span></span>
                  <span className="font-bold text-green-700 text-center leading-none text-2xl">→</span>
                  <span className="font-bold text-green-700 text-center leading-none text-2xl">+</span>
                  <span className="font-bold text-green-700">正正得正</span>
                  <span className="text-red-600 text-sm">小學時已學！</span>
                </div>
                <div className="grid grid-cols-[minmax(4rem,5.5rem)_minmax(1.5rem,2.75rem)_minmax(1.5rem,2.25rem)_minmax(5rem,6.5rem)_minmax(0,1fr)] items-center gap-x-3">
                  <span className="font-bold text-green-700 flex items-center justify-center gap-2 leading-none text-2xl"><span className="w-5 text-center">−</span><span className="w-5 text-center">−</span></span>
                  <span className="font-bold text-green-700 text-center leading-none text-2xl">→</span>
                  <span className="font-bold text-green-700 text-center leading-none text-2xl">+</span>
                  <span className="font-bold text-green-700">負負得正</span>
                  <div className="flex items-center gap-2">
                    <MathDisplay latex={String.raw`(−2) \times (−3) = +6`} inline className="text-blue-700 text-base" />
                    <MathDisplay latex="(−a)(−b) = +ab" inline className="text-red-700 text-base" />
                  </div>
                </div>
                <div className="grid grid-cols-[minmax(4rem,5.5rem)_minmax(1.5rem,2.75rem)_minmax(1.5rem,2.25rem)_minmax(5rem,6.5rem)_minmax(0,1fr)] items-center gap-x-3">
                  <span className="font-bold text-green-700 flex items-center justify-center gap-2 leading-none text-2xl"><span className="w-5 text-center">+</span><span className="w-5 text-center">−</span></span>
                  <span className="font-bold text-green-700 text-center leading-none text-2xl">→</span>
                  <span className="font-bold text-green-700 text-center leading-none text-2xl">−</span>
                  <span className="font-bold text-green-700">正負得負</span>
                  <MathDisplay latex={String.raw`(+2) \times (−3) = −6`} inline className="text-blue-700 text-base" />
                </div>
                <div className="grid grid-cols-[minmax(4rem,5.5rem)_minmax(1.5rem,2.75rem)_minmax(1.5rem,2.25rem)_minmax(5rem,6.5rem)_minmax(0,1fr)] items-center gap-x-3">
                  <span className="font-bold text-green-700 flex items-center justify-center gap-2 leading-none text-2xl"><span className="w-5 text-center">−</span><span className="w-5 text-center">+</span></span>
                  <span className="font-bold text-green-700 text-center leading-none text-2xl">→</span>
                  <span className="font-bold text-green-700 text-center leading-none text-2xl">−</span>
                  <span className="font-bold text-green-700">負正得負</span>
                  <MathDisplay latex={String.raw`(−2) \times (+3) = −6`} inline className="text-blue-700 text-base" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200 space-y-4">
            <h3 className="font-bold text-red-700 text-lg flex items-center gap-2">
              需注意：
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="grid grid-rows-[4.75rem_3rem_3rem] font-sans text-lg text-blue-800">
                <div className="relative pt-7">
                  <p className="absolute left-8 right-0 top-0 text-center text-sm text-red-700 font-bold whitespace-nowrap">兩個+/兩個− 連在一起，需化簡</p>
                  <span className="absolute left-[7rem] top-3.5 text-sm text-red-700 font-bold">↓</span>
                  <div className="flex items-start"><span className="w-8 text-slate-500 text-sm mt-1 flex-shrink-0">e.g.</span><div className="flex-1"><Latex math="\begin{aligned} &\phantom{=}(+24)\colorbox{#fef08a}{$−(−$}42) \end{aligned}" block left /></div></div>
                </div>
                <div className="flex items-start"><span className="w-8 flex-shrink-0"></span><div className="flex-1"><Latex math="= +24 \colorbox{#fef08a}{$+$} 42" block left /></div></div>
                <div className="flex items-start"><span className="w-8 flex-shrink-0"></span><div className="flex-1"><Latex math="= +66" block left /></div></div>
              </div>
              <div className="grid grid-rows-[4.75rem_3rem_3rem_3rem] font-sans text-lg text-blue-800 relative">
                <div className="flex items-start pt-7"><span className="w-8 text-slate-500 text-sm mt-1 flex-shrink-0">e.g.</span><div className="flex-1"><Latex math="\begin{aligned} &\phantom{=}(−3)(−4)−5 \end{aligned}" block left /></div><p className="absolute left-[3.2rem] top-0 text-sm text-green-600 font-bold whitespace-nowrap">中間是 ×</p><span className="absolute left-[4.5rem] top-3.5 text-sm text-green-600 font-bold">↓</span></div>
                <div className="flex items-start"><span className="w-8 flex-shrink-0"></span><div className="flex-1"><Latex math={`= +(3 \\times 4)−5`} block left /></div></div>
                <div className="flex items-start"><span className="w-8 flex-shrink-0"></span><div className="flex-1"><Latex math="= +12−5" block left /></div></div>
                <div className="flex items-start"><span className="w-8 flex-shrink-0"></span><div className="flex-1"><Latex math="= +7" block left /></div></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex flex-col gap-4 font-sans text-lg text-blue-800">
              <div className="flex items-center gap-4">
                <span className="w-8 text-slate-500 text-sm flex-shrink-0">e.g.</span>
                <div className="w-fit flex-shrink-0">
                  <Latex math={`\\dfrac{−6+(−12)}{−3+5}`} block left />
                </div>
                <span className="text-green-600 text-sm font-bold">← 分數上下分開計</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="w-8 flex justify-end flex-shrink-0"><span className="inline-block origin-right [transform:scaleX(1.35)]">=</span></span>
                <div className="w-fit flex-shrink-0 ml-2">
                  <Latex math={`\\dfrac{−18}{+2}`} block left />
                </div>
                <span className="text-green-600 text-sm font-bold">← 上下剩一個數，可計除數</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-8 flex justify-end flex-shrink-0"><span className="inline-block origin-right [transform:scaleX(1.35)]">=</span></span>
                <div className="flex-1 max-w-xs ml-2">
                  <Latex math="−9" block left />
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
    <div className="ch6-long-equals">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-purple-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH6 多項式</h1>
        <p className="text-slate-600">單項式與多項式、項數係數、次數排列與四則運算</p>
      </div>

      {/* 1. 分辨單項式與多項式 */}
      <CollapsibleSection id="definition" title="分辨單項式與多項式" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3">📝 單項式 (Monomial)</h3>
              <p className="text-slate-700 mb-2">特徵：<strong>只有一項</strong></p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• 包含一個數字（例：<Latex math="2" />, <Latex math="\frac{5}{2}" />, <Latex math="−3.4" />）</li>
                <li>• 包含一個代數（例：<Latex math="x" />, <Latex math="y^2" />, <Latex math="a^3" />）</li>
                <li>• 只有乘，沒加減的項（例：<Latex math="2y" />, <Latex math="4x^2" />, <Latex math="−5m^3n^4" />）</li>
                <li>• 分母<strong>沒有代數</strong>的分數（例：<Latex math="\frac{x}{2}" />, <Latex math="−\frac{3y}{2}" />）</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-green-700 mb-3">📝 多項式 (Polynomial)</h3>
              <p className="text-slate-700 mb-2">特徵：<strong>多於一項</strong>，或包含以下情況</p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• 分母<strong>有代數</strong>的分數（例：<Latex math="\frac{2}{x}" />, <Latex math="\frac{2x}{y}" />）</li>
                <li>• 有 <Latex math="+" /> 或 <Latex math="−" /> 連接的式子（例：<Latex math="3x+4y" />）</li>
              </ul>
              <div className="mt-3 bg-white p-2 text-center rounded border border-green-100">
                <p className="text-sm font-bold text-green-800">一條式只要有 <Latex math="+" /> 或 <Latex math="−" /> 連接，便是多項式</p>
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
            <p className="text-slate-700 mb-2">方法：按住 <Latex math="+" /> / <Latex math="−" /> 的前面分開，再數項數</p>
            <div className="bg-white p-3 rounded border border-slate-200 flex items-center gap-4">
              <span className="text-slate-600">例子：</span>
              <span className="inline-flex items-center gap-1">
                <span className="bg-yellow-200 px-2 py-1 rounded inline-block"><Latex math="5" /></span>
                <span className="text-red-600 text-3xl font-normal leading-none transform scale-y-100">/</span>
                <span className="bg-yellow-200 px-2 py-1 rounded inline-block"><Latex math="+ 2x^3" /></span>
              </span>
              <span className="font-bold ml-2">👉 項數：2</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">📌 係數 (Coefficient)</h3>
            <p className="text-slate-700 mb-2">定義：某代數旁邊的數字</p>
            <div className="bg-white p-3 rounded border border-slate-200">
              <MathDisplay math="1x^2 − 4x^3 + 8" />
              <div className="flex flex-col gap-1 mt-2 mb-4">
                <p>• <Latex math="x^2" /> 的係數 <span className="plain-equals">=</span> <Latex math="1" /></p>
                <p>• <Latex math="x^3" /> 的係數 <span className="plain-equals">=</span> <Latex math="−4" /></p>
              </div>
              <p className="text-sm text-slate-500 border-t pt-2">多項式：<Latex math="0x^2 + 2x + 3" /> （項數為 3）</p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">📌 常數項 (Constant Term)</h3>
            <p className="text-slate-700 mb-2">定義：沒有代數的項的數字</p>
            <div className="bg-white p-3 rounded border border-slate-200">
              <div className="text-center my-2">
                <span className="inline-flex items-center gap-1">
                  <Latex math="−5x^2y^3" />
                  <span className="text-red-600 text-3xl font-normal leading-none transform scale-y-100">/</span>
                  <Latex math="+ 2x^3y" />
                  <span className="text-red-600 text-3xl font-normal leading-none transform scale-y-100">/</span>
                  <Latex math="− 6" />
                  <span className="text-red-600 text-3xl font-normal leading-none transform scale-y-100">/</span>
                  <Latex math="+ x" />
                </span>
              </div>
              <p className="text-center font-bold mt-2 text-purple-700">常數項是 <Latex math="−6" /></p>
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
              <div className="text-center my-2">
                <span className="inline-flex items-center gap-1">
                  <span className="bg-yellow-200 px-2 py-1 rounded inline-block"><Latex math="x^2y" /></span>
                  <span className="text-red-600 text-3xl font-normal leading-none transform scale-y-100">/</span>
                  <Latex math="+ 5x" />
                  <span className="text-red-600 text-3xl font-normal leading-none transform scale-y-100">/</span>
                  <Latex math="+ 1" />
                </span>
              </div>
              <p className="text-center mt-2">次數：<Latex math="2 + 1 = 3" /></p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">📌 排列多項式 (升冪 / 降冪)</h3>
            <p className="text-slate-700 mb-2">方法：按次方的大小重新排多項式（冪 = 次方）</p>
            <div className="bg-white p-4 rounded border border-slate-200 space-y-3">
              <div className="text-center my-2">
                <span className="inline-flex items-center gap-1">
                  <Latex math="5x" />
                  <span className="text-red-600 text-3xl font-normal leading-none transform scale-y-100">/</span>
                  <Latex math="− 3x^3" />
                  <span className="text-red-600 text-3xl font-normal leading-none transform scale-y-100">/</span>
                  <Latex math="+ 2x^2" />
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-2 rounded">
                  <p className="font-bold text-slate-700 mb-1">降冪 <span className="text-sm font-normal">（次方大到小 ↓）</span></p>
                  <Latex math="−3x^3 + 2x^2 + 5x" block />
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <p className="font-bold text-slate-700 mb-1">升冪 <span className="text-sm font-normal">（次方小到大 ↑）</span></p>
                  <Latex math="5x + 2x^2 − 3x^3" block />
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
              <pre className="whitespace-pre font-sans text-lg"><span className="invisible"><span className="plain-equals">=</span>{' '}</span><Latex math="3x + 4x + 2x" /> <span className="text-sm text-green-600 normal-equals"><Latex math="(3+4+2=9)" /></span>{'\n'}<span className="plain-equals">=</span>{' '}<Latex math="9x" /></pre>
            </div>
            <hr />
            <div>
              <p className="text-sm text-slate-600 mb-1">例子 2：</p>
              <pre className="whitespace-pre font-sans text-lg">
                <span className="invisible"><span className="plain-equals">=</span>{' '}</span><Latex math="3y − 5y + 6y" /> <span className="text-sm text-green-600 normal-equals"><Latex math="(3-5+6=4)" /></span>{'\n'}
<span className="plain-equals">=</span>{' '}<Latex math="4y" />
              </pre>
            </div>
            <hr />
            <div>
              <p className="text-sm text-slate-600 mb-1">例子 3 (異類項尸分類)：</p>
              <pre className="whitespace-pre font-sans text-lg">
                <span className="invisible"><span className="plain-equals">=</span>{' '}</span><Latex math="2x − 3y − 7x − y" />{'\n'}
<span className="plain-equals">=</span>{' '}<Latex math="2x − 7x − 3y − y" /> <span className="text-sm text-green-600"><Latex math="(-3-1)" /></span>{'\n'}
<span className="plain-equals">=</span>{' '}<Latex math="−5x − 4y" />
              </pre>
            </div>
            <hr />
            <div>
              <p className="text-sm text-slate-600 mb-1">例子 4 (拆括號)：</p>
              <pre className="whitespace-pre font-sans text-lg">
                <span className="invisible"><span className="plain-equals">=</span>{' '}</span><Latex math="5x + 3y − (4x − 3y)" />{'\n'}
<span className="plain-equals">=</span>{' '}<Latex math="5x + 3y − 4x + 3y" /> <span className="text-sm text-red-500 font-bold">← 正負調轉 (-4x +3y)</span>{'\n'}
<span className="plain-equals">=</span>{' '}<Latex math="5x − 4x + 3y + 3y" />{'\n'}
<span className="plain-equals">=</span>{' '}<Latex math="x + 6y" />
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
                <Latex math="(−\frac{3}{y})(5y)" block />
                <Latex math="= −15y^2" block />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">📌 單項式 × 多項式</h3>
            <p className="text-slate-700 mb-2 text-sm">方法：只會乘其他括號的項，順序相乘</p>
            <div className="bg-white p-4 rounded border border-slate-200 space-y-4">
              <div>
                <pre className="whitespace-pre font-sans text-lg">
                  <span className="invisible"><span className="plain-equals">=</span>{' '}</span><Latex math="5x(2x + 3)" />{'\n'}
  <span className="plain-equals">=</span>{' '}<Latex math="5x(2x) + 5x(3)" />{'\n'}
  <span className="plain-equals">=</span>{' '}<Latex math="10x^2 + 15x" /> <span className="text-sm text-slate-500">(同類項才能加)</span>
                </pre>
              </div>
              <hr />
              <div>
                <pre className="whitespace-pre font-sans text-lg">
                  <span className="invisible"><span className="plain-equals">=</span>{' '}</span><Latex math="(x + 5)(6x^2)" />{'\n'}
  <span className="plain-equals">=</span>{' '}<Latex math="x(6x^2) + 5(6x^2)" />{'\n'}
  <span className="plain-equals">=</span>{' '}<Latex math="6x^3 + 30x^2" />
                </pre>
              </div>
            </div>
          </div>

           <div className="print-break-before bg-blue-50 rounded-lg p-4 border border-blue-200">
             <h3 className="font-bold text-blue-800 mb-2">📌 多項式 × 多項式 (拆括號)</h3>
            <p className="text-slate-700 mb-2 text-sm">認住位置乘：<Latex math="(①+②)(③+④) = ①×③ + ①×④ + ②×③ + ②×④" /></p>
            <div className="bg-white p-4 rounded border border-slate-200">
              <pre className="whitespace-pre font-sans text-lg">
                <span className="invisible"><span className="plain-equals">=</span>{' '}</span><Latex math="(4 − 5x)(5 + 6x)" />{'\n'}
<span className="plain-equals">=</span>{' '}<Latex math="4(5) + 4(6x) − 5x(5) − 5x(6x)" /> <span className="text-sm text-slate-500">(按順序乘)</span>{'\n'}
<span className="plain-equals">=</span>{' '}<Latex math="20 + " /><span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="24x − 25x" /></span><Latex math=" − 30x^2" /> <span className="bg-yellow-200 px-1 rounded text-sm text-red-500 font-bold">← 找同類項簡化</span>{'\n'}
<span className="plain-equals">=</span>{' '}<Latex math="20 " /><span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="− x" /></span><Latex math=" − 30x^2" />{'\n'}
<span className="plain-equals">=</span>{' '}<Latex math="−30x^2 − x + 20" />
              </pre>
            </div>
          </div>

        </div>
      </CollapsibleSection>
    </div>
  );
};


export const AreaVolumeNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-orange-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH5 面積與體積 (一)</h1>
        <p className="text-slate-600">平面圖形面積、多邊形分割法、柱體體積與表面面積</p>
      </div>

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
                  <line x1="80" y1="24" x2="80" y2="36" stroke="#0ea5e9" strokeWidth="2" />
                  <line x1="80" y1="124" x2="80" y2="136" stroke="#0ea5e9" strokeWidth="2" />
                  <line x1="24" y1="80" x2="36" y2="80" stroke="#0ea5e9" strokeWidth="2" />
                  <line x1="124" y1="80" x2="136" y2="80" stroke="#0ea5e9" strokeWidth="2" />
                  
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
                  <polyline points="130,42 118,42 118,30" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="30,118 42,118 42,130" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="130,118 118,118 118,130" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <text x="80" y="142" fontSize="13" fill="#475569" textAnchor="middle">5 cm</text>
                  <text x="132" y="85" fontSize="13" fill="#475569" textAnchor="start">5 cm</text>
                </svg>
                <div className="mt-2 text-center">
                  <div className="inline-grid grid-cols-[auto_auto] gap-x-1 text-left font-sans leading-5">
                    <span>正方形的面積</span>
                    <span>= 5 × 5 (cm²)</span>
                    <span></span>
                    <span>= <span className="underline">25 cm²</span></span>
                  </div>
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
                  
                  <line x1="100" y1="24" x2="100" y2="36" stroke="#0ea5e9" strokeWidth="2" />
                  <line x1="100" y1="84" x2="100" y2="96" stroke="#0ea5e9" strokeWidth="2" />
                  <line x1="14" y1="57" x2="26" y2="57" stroke="#0ea5e9" strokeWidth="2" />
                  <line x1="14" y1="63" x2="26" y2="63" stroke="#0ea5e9" strokeWidth="2" />
                  <line x1="174" y1="57" x2="186" y2="57" stroke="#0ea5e9" strokeWidth="2" />
                  <line x1="174" y1="63" x2="186" y2="63" stroke="#0ea5e9" strokeWidth="2" />

                  <text x="100" y="105" fontSize="13" fill="#475569" textAnchor="middle">長</text>
                  <text x="185" y="65" fontSize="13" fill="#475569" textAnchor="start">闊</text>
                </svg>
                <div className="mt-2 text-center text-purple-700 font-bold">長方形的面積 = 長 × 闊</div>
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center">
                <span className="text-sm text-slate-500 mb-2">例如：</span>
                <svg viewBox="0 0 200 135" className="w-40 h-24">
                  <rect x="50" y="20" width="60" height="90" fill="rgba(245,158,11,0.2)" stroke="#334155" strokeWidth="2" />
                  <polyline points="50,32 62,32 62,20" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="110,32 98,32 98,20" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="50,98 62,98 62,110" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polyline points="110,98 98,98 98,110" fill="none" stroke="#334155" strokeWidth="1.5" />
                  
                  <text x="80" y="121" fontSize="13" fill="#475569" textAnchor="middle">6 cm</text>
                  <text x="45" y="70" fontSize="13" fill="#475569" textAnchor="end">9 cm</text>
                </svg>
                <div className="mt-2 text-center">
                  <div className="inline-grid grid-cols-[auto_auto] gap-x-1 text-left font-sans leading-5">
                    <span>長方形的面積</span>
                    <span>= 9 × 6 (cm²)</span>
                    <span></span>
                    <span>= <span className="underline">54 cm²</span></span>
                  </div>
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

                  {/* Left and right parallel marks (single arrows, pointing up) */}
                  <g transform="translate(40,50) rotate(-56.3)">
                    <polyline points="-5,-4 0,0 -5,4" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                  </g>
                  <g transform="translate(180,50) rotate(-56.3)">
                    <polyline points="-5,-4 0,0 -5,4" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                  </g>

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
                  <line x1="150" y1="80" x2="200" y2="80" stroke="#334155" strokeWidth="1" />
                  <polyline points="188,80 188,68 200,68" fill="none" stroke="#334155" strokeWidth="1.5" />

                  {/* Dimension lines */}
                  <line x1="40" y1="95" x2="150" y2="95" stroke="#475569" strokeWidth="1" />
                  <line x1="40" y1="90" x2="40" y2="100" stroke="#475569" strokeWidth="1" />
                  <line x1="150" y1="90" x2="150" y2="100" stroke="#475569" strokeWidth="1" />

                  <text x="95" y="110" fontSize="13" fill="#475569" textAnchor="middle">30 cm</text>
                  <text x="206" y="55" fontSize="13" fill="#db2777" textAnchor="start">8 cm</text>
                </svg>
                <div className="mt-2 text-center">
                  <div className="inline-grid grid-cols-[auto_auto] gap-x-1 text-left font-sans leading-5">
                    <span>平行四邊形的面積</span>
                    <span>= 30 × 8 (cm²)</span>
                    <span></span>
                    <span>= <span className="underline">240 cm²</span></span>
                  </div>
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
                  <div className="inline-grid grid-cols-[auto_auto] gap-x-1 text-left font-sans leading-5">
                    <span>三角形的面積</span>
                    <span>= <Latex math="\frac{1}{2}" /> × 12 × 7 (m²)</span>
                    <span></span>
                    <span>= <span className="underline">42 m²</span></span>
                  </div>
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
                  
                  {/* Top and bottom parallel marks (single arrows) */}
                  <polyline points="95,16 100,20 95,24" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                  <polyline points="95,76 100,80 95,84" fill="none" stroke="#0ea5e9" strokeWidth="2" />

                  {/* Dimension lines */}
                  <line x1="40" y1="95" x2="160" y2="95" stroke="#475569" strokeWidth="1" />
                  <line x1="40" y1="90" x2="40" y2="100" stroke="#475569" strokeWidth="1" />
                  <line x1="160" y1="90" x2="160" y2="100" stroke="#475569" strokeWidth="1" />
                  
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
                <div className="mt-2 text-center">
                  <div className="inline-grid grid-cols-[auto_auto] gap-x-1 text-left font-sans leading-5">
                    <span>梯形面積</span>
                    <span>= <Latex math="\frac{1}{2}" />(5 + 8) × 4 (mm²)</span>
                    <span></span>
                    <span>= <span className="underline">26 mm²</span></span>
                  </div>
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
                  
                  <text x="325" y="75" fontSize="24" fill="#334155" textAnchor="middle">−</text>

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
            <div className="print-prism-diagram md:w-1/3">
              {/* 三角柱體標記圖 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-center h-full">
                <svg viewBox="0 0 200 240" className="w-full max-w-[220px] h-auto font-sans mx-auto">
                  <line x1="60" y1="160" x2="160" y2="160" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  <polygon points="60,40 60,160 124,208 124,88" fill="rgba(251,146,60,0.2)" stroke="none" />
                  <polygon points="160,40 160,160 124,208 124,88" fill="rgba(251,146,60,0.3)" stroke="none" />
                  <polygon points="60,40 160,40 124,88" fill="rgba(253,230,138,0.5)" stroke="none" />
                  <polygon points="60,40 60,160 124,208 124,88" fill="none" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <polygon points="160,40 160,160 124,208 124,88" fill="none" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <polygon points="60,40 160,40 124,88" fill="none" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <polyline points="114,81 122,71 131,78" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="110" y="30" fontSize="14" fill="#475569" textAnchor="middle">20 cm</text>
                  <text x="52" y="105" fontSize="14" fill="#475569" textAnchor="end">24 cm</text>
                  <text x="85" y="198" fontSize="14" fill="#475569" textAnchor="end">16 cm</text>
                  <text x="150" y="195" fontSize="14" fill="#475569" textAnchor="start">12 cm</text>
                  <text x="110" y="62" fontSize="16" fill="#15803d" fontWeight="bold" textAnchor="middle">底</text>
                  <text x="85" y="135" fontSize="16" fill="#7e22ce" fontWeight="bold" textAnchor="middle">側</text>
                  <text x="145" y="130" fontSize="16" fill="#7e22ce" fontWeight="bold" textAnchor="middle">側</text>
                </svg>
              </div>
            </div>
            
            <div className="md:w-2/3 space-y-4 text-base sm:text-lg">
              
              <div className="bg-white rounded-lg p-4 border border-slate-200 relative overflow-x-auto">
                <span className="absolute top-2 right-2 text-red-600 font-bold text-sm">留意單位</span>
                <p className="mb-2">1. 求柱體體積</p>
                <div className="pl-2 sm:pl-4 grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-2 items-start whitespace-nowrap">
                  <div className="text-right"><span className="bg-yellow-200 px-1 rounded">體積</span></div>
                  <div><Latex math="=" /></div>
                  <div className="whitespace-normal break-words"><span className="bg-green-200 px-1 rounded">底面積</span> <Latex math="\times" /> <span className="bg-blue-200 px-1 rounded">高</span></div>
                  
                  <div className="text-right"><span className="bg-yellow-200 px-1 rounded text-transparent select-none"><span className="text-slate-800">體積</span></span></div>
                  <div><Latex math="=" /></div>
                  <div className="whitespace-normal break-words"><span className="bg-green-200 px-1 rounded"><Latex math="16 \times 12 \div 2" /></span> <Latex math="\times" /> <span className="bg-blue-200 px-1 rounded"><Latex math="24" /></span></div>
                  <div></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="2304\text{ cm}^3" /></div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200 overflow-x-auto">
                <p className="mb-2">2. 求柱體側面面積</p>
                <div className="pl-2 sm:pl-4 grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-2 items-start whitespace-nowrap">
                  <div className="text-right"><span className="bg-yellow-200 px-1 rounded">側面面積</span></div>
                  <div><Latex math="=" /></div>
                  <div className="whitespace-normal break-words"><span className="bg-purple-200 px-1 rounded">底周界</span> <Latex math="\times" /> <span className="bg-blue-200 px-1 rounded">高</span></div>
                  
                  <div className="text-right"><span className="bg-yellow-200 px-1 rounded text-transparent select-none"><span className="text-slate-800">側面面積</span></span></div>
                  <div><Latex math="=" /></div>
                  <div className="whitespace-normal break-words"><span className="bg-purple-200 px-1 rounded"><Latex math="(12 + 16 + 20)" /></span> <Latex math="\times" /> <span className="bg-blue-200 px-1 rounded"><Latex math="24" /></span></div>
                  <div></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="1152\text{ cm}^2" /></div>
                </div>
              </div>

              <div className="print-break-before bg-white rounded-lg p-4 border border-slate-200 overflow-x-auto">
                <p className="mb-2 w-full">3. 求柱體總表面面積</p>
                <div className="pl-2 sm:pl-4 grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-2 items-start whitespace-nowrap">
                  <div className="text-right"><span className="bg-yellow-200 px-1 rounded">總表面面積</span></div>
                  <div><Latex math="=" /></div>
                  <div className="whitespace-normal break-words"><span className="bg-purple-200 px-1 rounded">底周界</span> <Latex math="\times" /> <span className="bg-blue-200 px-1 rounded">高</span> <Latex math="+ 2 \times" /> <span className="bg-green-200 px-1 rounded">底面積</span></div>
                  
                  <div className="text-right"><span className="bg-yellow-200 px-1 rounded text-transparent select-none"><span className="text-slate-800">總表面面積</span></span></div>
                  <div><Latex math="=" /></div>
                  <div className="whitespace-normal break-words"><span className="bg-purple-200 px-1 rounded"><Latex math="(12 + 16 + 20)" /></span> <Latex math="\times" /> <span className="bg-blue-200 px-1 rounded"><Latex math="24" /></span> <Latex math="+ 2 \times" /> <span className="bg-green-200 px-1 rounded"><Latex math="(16 \times 12 \div 2)" /></span></div>
                  <div></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="1344\text{ cm}^2" /></div>
                </div>
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

          <div className="print-keep-layout grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <polyline points="70,20 170,20 170,80" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <line x1="70" y1="80" x2="170" y2="80" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="70" y1="80" x2="70" y2="20" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" />
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
            <span>將貼著 x 的數字按下列規矩移走</span>
          </div>
        </div>
      </div>

      {/* 1. 移項變相反 */}
      <CollapsibleSection id="move-terms" title="1. 移項變相反" num={1} color="green" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-5 border border-green-200 inline-block w-full md:w-auto">
            <h3 className="font-bold text-green-800 mb-3 text-lg">📝 規矩：</h3>
            <ul className="text-slate-700 font-bold text-lg space-y-2 list-disc ml-6">
              <li><Latex math="+" /> / <Latex math="−" /> 為相反</li>
              <li><Latex math="\times" /> / <Latex math="\div" /> 為相反</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <p className="text-slate-600 font-bold mb-4">例子 1：左移右，<Latex math="+3" /> 的相反數為 <Latex math="−3" /></p>
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-2 items-center text-xl leading-relaxed">
                <div className="flex justify-end items-center"><Latex math="x " /><span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="+ 3" /></span></div>
                <div><Latex math="=" /></div>
                <div><Latex math="5" /></div>

                <div className="flex justify-end"><Latex math="x" /></div>
                <div><Latex math="=" /></div>
                <div><Latex math="5 " /><span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="− 3" /></span></div>

                <div className="flex justify-end"><Latex math="x" /></div>
                <div><Latex math="=" /></div>
                <div><Latex math="2" /></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <p className="text-slate-600 font-bold mb-4">例子 2：左右調動，<Latex math="\times 3" /> 的相反為 <Latex math="\div 3" /></p>
              <div className="grid grid-cols-[80px_auto_minmax(0,1fr)] gap-x-2 items-center text-xl leading-relaxed">
                <div className="flex justify-end items-center"><span className="bg-yellow-200 py-1 px-[2px] rounded inline-block"><Latex math="3" /></span><Latex math="y" /></div>
                <div><Latex math="=" /></div>
                <div><Latex math="63" /></div>

                <div className="flex justify-end"><Latex math="y" /></div>
                <div><Latex math="=" /></div>
                <div className="flex flex-nowrap items-center gap-x-4 whitespace-nowrap"><span className="inline-flex flex-col items-center justify-center align-middle" style={{ lineHeight: '1.2' }}><span className="px-1"><Latex math="63" /></span><span className="border-t border-slate-700 bg-yellow-200 px-1 rounded-b"><Latex math="3" /></span></span><span className="text-base text-green-700 font-bold">← <Latex math="\frac{63}{3}" /> 與 <Latex math="63 \div 3" /> 相同</span></div>

                <div className="flex justify-end"><Latex math="y" /></div>
                <div><Latex math="=" /></div>
                <div><Latex math="21" /></div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 解代數時，看大畫面 */}
      <CollapsibleSection id="big-picture" title="2. 解代數時，看大畫面" num={2} color="red" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-xl p-5 border border-slate-200 md:col-span-2">
              <div className="grid grid-cols-[auto_auto_minmax(0,auto)_minmax(0,1fr)] gap-x-0 items-center text-xl leading-relaxed">
                <div className="flex justify-end"><Latex math="19" /></div>
                <div><Latex math="=" /></div>
                <div><span className="border-2 border-purple-500 rounded-full px-3 py-1 bg-purple-50 inline-block"><span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="4" /></span> <Latex math="+ 3x" /></span></div>
                <div className="text-base text-purple-600 font-medium leading-relaxed whitespace-nowrap">← 大畫面為「+」數，先移「+」變「-」</div>

                <div className="flex justify-end items-center"><Latex math="19 " /><span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="− 4" /></span></div>
                <div><Latex math="=" /></div>
                <div><Latex math="3x" /></div>
                <div></div>

                <div className="flex justify-end"><Latex math="15" /></div>
                <div><Latex math="=" /></div>
                <div><span className="bg-green-200 px-1 rounded inline-block"><Latex math="3" /></span><Latex math="x" /></div>
                <div className="text-base text-purple-600 font-medium leading-relaxed whitespace-nowrap">← 大畫面為「×」數，可移另一方至「÷」</div>

                <div className="flex justify-end"><span className="inline-flex flex-col items-center justify-center align-middle" style={{ lineHeight: '1.2' }}><span className="px-1"><Latex math="15" /></span><span className="border-t border-slate-700 bg-green-200 px-1 rounded-b"><Latex math="3" /></span></span></div>
                <div><Latex math="=" /></div>
                <div><Latex math="x" /></div>
                <div></div>

                <div className="flex justify-end"><Latex math="x" /></div>
                <div><Latex math="=" /></div>
                <div><Latex math="5" /></div>
                <div></div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-100 text-green-700 px-3 py-1 rounded-bl-lg font-bold text-sm">分數即「÷」數</div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-2 items-center text-xl leading-relaxed mt-2">
                  <div className="flex justify-end"><span className="inline-flex flex-col items-center justify-center align-middle" style={{ lineHeight: '1.2' }}><span className="px-1"><Latex math="a + 11" /></span><span className="border-t border-slate-700 bg-green-200 px-1 rounded-b"><Latex math="6" /></span></span></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="4" /></div>

                  <div className="flex justify-end items-center"><Latex math="a + 11" /></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="4 " /><span className="bg-green-200 px-1 rounded inline-block"><Latex math="\times 6" /></span></div>

                  <div className="flex justify-end items-center"><Latex math="a " /><span className="bg-yellow-200 px-[2px] rounded inline-block"><Latex math="+ 11" /></span></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="24" /></div>

                  <div className="flex justify-end"><Latex math="a" /></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="24 " /><span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="− 11" /></span></div>

                  <div className="flex justify-end"><Latex math="a" /></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="13" /></div>
                </div>
              </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-100 text-green-700 px-3 py-1 rounded-bl-lg font-bold text-sm">括號即「×」數</div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-2 items-center text-xl leading-relaxed mt-2">
                  <div className="flex justify-end items-center"><span className="bg-green-200 px-1 rounded inline-block"><Latex math="2" /></span><Latex math="(b − 5)" /></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="20" /></div>

                  <div className="flex justify-end items-center"><Latex math="b − 5" /></div>
                  <div><Latex math="=" /></div>
                  <div><span className="inline-flex flex-col items-center justify-center align-middle" style={{ lineHeight: '1.2' }}><span className="px-1"><Latex math="20" /></span><span className="border-t border-slate-700 bg-green-200 px-1 rounded-b"><Latex math="2" /></span></span></div>

                  <div className="flex justify-end items-center"><Latex math="b " /><span className="bg-yellow-200 px-[2px] rounded inline-block"><Latex math="− 5" /></span></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="10" /></div>

                  <div className="flex justify-end"><Latex math="b" /></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="10 " /><span className="bg-yellow-200 px-1 rounded inline-block"><Latex math="+ 5" /></span></div>

                  <div className="flex justify-end"><Latex math="b" /></div>
                  <div><Latex math="=" /></div>
                  <div><Latex math="15" /></div>
                </div>
            </div>

          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 分數加減數 */}
      <CollapsibleSection id="fraction-addition" title="3. 分數加減數" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 md:px-12 border border-slate-200 max-w-2xl mx-auto shadow-sm">
            <h4 className="font-bold text-green-700 mb-6 text-xl">大畫面「−」數</h4>
            
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-3 items-center text-2xl leading-loose tracking-wide">
              <div className="flex justify-end items-center"><Latex math="\frac{2x}{3} " /><span className="bg-yellow-200 px-2 rounded inline-block"><Latex math="− 4" /></span></div>
              <div><Latex math="=" /></div>
              <div><Latex math="8" /></div>

              <div className="flex justify-end"><Latex math="\frac{2x}{3}" /></div>
              <div><Latex math="=" /></div>
              <div><Latex math="8 " /><span className="bg-yellow-200 px-2 rounded inline-block"><Latex math="+ 4" /></span></div>

              <div className="flex justify-end items-center gap-4"><span className="text-xl text-green-700 font-bold inline-block align-middle">除數</span><Latex math="\frac{2x}{\colorbox{#bbf7d0}{3}}" /></div>
              <div><Latex math="=" /></div>
              <div><Latex math="12" /></div>

              <div className="flex justify-end items-center"><Latex math="2x" /></div>
              <div><Latex math="=" /></div>
              <div><Latex math="12 " /><span className="bg-green-200 px-2 rounded inline-block"><Latex math="\times 3" /></span></div>

              <div className="flex justify-end items-center"><span className="bg-cyan-200 px-1 rounded inline-block"><Latex math="2" /></span><Latex math="x" /></div>
              <div><Latex math="=" /></div>
              <div><Latex math="36" /></div>

              <div className="flex justify-end"><Latex math="x" /></div>
              <div><Latex math="=" /></div>
              <div><span className="inline-flex flex-col items-center justify-center align-middle" style={{ lineHeight: '1.2' }}><span className="px-1"><Latex math="36" /></span><span className="border-t border-slate-700 bg-cyan-200 px-1 rounded-b"><Latex math="2" /></span></span></div>

              <div className="flex justify-end"><Latex math="x" /></div>
              <div><Latex math="=" /></div>
              <div><Latex math="18" /></div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 w-full shadow-sm text-center">
            <p className="text-amber-800 font-bold text-lg md:text-xl">💡 額外資訊：「根」即是答案</p>
          </div>
        </div>
      </CollapsibleSection>

    </>
  );
};

export const AdvancedLinearEquationNotes = ({ activeSub }) => {
  const s1 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH7 進階一元一次方程</h1>
        <p className="text-slate-600">分數方程與拆括號同類項方程</p>
      </div>

      <CollapsibleSection id="advanced-equations" title="1. 進階解方程" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-6 text-lg">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm overflow-x-auto">
            <h3 className="font-bold text-blue-800 mb-4 text-xl border-b pb-2">1. 解分數方程</h3>

            <div className="mb-8 min-w-[650px]">
              <p className="font-bold text-slate-700 mb-4">例子 1：</p>
              <div className="grid grid-cols-[auto_40px_auto_1fr] gap-x-2 md:gap-x-4 gap-y-4 items-center pl-4 pr-4">
                <div className="text-right flex justify-end items-center">
                  <Latex math="\frac{x}{4} − \frac{x}{5}" />
                </div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="10" /></div>
                <div className="text-sm text-slate-500 font-bold tracking-widest text-blue-600 pl-4 w-full">例：<Latex math="4\times 5=20" /></div>

                <div className="text-right flex justify-end items-center">
                  <span className="border-b-[3px] border-green-700 font-bold text-green-700 mr-2 text-xl pb-1">20</span><Latex math="\left(\frac{x}{4} − \frac{x}{5}\right)" />
                </div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left whitespace-nowrap">
                  <Latex math="10 \times " /><span className="border-b-[3px] border-green-700 font-bold text-green-700 ml-1 text-xl pb-1">20</span>
                </div>
                <div className="text-sm text-slate-700 flex items-center pl-4 w-full">
                  <span className="text-red-500 font-bold mr-3 text-xl">←</span>
                  <span className="border-2 border-slate-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 shrink-0">1</span>
                  <span className="text-red-600 border border-green-700 px-2 py-0.5 font-bold whitespace-nowrap bg-white rounded">將分母相乘的數字</span>
                  <span className="text-red-600 font-bold ml-2 whitespace-nowrap border-b-2 border-red-600">乘兩邊</span>
                </div>

                <div className="text-right relative">
                  <Latex math="5x − 4x" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-red-500 font-bold whitespace-nowrap flex items-center gap-6">
                    <span className="relative"><span className="absolute -top-3 right-full text-xl translate-x-2">↗</span><span className="ml-[6px]"><Latex math="20\div 4=5" /></span></span>
                    <span className="relative"><span className="absolute -top-3 left-0 text-xl -translate-x-1">↖</span><span className="mr-[6px]"><Latex math="20\div 5=4" /></span></span>
                  </div>
                </div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="200" /></div>
                <div className="text-sm text-slate-700 flex items-center pl-4 w-full">
                  <span className="text-red-500 font-bold mr-3 text-xl">←</span>
                  <span className="border-2 border-slate-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 shrink-0">2</span>
                  <span className="text-red-600 font-bold text-base">拆括號，有分數 →</span>
                </div>

                <div className="text-right pt-8"><Latex math="x" /></div>
                <div className="text-center pt-8"><Latex math="=" /></div>
                <div className="text-left pt-8"><Latex math="200" /></div>
                <div className="text-sm text-slate-700 flex items-center pt-8 pl-4 w-full">
                  <span className="text-red-500 font-bold mr-3 text-xl">←</span>
                  <span className="border-2 border-slate-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 shrink-0">3</span>
                  <span className="text-red-600 font-bold text-base whitespace-nowrap">簡化 <Latex math="x" /> （答案: <Latex math="x = ?" />）</span>
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-200" />

            <div className="min-w-[700px]">
              <p className="font-bold text-slate-700 mb-4">例子 2：</p>
              <div className="grid grid-cols-[auto_40px_auto_1fr] gap-x-2 md:gap-x-4 gap-y-6 items-center pl-4 pr-4">
                <div className="text-right"><Latex math="\frac{4x}{3} − \frac{x}{2}" /></div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="5" /></div>
                <div className="text-sm text-green-700 font-bold text-base pl-4 tracking-wide">題目目標：弄走分數</div>

                <div className="text-right flex items-center justify-end">
                  <span className="bg-purple-200 px-2 py-0.5 rounded font-bold mr-2 tracking-widest text-[#5b21b6]">2×3</span><Latex math="\times \left(\frac{4x}{\colorbox{#eab308}{3}} − \frac{x}{\colorbox{#eab308}{2}}\right)" />
                </div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left whitespace-nowrap">
                  <Latex math="5 \times " /><span className="bg-purple-200 px-2 py-0.5 rounded font-bold ml-1 tracking-widest text-[#5b21b6]">2 × 3</span>
                </div>
                <div className="text-sm text-[#5b21b6] font-bold relative pl-4 w-full text-base">
                  <div>觀察有什麼分母，相乘</div>
                  <div className="text-red-500 font-bold flex items-center absolute -left-4 top-[80%] mt-1">
                    <span className="mr-1 rotate-[140deg] text-2xl">↖</span>兩邊都要乘！
                  </div>
                </div>

                <div className="text-right pt-6 pb-2"><Latex math="6\left(\frac{4x}{3} − \frac{x}{2}\right)" /></div>
                <div className="text-center pt-6 pb-2"><Latex math="=" /></div>
                <div className="text-left pt-6 pb-2"><Latex math="30" /></div>
                <div className="text-sm pt-6 pb-2"></div>

                <div className="text-right flex items-center justify-end">
                  <div className="flex items-center">
                    <div className="relative inline-flex items-center">
                      <span className="absolute -top-3 -left-3 text-red-500 text-xs font-bold">2</span>
                      <div className="absolute top-1/2 left-[-10%] w-[120%] h-[2px] bg-red-500 -rotate-[30deg]"></div>
                      <span className="text-2xl font-serif">6</span>
                    </div>
                    <span className="mx-1.5"><Latex math="\Big(" /></span>
                    <div className="relative inline-flex items-center flex-col mx-1 -top-1">
                      <Latex math="\frac{4x}{3}" />
                      <div className="absolute bottom-[20%] left-[-10%] w-[120%] h-[2px] bg-red-500 -rotate-[20deg]"></div>
                      <span className="absolute -bottom-3 -right-3 text-red-500 text-xs font-bold">1</span>
                    </div>
                    <span className="mx-1.5"><Latex math="\Big)" /></span>
                    <span className="mx-3 text-xl">−</span>
                    <div className="relative inline-flex items-center">
                      <span className="absolute -top-3 -left-3 text-red-500 text-xs font-bold">3</span>
                      <div className="absolute top-1/2 left-[-10%] w-[120%] h-[2px] bg-red-500 -rotate-[30deg]"></div>
                      <span className="text-2xl font-serif">6</span>
                    </div>
                    <span className="mx-1.5"><Latex math="\Big(" /></span>
                    <div className="relative inline-flex items-center flex-col mx-1 -top-1">
                      <Latex math="\frac{x}{2}" />
                      <div className="absolute bottom-[20%] left-[-10%] w-[120%] h-[2px] bg-red-500 -rotate-[20deg]"></div>
                      <span className="absolute -bottom-3 -right-3 text-red-500 text-xs font-bold">1</span>
                    </div>
                    <span className="mx-1.5"><Latex math="\Big)" /></span>
                  </div>
                </div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="30" /></div>
                <div className="text-sm"></div>

                <div className="text-right pt-2"><Latex math="2(4x) − 3x" /></div>
                <div className="text-center pt-2"><Latex math="=" /></div>
                <div className="text-left pt-2"><Latex math="30" /></div>
                <div className="text-sm"></div>

                <div className="text-right"><Latex math="8x − 3x" /></div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="30" /></div>
                <div className="text-sm"></div>

                <div className="text-right"><Latex math="5x" /></div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="30" /></div>
                <div className="text-sm"></div>

                <div className="text-right"><Latex math="x" /></div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="6" /></div>
                <div className="text-sm"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm overflow-x-auto">
            <h3 className="font-bold text-blue-800 mb-4 text-xl border-b pb-2">2. 解括號 (同類項) 方程</h3>

            <div className="min-w-[650px]">
              <div className="grid grid-cols-[auto_40px_auto_1fr] gap-x-2 md:gap-x-4 gap-y-5 items-center pl-4 pr-4">
                <div className="text-right"><Latex math="2(x−3) + 3x" /></div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="14" /></div>
                <div className="text-sm"></div>

                <div className="text-right"><Latex math="2x − 6 + 3x" /></div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="14" /></div>
                <div className="text-sm text-slate-700 flex items-center pl-4">
                  <span className="text-green-600 font-bold mr-3 text-xl">←</span>
                  <span className="text-green-700 font-bold whitespace-nowrap text-base">先拆括號</span>
                  <div className="text-[#5b21b6] ml-3 font-bold px-1 relative text-base flex items-center whitespace-nowrap">
                    <span className="absolute -top-3 left-[16px] text-lg rotate-12">↷</span>
                    <span className="absolute -top-4 left-4 text-lg">↷</span>
                    <Latex math="2(x−3) = 2(x)−2(3) = 2x−6" />
                  </div>
                </div>

                <div className="text-right"><Latex math="2x + 3x" /></div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="14 + 6" /></div>
                <div className="text-sm text-slate-700 flex items-center pl-4">
                  <span className="text-green-600 font-bold mr-3 text-xl">←</span>
                  <span className="text-green-700 font-bold whitespace-nowrap text-base">後分類（有 <Latex math="x" /> / 沒 <Latex math="x" />）</span>
                </div>

                <div className="text-right"><Latex math="5x" /></div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="20" /></div>
                <div className="text-sm"></div>

                <div className="text-right"><Latex math="x" /></div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="\frac{20}{5}" /></div>
                <div className="text-sm"></div>

                <div className="text-right"><Latex math="x" /></div>
                <div className="text-center"><Latex math="=" /></div>
                <div className="text-left"><Latex math="4" /></div>
                <div className="text-sm"></div>
              </div>
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-center text-slate-700 font-bold mb-2">某選舉中五名候選人的所得票數</p>
            <svg viewBox="0 0 520 270" className="w-full h-auto max-w-lg mx-auto font-sans">
              <defs>
                <marker id="arrow-y" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                  <path d="M 1 1 L 5 3 L 1 5 Z" fill="#16a34a" />
                </marker>
                <marker id="arrow-x" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                  <path d="M 1 1 L 5 3 L 1 5 Z" fill="#16a34a" />
                </marker>
              </defs>

              {/* Grid: one cell per vote, with a stronger line every five cells */}
              <g>
                {Array.from({ length: 81 }, (_, cell) => {
                  const x = 50 + cell * 5;
                  const isMajor = cell % 5 === 0;
                  return <line key={`vertical-${cell}`} x1={x} y1="20" x2={x} y2="220" stroke={isMajor ? "#93c5fd" : "#dbeafe"} strokeWidth={isMajor ? "1.4" : "0.6"} />;
                })}
                {Array.from({ length: 46 }, (_, value) => {
                  const y = 220 - value * (200 / 45);
                  const isMajor = value % 5 === 0;
                  return <line key={`horizontal-${value}`} x1="50" y1={y} x2="450" y2={y} stroke={isMajor ? "#93c5fd" : "#dbeafe"} strokeWidth={isMajor ? "1.4" : "0.6"} />;
                })}
              </g>
              
              {/* Axes */}
              <line x1="50" y1="220" x2="450" y2="220" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-x)" />
              <line x1="50" y1="220" x2="50" y2="20" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-y)" />
              <g stroke="#16a34a" strokeWidth="2">
                {[0, 10, 20, 30, 40].map((value) => {
                  const y = 220 - value * (200 / 45);
                  return <line key={`tick-${value}`} x1="45" y1={y} x2="50" y2={y} />;
                })}
              </g>
              
              {/* Box plot areas */}
              <g fill="rgba(244,114,182,0.18)" stroke="#111827" strokeWidth="2">
                <rect x="75" y={220 - 14 * (200 / 45)} width="50" height={14 * (200 / 45)} />
                <rect x="150" y={220 - 28 * (200 / 45)} width="50" height={28 * (200 / 45)} />
                <rect x="225" y={220 - 40 * (200 / 45)} width="50" height={40 * (200 / 45)} />
                <rect x="300" y={220 - 31 * (200 / 45)} width="50" height={31 * (200 / 45)} />
                <rect x="375" y={220 - 14 * (200 / 45)} width="50" height={14 * (200 / 45)} />
              </g>

              {/* Box Heights Text */}
              <g fill="#1d4ed8" fontSize="12" fontWeight="bold" textAnchor="middle">
                <text x="100" y={220 - 14 * (200 / 45) - 5}>14</text>
                <text x="175" y={220 - 28 * (200 / 45) - 5}>28</text>
                <text x="250" y={220 - 40 * (200 / 45) - 5}>40</text>
                <text x="325" y={220 - 31 * (200 / 45) - 5}>31</text>
                <text x="400" y={220 - 14 * (200 / 45) - 5}>14</text>
              </g>

              {/* Labels (X-axis) */}
              <g fill="#16a34a" fontSize="12" textAnchor="middle">
                <text x="100" y="235">A</text>
                <text x="175" y="235">B</text>
                <text x="250" y="235">C</text>
                <text x="325" y="235">D</text>
                <text x="400" y="235">E</text>
                <text x="250" y="262" fontSize="11">候選人</text>
              </g>
              
              {/* Labels (Y-axis) */}
              <g fill="#16a34a" fontSize="11" textAnchor="end" dominantBaseline="middle">
                <text x="42" y="220">0</text>
                <text x="42" y={220 - 10 * (200 / 45)}>10</text>
                <text x="42" y={220 - 20 * (200 / 45)}>20</text>
                <text x="42" y={220 - 30 * (200 / 45)}>30</text>
                <text x="42" y={220 - 40 * (200 / 45)}>40</text>
                <text x="42" y="15">票數</text>
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
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="space-y-4 bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-slate-700 font-bold text-lg mb-2 text-center text-blue-800">某屋邨居民的年紀分佈</p>
            <svg viewBox="0 0 400 300" className="w-full h-auto max-w-md mx-auto font-sans">
              <g transform="translate(200, 150)">
                {/* 120 deg: -90 to 30 */}
                <path d="M 0 0 L 0 -110 A 110 110 0 0 1 95.26 55 Z" fill="rgba(234,179,8,0.3)" stroke="#eab308" strokeWidth="2" strokeLinejoin="round" />
                {/* 69 deg: 30 to 99 */}
                <path d="M 0 0 L 95.26 55 A 110 110 0 0 1 -17.21 108.64 Z" fill="rgba(236,72,153,0.3)" stroke="#ec4899" strokeWidth="2" strokeLinejoin="round" />
                {/* 96 deg: 99 to 195 (x°) */}
                <path d="M 0 0 L -17.21 108.64 A 110 110 0 0 1 -106.25 -28.47 Z" fill="rgba(249,115,22,0.3)" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />
                {/* 45 deg: 195 to 240 */}
                <path d="M 0 0 L -106.25 -28.47 A 110 110 0 0 1 -55 -95.26 Z" fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="2" strokeLinejoin="round" />
                {/* 30 deg: 240 to 270 */}
                <path d="M 0 0 L -55 -95.26 A 110 110 0 0 1 0 -110 Z" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />

                {/* Central Arcs (Radii with slight differences) */}
                <path d="M 0 -25 A 25 25 0 0 1 21.65 12.5" fill="none" stroke="#eab308" strokeWidth="2" /> {/* 120° */}
                <path d="M 30.31 17.5 A 35 35 0 0 1 -5.47 34.57" fill="none" stroke="#ec4899" strokeWidth="2" /> {/* 69° */}
                <path d="M -3.91 24.69 A 25 25 0 0 1 -24.15 -6.47" fill="none" stroke="#f97316" strokeWidth="2" /> {/* x° */}
                <path d="M -28.98 -7.76 A 30 30 0 0 1 -15 -25.98" fill="none" stroke="#22c55e" strokeWidth="2" /> {/* 45° */}
                <path d="M -20 -34.64 A 40 40 0 0 1 0 -40" fill="none" stroke="#3b82f6" strokeWidth="2" /> {/* 30° */}

                {/* Angle Labels (Centered within each sector outside arcs) */}
                <g fontSize="14" textAnchor="middle" dominantBaseline="central" fontWeight="bold">
                  <text x="39" y="-23" fill="#a16207">120°</text>
                  <text x="22" y="45" fill="#be185d">69°</text>
                  <text x="-34" y="22" fill="#c2410c"><tspan fontStyle="italic">x</tspan>°</text>
                  <text x="-36" y="-27" fill="#15803d">45°</text>
                  <text x="-14" y="-53" fill="#1d4ed8">30°</text>
                </g>

                {/* Slice Category Labels */}
                <g fontSize="15" textAnchor="middle" dominantBaseline="central" fill="#334155">
                  <text x="65" y="-38">60歲或以上</text>
                  <text x="37" y="77">45 - 59歲</text>
                  <text x="-63" y="41">30 - 44歲</text>
                  <text x="-64" y="-49">15 - 29歲</text>
                  <text x="-22" y="-82">0 - 14歲</text>
                </g>
              </g>
            </svg>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3 text-lg">💡 能得知以下資訊：</h3>
              <ul className="text-slate-700 font-bold text-base space-y-4 list-disc ml-6">
                  <li>
                    圓形圖角度總和是 <span className="text-red-600">360°</span>，因此能找 x 的角度
                    <div className="text-slate-600 font-normal mt-2 ml-2"><Latex math={'\\begin{aligned} x &= 360^\\circ − 120^\\circ − 30^\\circ − 45^\\circ − 69^\\circ \\\\ &= 96^\\circ \\end{aligned}'} block left /></div>
                  </li>
                  <li>
                    若知總人數，能推出每格人數
                    <div className="text-red-600 font-bold mt-2 bg-red-50 p-2 rounded inline-block">每格人數 <Latex math="= \text{總人數} \times \frac{\text{該格角度}}{360^\circ}" /></div>
                  </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-5 border border-slate-200">
                <p className="text-slate-800 font-bold mb-3">已知屋邨居民總人數為 <span className="text-blue-700">1200</span></p>
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
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <h4 className="text-slate-700 font-bold mb-2">A城由2020年至2026年的失業率</h4>
            <svg viewBox="0 0 400 270" className="w-full h-auto max-w-md mx-auto font-sans">
              <defs>
                <marker id="arrow-y2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                  <path d="M 1 1 L 5 3 L 1 5 Z" fill="#10b981" />
                </marker>
                <marker id="arrow-x2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                  <path d="M 1 1 L 5 3 L 1 5 Z" fill="#10b981" />
                </marker>
                <pattern id="line-graph-grid" width="4.75" height="4.75" patternUnits="userSpaceOnUse">
                  <path d="M 4.75 0 L 0 0 0 4.75" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
                <pattern id="line-graph-grid-major" width="47.5" height="47.5" patternUnits="userSpaceOnUse">
                  <rect width="47.5" height="47.5" fill="url(#line-graph-grid)" />
                  <path d="M 47.5 0 L 0 0 0 47.5" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </pattern>
              </defs>
              
              {/* 小方格網格 */}
              <rect x="50" y="30" width="330" height="190" fill="url(#line-graph-grid-major)" />

              {/* Axes */}
              <line x1="50" y1="220" x2="380" y2="220" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-x2)" />
              <line x1="50" y1="220" x2="50" y2="20" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-y2)" />
              {[90, 137.5, 185, 232.5, 280, 327.5, 375].map((x, i) => (
                <line key={`xt-${i}`} x1={x} y1="220" x2={x} y2="226" stroke="#10b981" strokeWidth="2" />
              ))}
              {[220, 172.5, 125, 77.5, 30].map((y, i) => (
                <line key={`yt-${i}`} x1="44" y1={y} x2="50" y2={y} stroke="#10b981" strokeWidth="2" />
              ))}

              {/* Data points and Line */}
              <polyline 
                points="90,115.5 137.5,125 185,148.75 232.5,129.75 280,101.25 327.5,96.5 375,77.5"
                fill="none" stroke="#000" strokeWidth="2" strokeLinejoin="round"
              />
              <g stroke="#3b82f6" strokeWidth="2">
                <path d="M 86 111.5 L 94 119.5 M 94 111.5 L 86 119.5" />
                <path d="M 133.5 121 L 141.5 129 M 141.5 121 L 133.5 129" />
                <path d="M 181 144.75 L 189 152.75 M 189 144.75 L 181 152.75" />
                <path d="M 228.5 125.75 L 236.5 133.75 M 236.5 125.75 L 228.5 133.75" />
                <path d="M 276 97.25 L 284 105.25 M 284 97.25 L 276 105.25" />
                <path d="M 323.5 92.5 L 331.5 100.5 M 331.5 92.5 L 323.5 100.5" />
                <path d="M 371 73.5 L 379 81.5 M 379 73.5 L 371 81.5" />
              </g>

              {/* Labels (X-axis) */}
              <g fill="#10b981" fontSize="11" textAnchor="middle">
                {['2020', '2021', '2022', '2023', '2024', '2025', '2026'].map((year, i) => (
                  <text key={year} x={90 + i * 47.5} y="235">{year}</text>
                ))}
                <text x="210" y="262" fontSize="11" fill="#10b981">年份</text>
              </g>
              
              {/* Labels (Y-axis) */}
              <g fill="#10b981" fontSize="11" textAnchor="end" dominantBaseline="middle">
                <text x="42" y="220">0</text>
                <text x="42" y="172.5">10</text>
                <text x="42" y="125">20</text>
                <text x="42" y="77.5">30</text>
                <text x="42" y="30">40</text>
                {/* Vertical Y-axis title */}
                <g transform="translate(15, 125)">
                  <text x="0" y="0" textAnchor="middle" transform="rotate(-90)" fill="#10b981">失業率 (%)</text>
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
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white rounded-lg p-6 border border-slate-200 h-full flex flex-col items-center justify-center">
            
            <p className="text-slate-800 font-bold mb-4 self-start">以下的幹葉圖顯示下列數據：</p>
            
            <div className="grid grid-cols-5 gap-y-2 gap-x-6 text-xl font-sans mb-8 text-center text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 w-full max-w-sm">
              <div>1</div>
              <div>21</div>
              <div>10</div>
              <div>47</div>
              <div>45</div>
              <div>23</div>
              <div>10</div>
              <div>42</div>
              <div>24</div>
              <div>48</div>
            </div>

            <div className="relative">
              <table className="border-collapse text-xl">
              <thead>
                <tr className="border-b-[3px] border-slate-700">
                  <th className="px-5 py-2 text-slate-800 font-bold border-r-[3px] border-slate-700">幹(十位)</th>
                  <th className="px-5 py-2 text-slate-800 font-bold">葉(個位)</th>
                </tr>
              </thead>
              <tbody className="font-sans text-left text-slate-700 tabular-nums">
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-5 py-2 border-r-[3px] border-slate-700 text-center">0</td>
                  <td className="px-5 py-2 tracking-[0.5em]">1</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-5 py-2 border-r-[3px] border-slate-700 text-center">1</td>
                  <td className="px-5 py-2 tracking-[0.5em]">0 0</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-5 py-2 border-r-[3px] border-slate-700 text-center">2</td>
                  <td className="px-5 py-2 tracking-[0.5em]">1 3 4</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-5 py-2 border-r-[3px] border-slate-700 text-center">3</td>
                  <td className="px-5 py-2 tracking-[0.5em]"><span className="text-green-600 font-sans font-bold ml-8 tracking-normal whitespace-nowrap">← 沒有3字開頭的數據</span></td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-5 py-2 border-r-[3px] border-slate-700 text-center">4</td>
                  <td className="px-5 py-2 tracking-[0.5em]">2 5 7 8</td>
                </tr>
              </tbody>
              </table>
            </div>

          </div>
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-4 text-xl border-b border-blue-200 pb-2">幹葉圖</h3>
            <ul className="text-slate-700 font-bold text-lg space-y-3 list-disc ml-6 mb-6">
              <li>能清楚知道每一個數據</li>
              <li>按大小<span className="bg-yellow-200 px-1 text-slate-800 rounded">順序</span>排列數據</li>
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
                  <tbody className="font-sans text-center">
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
              <p className="text-green-700 font-bold text-center mt-2 text-lg break-all"><Latex math="\because 28 − 15 = 13 \rightarrow b = 3" /></p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="frequency-table" title="6. 頻數分佈表 (填表格)" num={6} color="blue" activeSub={activeSub} sectionRef={s6}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <p className="text-slate-800 font-bold mb-4 border-b pb-2">以下是一些家庭擁有冷氣機的數目：</p>
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
              <p className="text-blue-800 font-bold text-lg pt-1">以 <span className="bg-yellow-200 px-1 rounded">瑩光筆顏色highlight</span> / <span className="underline decoration-blue-400 decoration-2 underline-offset-4">原子筆畫形狀</span> 分辨不同數據</p>
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

      <CollapsibleSection id="discrete-continuous" title="5. 連續數據 / 離散數據" num={5} color="red" activeSub={activeSub} sectionRef={s5}>
        <div className="bg-white rounded-xl p-6 border-l-[6px] border-l-red-500 shadow-md max-w-3xl mx-auto">
          <p className="text-red-700 font-bold mb-4">- 需分辨數據為離散數據還是連續數據</p>
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 transition hover:shadow-md">
              <h3 className="text-red-800 font-bold text-xl mb-3 flex items-center"><span className="mr-2">📝</span>離散數據</h3>
              <p className="text-slate-700 text-lg mb-4"><span className="text-red-600 font-bold border-b-2 border-red-300 pb-1">數算</span>所得</p>
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <p className="text-blue-800 text-sm font-bold opacity-80 mb-1">例子：</p>
                <p className="text-slate-700 font-medium">錢，人數，物件數量 ...</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 transition hover:shadow-md">
              <h3 className="text-blue-800 font-bold text-xl mb-3 flex items-center"><span className="mr-2">📝</span>連續數據</h3>
              <p className="text-slate-700 text-lg mb-4"><span className="text-blue-600 font-bold border-b-2 border-blue-300 pb-1">量度</span>所得</p>
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <p className="text-blue-800 text-sm font-bold opacity-80 mb-1">例子：</p>
                <p className="text-slate-700 font-medium">身高、體重、溫度、時間、容量、體積 ...</p>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 font-bold text-center">
            記法：數算得離散，量度得連續。
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

export const CoordinateNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null);

  // 繪製格線的輔助函數
  const renderGrid = (size, step = 30) => {
    const paths = [];
    for (let i = -size; i <= size; i++) {
      paths.push(<line key={`h${i}`} x1={-size * step} y1={i * step} x2={size * step} y2={i * step} stroke="#bae6fd" strokeWidth="2" />);
      paths.push(<line key={`v${i}`} x1={i * step} y1={-size * step} x2={i * step} y2={size * step} stroke="#bae6fd" strokeWidth="2" />);
    }
    return paths;
  };

  const drawPoint = (x, y, label, color = "#0284c7", step = 30) => {
    const cx = x * step;
    const cy = -y * step;
    return (
      <g>
        <path d={`M ${cx - 4} ${cy - 4} L ${cx + 4} ${cy + 4} M ${cx + 4} ${cy - 4} L ${cx - 4} ${cy + 4}`} stroke={color} strokeWidth="2.5" />
        <text x={cx + 8} y={cy - 8} fontSize="14" fill="#000" fontWeight="bold" fontStyle="italic">{label}</text>
      </g>
    );
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-sky-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH10 坐標幾何</h1>
        <p className="text-slate-600">直角坐標、象限判斷、坐標找長度與點的轉換</p>
      </div>

      <CollapsibleSection id="coordinate-system" title="坐標系統 (直角坐標)" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_1px_minmax(0,1.2fr)] gap-4 md:gap-6 items-stretch">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">📍 坐標系統 (直角坐標)</h3>
            <ul className="text-slate-700 space-y-2">
              <li>• <span className="bg-amber-200 px-1 rounded font-bold text-red-600">原點 <Latex math="O(0,0)" /></span> 為十字的中間交點。</li>
              <li>• 例子：<Latex math="A" /> 的坐標為 <Latex math="(2,4)" />。前方的 <span className="text-green-700 font-bold"><Latex math="x" /> 坐標是左右</span>，後方的 <span className="text-red-600 font-bold"><Latex math="y" /> 坐標是上下</span>。</li>
            </ul>
            <div className="mt-4 border-t border-blue-200 pt-3 text-slate-700">
              <p className="font-bold mb-2">e.g. 找坐標</p>
              <p className="ml-4"><Latex math="B" /> 的坐標為 <Latex math="(1,−2)" /></p>
              <p className="ml-4"><Latex math="C" /> 的坐標為 <Latex math="(−3,−3)" /></p>
              <p className="ml-4"><Latex math="D" /> 的坐標為 <Latex math="(−4,−2)" /></p>
              <p className="ml-4">也可寫成 <Latex math="E(−1,2)" /></p>
            </div>
          </div>

          <div className="hidden md:block bg-slate-200" aria-hidden="true" />

          <div className="print-coordinate-diagram bg-white rounded-lg p-4 border border-slate-200 flex flex-col items-center">
            <svg viewBox="-180 -180 360 360" className="w-full max-w-md bg-white">
              {/* 格線 */}
              {renderGrid(5)}
              
              {/* X軸和Y軸 */}
              <line x1="-165" y1="0" x2="165" y2="0" stroke="#16a34a" strokeWidth="3" />
              <polyline points="160,-5 165,0 160,5" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="172" y="5" fontSize="16" fill="#dc2626" fontWeight="bold">x 軸</text>

              <line x1="0" y1="165" x2="0" y2="-165" stroke="#16a34a" strokeWidth="3" />
              <polyline points="-5,-160 0,-165 5,-160" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="0" y="-172" fontSize="16" fill="#dc2626" fontWeight="bold" textAnchor="middle">y</text>

              {/* 刻度文字 */}
              {[-4, -3, -2, -1, 1, 2, 3, 4].map(i => (
                <g key={`x-tick-${i}`}>
                   <text x={i * 30} y="18" fontSize="14" fill="#16a34a" textAnchor="middle">{i}</text>
                   <line x1={i * 30} y1="-3" x2={i * 30} y2="3" stroke="#16a34a" strokeWidth="2" />
                </g>
              ))}
              {[1, 2, 3, 4, 5].map(i => (
                <g key={`y-tick-${i}`}>
                  <text x="-12" y={-i * 30 + 5} fontSize="14" fill="#16a34a" textAnchor="end">{i}</text>
                  <line x1="-3" y1={-i * 30} x2="3" y2={-i * 30} stroke="#16a34a" strokeWidth="2" />
                </g>
              ))}
              {[-1, -2, -3, -4].map(i => (
                <g key={`y-tick-neg-${i}`}>
                  <text x="-12" y={-i * 30 + 5} fontSize="14" fill="#16a34a" textAnchor="end">{i}</text>
                  <line x1="-3" y1={-i * 30} x2="3" y2={-i * 30} stroke="#16a34a" strokeWidth="2" />
                </g>
              ))}
              <text x="10" y="16" fontSize="14" fill="#16a34a" textAnchor="middle">0</text>
              <g>
                <path d="M -4 -4 L 4 4 M 4 -4 L -4 4" stroke="#0284c7" strokeWidth="2.5" />
                <text x="-10" y="-10" fontSize="14" fill="#dc2626" fontWeight="bold" textAnchor="end">O(原點)</text>
              </g>

              {/* 標點 */}
              {drawPoint(2, 4, "A", "#0284c7")}
              {drawPoint(1, -2, "B", "#0284c7")}
              {drawPoint(-3, -3, "C", "#0284c7")}
              {drawPoint(-4, -2, "D", "#0284c7")}
              {drawPoint(-1, 2, "E", "#0284c7")}
            </svg>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="quadrants" title="象限" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">🧭 四個象限</h3>
            <ul className="text-slate-700 space-y-2">
              <li>• 坐標平面可分為 <span className="font-bold">4 個象限</span>。</li>
              <li>• 必定用<span className="font-bold text-green-700">羅馬數字</span>表達象限。</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 flex flex-col md:flex-row items-center gap-6">
            <svg viewBox="-110 -110 220 220" className="w-48 bg-white">
              <rect x="0" y="-5" width="90" height="10" fill="#facc15" opacity="0.45" />
              <rect x="-90" y="-5" width="90" height="10" fill="#f9a8d4" opacity="0.45" />
              <rect x="-5" y="-90" width="10" height="90" fill="#facc15" opacity="0.45" />
              <rect x="-5" y="0" width="10" height="90" fill="#f9a8d4" opacity="0.45" />
              <line x1="-90" y1="0" x2="90" y2="0" stroke="#000" strokeWidth="2" />
              <polyline points="85,-4 90,0 85,4" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="89" y="-7" width="14" height="14" rx="2" fill="#facc15" opacity="0.55" />
              <text x="96" y="5" fontSize="18" fill="#000" fontWeight="bold" textAnchor="middle">+</text>
              <rect x="-110" y="-7" width="14" height="14" rx="2" fill="#f9a8d4" opacity="0.55" />
              <text x="-103" y="5" fontSize="18" fill="#000" fontWeight="bold" textAnchor="middle">−</text>
              <line x1="0" y1="90" x2="0" y2="-90" stroke="#000" strokeWidth="2" />
              <polyline points="-4,-85 0,-90 4,-85" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="-7" y="-103" width="14" height="14" rx="2" fill="#facc15" opacity="0.55" />
              <text x="0" y="-96" fontSize="18" fill="#000" fontWeight="bold" textAnchor="middle">+</text>
              <rect x="-7" y="97" width="14" height="14" rx="2" fill="#f9a8d4" opacity="0.55" />
              <text x="0" y="104" fontSize="18" fill="#000" fontWeight="bold" textAnchor="middle">−</text>

              <text x="45" y="-30" fontSize="24" fill="#15803d" fontWeight="bold" textAnchor="middle">I</text>
              <text x="45" y="-60" fontSize="16" fill="#000" fontWeight="bold" textAnchor="middle">(+, +)</text>

              <text x="-45" y="-30" fontSize="24" fill="#15803d" fontWeight="bold" textAnchor="middle">II</text>
              <text x="-45" y="-60" fontSize="16" fill="#000" fontWeight="bold" textAnchor="middle">(−, +)</text>

              <text x="-45" y="50" fontSize="24" fill="#15803d" fontWeight="bold" textAnchor="middle">III</text>
              <text x="-45" y="20" fontSize="16" fill="#000" fontWeight="bold" textAnchor="middle">(−, −)</text>

              <text x="45" y="50" fontSize="24" fill="#15803d" fontWeight="bold" textAnchor="middle">IV</text>
              <text x="45" y="20" fontSize="16" fill="#000" fontWeight="bold" textAnchor="middle">(+, −)</text>
              
              {/* Highlight line logic */}
              <circle cx="30" cy="0" r="4" fill="#dc2626" />
              <text x="40" y="-10" fontSize="12" fill="#dc2626" fontWeight="bold">(x, 0)</text>
            </svg>

            <div className="bg-red-50 p-4 border border-red-200 rounded-lg flex-1">
              <h4 className="font-bold text-red-800 mb-2">⚠️ 陷阱注意</h4>
              <p className="text-slate-700">其中一個坐標為 0，則<span className="font-bold underline">不屬於任何象限</span>。</p>
              <p className="text-sm text-slate-600 mt-2 bg-white p-2 rounded">
                e.g. <Latex math="(6,0)" /> 不屬於 I, II, III, IV 任何一個象限。它位於 <Latex math="x" /> 軸上。
              </p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="length" title="坐標線段 找長度" num={3} color="amber" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-3">📏 計算水平或鉛垂線段長度</h3>
            <div className="bg-white p-4 rounded-lg my-3 border border-amber-100 flex items-center justify-center gap-4 flex-wrap">
              <div className="text-lg">
                (<span className="font-bold text-blue-600">1</span>,{' '}
                <span className="bg-yellow-300 px-1 rounded font-bold text-green-600">2</span>)
              </div>
              <svg viewBox="0 0 160 40" width="160" height="40" className="overflow-visible">
                <line x1="20" y1="20" x2="140" y2="20" stroke="#16a34a" strokeWidth="2.5" />
                <line x1="13" y1="13" x2="27" y2="27" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="27" y1="13" x2="13" y2="27" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="133" y1="13" x2="147" y2="27" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="147" y1="13" x2="133" y2="27" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <div className="text-lg">
                (<span className="font-bold text-blue-600">5</span>,{' '}
                <span className="bg-yellow-300 px-1 rounded font-bold text-green-600">2</span>)
              </div>
            </div>

            <div className="space-y-3 mt-4 text-slate-700">
              <p className="flex items-start">
                <span className="text-green-600 font-bold mr-2 mt-0.5">Step 1：</span>
                <span>找前／後的數字相同，用螢光筆 highlight （如上圖的 <span className="bg-yellow-300 px-1 rounded font-bold">2</span>）。</span>
              </p>
              <p className="flex items-start">
                <span className="text-green-600 font-bold mr-2 mt-0.5">Step 2：</span>
                <span>不相同的數字（沒 highlight），用 <span className="font-bold text-purple-700">大 − 小</span>。</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="mb-2 text-slate-700">上述例子的長度為：</p>
            <Latex math="5 − 1 = 4 \text{ 單位}" block />
            
            <div className="mt-4 bg-slate-50 p-3 rounded-lg border-l-4 border-slate-400 text-sm">
              <p className="font-bold text-slate-800">💡 考試提示：</p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                <li><span className="font-bold">周界</span> <Latex math="\rightarrow" /> 將所有找到的邊長 <span className="font-bold text-red-600">相加</span>！</li>
                <li><span className="font-bold">面積</span> <Latex math="\rightarrow" /> 將相應找到的邊長 <span className="font-bold text-red-600">相乘</span>！</li>
              </ul>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="transformation" title="點的轉換" num={4} color="red" activeSub={activeSub} sectionRef={s4}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4 items-start">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-2">🔄 需分辨平移、反射、旋轉</h3>
            
            <div className="space-y-3 mt-3">
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <h4 className="font-bold text-red-600 mb-1 border-b-2 border-red-200 inline-block">平移 (Translation)</h4>
                <p className="text-slate-700 text-sm">向「上、下、左、右」4 個方向，打直／打橫移特定格數。</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <h4 className="font-bold text-blue-600 mb-1 border-b-2 border-blue-200 inline-block">反射 (Reflection)</h4>
                <p className="text-slate-700 text-sm">可沿 <span className="bg-yellow-200 px-1 rounded font-bold hover:bg-yellow-300"><Latex math="x" /> 軸</span>、<span className="bg-yellow-200 px-1 rounded font-bold hover:bg-yellow-300"><Latex math="y" /> 軸</span>或特定直線（例如 <Latex math="x=1" />）反射。<br/>可透過畫圖，或者記住：<br/><span className="block pl-4">沿 <Latex math="y" /> 軸反射，<Latex math="x" /> 正負調轉；</span><span className="block pl-4">沿 <Latex math="x" /> 軸反射，<Latex math="y" /> 正負調轉。</span></p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <h4 className="font-bold text-purple-700 mb-1 border-b-2 border-purple-200 inline-block">旋轉 (Rotation) 📐</h4>
                <p className="text-slate-700 text-sm">
                  每轉 90°，<Latex math="(x,y)" /> 必須<span className="bg-yellow-200 px-1 rounded font-bold">調轉寫正值</span>，再<span className="font-bold text-red-600">按其象限加回相應負號</span>。
                </p>
                <div className="mt-2 pl-2 border-l-2 border-purple-300 bg-purple-50 p-2 rounded text-xs text-purple-800">
                  <p>例如：<Latex math="C(2,−4)" /> 轉 90°，先調轉 <Latex math="\rightarrow(4,2)" />。<br/>畫圖可見若 <span className="font-bold">順時針</span> 轉 90° 會到第 III 象限，所以加負號得 <span className="font-bold text-red-600"><Latex math="(−4,−2)" /></span>。</p>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  <p>註1：如轉 180° 即不用調轉 <Latex math="x,y" /> (因為調了兩次會抵銷)。順時針 270° 即等於 逆時針 90°。</p>
                  <p className="text-red-500 font-bold mt-1">💡 小貼士：可望手錶或時鐘數字順序，提醒自己順逆時針。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="print-break-before print-coordinate-diagram bg-white rounded-lg p-4 border border-slate-200 flex flex-col items-center">
            <svg viewBox="-165 -160 360 330" className="w-full max-w-md bg-white">
              {renderGrid(5, 25)}
              
              <line x1="-140" y1="0" x2="140" y2="0" stroke="#000" strokeWidth="2" />
              <polyline points="135,-4 140,0 135,4" fill="none" stroke="#000" strokeWidth="2" />
              <text x="145" y="5" fontSize="14" fill="#000" fontWeight="bold" fontStyle="italic">x</text>

              <line x1="0" y1="140" x2="0" y2="-140" stroke="#000" strokeWidth="2" />
              <polyline points="-4,-135 0,-140 4,-135" fill="none" stroke="#000" strokeWidth="2" />
              <text x="-15" y="-140" fontSize="14" fill="#000" fontWeight="bold" fontStyle="italic">y</text>

              {/* A 平移 */}
              {drawPoint(5, 4, "", "#16a34a", 25)}
              <text x="135" y="-105" fontSize="12" fill="#db2777" fontWeight="bold" fontStyle="italic">A(5, 4)</text>
              {drawPoint(1, 4, "", "#16a34a", 25)}
              <text x="5" y="-105" fontSize="12" fill="#db2777" fontWeight="bold" fontStyle="italic">A'(1, 4)</text>
              <line x1="120" y1="-100" x2="35" y2="-100" stroke="#db2777" strokeWidth="2" strokeDasharray="4 2" />
              <polyline points="40,-104 35,-100 40,-96" fill="none" stroke="#db2777" strokeWidth="2" />
              <text x="85" y="-120" fontSize="12" fill="#db2777" textAnchor="middle">向左平移 4單位</text>

              {/* B 反射 */}
              {drawPoint(-3, 2, "", "#16a34a", 25)}
              <text x="-85" y="-55" fontSize="12" fill="#0284c7" fontWeight="bold" fontStyle="italic" textAnchor="end">B(-3, 2)</text>
              {drawPoint(3, 2, "", "#16a34a", 25)}
              <text x="85" y="-55" fontSize="12" fill="#0284c7" fontWeight="bold" fontStyle="italic">B'(3, 2)</text>
              
              <path d="M -70 -55 Q -35 -80 0 -55 Q 35 -80 70 -55" fill="none" stroke="#0284c7" strokeWidth="2" />
              <polyline points="-5,-60 0,-55 -8,-52" fill="none" stroke="#0284c7" strokeWidth="2" />
              <polyline points="65,-60 70,-55 62,-52" fill="none" stroke="#0284c7" strokeWidth="2" />
              <text x="-35" y="-75" fontSize="12" fill="#0284c7" textAnchor="middle">3格</text>
              <text x="35" y="-75" fontSize="12" fill="#0284c7" textAnchor="middle">再 3格</text>

              {/* C 旋轉 */}
              {drawPoint(2, -4, "", "#16a34a", 25)}
              <text x="55" y="115" fontSize="12" fill="#7e22ce" fontWeight="bold" fontStyle="italic">C(2, -4)</text>
              {drawPoint(-4, -2, "", "#16a34a", 25)}
              <text x="-120" y="65" fontSize="12" fill="#7e22ce" fontWeight="bold" fontStyle="italic">C'(-4, -2)</text>
              
              <path d="M 45 105 Q 0 130 -95 65" fill="none" stroke="#7e22ce" strokeWidth="2" />
              <polyline points="-85,65 -95,65 -92,74" fill="none" stroke="#7e22ce" strokeWidth="2" />
              <text x="-25" y="120" fontSize="12" fill="#7e22ce" textAnchor="middle">順時針</text>

              {/* C 逆時針箭頭示意 (僅線條) */}
              <path d="M 55 90 Q 75 70 85 45" fill="none" stroke="#7e22ce" strokeWidth="1.5" strokeDasharray="3 3"/>
              <polyline points="80,50 85,45 88,52" fill="none" stroke="#7e22ce" strokeWidth="1.5" />
              <text x="90" y="75" fontSize="12" fill="#7e22ce">逆時針</text>
              
              {/* 原點 */}
              <text x="-10" y="15" fontSize="12" fill="#16a34a" fontWeight="bold">0</text>
              
            </svg>
            <p className="text-xs text-slate-500 mt-2 text-center">各類轉換圖示（各色箭頭代表不同的轉換過程）</p>
          </div>

        </div>
      </CollapsibleSection>
    </>
  );
};

export const PercentageNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-emerald-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH9 百分數</h1>
        <p className="text-slate-600">百分數互化、部份百分率、比較與百分變化</p>
      </div>

      <CollapsibleSection id="interconversion" title="1. 百分數 / 小數 / 分數互化" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">🔄 百分數／小數／分數互化 → 用計算機</h3>
            
            <div className="space-y-6">
              {/* 小數 <=> 分數 */}
              <div className="bg-white p-4 rounded-lg border border-blue-100 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 w-24">小數 → 分數</span>
                    <span className="text-slate-500">e.g.</span>
                    <Latex math="0.51 \rightarrow \frac{51}{100}" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 w-24">分數 → 小數</span>
                    <span className="text-slate-500">e.g.</span>
                    <Latex math="\frac{2}{5} \rightarrow 0.4" />
                  </div>
                </div>
                <div className="text-green-700 font-bold flex items-center gap-1 bg-green-50 px-3 py-2 rounded-lg">
                  輸入數字後按 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> <span className="bg-gray-500 text-white text-xs font-mono px-2 py-0.5 rounded">a b/c</span> 轉換
                </div>
              </div>

              {/* 百分數 <=> 小數/分數 */}
              <div className="bg-white p-4 rounded-lg border border-blue-100 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 w-28">百分數 → 小數</span>
                    <span className="text-slate-500">e.g.</span>
                    <Latex math="85\% \rightarrow 0.85" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 w-28">百分數 → 分數</span>
                    <span className="text-slate-500">e.g.</span>
                    <Latex math="72\% \rightarrow \frac{18}{25}" />
                  </div>
                </div>
                <div className="text-green-700 font-bold flex items-center gap-1 bg-green-50 px-3 py-2 rounded-lg">
                  輸入數字後按 <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> <span className="bg-gray-500 text-white text-xs font-mono px-2 py-0.5 rounded">a b/c</span> 轉換
                </div>
              </div>

              {/* 分數/小數 -> 百分數 */}
              <div className="bg-white p-4 rounded-lg border border-blue-100 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 w-28">分數 → 百分數</span>
                    <span className="text-slate-500">e.g.</span>
                    <Latex math="\frac{3}{4} \rightarrow 75\%" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 w-28">小數 → 百分數</span>
                    <span className="text-slate-500">e.g.</span>
                    <Latex math="0.253 \rightarrow 25.3\%" />
                  </div>
                </div>
                <div className="text-green-700 font-bold bg-green-50 px-3 py-2 rounded-lg">
                  輸入分數/小數後 <span className="bg-yellow-200 px-1 rounded text-red-600">×100</span>，答案再寫上「%」
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="percentage-of-part" title="2. 表達部份的百分數" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 bg-white p-4 rounded-lg">
              <div className="text-xl">
                <Latex math="\frac{\text{目標部份}}{\text{總數}} \times 100\%" />
              </div>
              <div className="text-red-600 font-bold ml-4 relative">
                <span className="absolute -left-6 top-1/2 -translate-y-1/2">←</span>
                關鍵字眼：所佔的百分數
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-blue-800 font-bold mb-3">e.g. 題目：40 隻手錶中，有 8 隻是智能手錶</p>
              <p className="text-slate-700 font-bold mb-2">智能手錶佔全部手錶的：</p>
              
              <div className="flex items-center text-lg mt-4 pl-4">
                <span className="font-bold mr-4">答案：</span>
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <span className="text-blue-600 font-bold">8</span>
                      <span className="absolute left-4 bottom-1 text-sm text-red-600 font-bold whitespace-nowrap">← 目標數字</span>
                    </div>
                    <div className="h-0.5 w-8 bg-black my-1"></div>
                    <div className="relative">
                      <span className="text-blue-600 font-bold">40</span>
                      <span className="absolute left-6 top-0 text-sm text-red-600 font-bold whitespace-nowrap">← 總數</span>
                    </div>
                  </div>
                  <span className="ml-2 font-bold">×100% = 20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="percentage-comparison" title="3. 百分數比較" num={3} color="amber" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-3">⚖️ 百分數比較</h3>
            
            <div className="space-y-5">
              <div className="bg-white p-4 rounded-lg border border-amber-100">
                <p className="text-lg font-bold mb-3">
                  − <span className="text-red-500">A</span> 是 <span className="text-blue-500">B</span> 的百分之幾？
                </p>
                <div className="flex items-center gap-4 pl-4">
                  <span className="font-bold">答案：</span>
                  <div className="text-xl inline-block mr-2">
                    <Latex math="\frac{\color{red}A}{\color{blue}B} \times 100\%" />
                  </div>
                  <div className="text-green-700 font-bold flex items-center">
                    ← 口訣：前上後下
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-amber-100 space-y-4">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">
                    − <span className="text-red-500">A</span> <span className="bg-yellow-200 px-1 rounded">較</span> <span className="text-blue-500">B</span> <span className="bg-yellow-200 px-1 rounded">多 10%</span>
                  </p>
                  <p className="text-lg pl-4">
                    <span className="font-bold mr-2">式：</span>
                    <span className="text-red-500 font-bold">A</span> = <span className="text-blue-500 font-bold">B</span> <span className="bg-yellow-200 px-1 rounded font-bold">(1 + 10%)</span>
                  </p>
                </div>
                
                <hr className="border-amber-100" />
                
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">
                    − <span className="text-red-500">A</span> <span className="bg-yellow-200 px-1 rounded">較</span> <span className="text-blue-500">B</span> <span className="bg-yellow-200 px-1 rounded">少 10%</span>
                  </p>
                  <p className="text-lg pl-4">
                    <span className="font-bold mr-2">式：</span>
                    <span className="text-red-500 font-bold">A</span> = <span className="text-blue-500 font-bold">B</span> <span className="bg-yellow-200 px-1 rounded font-bold">(1 - 10%)</span>
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="percentage-change" title="4. 百分變化" num={4} color="purple" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">📈 百分變化</h3>
            
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 bg-white p-4 rounded-lg">
              <div className="text-xl">
                <Latex math="\frac{\color{green}\text{新} − \color{green}\text{舊}}{\color{green}\text{舊}} \times 100\%" />
              </div>
              <div className="text-red-600 font-bold ml-4 relative">
                <span className="absolute -left-6 top-1/2 -translate-y-1/2">←</span>
                關鍵字眼：百分變化
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <p className="text-purple-800 font-bold mb-2">新/舊按事件的發生時序排列</p>
              <p className="text-blue-800 font-bold mb-4 border-b pb-2">例：昨天 5000 人，今天 6000 人，求人數百分變化</p>
              
              <div className="space-y-4 pl-4 text-lg">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="relative pb-1">
                      <span className="font-bold text-blue-700"><Latex math="6000 - 5000" /></span>
                      <span className="absolute left-1 -top-4 text-xs text-green-600 font-bold">新</span>
                      <span className="absolute right-1 -top-4 text-xs text-green-600 font-bold">舊</span>
                    </div>
                    <div className="h-0.5 w-[110%] bg-black"></div>
                    <div className="relative pt-1">
                      <span className="font-bold text-blue-700"><Latex math="5000" /></span>
                      <span className="absolute left-1/2 -translate-x-1/2 top-7 text-xs text-green-600 font-bold">舊</span>
                    </div>
                  </div>
                  <span className="ml-4 font-bold"><Latex math="\times 100\%" /></span>
                </div>
                
                <div className="flex items-center pt-8">
                  <span className="mr-2"><Latex math="=" /></span>
                  <div className="flex flex-col items-center">
                    <div className="font-bold text-blue-700 pb-1"><Latex math="1000" /></div>
                    <div className="h-0.5 w-[120%] bg-black"></div>
                    <div className="font-bold text-blue-700 pt-1"><Latex math="5000" /></div>
                  </div>
                  <span className="ml-4 font-bold"><Latex math="\times 100\%" /></span>
                </div>
                
                <div className="pt-2 font-bold text-blue-700">
                  <Latex math="=" /> <span className="bg-green-100 px-1 rounded text-green-700"><Latex math="+20\%" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="money-percentages" title="5. 關於錢的百分數" num={5} color="emerald" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600 font-bold text-left">必須了解以下幾個關鍵詞：</p>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-emerald-100">
                    <th className="border border-emerald-200 px-4 py-3 text-left font-bold text-emerald-800">關鍵詞</th>
                    <th className="border border-emerald-200 px-4 py-3 text-left font-bold text-emerald-800">定義 / 解釋</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">標價</td><td className="border border-emerald-200 px-4 py-3"><span className="text-red-600 font-bold">未折</span>的原價</td></tr>
                  <tr className="bg-gray-50"><td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">售價</td><td className="border border-emerald-200 px-4 py-3"><span className="text-red-600 font-bold">折後</span>真正付的錢</td></tr>
                  <tr className="bg-white"><td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">折扣</td><td className="border border-emerald-200 px-4 py-3">標價 - 售價 <span className="text-green-600">（平了多少）</span></td></tr>
                  <tr className="bg-gray-50"><td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">成本</td><td className="border border-emerald-200 px-4 py-3">我做生意<span className="text-red-600 font-bold">買</span>/製作這件貨品需花的金額(成本價)</td></tr>
                  <tr className="bg-white"><td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">盈利</td><td className="border border-emerald-200 px-4 py-3">扣除成本後<span className="bg-yellow-200 text-orange-600 font-bold px-1 rounded">賺</span>的錢：<span className="text-red-600 font-bold">盈利 = 售價 - 成本</span></td></tr>
                  <tr className="bg-gray-50"><td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">虧蝕</td><td className="border border-emerald-200 px-4 py-3">扣除成本後<span className="bg-yellow-200 text-orange-600 font-bold px-1 rounded">蝕</span>的錢，即負盈利</td></tr>
                  <tr className="bg-white"><td className="border border-emerald-200 px-4 py-3 font-bold text-slate-800">標價<span className="text-green-600">九折</span></td><td className="border border-emerald-200 px-4 py-3">標價 <span className="text-green-600 font-bold">× 90%</span></td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-emerald-700 mb-3">重要公式</h3>
              <div className="bg-white rounded-lg p-4 border border-green-300">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <span className="text-green-600 font-bold">盈利/虧蝕百分率</span>
                  <Latex math="\displaystyle \frac{\color{red}{\text{盈利/虧蝕}}}{\text{成本}} \times 100\%" block />
                </div>
              </div>
            </div>

            <div className="mt-6 bg-slate-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-700 mb-4 text-center">💰 價錢關係圖解</h3>
              <svg viewBox="0 0 480 320" className="w-full max-w-lg mx-auto">
                <defs>
                  <marker id="money-arr-amber" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#d97706" /></marker>
                  <marker id="money-arr-pink" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ec4899" /></marker>
                  <marker id="money-arr-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#10b981" /></marker>
                  <marker id="money-arr-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ef4444" /></marker>
                </defs>
                <rect x="190" y="18" width="100" height="46" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
                <text x="240" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#9d174d">標價</text>
                <rect x="18" y="200" width="100" height="46" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                <text x="68" y="230" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#92400e">成本</text>
                <rect x="362" y="200" width="100" height="46" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
                <text x="412" y="230" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#065f46">售價</text>
                <line x1="112" y1="200" x2="194" y2="64" stroke="#d97706" strokeWidth="2" markerEnd="url(#money-arr-amber)" />
                <text x="105" y="138" textAnchor="end" fontSize="14" fontWeight="bold" fill="#92400e">(1+%)</text>
                <line x1="286" y1="64" x2="366" y2="200" stroke="#ec4899" strokeWidth="2" markerEnd="url(#money-arr-pink)" />
                <text x="378" y="126" textAnchor="start" fontSize="14" fontWeight="bold" fill="#9d174d">折扣率</text>
                <text x="378" y="144" textAnchor="start" fontSize="14" fontWeight="bold" fill="#9d174d">(1-%)</text>
                <line x1="120" y1="216" x2="358" y2="216" stroke="#10b981" strokeWidth="2" markerEnd="url(#money-arr-green)" />
                <text x="239" y="208" textAnchor="middle" fontSize="13" fill="#065f46" fontWeight="bold">(1+%) 盈利</text>
                <line x1="120" y1="236" x2="358" y2="236" stroke="#ef4444" strokeWidth="2" markerEnd="url(#money-arr-red)" />
                <text x="239" y="252" textAnchor="middle" fontSize="13" fill="#dc2626" fontWeight="bold">(1-%) 虧蝕</text>
                <rect x="60" y="268" width="360" height="46" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                <text x="240" y="287" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">順箭嘴方向 → ×（乘）</text>
                <text x="240" y="307" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b91c1c">逆箭嘴方向 → ÷（除）</text>
              </svg>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

export const AnglesNotes = ({ activeSub }) => {
  const s0 = useRef(null), s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-rose-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH11 直線相關的角</h1>
        <p className="text-slate-600">線和角命名、基礎角度定理與常見幾何角題型</p>
      </div>

      <CollapsibleSection id="lines-angles-naming" title="基礎知識：線和角的命名" num={0} color="slate" activeSub={activeSub} sectionRef={s0}>
        <div className="print-keep-layout grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-sm font-bold text-green-800 mb-1">線段</p>
            <p className="text-sm text-slate-700 mb-2">由兩個端點組成，如 <span className="font-sans font-bold bg-white px-1 rounded">線段 <Latex math="AB" /></span>（從 <Latex math="A" /> 到 <Latex math="B" />）</p>
            <svg viewBox="0 0 300 60" className="w-full touch-none mt-2">
              <line x1="80" y1="30" x2="220" y2="20" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
              <circle cx="80" cy="30" r="3" fill="#334155" />
              <circle cx="220" cy="20" r="3" fill="#334155" />
              <text x="60" y="35" fontSize="16" fill="#16a34a" fontFamily="sans-serif" fontStyle="italic">A</text>
              <text x="230" y="25" fontSize="16" fill="#16a34a" fontFamily="sans-serif" fontStyle="italic">B</text>
            </svg>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-sm font-bold text-green-800 mb-1">角的命名（角的特徵）</p>
            <p className="text-sm text-slate-700 mb-2">由三個點命名，如 <span className="font-sans font-bold bg-white px-1 rounded"><Latex math="\angle ABC" /></span>
              <span className="ml-2 text-xs text-amber-700 font-bold">⚠️ 頂點（vertex）在<span className="text-red-600">中間</span>的英文字母</span>
            </p>
            <svg viewBox="0 0 300 100" className="w-full touch-none">
              <path d="M 60 80 L 120 30 M 60 80 L 180 80" stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x="125" y="25" fontSize="16" fill="#16a34a" fontStyle="italic">A</text>
              <text x="40" y="85" fontSize="16" fill="#16a34a" fontStyle="italic">B</text>
              <text x="185" y="85" fontSize="16" fill="#16a34a" fontStyle="italic">C</text>
              <path d="M 90 80 A 30 30 0 0 0 83 61" stroke="#dc2626" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="basic-angle-theorems" title="幾何角度定理 (1-5)" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="print-keep-layout grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. 直線上的鄰角 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">1</span>
              直線上的鄰角
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-center text-xl font-bold text-blue-800 my-1"><Latex math="a+b+c=180^\circ" /></p>
                <svg viewBox="0 0 300 100" className="w-full max-w-xs mx-auto my-3 touch-none">
                  <line x1="40" y1="80" x2="260" y2="80" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="150" y1="80" x2="100" y2="20" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="150" y1="80" x2="230" y2="35" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 128 80 A 22 22 0 0 1 133 60" stroke="#2563eb" strokeWidth="2" fill="none" />
                  <path d="M 139 67 A 17 17 0 0 1 165 72" stroke="#2563eb" strokeWidth="2" fill="none" />
                  <path d="M 169 70 A 22 22 0 0 1 172 80" stroke="#2563eb" strokeWidth="2" fill="none" />
                  <text x="115" y="75" fontSize="14" fill="#1e3a8a" fontStyle="italic">a</text>
                  <text x="151" y="62" fontSize="14" fill="#1e3a8a" fontStyle="italic">b</text>
                  <text x="180" y="75" fontSize="14" fill="#1e3a8a" fontStyle="italic">c</text>
                  <text x="40" y="98" fontSize="14" fill="#dc2626" fontStyle="italic">A</text>
                  <text x="146" y="98" fontSize="14" fill="#dc2626" fontStyle="italic">O</text>
                  <text x="250" y="98" fontSize="14" fill="#dc2626" fontStyle="italic">B</text>
                </svg>
                <p className="text-sm text-slate-600 text-center mt-2">
                  <span className="bg-blue-200 px-2 py-0.5 rounded font-bold text-blue-900">在直線的所有角</span>之和 <Latex math="=180^\circ" />
                </p>
              </div>
              <p className="text-sm text-slate-600 text-center mt-3 pt-3 border-t border-blue-200">
                <span className="bg-white border rounded px-2 py-0.5 font-bold text-blue-900">(直線上的鄰角, adj. <Latex math="\angle s" /> on st. line)</span>
              </p>
            </div>
          </div>

          {/* 2. 同頂角 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
              同頂角
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-center text-xl font-bold text-blue-800 my-1"><Latex math="a+b+c=360^\circ" /></p>
                <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                  <g transform="translate(150, 70)">
                    <line x1="0" y1="0" x2="0" y2="-60" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="0" y1="0" x2="55" y2="40" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="0" y1="0" x2="-45" y2="50" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 0 -14 A 14 14 0 0 1 11 9" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 18 13 A 22 22 0 0 1 -15 16" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M -11 14 A 18 18 0 0 1 0 -18" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <text x="17" y="-5" fontSize="14" fill="#1e3a8a" fontStyle="italic">a</text>
                    <text x="-2" y="38" fontSize="14" fill="#1e3a8a" fontStyle="italic">b</text>
                    <text x="-32" y="-6" fontSize="14" fill="#1e3a8a" fontStyle="italic">c</text>
                  </g>
                </svg>
                <p className="text-sm text-slate-600 text-center mt-2">
                  <span className="bg-blue-200 px-2 py-0.5 rounded font-bold text-blue-900">圓圈的所有角</span>之和 <Latex math="=360^\circ" />
                </p>
              </div>
              <p className="text-sm text-slate-600 text-center mt-3 pt-3 border-t border-blue-200">
                <span className="bg-white border rounded px-2 py-0.5 font-bold text-blue-900">(同頂角, <Latex math="\angle s" /> at a pt.)</span>
              </p>
            </div>
          </div>

          {/* 3. 對頂角 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
              對頂角
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-center text-xl font-bold text-blue-800 my-1"><Latex math="a=b" /></p>
                <svg viewBox="0 0 300 120" className="w-full max-w-xs mx-auto my-3 touch-none">
                  <line x1="70" y1="20" x2="230" y2="100" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="70" y1="100" x2="230" y2="20" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <g transform="translate(150, 60)">
                    <path d="M -18 -8 A 20 20 0 0 0 -18 8" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M 18 -8 A 20 20 0 0 1 18 8" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <text x="-35" y="5" fontSize="16" fill="#1e3a8a" fontStyle="italic">a</text>
                    <text x="25" y="5" fontSize="16" fill="#1e3a8a" fontStyle="italic">b</text>
                  </g>
                </svg>
                <div className="bg-amber-50 rounded p-2 mt-2 border border-amber-200 text-center">
                  <p className="text-sm text-amber-800">💡 兩直線相交 → 對面的角<span className="font-bold text-red-600">相等</span></p>
                </div>
              </div>
              <p className="text-sm text-slate-600 text-center mt-3 pt-3 border-t border-blue-200">
                <span className="bg-white border rounded px-2 py-0.5 font-bold text-blue-900">(對頂角, vert. opp. <Latex math="\angle s" />)</span>
              </p>
            </div>
          </div>

          {/* 4A. 同位角 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4A</span>
              同位角（F 形 → 相等）
            </h3>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-center text-xl font-bold text-red-800 my-1"><Latex math="a=b" /></p>
                <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                  <line x1="40" y1="50" x2="260" y2="50" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="40" y1="100" x2="260" y2="100" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="168" y1="20" x2="102" y2="130" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <polyline points="230,50 150,50 102,130" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                  <line x1="120" y1="100" x2="230" y2="100" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
                  <path d="M 165 50 A 15 15 0 0 1 142.3 62.8" stroke="#2563eb" strokeWidth="2" fill="none" />
                  <path d="M 135 100 A 15 15 0 0 1 112.3 112.8" stroke="#2563eb" strokeWidth="2" fill="none" />
                  <text x="166" y="76" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                  <text x="136" y="126" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                  <path d="M 195 45 L 205 50 L 195 55" stroke="#16a34a" strokeWidth="2" fill="none" />
                  <path d="M 195 95 L 205 100 L 195 105" stroke="#16a34a" strokeWidth="2" fill="none" />
                  <text x="23" y="55" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                  <text x="265" y="55" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                  <text x="23" y="105" fontSize="16" fill="#334155" fontStyle="italic">C</text>
                  <text x="265" y="105" fontSize="16" fill="#334155" fontStyle="italic">D</text>
                </svg>
              </div>
              <p className="text-sm text-slate-600 text-center mt-3 pt-3 border-t border-red-200">
                <span className="bg-white border rounded px-2 py-0.5 text-sm text-red-900 font-bold">(同位角, <Latex math="AB\mathbin{//}CD" />, corr. <Latex math="\angle s" />)</span>
              </p>
            </div>
          </div>

          {/* 4B. 內錯角 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4B</span>
              內錯角（Z/N 形 → 相等）
            </h3>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-center text-xl font-bold text-red-800 my-1"><Latex math="a=b" /></p>
                <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                  <line x1="100" y1="20" x2="100" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="200" y1="20" x2="200" y2="120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="100" y1="40" x2="200" y2="100" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <polyline points="100,120 100,40 200,100 200,20" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                  <path d="M 112.8 47.7 A 15 15 0 0 1 100 55" stroke="#2563eb" strokeWidth="2" fill="none" />
                  <path d="M 200 85 A 15 15 0 0 0 187.2 92.3" stroke="#2563eb" strokeWidth="2" fill="none" />
                  <text x="114" y="74" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                  <text x="176" y="76" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                  <path d="M 92 90 L 100 80 L 108 90" stroke="#16a34a" strokeWidth="2" fill="none" />
                  <path d="M 192 70 L 200 60 L 208 70" stroke="#16a34a" strokeWidth="2" fill="none" />
                  <text x="95" y="15" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                  <text x="95" y="138" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                  <text x="195" y="15" fontSize="16" fill="#334155" fontStyle="italic">C</text>
                  <text x="195" y="138" fontSize="16" fill="#334155" fontStyle="italic">D</text>
                </svg>
              </div>
              <p className="text-sm text-slate-600 text-center mt-3 pt-3 border-t border-red-200">
                <span className="bg-white border rounded px-2 py-0.5 text-sm text-red-900 font-bold">(內錯角, <Latex math="AB\mathbin{//}CD" />, alt. <Latex math="\angle s" />)</span>
              </p>
            </div>
          </div>

          {/* 4C. 同旁內角 */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4C</span>
              同旁內角（C/U 形 → <Latex math="180^\circ" />）
            </h3>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-center text-xl font-bold text-red-800 my-1"><Latex math="a+b=180^\circ" /></p>
                <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                  <line x1="40" y1="50" x2="260" y2="50" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="40" y1="100" x2="260" y2="100" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="168" y1="20" x2="102" y2="130" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <polyline points="230,50 150,50 120,100 230,100" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                  <path d="M 165 50 A 15 15 0 0 1 142.3 62.8" stroke="#2563eb" strokeWidth="2" fill="none" />
                  <path d="M 127.7 87.2 A 15 15 0 0 1 135 100" stroke="#2563eb" strokeWidth="2" fill="none" />
                  <text x="153" y="72" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                  <text x="135" y="85" fontSize="16" fill="#1e3a8a" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                  <path d="M 195 45 L 205 50 L 195 55" stroke="#16a34a" strokeWidth="2" fill="none" />
                  <path d="M 195 95 L 205 100 L 195 105" stroke="#16a34a" strokeWidth="2" fill="none" />
                  <text x="23" y="55" fontSize="16" fill="#334155" fontStyle="italic">A</text>
                  <text x="265" y="55" fontSize="16" fill="#334155" fontStyle="italic">B</text>
                  <text x="23" y="105" fontSize="16" fill="#334155" fontStyle="italic">C</text>
                  <text x="265" y="105" fontSize="16" fill="#334155" fontStyle="italic">D</text>
                </svg>
              </div>
              <p className="text-sm text-slate-600 text-center mt-3 pt-3 border-t border-red-200">
                <span className="bg-white border rounded px-2 py-0.5 text-sm text-red-900 font-bold">(同旁內角, <Latex math="AB\mathbin{//}CD" />, int. <Latex math="\angle s" />)</span>
              </p>
            </div>
          </div>

          {/* 5. 三角形內角和 */}
          <div className="flex flex-col md:col-span-2">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">5</span>
              三角形內角和
            </h3>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-center text-xl font-bold text-green-800 my-1"><Latex math="a+b+c=180^\circ" /></p>
                    <svg viewBox="0 0 300 140" className="w-full max-w-xs mx-auto my-3 touch-none">
                      <polygon points="150,20 60,110 240,110" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                      <path d="M 135.9 34.1 A 20 20 0 0 0 164.1 34.1" stroke="#16a34a" strokeWidth="2" fill="none" />
                      <path d="M 80 110 A 20 20 0 0 0 74.1 95.9" stroke="#16a34a" strokeWidth="2" fill="none" />
                      <path d="M 220 110 A 20 20 0 0 1 225.9 95.9" stroke="#16a34a" strokeWidth="2" fill="none" />
                      <text x="145" y="55" fontSize="16" fill="#15803d" fontFamily="Times New Roman, serif" fontStyle="italic">a</text>
                      <text x="90" y="103" fontSize="16" fill="#15803d" fontFamily="Times New Roman, serif" fontStyle="italic">b</text>
                      <text x="200" y="103" fontSize="16" fill="#15803d" fontFamily="Times New Roman, serif" fontStyle="italic">c</text>
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-3 pt-3 border-t border-green-200">
                    <span className="bg-white border rounded px-2 py-0.5 font-bold text-green-900">(<Latex math="\triangle" /> 內角和, <Latex math="\angle" /> sum of <Latex math="\triangle" />)</span>
                  </p>
                </div>

                <div className="bg-white rounded p-3 border border-slate-200 flex items-center">
                  <div className="w-full">
                    <p className="text-sm text-green-800 font-bold mb-2">例子：</p>
                    <div className="flex items-center gap-4">
                      <svg viewBox="0 0 110 90" className="w-28 flex-none touch-none">
                        <polygon points="55,8 10,78 100,78" stroke="#334155" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        <path d="M 47.4 19.8 A 14 14 0 0 0 62.6 19.8" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                        <path d="M 24 78 A 14 14 0 0 0 17.6 66.2" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                        <path d="M 86 78 A 14 14 0 0 1 92.4 66.2" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                        <text x="43" y="36" fontSize="10" fill="#334155">70°</text>
                        <text x="27" y="73" fontSize="10" fill="#334155">50°</text>
                        <text x="69" y="73" fontSize="10" fill="#334155" fontStyle="italic">2x</text>
                      </svg>
                      <div className="text-sm text-slate-700 grid grid-cols-[auto_auto_1fr] gap-x-2">
                        <div className="text-right"><Latex math="2x" /></div>
                        <div className="text-center"><Latex math="=" /></div>
                        <div className="text-left"><Latex math="180^\circ-50^\circ-70^\circ" /></div>

                        <div className="text-right"><Latex math="2x" /></div>
                        <div className="text-center"><Latex math="=" /></div>
                        <div className="text-left"><Latex math="60^\circ" /></div>

                        <div className="text-right"><Latex math="x" /></div>
                        <div className="text-center"><Latex math="=" /></div>
                        <div className="text-left"><Latex math="30^\circ" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

export const AlgebraBasicNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null);
  const cheatsheet = [
    { key: '連續數', latex: 'x,(x+1)' },
    { key: '大 / 多 / 高', latex: '+' },
    { key: '小 / 少 / 低', latex: '-' },
    { key: '2倍 (n倍)', latex: '\\times 2; (\\times n)' },
    { key: '較 / 比 / 是 / 為 / 相同', latex: '=' },
    { key: 'x 與 y 之和', latex: 'x+y' },
    { key: 'x 的 12 年後', latex: 'x+12' },
    { key: 'y 的 3 年前', latex: 'y-3' },
    { key: '一半', latex: '\\div 2' },
    { key: 'y 與 11 的積', latex: 'y\\times 11' },
    { key: 'x 的平方', latex: 'x^2' },
    { key: 'x 的立方', latex: 'x^3' },
  ];

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-emerald-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH3 代數式</h1>
        <p className="text-slate-600">中文句子與數式互譯、代入法及數列</p>
      </div>

      <CollapsibleSection id="math-translation" title="1. 中文句子 ↔ 數式" num={1} color="emerald" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-6">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">💡 秘訣</h3>
            <p className="text-slate-700">數字 / 英文字不用變，中文字變做數學文字。</p>
          </div>

          <section id="sim-eq-word" className="bg-emerald-50 rounded-xl p-5 border-2 border-emerald-200 scroll-mt-24">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-emerald-600 text-white font-black text-lg px-3 py-1 rounded-lg">文字題</span>
              <h2 className="text-lg font-bold text-emerald-800">文字轉數式 (組件)</h2>
            </div>

            <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-emerald-100 text-emerald-800 text-sm">
                    <th className="py-3 px-4 font-bold border-b border-emerald-200 w-1/2">關鍵字</th>
                    <th className="py-3 px-4 font-bold border-b border-emerald-200 w-1/2">列式</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700 divide-y divide-emerald-50">
                  {cheatsheet.map((item, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{item.key}</td>
                      <td className="py-3 px-4 font-sans text-blue-700 bg-blue-50/50 rounded-r-lg">
                        <span className="bg-blue-100 px-3 py-1 rounded-full inline-flex items-center">
                          <Latex math={item.latex} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-teal-50 rounded-xl p-5 border-2 border-teal-200 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-teal-600 text-white font-black text-lg px-3 py-1 rounded-lg">文字題</span>
              <h2 className="text-lg font-bold text-teal-800">常見題目句式結構</h2>
            </div>

            <div className="bg-white rounded-xl border border-teal-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-teal-100 text-teal-800 text-sm">
                    <th className="py-3 px-4 font-bold border-b border-teal-200 w-[55%]">關鍵詞組 (題目)</th>
                    <th className="py-3 px-4 font-bold border-b border-teal-200 w-[45%]">列式 (答案)</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base divide-y divide-teal-100">
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="py-4 px-4 text-slate-700 leading-loose">
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-blue-100 text-blue-800">A</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-rose-100 text-rose-800">比</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-amber-100 text-amber-800">B</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-emerald-100 text-emerald-800">多</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-purple-100 text-purple-800">6</span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-sans leading-loose whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="A" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 mx-0.5"><Latex math="=" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800"><Latex math="B" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 mx-0.5"><Latex math="+" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-purple-100 text-purple-800"><Latex math="6" /></span>
                    </td>
                  </tr>

                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="py-4 px-4 text-slate-700 leading-loose">
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-blue-100 text-blue-800">A 和 B 之和 / 總值</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-rose-100 text-rose-800">是</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-purple-100 text-purple-800">24</span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-sans leading-loose whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="A+B" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 mx-0.5"><Latex math="=" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-purple-100 text-purple-800"><Latex math="24" /></span>
                    </td>
                  </tr>

                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="py-4 px-4 text-slate-700 leading-loose">
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-blue-100 text-blue-800">A</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-rose-100 text-rose-800">是</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-amber-100 text-amber-800">B 的 5 倍</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-emerald-100 text-emerald-800">多</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-purple-100 text-purple-800">25</span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-sans leading-loose whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="A" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 mx-0.5"><Latex math="=" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800"><Latex math="5B" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 mx-0.5"><Latex math="+" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-purple-100 text-purple-800"><Latex math="25" /></span>
                    </td>
                  </tr>

                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="py-4 px-4 text-slate-700 leading-loose">
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-blue-100 text-blue-800">A</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-rose-100 text-rose-800">是</span>
                      <span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-amber-100 text-amber-800">B 的 1/3</span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-sans leading-loose whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="A" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 mx-0.5"><Latex math="=" /></span>
                      <span className="inline-block px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800"><Latex math="B\times\dfrac{1}{3}" /></span>
                    </td>
                  </tr>

                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="py-4 px-4 text-slate-700 leading-loose">
                      購買了<span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-purple-100 text-purple-800">10 個</span>蘋果和香蕉，其中有<span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-blue-100 text-blue-800">x 個</span><span className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-bold bg-red-100 text-red-800">蘋果</span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-sans leading-loose">
                      <div className="mb-2 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded font-bold bg-red-100 text-red-800">蘋果</span>
                        <span className="inline-block px-2 py-0.5 rounded font-bold mx-0.5">=</span>
                        <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="x" /></span>
                      </div>
                      <div className="whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800">香蕉</span>
                        <span className="inline-block px-2 py-0.5 rounded font-bold mx-0.5">=</span>
                        <span className="inline-block px-2 py-0.5 rounded font-bold bg-purple-100 text-purple-800"><Latex math="10" /></span>
                        <span className="inline-block px-2 py-0.5 rounded font-bold mx-0.5">−</span>
                        <span className="inline-block px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800"><Latex math="x" /></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 mt-2">
            <h4 className="font-bold text-purple-800 mb-2">⚠️ 注意事項</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-700 font-bold mb-1">註 1：基本運算字元</p>
                <ul className="text-sm text-slate-700 pl-4 space-y-1">
                  <li><span className="text-emerald-700 font-bold">和</span> <Latex math="\rightarrow +" /></li>
                  <li><span className="text-emerald-700 font-bold">差</span> <Latex math="\rightarrow −" /></li>
                  <li><span className="text-emerald-700 font-bold">積</span> <Latex math="\rightarrow \times" /></li>
                  <li><span className="text-emerald-700 font-bold">商</span> <Latex math="\rightarrow \div" /></li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-slate-700 font-bold mb-1">註 2：出現<span className="text-red-600 mx-1">「的結果」</span>字眼 <Latex math="\rightarrow" /> 即加括號</p>
                <div className="bg-white p-2 rounded border border-purple-100 text-sm mt-1">
                  <p className="mb-1">e.g. <Latex math="x" /> 乘以 2 減 y 的<span className="text-blue-600 font-bold border-b border-blue-600">結果</span></p>
                  <p className="text-emerald-700 font-bold"><Latex math="= x(2−y)" /> <span className="text-red-600 text-xs ml-2 font-bold">← 要加括號</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="substitution" title="2. 代入法" num={2} color="emerald" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-800 mb-2">🎯 認位置，代數字 (加括號代)</h3>
            <p className="text-sm text-slate-700">代入時<span className="font-bold underline">必須加括號</span>，否則有機會答案錯（尤其負數的次方）。</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-slate-800 font-bold mb-3">
                e.g. <Latex math="y = 50 − x" /> ， 若 <span className="bg-yellow-200 px-1 rounded"><Latex math="x = 40" /></span> ，求 <Latex math="y" /> 的值。
              </p>
              <div className="pl-6 font-bold text-slate-700 [&>span]:!text-left">
                <Latex math={String.raw`\begin{aligned} y &= 50 − \textcolor{#2563eb}{(40)} \\ y &= 10 \end{aligned}`} block />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 relative">
              <p className="text-slate-800 font-bold mb-3">
                e.g. <Latex math="H = k^2 − 1" /> ， 若 <span className="bg-yellow-200 px-1 rounded"><Latex math="k = -4" /></span> ，求 <Latex math="H" /> 的值。
              </p>
              <div className="pl-6 font-bold text-slate-700 [&>span]:!text-left">
                <Latex math={String.raw`\begin{aligned} H &= \colorbox{#fef08a}{(−4)}^2 − 1 \\ &= 16 − 1 \\ &= 15 \end{aligned}`} block />
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block bg-red-50 p-3 rounded-lg border border-red-200">
                <p className="text-xs text-red-800 font-bold mb-1 border-b border-red-200 pb-1">括號的分別：</p>
                <p className="text-sm font-bold text-slate-700"><Latex math="(−4)^2 = +16" /> <span className="text-green-600 ml-1">✓</span></p>
                <p className="text-sm font-bold text-slate-700"><Latex math="−4^2 = −16" /> <span className="text-red-500 ml-1">×</span></p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-slate-800 font-bold mb-3">
                e.g. <Latex math="T = (n − 1)d" /> ， 若 <span className="bg-yellow-200 px-1 rounded"><Latex math="n = 4" /></span> 和 <span className="bg-green-200 px-1 rounded"><Latex math="d = -2" /></span> ，求 <Latex math="T" /> 的值。
              </p>
              <div className="pl-6 font-bold text-slate-700 [&>span]:!text-left">
                <Latex math={String.raw`\begin{aligned} T &= (\colorbox{#fef08a}{4} − 1)\colorbox{#bbf7d0}{(−2)} \\ &= −6 \end{aligned}`} block />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="sequence" title="3. 數列" num={3} color="emerald" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-blue-800 mb-4 border-b pb-2 text-lg">考法 1：列出數列</h3>
            
            <div className="space-y-6">
              <div>
                <p className="font-bold text-slate-700 mb-2">例 1：</p>
                <div className="flex items-center gap-6 pl-4 flex-wrap">
                  <div className="relative pt-2 pb-6 min-w-[300px]">
                    <div className="flex text-xl font-bold text-slate-800 items-baseline">
                      {[
                        { v: "7", c: true, a: "−3", w: "w-6" },
                        { v: "4", c: true, a: "−3", w: "w-6" },
                        { v: "1", c: true, a: "−3", w: "w-6" },
                        { v: "−2", c: true, a: "−3", w: "w-8" },
                        { v: "−5", c: true, w: "w-8", h: true },
                        { v: "−8", c: false, w: "w-8", h: true }
                      ].map((item, i) => (
                        <React.Fragment key={i}>
                          <span className={`inline-block ${item.w} text-center ${item.h ? 'text-purple-600 border-b-2 border-purple-600' : ''}`}>
                            {item.v}
                          </span>
                          {item.c && (
                            <div className="w-8 relative flex justify-center">
                              <span>,</span>
                              {item.a && (
                                <div className="absolute top-6 w-14 flex flex-col items-center text-sm text-purple-700 font-bold z-10 pointer-events-none">
                                  <svg viewBox="0 0 44 16" className="w-full h-4 overflow-visible" aria-hidden="true">
                                    <path d="M2 2 C 14 14, 30 14, 42 2" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M 35 3 L 42 2 L 41 9" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <span className="mt-1 leading-none text-center">{item.a}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="text-indigo-800 font-bold bg-indigo-50 px-3 py-1.5 rounded-lg mt-6">
                    發現規律為「不斷減去 3」
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-700 mb-2 pt-6">例 2：</p>
                <div className="flex items-center gap-6 pl-4 flex-wrap">
                  <div className="relative pt-2 pb-6 min-w-[300px]">
                    <div className="flex text-xl font-bold text-slate-800 items-baseline">
                      {[
                        { v: "2", c: true, a: "×2", w: "w-6" },
                        { v: "4", c: true, a: "×2", w: "w-6" },
                        { v: "8", c: true, a: "×2", w: "w-6" },
                        { v: "16", c: true, a: "×2", w: "w-8" },
                        { v: "32", c: true, w: "w-8", h: true },
                        { v: "64", c: false, w: "w-8", h: true }
                      ].map((item, i) => (
                        <React.Fragment key={i}>
                          <span className={`inline-block ${item.w} text-center ${item.h ? 'text-purple-600 border-b-2 border-purple-600' : ''}`}>
                            {item.v}
                          </span>
                          {item.c && (
                            <div className="w-8 relative flex justify-center">
                              <span>,</span>
                              {item.a && (
                                <div className="absolute top-6 w-14 flex flex-col items-center text-sm text-purple-700 font-bold z-10 pointer-events-none">
                                  <svg viewBox="0 0 44 16" className="w-full h-4 overflow-visible" aria-hidden="true">
                                    <path d="M2 2 C 14 14, 30 14, 42 2" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M 35 3 L 42 2 L 41 9" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <span className="mt-1 leading-none text-center">{item.a}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="text-indigo-800 font-bold bg-indigo-50 px-3 py-1.5 rounded-lg mt-6">
                    發現規律為「不斷 ×2」
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-blue-800 mb-4 border-b pb-2 text-lg">考法 2：列出首幾項 / 找特定項</h3>
            
            <div className="bg-green-50 p-3 rounded-lg border border-green-200 mb-4 inline-block">
              <p className="font-bold text-green-800">定義：<Latex math="a_3" /> <Latex math="=" /> 第三項</p>
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-bold text-slate-800 mb-2">例：列出數列 <Latex math="a_{\colorbox{#fef08a}{n}} = \colorbox{#fef08a}{n} + 2" /> 的首 4 項</p>
                <div className="pl-6 font-bold text-slate-700 space-y-1">
                  <p><Latex math="a_1 = " /><span className="bg-yellow-200 px-1 rounded"><Latex math="1" /></span><Latex math=" + 2 = 3" /></p>
                  <p><Latex math="a_2 = " /><span className="bg-yellow-200 px-1 rounded"><Latex math="2" /></span><Latex math=" + 2 = 4" /></p>
                  <p><Latex math="a_3 = " /><span className="bg-yellow-200 px-1 rounded"><Latex math="3" /></span><Latex math=" + 2 = 5" /></p>
                  <p><Latex math="a_4 = " /><span className="bg-yellow-200 px-1 rounded"><Latex math="4" /></span><Latex math=" + 2 = 6" /></p>
                </div>
              </div>
              
              <hr className="border-slate-100" />

              <div>
                <p className="font-bold text-slate-800 mb-2">例：數列 <Latex math="3a + 1" /> 的第 21 項是？</p>
                <div className="pl-6 font-bold text-slate-700 space-y-2 mt-4">
                  <div className="grid grid-cols-[72px_auto] items-baseline">
                    <span>第 21 項</span>
                    <div>
                      <Latex math="= 3" /><span className="bg-yellow-200 px-1 rounded"><Latex math="(21)" /></span><Latex math=" + 1" />
                      <span className="ml-3 text-sm text-green-700 font-bold whitespace-nowrap">← 利用代入法 <Latex math="a=21" /></span>
                    </div>
                  </div>
                  <div className="grid grid-cols-[72px_auto] items-baseline">
                    <span></span>
                    <Latex math="= 64" />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div>
                <p className="font-bold text-slate-800 mb-2">例：數列 <Latex math="\frac{a^2 + 2}{2a − 3}" /> 的第 5 項是？</p>
                <div className="pl-6 font-bold text-slate-700 space-y-2 mt-4 relative">
                  <div className="absolute left-[100px] -top-5 text-sm text-green-700 font-bold whitespace-nowrap">a 代 5 ↓</div>
                  <p>第 5 項 <Latex math="= \frac{\color{red}(\color{red}5\color{red})^2 + 2}{2\color{red}(\color{red}5\color{red}) − 3}" /> <Latex math="= \frac{27}{7}" /></p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

export const RateRatioNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null), s6 = useRef(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH14 率與比</h1>
        <p className="text-slate-600">單位轉換、率與比、連比、比例圖與正反比</p>
      </div>

      {/* 1. 單位轉換 */}
      <CollapsibleSection id="unit-conversion" title="1. 單位轉換" num={1} color="slate" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200 flex flex-col items-center shadow-sm relative">
              <h3 className="font-bold text-slate-800 w-full mb-3">1.A 長度單位</h3>
              <div className="flex items-center space-x-8">
                <ul className="text-slate-700 space-y-2 font-sans text-lg">
                  <li>1 m = 100 cm</li>
                  <li>1 km = 1000 m</li>
                  <li>1 cm = 10 mm</li>
                </ul>
                
                <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded">
                  <div className="flex flex-col space-y-2 text-green-700 font-bold text-md text-right">
                    <span>mm 毫米</span>
                    <span>cm 厘米</span>
                    <span>m 米</span>
                    <span>km 公里</span>
                  </div>
                  <div className="relative flex flex-col items-center justify-between h-32 ml-4">
                    <div className="text-red-600 font-bold absolute -top-4">小</div>
                    <div className="w-0.5 h-full bg-red-600 my-1 relative">
                        <div className="absolute -top-1 -left-1 text-red-600">▲</div>
                        <div className="absolute -bottom-1 -left-1 text-red-600">▼</div>
                    </div>
                    <div className="text-red-600 font-bold absolute -bottom-4">大</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3">1.B 重量單位</h3>
                <ul className="text-slate-700 space-y-2 font-sans text-lg">
                  <li>1 kg = 1000 g</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3">1.C 時間單位</h3>
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 text-slate-700 font-sans text-[15px] whitespace-nowrap">
                  <div>
                    <p>1 年 = 365 天</p>
                    <p>1 天 (D) = 24 小時</p>
                  </div>
                  <div>
                    <p>1 小時 <span className="text-green-700">(h)</span> = 60 分鐘</p>
                    <p>1 分鐘 <span className="text-green-700">(min)</span> = 60 秒 <span className="text-green-700">(s)</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 率 */}
      <CollapsibleSection id="rate" title="2. 率 (Rate)" num={2} color="blue" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
             <div className="flex flex-col space-y-2">
               <p><span className="text-red-600 font-bold text-lg">率</span>：兩種<span className="font-bold">不同</span>的單位比較</p>
               <p><span className="text-red-800 font-bold text-lg">比</span>：兩種<span className="font-bold">相同</span>的單位比較</p>
             </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 relative pt-10">
            <h3 className="font-bold text-slate-800 mb-3">例子：率的符號與計算</h3>
            {/* 手動微調坐標：改 top / left 數值 */}
            <p
              className="absolute text-sm text-green-700 font-bold whitespace-nowrap"
              style={{ top: '40px', left: '50%', transform: 'translateX(-50%)' }}
            >
              率會出現這個符號
            </p>
            <p className="mb-4 text-lg text-center">
              例子：<span className="text-blue-800 font-bold">m</span>{' '}
              <span className="relative inline-flex text-green-600 border border-green-600 rounded-full py-0.5 px-1 font-bold">
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-green-700 text-base font-bold">↓</span>/
              </span>{' '}
              <span className="text-blue-800 font-bold">s</span> ， <span className="text-blue-800 font-bold">$</span>{' '}
              <span className="relative inline-flex text-green-600 border border-green-600 rounded-full py-0.5 px-1 font-bold">
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-green-700 text-base font-bold">↓</span>/
              </span>{' '}
              <span className="text-blue-800 font-bold border-b-2 border-transparent">小時</span>
            </p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="mb-4 text-slate-700 text-lg whitespace-normal leading-relaxed">
                e.g. 工作了 <span className="bg-yellow-300 px-1 font-bold">10小時</span>，總工資是 <span className="bg-pink-300 px-1 font-bold text-blue-800">$ 500</span>。以 <span className="border-b-2 border-red-500 font-bold"><span className="text-pink-600">$</span> / <span className="bg-yellow-300 px-1">小時</span></span> 表達時薪。
                <span className="inline-block relative">
                    <span className="absolute -top-4 -left-12 text-xs text-purple-700 whitespace-nowrap">$ 500 ÷ 10小時</span>
                </span>
              </p>
              
              <div className="pl-4 border-l-4 border-red-400 space-y-4 font-sans text-[17px]">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 border border-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">1</span>
                  <div>
                    <p className="text-red-600 font-bold font-sans">按照單位寫相應數字</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="text-red-500 border border-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">2</span>
                  <div>
                    <p className="text-red-600 font-bold font-sans">計算：</p>
                    <p className="text-blue-800 font-bold">答： 500 ÷ 10 = 50 ∴ $50 / 小時</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 比 */}
      <CollapsibleSection id="ratio" title="3. 比 (Ratio)" num={3} color="purple" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <p className="text-green-700 font-bold mb-4 text-lg">比會出現冒號</p>
            <div className="flex flex-col md:flex-row gap-8 items-start text-lg text-blue-800">
              <div>
                <p className="mb-2">例子： 10 <span className="text-green-600 border border-green-600 rounded-full px-1 font-bold">:</span> 60</p>
                <div className="flex items-center gap-4 ml-8">
                  <div className="text-red-600 font-bold text-sm text-right font-sans">
                    <p>以計算機</p>
                    <p>分數功能約簡</p>
                  </div>
                  <div>
                    <p><Latex math="\frac{10}{60} = \frac{1}{6}" /></p>
                    <p className="text-red-600 font-bold text-center mt-1 text-xl">1 : 6</p>
                  </div>
                </div>
              </div>
              <div>
                <p>0.6 <span className="text-green-600 border border-green-600 rounded-full px-1 font-bold">:</span> 0.8</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 font-sans text-[17px]">
            <p className="mb-4 text-slate-800 font-sans">例：一條繩長 28cm，按 2:5 比例分開兩部份，求較長的部份。</p>
            <div className="space-y-4 text-blue-900 font-bold">
              <div className="flex items-center gap-2 font-sans">
                <span>答：較長的比例：</span>
                <div className="flex flex-col items-center">
                   <div className="border-b border-blue-900 px-1">5</div>
                   <div className="text-xs">2+5</div>
                </div>
                <span>=</span>
                <Latex math="\frac{5}{7}" />
              </div>
              <div className="pl-12 font-sans">
                <p>28 × <Latex math="\frac{5}{7}" /></p>
                <p>= 20</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200 text-center">
            <p className="text-red-700 font-bold text-lg tracking-wide">解決比例問題時，或需用 <span className="border-b-2 border-red-500 pb-1">交叉相乘！</span></p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. 連比 */}
      <CollapsibleSection id="continued-ratio" title="4. 連比" num={4} color="indigo" activeSub={activeSub} sectionRef={s4}>
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="text-green-700 font-bold text-lg">連比 (不能用計算機約簡)</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm overflow-x-auto text-[17px]">
            <div className="mb-4 flex items-center font-sans">
              <div className="text-blue-800">e.g. <span className="bg-yellow-300 font-bold"><Latex math="a" /></span> <Latex math=":" /> <span className="bg-pink-300 font-bold px-1"><Latex math="b" /></span> <Latex math=":" /> <span className="bg-green-300 font-bold px-1"><Latex math="c" /></span> <Latex math="=" /> <span className="bg-yellow-300 font-bold px-1"><Latex math="4" /></span> <Latex math=":" /> <span className="bg-pink-300 font-bold px-1"><Latex math="5" /></span> <Latex math=":" /> <span className="bg-green-300 font-bold px-1"><Latex math="6" /></span></div>
              <span className="mx-4 font-bold text-2xl">⇒</span>
              <div className="inline-block align-middle space-y-1 bg-slate-50 p-2 rounded">
                <div><span className="bg-yellow-300 font-bold px-1"><Latex math="a" /></span> <Latex math=":" /> <span className="bg-green-300 font-bold px-1"><Latex math="c" /></span> <Latex math="=" /> <span className="bg-yellow-300 font-bold px-1"><Latex math="4" /></span> <Latex math=":" /> <span className="bg-green-300 font-bold px-1"><Latex math="6" /></span></div>
                <div><span className="bg-pink-300 font-bold px-1"><Latex math="b" /></span> <Latex math=":" /> <span className="bg-green-300 font-bold px-1"><Latex math="c" /></span> <Latex math="=" /> <span className="bg-pink-300 font-bold px-1"><Latex math="5" /></span> <Latex math=":" /> <span className="bg-green-300 font-bold px-1"><Latex math="6" /></span></div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="mb-6 font-bold text-blue-900 text-lg font-sans flex flex-wrap gap-2 items-center">
              <span>e.g. <span className="bg-yellow-300 px-1"><Latex math="a" /></span> <Latex math=":" /> <span className="bg-green-300 px-1"><Latex math="c" /></span> <Latex math="=" /> <span className="bg-yellow-300 px-1"><Latex math="7" /></span> <Latex math=":" /> <span className="bg-green-300 px-1"><Latex math="6" /></span> ,</span>
              <span><span className="bg-pink-300 px-1"><Latex math="b" /></span> <Latex math=":" /> <span className="bg-green-300 px-1"><Latex math="c" /></span> <Latex math="=" /> <span className="bg-pink-300 px-1"><Latex math="3" /></span> <Latex math=":" /> <span className="bg-green-300 px-1"><Latex math="4" /></span> ,</span>
              <span>求 <Latex math="a:b:c" /></span>
            </p>
            
            <div className="space-y-8 pl-2 sm:pl-8">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 flex flex-col items-center">
                  <span className="text-red-500 font-bold border-2 border-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  <span className="text-green-700 font-bold text-sm mt-1">圖表找</span>
                  <span className="text-green-700 font-bold text-sm">答案</span>
                  <span className="text-red-500 mt-2 font-bold inline-block text-2xl leading-none scale-y-150 origin-top">↓</span>
                </div>
                <div className="font-sans text-xl text-blue-900 font-bold relative pr-[100px]">
                  <div className="grid grid-cols-[2.25rem_1rem_2.25rem_1rem_2.25rem] border-b-2 border-blue-900 pb-1 mb-1 px-2 items-center">
                    <span className="text-center"><Latex math="a" /></span><span className="text-center"><Latex math=":" /></span>
                    <span className="text-center"><Latex math="b" /></span><span className="text-center"><Latex math=":" /></span>
                    <span className="text-center relative"><Latex math="c" />
                      <div className="absolute -inset-1 border-2 border-purple-500 rounded-full h-[110px] w-10 -left-1 top-0 pointer-events-none"></div>
                    </span>
                  </div>
                  <div className="grid grid-cols-[2.25rem_1rem_2.25rem_1rem_2.25rem] px-2 items-center">
                    <span className="text-center"><Latex math="7" /></span><span><Latex math=":" /></span>
                    <span className="text-center"></span><span></span>
                    <span className="text-center"><Latex math="6" /></span>
                  </div>
                  <div className="grid grid-cols-[2.25rem_1rem_2.25rem_1rem_2.25rem] px-2 tracking-widest items-center">
                    <span className="text-center"></span><span></span>
                    <span className="text-center"><Latex math="3" /></span><span className="text-center"><Latex math=":" /></span>
                    <span className="text-center"><Latex math="4" /></span>
                  </div>
                  <div className="absolute right-4 -bottom-0.5 text-sm text-purple-700 font-bold whitespace-nowrap font-sans">↖ 重疊變相同</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 flex flex-col items-center">
                  <span className="text-red-500 font-bold border-2 border-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  <span className="text-red-500 mt-6 font-bold inline-block text-2xl leading-none scale-y-150 origin-top">↓</span>
                </div>
                <div className="font-sans text-xl text-blue-900 font-bold relative pr-[140px]">
                  <div className="grid grid-cols-[3.25rem_1rem_3.25rem_1rem_3.25rem] border-b-2 border-blue-900 pb-1 mb-1 px-2 items-center">
                    <span className="text-center"><Latex math="a" /></span><span className="text-center"><Latex math=":" /></span>
                    <span className="text-center"><Latex math="b" /></span><span className="text-center"><Latex math=":" /></span>
                    <span className="text-center text-green-600"><Latex math="c" /></span>
                  </div>
                  <div className="grid grid-cols-[3.25rem_1rem_3.25rem_1rem_3.25rem] px-2 items-center">
                    <span className="text-center"><Latex math="7" /><span className="text-red-600 font-bold"><Latex math="\times 4" /></span></span><span><Latex math=":" /></span>
                    <span className="text-center"></span><span></span>
                    <span className="text-center bg-green-200 rounded"><Latex math="6" /><span className="text-red-600 font-bold"><Latex math="\times 4" /></span></span>
                  </div>
                  <div className="grid grid-cols-[3.25rem_1rem_3.25rem_1rem_3.25rem] px-2 mt-1 items-center">
                    <span className="text-center"></span><span></span>
                    <span className="text-center"><Latex math="3" /><span className="text-red-600 font-bold"><Latex math="\times 6" /></span></span><span className="text-center"><Latex math=":" /></span>
                    <span className="text-center bg-green-200 rounded"><Latex math="4" /><span className="text-red-600 font-bold"><Latex math="\times 6" /></span></span>
                  </div>
                  <div className="absolute right-9 top-[36px] text-purple-700 font-bold text-base whitespace-nowrap font-sans flex items-center">
                    <span className="text-[56px] font-normal leading-[0.85] mr-1">{"}"}</span>← 互乘做大
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 flex justify-center">
                  <span className="text-red-500 font-bold border-2 border-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                </div>
                <div className="font-sans text-xl text-blue-900 font-bold">
                  <div className="inline-grid grid-cols-[2rem_1rem_2rem_1rem_2rem] gap-x-4 border-b-2 border-blue-900 pb-1 mb-1 px-2">
                    <span className="w-8 text-center"><Latex math="a" /></span><span><Latex math=":" /></span>
                    <span className="w-8 text-center"><Latex math="b" /></span><span><Latex math=":" /></span>
                    <span className="w-8 text-center"><Latex math="c" /></span>
                  </div>
                  <div className="grid grid-cols-[2rem_1rem_2rem_1rem_2rem] gap-x-4 px-2 mb-2 text-xl">
                    <span className="w-8 text-center"><Latex math="28" /></span><span><Latex math=":" /></span>
                    <span className="w-8 text-center"><Latex math="18" /></span><span><Latex math=":" /></span>
                    <span className="w-8 text-center"><Latex math="24" /></span>
                  </div>
                  <div className="flex items-center gap-4 px-2 relative font-sans text-xl mt-2">
                    <span className="absolute -left-6 font-sans"><Latex math="=" /></span>
                    <div className="grid grid-cols-[2rem_1rem_2rem_1rem_2rem] gap-x-4">
                      <span className="w-8 text-center font-sans"><Latex math="14" /></span><span className="font-sans"><Latex math=":" /></span>
                      <span className="w-8 text-center font-sans"><Latex math="9" /></span><span className="font-sans"><Latex math=":" /></span>
                      <span className="w-8 text-center font-sans"><Latex math="12" /></span>
                    </div>
                    <span className="ml-2 text-purple-700 text-sm font-bold whitespace-nowrap leading-5">{'← '}連比需約簡 (需3個數字同時約)</span>
                  </div>
                </div>
              </div>
              
              <div className="text-blue-900 font-bold text-xl mt-4 pt-4 font-sans">
                ∴ <Latex math="a:b:c=14:9:12" />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 text-lg">
            <h4 className="font-bold text-green-700 mb-2 font-sans">💡 小技巧</h4>
            <div className="text-blue-900 font-sans">
              <p>若 <span className="font-bold"><Latex math="3" /><span className="bg-yellow-300 px-1"><Latex math="a" /></span> <Latex math="=" /> <Latex math="7" /><span className="bg-pink-300 px-1"><Latex math="b" /></span></span></p>
              <p className="mt-2"><span className="bg-yellow-300 px-1 font-bold"><Latex math="a" /></span> <Latex math=":" /> <span className="bg-pink-300 px-1 font-bold"><Latex math="b" /></span> <Latex math="=" /> <span className="bg-yellow-300 font-bold px-1 text-black"><Latex math="7" /></span> <Latex math=":" /> <span className="bg-pink-300 font-bold px-1 text-black"><Latex math="3" /></span> <span className="text-slate-600 ml-4 text-sm font-sans">(<Latex math="3\times 7=7\times 3" />)</span></p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. 比例圖 */}
      <CollapsibleSection id="scale" title="5. 比例圖" num={5} color="amber" activeSub={activeSub} sectionRef={s5}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-4 font-bold text-xl mb-4 text-slate-800">
              <span className="font-sans">比例尺</span>
              <span className="text-green-600 text-2xl">→</span>
              <div className="flex flex-col items-center font-sans">
                <span>1 : n</span>
                <span className="text-red-600 text-sm font-sans mt-1"><span className="border border-red-600 p-0.5 rounded">圖</span>的長度 : <span className="text-red-600 font-bold">實際</span>長度</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
              <p className="font-bold text-slate-800 mb-4 font-sans text-lg">- 思考實際比圖 <span className="text-xl">大還是小？</span></p>
              <div className="space-y-6 pl-4 font-sans text-lg">
                <div className="flex items-center gap-4">
                  <span className="font-bold w-24">實際較大</span>
                  <span className="text-green-700 font-bold">→</span>
                  <div className="flex items-center gap-2 text-green-700">
                    <span className="text-purple-700 font-bold text-xl px-2">×</span>
                    <span className="font-bold tracking-widest">乘數 變大</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold w-24">實際較小</span>
                  <span className="text-green-700 font-bold">→</span>
                  <div className="flex items-center gap-2 text-green-700">
                    <span className="text-purple-700 font-bold text-xl font-sans px-2">÷</span>
                    <span className="font-bold tracking-widest">除數 縮小</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 6. 正比/反比 */}
      <CollapsibleSection id="proportion" title="6. 正比/反比" num={6} color="rose" activeSub={activeSub} sectionRef={s6}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-6 text-lg tracking-wide">- 認清情況是正比 / 反比</h3>
            
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center bg-rose-50 p-4 rounded-lg">
                <div className="font-bold text-xl min-w-[80px]">正比：</div>
                <div className="min-w-[100px] text-center md:text-left text-lg">
                  <p>兩個數字</p>
                  <p>相同方向</p>
                </div>
                <div className="flex-1 text-green-600 font-bold text-xl leading-relaxed flex flex-col items-center font-sans">
                  <p>A ↑ B ↑</p>
                  <p className="text-red-600">A ↓ B ↓</p>
                </div>
                <div className="flex-1 text-lg flex items-center gap-2 font-bold justify-center">
                  公式： <Latex math="\frac{y}{x} = k" className="text-red-600" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center bg-blue-50 p-4 rounded-lg">
                <div className="font-bold text-xl min-w-[80px]">反比：</div>
                <div className="min-w-[100px] text-center md:text-left text-lg">
                  <p>兩個數字</p>
                  <p>相反方向</p>
                </div>
                <div className="flex-1 text-green-600 font-bold text-xl leading-relaxed flex flex-col items-center font-sans">
                  <p>A ↑ <span className="text-red-600">B ↓</span></p>
                  <p className="text-red-600">A ↓ <span className="text-green-600">B ↑</span></p>
                </div>
                <div className="flex-1 text-xl flex items-center gap-2 font-bold justify-center font-sans">
                  <span className="font-sans">公式：</span> <Latex math="xy = k" />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-5 space-y-4">
                <h4 className="font-bold text-slate-800 text-lg">例子說明：</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                    <p className="font-bold text-rose-800 mb-2">正比例子</p>
                    <div className="text-slate-700 border-l-4 border-rose-300 pl-3 mb-3">
                      <p className="font-bold text-rose-800">題目</p>
                      <p>已知 <Latex math="y" /> 與 <Latex math="x" /> 成正比。當 <Latex math="x=3" /> 時，<Latex math="y=33" />。求當 <Latex math="x=10" /> 時的 <Latex math="y" /> 值。</p>
                    </div>
                    <div className="border-t border-rose-200 pt-2 text-slate-700">
                      <p className="font-bold text-rose-800">答案</p>
                      <Latex math={String.raw`\begin{aligned} \frac{y}{x} &= \frac{33}{3} \\ \frac{y}{10} &= 11 \\ y &= 110 \end{aligned}`} block left />
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-bold text-blue-800 mb-2">反比例子</p>
                    <div className="text-slate-700 border-l-4 border-blue-300 pl-3 mb-3">
                      <p className="font-bold text-blue-800">題目</p>
                      <p>已知 <Latex math="y" /> 與 <Latex math="x" /> 成反比。當 <Latex math="x=4" /> 時，<Latex math="y=5" />。求當 <Latex math="x=10" /> 時的 <Latex math="y" /> 值。</p>
                    </div>
                    <div className="border-t border-blue-200 pt-2 text-slate-700">
                      <p className="font-bold text-blue-800">答案</p>
                      <Latex math={String.raw`\begin{aligned} xy &= 4 \times 5 \\ 10y &= 4 \times 5 \\ 10y &= 20 \\ y &= 2 \end{aligned}`} block left />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};

const CorrespondingPartsSVG = () => {
  // A(80,40), B(30,150), C(160,150)
  // P(280,40), Q(230,150), R(360,150)
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto bg-white rounded-lg">
      {/* 紫色角 B & Q (2 arcs) */}
      {[20, 26].map(r => (
        <React.Fragment key={r}>
          <path d={`M ${30 + r} 150 A ${r} ${r} 0 0 0 ${30 + r * 50 / 120.8} ${150 - r * 110 / 120.8}`} stroke="#a855f7" strokeWidth="2" fill="none" />
          <path d={`M ${230 + r} 150 A ${r} ${r} 0 0 0 ${230 + r * 50 / 120.8} ${150 - r * 110 / 120.8}`} stroke="#a855f7" strokeWidth="2" fill="none" />
        </React.Fragment>
      ))}

      {/* A / P 綠色角弧 (3 arcs) */}
      {/* A(80,40) to B(30,150) vector is (-50, 110), R=25/30/35 */}
      {/* A(80,40) to C(160,150) vector is (80, 110) */}
      {[25, 30, 35].map(r => (
        <React.Fragment key={r}>
          <path d={`M ${80 - 50*r/120.8} ${40 + 110*r/120.8} A ${r} ${r} 0 0 0 ${80 + 80*r/136} ${40 + 110*r/136}`} stroke="#22c55e" strokeWidth="2" fill="none" />
          <path d={`M ${280 - 50*r/120.8} ${40 + 110*r/120.8} A ${r} ${r} 0 0 0 ${280 + 80*r/136} ${40 + 110*r/136}`} stroke="#22c55e" strokeWidth="2" fill="none" />
        </React.Fragment>
      ))}

      {/* C / R 灰色角弧 (1 arc) */}
      <path d="M 135 150 A 25 25 0 0 1 145.2 129.6" stroke="#64748b" strokeWidth="3" fill="none" />
      <path d="M 335 150 A 25 25 0 0 1 345.2 129.6" stroke="#64748b" strokeWidth="3" fill="none" />

      {/* Triangles */}
      <path d="M 80,40 L 30,150 L 160,150 Z" stroke="#334155" strokeWidth="2.5" fill="none" />
      <path d="M 280,40 L 230,150 L 360,150 Z" stroke="#334155" strokeWidth="2.5" fill="none" />

      {/* 標記 AB / PQ (1 red tick) */}
      <line x1="43" y1="92" x2="67" y2="98" stroke="#ef4444" strokeWidth="2.5" />
      <line x1="243" y1="92" x2="267" y2="98" stroke="#ef4444" strokeWidth="2.5" />

      {/* 標記 BC / QR (2 black ticks) */}
      <line x1="91" y1="140" x2="91" y2="160" stroke="#000" strokeWidth="2" />
      <line x1="99" y1="140" x2="99" y2="160" stroke="#000" strokeWidth="2" />
      <line x1="291" y1="140" x2="291" y2="160" stroke="#000" strokeWidth="2" />
      <line x1="299" y1="140" x2="299" y2="160" stroke="#000" strokeWidth="2" />

      {/* 標記 CA / RP (3 blue ticks) */}
      {[-4, 0, 4].map(offset => (
        <React.Fragment key={offset}>
          <line x1={120 + 8 + offset*0.6} y1={95 - 6 + offset*0.8} x2={120 - 8 + offset*0.6} y2={95 + 6 + offset*0.8} stroke="#3b82f6" strokeWidth="2" />
          <line x1={320 + 8 + offset*0.6} y1={95 - 6 + offset*0.8} x2={320 - 8 + offset*0.6} y2={95 + 6 + offset*0.8} stroke="#3b82f6" strokeWidth="2" />
        </React.Fragment>
      ))}

      {/* Labels */}
      <text x="80" y="30" fontSize="18" fontStyle="italic" textAnchor="middle" fill="#334155">A</text>
      <text x="18" y="155" fontSize="18" fontStyle="italic" textAnchor="middle" fill="#334155">B</text>
      <text x="175" y="155" fontSize="18" fontStyle="italic" textAnchor="middle" fill="#334155">C</text>
      <text x="280" y="30" fontSize="18" fontStyle="italic" textAnchor="middle" fill="#334155">P</text>
      <text x="218" y="155" fontSize="18" fontStyle="italic" textAnchor="middle" fill="#334155">Q</text>
      <text x="375" y="155" fontSize="18" fontStyle="italic" textAnchor="middle" fill="#334155">R</text>
    </svg>
  );
};

const CongruentConditionsSVG = () => {
  return (
    <svg viewBox="0 0 520 720" className="w-full h-auto bg-green-50/50 rounded-lg">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
        </marker>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7" />
        </marker>
        <g id="right-ang">
          <polyline points="0,-12 12,-12 12,0" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
        </g>
      </defs>

      {/* Row 1: SAS */}
      <g transform="translate(0, 0)">
        <text x="20" y="40" fontSize="16" fontWeight="bold" fill="#334155">(a) [簡記 : SAS]</text>
        <text x="140" y="97" fontSize="16" fill="#334155" textAnchor="end" fontWeight="bold">夾角 →</text>
        
        {/* T1 */}
        <path d="M 230,20 L 160,90 L 300,90 Z" fill="rgba(59,130,246,0.1)" stroke="#334155" strokeWidth="2" />
        {/* Left Side Tick (Center: 195, 55, slope of line=-1, normal=1) */}
        <line x1="190" y1="50" x2="200" y2="60" stroke="#0ea5e9" strokeWidth="2" />
        {/* Bottom Side Ticks (Center: 230, 90, vertical normal) */}
        <line x1="227" y1="85" x2="227" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="233" y1="85" x2="233" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        {/* Bottom-left Arc (Center 160, 90, R=20) */}
        <path d="M 180 90 A 20 20 0 0 0 174.1 75.9" fill="none" stroke="#0ea5e9" strokeWidth="2" />
        
        <text x="180" y="55" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold">S</text>
        <text x="230" y="110" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold" textAnchor="middle">S</text>
        <text x="155" y="97" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold" textAnchor="end">A</text>

        {/* T2 */}
        <path d="M 400,20 L 330,90 L 470,90 Z" fill="rgba(59,130,246,0.1)" stroke="#334155" strokeWidth="2" />
        <line x1="360" y1="50" x2="370" y2="60" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="397" y1="85" x2="397" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="403" y1="85" x2="403" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 350 90 A 20 20 0 0 0 344.1 75.9" fill="none" stroke="#0ea5e9" strokeWidth="2" />
      </g>

      {/* Row 2: ASA */}
      <g transform="translate(0, 140)">
        <text x="20" y="40" fontSize="16" fontWeight="bold" fill="#334155">(b) [簡記 : ASA]</text>

        {/* T1 */}
        <path d="M 230,20 L 160,90 L 300,90 Z" fill="rgba(59,130,246,0.1)" stroke="#334155" strokeWidth="2" />
        <line x1="230" y1="85" x2="230" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        {/* Left arc */}
        <path d="M 180 90 A 20 20 0 0 0 174.1 75.9" fill="none" stroke="#0ea5e9" strokeWidth="2" />
        {/* Right double arc */}
        <path d="M 280 90 A 20 20 0 0 1 285.9 75.9" fill="none" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 276 90 A 24 24 0 0 1 283.1 73.0" fill="none" stroke="#0ea5e9" strokeWidth="2" />

        <text x="155" y="97" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold" textAnchor="end">A</text>
        <text x="230" y="110" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold" textAnchor="middle">S</text>
        <text x="305" y="97" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold">A</text>

        <text x="230" y="60" fontSize="14" fill="#334155" textAnchor="middle" fontWeight="bold">夾邊</text>
        <path d="M 230 65 Q 230 80 230 80" fill="none" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" />

        {/* T2 */}
        <path d="M 400,20 L 330,90 L 470,90 Z" fill="rgba(59,130,246,0.1)" stroke="#334155" strokeWidth="2" />
        <line x1="400" y1="85" x2="400" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 350 90 A 20 20 0 0 0 344.1 75.9" fill="none" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 450 90 A 20 20 0 0 1 455.9 75.9" fill="none" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 446 90 A 24 24 0 0 1 453.1 73.0" fill="none" stroke="#0ea5e9" strokeWidth="2" />
      </g>

      {/* Row 3: AAS */}
      <g transform="translate(0, 280)">
        <text x="20" y="40" fontSize="16" fontWeight="bold" fill="#334155">(c) [簡記 : AAS]</text>
        
        {/* T1 */}
        <path d="M 230,20 L 160,90 L 300,90 Z" fill="rgba(59,130,246,0.1)" stroke="#334155" strokeWidth="2" />
        {/* Right Side Tick (Center: 265, 55, slope 1, normal slope -1) */}
        <line x1="260" y1="60" x2="270" y2="50" stroke="#0ea5e9" strokeWidth="2" />
        {/* Top arc (230, 20) */}
        <path d="M 215.9 34.1 A 20 20 0 0 0 244.1 34.1" fill="none" stroke="#0ea5e9" strokeWidth="2" />
        {/* Left double arc */}
        <path d="M 180 90 A 20 20 0 0 0 174.1 75.9" fill="none" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 184 90 A 24 24 0 0 0 176.9 73.0" fill="none" stroke="#0ea5e9" strokeWidth="2" />

        <text x="230" y="17" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold" textAnchor="middle">A</text>
        <text x="155" y="97" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold" textAnchor="end">A</text>
        <text x="275" y="55" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold">S</text>
        <text x="285" y="55" fontSize="15" fill="#334155" fontWeight="bold">← 不是夾邊</text>

        {/* T2 */}
        <path d="M 400,20 L 330,90 L 470,90 Z" fill="rgba(59,130,246,0.1)" stroke="#334155" strokeWidth="2" />
        <line x1="430" y1="60" x2="440" y2="50" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 385.9 34.1 A 20 20 0 0 0 414.1 34.1" fill="none" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 350 90 A 20 20 0 0 0 344.1 75.9" fill="none" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 354 90 A 24 24 0 0 0 346.9 73.0" fill="none" stroke="#0ea5e9" strokeWidth="2" />
      </g>

      {/* Row 4: SSS */}
      <g transform="translate(0, 420)">
        <text x="20" y="40" fontSize="16" fontWeight="bold" fill="#334155">(d) [簡記 : SSS]</text>
        
        {/* T1 */}
        <path d="M 230,20 L 160,90 L 300,90 Z" fill="rgba(59,130,246,0.1)" stroke="#334155" strokeWidth="2" />
        {/* Left 1 */}
        <line x1="190" y1="50" x2="200" y2="60" stroke="#0ea5e9" strokeWidth="2" />
        {/* Right 2 (Center 265, 55, slope 1, normal slope -1) */}
        <line x1="258" y1="58" x2="268" y2="48" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="262" y1="62" x2="272" y2="52" stroke="#0ea5e9" strokeWidth="2" />
        {/* Bottom 3 */}
        <line x1="224" y1="85" x2="224" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="230" y1="85" x2="230" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="236" y1="85" x2="236" y2="95" stroke="#0ea5e9" strokeWidth="2" />

        <text x="180" y="55" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold">S</text>
        <text x="275" y="55" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold">S</text>
        <text x="230" y="110" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold" textAnchor="middle">S</text>

        {/* T2 */}
        <path d="M 400,20 L 330,90 L 470,90 Z" fill="rgba(59,130,246,0.1)" stroke="#334155" strokeWidth="2" />
        <line x1="360" y1="50" x2="370" y2="60" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="428" y1="58" x2="438" y2="48" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="432" y1="62" x2="442" y2="52" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="394" y1="85" x2="394" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="400" y1="85" x2="400" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="406" y1="85" x2="406" y2="95" stroke="#0ea5e9" strokeWidth="2" />
      </g>

      {/* Row 5: RHS */}
      <g transform="translate(0, 560)">
        <text x="20" y="40" fontSize="16" fontWeight="bold" fill="#334155">(e) [簡記 : RHS]</text>
        <text x="140" y="100" fontSize="16" fill="#334155" textAnchor="end" fontWeight="bold">
          <tspan x="140" dy="0">直角不能是夾角</tspan>
        </text>
        
        {/* T1 */}
        {/* Right angled at X=160, Y=90 */}
        <path d="M 160,20 L 160,90 L 300,90 Z" fill="rgba(59,130,246,0.1)" stroke="#334155" strokeWidth="2" />
        <use href="#right-ang" x="160" y="90" />
        {/* Hypotenuse Tick (230, 55, normal dx=-3 dy=6 => inverted to have length 7) */}
        <line x1="227" y1="61" x2="233" y2="49" stroke="#0ea5e9" strokeWidth="2" />
        {/* Bottom Tick (230, 90) */}
        <line x1="230" y1="85" x2="230" y2="95" stroke="#0ea5e9" strokeWidth="2" />
        
        <text x="170" y="110" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold" textAnchor="end">R</text>
        <text x="230" y="45" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold">H</text>
        <text x="230" y="110" fontSize="18" fontStyle="italic" fill="#16a34a" fontWeight="bold" textAnchor="middle">S</text>

        {/* T2 */}
        <path d="M 330,20 L 330,90 L 470,90 Z" fill="rgba(59,130,246,0.1)" stroke="#334155" strokeWidth="2" />
        <use href="#right-ang" x="330" y="90" />
        <line x1="397" y1="61" x2="403" y2="49" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="400" y1="85" x2="400" y2="95" stroke="#0ea5e9" strokeWidth="2" />
      </g>
    </svg>
  );
};

export const CongruentTrianglesNotes = ({ activeSub }) => {
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null);


  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CH12 全等三角形</h1>
        <p className="text-slate-600">全等概念、對應邊角與常用判定條件</p>
      </div>

      {/* 1. 認識概念 全等 */}
      <CollapsibleSection id="concept" title="1. 認識概念 (全等)" num={1} color="blue" activeSub={activeSub} sectionRef={s1}>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-200 shadow-sm flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-slate-800 text-lg">
                <span className="font-bold text-slate-800">全等：</span>
                <span className="text-red-600 font-bold mx-2">形狀</span>和<span className="text-red-600 font-bold mx-2">大小</span>一樣
                <span className="text-blue-800 font-bold ml-2">（邊長 / 角度相等）</span>
              </p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. 連接對應邊/對應角 */}
      <CollapsibleSection id="corresponding-parts" title="2. 連接對應邊 / 對應角" num={2} color="green" activeSub={activeSub} sectionRef={s2}>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-slate-700 mb-4 tex-lg">例如： 考慮以下兩個三角形。</p>
            
            {/* 全等三角形 PQR 與 ABC */}
            <div className="w-full max-w-lg mx-auto mb-4">
              <CorrespondingPartsSVG />
            </div>

            <p className="text-red-600 font-bold text-center mb-6">看標記認，哪對角的角度相同</p>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200 mx-auto max-w-2xl relative md:ml-0 md:mr-24 lg:mr-28">
              <div className="text-center font-sans space-y-4 text-lg">
                <div className="flex flex-wrap justify-center gap-4 text-slate-800 font-bold">
                  <span className="mr-2">∵</span>
                  <span className="border-b-4 border-red-500 pb-1 italic">AB = PQ</span> 、
                  <span className="border-b-4 border-slate-800 pb-1 italic">BC = QR</span> 、
                  <span className="border-b-4 border-blue-500 pb-1 italic">CA = RP</span> 、
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-slate-800 font-bold ml-[2em]">
                  <span className="border-b-4 border-slate-400 pb-1 italic">∠C = ∠R</span> 、
                  <span className="border-b-4 border-purple-500 pb-1 italic">∠B = ∠Q</span> 及
                  <span className="border-b-4 border-green-500 pb-1 italic">∠A = ∠P</span>
                </div>
                
                <div className="mt-8 text-xl font-bold flex items-center justify-center gap-2 font-sans pt-4 border-t border-green-200">
                  <span className="mr-2 font-sans">∴</span>
                  <span>三角形 <span className="italic">ABC</span> 與 三角形 <span className="italic">PQR</span>  全等，即</span>
                  <span className="bg-yellow-200 px-2 py-1 rounded inline-flex items-center gap-1 font-sans ml-2 relative">
                    <Latex math="\triangle\,\mathit{ABC}\cong\triangle\,\mathit{PQR}" />
                    <div className="absolute -bottom-6 right-0 text-red-600 text-sm font-sans whitespace-nowrap">按順序排列</div>
                    <div className="absolute -right-4 top-1/2 translate-x-full -translate-y-1/2 flex items-center">
                      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="currentColor" className="text-slate-800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="48" y1="12" x2="2" y2="12" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                      <span className="text-lg ml-2 font-bold font-sans">全等三角形的名稱</span>
                    </div>
                  </span>
                </div>
                {/* Visual marker highlighting the congruent sign */}
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. 學判斷一組三角形是否全等 */}
      <CollapsibleSection id="conditions" title="3. 學判斷一組三角形是否全等" num={3} color="red" activeSub={activeSub} sectionRef={s3}>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-4 md:flex md:items-center md:justify-between md:gap-6">
              <ul className="text-2xl font-sans text-slate-800 font-bold flex flex-wrap items-center gap-x-8 gap-y-2">
                <li>S = 線</li>
                <li>A = 角</li>
              </ul>
              <p className="text-red-600 font-bold text-lg mt-2 md:mt-0">* 需留意是否夾角/夾邊</p>
            </div>

            <div className="space-y-8 bg-green-50 p-6 rounded-lg border border-green-200">
               {/* 全等三角形各項證明條件 */}
               <div className="w-full max-w-xl mx-auto">
                 <CongruentConditionsSVG />
               </div>
               
               <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border-l-4 border-red-500 relative overflow-hidden">
                  <div className="print-decorative-exclamation absolute -right-4 -bottom-4 text-8xl text-red-50 opacity-50 font-black pointer-events-none">!</div>
                 <h4 className="text-red-700 font-bold text-lg mb-2 relative z-10">⚠️ 易錯提醒：不是有直角就是 RHS！</h4>
                 <p className="text-slate-700 relative z-10 text-[15px] leading-relaxed">
                   如果兩條 <strong>直角邊 (兩股)</strong> 分別相等，且夾著直角，這屬於 <span className="font-bold text-red-600 bg-red-100 px-1 rounded">SAS</span>（兩邊及其夾角）。
                 </p>
                 <p className="text-slate-700 mt-2 relative z-10 text-[15px] leading-relaxed">
                   必須是 <strong>直角</strong> (R) + <strong>斜邊</strong> (H) 相等 + <strong>另一條邊</strong> (S) 相等，才算是 <span className="font-bold text-blue-700 bg-blue-100 px-1 rounded">RHS</span>。
                 </p>
                  <svg width="240" height="90" viewBox="0 0 240 90" className="mx-auto mt-4 block relative z-10">
                    <g transform="translate(15, 15)">
                      <path d="M 0 0 L 0 60 L 50 60 Z" fill="#ebf8ff" stroke="#1e3a5f" strokeWidth="2" strokeLinejoin="round" />
                      <rect x="0" y="50" width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                      <line x1="-7" y1="30" x2="7" y2="30" stroke="#0ea5e9" strokeWidth="2" />
                      <line x1="21" y1="53" x2="21" y2="67" stroke="#0ea5e9" strokeWidth="2" />
                      <line x1="29" y1="53" x2="29" y2="67" stroke="#0ea5e9" strokeWidth="2" />
                    </g>
                    <g transform="translate(145, 15) scale(-1, 1)">
                      <path d="M 0 0 L 0 60 L 50 60 Z" fill="#ebf8ff" stroke="#1e3a5f" strokeWidth="2" strokeLinejoin="round" />
                      <rect x="0" y="50" width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                      <line x1="-7" y1="30" x2="7" y2="30" stroke="#0ea5e9" strokeWidth="2" />
                      <line x1="21" y1="53" x2="21" y2="67" stroke="#0ea5e9" strokeWidth="2" />
                      <line x1="29" y1="53" x2="29" y2="67" stroke="#0ea5e9" strokeWidth="2" />
                    </g>
                    <text x="165" y="45" fontSize="20" fontWeight="bold" fill="#dc2626" dominantBaseline="middle">SAS</text>
                  </svg>
               </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
};
