import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Orbit, 
  Volume2, 
  VolumeX, 
  Terminal,
  MapPin
} from 'lucide-react';
import { sound } from './AudioController';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Navbar({ isDarkMode, setIsDarkMode, onOpenTerminal, soundEnabled, setSoundEnabled }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    sound.play(nextMode ? 'space' : 'toggle');
  };

  const toggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
    if (next) sound.play('click');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-cosmos-950/85 backdrop-blur-xl border-b border-indigo-900/40 shadow-xl shadow-cosmos-950/50 py-3' 
          : 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3'
        : 'bg-transparent py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a 
          href="#hero" 
          onClick={() => sound.play('click')}
          className="flex items-center gap-3 group"
        >
          <div className={`relative w-10 h-10 rounded-full overflow-hidden p-[2px] transition-transform duration-300 group-hover:scale-105 ${
            isDarkMode 
              ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400' 
              : 'bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500'
          }`}>
            <img 
              src={PERSONAL_INFO.avatarFormal} 
              alt={PERSONAL_INFO.name} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-display font-bold text-sm sm:text-base tracking-tight">
              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
                {PERSONAL_INFO.name}
              </span>
              <span className="text-indigo-500 font-mono">.</span>
            </div>
            <div className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Frontend Dev & UI/UX Designer
            </div>
          </div>
        </a>

        {/* Center: Subtle availability badge */}
        <div className={`hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
          isDarkMode 
            ? 'bg-indigo-950/40 border-indigo-900/50 text-indigo-300' 
            : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px]">Terbuka untuk Peluang Kerja & Freelance</span>
        </div>

        {/* Action Controls (Right side) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 ${
              isDarkMode
                ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-200 hover:border-indigo-400 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:border-indigo-400'
            }`}
            title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Kosmik"}
          >
            {isDarkMode ? (
              <>
                <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span className="text-cyan-200">Kosmik</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-slate-700">Terang</span>
              </>
            )}
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-colors ${
              isDarkMode
                ? 'bg-cosmos-900/70 border-indigo-900/50 text-indigo-300 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title={soundEnabled ? "Efek Suara Aktif" : "Efek Suara Mati"}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* CLI Terminal Launcher */}
          <button
            onClick={() => {
              sound.play('toggle');
              onOpenTerminal();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border font-mono text-xs font-semibold transition-all ${
              isDarkMode
                ? 'bg-indigo-950/70 border-indigo-700/50 text-indigo-300 hover:border-indigo-500 hover:text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800'
            }`}
            title="Buka Terminal CLI (atau tekan ~)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-[11px]">CLI</span>
            <span className="hidden sm:inline px-1 rounded text-[10px] bg-white/15">~</span>
          </button>

        </div>
      </div>
    </header>
  );
}
