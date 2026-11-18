import React, { useState } from 'react';
import {
  Radio,
  Cpu,
  Cog,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  CheckSquare,
  Square,
} from 'lucide-react';
import { HARDWARE_SENSORS, HARDWARE_ACTUATORS } from '../../data/missionData';

export default function Phase2Architecture({ missionState, onUpdateState, onComplete }) {
  const { pccConfig, architecture } = missionState;

  const [selectedSensors, setSelectedSensors] = useState(architecture?.sensors || []);
  const [selectedActuators, setSelectedActuators] = useState(architecture?.actuators || []);

  const [rule1, setRule1] = useState(
    architecture?.rule1 || { variable: 'temp', op: '>', threshold: 'tempMax', action: 'none' }
  );
  const [rule2, setRule2] = useState(
    architecture?.rule2 || { variable: 'hum', op: '<', threshold: 'humMax', action: 'none' }
  );
  const [rule3, setRule3] = useState(
    architecture?.rule3 || { variable: 'temp', op: '>', threshold: 'tempMin', action: 'none' }
  );

  const [feedback, setFeedback] = useState(null);

  const toggleSensor = (id) => {
    setSelectedSensors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setFeedback(null);
  };

  const toggleActuator = (id) => {
    setSelectedActuators((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setFeedback(null);
  };

  const handleValidate = () => {
    const errors = [];

    // Validate Sensors
    const correctSensors = HARDWARE_SENSORS.filter((s) => s.correct).map((s) => s.id);
    const wrongSensors = selectedSensors.filter((id) => !correctSensors.includes(id));
    const missingSensors = correctSensors.filter((id) => !selectedSensors.includes(id));

    if (wrongSensors.length > 0) {
      errors.push(
        'Hardware (Sensores): Instalaste un sensor que no mide temperatura ni humedad (ej. proximidad o nivel).'
      );
    }
    if (missingSensors.length > 0) {
      errors.push(
        'Hardware (Sensores): Te falta seleccionar tanto la Sonda NTC/PT100 como el Higrómetro Capacitivo.'
      );
    }

    // Validate Actuators
    const correctActuators = HARDWARE_ACTUATORS.filter((a) => a.correct).map((a) => a.id);
    const wrongActuators = selectedActuators.filter((id) => !correctActuators.includes(id));
    const missingActuators = correctActuators.filter((id) => !selectedActuators.includes(id));

    if (wrongActuators.length > 0) {
      errors.push(
        'Hardware (Actuadores): Conectaste un actuador inadecuado (pistón hidráulico o resistencia de horno).'
      );
    }
    if (missingActuators.length > 0) {
      errors.push(
        'Hardware (Actuadores): Debes conectar los 3 actuadores clave (Peltier, Deshumidificador y Baliza de Alarma).'
      );
    }

    // Validate Rule 1: Temp > tempMax => peltier
    if (
      rule1.variable !== 'temp' ||
      rule1.op !== '>' ||
      rule1.threshold !== 'tempMax' ||
      rule1.action !== 'peltier'
    ) {
      errors.push(
        `Regla 1 (Control de Calor): Debe evaluar SI Temp_Interna > PCC Temp Máx (${pccConfig.tempMax}°C) ENTONCES Activar Celda Peltier.`
      );
    }

    // Validate Rule 2: Hum > humMax => dehumidifier
    if (
      rule2.variable !== 'hum' ||
      rule2.op !== '>' ||
      rule2.threshold !== 'humMax' ||
      rule2.action !== 'dehumidifier'
    ) {
      errors.push(
        `Regla 2 (Control de Humedad): Debe evaluar SI Humedad_Interna > PCC Humedad Máx (${pccConfig.humMax}%) ENTONCES Activar Deshumidificador.`
      );
    }

    // Validate Rule 3: Temp < tempMin => pause_alarm
    if (
      rule3.variable !== 'temp' ||
      rule3.op !== '<' ||
      rule3.threshold !== 'tempMin' ||
      rule3.action !== 'pause_alarm'
    ) {
      errors.push(
        `Regla 3 (Protección por Frío Excesivo): Debe evaluar SI Temp_Interna < PCC Temp Mín (${pccConfig.tempMin}°C) ENTONCES Pausar Peltier y Encender Baliza.`
      );
    }

    if (errors.length > 0) {
      setFeedback({ ok: false, messages: errors });
      return;
    }

    onUpdateState({
      architecture: {
        sensors: selectedSensors,
        actuators: selectedActuators,
        rule1,
        rule2,
        rule3,
      },
    });
    setFeedback({
      ok: true,
      messages: [
        '¡Arquitectura y lógica validadas! El Controlador Programable está listo para iniciar la ruta.',
      ],
    });
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
            Fase 2 de 4 • Estimado: 8 min
          </span>
          <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
            Arquitectura del Lazo Cerrado y Lógica del Controlador
          </h3>
        </div>
        <span className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 font-mono text-xs text-slate-300">
          PCC: {pccConfig.tempMin}°C–{pccConfig.tempMax}°C | ≤{pccConfig.humMax}% HR
        </span>
      </div>

      {/* Interactive Empty Schematic Diagram */}
      <div className="rounded-xl border border-cyan-500/30 bg-[#060b14] p-4 sm:p-5">
        <div className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
          Diagrama Esquemático de la Smart-Box (Se completa con tu selección)
        </div>

        <div className="mt-4 grid items-stretch gap-3 md:grid-cols-3">
          {/* Input Block */}
          <div className="rounded-xl border border-dashed border-cyan-500/40 bg-cyan-500/5 p-3.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
              <Radio className="h-4 w-4" />
              <span>ENTRADAS (SENSORES)</span>
            </div>
            <div className="mt-2 space-y-1.5 text-xs">
              {selectedSensors.length === 0 ? (
                <p className="italic text-slate-500">Sin sensores conectados...</p>
              ) : (
                selectedSensors.map((id) => {
                  const s = HARDWARE_SENSORS.find((item) => item.id === id);
                  return (
                    <div
                      key={id}
                      className="rounded bg-slate-900/90 px-2.5 py-1.5 font-mono text-cyan-200 border border-cyan-500/20"
                    >
                      + {s?.name}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Controller Block */}
          <div className="flex flex-col justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-center">
            <Cpu className="mx-auto h-7 w-7 text-emerald-400" />
            <div className="mt-1.5 font-mono text-xs font-bold text-white">
              CONTROLADOR PLC / ESP32
            </div>
            <div className="mt-1 text-[11px] text-emerald-200">
              Evalúa reglas SI ... ENTONCES cada 500 ms
            </div>
          </div>

          {/* Output Block */}
          <div className="rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 p-3.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-300">
              <Cog className="h-4 w-4" />
              <span>SALIDAS (ACTUADORES)</span>
            </div>
            <div className="mt-2 space-y-1.5 text-xs">
              {selectedActuators.length === 0 ? (
                <p className="italic text-slate-500">Sin actuadores conectados...</p>
              ) : (
                selectedActuators.map((id) => {
                  const a = HARDWARE_ACTUATORS.find((item) => item.id === id);
                  return (
                    <div
                      key={id}
                      className="rounded bg-slate-900/90 px-2.5 py-1.5 font-mono text-amber-200 border border-amber-500/20"
                    >
                      + {a?.name}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Challenge A: Hardware Selection */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-[#070d18] p-4 sm:p-5">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
            Desafío A1: Selecciona los Sensores correctos
          </h4>
          <div className="mt-3 space-y-2.5">
            {HARDWARE_SENSORS.map((sensor) => {
              const checked = selectedSensors.includes(sensor.id);
              return (
                <button
                  key={sensor.id}
                  type="button"
                  onClick={() => toggleSensor(sensor.id)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                    checked
                      ? 'border-cyan-400 bg-cyan-500/15 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {checked ? (
                    <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  ) : (
                    <Square className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                  )}
                  <div>
                    <div className="text-sm font-bold">{sensor.name}</div>
                    <div className="text-xs text-slate-400">{sensor.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#070d18] p-4 sm:p-5">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
            Desafío A2: Selecciona los Actuadores adecuados
          </h4>
          <div className="mt-3 space-y-2.5">
            {HARDWARE_ACTUATORS.map((act) => {
              const checked = selectedActuators.includes(act.id);
              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => toggleActuator(act.id)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                    checked
                      ? 'border-amber-400 bg-amber-500/15 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {checked ? (
                    <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  ) : (
                    <Square className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                  )}
                  <div>
                    <div className="text-sm font-bold">{act.name}</div>
                    <div className="text-xs text-slate-400">{act.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Challenge B: Rule Programming */}
      <div className="rounded-xl border border-slate-800 bg-[#070d18] p-5">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
          Desafío B: Programa las Reglas Lógicas del Controlador
        </h4>
        <p className="mt-1 text-xs text-slate-400">
          Completa cada sentencia lógica para que la Smart-Box responda automáticamente en ruta.
        </p>

        <div className="mt-4 space-y-3 font-mono text-xs">
          {/* Rule 1 */}
          <RuleRow
            label="Regla 1 (Calor)"
            rule={rule1}
            onChange={setRule1}
            pccConfig={pccConfig}
          />
          {/* Rule 2 */}
          <RuleRow
            label="Regla 2 (Humedad)"
            rule={rule2}
            onChange={setRule2}
            pccConfig={pccConfig}
          />
          {/* Rule 3 */}
          <RuleRow
            label="Regla 3 (Frío Mín)"
            rule={rule3}
            onChange={setRule3}
            pccConfig={pccConfig}
          />
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`rounded-xl border p-4 text-sm ${
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleValidate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition hover:brightness-110"
        >
          <span>Compilar Lógica e Iniciar Fase 3</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function RuleRow({ label, rule, onChange, pccConfig }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
      <span className="w-32 font-bold text-cyan-300">{label}:</span>
      <span className="text-emerald-400 font-bold">SI</span>
      <select
        value={rule.variable}
        onChange={(e) => onChange({ ...rule, variable: e.target.value })}
        className="rounded-lg border border-slate-700 bg-[#060b14] px-2.5 py-1.5 text-white"
      >
        <option value="temp">Temp_Interna</option>
        <option value="hum">Humedad_Interna</option>
      </select>

      <select
        value={rule.op}
        onChange={(e) => onChange({ ...rule, op: e.target.value })}
        className="rounded-lg border border-slate-700 bg-[#060b14] px-2.5 py-1.5 text-amber-300 font-bold"
      >
        <option value=">">&gt; (Mayor que)</option>
        <option value="<">&lt; (Menor que)</option>
      </select>

      <select
        value={rule.threshold}
        onChange={(e) => onChange({ ...rule, threshold: e.target.value })}
        className="rounded-lg border border-slate-700 bg-[#060b14] px-2.5 py-1.5 text-white"
      >
        <option value="tempMax">PCC Temp Máx ({pccConfig.tempMax}°C)</option>
        <option value="tempMin">PCC Temp Mín ({pccConfig.tempMin}°C)</option>
        <option value="humMax">PCC Hum Máx ({pccConfig.humMax}%)</option>
      </select>

      <span className="text-emerald-400 font-bold">ENTONCES</span>

      <select
        value={rule.action}
        onChange={(e) => onChange({ ...rule, action: e.target.value })}
        className="rounded-lg border border-slate-700 bg-[#060b14] px-2.5 py-1.5 text-cyan-200"
      >
        <option value="none">-- Elegir Acción --</option>
        <option value="peltier">Activar Celda Peltier + Ventilador</option>
        <option value="dehumidifier">Activar Deshumidificador + Compuerta</option>
        <option value="pause_alarm">Pausar Peltier + Encender Baliza Alarma</option>
      </select>
    </div>
  );
}
