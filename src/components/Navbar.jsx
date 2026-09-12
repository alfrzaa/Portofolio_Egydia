import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Orbit, 
  Volume2, 
  VolumeX, 
  Terminal, 
  Menu, 
  X,
  Sparkles
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
    { label: 'Tentang', href: '#hero', id: 'hero' },
    { label: 'Proyek', href: '#projects', id: 'projects' },
    { label: 'Keahlian', href: '#skills', id: 'skills' },
    { label: 'Pengalaman', href: '#experience', id: 'experience' },
    { label: 'Sertifikat', href: '#certifications', id: 'certifications' },
    { label: 'Kontak', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-cosmos-950/85 backdrop-blur-xl border-b border-indigo-900/40 shadow-xl shadow-cosmos-950/50 py-3.5' 
          : 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3.5'
        : 'bg-transparent py-5'
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
                Egydia Alfariza
              </span>
              <span className="text-indigo-500 font-mono">.</span>
            </div>
            <div className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Frontend Dev & UI/UX
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
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? isDarkMode
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                      : 'bg-white text-indigo-700 shadow-sm font-semibold'
                    : isDarkMode
                      ? 'hover:text-white hover:bg-white/5'
                      : 'hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 ${
              isDarkMode
                ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-200 hover:border-indigo-400 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:border-indigo-400'
            }`}
            title={isDarkMode ? "Ganti ke Mode Terang (Daylight)" : "Ganti ke Mode Luar Angkasa (Cosmic Space)"}
          >
            {isDarkMode ? (
              <>
                <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span className="hidden sm:inline text-cyan-200">Mode Kosmik</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline text-slate-700">Mode Terang</span>
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
            title="Buka Terminal CLI (atau tekan tombol ~)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">CLI</span>
            <span className="px-1 rounded text-[10px] bg-white/15">~</span>
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
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-6 py-4 mt-3 transition-colors ${
          isDarkMode ? 'bg-cosmos-950/95 border-indigo-900/50 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
        }`}>
          <div className="flex flex-col gap-1.5">
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
