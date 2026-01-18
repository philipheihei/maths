import React from 'react';
import { FileText } from 'lucide-react';
import Latex from './Latex';

/**
 * NotesSection - 顯示主項變換的重點筆記
 * 包含五個核心步驟的條件、行動和示例
 */
const NotesSection = () => {
  const rows = [
    {
      condition: '\\color{green}{\\text{分數}}',
      action: '\\color{red}{\\text{乘}} (\\color{green}{\\text{交叉相乘}})',
      example: '\\color{purple}{\\text{沒分數}} \\rightarrow \\text{(跳過此步)}'
    },
    {
      condition: '\\color{green}{\\text{括號}}',
      action: '\\color{red}{\\text{拆}} (\\color{green}{\\text{拆除括號}})',
      example: '\\color{purple}{\\text{有括號，拆}} \\rightarrow \\color{blue}{nm - 5n = 3m + 2n}'
    },
    {
      condition: '\\color{green}{\\text{主項}} (\\text{例: } x \\text{是主項})',
      action: '\\color{red}{\\text{移}} (\\color{green}{\\text{所有有 } x \\text{ 的項放在同邊}})',
      example: '\\color{blue}{\\mathbf{n}m - 5\\mathbf{n} - 2\\mathbf{n} = 3m} \\\\ \\leftarrow \\color{purple}{n \\text{ 全放左方}}'
    },
    {
      condition: '\\color{green}{\\text{主項出現多於一次}}',
      action: '\\color{red}{\\text{抽}} (\\color{green}{\\text{因式分解抽 } x})',
      example: '\\color{blue}{n(m - 7) = 3m} \\\\ \\leftarrow \\color{purple}{\\text{抽 } n \\text{ (變成唯一主項)}}'
    },
    {
      condition: '\\color{green}{\\text{主項旁有其他數字/代數}}',
      action: '\\color{red}{\\text{除}} (\\color{green}{\\text{除到另一方變分數}})',
      example: '\\color{blue}{n = \\frac{3m}{m-7}} \\\\ \\leftarrow \\color{purple}{\\text{將 } m-7 \\text{ 放進另一方除}}'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
        <FileText size={24} className="text-amber-500" />
        重點筆記 (Notes)
      </h2>
      
      <div className="mb-6 bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
        <p className="text-gray-600 mb-2 font-bold text-sm uppercase tracking-wide">示範例子</p>
        <div className="text-xl">
          <Latex>{'n(m-5) = 3m + 2n \\quad [\\color{green}{n\\text{為主項}}]'}</Latex>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-4 font-bold text-gray-700 w-1/4">見到 (條件)</th>
              <th className="p-4 font-bold text-gray-700 w-1/4">就要 (行動)</th>
              <th className="p-4 font-bold text-gray-700 w-1/2">例子</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 align-top text-lg">
                  <Latex>{row.condition}</Latex>
                </td>
                <td className="p-4 align-top text-lg">
                  <Latex>{row.action}</Latex>
                </td>
                <td className="p-4 align-top text-lg">
                  <Latex block>{row.example}</Latex>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotesSection;
