import React, { useState } from 'react';
import {
  FileText,
  User,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Thermometer,
  Droplets,
} from 'lucide-react';
import { TRANSPORT_ORDERS } from '../../data/missionData';

const SPECIALTY_OPTIONS = [
  { id: 'alimentos', label: 'Elaboración Industrial de Alimentos' },
  { id: 'quimica', label: 'Química Industrial' },
  { id: 'gastronomia', label: 'Gastronomía' },
  { id: 'madera', label: 'Muebles y Terminaciones en Madera' },
];

export default function Phase1OrderPCC({ missionState, onUpdateState, onComplete }) {
  const { studentName, studentCourse, specialtyId, pccConfig } = missionState;
  const order = TRANSPORT_ORDERS[specialtyId] || TRANSPORT_ORDERS.alimentos;

  const [tempMin, setTempMin] = useState(pccConfig?.tempMin ?? 0);
  const [tempMax, setTempMax] = useState(pccConfig?.tempMax ?? 10);
  const [humMax, setHumMax] = useState(pccConfig?.humMax ?? 80);
  const [feedback, setFeedback] = useState(null);

  const handleSpecialtyChange = (newSpecId) => {
    onUpdateState({ specialtyId: newSpecId });
    setFeedback(null);
  };

  const handleValidate = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !studentCourse.trim()) {
      setFeedback({
        ok: false,
        messages: ['Por favor ingresa tu Nombre completo y Curso antes de validar.'],
      });
      return;
    }

    const errors = [];
    const exp = order.expectedPCC;

    if (tempMin >= tempMax) {
      errors.push('La Temperatura Mínima debe ser menor que la Temperatura Máxima.');
    } else {
      if (tempMin < exp.tempMin) errors.push(order.hints.tempMinTooLow);
      if (tempMin > exp.tempMin) errors.push(order.hints.tempMinTooHigh);
      if (tempMax > exp.tempMax) errors.push(order.hints.tempMaxTooHigh);
      if (tempMax < exp.tempMax) errors.push(order.hints.tempMaxTooLow);
    }

    if (humMax > exp.humMax) errors.push(order.hints.humTooHigh);
    if (humMax < exp.humMax) errors.push(order.hints.humTooLow);

    if (errors.length > 0) {
      setFeedback({ ok: false, messages: errors });
      return;
    }

    setFeedback({
      ok: true,
      messages: [
        `¡Excelente lectura técnica! PCC validados para ${order.orderCode}: ${tempMin}°C a ${tempMax}°C y Humedad ≤ ${humMax}% HR.`,
      ],
    });

    onUpdateState({
      pccConfig: { tempMin, tempMax, humMax },
    });
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
            Fase 1 de 4 • Estimado: 5 min
          </span>
          <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
            Orden de Despacho y Definición de PCC
          </h3>
        </div>
        <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
          {order.orderCode}
        </span>
      </div>

      {/* Student Identification */}
      <div className="grid gap-4 rounded-xl border border-slate-800 bg-[#070d18] p-4 sm:grid-cols-3">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <User className="h-3.5 w-3.5 text-cyan-400" />
            Nombre del Estudiante
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => onUpdateState({ studentName: e.target.value })}
            placeholder="Ej: Valentina Rojas"
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
            Curso
          </label>
          <input
            type="text"
            value={studentCourse}
            onChange={(e) => onUpdateState({ studentCourse: e.target.value })}
            placeholder="Ej: 2° Medio B"
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
            Especialidad TP
          </label>
          <select
            value={specialtyId}
            onChange={(e) => handleSpecialtyChange(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
          >
            {SPECIALTY_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Critical Transport Order & Technical Sheet */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
          <FileText className="h-4 w-4" />
          <span>Orden de Transporte Crítica Asignada</span>
        </div>
        <h4 className="mt-2 text-lg font-bold text-white">{order.title}</h4>
        <div className="mt-2 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
          <div>
            <strong className="text-slate-200">Carga:</strong> {order.cargo}
          </div>
          <div>
            <strong className="text-slate-200">Ruta:</strong> {order.route}
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-slate-700/80 bg-[#060b14] p-4 text-sm leading-relaxed text-slate-200">
          {order.technicalSheet}
        </div>
      </div>

      {/* PCC Configuration Challenge */}
      <form onSubmit={handleValidate} className="rounded-xl border border-slate-800 bg-[#070d18] p-5">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
          Desafío: Configura los Límites Críticos (PCC) exactos según la Ficha Técnica
        </h4>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Thermometer className="h-4 w-4 text-cyan-400" />
              Temp. Mínima (°C)
            </label>
            <input
              type="number"
              value={tempMin}
              onChange={(e) => setTempMin(Number(e.target.value))}
              min="-10"
              max="35"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-[#060b14] px-3 py-2 font-mono text-lg font-bold text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Thermometer className="h-4 w-4 text-amber-400" />
              Temp. Máxima (°C)
            </label>
            <input
              type="number"
              value={tempMax}
              onChange={(e) => setTempMax(Number(e.target.value))}
              min="-5"
              max="45"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-[#060b14] px-3 py-2 font-mono text-lg font-bold text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Droplets className="h-4 w-4 text-emerald-400" />
              Humedad Máxima (%HR)
            </label>
            <input
              type="number"
              value={humMax}
              onChange={(e) => setHumMax(Number(e.target.value))}
              min="10"
              max="95"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-[#060b14] px-3 py-2 font-mono text-lg font-bold text-white focus:border-emerald-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mt-4 rounded-xl border p-4 text-sm ${
              feedback.ok
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                : 'border-rose-500/40 bg-rose-500/10 text-rose-200'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {feedback.ok ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
              )}
              <ul className="space-y-1">
                {feedback.messages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition hover:brightness-110"
          >
            <span>Validar PCC y Pasar a Fase 2</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
