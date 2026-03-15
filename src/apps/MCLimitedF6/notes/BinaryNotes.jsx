import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InlineMath, BlockMath } from '../shared';

// ─── Helper: annotated binary number with bit-position labels ──────────────
const BinAnnotated = ({ bits }) => (
  <span className="inline-flex items-end font-mono">
    {bits.split('').map((bit, i) => {
      const pos = bits.length - 1 - i;
      return (
        <span key={i} className="inline-flex flex-col items-center" style={{ margin: '0 1px' }}>
          <span className="leading-none mb-0.5" style={{ fontSize: '11px', color: '#c00', fontWeight: 700 }}>{pos}</span>
          <span className={`text-xl font-bold leading-none ${bit === '1' ? 'text-red-600' : 'text-slate-500'}`}>{bit}</span>
        </span>
      );
    })}
    <span className="text-base self-end mb-0.5 ml-0.5">₂</span>
  </span>
);

const BinaryNotes = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium">
      <ArrowLeft className="w-5 h-5" /> 返回
    </button>
    <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-teal-400 pb-3">
      📘 筆記：二進制轉換
    </h1>
    <div className="space-y-8 text-slate-700">

      {/* Section 1: Bit positions */}
      <section className="bg-teal-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-teal-800 mb-3">一、數位概念</h2>
        <div className="space-y-4">
          <div className="bg-teal-100 rounded-lg p-4">
            <p className="font-semibold mb-2">⚠️ 數位置的方法（重要！）</p>
            <p className="text-sm mb-3">從<strong>右至左</strong>，最右邊為第 0 位，向左依次為第 1, 2, 3, … 位。</p>
            <div className="overflow-x-auto">
              <table className="text-sm text-center border-collapse w-full">
                <thead>
                  <tr className="bg-teal-200">
                    <th className="border border-teal-300 px-3 py-1">二進制數</th>
                    {[11,10,9,8,7,6,5,4,3,2,1,0].map(p => (
                      <th key={p} className="border border-teal-300 px-2 py-1 text-xs">位 {p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-teal-300 px-3 py-1 font-mono font-bold">110001001011</td>
                    {[1,1,0,0,0,1,0,0,1,0,1,1].map((b, i) => (
                      <td key={i} className={`border border-teal-300 px-2 py-1 font-mono font-bold ${b===1 ? 'text-teal-700' : 'text-slate-400'}`}>{b}</td>
                    ))}
                  </tr>
                  <tr className="bg-teal-50">
                    <td className="border border-teal-300 px-3 py-1 text-xs">對應冪次</td>
                    {[11,10,9,8,7,6,5,4,3,2,1,0].map(p => (
                      <td key={p} className="border border-teal-300 px-2 py-1 text-xs"><InlineMath math={`2^{${p}}`} /></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-3 text-teal-800">
              例：<InlineMath math="11+2^6+2^{10}+2^{11}" /> → 先用計算機得十進制值，再轉二進制。
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: CASIO BASE MODE */}
      <section className="bg-purple-50 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-800 mb-3">二、CASIO fx-50FHII — 計算機 Mode 3</h2>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-bold text-purple-700 mb-3">📱 進入 BASE 模式</p>
          <div className="flex items-center flex-wrap gap-2 text-sm bg-purple-50 rounded p-3">
            <span className="bg-gray-800 text-white text-xs font-mono px-2 py-1 rounded">MODE</span>
            <span>→</span>
            <span className="bg-gray-800 text-white text-xs font-mono px-2 py-1 rounded">3</span>
            <span className="text-gray-500">（進入 BASE 模式，預設 <span className="text-green-600 font-bold">DEC</span> 十進制）</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="font-bold text-purple-700 mb-3">🔄 二進制 ↔ 十進制 轉換</p>
          <div className="space-y-4">

            <div className="border-l-4 border-blue-400 pl-4 space-y-2">
              <p className="font-semibold text-blue-700">二進制 → 十進制</p>
              <ol className="list-decimal pl-4 space-y-1 text-sm">
                <li>在 BASE 模式（<span className="text-green-600 font-bold">DEC</span> 狀態）下，按
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                    <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                  </span>
                  切換到 <strong><span className="text-green-600">BIN</span> 二進制輸入</strong>
                </li>
                <li>輸入二進制數字（只能輸入 0 和 1）</li>
                <li>按
                  <span className="mx-1 bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                  確認
                </li>
                <li className="pt-3">按
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                    <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                  </span>
                  → 顯示十進制結果
                </li>
              </ol>
              <div className="bg-blue-50 rounded px-3 pb-3 pt-2 text-sm">
                <div className="font-sans text-blue-700 mb-2 text-xs">題目：想將 <InlineMath math="1100_2" /> 變成十進數</div>
                <div className="font-mono flex flex-wrap items-center gap-1 pt-4">
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                    <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                  </span>
                  <span>→ 輸入 <strong>1100</strong> →</span>
                  <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                  <span>→</span>
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                    <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                  </span>
                  <span>→ 顯示 <strong className="text-blue-700">12</strong>（十進數為 12）</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-400 pl-4 space-y-2">
              <p className="font-semibold text-green-700">算式 / 十進制 → 二進制</p>
              <ol className="list-decimal pl-4 space-y-1 text-sm">
                <li>先在 COMP 模式（<span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">MODE</span> <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">1</span>）計算算式的十進制值</li>
                <li>記下數值，進入 BASE 模式（<span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">MODE</span> <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">3</span>）</li>
                <li className="pt-5">在 <span className="text-green-600 font-bold">DEC</span> 狀態下輸入十進制數 → 按
                  <span className="relative inline-block mx-1 align-middle">
                    <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span>
                    <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">log</span>
                  </span>
                  切換到 <span className="text-green-600 font-bold">BIN</span> → 按
                  <span className="mx-1 bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span>
                  → 顯示二進制
                </li>
              </ol>
              <div className="bg-green-50 rounded p-2 text-sm font-mono">
                例：COMP 算得 <InlineMath math="11+2^6+2^{10}+2^{11}=3147" /> → BASE <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">MODE</span> → <span className="text-green-600 font-bold">DEC</span> 輸入 3147 → 按<span className="relative inline-block mx-1 align-middle"><span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span><span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">log</span></span>→ <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> → 得二進制
              </div>
            </div>

          </div>
        </div>

        <div className="bg-purple-100 rounded-lg p-4 mb-4">
          <p className="font-bold text-purple-700 mb-2">⚠️ 注意事項</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><span className="text-green-600 font-bold">BIN</span> 模式只能輸入 0 和 1</li>
            <li>若二進制數太長（超過計算機顯示位數）會顯示不了，需要拆開不同組件計算去推斷答案。</li>
            <li>計其他數要離開 BASE 模式：<span className="bg-gray-800 text-white text-xs font-mono px-1 py-0.5 rounded">MODE</span> → <span className="bg-gray-800 text-white text-xs font-mono px-1 py-0.5 rounded">1</span>（回 COMP）</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="font-bold text-purple-700 mb-3">📝 實戰例題</p>
          <div className="space-y-4 text-sm">

            <div className="border-2 border-blue-300 rounded-lg p-3 bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">Question</span>
                <span className="text-xs font-semibold text-blue-700">DSE-2014-Q34</span>
              </div>
              <p className="font-semibold text-base mb-3">
                <InlineMath math="7\times 2^{10}+2^8+5\times 2^3-2^3 =" /> ?
              </p>
              <div className="space-y-1 mb-3 pl-2">
                <p>A.&nbsp;&nbsp;<InlineMath math="111010100000_2" /></p>
                <p>B.&nbsp;&nbsp;<InlineMath math="111100010000_2" /></p>
                <p>C.&nbsp;&nbsp;<InlineMath math="1110100100000_2" /></p>
                <p>D.&nbsp;&nbsp;<InlineMath math="1111000010000_2" /></p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <p className="font-bold text-blue-700 mb-3">Solution</p>
                <div className="mb-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0">1</span>
                    <span className="font-semibold">計算機直接出題目嘅數值</span>
                  </div>
                  <p className="ml-8"><InlineMath math="7\times 2^{10}+2^8+5\times 2^3-2^3 =" /> <span className="font-bold text-blue-700">7456</span></p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0">2</span>
                    <span className="font-semibold">用展開式(Expanded form)出每個答案嘅數值</span>
                  </div>
                  <div className="mt-1 ml-2 space-y-2">
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="font-semibold">A.&nbsp;<BinAnnotated bits="111010100000" /></p>
                      <p className="text-gray-500 text-xs"><InlineMath math="=2^{11}+2^{10}+2^9+2^7+2^5" /></p>
                      <p>= <span className="font-bold text-red-600">3744</span>&ensp;<span className="text-red-600">檢查同題目數值是否一樣 → 不同，所以不是答案</span></p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="font-semibold">B.&nbsp;<BinAnnotated bits="111100010000" /></p>
                      <p className="text-gray-500 text-xs"><InlineMath math="=2^{11}+2^{10}+2^9+2^8+2^4" /></p>
                      <p>= <span className="font-bold text-red-600">3856</span>&ensp;<span className="text-red-600">檢查同題目數值是否一樣 → 不同，所以不是答案</span></p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-3 bg-green-50 rounded pr-2 py-1">
                      <p className="font-semibold">C.&nbsp;<BinAnnotated bits="1110100100000" /></p>
                      <p className="text-gray-500 text-xs"><InlineMath math="=2^{12}+2^{11}+2^{10}+2^8+2^5" /></p>
                      <p>= <span className="font-bold text-green-600">7456</span>&ensp;<span className="text-green-700 font-semibold">檢查同題目數值是否一樣 → 一樣！答案：C</span></p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-3">
                      <p className="font-semibold">D.&nbsp;<BinAnnotated bits="1111000010000" /></p>
                      <p className="text-gray-500 text-xs"><InlineMath math="=2^{12}+2^{11}+2^{10}+2^9+2^4" /></p>
                      <p>= <span className="font-bold text-red-600">7696</span>&ensp;<span className="text-red-600">檢查同題目數值是否一樣 → 不同，所以不是答案</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <p className="font-semibold mb-1">題目：求 <InlineMath math="11+2^6+2^{10}+2^{11}" /> 的二進制</p>
              <p>① 在 COMP 模式計算十進制：<InlineMath math="11+64+1024+2048=3147" /></p>
              <p>② <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">MODE</span> <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">3</span> → <span className="text-green-600 font-bold">DEC</span> 輸入 3147 → 按<span className="relative inline-block mx-1 align-middle"><span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span><span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">log</span></span>→ <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> → 得 <InlineMath math="110001001011_2" /></p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3">
              <p className="font-semibold mb-1">題目：求 <InlineMath math="7 \times 2^{10}+2^8+5 \times 2^3-2^3" /> 的二進制</p>
              <p>① COMP：<InlineMath math="7168+256+40-8=7456" /></p>
              <p>② BASE <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">MODE</span> → <span className="text-green-600 font-bold">DEC</span> 輸入 7456 → 按<span className="relative inline-block mx-1 align-middle"><span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span><span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">log</span></span>→ <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> → 得 <InlineMath math="1110100100000_2" /></p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3">
              <p className="font-semibold mb-1">題目：求 <InlineMath math="1100_2" /> 的十進制</p>
              <p><span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">MODE</span> <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">3</span> → 按<span className="relative inline-block mx-1 align-middle"><span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">BIN</span><span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">log</span></span>→ 輸入 1100 → <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">EXE</span> →
                <span className="relative inline-block mx-1 align-middle">
                  <span className="absolute -top-3.5 left-0 right-0 text-center text-green-600 text-xs font-bold leading-none">DEC</span>
                  <span className="bg-gray-800 text-white text-xs font-mono px-2 py-0.5 rounded">x²</span>
                </span>
                → 得 <InlineMath math="12" /></p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
);

export default BinaryNotes;
