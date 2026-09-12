import React, { useState, useEffect } from 'react';
import CosmicBackground from './components/CosmicBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsBento from './components/SkillsBento';
import ExperienceTimeline from './components/ExperienceTimeline';
import CertificatesVault from './components/CertificatesVault';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import InteractiveTerminal from './components/InteractiveTerminal';
import ImageLightbox from './components/ImageLightbox';
import { sound } from './components/AudioController';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('egydia_theme_mode');
    return saved ? saved === 'dark' : true;
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, image: '', caption: '' });

  useEffect(() => {
    localStorage.setItem('egydia_theme_mode', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        sound.play('toggle');
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openLightbox = (image, caption) => {
    setLightboxData({ isOpen: true, image, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ isOpen: false, image: '', caption: '' });
  };

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-500 selection:bg-indigo-500 selection:text-white ${
      isDarkMode 
        ? 'bg-[#030712] text-slate-100' 
        : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* Animated Custom Star Cursor */}
      <CustomCursor isDarkMode={isDarkMode} />

      {/* Cosmic / Daylight Animated Background Engine with 3D Ringed Planet */}
      <CosmicBackground isDarkMode={isDarkMode} />

      {/* Top Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenTerminal={() => setTerminalOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <HeroSection
          isDarkMode={isDarkMode}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <ProjectsSection isDarkMode={isDarkMode} />
        <SkillsBento isDarkMode={isDarkMode} />
        <ExperienceTimeline
          isDarkMode={isDarkMode}
          onOpenLightbox={openLightbox}
        />
        <CertificatesVault
          isDarkMode={isDarkMode}
          onOpenLightbox={openLightbox}
        />
        <ContactSection isDarkMode={isDarkMode} />
      </main>

      {/* Footer (Seamlessly grounded to the bottom) */}
      <Footer
        isDarkMode={isDarkMode}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Floating Bottom Navigation Bar */}
      <BottomNav isDarkMode={isDarkMode} />

      {/* Floating CLI Terminal Drawer */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Fullscreen Certificate & Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxData.isOpen}
        image={lightboxData.image}
        caption={lightboxData.caption}
        onClose={closeLightbox}
      />

    </div>
  );
}
