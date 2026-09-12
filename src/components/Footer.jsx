import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail, PhoneCall } from 'lucide-react';
import { sound } from './AudioController';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer({ isDarkMode }) {
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
      <footer className={`border-t pt-12 pb-24 sm:pb-28 transition-colors relative z-10 w-full ${
        isDarkMode 
          ? 'bg-gradient-to-b from-cosmos-950 via-[#02040b] to-[#010206] border-indigo-950/40 text-slate-400' 
          : 'bg-gradient-to-b from-slate-100 to-slate-200 border-slate-300 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-indigo-950/30">
            
            {/* Left: Brand info */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 font-display font-bold text-base">
                <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-indigo-500 font-mono">.</span>
              </div>
              <p className="text-xs mt-1 max-w-md">
                Frontend Web Developer & UI/UX Designer · Lulusan Sistem Informasi Universitas Jambi (Cum Laude, IPK {PERSONAL_INFO.gpa}).
              </p>
            </div>

            {/* Right: Quick Social Icon Links */}
            <div className="flex items-center gap-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                className={`p-2 rounded-xl border transition-all hover:scale-105 ${
                  isDarkMode 
                    ? 'border-indigo-900/50 hover:bg-white/5 text-slate-300 hover:text-white' 
                    : 'border-slate-300 hover:bg-white text-slate-700'
                }`}
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                className={`p-2 rounded-xl border transition-all hover:scale-105 ${
                  isDarkMode 
                    ? 'border-indigo-900/50 hover:bg-white/5 text-slate-300 hover:text-white' 
                    : 'border-slate-300 hover:bg-white text-slate-700'
                }`}
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                className={`p-2 rounded-xl border transition-all hover:scale-105 ${
                  isDarkMode 
                    ? 'border-indigo-900/50 hover:bg-white/5 text-slate-300 hover:text-white' 
                    : 'border-slate-300 hover:bg-white text-slate-700'
                }`}
                title="WhatsApp"
              >
                <PhoneCall className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={() => sound.play('click')}
                className={`p-2 rounded-xl border transition-all hover:scale-105 ${
                  isDarkMode 
                    ? 'border-indigo-900/50 hover:bg-white/5 text-slate-300 hover:text-white' 
                    : 'border-slate-300 hover:bg-white text-slate-700'
                }`}
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 text-center sm:text-left">
            <span>© 2026 {PERSONAL_INFO.name}, S.Kom. All rights reserved.</span>
            <span>Dibangun dengan React 18, Vite & Tailwind CSS</span>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top button (only shows when scrolled, positioned cleanly above bottom nav) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-20 sm:bottom-20 right-4 sm:right-6 z-30 p-2.5 rounded-full border shadow-xl transition-all duration-300 hover:scale-110 ${
            isDarkMode 
              ? 'bg-indigo-950/90 border-indigo-500/40 text-indigo-300 hover:text-white shadow-indigo-950/60' 
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
