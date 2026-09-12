import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, Volume2 } from 'lucide-react';
import { sound } from './AudioController';

const DIALOGUES = [
  "Halo! Saya Egydia Alfariza, S.Kom 👋",
  "Lulusan Cum Laude IPK 3.94 Universitas Jambi 🎓",
  "Spesialisasi: Frontend Web Dev & UI/UX Design 💻",
  "Siap mewujudkan website berkualitas & estetik! 🚀",
  "Level 99 Tech Character Siap Berkolaborasi ✨"
];

export default function PixelMascot({ isDarkMode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [jump, setJump] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.play('space');
    setJump(true);
    setTimeout(() => setJump(false), 400);

    setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length);
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
        title="Buka Maskot Pixel Egydia"
        className={`fixed bottom-20 left-4 z-30 p-2.5 rounded-full border shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isDarkMode 
            ? 'bg-indigo-950/90 border-indigo-500/40 text-indigo-300 shadow-indigo-950/60' 
            : 'bg-white border-slate-300 text-slate-700 shadow-md'
        }`}
      >
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 sm:left-6 z-30 select-none">
      
      {/* Speech Bubble */}
      {showBubble && (
        <div className={`absolute -top-16 left-0 w-64 p-2.5 rounded-xl border shadow-xl text-xs transition-all duration-300 animate-bounce ${
          isDarkMode
            ? 'bg-cosmos-900/95 border-indigo-500/40 text-white shadow-indigo-950/80'
            : 'bg-white border-slate-300 text-slate-800 shadow-lg'
        }`}>
          <div className="flex items-start justify-between gap-1">
            <p className="font-mono text-[11px] leading-tight">
              {DIALOGUES[dialogueIndex]}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white shrink-0 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          {/* Arrow pointing down */}
          <div className={`absolute -bottom-1.5 left-6 w-3 h-3 rotate-45 border-r border-b ${
            isDarkMode ? 'bg-cosmos-900 border-indigo-500/40' : 'bg-white border-slate-300'
          }`} />
        </div>
      )}

      {/* Mascot Card */}
      <div 
        onClick={handleClick}
        className={`group relative flex items-center gap-2 p-2 pr-3 rounded-2xl border backdrop-blur-xl shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
          isDarkMode
            ? 'bg-cosmos-950/85 border-indigo-500/30 hover:border-indigo-400 text-white shadow-indigo-950/60'
            : 'bg-white/90 border-slate-300 hover:border-indigo-400 text-slate-800 shadow-slate-300/60'
        } ${jump ? '-translate-y-2' : ''}`}
      >
        {/* Animated Pixel Character */}
        <div className="relative w-12 h-16 flex items-center justify-center overflow-hidden">
          <img
            src="/assets/images/egydia_pixel_animated.gif"
            alt="Egydia Pixel Art"
            className="w-12 h-auto [image-rendering:pixelated] drop-shadow-md transition-transform duration-200 group-hover:scale-110"
          />
        </div>

        {/* Mascot Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-display font-bold text-xs">Egydia</span>
            <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[9px] font-mono font-bold">
              8-BIT
            </span>
          </div>
          <span className="text-[10px] text-indigo-400 font-mono">
            Klik untuk interaksi!
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.play('click');
            setIsOpen(false);
          }}
          title="Sembunyikan Maskot"
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 border border-slate-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
}
