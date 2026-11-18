import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Apple,
  UtensilsCrossed,
  Hammer,
  CheckSquare,
  Square,
  ShieldAlert,
  Cpu,
  RotateCcw,
} from 'lucide-react';
import { SPECIALTIES } from '../data/platformData';

const SPEC_ICONS = {
  alimentos: Apple,
  quimica: FlaskConical,
  gastronomia: UtensilsCrossed,
  madera: Hammer,
};

export default function SpecialtiesSection() {
  const [activeId, setActiveId] = useState('quimica');
  const [checkedMap, setCheckedMap] = useState(() => {
    try {
      const saved = localStorage.getItem('smartbox_checklist_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('smartbox_checklist_v1', JSON.stringify(checkedMap));
    } catch {
      // ignore storage errors in restricted contexts
    }
  }, [checkedMap]);

  const activeSpec = SPECIALTIES.find((s) => s.id === activeId) || SPECIALTIES[0];
  const ActiveIcon = SPEC_ICONS[activeSpec.id] || Cpu;

  const specChecks = checkedMap[activeSpec.id] || [];
  const completedCount = specChecks.length;
  const totalCount = activeSpec.checklist.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const toggleItem = (index) => {
    setCheckedMap((prev) => {
      const current = prev[activeSpec.id] || [];
      const exists = current.includes(index);
      const updated = exists ? current.filter((i) => i !== index) : [...current, index];
      return { ...prev, [activeSpec.id]: updated };
    });
  };

  const resetChecklist = () => {
    setCheckedMap((prev) => ({ ...prev, [activeSpec.id]: [] }));
  };

  return (
    <section id="especialidades" className="border-t border-slate-800/80 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
            Trabajo Colaborativo TP
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            ¿Cuál es tu misión en la Smart-Box?
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400">
            Selecciona tu especialidad para descubrir qué parte del prototipo construyes, qué PCC
            vigilas y completar tu checklist de taller.
          </p>
        </div>

        {/* 4 Specialty Tabs */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SPECIALTIES.map((spec) => {
            const Icon = SPEC_ICONS[spec.id] || Cpu;
            const isActive = spec.id === activeId;
            return (
              <button
                key={spec.id}
                onClick={() => setActiveId(spec.id)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-500/15 shadow-[0_0_25px_rgba(6,182,212,0.18)] -translate-y-0.5'
                    : 'border-slate-800 bg-[#0b1220]/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{spec.shortName}</div>
                  <div className="text-xs text-slate-400 line-clamp-1">{spec.name}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Specialty Detail Panel */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0b1220]/90 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
                <ActiveIcon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                  {activeSpec.name}
                </h3>
                <p className="mt-0.5 text-sm text-cyan-300">
                  Carga objetivo: {activeSpec.cargoLabel}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <span className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200">
                Temp: <strong className="text-cyan-300">{activeSpec.tempRangeLabel}</strong>
              </span>
              <span className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200">
                Humedad: <strong className="text-emerald-300">{activeSpec.humRangeLabel}</strong>
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            {/* Left Info (7 cols) */}
            <div className="space-y-5 lg:col-span-7">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Responsabilidad en el Prototipo
                </h4>
                <p className="mt-2 text-base leading-relaxed text-slate-200">
                  {activeSpec.mission}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                    <ShieldAlert className="h-4 w-4" />
                    <span>PCC que Vigila</span>
                  </div>
                  <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-slate-300">
                    {activeSpec.pccFocus.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
                    <Cpu className="h-4 w-4" />
                    <span>Sensores y Actuadores Clave</span>
                  </div>
                  <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-slate-300">
                    {activeSpec.keyHardware.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Interactive Checklist (5 cols) */}
            <div className="rounded-xl border border-slate-800 bg-[#070d18] p-5 lg:col-span-5">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Checklist de Taller Práctico
                </h4>
                <button
                  onClick={resetChecklist}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                  title="Reiniciar checklist"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Limpiar</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between font-mono text-xs text-slate-400">
                  <span>Progreso del equipo</span>
                  <span className="text-emerald-300 font-bold">
                    {completedCount}/{totalCount} ({progressPct}%)
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="mt-4 space-y-2">
                {activeSpec.checklist.map((task, idx) => {
                  const checked = specChecks.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleItem(idx)}
                      className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left text-xs transition ${
                        checked
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
                          : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <Square className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                      )}
                      <span className={checked ? 'line-through opacity-80' : ''}>{task}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

