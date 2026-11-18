import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AcademySection from './components/AcademySection';
import SimulatorSection from './components/SimulatorSection';
import SpecialtiesSection from './components/SpecialtiesSection';
import QuizSection from './components/QuizSection';
import Footer from './components/Footer';

const SECTION_IDS = ['hero', 'conceptos', 'simulador', 'especialidades', 'desafio'];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-1">
        <HeroSection />
        <AcademySection />
        <SimulatorSection />
        <SpecialtiesSection />
        <QuizSection />
      </main>
      <Footer />
    </div>
  );
}

