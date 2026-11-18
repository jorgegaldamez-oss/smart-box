import React, { useState } from 'react';
import {
  AlertTriangle,
  Radio,
  Cpu,
  Cog,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Presentation,
  Lightbulb,
  Factory,
  CheckCircle2,
  XCircle,
  Fan,
} from 'lucide-react';
import { CONCEPTS } from '../data/platformData';

const ICON_MAP = {
  pcc: AlertTriangle,
  sensor: Radio,
  controller: Cpu,
  actuator: Cog,
  loop: RefreshCw,
};

const ACCENT_CLASSES = {
  amber: {
    border: 'border-amber-500/40',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    iconBg: 'bg-amber-500/15 text-amber-400',
    glow: 'shadow-[0_0_25px_rgba(245,158,11,0.12)]',
  },
  cyan: {
    border: 'border-cyan-500/40',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    iconBg: 'bg-cyan-500/15 text-cyan-400',
    glow: 'shadow-[0_0_25px_rgba(6,182,212,0.12)]',
  },
  emerald: {
    border: 'border-emerald-500/40',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
    glow: 'shadow-[0_0_25px_rgba(16,185,129,0.12)]',
  },
  rose: {
    border: 'border-rose-500/40',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    iconBg: 'bg-rose-500/15 text-rose-400',
    glow: 'shadow-[0_0_25px_rgba(244,63,94,0.12)]',
  },
};

