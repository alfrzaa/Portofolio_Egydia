import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { sound } from './AudioController';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer({ isDarkMode, onOpenTerminal }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sound.play('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className={`border-t py-12 transition-colors relative z-10 ${
        isDarkMode ? 'bg-cosmos-950 border-indigo-950/60 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div>
              <div className="flex items-center gap-1.5 font-display font-bold text-base">
                <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-indigo-500 font-mono">.</span>
              </div>
              <p className="text-xs mt-1 max-w-md">
                Portofolio Frontend Web Developer & UI/UX Designer. Lulusan Sistem Informasi Universitas Jambi (Cum Laude, IPK {PERSONAL_INFO.gpa}).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-medium">
              <a href="#hero" className="hover:text-indigo-400 transition-colors">Home</a>
              <a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-indigo-400 transition-colors">Skills</a>
              <a href="#experience" className="hover:text-indigo-400 transition-colors">Experience</a>
              <a href="#certifications" className="hover:text-indigo-400 transition-colors">Credentials</a>
              <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-indigo-950/30 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <span>© 2026 {PERSONAL_INFO.name}, S.Kom. All rights reserved.</span>
            <div className="flex items-center gap-1">
              <span>Dibangun dengan React 18, Vite & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Discrete Floating Scroll to Top button (only shows when scrolled) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-40 p-3 rounded-full border shadow-xl transition-all duration-300 hover:scale-110 ${
            isDarkMode 
              ? 'bg-indigo-950/90 border-indigo-500/40 text-indigo-300 hover:text-white shadow-indigo-950/50' 
              : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 shadow-md'
          }`}
          title="Kembali ke Atas"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
