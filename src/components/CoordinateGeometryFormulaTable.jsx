import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { loadKatexOnce } from '../utils/katexLoader';

const Latex = ({ math, block = false }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadKatexOnce().then(() => setIsLoaded(true)).catch(() => {});
  }, []);

  useEffect(() => {
    if (isLoaded && window.katex && containerRef.current) {
      try {
        containerRef.current.innerHTML = '';
        window.katex.render(math, containerRef.current, { displayMode: block, throwOnError: false, output: 'html' });
      } catch (e) {
        containerRef.current.innerText = math;
      }
    }
  }, [math, block, isLoaded]);

  return <span ref={containerRef} className={block ? 'block text-center my-1' : 'inline-block'} />;
};

export const CoordinateGeometryFormulaTable = ({ onStartQuiz }) => {
  return (
    <div className="space-y-5">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h3 className="font-bold text-slate-700 mb-4 text-base">📌 符號說明</h3>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="flex justify-center">
            <svg viewBox="0 0 280 130" width="280" height="130" className="overflow-visible">
              <line x1="60" y1="75" x2="220" y2="30" stroke="#374151" strokeWidth="2" />
              <line x1="55" y1="70" x2="65" y2="80" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
              <line x1="65" y1="70" x2="55" y2="80" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
              <text x="60" y="100" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">①</text>
              <text x="18" y="118" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151">(</text>
              <text x="26" y="118" fontSize="13" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#2563eb">x<tspan dy="3" fontSize="9" fontStyle="normal">1</tspan></text>
              <text x="40" y="118" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151">,</text>
              <text x="47" y="118" fontSize="13" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">y<tspan dy="3" fontSize="9" fontStyle="normal">1</tspan></text>
              <text x="60" y="118" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151">)</text>
              <line x1="215" y1="25" x2="225" y2="35" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
              <line x1="225" y1="25" x2="215" y2="35" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
              <text x="220" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">②</text>
              <text x="198" y="16" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151">(</text>
              <text x="206" y="16" fontSize="13" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#2563eb">x<tspan dy="3" fontSize="9" fontStyle="normal">2</tspan></text>
              <text x="220" y="16" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151">,</text>
              <text x="227" y="16" fontSize="13" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">y<tspan dy="3" fontSize="9" fontStyle="normal">2</tspan></text>
              <text x="240" y="16" fontSize="13" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151">)</text>
            </svg>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 w-6">L</span>
              <span>＝ Line，即一條直線</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 w-6">m</span>
              <span>＝ slope，即斜率（直線的傾斜程度）</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 w-6">AB</span>
              <span>＝ 由 A 點到 B 點的線段</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <h3 className="font-bold text-emerald-800 mb-3 text-lg">1. 距離公式</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-2">公式</p>
            <Latex math={'\\text{距離} = \\sqrt{(\\textcolor{blue}{x_1}-\\textcolor{blue}{x_2})^2 + (\\textcolor{green}{y_1}-\\textcolor{green}{y_2})^2}'} block />
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-600 mb-2">例：A(<span className="text-blue-600">5</span>, <span className="text-green-600">8</span>) 和 B(<span className="text-blue-600">2</span>, <span className="text-green-600">−10</span>) 的距離</p>
            <Latex math={'\\begin{aligned}AB &= \\sqrt{(\\textcolor{blue}{5}-\\textcolor{blue}{2})^2 + (\\textcolor{green}{8}-({\\textcolor{green}{-10}}))^2} \\\\ &= \\sqrt{\\textcolor{blue}{3}^2 + \\textcolor{green}{18}^2} \\\\ &= \\sqrt{333}\\end{aligned}'} block />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-bold text-blue-800 mb-3 text-lg">2. 斜率公式</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-2">公式</p>
            <Latex math={'\\text{斜率} = \\dfrac{\\textcolor{green}{y_1}-\\textcolor{green}{y_2}}{\\textcolor{blue}{x_1}-\\textcolor{blue}{x_2}}'} block />
            <p className="mt-3 text-xs text-slate-500"><span className="text-green-600 font-bold">y</span> 上 <span className="text-blue-500 font-bold">x</span> 下</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-600 mb-2">例：A(<span className="text-blue-600">5</span>, <span className="text-green-600">8</span>) 和 B(<span className="text-blue-600">2</span>, <span className="text-green-600">−10</span>) 的斜率</p>
            <Latex math={'\\begin{aligned}m_{AB} &= \\dfrac{\\textcolor{green}{8}-(\\textcolor{green}{-10})}{\\textcolor{blue}{5}-\\textcolor{blue}{2}} \\\\ &= \\dfrac{\\textcolor{green}{18}}{\\textcolor{blue}{3}} \\\\ &= 6\\end{aligned}'} block />
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
        <h3 className="font-bold text-orange-800 mb-3 text-lg">3. 共線</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 space-y-2">
            <p className="text-xs text-slate-400 mb-1">定義</p>
            <p className="text-sm font-bold text-slate-700">若 A、B、C 三點<span className="bg-orange-200 px-1 rounded">共線</span>，則 ABC 任意兩點的斜率都相等</p>
            <p className="text-sm text-slate-600">方法：分別找 AB、AC、BC 其中兩線段的斜率，再比較是否相等。</p>
            <div className="mt-4 flex justify-center">
              <svg viewBox="0 0 220 140" width="220" height="140" className="overflow-visible">
                <defs>
                  <marker id="arrow-green-shared" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                    <polygon points="0,0 6,3 0,6" fill="#16a34a" />
                  </marker>
                </defs>
                <line x1="20" y1="65" x2="200" y2="65" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-green-shared)" />
                <line x1="110" y1="125" x2="110" y2="10" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-green-shared)" />
                <text x="95" y="82" fontSize="15" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">O</text>
                <text x="205" y="70" fontSize="15" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">x</text>
                <text x="110" y="2" textAnchor="middle" fontSize="15" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">y</text>
                <line x1="30" y1="15" x2="190" y2="115" stroke="#222" strokeWidth="1.5" strokeDasharray="5,4" />
                <line x1="58" y1="31" x2="66" y2="39" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                <line x1="66" y1="31" x2="58" y2="39" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                <text x="67" y="25" fontSize="16" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#222" textAnchor="end">A</text>
                <line x1="106" y1="61" x2="114" y2="69" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                <line x1="114" y1="61" x2="106" y2="69" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                <text x="125" y="56" fontSize="16" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#222" textAnchor="end">B</text>
                <line x1="154" y1="91" x2="162" y2="99" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                <line x1="162" y1="91" x2="154" y2="99" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                <text x="165" y="87" fontSize="16" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#222" textAnchor="end">C</text>
              </svg>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-600 mb-2">例：判斷 A(<span className="text-blue-600">1</span>, <span className="text-green-600">2</span>)、B(<span className="text-blue-600">3</span>, <span className="text-green-600">6</span>)、C(<span className="text-blue-600">5</span>, <span className="text-green-600">10</span>) 是否共線</p>
            <div className="space-y-2 text-sm text-slate-700">
              <Latex math={'\\begin{aligned}m_{AB} &= \\dfrac{\\textcolor{green}{6}-\\textcolor{green}{2}}{\\textcolor{blue}{3}-\\textcolor{blue}{1}} = \\dfrac{4}{2} = 2\\end{aligned}'} block />
              <Latex math={'\\begin{aligned}m_{BC} &= \\dfrac{\\textcolor{green}{10}-\\textcolor{green}{6}}{\\textcolor{blue}{5}-\\textcolor{blue}{3}} = \\dfrac{4}{2} = 2\\end{aligned}'} block />
              <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-orange-800 font-semibold">
                ∵ AB斜率 = BC斜率，∴ A、B、C 三點共線。
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
        <h3 className="font-bold text-rose-800 mb-3 text-lg">4. 平行 / 垂直</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 space-y-3">
            <p className="text-xs text-slate-400 mb-1">定義</p>
            <div>
              <p className="text-sm font-bold text-slate-700"><span className="bg-yellow-200 px-1 rounded">平行</span>：兩條線斜率<span className="bg-yellow-200 px-1 rounded">相同</span></p>
              <Latex math={'L_1 \\mathbin{/\\!/} L_2 \\;\\Rightarrow\\; m_1 = m_2'} block />
              <div className="mt-3 flex justify-center">
                <svg viewBox="0 0 200 130" width="200" height="130" className="overflow-visible">
                  <line x1="20" y1="95" x2="180" y2="95" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-green-shared)" />
                  <line x1="40" y1="115" x2="40" y2="10" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-green-shared)" />
                  <text x="25" y="112" fontSize="15" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">O</text>
                  <text x="185" y="100" fontSize="15" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">x</text>
                  <text x="40" y="2" textAnchor="middle" fontSize="15" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">y</text>
                  <line x1="30" y1="75" x2="150" y2="15" stroke="#222" strokeWidth="1.5" />
                  <line x1="30" y1="115" x2="150" y2="55" stroke="#222" strokeWidth="1.5" />
                  <polygon points="-6,-5 6,0 -6,5" fill="#ea580c" transform="translate(80, 50) rotate(-26.56)" />
                  <polygon points="-6,-5 6,0 -6,5" fill="#ea580c" transform="translate(80, 90) rotate(-26.56)" />
                  <text x="155" y="18" fontSize="16" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#222">L<tspan dy="3" fontSize="11" fontStyle="normal">1</tspan></text>
                  <text x="155" y="58" fontSize="16" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#222">L<tspan dy="3" fontSize="11" fontStyle="normal">2</tspan></text>
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700"><span className="bg-green-200 px-1 rounded">垂直</span>：兩條線斜率相乘 = <span className="bg-green-200 px-1 rounded">−1</span></p>
              <Latex math={'L_1 \\perp L_2 \\;\\Rightarrow\\; m_1 \\times m_2 = -1'} block />
              <div className="mt-3 flex justify-center">
                <svg viewBox="0 0 200 130" width="200" height="130" className="overflow-visible">
                  <line x1="20" y1="95" x2="180" y2="95" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-green-shared)" />
                  <line x1="40" y1="115" x2="40" y2="10" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-green-shared)" />
                  <text x="25" y="112" fontSize="15" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">O</text>
                  <text x="185" y="100" fontSize="15" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">x</text>
                  <text x="40" y="2" textAnchor="middle" fontSize="15" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#16a34a">y</text>
                  <line x1="30" y1="125" x2="140" y2="15" stroke="#222" strokeWidth="1.5" />
                  <line x1="30" y1="5" x2="130" y2="105" stroke="#222" strokeWidth="1.5" />
                  <polyline points="83,58 90,51 97,58" fill="none" stroke="#ea580c" strokeWidth="1.5" />
                  <text x="145" y="18" fontSize="16" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#222">L<tspan dy="3" fontSize="11" fontStyle="normal">1</tspan></text>
                  <text x="135" y="108" fontSize="16" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#222">L<tspan dy="3" fontSize="11" fontStyle="normal">2</tspan></text>
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-600 mb-2">例：若 AB ⊥ CD，求 CD 的斜率</p>
            <p className="text-sm text-slate-600 mb-2">已知 AB 的斜率 = 6</p>
            <Latex math={'\\begin{aligned}m_{AB} \\times m_{CD} &= -1 \\\\ 6 \\times m_{CD} &= -1 \\\\ m_{CD} &= -\\dfrac{1}{6}\\end{aligned}'} block />
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-bold text-amber-800 mb-3 text-lg">5. 中點公式</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-2">公式（<Latex math={'\\dfrac{\\text{頭}+\\text{尾}}{2}=\\text{中間}'} />）</p>
            <Latex math={'\\text{中點} = \\left(\\dfrac{\\textcolor{blue}{x_1}+\\textcolor{blue}{x_2}}{2},\\; \\dfrac{\\textcolor{green}{y_1}+\\textcolor{green}{y_2}}{2}\\right)'} block />
            <div className="mt-4 flex justify-center">
              <svg viewBox="0 0 250 100" width="250" height="100" className="overflow-visible">
                <line x1="30" y1="70" x2="200" y2="30" stroke="#374151" strokeWidth="2" />
                <line x1="25" y1="65" x2="35" y2="75" stroke="#0ea5e9" strokeWidth="2" />
                <line x1="35" y1="65" x2="25" y2="75" stroke="#0ea5e9" strokeWidth="2" />
                <text x="25" y="55" fontSize="14" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151" textAnchor="end">
                  <tspan fill="#374151">A (</tspan>
                  <tspan fill="#2563eb">x₁</tspan>
                  <tspan fill="#374151">, </tspan>
                  <tspan fill="#16a34a">y₁</tspan>
                  <tspan fill="#374151">)</tspan>
                </text>
                <line x1="110" y1="45" x2="120" y2="55" stroke="#0ea5e9" strokeWidth="2" />
                <line x1="120" y1="45" x2="110" y2="55" stroke="#0ea5e9" strokeWidth="2" />
                <text x="115" y="38" fontSize="14" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151" textAnchor="middle">M (x, y)</text>
                <line x1="195" y1="25" x2="205" y2="35" stroke="#0ea5e9" strokeWidth="2" />
                <line x1="205" y1="25" x2="195" y2="35" stroke="#0ea5e9" strokeWidth="2" />
                <text x="205" y="20" fontSize="14" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151" textAnchor="start">
                  <tspan fill="#374151">B (</tspan>
                  <tspan fill="#2563eb">x₂</tspan>
                  <tspan fill="#374151">, </tspan>
                  <tspan fill="#16a34a">y₂</tspan>
                  <tspan fill="#374151">)</tspan>
                </text>
                <line x1="69.2" y1="54.6" x2="71.9" y2="66.3" stroke="#0ea5e9" strokeWidth="2" />
                <line x1="73.1" y1="53.7" x2="75.8" y2="65.4" stroke="#0ea5e9" strokeWidth="2" />
                <line x1="154.2" y1="34.6" x2="156.9" y2="46.3" stroke="#0ea5e9" strokeWidth="2" />
                <line x1="158.1" y1="33.7" x2="160.8" y2="45.4" stroke="#0ea5e9" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-600 mb-2">例：A(<span className="text-blue-600">5</span>, <span className="text-green-600">2</span>) 和 B(<span className="text-blue-600">2</span>, <span className="text-green-600">−10</span>) 的中點</p>
            <Latex math={'\\begin{aligned}\\text{中點} &= \\left(\\dfrac{\\textcolor{blue}{5}+\\textcolor{blue}{2}}{2},\\; \\dfrac{\\textcolor{green}{2}+(\\textcolor{green}{-10})}{2}\\right) \\\\ &= \\left(3.5,\\; -4\\right)\\end{aligned}'} block />
          </div>
        </div>
      </div>

      <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
        <h3 className="font-bold text-violet-800 mb-3 text-lg">6. 截點公式 <span className="text-sm font-normal text-violet-500">（非基礎課程）</span></h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-2">公式（比例與點交叉乘！）</p>
            <div className="space-y-1">
              <p className="text-sm text-slate-600 mb-1">P 將 AB 分成 r : s</p>
              <Latex math={'\\textcolor{blue}{x} = \\dfrac{s \\cdot \\textcolor{blue}{x_1} + r \\cdot \\textcolor{blue}{x_2}}{r + s}'} block />
              <Latex math={'\\textcolor{green}{y} = \\dfrac{s \\cdot \\textcolor{green}{y_1} + r \\cdot \\textcolor{green}{y_2}}{r + s}'} block />
            </div>
            <div className="mt-4 flex justify-center">
              <svg viewBox="0 0 250 100" width="250" height="100" className="overflow-visible">
                <line x1="30" y1="70" x2="200" y2="30" stroke="#374151" strokeWidth="2" />
                <line x1="25" y1="65" x2="35" y2="75" stroke="#0ea5e9" strokeWidth="2" />
                <line x1="35" y1="65" x2="25" y2="75" stroke="#0ea5e9" strokeWidth="2" />
                <text x="25" y="55" fontSize="14" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151" textAnchor="end">
                  <tspan fill="#374151">A (</tspan>
                  <tspan fill="#2563eb">x₁</tspan>
                  <tspan fill="#374151">, </tspan>
                  <tspan fill="#16a34a">y₁</tspan>
                  <tspan fill="#374151">)</tspan>
                </text>
                <line x1="85" y1="51" x2="95" y2="61" stroke="#0ea5e9" strokeWidth="2" />
                <line x1="95" y1="51" x2="85" y2="61" stroke="#0ea5e9" strokeWidth="2" />
                <text x="85" y="44" fontSize="14" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151" textAnchor="middle">P (x, y)</text>
                <line x1="195" y1="25" x2="205" y2="35" stroke="#0ea5e9" strokeWidth="2" />
                <line x1="205" y1="25" x2="195" y2="35" stroke="#0ea5e9" strokeWidth="2" />
                <text x="205" y="20" fontSize="14" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151" textAnchor="start">
                  <tspan fill="#374151">B (</tspan>
                  <tspan fill="#2563eb">x₂</tspan>
                  <tspan fill="#374151">, </tspan>
                  <tspan fill="#16a34a">y₂</tspan>
                  <tspan fill="#374151">)</tspan>
                </text>
                <text x="60" y="80" fontSize="16" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151" textAnchor="middle">r</text>
                <text x="145" y="60" fontSize="16" fontStyle="italic" fontFamily="KaTeX_Math, 'Times New Roman', serif" fill="#374151" textAnchor="middle">s</text>
              </svg>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-600 mb-2">例：P 將 A(<span className="text-blue-600">1</span>, <span className="text-green-600">3</span>)、B(<span className="text-blue-600">7</span>, <span className="text-green-600">9</span>) 分成 2 : 1</p>
            <Latex math={'\\begin{aligned}\\textcolor{blue}{x} &= \\dfrac{1 \\times \\textcolor{blue}{1} + 2 \\times \\textcolor{blue}{7}}{2+1} = \\dfrac{\\textcolor{blue}{15}}{3} = \\textcolor{blue}{5} \\\\ \\textcolor{green}{y} &= \\dfrac{1 \\times \\textcolor{green}{3} + 2 \\times \\textcolor{green}{9}}{2+1} = \\dfrac{\\textcolor{green}{21}}{3} = \\textcolor{green}{7}\\end{aligned}'} block />
            <div className="mt-2 text-center">
              <Latex math={'P = (\\textcolor{blue}{5},\\; \\textcolor{green}{7})'} block />
            </div>
          </div>
        </div>
      </div>

      {onStartQuiz && (
        <div className="text-center pt-2">
          <button
            onClick={onStartQuiz}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto transition-all shadow-lg"
          >
            開始測驗 <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
