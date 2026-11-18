import React from 'react';
import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#04070e] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <div className="flex items-center gap-2.5">
          <Cpu className="h-5 w-5 text-cyan-400" />
          <span className="font-mono text-sm font-bold text-white">
            SMART-BOX <span className="text-cyan-400">4.0</span>
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Plataforma Educativa Transversal 2° Medio TP • Química Industrial • Alimentos •
          Gastronomía • Muebles y Madera
        </p>
        <p className="font-mono text-[11px] text-slate-500">
          100% Client-Side • GitHub Pages Ready
        </p>
      </div>
    </footer>
  );
}

