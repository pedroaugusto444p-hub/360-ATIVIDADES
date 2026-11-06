/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  ExternalLink,
  RotateCw,
  Copy,
  Check,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

type ViewportMode = 'full' | 'desktop' | 'tablet' | 'mobile';

export default function App() {
  const [mode, setMode] = useState<ViewportMode>('full');
  const [isBarCollapsed, setIsBarCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/vendas/index.html`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getContainerStyles = () => {
    switch (mode) {
      case 'mobile':
        return 'w-[375px] max-w-[94vw] h-[min(700px,78vh)] shadow-2xl rounded-2xl border border-slate-700/50 my-auto overflow-hidden';
      case 'tablet':
        return 'w-[768px] max-w-[96vw] h-[min(900px,80vh)] shadow-2xl rounded-2xl border border-slate-700/50 my-auto overflow-hidden';
      case 'desktop':
        return 'w-[1200px] max-w-[95vw] h-[84vh] shadow-2xl rounded-xl border border-slate-700/50 my-auto overflow-hidden';
      case 'full':
      default:
        return 'w-full h-full border-0';
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 flex flex-col items-center">
      {/* Floating Control Toolbar */}
      <div
        className={`fixed top-3 z-50 transition-all duration-300 ease-in-out ${
          isBarCollapsed ? 'translate-y-[-70px]' : 'translate-y-0'
        }`}
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/70 shadow-2xl text-slate-200 text-xs">
          {/* Logo / Badge */}
          <div className="flex items-center gap-1.5 pr-2 border-r border-slate-700/60 font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline font-semibold text-slate-100">
              Página de Vendas
            </span>
          </div>

          {/* Viewport Selectors */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-full border border-slate-700/40">
            <button
              onClick={() => setMode('full')}
              title="Tela Cheia (100%)"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                mode === 'full'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMode('desktop')}
              title="Desktop (1200px)"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                mode === 'desktop'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMode('tablet')}
              title="Tablet (768px)"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                mode === 'tablet'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMode('mobile')}
              title="Mobile (375px)"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                mode === 'mobile'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 pl-1">
            <button
              onClick={handleReload}
              title="Recarregar Página"
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleCopyLink}
              title="Copiar Link Direto"
              className="flex items-center gap-1 px-2 py-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden sm:inline">Copiar URL</span>
                </>
              )}
            </button>

            <a
              href="/vendas/index.html"
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir em Nova Aba"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600/80 hover:bg-blue-600 text-white font-medium transition-colors cursor-pointer"
            >
              <span className="text-[11px] hidden md:inline">Abrir Direto</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setIsBarCollapsed(true)}
              title="Minimizar barra"
              className="p-1 text-slate-500 hover:text-slate-300 rounded-full transition-colors ml-0.5 cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Button to restore toolbar when collapsed */}
      {isBarCollapsed && (
        <button
          onClick={() => setIsBarCollapsed(false)}
          title="Expandir barra de ferramentas"
          className="fixed top-2 z-50 flex items-center gap-1.5 px-3 py-1 bg-slate-900/85 hover:bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700/60 shadow-lg backdrop-blur-sm transition-all cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Controles de Visualização</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      )}

      {/* Sales Page Frame Container */}
      <div
        className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
          mode !== 'full' ? 'py-14 px-4 bg-slate-950/90' : 'p-0'
        }`}
      >
        <div className={`relative transition-all duration-300 ${getContainerStyles()}`}>
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src="/vendas/index.html"
            title="+360 Atividades de Matemática no Mundo dos Blocos"
            className="w-full h-full border-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