function ConceptInteractiveDemo({ conceptId }) {
  const [pccTestTemp, setPccTestTemp] = useState(3);
  const [sensorVal, setSensorVal] = useState(22);
  const [loopMode, setLoopMode] = useState('closed');
  const [actuatorTest, setActuatorTest] = useState(true);

  if (conceptId === 'pcc') {
    const isSafe = pccTestTemp <= 4;
    return (
      <div className="mt-4 rounded-xl border border-slate-700/80 bg-[#070d18] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-semibold text-amber-300">
            DEMO EN VIVO: LÍMITE CRÍTICO (PCC = 4°C)
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${
              isSafe
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
            }`}
          >
            {isSafe ? 'CARGA SEGURA' : 'PCC SUPERADO — RIESGO'}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="12"
            step="0.5"
            value={pccTestTemp}
            onChange={(e) => setPccTestTemp(Number(e.target.value))}
            className="cyber-slider cyber-slider-amber w-full"
          />
          <span className="w-20 text-right font-mono text-lg font-bold text-white">
            {pccTestTemp}°C
          </span>
        </div>
        <div className="mt-2 flex justify-between text-[11px] font-mono text-slate-400">
          <span>0°C (Óptimo)</span>
          <span className="text-amber-400 font-bold">▲ Límite: 4°C</span>
          <span>12°C (Pérdida)</span>
        </div>
      </div>
    );
  }

  if (conceptId === 'sensor') {
    const voltage = (0.5 + sensorVal * 0.045).toFixed(2);
    return (
      <div className="mt-4 rounded-xl border border-slate-700/80 bg-[#070d18] p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold text-cyan-300">
            TRANSDUCCIÓN: VARIABLE FÍSICA ➔ SEÑAL ELÉCTRICA
          </span>
        </div>
        <div className="mt-3 grid items-center gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-center">
            <div className="text-[11px] text-slate-400">Mundo Físico</div>
            <div className="mt-1 font-mono text-xl font-bold text-white">{sensorVal}°C</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <input
              type="range"
              min="0"
              max="45"
              value={sensorVal}
              onChange={(e) => setSensorVal(Number(e.target.value))}
              className="cyber-slider w-full"
            />
            <span className="mt-1.5 font-mono text-[11px] text-cyan-400">
              Sonda NTC / PT100 ➔
            </span>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3 text-center">
            <div className="text-[11px] text-cyan-300">Señal Eléctrica</div>
            <div className="mt-1 font-mono text-xl font-bold text-cyan-200">{voltage} V</div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptId === 'controller') {
    return (
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-cyan-500/30 bg-[#070d18] p-3.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-cyan-300">
              MICROCONTROLADOR (Arduino / ESP32)
            </span>
            <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 text-[10px] text-cyan-300">
              PROTOTIPO
            </span>
          </div>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>• Bajo costo y tamaño compacto (5V / 3.3V).</li>
            <li>• Ideal para validar ideas en taller y usar WiFi/Bluetooth.</li>
            <li>• Requiere módulos externos (relés) para cargas grandes.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-[#070d18] p-3.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-emerald-300">
              PLC INDUSTRIAL
            </span>
            <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-300">
              INDUSTRIA 4.0
            </span>
          </div>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>• Robusto: soporta vibración, humedad y ruido eléctrico (24V).</li>
            <li>• Diseñado para operar 24/7 en camiones y plantas.</li>
            <li>• Se programa con lógica escalera (Ladder) o bloques.</li>
          </ul>
        </div>
      </div>
    );
  }

  if (conceptId === 'actuator') {
    return (
      <div className="mt-4 rounded-xl border border-slate-700/80 bg-[#070d18] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-semibold text-rose-300">
            PRUEBA DE ACTUADORES (SALIDAS)
          </span>
          <button
            onClick={() => setActuatorTest(!actuatorTest)}
            className={`rounded-lg px-3 py-1 font-mono text-xs font-bold transition ${
              actuatorTest
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {actuatorTest ? 'ORDEN: ACTIVADO (ON)' : 'ORDEN: REPOSO (OFF)'}
          </button>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-2.5">
            <Fan
              className={`mx-auto h-6 w-6 ${
                actuatorTest ? 'text-cyan-400 animate-spin-fast' : 'text-slate-600'
              }`}
            />
            <div className="mt-1.5 font-medium text-slate-200">Ventilador / Peltier</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-2.5">
            <Cog
              className={`mx-auto h-6 w-6 ${
                actuatorTest ? 'text-emerald-400 animate-spin-slow' : 'text-slate-600'
              }`}
            />
            <div className="mt-1.5 font-medium text-slate-200">Compuerta Servo</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-2.5">
            <AlertTriangle
              className={`mx-auto h-6 w-6 ${
                actuatorTest ? 'text-amber-400 animate-pulse' : 'text-slate-600'
              }`}
            />
            <div className="mt-1.5 font-medium text-slate-200">Baliza Alarma</div>
          </div>
        </div>
      </div>
    );
  }

  // loop
  return (
    <div className="mt-4 rounded-xl border border-slate-700/80 bg-[#070d18] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs font-semibold text-cyan-300">
          COMPARADOR VISUAL: LAZO ABIERTO VS. CERRADO
        </span>
        <div className="inline-flex rounded-lg border border-slate-700 bg-slate-900 p-0.5">
          <button
            onClick={() => setLoopMode('open')}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
              loopMode === 'open' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            Lazo Abierto
          </button>
          <button
            onClick={() => setLoopMode('closed')}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
              loopMode === 'closed'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Lazo Cerrado
          </button>
        </div>
      </div>

      {loopMode === 'open' ? (
        <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <XCircle className="h-4 w-4" />
            <span>Sin retroalimentación (actúa a ciegas)</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-300">
            <span className="rounded bg-slate-800 px-2 py-1">Temporizador fijo</span>
            <span>➔</span>
            <span className="rounded bg-slate-800 px-2 py-1">Enfriador ON 10 min</span>
            <span>➔</span>
            <span className="rounded bg-rose-500/20 px-2 py-1 text-rose-300">
              ¿Se enfrió? No lo sabe
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            <span>Con retroalimentación continua (Inteligente)</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-200">
            <span className="rounded bg-cyan-500/20 px-2 py-1 text-cyan-200">Sensor mide</span>
            <span className="text-cyan-400">➔</span>
            <span className="rounded bg-emerald-500/20 px-2 py-1 text-emerald-200">
              PLC compara PCC
            </span>
            <span className="text-emerald-400">➔</span>
            <span className="rounded bg-amber-500/20 px-2 py-1 text-amber-200">
              Actuador corrige
            </span>
            <span className="text-cyan-400">↺ Vuelve a medir</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AcademySection() {
  const [expandedId, setExpandedId] = useState('pcc');
  const [projectorMode, setProjectorMode] = useState(false);

  return (
    <section id="conceptos" className="border-t border-slate-800/80 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              Modo Docente &amp; Academia Interactiva
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Conceptos Clave de Automatización 4.0
            </h2>
            <p className="mt-2 max-w-2xl text-slate-400">
              Haz clic en cada tarjeta para proyectar en clases o explorar paso a paso cómo piensa y
              actúa nuestra Smart-Box.
            </p>
          </div>

          <button
            onClick={() => setProjectorMode(!projectorMode)}
            className={`inline-flex items-center gap-2 self-start rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
              projectorMode
                ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            <Presentation className="h-4 w-4 text-cyan-400" />
            <span>{projectorMode ? 'Modo Proyector: ACTIVADO' : 'Activar Modo Proyector'}</span>
          </button>
        </div>

        {/* Expandable Cards */}
        <div className="mt-10 space-y-4">
          {CONCEPTS.map((concept) => {
            const Icon = ICON_MAP[concept.id] || Cpu;
            const styles = ACCENT_CLASSES[concept.accent] || ACCENT_CLASSES.cyan;
            const isOpen = expandedId === concept.id;

            return (
              <div
                key={concept.id}
                className={`rounded-2xl border bg-[#0b1220]/90 transition-all ${
                  isOpen ? `${styles.border} ${styles.glow}` : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setExpandedId(isOpen ? null : concept.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.iconBg}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          #{concept.number}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold ${styles.badge}`}
                        >
                          {concept.badge}
                        </span>
                      </div>
                      <h3
                        className={`mt-1 font-bold text-white ${
                          projectorMode ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                        }`}
                      >
                        {concept.title}
                      </h3>
                      <p className="text-sm text-slate-400">{concept.subtitle}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400">
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-800/80 px-5 pb-6 pt-5 sm:px-6">
                    <div className="grid gap-4 lg:grid-cols-3">
                      <div className="lg:col-span-2 space-y-4">
                        <p
                          className={`leading-relaxed text-slate-200 ${
                            projectorMode ? 'text-lg' : 'text-base'
                          }`}
                        >
                          {concept.explanation}
                        </p>

                        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                            <Lightbulb className="h-4 w-4" />
                            <span>Ejemplo Cotidiano</span>
                          </div>
                          <p
                            className={`mt-1.5 text-slate-300 ${
                              projectorMode ? 'text-base' : 'text-sm'
                            }`}
                          >
                            {concept.everydayAnalogy}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
                            <Factory className="h-4 w-4" />
                            <span>En la Smart-Box</span>
                          </div>
                          <p
                            className={`mt-1.5 text-slate-300 ${
                              projectorMode ? 'text-base' : 'text-sm'
                            }`}
                          >
                            {concept.industrialExample}
                          </p>
                        </div>

                        <div className="rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-3.5 font-mono text-xs text-cyan-200">
                          {concept.keyFormula}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Mini-Demo */}
                    <ConceptInteractiveDemo conceptId={concept.id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

