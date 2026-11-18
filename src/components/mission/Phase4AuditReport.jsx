import React, { useState } from 'react';
import {
  FileCheck2,
  Printer,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Award,
  Activity,
} from 'lucide-react';
import { TRANSPORT_ORDERS } from '../../data/missionData';

export default function Phase4AuditReport({ missionState, onUpdateState, onRestartMission }) {
  const { studentName, studentCourse, specialtyId, pccConfig, tripResult, auditReport } =
    missionState;
  const order = TRANSPORT_ORDERS[specialtyId] || TRANSPORT_ORDERS.alimentos;

  const tripLog = tripResult?.tripLog || [];
  const finalIntegrity = tripResult?.finalIntegrity ?? 100;
  const legStats = tripResult?.legStats || { 1: 0, 2: 18, 3: 20 };

  // Determine which leg had max actuator activity dynamically
  const maxActuatorLeg =
    legStats[2] >= legStats[3] && legStats[2] >= legStats[1]
      ? '2'
      : legStats[3] >= legStats[1]
      ? '3'
      : '1';

  const QUESTIONS = [
    {
      id: 'q1',
      question: '1. Según el registro de tu viaje, ¿en qué tramo trabajaron más segundos los actuadores?',
      options: [
        { value: '1', label: `Tramo 1: Ruta Normal (${legStats[1] || 0}s activos)` },
        { value: '2', label: `Tramo 2: Zona Árida 42°C (${legStats[2] || 0}s activos)` },
        { value: '3', label: `Tramo 3: Zona Selvática 92% HR (${legStats[3] || 0}s activos)` },
      ],
      correct: maxActuatorLeg,
    },
    {
      id: 'q2',
      question:
        '2. ¿Qué componente del lazo cerrado detectó inicialmente la subida de temperatura durante la micro-fisura del Tramo 2?',
      options: [
        { value: 'actuator', label: 'La Celda Peltier (Actuador térmico)' },
        { value: 'sensor', label: 'La Sonda NTC / PT100 (Sensor térmico)' },
        { value: 'wood', label: 'El Burlete de Goma (Sello estructural)' },
      ],
      correct: 'sensor',
    },
    {
      id: 'q3',
      question: '3. ¿Por qué fue clave cambiar a Sensor Redundante y Desecante Auxiliar en el Tramo 3?',
      options: [
        { value: 'sat', label: 'El cartucho principal se saturó con 92% HR y el sensor principal falló' },
        { value: 'cold', label: 'La temperatura bajó demasiado en la selva y congeló el aire interno' },
        { value: 'off', label: 'El controlador necesitaba apagarse por completo para ahorrar batería' },
      ],
      correct: 'sat',
    },
    {
      id: 'q4',
      question: '4. Si la Smart-Box hubiera operado en Lazo Abierto (sin retroalimentación), ¿qué habría ocurrido?',
      options: [
        { value: 'ok', label: 'La carga habría mantenido el 100% de integridad sin necesidad de sensores' },
        { value: 'fail', label: 'El sistema no habría corregido los incidentes y la carga se habría perdido' },
        { value: 'fast', label: 'El camión habría consumido menos combustible y llegado mucho más rápido' },
      ],
      correct: 'fail',
    },
  ];

  const [answers, setAnswers] = useState(auditReport?.answers || {});
  const [conclusion, setConclusion] = useState(auditReport?.conclusion || '');
  const [showCertificate, setShowCertificate] = useState(Boolean(auditReport?.completed));
  const [errorMsg, setErrorMsg] = useState('');

  // Build full trip SVG chart
  const buildFullPath = (key, minV, maxV, w = 680, h = 150) => {
    if (tripLog.length < 2) return '';
    return tripLog
      .map((pt, idx) => {
        const x = (idx / Math.max(1, tripLog.length - 1)) * w;
        const clamped = Math.max(minV, Math.min(maxV, pt[key]));
        const y = h - ((clamped - minV) / (maxV - minV)) * h;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const tempPoints = buildFullPath('intTemp', 0, 45);
  const humPoints = buildFullPath('intHum', 0, 100);
  const pccTempY = 150 - (pccConfig.tempMax / 45) * 150;
  const pccHumY = 150 - (pccConfig.humMax / 100) * 150;

  const handleGenerateReport = (e) => {
    e.preventDefault();
    const unanswered = QUESTIONS.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setErrorMsg('Por favor responde las 4 preguntas de análisis post-viaje.');
      return;
    }
    if (conclusion.trim().length < 80) {
      setErrorMsg(
        `Tu conclusión técnica debe tener al menos 80 caracteres (llevas ${conclusion.trim().length}).`
      );
      return;
    }

    const quizScore = QUESTIONS.reduce(
      (acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc),
      0
    );

    setErrorMsg('');
    onUpdateState({
      auditReport: {
        answers,
        conclusion: conclusion.trim(),
        quizScore,
        completed: true,
      },
    });
    setShowCertificate(true);
  };

  const quizScore = QUESTIONS.reduce(
    (acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="no-print flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
            Fase 4 de 4 • Estimado: 5 min
          </span>
          <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
            Auditoría Post-Viaje y Bitácora Técnica
          </h3>
        </div>
        <span className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
          Integridad Final: {finalIntegrity}%
        </span>
      </div>

      {/* Full Trip Summary Chart */}
      <div className="print-report rounded-xl border border-slate-800 bg-[#060b14] p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="flex items-center gap-2 font-bold text-cyan-300">
            <Activity className="h-4 w-4" />
            REGISTRO COMPLETO DEL VIAJE (TRAMOS 1, 2 Y 3)
          </span>
          <div className="flex flex-wrap gap-3 text-[11px]">
            <span className="text-cyan-400">━ Temp. Interna (°C)</span>
            <span className="text-emerald-400">━ Humedad Interna (%HR)</span>
            <span className="text-rose-400">┄ Límite PCC</span>
          </div>
        </div>

        <svg viewBox="0 0 680 150" className="mt-3 h-44 w-full rounded-lg bg-[#04070e] p-1">
          {/* Shaded bands where actuators were active */}
          {tripLog.map((pt, idx) => {
            if (!pt.peltierOn && !pt.dehumidifierOn) return null;
            const x = (idx / Math.max(1, tripLog.length - 1)) * 680;
            return (
              <rect
                key={idx}
                x={x}
                y={0}
                width={680 / Math.max(1, tripLog.length)}
                height={150}
                fill="rgba(245, 158, 11, 0.12)"
              />
            );
          })}
          <line
            x1="0"
            y1={pccTempY}
            x2="680"
            y2={pccTempY}
            stroke="#fb7185"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <line
            x1="0"
            y1={pccHumY}
            x2="680"
            y2={pccHumY}
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          {humPoints && <polyline fill="none" stroke="#34d399" strokeWidth="2.2" points={humPoints} />}
          {tempPoints && <polyline fill="none" stroke="#22d3ee" strokeWidth="2.5" points={tempPoints} />}
        </svg>
        <p className="mt-2 text-[11px] text-slate-400">
          Las franjas sombreadas en ámbar indican los momentos exactos en que el controlador activó
          los actuadores de corrección.
        </p>
      </div>

      {!showCertificate ? (
        <form onSubmit={handleGenerateReport} className="space-y-5">
          {/* 4 Analysis Questions */}
          <div className="space-y-4">
            {QUESTIONS.map((q) => (
              <div
                key={q.id}
                className="rounded-xl border border-slate-800 bg-[#070d18] p-4 space-y-2.5"
              >
                <div className="text-sm font-bold text-white">{q.question}</div>
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-2.5 text-xs transition ${
                        answers[q.id] === opt.value
                          ? 'border-cyan-400 bg-cyan-500/15 text-white'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.value}
                        checked={answers[q.id] === opt.value}
                        onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                        className="accent-cyan-400"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Technical Conclusion */}
          <div className="rounded-xl border border-slate-800 bg-[#070d18] p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white">
                Conclusión Técnica de tu Especialidad ({order.specialtyName}):
              </label>
              <span
                className={`font-mono text-xs font-bold ${
                  conclusion.trim().length >= 80 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {conclusion.trim().length} / 80 mín.
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Explica brevemente cómo tu especialidad aportó a salvar la carga durante los 3 tramos.
            </p>
            <textarea
              rows={4}
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              placeholder="Ej: Desde nuestra especialidad de Alimentos, definimos los límites PCC de 1°C a 4°C según protocolo HACCP para evitar proliferación bacteriana..."
              className="mt-2.5 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-sm text-rose-200">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition hover:brightness-110"
            >
              <FileCheck2 className="h-4 w-4" />
              <span>Generar Reporte Técnico / Certificado</span>
            </button>
          </div>
        </form>
      ) : (
        /* FINAL CERTIFICATE / PRINTABLE REPORT */
        <div className="print-report rounded-2xl border-2 border-emerald-500/50 bg-[#070d18] p-6 sm:p-8 shadow-[0_0_35px_rgba(16,185,129,0.15)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <Award className="h-10 w-10 text-emerald-400" />
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Certificado de Misión Smart-Box 4.0
                </div>
                <h4 className="text-xl font-extrabold text-white">
                  Reporte Técnico de Transporte Controlado
                </h4>
              </div>
            </div>
            <div className="text-right font-mono text-xs text-slate-400">
              <div>Orden: {order.orderCode}</div>
              <div>Fecha: {new Date().toLocaleDateString('es-CL')}</div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-[11px] text-slate-400">Estudiante</div>
              <div className="font-bold text-white">{studentName}</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-[11px] text-slate-400">Curso</div>
              <div className="font-bold text-white">{studentCourse}</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-[11px] text-slate-400">Especialidad</div>
              <div className="font-bold text-cyan-300">{order.specialtyName}</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-[11px] text-slate-400">Integridad / Análisis</div>
              <div className="font-mono font-bold text-emerald-400">
                {finalIntegrity}% | {quizScore}/4
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="font-mono text-xs font-bold uppercase text-slate-400">
              Conclusión Técnica del Estudiante
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">{conclusion}</p>
          </div>

          <div className="no-print mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              <span>Misión completada. Puedes imprimir o guardar como PDF para tu docente.</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition hover:brightness-110"
              >
                <Printer className="h-4 w-4" />
                <span>Imprimir / Guardar como PDF</span>
              </button>
              <button
                type="button"
                onClick={onRestartMission}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:border-cyan-500/50"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Nueva Misión</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
