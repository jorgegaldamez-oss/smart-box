import React, { useState } from 'react';
import { Cpu, Menu, X, Activity, BookOpen, Sliders, Users, Award } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Inicio', icon: Activity },
  { id: 'conceptos', label: 'Conceptos Clave', icon: BookOpen },
  { id: 'simulador', label: 'Simulador', icon: Sliders },
  { id: 'especialidades', label: 'Especialidades', icon: Users },
  { id: 'desafio', label: 'Desafío 4.0', icon: Award },
];

export default function Navbar({ activeSection, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onNavigate) onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#060b14]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleClick('hero')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.25)] transition group-hover:border-cyan-400">
            <Cpu className="h-5 w-5 text-cyan-400" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#060b14] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-wider text-white">
                SMART-BOX <span className="text-cyan-400">4.0</span>
              </span>
              <span className="hidden rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300 sm:inline-block">
                2° MEDIO TP
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Control Inteligente &amp; Proyecto Transversal
            </p>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white border border-transparent'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border border-slate-700 bg-slate-800/60 p-2 text-slate-200 hover:border-cyan-500/50 md:hidden"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-[#0b1220] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4 text-cyan-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

