import React from 'react';
import { 
  Home, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  Award, 
  Mail, 
  Terminal, 
  ArrowUp,
  Heart
} from 'lucide-react';
import { sound } from './AudioController';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer({ isDarkMode, onOpenTerminal }) {
  const scrollToTop = () => {
    sound.play('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className={`border-t py-12 transition-colors relative z-10 ${
        isDarkMode ? 'bg-cosmos-950 border-indigo-950 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div>
              <div className="flex items-center gap-1.5 font-display font-bold text-base">
                <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
                  EGYDIA ALFARIZA RAMADHANI
                </span>
                <span className="text-indigo-500 font-mono">.</span>
              </div>
              <p className="text-xs mt-1 max-w-md">
                Crafted with clean code, modern UI/UX design, and passion. Lulusan Sistem Informasi Cum Laude (IPK 3.94) Universitas Jambi.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <a href="#hero" className="hover:text-indigo-400 transition-colors">Home</a>
              <a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-indigo-400 transition-colors">Skills</a>
              <a href="#experience" className="hover:text-indigo-400 transition-colors">Experience</a>
              <a href="#certifications" className="hover:text-indigo-400 transition-colors">Credentials</a>
              <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-indigo-950/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <span>© 2026 Egydia Alfariza Ramadhani, S.Kom. All rights reserved.</span>
            <div className="flex items-center gap-1">
              <span>Built with React 18, Vite & Tailwind CSS</span>
              <span>•</span>
              <span className="text-indigo-400">Cosmic & Daylight Editions</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Quick Dock */}
      <aside className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1 px-3 py-2 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 bg-slate-900/80 border-indigo-500/30 text-slate-300">
        <a 
          href="#hero" 
          onClick={() => sound.play('click')} 
          className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
          title="Home"
        >
          <Home className="w-4 h-4" />
        </a>
        <a 
          href="#projects" 
          onClick={() => sound.play('click')} 
          className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
          title="6 Proyek Unggulan"
        >
          <FolderGit2 className="w-4 h-4" />
        </a>
        <a 
          href="#skills" 
          onClick={() => sound.play('click')} 
          className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
          title="Skills & Tech Radar"
        >
          <Cpu className="w-4 h-4" />
        </a>
        <a 
          href="#experience" 
          onClick={() => sound.play('click')} 
          className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
          title="Jejak Pengalaman"
        >
          <Briefcase className="w-4 h-4" />
        </a>
        <a 
          href="#certifications" 
          onClick={() => sound.play('click')} 
          className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
          title="Kredensial Resmi"
        >
          <Award className="w-4 h-4" />
        </a>
        <a 
          href="#contact" 
          onClick={() => sound.play('click')} 
          className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
          title="Hubungi Saya"
        >
          <Mail className="w-4 h-4" />
        </a>

        <div className="w-[1px] h-4 bg-indigo-500/30 mx-1" />

        <button
          onClick={() => {
            sound.play('toggle');
            onOpenTerminal();
          }}
          className="p-2 rounded-full hover:bg-indigo-600 hover:text-white text-cyan-400 transition-colors"
          title="Buka Terminal CLI (~)"
        >
          <Terminal className="w-4 h-4" />
        </button>

        <button
          onClick={scrollToTop}
          className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
          title="Kembali ke Atas"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </aside>
    </>
  );
}
