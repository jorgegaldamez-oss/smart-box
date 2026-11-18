import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import Phase1OrderPCC from './mission/Phase1OrderPCC';
import Phase2Architecture from './mission/Phase2Architecture';
import Phase3RouteSim from './mission/Phase3RouteSim';
import Phase4AuditReport from './mission/Phase4AuditReport';

const STORAGE_KEY = 'smartbox_mission_v2';

const INITIAL_MISSION_STATE = {
  studentName: '',
  studentCourse: '',
  specialtyId: 'alimentos',
  pccConfig: null,
  architecture: null,
  tripResult: null,
  auditReport: null,
  unlockedPhase: 1,
  currentPhase: 1,
};

const PHASES = [
  { id: 1, label: 'Fase 1: Orden y PCC', time: '5 min' },
  { id: 2, label: 'Fase 2: Lazo y Lógica', time: '8 min' },
  { id: 3, label: 'Fase 3: Ruta Crítica', time: '12 min' },
  { id: 4, label: 'Fase 4: Auditoría PDF', time: '5 min' },
];

export default function SimulatorSection() {
  const [missionState, setMissionState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...INITIAL_MISSION_STATE, ...JSON.parse(saved) } : INITIAL_MISSION_STATE;
    } catch {
      return INITIAL_MISSION_STATE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(missionState));
    } catch {
      // ignore storage quota errors
    }
  }, [missionState]);

  const updateState = (patch) => {
    setMissionState((prev) => ({ ...prev, ...patch }));
  };

  const completePhase = (phaseNum) => {
    setMissionState((prev) => {
      const nextPhase = Math.min(4, phaseNum + 1);
      return {
        ...prev,
        unlockedPhase: Math.max(prev.unlockedPhase, nextPhase),
        currentPhase: nextPhase,
      };
    });
  };

  const handleRestartMission = () => {
    setMissionState(INITIAL_MISSION_STATE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <section id="simulador" className="border-t border-slate-800/80 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="no-print flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
              <Award className="h-4 w-4" />
              Misión de Certificación Smart-Box (30 Minutos)
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Simulador Secuencial de Ingeniería 4.0
            </h2>
            <p className="mt-2 max-w-2xl text-slate-400">
              Completa las 4 fases en orden. Tu progreso se guarda automáticamente en este
              navegador por si recargas la página.
            </p>
          </div>

          <button
            onClick={handleRestartMission}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-rose-500/50 hover:text-rose-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reiniciar Misión</span>
          </button>
        </div>

        {/* Top Progress Stepper (Fase 1 -> Fase 2 -> Fase 3 -> Fase 4) */}
        <div className="no-print mt-8 grid gap-2.5 sm:grid-cols-4">
          {PHASES.map((phase) => {
            const isUnlocked = phase.id <= missionState.unlockedPhase;
            const isCurrent = phase.id === missionState.currentPhase;
            const isDone = phase.id < missionState.unlockedPhase || (phase.id === 4 && missionState.auditReport?.completed);

            return (
              <button
                key={phase.id}
                disabled={!isUnlocked}
                onClick={() => isUnlocked && updateState({ currentPhase: phase.id })}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                  isCurrent
                    ? 'border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                    : isUnlocked
                    ? 'border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/15'
                    : 'cursor-not-allowed border-slate-800 bg-slate-900/40 opacity-60'
                }`}
              >
                <div>
                  <div className="font-mono text-xs font-bold text-white">{phase.label}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-slate-400">
                    Est. {phase.time}
                  </div>
                </div>
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                ) : !isUnlocked ? (
                  <Lock className="h-4 w-4 shrink-0 text-slate-500" />
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Phase Container */}
        <div className="mt-6 rounded-2xl border border-cyan-500/25 bg-[#0b1220]/90 p-5 sm:p-8 shadow-[0_0_40px_rgba(6,182,212,0.08)]">
          {missionState.currentPhase === 1 && (
            <Phase1OrderPCC
              missionState={missionState}
              onUpdateState={updateState}
              onComplete={() => completePhase(1)}
            />
          )}

          {missionState.currentPhase === 2 && (
            <Phase2Architecture
              missionState={missionState}
              onUpdateState={updateState}
              onComplete={() => completePhase(2)}
            />
          )}

          {missionState.currentPhase === 3 && (
            <Phase3RouteSim
              missionState={missionState}
              onUpdateState={updateState}
              onComplete={() => completePhase(3)}
            />
          )}

          {missionState.currentPhase === 4 && (
            <Phase4AuditReport
              missionState={missionState}
              onUpdateState={updateState}
              onRestartMission={handleRestartMission}
            />
          )}
        </div>
      </div>
    </section>
  );
}
