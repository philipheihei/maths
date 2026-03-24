import React, { useRef } from 'react';
import { CollapsibleSection } from './shared';

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
