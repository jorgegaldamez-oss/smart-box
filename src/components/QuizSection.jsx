import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Download,
  Sparkles,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/platformData';

export default function QuizSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [studentName, setStudentName] = useState('');

  const question = QUIZ_QUESTIONS[currentIdx];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctIndex;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    if (idx === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  const getRank = () => {
    if (score === 5) return { title: 'Ingeniero/a Smart-Box 4.0', color: 'text-emerald-400' };
    if (score >= 3) return { title: 'Técnico/a en Control', color: 'text-cyan-400' };
    return { title: 'Aprendiz 4.0 en Entrenamiento', color: 'text-amber-400' };
  };

  const downloadMedal = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#060b14';
    ctx.fillRect(0, 0, 900, 500);

    // Border glow
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 24, 852, 452);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, 828, 428);

    // Title
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PROYECTO TRANSVERSAL SMART-BOX 4.0', 450, 95);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText('MEDALLA DESAFÍO INGENIERO 4.0', 450, 155);

    // Student Name
    const displayName = studentName.trim() || 'Estudiante 2° Medio TP';
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 34px sans-serif';
    ctx.fillText(displayName, 450, 235);

    // Rank & Score
    const rank = getRank();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 26px monospace';
    ctx.fillText(`Rango: ${rank.title}`, 450, 305);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '22px monospace';
    ctx.fillText(`Puntaje obtenido: ${score} / ${QUIZ_QUESTIONS.length}`, 450, 355);

    ctx.fillStyle = '#64748b';
    ctx.font = '16px sans-serif';
    ctx.fillText(
      'Química Industrial • Alimentos • Gastronomía • Muebles y Madera',
      450,
      425
    );

    const link = document.createElement('a');
    link.download = `medalla-smartbox-${displayName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="desafio" className="border-t border-slate-800/80 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
            Evaluación Gamificada
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Desafío Ingeniero 4.0
          </h2>
          <p className="mt-2 text-slate-400">
            Pon a prueba tu criterio técnico con 5 situaciones reales de ruta en la Smart-Box.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-cyan-500/30 bg-[#0b1220]/90 p-6 sm:p-8 shadow-[0_0_35px_rgba(6,182,212,0.1)]">
          {!finished ? (
            <div>
              {/* Progress */}
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span>
                  PREGUNTA {currentIdx + 1} DE {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-emerald-400 font-bold">Puntaje: {score}</span>
              </div>

              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="mt-6 text-lg font-bold leading-snug text-white sm:text-xl">
                {question.question}
              </h3>

              {/* Options */}
              <div className="mt-5 space-y-3">
                {question.options.map((opt, idx) => {
                  let btnClass =
                    'border-slate-800 bg-slate-900/70 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800/80';

                  if (isAnswered) {
                    if (idx === question.correctIndex) {
                      btnClass = 'border-emerald-500 bg-emerald-500/15 text-emerald-100';
                    } else if (idx === selectedOption) {
                      btnClass = 'border-rose-500 bg-rose-500/15 text-rose-200';
                    } else {
                      btnClass = 'border-slate-800 bg-slate-900/40 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left text-sm transition ${btnClass}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === question.correctIndex && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                      )}
                      {isAnswered &&
                        idx === selectedOption &&
                        idx !== question.correctIndex && (
                          <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
                        )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback */}
              {isAnswered && (
                <div
                  className={`mt-5 rounded-xl border p-4 text-sm ${
                    isCorrect
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                      : 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                  }`}
                >
                  <div className="font-bold">
                    {isCorrect ? '¡Respuesta correcta!' : '¡Casi! Revisa el diagnóstico:'}
                  </div>
                  <p className="mt-1 text-slate-200">{question.explanation}</p>

                  <button
                    onClick={handleNext}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
                  >
                    <span>
                      {currentIdx + 1 < QUIZ_QUESTIONS.length
                        ? 'Siguiente Pregunta'
                        : 'Ver Medalla Final'}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Final Result & Medal */
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-400/50 bg-emerald-500/15 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                <Award className="h-10 w-10 text-emerald-400" />
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>DESAFÍO COMPLETADO</span>
              </div>

              <h3 className={`mt-3 text-2xl font-extrabold sm:text-3xl ${getRank().color}`}>
                {getRank().title}
              </h3>

              <p className="mt-2 font-mono text-lg text-slate-200">
                Puntaje Final:{' '}
                <strong className="text-white">
                  {score} / {QUIZ_QUESTIONS.length}
                </strong>
              </p>

              {/* Name input for medal */}
              <div className="mx-auto mt-6 max-w-sm">
                <label className="block text-left text-xs font-medium text-slate-400">
                  Escribe tu nombre para generar tu medalla descargable:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ej: Sofía Morales - 2°A"
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={downloadMedal}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition hover:brightness-110"
                >
                  <Download className="h-4 w-4" />
                  <span>Descargar Medalla PNG</span>
                </button>

                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/50"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Intentar de Nuevo</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

