import React, { useState } from 'react';
import { X, Sparkles, Heart, Footprints, Flame, Hand } from 'lucide-react';
import { sound } from './AudioController';

const ANIMATION_MODES = [
  {
    id: 'cuddle',
    label: 'Gendong',
    icon: Heart,
    src: '/assets/images/egydia_cat_cuddle.gif',
    dialogue: 'Meow! 🐾 Sayang anabul kesayangan ❤️',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  },
  {
    id: 'walk',
    label: 'Jalan',
    icon: Footprints,
    src: '/assets/images/egydia_cat_walk.gif',
    dialogue: 'Jalan santai cari inspirasi UI/UX & Web! 🚶‍♀️🐾',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 'run',
    label: 'Lari',
    icon: Flame,
    src: '/assets/images/egydia_cat_run.gif',
    dialogue: 'Lari cepat mengejar target & deadline! 🏃‍♀️💨',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
  },
  {
    id: 'wave',
    label: 'Lambai',
    icon: Hand,
    src: '/assets/images/egydia_cat_wave.gif',
    dialogue: 'Halo! Selamat datang di portofolio Egydia! 👋✨',
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
  }
];

export default function PixelMascot({ isDarkMode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMode, setActiveMode] = useState('cuddle');
  const [showBubble, setShowBubble] = useState(true);
  const [jump, setJump] = useState(false);

  const currentMode = ANIMATION_MODES.find(m => m.id === activeMode) || ANIMATION_MODES[0];

  const handleSelectMode = (modeId) => {
    sound.play('space');
    setActiveMode(modeId);
    setShowBubble(true);
    setJump(true);
    setTimeout(() => setJump(false), 350);
  };

  const handleMascotClick = () => {
    sound.play('click');
    setJump(true);
    setTimeout(() => setJump(false), 350);
    // Cycle to next mode
    const currentIndex = ANIMATION_MODES.findIndex(m => m.id === activeMode);
    const nextMode = ANIMATION_MODES[(currentIndex + 1) % ANIMATION_MODES.length];
    setActiveMode(nextMode.id);
    setShowBubble(true);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          sound.play('click');
          setIsOpen(true);
          setShowBubble(true);
        }}
        title="Buka Maskot Pixel Egydia & Kucing"
        className={`fixed bottom-16 sm:bottom-20 left-4 z-30 p-2.5 rounded-full border shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isDarkMode 
            ? 'bg-cosmos-950/90 border-indigo-500/40 text-indigo-300 shadow-indigo-950/60' 
            : 'bg-white border-slate-300 text-slate-700 shadow-md'
        }`}
      >
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-14 sm:bottom-20 left-3 sm:left-6 z-30 select-none">
      
      {/* Speech Bubble */}
      {showBubble && (
        <div className={`absolute -top-14 left-0 w-64 p-2.5 rounded-xl border shadow-xl text-xs transition-all duration-300 ${
          isDarkMode
            ? 'bg-cosmos-900/95 border-indigo-500/40 text-white shadow-indigo-950/80'
            : 'bg-white border-slate-300 text-slate-800 shadow-lg'
        }`}>
          <div className="flex items-start justify-between gap-1">
            <p className="font-mono text-[11px] leading-tight font-medium">
              {currentMode.dialogue}
            </p>
            <button
              onClick={() => setShowBubble(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white shrink-0 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          {/* Arrow pointing down */}
          <div className={`absolute -bottom-1.5 left-8 w-3 h-3 rotate-45 border-r border-b ${
            isDarkMode ? 'bg-cosmos-900 border-indigo-500/40' : 'bg-white border-slate-300'
          }`} />
        </div>
      )}

      {/* Mascot Card */}
      <div className={`group relative flex flex-col gap-2 p-2.5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
        isDarkMode
          ? 'bg-cosmos-950/90 border-indigo-500/30 hover:border-indigo-400 text-white shadow-indigo-950/60'
          : 'bg-white/95 border-slate-300 hover:border-indigo-400 text-slate-800 shadow-slate-300/60'
      } ${jump ? '-translate-y-2' : ''}`}>
        
        {/* Top Header Strip */}
        <div className="flex items-center justify-between gap-2 border-b pb-1.5 border-indigo-500/20">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-display font-bold text-xs">Egydia & Cat</span>
            <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[9px] font-mono font-bold">
              16-BIT
            </span>
          </div>

          <button
            onClick={() => {
              sound.play('click');
              setIsOpen(false);
            }}
            title="Sembunyikan Maskot"
            className="text-slate-400 hover:text-rose-400 transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Animated Pixel Sprite Stage */}
        <div 
          onClick={handleMascotClick}
          title="Klik untuk ganti gerakan!"
          className="relative w-48 h-28 rounded-xl overflow-hidden bg-[#070913] border border-indigo-950 flex items-center justify-center cursor-pointer group-hover:border-indigo-500/40 transition-colors"
        >
          {/* Subtle 8-bit floor line */}
          <div className="absolute inset-x-0 bottom-0 h-4 bg-indigo-950/40 border-t border-indigo-500/20" />

          {/* Active Sprite GIF */}
          <img
            src={currentMode.src}
            alt={`Egydia & Cat - ${currentMode.label}`}
            className="w-40 h-auto relative z-10 [image-rendering:pixelated] drop-shadow-[0_4px_12px_rgba(79,70,229,0.5)] transition-transform duration-200 group-hover:scale-105"
          />

          {/* Action Badge */}
          <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono text-indigo-300 border border-white/10">
            {currentMode.label}
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="grid grid-cols-4 gap-1 pt-0.5">
          {ANIMATION_MODES.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => handleSelectMode(mode.id)}
                className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg border text-[10px] font-medium transition-all duration-200 ${
                  isActive
                    ? `${mode.color} border-current font-bold scale-105 shadow-sm`
                    : isDarkMode
                      ? 'border-indigo-950 bg-indigo-950/20 text-slate-400 hover:text-white hover:bg-white/5'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={`Mode ${mode.label}`}
              >
                <Icon className="w-3 h-3 mb-0.5" />
                <span className="text-[9px]">{mode.label}</span>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
