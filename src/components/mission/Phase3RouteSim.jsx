import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  AlertOctagon,
  ShieldCheck,
  Thermometer,
  Droplets,
  Fan,
  Cpu,
  Radio,
  Cog,
  Clock,
  HeartPulse,
  ArrowRight,
  Wrench,
} from 'lucide-react';
import { ROUTE_LEGS } from '../../data/missionData';

export default function Phase3RouteSim({ missionState, onUpdateState, onComplete }) {
  const { pccConfig } = missionState;

  const [legIndex, setLegIndex] = useState(0);
  const currentLeg = ROUTE_LEGS[legIndex];

  const [running, setRunning] = useState(false);
  const [legFinished, setLegFinished] = useState(false);
  const [cargoLost, setCargoLost] = useState(false);

  const [elapsedSec, setElapsedSec] = useState(0);
  const [integrity, setIntegrity] = useState(100);

  // Initialize internal temp/hum safely inside PCC
  const safeInitTemp = Number(((pccConfig.tempMin + pccConfig.tempMax) / 2).toFixed(1));
  const safeInitHum = Math.max(25, pccConfig.humMax - 12);

  const [intTemp, setIntTemp] = useState(safeInitTemp);
  const [intHum, setIntHum] = useState(safeInitHum);

  // Incident state for current leg
  const [incidentActive, setIncidentActive] = useState(false);
  const [incidentResolved, setIncidentResolved] = useState(false);

  // Full trip telemetry log across all 3 legs
  const [tripLog, setTripLog] = useState([]);
  const [legStats, setLegStats] = useState({ 1: 0, 2: 0, 3: 0 });

  // Use ref for latest values inside interval
  const stateRef = useRef({
    intTemp,
    intHum,
    elapsedSec,
    integrity,
    incidentActive,
    incidentResolved,
  });
  stateRef.current = {
    intTemp,
    intHum,
    elapsedSec,
    integrity,
    incidentActive,
    incidentResolved,
  };

  // Simulation tick every 1 second (real-time clock)
  useEffect(() => {
    if (!running || legFinished || cargoLost) return;

    const interval = setInterval(() => {
      const s = stateRef.current;
      const nextSec = s.elapsedSec + 1;

      // Trigger incident if applicable
      let nowIncidentActive = s.incidentActive;
      if (
        currentLeg.incident &&
        nextSec >= currentLeg.incident.triggerAtSec &&
        !s.incidentResolved
      ) {
        nowIncidentActive = true;
        setIncidentActive(true);
      }

      // Physics calculation
      const isLeg2Incident = currentLeg.id === 2 && nowIncidentActive && !s.incidentResolved;
      const isLeg3Incident = currentLeg.id === 3 && nowIncidentActive && !s.incidentResolved;

      // Thermal drift toward external temp
      const thermalLeak = isLeg2Incident ? 0.16 : 0.045;
      let nextTemp = s.intTemp + (currentLeg.extTemp - s.intTemp) * thermalLeak;

      // Closed-loop Peltier cooling
      const peltierOn = s.intTemp > pccConfig.tempMax;
      if (peltierOn) {
        const coolingPower = isLeg2Incident ? 0.35 : s.incidentResolved && currentLeg.id === 2 ? 1.4 : 0.95;
        nextTemp -= coolingPower;
      }
      // Protection against freezing below tempMin
      if (nextTemp < pccConfig.tempMin) {
        nextTemp = pccConfig.tempMin + 0.2;
      }
      nextTemp = Number(Math.max(0, Math.min(45, nextTemp)).toFixed(1));

      // Humidity drift toward external hum
      const humLeak = isLeg3Incident ? 0.18 : 0.05;
      let nextHum = s.intHum + (currentLeg.extHum - s.intHum) * humLeak;

      // Closed-loop Dehumidifier
      const dehumidifierOn = s.intHum > pccConfig.humMax;
      if (dehumidifierOn) {
        const dehumPower = isLeg3Incident ? 0.45 : s.incidentResolved && currentLeg.id === 3 ? 2.6 : 1.7;
        nextHum -= dehumPower;
      }
      nextHum = Number(Math.max(15, Math.min(96, nextHum)).toFixed(1));

      // Check PCC breach & integrity impact
      const tempOut = nextTemp > pccConfig.tempMax + 0.5 || nextTemp < pccConfig.tempMin - 0.5;
      const humOut = nextHum > pccConfig.humMax + 1;

      let nextIntegrity = s.integrity;
      if (tempOut || humOut) {
        const penalty = isLeg2Incident || isLeg3Incident ? 3.5 : 1.5;
        nextIntegrity = Math.max(0, Number((s.integrity - penalty).toFixed(1)));
      } else if (s.integrity < 100) {
        nextIntegrity = Math.min(100, Number((s.integrity + 0.3).toFixed(1)));
      }

      setIntTemp(nextTemp);
      setIntHum(nextHum);
      setElapsedSec(nextSec);
      setIntegrity(nextIntegrity);

      if (peltierOn || dehumidifierOn) {
        setLegStats((prev) => ({
          ...prev,
          [currentLeg.id]: (prev[currentLeg.id] || 0) + 1,
        }));
      }

      setTripLog((prev) => [
        ...prev,
        {
          legId: currentLeg.id,
          sec: nextSec,
          intTemp: nextTemp,
          intHum: nextHum,
          peltierOn,
          dehumidifierOn,
          incident: nowIncidentActive,
        },
      ]);

      if (nextIntegrity <= 0) {
        setCargoLost(true);
        setRunning(false);
      } else if (nextSec >= currentLeg.durationSec) {
        setLegFinished(true);
        setRunning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [running, legFinished, cargoLost, currentLeg, pccConfig]);

  const handleResolveIncident = () => {
    setIncidentActive(false);
    setIncidentResolved(true);
  };

  const handleRetryLeg = () => {
    setElapsedSec(0);
    setIntegrity(100);
    setIntTemp(safeInitTemp);
    setIntHum(safeInitHum);
    setIncidentActive(false);
    setIncidentResolved(false);
    setCargoLost(false);
    setLegFinished(false);
    setTripLog((prev) => prev.filter((item) => item.legId !== currentLeg.id));
    setLegStats((prev) => ({ ...prev, [currentLeg.id]: 0 }));
    setRunning(true);
  };

  const handleNextLeg = () => {
    if (legIndex + 1 < ROUTE_LEGS.length) {
      setLegIndex((prev) => prev + 1);
      setElapsedSec(0);
      setIncidentActive(false);
      setIncidentResolved(false);
      setLegFinished(false);
      setRunning(true);
    } else {
      // Completed all 3 legs! Save telemetry and move to Fase 4
      onUpdateState({
        tripResult: {
          tripLog,
          finalIntegrity: Math.round(integrity),
          legStats,
        },
      });
      onComplete();
    }
  };

  // Current leg chart points
  const currentLegLog = tripLog.filter((item) => item.legId === currentLeg.id);
  const buildPath = (data, key, minV, maxV, w = 520, h = 140) => {
    if (data.length < 2) return '';
    return data
      .map((pt, i) => {
        const x = (i / Math.max(1, currentLeg.durationSec - 1)) * w;
        const clamped = Math.max(minV, Math.min(maxV, pt[key]));
        const y = h - ((clamped - minV) / (maxV - minV)) * h;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const tempPoints = buildPath(currentLegLog, 'intTemp', 0, 45);
  const humPoints = buildPath(currentLegLog, 'intHum', 0, 100);
  const pccTempLineY = 140 - (pccConfig.tempMax / 45) * 140;
  const pccHumLineY = 140 - (pccConfig.humMax / 100) * 140;

  const peltierActive = intTemp > pccConfig.tempMax;
  const dehumActive = intHum > pccConfig.humMax;
  const isBreach = peltierActive || dehumActive;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
            Fase 3 de 4 • Estimado: 12 min
          </span>
          <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
            Simulación de Ruta Crítica (3 Tramos + Incidentes)
          </h3>
        </div>

        {/* Leg Stepper */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {ROUTE_LEGS.map((leg, idx) => (
            <span
              key={leg.id}
              className={`rounded-lg border px-2.5 py-1 font-bold ${
                idx === legIndex
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                  : idx < legIndex
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                  : 'border-slate-800 bg-slate-900 text-slate-500'
              }`}
            >
              Tramo {leg.id}
            </span>
          ))}
        </div>
      </div>

      {/* Active Leg Banner & Clock */}
      <div className="grid gap-4 rounded-xl border border-slate-800 bg-[#070d18] p-4 sm:grid-cols-12 sm:items-center">
        <div className="sm:col-span-7">
          <div className="font-mono text-xs font-bold text-cyan-300">{currentLeg.name}</div>
          <p className="mt-1 text-xs text-slate-300">{currentLeg.description}</p>
          <div className="mt-2 flex flex-wrap gap-3 font-mono text-[11px] text-slate-400">
            <span>
              Clima Exterior: <strong className="text-amber-300">{currentLeg.extTemp}°C</strong> |{' '}
              <strong className="text-cyan-300">{currentLeg.extHum}% HR</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 sm:col-span-5">
          <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-sm font-bold text-white">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span>
              {elapsedSec}s / {currentLeg.durationSec}s
            </span>
          </div>

          {!legFinished && !cargoLost && (
            <button
              onClick={() => setRunning(!running)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                running
                  ? 'border border-amber-500/40 bg-amber-500/20 text-amber-200'
                  : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950'
              }`}
            >
              {running ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>{elapsedSec === 0 ? 'Iniciar Tramo' : 'Reanudar'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Cargo Integrity Bar */}
      <div className="rounded-xl border border-slate-800 bg-[#070d18] p-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-2 font-bold text-slate-200">
            <HeartPulse
              className={`h-4 w-4 ${
                integrity > 60 ? 'text-emerald-400' : integrity > 30 ? 'text-amber-400' : 'text-rose-500 animate-ping'
              }`}
            />
            INTEGRIDAD DE LA CARGA
          </span>
          <span
            className={`font-bold ${
              integrity > 60 ? 'text-emerald-400' : integrity > 30 ? 'text-amber-400' : 'text-rose-400'
            }`}
          >
            {Math.round(integrity)}%
          </span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full transition-all duration-300 ${
              integrity > 60
                ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                : integrity > 30
                ? 'bg-amber-400'
                : 'bg-rose-500'
            }`}
            style={{ width: `${integrity}%` }}
          />
        </div>
      </div>

      {/* LIVE INCIDENT ALERT BOX */}
      {incidentActive && !incidentResolved && currentLeg.incident && (
        <div className="rounded-xl border-2 border-rose-500 bg-rose-950/50 p-5 shadow-[0_0_30px_rgba(244,63,94,0.3)] animate-pulse">
          <div className="flex items-start gap-3">
            <AlertOctagon className="h-7 w-7 shrink-0 text-rose-400" />
            <div className="flex-1">
              <h4 className="font-mono text-sm font-extrabold text-rose-200">
                {currentLeg.incident.title}
              </h4>
              <p className="mt-1 text-sm text-rose-100">{currentLeg.incident.detail}</p>
              <button
                onClick={handleResolveIncident}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-lg transition hover:bg-amber-300"
              >
                <Wrench className="h-4 w-4" />
                <span>{currentLeg.incident.actionLabel}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {incidentResolved && currentLeg.incident && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs font-semibold text-emerald-200">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>{currentLeg.incident.resolvedLabel} — Sistema estabilizándose.</span>
        </div>
      )}

      {/* Telemetry + Closed Loop + Live Chart */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Left Telemetry & Loop (5 cols) */}
        <div className="space-y-4 lg:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`rounded-xl border p-3.5 ${
                peltierActive
                  ? 'border-amber-500/50 bg-amber-500/10'
                  : 'border-slate-800 bg-slate-900/70'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Temp. Interna</span>
                <Thermometer className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-white">{intTemp}°C</div>
              <div className="mt-0.5 font-mono text-[10px] text-slate-400">
                PCC: {pccConfig.tempMin}°C – {pccConfig.tempMax}°C
              </div>
            </div>

            <div
              className={`rounded-xl border p-3.5 ${
                dehumActive
                  ? 'border-amber-500/50 bg-amber-500/10'
                  : 'border-slate-800 bg-slate-900/70'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Humedad Interna</span>
                <Droplets className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-white">{intHum}%</div>
              <div className="mt-0.5 font-mono text-[10px] text-slate-400">
                PCC: ≤ {pccConfig.humMax}% HR
              </div>
            </div>
          </div>

          {/* Mini Closed-Loop Status */}
          <div className="rounded-xl border border-slate-800 bg-[#060b14] p-4">
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
              <div className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-2.5">
                <Radio className="mx-auto h-4 w-4 text-cyan-400" />
                <div className="mt-1 font-bold text-cyan-200">SENSOR</div>
              </div>
              <div
                className={`rounded-lg border p-2.5 ${
                  isBreach
                    ? 'border-amber-400 bg-amber-500/15'
                    : 'border-emerald-500/40 bg-emerald-500/10'
                }`}
              >
                <Cpu className="mx-auto h-4 w-4 text-white" />
                <div className="mt-1 font-bold text-white">
                  {isBreach ? 'CORRIGIENDO' : 'PCC OK'}
                </div>
              </div>
              <div
                className={`rounded-lg border p-2.5 ${
                  isBreach
                    ? 'border-cyan-400 bg-cyan-500/20'
                    : 'border-slate-800 bg-slate-900'
                }`}
              >
                <Fan
                  className={`mx-auto h-4 w-4 ${
                    peltierActive ? 'text-cyan-300 animate-spin-fast' : 'text-slate-500'
                  }`}
                />
                <div className="mt-1 font-bold text-slate-200">
                  {isBreach ? 'ACTUADOR ON' : 'REPOSO'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live SVG Chart (7 cols) */}
        <div className="rounded-xl border border-slate-800 bg-[#060b14] p-4 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
            <span className="font-bold text-slate-300">GRÁFICO EN TIEMPO REAL</span>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400">━ Temp (°C)</span>
              <span className="text-emerald-400">━ Hum (%HR)</span>
              <span className="text-rose-400">┄ Límite PCC</span>
            </div>
          </div>

          <svg viewBox="0 0 520 140" className="mt-3 h-40 w-full rounded-lg bg-[#04070e] p-1">
            {/* PCC Temp Max Dashed Line */}
            <line
              x1="0"
              y1={pccTempLineY}
              x2="520"
              y2={pccTempLineY}
              stroke="#fb7185"
              strokeWidth="1.2"
              strokeDasharray="5 4"
            />
            {/* PCC Hum Max Dashed Line */}
            <line
              x1="0"
              y1={pccHumLineY}
              x2="520"
              y2={pccHumLineY}
              stroke="#f59e0b"
              strokeWidth="1.2"
              strokeDasharray="5 4"
            />
            {/* Humidity Curve */}
            {humPoints && (
              <polyline fill="none" stroke="#34d399" strokeWidth="2.2" points={humPoints} />
            )}
            {/* Temperature Curve */}
            {tempPoints && (
              <polyline fill="none" stroke="#22d3ee" strokeWidth="2.5" points={tempPoints} />
            )}
          </svg>
        </div>
      </div>

      {/* Leg Completed or Cargo Lost Actions */}
      {cargoLost && (
        <div className="rounded-xl border border-rose-500/50 bg-rose-500/10 p-5 text-center">
          <h4 className="text-lg font-extrabold text-rose-300">
            ¡Carga Perdida! Integridad llegó al 0%
          </h4>
          <p className="mt-1 text-sm text-slate-300">
            El incidente no se resolvió a tiempo y las variables salieron del PCC. Repite este tramo
            para certificar la ruta.
          </p>
          <button
            onClick={handleRetryLeg}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-rose-400"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Repetir Tramo {currentLeg.id}</span>
          </button>
        </div>
      )}

      {legFinished && !cargoLost && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5">
          <div>
            <h4 className="text-base font-extrabold text-emerald-300">
              ¡Tramo {currentLeg.id} Superado con Éxito!
            </h4>
            <p className="text-xs text-slate-300">
              Integridad actual de la carga: <strong>{Math.round(integrity)}%</strong>.
            </p>
          </div>
          <button
            onClick={handleNextLeg}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition hover:brightness-110"
          >
            <span>
              {legIndex + 1 < ROUTE_LEGS.length
                ? `Avanzar al Tramo ${legIndex + 2}`
                : 'Finalizar Viaje e Ir a Fase 4 (Auditoría)'}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
