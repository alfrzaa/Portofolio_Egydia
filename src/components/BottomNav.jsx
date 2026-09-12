import React, { useState, useEffect } from 'react';
import { 
  Home, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  Award, 
  Mail 
} from 'lucide-react';
import { sound } from './AudioController';

export default function BottomNav({ isDarkMode }) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'skills', 'experience', 'certifications', 'contact'];
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom >= 260) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home, href: '#hero' },
    { id: 'projects', label: 'Proyek', icon: FolderGit2, href: '#projects' },
    { id: 'skills', label: 'Keahlian', icon: Cpu, href: '#skills' },
    { id: 'experience', label: 'Karir', icon: Briefcase, href: '#experience' },
    { id: 'certifications', label: 'Sertifikat', icon: Award, href: '#certifications' },
    { id: 'contact', label: 'Kontak', icon: Mail, href: '#contact' },
  ];

  return (
    <nav 
      aria-label="Bottom Navigation"
      className="fixed bottom-0 sm:bottom-5 left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-40 px-2 sm:px-0"
    >
      <div className={`w-full sm:w-auto flex items-center justify-around sm:justify-center gap-1 sm:gap-1.5 px-3 py-2 sm:py-2.5 sm:px-4 rounded-t-2xl sm:rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
        isDarkMode
          ? 'bg-cosmos-950/90 border-indigo-500/30 text-slate-400 shadow-indigo-950/60'
          : 'bg-white/95 border-slate-300 text-slate-600 shadow-slate-300/50'
      }`}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => sound.play('click')}
              className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl transition-all duration-200 text-[11px] sm:text-xs font-semibold ${
                isActive
                  ? isDarkMode
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40 scale-105'
                    : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-105'
                  : isDarkMode
                    ? 'hover:text-white hover:bg-white/5'
                    : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-4 sm:h-4" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
