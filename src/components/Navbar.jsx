import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Terminal, 
  Menu, 
  X, 
  Orbit,
  ArrowUpRight
} from 'lucide-react';
import { sound } from './AudioController';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Navbar({ isDarkMode, setIsDarkMode, onOpenTerminal, soundEnabled, setSoundEnabled }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'projects', 'skills', 'experience', 'certifications', 'contact'];
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sId);
            break;
          }
        }
      }
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

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Projects (6)', href: '#projects', id: 'projects' },
    { label: 'Skills & Radar', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Credentials', href: '#certifications', id: 'certifications' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-cosmos-950/80 backdrop-blur-xl border-b border-indigo-900/40 shadow-2xl shadow-indigo-950/40 py-3' 
          : 'bg-white/85 backdrop-blur-xl border-b border-slate-200 shadow-md shadow-slate-200/50 py-3'
        : 'bg-transparent py-5'
    }`}>
      {/* Top Banner Ribbon */}
      <div className={`hidden lg:block text-xs py-1 border-b transition-colors ${
        isDarkMode 
          ? 'bg-indigo-950/40 border-indigo-900/30 text-indigo-300/90' 
          : 'bg-indigo-50/70 border-indigo-100 text-indigo-700'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center tracking-wide">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold uppercase tracking-wider">{PERSONAL_INFO.status}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] opacity-85">
            <span>🎓 {PERSONAL_INFO.university} ({PERSONAL_INFO.honors} · IPK {PERSONAL_INFO.gpa})</span>
            <span>•</span>
            <span>⭐ Best Group of Final Project (MSIB)</span>
            <span>•</span>
            <span>🏆 1st Best Project RajaPharma</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between mt-1">
        
        {/* Brand Logo */}
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
                EGYDIA ALFARIZA
              </span>
              <span className="text-indigo-500 animate-pulse font-mono">.</span>
            </div>
            <div className={`text-[11px] font-mono tracking-wider ${isDarkMode ? 'text-indigo-300' : 'text-slate-500'}`}>
              S.Kom. · Cum Laude (3.94)
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-medium backdrop-blur-md transition-colors ${
          isDarkMode 
            ? 'bg-cosmos-900/60 border-indigo-900/40 text-slate-300' 
            : 'bg-slate-100/80 border-slate-200 text-slate-600'
        }`}>
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => sound.play('click')}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? isDarkMode
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-white text-indigo-700 shadow-sm font-semibold'
                    : isDarkMode
                      ? 'hover:text-white hover:bg-white/5'
                      : 'hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Interactive Controls (Theme Switcher, Audio, Terminal) */}
        <div className="flex items-center gap-2">
          
          {/* Dual-Mode Toggle: Space / Cosmic Mode vs Daylight Luxury */}
          <button
            onClick={toggleTheme}
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-indigo-950 to-purple-950 border-indigo-500/40 text-indigo-200 hover:border-indigo-400 shadow-lg shadow-indigo-950/60'
                : 'bg-gradient-to-r from-amber-50 to-indigo-50 border-amber-300/50 text-slate-800 hover:border-indigo-400 shadow-sm'
            }`}
            title={isDarkMode ? "Ganti ke Mode Terang (Daylight Luxury)" : "Ganti ke Mode Luar Angkasa (Cosmic Space)"}
          >
            {isDarkMode ? (
              <>
                <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span className="hidden sm:inline bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Cosmic Space
                </span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline text-slate-700">
                  Daylight Luxury
                </span>
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
            title={soundEnabled ? "SFX Aktif" : "SFX Dinonaktifkan"}
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
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border font-mono text-xs font-semibold transition-all ${
              isDarkMode
                ? 'bg-indigo-950/70 border-indigo-700/50 text-indigo-300 hover:border-indigo-500 hover:text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800'
            }`}
            title="Buka Terminal Interaktif (atau tekan ~)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI</span>
            <span className="px-1 py-0.2 rounded text-[10px] bg-white/10 font-bold">~</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => {
              sound.play('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`md:hidden p-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-indigo-900/60 text-slate-300' 
                : 'border-slate-200 text-slate-700'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-6 py-5 mt-3 transition-colors ${
          isDarkMode ? 'bg-cosmos-950/95 border-indigo-900/50 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => {
                  sound.play('click');
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 font-semibold'
                    : isDarkMode ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
