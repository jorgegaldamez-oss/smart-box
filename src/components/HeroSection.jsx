import React from 'react';
import {
  ArrowRight,
  Sliders,
  FlaskConical,
  Apple,
  UtensilsCrossed,
  Hammer,
  ShieldCheck,
  Thermometer,
  Droplets,
  Cpu,
} from 'lucide-react';

const PILLARS = [
  {
    title: 'Química Industrial',
    desc: 'Calibración de sensores, reactivos sensibles y cartuchos desecantes.',
    icon: FlaskConical,
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
  },
  {
    title: 'Elaboración de Alimentos',
    desc: 'Protocolos HACCP, Puntos Críticos de Control (PCC) y trazabilidad.',
    icon: Apple,
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
  },
  {
    title: 'Gastronomía',
    desc: 'Estiba para flujo de aire, inocuidad (BPM) y temperatura de núcleo.',
    icon: UtensilsCrossed,
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
  },
  {
    title: 'Muebles y Madera',
    desc: 'Estructura aislante, hermeticidad y control de humedad contra pandeo.',
    icon: Hammer,
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
  },
];

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>PROYECTO TRANSVERSAL TP • 2° MEDIO • INDUSTRIA 4.0</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              Misión{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                Smart-Box
              </span>
              : Control Inteligente en Ruta Extrema
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              <strong className="text-amber-300 font-semibold">
                ¿Qué pasa cuando un camión cruza zonas extremas de calor y humedad
              </strong>{' '}
              transportando alimentos frescos, reactivos químicos o piezas de madera fina?
            </p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-400">
              Sin automatización, la carga se pierde. Descubre cómo{' '}
              <span className="text-slate-200 font-medium">
                sensores, controladores programables y actuadores
              </span>{' '}
              trabajan en un lazo cerrado para proteger el contenedor inteligente que construirán
              las 4 especialidades del liceo.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('conceptos')}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition hover:brightness-110 active:scale-[0.98]"
              >
                <span>Explorar el Sistema</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => scrollTo('simulador')}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/10"
              >
                <Sliders className="h-4 w-4" />
                <span>Abrir Simulador en Vivo</span>
              </button>
            </div>
          </div>

          {/* Right Column: Cyber-Industrial Prototype Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-cyan-500/30 bg-[#0b1220]/90 p-6 shadow-[0_0_40px_rgba(6,182,212,0.12)]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Prototipo Compartido Smart-Box
                  </span>
                </div>
                <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400 border border-emerald-500/30">
                  LAZO CERRADO
                </span>
              </div>

              {/* Telemetry Preview */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Thermometer className="h-4 w-4 text-cyan-400" />
                    <span>Sensor Térmico</span>
                  </div>
                  <div className="mt-1.5 font-mono text-2xl font-bold text-white">
                    3.8 <span className="text-sm font-normal text-cyan-400">°C</span>
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-400">Dentro de PCC (≤ 4°C)</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Droplets className="h-4 w-4 text-emerald-400" />
                    <span>Higrómetro</span>
                  </div>
                  <div className="mt-1.5 font-mono text-2xl font-bold text-white">
                    48 <span className="text-sm font-normal text-emerald-400">%HR</span>
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-400">Humedad estable</div>
                </div>
              </div>

              {/* Mini Loop Diagram */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-[#070d18] p-4">
                <div className="flex items-center justify-between text-center font-mono text-[11px]">
                  <div className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-2 text-cyan-300">
                    SENSOR
                  </div>
                  <span className="text-cyan-400 animate-pulse">━━▶</span>
                  <div className="flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-2 text-emerald-300">
                    <Cpu className="h-3.5 w-3.5" />
                    <span>PLC / ESP32</span>
                  </div>
                  <span className="text-emerald-400 animate-pulse">━━▶</span>
                  <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-2 text-amber-300">
                    ACTUADOR
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-slate-400">
                  4 especialidades conectadas en un solo desafío de ingeniería aplicada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Specialties Convergence Summary */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                onClick={() => scrollTo('especialidades')}
                className={`cursor-pointer rounded-xl border ${pillar.border} bg-[#0b1220]/80 p-4 transition hover:-translate-y-1 hover:bg-slate-900/90`}
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg ${pillar.bg} p-2.5`}>
                    <Icon className={`h-5 w-5 ${pillar.text}`} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-400">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

